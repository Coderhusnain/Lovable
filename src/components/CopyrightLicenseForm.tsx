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
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "arbitrationState", label: "Arbitration Association State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Parties and Licensed Property",
    fields: [
      { name: "licensorName", label: "Licensor Name", type: "text", required: true },
      { name: "licensorAddress", label: "Licensor Address", type: "textarea", required: true },
      { name: "licenseeName", label: "Licensee Name", type: "text", required: true },
      { name: "licenseeAddress", label: "Licensee Address", type: "textarea", required: true },
      { name: "copyrightWorkDescription", label: "Description of Copyrighted Work", type: "textarea", required: true },
      { name: "territory", label: "Territory", type: "text", required: true },
    ],
  },
  {
    label: "Rights and Royalty",
    fields: [
      { name: "royaltyStructure", label: "Royalty Structure", type: "textarea", required: true },
      { name: "defaultNoticeDays", label: "Default Notice Days", type: "text", required: true, placeholder: "Number" },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      { name: "legalNotes", label: "Legal protections notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Termination and Notices",
    fields: [
      { name: "terminationNotes", label: "Termination/notice notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "licensorSignName", label: "Licensor Name", type: "text", required: true },
      { name: "licensorSignature", label: "Licensor Signature", type: "text", required: true },
      { name: "licensorDate", label: "Licensor Date", type: "date", required: true },
      { name: "licenseeSignName", label: "Licensee Name", type: "text", required: true },
      { name: "licenseeSignature", label: "Licensee Signature", type: "text", required: true },
      { name: "licenseeDate", label: "Licensee Date", type: "date", required: true },
    ],
  },
  {
    label: "Legal Filing Notes",
    fields: [
      { name: "notarySigner", label: "Signed before notary public by", type: "text", required: true },
      { name: "courtOrFilingOffice", label: "Court/Filing office", type: "text", required: true },
      { name: "requestingBusiness", label: "Requesting business (if applicable)", type: "text", required: false },
      { name: "additionalAssistanceNotes", label: "Additional assistance notes (optional)", type: "textarea", required: false },
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
    doc.setFontSize(10.35);
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
  const title = "COPYRIGHT LICENSE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Effective Date: ", v.effectiveDate);
  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p(`This Copyright License Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, 12)} by and between: ${u(v.licensorName)}, residing at ${u(v.licensorAddress)} (hereinafter referred to as the "Licensor"), and ${u(v.licenseeName)}, residing at ${u(v.licenseeAddress)} (hereinafter referred to as the "Licensee").`);
  p("WHEREAS, the Licensor is the sole owner of certain copyrighted material as described herein;");
  p("AND WHEREAS, the Licensee desires to obtain, and the Licensor agrees to grant, a license to use the copyrighted material under the terms and conditions set forth in this Agreement.");
  p("The parties agree as follows:");

  p("1. GRANT OF LICENSE", true);
  p(`The Licensor hereby grants to the Licensee an exclusive license to use the copyrighted material described as ${u(v.copyrightWorkDescription)} (the "Licensed Property") within the following geographical area: ${u(v.territory)}.`);
  p("Title, ownership, and all rights not expressly granted herein shall remain with the Licensor. The Licensee acknowledges and agrees that the Licensor shall retain all rights, title, and interest in and to the Licensed Property.");

  p("2. RIGHTS AND OBLIGATIONS", true);
  p("The Licensee shall bear sole responsibility for providing all funding, technical expertise, development, and marketing of the products or works incorporating the Licensed Property (collectively, the \"Work\").");
  p("All rights, title, and interest in and to the Work, other than the Licensed Property itself, shall belong exclusively to the Licensee. However, this shall not be construed as transferring ownership of the Licensed Property, or any rights not specifically granted under this Agreement.");

  p("3. ROYALTY PAYMENTS", true);
  p(`The Licensee agrees to pay the Licensor royalties calculated as follows: ${u(v.royaltyStructure)}.`);
  p("Each royalty payment shall be accompanied by a written statement detailing the calculation of the amount due.");

  p("4. MODIFICATIONS", true);
  p("The Licensee shall not modify, alter, or otherwise change the Licensed Property without the prior written consent of the Licensor. Furthermore, the Licensed Property shall not be used for any unlawful or unauthorized purposes.");

  p("5. DEFAULT", true);
  p(`In the event that the Licensee breaches any provision of this Agreement, including failure to remit royalty payments when due, the Licensor may terminate this Agreement by providing written notice to the Licensee at least ${u(v.defaultNoticeDays, 2)} days in advance.`);
  p("The Licensee may prevent termination by curing the breach within the notice period, provided no other breaches have occurred during that time.");

  p("6. ARBITRATION", true);
  p(`Any dispute arising under this Agreement which cannot be resolved amicably shall be submitted to arbitration in accordance with the rules of the ${u(v.arbitrationState)} Arbitration Association.`);
  p("Each party shall bear its own costs, and the costs of arbitration shall be shared equally.");
  p("The decision of the arbitrator shall be final and binding and may be enforced in any court of competent jurisdiction.");

  p("7. WARRANTIES", true);
  p("No warranties, express or implied, are made by either party with respect to the Licensed Property or its use, including warranties of merchantability or fitness for a particular purpose.");
  p('The Licensed Property is provided "AS IS," and the Licensor shall not be liable for any direct, indirect, special, incidental, or consequential damages arising from its use.');

  p("8. ASSIGNMENT AND SUCCESSORS", true);
  p("This Agreement shall be binding upon and inure to the benefit of the parties and their respective heirs, successors, and permitted assigns. Neither party may assign its rights or obligations under this Agreement without the prior written consent of the other party.");

  p("9. INDEMNIFICATION", true);
  p("Each party agrees to indemnify, defend, and hold harmless the other party from any and all losses, claims, damages, liabilities, costs, or expenses (including reasonable attorneys' fees) arising from any breach of their respective representations, warranties, or obligations under this Agreement.");

  p("10. TERMINATION", true);
  p("This Agreement may be terminated by either party upon thirty (30) days' written notice.");
  p("Upon termination or expiration, the Licensee shall cease all reproduction, distribution, marketing, and sale of the Licensed Property as soon as commercially feasible.");
  p("Notwithstanding the foregoing, the Licensee may fulfill outstanding orders and sell existing inventory, subject to verification by the Licensor.");
  p("Royalty obligations that accrued prior to termination shall survive the termination of this Agreement.");
  if ((v.terminationNotes || "").trim()) p(v.terminationNotes);

  p("11. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the complete and exclusive statement of the understanding between the parties and supersedes all prior and contemporaneous agreements or understandings, whether oral or written.");

  p("12. AMENDMENT", true);
  p("This Agreement may only be amended or modified by a written document executed by both parties.");

  p("13. SEVERABILITY", true);
  p("If any provision of this Agreement is found to be invalid or unenforceable, the remainder of the Agreement shall remain in full force and effect.");
  p("Any invalid provision shall be deemed modified to the extent necessary to make it enforceable.");

  p("14. NOTICES", true);
  p("All notices under this Agreement shall be sent via certified or registered mail to the addresses set forth above. Either party may update its address by written notice to the other.");

  p("15. WAIVER", true);
  p("The failure of either party to enforce any provision of this Agreement shall not be construed as a waiver of that party's right to enforce such provision in the future.");

  p("16. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}, without regard to its conflict of laws principles.`);

  p("17. SIGNATURES", true);
  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date set forth above.");
  p("Licensor:", true);
  uf("Name: ", v.licensorSignName);
  uf("Signature: ", v.licensorSignature);
  uf("Date: ", v.licensorDate);
  p("Licensee:", true);
  uf("Name: ", v.licenseeSignName);
  uf("Signature: ", v.licenseeSignature);
  uf("Date: ", v.licenseeDate);
  if ((v.legalNotes || "").trim()) p(v.legalNotes);

  p("Make It Legal", true);
  p(`This Agreement should be signed in front of a notary public by ${u(v.notarySigner, 16)}.`);
  p(`Once signed in front of a notary, this document should be delivered to ${u(v.courtOrFilingOffice, 18)} for filing.`);

  p("Copies", true);
  p(`The original Agreement should be filed with the Clerk of Court or delivered to ${u(v.requestingBusiness, 18)}.`);
  p("The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");

  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
  if ((v.additionalAssistanceNotes || "").trim()) p(v.additionalAssistanceNotes);

  doc.save("copyright_license_agreement.pdf");
};

export default function CopyrightLicense() {
  return (
    <FormWizard
      steps={steps}
      title="Copyright License Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="copyrightlicense"
      preserveStepLayout
    />
  );
}
