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
        label: "What is the full legal name of the first party (Seller)?",
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
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party (Purchaser)?",
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
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Corporation Details",
    fields: [
      { name: "corpName", label: "Corporation Name", type: "text", required: true, placeholder: "[Corporation Name]" },
      { name: "corpType", label: "Type of Corporation", type: "text", required: false, placeholder: "e.g. Delaware C-Corporation" },
      { name: "corpJurisdiction", label: "Corporation State/Jurisdiction", type: "text", required: false, placeholder: "[State/Jurisdiction]" },
      { name: "numShares", label: "Number of Shares", type: "text", required: true, placeholder: "[Number of Shares]" },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "purchasePrice", label: "Total Purchase Price ($)", type: "text", required: true, placeholder: "$0.00" },
      { name: "initialPayment", label: "Initial Payment Amount ($)", type: "text", required: false, placeholder: "$0.00" },
      { name: "balancePayment", label: "Balance Payment Amount ($)", type: "text", required: false, placeholder: "$0.00" },
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
    label: "Closing Details",
    fields: [
      { name: "closingTime", label: "Closing Time", type: "text", required: false, placeholder: "[Time]" },
      { name: "closingLocation", label: "Closing Location", type: "text", required: false, placeholder: "[Location]" },
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
      { name: "party1Signature", label: "Seller Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party1Title", label: "Seller Title", type: "text", required: false, placeholder: "e.g. Director" },
      { name: "party1SignDate", label: "Seller Sign Date", type: "text", required: false },
      { name: "party2Signature", label: "Purchaser Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Title", label: "Purchaser Title", type: "text", required: false, placeholder: "e.g. Director" },
      { name: "party2SignDate", label: "Purchaser Sign Date", type: "text", required: false },
      { name: "witnessName", label: "Witness 1 Name (Optional)", type: "text", required: false },
      { name: "witness2Name", label: "Witness 2 Name (Optional)", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const textW = pageW - margin * 2;
  const lineH = 5.5;
  const pageLimit = pageH - 18;
  let y = 20;

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 20;
    }
  };

  // Plain body text — normal or bold, optional indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.8) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Top-level ALL-CAPS bold section heading  e.g. "1. PURCHASE AND SALE OF STOCK"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Numbered sub-section: bold label on own line, body below indented
  // e.g.  "1.1  Sale and Transfer"  then body
  const sub = (label: string, title: string, body: string) => {
    checkY(lineH * 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(`${label}  ${title}`, margin, y);
    y += lineH + 1;
    p(body, false, 4, 3);
  };

  // Numbered sub-section for General Provisions (title only, body inline)
  const subInline = (label: string, title: string, body: string) => {
    checkY(lineH * 2);
    // Bold label + title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const header = `${label}  ${title}`;
    doc.text(header, margin, y);
    y += lineH + 1;
    p(body, false, 4, 3);
  };

  // Bullet with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.5);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.5;
  };

  // Bullet with bold label prefix  e.g. "• Initial Payment: $..."
  const bulletBold = (label: string, body: string, indent = 6) => {
    doc.setFontSize(10.5);
    const lblW = doc.getTextWidth(`${label} `);
    const bodyLines = doc.splitTextToSize(body, textW - indent - lblW);
    const totalLines = doc.splitTextToSize(`${label} ${body}`, textW - indent);
    checkY(totalLines.length * lineH + 2.5);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", margin + 1.5, y);
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + indent, y);
    doc.setFont("helvetica", "normal");
    if (bodyLines[0]) doc.text(bodyLines[0], margin + indent + lblW, y);
    y += lineH;
    for (let i = 1; i < bodyLines.length; i++) {
      checkY(lineH + 1);
      doc.text(bodyLines[i], margin + indent, y);
      y += lineH;
    }
    y += 2.5;
  };

  // Signature field row with measured underline
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.3, margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.3);
    } else {
      doc.line(margin + lblW, y + 1.3, margin + lblW + lineLen, y + 1.3);
    }
    y += lineH + 2.8;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "STOCK PURCHASE AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.5, pageW / 2 + halfTW, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  p(
    `This Stock Purchase Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, "[Insert Date]")} (the "Effective Date"), by and between:`
  );

  bullet(
    `${u(values.party1Name, "[Seller Name]")}, having an address at ${u(values.party1Street, "")}${values.party1City ? ", " + values.party1City : ""}${values.party1Zip ? " " + values.party1Zip : ""} (hereinafter referred to as "Seller"), and`
  );
  bullet(
    `${u(values.party2Name, "[Purchaser Name]")}, having an address at ${u(values.party2Street, "")}${values.party2City ? ", " + values.party2City : ""}${values.party2Zip ? " " + values.party2Zip : ""} (hereinafter referred to as "Purchaser").`
  );

  y += 1;
  p(`Collectively, Seller and Purchaser are referred to herein as the "Parties."`);

  // ── RECITALS ───────────────────────────────────────────────────────────────
  heading("RECITALS");

  p(
    `WHEREAS, the Seller is a stockholder of ${u(values.corpName, "[Corporation Name]")}, a ${u(values.corpType, "[Type of Corporation]")}, duly organized, validly existing, and in good standing under the laws of ${u(values.corpJurisdiction || values.state, "[State/Jurisdiction]")}, and is the lawful record owner of ${u(values.numShares, "[Number of Shares]")} shares of the capital stock of the Corporation (the "Stock");`
  );
  p(
    `WHEREAS, the Purchaser desires to purchase the Stock from the Seller, and the Seller desires to sell the Stock to the Purchaser, on the terms and subject to the conditions set forth in this Agreement;`
  );
  p(
    `NOW, THEREFORE, in consideration of the mutual covenants, agreements, and representations herein contained, the Parties agree as follows:`
  );

  // ── 1. PURCHASE AND SALE ───────────────────────────────────────────────────
  heading("1.  PURCHASE AND SALE OF STOCK");

  sub(
    "1.1",
    "Sale and Transfer",
    `Subject to the terms and conditions of this Agreement, at the Closing (as defined below), the Seller agrees to sell, transfer, assign, and convey to the Purchaser, and the Purchaser agrees to purchase from the Seller, all right, title, and interest in and to the Stock.`
  );

  sub(
    "1.2",
    "Delivery of Stock Certificates",
    `The Stock shall be delivered to the Purchaser in the form of certificates duly endorsed for transfer or accompanied by appropriate stock powers duly executed in blank, with signatures guaranteed in the customary fashion. The Seller shall ensure that all documentary transfer taxes, if any, are paid.`
  );

  // ── 2. PURCHASE PRICE AND PAYMENT ─────────────────────────────────────────
  heading("2.  PURCHASE PRICE AND PAYMENT");

  sub(
    "2.1",
    "Purchase Price",
    `The total purchase price for the Stock (the "Purchase Price") shall be $${u(values.purchasePrice, "[Amount]")}.`
  );

  // 2.2 with bullet sub-items
  checkY(lineH * 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("2.2  Payment Terms", margin, y);
  y += lineH + 1;
  p("The Purchase Price shall be paid as follows:", false, 4, 2);
  bulletBold("Initial Payment:", `$${u(values.initialPayment, "[Amount]")} payable upon execution of this Agreement.`);
  bulletBold("Balance Payment:", `$${u(values.balancePayment, "[Amount]")} payable at the Closing.`);
  y += 1;

  sub(
    "2.3",
    "Method of Payment",
    `All payments shall be made by wire transfer to an account designated by the Seller, or by such other method as mutually agreed in writing.`
  );

  // ── 3. CLOSING ─────────────────────────────────────────────────────────────
  heading("3.  CLOSING");

  sub(
    "3.1",
    "Time and Place",
    `The Closing of the purchase and sale of the Stock shall take place at ${u(values.closingTime, "[Time]")}, at ${u(values.closingLocation, "[Location]")}, or at such other place, time, and date as the Parties may mutually agree.`
  );

  sub(
    "3.2",
    "Deliverables at Closing",
    `At the Closing, the Seller shall deliver the Stock certificates, duly endorsed, and any other documents reasonably required to effect the transfer of ownership. The Purchaser shall pay the Purchase Price in accordance with Section 2.`
  );

  // ── 4. SELLER REPRESENTATIONS ─────────────────────────────────────────────
  heading("4.  REPRESENTATIONS AND WARRANTIES OF THE SELLER");

  p(
    `The Seller hereby represents and warrants as of the Effective Date and as of the Closing:`
  );

  sub(
    "4.1",
    "Ownership and Authority",
    `The Seller is the lawful owner of the Stock, free and clear of any liens, claims, encumbrances, or restrictions, and has full authority to sell and transfer the Stock.`
  );

  sub(
    "4.2",
    "Organization and Standing of the Corporation",
    `The Corporation is duly organized, validly existing, and in good standing under the laws of ${u(values.corpJurisdiction || values.state, "[State/Jurisdiction]")}.`
  );

  sub(
    "4.3",
    "No Conflicting Agreements",
    `The Seller is not a party to any agreement, written or oral, granting any third party rights to the Stock or otherwise restricting the transfer or sale of the Stock.`
  );

  sub(
    "4.4",
    "No Encumbrances",
    `There are no outstanding warrants, options, calls, rights of first refusal, redemption rights, or convertible securities affecting the Stock.`
  );

  sub(
    "4.5",
    "No Broker or Finder Fees",
    `No broker, finder, or agent has been engaged by the Seller to solicit the Purchaser for this transaction, and there are no fees or commissions payable to any third party in connection with the sale of the Stock.`
  );

  // ── 5. PURCHASER REPRESENTATIONS ──────────────────────────────────────────
  heading("5.  REPRESENTATIONS AND WARRANTIES OF THE PURCHASER");

  p("The Purchaser represents and warrants that:");

  sub(
    "5.1",
    "Authority",
    `The Purchaser has full power and authority to enter into this Agreement and to consummate the transactions contemplated hereby.`
  );

  sub(
    "5.2",
    "Investment Intent",
    `The Purchaser is acquiring the Stock for its own account for investment purposes and not with a view to resale or distribution.`
  );

  sub(
    "5.3",
    "No Conflicting Obligations",
    `The execution, delivery, and performance of this Agreement do not violate any agreement to which the Purchaser is a party.`
  );

  // ── 6. COVENANTS ───────────────────────────────────────────────────────────
  heading("6.  COVENANTS OF THE PARTIES");

  sub(
    "6.1",
    "Further Assurances",
    `Each Party agrees to execute and deliver such additional instruments and take such actions as may reasonably be required to effectuate the transfer of the Stock and to carry out the intent of this Agreement.`
  );

  if (values.confidentiality === "yes") {
    sub(
      "6.2",
      "Confidentiality",
      `The Parties shall maintain the confidentiality of all information received in connection with this Agreement and shall not disclose such information except as required by law or with prior written consent.`
    );
  }

  sub(
    "6.3",
    "Compliance with Law",
    `Each Party shall comply with all applicable laws, regulations, and requirements in connection with the transactions contemplated by this Agreement.`
  );

  // ── 7. GENERAL PROVISIONS ─────────────────────────────────────────────────
  heading("7.  GENERAL PROVISIONS");

  subInline("7.1", "Entire Agreement",
    `This Agreement, including all exhibits and schedules hereto, constitutes the entire agreement of the Parties regarding the subject matter hereof and supersedes all prior or contemporaneous understandings, agreements, or representations.`
  );

  subInline("7.2", "Amendment",
    `No modification, amendment, or waiver of any provision shall be effective unless in writing and executed by all Parties.`
  );

  subInline("7.3", "Severability",
    `If any provision is held invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Invalid provisions shall be reformed to the extent necessary to reflect the original intent of the Parties.`
  );

  subInline("7.4", "Waiver",
    `Failure to enforce any provision shall not constitute a waiver of the right to enforce that provision in the future. Waivers must be in writing.`
  );

  subInline("7.5", "Assignment",
    `No Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party.`
  );

  subInline("7.6", "Binding Effect",
    `This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.`
  );

  subInline("7.7", "Notices",
    `All notices must be in writing and delivered personally, by certified mail (return receipt requested), overnight courier, or electronically with confirmation. Notices are deemed effective upon delivery.`
  );

  subInline("7.8", "Governing Law",
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(values.state, "[State/Jurisdiction]")}${values.country ? ", " + values.country.toUpperCase() : ""}, without regard to conflicts of law principles.`
  );

  // 7.9 Dispute Resolution — content varies by selection
  const drMap: Record<string, string> = {
    arbitration: `Parties shall first attempt to resolve disputes by negotiation. If unresolved, disputes shall be submitted to binding arbitration under AAA rules in [City, State], and the arbitrator's decision shall be final and enforceable. The prevailing Party is entitled to reasonable attorneys' fees and costs.`,
    mediation: `Parties shall first attempt to resolve disputes through good-faith mediation before a mutually agreed mediator. If mediation fails within sixty (60) days, either Party may pursue other available remedies.`,
    litigation: `Any dispute arising out of or relating to this Agreement shall be resolved by litigation in a court of competent jurisdiction in ${u(values.state, "[State/Jurisdiction]")}. The prevailing Party is entitled to reasonable attorneys' fees and costs.`,
    negotiation: `The Parties shall first attempt to resolve any dispute through good-faith negotiation for a period of thirty (30) days before pursuing any other remedy.`,
  };
  subInline("7.9", "Dispute Resolution",
    drMap[values.disputeResolution] || drMap["arbitration"]
  );

  subInline("7.10", "Force Majeure",
    `Neither Party is liable for delays or failures caused by events beyond reasonable control, including natural disasters, pandemics, war, or governmental actions. Obligations shall resume promptly after the event ends.`
  );

  // ── Additional Terms ───────────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    heading("ADDITIONAL TERMS AND CONDITIONS");
    p(values.additionalTerms.trim());
  }

  // ── 8. SIGNATORIES ─────────────────────────────────────────────────────────
  heading("8.  SIGNATORIES");

  p(
    `IN WITNESS WHEREOF, the Parties have executed this Stock Purchase Agreement as of the Effective Date written above.`,
    false, 0, 5
  );

  // Seller block
  checkY(lineH * 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("SELLER:", margin, y);
  y += lineH + 2;
  field("Signature", u(values.party1Signature, ""));
  field("Name", u(values.party1Name, ""));
  field("Title", u(values.party1Title, ""));
  field("Date", u(values.party1SignDate, ""));

  y += 5;

  // Purchaser block
  checkY(lineH * 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("PURCHASER:", margin, y);
  y += lineH + 2;
  field("Signature", u(values.party2Signature, ""));
  field("Name", u(values.party2Name, ""));
  field("Title", u(values.party2Title, ""));
  field("Date", u(values.party2SignDate, ""));

  // Witnesses (optional)
  if (values.witnessName?.trim() || values.witness2Name?.trim()) {
    y += 5;
    checkY(lineH * 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("WITNESSES (Optional):", margin, y);
    y += lineH + 3;

    if (values.witnessName?.trim()) {
      checkY(lineH * 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text("1.", margin, y);
      y += lineH + 1;
      field("Name", values.witnessName);
      field("Signature", "");
    }

    if (values.witness2Name?.trim()) {
      y += 2;
      checkY(lineH * 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text("2.", margin, y);
      y += lineH + 1;
      field("Name", values.witness2Name);
      field("Signature", "");
    }
  }

  doc.save("stock_purchase_agreement.pdf");
};

export default function StockPurchaseAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Stock Purchase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="stockpurchaseagreement"
    />
  );
}