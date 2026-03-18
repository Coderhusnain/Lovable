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
    label: "Project Details",
    fields: [
      {
        name: "worksiteAddress",
        label: "Worksite / property address",
        type: "text",
        required: true,
        placeholder: "123 Roof Street, City, State",
      },
      {
        name: "serviceStartDate",
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
      {
        name: "description",
        label: "Detailed description of roofing work to be performed",
        type: "textarea",
        required: true,
        placeholder: "Describe all roofing services — materials, dimensions, repair or replacement details...",
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Total Contract Price",
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
          { value: "Upon completion of the work", label: "Upon Completion" },
          { value: "Weekly",                      label: "Weekly" },
          { value: "Bi-weekly",                   label: "Bi-weekly" },
          { value: "Monthly",                     label: "Monthly" },
          { value: "Milestone-based",             label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Warranty",
    fields: [
      {
        name: "warrantyMonths",
        label: "Workmanship warranty period (months)",
        type: "text",
        required: true,
        placeholder: "e.g. 24",
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

  // ── overflow guard ──
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

  // ── alpha sub-item: (a) Bold label — text ──
  const alphaItem = (label: string, boldLabel: string, text: string) => {
    const indent  = 10;
    const prefix  = `(${label}) `;
    const full    = `${boldLabel} — ${text}`;
    const lines   = doc.splitTextToSize(full, WIDTH - indent);
    ensure(lines.length * LH + 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(prefix, LEFT + 2, y);
    const afterPrefix = LEFT + 2 + doc.getTextWidth(prefix);
    // bold label part
    doc.setFont("helvetica", "bold");
    doc.text(boldLabel, afterPrefix, y);
    const afterBold = afterPrefix + doc.getTextWidth(boldLabel);
    doc.setFont("helvetica", "normal");
    const rest = ` — ${text}`;
    const restLines = doc.splitTextToSize(rest, WIDTH - (afterBold - LEFT));
    doc.text(restLines[0], afterBold, y);
    y += LH;
    for (let i = 1; i < restLines.length; i++) {
      ensure(LH);
      doc.text(restLines[i], LEFT + indent, y);
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
  doc.text("ROOFING CONTRACT", 105, y, { align: "center" });
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
    `This Roofing Contract ("Contract") is made and entered into as of ` +
    `${values.effectiveDate || "___________"}, by and between:`
  );
  gap(1);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  para(`Owner: ${values.party1Name || "[Owner Name]"}, of ${p1Addr}`);
  doc.setFont("helvetica", "normal");
  doc.setFont("helvetica", "bold");
  para(`Contractor: ${values.party2Name || "[Contractor Name]"}, of ${p2Addr}`);
  doc.setFont("helvetica", "normal");
  gap(1);
  para(
    `Effective Date: This Contract shall become effective on the date first written above.`
  );
  gap(5);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Parties & Effective Date
  // ════════════════════════════════════════════════════════════
  heading("1. Parties & Effective Date");
  para(
    `This Contract is made between the Owner and the Contractor, and shall be effective from ` +
    `${values.effectiveDate || "___________"}. The obligations, covenants, and agreements set forth ` +
    `shall bind the parties from such date.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Description of Services
  // ════════════════════════════════════════════════════════════
  heading("2. Description of Services");
  para(
    `The Contractor shall furnish all labor, equipment, and materials necessary to perform the roofing ` +
    `services described below at the property located at: ${values.worksiteAddress || "___________"} ("Worksite").`
  );
  para(values.description || "[Insert detailed description of roofing work].", 2);
  para(
    `The Contractor shall commence work on ${values.serviceStartDate || "___________"} and complete ` +
    `the work by ${values.completionDate || "___________"}, subject to extensions permitted under this Contract.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Scope of Work
  // ════════════════════════════════════════════════════════════
  heading("3. Scope of Work");
  para(
    `The Contractor shall supply and deliver all necessary labor, materials, tools, equipment, and ` +
    `supervision required to complete the roofing project in accordance with industry standards, ` +
    `applicable building codes, and manufacturer specifications. Work shall be performed Monday through ` +
    `Saturday, excluding statutory holidays, and is subject to favorable weather conditions.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Worksite Access & Conditions
  // ════════════════════════════════════════════════════════════
  heading("4. Worksite Access & Conditions");
  para(
    `The Owner grants the Contractor the right to access the Worksite for purposes of performing the ` +
    `services herein. This includes authorization for excavation or grading as necessary to perform ` +
    `roofing work. Unless specifically stated, no landscaping, grading, filling, or excavation work ` +
    `is included.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Payment Terms
  // ════════════════════════════════════════════════════════════
  heading("5. Payment Terms");
  alphaItem("a", "Contract Price",  `The total Contract Price is ${values.paymentAmount || "[insert amount]"}.`);
  alphaItem("b", "Due Date",        `Payment shall be due ${values.paymentSchedule || "upon completion of the work"} unless otherwise agreed in writing.`);
  alphaItem("c", "Discounts",       `Any early payment discounts must be taken within the stated time limit.`);
  alphaItem("d", "Late Payments",   `Late payments shall accrue interest at the maximum rate permitted by law.`);
  alphaItem("e", "Collection Costs",`In the event of non-payment, the defaulting party shall be liable for all collection costs, including reasonable attorneys' fees.`);
  alphaItem("f", "Material Breach", `Non-payment constitutes a material breach, entitling the non-defaulting party to suspend performance or terminate this Contract.`);
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Permits & Insurance
  // ════════════════════════════════════════════════════════════
  heading("6. Permits & Insurance");
  para(
    `The Contractor shall be responsible for obtaining all permits and licenses necessary for the ` +
    `performance of the work and shall maintain all insurance required by law, including commercial ` +
    `general liability insurance and workers' compensation coverage.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Survey & Title
  // ════════════════════════════════════════════════════════════
  heading("7. Survey & Title");
  para(
    `If property lines are uncertain, the Owner shall indicate the boundaries and provide stakes or ` +
    `other markers. The Owner shall be responsible for ensuring that all work is performed within ` +
    `legal property limits.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Indemnification
  // ════════════════════════════════════════════════════════════
  heading("8. Indemnification");
  para(
    `Each party agrees to indemnify, defend, and hold harmless the other party, its officers, ` +
    `employees, and agents from any and all claims, liabilities, damages, costs, and expenses, ` +
    `including reasonable attorneys' fees, arising out of or related to the negligent acts, omissions, ` +
    `or willful misconduct of the indemnifying party or its agents.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Warranty
  // ════════════════════════════════════════════════════════════
  heading("9. Warranty");
  alphaItem("a", "Workmanship Warranty",
    `The Contractor warrants that all work will be free from defects in workmanship for a period of ` +
    `${values.warrantyMonths || "___"} months from the date of completion.`
  );
  alphaItem("b", "Coverage",
    `This warranty covers leaks occurring under normal weather conditions.`
  );
  alphaItem("c", "Exclusions",
    `This warranty does not cover damage caused by misuse, neglect, unauthorized modifications, or acts of God.`
  );
  alphaItem("d", "Material Warranty",
    `Manufacturer's warranties for materials shall be assigned to the Owner upon completion.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Completion of Services
  // ════════════════════════════════════════════════════════════
  heading("10. Completion of Services");
  para(
    `Upon completion, the Contractor shall restore the property to its pre-work condition and remove ` +
    `all debris, tools, and equipment. The work shall be deemed completed when accepted by the Owner ` +
    `in writing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – Change Orders
  // ════════════════════════════════════════════════════════════
  heading("11. Change Orders");
  para(
    `No changes to the scope of work shall be binding unless documented in a written "Change Order" ` +
    `signed by both parties. Additional costs associated with change orders shall be borne by the Owner.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Access & Protection
  // ════════════════════════════════════════════════════════════
  heading("12. Access & Protection");
  para(
    `The Owner shall provide the Contractor with free and unhindered access to the Worksite, including ` +
    `adequate space for the storage of materials and equipment. The Contractor shall take reasonable ` +
    `measures to protect the Owner's property during the course of work.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Term
  // ════════════════════════════════════════════════════════════
  heading("13. Term");
  para(
    `This Contract shall automatically terminate on the completion date specified herein ` +
    `(${values.completionDate || "___________"}), unless extended by mutual written agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Work Product Ownership
  // ════════════════════════════════════════════════════════════
  heading("14. Work Product Ownership");
  para(
    `All completed work and deliverables produced under this Contract shall be the property of the ` +
    `Owner upon payment in full. The Contractor shall execute any documents necessary to evidence ` +
    `such ownership.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 15 – Confidentiality
  // ════════════════════════════════════════════════════════════
  heading("15. Confidentiality");
  para(
    `Each party agrees to maintain in strict confidence all proprietary or confidential information ` +
    `disclosed during the term of this Contract and not to use such information except as necessary ` +
    `to perform obligations herein.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 16 – Default
  // ════════════════════════════════════════════════════════════
  heading("16. Default");
  para("Events of default include, but are not limited to:");
  bullet("Failure to make timely payments;");
  bullet("Insolvency or bankruptcy;");
  bullet("Seizure of property;");
  bullet("Failure to commence or complete services within the agreed timeframe.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 17 – Remedies
  // ════════════════════════════════════════════════════════════
  heading("17. Remedies");
  para(
    `In the event of default, the non-defaulting party may terminate this Contract upon written notice, ` +
    `provided the defaulting party fails to cure the breach within ten (10) business days after receipt ` +
    `of such notice.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 18 – Force Majeure
  // ════════════════════════════════════════════════════════════
  heading("18. Force Majeure");
  para(
    `Neither party shall be liable for delays or failures in performance due to events beyond their ` +
    `reasonable control, including but not limited to natural disasters, pandemics, war, acts of ` +
    `terrorism, labor disputes, or government orders.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 19 – Arbitration
  // ════════════════════════════════════════════════════════════
  heading("19. Arbitration");
  para(
    `All disputes arising from or relating to this Contract shall be resolved by binding arbitration ` +
    `under the Construction Industry Arbitration Rules of the American Arbitration Association. The ` +
    `arbitrator's decision shall be final, and judgment may be entered in any court of competent jurisdiction.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 20 – Entire Agreement & Amendments
  // ════════════════════════════════════════════════════════════
  heading("20. Entire Agreement & Amendments");
  para(
    `This Contract constitutes the entire agreement between the parties and supersedes all prior ` +
    `negotiations, representations, or agreements, whether written or oral. Any amendments must be ` +
    `in writing and signed by both parties.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 21 – Severability
  // ════════════════════════════════════════════════════════════
  heading("21. Severability");
  para(
    `If any provision of this Contract is found invalid or unenforceable, the remaining provisions ` +
    `shall remain in full force and effect.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 22 – Governing Law
  // ════════════════════════════════════════════════════════════
  heading("22. Governing Law");
  para(
    `This Contract shall be governed by and construed in accordance with the laws of the State of ` +
    `${values.state || "___________"}.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 23 – Notices
  // ════════════════════════════════════════════════════════════
  heading("23. Notices");
  para(
    `All notices required under this Contract shall be in writing and delivered personally, by ` +
    `certified mail, or by recognized courier service to the addresses provided herein. Notices shall ` +
    `be deemed received upon delivery.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 24 – Waiver of Contractual Right
  // ════════════════════════════════════════════════════════════
  heading("24. Waiver of Contractual Right");
  para(
    `Failure to enforce any provision of this Contract shall not constitute a waiver of that provision ` +
    `or any other provision, nor prevent subsequent enforcement.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 25 – Signatories
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("25. Signatories");
  para(
    `By signing below, the parties affirm that they are duly authorized to enter into this Contract ` +
    `and that they agree to be bound by its terms.`
  );
  gap(6);

  // ── Owner signature block ──
  heading("OWNER:");
  sigRow("Name:",      values.party1Name);
  sigRow("Signature:", values.party1Signature);
  sigRow("Date:",      new Date().toLocaleDateString());
  gap(5);

  // ── Contractor signature block ──
  heading("CONTRACTOR:");
  sigRow("Name:",      values.party2Name);
  sigRow("Signature:", values.party2Signature);
  sigRow("Date:",      new Date().toLocaleDateString());

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

  doc.save("roofing_contract.pdf");
};

export default function RoofingContract() {
  return (
    <FormWizard
      steps={steps}
      title="Roofing Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="roofingcontract"
    />
  );
}