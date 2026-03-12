import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction and Parties",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "party1Info", label: "Party 1 (Full Legal Name, Address, Contact)", type: "textarea", required: true },
      { name: "party2Info", label: "Party 2 (Full Legal Name, Address, Contact)", type: "textarea", required: true },
    ],
  },
  {
    label: "Marriage and Separation",
    fields: [
      { name: "marriageDate", label: "Marriage Date", type: "date", required: true },
      { name: "childrenDetails", label: "Children Details (if any)", type: "textarea", required: false, placeholder: "No children were born / not expecting, or provide details" },
      { name: "separationDate", label: "Separation Date", type: "date", required: true },
    ],
  },
  {
    label: "Financial Disclosure and Assets",
    fields: [
      { name: "party1IncomeDetails", label: "Party 1 Income Details", type: "textarea", required: true, placeholder: "Has no monthly income / detailed information" },
      { name: "party2IncomeDetails", label: "Party 2 Income Details", type: "textarea", required: true, placeholder: "Has no monthly income / detailed information" },
      { name: "maritalHomeHolder", label: "Marital Home Retained By", type: "text", required: true },
      { name: "maritalHomeAddress", label: "Marital Home Address", type: "textarea", required: true },
      { name: "mortgageReleasedParty", label: "Party Released from Mortgage Liability", type: "text", required: true },
      { name: "cooperationDays", label: "Cooperation Execution Days", type: "text", required: true, placeholder: "10" },
    ],
  },
  {
    label: "Debts, Support and Taxes",
    fields: [
      { name: "debtSeparationDate", label: "Debt Separation Date", type: "date", required: true },
      { name: "supportNotes", label: "Support/Alimony Notes", type: "textarea", required: false, placeholder: "Both parties waive support, maintenance, alimony" },
      { name: "taxNotes", label: "Tax Filing Notes", type: "textarea", required: false, placeholder: "Each party files separate federal return" },
    ],
  },
  {
    label: "Dispute and Legal Terms",
    fields: [
      { name: "disputeNotes", label: "Dispute Settlement Notes", type: "textarea", required: false, placeholder: "Good-faith negotiation, mediation, then court" },
      { name: "legalNotes", label: "Additional Legal Notes", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution and Signatures",
    fields: [
      { name: "executionDay", label: "Execution Day", type: "text", required: true, placeholder: "____" },
      { name: "executionMonth", label: "Execution Month", type: "text", required: true, placeholder: "____________" },
      { name: "executionYear", label: "Execution Year", type: "text", required: true, placeholder: "2025" },
      { name: "party1Name", label: "Party 1 Name", type: "text", required: true },
      { name: "party1Signature", label: "Party 1 Signature", type: "text", required: true },
      { name: "party1Date", label: "Party 1 Date", type: "date", required: true },
      { name: "party2Name", label: "Party 2 Name", type: "text", required: true },
      { name: "party2Signature", label: "Party 2 Signature", type: "text", required: true },
      { name: "party2Date", label: "Party 2 Date", type: "date", required: true },
      { name: "witnessName", label: "Witness Name (if required)", type: "text", required: false },
      { name: "witnessSignature", label: "Witness Signature", type: "text", required: false },
      { name: "witnessDate", label: "Witness Date", type: "date", required: false },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "finalNotes", label: "Final notes (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.2;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.35);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("times", "normal");
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(show), y + 1);
    y += 6.2;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "DIVORCE SETTLEMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  p(`Party 1: ${u(v.party1Info)}`);
  p(`Party 2: ${u(v.party2Info)}`);
  p(`${u(v.party1Name)} and ${u(v.party2Name)}, being duly sworn, do hereby declare that the following statements are true and correct. Except as otherwise expressly stated herein, this Agreement represents a full, final, and complete settlement of all issues arising from the dissolution of the parties' marriage, including but not limited to the division of property, allocation of debts, and spousal support.`);
  p("The parties mutually agree that this Agreement contains a fair, just, and equitable distribution of assets and liabilities and, subject to approval by the Court, agree as follows:");

  p("1. MARRIAGE DATE", true);
  p(`The parties were lawfully married on ${u(v.marriageDate, 12)}.`);
  p("No children were born to this marriage.");
  p(`The parties confirm that they are not expecting any children. ${u(v.childrenDetails)}`);

  p("2. SEPARATION DATE", true);
  p(`The parties physically separated on ${u(v.separationDate, 12)}, and have since lived separate and apart.`);

  p("3. CAUSE OF DISSOLUTION", true);
  p("The parties acknowledge that their marriage has irretrievably broken down due to irreconcilable differences and that reconciliation is not possible.");

  p("4. DISCLOSURE", true);
  p("Each party affirms that they have made a full and honest disclosure of all assets and debts owned individually or jointly. No assets or liabilities have been concealed, and both parties believe the other to have been truthful in their respective disclosures.");

  p("5. INCOME", true);
  p(`Party 1: ${u(v.party1IncomeDetails)}`);
  p(`Party 2: ${u(v.party2IncomeDetails)}`);

  p("6. COOPERATION", true);
  p(`The parties agree to cooperate fully in signing any documents required to finalize this Agreement or to implement any of its terms, including deeds, titles, or other legal instruments. Within ${u(v.cooperationDays, 2)} (10) days of receiving notice of Entry of Judgment, both parties shall execute all necessary documentation to transfer titles or otherwise effectuate the provisions herein. If either party fails to do so, the final Decree of Divorce shall operate to transfer title accordingly.`);

  p("7. DIVISION OF ASSETS", true);
  p("Each party shall retain all tangible and intangible property currently in their respective possession, including personal effects and household items.");
  p("a. Marital Home");
  p(`The parties agree that ${u(v.maritalHomeHolder)} shall retain sole and exclusive possession of the marital home located at ${u(v.maritalHomeAddress)}.`);
  p(`${u(v.maritalHomeHolder)} shall hold absolute ownership, and ${u(v.mortgageReleasedParty)} shall not remain liable for any existing or future mortgage obligations on the said property.`);

  p("8. FUTURE EARNINGS AND ACQUISITIONS", true);
  p("All income, earnings, and property received or acquired by either party after the execution of this Agreement shall be deemed the sole and separate property of the receiving or acquiring party. Both parties hereby waive, release, and relinquish any and all rights, title, or interest in the future earnings or property of the other, except to the extent necessary to collect sums due under this Agreement in the event of default.");

  p("9. DEBTS", true);
  p(`Each party shall be solely responsible for any debts or liabilities incurred in their individual name prior to the marriage, unless otherwise specified herein. Each party shall also be responsible for debts incurred in their individual name after the date of separation, which is ${u(v.debtSeparationDate, 12)}, unless otherwise specified. Liabilities incurred during the course of the marriage shall be borne individually unless specifically stated to the contrary in this Agreement.`);

  p("10. SPOUSAL SUPPORT / ALIMONY", true);
  p(`Both parties expressly waive any claim for spousal support, maintenance, or alimony from the other. ${u(v.supportNotes)} The Court shall not retain jurisdiction over such matters. Once incorporated into the final Decree of Divorce, this waiver shall be deemed permanent and binding.`);

  p("11. NAME CHANGE", true);
  p("Neither party is seeking to change their name at the time of executing this Agreement. However, each party reserves the right to file for a legal name change at a later date.");

  p("12. TAXES", true);
  p(`For income tax purposes, the parties agree that all income, gains, losses, and deductions arising from their individual labor, efforts, or property awarded under this Agreement shall be treated as their respective sole and separate income or liabilities, as if they were unmarried for the duration of the tax year in which the divorce is finalized. ${u(v.taxNotes)} Each party shall file a separate federal individual income tax return for the relevant calendar year.`);

  p("13. MUTUAL INDEMNITY", true);
  p("Each party affirms that the other is free from any liability or wrongdoing. All claims of liability or wrongdoing are expressly denied. Each party agrees not to disparage the other to any third party. Each party shall indemnify and hold harmless the other regarding the payment of any debts or liabilities assigned to them under this Agreement.");

  p("14. FUTURE DISPUTE SETTLEMENT", true);
  p(`Should any disagreement arise regarding the terms or enforcement of this Agreement, the parties shall negotiate in good faith to resolve the matter. ${u(v.disputeNotes)} If negotiations fail, the parties agree to seek resolution through mediation by a mutually selected and qualified mediator. If mediation is unsuccessful, either party may petition the appropriate court for resolution.`);

  p("15. FULL DISCLOSURE OF ASSETS AND LIABILITIES", true);
  p("Each party confirms they have made a complete and truthful disclosure of their financial assets, income, expenses, and liabilities. Each party affirms they are entering into this Agreement voluntarily, without fraud, coercion, or undue influence, and that the terms herein are fair and reasonable.");

  p("16. ADDITIONAL DOCUMENTS", true);
  p("Each party agrees to sign and execute all documents necessary to implement and enforce the provisions of this Agreement, including but not limited to deeds, affidavits, tax forms, or any instruments required to transfer title or property rights.");

  p("17. ATTORNEY'S FEES", true);
  p("Each party shall be solely responsible for their own attorney's fees and costs incurred in connection with the negotiation, drafting, and execution of this Agreement and any proceedings for the dissolution of the marriage.");

  p("18. SUBMISSION OF AGREEMENT TO COURT", true);
  p("The parties agree to submit this Agreement to the appropriate court for judicial approval and incorporation into the final Decree of Divorce.");

  p("19. BINDING AGREEMENT", true);
  p("This Agreement shall be binding upon the parties and their respective heirs, executors, administrators, and personal representatives.");

  p("IN WITNESS WHEREOF, the parties have executed this Divorce Settlement Agreement on this ____ day of ____________, 2025.", true);
  p("Party 1:", true);
  uf("Name: ", v.party1Name);
  uf("Signature: ", v.party1Signature);
  uf("Date: ", v.party1Date);
  p("Party 2:", true);
  uf("Name: ", v.party2Name);
  uf("Signature: ", v.party2Signature);
  uf("Date: ", v.party2Date);
  p("Witness (if required):", true);
  uf("Name: ", v.witnessName);
  uf("Signature: ", v.witnessSignature);
  uf("Date: ", v.witnessDate);
  if ((v.legalNotes || "").trim()) p(v.legalNotes);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("divorce_settlement_agreement.pdf");
};

export default function DivorceSettlementAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Divorce Settlement Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="divorcesettlementagreement"
      preserveStepLayout
    />
  );
}
