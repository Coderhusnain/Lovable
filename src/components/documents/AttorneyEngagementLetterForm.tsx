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
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.7;
  const limit = 278;
  let y = 22;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 22; }
  };

  // plain paragraph
  const p = (text: string, bold = false, gap = 2.2) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // bullet point — indented with bullet character
  const bullet = (text: string, gap = 1.6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = m + 5;
    const bulletTw = tw - 5;
    const lines = doc.splitTextToSize(text, bulletTw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 1, y);
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // section heading — bold, gap above
  const heading = (text: string, gapBefore = 2.5, gapAfter = 1.5) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  // sub-heading (2.1, 2.2 etc) — bold
  const subheading = (text: string, gap = 1.4) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // underline field "Label: ___________"
  const uf = (label: string, value?: string, lineLen = 28, gap = 2.4) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(lineLen)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(lineLen)), y + 1.1);
    }
    y += lh + gap;
  };

  // ── Title — bold, centred, underlined ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "ATTORNEY ENGAGEMENT LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 11;

  // ── Opening ───────────────────────────────────────────────────────────────
  // Draft: This Attorney Engagement Letter ("Agreement") is entered into as of __________ ("Effective Date"), by and between:
  p(`This Attorney Engagement Letter (\u201cAgreement\u201d) is entered into as of ${v.effectiveDate || "__________"} (\u201cEffective Date\u201d), by and between:`);
  // Draft: ________________________, Attorney ("Attorney"), and
  p(`${v.attorneyName || "________________________"}, Attorney (\u201cAttorney\u201d), and`);
  // Draft: ________________________, Client ("Client").
  p(`${v.clientName || "________________________"}, Client (\u201cClient\u201d).`);
  // Draft: Attorney and Client may be referred to individually as a "Party" and collectively as the "Parties."
  p(`Attorney and Client may be referred to individually as a \u201cParty\u201d and collectively as the \u201cParties.\u201d`);

  // ── Section 1 ─────────────────────────────────────────────────────────────
  heading("1. SCOPE OF LEGAL SERVICES");
  p("Attorney agrees to provide legal services to Client in connection with the following matter(s):");
  p(v.matterScope || "");
  p(`(collectively, the \u201cServices\u201d).`);
  p("Attorney shall provide the Services in a professional and competent manner consistent with applicable ethical rules and standards of practice.");

  // ── Section 2 ─────────────────────────────────────────────────────────────
  heading("2. RESPONSIBILITIES OF THE PARTIES");
  subheading("2.1 Attorney Responsibilities");
  p("Attorney shall:");
  bullet("Perform the Services competently and diligently;");
  bullet("Keep Client reasonably informed of the status of the matter;");
  bullet("Respond to Client inquiries in a timely manner; and");
  bullet("Provide legal advice consistent with applicable law and professional standards.");
  y += 1;
  subheading("2.2 Client Responsibilities");
  p("Client agrees to:");
  bullet("Provide truthful, accurate, and complete information;");
  bullet("Cooperate fully with Attorney;");
  bullet("Keep Attorney informed of any changes in contact information;");
  bullet("Promptly review and respond to communications;");
  bullet("Timely pay all fees and costs as required under this Agreement.");

  // ── Section 3 ─────────────────────────────────────────────────────────────
  heading("3. COMPENSATION");
  subheading("3.1 Flat Fee");
  p(`In consideration of the Services, Client agrees to pay Attorney a flat fee of $${v.flatFee || "________"}, payable upon completion of the Services unless otherwise agreed in writing.`);
  y += 1;
  subheading("3.2 Scope of Fees");
  p("The fee includes all professional services rendered by Attorney in connection with the matter, including but not limited to:");
  bullet("Client conferences");
  bullet("Court appearances");
  bullet("Preparation of pleadings and documents");
  bullet("Legal research");
  bullet("Correspondence and communications");
  p("If more than one attorney or staff member works on the matter, each shall be billed at their applicable rate.");

  // ── Section 4 ─────────────────────────────────────────────────────────────
  heading("4. PAYMENT TERMS");
  p("Payment is due upon receipt of invoice unless otherwise stated.");
  p("If Attorney increases billing rates during the term of this Agreement, such increase shall apply only to services performed thirty (30) days after written notice to Client.");
  p("If Client does not agree to the increased rate, Client may terminate this Agreement by written notice.");
  p("Client acknowledges that Attorney has made no guarantee regarding the total amount of legal fees that may be incurred.");

  // ── Section 5 ─────────────────────────────────────────────────────────────
  heading("5. COSTS AND EXPENSES");
  p("Client agrees to pay all costs incurred in connection with the representation, including but not limited to:");
  bullet("Court filing fees");
  bullet("Deposition and transcript costs");
  bullet("Expert witness fees");
  bullet("Investigation expenses");
  bullet("Long-distance telephone charges");
  bullet("Courier or messenger services");
  bullet("Photocopying and document reproduction");
  bullet("Process server fees");
  p("Attorney may advance such costs on Client\u2019s behalf and bill Client accordingly or deduct them from any retainer on file.");

  // ── Section 6 ─────────────────────────────────────────────────────────────
  heading("6. EFFECTIVE DATE");
  p("This Agreement shall become effective on the date it is executed by both Parties.");

  // ── Section 7 ─────────────────────────────────────────────────────────────
  heading("7. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${v.governingLawState || "__________________"}.`);

  // ── Section 8 ─────────────────────────────────────────────────────────────
  heading("8. SEVERABILITY");
  p("If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be modified to the extent necessary to be enforceable, and the remaining provisions shall remain in full force and effect.");

  // ── Section 9 ─────────────────────────────────────────────────────────────
  heading("9. ENTIRE AGREEMENT");
  p("This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements, representations, or understandings relating to the subject matter herein.");

  // ── Section 10 ────────────────────────────────────────────────────────────
  heading("10. AMENDMENTS");
  p("This Agreement may be amended only by a written instrument signed by both Parties.");

  // ── Section 11 ────────────────────────────────────────────────────────────
  heading("11. SIGNATURES");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");

  // ── Signature blocks ──────────────────────────────────────────────────────
  // Draft:
  // ATTORNEY
  // Signature: __________________________
  // Name: __________________________
  // Date: __________________________
  y += 3;
  p("ATTORNEY", true, 1.5);
  uf("Signature", v.attorneySignature, 30);
  uf("Name",      v.attorneyName,      30);
  uf("Date",      v.attorneyDate,      30, 4);

  // Draft:
  // CLIENT
  // Signature: __________________________
  // Name: __________________________
  // Date: __________________________
  p("CLIENT", true, 1.5);
  uf("Signature", v.clientSignature, 30);
  uf("Name",      v.clientName,      30);
  uf("Date",      v.clientDate,      30);

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