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
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "owner", label: "Owner", type: "text", required: true },
      { name: "developer", label: "Developer", type: "text", required: true },
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "ownerSignDate", label: "Owner Sign Date", type: "date", required: true },
      { name: "developerSignDate", label: "Developer Sign Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  p(`This Real Estate Development Agreement is made as of ${u(v.agreementDate, 12)} by and between Owner ${u(v.owner)} and Developer ${u(v.developer)}.`);
  p(`Property: ${u(v.propertyDescription)}. Project: ${u(v.projectDescription)}.`);
  p("This agreement includes purpose, developer responsibilities, financial controls, indemnification, insurance, delegation, approvals, termination, governing law, and full agreement clauses as provided in the draft.");
  p("Execution", true);
  p(`Owner signature date: ${u(v.ownerSignDate, 10)}.`);
  p(`Developer signature date: ${u(v.developerSignDate, 10)}.`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
    />
  );
}
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Date",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      { name: "developerName", label: "Developer Name", type: "text", required: true },
    ],
  },
  {
    label: "Step 2: Property and Project",
    fields: [
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
      { name: "phaseReference", label: "Phases / Entitlements Reference", type: "text", required: true },
    ],
  },
  {
    label: "Step 3: Approvals and Costs",
    fields: [
      { name: "majorSpendThreshold", label: "Major Spend Approval Threshold", type: "text", required: true },
      { name: "contractThreshold", label: "Contract Threshold Reference", type: "text", required: true },
      { name: "gaFeeReference", label: "General & Administrative Fee Reference", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Termination and Notices",
    fields: [
      { name: "bankruptcyDays", label: "Bankruptcy Dismissal Days", type: "text", required: true },
      { name: "ownerNoticeAddress", label: "Owner Notice Address", type: "textarea", required: true },
      { name: "developerNoticeAddress", label: "Developer Notice Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 5: Governing Law",
    fields: [{ name: "governingState", label: "Governing Law State", type: "text", required: true }],
  },
  {
    label: "Step 6: Signatures",
    fields: [
      { name: "ownerSigner", label: "Owner Signer Name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner Sign Date", type: "date", required: true },
      { name: "developerSigner", label: "Developer Signer Name", type: "text", required: true },
      { name: "developerSignDate", label: "Developer Sign Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
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

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

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
  p(`OWNER: ${u(v.ownerSigner)}   Date: ${u(v.ownerSignDate, 10)}`);
  p(`DEVELOPER: ${u(v.developerSigner)}   Date: ${u(v.developerSignDate, 10)}`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
      preserveStepLayout
    />
  );
}
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Date",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      { name: "developerName", label: "Developer Name", type: "text", required: true },
    ],
  },
  {
    label: "Step 2: Property and Project",
    fields: [
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
      { name: "phaseReference", label: "Phases/Entitlements Reference in Contract", type: "text", required: true },
    ],
  },
  {
    label: "Step 3: Controls and Thresholds",
    fields: [
      { name: "majorSpendThreshold", label: "Single Expenditure Threshold", type: "text", required: true },
      { name: "contractThreshold", label: "Contract Threshold Reference", type: "text", required: true },
      { name: "gaFeeReference", label: "General and Administrative Fee Reference", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Termination and Notices",
    fields: [
      { name: "bankruptcyDays", label: "Bankruptcy Dismissal Days", type: "text", required: true },
      { name: "ownerNoticeAddress", label: "Owner Notice Address", type: "textarea", required: true },
      { name: "developerNoticeAddress", label: "Developer Notice Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 5: Governing Law",
    fields: [{ name: "governingState", label: "Governing State", type: "text", required: true }],
  },
  {
    label: "Step 6: Signatures",
    fields: [
      { name: "ownerSigner", label: "Owner Signer Name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner Sign Date", type: "date", required: true },
      { name: "developerSigner", label: "Developer Signer Name", type: "text", required: true },
      { name: "developerSignDate", label: "Developer Sign Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
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

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  p(`This Real Estate Development Agreement ("Agreement") is made and entered into as of the ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Owner ${u(v.ownerName)} and Developer ${u(v.developerName)}.`);
  p('Owner and Developer may be referred to individually as a "Party" and collectively as the "Parties."');
  p("1. Purpose of the Agreement", true);
  p(`Owner engages Developer to develop lots of land legally described as ${u(v.propertyDescription)} into a cost-efficient residential project for first-time homebuyers (${u(v.projectDescription)}).`);
  p("2. Developer's Responsibilities", true);
  p("2.1 Developer shall prepare a detailed Development Plan for each phase including design, budget, schedule, and marketing for Owner approval.");
  p("2.2 Development Plan shall be reviewed quarterly; modifications require Owner's written approval.");
  p("2.3 No phase commences without Owner approval; Owner may delay or decline any phase.");
  p("2.4 Developer maintains complete books/accounts/records available for Owner inspection and audit.");
  p("2.5 Developer provides quarterly financial reports, weekly sales reports after sales start, and monthly progress reports.");
  p("2.6 Developer obtains required permits/licenses/approvals and provides filings/correspondence copies.");
  p("2.7 Parties meet weekly or as mutually agreed.");
  p("3. Funds and Financial Controls", true);
  p("All project funds belong exclusively to Owner and must be held in Owner-designated account(s). Developer may draw only with written authorization.");
  p("Accounting procedures are determined by Owner after consultation with Developer.");
  p("4. Owner's Representative", true);
  p("Owner may appoint an onsite observer for monitoring and educational purposes only; observer has no authority to direct operations.");
  p("5. Indemnification", true);
  p("Each Party indemnifies, defends, and holds the other harmless against losses, claims, damages, and expenses (including attorneys' fees) resulting from its own negligence, omissions, or breaches.");
  p("6. Insurance Requirements", true);
  p("Developer maintains comprehensive general liability coverage, workers compensation/employers liability, and requires compliant subcontractor insurance.");
  p("Owner maintains all-risk property insurance at least equal to estimated work cost. Deductible losses are borne by Developer.");
  p("Parties waive subrogation rights under project insurance policies.");
  p("7. Delegation and Subcontracts", true);
  p("Developer may delegate duties to qualified third parties with Owner's written approval. Subcontracts are for Developer's account and may be assigned to Owner on request.");
  p("8. Phases and Entitlements", true);
  p(`Developer shall provide services in defined phases as set forth in ${u(v.phaseReference)} and advise Owner on entitlements/compliance.`);
  p("9. General and Administrative Costs", true);
  p(`Developer shall be compensated by General and Administrative Fee reference: ${u(v.gaFeeReference)}.`);
  p("10. Project Costs and Financing", true);
  p("Owner shall provide or arrange sufficient approved project funding. Developer is reimbursed for properly documented project costs.");
  p("11. Developer's Authority and Standard of Performance", true);
  p("Developer acts solely as independent contractor and may not bind Owner except for permits and acknowledging deposits.");
  p("12. Major Decisions Requiring Owner Approval", true);
  p(`Prior written Owner consent is required for plan changes, expenditures over ${u(v.majorSpendThreshold)}, contract actions over thresholds (${u(v.contractThreshold)}), and material reserve/budget changes.`);
  p("13. Termination", true);
  p("Either party may terminate for failure to submit/agree development plan, material breach, or transfer of all/part of property to non-affiliated entity.");
  p(`Automatic termination applies on bankruptcy/insolvency filing not dismissed within ${u(v.bankruptcyDays, 2)} days.`);
  p("14-19. Representations, Notices, Related Party Transactions, Assignment, Attorneys' Fees, No Third Party Beneficiaries", true);
  p(`Notices to Owner: ${u(v.ownerNoticeAddress)}. Notices to Developer: ${u(v.developerNoticeAddress)}.`);
  p("20. Governing Law", true);
  p(`This Agreement is governed by the laws of the State of ${u(v.governingState)}.`);
  p("21. Entire Agreement; Amendments", true);
  p("This Agreement supersedes prior understandings and may be amended only in writing signed by both Parties.");
  p("22. Execution", true);
  p(`OWNER: ${u(v.ownerSigner)}   Date: ${u(v.ownerSignDate, 10)}`);
  p(`DEVELOPER: ${u(v.developerSigner)}   Date: ${u(v.developerSignDate, 10)}`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
      preserveStepLayout
    />
  );
}
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
    label: "Parties and Property",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      { name: "developerName", label: "Developer Name", type: "text", required: true },
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Responsibilities and Controls",
    fields: [
      { name: "projectPurpose", label: "Project Purpose Description", type: "textarea", required: true },
      { name: "majorSpendThreshold", label: "Major Spend Approval Threshold", type: "text", required: true },
      { name: "contractThreshold", label: "Contract Threshold Reference", type: "text", required: true },
      { name: "planPhasesReference", label: "Phase/Entitlement Reference", type: "text", required: true },
    ],
  },
  {
    label: "Insurance and Termination",
    fields: [
      { name: "bankruptcyDays", label: "Bankruptcy Dismissal Days", type: "text", required: true },
      { name: "terminationChangeReason", label: "Owner termination reason text", type: "textarea", required: true },
      { name: "noticeAddress", label: "Notice Addresses", type: "textarea", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "ownerSign", label: "Owner Signature Name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner Signature Date", type: "date", required: true },
      { name: "developerSign", label: "Developer Signature Name", type: "text", required: true },
      { name: "developerSignDate", label: "Developer Signature Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 15;
  const width = 180;
  const lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 9;

  p(
    `This Real Estate Development Agreement ("Agreement") is made and entered into as of the ${u(
      v.agreementDay,
      2
    )} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Owner: ${u(
      v.ownerName
    )} and Developer: ${u(v.developerName)}.`
  );
  p('Owner and Developer may be referred to individually as a "Party" and collectively as the "Parties."');

  p("1. Purpose of the Agreement", true);
  p(
    `Owner engages Developer to develop lots of land described as ${u(
      v.propertyDescription
    )} into a cost-efficient residential project for first-time homebuyers. Project purpose: ${u(v.projectPurpose)}.`
  );

  p("2. Developer's Responsibilities", true);
  p(
    "2.1 Development Plan: Developer shall prepare a detailed plan including design, phasing, budgets, marketing strategies, and schedules for Owner review/approval. No phase starts without Owner written approval."
  );
  p("2.2 Periodic Review: Development Plan reviewed quarterly for feasibility, efficiency, and profitability; modifications require written Owner approval.");
  p("2.3 Timing of Development: Owner reserves the right to delay or decline proceeding with any phase.");
  p("2.4 Books, Accounts, and Records: Developer maintains complete/current/accurate records open for Owner inspection/audit upon reasonable notice.");
  p("2.5 Financial and Progress Reporting: quarterly financial reports (with cash flow projections), weekly sales reports after sales commence, and monthly activity/construction/milestone reports.");
  p("2.6 Governmental Reports and Permits: Developer obtains required permits/licenses/approvals and furnishes governmental filings/significant correspondence to Owner.");
  p("2.7 Meetings: Parties meet weekly or as mutually agreed.");

  p("3. Funds and Financial Controls", true);
  p(
    "3.1 All Project funds belong exclusively to Owner and are deposited into Owner-designated account. Developer may draw only when authorized in writing and has no ownership interest in funds."
  );
  p("3.2 Accounting procedures are determined by Owner after consultation with Developer.");

  p("4. Owner's Representative", true);
  p(
    "Owner may appoint an onsite observer for monitoring and educational access. Observer has no authority to direct, control, or interfere with Developer operations."
  );

  p("5. Indemnification", true);
  p("Each Party shall indemnify, defend, and hold the other harmless from losses, liabilities, claims, damages, and expenses (including attorneys' fees) caused by its own negligence/omissions/breach.");

  p("6. Insurance Requirements", true);
  p(
    "Developer shall maintain comprehensive general liability insurance for the term; workers' compensation and employers' liability for employees; and ensure subcontractors maintain similar coverage with certificates available on request."
  );
  p(
    "Owner shall maintain all-risk property insurance equal to at least estimated cost of work, including fire and extended coverage. Deductible losses are borne by Developer."
  );
  p("Parties and related personnel/subcontractors waive subrogation rights under project insurance policies.");

  p("7. Delegation and Subcontracts", true);
  p("Developer may delegate duties to qualified third parties (including architects/engineers) with Owner written approval. Subcontracts are for Developer account and may be assigned to Owner on request.");
  p("8. Phases and Entitlements", true);
  p(`Developer provides services in defined phases as set forth in ${u(v.planPhasesReference)} and advises on entitlements and governmental compliance/modifications.`);
  p("9. General and Administrative Costs", true);
  p("Developer uses its own personnel/facilities/resources and is compensated through General and Administrative Fee per project phase (excluding planning phase).");
  p("10. Project Costs and Financing", true);
  p("Owner provides/arranges sufficient funding for approved project costs through equity or financing. Developer is reimbursed for properly documented costs.");
  p("11. Developer's Authority and Standard of Performance", true);
  p("Developer is an independent contractor and cannot bind Owner except for permits and acknowledging deposits; performance must be diligent, competent, lawful, and ethical.");

  p("12. Major Decisions Requiring Owner Approval", true);
  p(
    `Owner prior written approval is required for Development Plan changes, expenditures exceeding ${u(
      v.majorSpendThreshold
    )}, contract executions/modifications above threshold references (${u(v.contractThreshold)}), and material reserve/budget changes.`
  );

  p("13. Termination", true);
  p(
    "13.1 Either party may terminate on failure to agree/submit Development Plan, material breach, or transfer of all/part of property to non-affiliate."
  );
  p(`13.2 Owner may terminate for significant Development Plan changes due to unforeseen circumstances/market conditions: ${u(v.terminationChangeReason)}.`);
  p(`13.3 Automatic termination on bankruptcy/insolvency filing not dismissed within ${u(v.bankruptcyDays, 2)} days.`);

  p("14. Representations and Warranties | 15. Notices | 16. Related Party Transactions", true);
  p(
    `Each Party represents no broker fee obligations and indemnifies for breach. Notices must be written and delivered personally, by facsimile, or certified mail to addresses specified: ${u(
      v.noticeAddress
    )}. Developer must notify Owner before affiliate contracts; Owner may reject inadequate/excessive contracts.`
  );
  p("17. Assignment and Binding Effect | 18. Attorneys' Fees | 19. No Third Party Beneficiaries", true);
  p(
    "Developer may not assign without Owner consent. Agreement binds permitted successors/assigns. Prevailing party in litigation/arbitration may recover reasonable attorneys' fees/costs. No third party beneficiaries."
  );
  p("20. Governing Law | 21. Entire Agreement; Amendments", true);
  p(
    `Governing law is State/Province of ${u(v.state)}, ${u(v.country)}${
      v.province ? `, ${v.province}` : ""
    }. Entire agreement supersedes prior negotiations/oral or written agreements. Amendments must be written and signed by both Parties.`
  );

  p("22. Execution", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  p(`OWNER: ${u(v.ownerSign)} (Signature)  Date: ${u(v.ownerSignDate, 10)}`);
  p(`DEVELOPER: ${u(v.developerSign)} (Signature)  Date: ${u(v.developerSignDate, 10)}`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
    />
  );
}
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
    label: "Parties and Purpose",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      { name: "developerName", label: "Developer Name", type: "text", required: true },
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Development Controls",
    fields: [
      { name: "majorSpendThreshold", label: "Major spend threshold", type: "text", required: true },
      { name: "phaseReference", label: "Phase reference in contract", type: "text", required: true },
      { name: "ownerNoticeAddress", label: "Owner notice address", type: "textarea", required: true },
      { name: "developerNoticeAddress", label: "Developer notice address", type: "textarea", required: true },
    ],
  },
  {
    label: "Insurance and Financial",
    fields: [
      { name: "gaFeeReference", label: "General & Admin fee reference", type: "text", required: true },
      { name: "terminationBankruptcyDays", label: "Bankruptcy dismissal days", type: "text", required: true },
      { name: "contractThresholdReference", label: "Contract threshold reference", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
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
  const left = 15;
  const width = 180;
  const lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 9;

  p(
    `This Real Estate Development Agreement ("Agreement") is made and entered into as of the ${u(
      v.agreementDay,
      2
    )} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Owner: ${u(v.ownerName)}, and Developer: ${u(
      v.developerName
    )}.`
  );
  p('Owner and Developer may be referred to individually as a "Party" and collectively as the "Parties."');

  p("1. Purpose of the Agreement", true);
  p(
    `Owner engages Developer to develop certain lots of land described as ${u(
      v.propertyDescription
    )} into a cost-efficient residential project targeted toward first-time homebuyers (${u(v.projectDescription)}). Developer agrees to develop, market, and oversee the project under this Agreement.`
  );

  p("2. Developer's Responsibilities", true);
  p(
    "2.1 Development Plan: Developer shall prepare detailed development plans including design, phasing, budgets, marketing strategies, and schedules for Owner approval; no phase may commence without written approval."
  );
  p("2.2 Periodic Review: plan shall be reviewed quarterly; proposed modifications require written Owner approval.");
  p("2.3 Timing of Development: Owner may delay or decline any phase.");
  p("2.4 Books and Records: Developer shall maintain complete/current/accurate books and records open for Owner inspection and audit on reasonable notice.");
  p(
    "2.5 Financial and Progress Reporting: Developer provides quarterly financial reports, weekly sales reports post-sales commencement, and monthly activity/progress/milestone updates."
  );
  p("2.6 Governmental Reports and Permits: Developer obtains required permits/licenses/approvals and provides Owner copies of filings/correspondence.");
  p("2.7 Meetings: Parties meet weekly or as mutually agreed.");

  p("3. Funds and Financial Controls", true);
  p("3.1 All project funds belong exclusively to Owner and shall be deposited in Owner-designated accounts. Developer may draw only with written authorization.");
  p("3.2 Accounting procedures are determined by Owner after consultation with Developer.");

  p("4. Owner's Representative", true);
  p("Owner may appoint an onsite observer to monitor activities; observer has no authority to direct/control Developer operations.");

  p("5. Indemnification", true);
  p("Each Party shall indemnify, defend, and hold the other harmless against losses/liabilities/claims/damages/expenses including reasonable attorneys' fees arising from its own negligence, omissions, or breaches.");

  p("6. Insurance Requirements", true);
  p(
    "Developer maintains comprehensive general liability coverage for Agreement term; workers' compensation/employers' liability for employees; and ensures subcontractors maintain required coverage and provide certificates."
  );
  p(
    "Owner procures all-risk property insurance at least equal to estimated cost of work. Losses attributable to deductibles are borne by Developer."
  );
  p("Parties and related persons waive subrogation rights against each other under project insurance policies.");

  p("7. Delegation and Subcontracts", true);
  p("Developer may delegate to qualified third parties (including architects/engineers) with Owner written approval; subcontracts are for Developer account and may be assigned to Owner upon request.");

  p("8. Phases and Entitlements", true);
  p(`Developer shall provide services in defined phases as set forth in ${u(v.phaseReference)} and advise on land-use entitlements/compliance/modifications.`);

  p("9. General and Administrative Costs", true);
  p(`Developer uses own personnel/resources and is compensated through General and Administrative Fee per project phase (excluding planning phase): ${u(v.gaFeeReference)}.`);

  p("10. Project Costs and Financing", true);
  p("Owner shall provide/arrange sufficient approved project funding via equity or financing. Developer is reimbursed for properly documented project costs.");

  p("11. Developer's Authority and Standard of Performance", true);
  p(
    "Developer acts as independent contractor, has no authority to bind Owner except for permits and acknowledging deposits, and must perform diligently/competently in compliance with laws and high business ethics."
  );

  p("12. Major Decisions Requiring Owner Approval", true);
  p(
    `Owner prior written approval required for development plan changes, single expenditures above ${u(
      v.majorSpendThreshold
    )}, execution/modification of contracts exceeding thresholds (${u(v.contractThresholdReference)}), and material reserve/budget changes.`
  );

  p("13. Termination", true);
  p("13.1 Either Party may terminate for failure to agree on development plan, material breach, or transfer of all/part of Property to non-affiliated entity.");
  p("13.2 Owner may terminate for significant required development plan changes due to unforeseen circumstances/market changes.");
  p(`13.3 Automatic termination if either party files bankruptcy/insolvency and filing is not dismissed within ${u(v.terminationBankruptcyDays, 2)} days.`);

  p("14. Representations and Warranties", true);
  p("Each party represents no broker commissions/fees are owed, and each indemnifies the other for breach.");
  p("15. Notices", true);
  p(`Notices must be in writing and delivered personally, by facsimile/telecopier, or certified first-class mail to Owner: ${u(v.ownerNoticeAddress)} and Developer: ${u(v.developerNoticeAddress)}.`);
  p("16. Related Party Transactions", true);
  p("Developer must notify Owner before affiliate contracts; Owner may reject if performance is inadequate or costs excessive.");
  p("17. Assignment and Binding Effect", true);
  p("Developer may not assign rights/obligations without Owner consent; Agreement binds and benefits parties and permitted successors/assigns.");
  p("18. Attorneys' Fees | 19. No Third Party Beneficiaries", true);
  p("Prevailing party in litigation/arbitration is entitled to reasonable attorneys' fees/costs. No third-party beneficiaries are intended.");
  p("20. Governing Law", true);
  p(`Agreement is governed by laws of ${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}, without regard to conflicts rules.`);
  p("21. Entire Agreement; Amendments", true);
  p("Agreement supersedes prior negotiations/agreements and may be amended only by signed writing.");

  p("22. Execution", true);
  p(`OWNER: ${u(v.ownerSigner)}    Date: ${u(v.ownerSignDate, 10)}`);
  p(`DEVELOPER: ${u(v.developerSigner)}    Date: ${u(v.developerSignDate, 10)}`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
    />
  );
}
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
