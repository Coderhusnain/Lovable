import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Reference Request Details",
    fields: [
      { name: "applicantName", label: "Applicant name", type: "text", required: false },
      { name: "lenderName", label: "Lender/Institution name", type: "text", required: false },
      { name: "requestDate", label: "Request date", type: "date", required: false },
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "REQUEST FOR BANK OR CREDIT REFERENCE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.requestDate) p(`Date: ${values.requestDate}`);
  if (values.applicantName) p(`Applicant: ${values.applicantName}`);
  if (values.lenderName) p(`Lender/Institution: ${values.lenderName}`, false, 3);

  p("Other Names:", true);
  p("- Credit Reference Request Form");
  p("- Bank Reference Request", false, 3);

  p("What is a Request for Bank or Credit Reference?", true);
  p("A Request for Bank or Credit Reference is a formal document used by lenders to obtain information about an individual's or company's credit history before approving a loan or extending credit. This Credit Reference Request Agreement helps lenders assess financial responsibility and reduce lending risk.");
  p("Using a Request for Bank or Credit Reference on Legalgram allows you to professionally and legally request credit information after receiving the applicant's consent. This draft Request for Bank or Credit Reference supports informed lending decisions and protects both lender and borrower.");
  p("You can download Request for Bank or Credit Reference in the best format from Legalgram, ready for use in personal, commercial, or institutional lending.", false, 3);

  p("Why Use a Request for Bank or Credit Reference?", true);
  p("A Bank or Credit Reference Agreement helps you:");
  p("- Verify an applicant's financial background");
  p("- Assess payment history and credit behavior");
  p("- Reduce the risk of loan default");
  p("- Comply with privacy and consent requirements");
  p("- Make informed credit approval decisions");
  p("This Request for Bank or Credit Reference agreement on Legalgram ensures proper authorization and professional communication with banks or financial institutions.", false, 3);

  p("When to Use a Request for Bank or Credit Reference?", true);
  p("Use this Request for Bank or Credit Reference when:");
  p("✔ You have received a signed credit application");
  p("✔ You want to review an applicant's credit history");
  p("✔ You need to decide whether to extend credit and how much");
  p("✔ You want a clear, professional draft Credit Reference Request Agreement", false, 3);

  p("Why Download Request for Bank or Credit Reference from Legalgram?", true);
  p("- Professionally drafted and lender-ready");
  p("- Best format Request for Bank or Credit Reference from Legalgram");
  p("- Easy to customize and edit");
  p("- Suitable for personal and business lending");
  p("- Secure and compliant structure");
  p("- Free download Request for Bank or Credit Reference");
  p("- Ready to sign, send, and store");
  p("Download Request for Bank or Credit Reference on Legalgram and protect your lending decisions.", false, 3);

  p("Request for Bank or Credit Reference FAQs", true);
  p("How do I draft a Request for Bank or Credit Reference?");
  p("1. Enter applicant and lender details");
  p("2. Specify the purpose of the credit inquiry");
  p("3. Confirm applicant authorization");
  p("4. Review and download the document");
  p("The template on Legalgram updates automatically based on your inputs.");
  p("Is a Request for Bank or Credit Reference legally required?");
  p("While not always mandatory, this document is highly recommended to ensure proper consent and compliance with privacy laws when accessing credit information.", false, 3);

  p("Download Request for Bank or Credit Reference - Best Format from Legalgram", true);
  p("Get your Request for Bank or Credit Reference, Credit Reference Request Form, or Bank Reference Request today:");
  p("✔ Free download Request for Bank or Credit Reference");
  p("✔ Best format this Credit Reference Request Agreement from Legalgram");
  p("✔ Editable and printable document");
  p("✔ Professional and compliant layout");
  p("✔ Trusted lending documentation");

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
