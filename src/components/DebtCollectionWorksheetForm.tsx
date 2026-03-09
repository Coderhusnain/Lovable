import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "General",
    fields: [
      { name: "worksheetDate", label: "Date", type: "date", required: false },
      { name: "creditorName", label: "Creditor name", type: "text", required: false },
      { name: "creditorEntityType", label: "Creditor entity type", type: "text", required: false },
      { name: "creditorStreet", label: "Creditor street", type: "text", required: false },
      { name: "creditorCity", label: "Creditor city", type: "text", required: false },
      { name: "creditorState", label: "Creditor state/province", type: "text", required: false },
      { name: "creditorCountry", label: "Creditor country", type: "text", required: false },
      { name: "creditorPhone", label: "Creditor phone", type: "text", required: false },
      { name: "creditorFax", label: "Creditor fax", type: "text", required: false },
      { name: "creditorEmail", label: "Creditor email", type: "text", required: false },
      { name: "debtorName", label: "Debtor name", type: "text", required: false },
      { name: "debtorEntityType", label: "Debtor entity type", type: "text", required: false },
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

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
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
  const title = "DEBT COLLECTION WORKSHEET";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p("General Information", true);
  uf("Date", values.worksheetDate, 20);
  p("Creditor Information", true);
  uf("Creditor Name", values.creditorName, 26);
  uf("Entity Type", values.creditorEntityType, 24);
  p("Address:");
  uf("Street", values.creditorStreet, 28);
  uf("City", values.creditorCity, 24);
  uf("State/Province", values.creditorState, 24);
  uf("Country", values.creditorCountry, 24);
  p("Contact Information:");
  uf("Phone", values.creditorPhone, 24);
  uf("Fax", values.creditorFax, 24);
  uf("Email", values.creditorEmail, 24);
  p("Debtor Information", true);
  uf("Debtor Name", values.debtorName, 26);
  uf("Entity Type", values.debtorEntityType, 24);
  p("Address:");
  uf("Street", values.debtorStreet, 28);
  uf("City", values.debtorCity, 24);
  uf("State/Province", values.debtorState, 24);
  uf("Country", values.debtorCountry, 24);
  p("Contact Information:");
  uf("Phone", values.debtorPhone, 24);
  uf("Email", values.debtorEmail, 24);
  p("Attorney Information (If Applicable)", true);
  uf("Attorney Name", values.attorneyName, 24);
  uf("Law Firm", values.lawFirm, 24);
  p("Address:");
  uf("Street", values.attorneyStreet, 28);
  uf("City", values.attorneyCity, 24);
  uf("State/Province", values.attorneyState, 24);
  uf("Country", values.attorneyCountry, 24);
  p("Contact Information:");
  uf("Phone", values.attorneyPhone, 24);
  uf("Fax", values.attorneyFax, 24);
  uf("Email", values.attorneyEmail, 24);
  p("Supporting Documents", true);
  p("[ ] Promissory Note");
  p("[ ] Loan Agreement");
  p("[ ] Invoices / Statements");
  p("[ ] Demand Letters");
  p("[ ] Payment History");
  p("[ ] Correspondence with Debtor");
  uf("Other", values.otherDoc, 24, 2.6);
  p("Notes / Case Summary", true);
  uf("Notes", values.notes, 50, 3);
  p("TO-DO CHECKLIST - DEBT COLLECTION", true);
  p("Make It Legal", true);
  p("[ ] Review this Debt Collection Worksheet to ensure it accurately reflects your intentions and the facts of the matter.");
  p("[ ] Make any necessary edits online or in Word format before proceeding.");
  p("[ ] Upload all supporting documents to maintain a complete and accurate debt collection file.");
  p("[ ] Review educational materials in the Debt Collection Center to help prevent future collection issues.");
  p("[ ] Complete the required forms and correspondence to initiate debt collection actions against parties in default.");
  p("[ ] Review follow-up materials and next steps to improve payment compliance going forward.");
  p("Copies & Recordkeeping", true);
  p("[ ] Upload copies of all related documents to ensure safe and secure recordkeeping.");
  p("[ ] Retain copies of this worksheet and all correspondence for your records.");
  p("[ ] Store documents securely and ensure they are accessible for review, sharing, or attorney consultation as needed.");
  p("Document Storage Note:", true);
  p("This worksheet and all uploaded documents should be securely stored and accessible at any time for review, printing, or sharing with legal counsel or other authorized parties.");

  doc.save("debt_collection_worksheet.pdf");
};

export default function DebtCollectionWorksheetForm() {
  return (
    <FormWizard
      steps={steps}
      title="Debt collection worksheet"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="debtcollection"
    />
  );
}
