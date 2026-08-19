/* ────────────────────────────────────────────────────────────────
   LLC Formation — Per-State Rules Engine
   Source: Legalgram state Articles templates (DE, CA, WY, TX, FL, NV, NY)
   + Filing Instructions v3.

   IMPORTANT (compliance): Legalgram does NOT publish specific state filing
   fees. Customers are always directed to the state's official portal for
   current fees, payment methods, and processing times. No dollar fee amount
   is exposed to the customer UI from this file.
   ──────────────────────────────────────────────────────────────── */

export type StateCode = "DE" | "CA" | "WY" | "TX" | "FL" | "NV" | "NY";

export interface AdditionalForm {
  name: string;
  purpose: string;
}

export interface StateRules {
  code: StateCode;
  name: string;
  /** Name of the state filing document, e.g. "Certificate of Formation". */
  articlesLabel: string;
  /** State form number/name shown on filing instructions, if any. */
  formNumber: string;
  /** State's LLC statute name (used in the Operating Agreement). */
  statuteName: string;
  /** Direct URL to the Secretary of State LLC filing portal. */
  sosUrl: string;
  /** Permitted LLC designators for this state. */
  designators: string[];

  effectiveDate: {
    allowsDelayed: boolean;
    /** Max days a delayed effective date may be set out; null if delayed not allowed. */
    maxDays: number | null;
    note: string;
  };

  registeredAgent: {
    /** State requires the RA to sign/consent on or with the Articles. */
    requiresSignature: boolean;
    /** NY: the Secretary of State is the statutory agent; a traditional RA is optional. */
    sosIsDefaultAgent: boolean;
    /** Where the RA consent lives: "articles" (inline), "separate_form", or "none". */
    consentLocation: "articles" | "separate_form" | "none";
    /** Some states let the RA be an individual or an organization/corporation. */
    entityChoice: boolean;
  };

  /** "full" = street/city/state/zip; "county_only" = NY files a county only. */
  principalAddressStyle: "full" | "county_only";

  /** CA uses a 3-way checkbox management field; others use member/manager. */
  managementStyle: "standard" | "ca_checkbox";

  /** NV requires at least one manager/managing member listed on the Articles. */
  requiresPersonOnArticles: boolean;

  /** WY requires the organizer's email on the Articles. */
  organizerNeedsEmail: boolean;

  /** Extra forms that must be filed together with the Articles (TX, NV). */
  additionalForms: AdditionalForm[];

  /** Critical post-filing steps (NY publication). null if none. */
  postFiling: { title: string; body: string } | null;

  /** Short plain-English ongoing compliance summary (no specific fees). */
  ongoingCompliance: string;

  /** A short, prominent warning surfaced in the flow, if the state has a gotcha. */
  flowWarning?: string;
}

