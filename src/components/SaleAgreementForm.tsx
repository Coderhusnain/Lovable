import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Property",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "sellerAddress", label: "Seller full residential address", type: "text", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer full residential address", type: "text", required: true },
      { name: "propertyDetails", label: "Demised property details", type: "textarea", required: true },
      { name: "salePriceNumeric", label: "Sale price (numeric figure)", type: "text", required: true },
      { name: "salePriceWords", label: "Sale price (worded figure)", type: "text", required: true },
      { name: "scheduleNumber", label: "Schedule number", type: "text", required: true },
    ],
  },
  {
    label: "Terms",
    fields: [
      { name: "investmentPeriod", label: "Investment period end (text)", type: "text", required: true },
      { name: "sellerActionDays", label: "Seller action timeline days", type: "text", required: true, placeholder: "14" },
      { name: "arbitrationAmicableDays", label: "Amicable settlement days", type: "text", required: true, placeholder: "15" },
      { name: "forceMajeureNoticeHours", label: "Force majeure notice hours", type: "text", required: true, placeholder: "48" },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "sellerSignatory", label: "Seller signatory name", type: "text", required: true },
      { name: "buyerSignatory", label: "Buyer signatory name", type: "text", required: true },
      { name: "sellerSignDate", label: "Seller sign date", type: "date", required: true },
      { name: "buyerSignDate", label: "Buyer sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (v?: string, n = 16) => (v || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const l = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(l, m, y);
    const x = m + doc.getTextWidth(l);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(22, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  const title = "AGREEMENT TO SELL";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This AGREEMENT TO SELL ("Agreement") is made at Islamabad on this ${u(values.agreementDate)} ("Effective Date").`);
  p("BY AND BETWEEN", true);
  p(`${u(values.sellerName)} residing at ${u(values.sellerAddress)}, hereinafter referred to as the "Seller", including legal heirs, agents, successors-in-interest, and permitted assigns;`);
  p("AND");
  p(`${u(values.buyerName)} residing at ${u(values.buyerAddress)}, hereinafter referred to as the "Buyer", including legal heirs, agents, successors-in-interest, and permitted assigns.`);
  p('(The Seller and Buyer may individually be referred to as "Party" or collectively as "Parties").');
  p("RECITALS", true);
  p(`I. WHEREAS, the Seller warrants and represents that it is the absolute, rightful and lawful title holder/owner of ${u(values.propertyDetails, 24)}.`);
  p("II. WHEREAS, the Seller is desirous of selling the Demised Property and the Buyer is desirous of purchasing the Demised Property free from encumbrances.");
  p("III. AND WHEREAS, the Parties have agreed to reduce the terms and conditions in writing.");
  p("NOW, THEREFORE, THIS AGREEMENT WITNESSTH AS FOLLOWS:", true);
  p("THE TRANSACTION", true);
  p("Subject to Terms and Conditions, the Seller agrees to sell and Buyer agrees to purchase the Demised Property together with complete ownership rights and appurtenances.");
  p(`The total value of the Demised Property is ${u(values.salePriceNumeric)} /- (${u(values.salePriceWords)}) constituting the Sale Price.`);
  p("The Seller affirms receipt of Sale Price and shall: hand over peaceful vacant possession within two (02) years, execute sale deed, and hand over documents in the relevant Schedule.");
  p(`The Seller shall hand over all documents/things as specified in Schedule ${u(values.scheduleNumber, 2)} hereto.`);
  p("Seller remains liable for dues, charges, utility bills, and claims up to execution of sale deed; Buyer liable thereafter.");
  p("All taxes, charges, stamp duty and dues for transfer shall be on account of Buyer.");
  p("REPRESENTATIONS AND WARRANTIES OF SELLER", true);
  p("Seller has authority, lawful title, no disabling litigation, and shall complete construction by end of investment period.");
  p(`Seller shall complete construction by end of investment period: ${u(values.investmentPeriod)}.`);
  p("Seller shall indemnify Buyer for losses arising from breaches, taxes/liabilities, operations, and applicable law compliance.");
  p(`Seller shall not delay any act and shall perform within ${u(values.sellerActionDays, 2)} days when due.`);
  p("Seller shall ensure security arrangements and yearly maintenance after completion/transfer.");
  p("If project is cancelled/discontinued, Seller shall return full amounts received toward Sale Price without deductions.");
  p("REPRESENTATIONS AND WARRANTIES OF BUYER", true);
  p("Buyer acknowledges project is under construction; Demised Property remains non-transferable and possession may be delayed accordingly.");
  p("Buyer shall not transfer without NOC from Seller; shall avoid unauthorized structural changes or encroachment.");
  p("Buyer may request special materials/fittings in advance and shall bear related costs.");
  p("CONFIDENTIAL INFORMATION", true);
  p("Parties shall retain confidential information in strict confidence and prevent unauthorized use/disclosure.");
  p("ARTICLE 5 - GOVERNING LAW AND JURISDICTION", true);
  p("This Agreement is governed by applicable laws and Parties shall ensure compliance.");
  p("DISPUTE RESOLUTION", true);
  p(`Parties shall first attempt amicable settlement within ${u(values.arbitrationAmicableDays, 2)} days, failing which arbitration shall apply before any court action.`);
  p("If sole arbitrator appointment is not agreed, each Party appoints one arbitrator and disagreements go to an Umpire with final binding decision.");
  p("STAMP AND REGISTRATION", true);
  p("Agreement shall be stamped and duly registered. Buyer shall pay stamp duty and registration fee. Seller shall fully cooperate.");
  p("ARTICLE 8 - NOTICE", true);
  p("Notices shall be in writing and sent to designated addresses, cellular number and/or email, including updated addresses notified in writing.");
  p("FORCE MAJEURE", true);
  p(`Affected Party shall notify the other within ${u(values.forceMajeureNoticeHours, 2)} hours with details and preliminary delay estimate.`);
  p("SEVERABILITY", true);
  p("If any provision is void/unenforceable, remaining provisions continue in force consistent with Parties' intentions.");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement at the place and date indicated above.", true);
  uf("On behalf of Seller", values.sellerSignatory);
  uf("Date", values.sellerSignDate);
  uf("Buyer", values.buyerSignatory);
  uf("Date", values.buyerSignDate);

  doc.save("agreement_to_sell.pdf");
};

export default function SaleAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Agreement to Sell"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="saleagreement"
    />
  );
}
