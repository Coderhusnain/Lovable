import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "sellerAddress", label: "Seller address", type: "text", required: true },
      { name: "purchaserName", label: "Purchaser name", type: "text", required: true },
      { name: "purchaserAddress", label: "Purchaser address", type: "text", required: true },
      { name: "corporationName", label: "Corporation name", type: "text", required: true },
      { name: "corporationType", label: "Corporation type", type: "text", required: true },
      { name: "corporationJurisdiction", label: "Corporation jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Stock & Closing",
    fields: [
      { name: "shares", label: "Number of shares", type: "text", required: true },
      { name: "purchasePrice", label: "Total purchase price", type: "text", required: true },
      { name: "initialPayment", label: "Initial payment", type: "text", required: true },
      { name: "balancePayment", label: "Balance at closing", type: "text", required: true },
      { name: "closingTime", label: "Closing time", type: "text", required: true },
      { name: "closingLocation", label: "Closing location", type: "text", required: true },
      { name: "arbitrationLocation", label: "Arbitration city/state", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "sellerSignName", label: "Seller signatory name", type: "text", required: true },
      { name: "sellerTitle", label: "Seller title", type: "text", required: true },
      { name: "sellerSignDate", label: "Seller sign date", type: "date", required: true },
      { name: "purchaserSignName", label: "Purchaser signatory name", type: "text", required: true },
      { name: "purchaserTitle", label: "Purchaser title", type: "text", required: true },
      { name: "purchaserSignDate", label: "Purchaser sign date", type: "date", required: true },
      { name: "witnessOne", label: "Witness 1 name/signature", type: "text", required: false },
      { name: "witnessTwo", label: "Witness 2 name/signature", type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1.2;
  };

  const title = "STOCK PURCHASE AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Stock Purchase Agreement (the "Agreement") is made and entered into as of ${v.effectiveDate || "____________"} (the "Effective Date"), by and between: ` +
      `${v.sellerName || "____________"}, having an address at ${v.sellerAddress || "____________"} ("Seller"), and ` +
      `${v.purchaserName || "____________"}, having an address at ${v.purchaserAddress || "____________"} ("Purchaser").`,
  );
  p("RECITALS", true);
  p(
    `WHEREAS, Seller is a stockholder of ${v.corporationName || "____________"}, a ${v.corporationType || "____________"}, duly organized and in good standing under ` +
      `the laws of ${v.corporationJurisdiction || "____________"}, and lawful owner of ${v.shares || "____________"} shares (the "Stock"); ` +
      "WHEREAS, Purchaser desires to purchase and Seller desires to sell the Stock; NOW, THEREFORE, Parties agree as follows:",
  );

  p("1. PURCHASE AND SALE OF STOCK", true);
  p("1.1 Seller sells/transfers/assigns all right, title, and interest in the Stock to Purchaser at Closing.");
  p("1.2 Seller shall deliver stock certificates duly endorsed/stock powers in blank with guaranteed signatures and transfer taxes paid.");
  p("2. PURCHASE PRICE AND PAYMENT", true);
  p(
    `2.1 Purchase Price: ${v.purchasePrice || "____________"}. 2.2 Initial Payment: ${v.initialPayment || "____________"} upon execution; ` +
      `Balance Payment: ${v.balancePayment || "____________"} at Closing. 2.3 Payment by wire transfer or mutually agreed written method.`,
  );
  p("3. CLOSING", true);
  p(
    `3.1 Closing time/place: ${v.closingTime || "____________"} at ${v.closingLocation || "____________"} (or as mutually agreed). ` +
      "3.2 At closing, Seller delivers endorsed certificates and transfer documents; Purchaser pays Purchase Price.",
  );
  p("4. REPRESENTATIONS AND WARRANTIES OF THE SELLER", true);
  p(
    "Seller represents lawful ownership free of liens/encumbrances, full authority to transfer, corporation good standing, " +
      "no conflicting agreements, no outstanding rights affecting stock, and no broker/finder fees payable.",
  );
  p("5. REPRESENTATIONS AND WARRANTIES OF THE PURCHASER", true);
  p("Purchaser has full authority, acquires stock for own investment account (not resale/distribution), and has no conflicting obligations.");
  p("6. COVENANTS OF THE PARTIES", true);
  p("Parties execute additional instruments for transfer, maintain confidentiality, and comply with applicable law for contemplated transactions.");
  p("7. GENERAL PROVISIONS", true);
  p(
    "Entire Agreement; Amendment in signed writing; Severability with reformation; Waiver only in writing; Assignment only with consent; " +
      "Binding effect on successors/assigns; Notices in writing (delivery/certified mail/courier/electronic confirmation).",
  );
  p(`7.8 Governing Law: ${v.governingLaw || "____________"}.`);
  p(
    `7.9 Dispute Resolution: Negotiation first, then binding arbitration under AAA rules in ${v.arbitrationLocation || "____________"}, ` +
      "with final enforceable award and prevailing-party attorneys' fees/costs.",
  );
  p("7.10 Force Majeure: Neither party liable for delays/failures caused by events beyond reasonable control.");
  p("8. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Stock Purchase Agreement as of the Effective Date written above.");

  uf("SELLER - Signature/Name", v.sellerSignName);
  uf("Title", v.sellerTitle);
  uf("Date", v.sellerSignDate);
  y += 1.2;
  uf("PURCHASER - Signature/Name", v.purchaserSignName);
  uf("Title", v.purchaserTitle);
  uf("Date", v.purchaserSignDate);
  if (v.witnessOne) uf("Witness 1", v.witnessOne);
  if (v.witnessTwo) uf("Witness 2", v.witnessTwo);

  doc.save("stock_purchase_agreement.pdf");
};

export default function StockPurchaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Stock Purchase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="stockpurchaseagreement"
    />
  );
}

