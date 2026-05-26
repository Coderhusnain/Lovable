import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "accountNo", label: "Account No.", type: "text", required: false },
      { name: "signatureName", label: "Printed Name", type: "text", required: true },
      { name: "supportingDocuments", label: "Supporting documents", type: "textarea", required: false },
    ],
  },
];

const u = (value?: string) => (value || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
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

  // Centered main title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title2 = "Formal Request for Termination of Fraudulent Account No.";
  doc.text(_title2, width / 2, y, { align: "center" });
  y += 10;
  write("Dear Sir or Madam,");
  write("I hereby formally request the immediate cancellation of the local telephone service associated with the above-referenced account number, which was opened fraudulently without my knowledge or authorization. I am the victim of identity theft in connection with this account.");
  write("Enclosed herewith are copies of documents substantiating the identity theft incident and supporting this request, including:");
  write(u(values.supportingDocuments) || "________________________________________");
  write("I further request that the fraudulent account be permanently closed and that all charges incurred in connection therewith be reversed and removed from my record. In the event any additional accounts or services are opened in my name, I request that I be notified without delay.");
  write("Additionally, I request that a fraud alert be placed on my name and account to help prevent any future unauthorized activity.");
  write("Please provide written confirmation that the foregoing actions have been completed. Should you require any further information or documentation, you may contact me at the address listed above.");
  write("Thank you for your prompt cooperation in resolving this matter.");
  write("Respectfully submitted,");
  write("[Signature]");
  write(u(values.signatureName) || "[Printed Name]");

  write("Final Compliance Checklist - Unauthorized Local Phone Service Cancellation", true, 2.2);
  write("Requesting Party: __________________________");
  write("Local Telephone Company: __________________________");
  write("Legal Execution", true);
  write("• The letter must be signed by the requesting party. Notarization or witness signatures are not required.");
  write("• Attach copies of all available evidence supporting the identity theft claim.");
  write("Copies and Recordkeeping", true);
  write("• Send the original signed letter to the local telephone company.");
  write("• Include only copies of supporting documents unless originals are expressly requested.");
  write("• Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Delivery Recommendation", true);
  write("• While not mandatory, it is strongly recommended that the letter be sent via a traceable delivery method (e.g., certified mail or courier with confirmation of receipt).");

  doc.save("formal_request_termination_fraudulent_account_no.pdf");
};

export default function FormalRequestForTerminationOfFraudulentAccountForm() {
  return <FormWizard steps={steps} title="Formal Request for Termination of Fraudulent Account No." subtitle="Complete the blanks to generate the request letter" onGenerate={generatePDF} documentType="formalrequestterminationfraudulentaccount" />;
}
