import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Entities and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "dissolvingEntity", label: "Dissolving entity", type: "text", required: true },
      { name: "dissolvingType", label: "Dissolving entity type", type: "text", required: false },
      { name: "dissolvingState", label: "Dissolving entity state/country", type: "text", required: false },
      { name: "survivingEntity", label: "Surviving entity", type: "text", required: true },
      { name: "survivingType", label: "Surviving entity type", type: "text", required: false },
      { name: "survivingState", label: "Surviving entity state/country", type: "text", required: false },
      { name: "survivingNameAfterMerger", label: "Name after merger", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
    ],
  },
  {
    label: "Valuation and Board",
    fields: [
      { name: "tangibleIntangibleValue", label: "Tangible/intangible assets value", type: "text", required: false },
      { name: "receivablesValue", label: "Unrealized receivables", type: "text", required: false },
      { name: "inventoryValue", label: "Inventory value", type: "text", required: false },
      { name: "liabilitiesValue", label: "Estimated liabilities", type: "text", required: false },
      { name: "conversionPercent", label: "Conversion percentage interests", type: "text", required: false },
      { name: "boardCount", label: "Initial board director count", type: "text", required: false },
      { name: "dissolvingNomineeCount", label: "Dissolving nominee director count", type: "text", required: false },
      { name: "dissolvingSignerDate", label: "Dissolving entity sign date", type: "date", required: false },
      { name: "survivingSignerDate", label: "Surviving entity sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = 210;
  const margin = 16;
  const textW = pageW - margin * 2;
  const lineH = 5.8;
  const pageLimit = 275;
  let y = 20;

  const u = (v?: string, min = 14) => (v || "").trim() || "_".repeat(min);

  // Ensure there's enough room; add a new page if not
  const checkY = (needed = lineH * 2) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 20;
    }
  };

  // Render a paragraph with optional bold and gap after
  const p = (text: string, bold = false, gapAfter = 2.5) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin, y);
    y += lines.length * lineH + gapAfter;
  };

  // Render a section heading: e.g. "I. Merger"
  const heading = (text: string) => {
    checkY(lineH + 5);
    y += 2; // extra space before heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Render a numbered sub-heading with bold title then body text on next line
  const sub = (num: string, title: string, body: string) => {
    checkY(lineH * 3);
    // Number + bold title on one line
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const titleLine = `${num}  ${title}`;
    doc.text(titleLine, margin, y);
    y += lineH + 1;
    // Body text normal
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(body, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin + 4, y);
    y += lines.length * lineH + 3;
  };

  // Render a bullet item (indented)
  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = margin + 6;
    const bulletW = textW - 6;
    const lines = doc.splitTextToSize(text, bulletW);
    checkY(lines.length * lineH + 2);
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, indent, y);
    y += lines.length * lineH + 2;
  };

  // Render a sub-bullet (deeper indent)
  const subBullet = (label: string, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = margin + 10;
    const bulletW = textW - 10;
    const lines = doc.splitTextToSize(`${label} ${text}`, bulletW);
    checkY(lines.length * lineH + 2);
    doc.text("\u2013", margin + 6, y);
    doc.text(lines, indent, y);
    y += lines.length * lineH + 2;
  };

  // Signature line helper
  const sigLine = (label: string, value: string) => {
    checkY(lineH + 4);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}: `, margin, y);
    const labelW = doc.getTextWidth(`${label}: `);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + labelW, y);
      doc.line(margin + labelW, y + 1.2, margin + labelW + Math.max(40, doc.getTextWidth(val) + 2), y + 1.2);
    } else {
      doc.line(margin + labelW, y + 1.2, margin + labelW + 60, y + 1.2);
    }
    y += lineH + 3;
  };

  // ─── TITLE ───────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "MERGER AGREEMENT";
  const titleX = pageW / 2;
  doc.text(title, titleX, y, { align: "center" });
  const halfW = doc.getTextWidth(title) / 2;
  doc.line(titleX - halfW, y + 1.3, titleX + halfW, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ─── PREAMBLE ─────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Preamble and Recitals", margin, y);
  y += lineH + 3;
  doc.setFontSize(10.5);

  p(
    `This Merger Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} ("Effective Date"), by and between:`
  );

  // Numbered preamble parties
  checkY(lineH * 3);
  doc.setFont("helvetica", "bold");
  doc.text("1.  Dissolving Entity:", margin + 4, y);
  doc.setFont("helvetica", "normal");
  const deLabel = doc.getTextWidth("1.  Dissolving Entity: ");
  doc.text(
    `${u(values.dissolvingEntity, 12)} (the "Dissolving Entity"), a ${u(values.dissolvingType, 10)} duly organized, validly existing, and in good standing under the laws of ${u(values.dissolvingState, 10)}; and`,
    margin + 4 + deLabel,
    y
  );
  y += lineH + 2;

  checkY(lineH * 3);
  doc.setFont("helvetica", "bold");
  doc.text("2.  Surviving Entity:", margin + 4, y);
  doc.setFont("helvetica", "normal");
  const seLabel = doc.getTextWidth("2.  Surviving Entity: ");
  // Wrap surviving entity line
  const seText = `${u(values.survivingEntity, 12)} (the "Surviving Entity"), a ${u(values.survivingType, 10)} duly organized, validly existing, and in good standing under the laws of ${u(values.survivingState, 10)}.`;
  const seLines = doc.splitTextToSize(seText, textW - 4 - seLabel);
  checkY(seLines.length * lineH + 3);
  doc.text(seLines, margin + 4 + seLabel, y);
  y += seLines.length * lineH + 4;

  p(
    `WHEREAS, the parties desire that, upon the terms and conditions set forth herein, the Dissolving Entity shall be merged into the Surviving Entity, with the Surviving Entity continuing as the surviving entity under the name ${u(values.survivingNameAfterMerger, 12)} following the merger; and`
  );
  p(
    `WHEREAS, the parties intend that the merger shall be effected in accordance with the applicable laws of ${u(values.governingLaw, 12)};`
  );
  p(
    `NOW, THEREFORE, in consideration of the mutual covenants, representations, warranties, and agreements contained herein, the parties agree as follows:`
  );

  // ─── SECTION I ───────────────────────────────────────────
  heading("I.  Merger");

  sub(
    "1.",
    "Effective Date of Merger",
    `The merger shall become effective upon the filing of the certificate of merger with the appropriate governmental authorities in accordance with the laws of ${u(values.governingLaw, 12)} (the "Effective Date").`
  );

  sub(
    "2.",
    "Surviving Business Entity",
    `Subject to the terms and conditions of this Agreement, the Dissolving Entity shall be merged with and into the Surviving Entity. Upon completion of the merger, the separate corporate existence of the Dissolving Entity shall cease, and the Surviving Entity shall continue as the surviving entity, retaining all rights, assets, and liabilities of the Dissolving Entity as provided by law.`
  );

  // ─── SECTION II ──────────────────────────────────────────
  heading("II.  Terms and Conditions");

  sub(
    "1.",
    "Further Assignments and Assurances",
    `The managers, officers, or authorized representatives of the Dissolving Entity shall execute and deliver all deeds, assignments, confirmations, and assurances as may be reasonably requested by the Surviving Entity to vest, perfect, and confirm title to all assets, property, and rights of the Dissolving Entity in the Surviving Entity.`
  );

  // ─── SECTION III ─────────────────────────────────────────
  heading("III.  Valuation of Assets");

  // Sub 1 with bullets
  checkY(lineH * 2);
  doc.setFont("helvetica", "bold");
  doc.text("1.  Assets of the Dissolving Entity", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  const assetIntro = doc.splitTextToSize(
    "The parties agree to the valuation of the assets of the Dissolving Entity as follows:",
    textW
  );
  checkY(assetIntro.length * lineH + 2);
  doc.text(assetIntro, margin + 4, y);
  y += assetIntro.length * lineH + 2;

  bullet(`Tangible and intangible assets, including goodwill: $${u(values.tangibleIntangibleValue, 8)}`);
  bullet(`Unrealized receivables: $${u(values.receivablesValue, 8)}`);
  bullet(`Inventory: $${u(values.inventoryValue, 8)}`);
  bullet(`Estimated liabilities: $${u(values.liabilitiesValue, 8)}`);
  y += 1;

  checkY(lineH * 2);
  doc.setFont("helvetica", "bold");
  doc.text("2.  Conversion of Interests", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");

  subBullet(
    "(a)",
    `At the Effective Date of the merger, each interest in the Dissolving Entity shall be converted into ${u(values.conversionPercent, 8)} percent interest(s) of ${u(values.survivingEntity, 12)}.`
  );
  subBullet(
    "(b)",
    `No fractional interests of the Surviving Entity shall be issued. Any fractional interests otherwise payable shall be settled in cash equal to the fair market value of such fraction.`
  );
  y += 1;

  // ─── SECTION IV ──────────────────────────────────────────
  heading("IV.  Management of Surviving Entity");

  sub(
    "1.",
    "Management and Control",
    `The partners, managers, or directors of the Surviving Entity shall have exclusive control over the business operations of the Surviving Entity, subject to any limitations set forth in its governing documents.`
  );

  sub(
    "2.",
    "Board of Directors and Officers",
    `The initial board of directors of the Surviving Entity shall consist of ${u(values.boardCount, 3)} directors. The Dissolving Entity shall be entitled to nominate ${u(values.dissolvingNomineeCount, 3)} director(s) to serve on the board.`
  );

  // ─── SECTION V ───────────────────────────────────────────
  heading("V.  Interpretation and Enforcement");

  sub(
    "1.",
    "Notices",
    `All notices, demands, or communications required or permitted under this Agreement shall be in writing and delivered personally, by certified mail (return receipt requested), or by facsimile transmission to the respective parties at their addresses set forth herein or as otherwise designated in writing.`
  );

  sub(
    "2.",
    "Execution in Counterparts",
    `This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.`
  );

  // ─── SECTION VI ──────────────────────────────────────────
  heading("VI.  General Provisions");

  sub(
    "1.",
    "Severability",
    `If any provision of this Agreement is determined to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such determination shall not affect the validity, legality, or enforceability of the remaining provisions of this Agreement.`
  );

  sub(
    "2.",
    "Mutual Indemnification",
    `Each party agrees to indemnify, defend, and hold harmless the other party, including its officers, directors, agents, affiliates, and successors, from and against any and all claims, demands, liabilities, losses, costs, and expenses, including reasonable attorneys' fees, arising from or related to any material breach of a representation, warranty, covenant, or obligation under this Agreement.`
  );

  sub(
    "3.",
    "Applicable Law",
    `This Agreement shall be governed by, construed, and enforced in accordance with the laws of ${u(values.governingLaw, 12)}, without regard to its conflicts of law principles.`
  );

  // ─── SECTION VII ─────────────────────────────────────────
  heading("VII.  Signatories");

  p(
    `This Agreement shall be executed by the duly authorized representatives of the parties. By their signatures below, each party acknowledges that they have read, understood, and agreed to be bound by all terms and conditions of this Agreement.`
  );

  y += 3;

  // Dissolving Entity signature block
  checkY(lineH * 6);
  doc.setFont("helvetica", "bold");
  doc.text("Dissolving Entity:", margin, y);
  y += lineH + 2;

  sigLine("Name", values.dissolvingEntity);
  checkY(lineH + 4);
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ", margin, y);
  doc.line(margin + doc.getTextWidth("Signature: "), y + 1.2, margin + 80, y + 1.2);
  y += lineH + 3;
  sigLine("Date", values.dissolvingSignerDate);

  y += 6;

  // Surviving Entity signature block
  checkY(lineH * 6);
  doc.setFont("helvetica", "bold");
  doc.text("Surviving Entity:", margin, y);
  y += lineH + 2;

  sigLine("Name", values.survivingEntity);
  checkY(lineH + 4);
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ", margin, y);
  doc.line(margin + doc.getTextWidth("Signature: "), y + 1.2, margin + 80, y + 1.2);
  y += lineH + 3;
  sigLine("Date", values.survivingSignerDate);

  doc.save("merger_agreement.pdf");
};

export default function MergerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Merger Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mergeragreement"
    />
  );
}