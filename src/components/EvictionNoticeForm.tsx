import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Notice Header", fields: [
    { name: "noticeDate", label: "Date of notice", type: "date", required: true },
    { name: "tenantName", label: "Tenant name", type: "text", required: true },
    { name: "premisesAddress", label: "Address of premises", type: "text", required: true },
    { name: "leaseDate", label: "Date of lease", type: "date", required: true },
  ]},
  { label: "Violation Details", fields: [
    { name: "violations", label: "Specific lease violations", type: "textarea", required: true },
    { name: "correctiveActions", label: "Required corrective actions", type: "textarea", required: true },
  ]},
  { label: "Compliance Timeframe", fields: [
    { name: "deadlineDays", label: "Days to cure", type: "text", required: true, placeholder: "30" },
    { name: "deadlineText", label: "Deadline wording", type: "text", required: true },
  ]},
  { label: "Landlord Rights", fields: [
    { name: "landlordRemedyText", label: "Landlord right to remedy wording", type: "textarea", required: true },
    { name: "potentialConsequencesText", label: "Potential consequences wording", type: "textarea", required: true },
    { name: "governingState", label: "Governing state", type: "text", required: true },
  ]},
  { label: "Party Signatures", fields: [
    { name: "tenantSignatureName", label: "Tenant signature name", type: "text", required: true },
    { name: "landlordName", label: "Landlord name", type: "text", required: true },
    { name: "landlordSignatureName", label: "Landlord signature name", type: "text", required: true },
  ]},
  { label: "Final Review", fields: [
    { name: "finalNote", label: "Final note (optional)", type: "text", required: false },
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
  const title = "EVICTION NOTICE";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`DATE OF NOTICE: ${u(values.noticeDate)}`);
  p(`TENANT'S NAME: ${u(values.tenantName)}`);
  p(`ADDRESS OF PREMISES: ${u(values.premisesAddress)}`);
  y += 2;
  p("TAKE NOTICE THAT", true);
  p(`This Notice is provided pursuant to the written lease entered on or about ${u(values.leaseDate)} concerning the premises at ${u(values.premisesAddress)}.`);
  p("1. Lease Violation", true);
  p(u(values.violations));
  p("2. Required Corrective Action", true);
  p(u(values.correctiveActions));
  p("3. Timeframe for Compliance", true);
  p(`Tenant must correct the violations within ${u(values.deadlineDays, 3)} days (${u(values.deadlineText)}). Failure to comply may result in further legal action.`);
  p("4. Landlord's Right to Remedy", true);
  p(u(values.landlordRemedyText));
  p("5. Potential Consequences", true);
  p(`${u(values.potentialConsequencesText)} This notice is governed by laws of ${u(values.governingState)}.`);
  y += 6;
  p(`TENANT'S NAME: ${u(values.tenantName)}`);
  p(`SIGNATURE: ${u(values.tenantSignatureName)}`);
  p(`LANDLORD NAME: ${u(values.landlordName)}`);
  p(`SIGNATURE: ${u(values.landlordSignatureName)}`);
  if (values.finalNote) p(`Note: ${values.finalNote}`);
  doc.save("eviction_notice.pdf");
};

export default function EvictionNotice() {
  return (
    <FormWizard
      steps={steps}
      title="Eviction Notice"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="evictionnotice"
    />
  );
}
