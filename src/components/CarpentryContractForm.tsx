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
    label: "Carpenter Details",
    fields: [
      {
        name: "party2Name",
        label: "Carpenter's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Carpenter an individual or a business?",
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
    label: "Carpenter Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Carpenter Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Services & Work Details",
    fields: [
      {
        name: "serviceStartDate",
        label: "Services commencement date",
        type: "date",
        required: true,
      },
      {
        name: "contractEndDate",
        label: "Contract end date",
        type: "date",
        required: true,
      },
      {
        name: "description",
        label: "Detailed description of carpentry work (include measurements, finish types, specialty work)",
        type: "textarea",
        required: true,
        placeholder: "Describe all carpentry services in detail...",
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Agreed rate (e.g. $50 per hour / $2,000 per project)",
        type: "text",
        required: true,
        placeholder: "$0.00 per hour/day/project",
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
      {
        name: "hourlyRate",
        label: "Hourly rate for additional / change-order work",
        type: "text",
        required: false,
        placeholder: "e.g. $65.00",
      },
      {
        name: "paymentDueDays",
        label: "Days within which payment is due after invoicing",
        type: "text",
        required: true,
        placeholder: "e.g. 14",
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "curePeriodDays",
        label: "Days to cure a material breach after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
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
        label: "Carpenter Signature (type full legal name)",
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
  doc.text("CARPENTRY CONTRACT", 105, y, { align: "center" });
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
    `This Carpentry Contract ("Contract") is entered into as of ` +
    `${values.effectiveDate || "[Date]"} ("Effective Date"), by and between:`
  );
  gap(1);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  para(`${values.party1Name || "[Owner's Full Legal Name]"}, residing at ${p1Addr} ("Owner"),`);
  doc.setFont("helvetica", "normal");
  para("And");
  doc.setFont("helvetica", "bold");
  para(`${values.party2Name || "[Carpenter's Full Legal Name]"}, residing at ${p2Addr} ("Carpenter").`);
  doc.setFont("helvetica", "normal");
  gap(1);
  para(
    `The Owner and Carpenter are collectively referred to herein as the "Parties" and individually as a "Party."`
  );
  gap(5);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Scope of Work
  // ════════════════════════════════════════════════════════════
  heading("1. Scope of Work");
  para(
    `The Carpenter shall provide carpentry services and supply all necessary materials in accordance with ` +
    `the approved plans, specifications, and any subsequent written change orders duly signed by both ` +
    `Parties. All work shall be completed in a good and workmanlike manner, consistent with industry ` +
    `standards and applicable laws.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Materials, Labor, and Permits
  // ════════════════════════════════════════════════════════════
  heading("2. Materials, Labor, and Permits");
  para(
    `The Carpenter shall furnish, at its sole expense, all lumber, materials, labor, tools, equipment, ` +
    `freight, permits, and licenses necessary for the execution and completion of the work. The Carpenter ` +
    `shall be responsible for obtaining and maintaining all permits and licenses required by law for the ` +
    `performance of the services.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Description of Services
  // ════════════════════════════════════════════════════════════
  heading("3. Description of Services");
  para(
    `Commencing on ${values.serviceStartDate || "[Start Date]"}, the Carpenter shall perform the ` +
    `following services ("Services"):`
  );
  para(
    values.description || "[Insert detailed description of carpentry work, including measurements, finish types, and any specialty work].",
    2
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Payment Terms
  // ════════════════════════════════════════════════════════════
  heading("4. Payment Terms");
  para(
    `The Owner shall compensate the Carpenter at the agreed rate of ` +
    `${values.paymentAmount || "[Amount] per hour/day/project"}, payable ` +
    `${values.paymentSchedule || "[Payment Schedule]"}.`
  );
  if (values.hourlyRate) {
    bullet(
      `Additional work not specified in this Contract shall require a written change order and shall be ` +
      `billed at the Carpenter's prevailing hourly rate of ${values.hourlyRate}.`
    );
  } else {
    bullet(
      `Any additional work not specified in this Contract shall require a written change order and shall ` +
      `be billed at the Carpenter's prevailing hourly rate.`
    );
  }
  bullet(
    `Payment shall be due within ${values.paymentDueDays || "[Number]"} days of invoicing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Term and Termination
  // ════════════════════════════════════════════════════════════
  heading("5. Term and Termination");
  para(
    `This Contract shall remain in effect until ${values.contractEndDate || "[End Date]"}, unless ` +
    `extended or terminated earlier in accordance with this clause. Either Party may terminate this ` +
    `Contract by providing written notice if the other Party materially breaches any term and fails to ` +
    `remedy such breach within ${values.curePeriodDays || "[Number]"} days of receiving notice.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Relationship of Parties
  // ════════════════════════════════════════════════════════════
  heading("6. Relationship of Parties");
  para(
    `The Parties acknowledge that the Carpenter is engaged as an independent contractor and is not an ` +
    `employee, partner, or agent of the Owner. The Carpenter shall have sole control over the means and ` +
    `methods of performing the work.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Ownership of Work Product
  // ════════════════════════════════════════════════════════════
  heading("7. Ownership of Work Product");
  para(
    `All work product, designs, plans, drawings, or other materials created by the Carpenter under this ` +
    `Contract shall be the exclusive property of the Owner. The Carpenter shall execute all documents ` +
    `necessary to effectuate the transfer of ownership to the Owner.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Confidentiality
  // ════════════════════════════════════════════════════════════
  heading("8. Confidentiality");
  para(
    `The Carpenter shall not disclose, use, or permit the use of any proprietary or confidential ` +
    `information belonging to the Owner, except as strictly necessary for the performance of the ` +
    `Services. This obligation shall survive termination of the Contract.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Insurance and Liability for Injuries
  // ════════════════════════════════════════════════════════════
  heading("9. Insurance and Liability for Injuries");
  para(
    `The Carpenter shall obtain and maintain adequate general liability insurance and, where applicable, ` +
    `workers' compensation coverage. The Carpenter assumes full responsibility for any injury to persons ` +
    `or damage to property arising from its work and hereby waives any claims against the Owner in ` +
    `connection therewith.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Indemnification
  // ════════════════════════════════════════════════════════════
  heading("10. Indemnification");
  para(
    `The Carpenter shall indemnify, defend, and hold harmless the Owner from and against any and all ` +
    `claims, losses, liabilities, damages, and expenses (including reasonable attorneys' fees) arising ` +
    `out of or relating to the Carpenter's performance or breach of this Contract.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – Entire Agreement
  // ════════════════════════════════════════════════════════════
  heading("11. Entire Agreement");
  para(
    `This Contract represents the entire understanding between the Parties with respect to the subject ` +
    `matter hereof and supersedes all prior negotiations, agreements, or understandings, whether written ` +
    `or oral.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Severability
  // ════════════════════════════════════════════════════════════
  heading("12. Severability");
  para(
    `If any provision of this Contract is held invalid or unenforceable by a court of competent ` +
    `jurisdiction, such provision shall be severed and the remaining provisions shall remain in full ` +
    `force and effect.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Governing Law
  // ════════════════════════════════════════════════════════════
  heading("13. Governing Law");
  para(
    `This Contract shall be governed by and construed in accordance with the laws of the State of ` +
    `${values.state || "[State]"}, without regard to conflict of law principles.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Execution
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("14. Execution");
  para(
    `IN WITNESS WHEREOF, the Parties have executed this Contract as of the Effective Date.`
  );
  gap(6);

  // ── Owner signature block ──
  heading("OWNER:");
  sigRow("Name:",      values.party1Name);
  sigRow("Signature:", values.party1Signature);
  sigRow("Date:",      new Date().toLocaleDateString());
  gap(5);

  // ── Carpenter signature block ──
  heading("CARPENTER:");
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

  doc.save("carpentry_contract.pdf");
};

export default function CarpentryContract() {
  return (
    <FormWizard
      steps={steps}
      title="Carpentry Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="carpentrycontract"
    />
  );
}