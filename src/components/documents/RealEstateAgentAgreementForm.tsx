import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") {
    return [
      { value: "California", label: "California" },
      { value: "New York", label: "New York" },
      { value: "Texas", label: "Texas" },
      { value: "Florida", label: "Florida" },
      { value: "Other US State", label: "Other US State" },
    ];
  }
  if (country === "Canada") {
    return [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Other Canadian Province", label: "Other Canadian Province" },
    ];
  }
  if (country === "United Kingdom") {
    return [
      { value: "England", label: "England" },
      { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" },
      { value: "Northern Ireland", label: "Northern Ireland" },
    ];
  }
  if (country === "Australia") {
    return [
      { value: "New South Wales", label: "New South Wales" },
      { value: "Victoria", label: "Victoria" },
      { value: "Queensland", label: "Queensland" },
      { value: "Western Australia", label: "Western Australia" },
      { value: "Other Australian State", label: "Other Australian State" },
    ];
  }
  if (country === "Pakistan") {
    return [
      { value: "Punjab", label: "Punjab" },
      { value: "Sindh", label: "Sindh" },
      { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
    ];
  }
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date and Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "text", required: true, placeholder: "__________" },
      { name: "sellerName", label: "Seller Full Legal Name", type: "text", required: true },
      { name: "sellerStreetAddress", label: "Seller Street Address", type: "text", required: true },
      { name: "sellerCountry", label: "Seller Country", type: "select", required: true, options: countryOptions },
      {
        name: "sellerState",
        label: "Seller State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "sellerCountry",
        getOptions: (values) => getStateOptions(values.sellerCountry),
      },
      { name: "sellerCity", label: "Seller City", type: "text", required: true },
      { name: "agentName", label: "Agent Full Legal Name", type: "text", required: true },
      { name: "agentStreetAddress", label: "Agent Street Address", type: "text", required: true },
      { name: "agentCountry", label: "Agent Country", type: "select", required: true, options: countryOptions },
      {
        name: "agentState",
        label: "Agent State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "agentCountry",
        getOptions: (values) => getStateOptions(values.agentCountry),
      },
      { name: "agentCity", label: "Agent City", type: "text", required: true },
    ],
  },
  {
    label: "Recitals and Property",
    fields: [
      { name: "realProperty", label: "Real Property Description / Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Appointment and Services",
    fields: [
      { name: "commissionPercent", label: "Commission Percentage (%)", type: "text", required: true, placeholder: "e.g. 3" },
      { name: "priorNegotiationPerson", label: "Excluded Prior-Negotiation Person Name", type: "text", required: true },
      { name: "approvedPrice", label: "Seller Approved Price", type: "text", required: true, placeholder: "e.g. $500,000" },
    ],
  },
  {
    label: "Term, Performance and Compensation",
    fields: [
      {
        name: "expensesOverride",
        label: "Expenses Clause Override (optional — leave blank for default text)",
        type: "textarea",
        required: false,
        placeholder: "Leave blank to use default clause text.",
      },
    ],
  },
  {
    label: "Legal Clauses",
    fields: [
      {
        name: "assignmentConsentParty",
        label: "Assignment Consent Authority (optional — default: Seller)",
        type: "text",
        required: false,
        placeholder: "Default: Seller",
      },
      {
        name: "clauseNotes",
        label: "Additional Clause Notes (optional)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Governing Law and Signatures",
    fields: [
      { name: "governingLawCountry", label: "Governing Law Country", type: "select", required: true, options: countryOptions },
      {
        name: "governingLawState",
        label: "Governing Law State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "governingLawCountry",
        getOptions: (values) => getStateOptions(values.governingLawCountry),
      },
      { name: "sellerSignName", label: "Seller Name (Signature Block)", type: "text", required: true },
      { name: "sellerSignature", label: "Seller Typed Signature", type: "text", required: true },
      { name: "sellerDate", label: "Seller Date", type: "text", required: true, placeholder: "_________________________" },
      { name: "agentSignName", label: "Agent Name (Signature Block)", type: "text", required: true },
      { name: "agentSignature", label: "Agent Typed Signature", type: "text", required: true },
      { name: "agentDate", label: "Agent Date", type: "text", required: true, placeholder: "_________________________" },
    ],
  },
  {
    label: "Final Review",
    fields: [
      { name: "reviewNote", label: "Final Review Note (optional)", type: "textarea", required: false },
    ],
  },
];

// ─── PDF helpers ──────────────────────────────────────────────────────────────

/** Fills blank with underscores if empty. */
const u = (val?: string, n = 16): string =>
  ((val || "").trim() ? (val || "").trim() : "_".repeat(n));

/** Bold numbered section heading — returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(10.5);
  doc.setFont("times", "bold");
  doc.text(text, 16, y);
  return y + 7;
};

/** Bold sub-clause label on its own line (e.g. "6.1 Commission.") — returns updated y. */
const addSubLabel = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 16) { doc.addPage(); y = 20; }
  doc.setFontSize(10.4);
  doc.setFont("times", "bold");
  doc.text(text, 16, y);
  return y + 6;
};

/** Wrapped body paragraph — returns updated y. */
const addBody = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number,
  indent = 16,
  maxWidth = 178
): number => {
  doc.setFontSize(10.4);
  doc.setFont("times", "normal");
  const lines: string[] = doc.splitTextToSize(text, maxWidth - (indent - 16));
  for (const line of lines) {
    if (y > pageH - 13) { doc.addPage(); y = 20; }
    doc.text(line, indent, y);
    y += 5.25;
  }
  return y + 2;
};

