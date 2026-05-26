import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Sender Details",
    fields: [
      { name: "senderName", label: "Your full name", type: "text", required: true },
      { name: "senderAddress", label: "Your address", type: "text", required: true },
      { name: "senderPhone", label: "Telephone number", type: "text", required: false },
      { name: "senderEmail", label: "Email address", type: "text", required: false },
    ],
  },
  {
    label: "Debt Details",
    fields: [
      { name: "ref", label: "Re:", type: "text", required: false },
      { name: "accountNumber", label: "Account Number", type: "text", required: false },
      { name: "amountDispute", label: "Amount in Dispute", type: "text", required: false },
      { name: "contactName", label: "Collection agency / contact name", type: "text", required: false },
      { name: "contactDate", label: "Date of telephone contact", type: "date", required: false },
      { name: "requestedInfo", label: "Requested information / notes", type: "textarea", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signatureName", label: "Printed name", type: "text", required: true },
      { name: "signatureDate", label: "Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 6;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

  const p = (t: string, b = false, g = 2) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };

  const uf = (label: string, value?: string, min = 24, gap = 2) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "DEBT VALIDATION LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.6, w / 2 + titleW / 2, y + 1.6);
  y += 10;

  p(`Re: ${u(values.ref, 30)}`);
  p(`Account Number: ${u(values.accountNumber, 24)}`);
  p(`Amount in Dispute: $${u(values.amountDispute, 12)}`);
  p(`Dear ${u(values.contactName, 24)},`, false, 3);

  p(`I write in response to your recent communication concerning the above-referenced alleged debt, which you contacted me about by telephone on ${u(values.contactDate, 12)}.`);
  p("This correspondence is submitted pursuant to the Fair Debt Collection Practices Act, 15 U.S.C. § 1692g(a) and (b). In accordance with these provisions, I hereby formally dispute the alleged debt and request written verification and validation thereof.");

  p("Please provide the following information as required by law:");
  p("Debt and Creditor Information Requested", true, 1.8);
  p("1. The full name and address of the original creditor.");
  p("2. The amount of the alleged debt, including a detailed breakdown of principal, interest, fees, and charges.");
  p("3. Copies of any contracts, agreements, or documents bearing my signature evidencing liability.");
  p("4. The date the alleged debt was incurred and the date of last payment.");
  p("5. Proof that your agency is legally authorized to collect the alleged debt.");
  p("6. Documentation establishing that the statute of limitations has not expired.");

  p("Until such verification is provided, you are required by law to cease all collection activities, including reporting the alleged debt to any credit reporting agency.");
  p("All future communications regarding this matter must be made in writing only.");
  p("Thank you for your prompt attention to this request.");

  p("Respectfully,", false, 3);
  uf("Signature", values.signatureName, 28);
  uf("Printed Name", values.signatureName, 28);
  uf("Address", values.senderAddress, 34);
  uf("Date", values.signatureDate, 12, 3);

  doc.save("debt_validation_letter.pdf");
};

export default function DebtValidationForm() {
  return (
    <FormWizard
      steps={steps}
      title="Debt Validation Letter"
      subtitle="Generate a debt validation / dispute letter under FDCPA"
      onGenerate={generatePDF}
      documentType="debt-validation-letter"
    />
  );
}
