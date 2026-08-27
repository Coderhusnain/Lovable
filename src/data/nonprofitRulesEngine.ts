/* ────────────────────────────────────────────────────────────────
   Nonprofit Formation — Per-State Rules, Launch Gating & Template Registry
   Source of record: the 18 attorney-reviewed .docx templates + the 8-slide
   developer spec deck. Filenames below match the real template files.

   COMPLIANCE: Legalgram does NOT publish specific state filing fees. The UI
   always directs customers to the state's official portal. No dollar fee is
   exposed here.

   GO-LIVE GATE: No customer receives a generated document until the nonprofit
   attorney review is signed off in writing (see ATTORNEY_SIGNOFF).
   ──────────────────────────────────────────────────────────────── */

/** The seven states with attorney-reviewed templates. */
export type NpStateCode = "DE" | "WY" | "FL" | "TX" | "CA" | "NV" | "NY";

export type ActivationTier = 1 | 2 | 3 | 4;

/** The 8 IRS-recognized 501(c)(3) purpose categories (Phase 4, multi-select). */
export type IrsPurpose =
  | "charitable"
  | "religious"
  | "educational"
  | "scientific"
  | "literary"
  | "public_safety_testing"
  | "amateur_sports"
  | "prevent_cruelty";

export const IRS_PURPOSES: { value: IrsPurpose; label: string }[] = [
  { value: "charitable", label: "Charitable" },
  { value: "religious", label: "Religious" },
  { value: "educational", label: "Educational" },
  { value: "scientific", label: "Scientific" },
  { value: "literary", label: "Literary" },
  { value: "public_safety_testing", label: "Testing for public safety" },
  { value: "amateur_sports", label: "Fostering amateur sports" },
  { value: "prevent_cruelty", label: "Preventing cruelty to children or animals" },
];

export interface NpStateRules {
  code: NpStateCode;
  name: string;
  articlesLabel: string;
  sosUrl: string;
  tier: ActivationTier;

  /** Template filenames (real names, relative to the template store). */
  templates: { articles: string; filingChecklist: string };

  /** State-specific minimum number of directors (IRS disfavors < 3). */
  minDirectors: number;

  /** DE Article II needs the registered agent's county. */
  requiresRegisteredAgentCounty: boolean;
  /** NY Article FIFTH needs the office county. */
  requiresOfficeCounty: boolean;
  /** NY Article NINTH needs a service-of-process mailing address. */
  requiresMailingAddress: boolean;

  /**
   * IRS purpose categories that CANNOT be self-served in this state and must be
   * routed out. CA supports Public Benefit only; NY §404 needs pre-approval for
   * education / healthcare-adjacent / religious purposes.
   */
  gatedPurposes: IrsPurpose[];
  purposeGateNote?: string;
  purposeGateRoute?: "waitlist" | "attorney";

  /** Short note surfaced on the confirmation screen (e.g. NV Initial List). */
  filingNote?: string;
}

/** The 4 common documents rendered for EVERY customer, regardless of state. */
export const NP_COMMON_TEMPLATES = [
  "01_nonprofit_bylaws_template",
  "02_conflict_of_interest_policy_template",
  "03_initial_board_meeting_minutes_template",
  "04_ein_application_worksheet_template",
] as const;

