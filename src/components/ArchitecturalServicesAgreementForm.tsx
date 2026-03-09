import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Core Terms",
    fields: [
      { name: "date", label: "Agreement date", type: "date", required: true },
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyAAddress", label: "Party A address", type: "text", required: true },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBAddress", label: "Party B address", type: "text", required: true },
      { name: "architectName", label: "Architect name", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "commenceDate", label: "Services commencement date", type: "date", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
    ],
  },
  {
    label: "Commercial and Legal",
    fields: [
      { name: "paymentAmount", label: "Total payment amount", type: "text", required: true },
      { name: "discountAmount", label: "Early payment discount amount", type: "text", required: false },
      { name: "lateInterest", label: "Late payment annual interest", type: "text", required: false },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "workProductOwner", label: "Work product owner (Client or Architect)", type: "text", required: true },
      { name: "additionalCompTerms", label: "Additional services compensation terms", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignName", label: "Client signatory name", type: "text", required: true },
      { name: "clientSignDate", label: "Client sign date", type: "date", required: true },
      { name: "architectSignName", label: "Architect signatory name", type: "text", required: true },
      { name: "architectSignDate", label: "Architect sign date", type: "date", required: true },
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
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
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
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "ARCHITECTURAL SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Architectural Services Agreement is made as of ${u(values.date, 12)}, by and between ${u(values.partyAName, 18)} of ${u(values.partyAAddress, 18)}, and ${u(values.partyBName, 18)} of ${u(values.partyBAddress, 18)} (collectively, the "Parties").`);
  p("1. Description of Services", true);
  p(`Commencing on ${u(values.commenceDate, 12)}, ${u(values.architectName, 18)} (the "Architect") shall provide architectural services to ${u(values.clientName, 18)} (the "Client"), including shell/core design architectural, site planning, and engineering services.`);
  p("2. Phases of Services", true);
  p("Schematic Design: review Client documentation and confirm project requirements.");
  p("Design Development: prepare drawings/specs/preliminary plans and advise on preliminary construction costs.");
  p("Construction Documents: prepare detailed documents, advise anticipated costs, assist approvals.");
  p("Bidding/Negotiation: assist obtaining bids/proposals and award of construction contracts.");
  p("Construction Administration: administer conditions, inspect work, reject non-compliant work; Architect does not control contractor means/methods/safety.", false, 3);
  p("3. Additional Services", true);
  p("Upon written Client request, Architect may provide additional services including extended planning, consultant selection, substitutions evaluation, and revisions due to Client-directed changes. Client compensates such services under Section 10.");
  p("4. Payment", true);
  p(`Client shall pay total ${u(values.paymentAmount, 14)} upon completion. Discount ${u(values.discountAmount, 14)} if paid within agreed period. Late payment interest ${u(values.lateInterest, 14)} per annum or legal maximum. Client bears collection costs and attorneys' fees. Non-payment is material breach.`);
  p("5. Warranty", true);
  p("Architect warrants services are timely, professional, and with customary standard of care for comparable projects.");
  p("6. Default", true);
  p("Material default includes non-payment, insolvency/receivership, levy/assignment for creditors, and failure to deliver services in required time/manner.");
  p("7. Remedies", true);
  p(`Non-defaulting Party may serve written notice; defaulting Party has ${u(values.cureDays, 8)} days to cure, failing which Agreement may terminate unless waived in writing.`);
  p("8. Force Majeure", true);
  p("Performance delay/prevention from events beyond reasonable control excuses performance during event, with prompt written notice and reasonable efforts to resume.");
  p("9. Confidentiality", true);
  p("Parties maintain confidentiality of proprietary/sensitive information; return/destroy confidential materials on termination; obligations survive.");
  p("10. Indemnification", true);
  p("Each Party indemnifies the other from claims/losses/expenses arising from negligent acts/omissions.");
  p("11. No Mechanic's Lien", true);
  p("Architect shall ensure no mechanic's lien by its employees/subcontractors/consultants and certify claims satisfied upon final payment.");
  p("12. Compensation for Additional Services", true);
  p(values.additionalCompTerms || "_".repeat(70));
  p("13. Client Responsibilities", true);
  p("Client provides complete/timely project information and legal/regulatory documentation for approvals.");
  p("14. Term", true);
  p(`Agreement terminates on ${u(values.terminationDate, 16)}, unless extended or earlier terminated.`);
  p("15. Work Product Ownership", true);
  p(`All intellectual property/work product prepared under this Agreement remains ${u(values.workProductOwner, 24)} exclusive property.`);
  p("16. Arbitration", true);
  p("Disputes shall be resolved by binding AAA arbitration; award final/enforceable; punitive damages not awardable; agreement terms may not be altered by arbitrators.");
  p("17-22. Final Clauses", true);
  p(`Severability, amendment in writing, governing law of ${u(values.governingState, 16)}, notice in writing, no waiver by non-enforcement, and entire agreement apply.`, false, 3);
  p("23. Execution", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.");
  p("CLIENT");
  p("By: ___________________________");
  uf("Name", values.clientSignName, 22);
  uf("Date", values.clientSignDate, 22);
  p("ARCHITECT");
  p("By: ___________________________");
  uf("Name", values.architectSignName, 22);
  uf("Date", values.architectSignDate, 22);

  doc.save("architectural_services_agreement.pdf");
};

export default function ArchitecturalServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Architectural Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="architecturalservicesagreement"
    />
  );
}
