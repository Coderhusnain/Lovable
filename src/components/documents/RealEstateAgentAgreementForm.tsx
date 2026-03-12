import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "sellerName", label: "Seller name", type: "text", required: true },
    { name: "sellerAddress", label: "Seller address", type: "text", required: true },
    { name: "agentName", label: "Agent name", type: "text", required: true },
    { name: "agentAddress", label: "Agent address", type: "text", required: true },
  ]},
  { label: "Property and Appointment", fields: [
    { name: "realProperty", label: "Real property description/address", type: "textarea", required: true },
    { name: "sellerInfoDisclosure", label: "Seller document disclosure note", type: "text", required: true },
  ]},
  { label: "Scope of Services", fields: [
    { name: "scopeServices", label: "Agent services scope", type: "textarea", required: true },
    { name: "cooperateBrokers", label: "Cooperate with other brokers text", type: "text", required: true },
    { name: "offerDisclosure", label: "Offer disclosure text", type: "text", required: true },
  ]},
  { label: "Compensation", fields: [
    { name: "commissionPercent", label: "Commission percent", type: "text", required: true },
    { name: "commissionProtection", label: "Commission protection text", type: "text", required: true },
    { name: "excludedTransactions", label: "Excluded transactions text", type: "text", required: true },
    { name: "refusalOfOffer", label: "Refusal of offer text", type: "text", required: true },
  ]},
  { label: "Legal Terms", fields: [
    { name: "expensesText", label: "Expenses clause", type: "text", required: true },
    { name: "independentContractorText", label: "Independent contractor clause", type: "text", required: true },
    { name: "employeesSubagentsText", label: "Employees/subagents clause", type: "text", required: true },
    { name: "indemnificationText", label: "Indemnification clause", type: "text", required: true },
    { name: "confidentialityText", label: "Confidentiality / return records / notices", type: "textarea", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "sellerSignName", label: "Seller signatory name", type: "text", required: true },
    { name: "sellerSignature", label: "Seller signature", type: "text", required: true },
    { name: "sellerDate", label: "Seller date", type: "date", required: true },
    { name: "agentSignName", label: "Agent signatory name", type: "text", required: true },
    { name: "agentSignature", label: "Agent signature", type: "text", required: true },
    { name: "agentDate", label: "Agent date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const width = 170;
  let y = 20;
  const u = (s?: string, n = 24) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "REAL ESTATE AGENT AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`This Real Estate Agent Agreement ("Agreement") is entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between ${u(v.sellerName)}, with an address at ${u(v.sellerAddress)} ("Seller"), and ${u(v.agentName)}, with an address at ${u(v.agentAddress)} ("Agent").`);
  add("The Seller and Agent may be referred to individually as a \"Party\" and collectively as the \"Parties.\"");

  add("1. RECITALS", true);
  add(`WHEREAS, the Seller is the owner of certain real property, together with all improvements thereon, commonly known as ${u(v.realProperty)} (the "Real Property");`);
  add("WHEREAS, the Agent is experienced in marketing, advertising, negotiating, and selling real estate;");
  add("WHEREAS, the Seller desires to engage the Agent to market and sell the Real Property, and the Agent agrees to provide such services under the terms and conditions set forth herein;");
  add("NOW, THEREFORE, in consideration of the mutual covenants and promises, the Parties agree as follows:");

  add("2. APPOINTMENT AND GRANT OF AUTHORITY", true);
  add("2.1 Seller appoints Agent as Seller's agent for marketing and selling the Real Property.");
  add(`2.2 Seller shall promptly provide Agent with documents/records/information relating to the Real Property: ${u(v.sellerInfoDisclosure)}.`);

  add("3. SCOPE OF SERVICES", true);
  add("3.1 The Seller shall refer to the Agent all inquiries, offers, and negotiations relating to the Real Property, including inquiries from other brokers or prospective purchasers.");
  add(`3.2 The Agent shall investigate and develop offers, market and promote the Real Property, solicit potential purchasers, conduct negotiations on behalf of Seller, and use commercially reasonable efforts to procure a purchaser. Service details: ${u(v.scopeServices)}.`);
  add(`3.3 ${u(v.cooperateBrokers)}.`);
  add(`3.4 ${u(v.offerDisclosure)}.`);

  add("4. TERM OF AGREEMENT", true);
  add("This Agreement shall commence on the Effective Date and remain in effect until terminated in accordance with this Agreement.");

  add("5. PERFORMANCE OF SERVICES", true);
  add("The manner, method, and means by which the Agent performs the Services shall be determined solely by the Agent. The Agent shall devote such time and effort as reasonably necessary to fulfill obligations under this Agreement.");

  add("6. COMPENSATION", true);
  add(`6.1 Commission: Seller agrees to pay Agent a commission equal to ${u(v.commissionPercent, 6)}% of the gross sales price if sale is consummated due to Agent efforts.`);
  add(`6.2 Commission Protection: ${u(v.commissionProtection)}.`);
  add(`6.3 Excluded Transactions: ${u(v.excludedTransactions)}.`);
  add(`6.4 Refusal of Offer: ${u(v.refusalOfOffer)}.`);

  add("7. EXPENSES", true);
  add(u(v.expensesText));
  add("8. INDEPENDENT CONTRACTOR RELATIONSHIP", true);
  add(u(v.independentContractorText));
  add("9. EMPLOYEES AND SUBAGENTS", true);
  add(u(v.employeesSubagentsText));
  add("10. INDEMNIFICATION", true);
  add(u(v.indemnificationText));
  add("11. ASSIGNMENT", true);
  add("Agent may not assign/transfer this Agreement without prior written consent of Seller.");
  add("12. CONFIDENTIALITY", true);
  add(u(v.confidentialityText));
  add("13. RETURN OF RECORDS", true);
  add("Upon termination, Agent shall promptly return all documents, records, data, and materials belonging to Seller.");
  add("14. NOTICES", true);
  add("All notices shall be in writing and deemed given when delivered personally or sent by certified mail to addresses listed above.");
  add("15. ENTIRE AGREEMENT", true);
  add("This Agreement constitutes the entire agreement and supersedes prior oral/written agreements relating to subject matter herein.");
  add("16. AMENDMENTS", true);
  add("This Agreement may be amended only by written instrument signed by both Parties.");
  add("17. SEVERABILITY", true);
  add("If any provision is invalid or unenforceable, remaining provisions remain in full force and effect.");
  add("19. EXCULPATION", true);
  add("The Agent shall look solely to the Seller's interest in the Real Property for satisfaction of claims arising under this Agreement.");
  add("20. WAIVER", true);
  add("Failure of either Party to enforce any provision shall not constitute waiver of future enforcement of that or any other provision.");
  add("21. GOVERNING LAW", true);
  add(`These clauses apply in full. Governing law is the laws of the State of ${u(v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}.`);

  add("22. EXECUTION", true);
  add("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  add(`SELLER Name: ${u(v.sellerSignName)} | Signature: ${u(v.sellerSignature)} | Date: ${u(v.sellerDate)}`);
  add(`AGENT  Name: ${u(v.agentSignName)} | Signature: ${u(v.agentSignature)} | Date: ${u(v.agentDate)}`);

  doc.save("real_estate_agent_agreement.pdf");
};

export default function RealEstateAgentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Agent Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="realestateagentagreement"
    />
  );
}

