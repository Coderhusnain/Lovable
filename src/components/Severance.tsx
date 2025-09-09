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
    nlraDisclaimer: "",
    noAdmissionOfLiability: "",
    governingLawState: "",
    employeeSignature: "",
    employerSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 13));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont(undefined, isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 270) {
            doc.addPage();
            currentY = margin;
          }
          if (isCenter) {
            const tw = doc.getStringUnitWidth(line) * fontSize / doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += lineHeight;
        });
      };

      // Title
      addText("SEVERANCE AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Severance Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.employeeName || "[Employee Name]"}, residing at ${formData.employeeAddress || "[Employee Address]"} (“Employee”), and ${formData.employerName || "[Employer Name]"}, having its principal place of business at ${formData.employerAddress || "[Employer Address]"} (“Employer” or “Company”).`
      );
      currentY += 4;

      // Sections (e.g., TERMINATION DATE, FINAL PAYCHECK, etc.)
      const sections: { title: string; content: string }[] = [
        {
          title: "1. TERMINATION DATE",
          content: `The Employee’s final day of employment with the Employer shall be ${formData.terminationDate || "[Termination Date]"}...`,
        },
        {
          title: "2. FINAL PAYCHECK",
          content: `The Employee shall receive, on the next regularly scheduled payroll date following the Termination Date...`,
        },
        {
          title: "3. SEVERANCE PAYMENT",
          content: `In consideration of the covenants, releases, and waivers contained herein, the Employer shall pay the Employee a one-time lump sum severance payment in the amount of $${formData.severancePaymentAmount || "[Amount]"}...`,
        },
        {
          title: "4. RELEASE OF CLAIMS",
          content: `The Employee, on behalf of themselves and their heirs, executors, administrators, successors, and assigns, hereby fully and forever releases, discharges, and covenants not to sue the Employer...`,
        },
        {
          title: "5. REVIEW PERIOD AND REVOCATION",
          content: `The Employee acknowledges that they have been provided with a period of ${formData.reviewPeriodDays || "[Review Period Days]"} calendar days to review and consider this Agreement...`,
        },
        {
          title: "6. CONFIDENTIALITY AND NON-DISCLOSURE",
          content: `The Employee shall execute a separate Non-Disclosure Agreement (“NDA”) as a condition to receiving the Severance Payment...`,
        },
        {
          title: "7. NON-DISPARAGEMENT",
          content: `The Employee shall refrain from making any false, malicious, or defamatory statements...`,
        },
        {
          title: "8. RETURN OF COMPANY PROPERTY",
          content: `No later than ${formData.returnOfPropertyDate || "[Date]"}, the Employee shall return to the Employer all property belonging to the Employer...`,
        },
        {
          title: "9. DISCLAIMER UNDER THE NATIONAL LABOR RELATIONS ACT (NLRA)",
          content: `Nothing in this Agreement shall be construed to prohibit or interfere with the Employee’s rights, if applicable, under Section 7 of the NLRA...`,
        },
        {
          title: "10. NO ADMISSION OF LIABILITY",
          content: `This Agreement is entered into solely for the purpose of resolving matters between the parties...`,
        },
        {
          title: "11. ENTIRE AGREEMENT",
          content: `This Agreement constitutes the full and complete agreement between the parties regarding the subject matter herein...`,
        },
        {
          title: "12. SEVERABILITY",
          content: `If any provision of this Agreement is held invalid, illegal, or unenforceable...`,
        },
        {
          title: "13. GOVERNING LAW",
          content: `This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of ${formData.governingLawState || "[State]"}...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Employee & Employer Signatures
      addText("EMPLOYEE:", 12, true);
      addText(`Signature: ${formData.employeeSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 10;

      addText("EMPLOYER:", 12, true);
      addText(`Signature: ${formData.employerSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 12;

      // Save the PDF
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
          <CardContent>
            <Label htmlFor="agreementDate">Agreement Date</Label>
            <Input
              id="agreementDate"
              type="date"
              value={formData.agreementDate}
              onChange={(e) => handleInputChange("agreementDate", e.target.value)}
            />
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input
              id="employeeName"
              value={formData.employeeName}
              onChange={(e) => handleInputChange("employeeName", e.target.value)}
            />
            <Label htmlFor="employeeAddress">Employee Address</Label>
            <Textarea
              id="employeeAddress"
              value={formData.employeeAddress}
              onChange={(e) => handleInputChange("employeeAddress", e.target.value)}
            />
            <Label htmlFor="employerName">Employer Name</Label>
            <Input
              id="employerName"
              value={formData.employerName}
              onChange={(e) => handleInputChange("employerName", e.target.value)}
            />
            <Label htmlFor="employerAddress">Employer Address</Label>
            <Textarea
              id="employerAddress"
              value={formData.employerAddress}
              onChange={(e) => handleInputChange("employerAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Termination & Final Paycheck</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="terminationDate">Termination Date</Label>
            <Input
              id="terminationDate"
              type="date"
              value={formData.terminationDate}
              onChange={(e) => handleInputChange("terminationDate", e.target.value)}
            />
            <Label htmlFor="finalPaycheck">Final Paycheck</Label>
            <Input
              id="finalPaycheck"
              value={formData.finalPaycheck}
              onChange={(e) => handleInputChange("finalPaycheck", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Severance Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="severancePaymentAmount">Severance Payment Amount</Label>
            <Input
              id="severancePaymentAmount"
              value={formData.severancePaymentAmount}
              onChange={(e) => handleInputChange("severancePaymentAmount", e.target.value)}
            />
            <Label htmlFor="severancePaymentDays">Severance Payment Days</Label>
            <Input
              id="severancePaymentDays"
              value={formData.severancePaymentDays}
              onChange={(e) => handleInputChange("severancePaymentDays", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Release of Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="releaseOfClaims">Release of Claims</Label>
            <Textarea
              id="releaseOfClaims"
              value={formData.releaseOfClaims}
              onChange={(e) => handleInputChange("releaseOfClaims", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Review Period & Revocation</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="reviewPeriodDays">Review Period Days</Label>
            <Input
              id="reviewPeriodDays"
              value={formData.reviewPeriodDays}
              onChange={(e) => handleInputChange("reviewPeriodDays", e.target.value)}
            />
            <Label htmlFor="revocationPeriodDays">Revocation Period Days</Label>
            <Input
              id="revocationPeriodDays"
              value={formData.revocationPeriodDays}
              onChange={(e) => handleInputChange("revocationPeriodDays", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Confidentiality & NDA</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="confidentialityNDA">Confidentiality NDA</Label>
            <Textarea
              id="confidentialityNDA"
              value={formData.confidentialityNDA}
              onChange={(e) => handleInputChange("confidentialityNDA", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Non-Disparagement</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="nonDisparagement">Non-Disparagement</Label>
            <Textarea
              id="nonDisparagement"
              value={formData.nonDisparagement}
              onChange={(e) => handleInputChange("nonDisparagement", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Return of Property</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="returnOfPropertyDate">Return of Property Date</Label>
            <Input
              id="returnOfPropertyDate"
              type="date"
              value={formData.returnOfPropertyDate}
              onChange={(e) => handleInputChange("returnOfPropertyDate", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>NLRA Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="nlraDisclaimer">NLRA Disclaimer</Label>
            <Textarea
              id="nlraDisclaimer"
              value={formData.nlraDisclaimer}
              onChange={(e) => handleInputChange("nlraDisclaimer", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>No Admission of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="noAdmissionOfLiability">No Admission of Liability</Label>
            <Textarea
              id="noAdmissionOfLiability"
              value={formData.noAdmissionOfLiability}
              onChange={(e) => handleInputChange("noAdmissionOfLiability", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    ;
    case 13:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="governingLawState">Governing Law State</Label>
            <Input
              id="governingLawState"
              value={formData.governingLawState}
              onChange={(e) => handleInputChange("governingLawState", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Severance Agreement</h1>
        <p className="text-gray-600">Create a Severance Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 13</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 13) * 100}%` }}
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
          {currentStep < 13 ? (
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
