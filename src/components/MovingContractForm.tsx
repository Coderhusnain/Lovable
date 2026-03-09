import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Dates",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient legal name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "providerName", label: "Provider legal name", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: true },
      { name: "originAddress", label: "Origin address", type: "text", required: true },
      { name: "destinationAddress", label: "Destination address", type: "text", required: true },
      { name: "scheduledDate", label: "Scheduled move date", type: "date", required: true },
    ],
  },
  {
    label: "Payment and Term",
    fields: [
      { name: "totalAmount", label: "Total compensation (USD)", type: "text", required: true },
      { name: "depositAmount", label: "Deposit amount (USD)", type: "text", required: true },
      { name: "depositDueDate", label: "Deposit due date", type: "date", required: true },
      { name: "earlyPaymentDays", label: "Early payment days", type: "text", required: false },
      { name: "earlyPaymentPercent", label: "Early payment discount %", type: "text", required: false },
      { name: "latePercent", label: "Late payment annual %", type: "text", required: false },
      { name: "terminationDays", label: "Early termination notice days", type: "text", required: true },
      { name: "cureDays", label: "Default cure period days", type: "text", required: true },
    ],
  },
  {
    label: "Arbitration and Signatures",
    fields: [
      { name: "arbitrationCityState", label: "Arbitration seat city/state", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "recipientSignName", label: "Recipient signatory name", type: "text", required: true },
      { name: "recipientSignTitle", label: "Recipient signatory title", type: "text", required: false },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: true },
      { name: "providerSignName", label: "Provider signatory name", type: "text", required: true },
      { name: "providerSignTitle", label: "Provider signatory title", type: "text", required: false },
      { name: "providerSignDate", label: "Provider sign date", type: "date", required: true },
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
  const title = "MOVING CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Moving Contract ("Contract") is made and entered into as of ${values.effectiveDate || "the ___ day of _______, 20__"} (the "Effective Date"), by and between:`);
  p(`${values.recipientName || "[Recipient Name]"}, having its principal address at ${values.recipientAddress || "[Address]"} (the "Recipient"),`);
  p(`AND ${values.providerName || "[Provider Name]"}, having its principal address at ${values.providerAddress || "[Address]"} (the "Provider").`);
  p('The Recipient and the Provider are collectively referred to as the "Parties" and individually as a "Party."', false, 3);

  p("1. DESCRIPTION AND SCOPE OF SERVICES", true);
  p("1.1 Provider shall furnish professional moving, packing, transportation, and delivery services.");
  p("1.2 Services include inventory/pre-move inspection; wrapping/securing fragile items; balanced loading; loading/transport/unloading/placement at destination.");
  p(`1.3 Property shall be moved from ${values.originAddress || "[Origin Address]"} to ${values.destinationAddress || "[Destination Address]"} on ${values.scheduledDate || "[Scheduled Date]"}.`);
  p("1.4 Any modification to scope/timing shall be by written Change Order signed by both Parties.", false, 3);

  p("2. PAYMENT TERMS", true);
  p(`2.1 Recipient shall compensate Provider total USD $${values.totalAmount || "[Amount]"}.`);
  p(`2.2 A non-refundable deposit of USD $${values.depositAmount || "[Amount]"} is due by ${values.depositDueDate || "[Deposit Due Date]"}.`);
  p("2.3 Remaining balance is due upon successful completion of Services unless otherwise in writing.");
  p(`2.4 Early payment discount: ${values.earlyPaymentPercent || "[Percentage]"}% if paid within ${values.earlyPaymentDays || "[Number]"} days of invoicing.`);
  p(`2.5 Late payment interest: ${values.latePercent || "[Percentage]"}% per annum or maximum allowed by law.`, false, 3);

  p("3. TERM AND TERMINATION", true);
  p("3.1 Contract commences on Effective Date and remains until services completion unless terminated earlier.");
  p(`3.2 Either Party may terminate with at least ${values.terminationDays || "[Number]"} days' prior written notice.`);
  p("3.3 Upon early termination, Provider is entitled to pro-rata payment for services rendered.", false, 3);

  p("4. WARRANTIES AND REPRESENTATIONS", true);
  p("Provider warrants timely, professional, workmanlike services in compliance with applicable law, and shall maintain required licenses, permits, and insurance.", false, 3);
  p("5. INDEMNIFICATION", true);
  p("Provider shall indemnify, defend, and hold harmless Recipient from claims/losses arising out of negligent acts/omissions or breach of Contract/law by Provider.", false, 3);
  p("6. CONFIDENTIALITY", true);
  p("Provider and personnel shall not disclose or use Recipient confidential/proprietary information except as authorized; this obligation survives termination.", false, 3);
  p("7. DEFAULT AND REMEDIES", true);
  p(`Material defaults include non-payment, insolvency/bankruptcy, levy/seizure, or failure to perform. Defaulting Party has ${values.cureDays || "[Number]"} days to cure after written notice; otherwise non-defaulting Party may terminate and pursue legal/equitable remedies.`, false, 3);
  p("8. FORCE MAJEURE", true);
  p("Neither Party is liable for failure/delay caused by force majeure events. Affected Party shall promptly notify the other in writing of nature, duration, and impact.", false, 3);

  p("9. DISPUTE RESOLUTION AND ARBITRATION", true);
  p("9.1 Parties shall first attempt good-faith negotiations.");
  p("9.2 Unresolved disputes after 30 days shall be submitted to binding AAA arbitration under Commercial Arbitration Rules.");
  p(`9.3 Seat/venue is ${values.arbitrationCityState || "[City, State]"}, language English, before neutral arbitrator.`);
  p("9.4 Award is final and enforceable in any court of competent jurisdiction.");
  p("9.5 Each Party bears its own costs/fees unless arbitrator orders otherwise.", false, 3);

  p("10. MISCELLANEOUS", true);
  p("Change orders require writing and signatures; no assignment without consent; this is entire agreement; prevailing party recovers reasonable attorneys' fees; waiver is not continuing waiver.");
  p(`Governing Law: Laws of the State of ${values.governingState || "[Insert State]"}, without conflict-of-law principles.`, false, 3);

  p("IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the day and year first above written.", true, 2);
  p("For and on behalf of the Recipient");
  p("Signature: ___________________________");
  uf("Name", values.recipientSignName, 26);
  uf("Title", values.recipientSignTitle, 26);
  uf("Date", values.recipientSignDate, 26, 2);
  p("For and on behalf of the Provider");
  p("Signature: ___________________________");
  uf("Name", values.providerSignName, 26);
  uf("Title", values.providerSignTitle, 26);
  uf("Date", values.providerSignDate, 26);

  doc.save("moving_contract.pdf");
};

export default function MovingContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Moving Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="movingcontract"
    />
  );
}
