import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: true },
      { name: "fromInfo", label: "From (name/address/contact)", type: "textarea", required: true },
      { name: "toInfo", label: "To (company/contact/address)", type: "textarea", required: true },
      { name: "signatureName", label: "Signature (typed)", type: "text", required: true },
      { name: "printedName", label: "Printed name", type: "text", required: true },
      { name: "requestingParty", label: "Requesting party (checklist)", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "REQUEST TO REMOVE NAME FROM DIRECT MARKETING LIST";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.3);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  uf("Date", v.requestDate);
  p("Re: Formal Request for Removal of Personal Information from Marketing Lists", true);
  p("From:", true); p(v.fromInfo || "________________________________________");
  p("To:", true); p(v.toInfo || "________________________________________");
  p("Dear Sir or Madam:");
  p("I hereby formally request that my name, address, and any associated contact information, as set forth above, be removed immediately from all direct marketing, solicitation, and promotional mailing lists maintained or used by you, your company, or any third-party or independent marketing or telemarketing firms acting on your behalf.");
  p("This request applies to all forms of communication, including but not limited to mail, telephone, electronic messaging, and any other marketing or promotional outreach.");
  p("Please confirm in writing that my information has been removed from your records and that no further marketing communications will be directed to me.");
  p("Thank you for your prompt attention to this matter.");
  p("Sincerely,");
  uf("Signature", v.signatureName);
  uf("Printed Name", v.printedName);
  p("Final Checklist - Request to Remove Name from Direct Marketing List", true);
  uf("Requesting Party", v.requestingParty);
  p("Legal Formalities: signed by requesting party; witnessing/notarization typically not required unless recipient requests.");
  p("Distribution: send original signed request to marketing company; retain complete copy with correspondence.");
  p("Legal Guidance: consult attorney for unique issues/repeated violations/non-compliance.");
  p("Reasons to update/reissue: corrected contact information or submission to different marketing entity.");
  doc.save("request_remove_marketing_list.pdf");
};

export default function RemoveFromMarketingListForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Remove Name from Direct Marketing List"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="removefrommarketinglist"
    />
  );
}

