import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "sellerName", label: "Seller name", type: "text", required: true },
    { name: "sellerAddress", label: "Seller principal place of business", type: "text", required: true },
    { name: "buyerName", label: "Buyer name", type: "text", required: true },
    { name: "buyerAddress", label: "Buyer principal place of business", type: "text", required: true },
  ]},
  { label: "Goods and Pricing", fields: [
    { name: "goodsDescription", label: "Goods description", type: "textarea", required: true },
    { name: "quantity", label: "Quantity", type: "text", required: true },
    { name: "unitPrice", label: "Unit price", type: "text", required: true },
    { name: "totalPrice", label: "Total price", type: "text", required: true },
    { name: "totalContractValue", label: "Total contract value", type: "text", required: true },
    { name: "quotationDate", label: "Seller quotation date", type: "text", required: true },
  ]},
  { label: "Payment and Delivery", fields: [
    { name: "payToName", label: "Payment to name", type: "text", required: true },
    { name: "paymentTotal", label: "Payment total", type: "text", required: true },
    { name: "discountPercent", label: "Discount percent", type: "text", required: true },
    { name: "discountDays", label: "Discount days from invoice", type: "text", required: true },
    { name: "lateInterestPercent", label: "Late interest percent per annum", type: "text", required: true },
    { name: "deliveryByDate", label: "Delivery by date", type: "text", required: true },
    { name: "deliveryCompleteDate", label: "Delivery completed no later than", type: "text", required: true },
  ]},
  { label: "Warranty and Inspection", fields: [
    { name: "warrantyPeriod", label: "Warranty period from delivery", type: "text", required: true },
    { name: "remedyDays", label: "Seller remedy days", type: "text", required: true },
  ]},
  { label: "Default and Disputes", fields: [
    { name: "cureDays", label: "Default cure days", type: "text", required: true },
    { name: "arbitrationLocation", label: "Arbitration central location", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
  ]},
  { label: "Signatures", fields: [
    { name: "sellerSign", label: "Seller signature name", type: "text", required: true },
    { name: "sellerDate", label: "Seller date", type: "date", required: true },
    { name: "buyerSign", label: "Buyer signature name", type: "text", required: true },
    { name: "buyerDate", label: "Buyer date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.4) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  const title = "CONTRACT FOR SALE OF GOODS";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.text(title, w / 2, y, { align: "center" });
  const twi = doc.getTextWidth(title); doc.line(w / 2 - twi / 2, y + 1.2, w / 2 + twi / 2, y + 1.2); y += 9;

  p(`This Contract for Sale of Goods ("Contract") is made and entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between ${u(v.sellerName)}, with a principal place of business at ${u(v.sellerAddress)} ("Seller"), and ${u(v.buyerName)}, with a principal place of business at ${u(v.buyerAddress)} ("Buyer").`);
  p("1. Sale of Goods", true);
  p(`Seller agrees to sell and Buyer agrees to purchase the Goods: Description ${u(v.goodsDescription, 20)}; Quantity ${u(v.quantity)}; Unit Price ${u(v.unitPrice)}; Total Price ${u(v.totalPrice)}; Total Contract Value ${u(v.totalContractValue)}. Goods shall be delivered as a single shipment unless otherwise agreed in writing.`);
  p("2. Product Standards", true);
  p(`Goods shall comply with Seller's quotation dated ${u(v.quotationDate)} incorporated by reference, be free from defects in materials/workmanship, and conform to applicable laws/regulations.`);
  p("3. Title and Risk of Loss", true);
  p("Title and risk pass upon delivery F.O.B. at Seller's facility to Buyer's designated agent. Seller is responsible for proper packaging, labeling, and shipment documentation.");
  p("4. Payment Terms", true);
  p(`(1) Buyer shall pay to ${u(v.payToName)} the total sum of $${u(v.paymentTotal)} upon delivery of all Goods. (2) Buyer is entitled to ${u(v.discountPercent)}% discount if payment is made within ${u(v.discountDays)} days from invoice. (3) Late amounts accrue interest at ${u(v.lateInterestPercent)}% per annum or legal maximum, and Buyer bears reasonable collection costs including attorneys' fees/court costs/expenses. (4) Failure to pay when due is material breach allowing Seller to suspend performance, cancel Contract, and pursue remedies.`);
  p("5. Delivery", true);
  p(`(1) Time is of the essence. Delivery shall be made by ${u(v.deliveryByDate)} to Buyer's specified location and completed no later than ${u(v.deliveryCompleteDate)}. (2) Seller arranges carrier and remains responsible for handling until delivery F.O.B. at Seller's facility. (3) Anticipated delay must be promptly communicated in writing with reasons and revised date.`);
  p("6. Taxes", true);
  p("Buyer is responsible for taxes/duties/governmental charges arising from sale or delivery, excluding Seller income taxes, and shall provide documentation for exemptions as reasonably requested.");
  p("7. Warranties", true);
  p(`Seller warrants Goods are free from defects at delivery and for ${u(v.warrantyPeriod)} from delivery. Seller disclaims other express/implied warranties, including merchantability and fitness. Seller is not liable for incidental/special/consequential damages even if advised.`);
  p("8. Inspection", true);
  p(`Buyer has reasonable opportunity to inspect upon delivery. Non-conforming Goods may be rejected and returned at Seller expense with written reasons. Seller has ${u(v.remedyDays)} days to remedy by repair, replacement, or credit at Seller discretion.`);
  p("9. Default", true);
  p("Material default includes: failure to pay when due; insolvency/bankruptcy/financial incapacity; seizure/levy/general assignment for creditors; failure to deliver/make available Goods per schedule.");
  p("10. Remedies Upon Default", true);
  p(`Non-defaulting party may terminate by written notice stating default. Defaulting party has ${u(v.cureDays)} days to cure. Failure to cure results in automatic termination unless waived in writing. Termination does not relieve accrued obligations/liabilities.`);
  p("11. Force Majeure", true);
  p("No liability for performance failures/delays due to causes beyond reasonable control, including acts of God, epidemic/pandemic, quarantine, war, unrest, labor disputes, governmental orders. Affected party must notify promptly and mitigate.");
  p("12. Arbitration", true);
  p(`Disputes shall be resolved by binding AAA commercial arbitration. Parties mutually select arbitrator; if no agreement, each appoints one and those two appoint a third. Arbitration occurs at mutually agreed central location (${u(v.arbitrationLocation)}). Arbitrators may issue mandatory/injunctive orders but may not modify Contract or award punitive damages. Award is final and enforceable.`);
  p("13-20. Confidentiality, Notices, Entire Agreement, Amendments, Severability, Waiver, Governing Law, Signatures", true);
  p(`Each party maintains confidentiality and obligations survive termination. Notices are by personal delivery or certified mail. Entire agreement/supersedes prior understandings. Amendments must be written/signed. Invalid provisions are severed. Non-enforcement is not waiver. Governing law: ${u(v.governingLawState)}.`);
  p("Executed as of the Effective Date:", true);
  uf("Seller", v.sellerSign); uf("Date", v.sellerDate);
  uf("Buyer", v.buyerSign); uf("Date", v.buyerDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("contract_for_sale_of_goods.pdf");
};

export default function ContractForSale() {
  return <FormWizard steps={steps} title="Contract For Sale Of Goods" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="contractforsale" />;
}
