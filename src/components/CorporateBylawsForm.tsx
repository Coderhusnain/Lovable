// CorporateBylawsForm.tsx
import React from "react";
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";
 
// ==================== STEPS ====================
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
        getOptions: (value: string) => {
          switch (value) {
            case "us":
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
            case "ca":
              return [
                { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
                { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
                { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
                { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
                { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
                { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
                { value: "YT", label: "Yukon" },
              ];
            case "uk":
              return [
                { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
                { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
              ];
            case "au":
              return [
                { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
                { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
                { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
                { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
              ];
            default:
              return [{ value: "other", label: "Other Region" }];
          }
        },
      },
    ],
  },
  // ==== Agreement Date ====
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
  // ==== Party 1 ====
  {
    label: "First Party Name",
    fields: [
      { name: "party1Name", label: "Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      {
        name: "party1Type",
        label: "Individual or Business?",
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
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "text", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  // ==== Party 2 ====
  {
    label: "Second Party Name",
    fields: [
      { name: "party2Name", label: "Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      {
        name: "party2Type",
        label: "Individual or Business?",
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
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "text", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  // ==== Agreement Details ====
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
          { value: "1 Month", label: "1 Month" },
          { value: "3 Months", label: "3 Months" },
          { value: "6 Months", label: "6 Months" },
          { value: "1 Year", label: "1 Year" },
          { value: "2 Years", label: "2 Years" },
          { value: "5 Years", label: "5 Years" },
          { value: "Indefinite/Ongoing", label: "Indefinite/Ongoing" },
          { value: "Custom Duration", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "Immediate", label: "Immediate" },
          { value: "7 Days", label: "7 Days" },
          { value: "14 Days", label: "14 Days" },
          { value: "30 Days", label: "30 Days" },
          { value: "60 Days", label: "60 Days" },
          { value: "90 Days", label: "90 Days" },
        ],
      },
    ],
  },
  // ==== Financial Terms ====
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "What is the payment amount (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "One-time Payment", label: "One-time Payment" },
          { value: "Weekly", label: "Weekly" },
          { value: "Bi-weekly", label: "Bi-weekly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Quarterly", label: "Quarterly" },
          { value: "Annually", label: "Annually" },
          { value: "Milestone-based", label: "Milestone-based" },
        ],
      },
    ],
  },
  // ==== Legal Protections ====
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "Yes", label: "Yes - Include confidentiality provisions" },
          { value: "No", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "Mediation", label: "Mediation" },
          { value: "Binding Arbitration", label: "Binding Arbitration" },
          { value: "Court Litigation", label: "Court Litigation" },
          { value: "Good Faith Negotiation", label: "Good Faith Negotiation First" },
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
      { name: "party1Signature", label: "First Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Second Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;
 
// ==================== PDF GENERATOR ====================
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
 
  // ===== PAGE SETUP =====
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const textWidth = pageWidth - margin * 2;
  let y = 20;
 
  // ===== AUTO PAGE BREAK =====
  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };
 
  // ===== UNDERLINED FIELD (Date / To / Address) =====
  const addUnderlinedField = (label: string, value: string, minWidth = 60) => {
    checkPageBreak();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);
    const startX = margin + labelWidth + 2;
    const display = value || "";
    if (display) {
      doc.text(display, startX, y);
    }
    const width = display ? doc.getTextWidth(display) : minWidth;
    doc.line(startX, y + 1, startX + width, y + 1);
    y += 8;
  };
 
  // ===== PARAGRAPH (tight spacing) =====
  const addParagraph = (text: string, bold = false) => {
    checkPageBreak(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  };
 
  // ===== PARAGRAPH WITH UNDERLINED VALUE =====
  const addParagraphWithUnderline = (before: string, value: string, after: string) => {
    const fullText = `${before}${value}${after}`;
    const lines = doc.splitTextToSize(fullText, textWidth);
    lines.forEach((line: string) => {
      checkPageBreak(8);
      doc.text(line, margin, y);
      if (line.includes(value)) {
        const beforeText = line.substring(0, line.indexOf(value));
        const startX = margin + doc.getTextWidth(beforeText);
        const valueWidth = doc.getTextWidth(value);
        doc.line(startX, y + 1, startX + valueWidth, y + 1);
      }
      y += 6;
    });
    y += 2;
  };
 
  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "CORPORATE BYLAWS / AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  const titleX = pageWidth / 2 - titleWidth / 2;
  doc.line(titleX, y + 2, titleX + titleWidth, y + 2);
  y += 15;
 
  // ===== DATE / PARTIES / JURISDICTION =====
  addUnderlinedField("Date:", values.effectiveDate || "", 50);
  addUnderlinedField("Jurisdiction:", values.state ? `${values.state}, ${values.country?.toUpperCase()}` : (values.country || ""), 80);
 
  y += 4;
 
  // ===== PARTY 1 BLOCK =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("FIRST PARTY", margin, y);
  y += 8;
 
  addUnderlinedField("Name:", values.party1Name || "", 100);
  addUnderlinedField("Type:", values.party1Type || "", 60);
 
  const party1Address = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`.trim();
  addUnderlinedField("Address:", party1Address, 120);
  addUnderlinedField("Email:", values.party1Email || "", 100);
  if (values.party1Phone) {
    addUnderlinedField("Phone:", values.party1Phone, 80);
  }
 
  y += 4;
 
  // ===== PARTY 2 BLOCK =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SECOND PARTY", margin, y);
  y += 8;
 
  addUnderlinedField("Name:", values.party2Name || "", 100);
  addUnderlinedField("Type:", values.party2Type || "", 60);
 
  const party2Address = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim();
  addUnderlinedField("Address:", party2Address, 120);
  addUnderlinedField("Email:", values.party2Email || "", 100);
  if (values.party2Phone) {
    addUnderlinedField("Phone:", values.party2Phone, 80);
  }
 
  y += 6;
 
  // ===== SUBJECT =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Subject: Corporate Bylaws and Agreement", margin, y);
  y += 10;
 
  // ===== GREETING =====
  addParagraph("To Whom It May Concern:");
 
  // ===== BODY =====
  const party1 = values.party1Name || "the first party";
  const party2 = values.party2Name || "the second party";
 
  addParagraphWithUnderline(
    "This Corporate Bylaws / Agreement is entered into as of ",
    values.effectiveDate || "________________",
    `, by and between ${party1} and ${party2} (collectively referred to as the "Parties").`
  );
 
  if (values.description) {
    addParagraph("PURPOSE AND SCOPE:", true);
    addParagraph(values.description);
  }
 
  addParagraph("TERMS AND CONDITIONS:", true);
 
  addParagraphWithUnderline(
    "The duration of this agreement shall be ",
    values.duration || "________________",
    `. Either party may terminate this agreement upon ${values.terminationNotice || "________________"} written notice to the other party.`
  );
 
  if (values.paymentAmount || values.paymentSchedule) {
    addParagraph("FINANCIAL TERMS:", true);
    const paymentText = [
      values.paymentAmount ? `Payment Amount: ${values.paymentAmount}` : "",
      values.paymentSchedule ? `Payment Schedule: ${values.paymentSchedule}` : "",
    ].filter(Boolean).join(" | ");
    addParagraph(paymentText);
  }
 
  addParagraph("LEGAL PROVISIONS:", true);
 
  if (values.confidentiality === "Yes") {
    addParagraph(
      "CONFIDENTIALITY: Both parties agree to maintain the confidentiality of all proprietary information, trade secrets, and sensitive business data disclosed during the course of this agreement. This obligation shall survive the termination of this agreement."
    );
  }
 
  addParagraphWithUnderline(
    "DISPUTE RESOLUTION: Any disputes arising under or in connection with this agreement shall be resolved through ",
    values.disputeResolution || "________________",
    " in accordance with applicable law."
  );
 
  addParagraph(
    "GOVERNING LAW: This agreement shall be governed by and construed in accordance with the laws of the jurisdiction stated herein, without regard to its conflict of law provisions."
  );
 
  addParagraph(
    "ENTIRE AGREEMENT: This document constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, and understandings of the parties with respect to the subject matter hereof."
  );
 
  if (values.additionalTerms) {
    addParagraph("ADDITIONAL TERMS:", true);
    addParagraph(values.additionalTerms);
  }
 
  y += 6;
  addParagraph("IN WITNESS WHEREOF, the parties have executed this agreement as of the date first written above.");
 
  y += 10;
 
  // ===== SIGNATURES =====
  checkPageBreak(50);
 
  // Party 1 signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("First Party Signature:", margin, y);
  y += 8;
 
  const sig1 = values.party1Signature || "";
  doc.text(sig1, margin, y);
  if (sig1) {
    const sig1Width = doc.getTextWidth(sig1);
    doc.line(margin, y + 1, margin + sig1Width, y + 1);
  } else {
    doc.line(margin, y + 1, margin + 80, y + 1);
  }
  y += 8;
 
  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`);
  addParagraph(`Email: ${values.party1Email || ""}`);
  if (values.party1Phone) {
    addParagraph(`Phone: ${values.party1Phone}`);
  }
 
  y += 8;
 
  // Party 2 signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Second Party Signature:", margin, y);
  y += 8;
 
  const sig2 = values.party2Signature || "";
  doc.text(sig2, margin, y);
  if (sig2) {
    const sig2Width = doc.getTextWidth(sig2);
    doc.line(margin, y + 1, margin + sig2Width, y + 1);
  } else {
    doc.line(margin, y + 1, margin + 80, y + 1);
  }
  y += 8;
 
  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`);
  addParagraph(`Email: ${values.party2Email || ""}`);
  if (values.party2Phone) {
    addParagraph(`Phone: ${values.party2Phone}`);
  }
 
  // Witness (optional)
  if (values.witnessName) {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Witness:", margin, y);
    y += 8;
    doc.text(values.witnessName, margin, y);
    const witnessWidth = doc.getTextWidth(values.witnessName);
    doc.line(margin, y + 1, margin + witnessWidth, y + 1);
    y += 8;
  }
 
  // ===== SAVE =====
  doc.save("corporate_bylaws.pdf");
};
 
// ==================== COMPONENT ====================
export default function CorporateBylawsForm() {
  return (
    <FormWizard
      steps={steps}
      title="Corporate Bylaws Generator"
      subtitle="Fill all steps carefully to generate a professional PDF document."
      onGenerate={generatePDF}
      documentType="corporatebylaws"
    />
  );
}