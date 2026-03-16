import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

// ─── Form Steps ───────────────────────────────────────────────────────────────

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country",  label: "Country",           type: "text", required: true  },
      { name: "state",    label: "State / Province",  type: "text", required: true  },
      { name: "city",     label: "City",              type: "text", required: true  },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "providerName",     label: "Health Care Center name",    type: "text", required: true },
      { name: "providerAddress",  label: "Health Care Center address", type: "text", required: true },
      { name: "physicianName",    label: "Physician full legal name",  type: "text", required: true },
      { name: "physicianAddress", label: "Physician address",          type: "text", required: true },
    ],
  },
  {
    label: "Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date of Agreement", type: "date", required: true },
    ],
  },
  {
    label: "Licensure",
    fields: [
      { name: "licenseState", label: "State where Physician holds medical license", type: "text", required: true },
      {
        name: "terminationNoticeDays",
        label: "Days written notice required for termination",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
    ],
  },
  {
    label: "Compensation",
    fields: [
      {
        name: "compensationDay",
        label: "Day of month compensation is paid",
        type: "text",
        required: true,
        placeholder: "e.g. 15th",
      },
      {
        name: "compensationTerms",
        label: "Additional compensation details (optional)",
        type: "textarea",
        required: false,
        placeholder: "e.g. rate, method, schedule…",
      },
    ],
  },
  {
    label: "Scope of Services",
    fields: [
      {
        name: "scopeServices",
        label: "Describe the scope of medical services",
        type: "textarea",
        required: true,
        placeholder: "Clinical, educational, and related services to be rendered…",
      },
    ],
  },
  {
    label: "Legal Compliance",
    fields: [
      {
        name: "disputeResolutionClause",
        label: "Dispute resolution preference",
        type: "select",
        required: true,
        options: [
          { value: "mediation",    label: "Mediation before litigation" },
          { value: "arbitration",  label: "Binding Arbitration" },
          { value: "litigation",   label: "Direct Court Litigation" },
          { value: "negotiation",  label: "Good-Faith Negotiation first" },
        ],
      },
      {
        name: "governingLaw",
        label: "Governing law state",
        type: "text",
        required: true,
        placeholder: "e.g. California",
      },
    ],
  },
  {
    label: "Execution / Signatures",
    fields: [
      { name: "providerSign",   label: "Health Care Center signatory name", type: "text", required: true },
      { name: "providerDate",   label: "Health Care Center signing date",   type: "date", required: true },
      { name: "physicianSign",  label: "Physician signature name",          type: "text", required: true },
      { name: "physicianDate",  label: "Physician signing date",            type: "date", required: true },
    ],
  },
];

