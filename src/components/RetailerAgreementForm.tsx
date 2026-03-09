import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Goods",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller (1st party)", type: "text", required: true },
      { name: "retailerName", label: "Retailer (2nd party)", type: "text", required: true },
      { name: "goodsDescription", label: "Goods description", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "text", required: false },
      { name: "unitPrice", label: "Unit price", type: "text", required: false },
      { name: "totalPrice", label: "Total price", type: "text", required: false },
      { name: "grandTotal", label: "Grand total", type: "text", required: false },
      { name: "quotationDate", label: "Quotation date", type: "date", required: false },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "paymentTo", label: "Payment payable to", type: "text", required: false },
      { name: "paymentAmount", label: "Payment amount", type: "text", required: false },
      { name: "lateInterest", label: "Late interest %", type: "text", required: false },
      { name: "deliveryBy", label: "Delivery deadline", type: "date", required: false },
      { name: "inspectionCureDays", label: "Inspection cure days", type: "text", required: false },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "retailerSignName", label: "Retailer signatory name", type: "text", required: false },
      { name: "retailerDesignation", label: "Retailer designation", type: "text", required: false },
      { name: "retailerId", label: "Retailer CNIC/ID", type: "text", required: false },
      { name: "retailerSignDate", label: "Retailer sign date", type: "date", required: false },
      { name: "sellerSignName", label: "Seller signatory name", type: "text", required: false },
      { name: "sellerDesignation", label: "Seller designation", type: "text", required: false },
      { name: "sellerId", label: "Seller CNIC/ID", type: "text", required: false },
      { name: "sellerSignDate", label: "Seller sign date", type: "date", required: false },
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
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
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
  const title = "RETAILER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Retailer Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} ("Effective Date"), by and between ${u(values.sellerName, 16)} (the "Seller"), and ${u(values.retailerName, 16)} (the "Retailer"). Seller and Retailer are individually a "Party" and collectively the "Parties."`);
  p("1. ITEMS PURCHASED", true);
  p("Seller agrees to supply and Retailer agrees to purchase the Goods in accordance with this Agreement:");
  p(`- Description: ${u(values.goodsDescription, 16)}`);
  p(`- Quantity: ${u(values.quantity, 8)}`);
  p(`- Unit Price: ${u(values.unitPrice, 8)}`);
  p(`- Total Price: ${u(values.totalPrice, 8)}`);
  p(`- Grand Total: ${u(values.grandTotal, 8)}`);
  p("2. PRODUCT STANDARDS", true);
  p(`Goods conform to Seller quotation dated ${u(values.quotationDate, 12)}, incorporated by reference as integral part of this Agreement.`);
  p("3. PRICING AND ORDERS", true);
  p("Goods ordered at mutually agreed prices/quantities and subject to Seller prevailing sale/shipment terms at acceptance of purchase order. Seller may revise future pricing upon reasonable prior notice and will use commercially reasonable efforts for timely supply.");
  p("4. SALE OF PRODUCTS", true);
  p("Seller sells Goods at stated prices under established order procedures. Price amendments are notified to Retailer and consistent with pricing offered to similarly situated retailers.");
  p("5. RELATIONSHIP OF THE PARTIES", true);
  p("Parties are independent contractors. Nothing creates partnership, joint venture, agency, or employer-employee relationship. Each Party is responsible for own employees, taxes, insurance, and statutory obligations.");
  p("6. TAXES", true);
  p("All non-income taxes on Goods (federal/provincial/state/local/use/sales) are borne by Retailer in accordance with law.");
  p("7. TITLE AND RISK OF LOSS", true);
  p("Title and risk of loss pass to Retailer upon F.O.B. delivery at Seller's plant to Retailer's designated carrier/agent, regardless of prepayment or freight allowance by Seller.");
  p("8. RETAIL FACILITIES", true);
  p("Retailer sells Goods only through facilities mutually approved by Parties and provides updated list of all locations offering Goods.");
  p("9. PAYMENT TERMS", true);
  p(`Payment shall be made to ${u(values.paymentTo, 12)} in amount ${u(values.paymentAmount, 10)} upon delivery of Goods. Net 30 days from invoice. Overdue invoices accrue interest at ${u(values.lateInterest, 6)}% per annum or legal maximum. Retailer bears collection costs including reasonable legal fees. Non-payment is material breach allowing Seller termination and legal remedies.`);
  p("10. DELIVERY", true);
  p(`Time is of the essence. Delivery arranged by Seller through nominated carrier and completed by ${u(values.deliveryBy, 12)}.`);
  p("11. WARRANTIES", true);
  p("Retailer receives applicable manufacturer warranties. Seller warrants Goods are free from material defects in workmanship/materials. Seller excludes incidental/indirect/special/consequential damages.");
  p("12. INSPECTION AND REJECTION", true);
  p(`Retailer has reasonable opportunity to inspect Goods. For non-conforming Goods, Retailer may return at Seller expense with written defect notice, and Seller has ${u(values.inspectionCureDays, 4)} days to cure.`);
  p("13. INTELLECTUAL PROPERTY", true);
  p("No intellectual property rights transfer to Retailer. Trademark/proprietary use requires Seller prior written consent and compliance with guidelines.");
  p("14. TERMINATION", true);
  p(`Agreement remains in force until terminated by either Party on ${u(values.terminationNoticeDays, 4)} days' prior written notice.`);
  p("15. MATERIAL DEFAULT", true);
  p("Default events include payment failure, insolvency/bankruptcy, seizure/attachment of assets, and failure to deliver Goods as agreed.");
  p("16. REMEDIES", true);
  p(`Upon default, non-defaulting Party may terminate if breach remains uncured within ${u(values.defaultCureDays, 4)} days after written notice.`);
  p("17. FORCE MAJEURE | 18. DISPUTE RESOLUTION | 19. CONFIDENTIALITY", true);
  p("Neither Party liable for delays beyond reasonable control. Disputes first through negotiation, then binding AAA arbitration. Confidential information remains protected during and after term and is returned on request.");
  p("20. DUTY TO COOPERATE | 21. NOTICES | 22. ASSIGNMENT", true);
  p("Retailer cooperates with lawful government inquiries relating to Goods. Notices by personal delivery/certified mail and deemed received upon delivery or three days after mailing. No assignment without prior written consent.");
  p("23. ENTIRE AGREEMENT | 24. AMENDMENT | 25. SEVERABILITY | 26. WAIVER | 27. GOVERNING LAW", true);
  p(`This Agreement is complete and supersedes prior understandings. Amendments require writing signed by both Parties. Invalid provisions are severed. Non-enforcement is not waiver. Governing law: ${u(values.governingLaw, 14)}.`, false, 3);
  p("28. EXECUTION", true);
  p("SIGNATORIES");
  p("For and on behalf of the Retailer");
  uf("Name", values.retailerSignName, 24);
  uf("Designation", values.retailerDesignation, 24);
  uf("CNIC / ID No.", values.retailerId, 24);
  p("Signature: __________________________");
  uf("Date", values.retailerSignDate, 24, 2.6);
  p("Company Seal (if applicable): __________");
  p("For and on behalf of the Seller");
  uf("Name", values.sellerSignName, 24);
  uf("Designation", values.sellerDesignation, 24);
  uf("CNIC / ID No.", values.sellerId, 24);
  p("Signature: __________________________");
  uf("Date", values.sellerSignDate, 24, 2.6);
  p("Company Seal (if applicable): __________");

  doc.save("retailer_agreement.pdf");
};

export default function RetailerAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Retailer Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="retaileragreement"
    />
  );
}
