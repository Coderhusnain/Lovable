import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partners and Dates",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "partner1Name", label: "Partner 1", type: "text", required: true },
      { name: "partner1Address", label: "Partner 1 address", type: "text", required: false },
      { name: "partner1City", label: "Partner 1 city", type: "text", required: false },
      { name: "partner1State", label: "Partner 1 state", type: "text", required: false },
      { name: "partner1Zip", label: "Partner 1 ZIP", type: "text", required: false },
      { name: "partner2Name", label: "Partner 2", type: "text", required: true },
      { name: "partner2Address", label: "Partner 2 address", type: "text", required: false },
      { name: "partner2City", label: "Partner 2 city", type: "text", required: false },
      { name: "partner2State", label: "Partner 2 state", type: "text", required: false },
      { name: "partner2Zip", label: "Partner 2 ZIP", type: "text", required: false },
    ],
  },
  {
    label: "Partnership Details",
    fields: [
      { name: "partnershipName", label: "Partnership name", type: "text", required: true },
      { name: "principalAddress", label: "Principal business address", type: "text", required: false },
      { name: "businessActivity", label: "Business activity", type: "text", required: false },
      { name: "priorAgreementDate", label: "Prior partnership agreement date", type: "date", required: false },
      { name: "effectiveDate", label: "Effective dissolution date", type: "date", required: false },
      { name: "noticeCountiesState", label: "Counties/state for publication", type: "text", required: false },
      { name: "accountingFirm", label: "Accounting firm / partner", type: "text", required: false },
      { name: "distributionFormula", label: "Distribution formula", type: "textarea", required: false },
      { name: "liquidatingPartner", label: "Liquidating partner", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "partner1SignDate", label: "Partner 1 sign date", type: "date", required: false },
      { name: "partner2SignDate", label: "Partner 2 sign date", type: "date", required: false },
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
  const title = "PARTNERSHIP DISSOLUTION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Partnership Dissolution Agreement (the "Agreement") is made and entered into as of ${u(values.agreementDate, 12)}, by and between the following partners (collectively, the "Partners"):`);
  p(`- ${u(values.partner1Name, 14)}, residing at ${u(values.partner1Address, 14)}, City of ${u(values.partner1City, 10)}, State of ${u(values.partner1State, 8)}, ZIP Code ${u(values.partner1Zip, 6)}; and`);
  p(`- ${u(values.partner2Name, 14)}, residing at ${u(values.partner2Address, 14)}, City of ${u(values.partner2City, 10)}, State of ${u(values.partner2State, 8)}, ZIP Code ${u(values.partner2Zip, 6)}.`);
  p("1. INTRODUCTION", true);
  p(`1.1 Description of Partnership: Partners conducted business as ${u(values.partnershipName, 14)}, with principal business address at ${u(values.principalAddress, 14)}, engaged in ${u(values.businessActivity, 12)}.`);
  p(`1.2 Partnership Agreement: Partners entered into written partnership agreement dated ${u(values.priorAgreementDate, 12)} (attached as Exhibit A and incorporated herein).`);
  p("1.3 Intention to Dissolve: Partners desire to dissolve and liquidate the Partnership so all assets are sold and net proceeds after liabilities are distributed under this Agreement.");
  p("2. DISSOLUTION AND TERMINATION", true);
  p(`2.1 Effective Date of Dissolution: Partnership is dissolved at close of business on ${u(values.effectiveDate, 12)} (the "Effective Date").`);
  p("2.2 Termination of Business: Except actions required to wind up affairs, no Partner may transact business, incur obligations, or bind Partnership after Effective Date.");
  p("2.3 Statement of Dissolution: Partners shall file statement of dissolution with Division of Revenue in the Department of Treasury and record in county recording office in every state where Partnership regularly conducted business.");
  p(`2.4 Notice of Dissolution: Partners shall publish notice at least once in a newspaper of general circulation in all counties in ${u(values.noticeCountiesState, 10)} where Partnership regularly conducted business.`);
  p("3. LIQUIDATION OF ASSETS AND ACCOUNTS", true);
  p(`3.1 Accounting: Immediately after dissolution, accounting shall be conducted by ${u(values.accountingFirm, 14)} of assets, liabilities, and net worth as of Effective Date.`);
  p("3.2 Disclosure: Each Partner warrants no Partner incurred liabilities chargeable to Partnership or another Partner outside ordinary obligations.");
  p(`3.3 Settling Accounts: Liabilities are satisfied under Uniform Partnership Act. Remaining assets are distributed as follows: ${u(values.distributionFormula, 18)}.`);
  p(`3.4 Appointment of Liquidating Partner: ${u(values.liquidatingPartner, 14)} is appointed liquidating partner to carry out liquidation and wind-up under this Agreement.`);
  p("3.5 Inspection of Books and Records: All Partners may inspect and review books, records, and accounts during liquidation.");
  p("4. CONSTRUCTION PROVISIONS", true);
  p(`4.1 Governing Law: Laws of ${u(values.governingLaw, 14)}.`);
  p("4.2 Headings: Convenience only and do not affect interpretation.");
  p("4.3 Binding Effect: Agreement binds and benefits Partners and their heirs, executors, administrators, legal representatives, successors, and permitted assigns.");
  p("4.4 Strict Construction: Agreement shall be interpreted neutrally and not strictly against any Partner.");
  p("5. GENERAL CLAUSES", true);
  p("5.1 Severability: Invalid provisions do not affect enforceability of remaining provisions.");
  p("5.2 Execution in Counterparts: Agreement may be executed in one or more counterparts, all constituting one instrument.");
  p("5.3 Entire Agreement: This is the complete understanding concerning dissolution and winding-up and supersedes prior agreements.");
  p("5.4 Waiver: Failure to enforce does not waive future enforcement rights.");
  p("5.5 Amendment: Any amendment must be in writing and signed by all Partners.");
  p("5.6 Survival: Representations and warranties survive dissolution, winding-up, and distribution.");
  p("6. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, Partners execute this Agreement with intent to be legally bound.");
  p(`[${u(values.partner1Name, 12)}]`);
  p("Signature: ___________________________");
  uf("Date", values.partner1SignDate, 22, 2.6);
  p(`[${u(values.partner2Name, 12)}]`);
  p("Signature: ___________________________");
  uf("Date", values.partner2SignDate, 22);

  doc.save("partnership_dissolution_agreement.pdf");
};

export default function PartnershipDissolution() {
  return (
    <FormWizard
      steps={steps}
      title="Partnership Dissolution Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="partnershipdissolution"
    />
  );
}
