import type { StateCode } from "@/data/llcRulesEngine";

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Member {
  name: string;
  address: string;
  ownershipPct: string;   // blank/"100" for single-member
  contribution: string;
}

export interface Manager {
  name: string;
  address: string;
}

/** All answers collected across the DIY LLC formation flow. */
export interface LlcFormationData {
  // Phase 1 — Formation setup
  state: StateCode | "";
  llcType: "standard" | "pllc" | "other" | "";
  licensedActivity: string;         // only if pllc

  // Phase 2 — Name & designator
  llcName: string;
  backupName1: string;
  backupName2: string;
  designator: string;

  // Phase 3 — Addresses & contact
  principalOffice: Address;
  principalCounty: string;          // NY only
  mailingSameAsPrincipal: boolean;
  mailingAddress: Address;
  businessPhone: string;
  businessEmail: string;            // Legalgram account only

  // Phase 4 — Registered agent
  raChoice: "self" | "third_party" | "sos_default" | "";
  raEntityType: "individual" | "organization" | "";
  raName: string;
  raAddress: Address;
  raAvailabilityAck: boolean;
  raConsent: boolean;

  // Phase 5 — Members & management
  memberCount: "single" | "multi" | "";
  members: Member[];
  managementStructure: "member_managed" | "manager_managed" | "";
  managementCa: "one_manager" | "more_than_one_manager" | "all_members" | ""; // CA only
  managers: Manager[];

  // Phase 6 — Effective date, purpose, organizer
  effectiveDateType: "immediate" | "delayed" | "";
  formationDate: string;            // if delayed
  businessPurpose: string;
  businessActivity: string;         // plain-English, for EIN
  businessActivityCategory: string; // IRS category
  organizerName: string;
  organizerAddress: string;
  organizerEmail: string;           // WY requires
  organizerCapacity: string;

  // Operating Agreement choices
  profitLossMethod: "by_ownership_pct" | "custom";
  votingThreshold: "majority" | "unanimous" | "custom";
  transferRestrictions: "rofr" | "unanimous_consent" | "free_transfer";
  buyoutMethod: "book_value" | "fair_market_value" | "custom";

  // Attestation
  attestationAccepted: boolean;
}

export const emptyAddress = (): Address => ({ street: "", city: "", state: "", zip: "" });

export const emptyMember = (): Member => ({ name: "", address: "", ownershipPct: "", contribution: "" });

export const createEmptyFormation = (): LlcFormationData => ({
  state: "",
  llcType: "",
  licensedActivity: "",
  llcName: "",
  backupName1: "",
  backupName2: "",
  designator: "",
  principalOffice: emptyAddress(),
  principalCounty: "",
  mailingSameAsPrincipal: true,
  mailingAddress: emptyAddress(),
  businessPhone: "",
  businessEmail: "",
  raChoice: "",
  raEntityType: "individual",
  raName: "",
  raAddress: emptyAddress(),
  raAvailabilityAck: false,
  raConsent: false,
  memberCount: "",
  members: [emptyMember()],
  managementStructure: "",
  managementCa: "",
  managers: [{ name: "", address: "" }],
  effectiveDateType: "",
  formationDate: "",
  businessPurpose: "",
  businessActivity: "",
  businessActivityCategory: "",
  organizerName: "",
  organizerAddress: "",
  organizerEmail: "",
  organizerCapacity: "Authorized Person",
  profitLossMethod: "by_ownership_pct",
  votingThreshold: "majority",
  transferRestrictions: "rofr",
  buyoutMethod: "fair_market_value",
  attestationAccepted: false,
});
