import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Core Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "licenseState", label: "Contractor license state", type: "text", required: true },
      { name: "commencementDate", label: "Commencement date", type: "date", required: false },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "warrantyPeriod", label: "Warranty period text", type: "text", required: false },
      { name: "ownerSignatureLine", label: "Owner signature line text", type: "text", required: false },
      { name: "contractorSignatureLine", label: "Contractor signature line text", type: "text", required: false },
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
  const title = "HOME REMODELLING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Home Remodelling Agreement ("Agreement") is made and entered into on ${values.effectiveDate || "the effective date"}, by and between:`);
  p(`Owner: ${values.ownerName || "_________________________________________"}`);
  p(`Contractor: ${values.contractorName || "_____________________________________"} `, false, 3);

  p("1. Licensing", true);
  p(`Contractor warrants it holds valid and subsisting license under laws/regulations of State of ${values.licenseState || "__________"}, authorizing remodelling works described herein, and shall maintain license in good standing throughout Agreement term.`, false, 3);
  p("2. Time for Performance", true);
  p(`Contractor shall commence work on or before date specified in agreement${values.commencementDate ? ` (${values.commencementDate})` : ""}. Substantial commencement occurs upon mobilization of labor/materials/equipment to Worksite.`);
  p("If Contractor fails to commence within thirty (30) days of specified date, Owner may proportionally delay payment. Delays outside Contractor reasonable control (weather, governmental orders, supply chain disruptions, labor disputes) automatically extend completion deadlines.", false, 3);
  p("3. Drawings, Specifications, and Permits", true);
  p("All remodelling work shall be performed per plans/specifications in agreement. Contractor shall secure permits/approvals; Owner bears permit/governmental charges. Owner shall provide accurate property line data and boundary markers where applicable.", false, 3);
  p("4. Property Lines & Utilities", true);
  p("Owner shall ensure water, sewer, gas, and electricity are available at property entry point. Drinking water, restroom access, and reasonable utilities for construction purposes shall be provided for Contractor workforce.", false, 3);
  p("5. Access to Work", true);
  p("Owner shall grant free unobstructed access during agreed hours, clear driveways, and safe storage areas. Owner shall secure property from unauthorized access. Contractor shall store materials responsibly and take reasonable measures to prevent damage.", false, 3);
  p("6. Standard Materials", true);
  p("All materials conform to those specified in agreement. Substitutions require prior written consent of Owner.", false, 3);
  p("7. Nonstandard Materials", true);
  p("Any deviation in quality/specification/color requires written agreement signed by both parties.", false, 3);
  p("8. Hazardous Materials", true);
  p("Contractor is not responsible for detecting/handling/removing hazardous materials unless expressly agreed. If encountered, work stops until Owner engages qualified remediation services.", false, 3);
  p("9. Work Allowance & Abnormal Conditions", true);
  p("Reasonable dimensional variances are permitted. Contractor not responsible for poor soil, concealed structural deficiencies, or unusual site conditions unless separately contracted as extra work.", false, 3);
  p("10. Change Orders", true);
  p("All remodelling scope modifications documented in written Change Order signed by both parties; associated costs borne by Owner.", false, 3);
  p("11. Scope Exclusions", true);
  p("Unless expressly stated, Agreement does not include painting, grading, landscaping, or unrelated structural alterations.", false, 3);
  p("12. Extra Work and Changes", true);
  p("Extra work must be authorized in writing by Owner and billed at agreed rates plus overhead and profit.", false, 3);
  p("13. Plumbing", true);
  p("No alterations to plumbing, gas, waste, or water lines are included unless expressly specified.", false, 3);
  p("14. Electrical Service", true);
  p("Electrical upgrades are limited to breakers/fuses necessary for new remodelling features unless otherwise specified.", false, 3);
  p("15. Matching Finishes", true);
  p("Contractor will advise Owner on limitations in matching textures, colors, or finishes for partial replacement works.", false, 3);
  p("16. Filled Ground or Rock", true);
  p("Excavation does not include removal of rock, unstable soil, or filled ground unless agreed as extra work.", false, 3);
  p("17. Termite & Rot Repair", true);
  p("Repairs for termite or dry rot damage are excluded unless separately contracted.", false, 3);
  p("18. Site Cleanup", true);
  p("Contractor shall remove debris and leave site broom-clean, except materials Owner wishes to retain.", false, 3);
  p("19. Extensions of Time", true);
  p("Delays caused by events beyond Contractor control (weather, permit delays, strikes, Owner-related issues) extend completion schedule without penalty.", false, 3);
  p("20. Insurance Requirements", true);
  p("Before commencement, Owner shall obtain fire and builder's risk insurance for at least Contract Price naming Contractor as additional insured. If Owner fails, Contractor may obtain such coverage at Owner expense.", false, 3);
  p("21. Workers' Compensation", true);
  p("Contractor shall maintain workers' compensation for employees. Owner insures against injury to Owner personnel/invitees.", false, 3);
  p("22. Protection of Property", true);
  p("Owner shall remove/protect personal property from work area. Contractor is not responsible for unprotected property damage.", false, 3);
  p("23. Warranty", true);
  p(`Contractor warrants workmanship against defects for period specified in agreement${values.warrantyPeriod ? ` (${values.warrantyPeriod})` : ""}. Manufacturer warranties on materials transferred to Owner.`, false, 3);
  p("24. Work Stoppage", true);
  p("Contractor may halt work if payments are not timely. If stoppage remains sixty (60) days, Contractor may invoice completed work/materials plus profit and terminate obligations.", false, 3);
  p("25. Completion and Occupancy", true);
  p("Upon completion, Owner shall record Notice of Completion within five (5) days. If Owner fails, Contractor may do so. Owner shall not occupy/use remodelled area until full payment is made.", false, 3);
  p("26. Notices", true);
  p("All notices shall be in writing and delivered personally, by certified mail, or electronically to addresses in Agreement. Notices deemed received one day after dispatch.", false, 3);
  p("27. Entire Agreement", true);
  p(`Agreement with schedules is entire agreement and governed by laws of State of ${values.governingState || "__________"}.`, false, 3);
  p("28. Corrective Work", true);
  p("Minor corrective work completed promptly without withholding payment. For significant corrective work exceeding 1% of Contract Price, Owner may withhold only amount necessary for completion.", false, 3);
  p("29. Dispute Resolution", true);
  p("Disputes resolved by binding arbitration under AAA Construction Industry Arbitration Rules; award final and enforceable.", false, 3);
  p("30. Attorneys' Fees", true);
  p("Prevailing party in arbitration/litigation is entitled to recover reasonable attorneys' fees and costs.", false, 3);
  p("31. Signatures", true);
  p(`OWNER: ${values.ownerSignatureLine || "___________________________ (Signature, Date)"}`);
  p(`CONTRACTOR: ${values.contractorSignatureLine || "_______________________ (Signature, Date)"}`);

  doc.save("home_remodelling_agreement.pdf");
};

export default function HomeRemodellingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Home Remodelling Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="homeremodellingagreement"
    />
  );
}
