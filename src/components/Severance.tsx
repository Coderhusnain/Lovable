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
  agreementDate: string;
  employeeName: string;
  employeeAddress: string;
  employerName: string;
  employerAddress: string;
  terminationDate: string;
  finalPaycheck: string;
  severancePaymentAmount: string;
  severancePaymentDays: string;
  releaseOfClaims: string;
  reviewPeriodDays: string;
  revocationPeriodDays: string;
  confidentialityNDA: string;
  nonDisparagement: string;
  returnOfPropertyDate: string;
  returnOfPropertyDetails: string;
  nlraDisclaimer: string;
  noAdmissionOfLiability: string;
  governingLawState: string;
  employeeSignature: string;
  employerSignature: string;
}

const SeveranceAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    employeeName: "",
    employeeAddress: "",
    employerName: "",
    employerAddress: "",
    terminationDate: "",
    finalPaycheck: "",
    severancePaymentAmount: "",
    severancePaymentDays: "",
    releaseOfClaims: "",
    reviewPeriodDays: "",
    revocationPeriodDays: "",
    confidentialityNDA: "",
    nonDisparagement: "",
    returnOfPropertyDate: "",
    returnOfPropertyDetails: "",
    nlraDisclaimer: "",
    noAdmissionOfLiability: "",
    governingLawState: "",
    employeeSignature: "",
    employerSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 6));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async () => {
    try {
      const doc = new jsPDF({
        unit: "pt",
        format: "letter",
      });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 14;
      let currentY = margin;

      const addText = (
        text: string,
        fontSize = 11,
        isBold = false,
        isCenter = false
      ) => {
        doc.setFontSize(fontSize);
        // use Times as requested
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          // large threshold to allow many lines per page (matches your earlier helper)
          if (currentY > 720) {
            doc.addPage();
            currentY = margin;
          }
          if (isCenter) {
            const tw =
              (doc.getStringUnitWidth(line) * fontSize) /
              doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += lineHeight;
        });
      };

      // Title (centered)
      addText("SEVERANCE AGREEMENT", 16, true, true);
      currentY += 8;

      // Full document text verbatim, substituting fields where appropriate.
      // IMPORTANT: preserve exact punctuation and dots as provided in your source.
      addText(
        `This Severance Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Date]"}, by and between:`
      );
      currentY += 6;
      addText(
        `${formData.employeeName || "[Full Legal Name of Employee]"}, residing at ${formData.employeeAddress || "[Address]"} (“Employee”), and`
      );
      addText(
        `${formData.employerName || "[Full Legal Name of Employer/Company]"}, having its principal place of business at ${formData.employerAddress || "[Address]"} (“Employer” or “Company”).`
      );
      currentY += 8;

      // Section 1
      addText("1. TERMINATION DATE", 12, true);
      addText(
        `The Employee’s final day of employment with the Employer shall be ${formData.terminationDate || "[Termination Date]"} (“Termination Date”). As of the Termination Date, the employment relationship between the parties shall be fully and finally concluded, subject to the terms and conditions of this Agreement.`
      );
      currentY += 6;

      // Section 2
      addText("2. FINAL PAYCHECK", 12, true);
      addText(
        `2.1 The Employee shall receive, on the next regularly scheduled payroll date following the Termination Date, payment of all wages, salary, and commissions (if applicable) earned through the Termination Date, less lawful deductions.`
      );
      addText(
        `2.2 Except as expressly provided in this Agreement, the Employee acknowledges and agrees that no further compensation, benefits, bonuses, or other payments are due or owing from the Employer.`
      );
      currentY += 6;

      // Section 3
      addText("3. SEVERANCE PAYMENT", 12, true);
      addText(
        `3.1 Consideration – In consideration of the covenants, releases, and waivers contained herein, the Employer shall pay the Employee a one-time lump sum severance payment in the amount of $${formData.severancePaymentAmount || "[Amount]"} (“Severance Payment”).`
      );
      addText(
        `3.2 The Severance Payment shall be made within ${formData.severancePaymentDays || "[Number]"} business days after the Effective Date of this Agreement and shall be subject to applicable tax withholdings.`
      );
      currentY += 6;

      // Section 4
      addText("4. RELEASE OF CLAIMS", 12, true);
      addText(
        `4.1 General Release – The Employee, on behalf of themselves and their heirs, executors, administrators, successors, and assigns, hereby fully and forever releases, discharges, and covenants not to sue the Employer, its past, present, and future parents, subsidiaries, affiliates, officers, directors, shareholders, employees, agents, representatives, insurers, and assigns (“Released Parties”) from any and all claims, demands, liabilities, and causes of action, known or unknown, arising out of or relating to:`
      );
      addText(`- the Employee’s employment with the Employer;`);
      addText(`- the termination of such employment; and`);
      addText(`- any other acts, omissions, or events occurring prior to the Effective Date of this Agreement.`);
      addText(
        `4.2 No Pending Actions – The Employee represents and warrants that they have not filed, joined, or participated in any lawsuits, complaints, or administrative charges against the Employer as of the date of execution of this Agreement.`
      );
      currentY += 6;

      // Section 5
      addText("5. REVIEW PERIOD AND REVOCATION", 12, true);
      addText(
        `5.1 The Employee acknowledges that they have been provided with a period of ${formData.reviewPeriodDays || "[Number]"} calendar days to review and consider this Agreement.`
      );
      addText(
        `5.2 The Employee further acknowledges that they may revoke this Agreement within ${formData.revocationPeriodDays || "<insert days>"} calendar days after signing it, by delivering written notice of revocation to the Employer no later than ${formData.revocationPeriodDays ? `the end of that revocation period.` : "< insert time > on the seventh day."} This Agreement shall not become effective until the revocation period has expired without revocation (“Effective Date”).`
      );
      currentY += 6;

      // Section 6
      addText("6. CONFIDENTIALITY AND NON-DISCLOSURE", 12, true);
      addText(
        `6.1 The Employee shall execute a separate Non-Disclosure Agreement (“NDA”) as a condition to receiving the Severance Payment.`
      );
      addText(
        `6.2 The Employee agrees not to use or disclose any Confidential Information of the Employer, including but not limited to trade secrets, proprietary data, financial information, client information, and intellectual property, except as required by law.`
      );
      if (formData.confidentialityNDA) addText(formData.confidentialityNDA);
      currentY += 6;

      // Section 7
      addText("7. NON-DISPARAGEMENT", 12, true);
      addText(
        `The Employee shall refrain from making any false, malicious, or defamatory statements, whether oral or written, about the Employer, its products, services, clients, or personnel. This restriction does not prohibit truthful statements made in response to legal obligations.`
      );
      if (formData.nonDisparagement) addText(formData.nonDisparagement);
      currentY += 6;

      // Section 8
      addText("8. RETURN OF COMPANY PROPERTY", 12, true);
      addText(
        `8.1 No later than ${formData.returnOfPropertyDate || "[Date]"}, the Employee shall return to the Employer all property belonging to the Employer, including but not limited to:`
      );
      addText(`- physical files, notes, and documents;`);
      addText(`- electronic records and storage devices;`);
      addText(`- office equipment and supplies;`);
      addText(`- keys, security passes, and identification cards; and`);
      addText(`- any other materials provided by the Employer or created for its business purposes.`);
      addText(
        `8.2 Failure to return all Company property by the deadline may result in a delay in processing the Severance Payment.`
      );
      if (formData.returnOfPropertyDetails) addText(formData.returnOfPropertyDetails);
      currentY += 6;

      // Section 9
      addText("9. DISCLAIMER UNDER THE NATIONAL LABOR RELATIONS ACT (NLRA)", 12, true);
      addText(
        `Nothing in this Agreement shall be construed to prohibit or interfere with the Employee’s rights, if applicable, under Section 7 of the NLRA, including but not limited to engaging in concerted activity or discussing terms and conditions of employment.`
      );
      if (formData.nlraDisclaimer) addText(formData.nlraDisclaimer);
      currentY += 6;

      // Section 10
      addText("10. NO ADMISSION OF LIABILITY", 12, true);
      addText(
        `This Agreement is entered into solely for the purpose of resolving matters between the parties and shall not be construed as an admission of liability, wrongdoing, or violation of law by either party. The Employer agrees that in response to reference requests, it will provide only the Employee’s job title and dates of employment.`
      );
      if (formData.noAdmissionOfLiability) addText(formData.noAdmissionOfLiability);
      currentY += 6;

      // Section 11
      addText("11. ENTIRE AGREEMENT", 12, true);
      addText(
        `This Agreement constitutes the full and complete agreement between the parties regarding the subject matter herein, superseding all prior or contemporaneous agreements, understandings, and representations, whether written or oral. Any amendment or modification must be in writing and signed by both parties.`
      );
      currentY += 6;

      // Section 12
      addText("12. SEVERABILITY", 12, true);
      addText(
        `If any provision of this Agreement is held invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. Any invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.`
      );
      currentY += 6;

      // Section 13
      addText("13. GOVERNING LAW", 12, true);
      addText(
        `This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of ${formData.governingLawState || "[State]"}, without regard to its conflicts-of-law principles.`
      );
      currentY += 10;

      // Acknowledgement block (verbatim)
      addText("ACKNOWLEDGEMENT", 12, true);
      addText(
        `By signing below, the Employee acknowledges that they have:`
      );
      addText(`- read and fully understand this Agreement;`);
      addText(`- had an opportunity to seek legal counsel;`);
      addText(`- entered into this Agreement voluntarily and without coercion; and`);
      addText(`- knowingly released the claims described herein in exchange for the consideration provided.`);
      currentY += 8;

      // Signatures
      addText(
        `EMPLOYEE:\nSignature: ${formData.employeeSignature || "_______________________"}\nName: ${formData.employeeName || "_______________________"}\nDate: ___________________________`
      );
      currentY += 12;
      addText(
        `EMPLOYER:\nSignature: ${formData.employerSignature || "_______________________"}\nName: ${formData.employerName || "_______________________"}\nTitle: ___________________________\nDate: _____________________________`
      );

      // Save
      doc.save("severance-agreement.pdf");
      toast.success("Severance Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Severance Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Agreement Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agreementDate">Agreement Date</Label>
                <Input
                  id="agreementDate"
                  type="date"
                  value={formData.agreementDate}
                  onChange={(e) => handleInputChange("agreementDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee - Full Legal Name</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange("employeeName", e.target.value)}
                  placeholder="[Full Legal Name of Employee]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeAddress">Employee - Address</Label>
                <Textarea
                  id="employeeAddress"
                  value={formData.employeeAddress}
                  onChange={(e) => handleInputChange("employeeAddress", e.target.value)}
                  placeholder="[Address]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerName">Employer/Company - Full Legal Name</Label>
                <Input
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => handleInputChange("employerName", e.target.value)}
                  placeholder="[Full Legal Name of Employer/Company]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerAddress">Employer - Address</Label>
                <Textarea
                  id="employerAddress"
                  value={formData.employerAddress}
                  onChange={(e) => handleInputChange("employerAddress", e.target.value)}
                  placeholder="[Address]"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Termination & Final Paycheck</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terminationDate">Termination Date</Label>
                <Input
                  id="terminationDate"
                  type="date"
                  value={formData.terminationDate}
                  onChange={(e) => handleInputChange("terminationDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalPaycheck">Final Paycheck Details</Label>
                <Textarea
                  id="finalPaycheck"
                  value={formData.finalPaycheck}
                  onChange={(e) => handleInputChange("finalPaycheck", e.target.value)}
                  placeholder="Details about final wages, commissions, deductions..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severancePaymentAmount">Severance Payment Amount ($)</Label>
                <Input
                  id="severancePaymentAmount"
                  value={formData.severancePaymentAmount}
                  onChange={(e) => handleInputChange("severancePaymentAmount", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severancePaymentDays">Severance Payment Days (within how many business days)</Label>
                <Input
                  id="severancePaymentDays"
                  value={formData.severancePaymentDays}
                  onChange={(e) => handleInputChange("severancePaymentDays", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Release & Review Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="releaseOfClaims">Release of Claims (summary or full text)</Label>
                <Textarea
                  id="releaseOfClaims"
                  value={formData.releaseOfClaims}
                  onChange={(e) => handleInputChange("releaseOfClaims", e.target.value)}
                  placeholder="Optional: paste full release text or notes"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewPeriodDays">Review Period Days</Label>
                  <Input
                    id="reviewPeriodDays"
                    value={formData.reviewPeriodDays}
                    onChange={(e) => handleInputChange("reviewPeriodDays", e.target.value)}
                    placeholder="e.g., 21"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revocationPeriodDays">Revocation Period Days</Label>
                  <Input
                    id="revocationPeriodDays"
                    value={formData.revocationPeriodDays}
                    onChange={(e) => handleInputChange("revocationPeriodDays", e.target.value)}
                    placeholder="e.g., 7"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Confidentiality, NDA & Non-Disparagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confidentialityNDA">Confidentiality / NDA Requirements</Label>
                <Textarea
                  id="confidentialityNDA"
                  value={formData.confidentialityNDA}
                  onChange={(e) => handleInputChange("confidentialityNDA", e.target.value)}
                  placeholder="Describe NDA requirement or paste NDA terms."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nonDisparagement">Non-Disparagement (text or notes)</Label>
                <Textarea
                  id="nonDisparagement"
                  value={formData.nonDisparagement}
                  onChange={(e) => handleInputChange("nonDisparagement", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnOfPropertyDate">Return of Property - Deadline Date</Label>
                <Input
                  id="returnOfPropertyDate"
                  type="date"
                  value={formData.returnOfPropertyDate}
                  onChange={(e) => handleInputChange("returnOfPropertyDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnOfPropertyDetails">Return of Property - Details</Label>
                <Textarea
                  id="returnOfPropertyDetails"
                  value={formData.returnOfPropertyDetails}
                  onChange={(e) => handleInputChange("returnOfPropertyDetails", e.target.value)}
                  placeholder="List items or special instructions if desired."
                />
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Legal Notices & Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nlraDisclaimer">NLRA Disclaimer (optional)</Label>
                <Textarea
                  id="nlraDisclaimer"
                  value={formData.nlraDisclaimer}
                  onChange={(e) => handleInputChange("nlraDisclaimer", e.target.value)}
                  placeholder="Optional additional NLRA text."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noAdmissionOfLiability">No Admission of Liability (optional)</Label>
                <Textarea
                  id="noAdmissionOfLiability"
                  value={formData.noAdmissionOfLiability}
                  onChange={(e) => handleInputChange("noAdmissionOfLiability", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="governingLawState">Governing Law - State</Label>
                <Input
                  id="governingLawState"
                  value={formData.governingLawState}
                  onChange={(e) => handleInputChange("governingLawState", e.target.value)}
                  placeholder="[State]"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Signatures & Acknowledgement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeSignature">Employee Signature (typed)</Label>
                <Input
                  id="employeeSignature"
                  value={formData.employeeSignature}
                  onChange={(e) => handleInputChange("employeeSignature", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerSignature">Employer Signature (typed)</Label>
                <Input
                  id="employerSignature"
                  value={formData.employerSignature}
                  onChange={(e) => handleInputChange("employerSignature", e.target.value)}
                />
              </div>

              <div className="text-sm text-gray-600">
                By signing above, the parties acknowledge the terms of this Severance Agreement.
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Severance Agreement</h1>
        <p className="text-gray-600">Create a Severance Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 6</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 6 ? (
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

export default SeveranceAgreementForm;
