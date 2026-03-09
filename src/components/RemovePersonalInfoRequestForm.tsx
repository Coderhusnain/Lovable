import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Privacy Request Details",
    fields: [
      { name: "requesterName", label: "Requester name", type: "text", required: false },
      { name: "companyName", label: "Company name", type: "text", required: false },
      { name: "requestDate", label: "Request date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "REQUEST TO REMOVE PERSONAL INFORMATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.requestDate) p(`Date: ${values.requestDate}`);
  if (values.requesterName) p(`Requester: ${values.requesterName}`);
  if (values.companyName) p(`Company: ${values.companyName}`, false, 3);

  p("What is a Request to Remove Personal Information Agreement?", true);
  p("A Request to Remove Personal Information Agreement is a formal document sent to companies requesting deletion of personal data. Also known as a Delete Personal Information Letter, this draft helps protect privacy and supports compliance with deletion requests.");
  p("Whether you want to remove personal information from websites, online accounts, or business records, this agreement on Legalgram is designed to communicate your rights clearly and legally.");
  p("Download the best format from Legalgram and safeguard your personal information.", false, 3);

  p("When to Use a Request to Remove Personal Information Agreement", true);
  p("- You want websites or businesses to delete your personal information.");
  p("- You are concerned about online privacy or data protection.");
  p("- You need a written record to request deletion under CCPA or other privacy laws.", false, 3);

  p("Why Use Legalgram for Your Request", true);
  p("- Draft Request to Remove Personal Information agreement easily.");
  p("- Legally recognized deletion-request structure.");
  p("- Includes personal details, company contact details, and privacy request content.");
  p("- Best format from Legalgram with professional, enforceable layout.");
  p("- Download in PDF or Word for email, print, or sharing.");
  p("Using this agreement increases the likelihood that companies comply with your privacy requests.", false, 3);

  p("Request to Remove Personal Information Agreement FAQs", true);
  p("Do I need a document to request removal?");
  p("Yes. A formal written request helps ensure companies treat it seriously.");
  p("What is the CCPA?");
  p("The California Consumer Privacy Act allows eligible California residents to request deletion of personal information from qualifying businesses.");
  p("How can I remove personal information online for free?");
  p("- Delete unused accounts");
  p("- Restrict phone permissions");
  p("- Enable privacy settings on browsers/search/social platforms");
  p("Can I edit or share my agreement?");
  p("Yes. You can store securely, download, print, and share as needed.", false, 3);

  p("Related Consumer Protection Documents on Legalgram", true);
  p("- Complaint Letter to BBB or Attorney General");
  p("- Demand for Delivery");
  p("- Membership Cancellation Letter");
  p("- Complaint Letter to a Company");
  p("Download your Request to Remove Personal Information Agreement on Legalgram in the best format and protect your privacy.");

  doc.save("request_remove_personal_information_agreement.pdf");
};

export default function RemovePersonalInfoRequestForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Remove Personal Information"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="removepersonalinfo"
    />
  );
}
