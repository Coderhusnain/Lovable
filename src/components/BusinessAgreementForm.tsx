import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Project",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "firstPartyName", label: "First party name", type: "text", required: true },
      { name: "secondPartyName", label: "Second party name", type: "text", required: true },
      { name: "businessName", label: "Business/project name", type: "text", required: true },
      { name: "projectDetails", label: "Project details to be sold/marketed", type: "textarea", required: true },
      { name: "deductionAmount", label: "Deduction amount from second party rebate/share", type: "text", required: true },
      { name: "commissionAmount", label: "Second party commission amount", type: "text", required: true },
      { name: "violationAmount", label: "Violation/penalty amount", type: "text", required: true },
    ],
  },
  {
    label: "Operations and Timeline",
    fields: [
      { name: "developmentExtensionDetail", label: "Development/extension detail", type: "text", required: true },
      { name: "constructionCompletionTime", label: "Construction completion time", type: "text", required: true },
      { name: "approvalDocsMonths", label: "Approval docs delivery months", type: "text", required: true, placeholder: "4" },
      { name: "boMeetingDays", label: "Board meeting interval days", type: "text", required: true, placeholder: "10" },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "firstPartySignatureName", label: "First party signatory name", type: "text", required: true },
      { name: "secondPartySignatureName", label: "Second party signatory name", type: "text", required: true },
      { name: "signDate", label: "Signing date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (v?: string, n = 14) => (v || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const l = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(l, m, y);
    const x = m + doc.getTextWidth(l);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "BUSINESS AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.4);

  p(`THIS BUSINESS AGREEMENT IS MADE on this ${u(values.agreementDate)}, between:`);
  p(`"FIRST PARTY" (${u(values.firstPartyName)}) and "SECOND PARTY" (${u(values.secondPartyName)}).`);
  p("WHEREAS both parties with free consent agree to initiate business upon the following terms and conditions:", false);

  p("1. First party is owner of project/business named:", true);
  uf("Project", values.businessName);
  p(`2. Exclusive marketing/sales rights are with second party; first party may sell subject to deduction of ${u(values.deductionAmount)} from second party rebate/share.`);
  p("3. Second party shall perform marketing duties including digital, print, outdoor, billboards, and TVC ads.");
  p("4. Second party shall develop complete campaign and generate market revenue.");
  p("5. Second party shall accommodate investors/clients associated with first party.");
  p(`6. Board of Directors meetings shall be held every ${u(values.boMeetingDays, 2)} days to discuss development.`);
  p("7. Transactions between parties shall be through banking channel only.");
  p("8. Taxes on each party share are paid by each respective party without deduction from other party payable.");
  p(`9. Second party will utilize necessary measures to sell: ${u(values.projectDetails, 20)}.`);
  p("10. Mega events require mutual consent of both parties.");
  p("11. Sales documentation samples will be drafted with mutual consent.");
  p(`12. Second party commission amount: ${u(values.commissionAmount)} of total sold units and related execution/transfer documents.`);
  p("13. Second party may acquire/book/hold units including in lieu of due payment.");
  p(`14. For development/extension in area ${u(values.developmentExtensionDetail)}, first party shall consult second party and proceed mutually.`);
  p(`15. If agreement is ended in violation, compensation/adjustment applies as agreed, including amount equivalent to ${u(values.violationAmount)} on relevant sales/pending payments.`);
  p("16. Second party has delegated sales rights and strategy control; first party shall not independently market subject units.");
  p("17. Agreement term continues until booking/sale of all units is complete and binds legal heirs.");
  p("18. First party ensures subject land is free from lien, mortgage, pledge, disputes, and shall bear sole responsibility for land-related issues/inquiries.");
  p(`First party shall provide approval documents of concerned authorities within ${u(values.approvalDocsMonths, 1)} months of signing.`);
  p("19. First party shall provide all relevant land documents including 2D/3D drawings and ensure work continuity and size compliance.");
  p(`20. First party bears authority/government taxes and shall complete construction within ${u(values.constructionCompletionTime)} from execution.`);
  p("21. Second party will ensure all payments are submitted in bank account.");
  p("22. First party ensures quality as agreed, otherwise second party may take over construction contract.");
  p("23. Every transaction via bank account; proportional land transferred at possession.");
  p("24. Parties confirm they read and understood all terms and execute with free consent in presence of witnesses.");

  p("Signature & Thumb Impression", true);
  uf("FIRST PARTY", values.firstPartySignatureName);
  uf("SECOND PARTY", values.secondPartySignatureName);
  uf("Date", values.signDate);

  doc.save("business_agreement.pdf");
};

export default function BusinessAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Business Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="businessagreement"
    />
  );
}
