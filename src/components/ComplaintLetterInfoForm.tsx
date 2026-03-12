import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Complaint Basics", fields: [
    { name: "letterDate", label: "Letter date", type: "date", required: true },
    { name: "serviceProvider", label: "Company complained about", type: "text", required: true },
    { name: "amountPaid", label: "Amount paid", type: "text", required: true },
    { name: "checkNumber", label: "Check number", type: "text", required: true },
    { name: "checkDate", label: "Check date", type: "date", required: true },
  ]},
  { label: "Issue Timeline", fields: [
    { name: "contactedDate", label: "Date you contacted company", type: "date", required: true },
    { name: "bbbContactDate", label: "Date you contacted BBB", type: "date", required: true },
    { name: "bbbLocation", label: "BBB location", type: "text", required: true },
    { name: "refundFrom", label: "Refund requested from", type: "text", required: true },
    { name: "refundAmount", label: "Refund amount requested", type: "text", required: true },
    { name: "responseDays", label: "Requested response days", type: "text", required: true },
  ]},
  { label: "Sender Details", fields: [
    { name: "senderName", label: "Sender name", type: "text", required: true },
    { name: "senderAddress", label: "Sender address", type: "text", required: true },
    { name: "senderPhone", label: "Sender phone", type: "text", required: true },
    { name: "senderEmail", label: "Sender email", type: "text", required: true },
  ]},
  { label: "Checklist Notes", fields: [
    { name: "legalFormalitiesNote", label: "Legal formalities note", type: "text", required: false },
    { name: "recordkeepingNote", label: "Recordkeeping note", type: "text", required: false },
  ]},
  { label: "Supporting Documentation", fields: [
    { name: "supportingDocsNote", label: "Supporting docs note", type: "textarea", required: false },
    { name: "communicationLogNote", label: "Communication log note", type: "textarea", required: false },
  ]},
  { label: "Final Review", fields: [
    { name: "finalReviewer", label: "Prepared/Reviewed by", type: "text", required: false },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.5) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.1); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  const title = "COMPLAINT LETTER TO BBB / ATTORNEY GENERAL";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.2); doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2); y += 9;

  p("(BBB / Attorney General)");
  uf("Date", v.letterDate);
  p("To Whom It May Concern:");
  p(`I am writing to formally file a complaint regarding services I received from ${u(v.serviceProvider)}.`);
  p(`I paid a total amount of $${u(v.amountPaid)} for these services. Payment was made by check, bearing check number ${u(v.checkNumber)}, dated ${u(v.checkDate)}.`);
  p(`On ${u(v.contactedDate)}, I contacted ${u(v.serviceProvider)} to report that the services provided were unsatisfactory and did not meet reasonable expectations. Despite my efforts to resolve the matter directly, I did not receive an adequate or satisfactory response, which has compelled me to seek your assistance.`);
  p(`Subsequently, on ${u(v.bbbContactDate)}, I contacted the Better Business Bureau in ${u(v.bbbLocation)} and reported the same concerns regarding the unsatisfactory service.`);
  p(`I respectfully request your assistance in resolving this matter. Specifically, I am seeking a full refund from ${u(v.refundFrom)} in the amount of $${u(v.refundAmount)}, representing the total cost of the services rendered.`);
  p(`I would appreciate a written response regarding this complaint within ${u(v.responseDays)} days. Please contact me if additional information/documentation is required.`);
  p("Thank you for your time and attention to this matter.");
  p("Sincerely,");
  uf("Name", v.senderName); uf("Address", v.senderAddress); uf("Phone", v.senderPhone); uf("Email", v.senderEmail);

  p("Final Checklist for Complaint Letter (Better Business Bureau / Attorney General)", true);
  p("Legal Formalities: Ensure letter is signed; include date and complete contact information.");
  p("Recordkeeping: Retain copy of signed letter and copies of supporting documents/correspondence.");
  p("Reasons for Updating or Re-Sending: follow-up complaint or revised complaint if circumstances change.");
  p("Supporting Documentation: include copies of prior correspondence; attach photocopies (not originals); keep written communication log with dates/summaries/names/titles.");
  if (v.legalFormalitiesNote) p(`Legal formalities note: ${v.legalFormalitiesNote}`);
  if (v.recordkeepingNote) p(`Recordkeeping note: ${v.recordkeepingNote}`);
  if (v.supportingDocsNote) p(`Supporting documents note: ${v.supportingDocsNote}`);
  if (v.communicationLogNote) p(`Communication log note: ${v.communicationLogNote}`);
  if (v.finalReviewer) uf("Prepared/Reviewed by", v.finalReviewer);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("complaint_letter_bbb_attorney_general.pdf");
};

export default function ComplaintLetterInfoForm() {
  return <FormWizard steps={steps} title="Complaint Letter to BBB/Attorney General" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="complaintletterinfo" />;
}
