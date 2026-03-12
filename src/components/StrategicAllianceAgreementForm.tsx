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
  if (country === "United States") {
    return [
      { value: "California", label: "California" },
      { value: "New York", label: "New York" },
      { value: "Texas", label: "Texas" },
      { value: "Florida", label: "Florida" },
      { value: "Other US State", label: "Other US State" },
    ];
  }
  if (country === "Canada") {
    return [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Other Canadian Province", label: "Other Canadian Province" },
    ];
  }
  if (country === "United Kingdom") {
    return [
      { value: "England", label: "England" },
      { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" },
      { value: "Northern Ireland", label: "Northern Ireland" },
    ];
  }
  if (country === "Australia") {
    return [
      { value: "New South Wales", label: "New South Wales" },
      { value: "Victoria", label: "Victoria" },
      { value: "Queensland", label: "Queensland" },
      { value: "Western Australia", label: "Western Australia" },
      { value: "Other Australian State", label: "Other Australian State" },
    ];
  }
  if (country === "Pakistan") {
    return [
      { value: "Punjab", label: "Punjab" },
      { value: "Sindh", label: "Sindh" },
      { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
    ];
  }
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date and Party Information",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "text", required: true, placeholder: "[Effective Date]" },
      { name: "partyAName", label: "Party A Name", type: "text", required: true },
      { name: "partyAOrgCountry", label: "Party A Organization Country", type: "select", required: true, options: countryOptions },
      {
        name: "partyAOrgState",
        label: "Party A Organization State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "partyAOrgCountry",
        getOptions: (values) => getStateOptions(values.partyAOrgCountry),
      },
      { name: "partyAAddress", label: "Party A Principal Address", type: "textarea", required: true },
      { name: "partyBName", label: "Party B Name", type: "text", required: true },
      { name: "partyBOrgCountry", label: "Party B Organization Country", type: "select", required: true, options: countryOptions },
      {
        name: "partyBOrgState",
        label: "Party B Organization State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "partyBOrgCountry",
        getOptions: (values) => getStateOptions(values.partyBOrgCountry),
      },
      { name: "partyBAddress", label: "Party B Principal Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Scope and Intellectual Property",
    fields: [
      { name: "jointServicesExtra", label: "Joint Services Additional Details (optional)", type: "textarea", required: false },
      { name: "marketingPromotionExtra", label: "Marketing/Promotion Additional Details (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Period of Performance and Management",
    fields: [
      { name: "specifiedDate", label: "Specified Date for Term Clause", type: "text", required: true, placeholder: "[Specified Date]" },
      { name: "renewalPeriod", label: "Automatic Renewal Period", type: "text", required: true, placeholder: "one year" },
      { name: "terminationNoticePeriod", label: "Termination Notice Period", type: "text", required: true, placeholder: "60 days" },
      { name: "partyARepresentative", label: "Party A Designated Representative", type: "text", required: true },
      { name: "partyBRepresentative", label: "Party B Designated Representative", type: "text", required: true },
    ],
  },
  {
    label: "Confidentiality and Relationship Terms",
    fields: [
      { name: "confidentialityExtra", label: "Confidentiality Additional Notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Indemnification and Liability",
    fields: [
      {
        name: "liabilityCap",
        label: "Aggregate Liability Cap Basis",
        type: "text",
        required: true,
        placeholder: "total amount paid in prior 12 months",
      },
    ],
  },
  {
    label: "Governing Law and Jurisdiction",
    fields: [
      { name: "governingLawCountry", label: "Governing Law Country", type: "select", required: true, options: countryOptions },
      {
        name: "governingLawState",
        label: "Governing Law State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "governingLawCountry",
        getOptions: (values) => getStateOptions(values.governingLawCountry),
      },
      { name: "jurisdictionCountry", label: "Jurisdiction Court Country", type: "select", required: true, options: countryOptions },
      {
        name: "jurisdictionState",
        label: "Jurisdiction Court State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "jurisdictionCountry",
        getOptions: (values) => getStateOptions(values.jurisdictionCountry),
      },
    ],
  },
  {
    label: "Signatories and Final Review",
    fields: [
      { name: "partyABy", label: "Party A By", type: "text", required: true },
      { name: "partyASignerName", label: "Party A Signer Name", type: "text", required: true },
      { name: "partyASignerTitle", label: "Party A Signer Title", type: "text", required: true },
      { name: "partyASignerDate", label: "Party A Signer Date", type: "text", required: true, placeholder: "__________________________" },
      { name: "partyBBy", label: "Party B By", type: "text", required: true },
      { name: "partyBSignerName", label: "Party B Signer Name", type: "text", required: true },
      { name: "partyBSignerTitle", label: "Party B Signer Title", type: "text", required: true },
      { name: "partyBSignerDate", label: "Party B Signer Date", type: "text", required: true, placeholder: "__________________________" },
      { name: "reviewNote", label: "Final Review Note (optional)", type: "textarea", required: false },
    ],
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

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "STRATEGIC ALLIANCE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  p(
    `This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate)}, by and between:`
  );
  p(
    `- ${u(v.partyAName)}, a company organized and existing under the laws of ${u(v.partyAOrgState)}, ${u(v.partyAOrgCountry)}, with its principal place of business at ${u(v.partyAAddress)} ("Party A"); and`
  );
  p(
    `- ${u(v.partyBName)}, a company organized and existing under the laws of ${u(v.partyBOrgState)}, ${u(v.partyBOrgCountry)}, with its principal place of business at ${u(v.partyBAddress)} ("Party B").`
  );
  p(
    'Party A and Party B may hereinafter be collectively referred to as the "Parties" or individually as a "Party."'
  );
  p(
    "The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein."
  );

  p("1. SCOPE OF STRATEGIC ALLIANCE", true);
  p("1.1 Joint Services", true);
  p(
    "Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards."
  );
  if ((v.jointServicesExtra || "").trim()) p(`Additional Joint Services Detail: ${v.jointServicesExtra}`);
  p("1.2 Ownership of Intellectual Property", true);
  p(
    "Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created or developed prior to or independently of this Agreement. No Party shall claim ownership of the other Party's pre-existing intellectual property."
  );
  p("1.3 Marketing and Promotion", true);
  p(
    "Both Parties may promote the strategic alliance to potential clients; however, all marketing materials, representations, or promotional statements require prior written approval of the Party whose services or intellectual property are referenced."
  );
  if ((v.marketingPromotionExtra || "").trim()) p(`Additional Marketing Detail: ${v.marketingPromotionExtra}`);

  p("2. PERIOD OF PERFORMANCE", true);
  p("2.1 Effective Date", true);
  p(`This Agreement shall become effective on ${u(v.effectiveDate)}.`);
  p("2.2 Term and Expiration", true);
  p(
    `The Agreement shall continue until the later of: (a) ${u(v.specifiedDate)}, or (b) Completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`
  );
  p("2.3 Automatic Renewal", true);
  p(
    `This Agreement shall automatically renew for successive periods of ${u(v.renewalPeriod)}, unless either Party provides written notice of termination at least ${u(v.terminationNoticePeriod)} prior to the end of the current term.`
  );
  p("2.4 Early Termination", true);
  p("The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");

  p("3. MANAGEMENT", true);
  p("3.1 Designated Representatives", true);
  p(
    "Each Party shall designate a senior officer, partner, or other responsible person to oversee administration of this Agreement, client relationships, billing, and compliance with the terms hereof."
  );
  p(`Party A representative: ${u(v.partyARepresentative)}`);
  p(`Party B representative: ${u(v.partyBRepresentative)}`);
  p("3.2 Authority and Responsibility", true);
  p(
    "The designated representatives shall have authority to coordinate projects, resolve operational issues, and act as the primary liaison for all matters arising under this Agreement."
  );

  p("4. CONFIDENTIAL INFORMATION", true);
  p("4.1 Acknowledgment", true);
  p(
    "In connection with the performance of services, each Party may receive confidential or proprietary information, including trade secrets, business strategies, financial data, client lists, or methodologies."
  );
  p("4.2 Obligations of Confidentiality", true);
  p("Each Party agrees to: (a) maintain such information in strict confidence;");
  p("(b) refrain from using it for any purpose other than the performance of this Agreement;");
  p("(c) not alter, copy, or disclose it without the prior written consent of the disclosing Party; and");
  p("(d) return or destroy all tangible materials upon termination of this Agreement or upon request.");
  p("4.3 Exceptions", true);
  p("Confidential information shall not include information that:");
  p("(a) is or becomes publicly available without breach of this Agreement;");
  p("(b) is lawfully obtained from a third party without restriction; or");
  p("(c) is independently developed without use of the other Party's confidential information.");
  if ((v.confidentialityExtra || "").trim()) p(`Additional Confidentiality Detail: ${v.confidentialityExtra}`);

  p("5. NO PARTNERSHIP OR AGENCY", true);
  p(
    "Nothing in this Agreement shall be construed as creating a partnership, joint venture, agency, or employment relationship between the Parties. The Parties shall not share profits, losses, or liabilities beyond the terms expressly stated herein, nor shall a separate taxable entity be created."
  );

  p("6. INDEMNIFICATION", true);
  p("6.1 Obligation to Indemnify", true);
  p(
    "Each Party agrees to indemnify, defend, and hold harmless the other Party from any and all claims, losses, damages, liabilities, costs, or expenses (including reasonable attorneys' fees) arising from the negligence, willful misconduct, or breach of this Agreement by the indemnifying Party."
  );
  p("6.2 Procedure", true);
  p(
    "The indemnified Party shall promptly notify the indemnifying Party of any claim and shall reasonably cooperate in the defense or settlement of such claim."
  );

  p("7. INTELLECTUAL PROPERTY", true);
  p("7.1 Ownership", true);
  p(
    "All work, materials, or information created or delivered in connection with specific engagements under this Agreement shall remain the property of the Party performing the work."
  );
  p("7.2 Pre-Existing Methodologies", true);
  p(
    "Any proprietary methodologies, know-how, or intellectual property developed prior to this Agreement shall remain the exclusive property of the originating Party and shall not be claimed by the other Party."
  );

  p("8. LIMITATIONS OF LIABILITY", true);
  p("8.1 Exclusion of Damages", true);
  p(
    "Neither Party shall be liable to the other for indirect, special, incidental, or consequential damages, including lost profits, business interruption, or loss of business information."
  );
  p("8.2 Limitation on Aggregate Liability", true);
  p(
    `The total aggregate liability of each Party under this Agreement, whether in contract, tort, or otherwise, shall not exceed ${u(v.liabilityCap)}.`
  );

  p("9. ENTIRE AGREEMENT AND CONFLICT", true);
  p("9.1 Entire Agreement", true);
  p(
    "This Agreement, together with all exhibits, schedules, and incorporated documents, constitutes the entire understanding between the Parties and supersedes all prior discussions, negotiations, or agreements, whether written or oral."
  );
  p("9.2 Conflict Resolution", true);
  p(
    "In the event of any conflict between the terms of this Agreement and any annexed document or schedule, the terms of this Agreement shall govern."
  );

  p("10. GOVERNING LAW AND JURISDICTION", true);
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(v.governingLawState)}, ${u(v.governingLawCountry)}, without regard to its conflict of law principles. Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in ${u(v.jurisdictionState)}, ${u(v.jurisdictionCountry)}.`
  );

  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");
  p(u(v.partyAName), true);
  p(`By: ${u(v.partyABy)}`);
  p(`Name: ${u(v.partyASignerName)}`);
  p(`Title: ${u(v.partyASignerTitle)}`);
  p(`Date: ${u(v.partyASignerDate, 12)}`);
  p(u(v.partyBName), true);
  p(`By: ${u(v.partyBBy)}`);
  p(`Name: ${u(v.partyBSignerName)}`);
  p(`Title: ${u(v.partyBSignerTitle)}`);
  p(`Date: ${u(v.partyBSignerDate, 12)}`);

  if ((v.reviewNote || "").trim()) {
    p("Final Review Note:", true);
    p(v.reviewNote);
  }

  doc.save("strategic_alliance_agreement.pdf");
};

export default function StrategicAllianceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Strategic Alliance Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
      preserveStepLayout
    />
  );
}
