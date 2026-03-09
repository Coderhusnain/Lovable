import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Entities and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "dissolvingEntity", label: "Dissolving entity", type: "text", required: true },
      { name: "dissolvingType", label: "Dissolving entity type", type: "text", required: false },
      { name: "dissolvingState", label: "Dissolving entity state/country", type: "text", required: false },
      { name: "survivingEntity", label: "Surviving entity", type: "text", required: true },
      { name: "survivingType", label: "Surviving entity type", type: "text", required: false },
      { name: "survivingState", label: "Surviving entity state/country", type: "text", required: false },
      { name: "survivingNameAfterMerger", label: "Name after merger", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
    ],
  },
  {
    label: "Valuation and Board",
    fields: [
      { name: "tangibleIntangibleValue", label: "Tangible/intangible assets value", type: "text", required: false },
      { name: "receivablesValue", label: "Unrealized receivables", type: "text", required: false },
      { name: "inventoryValue", label: "Inventory value", type: "text", required: false },
      { name: "liabilitiesValue", label: "Estimated liabilities", type: "text", required: false },
      { name: "conversionPercent", label: "Conversion percentage interests", type: "text", required: false },
      { name: "boardCount", label: "Initial board director count", type: "text", required: false },
      { name: "dissolvingNomineeCount", label: "Dissolving nominee director count", type: "text", required: false },
      { name: "dissolvingSignerDate", label: "Dissolving entity sign date", type: "date", required: false },
      { name: "survivingSignerDate", label: "Surviving entity sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (v?: string, min = 14) => (v || "").trim() || " ".repeat(min);
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y); y += lines.length * lh + g;
  };
  const uf = (l: string, v?: string, min = 20) => {
    const shown = (v || "").trim(), label = `${l}: `;
    if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
    doc.text(label, m, y); const x = m + doc.getTextWidth(label);
    if (shown) { doc.text(shown, x, y); doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1); }
    else { doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1); }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  const title = "MERGER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9; doc.setFontSize(10.5);

  p(`This Merger Agreement is made as of ${u(values.effectiveDate, 12)}, by and between ${u(values.dissolvingEntity, 12)} (the "Dissolving Entity"), a ${u(values.dissolvingType, 10)} existing under ${u(values.dissolvingState, 10)}, and ${u(values.survivingEntity, 12)} (the "Surviving Entity"), a ${u(values.survivingType, 10)} existing under ${u(values.survivingState, 10)}.`, false, 3);
  p(`WHEREAS the parties desire the Dissolving Entity to merge into the Surviving Entity, with the Surviving Entity continuing under the name ${u(values.survivingNameAfterMerger, 12)}; NOW THEREFORE the parties agree as follows:`);
  p("I. Merger", true);
  p("1. Effective Date of Merger: Merger becomes effective upon filing certificate of merger with appropriate governmental authorities.");
  p("2. Surviving Business Entity: Dissolving Entity merges into Surviving Entity; separate existence of Dissolving Entity ceases; Surviving Entity continues with all rights/assets/liabilities as provided by law.");
  p("II. Terms and Conditions", true);
  p("1. Further Assignments and Assurances: Authorized representatives of Dissolving Entity execute and deliver all deeds, assignments, confirmations, and assurances reasonably requested to vest and confirm title in Surviving Entity.");
  p("III. Valuation of Assets", true);
  p(`Tangible/intangible incl. goodwill: $${u(values.tangibleIntangibleValue, 8)}; Unrealized receivables: $${u(values.receivablesValue, 8)}; Inventory: $${u(values.inventoryValue, 8)}; Estimated liabilities: $${u(values.liabilitiesValue, 8)}.`);
  p(`Conversion of Interests: Interests in Dissolving Entity convert into ${u(values.conversionPercent, 8)} percent interest(s) of Surviving Entity; no fractional interests issued; fractional values settled in cash at fair market value.`);
  p("IV. Management of Surviving Entity", true);
  p(`Management and control rest exclusively with Surviving Entity per governing documents. Initial board shall consist of ${u(values.boardCount, 3)} directors; Dissolving Entity may nominate ${u(values.dissolvingNomineeCount, 3)} director(s).`);
  p("V. Interpretation and Enforcement", true);
  p("Notices must be in writing and delivered personally, by certified mail (return receipt requested), or facsimile to designated addresses.");
  p("This Agreement may be executed in counterparts, each deemed an original and together one instrument.");
  p("VI. General Provisions", true);
  p("Severability applies. Mutual indemnification applies for material breaches of representations, warranties, covenants, or obligations.");
  p(`Applicable law: ${u(values.governingLaw, 12)} without conflict-of-law principles.`);
  p("VII. Signatories", true);
  p("By signing, each party confirms they have read, understood, and agreed to be bound by all terms.");
  p("Dissolving Entity:");
  uf("Name", values.dissolvingEntity, 22);
  p("Signature: _______________________");
  uf("Date", values.dissolvingSignerDate, 14);
  p("Surviving Entity:");
  uf("Name", values.survivingEntity, 22);
  p("Signature: _______________________");
  uf("Date", values.survivingSignerDate, 14);

  doc.save("merger_agreement.pdf");
};

export default function MergerAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Merger Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mergeragreement"
    />
  );
}
