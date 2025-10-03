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
  businessDescription: string;
  positionTitle: string;
  baseSalary: string;
  nonCompeteTime: string;
  nonCompeteArea: string;
  nonSolicitationTime: string;
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
    businessDescription: "",
    positionTitle: "",
    baseSalary: "",
    nonCompeteTime: "",
    nonCompeteArea: "",
    nonSolicitationTime: "",
    state: "",
    employerSignature: "",
    employeeSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 7));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      const addText = (
        text: string,
        fontSize = 11,
        isBold = false,
        isCenter = false
      ) => {
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

      // Title
      addText("EMPLOYMENT AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Employment Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Date]"} (“Effective Date”) by and between: ${formData.employerName || "[Employer’s Full Legal Name]"}, with its principal place of business at ${formData.employerAddress || "[Employer’s Address]"} (“Employer”), and ${formData.employeeName || "[Employee’s Full Legal Name]"}, residing at ${formData.employeeAddress || "[Employee’s Address]"} (“Employee”).`
      );
      addText(
        `Employer and Employee may hereinafter be referred to individually as a “Party” and collectively as the “Parties.”`
      );
      currentY += 4;

      // Recitals
      addText("RECITALS", 12, true);
      addText(
        `WHEREAS, the Employer is engaged in the business of ${formData.businessDescription || "[Business Description]"} and desires to secure the services of the Employee in the capacity described herein;`
      );
      addText(
        `WHEREAS, the Employee desires to accept such employment on the terms and conditions set forth in this Agreement;`
      );
      addText(
        `NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:`
      );
      currentY += 4;

      // Sections
      addText("1. POSITION AND DUTIES", 12, true);
      addText(
        `1.1 Position – The Employer hereby employs the Employee in the position of ${formData.positionTitle || "[Position Title]"}.`
      );
      addText(
        `1.2 Duties – The Employee shall perform all duties customarily associated with the position and such other related duties as the Employer may reasonably assign from time to time.`
      );
      addText(
        `1.3 Best Efforts – The Employee agrees to devote full working time, attention, skill, and best efforts to the performance of their duties and to act in the best interests of the Employer at all times.`
      );
      addText(
        `1.4 Social Media Content Ownership – Any social media accounts, content, or business contacts created by the Employee for the Employer’s benefit shall be the sole property of the Employer.`
      );
      currentY += 3;

      addText("2. PLACE OF EMPLOYMENT", 12, true);
      addText(
        `Unless otherwise agreed in writing, the Employee shall perform their duties primarily at [Work Location] or at such other locations as the Employer may reasonably designate.`
      );
      currentY += 3;

      addText("3. COMPENSATION AND BENEFITS", 12, true);
      addText(
        `3.1 Base Salary – The Employee shall be paid an annual salary of $${formData.baseSalary || "[Amount]"}, payable in accordance with the Employer’s standard payroll schedule and subject to applicable withholdings.`
      );
      addText(
        `3.2 Expense Reimbursement – The Employer shall reimburse the Employee for reasonable, documented, and pre-approved out-of-pocket expenses incurred in the performance of duties, in accordance with Employer policy.`
      );
      addText(
        `3.3 Benefits – The Employee shall be entitled to participate in the benefit plans, programs, and arrangements offered by the Employer to similarly situated employees, subject to the terms and conditions of such plans.`
      );
      addText(
        `3.4 Termination Payments – Upon termination, the Employer shall pay all compensation earned through the effective termination date; all other payment obligations shall cease.`
      );
      currentY += 3;

      addText("4. CONFIDENTIALITY AND NON-DISCLOSURE", 12, true);
      addText(
        `4.1 Confidential Information – The Employee shall not, during or after employment, disclose or use any Confidential Information belonging to the Employer, except as necessary for the proper performance of duties.`
      );
      addText(
        `4.2 Definition – “Confidential Information” includes, without limitation, trade secrets, customer lists, marketing strategies, pricing, processes, and any non-public business information.`
      );
      addText(
        `4.3 Remedies – The Employee acknowledges that unauthorized disclosure may cause irreparable harm to the Employer and agrees that the Employer may seek injunctive relief in addition to any other remedies available at law.`
      );
      currentY += 3;

      addText("5. NON-COMPETE AND NON-SOLICITATION", 12, true);
      addText(
        `5.1 Non-Compete – During employment and for ${formData.nonCompeteTime || "[Time Period]"} thereafter, the Employee shall not engage, directly or indirectly, in any business that competes with the Employer within ${formData.nonCompeteArea || "[Geographic Area]"}.`
      );
      addText(
        `5.2 Non-Solicitation – The Employee shall not solicit or induce any of the Employer’s employees, contractors, or clients to terminate their relationship with the Employer during the same period of ${formData.nonSolicitationTime || "[Time Period]"}.`
      );
      currentY += 3;

      addText("6. LIMITATIONS ON AUTHORITY", 12, true);
      addText(
        `The Employee shall not have the authority to bind the Employer to any contract or obligation without the Employer’s prior written consent.`
      );
      currentY += 3;

      addText("7. TERM AND TERMINATION", 12, true);
      addText(
        `7.1 At-Will Employment – Employment under this Agreement is at-will and may be terminated by either Party at any time, with or without cause, upon [Number] days/weeks written notice.`
      );
      addText(
        `7.2 Termination for Disability – The Employer may terminate this Agreement if the Employee becomes unable to perform essential job functions due to a permanent disability.`
      );
      currentY += 3;

      addText("8. RETURN OF PROPERTY", 12, true);
      addText(
        `Upon termination of employment, the Employee shall return all Employer property, documents, and materials, including electronic data, in their possession or control.`
      );
      currentY += 3;

      addText("9. COMPLIANCE WITH POLICIES", 12, true);
      addText(
        `The Employee agrees to comply with all of the Employer’s policies, procedures, and workplace rules as may be adopted or amended from time to time.`
      );
      currentY += 3;

      addText("10. NOTICES", 12, true);
      addText(
        `All notices required or permitted under this Agreement shall be in writing and delivered personally, sent by certified mail (return receipt requested), or by nationally recognized courier service to the addresses stated above or to such other address as either Party may designate in writing.`
      );
      currentY += 3;

      addText("11. GENERAL PROVISIONS", 12, true);
      addText(
        `11.1 Entire Agreement – This Agreement contains the entire agreement between the Parties and supersedes all prior negotiations, representations, or agreements, whether written or oral.`
      );
      addText(
        `11.2 Amendment – This Agreement may be amended only in writing signed by both Parties.`
      );
      addText(
        `11.3 Severability – If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.`
      );
      addText(
        `11.4 Waiver – The failure of either Party to enforce any provision shall not constitute a waiver of that or any other provision in the future.`
      );
      addText(
        `11.5 Governing Law – This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.state || "[State]"}, without regard to its conflict of laws principles.`
      );
      currentY += 3;

      addText("12. SIGNATURES", 12, true);
      addText(
        `Employer:\nName: ${formData.employerName || "_________________________"}\nSignature: ${formData.employerSignature || "_________________________"}\nDate: _________________________`
      );
      addText(
        `Employee:\nName: ${formData.employeeName || "_________________________"}\nSignature: ${formData.employeeSignature || "_________________________"}\nDate: _________________________`
      );

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
              <CardTitle>Agreement Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agreementDate">Effective Date</Label>
                <Input
                  id="agreementDate"
                  type="date"
                  value={formData.agreementDate}
                  onChange={(e) => handleInputChange("agreementDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Employer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employerName">Employer’s Full Legal Name</Label>
                <Input
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => handleInputChange("employerName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employerAddress">Employer’s Address</Label>
                <Textarea
                  id="employerAddress"
                  value={formData.employerAddress}
                  onChange={(e) => handleInputChange("employerAddress", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employeeName">Employee’s Full Legal Name</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange("employeeName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employeeAddress">Employee’s Address</Label>
                <Textarea
                  id="employeeAddress"
                  value={formData.employeeAddress}
                  onChange={(e) => handleInputChange("employeeAddress", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Role & Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessDescription">Business Description</Label>
                <Input
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  id="positionTitle"
                  value={formData.positionTitle}
                  onChange={(e) => handleInputChange("positionTitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="baseSalary">Base Salary (annual)</Label>
                <Input
                  id="baseSalary"
                  value={formData.baseSalary}
                  onChange={(e) => handleInputChange("baseSalary", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nonCompeteTime">Non-Compete Time</Label>
                <Input
                  id="nonCompeteTime"
                  value={formData.nonCompeteTime}
                  onChange={(e) => handleInputChange("nonCompeteTime", e.target.value)}
                  placeholder="[Time Period]"
                />
              </div>
              <div>
                <Label htmlFor="nonCompeteArea">Non-Compete Geographic Area</Label>
                <Input
                  id="nonCompeteArea"
                  value={formData.nonCompeteArea}
                  onChange={(e) => handleInputChange("nonCompeteArea", e.target.value)}
                  placeholder="[Geographic Area]"
                />
              </div>
              <div>
                <Label htmlFor="nonSolicitationTime">Non-Solicitation Time</Label>
                <Input
                  id="nonSolicitationTime"
                  value={formData.nonSolicitationTime}
                  onChange={(e) => handleInputChange("nonSolicitationTime", e.target.value)}
                  placeholder="[Time Period]"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notices & Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="noticePeriod">Notice Period (for at-will termination)</Label>
                <Input
                  id="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                  placeholder="[Number]"
                />
              </div>
              <div>
                <Label htmlFor="state">Governing State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employerSignature">Employer Signature (typed)</Label>
                <Input
                  id="employerSignature"
                  value={formData.employerSignature}
                  onChange={(e) => handleInputChange("employerSignature", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employeeSignature">Employee Signature (typed)</Label>
                <Input
                  id="employeeSignature"
                  value={formData.employeeSignature}
                  onChange={(e) => handleInputChange("employeeSignature", e.target.value)}
                />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employment Agreement</h1>
        <p className="text-gray-600">Create an Employment Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 7</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
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
          {currentStep < 7 ? (
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