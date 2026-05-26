import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Sender Details",
    fields: [
      { name: "senderName", label: "Your full name", type: "text", required: true },
      { name: "senderAddress", label: "Your address", type: "text", required: true },
      { name: "senderPhone", label: "Telephone number", type: "text", required: false },
      { name: "senderEmail", label: "Email address", type: "text", required: false },
    ],
  },
  {
    label: "Dispute Details",
    fields: [
      { name: "recipientName", label: "Credit bureau or agency name", type: "text", required: false },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: false },
      { name: "reportItem", label: "Disputed entry description", type: "textarea", required: true },
      { name: "reportDate", label: "Credit report date", type: "date", required: false },
      { name: "supportingDocs", label: "Supporting documents enclosed", type: "textarea", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signatureName", label: "Printed name", type: "text", required: true },
      { name: "signatureDate", label: "Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.8;
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

  const title = "CREDIT REPORT CHALLENGE LETTER";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.5, w / 2 + titleW / 2, y + 1.5);
  y += 9;

  const senderName = (values.senderName || "").trim();
  const senderAddress = (values.senderAddress || "").trim();
  const recipientName = (values.recipientName || "").trim();
  const recipientAddress = (values.recipientAddress || "").trim();

  if (senderName) p(senderName, true, 0.8);
  if (senderAddress) p(senderAddress, false, 1.4);
  if (recipientName) p(recipientName, true, 0.8);
  if (recipientAddress) p(recipientAddress, false, 1.8);

  p("Re: Formal Dispute of Inaccurate Credit Report Entry", true);
  p("Dear Sir or Madam,");
  p("I write to formally dispute an inaccurate and/or unverifiable entry appearing in my credit report maintained by your office.");
  p(`Enclosed herewith is a copy of the credit report obtained from your agency, in which the disputed item has been clearly identified and marked for your reference. ${values.reportItem ? `The entry being challenged is: ${values.reportItem.trim()}.` : ""}`);
  p("I respectfully request that you conduct a prompt and thorough investigation into this matter in accordance with applicable credit reporting laws and regulations. Upon completion of your review, please provide written confirmation of your findings and any corrective action taken.");
  p("Should you require any additional documentation or clarification in support of this dispute, please do not hesitate to contact me.");
  p("Thank you for your timely attention and cooperation.");
  p("Respectfully submitted,", false, 3);

  uf("Signature", values.signatureName, 28);
  uf("Date", values.signatureDate, 12, 3);

  p("Final Compliance Checklist – Credit Report Challenge Letter", true, 2);
  p("Prepared For: __________________________");

  p("Legal Execution", true, 1.5);
  p("☐ The letter should be signed by the individual disputing the credit entry.", false, 2.2);

  p("Copies and Recordkeeping", true, 1.5);
  p("☐ Retain a complete copy of the letter for personal records.", false, 2.2);

  p("Attachments", true, 1.5);
  p("☐ Enclose a photocopy of the relevant credit report.", false, 1.8);
  p("☐ Clearly highlight or mark the specific entry being challenged to facilitate review.", false, 2.2);

  p("Reasons for Amendment or Resubmission", true, 1.5);
  p("• To update information relating to an inaccurate or unfavorable credit report entry");

  doc.save("credit_report_challenge.pdf");
};

export default function CreditReportChallengeForm() {
  return (
    <FormWizard
      steps={steps}
      title="Credit Report Challenge Letter"
      subtitle="Complete each step to generate your credit dispute letter"
      onGenerate={generatePDF}
      documentType="credit-report-challenge-letter"
    />
  );
}