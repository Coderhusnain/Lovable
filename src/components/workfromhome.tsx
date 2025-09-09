import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData  {
  agreementDate: string;
  companyName: string;
  companyState: string;
  companyAddress: string;
  employeeName: string;
  employeeAddress: string;
  startDate: string;
  endDate: string;
  reviewDate: string;
  startTime: string;
  endTime: string;
  workDays: string;
  leaveApproval: string;
  leavePolicy: string;
  supervisorName: string;
  performanceStandards: string;
  progressReports: string;
  securityMeasures: string;
  companyDocuments: string;
  overtimeApproval: string;
  overtimePolicy: string;
  equipmentProvided: string;
  equipmentResponsibility: string;
  additionalEquipmentRequests: string;
  indemnification: string;
  reimbursementPolicy: string;
  workersCompensation: string;
  terminationNotice: string;
  governingState: string;
  attorneyFees: string;
  employerName: string;
  employeeNameSignature: string;
}

const WorkFromHomeAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    companyName: "",
    companyState: "",
    companyAddress: "",
    employeeName: "",
    employeeAddress: "",
    startDate: "",
    endDate: "",
    reviewDate: "",
    startTime: "",
    endTime: "",
    workDays: "",
    leaveApproval: "",
    leavePolicy: "",
    supervisorName: "",
    performanceStandards: "",
    progressReports: "",
    securityMeasures: "",
    companyDocuments: "",
    overtimeApproval: "",
    overtimePolicy: "",
    equipmentProvided: "",
    equipmentResponsibility: "",
    additionalEquipmentRequests: "",
    indemnification: "",
    reimbursementPolicy: "",
    workersCompensation: "",
    terminationNotice: "",
    governingState: "",
    attorneyFees: "",
    employerName: "",
    employeeNameSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 15));
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
      addText("WORK FROM HOME AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Work From Home Agreement (“Agreement”) is made and entered into on ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.companyName || "[Company Name]"}, a ${formData.companyState || "[State]"} corporation having its principal place of business at ${formData.companyAddress || "[Company Address]"} (“Company” or “Employer”), and ${formData.employeeName || "[Employee Name]"}, residing at ${formData.employeeAddress || "[Employee Address]"} (“Employee”).`
      );
      currentY += 4;

      // Recitals
      addText("RECITALS", 12, true);
      addText("WHEREAS, the Company has established a telecommuting program (“Telecommuting Program”)...");
      addText("WHEREAS, the Employee has voluntarily agreed to participate in the Telecommuting Program...");
      currentY += 4;

      addText("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:", 11);
      currentY += 4;

      // Sections (e.g., TERM AND DURATION, WORK SCHEDULE, etc.)
      const sections: { title: string; content: string }[] = [
        {
          title: "1. TERM AND DURATION",
          content: `This Agreement shall commence on ${formData.startDate || "[Start Date]"} and shall continue until ${formData.endDate || "[End Date]"}, unless terminated earlier...`,
        },
        {
          title: "2. WORK SCHEDULE",
          content: `The Employee shall perform services for the Company from ${formData.startTime || "[Start Time]"} to ${formData.endTime || "[End Time]"}, ${formData.workDays || "[Days of Work]"}...`,
        },
        {
          title: "3. COMPENSATION, ATTENDANCE, AND LEAVE",
          content: `All pay, leave entitlements, and travel allowances shall be based on the Employee’s primary business location...`,
        },
        {
          title: "4. WORK ASSIGNMENTS AND PERFORMANCE",
          content: `The Employee shall meet with ${formData.supervisorName || "[Supervisor Name]"} as necessary to receive assignments...`,
        },
        {
          title: "5. RECORDS MANAGEMENT AND CONFIDENTIALITY",
          content: `The Employee shall apply all approved security measures to safeguard Company documents...`,
        },
        {
          title: "6. OVERTIME",
          content: `The Employee shall work overtime only when expressly ordered and approved in advance by the Company...`,
        },
        {
          title: "7. EQUIPMENT AND PROPERTY",
          content: `The Company shall provide the Employee with the following equipment for use exclusively in connection with the performance of duties under this Agreement: ${formData.equipmentProvided || "[List Equipment]"}...`,
        },
        {
          title: "8. LIABILITY AND INDEMNIFICATION",
          content: `The Company shall not be liable for any damage to the Employee’s personal property arising from participation in the Telecommuting Program...`,
        },
        {
          title: "9. REIMBURSEMENT OF EXPENSES",
          content: `The Company shall not be responsible for any costs associated with the Employee’s residence...`,
        },
        {
          title: "10. WORKERS’ COMPENSATION COVERAGE",
          content: `The Employee shall be covered by applicable state workers’ compensation laws...`,
        },
        {
          title: "11. TERMINATION",
          content: `Either party may terminate this Agreement at any time, with or without cause...`,
        },
        {
          title: "12. GOVERNING LAW",
          content: `This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "[State]"}.`,
        },
        {
          title: "13. ATTORNEY FEES",
          content: `In the event of litigation arising from this Agreement, the prevailing party shall be entitled to recover reasonable attorney fees and court costs...`,
        },
        {
          title: "14. ENTIRE AGREEMENT",
          content: `This Agreement constitutes the full and complete understanding between the parties...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Employer & Employee Signatures
      addText("EMPLOYER (Company):", 12, true);
      addText(`Name: ${formData.employerName || "_________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 10;

      addText("EMPLOYEE:", 12, true);
      addText(`Name: ${formData.employeeNameSignature || "_________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 12;

      // Save the PDF
      doc.save("work-from-home-agreement.pdf");
      toast.success("Work From Home Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Work From Home Agreement PDF");
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
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
            <Label htmlFor="companyState">Company State</Label>
            <Input
              id="companyState"
              value={formData.companyState}
              onChange={(e) => handleInputChange("companyState", e.target.value)}
            />
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              value={formData.companyAddress}
              onChange={(e) => handleInputChange("companyAddress", e.target.value)}
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
            <CardTitle>Term & Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
            <Label htmlFor="reviewDate">Review Date</Label>
            <Input
              id="reviewDate"
              type="date"
              value={formData.reviewDate}
              onChange={(e) => handleInputChange("reviewDate", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Work Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            />
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            />
            <Label htmlFor="workDays">Work Days</Label>
            <Input
              id="workDays"
              value={formData.workDays}
              onChange={(e) => handleInputChange("workDays", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Leave & Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="leaveApproval">Leave Approval Process</Label>
            <Textarea
              id="leaveApproval"
              value={formData.leaveApproval}
              onChange={(e) => handleInputChange("leaveApproval", e.target.value)}
            />
            <Label htmlFor="leavePolicy">Leave Policy</Label>
            <Textarea
              id="leavePolicy"
              value={formData.leavePolicy}
              onChange={(e) => handleInputChange("leavePolicy", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Supervisor & Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="supervisorName">Supervisor Name</Label>
            <Input
              id="supervisorName"
              value={formData.supervisorName}
              onChange={(e) => handleInputChange("supervisorName", e.target.value)}
            />
            <Label htmlFor="performanceStandards">Performance Standards</Label>
            <Textarea
              id="performanceStandards"
              value={formData.performanceStandards}
              onChange={(e) => handleInputChange("performanceStandards", e.target.value)}
            />
            <Label htmlFor="progressReports">Progress Reports</Label>
            <Textarea
              id="progressReports"
              value={formData.progressReports}
              onChange={(e) => handleInputChange("progressReports", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Security & Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="securityMeasures">Security Measures</Label>
            <Textarea
              id="securityMeasures"
              value={formData.securityMeasures}
              onChange={(e) => handleInputChange("securityMeasures", e.target.value)}
            />
            <Label htmlFor="companyDocuments">Company Documents</Label>
            <Textarea
              id="companyDocuments"
              value={formData.companyDocuments}
              onChange={(e) => handleInputChange("companyDocuments", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Overtime & Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="overtimeApproval">Overtime Approval Process</Label>
            <Textarea
              id="overtimeApproval"
              value={formData.overtimeApproval}
              onChange={(e) => handleInputChange("overtimeApproval", e.target.value)}
            />
            <Label htmlFor="overtimePolicy">Overtime Policy</Label>
            <Textarea
              id="overtimePolicy"
              value={formData.overtimePolicy}
              onChange={(e) => handleInputChange("overtimePolicy", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Equipment & Responsibility</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="equipmentProvided">Equipment Provided</Label>
            <Textarea
              id="equipmentProvided"
              value={formData.equipmentProvided}
              onChange={(e) => handleInputChange("equipmentProvided", e.target.value)}
            />
            <Label htmlFor="equipmentResponsibility">Equipment Responsibility</Label>
            <Textarea
              id="equipmentResponsibility"
              value={formData.equipmentResponsibility}
              onChange={(e) => handleInputChange("equipmentResponsibility", e.target.value)}
            />
            <Label htmlFor="additionalEquipmentRequests">Additional Equipment Requests</Label>
            <Textarea
              id="additionalEquipmentRequests"
              value={formData.additionalEquipmentRequests}
              onChange={(e) => handleInputChange("additionalEquipmentRequests", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Indemnification & Reimbursement</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="indemnification">Indemnification</Label>
            <Textarea
              id="indemnification"
              value={formData.indemnification}
              onChange={(e) => handleInputChange("indemnification", e.target.value)}
            />
            <Label htmlFor="reimbursementPolicy">Reimbursement Policy</Label>
            <Textarea
              id="reimbursementPolicy"
              value={formData.reimbursementPolicy}
              onChange={(e) => handleInputChange("reimbursementPolicy", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Workers Compensation</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="workersCompensation">Workers Compensation</Label>
            <Textarea
              id="workersCompensation"
              value={formData.workersCompensation}
              onChange={(e) => handleInputChange("workersCompensation", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 11:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Termination Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="terminationNotice">Termination Notice</Label>
            <Textarea
              id="terminationNotice"
              value={formData.terminationNotice}
              onChange={(e) => handleInputChange("terminationNotice", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 12:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Governing State & Attorney Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="governingState">Governing State</Label>
            <Input
              id="governingState"
              value={formData.governingState}
              onChange={(e) => handleInputChange("governingState", e.target.value)}
            />
            <Label htmlFor="attorneyFees">Attorney Fees</Label>
            <Textarea
              id="attorneyFees"
              value={formData.attorneyFees}
              onChange={(e) => handleInputChange("attorneyFees", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 13:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Employer & Employee Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="employerName">Employer Name</Label>
            <Input
              id="employerName"
              value={formData.employerName}
              onChange={(e) => handleInputChange("employerName", e.target.value)}
            />
            <Label htmlFor="employeeNameSignature">Employee Name Signature</Label>
            <Input
              id="employeeNameSignature"
              value={formData.employeeNameSignature}
              onChange={(e) => handleInputChange("employeeNameSignature", e.target.value)}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Work From Home Agreement</h1>
        <p className="text-gray-600">Create a Work From Home Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 15</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 15) * 100}%` }}
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
          {currentStep < 15 ? (
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

export default WorkFromHomeAgreementForm;
