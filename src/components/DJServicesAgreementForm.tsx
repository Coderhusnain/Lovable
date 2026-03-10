import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Event",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "djName", label: "DJ/Service Provider name", type: "text", required: true },
      { name: "djAddress", label: "DJ/Service Provider address", type: "text", required: true },
      { name: "eventName", label: "Event name", type: "text", required: true },
      { name: "eventDate", label: "Event date", type: "date", required: true },
      { name: "startTime", label: "Start time", type: "text", required: true },
      { name: "endTime", label: "End time", type: "text", required: true },
      { name: "venueName", label: "Venue name", type: "text", required: true },
      { name: "venueAddress", label: "Venue address", type: "text", required: true },
      { name: "setupMinutes", label: "Setup prior minutes", type: "text", required: true },
      { name: "totalFee", label: "Total fee", type: "text", required: true },
      { name: "retainer", label: "Non-refundable retainer", type: "text", required: true },
      { name: "extraHourlyRate", label: "Additional hourly rate", type: "text", required: true },
      { name: "lateInterestRate", label: "Late interest %", type: "text", required: true },
      { name: "cancelNoticeDays", label: "Cancellation notice days", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "DJ SERVICES AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This DJ Services Agreement is made as of ${v.effectiveDate || "__________"} by and between Client ${v.clientName || "__________"} (${v.clientAddress || "__________"}) and DJ ${v.djName || "__________"} (${v.djAddress || "__________"}).`);
  p(`Event: ${v.eventName || "__________"} on ${v.eventDate || "__________"} from ${v.startTime || "____"} to ${v.endTime || "____"} at ${v.venueName || "__________"}, ${v.venueAddress || "__________"}.`);
  p(`DJ arrives at least ${v.setupMinutes || "____"} minutes before start for setup/sound check and provides professional sound equipment.`);
  p(`Fee terms: total $${v.totalFee || "__________"}; retainer $${v.retainer || "__________"} due on signing; balance due on/before event date.`);
  p(`Additional time billed at $${v.extraHourlyRate || "____"}/hour. Late balances accrue ${v.lateInterestRate || "____"}% per annum (or legal max).`);
  p(`Cancellation: more than ${v.cancelNoticeDays || "____"} days allows refund less retainer; within notice window full payment due.`);
  p("Performance standards, independent contractor terms, limitation of liability, force majeure, indemnification, default/remedies, notice, waiver, entire agreement, severability, amendments, dispute resolution, attorneys' fees apply.");
  p(`Governing law: ${v.governingLawState || "________________________"}.`);
  p("SIGNATURES: Client and DJ sign name/date lines.");
  doc.save("dj_services_agreement.pdf");
};

export default function DJServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="DJ Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="djservicesagreement"
    />
  );
}

