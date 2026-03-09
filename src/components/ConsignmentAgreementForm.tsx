import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Merchandise",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "consignorName", label: "Consignor name/entity", type: "text", required: true },
      { name: "consignorAddress", label: "Consignor address", type: "text", required: true },
      { name: "consigneeName", label: "Consignee name/entity", type: "text", required: true },
      { name: "consigneeAddress", label: "Consignee address", type: "text", required: true },
      { name: "merchandise", label: "Merchandise description", type: "textarea", required: true },
      { name: "territory", label: "Territory", type: "text", required: true },
      { name: "pricingParty", label: "Who sets final sales prices/discounts/terms", type: "text", required: true },
    ],
  },
  {
    label: "Commercial and Legal",
    fields: [
      { name: "proceedsPercent", label: "Consignor proceeds percentage", type: "text", required: true },
      { name: "installmentDay", label: "Installment payment day number", type: "text", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "consignorSignName", label: "Consignor signing name", type: "text", required: true },
      { name: "consignorSignTitle", label: "Consignor title (if applicable)", type: "text", required: false },
      { name: "consignorSignDate", label: "Consignor sign date", type: "date", required: true },
      { name: "consigneeSignName", label: "Consignee signing name", type: "text", required: true },
      { name: "consigneeSignTitle", label: "Consignee title (if applicable)", type: "text", required: false },
      { name: "consigneeSignDate", label: "Consignee sign date", type: "date", required: true },
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
  const title = "CONSIGNMENT AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `This Consignment Agreement (the "Agreement") is entered into and made effective as of ${values.effectiveDate || "[Effective Date]"}, by and between ${values.consignorName || "[Consignor Name/Entity]"}, having its principal place of business at ${values.consignorAddress || "[address]"} (the "Consignor"), and ${values.consigneeName || "[Consignee Name/Entity]"}, having its principal place of business at ${values.consigneeAddress || "[address]"} (the "Consignee").`
  );
  p('The Consignor and the Consignee may hereinafter be referred to individually as a "Party" and collectively as the "Parties."', false, 3);

  p("I. Right to Sell", true);
  p(`1.1 The Consignor is the lawful owner of ${values.merchandise || "[describe goods/merchandise]"} (the "Merchandise").`);
  p("1.2 The Consignor hereby grants to the Consignee the exclusive right to sell the Merchandise on consignment, subject to this Agreement.");
  p(`1.3 This exclusivity applies solely to ${values.territory || "[describe territory]"}.`);
  p("1.4 Consignor agrees to deliver Merchandise on consignment, and Consignee agrees to use best efforts to promote, market, and sell.");
  p(`1.5 Final sales prices, discounts, and terms shall be established by ${values.pricingParty || "[designating party: Consignor or Consignee]"}.`, false, 3);

  p("II. Proceeds of Sales", true);
  p(`2.1 Consignee shall remit to Consignor ${values.proceedsPercent || "[percentage]"}% of gross proceeds from sale of Merchandise.`);
  p(`2.2 Payments shall be made on or before the ${values.installmentDay || "[number]"}th day following close of each installment period in which proceeds were collected.`);
  p("2.3 With each payment, Consignee shall provide a written report showing calculation of proceeds and Consignor share, plus detailed current inventory statement.", false, 3);

  p("III. Records", true);
  p("3.1 Consignee shall maintain accurate, complete, and up-to-date books and records of all sales.");
  p("3.2 Consignor may inspect and audit such records during regular business hours upon reasonable prior written notice.", false, 3);

  p("IV. Title to Merchandise", true);
  p("4.1 Title to all consigned Merchandise remains with Consignor until sold to a bona fide purchaser.");
  p("4.2 Consignee has no right/title/ownership interest except as expressly set forth herein.", false, 3);

  p("V. Risk of Loss and Insurance", true);
  p("5.1 Consignee is solely responsible for loss, theft, shortage, or damage while Merchandise is in its possession/custody/control.");
  p("5.2 Consignee shall maintain insurance in adequate amounts to fully replace Merchandise for such loss/theft/damage.", false, 3);

  p("VI. Payroll Taxes and Employment Obligations", true);
  p("6.1 Consignee is solely responsible for payroll taxes, benefits, workers' compensation, and insurance obligations for its employees.");
  p("6.2 Consignee shall indemnify, defend, and hold harmless Consignor from claims/liabilities arising out of such obligations.", false, 3);

  p("VII. Defaults", true);
  p("7.1 Defaults include failure to remit payment when due, breach of other material obligations, and insolvency/bankruptcy/receivership of either Party.");
  p("7.2 Non-defaulting Party may terminate by written notice.");
  p(`7.3 Defaulting Party has ${values.cureDays || "[number]"} days from receipt of notice to cure. If uncured, termination becomes effective automatically.`, false, 3);

  p("VIII. Dispute Resolution", true);
  p("8.1 Parties shall first attempt in good faith to resolve disputes through amicable negotiation.");
  p("8.2 If negotiation fails, dispute shall be submitted to mediation under applicable statutory rules.");
  p("8.3 If mediation does not resolve the matter, either Party may pursue remedies available under applicable law.", false, 3);

  p("IX. Warranties and Limitation of Liability", true);
  p("9.1 Neither Party makes representations/warranties, express or implied, regarding condition/merchantability/fitness of Merchandise.");
  p("9.2 Neither Party shall be liable for indirect/incidental/consequential/special damages, including loss of profits, even if advised of possibility.", false, 3);

  p("X. Transfer of Rights", true);
  p("10.1 Agreement binds and benefits Parties and their heirs/executors/administrators/successors/permitted assigns.");
  p("10.2 Neither Party may assign/transfer rights or obligations without prior written consent of the other Party.", false, 3);

  p("XI. Entire Agreement", true);
  p("11.1 This Agreement is the entire agreement and supersedes all prior/contemporaneous oral or written understandings.", false, 3);
  p("XII. Amendment", true);
  p("12.1 This Agreement may be amended only by written instrument executed by both Parties.", false, 3);
  p("XIII. Severability", true);
  p("13.1 If any provision is invalid/unenforceable, it shall be enforced to maximum permissible extent and remaining provisions continue in effect.", false, 3);
  p("XIV. Waiver of Contractual Rights", true);
  p("14.1 Failure to enforce any provision is not a waiver and does not affect future strict enforcement.", false, 3);
  p("XV. Governing Law", true);
  p(`15.1 This Agreement is governed by, and construed in accordance with, laws of the State of ${values.governingState || "[insert state]"}, without regard to conflict-of-law principles.`, false, 3);

  p("XVI. Execution and Signatures", true);
  p("16.1 This Agreement shall be executed by duly authorized representatives and is effective as of the Effective Date.");
  p("CONSIGNOR: ___________________________");
  uf("Name", values.consignorSignName, 22);
  uf("Title (if applicable)", values.consignorSignTitle, 22);
  uf("Date", values.consignorSignDate, 22, 2);
  p("CONSIGNEE: ___________________________");
  uf("Name", values.consigneeSignName, 22);
  uf("Title (if applicable)", values.consigneeSignTitle, 22);
  uf("Date", values.consigneeSignDate, 22);

  doc.save("consignment_agreement.pdf");
};

export default function ConsignmentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Consignment Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="consignmentagreement"
    />
  );
}
