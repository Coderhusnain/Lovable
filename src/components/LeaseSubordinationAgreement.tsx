import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "agreementDate", label: "Agreement date", type: "date", required: true },
    { name: "mortgageeName", label: "Mortgagee name", type: "text", required: true },
    { name: "mortgageeAddress", label: "Mortgagee address", type: "text", required: true },
    { name: "tenantName", label: "Tenant name", type: "text", required: true },
    { name: "tenantAddress", label: "Tenant address", type: "text", required: true },
  ]},
  { label: "Lease and Premises", fields: [
    { name: "leaseDate", label: "Lease date", type: "date", required: true },
    { name: "landlordName", label: "Landlord name", type: "text", required: true },
    { name: "landlordAddress", label: "Landlord address", type: "text", required: true },
    { name: "premisesLegalDescription", label: "Legal description of premises", type: "textarea", required: true },
    { name: "premisesAddress", label: "Common premises address", type: "text", required: true },
  ]},
  { label: "Mortgage and Subordination", fields: [
    { name: "mortgageDescription", label: "Mortgage description", type: "text", required: true },
    { name: "futureMortgageNote", label: "Future mortgage clause note", type: "text", required: true },
  ]},
  { label: "Non-Disturbance Terms", fields: [
    { name: "defaultCureNote", label: "Tenant default and cure wording", type: "text", required: true },
    { name: "purchaserLimits", label: "Purchaser limitations", type: "textarea", required: true },
  ]},
  { label: "Attornment and Binding", fields: [
    { name: "attornmentAutomaticText", label: "Automatic attornment language", type: "text", required: true },
    { name: "bindingPartiesText", label: "Binding effect parties", type: "text", required: true },
    { name: "counterpartsText", label: "Counterparts and e-signature text", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "mortgageeSignName", label: "Mortgagee signatory name", type: "text", required: true },
    { name: "mortgageeSignTitle", label: "Mortgagee signatory title", type: "text", required: true },
    { name: "mortgageeSignDate", label: "Mortgagee signature date", type: "date", required: true },
    { name: "tenantSignName", label: "Tenant signatory name", type: "text", required: true },
    { name: "tenantSignTitle", label: "Tenant signatory title", type: "text", required: true },
    { name: "tenantSignDate", label: "Tenant signature date", type: "date", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const right = 190;
  const pageHeight = 280;
  let y = 20;
  const u = (v?: string, len = 24) => (v && String(v).trim() ? String(v).trim() : "_".repeat(len));
  const ensure = (n = 10) => {
    if (y + n > pageHeight) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (t: string, indent = 0, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, right - left - indent);
    ensure(lines.length * 6 + 2);
    doc.text(lines, left + indent, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "LEASE SUBORDINATION AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;

  doc.setFontSize(12);
  p(`This Lease Subordination Agreement ("Agreement") is made and entered into as of ${u(values.agreementDate)} by and between ${u(values.mortgageeName)} of ${u(values.mortgageeAddress)} ("Mortgagee"), and ${u(values.tenantName)} of ${u(values.tenantAddress)} ("Tenant").`);
  y += 2;
  p("RECITALS", 0, true);
  p(`WHEREAS, the Tenant entered into a lease agreement (the "Lease") dated ${u(values.leaseDate)}, with ${u(values.landlordName)} of ${u(values.landlordAddress)} ("Landlord"), covering certain real property described as follows: ${u(values.premisesLegalDescription)}.`);
  p(`WHEREAS, the Mortgagee has extended a mortgage loan to the Landlord, secured by a mortgage recorded against the Premises commonly known as ${u(values.premisesAddress)}.`);
  p("WHEREAS, the Tenant has agreed to subordinate its leasehold interest in consideration of the Mortgagee's agreement not to disturb Tenant's possession while Tenant remains in compliance.");
  y += 2;
  p("NOW, THEREFORE, the parties agree as follows:", 0, true);
  y += 2;
  p("1. Subordination", 0, true);
  p(`The Tenant hereby agrees that the Lease and all Tenant rights thereunder shall be subject and subordinate in all respects to the Mortgage, including all renewals, extensions, modifications, consolidations, substitutions, replacements, and ${u(values.futureMortgageNote)}.`);
  y += 2;
  p("2. Non-Disturbance", 0, true);
  p(`So long as the Tenant is not in default under the Lease beyond applicable notice and cure periods (${u(values.defaultCureNote)}), the Mortgagee agrees the Lease shall not be terminated and Tenant possession, use, and enjoyment of the Premises shall not be disturbed in foreclosure or similar enforcement proceedings.`);
  p(`Notwithstanding the foregoing, any Purchaser succeeding to Landlord interest shall be limited as follows: ${u(values.purchaserLimits)}.`);
  y += 2;
  p("3. Attornment", 0, true);
  p(`In the event of foreclosure, deed in lieu, or similar succession, Tenant agrees to attorn to and recognize Purchaser as landlord. ${u(values.attornmentAutomaticText)} The Lease shall continue in full force for the remainder of the term, including any extensions or renewals pursuant to the Lease.`);
  y += 2;
  p("4. Binding Effect", 0, true);
  p(u(values.bindingPartiesText));
  y += 2;
  p("5. Execution and Counterparts", 0, true);
  p(u(values.counterpartsText));
  y += 8;

  p("MORTGAGEE", 0, true);
  p(`By: ${u(values.mortgageeSignName)}`);
  p(`Title: ${u(values.mortgageeSignTitle)}`);
  p(`Date: ${u(values.mortgageeSignDate)}`);
  y += 3;
  p("TENANT", 0, true);
  p(`By: ${u(values.tenantSignName)}`);
  p(`Title: ${u(values.tenantSignTitle)}`);
  p(`Date: ${u(values.tenantSignDate)}`);

  doc.save("lease_subordination_agreement.pdf");
};

export default function LeaseSubordinationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Subordination Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="leasesubordinationagreement"
    />
  );
}
