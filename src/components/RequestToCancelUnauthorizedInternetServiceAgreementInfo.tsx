import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Account & Provider",
    fields: [
      { name: "providerName", label: "Internet Service Provider Name", type: "text", required: false },
      { name: "providerAddress", label: "Provider Address", type: "textarea", required: false },
      { name: "accountNumber", label: "Account Number", type: "text", required: false },
    ],
  },
  {
    label: "Victim Information",
    fields: [
      { name: "fullName", label: "Full legal name", type: "text", required: false },
      { name: "address", label: "Mailing address", type: "textarea", required: false },
      { name: "phone", label: "Phone number", type: "text", required: false },
      { name: "email", label: "Email address", type: "email", required: false },
    ],
  },
  {
    label: "Incident Details",
    fields: [
      { name: "summary", label: "Summary of the fraudulent account activity", type: "textarea", required: false },
      { name: "attachments", label: "List documents enclosed", type: "textarea", required: false },
    ],
  },
];

const line = (value?: string) => (value || "").trim() || "________________________________________";

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.3;
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

  ensureSpace(16);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "Request to Cancel Unauthorized Internet Service Account";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write(`${line(values.providerName)}`);
  write(`${line(values.providerAddress)}`);
  write(`Re: Request for Termination of Fraudulently Opened Account`, true);
  write("Dear Sir or Madam,");
  write(`Account Number: ${line(values.accountNumber)}`);
  write("");
  write(`I hereby formally request the immediate termination of the internet service associated with the above-referenced account number. This account was fraudulently opened without my authorization, and I am the victim of identity theft.`);
  write("");
  write("Enclosed herewith are copies of the relevant documents evidencing the identity theft incident and supporting this request.");
  write("");
  write("I respectfully request that the account be closed without penalty, that all charges incurred as a result of the fraudulent activity be canceled, and that no further billing or collection action be taken against me in connection with this account.");
  write("");
  write("Additionally, I request that a fraud alert be placed on my name and/or customer profile to prevent any future unauthorized accounts from being opened in my name. Should any attempt be made to establish new service using my personal information, I request that I be contacted immediately.");
  write("");
  write("Please provide written confirmation once the above actions have been completed. Should you require any additional information or documentation, you may contact me at the address listed above.");
  write("");
  write("Thank you for your prompt attention and cooperation in this matter.");
  write("");
  write("Yours sincerely,");
  write("");
  write(line(values.fullName));
  write("[Signature]");

  write("", false, 2.2);
  write("Final Checklist for Request to Cancel Unauthorized Internet Service", true, 2.2);
  write(`Requesting Party: __________________   Internet Service Provider: __________________`);
  write("Legal Formalities", true);
  write("☐ Ensure the letter is duly signed. Notarization or witnessing is not required unless expressly requested by the Internet Service Provider.");
  write("☐ Attach copies of all available documentation evidencing the identity theft incident.");
  write("Copies and Recordkeeping", true);
  write("☐ Send the original letter to the Internet Service Provider.");
  write("☐ Enclose only photocopies of supporting documents unless original documents are specifically required.");
  write("☐ Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Additional Recommendations", true);
  write("☐ It is recommended that the letter be sent using a traceable delivery method, such as certified mail or courier with delivery confirmation.");
  write("☐ After allowing a reasonable period for processing, follow up with the Internet Service Provider to confirm that the account has been terminated and all requested actions have been completed.");

  doc.save("request_to_cancel_unauthorized_internet_service.pdf");
};

export default function RequestToCancelUnauthorizedInternetServiceAgreementInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Cancel Unauthorized Internet Service"
      subtitle="Fill out the fields to generate a formal request to cancel an internet account opened fraudulently"
      onGenerate={generatePDF}
      documentType="request-cancel-unauthorized-internet-service"
    />
  );
}
