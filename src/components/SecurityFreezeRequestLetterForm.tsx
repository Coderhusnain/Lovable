import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Your Info",
    fields: [
      { name: "fullName", label: "Full Legal Name", type: "text", required: true },
      { name: "ssn", label: "Social Security Number", type: "text", required: false },
      { name: "dob", label: "Date of Birth", type: "date", required: false },
      { name: "address", label: "Current Residential Address", type: "textarea", required: true },
      { name: "idType", label: "Proof of ID (e.g., Driver's License)", type: "text", required: false },
      { name: "residenceProof", label: "Proof of Residence (document)", type: "text", required: false },
      { name: "contactInfo", label: "Contact phone or email", type: "text", required: false },
    ],
  },
];

const u = (v?: string) => (v || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;
  const textWidth = W - margin * 2;
  const lineHeight = 5.2;
  let y = 16;

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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SECURITY FREEZE REQUEST LETTER", W / 2, y, { align: "center" });
  y += 10;

  // Common identifying info
  write(`Full Legal Name: ${u(values.fullName) || "__________________________"}`);
  write(`Social Security Number: ${u(values.ssn) || "__________________"}`);
  write(`Date of Birth: ${u(values.dob) || "__________________"}`);
  write(`Current Residential Address:\n${u(values.address) || "________________________________________\n________________________________________"}`);
  y += 4;

  // Experian
  write("Experian Security Freeze", true);
  write("P.O. Box 9554\nAllen, TX 75013");
  write("Dear Sir or Madam,");
  write("I hereby formally request the placement of a security freeze on my consumer credit file, pursuant to applicable federal and state laws governing consumer credit reporting and identity protection.");
  write("In support of this request and to verify my identity and residence, I am enclosing the following documentation:");
  write("• A copy of my government-issued photo identification (Driver’s License)");
  write("• A copy of a document verifying my current residence (e.g., utility bill)");
  write("Please confirm in writing once the security freeze has been successfully placed on my credit file. Should any additional information or documentation be required to process this request, please notify me at your earliest convenience.");
  write("Thank you for your prompt attention to this matter.\n\nSincerely,\n\n________________________________________\nSignature\n\n________________________________________\nPrinted Name");

  doc.addPage();
  y = 18;

  // TransUnion
  write("TransUnion LLC", true);
  write("P.O. Box 2000\nChester, PA 19016");
  write("Dear Sir or Madam,");
  write("I hereby formally request the placement of a security freeze on my consumer credit file, in accordance with applicable consumer protection and credit reporting laws.");
  write("Enclosed please find copies of the following documents for identity and address verification:");
  write("• Government-issued photo identification (Driver’s License)");
  write("• Proof of current residence (utility bill or bank statement)");
  write("Kindly confirm in writing once the security freeze has been implemented. Should further documentation be required, please advise promptly.");
  write("Sincerely,\n\n________________________________________\nSignature\n\n________________________________________\nPrinted Name");

  doc.addPage();
  y = 18;

  // Equifax
  write("Equifax Security Freeze", true);
  write("P.O. Box 105788\nAtlanta, GA 30348");
  write("Dear Sir or Madam,");
  write("I am writing to formally request that a security freeze be placed on my consumer credit file, as permitted under applicable credit reporting and identity theft protection laws.");
  write("Enclosed are copies of the following documents to substantiate my identity and residence:");
  write("• Government-issued photo identification (Driver’s License)");
  write("• Proof of current residence (utility bill or official mail)");
  write("Please provide written confirmation once the security freeze has been applied. If additional documentation is necessary, kindly notify me without delay.");
  write("Sincerely,\n\n________________________________________\nSignature\n\n________________________________________\nPrinted Name");

  doc.save("security_freeze_request_letter.pdf");
};

export default function SecurityFreezeRequestLetterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Security Freeze Request Letter"
      subtitle="Generate security freeze request letters for Experian, TransUnion, and Equifax"
      onGenerate={generatePDF}
      documentType="security-freeze-request-letter"
    />
  );
}
