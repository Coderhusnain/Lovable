import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Details",
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
      { name: "lateFeeAmount", label: "Late fee amount", type: "text", required: false },
      { name: "lateDays", label: "Late days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "executedDay", label: "Executed day", type: "text", required: false },
      { name: "executedMonth", label: "Executed month", type: "text", required: false },
      { name: "executedYear", label: "Executed year", type: "text", required: false },
      { name: "executedAt", label: "Executed at", type: "text", required: false },
      { name: "borrowerDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderDate", label: "Lender date", type: "date", required: false },
      { name: "assigneeName", label: "Assignee name", type: "text", required: false },
      { name: "assigneeCityState", label: "Assignee city/state", type: "text", required: false },
      { name: "assigneeCountry", label: "Assignee country", type: "text", required: false },
      { name: "assignmentDate", label: "Assignment date", type: "date", required: false },
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
  const title = "PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`Principal Amount: $${values.principalAmount || "--------"}`);
  uf("Date", values.noteDate, 20);
  p(`FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________"} (the "Borrower"), of ${values.borrowerAddress || "__________"}, hereby promises to pay to the order of ${values.lenderName || "__________"} (the "Lender"), at ${values.paymentPlace || "__________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.principalAmount || "0.00"} (the "Loan Amount"), and agrees to be bound by the terms and conditions set forth in this Promissory Note (the "Agreement").`);

  p("I. TERMS OF REPAYMENT", true, 1);
  p("a. Payments", true, 1);
  p(`The Borrower shall repay the Loan Amount in monthly installments of $${values.monthlyInstallment || "-------"}, commencing on ${values.firstPaymentDate || "__________"}, and continuing until ${values.dueDate || "<insert date>"} (the "Due Date"), at which time any remaining unpaid principal balance shall be due and payable in full.`);
  p("Any unpaid principal remaining after the Due Date shall accrue interest at the rate of zero percent (0%) per annum until paid in full.", false, 2.2);
  p("b. Application of Payments", true, 1);
  p("All payments made pursuant to this Agreement shall be applied first to accrued interest, if any, and thereafter to principal.", false, 2.2);
  p("c. Late Fee", true, 1);
  p(`The Borrower agrees to pay a late charge of $${values.lateFeeAmount || "--------"} for each installment that remains unpaid more than ${values.lateDays || "___"} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not, under any circumstances, be deemed to cure a default arising from such late payment.`, false, 2.2);
  p("d. Acceleration of Debt", true, 1);
  p("If any payment obligation under this Agreement is not paid when due, the remaining unpaid principal balance together with any accrued interest shall, at the option of the Lender, become immediately due and payable.");

  p("II. PREPAYMENT", true, 1);
  p("The Borrower may prepay this loan, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest is paid through the date of prepayment.");
  p("III. COLLECTION COSTS", true, 1);
  p("If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all costs of collection incurred by the Lender, including reasonable attorneys' fees, whether or not legal proceedings are initiated.");
  p("IV. EVENTS OF DEFAULT", true, 1);
  p("Upon the occurrence of any of the following events of default, this Agreement and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("(a) Failure of the Borrower to pay any principal or accrued interest when due;");
  p("(b) Liquidation, dissolution, incompetency, or death of the Borrower;");
  p("(c) Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("(d) Application for the appointment of a receiver for the Borrower;");
  p("(e) Making of a general assignment for the benefit of the Borrower's creditors;");
  p("(f) Insolvency of the Borrower;");
  p("(g) Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit; or");
  p("(h) Sale of a material portion of the Borrower's business or assets.");
  p("V. SEVERABILITY", true, 1);
  p("If any provision of this Agreement is determined to be unenforceable, in whole or in part, for any reason, such determination shall not affect the enforceability of the remaining provisions, which shall remain in full force and effect.");
  p("VI. MISCELLANEOUS", true, 1);
  p("All payments of principal and interest under this Agreement shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to enforce any right under this Agreement, no assignment of this Agreement, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Agreement without notice to the Borrower. All rights of the Lender are cumulative and may be exercised concurrently or consecutively.");
  p("This Agreement may not be amended or modified except by a written instrument approved by the holder of this Agreement.");
  p("VII. GOVERNING LAW", true, 1);
  p(`This Promissory Note shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`);
  p("VIII. EXECUTION", true, 1);
  p(`This Agreement shall be executed by ${values.borrowerName || "__________"} and ${values.lenderName || "__________"}.`, false, 2.6);

  p("SIGNATURE PAGE", true, 1);
  p("IN WITNESS WHEREOF, this Promissory Note has been executed and delivered in accordance with applicable law as of the date first written above.");
  p(`Executed this ${values.executedDay || "___"} day of ${values.executedMonth || "__________"}, ${values.executedYear || "_"}, at ${values.executedAt || "__________"}.`, false, 2.2);

  p("BORROWER:", true, 1);
  uf("Date", values.borrowerDate, 20);
  p("LENDER:", true, 1);
  uf("Date", values.lenderDate, 20, 3);

  p("ASSIGNMENT", true, 1);
  p("(Complete only if assigning payments to a new party)");
  p(`For value received, the foregoing Promissory Note is hereby assigned and transferred to ${values.assigneeName || "__________"} (the "Assignee"), of ${values.assigneeCityState || "__________"} (City, State/Province), ${values.assigneeCountry || "__________"} (Country).`);
  uf("Dated", values.assignmentDate, 20, 3);

  p("IMPORTANT DETAILS", true, 1);
  p("This Promissory Note should be reviewed periodically to ensure compliance with its terms. In the event the Borrower fails to make any payment when due, the Lender should promptly notify the Borrower and advise of any applicable penalties or remedies arising from such default.");

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
