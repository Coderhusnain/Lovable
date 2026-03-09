import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Dates",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "sellerAddress", label: "Seller principal place of business", type: "text", required: false },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer offices address", type: "text", required: false },
    ],
  },
  {
    label: "Pricing and Closing",
    fields: [
      { name: "purchasePrice", label: "Total purchase price", type: "text", required: false },
      { name: "depositAmount", label: "Escrow deposit amount", type: "text", required: false },
      { name: "balanceAmount", label: "Escrow balance amount", type: "text", required: false },
      { name: "closingDate", label: "Closing date", type: "date", required: false },
      { name: "inventoryDate", label: "Inventory date", type: "date", required: false },
      { name: "inventoryBy", label: "Inventory by", type: "text", required: false },
      { name: "assetLocation1", label: "Asset location 1", type: "text", required: false },
      { name: "assetLocation2", label: "Asset location 2", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
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
  const title = "ASSET PURCHASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Asset Purchase Agreement ("Agreement") is made as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between Seller: ${u(values.sellerName, 12)}, with principal place of business at ${u(values.sellerAddress, 16)}, and Buyer: ${u(values.buyerName, 12)}, with offices at ${u(values.buyerAddress, 16)}.`);
  p("RECITALS", true);
  p("IN CONSIDERATION of the mutual covenants, promises, representations, warranties, and agreements set forth herein, and for other good and valuable consideration, the sufficiency and receipt of which are hereby acknowledged, the parties agree as follows:", false, 3);

  p("1. Purchase of Assets", true);
  p("1.1 Assets to Be Sold: Subject to this Agreement, Seller agrees to sell/assign/transfer/convey and Buyer agrees to purchase all Seller's right, title, and interest in assets including: tangible personal property (fixtures, equipment, machinery, inventory, supplies), intangible assets (trade names, customer lists, goodwill, trademarks, trade secrets, IP, contracts, proprietary software/processes), and other business operation assets as disclosed in schedules.");
  p("1.2 Exclusion of Liabilities: Buyer shall not assume debts, obligations, or liabilities of Seller except as expressly provided herein.");
  p("2. Purchase Price", true);
  p(`2.1 Total Purchase Price: $${u(values.purchasePrice, 8)}.`);
  p(`2.2 Deposit: Upon execution, Buyer deposits $${u(values.depositAmount, 8)} into escrow account designated under Section 3.`);
  p(`2.3 Balance Payment: Remaining $${u(values.balanceAmount, 8)} shall be deposited into escrow on or before Closing Date in cleared funds.`);
  p("3. Closing and Escrow", true);
  p(`3.1 Closing Date: Closing occurs on ${u(values.closingDate, 12)} or other date mutually agreed in writing.`);
  p("3.2 Escrow and Title Company: If title/escrow agent is used, parties mutually select agent/company; associated costs borne equally unless otherwise agreed; each party promptly delivers required documentation.");
  p(`3.3 Delivery and Transfer of Assets: On Closing Date, inventory/equipment/fixtures located at ${u(values.assetLocation1, 10)} and ${u(values.assetLocation2, 10)} shall not be removed/altered/encumbered without Buyer's written consent; Seller delivers possession free from liens/encumbrances except permitted herein.`);
  p("4. Representations and Warranties of Seller", true);
  p("Seller represents/warrants no required undisclosed approvals, assets are merchantable and fit for intended use, inventory suitable for ordinary sale, taxes timely filed/paid with no tax liens attaching to assets, required insurance/policies disclosed, required licenses/permits obtained, business compliant with laws, no pending/threatened litigation materially impairing transfer, Seller has sole ownership/authority to transfer assets free of claims, environmental compliance met, disclosures are true/complete/accurate, and no undisclosed liabilities related to assets.");
  p("5. Covenants of Seller", true);
  p("At Closing, Seller delivers bill of sale free and clear of liens with customary warranties; Seller bears risk of loss until Closing with good-faith price adjustment for material loss; Seller executes further documents reasonably required to perfect transfer.");
  p("6. Inventory and Operations", true);
  p(`A complete inventory shall be conducted on ${u(values.inventoryDate, 12)} by ${u(values.inventoryBy, 12)}. Operations may be temporarily suspended prior to inventory unless suspension reduces asset value. Assets in use to maintain value may continue operation until Closing.`);
  p("7. Bulk Sales Compliance", true);
  p("Seller shall comply with applicable bulk sales laws, including creditor notifications, filings, and other obligations necessary for valid transfer.");
  p("8. Conditions Precedent to Buyer's Obligations", true);
  p("Buyer's Closing obligation is conditioned on true representations/warranties at Closing, Seller compliance with covenants, delivery of authorizing resolutions/certificates, no injunction/restraining order, counsel approval of documents, no material adverse casualty/change, and delivery of all consents/approvals.");
  p("9. Alternative Dispute Resolution", true);
  p("Parties shall attempt amicable resolution, then mediation, and if unresolved may pursue arbitration or litigation as provided by law.");
  p("10. Costs, Expenses, and Attorneys' Fees", true);
  p("Each party bears its own negotiation/execution/delivery expenses. Prevailing party in dispute recovers reasonable attorneys' fees and costs.");
  p("11. Indemnification", true);
  p("Seller shall indemnify and hold harmless Buyer for tort/creditor/third-party claims relating to assets/business before Closing, taxes and employee claims accrued pre-Closing, and liabilities not expressly assumed by Buyer.");
  p("12. Miscellaneous Provisions", true);
  p("Amendments only by written instrument signed by both parties; no oral amendments effective. Waiver must be in writing and does not waive future breaches. Invalid provisions do not affect remainder; invalid clause shall be modified/limited to make enforceable while preserving intent. Governing law applies as set out below. Entire agreement supersedes prior negotiations/understandings.");
  p("13. Signatures", true);
  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.");
  p("Seller:");
  uf("Name", values.sellerSignerName || values.sellerName, 24);
  uf("Title", values.sellerSignerTitle, 16);
  p("Signature: ___________________");
  uf("Date", values.sellerSignerDate, 14);
  p("Buyer:");
  uf("Name", values.buyerSignerName || values.buyerName, 24);
  uf("Title", values.buyerSignerTitle, 16);
  p("Signature: ___________________");
  uf("Date", values.buyerSignerDate, 14);
  p("Governing Law:");
  uf("State/Country", values.governingLaw, 16);

  doc.save("asset_purchase_agreement.pdf");
};

export default function AssetPurchaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Asset Purchase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="assetpurchase"
    />
  );
}
