import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Security Agreement Details",
    fields: [
      { name: "lenderName", label: "Lender/Secured Party name", type: "text", required: false },
      { name: "borrowerName", label: "Borrower/Debtor name", type: "text", required: false },
      { name: "loanAmount", label: "Total loan amount", type: "text", required: false },
      { name: "collateralDescription", label: "Collateral description", type: "text", required: false },
      { name: "collateralLocation", label: "Collateral location", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
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
  const title = "SECURITY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.lenderName) p(`Secured Party/Lender: ${values.lenderName}`);
  if (values.borrowerName) p(`Debtor/Borrower: ${values.borrowerName}`);
  if (values.loanAmount) p(`Principal Debt Amount: ${values.loanAmount}`);
  if (values.collateralDescription) p(`Collateral: ${values.collateralDescription}`);
  if (values.collateralLocation) p(`Collateral Location: ${values.collateralLocation}`);
  if (values.governingLaw) p(`Governing Law: ${values.governingLaw}`, false, 3);

  p("Other Names:", true);
  p("- Collateral Agreement");
  p("- Vehicle Security Agreement");
  p("- Security Agreement Form", false, 3);

  p("What is a Security Agreement?", true);
  p("A Security Agreement is a legally binding contract that grants the lender (secured party) a legal interest in specific personal property (collateral) if the borrower fails to repay a loan. It protects the lender and provides repayment security through pledged assets.");
  p("If you are a borrower, the lender may claim collateral upon default. If you are a lender, this draft Security Agreement provides legal assurance and financial protection.");
  p("This Security Agreement on Legalgram allows clear definition of collateral, lender rights, borrower obligations, and legal protections for both parties.");
  p("You can download Security Agreement in the best format from Legalgram for personal, business, or commercial transactions.", false, 3);

  p("What is Security or Collateral?", true);
  p("Collateral is personal property used to guarantee a loan, such as vehicles, machinery, jewelry, paintings, coin collections, equipment, and valuable personal property.");
  p("Note: To secure debt using real estate/land, use a Mortgage Deed or Deed of Trust instead of a Security Agreement.", false, 3);

  p("When to Use a Security Agreement?", true);
  p("✔ You are lending money and want collateral protection");
  p("✔ You are borrowing money and lender requires security");
  p("✔ You want a legally enforceable loan structure");
  p("✔ You need a formal collateral agreement");
  p("✔ You want a professional draft Security Agreement", false, 3);

  p("Why Download a Security Agreement from Legalgram?", true);
  p("- Legally binding and enforceable");
  p("- Best format Security Agreement from Legalgram");
  p("- Professionally structured legal template");
  p("- Easy to edit and customize");
  p("- Ready-to-sign legal document");
  p("- Trusted format for lenders and borrowers");
  p("- Free download Security Agreement");
  p("- Secure and reliable document format");
  p("- Valid for personal and business use");
  p("Download Security Agreement on Legalgram and get a professionally drafted legal document in minutes.", false, 3);

  p("Security Agreement FAQs", true);
  p("How do you write a Security Agreement?");
  p("With Legalgram you typically provide: total loan amount, collateral description, collateral location, governing law, lender details, and borrower details.");
  p("Does a Security Agreement have to be notarized?");
  p("Notarization is generally not mandatory, but highly recommended for stronger legal protection and dispute prevention.", false, 3);

  p("Download Security Agreement - Best Legal Format from Legalgram", true);
  p("Get your Security Agreement, Collateral Agreement, or Vehicle Security Agreement today:");
  p("✔ Free download Security Agreement");
  p("✔ Best format this Security Agreement from Legalgram");
  p("✔ Editable legal template");
  p("✔ Ready for signing");
  p("✔ Professional structure");
  p("✔ Easy customization");
  p("✔ Trusted by users");

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
    />
  );
}
import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Security Agreement Details",
    fields: [
      { name: "lenderName", label: "Lender/Secured Party name", type: "text", required: false },
      { name: "borrowerName", label: "Borrower/Debtor name", type: "text", required: false },
      { name: "loanAmount", label: "Total loan amount", type: "text", required: false },
      { name: "collateralDescription", label: "Collateral description", type: "text", required: false },
      { name: "collateralLocation", label: "Collateral location", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
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
  const title = "SECURITY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.lenderName) p(`Secured Party/Lender: ${values.lenderName}`);
  if (values.borrowerName) p(`Debtor/Borrower: ${values.borrowerName}`);
  if (values.loanAmount) p(`Principal Debt Amount: ${values.loanAmount}`);
  if (values.collateralDescription) p(`Collateral: ${values.collateralDescription}`);
  if (values.collateralLocation) p(`Collateral Location: ${values.collateralLocation}`);
  if (values.governingLaw) p(`Governing Law: ${values.governingLaw}`, false, 3);

  p("Other Names:", true);
  p("- Collateral Agreement");
  p("- Vehicle Security Agreement");
  p("- Security Agreement Form", false, 3);

  p("What is a Security Agreement?", true);
  p("A Security Agreement is a legally binding contract that grants the lender (secured party) a legal interest in specific personal property (collateral) if the borrower fails to repay a loan. It protects the lender and provides repayment security through pledged assets.");
  p("If you are a borrower, the lender may claim collateral upon default. If you are a lender, this draft Security Agreement provides legal assurance and financial protection.");
  p("This Security Agreement on Legalgram allows clear definition of collateral, lender rights, borrower obligations, and legal protections for both parties.");
  p("You can download Security Agreement in the best format from Legalgram for personal, business, or commercial transactions.", false, 3);

  p("What is Security or Collateral?", true);
  p("Collateral is personal property used to guarantee a loan, such as vehicles, machinery, jewelry, paintings, coin collections, equipment, and valuable personal property.");
  p("Note: To secure debt using real estate/land, use a Mortgage Deed or Deed of Trust instead of a Security Agreement.", false, 3);

  p("When to Use a Security Agreement?", true);
  p("✔ You are lending money and want collateral protection");
  p("✔ You are borrowing money and lender requires security");
  p("✔ You want a legally enforceable loan structure");
  p("✔ You need a formal collateral agreement");
  p("✔ You want a professional draft Security Agreement", false, 3);

  p("Why Download a Security Agreement from Legalgram?", true);
  p("- Legally binding and enforceable");
  p("- Best format Security Agreement from Legalgram");
  p("- Professionally structured legal template");
  p("- Easy to edit and customize");
  p("- Ready-to-sign legal document");
  p("- Trusted format for lenders and borrowers");
  p("- Free download Security Agreement");
  p("- Secure and reliable document format");
  p("- Valid for personal and business use");
  p("Download Security Agreement on Legalgram and get a professionally drafted legal document in minutes.", false, 3);

  p("Security Agreement FAQs", true);
  p("How do you write a Security Agreement?");
  p("With Legalgram you typically provide: total loan amount, collateral description, collateral location, governing law, lender details, and borrower details.");
  p("Does a Security Agreement have to be notarized?");
  p("Notarization is generally not mandatory, but highly recommended for stronger legal protection and dispute prevention.", false, 3);

  p("Download Security Agreement - Best Legal Format from Legalgram", true);
  p("Get your Security Agreement, Collateral Agreement, or Vehicle Security Agreement today:");
  p("✔ Free download Security Agreement");
  p("✔ Best format this Security Agreement from Legalgram");
  p("✔ Editable legal template");
  p("✔ Ready for signing");
  p("✔ Professional structure");
  p("✔ Easy customization");
  p("✔ Trusted by users");

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
    />
  );
}
