import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Effective Date",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement year", type: "text", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "textarea", required: true },
      { name: "managerName", label: "Manager name", type: "text", required: true },
      { name: "managerAddress", label: "Manager address", type: "textarea", required: true },
      { name: "propertyDescription", label: "Insert property address(es) and description", type: "textarea", required: true },
      { name: "startDate", label: "Manager responsibilities start date", type: "text", required: true },
      { name: "monthlyRemitDay", label: "Monthly remittance day", type: "text", required: true },
    ],
  },
  {
    label: "Manager Duties and Authority",
    fields: [
      { name: "managerPercent", label: "Manager compensation percentage", type: "text", required: true, placeholder: "___" },
      { name: "ownerShortfallDays", label: "Owner shortfall payment days", type: "text", required: true },
      { name: "maintenanceAddendum", label: "Maintenance addendum (optional)", type: "textarea", required: false },
      { name: "leasingAddendum", label: "Leasing/legal addendum (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Term, Default, and Remedies",
    fields: [
      { name: "endDate", label: "Agreement end date", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: true },
      { name: "defaultAddendum", label: "Default/remedies addendum (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "General Clauses",
    fields: [
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "noticeAddressOwner", label: "Notice address for owner (optional)", type: "textarea", required: false },
      { name: "noticeAddressManager", label: "Notice address for manager (optional)", type: "textarea", required: false },
      { name: "forceMajeureAddendum", label: "Force majeure addendum (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "ownerSigner", label: "Owner signer name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: true },
      { name: "managerSigner", label: "Manager signer name", type: "text", required: true },
      { name: "managerSignDate", label: "Manager sign date", type: "date", required: true },
    ],
  },
  {
    label: "Execution Details",
    fields: [
      { name: "ownerSignatureText", label: "Owner signature text (optional)", type: "text", required: false },
      { name: "managerSignatureText", label: "Manager signature text (optional)", type: "text", required: false },
      { name: "signaturePageNote", label: "Signature page note (optional)", type: "textarea", required: false },
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

  const u = (val?: string, n = 18) => (val || "").trim() || "_".repeat(n);
  const p = (text: string, bold = false, gap = 1.25) => {
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
  const section = (t: string) => p(t, true, 1.9);
  const sectionBreak = (needed = 85) => {
    if (y + needed > bottom) {
      doc.addPage();
      y = 18;
    } else {
      y += 1.5;
    }
  };
  const newPage = (top = 18) => {
    doc.addPage();
    y = top;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(12.7);
  const title = "PROPERTY MANAGER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;

  p(`This Property Manager Agreement ("Agreement") is entered into and made effective as of the ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth, 10)}, ${u(v.agreementYear, 2)}, by and between`);
  p(`${u(v.ownerName, 20)}, of ${u(v.ownerAddress, 24)} (hereinafter the "Owner"),`, true, 1.0);
  p("And", true, 1.0);
  p(`${u(v.managerName, 20)}, of ${u(v.managerAddress, 24)} (hereinafter the "Manager").`, true, 1.0);
  p('The Owner and Manager may be collectively referred to as the "Parties."');
  section("RECITALS");
  p("WHEREAS, the Manager is experienced in the operation and management of real property and possesses the necessary personnel and resources to manage real estate competently;");
  p("WHEREAS, the Owner desires to retain the Manager to provide property management services for the real estate owned by the Owner, and the Manager agrees to provide such services on the terms set forth herein.");
  p("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:");
  p("", false, 0.8);

  section("1. Description of the Property");
  p('This Agreement applies to the management of the following property(ies) (the "Property"):');
  p(`[Insert Property Address(es) and Description] ${u(v.propertyDescription, 20)}`, true, 1.2);
  p("", false, 0.8);
  section("2. Responsibilities of the Manager");
  p(`The Manager shall serve as an independent contractor and the Owner's exclusive agent in managing the Property beginning on ${u(v.startDate, 10)}. The Manager's duties shall include, but are not limited to:`);
  p("a.   Collection and Disbursement of Rents", true, 1.0);
  p(`The Manager shall collect all rents as they become due and provide monthly accounting statements detailing rents received and expenses paid. Net income, after deduction of authorized disbursements, shall be remitted to the Owner by mail or as otherwise directed by the Owner, on or before the ${u(v.monthlyRemitDay, 4)} day of each month, subject to timely rent receipt from tenants.`);
  p("b.   Maintenance and Labor", true, 1.0);
  p("The Manager shall arrange for and oversee maintenance, repairs, and improvements to the Property, and may hire and supervise employees and contractors as required.");
  if ((v.maintenanceAddendum || "").trim()) p(v.maintenanceAddendum);
  p("c.   Leasing and Legal Proceedings", true, 1.0);
  p("The Manager shall advertise vacancies, screen and select tenants, set market rents, negotiate leases, sign, renew, or terminate rental agreements, and pursue legal actions for rent recovery or damage to the Property. The Manager may settle or compromise claims where appropriate.");
  if ((v.leasingAddendum || "").trim()) p(v.leasingAddendum);

  sectionBreak(95);
  section("3. Authority Granted");
  p("The Owner grants the Manager full authority to perform all acts reasonably necessary to carry out the responsibilities described in this Agreement, as if performed by the Owner personally.");
  p("", false, 0.8);
  section("4. Fair Housing Compliance");
  p("The Manager shall comply with all applicable federal, state, and local laws, including the Fair Housing Act, and shall not discriminate based on race, color, religion, sex, national origin, disability, or familial status.");
  p("", false, 0.8);
  section("5. Compensation");
  p(`The Manager shall be entitled to retain ${u(v.managerPercent, 4)}% of monthly gross rental collections as compensation. Additional compensation for services not described in this Agreement shall be agreed upon in writing by the Parties. The Manager may deduct actual out-of-pocket expenses incurred in the course of management and must provide itemized monthly statements detailing all income and expenditures.`);
  p(`If rent collections are insufficient to cover fees and expenses in a given month, the Owner shall remit the shortfall within ${u(v.ownerShortfallDays, 4)} days of receiving written notice from the Manager.`);
  p("", false, 0.8);
  section("6. Independent Contractor");
  p("The Manager shall perform all duties as an independent contractor and not as an employee of the Owner. The Manager shall be responsible for all taxes, benefits, and obligations as required by law.");
  p("", false, 0.8);
  section("7. Standard of Performance");
  p("The Manager shall perform its duties with reasonable diligence and in accordance with generally accepted industry standards, providing services consistent with those of reputable property managers in the community.");

  sectionBreak(95);
  section("8. Term and Termination");
  p(`This Agreement shall terminate automatically on ${u(v.endDate, 10)}, unless earlier terminated by either party with at least ${u(v.terminationNoticeDays, 4)} days written notice. Either party may terminate this Agreement without cause, provided such notice is properly given.`);
  p("", false, 0.8);
  section("9. Indemnification");
  p("The Manager shall indemnify, defend, and hold harmless the Owner from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from the negligent or willful acts or omissions of the Manager, its agents, employees, or representatives.");
  p("", false, 0.8);
  section("10. Insurance");
  p("The Manager shall maintain General Liability and Errors & Omissions insurance and shall provide proof of such coverage to the Owner upon request. The Owner shall include the Manager as an additional insured under the Owner's Public Liability Insurance Policy.");
  p("", false, 0.8);
  section("11. Default");
  p("The following shall constitute a material default:");
  p("•   Failure to make required payments;");
  p("•   Bankruptcy or insolvency of either party;");
  p("•   Property of either party becoming subject to seizure or assignment;");
  p("•   Failure to perform services in a timely or proper manner.");
  p("", false, 0.8);
  section("12. Remedies for Default");
  p(`If a default occurs, the non-defaulting party may terminate this Agreement upon ${u(v.defaultCureDays, 4)} days written notice, provided the default is not cured within the notice period. The notice must specify the nature of the breach with reasonable detail.`);
  if ((v.defaultAddendum || "").trim()) p(v.defaultAddendum);
  p("", false, 0.8);
  section("13. Force Majeure");
  p("Neither party shall be liable for delay or failure to perform obligations due to causes beyond their reasonable control, including but not limited to acts of God, pandemics, civil unrest, war, labor strikes, or governmental orders. Affected obligations shall be suspended until performance becomes possible.");
  if ((v.forceMajeureAddendum || "").trim()) p(v.forceMajeureAddendum);

  sectionBreak(95);
  section("14. Dispute Resolution");
  p("The Parties agree to attempt resolution of disputes through informal negotiations. If unsuccessful, the matter shall be submitted to mediation in accordance with applicable rules. If mediation fails, the Parties may pursue available legal remedies.");
  p("", false, 0.8);
  section("15. Confidentiality");
  p("The Manager shall not disclose any confidential or proprietary information belonging to the Owner, either during the term of this Agreement or thereafter. All records and data shall be returned to the Owner upon termination.");
  p("", false, 0.8);
  section("16. Return of Property");
  p("Upon termination of this Agreement, the Manager shall promptly return to the Owner all materials, documentation, keys, and property relating to the management of the Property.");
  p("", false, 0.8);
  section("17. Notices");
  p("All notices shall be in writing and deemed effective upon delivery by personal service, certified mail, or courier to the address of each party stated herein, or to such other address as may be designated in writing.");
  p(`Owner Address (stated herein): ${u(v.ownerAddress, 24)}`);
  p(`Manager Address (stated herein): ${u(v.managerAddress, 24)}`);
  if ((v.noticeAddressOwner || "").trim()) p(`Owner Notice Address: ${v.noticeAddressOwner}`);
  if ((v.noticeAddressManager || "").trim()) p(`Manager Notice Address: ${v.noticeAddressManager}`);
  p("", false, 0.8);
  section("18. Entire Agreement");
  p("This Agreement represents the entire understanding between the Parties and supersedes all prior or contemporaneous agreements. No oral representations or warranties shall be binding unless reduced to writing and signed by both Parties.");
  p("", false, 0.8);
  section("19. Amendment");
  p("This Agreement may only be modified by a written instrument executed by both Parties.");
  p("", false, 0.8);
  section("20. Severability");
  p("If any provision is deemed invalid or unenforceable, the remainder of this Agreement shall remain in full force and effect.");
  p("", false, 0.8);
  section("21. Waiver");
  p("The failure of either party to enforce any provision shall not be construed as a waiver of future enforcement of that provision or any other provision.");

  sectionBreak(95);
  section("22. Governing Law");
  p(`This Agreement shall be governed and interpreted in accordance with the laws of the State of ${u(v.governingState, 12)}.`);
  p("", false, 0.8);
  section("23. Signatures");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  p("OWNER:", true, 1.0);
  p(`Signature: ${u(v.ownerSignatureText, 20)}`);
  p(`Name: ${u(v.ownerSigner || v.ownerName, 20)}`);
  p(`Date: ${u(v.ownerSignDate, 12)}`);
  p("MANAGER:", true, 1.0);
  p(`Signature: ${u(v.managerSignatureText, 20)}`);
  p(`Name: ${u(v.managerSigner || v.managerName, 20)}`);
  p(`Date: ${u(v.managerSignDate, 12)}`);
  if ((v.signaturePageNote || "").trim()) p(v.signaturePageNote);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`);

  doc.save("property_manager_agreement.pdf");
};

export default function PropertyManagerAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Property Manager Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="propertymanageragreement"
      preserveStepLayout
    />
  );
}
