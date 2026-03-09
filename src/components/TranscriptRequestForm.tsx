import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "authorizedPersonName", label: "Authorized person name", type: "text", required: false },
      { name: "institutionName", label: "Institution name", type: "text", required: true },
      { name: "institutionAddress", label: "Institution address", type: "text", required: false },
      { name: "fullName", label: "Requester full name", type: "text", required: true },
      { name: "registrationNumber", label: "Registration number", type: "text", required: false },
      { name: "departmentName", label: "Department name", type: "text", required: false },
      { name: "academicYear", label: "Academic year", type: "text", required: false },
      { name: "enrollmentNumber", label: "Enrollment number", type: "text", required: false },
      { name: "phoneNumber", label: "Phone number", type: "text", required: false },
      { name: "email", label: "Email address", type: "text", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signerName", label: "Signer printed name", type: "text", required: false },
      { name: "signatureDate", label: "Signature date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "TRANSCRIPT REQUEST";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;
  doc.setFontSize(10.5);

  p("To");
  uf("Name of Authorized person", values.authorizedPersonName, 26);
  uf("Name of institution", values.institutionName, 26);
  uf("Address", values.institutionAddress, 24);
  p("Subject: Transcript Request", true);
  p("Respected Sir/Madam,");
  p(`I, ${u(values.fullName, 14)}, bearing Registration Number ${u(values.registrationNumber, 10)}, was a student of ${u(values.institutionName, 14)}, enrolled in the ${u(values.departmentName, 12)} during the academic year ${u(values.academicYear, 8)}, with Enrollment Number ${u(values.enrollmentNumber, 10)}.`);
  p("I respectfully request that my degree be issued to my authorized representative at your earliest convenience. This request is made due to my inability to collect the degree in person, and I would greatly appreciate your cooperation in facilitating the process.");
  p("Please do not hesitate to contact me at the address provided above should you require any clarification or further information. If there are any specific documents or procedures necessary to authorize this request, kindly inform me. I am fully committed to providing any required details or documentation promptly to ensure a smooth and efficient degree issuance process.");
  p(`Additionally, I can be reached at ${u(values.phoneNumber, 12)} or via email at ${u(values.email, 16)} for any further communication.`);
  p("Thank you in advance for your support and timely assistance in this matter.");
  p("Sincerely,");
  uf("Name", values.signerName || values.fullName, 24);
  p("Signatures:");
  p("___________________________");
  uf("Date", values.signatureDate, 14);

  doc.save("transcript_request.pdf");
};

export default function TranscriptRequest() {
  return (
    <FormWizard
      steps={steps}
      title="Transcript Request"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="transcriptrequest"
    />
  );
}
