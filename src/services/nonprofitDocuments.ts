import JSZip from "jszip";
import type jsPDF from "jspdf";
import { DocBuilder } from "./llcPdf";
import { getNpStateRules, type NpStateCode } from "@/data/nonprofitRulesEngine";
import type { MergeData } from "./nonprofitMerge";

/* ────────────────────────────────────────────────────────────────
   Nonprofit Formation — branded PDF documents.
   Renders the 6-document package from the single normalized merge object
   (nonprofitMerge.buildMergeData). Reuses the LLC DocBuilder engine so the
   look matches the rest of Legalgram. IRS-required 501(c)(3) clauses are kept
   verbatim (examiners recognize them on sight).

   These mirror the attorney-reviewed .docx templates. TEMPLATE NOTE banners are
   intentionally NOT rendered — they are internal guidance, not customer content.
   ──────────────────────────────────────────────────────────────── */

type Dir = { name: string; address: string };

const s = (m: MergeData, k: string): string => String(m[k] ?? "");
const b = (m: MergeData, k: string): boolean => m[k] === true;
const dirs = (m: MergeData): Dir[] => (Array.isArray(m.directors) ? (m.directors as Dir[]) : []);
const blank = (v: string, n = 28): string => v || "_".repeat(n);
const stateName = (code: string): string => getNpStateRules(code as NpStateCode)?.name ?? code;

/* IRS-required 501(c)(3) provisions — shared verbatim block. */
function irsClauses(bld: DocBuilder) {
  bld.para(
    "The following provisions are required by the Internal Revenue Service for the Corporation to qualify for exemption from federal income tax under Section 501(c)(3) of the Internal Revenue Code.",
    { gapAfter: 3 },
  );
  bld.clause(
    "Purpose Limitation",
    "Notwithstanding any other provision of these Articles, the Corporation is organized and shall be operated exclusively for charitable, religious, educational, and scientific purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code of 1986, as amended, or the corresponding section of any future federal tax code.",
  );
  bld.clause(
    "Distribution of Earnings",
    "No part of the net earnings of the Corporation shall inure to the benefit of, or be distributable to, its directors, officers, or other private persons, except that the Corporation shall be authorized and empowered to pay reasonable compensation for services rendered and to make payments and distributions in furtherance of the purposes set forth herein.",
  );
  bld.clause(
    "Political Activity Prohibition",
    "The Corporation shall not participate in, or intervene in (including the publishing or distribution of statements), any political campaign on behalf of or in opposition to any candidate for public office.",
  );
  bld.clause(
    "Lobbying Limitation",
    "No substantial part of the activities of the Corporation shall be the carrying on of propaganda, or otherwise attempting to influence legislation.",
  );
  bld.clause(
    "Dissolution",
    "Upon the dissolution of the Corporation, assets shall be distributed for one or more exempt purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code, or the corresponding section of any future federal tax code, or shall be distributed to the federal government, or to a state or local government, for a public purpose.",
  );
  bld.clause(
    "Prohibited Activities",
    "Notwithstanding any other provision of these Articles, the Corporation shall not carry on any other activities not permitted to be carried on (a) by a corporation exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code, or (b) by a corporation, contributions to which are deductible under Section 170(c)(2) of the Internal Revenue Code.",
  );
}

