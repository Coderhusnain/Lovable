import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  companyName: string;
  jurisdiction: string;
  companyAddress: string;
  employeeName: string;
  employeeAddress: string;
  positionTitle: string;
  retirementDate: string;
  baseSalaryAmount: string;
  adjustmentDate: string;
  severanceYears: string;
  cobraMonths: string;
  governingLaw: string;
  employeeSignature: string;
  employeeSignatureDate: string;
  employerSignature: string;
  employerSignatureDate: string;
}

export default function RetirementAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    companyName: "",
    jurisdiction: "",
    companyAddress: "",
    employeeName: "",
    employeeAddress: "",
    positionTitle: "",
    retirementDate: "",
    baseSalaryAmount: "",
    adjustmentDate: "",
    severanceYears: "",
    cobraMonths: "",
    governingLaw: "",
    employeeSignature: "",
    employeeSignatureDate: "",
    employerSignature: "",
    employerSignatureDate: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PDF Generator with pixel-to-pixel text
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
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

    // === AGREEMENT CONTENT START ===
    addText("EMPLOYEE RETIREMENT AGREEMENT", 14, true, true);
    addText(
      `This Employee Retirement Agreement (“Agreement”) is made and entered into as of ${formData.effectiveDate}, by and between ${formData.companyName}, a corporation duly organized and existing under the laws of ${formData.jurisdiction}, having its principal place of business at ${formData.companyAddress} (hereinafter referred to as the “Company”), and ${formData.employeeName}, residing at ${formData.employeeAddress} (hereinafter referred to as the “Employee”). The Company and the Employee may hereinafter be referred to collectively as the “Parties” and individually as a “Party.”`
    );

    addText("RECITALS", 12, true);
    addText(
      `WHEREAS, the Employee has rendered valuable service to the Company in various capacities during their tenure and is presently employed in the position of ${formData.positionTitle};`
    );
    addText(
      `WHEREAS, the Parties have mutually agreed that it is in their respective best interests for the Employee to retire from employment with the Company, effective ${formData.retirementDate};`
    );
    addText(
      `WHEREAS, the Parties wish to formally set forth the terms and conditions governing the Employee’s retirement and the cessation of their employment with the Company;`
    );
    addText(
      "NOW, THEREFORE, in consideration of the mutual promises, covenants, and undertakings contained herein, and intending to be legally bound, the Parties agree as follows:"
    );

    addText("1. Retirement", 12, true);
    addText(
      `The Employee shall voluntarily retire from and thereby terminate their employment with the Company, effective ${formData.retirementDate} (the “Retirement Date”). As of the Retirement Date, the Employee’s employment and all rights to compensation, remuneration, and benefits under the Company’s benefit plans shall cease, except as expressly provided in this Agreement or required by applicable law.`
    );

    addText("2. Employment Prior to Retirement Date", 12, true);
    addText(
      `Until the Retirement Date, the Employee shall remain employed in the position of ${formData.positionTitle} and shall continue to receive their current base salary in the amount of $${formData.baseSalaryAmount} per month, together with all existing employment benefits. Any retroactive adjustments to base salary shall be paid to the Employee on or before ${formData.adjustmentDate}.`
    );

    addText("3. Severance Benefits", 12, true);
    addText(
      `Commencing on the Retirement Date and continuing for a period of ${formData.severanceYears} years, the Company shall pay the Employee, in accordance with its normal payroll schedule, an amount equal in the aggregate to ${formData.severanceYears} years of the Employee’s base salary as in effect immediately prior to the Retirement Date.`
    );
    addText(
      `In addition, the Company shall reimburse the Employee for the cost of continuing medical and dental insurance coverage for the Employee and any eligible dependents under the Consolidated Omnibus Budget Reconciliation Act of 1985 (“COBRA”), for the duration of the Employee’s COBRA eligibility, but in no event beyond ${formData.cobraMonths} months from the Retirement Date.`
    );

    addText("4. No Mitigation", 12, true);
    addText(
      "The severance benefits provided herein shall not be subject to mitigation or reduction on account of the Employee’s acceptance of other employment or engagement in any other business following retirement, unless otherwise expressly agreed in writing by the Parties."
    );

    addText("5. Employee Covenants", 12, true);
    addText(
      "(a) Confidentiality and Non-Disclosure – The Employee shall not, during or after employment, disclose any confidential or proprietary information of the Company, except as required in the performance of duties or by law, without the Company’s prior written consent."
    );
    addText(
      "(b) Non-Solicitation – For a period of one (1) year following the Retirement Date, the Employee shall not, directly or indirectly, solicit or induce any employee, customer, or supplier of the Company to terminate or alter their relationship with the Company."
    );
    addText(
      "(c) Non-Competition – For a period of one (1) year following the Retirement Date, the Employee shall not, without the Company’s prior written consent, engage in any business that competes directly with the Company."
    );

    addText("6. Remedies", 12, true);
    addText(
      "Any breach of the covenants contained herein shall entitle the Company to equitable relief, including but not limited to injunctive relief, in addition to any other remedies available at law or in equity."
    );

    addText("7. Cooperation and Non-Disparagement", 12, true);
    addText(
      "The Employee shall reasonably cooperate with the Company in any legal, regulatory, or business matters in which the Employee’s prior knowledge may be relevant. Neither Party shall make any disparaging or defamatory statements about the other."
    );

    addText("8. Release of Claims", 12, true);
    addText(
      "(a) By Employee – In consideration of the benefits provided herein, the Employee hereby releases and forever discharges the Company and its affiliates from any and all claims, demands, and liabilities arising out of or in connection with their employment or the termination thereof."
    );
    addText(
      "(b) By Company – The Company releases the Employee from any claims it may have, except for those expressly preserved herein."
    );

    addText("9. Return of Property", 12, true);
    addText(
      "On or before the Retirement Date, the Employee shall return all Company property in their possession, including but not limited to documents, records, computers, keys, and security devices."
    );

    addText("10. Confidentiality of Agreement", 12, true);
    addText(
      "The terms of this Agreement shall remain confidential and shall not be disclosed by either Party, except to legal, financial, or governmental advisors, or to immediate family members who agree to maintain confidentiality."
    );

    addText("11. Governing Law", 12, true);
    addText(
      `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw}, without regard to conflict of laws principles.`
    );

    addText("12. Entire Agreement", 12, true);
    addText(
      "This Agreement contains the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, or representations, whether written or oral."
    );

    addText("13. Amendments", 12, true);
    addText(
      "This Agreement may be amended only by a written instrument signed by both Parties."
    );

    addText("14. Counterparts", 12, true);
    addText(
      "This Agreement may be executed in multiple counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument."
    );

    addText("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");

    addText(`The Employee: ${formData.employeeSignature} Date: ${formData.employeeSignatureDate}`);
    addText(`The Employer: ${formData.employerSignature} Date: ${formData.employerSignatureDate}`);

    // Save file
    doc.save("Employee_Retirement_Agreement.pdf");
  };

  // Step rendering
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Company Name</Label>
              <Input name="companyName" value={formData.companyName} onChange={handleChange} />
              <Label>Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />
              <Label>Company Address</Label>
              <Input name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              <Label>Employee Name</Label>
              <Input name="employeeName" value={formData.employeeName} onChange={handleChange} />
              <Label>Employee Address</Label>
              <Input name="employeeAddress" value={formData.employeeAddress} onChange={handleChange} />
              <Label>Position Title</Label>
              <Input name="positionTitle" value={formData.positionTitle} onChange={handleChange} />
              <Label>Retirement Date</Label>
              <Input name="retirementDate" value={formData.retirementDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent>
              <Label>Base Salary Amount</Label>
              <Input name="baseSalaryAmount" value={formData.baseSalaryAmount} onChange={handleChange} />
              <Label>Adjustment Date</Label>
              <Input name="adjustmentDate" value={formData.adjustmentDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent>
              <Label>Severance Years</Label>
              <Input name="severanceYears" value={formData.severanceYears} onChange={handleChange} />
              <Label>COBRA Months</Label>
              <Input name="cobraMonths" value={formData.cobraMonths} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent>
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent>
              <Label>Employee Signature</Label>
              <Input name="employeeSignature" value={formData.employeeSignature} onChange={handleChange} />
              <Label>Employee Signature Date</Label>
              <Input name="employeeSignatureDate" value={formData.employeeSignatureDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent>
              <Label>Employer Signature</Label>
              <Input name="employerSignature" value={formData.employerSignature} onChange={handleChange} />
              <Label>Employer Signature Date</Label>
              <Input name="employerSignatureDate" value={formData.employerSignatureDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {renderStep()}
      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep(step - 1)}>Back</Button>
        {step < 7 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={generatePDF}>Generate PDF</Button>
        )}
      </div>
    </div>
  );
}
