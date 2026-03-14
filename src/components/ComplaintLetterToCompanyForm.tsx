import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Letter Details",
    fields: [
      { name: "letterDate",      label: "Date",                               type: "date",  required: false },
      { name: "companyName",     label: "Company name (service provider)",     type: "text",  required: false },
      { name: "amountPaid",      label: "Amount paid ($)",                    type: "text",  required: false },
      { name: "checkNumber",     label: "Check number",                       type: "text",  required: false },
      { name: "checkDate",       label: "Check date",                         type: "date",  required: false },
      { name: "contactDate",     label: "Date you contacted the company",     type: "date",  required: false },
      { name: "bbbContactDate",  label: "Date you contacted BBB",             type: "date",  required: false },
      { name: "bbbCity",         label: "BBB city / location",                type: "text",  required: false },
      { name: "refundAmount",    label: "Refund amount requested ($)",        type: "text",  required: false },
      { name: "responseDays",    label: "Response requested within (days)",   type: "text",  required: false },
    ],
  },
  {
    label: "Your Details",
    fields: [
      { name: "senderName",    label: "Your full name",    type: "text",  required: false },
      { name: "senderAddress", label: "Your address",      type: "text",  required: false },
      { name: "senderPhone",   label: "Your phone number", type: "tel",   required: false },
      { name: "senderEmail",   label: "Your email",        type: "email", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc   = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const m     = 20;
  const tw    = pageW - m * 2;
  const lh    = 6;
  const limit = 275;
  let   y     = 22;

  /* ── font helpers ──────────────────────────────────────────────────────── */
  const setN = (size = 10.5) => { doc.setFont("helvetica", "normal"); doc.setFontSize(size); };
  const setB = (size = 10.5) => { doc.setFont("helvetica", "bold");   doc.setFontSize(size); };

  /* ── page-break guard ──────────────────────────────────────────────────── */
  const guard = (needed = lh + 2) => {
    if (y + needed > limit) { doc.addPage(); y = 22; }
  };

  /* ── plain paragraph ───────────────────────────────────────────────────── */
  const p = (text: string, bold = false, gap = 2.5) => {
    if (bold) setB(); else setN();
    const lines = doc.splitTextToSize(text, tw);
    guard(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  /* ── bold label + normal value on same line ────────────────────────────── */
  const boldLabel = (label: string, value: string, gap = 2.5) => {
    guard(lh + gap);
    setB();
    doc.text(label, m, y);
    const lw = doc.getTextWidth(label);
    setN();
    doc.text(value, m + lw, y);
    y += lh + gap;
  };

  /* ── underlined fill field ─────────────────────────────────────────────── */
  const uf = (label: string, value?: string, minChars = 24, gap = 2.5) => {
    guard(lh + gap);
    setB();
    const labelTxt = `${label}: `;
    doc.text(labelTxt, m, y);
    const x = m + doc.getTextWidth(labelTxt);
    setN();
    const shown = (value || "").trim();
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.3, x + Math.max(10, doc.getTextWidth(shown) + 2), y + 1.3);
    } else {
      doc.line(x, y + 1.3, x + doc.getTextWidth("n".repeat(minChars)), y + 1.3);
    }
    y += lh + gap;
  };

  /* ── section heading (bold, underlined, extra space above) ─────────────── */
  const secHeading = (text: string) => {
    y += 3;
    guard(lh + 10);
    setB(12);
    doc.text(text, pageW / 2, y, { align: "center" });
    const hw = doc.getTextWidth(text);
    doc.setLineWidth(0.4);
    doc.line(pageW / 2 - hw / 2, y + 1.4, pageW / 2 + hw / 2, y + 1.4);
    y += lh + 5;
  };

  /* ── bold sub-heading (left-aligned) ───────────────────────────────────── */
  const subHeading = (text: string) => {
    y += 2;
    p(text, true, 1.5);
  };

  /* ── checkbox bullet  ☐ text ───────────────────────────────────────────── */
  const checkbox = (text: string, gap = 2) => {
    const indent = m + 7;
    const lines  = doc.splitTextToSize(text, tw - 7);
    guard(lines.length * lh + gap);
    setN();
    doc.text("\u2610", m + 1, y);
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  /* ── bullet  • text ────────────────────────────────────────────────────── */
  const bullet = (text: string, gap = 2, indent = 0) => {
    const ix    = m + 6 + indent;
    const lines = doc.splitTextToSize(text, tw - 6 - indent);
    guard(lines.length * lh + gap);
    setN();
    doc.text("\u2022", m + 1.5 + indent, y);
    doc.text(lines, ix, y);
    y += lines.length * lh + gap;
  };

  /* ════════════════════════════════════════════════════════════════════════
     TITLE
  ════════════════════════════════════════════════════════════════════════ */
  setB(13);
  const title = "COMPLAINT LETTER TO BBB / ATTORNEY GENERAL";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.45);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 9;

  // subtitle
  setN(10);
  doc.setFont("helvetica", "italic");
  doc.text("(BBB / Attorney General)", pageW / 2, y, { align: "center" });
  y += 10;

  /* ── Date ──────────────────────────────────────────────────────────────── */
  uf("Date", values.letterDate, 28, 4);

  /* ── Salutation ────────────────────────────────────────────────────────── */
  p("To Whom It May Concern:", true, 4);

  /* ════════════════════════════════════════════════════════════════════════
     BODY
  ════════════════════════════════════════════════════════════════════════ */
  const company     = values.companyName    || "__________";
  const amtPaid     = values.amountPaid     ? `$${values.amountPaid}`    : "$------";
  const checkNum    = values.checkNumber    || "__________";
  const checkDt     = values.checkDate      || "__________";
  const contactDt   = values.contactDate    || "__________";
  const bbbDt       = values.bbbContactDate || "__________";
  const bbbCity     = values.bbbCity        || "__________";
  const refund      = values.refundAmount   ? `$${values.refundAmount}`  : "$-------";
  const respDays    = values.responseDays   || "__________";

  p(
    `I am writing to formally file a complaint regarding services I received from ${company}.`
  );
  p(
    `I paid a total amount of ${amtPaid} for these services. Payment was made by check, bearing check number ${checkNum}, dated ${checkDt}.`
  );
  p(
    `On ${contactDt}, I contacted ${company} to report that the services provided were unsatisfactory and did not meet reasonable expectations. Despite my efforts to resolve the matter directly, I did not receive an adequate or satisfactory response, which has compelled me to seek your assistance.`
  );
  p(
    `Subsequently, on ${bbbDt}, I contacted the Better Business Bureau in ${bbbCity} and reported the same concerns regarding the unsatisfactory service.`
  );
  p(
    `I respectfully request your assistance in resolving this matter. Specifically, I am seeking a full refund from ${company} in the amount of ${refund}, representing the total cost of the services rendered.`
  );
  p(
    `I would appreciate a written response regarding this complaint within ${respDays} days. Please feel free to contact me should you require any additional information or documentation.`
  );
  p("Thank you for your time and attention to this matter.", false, 4);

  /* ── Closing ───────────────────────────────────────────────────────────── */
  p("Sincerely,", true, 3);

  /* ── Sender block ──────────────────────────────────────────────────────── */
  uf("Name",    values.senderName,    26);
  uf("Address", values.senderAddress, 30);
  uf("Phone",   values.senderPhone,   24);
  uf("Email",   values.senderEmail,   26, 5);

  /* ════════════════════════════════════════════════════════════════════════
     FINAL CHECKLIST
  ════════════════════════════════════════════════════════════════════════ */
  secHeading("Final Checklist for Complaint Letter");

  // italic subtitle
  setN(10);
  doc.setFont("helvetica", "italic");
  guard(lh + 4);
  doc.text("(Better Business Bureau / Attorney General)", pageW / 2, y, { align: "center" });
  y += lh + 4;

  /* ── Legal Formalities ─────────────────────────────────────────────────── */
  subHeading("Legal Formalities");
  checkbox("Ensure the letter is signed.");
  checkbox("Include the date and complete contact information.", 3);

  /* ── Recordkeeping ─────────────────────────────────────────────────────── */
  subHeading("Recordkeeping");
  checkbox("Retain a copy of the signed letter for your personal records.");
  checkbox("Maintain copies of all supporting documents and correspondence.", 3);

  /* ── Reasons for Updating or Re-Sending ────────────────────────────────── */
  subHeading("Reasons for Updating or Re-Sending");
  bullet("To submit a follow-up complaint.");
  bullet("To file a separate or revised complaint if circumstances change.", 3);

  /* ── Supporting Documentation ──────────────────────────────────────────── */
  subHeading("Supporting Documentation");
  bullet("Enclose copies of any prior correspondence sent to the company in an effort to resolve the issue.");
  bullet("Attach photocopies only (not original documents) of all relevant materials.");
  bullet("Keep a written log of all communications, including:", 1.5);
  bullet("Dates of letters sent or received",          2, 6);
  bullet("Dates and summaries of telephone conversations", 2, 6);
  bullet("Names and titles of individuals contacted",  2, 6);

  doc.save("complaint_letter_to_bbb.pdf");
};

export default function ComplaintLetterToBBBForm() {
  return (
    <FormWizard
      steps={steps}
      title="Complaint Letter to BBB / Attorney General"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="complaintlettertobbb"
    />
  );
}