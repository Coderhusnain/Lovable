import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State/Jurisdiction", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "firstPartyName", label: "First Party Name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First Party Address", type: "textarea", required: true },
      { name: "secondPartyName", label: "Second Party Name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second Party Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Term, Goals and Consideration",
    fields: [
      { name: "termLength", label: "Term of Agreement", type: "text", required: true },
      { name: "goal1", label: "Goal 1", type: "text", required: true },
      { name: "goal2", label: "Goal 2", type: "text", required: true },
      { name: "goal3", label: "Additional Objective (Optional)", type: "text", required: false },
      { name: "scheduleC", label: "Schedule C Consideration", type: "textarea", required: true },
      { name: "workProductOwner", label: "Work Product Owner", type: "text", required: true },
    ],
  },
  {
    label: "Obligations and Confidentiality",
    fields: [
      { name: "scheduleA", label: "Schedule A Obligations", type: "textarea", required: true },
      { name: "scheduleB", label: "Schedule B Obligations", type: "textarea", required: true },
      { name: "firstPartyAdditionalObligations", label: "First Party Additional Obligations (Optional)", type: "textarea", required: false },
      { name: "secondPartyAdditionalObligations", label: "Second Party Additional Obligations (Optional)", type: "textarea", required: false },
      { name: "noticeAddressOverride", label: "Alternate Notice Address (Optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Legal Terms and Governing Law",
    fields: [
      { name: "cureDays", label: "Default Cure Days", type: "text", required: true },
      { name: "governingJurisdiction", label: "Governing Jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Signatories and Witnesses",
    fields: [
      { name: "firstSignerName", label: "First Party Signer Name", type: "text", required: true },
      { name: "firstSignerTitle", label: "First Party Signer Title", type: "text", required: true },
      { name: "firstSignerSignature", label: "First Party Signature Text", type: "text", required: true },
      { name: "firstSignerDate", label: "First Party Sign Date", type: "date", required: true },
      { name: "secondSignerName", label: "Second Party Signer Name", type: "text", required: true },
      { name: "secondSignerTitle", label: "Second Party Signer Title", type: "text", required: true },
      { name: "secondSignerSignature", label: "Second Party Signature Text", type: "text", required: true },
      { name: "secondSignerDate", label: "Second Party Sign Date", type: "date", required: true },
      { name: "witness1Name", label: "Witness 1 Name", type: "text", required: false },
      { name: "witness1Id", label: "Witness 1 CNIC/ID No.", type: "text", required: false },
      { name: "witness1Signature", label: "Witness 1 Signature Text", type: "text", required: false },
      { name: "witness1Date", label: "Witness 1 Date", type: "date", required: false },
      { name: "witness2Name", label: "Witness 2 Name", type: "text", required: false },
      { name: "witness2Id", label: "Witness 2 CNIC/ID No.", type: "text", required: false },
      { name: "witness2Signature", label: "Witness 2 Signature Text", type: "text", required: false },
      { name: "witness2Date", label: "Witness 2 Date", type: "date", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
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

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "MEMORANDUM OF AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);
  p(`This Memorandum of Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, 12)}, by and between ${u(v.firstPartyName)}, having its principal place of business at ${u(v.firstPartyAddress)} (the "First Party"), and ${u(v.secondPartyName)}, having its principal place of business at ${u(v.secondPartyAddress)} (the "Second Party"). Collectively referred to as the "Parties" and individually as a "Party."`);
  p("The Parties hereby agree to be bound by the terms and conditions set forth herein for the purpose of defining their respective rights, obligations, and responsibilities.");

  p("1. TERM OF AGREEMENT", true);
  p(`1.1 Duration: This Agreement shall remain in full force and effect for a period of ${u(v.termLength)} (the "Term"), unless earlier terminated in accordance with the provisions herein.`);
  p("1.2 Early Termination: Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach. Termination of a portion of this Agreement shall not affect other provisions unless the breach results in substantial loss of overall value to the non-breaching Party. Termination shall not relieve either Party from confidentiality, non-disclosure, or other continuing covenants.");

  p("2. GOALS AND OBJECTIVES", true);
  p(`The Parties agree to cooperate and perform obligations to achieve objectives: ${u(v.goal1)}; ${u(v.goal2)}; ${(v.goal3 || "").trim() ? v.goal3 : "additional objectives as applicable"}. The Parties shall act in good faith to further these goals and implement this Agreement effectively.`);

  p("3. OBLIGATIONS OF THE PARTIES", true);
  p("3.1 First Party Obligations: Perform duties/tasks/services as specified in Schedule A; provide timely reports and updates to the Second Party; comply with applicable laws/regulations/standards.");
  p(`Schedule A: ${u(v.scheduleA)}.${(v.firstPartyAdditionalObligations || "").trim() ? ` Additional obligations: ${v.firstPartyAdditionalObligations}.` : ""}`);
  p("3.2 Second Party Obligations: Perform duties/tasks/services as specified in Schedule B; cooperate fully with the First Party; maintain accurate records and provide access for inspection as reasonably requested.");
  p(`Schedule B: ${u(v.scheduleB)}.${(v.secondPartyAdditionalObligations || "").trim() ? ` Additional obligations: ${v.secondPartyAdditionalObligations}.` : ""}`);

  p("4. CONFIDENTIALITY AND INFORMATION DISCLOSURE", true);
  p("4.1 Confidentiality: Each Party shall treat as strictly confidential all information received in connection with this Agreement.");
  p("4.2 Permitted Disclosures: Only if (i) required by applicable law/governmental authority, (ii) already in public domain through no fault of disclosing Party, or (iii) authorized in writing by the other Party after consultation and notice.");
  p("4.3 Return of Information: Upon request, all documents/records/materials containing Confidential Information shall be returned or destroyed, with written confirmation.");

  p("5. RELATIONSHIP OF THE PARTIES", true);
  p("The Parties acknowledge their relationship as partners in a partnership solely for the purpose of achieving objectives of this Agreement. Nothing creates a joint venture, employment, agency, or other fiduciary relationship.");
  p("6. CONSIDERATION", true);
  p(`This Agreement is entered into in consideration of mutual covenants/promises/undertakings, including Schedule C: ${u(v.scheduleC)}, acknowledged as adequate and sufficient.`);
  p("7. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents and warrants full legal capacity/power/authority, necessary approvals, legal/valid/binding enforceability, and good-faith action to effectuate the intent and purpose of this Agreement.");

  p("8. WORK PRODUCT AND INTELLECTUAL PROPERTY", true);
  p(`Any copyrightable works, inventions, discoveries, ideas, patents, or other proprietary materials developed wholly or partly in connection with performance of this Agreement (the "Work Product") shall be exclusive property of ${u(v.workProductOwner)}. Parties agree to execute documents necessary to confirm or perfect ownership rights.`);

  p("9. NOTICE", true);
  p(`Any notice required/permitted shall be deemed sufficiently given if delivered personally or by certified mail return receipt requested to listed addresses${(v.noticeAddressOverride || "").trim() ? `, including alternate address: ${v.noticeAddressOverride}` : ""}. Notices are deemed received upon personal delivery, on acknowledgment date for certified mail, or on third day after mailing if not acknowledged.`);
  p("10. TERMINATION AND REMEDIES", true);
  p(`Either Party may terminate for material breach if uncured within thirty (30) days of written notice. In addition, default cure period is ${u(v.cureDays, 2)} days where specified; failure to cure entitles non-defaulting Party to terminate and exercise legal remedies.`);
  p("11. AMENDMENT | 12. SEVERABILITY | 13. WAIVER OF RIGHTS", true);
  p("Amendment only by written instrument executed by all Parties. Invalid/illegal/unenforceable provisions are severed or limited as necessary; remaining provisions remain in force. Failure to enforce is not a waiver of future enforcement.");
  p("14. GOVERNING LAW | 15. ENTIRE AGREEMENT", true);
  p(`This Agreement is governed by and construed in accordance with laws of ${u(v.governingJurisdiction)}, without regard to conflict-of-laws principles. This Agreement constitutes the entire understanding and supersedes prior oral/written agreements/representations/understandings.`);

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
  if ((v.witness1Name || "").trim()) {
    uf("1. Name: ", v.witness1Name);
    uf("CNIC/ID No.: ", v.witness1Id);
    uf("Signature: ", v.witness1Signature);
    uf("Date: ", v.witness1Date);
  }
  if ((v.witness2Name || "").trim()) {
    uf("2. Name: ", v.witness2Name);
    uf("CNIC/ID No.: ", v.witness2Id);
    uf("Signature: ", v.witness2Signature);
    uf("Date: ", v.witness2Date);
  }

  doc.save("memorandum_of_agreement.pdf");
};

export default function MemorandumOfAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum Of Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="memorandumofagreement"
    />
  );
}