/* ════════════════ COMMON DOC 1 — BYLAWS ════════════════ */
export function buildBylaws(m: MergeData): jsPDF {
  const bld = new DocBuilder("Bylaws");
  const org = s(m, "org_name");
  const st = s(m, "state");
  bld.titleBlock(`Bylaws of`, org || "the Corporation", `A ${st} Nonprofit Corporation`);

  bld.articleHeading("Article I", "Name and Offices");
  bld.clause("Section 1.1. Name", `The name of this Corporation is ${org} (the "Corporation").`);
  bld.clause(
    "Section 1.2. Principal Office",
    `The principal office of the Corporation shall be located at ${s(m, "principal_office_street")}, ${s(m, "principal_office_city")}, ${s(m, "principal_office_state")} ${s(m, "principal_office_zip")}, or at such other place as the Board of Directors may from time to time designate.`,
  );
  bld.clause(
    "Section 1.3. Registered Office and Registered Agent",
    `The Corporation shall continuously maintain in the State of ${st} a registered office and a registered agent. The registered agent of the Corporation is ${s(m, "registered_agent_name")}, located at ${s(m, "registered_agent_address")}.`,
  );

  bld.articleHeading("Article II", "Purposes");
  bld.clause(
    "Section 2.1. General Purpose",
    'The Corporation is organized exclusively for charitable, religious, educational, and scientific purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code of 1986, as amended (the "Code"), or the corresponding section of any future federal tax code.',
  );
  bld.clause("Section 2.2. Specific Purpose", `The specific purpose of the Corporation is: ${s(m, "mission_statement")}`);
  bld.clause(
    "Section 2.3. Prohibited Activities",
    "No part of the net earnings of the Corporation shall inure to the benefit of, or be distributable to, its directors, officers, or other private persons. No substantial part of the activities of the Corporation shall be the carrying on of propaganda, or otherwise attempting to influence legislation, and the Corporation shall not participate in any political campaign on behalf of or in opposition to any candidate for public office.",
  );

  bld.articleHeading("Article III", "Board of Directors");
  bld.clause("Section 3.1. General Powers", "The affairs of the Corporation shall be managed by its Board of Directors.");
  if (st === "CA") {
    bld.clause(
      "Section 3.2. Number of Directors",
      `The Corporation shall maintain a Board of at least three (3) directors at all times when the Corporation is applying for or maintaining recognition of exemption under Section 501(c)(3) of the Code. The initial number of directors of the Corporation shall be ${s(m, "director_count")}.`,
    );
  } else {
    bld.clause(
      "Section 3.2. Number of Directors",
      `The Board of Directors shall consist of not fewer than three (3) directors. The initial number of directors of the Corporation shall be ${s(m, "director_count")}. The number of directors shall not be reduced below three (3).`,
    );
  }
  bld.para("Section 3.3. Initial Directors. The initial directors of the Corporation are:", { bold: true, gapAfter: 1 });
  dirs(m).forEach((d) => bld.bullet(`${d.name} — ${d.address}`));
  bld.clause(
    "Section 3.4. Term of Office",
    `Each director shall serve a term of ${s(m, "director_term_years")} year(s), or until his or her successor is elected and qualified. To the extent practicable, the terms of directors should be staggered.`,
  );
  bld.clause(
    "Section 3.5. Regular Meetings",
    `The Board of Directors shall hold regular meetings on a ${s(m, "board_meeting_frequency")} basis, at such times and places as the Board may determine.`,
  );
  bld.clause(
    "Section 3.6. Special Meetings",
    "Special meetings of the Board of Directors may be called by the President, or by any two directors, upon not less than three (3) days' notice.",
  );
  const q = s(m, "quorum_type");
  const quorumBody =
    q === "two_thirds"
      ? "Two-thirds (2/3) of the directors then in office shall constitute a quorum for the transaction of business. The act of a majority of the directors present at a meeting at which a quorum is present shall be the act of the Board of Directors."
      : q === "all"
        ? "All of the directors then in office shall constitute a quorum. The unanimous act of the directors present at a meeting at which a quorum is present shall be the act of the Board of Directors."
        : "A majority of the directors then in office shall constitute a quorum for the transaction of business. The act of a majority of the directors present at a meeting at which a quorum is present shall be the act of the Board of Directors.";
  bld.clause("Section 3.7. Quorum and Manner of Acting", quorumBody);
  bld.clause("Section 3.8. Action Without a Meeting", "Any action required or permitted to be taken by the Board of Directors may be taken without a meeting if all directors consent to the action in writing.");
  bld.clause("Section 3.9. Vacancies", "Any vacancy on the Board of Directors may be filled by the affirmative vote of a majority of the remaining directors, though less than a quorum.");
  bld.clause("Section 3.10. Removal", "Any director may be removed, with or without cause, by the affirmative vote of two-thirds (2/3) of the directors then in office at a meeting called for that purpose.");
  bld.clause("Section 3.11. Compensation", "Directors shall not receive compensation for their services as directors, but may be reimbursed for reasonable expenses actually incurred.");

  bld.articleHeading("Article IV", "Officers");
  bld.clause("Section 4.1. Officers", "The officers of the Corporation shall be a President, a Vice President, a Secretary, and a Treasurer. The offices of President and Secretary shall not be held by the same person.");
  bld.para("Section 4.2. Initial Officers. The initial officers of the Corporation are:", { bold: true, gapAfter: 1 });
  bld.bullet(`President: ${s(m, "president_name")}`);
  bld.bullet(`Vice President: ${blank(s(m, "vice_president_name"))}`);
  bld.bullet(`Secretary: ${s(m, "secretary_name")}`);
  bld.bullet(`Treasurer: ${s(m, "treasurer_name")}`);
  bld.clause("Section 4.3. Election and Term", "Officers shall be elected annually by the Board of Directors and shall hold office for a term of one (1) year and until their successors are elected and qualified.");
  bld.clause("Section 4.4. Duties", "The President shall be the chief executive officer and preside at all meetings of the Board. The Vice President shall act in the President's absence. The Secretary shall keep the minutes and corporate records. The Treasurer shall have custody of the funds and keep accurate financial records.");

  bld.articleHeading("Article V", "Members");
  if (b(m, "has_voting_members")) {
    bld.clause("Section 5.1. Members", "The Corporation shall have one class of members. Members shall have the rights, privileges, and obligations set forth in these Bylaws, including the right to notice of, and to vote at, annual and special meetings of members, with a quorum of one-tenth (1/10) of the members entitled to vote.");
  } else {
    bld.clause("Section 5.1. No Members", `The Corporation shall have no members within the meaning of the nonprofit corporation law of the State of ${st}. All corporate powers shall be exercised by or under the authority of the Board of Directors.`);
  }

  bld.articleHeading("Article VI", "Committees");
  bld.para("The Board of Directors may establish one or more committees, each consisting of two or more directors, to exercise such authority of the Board as the Board may lawfully delegate. No committee shall have the authority of the Board to fill vacancies, amend the Bylaws or Articles, or adopt a plan of merger or dissolution.");

  bld.articleHeading("Article VII", "Contracts, Loans, Checks and Deposits");
  bld.para("The Board of Directors may authorize any officer or agent to enter into contracts on behalf of the Corporation. No loans shall be contracted on behalf of the Corporation unless authorized by a resolution of the Board, and no loans shall be made by the Corporation to its directors or officers. All funds shall be deposited to the credit of the Corporation in such depositories as the Board may select.");

  bld.articleHeading("Article VIII", "Fiscal Year and Records");
  bld.clause("Section 8.1. Fiscal Year", `The fiscal year of the Corporation shall end on ${s(m, "fiscal_year_end")} of each year.`);
  bld.clause("Section 8.2. Books and Records", "The Corporation shall keep correct and complete books and records of account and minutes of the proceedings of its Board of Directors and committees. The Corporation shall file all required filings, including IRS Form 990 (or 990-EZ or 990-N as applicable).");

  bld.articleHeading("Article IX", "Conflict of Interest");
  bld.para("The Corporation shall adopt and maintain a Conflict of Interest Policy substantially in the form of the Sample Conflict of Interest Policy set forth in Appendix A to IRS Form 1023. Each director, officer, and member of any committee with board-delegated powers shall annually sign a statement affirming compliance with the policy.");

  bld.articleHeading("Article X", "Indemnification");
  bld.para(`To the fullest extent permitted by the nonprofit corporation law of the State of ${st}, the Corporation shall indemnify any person made or threatened to be made a party to any action, suit, or proceeding by reason of the fact that such person is or was a director, officer, employee, or agent of the Corporation. The Corporation may purchase and maintain insurance on behalf of such persons.`);

  bld.articleHeading("Article XI", "Amendments");
  bld.para("These Bylaws may be amended or repealed, and new Bylaws adopted, by the affirmative vote of two-thirds (2/3) of the directors then in office at any regular or special meeting, provided that notice of the proposed amendment was given in the notice of the meeting.");

  bld.articleHeading("Article XII", "Dissolution");
  bld.para("Upon the dissolution of the Corporation, assets shall be distributed for one or more exempt purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code, or shall be distributed to the federal government, or to a state or local government, for a public purpose.");

  bld.articleHeading("", "Certification");
  bld.para(`The undersigned, being the Secretary of ${org}, a ${st} nonprofit corporation, hereby certifies that the foregoing Bylaws were duly adopted as the Bylaws of the Corporation by the Board of Directors on ${blank(s(m, "bylaws_adoption_date"))}.`);
  bld.signature("Signature", "Date");
  bld.labeled("Name:", `${s(m, "secretary_name")}, Secretary`);
  return bld.finish();
}

