import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Your Information",
    fields: [
      { name: "requesterName", label: "Your full name", type: "text", required: true },
      { name: "requesterAddress", label: "Your mailing address", type: "textarea", required: true },
      { name: "requesterPhone", label: "Phone number", type: "phone" },
      { name: "requesterEmail", label: "Email address", type: "email" },
    ],
  },
  {
    label: "Internet Service Provider",
    fields: [
      { name: "ispName", label: "Internet Service Provider Name", type: "text", required: true },
      { name: "ispAddress", label: "Provider address", type: "textarea" },
      { name: "accountNumber", label: "Account number", type: "text" },
    ],
  },
  { label: "Final Checklist", fields: [] },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.4) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  const title = "REQUEST TO CANCEL UNAUTHORIZED INTERNET SERVICE";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`To: ${u(v.ispName)}`);
  if (v.ispAddress) p(v.ispAddress);
  p(`Subject: Request for Termination of Fraudulently Opened Account`, true);
  p(`Account Number: ${u(v.accountNumber, 6)}`);

  p(`Dear Sir or Madam,`);
  p("I hereby formally request the immediate termination of the internet service associated with the above-referenced account number. This account was fraudulently opened without my authorization, and I am the victim of identity theft.");
  p("Enclosed herewith are copies of the relevant documents evidencing the identity theft incident and supporting this request.");
  p("I respectfully request that the account be closed without penalty, that all charges incurred as a result of the fraudulent activity be canceled, and that no further billing or collection action be taken against me in connection with this account.");
  p("Additionally, I request that a fraud alert be placed on my name and/or customer profile to prevent any future unauthorized accounts from being opened in my name. Should any attempt be made to establish new service using my personal information, I request that I be contacted immediately.");
  p("Please provide written confirmation once the above actions have been completed. Should you require any additional information or documentation, you may contact me at the address listed above.");
  p("Thank you for your prompt attention and cooperation in this matter.");

  p("Yours sincerely,");
  y += 4;
  p(u(v.requesterName));
  p(u(v.requesterAddress));

  p("FINAL CHECKLIST", true);
  const checklist = [
    "Ensure the letter is duly signed. Notarization or witnessing is not required unless expressly requested by the Internet Service Provider.",
    "Attach copies of all available documentation evidencing the identity theft incident.",
    "Send the original letter to the Internet Service Provider.",
    "Enclose only photocopies of supporting documents unless original documents are specifically required.",
    "Retain a complete copy of the letter and all enclosures for your personal records.",
    "Use a traceable delivery method (certified mail or courier) where practical.",
    "Follow up with the Internet Service Provider to confirm that the account has been terminated and all requested actions have been completed.",
  ];
  checklist.forEach((item) => p(`• ${item}`));

  p(`Jurisdiction: ${u(v.requesterAddress)}`);
  doc.save("request_to_cancel_unauthorized_internet_service.pdf");
};

export default function RequestToCancelUnauthorizedInternetService() {
  return <FormWizard steps={steps} title="Request to Cancel Unauthorized Internet Service" subtitle="Complete the steps to generate your request letter" onGenerate={generatePDF} documentType="request-cancel-unauthorized-internet-service" />;
}
