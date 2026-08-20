import JSZip from "jszip";
import type jsPDF from "jspdf";
import { DocBuilder } from "./llcPdf";
import { LLC_STATES, type StateRules } from "@/data/llcRulesEngine";
import type { LlcFormationData, Address } from "@/types/llcFormation";

/* Helpers ─────────────────────────────────────────────── */
const fullName = (d: LlcFormationData) => `${d.llcName} ${d.designator}`.trim();
const fmtAddr = (a: Address) => [a.street, a.city, a.state, a.zip].filter(Boolean).join(", ") || "____________________";
const effDate = (d: LlcFormationData) =>
  d.effectiveDateType === "delayed" && d.formationDate ? d.formationDate : "the date of filing";
const people = (d: LlcFormationData) =>
  d.managementStructure === "manager_managed" ? d.managers.filter((m) => m.name) : d.members.filter((m) => m.name);

/* ── State Articles / Certificate of Formation ─────────── */
export function buildArticles(d: LlcFormationData, r: StateRules): jsPDF {
  const b = new DocBuilder(`${r.code} ${r.articlesLabel}`);
  b.titleBlock(`State of ${r.name}`, r.articlesLabel.replace(/\s*\(.*\)/, ""), "of a Limited Liability Company");
  const name = fullName(d);

  switch (r.code) {
    case "DE":
      b.para(`This Certificate of Formation of ${name} (the "Company") is filed pursuant to Section 18-201 of the Delaware Limited Liability Company Act, 6 Del. C. §§ 18-101 et seq.:`, { gapAfter: 4 });
      b.heading("First.", "Name");
      b.para(`The name of the limited liability company is ${name}.`);
      b.heading("Second.", "Registered Office");
      b.para(`The address of the Company's registered office in the State of Delaware is ${fmtAddr(d.raAddress)}.`);
      b.heading("Third.", "Registered Agent");
      b.para(`The name of the Company's registered agent at such address is ${d.raName || "____________________"}.`);
      b.heading("Fourth.", "Effective Date");
      b.para(d.effectiveDateType === "delayed"
        ? `This Certificate of Formation shall be effective as of ${effDate(d)}. Under 6 Del. C. § 18-201(d), a delayed effective date may not be more than 180 days after filing.`
        : `This Certificate of Formation shall be effective upon filing with the Delaware Secretary of State.`);
      b.gap(4);
      b.para(`IN WITNESS WHEREOF, the undersigned authorized person has executed this Certificate of Formation as of the date set forth below.`);
      b.signature("Signature of Authorized Person", "Date");
      b.labeled("Printed Name:", d.organizerName);
      b.labeled("Title:", "Authorized Person");
      break;

    case "WY":
      b.para(`Pursuant to Wyoming Statutes § 17-29-201, the undersigned hereby files these Articles of Organization for the purpose of forming a Wyoming Limited Liability Company:`, { gapAfter: 4 });
      b.heading("1.", "Name");
      b.para(`The name of the Limited Liability Company is ${name}.`);
      b.heading("2.", "Registered Agent and Registered Office");
      b.para(`2(a). Registered Agent Name: ${d.raName || "____________________"}.`);
      b.para(`2(b). Registered Office Address in Wyoming (physical street address; no P.O. Box): ${fmtAddr(d.raAddress)}.`);
      b.heading("3.", "Registered Agent Consent");
      b.para(`The undersigned registered agent, by signing below, hereby consents to appointment as the registered agent of this Limited Liability Company.`);
      b.signature("Signature of Registered Agent", "Date");
      b.labeled("Printed Name of Registered Agent:", d.raName);
      b.heading("4.", "Principal Office");
      b.para(`The principal office address of the Limited Liability Company is: ${fmtAddr(d.principalOffice)}.`);
      b.heading("5.", "Mailing Address");
      b.para(`The mailing address of the Limited Liability Company is: ${d.mailingSameAsPrincipal ? fmtAddr(d.principalOffice) : fmtAddr(d.mailingAddress)}.`);
      b.heading("6.", "Organizer");
      b.para(`6(a). Organizer Name: ${d.organizerName || "____________________"}.`);
      b.para(`6(b). Organizer Address: ${d.organizerAddress || "____________________"}.`);
      b.para(`6(c). Organizer Email: ${d.organizerEmail || "____________________"}.`);
      b.heading("7.", "Effective Date");
      b.para(d.effectiveDateType === "delayed"
        ? `These Articles of Organization shall be effective as of ${effDate(d)}. Wyoming permits a delayed effective date up to 90 days after filing.`
        : `These Articles of Organization shall be effective upon filing with the Wyoming Secretary of State.`);
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned organizer has executed these Articles of Organization as of the date set forth below.`);
      b.signature("Signature of Organizer", "Date");
      b.labeled("Printed Name of Organizer:", d.organizerName);
      break;

    case "FL":
      b.para(`These Articles of Organization for ${name} (the "Company") are filed pursuant to Florida Statutes § 605.0201:`, { gapAfter: 4 });
      b.heading("I.", "Name");
      b.para(`The name of the Limited Liability Company is ${name}.`);
      b.heading("II.", "Principal Place of Business and Mailing Address");
      b.para(`(a) Principal place of business address: ${fmtAddr(d.principalOffice)}.`);
      b.para(`(b) Mailing address: ${d.mailingSameAsPrincipal ? "Same as principal place of business." : fmtAddr(d.mailingAddress)}.`);
      b.heading("III.", "Registered Agent, Registered Office, and Acceptance");
      b.para(`(a) Name of registered agent: ${d.raName || "____________________"}.`);
      b.para(`(b) Registered office street address in Florida (no P.O. Box): ${fmtAddr(d.raAddress)}.`);
      b.para(`(c) Registered Agent Acceptance: Having been named as registered agent to accept service of process for the above stated Limited Liability Company, I hereby accept the appointment as registered agent and agree to act in this capacity. I am familiar with and accept the obligations of my position as registered agent.`);
      b.signature("Signature of Registered Agent", "Date");
      b.labeled("Printed Name of Registered Agent:", d.raName);
      b.heading("IV.", "Effective Date");
      b.para(d.effectiveDateType === "delayed"
        ? `These Articles of Organization shall be effective as of ${effDate(d)}. Florida permits a delayed effective date up to 90 days after filing.`
        : `These Articles of Organization shall be effective upon filing with the Florida Division of Corporations.`);
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned member or authorized representative has executed these Articles of Organization as of the date set forth below.`);
      b.signature("Signature of Member or Authorized Representative", "Date");
      b.labeled("Printed Name:", d.organizerName);
      break;

    case "TX":
      b.para(`This Certificate of Formation of ${name} (the "Company") is filed pursuant to the Texas Business Organizations Code:`, { gapAfter: 4 });
      b.heading("1.", "Entity Name and Type");
      b.para(`The filing entity being formed is a limited liability company. The name of the entity is ${name}.`);
      b.heading("2.", "Registered Agent and Registered Office");
      b.para(`2A. The initial registered agent is ${d.raEntityType === "organization" ? "an organization" : "an individual resident of the state"} whose name is: ${d.raName || "____________________"}.`);
      b.para(`2B. The business address of the registered agent and the registered office address is: ${fmtAddr(d.raAddress)}. (Must be a Texas street address; no P.O. Box.)`);
      b.para(`2C. Consent of Registered Agent: Consent is provided on separate Form 401-A filed with this Certificate of Formation.`);
      b.heading("3.", "Governing Authority");
      if (d.managementStructure === "manager_managed") {
        b.para(`The Company will have managers. The names and addresses of the initial managers are:`);
        people(d).forEach((p) => b.para(`${p.name} — ${p.address || "____________________"}`, { indent: 6 }));
      } else {
        b.para(`The Company will not have managers. The Company will be governed by its members. The names and addresses of the initial members are:`);
        d.members.filter((m) => m.name).forEach((m) => b.para(`${m.name} — ${m.address || "____________________"}`, { indent: 6 }));
      }
      b.heading("4.", "Purpose");
      b.para(`The purpose for which the Company is organized is the transaction of any and all lawful business for which limited liability companies may be organized under the Texas Business Organizations Code.`);
      b.heading("5.", "Organizer");
      b.para(`5A. Name of Organizer: ${d.organizerName || "____________________"}.`);
      b.para(`5B. Address of Organizer: ${d.organizerAddress || "____________________"}.`);
      b.heading("6.", "Effectiveness of Filing");
      b.para(d.effectiveDateType === "delayed"
        ? `This document becomes effective at a later date, which is not more than ninety (90) days from the date of signing. The delayed effective date is: ${effDate(d)}.`
        : `This document becomes effective when the document is filed by the Secretary of State.`);
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned organizer has executed this Certificate of Formation as of the date set forth below.`);
      b.signature("Signature of Organizer", "Date");
      b.labeled("Printed Name of Organizer:", d.organizerName);
      break;

    case "NV":
      b.para(`These Articles of Organization for ${name} (the "Company") are filed pursuant to Nevada Revised Statutes Chapter 86:`, { gapAfter: 4 });
      b.heading("1.", "Name");
      b.para(`The name of the Limited-Liability Company is ${name}.`);
      b.heading("2.", "Registered Agent");
      b.para(`2A. Name of Registered Agent: ${d.raName || "____________________"}.`);
      b.para(`2B. Nevada Street Address of Registered Agent (no P.O. Box): ${fmtAddr(d.raAddress)}.`);
      b.para(`2C. Certificate of Acceptance of Appointment by Registered Agent: I hereby accept the appointment as Registered Agent for the above named Limited-Liability Company.`);
      b.signature("Signature of Registered Agent", "Date");
      b.labeled("Printed Name of Registered Agent:", d.raName);
      b.heading("3.", "Dissolution Date");
      b.para(`The latest date, if any, on which the Limited-Liability Company is to dissolve: Perpetual duration.`);
      b.heading("4.", "Management");
      b.para(d.managementStructure === "manager_managed"
        ? `The Company will be managed by manager(s).`
        : `The Company will be managed by the members.`);
      b.heading("5.", "Managers or Managing Members");
      b.para(`The names and addresses of each initial manager or managing member are:`);
      (people(d).length ? people(d) : d.members.filter((m) => m.name)).forEach((p) =>
        b.para(`${p.name} — ${p.address || "____________________"}`, { indent: 6 }));
      b.heading("6.", "Organizer");
      b.para(`6A. Name of Organizer: ${d.organizerName || "____________________"}.`);
      b.para(`6B. Address of Organizer: ${d.organizerAddress || "____________________"}.`);
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned organizer has executed these Articles of Organization as of the date set forth below.`);
      b.signature("Signature of Organizer", "Date");
      b.labeled("Printed Name of Organizer:", d.organizerName);
      break;

    case "CA":
      b.heading("1.", "Limited Liability Company Name");
      b.para(`The name of the Limited Liability Company is ${name}.`);
      b.heading("2.", "Business Addresses");
      b.para(`2(a). Initial Street Address of Principal Office in California: ${fmtAddr(d.principalOffice)}.`);
      b.para(`2(b). Initial Mailing Address: ${d.mailingSameAsPrincipal ? "Same as 2(a)." : fmtAddr(d.mailingAddress)}.`);
      b.heading("3.", "Service of Process");
      b.para(`3(a). Name of Agent for Service of Process: ${d.raName || "____________________"}.`);
      b.para(`3(b). California Street Address of Agent (P.O. Box not acceptable): ${fmtAddr(d.raAddress)}.`);
      b.heading("4.", "Management");
      b.para(`The Limited Liability Company will be managed by: ${d.managementStructure === "manager_managed"
        ? (people(d).length > 1 ? "More than One Manager" : "One Manager") : "All Limited Liability Company Member(s)"}.`);
      b.heading("5.", "Purpose Statement");
      b.para(`The purpose of the Limited Liability Company is to engage in any lawful act or activity for which a Limited Liability Company may be organized under the California Revised Uniform Limited Liability Company Act.`);
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned organizer has executed these Articles of Organization on the date set forth below.`);
      b.signature("Signature of Organizer", "Date");
      b.labeled("Printed Name of Organizer:", d.organizerName);
      break;

    case "NY":
      b.para(`These Articles of Organization for ${name} (the "Company") are filed pursuant to New York Limited Liability Company Law § 203:`, { gapAfter: 4 });
      b.heading("First.", "Name");
      b.para(`The name of the Limited Liability Company is ${name}.`);
      b.heading("Second.", "County");
      b.para(`The county within New York State in which the office of the Limited Liability Company is to be located is: ${d.principalCounty || "____________________"} County.`);
      b.heading("Third.", "Service of Process");
      b.para(`The Secretary of State is designated as agent of the Limited Liability Company upon whom process against it may be served. The post office address to which the Secretary of State shall mail a copy of any process is: ${d.mailingSameAsPrincipal ? (d.raAddress.street ? fmtAddr(d.raAddress) : `${d.principalCounty} County, New York`) : fmtAddr(d.mailingAddress)}.`);
      if (d.raChoice === "third_party" && d.raName) {
        b.heading("Fourth.", "Registered Agent (Optional)");
        b.para(`The Company designates the following as an additional registered agent upon whom process may be served:`);
        b.para(`Name: ${d.raName}.`);
        b.para(`Address: ${fmtAddr(d.raAddress)}.`);
      }
      b.gap(3);
      b.para(`IN WITNESS WHEREOF, the undersigned organizer has executed these Articles of Organization as of the date set forth below.`);
      b.signature("Signature of Organizer", "Date");
      b.labeled("Printed Name of Organizer:", d.organizerName);
      if (r.postFiling) { b.gap(4); b.noteBox(r.postFiling.title, r.postFiling.body, "orange"); }
      break;
  }
  return b.finish();
}

/* ── Operating Agreement (state-agnostic, customized) ──── */
export function buildOperatingAgreement(d: LlcFormationData, r: StateRules): jsPDF {
  const b = new DocBuilder("Operating Agreement");
  const name = fullName(d);
  b.titleBlock("Operating Agreement of", name, `a ${r.name} Limited Liability Company`);
  b.noteBox("About This Document", "This Operating Agreement governs the internal operation of the LLC. It is not filed with the state. It is a private contract among the members. Keep the signed original with your business records.");
  b.gap(2);

  b.centerHeading("Article I — Formation");
  b.para(`This Operating Agreement (this "Agreement") of ${name} (the "Company") is entered into and effective as of ${effDate(d)} (the "Effective Date"), by and among the persons executing this Agreement as members (each a "Member"). The Company was formed as a limited liability company under the laws of the State of ${r.name}.`);
  b.para(`1.2 Name. The name of the Company is ${name}.`);
  b.para(`1.3 Principal Office. The principal office of the Company is located at ${fmtAddr(d.principalOffice)}, or at such other location as the Members may designate.`);
  b.para(`1.4 Registered Agent. The Company's registered agent for service of process in ${r.name} is ${d.raChoice === "sos_default" ? `the ${r.name} Secretary of State` : (d.raName || "____________________")}${d.raAddress.street ? `, with a registered office at ${fmtAddr(d.raAddress)}` : ""}.`);
  b.para(`1.5 Purpose. The Company is formed for the following purpose(s): ${(d.businessPurpose || "any lawful business").replace(/\.\s*$/, "")}. The Company may also engage in any lawful business permitted by the laws of ${r.name}.`);
  b.para(`1.6 Term. The Company shall continue perpetually unless dissolved earlier in accordance with this Agreement or applicable law.`);

  b.centerHeading("Article II — Members and Membership Interests");
  b.para(`2.1 Initial Members. The initial Members, their addresses, capital contributions, and percentage interests are set forth in Schedule A, which is incorporated by reference.`);
  b.para(`2.2 Membership Interests. Each Member's interest consists of the Member's share of the Company's profits, losses, and distributions, and the right to participate in management as provided in this Agreement.`);

  b.centerHeading("Article III — Capital Contributions");
  b.para(`3.1 Initial Contributions. Each Member has made or shall make the initial capital contribution set forth opposite the Member's name on Schedule A.`);
  b.para(`3.2 Additional Contributions. No Member shall be required to make any additional capital contribution.`);
  b.para(`3.3 Capital Accounts. A separate capital account shall be maintained for each Member in accordance with Treasury Regulation Section 1.704-1(b)(2)(iv).`);

  b.centerHeading("Article IV — Allocations and Distributions");
  b.para(d.profitLossMethod === "custom"
    ? `4.1 Allocation. Profits and losses shall be allocated in accordance with a custom allocation agreed by the Members, who acknowledge they have reviewed the tax consequences with their own advisors.`
    : `4.1 Allocation. Profits and losses shall be allocated to the Members in proportion to their respective Percentage Interests as set forth on Schedule A.`);
  b.para(`4.2 Distributions. The Company shall make distributions at such times and amounts as the ${d.managementStructure === "manager_managed" ? "Managers" : "Members"} determine, pro rata in accordance with Percentage Interests, provided no distribution renders the Company insolvent.`);
  b.para(`4.4 Tax Classification. The Company shall be treated as a partnership for U.S. federal income tax purposes if it has two or more Members, or as a disregarded entity if it has a single Member, unless the Members elect otherwise.`);

  b.centerHeading("Article V — Management");
  b.para(d.managementStructure === "manager_managed"
    ? `5.1 Management Structure. The Company shall be managed by one or more Managers. The initial Manager(s) shall be ${d.managers.filter((m) => m.name).map((m) => m.name).join(", ") || "____________________"}. A Manager need not be a Member.`
    : `5.1 Management Structure. The Company shall be managed by its Members. Each Member shall have authority to bind the Company in the ordinary course of its business, subject to the voting requirements below for Major Decisions.`);
  b.para(d.votingThreshold === "unanimous"
    ? `5.2 Voting. Major Decisions require the affirmative vote of all Members (unanimous consent).`
    : d.votingThreshold === "custom"
      ? `5.2 Voting. Major Decisions require the affirmative vote of Members holding a specified percentage of the Percentage Interests as agreed by the Members.`
      : `5.2 Voting. Major Decisions require the affirmative vote of Members holding a majority of the Percentage Interests.`);
  b.para(`Major Decisions include amending this Agreement or the Articles, admitting a new Member, approving a transfer of a Membership Interest, merging or converting the Company, selling substantially all assets, dissolving the Company, and changing the Company's tax classification.`);
  b.para(`5.5 Indemnification. The Company shall indemnify each Member and Manager against liabilities incurred in connection with their service to the Company, except for gross negligence, willful misconduct, or knowing violation of law.`);

  b.centerHeading("Article VI — Transfer of Membership Interests");
  b.para(d.transferRestrictions === "free_transfer"
    ? `A Member may transfer economic rights freely. A transfer of full Membership Interests, including voting and management rights, requires the written consent of a majority of the non-transferring Members.`
    : d.transferRestrictions === "unanimous_consent"
      ? `A Member may not transfer any Membership Interest without the prior written consent of all other Members. This restriction is a material term of this Agreement.`
      : `A Member may not transfer any Membership Interest except in accordance with a right of first refusal: the Selling Member shall first offer the interest to the Company and then to the other Members pro rata, on the same terms as any bona fide third-party offer.`);

  b.centerHeading("Article VII — Withdrawal, Death, and Buyout");
  b.para(`7.1 A Member may withdraw on 90 days' written notice. Upon withdrawal, death, incapacity, or expulsion for cause, the Member (or successor) shall be entitled to the Buyout Price.`);
  b.para(d.buyoutMethod === "book_value"
    ? `7.4 Buyout Price. The Buyout Price shall equal the Member's capital account balance as of the effective date, per the Company's books.`
    : d.buyoutMethod === "custom"
      ? `7.4 Buyout Price. The Buyout Price shall be determined by a custom formula agreed by the Members.`
      : `7.4 Buyout Price. The Buyout Price shall equal the fair market value of the Member's Interest, determined by an independent appraiser jointly selected by the parties.`);
  b.para(`7.5 Payment Terms. The Buyout Price shall be paid in equal monthly installments over 36 months, with interest at the applicable federal rate. The Company may prepay without penalty.`);

  b.centerHeading("Article VIII — Books, Records, and Reporting");
  b.para(`The Company shall maintain complete books and records at its principal office, including the Articles, this Agreement, a current list of Members, and tax returns. Each Member has inspection rights. The fiscal year is the calendar year unless the Members elect otherwise.`);

  b.centerHeading("Article IX — Dissolution and Winding Up");
  b.para(`The Company shall dissolve upon the written consent of the Members required for Major Decisions, a judicial decree, an event making the business unlawful, or the sale of substantially all assets. On dissolution, assets are applied first to creditors, then to reserves, then to Members per their capital accounts and Percentage Interests. A Certificate of Cancellation shall be filed with the ${r.name} Secretary of State.`);

  b.centerHeading("Article X — General Provisions");
  b.para(`10.2 Governing Law. This Agreement shall be governed by the laws of the State of ${r.name}.`);
  b.para(`10.3 Dispute Resolution. Disputes shall first be submitted to good-faith negotiation, and if unresolved within 30 days, to binding arbitration seated in ${r.name}.`);
  b.para(`10.6 Counterparts and Electronic Signatures. This Agreement may be executed in counterparts and by electronic signature, each with the same force as an original.`);

  b.centerHeading("Schedule A — Members, Contributions, and Percentage Interests");
  d.members.filter((m) => m.name).forEach((m) => {
    b.para(`${m.name} — ${m.address || "____________________"} — Contribution: ${m.contribution || "____"} — Percentage Interest: ${m.ownershipPct || (d.memberCount === "single" ? "100" : "____")}%`);
  });
  b.para(`TOTAL: 100%`, { bold: true });

  b.centerHeading("Signatures");
  b.para(`IN WITNESS WHEREOF, the undersigned Members have executed this Operating Agreement as of the Effective Date.`);
  d.members.filter((m) => m.name).forEach((m) => {
    b.signature("Signature", "Date");
    b.labeled("Printed Name:", m.name);
    b.labeled("Percentage Interest:", `${m.ownershipPct || (d.memberCount === "single" ? "100" : "____")}%`);
    b.gap(2);
  });
  return b.finish();
}

