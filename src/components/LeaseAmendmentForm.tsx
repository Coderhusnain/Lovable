import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "county", label: "County", type: "text", required: true },
    { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
  ]},
  { label: "Parties and Background", fields: [
    { name: "amendmentDate", label: "Amendment date", type: "date", required: true },
    { name: "landlordName", label: "Landlord full name", type: "text", required: true },
    { name: "tenantName", label: "Tenant full name", type: "text", required: true },
    { name: "originalLeaseDate", label: "Original lease date", type: "date", required: true },
  ]},
  { label: "Property", fields: [
    { name: "propertyAddress", label: "Property street address", type: "text", required: true },
    { name: "propertyCountyState", label: "Property county and state", type: "text", required: true },
  ]},
  { label: "Amendments", fields: [
    { name: "specificAmendments", label: "Specific amendment(s)", type: "textarea", required: true },
    { name: "conflictClauseText", label: "Conflict clause wording", type: "text", required: true },
  ]},
  { label: "Unchanged and Binding Terms", fields: [
    { name: "confirmationText", label: "Lease confirmation wording", type: "text", required: true },
    { name: "remainingProvisionsText", label: "Remaining provisions text", type: "text", required: true },
    { name: "bindingEffectText", label: "Binding effect wording", type: "text", required: true },
  ]},
  { label: "Recordation", fields: [
    { name: "recordationCountyState", label: "Recordation county and state", type: "text", required: false },
    { name: "recordationText", label: "Recordation clause wording", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "landlordSignature", label: "Landlord signature name", type: "text", required: true },
    { name: "landlordDate", label: "Landlord date", type: "date", required: true },
    { name: "tenantSignature", label: "Tenant signature name", type: "text", required: true },
    { name: "tenantDate", label: "Tenant date", type: "date", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const right = 190;
  const h = 280;
  const u = (v?: string, l = 24) => (v && String(v).trim() ? String(v).trim() : "_".repeat(l));
  const ensure = (n = 10) => {
    if (y + n > h) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, right - left);
    ensure(lines.length * 6 + 2);
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "LEASE AMENDMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;

  doc.setFontSize(12);
  p(`This Lease Amendment is made and entered into on ${u(values.amendmentDate)} by and between ${u(values.landlordName)} ("Landlord") and ${u(values.tenantName)} ("Tenant").`);
  p("Background", true);
  p(`The Parties previously entered into a Lease Agreement dated ${u(values.originalLeaseDate)} for the property located at ${u(values.propertyAddress)}, ${u(values.propertyCountyState)}.`);
  p("1. Confirmation of Existing Lease", true);
  p(u(values.confirmationText));
  p("2. Amendments", true);
  p(u(values.specificAmendments));
  p("3. Remaining Provisions Unaffected", true);
  p(u(values.remainingProvisionsText));
  p("4. Recordation (Optional)", true);
  p(`${u(values.recordationText)} ${values.recordationCountyState ? `Register's Office of ${values.recordationCountyState}.` : ""}`);
  p("5. Conflict", true);
  p(u(values.conflictClauseText));
  p("6. Binding Effect", true);
  p(u(values.bindingEffectText));
  y += 6;
  p(`LANDLORD Signature: ${u(values.landlordSignature)}    Date: ${u(values.landlordDate)}`);
  p(`TENANT Signature: ${u(values.tenantSignature)}    Date: ${u(values.tenantDate)}`);
  doc.save("lease_amendment.pdf");
};

export default function LeaseAmendment() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Amendment"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="leaseamendment"
    />
  );
}
