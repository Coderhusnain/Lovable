// ============================================================================
// LEGALGRAM — INTELLIGENT FORM SEARCH ENGINE
// ----------------------------------------------------------------------------
// Recommends ONLY real forms from FORMS_CATALOG (the document library). It
// never invents form names. Combines:
//   • exact / phrase matching
//   • token matching (title / description / category weighted)
//   • synonym + intent expansion  ("nda" → confidentiality, "rent" → lease…)
//   • fuzzy matching (typo tolerance via Levenshtein)
//   • category / intent boosts
// Returns ranked top results, each with a short human "reason", plus a status
// so the chatbot can decide: recommend, ask a clarifying question, or offer a
// custom document.
// ============================================================================

import { FORMS_CATALOG, type CatalogForm } from "@/data/formsCatalog";

export interface FormResult extends CatalogForm {
  score: number;
  reason: string;
}

export type SearchStatus = "good" | "ambiguous" | "none";

export interface SearchResult {
  status: SearchStatus;
  results: FormResult[];
  /** Distinct categories among the top results (used for clarifying questions). */
  categories: string[];
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------
const STOPWORDS = new Set([
  "a","an","the","for","to","of","and","or","my","me","i","need","want","make",
  "create","get","some","any","please","help","with","can","you","do","have",
  "is","it","this","that","on","in","about","how","what","which","looking","form",
  "document","documents","legal","draft","generate","new","write","would","like",
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(" ").filter((t) => t && !STOPWORDS.has(t));
}

// Words that appear in a huge share of form titles — they carry little signal
// on their own, so a match on them scores far lower than a distinctive word.
const WEAK_TOKENS = new Set([
  "agreement","contract","letter","form","note","request","authorization",
  "statement","document","general","comprehensive",
]);
const weight = (token: string, strong: number, weak: number) =>
  WEAK_TOKENS.has(token) ? weak : strong;

/** Levenshtein distance (small strings). */
function lev(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/** Typo-tolerant equality between two tokens. */
function fuzzyEq(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2) return false;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 4) return false; // too short to fuzzy safely
  const d = lev(a, b);
  const allowed = maxLen <= 5 ? 1 : 2;
  return d <= allowed;
}

// ---------------------------------------------------------------------------
// Synonym / intent expansion — maps everyday words to concepts that appear in
// the catalog titles/descriptions/categories.
// ---------------------------------------------------------------------------
const SYNONYMS: Record<string, string[]> = {
  nda: ["non", "disclosure", "confidential", "confidentiality"],
  "non-disclosure": ["confidential", "confidentiality"],
  confidential: ["confidentiality", "disclosure"],
  poa: ["power", "attorney"],
  will: ["will", "testament", "estate"],
  testament: ["will", "estate"],
  inheritance: ["will", "estate", "beneficiary"],
  estate: ["will", "estate", "beneficiary"],
  rent: ["lease", "rental", "tenant", "tenancy"],
  renting: ["lease", "rental", "tenant"],
  rental: ["lease", "tenant"],
  tenant: ["lease", "rental", "tenancy"],
  landlord: ["lease", "rental", "property"],
  apartment: ["lease", "residential", "rental"],
  flat: ["lease", "residential"],
  house: ["lease", "property", "residential"],
  loan: ["loan", "promissory", "debt", "borrow"],
  borrow: ["loan", "promissory", "debt"],
  lend: ["loan", "promissory"],
  iou: ["iou", "promissory", "debt"],
  debt: ["debt", "promissory", "loan", "collection"],
  owe: ["debt", "demand", "money"],
  owed: ["debt", "demand", "money"],
  hire: ["employment", "employee", "offer"],
  hiring: ["employment", "employee", "offer"],
  employee: ["employment", "offer"],
  employer: ["employment"],
  job: ["employment", "offer"],
  salary: ["employment"],
  fire: ["termination", "severance", "employment"],
  fired: ["termination", "severance"],
  terminate: ["termination", "severance"],
  layoff: ["severance", "termination"],
  freelance: ["independent", "contractor"],
  freelancer: ["independent", "contractor"],
  contractor: ["independent", "contractor"],
  gig: ["independent", "contractor"],
  consultant: ["consulting", "consultant"],
  business: ["business", "formation", "company"],
  company: ["business", "formation", "corporation"],
  startup: ["business", "formation", "llc"],
  incorporate: ["corporation", "formation", "incorporation"],
  llc: ["llc", "operating", "formation"],
  corporation: ["corporation", "bylaws", "formation"],
  partnership: ["partnership", "partner"],
  partner: ["partnership"],
  divorce: ["divorce", "separation", "marriage"],
  separation: ["separation", "divorce"],
  marriage: ["marriage", "prenuptial", "postnuptial"],
  prenup: ["prenuptial", "marriage"],
  prenuptial: ["prenuptial", "marriage"],
  buy: ["purchase", "sale", "buyer"],
  sell: ["sale", "seller", "purchase"],
  purchase: ["purchase", "sale"],
  property: ["property", "real", "estate", "deed"],
  "real estate": ["property", "deed", "sale"],
  deed: ["deed", "property"],
  invoice: ["payment", "demand"],
  bill: ["payment", "demand"],
  medical: ["healthcare", "physician"],
  doctor: ["healthcare", "physician"],
  health: ["healthcare", "living", "will"],
  affidavit: ["affidavit", "sworn"],
  sworn: ["affidavit"],
  complaint: ["complaint", "letter"],
  refund: ["refund", "complaint"],
  service: ["service", "services", "agreement"],
  services: ["service", "agreement"],
  vehicle: ["vehicle", "lease"],
  car: ["vehicle", "lease"],
  license: ["license", "licensing"],
  trademark: ["trademark", "intellectual"],
  copyright: ["copyright", "intellectual"],
  patent: ["patent", "intellectual"],
};

// Multi-word intent phrases → catalog category names to boost.
const INTENT_TO_CATEGORY: { phrases: string[]; category: string }[] = [
  { phrases: ["start a business", "form a company", "register a company", "open a business", "set up llc"], category: "Business Formation" },
  { phrases: ["hire", "hiring", "employ", "onboard", "new employee", "job offer"], category: "Employment" },
  { phrases: ["rent out", "renting", "rent apartment", "rent a house", "lease agreement"], category: "Residential Lease" },
  { phrases: ["protect information", "keep secret", "confidential"], category: "Confidentiality" },
  { phrases: ["owes me", "owe me", "unpaid", "demand payment", "collect debt"], category: "Legal Reports" },
  { phrases: ["make medical decisions", "medical power"], category: "Power of Attorney" },
  { phrases: ["buy a house", "sell a house", "buy property", "sell property", "buy land", "sell land"], category: "Property Sales" },
  { phrases: ["get divorced", "divorce", "separate from spouse"], category: "Marriage & Divorce" },
];

// ---------------------------------------------------------------------------
// Pre-built index (computed once).
// ---------------------------------------------------------------------------
interface IndexedForm {
  form: CatalogForm;
  titleTokens: Set<string>;
  descTokens: Set<string>;
  catTokens: Set<string>;
  titleNorm: string;
}

let INDEX: IndexedForm[] | null = null;

function buildIndex(): IndexedForm[] {
  if (INDEX) return INDEX;
  INDEX = FORMS_CATALOG.map((form) => ({
    form,
    titleTokens: new Set(tokenize(form.title)),
    descTokens: new Set(tokenize(form.description)),
    catTokens: new Set(tokenize(form.category)),
    titleNorm: normalize(form.title),
  }));
  return INDEX;
}

function expand(tokens: string[], phrase: string): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    (SYNONYMS[t] || []).forEach((s) => out.add(s));
  }
  // whole-phrase synonym keys (e.g. "real estate")
  for (const key of Object.keys(SYNONYMS)) {
    if (key.includes(" ") && phrase.includes(key)) {
      SYNONYMS[key].forEach((s) => out.add(s));
    }
  }
  return [...out];
}

