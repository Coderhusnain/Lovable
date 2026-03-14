import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Terms",
    fields: [
      { name: "principalAmount",       label: "Principal amount ($)",          type: "text", required: false },
      { name: "noteDate",              label: "Note date",                     type: "date", required: false },
      { name: "borrowerName",          label: "Borrower name",                 type: "text", required: false },
      { name: "borrowerAddress",       label: "Borrower address",              type: "text", required: false },
      { name: "lenderName",            label: "Lender name",                   type: "text", required: false },
      { name: "paymentPlace",          label: "Payment place",                 type: "text", required: false },
      { name: "interestStartDate",     label: "Interest start date",           type: "date", required: false },
      { name: "interestRate",          label: "Interest rate (%)",             type: "text", required: false },
      { name: "installmentAmount",     label: "Monthly installment ($)",       type: "text", required: false },
      { name: "installmentStartDate",  label: "Installment start date",        type: "date", required: false },
      { name: "dueDate",               label: "Due date",                      type: "date", required: false },
      { name: "postDueInterestRate",   label: "Post-due interest rate (%)",    type: "text", required: false },
      { name: "lateCharge",            label: "Late charge ($)",               type: "text", required: false },
      { name: "lateDays",              label: "Late days threshold",           type: "text", required: false },
      { name: "governingLawState",     label: "Governing law state",           type: "text", required: false },
      { name: "guarantorName",         label: "Guarantor name",                type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "borrowerSignName",   label: "Borrower printed name",              type: "text", required: false },
      { name: "borrowerSignDate",   label: "Borrower date",                      type: "date", required: false },
      { name: "lenderSignName",     label: "Lender printed name",                type: "text", required: false },
      { name: "lenderSignDate",     label: "Lender date",                        type: "date", required: false },
      { name: "guarantorSignName",  label: "Guarantor printed name",             type: "text", required: false },
      { name: "guarantorSignDate",  label: "Guarantor date",                     type: "date", required: false },
      { name: "assigneeName",       label: "Assignee name (optional)",           type: "text", required: false },
      { name: "assigneeCity",       label: "Assignee city (optional)",           type: "text", required: false },
      { name: "assigneeState",      label: "Assignee state/province (optional)", type: "text", required: false },
      { name: "assigneeCountry",    label: "Assignee country (optional)",        type: "text", required: false },
      { name: "assignmentDate",     label: "Assignment date (optional)",         type: "date", required: false },
      { name: "assignmentBy",       label: "Assigned by (optional)",             type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc   = new jsPDF({ unit: "mm", format: "a4" });
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

  /* ── major section heading  (bold, centred, underlined) ────────────────── */
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

  /* ── sub-heading  (bold, left-aligned, small gap above) ────────────────── */
  const subH = (text: string) => {
    y += 2;
    p(text, true, 1.5);
  };

  /* ── bold label + normal value inline  e.g. "Principal Amount: $500" ───── */
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

  /* ── bold signature block label  e.g. "BORROWER" centred ──────────────── */
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
    doc.text(`${letter}.`, m + 1, y);
    doc.text(lines, ix, y);
    y += lines.length * lh + gap;
  };

  /* ════════════════════════════════════════════════════════════════════════
     TITLE
  ════════════════════════════════════════════════════════════════════════ */
  setB(13);
  const title = "PROMISSORY NOTE DUE ON A SPECIFIC DATE";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.45);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 13;

  /* ── Header fields ─────────────────────────────────────────────────────── */
  boldLabel("Principal Amount: ", v.principalAmount ? `$${v.principalAmount}` : "$-------");
  boldLabel("Date: ", v.noteDate || "__________", 4);

  /* ── Opening paragraph ─────────────────────────────────────────────────── */
  const borrower   = v.borrowerName        || "__________";
  const bAddr      = v.borrowerAddress     || "__________";
  const lender     = v.lenderName          || "__________";
  const payPlace   = v.paymentPlace        || "__________";
  const principal  = v.principalAmount     ? `$${v.principalAmount}` : "$------";
  const intStart   = v.interestStartDate   || "__________";
  const intRate    = v.interestRate        || "------";

  p(
    `FOR VALUE RECEIVED, the undersigned ${borrower} (the "Borrower"), of ${bAddr}, hereby promises to pay to the order of ${lender} (the "Lender"), at ${payPlace}, or at such other place as the Lender may designate in writing, the principal sum of ${principal}, together with interest accruing from ${intStart} on the unpaid principal balance at the rate of ${intRate} percent (${intRate}%) per annum, all in accordance with the terms of this Promissory Note Due on a Specific Date (the "Note").`,
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION I
  ════════════════════════════════════════════════════════════════════════ */
  secH("I.  TERMS OF REPAYMENT");

  subH("1.1  Installment Payments");
  const install   = v.installmentAmount    ? `$${v.installmentAmount}` : "$-------";
  const instStart = v.installmentStartDate || "__________";
  const dueDate   = v.dueDate              || "__________";
  const postRate  = v.postDueInterestRate  || "-------";

  p(
    `The unpaid principal balance and any accrued interest shall be payable in monthly installments of ${install}, commencing on ${instStart}, and continuing until ${dueDate} (the "Due Date"), at which time any remaining unpaid principal balance and accrued interest shall be due and payable in full.`
  );
  p(
    `Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ${postRate} percent (${postRate}%) per annum until paid in full.`,
    false, 3
  );

  subH("1.2  Application of Payments");
  p(
    "All payments made under this Note shall be applied first to accrued interest, if any, and thereafter to principal.",
    false, 3
  );

  subH("1.3  Late Charges");
  const lateCharge = v.lateCharge ? `$${v.lateCharge}` : "$---------";
  const lateDays   = v.lateDays   || "__________";
  p(
    `The Borrower agrees to pay a late charge of ${lateCharge} for each installment that remains unpaid more than ${lateDays} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not, under any circumstances, be deemed to cure or waive any default arising from such late payment.`,
    false, 3
  );

  subH("1.4  Acceleration");
  p(
    "If the Borrower fails to make any payment when due under this Note, the Lender may, at its option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.",
    false, 3
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION II
  ════════════════════════════════════════════════════════════════════════ */
  secH("II.  PREPAYMENT");
  p(
    "The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty. Any such prepayment shall be applied to the principal installments in inverse order of maturity and shall be accompanied by payment of all accrued interest on the amount prepaid through the date of prepayment.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION III
  ════════════════════════════════════════════════════════════════════════ */
  secH("III.  COLLECTION COSTS");
  p(
    "If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs incurred by the Lender in connection with the collection of amounts due hereunder, including reasonable attorneys' fees, whether or not legal proceedings are commenced.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION IV — Events of Default (lettered list)
  ════════════════════════════════════════════════════════════════════════ */
  secH("IV.  EVENTS OF DEFAULT");
  p(
    "The occurrence of any of the following shall constitute an event of default, upon which this Note and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:",
    false, 2
  );
  lettered("a", "Failure of the Borrower to pay any principal or accrued interest when due;");
  lettered("b", "Liquidation, dissolution, incompetency, or death of the Borrower;");
  lettered("c", "Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  lettered("d", "Application for the appointment of a receiver for the Borrower;");
  lettered("e", "Making of a general assignment for the benefit of the Borrower's creditors;");
  lettered("f", "Insolvency of the Borrower;");
  lettered("g", "Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit;");
  lettered("h", "Sale of a material portion of the Borrower's business or assets.", 4);

  /* ════════════════════════════════════════════════════════════════════════
     SECTION V
  ════════════════════════════════════════════════════════════════════════ */
  secH("V.  SEVERABILITY");
  p(
    "If any provision of this Note is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION VI
  ════════════════════════════════════════════════════════════════════════ */
  secH("VI.  MISCELLANEOUS");
  p("All payments of principal and interest under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p(
    "No delay or failure by the Lender to enforce any right under this Note, no assignment of this Note, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Note without notice to the Borrower. All rights and remedies of the Lender under this Note are cumulative and may be exercised concurrently or consecutively at the Lender's option."
  );
  p(
    "This Note may not be amended or modified except by a written instrument approved by the holder of this Note.",
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION VII
  ════════════════════════════════════════════════════════════════════════ */
  secH("VII.  GOVERNING LAW");
  p(
    `This Note shall be governed by and construed in accordance with the laws of the State of ${v.governingLawState || "__________"}.`,
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION VIII
  ════════════════════════════════════════════════════════════════════════ */
  secH("VIII.  GUARANTY");
  const guarantor = v.guarantorName || "__________";
  p(
    `${guarantor} hereby unconditionally guarantees the full and punctual payment and performance of all obligations of the Borrower under this Note. The Guarantor agrees that any modification of the terms of payment or any extension of time for payment shall not impair or release the Guarantor's obligations and expressly consents to any such modifications or extensions.`,
    false, 4
  );

  /* ════════════════════════════════════════════════════════════════════════
     SECTION IX
  ════════════════════════════════════════════════════════════════════════ */
  secH("IX.  EXECUTION AND SIGNATURES");
  p(
    "This Note shall be executed by the Borrower and the Lender and shall also be co-signed by the Guarantor.",
    false, 2
  );
  p(
    "IN WITNESS WHEREOF, this Note has been executed and delivered in accordance with applicable law as of the date first written above.",
    false, 4
  );

  /* ── Signature blocks ──────────────────────────────────────────────────── */
  sigBlock("BORROWER");
  uf("Name",      v.borrowerSignName, 28);
  uf("Signature", "",                 32);
  uf("Date",      v.borrowerSignDate, 22, 5);

  sigBlock("LENDER");
  uf("Name",      v.lenderSignName,   28);
  uf("Signature", "",                 32);
  uf("Date",      v.lenderSignDate,   22, 5);

  sigBlock("CO-SIGNER / GUARANTOR");
  uf("Name",      v.guarantorSignName,  28);
  uf("Signature", "",                   32);
  uf("Date",      v.guarantorSignDate,  22, 5);

  /* ════════════════════════════════════════════════════════════════════════
     ASSIGNMENT
  ════════════════════════════════════════════════════════════════════════ */
  secH("ASSIGNMENT");

  setN(10);
  doc.setFont("helvetica", "italic");
  guard(lh + 3);
  doc.text("(Complete only if assigning payments to a new party)", pageW / 2, y, { align: "center" });
  y += lh + 3;

  const assignee  = v.assigneeName    || "__________";
  const aCity     = v.assigneeCity    || "__________";
  const aState    = v.assigneeState   || "__________";
  const aCountry  = v.assigneeCountry || "__________";
  p(
    `For value received, the foregoing Note is hereby assigned and transferred to ${assignee} (the "Assignee"), of ${aCity} (City), ${aState} (State/Province), ${aCountry} (Country).`,
    false, 3
  );
  uf("Dated", v.assignmentDate, 24);
  uf("By",    v.assignmentBy,   30);

  doc.save("promissory_note_due_specific_date.pdf");
};

export default function PromissoryNoteDueOnSpecificDateForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note Due on a Specific Date"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="promissorynotedueonspecificdate"
    />
  );
}