import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Premises",
    fields: [
      { name: "insertDate", label: "Agreement date", type: "date", required: true },
      { name: "landlordName", label: "Landlord full name", type: "text", required: true },
      { name: "tenantName", label: "Tenant full name", type: "text", required: true },
      { name: "premisesAddress", label: "Premises full address", type: "textarea", required: true },
      { name: "startDate", label: "Lease start date", type: "date", required: true },
      { name: "endDate", label: "Lease end date", type: "date", required: true },
      { name: "rentAmount", label: "Monthly rent amount", type: "text", required: true },
      { name: "dueDay", label: "Rent due day (number)", type: "text", required: true },
      { name: "paymentAddress", label: "Landlord payment address", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "securityDeposit", label: "Security deposit amount", type: "text", required: true },
      { name: "parkingSpaces", label: "Number of parking spaces", type: "text", required: true },
      { name: "storageArea", label: "Storage area description", type: "text", required: true },
      { name: "insuranceAmount", label: "Liability insurance amount", type: "text", required: true },
      { name: "renewalDuration", label: "Renewal duration", type: "text", required: true },
      { name: "renewalNoticeDays", label: "Renewal notice days", type: "text", required: true },
      { name: "renewalRentAmount", label: "Renewal rent amount", type: "text", required: true },
      { name: "lateFeeAmount", label: "Late fee amount", type: "text", required: true },
      { name: "lateFeeDays", label: "Late fee grace days", type: "text", required: true },
      { name: "returnedCheckFee", label: "Returned check fee", type: "text", required: true },
      { name: "saleTerminationDays", label: "Termination upon sale notice days", type: "text", required: true },
      { name: "casualtyThreshold", label: "Casualty threshold amount", type: "text", required: true },
      { name: "financialDefaultDays", label: "Financial default cure days", type: "text", required: true },
      { name: "nonFinancialDefaultDays", label: "Non-financial default cure days", type: "text", required: true },
      { name: "governingState", label: "Governing state", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "landlordSignName", label: "Landlord signatory name", type: "text", required: true },
      { name: "tenantSignName", label: "Tenant signatory name", type: "text", required: true },
      { name: "landlordSignDate", label: "Landlord sign date", type: "date", required: true },
      { name: "tenantSignDate", label: "Tenant sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (v?: string, n = 14) => (v || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const l = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(l, m, y);
    const x = m + doc.getTextWidth(l);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "COMMERCIAL LEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.3);

  p(`This Commercial Lease Agreement ("Lease") is made and entered into as of ${u(values.insertDate)}, by and between ${u(values.landlordName)} ("Landlord") and ${u(values.tenantName)} ("Tenant").`);
  p("1. Leased Premises", true);
  p(`Landlord leases to Tenant the commercial premises located at ${u(values.premisesAddress, 24)} ("Premises"), in consideration of lease payments set forth herein.`);
  p("2. Term", true);
  p(`Term commences on ${u(values.startDate)} and terminates on ${u(values.endDate)} unless earlier terminated under this Lease.`);
  p("3. Rent", true);
  p(`Tenant shall pay monthly rent of $${u(values.rentAmount)} in advance on or before day ${u(values.dueDay, 2)} of each month to ${u(values.paymentAddress)} or other designated address.`);
  p("4. Security Deposit", true);
  p(`Upon execution, Tenant shall deposit $${u(values.securityDeposit)} as security deposit in accordance with applicable law.`);
  p("5. Possession", true);
  p("Tenant receives possession on commencement and shall surrender in good condition, ordinary wear and tear excepted.");
  p("6. Exclusivity", true);
  p("Landlord shall not lease competing business space that directly competes with Tenant's primary business.");
  p("7. Furnishings", true);
  p("Landlord-provided furnishings must be returned in same condition, normal wear excepted.");
  p("8. Parking and Storage", true);
  p(`Tenant may use ${u(values.parkingSpaces, 1)} parking space(s) and storage area described as ${u(values.storageArea)} at Tenant's own risk.`);
  p("9. Insurance", true);
  p(`Parties maintain property insurance; Tenant maintains commercial liability insurance not less than $${u(values.insuranceAmount)} naming Landlord as additional insured.`);
  p("10. Renewal", true);
  p(`Lease renews for successive terms of ${u(values.renewalDuration)} unless either party gives ${u(values.renewalNoticeDays, 2)} days notice. Renewal rent: $${u(values.renewalRentAmount)}.`);
  p("11. Maintenance and Utilities", true);
  p("Landlord maintains premises and utilities/services unless otherwise agreed.");
  p("12. Taxes", true);
  p("Landlord is responsible for real estate taxes and personal property taxes resulting from Tenant use.");
  p("13. Termination Upon Sale", true);
  p(`Landlord may terminate upon ${u(values.saleTerminationDays, 2)} days written notice if premises is sold.`);
  p("14. Casualty and Condemnation", true);
  p(`If damage/condemnation cannot be repaired within 60 days or cost exceeds $${u(values.casualtyThreshold)}, either party may terminate with 20 days notice; rent prorated/refunded.`);
  p("15. Default", true);
  p(`Tenant cure period is ${u(values.financialDefaultDays, 1)} days for financial defaults and ${u(values.nonFinancialDefaultDays, 2)} days for other defaults after written notice.`);
  p("16-26. Other Standard Clauses", true);
  p(`Late fee: $${u(values.lateFeeAmount)} after ${u(values.lateFeeDays, 1)} days; holdover, cumulative rights, returned checks fee $${u(values.returnedCheckFee)}, notices, governing law (${u(values.governingState)}), entire agreement, amendments, severability, waiver, and binding effect apply as drafted.`);
  p("IN WITNESS WHEREOF, the parties have executed this Commercial Lease Agreement.", true);
  uf("Landlord", values.landlordSignName);
  uf("Date", values.landlordSignDate);
  uf("Tenant", values.tenantSignName);
  uf("Date", values.tenantSignDate);

  doc.save("commercial_lease_agreement.pdf");
};

export default function CommercialLease() {
  return (
    <FormWizard
      steps={steps}
      title="Commercial Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="commerciallease"
    />
  );
}
