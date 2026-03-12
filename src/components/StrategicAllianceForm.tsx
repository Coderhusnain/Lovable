export { default } from "./DomesticServiceAndMoaForm";
/*
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Execution and Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
      { name: "executionDay", label: "Execution day", type: "number", required: true, placeholder: "23" },
      { name: "executionMonth", label: "Execution month", type: "text", required: true, placeholder: "June" },
      { name: "executionYear", label: "Execution year", type: "number", required: true, placeholder: "2025" },
      { name: "executionPlace", label: "Execution place", type: "text", required: true, placeholder: "Islamabad" },
    ],
  },
  {
    label: "Domestic Parties and Employment",
    fields: [
      { name: "masterName", label: "Master full name", type: "text", required: true },
      { name: "masterAddress", label: "Master full residential address", type: "textarea", required: true },
      { name: "servantName", label: "Servant full name", type: "text", required: true },
      {
        name: "servantRelationType",
        label: "Servant relation type",
        type: "select",
        required: true,
        options: [
          { value: "son", label: "Son of" },
          { value: "daughter", label: "Daughter of" },
          { value: "wife", label: "Wife of" },
        ],
      },
      { name: "servantRelationName", label: "Servant relation name", type: "text", required: true },
      { name: "servantAddress", label: "Servant full residential address", type: "textarea", required: true },
      { name: "employmentAddress", label: "Place of employment address", type: "textarea", required: true },
    ],
  },
  {
    label: "Duties and Conduct",
    fields: [
      {
        name: "dutyExtra",
        label: "Any additional domestic tasks",
        type: "textarea",
        required: false,
        placeholder: "Add any other related domestic tasks assigned by the Master",
      },
      {
        name: "conductExtra",
        label: "Any additional code of conduct terms",
        type: "textarea",
        required: false,
      },
      {
        name: "prohibitedExtra",
        label: "Any additional prohibited conduct terms",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Remuneration and Domestic Term",
    fields: [
      { name: "monthlyPackage", label: "Monthly package amount", type: "text", required: true, placeholder: "PKR ______" },
      { name: "salaryPaymentDay", label: "Salary payment day of month", type: "number", required: true, placeholder: "5" },
      { name: "termYears", label: "Domestic agreement term in years", type: "number", required: true, placeholder: "2" },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "number", required: true, placeholder: "30" },
      {
        name: "governingLawDomestic",
        label: "Domestic agreement governing law text",
        type: "text",
        required: true,
        placeholder: "laws of state",
      },
    ],
  },
  {
    label: "Domestic Signatories and Witnesses",
    fields: [
      { name: "masterSignName", label: "Master signatory name", type: "text", required: true },
      { name: "masterSignature", label: "Master signature text", type: "text", required: true },
      { name: "masterCnic", label: "Master CNIC no.", type: "text", required: true },
      { name: "servantSignName", label: "Servant signatory name", type: "text", required: true },
      { name: "servantSignature", label: "Servant signature text", type: "text", required: true },
      { name: "servantCnic", label: "Servant CNIC no.", type: "text", required: true },
      { name: "dw1Name", label: "Witness 1 name", type: "text", required: true },
      { name: "dw1Signature", label: "Witness 1 signature text", type: "text", required: true },
      { name: "dw1Cnic", label: "Witness 1 CNIC no.", type: "text", required: true },
      { name: "dw2Name", label: "Witness 2 name", type: "text", required: true },
      { name: "dw2Signature", label: "Witness 2 signature text", type: "text", required: true },
      { name: "dw2Cnic", label: "Witness 2 CNIC no.", type: "text", required: true },
    ],
  },
  {
    label: "MOA Parties and Core Terms",
    fields: [
      { name: "moaEffectiveDate", label: "MOA effective date", type: "date", required: true },
      { name: "firstPartyName", label: "First Party name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First Party principal place of business", type: "textarea", required: true },
      { name: "secondPartyName", label: "Second Party name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second Party principal place of business", type: "textarea", required: true },
      { name: "moaTerm", label: "MOA term", type: "text", required: true, placeholder: "12 months" },
      { name: "goal1", label: "Goal 1", type: "text", required: true },
      { name: "goal2", label: "Goal 2", type: "text", required: true },
      { name: "goal3", label: "Additional objective", type: "text", required: false },
      { name: "workProductOwner", label: "Work Product owner", type: "text", required: true, placeholder: "First Party / Second Party / Jointly" },
      { name: "defaultCureDays", label: "Default cure days", type: "number", required: true, placeholder: "30" },
      { name: "governingLawMoa", label: "MOA governing law jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "MOA Signatories and Witnesses",
    fields: [
      { name: "firstPartySignName", label: "First Party signatory name", type: "text", required: true },
      { name: "firstPartyTitle", label: "First Party signatory title", type: "text", required: true },
      { name: "firstPartySignature", label: "First Party signature text", type: "text", required: true },
      { name: "firstPartyDate", label: "First Party sign date", type: "date", required: true },
      { name: "secondPartySignName", label: "Second Party signatory name", type: "text", required: true },
      { name: "secondPartyTitle", label: "Second Party signatory title", type: "text", required: true },
      { name: "secondPartySignature", label: "Second Party signature text", type: "text", required: true },
      { name: "secondPartyDate", label: "Second Party sign date", type: "date", required: true },
      { name: "mw1Name", label: "MOA witness 1 name", type: "text", required: true },
      { name: "mw1Id", label: "MOA witness 1 CNIC/ID no.", type: "text", required: true },
      { name: "mw1Signature", label: "MOA witness 1 signature text", type: "text", required: true },
      { name: "mw1Date", label: "MOA witness 1 date", type: "date", required: true },
      { name: "mw2Name", label: "MOA witness 2 name", type: "text", required: true },
      { name: "mw2Id", label: "MOA witness 2 CNIC/ID no.", type: "text", required: true },
      { name: "mw2Signature", label: "MOA witness 2 signature text", type: "text", required: true },
      { name: "mw2Date", label: "MOA witness 2 date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 16;
  const textWidth = pageWidth - margin * 2;
  const lineHeight = 5.4;
  const pageBottom = 282;
  let y = 18;

  const u = (value?: string, min = 12) => {
    const t = (value || "").trim();
    return t || "_".repeat(min);
  };

  const ensure = (need = 10) => {
    if (y + need > pageBottom) {
      doc.addPage();
      y = 18;
    }
  };

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, textWidth);
    ensure(lines.length * lineHeight + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  const uf = (label: string, value?: string, min = 16) => {
    ensure(7);
    const labelText = `${label}: `;
    doc.setFont("times", "normal");
    doc.setFontSize(10.4);
    doc.text(labelText, margin, y);
    const x = margin + doc.getTextWidth(labelText);
    const fill = u(value, min);
    doc.text(fill, x, y);
    doc.line(x, y + 1.1, x + doc.getTextWidth(fill), y + 1.1);
    y += 6.1;
  };

  const jurisdiction = `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`;
  const rel = (v.servantRelationType || "son").toLowerCase();
  const relLabel = rel === "daughter" ? "daughter of" : rel === "wife" ? "wife of" : "son of";

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const titleA = "DOMESTIC SERVICE AGREEMENT";
  doc.text(titleA, pageWidth / 2, y, { align: "center" });
  const titleAW = doc.getTextWidth(titleA);
  doc.line(pageWidth / 2 - titleAW / 2, y + 1.1, pageWidth / 2 + titleAW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction", jurisdiction);

  p(
    `This Agreement is made on this ${u(v.executionDay, 2)} day of ${u(v.executionMonth, 5)} ${u(v.executionYear, 4)}, at ${u(v.executionPlace, 8)}, by and between:`
  );
  p(`Party One, ${u(v.masterName)}, residing at ${u(v.masterAddress)}, hereinafter referred to as the "Master",`);
  p("AND", true);
  p(
    `Party Two, ${u(v.servantName)}, ${relLabel} ${u(v.servantRelationName)}, residing at ${u(v.servantAddress)}, hereinafter referred to as the "Servant".`
  );
  p('Collectively referred to as the "Parties".');

  p("Purpose of the Agreement", true);
  p(
    "The Master agrees to employ the Servant as a domestic worker, responsible for carrying out general household duties and safeguarding the Master's premises. In consideration thereof, the Master shall provide a designated portion of the residence within the premises for the Servant's accommodation, subject to the terms and conditions stipulated in this Agreement."
  );

  p("Place of Employment", true);
  p("The Servant is employed at the residence of the Master located at:");
  p(u(v.employmentAddress, 20));

  p("Duties and Responsibilities", true);
  p("The Servant agreed to perform the following duties:");
  p("- Cleaning and maintenance of the house");
  p("- Washing clothes and dishes");
  p("- Cooking or assisting in food preparation");
  p("- Elderly care");
  p("- Grocery shopping or errands, if instructed;");
  p(`- Any other related domestic tasks assigned by the Master${v.dutyExtra ? `; ${v.dutyExtra}` : ""}`);

  p("Code of Conduct", true);
  p("The Servant agreed and undertook as follows:");
  p("- To maintain discipline, honesty, and confidentiality in all matters pertaining to the household;");
  p("- Not to invite or allow any guest or outsider to enter the premises without the prior consent of the Master;");
  p("- To refrain from causing any damage to the property and from engaging in any unlawful or illegal activity;");
  p("- Not to allow entry into the premises of any individual, including the Servant's son, who is involved in or facing any criminal charges or proceedings;");
  p("- Not to leave the premises of the house without the prior permission or approval of the Master;");
  p("- To behave respectfully and courteously towards the Master at all times, and to refrain from any form of misconduct or misbehavior;");
  p("- Not to use the address of the Master's residence for any purpose, including but not limited to correspondence, legal documentation, or as proof of residence, nor to represent any affiliation or connection with the Master or the premises without express written permission.");
  if ((v.conductExtra || "").trim()) p(`- Additional conduct term: ${v.conductExtra}`);

  p("Remuneration", true);
  p(
    `The Master is paying the Servant a monthly package of ${u(v.monthlyPackage, 10)} on ${u(v.salaryPaymentDay, 1)}th of each month. It includes salary, a portion of house to stay including free electricity as well as gas utilities.`
  );

  p("Prohibited Conduct", true);
  p("The following actions are strictly prohibited and may result in immediate termination:");
  p("- Theft or misuse of the Master's belongings;");
  p("- Physical or verbal abuse;");
  p("- Use or possession of intoxicating substances;");
  p("- Bringing outsiders without permission;");
  p("- Misrepresentation of identity or use of false documents.");
  if ((v.prohibitedExtra || "").trim()) p(`- Additional prohibited term: ${v.prohibitedExtra}`);

  p("Duration and Termination", true);
  p(
    `This agreement shall be valid for a period of ${u(v.termYears, 1)} (${u(v.termYears, 1)}) years from the date of signing and may be renewed with mutual consent.`
  );
  p(`- Either party may terminate this agreement with ${u(v.terminationNoticeDays, 2)} days notice or salary in lieu thereof.`);
  p("- The Master reserves the right to terminate the Agreement immediately in case of misconduct, breach of trust, or violation of any term of this Agreement.");

  p("Miscellaneous", true);
  p("- This Agreement constitutes the entire understanding between the Parties.");
  p("- Any modification must be in writing and signed by both Parties.");
  p(`- This Agreement shall be governed by the ${u(v.governingLawDomestic, 10)}.`);

  p("Acknowledgment", true);
  p(
    "The Servant acknowledges that she has read, understood, and voluntarily agreed to the terms and conditions of this Agreement and signs it in full acceptance thereof."
  );
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement on the day, month, and year first written above.");

  p("MASTER", true);
  uf("Name", v.masterSignName, 22);
  uf("Signature", v.masterSignature, 22);
  uf("CNIC No.", v.masterCnic, 15);
  p("SERVANT", true);
  uf("Name", v.servantSignName, 22);
  uf("Signature", v.servantSignature, 22);
  uf("CNIC No.", v.servantCnic, 15);

  p("1. WITNESS", true);
  uf("Name", v.dw1Name, 22);
  uf("Signature", v.dw1Signature, 22);
  uf("CNIC No.", v.dw1Cnic, 15);
  p("2. WITNESS", true);
  uf("Name", v.dw2Name, 22);
  uf("Signature", v.dw2Signature, 22);
  uf("CNIC No.", v.dw2Cnic, 15);

  ensure(16);
  y += 3;
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const titleB = "MEMORANDUM OF AGREEMENT";
  doc.text(titleB, pageWidth / 2, y, { align: "center" });
  const titleBW = doc.getTextWidth(titleB);
  doc.line(pageWidth / 2 - titleBW / 2, y + 1.1, pageWidth / 2 + titleBW / 2, y + 1.1);
  y += 10;

  p(
    `This Memorandum of Agreement (the "Agreement") is made and entered into as of ${u(v.moaEffectiveDate, 12)}, by and between:`
  );
  p(`- ${u(v.firstPartyName)}, having its principal place of business at ${u(v.firstPartyAddress)} (hereinafter referred to as the "First Party"); and`);
  p(`- ${u(v.secondPartyName)}, having its principal place of business at ${u(v.secondPartyAddress)} (hereinafter referred to as the "Second Party");`);
  p('Collectively referred to as the "Parties" and individually as a "Party."');
  p("The Parties hereby agree to be bound by the terms and conditions set forth herein for the purpose of defining their respective rights, obligations, and responsibilities.");

  p("1. TERM OF AGREEMENT", true);
  p("1.1 Duration", true);
  p(`This Agreement shall remain in full force and effect for a period of ${u(v.moaTerm, 8)} (the "Term"), unless earlier terminated in accordance with the provisions herein.`);
  p("1.2 Early Termination", true);
  p(
    "Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach. Termination of a portion of this Agreement shall not affect other provisions unless the breach results in the substantial loss of the Agreement's overall value to the non-breaching Party."
  );
  p("Termination shall not relieve either Party from obligations concerning confidentiality, non-disclosure, or other continuing covenants as set forth in this Agreement.");

  p("2. GOALS AND OBJECTIVES", true);
  p("The Parties agree to cooperate and perform their respective obligations to achieve the objectives outlined below:");
  p(`- ${u(v.goal1, 10)}`);
  p(`- ${u(v.goal2, 10)}`);
  p(`- ${u(v.goal3, 10)}`);
  p("The Parties shall act in good faith to further these goals and implement the terms of this Agreement effectively.");

  p("3. OBLIGATIONS OF THE PARTIES", true);
  p("3.1 First Party Obligations", true);
  p("The First Party shall:");
  p("- Perform all duties, tasks, and services as specified in Schedule A;");
  p("- Provide timely reports and updates to the Second Party;");
  p("- Comply with all applicable laws, regulations, and standards relevant to the performance of this Agreement.");
  p("3.2 Second Party Obligations", true);
  p("The Second Party shall:");
  p("- Perform all duties, tasks, and services as specified in Schedule B;");
  p("- Cooperate fully with the First Party to achieve the goals and objectives of this Agreement;");
  p("- Maintain accurate records and provide access for inspection as reasonably requested.");

  p("4. CONFIDENTIALITY AND INFORMATION DISCLOSURE", true);
  p("4.1 Confidentiality", true);
  p("Each Party shall treat as strictly confidential all information received in connection with this Agreement.");
  p("4.2 Permitted Disclosures", true);
  p("Confidential information may only be disclosed if:");
  p("(i) Required by applicable law or governmental authority;");
  p("(ii) Already in the public domain through no fault of the disclosing Party; or");
  p("(iii) Authorized in writing by the other Party, provided that such disclosure occurs only after consultation and notice to the non-disclosing Party.");
  p("4.3 Return of Information", true);
  p("Upon request, all documents, records, or materials containing Confidential Information shall be returned or destroyed, with confirmation in writing.");

  p("5. RELATIONSHIP OF THE PARTIES", true);
  p("The Parties acknowledge and agree that their relationship is that of partners in a partnership solely for the purpose of achieving the objectives of this Agreement. Nothing herein shall be construed as creating a joint venture, employment, agency, or other fiduciary relationship.");

  p("6. CONSIDERATION", true);
  p("This Agreement is entered into in consideration of the mutual covenants, promises, and undertakings set forth herein, including any specific consideration outlined in Schedule C, which the Parties acknowledge as adequate and sufficient.");

  p("7. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents and warrants to the other that:");
  p("- It has full legal capacity, power, and authority to execute and perform this Agreement;");
  p("- All necessary corporate or legal approvals have been obtained;");
  p("- This Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms;");
  p("- It shall act in good faith and take all necessary actions to effectuate the intent and purpose of this Agreement.");

  p("8. WORK PRODUCT AND INTELLECTUAL PROPERTY", true);
  p(`Any copyrightable works, inventions, discoveries, ideas, patents, or other proprietary materials developed wholly or partly in connection with the performance of this Agreement (the "Work Product") shall be the exclusive property of ${u(v.workProductOwner, 10)}.`);
  p("The Parties agree to execute all documents necessary to confirm or perfect ownership rights as required.");

  p("9. NOTICE", true);
  p("Any notice required or permitted under this Agreement shall be deemed sufficiently given if delivered personally or sent by certified mail, return receipt requested, to the addresses listed above or to such other address as a Party may provide in writing. Notices are deemed received:");
  p("- Upon delivery if in person;");
  p("- On the date of acknowledgment if sent by certified mail; or");
  p("- On the third day after mailing if not acknowledged.");

  p("10. TERMINATION AND REMEDIES", true);
  p("10.1 Termination for Material Breach", true);
  p("Either Party may terminate the Agreement if the other fails to remedy a material breach within thirty (30) days of written notice. Termination shall not affect claims for damages or other remedies available under law.");
  p("10.2 Default and Cure Period", true);
  p(`In addition to termination rights, the non-defaulting Party may issue written notice of default. The defaulting Party shall have ${u(v.defaultCureDays, 2)} days to cure the default. Failure to cure shall entitle the non-defaulting Party to terminate this Agreement and exercise all legal remedies.`);

  p("11. AMENDMENT", true);
  p("This Agreement may be amended or modified only by a written instrument executed by all Parties.");
  p("12. SEVERABILITY", true);
  p("If any provision of this Agreement is found invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Any invalid provision shall be construed or limited as necessary to render it valid and enforceable.");
  p("13. WAIVER OF RIGHTS", true);
  p("The failure of any Party to enforce a provision of this Agreement shall not constitute a waiver of the right to enforce that provision or any other provision in the future.");
  p("14. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(v.governingLawMoa, 10)}, without regard to its conflict of laws principles.`);
  p("15. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire understanding between the Parties regarding its subject matter and supersedes all prior oral or written agreements, representations, or understandings.");

  p("16. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Memorandum of Agreement as of the Effective Date.");
  p("FIRST PARTY", true);
  uf("Name", v.firstPartySignName, 20);
  uf("Title", v.firstPartyTitle, 20);
  uf("Signature", v.firstPartySignature, 20);
  uf("Date", v.firstPartyDate, 12);
  p("SECOND PARTY", true);
  uf("Name", v.secondPartySignName, 20);
  uf("Title", v.secondPartyTitle, 20);
  uf("Signature", v.secondPartySignature, 20);
  uf("Date", v.secondPartyDate, 12);
  p("WITNESSES", true);
  p("1.", true);
  uf("Name", v.mw1Name, 20);
  uf("CNIC/ID No.", v.mw1Id, 14);
  uf("Signature", v.mw1Signature, 20);
  uf("Date", v.mw1Date, 12);
  p("2.", true);
  uf("Name", v.mw2Name, 20);
  uf("CNIC/ID No.", v.mw2Id, 14);
  uf("Signature", v.mw2Signature, 20);
  uf("Date", v.mw2Date, 12);

  doc.save("domestic_service_and_moa_agreement.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Domestic Service Agreement + MOA"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
      preserveStepLayout
    />
  );
}
/*
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "party1Name", label: "Party 1 Name", type: "text", required: true },
      { name: "party1Address", label: "Party 1 Address", type: "textarea", required: true },
      { name: "party2Name", label: "Party 2 Name", type: "text", required: true },
      { name: "party2Address", label: "Party 2 Address", type: "textarea", required: true },
      { name: "additionalParty1", label: "Additional Party Reference 1 (optional)", type: "text", required: false },
      { name: "additionalParty2", label: "Additional Party Reference 2 (optional)", type: "text", required: false },
    ],
  },
  {
    label: "Recitals and Scope",
    fields: [
      { name: "recitalParty1", label: "Recital Party Name 1", type: "text", required: true },
      { name: "recitalParty2", label: "Recital Party Name 2", type: "text", required: true },
      { name: "scopeActivities", label: "Scope of Activities text", type: "textarea", required: true },
      { name: "considerationStatement", label: "Consideration statement", type: "textarea", required: true },
    ],
  },
  {
    label: "Reporting and Tracking",
    fields: [
      { name: "trackingPartyA", label: "Tracking subsection (a): first blank", type: "text", required: true },
      { name: "trackingPartyB", label: "Tracking subsection (a): second blank", type: "text", required: true },
      { name: "trackingSiteA", label: "Tracking subsection (a): source site name", type: "text", required: true },
      { name: "trackingSiteB", label: "Tracking subsection (a): destination site name", type: "text", required: true },
      { name: "trackingServicesA", label: "Tracking subsection (a): services label", type: "text", required: true },
      { name: "trackingPartyC", label: "Tracking subsection (b): first blank", type: "text", required: true },
      { name: "trackingPartyD", label: "Tracking subsection (b): second blank", type: "text", required: true },
      { name: "trackingSiteC", label: "Tracking subsection (b): source site name", type: "text", required: true },
      { name: "trackingSiteD", label: "Tracking subsection (b): destination site name", type: "text", required: true },
      { name: "trackingServicesB", label: "Tracking subsection (b): services label", type: "text", required: true },
    ],
  },
  {
    label: "Term and Liability",
    fields: [
      { name: "initialTermMonths", label: "Initial Term (months)", type: "number", required: true, placeholder: "6" },
      { name: "renewalTermMonths", label: "Renewal Term (months)", type: "number", required: true, placeholder: "6" },
      { name: "causeCureDays", label: "Cure period for cause termination (days)", type: "number", required: true, placeholder: "30" },
      { name: "convenienceNoticeDays", label: "Convenience termination notice (days)", type: "number", required: true, placeholder: "30" },
      { name: "liabilityCap", label: "Liability cap amount", type: "text", required: true, placeholder: "$-----------" },
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
      { name: "disputeVenue", label: "Dispute Court Location", type: "text", required: true },
    ],
  },
  {
    label: "Notices and Records",
    fields: [
      { name: "noticeAddress1", label: "Notice Address for Party 1", type: "textarea", required: true },
      { name: "noticeAddress2", label: "Notice Address for Party 2", type: "textarea", required: true },
      { name: "recordsRetentionYears", label: "Records retention (years)", type: "number", required: true, placeholder: "1" },
      { name: "recordsNoticeDays", label: "Reasonable notice for record access (days)", type: "number", required: true, placeholder: "10" },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "party1By", label: "Party 1 By (signature line)", type: "text", required: true },
      { name: "party1Signer", label: "Party 1 Signer Name", type: "text", required: true },
      { name: "party1Title", label: "Party 1 Title", type: "text", required: true },
      { name: "party1Date", label: "Party 1 Date", type: "date", required: true },
      { name: "party2By", label: "Party 2 By (signature line)", type: "text", required: true },
      { name: "party2Signer", label: "Party 2 Signer Name", type: "text", required: true },
      { name: "party2Title", label: "Party 2 Title", type: "text", required: true },
      { name: "party2Date", label: "Party 2 Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 16;
  const textWidth = pageWidth - margin * 2;
  const lineHeight = 5.4;
  const pageBottom = 282;
  let y = 18;

  const u = (value?: string, min = 12) => {
    const cleaned = (value || "").trim();
    return cleaned || "_".repeat(min);
  };

  const ensure = (needed = 10) => {
    if (y + needed > pageBottom) {
      doc.addPage();
      y = 18;
    }
  };

  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, textWidth);
    ensure(lines.length * lineHeight + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  const uf = (label: string, value?: string, min = 14) => {
    ensure(7.5);
    const labelText = `${label}: `;
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    doc.text(labelText, margin, y);
    const startX = margin + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    const fill = shown || "_".repeat(min);
    doc.text(fill, startX, y);
    doc.line(startX, y + 1.1, startX + doc.getTextWidth(fill), y + 1.1);
    y += 6.1;
  };

  const jurisdiction = `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`;

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "MARKETING AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  doc.line(pageWidth / 2 - titleWidth / 2, y + 1.1, pageWidth / 2 + titleWidth / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction", jurisdiction);

  p(
    `This Marketing Agreement (this "Agreement"), dated as of ${u(v.effectiveDate)} (the "Effective Date"), is entered into by and between ${u(v.party1Name)}, located at ${u(v.party1Address)}, and ${u(v.party2Name)}, located at ${u(v.party2Address)}, and ${u(v.additionalParty1)} and ${u(v.additionalParty2)} (each individually, a "Party," and collectively, the "Parties").`
  );

  p("RECITALS", true);
  p(
    `WHEREAS, ${u(v.recitalParty1)} and ${u(v.recitalParty2)} desire to establish an exclusive strategic marketing relationship pursuant to which each Party shall promote the other Party's products and services to its respective customers;`
  );
  p(
    'WHEREAS, this Agreement may be amended only by a written instrument executed by both Parties (an "Amendment"), and any Amendment shall be governed by the terms of this Agreement unless expressly stated otherwise.'
  );
  p("NOW, THEREFORE, in consideration of the mutual covenants set forth herein, the Parties agree as follows:");

  p("1. SCOPE OF ACTIVITIES", true);
  p(`The Parties shall carry out the marketing activities as decided ${u(v.scopeActivities)}. ${u(v.considerationStatement)}`);

  p("2. REPORTING", true);
  p(
    "Within ten (10) days following the end of each calendar month during the Term, each Party shall furnish to the other Party (or provide access to) a monthly report containing all data reasonably necessary to determine the value (including but not limited to traffic, completed sales, revenue, and conversions) generated from the activities performed under this Agreement."
  );

  p("3. TRACKING OF USERS", true);
  p(
    `a. ${u(v.trackingPartyA)} shall implement and maintain reasonable tracking mechanisms enabling ${u(v.trackingPartyB)} to accurately identify users linking from the ${u(v.trackingSiteA)} Site to the ${u(v.trackingSiteB)} Site and purchasing ${u(v.trackingServicesA)} Services.`
  );
  p(
    `b. ${u(v.trackingPartyC)} shall implement and maintain reasonable tracking mechanisms enabling ${u(v.trackingPartyD)} to accurately identify users linking from the ${u(v.trackingSiteC)} Site to the ${u(v.trackingSiteD)} Site and purchasing ${u(v.trackingServicesB)} Services.`
  );

  p("4. LICENSES", true);
  p(
    'Each Party grants to the other Party a non-exclusive, non-transferable, royalty-free license to use its trade names, trademarks, logos, and service marks (collectively, the "Marks") solely in connection with the performance of this Agreement.'
  );
  p("No Party shall use the other Party's Marks without prior written approval. No modifications to any Marks may be made without express written consent.");
  p(
    "Each Party acknowledges that all rights, title, and interest in and to the other Party's Marks and related goodwill remain exclusively with that Party. Neither Party shall contest, nor assist in contesting, the validity of any Marks, nor utilize marks that may cause confusion therewith."
  );
  p("All use of the other Party's Marks shall cease immediately upon request and shall automatically terminate upon expiration or termination of this Agreement.");

  p("5. TERM AND TERMINATION", true);
  p(
    `The term of this Agreement shall commence on the Effective Date and shall continue for ${u(v.initialTermMonths, 1)} (${u(v.initialTermMonths, 1)}) months (the "Initial Term"), unless terminated earlier according to this Agreement.`
  );
  p("The Launch Date shall be the date on which each Party's promotional offer goes live on the other Party's website.");
  p(
    `Following the Initial Term, this Agreement shall automatically renew for successive ${u(v.renewalTermMonths, 1)}-month periods (each, a "Renewal Term") unless terminated as provided below.`
  );
  p("a. Termination for Cause", true);
  p(
    `Either Party may terminate this Agreement immediately upon written notice if the other Party materially defaults and fails to cure such default within ${u(v.causeCureDays, 1)} (${u(v.causeCureDays, 1)}) days of receiving written notice thereof.`
  );
  p("b. Termination for Convenience", true);
  p(
    `Either Party may terminate this Agreement for any reason after the Initial Term upon ${u(v.convenienceNoticeDays, 1)} (${u(v.convenienceNoticeDays, 1)}) days' prior written notice.`
  );
  p("c. Effect of Termination", true);
  p("i. All promotions of the other Party's services shall immediately cease;");
  p("ii. Use of any Marks and technology of the other Party shall cease;");
  p("iii. The other Party's services shall no longer be displayed or made available through any website, platform, or channel;");
  p("iv. Upon written request, all confidential materials shall be returned or destroyed.");
  p("Termination shall not relieve either Party of obligations arising prior to the termination date.");

  p("6. WARRANTIES; DISCLAIMER", true);
  p("a. Warranties", true);
  p("Each Party represents and warrants that:");
  p("i. It has full authority to enter into and perform its obligations under this Agreement;");
  p("ii. Execution and performance will not violate any existing agreement;");
  p("iii. This Agreement constitutes a legal, valid, and binding obligation;");
  p("iv. No warranties are made by either Party other than those expressly stated in this Agreement.");
  p("b. Disclaimer", true);
  p(
    "EXCEPT AS EXPRESSLY PROVIDED HEREIN, EACH PARTY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, OR FITNESS FOR A PARTICULAR PURPOSE."
  );

  p("7. INDEMNIFICATION", true);
  p("a. Indemnification by Party 1", true);
  p(
    `${u(v.party1Name)} shall indemnify, defend, and hold harmless ${u(v.party2Name)} and its officers, directors, employees, and agents from all claims, costs, liabilities, and losses arising out of allegations that ${u(v.party1Name)}'s technology or Marks infringe upon any third-party intellectual property rights.`
  );
  p("b. Indemnification by Party 2", true);
  p(
    `${u(v.party2Name)} shall indemnify, defend, and hold harmless ${u(v.party1Name)} under the same terms and conditions stated above.`
  );
  p("c. Procedures", true);
  p(
    "The indemnified Party shall promptly notify the indemnifying Party of any claim. The indemnifying Party shall control the defense and settlement of the claim. No settlement may be entered that imposes liability or restrictions on the indemnified Party without its written consent. The indemnified Party may participate in the defense at its own cost."
  );

  p("8. CONFIDENTIALITY", true);
  p("a. Protection of Information", true);
  p(
    'During the Term, the Parties may exchange confidential information relating to business operations, products, pricing, employees, technology, and other proprietary matters ("Confidential Information").'
  );
  p("Confidential Information shall exclude information that:");
  p("i. becomes public through no wrongful act;");
  p("ii. was previously known to the receiving Party;");
  p("iii. enters the public domain through no fault of the receiving Party.");
  p(
    "Confidential Information shall be kept strictly confidential and used solely for performance under this Agreement. Required disclosures (e.g., subpoenas) are permitted only with reasonable prior notice to the other Party."
  );
  p("b. Injunctive Relief", true);
  p(
    "Improper disclosure or misuse of Confidential Information may cause irreparable harm. The harmed Party is entitled to injunctive relief without the need to prove monetary damages."
  );
  p("c. Survival", true);
  p("Confidentiality obligations shall survive termination of this Agreement.");

  p("9. LIMITATION OF LIABILITY", true);
  p(
    "NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY THEREOF."
  );
  p(
    `Each Party's total cumulative liability arising out of this Agreement shall not exceed ${u(v.liabilityCap)}, except with respect to obligations under Indemnification and Confidentiality.`
  );

  p("10. PUBLICITY", true);
  p(
    "No public announcement or press release referring to the other Party shall be made without prior written approval, except statements identifying the other Party as a customer or strategic marketing partner. Such approval shall not be unreasonably withheld or delayed."
  );

  p("11. MISCELLANEOUS", true);
  p("a. Notices", true);
  p(
    `All notices shall be in writing and delivered to the addresses listed above via express mail or courier with confirmed receipt. Party 1 notices: ${u(v.noticeAddress1)}. Party 2 notices: ${u(v.noticeAddress2)}. Notices shall be effective upon receipt.`
  );
  p("b. Entire Agreement", true);
  p("This Agreement constitutes the complete and exclusive agreement between the Parties and supersedes all prior understandings relating to the subject matter.");
  p("c. Waiver", true);
  p("No waiver is effective unless in writing. A waiver applies only to the specific instance and does not constitute a continuing waiver.");
  p("d. Force Majeure", true);
  p("Neither Party shall be liable for failure to perform due to circumstances beyond its reasonable control, including natural disasters, pandemics, acts of war, riots, government actions, or labor disputes.");
  p("e. Headings", true);
  p("Headings are for convenience only and shall not affect interpretation.");
  p("f. Amendments and Severability", true);
  p("Any modification must be in writing and signed by both Parties. Invalid provisions shall be replaced with enforceable provisions that most closely reflect the Parties' original intent.");
  p("g. Assignment", true);
  p("No Party may assign its rights or obligations without prior written consent, except in connection with a merger or sale of substantially all assets, with notice.");
  p("h. Independent Contractors", true);
  p("The Parties are independent contractors and nothing herein creates a partnership, joint venture, agency, or employment relationship.");
  p("i. Governing Law", true);
  p(`This Agreement shall be governed by the laws of the State of ${u(v.governingLawState)}. All disputes shall be resolved exclusively in the courts located in ${u(v.disputeVenue)}.`);
  p("j. Construction", true);
  p("Any conflicting or ambiguous provisions shall be interpreted to reflect the Parties' original intentions without affecting the enforceability of the remaining Agreement.");
  p("k. Records", true);
  p(`For ${u(v.recordsRetentionYears, 1)} (${u(v.recordsRetentionYears, 1)}) year(s) following the Term, each Party shall maintain accurate records relating to customer transactions and shall make such records available upon reasonable notice of ${u(v.recordsNoticeDays, 1)} (${u(v.recordsNoticeDays, 1)}) day(s).`);

  p("12. SIGNATORIES", true);
  p("This Agreement is executed by authorized representatives of the Parties as of the Effective Date.");
  p("Party 1", true);
  uf("By", v.party1By, 24);
  uf("Name", v.party1Signer, 24);
  uf("Title", v.party1Title, 20);
  uf("Date", v.party1Date, 14);
  p("Party 2", true);
  uf("By", v.party2By, 24);
  uf("Name", v.party2Signer, 24);
  uf("Title", v.party2Title, 20);
  uf("Date", v.party2Date, 14);

  doc.save("marketing_agreement.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Marketing Agreement"
      subtitle="Complete all seven steps to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
      preserveStepLayout
    />
  );
}
/*
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State/Commonwealth", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyAState", label: "Party A state/country of organization", type: "text", required: true },
      { name: "partyAAddress", label: "Party A principal place of business", type: "textarea", required: true },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBState", label: "Party B state/country of organization", type: "text", required: true },
      { name: "partyBAddress", label: "Party B principal place of business", type: "textarea", required: true },
    ],
  },
  {
    label: "Term and Liability",
    fields: [
      { name: "specifiedDate", label: "Specified expiration date", type: "text", required: true },
      { name: "autoRenewPeriod", label: "Auto-renewal period", type: "text", required: true },
      { name: "terminationNotice", label: "Termination notice period", type: "text", required: true },
      { name: "liabilityCap", label: "Aggregate liability cap", type: "text", required: true },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
      { name: "jurisdictionVenue", label: "Jurisdiction venue", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partyABy", label: "Party A By (signature text)", type: "text", required: true },
      { name: "partyASignerName", label: "Party A signer name", type: "text", required: true },
      { name: "partyASignerTitle", label: "Party A signer title", type: "text", required: true },
      { name: "partyASignerDate", label: "Party A sign date", type: "date", required: true },
      { name: "partyBBy", label: "Party B By (signature text)", type: "text", required: true },
      { name: "partyBSignerName", label: "Party B signer name", type: "text", required: true },
      { name: "partyBSignerTitle", label: "Party B signer title", type: "text", required: true },
      { name: "partyBSignerDate", label: "Party B sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("times", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "STRATEGIC ALLIANCE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;

  uf("Jurisdiction", `${u(values.state)}, ${u(values.country)}${values.province ? `, ${values.province}` : ""}${values.city ? `, ${values.city}` : ""}`);
  p(`This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and between ${u(values.partyAName, 14)}, a company organized under the laws of ${u(values.partyAState, 12)}, with principal place of business at ${u(values.partyAAddress, 14)} ("Party A"), and ${u(values.partyBName, 14)}, a company organized under the laws of ${u(values.partyBState, 12)}, with principal place of business at ${u(values.partyBAddress, 14)} ("Party B").`);
  p('Party A and Party B may hereinafter be collectively referred to as the "Parties" or individually as a "Party."');
  p("The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein.", false, 3);

  p("1. SCOPE OF STRATEGIC ALLIANCE", true);
  p("1.1 Joint Services: Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards.");
  p("1.2 Ownership of Intellectual Property: Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created prior to or independently of this Agreement.");
  p("1.3 Marketing and Promotion: Both Parties may promote the strategic alliance; however, all marketing materials or promotional statements require prior written approval of the Party whose services or intellectual property are referenced.");
  p("2. PERIOD OF PERFORMANCE", true);
  p(`2.1 Effective Date: This Agreement shall become effective on ${u(values.effectiveDate, 12)}.`);
  p(`2.2 Term and Expiration: The Agreement shall continue until the later of (a) ${u(values.specifiedDate, 12)}, or (b) completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`);
  p(`2.3 Automatic Renewal: This Agreement shall automatically renew for successive periods of ${u(values.autoRenewPeriod, 10)}, unless either Party provides written notice of termination at least ${u(values.terminationNotice, 8)} prior to the end of the current term.`);
  p("2.4 Early Termination: The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");
  p("3. MANAGEMENT", true);
  p("3.1 Designated Representatives: Each Party shall designate a senior officer, partner, or other responsible person to oversee administration, client relationships, billing, and compliance.");
  p("3.2 Authority and Responsibility: Designated representatives shall coordinate projects, resolve operational issues, and act as primary liaisons.");
  p("4. CONFIDENTIAL INFORMATION", true);
  p("Each Party may receive confidential/proprietary information and agrees to maintain strict confidence, use only for performance, not alter/copy/disclose without consent, and return/destroy materials upon request or termination. Exceptions include information that becomes public without breach, lawfully obtained from third parties, or independently developed.");
  p("5. NO PARTNERSHIP OR AGENCY", true);
  p("Nothing herein creates a partnership, joint venture, agency, or employment relationship. No separate taxable entity is created.");
  p("6. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other from claims, losses, damages, liabilities, costs, or expenses (including attorneys' fees) arising from negligence, willful misconduct, or breach by the indemnifying Party.");
  p("7. INTELLECTUAL PROPERTY", true);
  p("All work/materials created in connection with specific engagements remain the property of the Party performing the work. Pre-existing methodologies remain the property of the originating Party.");
  p("8. LIMITATIONS OF LIABILITY", true);
  p(`Neither Party is liable for indirect, special, incidental, or consequential damages. Aggregate liability shall not exceed ${u(values.liabilityCap, 18)}.`);
  p("9. ENTIRE AGREEMENT AND CONFLICT", true);
  p("This Agreement with exhibits/schedules constitutes the entire understanding and supersedes all prior discussions. In conflicts between this Agreement and annexes, this Agreement governs.");
  p("10. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}, without regard to conflict principles. Any disputes shall be subject to exclusive jurisdiction of courts located in ${u(values.jurisdictionVenue, 12)}.`);
  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");
  p("Party A:", true);
  uf("By", values.partyABy, 24);
  uf("Name", values.partyASignerName || values.partyAName, 24);
  uf("Title", values.partyASignerTitle, 20);
  uf("Date", values.partyASignerDate, 14);
  p("Party B:", true);
  uf("By", values.partyBBy, 24);
  uf("Name", values.partyBSignerName || values.partyBName, 24);
  uf("Title", values.partyBSignerTitle, 20);
  uf("Date", values.partyBSignerDate, 14);

  doc.save("strategic_alliance.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Strategic Alliance"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
    />
  );
}
 
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State/Commonwealth", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyAState", label: "Party A state/country of organization", type: "text", required: true },
      { name: "partyAAddress", label: "Party A principal place of business", type: "textarea", required: true },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBState", label: "Party B state/country of organization", type: "text", required: true },
      { name: "partyBAddress", label: "Party B principal place of business", type: "textarea", required: true },
    ],
  },
  {
    label: "Term and Liability",
    fields: [
      { name: "specifiedDate", label: "Specified expiration date", type: "text", required: true },
      { name: "autoRenewPeriod", label: "Auto-renewal period", type: "text", required: true },
      { name: "terminationNotice", label: "Termination notice period", type: "text", required: true },
      { name: "liabilityCap", label: "Aggregate liability cap", type: "text", required: true, placeholder: "total amount paid in prior 12 months" },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
      { name: "jurisdictionVenue", label: "Jurisdiction venue", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partyASignerName", label: "Party A signer name", type: "text", required: true },
      { name: "partyASignerTitle", label: "Party A signer title", type: "text", required: true },
      { name: "partyASignerDate", label: "Party A sign date", type: "date", required: true },
      { name: "partyBSignerName", label: "Party B signer name", type: "text", required: true },
      { name: "partyBSignerTitle", label: "Party B signer title", type: "text", required: true },
      { name: "partyBSignerDate", label: "Party B sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("times", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "STRATEGIC ALLIANCE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  uf("Jurisdiction", `${u(values.state)}, ${u(values.country)}${values.province ? `, ${values.province}` : ""}${values.city ? `, ${values.city}` : ""}`);

  p(`This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and between ${u(values.partyAName, 14)}, a company organized under the laws of ${u(values.partyAState, 12)}, with principal place of business at ${u(values.partyAAddress, 14)} ("Party A"), and ${u(values.partyBName, 14)}, a company organized under the laws of ${u(values.partyBState, 12)}, with principal place of business at ${u(values.partyBAddress, 14)} ("Party B").`);
  p('Party A and Party B may hereinafter be collectively referred to as the "Parties" or individually as a "Party."');
  p("The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein.", false, 3);

  p("1. SCOPE OF STRATEGIC ALLIANCE", true);
  p("1.1 Joint Services", true);
  p("Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards.");
  p("1.2 Ownership of Intellectual Property", true);
  p("Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created prior to or independently of this Agreement.");
  p("1.3 Marketing and Promotion", true);
  p("Both Parties may promote the strategic alliance; however, all marketing materials or promotional statements require prior written approval of the Party whose services or intellectual property are referenced.");

  p("2. PERIOD OF PERFORMANCE", true);
  p("2.1 Effective Date", true);
  p(`This Agreement shall become effective on ${u(values.effectiveDate, 12)}.`);
  p("2.2 Term and Expiration", true);
  p(`The Agreement shall continue until the later of (a) ${u(values.specifiedDate, 12)}, or (b) completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`);
  p("2.3 Automatic Renewal", true);
  p(`This Agreement shall automatically renew for successive periods of ${u(values.autoRenewPeriod, 10)}, unless either Party provides written notice of termination at least ${u(values.terminationNotice, 8)} prior to the end of the current term.`);
  p("2.4 Early Termination", true);
  p("The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");

  p("3. MANAGEMENT", true);
  p("3.1 Designated Representatives", true);
  p("Each Party shall designate a senior officer, partner, or other responsible person to oversee administration, client relationships, billing, and compliance.");
  p("3.2 Authority and Responsibility", true);
  p("Designated representatives shall coordinate projects, resolve operational issues, and act as primary liaisons.");

  p("4. CONFIDENTIAL INFORMATION", true);
  p("Each Party may receive confidential/proprietary information and agrees to maintain strict confidence, use only for performance, not alter/copy/disclose without consent, and return/destroy materials upon request or termination.");
  p("Exceptions include information that becomes public without breach, lawfully obtained from third parties, or independently developed.");

  p("5. NO PARTNERSHIP OR AGENCY", true);
  p("Nothing herein creates a partnership, joint venture, agency, or employment relationship. No separate taxable entity is created.");
  p("6. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other from claims, losses, damages, liabilities, costs, or expenses (including attorneys' fees) arising from negligence, willful misconduct, or breach by the indemnifying Party.");
  p("7. INTELLECTUAL PROPERTY", true);
  p("All work/materials created in connection with specific engagements remain the property of the Party performing the work. Pre-existing methodologies remain the property of the originating Party.");
  p("8. LIMITATIONS OF LIABILITY", true);
  p(`Neither Party is liable for indirect, special, incidental, or consequential damages. Aggregate liability shall not exceed ${u(values.liabilityCap, 18)}.`);
  p("9. ENTIRE AGREEMENT AND CONFLICT", true);
  p("This Agreement with exhibits/schedules constitutes the entire understanding and supersedes all prior discussions. In conflicts between this Agreement and annexes, this Agreement governs.");
  p("10. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}, without regard to conflict principles. Any disputes shall be subject to exclusive jurisdiction of courts located in ${u(values.jurisdictionVenue, 12)}.`);
  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");

  p("Party A:");
  uf("Name", values.partyASignerName || values.partyAName, 24);
  uf("Title", values.partyASignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyASignerDate, 14);
  p("Party B:");
  uf("Name", values.partyBSignerName || values.partyBName, 24);
  uf("Title", values.partyBSignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyBSignerDate, 14);

  doc.save("strategic_alliance.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Strategic Alliance"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
    />
  );
}
 
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyAState", label: "Party A state/country of organization", type: "text", required: false },
      { name: "partyAAddress", label: "Party A principal place of business", type: "text", required: false },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBState", label: "Party B state/country of organization", type: "text", required: false },
      { name: "partyBAddress", label: "Party B principal place of business", type: "text", required: false },
    ],
  },
  {
    label: "Term and Liability Settings",
    fields: [
      { name: "specifiedDate", label: "Specified expiration date", type: "text", required: false },
      { name: "autoRenewPeriod", label: "Auto-renewal period", type: "text", required: false },
      { name: "terminationNotice", label: "Termination notice period", type: "text", required: false },
      { name: "liabilityCap", label: "Aggregate liability cap basis", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
      { name: "jurisdictionVenue", label: "Jurisdiction venue", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partyASignerName", label: "Party A signer name", type: "text", required: false },
      { name: "partyASignerTitle", label: "Party A signer title", type: "text", required: false },
      { name: "partyASignerDate", label: "Party A sign date", type: "date", required: false },
      { name: "partyBSignerName", label: "Party B signer name", type: "text", required: false },
      { name: "partyBSignerTitle", label: "Party B signer title", type: "text", required: false },
      { name: "partyBSignerDate", label: "Party B sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "STRATEGIC ALLIANCE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and between ${u(values.partyAName, 14)}, a company organized under the laws of ${u(values.partyAState, 12)}, with principal place of business at ${u(values.partyAAddress, 14)} ("Party A"), and ${u(values.partyBName, 14)}, a company organized under the laws of ${u(values.partyBState, 12)}, with principal place of business at ${u(values.partyBAddress, 14)} ("Party B").`);
  p('Party A and Party B may hereinafter be collectively referred to as the "Parties" or individually as a "Party."');
  p("The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein.", false, 3);

  p("1. SCOPE OF STRATEGIC ALLIANCE", true);
  p("1.1 Joint Services", true);
  p("Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards.");
  p("1.2 Ownership of Intellectual Property", true);
  p("Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created prior to or independently of this Agreement.");
  p("1.3 Marketing and Promotion", true);
  p("Both Parties may promote the strategic alliance; however, all marketing materials or promotional statements require prior written approval of the Party whose services or intellectual property are referenced.");

  p("2. PERIOD OF PERFORMANCE", true);
  p("2.1 Effective Date", true);
  p(`This Agreement shall become effective on ${u(values.effectiveDate, 12)}.`);
  p("2.2 Term and Expiration", true);
  p(`The Agreement shall continue until the later of (a) ${u(values.specifiedDate, 12)}, or (b) completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`);
  p("2.3 Automatic Renewal", true);
  p(`This Agreement shall automatically renew for successive periods of ${u(values.autoRenewPeriod, 10)}, unless either Party provides written notice of termination at least ${u(values.terminationNotice, 8)} prior to the end of the current term.`);
  p("2.4 Early Termination", true);
  p("The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");

  p("3. MANAGEMENT", true);
  p("3.1 Designated Representatives", true);
  p("Each Party shall designate a senior officer, partner, or other responsible person to oversee administration, client relationships, billing, and compliance.");
  p("3.2 Authority and Responsibility", true);
  p("Designated representatives shall coordinate projects, resolve operational issues, and act as primary liaisons.");

  p("4. CONFIDENTIAL INFORMATION", true);
  p("Each Party may receive confidential/proprietary information and agrees to maintain strict confidence, use only for performance, not alter/copy/disclose without consent, and return/destroy materials upon request or termination.");
  p("Exceptions include information that becomes public without breach, lawfully obtained from third parties, or independently developed.");

  p("5. NO PARTNERSHIP OR AGENCY", true);
  p("Nothing herein creates a partnership, joint venture, agency, or employment relationship. No separate taxable entity is created.");
  p("6. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other from claims, losses, damages, liabilities, costs, or expenses (including attorneys' fees) arising from negligence, willful misconduct, or breach by the indemnifying Party.");
  p("7. INTELLECTUAL PROPERTY", true);
  p("All work/materials created in connection with specific engagements remain the property of the Party performing the work. Pre-existing methodologies remain the property of the originating Party.");
  p("8. LIMITATIONS OF LIABILITY", true);
  p("Neither Party is liable for indirect, special, incidental, or consequential damages. Aggregate liability shall not exceed the total amount paid by the claiming Party to the liable Party in the twelve (12) months preceding the claim event.");
  p("9. ENTIRE AGREEMENT AND CONFLICT", true);
  p("This Agreement with exhibits/schedules constitutes the entire understanding and supersedes all prior discussions. In conflicts between this Agreement and annexes, this Agreement governs.");
  p("10. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}, without regard to conflict principles. Any disputes shall be subject to exclusive jurisdiction of courts located in ${u(values.jurisdictionVenue, 12)}.`);
  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");

  p("Party A:");
  uf("Name", values.partyASignerName || values.partyAName, 24);
  uf("Title", values.partyASignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyASignerDate, 14);
  p("Party B:");
  uf("Name", values.partyBSignerName || values.partyBName, 24);
  uf("Title", values.partyBSignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyBSignerDate, 14);

  doc.save("strategic_alliance.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Strategic Alliance"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
    />
  );
}
*/
