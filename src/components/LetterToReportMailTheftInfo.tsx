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
      { name: "incidentDescription", label: "Summary of the incident", type: "textarea", required: false },
      { name: "dateOfIncident", label: "Date of incident", type: "date", required: false },
      { name: "form2016Included", label: "Is Postal Service Form 2016 included?", type: "text", required: false },
    ],
  },
  {
    label: "Follow Up",
    fields: [
      { name: "postalInspector", label: "Postal inspector or office", type: "text", required: false },
      { name: "additionalNotes", label: "Additional notes", type: "textarea", required: false },
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

  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "Letter to Report Mail Theft";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("Dear Sir or Madam,");
  write("I write to formally notify your office that I have recently been the victim of a mail theft incident. Following this occurrence, I contacted your department to report the matter and to request a Mail Theft and Vandalism Complaint Form. The original completed complaint form is enclosed herewith for your review and action.");
  write("I respectfully request that your office initiate a full and thorough investigation into this incident. I would appreciate being kept informed of the progress and outcome of the investigation, including any findings or remedial measures undertaken.");
  write("Should you require any additional information or clarification in connection with this matter, please do not hesitate to contact me at the address provided above.");
  write("Thank you for your prompt attention and cooperation.");
  write("Yours sincerely,");
  write(line(values.fullName));

  write("Final Compliance Checklist – Mail Theft Report Letter", true, 2.2);
  write("Requesting Party: __________________________");
  write("Postal Office/Inspector: __________________________");
  write("Legal Execution", true);
  write("- The letter should be signed by the reporting party. Notarization or witness signatures are not required.");
  write("- Attach the original copy of Postal Service Form 2016.");
  write("Copies and Recordkeeping", true);
  write("- Send the original letter and Form 2016 to the appropriate postal inspector.");
  write("- Enclose only copies of any additional supporting documents unless an original is expressly required.");
  write("- Retain a complete copy of the letter and all attachments for your records. If any original documents are submitted, maintain photocopies.");
  write("Follow-Up", true);
  write("- After a reasonable period, confirm that the requested investigation has been initiated and appropriate action has been taken.");
  write("Reasons for Amendment or Resubmission", true);
  write("- To report a subsequent incident of mail theft");
  write("- To correct or supplement previously submitted information");

  doc.save("letter_to_report_mail_theft.pdf");
};

export default function LetterToReportMailTheftInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Letter to Report Mail Theft"
      subtitle="Fill out the fields to generate the mail theft report letter"
      onGenerate={generatePDF}
      documentType="letter-to-report-mail-theft"
    />
  );
}
