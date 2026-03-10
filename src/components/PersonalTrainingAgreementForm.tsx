import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Package",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "trainerName", label: "Trainer name", type: "text", required: true },
      { name: "sessionMinutes", label: "Session duration minutes", type: "text", required: true },
      { name: "sessionCount", label: "Training package session count", type: "text", required: true },
      { name: "sessionRate", label: "Rate per session", type: "text", required: true },
      { name: "unusedForfeitDays", label: "Unused session forfeit days", type: "text", required: true },
      { name: "lateArrivalMinutes", label: "Late/no-show threshold minutes", type: "text", required: true },
      { name: "depositAmount", label: "Non-refundable deposit", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "PERSONAL TRAINING AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Personal Training Agreement is made as of ${v.effectiveDate || "__________"} between Client ${v.clientName || "__________"} and Trainer ${v.trainerName || "__________"}.`);
  p("1. PURPOSE AND SCOPE OF SERVICES", true);
  p(`Trainer provides personal fitness training services and customized programming. Each session is approximately ${v.sessionMinutes || "____"} minutes.`);
  p("2. ACKNOWLEDGMENT OF RISK AND DISCLOSURE", true);
  p("Client acknowledges inherent physical risk, confirms informed consent/risk release, and confirms medical conditions are disclosed.");
  p("3. TRAINING PACKAGES AND FEES", true);
  p(`Client selected ${v.sessionCount || "____"} sessions at $${v.sessionRate || "____"} per session. 50% due before first session, balance by final session or 45 days from first session.`);
  p(`Unused sessions after ${v.unusedForfeitDays || "____"} days from Effective Date are forfeited without refund.`);
  p("4. CANCELLATION AND NO-SHOW POLICY", true);
  p(`Client must provide at least 24-hour notice to cancel/reschedule. Arrival more than ${v.lateArrivalMinutes || "____"} minutes late may forfeit session and be charged in full.`);
  p("5. DEPOSIT", true);
  p(`Non-refundable deposit of $${v.depositAmount || "____"} secures Trainer availability; refundable only if Trainer cancels due to Trainer's inability to perform.`);
  p("6. TERM AND TERMINATION", true);
  p(`Agreement continues through package completion unless terminated. Either Party may terminate with ${v.terminationNoticeDays || "30"} days written notice.`);
  p("Client termination forfeits unused sessions; trainer termination refunds unused session fees.");
  p("7. WAIVER, RELEASE, AND INDEMNIFICATION", true);
  p("Client assumes risks and releases/indemnifies trainer for claims arising from training participation, including non-disclosed medical conditions.");
  p("8-18. Additional Legal Terms", true);
  p("Independent contractor status; legal compliance; force majeure; assignment restrictions; severability; entire agreement; written amendments; binding arbitration (AAA); attorneys' fees.");
  p(`Governing law: ${v.governingLawState || "________________________"}.`);
  p("SIGNATURES: Trainer and Client sign name/date lines.");
  doc.save("personal_training_agreement.pdf");
};

export default function PersonalTrainingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Personal Training Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="personaltrainingagreement"
    />
  );
}

