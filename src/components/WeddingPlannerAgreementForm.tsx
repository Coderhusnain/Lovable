import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Wedding Planner Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "plannerName", label: "Wedding planner name", type: "text", required: true },
      { name: "plannerAddress", label: "Wedding planner address", type: "text", required: true },
      { name: "coupleNames", label: "Wedding couple name(s)", type: "text", required: true },
      { name: "coupleAddress", label: "Wedding couple address", type: "text", required: true },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "cityState", label: "City/State", type: "text", required: true },
      { name: "eventDate", label: "Event date", type: "date", required: true },
      { name: "serviceFee", label: "Total service fee", type: "text", required: true },
      { name: "depositAmount", label: "Deposit amount", type: "text", required: true },
      { name: "balanceDueDays", label: "Balance due days before event", type: "text", required: true },
      { name: "lateFeeRate", label: "Late fee % per month", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "expenseReimbursementDays", label: "Expense reimbursement days", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "WEDDING PLANNER AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Wedding Planner Agreement is made as of ${v.effectiveDate || "__________"} between Wedding Planner ${v.plannerName || "________________"} (${v.plannerAddress || "________________"}) and Wedding Couple ${v.coupleNames || "________________"} (${v.coupleAddress || "________________"}).`);
  p(`Event details: venue ${v.venue || "________________"}, ${v.cityState || "________________"}, on ${v.eventDate || "__________"}.`);
  p("1. Purpose and Scope", true);
  p("Planner provides professional planning/coordination, timeline/logistics, vendor coordination, ceremony/reception support, and on-site day-of supervision. Exclusions apply unless agreed in writing.");
  p("2-5. Performance / Termination / Force Majeure", true);
  p(`Either party may terminate with written notice; planner may terminate for nonpayment/breach/unreasonable conduct. Termination effects and force majeure suspensions/termination rights apply.`);
  p("6-10. Independent Contractor / Limitation of Liability / Indemnification / Confidentiality / Intellectual Property", true);
  p("Planner is independent contractor; liability capped at fees paid; client indemnifies planner for guest/vendor/venue related claims; planning materials remain planner IP unless agreed otherwise.");
  p("11. Payment Terms", true);
  p(`Total fee $${v.serviceFee || "__________"}; non-refundable deposit $${v.depositAmount || "__________"} due on signing; remaining balance due ${v.balanceDueDays || "___"} days before event; late fee ${v.lateFeeRate || "___"}% per month.`);
  p("12. Expense Reimbursement", true);
  p(`Pre-approved expenses reimbursed within ${v.expenseReimbursementDays || "___"} days of documentation.`);
  p("13-19. Non-assignment / Dispute resolution (AAA arbitration) / Governing law / Severability / Amendments / Entire agreement / Signatures.");
  p(`15. Governing law: ${v.governingLawState || "__________________"}.`);
  p("Signature lines: both wedding couple parties and wedding planner.");
  doc.save("wedding_planner_agreement.pdf");
};

export default function WeddingPlannerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Wedding Planner Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="weddingplanneragreement"
    />
  );
}

