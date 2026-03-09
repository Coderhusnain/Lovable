import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Property",
    fields: [
      { name: "date", label: "Agreement date", type: "date", required: true },
      { name: "sellerName", label: "Seller name/entity", type: "text", required: true },
      { name: "sellerAddress", label: "Seller address", type: "text", required: true },
      { name: "buyerName", label: "Buyer name/entity", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
      { name: "amount", label: "Consideration amount", type: "text", required: true },
      { name: "propertyDescription", label: "Detailed property description", type: "textarea", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Execution and Notary",
    fields: [
      { name: "sellerSignName", label: "Seller signing name", type: "text", required: true },
      { name: "sellerDate", label: "Seller date", type: "date", required: true },
      { name: "buyerSignName", label: "Buyer signing name", type: "text", required: true },
      { name: "buyerDate", label: "Buyer date", type: "date", required: true },
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDate", label: "Notary date", type: "date", required: false },
      { name: "notaryAppearer", label: "Notary appearer", type: "text", required: false },
      { name: "commissionExpires", label: "Notary commission expires", type: "text", required: false },
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
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
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
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "BILL OF SALE";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Bill of Sale is made as of ${u(values.date, 12)}, by and between ${u(values.sellerName, 18)} of ${u(values.sellerAddress, 18)} ("Seller"), and ${u(values.buyerName, 18)} of ${u(values.buyerAddress, 18)} ("Buyer").`);
  p('Seller and Buyer may be referred to individually as a "Party" and collectively as the "Parties".', false, 3);
  p("1. Consideration and Transfer of Ownership", true);
  p(`For consideration of U.S. $${u(values.amount, 14)}, inclusive of applicable sales taxes, Seller sells/transfers all right, title, and interest in the following Property:`);
  p(values.propertyDescription || "_".repeat(70), false, 3);
  p("2. Condition and Disclaimer of Warranties", true);
  p("Property is sold strictly AS IS, WHERE IS, WITH ALL FAULTS. Seller disclaims all express/implied warranties, including merchantability and fitness, except transferable manufacturer warranty if any.", false, 3);
  p("3. Buyer's Acknowledgment", true);
  p("Buyer had opportunity to inspect or have inspected and accepts property in current condition.");
  p("4. Title and Authority", true);
  p("Seller warrants lawful ownership, free/clear title, and authority to transfer; Seller indemnifies Buyer for breach.");
  p("5. Limitation of Liability", true);
  p("Neither Party is liable for incidental/consequential/indirect/special damages arising from this Bill of Sale.");
  p("6. Dispute Resolution and Legal Costs", true);
  p("Prevailing Party in litigation/arbitration is entitled to recover reasonable attorneys' fees, costs, and expenses.");
  p("7-11. General Terms", true);
  p(`Successors/assigns, further assurances, and governing law of ${u(values.governingState, 16)} apply. Bill is effective upon execution. Notarization may be used to further evidence validity/enforceability.`, false, 3);
  p("IN WITNESS WHEREOF", true);
  p("SELLER");
  uf("Name", values.sellerSignName, 24);
  uf("Date", values.sellerDate, 24);
  p("BUYER");
  uf("Name", values.buyerSignName, 24);
  uf("Date", values.buyerDate, 24, 3);
  if (values.notaryState || values.notaryCounty || values.notaryDate || values.notaryAppearer) {
    p(`State of ${u(values.notaryState, 10)} )`);
    p(`County of ${u(values.notaryCounty, 10)} )`);
    p(`On ${u(values.notaryDate, 12)}, before me, appeared ${u(values.notaryAppearer, 18)}, acknowledged execution for stated purposes.`);
    p("Notary Public: ___________________________");
    uf("My Commission Expires", values.commissionExpires, 18);
  }
  doc.save("bill_of_sale.pdf");
};

export default function BillOfSaleForm() {
  return (
    <FormWizard
      steps={steps}
      title="Bill of Sale"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="billofsale"
    />
  );
}