/* ════════════════ COMMON DOC 2 — CONFLICT OF INTEREST POLICY ════════════════ */
export function buildConflictOfInterest(m: MergeData): jsPDF {
  const bld = new DocBuilder("Conflict of Interest Policy");
  const org = s(m, "org_name");
  bld.titleBlock("Conflict of Interest Policy of", org || "the Corporation", "IRS Form 1023 — Appendix A Model Policy");

  bld.articleHeading("Article I", "Purpose");
  bld.para(`The purpose of the conflict of interest policy is to protect this tax-exempt organization's (${org}) interest when it is contemplating entering into a transaction or arrangement that might benefit the private interest of an officer or director of the Organization or might result in a possible excess benefit transaction. This policy is intended to supplement but not replace any applicable state and federal laws governing conflict of interest applicable to nonprofit and charitable organizations.`);

  bld.articleHeading("Article II", "Definitions");
  bld.clause("1. Interested Person", "Any director, principal officer, or member of a committee with governing board delegated powers, who has a direct or indirect financial interest, as defined below, is an interested person.");
  bld.clause("2. Financial Interest", "A person has a financial interest if the person has, directly or indirectly, through business, investment, or family: (a) an ownership or investment interest in any entity with which the Organization has a transaction or arrangement; (b) a compensation arrangement with the Organization or with any entity or individual with which the Organization has a transaction or arrangement; or (c) a potential ownership or investment interest in, or compensation arrangement with, any entity or individual with which the Organization is negotiating a transaction or arrangement. A financial interest is not necessarily a conflict of interest.");

  bld.articleHeading("Article III", "Procedures");
  bld.clause("1. Duty to Disclose", "In connection with any actual or possible conflict of interest, an interested person must disclose the existence of the financial interest and be given the opportunity to disclose all material facts to the directors and members of committees with governing board delegated powers.");
  bld.clause("2. Determining Whether a Conflict Exists", "After disclosure of the financial interest and all material facts, and after any discussion with the interested person, he/she shall leave the meeting while the determination of a conflict of interest is discussed and voted upon. The remaining board or committee members shall decide if a conflict of interest exists.");
  bld.clause("3. Procedures for Addressing the Conflict", "The chairperson shall, if appropriate, appoint a disinterested person or committee to investigate alternatives. After exercising due diligence, the governing board or committee shall determine whether a more advantageous transaction is reasonably attainable that would not give rise to a conflict, and if not, shall determine by a majority vote of the disinterested directors whether the transaction is in the Organization's best interest, for its own benefit, and fair and reasonable.");
  bld.clause("4. Violations of the Policy", "If the governing board or committee has reasonable cause to believe a member has failed to disclose actual or possible conflicts of interest, it shall inform the member and afford an opportunity to explain. If it determines the member has failed to disclose, it shall take appropriate disciplinary and corrective action.");

  bld.articleHeading("Article IV", "Records of Proceedings");
  bld.para("The minutes of the governing board and all committees with board delegated powers shall contain the names of the persons who disclosed or were found to have a financial interest, the nature of the interest, any action taken, the decision as to whether a conflict existed, and the content of discussions and votes.");

  bld.articleHeading("Article V", "Compensation");
  bld.para("A voting member of the governing board or of any committee whose jurisdiction includes compensation matters, who receives compensation from the Organization for services, is precluded from voting on matters pertaining to that member's compensation, but may provide information to any committee regarding compensation.");

  bld.articleHeading("Article VI", "Annual Statements");
  bld.para("Each director, principal officer, and member of a committee with governing board delegated powers shall annually sign a statement which affirms such person has received a copy of the policy, has read and understands it, has agreed to comply with it, and understands the Organization must engage primarily in activities that accomplish one or more of its tax-exempt purposes.");

  bld.articleHeading("Article VII", "Periodic Reviews");
  bld.para("To ensure the Organization operates consistently with charitable purposes and does not engage in activities that could jeopardize its tax-exempt status, periodic reviews shall be conducted, at a minimum covering whether compensation arrangements are reasonable and whether partnerships, joint ventures, and arrangements with management organizations conform to the Organization's written policies and do not result in inurement or impermissible private benefit.");

  bld.articleHeading("Article VIII", "Use of Outside Experts");
  bld.para("When conducting periodic reviews, the Organization may, but need not, use outside advisors. If outside experts are used, their use shall not relieve the governing board of its responsibility for ensuring periodic reviews are conducted.");

  bld.articleHeading("", "Adoption");
  bld.para(`This Conflict of Interest Policy was adopted by the Board of Directors of ${org} on ${blank(s(m, "coi_adoption_date"))}.`);
  bld.signature("Signature", "Date");
  bld.labeled("Name:", `${s(m, "secretary_name")}, Secretary`);

  bld.articleHeading("", "Annual Acknowledgment");
  bld.para("To be signed annually by each director, officer, and committee member. I hereby affirm that: (1) I have received a copy of the Conflict of Interest Policy; (2) I have read and understand the policy; (3) I agree to comply with the policy; and (4) I understand that the Organization is charitable and, to maintain its federal tax exemption, must engage primarily in activities that accomplish one or more of its tax-exempt purposes.");
  bld.gap(2);
  bld.labeled("Printed Name:", "");
  bld.labeled("Position:", "");
  bld.signature("Signature", "Date");
  return bld.finish();
}

