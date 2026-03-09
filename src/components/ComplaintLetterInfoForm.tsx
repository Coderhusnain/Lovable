import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "serviceProvider", label: "Service provider", type: "text", required: false },
      { name: "amountPaid", label: "Amount paid", type: "text", required: false },
      { name: "checkNumber", label: "Check number", type: "text", required: false },
      { name: "checkDate", label: "Check date", type: "date", required: false },
      { name: "contactedDate", label: "Date contacted provider", type: "date", required: false },
      { name: "bbbLocation", label: "BBB location", type: "text", required: false },
      { name: "bbbContactDate", label: "Date contacted BBB", type: "date", required: false },
      { name: "refundTarget", label: "Refund from", type: "text", required: false },
      { name: "refundAmount", label: "Refund amount", type: "text", required: false },
      { name: "responseDays", label: "Response days", type: "text", required: false },
      { name: "name", label: "Name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
      { name: "phone", label: "Phone", type: "text", required: false },
      { name: "email", label: "Email", type: "text", required: false },
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
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "COMPLAINT LETTER TO BBB/ ATTORNEY GENERAL";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p("(BBB / Attorney General)");
  uf("Date", values.requestDate, 20);
  p("To Whom It May Concern:");
  p(`I am writing to formally file a complaint regarding services I received from ${values.serviceProvider || "________________________"}.`);
  p(`I paid a total amount of $${values.amountPaid || "------"} for these services. Payment was made by check, bearing check number ${values.checkNumber || "___________"}, dated ${values.checkDate || "____________"}.`);
  p(`On ${values.contactedDate || "____________"}, I contacted ${values.serviceProvider || "________________________"} to report that the services provided were unsatisfactory and did not meet reasonable expectations. Despite my efforts to resolve the matter directly, I did not receive an adequate or satisfactory response, which has compelled me to seek your assistance.`);
  p(`Subsequently, on ${values.bbbContactDate || "____________"}, I contacted the Better Business Bureau in ${values.bbbLocation || "________________________"} and reported the same concerns regarding the unsatisfactory service.`);
  p(`I respectfully request your assistance in resolving this matter. Specifically, I am seeking a full refund from ${values.refundTarget || "________________________"} in the amount of $${values.refundAmount || "--------"}, representing the total cost of the services rendered.`);
  p(`I would appreciate a written response regarding this complaint within ${values.responseDays || "____________"} days. Please feel free to contact me should you require any additional information or documentation.`);
  p("Thank you for your time and attention to this matter.");
  p("Sincerely,", false, 3);
  uf("Name", values.name, 24);
  uf("Address", values.address, 34);
  uf("Phone", values.phone, 24);
  uf("Email", values.email, 24, 3);

  p("Final Checklist for Complaint Letter", true);
  p("(Better Business Bureau / Attorney General)");
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed.");
  p("[ ] Include the date and complete contact information.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter for your personal records.");
  p("[ ] Maintain copies of all supporting documents and correspondence.", false, 2.6);
  p("Reasons for Updating or Re-Sending", true, 1);
  p("- To submit a follow-up complaint.");
  p("- To file a separate or revised complaint if circumstances change.", false, 2.6);
  p("Supporting Documentation", true, 1);
  p("- Enclose copies of any prior correspondence sent to the company in an effort to resolve the issue.");
  p("- Attach photocopies only (not original documents) of all relevant materials.");
  p("- Keep a written log of all communications, including:");
  p("  o Dates of letters sent or received");
  p("  o Dates and summaries of telephone conversations");
  p("  o Names and titles of individuals contacted");

  doc.save("complaint_letter_to_bbb_attorney_general.pdf");
};

export default function ComplaintLetterInfoForm() {
  return (
    <FormWizard
      steps={steps}
      title="Complaint letter to BBB/Attorney General"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="complaintletterinfo"
    />
  );
}
