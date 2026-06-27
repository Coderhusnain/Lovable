/**
 * =========================================================
 * LEGALGRAM 2.0 - Backend Service (Smart Local Engine v2)
 * =========================================================
 * Talks to a backend WHEN one is configured (VITE_API_URL).
 * Otherwise uses a local engine that:
 *   - greets and asks for a name, BUT
 *   - if the user types a real request instead of a name,
 *     it answers the request instead of saving it as a name
 *   - detects intent (greeting, help, browse, document search)
 *   - matches a real catalog of Legalgram documents
 *   - returns links to the right documents
 *
 * The public interface is unchanged, so ChatWidget.tsx works as-is.
 * =========================================================
 */

// ---------------------------------------------------------
// Types (unchanged public shape)
// ---------------------------------------------------------
export interface ChatRequest {
  message: string;
  session_id?: string;
  user_name?: string;
  context_stage?: string;
}

export interface ActionButton {
  label: string;
  value: string;
  type?: 'action' | 'link';
}

export interface ChatResponse {
  response: string;
  session_id: string;
  new_stage: string;
  user_name: string | null;
  suggested_documents: string[] | null;
  action_buttons: ActionButton[] | null;
  action_buttons: ActionButton[] | null;
  no_document_match?: boolean;
}

export interface DocumentInfo {
  full_name: string;
  category: string;
  description: string;
  use_cases: string[];
  key_clauses: string[];
  why_legalgram: string;
}

export interface SessionState {
  session_id: string;
  user_name: string | null;
  stage: string;
  created_at: string;
  last_activity: string;
  messages_count: number;
}

// ---------------------------------------------------------
// Configuration
// ---------------------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const HAS_BACKEND = Boolean(API_BASE_URL);

// ---------------------------------------------------------
// Document catalog — "its own docs". Extend to match your app.
// ---------------------------------------------------------
interface CatalogDoc {
  full_name: string;
  category: string;
  description: string;
  keywords: string[];
  route: string;
}

const DOCUMENT_CATALOG: CatalogDoc[] = [
  { full_name: 'Promissory Note', category: 'Finance', description: 'A written promise to repay a loan under agreed terms.', keywords: ['promissory', 'note', 'loan', 'lend', 'borrow', 'repay', 'iou', 'debt'], route: '/documents' },
  { full_name: 'Secured Promissory Note', category: 'Finance', description: 'A loan promise backed by collateral.', keywords: ['secured', 'collateral', 'promissory', 'loan', 'pledge'], route: '/documents' },
  { full_name: 'Catering Agreement', category: 'Services', description: 'Terms between a caterer and a client for an event.', keywords: ['catering', 'caterer', 'event', 'food', 'menu', 'wedding'], route: '/documents' },
  { full_name: 'Carpenter Contract', category: 'Services', description: 'Agreement for carpentry or woodworking work.', keywords: ['carpenter', 'carpentry', 'woodwork', 'contractor'], route: '/documents' },
  { full_name: 'Architectural Services Agreement', category: 'Services', description: 'Engagement terms for an architect or design firm.', keywords: ['architect', 'architectural', 'design', 'blueprint'], route: '/documents' },
  { full_name: 'Construction Performance Bond', category: 'Construction', description: 'Guarantees a contractor completes a construction project.', keywords: ['construction', 'performance', 'bond', 'contractor', 'project'], route: '/documents' },
  { full_name: 'Property Manager Agreement', category: 'Real Estate', description: 'Defines duties between an owner and a property manager.', keywords: ['property', 'manager', 'management', 'landlord'], route: '/documents' },
  { full_name: 'Request for Bank or Credit Reference', category: 'Finance', description: 'Requests a credit or banking reference for a party.', keywords: ['bank', 'credit', 'reference', 'creditworthiness'], route: '/documents' },
  { full_name: 'Statement of Claim Against Estate', category: 'Estate', description: 'Files a creditor claim against a deceased persons estate.', keywords: ['estate', 'claim', 'deceased', 'probate', 'inheritance', 'creditor'], route: '/documents' },
  { full_name: 'Painting Contract', category: 'Services', description: 'Agreement for interior or exterior painting work.', keywords: ['painting', 'painter', 'paint', 'decorating'], route: '/documents' },
  { full_name: 'Employment Agreement', category: 'Employment', description: 'Sets terms of employment between employer and employee.', keywords: ['employment', 'employee', 'employer', 'job', 'hire', 'salary'], route: '/documents' },
  { full_name: 'Non-Disclosure Agreement (NDA)', category: 'Business', description: 'Protects confidential information shared between parties.', keywords: ['nda', 'non-disclosure', 'confidential', 'secret', 'disclosure', 'privacy'], route: '/documents' },
  { full_name: 'Lease Agreement', category: 'Real Estate', description: 'Terms for renting residential or commercial property.', keywords: ['lease', 'rent', 'rental', 'tenant', 'apartment'], route: '/documents' },
];

