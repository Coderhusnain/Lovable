import{r as E,j as e,C as k,k as _,l as P,b as D,a as S,J as c}from"./index-EUBTzQul.js";import{E as j}from"./jspdf.es.min-CJIQpcZG.js";import{I as s}from"./input-BXL43AC-.js";import{L as l}from"./label-9rsijxaJ.js";const I=()=>{const[t,n]=E.useState({companyName:"",companyAddress:"",effectiveDate:"",employeeSignature:""}),y=async()=>{try{const o=new j({unit:"pt",format:"letter"}),d=o.internal.pageSize.width,r=40,u=16;let a=r;const i=(g,p=11,w=!1,b=!1)=>{o.setFontSize(p),o.setFont("times",w?"bold":"normal");const v=d-r*2;o.splitTextToSize(g,v).forEach(m=>{if(a>720&&(o.addPage(),a=r),b){const x=o.getStringUnitWidth(m)*p/o.internal.scaleFactor,C=(d-x)/2;o.text(m,C,a)}else o.text(m,r,a);a+=u})};i("EMPLOYEE HANDBOOK",16,!0,!0),a+=10,i(t.companyName||"[Company Name]",12,!0,!0),i(t.companyAddress||"[Company Address]",12,!0,!0),i(`Effective Date: ${t.effectiveDate||"[Insert Date]"}`,12,!0,!0),a+=20;const f=`
Section 1 – Introduction
Welcome
Welcome to ${t.companyName||"[Company Name]"} (“the Company”). We are pleased to have you join our team and contribute to our shared mission and values. This Handbook is intended to provide you with important information regarding the Company’s policies, procedures, benefits, and expectations.

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
Employee Signature: ${t.employeeSignature||"_________________"}
Date: ${t.effectiveDate||"___________________"}
`;i(f,11,!1,!1),o.save("employee-handbook.pdf"),c.success("Employee Handbook PDF generated successfully!")}catch(o){console.error("Error generating PDF:",o),c.error("Failed to generate Employee Handbook PDF")}},h=()=>e.jsxs(k,{children:[e.jsx(_,{children:e.jsx(P,{className:"flex items-center gap-2"})}),e.jsxs(D,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"companyName",children:"Company Name"}),e.jsx(s,{id:"companyName",value:t.companyName,onChange:o=>n({...t,companyName:o.target.value}),placeholder:"Enter company name"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"companyAddress",children:"Company Address"}),e.jsx(s,{id:"companyAddress",value:t.companyAddress,onChange:o=>n({...t,companyAddress:o.target.value}),placeholder:"Enter company address"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"effectiveDate",children:"Effective Date"}),e.jsx(s,{id:"effectiveDate",type:"date",value:t.effectiveDate,onChange:o=>n({...t,effectiveDate:o.target.value})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"employeeSignature",children:"Employee Signature"}),e.jsx(s,{id:"employeeSignature",value:t.employeeSignature,onChange:o=>n({...t,employeeSignature:o.target.value}),placeholder:"Type full name as signature"})]}),e.jsx("div",{className:"flex justify-end pt-4",children:e.jsx(S,{onClick:y,className:"flex items-center gap-2",children:"Generate PDF"})})]})]});return e.jsxs("div",{className:"max-w-3xl mx-auto p-6 bg-gray-50",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Employee Handbook"}),e.jsx("p",{className:"text-gray-600",children:"Fill in the details below and generate a handbook PDF."})]}),h()]})};export{I as default};
