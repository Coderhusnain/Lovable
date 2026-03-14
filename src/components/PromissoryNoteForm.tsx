import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Details",
    fields: [
      { name: "principalAmount",  label: "Principal amount",          type: "text",   required: false },
      { name: "noteDate",         label: "Date",                      type: "date",   required: false },
      { name: "borrowerName",     label: "Borrower name",             type: "text",   required: false },
      { name: "borrowerAddress",  label: "Borrower address",          type: "text",   required: false },
      { name: "lenderName",       label: "Lender name",               type: "text",   required: false },
      { name: "paymentPlace",     label: "Payment place",             type: "text",   required: false },
      { name: "monthlyInstallment", label: "Monthly installment ($)", type: "text",   required: false },
      { name: "firstPaymentDate", label: "First payment date",        type: "date",   required: false },
      { name: "dueDate",          label: "Due date",                  type: "date",   required: false },
      { name: "lateFeeAmount",    label: "Late fee amount ($)",       type: "text",   required: false },
      { name: "lateDays",         label: "Late days",                 type: "text",   required: false },
      { name: "governingLaw",     label: "Governing law (state)",     type: "text",   required: false },
      { name: "executedDay",      label: "Executed day",              type: "text",   required: false },
      { name: "executedMonth",    label: "Executed month",            type: "text",   required: false },
      { name: "executedYear",     label: "Executed year",             type: "text",   required: false },
      { name: "executedAt",       label: "Executed at (city/place)",  type: "text",   required: false },
      { name: "borrowerDate",     label: "Borrower signature date",   type: "date",   required: false },
      { name: "lenderDate",       label: "Lender signature date",     type: "date",   required: false },
      { name: "assigneeName",     label: "Assignee name",             type: "text",   required: false },
      { name: "assigneeCityState",label: "Assignee city / state",     type: "text",   required: false },
      { name: "assigneeCountry",  label: "Assignee country",          type: "text",   required: false },
      { name: "assignmentDate",   label: "Assignment date",           type: "date",   required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc   = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w     = 210;
  const m     = 18;
  const tw    = w - m * 2;
  const lh    = 5.6;
  const limit = 280;
  let   y     = 20;

  /* ── helpers ─────────────────────────────────────────────────────────────── */

  // Plain paragraph — bold=true renders entire line bold
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Bold label + normal value on the same line
  const boldLabel = (label: string, value: string, gap = 1.8) => {
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(label, m, y);
    const lw = doc.getTextWidth(label);
    doc.setFont("helvetica", "normal");
    doc.text(value, m + lw, y);
    y += lh + gap;
  };

  // Underlined fill field
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
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

  // Indented lettered list item  e.g. "(a) text..."
  const lettered = (letter: string, text: string, gap = 1.8) => {
    const indent = m + 8;
    const lines  = doc.splitTextToSize(text, tw - 8);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(`(${letter})`, m + 1, y);
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // Paragraph with an inline bold segment: normalBefore + boldPart + normalAfter
  const pInlineBold = (
    before: string,
    bold: string,
    after: string,
    gap = 1.8
  ) => {
    // Build the full text then re-render with two passes (simple approach: one line only)
    const full  = before + bold + after;
    const lines = doc.splitTextToSize(full, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    // Render normally first (all normal), then overdraw bold part on first line
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    // Overdraw the bold segment on line 0
    const bx = m + doc.getTextWidth(before);
    doc.setFont("helvetica", "bold");
    doc.text(bold, bx, y);
    y += lines.length * lh + gap;
  };

  /* ── Title ───────────────────────────────────────────────────────────────── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.4);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 10;

  /* ── Header fields ───────────────────────────────────────────────────────── */
  const principal = values.principalAmount || "--------";
  const noteDate  = values.noteDate        || "__________";
  boldLabel("Principal Amount: ", `$${principal}`);
  boldLabel("Date: ", noteDate);
  y += 2;

  /* ── Opening paragraph ───────────────────────────────────────────────────── */
  const borrower  = values.borrowerName    || "__________";
  const bAddress  = values.borrowerAddress || "__________, __________, __________";
  const lender    = values.lenderName      || "__________";
  const payPlace  = values.paymentPlace    || "__________";
  const loanAmt   = values.principalAmount ? `$${values.principalAmount}` : "$0.00";

  p(
    `FOR VALUE RECEIVED, the undersigned ${borrower} (the "Borrower"), of ${bAddress}, hereby promises to pay to the order of ${lender} (the "Lender"), at ${payPlace}, or at such other place as the Lender may designate in writing, the principal sum of ${loanAmt} (the "Loan Amount"), and agrees to be bound by the terms and conditions set forth in this Promissory Note (the "Agreement").`,
    false, 3
  );

  /* ── Section I ───────────────────────────────────────────────────────────── */
  p("I.  TERMS OF REPAYMENT", true, 1.2);

  p("a.  Payments", true, 1);
  const install      = values.monthlyInstallment ? `$${values.monthlyInstallment}` : "$--------";
  const firstPayment = values.firstPaymentDate   || "__________";
  const dueDate      = values.dueDate             || "<insert date>";
  p(
    `The Borrower shall repay the Loan Amount in monthly installments of ${install}, commencing on ${firstPayment}, and continuing until ${dueDate} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`
  );
  pInlineBold(
    "Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ",
    "zero percent (0%) per annum",
    " until paid in full.",
    2.5
  );

  p("b.  Application of Payments", true, 1);
  p(
    "All payments made pursuant to this Agreement shall be applied first to accrued interest, if any, and thereafter to principal.",
    false, 2.5
  );

  p("c.  Late Fee", true, 1);
  const lateFee  = values.lateFeeAmount ? `$${values.lateFeeAmount}` : "$--------";
  const lateDays = values.lateDays || "___";
  p(
    `The Borrower agrees to pay a late charge of ${lateFee} for each installment that remains unpaid more than ${lateDays} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not, under any circumstances, be deemed to cure a default arising from such late payment.`,
    false, 2.5
  );

  p("d.  Acceleration of Debt", true, 1);
  p(
    "If any payment obligation under this Agreement is not paid when due, the remaining unpaid principal balance together with any accrued interest shall, at the option of the Lender, become immediately due and payable.",
    false, 3
  );

  /* ── Section II ──────────────────────────────────────────────────────────── */
  p("II.  PREPAYMENT", true, 1.2);
  p(
    "The Borrower may prepay this loan, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest is paid through the date of prepayment.",
    false, 3
  );

  /* ── Section III ─────────────────────────────────────────────────────────── */
  p("III.  COLLECTION COSTS", true, 1.2);
  p(
    "If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all costs of collection incurred by the Lender, including reasonable attorneys' fees, whether or not legal proceedings are initiated.",
    false, 3
  );

  /* ── Section IV ──────────────────────────────────────────────────────────── */
  p("IV.  EVENTS OF DEFAULT", true, 1.2);
  p(
    "Upon the occurrence of any of the following events of default, this Agreement and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:",
    false, 1.5
  );
  lettered("a", "Failure of the Borrower to pay any principal or accrued interest when due;");
  lettered("b", "Liquidation, dissolution, incompetency, or death of the Borrower;");
  lettered("c", "Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  lettered("d", "Application for the appointment of a receiver for the Borrower;");
  lettered("e", "Making of a general assignment for the benefit of the Borrower's creditors;");
  lettered("f", "Insolvency of the Borrower;");
  lettered("g", "Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit; or");
  lettered("h", "Sale of a material portion of the Borrower's business or assets.", 3);

  /* ── Section V ───────────────────────────────────────────────────────────── */
  p("V.  SEVERABILITY", true, 1.2);
  p(
    "If any provision of this Agreement is determined to be unenforceable, in whole or in part, for any reason, such determination shall not affect the enforceability of the remaining provisions, which shall remain in full force and effect.",
    false, 3
  );

  /* ── Section VI ──────────────────────────────────────────────────────────── */
  p("VI.  MISCELLANEOUS", true, 1.2);
  p("All payments of principal and interest under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p(
    "No delay or failure by the Lender to enforce any right under this Agreement, no assignment of this Agreement, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Agreement without notice to the Borrower. All rights of the Lender are cumulative and may be exercised concurrently or consecutively."
  );
  p(
    "This Agreement may not be amended or modified except by a written instrument approved by the holder of this Agreement.",
    false, 3
  );

  /* ── Section VII ─────────────────────────────────────────────────────────── */
  p("VII.  GOVERNING LAW", true, 1.2);
  const govLaw = values.governingLaw || "__________";
  p(
    `This Promissory Note shall be governed by and construed in accordance with the laws of ${govLaw}.`,
    false, 3
  );

  /* ── Section VIII ────────────────────────────────────────────────────────── */
  p("VIII.  EXECUTION", true, 1.2);
  p(
    `This Agreement shall be executed by ${borrower} and ${lender}.`,
    false, 3
  );

  /* ── Signature Page ──────────────────────────────────────────────────────── */
  p("SIGNATURE PAGE", true, 1.2);
  p(
    "IN WITNESS WHEREOF, this Promissory Note has been executed and delivered in accordance with applicable law as of the date first written above."
  );
  const exDay   = values.executedDay   || "___";
  const exMonth = values.executedMonth || "__________";
  const exYear  = values.executedYear  || "____";
  const exAt    = values.executedAt    || "__________";
  p(`Executed this ${exDay} day of ${exMonth}, ${exYear}, at ${exAt}.`, false, 3);

  p("BORROWER:", true, 1);
  uf("Signature", "", 30);
  uf("Date", values.borrowerDate, 20, 4);

  p("LENDER:", true, 1);
  uf("Signature", "", 30);
  uf("Date", values.lenderDate, 20, 4);

  /* ── Assignment ──────────────────────────────────────────────────────────── */
  p("ASSIGNMENT", true, 1.2);
  p("(Complete only if assigning payments to a new party)", false, 1.5);
  const assignee      = values.assigneeName      || "__________";
  const assigneeCS    = values.assigneeCityState  || "__________, __________";
  const assigneeCtry  = values.assigneeCountry    || "__________";
  p(
    `For value received, the foregoing Promissory Note is hereby assigned and transferred to ${assignee} (the "Assignee"), of ${assigneeCS} (City, State/Province), ${assigneeCtry} (Country).`
  );
  uf("Dated", values.assignmentDate, 20, 4);

  /* ── Important Details ───────────────────────────────────────────────────── */
  p("IMPORTANT DETAILS", true, 1.2);
  p(
    "This Promissory Note should be reviewed periodically to ensure compliance with its terms. In the event the Borrower fails to make any payment when due, the Lender should promptly notify the Borrower and advise of any applicable penalties or remedies arising from such default."
  );

  doc.save("promissory_note.pdf");
};

export default function PromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="promissorynote"
    />
  );
}