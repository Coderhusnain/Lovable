import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Service",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
      { name: "totalAmount", label: "Total amount", type: "text", required: true },
      { name: "payee", label: "Payment made to", type: "text", required: true },
      { name: "discountPercent", label: "Early payment discount %", type: "text", required: true },
      { name: "discountDays", label: "Discount within days", type: "text", required: true },
      { name: "hourlyOverageRate", label: "Additional service hourly rate", type: "text", required: true },
      { name: "depositAmount", label: "Deposit amount", type: "text", required: true },
      { name: "depositRefundDays", label: "Deposit refund days", type: "text", required: true },
      { name: "lateInterestRate", label: "Late interest %", type: "text", required: true },
      { name: "cancellationNotice", label: "Cancellation notice hours/days", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
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
  const title = "LIMOUSINE SERVICE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Limousine Service Agreement is made as of ${v.effectiveDate || "__________"} between Client ${v.clientName || "__________"} (${v.clientAddress || "__________"}) and Service Provider ${v.providerName || "__________"} (${v.providerAddress || "__________"}).`);
  p("Provider shall provide chauffeured limousine transportation and related services per agreed date/time/duration/destination.");
  p("Vehicle inspection before and after service; Client responsible for damages/excessive mess/abnormal wear caused by Client/passengers.");
  p(`Payment: total $${v.totalAmount || "__________"} made to ${v.payee || "________________"}.`);
  p(`Discount: ${v.discountPercent || "____"}% if paid within ${v.discountDays || "____"} days. Overage billed at $${v.hourlyOverageRate || "____"}/hour.`);
  p(`Deposit: $${v.depositAmount || "__________"} required and may be applied to damages/cleaning/overtime/violations. Remaining balance refunded within ${v.depositRefundDays || "___"} days with itemized statement.`);
  p(`Late payment interest: ${v.lateInterestRate || "____"}% per annum or legal max; collection costs and attorney fees recoverable.`);
  p(`Cancellation requires ${v.cancellationNotice || "____"} written notice; late cancellations may trigger full payment due.`);
  p("Confidentiality, mutual indemnification, warranty/standard of care, default/remedies, force majeure, arbitration (AAA), notices, waiver, assignment, independent contractor, client safety, smoking/substances policy, entire agreement, severability apply.");
  p(`Governing law: ${v.governingLawState || "________________________"}.`);
  p("SIGNATURES: Client and Service Provider sign name/date lines.");
  doc.save("limousine_service_agreement.pdf");
};

export default function LimousineServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Limousine Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="limousineserviceagreement"
    />
  );
}

