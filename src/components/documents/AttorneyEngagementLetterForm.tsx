import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "attorneyName", label: "Attorney name", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "matterScope", label: "Matter(s) scope", type: "textarea", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
      { name: "flatFee", label: "Flat fee amount", type: "text", required: true },
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

  const title = "ATTORNEY ENGAGEMENT LETTER";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(`This Attorney Engagement Letter ("Agreement") is entered into as of ${v.effectiveDate || "__________"}, by and between:`);
  p(`${v.attorneyName || "________________________"}, Attorney ("Attorney"), and ${v.clientName || "________________________"}, Client ("Client").`);
  p("Attorney and Client may be referred to individually as a Party and collectively as the Parties.");
  p("1. SCOPE OF LEGAL SERVICES", true);
  p(`Attorney agrees to provide legal services in connection with the following matter(s): ${v.matterScope || "________________________"}.`);
  p("Attorney shall provide services in a professional and competent manner consistent with applicable ethical standards.");
  p("2. RESPONSIBILITIES OF THE PARTIES", true);
  p("2.1 Attorney Responsibilities: perform services competently and diligently; keep client informed; respond timely; provide legal advice per applicable law.");
  p("2.2 Client Responsibilities: provide truthful/complete information; cooperate fully; keep contact details current; respond promptly; pay fees/costs timely.");
  p("3. COMPENSATION", true);
  p(`3.1 Flat Fee: Client agrees to pay Attorney a flat fee of $${v.flatFee || "________"}, payable upon completion unless otherwise agreed in writing.`);
  p("3.2 Scope of Fees includes client conferences, court appearances, pleadings/documents, legal research, correspondence/communications.");
  p("4. PAYMENT TERMS", true);
  p("Payment due upon receipt of invoice unless otherwise stated. Rate increases apply only to work performed 30 days after written notice.");
  p("Client may terminate if not agreeing to increased rates. Attorney makes no guarantee of total legal fees.");
  p("5. COSTS AND EXPENSES", true);
  p("Client pays filing fees, deposition/transcript costs, expert witness, investigation expenses, long-distance charges, courier/messenger, photocopying, process server fees.");
  p("Attorney may advance costs and bill/deduct from retainer.");
  p("6. EFFECTIVE DATE", true);
  p("This Agreement becomes effective on execution by both Parties.");
  p("7. GOVERNING LAW", true);
  p(`This Agreement is governed by laws of the State of ${v.governingLawState || "____________________"}.`);
  p("8. SEVERABILITY", true);
  p("Invalid/unenforceable provisions are modified as needed; remaining terms remain in effect.");
  p("9. ENTIRE AGREEMENT", true);
  p("This Agreement supersedes prior oral/written agreements regarding the subject matter.");
  p("10. AMENDMENTS", true);
  p("Amendments must be in writing signed by both Parties.");
  p("11. SIGNATURES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");

  uf("ATTORNEY - Signature", v.attorneySignature);
  uf("Name", v.attorneyName);
  uf("Date", v.attorneyDate);
  y += 1.2;
  uf("CLIENT - Signature", v.clientSignature);
  uf("Name", v.clientName);
  uf("Date", v.clientDate);

  doc.save("attorney_engagement_letter.pdf");
};

export default function AttorneyEngagementLetterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Attorney Engagement Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="attorneyengagementletter"
    />
  );
}

