import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Services",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "consultantName", label: "Consultant name", type: "text", required: true },
      { name: "consultantStatus", label: "Consultant legal status", type: "text", required: false },
      { name: "consultantAddress", label: "Consultant address", type: "text", required: false },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientStatus", label: "Client legal status", type: "text", required: false },
      { name: "clientAddress", label: "Client address", type: "text", required: false },
      { name: "area", label: "Consultant expertise area", type: "text", required: false },
      { name: "serviceStartDate", label: "Service start date", type: "date", required: false },
      { name: "serviceDetails", label: "Service details", type: "textarea", required: true },
    ],
  },
  {
    label: "Priority and Financial Terms",
    fields: [
      { name: "changeOrderDetails", label: "Change order details", type: "text", required: false },
      { name: "consultancyFee", label: "Consultancy fee (USD)", type: "text", required: false },
      { name: "terminationNoticeDays", label: "Early termination notice days", type: "text", required: false },
      { name: "nonRenewalNoticeDays", label: "Non-renewal notice days", type: "text", required: false },
      { name: "developedIpOwnership", label: "Developed IP ownership agreement", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignerName", label: "Client signer name", type: "text", required: false },
      { name: "clientSignerDesignation", label: "Client signer designation", type: "text", required: false },
      { name: "clientSignerDate", label: "Client sign date", type: "date", required: false },
      { name: "consultantSignerName", label: "Consultant signer name", type: "text", required: false },
      { name: "consultantSignerDesignation", label: "Consultant signer designation", type: "text", required: false },
      { name: "consultantSignerDate", label: "Consultant sign date", type: "date", required: false },
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
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const title = "TECHNICAL CONSULTING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Technical Consulting Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} ("Effective Date"), by and between ${u(values.consultantName, 12)}, a ${u(values.consultantStatus, 10)} having its principal place of business at ${u(values.consultantAddress, 14)} ("Consultant"), and ${u(values.clientName, 12)}, a ${u(values.clientStatus, 10)} having its principal place of business at ${u(values.clientAddress, 14)} ("Client").`);
  p("Consultant and Client are hereinafter collectively referred to as the 'Parties' and individually as a 'Party.'", false, 3);

  p("1. Scope of Services", true);
  p("1.1 Background and Expertise", true);
  p(`The Consultant represents that it possesses requisite technical knowledge, qualifications, and experience in ${u(values.area, 10)}, and shall provide professional consulting services based upon such expertise.`);
  p("1.2 Description of Services", true);
  p(`Commencing on ${u(values.serviceStartDate, 12)}, the Consultant shall provide technical consulting services relating to implementation, operation, support, and/or use of supported software, including but not limited to: ${u(values.serviceDetails, 20)} (collectively, the "Services").`);
  p("1.3 Performance of Services", true);
  p("The manner, method, and working hours of the Services shall be determined by the Consultant. The Client acknowledges that the Consultant will devote such time and effort as reasonably necessary to perform the Services.");

  p("2. Priority of Requests", true);
  p("2.1 Priority Level 1 - Normal Requests: Consultant shall provide an initial response within twenty-four (24) hours of receipt.");
  p("2.2 Priority Level 2 - Urgent Requests: Consultant shall provide an initial response within twelve (12) hours on business days (Monday-Friday) and within twenty-four (24) hours on weekends (Saturday-Sunday).");

  p("3. Financial Terms", true);
  p("3.1 Change Orders", true);
  p(`Any modification to scope shall be documented in a written Change Order signed and dated by both Parties, specifying changes and fee adjustments: ${u(values.changeOrderDetails, 14)}.`);
  p("3.2 Consultancy Fee", true);
  p(`Client shall pay Consultant a fee of USD ${u(values.consultancyFee, 8)}, payable in a lump sum upon completion of Services unless otherwise agreed in writing.`);
  p("3.3 Expenses", true);
  p("Consultant shall bear all out-of-pocket expenses and shall not be entitled to reimbursement from Client.");

  p("4. Term and Termination", true);
  p("4.1 Term: This Agreement commences on Effective Date and continues until completion of Services, unless terminated earlier.");
  p("4.2 Early Termination", true);
  p(`Either Party may terminate with or without cause by providing ${u(values.terminationNoticeDays, 6)} days' prior written notice. Consultant is entitled to pro-rata payment for Services rendered up to termination.`);
  p("4.3 Prevention of Automatic Renewal", true);
  p(`To prevent automatic renewal, either Party must provide notice of non-renewal at least ${u(values.nonRenewalNoticeDays, 6)} days prior to expiration.`);

  p("5. Indemnification and Warranties", true);
  p("5.1 Indemnification: Consultant shall indemnify, defend, and hold harmless Client from claims, damages, liabilities, costs, and expenses (including reasonable attorney's fees) arising from negligent acts, omissions, or breaches by Consultant.");
  p("5.2 Client Data Responsibility: Client is solely responsible for secure, current, and restorable backups.");
  p("5.3 Disclaimer of Warranties: Consultant disclaims all express or implied warranties, including merchantability, fitness, non-infringement, uninterrupted service, or error-free programming.");

  p("6. Intellectual Property Rights", true);
  p("6.1 Pre-Existing IP: Consultant retains all rights in Exhibit A pre-existing IP.");
  p(`6.2 Developed IP: Enhancements/modifications/new IP created in Services shall be owned as agreed in writing: ${u(values.developedIpOwnership, 12)}.`);
  p("7. Relationship of the Parties", true);
  p("Consultant is an independent contractor. No partnership, joint venture, agency, or employment relationship is created.");
  p("8. Assignment", true);
  p("Consultant shall not assign or transfer rights/obligations without prior written consent of Client.");
  p("9. Confidentiality", true);
  p("Consultant shall not use, disclose, or communicate Client confidential information to third parties without prior written consent; this survives termination.");
  p("10. Force Majeure", true);
  p("Neither Party is liable for failure/delay caused by events beyond reasonable control, including acts of God, war, riots, epidemics, pandemics, government orders, or natural disasters. Financial inability is not force majeure.");
  p("11. Governing Law", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}.`);
  p("12. Entire Agreement", true);
  p("This Agreement constitutes the entire understanding and supersedes all prior oral or written agreements.");
  p("13. Amendment", true);
  p("This Agreement may only be modified, amended, or supplemented in writing signed by both Parties.");
  p("14. Severability", true);
  p("If any provision is held invalid, illegal, or unenforceable, remaining provisions continue in full force and effect.");
  p("15. Waiver", true);
  p("Failure to enforce any provision is not a waiver of future enforcement.");
  p("16. Signatories", true);
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement through duly authorized representatives as of the Effective Date.");

  p("For and on behalf of the Client:");
  uf("Name", values.clientSignerName || values.clientName, 24);
  uf("Designation", values.clientSignerDesignation, 20);
  p("Signature: _______________________");
  uf("Date", values.clientSignerDate, 14);
  p("For and on behalf of the Consultant:");
  uf("Name", values.consultantSignerName || values.consultantName, 24);
  uf("Designation", values.consultantSignerDesignation, 20);
  p("Signature: _______________________");
  uf("Date", values.consultantSignerDate, 14);

  doc.save("technical_consulting_agreement.pdf");
};

export default function ConsultingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Consulting Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="consultingagreement"
    />
  );
}
