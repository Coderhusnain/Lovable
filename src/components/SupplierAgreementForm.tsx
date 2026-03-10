import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "supplierName", label: "Supplier name", type: "text", required: true },
      { name: "supplierAddress", label: "Supplier address", type: "text", required: true },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerAddress", label: "Customer address", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Goods & Commercial",
    fields: [
      { name: "goodsDescription", label: "Goods description", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "text", required: true },
      { name: "unitPrice", label: "Unit price", type: "text", required: true },
      { name: "totalPrice", label: "Total price", type: "text", required: true },
      { name: "totalContractValue", label: "Total contract value", type: "text", required: true },
      { name: "quotationDate", label: "Supplier quotation date", type: "date", required: true },
      { name: "paymentAmount", label: "Payment amount upon delivery", type: "text", required: true },
      { name: "cashDiscount", label: "Cash discount percentage", type: "text", required: true },
      { name: "cashDiscountDays", label: "Discount days", type: "text", required: true },
      { name: "interestRate", label: "Overdue interest rate %", type: "text", required: true },
      { name: "deliveryDeadline", label: "Delivery deadline", type: "text", required: true },
      { name: "remedyDays", label: "Supplier remedy days after return", type: "text", required: true },
      { name: "cureDays", label: "Default cure period (days)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "supplierSignName", label: "Supplier signatory name", type: "text", required: true },
      { name: "supplierSignTitle", label: "Supplier signatory title", type: "text", required: true },
      { name: "supplierSignDate", label: "Supplier sign date", type: "date", required: true },
      { name: "customerSignName", label: "Customer signatory name", type: "text", required: true },
      { name: "customerSignTitle", label: "Customer signatory title", type: "text", required: true },
      { name: "customerSignDate", label: "Customer sign date", type: "date", required: true },
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
    doc.setFontSize(10.3);
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

  const title = "SUPPLIER AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Supplier Agreement ("Agreement") is made and entered into as of ${v.effectiveDate || "____________"} (the "Effective Date"), by and between ` +
      `${v.supplierName || "____________"}, of ${v.supplierAddress || "____________"} (the "Supplier"), and ` +
      `${v.customerName || "____________"}, of ${v.customerAddress || "____________"} (the "Customer").`,
  );

  p("I. ITEMS PURCHASED", true);
  p(
    `Description: ${v.goodsDescription || "____________"}; Quantity: ${v.quantity || "____________"}; Unit Price: ${v.unitPrice || "____________"}; ` +
      `Total Price: ${v.totalPrice || "____________"}; Total Contract Value: ${v.totalContractValue || "____________"}.`,
  );
  p("II. PRODUCT STANDARDS", true);
  p(`Goods shall conform to Supplier quotation dated ${v.quotationDate || "____________"}, incorporated by reference.`);
  p("III. TITLE AND RISK OF LOSS", true);
  p("Title and risk pass to Customer upon delivery F.O.B. at Supplier plant to Customer designated agent/carrier.");
  p("IV. PAYMENT TERMS", true);
  p(
    `Payment to Supplier: ${v.paymentAmount || "____________"} upon delivery of all Goods. Cash discount of ${v.cashDiscount || "____"}% applies if paid within ` +
      `${v.cashDiscountDays || "____"} days. Overdue amounts bear interest at ${v.interestRate || "____"}% per annum or legal maximum. ` +
      "Customer bears collection costs including reasonable attorneys' fees. Non-payment is material breach.",
  );
  p("V. DELIVERY", true);
  p(`Time is of the essence. Delivery shall be arranged by Supplier through carrier of its choosing no later than ${v.deliveryDeadline || "____________"}.`);
  p("VI. TAXES", true);
  p("Customer pays all taxes arising from transaction except taxes imposed on Supplier income.");
  p("VII. WARRANTIES AND LIMITATION OF LIABILITY", true);
  p("Supplier warrants Goods free from material defects in workmanship/materials at delivery. Supplier excludes liability for incidental/special/indirect/consequential damages.");
  p("VIII. INSPECTION AND REJECTION", true);
  p(
    `Customer has reasonable opportunity to inspect. Non-conforming goods may be returned at Supplier expense with written reasons. ` +
      `Supplier has ${v.remedyDays || "____"} days from return receipt to remedy defects.`,
  );
  p("IX. DEFAULT", true);
  p("Default includes failure to pay, insolvency/bankruptcy, levy/seizure/assignment for creditors, or failure to supply/accept delivery per Agreement.");
  p("X. REMEDIES", true);
  p(`Default notice must specify breach details. Defaulting party has ${v.cureDays || "____"} days to cure; failing cure causes automatic termination unless waived in writing.`);
  p("XI. FORCE MAJEURE", true);
  p("Neither party is liable for delay/failure due to force majeure (acts of God, epidemics/pandemics, fire, explosion, riot, war, government orders, labor disturbances).");
  p("XII. DISPUTE RESOLUTION", true);
  p("Parties first attempt amicable negotiations, then submit unresolved disputes to mediation in good faith under applicable statutory mediation rules.");
  p("XIII. CONFIDENTIALITY", true);
  p("Parties shall keep confidential information received from the other party confidential during and after term; confidential documents are returned on request.");
  p("XIV. NOTICES", true);
  p("Notices are duly served by personal delivery or certified mail return receipt to stated addresses (or subsequently notified addresses).");
  p("XV. ASSIGNMENT", true);
  p("Neither party may assign/transfer Agreement in whole or part without prior written consent of other party.");
  p("XVI. ENTIRE AGREEMENT", true);
  p("This Agreement is entire understanding and supersedes prior oral/written negotiations, representations, or agreements.");
  p("XVII. AMENDMENT", true);
  p("Any amendment must be by written instrument duly signed by authorized representatives of both parties.");
  p("XVIII. SEVERABILITY", true);
  p("Invalid/unenforceable provisions do not affect remaining provisions; invalid provision is construed to extent needed to be enforceable.");
  p("XIX. WAIVER", true);
  p("Failure to enforce any provision is not waiver of that provision or right to later enforce strict compliance.");
  p("XX. GOVERNING LAW", true);
  p(`This Agreement is governed by and construed in accordance with the laws of ${v.governingLaw || "____________"}.`);
  p("XXI. ATTORNEYS' FEES", true);
  p("In legal action arising from this Agreement, prevailing party is entitled to recover reasonable attorneys' fees and costs.");
  p("XXII. SIGNATORIES", true);
  p("This Agreement is executed by duly authorized representatives and takes effect as of Effective Date first written above.");

  uf("For the Supplier - Name", v.supplierSignName);
  uf("Title", v.supplierSignTitle);
  uf("Date", v.supplierSignDate);
  y += 1.2;
  uf("For the Customer - Name", v.customerSignName);
  uf("Title", v.customerSignTitle);
  uf("Date", v.customerSignDate);

  doc.save("supplier_agreement.pdf");
};

export default function SupplierAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Supplier Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="supplieragreement"
    />
  );
}

