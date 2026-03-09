import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyABorn", label: "Party A date of birth", type: "date", required: false },
      { name: "partyAResidence", label: "Party A residence", type: "text", required: false },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBBorn", label: "Party B date of birth", type: "date", required: false },
      { name: "partyBResidence", label: "Party B residence", type: "text", required: false },
    ],
  },
  {
    label: "Marriage and Jurisdiction",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "countyName", label: "County name", type: "text", required: false },
      { name: "residencyYears", label: "Residency years", type: "text", required: false },
      { name: "residencyMonths", label: "Residency months", type: "text", required: false },
      { name: "stateName", label: "State", type: "text", required: true },
      { name: "marriageDate", label: "Marriage date", type: "date", required: false },
      { name: "marriageCounty", label: "Marriage county", type: "text", required: false },
      { name: "marriageState", label: "Marriage state", type: "text", required: false },
      { name: "separationDate", label: "Separation date", type: "date", required: false },
    ],
  },
  {
    label: "Financial and Property Terms",
    fields: [
      { name: "monthlyIncomeA", label: "Party A monthly income statement", type: "text", required: false },
      { name: "monthlyIncomeB", label: "Party B monthly income statement", type: "text", required: false },
      { name: "maritalHomeOccupant", label: "Who remains in marital home", type: "text", required: false },
      { name: "maritalHomeAddress", label: "Marital home address", type: "text", required: false },
      { name: "mortgageResponsibleParty", label: "Mortgage responsible party", type: "text", required: false },
      { name: "expenseSharing", label: "Property expense sharing proportions", type: "text", required: false },
      { name: "liquidatorOrOwnerAfterDissolution", label: "Owner after dissolution conversion", type: "text", required: false },
    ],
  },
  {
    label: "Execution and Notary",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDate", label: "Notary acknowledgment date", type: "date", required: false },
      { name: "notaryName", label: "Notary public name", type: "text", required: false },
      { name: "commissionExpiry", label: "Notary commission expiry", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 16) => (value || "").trim() || " ".repeat(min);
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
  const title = "SEPARATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Separation Agreement ("Agreement") is entered into by and between ${u(values.partyAName, 14)} ("Party A"), born ${u(values.partyABorn, 10)}, residing at ${u(values.partyAResidence, 18)}, and ${u(values.partyBName, 14)} ("Party B"), born ${u(values.partyBBorn, 10)}, residing at ${u(values.partyBResidence, 18)}, collectively referred to herein as the "Parties."`);
  p("The Parties, having been duly sworn, state that the following provisions are true, correct, and voluntarily agreed upon. Except as expressly provided herein, this Agreement constitutes a full, final, and binding settlement of all matters of joint concern between the Parties, including but not limited to all property rights, allocation of debts, and any rights to spousal support. The Parties agree that the terms contained herein provide a fair, just, and equitable division of property and obligations, and that such terms are mutually satisfactory.", false, 3);

  p("1. Jurisdiction of the Court", true);
  p(`The Parties affirm that both ${u(values.partyAName, 12)} and ${u(values.partyBName, 12)} have been bona fide residents of ${u(values.countyName, 14)} County for a continuous period of ${u(values.residencyYears, 4)} years and ${u(values.residencyMonths, 4)} months immediately preceding the execution of this Agreement. Such residency satisfies the statutory jurisdictional and venue requirements of the State of ${u(values.stateName, 12)} for the purpose of entering into and enforcing this Agreement and obtaining a decree of legal separation.`);
  p("2. Military Status of the Parties", true);
  p("Each Party affirms that neither is presently a member of the Armed Forces of the United States or any other military service that would affect the jurisdiction of the Court or the enforceability of this Agreement.");
  p("3. Date and Place of Marriage", true);
  p(`The Parties were lawfully married to one another on ${u(values.marriageDate, 12)}, in the County of ${u(values.marriageCounty, 12)}, State of ${u(values.marriageState, 12)}. No children were born of this marriage, and no minor children are the subject of this Agreement.`);
  p("4. Date of Separation", true);
  p(`The Parties mutually acknowledge that they separated on ${u(values.separationDate, 12)}, at which time they ceased to cohabit as spouses.`);
  p("5. Grounds for Dissolution of Marriage", true);
  p("The Parties agree and stipulate that due to irreconcilable differences, the marriage has suffered an irretrievable breakdown, and there exists no reasonable prospect of reconciliation.");
  p("6. Disclosure of Assets and Liabilities", true);
  p("Each Party represents and warrants that they have made a full, frank, and complete disclosure of all assets, liabilities, and financial obligations owned individually or jointly. No property, whether community, marital, or separate, has been intentionally concealed or withheld. Both Parties acknowledge reliance on the truthfulness of the other's disclosures in entering into this Agreement.");
  p("7. Statement of Income", true);
  p(`${u(values.partyAName, 12)} declares that he/she currently has monthly income stated as ${u(values.monthlyIncomeA, 10)}.`);
  p(`${u(values.partyBName, 12)} declares that he/she currently has monthly income stated as ${u(values.monthlyIncomeB, 10)}.`);
  p("8. Mutual Cooperation in Execution of Documents", true);
  p("The Parties agree to cooperate fully in executing any and all deeds, assignments, title certificates, or other legal documents necessary to carry out the terms of this Agreement and any resulting decree of legal separation. Such execution shall occur within ten (10) days of notification of entry of judgment. In the event a Party fails to execute any required document, the final decree of legal separation shall serve as an instrument of conveyance or transfer of title, enforceable as though executed by the defaulting Party.");
  p("9. Division of Assets and Property Rights", true);
  p("Except as otherwise provided herein, each Party shall retain sole ownership, possession, and control over all tangible and intangible property currently in his/her possession.");
  p("a. Marital Home", true);
  p(`The Parties agree that ${u(values.maritalHomeOccupant, 12)} shall remain in possession of the marital residence located at ${u(values.maritalHomeAddress, 20)} and shall have exclusive rights to occupy the property during the period of legal separation. ${u(values.mortgageResponsibleParty, 12)} shall remain solely responsible for all mortgage obligations associated with said property during the separation. The Parties agree to share property-related expenses in the following proportions: ${u(values.expenseSharing, 12)}.`);
  p(`In the event the legal separation is converted to a decree of dissolution of marriage, ${u(values.liquidatorOrOwnerAfterDissolution, 12)} shall retain sole and absolute ownership of the marital residence, together with all rights of title and possession, subject to any encumbrances thereon, for which the same party shall remain solely liable.`);
  p("10. Allocation of Debts and Financial Obligations", true);
  p("Each Party shall remain solely liable for any indebtedness incurred in his or her individual name prior to the marriage, subsequent to the date of separation, and during the marriage unless expressly stated otherwise herein. Each Party shall indemnify and hold the other harmless from any claim, liability, or expense arising from debts so allocated.");
  p("11. Waiver of Spousal Support / Alimony", true);
  p("The Parties expressly, knowingly, and voluntarily waive any present or future claim to spousal support, maintenance, or alimony. This waiver shall be binding, absolute, and irrevocable, and the Court shall have no continuing jurisdiction to modify or award such support at any future date.");
  p("12. Medical Insurance and Continuation Benefits", true);
  p("On or before the date of the final hearing, each Party shall notify the other, in writing, of the availability of COBRA or any other statutory continuation benefits under their existing health care coverage.");
  p("13. Name Change Rights", true);
  p("Neither Party is presently seeking a legal change of name. However, each reserves the right to petition the Court for a name change at a later date without restriction from the other.");
  p("14. Tax Matters and Liabilities", true);
  p("The Parties affirm that there are no outstanding tax disputes, audits, or liabilities known to either at the time of execution of this Agreement.");
  p("15. Procedure for Future Dispute Resolution", true);
  p("The Parties agree to negotiate in good faith to resolve any future disputes arising from or related to this Agreement. If such negotiations fail, the Parties shall submit the matter to mediation before a mutually agreed upon mediator. Mediation may be terminated by either Party at any time. Should mediation prove unsuccessful, either Party may petition the Court for resolution of the dispute.");
  p("16. Confirmation of Full and Fair Disclosure", true);
  p("The Parties reaffirm that they have exchanged complete and accurate financial statements disclosing all assets, income, debts, and liabilities. Each acknowledges that this Agreement is fair, equitable, and free from fraud, coercion, or undue influence.");
  p("17. Submission of Agreement for Court Approval", true);
  p("The Parties agree to submit this Agreement to the Court for review and approval, and for incorporation into a Final Order and Decree of Legal Separation. Should the Parties later file for divorce or dissolution, they shall request that this Agreement be incorporated by reference into any final judgment issued by the Court.");
  p("18. Execution and Acknowledgment", true);
  p(`IN WITNESS WHEREOF, the Parties have executed this Agreement freely and voluntarily on ${u(values.agreementDate, 12)}, intending to be legally bound by its terms.`);

  uf("Party A", values.partyAName, 24);
  uf("Party B", values.partyBName, 24);

  p("STATE OF _____ ) ss:");
  p("COUNTY OF ____ ) ss:");
  p(`On this ${u(values.notaryDate, 12)} day, before me, the undersigned authority, personally appeared ${u(values.partyAName, 12)} and ${u(values.partyBName, 12)}, known to me or satisfactorily proven to be the persons whose names are subscribed to this instrument, and acknowledged that they executed the same for the purposes therein contained.`);
  uf("Notary Public", values.notaryName, 24);
  uf("My Commission Expires", values.commissionExpiry, 18);
  uf("Notary State", values.notaryState, 16);
  uf("Notary County", values.notaryCounty, 16);

  doc.save("separation_agreement.pdf");
};

export default function SeparationAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Separation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="separationagreement"
    />
  );
}
