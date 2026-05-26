import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Details",
    fields: [
      { name: "company", label: "Company Name", type: "text", required: false },
      { name: "contactDate", label: "Contact Date", type: "text", required: false },
      { name: "issueSummary", label: "Issue Summary / Requested Remedy", type: "textarea", required: false },
      { name: "enclosures", label: "Enclosures", type: "textarea", required: false },
      { name: "requestingParty", label: "Requesting Party Name", type: "text", required: false },
    ],
  },
];

const v = (s?: string) => (s || "").trim();

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
  const _title = "Identity Theft Complaint";
  doc.text(_title, width / 2, y, { align: "center" });
  y += 10;

  write("Better Business Bureau");
  write("Re: Identity Theft Complaint");
  write("Dear Sir or Madam,");
  write("I am writing to formally lodge a complaint concerning the misuse of my employment records by " + (v(values.company) || "____________________") + ".");
  write("On " + (v(values.contactDate) || "____________________") + ", I contacted " + (v(values.company) || "____________________") + " to report this matter and clearly explained that the situation was unacceptable. Despite this communication, the issue remains unresolved.");
  write("Due to " + (v(values.company) || "____________________") + "’s failure to provide an appropriate response or take corrective action, I am compelled to submit this complaint for your review and assistance.");
  write("To resolve this matter, I respectfully request that " + (v(values.company) || "____________________") + " take appropriate remedial measures, including but not limited to " + (v(values.issueSummary) || "____________________") + ".");
  write("Enclosed herewith are copies of the following document(s) relevant to this complaint: " + (v(values.enclosures) || "____________________") + ".");
  write("Should you require any additional information or clarification, please do not hesitate to contact me at the address listed above.");
  write("Thank you for your prompt attention to this serious matter. I look forward to your response.");
  write("Yours sincerely,");
  write("", false, 8);

  // Spacer lines for signature area
  write("", false, 10);
  write("", false, 2);

  write("Final Checklist – Identity Theft Complaint to the Better Business Bureau", true, 2.4);
  write("Requesting Party: " + (v(values.requestingParty) || "__________________"));

  write("Make It Legal");
  write("•\t☐ The complaint letter should be signed by the requesting party. Witnessing or notarization is not required unless specifically requested.");
  write("•\t☐ Attach copies of all relevant evidence supporting the identity theft claim, including prior correspondence sent to the company in an effort to resolve the matter.");

  write("Copies");
  write("•\t☐ Send the original signed letter to the Better Business Bureau.");
  write("•\t☐ Include only copies of supporting documents unless submission of originals is expressly required.");
  write("•\t☐ Retain a copy of the complaint letter for your records.");
  write("•\t☐ Keep original documents unless submission of originals is mandatory. If originals are sent, retain copies.");

  write("Other Important Notes");
  write("•\t☐ While not mandatory, it is strongly recommended that the complaint be sent via a traceable delivery method (such as certified mail, return receipt requested, or an overnight courier) to establish proof of receipt.");
  write("•\t☐ Maintain all delivery confirmations and correspondence for future reference.");

  doc.save("identity_theft_complaint_bbb.pdf");
};

export default function IdentityTheftComplaintForm() {
  return <FormWizard steps={steps} title="Identity Theft Complaint" subtitle="Complete the fields to generate the Identity Theft Complaint" onGenerate={generatePDF} documentType="identity-theft-complaint-bbb" />;
}
