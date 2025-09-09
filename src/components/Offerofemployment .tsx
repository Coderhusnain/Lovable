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
  positionTitle: string;
  startDate: string;
  supervisorName: string;
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
  employeeSignature: string;
  employerSignature: string;
}

const OfferOfEmploymentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    employeeName: "",
    employeeAddress: "",
    employerName: "",
    employerAddress: "",
    positionTitle: "",
    startDate: "",
    supervisorName: "",
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
      addText("OFFER OF EMPLOYMENT LETTER", 16, true, true);
      currentY += 6;

      addText(
        `Date: ${formData.agreementDate || "[Insert Date]"}\n\nTo:\n${formData.employeeName || "[Employee’s Full Legal Name]"}\n${formData.employeeAddress || "[Employee’s Address]"}\n\nFrom:\n${formData.employerName || "[Employer’s Full Legal Name]"}\n${formData.employerAddress || "[Employer’s Address]"}`
      );
      currentY += 4;

      // Sections (e.g., POSITION OFFER, COMMENCEMENT OF EMPLOYMENT, etc.)
      const sections: { title: string; content: string }[] = [
        {
          title: "1. POSITION OFFER",
          content: `We are pleased to extend to you an offer of employment for the position of ${formData.positionTitle || "[Position Title]"} with ${formData.employerName || "[Employer’s Name]"} (“Employer”)...`,
        },
        {
          title: "2. COMMENCEMENT OF EMPLOYMENT",
          content: `Your anticipated start date will be ${formData.startDate || "[Start Date]"}...`,
        },
        {
          title: "3. JOB RESPONSIBILITIES",
          content: `You will perform all duties customarily associated with the position of ${formData.positionTitle || "[Position Title]"}...`,
        },
        {
          title: "4. COMPENSATION",
          content: `4.1 Base Salary – You will receive a monthly salary of $${formData.baseSalary || "[Amount]"}... \n4.2 Commission – You will be entitled to commissions calculated at ${formData.commissionPercentage || "[Percentage]"}% of ${formData.commissionBasis || "[Basis for Commission Calculation]"}...`,
        },
        {
          title: "5. EXPENSE REIMBURSEMENT",
          content: `You will be reimbursed for reasonable, pre-approved out-of-pocket business expenses...`,
        },
        {
          title: "6. BENEFITS AND LEAVE",
          content: `6.1 Benefits – You will be eligible to participate in health, retirement, and other benefit programs as offered... \n6.2 Vacation Leave – You will be entitled to ${formData.vacationDays || "[Number]"} days of paid vacation per calendar year...`,
        },
        {
          title: "7. EMPLOYMENT RELATIONSHIP",
          content: `Your employment will be at-will, meaning that either you or the Employer may terminate the relationship at any time...`,
        },
        {
          title: "8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY",
          content: `8.1 Confidentiality – You agree to maintain the confidentiality of all proprietary information... \n8.2 Intellectual Property – Any inventions created by you during your employment shall be the exclusive property of the Employer...`,
        },
        {
          title: "9. NON-COMPETE AND NON-SOLICITATION",
          content: `9.1 Non-Compete – During your employment and for a period of ${formData.nonCompeteTime || "[Time Period]"} following termination, you shall not compete with the Employer within ${formData.nonCompeteArea || "[Geographic Area]"}... \n9.2 Non-Solicitation – During your employment and for a period of ${formData.nonSolicitationTime || "[Time Period]"} following termination...`,
        },
        {
          title: "10. CONDITIONS OF OFFER",
          content: `This offer is contingent upon your written acceptance of this letter...`,
        },
        {
          title: "11. NON-CONTRACTUAL NATURE",
          content: `This letter is not intended to create a guarantee of continued employment...`,
        },
        {
          title: "12. GOVERNING LAW",
          content: `This letter shall be governed by the laws of the State of ${formData.state || "[State]"}...`,
        },
        {
          title: "13. ACCEPTANCE OF OFFER",
          content: `If you accept this offer, please sign and return a copy of this letter by [Deadline Date]...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Employer & Employee Signatures
      addText("EMPLOYER:", 12, true);
      addText(`Signature: ${formData.employerSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 10;

      addText("EMPLOYEE:", 12, true);
      addText(`Signature: ${formData.employeeSignature || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 12;

      // Save the PDF
      doc.save("offer-of-employment-letter.pdf");
      toast.success("Offer of Employment Letter PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Offer of Employment Letter PDF");
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
            <CardTitle>Vacation & Sick Leave</CardTitle>
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
            <CardTitle>State & Governing Law</CardTitle>
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
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employee Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employeeSignature">Employee Signature</Label>
            <Input
              id="employeeSignature"
              value={formData.employeeSignature}
              onChange={(e) => handleInputChange("employeeSignature", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employer Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employerSignature">Employer Signature</Label>
            <Input
              id="employerSignature"
              value={formData.employerSignature}
              onChange={(e) => handleInputChange("employerSignature", e.target.value)}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer of Employment Letter</h1>
        <p className="text-gray-600">Create an Offer of Employment Letter and export as a PDF.</p>
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

export default OfferOfEmploymentForm;
