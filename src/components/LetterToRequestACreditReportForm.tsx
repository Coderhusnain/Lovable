import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Request Details",
    fields: [
      { name: "requesterName", label: "Requesting party name", type: "text", required: false },
      { name: "requesterAddress", label: "Requesting party address", type: "textarea", required: false },
    ],
  },
];

const t = (value?: string) => (value || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.1;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.8);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "Letter to Request a Credit Report";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write("Other Names for Letter to Request a Credit Report", true);
  write("• Letter to Request Credit History");
  write("(All available in best legal format from Legalgram)");

  write("What Is a Letter to Request a Credit Report?", true);
  write("A Letter to Request a Credit Report is a formal written document used to request a copy of your credit report from credit bureaus.");
  write("This draft credit history request letter from Legalgram helps you:", false, 1.0);
  write("✔ Obtain official credit records");
  write("✔ Review financial standing");
  write("✔ Detect errors or fraud");
  write("✔ Prepare for loans and financing");
  write("✔ Protect your credit profile");
  write("Using the best format Letter to Request a Credit Report from Legalgram ensures your request is professionally prepared and promptly processed.");

  write("Why Download the Credit Report Request Letter from Legalgram?", true);
  write("• Professionally drafted legal format");
  write("• Easy to customize and edit");
  write("• Ready for official submission");
  write("• Free download available");
  write("• Trusted Legalgram document quality");
  write("Thousands rely on Legalgram — including users who also access free download tenancy agreement formats and financial templates.");

  write("When Should You Use a Letter to Request a Credit Report?", true);
  write("Download the Letter to Request a Credit Report on Legalgram if:");
  write("• You are opening a new credit line");
  write("• You want to review your credit history");
  write("• You were denied a loan or credit card");
  write("• You are planning major purchases");
  write("• You want to monitor your financial health");
  write("👉 Download your draft Letter to Request a Credit Report instantly from Legalgram.");

  write("Sample Letter to Request a Credit Report – Best Format from Legalgram", true);
  write("Each Letter to Request a Credit Report from Legalgram updates automatically based on your information.");
  write("✔ Fully customizable");
  write("✔ Printable Word & PDF format");
  write("✔ Professional legal structure");
  write("✔ Free download available");

  write("Download Letter to Request a Credit Report Now – Legalgram", true);
  write("Access your credit history with a professionally drafted legal letter.");
  write("📥 Free Download Letter to Request a Credit Report on Legalgram");
  write("📄 Best professional legal format");
  write("⚖ Simple, secure, and easy to use");

  write("", false, 5);
  write("Requesting Party: " + (t(values.requesterName) || "____________________________"));
  write("Address: " + (t(values.requesterAddress) || "____________________________"));

  doc.save("letter_to_request_a_credit_report.pdf");
};

export default function LetterToRequestACreditReportForm() {
  return <FormWizard steps={steps} title="Letter to Request a Credit Report" subtitle="Complete the fields to generate the credit report request document" onGenerate={generatePDF} documentType="letter-to-request-a-credit-report" />;
}
