import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Services",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: false },
      { name: "providerName", label: "Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: false },
      { name: "serviceDescription", label: "Detailed services", type: "textarea", required: false },
      { name: "totalFee", label: "Total fee", type: "text", required: false },
      { name: "depositAmount", label: "Deposit amount", type: "text", required: false },
      { name: "depositDate", label: "Deposit due date", type: "date", required: false },
    ],
  },
  {
    label: "Term and Legal Terms",
    fields: [
      { name: "terminationDate", label: "Termination date", type: "date", required: false },
      { name: "noticeDays", label: "Early termination notice days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "jurisdiction", label: "Governing law jurisdiction", type: "text", required: true },
      { name: "recipientSignerDate", label: "Recipient sign date", type: "date", required: false },
      { name: "providerSignerDate", label: "Provider sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (v?: string, min = 14) => (v || "").trim() || " ".repeat(min);
  const p = (t: string, b = false, g = 1.8) => { const lines = doc.splitTextToSize(t, tw); if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; } doc.setFont("helvetica", b ? "bold" : "normal"); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, v?: string, min = 20) => { const s = (v || "").trim(), lt = `${l}: `; if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; } doc.text(lt, m, y); const x = m + doc.getTextWidth(lt); if (s) { doc.text(s, x, y); doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(s)), y + 1.1); } else { doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1); } y += lh + 1.8; };
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); const title = "FEE AGREEMENT"; doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1); y += 9; doc.setFontSize(10.5);

  p(`This Fee Agreement is made as of ${u(values.effectiveDate, 12)} by and between ${u(values.recipientName, 12)} at ${u(values.recipientAddress, 12)} ("Recipient") and ${u(values.providerName, 12)} at ${u(values.providerAddress, 12)} ("Provider").`, false, 3);
  p("I. Description of Services", true);
  p(`Provider shall render the following services from Effective Date: ${u(values.serviceDescription, 18)}. Provider shall perform in a professional, diligent, and workmanlike manner under accepted industry standards.`);
  p("II. Financial Terms", true);
  p(`Compensation: USD $${u(values.totalFee, 8)} lump sum on completion unless agreed otherwise in writing.`);
  p(`Deposit: USD $${u(values.depositAmount, 8)} due on/before ${u(values.depositDate, 12)}; credited to final amount; non-refundable except Provider cancellation or inability to perform.`);
  p("Attorneys' Fees: Prevailing party in legal action/arbitration to enforce/interpret this Agreement recovers reasonable attorneys' fees, court costs, and expenses.");
  p("III. Term, Termination, and Default", true);
  p(`Term runs from Effective Date to ${u(values.terminationDate, 12)} unless earlier termination as provided.`);
  p(`Either party may terminate early with ${u(values.noticeDays, 4)} days written notice; Provider receives pro-rated payment through termination date.`);
  p("Material default includes non-payment, insolvency/bankruptcy, seizure/levy/attachment, or failure to perform per Agreement.");
  p(`Non-defaulting party gives notice; defaulting party has ${u(values.defaultCureDays, 4)} days to cure. Failure to cure results in automatic termination unless waived in writing.`);
  p("Force Majeure excuses delay/failure beyond reasonable control, with mitigation and resume obligations.");
  p("IV. Service and Legal Provisions", true);
  p("Provider is an independent contractor. Provider warrants timely competent performance and compliance with laws. Work product vests exclusively in Recipient. Provider indemnifies Recipient for negligent acts/omissions/misconduct. Confidentiality survives termination.");
  p("V. Miscellaneous Provisions", true);
  p(`Governing Law: ${u(values.jurisdiction, 12)}. Disputes unresolved amicably proceed to binding arbitration under AAA rules.`);
  p("No assignment without written consent. Change orders must be written and signed. Written waivers only. Amendments must be written and signed. Entire agreement supersedes prior oral/written communications. Severability applies. Notices by personal delivery or certified mail.");
  p("VI. Signatures", true);
  p("For the Recipient:");
  uf("Name", values.recipientName, 22);
  p("Signature: _______________________"); uf("Date", values.recipientSignerDate, 14);
  p("For the Provider:");
  uf("Name", values.providerName, 22);
  p("Signature: _______________________"); uf("Date", values.providerSignerDate, 14);
  doc.save("fee_agreement.pdf");
};

export default function FeeAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Fee Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="feeagreement"
    />
  );
}
