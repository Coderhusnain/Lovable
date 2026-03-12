import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Project", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "ownerName", label: "Owner name", type: "text", required: true },
    { name: "ownerAddress", label: "Owner address", type: "text", required: true },
    { name: "managerName", label: "Manager name", type: "text", required: true },
    { name: "managerAddress", label: "Manager address", type: "text", required: true },
    { name: "projectDescription", label: "Project description", type: "textarea", required: true },
    { name: "projectLocation", label: "Project location", type: "text", required: true },
  ]},
  { label: "Services and Hours", fields: [
    { name: "planningHours", label: "Minimum planning hours per week", type: "text", required: true },
    { name: "constructionHours", label: "Minimum construction hours per week", type: "text", required: true },
  ]},
  { label: "Compensation and Term", fields: [
    { name: "hourlyRate", label: "Hourly rate", type: "text", required: true },
    { name: "terminationDate", label: "Termination date", type: "text", required: true },
  ]},
  { label: "Defaults and Remedies", fields: [
    { name: "cureDays", label: "Default cure days", type: "text", required: true },
  ]},
  { label: "Arbitration and Law", fields: [
    { name: "arbitrationLocation", label: "Arbitration location", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "ownerSign", label: "Owner signatory", type: "text", required: true },
    { name: "ownerDate", label: "Owner date", type: "date", required: true },
    { name: "managerSign", label: "Manager signatory", type: "text", required: true },
    { name: "managerDate", label: "Manager date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.4) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  const title = "CONSTRUCTION MANAGEMENT AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.3); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Construction Management Agreement is made as of ${u(v.effectiveDate)} by and between ${u(v.ownerName)}, of ${u(v.ownerAddress)} ("Owner"), and ${u(v.managerName)}, of ${u(v.managerAddress)} ("Manager").`);
  p("RECITALS", true);
  p(`Owner intends to construct ${u(v.projectDescription, 20)} (the "Project") and engage Manager for construction management services. Manager has expertise and agrees to undertake management.`);
  p("1. Management of the Project", true);
  p(`Owner appoints Manager as construction manager for the Project at ${u(v.projectLocation)} under this Agreement.`);
  p("2. Duties of the Manager", true);
  p("Manager shall diligently and professionally advise/counsel Owner, review contracts, assist budgets/estimates/schedules/reports/bids/selections/coordination, approve invoices and issue project payments, advise permit procurement/regulatory compliance/safety protocols, and recommend insurance.");
  p("3. Working Hours", true);
  p(`Time is of the essence. Manager dedicates minimum ${u(v.planningHours)} hours/week during planning/development and ${u(v.constructionHours)} hours/week during construction.`);
  p("4. Compensation", true);
  p(`Owner compensates Manager at ${u(v.hourlyRate)} per hour; Manager keeps accurate records and detailed accounts.`);
  p("5. Term", true);
  p(`Agreement automatically terminates on ${u(v.terminationDate)} unless earlier terminated or extended by mutual writing.`);
  p("6-10. Indemnity, Debris, Default, Remedies, Force Majeure", true);
  p(`Manager indemnifies/defends/holds Owner harmless for claims/losses/expenses from performance/non-performance and maintains errors and omissions insurance reasonably required by Owner. Site must remain reasonably free of waste/debris/refuse. Material default includes non-payment, insolvency/bankruptcy/assignment, seizure/legal process, or failure to perform obligations. Non-defaulting party gives written notice; defaulting party has ${u(v.cureDays)} days to cure; failure causes termination and legal/equitable remedies. Force majeure excuses delays/failures beyond reasonable control with prompt written notice and resumed performance when practicable.`);
  p("11. Arbitration", true);
  p(`Disputes are binding AAA commercial arbitration at ${u(v.arbitrationLocation)}. Parties exchange relevant documentation within 30 days of arbitration notice. Arbitrators cannot modify Agreement terms or award punitive damages, but may issue injunctions/mandatory orders. Award is final and enforceable.`);
  p("12-20. Governing Law, Amendment, Binding Effect, Fees, Notice, Waiver, Severability, Entire Agreement, Execution", true);
  p(`Governing law: ${u(v.governingLawState)}. Amendments must be in writing signed by the party against whom enforcement is sought. Agreement binds heirs/legal representatives/successors/permitted assigns. Prevailing party recovers reasonable attorneys' fees/costs. Notices in writing by personal service or certified mail. Failure to enforce is not waiver. Invalid provisions are severed with remainder in effect. This is the entire agreement.`);
  p("IN WITNESS WHEREOF:", true);
  uf("OWNER By", v.ownerSign); uf("Date", v.ownerDate);
  uf("MANAGER By", v.managerSign); uf("Date", v.managerDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("construction_management_agreement.pdf");
};

export default function ConstructionManagementAgreement() {
  return <FormWizard steps={steps} title="Construction Management Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="constructionmanagementagreement" />;
}
