import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Platform",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "instructorName", label: "Instructor name", type: "text", required: true },
      { name: "expertName", label: "Expert name", type: "text", required: true },
      { name: "platformName", label: "Platform name", type: "text", required: true },
      { name: "purposeText", label: "Purpose/project statement", type: "textarea", required: true },
      { name: "platformTermsRef", label: "Platform terms/policies reference", type: "text", required: false },
      { name: "pricingGuidelinesRef", label: "Pricing guidelines reference", type: "text", required: false },
    ],
  },
  {
    label: "Commercial and Legal",
    fields: [
      { name: "revenueSharePercent", label: "Expert revenue share %", type: "text", required: true },
      { name: "netRevenueDefinition", label: "Definition of Net Revenue", type: "textarea", required: true },
      { name: "revenueShareTerm", label: "Revenue share term", type: "text", required: true },
      { name: "marketingPrograms", label: "Marketing programs/tools", type: "textarea", required: false },
      { name: "confidentialityYears", label: "Confidentiality duration years", type: "text", required: true, placeholder: "2" },
      { name: "terminationDate", label: "Termination date (optional)", type: "date", required: false },
      { name: "jurisdiction", label: "Governing jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "instructorSignName", label: "Instructor signatory name", type: "text", required: false },
      { name: "instructorSignTitle", label: "Instructor title", type: "text", required: false },
      { name: "instructorSignDate", label: "Instructor sign date", type: "date", required: true },
      { name: "expertSignName", label: "Expert signatory name", type: "text", required: false },
      { name: "expertSignTitle", label: "Expert title", type: "text", required: false },
      { name: "expertSignDate", label: "Expert sign date", type: "date", required: true },
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
  const title = "COURSE PARTNERSHIP AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Course Partnership Agreement (the "Agreement") is entered into as of ${values.effectiveDate || "[Effective Date]"}, by and between:`);
  p(`- ${values.instructorName || "[Instructor Name]"} (the "Instructor"); and`);
  p(`- ${values.expertName || "[Expert Name]"} (the "Expert").`);
  p('Collectively, the Instructor and Expert are referred to as the "Parties" and individually as a "Party."');
  p(`WHEREAS, the Expert wishes to provide assistance in delivering localized experience of Instructor's English language course(s) offered on ${values.platformName || "[name of platform]"}; and`);
  p("WHEREAS, the Parties desire to set forth terms and conditions governing their rights, obligations, and relationship in connection with services provided;");
  p("NOW, THEREFORE, in consideration of mutual promises and covenants, Parties agree as follows:", false, 3);

  p("1. PURPOSE", true);
  p(`Purpose is to define terms under which Expert assists Instructor in localizing, delivering, and promoting course(s) on platform. ${values.purposeText || ""}`);
  p(`Agreement is subject to platform Terms & Conditions, Terms of Use, Privacy Policy, and Copyright Policy as published at ${values.platformTermsRef || "-------------"}. In event of conflict between this Agreement and platform Terms of Use, this Agreement governs.`, false, 3);
  p("2. PROGRAM SCOPE AND SERVICES", true);
  p("2.1 Services: Instructor shall provide services for indicated course(s) on completion date(s) set forth.");
  p("2.2 Expert's Commitment: Expert shall use commercially reasonable efforts to complete services by agreed completion date(s).");
  p(`2.3 Course Pricing: Parties agree course pricing conforms to platform pricing guidelines (${values.pricingGuidelinesRef || "--------------"}), recognizing changes from time to time.`);
  p("2.4 Quality Standards: Parties shall work in good faith, provide constructive feedback, and ensure all proposed courses comply with quality control standards.", false, 3);
  p("3. REVENUE SHARE", true);
  p(`Instructor shall provide Expert with ${values.revenueSharePercent || "[●]"}% of Net Revenue (${values.netRevenueDefinition || "[Insert Definition of Net Revenue]"}) for term ${values.revenueShareTerm || "[Insert Term]"}.`, false, 3);
  p("4. CONFIDENTIALITY", true);
  p("4.1 Confidential Information includes documented information communicated by one Party to the other, before or during term, marked confidential/proprietary or reasonably understood as confidential, including customer/HR/finance/operations/inventory/purchasing/merchandising/plans/strategies/forecasts.");
  p("4.2 Each Party shall use confidential information only for this Agreement, restrict disclosure to need-to-know personnel, advise them of obligations, and take reasonable precautions.");
  p("4.3 Exclusions: publicly known information, information already known/available to receiving Party, or legally compelled disclosure.");
  p(`4.4 Duration: confidentiality obligations remain for ${values.confidentialityYears || "2"} years following return of confidential information or termination, whichever is later.`, false, 3);
  p("5. MARKETING AND PROMOTION", true);
  p(`Parties agree to utilize mutually agreed promotional methods/tools: ${values.marketingPrograms || "Deals Program; Marketing Boost Program"} and collaborate on other agreed initiatives.`, false, 3);
  p("6. OWNERSHIP, INTELLECTUAL PROPERTY, AND REPRESENTATIONS", true);
  p("6.1 Independent Contractor: Expert performs as independent contractor; no employment/agency/fiduciary relationship and no authority to bind Instructor.");
  p("6.2 Taxes: Fees are exclusive of taxes/duties/charges; each Party solely responsible for own tax obligations.");
  p("6.3 Intellectual Property Rights: All course content/materials/work produced remain exclusive property of Instructor unless otherwise agreed in writing.");
  p("6.4 Representations and Warranties: Each Party has full authority to enter and perform this Agreement.", false, 3);
  p("7. TERM AND TERMINATION", true);
  p(`Agreement commences on Effective Date and remains in force until completion of services or ${values.terminationDate || "[Insert Termination Date]"}, unless earlier terminated by mutual written consent or for cause. Termination does not relieve confidentiality/IP obligations accrued prior to termination.`, false, 3);
  p("8. GOVERNING LAW AND DISPUTE RESOLUTION", true);
  p(`Agreement governed and construed in accordance with laws of ${values.jurisdiction || "[Insert Jurisdiction]"}. Disputes first attempted by good-faith negotiations; if unresolved, Parties may seek mediation or other mutually agreed ADR.`, false, 3);
  p("9. MISCELLANEOUS", true);
  p("9.1 Entire Agreement: Agreement, together with platform Terms of Use, constitutes entire agreement and supersedes prior oral/written understandings.");
  p("9.2 Amendment: Any modification/amendment must be in writing and signed by both Parties.");
  p("9.3 Severability: If any provision is invalid/unenforceable, remaining provisions remain in full force and effect.");
  p("9.4 Waiver: Failure to enforce any provision is not waiver of future enforcement.", false, 3);
  p("10. SIGNATURES", true);
  p("INSTRUCTOR:");
  uf("Name", values.instructorSignName, 22);
  uf("Title", values.instructorSignTitle, 22);
  p("Signature: ________________________");
  uf("Date", values.instructorSignDate, 22, 2.2);
  p("EXPERT:");
  uf("Name", values.expertSignName, 22);
  uf("Title", values.expertSignTitle, 22);
  p("Signature: ________________________");
  uf("Date", values.expertSignDate, 22);

  doc.save("course_partnership_agreement.pdf");
};

export default function CoursePartnershipAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Course Partnership Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="coursepartnershipagreement"
    />
  );
}
