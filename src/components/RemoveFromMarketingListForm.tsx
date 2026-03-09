import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "fromName", label: "From", type: "text", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "toAddress", label: "To address", type: "text", required: false },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "signature", label: "Signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "fromAddress", label: "Address", type: "text", required: false },
      { name: "contactInfo", label: "Contact information", type: "text", required: false },
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
  const title = "REQUEST TO REMOVE NAME FROM DIRECT MARKETING LIST";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 10;

  uf("Date", values.requestDate, 18);
  p("Re: Formal Request for Removal of Personal Information from Marketing Lists");
  uf("From", values.fromName, 40);
  p("");
  uf("To", values.toName, 40);
  uf("To Address", values.toAddress, 50, 3);

  p("Dear Sir or Madam:");
  p("I hereby formally request that my name, address, and any associated contact information, as set forth above, be removed immediately from all direct marketing, solicitation, and promotional mailing lists maintained or used by you, your company, or any third-party or independent marketing or telemarketing firms acting on your behalf.");
  p("This request applies to all forms of communication, including but not limited to mail, telephone, electronic messaging, and any other marketing or promotional outreach.");
  p("Please confirm in writing that my information has been removed from your records and that no further marketing communications will be directed to me.");
  p("Thank you for your prompt attention to this matter.");
  p("Sincerely,", false, 3);

  uf("Signature", values.signature, 32);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.fromAddress, 50);
  uf("Contact Information", values.contactInfo, 36, 3);

  p("Final Checklist - Request to Remove Name from Direct Marketing List", true);
  uf("Requesting Party", values.printedName, 26);
  p("Legal Formalities", true, 1);
  p("[ ] This request must be signed by the requesting party.");
  p("[ ] Witnessing or notarization is not required, unless specifically requested by the recipient.", false, 2.6);
  p("Distribution", true, 1);
  p("[ ] Send the original signed request to the direct marketing company.");
  p("[ ] Retain a complete copy of the signed request and all correspondence for your records.", false, 2.6);
  p("Legal Guidance", true, 1);
  p("- Consult a qualified attorney if there are unique issues, repeated violations, or non-compliance with this request.", false, 2.6);
  p("Reasons to Update or Reissue", true, 1);
  p("- To provide corrected or updated contact information.");
  p("- To submit a similar request to a different marketing entity.");

  doc.save("request_to_remove_name_from_direct_marketing_list.pdf");
};

export default function RemoveFromMarketingListForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to remove name from direct marketing list"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="removefrommarketinglist"
    />
  );
}