export const LLC_STATES: Record<StateCode, StateRules> = {
  DE: {
    code: "DE",
    name: "Delaware",
    articlesLabel: "Certificate of Formation",
    formNumber: "Certificate of Formation",
    statuteName: "Delaware Limited Liability Company Act, 6 Del. C. §§ 18-101 et seq.",
    sosUrl: "https://corp.delaware.gov",
    designators: ["LLC", "L.L.C.", "Limited Liability Company"],
    effectiveDate: { allowsDelayed: true, maxDays: 180, note: "Delaware permits a delayed effective date up to 180 days after filing." },
    registeredAgent: { requiresSignature: false, sosIsDefaultAgent: false, consentLocation: "none", entityChoice: false },
    principalAddressStyle: "full",
    managementStyle: "standard",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: false,
    additionalForms: [],
    postFiling: null,
    ongoingCompliance: "Delaware charges an annual LLC franchise tax due June 1 each year. Verify the current amount at corp.delaware.gov.",
  },
  CA: {
    code: "CA",
    name: "California",
    articlesLabel: "Articles of Organization (Form LLC-1)",
    formNumber: "Form LLC-1",
    statuteName: "California Revised Uniform Limited Liability Company Act",
    sosUrl: "https://bizfileonline.sos.ca.gov",
    designators: ["LLC", "L.L.C.", "Limited Liability Company", "Ltd. Liability Co."],
    effectiveDate: { allowsDelayed: true, maxDays: 90, note: "California permits a future effective date." },
    registeredAgent: { requiresSignature: false, sosIsDefaultAgent: false, consentLocation: "none", entityChoice: true },
    principalAddressStyle: "full",
    managementStyle: "ca_checkbox",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: false,
    additionalForms: [],
    postFiling: null,
    ongoingCompliance: "California charges an $800 annual franchise tax (first payment due a few months after formation) and requires a Statement of Information (Form LLC-12) within 90 days of filing, then biennially. Verify current amounts at bizfileonline.sos.ca.gov and ftb.ca.gov.",
    flowWarning: "California's principal office and agent for service of process must be California addresses.",
  },
  WY: {
    code: "WY",
    name: "Wyoming",
    articlesLabel: "Articles of Organization",
    formNumber: "Articles of Organization",
    statuteName: "Wyoming Limited Liability Company Act, Wyo. Stat. Title 17, Chapter 29",
    sosUrl: "https://wyobiz.wyo.gov",
    designators: ["LLC", "L.L.C.", "Limited Liability Company", "Ltd. Liability Company"],
    effectiveDate: { allowsDelayed: true, maxDays: 90, note: "Wyoming permits a delayed effective date up to 90 days after filing." },
    registeredAgent: { requiresSignature: true, sosIsDefaultAgent: false, consentLocation: "articles", entityChoice: false },
    principalAddressStyle: "full",
    managementStyle: "standard",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: true,
    additionalForms: [],
    postFiling: null,
    ongoingCompliance: "Wyoming charges an annual report license tax due the first day of your formation's anniversary month. Verify the current minimum at wyobiz.wyo.gov.",
    flowWarning: "Wyoming requires the registered agent to sign accepting the appointment. If you are your own agent, you will sign twice.",
  },
  TX: {
    code: "TX",
    name: "Texas",
    articlesLabel: "Certificate of Formation (Form 205)",
    formNumber: "Form 205",
    statuteName: "Texas Business Organizations Code",
    sosUrl: "https://www.sos.state.tx.us/corp/sosda/index.shtml",
    designators: ["LLC", "L.L.C.", "Limited Liability Company", "Limited Company", "LC", "L.C."],
    effectiveDate: { allowsDelayed: true, maxDays: 90, note: "Texas permits a delayed effective date up to 90 days from the date of signing." },
    registeredAgent: { requiresSignature: true, sosIsDefaultAgent: false, consentLocation: "separate_form", entityChoice: true },
    principalAddressStyle: "full",
    managementStyle: "standard",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: false,
    additionalForms: [
      { name: "Form 401-A — Acceptance of Appointment and Consent to Serve as Registered Agent", purpose: "Your registered agent formally accepts the appointment. If you are your own agent, you sign it yourself." },
    ],
    postFiling: null,
    ongoingCompliance: "Texas requires an annual franchise tax and Public Information Report, first due May 15 of the year after formation. Verify at comptroller.texas.gov.",
    flowWarning: "Texas requires a separate Form 401-A (registered agent consent) filed together with your Certificate of Formation. Legalgram generates it for you.",
  },
  FL: {
    code: "FL",
    name: "Florida",
    articlesLabel: "Articles of Organization",
    formNumber: "Articles of Organization",
    statuteName: "Florida Revised Limited Liability Company Act, Fla. Stat. Chapter 605",
    sosUrl: "https://dos.myflorida.com/sunbiz",
    designators: ["LLC", "L.L.C.", "Limited Liability Company"],
    effectiveDate: { allowsDelayed: true, maxDays: 90, note: "Florida permits a delayed effective date up to 90 days after filing." },
    registeredAgent: { requiresSignature: true, sosIsDefaultAgent: false, consentLocation: "articles", entityChoice: false },
    principalAddressStyle: "full",
    managementStyle: "standard",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: false,
    additionalForms: [],
    postFiling: null,
    ongoingCompliance: "Florida requires an annual report due by May 1 each year. Late filing after September 30 leads to administrative dissolution. Verify at sunbiz.org.",
    flowWarning: "Florida requires the registered agent to sign the Articles accepting the appointment. If you are your own agent, the same person signs twice.",
  },
  NV: {
    code: "NV",
    name: "Nevada",
    articlesLabel: "Articles of Organization",
    formNumber: "Articles of Organization",
    statuteName: "Nevada Revised Statutes Chapter 86",
    sosUrl: "https://www.nvsos.gov",
    designators: ["LLC", "L.L.C.", "Limited Liability Company", "Limited-Liability Company"],
    effectiveDate: { allowsDelayed: true, maxDays: 90, note: "Nevada permits a delayed effective date." },
    registeredAgent: { requiresSignature: true, sosIsDefaultAgent: false, consentLocation: "articles", entityChoice: false },
    principalAddressStyle: "full",
    managementStyle: "standard",
    requiresPersonOnArticles: true,
    organizerNeedsEmail: false,
    additionalForms: [
      { name: "Initial List of Managers or Managing Members", purpose: "Lists all managers or managing members, as required by Nevada law." },
      { name: "State Business License Application", purpose: "Nevada requires all LLCs to hold a State Business License." },
    ],
    postFiling: null,
    ongoingCompliance: "Nevada requires an Annual List of Managers/Members and a State Business License renewal each year. Nevada formation and renewals cost significantly more than most states — budget accordingly. Verify current amounts at nvsos.gov.",
    flowWarning: "Nevada requires THREE filings together: the Articles, an Initial List, and a State Business License Application. Legalgram generates all three. At least one manager or managing member must be named.",
  },
  NY: {
    code: "NY",
    name: "New York",
    articlesLabel: "Articles of Organization",
    formNumber: "Articles of Organization",
    statuteName: "New York Limited Liability Company Law § 203",
    sosUrl: "https://dos.ny.gov/limited-liability-company",
    designators: ["LLC", "L.L.C.", "Limited Liability Company"],
    effectiveDate: { allowsDelayed: false, maxDays: null, note: "New York filings are effective immediately on filing or on a specific date stated in the filing — New York does not allow an 'up to 90 days later' delay." },
    registeredAgent: { requiresSignature: false, sosIsDefaultAgent: true, consentLocation: "none", entityChoice: false },
    principalAddressStyle: "county_only",
    managementStyle: "standard",
    requiresPersonOnArticles: false,
    organizerNeedsEmail: false,
    additionalForms: [],
    postFiling: {
      title: "New York Publication Requirement — CRITICAL",
      body: "Within 120 days of forming your LLC, you MUST publish a notice in TWO newspapers (one daily, one weekly) designated by the county clerk of the county on your Articles, for SIX consecutive weeks. Then file a Certificate of Publication with the NY Department of State. Publication cost varies dramatically by county (much lower upstate than in Manhattan/Kings). If not completed within 120 days, your LLC's authority to do business in NY is suspended.",
    },
    ongoingCompliance: "New York requires a Biennial Statement every two years. Verify current amounts at dos.ny.gov.",
    flowWarning: "New York files a COUNTY, not a street address, and has a critical 6-week newspaper publication requirement after formation. Forming in a lower-cost county (e.g. Albany) can reduce publication cost.",
  },
};

export const LLC_STATE_LIST: StateRules[] = [
  LLC_STATES.DE, LLC_STATES.CA, LLC_STATES.WY, LLC_STATES.TX,
  LLC_STATES.FL, LLC_STATES.NV, LLC_STATES.NY,
];

/** The 62 New York counties (NY files a county, not a street address). */
export const NY_COUNTIES: string[] = [
  "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua",
  "Chemung", "Chenango", "Clinton", "Columbia", "Cortland", "Delaware", "Dutchess",
  "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton", "Herkimer",
  "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery",
  "Nassau", "New York", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans",
  "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer", "Richmond", "Rockland",
  "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca",
  "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren",
  "Washington", "Wayne", "Westchester", "Wyoming", "Yates",
];

/** IRS principal-activity categories (used by the EIN worksheet). */
export const IRS_ACTIVITY_CATEGORIES: string[] = [
  "Construction", "Real Estate", "Rental & Leasing", "Manufacturing",
  "Transportation & Warehousing", "Finance & Insurance",
  "Health Care & Social Assistance", "Accommodation & Food Service",
  "Wholesale-Agent/Broker", "Wholesale-Other", "Retail", "Other",
];
