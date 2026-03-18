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
    label: "Client Details",
    fields: [
      {
        name: "party1Name",
        label: "Client's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Client an individual or a business?",
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
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party1Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Client Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Architect Details",
    fields: [
      {
        name: "party2Name",
        label: "Architect's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Architect an individual or a business?",
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
    label: "Architect Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Architect Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Project Details",
    fields: [
      {
        name: "serviceStartDate",
        label: "Services commencement date",
        type: "date",
        required: true,
      },
      {
        name: "terminationDate",
        label: "Agreement termination date",
        type: "date",
        required: true,
      },
      {
        name: "description",
        label: "Description of architectural services and project scope",
        type: "textarea",
        required: true,
        placeholder: "Describe the project and all architectural services to be provided...",
      },
      {
        name: "workProductOwner",
        label: "Who owns the work product / intellectual property?",
        type: "select",
        required: true,
        options: [
          { value: "Client", label: "Client" },
          { value: "Architect", label: "Architect" },
          { value: "Jointly", label: "Jointly (as agreed in writing)" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Total compensation amount for services",
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
          { value: "Upon completion of Services", label: "Upon Completion" },
          { value: "Weekly",           label: "Weekly" },
          { value: "Bi-weekly",        label: "Bi-weekly" },
          { value: "Monthly",          label: "Monthly" },
          { value: "Milestone-based",  label: "Milestone-based" },
        ],
      },
      {
        name: "discountAmount",
        label: "Early payment discount % (if applicable)",
        type: "text",
        required: false,
        placeholder: "e.g. 5",
      },
      {
        name: "interestRate",
        label: "Interest rate on overdue amounts (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g. 18",
      },
    ],
  },
  {
    label: "Default & Remedies",
    fields: [
      {
        name: "curePeriodDays",
        label: "Days allowed to cure a default after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
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
        placeholder: "Enter any additional terms or special provisions...",
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
        name: "party2Signature",
        label: "Architect Signature (type full legal name)",
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

// ─── PDF layout constants ────────────────────────────────────────────────────
const PAGE_H   = 297;
const MARGIN_B = 18;
const LEFT     = 18;
const WIDTH    = 174;
const LH       = 5.5;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;

  const p1Addr = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`.trim().replace(/^,\s*|,\s*$/g, "");
  const p2Addr = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim().replace(/^,\s*|,\s*$/g, "");

  // ── overflow guard: inserts a new page when needed ──
  const ensure = (need = LH) => {
    if (y + need > PAGE_H - MARGIN_B) {
      doc.addPage();
      y = 18;
    }
  };

  // ── bold section heading ──
  const heading = (text: string) => {
    ensure(11);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, LEFT, y);
    y += LH + 2;
  };

  // ── bold sub-heading (for phases a–e) ──
  const subHeading = (text: string) => {
    ensure(9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, LEFT + 4, y);
    y += LH + 1;
  };

  // ── normal body paragraph ──
  const para = (text: string, afterGap = 3) => {
    const lines = doc.splitTextToSize(text, WIDTH);
    ensure(lines.length * LH + afterGap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(lines, LEFT, y);
    y += lines.length * LH + afterGap;
  };

  // ── bold body paragraph ──
  const boldPara = (text: string, afterGap = 3) => {
    const lines = doc.splitTextToSize(text, WIDTH);
    ensure(lines.length * LH + afterGap);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(lines, LEFT, y);
    y += lines.length * LH + afterGap;
    doc.setFont("helvetica", "normal");
  };

  // ── centered normal paragraph ──
  const paraCentered = (text: string, afterGap = 3) => {
    ensure(LH + afterGap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(text, 105, y, { align: "center" });
    y += LH + afterGap;
  };

  // ── centered bold paragraph ──
  const boldParaCentered = (text: string, afterGap = 3) => {
    ensure(LH + afterGap);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, 105, y, { align: "center" });
    y += LH + afterGap;
    doc.setFont("helvetica", "normal");
  };

  // ── bullet item (•) ──
  const bullet = (text: string, extraIndent = 0) => {
    const indent = 7 + extraIndent;
    const lines  = doc.splitTextToSize(text, WIDTH - indent);
    ensure(lines.length * LH + 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("\u2022", LEFT + 2 + extraIndent, y);
    doc.text(lines[0], LEFT + indent, y);
    y += LH;
    for (let i = 1; i < lines.length; i++) {
      ensure(LH);
      doc.text(lines[i], LEFT + indent, y);
      y += LH;
    }
    y += 1.5;
  };

  // ── alpha sub-item: a. text ──
  const alphaItem = (label: string, text: string) => {
    const indent = 10;
    const lines  = doc.splitTextToSize(text, WIDTH - indent);
    ensure(lines.length * LH + 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${label}.`, LEFT + 2, y);
    doc.text(lines[0], LEFT + indent, y);
    y += LH;
    for (let i = 1; i < lines.length; i++) {
      ensure(LH);
      doc.text(lines[i], LEFT + indent, y);
      y += LH;
    }
    y += 1.5;
  };

  // ── signature row with underline ──
  const sigRow = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const show = value || "_".repeat(28);
    doc.text(`${label} ${show}`, LEFT, y);
    const lineX = LEFT + doc.getTextWidth(`${label} `);
    doc.line(lineX, y + 1, lineX + doc.getTextWidth(show), y + 1);
    y += 7;
  };

  const gap = (n = 4) => { y += n; };

  // ════════════════════════════════════════════════════════════
  // TITLE
  // ════════════════════════════════════════════════════════════
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("ARCHITECTURAL SERVICES AGREEMENT", 105, y, { align: "center" });
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para(
    `Effective Date: ${values.effectiveDate || "___________"}     ` +
    `Jurisdiction: ${values.state || "___"}, ${(values.country || "").toUpperCase()}`
  );
  gap(3);

  // ── Opening preamble ──
  para(
    `This Architectural Services Agreement (the "Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "[Date]"}, by and between:`
  );
  gap(2);

  // Bold centered: Party A Name and address (matching the draft)
  boldParaCentered(`${values.party1Name || "[Party A Name]"}, residing at ${p1Addr},`);
  gap(1);

  // Bold centered "AND" (matching the draft)
  boldParaCentered("AND");
  gap(1);

  // Bold centered: Party B Name and address (matching the draft)
  boldParaCentered(`${values.party2Name || "[Party B Name]"}, residing at ${p2Addr}.`);
  gap(2);

  // Centered collectively line (matching the draft)
  paraCentered(`(Collectively referred to as the "Parties" and individually as a "Party.")`);
  gap(5);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Description of Services
  // ════════════════════════════════════════════════════════════
  heading("1. Description of Services");
  para(
    `Commencing on ${values.serviceStartDate || "[Date]"}, ${values.party2Name || "[Architect Name]"} ` +
    `(the "Architect") shall provide to ${values.party1Name || "[Client Name]"} (the "Client") the ` +
    `architectural services described below and incorporated by reference (collectively, the "Services").`
  );
  para(
    `The Services shall include all architectural, site planning, and engineering services related to the ` +
    `shell and core design of the project (the "Project"), including but not limited to the phases described ` +
    `in Section 2 below.`
  );
  if ((values.description || "").trim()) {
    para(values.description, 2);
  }
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Phases of Services
  // ════════════════════════════════════════════════════════════
  heading("2. Phases of Services");

  subHeading("a. Schematic Design Phase");
  para("The Architect shall:");
  bullet("Review all documentation furnished by the Client;", 4);
  bullet("Determine and confirm the requirements of the Project.", 4);
  gap(2);

  subHeading("b. Design Development Phase");
  para("The Architect shall:");
  bullet(
    `Prepare construction documents including drawings, specifications, and preliminary plans defining ` +
    `the architectural, structural, mechanical, and electrical elements of the Project, based on approved ` +
    `schematic designs;`, 4
  );
  bullet("Advise the Client on preliminary construction cost estimates.", 4);
  gap(2);

  subHeading("c. Construction Documents Phase");
  para("The Architect shall:");
  bullet("Prepare detailed construction drawings and documents based on approved design development materials;", 4);
  bullet("Advise the Client on anticipated construction costs;", 4);
  bullet("Assist in obtaining all necessary governmental and regulatory approvals.", 4);
  gap(2);

  subHeading("d. Bidding or Negotiation Phase");
  para(
    `Upon Client approval of construction documents, the Architect shall assist with obtaining bids or ` +
    `negotiated proposals and facilitate the preparation and award of construction contracts.`
  );
  gap(2);

  subHeading("e. Construction Phase — Administration");
  para("The Architect shall:");
  bullet(
    `Administer the general conditions of the construction contract, from award through issuance of the ` +
    `final certificate of payment;`, 4
  );
  bullet("Have authority to inspect the work and reject non-compliant work;", 4);
  bullet(
    `Not assume control over construction means, methods, techniques, scheduling, safety measures, or ` +
    `contractor operations.`, 4
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Additional Services
  // ════════════════════════════════════════════════════════════
  heading("3. Additional Services");
  para(
    `Upon written request by the Client, the Architect may provide additional services, including but ` +
    `not limited to:`
  );
  bullet("Extended design and planning beyond the basic scope;");
  bullet("Selection of project representatives or consultants;");
  bullet("Evaluation of contractor substitution requests;");
  bullet("Preparation of revisions due to Client-directed changes.");
  para(
    `The Client agrees to compensate the Architect for such additional services as provided under Section 12.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Payment
  // ════════════════════════════════════════════════════════════
  heading("4. Payment");
  bullet(
    `The Client shall pay ${values.party2Name || "[Architect Name]"} the total amount of ` +
    `${values.paymentAmount || "[insert amount]"} ` +
    `${values.paymentSchedule || "upon completion of Services"}.`
  );
  if (values.discountAmount) {
    bullet(
      `Discount Terms: A ${values.discountAmount}% discount shall apply if full payment is made within ` +
      `the agreed discount period.`
    );
  }
  if (values.interestRate) {
    bullet(
      `Late Payment: Interest shall accrue on overdue amounts at ${values.interestRate}% per annum or ` +
      `the maximum rate permitted by law, whichever is lower.`
    );
  }
  bullet(
    `Collection Costs: The Client shall bear all costs of collection, including reasonable attorneys' fees.`
  );
  bullet(
    `Non-Payment: Failure to pay shall constitute a material breach and entitle the Architect to terminate ` +
    `this Agreement and pursue legal remedies.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Warranty
  // ════════════════════════════════════════════════════════════
  heading("5. Warranty");
  para("The Architect warrants that the Services shall be performed:");
  bullet("In a professional and timely manner;");
  bullet("In accordance with standards customary within the industry and local jurisdiction;");
  bullet(
    `With a standard of care equal to or greater than that exercised by similarly situated professionals ` +
    `on comparable projects.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Default
  // ════════════════════════════════════════════════════════════
  heading("6. Default");
  para("The following shall constitute a material default under this Agreement:");
  alphaItem("a", "Failure to make a required payment when due;");
  alphaItem("b", "Insolvency, bankruptcy, or appointment of a receiver for either Party;");
  alphaItem("c", "Seizure, levy, or general assignment for the benefit of creditors;");
  alphaItem("d", "Failure to perform or deliver services in the time and manner specified herein.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Remedies
  // ════════════════════════════════════════════════════════════
  heading("7. Remedies");
  para(
    `In the event of a default, the non-defaulting Party may serve written notice detailing the nature ` +
    `of the default. The defaulting Party shall have ${values.curePeriodDays || "[insert days]"} days ` +
    `from the effective date of such notice to cure the default.`
  );
  para(
    `Failure to cure within the stipulated period shall result in automatic termination of this Agreement ` +
    `unless otherwise waived in writing by the non-defaulting Party.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Force Majeure
  // ════════════════════════════════════════════════════════════
  heading("8. Force Majeure");
  para(
    `If performance under this Agreement is delayed or prevented due to circumstances beyond a Party's ` +
    `reasonable control, including but not limited to acts of God, natural disasters, pandemics, labor ` +
    `strikes, riots, war, vandalism, or governmental restrictions, then the affected Party shall be ` +
    `excused from performance for the duration of the event.`
  );
  para(
    `The affected Party must promptly notify the other in writing and use reasonable efforts to resume performance.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Confidentiality
  // ════════════════════════════════════════════════════════════
  heading("9. Confidentiality");
  bullet(
    `Both Parties agree to maintain the confidentiality of all proprietary or sensitive information ` +
    `disclosed in connection with this Agreement.`
  );
  bullet(
    `Upon termination, each Party shall return or destroy all confidential materials received from the other Party.`
  );
  bullet("These obligations shall survive termination of this Agreement.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Indemnification
  // ════════════════════════════════════════════════════════════
  heading("10. Indemnification");
  para(
    `Each Party shall indemnify, defend, and hold harmless the other Party, its officers, employees, and ` +
    `agents, from any and all claims, liabilities, losses, damages, or expenses (including attorneys' fees) ` +
    `arising from or related to the negligent acts or omissions of the indemnifying Party or its representatives.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – No Mechanic's Lien
  // ════════════════════════════════════════════════════════════
  heading("11. No Mechanic's Lien");
  para(
    `The Architect agrees that no mechanic's lien or claim shall be filed by any of its employees, ` +
    `subcontractors, or consultants. Upon final payment, the Architect shall certify that all claims for ` +
    `labor, materials, and services have been satisfied.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Compensation for Additional Services
  // ════════════════════════════════════════════════════════════
  heading("12. Compensation for Additional Services");
  para(
    `The Client shall compensate the Architect for all authorized additional services beyond the scope of ` +
    `this Agreement, in accordance with the rates and terms mutually agreed upon in writing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Client Responsibilities
  // ════════════════════════════════════════════════════════════
  heading("13. Client Responsibilities");
  para("The Client shall:");
  bullet("Provide complete and timely information regarding the Project requirements;");
  bullet("Furnish all legal and regulatory documentation necessary for design and construction approvals.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Term
  // ════════════════════════════════════════════════════════════
  heading("14. Term");
  para(
    `This Agreement shall automatically terminate on ${values.terminationDate || "[Termination Date]"}, ` +
    `unless otherwise extended or terminated earlier as provided herein.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 15 – Work Product Ownership
  // ════════════════════════════════════════════════════════════
  heading("15. Work Product Ownership");
  para(
    `All intellectual property and work product prepared by the Architect under this Agreement shall ` +
    `remain the ${values.workProductOwner || "[Client's or Architect's]"} exclusive property, as agreed.`
  );
  para(
    `The Party assigning such rights shall execute all documents necessary to confirm such ownership.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 16 – Arbitration
  // ════════════════════════════════════════════════════════════
  heading("16. Arbitration");
  para(
    `Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration ` +
    `under the Commercial Arbitration Rules of the American Arbitration Association.`
  );
  bullet("Each Party shall appoint one arbitrator; the two arbitrators shall appoint a third.");
  bullet("Arbitration shall be conducted at a mutually agreed location.");
  bullet(
    `The arbitrators shall have the power to issue binding decisions but shall not alter the terms of ` +
    `this Agreement or award punitive damages.`
  );
  bullet("The arbitration award shall be final and enforceable in any court of competent jurisdiction.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 17 – Severability
  // ════════════════════════════════════════════════════════════
  heading("17. Severability");
  para(
    `If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be ` +
    `limited or modified to the extent necessary to render it enforceable. The remainder of this Agreement ` +
    `shall remain in full force and effect.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 18 – Amendment
  // ════════════════════════════════════════════════════════════
  heading("18. Amendment");
  para(
    `This Agreement may be amended only by a written instrument executed by the Party against whom ` +
    `enforcement is sought.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 19 – Governing Law
  // ════════════════════════════════════════════════════════════
  heading("19. Governing Law");
  para(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ` +
    `${values.state || "[Insert State]"}, without regard to conflict of laws principles.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 20 – Notice
  // ════════════════════════════════════════════════════════════
  heading("20. Notice");
  para(
    `All notices required or permitted under this Agreement shall be in writing and delivered personally ` +
    `or by certified mail, return receipt requested, to the addresses specified above or as otherwise ` +
    `designated in writing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 21 – Waiver
  // ════════════════════════════════════════════════════════════
  heading("21. Waiver");
  para(
    `The failure of either Party to enforce any provision of this Agreement shall not be construed as a ` +
    `waiver of such provision or any other provision, nor shall it affect the right of the Party to ` +
    `thereafter enforce such provision.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 22 – Entire Agreement
  // ════════════════════════════════════════════════════════════
  heading("22. Entire Agreement");
  para(
    `This Agreement constitutes the entire understanding between the Parties with respect to its subject ` +
    `matter and supersedes all prior oral or written communications, representations, or agreements.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 23 – Execution
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("23. Execution");
  para(
    `IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.`
  );
  gap(8);

  // ── Side-by-side signature blocks (CLIENT left, ARCHITECT right) ──
  const SIG_LEFT  = LEFT;          // 18 mm — left column
  const SIG_RIGHT = 105 + 5;       // 110 mm — right column
  const SIG_W     = 70;            // width available per column
  const LINE_LEN  = 65;            // underline length in mm

  const sigBlock = (xStart: number, roleLabel: string, sigValue?: string, nameValue?: string) => {
    // Role label (bold)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(roleLabel, xStart, y);

    // Row: By:
    const byY = y + 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("By:", xStart, byY);
    doc.line(xStart + 8, byY + 1, xStart + 8 + LINE_LEN, byY + 1);
    if (sigValue) doc.text(sigValue, xStart + 9, byY);

    // Row: Name:
    const nameY = byY + 8;
    doc.text("Name:", xStart, nameY);
    doc.line(xStart + 13, nameY + 1, xStart + 13 + LINE_LEN - 5, nameY + 1);
    if (nameValue) doc.text(nameValue, xStart + 14, nameY);

    // Row: Date:
    const dateY = nameY + 8;
    doc.text("Date:", xStart, dateY);
    doc.line(xStart + 12, dateY + 1, xStart + 12 + LINE_LEN - 4, dateY + 1);
    doc.text(new Date().toLocaleDateString(), xStart + 13, dateY);
  };

  ensure(45);
  sigBlock(SIG_LEFT,  "CLIENT",    values.party1Signature, values.party1Name);
  sigBlock(SIG_RIGHT, "ARCHITECT", values.party2Signature, values.party2Name);
  y += 38; // advance past the signature blocks

  // ── Optional Witness ──
  if ((values.witnessName || "").trim()) {
    gap(8);
    ensure(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const wLine = values.witnessName;
    doc.text(`Witness: ${wLine}`, LEFT, y);
    const wX = LEFT + doc.getTextWidth("Witness: ");
    doc.line(wX, y + 1, wX + doc.getTextWidth(wLine), y + 1);
  }

  doc.save("architectural_services_agreement.pdf");
};

export default function ArchitecturalServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Architectural Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="architecturalservicesagreement"
    />
  );
}