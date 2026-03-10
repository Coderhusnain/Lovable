import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Matter",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "attorneyName", label: "Attorney name", type: "text", required: true },
      { name: "attorneyAddress", label: "Attorney address", type: "text", required: true },
      { name: "matter", label: "Matter description", type: "textarea", required: true },
      { name: "servicesIncluded", label: "Services to be provided", type: "textarea", required: true },
      { name: "servicesExcluded", label: "Excluded services", type: "textarea", required: true },
      { name: "hourlyRate", label: "Hourly rate", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignature", label: "Client signature (typed)", type: "text", required: true },
      { name: "clientDate", label: "Client date", type: "date", required: true },
      { name: "attorneySignature", label: "Attorney signature (typed)", type: "text", required: true },
      { name: "attorneyDate", label: "Attorney date", type: "date", required: true },
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
    doc.setFontSize(10.3);
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
  const title = "LIMITED SCOPE REPRESENTATION AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Limited Scope Representation Agreement is entered into as of ${v.agreementDate || "__________"}, ` +
      `by and between ${v.clientName || "________________________"}, of ${v.clientAddress || "________________________"} ("Client"), and ` +
      `${v.attorneyName || "________________________"}, of ${v.attorneyAddress || "________________________"} ("Attorney").`,
  );
  p("I. PURPOSE AND NATURE OF REPRESENTATION", true);
  p("Attorney agrees to provide legal assistance on a limited scope basis only, as permitted by applicable law and professional conduct rules.");
  p("Representation is restricted solely to the specific services listed in this Agreement unless later expanded in writing.");
  p(`Matter: ${v.matter || "__________________________________________________"}.`);
  p("II. SCOPE OF REPRESENTATION", true);
  p("A. Services to be provided:");
  p(v.servicesIncluded || "______________________________________________", false, 2.2);
  p("B. Excluded services (including court appearances unless expressly agreed, ongoing case management, unauthorized negotiations, unlisted filings, appeals/post-judgment proceedings):");
  p(v.servicesExcluded || "______________________________________________", false, 2.2);
  p("III. EFFECTIVE DATE", true);
  p("This Agreement becomes effective on execution by both Parties.");
  p("IV. TERM AND TERMINATION", true);
  p("This Agreement terminates automatically upon completion of agreed services unless terminated earlier under this Agreement.");
  p("V. ATTORNEY'S FEES", true);
  p(`Client agrees to pay Attorney hourly fees at $${v.hourlyRate || "____"} per hour. Time billed in reasonable increments per Attorney billing practices.`);
  p("VI. COSTS AND EXPENSES", true);
  p("Client pays filing/court fees, postage, copying/printing, long-distance communications, investigations/research. No cost advances unless agreed in writing.");
  p("VII. ADDITIONAL SERVICES", true);
  p("Any additional services require written amendment signed by both Parties. Attorney has no obligation to accept additional work.");
  p("VIII. CLIENT RESPONSIBILITIES", true);
  p("Client must provide complete/accurate/timely information, cooperate, appear as requested, consider advice, keep contact info current, and share relevant documents.");
  p("IX. TERMINATION OF REPRESENTATION", true);
  p("Client may terminate anytime by written notice and remains responsible for accrued fees/costs. Attorney may terminate for nonpayment, ethical conflicts, or other good cause.");
  p("X. CLIENT'S INFORMED CONSENT", true);
  p("Client acknowledges and consents to limited representation and understands Attorney is not responsible for matters outside stated scope.");
  p("XI. NO GUARANTEE OF OUTCOME", true);
  p("Attorney makes no guarantee regarding case outcome.");
  p("XII. GOVERNING LAW", true);
  p(`This Agreement is governed by laws of the State of ${v.governingLawState || "____________________"}.`);
  p("XIII. ENTIRE AGREEMENT / XIV. AMENDMENTS / XV. SEVERABILITY", true);
  p("This is the entire agreement; amendments must be written/signed; invalid provisions do not invalidate remaining provisions.");
  p("XVI. SIGNATURES", true);

  uf("CLIENT - Signature", v.clientSignature);
  uf("Name", v.clientName);
  uf("Date", v.clientDate);
  y += 1.2;
  uf("ATTORNEY - Signature", v.attorneySignature);
  uf("Name", v.attorneyName);
  uf("Date", v.attorneyDate);

  doc.save("limited_scope_representation_agreement.pdf");
};

export default function LimitedScopeRepresentationAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Limited Scope Representation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="limitedscoperepresentationagreement"
    />
  );
}

