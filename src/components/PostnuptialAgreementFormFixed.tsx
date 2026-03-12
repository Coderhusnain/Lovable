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
    label: "Date and Jurisdiction",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true, placeholder: "___" },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true, placeholder: "________" },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true, placeholder: "----" },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Parties and Marriage Recitals",
    fields: [
      { name: "partyAName", label: "Party A Full Legal Name", type: "text", required: true },
      { name: "partyAAddress", label: "Party A Address", type: "textarea", required: true },
      { name: "partyBName", label: "Party B Full Legal Name", type: "text", required: true },
      { name: "partyBAddress", label: "Party B Address", type: "textarea", required: true },
      { name: "marriageDay", label: "Marriage Day", type: "text", required: true, placeholder: "___" },
      { name: "marriageMonth", label: "Marriage Month", type: "text", required: true, placeholder: "________" },
      { name: "marriageYear", label: "Marriage Year", type: "text", required: true, placeholder: "20" },
      { name: "marriageCounty", label: "Marriage County", type: "text", required: true },
      { name: "marriageState", label: "Marriage State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Property and Debts",
    fields: [
      { name: "residenceAddress", label: "Residence Property Address", type: "textarea", required: true },
      { name: "residenceOwner", label: "Residence Titled Owner", type: "text", required: true },
    ],
  },
  {
    label: "Support and Dispute Terms",
    fields: [
      { name: "additionalTerms", label: "Additional Terms (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution Signatures",
    fields: [
      { name: "partyASignature", label: "Party A Signature", type: "text", required: true },
      { name: "partyADate", label: "Party A Date", type: "text", required: true, placeholder: "_________" },
      { name: "partyBSignature", label: "Party B Signature", type: "text", required: true },
      { name: "partyBDate", label: "Party B Date", type: "text", required: true, placeholder: "_________" },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryState", label: "Notary State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true },
      { name: "notaryDay", label: "Notary Day", type: "text", required: true, placeholder: "___" },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true, placeholder: "________" },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true, placeholder: "20" },
      { name: "appeared1", label: "First Appeared Name", type: "text", required: true },
      { name: "appeared2", label: "Second Appeared Name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission Expires", type: "text", required: true, placeholder: "_______" },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "reviewNote", label: "Final note (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.25;
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
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
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

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p(`This Postnuptial Agreement ("Agreement") is made and entered into on this ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between:`);
  p(`${u(v.partyAName)}, an adult individual, residing at ${u(v.partyAAddress)}, hereinafter referred to as "Party A"; and`);
  p(`${u(v.partyBName)}, an adult individual, residing at ${u(v.partyBAddress)}, hereinafter referred to as "Party B";`);
  p('collectively referred to as the "Parties" and individually as a "Party."');

  p("RECITALS", true);
  p(`WHEREAS, the Parties were lawfully married to each other on the ${u(v.marriageDay, 3)} day of ${u(v.marriageMonth)}, ${u(v.marriageYear, 2)}, in ${u(v.marriageCounty)} County, ${u(v.marriageState)};`);
  p("WHEREAS, neither Party has been previously married;");
  p("WHEREAS, the Parties desire to enter into this Agreement voluntarily, without undue influence, fraud, or duress, for the purpose of defining and establishing their respective rights, interests, and obligations in relation to property, income, debts, and other financial matters during the marriage, upon separation, dissolution, or death;");
  p("WHEREAS, the Parties recognize that marital property rights may be defined differently under the laws of the jurisdiction in which they reside now or in the future, including but not limited to community property jurisdictions, and wish to override any such default provisions to the extent permissible by law;");
  p("NOW, THEREFORE, in consideration of the mutual promises, covenants, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are acknowledged, the Parties agree as follows:");

  p("1. SEPARATE PROPERTY", true);
  p("1.1 Definition");
  p("Except as expressly provided otherwise in this Agreement, the following shall constitute the separate property of a Party: (a) all property owned prior to execution; (b) all income, rents, profits, dividends, interest, or other proceeds derived from such separate property; (c) all property acquired solely in that Party's name during marriage by gift, devise, bequest, or inheritance; and (d) all reinvestments, exchanges, substitutions, and increases in value of such property.");
  p("1.2 Property Schedules");
  p("The property currently owned by each Party shall be deemed a sworn and complete disclosure of that Party's separate property holdings as of the date of execution.");
  p("1.3 Exclusive Rights");
  p("Each Party shall retain exclusive rights to use, enjoy, manage, sell, gift, transfer, lease, mortgage, encumber, or otherwise dispose of his or her separate property without the necessity of consent or joinder of the other Party, and free from any claim by the other Party or his/her creditors.");
  p("1.4 Waiver");
  p("Each Party irrevocably waives, releases, and relinquishes any and all rights, interests, or claims in or to the separate property of the other, whether such rights arise by operation of law, marital status, equitable principles, or otherwise.");
  p("1.5 Community Property Jurisdictions");
  p("If the Parties reside, now or in the future, in a jurisdiction that recognizes community or marital property rights, the provisions of this Agreement shall govern, and all property described herein as separate shall retain its separate character notwithstanding such laws.");
  p("1.6 Business Earnings");
  p("Any and all earnings, profits, or proceeds derived from the separate property of a Party, including appreciation and goodwill, shall remain the separate property of that Party.");
  p("1.7 Cooperation");
  p("The non-owning Party shall execute any and all documents, deeds, waivers, or disclaimers necessary to confirm the sole ownership of the owning Party in his/her separate property, upon reasonable request and without imposing personal liability on the non-owning Party.");
  p("1.8 Pension Benefits");
  p('Each Party reserves the sole right to all vested and unvested pension, retirement, 401(k), IRA, or other deferred compensation benefits standing in his/her name, and hereby waives any rights, claims, or interests in the other Party\'s retirement benefits. Each Party agrees to execute any required Qualified Domestic Relations Order ("QDRO") or similar instrument to effectuate such waiver if necessary.');

  p("2. RESIDENCE", true);
  p(`The real property located at ${u(v.residenceAddress)}, which is presently titled solely in the name of ${u(v.residenceOwner)}, shall remain that Party's separate property. Nothing herein shall create any interest in said property for the other Party unless transferred by written instrument duly executed and recorded.`);

  p("3. EARNINGS DURING THE MARRIAGE", true);
  p("All wages, salaries, bonuses, commissions, professional fees, stock options, restricted stock units, intellectual property royalties, or other compensation derived from the personal services, skill, or labor of a Party during the marriage shall be and remain the sole and separate property of the earning Party, notwithstanding any use of such funds for joint living expenses.");

  p("4. DEBTS", true);
  p("4.1 Pre-Marital Debts - Each Party shall remain solely liable for debts, liabilities, and obligations incurred prior to the marriage, and shall indemnify and hold the other harmless from any claims arising therefrom.");
  p("4.2 Marital Debts - During the marriage, the Parties shall each be responsible for their own debts unless jointly agreed in writing. Joint obligations expressly undertaken by both Parties shall be shared equally unless otherwise specified.");
  p("4.3 Credit Cards - Each Party shall maintain separate credit card accounts for his/her own use, unless a joint account is voluntarily established by both Parties in writing.");

  p("5. JOINT PROPERTY", true);
  p("Nothing in this Agreement shall preclude the Parties from acquiring property jointly during the marriage as joint tenants with rights of survivorship, tenants in common, or other form of joint ownership. Such acquisitions shall be documented in writing to clearly define ownership interests.");

  p("6. TAXES", true);
  p("The Parties reserve all rights to file federal and state tax returns jointly or separately as permitted by law. Any decision to file jointly shall not create or imply any community property rights in contravention of this Agreement. In the event of separation, the Parties shall file separately unless otherwise agreed in writing.");

  p("7. DISSOLUTION OF MARRIAGE", true);
  p("The Parties acknowledge that in the event of divorce or legal separation, this Agreement shall be presented to the court for enforcement to the fullest extent permitted by law, and that its terms are intended to govern the classification, division, and distribution of property.");

  p("8. SUPPORT", true);
  p("Each Party affirms that he or she has sufficient means for self-support and hereby waives any and all rights to spousal maintenance, alimony, or support from the other, whether temporary or permanent, except as may be expressly provided in a separate written agreement.");

  p("9. DISABILITY", true);
  p("In the event of partial or total disability of either Party, the other Party agrees to provide necessary care and support to the extent of his/her own earnings and assets, without altering the property rights established herein.");

  p("10. DEATH", true);
  p("Upon the death of either Party, the surviving Party shall make no claim against the deceased's separate property, except for household furniture, furnishings, and the personal residence, which shall pass to the surviving spouse unless otherwise directed by valid testamentary instrument. This provision shall not prevent either Party from naming the other as a beneficiary of a will, trust, life insurance policy, or retirement plan.");

  p("11. REVOCATION", true);
  p("This Agreement may only be revoked or amended by a written instrument signed by both Parties before a notary public, and, if applicable, recorded in the public records of the county of primary residence.");

  p("12. ADDITIONAL INSTRUMENTS", true);
  p("The Parties agree to execute and deliver all documents and take any actions reasonably necessary to carry out the provisions and intent of this Agreement.");

  p("13. DISPUTE RESOLUTION", true);
  p("The Parties shall first attempt to resolve disputes through direct negotiation, then mediation, and, if unresolved, either Party may seek relief in a court of competent jurisdiction.");

  p("14. ATTORNEY'S FEES", true);
  p("The prevailing Party in any enforcement or interpretation action arising from this Agreement shall be entitled to recover reasonable attorney's fees and costs, provided written notice and a ten (10) day opportunity to cure are given to the alleged defaulting Party.");

  p("15. FULL DISCLOSURE", true);
  p("The Parties warrant that they have made full and complete disclosure of all assets, liabilities, and income, and that each enters into this Agreement voluntarily, of lawful age, and with full capacity to contract.");

  p("16. MISCELLANEOUS", true);
  p("(a) This Agreement shall bind and benefit the Parties and their respective heirs, executors, administrators, successors, and assigns.");
  p("(b) This Agreement constitutes the entire agreement between the Parties regarding its subject matter and supersedes all prior discussions, negotiations, and agreements.");
  p(`(c) This Agreement shall be governed by the laws of the State of ${u(v.governingLawState)}.`);
  p("(d) If any provision is held invalid, the remainder shall remain in full force and effect.");
  p("(e) Each Party acknowledges having had the opportunity to seek independent legal counsel prior to signing this Agreement.");
  if ((v.additionalTerms || "").trim()) p(v.additionalTerms);

  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.", true);
  uf("Party A: ", `${u(v.partyASignature)}    Date: ${u(v.partyADate, 8)}`);
  uf("Party B: ", `${u(v.partyBSignature)}    Date: ${u(v.partyBDate, 8)}`);

  p("NOTARY ACKNOWLEDGMENT", true);
  p(`State of ${u(v.notaryState)}`);
  p(`County of ${u(v.notaryCounty)}`);
  p(`On this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 2)}, before me, a Notary Public in and for said State, personally appeared ${u(v.appeared1)} and ${u(v.appeared2)}, known to me or satisfactorily proven to be the individuals described herein, and acknowledged that they executed this Agreement voluntarily for the purposes stated herein.`);
  p("Notary Public");
  uf("My Commission Expires: ", v.commissionExpires);
  if ((v.reviewNote || "").trim()) p(v.reviewNote);

  doc.save("postnuptial_agreement.pdf");
};

export default function PostnuptialAgreementFormFixed() {
  return (
    <FormWizard
      steps={steps}
      title="Postnuptial Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="postnuptialagreement"
      preserveStepLayout
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
    label: "Parties and Agreement Date",
    fields: [
      { name: "agreementDay", label: "Agreement Day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement Year", type: "text", required: true },
      { name: "partyAName", label: "Party A Full Legal Name", type: "text", required: true },
      { name: "partyAAddress", label: "Party A Address", type: "textarea", required: true },
      { name: "partyBName", label: "Party B Full Legal Name", type: "text", required: true },
      { name: "partyBAddress", label: "Party B Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Marriage and Property",
    fields: [
      { name: "marriageDay", label: "Marriage Day", type: "text", required: true },
      { name: "marriageMonth", label: "Marriage Month", type: "text", required: true },
      { name: "marriageYear", label: "Marriage Year", type: "text", required: true },
      { name: "marriageCounty", label: "Marriage County", type: "text", required: true },
      { name: "marriageState", label: "Marriage State", type: "text", required: true },
      { name: "residenceAddress", label: "Residence Property Address", type: "textarea", required: true },
      { name: "residenceOwner", label: "Residence Titled Owner", type: "text", required: true },
    ],
  },
  {
    label: "Governing Law and Signatures",
    fields: [
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
      { name: "partyASignature", label: "Party A Signature Text", type: "text", required: true },
      { name: "partyADate", label: "Party A Date", type: "text", required: true },
      { name: "partyBSignature", label: "Party B Signature Text", type: "text", required: true },
      { name: "partyBDate", label: "Party B Date", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryState", label: "Notary State", type: "text", required: true },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true },
      { name: "notaryDay", label: "Notary Day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true },
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
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.3);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
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
    `This Postnuptial Agreement ("Agreement") is made and entered into on this ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between: ${u(v.partyAName)}, an adult individual, residing at ${u(v.partyAAddress)}, hereinafter referred to as "Party A"; and ${u(v.partyBName)}, an adult individual, residing at ${u(v.partyBAddress)}, hereinafter referred to as "Party B"; collectively referred to as the "Parties" and individually as a "Party."`
  );

  p("RECITALS", true);
  p(`WHEREAS, the Parties were lawfully married to each other on the ${u(v.marriageDay, 3)} day of ${u(v.marriageMonth)}, ${u(v.marriageYear, 4)}, in ${u(v.marriageCounty)} County, ${u(v.marriageState)};`);
  p("WHEREAS, neither Party has been previously married;");
  p("WHEREAS, the Parties desire to enter into this Agreement voluntarily, without undue influence, fraud, or duress, for the purpose of defining and establishing their respective rights, interests, and obligations in relation to property, income, debts, and other financial matters during the marriage, upon separation, dissolution, or death;");
  p("WHEREAS, the Parties recognize that marital property rights may be defined differently under the laws of the jurisdiction in which they reside now or in the future, including but not limited to community property jurisdictions, and wish to override any such default provisions to the extent permissible by law;");
  p("NOW, THEREFORE, in consideration of the mutual promises, covenants, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are acknowledged, the Parties agree as follows:");

  p("1. SEPARATE PROPERTY", true);
  p("1.1 Definition: Except as expressly provided otherwise in this Agreement, separate property includes: (a) all property owned prior to execution; (b) all income/rents/profits/dividends/interest/proceeds from such property; (c) property acquired solely by gift/devise/bequest/inheritance; and (d) all reinvestments, exchanges, substitutions, and increases in value.");
  p("1.2 Property Schedules: Property currently owned by each Party is deemed sworn and complete disclosure as of execution.");
  p("1.3 Exclusive Rights: Each Party retains exclusive rights to use/enjoy/manage/sell/gift/transfer/lease/mortgage/encumber/dispose separate property without consent/joinder of the other Party.");
  p("1.4 Waiver: Each Party irrevocably waives any rights/interests/claims in the separate property of the other.");
  p("1.5 Community Property Jurisdictions: This Agreement governs and separate property retains separate character notwithstanding community/marital property laws.");
  p("1.6 Business Earnings: Earnings/profits/proceeds from separate property, including appreciation and goodwill, remain separate.");
  p("1.7 Cooperation: Non-owning Party shall execute documents necessary to confirm sole ownership upon reasonable request and without personal liability.");
  p("1.8 Pension Benefits: Each Party reserves sole rights to own retirement/deferred compensation and waives claims to the other's retirement benefits, including execution of required QDRO/similar instruments.");

  p("2. RESIDENCE", true);
  p(`The real property located at ${u(v.residenceAddress)}, which is presently titled solely in the name of ${u(v.residenceOwner)}, shall remain that Party's separate property unless transferred by written instrument duly executed and recorded.`);
  p("3. EARNINGS DURING THE MARRIAGE", true);
  p("All wages, salaries, bonuses, commissions, professional fees, stock options, restricted stock units, intellectual property royalties, or other compensation from personal services of a Party during marriage remain sole and separate property of the earning Party.");
  p("4. DEBTS", true);
  p("4.1 Pre-Marital Debts: Each Party remains solely liable for pre-marital debts and shall indemnify/hold harmless the other.");
  p("4.2 Marital Debts: Each Party is responsible for own debts unless jointly agreed in writing; joint obligations are shared equally unless otherwise specified.");
  p("4.3 Credit Cards: Each Party shall maintain separate credit card accounts unless a joint account is established in writing.");
  p("5. JOINT PROPERTY", true);
  p("Nothing herein precludes jointly acquired property; such acquisitions shall be documented in writing to define ownership interests.");
  p("6. TAXES", true);
  p("Parties may file returns jointly or separately as permitted by law. Joint filing does not create community property rights contrary to this Agreement.");
  p("7. DISSOLUTION OF MARRIAGE | 8. SUPPORT | 9. DISABILITY | 10. DEATH", true);
  p("Agreement shall be presented for court enforcement upon divorce/legal separation. Spousal support is waived except by separate written agreement. Disability support does not alter property rights. Death rights are governed as drafted including testamentary instruments.");
  p("11. REVOCATION | 12. ADDITIONAL INSTRUMENTS | 13. DISPUTE RESOLUTION | 14. ATTORNEY'S FEES | 15. FULL DISCLOSURE | 16. MISCELLANEOUS", true);
  p(`Revocation/amendment requires written instrument signed before notary and recorded if applicable. Parties execute additional instruments as needed. Disputes: direct negotiation, then mediation, then court. Prevailing-party attorney fees apply with written notice and ten (10) day cure opportunity. Parties warrant full disclosure and capacity. Governing law is the State of ${u(v.governingLawState)}.`);

  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.", true);
  uf("Party A: ", `${u(v.partyASignature)}    Date: ${u(v.partyADate, 8)}`);
  uf("Party B: ", `${u(v.partyBSignature)}    Date: ${u(v.partyBDate, 8)}`);

  p("NOTARY ACKNOWLEDGMENT", true);
  p(`State of ${u(v.notaryState)} | County of ${u(v.notaryCounty)}`);
  p(`On this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, before me, a Notary Public in and for said State, personally appeared ${u(v.appeared1)} and ${u(v.appeared2)}, known to me or satisfactorily proven to be the individuals described herein, and acknowledged that they executed this Agreement voluntarily for the purposes stated herein.`);
  p("Notary Public");
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
