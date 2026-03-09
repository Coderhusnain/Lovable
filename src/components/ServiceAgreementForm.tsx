import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "providerName", label: "Service provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service provider address", type: "text", required: true },
      { name: "background", label: "Service provider background", type: "text", required: false },
    ],
  },
  {
    label: "Service and Financial Terms",
    fields: [
      { name: "serviceStartDate", label: "Service start date", type: "date", required: false },
      { name: "descriptionOfServices", label: "Description of services", type: "textarea", required: true },
      { name: "commissionMeans", label: "Means of commission payment", type: "text", required: false },
      { name: "commissionBasis", label: "Basis of commission", type: "text", required: false },
      { name: "travelExpenses", label: "Travel expense details", type: "text", required: false },
      { name: "otherExpenses", label: "Other reimbursable expenses", type: "text", required: false },
      { name: "supportServices", label: "Other support services", type: "text", required: false },
      { name: "terminationDate", label: "Termination date", type: "date", required: false },
      { name: "noticeDays", label: "Termination notice days", type: "text", required: false },
      { name: "termLength", label: "Term length for renewal", type: "text", required: false },
      { name: "conflictDescription", label: "Conflict disclosure scope", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/commonwealth", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignerName", label: "Client signer name", type: "text", required: false },
      { name: "clientSignerDesignation", label: "Client signer designation", type: "text", required: false },
      { name: "clientSignerDate", label: "Client sign date", type: "date", required: false },
      { name: "providerSignerName", label: "Service provider signer name", type: "text", required: false },
      { name: "providerSignerDesignation", label: "Service provider signer designation", type: "text", required: false },
      { name: "providerSignerDate", label: "Service provider sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 18) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "SERVICE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Service Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}.`);
  p(`By and Between ${u(values.clientName, 18)}, having its principal place of business at ${u(values.clientAddress, 18)} (hereinafter referred to as the "Client"), and ${u(values.providerName, 18)}, having its principal place of business at ${u(values.providerAddress, 18)} (hereinafter referred to as the "Service Provider"). The Client and the Service Provider may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`);
  p(`WHEREAS, the Service Provider possesses the requisite background, experience, skill, and expertise in ${u(values.background, 14)};`);
  p("AND WHEREAS, the Client desires to engage the Service Provider to provide certain professional services, and the Service Provider is willing to render such services under the terms and conditions set forth herein;");
  p("NOW, THEREFORE, in consideration of the mutual covenants and undertakings contained herein, the Parties hereby agree as follows:", false, 3);

  p("1. DESCRIPTION OF SERVICES", true);
  p("1.1 Scope of Services", true);
  p(`Commencing on ${u(values.serviceStartDate, 12)}, the Service Provider shall provide the following services (collectively, the "Services") to the Client as detailed in the attached proposal and/or Schedule A, which forms an integral part of this Agreement: ${u(values.descriptionOfServices, 24)}.`);
  p("1.2 Performance of Services", true);
  p("The manner, method, and timing of performance of the Services, including working hours and modes of execution, shall be determined by the Service Provider, subject to the reasonable expectations and objectives of the Client. The Service Provider undertakes to devote such time, attention, and effort as may be reasonably necessary to fulfill its obligations in a professional and diligent manner.");

  p("2. COMPENSATION AND COMMISSION", true);
  p("2.1 Commission Payments", true);
  p(`In addition to any fixed or agreed remuneration, the Client shall pay commission to the Service Provider by ${u(values.commissionMeans, 16)}, calculated on the basis of ${u(values.commissionBasis, 16)}, as mutually agreed for the purposes of this Agreement.`);
  p("2.2 Expense Reimbursement", true);
  p("The Service Provider shall bear its own general out-of-pocket expenses unless otherwise agreed. The Client shall reimburse the Service Provider for the following approved expenses upon submission of reasonable proof:");
  p(`- Travel expenses: ${u(values.travelExpenses, 16)}`);
  p(`- Other expenses: ${u(values.otherExpenses, 16)}`);

  p("3. SUPPORT SERVICES", true);
  p("The Client shall provide the following support services to facilitate the performance of the Services, where applicable:");
  p("- Office space");
  p("- Staff and secretarial assistance");
  p("- Office supplies");
  p(`- Other support services: ${u(values.supportServices, 14)}`);

  p("4. TERM AND TERMINATION", true);
  p(`This Agreement shall remain in force until the completion of the Services or until ${u(values.terminationDate, 12)}, whichever occurs first.`);
  p(`It may be terminated by either Party by providing ${u(values.noticeDays, 6)} days' prior written notice.`);
  p(`Upon expiry of the agreed term of ${u(values.termLength, 10)}, the term may renew for successive periods of the same duration unless terminated by written notice prior to expiry.`);

  p("5. RELATIONSHIP OF PARTIES", true);
  p("The Service Provider shall perform the Services as an independent contractor. Nothing contained herein shall be deemed to create an employer-employee, agency, partnership, or joint venture relationship between the Parties. The Service Provider shall not be entitled to any employee benefits, including but not limited to health insurance or paid leave.");
  p("6. DISCLOSURE OF CONFLICTS", true);
  p(`The Service Provider shall promptly disclose any outside activity, interest, or participation that conflicts or may reasonably be deemed to conflict with the Client's best interests, particularly those relating to: ${u(values.conflictDescription, 14)}.`);
  p("7. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other Party against any claims, losses, damages, costs, and expenses, including legal fees, arising out of the negligent acts, omissions, or misconduct of the indemnifying Party or its employees, agents, or representatives.");
  p("8. EMPLOYEES", true);
  p("Any employees or personnel engaged by the Service Provider to perform Services under this Agreement shall be bound by its provisions. Upon request, the Service Provider shall provide satisfactory evidence regarding the employment status of such individuals.");
  p("9. INTELLECTUAL PROPERTY RIGHTS", true);
  p("Any intellectual property created in the course of providing the Services shall vest in the Client unless otherwise agreed. Any pre-existing intellectual property of the Service Provider listed in Exhibit A shall remain the exclusive property of the Service Provider.");
  p("10. OWNERSHIP OF SOCIAL MEDIA CONTACTS", true);
  p("All social media contacts, followers, and digital assets created or acquired while performing Services for the Client shall remain the exclusive property of the Client.");
  p("11. CONFIDENTIALITY", true);
  p("The Service Provider acknowledges that it may have access to confidential and proprietary information belonging to the Client, including but not limited to trade secrets, technical information, customer data, and business methodologies. The Service Provider shall not disclose or use such information except as necessary for the fulfillment of this Agreement.");
  p("12. RETURN OF RECORDS", true);
  p("Upon termination, the Service Provider shall immediately return all property, documents, and records belonging to the Client.");
  p("13. ASSIGNMENT", true);
  p("Neither Party may assign its rights or obligations without prior written consent, save for assignment to a successor or affiliated entity in the event of merger or sale of substantially all assets.");
  p("14. INTERRUPTION OF SERVICE (FORCE MAJEURE)", true);
  p("Either Party shall be excused from performance delays caused by events beyond reasonable control, including natural disasters, governmental actions, or labor disputes.");
  p("15. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 14)}.`);
  p("16. WAIVER", true);
  p("Failure by either Party to enforce any provision shall not constitute a waiver of future enforcement rights.");
  p("17. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.");
  p("18. AMENDMENT", true);
  p("This Agreement may only be amended by a written document signed by both Parties.");
  p("19. SEVERABILITY", true);
  p("If any provision is held invalid, the remaining provisions shall remain enforceable.");
  p("20. NOTICES", true);
  p("All notices shall be in writing and delivered to the addresses stated above.");
  p("21. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first written above.");

  p("For and on behalf of the Client:");
  uf("Name", values.clientSignerName || values.clientName, 24);
  uf("Designation", values.clientSignerDesignation, 20);
  p("Signature: ________________________");
  uf("Date", values.clientSignerDate, 14,);

  p("For and on behalf of the Service Provider:");
  uf("Name", values.providerSignerName || values.providerName, 24);
  uf("Designation", values.providerSignerDesignation, 20);
  p("Signature: ________________________");
  uf("Date", values.providerSignerDate, 14);

  doc.save("service_agreement.pdf");
};

export default function ServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="serviceagreement"
    />
  );
}