import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Term",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerStatus", label: "Buyer legal status", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
      { name: "brokerName", label: "Broker name", type: "text", required: true },
      { name: "brokerStatus", label: "Broker legal status", type: "text", required: true },
      { name: "brokerAddress", label: "Broker address", type: "text", required: true },
      { name: "industry", label: "Industry sector", type: "text", required: true },
      { name: "termDays", label: "Term days", type: "text", required: true },
      { name: "noticeDays", label: "Termination notice days", type: "text", required: true },
    ],
  },
  {
    label: "Fees and Signatures",
    fields: [
      { name: "brokerFee", label: "Broker fee per seller", type: "text", required: true },
      { name: "invoiceDays", label: "Invoice payable days", type: "text", required: true, placeholder: "30" },
      { name: "buyerSignName", label: "Buyer signatory name", type: "text", required: true },
      { name: "buyerSignDesignation", label: "Buyer designation", type: "text", required: false },
      { name: "buyerSignDate", label: "Buyer sign date", type: "date", required: true },
      { name: "brokerSignName", label: "Broker signatory name", type: "text", required: true },
      { name: "brokerSignDesignation", label: "Broker designation", type: "text", required: false },
      { name: "brokerSignDate", label: "Broker sign date", type: "date", required: true },
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
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
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
  const title = "BROKER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Broker Agreement is made on ${u(values.effectiveDate, 12)} by and between ${u(values.buyerName, 18)}, a ${u(values.buyerStatus, 16)} at ${u(values.buyerAddress, 18)} ("Buyer"), and ${u(values.brokerName, 18)}, a ${u(values.brokerStatus, 16)} at ${u(values.brokerAddress, 18)} ("Broker").`);
  p('Buyer and Broker are collectively "Parties" and individually a "Party".', false, 3);
  p("1. PURPOSE AND SCOPE", true);
  p(`Buyer seeks goods within ${u(values.industry, 14)} and engages Broker as intermediary to identify/introdce prospective sellers. Broker role is introductions only unless expressly authorized in writing.`);
  p("Broker shall comply with all applicable laws/licensing requirements. Buyer grants Broker exclusivity for sellers not previously known/documented by Buyer.", false, 3);
  p("2. TERM AND TERMINATION", true);
  p(`Agreement term is ${u(values.termDays, 8)} days from Effective Date.`);
  p(`Either Party may terminate with ${u(values.noticeDays, 8)} days prior written notice.`);
  p("On early termination, Broker remains entitled to pro-rated compensation and commission for resulting transactions from introductions already made.", false, 3);
  p("3. FEES AND PAYMENT TERMS", true);
  p(`Buyer shall pay Broker $${u(values.brokerFee, 12)} per seller successfully introduced/accepted, whether final transaction is direct or indirect.`);
  p(`Broker invoices are payable within ${u(values.invoiceDays, 8)} days.`);
  p("3.3 Non-Circumvention: Buyer shall not directly or indirectly negotiate, discuss, contract, or transact with any seller introduced by Broker to evade/reduce/avoid Broker remuneration. Any such act is a material breach, and Broker is entitled to recover full commission as if transaction concluded through Broker, plus all legal remedies, damages, and costs.");
  p("3.4 Survival of Commission Rights: Broker entitlement to commission for any seller introduced during the Term survives termination/expiry and remains enforceable where a transaction is concluded as a direct or indirect consequence of Broker introduction.", false, 3);
  p("SIGNATORIES AND EXECUTION", true);
  p("IN WITNESS WHEREOF, Parties have executed this Broker Agreement on the date first above written.");
  p("For and on behalf of the BUYER");
  p("Signature: ______________________________");
  uf("Name", values.buyerSignName, 24);
  uf("Designation", values.buyerSignDesignation, 24);
  p("CNIC / Registration No: ____________________");
  uf("Date", values.buyerSignDate, 24, 2);
  p("Witness 1:");
  p("Signature: ______________________________");
  p("Name: ______________________________");
  p("CNIC: ______________________________");
  p("Address: ______________________________", false, 2);
  p("For and on behalf of the BROKER");
  p("Signature: ______________________________");
  uf("Name", values.brokerSignName, 24);
  uf("Designation", values.brokerSignDesignation, 24);
  p("CNIC / Registration No: ____________________");
  uf("Date", values.brokerSignDate, 24);
  p("Witness 2:");
  p("Signature: ______________________________");
  p("Name: ______________________________");
  p("CNIC: ______________________________");
  p("Address: ______________________________");

  doc.save("broker_agreement.pdf");
};

export default function BrokerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Broker Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="brokeragreement"
    />
  );
}
