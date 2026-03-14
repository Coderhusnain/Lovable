import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "IOU Details",
    fields: [
      { name: "principalAmount", label: "Principal amount", type: "text", required: false },
      { name: "noteDate", label: "Date", type: "date", required: false },
      { name: "borrowerName", label: "Borrower", type: "text", required: false },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: false },
      { name: "lenderName", label: "Lender", type: "text", required: false },
      { name: "paymentLocation", label: "Payment location", type: "text", required: false },
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "monthlyInstallment", label: "Monthly installment", type: "text", required: false },
      { name: "firstPaymentDate", label: "First payment date", type: "date", required: false },
      { name: "dueDate", label: "Due date", type: "date", required: false },
      { name: "interestRate", label: "Interest rate", type: "text", required: false },
      { name: "lateCharge", label: "Late charge", type: "text", required: false },
      { name: "lateDays", label: "Late days", type: "text", required: false },
      { name: "governingLawState", label: "Governing law state", type: "text", required: false },
      { name: "guarantorName", label: "Guarantor", type: "text", required: false },
      { name: "borrowerBy", label: "Borrower by", type: "text", required: false },
      { name: "borrowerSignDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderBy", label: "Lender by", type: "text", required: false },
      { name: "lenderSignDate", label: "Lender date", type: "date", required: false },
      { name: "guarantorBy", label: "Guarantor by", type: "text", required: false },
      { name: "guarantorSignDate", label: "Guarantor date", type: "date", required: false },
      { name: "assigneeName", label: "Assignee", type: "text", required: false },
      { name: "assigneeRegion", label: "Assignee city/state/province", type: "text", required: false },
      { name: "assigneeCountry", label: "Assignee country", type: "text", required: false },
      { name: "assignmentDate", label: "Assignment date", type: "date", required: false },
      { name: "assignmentBy", label: "Assignment by", type: "text", required: false },
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

  // Plain paragraph — pass bold=true for section/sub-section headings
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

  // Bullet point item — • symbol with 6 mm indent, text wraps within indent
  const bullet = (text: string, gap = 1.8) => {
    const indent = m + 6;
    const bulletTw = tw - 6;
    const lines = doc.splitTextToSize(text, bulletTw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("\u2022", m + 1.5, y); // •
    doc.text(lines, indent, y);
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

  // ── Title ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "IOU (ACKNOWLEDGMENT OF DEBT)";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  // ── Header fields ──────────────────────────────────────────────────────────
  p(`Principal Amount: $${values.principalAmount || "-------"}`);
  uf("Date", values.noteDate, 20);

  p(
    `FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________"} (the "Borrower"), of ${values.borrowerAddress || "__________, __________, __________"}, hereby promises to pay to the order of ${values.lenderName || "__________"} (the "Lender"), at ${values.paymentLocation || "__________, __________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.loanAmount || "------"} (the "Loan Amount"), and agrees to be bound by the terms and conditions set forth herein (this "Agreement").`
  );

  // ── I. TERMS OF REPAYMENT ──────────────────────────────────────────────────
  p("I. TERMS OF REPAYMENT", true);

  p("a. Payments", true);
  p(
    `The Borrower shall repay the Loan Amount in monthly installments of $${values.monthlyInstallment || "-------"}, commencing on ${values.firstPaymentDate || "__________"}, and continuing until ${values.dueDate || "--------------------"} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`
  );
  p(
    `Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ${values.interestRate || "------"} percent (${values.interestRate || "-----"}%) per annum until paid in full.`
  );

  p("b. Application of Payments", true);
  p("All payments made under this Agreement shall be applied first to accrued interest, if any, and thereafter to principal.");

  p("c. Late Charge", true);
  p(
    `The Borrower agrees to pay a late charge of $${values.lateCharge || "---------"} for each installment that remains unpaid more than ${values.lateDays || "___"} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not, under any circumstances, be deemed to cure or waive any default arising from such late payment.`
  );

  p("d. Acceleration of Debt", true);
  p("If any payment obligation under this Agreement is not paid when due, the remaining unpaid principal balance together with any accrued interest shall, at the option of the Lender, become immediately due and payable.");

  // ── II. PREPAYMENT ─────────────────────────────────────────────────────────
  p("II. PREPAYMENT", true);
  p("The Borrower may prepay this loan, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.");

  // ── III. COLLECTION COSTS ──────────────────────────────────────────────────
  p("III. COLLECTION COSTS", true);
  p("If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all reasonable costs of collection incurred by the Lender, including attorneys' fees, whether or not legal proceedings are commenced.");

  // ── IV. EVENTS OF DEFAULT ──────────────────────────────────────────────────
  p("IV. EVENTS OF DEFAULT", true);
  p("Upon the occurrence of any of the following events of default, this Agreement and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");

  bullet("Failure of the Borrower to pay any principal or accrued interest when due;");
  bullet("Liquidation, dissolution, incompetency, or death of the Borrower;");
  bullet("Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  bullet("Application for the appointment of a receiver for the Borrower;");
  bullet("Making of a general assignment for the benefit of the Borrower's creditors;");
  bullet("Insolvency of the Borrower;");
  bullet("Any misrepresentation by the Borrower to the Lender for the purpose of obtaining or extending credit; or");
  bullet("Sale of a material portion of the Borrower's business or assets.");

  // ── V. SEVERABILITY ───────────────────────────────────────────────────────
  p("V. SEVERABILITY", true);
  p("If any provision of this Agreement is determined to be unenforceable, in whole or in part, for any reason, such determination shall not affect the validity or enforceability of the remaining provisions, which shall remain in full force and effect.");

  // ── VI. MISCELLANEOUS ─────────────────────────────────────────────────────
  p("VI. MISCELLANEOUS", true);
  p("All payments of principal and interest under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to enforce any right under this Agreement, no assignment of this Agreement, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Agreement without notice to the Borrower. All rights of the Lender under this Agreement are cumulative.");

  // ── VII. GOVERNING LAW ────────────────────────────────────────────────────
  p("VII. GOVERNING LAW", true);
  p(`This Note shall be governed by and construed in accordance with the laws of the State of ${values.governingLawState || "__________________"}.`);

  // ── VIII. GUARANTY ────────────────────────────────────────────────────────
  p("VIII. GUARANTY", true);
  p(`${values.guarantorName || "__________________"} hereby unconditionally guarantees the full and punctual payment and performance of all obligations of the Borrower under this Note. The Guarantor agrees that any modification of the terms of payment or any extension of time for payment shall not impair or release the Guarantor's obligations, and the Guarantor expressly consents to any such modifications or extensions.`);

  // ── IX. NOTICES ───────────────────────────────────────────────────────────
  p("IX. NOTICES", true);
  p("Any notice required or permitted under this Note shall be in writing and shall be deemed given when delivered personally, sent by certified or registered mail, or sent by a nationally recognized courier service to the addresses of the parties as set forth above, or to such other address as a party may designate by written notice.");

  // ── X. ENTIRE AGREEMENT ───────────────────────────────────────────────────
  p("X. ENTIRE AGREEMENT", true);
  p("This Note constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous negotiations, agreements, representations, or understandings, whether written or oral.");

  // ── XI. HEADINGS ──────────────────────────────────────────────────────────
  p("XI. HEADINGS", true);
  p("The headings used in this Note are for convenience only and shall not affect the interpretation of this Note.");

  // ── XII. COUNTERPARTS ─────────────────────────────────────────────────────
  p("XII. COUNTERPARTS", true);
  p("This Note may be executed in one or more counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.");

  // ── XIII. BINDING EFFECT ──────────────────────────────────────────────────
  p("XIII. BINDING EFFECT", true);
  p("This Note shall be binding upon the Borrower and inure to the benefit of the Lender and their respective heirs, legal representatives, successors, and permitted assigns.");

  // ── XIV. EXECUTION AND SIGNATURES ────────────────────────────────────────
  p("XIV. EXECUTION AND SIGNATURES", true);
  p("This Note shall be executed by the Borrower and the Lender and shall also be co-signed by the Guarantor.");
  p("IN WITNESS WHEREOF, this Note has been executed and delivered in accordance with applicable law as of the date first written above.");

  // ── Signature Blocks ──────────────────────────────────────────────────────
  p("BORROWER", true);
  uf("Name", values.borrowerName, 24);
  uf("By", values.borrowerBy, 24);
  uf("Date", values.borrowerSignDate, 20, 2.4);

  p("LENDER", true);
  uf("Name", values.lenderName, 24);
  uf("By", values.lenderBy, 24);
  uf("Date", values.lenderSignDate, 20, 2.4);

  p("CO-SIGNER / GUARANTOR", true);
  uf("Name", values.guarantorName, 24);
  uf("By", values.guarantorBy, 24);
  uf("Date", values.guarantorSignDate, 20, 2.8);

  // ── Assignment ────────────────────────────────────────────────────────────
  p("ASSIGNMENT", true);
  p("(Complete only if assigning payments to a new party)");
  p(
    `For value received, the foregoing Note is hereby assigned and transferred to ${values.assigneeName || "__________________"} (the "Assignee"), of ${values.assigneeRegion || "__________________"} (City/State/Province), ${values.assigneeCountry || "__________________"} (Country).`
  );
  uf("Dated", values.assignmentDate, 20);
  uf("By", values.assignmentBy, 20);

  doc.save("iou_acknowledgment_of_debt.pdf");
};

export default function IOUForm() {
  return (
    <FormWizard
      steps={steps}
      title="IOU (ACKNOWLEDGMENT OF DEBT)"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="IOU"
    />
  );
}
