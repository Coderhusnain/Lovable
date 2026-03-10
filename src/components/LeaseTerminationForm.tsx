import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Lease",
    fields: [
      { name: "landlordName", label: "Landlord full name", type: "text", required: true },
      { name: "tenantName", label: "Tenant full name", type: "text", required: true },
      { name: "originalLeaseDate", label: "Date of original lease", type: "date", required: true },
      { name: "premisesAddress", label: "Premises full address", type: "textarea", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "forwardingName", label: "Forwarding addressee name", type: "text", required: true },
      { name: "forwardingAddress", label: "Forwarding street address", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "landlordCityState", label: "Landlord city/state", type: "text", required: true },
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
  const p = (text: string, bold = false, gap = 1.6) => {
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
  const title = "AGREEMENT TO TERMINATE LEASE";
  doc.text(title, w / 2, y, { align: "center" });
  const twd = doc.getTextWidth(title);
  doc.line(w / 2 - twd / 2, y + 1.2, w / 2 + twd / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `This Agreement to Terminate Lease ("Agreement") is entered into by and between ${u(values.landlordName)} ("Landlord") and ${u(values.tenantName)} ("Tenant"), who previously executed a Lease Agreement dated ${u(values.originalLeaseDate)} pertaining to the real property located at ${u(values.premisesAddress, 24)} (the "Premises").`
  );
  p("WHEREAS, the parties now mutually desire to terminate the aforementioned Lease Agreement;", false);
  p(
    "NOW, THEREFORE, in consideration of mutual promises and covenants, and other good and valuable consideration, the receipt and sufficiency of which are acknowledged, the parties agree as follows:",
    false
  );

  p("1. Termination Date", true);
  p(
    `The Lease Agreement shall be terminated effective as of ${u(values.terminationDate)} (the "Termination Date"). As of the Termination Date, all rights, obligations, and responsibilities under the Lease cease, except as otherwise provided herein.`
  );
  p("2. Survival of Provisions", true);
  p(
    "Any original lease provisions intended by their nature to survive termination, including indemnification, liability for damages, and remedies for default, remain in full force and effect."
  );
  p("3. Forwarding Address", true);
  p(
    "Tenant designates the following forwarding address for correspondence, including security deposit return and legal notices required by law."
  );
  uf("Tenant Name", values.forwardingName);
  uf("Street Address", values.forwardingAddress);
  p("4. Execution", true);
  p(
    "This Agreement is effective upon execution by both parties, may be executed in counterparts, and electronic signatures have the same force and effect as original signatures."
  );
  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the dates written below.", true);
  uf("LANDLORD", values.landlordName);
  uf("City, State", values.landlordCityState);
  uf("Date", values.landlordSignDate);
  uf("TENANT", values.tenantName);
  uf("Date", values.tenantSignDate);

  doc.save("agreement_to_terminate_lease.pdf");
};

export default function LeaseTermination() {
  return (
    <FormWizard
      steps={steps}
      title="Agreement to Terminate Lease"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="leasetermination"
    />
  );
}
