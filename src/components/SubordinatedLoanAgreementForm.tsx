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

  // Plain paragraph — pass bold=true for headings/sub-headings
  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Bullet point — • with 6 mm indent, text wraps within indent
  const bullet = (t: string, gap = 1.8) => {
    const indent = m + 6;
    const lines = doc.splitTextToSize(t, tw - 6);
    if (y + lines.length * lh + gap > bottom) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("\u2022", m + 1.5, y);
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) { doc.addPage(); y = 20; }
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

  // ── Title ──────────────────────────────────────────────────────────────────
  const title = "SUBORDINATED LOAN AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  // ── Preamble ───────────────────────────────────────────────────────────────
  p(`This Subordinated Loan Agreement (this "Agreement") is entered into as of ${v.effectiveDate || "__________"} (the "Effective Date"), by and among:`);
  p(`${v.seniorCreditor || "__________________"}, as senior creditor (the "Senior Creditor");`);
  p(`${v.juniorCreditor || "__________________"}, as junior creditor (the "Junior Creditor"); and`);
  p(`${v.borrower || "__________________"}, as borrower (the "Borrower").`);
  p("The parties agree as follows:", false, 3);

  // ── 1. DEFINITIONS ────────────────────────────────────────────────────────
  p("1. DEFINITIONS", true);
  p("For purposes of this Agreement, the following terms shall have the meanings set forth below:");

  p("1.1 Junior Debt", true);
  p(
    "\u201cJunior Debt\u201d means all present and future loans, advances, indebtedness, liabilities, and obligations of every kind and nature of the Borrower to the Junior Creditor, whether now existing or hereafter arising, whether direct or indirect, absolute or contingent, matured or unmatured, secured or unsecured."
  );

  p("1.2 Senior Debt", true);
  p(
    "\u201cSenior Debt\u201d means all present and future indebtedness, liabilities, and obligations of the Borrower to the Senior Creditor, including without limitation all principal, interest (including interest accruing after the commencement of any bankruptcy or insolvency proceeding), fees, costs, expenses, and attorneys\u2019 fees.",
    false,
    3
  );

  // ── 2. SUBORDINATION OF PAYMENT ───────────────────────────────────────────
  p("2. SUBORDINATION OF PAYMENT", true);
  p(
    "The Junior Creditor hereby agrees that payment of the Junior Debt is and shall be fully and irrevocably subordinated to the prior payment in full of all Senior Debt."
  );
  p(
    "Until the Senior Debt has been indefeasibly paid in full in cash, no payment or distribution of any kind shall be made on account of the Junior Debt, except as expressly permitted under this Agreement.",
    false,
    3
  );

  // ── 3. DEFAULT UNDER SENIOR DEBT ─────────────────────────────────────────
  p("3. DEFAULT UNDER SENIOR DEBT", true);
  p(
    "Upon the occurrence and during the continuance of any default with respect to the Senior Debt, the Junior Creditor shall not:"
  );
  bullet("demand payment of the Junior Debt;");
  bullet("commence or participate in any action to collect the Junior Debt; or");
  bullet("receive or accept any payment from the Borrower on account of the Junior Debt.", 3);

  // ── 4. PAYMENTS HELD IN TRUST ─────────────────────────────────────────────
  p("4. PAYMENTS HELD IN TRUST", true);
  p(
    "If the Junior Creditor receives any payment or distribution in violation of this Agreement, such payment shall be deemed to have been received in trust for the benefit of the Senior Creditor and shall be immediately delivered to the Senior Creditor to be applied against the Senior Debt.",
    false,
    3
  );

  // ── 5. NO INDEPENDENT ACTION ──────────────────────────────────────────────
  p("5. NO INDEPENDENT ACTION", true);
  p(
    "Until the Senior Debt has been paid in full, the Junior Creditor shall not commence, prosecute, or participate in any insolvency, bankruptcy, receivership, or similar proceeding against the Borrower unless:"
  );
  bullet("(a) the Senior Creditor has joined in such proceeding; or");
  bullet("(b) the Senior Creditor has been paid in full prior to such action.", 3);

  // ── 6. BANKRUPTCY; ATTORNEY-IN-FACT ──────────────────────────────────────
  p("6. BANKRUPTCY; ATTORNEY-IN-FACT", true);
  p(
    "In any bankruptcy or insolvency proceeding involving the Borrower, the Junior Creditor hereby irrevocably appoints the Senior Creditor as its attorney-in-fact, with full authority to:"
  );
  bullet("file proofs of claim on behalf of the Junior Creditor; and");
  bullet("receive and apply distributions attributable to the Junior Debt in accordance with this Agreement,");
  p("to the extent the Junior Creditor fails or refuses to do so.", false, 3);

  // ── 7. SUBORDINATION OF LIENS ─────────────────────────────────────────────
  p("7. SUBORDINATION OF LIENS", true);
  p(
    "Any lien, security interest, or collateral held by the Junior Creditor securing the Junior Debt shall be and remain junior and subordinate in all respects to any lien or security interest securing the Senior Debt, regardless of the time or order of perfection.",
    false,
    3
  );

  // ── 8. RIGHTS OF SENIOR CREDITOR ─────────────────────────────────────────
  p("8. RIGHTS OF SENIOR CREDITOR", true);
  p("The Senior Creditor may, without notice to or consent of the Junior Creditor:");
  bullet("extend, renew, or modify the Senior Debt;");
  bullet("waive, compromise, or settle the Senior Debt;");
  bullet("release or substitute collateral; or");
  bullet("amend the terms of its loan documents with the Borrower.");
  p("No such action shall impair or affect the subordination provisions of this Agreement.", false, 3);

  // ── 9. AFFIRMATIVE COVENANTS OF JUNIOR CREDITOR ───────────────────────────
  p("9. AFFIRMATIVE COVENANTS OF JUNIOR CREDITOR", true);
  p("The Junior Creditor shall:");
  bullet("clearly reflect the subordination of the Junior Debt in its books, records, and financial statements; and");
  bullet(
    "take all actions reasonably requested by the Senior Creditor to evidence or enforce the subordination contemplated by this Agreement.",
    3
  );

  // ── 10. NEGATIVE COVENANTS OF JUNIOR CREDITOR ────────────────────────────
  p("10. NEGATIVE COVENANTS OF JUNIOR CREDITOR", true);
  p(
    "Until the Senior Debt has been paid in full, the Junior Creditor shall not, without the prior written consent of the Senior Creditor:"
  );
  bullet("(a) materially waive, release, or modify the Junior Debt or any related security;");
  bullet("(b) compromise or settle the Junior Debt or permit any setoff or counterclaim;");
  bullet("(c) exchange any portion of the Junior Debt for equity or other ownership interests in the Borrower.", 3);

  // ── 11. ASSIGNMENT ────────────────────────────────────────────────────────
  p("11. ASSIGNMENT", true);

  p("11.1 Junior Creditor", true);
  p(
    "The Junior Creditor may not assign or transfer its claims against the Borrower while the Senior Debt remains outstanding unless such assignment is expressly made subject to this Agreement. This Agreement shall be binding upon the Junior Creditor\u2019s successors and assigns."
  );

  p("11.2 Senior Creditor", true);
  p(
    "The Senior Creditor may assign this Agreement in connection with any assignment or transfer of the Senior Debt. This Agreement shall inure to the benefit of the Senior Creditor and its successors and assigns.",
    false,
    3
  );

  // ── 12. GENERAL PROVISIONS ────────────────────────────────────────────────
  p("12. GENERAL PROVISIONS", true);

  p("12.1 Governing Law", true);
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${v.governingState || "__________"}.`
  );

  p("12.2 Headings", true);
  p(
    "Section headings are included for convenience only and shall not affect the interpretation of this Agreement.",
    false,
    3
  );

  // ── 13. EXECUTION ─────────────────────────────────────────────────────────
  p("13. EXECUTION", true);
  p(
    "IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date first written above."
  );

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
