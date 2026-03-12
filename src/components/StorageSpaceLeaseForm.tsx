import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "lessorName", label: "Lessor name", type: "text", required: true },
    { name: "lessorAddress", label: "Lessor address", type: "text", required: true },
    { name: "lesseeName", label: "Lessee name", type: "text", required: true },
    { name: "lesseeAddress", label: "Lessee address", type: "text", required: true },
  ]},
  { label: "Premises and Rent", fields: [
    { name: "premisesAddress", label: "Storage unit address", type: "text", required: true },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "monthlyRent", label: "Monthly rent amount", type: "text", required: true },
    { name: "rentDueDay", label: "Rent due day", type: "text", required: true },
    { name: "securityDeposit", label: "Security deposit", type: "text", required: true },
  ]},
  { label: "Use and Safety", fields: [
    { name: "useClause", label: "Use of premises clause", type: "textarea", required: true },
    { name: "hazardClause", label: "Hazardous/illegal materials clause", type: "textarea", required: true },
  ]},
  { label: "Liability and Maintenance", fields: [
    { name: "securityLiability", label: "Security/liability clause", type: "textarea", required: true },
    { name: "maintenanceClause", label: "Maintenance clause", type: "textarea", required: true },
    { name: "assignmentClause", label: "Assignment/sublease clause", type: "text", required: true },
  ]},
  { label: "Termination and Legal", fields: [
    { name: "terminationDays", label: "Termination notice days", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    { name: "entireAgreementClause", label: "Entire agreement/severability clause", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "lessorSign", label: "Lessor signature", type: "text", required: true },
    { name: "lessorDate", label: "Lessor date", type: "date", required: true },
    { name: "lesseeSign", label: "Lessee signature", type: "text", required: true },
    { name: "lesseeDate", label: "Lessee date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const width = 170;
  const u = (s?: string, n = 22) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "STORAGE SPACE LEASE AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`This Storage Space Lease Agreement is made as of ${u(v.effectiveDate)} by and between ${u(v.lessorName)} of ${u(v.lessorAddress)} ("Lessor"), and ${u(v.lesseeName)} of ${u(v.lesseeAddress)} ("Lessee").`);
  add("1. Premises and Term", true);
  add(`Lessor leases to Lessee the storage unit at ${u(v.premisesAddress)}. Term commences on ${u(v.startDate)} and continues month-to-month unless terminated earlier.`);
  add("2. Rent", true);
  add(`Monthly rent is $${u(v.monthlyRent, 8)}, payable in advance on/before day ${u(v.rentDueDay, 3)} each month. Rent is paid by mail/in person to Lessor or other designated address. Cash payments require written receipt identifying amount, storage unit, and period covered.`);
  add("3. Security Deposit", true);
  add(`Security deposit is $${u(v.securityDeposit, 8)} for faithful performance and damages caused by Lessee or Lessee agents/invitees/representatives.`);
  add("4. Termination", true);
  add(`Either party may terminate with ${u(v.terminationDays, 3)} days written notice.`);
  add("5. Use of Premises", true);
  add(u(v.useClause));
  add("6. Hazardous or Illegal Materials", true);
  add(u(v.hazardClause));
  add("7. Security and Liability", true);
  add(u(v.securityLiability));
  add("8. Maintenance", true);
  add(u(v.maintenanceClause));
  add("9. Assignment and Sublease", true);
  add(u(v.assignmentClause));
  add("10. Governing Law", true);
  add(`This Agreement is governed by laws of the State of ${u(v.governingLawState || v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}.`);
  add("11. Entire Agreement", true);
  add(u(v.entireAgreementClause));
  add("12. Severability", true);
  add("If any provision is invalid/unenforceable, it is modified to extent necessary and remainder remains in full force and effect.");
  add("EXECUTION", true);
  add(`LESSOR Signature: ${u(v.lessorSign)} | Name: ${u(v.lessorName)} | Date: ${u(v.lessorDate)}`);
  add(`LESSEE Signature: ${u(v.lesseeSign)} | Name: ${u(v.lesseeName)} | Date: ${u(v.lesseeDate)}`);

  doc.save("storage_space_lease_agreement.pdf");
};

export default function StorageSpaceLease() {
  return (
    <FormWizard
      steps={steps}
      title="Storage Space Lease Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="storagespacelease"
    />
  );
}

