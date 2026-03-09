import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Original Contract",
    fields: [
      { name: "effectiveDate", label: "Extension effective date", type: "date", required: true },
      { name: "firstPartyName", label: "First party name", type: "text", required: true },
      { name: "firstPartyType", label: "First party entity type", type: "text", required: false },
      { name: "firstPartyAddress", label: "First party address", type: "text", required: false },
      { name: "secondPartyName", label: "Second party name", type: "text", required: true },
      { name: "secondPartyType", label: "Second party entity type", type: "text", required: false },
      { name: "secondPartyAddress", label: "Second party address", type: "text", required: false },
      { name: "originalTitle", label: "Original contract title", type: "text", required: true },
      { name: "originalDate", label: "Original contract date", type: "date", required: false },
      { name: "originalExpiry", label: "Original expiration date", type: "date", required: false },
      { name: "newExpiry", label: "New expiration date", type: "date", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "firstSignerName", label: "First party signer name", type: "text", required: false },
      { name: "firstSignerTitle", label: "First party signer title", type: "text", required: false },
      { name: "firstSignerDate", label: "First party sign date", type: "date", required: false },
      { name: "secondSignerName", label: "Second party signer name", type: "text", required: false },
      { name: "secondSignerTitle", label: "Second party signer title", type: "text", required: false },
      { name: "secondSignerDate", label: "Second party sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "CONTRACT EXTENSION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Contract Extension Agreement (the "Extension") is made and entered into as of ${u(values.effectiveDate, 12)} by and between ${u(values.firstPartyName, 12)}, a ${u(values.firstPartyType, 10)} with principal place of business at ${u(values.firstPartyAddress, 14)} ("First Party"), and ${u(values.secondPartyName, 12)}, a ${u(values.secondPartyType, 10)} with principal place of business at ${u(values.secondPartyAddress, 14)} ("Second Party").`);
  p("Collectively referred to as the 'Parties' and individually as a 'Party.'");
  p("RECITALS", true);
  p(`WHEREAS, the Parties entered into a contract titled ${u(values.originalTitle, 14)} dated ${u(values.originalDate, 12)} (the "Original Contract"); and`);
  p("WHEREAS, the Parties wish to extend and amend the Original Contract as set forth in this Extension.");
  p("NOW, THEREFORE, in consideration of the mutual covenants and agreements, the Parties agree as follows:", false, 3);

  p("1. Extension of Term", true);
  p(`1.1 The Original Contract was originally set to expire on ${u(values.originalExpiry, 12)}.`);
  p(`1.2 The Parties extend the term for an additional period ending on ${u(values.newExpiry, 12)}.`);
  p("1.3 All references to 'term,' 'expiration,' or similar in the Original Contract shall be deemed amended to reflect the extended period.");
  p("2. Amendments to Original Contract", true);
  p("2.1 The following provisions are amended/supplemented:");
  p("a. Binding Effect: This Extension is binding upon and inures to the benefit of the Parties, successors, assigns, and legal representatives.");
  p("b. Entire Agreement: This Extension with the Original Contract (as amended) is the full agreement concerning the subject matter.");
  p("2.2 Except as expressly amended, all other terms of the Original Contract remain in full force and effect.");
  p("3. General Provisions", true);
  p("3.1 Severability: Invalidity of any provision does not affect the remainder; provision is limited as needed to be enforceable.");
  p("3.2 Waiver: Failure to enforce any provision is not a waiver of future enforcement.");
  p("3.3 Amendment: Any modification must be in writing signed by all Parties.");
  p("3.4 Execution in Counterparts: This Extension may be executed in counterparts and by electronic signatures, each deemed valid and binding.");
  p("4. Signatures", true);
  p("IN WITNESS WHEREOF, the Parties execute this Contract Extension Agreement as of the Effective Date.");

  p("First Party:");
  uf("Name", values.firstSignerName || values.firstPartyName, 22);
  uf("Title", values.firstSignerTitle, 16);
  p("Signature: __________________________");
  uf("Date", values.firstSignerDate, 14);
  p("Second Party:");
  uf("Name", values.secondSignerName || values.secondPartyName, 22);
  uf("Title", values.secondSignerTitle, 16);
  p("Signature: __________________________");
  uf("Date", values.secondSignerDate, 14);

  doc.save("contract_extension_agreement.pdf");
};

export default function ContractExtensionForm() {
  return (
    <FormWizard
      steps={steps}
      title="Contract Extension Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="contractextension"
    />
  );
}
