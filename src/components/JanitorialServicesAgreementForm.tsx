import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Dates",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client / Service Recipient", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "contractorName", label: "Contractor", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor address", type: "text", required: true },
      { name: "startDate", label: "Service start date", type: "date", required: false },
      { name: "terminationDate", label: "Termination date", type: "date", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "routineTimes", label: "Routine services frequency", type: "text", required: false },
      { name: "amount", label: "Compensation amount (USD)", type: "text", required: false },
      { name: "cureDays", label: "Default cure period days", type: "text", required: false },
      { name: "clientSigner", label: "Client signatory name", type: "text", required: false },
      { name: "clientTitle", label: "Client signatory title", type: "text", required: false },
      { name: "clientSignDate", label: "Client signature date", type: "date", required: false },
      { name: "contractorSigner", label: "Contractor signatory name", type: "text", required: false },
      { name: "contractorTitle", label: "Contractor signatory title", type: "text", required: false },
      { name: "contractorSignDate", label: "Contractor signature date", type: "date", required: false },
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

  const u = (value?: string, min = 18) => (value || "").trim() || "_".repeat(min);
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
  const title = "JANITORIAL SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Janitorial Services Agreement (the "Agreement") is entered into and made effective as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.clientName, 22)}, having a place of business at ${u(values.clientAddress, 22)} (the "Client"), and ${u(values.contractorName, 22)}, having a place of business at ${u(values.contractorAddress, 22)} (the "Contractor"). The Client and the Contractor may be referred to individually as a "Party" and collectively as the "Parties."`);
  p("1. Description of Services", true);
  p(`1.1 Beginning on ${u(values.startDate, 12)}, the Contractor shall provide professional janitorial and cleaning services at the Client's premises.`);
  p(`1.2 Services include routine services (${u(values.routineTimes, 10)} times per week): cleaning front door glass/thresholds; sweeping and dust mopping floors; sweeping halls and stairways; vacuuming carpets/rugs with spot cleaning; emptying/cleaning ashtrays and waste containers; dusting furniture/telephones/ledges/woodwork; removing fingerprints from doors/partitions/walls; scrubbing/disinfecting restroom floors and fixtures; replacing restroom supplies; dusting light fixtures; maintaining janitorial room. Monthly services include floor cleaning/waxing and exterior window cleaning.`);
  p("2. Materials and Supplies", true);
  p("Contractor provides all cleaning materials/equipment/tools except consumables (soap, paper towels, tissue, seat covers, similar supplies). Client supplies consumables and maintains adequate stock.");
  p("3. Supervision", true);
  p("Contractor shall conduct systematic inspections and promptly remedy Client-reported complaints/deficiencies.");
  p("4. Payment Terms", true);
  p(`Client shall pay Contractor US $${u(values.amount, 10)} upon completion of services unless otherwise agreed in writing. Compensation tracks prevailing union wage scale and is adjusted for increases/decreases.`);
  p("5. Term", true);
  p(`Agreement commences on Effective Date and automatically terminates on ${u(values.terminationDate, 12)} unless earlier terminated or extended in writing.`);
  p("6. Compliance with Laws", true);
  p("Contractor shall comply with applicable federal, state, county, and municipal laws, statutes, ordinances, regulations, and codes.");
  p("7. Insurance", true);
  p("Contractor shall maintain workers' compensation insurance and furnish evidence of coverage upon request.");
  p("8. Confidentiality", true);
  p("Contractor and its personnel shall not disclose or use Client confidential/proprietary information during or after the term; obligations survive termination.");
  p("9. Indemnification", true);
  p("Contractor shall indemnify, defend, and hold harmless Client from claims/losses/damages/liabilities/expenses, including reasonable attorneys' fees, arising from acts/omissions/negligence of Contractor or its representatives.");
  p("10. Warranty of Services", true);
  p("Contractor warrants services are diligent, timely, workmanlike, and consistent with accepted industry standards and equal/superior to similar providers in the community.");
  p("11. Default", true);
  p("Default includes non-payment, insolvency/bankruptcy, levy/seizure/sale by creditors/governmental authorities, or failure by Contractor to perform in required time/manner/quality.");
  p("12. Remedies", true);
  p(`On default, non-defaulting Party may terminate by written notice. Defaulting Party has ${u(values.cureDays, 8)} days from receipt to cure. If uncured, Agreement automatically terminates without further notice.`);
  p("13. Force Majeure", true);
  p("Neither Party is liable for non-performance caused by events beyond reasonable control including acts of God, pandemics, epidemics, natural disasters, strikes, riots, vandalism, governmental restrictions, public health crises, or war. Obligations are suspended during the force majeure event.");
  p("14. Dispute Resolution", true);
  p("Parties shall first engage in good-faith negotiations; unresolved disputes proceed to mediation (ADR), and if mediation fails, either Party may seek legal or equitable remedies in a court of competent jurisdiction.");
  p("15. Entire Agreement | 16. Severability | 17. Amendment | 18. Governing Law | 19. Notices | 20. Waiver of Contractual Rights", true);
  p(`This Agreement is the complete understanding between Parties. Invalid provisions are severed or limited as needed. Amendments must be in writing signed by both Parties. Governing law: State of ${u(values.governingState, 14)}. Notices are by personal delivery or certified mail. Failure to enforce is not waiver.`, false, 3);
  p("21. Execution and Signatures", true);
  p("SERVICE RECIPIENT (Client):");
  p("By: ___________________________");
  uf("Name", values.clientSigner, 24);
  uf("Title (if applicable)", values.clientTitle, 24);
  uf("Date", values.clientSignDate, 24, 2.6);
  p("SERVICE PROVIDER (Contractor):");
  p("By: ___________________________");
  uf("Name", values.contractorSigner, 24);
  uf("Title (if applicable)", values.contractorTitle, 24);
  uf("Date", values.contractorSignDate, 24);

  doc.save("janitorial_services_agreement.pdf");
};

export default function JanitorialServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Janitorial Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="janitorialservicesagreement"
    />
  );
}
