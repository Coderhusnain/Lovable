import React from "react";
import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complainant",
    fields: [
      { name: "name", label: "Your full name", type: "text", required: true },
      { name: "address", label: "Your address", type: "text", required: true },
      { name: "phone", label: "Telephone number", type: "text", required: false },
      { name: "email", label: "Email address", type: "text", required: false },
    ],
  },
  {
    label: "Conversation Details",
    fields: [
      { name: "ref", label: "Re: (subject line)", type: "text", required: false },
      { name: "conversationDate", label: "Date of telephone conversation", type: "date", required: false },
      { name: "summary", label: "Summary of conversation", type: "textarea", required: true },
      { name: "enclosedDocs", label: "Enclosed documents (list)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signatureName", label: "Printed name (signature)", type: "text", required: true },
      { name: "signatureDate", label: "Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 6;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

  const p = (t: string, b = false, g = 2) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };

  const uf = (label: string, value?: string, min = 20, gap = 2) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
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
  doc.setFontSize(13);
  const title = "CONFIRMATION OF TELEPHONE CONVERSATION";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.6, w / 2 + titleW / 2, y + 1.6);
  y += 10;
  doc.setFontSize(10.5);

  p(`Re: ${u(values.ref, 30)}`);
  p('Dear Sir or Madam,', false, 3);
  p('This letter is written to formally confirm the telephone conversation I had with you on the above-referenced matter.');
  p(`As discussed, I am a victim of identity theft. Enclosed herewith is a copy of the following document(s) evidencing the identity theft incident: ${u(values.enclosedDocs, 30)}.`);
  p('Should you require any further information, clarification, or additional documentation, please do not hesitate to contact me at the address listed above.');
  p('Thank you for your prompt attention to this matter. I look forward to your response.');

  p('Yours sincerely,', false, 3);
  uf('Name', values.signatureName, 24);
  uf('Date', values.signatureDate, 12, 3);

  // Final Checklist — exact wording and bold headings
  y += 6;
  p('Final Checklist – Confirmation Letter Following a Telephone Call', true, 2);
  doc.setFont("helvetica", "normal");
  p('Requesting Party: ____________________', false, 4);

  p('Make It Legal', true, 2);
  p('☐ The letter should be signed by the requesting party. Witnessing or notarization is not required unless specifically requested.', false, 1.6);
  p('☐ Attach copies of all relevant documentation evidencing the identity theft incident, where applicable.', false, 2.6);

  p('Copies', true, 2);
  p('☐ Send the original letter to the relevant company or government agency.', false, 1.6);
  p('☐ Enclose copies of supporting documents unless originals are expressly required.', false, 1.6);
  p('☐ Retain a copy of the letter for your records.', false, 1.6);
  p('☐ Keep original documents in your possession unless submission of originals is mandatory. If originals are sent, retain copies.', false, 2.6);

  p('Other Important Notes', true, 2);
  p('☐ While not mandatory, it is strongly recommended that the letter be sent via a traceable method (such as certified mail, return receipt requested, or overnight courier) to establish proof of delivery.', false, 1.6);
  p('☐ Follow up after a reasonable period to confirm that the requested action has been taken.', false, 1.6);

  doc.save('confirmation_letter_phone_call.pdf');
};

export default function ConfirmationCallForm() {
  return (
    <FormWizard
      steps={steps}
      title="Confirmation Letter to Follow Up on a Phone Call"
      subtitle="Generate a confirmation letter of your telephone conversation"
      onGenerate={generatePDF}
      documentType="confirmation-phone-call"
    />
  );
}
