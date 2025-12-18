import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
// Icon suggestion: import { Handshake } from "lucide-react";

interface FormData {
  effectiveDate: string;
  partyAName: string;
  partyACountry: string;
  partyAAddress: string;
  partyBName: string;
  partyBCountry: string;
  partyBAddress: string;
  jointServicesSummary: string;
  termOrDate: string;
  automaticRenewalPeriod: string;
  renewalNoticePeriod: string;
  designatedRepA: string;
  designatedRepB: string;
  governingLaw: string;
  jurisdiction: string;
  signPartyAName: string;
  signPartyATitle: string;
  signPartyADate: string;
  signPartyBName: string;
  signPartyBTitle: string;
  signPartyBDate: string;
}

export default function StrategicAllianceForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partyAName: "",
    partyACountry: "",
    partyAAddress: "",
    partyBName: "",
    partyBCountry: "",
    partyBAddress: "",
    jointServicesSummary: "",
    termOrDate: "",
    automaticRenewalPeriod: "one year",
    renewalNoticePeriod: "60 days",
    designatedRepA: "",
    designatedRepB: "",
    governingLaw: "",
    jurisdiction: "",
    signPartyAName: "",
    signPartyATitle: "",
    signPartyADate: "",
    signPartyBName: "",
    signPartyBTitle: "",
    signPartyBDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += size * 1.3;
      });
    };

    write("STRATEGIC ALLIANCE AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Strategic Alliance Agreement (the "Agreement") is made and entered into as of ${formData.effectiveDate ||
        "[Effective Date]"}, by and between:`
    );
    write(`• ${formData.partyAName || "[Party A Name]"}, a company organized and existing under the laws of ${formData.partyACountry ||
      "[State/Country]"}, with its principal place of business at ${formData.partyAAddress || "[Address]"} ("Party A"); and`);
    write(`• ${formData.partyBName || "[Party B Name]"}, a company organized and existing under the laws of ${formData.partyBCountry ||
      "[State/Country]"}, with its principal place of business at ${formData.partyBAddress || "[Address]"} ("Party B").`);
    write("\n");
    write("Party A and Party B may hereinafter be collectively referred to as the \"Parties\" or individually as a \"Party.\"");
    write("\n");
    write("The Parties hereby agree to form a strategic alliance to jointly market and perform certain complementary business consulting services, subject to the terms and conditions set forth herein.");
    write("\n\n");

    write("1. SCOPE OF STRATEGIC ALLIANCE", 12, true);
    write("1.1 Joint Services");
    write(
      `Each Party shall provide its services for clients referred by the other Party in a professional, ethical, and competent manner consistent with industry standards. ${formData.jointServicesSummary ||
        ""}`
    );
    write("\n");
    write("1.2 Ownership of Intellectual Property");
    write("Each Party retains sole and exclusive ownership of all proprietary products, copyrights, trademarks, trade names, logos, methodologies, and any other intellectual property created or developed prior to or independently of this Agreement. No Party shall claim ownership of the other Party’s pre-existing intellectual property.");
    write("\n");
    write("1.3 Marketing and Promotion");
    write("Both Parties may promote the strategic alliance to potential clients; however, all marketing materials, representations, or promotional statements require prior written approval of the Party whose services or intellectual property are referenced.");
    write("\n\n");

    write("2. PERIOD OF PERFORMANCE", 12, true);
    write("2.1 Effective Date");
    write(`This Agreement shall become effective on ${formData.effectiveDate || "[Effective Date]"}.`);
    write("\n");
    write("2.2 Term and Expiration");
    write(`The Agreement shall continue until the later of: (a) ${formData.termOrDate || "[Specified Date]"}, or (b) Completion of all projects initiated under this Agreement and full receipt of payment for services rendered.`);
    write("\n");
    write("2.3 Automatic Renewal");
    write(
      `This Agreement shall automatically renew for successive periods of ${formData.automaticRenewalPeriod ||
        "[specify period]"}, unless either Party provides written notice of termination at least ${formData.renewalNoticePeriod || "[specify notice period]"} prior to the end of the current term.`
    );
    write("\n");
    write("2.4 Early Termination");
    write("The Agreement may be terminated earlier by mutual written consent of both Parties or pursuant to other provisions set forth herein.");
    write("\n\n");

    write("3. MANAGEMENT", 12, true);
    write("3.1 Designated Representatives");
    write("Each Party shall designate a senior officer, partner, or other responsible person to oversee administration of this Agreement, client relationships, billing, and compliance with the terms hereof.");
    write("\n");
    write("3.2 Authority and Responsibility");
    write("The designated representatives shall have authority to coordinate projects, resolve operational issues, and act as the primary liaison for all matters arising under this Agreement.");
    write("\n\n");

    write("4. CONFIDENTIAL INFORMATION", 12, true);
    write("4.1 Acknowledgment");
    write("In connection with the performance of services, each Party may receive confidential or proprietary information, including trade secrets, business strategies, financial data, client lists, or methodologies.");
    write("\n");
    write("4.2 Obligations of Confidentiality");
    write("Each Party agrees to: (a) maintain such information in strict confidence; (b) refrain from using it for any purpose other than the performance of this Agreement; (c) not alter, copy, or disclose it without the prior written consent of the disclosing Party; and (d) return or destroy all tangible materials upon termination of this Agreement or upon request.");
    write("\n");
    write("4.3 Exceptions");
    write("Confidential information shall not include information that: (a) is or becomes publicly available without breach of this Agreement; (b) is lawfully obtained from a third party without restriction; or (c) is independently developed without use of the other Party’s confidential information.");
    write("\n\n");

    write("5. NO PARTNERSHIP OR AGENCY", 12, true);
    write("Nothing in this Agreement shall be construed as creating a partnership, joint venture, agency, or employment relationship between the Parties. The Parties shall not share profits, losses, or liabilities beyond the terms expressly stated herein, nor shall a separate taxable entity be created.");
    write("\n\n");

    write("6. INDEMNIFICATION", 12, true);
    write("6.1 Obligation to Indemnify");
    write("Each Party agrees to indemnify, defend, and hold harmless the other Party from any and all claims, losses, damages, liabilities, costs, or expenses (including reasonable attorneys’ fees) arising from the negligence, willful misconduct, or breach of this Agreement by the indemnifying Party.");
    write("\n");
    write("6.2 Procedure");
    write("The indemnified Party shall promptly notify the indemnifying Party of any claim and shall reasonably cooperate in the defense or settlement of such claim.");
    write("\n\n");

    write("7. INTELLECTUAL PROPERTY", 12, true);
    write("7.1 Ownership");
    write("All work, materials, or information created or delivered in connection with specific engagements under this Agreement shall remain the property of the Party performing the work.");
    write("\n");
    write("7.2 Pre-Existing Methodologies");
    write("Any proprietary methodologies, know-how, or intellectual property developed prior to this Agreement shall remain the exclusive property of the originating Party and shall not be claimed by the other Party.");
    write("\n\n");

    write("8. LIMITATIONS OF LIABILITY", 12, true);
    write("8.1 Exclusion of Damages");
    write("Neither Party shall be liable to the other for indirect, special, incidental, or consequential damages, including lost profits, business interruption, or loss of business information.");
    write("\n");
    write("8.2 Limitation on Aggregate Liability");
    write("The total aggregate liability of each Party under this Agreement shall not exceed the total amount paid by the claiming Party to the liable Party during the twelve (12) months preceding the event giving rise to the claim.");
    write("\n\n");

    write("9. ENTIRE AGREEMENT AND CONFLICT", 12, true);
    write("9.1 Entire Agreement");
    write("This Agreement, together with all exhibits, schedules, and incorporated documents, constitutes the entire understanding between the Parties and supersedes all prior discussions, negotiations, or agreements, whether written or oral.");
    write("\n");
    write("9.2 Conflict Resolution");
    write("In the event of any conflict between the terms of this Agreement and any annexed document or schedule, the terms of this Agreement shall govern.");
    write("\n\n");

    write("10. GOVERNING LAW AND JURISDICTION", 12, true);
    write(
      `This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[State/Country]"}, without regard to its conflict of law principles. Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in ${formData.jurisdiction ||
        "[State/Country]"}.`
    );
    write("\n\n");

    write("11. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Strategic Alliance Agreement as of the date first written above.");
    write("\n\n");
    write(`${formData.partyAName || "[Party A Name]"}`);
    write("By: ___________________________");
    write("Name: " + (formData.signPartyAName || "_______________________"));
    write("Title: " + (formData.signPartyATitle || "_______________________"));
    write("Date: " + (formData.signPartyADate || "_______________________"));
    write("\n\n");
    write(`${formData.partyBName || "[Party B Name]"}`);
    write("By: ___________________________");
    write("Name: " + (formData.signPartyBName || "_______________________"));
    write("Title: " + (formData.signPartyBTitle || "_______________________"));
    write("Date: " + (formData.signPartyBDate || "_______________________"));

    doc.save("Strategic_Alliance_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <Handshake className="w-6 h-6" /> */}
                <h3 className="font-semibold">Parties & Scope</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Party A - Name</Label>
              <Input name="partyAName" value={formData.partyAName} onChange={handleChange} />
              <Label>Party A - Country / State</Label>
              <Input name="partyACountry" value={formData.partyACountry} onChange={handleChange} />
              <Label>Party A - Principal Address</Label>
              <Textarea name="partyAAddress" value={formData.partyAAddress} onChange={handleChange} />

              <hr />

              <Label>Party B - Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />
              <Label>Party B - Country / State</Label>
              <Input name="partyBCountry" value={formData.partyBCountry} onChange={handleChange} />
              <Label>Party B - Principal Address</Label>
              <Textarea name="partyBAddress" value={formData.partyBAddress} onChange={handleChange} />

              <Label>Joint Services Summary (short)</Label>
              <Textarea name="jointServicesSummary" value={formData.jointServicesSummary} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term & Management</h3>

              <Label>Term / Specified Date</Label>
              <Input name="termOrDate" value={formData.termOrDate} onChange={handleChange} />

              <Label>Automatic Renewal Period</Label>
              <Input name="automaticRenewalPeriod" value={formData.automaticRenewalPeriod} onChange={handleChange} />

              <Label>Renewal Notice Period</Label>
              <Input name="renewalNoticePeriod" value={formData.renewalNoticePeriod} onChange={handleChange} />

              <Label>Designated Representative - Party A</Label>
              <Input name="designatedRepA" value={formData.designatedRepA} onChange={handleChange} />
              <Label>Designated Representative - Party B</Label>
              <Input name="designatedRepB" value={formData.designatedRepB} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal & Signatures</h3>

              <Label>Governing Law / State or Country</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label>Jurisdiction (courts)</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />

              <hr />

              <Label>Party A - Signatory Name</Label>
              <Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} />
              <Label>Party A - Title</Label>
              <Input name="signPartyATitle" value={formData.signPartyATitle} onChange={handleChange} />
              <Label>Party A - Date</Label>
              <Input name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} />

              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Party B - Title</Label>
              <Input name="signPartyBTitle" value={formData.signPartyBTitle} onChange={handleChange} />
              <Label>Party B - Date</Label>
              <Input name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Strategic Alliance Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
