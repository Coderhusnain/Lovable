import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Core Note Terms",
    fields: [
      { name: "principalAmount", label: "Principal amount", type: "text", required: true },
      { name: "noteDate", label: "Date", type: "date", required: true },
      { name: "borrowerName", label: "Borrower name", type: "text", required: true },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: true },
      { name: "borrowerCity", label: "Borrower city", type: "text", required: true },
      { name: "lenderName", label: "Lender name", type: "text", required: true },
      { name: "paymentPlace", label: "Payment place", type: "text", required: true },
      { name: "interestStartDate", label: "Interest accrual start date", type: "date", required: true },
      { name: "interestRatePercent", label: "Interest rate percent per annum", type: "text", required: true },
    ],
  },
  {
    label: "Installments and Default",
    fields: [
      { name: "monthlyInstallment", label: "Monthly installment amount", type: "text", required: true },
      { name: "commencingDate", label: "Installment commencing date", type: "date", required: true },
      { name: "dueDate", label: "Final due date", type: "date", required: true },
      { name: "postDueRatePercent", label: "Post-due interest rate percent", type: "text", required: true },
      { name: "lateChargeAmount", label: "Late charge amount", type: "text", required: true },
      { name: "lateDays", label: "Late charge after __ days", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "guarantorName", label: "Guarantor name", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "borrowerSignName", label: "Borrower signatory name", type: "text", required: true },
      { name: "borrowerSignDate", label: "Borrower sign date", type: "date", required: true },
      { name: "guarantorSignName", label: "Guarantor signatory name", type: "text", required: true },
      { name: "guarantorSignDate", label: "Guarantor sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.4);
  const title = "INSTALLMENT PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Principal Amount", `$${u(v.principalAmount)}`);
  uf("Date", v.noteDate);
  p(
    `FOR VALUE RECEIVED, the undersigned ${u(v.borrowerName)} (the "Borrower"), of ${u(v.borrowerAddress)}, ${u(v.borrowerCity)}, promises to pay to the order of ${u(v.lenderName)} (the "Lender"), at ${u(v.paymentPlace)}, or such other place designated by Lender, the principal sum of $${u(v.principalAmount)}, together with interest accruing from ${u(v.interestStartDate)} on unpaid principal at ${u(v.interestRatePercent)} percent per annum, in accordance with this Note.`
  );

  p("I. TERMS OF REPAYMENT", true);
  p("1.1 Installment Payments");
  p(
    `Unpaid principal and accrued interest are payable in monthly installments of $${u(v.monthlyInstallment)}, commencing on ${u(v.commencingDate)}, and continuing until ${u(v.dueDate)} (the "Due Date"), when all remaining unpaid principal and accrued interest are due in full.`
  );
  p(
    `Any unpaid principal after Due Date accrues interest at ${u(v.postDueRatePercent)} percent (${u(v.postDueRatePercent)}%) per annum until paid in full.`
  );
  p("1.2 Application of Payments");
  p("Payments are applied first to accrued interest, then to principal.");
  p("1.3 Late Charges");
  p(
    `Borrower shall pay a late charge of ${u(v.lateChargeAmount)} for each installment unpaid more than ${u(v.lateDays, 2)} day(s) after due date.`
  );
  p("1.4 Acceleration");
  p("Upon payment default, Lender may declare all unpaid principal and accrued interest immediately due and payable.");

  p("II. PREPAYMENT", true);
  p("Borrower may prepay in whole or part at any time before Due Date without penalty, provided accrued interest to prepayment date is paid.");
  p("III. COLLECTION COSTS", true);
  p("Borrower shall pay all collection costs, including reasonable attorneys' fees, whether or not legal proceedings are initiated.");
  p("IV. EVENTS OF DEFAULT", true);
  p("Default events include payment failure, death of borrower/lender, bankruptcy, receivership, assignment for creditors, insolvency, or credit-related misrepresentation.");
  p("V. SEVERABILITY", true);
  p("If any provision is invalid/unenforceable, remaining provisions remain in full force and effect.");
  p("VI. MISCELLANEOUS", true);
  p("Payments are in lawful U.S. currency. Borrower waives presentment, protest, notice of protest, and notice of demand. No waiver by delay, assignment, non-acceleration, or acceptance of late/partial payment.");
  p("VII. GOVERNING LAW", true);
  uf("Governing Law State", v.governingState);
  p("VIII. GUARANTY", true);
  p(
    `${u(v.guarantorName)} unconditionally guarantees full and punctual payment/performance of Borrower obligations and consents to modifications/extensions without release.`
  );
  p("IX. EXECUTION", true);
  p("This Note is executed by Borrower and co-signed by Guarantor.");

  p("IN WITNESS WHEREOF, the parties have executed this Installment Promissory Note as of the date first written above.", true);
  uf("BORROWER Name", v.borrowerSignName);
  uf("BORROWER Date", v.borrowerSignDate);
  uf("CO-SIGNER / GUARANTOR Name", v.guarantorSignName);
  uf("CO-SIGNER / GUARANTOR Date", v.guarantorSignDate);

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