/* ════════════════ COMMON DOC 3 — INITIAL BOARD MEETING MINUTES ════════════════ */
export function buildBoardMinutes(m: MergeData): jsPDF {
  const bld = new DocBuilder("Initial Board Meeting Minutes");
  const org = s(m, "org_name");
  const st = s(m, "state");
  bld.titleBlock("Minutes of the Initial Meeting of the Board of Directors of", org || "the Corporation", `A ${st} Nonprofit Corporation`);

  bld.articleHeading("", "Meeting Details");
  bld.labeled("Date of Meeting:", blank(s(m, "meeting_date")));
  bld.labeled("Time of Meeting:", blank(s(m, "meeting_time")));
  bld.labeled("Location:", blank(s(m, "meeting_location")));
  bld.para("The following directors of the Corporation were present, constituting a quorum for the transaction of business:", { gapAfter: 1 });
  dirs(m).forEach((d) => bld.bullet(d.name));

  bld.articleHeading("", "Call to Order");
  bld.para(`${s(m, "president_name")} called the meeting to order and acted as Chair. ${s(m, "secretary_name")} acted as Secretary and recorded these minutes. The Chair announced that this was the first meeting of the Board of Directors following incorporation, and that the purpose of the meeting was to organize the Corporation.`);

  bld.articleHeading("", "Resolutions Adopted");
  bld.para("RESOLVED, that the Articles of Incorporation, as filed with the Secretary of State of the State of " + st + " on " + blank(s(m, "articles_filing_date")) + ", are hereby ratified and approved, and a copy shall be maintained in the corporate records book.", { gapAfter: 3 });
  bld.para("RESOLVED, that the Bylaws presented at this meeting are hereby adopted as the Bylaws of the Corporation.", { gapAfter: 3 });
  bld.para("RESOLVED, that the following persons were elected as officers to serve until the next annual meeting:", { gapAfter: 1 });
  bld.bullet(`President: ${s(m, "president_name")}`);
  bld.bullet(`Vice President: ${blank(s(m, "vice_president_name"))}`);
  bld.bullet(`Secretary: ${s(m, "secretary_name")}`);
  bld.bullet(`Treasurer: ${s(m, "treasurer_name")}`);
  bld.para("RESOLVED, that the Conflict of Interest Policy substantially in the form of the Sample Conflict of Interest Policy set forth in Appendix A of the Instructions to IRS Form 1023 is hereby adopted, and that each director, officer, and committee member shall annually sign the Annual Acknowledgment.", { gapAfter: 3 });
  bld.para(`RESOLVED, that the officers are authorized and directed to apply to the Internal Revenue Service for an Employer Identification Number (EIN), using IRS Form SS-4 or the online application at irs.gov, and that ${s(m, "president_name")} is designated as the "responsible party."`, { gapAfter: 3 });
  bld.para("RESOLVED, that the officers are authorized to open one or more bank accounts in the name of the Corporation, and that any two (2) of the President, Vice President, Secretary, and Treasurer, acting jointly, are authorized to sign checks and orders for payment.", { gapAfter: 3 });
  if (b(m, "apply_501c3")) {
    bld.clause(
      "Authorization to Apply for 501(c)(3) Tax-Exempt Status",
      "RESOLVED, that the officers are authorized and directed to prepare and file with the Internal Revenue Service an application for recognition of exemption under Section 501(c)(3) of the Internal Revenue Code, on IRS Form 1023 or Form 1023-EZ as appropriate. The application must be filed within 27 months of the end of the month in which the Corporation was formed for the exempt status to be effective from the date of formation.",
    );
  }
  bld.para(`RESOLVED, that the fiscal year of the Corporation shall end on ${s(m, "fiscal_year_end")} of each year.`, { gapAfter: 3 });
  bld.para(`RESOLVED, that the principal office of the Corporation shall be located at ${s(m, "principal_office_street")}, ${s(m, "principal_office_city")}, ${s(m, "principal_office_state")} ${s(m, "principal_office_zip")}.`, { gapAfter: 3 });

  bld.articleHeading("", "Adjournment");
  bld.para("There being no further business, upon motion duly made, seconded, and unanimously carried, the meeting was adjourned.");
  bld.para(`The undersigned, being the Secretary of ${org}, hereby certifies that the foregoing is a true and correct record of the initial meeting of the Board of Directors held on ${blank(s(m, "meeting_date"))}.`);
  bld.signature("Signature", "Date");
  bld.labeled("Name:", `${s(m, "secretary_name")}, Secretary`);
  bld.articleHeading("", "Approval by Directors");
  bld.para("The undersigned directors, being all of the directors of the Corporation, hereby approve and consent to the foregoing minutes:", { gapAfter: 1 });
  dirs(m).forEach((d) => bld.signature(`${d.name}, Director`, "Date"));
  return bld.finish();
}

/* ════════════════ COMMON DOC 4 — EIN APPLICATION WORKSHEET ════════════════ */
export function buildEinWorksheet(m: MergeData): jsPDF {
  const bld = new DocBuilder("EIN Application Worksheet");
  const org = s(m, "org_name");
  const st = s(m, "state");
  bld.titleBlock("EIN Application Worksheet", org || "the Corporation", "IRS Form SS-4 — Application for Employer Identification Number");

  bld.noteBox(
    "Important",
    "This is a worksheet — NOT the actual EIN application. Submit the EIN application yourself, free, through irs.gov. The online application takes about 15 minutes and issues your EIN immediately. Never pay a third party to obtain your EIN.",
    "orange",
  );
  bld.articleHeading("", "How to Apply for Your EIN");
  bld.bullet("Go to irs.gov and search \"Apply for an EIN online.\" Click \"Apply Online Now\" (Mon–Fri, 7am–10pm ET).");
  bld.bullet("When asked for the legal structure, select \"View Additional Types, Including Tax-Exempt and Governmental Organizations,\" then \"Other Non-Profit / Tax-Exempt Organization.\"");
  bld.bullet("The responsible party (below) must have a valid SSN or ITIN — typically the President.");
  bld.bullet("Complete the application in a single session. Upon submission, the IRS issues your EIN immediately — save the CP 575 confirmation letter.");

  bld.articleHeading("", "Worksheet — Your Answers");
  bld.labeled("Legal name of entity (Line 1):", org);
  bld.labeled("Trade name / DBA (Line 2):", blank(s(m, "dba_name")));
  bld.labeled("Mailing address (Lines 4a–4b):", `${s(m, "mailing_address_street")}, ${s(m, "mailing_address_city")}, ${s(m, "mailing_address_state")} ${s(m, "mailing_address_zip")}`);
  bld.labeled("Street address (Lines 5a–5b):", `${s(m, "principal_office_street")}, ${s(m, "principal_office_city")}, ${s(m, "principal_office_state")} ${s(m, "principal_office_zip")}`);
  bld.labeled("County and state (Line 6):", `${blank(s(m, "principal_office_county"), 16)} County, ${st}`);
  bld.labeled("Responsible party (Line 7a):", s(m, "president_name"));
  bld.labeled("SSN/ITIN of responsible party (Line 7b):", "(enter directly online — do not write here)");
  bld.labeled("LLC? (Line 8a):", "No");
  bld.labeled("Type of entity (Line 9a):", "Other nonprofit organization");
  bld.labeled("State where incorporated (Line 9b):", st);
  bld.labeled("Reason for applying (Line 10):", "Started a new business (or: Banking purpose)");
  bld.labeled("Date business started (Line 11):", blank(s(m, "articles_filing_date")));
  bld.labeled("Closing month of accounting year (Line 12):", s(m, "fiscal_year_end_month"));
  bld.labeled("Highest number of employees, next 12 months (Line 13):", s(m, "expected_employees"));
  bld.labeled("Expect $1,000 or less in employment tax? (Line 14):", s(m, "low_employment_tax_yn"));
  bld.labeled("First date wages paid, if any (Line 15):", blank(s(m, "first_wages_date")));
  bld.labeled("Principal activity (Line 16):", `Other — ${s(m, "primary_charitable_purpose")} (nonprofit / charitable)`);
  bld.labeled("Principal line of work (Line 17):", blank(s(m, "mission_statement_short"), 20));
  bld.labeled("Previously applied for an EIN? (Line 18):", "No (new entity)");

  bld.noteBox(
    "Reminder — Form 1023 Deadline",
    "To have your 501(c)(3) status recognized retroactively to your formation date, you must file IRS Form 1023 or 1023-EZ within 27 months of the end of the month in which your Corporation was formed. Applying for an EIN does NOT grant 501(c)(3) status.",
    "navy",
  );
  return bld.finish();
}

