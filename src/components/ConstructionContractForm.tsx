import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Project",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor address", type: "text", required: true },
      { name: "servicesDescription", label: "Detailed services description", type: "textarea", required: true },
      { name: "structureDescription", label: "Structure description", type: "text", required: true },
      { name: "worksiteAddress", label: "Worksite/property address", type: "text", required: true },
      { name: "completionDate", label: "Completion date", type: "date", required: true },
    ],
  },
  {
    label: "Commercial and Legal",
    fields: [
      { name: "paymentAmount", label: "Contract payment amount", type: "text", required: true },
      { name: "lateInterestRate", label: "Late payment annual rate", type: "text", required: false },
      { name: "lateInterestState", label: "State for remedies on non-payment", type: "text", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "governingState", label: "Governing law state/jurisdiction", type: "text", required: true },
      { name: "ownerRep", label: "Owner representative name/title", type: "text", required: false },
      { name: "contractorRep", label: "Contractor representative name/title", type: "text", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "ownerSignName", label: "Owner signing name", type: "text", required: false },
      { name: "ownerSignTitle", label: "Owner signing title", type: "text", required: false },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: true },
      { name: "contractorSignName", label: "Contractor signing name", type: "text", required: false },
      { name: "contractorSignTitle", label: "Contractor signing title", type: "text", required: false },
      { name: "contractorSignDate", label: "Contractor sign date", type: "date", required: true },
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

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
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
  const title = "CONSTRUCTION CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Construction Contract ("Contract") is made and entered into as of ${values.effectiveDate || "___"} ("Effective Date") by and between ${values.ownerName || "[Insert Name]"}, residing at ${values.ownerAddress || "[Insert Address]"} (the "Owner"), and ${values.contractorName || "[Insert Name]"}, a contractor having its principal place of business at ${values.contractorAddress || "[Insert Address]"} (the "Contractor").`);
  p("WHEREAS, the Contractor is duly qualified and desirous of providing construction services to the Owner; and");
  p("WHEREAS, the Owner wishes to engage the Contractor to perform such services upon the terms and conditions hereinafter set forth;");
  p("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties hereto agree as follows:", false, 3);

  p("1. Description of Services", true);
  p("As of the Effective Date, the Contractor shall provide the following construction-related services to the Owner (collectively, the \"Services\"):");
  p(values.servicesDescription || "[Insert detailed description of services].", false, 3);
  p("2. Scope of Work", true);
  p(`The Contractor shall furnish all labor, materials, and equipment necessary to complete construction of ${values.structureDescription || "[describe structure]"} at ${values.worksiteAddress || "[insert property address]"} ("Worksite").`);
  p("This includes provision of materials, labor force, site safety/security measures, and tools/machinery essential for project execution.");
  p("Unless otherwise agreed in writing, Contractor obligations exclude landscaping, site grading, walkways, painting, sewerage, water systems, steps, driveways, patios, and similar improvements.", false, 3);
  p("3. Plans, Specifications, and Construction Documents", true);
  p("Owner shall furnish requisite plans/specifications/drawings/blueprints and construction documents necessary for services. Such documents remain exclusive property of Owner and shall be returned upon completion.", false, 3);
  p("4. Compliance With Applicable Laws", true);
  p("Contractor shall perform services professionally, diligently, and workmanlike, in accordance with all applicable federal/state/local laws and regulations, including FLSA, ADA, and FMLA.", false, 3);
  p("5. Worksite Access and Ownership Warranty", true);
  p("Owner warrants lawful title to Worksite and authority to enter this Contract. Prior to commencement, Owner shall ensure site accessibility and clearly marked boundary stakes, maintained throughout construction period.", false, 3);
  p("6. Provision of Materials and Labor", true);
  p("Contractor shall provide complete list of subcontractors/vendors/third parties supplying labor/materials with payment amounts/obligations attached hereto. No material substitutions without Owner's prior written consent; substitutes must meet/exceed agreed quality.", false, 3);
  p("7. Payment Terms", true);
  p(`Payment of ${values.paymentAmount || "<insert amount>"} shall be made upon satisfactory completion of all Services.`);
  p(`Late payment interest accrues at lesser of ${values.lateInterestRate || "<insert amount>"} per annum or maximum lawful rate. Owner is liable for collection costs including reasonable attorneys' fees.`);
  p(`Non-payment is material breach, entitling Contractor to terminate and pursue remedies available under law of ${values.lateInterestState || "<insert name of state>"}.`, false, 3);
  p("8. Term and Completion", true);
  p(`Contractor shall commence performance within thirty (30) days from Effective Date and complete work on or before ${values.completionDate || "[Insert Completion Date]"}, time being of the essence.`);
  p("Owner shall execute Notice of Completion within ten (10) days of project completion. If Owner fails to do so after final inspection, Contractor may execute such Notice on Owner's behalf.", false, 3);
  p("9. Stop Work Order", true);
  p("Owner may issue written Stop Work Order at any time, suspending part/all services for period not exceeding ninety (90) days. Contractor shall comply immediately and mitigate costs. Owner may resume via Resume Work Notice.");
  p("Any extension/adjustment due to Stop Work Order shall be made equitably; claim asserted within thirty (30) days of resumption. Contractor shall not claim damages for delays resulting from Stop Work Orders.", false, 3);
  p("10. Permits and Licenses", true);
  p("Owner shall obtain requisite building permits. Contractor shall obtain all other necessary licenses/permits and include related costs in Contract price.", false, 3);
  p("11. Insurance", true);
  p("Prior to commencement, Contractor shall provide valid insurance certificates evidencing workers' compensation, general liability, and builder's risk coverage adequate for full contract scope.", false, 3);
  p("12. Ownership of Work Product", true);
  p("All intellectual property and work product generated under this Contract are exclusive property of Owner; Contractor shall execute documents to perfect ownership rights.", false, 3);
  p("13. Confidentiality", true);
  p("Contractor shall maintain strict confidentiality of proprietary information and return all records/materials on termination. Obligation survives termination.", false, 3);
  p("14. Indemnification", true);
  p("Contractor shall indemnify and hold harmless Owner from claims/damages/liabilities arising out of Contractor performance, except to extent contrary to public policy of applicable jurisdiction.", false, 3);
  p("15. Warranty", true);
  p("Contractor warrants all work is performed per prevailing professional standards and strict conformance with approved plans/specifications.", false, 3);
  p("16. Access to Worksite", true);
  p("Owner shall provide Contractor and workers reasonable access to Worksite/facilities. Contractor shall take reasonable precautions to avoid damage to driveways, landscaping, and existing structures.", false, 3);
  p("17. Utilities", true);
  p("Owner is responsible for providing water, power, and sewer connections prior to and during construction at no additional cost to Contractor.", false, 3);
  p("18. Inspection Rights", true);
  p("Owner has right to inspect work at reasonable times. Where third-party inspections/certifications are required, Owner bears such costs.", false, 3);
  p("19. Events of Default", true);
  p("Material breach includes non-payment by Owner; insolvency/bankruptcy of either party; lien/levy/lawsuit impacting completion; and failure to make Worksite available or undue construction delay.", false, 3);
  p("20. Remedies", true);
  p(`Non-defaulting party may issue Notice of Default detailing breach. Defaulting party has ${values.cureDays || "[Insert Days]"} days to cure; failure to cure results in automatic termination.`);
  p("21. Force Majeure", true);
  p("Neither party liable for delays due to Force Majeure beyond reasonable control; obligations resume promptly once causes cease.");
  p("22. Dispute Resolution", true);
  p("Disputes addressed through amicable negotiations, then mediation, then legal remedies in court of competent jurisdiction.");
  p("23. Entire Agreement", true);
  p("This Contract is full and final agreement; modifications must be in writing and signed by both parties.");
  p("24. Severability", true);
  p("If any provision is unenforceable, remainder remains in full force and effect.");
  p("25. Amendment", true);
  p("This Contract may be amended only by written instrument executed by both parties.");
  p("26. Governing Law", true);
  p(`This Contract is governed by laws of the State of ${values.governingState || "[Insert Jurisdiction]"}, without conflict-of-laws principles.`);
  p("27. Notices", true);
  p("Notices shall be delivered personally or via certified mail to addresses in preamble, unless updated in writing.");
  p("28. Waiver", true);
  p("Any waiver of breach is not waiver of subsequent breaches or other provisions.");
  p("29. Execution and Effectiveness", true);
  p(`Contract shall be executed by ${values.ownerRep || "[Insert Name and Title of Owner Representative]"} for Owner and ${values.contractorRep || "[Insert Name and Title of Contractor Representative]"} for Contractor, and effective as of Effective Date.`, false, 3);

  p("IN WITNESS WHEREOF, the parties have executed this Construction Contract as of the Effective Date.", true);
  p("OWNER:", true, 1);
  uf("Name", values.ownerSignName, 22);
  uf("Title", values.ownerSignTitle, 22);
  uf("Date", values.ownerSignDate, 22, 2.2);
  p("CONTRACTOR:", true, 1);
  uf("Name", values.contractorSignName, 22);
  uf("Title", values.contractorSignTitle, 22);
  uf("Date", values.contractorSignDate, 22);

  doc.save("construction_contract.pdf");
};

export default function ConstructionContract() {
  return (
    <FormWizard
      steps={steps}
      title="Construction Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="constructioncontract"
    />
  );
}
