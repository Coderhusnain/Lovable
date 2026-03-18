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
        label: "What is the full legal name of the first party (Lessor)?",
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
        label: "What is the full legal name of the second party (Lessee)?",
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
        name: "bonusConsideration",
        label: "Bonus Consideration Amount ($)",
        type: "text",
        required: false,
        placeholder: "$0.00",
      },
      {
        name: "annualRental",
        label: "Annual Rental Amount ($)",
        type: "text",
        required: false,
        placeholder: "$0.00",
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

// ─── helpers ────────────────────────────────────────────────────────────────

/** Adds a bold section heading. Returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 20) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
};

/** Wraps body text with an optional left indent. Returns updated y. */
const addBody = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number,
  indent = 20,
  maxWidth = 170
): number => {
  if (y > pageH - 20) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, maxWidth - (indent - 20));
  lines.forEach((line: string) => {
    if (y > pageH - 15) { doc.addPage(); y = 20; }
    doc.text(line, indent, y);
    y += 5.5;
  });
  return y + 2;
};

/** Renders a bullet point. Returns updated y. */
const addBullet = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number
): number => {
  if (y > pageH - 20) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022", 24, y);
  const lines = doc.splitTextToSize(text, 156);
  lines.forEach((line: string, i: number) => {
    if (y > pageH - 15) { doc.addPage(); y = 20; }
    doc.text(line, 30, y);
    if (i < lines.length - 1) y += 5.5;
  });
  return y + 6;
};

