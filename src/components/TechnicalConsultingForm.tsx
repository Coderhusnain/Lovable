import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
// Icon suggestion: import { Cpu } from "lucide-react";

interface FormData {
  effectiveDate: string;
  consultantName: string;
  consultantLegalStatus: string;
  consultantAddress: string;
  clientName: string;
  clientLegalStatus: string;
  clientAddress: string;
  servicesCommenceDate: string;
  servicesDescription: string;
  priority1Response: string;
  priority2ResponseBusiness: string;
  priority2ResponseWeekend: string;
  changeOrderDays: string;
  consultancyFee: string;
  expensesReimbursed: string;
  termEndDate: string;
  terminationNoticeDays: string;
  nonRenewalNoticeDays: string;
  indemnificationNotes: string;
  ipExhibitA: string;
  assignmentConsent: string;
  confidentialityNotes: string;
  forceMajeureNotes: string;
  governingLaw: string;
  signClientName: string;
  signClientDesignation: string;
  signClientDate: string;
  signConsultantName: string;
  signConsultantDesignation: string;
  signConsultantDate: string;
}

export default function TechnicalConsultingForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    consultantName: "",
    consultantLegalStatus: "",
    consultantAddress: "",
    clientName: "",
    clientLegalStatus: "",
    clientAddress: "",
    servicesCommenceDate: "",
    servicesDescription: "",
    priority1Response: "24 hours",
    priority2ResponseBusiness: "12 hours",
    priority2ResponseWeekend: "24 hours",
    changeOrderDays: "0",
    consultancyFee: "USD [Amount]",
    expensesReimbursed: "Consultant bears out-of-pocket expenses",
    termEndDate: "",
    terminationNoticeDays: "30",
    nonRenewalNoticeDays: "30",
    indemnificationNotes: "",
    ipExhibitA: "Exhibit A (pre-existing IP list)",
    assignmentConsent: "Consent required",
    confidentialityNotes: "Standard confidentiality obligations apply",
    forceMajeureNotes: "Standard force majeure clause applies",
    governingLaw: "[State/Jurisdiction]",
    signClientName: "",
    signClientDesignation: "",
    signClientDate: "",
    signConsultantName: "",
    signConsultantDesignation: "",
    signConsultantDate: "",
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

    write("TECHNICAL CONSULTING AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Technical Consulting Agreement (“Agreement”) is made and entered into as of ${formData.effectiveDate || "[Date]"} (“Effective Date”), by and between:`
    );
    write(`${formData.consultantName || "[Consultant Name]"}, a ${formData.consultantLegalStatus || "[legal status]"} having its principal place of business at ${formData.consultantAddress ||
      "[Address]"} (“Consultant”),`);
    write("And");
    write(`${formData.clientName || "[Client Name]"}, a ${formData.clientLegalStatus || "[legal status]"} having its principal place of business at ${formData.clientAddress ||
      "[Address]"} (“Client”).`);
    write("Consultant and Client are hereinafter collectively referred to as the “Parties” and individually as a “Party.”");
    write("\n\n");

    write("1. Scope of Services", 12, true);
    write("1.1 Background and Expertise");
    write(`The Consultant represents that it possesses the requisite technical knowledge, qualifications, and experience in [Area], and shall provide professional consulting services to the Client based upon such expertise.`);
    write("\n");
    write("1.2 Description of Services");
    write(
      `Commencing on ${formData.servicesCommenceDate || "[Date]"}, the Consultant shall provide technical consulting services relating to the implementation, operation, support, and/or use of the supported software, including but not limited to: ${formData.servicesDescription ||
        "[Details of Services]"} (collectively, the “Services”).`
    );
    write("\n");
    write("1.3 Performance of Services");
    write("The manner, method, and working hours of the Services shall be determined by the Consultant. The Client acknowledges that the Consultant will devote such time and effort as reasonably necessary to perform the Services.");
    write("\n\n");

    write("2. Priority of Requests", 12, true);
    write("2.1 Priority Level 1 – Normal Requests");
    write(`Consultant shall provide an initial response within ${formData.priority1Response || "24 hours"} of receipt.`);
    write("\n");
    write("2.2 Priority Level 2 – Urgent Requests");
    write(
      `Consultant shall provide an initial response within ${formData.priority2ResponseBusiness || "12 hours"} on business days (Monday–Friday) and within ${formData.priority2ResponseWeekend ||
        "24 hours"} on weekends (Saturday–Sunday).`
    );
    write("\n\n");

    write("3. Financial Terms", 12, true);
    write("3.1 Change Orders");
    write(`Any modification to the scope of Services shall be documented in a written Change Order, signed and dated by both Parties, specifying the changes and any corresponding adjustment to fees. (Notice days: ${formData.changeOrderDays || "n/a"})`);
    write("\n");
    write("3.2 Consultancy Fee");
    write(`Client shall pay Consultant a fee of ${formData.consultancyFee || "USD [Amount]"}, payable in a lump sum upon completion of the Services, unless otherwise agreed in writing.`);
    write("\n");
    write("3.3 Expenses");
    write(`${formData.expensesReimbursed || "Consultant shall bear all out-of-pocket expenses and shall not be entitled to reimbursement from Client."}`);
    write("\n\n");

    write("4. Term and Termination", 12, true);
    write("4.1 Term");
    write(`This Agreement shall commence on the Effective Date and continue until completion of the Services, unless terminated earlier in accordance with this Agreement. (Estimated end: ${formData.termEndDate || "[End Date]"})`);
    write("\n");
    write("4.2 Early Termination");
    write(
      `Either Party may terminate this Agreement, with or without cause, by providing ${formData.terminationNoticeDays || "[Number]"} days’ prior written notice to the other Party. Upon early termination, Consultant shall be entitled to pro-rata payment for Services rendered up to the termination date.`
    );
    write("\n");
    write("4.3 Prevention of Automatic Renewal");
    write(`To prevent automatic renewal of this Agreement upon expiration, either Party must provide written notice of non-renewal at least ${formData.nonRenewalNoticeDays || "[Number]"} days prior to the expiration of the current term.`);
    write("\n\n");

    write("5. Indemnification and Warranties", 12, true);
    write("5.1 Indemnification");
    write(`${formData.indemnificationNotes || "Consultant shall indemnify, defend, and hold harmless Client from and against all claims, damages, liabilities, costs, and expenses (including reasonable attorney’s fees) arising out of or resulting from any negligent acts, omissions, or breaches by Consultant, its employees, or agents."}`);
    write("\n");
    write("5.2 Client Data Responsibility");
    write("Client acknowledges it is solely responsible for maintaining secure, current, and restorable backups of all data, databases, files, software, and systems.");
    write("\n");
    write("5.3 Disclaimer of Warranties");
    write("Consultant expressly disclaims all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted service, or error-free programming. Consultant does not guarantee that its services or advice will be free from defects.");
    write("\n\n");

    write("6. Intellectual Property Rights", 12, true);
    write("6.1 Pre-Existing Intellectual Property");
    write(`${formData.ipExhibitA || "Consultant retains all rights, title, and interest in intellectual property listed in Exhibit A, which remains the exclusive property of Consultant and is not subject to this Agreement."}`);
    write("\n");
    write("6.2 Developed Intellectual Property");
    write("Any enhancements, modifications, inventions, or new intellectual property created by Consultant in the course of providing Services shall be owned by the Party as agreed in writing.");
    write("\n\n");

    write("7. Relationship of the Parties", 12, true);
    write("Consultant shall perform the Services as an independent contractor. Nothing herein shall be construed as creating any partnership, joint venture, agency, or employment relationship.");
    write("\n\n");

    write("8. Assignment", 12, true);
    write(`Consultant shall not assign or transfer any rights or obligations under this Agreement without prior written consent of Client. (${formData.assignmentConsent || "Consent required."})`);
    write("\n\n");

    write("9. Confidentiality", 12, true);
    write(`${formData.confidentialityNotes || "Consultant shall not use, disclose, or communicate any confidential information of Client to any third party without prior written consent. This obligation survives termination of the Agreement."}`);
    write("\n\n");

    write("10. Force Majeure", 12, true);
    write(`${formData.forceMajeureNotes || "Neither Party shall be liable for failure or delay caused by events beyond reasonable control, including but not limited to acts of God, war, riots, epidemics, pandemics, government orders, or natural disasters."}`);
    write("\n\n");

    write("11. Governing Law", 12, true);
    write(`This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[State/Jurisdiction]"}.`);
    write("\n\n");

    write("12. Entire Agreement", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements or understandings relating to the subject matter herein.");
    write("\n\n");

    write("13. Amendment", 12, true);
    write("This Agreement may only be modified, amended, or supplemented in writing, signed by both Parties.");
    write("\n\n");

    write("14. Severability", 12, true);
    write("If any provision of this Agreement is held invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.");
    write("\n\n");

    write("15. Waiver", 12, true);
    write("Failure to enforce any provision of this Agreement shall not constitute a waiver of the right to enforce that provision in the future.");
    write("\n\n");

    write("16. Signatories", 12, true);
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement through their duly authorized representatives as of the Effective Date.");
    write("\n\n");

    write(`${formData.clientName || "[Client Name]"}`);
    write("Name: " + (formData.signClientName || "________________________"));
    write("Designation: " + (formData.signClientDesignation || "_________________"));
    write("Signature: _______________________");
    write("Date: " + (formData.signClientDate || "_________________"));
    write("\n\n");

    write(`${formData.consultantName || "[Consultant Name]"}`);
    write("Name: " + (formData.signConsultantName || "________________________"));
    write("Designation: " + (formData.signConsultantDesignation || "_________________"));
    write("Signature: _______________________");
    write("Date: " + (formData.signConsultantDate || "_________________"));

    doc.save("Technical_Consulting_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <Cpu className="w-6 h-6" /> */}
                <h3 className="font-semibold">Parties & Services</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <h4 className="font-medium">Consultant</h4>
              <Label>Name</Label>
              <Input name="consultantName" value={formData.consultantName} onChange={handleChange} />
              <Label>Legal Status</Label>
              <Input name="consultantLegalStatus" value={formData.consultantLegalStatus} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="consultantAddress" value={formData.consultantAddress} onChange={handleChange} />

              <h4 className="font-medium">Client</h4>
              <Label>Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Legal Status</Label>
              <Input name="clientLegalStatus" value={formData.clientLegalStatus} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label>Services Commence Date</Label>
              <Input name="servicesCommenceDate" value={formData.servicesCommenceDate} onChange={handleChange} />
              <Label>Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Response / Financial / Term</h3>

              <Label>Priority 1 Response (normal)</Label>
              <Input name="priority1Response" value={formData.priority1Response} onChange={handleChange} />
              <Label>Priority 2 Response (business days)</Label>
              <Input name="priority2ResponseBusiness" value={formData.priority2ResponseBusiness} onChange={handleChange} />
              <Label>Priority 2 Response (weekend)</Label>
              <Input name="priority2ResponseWeekend" value={formData.priority2ResponseWeekend} onChange={handleChange} />

              <Label>Change Order Notice Days</Label>
              <Input name="changeOrderDays" value={formData.changeOrderDays} onChange={handleChange} />
              <Label>Consultancy Fee</Label>
              <Input name="consultancyFee" value={formData.consultancyFee} onChange={handleChange} />
              <Label>Expenses (reimbursement)</Label>
              <Input name="expensesReimbursed" value={formData.expensesReimbursed} onChange={handleChange} />

              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Termination Notice Days</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />
              <Label>Non-Renewal Notice Days</Label>
              <Input name="nonRenewalNoticeDays" value={formData.nonRenewalNoticeDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal / IP / Signatures</h3>

              <Label>Indemnification Notes</Label>
              <Textarea name="indemnificationNotes" value={formData.indemnificationNotes} onChange={handleChange} />
              <Label>IP - Exhibit A</Label>
              <Input name="ipExhibitA" value={formData.ipExhibitA} onChange={handleChange} />
              <Label>Assignment Consent</Label>
              <Input name="assignmentConsent" value={formData.assignmentConsent} onChange={handleChange} />
              <Label>Confidentiality Notes</Label>
              <Textarea name="confidentialityNotes" value={formData.confidentialityNotes} onChange={handleChange} />
              <Label>Force Majeure Notes</Label>
              <Input name="forceMajeureNotes" value={formData.forceMajeureNotes} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>Client - Signatory Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Designation</Label>
              <Input name="signClientDesignation" value={formData.signClientDesignation} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />

              <Label>Consultant - Signatory Name</Label>
              <Input name="signConsultantName" value={formData.signConsultantName} onChange={handleChange} />
              <Label>Consultant - Designation</Label>
              <Input name="signConsultantDesignation" value={formData.signConsultantDesignation} onChange={handleChange} />
              <Label>Consultant - Date</Label>
              <Input name="signConsultantDate" value={formData.signConsultantDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Technical Consulting Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
