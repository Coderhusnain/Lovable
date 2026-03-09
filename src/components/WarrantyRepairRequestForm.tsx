import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Warranty Request",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: true },
      { name: "toName", label: "To", type: "text", required: true },
      { name: "toAddress", label: "Address", type: "text", required: true },
      { name: "dearName", label: "Dear", type: "text", required: true },
      { name: "productName", label: "Defective product/item", type: "text", required: true },
      { name: "purchaseDate", label: "Purchase date", type: "date", required: true },
      { name: "returnAddress", label: "Return address", type: "text", required: false },
      { name: "signName", label: "Printed name", type: "text", required: true },
      { name: "signAddress", label: "Signer address", type: "text", required: false },
      { name: "signContact", label: "Contact information", type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  let y = 20;
  const bottom = 280;

  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  const title = "WARRANTY REPAIR REQUEST";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const twd = doc.getTextWidth(title);
  doc.line(w / 2 - twd / 2, y + 1.2, w / 2 + twd / 2, y + 1.2);
  y += 9;

  uf("Date", v.requestDate);
  uf("To", v.toName);
  uf("Address", v.toAddress);
  p(`Dear ${v.dearName || "__________________________"}:`);
  p(`I am writing to formally notify you that the enclosed ${v.productName || "________________________"}, which I purchased on ${v.purchaseDate || "________________________"}, is defective and no longer functioning as intended.`);
  p("As the product remains covered under the original manufacturer's warranty, I hereby request that the item be repaired or replaced, as provided under the terms of the applicable warranty.");
  p("Enclosed please find photocopies of my sales invoice and the applicable warranty documentation for your reference. Upon completion of the repair or replacement, kindly return the item to the address indicated on this letterhead.");
  p("Thank you for your prompt attention to this matter. I look forward to your confirmation and timely resolution.");
  p("Sincerely,", false, 3);
  p("Signature: ______________________________");
  uf("Printed Name", v.signName);
  uf("Address", v.signAddress);
  uf("Contact Information", v.signContact, 26, 4);

  p("Final Checklist - Warranty Repair Request", true);
  p("Legal Formalities");
  p("- [ ] Ensure the letter is signed by the purchaser or authorized claimant.");
  p("Recordkeeping");
  p("- [ ] Retain a copy of the signed letter and all supporting documents for personal records.");
  p("Reasons to Update or Reissue");
  p("- To submit the same request to a different service center, office, or company representative.");
  p("- To send a follow-up letter regarding the same defective product.");
  p("Supporting Documentation");
  p("- Include photocopies only of receipts, invoices, warranty cards, or other relevant documents.");
  p("- Retain originals and keep a complete record of written correspondence and telephone communication logs.");

  doc.save("warranty_repair_request.pdf");
};

export default function WarrantyRepairRequestForm() {
  return (
    <FormWizard
      steps={steps}
      title="Warranty Repair Request"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="warrantyrepairrequest"
    />
  );
}
