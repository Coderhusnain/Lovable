import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "refPurpose", label: "Re: (purpose)", type: "text", required: false },
      { name: "enclosure1", label: "Enclosure line 1", type: "text", required: false },
      { name: "enclosure2", label: "Enclosure line 2", type: "text", required: false },
      { name: "signatureName", label: "Printed Name", type: "text", required: true },
    ],
  },
];

const u = (value?: string) => (value || "").trim();

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
  const title = "Request to Return or Destroy a Credit Report";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("Re: Formal Request for Return of Credit Report and Related Personal Information", true);
  write("Dear Sir or Madam,");
  write("I write in reference to your prior request for and receipt of a copy of my credit report and related personal financial information in connection with " + (u(values.refPurpose) || "__________________________") + ".");
  write(
    "As the stated purpose for which the credit report was obtained has now been fulfilled, I hereby formally request that the credit report be returned to me without delay. This request is made to minimize the continued retention of my confidential and sensitive financial information by third parties for whom such possession is no longer necessary."
  );
  write("Enclosed herewith are copies of documents provided to assist in the identification of my records and the prompt processing of this request:");
  write(u(values.enclosure1) || "________________________________________");
  write(u(values.enclosure2) || "________________________________________");
  write("Please provide written confirmation once the requested action has been completed. Should you require any additional information or documentation, please do not hesitate to contact me at the address listed above.");
  write("Thank you for your prompt cooperation and attention to this matter.");
  write("Respectfully submitted,");
  write("[Signature]");
  write(u(values.signatureName) || "[Printed Name]");

  write("\n");
  write("Final Compliance Checklist – Credit Report Return Request", true, 2.2);
  write("Requesting Party: __________________________");

  write("Legal Execution", true);
  write("• The letter must be signed by the requesting individual. Notarization or witness signatures are not required.");

  write("Copies and Recordkeeping", true);
  write("• Send the original signed letter to the lender or institution in possession of the credit report.");
  write("• Include copies of supporting documents unless originals are specifically requested.");
  write("• Retain a complete copy of the letter and all enclosures for personal records.");

  write("Follow-Up", true);
  write("• After a reasonable period, follow up to confirm that the credit report has been returned as requested.");

  write("Reasons for Amendment or Reuse", true);
  write("• To provide updated or corrected information");
  write("• To submit a similar request to another lender or institution");

  doc.save("request_return_destroy_credit_report.pdf");
};

export default function RequestToReturnOrDestroyCreditReportForm() {
  return (
    <FormWizard
      steps={steps}
      title="Request to Return or Destroy a Credit Report"
      subtitle="Complete the fields and generate the formal request letter"
      onGenerate={generatePDF}
      documentType="request-return-destroy-credit-report"
    />
  );
}