export const NP_STATES: Record<NpStateCode, NpStateRules> = {
  DE: {
    code: "DE",
    name: "Delaware",
    articlesLabel: "Certificate of Incorporation",
    sosUrl: "https://corp.delaware.gov/",
    tier: 1,
    templates: {
      articles: "DE_certificate_of_incorporation_nonprofit",
      filingChecklist: "DE_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: true, // DE Article II
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    gatedPurposes: [],
  },
  WY: {
    code: "WY",
    name: "Wyoming",
    articlesLabel: "Articles of Incorporation",
    sosUrl: "https://sos.wyo.gov/Business/",
    tier: 1,
    templates: {
      articles: "WY_articles_of_incorporation_nonprofit",
      filingChecklist: "WY_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    gatedPurposes: [],
    filingNote:
      "Wyoming requires the registered agent to sign the Consent to Appointment bundled at the end of your Articles.",
  },
  FL: {
    code: "FL",
    name: "Florida",
    articlesLabel: "Articles of Incorporation",
    sosUrl: "https://dos.myflorida.com/sunbiz/",
    tier: 2,
    templates: {
      articles: "FL_articles_of_incorporation_nonprofit",
      filingChecklist: "FL_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    gatedPurposes: [],
    filingNote:
      "Florida requires the registered agent to sign the Acceptance bundled at the end of your Articles, and charitable-solicitation registration with FDACS before accepting donations.",
  },
  TX: {
    code: "TX",
    name: "Texas",
    articlesLabel: "Certificate of Formation",
    sosUrl: "https://www.sos.state.tx.us/corp/",
    tier: 2,
    templates: {
      articles: "TX_certificate_of_formation_nonprofit",
      filingChecklist: "TX_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    gatedPurposes: [],
  },
  CA: {
    code: "CA",
    name: "California",
    articlesLabel: "Articles of Incorporation (Public Benefit)",
    sosUrl: "https://bizfileonline.sos.ca.gov/",
    tier: 3,
    templates: {
      articles: "CA_articles_of_incorporation_public_benefit",
      filingChecklist: "CA_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    // Template covers Public Benefit only. A purpose that is clearly religious
    // maps to the Religious (ARTS-RE) variant we do not yet support → waitlist.
    gatedPurposes: ["religious"],
    purposeGateRoute: "waitlist",
    purposeGateNote:
      "Our California filing currently supports Public Benefit 501(c)(3) corporations only. Religious corporations (ARTS-RE) are coming soon.",
    filingNote:
      "California directors are not listed on the Articles; they go on Form SI-100 within 90 days. California also requires FTB Form 3500A and Attorney General CT-1 registration.",
  },
  NV: {
    code: "NV",
    name: "Nevada",
    articlesLabel: "Articles of Incorporation",
    sosUrl: "https://www.nvsilverflume.gov/",
    tier: 4,
    templates: {
      articles: "NV_articles_of_incorporation_nonprofit",
      filingChecklist: "NV_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: false,
    requiresMailingAddress: false,
    gatedPurposes: [],
    filingNote:
      "Nevada requires a separate Initial List of Officers, Directors and Registered Agent within 30 days, and claiming the State Business License exemption at filing.",
  },
  NY: {
    code: "NY",
    name: "New York",
    articlesLabel: "Certificate of Incorporation (Type B)",
    sosUrl: "https://dos.ny.gov/",
    tier: 4,
    templates: {
      articles: "NY_certificate_of_incorporation_type_b",
      filingChecklist: "NY_state_filing_checklist_nonprofit",
    },
    minDirectors: 3,
    requiresRegisteredAgentCounty: false,
    requiresOfficeCounty: true, // NY Article FIFTH
    requiresMailingAddress: true, // NY Article NINTH
    // N-PCL §404 requires state-agency PRE-APPROVAL for these purposes.
    gatedPurposes: ["educational", "religious"],
    purposeGateRoute: "attorney",
    purposeGateNote:
      "New York requires state-agency pre-approval (N-PCL §404) for education, healthcare, child care, and certain religious purposes. Our attorneys can assist with these filings.",
  },
};

export const NP_STATE_LIST: NpStateRules[] = [
  NP_STATES.DE, NP_STATES.WY, NP_STATES.FL, NP_STATES.TX,
  NP_STATES.CA, NP_STATES.NV, NP_STATES.NY,
];

/**
 * States live in the Phase-1 dropdown right now. All seven have attorney-reviewed
 * templates. Every other US state/DC hard-blocks to the waitlist (prevents a
 * customer paying $59 for a state we cannot generate). Adjust after each go-live
 * wave; keep this conservative until attorney sign-off is in hand.
 */
export const ACTIVE_STATES: NpStateCode[] = ["DE", "WY", "FL", "TX", "CA", "NV", "NY"];

/** Whether the generated-doc pipeline has written attorney sign-off (gate). */
export const ATTORNEY_SIGNOFF = false;

/** Single one-time DIY nonprofit formation fee. */
export const NONPROFIT_PRICE_USD = 59;

/** Full US dropdown (supported states first); unsupported → waitlist. */
export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

// ── Helpers ──────────────────────────────────────────────────────

export function isSupportedState(code: string): code is NpStateCode {
  return (ACTIVE_STATES as string[]).includes(code);
}

export function getNpStateRules(code: NpStateCode): NpStateRules {
  return NP_STATES[code];
}

export function getSelectableStates(): NpStateRules[] {
  return NP_STATE_LIST.filter((s) => ACTIVE_STATES.includes(s.code));
}

export type PurposeRouting =
  | { ok: true }
  | { ok: false; route: "waitlist" | "attorney"; reason: string };

/**
 * Decide whether a (state, purposes) pair can be self-served, or must be routed
 * to the waitlist (unsupported CA variant) or attorney assistance (NY §404).
 * Call at the end of Phase 4 before allowing checkout.
 */
export function routePurpose(code: NpStateCode, purposes: IrsPurpose[]): PurposeRouting {
  const rules = NP_STATES[code];
  const hit = purposes.find((p) => rules.gatedPurposes.includes(p));
  if (!hit) return { ok: true };
  return {
    ok: false,
    route: rules.purposeGateRoute ?? "waitlist",
    reason: rules.purposeGateNote ?? "This purpose is not yet self-serviceable in this state.",
  };
}

/**
 * The ordered list of the 6 template keys to render & ZIP for a given state:
 * 4 common docs + state Articles + state Filing Checklist.
 */
export function getDocManifest(code: NpStateCode): string[] {
  const { articles, filingChecklist } = NP_STATES[code].templates;
  return [...NP_COMMON_TEMPLATES, articles, filingChecklist];
}
