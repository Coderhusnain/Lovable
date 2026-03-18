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
    label: "Owner Details",
    fields: [
      {
        name: "party1Name",
        label: "Owner's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Owner an individual or a business?",
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
    label: "Owner Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party1Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Owner Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Contractor Details",
    fields: [
      {
        name: "party2Name",
        label: "Contractor's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Contractor an individual or a business?",
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
    label: "Contractor Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Contractor Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Project & Work Details",
    fields: [
      {
        name: "projectAddress",
        label: "Worksite / property address",
        type: "text",
        required: true,
        placeholder: "123 Renovation Lane, City, State",
      },
      {
        name: "description",
        label: "Detailed description of remodelling work to be performed",
        type: "textarea",
        required: true,
        placeholder: "Describe all remodelling work in detail...",
      },
      {
        name: "startDate",
        label: "Work commencement date",
        type: "date",
        required: true,
      },
      {
        name: "completionDate",
        label: "Expected completion date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Contract Price (total amount)",
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
          { value: "Upon completion",  label: "Upon Completion" },
          { value: "Weekly",           label: "Weekly" },
          { value: "Bi-weekly",        label: "Bi-weekly" },
          { value: "Monthly",          label: "Monthly" },
          { value: "Milestone-based",  label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Warranty",
    fields: [
      {
        name: "warrantyPeriod",
        label: "Workmanship warranty period (e.g. 1 year)",
        type: "text",
        required: true,
        placeholder: "e.g. 1 year",
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
        label: "Owner Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Contractor Signature (type full legal name)",
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

  // ── normal body paragraph ──
  const para = (text: string, afterGap = 3) => {
    const lines = doc.splitTextToSize(text, WIDTH);
    ensure(lines.length * LH + afterGap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(lines, LEFT, y);
    y += lines.length * LH + afterGap;
  };

  // ── bullet item (•) ──
  const bullet = (text: string) => {
    const indent = 7;
    const lines  = doc.splitTextToSize(text, WIDTH - indent);
    ensure(lines.length * LH + 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("\u2022", LEFT + 2, y);
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
  doc.text("HOME REMODELLING AGREEMENT", 105, y, { align: "center" });
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
    `This Home Remodelling Agreement ("Agreement") is made and entered into on ` +
    `${values.effectiveDate || "___________"}, by and between:`
  );
  gap(1);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  para(`Owner: ${values.party1Name || "___________"}, of ${p1Addr}`);
  doc.setFont("helvetica", "normal");
  para(`AND`);
  doc.setFont("helvetica", "bold");
  para(`Contractor: ${values.party2Name || "___________"}, of ${p2Addr}`);
  doc.setFont("helvetica", "normal");
  gap(1);
  para(`Collectively referred to as the "Parties" and individually as a "Party."`);
  gap(5);

  // ── Project reference ──
  para(
    `Worksite Address: ${values.projectAddress || "___________"}     ` +
    `Commencement: ${values.startDate || "___________"}     ` +
    `Completion: ${values.completionDate || "___________"}`
  );
  gap(2);
  para(`Work Description:`);
  para(values.description || "[Insert detailed description of remodelling work].", 2);
  gap(5);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Licensing
  // ════════════════════════════════════════════════════════════
  heading("1. Licensing");
  para(
    `The Contractor warrants that it holds a valid and subsisting license issued under the applicable ` +
    `laws and regulations of the State of ${values.state || "___________"}, authorizing it to perform ` +
    `the remodelling works described herein. The Contractor shall maintain such license in good standing ` +
    `throughout the duration of the Agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Time for Performance
  // ════════════════════════════════════════════════════════════
  heading("2. Time for Performance");
  para(
    `The Contractor shall commence work on or before ${values.startDate || "___________"}. Substantial ` +
    `commencement shall be deemed to occur upon mobilization of labor, materials, and equipment to the Worksite.`
  );
  para(
    `If the Contractor fails to commence within thirty (30) days of the specified date, the Owner may ` +
    `proportionally delay payment. Delays outside the Contractor's reasonable control — including but not ` +
    `limited to weather conditions, governmental orders, supply chain disruptions, or labor disputes — ` +
    `shall automatically extend completion deadlines.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Drawings, Specifications, and Permits
  // ════════════════════════════════════════════════════════════
  heading("3. Drawings, Specifications, and Permits");
  para(
    `All remodelling work shall be performed in accordance with the plans and specifications described ` +
    `in this Agreement. The Contractor shall secure all necessary permits and approvals, while the Owner ` +
    `shall bear the costs of such permits and any governmental charges. The Owner shall also supply ` +
    `accurate property line data and boundary markers where applicable.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Property Lines & Utilities
  // ════════════════════════════════════════════════════════════
  heading("4. Property Lines & Utilities");
  para(
    `The Owner shall ensure that water, sewer, gas, and electricity are available at the property entry ` +
    `point. Drinking water, restroom access, and reasonable utilities for construction purposes shall be ` +
    `provided for the Contractor's workforce.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Access to Work
  // ════════════════════════════════════════════════════════════
  heading("5. Access to Work");
  para(
    `The Owner shall grant free and unobstructed access to the worksite during agreed working hours, ` +
    `ensure clear driveways, and provide safe storage areas for materials and tools. The Owner shall ` +
    `secure the property from unauthorized access. The Contractor shall store materials responsibly and ` +
    `take reasonable measures to prevent damage.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Standard Materials
  // ════════════════════════════════════════════════════════════
  heading("6. Standard Materials");
  para(
    `All materials used shall conform to those specified in this Agreement. Substitutions shall require ` +
    `prior written consent from the Owner.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Nonstandard Materials
  // ════════════════════════════════════════════════════════════
  heading("7. Nonstandard Materials");
  para(
    `Any deviation in quality, specifications, or color from the agreed design shall require a written ` +
    `agreement signed by both parties.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Hazardous Materials
  // ════════════════════════════════════════════════════════════
  heading("8. Hazardous Materials");
  para(
    `The Contractor shall not be responsible for detecting, handling, or removing hazardous materials ` +
    `unless expressly agreed. Should such materials be encountered, work shall stop until the Owner ` +
    `engages qualified remediation services.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Work Allowance & Abnormal Conditions
  // ════════════════════════════════════════════════════════════
  heading("9. Work Allowance & Abnormal Conditions");
  para(
    `Reasonable dimensional variances are permitted. The Contractor shall not be responsible for poor ` +
    `soil conditions, concealed structural deficiencies, or unusual site conditions unless separately ` +
    `contracted as extra work.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Change Orders
  // ════════════════════════════════════════════════════════════
  heading("10. Change Orders");
  para(
    `All modifications to the remodelling scope shall be documented in a written Change Order signed by ` +
    `both parties, with associated costs borne by the Owner.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – Scope Exclusions
  // ════════════════════════════════════════════════════════════
  heading("11. Scope Exclusions");
  para(`Unless expressly stated, this Agreement does not include:`);
  bullet("Painting or decorative finishing preparation");
  bullet("Grading or landscaping");
  bullet("Unrelated structural alterations");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Extra Work and Changes
  // ════════════════════════════════════════════════════════════
  heading("12. Extra Work and Changes");
  para(
    `All extra work must be authorized in writing by the Owner and will be billed at the agreed rates ` +
    `plus overhead and profit.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Plumbing
  // ════════════════════════════════════════════════════════════
  heading("13. Plumbing");
  para(
    `No alterations to plumbing, gas, waste, or water lines are included unless expressly specified in ` +
    `this Agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Electrical Service
  // ════════════════════════════════════════════════════════════
  heading("14. Electrical Service");
  para(
    `Electrical upgrades are limited to installing breakers or fuses necessary for new remodelling ` +
    `features unless otherwise specified.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 15 – Matching Finishes
  // ════════════════════════════════════════════════════════════
  heading("15. Matching Finishes");
  para(
    `The Contractor will advise the Owner on limitations in matching textures, colors, or finishes in ` +
    `remodelling works involving partial replacement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 16 – Filled Ground or Rock
  // ════════════════════════════════════════════════════════════
  heading("16. Filled Ground or Rock");
  para(
    `Excavation work does not include removal of rock, unstable soil, or filled ground unless agreed ` +
    `as extra work.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 17 – Termite & Rot Repair
  // ════════════════════════════════════════════════════════════
  heading("17. Termite & Rot Repair");
  para(
    `Repairs for termite or dry rot damage are excluded unless treated as separately contracted work.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 18 – Site Cleanup
  // ════════════════════════════════════════════════════════════
  heading("18. Site Cleanup");
  para(
    `The Contractor shall remove all debris and leave the site broom-clean, except for materials the ` +
    `Owner wishes to retain.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 19 – Extensions of Time
  // ════════════════════════════════════════════════════════════
  heading("19. Extensions of Time");
  para(
    `Any delays caused by conditions beyond the Contractor's control shall extend the completion ` +
    `schedule without penalty, including:`
  );
  bullet("Adverse weather conditions");
  bullet("Permit delays or governmental orders");
  bullet("Strikes or labor disputes");
  bullet("Supply chain disruptions or material shortages");
  bullet("Owner-related delays or non-payment");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 20 – Insurance Requirements
  // ════════════════════════════════════════════════════════════
  heading("20. Insurance Requirements");
  para(
    `Before commencement, the Owner shall obtain fire and builder's risk insurance for at least the ` +
    `Contract Price of ${values.paymentAmount || "[Contract Price]"}, naming the Contractor as ` +
    `additional insured. If the Owner fails to do so, the Contractor may obtain such coverage at the ` +
    `Owner's expense.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 21 – Workers' Compensation
  // ════════════════════════════════════════════════════════════
  heading("21. Workers' Compensation");
  para(
    `The Contractor shall maintain workers' compensation insurance for its employees. The Owner shall ` +
    `insure against injury to their own personnel or invitees.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 22 – Protection of Property
  // ════════════════════════════════════════════════════════════
  heading("22. Protection of Property");
  para(
    `The Owner shall remove or protect personal property from the work area. The Contractor shall not ` +
    `be responsible for unprotected property damage.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 23 – Warranty
  // ════════════════════════════════════════════════════════════
  heading("23. Warranty");
  para(
    `The Contractor warrants workmanship against defects for a period of ` +
    `${values.warrantyPeriod || "[insert period]"} from the date of completion. Manufacturer warranties ` +
    `on materials will be transferred to the Owner upon final payment.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 24 – Work Stoppage
  // ════════════════════════════════════════════════════════════
  heading("24. Work Stoppage");
  para(
    `The Contractor may halt work if payments are not made when due. If work remains halted for sixty ` +
    `(60) days, the Contractor may invoice for completed work and materials, plus profit, and terminate ` +
    `obligations under this Agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 25 – Completion and Occupancy
  // ════════════════════════════════════════════════════════════
  heading("25. Completion and Occupancy");
  para(
    `Upon completion, the Owner shall record a Notice of Completion within five (5) days. If the Owner ` +
    `fails to do so, the Contractor may execute it on the Owner's behalf. The Owner shall not occupy or ` +
    `use the remodelled area until full payment is made.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 26 – Notices
  // ════════════════════════════════════════════════════════════
  heading("26. Notices");
  para(
    `All notices shall be in writing and delivered personally, by certified mail, or electronically to ` +
    `the addresses in this Agreement. Notices are deemed received one (1) day after dispatch.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 27 – Entire Agreement
  // ════════════════════════════════════════════════════════════
  heading("27. Entire Agreement");
  para(
    `This Agreement, together with all attached schedules, constitutes the entire agreement between the ` +
    `parties and supersedes all prior oral or written agreements. This Agreement is governed by the laws ` +
    `of the State of ${values.state || "___________"}.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 28 – Corrective Work
  // ════════════════════════════════════════════════════════════
  heading("28. Corrective Work");
  para(
    `Minor corrective work shall be completed promptly without withholding payment. For significant ` +
    `corrective work exceeding one percent (1%) of the Contract Price, the Owner may withhold only the ` +
    `amount necessary for completion.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 29 – Dispute Resolution
  // ════════════════════════════════════════════════════════════
  heading("29. Dispute Resolution");
  para(
    `All disputes shall be resolved by binding arbitration under the Construction Industry Arbitration ` +
    `Rules of the American Arbitration Association, with the award being final and enforceable in any ` +
    `court of competent jurisdiction.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 30 – Attorneys' Fees
  // ════════════════════════════════════════════════════════════
  heading("30. Attorneys' Fees");
  para(
    `The prevailing party in arbitration or litigation shall be entitled to recover reasonable ` +
    `attorneys' fees and costs.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 31 – Signatures
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("31. Signatures");
  para(
    `IN WITNESS WHEREOF, the parties have executed this Home Remodelling Agreement as of the date ` +
    `first written above.`
  );
  gap(6);

  // ── Owner block ──
  heading("OWNER:");
  sigRow("Name:",      values.party1Name);
  sigRow("Signature:", values.party1Signature);
  sigRow("Date:",      new Date().toLocaleDateString());
  sigRow("Address:",   p1Addr);
  gap(5);

  // ── Contractor block ──
  heading("CONTRACTOR:");
  sigRow("Name:",      values.party2Name);
  sigRow("Signature:", values.party2Signature);
  sigRow("Date:",      new Date().toLocaleDateString());
  sigRow("Address:",   p2Addr);

  // ── Optional Witness ──
  if ((values.witnessName || "").trim()) {
    gap(6);
    ensure(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const wLine = values.witnessName;
    doc.text(`Witness: ${wLine}`, LEFT, y);
    const wX = LEFT + doc.getTextWidth("Witness: ");
    doc.line(wX, y + 1, wX + doc.getTextWidth(wLine), y + 1);
  }

  doc.save("home_remodelling_agreement.pdf");
};

export default function HomeRemodellingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Home Remodelling Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="homeremodellingagreement"
    />
  );
}