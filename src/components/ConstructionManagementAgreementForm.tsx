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
    label: "Manager Details",
    fields: [
      {
        name: "party2Name",
        label: "Manager's full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Manager an individual or a business?",
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
    label: "Manager Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true, placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Manager Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Project Details",
    fields: [
      {
        name: "projectDescription",
        label: "Project description (what is being constructed?)",
        type: "text",
        required: true,
        placeholder: "e.g. a three-storey commercial office building",
      },
      {
        name: "projectLocation",
        label: "Project location / site address",
        type: "text",
        required: true,
        placeholder: "123 Project Site Road, City, State",
      },
      {
        name: "description",
        label: "Additional scope or purpose details (optional)",
        type: "textarea",
        required: false,
        placeholder: "Any further detail about the project scope...",
      },
    ],
  },
  {
    label: "Working Hours",
    fields: [
      {
        name: "planningHours",
        label: "Minimum hours per week during planning & development phase",
        type: "text",
        required: true,
        placeholder: "e.g. 20",
      },
      {
        name: "constructionHours",
        label: "Minimum hours per week during construction phase",
        type: "text",
        required: true,
        placeholder: "e.g. 40",
      },
    ],
  },
  {
    label: "Compensation & Term",
    fields: [
      {
        name: "paymentAmount",
        label: "Hourly rate of compensation for the Manager",
        type: "text",
        required: true,
        placeholder: "e.g. $75.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: true,
        options: [
          { value: "Weekly",          label: "Weekly" },
          { value: "Bi-weekly",       label: "Bi-weekly" },
          { value: "Monthly",         label: "Monthly" },
          { value: "Milestone-based", label: "Milestone-based" },
        ],
      },
      {
        name: "terminationDate",
        label: "Agreement termination date",
        type: "date",
        required: true,
      },
      {
        name: "curePeriodDays",
        label: "Days to cure a default after written notice",
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
        placeholder: "Enter any additional terms, conditions, or special provisions...",
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
        label: "Manager Signature (type full legal name)",
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

  // ── overflow guard: starts new page when needed ──
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
    const full = `${label} ${show}`;
    doc.text(full, LEFT, y);
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
  doc.text("CONSTRUCTION MANAGEMENT AGREEMENT", 105, y, { align: "center" });
  y += 10;

  // Meta line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para(
    `Effective Date: ${values.effectiveDate || "___________"}     ` +
    `Jurisdiction: ${values.state || "___"}, ${(values.country || "").toUpperCase()}`
  );
  gap(2);

  // ── Opening / Parties ──
  para(
    `This Construction Management Agreement (the "Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "[Date]"}, by and between:`
  );
  gap(1);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  para(`${values.party1Name || "[Owner Name]"}, of ${p1Addr} (hereinafter referred to as the "Owner"),`);
  doc.setFont("helvetica", "normal");
  para("AND");
  doc.setFont("helvetica", "bold");
  para(`${values.party2Name || "[Manager Name]"}, of ${p2Addr} (hereinafter referred to as the "Manager").`);
  doc.setFont("helvetica", "normal");
  gap(1);
  para(`Collectively referred to as the "Parties" and individually as a "Party."`);
  gap(5);

  // ════════════════════════════════════════════════════════════
  // RECITALS
  // ════════════════════════════════════════════════════════════
  heading("RECITALS");
  para(
    `WHEREAS, the Owner intends to construct ${values.projectDescription || "[Project Description]"} ` +
    `(the "Project") and desires to engage the Manager to render general construction management services ` +
    `in connection therewith; and`
  );
  para(
    `WHEREAS, the Manager possesses expertise and experience in managing construction projects and is willing ` +
    `to undertake the management of the Project;`
  );
  para(
    `NOW, THEREFORE, in consideration of the mutual covenants and promises set forth herein, and intending ` +
    `to be legally bound, the Parties agree as follows:`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 1 – Management of the Project
  // ════════════════════════════════════════════════════════════
  heading("1. Management of the Project");
  para(
    `The Owner hereby appoints the Manager to act as the construction manager for the Project, to be located ` +
    `at ${values.projectLocation || "[Project Location]"}, and the Manager accepts such engagement under the ` +
    `terms and conditions set forth in this Agreement.`
  );
  if ((values.description || "").trim()) {
    para(values.description);
  }
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 2 – Duties of the Manager
  // ════════════════════════════════════════════════════════════
  heading("2. Duties of the Manager");
  para(
    `The Manager shall, in a diligent and professional manner, perform the following services, ` +
    `including but not limited to:`
  );
  alphaItem("a",
    `Advising and consulting with the Owner on all matters relating to the Project, including evaluation ` +
    `of environmentally sustainable ("green") alternatives proposed by the architect;`
  );
  alphaItem("b",
    `Reviewing contracts and agreements the Owner intends to execute in connection with the Project;`
  );
  alphaItem("c",
    `Assisting with the preparation of budgets, cost estimates, schedules, progress reports, bid packages, ` +
    `contractor selections, and coordination with material suppliers and permitting authorities;`
  );
  alphaItem("d",
    `Approving invoices and issuing payments to contractors, subcontractors, suppliers, and others ` +
    `involved in the Project;`
  );
  alphaItem("e",
    `Advising the Owner on permit procurement, regulatory compliance, and implementation of safety protocols;`
  );
  alphaItem("f",
    `Recommending appropriate types and levels of insurance coverage for the Project.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 3 – Working Hours
  // ════════════════════════════════════════════════════════════
  heading("3. Working Hours");
  para(
    `Time is of the essence in the performance of this Agreement. The Manager shall dedicate a minimum of ` +
    `${values.planningHours || "[Insert Number]"} hours per week during the planning and development phase ` +
    `and ${values.constructionHours || "[Insert Number]"} hours per week during the construction phase.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 4 – Compensation
  // ════════════════════════════════════════════════════════════
  heading("4. Compensation");
  para(
    `The Owner shall compensate the Manager at a rate of ${values.paymentAmount || "[insert amount]"} per hour ` +
    `for time expended on the Project, payable on a ${values.paymentSchedule || "monthly"} basis. ` +
    `The Manager shall maintain accurate records of all hours worked and provide detailed accounts to the ` +
    `Owner upon request.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 5 – Term
  // ════════════════════════════════════════════════════════════
  heading("5. Term");
  para(
    `This Agreement shall terminate automatically on ${values.terminationDate || "[Termination Date]"}, unless ` +
    `earlier terminated in accordance with its provisions or extended by written mutual agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 6 – Indemnity
  // ════════════════════════════════════════════════════════════
  heading("6. Indemnity");
  para(
    `To the fullest extent permitted by law, the Manager shall indemnify, defend, and hold harmless the Owner ` +
    `and the Owner's agents and employees from and against all claims, liabilities, damages, losses, and expenses, ` +
    `including reasonable attorneys' fees, arising out of or relating to the Manager's performance or ` +
    `non-performance under this Agreement.`
  );
  para(
    `The Manager shall maintain errors and omissions insurance in such amounts as the Owner may reasonably require.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 7 – Debris and Site Cleanliness
  // ════════════════════════════════════════════════════════════
  heading("7. Debris and Site Cleanliness");
  para(
    `The Manager shall ensure that the Project site remains reasonably free of accumulated waste, debris, and ` +
    `refuse generated by contractors or subcontractors during the course of the Project.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 8 – Default
  // ════════════════════════════════════════════════════════════
  heading("8. Default");
  para(`The following events shall constitute material default under this Agreement:`);
  alphaItem("a", "Failure to make any payment due hereunder;");
  alphaItem("b", "Insolvency, bankruptcy, or assignment for the benefit of creditors;");
  alphaItem("c", "Attachment, seizure, or other legal process against a Party's property;");
  alphaItem("d",
    `Failure to timely or properly perform or deliver any services or obligations required under this Agreement.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 9 – Remedies
  // ════════════════════════════════════════════════════════════
  heading("9. Remedies");
  para(
    `Upon the occurrence of any material default, the non-defaulting Party may issue written notice specifying ` +
    `the nature of the default in reasonable detail.`
  );
  para(
    `The defaulting Party shall have ${values.curePeriodDays || "[Insert Number]"} days from receipt of such ` +
    `notice to cure the default. Failure to cure within the specified period, unless waived in writing, shall ` +
    `result in automatic termination of this Agreement and entitle the non-defaulting Party to pursue all ` +
    `legal or equitable remedies available.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 10 – Force Majeure
  // ════════════════════════════════════════════════════════════
  heading("10. Force Majeure");
  para(
    `Neither Party shall be liable for any delay or failure in performance due to causes beyond its reasonable ` +
    `control, including but not limited to acts of God, natural disasters, epidemics, pandemics, public health ` +
    `emergencies, quarantines, civil unrest, governmental orders, war, or labor disputes.`
  );
  para(
    `The affected Party must notify the other Party promptly in writing and shall resume performance as soon ` +
    `as practicable after the cessation of the event.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 11 – Arbitration
  // ════════════════════════════════════════════════════════════
  heading("11. Arbitration");
  para(
    `Any dispute or controversy arising under or in relation to this Agreement shall be resolved through ` +
    `binding arbitration in accordance with the then-current Commercial Arbitration Rules of the American ` +
    `Arbitration Association.`
  );
  bullet(`The Parties shall mutually appoint an arbitrator.`);
  bullet(
    `If they are unable to agree, each Party shall appoint one arbitrator, and those two shall jointly ` +
    `appoint a third arbitrator who shall preside.`
  );
  bullet(
    `The arbitration shall take place at a mutually agreed location or, failing agreement, at a centrally ` +
    `located venue.`
  );
  bullet(
    `Each Party shall furnish relevant documentation to the other within thirty (30) days of notice of arbitration.`
  );
  bullet(
    `The arbitrators shall not have authority to alter the terms of this Agreement or award punitive damages.`
  );
  bullet(`The arbitrators may issue binding injunctions or mandatory orders.`);
  bullet(
    `Judgment on the arbitrators' award may be entered in any court of competent jurisdiction.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 12 – Governing Law
  // ════════════════════════════════════════════════════════════
  heading("12. Governing Law");
  para(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ` +
    `${values.state || "[Insert State Name]"}, without regard to conflict of law principles.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 13 – Amendment
  // ════════════════════════════════════════════════════════════
  heading("13. Amendment");
  para(
    `No amendment or modification to this Agreement shall be effective unless in writing and duly signed ` +
    `by the Party against whom enforcement is sought.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 14 – Binding Effect
  // ════════════════════════════════════════════════════════════
  heading("14. Binding Effect");
  para(
    `This Agreement shall be binding upon, and shall inure to the benefit of, the Parties and their ` +
    `respective heirs, legal representatives, successors, and permitted assigns.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 15 – Attorneys' Fees
  // ════════════════════════════════════════════════════════════
  heading("15. Attorneys' Fees");
  para(
    `In the event of any legal action or arbitration to enforce or interpret this Agreement, the prevailing ` +
    `Party shall be entitled to recover its reasonable attorneys' fees and costs in addition to any other ` +
    `relief awarded.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 16 – Notice
  // ════════════════════════════════════════════════════════════
  heading("16. Notice");
  para(
    `All notices required under this Agreement shall be in writing and delivered personally or sent by ` +
    `certified mail, return receipt requested, to the addresses of the Parties as set forth above, or as ` +
    `subsequently modified in writing.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 17 – Waiver
  // ════════════════════════════════════════════════════════════
  heading("17. Waiver");
  para(
    `The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver ` +
    `of such provision or of the right to enforce it in the future.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 18 – Severability
  // ════════════════════════════════════════════════════════════
  heading("18. Severability");
  para(
    `If any provision of this Agreement is found to be invalid or unenforceable under applicable law, ` +
    `such provision shall be enforced to the maximum extent permitted by law, and the remainder of this ` +
    `Agreement shall continue in full force and effect.`
  );
  gap(4);

  // ════════════════════════════════════════════════════════════
  // SECTION 19 – Entire Agreement
  // ════════════════════════════════════════════════════════════
  heading("19. Entire Agreement");
  para(
    `This Agreement constitutes the entire agreement between the Parties with respect to the subject matter ` +
    `hereof, and supersedes all prior negotiations, discussions, understandings, or agreements, whether oral ` +
    `or written.`
  );
  gap(4);

  // ── Additional Terms (if provided) ──
  if ((values.additionalTerms || "").trim()) {
    heading("Additional Terms & Conditions");
    para(values.additionalTerms);
    gap(4);
  }

  // ════════════════════════════════════════════════════════════
  // SECTION 20 – Execution
  // ════════════════════════════════════════════════════════════
  ensure(65);
  heading("20. Execution");
  para(
    `IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the date first written above.`
  );
  gap(6);

  heading("OWNER");
  sigRow("By:",        values.party1Signature);
  sigRow("Name:",      values.party1Name);
  sigRow("Date:",      new Date().toLocaleDateString());
  gap(5);

  heading("MANAGER");
  sigRow("By:",        values.party2Signature);
  sigRow("Name:",      values.party2Name);
  sigRow("Date:",      new Date().toLocaleDateString());

  if ((values.witnessName || "").trim()) {
    gap(6);
    sigRow("Witness:", values.witnessName);
  }

  doc.save("construction_management_agreement.pdf");
};

export default function ConstructionManagementAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Construction Management Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="constructionmanagementagreement"
    />
  );
}