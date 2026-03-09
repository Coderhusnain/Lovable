import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Payable Details",
    fields: [
      { name: "principalAmount", label: "Principal amount", type: "text", required: false },
      { name: "noteDate", label: "Date", type: "date", required: false },
      { name: "borrowerName", label: "Borrower", type: "text", required: false },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: false },
      { name: "lenderName", label: "Lender", type: "text", required: false },
      { name: "paymentPlace", label: "Payment place", type: "text", required: false },
      { name: "monthlyInstallment", label: "Monthly installment", type: "text", required: false },
      { name: "firstPaymentDate", label: "First payment date", type: "date", required: false },
      { name: "dueDate", label: "Due date", type: "date", required: false },
      { name: "postDueRate", label: "Post-due interest rate", type: "text", required: false },
      { name: "lateFeeAmount", label: "Late charge", type: "text", required: false },
      { name: "lateDays", label: "Late days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "executedDay", label: "Executed day", type: "text", required: false },
      { name: "executedMonth", label: "Executed month", type: "text", required: false },
      { name: "executedAt", label: "Executed at", type: "text", required: false },
      { name: "borrowerDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderDate", label: "Lender date", type: "date", required: false },
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
  const title = "NOTE PAYABLE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`Principal Amount: $${values.principalAmount || "----------"}`);
  uf("Date", values.noteDate, 20);
  p('This Note Payable (this "Note") is made as of the date set forth above.');
  p(`FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________________"} (the "Borrower"), of ${values.borrowerAddress || "__________________"}, hereby promises to pay to the order of ${values.lenderName || "__________________"} (the "Lender"), at ${values.paymentPlace || "__________________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.principalAmount || "------"} (the "Loan Amount"), subject to and in accordance with the terms and conditions set forth in this Note (the "Agreement").`);

  p("I. TERMS OF REPAYMENT", true, 1);
  p("1.1 Installment Payments", true, 1);
  p(`The Borrower shall repay the Loan Amount in monthly installments of $${values.monthlyInstallment || "--------"}, commencing on ${values.firstPaymentDate || "__________________"}, and continuing until ${values.dueDate || "------------------"} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`);
  p(`Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ${values.postDueRate || "------"} percent (${values.postDueRate || "-------"}%) per annum until paid in full.`, false, 2.2);
  p("1.2 Application of Payments", true, 1);
  p("All payments made under this Note shall be applied first to accrued interest, if any, and thereafter to principal.", false, 2.2);
  p("1.3 Late Charges", true, 1);
  p(`The Borrower agrees to pay a late charge of $${values.lateFeeAmount || "---------"} for each installment that remains unpaid more than ${values.lateDays || "____"} day(s) after its Due Date.`, false, 2.2);
  p("1.4 Acceleration", true, 1);
  p("If the Borrower fails to make any payment when due under this Note, the Lender may, at its option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.");
  p("II. PREPAYMENT", true, 1);
  p("The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.");
  p("III. COLLECTION COSTS", true, 1);
  p("If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs of collection incurred by the Lender, including reasonable attorneys' fees, whether or not legal proceedings are commenced.");
  p("IV. EVENTS OF DEFAULT", true, 1);
  p("The occurrence of any of the following shall constitute an event of default, upon which this Note and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("a. Failure of the Borrower to pay principal or accrued interest when due;");
  p("b. Liquidation, dissolution, incompetency, or death of the Borrower;");
  p("c. Filing of bankruptcy proceedings involving the Borrower;");
  p("d. Application for the appointment of a receiver for the Borrower;");
  p("e. Making of a general assignment for the benefit of creditors;");
  p("f. Insolvency of the Borrower;");
  p("g. Any misrepresentation made by the Borrower for the purpose of obtaining or extending credit;");
  p("h. Sale of a material portion of the business or assets of the Borrower.");
  p("V. SEVERABILITY", true, 1);
  p("If any provision of this Agreement is determined to be unenforceable, such determination shall not affect the validity or enforceability of the remaining provisions, which shall remain in full force and effect.");
  p("VI. MISCELLANEOUS", true, 1);
  p("All payments under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to enforce any right under this Note shall be construed as a waiver of such right. All rights and remedies of the Lender are cumulative.");
  p("This Note may not be amended or modified except by a written instrument approved by the holder of this Note.");
  p("VII. GOVERNING LAW", true, 1);
  p(`This Note shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________________"}.`);
  p("VIII. EXECUTION AND SIGNATURES", true, 1);
  p("This Note shall be executed by the Borrower and the Lender.");
  p("IN WITNESS WHEREOF, this Note Payable has been executed and delivered in accordance with applicable law as of the date first written above.");
  p(`Executed this ${values.executedDay || "___"} day of ${values.executedMonth || "________"}, at ${values.executedAt || "_____________"}.`, false, 2.2);
  p("BORROWER", true, 1);
  uf("Name", values.borrowerName, 24);
  uf("Signature", values.borrowerName, 24);
  uf("Date", values.borrowerDate, 20, 2.4);
  p("LENDER", true, 1);
  uf("Name", values.lenderName, 24);
  uf("Signature", values.lenderName, 24);
  uf("Date", values.lenderDate, 20);

  doc.save("note_payable_agreement.pdf");
};

export default function NotePayableForm() {
  return (
    <FormWizard
      steps={steps}
      title="Note Payable Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="notepayable"
    />
  );
}
