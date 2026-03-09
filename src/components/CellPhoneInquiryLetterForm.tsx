import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Inquiry Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "billingCharge", label: "Billed monthly charge", type: "text", required: false },
      { name: "contractCharge", label: "Contract monthly charge", type: "text", required: false },
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
      { name: "subscriber", label: "Cell phone subscriber", type: "text", required: false },
      { name: "provider", label: "Cell phone provider", type: "text", required: false },
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

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
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
  const title = "CELL PHONE INQUIRY LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  p(`Re: Account Number: ${values.accountNumber || "__________"}`);
  uf("To", values.toName, 24);
  uf("Address", values.toAddress, 32);
  p("Dear Sir or Madam:");
  p(`I am writing regarding my cellular telephone service account referenced above. Upon reviewing my most recent billing statement, I observed that the monthly service charge reflected is $${values.billingCharge || "------"}. However, pursuant to the terms of my service agreement, the applicable monthly service charge is stated to be $${values.contractCharge || "------"}.`);
  p("In light of this discrepancy, I respectfully request written clarification of the monthly charge applied to my account, including confirmation that the charges assessed are consistent with the terms of my service contract.");
  p("For your reference, I have enclosed a copy of the relevant billing statement.");
  p("Please contact me should you require any additional information or documentation to address this inquiry. I appreciate your prompt attention to this matter and look forward to your response.");
  p("Sincerely,", false, 3);
  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Final Checklist - Cellular Service Billing Inquiry", true);
  uf("Cell Phone Subscriber", values.subscriber, 24);
  uf("Cell Phone Provider", values.provider, 24);
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed by the account holder.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter and all related correspondence for your records.", false, 2.6);
  p("Attachments", true, 1);
  p("[ ] Enclose a copy of the relevant cellular billing statement, as referenced in the letter.", false, 2.6);
  p("Additional Guidance", true, 1);
  p("- If the billing statement appears to contain an error, or if clarification is required regarding specific charges or call entries, such issues should be clearly identified in the letter rather than marked on the original statement.");
  p("- It may be helpful to include a photocopy of the billing statement with the disputed charge highlighted or underlined for ease of reference.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("- To dispute a different charge or entry appearing on a subsequent cellular service statement.");

  doc.save("cell_phone_inquiry_letter.pdf");
};

export default function CellPhoneInquiryLetterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Cell Phone Inquiry Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cellphoneinquiryletter"
    />
  );
}
