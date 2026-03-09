import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Services",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "serviceRecipientName", label: "Service recipient name", type: "text", required: true },
      { name: "serviceRecipientAddress", label: "Service recipient address", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor address", type: "text", required: true },
      { name: "startDate", label: "Start date", type: "date", required: true },
      { name: "completionDate", label: "Completion date", type: "date", required: true },
      { name: "serviceDescription", label: "Detailed service description", type: "textarea", required: true },
      { name: "projectAddress", label: "Project address", type: "text", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
    ],
  },
  {
    label: "Payment and Legal",
    fields: [
      { name: "paymentAmount", label: "Payment amount", type: "text", required: true },
      { name: "promptDiscount", label: "Prompt payment discount", type: "text", required: false },
      { name: "discountDays", label: "Discount days", type: "text", required: false },
      { name: "lateRate", label: "Late interest per annum", type: "text", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "arbitrationVenue", label: "Arbitration venue", type: "text", required: false },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "serviceRecipientSignName", label: "Service recipient signatory name", type: "text", required: false },
      { name: "serviceRecipientSignDate", label: "Service recipient sign date", type: "date", required: true },
      { name: "contractorSignName", label: "Contractor signatory name", type: "text", required: false },
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
  const title = "FLOORING SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Flooring Services Agreement ("Agreement") is entered into and effective as of ${values.effectiveDate || "[Effective Date]"}, by and between ${values.serviceRecipientName || "[Service Recipient Name]"}, of ${values.serviceRecipientAddress || "[Service Recipient Address]"} ("Service Recipient"), and ${values.contractorName || "[Contractor Name]"}, of ${values.contractorAddress || "[Contractor Address]"} ("Contractor").`);
  p('Collectively referred to as the "Parties" and individually as a "Party."', false, 3);
  p("1. Description of Services", true);
  p(`Commencing on ${values.startDate || "[Start Date]"}, Contractor shall perform flooring services for Service Recipient: ${values.serviceDescription || "[Insert detailed service description]"}.`);
  p(`All Services shall be completed on or before ${values.completionDate || "[Completion Date]"}.`, false, 3);
  p("2. Scope of Work", true);
  p("Contractor shall furnish necessary labor, materials, equipment, and expertise. Drawings/specifications executed by Parties are incorporated by reference.");
  p(`Installation shall occur at ${values.projectAddress || "[Project Address]"}.`);
  p("Contractor further agrees to perform flooring installation services on ongoing basis as requested during term in accordance with specifications.", false, 3);
  p("3. Payment", true);
  p(`Payment of ${values.paymentAmount || "<insert amount>"} shall be made upon satisfactory completion of Services.`);
  p(`Prompt payment discount of ${values.promptDiscount || "<insert amount>"} applies if full invoice paid within ${values.discountDays || "0"} days.`);
  p(`Interest accrues on overdue sums at ${values.lateRate || "<insert amount>"} per annum or maximum lawful rate, whichever is lower.`);
  p("Service Recipient bears collection costs including reasonable attorneys' fees and related expenses.");
  p("Non-payment is material breach and Contractor may terminate and/or pursue legal remedies.", false, 3);
  p("4. Term", true);
  p(`Agreement terminates automatically on ${values.terminationDate || "[Termination Date]"}, unless earlier terminated under terms or extended by mutual written agreement.`, false, 3);
  p("5. Ownership of Work Product", true);
  p("Any copyrightable works, ideas, inventions, designs, plans, products, or other Work Product developed in connection with Services shall be exclusive property of Service Recipient. Contractor shall execute documents needed to confirm/perfect ownership.", false, 3);
  p("6. Permits and Regulatory Approvals", true);
  p("Contractor shall obtain permits, licenses, and approvals required by municipal/county authorities. Cost of approvals is included in agreed project price.", false, 3);
  p("7. Insurance", true);
  p("Contractor shall maintain General Liability, Workers' Compensation (if applicable), and Builder's Risk insurance at sole cost throughout term, and provide evidence on request.", false, 3);
  p("8. Warranty", true);
  p("Contractor warrants Services are performed timely, professionally, and workmanlike per prevailing standards and best practices in Service Recipient's region; materials furnished shall be good quality and suitable for intended use.", false, 3);
  p("9. Indemnification", true);
  p("Contractor shall indemnify, defend, and hold harmless Service Recipient against claims, damages, losses, liabilities, expenses, and legal fees arising from acts/omissions/negligence of Contractor or its employees/agents/subcontractors in connection with Services.", false, 3);
  p("10. Default", true);
  p("Material default includes failure to make payment when due, insolvency/bankruptcy of either Party, attachment/levy against either Party property, and failure to deliver/perform Services per Agreement.", false, 3);
  p("11. Remedies", true);
  p(`On default, non-defaulting Party may issue written notice detailing default. Defaulting Party has ${values.cureDays || "<insert days>"} days to cure. If not cured (unless waived in writing), Agreement terminates automatically and non-defaulting Party may seek all legal/equitable remedies.`, false, 3);
  p("12. Force Majeure", true);
  p("Neither Party liable for delay/failure caused by events beyond reasonable control, including acts of God, epidemic/pandemic/public health emergencies, government orders, strikes, war, civil unrest, or natural disasters. Affected Party shall notify promptly and resume when event ceases.", false, 3);
  p("13. Arbitration", true);
  p(`Disputes arising under/related to Agreement resolved by binding arbitration under AAA Commercial Arbitration Rules. Each Party appoints one arbitrator; two arbitrators appoint a third presiding arbitrator. Arbitration is conducted at mutually agreed or centrally located venue${values.arbitrationVenue ? ` (${values.arbitrationVenue})` : ""}. Relevant documentation exchanged within 30 days of notice. Arbitrators may not modify Agreement or award punitive damages. Final decision is binding and enforceable in court.`);
  p("14. Entire Agreement", true);
  p("Agreement constitutes entire understanding and supersedes prior written/oral agreements on subject matter.");
  p("15. Severability", true);
  p("If any provision is invalid/unenforceable, remaining provisions continue in full force and effect; limiting construction applied where possible.");
  p("16. Amendment", true);
  p("No amendment/modification is valid unless in writing and signed by Party to be bound.");
  p("17. Governing Law", true);
  p(`Agreement governed by laws of State of ${values.governingState || "[Insert State]"}, without conflict-of-laws principles.`);
  p("18. Notice", true);
  p("Notices/communications required under Agreement delivered personally or by certified mail, return receipt requested, to addresses above or designated in writing.");
  p("19. Waiver", true);
  p("Failure to enforce any provision is not waiver of future enforcement of that or any other provision.");
  p("20. Execution", true);
  p("IN WITNESS WHEREOF, Parties executed this Agreement as of Effective Date first written above.");
  p("Service Recipient", true, 1);
  p("By: ____________________________");
  uf("Name", values.serviceRecipientSignName, 22);
  uf("Date", values.serviceRecipientSignDate, 22, 2.2);
  p("Contractor", true, 1);
  p("By: ____________________________");
  uf("Name", values.contractorSignName, 22);
  uf("Date", values.contractorSignDate, 22);

  doc.save("flooring_services_agreement.pdf");
};

export default function FlooringServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Flooring Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="flooringservicesagreement"
    />
  );
}
