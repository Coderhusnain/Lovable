import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Demand Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "orderItem", label: "Order item", type: "text", required: false },
      { name: "orderPlacedDate", label: "Order placed date", type: "date", required: false },
      { name: "deliveryPeriod", label: "Delivery period advised", type: "text", required: false },
      { name: "priorContactDate", label: "Prior contact date", type: "date", required: false },
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
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
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
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
  const title = "DEMAND FOR DELIVERY";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  uf("To", values.toName, 24);
  uf("Address", values.toAddress, 32);
  p(`Subject: Demand for Delivery - Order of ${values.orderItem || "__________________"}`, true);
  p("Dear Sir or Madam:");
  p(`I write with reference to my order for ${values.orderItem || "______________________"}, which was placed on ${values.orderPlacedDate || "______________________"}. At the time of purchase, I was advised that delivery would be completed within ${values.deliveryPeriod || "______________________"}.`);
  p(`Despite the passage of the stated delivery period, the goods have not yet been delivered. On ${values.priorContactDate || "______________________"}, I contacted you in writing regarding this delay. Enclosed are copies of my prior correspondence relating to this order.`);
  p("Please contact me promptly should you require any additional information to facilitate delivery. I respectfully request your immediate attention to this matter and look forward to confirmation of the delivery status without further delay.");
  p("Thank you for your cooperation.");
  p("Sincerely,", false, 3);
  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Final Checklist - Demand for Delivery", true);
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed by the purchaser or authorized party.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter and all related correspondence for your records.", false, 2.6);
  p("Attachments", true, 1);
  p("[ ] Include copies of all previous letters, emails, or other communications exchanged with the company regarding the delayed delivery.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("- To submit a follow-up demand concerning a prior delivery request.");
  p("- To issue a demand for delivery of a different product or order.");

  doc.save("demand_for_delivery.pdf");
};

export default function DemandForDeliveryForm() {
  return (
    <FormWizard
      steps={steps}
      title="Demand for delivery"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="demandondelivery"
    />
  );
}
