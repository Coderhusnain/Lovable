import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Goods",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "manufacturerName", label: "Manufacturer legal name", type: "text", required: true },
      { name: "manufacturerAddress", label: "Manufacturer address", type: "text", required: true },
      { name: "buyerName", label: "Buyer legal name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
      { name: "buyerBusiness", label: "Buyer business/product line", type: "text", required: true },
      { name: "productDescription", label: "Product description", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "text", required: true },
      { name: "unitPrice", label: "Unit price (USD)", type: "text", required: true },
      { name: "totalPrice", label: "Total price (USD)", type: "text", required: true },
      { name: "totalContractValue", label: "Total contract value (USD)", type: "text", required: true },
    ],
  },
  {
    label: "Delivery and Payment",
    fields: [
      { name: "deliveryDate", label: "Delivery date", type: "date", required: true },
      { name: "depositAmount", label: "Deposit amount", type: "text", required: true },
      { name: "balanceAmount", label: "Balance amount", type: "text", required: true },
      { name: "paymentAccount", label: "Payment account details", type: "text", required: true },
      { name: "earlyPayPercent", label: "Early payment discount %", type: "text", required: false },
      { name: "earlyPayDays", label: "Early payment days", type: "text", required: false },
      { name: "latePayPercent", label: "Late payment annual %", type: "text", required: false },
      { name: "inspectionDays", label: "Inspection period days", type: "text", required: true },
      { name: "repairDays", label: "Repair/replace cure days", type: "text", required: true },
      { name: "warrantyMonths", label: "Warranty period months", type: "text", required: true },
      { name: "insuranceAmount", label: "Manufacturer insurance amount", type: "text", required: false },
      { name: "insurerName", label: "Insurer name", type: "text", required: false },
    ],
  },
  {
    label: "Law and Signatures",
    fields: [
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: true },
      { name: "arbitrationCityState", label: "Arbitration city/state", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "buyerSignName", label: "Buyer signatory name", type: "text", required: true },
      { name: "buyerSignTitle", label: "Buyer signatory title", type: "text", required: false },
      { name: "buyerSignDate", label: "Buyer sign date", type: "date", required: true },
      { name: "manufacturerSignName", label: "Manufacturer signatory name", type: "text", required: true },
      { name: "manufacturerSignTitle", label: "Manufacturer signatory title", type: "text", required: false },
      { name: "manufacturerSignDate", label: "Manufacturer sign date", type: "date", required: true },
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
  const title = "PRODUCTION CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Production Contract (the "Contract") is made and entered into as of ${values.effectiveDate || "the ___ day of _______, 20__"} (the "Effective Date"), by and between:`);
  p(`${values.manufacturerName || "[Manufacturer Name]"}, having its principal place of business at ${values.manufacturerAddress || "[Address]"} (the "Manufacturer"),`);
  p(`AND ${values.buyerName || "[Buyer Name]"}, having its principal place of business at ${values.buyerAddress || "[Address]"} (the "Buyer").`);
  p('The Manufacturer and the Buyer are collectively referred to as the "Parties," and individually as a "Party."', false, 3);

  p("1. PURPOSE AND SCOPE", true);
  p(`1.1 Buyer is engaged in ${values.buyerBusiness || "[describe buyer product line]"} and desires manufacturing of goods per proprietary specifications; Manufacturer agrees under this Contract.`);
  p("1.2 Products are referred to as the \"Goods\" or \"Products\".", false, 3);

  p("2. DESCRIPTION OF GOODS", true);
  p(`Description: ${values.productDescription || "[Product Description]"} | Quantity: ${values.quantity || "[Quantity]"} | Unit Price: $${values.unitPrice || "[Unit Price]"} | Total: $${values.totalPrice || "[Total]"}`);
  p(`Total Contract Value: USD $${values.totalContractValue || "[Total Amount]"}.`);
  p("2.1 Goods shall conform to specifications, drawings, and quality standards agreed by Parties.");
  p("2.2 Manufacturer quotation dated as of Effective Date is incorporated.", false, 3);

  p("3. PRODUCT STANDARDS AND QUALITY CONTROL", true);
  p("Manufacturer warrants goods conform to approved specs/samples, are merchantable and defect-free, and comply with applicable laws/standards. Buyer may inspect/audit facilities/processes on reasonable notice.", false, 3);

  p("4. TITLE, DELIVERY, AND RISK OF LOSS", true);
  p(`4.1 Delivery: Time is of the essence; delivery by ${values.deliveryDate || "[Delivery Date]"} unless extended in writing.`);
  p("4.2 Manufacturer handles proper packaging, labeling, and loading for safe transport.");
  p("4.3 Title and risk transfer only upon delivery to Buyer's designated address/location.");
  p("4.4 Shipping costs borne by Buyer unless otherwise agreed.", false, 3);

  p("5. PAYMENT TERMS", true);
  p(`5.1 Buyer shall pay ${values.paymentAccount || "[Manufacturer/Account Details]"} total USD $${values.totalContractValue || "[Amount]"} per schedule:`);
  p(`- Deposit: USD $${values.depositAmount || "[Amount]"} upon execution.`);
  p(`- Balance: USD $${values.balanceAmount || "[Amount]"} upon delivery and acceptance of all Goods.`);
  p(`5.2 Early payment discount: ${values.earlyPayPercent || "[Percentage]"}% within ${values.earlyPayDays || "[Number]"} days.`);
  p(`5.3 Late payment interest: ${values.latePayPercent || "[Percentage]"}% per annum or maximum legal rate.`);
  p("5.4 Buyer bears collection costs and reasonable attorneys' fees for overdue amounts.");
  p("5.5 Non-payment is a material breach allowing suspension/termination.", false, 3);

  p("6. INSPECTION AND ACCEPTANCE", true);
  p(`Buyer has up to ${values.inspectionDays || "[Number]"} days after delivery to inspect and notify non-conformity. Manufacturer shall repair/replace/remedy within ${values.repairDays || "[Number]"} days at its cost. Failure to notify within period constitutes acceptance.`, false, 3);
  p("7. WARRANTIES", true);
  p(`Manufacturer warrants Goods are new, defect-free, conforming, and fit for intended purpose for ${values.warrantyMonths || "[Number]"} months from delivery; Manufacturer shall repair/replace at its expense during warranty period.`, false, 3);
  p("8. INDEMNIFICATION AND INSURANCE", true);
  p(`Manufacturer indemnifies Buyer for defects, negligence/misconduct, and legal violations. Manufacturer maintains liability insurance not less than USD $${values.insuranceAmount || "[Amount]"} with ${values.insurerName || "[Insurer Name]"}, and provides proof upon request.`, false, 3);
  p("9. CONFIDENTIALITY", true);
  p("Each Party shall protect confidential/proprietary information and use it only for Contract performance. Obligation survives termination/expiration.", false, 3);
  p("10. DEFAULT AND TERMINATION", true);
  p(`Material default includes non-payment, insolvency/bankruptcy, seizure/levy, or delivery/acceptance failure. Non-defaulting Party gives written notice; defaulting Party has ${values.defaultCureDays || "[Number]"} days to cure or Contract may be terminated with legal/equitable remedies.`, false, 3);
  p("11. FORCE MAJEURE", true);
  p("Neither Party liable for delay/failure due to force majeure beyond reasonable control; affected Party must promptly notify and resume performance as practicable.", false, 3);
  p("12. INTELLECTUAL PROPERTY AND WORK PRODUCT", true);
  p("Designs/prototypes/specifications/inventions developed in connection with Products are exclusive property of Buyer; Manufacturer shall execute documents to perfect ownership.", false, 3);
  p("13. DISPUTE RESOLUTION", true);
  p(`Unresolved disputes after 30 days of good-faith negotiations proceed to binding AAA arbitration before single neutral arbitrator in ${values.arbitrationCityState || "[City, State]"}, English language. Award is final and enforceable; each Party bears own costs unless arbitrator decides otherwise.`, false, 3);
  p("14. MISCELLANEOUS", true);
  p("Includes notices, assignment restrictions, waiver, severability, attorneys' fees, headings, entire agreement, and written amendment requirement.");
  p(`Governing Law: laws of ${values.governingState || "[Insert State]"} without conflict-of-laws principles.`, false, 3);

  p("IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the Effective Date first written above.", true, 2);
  p("BUYER");
  p("Signature: ___________________________");
  uf("Name", values.buyerSignName, 26);
  uf("Title", values.buyerSignTitle, 26);
  uf("Date", values.buyerSignDate, 26, 2);
  p("MANUFACTURER");
  p("Signature: ___________________________");
  uf("Name", values.manufacturerSignName, 26);
  uf("Title", values.manufacturerSignTitle, 26);
  uf("Date", values.manufacturerSignDate, 26);

  doc.save("production_contract.pdf");
};

export default function ProductionContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Production Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="productioncontract"
    />
  );
}
