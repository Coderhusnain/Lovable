import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Goods",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller", type: "text", required: true },
      { name: "sellerAddress", label: "Seller address", type: "text", required: false },
      { name: "buyerName", label: "Buyer", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: false },
      { name: "description", label: "Goods description", type: "text", required: false },
      { name: "quantity", label: "Quantity", type: "text", required: false },
      { name: "unitPrice", label: "Unit price", type: "text", required: false },
      { name: "totalPrice", label: "Total price", type: "text", required: false },
      { name: "quoteDate", label: "Quotation date", type: "date", required: false },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "paymentTo", label: "Payment to", type: "text", required: false },
      { name: "paymentAmount", label: "Payment amount", type: "text", required: false },
      { name: "discountPercent", label: "Discount percent", type: "text", required: false },
      { name: "discountDays", label: "Discount days", type: "text", required: false },
      { name: "lateInterest", label: "Late interest %", type: "text", required: false },
      { name: "deliveryBy", label: "Delivery deadline", type: "date", required: false },
      { name: "inspectionCureDays", label: "Inspection cure days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
      { name: "sellerSignDate", label: "Seller sign date", type: "date", required: false },
      { name: "buyerSignDate", label: "Buyer sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (v?: string, min = 14) => (v || "").trim() || " ".repeat(min);
  const p = (t: string, b = false, g = 1.8) => { const lines = doc.splitTextToSize(t, tw); if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; } doc.setFont("helvetica", b ? "bold" : "normal"); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, v?: string, min = 20) => { const s = (v || "").trim(), lt = `${l}: `; if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; } doc.text(lt, m, y); const x = m + doc.getTextWidth(lt); if (s) { doc.text(s, x, y); doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(s)), y + 1.1); } else { doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1); } y += lh + 1.8; };
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); const title = "CONTRACT FOR SALE OF GOODS"; doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1); y += 9; doc.setFontSize(10.5);

  p(`This Contract for Sale of Goods is made as of ${u(values.effectiveDate, 12)} between ${u(values.sellerName, 12)} at ${u(values.sellerAddress, 12)} ("Seller") and ${u(values.buyerName, 12)} at ${u(values.buyerAddress, 12)} ("Buyer").`, false, 3);
  p("1. Sale of Goods", true);
  p(`Description: ${u(values.description, 12)}; Quantity: ${u(values.quantity, 6)}; Unit Price: ${u(values.unitPrice, 8)}; Total Price: ${u(values.totalPrice, 8)}. Goods shall be delivered as a single shipment unless otherwise agreed in writing.`);
  p("2. Product Standards", true);
  p(`Goods must comply with seller quotation dated ${u(values.quoteDate, 12)}, be free from defects, and conform to applicable laws/regulations.`);
  p("3. Title and Risk of Loss", true);
  p("Title and risk pass to Buyer upon delivery F.O.B. at Seller facility to Buyer's designated agent/carrier. Seller is responsible for proper packaging, labeling, and shipment documentation.");
  p("4. Payment Terms", true);
  p(`Payment to ${u(values.paymentTo, 10)} in amount $${u(values.paymentAmount, 8)} upon delivery. Discount ${u(values.discountPercent, 4)}% if paid within ${u(values.discountDays, 4)} days. Late amounts accrue ${u(values.lateInterest, 4)}% per annum or legal maximum, plus collection costs and attorney fees. Non-payment is material breach.`);
  p("5. Delivery", true);
  p(`Time is of essence. Delivery due no later than ${u(values.deliveryBy, 12)}. Seller arranges shipment via chosen carrier and must notify Buyer of anticipated delay with reasons and revised date.`);
  p("6. Taxes", true);
  p("Buyer pays all taxes/duties/government charges from sale/delivery except Seller income taxes and supplies tax-exemption documents if applicable.");
  p("7. Warranties", true);
  p(`Seller warrants freedom from defects at delivery and for ${u(values.inspectionCureDays, 4)} period as stated. Except express warranties, no implied warranties of merchantability/fitness. Seller not liable for incidental/special/consequential damages.`);
  p("8. Inspection", true);
  p(`Buyer may inspect upon delivery. Non-conforming goods may be rejected/returned at Seller expense with written reasons. Seller has ${u(values.inspectionCureDays, 4)} days to repair/replace/credit.`);
  p("9. Default", true);
  p("Default includes non-payment, insolvency/bankruptcy, seizure/assignment for creditors, or delivery failure.");
  p("10. Remedies Upon Default", true);
  p(`Non-defaulting party may terminate by written notice; defaulting party has ${u(values.defaultCureDays, 4)} days to cure; failure results in automatic termination unless waived in writing.`);
  p("11. Force Majeure", true);
  p("No liability for delays/failures beyond reasonable control (acts of God, epidemics/pandemics, war, civil unrest, strikes, government orders). Affected party must notify and mitigate.");
  p("12. Arbitration", true);
  p("Disputes resolved by binding arbitration under AAA Commercial Arbitration Rules; decision final and enforceable.");
  p("13. Confidentiality", true);
  p("Each party maintains confidentiality of proprietary information; obligation survives termination.");
  p("14. Notices", true);
  p("Notices by personal delivery or certified mail to listed addresses; deemed received on delivery or third day after mailing.");
  p("15. Entire Agreement", true); p("This Contract is the entire agreement and supersedes prior oral/written understandings.");
  p("16. Amendments", true); p("Amendments are valid only if written and signed by both parties.");
  p("17. Severability", true); p("Invalid provisions are limited/severed; remaining provisions remain effective.");
  p("18. Waiver", true); p("Failure to enforce is not waiver of future enforcement.");
  p("19. Governing Law", true); p(`This Contract is governed by ${u(values.governingLaw, 12)}.`);
  p("20. Signatures", true);
  p("Seller: ________________________"); uf("Date", values.sellerSignDate, 14);
  p("Buyer: ________________________"); uf("Date", values.buyerSignDate, 14);
  doc.save("contract_for_sale_of_goods.pdf");
};

export default function SaleOfGoodsForm() {
  return (
    <FormWizard
      steps={steps}
      title="Contract for Sale of Goods"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="saleofgoods"
    />
  );
}
