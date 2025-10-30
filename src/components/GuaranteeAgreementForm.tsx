import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  day: string;
  month: string;
  year: string;
  creditorName: string;
  creditorAddress: string;
  guarantorName: string;
  guarantorAddress: string;
  debtorName: string;
  terminationDaysNumber: string;
  terminationDaysWords: string;
  securityText: string;
  pledgeDate: string;
  securityAgreementDate: string;
  mortgageDate: string;
  collateralAssignmentDate: string;
  governingState: string;
  creditorSignerName: string;
  creditorSignerTitle: string;
  creditorSignerDate: string;
  guarantorSignerName: string;
  guarantorSignerTitle: string;
  guarantorSignerDate: string;
}

const defaultFormData: FormData = {
  day: "",
  month: "",
  year: "",
  creditorName: "",
  creditorAddress: "",
  guarantorName: "",
  guarantorAddress: "",
  debtorName: "",
  terminationDaysNumber: "",
  terminationDaysWords: "",
  securityText: "",
  pledgeDate: "",
  securityAgreementDate: "",
  mortgageDate: "",
  collateralAssignmentDate: "",
  governingState: "",
  creditorSignerName: "",
  creditorSignerTitle: "",
  creditorSignerDate: "",
  guarantorSignerName: "",
  guarantorSignerTitle: "",
  guarantorSignerDate: "",
};

const GuaranteeAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const filled = (template: string, replacement: string) => {
    if (!replacement || replacement.trim() === "") return template;
    return template.replace(/_{3,}|\[.*?\]/, replacement);
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 14;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 720) {
            doc.addPage();
            currentY = margin;
          }
          if (isCenter) {
            const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += lineHeight;
        });
      };

      const paragraphs: string[] = [];

      paragraphs.push("GUARANTEE AGREEMENT");

      paragraphs.push(
        filled(
          `This Guarantee Agreement (\u201cAgreement\u201d or \u201cGuaranty\u201d) is made and entered into on this ${formData.day || "___"} day of ${formData.month || "_______"}, ${formData.year || "-------"} (\u201cEffective Date\u201d), by and between:`,
          ""
        )
      );

      paragraphs.push(
        filled(
          `[Name of Creditor], having its principal place of business at ${formData.creditorAddress || "________________________"} (hereinafter referred to as the \u201cCreditor\u201d),`,
          formData.creditorName
        )
      );

      paragraphs.push("and");

      paragraphs.push(
        filled(
          `[Name of Guarantor], residing or having its principal place of business at ${formData.guarantorAddress || "________________________"} (hereinafter referred to as the \u201cGuarantor\u201d).`,
          formData.guarantorName
        )
      );

      paragraphs.push("(Each individually referred to as a \u201cParty\u201d and collectively as the \u201cParties\u201d.)");

      paragraphs.push("");
      paragraphs.push("RECITALS");

      paragraphs.push(
        filled(
          `WHEREAS, [Name of Debtor] (\u201cDebtor\u201d) has entered or proposes to enter into a certain contractual arrangement with the Creditor, a copy of which is attached hereto and incorporated herein as Exhibit A (\u201cUnderlying Agreement\u201d);`,
          formData.debtorName
        )
      );

      paragraphs.push(
        "AND WHEREAS, the Creditor has required, as a condition to entering into or continuing the said contractual relationship with the Debtor, that the Guarantor execute and deliver this Guaranty as security for the due performance and payment by the Debtor of all its obligations and liabilities to the Creditor, whether presently existing or hereafter arising;"
      );

      paragraphs.push(
        "NOW, THEREFORE, in consideration of the foregoing and of other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Guarantor hereby agrees as follows:"
      );

      // Section 1
      paragraphs.push("1. OBLIGATIONS OF THE GUARANTOR");
      paragraphs.push(
        "1.1 Absolute and Unconditional Guarantee\nThe Guarantor hereby absolutely, unconditionally, and irrevocably guarantees to the Creditor the prompt and full payment and performance of all obligations, indebtedness, and liabilities of the Debtor to the Creditor, whether now existing or hereafter incurred, whether direct or indirect, secured or unsecured, absolute or contingent, liquidated or unliquidated, and whether arising voluntarily or involuntarily, or jointly or severally with others."
      );

      paragraphs.push(
        "1.2 Continuing Nature of Guarantee\nIt is expressly understood that this Guaranty constitutes a continuing guarantee, extending to and covering all existing and future obligations of the Debtor until this Guaranty is duly terminated in accordance with the provisions herein."
      );

      paragraphs.push(
        "1.3 No Limitation by Enforcement\nThe liability of the Guarantor shall not be affected, diminished, or discharged by reason of any inability, failure, or omission by the Creditor to enforce its rights against the Debtor or any other person, nor by the invalidity or unenforceability of any obligation of the Debtor."
      );

      paragraphs.push(
        "1.4 Reliance\nThe Guarantor acknowledges that this Guaranty is executed to induce the Creditor to enter into or continue its contractual relationship with the Debtor, and that the Creditor will rely upon this Guaranty as a continuing assurance of the Debtor’s performance."
      );

      // Section 2
      paragraphs.push("2. DURATION");
      paragraphs.push(
        filled(
          `2.1 Term\nThis Guaranty shall remain in full force and effect until the expiration of ${formData.terminationDaysNumber || "____"} (${formData.terminationDaysWords || "___"}) days after written notice of termination is received by the Creditor from the Guarantor (\u201cTermination Notice\u201d).`,
          ""
        )
      );

      paragraphs.push(
        "2.2 Obligations Survive Termination\nAny obligations, debts, or liabilities of the Debtor existing or arising prior to the effective date of termination shall continue to be fully guaranteed by the Guarantor, notwithstanding the issuance of such Termination Notice."
      );

      paragraphs.push(
        "2.3 Effectiveness of Termination\nTermination shall not be effective until all obligations of the Debtor incurred prior thereto are fully paid, satisfied, and discharged to the Creditor’s satisfaction."
      );

      // Section 3
      paragraphs.push("3. NOTICE OF DEFAULT");
      paragraphs.push(
        "3.1 Notification Requirement\nThe Creditor shall provide written notice to the Guarantor of any default by the Debtor in performing its commitments or obligations under the Underlying Agreement prior to enforcing any rights under this Guaranty."
      );

      paragraphs.push(
        "3.2 No Obligation for Further Advances\nThe Creditor shall not be obligated to notify the Guarantor of any subsequent advances, extensions of credit, or renewals granted to the Debtor."
      );

      paragraphs.push(
        "3.3 Extension of Credit without Consent\nThe Creditor shall not extend any additional credit or enter into new financial arrangements with the Debtor without obtaining the prior written consent of the Guarantor. Any violation of this clause shall render this Guaranty null and void, and the Guarantor shall be fully discharged from liability hereunder."
      );

      // Section 4
      paragraphs.push("4. CREDITOR PROVISIONS AND SECURITY");
      paragraphs.push(
        "4.1 Waiver of Subrogation and Rights Against Debtor\nUntil all obligations of the Debtor have been satisfied in full, the Guarantor waives any right of subrogation and any right to claim against the Debtor or any collateral securing the Debtor’s obligations."
      );

      paragraphs.push(
        "4.2 Assignment of Debtor’s Indebtedness to Guarantor\nAny debt owed by the Debtor to the Guarantor shall be subordinated and assigned to the Creditor. If requested by the Creditor, such debt shall be collected and remitted by the Guarantor as trustee for the Creditor, without affecting the Guarantor’s obligations under this Agreement."
      );

      paragraphs.push(
        "4.3 Creditor’s Right to Modify or Release Security\nThe Guarantor agrees that the Creditor may, without prior notice to or consent from the Guarantor: (a) alter the terms of the Debtor’s obligations; (b) extend time for payment or performance; (c) release or substitute any collateral security; or (d) compromise or settle any claim. Such actions shall not release or reduce the Guarantor’s liability under this Guaranty."
      );

      paragraphs.push(
        "4.4 Requirement for Consent to New Contracts\nThis Guaranty shall become null and void if the Creditor enters into, renews, or modifies any agreement with the Debtor without obtaining the Guarantor’s prior written consent."
      );

      paragraphs.push(
        "4.5 Financial Disclosure\nThe Guarantor shall provide the Creditor with reasonable access to its financial statements or information concerning its financial condition upon written request. The Creditor shall have no obligation to advise or inform the Guarantor regarding the Debtor’s financial condition."
      );

      paragraphs.push(
        filled(
          `4.6 Security for Guaranty\nThis Guaranty is:\n☐ Unsecured, or\n☐ Secured by the following instruments (check as applicable):`,
          formData.securityText
        )
      );

      paragraphs.push(
        filled(
          `•Pledge Agreement dated ${formData.pledgeDate || "__________"};\n•Security Agreement dated ${formData.securityAgreementDate || "__________"};\n•Mortgage dated ${formData.mortgageDate || "__________"};\n•Collateral Assignment dated ${formData.collateralAssignmentDate || "__________"}.`,
          ""
        )
      );

      // Section 5
      paragraphs.push("5. FINAL PROVISIONS");
      paragraphs.push(
        "5.1 Entire Agreement\nThis Guaranty constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior oral or written understandings, representations, or agreements."
      );

      paragraphs.push(
        "5.2 Amendments\nNo modification or amendment of this Guaranty shall be valid unless made in writing and signed by both Parties."
      );

      paragraphs.push(
        "5.3 Severability\nIf any provision of this Guaranty is held invalid or unenforceable by a court of competent jurisdiction, such provision shall be limited to the minimum extent necessary so that the remaining provisions shall continue in full force and effect."
      );

      paragraphs.push(
        "5.4 Waiver\nFailure of either Party to enforce any right or provision of this Guaranty shall not constitute a waiver of such right or provision and shall not affect its enforceability thereafter."
      );

      paragraphs.push(
        filled(
          `5.5 Governing Law\nThis Guaranty shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "__________"}, without regard to its conflict-of-law principles.`,
          ""
        )
      );

      paragraphs.push(
        "5.6 Acknowledgment of Receipt\nThe Guarantor hereby acknowledges having received a true and complete copy of this Guaranty and fully understands its terms, rights, and obligations."
      );

      // Section 6
      paragraphs.push("6. EXECUTION");
      paragraphs.push(
        "IN WITNESS WHEREOF, the Parties have duly executed this Guarantee Agreement as of the day and year first above written."
      );

      paragraphs.push(
        filled(
          `CREDITOR\nName: ${formData.creditorSignerName || "__________________________"}\nTitle: ${formData.creditorSignerTitle || "__________________________"}\nSignature: ________________________\nDate: ${formData.creditorSignerDate || "__________________________"}`,
          ""
        )
      );

      paragraphs.push(
        filled(
          `GUARANTOR\nName: ${formData.guarantorSignerName || "__________________________"}\nTitle (if applicable): ${formData.guarantorSignerTitle || "__________________________"}\nSignature: ________________________\nDate: ${formData.guarantorSignerDate || "__________________________"}`,
          ""
        )
      );

      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });

      doc.save("guarantee-agreement.pdf");
      toast.success("Guarantee Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Guarantee Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Day</Label>
                  <Input value={formData.day} onChange={(e) => handleInputChange("day", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input value={formData.month} onChange={(e) => handleInputChange("month", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input value={formData.year} onChange={(e) => handleInputChange("year", e.target.value)} placeholder="-------" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Creditor - Full Legal Name</Label>
                <Input value={formData.creditorName} onChange={(e) => handleInputChange("creditorName", e.target.value)} placeholder="[Name of Creditor]" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Address</Label>
                <Textarea value={formData.creditorAddress} onChange={(e) => handleInputChange("creditorAddress", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Guarantor - Full Legal Name</Label>
                <Input value={formData.guarantorName} onChange={(e) => handleInputChange("guarantorName", e.target.value)} placeholder="[Name of Guarantor]" />
              </div>

              <div className="space-y-2">
                <Label>Guarantor - Address</Label>
                <Textarea value={formData.guarantorAddress} onChange={(e) => handleInputChange("guarantorAddress", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Debtor - Name (for recital)</Label>
                <Input value={formData.debtorName} onChange={(e) => handleInputChange("debtorName", e.target.value)} placeholder="[Name of Debtor]" />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Duration, Notices & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Termination - Days (number)</Label>
                  <Input value={formData.terminationDaysNumber} onChange={(e) => handleInputChange("terminationDaysNumber", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Termination - Days (words)</Label>
                  <Input value={formData.terminationDaysWords} onChange={(e) => handleInputChange("terminationDaysWords", e.target.value)} placeholder="(e.g., thirty)" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Security text (replaces checkbox section; paste exact text you want)</Label>
                <Textarea value={formData.securityText} onChange={(e) => handleInputChange("securityText", e.target.value)} placeholder="Leave blank to preserve original checkbox lines" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pledge Agreement Date</Label>
                  <Input value={formData.pledgeDate} onChange={(e) => handleInputChange("pledgeDate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Security Agreement Date</Label>
                  <Input value={formData.securityAgreementDate} onChange={(e) => handleInputChange("securityAgreementDate", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mortgage Date</Label>
                  <Input value={formData.mortgageDate} onChange={(e) => handleInputChange("mortgageDate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Collateral Assignment Date</Label>
                  <Input value={formData.collateralAssignmentDate} onChange={(e) => handleInputChange("collateralAssignmentDate", e.target.value)} placeholder="" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Final Provisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Governing State</Label>
                <Input value={formData.governingState} onChange={(e) => handleInputChange("governingState", e.target.value)} placeholder="[insert state]" />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Execution & Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Creditor - Signer Name</Label>
                <Input value={formData.creditorSignerName} onChange={(e) => handleInputChange("creditorSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Title (if applicable)</Label>
                <Input value={formData.creditorSignerTitle} onChange={(e) => handleInputChange("creditorSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Date</Label>
                <Input value={formData.creditorSignerDate} onChange={(e) => handleInputChange("creditorSignerDate", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Guarantor - Signer Name</Label>
                <Input value={formData.guarantorSignerName} onChange={(e) => handleInputChange("guarantorSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Guarantor - Title (if applicable)</Label>
                <Input value={formData.guarantorSignerTitle} onChange={(e) => handleInputChange("guarantorSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Guarantor - Date</Label>
                <Input value={formData.guarantorSignerDate} onChange={(e) => handleInputChange("guarantorSignerDate", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Guarantee Agreement</h1>
        <p className="text-gray-600">Fill in the fields and export the Guarantee Agreement as a PDF. Every word will be preserved.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 5</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }} />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 5 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF}>Generate PDF</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuaranteeAgreementForm;