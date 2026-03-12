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
    { name: "clientName", label: "Client name", type: "text", required: true },
    { name: "clientAddress", label: "Client address", type: "text", required: true },
    { name: "designerName", label: "Designer name", type: "text", required: true },
    { name: "designerAddress", label: "Designer address", type: "text", required: true },
  ]},
  { label: "Services", fields: [
    { name: "startDate", label: "Service start date", type: "date", required: true },
    { name: "completionDate", label: "Completion date", type: "date", required: true },
    { name: "projectAddress", label: "Project address", type: "text", required: true },
    { name: "servicesDescription", label: "Description of design services", type: "textarea", required: true },
  ]},
  { label: "Payment and Term", fields: [
    { name: "totalAmount", label: "Total payment amount", type: "text", required: true },
    { name: "paymentAddress", label: "Payment address", type: "text", required: true },
    { name: "lateInterest", label: "Late interest per annum", type: "text", required: true },
    { name: "terminationDate", label: "Termination date", type: "date", required: true },
  ]},
  { label: "Core Legal Terms", fields: [
    { name: "cureDays", label: "Default cure days", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    { name: "forceMajeureText", label: "Force majeure text", type: "textarea", required: true },
  ]},
  { label: "Additional Legal Clauses", fields: [
    { name: "ownershipText", label: "Work product ownership clause", type: "textarea", required: true },
    { name: "confidentialityText", label: "Confidentiality clause", type: "textarea", required: true },
    { name: "arbitrationText", label: "Arbitration clause", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "clientSign", label: "Client signature name", type: "text", required: true },
    { name: "clientDate", label: "Client date", type: "date", required: true },
    { name: "designerSign", label: "Designer signature name", type: "text", required: true },
    { name: "designerDate", label: "Designer date", type: "date", required: true },
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
  const title = "INTERIOR DESIGN SERVICES AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`This Interior Design Contract is made effective as of ${u(values.effectiveDate)} by and between ${u(values.clientName)} of ${u(values.clientAddress)} ("Client") and ${u(values.designerName)} of ${u(values.designerAddress)} ("Designer").`);
  p("1. Purpose", true);
  p("WHEREAS the Designer is professionally engaged in interior design services and Client desires to engage Designer under this Contract.");
  p("2. Description of Services", true);
  p(`Beginning on ${u(values.startDate)}, Designer shall perform: ${u(values.servicesDescription)}. Services shall be completed on or before ${u(values.completionDate)} at ${u(values.projectAddress)}.`);
  p("3. Payment", true);
  p(`Client agrees to pay total amount of $${u(values.totalAmount, 8)} upon completion of services, payable to Designer at ${u(values.paymentAddress)}.`);
  p(`No discount applies for early payment. Interest accrues on overdue amounts at ${u(values.lateInterest, 5)} per annum or legal maximum. Client is responsible for collection costs and attorney fees. Failure to pay is material breach.`);
  p("4. Term", true);
  p(`This Contract automatically terminates on ${u(values.terminationDate)}, unless earlier terminated as provided herein.`);
  p("5. Ownership of Work Product", true);
  p(u(values.ownershipText));
  p("6. Confidentiality", true);
  p(u(values.confidentialityText));
  p("7. Indemnification", true);
  p("Designer agrees to indemnify and hold Client harmless from all claims, losses, liabilities, and expenses arising from Designer's performance.");
  p("8. Warranty", true);
  p("Designer warrants timely, professional, and workmanlike services consistent with prevailing standards and best practices.");
  p("9. Default", true);
  p("Material default includes non-payment, bankruptcy/insolvency, seizure/assignment of assets, or failure to perform services as required.");
  p("10. Remedies", true);
  p(`Aggrieved party may give written notice identifying breach; breaching party has ${u(values.cureDays, 3)} days to cure. Failure to cure results in automatic termination unless waived.`);
  p("11. Force Majeure", true);
  p(u(values.forceMajeureText));
  p("12. Arbitration", true);
  p(u(values.arbitrationText));
  p("13. Entire Agreement", true);
  p("This Contract contains the entire agreement and supersedes prior oral/written communications.");
  p("14. Severability", true);
  p("If any provision is invalid or unenforceable, the remainder continues in full force and effect.");
  p("15. Amendment", true);
  p("No amendment is valid unless in writing and signed by the party against whom enforcement is sought.");
  p("16. Governing Law", true);
  p(`This Contract is governed by laws of ${u(values.governingLawState)}.`);
  p("17. Notice", true);
  p("Notices must be delivered personally or by certified mail, return receipt requested, to the listed addresses unless modified in writing.");
  p("18. Waiver", true);
  p("Failure to enforce any provision is not a waiver of that provision or any other.");
  p("19. Execution", true);
  p(`CLIENT: ${u(values.clientSign)}   Date: ${u(values.clientDate)}`);
  p(`DESIGNER: ${u(values.designerSign)}   Date: ${u(values.designerDate)}`);
  doc.save("interior_design_services_agreement.pdf");
};

export default function InteriorDesignAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Interior Design Services Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="interiordesignagreement"
    />
  );
}
