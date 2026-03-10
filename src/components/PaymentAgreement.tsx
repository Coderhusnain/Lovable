import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Terms",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "loanAmount", label: "Loan amount", type: "text", required: true },
      { name: "borrowerName", label: "Borrower name", type: "text", required: true },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: true },
      { name: "lenderName", label: "Lender name", type: "text", required: true },
      { name: "lenderAddress", label: "Lender address", type: "text", required: true },
      { name: "monthlyInstallment", label: "Monthly installment", type: "text", required: true },
      { name: "firstPaymentDate", label: "First payment date", type: "date", required: true },
      { name: "maturityDate", label: "Maturity date", type: "date", required: true },
      { name: "defaultInterest", label: "Default interest rate (%)", type: "text", required: true },
      { name: "lateCharge", label: "Late charge amount", type: "text", required: true },
      { name: "lateDays", label: "Late days threshold", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "executionDay", label: "Execution day", type: "text", required: true },
      { name: "executionMonth", label: "Execution month", type: "text", required: true },
      { name: "executionYear", label: "Execution year", type: "text", required: true },
      { name: "executionPlace", label: "Execution place", type: "text", required: true },
      { name: "borrowerSignature", label: "Borrower signature (typed)", type: "text", required: true },
      { name: "borrowerDate", label: "Borrower date", type: "date", required: true },
      { name: "lenderSignature", label: "Lender signature (typed)", type: "text", required: true },
      { name: "lenderDate", label: "Lender date", type: "date", required: true },
      { name: "assigneeName", label: "Assignee name (optional)", type: "text", required: false },
      { name: "assigneeLocation", label: "Assignee city/state/country (optional)", type: "text", required: false },
      { name: "assignmentDate", label: "Assignment date (optional)", type: "date", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.4);
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
  const title = "PAYMENT AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`Loan Amount: $${v.loanAmount || "<insert amount>"}  |  Date: ${v.agreementDate || "__________"}`);
  p(`FOR VALUE RECEIVED, ${v.borrowerName || "Borrower"}, residing at ${v.borrowerAddress || "__________"}, promises to pay ${v.lenderName || "Lender"} at ${v.lenderAddress || "__________"}, principal sum of $${v.loanAmount || "<insert amount>"}.`);
  p("I. TERMS OF REPAYMENT", true);
  p(`Installments: $${v.monthlyInstallment || "<insert amount>"} monthly starting ${v.firstPaymentDate || "__________"} through ${v.maturityDate || "<insert date>"} (Maturity Date).`);
  p(`Unpaid principal after maturity accrues interest at ${v.defaultInterest || "-----"}% per annum until paid in full.`);
  p("Payments apply first to accrued interest, then principal.");
  p(`Late charge: $${v.lateCharge || "<insert amount>"} for installments unpaid more than ${v.lateDays || "___"} day(s) after due date.`);
  p("Lender may accelerate entire unpaid balance on payment default.");
  p("II. PREPAYMENT", true); p("Borrower may prepay in whole or part before maturity without penalty.");
  p("III. COLLECTION COSTS", true); p("Borrower pays reasonable collection costs, including attorney fees.");
  p("IV. EVENTS OF DEFAULT", true);
  p("Default events include nonpayment, liquidation/dissolution/incompetency/death, insolvency/bankruptcy proceedings, receiver appointment, assignment for creditors, material misrepresentation, or sale/transfer of material business/assets.");
  p("V. SEVERABILITY", true); p("Invalid/unenforceable provisions do not affect remaining terms.");
  p("VI. MISCELLANEOUS", true); p("US lawful currency; borrower waives presentment/protest/notices; no waiver by delay/acceptance of late partial payments; amendments must be written.");
  p("VII. GOVERNING LAW", true); p(`Governed by laws of ${v.governingLaw || "__________"}.`);
  p("VIII. EXECUTION", true);
  p(`Executed on this ${v.executionDay || "___"} day of ${v.executionMonth || "__________"}, ${v.executionYear || "___"}, at ${v.executionPlace || "__________"}.`);
  uf("BORROWER - Signature", v.borrowerSignature); uf("Date", v.borrowerDate);
  y += 1.2; uf("LENDER - Signature", v.lenderSignature); uf("Date", v.lenderDate);
  p("ASSIGNMENT (complete only if assigning this Agreement)", true);
  p(`For value received, assignor transfers rights in this Payment Agreement to ${v.assigneeName || "__________"}, of ${v.assigneeLocation || "__________"}.`);
  uf("Dated", v.assignmentDate);
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