/* ── Filing Instructions ───────────────────────────────── */
export function buildFilingInstructions(d: LlcFormationData, r: StateRules): jsPDF {
  const b = new DocBuilder("Filing Instructions");
  b.titleBlock(`${r.name}`, "Filing Instructions", "Step-by-step guide to complete your LLC formation");
  b.noteBox("Before You Start", `Legalgram has prepared your ${r.articlesLabel} based on your answers. Formation is not complete until you file with your state's Secretary of State. Your Legalgram fee covers document preparation only; any state filing fees are paid directly to the state.`, "orange");

  b.heading("", "Your Filing Summary");
  b.labeled("LLC Name:", fullName(d));
  b.labeled("State of Formation:", r.name);
  b.labeled("State Filing Form:", r.formNumber);
  b.labeled("State Filing Portal:", r.sosUrl);
  b.gap(2);
  b.noteBox("Where to Find Current Fees and Processing Times", "Filing fees, accepted payment methods, and processing times are set by the state and change from time to time. Go to the state filing portal above for the current LLC filing information — the state's website is always the most current source.");

  if (r.additionalForms.length) {
    b.heading("", "Additional Requirements for Your State");
    b.para(`In addition to the ${r.articlesLabel}, ${r.name} requires the following at initial formation. All required forms must be filed together — filing only the Articles may result in rejection.`);
    r.additionalForms.forEach((f) => { b.para(f.name, { bold: true }); b.para(f.purpose, { indent: 4 }); });
  } else {
    b.noteBox("Good News", `Your state requires only the ${r.articlesLabel} included in this package. No additional state forms are required.`);
  }

  b.heading("Step 1 —", "Review Your Documents");
  b.para(`Open your ${r.articlesLabel} and confirm the LLC name, addresses, registered agent, and member/manager names are spelled exactly as you want them on the public record. If anything is wrong, regenerate before filing — corrections after filing require an amendment with an additional state fee.`);
  b.heading("Step 2 —", "File with the Secretary of State");
  b.para(`Go to your state's official filing portal: ${r.sosUrl}`);
  b.para(`Look for the current filing fee for LLC ${r.articlesLabel}. Select the correct filing type, enter the information exactly as shown on your Legalgram documents, upload or submit any additional forms, pay the state fees, and save your confirmation number.`);
  if (r.postFiling) { b.heading("Step 3 —", "Post-Filing Requirements"); b.noteBox(r.postFiling.title, r.postFiling.body, "orange"); }
  b.heading("", "What to Do Next");
  b.para(`Obtain your EIN from the IRS (see the EIN Application Worksheet in your package), open a business bank account, register for state tax accounts, obtain any required licenses, and complete your Beneficial Ownership Information (BOI) filing with FinCEN.`);
  b.heading("", "Ongoing Compliance");
  b.para(r.ongoingCompliance);
  return b.finish();
}

