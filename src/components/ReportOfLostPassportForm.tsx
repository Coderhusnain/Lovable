import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Personal", fields: [
    { name: "contactName", label: "State Department contact", type: "text", required: false },
    { name: "fullName", label: "Full name", type: "text", required: true },
    { name: "residentialAddress", label: "Residential address", type: "text", required: true },
    { name: "gender", label: "Gender", type: "text", required: false },
    { name: "placeOfBirth", label: "Place of birth", type: "text", required: true },
    { name: "dateOfBirth", label: "Date of birth", type: "date", required: true },
  ]},
  { label: "Passport Details", fields: [
    { name: "locationOfLoss", label: "Lost in / location of loss", type: "text", required: true },
    { name: "replacementLocation", label: "Replacement passport location", type: "text", required: false },
    { name: "replacementOffice", label: "Replacement passport office", type: "text", required: false },
    { name: "replacementDate", label: "Replacement passport date", type: "date", required: false },
  ]},
  { label: "Circumstances", fields: [
    { name: "circumstances", label: "Describe circumstances", type: "textarea", required: false },
  ]},
  { label: "Supporting", fields: [
    { name: "ds64", label: "DS-64 completed?", type: "text", required: false },
    { name: "ds11", label: "DS-11 completed?", type: "text", required: false },
    { name: "paymentProof", label: "Payment proof", type: "text", required: false },
  ]},
  { label: "Final", fields: [
    { name: "preparedBy", label: "Prepared by", type: "text", required: false },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const right = 194;
  let y = 12;
  const empty = (count: number) => "_".repeat(count);
  const line = (text: string, bold = false, gap = 4) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 10.5 : 9.2);
    const lines = doc.splitTextToSize(text, right - left);
    // Page break if content would overflow
    const pageHeight = doc.internal.pageSize.getHeight();
    const estimatedHeight = lines.length * 4.1 + gap;
    const bottomMargin = 16;
    if (y + estimatedHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 12; // reset to top margin on new page
    }
    doc.text(lines, left, y);
    y += estimatedHeight;
  };
    const contactName = v.contactName?.trim() || empty(20);
    const locationOfLoss = v.locationOfLoss?.trim() || empty(20);
    const fullName = v.fullName?.trim() || empty(20);
    const residentialAddress = v.residentialAddress?.trim() || empty(20);
    const gender = v.gender?.trim() || empty(10);
    const placeOfBirth = v.placeOfBirth?.trim() || empty(20);
    const dateOfBirth = v.dateOfBirth?.trim() || empty(20);
    const replacementLocation = v.replacementLocation?.trim() || empty(20);
    const replacementOffice = v.replacementOffice?.trim() || empty(20);
    const replacementDate = v.replacementDate?.trim() || empty(20);

    // Main centered bold heading
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("REPORT OF LOST PASSPORT", pageWidth / 2, y, { align: "center" });
    y += 10;
    doc.setFontSize(9.2);

    line("U.S. Department of State");
    line("Passport Services");
    line("Consular Lost/Stolen Passport Section");
    line("1111 19th Street, NW, Suite 500");
    line("Washington, DC 20036");
    line("Re: Report of Lost Passport", true);
    line("Dear Sir or Madam,");
    line(`This letter serves to confirm my prior communication with ${contactName} of the U.S. Department of State regarding the loss of my passport.`);
    line(`My passport was lost in ${locationOfLoss}. I am unable to determine the precise date or time of the loss. The following personal information was provided to the local passport office in connection with this matter:`);
    line(`Full Name: ${fullName}`);
    line(`Residential Address: ${residentialAddress}`);
    line(`Gender: ${gender}`);
    line(`Place of Birth: ${placeOfBirth}`);
    line(`Date of Birth: ${dateOfBirth}`);
    line("Please acknowledge receipt of this notice and advise if any further action is required on my part.");
    line("Yours faithfully,");
    y += 2;
    line("Signature");
    y += 3;
    line("Printed Name");
    y += 5;
    line(`Place of Birth: ${placeOfBirth}`);
    line(`Date of Birth: ${dateOfBirth}`);
    line("My passport was lost under the following circumstances:--------------------------------------------------------------");
    line("Enclosed herewith is a copy of U.S. Department of State Form DS-64 (Statement Regarding a Lost or Stolen Passport).");
    line(`In addition, I have applied for a replacement passport at ${replacementLocation}, ${replacementOffice} on ${replacementDate}.`);
    line("Also enclosed for your review are copies of the following documents:");
    line("•\tU.S. Department of State Form DS-11 (Application for a U.S. Passport or Registration), duly completed and signed at the local passport office; and");
    line("•\tProof of payment of the applicable passport application fee.");
    line("Should you require any further information or documentation, please do not hesitate to contact me at the address listed above.");

    y += 8;
    line("Final Checklist – Report of Lost or Stolen Passport", true);
    line("Requesting Party: ____________________");
    line("Execution");
    line("•\tThe letter must be signed. Witnessing or notarization is not required.");
    line("Copies");
    line("•\tSend the original signed letter to the U.S. Department of State.");
    line("•\tSubmit copies of supporting documents unless an original is specifically required.");
    line("•\tInclude the original copy of Form DS-64 (Statement Regarding Lost or Stolen Passport).");
    line("•\tRetain a complete copy of the letter and all enclosures for your records. If an original document is submitted, keep a copy.");
    line("Additional Guidance");
    line("•\tWhile not mandatory, it is strongly recommended that this correspondence be sent via a trackable delivery method (e.g., certified mail with return receipt requested or overnight courier).");
    line("•\tAfter a reasonable period, follow up to confirm that the requested action has been completed.");

    if (v.circumstances?.trim()) {
      y += 6;
      line("User Notes / Additional Circumstances", true);
      line(v.circumstances.trim());
    }

    if (v.ds64?.trim() || v.ds11?.trim() || v.paymentProof?.trim() || v.preparedBy?.trim()) {
      y += 4;
      line("Supplemental Information", true);
      if (v.ds64?.trim()) line(`DS-64 completed: ${v.ds64.trim()}`);
      if (v.ds11?.trim()) line(`DS-11 completed: ${v.ds11.trim()}`);
      if (v.paymentProof?.trim()) line(`Payment proof: ${v.paymentProof.trim()}`);
      if (v.preparedBy?.trim()) line(`Prepared by: ${v.preparedBy.trim()}`);
    }

  doc.save("report_of_lost_passport.pdf");
};

export default function ReportOfLostPassportForm() {
  // Provide a debug hook for direct PDF generation when the wizard completes
  return (
    <FormWizard
      steps={steps}
      title="Report Of Lost Passport"
      subtitle="Complete each step to generate your document"
      onGenerate={(formData) => {
        try {
          console.info("ReportOfLostPassportForm: onGenerate invoked", formData);
          generatePDF(formData as Record<string,string>);
        } catch (err) {
          console.error("Error generating PDF:", err);
          // rethrow so consumers still see the error in dev tools
          throw err;
        }
      }}
      documentType="reportoflostpassport"
      preserveStepLayout
    />
  );
}
