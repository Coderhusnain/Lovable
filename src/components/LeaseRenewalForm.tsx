import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "landlordName", label: "Landlord full name", type: "text", required: true },
    { name: "landlordAddress", label: "Landlord address", type: "text", required: true },
    { name: "tenantName", label: "Tenant full name", type: "text", required: true },
  ]},
  { label: "Leased Property", fields: [
    { name: "premisesAddress", label: "Premises address", type: "text", required: true },
    { name: "originalLeaseDate", label: "Original lease date", type: "date", required: true },
    { name: "expirationDate", label: "Original lease expiration date", type: "date", required: true },
  ]},
  { label: "Renewal Terms", fields: [
    { name: "renewalMonths", label: "Renewal term (months)", type: "text", required: true },
    { name: "startDate", label: "Renewal start date", type: "date", required: true },
    { name: "endDate", label: "Renewal end date", type: "date", required: true },
  ]},
  { label: "Rent Terms", fields: [
    { name: "monthlyRent", label: "Monthly rent amount", type: "text", required: true },
    { name: "dueDay", label: "Due day of each month", type: "text", required: true },
  ]},
  { label: "Continuing Terms", fields: [
    { name: "continuedEffectText", label: "Continued effect wording", type: "text", required: true },
    { name: "entireAgreementText", label: "Entire agreement wording", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "landlordSignature", label: "Landlord signature name", type: "text", required: true },
    { name: "landlordSignDate", label: "Landlord signature date", type: "date", required: true },
    { name: "tenantSignature", label: "Tenant signature name", type: "text", required: true },
    { name: "tenantSignDate", label: "Tenant signature date", type: "date", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const right = 190;
  let y = 20;
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
  const title = "LEASE RENEWAL AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`This Lease Renewal Agreement is made and entered into as of ${u(values.effectiveDate)} by and between ${u(values.landlordName)}, residing at ${u(values.landlordAddress)} ("Landlord"), and ${u(values.tenantName)} ("Tenant").`);
  y += 2;
  p("1. Leased Property", true);
  p(`The Landlord hereby leases to the Tenant the residential property located at ${u(values.premisesAddress)} (the "Premises").`);
  p("2. Original Lease", true);
  p(`The parties previously entered into a lease agreement dated ${u(values.originalLeaseDate)} for the Premises, set to expire on ${u(values.expirationDate)}.`);
  p("3. Renewal and Modification", true);
  p(`a. Renewal Term: The lease is extended for ${u(values.renewalMonths)} month(s), beginning on ${u(values.startDate)} and ending on ${u(values.endDate)}.`);
  p(`b. Rent: Monthly rent during the Renewal Term shall be $${u(values.monthlyRent, 8)}, payable in advance on or before day ${u(values.dueDay, 3)} of each calendar month.`);
  p("4. Continued Effect of Original Lease", true);
  p(u(values.continuedEffectText));
  p("5. Entire Agreement", true);
  p(u(values.entireAgreementText));
  p("6. Execution", true);
  p("This Renewal Agreement may be executed in counterparts and is effective upon execution by both parties.");
  y += 6;
  p(`LANDLORD Signature: ${u(values.landlordSignature)}    Date: ${u(values.landlordSignDate)}`);
  p(`TENANT Signature: ${u(values.tenantSignature)}    Date: ${u(values.tenantSignDate)}`);
  doc.save("lease_renewal_agreement.pdf");
};

export default function LeaseRenewal() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Renewal Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="leaserenewal"
    />
  );
}
