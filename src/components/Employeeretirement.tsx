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
  companyName: string;
  companyAddress: string;
  employeeName: string;
  employeeAddress: string;
  positionTitle: string;
  retirementDate: string;
  salaryBeforeRetirement: string;
  severancePaymentAmount: string;
  severanceDuration: string;
  confidentiality: string;
  nonSolicitation: string;
  nonCompete: string;
  governingLaw: string;
  employeeSignature: string;
  employerSignature: string;
}

const EmployeeRetirementAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    companyName: "",
    companyAddress: "",
    employeeName: "",
    employeeAddress: "",
    positionTitle: "",
    retirementDate: "",
    salaryBeforeRetirement: "",
    severancePaymentAmount: "",
    severanceDuration: "",
    confidentiality: "",
    nonSolicitation: "",
    nonCompete: "",
    governingLaw: "",
    employeeSignature: "",
    employerSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 14));
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
      addText("EMPLOYEE RETIREMENT AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Employee Retirement Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Effective Date]"}, by and between ${formData.companyName || "[Company Name]"}, a corporation duly organized and existing under the laws of [Jurisdiction], having its principal place of business at ${formData.companyAddress || "[Company Address]"} (the “Company”), and ${formData.employeeName || "[Employee Name]"}, residing at ${formData.employeeAddress || "[Employee Address]"} (the “Employee”).`
      );
      currentY += 4;

      // Sections
      const sections: { title: string; content: string }[] = [
        {
          title: "1. RETIREMENT",
          content: `The Employee shall voluntarily retire from employment with the Company, effective ${formData.retirementDate || "[Retirement Date]"}...`,
        },
        {
          title: "2. EMPLOYMENT PRIOR TO RETIREMENT DATE",
          content: `Until the Retirement Date, the Employee shall remain employed in the position of ${formData.positionTitle || "[Position Title]"}...`,
        },
        {
          title: "3. SEVERANCE BENEFITS",
          content: `Commencing on the Retirement Date and continuing for ${formData.severanceDuration || "[Duration]"}, the Company shall pay the Employee severance benefits in the amount of $${formData.severancePaymentAmount || "[Amount]"}...`,
        },
        {
          title: "4. NO MITIGATION",
          content: `The severance benefits provided herein shall not be subject to mitigation or reduction...`,
        },
        {
          title: "5. EMPLOYEE COVENANTS",
          content: `5.1 Confidentiality – The Employee agrees to not disclose any confidential or proprietary information of the Company...`,
        },
        {
          title: "6. REMEDIES",
          content: `Any breach of the covenants contained herein shall entitle the Company to equitable relief...`,
        },
        {
          title: "7. COOPERATION AND NON-DISPARAGEMENT",
          content: `The Employee shall cooperate with the Company in any legal, regulatory, or business matters in which the Employee’s prior knowledge may be relevant...`,
        },
        {
          title: "8. RELEASE OF CLAIMS",
          content: `8.1 By Employee – The Employee hereby releases and forever discharges the Company from any claims arising out of their employment...`,
        },
        {
          title: "9. RETURN OF PROPERTY",
          content: `On or before the Retirement Date, the Employee shall return all Company property...`,
        },
        {
          title: "10. CONFIDENTIALITY OF AGREEMENT",
          content: `The terms of this Agreement shall remain confidential and shall not be disclosed except under certain conditions...`,
        },
        {
          title: "11. GOVERNING LAW",
          content: `This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[Jurisdiction]"}...`,
        },
        {
          title: "12. ENTIRE AGREEMENT",
          content: `This Agreement constitutes the entire understanding between the Parties...`,
        },
        {
          title: "13. AMENDMENTS",
          content: `This Agreement may only be amended in writing signed by both Parties...`,
        },
        {
          title: "14. COUNTERPARTS",
          content: `This Agreement may be executed in multiple counterparts...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Signatures
      addText("EMPLOYEE:", 12, true);
      addText(`Signature: ${formData.employeeSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 10;

      addText("EMPLOYER:", 12, true);
      addText(`Signature: ${formData.employerSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 12;

      // Save the PDF
      doc.save("employee-retirement-agreement.pdf");
      toast.success("Employee Retirement Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Employee Retirement Agreement PDF");
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
          
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Position & Compensation</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="positionTitle">Position Title</Label>
            <Input
              id="positionTitle"
              value={formData.positionTitle}
              onChange={(e) => handleInputChange("positionTitle", e.target.value)}
            />
            <Label htmlFor="baseSalary">Base Salary</Label>
            <Input
              id="baseSalary"
              value={formData.baseSalary}
              onChange={(e) => handleInputChange("baseSalary", e.target.value)}
            />
            <Label htmlFor="commissionPercentage">Commission Percentage</Label>
            <Input
              id="commissionPercentage"
              value={formData.commissionPercentage}
              onChange={(e) => handleInputChange("commissionPercentage", e.target.value)}
            />
            <Label htmlFor="commissionBasis">Commission Basis</Label>
            <Input
              id="commissionBasis"
              value={formData.commissionBasis}
              onChange={(e) => handleInputChange("commissionBasis", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Leave & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="vacationDays">Vacation Days</Label>
            <Input
              id="vacationDays"
              value={formData.vacationDays}
              onChange={(e) => handleInputChange("vacationDays", e.target.value)}
            />
            <Label htmlFor="sickLeaveDays">Sick Leave Days</Label>
            <Input
              id="sickLeaveDays"
              value={formData.sickLeaveDays}
              onChange={(e) => handleInputChange("sickLeaveDays", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Non-Compete & Non-Solicitation</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="nonCompeteTime">Non-Compete Time</Label>
            <Input
              id="nonCompeteTime"
              value={formData.nonCompeteTime}
              onChange={(e) => handleInputChange("nonCompeteTime", e.target.value)}
            />
            <Label htmlFor="nonCompeteArea">Non-Compete Area</Label>
            <Input
              id="nonCompeteArea"
              value={formData.nonCompeteArea}
              onChange={(e) => handleInputChange("nonCompeteArea", e.target.value)}
            />
            <Label htmlFor="nonSolicitationTime">Non-Solicitation Time</Label>
            <Input
              id="nonSolicitationTime"
              value={formData.nonSolicitationTime}
              onChange={(e) => handleInputChange("nonSolicitationTime", e.target.value)}
            />
            <Label htmlFor="nonSolicitationArea">Non-Solicitation Area</Label>
            <Input
              id="nonSolicitationArea"
              value={formData.nonSolicitationArea}
              onChange={(e) => handleInputChange("nonSolicitationArea", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employment Relationship & Confidentiality</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employmentRelationship">Employment Relationship</Label>
            <Textarea
              id="employmentRelationship"
              value={formData.employmentRelationship}
              onChange={(e) => handleInputChange("employmentRelationship", e.target.value)}
            />
            <Label htmlFor="confidentiality">Confidentiality</Label>
            <Textarea
              id="confidentiality"
              value={formData.confidentiality}
              onChange={(e) => handleInputChange("confidentiality", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Termination & Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="terminationNotice">Termination Notice Period</Label>
            <Input
              id="terminationNotice"
              value={formData.terminationNotice}
              onChange={(e) => handleInputChange("terminationNotice", e.target.value)}
            />
            <Label htmlFor="notices">Notices</Label>
            <Textarea
              id="notices"
              value={formData.notices}
              onChange={(e) => handleInputChange("notices", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employeeSignature">Employee Signature</Label>
            <Input
              id="employeeSignature"
              value={formData.employeeSignature}
              onChange={(e) => handleInputChange("employeeSignature", e.target.value)}
            />
            <Label htmlFor="employerSignature">Employer Signature</Label>
            <Input
              id="employerSignature"
              value={formData.employerSignature}
              onChange={(e) => handleInputChange("employerSignature", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employee Acknowledgement</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employeeAcknowledgement">Employee Acknowledgement</Label>
            <Textarea
              id="employeeAcknowledgement"
              value={formData.employeeAcknowledgement}
              onChange={(e) => handleInputChange("employeeAcknowledgement", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employment Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => handleInputChange("benefits", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 11:
      return (
        <Card>
          <CardHeader>
            <CardTitle>General Provisions</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="generalProvisions">General Provisions</Label>
            <Textarea
              id="generalProvisions"
              value={formData.generalProvisions}
              onChange={(e) => handleInputChange("generalProvisions", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 12:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Final Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="finalReview">Final Review</Label>
            <Textarea
              id="finalReview"
              value={formData.finalReview}
              onChange={(e) => handleInputChange("finalReview", e.target.value)}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Retirement Agreement</h1>
        <p className="text-gray-600">Create an Employee Retirement Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 14</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 14) * 100}%` }}
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
          {currentStep < 14 ? (
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

export default EmployeeRetirementAgreementForm;
