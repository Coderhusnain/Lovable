import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  clientName: string;
  clientAddress: string;
  contractorName: string;
  contractorAddress: string;
  startDate: string;
  servicesDescription: string;
  worksiteAddress: string;
  scopeOfWork: string;
  authorizationToWork: string;
  siteAccess: string;
  ownershipWorkProduct: string;
  completionCleanup: string;
  indemnification: string;
  warranty: string;
  defaultCureDays: string;
  remediesDays: string;
  forceMajeure: string;
  paymentAmount: string;
  paymentTerms: string;
  permitsApprovals: string;
  insurance: string;
  surveyTitle: string;
  termEndDate: string;
  severability: string;
  amendment: string;
  governingLaw: string;
  notice: string;
  disputeResolution: string;
  signClientName: string;
  signClientDate: string;
  signContractorName: string;
  signContractorDate: string;
}

export default function LandscapingServicesAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    clientName: "",
    clientAddress: "",
    contractorName: "",
    contractorAddress: "",
    startDate: "",
    servicesDescription: "",
    worksiteAddress: "",
    scopeOfWork: "",
    authorizationToWork: "",
    siteAccess: "",
    ownershipWorkProduct: "",
    completionCleanup: "",
    indemnification: "",
    warranty: "",
    defaultCureDays: "",
    remediesDays: "",
    forceMajeure: "",
    paymentAmount: "",
    paymentTerms: "",
    permitsApprovals: "",
    insurance: "",
    surveyTitle: "",
    termEndDate: "",
    severability: "",
    amendment: "",
    governingLaw: "",
    notice: "",
    disputeResolution: "",
    signClientName: "",
    signClientDate: "",
    signContractorName: "",
    signContractorDate: "",
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
        y += size * 1.25;
      });
    };

    write("LANDSCAPING SERVICES AGREEMENT", 16, true, true);
    write("\n");

    write(`This Landscaping Services Agreement (\u201cAgreement\u201d) is made and entered into as of ${formData.agreementDate || "[insert date]"} by and between:`);
    write(`${formData.clientName || "[Client Name]"}, residing at ${formData.clientAddress || "[Client Address]"}, (the "Client").`);
    write(`${formData.contractorName || "[Contractor Name]"}, having a business address at ${formData.contractorAddress || "[Contractor Address]"}, (the "Contractor").`);
    write("\n");

    write("1. Description of Services", 12, true);
    write(`Commencing on ${formData.startDate || "[insert date]"}, the Contractor agrees to perform the following landscaping services for the Client:\n${formData.servicesDescription || "[Insert detailed description of the services to be rendered]"}`);
    write("\n");

    write("2. Scope of Work", 12, true);
    write(formData.scopeOfWork || "The Contractor shall furnish all labor, materials, tools, equipment, and supervision necessary for the full and proper performance of the Landscaping Services as described herein and any annexed specifications.");
    write("\n");

    write("3. Authorization to Work", 12, true);
    write(formData.authorizationToWork || "The Client hereby authorizes the Contractor to commence such customary excavation, grading, or other site preparation as may, in the Contractor's professional judgment, be reasonably required for the execution and completion of the Landscaping Services.");
    write("\n");

    write("4. Site Access", 12, true);
    write(formData.siteAccess || "The Client shall provide the Contractor with free and unobstructed access to the Work Site during working hours, including space for equipment, materials, and debris. The Contractor shall use reasonable care to avoid damage to driveways, landscaping, shrubs, and other existing structures.");
    write("\n");

    write("5. Ownership of Work Product", 12, true);
    write(formData.ownershipWorkProduct || "Any copyrightable works, inventions, designs, plans, drawings, or other intellectual property (collectively, the 'Work Product') developed by the Contractor in the course of performing the Landscaping Services shall be the exclusive property of the Client. The Contractor shall execute any documentation reasonably required to confirm the Client's exclusive ownership of such Work Product.");
    write("\n");

    write("6. Completion and Clean-Up", 12, true);
    write(formData.completionCleanup || "Upon completion of the Landscaping Services, the Contractor shall restore the Client's property to its prior condition, to the extent practicable, and shall ensure that all work areas are broom-cleaned and free of debris, tools, materials, or waste resulting from the Services.");
    write("\n");

    write("7. Indemnification", 12, true);
    write(formData.indemnification || "The Contractor agrees to indemnify, defend, and hold harmless the Client from and against any and all claims, liabilities, losses, damages, costs, and expenses (including reasonable attorneys' fees) arising out of or related to the acts, omissions, or negligence of the Contractor, its employees, agents, or subcontractors in connection with the performance of this Agreement.");
    write("\n");

    write("8. Warranty", 12, true);
    write(formData.warranty || "The Contractor represents and warrants that all Services shall be performed in a timely, professional, and workmanlike manner consistent with generally accepted standards of practice prevailing within the Contractor's trade and region. The standard of care shall be equal to or higher than that of similarly situated service providers performing comparable work.");
    write("\n");

    write("9. Default", 12, true);
    write(formData.defaultCureDays ? `A material default under this Agreement shall include, without limitation: ... The breaching Party shall have ${formData.defaultCureDays} days to cure.` : "A material default under this Agreement shall include, without limitation: failure to make payment when due; insolvency or bankruptcy; levy or seizure; failure by the Contractor to timely perform.");
    write("\n");

    write("10. Remedies", 12, true);
    write(formData.remediesDays ? `In the event of default, the non-defaulting Party may issue written notice specifying the nature of the breach. The breaching Party shall have ${formData.remediesDays} days from the effective date of such notice to cure the default.` : "In the event of default, the non-defaulting Party may issue written notice specifying the nature of the breach. The breaching Party shall have the specified cure period to cure the default.");
    write("\n");

    write("11. Force Majeure", 12, true);
    write(formData.forceMajeure || "Neither Party shall be liable for any failure or delay in performing its obligations under this Agreement where such failure is due to causes beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, quarantines, war, civil unrest, governmental action, or labor strikes.");
    write("\n");

    write("12. Payment", 12, true);
    write(formData.paymentAmount ? `Payment in the sum of ${formData.paymentAmount} shall be made to the Contractor upon full and satisfactory completion of the Landscaping Services.` : "Payment in the sum of [insert amount] shall be made to the Contractor upon full and satisfactory completion of the Landscaping Services.");
    write(formData.paymentTerms || "No discount shall apply for early payment. Interest shall accrue on all unpaid amounts at the stated rate. The Client shall be responsible for all costs of collection.");
    write("\n");

    write("13. Permits and Approvals", 12, true);
    write(formData.permitsApprovals || "The Contractor shall obtain all permits, licenses, and approvals as required by local municipal or regulatory authorities. The costs associated with obtaining such permits shall be included in the total contract price.");
    write("\n");

    write("14. Insurance", 12, true);
    write(formData.insurance || "The Contractor shall maintain, at its sole expense, general liability, workers' compensation, and builder's risk insurance. Proof of insurance shall be provided to the Client upon request.");
    write("\n");

    write("15. Survey and Title", 12, true);
    write(formData.surveyTitle || "If the boundaries of the Work Site are uncertain, the Contractor or a licensed land surveyor shall identify and stake the property lines for reference. This shall be done at the Client's request and expense.");
    write("\n");

    write("16. Term and Termination", 12, true);
    write(formData.termEndDate ? `This Agreement shall terminate automatically on ${formData.termEndDate}, unless otherwise extended.` : "This Agreement shall terminate automatically on [Termination Date], unless otherwise extended in writing by mutual consent of the Parties.");
    write("\n");

    write("17. Severability", 12, true);
    write(formData.severability || "If any provision of this Agreement is found to be invalid or unenforceable under applicable law, the remaining provisions shall remain valid and enforceable.");
    write("\n");

    write("18. Amendment", 12, true);
    write(formData.amendment || "No modification or amendment of this Agreement shall be valid unless made in writing and signed by the Party against whom enforcement is sought.");
    write("\n");

    write("19. Governing Law", 12, true);
    write(formData.governingLaw || "This Agreement shall be governed by, and construed in accordance with, the laws of the State of [Insert State Name].");
    write("\n");

    write("20. Notice", 12, true);
    write(formData.notice || "All notices required or permitted under this Agreement shall be in writing and delivered personally, or sent by certified mail, return receipt requested, to the addresses of the Parties stated above.");
    write("\n");

    write("21. Waiver", 12, true);
    write("The failure of either Party to enforce any provision of this Agreement shall not be construed as a waiver of that provision or of any other provision of this Agreement.");
    write("\n");

    write("22. Dispute Resolution", 12, true);
    write(formData.disputeResolution || "The Parties shall first attempt to resolve any dispute through amicable negotiations. If unresolved, the Parties agree to submit the matter to mediation. If mediation fails, either Party may pursue legal or equitable remedies.");
    write("\n");

    write("23. Entire Agreement", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter herein and supersedes all prior oral or written agreements, understandings, or communications.");
    write("\n");

    write("24. Execution", 12, true);
    write(`IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.\nCLIENT\nBy: ${formData.signClientName || "_________________________"}\nName: ${formData.signClientName || "[Client Name]"}\nDate: ${formData.signClientDate || "[Date]"}\n\nCONTRACTOR\nBy: ${formData.signContractorName || "_________________________"}\nName: ${formData.signContractorName || "[Contractor Name]"}\nDate: ${formData.signContractorDate || "[Date]"}`);

    doc.save("Landscaping_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Dates</h3>
              </div>
              <Label>Agreement Date</Label>
              <Input name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} rows={2} />
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Textarea name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} rows={2} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Work Details</h3>
              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Worksite Address</Label>
              <Input name="worksiteAddress" value={formData.worksiteAddress} onChange={handleChange} />
              <Label>Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} rows={5} />
              <Label>Scope of Work</Label>
              <Textarea name="scopeOfWork" value={formData.scopeOfWork} onChange={handleChange} rows={4} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Site & Compliance</h3>
              <Label>Authorization to Work</Label>
              <Textarea name="authorizationToWork" value={formData.authorizationToWork} onChange={handleChange} rows={3} />
              <Label>Site Access</Label>
              <Textarea name="siteAccess" value={formData.siteAccess} onChange={handleChange} rows={3} />
              <Label>Permits & Approvals</Label>
              <Textarea name="permitsApprovals" value={formData.permitsApprovals} onChange={handleChange} rows={3} />
              <Label>Survey / Title</Label>
              <Input name="surveyTitle" value={formData.surveyTitle} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal & Financial</h3>
              <Label>Ownership of Work Product</Label>
              <Textarea name="ownershipWorkProduct" value={formData.ownershipWorkProduct} onChange={handleChange} rows={3} />
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Payment Terms</Label>
              <Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} rows={3} />
              <Label>Insurance</Label>
              <Textarea name="insurance" value={formData.insurance} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Protections & Remedies</h3>
              <Label>Indemnification</Label>
              <Textarea name="indemnification" value={formData.indemnification} onChange={handleChange} rows={3} />
              <Label>Warranty</Label>
              <Textarea name="warranty" value={formData.warranty} onChange={handleChange} rows={3} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
              <Label>Remedies Cure Days</Label>
              <Input name="remediesDays" value={formData.remediesDays} onChange={handleChange} />
              <Label>Force Majeure</Label>
              <Textarea name="forceMajeure" value={formData.forceMajeure} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate</h3>
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Severability</Label>
              <Input name="severability" value={formData.severability} onChange={handleChange} />
              <Label>Amendment</Label>
              <Input name="amendment" value={formData.amendment} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notice</Label>
              <Textarea name="notice" value={formData.notice} onChange={handleChange} rows={2} />
              <Label>Dispute Resolution</Label>
              <Textarea name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Client - Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />
              <Label>Contractor - Name</Label>
              <Input name="signContractorName" value={formData.signContractorName} onChange={handleChange} />
              <Label>Contractor - Date</Label>
              <Input name="signContractorDate" value={formData.signContractorDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
        {step < 7 ? (
          <Button onClick={() => setStep((s) => Math.min(7, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Landscaping Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
