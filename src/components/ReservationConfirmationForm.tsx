import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Reservation Request",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "Address", type: "text", required: false },
      { name: "startDate", label: "Reservation start date", type: "date", required: false },
      { name: "endDate", label: "Reservation end date", type: "date", required: false },
      { name: "requirements", label: "Room requirements", type: "textarea", required: false },
      { name: "arrivalDate", label: "Arrival date", type: "date", required: false },
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
      { name: "forName", label: "Checklist For", type: "text", required: false },
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
  const title = "CONFIRMATION OF RESERVATIONS";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  uf("To", values.toName, 24);
  uf("Address", values.toAddress, 32);
  p("Subject: Request for Reservation Confirmation", true);
  p("Dear Sir or Madam:");
  p(`I write to formally request the reservation of a room at your establishment for the period commencing on ${values.startDate || "________________________"} and ending on ${values.endDate || "________________________"}.`);
  p("The room is requested to meet the following requirements:");
  uf("Requirements", values.requirements, 40);
  p(`I anticipate arriving on ${values.arrivalDate || "________________________"}.`);
  p("Enclosed herewith is payment by check in the amount required to secure the reservation. Kindly confirm receipt of payment and provide written confirmation of the reservation at your earliest convenience.");
  p("Please contact me should you require any additional information to process this request.");
  p("Thank you for your assistance.");
  p("Sincerely,", false, 3);
  uf("Signature", values.signature, 30);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Final Checklist - Reservation Confirmation", true);
  uf("For", values.forName, 20);
  p("Legal Formalities", true, 1);
  p("[ ] Ensure the letter is signed by the requesting party.");
  p("[ ] Attach payment, if required to secure the reservation.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("[ ] Retain a copy of the signed letter and proof of payment for your records.", false, 2.6);
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
