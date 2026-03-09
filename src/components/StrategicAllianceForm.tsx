import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partyAName", label: "Party A name", type: "text", required: true },
      { name: "partyAState", label: "Party A state/country of organization", type: "text", required: false },
      { name: "partyAAddress", label: "Party A principal place of business", type: "text", required: false },
      { name: "partyBName", label: "Party B name", type: "text", required: true },
      { name: "partyBState", label: "Party B state/country of organization", type: "text", required: false },
      { name: "partyBAddress", label: "Party B principal place of business", type: "text", required: false },
    ],
  },
  {
    label: "Term and Liability Settings",
    fields: [
      { name: "specifiedDate", label: "Specified expiration date", type: "text", required: false },
      { name: "autoRenewPeriod", label: "Auto-renewal period", type: "text", required: false },
      { name: "terminationNotice", label: "Termination notice period", type: "text", required: false },
      { name: "liabilityCap", label: "Aggregate liability cap basis", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
      { name: "jurisdictionVenue", label: "Jurisdiction venue", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partyASignerName", label: "Party A signer name", type: "text", required: false },
      { name: "partyASignerTitle", label: "Party A signer title", type: "text", required: false },
      { name: "partyASignerDate", label: "Party A sign date", type: "date", required: false },
      { name: "partyBSignerName", label: "Party B signer name", type: "text", required: false },
      { name: "partyBSignerTitle", label: "Party B signer title", type: "text", required: false },
      { name: "partyBSignerDate", label: "Party B sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "STRATEGIC ALLIANCE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and between ${u(values.partyAName, 14)}, a company organized under the laws of ${u(values.partyAState, 12)}, with principal place of business at ${u(values.partyAAddress, 14)} ("Party A"), and ${u(values.partyBName, 14)}, a company organized under the laws of ${u(values.partyBState, 12)}, with principal place of business at ${u(values.partyBAddress, 14)} ("Party B").`);
  p('Party A and Party B may hereinafter be collectively referred to as the "Parties" or individually as a "Party."');
  p("The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein.", false, 3);

  p("1. SCOPE OF STRATEGIC ALLIANCE", true);
  p("1.1 Joint Services", true);
  p("Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards.");
  p("1.2 Ownership of Intellectual Property", true);
  p("Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created prior to or independently of this Agreement.");
  p("1.3 Marketing and Promotion", true);
  p("Both Parties may promote the strategic alliance; however, all marketing materials or promotional statements require prior written approval of the Party whose services or intellectual property are referenced.");

  p("2. PERIOD OF PERFORMANCE", true);
  p("2.1 Effective Date", true);
  p(`This Agreement shall become effective on ${u(values.effectiveDate, 12)}.`);
  p("2.2 Term and Expiration", true);
  p(`The Agreement shall continue until the later of (a) ${u(values.specifiedDate, 12)}, or (b) completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`);
  p("2.3 Automatic Renewal", true);
  p(`This Agreement shall automatically renew for successive periods of ${u(values.autoRenewPeriod, 10)}, unless either Party provides written notice of termination at least ${u(values.terminationNotice, 8)} prior to the end of the current term.`);
  p("2.4 Early Termination", true);
  p("The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");

  p("3. MANAGEMENT", true);
  p("3.1 Designated Representatives", true);
  p("Each Party shall designate a senior officer, partner, or other responsible person to oversee administration, client relationships, billing, and compliance.");
  p("3.2 Authority and Responsibility", true);
  p("Designated representatives shall coordinate projects, resolve operational issues, and act as primary liaisons.");

  p("4. CONFIDENTIAL INFORMATION", true);
  p("Each Party may receive confidential/proprietary information and agrees to maintain strict confidence, use only for performance, not alter/copy/disclose without consent, and return/destroy materials upon request or termination.");
  p("Exceptions include information that becomes public without breach, lawfully obtained from third parties, or independently developed.");

  p("5. NO PARTNERSHIP OR AGENCY", true);
  p("Nothing herein creates a partnership, joint venture, agency, or employment relationship. No separate taxable entity is created.");
  p("6. INDEMNIFICATION", true);
  p("Each Party agrees to indemnify, defend, and hold harmless the other from claims, losses, damages, liabilities, costs, or expenses (including attorneys' fees) arising from negligence, willful misconduct, or breach by the indemnifying Party.");
  p("7. INTELLECTUAL PROPERTY", true);
  p("All work/materials created in connection with specific engagements remain the property of the Party performing the work. Pre-existing methodologies remain the property of the originating Party.");
  p("8. LIMITATIONS OF LIABILITY", true);
  p("Neither Party is liable for indirect, special, incidental, or consequential damages. Aggregate liability shall not exceed the total amount paid by the claiming Party to the liable Party in the twelve (12) months preceding the claim event.");
  p("9. ENTIRE AGREEMENT AND CONFLICT", true);
  p("This Agreement with exhibits/schedules constitutes the entire understanding and supersedes all prior discussions. In conflicts between this Agreement and annexes, this Agreement governs.");
  p("10. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}, without regard to conflict principles. Any disputes shall be subject to exclusive jurisdiction of courts located in ${u(values.jurisdictionVenue, 12)}.`);
  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");

  p("Party A:");
  uf("Name", values.partyASignerName || values.partyAName, 24);
  uf("Title", values.partyASignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyASignerDate, 14);
  p("Party B:");
  uf("Name", values.partyBSignerName || values.partyBName, 24);
  uf("Title", values.partyBSignerTitle, 20);
  p("By: ___________________________");
  uf("Date", values.partyBSignerDate, 14);

  doc.save("strategic_alliance.pdf");
};

export default function StrategicAlliance() {
  return (
    <FormWizard
      steps={steps}
      title="Strategic Alliance"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="strategicalliance"
    />
  );
}
