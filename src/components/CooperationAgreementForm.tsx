import { FormWizard, FieldDef } from "./FormWizard";
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
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Date and Jurisdiction",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawJurisdiction", label: "Governing Law Jurisdiction", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Parties and Objectives",
    fields: [
      { name: "firstPartyName", label: "First Party Name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First Party Principal Place of Business", type: "textarea", required: true },
      { name: "secondPartyName", label: "Second Party Name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second Party Principal Place of Business", type: "textarea", required: true },
      { name: "termPeriod", label: "Agreement Duration", type: "text", required: true, placeholder: "Specify Period" },
      { name: "purpose", label: "Purpose / Project / Collaboration", type: "textarea", required: true },
      { name: "arbitrationBody", label: "Arbitration Body", type: "text", required: true },
    ],
  },
  {
    label: "Obligations and Confidentiality",
    fields: [
      { name: "obligationNotes", label: "Obligations/confidentiality notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Default, Liability and Indemnity",
    fields: [
      { name: "defaultCureDays", label: "Default Cure Days", type: "text", required: true, placeholder: "Specify Number" },
      { name: "defaultNotes", label: "Default/liability notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Dispute and General Clauses",
    fields: [
      { name: "generalClausesNotes", label: "General clauses notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatories and Witnesses",
    fields: [
      { name: "firstSignName", label: "First Party Name", type: "text", required: true },
      { name: "firstSignTitle", label: "First Party Title", type: "text", required: true },
      { name: "firstSignature", label: "First Party Signature", type: "text", required: true },
      { name: "firstSignDate", label: "First Party Date", type: "date", required: true },
      { name: "secondSignName", label: "Second Party Name", type: "text", required: true },
      { name: "secondSignTitle", label: "Second Party Title", type: "text", required: true },
      { name: "secondSignature", label: "Second Party Signature", type: "text", required: true },
      { name: "secondSignDate", label: "Second Party Date", type: "date", required: true },
      { name: "witness1Name", label: "Witness 1 Name", type: "text", required: true },
      { name: "witness1Id", label: "Witness 1 CNIC/ID No.", type: "text", required: true },
      { name: "witness1Signature", label: "Witness 1 Signature", type: "text", required: true },
      { name: "witness1Date", label: "Witness 1 Date", type: "date", required: true },
      { name: "witness2Name", label: "Witness 2 Name", type: "text", required: true },
      { name: "witness2Id", label: "Witness 2 CNIC/ID No.", type: "text", required: true },
      { name: "witness2Signature", label: "Witness 2 Signature", type: "text", required: true },
      { name: "witness2Date", label: "Witness 2 Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "finalNotes", label: "Final notes (optional)", type: "textarea", required: false }],
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
    doc.setFontSize(10.35);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("times", "normal");
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(show), y + 1);
    y += 6.2;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "COOPERATION AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Effective Date: ", v.effectiveDate);
  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  p(`This Cooperation Agreement (the "Agreement") is entered into as of ${u(v.effectiveDate, 12)} (the "Effective Date") by and between:`);
  p(`- ${u(v.firstPartyName)}, having its principal place of business at ${u(v.firstPartyAddress)} (hereinafter referred to as the "First Party"); and`);
  p(`- ${u(v.secondPartyName)}, having its principal place of business at ${u(v.secondPartyAddress)} (hereinafter referred to as the "Second Party").`);
  p('Collectively, the First Party and Second Party are hereinafter referred to as the "Parties" and individually as a "Party."');

  p("1. TERM OF AGREEMENT", true);
  p("1.1 Duration");
  p(`This Agreement shall remain in full force and effect for a period of ${u(v.termPeriod)}, unless earlier terminated pursuant to the provisions set forth herein.`);
  p("1.2 Early Termination");
  p("Either Party may terminate this Agreement in the event of a material breach by the other Party that is not remedied within thirty (30) days following written notice of such breach. Termination of a portion of this Agreement shall not affect obligations under other provisions unless the breach materially deprives the non-breaching Party of substantially all benefits of this Agreement. Termination shall not relieve the Parties from obligations regarding confidentiality or other restrictive covenants.");

  p("2. PURPOSE AND OBJECTIVES", true);
  p(`The Parties agree to cooperate in connection with ${u(v.purpose)}. The objectives of this Agreement are to:`);
  p("- Define the scope of collaboration.");
  p("- Allocate responsibilities and obligations between the Parties.");
  p("- Establish mechanisms for information sharing, confidentiality, and dispute resolution.");

  p("3. OBLIGATIONS OF THE PARTIES", true);
  p("3.1 First Party Responsibilities");
  p("The First Party shall:");
  p("- Perform and deliver the services and duties outlined in Schedule A attached hereto.");
  p("- Comply with all applicable laws, regulations, and standards.");
  p("- Provide timely reports, updates, and requested information to the Second Party.");
  p("3.2 Second Party Responsibilities");
  p("The Second Party shall:");
  p("- Perform and deliver the services and duties outlined in Schedule B attached hereto.");
  p("- Cooperate fully with the First Party to achieve the objectives of this Agreement.");
  p("- Maintain accurate records of all activities related to the collaboration and make them available for inspection upon request.");

  p("4. EXCHANGE OF INFORMATION AND CONFIDENTIALITY", true);
  p("4.1 Confidentiality Obligations");
  p("Each Party acknowledges that it may receive confidential, proprietary, or sensitive information from the other Party (\"Confidential Information\"). Each Party agrees to:");
  p("- Maintain such information in strict confidence.");
  p("- Use the Confidential Information solely for the purposes of this Agreement.");
  p("- Take all reasonable measures to prevent disclosure to third parties.");
  p("4.2 Exceptions");
  p("Confidentiality shall not apply to information that:");
  p("- Is publicly available through no fault of the receiving Party;");
  p("- Is lawfully obtained from a third party without restriction;");
  p("- Is required to be disclosed by law or government authority, provided the other Party is notified promptly.");
  p("4.3 Return of Materials");
  p("Upon request, all Confidential Information, materials, and documentation must be returned to the disclosing Party or destroyed, with confirmation in writing.");
  if ((v.obligationNotes || "").trim()) p(v.obligationNotes);

  p("5. RELATIONSHIP OF THE PARTIES", true);
  p("Nothing in this Agreement shall be deemed to create a partnership, joint venture, agency, or employment relationship between the Parties. Neither Party shall have authority to bind the other Party in any manner except as expressly provided herein.");

  p("6. CONSIDERATION", true);
  p("This Agreement is made in consideration of the mutual covenants, promises, and obligations contained herein and any additional consideration set forth in Schedule C, which the Parties acknowledge as sufficient and adequate.");

  p("7. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents and warrants that:");
  p("- It has full legal power, authority, and capacity to enter into and perform this Agreement.");
  p("- All necessary corporate or internal approvals have been obtained.");
  p("- This Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms.");
  p("- It shall act in good faith to fulfill the purposes and objectives of this Agreement.");

  p("8. DEFAULT AND REMEDIES", true);
  p("8.1 Events of Default");
  p("A material default shall occur if a Party:");
  p("- Fails to make required payments when due;");
  p("- Becomes insolvent, bankrupt, or subject to receivership;");
  p("- Has its property seized, levied upon, or assigned for creditor benefit;");
  p("- Fails to deliver or perform the Services in accordance with the terms of this Agreement.");
  p("8.2 Cure Period and Remedies");
  p(`The non-defaulting Party may provide written notice specifying the default. The defaulting Party shall have ${u(v.defaultCureDays, 2)} days from receipt of such notice to cure the default. If uncured, the non-defaulting Party may terminate this Agreement and pursue any other remedies available under law or equity.`);
  if ((v.defaultNotes || "").trim()) p(v.defaultNotes);

  p("9. LIMITATION OF LIABILITY", true);
  p("Neither Party shall be liable for indirect, incidental, consequential, special, or exemplary damages, including loss of revenue, anticipated profits, or business interruption, arising from or in connection with this Agreement, whether in contract, tort, or otherwise.");

  p("10. INDEMNIFICATION", true);
  p("Each Party shall indemnify, defend, and hold harmless the other Party, its affiliates, officers, directors, employees, and agents against any third-party claims, liabilities, damages, losses, costs, or expenses arising out of or relating to:");
  p("- Breach of this Agreement;");
  p("- Negligence, willful misconduct, or fraud;");
  p("- Violation of applicable laws or regulations.");

  p("11. FORCE MAJEURE", true);
  p('Performance may be suspended or excused for events beyond a Party\'s reasonable control ("Force Majeure"), including but not limited to acts of God, epidemics, pandemics, public health emergencies, war, terrorism, civil unrest, fire, explosion, strikes, or governmental actions. The affected Party shall:');
  p("- Notify the other Party promptly;");
  p("- Use reasonable efforts to mitigate the impact and resume performance as soon as possible.");

  p("12. DISPUTE RESOLUTION AND ARBITRATION", true);
  p("The Parties agree to first attempt resolution of any dispute through good faith negotiations. If unresolved, the Parties shall submit the dispute to mediation. If mediation fails, the dispute shall be finally resolved by binding arbitration under the Commercial Arbitration Rules of " + u(v.arbitrationBody) + ", and the award shall be final and binding.");

  p("13. NOTICE", true);
  p("Any notice required or permitted under this Agreement shall be deemed effective if delivered personally, by courier, or sent via certified mail (return receipt requested) to the addresses set forth above, or to any other address designated in writing. Notices are deemed received:");
  p("- Upon delivery if in person;");
  p("- On the date of receipt by courier; or");
  p("- Three (3) days after mailing by certified mail.");

  p("14. ASSIGNMENT", true);
  p("Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party, which consent shall not be unreasonably withheld.");

  p("15. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements, promises, or representations relating to its subject matter.");

  p("16. SEVERABILITY", true);
  p("If any provision of this Agreement is found invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall remain in full force and effect. The invalid provision shall, where possible, be construed or limited to make it valid and enforceable.");

  p("17. AMENDMENT", true);
  p("This Agreement may be modified, amended, or supplemented only by a written document executed by both Parties.");

  p("18. WAIVER", true);
  p("Failure to enforce any provision of this Agreement shall not constitute a waiver of any Party's right to subsequently enforce strict compliance with that or any other provision.");

  p("19. GOVERNING LAW", true);
  p(`This Agreement shall be governed, construed, and enforced in accordance with the laws of ${u(v.governingLawJurisdiction)}, without regard to conflict of laws principles.`);
  if ((v.generalClausesNotes || "").trim()) p(v.generalClausesNotes);

  p("20. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Cooperation Agreement as of the Effective Date.");
  p("FIRST PARTY", true);
  uf("Name: ", v.firstSignName);
  uf("Title: ", v.firstSignTitle);
  uf("Signature: ", v.firstSignature);
  uf("Date: ", v.firstSignDate);
  p("SECOND PARTY", true);
  uf("Name: ", v.secondSignName);
  uf("Title: ", v.secondSignTitle);
  uf("Signature: ", v.secondSignature);
  uf("Date: ", v.secondSignDate);
  p("WITNESSES", true);
  p("1.");
  uf("Name: ", v.witness1Name);
  uf("CNIC/ID No.: ", v.witness1Id);
  uf("Signature: ", v.witness1Signature);
  uf("Date: ", v.witness1Date);
  p("2.");
  uf("Name: ", v.witness2Name);
  uf("CNIC/ID No.: ", v.witness2Id);
  uf("Signature: ", v.witness2Signature);
  uf("Date: ", v.witness2Date);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("cooperation_agreement.pdf");
};

export default function CooperationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Cooperation Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="cooperationagreement"
      preserveStepLayout
    />
  );
}
