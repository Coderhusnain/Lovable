import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Tutor Details",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Tutor?",
        type: "text",
        required: true,
        placeholder: "Enter tutor's full legal name",
      },
      {
        name: "party1Type",
        label: "Is the tutor an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Tutor Address",
    fields: [
      {
        name: "party1Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party1City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party1Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Tutor Contact",
    fields: [
      {
        name: "party1Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Parent / Guardian Details",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Parent / Guardian?",
        type: "text",
        required: true,
        placeholder: "Enter parent/guardian's full legal name",
      },
      {
        name: "party2Type",
        label: "Is this party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Parent / Guardian Address",
    fields: [
      {
        name: "party2Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party2City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party2Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Parent / Guardian Contact",
    fields: [
      {
        name: "party2Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Session Details",
    fields: [
      {
        name: "studentName",
        label: "Student Name(s)",
        type: "text",
        required: true,
        placeholder: "Enter student full name(s)",
      },
      {
        name: "startDate",
        label: "Tutoring Start Date",
        type: "date",
        required: true,
      },
      {
        name: "sessionLocation",
        label: "Tutoring Location",
        type: "text",
        required: true,
        placeholder: "e.g. 123 Main St, or Online via Zoom",
      },
      {
        name: "sessionSchedule",
        label: "Schedule (Days, Times, Duration)",
        type: "text",
        required: true,
        placeholder: "e.g. Mondays & Wednesdays, 4:00–5:00 PM",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Compensation Amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "paymentMethod",
        label: "Method of Payment",
        type: "text",
        required: true,
        placeholder: "e.g. cheque, bank transfer, cash",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "terminationDate",
        label: "Agreement Termination Date",
        type: "date",
        required: true,
      },
      {
        name: "duration",
        label: "What is the duration of this agreement?",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms or special conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "Tutor Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Parent / Guardian Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "witnessName",
        label: "Witness Name (Optional)",
        type: "text",
        required: false,
        placeholder: "Witness full legal name",
      },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── PDF helpers ─────────────────────────────────────────────────────────────

const PAGE_H     = 297;   // A4 mm height
const MARGIN_X   = 20;
const CONTENT_W  = 170;
const LINE_H     = 5.5;
const BOTTOM_PAD = 20;

interface Ctx { doc: jsPDF; y: number; }

/** Add a new page and reset y if there is not enough space remaining. */
function ensureSpace(ctx: Ctx, needed: number) {
  if (ctx.y + needed > PAGE_H - BOTTOM_PAD) {
    ctx.doc.addPage();
    ctx.y = 20;
  }
}

/** Bold numbered section heading. */
function printHeading(ctx: Ctx, text: string) {
  ensureSpace(ctx, 12);
  ctx.doc.setFontSize(11);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.text(text, MARGIN_X, ctx.y);
  ctx.y += 7;
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(10);
}

/** Wrapped paragraph of normal body text. */
function printBody(ctx: Ctx, text: string, extraAfter = 3) {
  const lines = ctx.doc.splitTextToSize(text, CONTENT_W);
  ensureSpace(ctx, lines.length * LINE_H + extraAfter);
  ctx.doc.text(lines, MARGIN_X, ctx.y);
  ctx.y += lines.length * LINE_H + extraAfter;
}

/** Sub-clause with prefix (e.g. "a.") and wrapped body text. */
function printClause(ctx: Ctx, prefix: string, text: string) {
  const full  = `${prefix}  ${text}`;
  const lines = ctx.doc.splitTextToSize(full, CONTENT_W);
  ensureSpace(ctx, lines.length * LINE_H + 2);
  ctx.doc.text(lines, MARGIN_X, ctx.y);
  ctx.y += lines.length * LINE_H + 2;
}

/** Indented bullet point. */
function printBullet(ctx: Ctx, text: string) {
  const bulletX = MARGIN_X + 5;
  const textX   = MARGIN_X + 11;
  const wrapW   = CONTENT_W - 11;
  const lines   = ctx.doc.splitTextToSize(text, wrapW);
  ensureSpace(ctx, lines.length * LINE_H + 2);
  ctx.doc.text("\u2022", bulletX, ctx.y);
  ctx.doc.text(lines, textX, ctx.y);
  ctx.y += lines.length * LINE_H + 2;
}

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ctx: Ctx = { doc, y: 20 };

  // Convenience aliases
  const effectiveDate   = values.effectiveDate   || "___________";
  const tutorName       = values.party1Name       || "___________________________";
  const tutorAddr       = `${values.party1Street || ""}, ${values.party1City || ""}, ${values.party1Zip || ""}`.replace(/^,\s*|,\s*$/g, "") || "___________________________";
  const parentName      = values.party2Name       || "___________________________";
  const parentAddr      = `${values.party2Street || ""}, ${values.party2City || ""}, ${values.party2Zip || ""}`.replace(/^,\s*|,\s*$/g, "") || "___________________________";
  const studentName     = values.studentName      || "___________________________";
  const startDate       = values.startDate        || "___________";
  const sessionLoc      = values.sessionLocation  || "___________________________";
  const sessionSched    = values.sessionSchedule  || "___________________________";
  const paymentAmt      = values.paymentAmount    || "___________";
  const paymentMethod   = values.paymentMethod    || "___________";
  const terminationDate = values.terminationDate  || "___________";
  const stateGov        = values.state            || "____________________";

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("TUTORING AGREEMENT", 105, ctx.y, { align: "center" });
  ctx.y += 11;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  printBody(ctx, `This Tutoring Agreement ("Agreement") is made and entered into as of ${effectiveDate} ("Effective Date"), by and between:`);

  doc.setFont("helvetica", "bold");
  printBody(ctx, `${tutorName}, of ${tutorAddr} ("Tutor"),`);
  doc.setFont("helvetica", "normal");
  printBody(ctx, "And");
  doc.setFont("helvetica", "bold");
  printBody(ctx, `${parentName}, of ${parentAddr} ("Parent" or "Parents").`);
  doc.setFont("helvetica", "normal");
  printBody(ctx, `The Tutor and Parent may be referred to individually as a "Party" and collectively as the "Parties."`);
  ctx.y += 4;

  // ── 1. DESCRIPTION OF SERVICES ─────────────────────────────────────────────
  printHeading(ctx, "1. DESCRIPTION OF SERVICES");
  printBody(ctx, `Commencing on ${startDate}, the Tutor shall provide academic tutoring services to the following student(s):`);
  doc.setFont("helvetica", "bold");
  printBody(ctx, studentName);
  doc.setFont("helvetica", "normal");
  printBody(ctx, `Tutoring services shall be provided at ${sessionLoc}, or such other location as mutually agreed by the Parties. The tutoring schedule shall be as follows:`);
  doc.setFont("helvetica", "bold");
  printBody(ctx, sessionSched);
  doc.setFont("helvetica", "normal");
  printBody(ctx, "The Tutor agrees to provide educational instruction consistent with generally accepted tutoring standards and in a professional manner.");
  ctx.y += 3;

  // ── 2. COMPENSATION ────────────────────────────────────────────────────────
  printHeading(ctx, "2. COMPENSATION");
  printBody(ctx, `The Parent agrees to compensate the Tutor for services rendered in the amount of ${paymentAmt}, payable by ${paymentMethod}.`);
  printBody(ctx, "Unless otherwise agreed in writing:");
  printBullet(ctx, "Payment shall be due upon completion of the services or as otherwise specified herein.");
  printBullet(ctx, "No additional fees or expenses shall be reimbursed unless expressly authorized in advance in writing by the Parent.");
  printBody(ctx, "The Tutor shall be solely responsible for all federal, state, and local taxes, including but not limited to income tax, self-employment tax, Social Security, and any other payroll-related obligations.");
  ctx.y += 3;

  // ── 3. TERM ────────────────────────────────────────────────────────────────
  printHeading(ctx, "3. TERM");
  printBody(ctx, `This Agreement shall commence on the Effective Date and shall continue until completion of the services described herein ("Termination Date"), unless earlier terminated in accordance with this Agreement.`);
  printBody(ctx, "The Termination Date may be modified only by mutual written agreement of the Parties.");
  ctx.y += 3;

  // ── 4. TERMINATION ─────────────────────────────────────────────────────────
  printHeading(ctx, "4. TERMINATION");
  printBody(ctx, `This Agreement shall automatically terminate on ${terminationDate}, unless extended in writing.`);
  printBody(ctx, "The Parties acknowledge that this Agreement does not create a continuing or indefinite engagement. The Parent shall have no obligation to provide additional work beyond the scope stated herein unless otherwise agreed in writing.");
  ctx.y += 3;

  // ── 5. INDEPENDENT CONTRACTOR STATUS ──────────────────────────────────────
  printHeading(ctx, "5. INDEPENDENT CONTRACTOR STATUS");
  printBody(ctx, "The Tutor is engaged as an independent contractor and not as an employee of the Parent.");
  printBody(ctx, "Nothing in this Agreement shall be construed to create an employer-employee relationship, partnership, joint venture, or agency relationship.");
  printBody(ctx, "The Tutor shall not be entitled to any employee benefits, including but not limited to health insurance, paid leave, or retirement benefits.");
  ctx.y += 3;

  // ── 6. ASSIGNMENT ──────────────────────────────────────────────────────────
  printHeading(ctx, "6. ASSIGNMENT");
  printBody(ctx, "The Tutor may not assign, transfer, or delegate any rights or obligations under this Agreement without the prior written consent of the Parent. Any unauthorized assignment shall be null and void.");
  ctx.y += 3;

  // ── 7. AMENDMENTS ─────────────────────────────────────────────────────────
  printHeading(ctx, "7. AMENDMENTS");
  printBody(ctx, "This Agreement may be modified or amended only by a written document signed by both Parties.");
  ctx.y += 3;

  // ── 8. INDEMNIFICATION ─────────────────────────────────────────────────────
  printHeading(ctx, "8. INDEMNIFICATION");
  printBody(ctx, "The Tutor agrees to indemnify, defend, and hold harmless the Parent from and against any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:");
  printBullet(ctx, "The Tutor's performance of services;");
  printBullet(ctx, "Any negligent or wrongful act or omission of the Tutor; or");
  printBullet(ctx, "Any breach of this Agreement by the Tutor.");
  ctx.y += 3;

  // ── 9. DEFAULT ─────────────────────────────────────────────────────────────
  printHeading(ctx, "9. DEFAULT");
  printBody(ctx, "The occurrence of any of the following shall constitute a material default under this Agreement:");
  printClause(ctx, "a.", "Failure to make payment when due;");
  printClause(ctx, "b.", "Insolvency or bankruptcy of either Party;");
  printClause(ctx, "c.", "Levy, seizure, or assignment of property for the benefit of creditors;");
  printClause(ctx, "d.", "Failure to perform obligations under this Agreement.");
  ctx.y += 3;

  // ── 10. ENTIRE AGREEMENT ───────────────────────────────────────────────────
  printHeading(ctx, "10. ENTIRE AGREEMENT");
  printBody(ctx, "This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.");
  ctx.y += 3;

  // ── 11. WAIVER ─────────────────────────────────────────────────────────────
  printHeading(ctx, "11. WAIVER");
  printBody(ctx, "The failure of either Party to enforce any provision of this Agreement shall not be deemed a waiver of that provision or of the right to enforce it at a later time.");
  ctx.y += 3;

  // ── 12. SEVERABILITY ───────────────────────────────────────────────────────
  printHeading(ctx, "12. SEVERABILITY");
  printBody(ctx, "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. Any invalid provision shall be modified to the minimum extent necessary to make it enforceable.");
  ctx.y += 3;

  // ── 13. GOVERNING LAW ──────────────────────────────────────────────────────
  printHeading(ctx, "13. GOVERNING LAW");
  printBody(ctx, `This Agreement shall be governed by and construed in accordance with the laws of the State of ${stateGov}, without regard to conflict-of-law principles.`);
  ctx.y += 3;

  // ── Additional Terms (if provided) ────────────────────────────────────────
  if (values.additionalTerms && values.additionalTerms.trim()) {
    printHeading(ctx, "14. ADDITIONAL TERMS AND CONDITIONS");
    printBody(ctx, values.additionalTerms);
    ctx.y += 3;
  }

  // ── EXECUTION / SIGNATURES ────────────────────────────────────────────────
  ensureSpace(ctx, 65);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("14. EXECUTION", MARGIN_X, ctx.y);
  ctx.y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.",
    MARGIN_X, ctx.y
  );
  ctx.y += 10;

  // Two-column signature block
  const colL = MARGIN_X;
  const colR = 110;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("PARENT / GUARDIAN", colL, ctx.y);
  doc.text("TUTOR", colR, ctx.y);
  ctx.y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Signature lines
  doc.text("Signature:", colL, ctx.y);
  doc.text(values.party2Signature || "___________________________", colL + 22, ctx.y);
  doc.text("Signature:", colR, ctx.y);
  doc.text(values.party1Signature || "___________________________", colR + 22, ctx.y);
  ctx.y += 8;

  // Names
  doc.text("Name:", colL, ctx.y);
  doc.text(parentName, colL + 14, ctx.y);
  doc.text("Name:", colR, ctx.y);
  doc.text(tutorName, colR + 14, ctx.y);
  ctx.y += 8;

  // Dates
  doc.text("Date:", colL, ctx.y);
  doc.text(new Date().toLocaleDateString(), colL + 12, ctx.y);
  doc.text("Date:", colR, ctx.y);
  doc.text(new Date().toLocaleDateString(), colR + 12, ctx.y);
  ctx.y += 8;

  // Emails (if captured)
  if (values.party2Email || values.party1Email) {
    doc.text("Email:", colL, ctx.y);
    doc.text(values.party2Email || "", colL + 14, ctx.y);
    doc.text("Email:", colR, ctx.y);
    doc.text(values.party1Email || "", colR + 14, ctx.y);
    ctx.y += 8;
  }

  // Optional witness
  if (values.witnessName) {
    ctx.y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", colL, ctx.y);
    ctx.y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Name:", colL, ctx.y);
    doc.text(values.witnessName, colL + 14, ctx.y);
    ctx.y += 8;
    doc.text("Signature: ___________________________", colL, ctx.y);
    ctx.y += 8;
    doc.text("Date: " + new Date().toLocaleDateString(), colL, ctx.y);
  }

  doc.save("tutoring_agreement.pdf");
};

export default function TutoringAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Tutoring Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="tutoringagreement"
    />
  );
}