const CATEGORIES = Array.from(new Set(DOCUMENT_CATALOG.map((d) => d.category)));

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------
const STOPWORDS = new Set([
  'i', 'need', 'a', 'an', 'the', 'for', 'to', 'do', 'you', 'have', 'want',
  'me', 'my', 'is', 'it', 'its', 'can', 'please', 'with', 'of', 'and', 'about',
  'looking', 'help', 'get', 'some', 'any', 'on', 'in', 'write', 'make', 'create', 'draft',
]);

// Words that signal the user is making a REQUEST, not giving a name.
const REQUEST_SIGNALS = [
  'document', 'documents', 'agreement', 'contract', 'note', 'lease', 'rent', 'rental',
  'nda', 'loan', 'form', 'template', 'write', 'make', 'create', 'draft', 'generate',
  'need', 'want', 'how', 'what', 'which', 'where', 'browse', 'list', 'show', 'help',
  'find', 'looking', 'employment', 'estate', 'bank', 'credit', 'catering', 'painting',
  'carpenter', 'architect', 'construction', 'property', 'business',
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

function matchDocuments(message: string): CatalogDoc[] {
  const tokens = tokenize(message);
  if (tokens.length === 0) return [];
  const scored = DOCUMENT_CATALOG.map((doc) => {
    let score = 0;
    for (const token of tokens) {
      for (const kw of doc.keywords) {
        if (kw === token) score += 3;
        else if (kw.includes(token) || token.includes(kw)) score += 1;
      }
      if (doc.full_name.toLowerCase().includes(token)) score += 2;
      if (doc.category.toLowerCase() === token) score += 2;
    }
    return { doc, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.doc);
}

const looksLikeGreeting = (m: string) => /\b(hi|hello|hey|good (morning|afternoon|evening)|greetings)\b/i.test(m);
const looksLikeThanks = (m: string) => /\b(thanks|thank you|appreciate|cheers)\b/i.test(m);
const looksLikeHelp = (m: string) => /\b(help|what can you|how do you|capabilities|what do you do)\b/i.test(m);
const looksLikeBrowse = (m: string) => /\b(browse|list|categories|all documents|what documents|show me)\b/i.test(m);

/**
 * Decide whether a message during the "name" step is actually a REQUEST
 * (a question or document ask) rather than a person's name.
 */
function looksLikeRequest(message: string): boolean {
  const m = message.toLowerCase().trim();
  if (m.endsWith('?')) return true;
  if (matchDocuments(m).length > 0) return true;
  if (REQUEST_SIGNALS.some((w) => new RegExp(`\\b${w}\\b`).test(m))) return true;
  // Long inputs are almost never a name
  if (m.split(/\s+/).length > 4) return true;
  return false;
}

/**
 * Decide whether a message looks like a genuine name:
 * 1–3 alphabetic words, no request signals.
 */
function looksLikeName(message: string): boolean {
  const m = message.trim();
  if (!m) return false;
  if (looksLikeRequest(m)) return false;
  const words = m.split(/\s+/);
  if (words.length === 0 || words.length > 3) return false;
  return words.every((w) => /^[a-zA-Z][a-zA-Z'’-]*$/.test(w));
}

function docButtons(docs: CatalogDoc[]): ActionButton[] {
  const buttons: ActionButton[] = docs.map((d) => ({ label: d.full_name, value: d.route, type: 'link' as const }));
  buttons.push({ label: 'Browse all documents', value: '/documents', type: 'link' });
  return buttons;
}

type Base = { session_id: string; suggested_documents: string[] | null; action_buttons: ActionButton[] | null };

/**
 * Core intent handling once we're past name capture (or when the user
 * asked something instead of giving a name). Always returns stage READY.
 */
function handleIntent(message: string, base: Base, userName: string | null): ChatResponse {
  const namePrefix = userName ? `${userName}, ` : '';
  const wantsWriting = /\b(write|draft|make|create|generate|prepare)\b/i.test(message);

  if (looksLikeThanks(message)) {
    return { ...base, response: `You're welcome${userName ? `, ${userName}` : ''}! Is there another document I can help you find?`, new_stage: 'READY', user_name: userName };
  }

  if (looksLikeHelp(message)) {
    return {
      ...base,
      response:
        `Here's what I can do:\n\n` +
        `• Find the right legal document from your description\n` +
        `• Explain what a document is for\n` +
        `• Point you to categories: ${CATEGORIES.join(', ')}\n\n` +
        `Try: "I need an NDA", "lease agreement", or "promissory note".`,
      new_stage: 'READY',
      user_name: userName,
      action_buttons: [{ label: 'Browse all documents', value: '/documents', type: 'link' }],
    };
  }

  if (looksLikeBrowse(message)) {
    return {
      ...base,
      response: `Sure — documents are organized into these categories:\n\n` + CATEGORIES.map((c) => `• **${c}**`).join('\n') + `\n\nTell me a category or what you need and I'll narrow it down.`,
      new_stage: 'READY',
      user_name: userName,
      action_buttons: [{ label: 'Open document library', value: '/documents', type: 'link' }],
    };
  }

  // Document matching — the core "answer what's being asked"
  const matches = matchDocuments(message);
  if (matches.length > 0) {
    const top = matches[0];
    const verb = wantsWriting ? 'create' : 'open';
    const intro =
      matches.length === 1
        ? `${namePrefix}the document you need is the **${top.full_name}**.`
        : `${namePrefix}here are the documents that best match what you described:`;
    const body =
      matches.length === 1
        ? `\n\n_${top.description}_\n\nTap below to ${verb} it on Legalgram, or ask me what it covers.`
        : '\n\n' + matches.map((d) => `• **${d.full_name}** — ${d.description}`).join('\n');
    return {
      ...base,
      response: intro + body,
      new_stage: 'READY',
      user_name: userName,
      suggested_documents: matches.map((d) => d.full_name),
      action_buttons: docButtons(matches),
    };
  }

  if (looksLikeGreeting(message)) {
    return { ...base, response: `Hello${userName ? `, ${userName}` : ''}! What legal document are you looking for? Describe it in plain words.`, new_stage: 'READY', user_name: userName };
  }

  // Fallback — be honest that it didn't match, and guide.
  return {
    ...base,
    response:
      `${namePrefix}I couldn't match that to a specific document yet. ` +
      `Try naming what you need — for example "loan", "rental", "NDA", or "catering" — ` +
      `or say **browse** to see all categories (${CATEGORIES.join(', ')}).`,
    new_stage: 'READY',
    user_name: userName,
    action_buttons: [{ label: 'Browse all documents', value: '/documents', type: 'link' }],
  };
}

// ---------------------------------------------------------
// Local engine: stage flow + intent
// ---------------------------------------------------------
function localEngine(message: string, sessionId: string, userName: string | null, stage: string, documentName?: string | null): ChatResponse {
  const base: Base = { session_id: sessionId, suggested_documents: null, action_buttons: null };

  // 0) A document was attached — acknowledge it honestly.
  // (The local engine can't read file contents; it guides instead.)
  if (documentName) {
    const namePrefix = userName ? `${userName}, ` : '';
    return {
      ...base,
      response:
        `${namePrefix}I've received **${documentName}**. ` +
        `I can point you to related document templates and explain general clauses, but a full content review of your file needs a connected AI/legal backend or a qualified attorney.\n\n` +
        `What would you like to do — find a similar template, or ask a general question about this type of document?`,
      new_stage: stage === 'INIT' || stage === 'CAPTURE_NAME' ? 'READY' : stage,
      user_name: userName,
      action_buttons: [
        { label: 'Browse all documents', value: '/documents', type: 'link' },
        { label: 'Talk to a lawyer', value: '/contact', type: 'link' },
      ],
    };
  }

  // 1) INIT — greet and ask for a name
  if (stage === 'INIT' || !message.trim()) {
    return {
      ...base,
      response: "Hi! I'm the Legalgram legal assistant. I can help you find the right legal document. **What's your name?** (Or just tell me what you need.)",
      new_stage: 'CAPTURE_NAME',
      user_name: userName,
    };
  }

  // 2) CAPTURE_NAME — but only capture if it actually looks like a name
  if (stage === 'CAPTURE_NAME') {
    if (looksLikeName(message)) {
      const cleanName = message.trim().split(/\s+/).slice(0, 2).join(' ');
      return {
        ...base,
        response: `Nice to meet you, **${cleanName}**! Tell me what you're trying to do — for example "I need a promissory note" or "rental agreement" — and I'll point you to the right document. Say **browse** to see all categories.`,
        new_stage: 'READY',
        user_name: cleanName,
        action_buttons: [
          { label: 'Browse all documents', value: '/documents', type: 'link' },
          { label: 'What can you do?', value: 'What can you help me with?', type: 'action' },
        ],
      };
    }
    // Not a name — the user asked something. Answer it instead of saving a fake name.
    return handleIntent(message, base, userName);
  }

  // 3) READY — normal intent handling
  return handleIntent(message, base, userName);
}

// ---------------------------------------------------------
// Session helpers
// ---------------------------------------------------------
function generateSessionId(): string {
  return `lg_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}
function getSessionId(): string {
  const stored = localStorage.getItem('legalgram_session_id');
  if (stored) return stored;
  const newId = generateSessionId();
  localStorage.setItem('legalgram_session_id', newId);
  return newId;
}

// ---------------------------------------------------------
// Public API
// ---------------------------------------------------------
export const LegalgramAPI = {
  async sendMessage(
    message: string,
    options?: { user_name?: string; stage?: string; session_id?: string; document_name?: string }
  ): Promise<ChatResponse> {
    const sessionId = options?.session_id || getSessionId();
    const stage = options?.stage || 'INIT';
    const userName = options?.user_name ?? localStorage.getItem('legalgram_user_name');
    const documentName = options?.document_name || null;

    if (HAS_BACKEND) {
      const request: ChatRequest & { document_name?: string } = {
        message, session_id: sessionId, user_name: options?.user_name, context_stage: stage,
        ...(documentName ? { document_name: documentName } : {}),
      };
      try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || `HTTP ${response.status}`);
        }
        const data: ChatResponse = await response.json();
        if (data.session_id) localStorage.setItem('legalgram_session_id', data.session_id);
        if (data.user_name) localStorage.setItem('legalgram_user_name', data.user_name);
        return data;
      } catch (error) {
        console.error('[LegalgramAPI] Backend error, using local engine:', error);
      }
    }

    const result = localEngine(message, sessionId, userName, stage, documentName);
    localStorage.setItem('legalgram_session_id', result.session_id);
    if (result.user_name) localStorage.setItem('legalgram_user_name', result.user_name);
    return result;
  },

  async initSession(): Promise<ChatResponse> {
    localStorage.removeItem('legalgram_session_id');
    localStorage.removeItem('legalgram_user_name');
    return this.sendMessage('', { stage: 'INIT' });
  },

  async getSession(sessionId?: string): Promise<SessionState | null> {
    if (!HAS_BACKEND) return null;
    const id = sessionId || getSessionId();
    try {
      const response = await fetch(`${API_BASE_URL}/api/session/${id}`, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) return response.status === 404 ? null : Promise.reject(response.status);
      return response.json();
    } catch (error) {
      console.error('[LegalgramAPI] Session fetch error:', error);
      return null;
    }
  },

  async getDocuments(): Promise<DocumentInfo[]> {
    if (HAS_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/documents`, { signal: AbortSignal.timeout(8000) });
        if (response.ok) {
          const data = await response.json();
          return data.documents || [];
        }
      } catch (error) {
        console.error('[LegalgramAPI] Documents fetch error:', error);
      }
    }
    return DOCUMENT_CATALOG.map((d) => ({
      full_name: d.full_name,
      category: d.category,
      description: d.description,
      use_cases: [],
      key_clauses: [],
      why_legalgram: 'Create this document quickly and correctly with Legalgram.',
    }));
  },

  async getDocumentDetails(documentName: string): Promise<DocumentInfo | null> {
    const docs = await this.getDocuments();
    return docs.find((d) => d.full_name.toLowerCase() === documentName.toLowerCase()) || null;
  },

  async healthCheck(): Promise<boolean> {
    if (!HAS_BACKEND) return true;
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(5000) });
      return response.ok;
    } catch {
      return false;
    }
  },

  getUserName(): string | null {
    return localStorage.getItem('legalgram_user_name');
  },
  getSessionId(): string {
    return getSessionId();
  },
  clearSession(): void {
    localStorage.removeItem('legalgram_session_id');
    localStorage.removeItem('legalgram_user_name');
  },
};

export default LegalgramAPI;