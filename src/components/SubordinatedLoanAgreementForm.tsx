import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Core Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "seniorCreditor", label: "Senior Creditor", type: "text", required: true },
      { name: "juniorCreditor", label: "Junior Creditor", type: "text", required: true },
      { name: "borrower", label: "Borrower", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "seniorSignName", label: "Senior Creditor signing name", type: "text", required: false },
      { name: "seniorSignDate", label: "Senior Creditor sign date", type: "date", required: true },
      { name: "juniorSignName", label: "Junior Creditor signing name", type: "text", required: false },
      { name: "juniorSignDate", label: "Junior Creditor sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  let y = 20;
  const bottom = 280;
  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  const title = "SUBORDINATED LOAN AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`This Subordinated Loan Agreement (this "Agreement") is entered into as of ${v.effectiveDate || "__________"} (the "Effective Date"), by and among:`);
  p(`- ${v.seniorCreditor || "__________________"}, as senior creditor (the "Senior Creditor");`);
  p(`- ${v.juniorCreditor || "__________________"}, as junior creditor (the "Junior Creditor"); and`);
  p(`- ${v.borrower || "__________________"}, as borrower (the "Borrower").`);
  p("The parties agree as follows:", false, 3);

  p("1. DEFINITIONS", true);
  p('1.1 Junior Debt: "Junior Debt" means all present and future loans, advances, indebtedness, liabilities, and obligations of every kind and nature of the Borrower to the Junior Creditor, whether now existing or hereafter arising, whether direct or indirect, absolute or contingent, matured or unmatured, secured or unsecured.');
  p('1.2 Senior Debt: "Senior Debt" means all present and future indebtedness, liabilities, and obligations of the Borrower to the Senior Creditor, including principal, interest (including post-insolvency accrual), fees, costs, expenses, and attorneys\' fees.', false, 3);
  p("2. SUBORDINATION OF PAYMENT", true);
  p("The Junior Creditor agrees payment of Junior Debt is fully and irrevocably subordinated to prior payment in full of all Senior Debt. Until Senior Debt is indefeasibly paid in full in cash, no payment/distribution shall be made on Junior Debt except as expressly permitted.", false, 3);
  p("3. DEFAULT UNDER SENIOR DEBT", true);
  p("Upon and during any default with respect to Senior Debt, Junior Creditor shall not demand payment of Junior Debt, commence/participate in collection action, or receive/accept payment from Borrower on account of Junior Debt.", false, 3);
  p("4. PAYMENTS HELD IN TRUST", true);
  p("Any payment/distribution received by Junior Creditor in violation of this Agreement is deemed held in trust for Senior Creditor and must be immediately delivered to Senior Creditor for application to Senior Debt.", false, 3);
  p("5. NO INDEPENDENT ACTION", true);
  p("Until Senior Debt is paid in full, Junior Creditor shall not commence/prosecute/participate in insolvency or similar proceeding against Borrower unless Senior Creditor joins or has been paid in full prior to such action.", false, 3);
  p("6. BANKRUPTCY; ATTORNEY-IN-FACT", true);
  p("In any bankruptcy/insolvency involving Borrower, Junior Creditor irrevocably appoints Senior Creditor as attorney-in-fact to file proofs of claim and receive/apply distributions attributable to Junior Debt as required hereunder, to extent Junior Creditor fails/refuses to do so.", false, 3);
  p("7. SUBORDINATION OF LIENS", true);
  p("Any lien/security interest/collateral held by Junior Creditor securing Junior Debt remains junior and subordinate in all respects to liens/security interests securing Senior Debt, regardless of perfection order.", false, 3);
  p("8. RIGHTS OF SENIOR CREDITOR", true);
  p("Senior Creditor may, without notice/consent of Junior Creditor, extend/renew/modify Senior Debt, waive/compromise/settle Senior Debt, release/substitute collateral, or amend loan documents. No such action impairs subordination provisions.", false, 3);
  p("9. AFFIRMATIVE COVENANTS OF JUNIOR CREDITOR", true);
  p("Junior Creditor shall reflect subordination in books/records/financial statements and take actions reasonably requested by Senior Creditor to evidence/enforce subordination.", false, 3);
  p("10. NEGATIVE COVENANTS OF JUNIOR CREDITOR", true);
  p("Until Senior Debt is paid in full, Junior Creditor shall not, without prior written consent of Senior Creditor: materially waive/release/modify Junior Debt or related security; compromise/settle Junior Debt or allow setoff/counterclaim; exchange Junior Debt for equity/ownership interests.", false, 3);
  p("11. ASSIGNMENT", true);
  p("11.1 Junior Creditor: no assignment/transfer while Senior Debt remains outstanding unless expressly subject to this Agreement; binding on successors/assigns.");
  p("11.2 Senior Creditor: may assign this Agreement with assignment/transfer of Senior Debt; this Agreement benefits Senior Creditor and successors/assigns.", false, 3);
  p("12. GENERAL PROVISIONS", true);
  p(`12.1 Governing Law: This Agreement is governed by laws of the State of ${v.governingState || "__________"}.`);
  p("12.2 Headings: headings are for convenience only and do not affect interpretation.", false, 3);
  p("13. EXECUTION", true);
  p("IN WITNESS WHEREOF, parties have executed this Agreement as of the Effective Date first written above.");
  p("SENIOR CREDITOR:", true);
  uf("Name", v.seniorSignName);
  p("Signature: _____________________");
  uf("Date", v.seniorSignDate, 22, 2.6);
  p("JUNIOR CREDITOR:", true);
  uf("Name", v.juniorSignName);
  p("Signature: _____________________");
  uf("Date", v.juniorSignDate);

  doc.save("subordinated_loan_agreement.pdf");
};

export default function SubordinatedLoanAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Subordinated Loan Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="subordinatedloanagreement"
    />
  );
}
