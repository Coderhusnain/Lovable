import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Purpose",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "firstPartyName", label: "First party name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First party address", type: "text", required: true },
      { name: "secondPartyName", label: "Second party name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second party address", type: "text", required: true },
      { name: "termPeriod", label: "Agreement period", type: "text", required: true },
      { name: "purpose", label: "Purpose/project/business collaboration", type: "textarea", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "arbitrationBody", label: "Arbitration body", type: "text", required: false },
      { name: "jurisdiction", label: "Governing jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Signatories and Witnesses",
    fields: [
      { name: "firstSignName", label: "First party signatory name", type: "text", required: false },
      { name: "firstSignTitle", label: "First party signatory title", type: "text", required: false },
      { name: "firstSignDate", label: "First party sign date", type: "date", required: true },
      { name: "secondSignName", label: "Second party signatory name", type: "text", required: false },
      { name: "secondSignTitle", label: "Second party signatory title", type: "text", required: false },
      { name: "secondSignDate", label: "Second party sign date", type: "date", required: true },
      { name: "witness1Name", label: "Witness 1 name", type: "text", required: false },
      { name: "witness1Id", label: "Witness 1 CNIC/ID", type: "text", required: false },
      { name: "witness1Date", label: "Witness 1 date", type: "date", required: false },
      { name: "witness2Name", label: "Witness 2 name", type: "text", required: false },
      { name: "witness2Id", label: "Witness 2 CNIC/ID", type: "text", required: false },
      { name: "witness2Date", label: "Witness 2 date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;

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

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "COOPERATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Cooperation Agreement (the "Agreement") is entered into as of ${values.effectiveDate || "[Effective Date]"} (the "Effective Date") by and between:`);
  p(`- ${values.firstPartyName || "[First Party Name]"}, having principal place of business at ${values.firstPartyAddress || "[Address]"} (the "First Party"); and`);
  p(`- ${values.secondPartyName || "[Second Party Name]"}, having principal place of business at ${values.secondPartyAddress || "[Address]"} (the "Second Party").`);
  p('Collectively referred to as the "Parties" and individually as a "Party."', false, 3);

  p("1. TERM OF AGREEMENT", true);
  p(`1.1 Duration: This Agreement remains in force for ${values.termPeriod || "[Specify Period]"}, unless earlier terminated.`);
  p("1.2 Early Termination: Either Party may terminate on material breach not remedied within thirty (30) days after written notice. Partial termination shall not affect other provisions unless breach materially deprives non-breaching Party of substantial benefit. Confidentiality/restrictive covenant obligations survive termination.", false, 3);
  p("2. PURPOSE AND OBJECTIVES", true);
  p(`Parties cooperate in connection with ${values.purpose || "[describe purpose/project/business collaboration]"}. Objectives include defining scope, allocating responsibilities, and establishing mechanisms for information sharing/confidentiality/dispute resolution.`, false, 3);
  p("3. OBLIGATIONS OF THE PARTIES", true);
  p("3.1 First Party Responsibilities: perform duties in Schedule A, comply with applicable law, and provide timely reports/updates/information.");
  p("3.2 Second Party Responsibilities: perform duties in Schedule B, cooperate fully, and maintain accurate records available for inspection upon request.", false, 3);
  p("4. EXCHANGE OF INFORMATION AND CONFIDENTIALITY", true);
  p("4.1 Each Party shall keep Confidential Information strictly confidential, use solely for this Agreement, and prevent unauthorized disclosure.");
  p("4.2 Exceptions: publicly available information, lawfully obtained third-party information, or required legal disclosure with prompt notice.");
  p("4.3 Return of Materials: Upon request, all Confidential Information/materials/documentation must be returned or destroyed with written confirmation.", false, 3);
  p("5. RELATIONSHIP OF THE PARTIES", true);
  p("Nothing creates partnership/joint venture/agency/employment relationship; neither Party may bind the other except as expressly provided.", false, 3);
  p("6. CONSIDERATION", true);
  p("Agreement is supported by mutual covenants/promises/obligations and additional consideration in Schedule C, acknowledged as sufficient.", false, 3);
  p("7. REPRESENTATIONS AND WARRANTIES", true);
  p("Each Party represents full legal authority/capacity, required approvals, valid binding obligations under Agreement, and good-faith performance.", false, 3);
  p("8. DEFAULT AND REMEDIES", true);
  p(`Material default includes non-payment, insolvency/bankruptcy/receivership, seizure/levy/assignment for creditor benefit, and failure to deliver/perform services per Agreement. Non-defaulting Party may issue written notice; defaulting Party has ${values.cureDays || "[Specify Number]"} days to cure; if uncured, non-defaulting Party may terminate and pursue legal/equitable remedies.`);
  p("9. LIMITATION OF LIABILITY", true);
  p("Neither Party liable for indirect/incidental/consequential/special/exemplary damages including revenue/profit/business interruption losses.");
  p("10. INDEMNIFICATION", true);
  p("Each Party indemnifies/defends/holds harmless other Party and its affiliates/officers/directors/employees/agents from third-party claims arising from breach, negligence/willful misconduct/fraud, or legal/regulatory violations.");
  p("11. FORCE MAJEURE", true);
  p("Performance may be suspended/excused for events beyond reasonable control (acts of God, pandemics, war, terrorism, civil unrest, fire, strikes, governmental actions). Affected Party shall promptly notify, mitigate, and resume performance.");
  p("12. DISPUTE RESOLUTION AND ARBITRATION", true);
  p(`Parties first attempt good-faith negotiations, then mediation, then binding arbitration under Commercial Arbitration Rules of ${values.arbitrationBody || "[Specify Arbitration Body]"}; award final and binding.`);
  p("13. NOTICE", true);
  p("Notices effective if delivered personally/by courier/by certified mail to stated addresses or updated written address. Receipt deemed on personal delivery/courier receipt date/or three (3) days after certified mailing.");
  p("14. ASSIGNMENT", true);
  p("Neither Party may assign/transfer/delegate rights or obligations without prior written consent of other Party, not unreasonably withheld.");
  p("15. ENTIRE AGREEMENT", true);
  p("This Agreement is entire understanding and supersedes prior oral/written agreements/promises/representations.");
  p("16. SEVERABILITY", true);
  p("Invalid/illegal/unenforceable provisions are severed/limited; remaining provisions continue in full force and effect.");
  p("17. AMENDMENT", true);
  p("Agreement may be modified/amended/supplemented only by writing signed by both Parties.");
  p("18. WAIVER", true);
  p("Failure to enforce any provision is not waiver of right to later enforce strict compliance.");
  p("19. GOVERNING LAW", true);
  p(`Agreement shall be governed, construed, and enforced in accordance with laws of ${values.jurisdiction || "[Specify Jurisdiction]"}, without conflict-of-laws principles.`);
  p("20. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties, intending to be legally bound, executed this Cooperation Agreement as of Effective Date.");
  p("FIRST PARTY", true, 1);
  uf("Name", values.firstSignName, 22);
  uf("Title", values.firstSignTitle, 22);
  p("Signature: ________________________");
  uf("Date", values.firstSignDate, 22, 2.2);
  p("SECOND PARTY", true, 1);
  uf("Name", values.secondSignName, 22);
  uf("Title", values.secondSignTitle, 22);
  p("Signature: ________________________");
  uf("Date", values.secondSignDate, 22, 2.2);
  p("WITNESSES", true, 1);
  p("1.");
  uf("Name", values.witness1Name, 22);
  uf("CNIC/ID No.", values.witness1Id, 22);
  p("Signature: ________________________");
  uf("Date", values.witness1Date, 22, 2.2);
  p("2.");
  uf("Name", values.witness2Name, 22);
  uf("CNIC/ID No.", values.witness2Id, 22);
  p("Signature: ________________________");
  uf("Date", values.witness2Date, 22);

  doc.save("cooperation_agreement.pdf");
};

export default function CooperationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Cooperation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cooperationagreement"
    />
  );
}
