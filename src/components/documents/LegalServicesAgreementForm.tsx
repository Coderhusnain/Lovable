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
  const L = 16, W = 178, LH = 5.7;
  let y = 18;

  // ── Helpers ────────────────────────────────────────────────────────────────

  const checkPage = (lineCount: number) => {
    if (y + lineCount * LH > 282) { doc.addPage(); y = 18; }
  };

  /** Bold section heading */
  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length + 1);
    doc.text(lines, L, y);
    y += lines.length * LH + 3;
  };

  /** Bold sub-heading (2.1 / 2.2 etc.) */
  const subHeading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.1);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length + 1);
    doc.text(lines, L, y);
    y += lines.length * LH + 2;
  };

  /** Normal body paragraph */
  const body = (text: string, gap = 2) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  /** Bullet point with left indent */
  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const indent = L + 6;
    const lines = doc.splitTextToSize(text, W - 6);
    checkPage(lines.length);
    doc.text("\u2022", L + 1.5, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.8;
  };

  /** Numbered sub-clause (4.1, 4.2 …) */
  const clause = (num: string, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const prefix = `${num} `;
    const indent = L + doc.getTextWidth(prefix) + 1;
    const lines = doc.splitTextToSize(text, W - (indent - L));
    checkPage(lines.length);
    doc.setFont("helvetica", "bold");
    doc.text(num, L, y);
    doc.setFont("helvetica", "normal");
    doc.text(lines, indent, y);
    y += lines.length * LH + 2;
  };

  /** Signature field with underline */
  const sigField = (label: string, value?: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const prefix = `${label}: `;
    doc.text(prefix, L, y);
    const x = L + doc.getTextWidth(prefix);
    const val = (value || "").trim();
    if (val) {
      doc.text(val, x, y);
      doc.line(x, y + 1, x + Math.max(28, doc.getTextWidth(val) + 2), y + 1);
    } else {
      doc.text("____________________________", x, y);
    }
    y += LH + 1.5;
  };

  const spacer = (h = 3.5) => { y += h; };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  const title = "LEGAL SERVICES AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 12;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  body(
    `This Legal Services Agreement ("Agreement") is entered into as of ${v.effectiveDate || "__________"} ("Effective Date"), by and between:`
  );
  spacer(1);
  body(`Attorney:  ${v.attorneyName || "____________________________"}`);
  body("and");
  body(`Client:  ${v.clientName || "____________________________"}`);
  spacer(1);
  body(`(collectively referred to as the "Parties").`);
  spacer();

  // ── 1. SCOPE OF LEGAL SERVICES ─────────────────────────────────────────────
  heading("1. SCOPE OF LEGAL SERVICES");
  body("The Attorney agrees to provide legal services to the Client in connection with the following matter(s):");
  spacer(1);
  body(v.servicesScope || "________________________________________________________________________");
  spacer(1);
  body(`(collectively, the "Services").`);
  body("Any additional legal services not described above shall require separate authorization and may be subject to additional fees.");
  spacer();

  // ── 2. RESPONSIBILITIES OF THE PARTIES ────────────────────────────────────
  heading("2. RESPONSIBILITIES OF THE PARTIES");

  subHeading("2.1 Attorney Responsibilities");
  body("The Attorney agrees to:");
  bullet("Perform legal services competently and professionally in accordance with applicable ethical standards;");
  bullet("Keep the Client reasonably informed regarding the status of the matter;");
  bullet("Respond to Client inquiries within a reasonable time; and");
  bullet("Provide legal advice and representation consistent with the Client's best interests.");
  spacer(1);

  subHeading("2.2 Client Responsibilities");
  body("The Client agrees to:");
  bullet("Provide truthful, complete, and accurate information to the Attorney;");
  bullet("Cooperate fully in the handling of the matter;");
  bullet("Keep the Attorney informed of current contact information;");
  bullet("Timely review and respond to communications; and");
  bullet("Promptly pay all fees and costs in accordance with this Agreement.");
  spacer();

  // ── 3. FEES AND COMPENSATION ───────────────────────────────────────────────
  heading("3. FEES AND COMPENSATION");

  subHeading("3.1 Hourly Rates");
  body("The Client agrees to pay the Attorney for legal services at the following rate:");
  spacer(1);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.1);
  checkPage(2);
  doc.text(`$${v.hourlyRate || "_____"} per hour`, L + 4, y);
  y += LH + 3;
  body("Time shall be billed in increments of one-tenth (0.1) of an hour, rounded to the nearest tenth. The minimum charge for any task shall be one-tenth (0.1) of an hour.");
  spacer(1);

  subHeading("3.2 Billable Activities");
  body("Billable services include, but are not limited to:");
  bullet("Client conferences and consultations");
  bullet("Court appearances and hearings");
  bullet("Depositions and preparation");
  bullet("Legal research and drafting");
  bullet("Correspondence and communications");
  bullet("Document preparation and review");
  bullet("Telephone calls and emails");
  body("If more than one attorney or staff member works on the matter simultaneously, each person's time shall be billed at their applicable hourly rate.");
  spacer();

  // ── 4. PAYMENT TERMS ──────────────────────────────────────────────────────
  heading("4. PAYMENT TERMS");
  clause("4.1", "Payment is due upon receipt of each invoice.");
  clause("4.2", "The Attorney reserves the right to require advance payment or retainers as deemed appropriate.");
  clause("4.3", "If the Attorney increases hourly rates during the term of this Agreement, the increased rate shall apply only to services rendered thirty (30) days after written notice to the Client.");
  clause("4.4", "If the Client does not agree to the revised rate, the Client may terminate this Agreement by providing written notice and executing a substitution of attorney.");
  spacer();

  // ── 5. COSTS AND EXPENSES ─────────────────────────────────────────────────
  heading("5. COSTS AND EXPENSES");
  body("The Client agrees to pay all costs incurred in connection with legal representation, including but not limited to:");
  bullet("Court filing fees");
  bullet("Deposition and transcript costs");
  bullet("Expert witness fees");
  bullet("Investigation expenses");
  bullet("Messenger and courier services");
  bullet("Long-distance communications");
  bullet("Photocopying and document production");
  bullet("Process server fees");
  body("The Attorney may advance costs on the Client's behalf, which shall be reimbursed upon invoicing.");
  spacer();

  // ── 6. TERMINATION OF REPRESENTATION ─────────────────────────────────────
  heading("6. TERMINATION OF REPRESENTATION");
  clause("6.1", "Either Party may terminate this Agreement at any time upon written notice.");
  clause("6.2", "Upon termination, the Client shall remain responsible for payment of all fees and costs incurred up to the effective date of termination.");
  clause("6.3", "Upon termination and payment of all outstanding balances, the Attorney shall take reasonable steps to transfer the Client's file as required by law.");
  spacer();

  // ── 7. GOVERNING LAW ──────────────────────────────────────────────────────
  heading("7. GOVERNING LAW");
  body(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${v.governingLawState || "__________________"}.`);
  spacer();

  // ── 8. ENTIRE AGREEMENT ───────────────────────────────────────────────────
  heading("8. ENTIRE AGREEMENT");
  body("This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements or understandings regarding the subject matter herein.");
  spacer();

  // ── 9. AMENDMENTS ─────────────────────────────────────────────────────────
  heading("9. AMENDMENTS");
  body("This Agreement may be amended only by a written document signed by both Parties.");
  spacer();

  // ── 10. SEVERABILITY ──────────────────────────────────────────────────────
  heading("10. SEVERABILITY");
  body("If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
  spacer();

  // ── 11. EFFECTIVE DATE ────────────────────────────────────────────────────
  heading("11. EFFECTIVE DATE");
  body("This Agreement shall become effective as of the date first written above.");
  spacer();

  // ── 12. SIGNATURES ────────────────────────────────────────────────────────
  heading("12. SIGNATURES");
  body("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.");
  spacer(5);

  // Attorney block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.1);
  checkPage(6);
  doc.text("ATTORNEY", L, y);
  y += LH + 2.5;
  sigField("Signature", v.attorneySignature);
  sigField("Name", v.attorneyName);
  sigField("Date", v.attorneyDate);
  spacer(4);

  // Client block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.1);
  checkPage(6);
  doc.text("CLIENT", L, y);
  y += LH + 2.5;
  sigField("Signature", v.clientSignature);
  sigField("Name", v.clientName);
  sigField("Date", v.clientDate);

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