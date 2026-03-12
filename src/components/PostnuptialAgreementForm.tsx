export { default } from "./PostnuptialAgreementFormFixed";
export { default } from "./PostnuptialAgreementFormFixed";
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "province", label: "Province", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: false },
  ]},
  { label: "Parties and Recitals", fields: [
    { name: "agreementDateText", label: "Agreement Date Text", type: "text", required: true },
    { name: "partyAName", label: "Party A Name", type: "text", required: true },
    { name: "partyAAddress", label: "Party A Address", type: "textarea", required: true },
    { name: "partyBName", label: "Party B Name", type: "text", required: true },
    { name: "partyBAddress", label: "Party B Address", type: "textarea", required: true },
    { name: "marriageDateText", label: "Marriage Date Text", type: "text", required: true },
    { name: "marriageCountyState", label: "Marriage County and State", type: "text", required: true },
  ]},
  { label: "Property and Law", fields: [
    { name: "residenceAddress", label: "Residence Address", type: "textarea", required: true },
    { name: "residenceOwner", label: "Residence Titled Owner", type: "text", required: true },
    { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
  ]},
  { label: "Execution and Notary", fields: [
    { name: "partyASign", label: "Party A Signature Name", type: "text", required: true },
    { name: "partyADate", label: "Party A Date", type: "text", required: true },
    { name: "partyBSign", label: "Party B Signature Name", type: "text", required: true },
    { name: "partyBDate", label: "Party B Date", type: "text", required: true },
    { name: "notaryState", label: "Notary State", type: "text", required: true },
    { name: "notaryCounty", label: "Notary County", type: "text", required: true },
    { name: "notaryDateText", label: "Notary Date Text", type: "text", required: true },
    { name: "appeared1", label: "First Appeared Name", type: "text", required: true },
    { name: "appeared2", label: "Second Appeared Name", type: "text", required: true },
    { name: "commissionExpires", label: "Commission Expires", type: "text", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3; let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width); ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal"); doc.setFontSize(10.4); doc.text(lines, left, y); y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => { ensure(8); doc.text(label, left, y); const x = left + doc.getTextWidth(label); const s = u(value); doc.text(s, x, y); doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1); y += 6.2; };
  doc.setFont("times", "bold"); doc.setFontSize(13);
  const title = "POSTNUPTIAL AGREEMENT";
  doc.text(title, 105, y, { align: "center" }); const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1); y += 10;
  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);
  p(`This Postnuptial Agreement is made on ${u(v.agreementDateText)} by and between ${u(v.partyAName)} of ${u(v.partyAAddress)} ("Party A"), and ${u(v.partyBName)} of ${u(v.partyBAddress)} ("Party B").`);
  p("RECITALS", true);
  p(`Parties were lawfully married on ${u(v.marriageDateText)} in ${u(v.marriageCountyState)}. Parties enter voluntarily and intend to define rights/obligations regarding property, income, debts, and financial matters during marriage, separation, dissolution, or death, overriding default marital/community property provisions where lawful.`);
  p("1. SEPARATE PROPERTY", true);
  p("Separate property includes pre-agreement property; income/proceeds therefrom; property acquired solely by gift/devise/bequest/inheritance; and reinvestments/substitutions/increases. Property schedules are deemed full disclosure. Each party retains exclusive rights to own/manage/dispose separate property and waives claims to other party's separate property. These terms control even in community property jurisdictions. Business earnings and retirement benefits remain separate; parties cooperate with required documents including QDRO as needed.");
  p("2. RESIDENCE", true);
  p(`Residence at ${u(v.residenceAddress)} titled in ${u(v.residenceOwner)} remains separate property absent written transfer.`);
  p("3. EARNINGS DURING MARRIAGE | 4. DEBTS | 5. JOINT PROPERTY | 6. TAXES | 7. DISSOLUTION | 8. SUPPORT | 9. DISABILITY | 10. DEATH", true);
  p("Earnings from personal services remain separate. Pre-marital debts remain sole liability with indemnity; marital debts are individual unless jointly agreed in writing. Joint acquisitions are permitted with written ownership documentation. Tax filing election does not alter separate-property characterization. Agreement is intended for court enforcement upon divorce/legal separation. Spousal support is waived except separate written agreement. Disability support obligations do not alter property rights. Surviving spouse claim limits and testamentary rights apply as drafted.");
  p("11. REVOCATION | 12. ADDITIONAL INSTRUMENTS | 13. DISPUTE RESOLUTION | 14. ATTORNEY'S FEES | 15. FULL DISCLOSURE | 16. MISCELLANEOUS", true);
  p(`Amendments/revocation require notarized signed writing (and recording where applicable). Parties execute additional instruments as reasonably required. Disputes proceed negotiation, mediation, then court. Prevailing party fees available after notice and 10-day cure opportunity. Parties acknowledge full disclosure/capacity/voluntary execution. Governing law is ${u(v.governingLawState)}.`);
  p("IN WITNESS WHEREOF", true);
  uf("Party A: ", `${u(v.partyASign)}    Date: ${u(v.partyADate, 8)}`);
  uf("Party B: ", `${u(v.partyBSign)}    Date: ${u(v.partyBDate, 8)}`);
  p("NOTARY ACKNOWLEDGMENT", true);
  p(`State of ${u(v.notaryState)} | County of ${u(v.notaryCounty)}`);
  p(`On ${u(v.notaryDateText)} before me appeared ${u(v.appeared1)} and ${u(v.appeared2)}, known or satisfactorily proven, and acknowledged voluntary execution for stated purposes.`);
  uf("My Commission Expires: ", v.commissionExpires);
  doc.save("postnuptial_agreement.pdf");
};

