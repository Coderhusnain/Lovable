import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Terms",
    fields: [
      { name: "agreementDate",      label: "Agreement date",                type: "date",  required: true  },
      { name: "loanAmount",         label: "Loan amount ($)",               type: "text",  required: true  },
      { name: "borrowerName",       label: "Borrower name",                 type: "text",  required: true  },
      { name: "borrowerAddress",    label: "Borrower address",              type: "text",  required: true  },
      { name: "lenderName",         label: "Lender name",                   type: "text",  required: true  },
      { name: "lenderAddress",      label: "Lender address",                type: "text",  required: true  },
      { name: "monthlyInstallment", label: "Monthly installment ($)",       type: "text",  required: true  },
      { name: "firstPaymentDate",   label: "First payment date",            type: "date",  required: true  },
      { name: "maturityDate",       label: "Maturity date",                 type: "date",  required: true  },
      { name: "defaultInterestWords", label: "Default interest rate (words, e.g. five)", type: "text", required: true },
      { name: "defaultInterest",    label: "Default interest rate (%, e.g. 5)",          type: "text", required: true },
      { name: "lateCharge",         label: "Late charge amount ($)",        type: "text",  required: true  },
      { name: "lateDays",           label: "Late days threshold",           type: "text",  required: true  },
      { name: "governingLaw",       label: "Governing law (state/country)", type: "text",  required: true  },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "executionDay",       label: "Execution day (e.g. 5th)",      type: "text",  required: true  },
      { name: "executionMonth",     label: "Execution month (e.g. January)",type: "text",  required: true  },
      { name: "executionYear",      label: "Execution year (e.g. 2025)",    type: "text",  required: true  },
      { name: "executionPlace",     label: "Execution place (city/state)",  type: "text",  required: true  },
      { name: "borrowerSignature",  label: "Borrower signature (typed)",    type: "text",  required: true  },
      { name: "borrowerDate",       label: "Borrower date",                 type: "date",  required: true  },
      { name: "lenderSignature",    label: "Lender signature (typed)",      type: "text",  required: true  },
      { name: "lenderDate",         label: "Lender date",                   type: "date",  required: true  },
      { name: "assigneeName",       label: "Assignee name (optional)",      type: "text",  required: false },
      { name: "assigneeLocation",   label: "Assignee city/state/country (optional)", type: "text", required: false },
      { name: "assignmentDate",     label: "Assignment date (optional)",    type: "date",  required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc   = new jsPDF({ unit: "mm", format: "a4" });
  const w     = 210;
  const m     = 16;
  const tw    = w - m * 2;
  const lh    = 5.7;
  const limit = 278;
  let y = 20;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 20; }
  };

  const p = (text: string, bold = false, gap = 2.0) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // indented sub-clause
  const pi = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - 6);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m + 6, y);
    y += lines.length * lh + gap;
  };

  // section heading — bold, gap before
  const heading = (text: string, gapBefore = 3.0, gapAfter = 1.5) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  // sub-heading (a. b. c.) — bold
  const subheading = (text: string, gapBefore = 1.5, gapAfter = 1.2) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    newPageIfNeeded(lh + gapAfter);
    doc.text(text, m, y);
    y += lh + gapAfter;
  };

  // underline field
  const uf = (label: string, value?: string, lineLen = 28, gap = 2.2) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(lineLen)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(lineLen)), y + 1.1);
    }
    y += lh + gap;
  };

  const val = (key: string, fallback = "__________") =>
    (v[key] || "").trim() || fallback;

  // ── Title — bold, centred, underlined ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "PAYMENT AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 10;

  // ── Header ────────────────────────────────────────────────────────────────
  // Draft: "Loan Amount: $<insert amount>"
  // Draft: "Date: __________"
  p(`Loan Amount: $${val("loanAmount", "<insert amount>")}`, true);
  p(`Date: ${val("agreementDate")}`, true);
  y += 1;

  // ── Opening paragraph ─────────────────────────────────────────────────────
  // Draft: FOR VALUE RECEIVED, the undersigned __________ ("Borrower"), residing at __________,
  //        hereby promises to pay to the order of __________ ("Lender"), at __________,
  //        or at such other place as the Lender may designate in writing, the principal sum of
  //        $<insert amount> ("Loan Amount"), subject to and in accordance with the terms and
  //        conditions set forth in this Payment Agreement ("Agreement").
  p(
    `FOR VALUE RECEIVED, the undersigned ${val("borrowerName")} (\u201cBorrower\u201d), residing at ${val("borrowerAddress")}, hereby promises to pay to the order of ${val("lenderName")} (\u201cLender\u201d), at ${val("lenderAddress")}, or at such other place as the Lender may designate in writing, the principal sum of $${val("loanAmount", "<insert amount>")} (\u201cLoan Amount\u201d), subject to and in accordance with the terms and conditions set forth in this Payment Agreement (\u201cAgreement\u201d).`
  );

  // ── I. TERMS OF REPAYMENT ─────────────────────────────────────────────────
  heading("I. TERMS OF REPAYMENT");

  subheading("a. Installment Payments");
  // Draft: The Borrower shall repay the Loan Amount in monthly installments of $<insert amount>,
  //        commencing on __________, and continuing until <insert date> ("Maturity Date"), at which
  //        time any remaining unpaid principal balance shall be immediately due and payable in full.
  p(
    `The Borrower shall repay the Loan Amount in monthly installments of $${val("monthlyInstallment", "<insert amount>")}, commencing on ${val("firstPaymentDate")}, and continuing until ${val("maturityDate", "<insert date>")} (\u201cMaturity Date\u201d), at which time any remaining unpaid principal balance shall be immediately due and payable in full.`
  );
  // Draft: Any unpaid principal balance remaining after the Maturity Date shall accrue interest
  //        at the rate of ------- percent (-----%) per annum until paid in full.
  p(
    `Any unpaid principal balance remaining after the Maturity Date shall accrue interest at the rate of ${val("defaultInterestWords", "-------")} percent (${val("defaultInterest", "-----")}%) per annum until paid in full.`
  );

  subheading("b. Application of Payments");
  p("All payments made pursuant to this Agreement shall be applied first to accrued interest, if any, and thereafter to the outstanding principal balance.");

  subheading("c. Late Charges");
  // Draft: The Borrower agrees to pay a late charge of $<insert amount> for each installment
  //        that remains unpaid more than ___ day(s) after its due date. Such late charge is
  //        agreed upon as liquidated damages and not as a penalty. The payment of any late charge
  //        shall not constitute a waiver of default or cure any default arising from such late payment.
  p(
    `The Borrower agrees to pay a late charge of $${val("lateCharge", "<insert amount>")} for each installment that remains unpaid more than ${val("lateDays", "___")} day(s) after its due date. Such late charge is agreed upon as liquidated damages and not as a penalty. The payment of any late charge shall not constitute a waiver of default or cure any default arising from such late payment.`
  );

  subheading("d. Acceleration");
  p("In the event the Borrower fails to make any payment when due, the Lender may, at its sole option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable without further notice or demand.");

  // ── II. PREPAYMENT ────────────────────────────────────────────────────────
  heading("II. PREPAYMENT");
  p("The Borrower may prepay this loan, in whole or in part, at any time prior to the Maturity Date without penalty or premium.");

  // ── III. COLLECTION COSTS ─────────────────────────────────────────────────
  heading("III. COLLECTION COSTS");
  p("In the event of default, the Borrower agrees to pay all reasonable costs incurred by the Lender in connection with the collection of amounts due under this Agreement, including, without limitation, reasonable attorneys\u2019 fees and expenses, whether or not legal proceedings are commenced.");

  // ── IV. EVENTS OF DEFAULT ─────────────────────────────────────────────────
  heading("IV. EVENTS OF DEFAULT");
  p("Each of the following shall constitute an event of default under this Agreement, upon which the entire indebtedness shall become immediately due and payable, without notice or demand:");
  pi("a. Failure of the Borrower to pay any principal or accrued interest when due;");
  pi("b. The liquidation, dissolution, incompetency, or death of the Borrower;");
  pi("c. The filing of any bankruptcy or insolvency proceeding by or against the Borrower;");
  pi("d. The appointment of a receiver for the Borrower or the Borrower\u2019s assets;");
  pi("e. The making of a general assignment for the benefit of creditors by the Borrower;");
  pi("f. The insolvency of the Borrower;");
  pi("g. Any material misrepresentation made by the Borrower for the purpose of obtaining or extending credit; or");
  pi("h. The sale or transfer of a material portion of the Borrower\u2019s business or assets.");

  // ── V. SEVERABILITY ───────────────────────────────────────────────────────
  heading("V. SEVERABILITY");
  p("If any provision of this Agreement is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect.");

  // ── VI. MISCELLANEOUS ─────────────────────────────────────────────────────
  heading("VI. MISCELLANEOUS");
  p("All payments under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to exercise any right or remedy under this Agreement shall be deemed a waiver thereof. The acceptance of any late or partial payment shall not constitute a waiver of the Lender\u2019s right to demand strict compliance with the terms of this Agreement. All rights and remedies of the Lender are cumulative and may be exercised singly or concurrently.");
  p("This Agreement may not be amended, modified, or supplemented except by a written instrument executed by the Lender.");

  // ── VII. GOVERNING LAW ────────────────────────────────────────────────────
  heading("VII. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${val("governingLaw")}.`);

  // ── VIII. EXECUTION ───────────────────────────────────────────────────────
  heading("VIII. EXECUTION");
  p("This Agreement shall be executed by the Borrower and the Lender.");

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y += 2;
  p("SIGNATURES", true, 1.5);
  p("IN WITNESS WHEREOF, the parties have executed this Payment Agreement as of the date first written above.");
  // Draft: Executed on this ___ day of __________, ___, at __________.
  p(`Executed on this ${val("executionDay", "___")} day of ${val("executionMonth")}, ${val("executionYear", "___")}, at ${val("executionPlace")}.`);

  y += 3;
  // Draft:
  // BORROWER:
  //
  // Date: __________
  p("BORROWER:", true, 1.5);
  uf("Signature", v.borrowerSignature, 32);
  uf("Date",      v.borrowerDate,      20, 4);

  // Draft:
  // LENDER:
  //
  // Date: __________
  p("LENDER:", true, 1.5);
  uf("Signature", v.lenderSignature, 32);
  uf("Date",      v.lenderDate,      20, 4);

  // ── ASSIGNMENT ────────────────────────────────────────────────────────────
  // Draft: (Complete only if assigning this Agreement)
  //        For value received, the undersigned hereby assigns and transfers all rights, title,
  //        and interest in this Payment Agreement to __________ ("Assignee"), of __________
  //        (City/State/Province, Country).
  //        Dated: __________
  y += 3;
  p("ASSIGNMENT", true, 1);
  p("(Complete only if assigning this Agreement)");
  p(
    `For value received, the undersigned hereby assigns and transfers all rights, title, and interest in this Payment Agreement to ${val("assigneeName")} (\u201cAssignee\u201d), of ${val("assigneeLocation", "__________ (City/State/Province, Country)")}.`
  );
  uf("Dated", v.assignmentDate, 24);

  doc.save("payment_agreement.pdf");
};

export default function PaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Payment Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="paymentagreement"
    />
  );
}