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
              { value: "ON", label: "Ontario" }, { value: "QC", label: "Quebec" },
              { value: "PE", label: "Prince Edward Island" }, { value: "SK", label: "Saskatchewan" },
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
    label: "Client Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Client?",
        type: "text",
        required: true,
        placeholder: "Enter client's full legal name",
      },
      {
        name: "party1Type",
        label: "Is the client an individual or a business?",
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
    label: "Client Address",
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
    label: "Client Contact",
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
    label: "Trainer Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Trainer?",
        type: "text",
        required: true,
        placeholder: "Enter trainer's full legal name",
      },
      {
        name: "party2Type",
        label: "Is the trainer an individual or a business?",
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
    label: "Trainer Address",
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
    label: "Trainer Contact",
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
        name: "sessionDuration",
        label: "Duration of each Training Session (minutes)",
        type: "text",
        required: true,
        placeholder: "e.g. 60",
      },
      {
        name: "totalSessions",
        label: "Total number of Training Sessions in the package",
        type: "text",
        required: true,
        placeholder: "e.g. 12",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Cost per Training Session ($)",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "sessionExpiry",
        label: "Sessions must be used within how many days?",
        type: "text",
        required: true,
        placeholder: "e.g. 90",
      },
      {
        name: "deposit",
        label: "Non-refundable Deposit Amount ($)",
        type: "text",
        required: true,
        placeholder: "$0.00",
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
        label: "Client Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Trainer Signature (Type full legal name)",
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

// ─── PDF helpers ────────────────────────────────────────────────────────────

const PAGE_H = 297;   // A4 mm
const MARGIN_X = 20;
const CONTENT_W = 170;
const LINE_H = 5.5;
const BOTTOM_MARGIN = 20;

interface PDFCtx {
  doc: jsPDF;
  y: number;
}

/** Ensure there is at least `needed` mm left on the page; add new page if not. */
function ensureSpace(ctx: PDFCtx, needed: number) {
  if (ctx.y + needed > PAGE_H - BOTTOM_MARGIN) {
    ctx.doc.addPage();
    ctx.y = 20;
  }
}

/** Print a bold section heading (numbered). */
function printHeading(ctx: PDFCtx, text: string) {
  ensureSpace(ctx, 10);
  ctx.doc.setFontSize(11);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.text(text, MARGIN_X, ctx.y);
  ctx.y += 7;
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(10);
}

/** Print a paragraph of body text. */
function printBody(ctx: PDFCtx, text: string) {
  const lines = ctx.doc.splitTextToSize(text, CONTENT_W);
  ensureSpace(ctx, lines.length * LINE_H + 3);
  ctx.doc.text(lines, MARGIN_X, ctx.y);
  ctx.y += lines.length * LINE_H + 3;
}

/** Print a single sub-clause line (e.g. "1.1 …"). */
function printClause(ctx: PDFCtx, clause: string, text: string) {
  const full = `${clause}  ${text}`;
  const lines = ctx.doc.splitTextToSize(full, CONTENT_W);
  ensureSpace(ctx, lines.length * LINE_H + 2);
  ctx.doc.text(lines, MARGIN_X, ctx.y);
  ctx.y += lines.length * LINE_H + 2;
}

/** Print a bullet point indented from the margin. */
function printBullet(ctx: PDFCtx, text: string) {
  const bulletX = MARGIN_X + 6;
  const textX = MARGIN_X + 11;
  const wrapW = CONTENT_W - 11;
  const lines = ctx.doc.splitTextToSize(text, wrapW);
  ensureSpace(ctx, lines.length * LINE_H + 2);
  ctx.doc.text("\u2022", bulletX, ctx.y);
  ctx.doc.text(lines, textX, ctx.y);
  ctx.y += lines.length * LINE_H + 2;
}

// ─── PDF generator ──────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ctx: PDFCtx = { doc, y: 20 };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PERSONAL TRAINING AGREEMENT", 105, ctx.y, { align: "center" });
  ctx.y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const effectiveDate = values.effectiveDate || "___________";
  const jurisdiction  = `${values.state || "___________"}, ${(values.country || "").toUpperCase() || "___________"}`;
  const clientName    = values.party1Name  || "___________________________";
  const trainerName   = values.party2Name  || "___________________________";
  const sessionMins   = values.sessionDuration || "____";
  const totalSessions = values.totalSessions   || "____";
  const costPerSession = values.paymentAmount  || "$____";
  const sessionExpiry  = values.sessionExpiry  || "____";
  const depositAmt     = values.deposit        || "$____";
  const stateGov       = values.state          || "____________________";

  // ── PREAMBLE ───────────────────────────────────────────────────────────
  printBody(
    ctx,
    `This Personal Training Agreement ("Agreement") is made and entered into as of ${effectiveDate} ("Effective Date"), by and between:`
  );
  ctx.y += 1;
  doc.setFont("helvetica", "bold");
  printBody(ctx, `Client: ${clientName}`);
  doc.setFont("helvetica", "normal");
  printBody(ctx, "And");
  doc.setFont("helvetica", "bold");
  printBody(ctx, `Trainer: ${trainerName}`);
  doc.setFont("helvetica", "normal");
  printBody(ctx, '(collectively referred to as the "Parties").');
  ctx.y += 4;

  // ── 1. PURPOSE AND SCOPE OF SERVICES ───────────────────────────────────
  printHeading(ctx, "1. PURPOSE AND SCOPE OF SERVICES");
  printClause(ctx, "1.1", "The Client hereby engages the Trainer to provide personal fitness training services, and the Trainer agrees to provide such services in accordance with the terms of this Agreement.");
  printClause(ctx, "1.2", "The Trainer shall design and implement a personalized fitness and exercise program based upon the Client's stated goals, physical condition, experience, and fitness level.");
  printClause(ctx, "1.3", "The Trainer reserves the right, in its sole discretion, to assign a different trainer to the Client at any time.");
  printClause(ctx, "1.4", `Each personal training session shall be approximately ${sessionMins} minutes in duration (each a "Training Session").`);
  ctx.y += 3;

  // ── 2. ACKNOWLEDGMENT OF RISK AND DISCLOSURE ───────────────────────────
  printHeading(ctx, "2. ACKNOWLEDGMENT OF RISK AND DISCLOSURE");
  printClause(ctx, "2.1", "The Client acknowledges that participation in physical exercise involves inherent risks, including but not limited to physical injury, illness, or death.");
  printClause(ctx, "2.2", "The Client confirms that they have completed, signed, and submitted the Full Disclosure of Physical Conditions / Informed Consent and Assumption of Risk and Release of Liability, which is incorporated into this Agreement by reference.");
  printClause(ctx, "2.3", "The Client affirms that they have disclosed all known medical conditions that may affect their ability to participate safely in training.");
  ctx.y += 3;

  // ── 3. TRAINING PACKAGES AND FEES ──────────────────────────────────────
  printHeading(ctx, "3. TRAINING PACKAGES AND FEES");
  printClause(ctx, "3.1", `The Client has selected a training package consisting of ${totalSessions} Training Sessions ("Training Package").`);
  printClause(ctx, "3.2", `The cost per Training Session shall be ${costPerSession}, payable as follows:`);
  printBullet(ctx, "Fifty percent (50%) of the total package fee due prior to commencement of the first session; and");
  printBullet(ctx, "The remaining balance due upon completion of the final Training Session or within forty-five (45) days of the first session, whichever occurs first.");
  printClause(ctx, "3.3", "If the Client elects to purchase individual sessions, payment shall be made in full prior to each session.");
  printClause(ctx, "3.4", `Any Training Session not used within ${sessionExpiry} days of the Effective Date shall be forfeited without refund.`);
  printClause(ctx, "3.5", "The Trainer reserves the right to adjust pricing at any time. The Client waives any requirement for prior notice of such adjustments.");
  ctx.y += 3;

  // ── 4. CANCELLATION AND NO-SHOW POLICY ────────────────────────────────
  printHeading(ctx, "4. CANCELLATION AND NO-SHOW POLICY");
  printClause(ctx, "4.1", "The Client must provide a minimum of twenty-four (24) hours' notice to cancel or reschedule a Training Session.");
  printClause(ctx, "4.2", "Failure to provide proper notice or arriving more than fifteen (15) minutes late shall result in forfeiture of the session, which shall be charged in full.");
  printClause(ctx, "4.3", "Missed sessions are non-refundable and non-transferable.");
  ctx.y += 3;

  // ── 5. DEPOSIT ─────────────────────────────────────────────────────────
  printHeading(ctx, "5. DEPOSIT");
  printClause(ctx, "5.1", `Upon execution of this Agreement, the Client shall pay a non-refundable deposit of ${depositAmt} to secure the Trainer's availability.`);
  printClause(ctx, "5.2", "The deposit shall only be refunded if the Trainer is unable to perform services due to cancellation initiated by the Trainer.");
  ctx.y += 3;

  // ── 6. TERM AND TERMINATION ────────────────────────────────────────────
  printHeading(ctx, "6. TERM AND TERMINATION");
  printClause(ctx, "6.1", "This Agreement shall commence on the Effective Date and shall remain in effect until completion of the Training Package or until terminated in accordance with this Agreement.");
  printClause(ctx, "6.2", "Either Party may terminate this Agreement upon thirty (30) days' written notice.");
  printClause(ctx, "6.3", "Upon termination:");
  printBullet(ctx, "If terminated by the Client, all unused sessions shall be forfeited without refund.");
  printBullet(ctx, "If terminated by the Trainer, any unused session fees shall be refunded to the Client.");
  ctx.y += 3;

  // ── 7. WAIVER, RELEASE, AND INDEMNIFICATION ────────────────────────────
  printHeading(ctx, "7. WAIVER, RELEASE, AND INDEMNIFICATION");
  printClause(ctx, "7.1", "The Client voluntarily assumes all risks associated with participation in training activities.");
  printClause(ctx, "7.2", "The Client agrees to release, indemnify, and hold harmless the Trainer, its employees, agents, and contractors from any claims, injuries, losses, or damages arising from participation in training, including failure to disclose medical conditions.");
  ctx.y += 3;

  // ── 8. INDEPENDENT CONTRACTOR STATUS ──────────────────────────────────
  printHeading(ctx, "8. INDEPENDENT CONTRACTOR STATUS");
  printClause(ctx, "8.1", "The Trainer is an independent contractor and not an employee of the Client.");
  printClause(ctx, "8.2", "Nothing in this Agreement shall be construed to create an employment, partnership, or agency relationship.");
  ctx.y += 3;

  // ── 9. COMPLIANCE WITH LAWS ────────────────────────────────────────────
  printHeading(ctx, "9. COMPLIANCE WITH LAWS");
  printBody(ctx, "The Trainer shall comply with all applicable federal, state, and local laws, including licensing, certification, and safety regulations.");
  ctx.y += 3;

  // ── 10. FORCE MAJEURE ─────────────────────────────────────────────────
  printHeading(ctx, "10. FORCE MAJEURE");
  printBody(ctx, "Neither Party shall be liable for failure or delay in performance caused by events beyond reasonable control, including but not limited to acts of God, pandemics, government orders, natural disasters, or other unforeseen circumstances.");
  ctx.y += 3;

  // ── 11. GOVERNING LAW ─────────────────────────────────────────────────
  printHeading(ctx, "11. GOVERNING LAW");
  printBody(ctx, `This Agreement shall be governed by and construed in accordance with the laws of the State of ${stateGov}.`);
  ctx.y += 3;

  // ── 12. ASSIGNMENT ────────────────────────────────────────────────────
  printHeading(ctx, "12. ASSIGNMENT");
  printBody(ctx, "Neither Party may assign or transfer this Agreement without the prior written consent of the other Party. Any unauthorized assignment shall be void.");
  ctx.y += 3;

  // ── 13. SEVERABILITY ──────────────────────────────────────────────────
  printHeading(ctx, "13. SEVERABILITY");
  printBody(ctx, "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
  ctx.y += 3;

  // ── 14. ENTIRE AGREEMENT ──────────────────────────────────────────────
  printHeading(ctx, "14. ENTIRE AGREEMENT");
  printBody(ctx, "This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements.");
  ctx.y += 3;

  // ── 15. AMENDMENTS ────────────────────────────────────────────────────
  printHeading(ctx, "15. AMENDMENTS");
  printBody(ctx, "This Agreement may be amended only by a written document signed by both Parties.");
  ctx.y += 3;

  // ── 16. BINDING ARBITRATION ───────────────────────────────────────────
  printHeading(ctx, "16. BINDING ARBITRATION");
  printBody(ctx, "Any dispute arising out of or relating to this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.");
  ctx.y += 3;

  // ── 17. ATTORNEYS' FEES ───────────────────────────────────────────────
  printHeading(ctx, "17. ATTORNEYS' FEES");
  printBody(ctx, "The prevailing Party in any legal proceeding shall be entitled to recover reasonable attorneys' fees and costs.");
  ctx.y += 3;

  // ── Additional Terms (if provided) ────────────────────────────────────
  if (values.additionalTerms && values.additionalTerms.trim()) {
    printHeading(ctx, "18. ADDITIONAL TERMS AND CONDITIONS");
    const addLines = doc.splitTextToSize(values.additionalTerms, CONTENT_W);
    ensureSpace(ctx, addLines.length * LINE_H + 4);
    doc.text(addLines, MARGIN_X, ctx.y);
    ctx.y += addLines.length * LINE_H + 6;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────
  ensureSpace(ctx, 60);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", MARGIN_X, ctx.y);
  ctx.y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", MARGIN_X, ctx.y);
  ctx.y += 10;

  // Trainer column (left) | Client column (right)
  const colL = MARGIN_X;
  const colR = 110;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TRAINER", colL, ctx.y);
  doc.text("CLIENT", colR, ctx.y);
  ctx.y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text("Name:", colL, ctx.y);
  doc.text(trainerName, colL + 14, ctx.y);
  doc.text("Name:", colR, ctx.y);
  doc.text(clientName, colR + 14, ctx.y);
  ctx.y += 8;

  doc.text("Signature:", colL, ctx.y);
  doc.text(values.party2Signature || "___________________________", colL + 20, ctx.y);
  doc.text("Signature:", colR, ctx.y);
  doc.text(values.party1Signature || "___________________________", colR + 20, ctx.y);
  ctx.y += 8;

  doc.text("Date:", colL, ctx.y);
  doc.text(new Date().toLocaleDateString(), colL + 12, ctx.y);
  doc.text("Date:", colR, ctx.y);
  doc.text(new Date().toLocaleDateString(), colR + 12, ctx.y);
  ctx.y += 8;

  if (values.party2Email) {
    doc.text("Email:", colL, ctx.y);
    doc.text(values.party2Email, colL + 14, ctx.y);
    doc.text("Email:", colR, ctx.y);
    doc.text(values.party1Email || "", colR + 14, ctx.y);
    ctx.y += 7;
  }

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

  doc.save("personal_training_agreement.pdf");
};

export default function PersonalTrainingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Personal Training Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="personaltrainingagreement"
    />
  );
}