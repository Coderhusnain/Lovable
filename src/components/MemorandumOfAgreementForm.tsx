import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "text", required: true, placeholder: "[Effective Date]" },
      { name: "firstParty", label: "First Party Name", type: "text", required: true },
      { name: "firstAddress", label: "First Party Address", type: "text", required: true },
      { name: "secondParty", label: "Second Party Name", type: "text", required: true },
      { name: "secondAddress", label: "Second Party Address", type: "text", required: true },
    ],
  },
  {
    label: "Core Terms",
    fields: [
      { name: "term", label: "Agreement Term", type: "text", required: true, placeholder: "[Specify Term]" },
      { name: "goal1", label: "Goal 1", type: "text", required: true, placeholder: "[Specify Goal 1]" },
      { name: "goal2", label: "Goal 2", type: "text", required: true, placeholder: "[Specify Goal 2]" },
      { name: "cureDays", label: "Default cure days", type: "text", required: true, placeholder: "[Specify Number of Days]" },
      { name: "workProductOwner", label: "Work product owner", type: "text", required: true, placeholder: "[Specify Party]" },
      { name: "jurisdiction", label: "Governing jurisdiction", type: "text", required: true, placeholder: "[Specify Jurisdiction]" },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "firstSignName", label: "First Party signatory name", type: "text", required: true },
      { name: "firstSignTitle", label: "First Party signatory title", type: "text", required: false },
      { name: "firstSignature", label: "First Party signature", type: "text", required: true },
      { name: "firstDate", label: "First Party date", type: "text", required: false },
      { name: "secondSignName", label: "Second Party signatory name", type: "text", required: true },
      { name: "secondSignTitle", label: "Second Party signatory title", type: "text", required: false },
      { name: "secondSignature", label: "Second Party signature", type: "text", required: true },
      { name: "secondDate", label: "Second Party date", type: "text", required: false },
    ],
  },
  {
    label: "Witness 1",
    fields: [
      { name: "w1Name", label: "Witness 1 name", type: "text", required: true },
      { name: "w1Id", label: "Witness 1 CNIC/ID No.", type: "text", required: true },
      { name: "w1Signature", label: "Witness 1 signature", type: "text", required: true },
      { name: "w1Date", label: "Witness 1 date", type: "text", required: false },
    ],
  },
  {
    label: "Witness 2",
    fields: [
      { name: "w2Name", label: "Witness 2 name", type: "text", required: true },
      { name: "w2Id", label: "Witness 2 CNIC/ID No.", type: "text", required: true },
      { name: "w2Signature", label: "Witness 2 signature", type: "text", required: true },
      { name: "w2Date", label: "Witness 2 date", type: "text", required: false },
    ],
  },
  {
    label: "Optional Notes",
    fields: [{ name: "extra", label: "Additional text (optional)", type: "textarea", required: false }],
  },
  {
    label: "Review",
    fields: [{ name: "confirm", label: "Type YES to confirm review", type: "text", required: false }],
  },
];

