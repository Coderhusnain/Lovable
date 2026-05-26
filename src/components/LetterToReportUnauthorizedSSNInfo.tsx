import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Your Information",
    fields: [
      { name: "fullName", label: "Full legal name", type: "text", required: false },
      { name: "address", label: "Mailing address", type: "textarea", required: false },
      { name: "phone", label: "Phone number", type: "text", required: false },
      { name: "email", label: "Email address", type: "email", required: false },
    ],
  },
  {
    label: "SSN & Incident",
    fields: [
      { name: "ssn", label: "Social Security Number (last 4 or full)", type: "text", required: false },
      { name: "dob", label: "Date of birth", type: "date", required: false },
      { name: "fraudContact", label: "Fraud hotline contact (who you spoke with)", type: "text", required: false },
      { name: "evidence", label: "List of enclosed evidence", type: "textarea", required: false },
    ],
  },
  {
    label: "Follow Up",
    fields: [
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
  const title = "Letter to Report Unauthorized Use of a Social Security Number";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("Social Security Administration");
  write("Fraud Hotline");
  write("P.O. Box 17768");
  write("Baltimore, MD 21235");
  write("");
  write(`Re: Formal Notice of Unauthorized Use of Social Security Number`);
  write("");
  write("Dear Sir or Madam,");
  write("I write to formally confirm my recent communication with " + (values.fraudContact || "__________________") + " at the Fraud Hotline regarding the unauthorized and improper use of my Social Security Number.");
  write("");
  write(`For identification and verification purposes, my Social Security Number is ${values.ssn || "__________________________"}, and my date of birth is ${values.dob || "________________________"}.`);
  write("");
  write("Enclosed herewith are copies of documents evidencing the unauthorized use and related identity theft activity, including: " + (values.evidence || "________________________________________") + ".");
  write("");
  write("I respectfully request that your office initiate a formal investigation into this matter and provide written confirmation that such investigation has commenced.");
  write("");
  write("Should you require any additional information or documentation in connection with this report, please do not hesitate to contact me at the address provided above.");
  write("");
  write("Thank you for your prompt attention and cooperation.");
  write("");
  write("Respectfully submitted,");
  write("");
  write("[Signature]");
  write("");
  write(line(values.fullName));

  write("");
  write("Final Compliance Checklist – Unauthorized Use of Social Security Number Report", true, 2.2);
  write("Requesting Party: __________________________");
  write("Legal Execution", true);
  write("- The letter should be signed by the reporting individual. Notarization or witness signatures are not required.");
  write("- Attach copies of all available evidence relating to the unauthorized use incident.");
  write("Copies and Record Retention", true);
  write("- Send the original signed letter to the Social Security Administration.");
  write("- Include only copies of supporting documents unless originals are expressly requested.");
  write("- Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Delivery and Follow-Up", true);
  write("- It is strongly recommended that the letter be transmitted via a traceable delivery method (e.g., certified mail or courier with receipt confirmation).");
  write("- After a reasonable period, follow up to confirm that the investigation has been initiated and appropriate action has been taken.");

  doc.save("letter_to_report_unauthorized_ssn.pdf");
};

export default function LetterToReportUnauthorizedSSNInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Letter to Report Unauthorized Use of a Social Security Number"
      subtitle="Fill out the fields to generate the SSA report letter"
      onGenerate={generatePDF}
      documentType="letter-to-report-unauthorized-ssn"
    />
  );
}
