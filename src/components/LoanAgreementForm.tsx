import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Details",
    fields: [
      { name: "loanAmount",       label: "Loan amount ($)",              type: "text", required: false },
      { name: "agreementDate",    label: "Date",                         type: "date", required: false },
      { name: "borrowerName",     label: "Borrower name",                type: "text", required: false },
      { name: "borrowerAddress1", label: "Borrower address line 1",      type: "text", required: false },
      { name: "borrowerAddress2", label: "Borrower address line 2",      type: "text", required: false },
      { name: "lenderName",       label: "Lender name",                  type: "text", required: false },
      { name: "lenderAddress",    label: "Lender address",               type: "text", required: false },
      { name: "paymentPlace",     label: "Payment place",                type: "text", required: false },
      { name: "principalAmount",  label: "Principal amount ($)",         type: "text", required: false },
      { name: "installmentAmount",label: "Monthly installment ($)",      type: "text", required: false },
      { name: "commenceDate",     label: "Commencement date",            type: "date", required: false },
      { name: "dueDate",          label: "Due date",                     type: "date", required: false },
      { name: "lateCharge",       label: "Late charge ($)",              type: "text", required: false },
      { name: "lateDays",         label: "Late days threshold",          type: "text", required: false },
      { name: "governingLaw",     label: "Governing law (state)",        type: "text", required: false },
    ],
  },
  {
    label: "Assignment & Execution",
    fields: [
      { name: "assignee",         label: "Assignee name",                type: "text", required: false },
      { name: "assigneeCity",     label: "Assignee city",                type: "text", required: false },
      { name: "assigneeCountry",  label: "Assignee country",             type: "text", required: false },
      { name: "assignmentDate",   label: "Assignment date",              type: "date", required: false },
      { name: "executedDay",      label: "Executed day",                 type: "text", required: false },
      { name: "executedMonth",    label: "Executed month",               type: "text", required: false },
      { name: "executedYear",     label: "Executed year",                type: "text", required: false },
      { name: "executedAt",       label: "Executed at (city/place)",     type: "text", required: false },
      { name: "borrowerSignName", label: "Borrower printed name",        type: "text", required: false },
      { name: "borrowerDate",     label: "Borrower signature date",      type: "date", required: false },
      { name: "lenderSignName",   label: "Lender printed name",          type: "text", required: false },
      { name: "lenderDate",       label: "Lender signature date",        type: "date", required: false },
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
  const setN = (sz = 10.5) => { doc.setFont("helvetica", "normal"); doc.setFontSize(sz); };
  const setB = (sz = 10.5) => { doc.setFont("helvetica", "bold");   doc.setFontSize(sz); };

  /* ── page-break guard ──────────────────────────────────────────────────── */
  const guard = (need = lh + 2) => {
    if (y + need > limit) { doc.addPage(); y = 22; }
  };

  /* ── plain paragraph ───────────────────────────────────────────────────── */
  const p = (text: string, bold = false, gap = 2.5) => {
    if (bold) setB(); else setN();
    const lines = doc.splitTextToSize(text, tw);
    guard(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  /* ── major section heading  bold · centred · underlined ───────────────── */
  const secH = (text: string) => {
    y += 3;
    guard(lh + 8);
    setB(10.5);
    doc.text(text, pageW / 2, y, { align: "center" });
    const hw = doc.getTextWidth(text);
    doc.setLineWidth(0.35);
    doc.line(pageW / 2 - hw / 2, y + 1.3, pageW / 2 + hw / 2, y + 1.3);
    y += lh + 4;
  };

  /* ── sub-heading  bold · left-aligned ─────────────────────────────────── */
  const subH = (text: string) => {
    y += 2;
    p(text, true, 1.5);
  };

  /* ── bold label + normal value inline  e.g. "Loan Amount: $500" ────────── */
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
  const uf = (label: string, value?: string, minChars = 26, gap = 2.5) => {
    guard(lh + gap);
    setN();
    const labelTxt = `${label}: `;
    doc.text(labelTxt, m, y);
    const x     = m + doc.getTextWidth(labelTxt);
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

  /* ── bold signature block label ───────────────────────────────────────── */
  const sigBlock = (label: string) => {
    y += 4;
    guard(lh + 4);
    setB();
    doc.text(label, m, y);
    y += lh + 1;
  };

  /* ── lettered list item  (a) text… ────────────────────────────────────── */
  const lettered = (letter: string, text: string, gap = 2) => {
    const ix    = m + 8;
    const lines = doc.splitTextToSize(text, tw - 8);
    guard(lines.length * lh + gap);
    setN();
    doc.text(`(${letter})`, m + 1, y);
    doc.text(lines, ix, y);
    y += lines.length * lh + gap;
  };

  /* ════════════════════════════════════════════════════════════════════════
     TITLE
  ════════════════════════════════════════════════════════════════════════ */
  setB(13);
  const title = "LOAN AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.45);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 13;

  /* ── Header fields ─────────────────────────────────────────────────────── */
  boldLabel("Loan Amount: ", values.loanAmount ? `$${values.loanAmount}` : "$----------");
  boldLabel("Date: ", values.agreementDate || "__________", 4);

  /* ── Opening paragraphs ────────────────────────────────────────────────── */
  const borrower  = values.borrowerName     || "__________";
  const bAddr1    = values.borrowerAddress1 || "__________";
  const bAddr2    = values.borrowerAddress2 || "__________";
  const lender    = values.lenderName       || "__________";
  const lAddr     = values.lenderAddress    || "__________";
  const payPlace  = values.paymentPlace     || "__________";
  const principal = values.principalAmount  ? `$${values.principalAmount}` : "$-------";

  p(
    `This Loan Agreement (the "Agreement") is made and entered into as of the date set forth above, by and between ${borrower}, of ${bAddr1}, ${bAddr2} (the "Borrower"), and ${lender}, of ${lAddr} (the "Lender").`,
    false, 3
  );
  p(
    `For value received, the Borrower hereby promises to pay to the order of the Lender, at ${payPlace}, or at such other place as the Lender may designate in writing, the principal sum of ${principal} (the "Loan Amount"), subject to the terms and conditions set forth herein.`,
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 1 — TERMS OF REPAYMENT
  ════════════════════════════════════════════════════════════════════════ */
  secH("1.  TERMS OF REPAYMENT");

  subH("1.1  Installment Payments");
  const install    = values.installmentAmount ? `$${values.installmentAmount}` : "$------";
  const commence   = values.commenceDate      || "__________";
  const dueDate    = values.dueDate           || "<insert date>";

  p(
    `The Borrower shall repay the Loan Amount in monthly installments of ${install}, commencing on ${commence}, and continuing until ${dueDate} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`
  );
  p(
    "Any unpaid principal remaining after the Due Date shall accrue interest at the rate of zero percent (0%) per annum until paid in full.",
    false, 3
  );

  subH("1.2  Application of Payments");
  p(
    "All payments made under this Agreement shall be applied first to accrued interest, if any, and thereafter to principal.",
    false, 3
  );

  subH("1.3  Late Charges");
  const lateCharge = values.lateCharge ? `$${values.lateCharge}` : "$-------";
  const lateDays   = values.lateDays   || "___";
  p(
    `The Borrower agrees to pay a late charge of ${lateCharge} for each installment that remains unpaid more than ${lateDays} day(s) after its due date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of a late charge shall not, under any circumstances, be deemed to cure or waive any default arising from such late payment.`,
    false, 3
  );

  subH("1.4  Acceleration");
  p(
    "If the Borrower fails to make any payment when due under this Agreement, the Lender may, at its option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.",
    false, 3
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 2
  ════════════════════════════════════════════════════════════════════════ */
  secH("2.  PREPAYMENT");
  p(
    "The Borrower may prepay this loan, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 3
  ════════════════════════════════════════════════════════════════════════ */
  secH("3.  COLLECTION COSTS");
  p(
    "If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all reasonable costs of collection incurred by the Lender, including attorneys' fees, whether or not legal proceedings are commenced.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 4 — EVENTS OF DEFAULT  (lettered list)
  ════════════════════════════════════════════════════════════════════════ */
  secH("4.  EVENTS OF DEFAULT");
  p(
    "The occurrence of any of the following shall constitute an event of default, upon which this Agreement and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:",
    false, 2
  );
  lettered("a", "Failure to pay principal or accrued interest when due;");
  lettered("b", "Liquidation, dissolution, incompetency, or death of the Borrower;");
  lettered("c", "Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  lettered("d", "Application for the appointment of a receiver for the Borrower;");
  lettered("e", "Making of a general assignment for the benefit of creditors;");
  lettered("f", "Insolvency of the Borrower;");
  lettered("g", "Any misrepresentation by the Borrower made for the purpose of obtaining or extending credit; or");
  lettered("h", "Sale of a material portion of the Borrower's business or assets.", 4);

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 5
  ════════════════════════════════════════════════════════════════════════ */
  secH("5.  SEVERABILITY");
  p(
    "If any provision of this Agreement is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 6
  ════════════════════════════════════════════════════════════════════════ */
  secH("6.  MISCELLANEOUS");
  p("All payments under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p(
    "No delay or failure by the Lender to exercise any right under this Agreement, no assignment of this Agreement, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall constitute a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Agreement without notice to the Borrower. All rights of the Lender are cumulative and may be exercised concurrently or consecutively."
  );
  p(
    "This Agreement may not be amended or modified except by a written instrument approved by the holder of this Agreement.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 7
  ════════════════════════════════════════════════════════════════════════ */
  secH("7.  GOVERNING LAW");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`,
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 8
  ════════════════════════════════════════════════════════════════════════ */
  secH("8.  ASSIGNMENT");
  const assignee  = values.assignee      || "__________";
  const aCity     = values.assigneeCity  || "__________";
  const aCountry  = values.assigneeCountry || "__________";
  p(
    `The Lender may assign this Agreement and the payments due hereunder. Any such assignment shall be effective upon transfer to ${assignee} (the "Assignee"), of ${aCity}, ${aCountry} (City/State/Province, Country), for value received.`,
    false, 2
  );
  uf("Dated", values.assignmentDate, 22, 4);

  /* ════════════════════════════════════════════════════════════════════════
     SECTION 9
  ════════════════════════════════════════════════════════════════════════ */
  secH("9.  EXECUTION");
  p(
    "IN WITNESS WHEREOF, the parties have executed this Loan Agreement as of the date first written above."
  );
  const exDay   = values.executedDay   || "___";
  const exMonth = values.executedMonth || "__________";
  const exYear  = values.executedYear  || "____";
  const exAt    = values.executedAt    || "__________";
  p(
    `Executed this ${exDay} day of ${exMonth}, ${exYear}, at ${exAt}.`,
    false, 5
  );

  /* ── Signature blocks ──────────────────────────────────────────────────── */
  sigBlock("BORROWER:");
  uf("Name",      values.borrowerSignName, 28);
  uf("Signature", "",                      32);
  uf("Date",      values.borrowerDate,     22, 5);

  sigBlock("LENDER:");
  uf("Name",      values.lenderSignName,   28);
  uf("Signature", "",                      32);
  uf("Date",      values.lenderDate,       22);

  doc.save("loan_agreement.pdf");
};

export default function LoanAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Loan Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="loanagreement"
    />
  );
}