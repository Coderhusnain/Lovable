import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "contractDate", label: "Contract date", type: "date", required: true },
      { name: "accountantName", label: "Accountant name", type: "text", required: true },
      { name: "licensedState", label: "Licensed state", type: "text", required: false },
      { name: "accountantAddress", label: "Accountant principal business address", type: "text", required: false },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: false },
      { name: "effectiveDate", label: "Contract effective date", type: "date", required: false },
      { name: "services", label: "Specific accounting services", type: "textarea", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
      { name: "signatory1", label: "First signatory", type: "text", required: false },
      { name: "signatory2", label: "Second signatory", type: "text", required: false },
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
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); const title = "ACCOUNTING CONTRACT"; doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1); y += 9; doc.setFontSize(10.5);

  p(`This CONTRACT is made on ${u(values.contractDate, 12)} by and between ${u(values.accountantName, 12)} ("Accountant"), duly licensed in ${u(values.licensedState, 10)} as a certified public accountant with principal place of business at ${u(values.accountantAddress, 14)}, and ${u(values.clientName, 12)} ("Client"), of ${u(values.clientAddress, 12)}.`, false, 3);
  p("I. CONTRACT TERM", true);
  p(`This Contract is effective ${u(values.effectiveDate, 12)} and remains in effect until services are satisfactorily completed unless sooner terminated per this Contract.`);
  p("II. ACCOUNTING SERVICES", true);
  p(`Accountant shall perform the following specific accounting services and incidental tasks: ${u(values.services, 16)}.`);
  p("Services shall be performed under applicable professional standards (GAAP as applicable), with due professional care, within reasonable timelines, and based on information provided by Client unless otherwise stated in writing.");
  p("Additional services beyond listed scope require mutual written agreement and are subject to Section III fee structure.");
  p("III. FEES FOR SERVICES", true);
  p("Client shall compensate Accountant for all services rendered according to standard billing practices, reflecting time spent, complexity of work, and itemized reasonable additional costs (filing/courier/third-party costs).");
  p("Invoices are due within specified period; timely payment is required and failure may constitute breach with late charges/suspension as permitted by law.");
  p("IV. CLIENT'S COOPERATION", true);
  p("Accountant is authorized to communicate with Client custodian for account and relevant data. Client is solely responsible for custodian acts/omissions and must ensure timely, true, complete data delivery required for services.");
  p("V. MUTUAL REPRESENTATIONS", true);
  p("Client and Accountant each represent legal authority and compliance with applicable law, and that execution/performance do not conflict with obligations. Accountant further represents valid binding obligations and sufficient rights to provide services.");
  p("VI. CONFIDENTIALITY", true);
  p("All confidential information exchanged is held in trust for Client benefit and shall not be disclosed during or after term except as required for performance or law.");
  p("VII. TERMINATION", true);
  p("Either party may terminate with 30 days written notice; termination also for insolvency/non-payment/cessation/death; and for uncured breach after 30 days detailed written notice.");
  p("VIII. NOTICES", true); p("Notices by personal delivery or registered/certified mail with return receipt to party addresses, subject to written address change.");
  p("IX. MISCELLANEOUS", true);
  p("Includes independent legal advice acknowledgment, no third-party beneficiaries, counterpart execution, headings for convenience, non-exclusivity, further assurances, time of essence, and survival of obligations.");
  p("X-XV. LEGAL PROVISIONS", true);
  p(`Governing law: ${u(values.governingLaw, 12)}. Parties bound includes heirs/successors/assigns. Severability applies. Prior contracts superseded. Entire agreement controls. Prevailing party recovers reasonable attorneys' fees.`);
  p("XVI. SIGNATORIES", true);
  p(`This Contract shall be signed by ${u(values.signatory1, 10)} and by ${u(values.signatory2, 10)}.`);
  doc.save("accounting_contract.pdf");
};

export default function AccountingContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Accounting Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="accountingcontract"
    />
  );
}
