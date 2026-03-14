import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Details",
    fields: [
      { name: "requestDate",   label: "Date",                              type: "date",   required: false },
      { name: "toName",        label: "To",                                type: "text",   required: false },
      { name: "toAddress",     label: "Address",                           type: "text",   required: false },
      { name: "serviceProvider",label: "Service provider",                 type: "text",   required: false },
      { name: "paymentDate",   label: "Payment date",                      type: "date",   required: false },
      { name: "amountPaid",    label: "Amount paid",                       type: "text",   required: false },
      { name: "checkNumber",   label: "Check number",                      type: "text",   required: false },
      { name: "checkDate",     label: "Check date",                        type: "date",   required: false },
      { name: "unsatDate",     label: "Unsatisfactory service notice date", type: "date",  required: false },
      { name: "responseDays",  label: "Response days",                     type: "text",   required: false },
      { name: "signature",     label: "Signature",                         type: "text",   required: false },
      { name: "printedName",   label: "Printed name",                      type: "text",   required: false },
      { name: "address",       label: "Address",                           type: "text",   required: false },
      { name: "contactInfo",   label: "Contact information",               type: "text",   required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w   = 210;
  const m   = 18;
  const tw  = w - m * 2;
  const lh  = 5.6;
  const limit = 278;
  let y = 22;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 22; }
  };

  const p = (text: string, bold = false, gap = 2.2) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const bullet = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - 5);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 1, y);
    doc.text(lines, m + 5, y);
    y += lines.length * lh + gap;
  };

  const subbullet = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - 10);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 6, y);
    doc.text(lines, m + 10, y);
    y += lines.length * lh + gap;
  };

  const sectionHeading = (text: string) => {
    y += 2;
    newPageIfNeeded(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 1.5;
  };

  const uf = (label: string, value?: string, min = 24, gap = 2.2) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(min)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  // ── Title — bold, centred, underlined ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "FORMAL COMPLAINT AND DEMAND FOR REFUND";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 10;

  // ── Date — two segments ───────────────────────────────────────────────────
  // Draft: Date: ____________, ____________
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text("Date: ", m, y);
  let dx = m + doc.getTextWidth("Date: ");
  const segLen = doc.getTextWidth("____________");
  const dateVal = (values.requestDate || "").trim();
  if (dateVal) {
    const parts = dateVal.split(",");
    const p1 = parts[0].trim();
    const p2 = parts.slice(1).join(",").trim();
    doc.text(p1, dx, y);
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(p1)), y + 1.1);
    dx += Math.max(segLen, doc.getTextWidth(p1));
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    if (p2) {
      doc.text(p2, dx, y);
      doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(p2)), y + 1.1);
    } else {
      doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    }
  } else {
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    dx += segLen;
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
  }
  y += lh + 2.2;

  // ── To and Address on same line ───────────────────────────────────────────
  // Draft: To: __________________________ Address: _____________________
  newPageIfNeeded(lh + 2.2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const toLabel   = "To: ";
  const toVal     = (values.toName    || "").trim();
  const toLineLen = doc.getTextWidth("__________________________");
  doc.text(toLabel, m, y);
  let tx = m + doc.getTextWidth(toLabel);
  if (toVal) {
    doc.text(toVal, tx, y);
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + Math.max(toLineLen, doc.getTextWidth(toVal)), y + 1.1);
    tx += Math.max(toLineLen, doc.getTextWidth(toVal));
  } else {
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + toLineLen, y + 1.1);
    tx += toLineLen;
  }
  tx += 4;
  const addrLabel   = "Address: ";
  const addrVal     = (values.toAddress || "").trim();
  const addrLineLen = doc.getTextWidth("_____________________");
  doc.text(addrLabel, tx, y);
  const ax = tx + doc.getTextWidth(addrLabel);
  if (addrVal) {
    doc.text(addrVal, ax, y);
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + Math.max(addrLineLen, doc.getTextWidth(addrVal)), y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + addrLineLen, y + 1.1);
  }
  y += lh + 2.2;

  // ── Body ──────────────────────────────────────────────────────────────────
  p("Subject: Formal Complaint and Demand for Refund", true);
  p("Dear Sir or Madam:");
  p(`I am writing to formally lodge a complaint regarding services provided to me by ${values.serviceProvider || "________________________"}.`);
  p(`On ${values.paymentDate || "________________________"}, I paid the sum of $${values.amountPaid || "-------"} for the said services. Payment was made by check, bearing check number ${values.checkNumber || "___________"}, dated ${values.checkDate || "________________________"}.`);
  p(`Subsequently, on ${values.unsatDate || "________________________"}, I contacted ${values.serviceProvider || "________________________"} to advise that the services rendered were unsatisfactory and failed to meet reasonable or agreed standards. Despite providing notice and an opportunity to address this issue, I did not receive an appropriate or satisfactory response. As a result, I am compelled to raise this matter directly with you.`);
  p(`To resolve this issue amicably, I hereby request a full refund of the service fee in the amount of $${values.amountPaid || "-----"}.`);
  p(`I expect a written response within ${values.responseDays || "__________"} days of receipt of this letter. Should the matter remain unresolved after that time, I reserve the right to seek further assistance or pursue additional remedies as may be available to me.`);
  p("Please contact me should you require any further information or documentation.");
  p("Sincerely,", false, 4);

  uf("Signature",           values.signature,   30);
  uf("Printed Name",        values.printedName, 28);
  uf("Address",             values.address,     34);
  uf("Contact Information", values.contactInfo, 34, 6);

  // ── Final Checklist ───────────────────────────────────────────────────────
  y += 2;
  newPageIfNeeded(lh + 4);

  // Title — bold, 13pt, centred, underlined
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const clTitle = "Final Checklist \u2014 Complaint Letter to a Company";
  doc.text(clTitle, w / 2, y, { align: "center" });
  const clTW = doc.getTextWidth(clTitle);
  doc.setLineWidth(0.45);
  doc.line(w / 2 - clTW / 2, y + 1.5, w / 2 + clTW / 2, y + 1.5);
  y += 9;
  doc.setFontSize(10.5);

  // Legal Formalities
  sectionHeading("Legal Formalities");
  bullet("\u2610  Ensure the letter is signed by the complainant.");

  // Recordkeeping
  sectionHeading("Recordkeeping");
  bullet("\u2610  Retain a copy of the signed letter and all supporting documentation for your records.");

  // Reasons to Update or Reissue
  sectionHeading("Reasons to Update or Reissue");
  bullet("\u2022  To submit the same complaint to a different branch, department, or company officer.");
  bullet("\u2022  To issue a follow-up complaint regarding the same matter.");

  // Supporting Documentation
  sectionHeading("Supporting Documentation");
  bullet("\u2022  Include photocopies only of receipts, invoices, contracts, or other relevant documents.");
  bullet("\u2022  Retain originals and maintain a written log of:");
  subbullet("\u2022  All correspondence sent to or received from the company");
  subbullet("\u2022  Dates, times, and summaries of any telephone conversations");

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