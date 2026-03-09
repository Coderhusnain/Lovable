import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: false },
      { name: "providerName", label: "Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: false },
      { name: "uptimePercent", label: "Uptime commitment %", type: "text", required: false },
      { name: "hoursFrom", label: "Operation hours from", type: "text", required: false },
      { name: "hoursTo", label: "Operation hours to", type: "text", required: false },
      { name: "termEnd", label: "Termination date", type: "date", required: false },
      { name: "noticeDays", label: "Early termination notice days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "liquidatedAmount", label: "Liquidated damages amount", type: "text", required: false },
      { name: "requiredUptime", label: "Required uptime % for LD", type: "text", required: false },
      { name: "paymentAmount", label: "Payment amount", type: "text", required: false },
      { name: "discountPercent", label: "Discount %", type: "text", required: false },
      { name: "discountDays", label: "Discount days", type: "text", required: false },
      { name: "lateInterest", label: "Late interest %", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: false },
      { name: "providerSignDate", label: "Provider sign date", type: "date", required: false },
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
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); const title = "IT SERVICES AGREEMENT"; doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1); y += 9; doc.setFontSize(10.5);

  p(`This IT Services Agreement is effective ${u(values.effectiveDate, 12)} by and between ${u(values.recipientName, 12)} of ${u(values.recipientAddress, 12)} ("Recipient") and ${u(values.providerName, 12)} of ${u(values.providerAddress, 12)} ("Provider").`, false, 3);
  p("1. Definitions", true);
  p("Defines Computer System, Services, Operation, Maintenance, Management, and Uptime as used in this Agreement including Exhibit One hardware/software and related equipment.");
  p("2. Description of Services", true);
  p(`Provider shall perform operation, maintenance, and management services with qualified personnel acceptable to Recipient. Uptime commitment is ${u(values.uptimePercent, 4)}% during ${u(values.hoursFrom, 4)} to ${u(values.hoursTo, 4)} Monday-Friday excluding legal holidays. Preventive maintenance should occur outside scheduled operating hours; otherwise backup capability is provided at no additional cost.`);
  p("3. Warranty", true);
  p("Provider warrants timely, workmanlike services and system performance conforming to agreed specifications. Except expressly provided, all other warranties are disclaimed, including merchantability and fitness for purpose.");
  p("4. Default", true);
  p("Material default includes non-payment, insolvency/bankruptcy, levy/seizure/assignment of assets, or failure to perform services as required.");
  p("5. Remedies", true);
  p(`Non-defaulting party may issue written notice; defaulting party has ${u(values.defaultCureDays, 4)} days to cure; failure results in automatic termination unless waived. Upon termination Provider may accelerate amounts due, reclaim unpaid equipment/materials, cease services, and enforce applicable liquidated damages.`);
  p("6. Liquidated Damages", true);
  p(`If required uptime falls below ${u(values.requiredUptime, 4)}%, Provider pays liquidated damages of ${u(values.liquidatedAmount, 8)} per percentage point below required uptime; calculated weekly and credited monthly.`);
  p("7. Alternative Dispute Resolution", true); p("Parties negotiate in good faith, then mediate under applicable rules before litigation.");
  p("8. Relationship of the Parties", true); p("Provider is an independent contractor responsible for payroll taxes, benefits, workers' compensation, and liability coverage. No partnership/joint venture/agency/employment is created.");
  p("9. Work Product Ownership", true); p("All work product created in connection with services is exclusive property of Recipient; Provider executes documents to perfect ownership.");
  p("10. Confidentiality", true); p("Provider and agents shall not disclose/use Recipient confidential information except as required for services; obligations survive termination and materials are returned.");
  p("11. Indemnification", true); p("Provider indemnifies and holds harmless Recipient for claims/losses/damages/costs from Provider acts/omissions including employees/agents.");
  p("12. Payment", true);
  p(`Payment to Provider in amount $${u(values.paymentAmount, 8)} upon completion. Discount ${u(values.discountPercent, 4)}% if paid within ${u(values.discountDays, 4)} days. Late amounts accrue ${u(values.lateInterest, 4)}% annual interest or legal maximum. Collection costs and attorneys' fees apply.`);
  p("13. Term", true); p(`Agreement continues until ${u(values.termEnd, 12)} unless terminated earlier or modified by written agreement.`);
  p("14. Termination", true); p(`Either party may terminate with ${u(values.noticeDays, 4)} days' notice; Provider may accelerate amounts due, repossess unpaid materials, and cease services without liability.`);
  p("15-23. Additional Provisions", true);
  p(`Prevailing party recovers attorneys' fees. Entire agreement supersedes prior agreements. Severability, amendment, waiver, assignment, notices, and governing law (${u(values.governingState, 12)}) apply as stated. Exclusive jurisdiction in designated courts.`);
  p("Signatories", true);
  p("THE RECIPIENT"); p("Signature: ______________________________"); uf("Date", values.recipientSignDate, 14);
  p("THE PROVIDER"); p("Signature: ______________________________"); uf("Date", values.providerSignDate, 14);
  doc.save("it_services_agreement.pdf");
};

export default function ITServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="IT Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="itservicesagreement"
    />
  );
}
