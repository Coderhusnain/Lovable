import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partnership Basics",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "partners", label: "Names of partners", type: "textarea", required: true },
      { name: "partnershipName", label: "Partnership name", type: "text", required: true },
      { name: "partnershipAddress", label: "Partnership address", type: "text", required: false },
      { name: "businessNature", label: "Nature of business", type: "text", required: false },
      { name: "priorAgreementDate", label: "Prior partnership agreement date", type: "date", required: false },
      { name: "effectiveDissolutionDate", label: "Effective dissolution date", type: "date", required: false },
    ],
  },
  {
    label: "Liquidation Terms",
    fields: [
      { name: "accountantName", label: "Accountant / Auditor", type: "text", required: false },
      { name: "distributionMethod", label: "Distribution method / ratios", type: "textarea", required: false },
      { name: "liquidatingPartner", label: "Liquidating partner", type: "text", required: false },
      { name: "governingJurisdiction", label: "Governing jurisdiction", type: "text", required: true },
      { name: "signerForPartnership", label: "Signer for partnership", type: "text", required: false },
      { name: "signerDate", label: "Signer date", type: "date", required: false },
      { name: "partner1Name", label: "Partner 1 sign name", type: "text", required: false },
      { name: "partner1Date", label: "Partner 1 sign date", type: "date", required: false },
      { name: "partner2Name", label: "Partner 2 sign name", type: "text", required: false },
      { name: "partner2Date", label: "Partner 2 sign date", type: "date", required: false },
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
  const title = "LIQUIDATION AND DISSOLUTION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Liquidation and Dissolution Agreement (the "Agreement") is made and executed on ${u(values.agreementDate, 12)}, by and between the following partners (collectively, the "Partners" and individually, a "Partner"): ${u(values.partners, 24)}.`);
  p("The Partners record and affirm their mutual intention to dissolve the partnership and liquidate and wind up its affairs in accordance with this Agreement.");
  p("ARTICLE I - DESCRIPTION OF PARTNERSHIP", true);
  p(`1.1 Status and Nature: Partnership known as ${u(values.partnershipName, 18)}, having principal place of business at ${u(values.partnershipAddress, 16)}, engaged in ${u(values.businessNature, 14)}.`);
  p(`1.2 Existing Partnership Agreement: The Partners operated under a written Partnership Agreement dated ${u(values.priorAgreementDate, 12)} (attached as Exhibit A and incorporated by reference).`);
  p("1.3 Intention to Dissolve and Liquidate: Partners have resolved to dissolve and liquidate in a structured manner whereby assets are sold/realized/disposed and proceeds applied to liabilities, with remaining balance distributed under this Agreement.");
  p("ARTICLE II - DISSOLUTION", true);
  p(`2.1 Effective Date of Dissolution: Partnership stands dissolved as of close of business on ${u(values.effectiveDissolutionDate, 12)}.`);
  p("2.2 Cessation of Business Activities: After effective date, no Partner shall carry on business or incur obligations except as necessary to wind up and liquidate.");
  p("2.3 Statement of Dissolution: Partners shall file a formal Statement of Dissolution with appropriate governmental authority and record with relevant jurisdictional offices.");
  p("2.4 Public Notice of Dissolution: Notice shall be published at least once in a newspaper of general circulation in each jurisdiction where Partnership regularly conducted business.");
  p("ARTICLE III - LIQUIDATION AND SETTLEMENT", true);
  p(`3.1 Preparation of Accounting: Full accounting by ${u(values.accountantName, 14)} showing assets, liabilities, and net worth as of effective date.`);
  p("3.2 Representations and Disclosure: Each Partner represents no undisclosed liability and no wrongful receipt/misappropriation/discharge of partnership funds or property.");
  p(`3.3 Settlement of Liabilities and Distribution of Surplus: Liabilities settled under applicable law, then surplus distributed as follows: ${u(values.distributionMethod, 20)}.`);
  p(`3.4 Appointment of Liquidating Partner: ${u(values.liquidatingPartner, 16)} is appointed to oversee and execute liquidation in accordance with this Agreement and law.`);
  p("3.5 Right of Inspection: Each Partner may inspect books/accounts/records at reasonable times to protect rights under this Agreement.");
  p("ARTICLE IV - GENERAL AND CONSTRUCTION PROVISIONS", true);
  p(`4.1 Governing Law: Laws of ${u(values.governingJurisdiction, 14)}.`);
  p("4.2 Further Assurances: Partners shall execute further instruments as necessary to carry out intent and purpose of this Agreement.");
  p("4.3 Headings: Convenience only; no effect on interpretation.");
  p("4.4 Binding Effect: Agreement binds and benefits Partners and their heirs, executors, administrators, legal representatives, successors, and permitted assigns.");
  p("4.5 No Strict Construction: Agreement shall not be construed against any Partner by reason of drafting.");
  p("4.6 Severability: Invalid provisions are severed; remainder remains in full force.");
  p("4.7 Counterparts: Agreement may be executed in counterparts, each deemed original.");
  p("4.8 Supersession of Prior Agreements: Agreement supersedes prior understandings and Partnership Agreement to extent of inconsistency.");
  p("4.9 Survival of Representations: Representations and warranties survive dissolution, accounting, and winding-up.", false, 3);
  p("EXECUTION", true);
  p("IN WITNESS WHEREOF, the Partners have executed this Agreement on the date first written above.");
  p(`For and on behalf of the Partnership: ${u(values.partnershipName, 16)}`);
  p("________________________________________");
  uf("Name", values.signerForPartnership, 22);
  p("Signature: ____________________");
  uf("Date", values.signerDate, 22, 2.6);
  p("Partner");
  uf("Name", values.partner1Name, 22);
  p("Signature: ____________________");
  uf("Date", values.partner1Date, 22, 2.6);
  p("Partner");
  uf("Name", values.partner2Name, 22);
  p("Signature: ____________________");
  uf("Date", values.partner2Date, 22);

  doc.save("liquidation_dissolution_agreement.pdf");
};

export default function LiquidationDissolutionAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Liquidation and Dissolution Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="liquidationdissolutionagreement"
    />
  );
}
