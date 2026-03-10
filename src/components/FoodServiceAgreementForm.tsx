import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Service Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
      { name: "serviceStartDate", label: "Service start date", type: "date", required: true },
      { name: "serviceLocation", label: "Service location", type: "text", required: true },
      { name: "hourlyRate", label: "Hourly rate", type: "text", required: true },
      { name: "invoiceDueDays", label: "Invoice due days", type: "text", required: true },
      { name: "lateInterestRate", label: "Late interest %", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
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
  const title = "FOOD SERVICE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Food Service Agreement is made as of ${v.effectiveDate || "__________"} between Client ${v.clientName || "__________"} (${v.clientAddress || "__________"}) and Service Provider ${v.providerName || "__________"} (${v.providerAddress || "__________"}).`);
  p("Recitals: Provider supplies food services and Client retains Provider under this Agreement.");
  p(`Services begin ${v.serviceStartDate || "__________"} at location ${v.serviceLocation || "________________________"} and include preparation, handling, and service in compliance with applicable law.`);
  p(`Fees: $${v.hourlyRate || "____"} per hour. Provider submits invoices; Client pays within ${v.invoiceDueDays || "____"} days. Late payments may accrue ${v.lateInterestRate || "____"}% per annum (or legal max).`);
  p(`Term continues until completion unless earlier terminated. Either Party may terminate upon ${v.terminationNoticeDays || "____"} days written notice.`);
  p("Agreement includes severability, amendments, notices, waiver, assignment restrictions, remedies/default cure, force majeure, dispute resolution, entire agreement.");
  p("Indemnification: Provider indemnifies Client for provider acts/omissions, breach, and legal/regulatory violations.");
  p("Warranty/standards: services performed professionally/timely/workmanlike; menus coordinated with Client; sanitation/cleanliness and health rules compliance mandatory.");
  p("Provider responsibilities include insurance, licenses/taxes/permits, workers compensation, health department compliance, return of client equipment, and independent contractor status.");
  p(`Governing law: ${v.governingLawState || "________________________"}.`);
  p("SIGNATURES: Client and Service Provider sign name/date lines.");
  doc.save("food_service_agreement.pdf");
};

export default function FoodServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Food Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="foodserviceagreement"
    />
  );
}

