import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties",
    fields: [
      { name: "effectiveDate", label: "Agreement Date", type: "date", required: true },
      { name: "licenseeName", label: "Licensee Full Legal Name", type: "text", required: true },
      { name: "licenseeAddress", label: "Licensee Principal Address", type: "textarea", required: true },
      { name: "licensorName", label: "Licensor Full Legal Name", type: "text", required: true },
      { name: "licensorAddress", label: "Licensor Principal Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Software and License",
    fields: [
      { name: "scheduleA", label: "Schedule A - Software Description", type: "textarea", required: true },
      { name: "singleComputer", label: "Single Designated Computer System", type: "text", required: true },
      { name: "scheduleB", label: "Schedule B - License Fee Terms", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 3: Support Services",
    fields: [
      { name: "supportHours", label: "Support Business Hours Text", type: "text", required: true },
      { name: "responseHours", label: "Support Response (Business Hours)", type: "text", required: true },
      { name: "criticalDays", label: "Critical Issue Resolution (Business Days)", type: "text", required: true },
      { name: "includedMonths", label: "Support Included Months", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Dispute and Governing Law",
    fields: [
      { name: "arbitrationCityState", label: "Arbitration City, State", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
    ],
  },
  {
    label: "Step 5: Licensor Signature",
    fields: [
      { name: "licensorBy", label: "Licensor - By", type: "text", required: true },
      { name: "licensorSignName", label: "Licensor - Name", type: "text", required: true },
      { name: "licensorSignTitle", label: "Licensor - Title", type: "text", required: true },
      { name: "licensorSignDate", label: "Licensor - Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 6: Licensee Signature",
    fields: [
      { name: "licenseeBy", label: "Licensee - By", type: "text", required: true },
      { name: "licenseeSignName", label: "Licensee - Name", type: "text", required: true },
      { name: "licenseeSignTitle", label: "Licensee - Title", type: "text", required: true },
      { name: "licenseeSignDate", label: "Licensee - Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.2;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));

  const p = (text: string, bold = false, gap = 1.4) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "SOFTWARE LICENSE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  p(
    `This Software License Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, 12)}, by and between ${u(v.licenseeName)}, with its principal address at ${u(v.licenseeAddress)} ("Licensee"), and ${u(v.licensorName)}, with its principal place of business at ${u(v.licensorAddress)} ("Licensor").`
  );
  p("1. DEFINITIONS", true);
  p(
    `(a) "Software" means the computer programs, including object code and source code (if provided), related documentation, and all modifications, enhancements, updates, or upgrades thereto, as more fully described in Schedule A attached hereto: ${u(v.scheduleA)}.`
  );
  p(
    '(b) "Install" means the act of placing, loading, or copying the Software onto a computer\'s hard drive, solid-state drive, CD-ROM, or any other storage medium.'
  );
  p(
    '(c) "Use" means: i. Executing or loading the Software into the random access memory (RAM) or other primary storage device of a computer; and ii. Making a single copy of the Software solely for archival or emergency restart purposes, provided such copy is not installed or used on any other computer.'
  );
  p("2. GRANT OF LICENSE", true);
  p(
    `Licensor hereby grants to Licensee a personal, non-exclusive, non-transferable license to install and use the Software on a single designated computer system owned or controlled by Licensee (${u(v.singleComputer)}), subject to the terms and conditions of this Agreement.`
  );
  p("3. TERM OF LICENSE", true);
  p("This License shall commence on the Effective Date and shall remain in force until terminated in accordance with Clause 5 herein.");
  p("4. LICENSE FEE", true);
  p(`Licensee shall pay to Licensor the license fee specified in Schedule B, in the manner and within the time frame stated therein: ${u(v.scheduleB)}.`);
  p("5. TERMINATION", true);
  p("Licensor may terminate this Agreement immediately upon written notice if Licensee breaches any material provision herein or becomes bankrupt or insolvent.");
  p("6. RETURN OR DESTRUCTION OF SOFTWARE", true);
  p("Upon termination, Licensee shall immediately cease using the Software and return or destroy all copies, in whole or in part, including any modifications. Licensor may verify compliance through inspection.");
  p("7. TITLE AND OWNERSHIP", true);
  p("The Software is licensed, not sold. All rights, title, and interest, including all intellectual property rights therein, remain vested in Licensor.");
  p("8. MODIFICATIONS AND ENHANCEMENTS", true);
  p("Licensee shall not reverse engineer, decompile, disassemble, adapt, translate, or create derivative works of the Software without prior written consent of Licensor.");
  p("9. WARRANTY DISCLAIMER", true);
  p('The Software is provided "AS IS", without any warranties, whether express, implied, or statutory, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.');
  p("10. LIMITED REMEDIES", true);
  p("(a) Refund of the license fee paid for the affected period; or (b) Repair or replacement of the defective Software.");
  p("11. LIMITATION OF LIABILITY", true);
  p("Neither party shall be liable for any indirect, incidental, special, or consequential damages. Licensor's total liability shall not exceed the total license fees paid in the twelve (12) months preceding the claim.");
  p("12. CONFIDENTIALITY", true);
  p("Licensee shall treat the Software and Licensor's proprietary information as confidential and protect it with the same degree of care as its own confidential information.");
  p("13. MAINTENANCE & SUPPORT SERVICES", true);
  p(`13.1 Scope of Services - Subject to payment of applicable fees, Licensor shall provide updates/upgrades, technical support during ${u(v.supportHours)}, and commercially reasonable error correction.`);
  p("13.2 Exclusions - No custom development, no support for misuse/unauthorized modifications/third-party conflicts, and no on-site support unless separately agreed in writing.");
  p(`13.3 Service Levels - Licensor will use reasonable commercial efforts to respond within ${u(v.responseHours, 2)} business hours and resolve critical issues within ${u(v.criticalDays, 2)} business days, subject to Licensee cooperation.`);
  p(`13.4 Fees - Maintenance and support are included for the first ${u(v.includedMonths, 2)} months from the Effective Date; thereafter support is subject to renewal and annual maintenance fees.`);
  p("13.5 Termination of Support - Licensor may discontinue support for any version of the Software twelve (12) months after release of a subsequent major version.");
  p("14. DISPUTE RESOLUTION", true);
  p(`Any dispute shall be resolved through binding arbitration under the American Arbitration Association rules in ${u(v.arbitrationCityState)}.`);
  p("15. ATTORNEYS' FEES", true);
  p("The prevailing party in any action to enforce this Agreement shall be entitled to reasonable attorneys' fees and costs.");
  p("16. GENERAL PROVISIONS", true);
  p(`(a) Entire Agreement. (b) Amendments must be in writing and signed by authorized representatives. (c) Governing Law: State of ${u(v.governingLawState)}. (d) Notices must be in writing and deemed given on delivery via approved methods. (e) Independent Parties: nothing creates agency, partnership, or joint venture.`);
  p("17. ASSIGNMENT", true);
  p("Licensee shall not assign or transfer this Agreement without Licensor's prior written consent.");
  p("18. EXECUTION", true);
  p("This Agreement may be executed in counterparts, each deemed an original.");
  p("LICENSOR:", true);
  p(`By: ${u(v.licensorBy)}   Name: ${u(v.licensorSignName)}   Title: ${u(v.licensorSignTitle)}   Date: ${u(v.licensorSignDate, 10)}`);
  p("LICENSEE:", true);
  p(`By: ${u(v.licenseeBy)}   Name: ${u(v.licenseeSignName)}   Title: ${u(v.licenseeSignTitle)}   Date: ${u(v.licenseeSignDate, 10)}`);

  doc.save("software_license_agreement.pdf");
};

export default function SoftwareLicense() {
  return (
    <FormWizard
      steps={steps}
      title="Software License Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="softwarelicense"
      preserveStepLayout
    />
  );
}