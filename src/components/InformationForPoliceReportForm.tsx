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

  // Paragraph: plain or bold text block
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

  // Underfield: "Label: _value_" with underline
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

  // Bullet field: indented "   * Label: _value_" with underline
  const bf = (label: string, value?: string, gap = 1.8) => {
    const indent = m + 6;
    const shown = (value || "").trim();
    const labelText = `* ${label}: `;
    const xStart = indent + doc.getTextWidth(labelText);
    const remW = w - m - xStart;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, indent, y);
    if (shown) {
      const valLines = doc.splitTextToSize(shown, remW);
      doc.text(valLines[0], xStart, y);
      doc.setLineWidth(0.22);
      doc.line(xStart, y + 1.1, xStart + Math.max(12, doc.getTextWidth(valLines[0])), y + 1.1);
      if (valLines.length > 1) {
        for (let i = 1; i < valLines.length; i++) {
          y += lh;
          doc.text(valLines[i], xStart, y);
          doc.setLineWidth(0.22);
          doc.line(xStart, y + 1.1, xStart + doc.getTextWidth(valLines[i]), y + 1.1);
        }
      }
    } else {
      doc.setLineWidth(0.22);
      doc.line(xStart, y + 1.1, xStart + doc.getTextWidth("_".repeat(18)), y + 1.1);
    }
    y += lh + gap;
  };

  // Underlined heading: bold text with underline beneath it
  const uh = (text: string, gap = 1.8) => {
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.text(text, m, y);
    doc.setLineWidth(0.3);
    doc.line(m, y + 1.3, m + doc.getTextWidth(text), y + 1.3);
    y += lh + gap;
  };

  // ── Title ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "INFORMATION FOR POLICE REPORT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 10;
  doc.setFontSize(10.5);

  // ── 1. Contact Information ─────────────────────────────────────────
  p("1.     CONTACT INFORMATION", true);
  uf("Name", values.fullName, 22);
  uf("Address", values.address, 22);
  uf("Phone Number", values.phone, 22);
  uf("Email", values.email, 22, 6);

  // ── 2. Personal Information ────────────────────────────────────────
  p("2.     PERSONAL INFORMATION", true);
  uf("Date of Birth", values.dob, 22);
  uf("Race", values.race, 22);
  uf("Sex", values.sex, 22);
  uf("Height", values.height, 22);
  uf("Weight", values.weight ? `${values.weight} lbs` : "", 22, 6);

  // ── 3. Report Information ──────────────────────────────────────────
  p("3.     REPORT INFORMATION", true);
  p("Type of Incident: Theft – Personal Identification");
  p("The undersigned affirms that they have been the victim of the following theft(s):");
  // Both checkboxes on the same line, matching draft layout
  p(`${values.stolenDriversLicense === "yes" ? "☒" : "☐"} Driver's License     ${values.stolenWallet === "yes" ? "☒" : "☐"} Wallet`);
  uf("Date of Incident", values.incidentDate, 22, 1);
  p("How Did You Become Aware of the Incident:", true, 1);
  p(values.awarenessText || "I became aware of the incident when I attempted to retrieve my driver's license and found it missing from my wallet. I immediately retraced my steps but could not locate the item. I suspect the theft occurred during the day while I was in a public area.");
  uf("Location of Incident", values.incidentLocation, 22, 1);
  p("Brief Description of the Incident:", true, 1);
  const incidentLoc = (values.incidentLocation || "").trim() || "the specified location";
  p(values.incidentDescription || `On the above-stated date, I was present at ${incidentLoc}. At some point during the day, my driver's license was unlawfully taken from my possession without my knowledge or consent. The item was not misplaced by me, and I believe the loss was due to theft. No witnesses were available at the time of the incident, and no physical confrontation occurred.`);
  p("List of Items Lost or Stolen:", true, 1);
  p("1. Driver's License");
  bf("Name on License", values.licenseName);
  bf("License Number", values.licenseNumber);
  bf("State of Issue", values.licenseState);
  bf("Description", values.licenseDescription || "Standard issue driver's license with a light scratch on the top-left corner.");
  bf("Issued On", values.licenseIssuedOn);
  bf("Expiry Date", values.licenseExpiry, 6);

  // ── To Do Checklist ────────────────────────────────────────────────
  p("To do Checklist for Police report:", true);
  p("Make it legal:");
  p("Sign the document:", false, 4);

  // Copies — underlined heading matching __Copies__ in draft
  uh("Copies");
  p("The original report should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The report should maintain a copy. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Legal Gram to store and share it. Safe and secure in your Legal Gram File Manager, you can access it any time from any computer, as well as share it for future reference.", false, 4);

  // Additional Assistance — bold heading, no colon, matching draft
  p("Additional Assistance", true, 1);
  p("If you are unsure or have questions regarding this report or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.", false, 6);

  // ── Signature ──────────────────────────────────────────────────────
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
