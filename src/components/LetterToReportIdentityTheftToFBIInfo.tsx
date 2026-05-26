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
    label: "Identity Theft Details",
    fields: [
      { name: "incidentDate", label: "Date you discovered the theft", type: "date", required: false },
      { name: "incidentDescription", label: "How the identity theft happened", type: "textarea", required: false },
      { name: "fraudActivity", label: "Fraudulent activity or accounts", type: "textarea", required: false },
      { name: "consequences", label: "Consequences suffered", type: "textarea", required: false },
    ],
  },
  {
    label: "Law Enforcement Details",
    fields: [
      { name: "policeDepartment", label: "Local police department", type: "text", required: false },
      { name: "policeState", label: "State where report was filed", type: "text", required: false },
      { name: "fbiOffice", label: "FBI field office or office location", type: "text", required: false },
      { name: "supportingDocs", label: "Supporting documents or evidence", type: "textarea", required: false },
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
  const title = "Letter to Report an Identity Theft to the FBI";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("Federal Bureau of Investigation", true);
  write("Dear Sir or Madam,");
  write("I am writing to report that my identity has been stolen and used without my authorization.");
  write(`My name is ${line(values.fullName)}.`);
  write(`My contact information is: ${line(values.address)}.`);
  write(`Phone: ${line(values.phone)}  |  Email: ${line(values.email)}`);
  write(`I discovered this identity theft on or about ${line(values.incidentDate)}.`);
  write("The incident and how it occurred are described as follows:");
  write(line(values.incidentDescription));
  write("The fraudulent activity I am aware of includes the following:");
  write(line(values.fraudActivity));
  write("As a result of this identity theft, I have experienced the following consequences:");
  write(line(values.consequences));
  write(`A local police report was filed with ${line(values.policeDepartment)} in ${line(values.policeState)}.`);
  write(`I also understand this matter may require review by the FBI field office at ${line(values.fbiOffice)}.`);
  write("Supporting documents and evidence are listed below:");
  write(line(values.supportingDocs));
  write("Please investigate this matter and advise me if additional information is required.");
  write("Thank you for your attention to this report.");
  write("Sincerely,");
  write("Signature");
  write("Printed Name");

  write("Final Checklist - FBI Identity Theft Report", true, 2.2);
  write("Execution", true);
  write("- Sign the letter before sending it.");
  write("- Keep a copy of the letter and every enclosure for your records.");
  write("Supporting Documentation", true);
  write("- Attach copies of police reports, account statements, correspondence, and any other proof of the fraud.");
  write("Delivery Guidance", true);
  write("- Send the letter to the FBI office or other agency contact handling your report, and use a trackable delivery method when possible.");

  doc.save("letter_to_report_identity_theft_to_the_fbi.pdf");
};

export default function LetterToReportIdentityTheftToFBIInfo() {
  return <FormWizard steps={steps} title="Letter to Report an Identity Theft to the FBI" subtitle="Fill out the fields to generate the FBI identity theft report letter" onGenerate={generatePDF} documentType="letter-to-report-identity-theft-fbi" />;
}