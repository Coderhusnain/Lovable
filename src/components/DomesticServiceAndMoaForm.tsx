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
      { name: "dutyExtra", label: "Any additional domestic tasks", type: "textarea", required: false },
      { name: "conductExtra", label: "Any additional code of conduct terms", type: "textarea", required: false },
      { name: "prohibitedExtra", label: "Any additional prohibited conduct terms", type: "textarea", required: false },
    ],
  },
  {
    label: "Remuneration and Domestic Term",
    fields: [
      { name: "monthlyPackage", label: "Monthly package amount", type: "text", required: true, placeholder: "PKR ______" },
      { name: "salaryPaymentDay", label: "Salary payment day of month", type: "number", required: true, placeholder: "5" },
      { name: "termYears", label: "Domestic agreement term in years", type: "number", required: true, placeholder: "2" },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "number", required: true, placeholder: "30" },
      { name: "governingLawDomestic", label: "Domestic agreement governing law text", type: "text", required: true, placeholder: "laws of state" },
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
      { name: "workProductOwner", label: "Work Product owner", type: "text", required: true },
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
  const u = (value?: string, min = 12) => ((value || "").trim() || "_".repeat(min));
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
  p(`This Agreement is made on this ${u(v.executionDay, 2)} day of ${u(v.executionMonth, 5)} ${u(v.executionYear, 4)}, at ${u(v.executionPlace, 8)}, by and between:`);
  p(`Party One, ${u(v.masterName)}, residing at ${u(v.masterAddress)}, hereinafter referred to as the "Master",`);
  p("AND", true);
  p(`Party Two, ${u(v.servantName)}, ${relLabel} ${u(v.servantRelationName)}, residing at ${u(v.servantAddress)}, hereinafter referred to as the "Servant".`);
  p('Collectively referred to as the "Parties".');
  p("Purpose of the Agreement", true);
  p("The Master agrees to employ the Servant as a domestic worker, responsible for carrying out general household duties and safeguarding the Master's premises. In consideration thereof, the Master shall provide a designated portion of the residence within the premises for the Servant's accommodation, subject to the terms and conditions stipulated in this Agreement.");
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
  p(`The Master is paying the Servant a monthly package of ${u(v.monthlyPackage, 10)} on ${u(v.salaryPaymentDay, 1)}th of each month. It includes salary, a portion of house to stay including free electricity as well as gas utilities.`);
  p("Prohibited Conduct", true);
  p("The following actions are strictly prohibited and may result in immediate termination:");
  p("- Theft or misuse of the Master's belongings;");
  p("- Physical or verbal abuse;");
  p("- Use or possession of intoxicating substances;");
  p("- Bringing outsiders without permission;");
  p("- Misrepresentation of identity or use of false documents.");
  if ((v.prohibitedExtra || "").trim()) p(`- Additional prohibited term: ${v.prohibitedExtra}`);
  p("Duration and Termination", true);
  p(`This agreement shall be valid for a period of ${u(v.termYears, 1)} (${u(v.termYears, 1)}) years from the date of signing and may be renewed with mutual consent.`);
  p(`- Either party may terminate this agreement with ${u(v.terminationNoticeDays, 2)} days notice or salary in lieu thereof.`);
  p("- The Master reserves the right to terminate the Agreement immediately in case of misconduct, breach of trust, or violation of any term of this Agreement.");
  p("Miscellaneous", true);
  p("- This Agreement constitutes the entire understanding between the Parties.");
  p("- Any modification must be in writing and signed by both Parties.");
  p(`- This Agreement shall be governed by the ${u(v.governingLawDomestic, 10)}.`);
  p("Acknowledgment", true);
  p("The Servant acknowledges that she has read, understood, and voluntarily agreed to the terms and conditions of this Agreement and signs it in full acceptance thereof.");
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
  p(`This Memorandum of Agreement (the "Agreement") is made and entered into as of ${u(v.moaEffectiveDate, 12)}, by and between:`);
  p(`- ${u(v.firstPartyName)}, having its principal place of business at ${u(v.firstPartyAddress)} (hereinafter referred to as the "First Party"); and`);
  p(`- ${u(v.secondPartyName)}, having its principal place of business at ${u(v.secondPartyAddress)} (hereinafter referred to as the "Second Party");`);
  p('Collectively referred to as the "Parties" and individually as a "Party."');
  p("The Parties hereby agree to be bound by the terms and conditions set forth herein for the purpose of defining their respective rights, obligations, and responsibilities.");
  p("1. TERM OF AGREEMENT", true);
  p("1.1 Duration", true);
  p(`This Agreement shall remain in full force and effect for a period of ${u(v.moaTerm, 8)} (the "Term"), unless earlier terminated in accordance with the provisions herein.`);
  p("1.2 Early Termination", true);
  p("Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach. Termination of a portion of this Agreement shall not affect other provisions unless the breach results in the substantial loss of the Agreement's overall value to the non-breaching Party.");
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

export default function DomesticServiceAndMoaForm() {
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
