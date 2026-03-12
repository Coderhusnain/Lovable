import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: [
          { value: "United States", label: "United States" },
          { value: "Canada", label: "Canada" },
          { value: "United Kingdom", label: "United Kingdom" },
          { value: "Australia", label: "Australia" },
          { value: "Pakistan", label: "Pakistan" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "province",
        label: "Province/State/Region",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "United States") {
            return [
              { value: "California", label: "California" },
              { value: "New York", label: "New York" },
              { value: "Texas", label: "Texas" },
              { value: "Florida", label: "Florida" },
              { value: "Other US State", label: "Other US State" },
            ];
          }
          if (values.country === "Canada") {
            return [
              { value: "Ontario", label: "Ontario" },
              { value: "Quebec", label: "Quebec" },
              { value: "British Columbia", label: "British Columbia" },
              { value: "Alberta", label: "Alberta" },
              { value: "Other Canadian Province", label: "Other Canadian Province" },
            ];
          }
          if (values.country === "United Kingdom") {
            return [
              { value: "England", label: "England" },
              { value: "Scotland", label: "Scotland" },
              { value: "Wales", label: "Wales" },
              { value: "Northern Ireland", label: "Northern Ireland" },
            ];
          }
          if (values.country === "Australia") {
            return [
              { value: "New South Wales", label: "New South Wales" },
              { value: "Victoria", label: "Victoria" },
              { value: "Queensland", label: "Queensland" },
              { value: "Western Australia", label: "Western Australia" },
              { value: "Other Australian State", label: "Other Australian State" },
            ];
          }
          if (values.country === "Pakistan") {
            return [
              { value: "Punjab", label: "Punjab" },
              { value: "Sindh", label: "Sindh" },
              { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
              { value: "Balochistan", label: "Balochistan" },
              { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
              { value: "Gilgit-Baltistan", label: "Gilgit-Baltistan" },
              { value: "Azad Jammu and Kashmir", label: "Azad Jammu and Kashmir" },
            ];
          }
          return [{ value: "Other Region", label: "Other Region" }];
        },
      },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State (optional text)", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "party1Name", label: "Party 1 Name", type: "text", required: true },
      { name: "party1Address", label: "Party 1 Address", type: "textarea", required: true },
      { name: "party2Name", label: "Party 2 Name", type: "text", required: true },
      { name: "party2Address", label: "Party 2 Address", type: "textarea", required: true },
      {
        name: "additionalParty1",
        label: "Additional Party Reference 1 (optional)",
        type: "text",
        required: false,
        placeholder: "Used in header line: 'and ____ and ____'",
      },
      {
        name: "additionalParty2",
        label: "Additional Party Reference 2 (optional)",
        type: "text",
        required: false,
      },
    ],
  },
  {
    label: "Recitals and Scope",
    fields: [
      { name: "recitalParty1", label: "Recital Party Name 1", type: "text", required: true },
      { name: "recitalParty2", label: "Recital Party Name 2", type: "text", required: true },
      {
        name: "scopeActivities",
        label: "Scope of Activities text",
        type: "textarea",
        required: true,
        placeholder: "The Parties shall carry out the marketing activities as decided ...",
      },
      {
        name: "considerationStatement",
        label: "Consideration statement",
        type: "textarea",
        required: true,
        placeholder: "Each Party acknowledges that its obligations ... constitute good and valuable consideration...",
      },
    ],
  },
  {
    label: "Reporting and Tracking",
    fields: [
      { name: "trackingPartyA", label: "Tracking subsection (a): first blank", type: "text", required: true },
      { name: "trackingPartyB", label: "Tracking subsection (a): second blank", type: "text", required: true },
      { name: "trackingSiteA", label: "Tracking subsection (a): source site name", type: "text", required: true },
      { name: "trackingSiteB", label: "Tracking subsection (a): destination site name", type: "text", required: true },
      { name: "trackingServicesA", label: "Tracking subsection (a): services label", type: "text", required: true },
      { name: "trackingPartyC", label: "Tracking subsection (b): first blank", type: "text", required: true },
      { name: "trackingPartyD", label: "Tracking subsection (b): second blank", type: "text", required: true },
      { name: "trackingSiteC", label: "Tracking subsection (b): source site name", type: "text", required: true },
      { name: "trackingSiteD", label: "Tracking subsection (b): destination site name", type: "text", required: true },
      { name: "trackingServicesB", label: "Tracking subsection (b): services label", type: "text", required: true },
    ],
  },
  {
    label: "Term and Liability",
    fields: [
      { name: "initialTermMonths", label: "Initial Term (months)", type: "number", required: true, placeholder: "6" },
      { name: "renewalTermMonths", label: "Renewal Term (months)", type: "number", required: true, placeholder: "6" },
      { name: "causeCureDays", label: "Cure period for cause termination (days)", type: "number", required: true, placeholder: "30" },
      { name: "convenienceNoticeDays", label: "Convenience termination notice (days)", type: "number", required: true, placeholder: "30" },
      { name: "liabilityCap", label: "Liability cap amount", type: "text", required: true, placeholder: "$-----------" },
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
      { name: "disputeVenue", label: "Dispute Court Location", type: "text", required: true },
    ],
  },
  {
    label: "Notices, Records and Signatories",
    fields: [
      { name: "noticeAddress1", label: "Notice Address for Party 1", type: "textarea", required: true },
      { name: "noticeAddress2", label: "Notice Address for Party 2", type: "textarea", required: true },
      { name: "recordsRetentionYears", label: "Records retention (years)", type: "number", required: true, placeholder: "1" },
      { name: "recordsNoticeDays", label: "Reasonable notice for record access (days)", type: "number", required: true, placeholder: "10" },
      { name: "party1By", label: "Party 1 By (signature line)", type: "text", required: true },
      { name: "party1Signer", label: "Party 1 Signer Name", type: "text", required: true },
      { name: "party1Title", label: "Party 1 Title", type: "text", required: true },
      { name: "party1Date", label: "Party 1 Date", type: "date", required: true },
      { name: "party2By", label: "Party 2 By (signature line)", type: "text", required: true },
      { name: "party2Signer", label: "Party 2 Signer Name", type: "text", required: true },
      { name: "party2Title", label: "Party 2 Title", type: "text", required: true },
      { name: "party2Date", label: "Party 2 Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 16;
  const textWidth = pageWidth - margin * 2;
  const lineHeight = 5.4;
  const pageBottom = 282;
  let y = 18;

  const u = (value?: string, min = 12) => {
    const cleaned = (value || "").trim();
    return cleaned || "_".repeat(min);
  };

  const ensure = (needed = 10) => {
    if (y + needed > pageBottom) {
      doc.addPage();
      y = 18;
    }
  };

  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, textWidth);
    ensure(lines.length * lineHeight + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  const uf = (label: string, value?: string, min = 14) => {
    ensure(7.5);
    const labelText = `${label}: `;
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    doc.text(labelText, margin, y);
    const startX = margin + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    const fill = shown || "_".repeat(min);
    doc.text(fill, startX, y);
    doc.line(startX, y + 1.1, startX + doc.getTextWidth(fill), y + 1.1);
    y += 6.1;
  };

  const jurisdiction = `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`;

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "MARKETING AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  doc.line(pageWidth / 2 - titleWidth / 2, y + 1.1, pageWidth / 2 + titleWidth / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction", jurisdiction);

  p(
    `This Marketing Agreement (this "Agreement"), dated as of ${u(v.effectiveDate)} (the "Effective Date"), is entered into by and between ${u(v.party1Name)}, located at ${u(v.party1Address)}, and ${u(v.party2Name)}, located at ${u(v.party2Address)}, and ${u(v.additionalParty1)} and ${u(v.additionalParty2)} (each individually, a "Party," and collectively, the "Parties").`
  );

  p("RECITALS", true);
  p(
    `WHEREAS, ${u(v.recitalParty1)} and ${u(v.recitalParty2)} desire to establish an exclusive strategic marketing relationship pursuant to which each Party shall promote the other Party's products and services to its respective customers;`
  );
  p(
    'WHEREAS, this Agreement may be amended only by a written instrument executed by both Parties (an "Amendment"), and any Amendment shall be governed by the terms of this Agreement unless expressly stated otherwise.'
  );
  p("NOW, THEREFORE, in consideration of the mutual covenants set forth herein, the Parties agree as follows:");

  p("1. SCOPE OF ACTIVITIES", true);
  p(`The Parties shall carry out the marketing activities as decided ${u(v.scopeActivities)}. ${u(v.considerationStatement)}`);

  p("2. REPORTING", true);
  p(
    "Within ten (10) days following the end of each calendar month during the Term, each Party shall furnish to the other Party (or provide access to) a monthly report containing all data reasonably necessary to determine the value (including but not limited to traffic, completed sales, revenue, and conversions) generated from the activities performed under this Agreement."
  );

  p("3. TRACKING OF USERS", true);
  p(
    `a. ${u(v.trackingPartyA)} shall implement and maintain reasonable tracking mechanisms enabling ${u(v.trackingPartyB)} to accurately identify users linking from the ${u(v.trackingSiteA)} Site to the ${u(v.trackingSiteB)} Site and purchasing ${u(v.trackingServicesA)} Services.`
  );
  p(
    `b. ${u(v.trackingPartyC)} shall implement and maintain reasonable tracking mechanisms enabling ${u(v.trackingPartyD)} to accurately identify users linking from the ${u(v.trackingSiteC)} Site to the ${u(v.trackingSiteD)} Site and purchasing ${u(v.trackingServicesB)} Services.`
  );

  p("4. LICENSES", true);
  p(
    'Each Party grants to the other Party a non-exclusive, non-transferable, royalty-free license to use its trade names, trademarks, logos, and service marks (collectively, the "Marks") solely in connection with the performance of this Agreement.'
  );
  p("No Party shall use the other Party's Marks without prior written approval. No modifications to any Marks may be made without express written consent.");
  p(
    "Each Party acknowledges that all rights, title, and interest in and to the other Party's Marks and related goodwill remain exclusively with that Party. Neither Party shall contest, nor assist in contesting, the validity of any Marks, nor utilize marks that may cause confusion therewith."
  );
  p("All use of the other Party's Marks shall cease immediately upon request and shall automatically terminate upon expiration or termination of this Agreement.");

  p("5. TERM AND TERMINATION", true);
  p(
    `The term of this Agreement shall commence on the Effective Date and shall continue for ${u(v.initialTermMonths, 1)} (${u(v.initialTermMonths, 1)}) months (the "Initial Term"), unless terminated earlier according to this Agreement.`
  );
  p("The Launch Date shall be the date on which each Party's promotional offer goes live on the other Party's website.");
  p(
    `Following the Initial Term, this Agreement shall automatically renew for successive ${u(v.renewalTermMonths, 1)}-month periods (each, a "Renewal Term") unless terminated as provided below.`
  );
  p("a. Termination for Cause", true);
  p(
    `Either Party may terminate this Agreement immediately upon written notice if the other Party materially defaults and fails to cure such default within ${u(v.causeCureDays, 1)} (${u(v.causeCureDays, 1)}) days of receiving written notice thereof.`
  );
  p("b. Termination for Convenience", true);
  p(
    `Either Party may terminate this Agreement for any reason after the Initial Term upon ${u(v.convenienceNoticeDays, 1)} (${u(v.convenienceNoticeDays, 1)}) days' prior written notice.`
  );
  p("c. Effect of Termination", true);
  p("i. All promotions of the other Party's services shall immediately cease;");
  p("ii. Use of any Marks and technology of the other Party shall cease;");
  p("iii. The other Party's services shall no longer be displayed or made available through any website, platform, or channel;");
  p("iv. Upon written request, all confidential materials shall be returned or destroyed.");
  p("Termination shall not relieve either Party of obligations arising prior to the termination date.");

  p("6. WARRANTIES; DISCLAIMER", true);
  p("a. Warranties", true);
  p("Each Party represents and warrants that:");
  p("i. It has full authority to enter into and perform its obligations under this Agreement;");
  p("ii. Execution and performance will not violate any existing agreement;");
  p("iii. This Agreement constitutes a legal, valid, and binding obligation;");
  p("iv. No warranties are made by either Party other than those expressly stated in this Agreement.");
  p("b. Disclaimer", true);
  p(
    "EXCEPT AS EXPRESSLY PROVIDED HEREIN, EACH PARTY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, OR FITNESS FOR A PARTICULAR PURPOSE."
  );

  p("7. INDEMNIFICATION", true);
  p("a. Indemnification by Party 1", true);
  p(
    `${u(v.party1Name)} shall indemnify, defend, and hold harmless ${u(v.party2Name)} and its officers, directors, employees, and agents from all claims, costs, liabilities, and losses arising out of allegations that ${u(v.party1Name)}'s technology or Marks infringe upon any third-party intellectual property rights.`
  );
  p("b. Indemnification by Party 2", true);
  p(
    `${u(v.party2Name)} shall indemnify, defend, and hold harmless ${u(v.party1Name)} under the same terms and conditions stated above.`
  );
  p("c. Procedures", true);
  p(
    "The indemnified Party shall promptly notify the indemnifying Party of any claim. The indemnifying Party shall control the defense and settlement of the claim. No settlement may be entered that imposes liability or restrictions on the indemnified Party without its written consent. The indemnified Party may participate in the defense at its own cost."
  );

  p("8. CONFIDENTIALITY", true);
  p("a. Protection of Information", true);
  p(
    'During the Term, the Parties may exchange confidential information relating to business operations, products, pricing, employees, technology, and other proprietary matters ("Confidential Information").'
  );
  p("Confidential Information shall exclude information that:");
  p("i. becomes public through no wrongful act;");
  p("ii. was previously known to the receiving Party;");
  p("iii. enters the public domain through no fault of the receiving Party.");
  p(
    "Confidential Information shall be kept strictly confidential and used solely for performance under this Agreement. Required disclosures (e.g., subpoenas) are permitted only with reasonable prior notice to the other Party."
  );
  p("b. Injunctive Relief", true);
  p(
    "Improper disclosure or misuse of Confidential Information may cause irreparable harm. The harmed Party is entitled to injunctive relief without the need to prove monetary damages."
  );
  p("c. Survival", true);
  p("Confidentiality obligations shall survive termination of this Agreement.");

  p("9. LIMITATION OF LIABILITY", true);
  p(
    "NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY THEREOF."
  );
  p(
    `Each Party's total cumulative liability arising out of this Agreement shall not exceed ${u(v.liabilityCap)}, except with respect to obligations under Indemnification and Confidentiality.`
  );

  p("10. PUBLICITY", true);
  p(
    "No public announcement or press release referring to the other Party shall be made without prior written approval, except statements identifying the other Party as a customer or strategic marketing partner. Such approval shall not be unreasonably withheld or delayed."
  );

  p("11. MISCELLANEOUS", true);
  p("a. Notices", true);
  p(
    `All notices shall be in writing and delivered to the addresses listed above via express mail or courier with confirmed receipt. Party 1 notices: ${u(v.noticeAddress1)}. Party 2 notices: ${u(v.noticeAddress2)}. Notices shall be effective upon receipt.`
  );
  p("b. Entire Agreement", true);
  p("This Agreement constitutes the complete and exclusive agreement between the Parties and supersedes all prior understandings relating to the subject matter.");
  p("c. Waiver", true);
  p("No waiver is effective unless in writing. A waiver applies only to the specific instance and does not constitute a continuing waiver.");
  p("d. Force Majeure", true);
  p(
    "Neither Party shall be liable for failure to perform due to circumstances beyond its reasonable control, including natural disasters, pandemics, acts of war, riots, government actions, or labor disputes."
  );
  p("e. Headings", true);
  p("Headings are for convenience only and shall not affect interpretation.");
  p("f. Amendments and Severability", true);
  p(
    "Any modification must be in writing and signed by both Parties. Invalid provisions shall be replaced with enforceable provisions that most closely reflect the Parties' original intent."
  );
  p("g. Assignment", true);
  p(
    "No Party may assign its rights or obligations without prior written consent, except in connection with a merger or sale of substantially all assets, with notice."
  );
  p("h. Independent Contractors", true);
  p("The Parties are independent contractors and nothing herein creates a partnership, joint venture, agency, or employment relationship.");
  p("i. Governing Law", true);
  p(
    `This Agreement shall be governed by the laws of the State of ${u(v.governingLawState)}. All disputes shall be resolved exclusively in the courts located in ${u(v.disputeVenue)}.`
  );
  p("j. Construction", true);
  p(
    "Any conflicting or ambiguous provisions shall be interpreted to reflect the Parties' original intentions without affecting the enforceability of the remaining Agreement."
  );
  p("k. Records", true);
  p(
    `For ${u(v.recordsRetentionYears, 1)} (${u(v.recordsRetentionYears, 1)}) year(s) following the Term, each Party shall maintain accurate records relating to customer transactions and shall make such records available upon reasonable notice of ${u(v.recordsNoticeDays, 1)} (${u(v.recordsNoticeDays, 1)}) day(s).`
  );

  p("12. SIGNATORIES", true);
  p("This Agreement is executed by authorized representatives of the Parties as of the Effective Date.");
  p("Party 1", true);
  uf("By", v.party1By, 24);
  uf("Name", v.party1Signer, 24);
  uf("Title", v.party1Title, 20);
  uf("Date", v.party1Date, 14);
  p("Party 2", true);
  uf("By", v.party2By, 24);
  uf("Name", v.party2Signer, 24);
  uf("Title", v.party2Title, 20);
  uf("Date", v.party2Date, 14);

  doc.save("marketing_agreement.pdf");
};

export default function MarketingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Marketing Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="marketingagreement"
      preserveStepLayout
    />
  );
}
