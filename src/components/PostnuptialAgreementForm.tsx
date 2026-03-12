import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Marriage Recitals",
    fields: [
      { name: "agreementDateText", label: "Agreement Date Text", type: "text", required: true },
      { name: "partyAName", label: "Party A Full Legal Name", type: "text", required: true },
      { name: "partyAAddress", label: "Party A Address", type: "textarea", required: true },
      { name: "partyBName", label: "Party B Full Legal Name", type: "text", required: true },
      { name: "partyBAddress", label: "Party B Address", type: "textarea", required: true },
      { name: "marriageDateText", label: "Marriage Date Text", type: "text", required: true },
      { name: "marriageCountyState", label: "Marriage County, State", type: "text", required: true },
    ],
  },
  {
    label: "Property and Financial Terms",
    fields: [
      { name: "residenceAddress", label: "Residence Address", type: "textarea", required: true },
      { name: "residenceOwner", label: "Residence Titled Owner", type: "text", required: true },
    ],
  },
  {
    label: "Dispute and Legal",
    fields: [
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
      { name: "additionalClause", label: "Additional Clause (Optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "partyASign", label: "Party A Signature Name", type: "text", required: true },
      { name: "partyADate", label: "Party A Date", type: "text", required: true },
      { name: "partyBSign", label: "Party B Signature Name", type: "text", required: true },
      { name: "partyBDate", label: "Party B Date", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryState", label: "Notary State", type: "text", required: true },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true },
      { name: "notaryDateText", label: "Notary Date Text", type: "text", required: true },
      { name: "appeared1", label: "First Appeared Name", type: "text", required: true },
      { name: "appeared2", label: "Second Appeared Name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission Expires", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.3;
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
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("times", "normal");
    doc.setFontSize(10.4);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.setLineWidth(0.2);
    doc.line(x, y + 1, x + doc.getTextWidth(show), y + 1);
    y += 6.2;
  };

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "POSTNUPTIAL AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  // Jurisdiction
  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);

  // Recitals & Clauses
  p(
    `This Postnuptial Agreement ("Agreement") is made and entered into on this ${u(
      v.agreementDateText
    )}, by and between ${u(v.partyAName)}, an adult individual, residing at ${u(v.partyAAddress)}, hereinafter referred to as "Party A"; and ${u(
      v.partyBName
    )}, an adult individual, residing at ${u(v.partyBAddress)}, hereinafter referred to as "Party B"; collectively referred to as the "Parties" and individually as a "Party."`
  );
  p("RECITALS", true);
  p(`WHEREAS, the Parties were lawfully married to each other on ${u(v.marriageDateText)} in ${u(v.marriageCountyState)};`);
  p("WHEREAS, neither Party has been previously married;");
  p(
    "WHEREAS, the Parties desire to enter this Agreement voluntarily, without undue influence, fraud, or duress, to define their rights, interests, and obligations relating to property, income, debts, and other financial matters during marriage, upon separation, dissolution, or death;"
  );
  p(
    "WHEREAS, the Parties recognize that marital property rights may differ under laws of jurisdictions where they reside now or in the future, including community property jurisdictions, and intend to override default provisions to the fullest extent permitted by law;"
  );
  p("NOW, THEREFORE, in consideration of mutual covenants and good and valuable consideration, the Parties agree as follows:");

  // Sections
  p("1. SEPARATE PROPERTY", true);
  p("1.1 Definition: Separate property includes pre-agreement property; income/proceeds from separate property; property acquired solely by gift/devise/bequest/inheritance; and reinvestments, substitutions, and increases in value thereof.");
  p("1.2 Property Schedules: Property currently owned by each Party is deemed sworn and complete disclosure as of execution date.");
  p("1.3 Exclusive Rights: Each Party has exclusive rights to use/manage/sell/transfer/encumber/dispose of separate property without consent/joinder of the other.");
  p("1.4 Waiver: Each Party waives all rights/claims/interests in separate property of the other.");
  p("1.5 Community Property Jurisdictions: Separate property remains separate notwithstanding community/marital property laws.");
  p("1.6 Business Earnings: Earnings/profits/proceeds from separate property remain separate.");
  p("1.7 Cooperation: Non-owning Party shall execute documents needed to confirm sole ownership without personal liability.");
  p("1.8 Pension Benefits: Each Party retains sole rights in own retirement/deferred compensation and waives claims to the other's benefits, including execution of QDRO/similar documents if required.");

  p("2. RESIDENCE", true);
  p(`The real property at ${u(v.residenceAddress)} presently titled solely in ${u(v.residenceOwner)} shall remain that Party's separate property unless transferred by duly executed and recorded written instrument.`);

  p("3. EARNINGS DURING MARRIAGE", true);
  p("All wages/salaries/bonuses/commissions/professional fees/stock options/RSUs/royalties/compensation from personal services of a Party remain sole and separate property of earning Party.");

  p("4. DEBTS", true);
  p("4.1 Pre-marital debts remain sole liabilities of the incurring Party with indemnity. 4.2 During marriage, each Party is responsible for own debts unless jointly agreed in writing; joint obligations are shared equally unless otherwise specified. 4.3 Credit cards remain separate unless joint account established in writing.");

  p("5. JOINT PROPERTY | 6. TAXES | 7. DISSOLUTION OF MARRIAGE", true);
  p("Parties may acquire property jointly by written documentation. Tax returns may be filed jointly or separately; joint filing does not create community property rights. On divorce/legal separation, this Agreement is intended for court enforcement to govern classification/division/distribution of property.");

  p("8. SUPPORT | 9. DISABILITY | 10. DEATH", true);
  p("Each Party waives spousal support except by separate written agreement. On disability, support/care may be provided without altering property rights. On death, surviving Party shall not claim deceased's separate property except household furniture/furnishings and personal residence unless otherwise directed by valid testamentary instrument.");

  p("11. REVOCATION | 12. ADDITIONAL INSTRUMENTS | 13. DISPUTE RESOLUTION", true);
  p("Revocation/amendment only by notarized signed writing and, if applicable, recording in county records. Parties shall execute additional documents/actions reasonably required to carry out this Agreement. Disputes proceed through negotiation, then mediation, then court of competent jurisdiction if unresolved.");

  p("14. ATTORNEY'S FEES | 15. FULL DISCLOSURE | 16. MISCELLANEOUS", true);
  p(
    `Prevailing party in enforcement/interpretation may recover reasonable attorney's fees/costs after written notice and 10-day cure opportunity. Parties warrant full disclosure and voluntary execution with capacity. This Agreement binds heirs/successors/assigns, is entire agreement, and is governed by laws of ${u(
      v.governingLawState
    )}. Invalidity of any provision does not affect remainder. Each Party acknowledges opportunity for independent legal counsel.`
  );

  if ((v.additionalClause || "").trim()) p(v.additionalClause);

  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.", true);
  uf("Party A: ", `${u(v.partyASign)}    Date: ${u(v.partyADate, 8)}`);
  uf("Party B: ", `${u(v.partyBSign)}    Date: ${u(v.partyBDate, 8)}`);

  p("NOTARY ACKNOWLEDGMENT", true);
  p(`State of ${u(v.notaryState)}    County of ${u(v.notaryCounty)}`);
  p(
    `On ${u(v.notaryDateText)} before me, a Notary Public in and for said State, personally appeared ${u(v.appeared1)} and ${u(
      v.appeared2
    )}, known to me or satisfactorily proven to be the individuals described herein, and acknowledged voluntary execution for stated purposes.`
  );
  uf("My Commission Expires: ", v.commissionExpires);

  doc.save("postnuptial_agreement.pdf");
};

export default function PostnuptialAgreementFormFixed() {
  return (
    <FormWizard
      steps={steps}
      title="Postnuptial Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="postnuptialagreement"
    />
  );
}