export default function PostnuptialAgreementForm() {
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
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "province", label: "Province", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: false },
  ]},
  { label: "Parties and Recitals", fields: [
    { name: "agreementDateText", label: "Agreement Date Text", type: "text", required: true },
    { name: "partyAName", label: "Party A Name", type: "text", required: true },
    { name: "partyAAddress", label: "Party A Address", type: "textarea", required: true },
    { name: "partyBName", label: "Party B Name", type: "text", required: true },
    { name: "partyBAddress", label: "Party B Address", type: "textarea", required: true },
    { name: "marriageDateText", label: "Marriage Date Text", type: "text", required: true },
    { name: "marriageCountyState", label: "Marriage County and State", type: "text", required: true },
  ]},
  { label: "Property and Law", fields: [
    { name: "residenceAddress", label: "Residence Address", type: "textarea", required: true },
    { name: "residenceOwner", label: "Residence Titled Owner", type: "text", required: true },
    { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
  ]},
  { label: "Execution and Notary", fields: [
    { name: "partyASign", label: "Party A Signature Name", type: "text", required: true },
    { name: "partyADate", label: "Party A Date", type: "text", required: true },
    { name: "partyBSign", label: "Party B Signature Name", type: "text", required: true },
    { name: "partyBDate", label: "Party B Date", type: "text", required: true },
    { name: "notaryState", label: "Notary State", type: "text", required: true },
    { name: "notaryCounty", label: "Notary County", type: "text", required: true },
    { name: "notaryDateText", label: "Notary Date Text", type: "text", required: true },
    { name: "appeared1", label: "First Appeared Name", type: "text", required: true },
    { name: "appeared2", label: "Second Appeared Name", type: "text", required: true },
    { name: "commissionExpires", label: "Commission Expires", type: "text", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3; let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width); ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal"); doc.setFontSize(10.4); doc.text(lines, left, y); y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => { ensure(8); doc.text(label, left, y); const x = left + doc.getTextWidth(label); const s = u(value); doc.text(s, x, y); doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1); y += 6.2; };
  doc.setFont("times", "bold"); doc.setFontSize(13);
  const title = "POSTNUPTIAL AGREEMENT";
  doc.text(title, 105, y, { align: "center" }); const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1); y += 10;
  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);
  p(`This Postnuptial Agreement is made on ${u(v.agreementDateText)} by and between ${u(v.partyAName)} of ${u(v.partyAAddress)} ("Party A"), and ${u(v.partyBName)} of ${u(v.partyBAddress)} ("Party B").`);
  p("RECITALS", true);
  p(`Parties were lawfully married on ${u(v.marriageDateText)} in ${u(v.marriageCountyState)}. Parties enter voluntarily and intend to define rights/obligations regarding property, income, debts, and financial matters during marriage, separation, dissolution, or death, overriding default marital/community property provisions where lawful.`);
  p("1. SEPARATE PROPERTY", true);
  p("Separate property includes pre-agreement property; income/proceeds therefrom; property acquired solely by gift/devise/bequest/inheritance; and reinvestments/substitutions/increases. Property schedules are deemed full disclosure. Each party retains exclusive rights to own/manage/dispose separate property and waives claims to other party's separate property. These terms control even in community property jurisdictions. Business earnings and retirement benefits remain separate; parties cooperate with required documents including QDRO as needed.");
  p("2. RESIDENCE", true);
  p(`Residence at ${u(v.residenceAddress)} titled in ${u(v.residenceOwner)} remains separate property absent written transfer.`);
  p("3. EARNINGS DURING MARRIAGE | 4. DEBTS | 5. JOINT PROPERTY | 6. TAXES | 7. DISSOLUTION | 8. SUPPORT | 9. DISABILITY | 10. DEATH", true);
  p("Earnings from personal services remain separate. Pre-marital debts remain sole liability with indemnity; marital debts are individual unless jointly agreed in writing. Joint acquisitions are permitted with written ownership documentation. Tax filing election does not alter separate-property characterization. Agreement is intended for court enforcement upon divorce/legal separation. Spousal support is waived except separate written agreement. Disability support obligations do not alter property rights. Surviving spouse claim limits and testamentary rights apply as drafted.");
  p("11. REVOCATION | 12. ADDITIONAL INSTRUMENTS | 13. DISPUTE RESOLUTION | 14. ATTORNEY'S FEES | 15. FULL DISCLOSURE | 16. MISCELLANEOUS", true);
  p(`Amendments/revocation require notarized signed writing (and recording where applicable). Parties execute additional instruments as reasonably required. Disputes proceed negotiation → mediation → court. Prevailing party fees available after notice and 10-day cure opportunity. Parties acknowledge full disclosure/capacity/voluntary execution. Governing law is ${u(v.governingLawState)}.`);
  p("IN WITNESS WHEREOF", true);
  uf("Party A: ", `${u(v.partyASign)}    Date: ${u(v.partyADate, 8)}`);
  uf("Party B: ", `${u(v.partyBSign)}    Date: ${u(v.partyBDate, 8)}`);
  p("NOTARY ACKNOWLEDGMENT", true);
  p(`State of ${u(v.notaryState)} | County of ${u(v.notaryCounty)}`);
  p(`On ${u(v.notaryDateText)} before me appeared ${u(v.appeared1)} and ${u(v.appeared2)}, known or satisfactorily proven, and acknowledged voluntary execution for stated purposes.`);
  uf("My Commission Expires: ", v.commissionExpires);
  doc.save("postnuptial_agreement.pdf");
};

