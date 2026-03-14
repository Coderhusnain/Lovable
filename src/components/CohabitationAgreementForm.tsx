import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "agreementDate",  label: "Agreement date",          type: "date", required: true },
      { name: "party1Name",     label: "Party 1 full legal name", type: "text", required: true },
      { name: "party2Name",     label: "Party 2 full legal name", type: "text", required: true },
    ],
  },
  {
    label: "Joint Bank Account",
    fields: [
      { name: "bankName",            label: "Bank / institution name",                    type: "text", required: false, placeholder: "e.g. Chase Bank" },
      { name: "party1Contribution",  label: "Party 1 minimum monthly deposit ($)",        type: "text", required: true,  placeholder: "e.g. 1500" },
      { name: "party2Contribution",  label: "Party 2 minimum monthly deposit ($)",        type: "text", required: true,  placeholder: "e.g. 1500" },
    ],
  },
  {
    label: "Property",
    fields: [
      { name: "party1SeparateProperty", label: "Party 1 separate property (list, optional)",        type: "text", required: false, placeholder: "e.g. 123 Main St; Savings #XXXX; 2021 Honda Civic" },
      { name: "party2SeparateProperty", label: "Party 2 separate property (list, optional)",        type: "text", required: false, placeholder: "e.g. Investment portfolio; Retirement account" },
      { name: "jointPropertyDesc",      label: "Jointly acquired property description (optional)",  type: "text", required: false, placeholder: "e.g. Shared furniture; joint vehicle" },
      { name: "jointPropertySplit",     label: "Jointly acquired property ownership split",         type: "text", required: true,  placeholder: "e.g. Equal 50/50" },
    ],
  },
  {
    label: "Household & Support",
    fields: [
      { name: "householdSplit",          label: "Household responsibility division",                      type: "text", required: true,  placeholder: "e.g. Equal (50/50)" },
      { name: "additionalExpenses",      label: "Additional shared expenses beyond household (optional)", type: "text", required: false, placeholder: "e.g. Pet costs, gym, streaming" },
      { name: "supportWaiverTerms",      label: "Post-termination support / maintenance terms",           type: "text", required: true,  placeholder: "e.g. Both parties waive all support rights" },
      { name: "terminationNoticeDays",   label: "Termination notice period (days)",                      type: "text", required: true,  placeholder: "30" },
      { name: "vacateDays",              label: "Days for non-terminating party to vacate",               type: "text", required: true,  placeholder: "30" },
      { name: "terminationNotes",        label: "Additional termination conditions (optional)",           type: "text", required: false, placeholder: "" },
    ],
  },
  {
    label: "Governing Terms",
    fields: [
      { name: "governingState",     label: "Governing law state",              type: "text", required: true,  placeholder: "e.g. California" },
      { name: "governingCounty",    label: "County (for notary block)",        type: "text", required: false, placeholder: "e.g. Los Angeles County" },
      { name: "terminationDays",    label: "Termination notice days",          type: "text", required: true,  placeholder: "30" },
      { name: "attorneyFees",       label: "Attorneys' fees arrangement",      type: "text", required: true,  placeholder: "e.g. Each party bears own fees" },
      { name: "nameRepresentation", label: "Name / public representation note",type: "text", required: false, placeholder: "e.g. Each party uses own legal name" },
      { name: "additionalClauses",  label: "Additional clauses (optional)",    type: "text", required: false, placeholder: "" },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "party1SignDate",            label: "Party 1 signature date",      type: "date", required: true },
      { name: "party2SignDate",            label: "Party 2 signature date",      type: "date", required: true },
      { name: "notaryDate",               label: "Notary sworn date",           type: "date", required: true },
      { name: "notaryName",               label: "Notary public name",          type: "text", required: true },
      { name: "notaryCommissionExpires",  label: "Notary commission expires",   type: "text", required: false },
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

  const u = (v?: string, n = 18) => {
    const t = (v || "").trim();
    return t || "_".repeat(n);
  };
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const labelText = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(22, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += lh + 0.8;
  };

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  const title = "COHABITATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.3, w / 2 + titleW / 2, y + 1.3);
  y += 9;
  doc.setFontSize(10.5);

  // ── Preamble ──
  p(
    `This Cohabitation Agreement ("Agreement") is made and entered into on ${u(values.agreementDate)}, by and between ${u(values.party1Name)} ("Party 1") and ${u(values.party2Name)} ("Party 2") (collectively, the "Parties"), with reference to the following recitals:`
  );

  p("RECITALS", true);
  p("1. The Parties affirm that they are not now married to each other, have never been married to each other, and have no present intention of marrying one another.");
  p('2. The Parties desire to reside together in a conjugal, nonmarital relationship for an indefinite period of time (the "Cohabitation Period").');
  p("3. The Parties wish to set forth in writing their mutual understanding with respect to their respective rights, obligations, and expectations regarding each other and regarding any real, personal, or mixed property before, during, and after the Cohabitation Period.");
  p("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:", false, 2.4);

  // §1
  p("1. No Application of Marriage or Divorce Laws", true);
  p("The Parties do not intend their relationship to be governed by family-code or comparable marriage and dissolution law provisions. The Parties expressly intend that their relationship shall not be governed, in whole or in part, by any laws relating to marriage, domestic partnership, or the dissolution thereof, including any provisions of any State Family Code or similar statute.");

  // §2
  p("2. Relationship of the Parties", true);
  p("Any confidential relationship arising during cohabitation shall not impose fiduciary duties except as expressly provided in this Agreement. Neither Party shall owe any duty or obligation to the other except as expressly set forth herein.");

  // §3
  p("3. Public Recognition of Relationship", true);
  const nameNote = values.nameRepresentation ? ` ${values.nameRepresentation}.` : "";
  p(`Each Party retains their legal name and shall not hold themselves out as married absent written agreement.${nameNote} Any contrary representation shall not be construed as evidence of marriage, partnership, shared property rights, or modification of this Agreement.`);

  // §4
  p("4. Property Acquired During Term", true);
  p("Property acquired by either Party after the effective date, and all related income and profits, remains the acquiring Party's separate property.");

  // §5
  p("5. Earnings", true);
  p("All personal earnings, salaries, commissions, and compensation remain separate property. Each Party waives any present or future claim against the earnings or property accumulations of the other.");

  // §6
  p("6. Jointly Acquired Property", true);
  const jSplit = values.jointPropertySplit || "equal one-half ownership";
  const jDesc  = values.jointPropertyDesc  ? ` Known jointly acquired property: ${values.jointPropertyDesc}.` : "";
  p(`Jointly acquired property ownership shall be: ${jSplit}, unless otherwise proven in a written agreement.${jDesc}`);

  // §7
  p("7. Property Passing Between Parties", true);
  p("A transfer between Parties is presumed a gift unless valuable consideration is proven in writing.");

  // §8
  p("8. Property Acquired by Gift, Bequest, Devise, or Descent", true);
  p("Such property remains the separate property of the acquiring Party unless acquired jointly and otherwise documented. Commingling of such property shall not alter its character unless expressly agreed in writing by both Parties.");

  // Separate property schedule
  if (values.party1SeparateProperty || values.party2SeparateProperty) {
    p("Separate Property Disclosure:", true);
    if (values.party1SeparateProperty)
      p(`Party 1 — ${u(values.party1Name)}: ${values.party1SeparateProperty}`);
    if (values.party2SeparateProperty)
      p(`Party 2 — ${u(values.party2Name)}: ${values.party2SeparateProperty}`);
  }

  // §9
  p("9. Joint Bank Account", true);
  const bankLine = values.bankName ? ` at ${values.bankName}` : "";
  p(
    `The Parties may open a joint checking account${bankLine} for agreed household expenses with monthly contributions in agreed proportions. The establishment of such account shall not constitute a commingling of assets or alter the separate property rights of either Party.`
  );
  p(`Each Party shall contribute monthly to the joint account as follows:`);
  p(`  \u2022  ${u(values.party1Name)} shall deposit not less than $${u(values.party1Contribution, "___")} per month.`);
  p(`  \u2022  ${u(values.party2Name)} shall deposit not less than $${u(values.party2Contribution, "___")} per month.`);

  // §10
  p("10. Jointly Purchased Property", true);
  p("Jointly purchased property shall be acquired from separate funds and governed by written disposition terms.");

  // §11
  p("11. Household Expenses and Responsibilities", true);
  const hSplit = values.householdSplit || "Equal (50 / 50)";
  const addExp = values.additionalExpenses ? ` Additional shared expenses: ${values.additionalExpenses}.` : "";
  p(`All household responsibilities and expenses shall be shared as follows: ${hSplit}, paid from the joint account. Failure by either Party to perform his or her share shall not give rise to any claim for compensation or reimbursement.${addExp}`);

  // §12
  p("12. Compensation for Services Rendered", true);
  p("No compensation claim for services before execution; services during relationship are presumed voluntary unless otherwise agreed in writing.");

  // §13
  p("13. Full Disclosure of Property", true);
  p("Each Party warrants full disclosure of property interests and waives further disclosure rights.");

  // §14
  p("14. Waiver of Right to Support and Other Rights", true);
  const supportNote = values.supportWaiverTerms
    ? `${values.supportWaiverTerms}.`
    : "Voluntary support during cohabitation does not create post-termination support rights; maintenance and support rights are waived.";
  p(
    `Any voluntary support provided by either Party during the Cohabitation Period shall not be construed as an agreement to provide future support. Each Party hereby irrevocably waives any right to maintenance, support, or similar relief upon termination of the relationship, regardless of fault or circumstance. (${supportNote})`
  );

  // §15
  p("15. Effective Date", true);
  p(`This Agreement takes effect on ${u(values.agreementDate)}.`);

  // §16
  p("16. Termination", true);
  p(
    `Either Party may terminate this Agreement upon ${u(values.terminationNoticeDays, "2")} days prior written notice. Termination is automatic upon marriage between the Parties or either Party's marriage to a third party. Upon termination, each Party shall retain his or her separate property. Jointly held property shall be divided in accordance with this Agreement or any subsequent written agreement. Upon written notice of termination, the non-terminating Party shall vacate the shared residence within ${u(values.vacateDays, "2")} days.`
  );
  if (values.terminationNotes) p(`Additional termination conditions: ${values.terminationNotes}`);

  // §17
  p("17. General Release", true);
  p("Each Party releases the other from all claims, demands, causes of action, and liabilities of every kind, whether known or unknown, legal or equitable, arising out of the Parties' relationship, except as expressly preserved herein or in actions to enforce this Agreement.");

  // §18
  p("18. Attorneys' Fees", true);
  const feesNote = values.attorneyFees || "Each Party bears their own attorneys' fees, court costs, and related expenses in enforcement litigation.";
  p(feesNote);

  // §19
  p("19. Consideration", true);
  p("Consideration consists of the mutual promises and covenants herein.");

  // §20
  p("20. Severability", true);
  p("If a provision is invalid or unenforceable, the remainder remains in force and is modified only as necessary to be valid.");

  // §21
  p("21. Execution of Documents", true);
  p("Each Party shall execute additional instruments reasonably necessary to carry out this Agreement.");

  // §22
  p("22. Waiver of Breach", true);
  p("Waiver of one breach is not waiver of another breach.");

  // §23
  p("23. Entire Agreement", true);
  p("This Agreement is the entire understanding and supersedes all prior negotiations and understandings.");

  // §24
  p("24. Governing Law", true);
  p(`This Agreement is governed by the laws of the State of ${u(values.governingState)}.`);

  // §25 additional clauses
  if (values.additionalClauses) {
    p("25. Additional Clauses", true);
    p(values.additionalClauses);
  }

  // §26
  p("26. Acknowledgment of Advisement of Rights", true);
  p("Each Party enters voluntarily, free from duress, and with full understanding and opportunity to seek independent legal advice.", false, 2.4);

  // ── Execution ──
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.", true, 2);
  uf("Party 1", values.party1Name);
  uf("Date", values.party1SignDate);
  uf("Party 2", values.party2Name);
  uf("Date", values.party2SignDate);

  // ── Notary ──
  p(`STATE OF ${u(values.governingState)} )`);
  p(`COUNTY OF ${u(values.governingCounty, "____________________")} ) ss:`);
  p(
    `Subscribed and sworn before me this ${u(values.notaryDate, 8)} by ${u(values.party1Name)} and ${u(values.party2Name)}.`
  );
  uf("Notary Public", values.notaryName);
  uf("My Commission Expires", values.notaryCommissionExpires);

  doc.save("cohabitation_agreement.pdf");
};

export default function CohabitationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Cohabitation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cohabitationagreement"
    />
  );
}