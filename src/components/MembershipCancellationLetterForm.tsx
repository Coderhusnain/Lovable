import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Letter Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "memberOrganization", label: "Membership organization", type: "text", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "fromAddress", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
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
  const title = "MEMBERSHIP CANCELLATION LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 10;

  uf("Date", values.requestDate, 20);
  uf("To", values.toName, 24);
  uf("Address", values.toAddress, 32);
  p("Subject: Notice of Membership Cancellation and Request for Refund", true, 3);
  p("Dear Sir or Madam:");
  p(`I am writing to formally notify you of my decision to cancel my membership with ${values.memberOrganization || "________________________"}, effective immediately.`);
  p("I respectfully request a full refund of all membership dues paid, in accordance with the applicable terms and conditions of the membership agreement. Enclosed is proof of payment evidencing the membership dues remitted.");
  p("Please contact me should you require any additional information to process this cancellation and refund. I appreciate your prompt attention to this matter and look forward to written confirmation of cancellation and reimbursement.");
  p("Thank you for your cooperation.");
  p("Sincerely,", false, 3);

  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.fromAddress, 40);
  uf("Contact Information", values.contactInfo, 34);

  doc.save("membership_cancellation_letter.pdf");
};

export default function MembershipCancellationLetterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Membership cancellation letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="membershipcancellation"
    />
  );
}
