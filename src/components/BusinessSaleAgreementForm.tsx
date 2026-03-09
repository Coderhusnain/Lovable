import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "stateLaw", label: "State law", type: "text", required: true },
      { name: "businessDescription", label: "Business description", type: "textarea", required: false },
      { name: "nonCompeteYears", label: "Non-compete years", type: "text", required: false },
      { name: "nonCompeteArea", label: "Non-compete geographical area", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "venueState", label: "Venue state", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "sellerSignerName", label: "Seller signer name", type: "text", required: false },
      { name: "sellerSignerTitle", label: "Seller signer title", type: "text", required: false },
      { name: "sellerSignerDate", label: "Seller sign date", type: "date", required: false },
      { name: "buyerSignerName", label: "Buyer signer name", type: "text", required: false },
      { name: "buyerSignerTitle", label: "Buyer signer title", type: "text", required: false },
      { name: "buyerSignerDate", label: "Buyer sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "BUSINESS SALE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Business Sale Agreement ("Agreement") is entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.sellerName, 12)} ("Seller"), and ${u(values.buyerName, 12)} ("Buyer").`, false, 3);
  p("A. Subject Matter", true);
  p("1. Description of Business: Seller agrees to sell and Buyer agrees to purchase the business including all tangible/intangible assets, inventory, intellectual property, licenses, permits, contracts, goodwill, and other properties as set forth in schedules.");
  p("2. Agreement to Sell: Seller transfers, sells, and conveys to Buyer all rights, title, and interest in the Business subject to this Agreement.");
  p("B. Representations and Warranties of Seller", true);
  p(`Seller warrants organization and good standing under laws of ${u(values.stateLaw, 10)}; full authority to execute; enforceability; tax compliance; good marketable title to assets free of undisclosed encumbrances; no pending/threatened litigation materially impeding closing; legal compliance; documents true/authentic/complete.`);
  p(`Seller agrees not to compete for ${u(values.nonCompeteYears, 4)} years within ${u(values.nonCompeteArea, 12)} including restrictions on ownership, employment, and solicitation.`);
  p("Business lease is current, valid, and transferable. Except expressly stated, Seller disclaims other warranties.");
  p("C. Representations and Warranties of Buyer", true);
  p("Buyer represents no brokerage/finder fee claims, sufficient funds for purchase and post-closing obligations, and appropriate investment status compliance.");
  p("D. Conduct Prior to Closing", true);
  p("Parties shall cooperate, execute all required documents, Seller shall operate in ordinary course, provide requested resignations, satisfy/release encumbrances, promptly notify Buyer of material changes, and deliver all transfer documents at Closing.");
  p("E. General Provisions", true);
  p("Each party bears own costs. Seller indemnifies Buyer for pre-closing liabilities; Buyer indemnifies Seller for post-closing liabilities. Material breach entitles non-defaulting party to cancel transaction and/or seek damages including attorney's fees.");
  p(`Defaults must be cured within ${u(values.defaultCureDays, 4)} days of notice. Representations/warranties/covenants survive Closing. Disputes: negotiation then mediation. Unsatisfied conditions precedent may render agreement void with deposit refund. Time is of the essence.`);
  p("Rights and obligations bind successors/assigns subject to consent requirements. No third-party beneficiary rights unless expressly provided. Notices in writing by personal delivery/certified mail. Headings are reference only.");
  p(`Governing law and venue are in ${u(values.venueState || values.stateLaw, 12)}.`);
  p("F. Closing Checklist", true);
  p("At or before Closing: execute agreement; deliver purchase price; transfer assets; release encumbrances; deliver documents; provide resignations; execute non-compete/non-solicitation; confirm tax clearance.");
  p("G. Schedules", true);
  p("Schedule 1: Business Assets (tangible, intangible, contracts, licenses/permits). Schedule 2: Liabilities to be assumed (accounts payable, accrued benefits, lease/contract obligations). Schedule 3: Employees (list, salaries, start dates, agreements/benefits).");
  p("H. Signatures", true);
  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.");
  p("Seller:");
  uf("Name", values.sellerSignerName || values.sellerName, 22);
  uf("Title", values.sellerSignerTitle, 16);
  p("Signature: ___________________");
  uf("Date", values.sellerSignerDate, 14);
  p("Buyer:");
  uf("Name", values.buyerSignerName || values.buyerName, 22);
  uf("Title", values.buyerSignerTitle, 16);
  p("Signature: ___________________");
  uf("Date", values.buyerSignerDate, 14);

  doc.save("business_sale_agreement.pdf");
};

export default function BusinessSaleAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Business Sale Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="businesssaleagreement"
    />
  );
}
