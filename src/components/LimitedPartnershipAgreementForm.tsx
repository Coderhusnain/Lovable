import { FormWizard, FieldDef } from "./FormWizard";
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
        getOptions: (values: Record<string, any>) => {
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
        type: "phone",
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
        type: "phone",
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
];

// --- Helper: check & add new page if needed ---
function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - 20) {
    doc.addPage();
    return 20;
  }
  return y;
}

// --- Helper: bold label + normal underlined value on one line ---
function drawLabelValue(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  pageWidth: number
): number {
  const maxLineWidth = pageWidth - x * 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, x, y);
  const labelWidth = doc.getTextWidth(label);
  const valueX = x + labelWidth + 2;
  const valueMaxWidth = maxLineWidth - labelWidth - 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const valueLines = doc.splitTextToSize(value || "N/A", valueMaxWidth);
  const firstLine = valueLines[0] || "";
  doc.text(firstLine, valueX, y);
  const valueWidth = doc.getTextWidth(firstLine);
  doc.setLineWidth(0.3);
  doc.line(valueX, y + 1.2, valueX + Math.max(valueWidth, 40), y + 1.2);
  return y + 6;
}

// --- Helper: bold section heading with full-width underline ---
function drawSectionHeading(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  pageWidth: number
): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(text, x, y);
  doc.setLineWidth(0.3);
  doc.line(x, y + 1.5, pageWidth - x, y + 1.5);
  return y + 7;
}

// --- Helper: normal body paragraph with word-wrap ---
function drawParagraph(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 5
): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight + 2;
}

// --- Helper: complete signature block ---
function drawSignatureBlock(
  doc: jsPDF,
  label: string,
  name: string,
  address: string,
  email: string,
  phone: string,
  signature: string,
  x: number,
  y: number
): number {
  y = checkPageBreak(doc, y, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, x, y);
  y += 6;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  const sigText = signature || "____________________";
  doc.text(sigText, x, y);
  const sigWidth = doc.getTextWidth(sigText);
  doc.setLineWidth(0.3);
  doc.line(x, y + 1.5, x + Math.max(sigWidth, 60), y + 1.5);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Name:", x, y);
  doc.setFont("helvetica", "normal");
  doc.text(name || "N/A", x + doc.getTextWidth("Name:  "), y);
  y += 5;

  if (address) {
    doc.setFont("helvetica", "bold");
    doc.text("Address:", x, y);
    doc.setFont("helvetica", "normal");
    doc.text(address, x + doc.getTextWidth("Address:  "), y);
    y += 5;
  }
  if (email) {
    doc.setFont("helvetica", "bold");
    doc.text("Email:", x, y);
    doc.setFont("helvetica", "normal");
    doc.text(email, x + doc.getTextWidth("Email:  "), y);
    y += 5;
  }
  if (phone) {
    doc.setFont("helvetica", "bold");
    doc.text("Phone:", x, y);
    doc.setFont("helvetica", "normal");
    doc.text(phone, x + doc.getTextWidth("Phone:  "), y);
    y += 5;
  }
  y += 5;
  return y;
}

