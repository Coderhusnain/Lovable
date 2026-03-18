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
    label: "Lessor Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Lessor",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Lessor an individual or a business?",
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
    label: "Lessor Address",
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
    label: "Lessor Contact",
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
    label: "Lessee Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Lessee",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Lessee an individual or a business?",
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
    label: "Lessee Address",
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
    label: "Lessee Contact",
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
    label: "Premises Details",
    fields: [
      {
        name: "county",
        label: "County where the Premises are located",
        type: "text",
        required: true,
        placeholder: "Enter county name",
      },
      {
        name: "premisesAddress",
        label: "Address of the Premises",
        type: "text",
        required: true,
        placeholder: "Enter premises address",
      },
      {
        name: "legalDescription",
        label: "Legal Description of the Premises",
        type: "textarea",
        required: true,
        placeholder: "Enter legal description...",
      },
      {
        name: "acres",
        label: "Approximate Acreage",
        type: "text",
        required: true,
        placeholder: "e.g. 100",
      },
    ],
  },
  {
    label: "Lease Term & Royalties",
    fields: [
      {
        name: "leaseTerm",
        label: "Initial lease term (years)",
        type: "text",
        required: true,
        placeholder: "e.g. 5",
      },
      {
        name: "oilRoyaltyPercent",
        label: "Oil Royalty Percentage (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 12.5",
      },
      {
        name: "gasRoyaltyPercent",
        label: "Gas Royalty Percentage (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 12.5",
      },
      {
        name: "casingheadRoyaltyPercent",
        label: "Casinghead Gasoline Royalty Percentage (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 12.5",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "annualRental",
        label: "Annual Rental Amount ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 0.00",
      },
      {
        name: "suspensionRentalPerAcre",
        label: "Suspension Rental Rate per Acre ($/acre/year)",
        type: "text",
        required: true,
        placeholder: "e.g. 5.00",
      },
      {
        name: "royaltyPaymentDay",
        label: "Day of month royalty payments are due",
        type: "text",
        required: true,
        placeholder: "e.g. 15",
      },
      {
        name: "offsetWellDistance",
        label: "Offset Well Boundary Distance (feet)",
        type: "text",
        required: true,
        placeholder: "e.g. 660",
      },
    ],
  },
  {
    label: "Tax Allocation",
    fields: [
      {
        name: "lesseeMineralTaxPercent",
        label: "Lessee's share of mineral taxes (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 50",
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
        label: "Lessor Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Lessee Signature (Type full legal name)",
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

// ─── PDF helpers ──────────────────────────────────────────────────────────────

/** Bold section heading — returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
};

/** Sub-heading (e.g. 3.1, 3.2) — slightly smaller, still bold. */
const addSubHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 20) { doc.addPage(); y = 20; }
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 6;
};

/** Wrapped body text — returns updated y. */
const addBody = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number,
  indent = 20,
  maxWidth = 170
): number => {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines: string[] = doc.splitTextToSize(text, maxWidth - (indent - 20));
  for (const line of lines) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(line, indent, y);
    y += 5.5;
  }
  return y + 2;
};

