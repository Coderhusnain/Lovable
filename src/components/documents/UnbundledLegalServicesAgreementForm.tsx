import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Unbundled Legal Terms",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "attorneyName", label: "Attorney name", type: "text", required: true },
      { name: "matter", label: "Matter description", type: "textarea", required: true },
      { name: "servicesScope", label: "Limited scope services", type: "textarea", required: true },
      { name: "hourlyRates", label: "Hourly rates", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
      { name: "clientSignature", label: "Client signature (typed)", type: "text", required: true },
      { name: "clientDate", label: "Client date", type: "date", required: true },
      { name: "attorneySignature", label: "Attorney signature (typed)", type: "text", required: true },
      { name: "attorneyDate", label: "Attorney date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "UNBUNDLED LEGAL SERVICES AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(`This Unbundled Legal Services Agreement is entered into as of ${v.agreementDate || ""}, by and between ${v.clientName || "__________"} ("Client") and ${v.attorneyName || "__________"} ("Attorney").`);
  p("1. PURPOSE AND NATURE OF AGREEMENT", true);
  p("Limited-scope services only; Attorney is not attorney of record unless expressly agreed in writing.");
  p(`Matter: ${v.matter || "______________________________________________"}.`);
  p("2. SCOPE OF REPRESENTATION", true);
  p(`Attorney provides only: ${v.servicesScope || "______________________________________________"}. Additional services require written amendment signed by both parties.`);
  p("3. EFFECTIVE DATE / 4. AUTOMATIC TERMINATION", true);
  p("Effective on signing. Automatically terminates on completion of services or written termination.");
  p("5. ATTORNEY'S FEES", true);
  p(`Hourly fees: ${v.hourlyRates || ""}. Time billed in customary increments for reasonable services.`);
  p("6. COSTS AND EXPENSES", true);
  p("Client pays filing fees, copying/postage, long-distance calls, courier/messenger, and court/administrative fees.");
  p("7-11. ADDITIONAL SERVICES / CLIENT RESPONSIBILITIES / TERMINATION / INFORMED CONSENT / NO GUARANTEE OF OUTCOME", true);
  p(`12. GOVERNING LAW: ${v.governingLawState || "__________________"}.`);
  p("13. ENTIRE AGREEMENT / 14. AMENDMENTS / 15. SEVERABILITY", true);
  p("16. SIGNATURES", true);
  uf("CLIENT - Signature", v.clientSignature);
  uf("Name", v.clientName);
  uf("Date", v.clientDate);
  y += 1.2;
  uf("ATTORNEY - Signature", v.attorneySignature);
  uf("Name", v.attorneyName);
  uf("Date", v.attorneyDate);
  doc.save("unbundled_legal_services_agreement.pdf");
};

export default function UnbundledLegalServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Unbundled Legal Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="unbundledlegalservicesagreement"
    />
  );
}

