import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "sellerAddress", label: "Seller full residential address", type: "text", required: false },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer full residential address", type: "text", required: false },
      { name: "existingShareholderName", label: "Existing shareholder name", type: "text", required: false },
      { name: "executionCity", label: "Execution city", type: "text", required: false },
      { name: "executionDay", label: "Execution day", type: "text", required: false },
      { name: "executionMonthYear", label: "Execution month/year", type: "text", required: false },
    ],
  },
  {
    label: "Company and Shares",
    fields: [
      { name: "companyName", label: "Company name", type: "text", required: true },
      { name: "incorporationNo", label: "Incorporation number", type: "text", required: false },
      { name: "stateLaw", label: "State/country of incorporation law", type: "text", required: false },
      { name: "shareAmount", label: "Share amount/percentage", type: "text", required: false },
      { name: "applicableState", label: "Applicable law state/country", type: "text", required: false },
    ],
  },
  {
    label: "Signatures and Witnesses",
    fields: [
      { name: "sellerSignerDate", label: "Seller signature date", type: "date", required: false },
      { name: "buyerSignerDate", label: "Buyer signature date", type: "date", required: false },
      { name: "existingShareholderSignerDate", label: "Existing shareholder signature date", type: "date", required: false },
      { name: "witness1Name", label: "Witness 1 name", type: "text", required: false },
      { name: "witness1Cnic", label: "Witness 1 CNIC/ID", type: "text", required: false },
      { name: "witness2Name", label: "Witness 2 name", type: "text", required: false },
      { name: "witness2Cnic", label: "Witness 2 CNIC/ID", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

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
  const title = "SHARE PURCHASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This SHARE PURCHASE AGREEMENT ("Agreement") is made at ${u(values.executionCity, 10)} on this ${u(values.executionDay, 4)} day of ${u(values.executionMonthYear, 10)} ("Effective Date");`);
  p(`BY AND BETWEEN ${u(values.sellerName, 12)}, residing at ${u(values.sellerAddress, 16)} (hereinafter referred to as "Seller"), AND ${u(values.buyerName, 12)}, residing at ${u(values.buyerAddress, 16)} (hereinafter referred to as "Buyer").`);
  p('(The Seller and Buyer may collectively be referred to as the "Parties" and/or individually as the "Party").', false, 2.5);
  p("RECITALS", true);
  p(`I. WHEREAS ${u(values.companyName, 14)} bearing incorporation No. ${u(values.incorporationNo, 10)} is duly incorporated under the laws of ${u(values.stateLaw, 10)} ("Company");`);
  p(`II. WHEREAS at the date hereof, the Seller is a shareholder of Company and holds a total of ${u(values.shareAmount, 8)} of the total issued and paid up share capital of the Company in the form of ordinary shares ("Shares");`);
  p("III. AND WHEREAS the Seller agrees to sell the Shares and the Buyer agrees to purchase the Shares on the terms and conditions set forth in this Agreement.");
  p("NOW, THEREFORE, THIS AGREEMENT WITNESSETH AS FOLLOWS:", false, 3);

  p("1. ARTICLE 1 - DEFINITIONS", true);
  p("1.1 In this Agreement, unless the context requires otherwise, all capitalised terms shall have the meanings set forth below:");
  p('1.1.1 "Agreement" shall mean this Share Purchase Agreement and includes its Recitals, which form an integral part of this Agreement for all purposes;');
  p(`1.1.2 "Applicable Law" means any constitution, statute, code, regulation, legislation, rule, ordinance, injunction, judgement, order, decree, ruling, charge, treaty, bilateral or multilateral agreement, embargo, sanction, statutory requirement or other restriction of or interpretation thereof as applicable to ${u(values.applicableState, 10)}.`);
  p('1.1.3 "Buyer" shall mean the signatory as Buyer as mentioned in this Agreement and include legal heirs, agents, successors-in-interest and permitted assigns;');
  p('1.1.4 "Effective Date" means the day on which the last Party signing this Agreement has signed this Agreement;');
  p('1.1.5 "Encumbrances" includes any option, right to acquire, mortgage, charge, pledge, lien, assignment by way of security, trust arrangement, or other form of security or encumbrance;');
  p('1.1.6 "Indemnifying Party" shall include the Buyers and Existing Shareholder, and include legal heirs, agents, successors-in-interest and permitted assigns.');

  p("2. ARTICLE 2 - TRANSACTION OF SHARES", true);
  p("2.1 Subject to the terms and conditions of this Agreement, the Seller hereby sells and transfers to the Buyers, and the Buyers shall purchase and acquire from the Seller, the shares free and clear of any Encumbrances.");
  p("2.2 Upon signing of this Agreement by Parties, the Seller shall promptly transfer and deliver to the Buyers the share certificates and all other relevant documents including but not limited to transfer deeds and board resolutions representing the sale of Shares.");
  p("2.3 The transfer of Shares shall be effective as of Effective Date, from and after which:");
  p("2.3.1 the Buyer shall be the exclusive owner of the Shares for all intents and purposes;");
  p("2.3.2 the Seller's resignation as director shall become effective.");

  p("3. ARTICLE 3 - REPRESENTATIONS AND WARRANTIES", true);
  p("3.1 The Seller, by signing this Agreement, represents and warrants full power and authority to execute and perform this Agreement, and that the transaction does not conflict with constituent documents or certifications of shares.");
  p(`3.1.3 The Seller has already made an offer to Existing Shareholder ${u(values.existingShareholderName, 14)} who had the right of first refusal and has declined, thereby permitting the Buyers to purchase the Shares.`);
  p("3.1.4 Upon payment in full of the Purchase Price, good and valid title of the Shares shall pass to the Buyers, free and clear of any Encumbrances.");
  p("3.2 The Existing Shareholder represents that the Company is duly incorporated, validly existing and in good standing.");
  p("3.3 The Existing Shareholder has not engaged in activities that may expose the Seller to litigation, and no such proceedings are pending or threatened against the Company and its shareholders.");

  p("4. ARTICLE 4 - INDEMNIFICATION", true);
  p("4.1 The Indemnifying Party shall defend, indemnify and hold harmless the Seller for the period served as director/shareholder against losses, claims, demands, punitive damages, expenses, causes of action, judgment and/or costs arising from breaches, enforcement of rights, taxes/liabilities prior to Effective Date, and operations/actions of the Company before and after Effective Date.");
  p("4.2 This Article remains valid and enforceable upon termination or expiration of any existing agreement or arrangement.");

  p("5. ARTICLE 5 - MISCELLANEOUS", true);
  p("5.1 The Indemnifying Party shall bear all expenses incurred in connection with transfer of Shares.");
  p("5.2 The Indemnifying Party undertakes to assist the Seller for execution before any regulator or official authority.");
  p("5.3 The Parties shall maintain confidentiality and not use exchanged information except to further the share transaction; this survives for twelve (12) months after Effective Date.");
  p("5.4 Relevant Parties shall exercise voting rights to achieve the purpose of the Agreement.");
  p("5.5 The Agreement may be amended or assigned only by written consent of all Parties.");
  p("5.6 Any waiver by any Party of any right shall not imply waiver of any other right or subsequent waiver.");
  p("5.7 Each Party agrees to do all acts and execute all requisite documents required to accomplish objectives of this Agreement.");
  p(`5.8 This Agreement is governed by the Applicable Laws of ${u(values.applicableState, 10)} and the courts at ${u(values.executionCity, 10)} shall have exclusive jurisdiction.`);

  p("IN WITNESS WHEREOF, the Parties hereto have caused this Agreement to be duly executed as of the date and year first written above.", false, 3);
  p("Seller:");
  uf("Name", values.sellerName, 24);
  p("Signature: ___________________________");
  uf("Date", values.sellerSignerDate, 14);
  p("Buyer:");
  uf("Name", values.buyerName, 24);
  p("Signature: ___________________________");
  uf("Date", values.buyerSignerDate, 14);
  p("Existing Shareholder:");
  uf("Name", values.existingShareholderName, 24);
  p("Signature: ___________________________");
  uf("Date", values.existingShareholderSignerDate, 14);
  p("Witnesses:");
  uf("Witness 1 Name", values.witness1Name, 20);
  uf("Witness 1 CNIC", values.witness1Cnic, 16);
  uf("Witness 2 Name", values.witness2Name, 20);
  uf("Witness 2 CNIC", values.witness2Cnic, 16);

  doc.save("share_purchase_agreement.pdf");
};

export default function SharePurchaseAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Share Purchase Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="sharepurchaseagreement"
    />
  );
}