/** Bullet point — returns updated y. */
const addBullet = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022", 24, y);
  const lines: string[] = doc.splitTextToSize(text, 156);
  for (let i = 0; i < lines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(lines[i], 30, y);
    if (i < lines.length - 1) y += 5.5;
  }
  return y + 6;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("GAS LEASE AGREEMENT", 105, y, { align: "center" });
  y += 11;

  // ── PREAMBLE ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y = addBody(
    doc,
    `This Gas Lease Agreement ("Agreement") is made and entered into on ${values.effectiveDate || "[Insert Date]"}, by and between:`,
    y, pageH
  );
  y += 1;

  doc.setFont("helvetica", "bold");
  doc.text("Lessor:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    ` ${values.party1Name || "[Insert Name]"}, residing at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} ("Lessor"),`,
    40, y, { maxWidth: 150 }
  );
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.text("And", 105, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.text("Lessee:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    ` ${values.party2Name || "[Insert Name]"}, residing at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} ("Lessee").`,
    40, y, { maxWidth: 150 }
  );
  y += 9;

  y = addBody(doc, 'The Lessor and Lessee shall collectively be referred to as the "Parties."', y, pageH);
  y += 3;

  // ── 1. GRANT OF LEASED PREMISES ──
  y = addHeading(doc, "1. GRANT OF LEASED PREMISES", y, pageH);
  y = addBody(
    doc,
    `In consideration of the sum of $${values.annualRental || "0.00"} as annual rental, the receipt of which is acknowledged, and in further consideration of the covenants and obligations contained herein, the Lessor hereby leases exclusively to the Lessee the tract of land situated in the County of ${values.county || "[Insert County]"}, State of ${values.state || "[Insert State]"}, located at ${values.premisesAddress || "[Insert Address]"}, and more fully described as: ${values.legalDescription || "[Insert Legal Description]"}, comprising approximately ${values.acres || "0"} acres (the "Premises"), for the purpose of exploring, drilling, mining, extracting, storing, and removing oil, gas, hydrocarbons, and all associated substances.`,
    y, pageH
  );
  y = addBody(
    doc,
    `The lease shall remain in force for a term of ${values.leaseTerm || "0"} years from the date of execution, and shall continue thereafter so long as:`,
    y, pageH
  );
  y = addBullet(doc, "(a) oil, gas, or other hydrocarbon substances are being produced in paying quantities from the Premises;", y, pageH);
  y = addBullet(doc, "(b) drilling operations are being continuously conducted; or", y, pageH);
  y = addBullet(doc, "(c) the term is extended by mutual written agreement.", y, pageH);
  y += 2;

  // ── 2. RIGHTS GRANTED TO LESSEE ──
  y = addHeading(doc, "2. RIGHTS GRANTED TO LESSEE", y, pageH);
  y = addBody(doc, "Lessee is granted the exclusive right to:", y, pageH);
  y = addBullet(doc, "(a) enter and occupy the Premises;", y, pageH);
  y = addBullet(doc, "(b) construct, maintain, operate, and repair any necessary structures, including plants, pipelines, equipment, power and communication lines, employee housing, and roadways;", y, pageH);
  y = addBullet(doc, "(c) inject gas, water, and other substances into the Premises;", y, pageH);
  y = addBullet(doc, "(d) drill for water and use water obtained from the Premises free of charge;", y, pageH);
  y = addBullet(doc, "(e) build and operate processing facilities for extraction of oil and gas from the Premises or nearby lands.", y, pageH);
  y += 2;

  // ── 3. ROYALTY PROVISIONS ──
  y = addHeading(doc, "3. ROYALTY PROVISIONS", y, pageH);

  y = addSubHeading(doc, "3.1 Oil Royalty", y, pageH);
  y = addBody(
    doc,
    `Lessee shall pay to Lessor a royalty equal to ${values.oilRoyaltyPercent || "[__]"}% of the value of oil produced and removed, adjusted for temperature, water, and sediment. Value shall be based on the prevailing market price on the date of removal. Lessor may elect, with 90 days' written notice, to receive royalty in kind. No royalty shall be owed for oil lost prior to delivery or due to casualty.`,
    y, pageH
  );
  y += 2;

  y = addSubHeading(doc, "3.2 Gas Royalty", y, pageH);
  y = addBody(
    doc,
    `Lessee shall pay to Lessor a royalty equal to ${values.gasRoyaltyPercent || "[__]"}% of net proceeds received from the sale of gas. Deductions for transportation and processing are permitted. No royalty is due for gas:`,
    y, pageH
  );
  y = addBullet(doc, "(a) lost or used in plant operations;", y, pageH);
  y = addBullet(doc, "(b) used for repressurization of oil-bearing formations.", y, pageH);
  y += 2;

  y = addSubHeading(doc, "3.3 Casinghead Gasoline", y, pageH);
  y = addBody(
    doc,
    `If sold, Lessee shall pay Lessor ${values.casingheadRoyaltyPercent || "[__]"}% of net proceeds received from casinghead gasoline. No royalty is due if it is reinjected. Sales must reflect fair market value.`,
    y, pageH
  );
  y += 2;

  y = addSubHeading(doc, "3.4 Own Use Exemption", y, pageH);
  y = addBody(
    doc,
    "Lessee shall not be required to pay royalty on any hydrocarbons or water used in its operations under this Agreement.",
    y, pageH
  );
  y += 2;

  // ── 4. PAYMENT OF ROYALTIES ──
  y = addHeading(doc, "4. PAYMENT OF ROYALTIES", y, pageH);
  y = addBody(
    doc,
    `All royalties due shall be paid on or before the ${values.royaltyPaymentDay || "[Insert Day]"} of each month for production during the preceding month. Payments shall be deemed made when deposited in the United States mail, addressed to Lessor. All unpaid royalties shall be settled at year-end.`,
    y, pageH
  );
  y += 2;

  // ── 5. DEVELOPMENT CLAUSE ──
  y = addHeading(doc, "5. DEVELOPMENT CLAUSE", y, pageH);
  y = addBody(
    doc,
    `Lessee has paid all rent due for the primary term. If drilling has not commenced by the end of such term, Lessee shall pay annual rentals of $${values.annualRental || "0.00"} until drilling begins or the lease is terminated.`,
    y, pageH
  );
  y += 2;

  // ── 6. PAYMENT METHOD ──
  y = addHeading(doc, "6. PAYMENT METHOD", y, pageH);
  y = addBody(
    doc,
    "Rent and royalties shall be considered paid upon mailing via first-class U.S. mail to Lessor's last known address. Lessor may update their address via written notice.",
    y, pageH
  );
  y += 2;

  // ── 7. OWNERSHIP INTEREST ──
  y = addHeading(doc, "7. OWNERSHIP INTEREST", y, pageH);
  y = addBody(
    doc,
    "If Lessor owns less than full title to the Premises or mineral rights, royalties shall be reduced proportionally to reflect actual ownership.",
    y, pageH
  );
  y += 2;

  // ── 8. OIL AND GAS DEVELOPMENT ──
  y = addHeading(doc, "8. OIL AND GAS DEVELOPMENT", y, pageH);
  y = addBody(
    doc,
    `Lessee shall continue to develop the Premises diligently upon discovery of oil or gas. If gas wells do not produce oil in paying quantities, Lessee may either suspend operations and pay rental of $${values.suspensionRentalPerAcre || "0.00"} per acre annually, or seek markets to resume production.`,
    y, pageH
  );
  y += 2;

  // ── 9. OFFSET WELLS ──
  y = addHeading(doc, "9. OFFSET WELLS", y, pageH);
  y = addBody(
    doc,
    `Lessee shall drill an offset well if an adjacent well within ${values.offsetWellDistance || "0"} feet of the boundary produces hydrocarbons in paying quantities for over 30 days, and Lessee has not fulfilled its drilling obligations under the Development Clause.`,
    y, pageH
  );
  y += 2;

  // ── 10. CONDUCT OF OPERATIONS ──
  y = addHeading(doc, "10. CONDUCT OF OPERATIONS", y, pageH);
  y = addBody(
    doc,
    "Lessee shall bear all costs of operations and perform in a lawful and workmanlike manner. No liens may be placed on the Premises as a result of Lessee's operations.",
    y, pageH
  );
  y += 2;

  // ── 11. TAXES ──
  y = addHeading(doc, "11. TAXES", y, pageH);
  y = addBody(
    doc,
    `Lessee shall pay taxes on all improvements and oil stored by it, and ${values.lesseeMineralTaxPercent || "[__]"}% of mineral taxes. Lessor shall pay real estate taxes and the remaining mineral taxes.`,
    y, pageH
  );
  y += 2;

  // ── 12. SURFACE USE ──
  y = addHeading(doc, "12. SURFACE USE", y, pageH);
  y = addBody(
    doc,
    "Lessor may use the surface of the Premises for agricultural or other non-interfering activities.",
    y, pageH
  );
  y += 2;

  // ── 13. DEFAULT ──
  y = addHeading(doc, "13. DEFAULT", y, pageH);
  y = addBody(
    doc,
    "If Lessee defaults in any obligation and fails to cure such default within 15 days of written notice, Lessor may terminate this Lease. However, Lessee shall retain rights to any actively producing or drilling wells and one acre surrounding such wells, including ingress and egress rights.",
    y, pageH
  );
  y += 2;

  // ── 14. TERMINATION AND REMOVAL ──
  y = addHeading(doc, "14. TERMINATION AND REMOVAL", y, pageH);
  y = addBody(
    doc,
    "Upon termination, Lessee shall vacate and restore the Premises to its original condition, reasonable wear and tear excepted. Lessee may remove all equipment and improvements.",
    y, pageH
  );
  y += 2;

  // ── 15. ASSIGNMENT ──
  y = addHeading(doc, "15. ASSIGNMENT", y, pageH);
  y = addBody(
    doc,
    "Neither party shall assign its interest without prior written consent of the other, which shall not be unreasonably withheld. Notice of assignment must be given in writing.",
    y, pageH
  );
  y += 2;

  // ── 16. NOTICES ──
  y = addHeading(doc, "16. NOTICES", y, pageH);
  y = addBody(
    doc,
    "All notices shall be in writing and delivered in person or by certified mail to the addresses stated above. Notices shall be deemed received upon delivery or three days after mailing.",
    y, pageH
  );
  y += 2;

  // ── 17. BINDING EFFECT ──
  y = addHeading(doc, "17. BINDING EFFECT", y, pageH);
  y = addBody(
    doc,
    "This Lease shall be binding upon and inure to the benefit of the Parties and their respective heirs, executors, administrators, successors, and assigns.",
    y, pageH
  );
  y += 2;

  // ── 18. ATTORNEYS' FEES ──
  y = addHeading(doc, "18. ATTORNEYS' FEES", y, pageH);
  y = addBody(
    doc,
    "In the event of any legal action arising out of this Lease, the prevailing party shall be entitled to recover reasonable attorneys' fees and costs as determined by the court.",
    y, pageH
  );
  y += 2;

  // ── 19. ENTIRE AGREEMENT ──
  y = addHeading(doc, "19. ENTIRE AGREEMENT", y, pageH);
  y = addBody(
    doc,
    "This Agreement constitutes the entire agreement between the Parties concerning the Premises. No oral statements or prior agreements shall have any force. This Lease may only be amended in writing, signed by both Parties.",
    y, pageH
  );
  y += 2;

  // ── OPTIONAL: CONFIDENTIALITY ──
  if (values.confidentiality === "yes") {
    y = addHeading(doc, "20. CONFIDENTIALITY", y, pageH);
    y = addBody(
      doc,
      "Each Party agrees to keep strictly confidential all non-public or proprietary information disclosed by the other Party in connection with this Lease and shall not disclose such information to any third party without prior written consent.",
      y, pageH
    );
    y += 2;
  }

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "ADDITIONAL TERMS", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── MAKE IT LEGAL ──
  y = addHeading(doc, "Make It Legal", y, pageH);
  y = addBody(
    doc,
    "This Agreement should be signed in front of a notary public. Once signed, this document should be delivered to the appropriate court for filing.",
    y, pageH
  );
  y += 2;

  y = addHeading(doc, "Copies", y, pageH);
  y = addBody(
    doc,
    "The original Agreement should be filed with the Clerk of Court or delivered to the requesting business. Each Party should maintain a copy in a safe place.",
    y, pageH
  );
  y += 2;

  y = addHeading(doc, "Additional Assistance", y, pageH);
  y = addBody(
    doc,
    "If you are unsure or have questions regarding this Agreement or need additional assistance, consult a qualified attorney in your area.",
    y, pageH
  );
  y += 4;

  // ── SIGNATURES ──
  if (y > pageH - 65) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("IN WITNESS WHEREOF", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(", the Parties have executed this Gas Lease Agreement as of the date first written above.", 68, y, { maxWidth: 122 });
  y += 12;

  // Lessor
  doc.setFont("helvetica", "bold");
  doc.text("LESSOR:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  doc.text(`Typed Signature: ${values.party1Signature || ""}`, 20, y);
  y += 7;
  doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
  y += 14;

  // Lessee
  doc.setFont("helvetica", "bold");
  doc.text("LESSEE:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
  doc.text(`Typed Signature: ${values.party2Signature || ""}`, 20, y);
  y += 7;
  doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
  y += 14;

  if (values.witnessName) {
    if (y > pageH - 20) { doc.addPage(); y = 20; }
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
  }

  doc.save("gas_lease_agreement.pdf");
};

export default function GasLease() {
  return (
    <FormWizard
      steps={steps}
      title="Gas Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="gaslease"
    />
  );
}