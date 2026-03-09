import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "subjectMatter", label: "Subject matter", type: "text", required: false },
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
  const title = "DIRECT MAIL ADVERTISING REQUEST";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  p("To:");
  p("Direct Marketing Association", false, 3);
  p("Dear Sir or Madam:");
  p("I am writing to formally request that I be included in the distribution of direct mail advertising materials relating to the subject matter identified below:");
  uf("Subject Matter", values.subjectMatter, 40, 3);
  p("Please advise if any additional information is required to process this request. I appreciate your prompt attention and look forward to your confirmation.");
  p("Thank you for your assistance.");
  p("Sincerely,", false, 3);
  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Final Checklist - Direct Mail Advertising Request", true);
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed by the requesting party.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter for your records.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("- To request direct mail advertising materials in additional or different areas of interest.");

  doc.save("direct_mail_advertising_request.pdf");
};

export default function DirectMailAdvertisingForm() {
  return (
    <FormWizard
      steps={steps}
      title="Direct mail advertising request"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="directmailadvertising"
    />
  );
}
