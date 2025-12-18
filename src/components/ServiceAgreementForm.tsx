import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  clientName: string;
  clientAddress: string;
  providerName: string;
  providerAddress: string;
  background: string;
  startDate: string;
  servicesDescription: string;
  commissionDetails: string;
  expensesDetails: string;
  supportServices: string;
  termEndDate: string;
  terminationNoticeDays: string;
  relationshipClause: string;
  conflictsDescription: string;
  indemnification: string;
  employeesClause: string;
  ipAssignment: string;
  socialMediaClause: string;
  confidentiality: string;
  governingLaw: string;
  signClientName: string;
  signClientDate: string;
  signProviderName: string;
  signProviderDate: string;
}

export default function ServiceAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    clientName: "",
    clientAddress: "",
    providerName: "",
    providerAddress: "",
    background: "",
    startDate: "",
    servicesDescription: "",
    commissionDetails: "",
    expensesDetails: "",
    supportServices: "",
    termEndDate: "",
    terminationNoticeDays: "30",
    relationshipClause: "Independent contractor",
    conflictsDescription: "",
    indemnification: "",
    employeesClause: "",
    ipAssignment: "Client owns work product unless otherwise agreed",
    socialMediaClause: "Client owns social media contacts and digital assets created",
    confidentiality: "",
    governingLaw: "",
    signClientName: "",
    signClientDate: "",
    signProviderName: "",
    signProviderDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += size * 1.3;
      });
    };

    write("SERVICE AGREEMENT", 14, true, true);
    write("\n");

    write(`This Service Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "[Effective Date]"}, By and Between`);
    write(`${formData.clientName || "[Party Name]"}, having its principal place of business at ${formData.clientAddress || "[Address]"} (hereinafter referred to as the "Client"),`);
    write(`And`);
    write(`${formData.providerName || "[Party Name]"}, having its principal place of business at ${formData.providerAddress || "[Address]"} (hereinafter referred to as the "Service Provider").`);
    write("The Client and the Service Provider may hereinafter be referred to individually as a \"Party\" and collectively as the \"Parties.\"");
    write("WHEREAS, the Service Provider possesses the requisite background, experience, skill, and expertise in " + (formData.background || "[Background]") + ";");
    write("AND WHEREAS, the Client desires to engage the Service Provider to provide certain professional services, and the Service Provider is willing to render such services under the terms and conditions set forth herein;");
    write("NOW, THEREFORE, in consideration of the mutual covenants and undertakings contained herein, the Parties hereby agree as follows:");

    write("\n");
    write("1. DESCRIPTION OF SERVICES", 12, true);
    write("1.1 Scope of Services");
    write("Commencing on " + (formData.startDate || "[Date]") + ", the Service Provider shall provide the following services (collectively, the \"Services\") to the Client as detailed in the attached proposal and/or Schedule A, which forms an integral part of this Agreement: " + (formData.servicesDescription || "[Description of Services]") + ".");
    write("1.2 Performance of Services");
    write("The manner, method, and timing of performance of the Services, including working hours and modes of execution, shall be determined by the Service Provider, subject to the reasonable expectations and objectives of the Client. The Service Provider undertakes to devote such time, attention, and effort as may be reasonably necessary to fulfill its obligations in a professional and diligent manner.");

    write("\n");
    write("2. COMPENSATION AND COMMISSION", 12, true);
    write("2.1 Commission Payments");
    write("In addition to any fixed or agreed remuneration, the Client shall pay commission to the Service Provider by " + (formData.commissionDetails || "[Means of Payment]") + ", calculated on the basis of " + (formData.commissionDetails || "[Basis of Commission]") + ", as mutually agreed for the purposes of this Agreement.");
    write("\n");
    write("2.2 Expense Reimbursement");
    write("The Service Provider shall bear its own general out-of-pocket expenses unless otherwise agreed. The Client shall reimburse the Service Provider for the following approved expenses upon submission of reasonable proof: " + (formData.expensesDetails || "[Details]") + ".");

    write("\n");
    write("3. SUPPORT SERVICES", 12, true);
    write("The Client shall provide the following support services to facilitate the performance of the Services, where applicable: " + (formData.supportServices || "Office space; Staff and secretarial assistance; Office supplies; [Other Support Services]") + ".");

    write("\n");
    write("4. TERM AND TERMINATION", 12, true);
    write("This Agreement shall remain in force until the completion of the Services or until " + (formData.termEndDate || "[Termination Date]") + ", whichever occurs first. It may be terminated:\n• Automatically upon completion of Services;\n• By either Party by providing " + (formData.terminationNoticeDays || "[Number]") + " days' prior written notice;\n• Upon expiry of the agreed term of [Number], subject to automatic renewal for successive periods of the same duration unless terminated by written notice prior to expiry.");

    write("\n");
    write("5. RELATIONSHIP OF PARTIES", 12, true);
    write((formData.relationshipClause || "The Service Provider shall perform the Services as an independent contractor.") + " Nothing contained herein shall be deemed to create an employer-employee, agency, partnership, or joint venture relationship between the Parties. The Service Provider shall not be entitled to any employee benefits, including but not limited to health insurance or paid leave.");

    write("\n");
    write("6. DISCLOSURE OF CONFLICTS", 12, true);
    write("The Service Provider shall promptly disclose any outside activity, interest, or participation that conflicts or may reasonably be deemed to conflict with the Client's best interests, particularly those relating to: " + (formData.conflictsDescription || "[Description]") + ".");

    write("\n");
    write("7. INDEMNIFICATION", 12, true);
    write((formData.indemnification || "Each Party agrees to indemnify, defend, and hold harmless the other Party against any claims, losses, damages, costs, and expenses, including legal fees, arising out of the negligent acts, omissions, or misconduct of the indemnifying Party or its employees, agents, or representatives.") );

    write("\n");
    write("8. EMPLOYEES", 12, true);
    write((formData.employeesClause || "Any employees or personnel engaged by the Service Provider to perform Services under this Agreement shall be bound by its provisions. Upon request, the Service Provider shall provide satisfactory evidence regarding the employment status of such individuals.") );

    write("\n");
    write("9. INTELLECTUAL PROPERTY RIGHTS", 12, true);
    write((formData.ipAssignment || "Any intellectual property created in the course of providing the Services shall vest in the Client unless otherwise agreed.") + " Any pre-existing intellectual property of the Service Provider listed in Exhibit A shall remain the exclusive property of the Service Provider.");

    write("\n");
    write("10. OWNERSHIP OF SOCIAL MEDIA CONTACTS", 12, true);
    write((formData.socialMediaClause || "All social media contacts, followers, and digital assets created or acquired while performing Services for the Client shall remain the exclusive property of the Client.") );

    write("\n");
    write("11. CONFIDENTIALITY", 12, true);
    write((formData.confidentiality || "The Service Provider acknowledges that it may have access to confidential and proprietary information belonging to the Client, including but not limited to trade secrets, technical information, customer data, and business methodologies. The Service Provider shall not disclose or use such information except as necessary for the fulfillment of this Agreement.") );

    write("\n");
    write("12. RETURN OF RECORDS", 12, true);
    write("Upon termination, the Service Provider shall immediately return all property, documents, and records belonging to the Client.");

    write("\n");
    write("13. ASSIGNMENT", 12, true);
    write("Neither Party may assign its rights or obligations without prior written consent, save for assignment to a successor or affiliated entity in the event of merger or sale of substantially all assets.");

    write("\n");
    write("14. INTERRUPTION OF SERVICE (FORCE MAJEURE)", 12, true);
    write("Either Party shall be excused from performance delays caused by events beyond reasonable control, including natural disasters, governmental actions, or labor disputes.");

    write("\n");
    write("15. GOVERNING LAW", 12, true);
    write("This Agreement shall be governed by and construed in accordance with the laws of " + (formData.governingLaw || "[State/Commonwealth]") + ".");

    write("\n");
    write("16. WAIVER", 12, true);
    write("Failure by either Party to enforce any provision shall not constitute a waiver of future enforcement rights.");

    write("\n");
    write("17. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.");

    write("\n");
    write("18. AMENDMENT", 12, true);
    write("This Agreement may only be amended by a written document signed by both Parties.");

    write("\n");
    write("19. SEVERABILITY", 12, true);
    write("If any provision is held invalid, the remaining provisions shall remain enforceable.");

    write("\n");
    write("20. NOTICES", 12, true);
    write("All notices shall be in writing and delivered to the addresses stated above.");

    write("\n");
    write("21. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first written above.");

    write("\n");
    write("For and on behalf of the Client:");
    write("Name: " + (formData.signClientName || "____________________________") );
    write("Signature: ________________________");
    write("Designation: ______________________");
    write("Date: " + (formData.signClientDate || "_____________________") );

    write("\n");
    write("For and on behalf of the Service Provider:");
    write("Name: " + (formData.signProviderName || "____________________________") );
    write("Signature: ________________________");
    write("Designation: ______________________");
    write("Date: " + (formData.signProviderDate || "_____________________") );

    doc.save("Service_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Clipboard className="w-6 h-6" />
                <h3 className="font-semibold">Parties & Services</h3>
              </div>
              <Label>Agreement Date (Effective Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label>Service Provider Name</Label>
              <Input name="providerName" value={formData.providerName} onChange={handleChange} />
              <Label>Service Provider Address</Label>
              <Textarea name="providerAddress" value={formData.providerAddress} onChange={handleChange} />

              <Label>Background / Provider Expertise</Label>
              <Input name="background" value={formData.background} onChange={handleChange} />

              <Label>Services Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />

              <Label>Describe Services (scope)</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Compensation, Term & Clauses</h3>
              <Label>Commission / Payment Details</Label>
              <Textarea name="commissionDetails" value={formData.commissionDetails} onChange={handleChange} />

              <Label>Expense Reimbursement Details</Label>
              <Textarea name="expensesDetails" value={formData.expensesDetails} onChange={handleChange} />

              <Label>Support Services (what client provides)</Label>
              <Textarea name="supportServices" value={formData.supportServices} onChange={handleChange} />

              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />

              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Relationship Clause (default: Independent contractor)</Label>
              <Input name="relationshipClause" value={formData.relationshipClause} onChange={handleChange} />

              <Label>Conflicts Description</Label>
              <Textarea name="conflictsDescription" value={formData.conflictsDescription} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">IP, Confidentiality & Signatures</h3>
              <Label>Intellectual Property Clause</Label>
              <Textarea name="ipAssignment" value={formData.ipAssignment} onChange={handleChange} />

              <Label>Social Media / Digital Assets Ownership</Label>
              <Textarea name="socialMediaClause" value={formData.socialMediaClause} onChange={handleChange} />

              <Label>Confidentiality Summary</Label>
              <Textarea name="confidentiality" value={formData.confidentiality} onChange={handleChange} />

              <hr />

              <Label>Client - Signatory Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />

              <Label>Service Provider - Signatory Name</Label>
              <Input name="signProviderName" value={formData.signProviderName} onChange={handleChange} />
              <Label>Service Provider - Date</Label>
              <Input name="signProviderDate" value={formData.signProviderDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Service Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
