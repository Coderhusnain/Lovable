import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "creditorName", label: "Creditor name", type: "text", required: true },
      { name: "creditorAddress", label: "Creditor address", type: "text", required: true },
      { name: "creditorContact", label: "Creditor telephone/email", type: "text", required: false },
      { name: "debtorName", label: "Debtor name", type: "text", required: true },
      { name: "debtorAddress", label: "Debtor address", type: "text", required: true },
      { name: "debtorContact", label: "Debtor telephone/email", type: "text", required: false },
    ],
  },
  {
    label: "Debt and Settlement",
    fields: [
      { name: "outstandingDebt", label: "Outstanding debt amount", type: "text", required: true },
      { name: "debtNature", label: "Nature of debt", type: "text", required: true, placeholder: "loan, note, credit account, etc." },
      { name: "ackDebtWords", label: "Debt in figures and words", type: "text", required: true },
      { name: "settlementAmount", label: "Settlement amount in figures and words", type: "text", required: true },
      { name: "paymentMethod", label: "Payment method", type: "text", required: true, placeholder: "wire transfer / certified check / cashier's check / cash" },
      { name: "paymentDueDate", label: "Settlement payment due date", type: "date", required: true },
      { name: "accountName", label: "Payment account name", type: "text", required: false },
      { name: "bankName", label: "Bank name", type: "text", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "routingNumber", label: "Routing number", type: "text", required: false },
    ],
  },
  {
    label: "Law and Execution",
    fields: [
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "courtLocation", label: "Exclusive court location (county/state)", type: "text", required: true },
      { name: "releasorInitial1", label: "Releasor initial 1", type: "text", required: false },
      { name: "releasorInitial2", label: "Releasor initial 2", type: "text", required: false },
      { name: "debtorInitial1", label: "Debtor initial 1", type: "text", required: false },
      { name: "debtorInitial2", label: "Debtor initial 2", type: "text", required: false },
      { name: "creditorSignName", label: "Creditor signing name", type: "text", required: true },
      { name: "creditorSignTitle", label: "Creditor title", type: "text", required: false },
      { name: "creditorSignDate", label: "Creditor sign date", type: "date", required: true },
      { name: "debtorSignName", label: "Debtor signing name", type: "text", required: true },
      { name: "debtorSignTitle", label: "Debtor title", type: "text", required: false },
      { name: "debtorSignDate", label: "Debtor sign date", type: "date", required: true },
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
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
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
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Debt Settlement Agreement ("Agreement") is made and entered into as of ${values.agreementDate || "[Date]"}, by and between the following parties:`);
  p("Creditor:", true, 1);
  uf("Name", values.creditorName);
  uf("Address", values.creditorAddress);
  uf("Telephone/Email", values.creditorContact, 24, 2.4);
  p("Debtor:", true, 1);
  uf("Name", values.debtorName);
  uf("Address", values.debtorAddress);
  uf("Telephone/Email", values.debtorContact, 24, 2.4);
  p('Collectively referred to herein as the "Parties," and individually as a "Party."', false, 3);

  p("RECITALS", true);
  p(`WHEREAS, the Debtor is indebted to the Creditor in the total amount of ${values.outstandingDebt || "[insert amount]"} (the "Outstanding Debt") arising from ${values.debtNature || "[describe nature of debt]"}; and`);
  p("WHEREAS, the Parties desire to fully and finally resolve, discharge, and settle the Outstanding Debt and any related claims, disputes, or obligations between them without resort to litigation; and");
  p("WHEREAS, the Creditor has agreed to accept a reduced amount in full and final satisfaction of the Outstanding Debt, under the terms and conditions set forth herein.");
  p("NOW, THEREFORE, in consideration of the mutual covenants, promises, and representations contained herein, and intending to be legally bound, the Parties agree as follows:", false, 3);

  p("1. ACKNOWLEDGMENT OF DEBT", true);
  p(`1.1 The Debtor acknowledges and confirms that the Outstanding Debt owed to the Creditor as of the date of this Agreement is ${values.ackDebtWords || "[amount in figures and words]"}.`);
  p("1.2 The Debtor represents that the amount stated above constitutes the entire balance due and payable, and that there are no other claims, set-offs, or counterclaims against the Creditor related to this obligation.", false, 3);

  p("2. SETTLEMENT TERMS", true);
  p(`2.1 The Creditor agrees to accept payment in the amount of ${values.settlementAmount || "[insert settlement amount in figures and words]"} (the "Settlement Amount") as full and final satisfaction of the Outstanding Debt.`);
  p(`2.2 The Settlement Amount shall be paid by the Debtor via ${values.paymentMethod || "[wire transfer/certified check/cashier's check/cash]"} to the Creditor on or before ${values.paymentDueDate || "[insert payment due date]"}.`);
  p("2.3 Payment shall be made to the following account or address as designated by the Creditor:");
  uf("Account Name", values.accountName);
  uf("Bank Name", values.bankName);
  uf("Account Number", values.accountNumber);
  uf("Routing Number", values.routingNumber);
  p("2.4 Upon receipt and clearance of the full Settlement Amount, the Creditor shall release the Debtor from any further obligation or liability in connection with the Outstanding Debt.", false, 3);

  p("3. FAILURE TO PAY", true);
  p("3.1 Should the Debtor fail to remit the full Settlement Amount by the due date specified in Clause 2.2, this Agreement shall be deemed null and void, and the Creditor shall be entitled to demand immediate payment of the original amount owed plus any accrued interest, fees, or costs recoverable under applicable law.");
  p("3.2 The Debtor acknowledges that failure to comply with the payment obligation herein may result in legal action or other enforcement proceedings by the Creditor.", false, 3);

  p("4. RELEASE AND WAIVER", true);
  p("4.1 Upon full receipt of the Settlement Amount, the Creditor hereby fully and irrevocably releases, acquits, and forever discharges the Debtor and the Debtor's successors, assigns, agents, and representatives from any and all claims or demands arising from or related to the Outstanding Debt.");
  p("4.2 The Parties expressly acknowledge and agree that this release constitutes a full and final settlement and discharge of any and all disputes and liabilities relating to the debt.", false, 3);

  p("5. WAIVER OF CALIFORNIA CIVIL CODE § 1542", true);
  p("To the extent applicable, the Parties expressly waive the provisions of California Civil Code Section 1542, which provides as follows:");
  p('"A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR(S) DO NOT KNOW OR SUSPECT TO EXIST IN THEIR FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH, IF KNOWN BY THEM, MUST HAVE MATERIALLY AFFECTED THEIR SETTLEMENT WITH THE DEBTOR(S)."');
  p("Each Party acknowledges this waiver has been read, understood, and voluntarily made.");
  p(`Initials of Releasor(s): ${(values.releasorInitial1 || "").trim() || "_______"} ${(values.releasorInitial2 || "").trim() || "_______"}`);
  p(`Initials of Debtor(s): ${(values.debtorInitial1 || "").trim() || "_______"} ${(values.debtorInitial2 || "").trim() || "_______"}`, false, 3);

  p("6. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents and warrants authority/capacity to execute, binding enforceability of this Agreement, and no assignment of rights related to the subject matter.", false, 3);
  p("7. CONFIDENTIALITY", true);
  p("The Parties agree to maintain strict confidentiality regarding the existence and terms of this Agreement, except as required by law or necessary to enforce this Agreement.", false, 3);
  p("8. NO ADMISSION OF LIABILITY", true);
  p("This Agreement is a compromise of disputed claims and shall not be construed as an admission of liability by either Party.", false, 3);
  p("9. ENTIRE AGREEMENT", true);
  p("This Agreement is the entire understanding between the Parties and supersedes all prior discussions. Any amendment must be in writing and signed by both Parties.", false, 3);
  p("10. SEVERABILITY", true);
  p("If any provision is held invalid or unenforceable, the remaining provisions remain in full force and effect.", false, 3);
  p("11. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement shall be governed by the laws of the State of ${values.governingState || "[insert state]"}, and disputes shall be subject to the exclusive jurisdiction of courts in ${values.courtLocation || "[insert county and state]"}.`, false, 3);
  p("12. EXECUTION AND COUNTERPARTS", true);
  p("This Agreement may be executed in counterparts; electronic/facsimile/scanned signatures are legally binding.", false, 3);

  p("IN WITNESS WHEREOF, the Parties hereto have executed this Debt Settlement Agreement as of the date first above written.", true, 2);
  p("Creditor", true, 1);
  p("By: _________________________");
  uf("Name", values.creditorSignName, 22);
  uf("Title (if applicable)", values.creditorSignTitle, 22);
  uf("Date", values.creditorSignDate, 22, 2.6);
  p("Debtor", true, 1);
  p("By: _________________________");
  uf("Name", values.debtorSignName, 22);
  uf("Title (if applicable)", values.debtorSignTitle, 22);
  uf("Date", values.debtorSignDate, 22, 3);
  p("ACKNOWLEDGMENT", true);
  p("Both Parties acknowledge that they have carefully read this Agreement, fully understand its terms, and voluntarily execute it with the intent to be legally bound.");

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