export default function PostnuptialAgreementForm() {
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

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "POSTNUPTIAL AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);

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

export default function PostnuptialAgreementForm() {
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
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Date",
    fields: [
      { name: "day", label: "Agreement day", type: "text", required: true, placeholder: "___" },
      { name: "month", label: "Agreement month", type: "text", required: true, placeholder: "________" },
      { name: "year", label: "Agreement year", type: "text", required: true, placeholder: "----" },
      { name: "partyAName", label: "Party A Full Legal Name", type: "text", required: true },
      { name: "partyAAddress", label: "Party A Address", type: "text", required: true },
      { name: "partyBName", label: "Party B Full Legal Name", type: "text", required: true },
      { name: "partyBAddress", label: "Party B Address", type: "text", required: true },
    ],
  },
  {
    label: "Marriage Recitals",
    fields: [
      { name: "mDay", label: "Marriage day", type: "text", required: true, placeholder: "___" },
      { name: "mMonth", label: "Marriage month", type: "text", required: true, placeholder: "________" },
      { name: "mYear", label: "Marriage year", type: "text", required: true, placeholder: "20" },
      { name: "mCounty", label: "Marriage county", type: "text", required: true, placeholder: "__________" },
      { name: "mState", label: "Marriage state", type: "text", required: true, placeholder: "__________" },
    ],
  },
  {
    label: "Property and Law",
    fields: [
      { name: "residenceAddress", label: "Residence property address", type: "text", required: true },
      { name: "residenceOwner", label: "Residence titled in name of", type: "text", required: true },
      { name: "stateLaw", label: "Governing State", type: "text", required: true, placeholder: "__________" },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "partyADate", label: "Party A date", type: "text", required: false, placeholder: "_________" },
      { name: "partyBDate", label: "Party B date", type: "text", required: false, placeholder: "_________" },
      { name: "partyASign", label: "Party A signature (typed)", type: "text", required: true },
      { name: "partyBSign", label: "Party B signature (typed)", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryState", label: "Notary State", type: "text", required: true, placeholder: "____________" },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true, placeholder: "___________" },
      { name: "nDay", label: "Notary day", type: "text", required: true, placeholder: "___" },
      { name: "nMonth", label: "Notary month", type: "text", required: true, placeholder: "________" },
      { name: "nYear", label: "Notary year", type: "text", required: true, placeholder: "20" },
      { name: "appeared1", label: "First appeared name", type: "text", required: true },
      { name: "appeared2", label: "Second appeared name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission expires", type: "text", required: true, placeholder: "_______" },
    ],
  },
  {
    label: "Optional Clause",
    fields: [{ name: "extraClause", label: "Additional clause (optional)", type: "textarea", required: false }],
  },
  {
    label: "Review",
    fields: [{ name: "review", label: "Type YES to confirm review", type: "text", required: false }],
  },
];

