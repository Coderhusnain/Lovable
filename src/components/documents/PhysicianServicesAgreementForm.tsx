import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "providerName", label: "Healthcare provider / clinic name", type: "text", required: true },
    { name: "providerAddress", label: "Provider address", type: "text", required: true },
    { name: "physicianName", label: "Physician name", type: "text", required: true },
    { name: "physicianAddress", label: "Physician address", type: "text", required: true },
  ]},
  { label: "Service Terms", fields: [
    { name: "scopeServices", label: "Scope of medical services", type: "textarea", required: true },
    { name: "termType", label: "Term type (fixed-term or ongoing)", type: "text", required: true },
    { name: "compensationTerms", label: "Compensation method/frequency", type: "textarea", required: true },
  ]},
  { label: "Legal Compliance", fields: [
    { name: "hipaaClause", label: "HIPAA/confidentiality clause", type: "textarea", required: true },
    { name: "independentContractorClause", label: "Independent contractor clause", type: "text", required: true },
    { name: "disputeResolutionClause", label: "Dispute resolution clause", type: "text", required: true },
    { name: "governingLaw", label: "Governing law state", type: "text", required: true },
  ]},
  { label: "FAQ Text Blocks", fields: [
    { name: "whyImportant", label: "Why this agreement is important", type: "textarea", required: true },
    { name: "whatIncludes", label: "What agreement includes", type: "textarea", required: true },
    { name: "postCreationSteps", label: "Post-creation steps", type: "textarea", required: true },
    { name: "lawyerReview", label: "Lawyer review note", type: "text", required: true },
  ]},
  { label: "Commercial Notes", fields: [
    { name: "costNote", label: "Cost note / free-creation statement", type: "textarea", required: true },
    { name: "platformNote", label: "Platform/legalgram note", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "providerSign", label: "Provider signature name", type: "text", required: true },
    { name: "providerDate", label: "Provider date", type: "date", required: true },
    { name: "physicianSign", label: "Physician signature name", type: "text", required: true },
    { name: "physicianDate", label: "Physician date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const width = 170;
  const u = (s?: string, n = 24) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "PHYSICIAN SERVICES AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add("What Is a Physician Services Agreement?", true);
  add("A Physician Services Agreement outlines duties, responsibilities, compensation, and legal obligations between a healthcare provider and a physician. This helps avoid misunderstandings by clearly defining scope of medical services, payment terms/schedule, duration of engagement, legal responsibilities, and confidentiality/compliance requirements.");
  add("Unlike generic templates found online, this agreement should be drafted in professional legal language and structured for real-world medical practice.");
  add("When Should You Use a Physician Services Agreement?", true);
  add("Use when: a hospital/clinic is hiring a physician; a physician is entering a service arrangement; payment/duties/timelines must be defined clearly; legal or billing disputes are to be avoided. This applies to short-term and long-term arrangements.");
  add("FAQS", true);
  add("Why important: clearly defines service duration, payment deadlines, legal protections, and dispute prevention; supports healthcare law compliance.");
  add("What it includes: party details, scope, term, compensation, confidentiality/HIPAA, independent contractor status, dispute resolution, governing law.");
  add("How much it costs: custom legal drafting may cost hundreds or thousands. A prepared format can reduce or eliminate upfront drafting costs.");
  add("What to do after creating: review terms, customize if needed, sign, share signed copies, and store records safely.");
  add("Can a lawyer review it: yes, legal review is recommended for accuracy and compliance.");
  add("All of the above clauses should be included in a best-practice physician services agreement format.");

  add("Agreement Data", true);
  add(`Provider: ${u(v.providerName)} (${u(v.providerAddress)})`);
  add(`Physician: ${u(v.physicianName)} (${u(v.physicianAddress)})`);
  add(`Scope of services: ${u(v.scopeServices)}`);
  add(`Term type: ${u(v.termType)}`);
  add(`Compensation: ${u(v.compensationTerms)}`);
  add(`HIPAA/confidentiality: ${u(v.hipaaClause)}`);
  add(`Independent contractor: ${u(v.independentContractorClause)}`);
  add(`Dispute resolution: ${u(v.disputeResolutionClause)}`);
  add(`Governing law: ${u(v.governingLaw || v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}`);
  add(`Why important note: ${u(v.whyImportant)}`);
  add(`What includes note: ${u(v.whatIncludes)}`);
  add(`Post-creation steps: ${u(v.postCreationSteps)}`);
  add(`Lawyer review note: ${u(v.lawyerReview)}`);
  add(`Cost note: ${u(v.costNote)}`);
  add(`Platform note: ${u(v.platformNote)}`);

  add("Execution", true);
  add(`Effective Date: ${u(v.effectiveDate)}`);
  add(`Provider Signature: ${u(v.providerSign)}  Date: ${u(v.providerDate)}`);
  add(`Physician Signature: ${u(v.physicianSign)}  Date: ${u(v.physicianDate)}`);

  doc.save("physician_services_agreement.pdf");
};

export default function PhysicianServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Physician Services Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="physicianservicesagreement"
    />
  );
}

