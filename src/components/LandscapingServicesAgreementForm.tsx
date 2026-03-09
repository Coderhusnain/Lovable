import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Worksite",
    fields: [
      { name: "date", label: "Agreement date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor address", type: "text", required: true },
      { name: "commenceDate", label: "Commencement date", type: "date", required: false },
      { name: "servicesDescription", label: "Landscaping services description", type: "textarea", required: true },
      { name: "worksiteAddress", label: "Work site address", type: "text", required: true },
    ],
  },
  {
    label: "Commercial and Legal",
    fields: [
      { name: "cureDays", label: "Default cure days", type: "text", required: false },
      { name: "amount", label: "Payment amount", type: "text", required: false },
      { name: "lateRate", label: "Late payment annual rate", type: "text", required: false },
      { name: "terminationDate", label: "Termination date", type: "date", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "clientSigner", label: "Client signer name", type: "text", required: false },
      { name: "clientSignDate", label: "Client signer date", type: "date", required: false },
      { name: "contractorSigner", label: "Contractor signer name", type: "text", required: false },
      { name: "contractorSignDate", label: "Contractor signer date", type: "date", required: false },
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
  const title = "LANDSCAPING SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Landscaping Services Agreement ("Agreement") is made and entered into as of ${u(values.date, 12)} by and between ${u(values.clientName, 18)}, residing at ${u(values.clientAddress, 18)} (the "Client"), and ${u(values.contractorName, 18)}, having a business address at ${u(values.contractorAddress, 18)} (the "Contractor").`);
  p("1. Description of Services", true);
  p(`Commencing on ${u(values.commenceDate, 12)}, the Contractor agrees to perform landscaping services: ${u(values.servicesDescription, 24)}. Services shall be performed at ${u(values.worksiteAddress, 20)} (the "Work Site").`);
  p("2. Scope of Work", true);
  p("Contractor shall furnish all labor, materials, tools, equipment, and supervision necessary for full and proper performance, including annexed specifications.");
  p("3. Authorization to Work", true);
  p("Client authorizes customary excavation, grading, or other site preparation reasonably required for execution and completion of services.");
  p("4. Site Access", true);
  p("Client shall provide free and unobstructed access, including space for equipment/materials/debris. Contractor shall use reasonable care to avoid damage to existing improvements.");
  p("5. Ownership of Work Product", true);
  p("Work product (copyrightable works, inventions, designs, plans, drawings, and related intellectual property) developed during performance is Client's exclusive property. Contractor shall execute documents to confirm ownership.");
  p("6. Completion and Clean-Up", true);
  p("Upon completion, Contractor shall restore property to prior condition to the extent practicable and leave work areas broom-clean and free of debris/tools/materials/waste.");
  p("7. Indemnification", true);
  p("Contractor shall indemnify, defend, and hold harmless Client from claims/liabilities/losses/damages/costs/expenses (including reasonable attorneys' fees) arising from Contractor acts/omissions/negligence.");
  p("8. Warranty", true);
  p("Contractor warrants services are timely, professional, and workmanlike under prevailing standards equal or higher than similarly situated providers.");
  p("9. Default", true);
  p("Material default includes non-payment, insolvency/bankruptcy, levy/seizure/assignment for creditors, or failure to timely perform and deliver required services.");
  p("10. Remedies", true);
  p(`Non-defaulting Party may issue written notice specifying breach. Breaching Party has ${u(values.cureDays, 6)} days from effective notice to cure. Failure to cure results in automatic termination unless waived in writing.`);
  p("11. Force Majeure", true);
  p("Neither Party is liable for failure/delay caused by events beyond reasonable control, including acts of God, natural disasters, pandemics, quarantines, war, civil unrest, governmental action, or labor strikes.");
  p("12. Payment", true);
  p(`Payment in sum of ${u(values.amount, 10)} is due upon full and satisfactory completion. No discount for early payment. Interest accrues on unpaid amounts at ${u(values.lateRate, 8)} per annum or legal maximum. Client is responsible for collection costs including legal fees and court costs.`);
  p("13. Permits and Approvals | 14. Insurance | 15. Survey and Title", true);
  p("Contractor obtains required permits/licenses/approvals, with costs included in contract price. Contractor maintains General Liability, Workers' Compensation, and Builder's Risk insurance and provides proof upon request. If boundaries are uncertain, property lines may be staked by a licensed surveyor at Client request/expense.");
  p("16. Term and Termination", true);
  p(`Agreement terminates automatically on ${u(values.terminationDate, 12)}, unless extended in writing or earlier terminated for material breach.`);
  p("17. Severability | 18. Amendment | 19. Governing Law | 20. Notice | 21. Waiver | 22. Dispute Resolution | 23. Entire Agreement", true);
  p(`Invalid provisions are severed/limited as needed. Amendments must be in writing and signed. Governing law: State of ${u(values.governingState, 14)}. Notices are by personal delivery/certified mail. Non-enforcement is not waiver. Disputes proceed from negotiation to mediation to legal/equitable remedies. This Agreement supersedes prior understandings.`, false, 3);
  p("24. Execution", true);
  p("CLIENT");
  p("By: ___________________________");
  uf("Name", values.clientSigner, 24);
  uf("Date", values.clientSignDate, 24, 2.6);
  p("CONTRACTOR");
  p("By: ___________________________");
  uf("Name", values.contractorSigner, 24);
  uf("Date", values.contractorSignDate, 24);

  doc.save("landscaping_services_agreement.pdf");
};

export default function LandscapingServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Landscaping Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="landscapingservicesagreement"
    />
  );
}
