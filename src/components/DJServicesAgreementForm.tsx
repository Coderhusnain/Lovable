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
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
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
    label: "First Party Address",
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
    label: "First Party Contact",
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
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
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
    label: "Second Party Address",
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
    label: "Second Party Contact",
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
    label: "Event Details",
    fields: [
      {
        name: "eventName",
        label: "Event Name",
        type: "text",
        required: true,
        placeholder: "e.g. Wedding Reception, Corporate Party",
      },
      {
        name: "eventDate",
        label: "Event Date",
        type: "date",
        required: true,
      },
      {
        name: "startTime",
        label: "Start Time",
        type: "text",
        required: true,
        placeholder: "e.g. 6:00 PM",
      },
      {
        name: "endTime",
        label: "End Time",
        type: "text",
        required: true,
        placeholder: "e.g. 11:00 PM",
      },
      {
        name: "venueName",
        label: "Venue Name",
        type: "text",
        required: true,
        placeholder: "Venue name",
      },
      {
        name: "venueAddress",
        label: "Venue Address",
        type: "text",
        required: true,
        placeholder: "Full venue address",
      },
      {
        name: "setupMinutes",
        label: "DJ Arrival (minutes before start for setup)",
        type: "text",
        required: true,
        placeholder: "e.g. 60",
      },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "terminationDate",
        label: "Termination / Completion Date",
        type: "date",
        required: true,
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7 days", label: "7 Days" },
          { value: "14 days", label: "14 Days" },
          { value: "30 days", label: "30 Days" },
          { value: "60 days", label: "60 Days" },
          { value: "90 days", label: "90 Days" },
        ],
      },
      {
        name: "cureDays",
        label: "Default Cure Period (days)",
        type: "text",
        required: true,
        placeholder: "e.g. 10",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Total Service Fee",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "retainerFee",
        label: "Non-refundable Retainer",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "additionalHourRate",
        label: "Additional Hourly Rate",
        type: "text",
        required: true,
        placeholder: "$0.00/hr",
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
        label: "Cancellation Threshold (days)",
        type: "text",
        required: true,
        placeholder: "14",
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
      {
        name: "governingState",
        label: "Governing Law State/Province",
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
        label: "Client Signature (Type full legal name)",
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
        label: "DJ / Provider Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2SignDate",
        label: "DJ / Provider Signature Date",
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
  const bulletIndent = 22;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const bulletWidth = pageWidth - bulletIndent - margin;
  let y = 20;

  // ── Core helpers ────────────────────────────────────────────────────────────

  const checkPage = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const addHeading = (text: string) => {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 3;
  };

  const addSubHeading = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, margin, y);
    y += 6;
  };

  const addBody = (text: string, gap = 5) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, contentWidth);
    checkPage(lines.length * 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + gap;
  };

  const addBullet = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, bulletWidth);
    checkPage(lines.length * 5);
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, bulletIndent, y);
    y += lines.length * 5 + 3;
  };

  const gap = (px = 4) => { y += px; };

  // ── Document Title ──────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize("DJ SERVICES AGREEMENT", contentWidth);
  doc.text(titleLines, pageWidth / 2, y, { align: "center" });
  y += titleLines.length * 8 + 6;

  // ── Preamble / Parties ──────────────────────────────────────────────────────

  addBody(
    `This DJ Services Agreement ("Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "__________"} ("Effective Date"), by and between:`
  );
  gap();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Client:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party1Name || "__________________________"}`, margin, y);
  y += 5;
  doc.text(
    `Address: ${[values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "__________________________"}`,
    margin, y
  );
  y += 5;
  if (values.party1Email || values.party1Phone) {
    doc.text(
      `Contact: ${[values.party1Email, values.party1Phone].filter(Boolean).join(" | ")}`,
      margin, y
    );
    y += 5;
  }
  y += 4;

  addBody("and");
  gap();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("DJ / Service Provider:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party2Name || "__________________________"}`, margin, y);
  y += 5;
  doc.text(
    `Address: ${[values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ") || "__________________________"}`,
    margin, y
  );
  y += 5;
  if (values.party2Email || values.party2Phone) {
    doc.text(
      `Contact: ${[values.party2Email, values.party2Phone].filter(Boolean).join(" | ")}`,
      margin, y
    );
    y += 5;
  }
  y += 4;

  addBody('(collectively referred to as the "Parties").');
  addBody(`Jurisdiction: ${values.state || "___________"}, ${values.country?.toUpperCase() || "___________"}.`);
  gap(5);

  // ── Section 1 ───────────────────────────────────────────────────────────────

  addHeading("1. ENGAGEMENT OF SERVICES");
  addBody(
    'The Client hereby engages the DJ, and the DJ agrees to provide professional disc jockey and related ' +
    'entertainment services ("Services") under the terms and conditions set forth in this Agreement.'
  );
  gap(5);

  // ── Section 2 ───────────────────────────────────────────────────────────────

  addHeading("2. EVENT DETAILS");
  addBody("The Services shall be provided for the following event:");
  addBullet(`Event Name:    ${values.eventName || "__________________________"}`);
  addBullet(`Event Date:    ${values.eventDate || "__________________________"}`);
  addBullet(`Start Time:    ${values.startTime || "__________________________"}`);
  addBullet(`End Time:      ${values.endTime || "__________________________"}`);
  addBullet(`Venue Name:    ${values.venueName || "__________________________"}`);
  addBullet(`Venue Address: ${values.venueAddress || "__________________________"}`);
  gap(5);

  // ── Section 3 ───────────────────────────────────────────────────────────────

  addHeading("3. DESCRIPTION OF SERVICES");
  addBody("3.1 The DJ shall provide musical entertainment using recorded music and professional audio equipment.");
  addBody("3.2 Services shall include, but are not limited to:");
  addBullet("Musical performance and playlist management");
  addBullet("Sound system setup and breakdown");
  addBullet("Microphone provision and use");
  addBullet("Event announcements, if requested");
  addBullet("Basic event lighting, where applicable");
  addBody(
    `3.3 The DJ shall arrive no less than ${values.setupMinutes || "____"} minutes prior to the scheduled ` +
    `start time to allow for setup, testing, and sound check.`
  );
  addBody(
    "3.4 The DJ shall provide professional-grade sound equipment suitable for indoor and/or outdoor use."
  );
  addBody(
    "3.5 Any additional services not expressly listed herein must be agreed upon in writing and may require additional fees."
  );
  if (values.description) {
    addBody(`Additional scope: ${values.description}`);
  }
  gap(5);

  // ── Section 4 ───────────────────────────────────────────────────────────────

  addHeading("4. TERM OF AGREEMENT");
  addBody(
    `This Agreement shall commence on the Effective Date and shall remain in effect until completion of ` +
    `the Services on ${values.terminationDate || "__________"} ("Termination Date"), unless earlier ` +
    `terminated in accordance with this Agreement.`
  );
  gap(5);

  // ── Section 5 ───────────────────────────────────────────────────────────────

  addHeading("5. PAYMENT TERMS");

  addSubHeading("5.1 Total Fee");
  addBody(
    `The Client agrees to pay the DJ a total fee of ${values.paymentAmount || "$__________"} for the Services.`
  );

  addSubHeading("5.2 Retainer");
  addBody(
    `A non-refundable retainer of ${values.retainerFee || "$__________"} is due upon execution of this ` +
    `Agreement. The remaining balance shall be paid in full on or before the date of the event.`
  );

  addSubHeading("5.3 Additional Hours");
  addBody(
    `Any additional time or services requested beyond the agreed scope shall be billed at ` +
    `${values.additionalHourRate || "$________"} per hour, payable immediately.`
  );

  addSubHeading("5.4 Late Payments");
  addBody(
    `Any unpaid balance shall accrue interest at ${values.lateInterestRate || "____"}% per annum or the ` +
    `maximum allowed by law, whichever is less.`
  );

  addSubHeading("5.5 Collection Costs");
  addBody(
    "The Client shall be responsible for all costs of collection, including reasonable attorney's fees and court costs."
  );
  gap(5);

  // ── Section 6 ───────────────────────────────────────────────────────────────

  addHeading("6. CANCELLATION POLICY");
  addBody(
    `6.1 Cancellation by the Client more than ${values.cancelDays || "____"} days prior to the event shall ` +
    `result in a refund of all payments made, less the non-refundable retainer.`
  );
  addBody(
    `6.2 Cancellation within ${values.cancelDays || "____"} days of the event shall require full payment ` +
    `of the contracted amount.`
  );
  addBody(
    "6.3 If the DJ cancels for any reason not caused by the Client, all payments received shall be fully refunded."
  );
  gap(5);

  // ── Section 7 ───────────────────────────────────────────────────────────────

  addHeading("7. PERFORMANCE STANDARDS");
  addBody(
    "7.1 The DJ shall perform all Services in a professional, timely, and workmanlike manner consistent with industry standards."
  );
  addBody(
    "7.2 The DJ shall use reliable equipment and reasonable care to ensure uninterrupted performance."
  );
  addBody(
    "7.3 The DJ shall conduct themselves in a professional and respectful manner at all times."
  );
  gap(5);

  // ── Section 8 ───────────────────────────────────────────────────────────────

  addHeading("8. INDEPENDENT CONTRACTOR");
  addBody(
    "8.1 The DJ is an independent contractor and not an employee, agent, or partner of the Client."
  );
  addBody(
    "8.2 The Client shall not be responsible for payroll taxes, insurance, or benefits relating to the DJ or DJ's personnel."
  );
  gap(5);

  // ── Section 9 ───────────────────────────────────────────────────────────────

  addHeading("9. LIMITATION OF LIABILITY");
  addBody(
    "To the fullest extent permitted by law, neither Party shall be liable for any indirect, incidental, " +
    "consequential, or special damages, including loss of profits or business interruption."
  );
  gap(5);

  // ── Section 10 ──────────────────────────────────────────────────────────────

  addHeading("10. FORCE MAJEURE");
  addBody(
    "10.1 Neither Party shall be liable for failure or delay in performance due to events beyond reasonable control, " +
    "including but not limited to:"
  );
  addBullet("Acts of God, fire, flood, or severe weather");
  addBullet("War, government actions, or public emergencies");
  addBullet("Labor disputes or strikes");
  addBody(
    "10.2 Performance shall resume as soon as reasonably practicable following the cessation of such event."
  );
  gap(5);

  // ── Section 11 ──────────────────────────────────────────────────────────────

  addHeading("11. INDEMNIFICATION");
  addBody(
    "The DJ agrees to indemnify and hold harmless the Client from any claims, damages, losses, liabilities, " +
    "or expenses arising out of:"
  );
  addBullet("The DJ's negligence or misconduct");
  addBullet("Breach of this Agreement");
  addBullet("Injury or damage caused by DJ equipment or personnel");
  gap(5);

  // ── Section 12 ──────────────────────────────────────────────────────────────

  addHeading("12. DEFAULT");
  addBody("The following shall constitute a material default:");
  addBullet("Failure to make payment when due");
  addBullet("Insolvency or bankruptcy of either Party");
  addBullet("Seizure or levy against property");
  addBullet("Failure to perform the Services as agreed");
  gap(5);

  // ── Section 13 ──────────────────────────────────────────────────────────────

  addHeading("13. REMEDIES");
  addBody(
    `Upon default, the non-defaulting Party may provide written notice of breach. The defaulting Party ` +
    `shall have ${values.cureDays || "____"} days to cure the breach. Failure to cure shall result in ` +
    `immediate termination and pursuit of all legal remedies.`
  );
  gap(5);

  // ── Section 14 ──────────────────────────────────────────────────────────────

  addHeading("14. NOTICE");
  addBody(
    "All notices under this Agreement shall be in writing and delivered personally or by certified mail to " +
    "the addresses listed above or to any updated address provided in writing."
  );
  gap(5);

  // ── Section 15 ──────────────────────────────────────────────────────────────

  addHeading("15. WAIVER");
  addBody(
    "Failure to enforce any provision of this Agreement shall not constitute a waiver of that provision or of any other provision."
  );
  gap(5);

  // ── Section 16 ──────────────────────────────────────────────────────────────

  addHeading("16. ENTIRE AGREEMENT");
  addBody(
    "This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements."
  );
  gap(5);

  // ── Section 17 ──────────────────────────────────────────────────────────────

  addHeading("17. SEVERABILITY");
  addBody(
    "If any provision of this Agreement is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect."
  );
  gap(5);

  // ── Section 18 ──────────────────────────────────────────────────────────────

  addHeading("18. AMENDMENTS");
  addBody("This Agreement may be amended only by a written document signed by both Parties.");
  gap(5);

  // ── Section 19 ──────────────────────────────────────────────────────────────

  addHeading("19. GOVERNING LAW");
  addBody(
    `This Agreement shall be governed and construed in accordance with the laws of the State of ` +
    `${values.governingState || values.state || "__________"}.`
  );
  gap(5);

  // ── Section 20 ──────────────────────────────────────────────────────────────

  addHeading("20. DISPUTE RESOLUTION");
  addBody(
    `The Parties agree to ${
      values.disputeResolution === "negotiation"
        ? "attempt good-faith negotiation prior to pursuing mediation, arbitration, or litigation"
        : values.disputeResolution === "mediation"
        ? "resolve any dispute through mediation before pursuing arbitration or litigation"
        : values.disputeResolution === "arbitration"
        ? "resolve any dispute through binding arbitration"
        : "resolve disputes through court litigation"
    }.`
  );
  gap(5);

  // ── Section 21 ──────────────────────────────────────────────────────────────

  addHeading("21. ATTORNEYS' FEES");
  addBody(
    "The prevailing Party in any legal proceeding arising out of this Agreement shall be entitled to recover " +
    "reasonable attorneys' fees and costs."
  );
  gap(5);

  // ── Section 22 — Confidentiality (conditional) ──────────────────────────────

  if (values.confidentiality === "yes") {
    addHeading("22. CONFIDENTIALITY");
    addBody(
      "Each Party agrees to keep all non-public information relating to the other Party and this Agreement " +
      "strictly confidential and shall not disclose such information to any third party without prior written consent."
    );
    gap(5);
  }

  // ── Additional Terms ────────────────────────────────────────────────────────

  if (values.additionalTerms) {
    addHeading(`${values.confidentiality === "yes" ? "23" : "22"}. ADDITIONAL TERMS`);
    addBody(values.additionalTerms);
    gap(5);
  }

  // ── Signatures ──────────────────────────────────────────────────────────────

  const sigNum =
    values.confidentiality === "yes"
      ? values.additionalTerms ? "24" : "23"
      : values.additionalTerms ? "23" : "22";

  addHeading(`${sigNum}. SIGNATURES`);
  addBody(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above."
  );
  gap(5);

  checkPage(50);

  // Client block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("CLIENT", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party1Name || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Signature: ${values.party1Signature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.party1SignDate || new Date().toLocaleDateString()}`, margin, y);
  y += 12;

  // DJ block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("DJ / SERVICE PROVIDER", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party2Name || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Signature: ${values.party2Signature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.party2SignDate || new Date().toLocaleDateString()}`, margin, y);
  y += 12;

  // Witness (optional)
  if (values.witnessName) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("WITNESS", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name:      ${values.witnessName}`, margin, y);
    y += 6;
    doc.text("Signature: __________________________", margin, y);
  }

  doc.save("dj_services_agreement.pdf");
};

export default function DJServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="DJ Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="djservicesagreement"
    />
  );
}