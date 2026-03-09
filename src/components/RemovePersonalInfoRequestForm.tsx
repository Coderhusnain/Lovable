import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Removal Request",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: true },
      { name: "toName", label: "To", type: "text", required: true },
      { name: "toAddress", label: "Address", type: "text", required: true },
      { name: "requesterName", label: "Requester full name", type: "text", required: true },
      { name: "companyName", label: "Company to delete data", type: "text", required: true },
      { name: "categories", label: "Categories of personal information", type: "textarea", required: true },
      { name: "contactPhone", label: "Contact phone", type: "text", required: false },
      { name: "contactEmail", label: "Contact email", type: "email", required: false },
      { name: "signDate", label: "Signature date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  let y = 20;
  const bottom = 280;
  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  const title = "REQUEST TO REMOVE PERSONAL INFORMATION";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", v.requestDate);
  uf("To", v.toName);
  uf("Address", v.toAddress);
  p("Subject: Formal Request for Deletion of Personal Data");
  p("Dear Sir or Madam:");
  p(`I, ${v.requesterName || "________________________"}, hereby formally request that ${v.companyName || "________________________"} delete and remove all personal data relating to me that is held, processed, or stored by your company, whether in electronic or physical form.`);
  p("This request applies, without limitation, to the following categories of personal information:");
  p(v.categories || "________________________________________\n________________________________________\n________________________________________");
  p("Please confirm in writing that the requested deletion has been completed. If any portion of my personal data cannot be deleted due to legal, contractual, or regulatory obligations, kindly provide written justification identifying the specific basis for retention.");
  p(`Should you require any additional information to process this request, I may be contacted at ${v.contactPhone || "________________________"} or ${v.contactEmail || "________________________"}.`);
  p("Thank you for your prompt attention to this matter.");
  p("Sincerely,");
  p("Signature: ________________________________");
  uf("Printed Name", v.requesterName);
  uf("Date", v.signDate, 22, 4);

  p("Request to Remove Personal Information - Checklist", true);
  p("Legal Formalities");
  p("- [ ] This request must be signed by the individual whose personal data is the subject of the request.");
  p("Distribution");
  p("- [ ] All parties named in this document should receive a copy of the signed request.");
  p("- [ ] Retain a copy of the signed document for personal records.");
  p("Legal Assistance");
  p("- If clarification is required regarding applicable data protection rights or obligations, consult a qualified legal professional or data privacy counsel.");

  doc.save("request_to_remove_personal_information.pdf");
};

export default function RemovePersonalInfoRequestForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Remove Personal Information"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="removepersonalinfo"
    />
  );
}
