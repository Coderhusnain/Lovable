import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Details",
    fields: [
      { name: "principalAmount",     label: "Principal amount ($)",              type: "text", required: false },
      { name: "noteDate",            label: "Date",                              type: "date", required: false },
      { name: "borrowerName",        label: "Borrower name",                     type: "text", required: false },
      { name: "borrowerAddress",     label: "Borrower address",                  type: "text", required: false },
      { name: "lenderName",          label: "Lender name",                       type: "text", required: false },
      { name: "lenderAddress",       label: "Lender address",                    type: "text", required: false },
      { name: "interestStartDate",   label: "Interest accrual start date",       type: "date", required: false },
      { name: "interestRate",        label: "Interest rate (percent)",           type: "text", required: false },
      { name: "interestRateWords",   label: "Interest rate (words)",             type: "text", required: false },
    ],
  },
  {
    label: "Repayment Terms",
    fields: [
      { name: "installmentAmount",   label: "Monthly installment amount ($)",    type: "text", required: false },
      { name: "firstPaymentDate",    label: "First payment date",                type: "date", required: false },
      { name: "dueDate",             label: "Final due date",                    type: "date", required: false },
      { name: "defaultInterestRate", label: "Post-due-date interest rate (%)",   type: "text", required: false },
      { name: "defaultInterestWords",label: "Post-due-date interest (words)",    type: "text", required: false },
      { name: "lateCharge",          label: "Late charge amount ($)",            type: "text", required: false },
      { name: "lateDays",            label: "Grace period (days)",               type: "text", required: false },
      { name: "governingState",      label: "Governing law state",               type: "text", required: false },
      { name: "guarantorName",       label: "Guarantor name",                    type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "borrowerSignName",    label: "Borrower name",                     type: "text", required: false },
      { name: "borrowerBy",          label: "Borrower signature (typed)",        type: "text", required: false },
      { name: "borrowerDate",        label: "Borrower date",                     type: "date", required: false },
      { name: "guarantorSignName",   label: "Co-signer / Guarantor name",        type: "text", required: false },
      { name: "guarantorBy",         label: "Co-signer / Guarantor signature (typed)", type: "text", required: false },
      { name: "guarantorDate",       label: "Co-signer / Guarantor date",        type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w   = 210;
  const m   = 18;
  const tw  = w - m * 2;
  const lh  = 5.7;
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

  const bullet = (text: string, gap = 1.6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = m + 5;
    const lines  = doc.splitTextToSize(text, tw - 5);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 1, y);
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // Roman-numeral section heading — bold 12pt, gap above and below
  const heading = (text: string, gapBefore = 3.5, gapAfter = 2.0) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
    doc.setFontSize(10.5); // reset
  };

  // sub-heading (1.1, 1.2 etc) — bold 10.5pt, gap before and after
  const subheading = (text: string, gapBefore = 2.0, gapAfter = 1.4) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  // underline field "Label: ___"
  const uf = (label: string, value?: string, lineLen = 28, gap = 2.4) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    const blankW = doc.getTextWidth("_".repeat(lineLen));
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(blankW, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + blankW, y + 1.1);
    }
    y += lh + gap;
  };

  const val = (key: string, fallback = "__________") =>
    (values[key] || "").trim() || fallback;

  // ── Title — bold, centred, underlined ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "INSTALLMENT PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 11;

  // ── Header fields ─────────────────────────────────────────────────────────
  p(`Principal Amount: $${(values.principalAmount || "").trim() || "------"},`, true);
  p(`Date: ${val("noteDate")}`, true);
  y += 1;

  // ── Opening paragraph ─────────────────────────────────────────────────────
  // Draft: FOR VALUE RECEIVED, the undersigned __________ (the "Borrower"), of __________,
  //        hereby promises to pay to the order of __________ (the "Lender"), at __________,
  //        or at such other place as the Lender may designate in writing, the principal sum
  //        of $------, together with interest accruing from __________ on the unpaid principal
  //        balance at the rate of --------- percent--------- per annum, all in accordance with
  //        the terms of this Installment Promissory Note (the "Note").
  p(
    `FOR VALUE RECEIVED, the undersigned ${val("borrowerName")} (the \u201cBorrower\u201d), of ${val("borrowerAddress")}, hereby promises to pay to the order of ${val("lenderName")} (the \u201cLender\u201d), at ${val("lenderAddress")}, or at such other place as the Lender may designate in writing, the principal sum of $${val(values.principalAmount ? "principalAmount" : "", "------")}, together with interest accruing from ${val("interestStartDate")} on the unpaid principal balance at the rate of ${val(values.interestRate ? "interestRate" : "", "---------")} percent ${val(values.interestRateWords ? "interestRateWords" : "", "---------")} per annum, all in accordance with the terms of this Installment Promissory Note (the \u201cNote\u201d).`
  );

  // ── I. TERMS OF REPAYMENT ─────────────────────────────────────────────────
  heading("I. TERMS OF REPAYMENT");

  subheading("1.1 Installment Payments");
  // Draft: The unpaid principal and any accrued interest shall be payable in monthly
  //        installments of $------, commencing on __________, and continuing until __________
  //        (the "Due Date"), at which time any remaining unpaid principal balance and accrued
  //        interest shall be immediately due and payable in full.
  p(
    `The unpaid principal and any accrued interest shall be payable in monthly installments of $${val(values.installmentAmount ? "installmentAmount" : "", "------")}, commencing on ${val("firstPaymentDate")}, and continuing until ${val("dueDate")} (the \u201cDue Date\u201d), at which time any remaining unpaid principal balance and accrued interest shall be immediately due and payable in full.`
  );
  // Draft: Any unpaid principal remaining after the Due Date shall accrue interest at the
  //        rate of ------- percent (-------%) per annum until paid in full.
  p(
    `Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ${val(values.defaultInterestWords ? "defaultInterestWords" : "", "-------")} percent (${val(values.defaultInterestRate ? "defaultInterestRate" : "", "-------")}%) per annum until paid in full.`
  );

  subheading("1.2 Application of Payments");
  p("All payments made under this Note shall be applied first to accrued interest, if any, and thereafter to principal.");

  subheading("1.3 Late Charges");
  // Draft: The Borrower agrees to pay a late charge of ------ for each installment that
  //        remains unpaid more than ___ day(s) after its Due Date.
  p(
    `The Borrower agrees to pay a late charge of ${val(values.lateCharge ? "lateCharge" : "", "------")} for each installment that remains unpaid more than ${val(values.lateDays ? "lateDays" : "", "___")} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not be deemed to cure, waive, or otherwise affect any default arising from such late payment.`
  );

  subheading("1.4 Acceleration");
  p("If the Borrower fails to make any payment when due under this Note, the Lender may, at its sole option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.");

  // ── II. PREPAYMENT ────────────────────────────────────────────────────────
  heading("II. PREPAYMENT");
  p("The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.");

  // ── III. COLLECTION COSTS ─────────────────────────────────────────────────
  heading("III. COLLECTION COSTS");
  p("If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs incurred by the Lender in connection with the collection of amounts due hereunder, including reasonable attorneys\u2019 fees, whether or not legal proceedings are initiated.");

  // ── IV. EVENTS OF DEFAULT ─────────────────────────────────────────────────
  heading("IV. EVENTS OF DEFAULT");
  p("The occurrence of any of the following shall constitute an event of default, upon which this Note and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("A. Failure of the Borrower to pay any principal or accrued interest when due;");
  p("B. Death of the Borrower or the Lender;");
  p("C. Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("D. Application for the appointment of a receiver for the Borrower;");
  p("E. Making of a general assignment for the benefit of the Borrower\u2019s creditors;");
  p("F. Insolvency of the Borrower;");
  p("G. Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit.");

  // ── V. SEVERABILITY ───────────────────────────────────────────────────────
  heading("V. SEVERABILITY");
  p("If any provision of this Note is held to be invalid or unenforceable, in whole or in part, such determination shall not affect the validity or enforceability of the remaining provisions, which shall remain in full force and effect.");

  // ── VI. MISCELLANEOUS ─────────────────────────────────────────────────────
  heading("VI. MISCELLANEOUS");
  p("All payments of principal and any interest under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to exercise any right under this Note, no assignment of this Note, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall constitute a waiver of the Lender\u2019s right to thereafter enforce strict compliance with the terms of this Note without notice to the Borrower. All rights and remedies of the Lender under this Note are cumulative and may be exercised concurrently or consecutively.");

  // ── VII. GOVERNING LAW ────────────────────────────────────────────────────
  heading("VII. GOVERNING LAW");
  p(`This Note shall be governed by and construed in accordance with the laws of the State of ${val("governingState")}.`);

  // ── VIII. GUARANTY ────────────────────────────────────────────────────────
  heading("VIII. GUARANTY");
  p(
    `${val("guarantorName")} hereby unconditionally guarantees the full and punctual payment and performance of all obligations of the Borrower under this Note. The Guarantor agrees that any modification of the terms of payment or any extension of time for payment shall not impair or release the Guarantor\u2019s obligations hereunder, and the Guarantor expressly consents to any such modifications or extensions.`
  );

  // ── IX. EXECUTION ─────────────────────────────────────────────────────────
  heading("IX. EXECUTION");
  p("This Note shall be executed by the Borrower and shall also be co-signed by the Guarantor.");

  // ── Witness block ─────────────────────────────────────────────────────────
  y += 4;
  p("IN WITNESS WHEREOF, the parties have executed this Installment Promissory Note as of the date first written above.");

  y += 4;
  p("BORROWER:", true, 1.5);
  uf("Name", values.borrowerSignName, 30);
  uf("By",   values.borrowerBy,       30);
  uf("Date", values.borrowerDate,     30, 5);

  p("CO-SIGNER / GUARANTOR:", true, 1.5);
  uf("Name", values.guarantorSignName, 30);
  uf("By",   values.guarantorBy,       30);
  uf("Date", values.guarantorDate,     30);

  doc.save("installment_promissory_note.pdf");
};

export default function InstallmentPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Installment Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="installmentpromissorynote"
    />
  );
}