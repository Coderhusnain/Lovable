import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Terms",
    fields: [
      { name: "principalAmount", label: "Principal amount", type: "text", required: true },
      { name: "noteDate", label: "Note date", type: "date", required: true },
      { name: "borrowerName", label: "Borrower name", type: "text", required: true },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: true },
      { name: "lenderName", label: "Lender name", type: "text", required: true },
      { name: "paymentPlace", label: "Payment place", type: "text", required: true },
      { name: "interestStartDate", label: "Interest start date", type: "date", required: true },
      { name: "interestRate", label: "Interest rate (%)", type: "text", required: true },
      { name: "installmentAmount", label: "Monthly installment", type: "text", required: true },
      { name: "installmentStartDate", label: "Installment start date", type: "date", required: true },
      { name: "dueDate", label: "Due date", type: "date", required: true },
      { name: "postDueInterestRate", label: "Post-due interest rate (%)", type: "text", required: true },
      { name: "lateCharge", label: "Late charge", type: "text", required: true },
      { name: "lateDays", label: "Late days threshold", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
      { name: "guarantorName", label: "Guarantor name", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "borrowerSignName", label: "Borrower printed name", type: "text", required: true },
      { name: "borrowerSignature", label: "Borrower signature (typed)", type: "text", required: true },
      { name: "borrowerSignDate", label: "Borrower date", type: "date", required: true },
      { name: "lenderSignName", label: "Lender printed name", type: "text", required: true },
      { name: "lenderSignature", label: "Lender signature (typed)", type: "text", required: true },
      { name: "lenderSignDate", label: "Lender date", type: "date", required: true },
      { name: "guarantorSignName", label: "Guarantor printed name", type: "text", required: true },
      { name: "guarantorSignature", label: "Guarantor signature (typed)", type: "text", required: true },
      { name: "guarantorSignDate", label: "Guarantor date", type: "date", required: true },
      { name: "assigneeName", label: "Assignee name (optional)", type: "text", required: false },
      { name: "assigneeCity", label: "Assignee city (optional)", type: "text", required: false },
      { name: "assigneeState", label: "Assignee state/province (optional)", type: "text", required: false },
      { name: "assigneeCountry", label: "Assignee country (optional)", type: "text", required: false },
      { name: "assignmentDate", label: "Assignment date (optional)", type: "date", required: false },
      { name: "assignmentBy", label: "Assignment by (optional)", type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.6;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "PROMISSORY NOTE DUE ON A SPECIFIC DATE";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.7);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`Principal Amount: $${v.principalAmount || "-------"}  |  Date: ${v.noteDate || "__________________"}`);
  p(`FOR VALUE RECEIVED, ${v.borrowerName || "__________________"} ("Borrower"), of ${v.borrowerAddress || "__________________"}, promises to pay to order of ${v.lenderName || "__________________"} ("Lender"), at ${v.paymentPlace || "__________________"}, principal sum of $${v.principalAmount || "------"}, with interest from ${v.interestStartDate || "__________________"} at ${v.interestRate || "------"}% per annum, per this Note.`);
  p("I. TERMS OF REPAYMENT", true);
  p(`1.1 Installment Payments: monthly installments of $${v.installmentAmount || "-------"} beginning ${v.installmentStartDate || "__________________"} through ${v.dueDate || "__________________"} ("Due Date"); remaining unpaid principal/interest due in full on Due Date.`);
  p(`Unpaid principal after Due Date accrues ${v.postDueInterestRate || "--------"}% per annum until paid in full.`);
  p("1.2 Application of Payments: first accrued interest, then principal.");
  p(`1.3 Late Charges: $${v.lateCharge || "---------"} for each installment unpaid more than ${v.lateDays || "__________"} day(s) after Due Date; liquidated damages, not penalty; no waiver of default.`);
  p("1.4 Acceleration: Lender may declare full unpaid principal plus accrued interest immediately due upon payment default.");
  p("II. PREPAYMENT", true);
  p("Borrower may prepay in whole/part before Due Date without penalty; prepayments applied in inverse order of maturity plus accrued interest through prepayment date.");
  p("III. COLLECTION COSTS", true);
  p("Borrower pays all collection costs including reasonable attorneys' fees whether or not proceedings are commenced.");
  p("IV. EVENTS OF DEFAULT", true);
  p("Default events include nonpayment, liquidation/dissolution/incompetency/death, bankruptcy filing, receiver application, assignment for benefit of creditors, insolvency, misrepresentation for credit, sale of material business/assets.");
  p("V. SEVERABILITY", true); p("Invalid/unenforceable provisions do not affect remaining terms.");
  p("VI. MISCELLANEOUS", true);
  p("Payments in lawful U.S. currency. Borrower waives presentment/protest/notices. No delay, assignment, non-acceleration, or acceptance of late/partial payment waives strict enforcement rights. Amendments must be written by holder.");
  p("VII. GOVERNING LAW", true); p(`Governed by laws of State of ${v.governingLawState || "__________________"}.`);
  p("VIII. GUARANTY", true);
  p(`${v.guarantorName || "__________________"} unconditionally guarantees full and punctual payment/performance. Modifications/extensions do not release guarantor.`);
  p("IX. EXECUTION AND SIGNATURES", true);
  p("Executed by Borrower and Lender and co-signed by Guarantor.");
  uf("BORROWER - Name", v.borrowerSignName);
  uf("Signature", v.borrowerSignature);
  uf("Date", v.borrowerSignDate);
  y += 1.2;
  uf("LENDER - Name", v.lenderSignName);
  uf("Signature", v.lenderSignature);
  uf("Date", v.lenderSignDate);
  y += 1.2;
  uf("CO-SIGNER/GUARANTOR - Name", v.guarantorSignName);
  uf("Signature", v.guarantorSignature);
  uf("Date", v.guarantorSignDate);
  p("ASSIGNMENT (Complete only if assigning payments to a new party)", true);
  p(`For value received, foregoing Note assigned/transferred to ${v.assigneeName || "__________________"} ("Assignee"), of ${v.assigneeCity || "__________________"} (City), ${v.assigneeState || "__________________"} (State/Province), ${v.assigneeCountry || "__________________"} (Country).`);
  uf("Dated", v.assignmentDate);
  uf("By", v.assignmentBy);
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

