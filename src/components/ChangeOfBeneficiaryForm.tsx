import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Policy Details",
    fields: [
      { name: "requestDate", label: "Date", type: "date", required: false },
      { name: "toName", label: "To", type: "text", required: false },
      { name: "policyNumber", label: "Policy number", type: "text", required: false },
      { name: "insuredName", label: "Insured", type: "text", required: false },
      { name: "policyOwner", label: "Policy owner", type: "text", required: false },
      { name: "signature", label: "Policy owner signature", type: "text", required: false },
      { name: "printedName", label: "Printed name", type: "text", required: false },
      { name: "address", label: "Address", type: "text", required: false },
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
  const title = "CHANGE OF BENEFICIARY LETTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.requestDate, 20);
  uf("To", values.toName, 24);
  p(`Re: Life Insurance Policy No. ${values.policyNumber || "__________"}`);
  p(`Insured: ${values.insuredName || "______________________"}`);
  p(`Policy Owner: ${values.policyOwner || "_________________"}`);
  p("Dear Sir or Madam:");
  p("I am writing in my capacity as the owner of the above-referenced life insurance policy to formally request an update to the policy records.");
  p("Please be advised that there has been a change in the name of a primary beneficiary, and I hereby instruct that the policy be amended accordingly to reflect the correct beneficiary name.");
  p("Kindly confirm this change in writing at your earliest convenience. If the completion of any additional forms or documentation is required to effectuate this amendment, please forward the same to me without delay.");
  p("Thank you for your cooperation and assistance in this matter.");
  p("Sincerely,", false, 3);
  uf("Signature of Policy Owner", values.signature, 34);
  uf("Printed Name", values.printedName, 28);
  uf("Address", values.address, 34);
  uf("Contact Information", values.contactInfo, 34, 3);
  p("Important Notes", true);
  p("Legal Requirement", true, 1);
  p("- This request must be signed by the policy owner of record.", false, 2.6);
  p("Recordkeeping", true, 1);
  p("- The policy owner should retain a copy of this letter and all related correspondence for personal records.", false, 2.6);
  p("When to Consult Legal Counsel", true, 1);
  p("- If the policy owner is legally incapacitated or otherwise incompetent, the appointed guardian or legal representative should consult an attorney to determine the scope of their authority to change beneficiary designations.", false, 2.6);
  p("Additional Information", true, 1);
  p("- The insurance company may require the original policy document to be submitted along with this request. The policy owner should consult the insurance agent or insurer to confirm whether this is necessary.");
  p("- Unless specifically required by the insurer, this request does not need to be notarized or witnessed.", false, 2.6);
  p("Reasons to Submit an Updated Request", true, 1);
  p("- To make additional changes to beneficiary designations.");
  p("- To notify the insurer of a subsequent name change of any listed beneficiary.");

  doc.save("change_of_beneficiary_letter.pdf");
};

export default function ChangeOfBeneficiaryForm() {
  return (
    <FormWizard
      steps={steps}
      title="Change of Beneficiary Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="changeofbeneficiary"
    />
  );
}
