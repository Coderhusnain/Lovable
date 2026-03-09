import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Scope",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor address", type: "text", required: true },
      { name: "commenceDate", label: "Service commencement date", type: "date", required: false },
      { name: "serviceDescription", label: "Painting services description", type: "textarea", required: true },
      { name: "siteAddress", label: "Site address", type: "text", required: true },
    ],
  },
  {
    label: "Financial and Legal Terms",
    fields: [
      { name: "totalAmount", label: "Total compensation", type: "text", required: false },
      { name: "paymentAddress", label: "Payment address", type: "text", required: false },
      { name: "discountPercent", label: "Prompt payment discount %", type: "text", required: false },
      { name: "discountDays", label: "Prompt payment days", type: "text", required: false },
      { name: "latePercent", label: "Overdue annual interest %", type: "text", required: false },
      { name: "repairDays", label: "Defect repair within days", type: "text", required: false },
      { name: "cureDays", label: "Default cure days", type: "text", required: false },
      { name: "termEnd", label: "Termination date", type: "date", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSigner", label: "Client signer name", type: "text", required: false },
      { name: "clientSignDate", label: "Client sign date", type: "date", required: false },
      { name: "contractorSigner", label: "Contractor signer name", type: "text", required: false },
      { name: "contractorSignDate", label: "Contractor sign date", type: "date", required: false },
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
  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);
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
  const title = "PAINTING SERVICES CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Painting Services Contract ("Contract") is made and entered into on ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.clientName, 18)}, residing at ${u(values.clientAddress, 18)} (the "Client"), and ${u(values.contractorName, 18)}, having its principal place of business at ${u(values.contractorAddress, 18)} (the "Contractor").`);
  p("1. Description of Services", true);
  p(`Commencing on ${u(values.commenceDate, 12)}, the Contractor shall provide the following painting services: ${u(values.serviceDescription, 24)}. Services shall be performed at ${u(values.siteAddress, 20)}.`);
  p("2. Payment Terms", true);
  p(`Total compensation is ${u(values.totalAmount, 10)}, payable upon completion. Payment shall be made to ${u(values.paymentAddress, 16)}. Prompt payment discount: ${u(values.discountPercent, 6)}% if paid within ${u(values.discountDays, 4)} days. Overdue amounts accrue interest at ${u(values.latePercent, 6)}% per annum or legal maximum. Client bears collection costs and reasonable attorneys' fees.`);
  p("3. Confidentiality", true);
  p("Contractor and personnel shall not disclose/use Client proprietary or confidential information except for performance. Obligation survives termination. Upon termination, Contractor returns all Client records/materials.");
  p("4. Changes to Scope of Work", true);
  p("Any scope changes require a written Change Order signed by both Parties. Client bears additional costs; where exact cost is unknown at execution, Contractor provides good-faith estimate and Client pays actual cost.");
  p("5. Indemnification", true);
  p("Contractor shall indemnify, defend, and hold Client harmless from claims/losses/liabilities/damages/expenses (including reasonable attorneys' fees) arising from acts or omissions of Contractor and its representatives.");
  p("6. Warranty", true);
  p(`Contractor warrants workmanlike service, industry-standard quality, and new/good-quality materials unless otherwise specified. Contractor shall repair peeling/deteriorating/fading paint caused by workmanship within one year if reported in writing, with repairs undertaken within ${u(values.repairDays, 6)} days, weather permitting.`);
  p("7. Default", true);
  p("Material breach includes non-payment, insolvency/bankruptcy, attachment/seizure of property, or failure to perform in required manner/time.");
  p("8. Remedies", true);
  p(`Upon breach, non-defaulting Party may terminate by written notice. Defaulting Party has ${u(values.cureDays, 6)} days from receipt to cure, failing which termination is automatic unless waived in writing.`);
  p("9. Scope of Work Standards", true);
  p("Contractor shall ensure surfaces are clean/dry/properly prepared; painted surfaces must be uniform and free from drips/sags/roughness (except natural texture). Contractor is responsible for timely paint delivery and cleanup of splatters/residue.");
  p("10. Term", true);
  p(`This Contract automatically terminates on ${u(values.termEnd, 12)}, unless earlier terminated under this Contract.`);
  p("11. Permits | 12. Insurance | 13. Force Majeure | 14. Arbitration", true);
  p(`Contractor obtains required permits/approvals. Contractor maintains General Liability, Workers' Compensation, and Builder's Risk insurance. Force majeure suspends obligations to extent necessary with prompt notice. Disputes are resolved by binding AAA arbitration; arbitrator may not modify Contract or award punitive damages.`);
  p("15. Entire Agreement | 16. Severability | 17. Amendment | 18. Governing Law | 19. Notices", true);
  p(`Entire agreement applies; invalid provisions are limited/severed; amendments must be in writing signed by both Parties; governing law is State of ${u(values.governingState, 14)}; notices by personal delivery or certified mail.`, false, 3);
  p("20. Execution", true);
  p("CLIENT:");
  p("By: ___________________________");
  uf("Name", values.clientSigner, 24);
  uf("Date", values.clientSignDate, 24, 2.6);
  p("CONTRACTOR:");
  p("By: ___________________________");
  uf("Name", values.contractorSigner, 24);
  uf("Date", values.contractorSignDate, 24);

  doc.save("painting_services_contract.pdf");
};

export default function PaintingServicesContract() {
  return (
    <FormWizard
      steps={steps}
      title="Painting Services Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="paintingservicescontract"
    />
  );
}
