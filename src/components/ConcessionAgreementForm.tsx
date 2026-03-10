import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Core Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "concessionaireName", label: "Concessionaire name", type: "text", required: true },
      { name: "concessionaireAddress", label: "Concessionaire address", type: "text", required: true },
      { name: "hoursFrom", label: "Hours of operation from", type: "text", required: true },
      { name: "hoursTo", label: "Hours of operation to", type: "text", required: true },
      { name: "installDays", label: "Install within days", type: "text", required: true },
      { name: "removeDays", label: "Removal/restore days", type: "text", required: true },
      { name: "termYears", label: "Term years", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "ownerRevenuePercent", label: "Owner revenue %", type: "text", required: true },
      { name: "lateFee", label: "Late fee amount", type: "text", required: true },
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
  const title = "CONCESSION AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Concession Agreement is entered into as of ${v.effectiveDate || "__________"} between Owner ${v.ownerName || "__________"} (${v.ownerAddress || "__________"}) and Concessionaire ${v.concessionaireName || "__________"} (${v.concessionaireAddress || "__________"}).`);
  p("Employee training, staffing, operating hours, pricing approvals, approved products/services, delivery/installation, alterations, temporary equipment removal, maintenance/cleanliness, and damage responsibilities apply.");
  p(`Concession stands operate from ${v.hoursFrom || "________"} to ${v.hoursTo || "________"} each day facility is open.`);
  p(`Concession equipment installed within ${v.installDays || "____"} days; temporary removal restoration within ${v.removeDays || "____"} days.`);
  p(`Term: ${v.termYears || "____"} years; either party may terminate upon ${v.terminationNoticeDays || "____"} days written notice.`);
  p(`Compensation to Owner: ${v.ownerRevenuePercent || "____"}% of gross monthly revenue; payment due first day each month.`);
  p(`Late payments incur late fee of $${v.lateFee || "________"}.`);
  p("Access to records, registers, taxes, compliance, warranties, independent contractor status, mutual indemnities, survival, confidentiality, insurance, non-exclusivity, signage approvals, entire agreement, assignment, successors, severability, amendments, waiver, notices, time-of-essence, authority, and dispute-resolution terms apply.");
  p(`Governing law: ${v.governingLaw || "________________________"}.`);
  p("SIGNATURES", true);
  p("CONCESSIONAIRE: Name/Signature/Date lines");
  p("OWNER: Name/Signature/Date lines");
  doc.save("concession_agreement.pdf");
};

export default function ConcessionAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Concession Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="concessionagreement"
    />
  );
}

