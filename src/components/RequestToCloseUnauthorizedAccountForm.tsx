import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Requester",
    fields: [
      { name: "requesterName", label: "Requesting Party (Full Name)", type: "text", required: true },
      { name: "requesterAddress", label: "Address", type: "textarea", required: false },
      { name: "companyName", label: "Company / Service Provider", type: "text", required: true },
      { name: "accountReference", label: "Account Reference (if known)", type: "text", required: false },
      { name: "incidentDetails", label: "Brief description of identity theft and attached documents", type: "textarea", required: false },
      { name: "contactPhone", label: "Contact phone or email", type: "text", required: false },
    ],
  },
];

const u = (v?: string) => (v || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;
  const textWidth = W - margin * 2;
  const lineHeight = 5.2;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  // Header
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Request to Close an Unauthorized Account", W / 2, y, { align: "center" });
  y += 10;

  // Letter body (only in PDF)
  write(`Dear Sir or Madam,`, true);
  write(`I hereby formally request the immediate closure of the above-referenced account, which was opened fraudulently without my knowledge or authorization. I am the victim of identity theft in connection with this account.`);
  write(`Enclosed herewith are copies of documents substantiating the identity theft incident and supporting my request, including:\n${u(values.incidentDetails) || "________________________________________"}`);
  write(`Please proceed with closing this account without delay and provide written confirmation once the account has been terminated and all related obligations have been removed from my record.`);
  write(`Should you require any further information or documentation in order to process this request, please do not hesitate to contact me at the address or contact information listed above.`);
  write(`Thank you for your prompt cooperation and attention to this matter.\n\nRespectfully submitted,\n\n[Signature]\n\n[Printed Name]\n${u(values.requesterName) || "[Printed Name]"}`);

  // Final Compliance Checklist - use bullets
  write("Final Compliance Checklist – Unauthorized Account Closure Request", true);
  write("Requesting Party: __________________________\nCompany: __________________________");
  write("Legal Execution", true);
  write("• The letter must be signed by the requesting party. Notarization or witness signatures are not required.");
  write("• Attach copies of any available evidence supporting the identity theft claim.");
  write("Copies and Recordkeeping", true);
  write("• Send the original signed letter to the company.");
  write("• Include only copies of supporting documents unless original documents are expressly requested.");
  write("• Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Delivery and Follow-Up", true);
  write("• It is strongly recommended that the letter be sent via a traceable delivery method (e.g., certified mail or courier with confirmation of receipt).");
  write("• After a reasonable period, follow up to confirm that the account has been closed and the requested actions have been completed.");

  doc.save("request_close_unauthorized_account.pdf");
};

export default function RequestToCloseUnauthorizedAccountForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Close an Unauthorized Account"
      subtitle="Generate a signed letter to request account closure for fraud/identity theft"
      onGenerate={generatePDF}
      documentType="request-to-close-unauthorized-account"
    />
  );
}
