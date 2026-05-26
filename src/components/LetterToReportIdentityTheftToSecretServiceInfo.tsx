import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
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
      { name: "contactAt", label: "Person you communicated with at Secret Service", type: "text", required: false },
      { name: "incidentDescription", label: "Summary of the circumstances", type: "textarea", required: false },
      { name: "attachments", label: "List documents enclosed", type: "textarea", required: false },
    ],
  },
  {
    label: "Law Enforcement Details",
    fields: [
      { name: "policeDepartment", label: "Local police department", type: "text", required: false },
      { name: "policeReportNumber", label: "Police report number", type: "text", required: false },
      { name: "otherNotes", label: "Other notes", type: "textarea", required: false },
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
  const title = "Letter to Report an Identity Theft to the Secret Service";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("U.S. Secret Service", true);
  write("950 H Street, N.W., Suite 8400");
  write("Washington, D.C. 20223");
  write("Re: Formal Report of Identity Theft", true);
  write("Dear Sir or Madam,");
  write(`I write to formally confirm my recent communication with ${line(values.contactAt)} at the United States Secret Service headquarters in Washington, D.C.`);
  write("I hereby notify your office that I am the victim of identity theft and respectfully request that this matter be investigated. A brief summary of the circumstances surrounding the identity theft is set forth below:");
  write(line(values.incidentDescription));
  write(line(values.incidentDescription));
  write("I have filed an Identity Theft Affidavit with the Federal Trade Commission and have also submitted a report to my local law enforcement agency. Copies of both the affidavit and the police report are enclosed for your review.");
  write("Additionally, I have enclosed copies of the following documents relevant to this incident:");
  write(line(values.attachments));
  write(line(values.attachments));
  write("I respectfully request written confirmation outlining the actions your office intends to take in response to this report.");
  write("Should you require any further information or documentation, please do not hesitate to contact me at the address provided above.");
  write("Thank you for your prompt attention and assistance.");
  write("Respectfully submitted,");
  write(line(values.fullName));
  write("[Signature]");
  write("[Printed Name]");

  write("Final Compliance Checklist – Identity Theft Report to the Secret Service", true, 2.2);
  write("Requesting Party: __________________________");
  write("Legal Execution", true);
  write("- The letter should be signed by the reporting individual. Notarization or witness signatures are not required.");
  write("- Attach all available evidence related to the identity theft incident, including copies of the FTC Identity Theft Affidavit and the local police report.");
  write("Copies and Recordkeeping", true);
  write("- Send the original signed letter to the U.S. Secret Service.");
  write("- Include copies of all supporting documents unless originals are specifically requested.");
  write("- Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Delivery and Follow-Up", true);
  write("- It is recommended that the letter be sent via a traceable delivery method (e.g., certified mail or courier with confirmation of receipt).");
  write("- After a reasonable period, follow up to confirm that the report has been received and appropriate action has been initiated.");

  doc.save("letter_to_report_identity_theft_to_secret_service.pdf");
};

export default function LetterToReportIdentityTheftToSecretServiceInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Letter to Report an Identity Theft to the Secret Service"
      subtitle="Fill out the fields to generate the Secret Service identity theft report letter"
      onGenerate={generatePDF}
      documentType="letter-to-report-identity-theft-secret-service"
    />
  );
}
