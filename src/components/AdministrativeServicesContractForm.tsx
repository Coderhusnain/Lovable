import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name", type: "text", required: true },
      { name: "recipientCity", label: "Recipient city", type: "text", required: false },
      { name: "recipientState", label: "Recipient state", type: "text", required: false },
      { name: "recipientZip", label: "Recipient ZIP", type: "text", required: false },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerCity", label: "Service Provider city", type: "text", required: false },
      { name: "providerState", label: "Service Provider state", type: "text", required: false },
      { name: "providerZip", label: "Service Provider ZIP", type: "text", required: false },
    ],
  },
  {
    label: "Services Description",
    fields: [
      { name: "serviceStartDate", label: "Services start date (clause 1)", type: "date", required: false },
      { name: "servicesDescription", label: "Services description (clause 1 — list all services)", type: "textarea", required: true },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      { name: "standardRate", label: "Standard hourly rate $ (clause 3)", type: "text", required: false },
      { name: "additionalRate", label: "Additional services hourly rate $ (clause 3)", type: "text", required: false },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      { name: "terminationDate", label: "Termination date (clause 4)", type: "date", required: false },
      { name: "earlyTerminationDays", label: "Early termination notice days (clause 5.1)", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days (clause 5.2 & clause 11)", type: "text", required: false },
    ],
  },
  {
    label: "Dispute & Governing Law",
    fields: [
      { name: "governingLaw", label: "Governing law (clause 22)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSign", label: "Recipient — signature / name", type: "text", required: false },
      { name: "recipientDate", label: "Recipient — date", type: "date", required: false },
      { name: "providerSign", label: "Service Provider — signature / name", type: "text", required: false },
      { name: "providerDate", label: "Service Provider — date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => { if (y + needed > limit) { doc.addPage(); y = 20; } };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    y += 1;
    checkBreak(lh + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
  };

  const lettered = (letter: string, text: string) => {
    const full = `(${letter})\t${text}`;
    const lines = doc.splitTextToSize(full, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 5, y);
    y += lines.length * lh + 2;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const sub = (num: string, text: string) => {
    const full = `${num}  ${text}`;
    const lines = doc.splitTextToSize(full, tw);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "ADMINISTRATIVE SERVICES CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  const recipientAddr = [values.recipientCity, values.recipientState, values.recipientZip].filter(Boolean).join(", ");
  const providerAddr = [values.providerCity, values.providerState, values.providerZip].filter(Boolean).join(", ");
  p(`This Administrative Services Contract (\u201cContract\u201d) is made effective as of ${u(values.effectiveDate, 12)} (\u201cEffective Date\u201d), by and between:`);
  p(`Recipient:   ${u(values.recipientName, 16)} of ${recipientAddr || u("", 14)}`);
  p("And");
  p(`Service Provider: ${u(values.providerName, 16)} of ${providerAddr || u("", 14)}`);
  p('Collectively, the Recipient and the Service Provider may be referred to as the "Parties" and individually as a "Party."');
  y += 1;

  // ── 1. DESCRIPTION OF SERVICES ─────────────────────────────────────────
  heading("1. DESCRIPTION OF SERVICES");
  p(`Beginning on ${u(values.serviceStartDate, 12)}, the Service Provider shall provide administrative support and related services to the Recipient. These services shall include, but are not limited to, the following (collectively, the \u201cServices\u201d):`);
  // Render services as lines
  const serviceLines = (values.servicesDescription || "").split("\n").filter(s => s.trim());
  if (serviceLines.length > 0) {
    for (const line of serviceLines) {
      bullet(line.trim());
    }
  } else {
    p(u(values.servicesDescription, 20));
  }
  p("The Service Provider shall perform the Services professionally, promptly, and in accordance with industry standards applicable to administrative and support services.");

  // ── 2. MUTUAL OBLIGATIONS OF THE PARTIES ──────────────────────────────
  heading("2. MUTUAL OBLIGATIONS OF THE PARTIES");
  p("Both Parties agree to take all steps reasonably necessary to fulfill their obligations under this Contract, including:");
  lettered("a", "Designating key individuals to coordinate, manage, and perform their respective responsibilities.");
  lettered("b", "Conducting periodic meetings between such key individuals as may be reasonably required.");
  lettered("c", "Cooperating fully with all reasonable requests for assistance and information.");
  lettered("d", "Executing all documents and taking any additional actions reasonably necessary to carry out the terms of this Contract.");
  p("Each Party further agrees to use its best efforts to resolve any issues arising in connection with the Services in a constructive and timely manner.");

  // ── 3. PAYMENT TERMS ──────────────────────────────────────────────────
  heading("3. PAYMENT TERMS");
  p("In consideration of the Services performed, the Recipient agrees to compensate the Service Provider as follows:");
  p("Standard Fees", true);
  bullet(`The Service Provider\u2019s fees for the Services described above shall be charged at the rate of $${u(values.standardRate, 6)} per hour.`);
  p("Additional Services", true);
  bullet(`Any services not specifically listed in the Description of Services shall be billed at the Service Provider\u2019s standard hourly rate of $${u(values.additionalRate, 6)} per hour.`);
  p("Invoices shall be payable in accordance with the billing schedule agreed upon by the Parties.");

  // ── 4. TERM OF CONTRACT ───────────────────────────────────────────────
  heading("4. TERM OF CONTRACT");
  p(`This Contract shall commence on the Effective Date and shall remain in effect until ${u(values.terminationDate, 12)} (\u201cTermination Date\u201d), unless terminated earlier as provided herein.`);
  p("The Termination Date may be altered only with the mutual written consent of both Parties.");

  // ── 5. TERMINATION ────────────────────────────────────────────────────
  heading("5. TERMINATION");
  sub("5.1", "Termination Without Cause (Early Termination)");
  p(`Either Party may terminate this Contract with or without cause upon ${u(values.earlyTerminationDays, 4)} days\u2019 written notice to the other Party (\u201cEarly Termination\u201d).`);
  p("Upon Early Termination:");
  bullet("The Service Provider shall be compensated on a pro-rated basis for Services performed up to the effective date of termination.");
  sub("5.2", "Termination for Default");
  p("A Party may terminate this Contract upon the occurrence of a material default, including but not limited to:");
  lettered("a", "Failure to make required payments when due;");
  lettered("b", "Insolvency or bankruptcy of either Party;");
  lettered("c", "Any seizure, levy, assignment for benefit of creditors, or similar action involving a Party\u2019s property;");
  lettered("d", "Failure to provide or make available the Services in the time and manner required.");
  p(`The non-defaulting Party must provide written notice describing the default. The defaulting Party shall have ${u(values.defaultCureDays, 4)} days to cure the default. Failure to cure results in automatic termination, unless waived.`);

  // ── 6. RELATIONSHIP OF THE PARTIES ────────────────────────────────────
  heading("6. RELATIONSHIP OF THE PARTIES");
  p("The Parties understand and agree that:");
  bullet("The Service Provider is acting as an independent contractor, not an employee;");
  bullet("The Recipient shall not provide employee benefits, including health insurance, paid leave, or retirement benefits;");
  bullet("The Service Provider is solely responsible for payroll taxes, insurance, and compliance with applicable employment laws for its personnel.");
  p("Nothing in this Contract shall be construed to create a partnership, joint venture, or employer\u2013employee relationship.");

  // ── 7. WORK PRODUCT OWNERSHIP ─────────────────────────────────────────
  heading("7. WORK PRODUCT OWNERSHIP");
  p('All copyrightable works, inventions, ideas, discoveries, improvements, or other materials ("Work Product") created by the Service Provider, whether wholly or partially, in connection with the Services shall be the exclusive property of the Recipient.');
  p("The Service Provider shall execute any documents reasonably necessary to confirm or perfect the Recipient\u2019s ownership rights.");

  // ── 8. CONFIDENTIALITY ────────────────────────────────────────────────
  heading("8. CONFIDENTIALITY");
  p("The Service Provider shall not, directly or indirectly:");
  bullet("Use for personal benefit,");
  bullet("Disclose,");
  bullet("Communicate,");
  bullet("Or otherwise reveal");
  p("any proprietary or confidential information belonging to the Recipient.");
  p("The Service Provider shall treat all such information as strictly confidential and shall take reasonable precautions to prevent unauthorized disclosure.");
  p("This confidentiality obligation:");
  bullet("Survives termination of the Contract, and");
  bullet("Applies to all forms of information (written, oral, digital, etc.).");
  p("Upon termination, the Service Provider shall return all documents, records, and materials belonging to the Recipient.");

  // ── 9. INJURIES AND INSURANCE ─────────────────────────────────────────
  heading("9. INJURIES AND INSURANCE");
  p("The Service Provider acknowledges:");
  bullet("It is responsible for obtaining appropriate insurance for itself and its employees (if any);");
  bullet("It waives any right to recover from the Recipient for injuries sustained while performing Services that arise from Service Provider\u2019s own negligence.");

  // ── 10. INDEMNIFICATION ───────────────────────────────────────────────
  heading("10. INDEMNIFICATION");
  p("The Service Provider agrees to indemnify and hold harmless the Recipient from all claims, losses, liabilities, damages, costs, judgments, and attorney fees arising from:");
  bullet("The acts or omissions of the Service Provider,");
  bullet("Its employees,");
  bullet("Agents, or representatives.");
  p("This indemnification obligation survives termination of the Contract.");

  // ── 11. REMEDIES ──────────────────────────────────────────────────────
  heading("11. REMEDIES");
  p("In addition to any legal remedies available:");
  bullet("If a Party fails to substantially perform any term of this Contract, the other Party may terminate the Contract by written notice.");
  bullet("Written notice must specify the nature of the default.");
  bullet(`The defaulting Party has ${u(values.defaultCureDays, 4)} days to cure the default.`);
  bullet("Failure to cure results in automatic termination, unless waived.");

  // ── 12. FORCE MAJEURE ─────────────────────────────────────────────────
  heading("12. FORCE MAJEURE");
  p('A Party shall not be liable for failing to perform obligations if performance is prevented or hindered by events beyond its reasonable control ("Force Majeure"), including:');
  bullet("Acts of God");
  bullet("Plagues, epidemics, pandemics");
  bullet("Quarantines or public health restrictions");
  bullet("Fire, explosion, vandalism, storms");
  bullet("Acts of civil or military authorities");
  bullet("National emergencies, riots, wars");
  bullet("Strikes, lockouts, work stoppages");
  p("The affected Party must give prompt written notice and shall resume performance once conditions permit.");

  // ── 13. ARBITRATION ───────────────────────────────────────────────────
  heading("13. ARBITRATION");
  p("All disputes arising out of or relating to this Contract shall be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association.");
  p("Key arbitration terms:");
  bullet("A single mutually acceptable arbitrator shall be selected;");
  bullet("If the Parties cannot agree, each Party shall select one arbitrator, and those two shall select a third;");
  bullet("Arbitration shall occur at a mutually agreed location;");
  bullet("All relevant documents must be exchanged within 30 days;");
  bullet("Arbitrators may issue mandatory and restraining orders;");
  bullet("Arbitrators may not award punitive damages or modify Contract terms;");
  bullet("Arbitration decisions are final and binding, and judgment may be entered in any court of competent jurisdiction.");
  p("The Parties shall continue performing their respective obligations during arbitration.");

  // ── 14. ATTORNEYS' FEES ───────────────────────────────────────────────
  heading("14. ATTORNEYS\u2019 FEES");
  p("If any legal action or arbitration is initiated to enforce or interpret this Contract, the prevailing party shall be entitled to recover reasonable attorneys\u2019 fees and all associated costs.");

  // ── 15. LIMITATION OF LIABILITY ───────────────────────────────────────
  heading("15. LIMITATION OF LIABILITY");
  p("Neither Party shall be liable for any:");
  bullet("Indirect");
  bullet("Incidental");
  bullet("Consequential");
  bullet("Special");
  bullet("Exemplary");
  p("damages, including loss of profits, delays, or third-party claims, even if advised of their possibility.");

  // ── 16. ENTIRE CONTRACT ───────────────────────────────────────────────
  heading("16. ENTIRE CONTRACT");
  p("This Contract constitutes the entire agreement between the Parties and supersedes all prior or contemporaneous agreements, representations, or understandings, whether oral or written.");
  p("No other promises, warranties, or conditions exist except those expressly stated herein.");

  // ── 17. SEVERABILITY ──────────────────────────────────────────────────
  heading("17. SEVERABILITY");
  p("If any provision of this Contract is held invalid or unenforceable, the remaining provisions shall continue in full force and effect. If limiting the provision would render it valid, it shall be deemed written and enforced with such limitation.");

  // ── 18. NOTICE ────────────────────────────────────────────────────────
  heading("18. NOTICE");
  p("Notices shall be delivered:");
  bullet("In person; or");
  bullet("By certified mail, return receipt requested");
  p("to the addresses listed at the beginning of this Contract or to any other address designated in writing.");

  // ── 19. WAIVER ────────────────────────────────────────────────────────
  heading("19. WAIVER");
  p("A Party\u2019s failure to enforce any provision shall not constitute a waiver of future enforcement. All waivers must be in writing and signed by the waiving Party.");

  // ── 20. ASSIGNMENT ────────────────────────────────────────────────────
  heading("20. ASSIGNMENT");
  p("Neither Party may assign or transfer this Contract without the prior written consent of the other Party. Any assignment without consent is void.");

  // ── 21. AMENDMENT ────────────────────────────────────────────────────
  heading("21. AMENDMENT");
  p("This Contract may only be amended in a written document signed by both Parties.");

  // ── 22. GOVERNING LAW ─────────────────────────────────────────────────
  heading("22. GOVERNING LAW");
  p(`This Contract shall be governed by and interpreted in accordance with the laws of ${u(values.governingLaw, 14)}.`);

  // ── 23. SIGNATORIES ───────────────────────────────────────────────────
  heading("23. SIGNATORIES");
  p("This Contract is signed by the Parties as of the Effective Date.");
  y += 4;

  // Signature lines matching draft format
  const recipientSig = (values.recipientSign || "").trim();
  const providerSig = (values.providerSign || "").trim();
  const recipientD = (values.recipientDate || "").trim();
  const providerD = (values.providerDate || "").trim();

  checkBreak(30);
  p("Recipient:", true, 1);
  doc.setFont("helvetica", "normal");
  const rSigText = recipientSig || "__________________________";
  doc.text(rSigText, m, y);
  doc.setLineWidth(0.22);
  doc.line(m, y + 1.1, m + Math.max(40, doc.getTextWidth(rSigText)), y + 1.1);
  y += lh + 1;
  const rDateLabel = "Date: ";
  doc.text(rDateLabel, m, y);
  const rdx = m + doc.getTextWidth(rDateLabel);
  const rdText = recipientD || "__________";
  doc.text(rdText, rdx, y);
  doc.line(rdx, y + 1.1, rdx + Math.max(20, doc.getTextWidth(rdText)), y + 1.1);
  y += lh + 4;

  checkBreak(25);
  p("Service Provider:", true, 1);
  doc.setFont("helvetica", "normal");
  const pSigText = providerSig || "__________________________";
  doc.text(pSigText, m, y);
  doc.line(m, y + 1.1, m + Math.max(40, doc.getTextWidth(pSigText)), y + 1.1);
  y += lh + 1;
  doc.text(rDateLabel, m, y);
  const pdx = m + doc.getTextWidth(rDateLabel);
  const pdText = providerD || "__________";
  doc.text(pdText, pdx, y);
  doc.line(pdx, y + 1.1, pdx + Math.max(20, doc.getTextWidth(pdText)), y + 1.1);

  doc.save("administrative_services_contract.pdf");
};

export default function AdministrativeServicesContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Administrative Services Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="administrativeservicescontract"
    />
  );
}