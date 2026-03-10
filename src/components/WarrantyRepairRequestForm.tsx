import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: true },
      { name: "toName", label: "To", type: "text", required: true },
      { name: "toAddress", label: "Address", type: "text", required: true },
      { name: "toCity", label: "City", type: "text", required: true },
      { name: "dearName", label: "Dear (name/title)", type: "text", required: true },
      { name: "productName", label: "Defective product/item", type: "text", required: true },
      { name: "purchaseDate", label: "Purchase date", type: "date", required: true },
      { name: "senderName", label: "Printed name", type: "text", required: true },
      { name: "senderAddress", label: "Sender address", type: "text", required: true },
      { name: "senderCity", label: "Sender city", type: "text", required: true },
      { name: "contactInfo", label: "Contact information", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.4);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.line(x, y + 1, x + doc.getTextWidth("_".repeat(min)), y + 1);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "WARRANTY REPAIR REQUEST";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", v.requestDate);
  uf("To", v.toName);
  uf("Address", v.toAddress);
  uf("City", v.toCity);
  p(`Dear ${u(v.dearName)}:`);
  p(
    `I am writing to formally notify you that the enclosed ${u(v.productName)}, which I purchased on ${u(v.purchaseDate)}, is defective and no longer functioning as intended.`
  );
  p("As the product remains covered under the original manufacturer's warranty, I hereby request that the item be repaired or replaced, as provided under the terms of the applicable warranty.");
  p("Enclosed please find photocopies of my sales invoice and applicable warranty documentation for your reference. Upon completion of the repair or replacement, kindly return the item to the address indicated on this letterhead.");
  p("Thank you for your prompt attention to this matter. I look forward to your confirmation and timely resolution.");
  p("Sincerely,", false, 2.8);
  p("Signature");
  uf("Printed Name", v.senderName);
  uf("Address", v.senderAddress);
  uf("City", v.senderCity);
  uf("Contact Information", v.contactInfo);

  y += 2;
  p("Final Checklist - Warranty Repair Request", true);
  p("Legal Formalities", true, 1);
  p("- [ ] Ensure the letter is signed by the purchaser or authorized claimant.");
  p("Recordkeeping", true, 1);
  p("- [ ] Retain a copy of the signed letter and all supporting documents for personal records.");
  p("Reasons to Update or Reissue", true, 1);
  p("- To submit the same request to a different service center, office, or company representative.");
  p("- To send a follow-up letter regarding the same defective product.");
  p("Supporting Documentation", true, 1);
  p("- Include photocopies only of receipts, invoices, warranty cards, or other relevant documents.");
  p("- Retain originals and keep complete records of correspondence and phone communication summaries.");

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
