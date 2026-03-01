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
    label: "Health Care Center",
    fields: [
      {
        name: "healthCareCenterName",
        label: "Health Care Center Name",
        type: "text",
        required: true,
        placeholder: "Enter health care center name",
      },
      {
        name: "healthCareCenterStreet",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "healthCareCenterCity",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "healthCareCenterZip",
        label: "ZIP Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Physician Information",
    fields: [
      {
        name: "physicianName",
        label: "Physician Full Name",
        type: "text",
        required: true,
        placeholder: "Enter physician's full name",
      },
      {
        name: "licenseState",
        label: "Medical License State",
        type: "text",
        required: true,
        placeholder: "State where physician is licensed",
      },
      {
        name: "physicianStreet",
        label: "Physician Street Address",
        type: "text",
        required: false,
        placeholder: "123 Main Street",
      },
      {
        name: "physicianCity",
        label: "City",
        type: "text",
        required: false,
        placeholder: "City",
      },
      {
        name: "physicianZip",
        label: "ZIP Code",
        type: "text",
        required: false,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Agreement Terms",
    fields: [
      {
        name: "terminationNoticeDays",
        label: "Termination Notice Period",
        type: "select",
        required: true,
        options: [
          { value: "15", label: "15 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
          { value: "90", label: "90 Days" },
        ],
      },
      {
        name: "paymentDay",
        label: "Monthly Payment Day",
        type: "select",
        required: true,
        options: [
          { value: "1st", label: "1st of Month" },
          { value: "15th", label: "15th of Month" },
          { value: "last", label: "Last Day of Month" },
        ],
      },
      {
        name: "governingLawState",
        label: "Governing Law State",
        type: "text",
        required: true,
        placeholder: "State whose laws govern this agreement",
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
        name: "centerSignature",
        label: "Health Care Center Authorized Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type authorized representative's full name",
      },
      {
        name: "physicianSignature",
        label: "Physician Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type physician's full legal name",
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

// ─────────────────────────────────────────────────────────────────────────────
// PDF HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Write text and draw a thin underline beneath it */
const ulText = (doc: jsPDF, text: string, x: number, y: number) => {
  doc.text(text, x, y);
  const w = doc.getTextWidth(text);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.25);
  doc.line(x, y + 1.1, x + w, y + 1.1);
};

/** Write plain label then an underlined value on the same line */
const labelUl = (doc: jsPDF, label: string, value: string, x: number, y: number) => {
  doc.setFont("helvetica", "normal");
  doc.text(label, x, y);
  ulText(doc, value, x + doc.getTextWidth(label), y);
};

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PW       = 210;
  const M        = 20;
  const TW       = PW - M * 2;
  const FS       = 10.5;
  const LH       = 5.8;
  const SAFE_BOT = 270;
  let y = 22;

  const checkPage = (needed = 12) => {
    if (y + needed > SAFE_BOT) { doc.addPage(); y = 22; }
  };

  // ── TITLE ────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  const TITLE = "PHYSICIAN SERVICES AGREEMENT";
  doc.text(TITLE, PW / 2, y, { align: "center" });
  const tw = doc.getTextWidth(TITLE);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  doc.line(PW / 2 - tw / 2, y + 1.5, PW / 2 + tw / 2, y + 1.5);
  y += 12;

  // ── DATE / JURISDICTION ──────────────────────────────────────────────────
  doc.setFontSize(FS);
  doc.setTextColor(0, 0, 0);
  labelUl(doc, "Date:  ", values.effectiveDate || "N/A", M, y);
  y += LH + 1;
  labelUl(doc, "Jurisdiction:  ", `${values.state || ""}, ${values.country?.toUpperCase() || ""}`, M, y);
  y += LH + 6;

  // ── PARTIES ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FS);
  doc.text("PARTIES", M, y);
  y += LH + 1;

  doc.setFont("helvetica", "normal");
  labelUl(doc, "Health Care Center:  ", values.healthCareCenterName || "N/A", M, y); y += LH;
  labelUl(doc, "Address:  ", `${values.healthCareCenterStreet || ""}, ${values.healthCareCenterCity || ""} ${values.healthCareCenterZip || ""}`, M, y); y += LH;
  y += 4;

  labelUl(doc, "Physician:  ", values.physicianName || "N/A", M, y); y += LH;
  labelUl(doc, "License State:  ", values.licenseState || "N/A", M, y); y += LH;
  if (values.physicianStreet) {
    labelUl(doc, "Address:  ", `${values.physicianStreet || ""}, ${values.physicianCity || ""} ${values.physicianZip || ""}`, M, y); y += LH;
  }
  y += 6;

  // ── AGREEMENT TERMS ──────────────────────────────────────────────────────
  checkPage(30);
  doc.setFont("helvetica", "bold");
  doc.text("AGREEMENT TERMS", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  labelUl(doc, "Termination Notice:  ", `${values.terminationNoticeDays || "30"} Days`, M, y); y += LH;
  labelUl(doc, "Payment Day:  ", values.paymentDay || "15th", M, y); y += LH;
  labelUl(doc, "Governing Law:  ", values.governingLawState || "N/A", M, y); y += LH + 6;

  // ── KEY PROVISIONS ───────────────────────────────────────────────────────
  checkPage(20);
  doc.setFont("helvetica", "bold");
  doc.text("KEY PROVISIONS", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  const provisions = [
    "Independent Contractor: Physician is an independent contractor, not an employee.",
    "Scope: Physician provides in-person consultations, evaluations, treatment, and prescriptions.",
    "Licensure: Physician warrants active, unrestricted medical license throughout this Agreement.",
    "Compliance: All services comply with federal, state, and local laws including HIPAA.",
    "Records: All patient records remain the exclusive property of the Health Care Center.",
    "Confidentiality: Physician maintains strict PHI confidentiality per HIPAA and applicable law.",
    "Non-Solicitation: For 1 year post-termination, Physician shall not solicit patients or staff.",
  ];
  for (const p of provisions) {
    checkPage(10);
    const lines = doc.splitTextToSize(`• ${p}`, TW);
    doc.text(lines, M, y);
    y += lines.length * LH;
  }
  y += 4;

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────────
  if (values.additionalTerms) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("ADDITIONAL TERMS", M, y); y += LH + 1;
    doc.setFont("helvetica", "normal");
    const addLines = doc.splitTextToSize(values.additionalTerms, TW);
    doc.text(addLines, M, y);
    y += addLines.length * LH + 6;
  }

  // ── SIGNATURES ───────────────────────────────────────────────────────────
  checkPage(45);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", M, y); y += LH + 3;
  doc.setFont("helvetica", "normal");

  const C2 = 110;
  doc.text("_______________________________", M, y);
  doc.text("_______________________________", C2, y);
  y += LH;

  ulText(doc, values.healthCareCenterName || "Health Care Center", M, y);
  ulText(doc, values.physicianName || "Physician", C2, y);
  y += LH;

  labelUl(doc, "Signature:  ", values.centerSignature || "", M, y);
  labelUl(doc, "Signature:  ", values.physicianSignature || "", C2, y);
  y += LH;

  doc.text("Date: " + new Date().toLocaleDateString(), M, y);
  doc.text("Date: " + new Date().toLocaleDateString(), C2, y);

  if (values.witnessName) {
    y += LH + 6;
    doc.text("Witness: _______________________________", M, y); y += LH;
    labelUl(doc, "Name:  ", values.witnessName, M, y);
  }

  // ── FOOTER ───────────────────────────────────────────────────────────────
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated  •  ${new Date().toLocaleDateString()}`, PW / 2, 288, { align: "center" });

  doc.save("physician_services_agreement.pdf");
};

export default function PhysicianServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Physician Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="physicianservicesagreement"
    />
  );
}