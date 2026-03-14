import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Letter Details",
    fields: [
      { name: "senderName", label: "Sender name", type: "text", required: false },
      { name: "senderAddress", label: "Sender address", type: "text", required: false },
      { name: "recipientName", label: "Recipient name", type: "text", required: false },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: false },
      { name: "phoneCallDate", label: "Date of telephone conversation", type: "date", required: false },
      { name: "referenceRecipientName", label: "Credit reference recipient name", type: "text", required: false },
      { name: "referenceStreet", label: "Credit reference recipient street", type: "text", required: false },
      { name: "referenceCity", label: "Credit reference recipient city", type: "text", required: false },
      { name: "referenceState", label: "Credit reference recipient state", type: "text", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "signerName", label: "Name", type: "text", required: false },
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

  // Plain paragraph — bold=true for headings
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Underlined fill field
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
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

  // ☐ Checkbox bullet
  const checkbox = (text: string, gap = 1.8) => {
    const indent = m + 6;
    const lines = doc.splitTextToSize(text, tw - 6);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("\u2610", m + 1, y); // ☐
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // • Bullet point
  const bullet = (text: string, gap = 1.8) => {
    const indent = m + 6;
    const lines = doc.splitTextToSize(text, tw - 6);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("\u2022", m + 1.5, y); // •
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // ── Title ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "REQUEST A CREDIT REFERENCE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 10;

  // ── Sender address block ───────────────────────────────────────────────────
  const senderName = (values.senderName || "").trim();
  const senderAddress = (values.senderAddress || "").trim();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text(senderName || "__________,  __________", m, y);
  y += lh + 1;
  doc.text(senderAddress || "__________,  __________", m, y);
  y += lh + 4;

  // ── Recipient address block ────────────────────────────────────────────────
  const recipientName = (values.recipientName || "").trim();
  const recipientAddress = (values.recipientAddress || "").trim();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text(recipientName || "__________,  __________", m, y);
  y += lh + 1;
  doc.text(recipientAddress || "__________,  __________", m, y);
  y += lh + 6;

  // ── Salutation ────────────────────────────────────────────────────────────
  p("Dear Sir or Madam:", true);

  // ── Body paragraphs ────────────────────────────────────────────────────────
  p(
    `As discussed during our telephone conversation on ${values.phoneCallDate || "__________"}, this letter serves as a formal written request that a positive credit reference concerning my account be provided to ${values.referenceRecipientName || "__________"}, at ${values.referenceStreet || "__________"}, ${values.referenceCity || "__________"}, ${values.referenceState || "__________"}.`
  );

  p("I further request that a copy of this credit reference be sent to me for my records.");

  p(`For your reference, my account number is ${values.accountNumber || "__________"}.`);

  p("Should you require any additional information or have any questions regarding this request, please do not hesitate to contact me.");

  p("Thank you for your prompt attention and cooperation.");

  y += 3;
  p("Sincerely,", true, 3);

  // ── Signature block ────────────────────────────────────────────────────────
  uf("Name", values.signerName, 28);
  uf("Signature", "", 28, 3);

  // ── Final Checklist ────────────────────────────────────────────────────────
  p("FINAL CHECKLIST FOR LETTER TO REQUEST A CREDIT REFERENCE", true);

  p("Make It Legal", true, 1);
  checkbox("Sign the letter prior to submission.", 2.6);

  p("Copies", true, 1);
  checkbox("Retain a copy of the signed letter for your records.", 2.6);

  p("Reasons to Update", true, 1);
  bullet("To issue a follow-up letter regarding a prior request; or");
  bullet("To request that an additional credit reference be sent to another individual or organization.");

  doc.save("request_a_credit_reference.pdf");
};

export default function RequestACreditReferenceForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request a Credit Reference"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="requestacreditreference"
    />
  );
}