// --- Main PDF generator ---
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const durationMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "an indefinite/ongoing term", "custom": "a custom term",
  };
  const terminationMap: Record<string, string> = {
    "immediate": "immediately", "7days": "7 days", "14days": "14 days",
    "30days": "30 days", "60days": "60 days", "90days": "90 days",
  };
  const scheduleMap: Record<string, string> = {
    "onetime": "One-time", "weekly": "Weekly", "biweekly": "Bi-weekly",
    "monthly": "Monthly", "quarterly": "Quarterly", "annually": "Annually",
    "milestone": "Milestone-based",
  };
  const disputeMap: Record<string, string> = {
    "mediation": "Mediation", "arbitration": "Binding Arbitration",
    "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation",
  };

  const durationLabel    = durationMap[values.duration]             || values.duration            || "the agreed duration";
  const terminationLabel = terminationMap[values.terminationNotice] || values.terminationNotice   || "the agreed notice period";
  const scheduleLabel    = scheduleMap[values.paymentSchedule]      || values.paymentSchedule     || "agreed";
  const disputeLabel     = disputeMap[values.disputeResolution]     || values.disputeResolution   || "the agreed method";

  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const jurisdiction  = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");
  const hasAdditionalTerms = Boolean(values.additionalTerms?.trim());

  // ── TITLE FIRST (at the very top) ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "LIMITED PARTNERSHIP AGREEMENT";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.6);
  doc.line(titleX, y + 1.8, titleX + titleWidth, y + 1.8);
  y += 12;

  // ── HEADER FIELDS (Date / To / Address / Contact) ──
  y = drawLabelValue(doc, "Date:",    values.effectiveDate || "N/A", margin, y, pageWidth); y += 1;
  y = drawLabelValue(doc, "To:",      values.party2Name    || "N/A", margin, y, pageWidth); y += 1;
  y = drawLabelValue(doc, "Address:", party2Address        || "N/A", margin, y, pageWidth); y += 1;
  if (values.party2Email) { y = drawLabelValue(doc, "Email:", values.party2Email, margin, y, pageWidth); y += 1; }
  if (values.party2Phone) { y = drawLabelValue(doc, "Phone:", values.party2Phone, margin, y, pageWidth); y += 1; }
  y += 4;

  // ── SUBJECT ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Re: Limited Partnership Agreement", margin, y);
  y += 8;

  // ── SALUTATION ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Dear ${values.party2Name || "Sir or Madam"},`, margin, y);
  y += 7;

  // ── INTRO PARAGRAPH ──
  y = drawParagraph(doc,
    `This Limited Partnership Agreement ("Agreement") is entered into as of ${values.effectiveDate || "[Date]"}, by and between ${values.party1Name || "[General Partner]"} (${values.party1Type === "business" ? "a business entity" : "an individual"}), as the General Partner, and ${values.party2Name || "[Limited Partner]"} (${values.party2Type === "business" ? "a business entity" : "an individual"}), as the Limited Partner, collectively referred to as the "Partners." This Agreement is governed by the laws of ${jurisdiction || "[Jurisdiction]"}.`,
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 1: PURPOSE ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "1. PURPOSE OF THE LIMITED PARTNERSHIP", margin, y, pageWidth);
  y = drawParagraph(doc,
    values.description || "The Partners agree to form a Limited Partnership for the purpose of conducting business for mutual benefit as described herein. The General Partner shall manage the day-to-day operations while the Limited Partner contributes capital without active management involvement.",
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 2: ROLES & RESPONSIBILITIES ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "2. ROLES AND RESPONSIBILITIES", margin, y, pageWidth);
  y = drawParagraph(doc,
    `${values.party1Name || "The General Partner"} shall serve as the General Partner and shall be solely responsible for the management, operation, and decision-making of the partnership. ${values.party2Name || "The Limited Partner"} shall serve as the Limited Partner and shall have limited liability, not exceeding their capital contribution, and shall not participate in the active management of the partnership.`,
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 3: TERM ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "3. TERM", margin, y, pageWidth);
  y = drawParagraph(doc,
    `This Agreement shall commence on ${values.effectiveDate || "[Effective Date]"} and shall continue for ${durationLabel}, unless earlier terminated. Either Partner may terminate this Agreement upon providing ${terminationLabel} written notice to the other party.`,
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 4: FINANCIAL TERMS ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "4. FINANCIAL TERMS", margin, y, pageWidth);
  y = drawParagraph(doc,
    values.paymentAmount
      ? `The agreed capital contribution or payment amount is ${values.paymentAmount}, payable on a ${scheduleLabel} schedule. All financial obligations and profit/loss distributions shall be fulfilled in accordance with the terms of this Agreement.`
      : "The financial terms, capital contributions, and profit/loss distribution ratios between the Partners shall be as mutually agreed upon and documented separately or as amended to this Agreement.",
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 5: CONFIDENTIALITY ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "5. CONFIDENTIALITY", margin, y, pageWidth);
  y = drawParagraph(doc,
    values.confidentiality === "yes"
      ? "Each Partner agrees to keep confidential all proprietary, sensitive, or non-public information shared in the course of this Limited Partnership. Neither Partner shall disclose such information to any third party without prior written consent of the other, during the term of this Agreement and for a period of two (2) years thereafter."
      : "No specific confidentiality provisions apply to this Agreement unless otherwise agreed in writing by both Partners.",
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 6: DISPUTE RESOLUTION ──
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, "6. DISPUTE RESOLUTION", margin, y, pageWidth);
  y = drawParagraph(doc,
    `Any dispute, controversy, or claim arising out of or in connection with this Agreement shall be resolved by ${disputeLabel}. The Partners agree to act in good faith to resolve all disputes promptly and amicably.`,
    margin, y, contentWidth);
  y += 2;

  // ── SECTION 7: ADDITIONAL TERMS (conditional) ──
  if (hasAdditionalTerms) {
    y = checkPageBreak(doc, y, 25);
    y = drawSectionHeading(doc, "7. ADDITIONAL TERMS", margin, y, pageWidth);
    y = drawParagraph(doc, values.additionalTerms, margin, y, contentWidth);
    y += 2;
  }

  // ── SECTION 7/8: GENERAL PROVISIONS ──
  const generalSectionNum = hasAdditionalTerms ? "8" : "7";
  y = checkPageBreak(doc, y, 25);
  y = drawSectionHeading(doc, `${generalSectionNum}. GENERAL PROVISIONS`, margin, y, pageWidth);
  y = drawParagraph(doc,
    "This Agreement constitutes the entire agreement between the Partners with respect to the subject matter hereof and supersedes all prior agreements, understandings, negotiations, and discussions. This Agreement may not be amended except in writing signed by both Partners. If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
    margin, y, contentWidth);
  y += 6;

  // ── CLOSING ──
  y = checkPageBreak(doc, y, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("IN WITNESS WHEREOF, the Partners have executed this Agreement as of the date first written above.", margin, y);
  y += 10;

  // ── SENDER BLOCK (General Partner info) ──
  y = checkPageBreak(doc, y, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  // Underlined name like reference image
  const senderName = values.party1Name || "General Partner";
  doc.text(senderName, margin, y);
  const senderNameWidth = doc.getTextWidth(senderName);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + senderNameWidth, y + 1.2);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  if (party1Address)      { doc.text(party1Address,       margin, y); y += 5; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += 5; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += 5; }
  y += 4;

  // ── SIGNATURES ──
  y = drawSignatureBlock(doc, "General Partner:", values.party1Name || "", party1Address, values.party1Email || "", values.party1Phone || "", values.party1Signature || "", margin, y);
  y = drawSignatureBlock(doc, "Limited Partner:", values.party2Name || "", party2Address, values.party2Email || "", values.party2Phone || "", values.party2Signature || "", margin, y);

  // ── WITNESS ──
  if (values.witnessName) {
    y = checkPageBreak(doc, y, 24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Witness:", margin, y);
    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.text("________________________", margin, y);
    doc.setLineWidth(0.3);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Name:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(values.witnessName, margin + doc.getTextWidth("Name:  "), y);
  }

  doc.save("limited_partnership_agreement.pdf");
};

export default function LimitedPartnershipAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Limited Partnership Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="limitedpartnershipagreement"
    />
  );
}