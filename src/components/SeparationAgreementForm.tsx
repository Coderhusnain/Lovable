import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Intro",
    fields: [
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyABorn", label: "Party A birth date text", type: "text", required: true },
      { name: "partyAResidence", label: "Party A residence", type: "textarea", required: true },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBBorn", label: "Party B birth date text", type: "text", required: true },
      { name: "partyBResidence", label: "Party B residence", type: "textarea", required: true },
      { name: "agreementDay", label: "Agreement execution day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement execution month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement execution year", type: "text", required: true },
    ],
  },
  {
    label: "Jurisdiction and Marriage",
    fields: [
      { name: "countyName", label: "Jurisdiction county", type: "text", required: true },
      { name: "residencyYears", label: "Residency years", type: "text", required: true },
      { name: "residencyMonths", label: "Residency months", type: "text", required: true },
      { name: "stateName", label: "State", type: "text", required: true },
      { name: "marriageDate", label: "Marriage date text", type: "text", required: true },
      { name: "marriageCounty", label: "Marriage county", type: "text", required: true },
      { name: "marriageState", label: "Marriage state", type: "text", required: true },
      { name: "separationDate", label: "Separation date text", type: "text", required: true },
    ],
  },
  {
    label: "Financial and Property Terms",
    fields: [
      { name: "monthlyIncomeA", label: "Party A income statement", type: "text", required: true },
      { name: "monthlyIncomeB", label: "Party B income statement", type: "text", required: true },
      { name: "maritalHomeOccupant", label: "Marital home occupant", type: "text", required: true },
      { name: "maritalHomeAddress", label: "Marital home address", type: "textarea", required: true },
      { name: "mortgageResponsibleParty", label: "Mortgage responsible party", type: "text", required: true },
      { name: "expenseSharing", label: "Property expense sharing proportions", type: "text", required: true },
      { name: "liquidatorOrOwnerAfterDissolution", label: "Owner after dissolution conversion", type: "text", required: true },
    ],
  },
  {
    label: "Remaining Clauses",
    fields: [
      { name: "medicalInsuranceNote", label: "Medical insurance note (optional)", type: "textarea", required: false },
      { name: "taxLiabilityNote", label: "Tax liabilities note (optional)", type: "textarea", required: false },
      { name: "disputeMediationNote", label: "Dispute mediation note (optional)", type: "textarea", required: false },
      { name: "fullDisclosureNote", label: "Full disclosure note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution and Signatures",
    fields: [
      { name: "executionDay", label: "Execution day", type: "text", required: true },
      { name: "executionMonth", label: "Execution month", type: "text", required: true },
      { name: "executionYear", label: "Execution year", type: "text", required: true },
      { name: "partyASignature", label: "Party A signature text", type: "text", required: true },
      { name: "partyBSignature", label: "Party B signature text", type: "text", required: true },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: true },
      { name: "notaryCounty", label: "Notary county", type: "text", required: true },
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAppeared1", label: "Notary appeared person 1", type: "text", required: true },
      { name: "notaryAppeared2", label: "Notary appeared person 2", type: "text", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
      { name: "commissionExpiry", label: "Notary commission expiry", type: "text", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "reviewNote", label: "Final review note (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.2;
  const bottom = 281;
  let y = 18;

  const u = (value?: string, min = 16) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.3) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.6);
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const section = (text: string) => p(text, true, 1.9);
  const sectionBreak = (needed = 85) => {
    if (y + needed > bottom) {
      doc.addPage();
      y = 18;
    } else {
      y += 1.5;
    }
  };

  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  const title = "SEPARATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;

  p(`This Separation Agreement (“Agreement”) is entered into by and between ${u(v.partyAName, 8)} (“Party A”), born ${u(v.partyABorn, 8)}, residing at ${u(v.partyAResidence, 10)}, and ${u(v.partyBName, 8)} (“Party B”), born ${u(v.partyBBorn, 8)}, residing at ${u(v.partyBResidence, 10)}, collectively referred to herein as the “Parties.” The Parties, having been duly sworn, state that the following provisions are true, correct, and voluntarily agreed upon. Except as expressly provided herein, this Agreement constitutes a full, final, and binding settlement of all matters of joint concern between the Parties, including but not limited to all property rights, allocation of debts, and any rights to spousal support. The Parties agree that the terms contained herein provide a fair, just, and equitable division of property and obligations, and that such terms are mutually satisfactory.`);
  section("1. Jurisdiction of the Court");
  p(`The Parties affirm that both ${u(v.partyAName, 8)} and ${u(v.partyBName, 8)} have been bona fide residents of ${u(v.countyName, 12)} County for a continuous period of ${u(v.residencyYears, 3)} years and ${u(v.residencyMonths, 3)} months immediately preceding the execution of this Agreement. Such residency satisfies the statutory jurisdictional and venue requirements of the State of ${u(v.stateName, 10)} for the purpose of entering into and enforcing this Agreement and obtaining a decree of legal separation.`);
  section("2. Military Status of the Parties");
  p("Each Party affirms that neither is presently a member of the Armed Forces of the United States or any other military service that would affect the jurisdiction of the Court or the enforceability of this Agreement.");
  section("3. Date and Place of Marriage");
  p(`The Parties were lawfully married to one another on ${u(v.marriageDate, 10)}, in the County of ${u(v.marriageCounty, 10)}, State of ${u(v.marriageState, 10)}. No children were born of this marriage, and no minor children are the subject of this Agreement.`);
  section("4. Date of Separation");
  p(`The Parties mutually acknowledge that they separated on ${u(v.separationDate, 10)}, at which time they ceased to cohabit as spouses.`);
  section("5. Grounds for Dissolution of Marriage");
  p("The Parties agree and stipulate that due to irreconcilable differences, the marriage has suffered an irretrievable breakdown, and there exists no reasonable prospect of reconciliation.");

  sectionBreak(95);
  section("6. Disclosure of Assets and Liabilities");
  p("Each Party represents and warrants that they have made a full, frank, and complete disclosure of all assets, liabilities, and financial obligations owned individually or jointly. No property, whether community, marital, or separate, has been intentionally concealed or withheld. Both Parties acknowledge reliance on the truthfulness of the other's disclosures in entering into this Agreement.");
  section("7. Statement of Income");
  p(`${u(v.partyAName, 10)} declares that he/she currently has monthly income stated as ${u(v.monthlyIncomeA, 10)}.`);
  p(`${u(v.partyBName, 10)} declares that he/she currently has monthly income stated as ${u(v.monthlyIncomeB, 10)}.`);
  section("8. Mutual Cooperation in Execution of Documents");
  p("The Parties agree to cooperate fully in executing any and all deeds, assignments, title certificates, or other legal documents necessary to carry out the terms of this Agreement and any resulting decree of legal separation. Such execution shall occur within ten (10) days of notification of entry of judgment. In the event a Party fails to execute any required document, the final decree of legal separation shall serve as an instrument of conveyance or transfer of title, enforceable as though executed by the defaulting Party.");
  section("9. Division of Assets and Property Rights");
  p("Except as otherwise provided herein, each Party shall retain sole ownership, possession, and control over all tangible and intangible property currently in his/her possession.");
  p("a. Marital Home", true, 1.0);
  p(`The Parties agree that ${u(v.maritalHomeOccupant, 10)} shall remain in possession of the marital residence located at ${u(v.maritalHomeAddress, 18)} and shall have exclusive rights to occupy the property during the period of legal separation. ${u(v.mortgageResponsibleParty, 10)} shall remain solely responsible for all mortgage obligations associated with said property during the separation. The Parties agree to share property-related expenses in the following proportions: ${u(v.expenseSharing, 10)}.`);
  p(`In the event the legal separation is converted to a decree of dissolution of marriage, ${u(v.liquidatorOrOwnerAfterDissolution, 10)} shall retain sole and absolute ownership of the marital residence located at ${u(v.maritalHomeAddress, 16)}, together with all rights of title and possession, subject to any encumbrances thereon, for which ${u(v.liquidatorOrOwnerAfterDissolution, 10)} shall remain solely liable.`);
  section("10. Allocation of Debts and Financial Obligations");
  p("Each Party shall remain solely liable for any indebtedness incurred in his or her individual name prior to the marriage, subsequent to the date of separation, and during the marriage unless expressly stated otherwise herein. Each Party shall indemnify and hold the other harmless from any claim, liability, or expense arising from debts so allocated.");

  sectionBreak(95);
  section("11. Waiver of Spousal Support / Alimony");
  p("The Parties expressly, knowingly, and voluntarily waive any present or future claim to spousal support, maintenance, or alimony. This waiver shall be binding, absolute, and irrevocable, and the Court shall have no continuing jurisdiction to modify or award such support at any future date.");
  section("12. Medical Insurance and Continuation Benefits");
  p("On or before the date of the final hearing, each Party shall notify the other, in writing, of the availability of COBRA or any other statutory continuation benefits under their existing health care coverage.");
  if ((v.medicalInsuranceNote || "").trim()) p(v.medicalInsuranceNote);
  section("13. Name Change Rights");
  p("Neither Party is presently seeking a legal change of name. However, each reserves the right to petition the Court for a name change at a later date without restriction from the other.");
  section("14. Tax Matters and Liabilities");
  p("The Parties affirm that there are no outstanding tax disputes, audits, or liabilities known to either at the time of execution of this Agreement.");
  if ((v.taxLiabilityNote || "").trim()) p(v.taxLiabilityNote);
  section("15. Procedure for Future Dispute Resolution");
  p("The Parties agree to negotiate in good faith to resolve any future disputes arising from or related to this Agreement. If such negotiations fail, the Parties shall submit the matter to mediation before a mutually agreed upon mediator. Mediation may be terminated by either Party at any time. Should mediation prove unsuccessful, either Party may petition the Court for resolution of the dispute.");
  if ((v.disputeMediationNote || "").trim()) p(v.disputeMediationNote);
  section("16. Confirmation of Full and Fair Disclosure");
  p("The Parties reaffirm that they have exchanged complete and accurate financial statements disclosing all assets, income, debts, and liabilities. Each acknowledges that this Agreement is fair, equitable, and free from fraud, coercion, or undue influence.");
  if ((v.fullDisclosureNote || "").trim()) p(v.fullDisclosureNote);
  section("17. Submission of Agreement for Court Approval");
  p("The Parties agree to submit this Agreement to the Court for review and approval, and for incorporation into a Final Order and Decree of Legal Separation. Should the Parties later file for divorce or dissolution, they shall request that this Agreement be incorporated by reference into any final judgment issued by the Court.");
  section("18. Execution and Acknowledgment");
  p(`IN WITNESS WHEREOF, the Parties have executed this Agreement freely and voluntarily on this ${u(v.executionDay, 3)} day of ${u(v.executionMonth, 8)}, ${u(v.executionYear, 2)}, intending to be legally bound by its terms.`);
  p(`Party A: ${u(v.partyASignature || v.partyAName, 18)}`);
  p(`Party B: ${u(v.partyBSignature || v.partyBName, 18)}`);

  sectionBreak(95);
  p(`STATE OF ${u(v.notaryState, 10)} ) ss:`, true, 1.0);
  p(`COUNTY OF ${u(v.notaryCounty, 10)} ) ss:`, true, 1.0);
  p(`On this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth, 8)}, ${u(v.notaryYear, 2)}, before me, the undersigned authority, personally appeared ${u(v.notaryAppeared1, 12)} and ${u(v.notaryAppeared2, 12)}, known to me or satisfactorily proven to be the persons whose names are subscribed to this instrument, and acknowledged that they executed the same for the purposes therein contained.`);
  p(`Notary Public: ${u(v.notaryName, 16)}`);
  p(`My Commission Expires: ${u(v.commissionExpiry, 12)}`);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`);

  doc.save("separation_agreement.pdf");
};

export default function SeparationAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Separation Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="separationagreement"
      preserveStepLayout
    />
  );
}
