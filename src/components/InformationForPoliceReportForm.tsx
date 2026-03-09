import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Contact and Personal Information",
    fields: [
      { name: "fullName", label: "Full legal name", type: "text", required: true },
      { name: "address", label: "Residential address", type: "text", required: true },
      { name: "phone", label: "Phone number", type: "tel", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "dob", label: "Date of birth", type: "date", required: true },
      { name: "race", label: "Race", type: "text", required: false },
      { name: "sex", label: "Sex", type: "text", required: false },
      { name: "height", label: "Height", type: "text", required: false },
      { name: "weight", label: "Weight (lbs)", type: "text", required: false },
    ],
  },
  {
    label: "Incident Details",
    fields: [
      { name: "incidentDate", label: "Date of incident", type: "date", required: true },
      { name: "incidentLocation", label: "Location of incident", type: "text", required: true },
      { name: "awarenessText", label: "How you became aware", type: "textarea", required: true },
      { name: "incidentDescription", label: "Brief description of incident", type: "textarea", required: true },
      { name: "stolenDriversLicense", label: "Driver's license stolen?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { name: "stolenWallet", label: "Wallet stolen?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { name: "licenseName", label: "Name on license", type: "text", required: false },
      { name: "licenseNumber", label: "License number", type: "text", required: false },
      { name: "licenseState", label: "State/jurisdiction of issue", type: "text", required: false },
      { name: "licenseDescription", label: "License description", type: "text", required: false },
      { name: "licenseIssuedOn", label: "License issued on", type: "date", required: false },
      { name: "licenseExpiry", label: "License expiry date", type: "date", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "reportSignDate", label: "Report signing date", type: "date", required: true },
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
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
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

  const yesNo = (v?: string) => (v === "yes" ? "Yes" : "No");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "INFORMATION FOR POLICE REPORT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p("1. CONTACT INFORMATION", true);
  uf("Name", values.fullName, 22);
  uf("Address", values.address, 22);
  uf("Phone Number", values.phone, 22);
  uf("Email", values.email, 22, 2.6);

  p("2. PERSONAL INFORMATION", true);
  uf("Date of Birth", values.dob, 22);
  uf("Race", values.race, 22);
  uf("Sex", values.sex, 22);
  uf("Height", values.height, 22);
  uf("Weight", values.weight ? `${values.weight} lbs` : "", 22, 2.6);

  p("3. REPORT INFORMATION", true);
  p("Type of Incident: Theft - Personal Identification");
  p("The undersigned affirms that they have been the victim of the following theft(s):");
  p(`[${yesNo(values.stolenDriversLicense) === "Yes" ? "X" : " "}] Driver's License`);
  p(`[${yesNo(values.stolenWallet) === "Yes" ? "X" : " "}] Wallet`);
  uf("Date of Incident", values.incidentDate, 22);
  p("How Did You Become Aware of the Incident:", true, 1);
  p(values.awarenessText || "I became aware of the incident when I attempted to retrieve my driver's license and found it missing from my wallet. I retraced my steps but could not locate the item. I suspect the theft occurred while I was in a public area.");
  uf("Location of Incident", values.incidentLocation, 22);
  p("Brief Description of the Incident:", true, 1);
  p(values.incidentDescription || "On the above-stated date, I was present at a public location. At some point, my driver's license was unlawfully taken from my possession without my knowledge or consent. The item was not misplaced by me, and I believe the loss was due to theft. No witnesses were available and no physical confrontation occurred.");
  p("List of Items Lost or Stolen:", true);
  p("1. Driver's License");
  uf("Name on License", values.licenseName, 22);
  uf("License Number", values.licenseNumber, 22);
  uf("State of Issue", values.licenseState, 22);
  uf("Description", values.licenseDescription || "Standard issue driver's license with a light scratch on the top-left corner.", 22);
  uf("Issued On", values.licenseIssuedOn, 22);
  uf("Expiry Date", values.licenseExpiry, 22, 2.6);

  p("To do Checklist for Police report:", true);
  p("Make it legal:");
  p("Sign the document:");
  p("Copies:");
  p("The original report should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The report should maintain a copy in a safe place. If you signed a paper copy, you can store/share it using a secure file manager and access it from any computer for future reference.");
  p("Additional Assistance:");
  p("If unsure or if questions exist regarding this report or special circumstances, use a lawyer search service to find legal assistance in your area.", false, 3);

  p("Signature", true, 1);
  p("_______________________________");
  uf("Name", values.fullName, 22);
  uf("Date", values.reportSignDate, 22);

  doc.save("information_for_police_report.pdf");
};

export default function InformationForPoliceReport() {
  return (
    <FormWizard
      steps={steps}
      title="Information For Police Report"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="informationforpolicereport"
    />
  );
}
