import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "firstPartyName", label: "First party name", type: "text", required: true },
      { name: "firstPartyAddress", label: "First party address", type: "text", required: true },
      { name: "secondPartyName", label: "Second party name", type: "text", required: true },
      { name: "secondPartyAddress", label: "Second party address", type: "text", required: true },
      { name: "firstBusiness", label: "First party business", type: "text", required: true },
      { name: "secondBusiness", label: "Second party business", type: "text", required: true },
      { name: "territory", label: "Territory", type: "text", required: true },
    ],
  },
  {
    label: "Commercial and Legal Terms",
    fields: [
      { name: "brokerFee", label: "Fee/percentage/share text", type: "text", required: false },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
      { name: "endDate", label: "Agreement end date", type: "date", required: true },
      { name: "jurisdiction", label: "Governing jurisdiction", type: "text", required: true },
      { name: "witness1Name", label: "Witness 1 name", type: "text", required: false },
      { name: "witness1Id", label: "Witness 1 CNIC/ID", type: "text", required: false },
      { name: "witness1Date", label: "Witness 1 date", type: "date", required: false },
      { name: "witness2Name", label: "Witness 2 name", type: "text", required: false },
      { name: "witness2Id", label: "Witness 2 CNIC/ID", type: "text", required: false },
      { name: "witness2Date", label: "Witness 2 date", type: "date", required: false },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "firstSignName", label: "First party signatory name", type: "text", required: true },
      { name: "firstSignTitle", label: "First party signatory title", type: "text", required: false },
      { name: "firstSignDate", label: "First party sign date", type: "date", required: true },
      { name: "secondSignName", label: "Second party signatory name", type: "text", required: true },
      { name: "secondSignTitle", label: "Second party signatory title", type: "text", required: false },
      { name: "secondSignDate", label: "Second party sign date", type: "date", required: true },
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
  const title = "CO-MARKETING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `This Co-Marketing Agreement (the "Agreement") is made and entered into as of ${values.effectiveDate || "[Effective Date]"}, by and between:`
  );
  p(`- ${values.firstPartyName || "[First Party Name]"}, having its principal place of business at ${values.firstPartyAddress || "[Address]"} (the "First Party");`);
  p(`- ${values.secondPartyName || "[Second Party Name]"}, having its principal place of business at ${values.secondPartyAddress || "[Address]"} (the "Second Party");`);
  p('Collectively referred to as the "Parties" and individually as a "Party."');
  p(
    `WHEREAS, the First Party is engaged in ${values.firstBusiness || "[Specify Business]"}, and the Second Party is engaged in ${values.secondBusiness || "[Specify Business]"}; and`
  );
  p("WHEREAS, the Parties desire to cooperate in marketing, promoting, and selling each other's products to their respective customer bases and prospects;");
  p("NOW, THEREFORE, in consideration of the mutual covenants, promises, and obligations set forth herein, the Parties agree as follows:", false, 3);

  p("1. TERRITORY", true);
  p(`The Parties shall promote, market, and sell the products of the other Party solely within ${values.territory || "[Specify Territory]"} (the "Territory").`, false, 3);
  p("2. PROMOTION AND MARKETING", true);
  p("2.1 Joint Marketing Activities: The Parties shall plan and execute joint marketing activities, including seminars, open houses, public relations campaigns, press releases, testimonials, product demonstrations, and participation in trade shows/conventions/conferences as mutually agreed.");
  p("2.2 Approval of Materials: All promotional materials relating to either Party must be reviewed and approved in writing by the other Party prior to dissemination.");
  p("2.3 Post-Termination: Upon expiration or termination, neither Party is obligated to continue promoting the other Party's products unless agreed in writing.");
  p("2.4 Market Development: Parties shall cooperate in identifying viable market segments, applications, potential customers, and future market needs.", false, 3);
  p("3. TRAINING AND OPERATIONAL SUPPORT", true);
  p("3.1 Training: Each Party shall provide technical training sufficient for effective marketing.");
  p("3.2 Staffing and Resources: Each Party shall determine, in its sole discretion, personnel/resources/support; each Party bears its own costs unless otherwise agreed.");
  p("3.3 Customer Engagement: Parties shall share leads and conduct joint demonstrations/visits/presentations/proposals as appropriate.", false, 3);
  p("4. PRODUCTS, SALES, AND COSTS", true);
  p("4.1 Product Sales: Each Party shall sell or rent the other Party's products pursuant to standard procedures or special agreements executed in advance.");
  p("4.2 Cost Sharing: Parties share responsibility for campaign costs/management/tracking, including staff deployment.");
  p(`4.3 Accounting and Payment: Each Party shall submit monthly itemized accounting statements and make payments promptly per agreed terms ${values.brokerFee ? `(${values.brokerFee})` : ""}. Failure to submit accurate accounting or timely payment is a material default.`, false, 3);
  p("5. INTELLECTUAL PROPERTY AND TRADEMARKS", true);
  p("5.1 Use of Marks and Names: Neither Party shall use the other Party's name/trademarks/trade names without prior written consent.");
  p("5.2 Ownership: All IP/trademarks/trade names remain exclusive property of the owning Party.");
  p("5.3 No Rights or Licenses: No rights/licenses beyond expressly contemplated co-marketing activities are granted.", false, 3);
  p("6. CONFIDENTIALITY", true);
  p("Each Party shall maintain confidential information in strict confidence and use solely for purposes of this Agreement. Disclosure only as required by law or prior written consent.", false, 3);
  p("7. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other Party against claims/losses/costs/damages/liabilities arising out of its acts or omissions, including those of its personnel.", false, 3);
  p("8. DEFAULT AND REMEDIES", true);
  p(
    `Material defaults include non-payment, insolvency/bankruptcy, seizure/levy/assignment, and failure to provide required assistance/services. Non-defaulting Party may issue written notice; defaulting Party has ${values.cureDays || "[Specify Number of Days]"} days to cure, failing which non-defaulting Party may terminate and pursue legal remedies.`,
    false,
    3
  );
  p("9. FORCE MAJEURE", true);
  p("Neither Party shall be liable for delays/failures due to causes beyond reasonable control; affected Party shall promptly notify and make reasonable efforts to resume performance.", false, 3);
  p("10. TERM AND TERMINATION", true);
  p(`Agreement commences on Effective Date and continues until ${values.endDate || "[Specify End Date]"}, unless earlier terminated in accordance with this Agreement.`, false, 3);
  p("11. BOILERPLATE PROVISIONS", true);
  p("Assignment restriction; entire agreement; severability; amendment in writing; governing law; notice method; no waiver by non-enforcement; headings for reference only.");
  p(`11.5 Governing Law: This Agreement is governed by and construed in accordance with the laws of ${values.jurisdiction || "[Specify Jurisdiction]"}.`, false, 3);
  p("12. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Co-Marketing Agreement as of the date first written above.");
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

  doc.save("co_marketing_agreement.pdf");
};

export default function CoMarketingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Co Marketing Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="comarketingagreement"
    />
  );
}
