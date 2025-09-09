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

const LastWillAndTestamentForm: React.FC = () => {
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
      addText("LAST WILL AND TESTAMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Last Will and Testament (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.employeeName || "[Employee’s Full Legal Name]"}, residing at ${formData.employeeAddress || "[Employee’s Address]"} (“Testator”), and ${formData.employerName || "[Employer’s Full Legal Name]"}, with its principal place of business at ${formData.employerAddress || "[Employer’s Address]"} (“Employer”).`
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
            <CardTitle>Testator Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="agreementDate">Agreement Date</Label>
            <Input
              id="agreementDate"
              type="date"
              value={formData.agreementDate}
              onChange={(e) => handleInputChange("agreementDate", e.target.value)}
            />
            <Label htmlFor="employeeName">Testator Name</Label>
            <Input
              id="employeeName"
              value={formData.employeeName}
              onChange={(e) => handleInputChange("employeeName", e.target.value)}
            />
            <Label htmlFor="employeeAddress">Testator Address</Label>
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
            <CardTitle>Spouse & Children</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="spouseName">Spouse Name</Label>
            <Input
              id="spouseName"
              value={formData.spouseName}
              onChange={(e) => handleInputChange("spouseName", e.target.value)}
            />
            <Label htmlFor="childrenNames">Children Names</Label>
            <Input
              id="childrenNames"
              value={formData.childrenNames}
              onChange={(e) => handleInputChange("childrenNames", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Payment of Debts</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="debts">Payment of Debts and Expenses</Label>
            <Textarea
              id="debts"
              value={formData.debts}
              onChange={(e) => handleInputChange("debts", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Specific Bequests</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="specificBequests">Specific Bequests</Label>
            <Textarea
              id="specificBequests"
              value={formData.specificBequests}
              onChange={(e) => handleInputChange("specificBequests", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Digital Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="digitalAssets">Digital Assets</Label>
            <Textarea
              id="digitalAssets"
              value={formData.digitalAssets}
              onChange={(e) => handleInputChange("digitalAssets", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Tangible Personal Property</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="tangiblePersonalProperty">Tangible Personal Property</Label>
            <Textarea
              id="tangiblePersonalProperty"
              value={formData.tangiblePersonalProperty}
              onChange={(e) => handleInputChange("tangiblePersonalProperty", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Residuary Estate</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="residuaryEstate">Residuary Estate</Label>
            <Textarea
              id="residuaryEstate"
              value={formData.residuaryEstate}
              onChange={(e) => handleInputChange("residuaryEstate", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Pet Care Directives</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="petCare">Pet Care Directives</Label>
            <Textarea
              id="petCare"
              value={formData.petCare}
              onChange={(e) => handleInputChange("petCare", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Executor Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="executorName">Executor Name</Label>
            <Input
              id="executorName"
              value={formData.executorName}
              onChange={(e) => handleInputChange("executorName", e.target.value)}
            />
            <Label htmlFor="executorAddress">Executor Address</Label>
            <Textarea
              id="executorAddress"
              value={formData.executorAddress}
              onChange={(e) => handleInputChange("executorAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Guardian Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              value={formData.guardianName}
              onChange={(e) => handleInputChange("guardianName", e.target.value)}
            />
            <Label htmlFor="guardianAddress">Guardian Address</Label>
            <Textarea
              id="guardianAddress"
              value={formData.guardianAddress}
              onChange={(e) => handleInputChange("guardianAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 11:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Executor Powers</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="executorPowers">Executor Powers</Label>
            <Textarea
              id="executorPowers"
              value={formData.executorPowers}
              onChange={(e) => handleInputChange("executorPowers", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 12:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Digital Executor Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="digitalExecutorName">Digital Executor Name</Label>
            <Input
              id="digitalExecutorName"
              value={formData.digitalExecutorName}
              onChange={(e) => handleInputChange("digitalExecutorName", e.target.value)}
            />
            <Label htmlFor="digitalExecutorAddress">Digital Executor Address</Label>
            <Textarea
              id="digitalExecutorAddress"
              value={formData.digitalExecutorAddress}
              onChange={(e) => handleInputChange("digitalExecutorAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 13:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Witnesses</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="witness1Name">Witness #1 Name</Label>
            <Input
              id="witness1Name"
              value={formData.witness1Name}
              onChange={(e) => handleInputChange("witness1Name", e.target.value)}
            />
            <Label htmlFor="witness2Name">Witness #2 Name</Label>
            <Input
              id="witness2Name"
              value={formData.witness2Name}
              onChange={(e) => handleInputChange("witness2Name", e.target.value)}
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

export default LastWillAndTestamentForm;
