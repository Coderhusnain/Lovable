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
  // Agreement & Parties
  agreementDate: string;
  companyName: string;
  companyState: string;
  companyAddress: string;
  employeeName: string;
  employeeAddress: string;

  // Term
  startDate: string;
  endDate: string;
  reviewDate: string;

  // Work Schedule
  startTime: string;
  endTime: string;
  workDays: string;

  // Leave, Supervisor, Performance
  leaveApproval: string;
  leavePolicy: string;
  supervisorName: string;
  performanceStandards: string;
  progressReports: string;

  // Security, Overtime, Equipment
  securityMeasures: string;
  companyDocuments: string;
  overtimeApproval: string;
  overtimePolicy: string;
  equipmentProvided: string;
  equipmentResponsibility: string;
  additionalEquipmentRequests: string;

  // Liability, Reimbursement, Workers Comp
  indemnification: string;
  reimbursementPolicy: string;
  workersCompensation: string;

  // Termination & Governing Law
  terminationNotice: string;
  governingState: string;
  attorneyFees: string;

  // Signatures
  employerName: string;
  employerTitle: string;
  employeeSignatureName: string;
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
    employerTitle: "",
    employeeSignatureName: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 7));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 270) {
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

      // Title
      addText("WORK FROM HOME AGREEMENT", 16, true, true);
      currentY += 6;

      // Parties
      addText(
        `This Work From Home Agreement (“Agreement”) is made and entered into on ${formData.agreementDate || "[Date]"}, by and between ${formData.companyName || "[Company Name]"}, a ${formData.companyState || "[State]"} corporation having its principal place of business at ${formData.companyAddress || "[Company Address]"} (“Company” or “Employer”), and ${formData.employeeName || "[Employee Name]"}, residing at ${formData.employeeAddress || "[Employee Address]"} (“Employee”).`
      );
      currentY += 6;

      // Recitals
      addText("RECITALS", 12, true);
      addText(
        "WHEREAS, the Company has established a telecommuting program (“Telecommuting Program”) designed to allow eligible employees to perform their job duties from a remote location, subject to specific policies, procedures, and performance standards;"
      );
      addText(
        "WHEREAS, the Employee has voluntarily agreed to participate in the Telecommuting Program and to comply with all applicable policies, guidelines, and procedures of the Company;"
      );
      addText(
        "WHEREAS, the Company concurs with the Employee’s participation in the Telecommuting Program, subject to the terms and conditions set forth herein;"
      );
      addText("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:");
      currentY += 6;

      // Sections
      addText("1. TERM AND DURATION", 12, true);
      addText(
        `This Agreement shall commence on ${formData.startDate || "[Start Date]"} and shall continue until ${formData.endDate || "[End Date]"}, unless terminated earlier in accordance with Section 11 of this Agreement. At the expiration of the term, the parties shall conduct a formal review on ${formData.reviewDate || "[Review Date]"} to determine whether the Agreement should be renewed, modified, or terminated.`
      );

      addText("2. WORK SCHEDULE", 12, true);
      addText(
        `The Employee shall perform services for the Company from ${formData.startTime || "[Start Time]"} to ${formData.endTime || "[End Time]"}, ${formData.workDays || "[Specify Days]"}, unless otherwise modified in writing by mutual consent.`
      );

      addText("3. COMPENSATION, ATTENDANCE, AND LEAVE", 12, true);
      addText(
        `All pay, leave entitlements, and travel allowances shall be based on the Employee’s primary business location. The Employee’s time and attendance shall be recorded as “official duty” at the primary business location. Leave requests must follow: ${formData.leaveApproval || "[Approval Process]"}. Policy: ${formData.leavePolicy || "[Leave Policy]"}.`
      );

      addText("4. WORK ASSIGNMENTS AND PERFORMANCE", 12, true);
      addText(
        `The Employee shall meet with ${formData.supervisorName || "[Supervisor Name]"} as necessary to receive assignments and updates. Performance standards: ${formData.performanceStandards || "[Performance Standards]"}. Progress reporting: ${formData.progressReports || "[Progress Reports]"}.`
      );

      addText("5. RECORDS, SECURITY & OVERTIME", 12, true);
      addText(
        `The Employee shall safeguard Company documents and data with: ${formData.securityMeasures || "[Security Measures]"}. Documents and files remain Company property: ${formData.companyDocuments || "[Company Documents Policy]"}. Overtime requires prior approval: ${formData.overtimeApproval || "[Approval Process]"}. Overtime policy: ${formData.overtimePolicy || "[Overtime Policy]"}.`
      );

      addText("6. EQUIPMENT AND LIABILITY", 12, true);
      addText(
        `The Company shall provide: ${formData.equipmentProvided || "[Equipment Provided]"}. Responsibility: ${formData.equipmentResponsibility || "[Responsibility]"}. Requests: ${formData.additionalEquipmentRequests || "[Requests]"}. Liability & indemnification: ${formData.indemnification || "[Indemnification]"}. Reimbursement: ${formData.reimbursementPolicy || "[Policy]"}. Workers Compensation: ${formData.workersCompensation || "[Coverage]"}.`
      );

      addText("7. TERMINATION & GOVERNING LAW", 12, true);
      addText(
        `Either party may terminate this Agreement with ${formData.terminationNotice || "[Notice Period]"} days written notice. This Agreement shall be governed by the laws of ${formData.governingState || "[State]"}. Attorney fees: ${formData.attorneyFees || "[Attorney Fee Policy]"}.`
      );

      // Signatures
      addText("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.", 11, true);
      currentY += 6;

      addText("EMPLOYER (Company):", 12, true);
      addText(`Name: ${formData.employerName || "________________"}`);
      addText(`Title: ${formData.employerTitle || "________________"}`);
      addText("Signature: __________________    Date: __________________");
      currentY += 8;

      addText("EMPLOYEE:", 12, true);
      addText(`Name: ${formData.employeeSignatureName || "________________"}`);
      addText("Signature: __________________    Date: __________________");

      doc.save("work-from-home-agreement.pdf");
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Agreement & Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Agreement Date</Label>
              <Input type="date" value={formData.agreementDate} onChange={(e) => handleInputChange("agreementDate", e.target.value)} />
              <Label>Company Name</Label>
              <Input value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} />
              <Label>Company State</Label>
              <Input value={formData.companyState} onChange={(e) => handleInputChange("companyState", e.target.value)} />
              <Label>Company Address</Label>
              <Textarea value={formData.companyAddress} onChange={(e) => handleInputChange("companyAddress", e.target.value)} />
              <Label>Employee Name</Label>
              <Input value={formData.employeeName} onChange={(e) => handleInputChange("employeeName", e.target.value)} />
              <Label>Employee Address</Label>
              <Textarea value={formData.employeeAddress} onChange={(e) => handleInputChange("employeeAddress", e.target.value)} />
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
              <Label>Start Date</Label>
              <Input type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} />
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
              <Label>Review Date</Label>
              <Input type="date" value={formData.reviewDate} onChange={(e) => handleInputChange("reviewDate", e.target.value)} />
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
              <Label>Start Time</Label>
              <Input type="time" value={formData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
              <Label>End Time</Label>
              <Input type="time" value={formData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
              <Label>Work Days</Label>
              <Input value={formData.workDays} onChange={(e) => handleInputChange("workDays", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Leave, Supervisor & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Leave Approval</Label>
              <Textarea value={formData.leaveApproval} onChange={(e) => handleInputChange("leaveApproval", e.target.value)} />
              <Label>Leave Policy</Label>
              <Textarea value={formData.leavePolicy} onChange={(e) => handleInputChange("leavePolicy", e.target.value)} />
              <Label>Supervisor Name</Label>
              <Input value={formData.supervisorName} onChange={(e) => handleInputChange("supervisorName", e.target.value)} />
              <Label>Performance Standards</Label>
              <Textarea value={formData.performanceStandards} onChange={(e) => handleInputChange("performanceStandards", e.target.value)} />
              <Label>Progress Reports</Label>
              <Textarea value={formData.progressReports} onChange={(e) => handleInputChange("progressReports", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Security, Overtime & Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Security Measures</Label>
              <Textarea value={formData.securityMeasures} onChange={(e) => handleInputChange("securityMeasures", e.target.value)} />
              <Label>Company Documents</Label>
              <Textarea value={formData.companyDocuments} onChange={(e) => handleInputChange("companyDocuments", e.target.value)} />
              <Label>Overtime Approval</Label>
              <Textarea value={formData.overtimeApproval} onChange={(e) => handleInputChange("overtimeApproval", e.target.value)} />
              <Label>Overtime Policy</Label>
              <Textarea value={formData.overtimePolicy} onChange={(e) => handleInputChange("overtimePolicy", e.target.value)} />
              <Label>Equipment Provided</Label>
              <Textarea value={formData.equipmentProvided} onChange={(e) => handleInputChange("equipmentProvided", e.target.value)} />
              <Label>Equipment Responsibility</Label>
              <Textarea value={formData.equipmentResponsibility} onChange={(e) => handleInputChange("equipmentResponsibility", e.target.value)} />
              <Label>Additional Equipment Requests</Label>
              <Textarea value={formData.additionalEquipmentRequests} onChange={(e) => handleInputChange("additionalEquipmentRequests", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Liability, Reimbursement & Workers Comp</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Indemnification</Label>
              <Textarea value={formData.indemnification} onChange={(e) => handleInputChange("indemnification", e.target.value)} />
              <Label>Reimbursement Policy</Label>
              <Textarea value={formData.reimbursementPolicy} onChange={(e) => handleInputChange("reimbursementPolicy", e.target.value)} />
              <Label>Workers Compensation</Label>
              <Textarea value={formData.workersCompensation} onChange={(e) => handleInputChange("workersCompensation", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Termination, Governing Law & Signatures</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Termination Notice</Label>
              <Textarea value={formData.terminationNotice} onChange={(e) => handleInputChange("terminationNotice", e.target.value)} />
              <Label>Governing State</Label>
              <Input value={formData.governingState} onChange={(e) => handleInputChange("governingState", e.target.value)} />
              <Label>Attorney Fees</Label>
              <Textarea value={formData.attorneyFees} onChange={(e) => handleInputChange("attorneyFees", e.target.value)} />
              <Label>Employer Name</Label>
              <Input value={formData.employerName} onChange={(e) => handleInputChange("employerName", e.target.value)} />
              <Label>Employer Title</Label>
              <Input value={formData.employerTitle} onChange={(e) => handleInputChange("employerTitle", e.target.value)} />
              <Label>Employee Signature Name</Label>
              <Input value={formData.employeeSignatureName} onChange={(e) => handleInputChange("employeeSignatureName", e.target.value)} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Progress Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Work From Home Agreement</h1>
        <p className="text-gray-600">Fill the form and export as PDF.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 7</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <div className="flex gap-2">
          {currentStep < 7 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" />
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