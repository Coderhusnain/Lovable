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

  // ── Title ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "DIRECT MAIL ADVERTISING REQUEST";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  // ── Date: two blank segments separated by a comma ─────────────────────────
  // Draft: "Date: ____________, ____________"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const dateLabel = "Date: ";
  doc.text(dateLabel, m, y);
  let dx = m + doc.getTextWidth(dateLabel);
  const segLen = doc.getTextWidth("____________");
  const dateVal = (values.requestDate || "").trim();
  if (dateVal) {
    // Split entered date into two parts around the last comma or space if present
    const parts = dateVal.split(",");
    const part1 = parts[0].trim();
    const part2 = parts.slice(1).join(",").trim();
    doc.text(part1, dx, y);
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(part1)), y + 1.1);
    dx += Math.max(segLen, doc.getTextWidth(part1));
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    if (part2) {
      doc.text(part2, dx, y);
      doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(part2)), y + 1.1);
    } else {
      doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    }
  } else {
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    dx += segLen;
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
  }
  y += lh + 1.8;

  // ── Body ──────────────────────────────────────────────────────────────────
  p("To:");
  p("Direct Marketing Association", false, 3);
  p("Dear Sir or Madam:");
  p("I am writing to formally request that I be included in the distribution of direct mail advertising materials relating to the subject matter identified below:");

  // Subject matter — long underline blank matching draft
  const smVal = (values.subjectMatter || "").trim();
  if (y + lh + 3 > limit) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  if (smVal) {
    const smLines = doc.splitTextToSize(smVal, tw);
    doc.text(smLines, m, y);
    doc.setLineWidth(0.22);
    doc.line(m, y + 1.1, m + tw, y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(m, y + 1.1, m + tw, y + 1.1);
  }
  y += lh + 3;

  p("Please advise if any additional information is required to process this request. I appreciate your prompt attention and look forward to your confirmation.");
  p("Thank you for your assistance.");
  p("Sincerely,", false, 3);

  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 6);

  // ── Final Checklist ───────────────────────────────────────────────────────
  p("Final Checklist \u2014 Direct Mail Advertising Request", true);
  p("Legal Formalities", true, 1);
  p("\u2610  Ensure the letter is signed by the requesting party.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("\u2610  Retain a copy of the signed letter for your records.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("\u2022  To request direct mail advertising materials in additional or different areas of interest.");

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