import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Details",
    fields: [
      { name: "effectiveDate",    label: "Effective date",             type: "date", required: false },
      { name: "creditorName",     label: "Creditor name",              type: "text", required: false },
      { name: "debtorName",       label: "Debtor(s) name",             type: "text", required: false },
      { name: "outstandingDebt",  label: "Outstanding debt ($)",       type: "text", required: false },
      { name: "settlementAmount", label: "Settlement amount ($)",      type: "text", required: false },
      { name: "paymentDeadline",  label: "Payment deadline",           type: "date", required: false },
      { name: "governingLaw",     label: "Governing law (state)",      type: "text", required: false },
      { name: "creditorSignName", label: "Creditor name (sign block)", type: "text", required: false },
      { name: "creditorDate",     label: "Creditor date",              type: "date", required: false },
      { name: "debtorSignName",   label: "Debtor name (sign block)",   type: "text", required: false },
      { name: "debtorDate",       label: "Debtor date",                type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc   = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const m     = 20;
  const tw    = pageW - m * 2;
  const lh    = 6;
  const limit = 275;
  let   y     = 22;

  /* ── helpers ──────────────────────────────────────────────────────────── */

  const setNormal = () => { doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); };
  const setBold   = () => { doc.setFont("helvetica", "bold");   doc.setFontSize(10.5); };

  /** Plain paragraph — pass bold=true for section headings */
  const p = (text: string, bold = false, gap = 2) => {
    if (bold) setBold(); else setNormal();
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 22; }
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  /** Bold numbered section heading with breathing room above */
  const heading = (text: string) => {
    y += 2;
    p(text, true, 2);
  };

  /** Underlined fill field — normal weight label */
  const uf = (label: string, value?: string, minChars = 26, gap = 2) => {
    setNormal();
    const shown    = (value || "").trim();
    const labelTxt = `${label}: `;
    if (y + lh + gap > limit) { doc.addPage(); y = 22; }
    doc.text(labelTxt, m, y);
    const x = m + doc.getTextWidth(labelTxt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.2, x + Math.max(10, doc.getTextWidth(shown) + 2), y + 1.2);
    } else {
      doc.line(x, y + 1.2, x + doc.getTextWidth("n".repeat(minChars)), y + 1.2);
    }
    y += lh + gap;
  };

  /** Bold label + underlined fill on same line e.g. "Creditor: ____" */
  const boldUf = (label: string, value?: string, minChars = 26, gap = 2) => {
    setBold();
    const shown    = (value || "").trim();
    const labelTxt = `${label}: `;
    if (y + lh + gap > limit) { doc.addPage(); y = 22; }
    doc.text(labelTxt, m, y);
    const x = m + doc.getTextWidth(labelTxt);
    setNormal();
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.2, x + Math.max(10, doc.getTextWidth(shown) + 2), y + 1.2);
    } else {
      doc.line(x, y + 1.2, x + doc.getTextWidth("n".repeat(minChars)), y + 1.2);
    }
    y += lh + gap;
  };

  /* ── Title ────────────────────────────────────────────────────────────── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "DEBT SETTLEMENT AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.45);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 14;   // <-- generous gap prevents any overlap with first paragraph

  /* ── Opening paragraph ────────────────────────────────────────────────── */
  const effDate = values.effectiveDate || "<insert date>";
  p(
    `This Debt Settlement Agreement (the "Agreement") is entered into and made effective as of ${effDate} (the "Effective Date"), by and between:`,
    false, 4
  );

  /* ── Party fields ─────────────────────────────────────────────────────── */
  boldUf("Creditor",  values.creditorName, 28);
  boldUf("Debtor(s)", values.debtorName,   28, 4);

  p(
    'The Creditor and the Debtor(s) are hereinafter collectively referred to as the "Parties," and individually as a "Party."',
    false, 4
  );

  /* ── Section 1 ────────────────────────────────────────────────────────── */
  heading("1.  Settlement of Debt");
  const outstanding = values.outstandingDebt  ? `$${values.outstandingDebt}`  : "$------";
  const settlement  = values.settlementAmount ? `$${values.settlementAmount}` : "$---------";
  const deadline    = values.paymentDeadline  || "__________";

  p(`The Parties acknowledge and agree that the total outstanding debt owed by the Debtor(s) to the Creditor as of the Effective Date is ${outstanding} (the "Outstanding Debt").`);
  p(`In full and final settlement of the Outstanding Debt, the Creditor agrees to accept a wire transfer payment in the amount of ${settlement} (the "Settlement Amount"), provided such payment is received by the Creditor on or before ${deadline} (the "Payment Deadline").`);
  p("Upon timely receipt and clearance of the Settlement Amount, the Outstanding Debt shall be deemed fully satisfied, settled, and discharged.", false, 4);

  /* ── Section 2 ────────────────────────────────────────────────────────── */
  heading("2.  Failure to Pay");
  p("If the Debtor(s) fail to remit the Settlement Amount in full by the Payment Deadline, the Creditor shall have the immediate right, without further notice or demand, to declare the original amount of the Outstanding Debt due and payable in full, less any payments previously received.", false, 4);

  /* ── Section 3 ────────────────────────────────────────────────────────── */
  heading("3.  Binding Effect");
  p("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective heirs, successors, assigns, and legal representatives.", false, 4);

  /* ── Section 4 ────────────────────────────────────────────────────────── */
  heading("4.  Release and Accord and Satisfaction");
  p("Upon receipt and clearance of the Settlement Amount, each Party hereby fully, finally, and forever releases and discharges the other Party from any and all claims, demands, causes of action, liabilities, damages, or obligations of any kind whatsoever, whether known or unknown, suspected or unsuspected, arising out of or relating to the Outstanding Debt.");
  p('The Parties acknowledge and agree that this Agreement constitutes a full and final accord and satisfaction of all disputes and claims between them relating to the Outstanding Debt.', false, 4);

  /* ── Section 5 ────────────────────────────────────────────────────────── */
  heading("5.  Governing Law");
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`, false, 4);

  /* ── Section 6 ────────────────────────────────────────────────────────── */
  heading("6.  Entire Agreement");
  p("This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, negotiations, discussions, representations, or understandings, whether written or oral.", false, 4);

  /* ── Section 7 ────────────────────────────────────────────────────────── */
  heading("7.  Authority");
  p("Each Party represents and warrants that it has the full power, authority, and legal right to enter into and perform this Agreement, and that this Agreement constitutes a valid and binding obligation enforceable against such Party.", false, 4);

  /* ── Section 8 ────────────────────────────────────────────────────────── */
  heading("8.  Covenant Not to Sue");
  p("Except solely for the purpose of enforcing the terms of this Agreement, each Party covenants and agrees not to commence, institute, or maintain any claim, action, or proceeding against the other Party arising out of any matter released under this Agreement. This Agreement shall serve as a complete bar to any such claim.", false, 4);

  /* ── Section 9 ────────────────────────────────────────────────────────── */
  heading("9.  Confidentiality");
  p("The terms and existence of this Agreement shall remain strictly confidential and shall not be disclosed to any third party except as required by law, court order, or subpoena, or to a Party's legal counsel or financial advisors.", false, 4);

  /* ── Section 10 ───────────────────────────────────────────────────────── */
  heading("10.  No Admission of Liability; Non-Disparagement");
  p("This Agreement is entered into as a compromise of disputed claims and shall not be construed as an admission of liability or wrongdoing by any Party. All liability is expressly denied.");
  p("Each Party further agrees not to make any disparaging statements regarding the other Party to any third party at any time.", false, 4);

  /* ── Section 11 ───────────────────────────────────────────────────────── */
  heading("11.  Amendments");
  p("No modification, amendment, or waiver of any provision of this Agreement shall be valid unless made in writing and signed by all Parties.", false, 4);

  /* ── Section 12 ───────────────────────────────────────────────────────── */
  heading("12.  Severability");
  p("If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be severed, and the remaining provisions shall continue in full force and effect.", false, 4);

  /* ── Section 13 ───────────────────────────────────────────────────────── */
  heading("13.  No Assignment of Claims");
  p("Each Party represents and warrants that it has not assigned, transferred, or conveyed any claim, right, or interest released under this Agreement to any third party.", false, 4);

  /* ── Section 14 ───────────────────────────────────────────────────────── */
  heading("14.  Execution");
  p("IN WITNESS WHEREOF, the Parties have executed this Debt Settlement Agreement as of the Effective Date first written above.", false, 6);

  /* ── Signature blocks ─────────────────────────────────────────────────── */
  p("CREDITOR:", true, 2);
  uf("Signature", "",                     32);
  uf("Name",      values.creditorSignName, 28);
  uf("Date",      values.creditorDate,     20, 6);

  p("DEBTOR(S):", true, 2);
  uf("Signature", "",                    32);
  uf("Name",      values.debtorSignName,  28);
  uf("Date",      values.debtorDate,      20);

  doc.save("debt_settlement_agreement.pdf");
};

export default function DebtSettlementAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Debt Settlement Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="debtsettlementagreement"
    />
  );
}