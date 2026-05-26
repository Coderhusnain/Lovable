import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Letter Info", fields: [
    { name: "letterDate", label: "Date", type: "date", required: false },
    { name: "collectionAgency", label: "Collection Agency / Company", type: "text", required: true },
    { name: "recipientAddress", label: "Recipient Address", type: "textarea", required: false },
    { name: "transactions", label: "Transactions (date / description / amount)", type: "textarea", required: false },
    { name: "enclosures", label: "Enclosed documents", type: "textarea", required: false },
    { name: "senderName", label: "Your full name", type: "text", required: true },
    { name: "senderAddress", label: "Your address", type: "textarea", required: false },
    { name: "senderPhone", label: "Your phone", type: "text", required: false },
    { name: "senderEmail", label: "Your email", type: "text", required: false },
  ]},
  { label: "Checklist", fields: [
    { name: "requestingParty", label: "Requesting Party (display)", type: "text", required: false },
    { name: "executionNote", label: "Execution note", type: "textarea", required: false },
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

  const title = "LETTER TO CEASE AND DESIST COLLECTION";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text(title, w / 2, y, { align: "center" }); y += 8;

  p(`Re: Ceasing Collection Activity`, true);
  p(`Date: ${u(v.letterDate, 10)}`);

  // recipient
  uf("To", v.collectionAgency);
  if (v.recipientAddress) p(v.recipientAddress);

  p("Dear Sir or Madam,");
  p("I am writing to formally request that you immediately cease all collection activities relating to the following purchase(s), which were fraudulently incurred as a result of identity theft:");

  // transactions block
  if (v.transactions) {
    p("Date    Item/Description    Amount");
    p(v.transactions);
  } else {
    p("Date    Item/Description    Amount\n\n\t\t");
  }

  p("I have recently been the victim of identity theft, and the above-referenced transactions were made without my knowledge, consent, or authorization.");

  p("Enclosed herewith are copies of documents evidencing the identity theft incident, including but not limited to:");
  if (v.enclosures) p(v.enclosures); else p("[List of enclosed documents: police report, FTC report, identity theft affidavit, credit report excerpts, correspondence, etc.]");

  p("As a direct result of this identity theft, I am not legally responsible for the debts or obligations arising from the above-listed transactions. Accordingly, I demand that all collection efforts cease immediately and that my account be updated to reflect that I bear no liability for these charges.");

  p("Please provide written confirmation that collection activity has been discontinued and that no adverse credit reporting will be made or maintained in connection with these fraudulent accounts.");

  p("Should you require additional information or documentation, please contact me at the address listed above.");

  p("Thank you for your prompt attention to this matter.");
  p("Yours sincerely,");
  y += 4;
  if (v.senderName) { doc.text(v.senderName, m, y); y += lh + 2; }
  if (v.senderAddress) { p(v.senderAddress); }
  if (v.senderPhone) uf("Phone", v.senderPhone);
  if (v.senderEmail) uf("Email", v.senderEmail);

  // Final checklist
  y += 4;
  p("Final Checklist – Request to Cease Collection Activity", true);
  p("Requesting Party: ____________________");
  p("Collection Agency: ____________________");
  p("\nExecution\n• The letter must be signed. Witnessing or notarization is not required.");
  p("\nSupporting Documentation\n• Attach copies of all available evidence relating to the identity theft incident, where applicable.");
  p("\nCopies\n• Send the original signed letter to the collection agency.\n• Submit copies of supporting documents unless an original is specifically required.\n• Retain a complete copy of the letter and all enclosures for your records. If an original document is submitted, keep a copy.");
  p("\nAdditional Guidance\n• While not mandatory, it is strongly recommended that this correspondence be sent via a trackable delivery method (e.g., certified mail with return receipt requested or overnight courier).\n• After a reasonable period, follow up to confirm that the requested actions have been completed.");

  doc.save("letter_to_cease_and_desist_collection.pdf");
};

export default function LetterToCeaseAndDesistCollectionForm() {
  return <FormWizard steps={steps} title="Letter to Cease and Desist Collection" subtitle="Generate a formal cease-and-desist collection letter" onGenerate={generatePDF} documentType="letter-to-cease-and-desist-collection" />;
}
