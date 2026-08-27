import type { NpStateCode, IrsPurpose } from "@/data/nonprofitRulesEngine";

/* ────────────────────────────────────────────────────────────────
   Nonprofit Formation — collected questionnaire data (Phases 0–6).
   Field shapes follow the 8-slide developer spec deck. This is the internal
   shape; the flat merge-field object the templates consume is produced by
   nonprofitMerge.ts (buildMergeData).
   ──────────────────────────────────────────────────────────────── */

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export function emptyAddress(): Address {
  return { street: "", city: "", state: "", zip: "" };
}

export type Designator = "Inc." | "Corporation" | "Corp." | "";

export interface Incorporator {
  name: string;
  address: string;
}

export type DirectorPosition =
  | "President"
  | "Vice President"
  | "Secretary"
  | "Treasurer"
  | "Director";

export interface Director {
  id: string;
  name: string;
  address: string;
  position: DirectorPosition;
}

export type RegisteredAgentType = "individual" | "legalgram_service";

export type FiscalYearKind = "calendar" | "custom";

export type BoardMeetingFrequency = "Monthly" | "Quarterly" | "Semi-annual" | "Annual";

export type QuorumRequirement = "Majority" | "Two-thirds" | "All";

export interface NonprofitFormationData {
  // ── Phase 0: acknowledgement ──
  acknowledgedNotALawFirm: boolean;
  acknowledgedAt: string | null; // ISO timestamp, set when checked

  // ── Phase 1: entity basics ──
  state: NpStateCode;
  nameFirstChoice: string;
  nameBackup1: string;
  nameBackup2: string;
  designator: Designator;
  principalOffice: Address;
  mailingSameAsPrincipal: boolean;
  mailingAddress: Address;
  phone: string;
  email: string;
  /** NY only — Article FIFTH (conditional field). */
  nyOfficeCounty: string;

  // ── Phase 2: registered agent ──
  registeredAgentType: RegisteredAgentType;
  registeredAgentName: string;
  registeredAgentAddress: Address;
  registeredAgentAvailabilityAck: boolean;
  /** DE only — Article II. If blank, engine leaves a fillable blank. */
  registeredAgentCounty: string;

  // ── Phase 3: incorporators & board ──
  incorporators: Incorporator[];
  directors: Director[];
  directorTermYears: number;

  // ── Phase 4: charitable purpose & 501(c)(3) ──
  purposes: IrsPurpose[];
  missionStatement: string;
  apply501c3: boolean;
  hasVotingMembers: boolean;

  // ── Phase 5: governance & compliance ──
  fiscalYearKind: FiscalYearKind;
  /** 1–12; used only when fiscalYearKind === "custom". */
  fiscalYearEndMonth: number;
  /** Officer slate — each holds a Director.id from Phase 3. */
  officers: {
    presidentId: string;
    vicePresidentId: string; // optional
    secretaryId: string;
    treasurerId: string;
  };
  boardMeetingFrequency: BoardMeetingFrequency;
  quorum: QuorumRequirement;

  // ── Phase 5 (secondary): EIN worksheet ──
  einWorksheet: {
    dbaName: string;
    expectedEmployees: number; // default 0
    lowEmploymentTax: boolean; // default No
    firstWagesDate: string; // default blank
  };
}

export function createEmptyNonprofitFormation(): NonprofitFormationData {
  return {
    acknowledgedNotALawFirm: false,
    acknowledgedAt: null,

    state: "DE",
    nameFirstChoice: "",
    nameBackup1: "",
    nameBackup2: "",
    designator: "Inc.",
    principalOffice: emptyAddress(),
    mailingSameAsPrincipal: true,
    mailingAddress: emptyAddress(),
    phone: "",
    email: "",
    nyOfficeCounty: "",

    registeredAgentType: "individual",
    registeredAgentName: "",
    registeredAgentAddress: emptyAddress(),
    registeredAgentAvailabilityAck: false,
    registeredAgentCounty: "",

    incorporators: [{ name: "", address: "" }],
    directors: [
      { id: "d1", name: "", address: "", position: "President" },
      { id: "d2", name: "", address: "", position: "Secretary" },
      { id: "d3", name: "", address: "", position: "Treasurer" },
    ],
    directorTermYears: 2,

    purposes: ["charitable"],
    missionStatement: "",
    apply501c3: true,
    hasVotingMembers: false,

    fiscalYearKind: "calendar",
    fiscalYearEndMonth: 12,
    officers: { presidentId: "d1", vicePresidentId: "", secretaryId: "d2", treasurerId: "d3" },
    boardMeetingFrequency: "Quarterly",
    quorum: "Majority",

    einWorksheet: {
      dbaName: "",
      expectedEmployees: 0,
      lowEmploymentTax: false,
      firstWagesDate: "",
    },
  };
}
