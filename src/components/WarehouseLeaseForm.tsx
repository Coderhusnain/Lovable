import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "agreementDate", label: "Agreement date", type: "date", required: true },
    { name: "landlordNameAddress", label: "Landlord full name and address", type: "text", required: true },
    { name: "tenantNameAddress", label: "Tenant full name and address", type: "text", required: true },
  ]},
  { label: "Premises and Financials", fields: [
    { name: "legalDescription", label: "Legal description", type: "textarea", required: true },
    { name: "premisesAddress", label: "Premises address, city, state, ZIP", type: "text", required: true },
    { name: "startDate", label: "Lease start date", type: "date", required: true },
    { name: "endDate", label: "Lease end date", type: "date", required: true },
    { name: "monthlyRent", label: "Monthly rent", type: "text", required: true },
    { name: "paymentAddress", label: "Payment address", type: "text", required: true },
    { name: "securityDeposit", label: "Security deposit", type: "text", required: true },
  ]},
  { label: "Use and Operations", fields: [
    { name: "permittedUse", label: "Permitted use clause", type: "text", required: true },
    { name: "tenantRepairObligations", label: "Tenant repair obligations", type: "text", required: true },
    { name: "utilitiesClause", label: "Utilities/services clause", type: "text", required: true },
    { name: "latePaymentDays", label: "Late payment grace days", type: "text", required: true },
    { name: "lateFee", label: "Late fee amount", type: "text", required: true },
  ]},
  { label: "Defaults and Legal Clauses", fields: [
    { name: "cureDaysFinancial", label: "Financial default cure days", type: "text", required: true },
    { name: "cureDaysOther", label: "Other default cure days", type: "text", required: true },
    { name: "returnedPaymentFeeText", label: "Returned payment fee clause", type: "text", required: true },
    { name: "hazardousClause", label: "Hazardous materials clause", type: "text", required: true },
    { name: "landlordNoticeAddress", label: "Landlord notice address", type: "text", required: true },
    { name: "tenantNoticeAddress", label: "Tenant notice address", type: "text", required: true },
  ]},
  { label: "Termination and Miscellaneous", fields: [
    { name: "saleTerminationNotice", label: "Termination due to sale notice days", type: "text", required: true },
    { name: "casualtyNotice", label: "Casualty termination notice days", type: "text", required: true },
    { name: "condemnationNotice", label: "Condemnation termination notice days", type: "text", required: true },
    { name: "entireAgreementClause", label: "Entire agreement / amendments / severability / waiver", type: "textarea", required: true },
    { name: "makeItLegalNote", label: "Make It Legal / Copies / Additional Assistance note", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "landlordSign", label: "Landlord signature", type: "text", required: true },
    { name: "landlordName", label: "Landlord printed name", type: "text", required: true },
    { name: "landlordDate", label: "Landlord date", type: "date", required: true },
    { name: "tenantSign", label: "Tenant signature", type: "text", required: true },
    { name: "tenantName", label: "Tenant printed name", type: "text", required: true },
    { name: "tenantDate", label: "Tenant date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const width = 170;
  const u = (s?: string, n = 22) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "WAREHOUSE LEASE AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`This Warehouse Lease Agreement is entered into on ${u(v.agreementDate)} by and between ${u(v.landlordNameAddress)} ("Landlord"), and ${u(v.tenantNameAddress)} ("Tenant").`);
  add("1. Leased Premises", true);
  add(`Landlord leases property described as ${u(v.legalDescription)}, located at ${u(v.premisesAddress)} (the "Premises"), under terms of this Agreement.`);
  add("2. Lease Term", true);
  add(`Term commences on ${u(v.startDate)} and expires on ${u(v.endDate)}, unless earlier terminated.`);
  add("3. Rental Payments", true);
  add(`Monthly rent: $${u(v.monthlyRent, 8)} due in advance on/before first day each month. Payment address: ${u(v.paymentAddress)}.`);
  add("4. Security Deposit", true);
  add(`Security deposit: $${u(v.securityDeposit, 8)} held in trust for performance and damages beyond reasonable wear and tear.`);
  add("5. Possession and Surrender", true);
  add("Tenant receives possession at commencement and surrenders at expiration/termination in good condition, ordinary wear and tear excepted.");
  add("6. Permitted Use", true);
  add(u(v.permittedUse));
  add("7. Condition of Premises", true);
  add("Tenant accepts premises in as-is condition after inspection opportunity, and shall notify landlord of material deterioration.");
  add("8. Insurance Obligations", true);
  add("Each party maintains insurance appropriate to its interest and provides proof upon request.");
  add("9. Maintenance and Repairs", true);
  add(`Landlord maintains structural elements, roof, and common areas. Tenant is responsible for damage caused by operations/personnel and: ${u(v.tenantRepairObligations)}.`);
  add("10. Utilities and Services", true);
  add(u(v.utilitiesClause));
  add("11. Real Estate Taxes", true);
  add("Landlord is solely responsible for real estate taxes/assessments/charges.");
  add("12. Termination Due to Sale", true);
  add(`Landlord may terminate with ${u(v.saleTerminationNotice, 3)} days written notice upon sale to third party.`);
  add("13. Casualty or Condemnation", true);
  add(`Landlord may repair or terminate with ${u(v.casualtyNotice, 3)} days notice. In condemnation/non-feasible repair, either party may terminate with ${u(v.condemnationNotice, 3)} days notice.`);
  add("14. Tenant Default", true);
  add(`Tenant has ${u(v.cureDaysFinancial, 3)} days to cure financial default and ${u(v.cureDaysOther, 3)} days to cure other breaches after written notice.`);
  add("15. Late Payments", true);
  add(`Late fee of $${u(v.lateFee, 6)} applies after ${u(v.latePaymentDays, 3)} days past due date.`);
  add("16. Holdover", true);
  add("Holdover without written consent converts to month-to-month at 150% of prior monthly rent.");
  add("17. Returned Payments", true);
  add(u(v.returnedPaymentFeeText));
  add("18. Improvements and Alterations", true);
  add("No alterations without prior written approval. Tenant bears cost and removes/restores improvements if requested.");
  add("19. Access by Landlord", true);
  add("Landlord may enter on reasonable notice during business hours; emergency entry without notice; final 90 days includes showing and For Lease signs.");
  add("20. Prohibited Items and Hazardous Materials", true);
  add(u(v.hazardousClause));
  add("21. Mechanics' Liens", true);
  add("Tenant shall not permit liens and shall promptly discharge any lien filed.");
  add("22. Subordination", true);
  add("Lease is subordinate to current/future mortgages on premises.");
  add("23. Assignment and Subletting", true);
  add("No assignment/sublease/third-party use without Landlord written consent.");
  add("24. Notice", true);
  add(`Landlord notice address: ${u(v.landlordNoticeAddress)}. Tenant notice address: ${u(v.tenantNoticeAddress)}. Notices deemed received three business days after mailing.`);
  add("25. Governing Law", true);
  add(`This Lease is governed by laws of the State of ${u(v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}.`);
  add("26. ENTIRE AGREEMENT", true);
  add(u(v.entireAgreementClause));
  add("27. AMENDMENTS", true);
  add("Any amendments to this Lease must be in writing and signed by both Parties.");
  add("28. SEVERABILITY", true);
  add("If any provision is invalid or unenforceable, the remainder remains in full force and effect; if curable by limitation, it shall be construed accordingly.");
  add("29. WAIVER", true);
  add("Failure by either Party to enforce any provision does not constitute waiver of such provision or future enforcement rights.");
  add("30. BINDING EFFECT", true);
  add("This Lease binds and benefits the Parties and their respective heirs, successors, and permitted assigns.");
  add("31. Execution", true);
  add(`LANDLORD Signature: ${u(v.landlordSign)} | Name: ${u(v.landlordName)} | Date: ${u(v.landlordDate)}`);
  add(`TENANT Signature: ${u(v.tenantSign)} | Name: ${u(v.tenantName)} | Date: ${u(v.tenantDate)}`);
  add("Make It Legal / Copies / Additional Assistance", true);
  add(u(v.makeItLegalNote));

  doc.save("warehouse_lease_agreement.pdf");
};

export default function WarehouseLease() {
  return (
    <FormWizard
      steps={steps}
      title="Warehouse Lease Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="warehouselease"
    />
  );
}

