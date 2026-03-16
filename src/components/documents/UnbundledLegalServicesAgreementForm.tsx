import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Unbundled Legal Terms",
    fields: [
      { name: "agreementDate",    label: "Agreement date",              type: "date",     required: true  },
      { name: "clientName",       label: "Client name",                 type: "text",     required: true  },
      { name: "attorneyName",     label: "Attorney name",               type: "text",     required: true  },
      { name: "matter",           label: "Matter description",          type: "textarea", required: true  },
      { name: "servicesScope",    label: "Limited scope services",      type: "textarea", required: true  },
      { name: "hourlyRates",      label: "Hourly rates",                type: "text",     required: true  },
      { name: "governingLawState",label: "Governing law state",         type: "text",     required: true  },
      { name: "clientSignature",  label: "Client signature (typed)",    type: "text",     required: true  },
      { name: "clientDate",       label: "Client date",                 type: "date",     required: true  },
      { name: "attorneySignature",label: "Attorney signature (typed)",  type: "text",     required: true  },
      { name: "attorneyDate",     label: "Attorney date",               type: "date",     required: true  },
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

  /** Bold numbered section heading */
  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length + 1);
    doc.text(lines, L, y);
    y += lines.length * LH + 3;
  };

  /** Bold inline sub-heading (e.g. "Hourly Fees", "9.1 Termination by Client") */
  const subHeading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length + 1);
    doc.text(lines, L, y);
    y += lines.length * LH + 2;
  };

  /** Normal body paragraph */
  const body = (text: string, gap = 2) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  /** Bullet point with 6 mm left indent */
  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const indent = L + 6;
    const lines = doc.splitTextToSize(text, W - 6);
    checkPage(lines.length);
    doc.text("\u2022", L + 1.5, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.8;
  };

  /** Lettered item  a. / b. / c. … */
  const lettered = (ltr: string, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const prefix = `${ltr}.  `;
    const indent = L + doc.getTextWidth(prefix) + 1;
    const lines = doc.splitTextToSize(text, W - (indent - L));
    checkPage(lines.length);
    doc.text(`${ltr}.`, L, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.8;
  };

  /** Parenthesised item  (a) / (b) */
  const parenItem = (ltr: string, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const prefix = `(${ltr})  `;
    const indent = L + doc.getTextWidth(prefix) + 1;
    const lines = doc.splitTextToSize(text, W - (indent - L));
    checkPage(lines.length);
    doc.text(`(${ltr})`, L, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.8;
  };

  /** Signature field with underline */
  const sigField = (label: string, value?: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
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
  const title = "UNBUNDLED LEGAL SERVICES AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 12;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  body(
    `This Unbundled Legal Services Agreement ("Agreement") is entered into as of ${v.agreementDate || "__________"}, by and between`
  );
  spacer(1);
  body(`${v.clientName || "__________"} ("Client")`);
  body("And");
  body(`${v.attorneyName || "__________"} ("Attorney").`);
  spacer();

  // ── 1. PURPOSE AND NATURE OF AGREEMENT ────────────────────────────────────
  heading("1. PURPOSE AND NATURE OF AGREEMENT");
  body(
    "Client desires to obtain limited legal services from Attorney, and Attorney agrees to provide such services on a limited-scope representation basis as permitted by applicable law and professional conduct rules."
  );
  body(
    "\"Limited scope representation\" means that Attorney's services are restricted solely to those specifically identified in this Agreement. Except as expressly stated herein, Attorney does not represent Client in any capacity and does not act as Client's attorney of record."
  );
  body("The legal matter for which limited services are requested is as follows:");
  spacer(1);
  body(v.matter || "________________________________________________________________________");
  spacer(1);
  body("(the \"Matter\").");
  spacer();

  // ── 2. SCOPE OF REPRESENTATION ────────────────────────────────────────────
  heading("2. SCOPE OF REPRESENTATION");
  body("Attorney agrees to provide only the following legal services to Client:");
  spacer(1);
  body(v.servicesScope || "________________________________________________________________________");
  spacer(1);
  body(
    "Attorney shall have no duty to perform any legal services beyond those specifically described above unless a written amendment to this Agreement is executed by both Parties."
  );
  spacer();

  // ── 3. EFFECTIVE DATE ─────────────────────────────────────────────────────
  heading("3. EFFECTIVE DATE");
  body("This Agreement shall become effective on the date it is signed by both Parties.");
  spacer();

  // ── 4. AUTOMATIC TERMINATION ──────────────────────────────────────────────
  heading("4. AUTOMATIC TERMINATION");
  body("This Agreement shall automatically terminate upon the earlier of:");
  parenItem("a", "Completion of the services described in Section 2; or");
  parenItem("b", "Written termination by either Party pursuant to this Agreement.");
  body("No further notice shall be required upon completion of the agreed-upon services.");
  spacer();

  // ── 5. ATTORNEY'S FEES ────────────────────────────────────────────────────
  heading("5. ATTORNEY'S FEES");
  body("Client agrees to compensate Attorney as follows:");
  spacer(1);
  subHeading("Hourly Fees");
  body(`Attorney shall bill Client at the following hourly rate(s): $${v.hourlyRates || "____"} per hour.`);
  body(
    "Time shall be billed in increments customarily used by Attorney. Client agrees to pay for all time reasonably spent in providing the agreed-upon services."
  );
  spacer();

  // ── 6. COSTS AND EXPENSES ─────────────────────────────────────────────────
  heading("6. COSTS AND EXPENSES");
  body(
    "In addition to legal fees, Client agrees to pay all costs and expenses incurred in connection with the Matter, including but not limited to:"
  );
  bullet("Filing fees");
  bullet("Copying and postage");
  bullet("Long-distance telephone charges");
  bullet("Courier or messenger services");
  bullet("Court or administrative fees");
  body(
    "Attorney shall not advance costs unless expressly agreed in writing. Client remains responsible for all expenses whether paid directly or advanced by Attorney."
  );
  spacer();

  // ── 7. ADDITIONAL SERVICES ────────────────────────────────────────────────
  heading("7. ADDITIONAL SERVICES");
  body(
    "Client may request additional legal services beyond the scope of this Agreement. Attorney is under no obligation to provide additional services."
  );
  body(
    "If Attorney agrees to provide additional services, such services shall be documented in a written amendment signed by both Parties."
  );
  body(
    "If the Parties agree that Attorney will assume full representation, a new agreement or written amendment shall be executed prior to commencement of such services."
  );
  spacer();

  // ── 8. CLIENT RESPONSIBILITIES ────────────────────────────────────────────
  heading("8. CLIENT RESPONSIBILITIES");
  body("Client agrees to:");
  lettered("a", "Provide complete, accurate, and timely information necessary for Attorney to perform the services;");
  lettered("b", "Cooperate fully with Attorney and comply with reasonable requests;");
  lettered("c", "Appear as required at meetings, hearings, or proceedings;");
  lettered("d", "Carefully consider Attorney's advice before making decisions;");
  lettered("e", "Maintain current contact information and notify Attorney promptly of any changes;");
  lettered("f", "Promptly forward all correspondence, pleadings, or notices related to the Matter.");
  spacer();

  // ── 9. TERMINATION OF REPRESENTATION ─────────────────────────────────────
  heading("9. TERMINATION OF REPRESENTATION");

  subHeading("9.1 Termination by Client");
  body(
    "Client may terminate this Agreement at any time by written notice. Client remains responsible for all fees and costs incurred prior to termination."
  );

  subHeading("9.2 Termination by Attorney");
  body("Attorney may terminate this Agreement for good cause, including but not limited to:");
  bullet("Client's failure to cooperate;");
  bullet("Nonpayment of fees or costs;");
  bullet("Conflict of interest;");
  bullet("Ethical obligations requiring withdrawal.");
  body("Upon termination, Attorney shall have no further obligation to provide services beyond those required by law.");
  spacer();

  // ── 10. CLIENT'S INFORMED CONSENT ─────────────────────────────────────────
  heading("10. CLIENT'S INFORMED CONSENT");
  body("Client acknowledges and agrees that:");
  bullet("Client has read and understands this Agreement;");
  bullet("Client understands the limitations of unbundled legal services;");
  bullet("Client understands that Attorney will not provide ongoing representation unless expressly agreed in writing;");
  bullet("Client has had the opportunity to ask questions and seek clarification before signing.");
  spacer();

  // ── 11. NO GUARANTEE OF OUTCOME ───────────────────────────────────────────
  heading("11. NO GUARANTEE OF OUTCOME");
  body(
    "Attorney makes no representations or guarantees regarding the outcome of Client's legal matter. All opinions expressed are professional judgments only."
  );
  spacer();

  // ── 12. GOVERNING LAW ─────────────────────────────────────────────────────
  heading("12. GOVERNING LAW");
  body(
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${v.governingLawState || "__________________"}.`
  );
  spacer();

  // ── 13. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  heading("13. ENTIRE AGREEMENT");
  body(
    "This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements, representations, or understandings, whether oral or written."
  );
  spacer();

  // ── 14. AMENDMENTS ────────────────────────────────────────────────────────
  heading("14. AMENDMENTS");
  body("This Agreement may be amended only by a written document signed by both Parties.");
  spacer();

  // ── 15. SEVERABILITY ──────────────────────────────────────────────────────
  heading("15. SEVERABILITY");
  body(
    "If any provision of this Agreement is found unenforceable, the remaining provisions shall remain in full force and effect."
  );
  spacer();

  // ── 16. SIGNATURES ────────────────────────────────────────────────────────
  heading("16. SIGNATURES");
  body("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  spacer(6);

  // Client block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  checkPage(6);
  doc.text("CLIENT", L, y);
  y += LH + 2.5;
  sigField("Signature", v.clientSignature);
  sigField("Name",      v.clientName);
  sigField("Date",      v.clientDate);
  spacer(5);

  // Attorney block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  checkPage(6);
  doc.text("ATTORNEY", L, y);
  y += LH + 2.5;
  sigField("Signature", v.attorneySignature);
  sigField("Name",      v.attorneyName);
  sigField("Date",      v.attorneyDate);

  doc.save("unbundled_legal_services_agreement.pdf");
};

export default function UnbundledLegalServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Unbundled Legal Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="unbundledlegalservicesagreement"
    />
  );
}