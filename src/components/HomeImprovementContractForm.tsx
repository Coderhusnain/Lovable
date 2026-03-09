import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Project",
    fields: [
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "licenseNumber", label: "Contractor license number", type: "text", required: true },
      { name: "projectAddress", label: "Project address", type: "text", required: true },
      { name: "workDescription", label: "Brief work description", type: "textarea", required: true },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "contractPrice", label: "Contract price", type: "text", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "ownerSign", label: "Owner name/signature/date text", type: "text", required: false },
      { name: "contractorSign", label: "Contractor name/signature/date text", type: "text", required: false },
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "HOME IMPROVEMENT CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p("1. Parties and Licensing", true);
  p(`This Home Improvement Contract ("Contract") is entered into between ${values.ownerName || "the Owner"} ("Owner") and ${values.contractorName || "the Contractor"} ("Contractor"). Contractor warrants it holds valid current license no. ${values.licenseNumber || "__________"} issued by appropriate state authority.`, false, 3);
  p("2. Project Address and Description", true);
  p(`Project address: ${values.projectAddress || "__________________________________________"}.`);
  p(`Brief description of work: ${values.workDescription || "............................."}.`, false, 3);
  p("3. Payment Terms", true);
  p(`Owner shall pay Contractor Contract Price${values.contractPrice ? ` (${values.contractPrice})` : ""} for completion of services. Payments are due upon completion unless otherwise specified. Discounts apply only if payment is made within stated timeframe. Overdue invoices may accrue maximum lawful interest, and delinquent party shall pay collection costs including reasonable attorneys' fees. Nonpayment is material breach, entitling non-breaching party to cancel and pursue all legal remedies.`, false, 3);
  p("4. Drawings, Specifications, and Permits", true);
  p("All work conforms to plans/specifications in term 2. Owner is solely responsible for obtaining/paying required permits, assessments, and utility connection charges. Owner shall identify property boundaries and provide boundary stakes when necessary. Government-required changes are at Owner expense unless otherwise agreed in writing.", false, 3);
  p("5. Utilities and Property Lines", true);
  p("Owner shall provide water, sewer, gas, and electric utilities at property entry point and provide drinking water, toilet facilities, and electricity for Contractor workers.", false, 3);
  p("6. Access to Work", true);
  p("Owner shall provide reasonable free access to worksite, including storage space, clear driveways, and secured site. Contractor is not liable for damage resulting from movement of vehicles/equipment over property. Denial of access during working hours is Owner breach.", false, 3);
  p("7. Financing", true);
  p("Owner shall secure and confirm adequate financing for full performance before commencement.", false, 3);
  p("8. Materials", true);
  p("(a) Standard Materials - Contractor supplies materials per mentioned work; substitutions communicated promptly and approved by Owner.");
  p("(b) Nonstandard Materials - Deviation from specified materials authorized only by written change order signed by both parties.", false, 3);
  p("9. Hazardous Materials", true);
  p("Contractor is not responsible for removal of hazardous materials unless expressly agreed. If encountered, affected area work ceases and Owner is notified immediately.", false, 3);
  p("10. Work Allowances and Abnormal Conditions", true);
  p("Reasonable measurement tolerances apply. Contractor is not responsible for concealed/unusual site conditions unless expressly assumed in writing. Additional work is treated as extra work and compensated accordingly.", false, 3);
  p("11. Contract Changes", true);
  p("No amendment/modification/change order is valid unless in writing and signed by both parties.", false, 3);
  p("12. Scope of Work", true);
  p("Unless expressly stated, work excludes painting preparation, grading, retaining walls, gutter relocation, or similar work. Floor covering selection is at Contractor discretion unless otherwise specified.", false, 3);
  p("13. Extra Work", true);
  p("No extra work without Owner's prior written consent. Such work billed at agreed rates plus applicable overhead and profit.", false, 3);
  p("14. Plumbing", true);
  p("No alterations to plumbing/gas/waste/water lines outside foundation are included unless specifically provided. Work on cesspools/septic systems is excluded unless otherwise agreed.", false, 3);
  p("15. Electrical Service", true);
  p("Unless expressly provided, no major changes to electrical service panels are included. Existing wiring in undisturbed areas remains in place; required corrections are extra work.", false, 3);
  p("16. Plaster", true);
  p("Matching existing plaster textures/colors is not guaranteed due to inherent material/application differences.", false, 3);
  p("17. Excavation on Filled or Rocky Ground", true);
  p("Excavation excludes removal of filled/unstable ground unless agreed otherwise. Such work is extra work.", false, 3);
  p("18. Termite or Dry Rot Work", true);
  p("Repairs for termite damage or dry rot are excluded unless expressly included.", false, 3);
  p("19. Removal of Materials and Debris", true);
  p("Contractor shall remove construction debris and leave site broom clean upon completion unless otherwise directed by Owner.", false, 3);
  p("20. Delays and Extra Time", true);
  p("Contractor shall diligently pursue work but is not liable for delays beyond control, including permit delays, financing issues, acts of God, severe weather, labor disputes, material shortages, Owner nonpayment, governmental actions, or other force majeure events.", false, 3);
  p("21. Damage to Project and Insurance", true);
  p("Before commencement, Owner shall obtain fire insurance with course-of-construction, vandalism, and malicious mischief coverage for not less than Contract Price, naming Contractor/subcontractors as additional insureds. If Owner fails, Contractor may procure at Owner expense. Damage/destruction reconstruction is extra work. If reconstruction exceeds 20% of Contract Price, Owner may terminate by paying completed work plus overhead/profit.", false, 3);
  p("22. Workers' Compensation", true);
  p("Contractor shall maintain workers' compensation insurance for employees. Owner insures against injury to Owner's employees/invitees.", false, 3);
  p("23. Protection of Owner's Property", true);
  p("Owner shall remove or protect personal property at jobsite. Contractor is not liable for damage to such items.", false, 3);
  p("24. Guarantee of Materials and Workmanship", true);
  p("Contractor guarantee is limited to extent of warranties provided by manufacturers/processors of materials/equipment used.", false, 3);
  p("25. Work Stoppage", true);
  p("If Owner fails to pay when due, Contractor may suspend work. If suspension remains 60 days, Contractor may demand payment for completed work and stored materials, plus overhead/profit, and be relieved from further obligations. Owner is responsible for protecting stored materials during stoppage.", false, 3);
  p("26. Completion and Occupancy", true);
  p("Within five (5) days of completion, Owner shall execute/record Notice of Completion. If Owner fails, Contractor may execute on Owner's behalf. Occupancy/use is deemed acceptance and completion.", false, 3);
  p("27. Notices", true);
  p("Notices may be delivered personally or by mail/email to specified addresses. Address changes provided in writing. Notices deemed received one (1) day after mailing.", false, 3);
  p("28. Entire Agreement", true);
  p(`This Contract, with schedules and written change orders, is entire agreement and supersedes prior oral/written agreements. Governed by laws of State of ${values.governingState || "__________"}.`, false, 3);
  p("29. Corrective Work", true);
  p("Minor corrective work identified after occupancy shall be promptly performed without withholding payment. For corrective work exceeding one percent (1%) of Contract Price, Owner may withhold only amount necessary to complete work.", false, 3);
  p("30. Dispute Resolution", true);
  p("Disputes under or in connection with Contract resolved by binding arbitration under AAA Construction Industry Arbitration Rules unless otherwise agreed. Arbitrator decision is final and enforceable in court.", false, 3);
  p("31. Attorneys' Fees", true);
  p("Prevailing party in arbitration or legal action is entitled to recover reasonable attorneys' fees and costs.", false, 3);
  p("32. Execution", true);
  p("This Contract becomes effective upon execution by both parties.");
  p(`Owner: ${values.ownerSign || "___________________________ (Name, Signature, Date)"}`);
  p(`Contractor: ${values.contractorSign || "_____________________ (Name, Signature, Date)"}`);

  doc.save("home_improvement_contract.pdf");
};

export default function HomeImprovementContract() {
  return (
    <FormWizard
      steps={steps}
      title="Home Improvement Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="homeimprovementcontract"
    />
  );
}