/** Bullet point — returns updated y. */
const addBullet = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 13) { doc.addPage(); y = 20; }
  doc.setFontSize(10.4);
  doc.setFont("times", "normal");
  doc.text("\u2022", 20, y);
  const lines: string[] = doc.splitTextToSize(text, 168);
  for (let i = 0; i < lines.length; i++) {
    if (y > pageH - 13) { doc.addPage(); y = 20; }
    doc.text(lines[i], 26, y);
    if (i < lines.length - 1) y += 5.25;
  }
  return y + 6;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageH = doc.internal.pageSize.height;
  let y = 18;

  // ── TITLE ──
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE AGENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.2, 105 + tW / 2, y + 1.2);
  y += 11;

  // ── PREAMBLE ──
  y = addBody(
    doc,
    `This Real Estate Agent Agreement ("Agreement") is entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between:`,
    y, pageH
  );
  y += 1;

  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text(`${u(v.sellerName)},`, 16, y);
  doc.setFont("times", "normal");
  y += 5.5;
  y = addBody(doc, `with an address at ${u(v.sellerStreetAddress)}, ${u(v.sellerCity)}, ${u(v.sellerState)}, ${u(v.sellerCountry)} ("Seller"),`, y, pageH);

  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("And", 105, y, { align: "center" });
  y += 7;

  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text(`${u(v.agentName)},`, 16, y);
  doc.setFont("times", "normal");
  y += 5.5;
  y = addBody(doc, `with an address at ${u(v.agentStreetAddress)}, ${u(v.agentCity)}, ${u(v.agentState)}, ${u(v.agentCountry)} ("Agent").`, y, pageH);

  y = addBody(doc, 'The Seller and Agent may be referred to individually as a "Party" and collectively as the "Parties."', y, pageH);
  y += 3;

  // ── 1. RECITALS ──
  y = addHeading(doc, "1. RECITALS", y, pageH);
  y = addBody(doc, "WHEREAS, the Seller is the owner of certain real property, together with all improvements thereon, commonly known as:", y, pageH);
  y = addBody(doc, u(v.realProperty), y, pageH, 24);
  y = addBody(doc, '(the "Real Property"); and', y, pageH);
  y = addBody(doc, "WHEREAS, the Agent is experienced in marketing, advertising, negotiating, and selling real estate; and", y, pageH);
  y = addBody(doc, "WHEREAS, the Seller desires to engage the Agent to market and sell the Real Property, and the Agent agrees to provide such services under the terms and conditions set forth herein;", y, pageH);
  y = addBody(doc, "NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:", y, pageH);
  y += 2;

  // ── 2. APPOINTMENT AND GRANT OF AUTHORITY ──
  y = addHeading(doc, "2. APPOINTMENT AND GRANT OF AUTHORITY", y, pageH);
  y = addBody(doc, "2.1 The Seller hereby appoints the Agent as the Seller's agent for the purpose of marketing and selling the Real Property, subject to the terms of this Agreement.", y, pageH);
  y = addBody(doc, "2.2 The Seller shall promptly provide the Agent with all documents, records, and information in the Seller's possession relating to the Real Property that may be necessary for marketing or sale.", y, pageH);
  y += 2;

  // ── 3. SCOPE OF SERVICES ──
  y = addHeading(doc, "3. SCOPE OF SERVICES", y, pageH);
  y = addBody(doc, "3.1 The Seller shall refer to the Agent all inquiries, offers, and negotiations relating to the Real Property, including inquiries from other brokers or prospective purchasers.", y, pageH);
  y = addBody(doc, "3.2 The Agent shall:", y, pageH);
  y = addBullet(doc, "Investigate and develop offers for the Real Property;", y, pageH);
  y = addBullet(doc, "Market and promote the Real Property;", y, pageH);
  y = addBullet(doc, "Solicit potential purchasers;", y, pageH);
  y = addBullet(doc, "Conduct negotiations on behalf of the Seller; and", y, pageH);
  y = addBullet(doc, "Use commercially reasonable efforts to procure a purchaser.", y, pageH);
  y = addBody(doc, "3.3 The Agent is authorized to cooperate with and enlist the assistance of other licensed real estate brokers as deemed appropriate.", y, pageH);
  y = addBody(doc, "3.4 The Agent shall promptly disclose to the Seller all offers received and any proposed purchase price or material terms.", y, pageH);
  y += 2;

  // ── 4. TERM OF AGREEMENT ──
  y = addHeading(doc, "4. TERM OF AGREEMENT", y, pageH);
  y = addBody(doc, "This Agreement shall commence on the Effective Date and shall remain in effect until terminated in accordance with this Agreement.", y, pageH);
  y += 2;

  // ── 5. PERFORMANCE OF SERVICES ──
  y = addHeading(doc, "5. PERFORMANCE OF SERVICES", y, pageH);
  y = addBody(doc, "The manner, method, and means by which the Agent performs the Services shall be determined solely by the Agent. The Agent shall devote such time and effort as reasonably necessary to fulfill the obligations of this Agreement.", y, pageH);
  y += 2;

  // ── 6. COMPENSATION ──
  y = addHeading(doc, "6. COMPENSATION", y, pageH);

  y = addSubLabel(doc, "6.1 Commission.", y, pageH);
  y = addBody(doc, `The Seller agrees to pay the Agent a commission equal to ${u(v.commissionPercent, 3)}% of the gross sales price of the Real Property if the sale is consummated as a result of the Agent's efforts.`, y, pageH);

  y = addSubLabel(doc, "6.2 Commission Protection.", y, pageH);
  y = addBody(doc, "If, after termination of this Agreement, the Seller sells the Real Property to any purchaser introduced to the Property by the Agent during the term of this Agreement, the Agent shall be entitled to the full commission.", y, pageH);

  y = addSubLabel(doc, "6.3 Excluded Transactions.", y, pageH);
  y = addBody(doc, `The Seller reserves the right to sell the Real Property to any person with whom the Seller was negotiating prior to the Effective Date (${u(v.priorNegotiationPerson)}). In such event, no commission shall be owed to the Agent.`, y, pageH);

  y = addSubLabel(doc, "6.4 Refusal of Offer.", y, pageH);
  y = addBody(doc, `If the Seller rejects a bona fide offer at or above the Seller's approved price (${u(v.approvedPrice)}) during the term of this Agreement, and the property is later sold to that same purchaser, the Agent shall be entitled to full commission.`, y, pageH);
  y += 2;

  // ── 7. EXPENSES ──
  y = addHeading(doc, "7. EXPENSES", y, pageH);
  y = addBody(
    doc,
    (v.expensesOverride || "").trim() ||
    "Unless otherwise agreed in writing, the Agent shall be responsible for all out-of-pocket expenses incurred in connection with the performance of services under this Agreement.",
    y, pageH
  );
  y += 2;

  // ── 8. INDEPENDENT CONTRACTOR RELATIONSHIP ──
  y = addHeading(doc, "8. INDEPENDENT CONTRACTOR RELATIONSHIP", y, pageH);
  y = addBody(doc, "The Agent is an independent contractor and not an employee of the Seller. Nothing in this Agreement shall be construed as creating an employer-employee, partnership, or joint venture relationship.", y, pageH);
  y = addBody(doc, "The Seller shall not be responsible for employee benefits, taxes, insurance, or withholdings of any kind.", y, pageH);
  y += 2;

  // ── 9. EMPLOYEES AND SUBAGENTS ──
  y = addHeading(doc, "9. EMPLOYEES AND SUBAGENTS", y, pageH);
  y = addBody(doc, "Any employees or subagents engaged by the Agent shall be under the Agent's sole direction and control. Upon request, the Agent shall provide proof of employment or engagement of such persons.", y, pageH);
  y += 2;

  // ── 10. INDEMNIFICATION ──
  y = addHeading(doc, "10. INDEMNIFICATION", y, pageH);
  y = addBody(doc, "The Agent shall indemnify and hold harmless the Seller from any claims, damages, losses, liabilities, or expenses, including reasonable attorneys' fees, arising out of the Agent's negligence, misconduct, or breach of this Agreement.", y, pageH);
  y += 2;

  // ── 11. ASSIGNMENT ──
  y = addHeading(doc, "11. ASSIGNMENT", y, pageH);
  y = addBody(doc, `The Agent may not assign or transfer this Agreement, in whole or in part, without the prior written consent of ${u(v.assignmentConsentParty || "Seller")}.`, y, pageH);
  y += 2;

  // ── 12. CONFIDENTIALITY ──
  y = addHeading(doc, "12. CONFIDENTIALITY", y, pageH);
  y = addBody(doc, "The Agent agrees to keep all non-public information relating to the Real Property and the Seller confidential and shall not disclose such information to any third party without prior written consent.", y, pageH);
  y = addBody(doc, "This obligation shall survive termination of this Agreement.", y, pageH);
  y += 2;

  // ── 13. RETURN OF RECORDS ──
  y = addHeading(doc, "13. RETURN OF RECORDS", y, pageH);
  y = addBody(doc, "Upon termination of this Agreement, the Agent shall promptly return all documents, records, data, and materials belonging to the Seller.", y, pageH);
  y += 2;

  // ── 14. NOTICES ──
  y = addHeading(doc, "14. NOTICES", y, pageH);
  y = addBody(doc, "All notices under this Agreement shall be in writing and deemed given when delivered personally or sent by certified mail to the addresses of the Parties listed above.", y, pageH);
  y += 2;

  // ── 15. ENTIRE AGREEMENT ──
  y = addHeading(doc, "15. ENTIRE AGREEMENT", y, pageH);
  y = addBody(doc, "This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.", y, pageH);
  y += 2;

  // ── 16. AMENDMENTS ──
  y = addHeading(doc, "16. AMENDMENTS", y, pageH);
  y = addBody(doc, "This Agreement may be amended only by a written instrument signed by both Parties.", y, pageH);
  y += 2;

  // ── 17. SEVERABILITY ──
  y = addHeading(doc, "17. SEVERABILITY", y, pageH);
  y = addBody(doc, "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.", y, pageH);
  y += 2;

  // ── 19. EXCULPATION ──
  y = addHeading(doc, "19. EXCULPATION", y, pageH);
  y = addBody(doc, "The Agent shall look solely to the Seller's interest in the Real Property for satisfaction of any claims arising under this Agreement.", y, pageH);
  y += 2;

  // ── 20. WAIVER ──
  y = addHeading(doc, "20. WAIVER", y, pageH);
  y = addBody(doc, "The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.", y, pageH);
  y += 2;

  // ── 21. GOVERNING LAW ──
  y = addHeading(doc, "21. GOVERNING LAW", y, pageH);
  y = addBody(doc, `This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)} (${u(v.governingLawCountry)}).`, y, pageH);
  y += 2;

  // ── OPTIONAL NOTES ──
  if ((v.clauseNotes || "").trim()) {
    y = addHeading(doc, "Additional Notes:", y, pageH);
    y = addBody(doc, v.clauseNotes, y, pageH);
    y += 2;
  }
  if ((v.reviewNote || "").trim()) {
    y = addHeading(doc, "Final Review Note:", y, pageH);
    y = addBody(doc, v.reviewNote, y, pageH);
    y += 2;
  }

  // ── 22. EXECUTION / SIGNATURES ──
  if (y > pageH - 70) { doc.addPage(); y = 20; }
  y = addHeading(doc, "22. EXECUTION", y, pageH);
  y = addBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", y, pageH);
  y += 6;

  // Seller block
  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("SELLER:", 16, y);
  y += 7;
  doc.setFont("times", "normal");
  doc.text("Signature: _______________________________", 16, y);
  y += 7;
  doc.text(`Name: ${u(v.sellerSignName)}`, 16, y);
  y += 7;
  doc.text(`Typed Signature: ${u(v.sellerSignature)}`, 16, y);
  y += 7;
  doc.text(`Date: ${u(v.sellerDate, 12)}`, 16, y);
  y += 13;

  // Agent block
  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("AGENT:", 16, y);
  y += 7;
  doc.setFont("times", "normal");
  doc.text("Signature: _______________________________", 16, y);
  y += 7;
  doc.text(`Name: ${u(v.agentSignName)}`, 16, y);
  y += 7;
  doc.text(`Typed Signature: ${u(v.agentSignature)}`, 16, y);
  y += 7;
  doc.text(`Date: ${u(v.agentDate, 12)}`, 16, y);

  doc.save("real_estate_agent_agreement.pdf");
};

export default function RealEstateAgentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Agent Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestateagentagreement"
      preserveStepLayout
    />
  );
}