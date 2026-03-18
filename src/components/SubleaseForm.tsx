import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps = [
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
    label: "Effective Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this document?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Tenant (First Party)",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Tenant?",
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
    label: "Tenant Address",
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
    label: "Tenant Contact",
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
    label: "Subtenant (Second Party)",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Subtenant?",
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
    label: "Subtenant Address",
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
    label: "Subtenant Contact",
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
    label: "Premises & Prime Lease",
    fields: [
      {
        name: "premisesAddress",
        label: "Full address of the subleased Premises",
        type: "text",
        required: true,
        placeholder: "123 Main St, City, State ZIP",
      },
      {
        name: "primLeaseDate",
        label: "Date of the original Prime Lease agreement",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Sublease Term",
    fields: [
      {
        name: "subleaseStartDate",
        label: "Sublease Start Date",
        type: "date",
        required: true,
      },
      {
        name: "subleaseEndDate",
        label: "Sublease End Date (matches Prime Lease expiry)",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Rent & Deposit",
    fields: [
      {
        name: "monthlyRent",
        label: "Monthly sublease rent amount ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 1500.00",
      },
      {
        name: "totalRent",
        label: "Total amount due under this Sublease ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 18000.00",
      },
      {
        name: "rentPaymentAddress",
        label: "Address or payment instructions for rent",
        type: "text",
        required: true,
        placeholder: "e.g. 456 Landlord Ave or Venmo @tenant",
      },
      {
        name: "securityDeposit",
        label: "Security deposit amount ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 3000.00",
      },
    ],
  },
  {
    label: "Inspection Notes",
    fields: [
      {
        name: "inspBathrooms",
        label: "Bathrooms — condition notes (leave blank if satisfactory)",
        type: "text",
        required: false,
        placeholder: "e.g. Minor tile crack near shower",
      },
      {
        name: "inspCarpeting",
        label: "Carpeting — condition notes",
        type: "text",
        required: false,
        placeholder: "e.g. Stain in living room",
      },
      {
        name: "inspCeilings",
        label: "Ceilings — condition notes",
        type: "text",
        required: false,
        placeholder: "e.g. Water stain in bedroom",
      },
      {
        name: "inspDoors",
        label: "Doors — condition notes",
        type: "text",
        required: false,
        placeholder: "e.g. Sliding door stiff",
      },
      {
        name: "inspAppliances",
        label: "Appliances (stove, refrigerator, dishwasher, disposal) — notes",
        type: "text",
        required: false,
        placeholder: "e.g. Dishwasher door latch loose",
      },
      {
        name: "inspOther",
        label: "Other areas (closets, fireplace, lights, locks, screens) — notes",
        type: "text",
        required: false,
        placeholder: "e.g. Bedroom closet door off track",
      },
    ],
  },
  {
    label: "Terms & Duration",
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
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Additional payment amount (if applicable)",
        type: "text",
        required: false,
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
        placeholder: "Enter any additional terms...",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "party1Signature",
        label: "Tenant Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Subtenant Signature (Type full legal name)",
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
];

// ─── PDF helpers ───────────────────────────────────────────────────────────────

const PAGE_W = 210;
const MARGIN  = 20;
const MAX_W   = PAGE_W - MARGIN * 2;
const LINE_H  = 6;
const PAGE_H  = 277;

function addPage(doc) {
  doc.addPage();
  return MARGIN;
}

function checkY(doc, y, needed = LINE_H * 2) {
  if (y + needed > PAGE_H) return addPage(doc);
  return y;
}

function writeHeading(doc, text, y) {
  y = checkY(doc, y, LINE_H * 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, MAX_W);
  doc.text(lines, MARGIN, y);
  y += lines.length * LINE_H + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  return y;
}

function writeBody(doc, text, y) {
  y = checkY(doc, y, LINE_H);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, MAX_W);
  lines.forEach((line) => {
    y = checkY(doc, y);
    doc.text(line, MARGIN, y);
    y += LINE_H;
  });
  return y + 2;
}

function writeBullet(doc, text, y) {
  y = checkY(doc, y, LINE_H);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const indent = MARGIN + 6;
  const bulletW = MAX_W - 6;
  doc.text("\u2022", MARGIN, y);
  const lines = doc.splitTextToSize(text, bulletW);
  lines.forEach((line) => {
    y = checkY(doc, y);
    doc.text(line, indent, y);
    y += LINE_H;
  });
  return y + 1;
}

function writeTableRow(doc, col1, col2, col3, y, isHeader) {
  y = checkY(doc, y, LINE_H + 2);
  const c1W = 55, c2W = 40, c3W = 75;
  if (isHeader) {
    doc.setFont("helvetica", "bold");
  } else {
    doc.setFont("helvetica", "normal");
  }
  doc.setFontSize(9);
  doc.text(doc.splitTextToSize(col1, c1W - 2)[0], MARGIN, y);
  doc.text(doc.splitTextToSize(col2, c2W - 2)[0], MARGIN + c1W, y);
  doc.text(doc.splitTextToSize(col3, c3W - 2)[0], MARGIN + c1W + c2W, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  return y + LINE_H;
}

function writeSigBlock(doc, label, name, y) {
  y = checkY(doc, y, LINE_H * 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, MARGIN, y);
  y += LINE_H + 2;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", MARGIN, y);
  y += LINE_H;
  doc.text("Name:       " + (name || ""), MARGIN, y);
  y += LINE_H;
  doc.text("Date:         _______________________________", MARGIN, y);
  return y + LINE_H;
}

// ─── Main PDF generator ────────────────────────────────────────────────────────

const generatePDF = (values) => {
  const doc = new jsPDF();
  let y = MARGIN;

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SUBLEASE AGREEMENT", PAGE_W / 2, y, { align: "center" });
  y += LINE_H + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Jurisdiction: ${values.state || ""}, ${(values.country || "").toUpperCase()}   |   Effective Date: ${values.effectiveDate || "N/A"}`,
    PAGE_W / 2, y, { align: "center" }
  );
  y += LINE_H + 6;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  y = writeBody(doc,
    `This Sublease Agreement (the "Sublease") is made and entered into effective as of ${values.effectiveDate || "[Insert Date]"},`,
    y
  );
  y = writeBody(doc, "By and Between", y);
  y = writeBody(doc,
    `${values.party1Name || "[Insert Tenant Name]"} (the "Tenant") and ${values.party2Name || "[Insert Subtenant Name]"} (the "Subtenant").`,
    y
  );
  y = writeBody(doc,
    `This Sublease is executed pursuant to and subject to the terms and conditions of a primary lease agreement dated ${values.primLeaseDate || "[Insert Date]"} (the "Prime Lease"), a copy of which is attached hereto as an exhibit and incorporated herein by reference.`,
    y
  );
  y = writeBody(doc,
    "WHEREAS, the Tenant desires to sublease the leased premises to the Subtenant, and the Subtenant desires to accept the sublease of said premises from the Tenant;",
    y
  );
  y = writeBody(doc,
    "NOW, THEREFORE, in consideration of the mutual covenants and conditions herein contained, the parties agree as follows:",
    y
  );
  y += 2;

  // ── SECTION 1 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "1.  PREMISES", y);
  y = writeBody(doc,
    `The Tenant hereby subleases to the Subtenant the real property located at ${values.premisesAddress || "[Insert Full Address]"} (the "Premises"), subject to the terms and conditions set forth in this Sublease.`,
    y
  );
  y += 2;

  // ── SECTION 2 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "2.  TERM AND POSSESSION", y);
  y = writeBody(doc,
    `The term of this Sublease shall commence on ${values.subleaseStartDate || "[Insert Start Date]"} and, unless sooner terminated in accordance with the terms of this Sublease, shall continue until the expiration of the term set forth in the Prime Lease, which terminates on ${values.subleaseEndDate || "[Insert End Date]"}.`,
    y
  );
  y = writeBody(doc,
    `Subtenant's right to occupy the Premises shall terminate on ${values.subleaseEndDate || "[Insert End Date]"}, unless otherwise extended by written agreement executed by both parties. Subtenant shall not be responsible for securing a replacement tenant upon the expiration or termination of this Sublease.`,
    y
  );
  y += 2;

  // ── SECTION 3 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "3.  SUBLEASE PAYMENTS", y);
  y = writeBody(doc,
    `The Subtenant shall pay to the Tenant monthly sublease rent in the amount of $${values.monthlyRent || "0.00"}, payable in advance on or before the first day of each calendar month. The total amount due under this Sublease shall be $${values.totalRent || "0.00"}. All payments shall be made to the Tenant at ${values.rentPaymentAddress || "[Insert Address or Payment Instructions]"}, or such other address as the Tenant may designate in writing.`,
    y
  );
  y += 2;

  // ── SECTION 4 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "4.  SECURITY DEPOSIT", y);
  y = writeBody(doc,
    `Upon execution of this Sublease, the Subtenant shall pay to the Landlord, to be held in trust, a security deposit in the amount of $${values.securityDeposit || "0.00"}, to be applied in accordance with applicable laws to any damage caused to the Premises by Subtenant or to remedy any breach of this Sublease.`,
    y
  );
  y += 2;

  // ── SECTION 5 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "5.  GOVERNING LAW", y);
  y = writeBody(doc,
    `This Sublease shall be governed by, and construed in accordance with, the laws of the State of ${values.state || "[Insert State]"}, without regard to its conflict of laws principles.`,
    y
  );
  y += 2;

  // ── SECTION 6 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "6.  DISPUTE RESOLUTION", y);
  y = writeBody(doc,
    `The parties agree to first attempt in good faith to resolve any disputes arising out of or related to this Sublease through amicable negotiations. If the dispute remains unresolved, the parties agree to submit the matter to ${values.disputeResolution || "mediation"}, in accordance with applicable statutory procedures. If that process is unsuccessful, either party may seek resolution through any lawful means or remedies available under the applicable jurisdiction.`,
    y
  );
  y += 2;

  // ── SECTION 7 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "7.  LANDLORD'S CONSENT", y);
  y = writeBody(doc,
    "Pursuant to the Prime Lease, written consent of the Landlord is required for any subletting of the Premises. This Sublease shall be expressly conditioned upon the receipt of such written consent. The Tenant agrees to make reasonable efforts to obtain the Landlord's written consent. If such consent is not obtained, this Sublease shall be rendered null and void, and neither party shall have any further rights or obligations under it.",
    y
  );
  y += 2;

  // ── SECTION 8 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "8.  INCORPORATION OF PRIME LEASE", y);
  y = writeBody(doc,
    "This Sublease is expressly subject to all terms, covenants, and conditions of the Prime Lease, with the same force and effect as if fully set forth herein, except as otherwise provided in this Sublease. The Subtenant shall be bound by all obligations of the Tenant under the Prime Lease, and shall be entitled to the benefit of all rights conferred on the Tenant, to the extent not inconsistent with this Sublease.",
    y
  );
  y = writeBody(doc,
    "For purposes of interpretation, the terms \"Landlord,\" \"Tenant,\" and \"Lease\" as used in the Prime Lease shall be deemed to refer to \"Tenant,\" \"Subtenant,\" and \"Sublease\" respectively, unless otherwise expressly stated.",
    y
  );
  y += 2;

  // ── SECTION 9: INSPECTION CHECKLIST ──────────────────────────────────────
  y = writeHeading(doc, "9.  INSPECTION CHECKLIST", y);
  y = writeBody(doc,
    "The Subtenant acknowledges having inspected the Premises and confirms that, with the exception of the issues noted below, the condition of the Premises is satisfactory and free from material defects:",
    y
  );
  y += 2;

  // Table header
  y = checkY(doc, y, LINE_H * 16);
  doc.setDrawColor(180);
  y = writeTableRow(doc, "AREA", "CONDITION", "COMMENTS", y, true);
  doc.line(MARGIN, y, MARGIN + MAX_W, y);
  y += 2;

  const inspRows = [
    ["Bathrooms",   values.inspBathrooms  || "Satisfactory"],
    ["Carpeting",   values.inspCarpeting  || "Satisfactory"],
    ["Ceilings",    values.inspCeilings   || "Satisfactory"],
    ["Closets",     values.inspOther      ? "See comments" : "Satisfactory"],
    ["Dishwasher",  values.inspAppliances ? "See comments" : "Satisfactory"],
    ["Disposal",    values.inspAppliances ? "See comments" : "Satisfactory"],
    ["Doors",       values.inspDoors      || "Satisfactory"],
    ["Fireplace",   values.inspOther      ? "See comments" : "Satisfactory"],
    ["Lights",      values.inspOther      ? "See comments" : "Satisfactory"],
    ["Locks",       values.inspOther      ? "See comments" : "Satisfactory"],
    ["Refrigerator",values.inspAppliances ? "See comments" : "Satisfactory"],
    ["Screens",     values.inspOther      ? "See comments" : "Satisfactory"],
    ["Stove",       values.inspAppliances ? "See comments" : "Satisfactory"],
  ];

  const commentMap = {
    "Bathrooms":   values.inspBathrooms  || "",
    "Carpeting":   values.inspCarpeting  || "",
    "Ceilings":    values.inspCeilings   || "",
    "Doors":       values.inspDoors      || "",
    "Dishwasher":  values.inspAppliances || "",
    "Disposal":    values.inspAppliances || "",
    "Refrigerator":values.inspAppliances || "",
    "Stove":       values.inspAppliances || "",
    "Closets":     values.inspOther      || "",
    "Fireplace":   values.inspOther      || "",
    "Lights":      values.inspOther      || "",
    "Locks":       values.inspOther      || "",
    "Screens":     values.inspOther      || "",
  };

  inspRows.forEach(([area, condition]) => {
    y = writeTableRow(doc, area, condition, commentMap[area] || "", y, false);
  });

  y += 4;

  // ── CONFIDENTIALITY (conditional from form) ────────────────────────────────
  if (values.confidentiality === "yes") {
    y = writeHeading(doc, "10.  CONFIDENTIALITY", y);
    y = writeBody(doc,
      "Both Parties agree to keep the terms of this Sublease and all related information strictly confidential and shall not disclose such information to any third party without prior written consent of the other Party.",
      y
    );
    y += 2;
  }

  // ── ADDITIONAL TERMS (conditional from form) ───────────────────────────────
  if (values.additionalTerms) {
    y = writeHeading(doc, "ADDITIONAL TERMS", y);
    y = writeBody(doc, values.additionalTerms, y);
    y += 2;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkY(doc, y, LINE_H * 10);
  y = writeBody(doc,
    "IN WITNESS WHEREOF, the parties have executed this Sublease Agreement as of the day and year first above written.",
    y
  );
  y += 4;

  y = writeSigBlock(doc, "TENANT:", values.party1Name, y);
  y += 6;
  y = writeSigBlock(doc, "SUBTENANT:", values.party2Name, y);

  if (values.witnessName) {
    y += 6;
    y = checkY(doc, y, LINE_H * 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS:", MARGIN, y);
    y += LINE_H + 2;
    doc.setFont("helvetica", "normal");
    doc.text("Name:       " + values.witnessName, MARGIN, y);
    y += LINE_H;
    doc.text("Signature: _______________________________", MARGIN, y);
    y += LINE_H;
    doc.text("Date:         _______________________________", MARGIN, y);
  }

  doc.save("sublease.pdf");
};

export default function SubleaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Sublease Agreement"
      subtitle="Complete each step to generate your Sublease Agreement"
      onGenerate={generatePDF}
      documentType="sublease"
    />
  );
}