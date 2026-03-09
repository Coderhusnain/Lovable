import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Warranty Request Info",
    fields: [
      { name: "customerName", label: "Customer name", type: "text", required: false },
      { name: "companyName", label: "Manufacturer/service provider", type: "text", required: false },
      { name: "productName", label: "Product/item name", type: "text", required: false },
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
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "WARRANTY REPAIR REQUEST LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.customerName) p(`Customer: ${values.customerName}`);
  if (values.companyName) p(`Company: ${values.companyName}`);
  if (values.productName) p(`Product: ${values.productName}`, false, 3);

  p("What is a Warranty Repair Request Letter?", true);
  p("A Warranty Repair Request Letter is a formal written request to have a product repaired or replaced under warranty. Also known as a Warranty Repair Request, Warranty Repair Letter, or Letter to Request Repair of an Item Under Warranty, this document helps you communicate your request officially and ensures your claim is properly documented.");
  p("Instead of relying on phone calls, a Warranty Repair Request Letter on Legalgram provides a professional, traceable way to help ensure the manufacturer or company honors their warranty. Whether it's your car, appliance, or electronic device, this draft Warranty Repair agreement ensures your request is clear, official, and actionable.");
  p("Download the best format from Legalgram to simplify the warranty process and protect your consumer rights.", false, 3);

  p("When to Use a Warranty Repair Request Letter", true);
  p("- You want to request repair or replacement of an item covered under warranty.");
  p("- You have already contacted the company by phone and want to follow up in writing.");
  p("- You want a documented record of your warranty claim to prevent disputes.", false, 3);

  p("Why Use Legalgram for Your Warranty Repair Request Letter", true);
  p("- Draft Warranty Repair agreement with step-by-step instructions.");
  p("- Legally recognized document to communicate your repair request clearly.");
  p("- Includes product details, warranty information, issue description, and requested resolution.");
  p("- Best format from Legalgram for a professional and enforceable letter.");
  p("- Download in PDF or Word for printing, signing, and sharing.");
  p("Using a Warranty Repair Request Letter protects consumer rights and increases chances of smooth repair or replacement.", false, 3);

  p("Warranty Repair Request Letter FAQs", true);
  p("Do I need a lawyer to draft this letter?");
  p("No. You can draft and download on Legalgram for free. Legal help may be useful for high-value or disputed warranty claims.");
  p("Is this letter legally enforceable?");
  p("Yes. It serves as a formal written record of your request and can help enforce warranty obligations if needed.");
  p("Can I edit or share it?");
  p("Yes. You can securely store, download, print, and share your letter with the manufacturer or service provider.", false, 3);

  p("Related Consumer Protection Documents on Legalgram", true);
  p("- Change of Beneficiary Letter");
  p("- Direct Mail Advertising Request");
  p("- Membership Cancellation Letter");
  p("- Confirmation of Reservations");
  p("Download your Warranty Repair Request Letter on Legalgram in the best format and protect your warranty rights.");

  doc.save("warranty_repair_request_letter.pdf");
};

export default function WarrantyRepairRequestForm() {
  return (
    <FormWizard
      steps={steps}
      title="Warranty Repair Request Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="warrantyrepairrequest"
    />
  );
}
