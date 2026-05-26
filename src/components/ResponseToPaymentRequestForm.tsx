import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Payment Details",
    fields: [
      { name: "ref", label: "Re:", type: "text", required: false },
      { name: "allegedBalance", label: "Alleged balance (amount)", type: "text", required: false },
      { name: "paymentAmount", label: "Payment amount", type: "text", required: false },
      { name: "signatureName", label: "Printed Name", type: "text", required: true },
    ],
  },
];

const u = (v?: string) => (v || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.2;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  // Title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "Response to Payment Request";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("[Sender’s Address]");
  write("________________________________________");
  write("[Date]");
  write("[Creditor’s Address]");
  write("________________________________________");
  write("Re: Response to Payment Demand", true);
  write("Dear Sir or Madam,");
  write("I acknowledge receipt of your recent correspondence concerning the alleged balance associated with " + (u(values.ref) || "__________________________") + ".");
  write("According to the information reflected in your records, the outstanding amount due is stated as " + (u(values.allegedBalance) || "$") + ". Enclosed herewith is a payment in the amount of " + (u(values.paymentAmount) || "$") + ", to be applied toward the referenced balance.");
  write("Please confirm receipt of this payment and update your records accordingly.");
  write("Should you require any additional information or clarification, please do not hesitate to contact me.");
  write("Respectfully submitted,");
  write("[Signature]");
  write(u(values.signatureName) || "[Printed Name]");

  write("\n");
  write("Final Compliance Checklist – Response to Payment Request Letter", true, 2.2);
  write("Debtor: __________________________");
  write("Creditor: __________________________");

  write("Legal Execution", true);
  write("• The debtor should sign the letter.");

  write("Recordkeeping", true);
  write("• Retain a complete copy of this correspondence for your personal records.");

  write("When to Seek Legal Counsel", true);
  write("• Debtor rights may be governed by the Fair Debt Collection Practices Act and applicable state collection laws. Legal counsel should be consulted if there are questions regarding rights or obligations.");

  write("Reasons to Update This Letter", true);
  write("• To provide new or corrected information regarding the alleged debt");
  write("• To issue additional correspondence to the creditor");

  doc.save("response_to_payment_request.pdf");
};

export default function ResponseToPaymentRequestForm() {
  return (
    <FormWizard
      steps={steps}
      title="Response to Payment Request"
      subtitle="Fill in the details to generate the formal response letter"
      onGenerate={generatePDF}
      documentType="response-to-payment-request"
    />
  );
}
