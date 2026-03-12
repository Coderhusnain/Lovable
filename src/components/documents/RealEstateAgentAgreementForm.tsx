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
      { name: "sellerName", label: "Seller Name", type: "text", required: true },
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
      { name: "agentName", label: "Agent Name", type: "text", required: true },
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
      { name: "realProperty", label: "Real Property Description/Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Appointment and Services",
    fields: [
      { name: "commissionPercent", label: "Commission Percentage (%)", type: "text", required: true, placeholder: "___" },
      { name: "priorNegotiationPerson", label: "Excluded Prior-Negotiation Person Name", type: "text", required: true },
      { name: "approvedPrice", label: "Seller Approved Price", type: "text", required: true },
    ],
  },
  {
    label: "Term Performance and Compensation",
    fields: [
      {
        name: "expensesOverride",
        label: "Expenses Clause Override (optional)",
        type: "textarea",
        required: false,
        placeholder: "Leave blank to use original clause text exactly.",
      },
    ],
  },
  {
    label: "Legal Clauses",
    fields: [
      {
        name: "assignmentConsentParty",
        label: "Assignment Consent Authority (optional override)",
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
      { name: "sellerSignature", label: "Seller Signature", type: "text", required: true },
      { name: "sellerDate", label: "Seller Date", type: "text", required: true, placeholder: "_________________________" },
      { name: "agentSignName", label: "Agent Name (Signature Block)", type: "text", required: true },
      { name: "agentSignature", label: "Agent Signature", type: "text", required: true },
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

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.25;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE AGENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  p(
    `This Real Estate Agent Agreement ("Agreement") is entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between: ${u(v.sellerName)}, with an address at ${u(v.sellerStreetAddress)}, ${u(v.sellerCity)}, ${u(v.sellerState)}, ${u(v.sellerCountry)} ("Seller"), and ${u(v.agentName)}, with an address at ${u(v.agentStreetAddress)}, ${u(v.agentCity)}, ${u(v.agentState)}, ${u(v.agentCountry)} ("Agent").`
  );
  p("The Seller and Agent may be referred to individually as a \"Party\" and collectively as the \"Parties.\"");

  p("1. RECITALS", true);
  p("WHEREAS, the Seller is the owner of certain real property, together with all improvements thereon, commonly known as:");
  p(u(v.realProperty));
  p("(the \"Real Property\"); and");
  p("WHEREAS, the Agent is experienced in marketing, advertising, negotiating, and selling real estate; and");
  p("WHEREAS, the Seller desires to engage the Agent to market and sell the Real Property, and the Agent agrees to provide such services under the terms and conditions set forth herein;");
  p("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:");

  p("2. APPOINTMENT AND GRANT OF AUTHORITY", true);
  p("2.1 The Seller hereby appoints the Agent as the Seller's agent for the purpose of marketing and selling the Real Property, subject to the terms of this Agreement.");
  p("2.2 The Seller shall promptly provide the Agent with all documents, records, and information in the Seller's possession relating to the Real Property that may be necessary for marketing or sale.");

  p("3. SCOPE OF SERVICES", true);
  p("3.1 The Seller shall refer to the Agent all inquiries, offers, and negotiations relating to the Real Property, including inquiries from other brokers or prospective purchasers.");
  p("3.2 The Agent shall:");
  p("- Investigate and develop offers for the Real Property;");
  p("- Market and promote the Real Property;");
  p("- Solicit potential purchasers;");
  p("- Conduct negotiations on behalf of the Seller; and");
  p("- Use commercially reasonable efforts to procure a purchaser.");
  p("3.3 The Agent is authorized to cooperate with and enlist the assistance of other licensed real estate brokers as deemed appropriate.");
  p("3.4 The Agent shall promptly disclose to the Seller all offers received and any proposed purchase price or material terms.");

  p("4. TERM OF AGREEMENT", true);
  p("This Agreement shall commence on the Effective Date and shall remain in effect until terminated in accordance with this Agreement.");

  p("5. PERFORMANCE OF SERVICES", true);
  p("The manner, method, and means by which the Agent performs the Services shall be determined solely by the Agent. The Agent shall devote such time and effort as reasonably necessary to fulfill the obligations of this Agreement.");

  p("6. COMPENSATION", true);
  p(`6.1 Commission. The Seller agrees to pay the Agent a commission equal to ${u(v.commissionPercent, 3)}% of the gross sales price of the Real Property if the sale is consummated as a result of the Agent's efforts.`);
  p("6.2 Commission Protection. If, after termination of this Agreement, the Seller sells the Real Property to any purchaser introduced to the Property by the Agent during the term of this Agreement, the Agent shall be entitled to the full commission.");
  p(`6.3 Excluded Transactions. The Seller reserves the right to sell the Real Property to any person with whom the Seller was negotiating prior to the Effective Date (${u(v.priorNegotiationPerson)}). In such event, no commission shall be owed to the Agent.`);
  p(`6.4 Refusal of Offer. If the Seller rejects a bona fide offer at or above the Seller's approved price (${u(v.approvedPrice)}) during the term of this Agreement, and the property is later sold to that same purchaser, the Agent shall be entitled to full commission.`);

  p("7. EXPENSES", true);
  p((v.expensesOverride || "").trim() || "Unless otherwise agreed in writing, the Agent shall be responsible for all out-of-pocket expenses incurred in connection with the performance of services under this Agreement.");

  p("8. INDEPENDENT CONTRACTOR RELATIONSHIP", true);
  p("The Agent is an independent contractor and not an employee of the Seller. Nothing in this Agreement shall be construed as creating an employer-employee, partnership, or joint venture relationship.");
  p("The Seller shall not be responsible for employee benefits, taxes, insurance, or withholdings of any kind.");

  p("9. EMPLOYEES AND SUBAGENTS", true);
  p("Any employees or subagents engaged by the Agent shall be under the Agent's sole direction and control. Upon request, the Agent shall provide proof of employment or engagement of such persons.");

  p("10. INDEMNIFICATION", true);
  p("The Agent shall indemnify and hold harmless the Seller from any claims, damages, losses, liabilities, or expenses, including reasonable attorneys' fees, arising out of the Agent's negligence, misconduct, or breach of this Agreement.");

  p("11. ASSIGNMENT", true);
  p(`The Agent may not assign or transfer this Agreement, in whole or in part, without the prior written consent of ${u(v.assignmentConsentParty || "Seller")}.`);

  p("12. CONFIDENTIALITY", true);
  p("The Agent agrees to keep all non-public information relating to the Real Property and the Seller confidential and shall not disclose such information to any third party without prior written consent.");
  p("This obligation shall survive termination of this Agreement.");

  p("13. RETURN OF RECORDS", true);
  p("Upon termination of this Agreement, the Agent shall promptly return all documents, records, data, and materials belonging to the Seller.");

  p("14. NOTICES", true);
  p("All notices under this Agreement shall be in writing and deemed given when delivered personally or sent by certified mail to the addresses of the Parties listed above.");

  p("15. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.");

  p("16. AMENDMENTS", true);
  p("This Agreement may be amended only by a written instrument signed by both Parties.");

  p("17. SEVERABILITY", true);
  p("If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");

  p("19. EXCULPATION", true);
  p("The Agent shall look solely to the Seller's interest in the Real Property for satisfaction of any claims arising under this Agreement.");

  p("20. WAIVER", true);
  p("The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.");

  p("21. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)} (${u(v.governingLawCountry)}).`);

  p("22. EXECUTION", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  p("SELLER", true);
  p(`Name: ${u(v.sellerSignName)}`);
  p(`Signature: ${u(v.sellerSignature)}`);
  p(`Date: ${u(v.sellerDate, 12)}`);
  p("AGENT", true);
  p(`Name: ${u(v.agentSignName)}`);
  p(`Signature: ${u(v.agentSignature)}`);
  p(`Date: ${u(v.agentDate, 12)}`);

  if ((v.clauseNotes || "").trim()) {
    p("Additional Notes:", true);
    p(v.clauseNotes);
  }
  if ((v.reviewNote || "").trim()) {
    p("Final Review Note:", true);
    p(v.reviewNote);
  }

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

