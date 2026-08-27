/* ────────────────────────────────────────────────────────────────
   Nonprofit Formation — merge-field normalization.

   ONE normalized merge object is produced here and fed to EVERY delivered
   template. Templates must NOT independently re-check flags like apply_501c3 —
   all conditional logic and every derived field lives in this single normalizer.

   Field NAMES below are the exact {{ merge_field }} names used by the 18 .docx
   templates. Values are real JS types (string / number / boolean / list) so the
   docxtpl-style conditionals resolve correctly:
     {%p if apply_501c3 == true %}      → boolean
     {%p if has_voting_members == false %} → boolean
     {%p if state == "CA" %}            → 2-letter code (see NOTE below)
     {%p if quorum_type == "majority" %} → string
     {%p for director in directors %}   → array of { name, address }

   NOTE (template QA): the bylaws template compares `state == "CA"` AND also
   prints `{{ state }}` in prose ("State of {{ state }}"). One variable can't be
   both a code (for the conditional) and a full name (for prose). We pass the
   2-letter CODE so the conditional works; prose will read "State of CA". Flag
   this for the attorney template pass (add a separate {{ state_name }} field, or
   change the conditional to compare the full name).
   ──────────────────────────────────────────────────────────────── */

import {
  IRS_PURPOSES,
  getDocManifest,
  getNpStateRules,
  routePurpose,
} from "@/data/nonprofitRulesEngine";
import type { IrsPurpose } from "@/data/nonprofitRulesEngine";
import type {
  Address,
  BoardMeetingFrequency,
  Director,
  NonprofitFormationData,
  QuorumRequirement,
} from "@/types/nonprofitFormation";

export type MergeValue =
  | string
  | number
  | boolean
  | Array<{ name: string; address: string }>;
export type MergeData = Record<string, MergeValue>;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
// Fiscal-year-end day per month (Feb → 28 by convention; attorney pass may adjust).
const MONTH_LAST_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const FREQUENCY_WORD: Record<BoardMeetingFrequency, string> = {
  Monthly: "monthly",
  Quarterly: "quarterly",
  "Semi-annual": "semi-annual",
  Annual: "annual",
};

const QUORUM_TYPE: Record<QuorumRequirement, string> = {
  Majority: "majority",
  "Two-thirds": "two_thirds",
  All: "all",
};

