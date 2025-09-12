import React, { useState } from "react";
import jsPDF from "jspdf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OfferOfEmploymentLetterForm() {
  const [formData, setFormData] = useState({
    // General
    date: "",
    deadlineDate: "",
    state: "",

    // Employee details
    employeeFullName: "",
    employeeAddress: "",
    employeeCityStateZip: "",

    // Employer details
    employerFullName: "",
    employerAddress: "",
    employerCityStateZip: "",

    // Job details
    positionTitle: "",
    meetingDate: "",
    supervisorNameTitle: "",

    // Compensation
    baseSalary: "",
    commissionPercentage: "",
    commissionBasis: "",

    // Benefits & Leave
    vacationDays: "",
    sickLeaveDays: "",

    // Non-compete
    nonCompetePeriod: "",
    nonCompeteGeographicArea: "",
    nonSolicitPeriod: "",

    // Employer signature
    employerTitle: "",
    employerSignatureDate: "",

    // Employee signature
    employeeSignatureDate: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));


  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let currentY = 20;
    const lineHeight = 8;

    const addText = (text, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line) => {
        if (currentY > 280) {
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

    // ----- Start PDF Content -----
    addText("OFFER OF EMPLOYMENT LETTER", 13, true, true);
    currentY += 5;

    addText(`Date: ${formData.date}`);
    currentY += 5;

    addText("To:");
    addText(formData.employeeFullName);
    addText(formData.employeeAddress);
    addText(formData.employeeCityStateZip);
    currentY += 5;

    addText("From:");
    addText(formData.employerFullName);
    addText(formData.employerAddress);
    addText(formData.employerCityStateZip);
    currentY += 5;

    addText("1. POSITION OFFER", 12, true);
    addText(
      `We are pleased to extend to you an offer of employment for the position of ${formData.positionTitle} with ${formData.employerFullName} (“Employer”), as discussed during our meeting on ${formData.meetingDate}.`
    );
    addText(
      "Your acceptance of this offer constitutes your agreement to the terms, conditions, and obligations set forth in this letter, which shall remain binding until superseded by a formal written Employment Agreement."
    );

    addText("2. COMMENCEMENT OF EMPLOYMENT", 12, true);
    addText(
      `Your anticipated start date will be ${formData.date}, or such other date as mutually agreed in writing. You will report directly to ${formData.supervisorNameTitle}, or such other supervisor as the Employer may designate.`
    );

    addText("3. JOB RESPONSIBILITIES", 12, true);
    addText(
      `You will perform all duties customarily associated with the position of ${formData.positionTitle}, along with such additional tasks as may reasonably be assigned from time to time. You are expected to discharge your responsibilities with diligence, integrity, and full compliance with all company policies, applicable laws, and professional standards.`
    );

    addText("4. COMPENSATION", 12, true);
    addText(
      `4.1 Base Salary – You will receive monthly salary of $${formData.baseSalary}, payable in accordance with the Employer’s standard payroll schedule and subject to all applicable withholdings and deductions.`
    );
    addText(
      `4.2 Commission – In addition to your base salary, you will be entitled to commissions calculated at ${formData.commissionPercentage}% of ${formData.commissionBasis}, subject to adjustment in accordance with company policy.`
    );

    addText("5. EXPENSE REIMBURSEMENT", 12, true);
    addText(
      "You will be reimbursed for reasonable, pre-approved out-of-pocket business expenses incurred in the course of performing your duties, provided that proper documentation is submitted in accordance with the Employer’s expense reimbursement policy."
    );

    addText("6. BENEFITS AND LEAVE", 12, true);
    addText(
      `6.1 Benefits – You will be eligible to participate in such health, retirement, and other benefit programs as the Employer may offer from time to time, subject to the applicable terms and eligibility requirements.`
    );
    addText(
      `6.2 Vacation Leave – You will be entitled to ${formData.vacationDays} days of paid vacation per calendar year.`
    );
    addText(
      `6.3 Sick/Personal Leave – You will be entitled to ${formData.sickLeaveDays} days of paid sick or personal leave per calendar year, subject to applicable law and company policy.`
    );

    addText("7. EMPLOYMENT RELATIONSHIP", 12, true);
    addText(
      "Your employment will be at-will, meaning that either you or the Employer may terminate the relationship at any time, with or without cause, and with or without notice, subject to applicable law."
    );

    addText("8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY", 12, true);
    addText(
      "8.1 Confidentiality – You agree to maintain the confidentiality of all proprietary, trade secret, or confidential information belonging to the Employer, whether obtained before, during, or after your employment, and not to use or disclose such information except as authorized in writing by the Employer."
    );
    addText(
      "8.2 Intellectual Property – Any inventions, designs, works of authorship, processes, or other intellectual property created by you in the scope of your employment, or using the Employer’s resources, shall be the sole and exclusive property of the Employer. You agree to execute any documents necessary to vest such rights in the Employer."
    );

    addText("9. NON-COMPETE AND NON-SOLICITATION", 12, true);
    addText(
      `9.1 Non-Compete – During your employment and for a period of ${formData.nonCompetePeriod} following termination, you shall not, within ${formData.nonCompeteGeographicArea}, engage in or provide services to any business that is in direct competition with the Employer’s business as conducted during your employment.`
    );
    addText(
      `9.2 Non-Solicitation – During your employment and for a period of ${formData.nonSolicitPeriod} following termination, you shall not solicit, divert, or attempt to induce any employee, contractor, or client of the Employer to terminate or alter their relationship with the Employer.`
    );

    addText("10. CONDITIONS OF OFFER", 12, true);
    addText("This offer is contingent upon:");
    addText("Your written acceptance of this letter.", 11, false);
    addText(
      "Completion of all pre-employment requirements, including any background checks, reference verifications, or drug screening as may be required by the Employer.",
      11,
      false
    );

    addText("11. NON-CONTRACTUAL NATURE", 12, true);
    addText(
      "This letter is not intended to create a guarantee of continued employment for any specific duration, and the at-will nature of your employment shall remain in effect unless expressly modified by a subsequent written agreement signed by both parties."
    );

    addText("12. GOVERNING LAW", 12, true);
    addText(
      `This letter shall be governed by and construed in accordance with the laws of the State of ${formData.state}, without regard to its conflict of laws principles.`
    );

    addText("13. ACCEPTANCE OF OFFER", 12, true);
    addText(
      `If you accept this offer, please sign and return a copy of this letter by ${formData.deadlineDate}.`
    );
    addText(
      "We look forward to working with you and are confident that your skills and dedication will be valuable assets to our team."
    );

    addText("Sincerely,");
    addText(formData.employerFullName);
    addText(formData.employerTitle);
    addText("Signature: _______________________");
    addText(`Date: ${formData.employerSignatureDate}`);
    currentY += 5;

    addText("Acknowledgement and Acceptance:");
    addText(
      `I, ${formData.employeeFullName}, acknowledge that I have read and understood the terms of this Offer of Employment and agree to be bound by them.`
    );
    addText("Employee Signature: _________________________");
    addText(`Date: ${formData.employeeSignatureDate}`);

    // Save PDF
    doc.save("OfferOfEmploymentLetter.pdf");
  };

   const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deadlineDate">Deadline Date</Label>
                <Input
                  id="deadlineDate"
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) =>
                    handleInputChange("deadlineDate", e.target.value)
                  }
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
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employeeFullName">Full Name</Label>
                <Input
                  id="employeeFullName"
                  value={formData.employeeFullName}
                  onChange={(e) =>
                    handleInputChange("employeeFullName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employeeAddress">Address</Label>
                <Textarea
                  id="employeeAddress"
                  value={formData.employeeAddress}
                  onChange={(e) =>
                    handleInputChange("employeeAddress", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employeeCityStateZip">City, State, ZIP</Label>
                <Input
                  id="employeeCityStateZip"
                  value={formData.employeeCityStateZip}
                  onChange={(e) =>
                    handleInputChange("employeeCityStateZip", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Employer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employerFullName">Full Name</Label>
                <Input
                  id="employerFullName"
                  value={formData.employerFullName}
                  onChange={(e) =>
                    handleInputChange("employerFullName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employerAddress">Address</Label>
                <Textarea
                  id="employerAddress"
                  value={formData.employerAddress}
                  onChange={(e) =>
                    handleInputChange("employerAddress", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employerCityStateZip">City, State, ZIP</Label>
                <Input
                  id="employerCityStateZip"
                  value={formData.employerCityStateZip}
                  onChange={(e) =>
                    handleInputChange("employerCityStateZip", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  id="positionTitle"
                  value={formData.positionTitle}
                  onChange={(e) =>
                    handleInputChange("positionTitle", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="meetingDate">Meeting Date</Label>
                <Input
                  id="meetingDate"
                  type="date"
                  value={formData.meetingDate}
                  onChange={(e) =>
                    handleInputChange("meetingDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="supervisorNameTitle">
                  Supervisor Name & Title
                </Label>
                <Input
                  id="supervisorNameTitle"
                  value={formData.supervisorNameTitle}
                  onChange={(e) =>
                    handleInputChange("supervisorNameTitle", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="baseSalary">Base Salary (annual)</Label>
                <Input
                  id="baseSalary"
                  value={formData.baseSalary}
                  onChange={(e) =>
                    handleInputChange("baseSalary", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="commissionPercentage">Commission %</Label>
                <Input
                  id="commissionPercentage"
                  value={formData.commissionPercentage}
                  onChange={(e) =>
                    handleInputChange("commissionPercentage", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="commissionBasis">Commission Basis</Label>
                <Input
                  id="commissionBasis"
                  value={formData.commissionBasis}
                  onChange={(e) =>
                    handleInputChange("commissionBasis", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Leave & Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="vacationDays">Vacation Days</Label>
                <Input
                  id="vacationDays"
                  value={formData.vacationDays}
                  onChange={(e) =>
                    handleInputChange("vacationDays", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="sickLeaveDays">Sick Leave Days</Label>
                <Input
                  id="sickLeaveDays"
                  value={formData.sickLeaveDays}
                  onChange={(e) =>
                    handleInputChange("sickLeaveDays", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="nonCompetePeriod">Non-Compete Period</Label>
                <Input
                  id="nonCompetePeriod"
                  value={formData.nonCompetePeriod}
                  onChange={(e) =>
                    handleInputChange("nonCompetePeriod", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="nonCompeteGeographicArea">
                  Non-Compete Geographic Area
                </Label>
                <Input
                  id="nonCompeteGeographicArea"
                  value={formData.nonCompeteGeographicArea}
                  onChange={(e) =>
                    handleInputChange(
                      "nonCompeteGeographicArea",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="nonSolicitPeriod">Non-Solicitation Period</Label>
                <Input
                  id="nonSolicitPeriod"
                  value={formData.nonSolicitPeriod}
                  onChange={(e) =>
                    handleInputChange("nonSolicitPeriod", e.target.value)
                  }
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
                <Label htmlFor="employerTitle">Employer Title</Label>
                <Input
                  id="employerTitle"
                  value={formData.employerTitle}
                  onChange={(e) =>
                    handleInputChange("employerTitle", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employerSignatureDate">
                  Employer Signature Date
                </Label>
                <Input
                  id="employerSignatureDate"
                  type="date"
                  value={formData.employerSignatureDate}
                  onChange={(e) =>
                    handleInputChange("employerSignatureDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="employeeSignatureDate">
                  Employee Signature Date
                </Label>
                <Input
                  id="employeeSignatureDate"
                  type="date"
                  value={formData.employeeSignatureDate}
                  onChange={(e) =>
                    handleInputChange("employeeSignatureDate", e.target.value)
                  }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Offer of Employment Letter
        </h1>
        <p className="text-gray-600">
          Fill in the details and export the offer letter as a PDF.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">
            Step {currentStep} of 7
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
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
}
