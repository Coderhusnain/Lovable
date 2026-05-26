import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Your Information", fields: [
    { name: "fullName", label: "Full legal name", type: "text", required: true },
    { name: "ssn", label: "Social Security Number", type: "text", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: false },
    { name: "address", label: "Current residential address", type: "textarea", required: true },
  ]},
  { label: "Security Freeze PINs & Proof", fields: [
    { name: "equifaxPin", label: "Equifax PIN", type: "text", required: false },
    { name: "transunionPin", label: "TransUnion PIN", type: "text", required: false },
    { name: "experianPin", label: "Experian PIN", type: "text", required: false },
    { name: "proofDocs", label: "Proof of identity / residence (describe)", type: "textarea", required: false },
  ]},
];

const line = (value?: string) => (value || "").trim() || "________________________________________";

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lh = 5.3;
  let y = 18;

  const ensure = (needed = 8) => { if (y + needed > 282) { doc.addPage(); y = 18; } };
  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lh + gap;
  };

  // Equifax
  ensure(12);
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("Equifax Security Freeze", width / 2, y, { align: "center" }); y += 8;
  write("Equifax Security Freeze\nP.O. Box 105788\nAtlanta, GA 30348", true);
  write("Dear Sir or Madam,");
  write(`I hereby formally request the permanent removal of the security freeze currently placed on my credit file.`);
  write(`My full legal name is ${line(v.fullName)}.`);
  write(`My Social Security Number is ${line(v.ssn)}.`);
  write(`My date of birth is ${line(v.dob)}.`);
  write(`My Security Freeze Personal Identification Number (PIN) is ${line(v.equifaxPin)}.`);
  write("My current residential address is:");
  write(line(v.address));
  write("I have resided at this address continuously for the past two (2) years.");
  write(`For verification purposes, I have enclosed a copy of ${line(v.proofDocs)} as proof of identity and a copy of ${line(v.proofDocs)} as proof of my current residence.`);
  write("Thank you for your prompt attention to this request.");
  write("Yours sincerely,");
  write("[Signature]");
  write(line(v.fullName) || "[Printed Name]");

  // New page for TransUnion
  doc.addPage(); y = 18;
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("TransUnion Credit Freeze Removal Request", width / 2, y, { align: "center" }); y += 8;
  write("TransUnion LLC\nP.O. Box 2000\nChester, PA 19016", true);
  write("Dear Sir or Madam,");
  write("I respectfully request the permanent removal of the security freeze currently maintained on my credit file.");
  write(`My full legal name is ${line(v.fullName)}.`);
  write(`My Social Security Number is ${line(v.ssn)}.`);
  write(`My date of birth is ${line(v.dob)}.`);
  write(`My Security Freeze Personal Identification Number (PIN) is ${line(v.transunionPin)}.`);
  write("My current residential address is:");
  write(line(v.address));
  write("I have resided at this address for the past two (2) years.");
  write("Enclosed are copies of documentation verifying my identity and current residence.");
  write("Thank you for your cooperation.");
  write("Yours sincerely,");
  write("[Signature]");
  write(line(v.fullName) || "[Printed Name]");

  // Experian
  doc.addPage(); y = 18;
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("Experian Credit Freeze Removal Request", width / 2, y, { align: "center" }); y += 8;
  write("Experian Security Freeze\nP.O. Box 9554\nAllen, TX 75013", true);
  write("Dear Sir or Madam,");
  write("Please accept this letter as my formal request to permanently remove the security freeze presently affecting my credit file.");
  write(`My full legal name is ${line(v.fullName)}.`);
  write(`My Social Security Number is ${line(v.ssn)}.`);
  write(`My date of birth is ${line(v.dob)}.`);
  write(`My Security Freeze Personal Identification Number (PIN) is ${line(v.experianPin)}.`);
  write("My current residential address is:");
  write(line(v.address));
  write("I have lived at this address for the past two (2) years.");
  write("Attached are copies of documents verifying my identity and proof of residence.");
  write("Thank you for your prompt assistance in this matter.");
  write("Yours sincerely,");
  write("[Signature]");
  write(line(v.fullName) || "[Printed Name]");

  // Final checklist
  doc.addPage(); y = 18;
  write("Final Compliance Checklist", true, 2.2);
  write("Recordkeeping and Submission Guidelines", true);
  write("• Send the original signed letter to the credit bureau via certified mail.");
  write("• Include only copies of supporting documents (retain originals for your records).");
  write("• Maintain a copy of the letter and all enclosures for your files.");
  write("• Follow up after a reasonable period to confirm that the security freeze has been removed.");
  write("Reasons for Updating or Resubmitting", true);
  write("• To correct previously submitted information");
  write("• To submit a similar request to another credit bureau");

  doc.save("request_to_remove_credit_freeze.pdf");
};

export default function RequestToRemoveCreditFreezeForm() {
  return <FormWizard steps={steps} title="Request to Remove Credit Freeze" subtitle="Complete the details to generate removal letters for each credit bureau" onGenerate={generatePDF} documentType="request-remove-credit-freeze" />;
}
