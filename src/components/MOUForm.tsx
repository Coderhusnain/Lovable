import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partners",
    fields: [
      { name: "date", label: "Memorandum date", type: "text", required: true, placeholder: "[-------]" },
      { name: "partnerA", label: "Partner A name", type: "text", required: true, placeholder: "[------]" },
      { name: "partnerAOffice", label: "Partner A principal office", type: "text", required: true, placeholder: "[------]" },
      { name: "partnerB", label: "Partner B name", type: "text", required: true, placeholder: "[--------]" },
      { name: "partnerBOffice", label: "Partner B principal office", type: "text", required: true, placeholder: "[------]" },
      { name: "project", label: "Project name", type: "text", required: true, placeholder: "[---------]" },
    ],
  },
  {
    label: "Services and Resources",
    fields: [
      { name: "serviceA", label: "Partner A services", type: "textarea", required: true, placeholder: "[●]" },
      { name: "serviceB", label: "Partner B services", type: "textarea", required: true, placeholder: "[●]" },
      { name: "resourceA", label: "Partner A resources", type: "text", required: true, placeholder: "[financial, material, labor resources]" },
      { name: "resourceB", label: "Partner B resources", type: "text", required: true, placeholder: "[financial, material, labor resources]" },
    ],
  },
  {
    label: "Term and Law",
    fields: [
      { name: "termStart", label: "Term start date", type: "text", required: true, placeholder: "[●]" },
      { name: "termEnd", label: "Term end date", type: "text", required: true, placeholder: "[●]" },
      { name: "state", label: "Governing state", type: "text", required: true, placeholder: "[●]" },
    ],
  },
  {
    label: "Partner A Signature",
    fields: [
      { name: "partnerANameSign", label: "Partner A signatory name", type: "text", required: true },
      { name: "partnerATitle", label: "Partner A signatory title", type: "text", required: false },
      { name: "partnerASignature", label: "Partner A signature (typed)", type: "text", required: true },
      { name: "partnerADate", label: "Partner A sign date", type: "text", required: false },
    ],
  },
  {
    label: "Partner B Signature",
    fields: [
      { name: "partnerBNameSign", label: "Partner B signatory name", type: "text", required: true },
      { name: "partnerBTitle", label: "Partner B signatory title", type: "text", required: false },
      { name: "partnerBSignature", label: "Partner B signature (typed)", type: "text", required: true },
      { name: "partnerBDate", label: "Partner B sign date", type: "text", required: false },
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

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const textW = pageW - margin * 2;
  const lineH = 5.4;
  const pageLimit = pageH - 18;
  let y = 18;

  // ── Helpers ──────────────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 18;
    }
  };

  // Plain body paragraph — normal or bold, optional left indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.8) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold section heading with extra spacing — e.g. "1. Purpose"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Bold sub-heading on its own line — e.g. "2.1 Services to be Rendered:"
  const subHeading = (text: string) => {
    checkY(lineH + 4);
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 2);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 2;
  };

  // Bullet item (•) with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.5);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.5;
  };

  // Bullet item where the label part is bold — e.g. "• Non-Binding Nature: body..."
  const bulletBoldLabel = (label: string, body: string, indent = 6) => {
    doc.setFontSize(10.5);
    const fullText = `${label} ${body}`;
    const lines = doc.splitTextToSize(fullText, textW - indent);
    checkY(lines.length * lineH + 2.5);
    // Draw bullet
    doc.setFont("times", "normal");
    doc.text("\u2022", margin + 1.5, y);
    // Draw bold label on first line
    doc.setFont("times", "bold");
    doc.text(label, margin + indent, y);
    const labelW = doc.getTextWidth(label);
    // Draw normal body continuing after label on same line
    doc.setFont("times", "normal");
    // Re-split just the body to find wrapping
    const afterLabel = ` ${body}`;
    const firstLineSpace = textW - indent - labelW;
    const bodyLines = doc.splitTextToSize(afterLabel.trim(), textW - indent - labelW);
    // First body line on same row as label
    if (bodyLines.length > 0) {
      doc.text(bodyLines[0], margin + indent + labelW, y);
    }
    y += lineH;
    // Remaining body lines indented
    for (let i = 1; i < bodyLines.length; i++) {
      checkY(lineH + 1);
      doc.text(bodyLines[i], margin + indent, y);
      y += lineH;
    }
    y += 2.5;
  };

  // Numbered list item — e.g. "1.  A Dispute Resolution Group..."
  const numbered = (num: string, text: string, indent = 8) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.5);
    doc.text(`${num}.`, margin + 1, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.5;
  };

  // Signature field row with underline
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
    y += lineH + 2.8;
  };

  // ── TITLE ────────────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "MEMORANDUM OF UNDERSTANDING (MOU)";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.4, pageW / 2 + halfTW, y + 1.4);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ─────────────────────────────────────────────────────
  p(
    `This Memorandum of Understanding (the "Memorandum") is made and entered into on ${u(v.date, "[-------]")}, by and between ${u(v.partnerA, "[------]")}, having its principal office at ${u(v.partnerAOffice, "[------]")} ("Partner A"), and ${u(v.partnerB, "[--------]")}, having its principal office at ${u(v.partnerBOffice, "[------]")} ("Partner B"), collectively referred to as the "Partners," for the purpose of achieving the objectives and goals relating to the ${u(v.project, "[---------]")} (the "Project").`
  );

  // ── RECITALS ─────────────────────────────────────────────────────
  heading("RECITALS");

  p(`WHEREAS, the Partners desire to enter into an understanding pursuant to which they shall collaborate, coordinate, and cooperate in connection with the Project;`);
  p(`AND WHEREAS, the Partners intend through this Memorandum to set forth their working arrangements and mutual expectations in preparation for the negotiation of any future binding agreement regarding the Project;`);
  p(`NOW, THEREFORE, the Partners hereby agree as follows:`);

  // ── 1. PURPOSE ───────────────────────────────────────────────────
  heading("1.  Purpose");

  p(
    `The purpose of this Memorandum is to establish the framework for any future binding agreement between the Partners with respect to the Project, including the allocation of responsibilities, resources, and cooperation mechanisms.`
  );

  // ── 2. OBLIGATIONS ───────────────────────────────────────────────
  heading("2.  Obligations of the Partners");

  p(
    `The Partners acknowledge that this Memorandum does not create a legally binding contract, but each Partner agrees to act in the spirit of collaboration, demonstrating leadership, financial commitment, administrative diligence, and managerial support.`
  );

  subHeading("2.1  Services to be Rendered:");

  bullet(
    `Partner A shall provide the following services: ${u(v.serviceA, "[●]")}`
  );
  bullet(
    `Partner B shall provide the following services: ${u(v.serviceB, "[●]")}`
  );

  // ── 3. COOPERATION ───────────────────────────────────────────────
  heading("3.  Cooperation");

  p(
    `The Partners agree to cooperate fully in the execution of the Project. Activities shall include, but are not limited to, the services described above, collaborative planning, coordination of resources, and participation in all relevant Project meetings and activities.`
  );

  // ── 4. RESOURCES ─────────────────────────────────────────────────
  heading("4.  Resources");

  p(
    `Each Partner shall make commercially reasonable efforts to secure and provide the necessary resources to fulfill their respective commitments.`
  );
  bullet(`Partner A shall provide: ${u(v.resourceA, "[financial, material, labor resources]")}`);
  bullet(`Partner B shall provide: ${u(v.resourceB, "[financial, material, labor resources]")}`);

  // ── 5. COMMUNICATION STRATEGY ────────────────────────────────────
  heading("5.  Communication Strategy");

  p(
    `All communications, marketing, and public relations activities shall be consistent with the objectives of the Project and require the prior express agreement of both Partners. Open, transparent, and coordinated communication with external stakeholders is encouraged, subject to applicable confidentiality protocols.`
  );

  // ── 6. LIABILITY ─────────────────────────────────────────────────
  heading("6.  Liability");

  p(
    `No liability, whether contractual or otherwise, shall arise between the Partners as a result of this Memorandum.`
  );

  // ── 7. DISPUTE RESOLUTION ────────────────────────────────────────
  heading("7.  Dispute Resolution");

  p(
    `In the event of any dispute during the negotiation of a binding agreement relating to the Project:`
  );

  numbered(
    "1",
    `A Dispute Resolution Group shall be convened, comprising the Chief Executives of each Partner and one independent representative mutually appointed.`
  );
  numbered("2", `The group may consider any information deemed relevant to resolve the dispute.`);
  numbered("3", `Decisions made by the Dispute Resolution Group shall be final and binding.`);
  numbered(
    "4",
    `If no resolution is reached, neither Partner shall be obligated to enter into any binding contract.`
  );

  // ── 8. TERM ──────────────────────────────────────────────────────
  heading("8.  Term");

  p(
    `The term of this Memorandum shall commence on ${u(v.termStart, "[●]")} and continue until ${u(v.termEnd, "[●]")}, unless extended by mutual written agreement of all Partners.`
  );

  // ── 9. NOTICE ────────────────────────────────────────────────────
  heading("9.  Notice");

  p(
    `Any notice or communication required or permitted under this Memorandum shall be sufficiently given if delivered in person or by certified mail, return receipt requested, to the addresses set forth above or to such other addresses as may be provided in writing.`
  );

  // ── 10. GOVERNING LAW ────────────────────────────────────────────
  heading("10.  Governing Law");

  p(
    `This Memorandum shall be governed by and construed in accordance with the laws of the State of ${u(v.state, "[●]")}.`
  );

  // ── 11. ADDITIONAL CLAUSES ───────────────────────────────────────
  heading("11.  Additional Clauses");

  bulletBoldLabel("Non-Binding Nature:", "This Memorandum does not create any enforceable legal right, benefit, or fiduciary responsibility.");
  bulletBoldLabel("Effectiveness:", "This Memorandum shall be effective upon signature by both Partners.");
  bulletBoldLabel("Termination:", "Any Partner may terminate its participation by providing written notice to the other Partner.");
  bulletBoldLabel("Assignment:", "Neither Partner may assign or transfer any rights or obligations without prior written consent of the other Partner.");
  bulletBoldLabel("Amendment:", "This Memorandum may only be amended in writing, signed by the Party obligated under such amendment.");
  bulletBoldLabel(
    "Severability:",
    "If any provision is held invalid or unenforceable, the remaining provisions shall remain valid and enforceable. Any provision may be limited to the extent necessary to make it valid and enforceable."
  );
  bulletBoldLabel(
    "Supersession:",
    "This Memorandum constitutes the entire understanding between the Partners and supersedes all prior representations, discussions, negotiations, and memoranda, whether written or oral."
  );

  // ── 12. UNDERSTANDING BETWEEN PARTNERS ──────────────────────────
  heading("12.  Understanding Between Partners");

  bullet("Each Partner shall work collaboratively to advance the Project.");
  bullet(
    "This Memorandum does not restrict the Partners from entering into similar arrangements with other entities."
  );
  bullet(
    "Each Partner shall participate to the fullest extent possible in the development and execution of the Project."
  );

  // ── 13. SIGNATORIES ──────────────────────────────────────────────
  heading("13.  Signatories");

  p(
    `IN WITNESS WHEREOF, the Partners have executed this Memorandum of Understanding as of the date first written above.`,
    false,
    0,
    5
  );

  // Partner A
  checkY(lineH * 7);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("Partner A:", margin, y);
  y += lineH + 2;
  field("Name", u(v.partnerANameSign, ""));
  field("Title", u(v.partnerATitle, ""));
  field("Signature", u(v.partnerASignature, ""));
  field("Date", u(v.partnerADate, ""));

  y += 5;

  // Partner B
  checkY(lineH * 7);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("Partner B:", margin, y);
  y += lineH + 2;
  field("Name", u(v.partnerBNameSign, ""));
  field("Title", u(v.partnerBTitle, ""));
  field("Signature", u(v.partnerBSignature, ""));
  field("Date", u(v.partnerBDate, ""));

  // Optional extra
  if (v.extra?.trim()) {
    y += 4;
    heading("ADDITIONAL NOTES");
    p(v.extra.trim());
  }

  doc.save("mou.pdf");
};

export default function MOU() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum of Understanding (MOU)"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="mou"
    />
  );
}