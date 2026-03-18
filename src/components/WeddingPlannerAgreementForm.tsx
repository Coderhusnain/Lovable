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
        label: "Effective date of this agreement",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Client Details",
    fields: [
      {
        name: "party1Name",
        label: "Client Full Legal Name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Street",
        label: "Client Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party1City",
        label: "Client City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party1Zip",
        label: "Client ZIP / Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
      {
        name: "party1Email",
        label: "Client Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Client Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Wedding Planner Details",
    fields: [
      {
        name: "party2Name",
        label: "Wedding Planner / Company Name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or company name",
      },
      {
        name: "party2Street",
        label: "Planner Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party2City",
        label: "Planner City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party2Zip",
        label: "Planner ZIP / Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
      {
        name: "party2Email",
        label: "Planner Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Planner Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Event Details",
    fields: [
      {
        name: "weddingDate",
        label: "Wedding Date",
        type: "date",
        required: true,
      },
      {
        name: "weddingVenue",
        label: "Wedding Venue Name",
        type: "text",
        required: true,
        placeholder: "e.g. The Grand Ballroom",
      },
      {
        name: "venueAddress",
        label: "Venue Address",
        type: "text",
        required: true,
        placeholder: "Full venue address",
      },
      {
        name: "estimatedGuests",
        label: "Estimated Number of Guests",
        type: "text",
        required: false,
        placeholder: "e.g. 150",
      },
    ],
  },
  {
    label: "Scope of Services",
    fields: [
      {
        name: "serviceType",
        label: "Type of Planning Service",
        type: "select",
        required: true,
        options: [
          { value: "full", label: "Full Planning (start to finish)" },
          { value: "partial", label: "Partial Planning" },
          { value: "dayof", label: "Day-of Coordination Only" },
          { value: "custom", label: "Custom / As Described" },
        ],
      },
      {
        name: "scopeDetails",
        label: "Additional Scope Details (optional)",
        type: "textarea",
        required: false,
        placeholder: "Describe any specific services, inclusions, or exclusions...",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "totalFee",
        label: "Total Planning Fee",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "retainerFee",
        label: "Non-refundable Retainer Amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: true,
        options: [
          { value: "one-time payment", label: "One-time Payment" },
          { value: "two installments", label: "Two Installments" },
          { value: "monthly installments", label: "Monthly Installments" },
          { value: "milestone-based", label: "Milestone-based" },
        ],
      },
      {
        name: "lateInterestRate",
        label: "Late Payment Interest Rate (%)",
        type: "text",
        required: true,
        placeholder: "10",
      },
      {
        name: "cancelDays",
        label: "Cancellation Threshold (days before wedding)",
        type: "text",
        required: true,
        placeholder: "30",
      },
      {
        name: "cureDays",
        label: "Default Cure Period (days)",
        type: "text",
        required: true,
        placeholder: "10",
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
          { value: "good-faith negotiation first, then mediation", label: "Good Faith Negotiation First" },
          { value: "mediation", label: "Mediation" },
          { value: "binding arbitration", label: "Binding Arbitration" },
          { value: "court litigation", label: "Court Litigation" },
        ],
      },
      {
        name: "governingState",
        label: "Governing Law State / Province",
        type: "text",
        required: true,
        placeholder: "State or province name",
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
        label: "Client Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party1SignDate",
        label: "Client Signature Date",
        type: "date",
        required: true,
      },
      {
        name: "party2Signature",
        label: "Wedding Planner Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2SignDate",
        label: "Wedding Planner Signature Date",
        type: "date",
        required: true,
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

// ─────────────────────────────────────────────────────────────────────────────
// PDF Generation
// ─────────────────────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const margin = 16;
  const bulletIndent = 23;
  const pageWidth  = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const bulletWidth  = pageWidth - bulletIndent - margin;
  let y = 20;

  // ── Core helpers ────────────────────────────────────────────────────────────

  const checkPage = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  /** Bold numbered section heading */
  const addHeading = (text: string) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 4;
  };

  /** Bold inline sub-heading (e.g. 5.1 Retainer) */
  const addSubHeading = (text: string) => {
    checkPage(9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 2;
  };

  /** Normal body paragraph */
  const addBody = (text: string, gap = 5) => {
    checkPage(9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, contentWidth);
    checkPage(lines.length * 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + gap;
  };

  /** Bullet list item */
  const addBullet = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, bulletWidth);
    checkPage(lines.length * 5);
    doc.text("\u2022", margin + 3, y);
    doc.text(lines, bulletIndent, y);
    y += lines.length * 5 + 3;
  };

  const gap = (px = 4) => { y += px; };

  // ── Document Title ──────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "WEDDING PLANNER AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += 10;

  // ── Preamble ────────────────────────────────────────────────────────────────

  addBody(
    `This Wedding Planner Agreement ("Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "__________"} ("Effective Date"), by and between:`
  );
  gap();

  // Client block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Client:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party1Name    || "__________________________"}`, margin, y); y += 5;
  doc.text(`Address: ${[values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "__________________________"}`, margin, y); y += 5;
  if (values.party1Email || values.party1Phone) {
    const lines = doc.splitTextToSize(
      `Contact: ${[values.party1Email, values.party1Phone].filter(Boolean).join(" | ")}`,
      contentWidth
    );
    doc.text(lines, margin, y);
    y += lines.length * 5;
  }
  y += 4;

  addBody("and");
  gap();

  // Planner block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Wedding Planner / Service Provider:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party2Name    || "__________________________"}`, margin, y); y += 5;
  doc.text(`Address: ${[values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ") || "__________________________"}`, margin, y); y += 5;
  if (values.party2Email || values.party2Phone) {
    const lines = doc.splitTextToSize(
      `Contact: ${[values.party2Email, values.party2Phone].filter(Boolean).join(" | ")}`,
      contentWidth
    );
    doc.text(lines, margin, y);
    y += lines.length * 5;
  }
  y += 4;

  addBody('(collectively referred to as the "Parties").');
  addBody(`Jurisdiction: ${values.state || "___________"}, ${values.country?.toUpperCase() || "___________"}.`);
  gap(6);

  // ── Section 1 ───────────────────────────────────────────────────────────────

  addHeading("1. PURPOSE OF AGREEMENT");
  addBody(
    "The Client desires to retain the Wedding Planner to provide professional wedding planning and coordination " +
    "services for the Client's wedding event. The Wedding Planner agrees to provide such services under the " +
    "terms and conditions set forth herein."
  );
  gap(5);

  // ── Section 2 ───────────────────────────────────────────────────────────────

  addHeading("2. EVENT DETAILS");
  addBullet(`Wedding Date:      ${values.weddingDate      || "__________________________"}`);
  addBullet(`Venue Name:        ${values.weddingVenue     || "__________________________"}`);
  addBullet(`Venue Address:     ${values.venueAddress     || "__________________________"}`);
  addBullet(`Estimated Guests:  ${values.estimatedGuests  || "__________________________"}`);
  gap(5);

  // ── Section 3 ───────────────────────────────────────────────────────────────

  addHeading("3. SCOPE OF SERVICES");

  const serviceLabel: Record<string, string> = {
    full:    "Full Planning (start to finish)",
    partial: "Partial Planning",
    dayof:   "Day-of Coordination Only",
    custom:  "Custom / As Described Below",
  };

  addSubHeading("3.1 Type of Service");
  addBody(
    `The Wedding Planner shall provide ${serviceLabel[values.serviceType] || values.serviceType || "professional wedding planning"} services.`
  );

  addSubHeading("3.2 Services Include, But Are Not Limited To:");
  addBullet("Initial consultation and wedding planning kickoff");
  addBullet("Vendor research, recommendations, and coordination");
  addBullet("Budget planning and expense tracking");
  addBullet("Timeline creation and management");
  addBullet("Venue selection assistance and liaison");
  addBullet("Rehearsal coordination and direction");
  addBullet("Day-of coordination and on-site management");
  addBullet("Post-event vendor follow-up and payment coordination");

  addSubHeading("3.3 Exclusions");
  addBody(
    "Unless expressly agreed in writing, the Wedding Planner shall not be responsible for:"
  );
  addBullet("Direct payment of vendor invoices on behalf of the Client");
  addBullet("Providing event insurance or alcohol permits");
  addBullet("Managing guest transportation or accommodation bookings");
  addBullet("Any service not listed in this Agreement");

  if (values.scopeDetails) {
    addSubHeading("3.4 Additional Scope Details");
    addBody(values.scopeDetails);
  }
  gap(5);

  // ── Section 4 ───────────────────────────────────────────────────────────────

  addHeading("4. TERM OF AGREEMENT");
  addBody(
    `This Agreement shall commence on the Effective Date of ${values.effectiveDate || "__________"} and shall ` +
    `remain in effect until the completion of all Services following the wedding on ` +
    `${values.weddingDate || "__________"}, unless earlier terminated in accordance with this Agreement.`
  );
  gap(5);

  // ── Section 5 ───────────────────────────────────────────────────────────────

  addHeading("5. PAYMENT TERMS");

  addSubHeading("5.1 Total Fee");
  addBody(
    `The Client agrees to pay the Wedding Planner a total fee of ${values.totalFee || "$__________"} for the Services.`
  );

  addSubHeading("5.2 Retainer");
  addBody(
    `A non-refundable retainer of ${values.retainerFee || "$__________"} is due upon execution of this Agreement ` +
    `to secure the Wedding Planner's availability. This retainer shall be applied toward the total fee.`
  );

  addSubHeading("5.3 Payment Schedule");
  addBody(
    `The remaining balance shall be paid via ${values.paymentSchedule || "installments"} as agreed by the Parties ` +
    `in writing. Full payment is due no later than seven (7) days before the wedding date.`
  );

  addSubHeading("5.4 Late Payments");
  addBody(
    `Any unpaid balance shall accrue interest at ${values.lateInterestRate || "____"}% per annum, or the ` +
    `maximum rate permitted by applicable law, whichever is less.`
  );

  addSubHeading("5.5 Additional Services");
  addBody(
    "Any services requested beyond the agreed scope must be authorized in writing and will be billed separately at rates to be mutually agreed upon."
  );

  addSubHeading("5.6 Collection Costs");
  addBody(
    "The Client shall be responsible for all reasonable costs of collection, including attorney's fees, " +
    "court costs, and administrative expenses incurred by the Wedding Planner."
  );
  gap(5);

  // ── Section 6 ───────────────────────────────────────────────────────────────

  addHeading("6. CANCELLATION POLICY");
  addBody("6.1 All retainer fees are non-refundable under any circumstances.");
  addBody(
    `6.2 If the Client cancels this Agreement more than ${values.cancelDays || "____"} days prior to the wedding ` +
    `date, all payments made beyond the retainer shall be refunded.`
  );
  addBody(
    `6.3 If the Client cancels within ${values.cancelDays || "____"} days of the wedding date, the Client shall ` +
    `be responsible for the full contracted fee.`
  );
  addBody(
    "6.4 If the Wedding Planner cancels this Agreement for any reason not caused by the Client, all payments " +
    "received shall be fully refunded, and the Wedding Planner shall use reasonable efforts to assist the Client " +
    "in securing a replacement planner."
  );
  gap(5);

  // ── Section 7 ───────────────────────────────────────────────────────────────

  addHeading("7. CLIENT RESPONSIBILITIES");
  addBody("The Client agrees to:");
  addBullet("Provide accurate and timely information required for planning");
  addBullet("Make all decisions in a timely manner to avoid delays");
  addBullet("Notify the Wedding Planner promptly of any changes to event details");
  addBullet("Ensure all vendor contracts are reviewed and executed by the Client");
  addBullet("Pay all vendor invoices directly unless otherwise agreed in writing");
  gap(5);

  // ── Section 8 ───────────────────────────────────────────────────────────────

  addHeading("8. INDEPENDENT CONTRACTOR");
  addBody(
    "8.1 The Wedding Planner is an independent contractor and not an employee, agent, or partner of the Client."
  );
  addBody(
    "8.2 The Client shall not be responsible for payroll taxes, insurance, or employee benefits relating to the " +
    "Wedding Planner or their staff."
  );
  addBody(
    "8.3 The Wedding Planner retains the right to provide services to other clients during the term of this Agreement, " +
    "provided such services do not conflict with the obligations set forth herein."
  );
  gap(5);

  // ── Section 9 ───────────────────────────────────────────────────────────────

  addHeading("9. LIMITATION OF LIABILITY");
  addBody(
    "To the fullest extent permitted by law, the Wedding Planner's total liability for any claims arising under " +
    "this Agreement shall not exceed the total fees paid by the Client. Neither Party shall be liable for any " +
    "indirect, incidental, consequential, or special damages, including loss of enjoyment or business opportunity."
  );
  gap(5);

  // ── Section 10 ──────────────────────────────────────────────────────────────

  addHeading("10. INDEMNIFICATION");
  addBody(
    "Each Party agrees to indemnify and hold harmless the other from any claims, damages, liabilities, losses, " +
    "or expenses (including reasonable attorney's fees) arising out of:"
  );
  addBullet("Their own negligence or willful misconduct");
  addBullet("Breach of any obligation under this Agreement");
  addBullet("Any act or omission of their respective employees, agents, or subcontractors");
  gap(5);

  // ── Section 11 ──────────────────────────────────────────────────────────────

  addHeading("11. FORCE MAJEURE");
  addBody(
    "Neither Party shall be held liable for failure or delay in performance caused by events beyond their " +
    "reasonable control, including but not limited to:"
  );
  addBullet("Natural disasters, acts of God, or severe weather");
  addBullet("Pandemics, public health emergencies, or government-mandated restrictions");
  addBullet("War, civil unrest, terrorism, or labor strikes");
  addBullet("Venue closure, fire, or utility failures");
  addBody(
    "In the event of a force majeure, the affected Party shall promptly notify the other and both Parties shall " +
    "cooperate in good faith to reschedule or otherwise mitigate the impact."
  );
  gap(5);

  // ── Section 12 ──────────────────────────────────────────────────────────────

  if (values.confidentiality === "yes") {
    addHeading("12. CONFIDENTIALITY");
    addBody(
      "12.1 The Wedding Planner agrees to keep all personal, financial, and event-related information of the Client " +
      "strictly confidential and shall not disclose such information to any third party without prior written consent."
    );
    addBody(
      "12.2 This confidentiality obligation extends to all staff, subcontractors, and agents of the Wedding Planner."
    );
    addBody(
      "12.3 The Wedding Planner may use anonymized event details or photographs (with Client consent) for portfolio " +
      "or marketing purposes only."
    );
    gap(5);
  }

  // ── Section 13 ──────────────────────────────────────────────────────────────

  addHeading(`${values.confidentiality === "yes" ? "13" : "12"}. DEFAULT`);
  addBody("A material default shall include, but not be limited to:");
  addBullet("Failure to make any payment when due");
  addBullet("Insolvency or bankruptcy of either Party");
  addBullet("Failure to perform material obligations under this Agreement");
  addBullet("Misrepresentation of material facts by either Party");
  gap(5);

  // ── Section 14 ──────────────────────────────────────────────────────────────

  const sectionOffset = values.confidentiality === "yes" ? 0 : -1;

  addHeading(`${14 + sectionOffset}. REMEDIES`);
  addBody(
    `Upon default, the non-defaulting Party shall provide written notice specifying the breach. The defaulting ` +
    `Party shall have ${values.cureDays || "____"} days to cure the default. Failure to cure within that period ` +
    `shall entitle the non-defaulting Party to immediate termination of this Agreement and pursuit of all ` +
    `available legal remedies.`
  );
  gap(5);

  // ── Section 15 ──────────────────────────────────────────────────────────────

  addHeading(`${15 + sectionOffset}. DISPUTE RESOLUTION`);
  addBody(
    `The Parties agree to resolve any dispute arising out of or relating to this Agreement through ` +
    `${values.disputeResolution || "good-faith negotiation first, then mediation"} before pursuing ` +
    `formal legal proceedings.`
  );
  gap(5);

  // ── Section 16 ──────────────────────────────────────────────────────────────

  addHeading(`${16 + sectionOffset}. GOVERNING LAW`);
  addBody(
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ` +
    `${values.governingState || values.state || "__________"}, without regard to its conflict of law principles.`
  );
  gap(5);

  // ── Section 17 ──────────────────────────────────────────────────────────────

  addHeading(`${17 + sectionOffset}. ENTIRE AGREEMENT`);
  addBody(
    "This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and " +
    "supersedes all prior discussions, representations, or agreements, whether written or oral."
  );
  gap(5);

  // ── Section 18 ──────────────────────────────────────────────────────────────

  addHeading(`${18 + sectionOffset}. AMENDMENTS`);
  addBody(
    "Any modification or amendment to this Agreement must be made in writing and signed by both Parties to be effective."
  );
  gap(5);

  // ── Section 19 ──────────────────────────────────────────────────────────────

  addHeading(`${19 + sectionOffset}. SEVERABILITY`);
  addBody(
    "If any provision of this Agreement is found to be invalid, illegal, or unenforceable, the remaining " +
    "provisions shall continue in full force and effect."
  );
  gap(5);

  // ── Section 20 ──────────────────────────────────────────────────────────────

  addHeading(`${20 + sectionOffset}. WAIVER`);
  addBody(
    "Failure by either Party to enforce any provision of this Agreement shall not be construed as a waiver of " +
    "that provision or of any other right under this Agreement."
  );
  gap(5);

  // ── Section 21 ──────────────────────────────────────────────────────────────

  addHeading(`${21 + sectionOffset}. NOTICE`);
  addBody(
    "All notices required under this Agreement shall be in writing and delivered by personal delivery, certified " +
    "mail, or email (with confirmation of receipt) to the addresses listed in this Agreement or to any updated " +
    "address provided in writing."
  );
  gap(5);

  // ── Section 22 ──────────────────────────────────────────────────────────────

  addHeading(`${22 + sectionOffset}. ATTORNEYS' FEES`);
  addBody(
    "The prevailing Party in any legal action or proceeding arising out of this Agreement shall be entitled to " +
    "recover reasonable attorneys' fees, court costs, and other litigation expenses."
  );
  gap(5);

  // ── Additional Terms (conditional) ─────────────────────────────────────────

  if (values.additionalTerms) {
    addHeading(`${23 + sectionOffset}. ADDITIONAL TERMS`);
    addBody(values.additionalTerms);
    gap(5);
  }

  // ── Signatures ──────────────────────────────────────────────────────────────

  const sigSection = 23 + sectionOffset + (values.additionalTerms ? 1 : 0);

  addHeading(`${sigSection}. SIGNATURES`);
  addBody(
    "IN WITNESS WHEREOF, the Parties have executed this Wedding Planner Agreement as of the Effective Date written above."
  );
  gap(6);

  checkPage(55);

  // Client signature block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("CLIENT", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party1Name      || "__________________________"}`, margin, y); y += 6;
  doc.text(`Signature: ${values.party1Signature || "__________________________"}`, margin, y); y += 6;
  doc.text(`Date:      ${values.party1SignDate   || "__________________________"}`, margin, y);
  y += 13;

  // Planner signature block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("WEDDING PLANNER / SERVICE PROVIDER", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party2Name      || "__________________________"}`, margin, y); y += 6;
  doc.text(`Signature: ${values.party2Signature || "__________________________"}`, margin, y); y += 6;
  doc.text(`Date:      ${values.party2SignDate   || "__________________________"}`, margin, y);
  y += 13;

  // Witness block (optional)
  if (values.witnessName) {
    checkPage(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("WITNESS", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name:      ${values.witnessName}`, margin, y); y += 6;
    doc.text("Signature: __________________________", margin, y);
  }

  doc.save("wedding_planner_agreement.pdf");
};

export default function WeddingPlannerAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Wedding Planner Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="weddingplanneragreement"
    />
  );
}