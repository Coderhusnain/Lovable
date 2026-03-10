import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Event",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient (Client) name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "providerName", label: "Provider (Bartender) name", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
    ],
  },
  {
    label: "Payment and Time",
    fields: [
      { name: "serviceFee", label: "Total service fee", type: "text", required: true },
      { name: "retainerFee", label: "Non-refundable retainer", type: "text", required: true },
      { name: "extraHourlyRate", label: "Additional hourly rate", type: "text", required: true },
      { name: "lateInterestPercent", label: "Late payment annual interest %", type: "text", required: true },
      { name: "cancelMoreDays", label: "Refund if cancelled more than __ days", type: "text", required: true },
      { name: "cancelLessDays", label: "Full charge if cancelled less than __ days", type: "text", required: true },
      { name: "cureDays", label: "Default cure period days", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "arbitrationLocation", label: "Arbitration location", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignName", label: "Recipient signatory name", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: true },
      { name: "providerSignName", label: "Provider signatory name", type: "text", required: true },
      { name: "providerSignDate", label: "Provider sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "BARTENDING SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.1);

  p(`This Bartending Services Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between:`);
  uf("Recipient (Client) Name", v.recipientName);
  uf("Recipient Address", v.recipientAddress);
  uf("Provider (Bartender) Name", v.providerName);
  uf("Provider Address", v.providerAddress);
  p('(Collectively referred to as the "Parties.")');

  p("1. PURPOSE OF AGREEMENT", true);
  p("Recipient retains Provider for professional bartending services and Provider agrees to perform such services under this Agreement.");
  p("2. DESCRIPTION OF SERVICES", true);
  p("Scope includes beverage preparation/service, setup/breakdown, garnish prep, cleanliness/safety, monitoring consumption, and other agreed bartending services.");
  p("Exclusions unless agreed in writing: alcohol/supply purchasing, unspecified equipment, guest behavior management beyond service, and permits/licenses.");
  p("3. RIGHTS AND RESPONSIBILITIES OF THE PROVIDER", true);
  p("Provider warrants knowledge/compliance with alcohol laws, may request valid ID, may refuse service to intoxicated/risk guests, and provides standard bartending tools unless otherwise agreed.");
  p("4. LOCATION AND PERMITS", true);
  p("Recipient is solely responsible for event location, permit/license compliance, and venue permissions. Provider not liable for Recipient non-compliance.");

  p("5. PAYMENT TERMS", true);
  p(`5.1 Service Fee: $${u(v.serviceFee)}.`);
  p(`5.2 Retainer (non-refundable): $${u(v.retainerFee)} due at execution; remaining balance due on/before event date.`);
  p(`5.3 Additional hours billed at $${u(v.extraHourlyRate)} per hour, subject to availability.`);
  p(`5.4 Late payments accrue ${u(v.lateInterestPercent, 2)}% per annum or maximum lawful rate.`);
  p("5.5 Recipient is responsible for collection costs including reasonable attorney fees, court costs, and administrative expenses.");

  p("6-19. TERM, CANCELLATION, LEGAL", true);
  p(`Term runs from Effective Date until ${u(v.terminationDate)} unless earlier terminated.`);
  p(`Cancellation more than ${u(v.cancelMoreDays, 2)} days: all paid amounts refunded except retainer.`);
  p(`Cancellation less than ${u(v.cancelLessDays, 2)} days: full contract amount due.`);
  p("Provider cancellation not caused by Recipient: full refund of monies paid.");
  p("Confidentiality, indemnification, warranty, default, remedies, force majeure, arbitration, governing law, entire agreement, and amendments apply as drafted.");
  uf("Default Cure Days", v.cureDays);
  uf("Governing Law State", v.governingState);
  uf("Arbitration Location", v.arbitrationLocation);

  p("19. SIGNATURES", true);
  uf("Recipient Name", v.recipientSignName);
  uf("Recipient Date", v.recipientSignDate);
  uf("Provider Name", v.providerSignName);
  uf("Provider Date", v.providerSignDate);

  doc.save("bartending_services_agreement.pdf");
};

export default function BartendingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Bartending Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="bartendingagreement"
    />
  );
}
