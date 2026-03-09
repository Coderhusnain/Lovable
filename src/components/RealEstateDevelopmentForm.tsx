import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Project",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: false },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: false },
      { name: "agreementYear", label: "Agreement year", type: "text", required: false },
      { name: "owner", label: "Owner", type: "text", required: true },
      { name: "developer", label: "Developer", type: "text", required: true },
      { name: "propertyDescription", label: "Property legal description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project description", type: "textarea", required: false },
      { name: "startDate", label: "Development start date", type: "date", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Controls and Thresholds",
    fields: [
      { name: "majorSpendThreshold", label: "Major expenditure threshold", type: "text", required: false },
      { name: "contractThreshold", label: "Contract threshold reference", type: "text", required: false },
      { name: "bankruptcyDays", label: "Bankruptcy dismissal days", type: "text", required: false },
      { name: "noticesAddress", label: "Notice addresses", type: "textarea", required: false },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: false },
      { name: "developerSignDate", label: "Developer sign date", type: "date", required: false },
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
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Real Estate Development Agreement ("Agreement") is made and entered into as of the ${u(values.agreementDay, 2)} day of ${u(values.agreementMonth, 8)}, ${u(values.agreementYear, 4)}, by and between Owner: ${u(values.owner, 16)} ("Owner"), and Developer: ${u(values.developer, 16)} ("Developer").`);
  p("Owner and Developer may be referred to individually as a \"Party\" and collectively as the \"Parties.\"");
  p("1. Purpose of the Agreement", true);
  p(`Owner engages Developer to develop certain lots of land described as: ${u(values.propertyDescription, 24)} into a cost-efficient residential project targeted toward first-time homebuyers (${u(values.projectDescription, 16)}). Developer agrees to develop, market, and oversee the Project in accordance with this Agreement.`);
  p("2. Developer's Responsibilities", true);
  p("2.1 Development Plan: Developer prepares detailed phased plan including design, budgets, schedule, and marketing. No phase commences without Owner's written approval.");
  p("2.2 Periodic Review: Development plan reviewed quarterly; modifications submitted in writing for Owner approval.");
  p("2.3 Timing of Development: Owner reserves right to delay or decline any phase.");
  p("2.4 Books, Accounts, and Records: Developer maintains complete/current/accurate records open to Owner inspection and audit on reasonable notice.");
  p("2.5 Financial and Progress Reporting: Quarterly financial reports with projections; weekly sales reports after sales commencement; monthly activity/progress/milestone reports.");
  p("2.6 Governmental Reports and Permits: Developer obtains permits/licenses/approvals and provides Owner copies of filings and significant correspondence.");
  p("2.7 Meetings: Parties meet weekly or as mutually agreed.");
  p("3. Funds and Financial Controls", true);
  p("3.1 All project funds belong exclusively to Owner and are deposited into Owner-designated account. Developer may draw only with written authorization and has no ownership interest.");
  p("3.2 Accounting procedures are determined by Owner after consultation with Developer.");
  p("4. Owner's Representative", true);
  p("Owner may appoint onsite observer with access to relevant non-proprietary information. Observer is monitoring/educational only and has no operational control.");
  p("5. Indemnification", true);
  p("Each Party indemnifies, defends, and holds the other harmless from losses/liabilities/claims/damages/expenses including reasonable attorneys' fees caused by its own negligence, omissions, or breaches.");
  p("6. Insurance Requirements", true);
  p("Developer maintains comprehensive general liability and required endorsements for agreement term.");
  p("Developer maintains workers' compensation and employers' liability and requires subcontractors to maintain similar coverage.");
  p("Subcontractors provide certificates of insurance on request.");
  p("Owner maintains all-risk property insurance at least equal to estimated cost of work, and deductible losses are borne by Developer.");
  p("Parties and their officers/employees/agents/subcontractors waive subrogation rights under project insurance policies.");
  p("7. Delegation and Subcontracts", true);
  p("Developer may delegate duties to qualified third parties (including architects/engineers) with Owner's written approval. Subcontracts are for Developer account and may be assigned to Owner upon request.");
  p("8. Phases and Entitlements", true);
  p("Developer provides services in defined phases and advises Owner on entitlements/governmental compliance and modifications.");
  p("9. General and Administrative Costs", true);
  p("Developer uses own personnel/resources and is compensated by General and Administrative Fee per project phase (excluding Planning Phase).");
  p("10. Project Costs and Financing", true);
  p("Owner provides or arranges funding for approved project costs via equity or financing. Developer is reimbursed for documented project costs. Owner may obtain financing from lenders of choice.");
  p("11. Developer's Authority and Standard of Performance", true);
  p(`Developer acts solely as independent contractor, may not bind Owner except for permits and acknowledging deposits, and shall perform diligently and lawfully from ${u(values.startDate, 12)} forward.`);
  p("12. Major Decisions Requiring Owner Approval", true);
  p(`Requires prior written Owner consent for: changes in development plan, single expenditure exceeding ${u(values.majorSpendThreshold, 8)}, execution/modification of contracts exceeding ${u(values.contractThreshold, 8)}, and material reserve/budget changes.`);
  p("13. Termination", true);
  p("13.1 Either Party may terminate upon failure to agree/submit development plan, material breach, or transfer of all/part of property to non-affiliated entity.");
  p("13.2 Owner may terminate if significant development plan changes are required due to unforeseen circumstances or market conditions.");
  p(`13.3 Automatic termination if either Party files bankruptcy/insolvency and filing is not dismissed within ${u(values.bankruptcyDays, 4)} days.`);
  p("14. Representations and Warranties", true);
  p("Each Party represents no broker commissions/fees are owed in connection with this Agreement and indemnifies for breach.");
  p("15. Notices", true);
  p(`All notices are in writing and delivered personally, by facsimile/telecopier, or by first-class certified mail return receipt requested to addresses specified in agreement: ${u(values.noticesAddress, 18)}.`);
  p("16. Related Party Transactions", true);
  p("Developer shall notify Owner before entering contracts with affiliates for project goods/services. Owner may reject if performance is inadequate or costs excessive.");
  p("17. Assignment and Binding Effect", true);
  p("Developer may not assign rights/obligations without Owner prior written consent. Agreement binds and benefits Parties and permitted successors/assigns.");
  p("18. Attorneys' Fees | 19. No Third Party Beneficiaries | 20. Governing Law | 21. Entire Agreement; Amendments", true);
  p(`Prevailing Party in litigation/arbitration is entitled to reasonable attorneys' fees/costs. No third-party beneficiaries. Governing law: State of ${u(values.governingState, 14)}. Entire agreement applies; amendments require writing signed by both Parties.`, false, 3);
  p("22. Execution", true);
  p("IN WITNESS WHEREOF, Parties execute this Agreement as of date first written above.");
  p(`OWNER (${u(values.owner, 10)}): ___________________________`);
  uf("Signature Date", values.ownerSignDate, 22, 2.5);
  p(`DEVELOPER (${u(values.developer, 10)}): _______________________`);
  uf("Signature Date", values.developerSignDate, 22);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopment() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
    />
  );
}
