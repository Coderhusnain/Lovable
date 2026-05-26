import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Victim Info", fields: [
    { name: "senderName", label: "Your full name", type: "text", required: true },
    { name: "senderAddress", label: "Your address", type: "textarea", required: false },
    { name: "senderPhone", label: "Your phone", type: "text", required: false },
    { name: "senderEmail", label: "Your email", type: "text", required: false },
    { name: "ssn", label: "Social Security Number", type: "text", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: false },
  ]},
  { label: "Incident", fields: [
    { name: "priorContact", label: "Prior contact reference", type: "text", required: false },
    { name: "incidentDetails", label: "Incident details / supporting docs", type: "textarea", required: false },
    { name: "irsContact", label: "IRS division/contacted (if any)", type: "text", required: false },
  ]}
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 6, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.5) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(11); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.setFont("helvetica", "bold"); doc.text(lt, m, y); doc.setFont("helvetica", "normal"); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); } else { doc.text("____________________", sx, y); } y += lh + 1; };

  const title = "LETTER TO THE INTERNAL REVENUE SERVICE";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text(title, w / 2, y, { align: "center" }); y += 8;

  p("Internal Revenue Service\nAttention: Criminal Investigation Division", true);
  uf("Contact/Reference", v.priorContact);

  p("Re: Notice of Fraudulent Tax Filing");
  p("Dear Sir or Madam,");
  p(`This letter serves to confirm my prior communication with ${u(v.irsContact)}. Identification No. ${u(v.priorContact)}.`);
  p("I am a victim of identity theft, and my personal identifying information has been unlawfully used in connection with one or more fraudulent tax filings or related tax violations. For verification purposes, my identifying information is provided as follows:");
  uf("Social Security Number (SSN)", v.ssn);
  uf("Date of Birth", v.dob);

  p("Enclosed herewith are copies of documents supporting and evidencing the identity theft incident, including but not limited to:");
  if (v.incidentDetails) p(v.incidentDetails); else p("[Police report, FTC report, identity theft affidavit, relevant tax notices]");

  p("I respectfully request that the Internal Revenue Service update its records to reflect my correct and current information and take all appropriate steps to investigate and rectify any fraudulent or unlawful activity associated with my identity. Additionally, I request that any available preventive or protective measures be implemented to mitigate the risk of future tax-related fraud involving my personal information.");

  p("Please provide written confirmation once my records have been reviewed and the appropriate corrective and preventive actions have been taken.");

  p("Should you require any additional information or documentation, please do not hesitate to contact me at the address listed above.");

  p("Thank you for your prompt attention to this serious matter.");
  p("Yours sincerely,");
  y += 4;
  if (v.senderName) { doc.text(v.senderName, m, y); y += lh + 2; }
  if (v.senderAddress) { p(v.senderAddress); }
  if (v.senderPhone) uf("Phone", v.senderPhone);
  if (v.senderEmail) uf("Email", v.senderEmail);

  y += 6;
  p("Final Checklist – Letter to Notify the IRS of a Fraudulent Tax Filing", true);
  p("Requesting Party: ____________________");
  p("Execution\n• The letter must be signed. Witnessing or notarization is not required.");
  p("Supporting Documentation\n• Attach copies of all available evidence of identity theft or fraudulent tax activity, where applicable.");
  p("Copies\n• Send the original signed letter to the Internal Revenue Service.\n• Submit copies of supporting documents unless an original is specifically required.\n• Retain a complete copy of the letter and all enclosures for your records. If an original document is submitted, keep a copy.");
  p("Additional Guidance\n• While not mandatory, it is strongly recommended that the correspondence be sent via a trackable delivery method (e.g., certified mail with return receipt requested or overnight courier).\n• After a reasonable period, follow up with the IRS to confirm that the requested actions have been completed.");

  doc.save("letter_to_irs_fraudulent_tax_filing.pdf");
};

export default function LetterToIRSReportFraudulentTaxFilingForm() {
  return <FormWizard steps={steps} title="Letter to the IRS - Report Fraudulent Tax Filing" subtitle="Generate a formal notice to the IRS reporting fraudulent tax filing" onGenerate={generatePDF} documentType="letter-to-irs-fraudulent-tax-filing" />;
}
