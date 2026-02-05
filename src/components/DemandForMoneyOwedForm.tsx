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
        getOptions: (value) => {
            if (value=== "us") {
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

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("D J Services Agreement", 105, y, { align: "center" });
  y += 15;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Effective Date: " + (values.effectiveDate || "N/A"), 20, y);
  doc.text("Jurisdiction: " + (values.state || "") + ", " + (values.country?.toUpperCase() || ""), 120, y);
  y += 15;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PARTIES", 20, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("First Party: " + (values.party1Name || "N/A"), 20, y);
  y += 6;
  doc.text("Address: " + (values.party1Street || "") + ", " + (values.party1City || "") + " " + (values.party1Zip || ""), 20, y);
  y += 6;
  doc.text("Contact: " + (values.party1Email || "") + " | " + (values.party1Phone || ""), 20, y);
  y += 10;
  
  doc.text("Second Party: " + (values.party2Name || "N/A"), 20, y);
  y += 6;
  doc.text("Address: " + (values.party2Street || "") + ", " + (values.party2City || "") + " " + (values.party2Zip || ""), 20, y);
  y += 6;
  doc.text("Contact: " + (values.party2Email || "") + " | " + (values.party2Phone || ""), 20, y);
  y += 15;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("AGREEMENT DETAILS", 20, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const DEFAULT_AGREEMENT_TEXT = `
A Demand for Money Owed Agreement (commonly called a Demand Letter)
is a formal written document used to request repayment of money that
is owed to you. It provides the debtor with official notice that
payment is due and establishes a deadline before further legal
action is considered.
`.trim();
  const fullDescription = values.description
  ? `${DEFAULT_AGREEMENT_TEXT}\n\n${values.description}`
  : DEFAULT_AGREEMENT_TEXT;

const descLines = doc.splitTextToSize(fullDescription, 170);
doc.text(descLines, 20, y);
y += descLines.length * 5 + 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TERMS", 20, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Duration: " + (values.duration || "N/A"), 20, y);
  y += 6;
  doc.text("Termination Notice: " + (values.terminationNotice || "N/A"), 20, y);
  y += 6;
  doc.text("Confidentiality: " + (values.confidentiality === "yes" ? "Included" : "Not Included"), 20, y);
  y += 6;
  doc.text("Dispute Resolution: " + (values.disputeResolution || "N/A"), 20, y);
  y += 15;
  
  if (values.paymentAmount) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("FINANCIAL TERMS", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Payment: " + values.paymentAmount, 20, y);
    y += 6;
    doc.text("Schedule: " + (values.paymentSchedule || "N/A"), 20, y);
    y += 15;
  }
  
  if (values.additionalTerms) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("ADDITIONAL TERMS", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const addLines = doc.splitTextToSize(values.additionalTerms, 170);
    doc.text(addLines, 20, y);
    y += addLines.length * 5 + 15;
  }
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", 20, y);
  y += 12;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("_______________________________", 20, y);
  doc.text("_______________________________", 110, y);
  y += 6;
  doc.text(values.party1Name || "First Party", 20, y);
  doc.text(values.party2Name || "Second Party", 110, y);
  y += 6;
  doc.text("Signature: " + (values.party1Signature || ""), 20, y);
  doc.text("Signature: " + (values.party2Signature || ""), 110, y);
  y += 10;
  doc.text("Date: " + new Date().toLocaleDateString(), 20, y);
  doc.text("Date: " + new Date().toLocaleDateString(), 110, y);
  
  if (values.witnessName) {
    y += 15;
    doc.text("Witness: _______________________________", 20, y);
    y += 6;
    doc.text("Name: " + values.witnessName, 20, y);
  }
  
  doc.save("Demand_for_owed_money.pdf");
};

export default function DemandForMoneyOwedForm() {
  return (
    <FormWizard
      steps={steps}
      title="Demand fro owed money"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="demandforowedmoney"
    />
  );
}
