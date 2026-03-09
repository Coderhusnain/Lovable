import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Type",
    fields: [
      {
        name: "letterType",
        label: "Which draft do you want to generate?",
        type: "select",
        required: true,
        options: [
          { value: "bank", label: "Request for bank or credit reference" },
          { value: "personal", label: "Request a credit reference" },
        ],
      },
    ],
  },
  {
    label: "Letter Details",
    fields: [
      { name: "lineOne", label: "Top line 1", type: "text", required: false },
      { name: "lineTwo", label: "Top line 2", type: "text", required: false },
      { name: "applicantName", label: "Applicant name", type: "text", required: false },
      { name: "institutionName", label: "Institution / creditor", type: "text", required: false },
      { name: "dearName", label: "Dear (name)", type: "text", required: false },
      { name: "signerName", label: "Name", type: "text", required: false },
      { name: "signerTitle", label: "Title", type: "text", required: false },
      { name: "organization", label: "Organization", type: "text", required: false },
      { name: "conversationDate", label: "Telephone conversation date", type: "date", required: false },
      { name: "sendToName", label: "Send reference to (name)", type: "text", required: false },
      { name: "sendToLine1", label: "Send-to address line 1", type: "text", required: false },
      { name: "sendToLine2", label: "Send-to address line 2", type: "text", required: false },
      { name: "sendToLine3", label: "Send-to address line 3", type: "text", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "requesterName", label: "Requester name", type: "text", required: false },
      { name: "requesterSignature", label: "Requester signature", type: "text", required: false },
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

  const drawTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(title, w / 2, y, { align: "center" });
    const tW = doc.getTextWidth(title);
    doc.setLineWidth(0.35);
    doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
    y += 9;
  };

  if (values.letterType === "personal") {
    drawTitle("REQUEST A CREDIT REFERENCE");
    uf("Line 1", values.lineOne, 20);
    uf("Line 2", values.lineTwo, 20, 3);
    p("Dear Sir or Madam:");
    p(`As discussed during our telephone conversation on ${values.conversationDate || "__________"}, this letter serves as a formal written request that a positive credit reference concerning my account be provided to ${values.sendToName || "__________"}, at ${values.sendToLine1 || "__________"}, ${values.sendToLine2 || "__________"}, ${values.sendToLine3 || "__________"}.`);
    p("I further request that a copy of this credit reference be sent to me for my records.");
    p(`For your reference, my account number is ${values.accountNumber || "__________"}.`);
    p("Should you require any additional information or have any questions regarding this request, please do not hesitate to contact me.");
    p("Thank you for your prompt attention and cooperation.");
    p("Sincerely,", false, 3);
    uf("Name", values.requesterName, 24);
    uf("Signature", values.requesterSignature, 24, 3);
    p("FINAL CHECKLIST FOR LETTER TO REQUEST A CREDIT REFERENCE", true);
    p("Make It Legal", true, 1);
    p("[ ] Sign the letter prior to submission.", false, 2.6);
    p("Copies", true, 1);
    p("[ ] Retain a copy of the signed letter for your records.", false, 2.6);
    p("Reasons to Update", true, 1);
    p("- To issue a follow-up letter regarding a prior request; or");
    p("- To request that an additional credit reference be sent to another individual or organization.");
    doc.save("request_a_credit_reference.pdf");
    return;
  }

  drawTitle("REQUEST FOR BANK OR CREDIT REFERENCE");
  uf("Line 1", values.lineOne, 20);
  uf("Line 2", values.lineTwo, 20, 3);
  p(`Re: Credit Reference for ${values.applicantName || "__________"}`);
  p(`Dear ${values.dearName || "__________"}:`);
  p(`We are in receipt of a credit application submitted by ${values.applicantName || "__________"}, which identifies your institution as a credit reference. Enclosed herewith is a copy of the credit application in which your bank is named as a reference, together with the Applicant's authorization permitting the release of credit information.`);
  p("We respectfully request that you provide the following information:");
  p(`1. The types of accounts maintained by ${values.applicantName || "__________"} with your institution.`);
  p("Should you have any questions regarding this request or require additional documentation, please do not hesitate to contact the undersigned.");
  p("Thank you for your cooperation.");
  p("Sincerely,", false, 3);
  uf("Name", values.signerName, 24);
  uf("Title", values.signerTitle, 20);
  uf("Organization", values.organization, 24, 3);

  p("FINAL CHECKLIST FOR REQUEST FOR BANK OR CREDIT REFERENCE", true);
  uf("Creditor", values.institutionName, 24);
  p("Make It Legal", true, 1);
  p("[ ] Sign the letter prior to submission.", false, 2.6);
  p("Copies", true, 1);
  p("[ ] Retain a copy of this letter and the signed credit application (or other authorization) in the Applicant's file, together with any information received in response.");
  p("[ ] If applicable, enclose a copy (not the original) of the credit application or other authorization executed by the Applicant.", false, 2.6);
  p("Reasons to Update", true, 1);
  p("- To request a bank or credit reference for another Applicant; or");
  p("- To request information regarding additional accounts maintained by an Applicant with a bank or trade creditor.");

  doc.save("request_bank_or_credit_reference.pdf");
};

export default function RequestCreditReferenceForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request for Bank or Credit Reference"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="requestcreditreference"
    />
  );
}
