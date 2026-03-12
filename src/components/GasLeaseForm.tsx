import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "county", label: "County", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "agreementDate", label: "Agreement date", type: "date", required: true },
    { name: "lessorName", label: "Lessor name", type: "text", required: true },
    { name: "lessorAddress", label: "Lessor address", type: "text", required: true },
    { name: "lesseeName", label: "Lessee name", type: "text", required: true },
    { name: "lesseeAddress", label: "Lessee address", type: "text", required: true },
  ]},
  { label: "Premises and Term", fields: [
    { name: "premisesAddress", label: "Premises address", type: "text", required: true },
    { name: "legalDescription", label: "Legal description", type: "textarea", required: true },
    { name: "acres", label: "Approximate acres", type: "text", required: true },
    { name: "primaryTermYears", label: "Primary term years", type: "text", required: true },
    { name: "annualRental", label: "Annual rental amount", type: "text", required: true },
  ]},
  { label: "Royalty and Payment", fields: [
    { name: "oilRoyaltyPercent", label: "Oil royalty percent", type: "text", required: true },
    { name: "gasRoyaltyPercent", label: "Gas royalty percent", type: "text", required: true },
    { name: "casingheadPercent", label: "Casinghead gasoline percent", type: "text", required: true },
    { name: "royaltyDayOfMonth", label: "Monthly royalty due day", type: "text", required: true },
  ]},
  { label: "Development and Operations", fields: [
    { name: "offsetFeet", label: "Offset well distance (feet)", type: "text", required: true },
    { name: "developmentClauseText", label: "Development clause details", type: "textarea", required: true },
    { name: "operationsText", label: "Operations conduct clause", type: "textarea", required: true },
  ]},
  { label: "Default and Legal Terms", fields: [
    { name: "defaultCureDays", label: "Default cure days", type: "text", required: true },
    { name: "mineralTaxPercent", label: "Mineral tax percent paid by Lessee", type: "text", required: true },
    { name: "noticesText", label: "Notices wording", type: "text", required: true },
    { name: "attorneysFeesText", label: "Attorneys' fees wording", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "lessorSign", label: "Lessor signature name", type: "text", required: true },
    { name: "lessorDate", label: "Lessor date", type: "date", required: true },
    { name: "lesseeSign", label: "Lessee signature name", type: "text", required: true },
    { name: "lesseeDate", label: "Lessee date", type: "date", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const right = 190;
  let y = 20;
  const u = (v?: string, l = 22) => (v && String(v).trim() ? String(v).trim() : "_".repeat(l));
  const p = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, right - left);
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "GAS LEASE AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`This Gas Lease Agreement is made on ${u(values.agreementDate)} by and between ${u(values.lessorName)} of ${u(values.lessorAddress)} ("Lessor"), and ${u(values.lesseeName)} of ${u(values.lesseeAddress)} ("Lessee").`);
  p("1. GRANT OF LEASED PREMISES", true);
  p(`In consideration of annual rental of $${u(values.annualRental, 8)}, Lessor exclusively leases to Lessee the tract in ${u(values.county)} County, ${u(values.state)}, located at ${u(values.premisesAddress)}, legally described as ${u(values.legalDescription)}, comprising approximately ${u(values.acres, 6)} acres, for exploration, drilling, mining, extracting, storing, and removing hydrocarbons.`);
  p(`Primary term is ${u(values.primaryTermYears, 4)} years and continues so long as production in paying quantities continues, drilling is continuously conducted, or the term is extended in writing.`);
  p("2. RIGHTS GRANTED TO LESSEE", true);
  p("Lessee has exclusive rights to enter/occupy premises; build/maintain facilities, pipelines, lines, roads, employee housing; inject gas/water/other substances; drill/use water from premises; and operate processing facilities.");
  p("3. ROYALTY PROVISIONS", true);
  p(`3.1 Oil Royalty: ${u(values.oilRoyaltyPercent, 4)}% of oil value, adjusted as applicable. Lessor may elect royalty in kind with proper notice.`);
  p(`3.2 Gas Royalty: ${u(values.gasRoyaltyPercent, 4)}% of net sale proceeds, subject to allowable deductions/operational exceptions.`);
  p(`3.3 Casinghead Gasoline: ${u(values.casingheadPercent, 4)}% of net sale proceeds where applicable.`);
  p("3.4 Own Use Exemption: no royalty on hydrocarbons/water used in lease operations.");
  p("4. PAYMENT OF ROYALTIES", true);
  p(`Royalties shall be paid on or before day ${u(values.royaltyDayOfMonth, 3)} each month for prior month production. Payment is deemed made when deposited in U.S. mail to Lessor's address of record.`);
  p("5. DEVELOPMENT CLAUSE", true);
  p(u(values.developmentClauseText));
  p("6. PAYMENT METHOD", true);
  p("Rent and royalties are considered paid upon first-class U.S. mail deposit to last known Lessor address, subject to address updates by written notice.");
  p("7. OWNERSHIP INTEREST", true);
  p("If Lessor owns less than full title/mineral rights, royalties are reduced proportionally to actual ownership.");
  p("8. OIL AND GAS DEVELOPMENT", true);
  p("Lessee shall diligently develop premises upon discovery; suspension/rental options may apply where gas wells do not produce oil in paying quantities.");
  p("9. OFFSET WELLS", true);
  p(`Lessee shall drill offset wells where adjacent production within ${u(values.offsetFeet, 6)} feet meets lease conditions.`);
  p("10. CONDUCT OF OPERATIONS", true);
  p(u(values.operationsText));
  p("11. TAXES", true);
  p(`Lessee pays taxes on improvements/oil stored and ${u(values.mineralTaxPercent, 4)}% of mineral taxes; Lessor pays real estate taxes and remaining mineral taxes.`);
  p("12. SURFACE USE", true);
  p("Lessor may use surface for agricultural/non-interfering purposes.");
  p("13. DEFAULT", true);
  p(`Upon default, Lessor may terminate after ${u(values.defaultCureDays, 3)} days written notice to cure, subject to retained rights around active wells and access rights as applicable.`);
  p("14. TERMINATION AND REMOVAL", true);
  p("Upon termination, Lessee shall vacate and restore premises (ordinary wear excepted) and may remove equipment/improvements.");
  p("15. ASSIGNMENT", true);
  p("No assignment without prior written consent (not unreasonably withheld) and written notice of assignment.");
  p("16. NOTICES", true);
  p(u(values.noticesText));
  p("17. BINDING EFFECT", true);
  p("This Lease binds and benefits parties and their heirs, executors, administrators, successors, and assigns.");
  p("18. ATTORNEYS' FEES", true);
  p(u(values.attorneysFeesText));
  p("19. ENTIRE AGREEMENT", true);
  p("This Lease is the complete agreement concerning the premises and may be amended only in writing signed by both parties.");
  p("MAKE IT LEGAL / COPIES / ASSISTANCE", true);
  p("This Agreement should be signed before a notary public and delivered/filed as required. Keep copies in a safe place. Seek legal assistance where needed.");
  p("EXECUTION", true);
  p(`LESSOR: ${u(values.lessorSign)}   Date: ${u(values.lessorDate)}`);
  p(`LESSEE: ${u(values.lesseeSign)}   Date: ${u(values.lesseeDate)}`);
  doc.save("gas_lease_agreement.pdf");
};

export default function GasLease() {
  return (
    <FormWizard
      steps={steps}
      title="Gas Lease Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="gaslease"
    />
  );
}
