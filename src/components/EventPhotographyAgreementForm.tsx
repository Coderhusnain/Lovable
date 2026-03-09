import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Event",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "photographerName", label: "Photographer name", type: "text", required: true },
      { name: "photographerAddress", label: "Photographer address", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "eventName", label: "Event name/description", type: "text", required: true },
      { name: "eventDate", label: "Event date", type: "date", required: true },
      { name: "eventTime", label: "Event time", type: "text", required: true },
      { name: "eventLocation", label: "Event location", type: "text", required: true },
    ],
  },
  {
    label: "Services and Payment",
    fields: [
      { name: "proofDays", label: "Proof gallery days", type: "text", required: true },
      { name: "deliveryDays", label: "Final delivery days after proof", type: "text", required: true },
      { name: "totalFee", label: "Total fee", type: "text", required: true },
      { name: "deposit", label: "Deposit amount", type: "text", required: true },
      { name: "balance", label: "Remaining balance amount", type: "text", required: true },
      { name: "balanceDueDays", label: "Balance due days before event", type: "text", required: true },
      { name: "extraHourRate", label: "Additional hourly rate", type: "text", required: true },
      { name: "extraHourPayDays", label: "Extra hours payment due days after event", type: "text", required: true },
      { name: "cureDays", label: "Breach cure days", type: "text", required: true },
      { name: "cancelMoreThanDays", label: "Cancellation more-than days", type: "text", required: true },
      { name: "cancelWithinDays", label: "Cancellation within days", type: "text", required: true },
      { name: "cancelWithinPercent", label: "Cancellation fee percent", type: "text", required: true },
      { name: "mediationState", label: "Mediation state", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignName", label: "Client signatory name", type: "text", required: false },
      { name: "clientSignDate", label: "Client sign date", type: "date", required: true },
      { name: "photographerSignName", label: "Photographer signatory name", type: "text", required: false },
      { name: "photographerSignDate", label: "Photographer sign date", type: "date", required: true },
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
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
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
  const title = "EVENT PHOTOGRAPHY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Event Photography Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "the Effective Date"}, by and between:`);
  p(`Photographer: ${values.photographerName || "____________________________"}, of ${values.photographerAddress || "____________________________"} ("Photographer")`);
  p("and");
  p(`Client: ${values.clientName || "____________________________"}, of ${values.clientAddress || "____________________________"} ("Client")`);
  p('The Photographer and Client may be referred to individually as a "Party" and collectively as the "Parties."', false, 3);

  p("1. RECITALS", true);
  p("WHEREAS, Client desires to engage Photographer for professional event photography services for the event described herein, and Photographer is willing to provide such services under this Agreement;");
  p("NOW, THEREFORE, in consideration of mutual covenants, the Parties agree as follows:", false, 3);

  p("2. DESCRIPTION OF SERVICES", true);
  p("2.1 Event Details");
  p(`- Event Name/Description: ${values.eventName || "___________________________________"}`);
  p(`- Event Date: ${values.eventDate || "___________________________________"}`);
  p(`- Event Time: ${values.eventTime || "___________________________________"}`);
  p(`- Event Location: ${values.eventLocation || "___________________________________"}`);
  p("2.2 Scope of Work");
  p("Services include pre-event consultation on creative direction and logistics; on-site professional coverage; artistic editing/retouching/post-processing; delivery of edited high-resolution digital images in agreed format/quantity; and optional printed photographs/albums/products if separately agreed in writing.", false, 3);

  p("3. PERFORMANCE OF SERVICES", true);
  p("3.1 Photographer shall capture images per Client's reasonable instructions while retaining full artistic discretion; use professional-grade equipment and post-processing; apply color correction/cropping/light retouching; provide digital proof gallery/lookbook within stated business days; and deliver final edited images within stated business days after proof approval.");
  p(`Proof gallery delivery: ${values.proofDays || "____"} business days following event.`);
  p(`Final edited image delivery: ${values.deliveryDays || "____"} business days following proof approval.`);
  p("3.2 Artistic Style: Client acknowledges Photographer's work is subjective and accepts Photographer judgment regarding style/composition/image selection as final.", false, 3);

  p("4. FEES, PAYMENTS, AND EXPENSES", true);
  p(`4.1 Total Fee: Client shall pay total fee of ${values.totalFee || "$__________"} ("Fee").`);
  p(`4.2 Deposit: Non-refundable deposit of ${values.deposit || "$__________"} is due upon execution to secure availability.`);
  p(`4.3 Balance Payment: Remaining balance of ${values.balance || "$__________"} due no later than ${values.balanceDueDays || "____"} days before event date.`);
  p(`4.4 Additional Charges: Additional hours requested are billed at ${values.extraHourRate || "$__________"} per hour, payable within ${values.extraHourPayDays || "____"} days after event.`);
  p("4.5 Expenses: Client reimburses reasonable pre-approved out-of-pocket expenses (travel, accommodation, parking, permits).", false, 3);

  p("5. REMEDIES FOR BREACH", true);
  p("In event of material breach, non-breaching Party shall provide written notice detailing breach.");
  p(`Breaching Party has ${values.cureDays || "____"} days from notice receipt to cure.`);
  p("If uncured, non-breaching Party may terminate and pursue remedies at law or in equity.", false, 3);

  p("6. CANCELLATION AND RESCHEDULING", true);
  p(`If Client cancels more than ${values.cancelMoreThanDays || "____"} days before event date, deposit is retained as liquidated damages.`);
  p(`If cancellation occurs within ${values.cancelWithinDays || "____"} days of event date, Client is liable for ${values.cancelWithinPercent || "____"}% of total Fee.`);
  p("Photographer will make reasonable efforts to accommodate rescheduling subject to availability.", false, 3);

  p("7. COPYRIGHT AND USAGE RIGHTS", true);
  p("7.1 Copyright: All photographs are intellectual property of Photographer and protected by U.S. copyright law.");
  p("7.2 Client License: Upon full payment, Photographer grants Client non-exclusive, non-transferable, perpetual license for personal use including printing, sharing, and personal social media posting.");
  p("7.3 Restrictions: Client may not sell, license, or commercially exploit images without Photographer's prior written consent.");
  p("7.4 Photographer Portfolio Rights: Photographer may use images for promotional/advertising/portfolio purposes unless Client submits written request to withhold use.", false, 3);

  p("8. FORCE MAJEURE", true);
  p("Neither Party is liable for delay/failure due to causes beyond reasonable control, including acts of God, epidemics, war, civil unrest, natural disasters, strikes, or governmental restrictions. Affected Party shall promptly notify and mitigate delay.", false, 3);

  p("9. DISPUTE RESOLUTION", true);
  p("Parties shall attempt amicable resolution through good-faith negotiation.");
  p(`If unresolved, disputes submitted to mediation in the State of ${values.mediationState || "__________"} under applicable mediation rules.`);
  p("If mediation fails, Parties may pursue remedies in court, subject to governing law provision.", false, 3);

  p("10. MISCELLANEOUS PROVISIONS", true);
  p("10.1 Entire Agreement: This Agreement contains entire understanding and supersedes prior oral/written agreements.");
  p("10.2 Severability: If any provision is invalid, remainder remains enforceable and invalid provision modified to reflect intent.");
  p("10.3 Amendments: No amendment valid unless in writing and signed by both Parties.");
  p(`10.4 Governing Law: Governed by laws of State of ${values.governingState || "__________"}.`);
  p("10.5 Notices: All notices in writing and delivered in person, certified mail, or email with confirmation.");
  p("10.6 Waiver: Failure to enforce any provision is not waiver of subsequent breach/default.");
  p("10.7 Assignment: Neither Party may assign rights/obligations without prior written consent of other Party.", false, 3);

  p("11. SIGNATURES", true);
  p("IN WITNESS WHEREOF, Parties executed this Agreement as of Effective Date first written above.");
  p("CLIENT:", true, 1);
  p("Signature: ___________________________");
  uf("Name", values.clientSignName, 22);
  uf("Date", values.clientSignDate, 22, 2.2);
  p("PHOTOGRAPHER:", true, 1);
  p("Signature: ___________________________");
  uf("Name", values.photographerSignName, 22);
  uf("Date", values.photographerSignDate, 22);

  doc.save("event_photography_agreement.pdf");
};

export default function EventPhotographyAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Event Photography Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="eventphotographyagreement"
    />
  );
}
