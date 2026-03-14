import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Inquiry Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "billingCharge", label: "Billed monthly charge", type: "text", required: false },
      { name: "contractCharge", label: "Contract monthly charge", type: "text", required: false },
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
      { name: "subscriber", label: "Cell phone subscriber", type: "text", required: false },
      { name: "provider", label: "Cell phone provider", type: "text", required: false },
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

  // ── Title — centred and underlined ───────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "CELL PHONE INQUIRY LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
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

  // ── Re: Account Number ────────────────────────────────────────────────────
  p(`Re: Account Number: ${values.accountNumber || "__________"}`);

  // ── To and Address on same line ───────────────────────────────────────────
  // Draft: "To: __________________________ Address: _____________________"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
  const toLabel = "To: ";
  const toVal = (values.toName || "").trim();
  const toLineLen = doc.getTextWidth("__________________________");
  doc.text(toLabel, m, y);
  let tx = m + doc.getTextWidth(toLabel);
  if (toVal) {
    doc.text(toVal, tx, y);
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + Math.max(toLineLen, doc.getTextWidth(toVal)), y + 1.1);
    tx += Math.max(toLineLen, doc.getTextWidth(toVal));
  } else {
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + toLineLen, y + 1.1);
    tx += toLineLen;
  }
  tx += 4; // gap between To and Address
  const addrLabel = "Address: ";
  const addrVal = (values.toAddress || "").trim();
  const addrLineLen = doc.getTextWidth("_____________________");
  doc.text(addrLabel, tx, y);
  const ax = tx + doc.getTextWidth(addrLabel);
  if (addrVal) {
    doc.text(addrVal, ax, y);
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + Math.max(addrLineLen, doc.getTextWidth(addrVal)), y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + addrLineLen, y + 1.1);
  }
  y += lh + 1.8;

  // ── Body ──────────────────────────────────────────────────────────────────
  p("Dear Sir or Madam:");
  p(`I am writing regarding my cellular telephone service account referenced above. Upon reviewing my most recent billing statement, I observed that the monthly service charge reflected is $${values.billingCharge || "------"}. However, pursuant to the terms of my service agreement, the applicable monthly service charge is stated to be $${values.contractCharge || "------"}.`);
  p("In light of this discrepancy, I respectfully request written clarification of the monthly charge applied to my account, including confirmation that the charges assessed are consistent with the terms of my service contract.");
  p("For your reference, I have enclosed a copy of the relevant billing statement.");
  p("Please contact me should you require any additional information or documentation to address this inquiry. I appreciate your prompt attention to this matter and look forward to your response.");
  p("Sincerely,", false, 3);

  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);

  // ── Final Checklist ───────────────────────────────────────────────────────
  // Bold, larger, centred — matching title style
  if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text("Final Checklist \u2014 Cellular Service Billing Inquiry", w / 2, y, { align: "center" });
  y += lh + 1.8;
  doc.setFontSize(10.5);

  // Draft: "Cell Phone Subscriber: ____ Cell Phone Provider: _____" on same line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
  const subLabel = "Cell Phone Subscriber: ";
  const subVal = (values.subscriber || "").trim();
  const subLineLen = doc.getTextWidth("____________________");
  doc.text(subLabel, m, y);
  let sx = m + doc.getTextWidth(subLabel);
  if (subVal) {
    doc.text(subVal, sx, y);
    doc.setLineWidth(0.22);
    doc.line(sx, y + 1.1, sx + Math.max(subLineLen, doc.getTextWidth(subVal)), y + 1.1);
    sx += Math.max(subLineLen, doc.getTextWidth(subVal));
  } else {
    doc.setLineWidth(0.22);
    doc.line(sx, y + 1.1, sx + subLineLen, y + 1.1);
    sx += subLineLen;
  }
  sx += 4;
  const provLabel = "Cell Phone Provider: ";
  const provVal = (values.provider || "").trim();
  const provLineLen = doc.getTextWidth("_____________________");
  doc.text(provLabel, sx, y);
  const px = sx + doc.getTextWidth(provLabel);
  if (provVal) {
    doc.text(provVal, px, y);
    doc.setLineWidth(0.22);
    doc.line(px, y + 1.1, px + Math.max(provLineLen, doc.getTextWidth(provVal)), y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(px, y + 1.1, px + provLineLen, y + 1.1);
  }
  y += lh + 1.8;

  p("Legal Formalities", true, 1);
  p("\u2610  Ensure the letter is signed by the account holder.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("\u2610  Retain a copy of the signed letter and all related correspondence for your records.", false, 2.6);
  p("Attachments", true, 1);
  p("\u2610  Enclose a copy of the relevant cellular billing statement, as referenced in the letter.", false, 2.6);
  p("Additional Guidance", true, 1);
  p("\u2022  If the billing statement appears to contain an error, or if clarification is required regarding specific charges or call entries, such issues should be clearly identified in the letter rather than marked on the original statement.");
  p("\u2022  It may be helpful to include a photocopy of the billing statement with the disputed charge highlighted or underlined for ease of reference.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("\u2022  To dispute a different charge or entry appearing on a subsequent cellular service statement.");

  doc.save("cell_phone_inquiry_letter.pdf");
};

export default function CellPhoneInquiryLetterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Cell Phone Inquiry Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cellphoneinquiryletter"
    />
  );
}