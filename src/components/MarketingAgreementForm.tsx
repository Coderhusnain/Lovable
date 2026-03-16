import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "party1Name", label: "Party 1 name", type: "text", required: true },
      { name: "party1Address", label: "Party 1 address", type: "text", required: true },
      { name: "party2Name", label: "Party 2 name", type: "text", required: true },
      { name: "party2Address", label: "Party 2 address", type: "text", required: true },
      { name: "additionalParty1", label: "Additional party reference 1 (optional — header line)", type: "text", required: false },
      { name: "additionalParty2", label: "Additional party reference 2 (optional — header line)", type: "text", required: false },
    ],
  },
  {
    label: "Recitals & Scope",
    fields: [
      { name: "recitalParty1", label: "Recital Party 1 name (WHEREAS clause)", type: "text", required: false },
      { name: "recitalParty2", label: "Recital Party 2 name (WHEREAS clause)", type: "text", required: false },
      { name: "scopeActivities", label: "Scope of marketing activities (clause 1)", type: "textarea", required: false },
    ],
  },
  {
    label: "Tracking of Users",
    fields: [
      { name: "trackingA1", label: "Tracking (a) — 1st party implementing", type: "text", required: false },
      { name: "trackingA2", label: "Tracking (a) — enabled party identifying users", type: "text", required: false },
      { name: "trackingA3", label: "Tracking (a) — source site name", type: "text", required: false },
      { name: "trackingA4", label: "Tracking (a) — destination site name", type: "text", required: false },
      { name: "trackingA5", label: "Tracking (a) — services label", type: "text", required: false },
      { name: "trackingB1", label: "Tracking (b) — 1st party implementing", type: "text", required: false },
      { name: "trackingB2", label: "Tracking (b) — enabled party identifying users", type: "text", required: false },
      { name: "trackingB3", label: "Tracking (b) — source site name", type: "text", required: false },
      { name: "trackingB4", label: "Tracking (b) — destination site name", type: "text", required: false },
      { name: "trackingB5", label: "Tracking (b) — services label", type: "text", required: false },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      { name: "initialTermMonths", label: "Initial term (months, clause 5)", type: "text", required: false, placeholder: "6" },
      { name: "renewalTermMonths", label: "Renewal term (months, clause 5)", type: "text", required: false, placeholder: "6" },
      { name: "causeCureDays", label: "Cure period for cause termination (days, clause 5a)", type: "text", required: false, placeholder: "30" },
      { name: "convenienceNoticeDays", label: "Convenience termination notice (days, clause 5b)", type: "text", required: false, placeholder: "30" },
    ],
  },
  {
    label: "Liability & Governing Law",
    fields: [
      { name: "liabilityCap", label: "Liability cap amount (clause 9)", type: "text", required: false },
      { name: "governingState", label: "Governing law state (clause 11i)", type: "text", required: true },
      { name: "disputeVenue", label: "Dispute court location (clause 11i)", type: "text", required: false },
      { name: "recordsRetentionYears", label: "Records retention years (clause 11k)", type: "text", required: false, placeholder: "1" },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "party1By", label: "Party 1 — By (authorized signatory)", type: "text", required: false },
      { name: "party1SignerName", label: "Party 1 — Name", type: "text", required: false },
      { name: "party1Title", label: "Party 1 — Title", type: "text", required: false },
      { name: "party1Date", label: "Party 1 — Date", type: "date", required: false },
      { name: "party2By", label: "Party 2 — By (authorized signatory)", type: "text", required: false },
      { name: "party2SignerName", label: "Party 2 — Name", type: "text", required: false },
      { name: "party2Title", label: "Party 2 — Title", type: "text", required: false },
      { name: "party2Date", label: "Party 2 — Date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);
  const checkBreak = (needed = lh) => { if (y + needed > limit) { doc.addPage(); y = 20; } };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    y += 1;
    checkBreak(lh + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
  };

  const subHeading = (text: string) => {
    checkBreak(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 2;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const romanItem = (num: string, text: string) => {
    const full = `${num}. ${text}`;
    const lines = doc.splitTextToSize(full, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "MARKETING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  const ap1 = (values.additionalParty1 || "").trim();
  const ap2 = (values.additionalParty2 || "").trim();
  const extraParties = ap1 || ap2 ? `, and ${ap1 ? ap1 : u("", 14)} and ${ap2 ? ap2 : u("", 14)}` : "";
  p(
    `This Marketing Agreement (this "Agreement"), dated as of ${u(values.effectiveDate, 12)} (the "Effective Date"), is entered into by and between ${u(values.party1Name, 20)}, located at ${u(values.party1Address, 20)}, and ${u(values.party2Name, 20)}, located at ${u(values.party2Address, 20)}${extraParties} (each individually, a "Party," and collectively, the "Parties").`
  );
  y += 1;

  // ── RECITALS ────────────────────────────────────────────────────────────
  heading("RECITALS");
  p(`WHEREAS, ${u(values.recitalParty1 || values.party1Name, 16)} and ${u(values.recitalParty2 || values.party2Name, 16)} desire to establish an exclusive strategic marketing relationship pursuant to which each Party shall promote the other Party\u2019s products and services to its respective customers;`);
  p("WHEREAS, this Agreement may be amended only by a written instrument executed by both Parties (an \u201cAmendment\u201d), and any Amendment shall be governed by the terms of this Agreement unless expressly stated otherwise.");
  p("NOW, THEREFORE, in consideration of the mutual covenants set forth herein, the Parties agree as follows:");
  y += 1;

  // ── 1. SCOPE OF ACTIVITIES ────────────────────────────────────────────
  heading("1. SCOPE OF ACTIVITIES");
  const scope = (values.scopeActivities || "").trim();
  p(scope
    ? `The Parties shall carry out the marketing activities as decided. ${scope}. Each Party acknowledges that its obligations and constitute good and valuable consideration for this Agreement.`
    : "The Parties shall carry out the marketing activities as decided. Each Party acknowledges that its obligations and constitute good and valuable consideration for this Agreement."
  );

  // ── 2. REPORTING ──────────────────────────────────────────────────────
  heading("2. REPORTING");
  p("Within ten (10) days following the end of each calendar month during the Term, each Party shall furnish to the other Party (or provide access to) a monthly report containing all data reasonably necessary to determine the value (including but not limited to traffic, completed sales, revenue, and conversions) generated from the activities performed under this Agreement.");

  // ── 3. TRACKING OF USERS ──────────────────────────────────────────────
  heading("3. TRACKING OF USERS");
  p(`a. ${u(values.trackingA1, 10)} shall implement and maintain reasonable tracking mechanisms enabling ${u(values.trackingA2, 10)} to accurately identify users linking from the ${u(values.trackingA3, 10)} Site to the ${u(values.trackingA4, 10)} Site and purchasing ${u(values.trackingA5, 10)} Services.`);
  p(`b. ${u(values.trackingB1, 10)} shall implement and maintain reasonable tracking mechanisms enabling ${u(values.trackingB2, 10)} to accurately identify users linking from the ${u(values.trackingB3, 10)} Site to the ${u(values.trackingB4, 10)} Site and purchasing ${u(values.trackingB5, 10)} Services.`);

  // ── 4. LICENSES ───────────────────────────────────────────────────────
  heading("4. LICENSES");
  p("Each Party grants to the other Party a non-exclusive, non-transferable, royalty-free license to use its trade names, trademarks, logos, and service marks (collectively, the \u201cMarks\u201d) solely in connection with the performance of this Agreement.");
  p("No Party shall use the other Party\u2019s Marks without prior written approval. No modifications to any Marks may be made without express written consent.");
  p("Each Party acknowledges that all rights, title, and interest in and to the other Party\u2019s Marks and related goodwill remain exclusively with that Party. Neither Party shall contest, nor assist in contesting, the validity of any Marks, nor utilize marks that may cause confusion therewith.");
  p("All use of the other Party\u2019s Marks shall cease immediately upon request and shall automatically terminate upon expiration or termination of this Agreement.");

  // ── 5. TERM AND TERMINATION ───────────────────────────────────────────
  heading("5. TERM AND TERMINATION");
  p(`The term of this Agreement shall commence on the Effective Date and shall continue for ${u(values.initialTermMonths || "six (6)", 8)} months (the "Initial Term"), unless terminated earlier according to this Agreement.`);
  p("The Launch Date shall be the date on which each Party\u2019s promotional offer goes live on the other Party\u2019s website.");
  p(`Following the Initial Term, this Agreement shall automatically renew for successive ${u(values.renewalTermMonths || "six", 6)}-month periods (each, a "Renewal Term") unless terminated as provided below.`);
  subHeading("a. Termination for Cause");
  p(`Either Party may terminate this Agreement immediately upon written notice if the other Party materially defaults and fails to cure such default within ${u(values.causeCureDays || "thirty (30)", 8)} days of receiving written notice thereof.`);
  subHeading("b. Termination for Convenience");
  p(`Either Party may terminate this Agreement for any reason after the Initial Term upon ${u(values.convenienceNoticeDays || "thirty (30)", 8)} days\u2019 prior written notice.`);
  subHeading("c. Effect of Termination");
  p("Upon termination or expiration:");
  romanItem("i", "All promotions of the other Party\u2019s services shall immediately cease;");
  romanItem("ii", "Use of any Marks and technology of the other Party shall cease;");
  romanItem("iii", "The other Party\u2019s services shall no longer be displayed or made available through any website, platform, or channel;");
  romanItem("iv", "Upon written request, all confidential materials shall be returned or destroyed.");
  p("Termination shall not relieve either Party of obligations arising prior to the termination date.");

  // ── 6. WARRANTIES; DISCLAIMER ─────────────────────────────────────────
  heading("6. WARRANTIES; DISCLAIMER");
  subHeading("a. Warranties");
  p("Each Party represents and warrants that:");
  romanItem("i", "It has full authority to enter into and perform its obligations under this Agreement;");
  romanItem("ii", "Execution and performance will not violate any existing agreement;");
  romanItem("iii", "This Agreement constitutes a legal, valid, and binding obligation;");
  romanItem("iv", "No warranties are made by either Party other than those expressly stated in this Agreement.");
  subHeading("b. Disclaimer");
  p("EXCEPT AS EXPRESSLY PROVIDED HEREIN, EACH PARTY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, OR FITNESS FOR A PARTICULAR PURPOSE.");

  // ── 7. INDEMNIFICATION ────────────────────────────────────────────────
  heading("7. INDEMNIFICATION");
  subHeading(`a. Indemnification by ${u(values.party1Name, 12)}`);
  p(`${u(values.party1Name, 16)} shall indemnify, defend, and hold harmless ${u(values.party2Name, 16)} and its officers, directors, employees, and agents from all claims, costs, liabilities, and losses arising out of allegations that ${u(values.party1Name, 16)}\u2019s technology or Marks infringe upon any third-party intellectual property rights.`);
  subHeading(`b. Indemnification by ${u(values.party2Name, 12)}`);
  p(`${u(values.party2Name, 16)} shall indemnify, defend, and hold harmless ${u(values.party1Name, 16)} under the same terms and conditions stated above.`);
  subHeading("c. Procedures");
  p("The indemnified Party shall promptly notify the indemnifying Party of any claim. The indemnifying Party shall control the defense and settlement of the claim. No settlement may be entered that imposes liability or restrictions on the indemnified Party without its written consent. The indemnified Party may participate in the defense at its own cost.");

  // ── 8. CONFIDENTIALITY ────────────────────────────────────────────────
  heading("8. CONFIDENTIALITY");
  subHeading("a. Protection of Information");
  p("During the Term, the Parties may exchange confidential information relating to business operations, products, pricing, employees, technology, and other proprietary matters (\u201cConfidential Information\u201d).");
  p("Confidential Information shall exclude information that:");
  romanItem("i", "becomes public through no wrongful act;");
  romanItem("ii", "was previously known to the receiving Party;");
  romanItem("iii", "enters the public domain through no fault of the receiving Party.");
  p("Confidential Information shall be kept strictly confidential and used solely for performance under this Agreement. Required disclosures (e.g., subpoenas) are permitted only with reasonable prior notice to the other Party.");
  subHeading("b. Injunctive Relief");
  p("Improper disclosure or misuse of Confidential Information may cause irreparable harm. The harmed Party is entitled to injunctive relief without the need to prove monetary damages.");
  subHeading("c. Survival");
  p("Confidentiality obligations shall survive termination of this Agreement.");

  // ── 9. LIMITATION OF LIABILITY ────────────────────────────────────────
  heading("9. LIMITATION OF LIABILITY");
  p("NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY THEREOF.");
  p(`Each Party\u2019s total cumulative liability arising out of this Agreement shall not exceed ${u(values.liabilityCap, 10)}, except with respect to obligations under Indemnification and Confidentiality.`);

  // ── 10. PUBLICITY ─────────────────────────────────────────────────────
  heading("10. PUBLICITY");
  p("No public announcement or press release referring to the other Party shall be made without prior written approval, except statements identifying the other Party as a customer or strategic marketing partner. Such approval shall not be unreasonably withheld or delayed.");

  // ── 11. MISCELLANEOUS ─────────────────────────────────────────────────
  heading("11. MISCELLANEOUS");
  subHeading("a. Notices");
  p("All notices shall be in writing and delivered to the addresses listed above via express mail or courier with confirmed receipt. Notices shall be effective upon receipt.");
  subHeading("b. Entire Agreement");
  p("This Agreement constitutes the complete and exclusive agreement between the Parties and supersedes all prior understandings relating to the subject matter.");
  subHeading("c. Waiver");
  p("No waiver is effective unless in writing. A waiver applies only to the specific instance and does not constitute a continuing waiver.");
  subHeading("d. Force Majeure");
  p("Neither Party shall be liable for failure to perform due to circumstances beyond its reasonable control, including natural disasters, pandemics, acts of war, riots, government actions, or labor disputes.");
  subHeading("e. Headings");
  p("Headings are for convenience only and shall not affect interpretation.");
  subHeading("f. Amendments and Severability");
  p("Any modification must be in writing and signed by both Parties. Invalid provisions shall be replaced with enforceable provisions that most closely reflect the Parties\u2019 original intent.");
  subHeading("g. Assignment");
  p("No Party may assign its rights or obligations without prior written consent, except in connection with a merger or sale of substantially all assets, with notice.");
  subHeading("h. Independent Contractors");
  p("The Parties are independent contractors and nothing herein creates a partnership, joint venture, agency, or employment relationship.");
  subHeading("i. Governing Law");
  p(`This Agreement shall be governed by the laws of the State of ${u(values.governingState, 14)}. All disputes shall be resolved exclusively in the courts located in ${u(values.disputeVenue || values.governingState, 14)}.`);
  subHeading("j. Construction");
  p("Any conflicting or ambiguous provisions shall be interpreted to reflect the Parties\u2019 original intentions without affecting the enforceability of the remaining Agreement.");
  subHeading("k. Records");
  p(`For ${u(values.recordsRetentionYears || "one (1)", 8)} year following the Term, each Party shall maintain accurate records relating to customer transactions and shall make such records available upon reasonable notice.`);

  // ── 12. SIGNATORIES ───────────────────────────────────────────────────
  heading("12. SIGNATORIES");
  p("This Agreement is executed by authorized representatives of the Parties as of the Effective Date.");
  y += 4;

  p("Party 1", true, 1);
  sigLine("By", values.party1By, 28);
  sigLine("Name", values.party1SignerName, 28);
  sigLine("Title", values.party1Title, 28);
  sigLine("Date", values.party1Date, 20);
  y += 4;

  checkBreak(40);
  p("Party 2", true, 1);
  sigLine("By", values.party2By, 28);
  sigLine("Name", values.party2SignerName, 28);
  sigLine("Title", values.party2Title, 28);
  sigLine("Date", values.party2Date, 20);

  doc.save("marketing_agreement.pdf");
};

export default function MarketingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Marketing Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="marketingagreement"
    />
  );
}