import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Effective Date", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "recipientName", label: "Recipient name", type: "text", required: true },
    { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
    { name: "providerName", label: "Provider name", type: "text", required: true },
    { name: "providerAddress", label: "Provider address", type: "text", required: true },
  ]},
  { label: "System and Service Definitions", fields: [
    { name: "computerSystemDef", label: "Computer system definition", type: "textarea", required: true },
    { name: "servicesDef", label: "Services definition", type: "textarea", required: true },
  ]},
  { label: "Operations and Uptime", fields: [
    { name: "uptimePercent", label: "Required uptime percent", type: "text", required: true },
    { name: "hoursFrom", label: "Operating hours from", type: "text", required: true },
    { name: "hoursTo", label: "Operating hours to", type: "text", required: true },
    { name: "maintenancePlan", label: "Preventive/remedial maintenance plan", type: "textarea", required: true },
  ]},
  { label: "Commercial Terms", fields: [
    { name: "cureDays", label: "Default cure days", type: "text", required: true },
    { name: "liquidatedDamages", label: "Liquidated damages per uptime point", type: "text", required: true },
    { name: "paymentTo", label: "Payment to", type: "text", required: true },
    { name: "paymentAmount", label: "Payment amount", type: "text", required: true },
    { name: "discountPercent", label: "Early payment discount percent", type: "text", required: true },
    { name: "discountDays", label: "Discount days", type: "text", required: true },
    { name: "lateInterestPercent", label: "Late interest percent", type: "text", required: true },
  ]},
  { label: "Legal Clauses", fields: [
    { name: "terminationDate", label: "Termination date", type: "text", required: true },
    { name: "earlyTerminationDays", label: "Early termination notice days", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    { name: "courtVenue", label: "Court venue", type: "text", required: true },
  ]},
  { label: "Signatories", fields: [
    { name: "recipientSign", label: "Recipient signature name", type: "text", required: true },
    { name: "recipientDate", label: "Recipient date", type: "date", required: true },
    { name: "providerSign", label: "Provider signature name", type: "text", required: true },
    { name: "providerDate", label: "Provider date", type: "date", required: true },
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
  const title = "IT SERVICES AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`This IT Services Agreement is made effective as of ${u(values.effectiveDate)}, by and between ${u(values.recipientName)} of ${u(values.recipientAddress)} ("Recipient"), and ${u(values.providerName)} of ${u(values.providerAddress)} ("Provider").`);
  p("Whereas, the Recipient is the owner, lessor, or licensee of a certain Computer System and desires the Provider to perform technical and operational services; and Whereas, the Provider desires to provide such services under this Agreement.");
  p("1. DEFINITIONS", true);
  p(`(a) "Computer System" includes hardware/software and related equipment as described: ${u(values.computerSystemDef)}.`);
  p(`(b) "Services" means Operation, Maintenance, and Management services: ${u(values.servicesDef)}.`);
  p(`(c) "Operation" includes data manipulation, output/display, and internal/network communications.`);
  p(`(d) "Maintenance" includes preventive/remedial maintenance, diagnostics, repairs, replacement of defective components, and optimization.`);
  p(`(e) "Management" includes scheduling system use, sourcing supplies/spare parts, and recommendations for updates.`);
  p(`(f) "Uptime" means availability during scheduled operating hours.`);
  p("2. DESCRIPTION OF SERVICES", true);
  p(`(a) Provider shall perform all Services using qualified personnel acceptable to Recipient.`);
  p(`(b) Uptime commitment is ${u(values.uptimePercent, 4)} percent during ${u(values.hoursFrom, 5)} to ${u(values.hoursTo, 5)}, Monday through Friday, excluding legal holidays.`);
  p(`(c) Preventive and remedial maintenance shall be handled as follows: ${u(values.maintenancePlan)}.`);
  p("3. WARRANTY", true);
  p(`Provider warrants that services will be timely and workmanlike, workmanship will be of acceptable quality, and system performance will conform to agreed specifications.`);
  p(`Warranty Disclaimer: except as expressly provided, Provider disclaims implied warranties including merchantability, fitness for a particular purpose, quality, accuracy, non-infringement, title, marketability, profitability, suitability, and warranties from course of dealing/usage of trade.`);
  p("4. DEFAULT", true);
  p(`Material default includes failure to pay when due, insolvency/bankruptcy, seizure/assignment of assets, or failure to perform services as required.`);
  p("5. REMEDIES", true);
  p(`Upon default, non-defaulting party gives written notice; defaulting party has ${u(values.cureDays, 3)} days to cure. Failure to cure results in termination unless waived.`);
  p(`Upon termination, Provider may declare outstanding amounts due, reclaim unpaid equipment/materials, cease services, and enforce liquidated damages where applicable.`);
  p("6. LIQUIDATED DAMAGES", true);
  p(`If Provider fails required uptime, Provider shall pay ${u(values.liquidatedDamages)} for each percentage point below required uptime, calculated weekly and credited monthly.`);
  p("7. ALTERNATIVE DISPUTE RESOLUTION", true);
  p("Parties shall first attempt good-faith negotiation, then mediation, as a prerequisite to litigation.");
  p("8. RELATIONSHIP OF THE PARTIES", true);
  p("Provider is an independent contractor and solely responsible for payroll taxes, benefits, workers' compensation, and liability coverage.");
  p("9. WORK PRODUCT OWNERSHIP", true);
  p("All work product created in connection with services is the exclusive property of Recipient. Provider shall execute documents to perfect ownership.");
  p("10. CONFIDENTIALITY", true);
  p("Provider shall not disclose/use Recipient confidential information except to perform services. Obligation survives termination and requires return of documents/materials.");
  p("11. INDEMNIFICATION", true);
  p("Provider shall indemnify and hold harmless Recipient from claims/losses/damages/costs/attorney fees arising from Provider acts/omissions.");
  p("12. PAYMENT", true);
  p(`Payment shall be made to ${u(values.paymentTo)} in the amount of $${u(values.paymentAmount, 8)} upon completion of services. Discount ${u(values.discountPercent, 3)}% applies if paid within ${u(values.discountDays, 3)} days. Late payments accrue ${u(values.lateInterestPercent, 4)}% annually or legal maximum, and collection costs/attorneys' fees apply.`);
  p("13. TERM", true);
  p(`Agreement begins on Effective Date and continues until ${u(values.terminationDate)} unless terminated earlier.`);
  p("14. TERMINATION", true);
  p(`Either party may terminate with or without cause upon ${u(values.earlyTerminationDays, 3)} days written notice.`);
  p("15. ATTORNEYS' FEES", true);
  p("Prevailing party in enforcement/interpretation action is entitled to reasonable attorneys' fees and costs.");
  p("16. ENTIRE AGREEMENT", true);
  p("This Agreement is the complete and exclusive agreement, superseding prior oral/written agreements.");
  p("17. SEVERABILITY", true);
  p("Invalid provisions are modified only as necessary and remainder stays in full force.");
  p("18. AMENDMENT", true);
  p("Amendments must be in writing and signed by both parties.");
  p("19. GOVERNING LAW", true);
  p(`Governing law is ${u(values.governingLawState)}. Exclusive venue is ${u(values.courtVenue)}.`);
  p("20. NOTICE", true);
  p("Notices may be by personal delivery, certified/registered mail, courier with tracking, or email followed by physical delivery within three business days.");
  p("21. WAIVER", true);
  p("No failure to enforce constitutes waiver. Waivers must be in writing.");
  p("22. ASSIGNMENT", true);
  p("No assignment/transfer without prior written consent of non-assigning party; unauthorized assignment is void.");
  p("23. SIGNATORIES", true);
  p(`RECIPIENT: ${u(values.recipientSign)}   Date: ${u(values.recipientDate)}`);
  p(`PROVIDER: ${u(values.providerSign)}   Date: ${u(values.providerDate)}`);
  doc.save("it_services_agreement.pdf");
};

export default function ITServiceAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="IT Services Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="itserviceagreement"
    />
  );
}
