import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Picture",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "companyName", label: "Company name", type: "text", required: true },
      { name: "companyAddress", label: "Company address", type: "text", required: true },
      { name: "composerName", label: "Composer name", type: "text", required: true },
      { name: "composerAddress", label: "Composer address", type: "text", required: true },
      { name: "pictureTitle", label: "Motion picture title", type: "text", required: true },
      { name: "termEndDate", label: "Term end date", type: "date", required: true },
      { name: "deliveryDate", label: "Composition delivery date", type: "date", required: true },
      { name: "fixedFee", label: "Fixed fee", type: "text", required: true },
      { name: "royaltyPercent", label: "Royalty percent", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "COMPOSER AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Composer Agreement is made as of ${v.effectiveDate || "__________"} by and between Company ${v.companyName || "__________"} (${v.companyAddress || "__________"}) and Composer ${v.composerName || "__________"} (${v.composerAddress || "__________"}).`);
  p(`Engagement: Composer composes/arranges/records/delivers original compositions for motion picture "${v.pictureTitle || "________________________"}".`);
  p(`Term runs through ${v.termEndDate || "__________"}. Services include sessions, revisions, clearances, and compliance with Company instructions.`);
  p(`Compensation: Fixed fee $${v.fixedFee || "__________"} as full consideration. Royalties: ${v.royaltyPercent || "____"}% of net U.S. soundtrack sales, subject to recoupment and contract accounting terms.`);
  p("Ownership and Rights", true);
  p("Compositions and recordings are works made for hire for Company; to extent not work-for-hire, Composer assigns all worldwide rights in perpetuity.");
  p("Company may use Composer name/likeness/voice/biographical material for publicity and promotion.");
  p("Credit, warranties, indemnification, moral-rights waiver, expenses, incapacity/death, no obligation to use, termination, force majeure, dispute resolution, attorneys' fees, assignment, amendments, severability, entire agreement, counterparts, and independent contractor terms apply per agreement.");
  p(`Governing law: ${v.governingLaw || "________________________"}.`);
  p("SIGNATURES", true);
  uf("COMPANY - Name", v.companyName);
  uf("Signature", "");
  uf("Date", v.effectiveDate);
  y += 1.2;
  uf("COMPOSER - Name", v.composerName);
  uf("Signature", "");
  uf("Date", v.effectiveDate);
  doc.save("composer_agreement.pdf");
};

export default function ComposerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Composer Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="composeragreement"
    />
  );
}

