import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Recitals",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: false },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: false },
      { name: "agreementYear", label: "Agreement year", type: "text", required: false },
      { name: "party1FullName", label: "Party 1 full name", type: "text", required: true },
      { name: "party1Address", label: "Party 1 address", type: "text", required: false },
      { name: "party1Short", label: "Party 1 short name/identifier", type: "text", required: false },
      { name: "party2FullName", label: "Party 2 full name", type: "text", required: true },
      { name: "party2Address", label: "Party 2 address", type: "text", required: false },
      { name: "party2Short", label: "Party 2 short name/identifier", type: "text", required: false },
      { name: "residenceOwner", label: "Residence owner name", type: "text", required: false },
      { name: "residenceAddress", label: "Residence address", type: "text", required: false },
    ],
  },
  {
    label: "Agreement Terms",
    fields: [
      { name: "party1Schedule", label: "Schedule A label", type: "text", required: false },
      { name: "party2Schedule", label: "Schedule B label", type: "text", required: false },
      { name: "revocationCounty1", label: "Revocation county (primary)", type: "text", required: false },
      { name: "revocationCounty2", label: "Revocation county (secondary)", type: "text", required: false },
      { name: "disputeMediationRules", label: "Mediation statutory rules", type: "text", required: false },
      { name: "party1SignDate", label: "Party 1 sign date", type: "date", required: false },
      { name: "party2SignDate", label: "Party 2 sign date", type: "date", required: false },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDay", label: "Notary day", type: "text", required: false },
      { name: "notaryMonth", label: "Notary month", type: "text", required: false },
      { name: "notaryYear", label: "Notary year", type: "text", required: false },
      { name: "notaryAppeared1", label: "Appeared person 1", type: "text", required: false },
      { name: "notaryAppeared2", label: "Appeared person 2", type: "text", required: false },
      { name: "notaryName", label: "Notary public", type: "text", required: false },
      { name: "notaryCommissionExpires", label: "Commission expires", type: "text", required: false },
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
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
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
  const title = "PRENUPTIAL AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Prenuptial Agreement (the "Agreement") is made and entered into on this ${u(values.agreementDay, 2)} day of ${u(values.agreementMonth, 8)}, ${u(values.agreementYear, 4)}, by and between ${u(values.party1FullName, 20)}, an adult individual residing at ${u(values.party1Address, 20)} (hereinafter "${u(values.party1Short, 10)}"), and ${u(values.party2FullName, 20)}, an adult individual residing at ${u(values.party2Address, 20)} (hereinafter "${u(values.party2Short, 10)}"), in contemplation of their legal marriage to one another. This Agreement becomes effective only upon solemnization of marriage.`);
  p("RECITALS", true);
  p("WHEREAS, the Parties contemplate lawful marriage in the immediate future;");
  p("WHEREAS, neither Party has previously been married;");
  p("WHEREAS, each Party possesses property, assets, income, and financial resources and desires to define and protect rights and obligations during marriage and upon dissolution, death, or other circumstances;");
  p("WHEREAS, each Party affirms full and fair disclosure of assets, liabilities, income, and financial circumstances, as set forth in schedules attached hereto;");
  p("NOW, THEREFORE, in consideration of mutual covenants and intending to be legally bound, the Parties agree:");
  p("1. SEPARATE PROPERTY", true);
  p("1.1 Definition: Property now owned or later acquired by either Party remains separate property, including all real/personal property and income/proceeds/reinvestments, and all property acquired by gift, devise, bequest, or inheritance.");
  p(`1.2 Schedules: Schedule A - Property of ${u(values.party1Schedule || values.party1FullName, 10)}; Schedule B - Property of ${u(values.party2Schedule || values.party2FullName, 10)}. Separate property remains under sole and exclusive use/control/benefit/disposition of owning Party.`);
  p("1.3 Waiver of Claims: Each Party waives all rights/claims in separate property of the other.");
  p("1.4 Disposition of Property: Each Party may transfer, gift, mortgage, or dispose of separate property without consent of the other.");
  p("1.5 Community Property Exception: If Parties reside in/move to community property jurisdiction, property rights remain governed by this Agreement.");
  p("1.6 Execution of Documents: Non-owning Party shall execute documents necessary to confirm separate ownership.");
  p("1.7 Pension Benefits: Each Party retains sole ownership of vested/future pension and retirement benefits and waives interest therein.");
  p("2. RESIDENCE", true);
  p(`Residence presently owned by ${u(values.residenceOwner, 12)} and located at ${u(values.residenceAddress, 16)} remains separate property of the owner.`);
  p("3. EARNINGS DURING MARRIAGE", true);
  p("All earnings, salaries, commissions, income, pensions, stock, stock options, and benefits derived from personal services of either Party remain separate property of the earning Party, notwithstanding commingling for joint expenses.");
  p("4. DEBTS", true);
  p("4.1 Pre-Marital Debts: Each Party remains solely responsible for debts incurred before marriage.");
  p("4.2 Marital Expenses: Parties share responsibility for basic household/living expenses.");
  p("4.3 Credit Accounts: Each Party may maintain separate personal credit accounts.");
  p("5. JOINT PROPERTY | 6. TAXES | 7. DISSOLUTION OF MARRIAGE", true);
  p("Nothing prevents jointly acquiring property or gifting/transferring between Parties. Parties may file joint or separate taxes without affecting ownership classifications under this Agreement. Upon dissolution, each Party retains separate property; only jointly owned property is subject to division.");
  p("8. SPOUSAL SUPPORT WAIVER", true);
  p("Each Party remains self-supporting and waives alimony/spousal support upon separation or dissolution.");
  p("9. DISABILITY", true);
  p("In event of disability, non-disabled Party shall provide care to extent of earnings and assets.");
  p("10. DEATH", true);
  p("Each Party waives rights of dower, curtesy, homestead, inheritance, descent, distributive share, and all statutory/legal surviving spouse rights in other Party's estate, except furniture/furnishings/personal effects and personal residence pass to survivor. Nothing prevents one Party from naming the other as beneficiary under will, life insurance, or retirement plan.");
  p("11. REVOCATION", true);
  p(`Revocation requires written agreement signed by both Parties before a notary/public official and is ineffective until recorded with recorder in county of primary residence (${u(values.revocationCounty1, 8)}) or both counties if separate residences (${u(values.revocationCounty2, 8)}).`);
  p("12. ADDITIONAL INSTRUMENTS", true);
  p("Each Party shall execute additional documents necessary to carry out the intent of this Agreement.");
  p("13. DISPUTE RESOLUTION", true);
  p(`Parties shall first attempt friendly negotiations. Unresolved disputes proceed to mediation in accordance with ${u(values.disputeMediationRules, 12)}. If mediation fails, Parties may seek other rights/remedies afforded by law.`);
  p("14. ATTORNEY'S FEES", true);
  p("Prevailing Party in enforcement action is entitled to reasonable attorney's fees/costs, after notice of default and opportunity to cure.");
  p("15. FULL DISCLOSURE", true);
  p("Parties affirm legal capacity, full financial disclosure, and voluntary entry into this Agreement.");
  p("16. MISCELLANEOUS", true);
  p("Binding Effect applies to heirs/executors/administrators/assigns. Entire Agreement clause applies. Invalid provision does not affect remainder.", false, 3);
  p("SIGNATURES", true);
  p("IN WITNESS WHEREOF, the Parties execute this Agreement as of the date first written above.");
  uf("[Party 1 Name]", values.party1FullName, 24);
  p("Signature: ___________________________");
  uf("Date", values.party1SignDate, 24, 2.5);
  uf("[Party 2 Name]", values.party2FullName, 24);
  p("Signature: ___________________________");
  uf("Date", values.party2SignDate, 24, 2.5);

  p("Notary Acknowledgment", true);
  p(`State of ${u(values.notaryState, 10)}`);
  p(`County of ${u(values.notaryCounty, 10)}`);
  p(`On this ${u(values.notaryDay, 2)} day of ${u(values.notaryMonth, 8)}, ${u(values.notaryYear, 4)}, before me, the undersigned notary public, personally appeared ${u(values.notaryAppeared1, 12)} and ${u(values.notaryAppeared2, 12)}, personally known to me or satisfactorily proven, and acknowledged they executed this Agreement as their free act and deed.`);
  p("Notary Public");
  uf("Name", values.notaryName, 24);
  uf("My Commission Expires", values.notaryCommissionExpires, 24);

  doc.save("prenuptial_agreement.pdf");
};

export default function PrenuptialAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Prenuptial Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="prenuptialagreement"
    />
  );
}
