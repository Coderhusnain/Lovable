import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "commencementDate", label: "Commencement date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name/entity", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "providerName", label: "Provider name/entity", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "compensationPercent", label: "Provider compensation % of gross sales", type: "text", required: true, placeholder: "10" },
      { name: "terminationNoticeDays", label: "Early termination notice days", type: "text", required: true },
      { name: "causeCureDays", label: "Termination-for-cause cure days", type: "text", required: true },
      { name: "defaultCureDays", label: "Default cure period days", type: "text", required: true },
      { name: "liabilityCapAmount", label: "Liability cap amount (12-month reference)", type: "text", required: false },
      { name: "arbitrationCityState", label: "Arbitration city/state", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "enforcementCountyState", label: "Enforcement county/state", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
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
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
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
  const title = "FULFILLMENT SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `This Fulfillment Services Agreement ("Agreement") is made and entered into as of ${
      values.effectiveDate || "[Effective Date]"
    }, by and between ${values.recipientName || "[Recipient Name/Entity]"}, having its principal place of business at ${
      values.recipientAddress || "[Recipient Address]"
    } (the "Recipient"), and ${values.providerName || "[Provider Name/Entity]"}, having its principal place of business at ${
      values.providerAddress || "[Provider Address]"
    } (the "Provider").`
  );
  p('The Recipient and the Provider are each referred to herein as a "Party" and collectively as the "Parties."', false, 3);

  p("1. DESCRIPTION OF SERVICES", true);
  p(`1.1 Scope: Commencing on ${values.commencementDate || "[Commencement Date]"}, Provider shall perform product fulfillment, warehousing, and distribution obligations.`);
  p("1.2 Services include purchasing/re-labeling, packaging/repackaging, inventory/storage/shipment coordination, quality inspections, marketing/sales support/order processing/invoicing/collections and administrative functions necessary to fulfill orders.");
  p("1.3 Provider shall perform with professional skill, care, and diligence under applicable law.", false, 3);

  p("2. PAYMENT TERMS", true);
  p(`2.1 Compensation: Provider receives ${values.compensationPercent || "[__]"}% of gross sales revenue generated from Recipient products distributed by Provider under this Agreement.`);
  p("2.2 Provider may retain such compensation at receipt without deduction/offset for returns, chargebacks, or uncollected receivables unless otherwise in writing.");
  p("2.3 Each Party bears its own taxes; Recipient is responsible for sales/use taxes under this Agreement, excluding Provider income taxes.", false, 3);

  p("3. TERM AND TERMINATION", true);
  p("3.1 Agreement commences on Effective Date and continues until completion of Services unless earlier terminated.");
  p(`3.2 Either Party may terminate with or without cause upon at least ${values.terminationNoticeDays || "[_____]"} days' prior written notice.`);
  p(`3.3 Either Party may terminate immediately for uncured material breach after ${values.causeCureDays || "[_____]"} days from written breach notice.`);
  p("3.4 Upon termination, Provider shall promptly return all inventory, documentation, property, and deliver all outstanding work in progress.", false, 3);

  p("4. WORK PRODUCT OWNERSHIP", true);
  p("All work product and related intellectual property developed in connection with this Agreement vests exclusively in Recipient; Provider irrevocably assigns all right, title, and interest and executes documents to perfect ownership.", false, 3);
  p("5. CONFIDENTIALITY", true);
  p("Each Party shall keep Confidential Information strictly confidential, disclose only to need-to-know personnel under protective obligations, and use commercially reasonable safeguards. Exclusions and legal disclosure carve-outs apply. Survival applies.", false, 3);
  p("6. INDEMNIFICATION", true);
  p("Provider indemnifies Recipient for Provider negligence/willful misconduct, IP infringement by Provider products/processes, and Provider breach. Recipient indemnifies Provider for Recipient specs/marketing materials and Recipient breaches.", false, 3);
  p("7. LIMITATION OF LIABILITY", true);
  p("No Party is liable for indirect/incidental/consequential/punitive damages. Except indemnification/confidentiality/willful misconduct, aggregate liability is capped at compensation paid to Provider during the prior 12 months.");
  if (values.liabilityCapAmount) {
    p(`Reference liability cap amount provided: ${values.liabilityCapAmount}.`);
  }
  p("", false, 0.6);
  p("8. DEFAULT AND REMEDIES", true);
  p(`Event of Default occurs on uncured material non-performance after ${values.defaultCureDays || "[_____]"} days from written notice. Non-defaulting Party may terminate and pursue legal/equitable remedies.`, false, 3);
  p("9. FORCE MAJEURE", true);
  p("Neither Party is liable for delay/failure due to force majeure beyond reasonable control; affected Party must promptly notify and diligently resume performance.", false, 3);
  p("10. BINDING ARBITRATION", true);
  p(`Disputes shall be resolved exclusively by binding AAA arbitration under Commercial Arbitration Rules in ${values.arbitrationCityState || "[City, State]"} before a single neutral arbitrator. Award is final/binding and enforceable in competent court. Each Party bears its own costs/legal fees unless arbitrator awards otherwise.`, false, 3);
  p("11. GOVERNING LAW", true);
  p(`This Agreement is governed by the laws of ${values.governingState || "[________]"} without conflict-of-law principles. Parties consent to exclusive jurisdiction of courts in ${values.enforcementCountyState || "[County, State]"} for enforcement of arbitral award/provisional remedies.`, false, 3);
  p("12. NOTICES", true);
  p("Notices must be written and delivered personally, by certified mail, or by nationally recognized overnight courier. Receipt deemed on delivery or third business day after mailing.", false, 3);
  p("13. ENTIRE AGREEMENT AND AMENDMENT", true);
  p("This Agreement is the entire understanding and supersedes prior communications. Amendments/modifications/waivers must be in writing and signed by both Parties.", false, 3);
  p("14. SEVERABILITY AND WAIVER", true);
  p("Invalid/unenforceable provisions are severed while remaining provisions stay effective. Failure to enforce is not waiver.", false, 3);

  p("15. SIGNATURES", true);
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Fulfillment Services Agreement as of the date first above written.");
  p("RECIPIENT:");
  uf("Name", values.recipientSignName, 24);
  uf("Title", values.recipientSignTitle, 24);
  p("Signature: _______________________");
  uf("Date", values.recipientSignDate, 24, 2);
  p("PROVIDER:");
  uf("Name", values.providerSignName, 24);
  uf("Title", values.providerSignTitle, 24);
  p("Signature: _______________________");
  uf("Date", values.providerSignDate, 24);

  doc.save("fulfillment_services_agreement.pdf");
};

export default function FulfillmentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Fulfillment Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="fulfillmentservicesagreement"
    />
  );
}
