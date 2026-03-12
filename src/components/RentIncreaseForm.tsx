import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Agreement Date",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
    ],
  },
  {
    label: "Step 2: Landlord Details",
    fields: [
      { name: "landlordName", label: "Landlord Full Legal Name", type: "text", required: true },
      { name: "landlordAddress", label: "Landlord Address", type: "textarea", required: true },
      { name: "landlordEmail", label: "Landlord Email", type: "email", required: false },
      { name: "landlordPhone", label: "Landlord Phone", type: "text", required: false },
    ],
  },
  {
    label: "Step 3: Tenant and Premises",
    fields: [
      { name: "tenantName", label: "Tenant Full Legal Name", type: "text", required: true },
      { name: "premisesAddress", label: "Premises Address", type: "textarea", required: true },
      { name: "leaseDate", label: "Original Lease Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 4: Rent Terms",
    fields: [
      { name: "currentRent", label: "Current Monthly Rent", type: "text", required: true },
      { name: "newRent", label: "New Monthly Rent", type: "text", required: true },
      { name: "effectiveDate", label: "Rent Increase Effective Date", type: "date", required: true },
      { name: "dueDay", label: "Rent Due Day of Month", type: "text", required: true },
    ],
  },
  {
    label: "Step 5: Governing Law",
    fields: [{ name: "governingState", label: "Governing State", type: "text", required: true }],
  },
  {
    label: "Step 6: Signatures",
    fields: [
      { name: "landlordSign", label: "Landlord Signature Name", type: "text", required: true },
      { name: "landlordSignDate", label: "Landlord Signature Date", type: "date", required: true },
      { name: "tenantSign1", label: "Tenant Signature Name", type: "text", required: true },
      { name: "tenantSign1Date", label: "Tenant Signature Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Additional Tenant (Optional)",
    fields: [
      { name: "tenantSign2", label: "Second Tenant Signature Name", type: "text", required: false },
      { name: "tenantSign2Date", label: "Second Tenant Signature Date", type: "date", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.2;
  let y = 18;
  const u = (val?: string, n = 12) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "RENT INCREASE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  p(
    `This Rent Increase Agreement ("Agreement") is entered into and made effective as of the ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Landlord ${u(v.landlordName)} at ${u(v.landlordAddress)}${v.landlordEmail ? `, Email: ${v.landlordEmail}` : ""}${v.landlordPhone ? `, Phone: ${v.landlordPhone}` : ""} and Tenant ${u(v.tenantName)} for premises at ${u(v.premisesAddress)}.`
  );
  p("RECITALS", true);
  p(`WHEREAS, Parties entered into a Lease dated ${u(v.leaseDate, 10)} regarding the premises; WHEREAS Tenant currently pays monthly rent of $${u(v.currentRent, 4)} due on or before day ${u(v.dueDay, 1)}; and WHEREAS Landlord wishes to increase rent and Tenant agrees under the terms below.`);
  p("1. RENT INCREASE", true);
  p(`Effective ${u(v.effectiveDate, 10)}, monthly rent due from Tenant to Landlord is increased to $${u(v.newRent, 4)} per month.`);
  p("2. PAYMENT TERMS", true);
  p(`Increased rent is payable in advance on or before day ${u(v.dueDay, 1)} of each calendar month, in accordance with original Lease terms.`);
  p("3. NO OTHER MODIFICATIONS", true);
  p("Except as expressly amended in this Agreement, all other Lease terms, covenants, and conditions remain in full force and effect and are ratified by the Parties.");
  p("4. BINDING EFFECT", true);
  p("This Agreement binds and inures to the benefit of the Parties and their heirs, legal representatives, successors, and permitted assigns.");
  p("5. ENTIRE AGREEMENT", true);
  p("This Agreement is the entire understanding regarding rent increase and supersedes prior negotiations/discussions on this subject.");
  p("6. GOVERNING LAW", true);
  p(`This Agreement is governed by and construed in accordance with the laws of the State of ${u(v.governingState)}.`);
  p("IN WITNESS WHEREOF", true);
  p(`LANDLORD: Signature ${u(v.landlordSign)}   Date: ${u(v.landlordSignDate, 10)}`);
  p(`TENANT(S): Signature ${u(v.tenantSign1)}   Date: ${u(v.tenantSign1Date, 10)}`);
  if ((v.tenantSign2 || "").trim()) {
    p(`TENANT(S): Signature ${u(v.tenantSign2)}   Date: ${u(v.tenantSign2Date, 10)}`);
  }

  doc.save("rent_increase_agreement.pdf");
};

export default function RentIncreaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Rent Increase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="rentincrease"
      preserveStepLayout
    />
  );
}