/* ════════════════ STATE ARTICLES / CERTIFICATE ════════════════ */
export function buildStateArticles(m: MergeData, code: NpStateCode): jsPDF {
  const r = getNpStateRules(code);
  const bld = new DocBuilder(`${code} ${r.articlesLabel}`);
  const org = s(m, "org_name");
  const raBlock = `${s(m, "registered_agent_name")}, ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, ${r.name} ${s(m, "registered_agent_zip")}`;
  const apply = b(m, "apply_501c3");
  const purpose = s(m, "mission_statement");

  const purposeAndClauses = () => {
    bld.articleHeading("", "Purpose");
    bld.para(`The Corporation is organized exclusively for charitable, religious, educational, and scientific purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code of 1986, as amended. The specific purpose of the Corporation is: ${purpose}`);
    if (apply) {
      bld.articleHeading("", "IRS-Required Provisions for 501(c)(3) Recognition");
      irsClauses(bld);
    }
  };
  const directorsList = () => {
    bld.para(`The initial Board of Directors shall consist of ${s(m, "director_count")} directors, whose names and addresses are:`, { gapAfter: 1 });
    dirs(m).forEach((d) => bld.bullet(`${d.name} — ${d.address}`));
  };
  const incorporatorSig = (label = "Incorporator") => {
    bld.gap(3);
    bld.para(`IN WITNESS WHEREOF, the undersigned ${label.toLowerCase()} has executed these Articles of Incorporation this ____ day of __________, ${s(m, "current_year")}.`);
    bld.signature(`${s(m, "incorporator_name")}, ${label}`, "Date");
    bld.labeled("Address:", s(m, "incorporator_address"));
  };

  switch (code) {
    case "DE":
      bld.titleBlock("Certificate of Incorporation of", org, "A Delaware Nonstock, Nonprofit Corporation");
      bld.para("THE UNDERSIGNED, being a natural person of the age of eighteen years or over, for the purpose of forming a nonstock, nonprofit corporation pursuant to the General Corporation Law of the State of Delaware, hereby certifies as follows:", { gapAfter: 3 });
      bld.articleHeading("Article I", "Name");
      bld.para(`The name of the corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article II", "Registered Office and Registered Agent");
      bld.para(`The address of the Corporation's registered office in the State of Delaware is ${s(m, "registered_agent_address")}, in the City of ${s(m, "registered_agent_city")}, County of ${blank(s(m, "registered_agent_county"), 16)}, ${s(m, "registered_agent_zip")}. The name of the registered agent at such address is ${s(m, "registered_agent_name")}.`);
      bld.articleHeading("Article III", "Duration");
      bld.para("The duration of the Corporation shall be perpetual.");
      bld.articleHeading("Article IV", "Purpose");
      bld.para(`The purposes for which the Corporation is formed are: ${purpose} The Corporation is organized exclusively for charitable, religious, educational, and scientific purposes.`);
      bld.articleHeading("Article V", "Nonstock Corporation; Membership");
      bld.para(b(m, "has_voting_members") ? "The Corporation shall not have authority to issue capital stock. The Corporation shall have members with voting rights as set forth in the bylaws." : "The Corporation shall not have authority to issue capital stock. The Corporation shall have no members; the business and affairs shall be managed by the Board of Directors.");
      bld.articleHeading("Article VI", "Board of Directors");
      directorsList();
      if (apply) { bld.articleHeading("Article VII", "Tax-Exempt Purpose and Prohibited Activities"); irsClauses(bld); }
      bld.articleHeading("Article VIII", "Limitation of Director Liability");
      bld.para("To the fullest extent permitted by the General Corporation Law of the State of Delaware, no director shall be personally liable to the Corporation for monetary damages for breach of fiduciary duty as a director.");
      bld.articleHeading("Article IX", "Indemnification");
      bld.para("To the fullest extent permitted by the General Corporation Law of the State of Delaware, the Corporation shall indemnify any person made or threatened to be made a party to any proceeding by reason of the fact that such person is or was a director, officer, employee, or agent of the Corporation.");
      bld.articleHeading("Article X", "Incorporator");
      bld.para(`The name and mailing address of the incorporator is: ${s(m, "incorporator_name")} — ${s(m, "incorporator_address")}.`);
      incorporatorSig();
      break;

    case "WY":
      bld.titleBlock("Articles of Incorporation of", org, "A Wyoming Nonprofit Corporation");
      bld.para("The undersigned, acting as incorporator(s) under the Wyoming Nonprofit Corporation Act, adopts the following Articles of Incorporation:", { gapAfter: 3 });
      bld.articleHeading("Article I", "Name");
      bld.para(`The name of the corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article II", "Classification");
      bld.para("The Corporation is a public benefit corporation within the meaning of the Wyoming Nonprofit Corporation Act.");
      bld.articleHeading("Article III", "Duration");
      bld.para("The period of duration of the Corporation is perpetual.");
      purposeAndClauses();
      bld.articleHeading("Article VI", "Registered Office and Registered Agent");
      bld.para(`The address of the Corporation's initial registered office in Wyoming is ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, Wyoming ${s(m, "registered_agent_zip")}. The name of the initial registered agent is ${s(m, "registered_agent_name")}.`);
      bld.articleHeading("Article VII", "Principal Office");
      bld.para(`The mailing address of the Corporation's initial principal office is ${s(m, "principal_office_street")}, ${s(m, "principal_office_city")}, ${s(m, "principal_office_state")} ${s(m, "principal_office_zip")}.`);
      bld.articleHeading("Article VIII", "Board of Directors");
      directorsList();
      incorporatorSig();
      bld.articleHeading("", "Consent to Appointment by Registered Agent");
      bld.para(`I, ${s(m, "registered_agent_name")}, having a business address at ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, Wyoming ${s(m, "registered_agent_zip")}, hereby consent to serve as the registered agent of ${org}.`);
      bld.signature("Signature of Registered Agent", "Date");
      break;

    case "FL":
      bld.titleBlock("Articles of Incorporation of a Florida Not For Profit Corporation", org, "Chapter 617, Florida Statutes");
      bld.para("The undersigned incorporator, for the purpose of forming a corporation not for profit under the laws of the State of Florida, adopts the following Articles of Incorporation:", { gapAfter: 3 });
      bld.articleHeading("Article I", "Name of Corporation");
      bld.para(`The name of the corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article II", "Principal Place of Business");
      bld.para(`The principal place of business and mailing address of the Corporation is ${s(m, "principal_office_street")}, ${s(m, "principal_office_city")}, ${s(m, "principal_office_state")} ${s(m, "principal_office_zip")}.`);
      purposeAndClauses();
      bld.articleHeading("Article IV", "Manner of Election of Directors");
      bld.para("The manner in which the directors are elected and appointed shall be as set forth in the Bylaws of the Corporation.");
      bld.articleHeading("Article V", "Initial Board of Directors and Officers");
      directorsList();
      bld.para("The initial officers of the Corporation are:", { gapAfter: 1 });
      bld.bullet(`President: ${s(m, "president_name")}`);
      bld.bullet(`Vice President: ${blank(s(m, "vice_president_name"))}`);
      bld.bullet(`Secretary: ${s(m, "secretary_name")}`);
      bld.bullet(`Treasurer: ${s(m, "treasurer_name")}`);
      bld.articleHeading("Article VI", "Registered Agent and Registered Office");
      bld.para(`The registered agent of the Corporation is ${s(m, "registered_agent_name")}. The registered office is ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, Florida ${s(m, "registered_agent_zip")} (a physical street address, not a post office box).`);
      bld.articleHeading("Article VII", "Duration");
      bld.para("The Corporation shall have perpetual existence.");
      bld.articleHeading("Article VIII", "Incorporator");
      bld.para(`The name and street address of the incorporator is: ${s(m, "incorporator_name")} — ${s(m, "incorporator_address")}.`);
      incorporatorSig();
      bld.articleHeading("", "Acceptance by Registered Agent");
      bld.para(`Having been named as registered agent to accept service of process for ${org}, I hereby accept the appointment and agree to act in this capacity and to comply with Chapter 617, Florida Statutes.`);
      bld.signature("Signature of Registered Agent", "Date");
      break;

    case "TX":
      bld.titleBlock("Certificate of Formation — Nonprofit Corporation", org, "Chapter 22, Texas Business Organizations Code");
      bld.para("The undersigned organizer(s), acting for the purpose of forming a nonprofit corporation under the Texas Business Organizations Code, adopt the following Certificate of Formation:", { gapAfter: 3 });
      bld.articleHeading("Article 1", "Entity Name and Type");
      bld.para(`The filing entity being formed is a nonprofit corporation. The name of the corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article 2", "Registered Agent and Registered Office");
      bld.para(`The initial registered agent is an individual resident of the State of Texas: ${s(m, "registered_agent_name")} — ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, Texas ${s(m, "registered_agent_zip")}. Consent of the registered agent is on file at the principal office.`);
      bld.articleHeading("Article 3", "Management");
      bld.para("The management of the affairs of the Corporation is vested in its Board of Directors.");
      bld.articleHeading("Article 4", "Board of Directors");
      directorsList();
      bld.articleHeading("Article 5", "Organization Structure");
      bld.para(b(m, "has_voting_members") ? "The Corporation shall have members, as set forth in the Bylaws." : "The Corporation shall have no members; the business and affairs shall be managed by the Board of Directors.");
      purposeAndClauses();
      bld.articleHeading("Article 8", "Effectiveness of Filing");
      bld.para("This Certificate of Formation shall become effective when the document is filed by the Secretary of State.");
      bld.articleHeading("Article 9", "Organizer");
      bld.para(`The name and address of the organizer is: ${s(m, "incorporator_name")} — ${s(m, "incorporator_address")}.`);
      incorporatorSig("Organizer");
      break;

    case "CA":
      bld.titleBlock("Articles of Incorporation of a Nonprofit Public Benefit Corporation", org, "Cal. Corp. Code §§ 5110 et seq. — Form ARTS-PB-501(c)(3)");
      bld.para("The undersigned incorporator, for the purpose of forming a nonprofit public benefit corporation under the laws of the State of California, does hereby certify:", { gapAfter: 3 });
      bld.articleHeading("Article I", "Name");
      bld.para(`The name of this corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article II", "Statement of Purpose");
      bld.para("A. This corporation is a nonprofit public benefit corporation and is not organized for the private gain of any person. It is organized under the Nonprofit Public Benefit Corporation Law for public and charitable purposes.");
      bld.para(`B. The specific purpose of this corporation is: ${purpose}`);
      bld.articleHeading("Article III", "Agent for Service of Process");
      bld.para(`The name and address in California of this corporation's initial agent for service of process is: ${s(m, "registered_agent_name")}, ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, California ${s(m, "registered_agent_zip")}.`);
      if (apply) { bld.articleHeading("Article IV", "Tax-Exempt Purpose and Prohibited Activities"); irsClauses(bld); }
      bld.articleHeading("Article V", "Dissolution");
      bld.para("The property of this corporation is irrevocably dedicated to charitable purposes and no part of the net income or assets shall ever inure to the benefit of any director, officer, or member, or to any private person. Upon dissolution, assets remaining after payment of debts shall be distributed to a nonprofit fund, foundation, or corporation organized and operated exclusively for charitable purposes and which has established its tax-exempt status under Section 501(c)(3) of the Internal Revenue Code.");
      incorporatorSig();
      break;

    case "NV":
      bld.titleBlock("Articles of Incorporation of", org, "A Nevada Nonprofit Corporation — NRS Chapter 82");
      bld.para("The undersigned, acting as incorporator(s) of a nonprofit corporation under the laws of the State of Nevada, adopt the following Articles of Incorporation:", { gapAfter: 3 });
      bld.articleHeading("Article I", "Name");
      bld.para(`The name of the corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article II", "Registered Agent");
      bld.para(`The name and street address in Nevada of the Corporation's registered agent are: ${s(m, "registered_agent_name")}, ${s(m, "registered_agent_address")}, ${s(m, "registered_agent_city")}, Nevada ${s(m, "registered_agent_zip")}.`);
      purposeAndClauses();
      bld.articleHeading("Article IV", "Duration");
      bld.para("The period of duration of the Corporation is perpetual.");
      bld.articleHeading("Article V", "Members");
      bld.para(b(m, "has_voting_members") ? "The Corporation shall have members, as set forth in the Bylaws." : "The Corporation shall have no members; the business and affairs shall be managed by the Board of Directors.");
      bld.articleHeading("Article VI", "Board of Directors");
      directorsList();
      bld.articleHeading("Article VIII", "Limitation of Liability and Indemnification");
      bld.para("To the fullest extent permitted by NRS 82.221 and NRS Chapter 82, no director or officer shall be personally liable for damages for breach of fiduciary duty, and the Corporation shall indemnify its directors, officers, employees, and agents.");
      bld.articleHeading("Article X", "Incorporator");
      bld.para(`The name and mailing address of the incorporator is: ${s(m, "incorporator_name")} — ${s(m, "incorporator_address")}.`);
      incorporatorSig();
      bld.articleHeading("", "Certificate of Acceptance of Appointment as Registered Agent");
      bld.para(`I, ${s(m, "registered_agent_name")}, hereby accept appointment as Registered Agent for ${org}, a Nevada nonprofit corporation, and certify that I am authorized to accept service of process at the address stated in Article II.`);
      bld.signature("Signature of Registered Agent", "Date");
      break;

    case "NY":
      bld.titleBlock("Certificate of Incorporation of", org, "A New York Not-for-Profit Corporation (Type B) — N-PCL §402");
      bld.para("The undersigned incorporator(s), for the purpose of forming a corporation pursuant to Section 402 of the Not-for-Profit Corporation Law of New York, hereby certify as follows:", { gapAfter: 3 });
      bld.articleHeading("Article First", "Name");
      bld.para(`The name of the Corporation is ${org} (the "Corporation").`);
      bld.articleHeading("Article Second", "Corporate Law and Type");
      bld.para("The Corporation is a corporation as defined in subparagraph (a)(5) of Section 102 of the Not-for-Profit Corporation Law. The Corporation is a Type B corporation under Section 201 of the Not-for-Profit Corporation Law.");
      bld.articleHeading("Article Third", "Purposes");
      bld.para(`The Corporation is a not-for-profit corporation, not organized for pecuniary profit or financial gain, and no part of its assets, income, or profit is distributable to its directors, officers, or members. The purposes for which the Corporation is formed are: ${purpose} The Corporation is organized exclusively for charitable, religious, educational, and scientific purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code.`);
      bld.articleHeading("Article Fourth", "Powers");
      bld.para("In furtherance of its corporate purposes, the Corporation shall have all the general powers enumerated in Section 202 of the Not-for-Profit Corporation Law, subject to any limitations set forth herein, in the Bylaws, or in the Not-for-Profit Corporation Law.");
      bld.articleHeading("Article Fifth", "Office County");
      bld.para(`The office of the Corporation is to be located in ${blank(s(m, "ny_office_county"), 16)} County, State of New York.`);
      bld.articleHeading("Article Sixth", "Directors");
      directorsList();
      bld.para("Under N-PCL §701(a), the Corporation must have not fewer than three (3) directors, each at least eighteen (18) years of age.");
      bld.articleHeading("Article Seventh", "Duration");
      bld.para("The duration of the Corporation shall be perpetual.");
      bld.articleHeading("Article Eighth", "Members");
      bld.para(b(m, "has_voting_members") ? "The Corporation shall have members, as set forth in the Bylaws." : "The Corporation shall have no members within the meaning of Section 601 of the Not-for-Profit Corporation Law.");
      bld.articleHeading("Article Ninth", "Secretary of State as Agent");
      bld.para(`The Secretary of State of New York is hereby designated as agent of the Corporation upon whom process may be served. The post office address to which the Secretary of State shall mail a copy of any process is: ${org}, ${s(m, "ny_mailing_address_street")}, ${s(m, "ny_mailing_address_city")}, ${s(m, "ny_mailing_address_state")} ${s(m, "ny_mailing_address_zip")}.`);
      if (apply) { bld.articleHeading("Article Tenth", "Tax-Exempt Purpose and Prohibited Activities"); irsClauses(bld); }
      bld.articleHeading("Article Eleventh", "Incorporator");
      bld.para(`The name and address of the incorporator is: ${s(m, "incorporator_name")} — ${s(m, "incorporator_address")}. Under N-PCL §401(b), the incorporator must be at least eighteen (18) years of age.`);
      bld.gap(3);
      bld.para(`IN WITNESS WHEREOF, the undersigned incorporator has signed this Certificate of Incorporation this ____ day of __________, ${s(m, "current_year")}, and affirms under the penalties of perjury that the statements contained herein are true.`);
      bld.signature(`${s(m, "incorporator_name")}, Incorporator`, "Date");
      break;
  }
  return bld.finish();
}

/* ════════════════ STATE FILING CHECKLIST ════════════════ */
export function buildStateChecklist(m: MergeData, code: NpStateCode): jsPDF {
  const r = getNpStateRules(code);
  const bld = new DocBuilder(`${code} Filing Checklist`);
  bld.titleBlock("State Filing Checklist", r.name, `Nonprofit Corporation — ${r.articlesLabel.replace(/\s*\(.*\)/, "")}`);

  bld.articleHeading("Section 1", "Where and How to File");
  bld.para(`File with the ${r.name} Secretary of State (nonprofit / business division). Confirm the current filing fee, accepted methods, and processing time on the official portal — fees change and are not published here.`);
  bld.labeled("Official portal:", r.sosUrl);
  bld.para("Filing methods typically include online (fastest), mail, and in person. A physical street address (not a PO Box) is required for the registered office/agent.");

  bld.articleHeading("Section 2", "What to File");
  bld.bullet(`Your ${r.articlesLabel} (in this document package).`);
  if (code === "WY" || code === "FL" || code === "NV") bld.bullet("The registered agent's signed Consent/Acceptance (bundled at the end of your Articles) — your filing will be rejected without it.");
  if (code === "NV") bld.bullet("The separate Initial List of Officers, Directors and Registered Agent (due within 30 days), and claim the State Business License exemption at filing.");
  if (code === "NY") bld.bullet("If your purpose requires N-PCL §404 pre-approval (education, healthcare, child care, certain religious), attach the state agency consent letter — do not file without it.");
  bld.bullet("Payment of the state filing fee.");

  bld.articleHeading("Section 3", "What You Receive Back");
  bld.para("Upon acceptance you will receive a file-stamped copy of your formation document, a permanent state entity ID, and your date of incorporation (used for your IRS Form 1023 deadline). Order a certified copy — it is recommended for opening a bank account and for Form 1023.");

  bld.articleHeading("Section 4", "Key Post-Formation Obligations");
  if (code === "CA") {
    bld.bullet("File Statement of Information (Form SI-100) within 90 days.");
    bld.bullet("File FTB Form 3500A for state income-tax exemption — until granted you owe the $800 minimum franchise tax annually.");
    bld.bullet("Register with the Attorney General Registry of Charitable Trusts (Form CT-1) before soliciting donations; renew annually on RRF-1.");
  } else if (code === "FL") {
    bld.bullet("File the annual report through Sunbiz between January 1 and May 1 each year.");
    bld.bullet("Register for charitable solicitation with FDACS BEFORE accepting any donations (including a website Donate button).");
  } else if (code === "NY") {
    bld.bullet("File the biennial Statement of Information with the Department of State.");
    bld.bullet("After your IRS determination: file CT-247 (franchise tax exemption) and ST-119.2 (sales tax exemption).");
    bld.bullet("Register with the Charities Bureau (Form CHAR410) before soliciting contributions; file CHAR500 annually.");
  } else if (code === "NV") {
    bld.bullet("File the Annual List of Officers, Directors and Registered Agent by the end of your anniversary month.");
    bld.bullet("Reaffirm or renew the State Business License exemption annually.");
    bld.bullet("Register for charitable solicitation with the Secretary of State (or claim exemption) before soliciting.");
  } else if (code === "TX") {
    bld.bullet("After your IRS determination: file AP-204 (franchise tax exemption) and AP-205 (sales tax exemption) with the Comptroller.");
    bld.bullet("File the Periodic Report every four years when the Secretary of State requests it.");
  } else if (code === "DE") {
    bld.bullet("File the annual report by March 1 each year; 501(c)(3) organizations are exempt from franchise tax but must still file.");
  } else if (code === "WY") {
    bld.bullet("File the annual report by the first day of your incorporation month; Wyoming has no state income tax on nonprofits.");
  }
  bld.bullet("If you solicit donations from residents of other states, you may need to register in each of those states.");

  bld.articleHeading("Section 5", "Common Rejection Reasons");
  bld.bullet("Name is not distinguishable from an existing entity, or contains restricted words without approval.");
  bld.bullet("Registered agent address is a PO Box, or the required agent consent/signature is missing.");
  bld.bullet("Missing IRS-required 501(c)(3) provisions — if you intend to apply for 501(c)(3), all six required clauses must appear in the Articles, not only in the Bylaws.");
  bld.bullet("Missing dissolution clause distributing assets to another 501(c)(3) organization.");
  if (code === "FL") bld.bullet("Name does not contain a corporate designator (Corporation, Incorporated, Corp., or Inc.).");
  if (code === "NY") bld.bullet("Missing Type designation, office county, service-of-process address, fewer than 3 directors, or missing required §404 pre-approval consent.");

  bld.articleHeading("Section 6", "Next Steps After Approval");
  bld.bullet("Store your file-stamped formation document and entity ID in your corporate records book.");
  bld.bullet("Apply for your EIN through the IRS online portal (see the EIN Application Worksheet).");
  bld.bullet("Hold your initial board meeting (see the Initial Board Meeting Minutes): adopt Bylaws, elect officers, adopt the Conflict of Interest Policy, and authorize the bank account.");
  bld.bullet("Open your nonprofit bank account (bring a certified copy of your Articles, your EIN letter, Bylaws, and Board Minutes).");
  bld.bullet("File IRS Form 1023 or 1023-EZ within 27 months of the end of the month of incorporation to obtain retroactive tax-exempt status.");

  bld.noteBox("Fees change — confirm before filing", `This checklist directs you to ${r.sosUrl} for current fees and processing times rather than listing amounts that go stale. Verify the current schedule before you file.`, "navy");
  return bld.finish();
}

/* ════════════════ COMMON DOC — FORM 1023 NEXT-STEPS GUIDE ════════════════ */
export function buildForm1023Guide(m: MergeData): jsPDF {
  const bld = new DocBuilder("Form 1023 Next-Steps Guide");
  const org = s(m, "org_name");
  bld.titleBlock("Form 1023 Next-Steps Guide", org || "the Corporation", "Applying to the IRS for 501(c)(3) Recognition");

  bld.noteBox(
    "Two separate steps",
    "You have formed a nonprofit corporation with your state. To become tax-exempt and let donors deduct their gifts, you must separately apply to the IRS for recognition of exemption under Section 501(c)(3). This guide explains that next step. Legalgram is not a law firm and does not provide legal or tax advice.",
    "orange",
  );

  bld.articleHeading("Section 1", "Form 1023 vs. Form 1023-EZ");
  bld.para("There are two application forms. Most small organizations can use the shorter Form 1023-EZ if they meet the eligibility requirements in the Form 1023-EZ Eligibility Worksheet (found in the form instructions) — generally, projected annual gross receipts of $50,000 or less for each of the next three years, total assets of $250,000 or less, and formation as a domestic corporation. Organizations that do not qualify must file the full Form 1023. Churches, schools, and hospitals generally file the full Form 1023.");

  bld.articleHeading("Section 2", "Your Filing Deadline (27 Months)");
  bld.para("To have your 501(c)(3) status recognized retroactively to your date of formation, you must file Form 1023 (or 1023-EZ) within 27 months of the end of the month in which your Corporation was legally formed. If you miss this window, your exempt status generally begins only from the date the IRS receives your application — meaning donations received before that date may not be tax-deductible. Calendar this deadline now.");

  bld.articleHeading("Section 3", "What You'll Need");
  bld.bullet("Your Employer Identification Number (EIN) — see the EIN Application Worksheet in this package.");
  bld.bullet("Your file-stamped Articles/Certificate of Incorporation, including the IRS-required 501(c)(3) provisions.");
  bld.bullet("Your adopted Bylaws and your Conflict of Interest Policy.");
  bld.bullet("A clear description of your past, present, and planned activities (your mission and programs).");
  bld.bullet("Financial data: actual figures if you have them, plus a good-faith budget/projection for the current and next two years.");
  bld.bullet("The name and information of your responsible party (typically the President).");
  bld.bullet("An NTEE code that best describes your organization (from the Form 1023 instructions).");

  bld.articleHeading("Section 4", "How to File");
  bld.bullet("Create an account at pay.gov — both Form 1023 and Form 1023-EZ are filed electronically at pay.gov.");
  bld.bullet("Search for the form (\"1023\" or \"1023-EZ\"), complete every field, and attach the required documents (full Form 1023).");
  bld.bullet("Pay the IRS user fee at submission. Confirm the current user fee amount at irs.gov before you file — fees change and are not listed here.");
  bld.bullet("Keep a copy of your complete submission and confirmation for your corporate records book.");

  bld.articleHeading("Section 5", "After You File");
  bld.para("The IRS will review your application and, if approved, send a Determination Letter recognizing your 501(c)(3) status. Keep this letter permanently — banks, grantmakers, and state agencies will ask for it. After you receive it, complete the state-level exemptions and charitable-registration steps listed in your State Filing Checklist (for example, state income/franchise tax exemption and charitable-solicitation registration before you fundraise).");

  bld.noteBox(
    "Need help?",
    "Form 1023 can be detailed. If your organization is complex (schools, hospitals, churches, or purposes requiring state pre-approval), consider working with a nonprofit attorney or a Form 1023 specialist. Legalgram's Form 1023 preparation service is coming soon.",
    "navy",
  );
  return bld.finish();
}

/* ════════════════ ZIP PACKAGE ════════════════ */
export async function generateNonprofitZip(m: MergeData, code: NpStateCode): Promise<Blob> {
  const r = getNpStateRules(code);
  const org = s(m, "org_name") || "Nonprofit";
  const safe = org.replace(/[^\w]/g, "_").slice(0, 40);
  const zip = new JSZip();
  zip.file(`01_${safe}_Bylaws.pdf`, buildBylaws(m).output("blob"));
  zip.file(`02_${safe}_Conflict_of_Interest_Policy.pdf`, buildConflictOfInterest(m).output("blob"));
  zip.file(`03_${safe}_Initial_Board_Meeting_Minutes.pdf`, buildBoardMinutes(m).output("blob"));
  zip.file(`04_${safe}_EIN_Application_Worksheet.pdf`, buildEinWorksheet(m).output("blob"));
  zip.file(`05_${safe}_${r.articlesLabel.replace(/[^\w]/g, "_")}.pdf`, buildStateArticles(m, code).output("blob"));
  zip.file(`06_${safe}_${code}_Filing_Checklist.pdf`, buildStateChecklist(m, code).output("blob"));
  zip.file(`07_${safe}_Form_1023_Next_Steps_Guide.pdf`, buildForm1023Guide(m).output("blob"));
  return zip.generateAsync({ type: "blob" });
}
