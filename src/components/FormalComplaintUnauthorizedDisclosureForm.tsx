import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Letter",
    fields: [
      { name: "signatureName", label: "Printed Name", type: "text", required: true },
      { name: "circumstances1", label: "Unauthorized disclosure circumstances line 1", type: "text", required: false },
      { name: "circumstances2", label: "Unauthorized disclosure circumstances line 2", type: "text", required: false },
      { name: "supporting1", label: "Supporting documents line 1", type: "text", required: false },
      { name: "supporting2", label: "Supporting documents line 2", type: "text", required: false },
    ],
  },
  {
    label: "Optional Contact Details",
    fields: [
      { name: "contactAddress", label: "Address listed above", type: "textarea", required: false },
    ],
  },
  {
    label: "Checklist",
    fields: [
      { name: "requestingParty", label: "Requesting Party", type: "text", required: false },
    ],
  },
];

const txt = (value?: string) => (value || "").trim();

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

  const writeBlankLine = (label: string, value?: string) => {
    const shown = txt(value);
    const rendered = shown ? shown : "__________________________";
    write(`${label}: ${rendered}`);
  };

  // Centered main title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title1 = "Formal Complaint Regarding Unauthorized Disclosure of Personal Information";
  doc.text(_title1, width / 2, y, { align: "center" });
  y += 10;
  write("Consumer Response Center");
  write("Federal Trade Commission");
  write("600 Pennsylvania Avenue, N.W.");
  write("Washington, D.C. 20580");
  write("Re: Formal Complaint Regarding Unauthorized Disclosure of Personal Information");
  write("Dear Sir or Madam,");
  write("I write to formally notify the Federal Trade Commission that my personal information has been disclosed and/or accessed without my knowledge or authorization.");
  write("I believe that such unauthorized disclosure occurred under the following circumstances:");
  write(txt(values.circumstances1) || "________________________________________");
  write(txt(values.circumstances2) || "________________________________________");
  write("Enclosed herewith are copies of documents and materials supporting my belief that this unauthorized disclosure has occurred, including:");
  write(txt(values.supporting1) || "________________________________________");
  write(txt(values.supporting2) || "________________________________________");
  write("I respectfully request that the Federal Trade Commission investigate this matter and advise me in writing of any actions taken or proposed in connection with this complaint.");
  write("Should you require any additional information or supporting documentation, please do not hesitate to contact me at the address listed above.");
  write("Thank you for your prompt attention to this serious matter.");
  write("Respectfully submitted,");
  writeBlankLine("[Signature]", values.signatureName);
  writeBlankLine("[Printed Name]", values.signatureName);

  write("Final Compliance Checklist - FTC Security Breach Complaint", true, 2.2);
  write("Requesting Party: __________________________");
  write("Legal Execution");
  write("- The complaint letter should be signed by the reporting party. Notarization or witness signatures are not required.");
  write("- Attach copies of all available evidence supporting the unauthorized disclosure claim.");
  write("Copies and Recordkeeping");
  write("- Send the original signed letter to the Federal Trade Commission.");
  write("- Include only copies of supporting documentation unless originals are expressly requested.");
  write("- Retain a complete copy of the letter and all enclosures for your personal records.");
  write("Delivery and Follow-Up");
  write("- While not mandatory, it is strongly recommended that the complaint be transmitted via a traceable delivery method (e.g., certified mail or courier with confirmation of receipt).");
  write("- After a reasonable period, follow up to confirm that the complaint has been received and appropriate action has been initiated.");

  doc.save("formal_complaint_unauthorized_disclosure.pdf");
};

export default function FormalComplaintUnauthorizedDisclosureForm() {
  return <FormWizard steps={steps} title="Formal Complaint Regarding Unauthorized Disclosure of Personal Information" subtitle="Complete the blanks to generate the complaint exactly as written" onGenerate={generatePDF} documentType="formalcomplaintftc" />;
}
