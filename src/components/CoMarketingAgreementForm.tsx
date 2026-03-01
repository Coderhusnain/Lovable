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

// ─── PDF Helpers ─────────────────────────────────────────────────────────────

/** Draw plain label then UNDERLINED value on the same line. Returns x after value. */
const fieldRow = (doc: jsPDF, label: string, value: string, x: number, y: number): number => {
  doc.setFont("helvetica", "normal");
  doc.text(label, x, y);
  const vx = x + doc.getTextWidth(label);
  doc.text(value, vx, y);
  const vw = doc.getTextWidth(value);
  doc.line(vx, y + 0.7, vx + vw, y + 0.7);
  return vx + vw;
};

/** Draw plain text then UNDERLINED credential inline; returns new x cursor. */
const inlineVal = (doc: jsPDF, before: string, value: string, x: number, y: number): number => {
  doc.text(before, x, y);
  const vx = x + doc.getTextWidth(before);
  doc.text(value, vx, y);
  const vw = doc.getTextWidth(value);
  doc.line(vx, y + 0.7, vx + vw, y + 0.7);
  return vx + vw;
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

/** Render a line with label (normal) + underlined value; advance y by lh */
const credLine = (doc: jsPDF, label: string, value: string, x: number, y: number): number => {
  fieldRow(doc, label, value, x, y);
  return y;
};

// ─── generatePDF ─────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 25;
  const lh = 7;
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

  const p1name  = values.party1Name  || "First Party";
  const p2name  = values.party2Name  || "Second Party";
  const p1addr  = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`;
  const p2addr  = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`;
  const eDate   = values.effectiveDate || "N/A";
  const juris   = `${values.state || ""}, ${(values.country || "").toUpperCase()}`;
  const dur     = durMap[values.duration]     || values.duration     || "N/A";
  const notice  = noticeMap[values.terminationNotice] || values.terminationNotice || "N/A";
  const confid  = values.confidentiality === "yes" ? "Included" : "Not Included";
  const dispute = disputeMap[values.disputeResolution] || values.disputeResolution || "N/A";
  const sig1    = values.party1Signature || p1name;
  const sig2    = values.party2Signature || p2name;

  doc.setFontSize(11);

  // ── Title ──
  boldUnderlinedCentre(doc, "CO MARKETING AGREEMENT", y, 13);
  y += lh * 2;

  // ── Header credential rows ──
  doc.setFontSize(11);
  fieldRow(doc, "Date:  ", eDate, L, y);   y += lh;
  fieldRow(doc, "To:  ", p2name, L, y);    y += lh;
  fieldRow(doc, "Address:  ", p2addr, L, y); y += lh * 1.6;

  // ── Subject (bold) ──
  doc.setFont("helvetica", "bold");
  doc.text("Subject: Co Marketing Agreement – ", L, y);
  let sx = L + doc.getTextWidth("Subject: Co Marketing Agreement – ");
  doc.text(p1name, sx, y);
  doc.line(sx, y + 0.7, sx + doc.getTextWidth(p1name), y + 0.7);
  sx += doc.getTextWidth(p1name);
  doc.text(" & ", sx, y);
  sx += doc.getTextWidth(" & ");
  doc.text(p2name, sx, y);
  doc.line(sx, y + 0.7, sx + doc.getTextWidth(p2name), y + 0.7);
  y += lh * 1.6;

  // ── Salutation ──
  doc.setFont("helvetica", "normal");
  doc.text("Dear Sir or Madam:", L, y);
  y += lh;

  // ── Para 1: opening with underlined party name ──
  let cx = inlineVal(doc, "I am writing to formally confirm the Co Marketing Agreement with ", p2name, L, y);
  doc.text(", effective ", cx, y);
  cx += doc.getTextWidth(", effective ");
  cx = inlineVal(doc, "", eDate, cx, y);
  doc.text(".", cx, y);
  y += lh;

  // ── Para 2: description (each line underlined) ──
  const descText = values.description || "The parties agree to provide services as described in the terms of this agreement.";
  const descLines: string[] = doc.splitTextToSize(descText, 160);
  descLines.forEach((line: string) => {
    doc.text(line, L, y);
    doc.line(L, y + 0.7, L + doc.getTextWidth(line), y + 0.7);
    y += lh;
  });
  y += lh * 0.3;

  // ── Para 3: terms — each credential value underlined inline ──
  doc.text("This agreement is governed by the laws of ", L, y);
  cx = L + doc.getTextWidth("This agreement is governed by the laws of ");
  cx = inlineVal(doc, "", juris, cx, y);
  doc.text(".", cx, y);
  y += lh;

  cx = inlineVal(doc, "Duration: ", dur, L, y);
  doc.text("  |  Termination Notice: ", cx, y);
  cx += doc.getTextWidth("  |  Termination Notice: ");
  cx = inlineVal(doc, "", notice, cx, y);
  doc.text(".", cx, y);
  y += lh;

  cx = inlineVal(doc, "Confidentiality: ", confid, L, y);
  doc.text("  |  Dispute Resolution: ", cx, y);
  cx += doc.getTextWidth("  |  Dispute Resolution: ");
  inlineVal(doc, "", dispute, cx, y);
  y += lh;
  y += lh * 0.3;

  // ── Para 4: financial (if any) ──
  if (values.paymentAmount) {
    cx = inlineVal(doc, "Payment of ", values.paymentAmount, L, y);
    doc.text(" on a ", cx, y);
    cx += doc.getTextWidth(" on a ");
    cx = inlineVal(doc, "", values.paymentSchedule || "N/A", cx, y);
    doc.text(" schedule.", cx, y);
    y += lh;
    y += lh * 0.3;
  }

  // ── Para 5: additional terms (if any, each line underlined) ──
  if (values.additionalTerms) {
    const addLines: string[] = doc.splitTextToSize(values.additionalTerms, 160);
    addLines.forEach((line: string) => {
      doc.text(line, L, y);
      doc.line(L, y + 0.7, L + doc.getTextWidth(line), y + 0.7);
      y += lh;
    });
    y += lh * 0.3;
  }

  // ── Para 6: closing ──
  const closeText = "Please contact us should you require any additional information to process this agreement. We appreciate your prompt attention to this matter and look forward to written confirmation of the terms herein.";
  const closeLines: string[] = doc.splitTextToSize(closeText, 160);
  doc.text(closeLines, L, y);
  y += closeLines.length * lh + lh * 0.5;

  doc.text("Thank you for your cooperation.", L, y);
  y += lh * 1.8;

  doc.text("Sincerely,", L, y);
  y += lh * 2.8;

  // ── Signature block – name bold+underlined ──
  doc.setFont("helvetica", "bold");
  doc.text(sig1, L, y);
  doc.line(L, y + 0.9, L + doc.getTextWidth(sig1), y + 0.9);
  y += lh;

  doc.setFont("helvetica", "normal");
  fieldRow(doc, "", p1addr, L, y); y += lh;
  fieldRow(doc, "Email: ", values.party1Email || "", L, y); y += lh;
  fieldRow(doc, "Phone: ", values.party1Phone || "", L, y); y += lh * 1.5;

  // Second party signature
  doc.setFont("helvetica", "bold");
  doc.text(sig2, L, y);
  doc.line(L, y + 0.9, L + doc.getTextWidth(sig2), y + 0.9);
  y += lh;

  doc.setFont("helvetica", "normal");
  fieldRow(doc, "", p2addr, L, y); y += lh;
  fieldRow(doc, "Email: ", values.party2Email || "", L, y); y += lh;
  fieldRow(doc, "Phone: ", values.party2Phone || "", L, y); y += lh;

  if (values.witnessName) {
    y += lh * 0.5;
    fieldRow(doc, "Witness: ", values.witnessName, L, y);
  }

  doc.save("co_marketing_agreement.pdf");
};

export default function CoMarketingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Co Marketing Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="comarketingagreement"
    />
  );
}