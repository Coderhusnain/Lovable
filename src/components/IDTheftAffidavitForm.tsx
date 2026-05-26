import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Victim Information",
    fields: [
      { name: "fullName", label: "Full legal name", type: "text", required: false },
      { name: "dob", label: "Date of birth", type: "text", required: false },
      { name: "ssn", label: "Social Security Number", type: "text", required: false },
      { name: "idNumber", label: "Driver's license or ID (state and number)", type: "text", required: false },
      { name: "address", label: "Current residential address", type: "textarea", required: false },
      { name: "residedSince", label: "Resided at this address since", type: "text", required: false },
      { name: "dayPhone", label: "Daytime contact number", type: "text", required: false },
      { name: "eveningPhone", label: "Evening contact number", type: "text", required: false },
    ],
  },
  {
    label: "Fraud Details",
    fields: [
      { name: "billingName", label: "Billing Name", type: "text", required: false },
      { name: "billingAddress", label: "Billing Address", type: "textarea", required: false },
      { name: "accountNumber", label: "Account Number", type: "text", required: false },
      { name: "supportingDocs", label: "Supporting documents", type: "textarea", required: false },
    ],
  },
  {
    label: "Declaration",
    fields: [
      { name: "signature", label: "Signature Name", type: "text", required: false },
      { name: "date", label: "Date", type: "text", required: false },
      { name: "notaryDate", label: "Notary date line", type: "text", required: false },
    ],
  },
];

const v = (s?: string) => (s || "").trim();

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

  // Centered main title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title = "ID Theft Affidavit";
  doc.text(_title, width / 2, y, { align: "center" });
  y += 10;

  // Victim Identification Information
  write("Victim Identification Information", true);
  write("My full legal name is: " + (v(values.fullName) || "________________________"));
  write("Date of birth: " + (v(values.dob) || "________________________"));
  write("Social Security Number: " + (v(values.ssn) || "________________________"));
  write("Driver’s license or government-issued identification (state and number): " + (v(values.idNumber) || "________________________"));
  write("Current residential address: " + (v(values.address) || "________________________"));
  write("I have resided at this address since: " + (v(values.residedSince) || "________________________"));
  write("Daytime contact number: " + (v(values.dayPhone) || "________________________"));
  write("Evening contact number: " + (v(values.eveningPhone) || "________________________"));

  // Cooperation
  write("", false, 4);
  write("Victim’s Cooperation With Law Enforcement", true);
  write("I hereby affirm my willingness to cooperate fully in the investigation and prosecution of the individual(s) responsible for the fraudulent activity described herein.");
  write("I further authorize the disclosure of the information contained in this affidavit to law enforcement agencies for the sole purpose of facilitating the investigation and prosecution of the aforementioned fraudulent conduct.");

  // Statement
  write("", false, 4);
  write("Statement of Fraudulent Account Activity", true);
  write("As a direct result of the incident(s) detailed in the Identity Theft Affidavit, one or more account(s) were unlawfully opened with your organization in my name, without my knowledge, consent, or authorization, through the misuse of my personal identifying information and/or documentation.");
  write("During the relevant period in which the fraudulent account(s) were established, I maintained the following legitimate account with your organization:");
  write("Billing Name: " + (v(values.billingName) || "________________________"));
  write("Billing Address: " + (v(values.billingAddress) || "________________________"));
  write("Account Number: " + (v(values.accountNumber) || "________________________"));

  write("", false, 6);
  write("Final Compliance Checklist for Identity Theft Affidavit", true, 2.4);
  write("Legal Execution");
  write("This affidavit must be executed in the presence of a duly authorized notary public.");
  write("The completed affidavit, together with copies of all supporting documentation, should be transmitted to each affected organization via certified mail, return receipt requested.");
  write("Record Retention");
  write("You are advised to retain a complete copy of this affidavit and all accompanying documents for your personal records.");
  write("Attachments");
  write("The Fraudulent Account Statement shall be appended to this affidavit, along with any additional supporting evidence available.");

  write("Legal Consultation Advisory");
  write("Legal counsel should be sought with respect to any matters of a unique or complex nature that are not addressed within this affidavit.");

  write("Grounds for Amendment or Resubmission");
  write("This affidavit may be updated or reissued for the following purposes:");
  write("• To supplement previously provided information");
  write("• To submit an affidavit to an additional organization");

  write("Supporting Evidence");
  write("I have reported the incidents described herein to a law enforcement authority, and a formal report has been prepared.");
  write("The following supporting documents are attached to this affidavit:");
  write(v(values.supportingDocs) || "________________________________________");
  write("________________________________________");
  write("________________________________________");

  write("Declaration and Signature");
  write("I declare under penalty of perjury that the information set forth in this affidavit is true and correct to the best of my knowledge and belief.");
  write("Signature: " + (v(values.signature) || "________________________"));
  write("Date: " + (v(values.date) || "________________________"));

  write("Notarial Acknowledgment", true);
  write("Subscribed and sworn to (or affirmed) before me on this ______ day of __________,");
  write("Notary Public Signature: __________________________");

  doc.save("id_theft_affidavit.pdf");
};

export default function IDTheftAffidavitForm() {
  return <FormWizard steps={steps} title="ID Theft Affidavit" subtitle="Complete the fields to generate the ID theft affidavit" onGenerate={generatePDF} documentType="id-theft-affidavit" />;
}
