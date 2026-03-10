import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Scope",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "attorneyName", label: "Attorney name", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "servicesScope", label: "Services scope", type: "textarea", required: true },
      { name: "hourlyRate", label: "Hourly rate", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "attorneySignature", label: "Attorney signature (typed)", type: "text", required: true },
      { name: "attorneyDate", label: "Attorney date", type: "date", required: true },
      { name: "clientSignature", label: "Client signature (typed)", type: "text", required: true },
      { name: "clientDate", label: "Client date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16;
  const W = 178;
  const LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1;
  };
  const title = "LEGAL SERVICES AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(`This Legal Services Agreement ("Agreement") is entered into as of ${v.effectiveDate || "__________"}, by and between Attorney ${v.attorneyName || "________________________"} and Client ${v.clientName || "________________________"}.`);
  p("1. SCOPE OF LEGAL SERVICES", true);
  p(`Attorney agrees to provide legal services regarding: ${v.servicesScope || "________________________"}. Additional services require separate authorization and may incur additional fees.`);
  p("2. RESPONSIBILITIES OF THE PARTIES", true);
  p("2.1 Attorney Responsibilities: competent/professional services; keep client informed; timely responses; advice aligned with client best interests.");
  p("2.2 Client Responsibilities: truthful/complete information; full cooperation; current contact details; timely communication responses; prompt payment.");
  p("3. FEES AND COMPENSATION", true);
  p(`3.1 Hourly Rate: $${v.hourlyRate || "____"} per hour. Billing in one-tenth (0.1) hour increments, rounded to nearest tenth; minimum charge 0.1 hour.`);
  p("3.2 Billable Activities include conferences, hearings, depositions/prep, legal research/drafting, correspondence, document review, calls/emails.");
  p("Multiple attorneys/staff working simultaneously are billed at applicable individual rates.");
  p("4. PAYMENT TERMS", true);
  p("Payment due upon receipt of invoice. Attorney may require retainers/advance payments. Rate changes apply only after 30 days written notice.");
  p("Client may terminate by written notice and substitution of attorney if rates are not accepted.");
  p("5. COSTS AND EXPENSES", true);
  p("Client pays filing fees, transcript/deposition costs, experts, investigation, courier/messenger, long-distance communications, copying, and process server fees.");
  p("Attorney may advance costs to be reimbursed on invoicing.");
  p("6. TERMINATION OF REPRESENTATION", true);
  p("Either Party may terminate by written notice. Client remains responsible for accrued fees/costs. Upon payment, Attorney transfers file as required by law.");
  p("7. GOVERNING LAW", true);
  p(`This Agreement is governed by laws of the State of ${v.governingLawState || "____________________"}.`);
  p("8. ENTIRE AGREEMENT", true);
  p("This Agreement supersedes prior oral/written agreements regarding subject matter.");
  p("9. AMENDMENTS", true);
  p("Amendments are valid only if written and signed by both Parties.");
  p("10. SEVERABILITY", true);
  p("If any provision is invalid/unenforceable, remaining provisions remain in full force.");
  p("11. EFFECTIVE DATE", true);
  p("Effective as of date first written above.");
  p("12. SIGNATURES", true);
  p("IN WITNESS WHEREOF, Parties execute this Agreement as of Effective Date.");

  uf("ATTORNEY - Signature", v.attorneySignature);
  uf("Name", v.attorneyName);
  uf("Date", v.attorneyDate);
  y += 1.2;
  uf("CLIENT - Signature", v.clientSignature);
  uf("Name", v.clientName);
  uf("Date", v.clientDate);

  doc.save("legal_services_agreement.pdf");
};

export default function LegalServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Legal Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="legalservicesagreement"
    />
  );
}

