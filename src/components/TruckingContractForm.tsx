import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Term",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient party name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "carrierName", label: "Carrier party name", type: "text", required: true },
      { name: "carrierAddress", label: "Carrier address", type: "text", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Early termination notice days", type: "text", required: true },
      { name: "claimDaysDelivered", label: "Cargo claim days after delivery", type: "text", required: true },
      { name: "claimDaysNoDelivery", label: "Cargo claim days if no delivery", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "ratesReference", label: "Rates/tariffs reference", type: "text", required: true },
      { name: "invoicePaymentDays", label: "Invoice payment period (days)", type: "text", required: true },
      { name: "arbitrationSeat", label: "Arbitration seat city/state", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "arbitrationAct", label: "Arbitration act name", type: "text", required: false, placeholder: "Federal Arbitration Act" },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignName", label: "Recipient signatory name", type: "text", required: true },
      { name: "recipientDesignation", label: "Recipient designation", type: "text", required: false },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: true },
      { name: "carrierSignName", label: "Carrier signatory name", type: "text", required: true },
      { name: "carrierDesignation", label: "Carrier designation", type: "text", required: false },
      { name: "carrierSignDate", label: "Carrier sign date", type: "date", required: true },
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
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

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
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "TRUCKING CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Trucking Contract ("Contract") is made and entered into as of ${u(values.effectiveDate, 18)} (the "Effective Date"), by and between:`);
  p(`${u(values.recipientName, 18)}, having its principal place of business at ${u(values.recipientAddress, 18)} (the "Recipient"),`);
  p(`AND ${u(values.carrierName, 18)}, having its principal place of business at ${u(values.carrierAddress, 18)} (the "Carrier").`);
  p('The Recipient and the Carrier are collectively referred to as the "Parties" and individually as a "Party."', false, 3);

  p("1. DESCRIPTION OF SERVICES", true);
  p("Carrier shall provide professional interstate/intrastate transportation and logistics services, including collection, carriage, handling, and delivery of goods/materials/merchandise as mutually agreed.", false, 3);

  p("2. RATES, CHARGES, AND PAYMENT TERMS", true);
  p(`2.1 Rates/tariffs/charges are as specified in ${u(values.ratesReference, 18)}.`);
  p("2.2 Recipient shall compensate Carrier in lump sum upon successful completion of each assignment, unless otherwise agreed in writing.");
  p(`2.3 Payments shall be made in lawful U.S. currency within ${u(values.invoicePaymentDays, 8)} days of invoice, free of deduction/set-off/counterclaim.`, false, 3);

  p("3. TERM AND TERMINATION", true);
  p(`3.1 Contract remains in force until ${u(values.terminationDate, 16)}, unless earlier terminated.`);
  p(`3.2 Either Party may terminate with at least ${u(values.terminationNoticeDays, 8)} days prior written notice.`);
  p("3.3 In early termination, Carrier is entitled to pro-rata payment for Services rendered to termination date.", false, 3);

  p("4. SHIPMENTS GOVERNED BY CONTRACT", true);
  p("All shipments tendered after Effective Date are deemed under this Contract and applicable motor carrier laws. No inconsistent oral/collateral arrangements are binding.", false, 3);
  p("5. FREIGHT LOSS OR DAMAGE", true);
  p(`5.1 Cargo loss/damage claims must be submitted in writing within ${u(values.claimDaysDelivered, 8)} days after delivery, or if no delivery, within ${u(values.claimDaysNoDelivery, 8)} days from event date.`);
  p("5.2 Carrier liability is limited to loss/damage from negligent performance and timely claim.");
  p("5.3 Carrier is not liable for consequential/special/economic losses beyond actual value of goods lost/damaged.", false, 3);
  p("6. RELATIONSHIP OF THE PARTIES", true);
  p("Carrier is an independent contractor and solely responsible for vehicles, drivers, personnel, and operations.", false, 3);
  p("7. CONFIDENTIALITY", true);
  p("Carrier shall not disclose/use Recipient confidential/proprietary/trade information without prior written consent, during or after term.", false, 3);
  p("8. INDEMNIFICATION", true);
  p("Carrier indemnifies, defends, and holds harmless Recipient from claims/losses/expenses (including attorney fees) arising from Carrier negligence, acts/omissions, breaches, or legal violations.", false, 3);
  p("9. DEFAULT", true);
  p("Material default includes non-payment, insolvency/bankruptcy/liquidation, levy/assignment for creditors, or service performance failure.", false, 3);

  p("10. REMEDIES AND ARBITRATION", true);
  p("10.1 Non-defaulting Party may terminate for material default by written notice and pursue legal/equitable remedies.");
  p("10.2 Any dispute related to formation/validity/interpretation/performance/breach/termination shall be finally resolved by binding AAA arbitration.");
  p(`10.3 Arbitration governed by ${u(values.arbitrationAct, 20)}; seat/venue ${u(values.arbitrationSeat, 20)}; language English.`);
  p("10.4 One neutral arbitrator unless AAA appointment/panel process applies. Arbitrator may grant damages/equitable relief and allocate costs/fees.");
  p("10.5 Reasonable opportunity to present evidence/witnesses; discovery limited to fair efficient resolution.");
  p("10.6 Interim injunctive relief may be sought in court pending arbitration.");
  p("10.7 Award is final, binding, and enforceable in competent federal/state court; appellate review waived except as allowed by FAA.");
  p("10.8 Arbitration proceedings and records are confidential except as required to enforce/challenge award.");
  p("10.9 Unless otherwise ordered, each Party bears own attorneys' fees/costs; admin/arbitrator fees shared equally.");
  p("10.10 Arbitration clause survives termination/expiration.", false, 3);

  p("11. FORCE MAJEURE", true);
  p("No breach for failure caused by force majeure beyond reasonable control; affected Party shall provide written notice of occurrence and expected duration.", false, 3);
  p("12. MISCELLANEOUS PROVISIONS", true);
  p("Prevailing party may recover attorneys' fees/costs; amendments must be written/signed; entire agreement; severability applies.");
  p(`Governing Law: laws of the State of ${u(values.governingState, 16)}, without conflict-of-law principles.`, false, 3);

  p("IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the day and year first written above.", true, 2);
  p("For and on behalf of the Recipient");
  p("Signature: ___________________________");
  uf("Name", values.recipientSignName, 24);
  uf("Designation", values.recipientDesignation, 20);
  uf("Date", values.recipientSignDate, 24, 2);
  p("For and on behalf of the Carrier");
  p("Signature: ___________________________");
  uf("Name", values.carrierSignName, 24);
  uf("Designation", values.carrierDesignation, 20);
  uf("Date", values.carrierSignDate, 24);

  doc.save("trucking_contract.pdf");
};

export default function TruckingContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Trucking Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="truckingcontract"
    />
  );
}
