import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Reservation Letter",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: true },
      { name: "toName", label: "To", type: "text", required: true },
      { name: "toAddress", label: "Address", type: "text", required: true },
      { name: "toCity", label: "City", type: "text", required: true },
      { name: "periodStart", label: "Reservation start date", type: "date", required: true },
      { name: "periodEnd", label: "Reservation end date", type: "date", required: true },
      { name: "roomRequirements", label: "Room requirements", type: "textarea", required: true },
      { name: "arrivalDate", label: "Anticipated arrival date", type: "date", required: true },
      { name: "printedName", label: "Printed name", type: "text", required: true },
      { name: "senderAddress", label: "Sender address", type: "text", required: true },
      { name: "senderCity", label: "Sender city", type: "text", required: true },
      { name: "contactInfo", label: "Contact information", type: "text", required: true },
      { name: "checklistFor", label: "Checklist For", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.4);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.line(x, y + 1, x + doc.getTextWidth("_".repeat(min)), y + 1);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  const title = "CONFIRMATION OF RESERVATIONS";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", v.requestDate);
  uf("To", v.toName);
  uf("Address", v.toAddress);
  uf("City", v.toCity);
  p("Subject: Request for Reservation Confirmation", true);
  p("Dear Sir or Madam:");
  p(
    `I write to formally request the reservation of a room at your establishment for the period commencing on ${u(v.periodStart)} and ending on ${u(v.periodEnd)}.`
  );
  p("The room is requested to meet the following requirements:");
  uf("Requirements", v.roomRequirements, 30);
  p(`I anticipate arriving on ${u(v.arrivalDate)}.`);
  p("Enclosed herewith is payment by check in the amount required to secure the reservation. Kindly confirm receipt of payment and provide written confirmation of the reservation at your earliest convenience.");
  p("Please contact me should you require any additional information to process this request.");
  p("Thank you for your assistance.");
  p("Sincerely,", false, 3);
  p("Signature");
  uf("Printed Name", v.printedName);
  uf("Address", v.senderAddress);
  uf("City", v.senderCity);
  uf("Contact Information", v.contactInfo);

  y += 2;
  p("Final Checklist - Reservation Confirmation", true);
  uf("For", v.checklistFor);
  p("Legal Formalities", true, 1);
  p("- [ ] Ensure the letter is signed by the requesting party.");
  p("- [ ] Attach payment, if required to secure the reservation.", false, 2.2);
  p("Recordkeeping", true, 1);
  p("- [ ] Retain a copy of the signed letter and proof of payment for your records.", false, 2.2);
  p("Reasons to Update or Reissue", true, 1);
  p("- To submit a follow-up request regarding a pending reservation.");
  p("- To make or confirm additional reservations.");

  doc.save("confirmation_of_reservations.pdf");
};

export default function ReservationConfirmationForm() {
  return (
    <FormWizard
      steps={steps}
      title="Confirmation of Reservations"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="reservationconfirmation"
    />
  );
}
