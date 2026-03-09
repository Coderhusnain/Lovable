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
      { name: "interestStartDate", label: "Interest accrues from", type: "date", required: false },
      { name: "interestRate", label: "Interest rate", type: "text", required: false },
      { name: "monthlyInstallment", label: "Monthly installment", type: "text", required: false },
      { name: "firstPaymentDate", label: "First payment date", type: "date", required: false },
      { name: "dueDate", label: "Due date", type: "date", required: false },
      { name: "postDueRate", label: "Post-due interest rate", type: "text", required: false },
      { name: "lateFeeAmount", label: "Late charge", type: "text", required: false },
      { name: "lateDays", label: "Late days", type: "text", required: false },
      { name: "stateLaw", label: "State governing law", type: "text", required: false },
      { name: "guarantorName", label: "Guarantor name", type: "text", required: false },
      { name: "borrowerSignDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderSignDate", label: "Lender date", type: "date", required: false },
      { name: "guarantorSignDate", label: "Guarantor date", type: "date", required: false },
      { name: "assigneeName", label: "Assignee", type: "text", required: false },
      { name: "assigneeCity", label: "Assignee city", type: "text", required: false },
      { name: "assigneeState", label: "Assignee state/province", type: "text", required: false },
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
  const title = "PROMISSORY NOTE DUE ON A SPECIFIC DATE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`Principal Amount: $${values.principalAmount || "-------"}`);
  uf("Date", values.noteDate, 20);
  p(`FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________________"} (the "Borrower"), of ${values.borrowerAddress || "__________________"}, hereby promises to pay to the order of ${values.lenderName || "__________________"} (the "Lender"), at ${values.paymentPlace || "__________________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.principalAmount || "------"}, together with interest accruing from ${values.interestStartDate || "__________________"} on the unpaid principal balance at the rate of ${values.interestRate || "------"} percent (${values.interestRate || "-------"}%) per annum, all in accordance with the terms of this Promissory Note Due on a Specific Date (the "Note").`);

  p("I. TERMS OF REPAYMENT", true, 1);
  p("1.1 Installment Payments", true, 1);
  p(`The unpaid principal balance and any accrued interest shall be payable in monthly installments of $${values.monthlyInstallment || "-------"}, commencing on ${values.firstPaymentDate || "__________________"}, and continuing until ${values.dueDate || "__________________"} (the "Due Date"), at which time any remaining unpaid principal balance and accrued interest shall be due and payable in full.`);
  p(`Any unpaid principal remaining after the Due Date shall accrue interest at the rate of ${values.postDueRate || "--------"} percent (${values.postDueRate || "------"}%) per annum until paid in full.`, false, 2.2);
  p("1.2 Application of Payments", true, 1);
  p("All payments made under this Note shall be applied first to accrued interest, if any, and thereafter to principal.", false, 2.2);
  p("1.3 Late Charges", true, 1);
  p(`The Borrower agrees to pay a late charge of $${values.lateFeeAmount || "---------"} for each installment that remains unpaid more than ${values.lateDays || "__________"} day(s) after its Due Date. Such late charge is agreed upon as liquidated damages and not as a penalty. Payment of any late charge shall not, under any circumstances, be deemed to cure or waive any default arising from such late payment.`, false, 2.2);
  p("1.4 Acceleration", true, 1);
  p("If the Borrower fails to make any payment when due under this Note, the Lender may, at its option, declare the entire unpaid principal balance together with any accrued interest immediately due and payable.");

  p("II. PREPAYMENT", true, 1);
  p("The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty. Any such prepayment shall be applied to the principal installments in inverse order of maturity and shall be accompanied by payment of all accrued interest on the amount prepaid through the date of prepayment.");
  p("III. COLLECTION COSTS", true, 1);
  p("If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs incurred by the Lender in connection with the collection of amounts due hereunder, including reasonable attorneys' fees, whether or not legal proceedings are commenced.");
  p("IV. EVENTS OF DEFAULT", true, 1);
  p("The occurrence of any of the following shall constitute an event of default, upon which this Note and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("a. Failure of the Borrower to pay any principal or accrued interest when due;");
  p("b. Liquidation, dissolution, incompetency, or death of the Borrower;");
  p("c. Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("d. Application for the appointment of a receiver for the Borrower;");
  p("e. Making of a general assignment for the benefit of the Borrower's creditors;");
  p("f. Insolvency of the Borrower;");
  p("g. Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit;");
  p("h. Sale of a material portion of the Borrower's business or assets.");
  p("V. SEVERABILITY", true, 1);
  p("If any provision of this Note is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect.");
  p("VI. MISCELLANEOUS", true, 1);
  p("All payments of principal and interest under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to enforce any right under this Note, no assignment of this Note, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Note without notice to the Borrower. All rights and remedies of the Lender under this Note are cumulative and may be exercised concurrently or consecutively at the Lender's option.");
  p("This Note may not be amended or modified except by a written instrument approved by the holder of this Note.");
  p("VII. GOVERNING LAW", true, 1);
  p(`This Note shall be governed by and construed in accordance with the laws of the State of ${values.stateLaw || "__________________"}.`);
  p("VIII. GUARANTY", true, 1);
  p(`${values.guarantorName || "__________________"} hereby unconditionally guarantees the full and punctual payment and performance of all obligations of the Borrower under this Note. The Guarantor agrees that any modification of the terms of payment or any extension of time for payment shall not impair or release the Guarantor's obligations and expressly consents to any such modifications or extensions.`);
  p("IX. EXECUTION AND SIGNATURES", true, 1);
  p("This Note shall be executed by the Borrower and the Lender and shall also be co-signed by the Guarantor.");
  p("IN WITNESS WHEREOF, this Note has been executed and delivered in accordance with applicable law as of the date first written above.", false, 2.6);

  p("BORROWER", true, 1);
  uf("Name", values.borrowerName, 24);
  uf("Signature", values.borrowerName, 24);
  uf("Date", values.borrowerSignDate, 20, 2.4);

  p("LENDER", true, 1);
  uf("Name", values.lenderName, 24);
  uf("Signature", values.lenderName, 24);
  uf("Date", values.lenderSignDate, 20, 2.4);

  p("CO-SIGNER / GUARANTOR", true, 1);
  uf("Name", values.guarantorName, 24);
  uf("Signature", values.guarantorName, 24);
  uf("Date", values.guarantorSignDate, 20, 3);

  p("ASSIGNMENT", true, 1);
  p("(Complete only if assigning payments to a new party)");
  p(`For value received, the foregoing Note is hereby assigned and transferred to ${values.assigneeName || "__________________"} (the "Assignee"), of ${values.assigneeCity || "__________________"} (City), ${values.assigneeState || "__________________"} (State/Province), ${values.assigneeCountry || "__________________"} (Country).`);
  uf("Dated", values.assignmentDate, 20);
  uf("By", values.assignmentBy, 20);

  doc.save("promissory_note_due_on_a_specific_date.pdf");
};

export default function PromissoryNoteDueOnSpecificDateForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note Due on a Specific Date"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="promissorynotedueonaspecificdate"
    />
  );
}
