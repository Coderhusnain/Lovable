import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "serviceProvider", label: "Service provider", type: "text", required: false },
      { name: "paymentDate", label: "Payment date", type: "date", required: false },
      { name: "amountPaid", label: "Amount paid", type: "text", required: false },
      { name: "checkNumber", label: "Check number", type: "text", required: false },
      { name: "checkDate", label: "Check date", type: "date", required: false },
      { name: "unsatDate", label: "Unsatisfactory service notice date", type: "date", required: false },
      { name: "responseDays", label: "Response days", type: "text", required: false },
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
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
  const title = "FORMAL COMPLAINT AND DEMAND FOR REFUND";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  uf("To", values.toName, 24);
  uf("Address", values.toAddress, 34);
  p("Subject: Formal Complaint and Demand for Refund", true);
  p("Dear Sir or Madam:");
  p(`I am writing to formally lodge a complaint regarding services provided to me by ${values.serviceProvider || "________________________"}.`);
  p(`On ${values.paymentDate || "______________________"}, I paid the sum of $${values.amountPaid || "-------"} for the said services. Payment was made by check, bearing check number ${values.checkNumber || "___________"}, dated ${values.checkDate || "______________________"}.`);
  p(`Subsequently, on ${values.unsatDate || "______________________"}, I contacted ${values.serviceProvider || "______________________"} to advise that the services rendered were unsatisfactory and failed to meet reasonable or agreed standards. Despite providing notice and an opportunity to address this issue, I did not receive an appropriate or satisfactory response. As a result, I am compelled to raise this matter directly with you.`);
  p(`To resolve this issue amicably, I hereby request a full refund of the service fee in the amount of $${values.amountPaid || "-----"}.`);
  p(`I expect a written response within ${values.responseDays || "__________"} days of receipt of this letter. Should the matter remain unresolved after that time, I reserve the right to seek further assistance or pursue additional remedies as may be available to me.`);
  p("Please contact me should you require any further information or documentation.");
  p("Sincerely,", false, 3);
  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Final Checklist - Complaint Letter to a Company", true);
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed by the complainant.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter and all supporting documentation for your records.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("- To submit the same complaint to a different branch, department, or company officer.");
  p("- To issue a follow-up complaint regarding the same matter.", false, 2.6);
  p("Supporting Documentation", true, 1);
  p("- Include photocopies only of receipts, invoices, contracts, or other relevant documents.");
  p("- Retain originals and maintain a written log of:");
  p("  o All correspondence sent to or received from the company");
  p("  o Dates, times, and summaries of any telephone conversations");

  doc.save("formal_complaint_and_demand_for_refund.pdf");
};

export default function FormalComplaintRefundForm() {
  return (
    <FormWizard
      steps={steps}
      title="Complaint for refund"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="refundform"
    />
  );
}
