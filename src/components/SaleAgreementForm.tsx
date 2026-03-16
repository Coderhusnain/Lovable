import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Date & Parties",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "sellerName", label: "Seller / Party 1 name", type: "text", required: true },
      { name: "buyerName", label: "Buyer / Party 2 name", type: "text", required: true },
    ],
  },
  {
    label: "Business Details",
    fields: [
      { name: "businessName", label: "Business name being sold", type: "text", required: true },
      { name: "salePrice", label: "Sale price (amount)", type: "text", required: true },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingLaw", label: "Governing law / applicable laws jurisdiction", type: "text", required: false },
    ],
  },
  {
    label: "Seller Signature",
    fields: [
      { name: "sellerSignName", label: "Seller — Name", type: "text", required: false },
      { name: "sellerCnic", label: "Seller — CNIC", type: "text", required: false },
    ],
  },
  {
    label: "Buyer Signature",
    fields: [
      { name: "buyerSignName", label: "Buyer — Name", type: "text", required: false },
      { name: "buyerCnic", label: "Buyer — CNIC", type: "text", required: false },
    ],
  },
  {
    label: "Witnesses",
    fields: [
      { name: "witness1Name", label: "Witness 1 — Name", type: "text", required: false },
      { name: "witness1Cnic", label: "Witness 1 — CNIC", type: "text", required: false },
      { name: "witness2Name", label: "Witness 2 — Name", type: "text", required: false },
      { name: "witness2Cnic", label: "Witness 2 — CNIC", type: "text", required: false },
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

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => {
    if (y + needed > limit) { doc.addPage(); y = 20; }
  };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    checkBreak(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 2;
  };

  const numbered = (num: string, text: string) => {
    const full = `${num}  ${text}`;
    const lines = doc.splitTextToSize(full, tw);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + 2;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "SALE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(
    `This SALE AGREEMENT ("Agreement") is made at Islamabad on this ${u(values.agreementDate, 14)} ("Effective Date").`
  );
  y += 1;
  p("BY AND BETWEEN", true);
  y += 1;
  p(
    `${u(values.sellerName, 22)} (hereinafter referred to as the "Seller", which expression shall, where the context so admits, shall include their respective legal heirs, agents, successors-in-interest and permitted assigns);`
  );
  y += 1;
  p("AND");
  y += 1;
  p(
    `${u(values.buyerName, 22)} (hereinafter referred to as the "Buyer", which expression shall, where the context so admits, shall include their respective legal heirs, agents, successors-in-interest and permitted assigns).`
  );
  y += 1;
  p(
    '(The Seller and Buyers may individually be referred to as "Party" or collectively as "Parties").'
  );
  y += 2;

  // ── RECITALS ────────────────────────────────────────────────────────────
  heading("RECITALS");
  p(
    `I.\tWHEREAS, the Seller hereby warrants and represents that he is the absolute, rightful and lawful owner of business named as "${u(values.businessName, 20)}" hereinafter referred as ("Business") plus all amenities, laboratories, pharmacies, appurtenances and/or other articles attached to the Sold Business;`
  );
  p(
    "II.\tWHEREAS, the Seller is desirous of selling the Business to the Buyers and the Buyers is desirous of purchasing the Business, free from and/or any and all Encumbrances, mortgages, charges, liens, pledges, tenancies and or other restraints likely to impede the transfer of title from Seller to Buyers;"
  );
  p(
    "III.\tAND WHEREAS, the Parties have agreed to the terms and conditions on which the sale of Business from Seller to Buyers shall take place, and each of them wishes to reduce the same in writing."
  );
  y += 2;
  p("NOW, THEREFORE, THIS SALE DEED WITNESSTH AS FOLLOWS:", true);
  y += 1;

  // ── THE SALE TRANSACTION ────────────────────────────────────────────────
  heading("THE SALE TRANSACTION");
  numbered(
    "1.1.",
    `The Sold Business is valued ${u(values.salePrice, 14)} ("Sale Price") being the full and final Sale Price of the Business;`
  );
  numbered(
    "1.2.",
    "The Buyers under this Sale Deed, hereby affirms that, Pursuant to this sale Agreement the Seller has made payment of Sale Price for abovementioned Business in kind vide the execution of this Sale Deed, and the Seller acknowledges the same."
  );
  numbered(
    "1.3.",
    "In consideration of the Sale Price paid by the Buyers to the Seller, the Seller hereby grants, conveys and assigns by way of absolute sale unto the Buyers the Sold Business."
  );
  y += 1;

  // ── REPRESENTATIONS AND WARRANTIES ─────────────────────────────────────
  heading("REPRESENTATIONS AND WARRANTIES");
  p("1.4.\tOf Seller: in addition to applicable undertakings under Sale Agreement, the Seller hereby represents and warrants that:");
  numbered("1.4.1.", "The Seller has all requisite power and authority to execute and deliver the Sale Deed, and to perform its obligations under its terms and conditions;");
  numbered("1.4.2.", "The Seller has good, valid, complete and marketable title and goodwill therein, and no one other than the Seller possesses any title, right, share or interest in or relating to the Sold Business, whether paramount, competing or otherwise, and that the Sold Business is free from all or any Encumbrances, mortgages, charges, liens, pledges, tenancies or other restraints (including the ability of the Buyers to further sell the Sold Business without any Encumbrances) whatsoever, including without limitation, claims, litigation, attachments, taxes, cesses, rates, bills for amenities or any other levy, duty or charge or dues payable to any government authority, banking or financial institution or any other person;");
  numbered("1.4.3.", "The Seller hereby sells, transfers and conveys all of the estate, title, rights and interests free from Encumbrances in favour of the Buyers against Sale Price to be received from the Buyers;");
  numbered("1.4.4.", "The Seller is the only owner having undisputed absolute lawful ownership-in-possession of the Sold Business;");
  numbered("1.4.5.", "The Seller has the lawful power, authority and right to alienate, transfer, sell and convey the Sold Business fully and completely to and/or in favour of the Buyers;");
  numbered("1.4.6.", "The Sold Business is freehold in nature and the Seller is the only lawful owner of the Sold Business hereby conveyed, sold and transferred and the Seller has not done anything or caused to be done any act or thing (covertly, overtly, directly or indirectly or through any agent or representative or anyone claiming authority on their behalf) whereby the title of the Seller in the Sold Business and/or anything in derogation of the right of the Seller to transfer the Sold Business and/or any act or thing whereby the right of the Seller to sell, transfer, assign and/or convey the Sold Business has been hindered, impaired or prejudiced in any way whatsoever;");
  numbered("1.4.7.", "The Seller shall not claim any sort of right to or upon or in relation to the Sold Business and shall not interfere, disturb and interrupt the Sold Business;");
  numbered("1.4.8.", "The Seller has paid or will pay up to the date of this Sale Deed, all rates, taxes, cesses, charges, dues, development charges, assessments by way of business tax or otherwise and any action, claim, loan or liability whatsoever in respect of the Sold Business due and payable to, inter alia, any Government department/agency, or any other local authority or body up to the complete satisfaction of the Buyers;");
  numbered("1.4.9.", "The Seller hereby indemnifies and shall keep the Buyers indemnified, secured and harmless from and against all losses, claims, and demands, that may be made by the Seller or any other person/persons claiming through the Seller and/or their successor-in-interest. Any fine, penalty or liability imposed or determined by any local body or authority relating to or concerning the Sold Business up to the date of this Sale Deed shall be paid and borne by the Seller;");
  numbered("1.4.10.", "The Seller shall, at the time of registration of this Sale Deed and thereafter, execute all such documents and papers and do every other reasonable act, deed or thing whatsoever necessary or required by the Buyers to completely and/or more perfectly and effectively secure, assign, transfer and convey the Sold Business and/or electricity, gas, telephone and water connection etc. thereon to the Buyers and shall, in this regard, sign all necessary papers/applications for mutation/transfer of the same in all Government departments/agencies or local bodies or authorities as may be required by the Buyers along with the absolute power of attorney that may be required by the Buyers;");
  numbered("1.4.11.", "The Seller has handed over quiet, peaceful, vacant physical possession of the Sold Business to the Buyers on the date of this Sale Deed;");
  numbered("1.4.12.", "From the date of this Sale Deed, the Buyers shall be the sole and exclusive lawful and legal owner of the Sold Business and the Buyers shall enjoy quiet and peaceful possession of the Sold Business and enjoy all its rights, appurtenances, benefits without any let, hindrance, disturbance or interruption of any kind or nature whatsoever by/from the Seller or any other person claiming through them and that the Buyers shall be at liberty to, inter alia, deal with, sell, mortgage, deal with and/or dispose of the Sold Business in any manner desired;");
  numbered("1.4.13.", "From the date of these presents, the Buyers shall hold, occupy and possess the Sold Business and shall be the sole, absolute, rightful, lawful and exclusive owner of the Sold Business and every part thereof and shall enjoy all profits, emoluments, assessments, privileges without eviction, let, hindrance etc. made or preferred by the Seller or any other person claiming through or under trust of the Seller and that whenever asked by the Buyers or Buyers\u2019s successors or representatives, the Seller shall, do, cause, or procure to be done all acts, matters, deeds and things for better assuring and more perfectly assigning the Sold Business to the Buyers, at the cost of the Seller;");
  numbered("1.4.14.", "The Seller has handed over to the Buyers any and all original title documents, papers and things whatsoever relating to the Business including receipts of evidencing payment of all dues, charges, cesses, rates, assessments, development charges and ground rent up to the date of registration of this Sale Deed and the Parties have executed a separate receipt in this behalf;");
  numbered("1.4.15.", "The Seller shall always keep the Buyers secured, harmless and indemnified against all losses and detriments occasioned and or suffered by the Buyers or the Buyers\u2019s successors or representative owing to any claim, suit, objection, dispute or demand made or preferred by any person, bank, financial institution, local or municipal authority or any government institution concerning the Sold Business or any portion thereof, including pertaining to or in connection with:");
  bullet("the Sold Business;");
  bullet("sale of the Sold Business to the Buyers; and");
  bullet("the original documents of title of the Sold Business up to the date of these presents, and shall make good the same at the cost of the Seller.");
  numbered("1.4.16.", "The Seller undertakes to have read all terms and conditions of this Sale Deed and explicitly confirms their acceptance of all terms and conditions without any reservation and or confusion.");
  y += 1;
  p("1.5.\tOf Buyers: in addition to applicable undertakings under Sale Agreement, the Buyers hereby represents and warrants that:");
  numbered("1.5.1.", "The Buyers have all requisite power and authority to execute and deliver the Sale Deed, and to perform its obligations under its terms and conditions;");
  numbered("1.5.2.", "The Buyers shall conclude all its payments and/or obligations, whether in cash or in kind, due towards the Sale Price of the Sold Business under this Agreement;");
  numbered("1.5.3.", "The Buyers undertakes to have read all terms and conditions of this Sale Deed and explicitly confirms their acceptance of all terms and conditions without any reservation and or confusion.");
  numbered("1.5.4.", "The Parties do hereby declare that they signed this Sale Deed after compliance with laws of state.");
  y += 1;

  // ── GOVERNING LAW AND JURISDICTION ─────────────────────────────────────
  heading("GOVERNING LAW AND JURISDICTION");
  numbered(
    "1.1.",
    `This Sale Agreement shall be construed in accordance with and governed by ${u(values.governingLaw, 16)} Applicable Laws and the Parties shall ensure compliance thereof.`
  );
  y += 2;

  // ── IN WITNESS WHEREOF ──────────────────────────────────────────────────
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Sale Agreement at the place and on the date hereinabove indicated.");
  y += 4;

  // Two-column Seller / Buyer
  const col1 = m;
  const col2 = w / 2 + 6;
  checkBreak(40);
  doc.setFont("helvetica", "bold");
  doc.text("SELLER:", col1, y);
  doc.text("BUYER:", col2, y);
  y += 7;

  const twoLine = (leftLabel: string, leftVal: string, rightLabel: string, rightVal: string) => {
    checkBreak(lh + 3);
    const lt = `${leftLabel}: `;
    const rt = `${rightLabel}: `;
    doc.setFont("helvetica", "normal");
    doc.text(lt, col1, y);
    const lx = col1 + doc.getTextWidth(lt);
    const ls = (leftVal || "").trim();
    if (ls) { doc.text(ls, lx, y); doc.setLineWidth(0.22); doc.line(lx, y + 1.1, lx + Math.max(10, doc.getTextWidth(ls)), y + 1.1); }
    else { doc.setLineWidth(0.22); doc.line(lx, y + 1.1, lx + 38, y + 1.1); }
    doc.text(rt, col2, y);
    const rx = col2 + doc.getTextWidth(rt);
    const rs = (rightVal || "").trim();
    if (rs) { doc.text(rs, rx, y); doc.line(rx, y + 1.1, rx + Math.max(10, doc.getTextWidth(rs)), y + 1.1); }
    else { doc.line(rx, y + 1.1, rx + 38, y + 1.1); }
    y += lh + 3;
  };

  twoLine("Name", values.sellerSignName || u(values.sellerName, 20), "Name", values.buyerSignName || u(values.buyerName, 20));
  twoLine("CNIC", values.sellerCnic, "CNIC", values.buyerCnic);

  y += 5;
  checkBreak(30);
  doc.setFont("helvetica", "bold");
  doc.text("Witness 1", col1, y);
  doc.text("Witness 2", col2, y);
  y += 5;

  // Witness lines
  doc.setFont("helvetica", "normal");
  doc.line(col1, y, col1 + 50, y);
  doc.line(col2, y, col2 + 50, y);
  y += 7;

  twoLine("Name", values.witness1Name, "Name", values.witness2Name);
  twoLine("CNIC", values.witness1Cnic, "CNIC", values.witness2Cnic);

  doc.save("sale_agreement.pdf");
};

export default function SaleAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Sale Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="saleagreement"
    />
  );
}