// ─── PDF Generator ────────────────────────────────────────────────────────────

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const PAGE_W       = 612;
  const PAGE_H       = 792;
  const L            = 54;
  const R            = PAGE_W - 54;
  const CONTENT_W    = R - L;
  const BOTTOM       = 54;
  let   y            = 54;

  // ── helpers ────────────────────────────────────────────────────────────────

  const blank = (val?: string, fill = "_______________") =>
    val && val.trim() ? val.trim() : fill;

  const checkPage = (need = 14) => {
    if (y + need > PAGE_H - BOTTOM) { doc.addPage(); y = 54; }
  };

  /** Wrapped body text at current y */
  const printLines = (text: string, x: number, maxW: number, lineH = 13) => {
    doc.splitTextToSize(text, maxW).forEach((line: string) => {
      checkPage(lineH);
      doc.text(line, x, y);
      y += lineH;
    });
  };

  /** Section heading — uppercase, bold, 11 pt */
  const heading = (text: string, gap = 12) => {
    y += gap;
    checkPage(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text.toUpperCase(), L, y);
    y += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
  };

  /** Sub-heading — bold, 10 pt */
  const subHead = (text: string, gap = 6) => {
    y += gap;
    checkPage(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, L, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
  };

  /** Body paragraph */
  const body = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    printLines(text, L + indent, CONTENT_W - indent);
    y += 2;
  };

  /** Bullet item with bold label */
  const bullet = (label: string, value: string) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    const prefix = `\u2022  ${label}: `;
    const prefW  = doc.getTextWidth(prefix);
    doc.text(prefix, L + 12, y);
    doc.setFont("helvetica", "normal");
    const vLines = doc.splitTextToSize(value, CONTENT_W - 12 - prefW);
    doc.text(vLines[0], L + 12 + prefW, y);
    for (let i = 1; i < vLines.length; i++) {
      y += 13; checkPage(13);
      doc.text(vLines[i], L + 12 + prefW, y);
    }
    y += 14;
  };

  /** Plain bullet (no bold label) */
  const plainBullet = (text: string) => {
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const prefix = "\u2022  ";
    const prefW  = doc.getTextWidth(prefix);
    const lines  = doc.splitTextToSize(text, CONTENT_W - 12 - prefW);
    doc.text(prefix, L + 12, y);
    doc.text(lines[0], L + 12 + prefW, y);
    for (let i = 1; i < lines.length; i++) {
      y += 13; checkPage(13);
      doc.text(lines[i], L + 12 + prefW, y);
    }
    y += 13;
  };

  /** Numbered clause e.g. "5.1  Title  body…" */
  const clause = (num: string, title: string, bodyText: string) => {
    checkPage(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    const prefix = title ? `${num}  ${title}  ` : `${num}  `;
    const prefW  = doc.getTextWidth(prefix);
    doc.text(prefix, L, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(bodyText, CONTENT_W - prefW);
    doc.text(lines[0] ?? "", L + prefW, y);
    y += 13;
    for (let i = 1; i < lines.length; i++) {
      checkPage(13);
      doc.text(lines[i], L + prefW, y);
      y += 13;
    }
    y += 3;
  };

  /** Horizontal divider */
  const divider = () => {
    checkPage(12);
    doc.setDrawColor(180, 180, 180);
    doc.line(L, y, R, y);
    y += 8;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PHYSICIAN SERVICES AGREEMENT", PAGE_W / 2, y, { align: "center" });
  y += 8;
  // underline
  const titleW = doc.getTextWidth("PHYSICIAN SERVICES AGREEMENT");
  doc.setDrawColor(0, 0, 0);
  doc.line(PAGE_W / 2 - titleW / 2, y, PAGE_W / 2 + titleW / 2, y);
  y += 18;

  // Intro paragraph
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  body(
    `This Physician Services Agreement ("Agreement") is entered into as of ` +
    `${blank(v.effectiveDate)} ("Effective Date"), by and between:`
  );
  y += 4;

  // Provider block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(blank(v.providerName, "________________________"), L, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `, a healthcare entity located at ${blank(v.providerAddress)} ("Health Care Center"),`,
    L + doc.getTextWidth(blank(v.providerName, "________________________")),
    y
  );
  y += 16;

  doc.text("And", L, y);
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.text(blank(v.physicianName, "________________________"), L, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `, a licensed physician ("Physician").`,
    L + doc.getTextWidth(blank(v.physicianName, "________________________")),
    y
  );
  y += 16;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  body(
    'The Health Care Center and the Physician may be referred to individually as a "Party" ' +
    'and collectively as the "Parties."'
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  divider();

  // ── 1. RECITALS ─────────────────────────────────────────────────────────────

  heading("1. Recitals");
  body(
    "WHEREAS, the Health Care Center desires to retain the services of the Physician to provide " +
    "professional medical services, including clinical, educational, and related services; and"
  );
  y += 4;
  body(
    `WHEREAS, the Physician represents that they are duly licensed to practice medicine in the ` +
    `State of ${blank(v.licenseState)} and are in good standing with all applicable regulatory authorities; and`
  );
  y += 4;
  body(
    "WHEREAS, the Parties desire to define the terms and conditions under which such services " +
    "shall be rendered;"
  );
  y += 4;
  body(
    "NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:"
  );

  divider();

  // ── 2. SCOPE OF SERVICES ────────────────────────────────────────────────────

  heading("2. Scope of Services");
  clause("2.1", "",
    "The Health Care Center shall refer patients to the Physician for in-person consultations, " +
    "evaluations, treatment, and, when appropriate, the prescribing of medications or refills."
  );
  clause("2.2", "",
    "The Physician agrees to accept such referrals and to provide services in accordance with " +
    "generally accepted standards of medical practice."
  );
  clause("2.3", "",
    "The Physician shall not provide treatment for emergency or life-threatening conditions and " +
    "shall promptly refer such patients to emergency medical services or appropriate specialists."
  );
  clause("2.4", "",
    "The Physician shall render services consistent with their training, qualifications, and " +
    "applicable medical standards."
  );

  if (v.scopeServices && v.scopeServices.trim()) {
    subHead("Additional Scope Details");
    body(v.scopeServices.trim(), 12);
  }

  divider();

  // ── 3. LICENSURE AND QUALIFICATIONS ─────────────────────────────────────────

  heading("3. Licensure and Qualifications");
  subHead("3.1  The Physician represents and warrants that they:");
  plainBullet(`Hold an active and unrestricted medical license in the State of ${blank(v.licenseState)};`);
  plainBullet("Are duly authorized to prescribe medications;");
  plainBullet("Are not subject to probation, suspension, or disciplinary action.");
  y += 4;
  clause("3.2", "",
    "The Physician shall maintain all required licenses, certifications, and credentials throughout " +
    "the term of this Agreement and shall immediately notify the Health Care Center of any change in licensure status."
  );

  divider();

  // ── 4. COMPLIANCE WITH LAWS ──────────────────────────────────────────────────

  heading("4. Compliance with Laws");
  body(
    "The Physician shall comply with all applicable federal, state, and local laws, regulations, " +
    "and professional standards, including but not limited to:"
  );
  y += 4;
  plainBullet("Medical licensing laws");
  plainBullet("HIPAA and patient privacy regulations");
  plainBullet("Controlled substances laws");
  plainBullet("Health and safety regulations");

  divider();

  // ── 5. INDEPENDENT CONTRACTOR STATUS ────────────────────────────────────────

  heading("5. Independent Contractor Status");
  clause("5.1", "", "The Physician is an independent contractor and not an employee of the Health Care Center.");
  clause("5.2", "",
    "Nothing in this Agreement shall be construed to create an employer-employee, partnership, " +
    "or joint venture relationship."
  );
  clause("5.3", "",
    "The Physician shall be solely responsible for payment of all taxes, insurance, and benefits " +
    "arising from their services."
  );

  divider();

  // ── 6. TERM AND TERMINATION ──────────────────────────────────────────────────

  heading("6. Term and Termination");
  clause("6.1", "",
    `This Agreement shall commence on the Effective Date and shall continue until terminated by ` +
    `either Party upon ${blank(v.terminationNoticeDays, "___")} days' written notice, unless earlier ` +
    `terminated pursuant to this Agreement.`
  );
  subHead("6.2  Either Party may terminate immediately for cause, including:");
  plainBullet("Loss, suspension, or restriction of medical license;");
  plainBullet("Exclusion from Medicare, Medicaid, or government programs;");
  plainBullet("Breach of this Agreement not cured within ten (10) business days;");
  plainBullet("Professional misconduct or unethical behavior;");
  plainBullet("Criminal conviction involving fraud, drugs, or moral turpitude;");
  plainBullet("Failure to maintain required credentials.");

  divider();

  // ── 7. COMPENSATION ──────────────────────────────────────────────────────────

  heading("7. Compensation");
  clause("7.1", "",
    `The Health Care Center shall compensate the Physician on the ${blank(v.compensationDay, "___")} ` +
    `day of each month or as otherwise mutually agreed.`
  );
  clause("7.2", "",
    "Compensation shall be subject to applicable withholdings and deductions as required by law."
  );
  clause("7.3", "",
    "No compensation shall be owed for services not performed or rendered outside the scope of this Agreement."
  );

  if (v.compensationTerms && v.compensationTerms.trim()) {
    subHead("Additional Compensation Terms");
    body(v.compensationTerms.trim(), 12);
  }

  divider();

  // ── 8. NON-EXCLUSIVITY ───────────────────────────────────────────────────────

  heading("8. Non-Exclusivity");
  body(
    "This Agreement is non-exclusive. The Health Care Center may engage other physicians, and the " +
    "Physician may engage in other professional activities, provided such activities do not interfere " +
    "with the Physician's obligations under this Agreement."
  );

  divider();

  // ── 9. MEDICAL RECORDS ───────────────────────────────────────────────────────

  heading("9. Medical Records");
  body(
    "All patient records, charts, and documentation created in connection with services provided " +
    "under this Agreement shall remain the exclusive property of the Health Care Center."
  );

  divider();

  // ── 10. PATIENT RELATIONSHIPS ────────────────────────────────────────────────

  heading("10. Patient Relationships");
  body(
    "Patients treated under this Agreement are patients of the Health Care Center. The Physician " +
    "shall not independently solicit or treat such patients outside the scope of this Agreement " +
    "without written authorization."
  );

  divider();

  // ── 11. CONFIDENTIALITY ──────────────────────────────────────────────────────

  heading("11. Confidentiality");
  body(
    "The Physician shall maintain strict confidentiality regarding all patient information and " +
    "Health Care Center records, including Protected Health Information (PHI), in compliance with " +
    "HIPAA and applicable law. These obligations shall survive termination of this Agreement."
  );

  divider();

  // ── 12. NON-SOLICITATION AND NON-COMPETITION ─────────────────────────────────

  heading("12. Non-Solicitation and Non-Competition");
  body("For a period of one (1) year following termination of this Agreement, the Physician shall not:");
  y += 4;
  plainBullet("Treat or solicit patients of the Health Care Center;");
  plainBullet("Solicit employees or contractors of the Health Care Center;");
  plainBullet("Engage in competing services that conflict with the Health Care Center's business interests.");

  divider();

  // ── 13. CONTINUING EDUCATION ─────────────────────────────────────────────────

  heading("13. Continuing Education");
  body(
    "The Physician shall be solely responsible for maintaining all continuing medical education " +
    "requirements and professional certifications."
  );

  divider();

  // ── 14. FACILITIES ───────────────────────────────────────────────────────────

  heading("14. Facilities");
  body(
    "The Health Care Center may, but is not obligated to, provide facilities or equipment. " +
    "The Physician shall conduct in-person consultations as required."
  );

  divider();

  // ── 15. TERMINATION OBLIGATIONS ──────────────────────────────────────────────

  heading("15. Termination Obligations");
  body("Upon termination:");
  y += 4;
  plainBullet("The Physician shall cooperate in transferring patient care;");
  plainBullet("Continue necessary care for up to thirty (30) days if required;");
  plainBullet("Return all Health Care Center property;");
  plainBullet("Settle all outstanding obligations.");

  divider();

  // ── 16. INDEMNIFICATION ──────────────────────────────────────────────────────

  heading("16. Indemnification");
  clause("16.1", "By Physician:",
    "The Physician shall indemnify and hold harmless the Health Care Center from any claims, damages, " +
    "or liabilities arising from the Physician's negligence, misconduct, or breach of this Agreement."
  );
  clause("16.2", "By Health Care Center:",
    "The Health Care Center shall indemnify the Physician for claims arising solely from the Health " +
    "Care Center's negligence."
  );

  divider();

  // ── 17. FORCE MAJEURE ────────────────────────────────────────────────────────

  heading("17. Force Majeure");
  body(
    "Neither Party shall be liable for failure to perform due to events beyond reasonable control, " +
    "including acts of God, pandemics, governmental actions, or other force majeure events."
  );

  divider();

  // ── 18. GOVERNING LAW ────────────────────────────────────────────────────────

  heading("18. Governing Law");
  body(
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ` +
    `${blank(v.governingLaw || v.state)}.`
  );

  divider();

  // ── 19. DISPUTE RESOLUTION ───────────────────────────────────────────────────

  heading("19. Dispute Resolution");
  body(
    "The Parties shall first attempt to resolve disputes through good-faith negotiation. " +
    `If unresolved, disputes shall proceed to ${blank(v.disputeResolutionClause, "mediation")} prior to litigation.`
  );

  divider();

  // ── 20. ASSIGNMENT ───────────────────────────────────────────────────────────

  heading("20. Assignment");
  body(
    "The Physician may not assign this Agreement without written consent. The Health Care Center " +
    "may assign this Agreement as necessary."
  );

  divider();

  // ── 21. SEVERABILITY ─────────────────────────────────────────────────────────

  heading("21. Severability");
  body(
    "If any provision is found unenforceable, the remaining provisions shall remain in full force and effect."
  );

  divider();

  // ── 22. ENTIRE AGREEMENT ─────────────────────────────────────────────────────

  heading("22. Entire Agreement");
  body(
    "This Agreement constitutes the entire agreement between the Parties and supersedes all prior " +
    "agreements or understandings."
  );

  divider();

  // ── 23. AMENDMENTS ───────────────────────────────────────────────────────────

  heading("23. Amendments");
  body(
    "This Agreement may be amended only by a written document signed by both Parties."
  );

  divider();

  // ── 24. WAIVER ───────────────────────────────────────────────────────────────

  heading("24. Waiver");
  body(
    "Failure to enforce any provision shall not constitute a waiver of future enforcement."
  );

  divider();

  // ── 25. ATTORNEYS' FEES ──────────────────────────────────────────────────────

  heading("25. Attorneys' Fees");
  body(
    "The prevailing Party in any legal proceeding shall be entitled to recover reasonable " +
    "attorneys' fees and costs."
  );

  divider();

  // ── 26. SIGNATURES ───────────────────────────────────────────────────────────

  heading("26. Signatures");
  body(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above."
  );
  y += 12;

  const colL = L;
  const colR = L + CONTENT_W / 2 + 20;
  const sigLine = "_____________________________";

  checkPage(90);

  // Column headings
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("HEALTH CARE CENTER", colL, y);
  doc.text("PHYSICIAN", colR, y);
  y += 18;

  // Signature lines
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  doc.text(sigLine, colL, y);
  doc.text(sigLine, colR, y);
  y += 5;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.text(blank(v.providerSign,  "Provider Signature"), colL, y);
  doc.text(blank(v.physicianSign, "Physician Signature"), colR, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(`Name: ${blank(v.providerName)}`,    colL, y);
  doc.text(`Name: ${blank(v.physicianName)}`,   colR, y);
  y += 14;
  doc.text(`Date: ${blank(v.providerDate)}`,    colL, y);
  doc.text(`Date: ${blank(v.physicianDate)}`,   colR, y);
  y += 14;
  doc.text(`Address: ${blank(v.providerAddress)}`,   colL, y);
  doc.text(`Address: ${blank(v.physicianAddress)}`,  colR, y);

  // ── Footer on every page ───────────────────────────────────────────────────

  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Physician Services Agreement  |  ${blank(v.providerName)} & ${blank(v.physicianName)}  |  Page ${i} of ${totalPages}`,
      PAGE_W / 2,
      PAGE_H - 24,
      { align: "center" }
    );
    doc.setTextColor(0, 0, 0);
  }

  doc.save("physician_services_agreement.pdf");
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PhysicianServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Physician Services Agreement"
      subtitle="Complete each step to generate your PDF"
      onGenerate={generatePDF}
      documentType="physicianservicesagreement"
    />
  );
}