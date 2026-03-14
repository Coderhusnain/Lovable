import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Reservation Letter",
    fields: [
      { name: "requestDate",   label: "Date",                        type: "date",     required: true },
      { name: "toName",        label: "To",                          type: "text",     required: true },
      { name: "toAddress",     label: "Address",                     type: "text",     required: true },
      { name: "toCity",        label: "City",                        type: "text",     required: true },
      { name: "periodStart",   label: "Reservation start date",      type: "date",     required: true },
      { name: "periodEnd",     label: "Reservation end date",        type: "date",     required: true },
      { name: "roomRequirements", label: "Room requirements",        type: "textarea", required: true },
      { name: "arrivalDate",   label: "Anticipated arrival date",    type: "date",     required: true },
      { name: "printedName",   label: "Printed name",                type: "text",     required: true },
      { name: "senderAddress", label: "Sender address",              type: "text",     required: true },
      { name: "senderCity",    label: "Sender city",                 type: "text",     required: true },
      { name: "contactInfo",   label: "Contact information",         type: "text",     required: true },
      { name: "checklistFor",  label: "Checklist For",               type: "text",     required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const w    = 210;
  const m    = 18;
  const tw   = w - m * 2;
  const lh   = 5.6;
  const limit = 278;
  let y = 22;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 22; }
  };

  const p = (text: string, bold = false, gap = 2.2) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const bullet = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - 5);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 1, y);
    doc.text(lines, m + 5, y);
    y += lines.length * lh + gap;
  };

  const sectionHeading = (text: string) => {
    y += 2;
    newPageIfNeeded(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 1.5;
  };

  const uf = (label: string, value?: string, lineLen = 24, gap = 2.2) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(lineLen)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(lineLen)), y + 1.1);
    }
    y += lh + gap;
  };

  const val = (key: string, fallback = "________________________") =>
    (v[key] || "").trim() || fallback;

  // ── Title — bold, centred, underlined ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "CONFIRMATION OF RESERVATIONS";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 10;

  // ── Date — two segments ───────────────────────────────────────────────────
  // Draft: Date: ____________, ____________
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text("Date: ", m, y);
  let dx = m + doc.getTextWidth("Date: ");
  const segLen = doc.getTextWidth("____________");
  const dateVal = (v.requestDate || "").trim();
  if (dateVal) {
    const parts = dateVal.split(",");
    const p1 = parts[0].trim();
    const p2 = parts.slice(1).join(",").trim();
    doc.text(p1, dx, y);
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(p1)), y + 1.1);
    dx += Math.max(segLen, doc.getTextWidth(p1));
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    if (p2) {
      doc.text(p2, dx, y);
      doc.line(dx, y + 1.1, dx + Math.max(segLen, doc.getTextWidth(p2)), y + 1.1);
    } else {
      doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    }
  } else {
    doc.setLineWidth(0.22);
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
    dx += segLen;
    doc.text(", ", dx, y);
    dx += doc.getTextWidth(", ");
    doc.line(dx, y + 1.1, dx + segLen, y + 1.1);
  }
  y += lh + 2.2;

  // ── To and Address on same line ───────────────────────────────────────────
  // Draft: To: __________________________ Address: _____________________
  newPageIfNeeded(lh + 2.2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const toLabel   = "To: ";
  const toVal     = (v.toName    || "").trim();
  const toLineLen = doc.getTextWidth("__________________________");
  doc.text(toLabel, m, y);
  let tx = m + doc.getTextWidth(toLabel);
  if (toVal) {
    doc.text(toVal, tx, y);
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + Math.max(toLineLen, doc.getTextWidth(toVal)), y + 1.1);
    tx += Math.max(toLineLen, doc.getTextWidth(toVal));
  } else {
    doc.setLineWidth(0.22);
    doc.line(tx, y + 1.1, tx + toLineLen, y + 1.1);
    tx += toLineLen;
  }
  tx += 4;
  const addrLabel   = "Address: ";
  const addrVal     = (v.toAddress || "").trim();
  const addrLineLen = doc.getTextWidth("_____________________");
  doc.text(addrLabel, tx, y);
  const ax = tx + doc.getTextWidth(addrLabel);
  if (addrVal) {
    doc.text(addrVal, ax, y);
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + Math.max(addrLineLen, doc.getTextWidth(addrVal)), y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(ax, y + 1.1, ax + addrLineLen, y + 1.1);
  }
  y += lh + 2.2;

  // ── Body ──────────────────────────────────────────────────────────────────
  p("Subject: Request for Reservation Confirmation", true);
  p("Dear Sir or Madam:");
  p(`I write to formally request the reservation of a room at your establishment for the period commencing on ${val("periodStart")} and ending on ${val("periodEnd")}.`);
  p("The room is requested to meet the following requirements:");

  // Room requirements — full width underline
  const req = (v.roomRequirements || "").trim();
  newPageIfNeeded(lh + 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  if (req) {
    const reqLines = doc.splitTextToSize(req, tw);
    doc.text(reqLines, m, y);
    doc.setLineWidth(0.22);
    doc.line(m, y + 1.1, m + tw, y + 1.1);
    y += reqLines.length * lh + 2.2;
  } else {
    doc.setLineWidth(0.22);
    doc.line(m, y + 1.1, m + tw, y + 1.1);
    y += lh + 2.2;
  }

  p(`I anticipate arriving on ${val("arrivalDate")}.`);
  p("Enclosed herewith is payment by check in the amount required to secure the reservation. Kindly confirm receipt of payment and provide written confirmation of the reservation at your earliest convenience.");
  p("Please contact me should you require any additional information to process this request.");
  p("Thank you for your assistance.");
  p("Sincerely,", false, 4);

  uf("Signature",           "",               30);
  uf("Printed Name",        v.printedName,    28);
  uf("Address",             v.senderAddress,  34);
  uf("Contact Information", v.contactInfo,    34, 6);

  // ── Final Checklist ───────────────────────────────────────────────────────
  y += 2;
  newPageIfNeeded(lh + 4);

  // Title — bold, 13pt, centred, underlined
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const clTitle = "Final Checklist \u2014 Reservation Confirmation";
  doc.text(clTitle, w / 2, y, { align: "center" });
  const clTW = doc.getTextWidth(clTitle);
  doc.setLineWidth(0.45);
  doc.line(w / 2 - clTW / 2, y + 1.5, w / 2 + clTW / 2, y + 1.5);
  y += 9;
  doc.setFontSize(10.5);

  // Draft: For: __________________________
  uf("For", v.checklistFor, 28, 3);

  // Legal Formalities
  sectionHeading("Legal Formalities");
  bullet("\u2610  Ensure the letter is signed by the requesting party.");
  bullet("\u2610  Attach payment, if required to secure the reservation.");

  // Recordkeeping
  sectionHeading("Recordkeeping");
  bullet("\u2610  Retain a copy of the signed letter and proof of payment for your records.");

  // Reasons to Update or Reissue
  sectionHeading("Reasons to Update or Reissue");
  bullet("\u2022  To submit a follow-up request regarding a pending reservation.");
  bullet("\u2022  To make or confirm additional reservations.");

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