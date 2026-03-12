import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Dates", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "tenantName", label: "Tenant name", type: "text", required: true },
    { name: "subtenantName", label: "Subtenant name", type: "text", required: true },
    { name: "primeLeaseDate", label: "Prime lease date", type: "date", required: true },
  ]},
  { label: "Premises and Term", fields: [
    { name: "premisesAddress", label: "Premises full address", type: "text", required: true },
    { name: "startDate", label: "Sublease start date", type: "date", required: true },
    { name: "endDate", label: "Sublease end date", type: "date", required: true },
  ]},
  { label: "Payment Terms", fields: [
    { name: "monthlyRent", label: "Monthly sublease rent", type: "text", required: true },
    { name: "totalDue", label: "Total amount due under sublease", type: "text", required: true },
    { name: "paymentInstructions", label: "Payment address/instructions", type: "text", required: true },
    { name: "securityDeposit", label: "Security deposit", type: "text", required: true },
  ]},
  { label: "Legal Clauses", fields: [
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    { name: "disputeResolutionText", label: "Dispute resolution clause", type: "textarea", required: true },
    { name: "landlordConsentText", label: "Landlord consent clause", type: "textarea", required: true },
    { name: "primeLeaseIncorporation", label: "Prime lease incorporation clause", type: "textarea", required: true },
  ]},
  { label: "Inspection Checklist", fields: [
    { name: "inspectionComments", label: "Inspection checklist comments", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "tenantSignName", label: "Tenant print name", type: "text", required: true },
    { name: "tenantSignature", label: "Tenant signature", type: "text", required: true },
    { name: "tenantDate", label: "Tenant date", type: "date", required: true },
    { name: "subtenantSignName", label: "Subtenant print name", type: "text", required: true },
    { name: "subtenantSignature", label: "Subtenant signature", type: "text", required: true },
    { name: "subtenantDate", label: "Subtenant date", type: "date", required: true },
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
  const title = "SUBLEASE AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`This Sublease Agreement (the "Sublease") is made and entered into effective as of ${u(v.effectiveDate)} by and between ${u(v.tenantName)} (the "Tenant") and ${u(v.subtenantName)} (the "Subtenant").`);
  add(`This Sublease is subject to the terms and conditions of the Prime Lease dated ${u(v.primeLeaseDate)}.`);
  add("WHEREAS, Tenant desires to sublease the premises to Subtenant and Subtenant desires to accept the sublease.");
  add("NOW, THEREFORE, the parties agree as follows:");
  add("1. PREMISES", true);
  add(`Tenant subleases to Subtenant the real property located at ${u(v.premisesAddress)} (the "Premises").`);
  add("2. TERM AND POSSESSION", true);
  add(`Sublease commences on ${u(v.startDate)} and continues until ${u(v.endDate)} unless sooner terminated. Subtenant is not responsible for securing replacement tenant upon expiration/termination.`);
  add("3. SUBLEASE PAYMENTS", true);
  add(`Monthly sublease rent: $${u(v.monthlyRent, 8)}, payable in advance on or before first day of each month. Total due under sublease: $${u(v.totalDue, 8)}. Payment instructions: ${u(v.paymentInstructions)}.`);
  add("4. SECURITY DEPOSIT", true);
  add(`Security deposit of $${u(v.securityDeposit, 8)} shall be held in trust and applied according to law for damages/breach.`);
  add("5. GOVERNING LAW", true);
  add(`This Sublease is governed by laws of the State of ${u(v.governingLawState || v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}.`);
  add("6. DISPUTE RESOLUTION", true);
  add(u(v.disputeResolutionText));
  add("7. LANDLORD'S CONSENT", true);
  add(u(v.landlordConsentText));
  add("8. INCORPORATION OF PRIME LEASE", true);
  add(u(v.primeLeaseIncorporation));
  add("9. INSPECTION CHECKLIST", true);
  add("The Subtenant acknowledges inspection of the Premises and confirms condition, except as noted below.");
  add("Areas: Bathrooms, Carpeting, Ceilings, Closets, Dishwasher, Disposal, Doors, Fireplace, Lights, Locks, Refrigerator, Screens, Stove.");
  add(`Comments: ${u(v.inspectionComments)}`);
  add("EXECUTION", true);
  add(`TENANT Name: ${u(v.tenantSignName)} | Signature: ${u(v.tenantSignature)} | Date: ${u(v.tenantDate)}`);
  add(`SUBTENANT Name: ${u(v.subtenantSignName)} | Signature: ${u(v.subtenantSignature)} | Date: ${u(v.subtenantDate)}`);

  doc.save("sublease_agreement.pdf");
};

export default function SubleaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Sublease Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="sublease"
    />
  );
}

