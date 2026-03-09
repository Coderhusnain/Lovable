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
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "interestStartDate", label: "Interest start date", type: "date", required: false },
      { name: "interestRate", label: "Interest rate", type: "text", required: false },
      { name: "stateLaw", label: "Governing law state", type: "text", required: false },
      { name: "guarantorName", label: "Guarantor name", type: "text", required: false },
      { name: "borrowerBy", label: "Borrower by", type: "text", required: false },
      { name: "borrowerDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderBy", label: "Lender by", type: "text", required: false },
      { name: "lenderDate", label: "Lender date", type: "date", required: false },
      { name: "guarantorBy", label: "Guarantor by", type: "text", required: false },
      { name: "guarantorDate", label: "Guarantor date", type: "date", required: false },
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
  const title = "DUE ON DEMAND PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`Principal Amount: $${values.principalAmount || "-------"}`);
  uf("Date", values.noteDate, 20);
  p(`FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________________"} (the "Borrower"), of ${values.borrowerAddress || "__________________"}, hereby promises to pay to the order of ${values.lenderName || "__________________"} (the "Lender"), at ${values.paymentPlace || "__________________"}, or at such other place as the Lender may designate in writing, the principal sum of $${values.loanAmount || "-----"}, together with interest accruing from ${values.interestStartDate || "__________________"} on the unpaid principal balance at the rate of ${values.interestRate || "------"}percent (${values.interestRate || "------"}%) per annum, all in accordance with the terms of this Due on Demand Promissory Note (the "Note").`);
  p("I. TERMS OF REPAYMENT", true);
  p("1.1 Demand for Payment", true);
  p('The unpaid principal balance of this Note, together with all accrued interest, shall be payable in full on any future date on which the Lender demands repayment (the "Due Date").');
  p("1.2 Application of Payments", true);
  p("All payments made under this Note shall be applied first to accrued interest, if any, and thereafter to principal.");
  p("II. PREPAYMENT", true);
  p("The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty, provided that all accrued interest through the date of prepayment is paid in full.");
  p("III. COLLECTION COSTS", true);
  p("If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs incurred by the Lender in connection with the collection of amounts due hereunder, including reasonable attorneys' fees, whether or not legal proceedings are commenced.");
  p("IV. EVENTS OF DEFAULT", true);
  p("The occurrence of any of the following shall constitute an event of default, upon which this Note and all other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("a. Failure of the Borrower to pay any principal or accrued interest when due;");
  p("b. Liquidation, dissolution, incompetency, or death of the Borrower or the Lender;");
  p("c. Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("d. Application for the appointment of a receiver for the Borrower;");
  p("e. Making of a general assignment for the benefit of the Borrower's creditors;");
  p("f. Insolvency of the Borrower;");
  p("g. Any misrepresentation made by the Borrower to the Lender for the purpose of obtaining or extending credit;");
  p("h. Sale of a material portion of the business or assets of the Borrower.");
  p("V. SEVERABILITY", true);
  p("If any provision of this Note is determined to be invalid or unenforceable, in whole or in part, for any reason, such determination shall not affect the validity or enforceability of the remaining provisions, which shall remain in full force and effect.");
  p("VI. MISCELLANEOUS", true);
  p("All payments of principal and interest under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p("No delay or failure by the Lender to enforce any right under this Note, no assignment of this Note, no failure to accelerate the indebtedness upon default, and no acceptance of any late or partial payment shall operate as a waiver of the Lender's right to thereafter enforce strict compliance with the terms of this Note without notice to the Borrower. All rights and remedies of the Lender under this Note are cumulative and may be exercised concurrently or consecutively at the Lender's option.");
  p("This Note may not be amended or modified except by a written instrument approved by the holder of this Note.");
  p("VII. GOVERNING LAW", true);
  p(`This Note shall be governed by and construed in accordance with the laws of the State of ${values.stateLaw || "__________________"}.`);
  p("VIII. GUARANTY", true);
  p(`${values.guarantorName || "__________________"} hereby unconditionally guarantees the full and punctual payment and performance of all obligations of the Borrower under this Note. The Guarantor agrees that any modification of the terms of payment or any extension of time for payment shall not impair or release the Guarantor's obligations, and the Guarantor expressly consents to any such modifications or extensions.`);
  p("IX. EXECUTION AND SIGNATURES", true);
  p("This Note shall be executed by the Borrower and the Lender and shall also be co-signed by the Guarantor.");
  p("IN WITNESS WHEREOF, this Note has been executed and delivered in accordance with applicable law as of the date first written above.");
  p("BORROWER:", true);
  uf("Name", values.borrowerName, 24);
  uf("By", values.borrowerBy, 24);
  uf("Date", values.borrowerDate, 20, 2.4);
  p("LENDER:", true);
  uf("Name", values.lenderName, 24);
  uf("By", values.lenderBy, 24);
  uf("Date", values.lenderDate, 20, 2.4);
  p("CO-SIGNER / GUARANTOR:", true);
  uf("Name", values.guarantorName, 24);
  uf("By", values.guarantorBy, 24);
  uf("Date", values.guarantorDate, 20, 2.8);
  p("ASSIGNMENT", true);
  p("(Complete only if assigning payments to a new party)");
  p(`For value received, the foregoing Note is hereby assigned and transferred to ${values.assigneeName || "__________________"} (the "Assignee"), of ${values.assigneeRegion || "__________________"} (City/State/Province), ${values.assigneeCountry || "__________________"} (Country).`);
  uf("Dated", values.assignmentDate, 20);
  uf("By", values.assignmentBy, 20);

  doc.save("due_on_demand_promissory_note.pdf");
};

export default function DueOnDemandPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Due On Demand Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="dueondemandpromissorynote"
    />
  );
}
