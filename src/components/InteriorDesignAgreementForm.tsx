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
    label: "Client Details",
    fields: [
      {
        name: "party1Name",
        label: "Client's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Client an individual or a business?",
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
    label: "Client Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party1Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Client Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Designer Details",
    fields: [
      {
        name: "party2Name",
        label: "Designer's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Designer an individual or a business?",
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
    label: "Designer Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Designer Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Project Details",
    fields: [
      {
        name: "serviceStartDate",
        label: "Services start date",
        type: "date",
        required: true,
      },
      {
        name: "completionDate",
        label: "Services completion date",
        type: "date",
        required: true,
      },
      {
        name: "terminationDate",
        label: "Contract termination date",
        type: "date",
        required: true,
      },
      {
        name: "projectAddress",
        label: "Project location / site address",
        type: "text",
        required: true,
        placeholder: "123 Project Site Road, City, State",
      },
      {
        name: "description",
        label: "Description of interior design services to be performed",
        type: "textarea",
        required: true,
        placeholder: "Describe all interior design services in detail...",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Total compensation amount for services",
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
          { value: "upon completion of the Services", label: "Upon Completion" },
          { value: "Weekly",           label: "Weekly" },
          { value: "Bi-weekly",        label: "Bi-weekly" },
          { value: "Monthly",          label: "Monthly" },
          { value: "Milestone-based",  label: "Milestone-based" },
        ],
      },
      {
        name: "interestRate",
        label: "Interest rate on overdue amounts (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g. 18",
      },
    ],
  },
  {
    label: "Default & Remedies",
    fields: [
      {
        name: "curePeriodDays",
        label: "Days allowed to cure a default after written notice",
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
        label: "Client Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Designer Signature (type full legal name)",
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

  // ── alpha sub-item: a. text ──
  const alphaItem = (label: string, text: string) => {
    const indent = 10;
    const lines  = doc.splitTextToSize(text, WIDTH - indent);
    ensure(lines.length * LH + 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${label}.`, LEFT + 2, y);
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
  doc.text("INTERIOR DESIGN SERVICES AGREEMENT", 105, y, { align: "center" });
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
    `This Interior Design Contract ("Contract") is made effective as of ` +
    `${values.effectiveDate || "[Effective Date]"}, by and between:`
  );
  gap(1);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  para(`${values.party1Name || "[Client Name]"}, residing at ${p1Addr} ("Client"),`);
  doc.setFont("helvetica", "normal");
  para("AND");
  doc.setFont("helvetica", "bold");
  para(
    `${values.party2Name || "[Designer Name]"}, having a business address at ${p2Addr} ("Designer").`
  );
  doc.setFont("helvetica", "normal");
  gap(5);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Purpose
  // ════════════════════════════════════════════════════════════
  heading("1. Purpose");
  para(
    `WHEREAS the Designer is professionally engaged in the business of interior design services, and the ` +
    `Client desires to engage the Designer to provide such services in accordance with the terms set forth herein;`
  );
  para(`NOW THEREFORE, the Parties agree as follows:`);
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Description of Services
  // ════════════════════════════════════════════════════════════
  heading("2. Description of Services");
  para(
    `Beginning on ${values.serviceStartDate || "[Start Date]"}, the Designer shall perform the following ` +
    `services for the Client (the "Services"):`
  );
  para(
    values.description || "[Insert description of design services]",
    2
  );
  para(
    `The Services shall be completed on or before ${values.completionDate || "[Completion Date]"}, at the ` +
    `project location situated at ${values.projectAddress || "[Project Address]"}.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Payment
  // ════════════════════════════════════════════════════════════
  heading("3. Payment");
  bullet(
    `The Client agrees to pay the Designer a total amount of ` +
    `${values.paymentAmount || "[insert amount]"} ` +
    `${values.paymentSchedule || "upon completion of the Services"}.`
  );
  bullet(`Payment shall be made to the Designer at ${p2Addr}.`);
  bullet(`No discount shall apply for early payment.`);
  if (values.interestRate) {
    bullet(
      `Interest shall accrue on any overdue amount at the rate of ${values.interestRate}% per annum, ` +
      `or the maximum rate permissible under applicable law, whichever is lower.`
    );
  } else {
    bullet(
      `Interest shall accrue on any overdue amount at the maximum rate permissible under applicable law.`
    );
  }
  bullet(`The Client shall be responsible for all collection costs, including attorneys' fees.`);
  bullet(
    `Failure to make payment shall constitute a material breach and entitle the Designer to terminate ` +
    `this Contract and pursue legal remedies.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Term
  // ════════════════════════════════════════════════════════════
  heading("4. Term");
  para(
    `This Contract shall automatically terminate on ${values.terminationDate || "[Termination Date]"}, ` +
    `unless earlier terminated as provided herein.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Ownership of Work Product
  // ════════════════════════════════════════════════════════════
  heading("5. Ownership of Work Product");
  para(
    `All copyrightable works, ideas, plans, designs, or similar material developed in connection with ` +
    `this Contract shall be the exclusive property of the Client. The Designer shall, upon request, ` +
    `execute all instruments necessary to transfer full ownership rights to the Client.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Confidentiality
  // ════════════════════════════════════════════════════════════
  heading("6. Confidentiality");
  para(
    `The Designer, and any employee or representative thereof, shall not disclose or use any proprietary ` +
    `or confidential information of the Client for personal benefit or otherwise. This obligation shall ` +
    `survive the termination of this Contract. Upon termination, the Designer shall return all records, ` +
    `designs, notes, and other property belonging to the Client.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Indemnification
  // ════════════════════════════════════════════════════════════
  heading("7. Indemnification");
  para(
    `The Designer agrees to indemnify and hold the Client harmless from and against any and all claims, ` +
    `losses, damages, liabilities, and expenses (including reasonable legal fees) resulting from the ` +
    `Designer's performance under this Contract.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Warranty
  // ════════════════════════════════════════════════════════════
  heading("8. Warranty");
  para(
    `The Designer warrants that the Services shall be performed in a timely, professional, and ` +
    `workmanlike manner consistent with industry standards and best practices prevailing in the community.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Default
  // ════════════════════════════════════════════════════════════
  heading("9. Default");
  para("Material default under this Contract includes:");
  alphaItem("a", "Non-payment by either Party;");
  alphaItem("b", "Bankruptcy or insolvency;");
  alphaItem("c", "Seizure or assignment of assets;");
  alphaItem("d",
    `Failure to perform the Services in accordance with the timeline and specifications herein.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Remedies
  // ════════════════════════════════════════════════════════════
  heading("10. Remedies");
  para(
    `Upon default, the aggrieved Party may provide written notice identifying the breach. The breaching ` +
    `Party shall have ${values.curePeriodDays || "[insert days]"} days from receipt to cure. Failure to ` +
    `cure shall result in automatic termination unless waived in writing by the non-breaching Party.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – Force Majeure
  // ════════════════════════════════════════════════════════════
  heading("11. Force Majeure");
  para(
    `A Party shall be excused from performance under this Contract where such performance is rendered ` +
    `impossible due to causes beyond its reasonable control, including but not limited to acts of God, ` +
    `pandemic, government orders, war, or labor strikes. Affected Parties must notify the other in ` +
    `writing and resume performance as soon as feasible.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Arbitration
  // ════════════════════════════════════════════════════════════
  heading("12. Arbitration");
  para(
    `Any disputes arising from or relating to this Contract shall be resolved by binding arbitration in ` +
    `accordance with the Commercial Arbitration Rules of the American Arbitration Association.`
  );
  bullet(
    `Arbitrators shall be mutually selected. If the Parties fail to agree, each Party shall appoint one ` +
    `arbitrator, and those two shall select a third.`
  );
  bullet("The arbitration shall occur at a mutually agreed location.");
  bullet(
    `Arbitrators shall not amend the terms of this Contract or award punitive damages.`
  );
  bullet(
    `The arbitration award shall be final and binding, and enforceable in any court of competent jurisdiction.`
  );
  bullet("The Parties shall continue to perform their obligations during arbitration.");
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Entire Agreement
  // ════════════════════════════════════════════════════════════
  heading("13. Entire Agreement");
  para(
    `This Contract contains the entire agreement between the Parties and supersedes all prior oral and ` +
    `written communications.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Severability
  // ════════════════════════════════════════════════════════════
  heading("14. Severability");
  para(
    `Should any provision be found invalid or unenforceable, the remainder shall continue in full force ` +
    `and effect. Where a provision can be made valid through limitation, it shall be construed accordingly.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 15 – Amendment
  // ════════════════════════════════════════════════════════════
  heading("15. Amendment");
  para(
    `No amendment to this Contract shall be valid unless in writing and signed by the Party against ` +
    `whom enforcement is sought.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 16 – Governing Law
  // ════════════════════════════════════════════════════════════
  heading("16. Governing Law");
  para(
    `This Contract shall be governed by and construed in accordance with the laws of the State of ` +
    `${values.state || "[Insert State Name]"}.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 17 – Notice
  // ════════════════════════════════════════════════════════════
  heading("17. Notice");
  para(
    `All notices or communications under this Contract must be delivered personally or sent via certified ` +
    `mail, return receipt requested, to the addresses listed in the introductory clause, unless otherwise ` +
    `modified in writing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 18 – Waiver
  // ════════════════════════════════════════════════════════════
  heading("18. Waiver");
  para(
    `Failure by any Party to enforce any provision of this Contract shall not constitute a waiver of ` +
    `such provision or any other provision.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 19 – Execution
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("19. Execution");
  para(
    `IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.`
  );
  gap(6);

  // ── Client signature block ──
  heading("CLIENT:");
  sigRow("By:",    values.party1Signature);
  sigRow("Name:",  values.party1Name);
  sigRow("Date:",  new Date().toLocaleDateString());
  gap(5);

  // ── Designer / Contractor signature block ──
  heading("DESIGNER / CONTRACTOR:");
  sigRow("By:",    values.party2Signature);
  sigRow("Name:",  values.party2Name);
  sigRow("Date:",  new Date().toLocaleDateString());

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

  doc.save("interior_design_agreement.pdf");
};

export default function InteriorDesignAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Interior Design Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="interiordesignagreement"
    />
  );
}