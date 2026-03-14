import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "General",
    fields: [
      { name: "worksheetDate", label: "Date", type: "date", required: false },
      { name: "creditorName", label: "Creditor name", type: "text", required: false },
      { name: "creditorEntityType", label: "Creditor entity type (Individual / Business / Other)", type: "text", required: false },
      { name: "creditorStreet", label: "Creditor street", type: "text", required: false },
      { name: "creditorCity", label: "Creditor city", type: "text", required: false },
      { name: "creditorState", label: "Creditor state/province", type: "text", required: false },
      { name: "creditorCountry", label: "Creditor country", type: "text", required: false },
      { name: "creditorPhone", label: "Creditor phone", type: "text", required: false },
      { name: "creditorFax", label: "Creditor fax", type: "text", required: false },
      { name: "creditorEmail", label: "Creditor email", type: "text", required: false },
      { name: "debtorName", label: "Debtor name", type: "text", required: false },
      { name: "debtorEntityType", label: "Debtor entity type (Individual / Business)", type: "text", required: false },
      { name: "debtorStreet", label: "Debtor street", type: "text", required: false },
      { name: "debtorCity", label: "Debtor city", type: "text", required: false },
      { name: "debtorState", label: "Debtor state/province", type: "text", required: false },
      { name: "debtorCountry", label: "Debtor country", type: "text", required: false },
      { name: "debtorPhone", label: "Debtor phone", type: "text", required: false },
      { name: "debtorEmail", label: "Debtor email", type: "text", required: false },
      { name: "attorneyName", label: "Attorney name", type: "text", required: false },
      { name: "lawFirm", label: "Law firm", type: "text", required: false },
      { name: "attorneyStreet", label: "Attorney street", type: "text", required: false },
      { name: "attorneyCity", label: "Attorney city", type: "text", required: false },
      { name: "attorneyState", label: "Attorney state/province", type: "text", required: false },
      { name: "attorneyCountry", label: "Attorney country", type: "text", required: false },
      { name: "attorneyPhone", label: "Attorney phone", type: "text", required: false },
      { name: "attorneyFax", label: "Attorney fax", type: "text", required: false },
      { name: "attorneyEmail", label: "Attorney email", type: "text", required: false },
      { name: "otherDoc", label: "Other supporting document", type: "text", required: false },
      { name: "notes", label: "Notes / case summary", type: "textarea", required: false },
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

  // Plain paragraph — bold flag makes heading bold
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Bold label followed by normal value on same line, with underline
  const uf = (label: string, value?: string, min = 24, gap = 1.8, labelBold = false) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", labelBold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    doc.setFont("helvetica", "normal");
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

  // ☐ checkbox bullet item — indented with checkbox symbol
  const checkbox = (text: string, gap = 1.8) => {
    const indent = m + 6;
    const checkTw = tw - 6;
    const lines = doc.splitTextToSize(text, checkTw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("\u2610", m + 1, y); // ☐
    doc.text(lines, indent, y);
    y += lines.length * lh + gap;
  };

  // Entity type row: ☐ Individual  ☐ Business  (☐ Other: ___ for creditor)
  const entityTypeRow = (value: string, includeOther = false) => {
    if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Entity Type:", m, y);
    doc.setFont("helvetica", "normal");

    const val = value.trim().toLowerCase();
    let cx = m + doc.getTextWidth("Entity Type:") + 4;

    const options = includeOther
      ? ["Individual", "Business", "Other"]
      : ["Individual", "Business"];

    for (const opt of options) {
      const isChecked = val === opt.toLowerCase();
      doc.text(isChecked ? "\u2611" : "\u2610", cx, y); // ☑ or ☐
      cx += doc.getTextWidth("\u2610") + 1.5;
      doc.text(opt, cx, y);
      cx += doc.getTextWidth(opt) + 6;
    }

    // If "Other" is selected, show a fill line for the text after it
    if (includeOther) {
      const otherLabel = "Other: ";
      const otherLabelW = doc.getTextWidth(otherLabel);
      // The "Other: ___" blank line
      const otherX = m + doc.getTextWidth("Entity Type:") + 4
        + (doc.getTextWidth("\u2610") + 1.5 + doc.getTextWidth("Individual") + 6)
        + (doc.getTextWidth("\u2610") + 1.5 + doc.getTextWidth("Business") + 6)
        + (doc.getTextWidth("\u2610") + 1.5);
      doc.text("Other:", otherX, y);
      const lineStart = otherX + doc.getTextWidth("Other:") + 2;
      // If value is "other: something", show it
      const otherVal = val.startsWith("other:") ? value.slice(6).trim() : "";
      if (otherVal) {
        doc.text(otherVal, lineStart, y);
        doc.setLineWidth(0.22);
        doc.line(lineStart, y + 1.1, lineStart + Math.max(10, doc.getTextWidth(otherVal)), y + 1.1);
      } else {
        doc.setLineWidth(0.22);
        doc.line(lineStart, y + 1.1, lineStart + 22, y + 1.1);
      }
    }

    y += lh + 1.8;
  };

  // ── Title ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "DEBT COLLECTION WORKSHEET";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  // ── General Information ────────────────────────────────────────────────────
  p("General Information", true);
  uf("Date", values.worksheetDate, 20, 1.8, true);

  // ── Creditor Information ───────────────────────────────────────────────────
  p("Creditor Information", true);
  uf("Creditor Name", values.creditorName, 26, 1.8, true);
  entityTypeRow(values.creditorEntityType || "", true);

  p("Address:", true);
  uf("Street", values.creditorStreet, 28);
  uf("City", values.creditorCity, 24);
  uf("State/Province", values.creditorState, 24);
  uf("Country", values.creditorCountry, 24);

  p("Contact Information:", true);
  uf("Phone", values.creditorPhone, 24);
  uf("Fax", values.creditorFax, 24);
  uf("Email", values.creditorEmail, 24);

  // ── Debtor Information ─────────────────────────────────────────────────────
  p("Debtor Information", true);
  uf("Debtor Name", values.debtorName, 26, 1.8, true);
  entityTypeRow(values.debtorEntityType || "", false);

  p("Address:", true);
  uf("Street", values.debtorStreet, 28);
  uf("City", values.debtorCity, 24);
  uf("State/Province", values.debtorState, 24);
  uf("Country", values.debtorCountry, 24);

  p("Contact Information:", true);
  uf("Phone", values.debtorPhone, 24);
  uf("Email", values.debtorEmail, 24);

  // ── Attorney Information ───────────────────────────────────────────────────
  p("Attorney Information (If Applicable)", true);
  uf("Attorney Name", values.attorneyName, 24, 1.8, true);
  uf("Law Firm", values.lawFirm, 24, 1.8, true);

  p("Address:", true);
  uf("Street", values.attorneyStreet, 28);
  uf("City", values.attorneyCity, 24);
  uf("State/Province", values.attorneyState, 24);
  uf("Country", values.attorneyCountry, 24);

  p("Contact Information:", true);
  uf("Phone", values.attorneyPhone, 24);
  uf("Fax", values.attorneyFax, 24);
  uf("Email", values.attorneyEmail, 24);

  // ── Supporting Documents ───────────────────────────────────────────────────
  p("Supporting Documents", true);
  checkbox("Promissory Note");
  checkbox("Loan Agreement");
  checkbox("Invoices / Statements");
  checkbox("Demand Letters");
  checkbox("Payment History");
  checkbox("Correspondence with Debtor");

  // "Other" checkbox with fill line
  if (y + lh + 2.6 > limit) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text("\u2610", m + 1, y);
  doc.text("Other:", m + 6, y);
  const otherX = m + 6 + doc.getTextWidth("Other: ");
  const otherShown = (values.otherDoc || "").trim();
  if (otherShown) {
    doc.text(otherShown, otherX, y);
    doc.setLineWidth(0.22);
    doc.line(otherX, y + 1.1, otherX + Math.max(12, doc.getTextWidth(otherShown)), y + 1.1);
  } else {
    doc.setLineWidth(0.22);
    doc.line(otherX, y + 1.1, otherX + doc.getTextWidth("_".repeat(24)), y + 1.1);
  }
  y += lh + 2.6;

  // ── Notes / Case Summary ───────────────────────────────────────────────────
  p("Notes / Case Summary", true);
  uf("Notes", values.notes, 50, 3);

  // ── TO-DO CHECKLIST ───────────────────────────────────────────────────────
  p("TO-DO CHECKLIST \u2013 DEBT COLLECTION", true);

  p("Make It Legal", true);
  checkbox("Review this Debt Collection Worksheet to ensure it accurately reflects your intentions and the facts of the matter.");
  checkbox("Make any necessary edits online or in Word format before proceeding.");
  checkbox("Upload all supporting documents to maintain a complete and accurate debt collection file.");
  checkbox("Review educational materials in the Debt Collection Center to help prevent future collection issues.");
  checkbox("Complete the required forms and correspondence to initiate debt collection actions against parties in default.");
  checkbox("Review follow-up materials and next steps to improve payment compliance going forward.");

  p("Copies & Recordkeeping", true);
  checkbox("Upload copies of all related documents to ensure safe and secure recordkeeping.");
  checkbox("Retain copies of this worksheet and all correspondence for your records.");
  checkbox("Store documents securely and ensure they are accessible for review, sharing, or attorney consultation as needed.");

  p("Document Storage Note:", true);
  p("This worksheet and all uploaded documents should be securely stored and accessible at any time for review, printing, or sharing with legal counsel or other authorized parties.");

  doc.save("debt_collection_worksheet.pdf");
};

export default function DebtCollectionWorksheetForm() {
  return (
    <FormWizard
      steps={steps}
      title="Debt Collection Worksheet"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="debtcollection"
    />
  );
}