const u = (v?: string, fallback = "____________________") =>
  v && v.trim() ? v.trim() : fallback;

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const textW = pageW - margin * 2;
  const lineH = 5.4;
  const pageLimit = pageH - 18;
  let y = 18;

  // ── Core helpers ────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 18;
    }
  };

  // Plain paragraph (normal or bold)
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.5) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Top-level numbered heading — e.g. "1. TERM OF AGREEMENT"
  const sectionHeading = (text: string) => {
    checkY(lineH + 6);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Sub-heading row: "3.1  First Party Obligations" (bold) then body below
  const subSection = (label: string, title: string, body: string, indent = 4) => {
    checkY(lineH * 3);
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    doc.text(`${label}  ${title}`, margin, y);
    y += lineH + 1;
    p(body, false, indent, 3);
  };

  // Bullet item with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2);
    doc.text("\u2022", margin + 1, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2;
  };

  // Inline labelled field (e.g. "Name: John")
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("times", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(
        margin + lblW,
        y + 1.3,
        margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2),
        y + 1.3
      );
    } else {
      doc.line(margin + lblW, y + 1.3, margin + lblW + lineLen, y + 1.3);
    }
    y += lineH + 2.5;
  };

  // ── TITLE ───────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "MEMORANDUM OF AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.4, pageW / 2 + halfTW, y + 1.4);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────
  p(
    `This Memorandum of Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, "[Effective Date]")}, by and between:`
  );

  // Bullet parties
  bullet(
    `${u(v.firstParty, "[First Party Name]")}, having its principal place of business at ${u(v.firstAddress, "[Address]")} (hereinafter referred to as the "First Party"); and`
  );
  bullet(
    `${u(v.secondParty, "[Second Party Name]")}, having its principal place of business at ${u(v.secondAddress, "[Address]")} (hereinafter referred to as the "Second Party");`
  );

  y += 1;
  p(`Collectively referred to as the "Parties" and individually as a "Party."`);
  p(
    `The Parties hereby agree to be bound by the terms and conditions set forth herein for the purpose of defining their respective rights, obligations, and responsibilities.`
  );

  // ── 1. TERM OF AGREEMENT ────────────────────────────────────
  sectionHeading("1.  TERM OF AGREEMENT");

  subSection(
    "1.1",
    "Duration",
    `This Agreement shall remain in full force and effect for a period of ${u(v.term, "[Specify Term]")} (the "Term"), unless earlier terminated in accordance with the provisions herein.`
  );

  subSection(
    "1.2",
    "Early Termination",
    `Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach. Termination of a portion of this Agreement shall not affect other provisions unless the breach results in the substantial loss of the Agreement's overall value to the non-breaching Party.`
  );

  p(
    `Termination shall not relieve either Party from obligations concerning confidentiality, non-disclosure, or other continuing covenants as set forth in this Agreement.`,
    false,
    4,
    3
  );

  // ── 2. GOALS AND OBJECTIVES ─────────────────────────────────
  sectionHeading("2.  GOALS AND OBJECTIVES");

  p(
    `The Parties agree to cooperate and perform their respective obligations to achieve the objectives outlined below:`
  );

  bullet(u(v.goal1, "[Specify Goal 1]"));
  bullet(u(v.goal2, "[Specify Goal 2]"));
  bullet("[Additional objectives as applicable]");

  y += 1;
  p(
    `The Parties shall act in good faith to further these goals and implement the terms of this Agreement effectively.`
  );

  // ── 3. OBLIGATIONS OF THE PARTIES ───────────────────────────
  sectionHeading("3.  OBLIGATIONS OF THE PARTIES");

  // 3.1
  checkY(lineH * 2);
  doc.setFont("times", "bold");
  doc.text("3.1  First Party Obligations", margin, y);
  y += lineH + 1;
  p("The First Party shall:", false, 4, 1.5);
  bullet("Perform all duties, tasks, and services as specified in Schedule A;");
  bullet("Provide timely reports and updates to the Second Party;");
  bullet(
    "Comply with all applicable laws, regulations, and standards relevant to the performance of this Agreement."
  );

  y += 1.5;

  // 3.2
  checkY(lineH * 2);
  doc.setFont("times", "bold");
  doc.text("3.2  Second Party Obligations", margin, y);
  y += lineH + 1;
  p("The Second Party shall:", false, 4, 1.5);
  bullet("Perform all duties, tasks, and services as specified in Schedule B;");
  bullet(
    "Cooperate fully with the First Party to achieve the goals and objectives of this Agreement;"
  );
  bullet(
    "Maintain accurate records and provide access for inspection as reasonably requested."
  );

  // ── 4. CONFIDENTIALITY ──────────────────────────────────────
  sectionHeading("4.  CONFIDENTIALITY AND INFORMATION DISCLOSURE");

  subSection(
    "4.1",
    "Confidentiality",
    `Each Party shall treat as strictly confidential all information received in connection with this Agreement.`
  );

  subSection(
    "4.2",
    "Permitted Disclosures",
    `Confidential information may only be disclosed if:`
  );
  p("(i)   Required by applicable law or governmental authority;", false, 8, 1.5);
  p(
    "(ii)  Already in the public domain through no fault of the disclosing Party; or",
    false,
    8,
    1.5
  );
  p(
    "(iii) Authorized in writing by the other Party, provided that such disclosure occurs only after consultation and notice to the non-disclosing Party.",
    false,
    8,
    3
  );

  subSection(
    "4.3",
    "Return of Information",
    `Upon request, all documents, records, or materials containing Confidential Information shall be returned or destroyed, with confirmation in writing.`
  );

  // ── 5. RELATIONSHIP ─────────────────────────────────────────
  sectionHeading("5.  RELATIONSHIP OF THE PARTIES");

  p(
    `The Parties acknowledge and agree that their relationship is that of partners in a partnership solely for the purpose of achieving the objectives of this Agreement. Nothing herein shall be construed as creating a joint venture, employment, agency, or other fiduciary relationship.`
  );

  // ── 6. CONSIDERATION ────────────────────────────────────────
  sectionHeading("6.  CONSIDERATION");

  p(
    `This Agreement is entered into in consideration of the mutual covenants, promises, and undertakings set forth herein, including any specific consideration outlined in Schedule C, which the Parties acknowledge as adequate and sufficient.`
  );

  // ── 7. REPRESENTATIONS AND WARRANTIES ───────────────────────
  sectionHeading("7.  REPRESENTATIONS AND WARRANTIES");

  p("Each Party represents and warrants to the other that:");
  bullet("It has full legal capacity, power, and authority to execute and perform this Agreement;");
  bullet("All necessary corporate or legal approvals have been obtained;");
  bullet(
    "This Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms;"
  );
  bullet(
    "It shall act in good faith and take all necessary actions to effectuate the intent and purpose of this Agreement."
  );

  // ── 8. WORK PRODUCT ─────────────────────────────────────────
  sectionHeading("8.  WORK PRODUCT AND INTELLECTUAL PROPERTY");

  p(
    `Any copyrightable works, inventions, discoveries, ideas, patents, or other proprietary materials developed wholly or partly in connection with the performance of this Agreement (the "Work Product") shall be the exclusive property of ${u(v.workProductOwner, "[Specify Party]")}.`
  );
  p(
    `The Parties agree to execute all documents necessary to confirm or perfect ownership rights as required.`
  );

  // ── 9. NOTICE ───────────────────────────────────────────────
  sectionHeading("9.  NOTICE");

  p(
    `Any notice required or permitted under this Agreement shall be deemed sufficiently given if delivered personally or sent by certified mail, return receipt requested, to the addresses listed above or to such other address as a Party may provide in writing. Notices are deemed received:`
  );
  bullet("Upon delivery if in person;");
  bullet("On the date of acknowledgment if sent by certified mail; or");
  bullet("On the third day after mailing if not acknowledged.");

  // ── 10. TERMINATION AND REMEDIES ────────────────────────────
  sectionHeading("10.  TERMINATION AND REMEDIES");

  subSection(
    "10.1",
    "Termination for Material Breach",
    `Either Party may terminate the Agreement if the other fails to remedy a material breach within thirty (30) days of written notice. Termination shall not affect claims for damages or other remedies available under law.`
  );

  subSection(
    "10.2",
    "Default and Cure Period",
    `In addition to termination rights, the non-defaulting Party may issue written notice of default. The defaulting Party shall have ${u(v.cureDays, "[Specify Number of Days]")} days to cure the default. Failure to cure shall entitle the non-defaulting Party to terminate this Agreement and exercise all legal remedies.`
  );

  // ── 11. AMENDMENT ───────────────────────────────────────────
  sectionHeading("11.  AMENDMENT");
  p(
    `This Agreement may be amended or modified only by a written instrument executed by all Parties.`
  );

  // ── 12. SEVERABILITY ────────────────────────────────────────
  sectionHeading("12.  SEVERABILITY");
  p(
    `If any provision of this Agreement is found invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Any invalid provision shall be construed or limited as necessary to render it valid and enforceable.`
  );

  // ── 13. WAIVER OF RIGHTS ────────────────────────────────────
  sectionHeading("13.  WAIVER OF RIGHTS");
  p(
    `The failure of any Party to enforce a provision of this Agreement shall not constitute a waiver of the right to enforce that provision or any other provision in the future.`
  );

  // ── 14. GOVERNING LAW ───────────────────────────────────────
  sectionHeading("14.  GOVERNING LAW");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(v.jurisdiction, "[Specify Jurisdiction]")}, without regard to its conflict of laws principles.`
  );

  // ── 15. ENTIRE AGREEMENT ────────────────────────────────────
  sectionHeading("15.  ENTIRE AGREEMENT");
  p(
    `This Agreement constitutes the entire understanding between the Parties regarding its subject matter and supersedes all prior oral or written agreements, representations, or understandings.`
  );

  // ── 16. SIGNATORIES ─────────────────────────────────────────
  sectionHeading("16.  SIGNATORIES");

  p(
    `IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Memorandum of Agreement as of the Effective Date.`,
    false,
    0,
    5
  );

  // First Party block
  checkY(lineH * 6);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("FIRST PARTY", margin, y);
  y += lineH + 2;
  field("Name", u(v.firstSignName, ""));
  field("Title", u(v.firstSignTitle, ""));
  field("Signature", u(v.firstSignature, ""));
  field("Date", u(v.firstDate, ""));

  y += 4;

  // Second Party block
  checkY(lineH * 6);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("SECOND PARTY", margin, y);
  y += lineH + 2;
  field("Name", u(v.secondSignName, ""));
  field("Title", u(v.secondSignTitle, ""));
  field("Signature", u(v.secondSignature, ""));
  field("Date", u(v.secondDate, ""));

  y += 4;

  // Witnesses
  checkY(lineH * 2);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("WITNESSES", margin, y);
  y += lineH + 3;

  // Witness 1
  checkY(lineH * 6);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("1.", margin, y);
  y += lineH + 1;
  field("Name", u(v.w1Name, ""));
  field("CNIC/ID No.", u(v.w1Id, ""));
  field("Signature", u(v.w1Signature, ""));
  field("Date", u(v.w1Date, ""));

  y += 4;

  // Witness 2
  checkY(lineH * 6);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("2.", margin, y);
  y += lineH + 1;
  field("Name", u(v.w2Name, ""));
  field("CNIC/ID No.", u(v.w2Id, ""));
  field("Signature", u(v.w2Signature, ""));
  field("Date", u(v.w2Date, ""));

  // Optional extra notes
  if (v.extra?.trim()) {
    y += 4;
    sectionHeading("ADDITIONAL NOTES");
    p(v.extra.trim());
  }

  doc.save("memorandum_of_agreement.pdf");
};

export default function MemorandumOfAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum Of Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="memorandumofagreement"
    />
  );
}