function fmtAddress(a: Address): string {
  const line2 = [a.city, a.state].filter(Boolean).join(", ");
  return [a.street, [line2, a.zip].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

function orgName(data: NonprofitFormationData): string {
  return [data.nameFirstChoice.trim(), data.designator].filter(Boolean).join(" ");
}

function directorById(directors: Director[], id: string): Director | undefined {
  return directors.find((d) => d.id === id);
}

function purposesLabel(purposes: IrsPurpose[]): string {
  return purposes
    .map((p) => IRS_PURPOSES.find((x) => x.value === p)?.label ?? p)
    .join(", ");
}

/**
 * Build the single merge object for all templates.
 * @param data          normalized Phase 0–5 answers
 * @param opts.generatedAt  SERVER clock at doc-generation time (current_year).
 *                          Pass the server timestamp from the webhook handler —
 *                          never ask the customer, never trust a client clock.
 */
export function buildMergeData(
  data: NonprofitFormationData,
  opts: { generatedAt: Date },
): MergeData {
  const rules = getNpStateRules(data.state);
  const org = orgName(data);

  // ── GAP 1: single named incorporator = first of the Phase-3 array. ──
  const firstIncorporator = data.incorporators[0] ?? { name: "", address: "" };

  // ── Officers: resolve director IDs → names (President/Secretary etc.). ──
  const president = directorById(data.directors, data.officers.presidentId);
  const vicePresident = directorById(data.directors, data.officers.vicePresidentId);
  const secretary = directorById(data.directors, data.officers.secretaryId);
  const treasurer = directorById(data.directors, data.officers.treasurerId);

  // ── Fiscal year (Phase 5). ──
  const fyMonthIdx = data.fiscalYearKind === "calendar" ? 11 : data.fiscalYearEndMonth - 1;
  const fiscalYearEnd = `${MONTHS[fyMonthIdx]} ${MONTH_LAST_DAY[fyMonthIdx]}`;
  const fiscalYearEndMonth = MONTHS[fyMonthIdx];

  // ── GAP 3: NY service-of-process address defaults to principal office. ──
  const mailing = data.mailingSameAsPrincipal ? data.principalOffice : data.mailingAddress;
  const nyMailing = mailing;

  // ── GAP 5: execution-date year from the SERVER clock. ──
  const currentYear = String(opts.generatedAt.getUTCFullYear());

  const merge: MergeData = {
    // Entity
    org_name: org,
    state: rules.code, // code, for conditionals (see NOTE)
    mission_statement: data.missionStatement,

    // Phase 2 — registered agent
    registered_agent_name: data.registeredAgentName,
    registered_agent_address: data.registeredAgentAddress.street,
    registered_agent_city: data.registeredAgentAddress.city,
    registered_agent_zip: data.registeredAgentAddress.zip,

    // Principal office
    principal_office_street: data.principalOffice.street,
    principal_office_city: data.principalOffice.city,
    principal_office_state: data.principalOffice.state,
    principal_office_zip: data.principalOffice.zip,

    // Phase 3 — board
    director_count: data.directors.length,
    directors: data.directors.map((d) => ({ name: d.name, address: d.address })),
    director_term_years: data.directorTermYears,

    // Phase 3 — incorporator (GAP 1: first only)
    incorporator_name: firstIncorporator.name,
    incorporator_address: firstIncorporator.address,

    // Officers
    president_name: president?.name ?? "",
    vice_president_name: vicePresident?.name ?? "",
    secretary_name: secretary?.name ?? "",
    treasurer_name: treasurer?.name ?? "",

    // Phase 4 — purpose / 501(c)(3) (booleans for the conditionals)
    apply_501c3: data.apply501c3,
    has_voting_members: data.hasVotingMembers,

    // Phase 5 — governance
    board_meeting_frequency: FREQUENCY_WORD[data.boardMeetingFrequency],
    quorum_type: QUORUM_TYPE[data.quorum],
    fiscal_year_end: fiscalYearEnd,
    fiscal_year_end_month: fiscalYearEndMonth,

    // GAP 5 — execution year
    current_year: currentYear,

    // ── GAP 6: meeting-related fields left BLANK (fillable placeholders). The
    // customer has not held the initial board meeting at checkout. ──
    bylaws_adoption_date: "",
    coi_adoption_date: "",
    meeting_date: "",
    meeting_time: "",
    meeting_location: "",
    articles_filing_date: "",

    // ── EIN worksheet ──
    dba_name: data.einWorksheet.dbaName,
    mailing_address_street: mailing.street,
    mailing_address_city: mailing.city,
    mailing_address_state: mailing.state,
    mailing_address_zip: mailing.zip,
    principal_office_county: "", // not collected in Phase 1 → customer fills on worksheet
    primary_charitable_purpose: purposesLabel(data.purposes),
    mission_statement_short:
      data.missionStatement.length > 80
        ? `${data.missionStatement.slice(0, 77).trimEnd()}…`
        : data.missionStatement,
    expected_employees: data.einWorksheet.expectedEmployees, // default 0
    low_employment_tax_yn: data.einWorksheet.lowEmploymentTax ? "Yes" : "No",
    first_wages_date: data.einWorksheet.firstWagesDate, // default blank
  };

  // ── State-conditional merge fields ──
  if (rules.requiresRegisteredAgentCounty) {
    // GAP 4: DE Article II — explicit answer, else fillable blank.
    merge.registered_agent_county = data.registeredAgentCounty || "";
  }
  if (rules.requiresOfficeCounty) {
    // GAP 2: NY Article FIFTH — office county (NY-only Phase-1 field).
    merge.ny_office_county = data.nyOfficeCounty || "";
  }
  if (rules.requiresMailingAddress) {
    // GAP 3: NY Article NINTH — service-of-process forwarding address.
    merge.ny_mailing_address_street = nyMailing.street;
    merge.ny_mailing_address_city = nyMailing.city;
    merge.ny_mailing_address_state = nyMailing.state;
    merge.ny_mailing_address_zip = nyMailing.zip;
  }

  return merge;
}

/**
 * Assemble the per-customer package: normalized merge data + the ordered list of
 * the 6 template keys (4 common + Articles + Filing Checklist) + the purpose
 * routing verdict. Rendering itself lives in the doc-generation engine (which
 * consumes this merge object) and is gated on ATTORNEY_SIGNOFF.
 */
export function assembleNonprofitPackage(
  data: NonprofitFormationData,
  opts: { generatedAt: Date },
): { mergeData: MergeData; templateKeys: string[]; purposeOk: boolean } {
  const routing = routePurpose(data.state, data.purposes);
  return {
    mergeData: buildMergeData(data, opts),
    templateKeys: getDocManifest(data.state),
    purposeOk: routing.ok,
  };
}
