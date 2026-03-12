import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Project",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      { name: "developerName", label: "Developer Name", type: "text", required: true },
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
      { name: "phaseReference", label: "Phases/Entitlements Reference", type: "text", required: true },
    ],
  },
  {
    label: "Approvals and Costs",
    fields: [
      { name: "majorSpendThreshold", label: "Major Spend Approval Threshold", type: "text", required: true },
      { name: "contractThreshold", label: "Contract Threshold", type: "text", required: true },
      { name: "gaFeeReference", label: "General and Administrative Fee Reference", type: "text", required: true },
      { name: "bankruptcyDays", label: "Bankruptcy Dismissal Days", type: "text", required: true },
    ],
  },
  {
    label: "Notices and Governing Law",
    fields: [
      { name: "ownerNoticeAddress", label: "Owner Notice Address", type: "textarea", required: true },
      { name: "developerNoticeAddress", label: "Developer Notice Address", type: "textarea", required: true },
      { name: "governingState", label: "Governing Law State", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "ownerSigner", label: "Owner Signer Name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner Sign Date", type: "date", required: true },
      { name: "developerSigner", label: "Developer Signer Name", type: "text", required: true },
      { name: "developerSignDate", label: "Developer Sign Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.2;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.4) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    doc.text(label, m, y);
    const x = m + doc.getTextWidth(label);
    const show = u(value, 14);
    doc.text(show, x, y);
    doc.line(x, y + 1.1, x + doc.getTextWidth(show), y + 1.1);
    y += 6.1;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);
  p(
    `This Real Estate Development Agreement ("Agreement") is made and entered into as of the ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Owner: ${u(v.ownerName)} ("Owner"), and Developer: ${u(v.developerName)} ("Developer").`
  );
  p('The Owner and Developer may be referred to individually as a "Party" and collectively as the "Parties."');
  p("1. Purpose of the Agreement", true);
  p(
    `Owner desires to engage Developer to develop certain lots of land, as legally described in contract, as ${u(v.propertyDescription)}, into a cost-efficient residential project targeted toward first-time homebuyers (${u(v.projectDescription)}). Developer agrees to develop, market, and oversee the Project under this Agreement.`
  );
  p("2. Developer's Responsibilities", true);
  p("2.1 Development Plan: Developer shall prepare detailed Development Plan including design, phasing, budgets, marketing strategy, and schedules for Owner review and approval. No phase shall commence without prior written approval.");
  p("2.2 Periodic Review: Development Plan reviewed quarterly for feasibility, efficiency, and profitability. Proposed changes must be submitted in writing for Owner approval.");
  p("2.3 Timing of Development: Developer shall not commence any phase without Owner written approval. Owner may delay or decline any phase.");
  p("2.4 Books, Accounts, and Records: Developer maintains complete, current, accurate records available for Owner inspection and audit on reasonable notice.");
  p("2.5 Financial and Progress Reporting: Developer provides quarterly financial reports and cashflow projections; weekly sales reports after sales start; and monthly activity/progress/timeline reports.");
  p("2.6 Governmental Reports and Permits: Developer obtains required permits/licenses/approvals and furnishes Owner with copies of governmental filings and significant correspondence.");
  p("2.7 Meetings: Parties shall meet weekly, or as otherwise mutually agreed.");
  p("3. Funds and Financial Controls", true);
  p("3.1 All Project funds belong exclusively to Owner and are deposited into Owner-designated account(s). Developer may draw only when authorized in writing and has no ownership interest in funds.");
  p("3.2 Accounting procedures and principles are determined by Owner after consultation with Developer.");
  p("4. Owner's Representative", true);
  p("Owner may appoint an onsite observer to monitor construction/development. Onsite observer has access to relevant non-proprietary information but no authority to direct, control, or interfere with Developer operations.");
  p("5. Indemnification", true);
  p("Each Party shall indemnify, defend, and hold the other harmless from losses, liabilities, claims, damages, and expenses (including reasonable attorneys' fees) arising from its own negligent acts, omissions, or breach.");
  p("6. Insurance Requirements", true);
  p("6.1 Developer's Insurance: Developer shall maintain comprehensive general liability insurance (including broad form endorsement) during the term.");
  p("6.2 Workers Compensation: Developer shall maintain workers compensation and employers liability and require subcontractors to maintain comparable coverage.");
  p("6.3 Subcontractors' Insurance: Subcontractors provide certificates of insurance upon Owner request.");
  p("6.4 Owner's Property Insurance: Owner shall maintain all-risk property insurance at least equal to estimated cost of work. Deductible losses are borne by Developer.");
  p("6.5 Waiver of Subrogation: Parties and their officers, employees, agents, and subcontractors waive subrogation rights against each other under project insurance policies.");
  p("7. Delegation and Subcontracts", true);
  p("Developer may delegate duties to qualified third parties, including architects and engineers, with Owner written approval. Subcontracts are for Developer account and may be assigned to Owner upon request.");
  p("8. Phases and Entitlements", true);
  p(`Developer shall provide services in defined phases as set forth in ${u(v.phaseReference)} and advise Owner on land use entitlements and governmental compliance/changes.`);
  p("9. General and Administrative Costs", true);
  p(`Developer shall use its own personnel/resources and be compensated through General and Administrative Fee per project phase (excluding Planning Phase): ${u(v.gaFeeReference)}.`);
  p("10. Project Costs and Financing", true);
  p("Owner shall provide or arrange sufficient funding for approved Project Costs through equity and/or financing. Developer shall be reimbursed for properly documented Project costs.");
  p("11. Developer's Authority and Standard of Performance", true);
  p("Developer acts solely as independent contractor, has no authority to bind Owner except for obtaining permits and acknowledging deposits, and shall perform diligently and lawfully with high business ethics.");
  p("12. Major Decisions Requiring Owner Approval", true);
  p(`Owner prior written consent is required for Development Plan changes, any single expenditure above ${u(v.majorSpendThreshold)}, contract execution/modification above threshold references (${u(v.contractThreshold)}), and material reserve/budget changes.`);
  p("13. Termination", true);
  p("13.1 Either Party may terminate upon failure to agree on/submission of Development Plan, material breach by the other Party, or transfer of all/part of the Property to non-affiliated entity.");
  p(`13.2 Automatic termination applies upon bankruptcy/insolvency filing not dismissed within ${u(v.bankruptcyDays, 2)} days.`);
  p("14. Representations and Warranties", true);
  p("Each Party represents no broker commissions/fees are owed and agrees to indemnify the other for breach of this representation.");
  p("15. Notices", true);
  p(`All notices must be in writing and delivered personally, by facsimile/telecopier, or by first-class certified mail return receipt requested. Owner notice address: ${u(v.ownerNoticeAddress)}. Developer notice address: ${u(v.developerNoticeAddress)}.`);
  p("16. Related Party Transactions", true);
  p("Developer shall notify Owner before entering affiliate contracts for project goods/services. Owner may reject such contracts where performance is inadequate or costs excessive.");
  p("17. Assignment and Binding Effect", true);
  p("Developer may not assign rights/obligations without Owner prior written consent. Agreement binds and benefits Parties and permitted successors/assigns.");
  p("18. Attorneys' Fees", true);
  p("Prevailing Party in litigation/arbitration arising from this Agreement is entitled to recover reasonable attorneys' fees and costs.");
  p("19. No Third Party Beneficiaries", true);
  p("This Agreement is solely for the benefit of Parties and is not enforceable by third parties.");
  p("20. Governing Law", true);
  p(`This Agreement is governed by and construed in accordance with laws of the State of ${u(v.governingState)}, without regard to conflict-of-law principles.`);
  p("21. Entire Agreement; Amendments", true);
  p("This Agreement constitutes the entire understanding and supersedes prior oral/written agreements. Amendments are valid only if in writing and signed by both Parties.");
  p("22. Execution", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  uf("OWNER Name: ", v.ownerSigner);
  uf("OWNER Date: ", v.ownerSignDate);
  uf("DEVELOPER Name: ", v.developerSigner);
  uf("DEVELOPER Date: ", v.developerSignDate);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentFormFixed() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopmentform"
    />
  );
}
