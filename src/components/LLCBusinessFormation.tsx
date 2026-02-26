// LLCBusinessFormationForm.tsx
import React from "react";
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
        getOptions: (value: string) => {
          if (value === "us") {
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
          } else if (value === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (value === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (value === "au") {
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
      { name: "effectiveDate", label: "What is the effective date of this document?", type: "date", required: true },
    ],
  },
  {
    label: "First Party Info",
    fields: [
      { name: "party1Name", label: "Full Legal Name", type: "text", required: true },
      { name: "party1Type", label: "Individual or Business", type: "select", required: true, options: [
        { value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }
      ]},
      { name: "party1Street", label: "Street Address", type: "text", required: true },
      { name: "party1City", label: "City", type: "text", required: true },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true },
      { name: "party1Email", label: "Email", type: "email", required: true },
      { name: "party1Phone", label: "Phone (Optional)", type: "text", required: false },
    ],
  },
  {
    label: "Second Party Info",
    fields: [
      { name: "party2Name", label: "Full Legal Name", type: "text", required: true },
      { name: "party2Type", label: "Individual or Business", type: "select", required: true, options: [
        { value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }
      ]},
      { name: "party2Street", label: "Street Address", type: "text", required: true },
      { name: "party2City", label: "City", type: "text", required: true },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true },
      { name: "party2Email", label: "Email", type: "email", required: true },
      { name: "party2Phone", label: "Phone (Optional)", type: "text", required: false },
    ],
  },
  {
    label: "Business Purpose",
    fields: [
      { name: "description", label: "Describe the business purpose", type: "textarea", required: true },
    ],
  },
  {
    label: "Terms & Duration",
    fields: [
      { name: "duration", label: "Duration", type: "select", required: true, options: [
        { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" },
        { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" },
      ]},
      { name: "terminationNotice", label: "Termination Notice", type: "select", required: true, options: [
        { value: "immediate", label: "Immediate" }, { value: "30days", label: "30 Days" },
        { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" },
      ]},
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "Payment Amount (Optional)", type: "text", required: false },
      { name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false, options: [
        { value: "onetime", label: "One-time" }, { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" },
      ]},
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      { name: "confidentiality", label: "Include Confidentiality Clause?", type: "select", required: true, options: [
        { value: "yes", label: "Yes" }, { value: "no", label: "No" }
      ]},
      { name: "disputeResolution", label: "Dispute Resolution Method", type: "select", required: true, options: [
        { value: "mediation", label: "Mediation" },
        { value: "arbitration", label: "Binding Arbitration" },
        { value: "litigation", label: "Court Litigation" }
      ]},
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any Additional Terms?", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "party1Signature", label: "First Party Signature", type: "text", required: true },
      { name: "party2Signature", label: "Second Party Signature", type: "text", required: true },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const textWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) { doc.addPage(); y = margin; }
  };

  const addUnderlinedField = (label: string, value: string, minWidth = 60) => {
    checkPageBreak();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(label, margin, y);
    const startX = margin + doc.getTextWidth(label) + 2;
    const display = value || "";
    if (display) doc.text(display, startX, y);
    doc.line(startX, y + 1, startX + (display ? doc.getTextWidth(display) : minWidth), y + 1);
    y += 8;
  };

  const addParagraph = (text: string, bold = false) => {
    checkPageBreak(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  };

  const addParagraphWithUnderline = (before: string, value: string, after: string) => {
    const lines = doc.splitTextToSize(`${before}${value}${after}`, textWidth);
    lines.forEach((line: string) => {
      checkPageBreak(8);
      doc.text(line, margin, y);
      if (line.includes(value)) {
        const startX = margin + doc.getTextWidth(line.substring(0, line.indexOf(value)));
        doc.line(startX, y + 1, startX + doc.getTextWidth(value), y + 1);
      }
      y += 6;
    });
    y += 2;
  };

  // TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "LLC BUSINESS FORMATION AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleX = pageWidth / 2 - doc.getTextWidth(title) / 2;
  doc.line(titleX, y + 2, titleX + doc.getTextWidth(title), y + 2);
  y += 15;

  // DATE & JURISDICTION
  addUnderlinedField("Date:", values.effectiveDate || "", 50);
  addUnderlinedField("Jurisdiction:", values.state ? `${values.state}, ${values.country?.toUpperCase()}` : (values.country || ""), 80);
  y += 4;

  // FIRST PARTY
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("FIRST PARTY", margin, y); y += 8;
  addUnderlinedField("Name:", values.party1Name || "", 100);
  addUnderlinedField("Type:", values.party1Type || "", 60);
  addUnderlinedField("Address:", `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`.trim(), 120);
  addUnderlinedField("Email:", values.party1Email || "", 100);
  if (values.party1Phone) addUnderlinedField("Phone:", values.party1Phone, 80);
  y += 4;

  // SECOND PARTY
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("SECOND PARTY", margin, y); y += 8;
  addUnderlinedField("Name:", values.party2Name || "", 100);
  addUnderlinedField("Type:", values.party2Type || "", 60);
  addUnderlinedField("Address:", `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim(), 120);
  addUnderlinedField("Email:", values.party2Email || "", 100);
  if (values.party2Phone) addUnderlinedField("Phone:", values.party2Phone, 80);
  y += 6;

  // SUBJECT
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("Subject: LLC Business Formation Agreement", margin, y); y += 10;

  // BODY
  addParagraph("To Whom It May Concern:");
  addParagraphWithUnderline("This LLC Business Formation Agreement is entered into as of ", values.effectiveDate || "________________", `, by and between ${values.party1Name || "the first party"} and ${values.party2Name || "the second party"} (collectively referred to as the "Parties").`);
  if (values.description) { addParagraph("PURPOSE AND SCOPE:", true); addParagraph(values.description); }
  addParagraph("TERMS AND CONDITIONS:", true);
  addParagraphWithUnderline("The duration of this agreement shall be ", values.duration || "________________", `. Either party may terminate this agreement upon ${values.terminationNotice || "________________"} written notice to the other party.`);
  if (values.paymentAmount || values.paymentSchedule) {
    addParagraph("FINANCIAL TERMS:", true);
    addParagraph([values.paymentAmount ? `Payment Amount: ${values.paymentAmount}` : "", values.paymentSchedule ? `Payment Schedule: ${values.paymentSchedule}` : ""].filter(Boolean).join(" | "));
  }
  addParagraph("LEGAL PROVISIONS:", true);
  if (values.confidentiality === "yes") {
    addParagraph("CONFIDENTIALITY: Both parties agree to maintain the confidentiality of all proprietary information, trade secrets, and sensitive business data disclosed during the course of this agreement. This obligation shall survive the termination of this agreement.");
  }
  addParagraphWithUnderline("DISPUTE RESOLUTION: Any disputes arising under or in connection with this agreement shall be resolved through ", values.disputeResolution || "________________", " in accordance with applicable law.");
  addParagraph("GOVERNING LAW: This agreement shall be governed by and construed in accordance with the laws of the jurisdiction stated herein, without regard to its conflict of law provisions.");
  addParagraph("ENTIRE AGREEMENT: This document constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, and understandings with respect to the subject matter hereof.");
  if (values.additionalTerms) { addParagraph("ADDITIONAL TERMS:", true); addParagraph(values.additionalTerms); }
  y += 6;
  addParagraph("IN WITNESS WHEREOF, the parties have executed this LLC Business Formation Agreement as of the date first written above.");
  y += 10;

  // SIGNATURES
  checkPageBreak(50);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("First Party Signature:", margin, y); y += 8;
  const sig1 = values.party1Signature || "";
  doc.text(sig1, margin, y);
  doc.line(margin, y + 1, margin + (sig1 ? doc.getTextWidth(sig1) : 80), y + 1);
  y += 8;
  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`);
  addParagraph(`Email: ${values.party1Email || ""}`);
  if (values.party1Phone) addParagraph(`Phone: ${values.party1Phone}`);
  y += 8;

  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("Second Party Signature:", margin, y); y += 8;
  const sig2 = values.party2Signature || "";
  doc.text(sig2, margin, y);
  doc.line(margin, y + 1, margin + (sig2 ? doc.getTextWidth(sig2) : 80), y + 1);
  y += 8;
  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`);
  addParagraph(`Email: ${values.party2Email || ""}`);
  if (values.party2Phone) addParagraph(`Phone: ${values.party2Phone}`);

  if (values.witnessName) {
    y += 8;
    doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text("Witness:", margin, y); y += 8;
    doc.text(values.witnessName, margin, y);
    doc.line(margin, y + 1, margin + doc.getTextWidth(values.witnessName), y + 1);
    y += 8;
  }

  doc.save("llc_business_formation.pdf");
};

export default function LLCBusinessFormationForm() {
  return (
    <FormWizard
      steps={steps}
      title="LLC Business Formation Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="llcbusinessformation"
    />
  );
}
