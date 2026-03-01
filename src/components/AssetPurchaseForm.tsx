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
        label: "What is the payment amount (if applicable)?",
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
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "First Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Second Party Signature (Type full legal name)",
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

// ─── Shared PDF helpers ──────────────────────────────────────────────────────

/** Render "Label:  " (normal) + underlined value on the same baseline */
const fieldRow = (doc: jsPDF, label: string, value: string, x: number, y: number) => {
  doc.setFont("helvetica", "normal");
  doc.text(label, x, y);
  const vx = x + doc.getTextWidth(label);
  doc.text(value, vx, y);
  doc.line(vx, y + 0.7, vx + doc.getTextWidth(value), y + 0.7);
};

/** Underline a word/phrase that appears inline within running text.
 *  `textBefore` is already rendered; this just draws the underline under `word`
 *  at absolute position (wx, wy). */
const inlineUnderline = (doc: jsPDF, word: string, wx: number, wy: number) => {
  doc.line(wx, wy + 0.7, wx + doc.getTextWidth(word), wy + 0.7);
};

/** Bold + underlined centred title */
const boldUnderlinedCentre = (doc: jsPDF, text: string, y: number, fontSize = 13) => {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "bold");
  const w = doc.getTextWidth(text);
  const x = (210 - w) / 2;
  doc.text(text, x, y);
  doc.line(x, y + 0.9, x + w, y + 0.9);
};

/** Wrapped paragraph – returns updated y */
const para = (doc: jsPDF, text: string, x: number, y: number, maxW: number, lh: number): number => {
  const lines: string[] = doc.splitTextToSize(text, maxW);
  doc.text(lines, x, y);
  return y + lines.length * lh;
};

// ─── generatePDF ─────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 25;
  const W = 160;   // text width
  const lh = 7;    // line height
  let y = 22;

  const durMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "Indefinite/Ongoing", "custom": "Custom Duration",
  };
  const noticeMap: Record<string, string> = {
    "immediate": "Immediate", "7days": "7 Days", "14days": "14 Days",
    "30days": "30 Days", "60days": "60 Days", "90days": "90 Days",
  };
  const disputeMap: Record<string, string> = {
    "mediation": "Mediation", "arbitration": "Binding Arbitration",
    "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation",
  };

  // ── Title ──
  doc.setFontSize(13);
  boldUnderlinedCentre(doc, "ASSET PURCHASE", y, 13);
  y += lh * 2;

  // ── Header rows ──
  doc.setFontSize(11);
  fieldRow(doc, "Date:  ", values.effectiveDate || "N/A", L, y); y += lh;
  fieldRow(doc, "To:  ", values.party2Name || "N/A", L, y); y += lh;
  fieldRow(
    doc,
    "Address:  ",
    `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`,
    L, y
  ); y += lh * 1.6;

  // ── Subject (bold) ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    `Subject: Asset Purchase – ${values.party1Name || "First Party"} & ${values.party2Name || "Second Party"}`,
    L, y
  );
  y += lh * 1.6;

  // ── Body ──
  doc.setFont("helvetica", "normal");

  doc.text("Dear Sir or Madam:", L, y);
  y += lh;

  // Para 1 – mention party2Name underlined inline
  const p1a = "I am writing to formally confirm the Asset Purchase with ";
  const p2name = values.party2Name || "the Second Party";
  const p1b = ", effective immediately.";
  doc.text(p1a, L, y);
  const p2x = L + doc.getTextWidth(p1a);
  doc.text(p2name, p2x, y);
  inlineUnderline(doc, p2name, p2x, y);
  doc.text(p1b, p2x + doc.getTextWidth(p2name), y);
  y += lh;

  // Para 2
  const body2 =
    values.description ||
    "The parties agree to provide services as described in the terms of this agreement. " +
    "All obligations and deliverables shall be performed in a professional and timely manner.";
  y = para(doc, body2, L, y, W, lh);
  y += lh * 0.4;

  // Para 3 – terms summary
  const body3 =
    `This agreement is governed by the laws of ${values.state || ""}, ${(values.country || "").toUpperCase()}. ` +
    `Duration: ${durMap[values.duration] || values.duration || "N/A"}. ` +
    `Termination notice: ${noticeMap[values.terminationNotice] || values.terminationNotice || "N/A"}. ` +
    `Confidentiality: ${values.confidentiality === "yes" ? "Included" : "Not included"}. ` +
    `Dispute resolution: ${disputeMap[values.disputeResolution] || values.disputeResolution || "N/A"}.`;
  y = para(doc, body3, L, y, W, lh);
  y += lh * 0.4;

  // Para 4 – financial (if any)
  if (values.paymentAmount) {
    const body4 =
      `Financial terms: A payment of ${values.paymentAmount} is agreed on a ` +
      `${values.paymentSchedule || "N/A"} schedule.`;
    y = para(doc, body4, L, y, W, lh);
    y += lh * 0.4;
  }

  // Para 5 – additional (if any)
  if (values.additionalTerms) {
    y = para(doc, values.additionalTerms, L, y, W, lh);
    y += lh * 0.4;
  }

  // Para 6 – closing
  const body6 =
    "Please contact us should you require any additional information to process this agreement. " +
    "We appreciate your prompt attention to this matter and look forward to written confirmation " +
    "of the terms herein.";
  y = para(doc, body6, L, y, W, lh);
  y += lh;

  doc.text("Thank you for your cooperation.", L, y);
  y += lh * 1.8;

  doc.text("Sincerely,", L, y);
  y += lh * 2.8;

  // ── Signature block ──
  const sigName = values.party1Signature || values.party1Name || "First Party";
  doc.setFont("helvetica", "bold");
  doc.text(sigName, L, y);
  doc.line(L, y + 0.9, L + doc.getTextWidth(sigName), y + 0.9);
  y += lh;

  doc.setFont("helvetica", "normal");
  doc.text(`${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`, L, y); y += lh;
  doc.text(`Email: ${values.party1Email || ""}`, L, y); y += lh;
  doc.text(`Phone: ${values.party1Phone || ""}`, L, y); y += lh;

  if (values.witnessName) {
    y += lh * 0.5;
    doc.text(`Witness: ${values.witnessName}`, L, y);
  }

  doc.save("asset_purchase.pdf");
};

export default function AssetPurchase() {
  return (
    <FormWizard
      steps={steps}
      title="Asset Purchase"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="assetpurchase"
    />
  );
}