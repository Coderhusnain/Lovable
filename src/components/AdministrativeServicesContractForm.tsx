import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Term",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: false },
      { name: "providerName", label: "Service provider", type: "text", required: true },
      { name: "providerAddress", label: "Service provider address", type: "text", required: false },
      { name: "serviceStart", label: "Service start date", type: "date", required: false },
      { name: "terminationDate", label: "Termination date", type: "date", required: false },
      { name: "noticeDays", label: "Notice days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Fees and Signatures",
    fields: [
      { name: "standardRate", label: "Standard hourly rate", type: "text", required: false },
      { name: "additionalRate", label: "Additional services hourly rate", type: "text", required: false },
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
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); const title = "ADMINISTRATIVE SERVICES CONTRACT"; doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1); y += 9; doc.setFontSize(10.5);

  p(`This Administrative Services Contract is effective ${u(values.effectiveDate, 12)} by and between ${u(values.recipientName, 12)} of ${u(values.recipientAddress, 12)} ("Recipient") and ${u(values.providerName, 12)} of ${u(values.providerAddress, 12)} ("Service Provider").`, false, 3);
  p("1. DESCRIPTION OF SERVICES", true);
  p(`Beginning on ${u(values.serviceStart, 12)}, Service Provider shall provide administrative support and related services professionally, promptly, and in accordance with industry standards.`);
  p("2. MUTUAL OBLIGATIONS", true);
  p("Parties shall designate coordinators, hold periodic meetings, cooperate with reasonable requests, execute needed documents/actions, and use best efforts to resolve issues constructively and timely.");
  p("3. PAYMENT TERMS", true);
  p(`Standard fee: $${u(values.standardRate, 6)} per hour. Additional services not listed: $${u(values.additionalRate, 6)} per hour. Invoices payable per agreed billing schedule.`);
  p("4. TERM OF CONTRACT", true);
  p(`Contract commences on Effective Date and remains until ${u(values.terminationDate, 12)}, unless earlier terminated. Termination date may change only by mutual written consent.`);
  p("5. TERMINATION", true);
  p(`Either Party may terminate with ${u(values.noticeDays, 4)} days notice. Material default includes non-payment, insolvency/bankruptcy, seizure/assignment, or failure to provide services in required time/manner. Defaulting party has ${u(values.defaultCureDays, 4)} days to cure after written notice.`);
  p("6. RELATIONSHIP OF PARTIES", true);
  p("Provider is independent contractor; no employee benefits by Recipient; Provider solely responsible for taxes, insurance, and employment compliance. No partnership/joint venture/employment relationship is created.");
  p("7. WORK PRODUCT OWNERSHIP", true);
  p("All work product created under this Contract is exclusive property of Recipient; Provider executes documents needed to confirm ownership.");
  p("8. CONFIDENTIALITY", true);
  p("Provider shall not use/disclose recipient confidential information and shall return all materials on termination; obligations survive termination.");
  p("9. INJURIES AND INSURANCE", true);
  p("Provider obtains appropriate insurance and waives recovery against Recipient for injuries arising from Provider's negligence.");
  p("10-15. INDEMNIFICATION, REMEDIES, FORCE MAJEURE, ARBITRATION, FEES, LIMITATION", true);
  p("Provider indemnifies Recipient for acts/omissions. Default remedies include termination after notice/cure period. Force majeure events excuse performance delays. Disputes are resolved by AAA arbitration. Prevailing party recovers attorneys' fees. No indirect/incidental/consequential/special/exemplary damages.");
  p("16-23. GENERAL CLAUSES", true);
  p(`Entire contract, severability, notice, waiver, assignment, amendment, and governing law (${u(values.governingLaw, 12)}) apply as stated.`);
  p("SIGNATORIES", true);
  p("Recipient: __________________________"); uf("Date", values.recipientSignDate, 14);
  p("Service Provider: __________________________"); uf("Date", values.providerSignDate, 14);
  doc.save("administrative_services_contract.pdf");
};

export default function AdministrativeServicesContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Administrative Services Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="administrativeservicescontract"
    />
  );
}