// ---------------------------------------------------------------------------
// Main search
// ---------------------------------------------------------------------------
export function searchForms(rawQuery: string, limit = 5): SearchResult {
  const phrase = normalize(rawQuery);
  const queryTokens = tokenize(rawQuery);

  if (queryTokens.length === 0) {
    return { status: "none", results: [], categories: [] };
  }

  const expanded = expand(queryTokens, phrase);
  const index = buildIndex();

  // Intent → category boosts.
  const boostedCategories = new Set<string>();
  for (const intent of INTENT_TO_CATEGORY) {
    if (intent.phrases.some((p) => phrase.includes(p))) {
      boostedCategories.add(intent.category);
    }
  }

  const scored: FormResult[] = [];

  for (const item of index) {
    let score = 0;
    let exact = false, phrase = false, fuzzy = false, catBoost = false;

    // 1) Exact / phrase title matches (strongest). Compare normalized forms so
    //    hyphens/punctuation don't defeat an exact match.
    const phraseIsWeakSingle = queryTokens.length === 1 && WEAK_TOKENS.has(queryTokens[0]);
    if (item.titleNorm === phrase) {
      score += 1000;
      exact = true;
    } else if (phrase.length >= 4 && !phraseIsWeakSingle && item.titleNorm.includes(phrase)) {
      score += 200;
      phrase = true;
    }

    // 2) Query tokens vs title / description / category. Common words like
    //    "agreement" score much lower so distinctive words dominate.
    let titleHits = 0;
    for (const t of queryTokens) {
      if (item.titleTokens.has(t)) { score += weight(t, 32, 6); titleHits++; }
      else if (!WEAK_TOKENS.has(t)) {
        // Typo tolerance — but if the word it fuzzy-matches is a common one
        // (e.g. "agrement" → "agreement"), keep the boost small.
        const matched = [...item.titleTokens].find((tt) => fuzzyEq(tt, t));
        if (matched) { score += weight(matched, 18, 4); titleHits++; fuzzy = true; }
      }
      if (item.descTokens.has(t)) score += weight(t, 8, 3);
      if (item.catTokens.has(t)) score += weight(t, 22, 6);
    }

    // 3) Synonym / concept matches.
    let synHit = false;
    for (const s of expanded) {
      if (queryTokens.includes(s)) continue; // already counted
      if (item.titleTokens.has(s)) { score += 20; synHit = true; }
      if (item.catTokens.has(s)) { score += 14; synHit = true; }
      if (item.descTokens.has(s)) score += 5;
    }

    // 4) Intent → category boost.
    if (boostedCategories.has(item.form.category)) {
      score += 26;
      catBoost = true;
    }

    if (score > 0) {
      // Coverage bonus — reward matching more of the query.
      const coverage = titleHits / queryTokens.length;
      score += Math.round(coverage * 12);

      // Clean, natural reason — strongest signal first.
      const allTitleWords = titleHits > 0 && titleHits === queryTokens.length;
      let reason: string;
      if (exact) reason = "Exact match for what you asked for.";
      else if (phrase) reason = "Closely matches what you typed.";
      else if (allTitleWords) reason = "Its title matches your request.";
      else if (fuzzy) reason = "Matches your wording, allowing for a typo.";
      else if (titleHits > 0) reason = "Its name relates to what you asked for.";
      else if (synHit) reason = "Matches the concept you described.";
      else if (catBoost) reason = `Fits the "${item.form.category}" area you asked about.`;
      else reason = "Relates to your request.";

      scored.push({ ...item.form, score, reason });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.title.length - b.title.length);
  const top = scored.slice(0, limit);

  if (top.length === 0 || top[0].score < 24) {
    return { status: "none", results: [], categories: [] };
  }

  const categories = Array.from(new Set(top.map((r) => r.category)));

  // Ambiguous: the top two contenders are from DIFFERENT areas and score
  // closely, and the user was vague → better to ask than to guess. If the top
  // two are the same category they're just related options, not ambiguous.
  const dominant = top.length < 2 || top[0].score - top[1].score >= 30;
  const ambiguous =
    !dominant &&
    top[0].category !== top[1].category &&
    queryTokens.length <= 4 &&
    top[0].score < 130;

  return {
    status: ambiguous ? "ambiguous" : "good",
    results: top,
    categories,
  };
}
