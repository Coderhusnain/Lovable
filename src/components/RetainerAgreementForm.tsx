import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Retainer Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "serviceProvider", label: "Service Provider", type: "text", required: true },
      { name: "clientName", label: "Client", type: "text", required: true },
      { name: "serviceDescription", label: "Description of services", type: "textarea", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "retainerFee", label: "Retainer fee", type: "text", required: true },
      { name: "governingLaw", label: "Governing law state", type: "text", required: true },
      { name: "clientSignature", label: "Client signature (typed)", type: "text", required: true },
      { name: "clientDate", label: "Client date", type: "date", required: true },
      { name: "providerSignature", label: "Service Provider signature (typed)", type: "text", required: true },
      { name: "providerDate", label: "Service Provider date", type: "date", required: true },
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
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "RETAINER AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Retainer Agreement is entered as of ${v.effectiveDate || "__________"} by and between ${v.serviceProvider || "________________"} ("Service Provider") and ${v.clientName || "________________"} ("Client").`);
  p("1. DESCRIPTION OF SERVICES", true); p(v.serviceDescription || "________________");
  p("2. TERM", true); p(`Commences on Effective Date and remains through ${v.terminationDate || "__________"}, unless earlier terminated under this Agreement.`);
  p("3. TERMINATION", true); p(`Either Party may terminate with or without cause by ${v.terminationNoticeDays || "____"} days written notice.`);
  p("4. RETAINER AND FEES", true);
  p(`Retainer Fee: $${v.retainerFee || "________"} before services commence; applied to services as billed; replenished upon request if depleted; non-refundable once services commence unless otherwise written.`);
  p("5-9. ENTIRE AGREEMENT / SEVERABILITY / AMENDMENT / WAIVER / GOVERNING LAW", true);
  p(`Governed by laws of State of ${v.governingLaw || "________________"}.`);
  p("10. OWNERSHIP AND INTELLECTUAL PROPERTY", true);
  p("Work Product is work made for hire to extent permitted; otherwise Service Provider assigns all IP rights to Client and waives moral rights to fullest lawful extent.");
  p("11-20. CONFIDENTIALITY / DEFAULT / REMEDIES / INDEMNIFICATION / INDEPENDENT CONTRACTOR / INSURANCE / NO AUTHORITY TO BIND / DISPUTE RESOLUTION / EXPENSES / EXECUTION", true);
  uf("CLIENT - Signature", v.clientSignature);
  uf("Name", v.clientName);
  uf("Date", v.clientDate);
  y += 1.2;
  uf("SERVICE PROVIDER - Signature", v.providerSignature);
  uf("Name", v.serviceProvider);
  uf("Date", v.providerDate);
  doc.save("retainer_agreement.pdf");
};

export default function RetainerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Retainer Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="retaineragreement"
    />
  );
}

