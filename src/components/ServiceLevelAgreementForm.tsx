import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "serviceType", label: "Type of services", type: "text", required: true },
    ],
  },
  {
    label: "Service Levels",
    fields: [
      { name: "serviceDescription", label: "Services covered", type: "textarea", required: true },
      { name: "clientObligations", label: "Client obligations", type: "textarea", required: true },
      { name: "providerObligations", label: "Provider obligations", type: "textarea", required: true },
      { name: "specificService", label: "Specific service metric item", type: "text", required: true },
      { name: "durationPeriod", label: "Service duration/period", type: "text", required: true },
      { name: "serviceLevelStandard", label: "Minimum service level standard", type: "text", required: true },
      { name: "serviceCredit", label: "Service credit amount/formula", type: "text", required: true },
    ],
  },
  {
    label: "Response, KPI, Sign",
    fields: [
      { name: "highPriorityTime", label: "High priority response time", type: "text", required: true },
      { name: "mediumPriorityTime", label: "Medium priority response time", type: "text", required: true },
      { name: "lowPriorityTime", label: "Low priority response time", type: "text", required: true },
      { name: "kpiMeasurementPeriod", label: "KPI measurement period", type: "text", required: true },
      { name: "kpiDescription", label: "KPI metric/standard", type: "textarea", required: true },
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
      { name: "clientSignatory", label: "Client signatory name", type: "text", required: true },
      { name: "clientDesignation", label: "Client signatory title", type: "text", required: true },
      { name: "providerSignatory", label: "Provider signatory name", type: "text", required: true },
      { name: "providerDesignation", label: "Provider signatory title", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1.2;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "SERVICE LEVEL AGREEMENT (SLA)";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p("1. COMMENCEMENT AND PARTIES", true);
  p(
    `This Service Level Agreement ("Agreement") is made as of ${v.effectiveDate || "____________"} by and between ` +
      `${v.providerName || "____________"}, having principal place of business at ${v.providerAddress || "____________"} (the "Service Provider"), and ` +
      `${v.clientName || "____________"}, having principal place of business at ${v.clientAddress || "____________"} (the "Client").`,
  );
  p(
    `This Agreement governs the provision of ${v.serviceType || "____________"} and forms an integral part of the MSA together with applicable SoW. ` +
      "In case of inconsistency, MSA prevails unless expressly stated otherwise.",
  );

  p("2. SERVICES, OBLIGATIONS, AND SERVICE LEVELS", true);
  p("2.1 Services", true);
  p(`Services include, without limitation: ${v.serviceDescription || "____________"}, and any additional MSA/SoW services incorporated by reference.`);
  p("2.2 Client Obligations", true);
  p(v.clientObligations || "____________");
  p("2.3 Service Provider Obligations", true);
  p(v.providerObligations || "____________");
  p("2.4 Service Levels", true);
  p(
    `Service: ${v.specificService || "____________"} | Duration: ${v.durationPeriod || "____________"} | ` +
      `Service Level Standard: ${v.serviceLevelStandard || "____________"} | Service Credit: ${v.serviceCredit || "____________"}. ` +
      "Service credits are Client's exclusive remedy for service level breach except as expressly stated.",
  );

  p("3. RESPONSE TIMES", true);
  p(
    `High Priority response within ${v.highPriorityTime || "____________"}; ` +
      `Medium Priority response within ${v.mediumPriorityTime || "____________"}; ` +
      `Low Priority response within ${v.lowPriorityTime || "____________"}. ` +
      "Response times are measured from formal notification through agreed channels.",
  );

  p("4. KEY PERFORMANCE INDICATORS (KPIs)", true);
  p(
    `KPIs are qualitative/quantitative performance measures not subject to service credits. ` +
      `Measurement Period: ${v.kpiMeasurementPeriod || "____________"}. KPI Description: ${v.kpiDescription || "____________"}. ` +
      "Failure to meet KPI does not automatically constitute Agreement breach unless expressly specified in MSA/SoW.",
  );

  p("5. TERM AND TERMINATION", true);
  p(
    `5.1 Term: This Agreement remains in force until ${v.terminationDate || "____________"}, unless earlier terminated. ` +
      `5.2 Early Termination: Either Party may terminate with or without cause by giving not less than ` +
      `${v.terminationNoticeDays || "____"} days' written notice. Accrued rights/obligations survive.`,
  );

  p("6. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Service Level Agreement on the date first written above.");

  uf("For and on behalf of the Client - Name", v.clientSignatory);
  uf("Designation", v.clientDesignation);
  uf("Date", v.effectiveDate);
  y += 1.2;
  uf("For and on behalf of the Service Provider - Name", v.providerSignatory);
  uf("Designation", v.providerDesignation);
  uf("Date", v.effectiveDate);

  doc.save("service_level_agreement.pdf");
};

export default function ServiceLevelAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Service Level Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="servicelevelagreement"
    />
  );
}

