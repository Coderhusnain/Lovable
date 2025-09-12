import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface FormData {
  companyName: string;
  companyAddress: string;
  effectiveDate: string;
  employeeSignature: string;
}

const EmployeeHandbookGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyAddress: "",
    effectiveDate: "",
    employeeSignature: "",
  });

  const generatePDF = async () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 16;
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

      // Title
      addText("EMPLOYEE HANDBOOK", 16, true, true);
      currentY += 10;

      addText(formData.companyName || "[Company Name]", 12, true, true);
      addText(formData.companyAddress || "[Company Address]", 12, true, true);
      addText(
        `Effective Date: ${formData.effectiveDate || "[Insert Date]"}`,
        12,
        true,
        true
      );
      currentY += 20;

      // Full Handbook text (pixel-to-pixel, placeholders dynamic)
      const handbookText = `
Section 1 – Introduction
Welcome
Welcome to ${formData.companyName || "[Company Name]"} (“the Company”). We are pleased to have you join our team and contribute to our shared mission and values. This Handbook is intended to provide you with important information regarding the Company’s policies, procedures, benefits, and expectations.

Purpose of the Handbook
This Employee Handbook (“Handbook”) serves as a general guide to the Company’s workplace rules, policies, and employee benefits. It applies to all employees of the Company, regardless of position, unless otherwise stated. Compliance with the policies set forth herein is a condition of continued employment.
This Handbook supersedes and replaces all prior oral or written policies, procedures, rules, or benefits previously communicated to employees, whether formal or informal, express or implied.
The Company reserves the sole and absolute discretion to amend, modify, rescind, delete, or supplement any provision of this Handbook at any time, with or without notice, except for the policy of employment-at-will, which may only be modified in a written agreement signed by both the employee and an authorized representative of the Company.
This Handbook is not an express or implied contract of employment. Nothing contained herein shall alter the at-will employment relationship or create any contractual rights to continued employment.

Changes in Policy
Due to the evolving nature of our business, the Company expressly reserves the right to revise, modify, or eliminate any policies, procedures, work rules, or benefits described in this Handbook. Only the Chief Executive Officer or an authorized executive officer may approve changes to the at-will employment status, and such changes must be documented in a signed written agreement.

Employment-At-Will
Employment with the Company is on an at-will basis unless otherwise expressly provided in a duly executed written employment agreement. This means that either the employee or the Company may terminate the employment relationship at any time, with or without cause, and with or without notice, subject only to applicable federal, state, and local laws.

Section 2 – Employment Policies
Employee Classifications
For purposes of compensation, benefits, and compliance with wage and hour laws, employees are classified as follows:
Exempt Employees – Those whose positions meet the requirements of the Fair Labor Standards Act (FLSA) and applicable state law for exemption from overtime.
Non-Exempt Employees – Those whose positions do not meet exemption criteria and who are therefore entitled to overtime pay in accordance with applicable law.
Full-Time Employees – Employees regularly scheduled to work [number] or more hours per week.
Part-Time Employees – Employees regularly scheduled to work fewer than [number] hours per week.
Temporary Employees – Employees engaged for a fixed term or specific project with no guarantee of continued employment.
Independent Contractors/Consultants – Individuals retained under contract to perform services and who are not employees of the Company.

Equal Employment Opportunity (EEO) and ADA Compliance
The Company is committed to providing equal employment opportunities to all qualified individuals and prohibits discrimination based on race, color, religion, sex, sexual orientation, gender identity or expression, age, national origin, disability, veteran status, or any other protected category under federal, state, or local law.
The Company will provide reasonable accommodations to qualified individuals with disabilities in accordance with the Americans with Disabilities Act (ADA) and applicable state law, unless such accommodations would impose an undue hardship on the Company.

Confidentiality
Employees may be entrusted with confidential, proprietary, or trade secret information belonging to the Company. Employees are prohibited from using or disclosing such information except as required in the performance of their duties or as authorized in writing by the Company. This obligation continues after employment ends.

Employment of Minors
The Company complies with all applicable child labor laws, including those under the FLSA, and will not employ individuals under the legal minimum working age.

Employment of Relatives
The Company may restrict or prohibit the employment of immediate family members in circumstances where it may present a conflict of interest, create supervisory/subordinate relationships, or otherwise disrupt business operations.

Introductory Period
The first [number] days of employment constitute an introductory or probationary period, during which performance and suitability for continued employment will be evaluated.

Personnel Records and Employee References
Personnel files are the property of the Company. Employees may review their own records in accordance with applicable law. Only authorized personnel may provide employment references.

Privacy
While the Company respects employee privacy, employees should have no expectation of privacy in any Company property, including offices, desks, lockers, vehicles, or electronic systems.

Immigration Law Compliance
In accordance with the Immigration Reform and Control Act, all employees must complete the Form I-9 and provide documentation verifying their eligibility to work in the United States.

Political Neutrality
Employees may engage in lawful political activities outside of work but may not use Company resources, time, or branding for political purposes.

Section 3 – Hours of Work and Payroll Practices
Pay Periods & Paydays – Employees are paid on a bi-weekly schedule unless otherwise specified.
Overtime – Non-exempt employees are entitled to overtime pay for hours worked over 40 in a workweek, or as otherwise provided by state law.
Rest & Meal Periods – Provided in accordance with applicable federal and state law.
Timekeeping – Accurate recording of hours worked is mandatory. Falsifying time records is grounds for immediate termination.
Payroll Deductions – Deductions will be made for taxes, insurance premiums, retirement contributions, and other authorized purposes.
Wage Garnishment – The Company will comply with court-ordered wage garnishments.
Direct Deposit – Direct deposit is encouraged but optional, unless otherwise required by law.

Section 4 – Standards of Conduct and Employee Performance
Anti-Harassment & Discrimination – Strictly prohibited; employees must report violations promptly.
Attendance – Reliable attendance is essential; excessive absenteeism may result in discipline.
Dress Code – Employees must dress appropriately for their position, with consideration for safety and professionalism.
Pet Policy – Only registered service animals are permitted; advance notice to a supervisor is required.
Safety – Compliance with OSHA and other safety regulations is mandatory.
Substance Abuse – Possession or use of illegal drugs on Company property is prohibited. Alcohol permitted only at approved events.
Workplace Searches – The Company reserves the right to search any property on its premises.
Internet, Email, and Computer Use – Company technology is for business use only; personal use is restricted.
Cell Phone Use – Personal calls should be limited to break times; must not interfere with work.

Section 5 – Benefits and Services
Workers’ Compensation – Provided in accordance with law.
Social Security (FICA) – Employer and employee contributions as required.
Unemployment Insurance – Provided as required by law.

Section 6 – Leaves of Absence and Time Off
Family & Medical Leave – Granted as required by applicable law; the Company may voluntarily approve unpaid leave requests.
Workers’ Compensation Leave – Available in cases of job-related injury.
Jury Duty – Paid or unpaid leave as required by law; employees must notify management immediately upon receipt of a summons.

Acknowledgement
I acknowledge that I have received and read the Employee Handbook, understand its provisions, and agree to comply with all policies contained herein.
Employee Signature: ${formData.employeeSignature || "_________________"}
Date: ${formData.effectiveDate || "___________________"}
`;

      addText(handbookText, 11, false, false);

      doc.save("employee-handbook.pdf");
      toast.success("Employee Handbook PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Employee Handbook PDF");
    }
  };

 const renderStep = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
         
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            value={formData.companyAddress}
            onChange={(e) =>
              setFormData({ ...formData, companyAddress: e.target.value })
            }
            placeholder="Enter company address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="effectiveDate">Effective Date</Label>
          <Input
            id="effectiveDate"
            type="date"
            value={formData.effectiveDate}
            onChange={(e) =>
              setFormData({ ...formData, effectiveDate: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeSignature">Employee Signature</Label>
          <Input
            id="employeeSignature"
            value={formData.employeeSignature}
            onChange={(e) =>
              setFormData({ ...formData, employeeSignature: e.target.value })
            }
            placeholder="Type full name as signature"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={generatePDF} className="flex items-center gap-2">
            Generate PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

return (
  <div className="max-w-3xl mx-auto p-6 bg-gray-50">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Employee Handbook
      </h1>
      <p className="text-gray-600">
        Fill in the details below and generate a handbook PDF.
      </p>
    </div>

    {renderStep()}
  </div>
);

};

export default EmployeeHandbookGenerator;
