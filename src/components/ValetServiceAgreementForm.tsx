import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Valet Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
      { name: "totalAmount", label: "Total service amount", type: "text", required: true },
      { name: "hourlyRate", label: "Additional hourly rate", type: "text", required: true },
      { name: "lateInterest", label: "Late interest %", type: "text", required: true },
      { name: "depositAmount", label: "Deposit amount", type: "text", required: true },
      { name: "refundDays", label: "Deposit refund days", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "VALET SERVICE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Valet Service Agreement is made as of ${v.effectiveDate || "__________"} by and between Client ${v.clientName || "__________"} (${v.clientAddress || "__________"}) and Service Provider ${v.providerName || "__________"} (${v.providerAddress || "__________"}).`);
  p("1-3. Purpose, Description, and Performance of Services", true);
  p("Provider supplies professional valet services for automobiles/motorcycles including intake/parking/return, traffic flow, signage, and trained staff.");
  p("Pre/post inspections apply; client responsible for damage/loss from client guests/invitees.");
  p("4-6. Payment, Deposit, and Term", true);
  p(`Total payment: $${v.totalAmount || "__________"}; overtime/special requests: $${v.hourlyRate || "____"}/hour; late payments accrue ${v.lateInterest || "____"}% per annum (or legal max).`);
  p(`Deposit: $${v.depositAmount || "__________"}; applied to damages/cleaning/overtime/costs; unused portion refunded within ${v.refundDays || "___"} days.`);
  p("7-13. Termination / Independent Contractor / Compliance / Parking Conditions / Indemnification / Warranty / Default", true);
  p(`Either party may terminate with ${v.terminationNoticeDays || "___"} days written notice; default cure period ${v.cureDays || "___"} days.`);
  p("14-24. Remedies / Force Majeure / Arbitration (AAA) / Entire Agreement / Severability / Amendments / Notices / Waiver / Assignment / Change Orders.");
  p(`17. Governing Law: ${v.governingLawState || "__________________"}.`);
  p("25. Signatures: Client and Service Provider name/signature/date lines.");
  doc.save("valet_service_agreement.pdf");
};

export default function ValetServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Valet Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="valetserviceagreement"
    />
  );
}

