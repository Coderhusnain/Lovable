import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller full name / entity", type: "text", required: true },
      { name: "sellerAddress", label: "Seller principal place of business", type: "text", required: true },
      { name: "buyerName", label: "Buyer full name / entity", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer principal place of business", type: "text", required: true },
    ],
  },
  {
    label: "Goods & Pricing",
    fields: [
      { name: "goodsDescription", label: "Description of goods", type: "textarea", required: true },
      { name: "goodsQuantity", label: "Quantity", type: "text", required: false },
      { name: "unitPrice", label: "Unit price", type: "text", required: false },
      { name: "totalPrice", label: "Total price", type: "text", required: false },
      { name: "totalContractValue", label: "Total contract value", type: "text", required: false },
      { name: "quotationDate", label: "Seller's quotation date (clause 2)", type: "date", required: false },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      { name: "paymentRecipient", label: "Payment recipient name (clause 4.1)", type: "text", required: false },
      { name: "paymentTotalAmount", label: "Total payment amount ($)", type: "text", required: false },
      { name: "discountPercent", label: "Early payment discount (%)", type: "text", required: false },
      { name: "discountDays", label: "Days from invoice for discount eligibility", type: "text", required: false },
      { name: "interestRate", label: "Late payment interest rate (% per annum)", type: "text", required: false },
    ],
  },
  {
    label: "Delivery & Warranty",
    fields: [
      { name: "deliveryDeadline", label: "Delivery deadline date", type: "date", required: false },
      { name: "deliveryLocation", label: "Delivery location specified by Buyer", type: "text", required: false },
      { name: "warrantyPeriod", label: "Warranty period (e.g. 12 months)", type: "text", required: false },
      { name: "defectRemedyDays", label: "Days Seller has to remedy defect (clause 8.3)", type: "text", required: false },
      { name: "defaultCureDays", label: "Days to cure default after notice (clause 10.2)", type: "text", required: false },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingLaw", label: "Governing law (state/jurisdiction)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "sellerSignName", label: "Seller — signature / name", type: "text", required: false },
      { name: "sellerSignDate", label: "Seller — date", type: "date", required: false },
      { name: "buyerSignName", label: "Buyer — signature / name", type: "text", required: false },
      { name: "buyerSignDate", label: "Buyer — date", type: "date", required: false },
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

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => {
    if (y + needed > limit) { doc.addPage(); y = 20; }
  };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    checkBreak(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 2;
  };

  const sub = (num: string, text: string) => {
    const full = `${num}  ${text}`;
    const lines = doc.splitTextToSize(full, tw - 4);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 2, y);
    y += lines.length * lh + 2;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const lettered = (letter: string, text: string) => {
    const full = `(${letter}) ${text}`;
    const lines = doc.splitTextToSize(full, tw - 5);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 4, y);
    y += lines.length * lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "CONTRACT FOR SALE OF GOODS";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(
    `This Contract for Sale of Goods ("Contract") is made and entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.sellerName, 22)}, with a principal place of business at ${u(values.sellerAddress, 22)} ("Seller"), and ${u(values.buyerName, 22)}, with a principal place of business at ${u(values.buyerAddress, 22)} ("Buyer").`
  );
  y += 1;

  // ── 1. SALE OF GOODS ────────────────────────────────────────────────────
  heading("1. Sale of Goods");
  p("The Seller agrees to sell, and the Buyer agrees to purchase, the products specified below (the \"Goods\") under the terms and conditions of this Contract:");
  bullet(`Description: ${u(values.goodsDescription, 20)}`);
  bullet(`Quantity: ${u(values.goodsQuantity, 10)}`);
  bullet(`Unit Price: ${u(values.unitPrice, 10)}`);
  bullet(`Total Price: ${u(values.totalPrice, 10)}`);
  p(`Total Contract Value: ${u(values.totalContractValue, 14)}`);
  p("The parties agree that all Goods sold under this Contract shall be delivered as a single shipment unless otherwise agreed in writing.");

  // ── 2. PRODUCT STANDARDS ────────────────────────────────────────────────
  heading("2. Product Standards");
  p(
    `The Goods shall comply with the specifications, quality, and standards set forth in the Seller\u2019s quotation dated ${u(values.quotationDate, 12)}, which is incorporated herein by reference. The Goods shall be free from defects in materials and workmanship and shall conform to all applicable laws and regulations.`
  );

  // ── 3. TITLE AND RISK OF LOSS ───────────────────────────────────────────
  heading("3. Title and Risk of Loss");
  p(
    "Title to, and risk of loss of, the Goods shall pass to the Buyer upon delivery F.O.B. at the Seller\u2019s facility to the Buyer\u2019s designated agent, including any common carrier, notwithstanding any prepayment or freight arrangements. The Seller is responsible for properly packaging and labeling the Goods in accordance with industry standards and providing all necessary documentation for shipment."
  );

  // ── 4. PAYMENT TERMS ────────────────────────────────────────────────────
  heading("4. Payment Terms");
  sub(
    "1.",
    `Payment: The Buyer shall pay to ${u(values.paymentRecipient, 16)} the total sum of $${u(values.paymentTotalAmount, 10)} upon delivery of all Goods.`
  );
  sub(
    "2.",
    `Discounts: The Buyer shall be entitled to a ${u(values.discountPercent, 6)}% discount if payment is made within ${u(values.discountDays, 4)} days from the date of invoice.`
  );
  sub(
    "3.",
    `Late Payments: Any amounts not paid when due shall accrue interest at ${u(values.interestRate, 8)}% per annum or the maximum permitted by law, whichever is less. The Buyer shall also bear all reasonable costs of collection, including attorney\u2019s fees, court costs, and expenses.`
  );
  sub(
    "4.",
    "Material Breach: Failure to make payment when due shall constitute a material breach of this Contract, allowing the Seller to suspend performance, cancel the Contract, and pursue all available legal remedies."
  );

  // ── 5. DELIVERY ─────────────────────────────────────────────────────────
  heading("5. Delivery");
  sub(
    "1.",
    `Time of Delivery: Time is of the essence. Delivery shall be made by ${u(values.deliveryDeadline, 12)} to ${u(values.deliveryLocation, 18)} and shall be completed no later than ${u(values.deliveryDeadline, 12)}.`
  );
  sub(
    "2.",
    "Carrier: The Seller shall arrange shipment through a carrier of its choice and bear the responsibility for proper handling until delivery F.O.B. at the Seller\u2019s facility."
  );
  sub(
    "3.",
    "Delay: Any anticipated delay shall be communicated promptly in writing to the Buyer, including the reasons and estimated revised delivery date."
  );

  // ── 6. TAXES ────────────────────────────────────────────────────────────
  heading("6. Taxes");
  p(
    "The Buyer shall be responsible for all taxes, duties, or other governmental charges arising from the sale or delivery of the Goods, excluding the Seller\u2019s income taxes. The Buyer shall provide any documentation reasonably requested by the Seller to support tax exemptions."
  );

  // ── 7. WARRANTIES ───────────────────────────────────────────────────────
  heading("7. Warranties");
  sub(
    "1.",
    `The Seller warrants that the Goods shall be free from defects in material and workmanship at the time of delivery and for a period of ${u(values.warrantyPeriod, 12)} from delivery.`
  );
  sub(
    "2.",
    "Disclaimer: The Seller makes no other warranties, express or implied, including any implied warranties of merchantability or fitness for a particular purpose."
  );
  sub(
    "3.",
    "Limitation of Liability: The Seller shall not be liable for any incidental, special, or consequential damages arising from or related to the Goods, even if the Seller has been advised of the possibility thereof."
  );

  // ── 8. INSPECTION ───────────────────────────────────────────────────────
  heading("8. Inspection");
  sub(
    "1.",
    "The Buyer shall have a reasonable opportunity to inspect the Goods upon delivery to ensure compliance with this Contract."
  );
  sub(
    "2.",
    "If any Goods are found to be non-conforming, the Buyer may reject such Goods and return them to the Seller at the Seller\u2019s expense. Written notice detailing the reasons for rejection must be provided."
  );
  sub(
    "3.",
    `The Seller shall have ${u(values.defectRemedyDays, 6)} days to remedy any defect, including repair, replacement, or credit, at the Seller\u2019s discretion.`
  );

  // ── 9. DEFAULT ──────────────────────────────────────────────────────────
  heading("9. Default");
  p("The following events shall constitute a material default under this Contract:");
  lettered("a", "Failure to make payment when due;");
  lettered("b", "Insolvency, bankruptcy, or other financial incapacity of either party;");
  lettered("c", "Seizure, levy, or general assignment of property for the benefit of creditors;");
  lettered("d", "Failure to deliver or make available the Goods in accordance with the delivery schedule.");

  // ── 10. REMEDIES UPON DEFAULT ───────────────────────────────────────────
  heading("10. Remedies Upon Default");
  sub(
    "1.",
    "Upon a material default, the non-defaulting party may terminate this Contract by providing written notice specifying the nature of the default."
  );
  sub(
    "2.",
    `The defaulting party shall have ${u(values.defaultCureDays, 6)} days from receipt of such notice to cure the default.`
  );
  sub(
    "3.",
    "Failure to cure within the specified period shall result in automatic termination unless expressly waived in writing by the non-defaulting party."
  );
  sub(
    "4.",
    "Termination shall not relieve either party of accrued obligations, including payment obligations, or other liabilities incurred prior to termination."
  );

  // ── 11. FORCE MAJEURE ───────────────────────────────────────────────────
  heading("11. Force Majeure");
  sub(
    "1.",
    "Neither party shall be liable for any failure or delay in performance due to causes beyond its reasonable control, including acts of God, fire, flood, epidemic, pandemic, quarantine, war, civil unrest, labor disputes, or governmental orders."
  );
  sub(
    "2.",
    "The affected party shall notify the other promptly and use commercially reasonable efforts to mitigate the impact and resume performance as soon as practicable."
  );
  sub(
    "3.",
    "Acts or omissions by the affected party\u2019s employees, agents, or contractors shall be deemed within the party\u2019s reasonable control unless caused by Force Majeure."
  );

  // ── 12. ARBITRATION ─────────────────────────────────────────────────────
  heading("12. Arbitration");
  sub(
    "1.",
    "Any dispute arising out of or relating to this Contract shall be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association."
  );
  sub(
    "2.",
    "The parties shall select an arbitrator mutually; failing agreement, each party appoints one arbitrator, and the two shall appoint a third."
  );
  sub("3.", "Arbitration shall occur at a mutually agreed central location.");
  sub(
    "4.",
    "The arbitrators may issue mandatory or injunctive orders but may not modify the Contract terms or award punitive damages."
  );
  sub(
    "5.",
    "The arbitrator\u2019s decision shall be final and binding, and judgment may be entered in any court of competent jurisdiction."
  );

  // ── 13. CONFIDENTIALITY ─────────────────────────────────────────────────
  heading("13. Confidentiality");
  sub(
    "1.",
    "Each party shall maintain the confidentiality of all proprietary information obtained during the term of this Contract and shall take all reasonable steps to prevent unauthorized disclosure."
  );
  sub("2.", "Confidentiality obligations survive the termination of this Contract.");

  // ── 14. NOTICES ─────────────────────────────────────────────────────────
  heading("14. Notices");
  p(
    "Notices shall be delivered in person or by certified mail, return receipt requested, to the addresses listed above, or any other address provided in writing. Notices are deemed received upon delivery, acknowledgment, or the third day after mailing if unsigned."
  );

  // ── 15. ENTIRE AGREEMENT ────────────────────────────────────────────────
  heading("15. Entire Agreement");
  p(
    "This Contract constitutes the entire agreement between the parties regarding the Goods and supersedes all prior agreements, representations, or understandings, whether written or oral."
  );

  // ── 16. AMENDMENTS ──────────────────────────────────────────────────────
  heading("16. Amendments");
  p(
    "No amendment or modification of this Contract shall be valid unless in writing and signed by both parties."
  );

  // ── 17. SEVERABILITY ────────────────────────────────────────────────────
  heading("17. Severability");
  p(
    "If any provision is held invalid, illegal, or unenforceable, the remaining provisions shall remain fully effective. Any provision may be limited to make it enforceable."
  );

  // ── 18. WAIVER ──────────────────────────────────────────────────────────
  heading("18. Waiver");
  p(
    "Failure to enforce any provision shall not constitute a waiver of future enforcement of that or any other provision."
  );

  // ── 19. GOVERNING LAW ───────────────────────────────────────────────────
  heading("19. Governing Law");
  p(
    `This Contract shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 16)}.`
  );

  // ── 20. SIGNATURES ──────────────────────────────────────────────────────
  heading("20. Signatures");
  p("Executed as of the Effective Date:");
  y += 3;

  // Two-column Seller / Buyer
  checkBreak(24);
  const col1 = m;
  const col2 = w / 2 + 4;
  doc.setFont("helvetica", "normal");

  // Seller
  const sellerSig = (values.sellerSignName || "").trim();
  doc.text("Seller: ", col1, y);
  const sx = col1 + doc.getTextWidth("Seller: ");
  if (sellerSig) { doc.text(sellerSig, sx, y); doc.setLineWidth(0.22); doc.line(sx, y + 1.1, sx + Math.max(30, doc.getTextWidth(sellerSig)), y + 1.1); }
  else { doc.setLineWidth(0.22); doc.line(sx, y + 1.1, sx + 44, y + 1.1); }

  // Buyer
  doc.text("Buyer: ", col2, y);
  const bx = col2 + doc.getTextWidth("Buyer: ");
  const buyerSig = (values.buyerSignName || "").trim();
  if (buyerSig) { doc.text(buyerSig, bx, y); doc.line(bx, y + 1.1, bx + Math.max(30, doc.getTextWidth(buyerSig)), y + 1.1); }
  else { doc.line(bx, y + 1.1, bx + 44, y + 1.1); }
  y += lh + 3;

  // Dates
  doc.text("Date: ", col1, y);
  const sd = (values.sellerSignDate || "").trim();
  const sdx = col1 + doc.getTextWidth("Date: ");
  if (sd) doc.text(sd, sdx, y); doc.line(sdx, y + 1.1, sdx + 30, y + 1.1);
  doc.text("Date: ", col2, y);
  const bd = (values.buyerSignDate || "").trim();
  const bdx = col2 + doc.getTextWidth("Date: ");
  if (bd) doc.text(bd, bdx, y); doc.line(bdx, y + 1.1, bdx + 30, y + 1.1);

  doc.save("contract_for_sale_of_goods.pdf");
};

export default function ContractForSale() {
  return (
    <FormWizard
      steps={steps}
      title="Contract for Sale of Goods"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="contractforsale"
    />
  );
}