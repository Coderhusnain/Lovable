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
  employerName: string;
  employerAddress: string;
  employeeName: string;
  employeeAddress: string;
  positionTitle: string;
  startDate: string;
  businessDescription: string;
  baseSalary: string;
  commissionPercentage: string;
  commissionBasis: string;
  vacationDays: string;
  sickLeaveDays: string;
  nonCompeteTime: string;
  nonCompeteArea: string;
  nonSolicitationTime: string;
  nonSolicitationArea: string;
  state: string;
  employerSignature: string;
  employeeSignature: string;
}

const EmploymentAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    employerName: "",
    employerAddress: "",
    employeeName: "",
    employeeAddress: "",
    positionTitle: "",
    startDate: "",
    businessDescription: "",
    baseSalary: "",
    commissionPercentage: "",
    commissionBasis: "",
    vacationDays: "",
    sickLeaveDays: "",
    nonCompeteTime: "",
    nonCompeteArea: "",
    nonSolicitationTime: "",
    nonSolicitationArea: "",
    state: "",
    employerSignature: "",
    employeeSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 12));
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
      addText("EMPLOYMENT AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Employment Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Insert Date]"} by and between ${formData.employerName || "[Employer’s Full Legal Name]"}, with its principal place of business at ${formData.employerAddress || "[Employer’s Address]"} (“Employer”), and ${formData.employeeName || "[Employee’s Full Legal Name]"}, residing at ${formData.employeeAddress || "[Employee’s Address]"} (“Employee”).`
      );
      currentY += 4;

      // Sections (e.g., POSITION AND DUTIES, COMPENSATION, etc.)
      const sections: { title: string; content: string }[] = [
        {
          title: "1. POSITION AND DUTIES",
          content: `1.1 Position – The Employer hereby employs the Employee in the position of ${formData.positionTitle || "[Position Title]"}.\n1.2 Duties – The Employee shall perform all duties customarily associated with the position and such other related duties as the Employer may reasonably assign from time to time.`,
        },
        {
          title: "2. PLACE OF EMPLOYMENT",
          content: `The Employee shall perform their duties primarily at ${formData.businessDescription || "[Work Location]"} or at such other locations as the Employer may reasonably designate.`,
        },
        {
          title: "3. COMPENSATION AND BENEFITS",
          content: `3.1 Base Salary – The Employee shall be paid an annual salary of $${formData.baseSalary || "[Amount]"}.\n3.2 Commission – The Employee shall be entitled to commissions calculated at ${formData.commissionPercentage || "[Percentage]"}% of ${formData.commissionBasis || "[Basis for Commission Calculation]"}.\n3.3 Vacation Leave – The Employee shall be entitled to ${formData.vacationDays || "[Number]"} days of paid vacation per calendar year.`,
        },
        {
          title: "4. CONFIDENTIALITY AND NON-DISCLOSURE",
          content: `4.1 Confidential Information – The Employee shall not, during or after employment, disclose or use any Confidential Information belonging to the Employer, except as necessary for the proper performance of duties.`,
        },
        {
          title: "5. NON-COMPETE AND NON-SOLICITATION",
          content: `5.1 Non-Compete – During employment and for ${formData.nonCompeteTime || "[Time Period]"} thereafter, the Employee shall not engage in any business that competes with the Employer within ${formData.nonCompeteArea || "[Geographic Area]"}.\n5.2 Non-Solicitation – The Employee shall not solicit any of the Employer’s employees or clients for ${formData.nonSolicitationTime || "[Time Period]"} after termination.`,
        },
        {
          title: "6. LIMITATIONS ON AUTHORITY",
          content: `The Employee shall not have the authority to bind the Employer to any contract or obligation without the Employer’s prior written consent.`,
        },
        {
          title: "7. TERM AND TERMINATION",
          content: `7.1 At-Will Employment – Employment under this Agreement is at-will and may be terminated by either Party at any time.\n7.2 Termination for Disability – The Employer may terminate this Agreement if the Employee becomes unable to perform essential job functions due to a permanent disability.`,
        },
        {
          title: "8. RETURN OF PROPERTY",
          content: `Upon termination of employment, the Employee shall return all Employer property in their possession.`,
        },
        {
          title: "9. COMPLIANCE WITH POLICIES",
          content: `The Employee agrees to comply with all of the Employer’s policies, procedures, and workplace rules.`,
        },
        {
          title: "10. NOTICES",
          content: `All notices required or permitted under this Agreement shall be in writing and delivered personally, sent by certified mail, or by courier service.`,
        },
        {
          title: "11. GENERAL PROVISIONS",
          content: `11.1 Entire Agreement – This Agreement contains the entire agreement between the Parties.\n11.2 Amendment – This Agreement may be amended only in writing signed by both Parties.`,
        },
        {
          title: "12. SIGNATURES",
          content: `Employer:\nName: ${formData.employerName || "_________________________"}\nSignature: ${formData.employerSignature || "_________________________"}\nEmployee:\nName: ${formData.employeeName || "_________________________"}\nSignature: ${formData.employeeSignature || "_________________________"}`
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Save the PDF
      doc.save("employment-agreement.pdf");
      toast.success("Employment Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Employment Agreement PDF");
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employment Agreement</h1>
        <p className="text-gray-600">Create an Employment Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 12</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 12) * 100}%` }}
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
          {currentStep < 12 ? (
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

export default EmploymentAgreementForm;
