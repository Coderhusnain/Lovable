import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Event",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name/entity", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "catererName", label: "Caterer name/entity", type: "text", required: true },
      { name: "catererAddress", label: "Caterer address", type: "text", required: true },
      { name: "startDate", label: "Agreement start date", type: "date", required: true },
      { name: "startTime", label: "Start time", type: "text", required: true },
      { name: "endDate", label: "Agreement end date", type: "date", required: true },
      { name: "endTime", label: "End time", type: "text", required: true },
      { name: "eventDate", label: "Event date", type: "date", required: true },
      { name: "eventLocation", label: "Event location", type: "text", required: true },
      { name: "menu", label: "Menu details", type: "textarea", required: true },
    ],
  },
  {
    label: "Payment and Legal",
    fields: [
      { name: "perPersonAmount", label: "Amount per person (USD)", type: "text", required: true },
      { name: "lateRate", label: "Late payment rate", type: "text", required: false },
      { name: "cancelPercent", label: "Cancellation liquidated damages %", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "venueCountyState", label: "Venue county/state", type: "text", required: true },
      { name: "disputeDays", label: "Dispute negotiation/mediation period days", type: "text", required: false, placeholder: "30" },
      { name: "arbitrationBody", label: "Arbitration body", type: "text", required: false, placeholder: "American Arbitration Association" },
      { name: "clientSignName", label: "Client signatory name", type: "text", required: false },
      { name: "clientSignTitle", label: "Client signatory title", type: "text", required: false },
      { name: "clientSignDate", label: "Client sign date", type: "date", required: true },
      { name: "catererSignName", label: "Caterer signatory name", type: "text", required: false },
      { name: "catererSignTitle", label: "Caterer signatory title", type: "text", required: false },
      { name: "catererSignDate", label: "Caterer sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };
  const uf = (label: string, value?: string, min = 16, gap = 1.8) => {
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
  const title = "CATERING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Catering Agreement is made as of ${u(values.effectiveDate, 12)} by and between ${u(values.clientName, 18)} of ${u(values.clientAddress, 18)} ("Client"), and ${u(values.catererName, 18)} of ${u(values.catererAddress, 18)} ("Caterer").`);
  p("1. Term", true);
  p(`Agreement commences ${u(values.startDate, 12)} at ${u(values.startTime, 10)} and remains effective until ${u(values.endDate, 12)} at ${u(values.endTime, 10)}, unless earlier terminated in accordance with this Agreement.`);
  p("1. Term", true);
  p(`1.1 This Agreement shall commence on ${u(values.startDate, 12)} at ${u(values.startTime, 10)} and remain in full force and effect until ${u(values.endDate, 12)} at ${u(values.endTime, 10)}, unless terminated earlier in accordance with this Agreement.`);
  p("1.2 The Agreement may be extended or renewed only by written consent duly executed by both Parties.", false, 3);
  p("2. Engagement of Services", true);
  p("2.1 The Client hereby engages the Caterer to provide professional catering services for the event described herein, and the Caterer accepts such engagement subject to the terms and conditions set forth in this Agreement.");
  p("3. Event Details", true);
  p(`3.1 Event Date: ${u(values.eventDate, 12)}`);
  p(`3.2 Event Location: ${u(values.eventLocation, 24)}`);
  p("3.3 Prices, menu, and preparations are calculated based on the estimated number of attendees provided by the Client. The Caterer shall prepare sufficient food and beverages to adequately serve all attendees, subject to reasonable industry standards.");
  p("4. Menu", true);
  p("4.1 The Caterer reserves the right to make minor substitutions to the agreed menu in the event that certain ingredients are unavailable due to circumstances beyond the Caterer's reasonable control.");
  p(values.menu || "_".repeat(70), false, 3);
  p("5. Consideration and Payment Terms", true);
  p(`5.1 The Client shall pay the Caterer the sum of US $${u(values.perPersonAmount, 14)} per person in cash.`);
  p("5.2 Full payment shall be made on or before the event date. No set-off, deduction, or withholding shall be permitted unless otherwise required by law.");
  p(`5.3 Late Payment Penalty: Any payment not made when due shall accrue interest at the rate of ${u(values.lateRate, 16)} (or the maximum allowable by law, whichever is lower), calculated from the due date until payment is received in full.`);
  p("5.4 The Client shall also be liable for all reasonable collection costs, including attorney's fees and court costs, incurred by the Caterer in recovering overdue amounts.");
  p("6. Additional Services", true);
  p("6.1 Any additional services requested by the Client outside the scope of this Agreement are subject to additional charges.");
  p("6.2 All such requests must be made in writing and acknowledged by the Caterer prior to performance.");
  p("7. Independent Contractor Status", true);
  p("7.1 The Caterer shall perform its obligations as an independent contractor and not as an employee, partner, or agent of the Client.");
  p("7.2 The Caterer shall provide and maintain its own equipment, tools, and staff required for the performance of services.");
  p("8. Force Majeure", true);
  p("8.1 Neither Party shall be held liable for any failure or delay in performance under this Agreement if such failure or delay is caused by events beyond its reasonable control, including acts of God, natural disasters, fire, flood, pandemic, epidemic, public health crisis, storm, vandalism, governmental restrictions, or other unforeseen events.");
  p("8.2 In such cases, obligations shall be suspended for the duration of the event preventing performance.");
  p("9. Cancellation", true);
  p(`9.1 If the Client cancels the event for reasons other than Force Majeure, the Caterer is entitled to liquidated damages of ${u(values.cancelPercent, 10)}% of the total estimated charges.`);
  p("10. Insurance and Indemnification", true);
  p("10.1 The Caterer shall maintain, at its sole expense, general liability insurance in coverage amounts customary for the catering industry.");
  p("10.2 The Client shall indemnify, defend, and hold harmless the Caterer and its employees/agents/subcontractors from claims, losses, damages, theft, or property loss caused by the Client's guests or invitees.");
  p("11. Compliance with Rules and Regulations", true);
  p("11.1 The Caterer shall comply with all applicable laws, regulations, ordinances, and local county health department rules, and maintain industry-standard hygienic and food safety practices at all times.");
  p("12. Assignment", true);
  p("12.1 Neither Party may assign, transfer, or delegate rights/obligations under this Agreement without prior written consent of the other Party.");
  p("12.2 This Agreement is binding upon and inures to the benefit of the Parties and their successors/permitted assigns.");
  p("13. Entire Agreement", true);
  p("13.1 This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, or agreements, oral or written.");
  p("14. Governing Law and Venue", true);
  p(`14.1 This Agreement is governed by and construed in accordance with laws of the State of ${u(values.governingState, 16)}, without regard to conflict-of-laws principles.`);
  p(`14.2 Exclusive venue for any dispute shall be courts located in ${u(values.venueCountyState, 20)}.`);
  p("15. Dispute Resolution", true);
  p(`15.1 Parties shall first attempt good-faith negotiations. 15.2 If unresolved within ${u(values.disputeDays || "30", 6)} days, parties submit to mediation by mutually agreed mediator. 15.3 If mediation fails, dispute shall be resolved by binding arbitration under rules of ${u(values.arbitrationBody || "American Arbitration Association", 20)}; award is final and enforceable.`);
  p("16. Attorney's Fees", true);
  p("16.1 In litigation or arbitration arising out of this Agreement, prevailing Party is entitled to recover reasonable attorney's fees, costs, and expenses.");
  p("17. Execution and Signatures", true);
  p("17.1 This Agreement shall be executed by duly authorized representatives of both Parties.");
  p("17.2 This Agreement shall be effective as of the Effective Date stated above.");
  p("CLIENT: ___________________________");
  uf("Name", values.clientSignName, 18);
  uf("Title", values.clientSignTitle, 18);
  uf("Date", values.clientSignDate, 16);
  p("CATERER: ___________________________");
  uf("Name", values.catererSignName, 18);
  uf("Title", values.catererSignTitle, 18);
  uf("Date", values.catererSignDate, 16);

  doc.save("catering_agreement.pdf");
};

export default function CateringAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Catering Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cateringagreement"
    />
  );
}
