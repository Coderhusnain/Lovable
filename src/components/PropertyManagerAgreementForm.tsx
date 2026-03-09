import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Property",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: false },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: false },
      { name: "agreementYear", label: "Agreement year", type: "text", required: false },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: false },
      { name: "managerName", label: "Manager name", type: "text", required: true },
      { name: "managerAddress", label: "Manager address", type: "text", required: false },
      { name: "propertyDescription", label: "Property address(es)/description", type: "textarea", required: true },
      { name: "startDate", label: "Start date", type: "date", required: false },
      { name: "monthlyRemitDay", label: "Monthly remittance day", type: "text", required: false },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "managerPercent", label: "Manager compensation %", type: "text", required: false },
      { name: "ownerShortfallDays", label: "Owner shortfall remittance days", type: "text", required: false },
      { name: "endDate", label: "End date", type: "date", required: false },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "ownerSigner", label: "Owner signer name", type: "text", required: false },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: false },
      { name: "managerSigner", label: "Manager signer name", type: "text", required: false },
      { name: "managerSignDate", label: "Manager sign date", type: "date", required: false },
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
  const title = "PROPERTY MANAGER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Property Manager Agreement ("Agreement") is entered into and made effective as of the ${u(values.agreementDay, 2)} day of ${u(values.agreementMonth, 8)}, ${u(values.agreementYear, 4)}, by and between ${u(values.ownerName, 18)}, of ${u(values.ownerAddress, 18)} (the "Owner"), and ${u(values.managerName, 18)}, of ${u(values.managerAddress, 18)} (the "Manager"). Owner and Manager are collectively the "Parties."`);
  p("RECITALS", true);
  p("WHEREAS, Manager is experienced in operation and management of real property and has personnel/resources to manage real estate competently;");
  p("WHEREAS, Owner desires to retain Manager to provide property management services for Owner's real estate, and Manager agrees on terms herein;");
  p("NOW, THEREFORE, Parties agree as follows:");
  p("1. Description of the Property", true);
  p(`This Agreement applies to management of the following property(ies): ${u(values.propertyDescription, 24)}.`);
  p("2. Responsibilities of the Manager", true);
  p(`Manager serves as independent contractor and Owner's exclusive agent beginning ${u(values.startDate, 12)}.`);
  p("a. Collection and Disbursement of Rents: Manager collects rents, provides monthly accounting statements, and remits net income to Owner on or before the stated monthly day, subject to timely tenant rent receipt.");
  p(`Monthly remittance day: ${u(values.monthlyRemitDay, 4)}.`);
  p("b. Maintenance and Labor: Manager arranges and oversees maintenance/repairs/improvements and may hire/supervise contractors/employees as required.");
  p("c. Leasing and Legal Proceedings: Manager may advertise vacancies, screen/select tenants, set market rents, negotiate/sign/renew/terminate leases, and pursue legal actions for rent recovery or damages, including compromise/settlement where appropriate.");
  p("3. Authority Granted", true);
  p("Owner grants Manager full authority to perform acts reasonably necessary to carry out duties as if performed by Owner personally.");
  p("4. Fair Housing Compliance", true);
  p("Manager complies with all applicable federal/state/local laws including Fair Housing and shall not discriminate on protected grounds.");
  p("5. Compensation", true);
  p(`Manager is entitled to retain ${u(values.managerPercent, 4)}% of monthly gross rental collections. Additional services compensation requires written agreement. Manager may deduct actual out-of-pocket expenses and provide itemized monthly statements. If collections are insufficient, Owner shall remit shortfall within ${u(values.ownerShortfallDays, 4)} days of written notice.`);
  p("6. Independent Contractor | 7. Standard of Performance", true);
  p("Manager is an independent contractor and responsible for taxes/benefits/statutory obligations. Manager shall perform with reasonable diligence and accepted industry standards.");
  p("8. Term and Termination", true);
  p(`Agreement terminates automatically on ${u(values.endDate, 12)} unless earlier terminated by either Party with at least ${u(values.terminationNoticeDays, 4)} days' written notice. Either Party may terminate without cause if notice is properly given.`);
  p("9. Indemnification", true);
  p("Manager indemnifies, defends, and holds harmless Owner from claims/liabilities/damages/losses/expenses (including reasonable attorney's fees) arising from negligent or willful acts/omissions of Manager and its representatives.");
  p("10. Insurance", true);
  p("Manager maintains General Liability and Errors & Omissions insurance and provides proof upon request. Owner includes Manager as additional insured under Owner's Public Liability policy.");
  p("11. Default", true);
  p("Material default includes payment failure, bankruptcy/insolvency, seizure/assignment of property, or failure to perform timely/properly.");
  p("12. Remedies for Default", true);
  p(`Upon default, non-defaulting Party may terminate on ${u(values.defaultCureDays, 4)} days' written notice if breach is not cured during notice period. Notice must reasonably describe breach.`);
  p("13. Force Majeure | 14. Dispute Resolution", true);
  p("Neither Party liable for delay/failure caused by events beyond reasonable control. Parties first attempt informal negotiation, then mediation; if unresolved, legal remedies may be pursued.");
  p("15. Confidentiality | 16. Return of Property | 17. Notices | 18. Entire Agreement | 19. Amendment | 20. Severability | 21. Waiver | 22. Governing Law", true);
  p(`Manager shall keep Owner information confidential and return all records/materials/keys upon termination. Notices are in writing by personal service/certified mail/courier. Entire agreement and written amendment clauses apply. Governing law: State of ${u(values.governingState, 14)}.`, false, 3);
  p("23. Signatures", true);
  p("OWNER:");
  p("Signature: ___________________________");
  uf("Name", values.ownerSigner || values.ownerName, 24);
  uf("Date", values.ownerSignDate, 24, 2.5);
  p("MANAGER:");
  p("Signature: ___________________________");
  uf("Name", values.managerSigner || values.managerName, 24);
  uf("Date", values.managerSignDate, 24);

  doc.save("property_manager_agreement.pdf");
};

export default function PropertyManagerAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Property Manager Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="propertymanageragreement"
    />
  );
}
