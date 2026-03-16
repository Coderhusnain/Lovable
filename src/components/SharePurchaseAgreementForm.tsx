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
      { name: "effectiveDate", label: "What is the effective date of this agreement?", type: "date", required: true },
      { name: "agreementCity", label: "City where agreement is made", type: "text", required: false, placeholder: "e.g. Islamabad" },
    ],
  },
  {
    label: "Seller Details",
    fields: [
      { name: "party1Name", label: "Seller full legal name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: false, placeholder: "ZIP Code" },
      { name: "party1Email", label: "Email Address", type: "email", required: false, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Buyer Details",
    fields: [
      { name: "party2Name", label: "Buyer full legal name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: false, placeholder: "ZIP Code" },
      { name: "party2Email", label: "Email Address", type: "email", required: false, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Company & Shares",
    fields: [
      { name: "companyName", label: "Company name", type: "text", required: true, placeholder: "[Company Name]" },
      { name: "incorporationNo", label: "Incorporation number", type: "text", required: false, placeholder: "e.g. 12345" },
      { name: "existingShareholder", label: "Existing shareholder full legal name", type: "text", required: false, placeholder: "[Existing Shareholder Name]" },
      { name: "numShares", label: "Number / description of shares being sold", type: "text", required: true, placeholder: "e.g. 500 ordinary shares" },
      { name: "purchasePrice", label: "Purchase price for shares", type: "text", required: false, placeholder: "e.g. $50,000" },
      { name: "jurisdiction", label: "Court jurisdiction city", type: "text", required: false, placeholder: "e.g. Islamabad" },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration", label: "Duration of this agreement", type: "select", required: true,
        options: [
          { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" },
          { value: "indefinite", label: "Indefinite / Until completion" }, { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice", label: "Notice required to terminate", type: "select", required: true,
        options: [
          { value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution", label: "How should disputes be resolved?", type: "select", required: true,
        options: [
          { value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Seller Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party1SignDate", label: "Seller sign date", type: "text", required: false },
      { name: "party1Cnic", label: "Seller CNIC / ID No. (optional)", type: "text", required: false },
      { name: "party2Signature", label: "Buyer Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2SignDate", label: "Buyer sign date", type: "text", required: false },
      { name: "party2Cnic", label: "Buyer CNIC / ID No. (optional)", type: "text", required: false },
      { name: "existingShareholderSig", label: "Existing Shareholder signature (type full legal name)", type: "text", required: false },
      { name: "w1Name", label: "Witness 1 Name", type: "text", required: false },
      { name: "w1Cnic", label: "Witness 1 CNIC / ID No.", type: "text", required: false },
      { name: "w2Name", label: "Witness 2 Name (Optional)", type: "text", required: false },
      { name: "w2Cnic", label: "Witness 2 CNIC / ID No.", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW  = 210;
  const margin = 18;
  const textW  = pageW - margin * 2;
  const lineH  = 5.5;
  const pageLimit = 278;
  let y = 20;

  // ── Layout helpers ──────────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) { doc.addPage(); y = 20; }
  };

  // Plain body paragraph
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.8) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold ARTICLE heading — e.g. "ARTICLE 1 — DEFINITIONS"
  const articleHeading = (num: string, title: string) => {
    checkY(lineH + 8);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    const line1 = `ARTICLE ${num}`;
    doc.text(line1, margin, y);
    y += lineH + 1;
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(title, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Bold RECITALS / section heading (not an article)
  const sectionHeading = (text: string) => {
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

  // Numbered clause  e.g. "1.  Body text..."
  const clause = (num: string, text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const numStr = `${num}  `;
    const numW   = doc.getTextWidth(numStr);
    const lines  = doc.splitTextToSize(text, textW - indent - numW);
    checkY(lines.length * lineH + 2.5);
    doc.text(numStr, margin + indent, y);
    doc.text(lines, margin + indent + numW, y);
    y += lines.length * lineH + 2.5;
  };

  // Lettered sub-clause  e.g. "(a)  Body text..."
  const subClause = (letter: string, text: string, indent = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lbl  = `(${letter})  `;
    const lblW = doc.getTextWidth(lbl);
    const lines = doc.splitTextToSize(text, textW - indent - lblW);
    checkY(lines.length * lineH + 2.2);
    doc.text(lbl, margin + indent, y);
    doc.text(lines, margin + indent + lblW, y);
    y += lines.length * lineH + 2.2;
  };

  // Roman-numeral recital  e.g. "I.  WHEREAS ..."
  const recital = (roman: string, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lbl  = `${roman}.  `;
    const lblW = doc.getTextWidth(lbl);
    // Bold WHEREAS / AND WHEREAS prefix
    const match = text.match(/^(WHEREAS|AND WHEREAS)\s+(.*)/s);
    const lines = doc.splitTextToSize(text, textW - 6 - lblW);
    checkY(lines.length * lineH + 2.5);
    doc.text(lbl, margin + 2, y);
    if (match) {
      doc.setFont("helvetica", "bold");
      doc.text(match[1] + " ", margin + 2 + lblW, y);
      const prefW = doc.getTextWidth(match[1] + " ");
      doc.setFont("helvetica", "normal");
      const restLines = doc.splitTextToSize(match[2], textW - 6 - lblW - prefW);
      if (restLines[0]) doc.text(restLines[0], margin + 2 + lblW + prefW, y);
      y += lineH;
      for (let i = 1; i < restLines.length; i++) {
        checkY(lineH + 1);
        doc.text(restLines[i], margin + 6 + lblW, y);
        y += lineH;
      }
      y += 2.5;
    } else {
      doc.text(lines, margin + 2 + lblW, y);
      y += lines.length * lineH + 2.5;
    }
  };

  // Signature field with underline
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

  // ── TITLE ────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "SHARE PURCHASE AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.5, pageW / 2 + halfTW, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ─────────────────────────────────────────────────────────
  const city = values.agreementCity || values.party1City || "[City]";
  p(
    `This SHARE PURCHASE AGREEMENT ("Agreement") is made at ${u(city)} on this ${u(values.effectiveDate, "[Date]")} ("Effective Date");`
  );

  checkY(lineH + 2);
  doc.setFont("helvetica", "bold");
  doc.text("BY AND BETWEEN", pageW / 2, y, { align: "center" });
  y += lineH + 3;

  const seller1Addr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  p(
    `Party One, ${u(values.party1Name, "[Seller Name]")}, residing at ${u(seller1Addr, "[Full Residential Address]")}, (hereinafter to be referred as "Seller", which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest, and permitted assigns);`,
    false, 4
  );

  checkY(lineH + 2);
  doc.setFont("helvetica", "bold");
  doc.text("AND", pageW / 2, y, { align: "center" });
  y += lineH + 3;

  const buyer2Addr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  p(
    `Party Two, ${u(values.party2Name, "[Buyer Name]")}, residing at ${u(buyer2Addr, "[Full Residential Address]")}, (hereinafter to be referred as "Buyer", which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest, and permitted assigns);`,
    false, 4
  );

  y += 1;
  p(`(The Seller and Buyer may collectively be referred to as the "Parties" and/or individually as the "Party").`);

  // ── RECITALS ─────────────────────────────────────────────────────────
  sectionHeading("RECITALS");

  recital("I",
    `WHEREAS ${u(values.companyName, "[Company Name]")} bearing incorporation No. ${u(values.incorporationNo, "-------")} is duly incorporated under the laws of state, ("Company");`
  );
  recital("II",
    `WHEREAS at the date hereof, the Seller is a shareholder of Company and holds a total of ${u(values.numShares, "[Shares]")} of the total issued and paid up share capital of the Company in the form of ordinary shares ("Shares");`
  );
  recital("III",
    `AND WHEREAS the Seller agrees to sell the Shares and the Buyers agree to purchase the Shares on the terms and conditions set forth in this Agreement.`
  );

  y += 1;
  p(`NOW, THEREFORE, THIS AGREEMENT WITNESSETH AS FOLLOWS:`, true, 0, 4);

  // ── ARTICLE 1 — DEFINITIONS ──────────────────────────────────────────
  articleHeading("1", "DEFINITIONS");

  p(`In this Agreement, unless the context requires otherwise, all capitalised terms shall have the following meanings:`, false, 0, 2);

  subClause("a", `"Agreement" shall mean this Share Purchase Agreement and includes its Recitals, which form an integral part of this Agreement for all purposes;`);
  subClause("b", `"Applicable Law" means any constitution, statute, code, regulation, legislation, rule, ordinance, injunction, judgement, order, decree, ruling, charge, treaty, bilateral or multilateral agreement, embargo, sanction, statutory requirement or other restriction of or interpretation thereof as applicable to ${u(values.state || values.country, "state")};`);
  subClause("c", `"Buyer" shall mean the signatory as Buyer as mentioned in By and Between, which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest and permitted assigns;`);
  subClause("d", `"Effective Date" means the day on which the last Party signing this Agreement has signed this Agreement;`);
  subClause("e", `"Encumbrances" means but is not limited to any option, right to acquire, mortgage, charge (fixed or floating), pledge, lien, option, right to acquire, assignment by way of security, trust arrangement, or other form of security or encumbrance;`);
  subClause("f", `"Indemnifying Party" shall include the Buyers and Existing Shareholder, which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest and permitted assigns.`);

  // ── ARTICLE 2 — TRANSACTION OF SHARES ───────────────────────────────
  articleHeading("2", "TRANSACTION OF SHARES");

  clause("1.", `Subject to terms and conditions of this Agreement, the Seller hereby sells and transfers to the Buyers, and the Buyers shall purchase and acquire from the Seller the following shares${values.numShares ? ` — ${values.numShares}` : ""}, free and clear of any Encumbrances.${values.purchasePrice ? ` The purchase price for the Shares is ${values.purchasePrice}.` : ""}`);
  clause("2.", `Upon signing of this Agreement by Parties, the Seller shall promptly transfer and deliver to the Buyers the share certificates and all other relevant documents including but not limited to transfer deeds and board resolutions representing the sale of Shares.`);
  clause("3.", `The transfer of Shares shall be effective as of the Effective Date, from and after which:`);

  subClause("a", `the Buyer shall be the exclusive owners of the Shares for all its intents and purposes;`, 14);
  subClause("b", `the Seller's resignation as director shall become effective.`, 14);

  // ── ARTICLE 3 — REPRESENTATIONS AND WARRANTIES ───────────────────────
  articleHeading("3", "REPRESENTATIONS AND WARRANTIES");

  clause("3.1", `The Seller, by signing the Agreement, hereby represents and warrants that:`);
  subClause("a", `The Seller has all requisite power and authority to execute and deliver the Agreement and to perform its obligations under the Agreement. The execution, delivery and performance of this Agreement and the consummation of the Transaction of Shares by the Seller have been duly authorised upon necessary action on the part of Seller;`);
  subClause("b", `The execution, delivery and performance of this Agreement by Seller, nor Transaction of Shares shall conflict with or violate: (i) the Seller's certification of Shares; (ii) the Company's memorandum of association, articles of association or similar constituent document, each as amended to date;`);
  subClause("c", `The Seller has already made an offer to the Existing Shareholder who, being a member of the Company, had the right to first refusal over the sale of Shares. The Existing Shareholder upon such offer has refused from such purchase. Thus, granting the Buyers the opportunity to purchase the Shares. A board resolution was executed for purposes of selling shares to Buyers;`);
  subClause("d", `Upon payment in full of the Purchase Price, good and valid title of the Shares shall pass to the Buyers, free and clear of any Encumbrances, and with no restrictions on the voting rights or other incidents of record and exclusive ownership of such Shares. The Shares are duly authorised, validly issued and fully paid.`);

  y += 1;
  clause("3.2", `The Existing Shareholder represents that the Company is duly incorporated, validly existing and in good standing under the applicable laws, and has all requisite power and authority to conduct its business as presently conducted.`);
  clause("3.3", `The Existing Shareholder has not indulged in any activities that may render/expose the Seller in/to any litigation, civil or criminal proceedings before any court or tribunal, and no such proceedings are pending or threatened against the Company and its shareholders.`);

  // ── ARTICLE 4 — INDEMNIFICATION ──────────────────────────────────────
  articleHeading("4", "INDEMNIFICATION");

  clause("4.1", `The Indemnifying Party acknowledges that the Seller was not involved in the day to day running of the Company, thus they shall defend and promptly indemnify and hold harmless the Seller for the time during which he served as a director and was a shareholder of the Company, against for and in respect of and pay any and all losses, claims, demands, punitive damages, expenses, causes of action, judgement and/or costs suffered, sustained, incurred or required to be paid by any such party arising out of or resulting from any act including but not limited to:`);

  subClause("a", `Any breach of any representation, warranty, covenant or agreement of the Company with any third-party contained in the Agreement or any requisite documentation and certification;`);
  subClause("b", `The enforcement by Seller of any of his rights under Article 4 or any other Clause contained in this Agreement or any requisite documentation and certification;`);
  subClause("c", `Any other taxes or any liability which, prior to the Effective Date, the Company was accountable for;`);
  subClause("d", `All operations and actions of the Company before and after the Effective Date.`);

  y += 1;
  clause("4.2", `The Parties acknowledge and agree that this Article shall remain valid and enforceable upon termination or expiration of any existing agreement or arrangements between the Seller and Indemnifying Party.`);

  // ── ARTICLE 5 — MISCELLANEOUS ────────────────────────────────────────
  articleHeading("5", "MISCELLANEOUS");

  clause("5.1", `The Indemnifying Party shall bear all of the expenses, which may be incurred in connection with the transfer of Shares in the Company.`);
  clause("5.2", `The Indemnifying Party undertakes to assist the Seller in any manner for the execution of this Agreement before any regulator or official authority.`);

  if (values.confidentiality === "yes") {
    clause("5.3", `The Parties shall maintain the confidentiality of all information obtained from each other, and not use such information for any purpose except to further the Transaction of Shares. This confidentiality clause shall survive for twelve (12) months after the Effective Date.`);
  }

  clause("5.4", `The relevant Parties shall exercise their voting rights to achieve the purpose of the Agreement and any requisite arrangement necessary for the execution of Agreement.`);
  clause("5.5", `The Agreement may only be amended or assigned by any Party upon written consent of all Parties hereto.`);
  clause("5.6", `Any waiver by any Party of any right shall not imply the waiver of any other right or subsequent waiver.`);
  clause("5.7", `Each Party agrees to do all acts for the execution of requisite documents as may be required or necessary to accomplish the objectives of this Agreement.`);

  const govLaw = values.state
    ? `${values.state}${values.country ? ", " + values.country.toUpperCase() : ""}`
    : u(values.country, "[Applicable Laws]");
  const courtCity = values.jurisdiction || values.agreementCity || "[City]";
  clause("5.8", `This Agreement is governed by the Applicable Laws of ${govLaw} and the courts at ${courtCity} shall have exclusive jurisdiction.`);

  // ── ADDITIONAL TERMS (optional) ───────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    articleHeading("6", "ADDITIONAL TERMS AND CONDITIONS");
    p(values.additionalTerms.trim());
  }

  // ── SIGNATURES ───────────────────────────────────────────────────────
  checkY(lineH + 6);
  y += 3;
  p(
    `IN WITNESS WHEREOF, the Parties hereto have caused this Agreement to be duly executed as of the date and year first written above.`,
    false, 0, 5
  );

  // Seller
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Seller:", margin, y);
  y += lineH + 2;
  field("Name",      u(values.party1Name, ""));
  field("Signature", u(values.party1Signature, ""));
  field("Date",      u(values.party1SignDate, ""));
  if (values.party1Cnic?.trim()) field("CNIC / ID No.", values.party1Cnic);

  y += 4;

  // Buyer
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Buyer:", margin, y);
  y += lineH + 2;
  field("Name",      u(values.party2Name, ""));
  field("Signature", u(values.party2Signature, ""));
  field("Date",      u(values.party2SignDate, ""));
  if (values.party2Cnic?.trim()) field("CNIC / ID No.", values.party2Cnic);

  y += 4;

  // Existing Shareholder (optional)
  if (values.existingShareholderSig?.trim() || values.existingShareholder?.trim()) {
    checkY(lineH * 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Existing Shareholder:", margin, y);
    y += lineH + 2;
    field("Name",      u(values.existingShareholder, ""));
    field("Signature", u(values.existingShareholderSig, ""));
    field("Date",      "");
    y += 4;
  }

  // Witnesses
  if (values.w1Name?.trim() || values.w2Name?.trim()) {
    checkY(lineH * 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Witnesses:", margin, y);
    y += lineH + 3;

    // Two-column witness layout
    const colW = (textW - 10) / 2;
    const col2 = margin + colW + 10;

    checkY(lineH * 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    if (values.w1Name?.trim()) {
      doc.text("Witness 1:", margin, y);
      if (values.w2Name?.trim()) doc.text("Witness 2:", col2, y);
      y += lineH + 1;

      // Name row
      doc.setFont("helvetica", "normal");
      doc.text("Name: ", margin, y);
      doc.line(margin + doc.getTextWidth("Name: "), y + 1.3, margin + colW, y + 1.3);
      doc.text(u(values.w1Name, ""), margin + doc.getTextWidth("Name: "), y);
      if (values.w2Name?.trim()) {
        doc.text("Name: ", col2, y);
        doc.line(col2 + doc.getTextWidth("Name: "), y + 1.3, col2 + colW, y + 1.3);
        doc.text(u(values.w2Name, ""), col2 + doc.getTextWidth("Name: "), y);
      }
      y += lineH + 3;

      // CNIC row
      doc.text("CNIC: ", margin, y);
      doc.line(margin + doc.getTextWidth("CNIC: "), y + 1.3, margin + colW, y + 1.3);
      if (values.w1Cnic?.trim()) doc.text(values.w1Cnic, margin + doc.getTextWidth("CNIC: "), y);
      if (values.w2Name?.trim()) {
        doc.text("CNIC: ", col2, y);
        doc.line(col2 + doc.getTextWidth("CNIC: "), y + 1.3, col2 + colW, y + 1.3);
        if (values.w2Cnic?.trim()) doc.text(values.w2Cnic, col2 + doc.getTextWidth("CNIC: "), y);
      }
      y += lineH + 2;
    }
  }

  doc.save("share_purchase_agreement.pdf");
};

export default function SharePurchaseAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Share Purchase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="sharepurchaseagreement"
    />
  );
}