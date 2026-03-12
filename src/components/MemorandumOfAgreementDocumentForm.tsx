import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: [
          { value: "United States", label: "United States" },
          { value: "Canada", label: "Canada" },
          { value: "United Kingdom", label: "United Kingdom" },
          { value: "Australia", label: "Australia" },
          { value: "Pakistan", label: "Pakistan" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "province",
        label: "Province/State/Region",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "United States") {
            return [
              { value: "California", label: "California" },
              { value: "New York", label: "New York" },
              { value: "Texas", label: "Texas" },
              { value: "Florida", label: "Florida" },
              { value: "Other US State", label: "Other US State" },
            ];
          }
          if (values.country === "Canada") {
            return [
              { value: "Ontario", label: "Ontario" },
              { value: "Quebec", label: "Quebec" },
              { value: "British Columbia", label: "British Columbia" },
              { value: "Alberta", label: "Alberta" },
              { value: "Other Canadian Province", label: "Other Canadian Province" },
            ];
          }
          if (values.country === "United Kingdom") {
            return [
              { value: "England", label: "England" },
              { value: "Scotland", label: "Scotland" },
              { value: "Wales", label: "Wales" },
              { value: "Northern Ireland", label: "Northern Ireland" },
            ];
          }
          if (values.country === "Australia") {
            return [
              { value: "New South Wales", label: "New South Wales" },
              { value: "Victoria", label: "Victoria" },
              { value: "Queensland", label: "Queensland" },
              { value: "Western Australia", label: "Western Australia" },
              { value: "Other Australian State", label: "Other Australian State" },
            ];
          }
          if (values.country === "Pakistan") {
            return [
              { value: "Punjab", label: "Punjab" },
              { value: "Sindh", label: "Sindh" },
              { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
              { value: "Balochistan", label: "Balochistan" },
              { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
              { value: "Gilgit-Baltistan", label: "Gilgit-Baltistan" },
              { value: "Azad Jammu and Kashmir", label: "Azad Jammu and Kashmir" },
            ];
          }
          return [{ value: "Other Region", label: "Other Region" }];
        },
      },
      { name: "stateJurisdiction", label: "State/Jurisdiction (text)", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Parties and Term",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "firstPartyName", label: "First Party Name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First Party Address", type: "textarea", required: true },
      { name: "secondPartyName", label: "Second Party Name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second Party Address", type: "textarea", required: true },
      { name: "termLength", label: "Specify Term", type: "text", required: true, placeholder: "e.g., 12 months" },
    ],
  },
  {
    label: "Goals and Obligations",
    fields: [
      { name: "goal1", label: "Specify Goal 1", type: "text", required: true },
      { name: "goal2", label: "Specify Goal 2", type: "text", required: true },
      { name: "goal3", label: "Additional objective (optional)", type: "text", required: false },
      { name: "scheduleA", label: "Schedule A (First Party duties/tasks/services)", type: "textarea", required: true },
      { name: "scheduleB", label: "Schedule B (Second Party duties/tasks/services)", type: "textarea", required: true },
      { name: "scheduleC", label: "Schedule C (specific consideration)", type: "textarea", required: true },
    ],
  },
  {
    label: "Confidentiality, IP and Remedies",
    fields: [
      { name: "workProductOwner", label: "Work Product owner (Specify Party)", type: "text", required: true },
      { name: "defaultCureDays", label: "Default cure days", type: "number", required: true, placeholder: "30" },
      { name: "governingJurisdiction", label: "Governing law jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "First and Second Party Signatures",
    fields: [
      { name: "firstSignerName", label: "FIRST PARTY Name", type: "text", required: true },
      { name: "firstSignerTitle", label: "FIRST PARTY Title", type: "text", required: true },
      { name: "firstSignerSignature", label: "FIRST PARTY Signature", type: "text", required: true },
      { name: "firstSignerDate", label: "FIRST PARTY Date", type: "date", required: true },
      { name: "secondSignerName", label: "SECOND PARTY Name", type: "text", required: true },
      { name: "secondSignerTitle", label: "SECOND PARTY Title", type: "text", required: true },
      { name: "secondSignerSignature", label: "SECOND PARTY Signature", type: "text", required: true },
      { name: "secondSignerDate", label: "SECOND PARTY Date", type: "date", required: true },
    ],
  },
  {
    label: "Witnesses",
    fields: [
      { name: "w1Name", label: "Witness 1 Name", type: "text", required: true },
      { name: "w1Id", label: "Witness 1 CNIC/ID No.", type: "text", required: true },
      { name: "w1Signature", label: "Witness 1 Signature", type: "text", required: true },
      { name: "w1Date", label: "Witness 1 Date", type: "date", required: true },
      { name: "w2Name", label: "Witness 2 Name", type: "text", required: true },
      { name: "w2Id", label: "Witness 2 CNIC/ID No.", type: "text", required: true },
      { name: "w2Signature", label: "Witness 2 Signature", type: "text", required: true },
      { name: "w2Date", label: "Witness 2 Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "additionalClauses", label: "Additional clauses (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const s = u(value);
    doc.text(s, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1);
    y += 6.2;
  };

  const jurisdiction = `${u(v.stateJurisdiction)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`;

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "MEMORANDUM OF AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", jurisdiction);
  p(`This Memorandum of Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, 12)}, by and between:`);
  p(`- ${u(v.firstPartyName)}, having its principal place of business at ${u(v.firstPartyAddress)} (hereinafter referred to as the "First Party"); and`);
  p(`- ${u(v.secondPartyName)}, having its principal place of business at ${u(v.secondPartyAddress)} (hereinafter referred to as the "Second Party");`);
  p('Collectively referred to as the "Parties" and individually as a "Party."');
  p("The Parties hereby agree to be bound by the terms and conditions set forth herein for the purpose of defining their respective rights, obligations, and responsibilities.");

  p("1. TERM OF AGREEMENT", true);
  p("1.1 Duration", true);
  p(`This Agreement shall remain in full force and effect for a period of ${u(v.termLength)} (the "Term"), unless earlier terminated in accordance with the provisions herein.`);
  p("1.2 Early Termination", true);
  p("Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach. Termination of a portion of this Agreement shall not affect other provisions unless the breach results in the substantial loss of the Agreement's overall value to the non-breaching Party.");
  p("Termination shall not relieve either Party from obligations concerning confidentiality, non-disclosure, or other continuing covenants as set forth in this Agreement.");

  p("2. GOALS AND OBJECTIVES", true);
  p("The Parties agree to cooperate and perform their respective obligations to achieve the objectives outlined below:");
  p(`- ${u(v.goal1)}`);
  p(`- ${u(v.goal2)}`);
  p(`- ${u(v.goal3, 10)}`);
  p("The Parties shall act in good faith to further these goals and implement the terms of this Agreement effectively.");

  p("3. OBLIGATIONS OF THE PARTIES", true);
  p("3.1 First Party Obligations", true);
  p("The First Party shall:");
  p(`- Perform all duties, tasks, and services as specified in Schedule A: ${u(v.scheduleA)};`);
  p("- Provide timely reports and updates to the Second Party;");
  p("- Comply with all applicable laws, regulations, and standards relevant to the performance of this Agreement.");
  p("3.2 Second Party Obligations", true);
  p("The Second Party shall:");
  p(`- Perform all duties, tasks, and services as specified in Schedule B: ${u(v.scheduleB)};`);
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
  p(`This Agreement is entered into in consideration of the mutual covenants, promises, and undertakings set forth herein, including any specific consideration outlined in Schedule C (${u(v.scheduleC)}), which the Parties acknowledge as adequate and sufficient.`);

  p("7. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents and warrants to the other that:");
  p("- It has full legal capacity, power, and authority to execute and perform this Agreement;");
  p("- All necessary corporate or legal approvals have been obtained;");
  p("- This Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms;");
  p("- It shall act in good faith and take all necessary actions to effectuate the intent and purpose of this Agreement.");

  p("8. WORK PRODUCT AND INTELLECTUAL PROPERTY", true);
  p(`Any copyrightable works, inventions, discoveries, ideas, patents, or other proprietary materials developed wholly or partly in connection with the performance of this Agreement (the "Work Product") shall be the exclusive property of ${u(v.workProductOwner)}.`);
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
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(v.governingJurisdiction)}, without regard to its conflict of laws principles.`);
  p("15. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire understanding between the Parties regarding its subject matter and supersedes all prior oral or written agreements, representations, or understandings.");

  p("16. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Memorandum of Agreement as of the Effective Date.");
  p("FIRST PARTY", true);
  uf("Name: ", v.firstSignerName);
  uf("Title: ", v.firstSignerTitle);
  uf("Signature: ", v.firstSignerSignature);
  uf("Date: ", v.firstSignerDate);
  p("SECOND PARTY", true);
  uf("Name: ", v.secondSignerName);
  uf("Title: ", v.secondSignerTitle);
  uf("Signature: ", v.secondSignerSignature);
  uf("Date: ", v.secondSignerDate);
  p("WITNESSES", true);
  p("1.", true);
  uf("Name: ", v.w1Name);
  uf("CNIC/ID No.: ", v.w1Id);
  uf("Signature: ", v.w1Signature);
  uf("Date: ", v.w1Date);
  p("2.", true);
  uf("Name: ", v.w2Name);
  uf("CNIC/ID No.: ", v.w2Id);
  uf("Signature: ", v.w2Signature);
  uf("Date: ", v.w2Date);

  if ((v.additionalClauses || "").trim()) {
    p("Additional Clauses", true);
    p(v.additionalClauses);
  }

  doc.save("memorandum_of_agreement.pdf");
};

export default function MemorandumOfAgreementDocumentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum Of Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="memorandumofagreement"
      preserveStepLayout
    />
  );
}