const u = (v?: string, fallback?: string) => (v && v.trim() ? v : fallback || "____________________");

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const textW = pageW - margin * 2;
  let y = 18;

  const write = (text: string, bold = false) => {
    if (y > pageH - 20) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW);
    doc.text(lines, margin, y);
    y += lines.length * 5.2 + 1.3;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("POSTNUPTIAL AGREEMENT", pageW / 2, y, { align: "center" });
  y += 8;

  write(`This Postnuptial Agreement (“Agreement”) is made and entered into on this ${u(v.day, "___")} day of ${u(v.month, "________")}, ${u(v.year, "----")}, by and between:`);
  write(`${u(v.partyAName, "[Full Legal Name]")}, an adult individual, residing at ${u(v.partyAAddress, "______________________")}, hereinafter referred to as “Party A”; and`);
  write(`${u(v.partyBName, "[Full Legal Name]")}, an adult individual, residing at ${u(v.partyBAddress, "______________________")}, hereinafter referred to as “Party B”;`);
  write("collectively referred to as the “Parties” and individually as a “Party.”");

  write("RECITALS", true);
  write(`WHEREAS, the Parties were lawfully married to each other on the ${u(v.mDay, "___")} day of ${u(v.mMonth, "________")}, ${u(v.mYear, "20")}, in ${u(v.mCounty, "__________")} County, ${u(v.mState, "__________")};`);
  write("WHEREAS, neither Party has been previously married;");
  write("WHEREAS, the Parties desire to enter into this Agreement voluntarily, without undue influence, fraud, or duress, for the purpose of defining and establishing their respective rights, interests, and obligations in relation to property, income, debts, and other financial matters during the marriage, upon separation, dissolution, or death;");
  write("WHEREAS, the Parties recognize that marital property rights may be defined differently under the laws of the jurisdiction in which they reside now or in the future, including but not limited to “community property” jurisdictions, and wish to override any such default provisions to the extent permissible by law;");
  write("NOW, THEREFORE, in consideration of the mutual promises, covenants, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are acknowledged, the Parties agree as follows:");

  write("1. SEPARATE PROPERTY", true);
  write("1.1 Definition");
  write("Except as expressly provided otherwise in this Agreement, the following shall constitute the separate property of a Party:");
  write("(a) All property, whether tangible or intangible, real or personal, owned by that Party prior to the execution of this Agreement;");
  write("(b) All income, rents, profits, dividends, interest, or other proceeds derived from such separate property;");
  write("(c) All property acquired solely in the name of that Party during the marriage by gift, devise, bequest, or inheritance; and");
  write("(d) All reinvestments, exchanges, substitutions, and increases in value of such property.");
  write("1.2 Property Schedules");
  write("The property currently owned by each Party shall be deemed a sworn and complete disclosure of that Party’s separate property holdings as of the date of execution.");
  write("1.3 Exclusive Rights");
  write("Each Party shall retain exclusive rights to use, enjoy, manage, sell, gift, transfer, lease, mortgage, encumber, or otherwise dispose of his or her separate property without the necessity of consent or joinder of the other Party, and free from any claim by the other Party or his/her creditors.");
  write("1.4 Waiver");
  write("Each Party irrevocably waives, releases, and relinquishes any and all rights, interests, or claims in or to the separate property of the other, whether such rights arise by operation of law, marital status, equitable principles, or otherwise.");
  write("1.5 Community Property Jurisdictions");
  write("If the Parties reside, now or in the future, in a jurisdiction that recognizes community or marital property rights, the provisions of this Agreement shall govern, and all property described herein as separate shall retain its separate character notwithstanding such laws.");
  write("1.6 Business Earnings");
  write("Any and all earnings, profits, or proceeds derived from the separate property of a Party, including appreciation and goodwill, shall remain the separate property of that Party.");
  write("1.7 Cooperation");
  write("The non-owning Party shall execute any and all documents, deeds, waivers, or disclaimers necessary to confirm the sole ownership of the owning Party in his/her separate property, upon reasonable request and without imposing personal liability on the non-owning Party.");
  write("1.8 Pension Benefits");
  write("Each Party reserves the sole right to all vested and unvested pension, retirement, 401(k), IRA, or other deferred compensation benefits standing in his/her name, and hereby waives any rights, claims, or interests in the other Party’s retirement benefits. Each Party agrees to execute any required Qualified Domestic Relations Order (“QDRO”) or similar instrument to effectuate such waiver if necessary.");
  write("2. RESIDENCE");
  write(`The real property located at ${u(v.residenceAddress, "__________________________")}, which is presently titled solely in the name of ${u(v.residenceOwner, "______________________")}, shall remain that Party’s separate property. Nothing herein shall create any interest in said property for the other Party unless transferred by written instrument duly executed and recorded.`);
  write("3. EARNINGS DURING THE MARRIAGE");
  write("All wages, salaries, bonuses, commissions, professional fees, stock options, restricted stock units, intellectual property royalties, or other compensation derived from the personal services, skill, or labor of a Party during the marriage shall be and remain the sole and separate property of the earning Party, notwithstanding any use of such funds for joint living expenses.");
  write("4. DEBTS");
  write("4.1 Pre-Marital Debts");
  write("Each Party shall remain solely liable for debts, liabilities, and obligations incurred prior to the marriage, and shall indemnify and hold the other harmless from any claims arising therefrom.");
  write("4.2 Marital Debts");
  write("During the marriage, the Parties shall each be responsible for their own debts unless jointly agreed in writing. Joint obligations expressly undertaken by both Parties shall be shared equally unless otherwise specified.");
  write("4.3 Credit Cards");
  write("Each Party shall maintain separate credit card accounts for his/her own use, unless a joint account is voluntarily established by both Parties in writing.");
  write("5. JOINT PROPERTY");
  write("Nothing in this Agreement shall preclude the Parties from acquiring property jointly during the marriage as joint tenants with rights of survivorship, tenants in common, or other form of joint ownership. Such acquisitions shall be documented in writing to clearly define ownership interests.");
  write("6. TAXES");
  write("The Parties reserve all rights to file federal and state tax returns jointly or separately as permitted by law. Any decision to file jointly shall not create or imply any community property rights in contravention of this Agreement. In the event of separation, the Parties shall file separately unless otherwise agreed in writing.");
  write("7. DISSOLUTION OF MARRIAGE");
  write("The Parties acknowledge that in the event of divorce or legal separation, this Agreement shall be presented to the court for enforcement to the fullest extent permitted by law, and that its terms are intended to govern the classification, division, and distribution of property.");
  write("8. SUPPORT");
  write("Each Party affirms that he or she has sufficient means for self-support and hereby waives any and all rights to spousal maintenance, alimony, or support from the other, whether temporary or permanent, except as may be expressly provided in a separate written agreement.");
  write("9. DISABILITY");
  write("In the event of partial or total disability of either Party, the other Party agrees to provide necessary care and support to the extent of his/her own earnings and assets, without altering the property rights established herein.");
  write("10. DEATH");
  write("Upon the death of either Party, the surviving Party shall make no claim against the deceased’s separate property, except for household furniture, furnishings, and the personal residence, which shall pass to the surviving spouse unless otherwise directed by valid testamentary instrument. This provision shall not prevent either Party from naming the other as a beneficiary of a will, trust, life insurance policy, or retirement plan.");
  write("11. REVOCATION");
  write("This Agreement may only be revoked or amended by a written instrument signed by both Parties before a notary public, and, if applicable, recorded in the public records of the county of primary residence.");
  write("12. ADDITIONAL INSTRUMENTS");
  write("The Parties agree to execute and deliver all documents and take any actions reasonably necessary to carry out the provisions and intent of this Agreement.");
  write("13. DISPUTE RESOLUTION");
  write("The Parties shall first attempt to resolve disputes through direct negotiation, then mediation, and, if unresolved, either Party may seek relief in a court of competent jurisdiction.");
  write("14. ATTORNEY’S FEES");
  write("The prevailing Party in any enforcement or interpretation action arising from this Agreement shall be entitled to recover reasonable attorney’s fees and costs, provided written notice and a ten (10) day opportunity to cure are given to the alleged defaulting Party.");
  write("15. FULL DISCLOSURE");
  write("The Parties warrant that they have made full and complete disclosure of all assets, liabilities, and income, and that each enters into this Agreement voluntarily, of lawful age, and with full capacity to contract.");
  write("16. MISCELLANEOUS");
  write("(a) This Agreement shall bind and benefit the Parties and their respective heirs, executors, administrators, successors, and assigns.");
  write("(b) This Agreement constitutes the entire agreement between the Parties regarding its subject matter and supersedes all prior discussions, negotiations, and agreements.");
  write(`(c) This Agreement shall be governed by the laws of the State of ${u(v.stateLaw, "__________")}.`);
  write("(d) If any provision is held invalid, the remainder shall remain in full force and effect.");
  write("(e) Each Party acknowledges having had the opportunity to seek independent legal counsel prior to signing this Agreement.");

  if (v.extraClause?.trim()) write(v.extraClause.trim());

  write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.", true);
  write(`Party A: ${u(v.partyASign)} Date: ${u(v.partyADate, "_________")}`);
  write(`Party B: ${u(v.partyBSign)} Date: ${u(v.partyBDate, "_________")}`);
  write("NOTARY ACKNOWLEDGMENT", true);
  write(`State of ${u(v.notaryState, "____________")}`);
  write(`County of ${u(v.notaryCounty, "___________")}`);
  write(`On this ${u(v.nDay, "___")} day of ${u(v.nMonth, "________")}, ${u(v.nYear, "20")}, before me, a Notary Public in and for said State, personally appeared ${u(v.appeared1)} and ${u(v.appeared2)}, known to me or satisfactorily proven to be the individuals described herein, and acknowledged that they executed this Agreement voluntarily for the purposes stated herein.`);
  write("Notary Public");
  write(`My Commission Expires: ${u(v.commissionExpires, "_______")}`);

  doc.save("postnuptial_agreement.pdf");
};

export default function PostnuptialAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Postnuptial Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="postnuptialagreement"
    />
  );
}

