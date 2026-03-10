import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement",
    fields: [
      { name: "agreementDatePlace", label: "Date and place", type: "text", required: true },
      { name: "firstPartyLabel", label: "First party designation", type: "text", required: true, placeholder: "FIRST PARTY" },
      { name: "secondPartyLabel", label: "Second party designation", type: "text", required: true, placeholder: "SECOND PARTY" },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "propertyDescription", label: "Property description", type: "textarea", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (v?: string, min = 14) => (v || "").trim() || "_".repeat(min);
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "AGENCY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.1, w / 2 + tW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This AGENCY AGREEMENT ("Agreement") is made at ${u(values.agreementDatePlace)}.`);
  p("BY AND BETWEEN", true);
  p(
    `"${u(values.firstPartyLabel)}" (hereinafter referred to as the "1st party as owner", which expression shall, where the context so admits, include their respective legal heirs, successors-in-interest, and permitted assigns);`
  );
  p(
    `And "${u(values.secondPartyLabel)}" (hereinafter referred to as the "2nd party as agent", which expression shall, where the context so admits, include their respective legal heirs, successors-in-interest, and permitted assigns);`
  );
  p("RECITALS", true);
  p(
    `WHEREAS, ${u(values.ownerName)} as ("Owner"), is the absolute, rightful and lawful owner-in-possession of the subject property ${u(values.propertyDescription, 20)}.`
  );
  p("NOW THEREFORE, the Parties agree to execute this Agreement on the terms set forth above.");
  p("1st Party as Owner: __________________________");
  p("2nd Party as Agent: __________________________");

  doc.save("agency_agreement.pdf");
};

export default function AdvertisingAgencyAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Agency Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="advertisingagencyagreement"
    />
  );
}
