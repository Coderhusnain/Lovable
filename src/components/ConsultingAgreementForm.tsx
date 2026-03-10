import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Services",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "consultantName", label: "Consultant name", type: "text", required: true },
      { name: "consultantAddress", label: "Consultant address", type: "text", required: true },
      { name: "expertise", label: "Consultant background/expertise", type: "text", required: true },
      { name: "services", label: "Detailed services", type: "textarea", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "totalFee", label: "Total fee", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state/jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignName", label: "Recipient name (signature block)", type: "text", required: true },
      { name: "recipientSignature", label: "Recipient signature (typed)", type: "text", required: true },
      { name: "recipientDate", label: "Recipient date", type: "date", required: true },
      { name: "consultantSignName", label: "Consultant name (signature block)", type: "text", required: true },
      { name: "consultantSignature", label: "Consultant signature (typed)", type: "text", required: true },
      { name: "consultantDate", label: "Consultant date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "CONSULTING AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Consulting Agreement is entered into and made effective as of ${v.effectiveDate || "[Date]"}, by and between ${v.recipientName || "[Name]"} of ${v.recipientAddress || "[Address]"} ("Recipient"), and ${v.consultantName || "[Name]"} of ${v.consultantAddress || "[Address]"} ("Consultant").`);
  p("1. BACKGROUND AND PURPOSE", true);
  p(`Consultant possesses specialized knowledge/training/experience in ${v.expertise || "[describe background or expertise]"} and agrees to provide services under this Agreement.`);
  p("2. SERVICES AND PERFORMANCE", true);
  p(`2.1 Description of Services: ${v.services || "[Detailed description of services]"}.`);
  p("2.2 Performance: Consultant determines manner/method/means and performs professionally and workmanlike.");
  p("2.3 Independent Contractor Status: Consultant is independent contractor with no authority to bind Recipient.");
  p("3. TERM AND TERMINATION", true);
  p(`3.1 Term: Commences on Effective Date and remains through ${v.terminationDate || "[Termination Date]"} unless earlier terminated.`);
  p(`3.2 Either Party may terminate with or without cause upon ${v.terminationNoticeDays || "[number]"} days prior written notice. Consultant entitled to payment for services performed through termination.`);
  p("4. COMPENSATION AND EXPENSES", true);
  p(`4.1 Compensation: Recipient pays total fee of $${v.totalFee || "[Amount]"} as lump sum upon completion unless otherwise agreed.`);
  p("4.2 Expenses: Consultant bears all expenses unless pre-approved in writing by Recipient.");
  p("5. INTELLECTUAL PROPERTY", true);
  p("Pre-existing IP remains Consultant's. Work product created under services is work made for hire and belongs exclusively to Recipient.");
  p("Recipient owns social media accounts/followers/contacts/digital assets created/managed on Recipient's behalf.");
  p("6. CONFIDENTIALITY AND RETURN OF PROPERTY", true);
  p("Consultant maintains confidentiality of Recipient information; injunctive relief available for unauthorized disclosure; all Recipient property returned on termination.");
  p("7. INSURANCE AND INDEMNIFICATION", true);
  p("Consultant maintains appropriate insurance and indemnifies Recipient for claims arising from Consultant acts/omissions/breach; Recipient indemnifies Consultant for claims solely from Recipient acts/omissions.");
  p("8. LEGAL PROVISIONS", true);
  p("Entire agreement; severability; governing law; assignment restriction on Consultant.");
  p(`8.3 Governing Law: Laws of the State of ${v.governingLawState || "[State/Jurisdiction]"}.`);
  p("9. EXECUTION", true);
  p("IN WITNESS WHEREOF, Parties execute this Agreement as of the Effective Date first written above.");
  uf("RECIPIENT - Name", v.recipientSignName || v.recipientName);
  uf("Signature", v.recipientSignature);
  uf("Date", v.recipientDate);
  y += 1.2;
  uf("CONSULTANT - Name", v.consultantSignName || v.consultantName);
  uf("Signature", v.consultantSignature);
  uf("Date", v.consultantDate);
  doc.save("consulting_agreement.pdf");
};

export default function ConsultingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Consulting Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="consultingagreement"
    />
  );
}