/* ── EIN Application Worksheet ─────────────────────────── */
export function buildEinWorksheet(d: LlcFormationData, r: StateRules): jsPDF {
  const b = new DocBuilder("EIN Worksheet");
  b.titleBlock("EIN Application Worksheet", "Employer Identification Number", "Everything you need to obtain your EIN from the IRS");
  b.noteBox("What This Is", "This worksheet contains the information you need to obtain an Employer Identification Number (EIN) from the IRS, pre-filled from your formation answers. EINs are free from the IRS.");
  const mail = d.mailingSameAsPrincipal ? d.principalOffice : d.mailingAddress;

  b.heading("", "How to Apply");
  b.para(`Fastest (US applicants with SSN or ITIN): apply online at irs.gov via the "EIN Assistant" and receive your EIN immediately. Save the CP 575 confirmation letter.`);
  b.para(`Non-US applicants without SSN/ITIN: complete Form SS-4, write "Foreign" on Line 7b, and fax it to the IRS.`);

  b.heading("", "Your Pre-Filled Answers");
  b.labeled("Line 1 — Legal name of entity:", fullName(d));
  b.labeled("Line 4a/4b — Mailing address:", fmtAddr(mail));
  b.labeled("Line 5a/5b — Street address:", fmtAddr(d.principalOffice));
  b.labeled("Line 7a — Responsible party:", d.members[0]?.name || d.organizerName);
  b.labeled("Line 8a — Is this an LLC?", "Yes");
  b.labeled("Line 8b — Number of LLC members:", d.memberCount === "single" ? "1" : String(d.members.filter((m) => m.name).length));
  b.labeled("Line 8c — Organized in the US?", "Yes");
  b.para(`Line 9a — Type of entity: Check "Other" and write "Limited Liability Company."`);
  b.labeled("Line 10 — Reason for applying:", "Started new business");
  b.labeled("Line 11 — Date business started:", d.effectiveDateType === "delayed" && d.formationDate ? d.formationDate : "On formation");
  b.labeled("Line 16 — Principal activity:", d.businessActivityCategory || "____________________");
  b.labeled("Line 17 — Principal line of business:", d.businessActivity || "____________________");
  b.labeled("Line 18 — Previously applied for an EIN?", "No");

  b.gap(2);
  b.noteBox("Security Reminder", "Treat your EIN as sensitive. Share it only with banks, tax authorities, and vetted partners. The IRS will never call, email, or text you to demand payment or verify your EIN — those are scams.", "orange");
  return b.finish();
}

/* ── Package all four as a ZIP ─────────────────────────── */
export async function generateLlcZip(d: LlcFormationData): Promise<Blob> {
  const r = LLC_STATES[d.state as keyof typeof LLC_STATES];
  const zip = new JSZip();
  const safe = (fullName(d) || "LLC").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
  zip.file(`01_${safe}_${r.articlesLabel.replace(/[^\w]/g, "_")}.pdf`, buildArticles(d, r).output("blob"));
  zip.file(`02_${safe}_Operating_Agreement.pdf`, buildOperatingAgreement(d, r).output("blob"));
  zip.file(`03_${safe}_Filing_Instructions.pdf`, buildFilingInstructions(d, r).output("blob"));
  zip.file(`04_${safe}_EIN_Worksheet.pdf`, buildEinWorksheet(d, r).output("blob"));
  return zip.generateAsync({ type: "blob" });
}