// ─── PDF generator ──────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("OIL LEASE AGREEMENT", 105, y, { align: "center" });
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `This Oil and Gas Lease Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "[Insert Date]"}, by and between:`,
    20, y, { maxWidth: 170 }
  );
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Lessor:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    ` ${values.party1Name || "[Insert Full Name]"}, having an address at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} ("Lessor"),`,
    20, y, { maxWidth: 170 }
  );
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Lessee:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    ` ${values.party2Name || "[Insert Full Name]"}, having an address at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} ("Lessee").`,
    20, y, { maxWidth: 170 }
  );
  y += 10;

  y = addBody(doc, 'The Lessor and Lessee may be collectively referred to as the "Parties."', y, pageH);
  y += 3;

  // ── SECTION 1 ──
  y = addHeading(doc, "1. Grant of Lease", y, pageH);
  y = addBody(
    doc,
    `Lessor, for and in consideration of the sum of $${values.bonusConsideration || "0.00"} and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, hereby leases and demises exclusively to Lessee the real property located in the County of ${values.county || "[Insert County]"}, State of ${values.state || "[Insert State]"}, with the address of ${values.premisesAddress || "[Insert Address]"}, more particularly described as follows: ${values.legalDescription || "[Insert Legal Description]"}, and comprising approximately ${values.acres || "0"} acres (the "Premises").`,
    y, pageH
  );
  y = addBody(
    doc,
    "The Premises are leased solely for the purpose of exploring, drilling, mining, operating for, and extracting, storing, and removing oil, gas, hydrocarbons, and all associated substances.",
    y, pageH
  );
  y = addBody(
    doc,
    `This Lease shall remain in force for an initial term of ${values.leaseTerm || "0"} years from the Effective Date, and shall continue thereafter so long as:`,
    y, pageH
  );
  y = addBullet(doc, "(a) oil, gas, or other hydrocarbon substances are being produced in paying quantities from the Premises;", y, pageH);
  y = addBullet(doc, "(b) drilling or reworking operations are being continuously conducted; or", y, pageH);
  y = addBullet(doc, "(c) the Parties mutually agree in writing to extend the Lease.", y, pageH);
  y += 2;

  // ── SECTION 2 ──
  y = addHeading(doc, "2. Lessee's Rights", y, pageH);
  y = addBody(doc, "Lessee shall have the exclusive right to:", y, pageH);
  y = addBullet(doc, "(a) Enter and occupy the Premises for oil and gas operations;", y, pageH);
  y = addBullet(doc, "(b) Construct, operate, maintain, and replace structures, wells, tanks, pipelines, machinery, roads, power and communication lines, and employee facilities as necessary;", y, pageH);
  y = addBullet(doc, "(c) Inject gas, water, or other substances into the subsurface;", y, pageH);
  y = addBullet(doc, "(d) Drill for and use water obtained from the Premises without cost;", y, pageH);
  y = addBullet(doc, "(e) Construct and operate processing plants or facilities for hydrocarbons extracted from the Premises or adjacent properties.", y, pageH);
  y += 2;

  // ── SECTION 3 ──
  y = addHeading(doc, "3. Royalty Provisions", y, pageH);

  y = addHeading(doc, "3.1 Oil Royalty", y, pageH);
  y = addBody(
    doc,
    `Lessee shall pay to Lessor a royalty of ${values.oilRoyaltyPercent || "[Insert Percentage]"}% of the value of all oil produced and removed from the Premises, calculated at the posted market price for oil of similar quality on the date of removal, with adjustments for temperature, water, and sediment.`,
    y, pageH
  );
  y = addBody(doc, "Upon 90 days' prior written notice, Lessor may elect to receive oil royalties in kind, delivered at no cost at the wellhead or designated pipeline.", y, pageH);
  y = addBody(doc, "No royalty shall be payable on oil lost through evaporation, fire, leakage, or other casualty prior to marketing.", y, pageH);
  y += 2;

  y = addHeading(doc, "3.2 Gas Royalty", y, pageH);
  y = addBody(
    doc,
    `Lessee shall pay Lessor a royalty of ${values.gasRoyaltyPercent || "[Insert Percentage]"}% of the net proceeds from the sale of gas and all gaseous substances produced and sold from the Premises, after deduction of transportation and processing costs.`,
    y, pageH
  );
  y = addBody(doc, "No royalty shall be payable for gas used in lease operations or for repressurization.", y, pageH);
  y += 2;

  y = addHeading(doc, "3.3 Casinghead Gasoline", y, pageH);
  y = addBody(
    doc,
    `For casinghead gasoline sold by Lessee, Lessor shall receive a royalty of ${values.casingheadRoyaltyPercent || "[Insert Percentage]"}% of the net proceeds. No royalty shall be due if casinghead gasoline is reinjected into the reservoir.`,
    y, pageH
  );
  y += 2;

  y = addHeading(doc, "3.4 Use for Operations", y, pageH);
  y = addBody(doc, "Lessee shall not be required to pay royalties for oil, gas, or water produced and used for operations conducted on the Premises.", y, pageH);
  y += 2;

  // ── SECTION 4 ──
  y = addHeading(doc, "4. Royalty and Rental Payments", y, pageH);
  y = addBody(
    doc,
    `All royalty payments shall be made on or before the ${values.royaltyPaymentDay || "[Insert Day]"} of each month for production during the preceding month. Payment shall be deemed made when deposited in the U.S. mail with first-class postage, addressed to the Lessor's address provided herein, or such other address as Lessor may designate in writing.`,
    y, pageH
  );
  y += 2;

  // ── SECTION 5 ──
  y = addHeading(doc, "5. Development Clause and Annual Rentals", y, pageH);
  y = addBody(
    doc,
    `Lessee has paid the full rental for the primary term of this Lease. If Lessee has not commenced drilling operations by the expiration of the primary term, the Lease may continue by payment of an annual rental of $${values.annualRental || "0.00"} until such operations begin or the Lease is terminated.`,
    y, pageH
  );
  y += 2;

  // ── SECTION 6 ──
  y = addHeading(doc, "6. Offset Well Obligations", y, pageH);
  y = addBody(
    doc,
    `If hydrocarbons are discovered in paying quantities in any well drilled within ${values.offsetWellDistance || "0"} feet of the boundary of the Premises, Lessee shall, within a reasonable period, commence drilling an offset well on the Premises, provided:`,
    y, pageH
  );
  y = addBullet(doc, "(a) Production from the adjacent well continues beyond a 30-day test period; and", y, pageH);
  y = addBullet(doc, "(b) Lessee has not fulfilled its development obligations.", y, pageH);
  y += 2;

  // ── SECTION 7 ──
  y = addHeading(doc, "7. Operational Standards", y, pageH);
  y = addBody(
    doc,
    "All operations shall be conducted by Lessee at its own expense in a good and workmanlike manner, in compliance with all applicable federal, state, and local laws, rules, and regulations. Lessee shall not allow any liens to be placed on the Premises arising from its operations.",
    y, pageH
  );
  y += 2;

  // ── SECTION 8 ──
  y = addHeading(doc, "8. Taxes", y, pageH);
  y = addBody(
    doc,
    "Lessee shall pay all taxes on equipment, improvements, and stored oil or gas installed or produced by it. Lessor shall be responsible for property taxes on the surface and for any portion of mineral taxes not specifically assigned to Lessee.",
    y, pageH
  );
  y += 2;

  // ── SECTION 9 ──
  y = addHeading(doc, "9. Surface Use by Lessor", y, pageH);
  y = addBody(
    doc,
    "Lessor retains the right to use the surface of the Premises for agricultural and other lawful purposes, provided such use does not interfere with Lessee's rights under this Lease.",
    y, pageH
  );
  y += 2;

  // ── SECTION 10 ──
  y = addHeading(doc, "10. Default and Remedies", y, pageH);
  y = addBody(
    doc,
    "If Lessee fails to pay any due rental or royalty, or breaches any material obligation under this Lease, and fails to cure the default within fifteen (15) days after receiving written notice from Lessor, then Lessor may terminate this Lease. However, Lessee shall retain rights to any well in production or under active drilling, including the surrounding one (1) acre and necessary rights-of-way.",
    y, pageH
  );
  y += 2;

  // ── SECTION 11 ──
  y = addHeading(doc, "11. Termination and Surrender", y, pageH);
  y = addBody(
    doc,
    "Upon expiration or termination of this Lease, Lessee shall peaceably surrender possession of the Premises and restore the property to a reasonably original condition, accounting for ordinary wear and tear. Lessee shall have the right to remove its equipment and facilities.",
    y, pageH
  );
  y += 2;

  // ── SECTION 12 ──
  y = addHeading(doc, "12. Assignment", y, pageH);
  y = addBody(
    doc,
    "Either party may assign its interest under this Lease, provided written notice is given to the other party. No assignment shall increase the burden or obligations of the non-assigning party without its express written consent.",
    y, pageH
  );
  y += 2;

  // ── SECTION 13 ──
  y = addHeading(doc, "13. Notices", y, pageH);
  y = addBody(
    doc,
    "All notices under this Lease shall be in writing and shall be deemed properly delivered if personally delivered or sent via certified mail, return receipt requested, to the Parties at the addresses stated above, or any updated address notified in writing.",
    y, pageH
  );
  y += 2;

  // ── SECTION 14 ──
  y = addHeading(doc, "14. Binding Effect", y, pageH);
  y = addBody(
    doc,
    "This Lease shall be binding upon and inure to the benefit of the Parties and their respective heirs, personal representatives, successors, and assigns.",
    y, pageH
  );
  y += 2;

  // ── SECTION 15 ──
  y = addHeading(doc, "15. Attorneys' Fees", y, pageH);
  y = addBody(
    doc,
    "If any dispute arises from this Lease, the prevailing party shall be entitled to recover its reasonable attorneys' fees and court costs as awarded by a court of competent jurisdiction.",
    y, pageH
  );
  y += 2;

  // ── SECTION 16 ──
  y = addHeading(doc, "16. Entire Agreement", y, pageH);
  y = addBody(
    doc,
    "This Lease represents the entire agreement between the Parties regarding the subject matter herein and supersedes all prior agreements or representations, whether oral or written. No amendment or modification shall be valid unless made in writing and signed by both Parties.",
    y, pageH
  );

  if (values.confidentiality === "yes") {
    y += 2;
    y = addHeading(doc, "17. Confidentiality", y, pageH);
    y = addBody(
      doc,
      "Each Party agrees to hold in strict confidence all proprietary or non-public information disclosed by the other Party in connection with this Lease and shall not disclose such information to any third party without prior written consent.",
      y, pageH
    );
  }

  if (values.additionalTerms) {
    y += 2;
    y = addHeading(doc, "Additional Terms", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
  }

  // ── SIGNATURES ──
  if (y > pageH - 60) { doc.addPage(); y = 20; }
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("IN WITNESS WHEREOF", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(", the Parties have executed this Lease Agreement as of the date first above written.", 68, y);
  y += 12;

  // Lessor block
  doc.setFont("helvetica", "bold");
  doc.text("LESSOR:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  doc.text(`Signature (typed): ${values.party1Signature || ""}`, 20, y);
  y += 7;
  doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
  y += 12;

  // Lessee block
  doc.setFont("helvetica", "bold");
  doc.text("LESSEE:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
  doc.text(`Signature (typed): ${values.party2Signature || ""}`, 20, y);
  y += 7;
  doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
  y += 12;

  if (values.witnessName) {
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
    y += 12;
  }

  // ── MAKE IT LEGAL NOTE ──
  if (y > pageH - 40) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "bold");
  doc.text("Make It Legal", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  y = addBody(doc, "This Agreement should be signed in front of a notary public. Once signed, this document should be delivered to the appropriate court for filing.", y, pageH);
  y += 3;

  doc.setFont("helvetica", "bold");
  doc.text("Copies", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  y = addBody(doc, "The original Agreement should be filed with the Clerk of Court or delivered to the requesting business. Each Party should retain a copy in a safe place.", y, pageH);
  y += 3;

  doc.setFont("helvetica", "bold");
  doc.text("Additional Assistance", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  addBody(doc, "If you are unsure or have questions regarding this Agreement, or need additional assistance with special situations or circumstances, consult a qualified attorney in your area.", y, pageH);

  doc.save("oil_lease_agreement.pdf");
};

export default function OilLease() {
  return (
    <FormWizard
      steps={steps}
      title="Oil Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="oillease"
    />
  );
}