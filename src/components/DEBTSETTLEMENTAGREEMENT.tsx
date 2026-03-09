import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Details",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: false },
      { name: "creditorName", label: "Creditor", type: "text", required: false },
      { name: "debtorName", label: "Debtor(s)", type: "text", required: false },
      { name: "outstandingDebt", label: "Outstanding debt", type: "text", required: false },
      { name: "settlementAmount", label: "Settlement amount", type: "text", required: false },
      { name: "paymentDeadline", label: "Payment deadline", type: "date", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "creditorSignature", label: "Creditor signature", type: "text", required: false },
      { name: "creditorSignName", label: "Creditor name", type: "text", required: false },
      { name: "creditorDate", label: "Creditor date", type: "date", required: false },
      { name: "debtorSignature", label: "Debtor signature", type: "text", required: false },
      { name: "debtorSignName", label: "Debtor name", type: "text", required: false },
      { name: "debtorDate", label: "Debtor date", type: "date", required: false },
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
  const title = "DEBT SETTLEMENT AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`This Debt Settlement Agreement (the "Agreement") is entered into and made effective as of ${values.effectiveDate || "<insert date>"} (the "Effective Date"), by and between:`);
  uf("Creditor", values.creditorName, 24);
  uf("Debtor(s)", values.debtorName, 24);
  p('The Creditor and the Debtor(s) are hereinafter collectively referred to as the "Parties," and individually as a "Party."');
  p("1. Settlement of Debt", true);
  p(`The Parties acknowledge and agree that the total outstanding debt owed by the Debtor(s) to the Creditor as of the Effective Date is $${values.outstandingDebt || "------"} (the "Outstanding Debt").`);
  p(`In full and final settlement of the Outstanding Debt, the Creditor agrees to accept a wire transfer payment in the amount of $${values.settlementAmount || "---------"} (the "Settlement Amount"), provided such payment is received by the Creditor on or before ${values.paymentDeadline || "__________"} (the "Payment Deadline").`);
  p("Upon timely receipt and clearance of the Settlement Amount, the Outstanding Debt shall be deemed fully satisfied, settled, and discharged.");
  p("2. Failure to Pay", true);
  p("If the Debtor(s) fail to remit the Settlement Amount in full by the Payment Deadline, the Creditor shall have the immediate right, without further notice or demand, to declare the original amount of the Outstanding Debt due and payable in full, less any payments previously received.");
  p("3. Binding Effect", true);
  p("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective heirs, successors, assigns, and legal representatives.");
  p("4. Release and Accord and Satisfaction", true);
  p("Upon receipt and clearance of the Settlement Amount, each Party hereby fully, finally, and forever releases and discharges the other Party from any and all claims, demands, causes of action, liabilities, damages, or obligations of any kind whatsoever, whether known or unknown, suspected or unsuspected, arising out of or relating to the Outstanding Debt.");
  p("The Parties acknowledge and agree that this Agreement constitutes a full and final accord and satisfaction of all disputes and claims between them relating to the Outstanding Debt.");
  p("5. Governing Law", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`);
  p("6. Entire Agreement", true);
  p("This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, negotiations, discussions, representations, or understandings, whether written or oral.");
  p("7. Authority", true);
  p("Each Party represents and warrants that it has the full power, authority, and legal right to enter into and perform this Agreement, and that this Agreement constitutes a valid and binding obligation enforceable against such Party.");
  p("8. Covenant Not to Sue", true);
  p("Except solely for the purpose of enforcing the terms of this Agreement, each Party covenants and agrees not to commence, institute, or maintain any claim, action, or proceeding against the other Party arising out of any matter released under this Agreement. This Agreement shall serve as a complete bar to any such claim.");
  p("9. Confidentiality", true);
  p("The terms and existence of this Agreement shall remain strictly confidential and shall not be disclosed to any third party except as required by law, court order, or subpoena, or to a Party's legal counsel or financial advisors.");
  p("10. No Admission of Liability; Non-Disparagement", true);
  p("This Agreement is entered into as a compromise of disputed claims and shall not be construed as an admission of liability or wrongdoing by any Party. All liability is expressly denied.");
  p("Each Party further agrees not to make any disparaging statements regarding the other Party to any third party at any time.");
  p("11. Amendments", true);
  p("No modification, amendment, or waiver of any provision of this Agreement shall be valid unless made in writing and signed by all Parties.");
  p("12. Severability", true);
  p("If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be severed, and the remaining provisions shall continue in full force and effect.");
  p("13. No Assignment of Claims", true);
  p("Each Party represents and warrants that it has not assigned, transferred, or conveyed any claim, right, or interest released under this Agreement to any third party.");
  p("14. Execution", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Debt Settlement Agreement as of the Effective Date first written above.");
  p("CREDITOR:", true);
  uf("Signature", values.creditorSignature, 28);
  uf("Name", values.creditorSignName, 24);
  uf("Date", values.creditorDate, 20, 2.4);
  p("DEBTOR(S):", true);
  uf("Signature", values.debtorSignature, 28);
  uf("Name", values.debtorSignName, 24);
  uf("Date", values.debtorDate, 20);

  doc.save("debt_settlement_agreement.pdf");
};

export default function DEBTSETTLEMENTAGREEMENT() {
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
