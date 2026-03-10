import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Tutoring Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "tutorName", label: "Tutor name", type: "text", required: true },
      { name: "tutorAddress", label: "Tutor address", type: "text", required: true },
      { name: "parentName", label: "Parent/Guardian name", type: "text", required: true },
      { name: "parentAddress", label: "Parent address", type: "text", required: true },
      { name: "startDate", label: "Start date", type: "date", required: true },
      { name: "studentNames", label: "Student name(s)", type: "text", required: true },
      { name: "location", label: "Tutoring location", type: "text", required: true },
      { name: "schedule", label: "Days/times/duration", type: "text", required: true },
      { name: "compensation", label: "Compensation amount", type: "text", required: true },
      { name: "paymentMethod", label: "Payment method", type: "text", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "TUTORING AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Tutoring Agreement is made as of ${v.effectiveDate || "[________]"} between Tutor ${v.tutorName || "[Tutor Name]"} (${v.tutorAddress || "[Address]"}) and Parent ${v.parentName || "[Parent/Guardian Name]"} (${v.parentAddress || "[Address]"}).`);
  p("1. DESCRIPTION OF SERVICES", true);
  p(`Commencing ${v.startDate || "[Start Date]"}, Tutor provides academic tutoring to ${v.studentNames || "[Student Name(s)]"} at ${v.location || "[Location]"} per schedule ${v.schedule || "[Days, Times, Duration]"}, professionally and consistent with accepted tutoring standards.`);
  p("2. COMPENSATION", true);
  p(`Parent compensates Tutor ${v.compensation || "[Amount]"} via ${v.paymentMethod || "[method of payment]"}; payment due upon completion unless otherwise written; no extra reimbursement unless pre-approved in writing.`);
  p("Tutor solely responsible for all applicable taxes and payroll-related obligations.");
  p("3. TERM", true);
  p(`Agreement commences on Effective Date and continues until completion/termination date ${v.terminationDate || "[Termination Date]"}, unless earlier terminated.`);
  p("4-12. TERMINATION / INDEPENDENT CONTRACTOR / ASSIGNMENT / AMENDMENTS / INDEMNIFICATION / DEFAULT / ENTIRE AGREEMENT / WAIVER / SEVERABILITY", true);
  p(`13. GOVERNING LAW: laws of State of ${v.governingLawState || "[State]"}.`);
  p("14. EXECUTION: Parent/Guardian and Tutor signature blocks with name/date.");
  doc.save("tutoring_agreement.pdf");
};

export default function TutoringAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Tutoring Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="tutoringagreement"
    />
  );
}

