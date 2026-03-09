import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Recitals",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "mortgageeName", label: "Mortgagee name", type: "text", required: true },
      { name: "mortgageeAddress", label: "Mortgagee address", type: "text", required: true },
      { name: "tenantName", label: "Tenant name", type: "text", required: true },
      { name: "tenantAddress", label: "Tenant address", type: "text", required: true },
      { name: "leaseDate", label: "Lease date", type: "date", required: false },
      { name: "landlordName", label: "Landlord name", type: "text", required: false },
      { name: "landlordAddress", label: "Landlord address", type: "text", required: false },
      { name: "premisesLegalDescription", label: "Premises legal description", type: "textarea", required: true },
      { name: "premisesAddress", label: "Premises common address", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "mortgageeSigner", label: "Mortgagee signer name", type: "text", required: false },
      { name: "mortgageeTitle", label: "Mortgagee signer title", type: "text", required: false },
      { name: "mortgageeSignDate", label: "Mortgagee sign date", type: "date", required: false },
      { name: "tenantSigner", label: "Tenant signer name", type: "text", required: false },
      { name: "tenantTitle", label: "Tenant signer title", type: "text", required: false },
      { name: "tenantSignDate", label: "Tenant sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 20) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "LEASE SUBORDINATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Lease Subordination Agreement ("Agreement") is made and entered into as of ${u(values.agreementDate, 12)}, by and between ${u(values.mortgageeName, 20)}, of ${u(values.mortgageeAddress, 20)} ("Mortgagee"), and ${u(values.tenantName, 20)}, of ${u(values.tenantAddress, 20)} ("Tenant").`);
  p("RECITALS", true);
  p(`WHEREAS, Tenant entered into a lease agreement (the "Lease") dated ${u(values.leaseDate, 12)}, with ${u(values.landlordName, 20)}, of ${u(values.landlordAddress, 20)} ("Landlord"), covering certain real property described as follows:`);
  p(u(values.premisesLegalDescription, 28));
  p(`commonly known as: ${u(values.premisesAddress, 24)} ("Premises");`);
  p("WHEREAS, Mortgagee has extended a mortgage loan to Landlord, secured inter alia by a mortgage recorded against the Premises;");
  p("WHEREAS, Tenant has agreed to subordinate its leasehold interest in consideration of Mortgagee's agreement not to disturb Tenant's possession so long as Tenant remains in compliance;", false, 3);
  p("NOW, THEREFORE, in consideration of the foregoing and mutual covenants, the parties agree as follows:");
  p("1. Subordination", true);
  p("Tenant agrees the Lease and all Tenant rights/title/interest are subject and subordinate to the lien/terms/conditions of the Mortgage, including renewals, extensions, modifications, consolidations, substitutions, replacements, and future mortgages held by Mortgagee or successors/assigns.");
  p("2. Non-Disturbance", true);
  p("So long as Tenant is not in default beyond applicable notice and cure periods, Mortgagee agrees the Lease shall not be terminated and Tenant possession/use/enjoyment shall not be disturbed upon foreclosure or enforcement proceedings.");
  p("Any successor purchaser is not liable for acts/omissions of prior landlord, not subject to offsets/defenses against prior landlord, not bound by rent prepayment beyond one month, and not bound by unapproved lease modifications.");
  p("3. Attornment", true);
  p("Upon foreclosure, conveyance in lieu, or Mortgagee succession to landlord interest, Tenant attorns to and recognizes Purchaser as landlord. Attornment is automatic. Lease continues in full force for the remaining term including extensions/renewals, and Purchaser assumes landlord obligations arising after succession.");
  p("4. Binding Effect", true);
  p("This Agreement binds and benefits the parties and respective heirs, executors, legal representatives, successors, and assigns.");
  p("5. Execution and Counterparts", true);
  p("This Agreement may be executed in counterparts, each deemed original. Electronic or scanned signatures are effective as originals.", false, 3);

  p("IN WITNESS WHEREOF, the undersigned have executed this Lease Subordination Agreement as of the date first written above.", true, 2.2);
  p("MORTGAGEE");
  p("By: _______________________________");
  uf("Name", values.mortgageeSigner, 24);
  uf("Title", values.mortgageeTitle, 24);
  uf("Date", values.mortgageeSignDate, 24, 2.6);
  p("TENANT");
  p("By: _______________________________");
  uf("Name", values.tenantSigner, 24);
  uf("Title", values.tenantTitle, 24);
  uf("Date", values.tenantSignDate, 24);

  doc.save("lease_subordination_agreement.pdf");
};

export default function LeaseSubordinationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Subordination Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="leasesubordinationagreement"
    />
  );
}
