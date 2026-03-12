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
  if (country === "United States") return [{ value: "Alabama", label: "Alabama" }, { value: "California", label: "California" }, { value: "Florida", label: "Florida" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction and Formation",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "formationState", label: "State of Formation", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "principalOffice", label: "Principal Office", type: "textarea", required: true },
      { name: "registeredAgent", label: "Registered Agent Name", type: "text", required: true },
      { name: "registeredOffice", label: "Registered Office Address", type: "textarea", required: true },
      { name: "companyPurpose", label: "Business Purpose", type: "textarea", required: true },
    ],
  },
  {
    label: "Members and Voting",
    fields: [
      { name: "membersWithPercent", label: "Members with Percentage Shares", type: "textarea", required: true },
      { name: "buyoutDecisionDays", label: "Buyout Decision Days", type: "text", required: true, placeholder: "70" },
    ],
  },
  {
    label: "Accounting and Tax",
    fields: [
      { name: "fiscalYearEnd", label: "Fiscal Year End Month", type: "text", required: true },
      { name: "taxElection", label: "Current Tax Treatment Election", type: "text", required: true, placeholder: "pass-through organization" },
    ],
  },
  {
    label: "Board and Meetings",
    fields: [
      { name: "chairmanName", label: "Chairman Name", type: "text", required: true },
      { name: "secretaryName", label: "Secretary Name", type: "text", required: true },
      { name: "treasurerName", label: "Treasurer Name", type: "text", required: true },
      { name: "meetingState", label: "Meeting State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Dissolution and Disputes",
    fields: [
      { name: "lawsuitState", label: "Lawsuit Jurisdiction State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "controllingLawState", label: "Controlling Law State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "applicationStateLaw", label: "Application of State Law", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "amendmentStateLaw", label: "Amendment Filing State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "executionName", label: "Name", type: "text", required: true },
      { name: "executionSignature", label: "Signatures", type: "text", required: true },
      { name: "executionDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "finalNotes", label: "Final Notes (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 15;
  const width = 180;
  const lh = 5.2;
  let y = 18;

  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
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
    doc.setFontSize(10.25);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const s = u(value, 12);
    doc.text(s, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1);
    y += 6.1;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "LLC OPERATING AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1);
  y += 7;
  doc.setFontSize(11);
  doc.text("A Limited Liability Company", 105, y, { align: "center" });
  y += 8;

  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}`);
  p(`This Operating Agreement ("Agreement") of ${u(v.companyName)} ("Company"), is executed and agreed to, for good and valuable consideration, by the undersigned members (individually, "Member" or collectively, "Members").`);

  p("Formation", true);
  p(`(a) State of Formation. This Agreement is for ${u(v.companyName)} a manager-managed limited liability company formed under and pursuant to ${u(v.formationState)} law.`);
  p("(b) Operating Agreement Controls. To the extent that the rights or obligations of the Members, or the Company under provisions of this Agreement differ from what they would be under state law absent such a provision, this Agreement, to the extent permitted under state law, shall control.");
  p(`(c) Principal Office. The Company's principal office will be as set out in the Company's Articles of Organization or other filing on record with the Secretary of State, or such other location as shall be selected from time to time by the Members. Principal office: ${u(v.principalOffice)}.`);
  p(`(d) Registered Agent and Office. The name of the Company's registered agent for service of process and the address of the Company's registered office will be as specified in the Company's Articles of Organization or any subsequent filings with the Secretary of State. Agent: ${u(v.registeredAgent)}. Registered office: ${u(v.registeredOffice)}.`);
  p("(e) No State Law Partnership. No provisions of this Agreement shall be deemed or construed to constitute a partnership (including, without limitation, a limited partnership) or joint venture, or any Member a partner or joint venturer of or with any other Member, for any purposes other than federal and state tax purposes.");

  p("Purposes and Powers", true);
  p(`(a) Purpose. The Company is created for the following business purpose ${u(v.companyPurpose)}.`);
  p(`(b) Powers. The Company shall have all of the powers of a limited liability company set forth under ${u(v.formationState)} law.`);
  p(`(c) Duration. The Company's term shall commence upon the filing of Articles of Organization and all other such necessary materials with ${u(v.formationState)}. The Company will operate until terminated as outlined in this Agreement unless: (i) a majority of the Members vote to dissolve the Company; (ii) no Member of the Company exists unless continued in a manner permitted by state law; (iii) it becomes unlawful for any Member or the Company to continue in business; (iv) a judicial decree is entered that dissolves the Company; or (v) any other event results in dissolution under federal or Alabama law.`);

  p("Members", true);
  p(`(a) Members. The Members of the Company and their membership interest at the time of adoption of this Agreement are as follows: ${u(v.membersWithPercent)}.`);
  p("(b) Initial Contribution. Each Member shall make an initial contribution to the company. No Member shall be entitled to interest on their initial contribution. Except as expressly provided by this Agreement, or as required by law, no Member shall have any right to demand or receive the return of their initial contribution. Any modifications as to the signatories' respective rights as to the receipt of their initial contributions must be set forth in writing and signed by all interested parties.");
  p(`(c) Death, Incompetency, Resignation, or Termination of a Member. Should a member die, be declared incompetent, or withdraw from the Company voluntarily or involuntarily, the remaining Members will have the option to buy out that Member's Membership interest. Involuntary removal must be by vote recorded in official minutes. Resigning members should submit notarized resignation to the Agent. Members agree to hire an outside firm to assess value. Members will have ${u(v.buyoutDecisionDays, 2)} days to decide on collective buyout and equal dispersion. If all Members do not agree to collective buyout, individual members may buy individually; if more than one member requests purchase, interest will be split equally among purchasing members. If all Members agree by unanimous vote, the Company may allow a non-Member to buy the interest and replace the previous Member. The name of the Company may be amended upon written and unanimous vote of all Members if a Member withdraws, dies, is found incompetent, or is terminated.`);

  p("Member Voting", true);
  p("(a) Voting power: The company's members shall each have one vote equal to each other member, regardless of the member's share of membership interest in the company. At all meetings, a member may vote in person or by proxy executed in writing by the member or duly authorized attorney.");

  p("Accounting and Distributions", true);
  p(`(a) Fiscal Year: The Company's fiscal year shall end on the last day of ${u(v.fiscalYearEnd)}.`);
  p("(b) Records: All financial records including tax returns and financial statements will be held at the Company's primary business address and will be accessible to all Members.");
  p("(c) Distributions: Distributions shall be issued, as directed by the Company's Treasurer or Assistant Treasurer, on a quarterly basis, based upon the Company's fiscal year. Distribution shall not exceed remaining net cash after appropriate provisions for ongoing and anticipatable liabilities and expenses. Each Member shall receive a percentage matching that Member's membership interest.");

  p("Tax Treatment Election", true);
  p(`The Company has not filed with the Internal Revenue Service for treatment as a corporation. Instead, the Company will be taxed as ${u(v.taxElection)}. The Members may elect for the Company to be treated as a C-Corporation, S-Corporation, or a partnership at any time.`);

  p("Board of Managers", true);
  p(`(a) Creation of a Board of Managers. The Members shall create a board of managers ("Board") consisting of managers appointed at the sole discretion of the Members and headed by the Chairman of the Board. Members may serve as managers and may appoint a Member as Chairman. The authorized number of managers may be increased or decreased by the Members at any time subject to state law. Each manager holds office until successor qualification or earlier death, resignation, or removal. Initial officers include Chairman ${u(v.chairmanName)}, Secretary ${u(v.secretaryName)}, and Treasurer ${u(v.treasurerName)}.`);
  p("(b) Powers and Operation of the Board of Managers. The Board shall have the power to do any and all acts necessary, convenient, or incidental to or for the furtherance of the Company's purposes, including all powers, statutory or otherwise.");
  p(`Meetings. The Board may hold regular and special meetings within or outside ${u(v.meetingState)}. Regular meetings may be held without notice at times and places determined by the Board. Special meetings may be called by the Chairman on not less than one day's notice by telephone, electronic mail, facsimile, mail, or other communication means.`);
  p("At all meetings of the Board, a majority of managers constitutes a quorum for business. Except as otherwise provided in this Agreement, the act of a majority of managers present at a meeting with quorum is the act of the Board. If quorum is not present, managers present may adjourn until quorum is present. Any action required or permitted may be taken without a meeting if all managers consent in writing and the writing is filed with Board minutes.");
  p("Managers may participate by telephone conference or similar communications equipment that allows all participants to hear each other, and such participation constitutes presence in person. If all participate remotely, the meeting is deemed held at the primary business address.");
  p("Removal of Managers. Unless otherwise restricted by law, any manager or the entire Board may be removed, with or without cause, by the Members, and vacancies may be filled by the Members.");
  p("No Power to Dissolve the Company. Notwithstanding any contrary provision, the Board shall not be authorized, without affirmative vote of the Members, to institute bankruptcy/insolvency proceedings, consent to such proceedings, or seek reorganization or relief for the Company under applicable federal or state law.");

  p("Duties of the Board", true);
  p("The Board and Members shall cause the Company to preserve and keep in full force and effect its existence, rights, and franchises. The Board also shall cause the Company to: (i) maintain separate books/records/accounts/statements/stationery/invoices/checks/documents/accounts; (ii) hold itself out as a separate legal entity and conduct business in its own name; (iii) file its own tax returns and pay taxes as required; (iv) not commingle assets and maintain segregation of Company assets; (v) pay liabilities only from Company funds except organizational expenses; (vi) maintain arm's length relationship with Members and market terms in Member transactions; (vii) pay own employee salaries from own funds and maintain sufficient employees; (viii) not guarantee debts of others; (ix) allocate shared office overhead fairly; (x) not pledge assets for others or make loans/advances to any person; (xi) correct misunderstanding regarding separate identity; and (xii) maintain adequate capital.");

  p("Appointment and Titles of Officers", true);
  p(`Initial officers appointed by Members shall include at least a Chairman, Secretary, and Treasurer. Additional/substitute officers are chosen by the Board. The Board may appoint one or more President, Vice-President, Assistant Secretaries, and Assistant Treasurers. Offices may be held by same person as permitted by ${u(v.formationState)} law. Officers and agents hold office until successors are chosen and qualified. Any officer elected or appointed by Members or Board may be removed with or without cause by majority vote of the Board. Vacancies are filled by the Board.`);

  p("Dissolution", true);
  p("(a) Limits on Dissolution. The Company shall have perpetual existence and shall be dissolved and wound up only upon the provisions established above.");
  p("Notwithstanding any other provision, bankruptcy of any Member shall not cause such Member to cease being a Member and, upon such event, Company business shall continue without dissolution.");
  p("Each Member waives any right to agree in writing to dissolve the Company upon bankruptcy of any Member or occurrence of any event causing a Member to cease to be a Member.");
  p("(c) Winding Up. Upon occurrence of any event specified in Duration above, Company continues solely to wind up affairs in orderly manner, liquidate assets, and satisfy creditor claims. One or more Members selected by remaining Members oversee winding up/liquidation, account for liabilities and assets, and distribute assets or sale proceeds as provided under this Agreement.");

  p("Insurance", true);
  p("The Company shall have power to purchase and maintain insurance, including insurance on behalf of any Covered Person against liability incurred in such capacity or arising out of status as an agent of the Company, whether or not the Company would have power to indemnify under applicable law. This is separate from any business insurance otherwise required.");

  p("Settling Disputes", true);
  p(`All Members agree to enter mediation before filing suit for disputes arising from this Agreement or Company. Members agree to attend one mediation session before suit. If a Member does not attend mediation, or dispute is not settled after one session, Members may file suit. Any lawsuits will be under jurisdiction of ${u(v.lawsuitState)}.`);

  p("Independent Counsel", true);
  p("All Members have been advised of right to seek independent legal counsel before signing. All Members enter this Agreement freely and voluntarily without coercion or duress.");

  p("General Provisions", true);
  p("Notices. All notices, offers, or communications required/permitted by this Agreement shall be in writing and may be personally served or sent by United States mail and deemed delivered when delivered in person or three business days after deposit in United States mail, properly addressed and postage prepaid, or by the appropriate party.");
  p("Number of Days. In computing number of days (other than Sundays) for this Agreement, all days are counted including Saturdays, Sundays, and holidays; provided if final day falls on Saturday, Sunday, or holiday, notification is due next business day unless extended to next day that is not Saturday, Sunday, or holiday.");
  p("Execution of Counterparts. This Agreement may be executed in any number of counterparts, each deemed an original, and all together one instrument.");
  p("Severability. Provisions are independent and separable; no provision is invalidated by any other provision being held invalid/unenforceable.");
  p(`Controlling Law. This Agreement shall be governed by and construed in all respects under laws of ${u(v.controllingLawState)} (without regard to conflicts of law principles).`);
  p(`Application of State Law. Any matter not specifically covered by this Agreement shall be governed by applicable provisions of ${u(v.applicationStateLaw)} law.`);
  p(`Amendment. This Agreement may be amended only by written consent of the Board and Members. Upon approval of amendment/supplement/restatement as to Certificate, Company shall prepare, execute, and file Certificate of Amendment or Amended and Restated Certificate in accordance with ${u(v.amendmentStateLaw)} law.`);

  p("Entire Agreement", true);
  p("This Agreement contains the entire understanding among the parties with respect to its subject matter and supersedes all prior and contemporaneous agreements and understandings, inducements, or conditions, express or implied, oral or written, except as herein contained.");

  p("Execution", true);
  uf("Name: ", v.executionName);
  uf("Signatures: ", v.executionSignature);
  uf("Date: ", v.executionDate);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("llc_operating_agreement.pdf");
};

export default function LLCOperatingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="LLC Operating Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="llcoperatingagreement"
      preserveStepLayout
    />
  );
}
