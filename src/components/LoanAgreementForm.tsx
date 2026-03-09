import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Details",
    fields: [
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "agreementDate", label: "Date", type: "date", required: false },
      { name: "borrowerName", label: "Borrower", type: "text", required: false },
      { name: "borrowerAddress1", label: "Borrower address line 1", type: "text", required: false },
      { name: "borrowerAddress2", label: "Borrower address line 2", type: "text", required: false },
      { name: "lenderName", label: "Lender", type: "text", required: false },
      { name: "lenderAddress", label: "Lender address", type: "text", required: false },
      { name: "paymentPlace", label: "Payment place", type: "text", required: false },
      { name: "principalAmount", label: "Principal amount", type: "text", required: false },
      { name: "installmentAmount", label: "Installment amount", type: "text", required: false },
      { name: "commenceDate", label: "Commencement date", type: "date", required: false },
      { name: "dueDate", label: "Due date", type: "date", required: false },
      { name: "lateCharge", label: "Late charge", type: "text", required: false },
      { name: "lateDays", label: "Late days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "assignee", label: "Assignee", type: "text", required: false },
      { name: "assigneeLocation", label: "Assignee location", type: "text", required: false },
      { name: "assignmentDate", label: "Assignment date", type: "date", required: false },
      { name: "executedDay", label: "Executed day", type: "text", required: false },
      { name: "executedMonth", label: "Executed month", type: "text", required: false },
      { name: "executedYear", label: "Executed year", type: "text", required: false },
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
  const title = "LOAN AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`Loan Amount: $${values.loanAmount || "----------"}`);
  uf("Date", values.agreementDate, 20);
  p(`This Loan Agreement (the "Agreement") is made and entered into as of the date set forth above, by and between ${values.borrowerName || "__________"}, of ${values.borrowerAddress1 || "__________"}, ${values.borrowerAddress2 || "__________"} (the "Borrower"), and ${values.lenderName || "__________"}, of ${values.lenderAddress || "__________"} (the "Lender").`);
  p(`For value received, the Borrower hereby promises to pay to the order of the Lender, at ${values.paymentPlace || "__________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.principalAmount || "-------"} (the "Loan Amount"), subject to the terms and conditions set forth herein.`);

  p("1. TERMS OF REPAYMENT", true);
  p("1.1 Installment Payments", true);
  p(`The Borrower shall repay the Loan Amount in monthly installments of $${values.installmentAmount || "------"}, commencing on ${values.commenceDate || "__________"}, and continuing until ${values.dueDate || "<insert date>"} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`);
  p("Any unpaid principal remaining after the Due Date shall accrue interest at the rate of zero percent (0%) per annum until paid in full.");
  p("1.2 Application of Payments", true);
  p("All payments made under this Agreement shall be applied first to accrued interest, if any, and thereafter to principal.");
  p("1.3 Late Charges", true);
  p(`The Borrower agrees to pay a late charge of $${values.lateCharge || "-------"} for each installment that remains unpaid more than ${values.lateDays || "___"} day(s) after its due date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of a late charge shall not, under any circumstances, be deemed to cure or waive any default arising from such late payment.`);
  p("1.4 Acceleration", true);
  p("If the Borrower fails to make any payment when due under this Agreement, the Lender may, at its option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.");
  p("2. PREPAYMENT", true);
  p("The Borrower may prepay this loan, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.");
  p("3. COLLECTION COSTS", true);
  p("If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all reasonable costs of collection incurred by the Lender, including attorneys' fees, whether or not legal proceedings are commenced.");
  p("4. EVENTS OF DEFAULT", true);
  p("The occurrence of any of the following shall constitute an event of default, upon which this Agreement and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("(a) Failure to pay principal or accrued interest when due;");
  p("(b) Liquidation, dissolution, incompetency, or death of the Borrower;");
  p("(c) Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("(d) Application for the appointment of a receiver for the Borrower;");
  p("(e) Making of a general assignment for the benefit of creditors;");
  p("(f) Insolvency of the Borrower;");
  p("(g) Any misrepresentation by the Borrower made for the purpose of obtaining or extending credit; or");
  p("(h) Sale of a material portion of the Borrower's business or assets.");
  p("5. SEVERABILITY", true);
  p("If any provision of this Agreement is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect.");
  p("6. MISCELLANEOUS", true);
  p("All payments under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to exercise any right under this Agreement, no assignment of this Agreement, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall constitute a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Agreement without notice to the Borrower. All rights of the Lender are cumulative and may be exercised concurrently or consecutively.");
  p("This Agreement may not be amended or modified except by a written instrument approved by the holder of this Agreement.");
  p("7. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`);
  p("8. ASSIGNMENT", true);
  p(`The Lender may assign this Agreement and the payments due hereunder. Any such assignment shall be effective upon transfer to ${values.assignee || "__________"} (the "Assignee"), of ${values.assigneeLocation || "__________, __________ (City/State/Province, Country)"}, for value received.`);
  uf("Dated", values.assignmentDate, 20);
  p("9. EXECUTION", true);
  p("IN WITNESS WHEREOF, the parties have executed this Loan Agreement as of the date first written above.");
  p(`Executed this ${values.executedDay || "___"} day of ${values.executedMonth || "__________"}, ${values.executedYear || "_"}, at ${values.executedAt || "________"}.`);
  p("BORROWER:", true);
  uf("Date", values.borrowerDate, 20);
  p("LENDER:", true);
  uf("Date", values.lenderDate, 20);

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
