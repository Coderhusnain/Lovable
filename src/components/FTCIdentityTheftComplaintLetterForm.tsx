import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Complaint Details",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: false },
      { name: "dateOfBirth", label: "Date of Birth", type: "text", required: false },
      { name: "hoursLost", label: "Hours spent addressing the issue", type: "text", required: false },
      { name: "policeDepartment", label: "Police Department", type: "text", required: false },
      { name: "policeState", label: "Police Department State", type: "text", required: false },
    ],
  },
  {
    label: "Fraud Details",
    fields: [
      { name: "fraudActivity", label: "Fraudulent activity", type: "text", required: false },
      { name: "incidentDescription", label: "Identity theft incident description", type: "textarea", required: false },
      { name: "consequences", label: "Consequences suffered", type: "textarea", required: false },
      { name: "companyIssues", label: "Issues when communicating with companies", type: "textarea", required: false },
      { name: "supportingDocs", label: "Supporting documentation", type: "textarea", required: false },
    ],
  },
];

const line = (value?: string) => (value || "").trim() || "________________________________________";

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.3;
  let y = 18;

  const ensure = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Centered main title
  ensure(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title3 = "FTC identity theft complaint letter";
  doc.text(_title3, w / 2, y, { align: "center" });
  y += 10;
  write(line());
  write(line());
  write(line());
  write("Consumer Response Center");
  write("Federal Trade Commission");
  write("600 Pennsylvania Avenue, N.W.");
  write("Washington, D.C. 20580");
  write("Re: FTC Identity Theft Complaint");
  write("Dear Sir or Madam,");
  write("I am writing to formally notify the Federal Trade Commission that my identity has been stolen and used for fraudulent purposes.");
  write("My personal identifying information is as follows:");
  write(`Full Name: ${line(values.fullName)}`);
  write(`Date of Birth: ${line(values.dateOfBirth)}`);
  write("My identity has been used in connection with the following type(s) of fraudulent activity:");
  write(`- ${line(values.fraudActivity)}`);
  write("The identity theft incident may be described as follows:");
  write(line(values.incidentDescription));
  write("As a result of this identity theft, I have experienced the following consequences:");
  write(`- ${line(values.consequences)}`);
  write(`Additionally, I have lost approximately ${line(values.hoursLost)} hours addressing matters related to this identity theft. Based on the information available to me, the identity thief used the internet to open accounts or to purchase goods or services fraudulently.`);
  write("At this time, I do not have any information regarding the identity or whereabouts of the individual responsible for this theft.");
  write(`I have reported this matter to law enforcement and filed a police report. The report was filed with the ${line(values.policeDepartment)} Police Department in the State of ${line(values.policeState)}. A copy of the police report is enclosed for your reference.`);
  write("I have also encountered the following issues when communicating with companies regarding this identity theft:");
  write(line(values.companyIssues));
  write("Please contact me at the address listed above should you require any additional information or documentation.");
  write("Thank you for your prompt attention to this matter.");
  write("Yours sincerely,");
  write("Signature");
  write("Printed Name");

  write("Final Checklist - FTC Identity Theft Complaint", true, 2.2);
  write("Requesting Party: ____________________");
  write("Execution", true);
  write("- The complaint letter must be signed. Witnessing or notarization is not required.");
  write("Supporting Documentation", true);
  write("- Attach copies of all relevant documents supporting the identity theft claim, where applicable.");
  write("Copies", true);
  write("- Send the original signed letter to the Federal Trade Commission.");
  write("- Submit copies of supporting documents unless an original is specifically required.");
  write("- Retain a complete copy of the letter and all enclosures for your records. If an original document is submitted, keep a copy.");
  write("Additional Guidance", true);
  write("- Although not mandatory, sending the letter via a trackable delivery method (e.g., certified mail with return receipt requested or overnight courier) is strongly recommended.");
  write("- After a reasonable period, follow up to confirm that the complaint has been received and appropriately processed.");

  doc.save("ftc_identity_theft_complaint_letter.pdf");
};

export default function FTCIdentityTheftComplaintLetterForm() {
  return <FormWizard steps={steps} title="FTC Identity Theft Complaint Letter" subtitle="Fill the fields to generate the FTC identity theft complaint letter" onGenerate={generatePDF} documentType="ftc-identity-theft-complaint-letter" />;
}
