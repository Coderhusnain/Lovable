import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Intro",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement year", type: "text", required: true },
      { name: "party1FullName", label: "Party 1 full legal name", type: "text", required: true },
      { name: "party1Address", label: "Party 1 residence address", type: "textarea", required: true },
      { name: "party1Short", label: "Party 1 short identifier", type: "text", required: true },
      { name: "party2FullName", label: "Party 2 full legal name", type: "text", required: true },
      { name: "party2Address", label: "Party 2 residence address", type: "textarea", required: true },
      { name: "party2Short", label: "Party 2 short identifier", type: "text", required: true },
    ],
  },
  {
    label: "Separate Property and Residence",
    fields: [
      { name: "scheduleA", label: "Schedule A title", type: "text", required: true, placeholder: "Property of [Party 1]" },
      { name: "scheduleB", label: "Schedule B title", type: "text", required: true, placeholder: "Property of [Party 2]" },
      { name: "residenceOwner", label: "Residence owner", type: "text", required: true },
      { name: "residenceAddress", label: "Residence address", type: "textarea", required: true },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "stateForLaw", label: "State for governing/default references", type: "text", required: true },
      { name: "revocationCounty1", label: "Primary revocation county", type: "text", required: true },
      { name: "revocationCounty2", label: "Secondary revocation county (optional)", type: "text", required: false },
      { name: "mediationRules", label: "Dispute mediation rules (optional)", type: "text", required: false },
    ],
  },
  {
    label: "Death and Disputes",
    fields: [
      { name: "deathClauseExtra", label: "Death clause addendum (optional)", type: "textarea", required: false },
      { name: "disputeClauseExtra", label: "Dispute clause addendum (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "party1SignDate", label: "Party 1 date", type: "date", required: true },
      { name: "party2SignDate", label: "Party 2 date", type: "date", required: true },
      { name: "party1Signature", label: "Party 1 signature name", type: "text", required: true },
      { name: "party2Signature", label: "Party 2 signature name", type: "text", required: true },
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
      { name: "notaryAppeared1", label: "Appeared person 1", type: "text", required: true },
      { name: "notaryAppeared2", label: "Appeared person 2", type: "text", required: true },
      { name: "notaryCommissionExpires", label: "My commission expires", type: "text", required: true },
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
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.35;
  const bottom = 281;
  let y = 20;

  const u = (value?: string, min = 18) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.35) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const hr = () => {
    doc.setLineWidth(0.2);
    doc.line(m, y, w - m, y);
    y += 5.2;
  };
  const section = (text: string) => p(text, true, 1.8);
  const sectionBreak = (needed = 85) => {
    if (y + needed > bottom) {
      doc.addPage();
      y = 20;
    } else {
      y += 1.5;
    }
  };
  const newPage = (top = 20) => {
    doc.addPage();
    y = top;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(12.7);
  const title = "PRENUPTIAL AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;

  p(`This Prenuptial Agreement (the "Agreement") is made and entered into on this ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth, 9)}, ${u(v.agreementYear, 2)}, by and between:`);
  p(`${u(v.party1FullName, 20)}, an adult individual residing at ${u(v.party1Address, 24)}, (hereinafter referred to as "${u(v.party1Short, 10)}"), and`, true, 1.1);
  p(`${u(v.party2FullName, 20)}, an adult individual residing at ${u(v.party2Address, 24)}, (hereinafter referred to as "${u(v.party2Short, 10)}"),`, true, 1.1);
  p("in contemplation of their legal marriage to one another. This Agreement shall become effective only upon the solemnization of the marriage.");
  p("", false, 0.8);
  section("RECITALS");
  p("WHEREAS, the Parties contemplate entering into a lawful marriage in the immediate future;");
  p("WHEREAS, neither Party has previously been married;");
  p("WHEREAS, each Party possesses property, assets, income, and financial resources, and desires to define and protect their respective rights, obligations, and interests therein, both during the marriage and in the event of dissolution, death, or other circumstances;");
  p("WHEREAS, the Parties acknowledge that they have made full and fair disclosure to each other of their respective assets, liabilities, income, and financial circumstances, as set forth in Schedules A and B attached hereto;");
  p("NOW, THEREFORE, in consideration of the mutual promises, covenants, and agreements contained herein, and intending to be legally bound, the Parties agree as follows:");
  p("", false, 0.8);

  section("1. SEPARATE PROPERTY");
  p("1.1 Definition - Except as otherwise provided herein, all property now owned or hereafter acquired by either Party shall remain their separate property, including: (a) All real or personal property, the income and proceeds therefrom, and any reinvestments thereof;");

  sectionBreak(95);
  p("(b) All property acquired by gift, devise, bequest, or inheritance.");
  p(`1.2 Schedules of Property - The separate property currently owned by each Party is described in:`);
  p(`•   Schedule A - ${u(v.scheduleA, 18)}`, true, 1.0);
  p(`•   Schedule B - ${u(v.scheduleB, 18)}`, true, 1.2);
  p("Such separate property shall remain under the sole and exclusive use, control, benefit, and disposition of the owning Party.");
  p("1.3 Waiver of Claims - Each Party waives any and all rights, interests, or claims in the separate property of the other, whether arising by reason of the marriage or otherwise.");
  p("1.4 Disposition of Property - Each Party may sell, transfer, gift, mortgage, or otherwise dispose of their separate property without consent of the other.");
  p(`1.5 Community Property Exception - If the Parties reside in, or move to, a community property jurisdiction, their property rights shall nevertheless be determined in accordance with this Agreement.`);
  p("1.6 Execution of Documents - Upon request, the non-owning Party shall execute any documents necessary to confirm the separate ownership of the other's property.");
  p("1.7 Pension Benefits - Each Party retains sole ownership of vested and future pension, retirement, and similar benefits, and waives any interest therein.");
  p("", false, 0.8);
  section("2. RESIDENCE");
  p(`The residence presently owned by ${u(v.residenceOwner, 16)} and located at ${u(v.residenceAddress, 24)} shall remain unaffected by this Agreement and shall be deemed the separate property of ${u(v.residenceOwner, 16)}.`);
  hr();
  section("3. EARNINGS DURING MARRIAGE");
  p("All earnings, salaries, commissions, income, pensions, stock, stock options, or other benefits derived from the personal services of either Party shall be and remain the separate property of the earning Party, notwithstanding any commingling for joint expenses.");

  sectionBreak(95);
  section("4. DEBTS");
  p("4.1 Pre-Marital Debts - Each Party shall remain solely responsible for debts incurred prior to marriage.");
  p("4.2 Marital Expenses - During the marriage, both Parties shall share responsibility for basic household and living expenses.");
  p("4.3 Credit Accounts - Each Party shall maintain separate credit accounts for personal use, if desired.");
  p("", false, 0.8);
  section("5. JOINT PROPERTY");
  p("Nothing herein shall prevent the Parties from jointly acquiring property during marriage or from transferring property to each other at any time, whether by gift, joint tenancy, tenancy in common, or otherwise.");
  p("", false, 0.8);
  section("6. TAXES");
  p("The Parties may file joint or separate tax returns in accordance with applicable law, without affecting the ownership of income or assets as defined in this Agreement.");
  p("", false, 0.8);
  section("7. DISSOLUTION OF MARRIAGE");
  p("In the event of dissolution, property shall be distributed in accordance with this Agreement, with each Party retaining their separate property and only jointly owned property being subject to division.");
  p("", false, 0.8);
  section("8. SPOUSAL SUPPORT WAIVER");
  p("Each Party is and shall remain self-supporting. In the event of separation or dissolution, neither Party shall seek alimony or spousal support from the other.");
  p("", false, 0.8);
  section("9. DISABILITY");

  sectionBreak(95);
  p("In the event of disability, the non-disabled Party shall provide care to the extent of their earnings and assets.");
  p("", false, 0.8);
  section("10. DEATH");
  p("Each party agrees that if he or she survives the death of the other, such party will make no claim to any part of the real or personal property of the other. In consideration of such promise and in consideration of the contemplated marriage, each party knowingly, intentionally, and voluntarily waives and relinquishes any right of dower, curtesy, homestead, inheritance, descent, distributive share, or other statutory or legal right, now or later created, to share as surviving spouse in the distribution of the estate of the other party.");
  p("The parties agree that it is their mutual intent that neither shall have or acquire any right, title, or claim in and to the real or personal property of the other by virtue of the marriage.");
  p("The estate of each party in the property now owned by either of them, or acquired after the date of marriage by either of them, shall descend to or vest in his or her heirs at law, legatees, or devisees, as may be prescribed by his or her Last Will and Testament or by the laws of the state where the decedent was domiciled at the time of death, as though no marriage had taken place between them.");
  if ((v.deathClauseExtra || "").trim()) p(v.deathClauseExtra);
  p("", false, 0.8);
  section("11. REVOCATION");
  p(`If the parties decide to revoke this Agreement, they shall do so in a written agreement, signed by both parties in the presence of a notary public or other official authorized to take oaths. Such revocation shall be ineffective until recorded with the recorder in the county where the parties maintain their primary residence or both counties if the parties are maintaining separate residences in separate counties (${u(v.revocationCounty1, 10)} / ${u(v.revocationCounty2, 10)}).`);
  p("", false, 0.8);
  section("12. ADDITIONAL INSTRUMENTS");
  p("Each Party shall execute any additional documents necessary to carry out the intent of this Agreement.");
  p("", false, 0.8);
  section("13. DISPUTE RESOLUTION");

  sectionBreak(95);
  p(`The parties will attempt to resolve any dispute arising out of or relating to this Agreement through friendly negotiations amongst the parties. If the matter is not resolved by negotiation, the parties will resolve the dispute using the below Alternative Dispute Resolution (ADR) procedure. Any controversies or disputes arising out of or relating to this Agreement will be submitted to mediation in accordance with any statutory rules of mediation. If mediation does not successfully resolve the dispute, the parties may proceed to seek an alternative form of resolution in accordance with any other rights and remedies afforded to them by law.`);
  if ((v.disputeClauseExtra || "").trim()) p(v.disputeClauseExtra);
  p("", false, 0.8);
  section("14. ATTORNEY'S FEES");
  p("In any enforcement action, the prevailing Party shall be entitled to reasonable attorney's fees and costs, provided written notice of default is given and an opportunity to cure is allowed.");
  p("", false, 0.8);
  section("15. FULL DISCLOSURE");
  p("The Parties affirm that:");
  p("(a) They are of legal age and competent to contract;");
  p("(b) They have made full financial disclosure to each other;");
  p("(c) They have voluntarily entered into this Agreement.");
  p("", false, 0.8);
  section("16. MISCELLANEOUS");
  p("16.1 Binding Effect - This Agreement shall bind and inure to the benefit of the Parties and their heirs, executors, administrators, and assigns.");
  p("16.2 Entire Agreement - This document constitutes the entire agreement between the Parties.");
  p("16.3 Severability - If any provision is found invalid, the remainder shall remain in effect.");
  p("", false, 1.2);
  section("SIGNATURES");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  p(`[Party 1 Name] ${u(v.party1FullName, 24)}   Date: ${u(v.party1SignDate, 8)}`, true, 1.0);
  p(`Signature: ${u(v.party1Signature, 28)}`);

  sectionBreak(95);
  p(`[Party 2 Name] ${u(v.party2FullName, 24)}   Date: ${u(v.party2SignDate, 8)}`, true, 1.2);
  p(`Signature: ${u(v.party2Signature, 28)}`);
  section("Notary Acknowledgment");
  p(`State of ${u(v.notaryState, 14)}`);
  p(`County of ${u(v.notaryCounty, 14)}`);
  p(
    `On this ${u(v.notaryDay, 4)} day of ${u(v.notaryMonth, 8)}, ${u(v.notaryYear, 2)}, before me, the undersigned notary public, personally appeared ${u(v.notaryAppeared1, 18)} and ${u(v.notaryAppeared2, 18)}, personally known to me or satisfactorily proven to be the individuals described herein, and acknowledged that they executed this Agreement as their free act and deed.`
  );
  p("Notary Public", true, 1.0);
  p(`My Commission Expires: ${u(v.notaryCommissionExpires, 10)}`);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`);

  doc.save("prenuptial_agreement.pdf");
};

export default function PrenuptialAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Prenuptial Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="prenuptialagreement"
      preserveStepLayout
    />
  );
}
