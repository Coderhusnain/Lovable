import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  ownerAddress: string;
  contractorName: string;
  contractorAddress: string;
  servicesDescription: string;
  structureDescription: string;
  propertyAddress: string;
  excludedWorkNote: string;
  constructionDocumentsNote: string;
  complianceLawsNote: string;
  siteAccessNote: string;
  subcontractorsListNote: string;
  materialSubstitutionNote: string;
  paymentAmount: string;
  latePaymentRate: string;
  collectionCostsNote: string;
  terminationState: string;
  commencementWithinDays: string; // default 30
  completionDate: string;
  noticeOfCompletionDays: string; // default 10
  stopWorkMaxDays: string; // default 90
  stopWorkClaimDays: string; // default 30
  permitsNote: string;
  contractorLicensesNote: string;
  insuranceCertificatesNote: string;
  workProductOwnershipNote: string;
  confidentialityNote: string;
  indemnificationNote: string;
  warrantyNote: string;
  accessToWorksiteNote: string;
  utilitiesNote: string;
  inspectionCostsNote: string;
  eventsOfDefaultNote: string;
  cureDays: string; // default [Insert Days]
  forceMajeureNote: string;
  disputeResolutionNote: string;
  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;
  governingLaw: string;
  noticesProcedureNote: string;
  waiverNote: string;
  ownerSignName: string;
  ownerSignTitle: string;
  ownerSignDate: string;
  contractorSignName: string;
  contractorSignTitle: string;
  contractorSignDate: string;
}

export default function ConstructionContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    ownerAddress: "",
    contractorName: "",
    contractorAddress: "",
    servicesDescription: "",
    structureDescription: "",
    propertyAddress: "",
    excludedWorkNote: "",
    constructionDocumentsNote: "",
    complianceLawsNote:
      "The Contractor shall perform the Services in a professional, diligent, and workmanlike manner, strictly in accordance with all applicable federal, state, and local laws, regulations, and ordinances, including but not limited to the Fair Labor Standards Act, the Americans with Disabilities Act, and the Family and Medical Leave Act.",
    siteAccessNote:
      "The Owner represents and warrants that they hold lawful title to the Worksite and have the authority to enter into this Contract. Prior to commencement of the Services, the Owner shall ensure the site is accessible and clearly marked, with boundary stakes at all property corners, and shall maintain such markers throughout the construction period.",
    subcontractorsListNote: "",
    materialSubstitutionNote:
      "No material substitutions shall be made without the Owner’s prior written consent, and all substitutes must meet or exceed the quality standards of the originally agreed items.",
    paymentAmount: "",
    latePaymentRate: "",
    collectionCostsNote: "",
    terminationState: "",
    commencementWithinDays: "30",
    completionDate: "",
    noticeOfCompletionDays: "10",
    stopWorkMaxDays: "90",
    stopWorkClaimDays: "30",
    permitsNote: "",
    contractorLicensesNote:
      "The Contractor shall be responsible for obtaining all other necessary licenses and permits, and the costs thereof shall be included in the Contract price.",
    insuranceCertificatesNote:
      "Prior to commencement, the Contractor shall provide the Owner with valid certificates of insurance evidencing compliance with workers’ compensation, general liability, and builder’s risk coverage requirements, adequate to cover the full scope of liability under this Contract.",
    workProductOwnershipNote:
      "All intellectual property and work product generated in the performance of this Contract shall be deemed the exclusive property of the Owner. The Contractor shall execute all necessary documents to perfect such ownership rights.",
    confidentialityNote:
      "The Contractor shall maintain strict confidentiality over all proprietary information obtained during the term of this Contract. Upon termination, all records and confidential materials shall be returned to the Owner. This obligation shall survive the termination of this Contract.",
    indemnificationNote:
      "The Contractor shall indemnify and hold harmless the Owner from any and all claims, damages, or liabilities arising out of the Contractor’s performance, except to the extent such indemnification is contrary to the public policy of the applicable jurisdiction.",
    warrantyNote:
      "The Contractor warrants that all work shall be performed in accordance with prevailing professional standards and in strict conformance with the approved plans and specifications.",
    accessToWorksiteNote:
      "The Owner shall provide the Contractor and its workers with reasonable access to the Worksite and related facilities. The Contractor shall take reasonable precautions to avoid damage to driveways, landscaping, and existing structures.",
    utilitiesNote:
      "The Owner shall bear the responsibility for providing water, power, and sewer connections prior to and during construction. Such services shall be made available to the Contractor at no additional cost.",
    inspectionCostsNote:
      "The Owner shall have the right to inspect the work at any reasonable time. Where third-party inspections or certifications are required, the Owner shall bear such costs.",
    eventsOfDefaultNote: "",
    cureDays: "[Insert Days]",
    forceMajeureNote: "",
    disputeResolutionNote: "",
    entireAgreementNote: "",
    severabilityNote: "",
    amendmentNote: "",
    governingLaw: "",
    noticesProcedureNote:
      "All notices shall be delivered personally or via certified mail to the addresses specified in the preamble of this Contract, unless otherwise updated in writing.",
    waiverNote: "",
    ownerSignName: "",
    ownerSignTitle: "",
    ownerSignDate: "",
    contractorSignName: "",
    contractorSignTitle: "",
    contractorSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
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

    // === CONSTRUCTION CONTRACT CONTENT ===
    addText("CONSTRUCTION CONTRACT", 14, true, true);
    addText("\n");
    addText(
      `This Construction Contract (“Contract”) is made and entered into as of ${formData.effectiveDate || "___"} (“Effective Date”) by and between ${formData.ownerName || "[Insert Name]"}, residing at ${formData.ownerAddress || "[Insert Address]"} (hereinafter referred to as the “Owner”), and ${formData.contractorName || "[Insert Name]"}, a contractor having its principal place of business at ${formData.contractorAddress || "[Insert Address]"} (hereinafter referred to as the “Contractor”).`
    );
    addText("\nWHEREAS, the Contractor is duly qualified and desirous of providing construction services to the Owner; and");
    addText("\nWHEREAS, the Owner wishes to engage the Contractor to perform such services upon the terms and conditions hereinafter set forth;");
    addText("\nNOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties hereto agree as follows:");
    addText("\n1. Description of Services");
    addText(
      `As of the Effective Date, the Contractor shall provide the following construction-related services to the Owner (collectively, the “Services”):\n\n${formData.servicesDescription || "[Insert detailed description of services]."}`
    );

    addText("\n2. Scope of Work");
    addText(
      `The Contractor shall furnish all labor, materials, and equipment necessary to complete the construction of ${formData.structureDescription || "[describe structure]"} at the property located at ${formData.propertyAddress || "[insert property address]"} (“Worksite”).`
    );
    addText(
      "This includes, but is not limited to, the provision of construction materials, labor force, site safety and security measures, and tools and machinery essential for project execution."
    );
    addText(
      `Unless otherwise expressly agreed upon in writing, the Contractor’s obligations shall exclude work relating to ${formData.excludedWorkNote || "landscaping, site grading, walkways, painting, sewerage, water systems, steps, driveways, patios, and similar improvements."}`
    );

    addText("\n3. Plans, Specifications, and Construction Documents");
    addText(
      `The Owner shall furnish to the Contractor all requisite plans, specifications, architectural drawings, blueprints, and other construction documents (“Construction Documents”) necessary for the provision of Services. All such documents shall remain the exclusive property of the Owner and shall be returned to the Owner upon project completion.\n${formData.constructionDocumentsNote || ""}`
    );

    addText("\n4. Compliance With Applicable Laws");
    addText(`${formData.complianceLawsNote}`);

    addText("\n5. Worksite Access and Ownership Warranty");
    addText(`${formData.siteAccessNote}`);

    addText("\n6. Provision of Materials and Labor");
    addText(
      `The Contractor shall provide a complete and accurate list of all subcontractors, vendors, or third parties supplying labor and/or materials, including corresponding payment amounts or obligations. This list shall be attached herewith. ${formData.subcontractorsListNote}`
    );
    addText(`${formData.materialSubstitutionNote}`);

    addText("\n7. Payment Terms");
    addText(
      `Payment in the sum of ${formData.paymentAmount || "<insert amount>"} shall be made to the Contractor upon satisfactory completion of all Services under this Contract.`
    );
    addText(
      `In the event of late payment, interest shall accrue at the lesser of ${formData.latePaymentRate || "<insert amount>"} per annum or the maximum lawful rate permitted under applicable law. The Owner shall also be liable for any collection costs, including reasonable attorneys’ fees.`
    );
    addText(
      `Non-payment shall constitute a material breach, entitling the Contractor to terminate the Contract and pursue all remedies available under law of ${formData.terminationState || "<insert name of state>"}`
    );

    addText("\n8. Term and Completion");
    addText(
      `The Contractor shall commence performance within ${formData.commencementWithinDays || "30"} days from the Effective Date and complete the work on or before ${formData.completionDate || "[Insert Completion Date]"}, time being of the essence.`
    );
    addText(
      `The Owner shall execute a Notice of Completion within ${formData.noticeOfCompletionDays || "10"} days of project completion. Should the Owner fail to do so after final inspection, the Contractor may execute such Notice on the Owner’s behalf.`
    );

    addText("\n9. Stop Work Order");
    addText(
      `The Owner reserves the right to issue a written Stop Work Order at any time, suspending part or all of the Services for a period not exceeding ${formData.stopWorkMaxDays || "90"} days. Upon such directive, the Contractor shall immediately comply and take measures to mitigate costs. The Owner may resume work via a Resume Work Notice.`
    );
    addText(
      `Any extension of time or adjustment in payment due to a Stop Work Order shall be made equitably, and the Contractor shall assert such claim within ${formData.stopWorkClaimDays || "30"} days of resumption. The Contractor shall not claim damages for delays resulting from Stop Work Orders.`
    );

    addText("\n10. Permits and Licenses");
    addText(`${formData.permitsNote || ""}`);
    addText(`${formData.contractorLicensesNote}`);

    addText("\n11. Insurance");
    addText(`${formData.insuranceCertificatesNote}`);

    addText("\n12. Ownership of Work Product");
    addText(`${formData.workProductOwnershipNote}`);

    addText("\n13. Confidentiality");
    addText(`${formData.confidentialityNote}`);

    addText("\n14. Indemnification");
    addText(`${formData.indemnificationNote}`);

    addText("\n15. Warranty");
    addText(`${formData.warrantyNote}`);

    addText("\n16. Access to Worksite");
    addText(`${formData.accessToWorksiteNote}`);

    addText("\n17. Utilities");
    addText(`${formData.utilitiesNote}`);

    addText("\n18. Inspection Rights");
    addText(`${formData.inspectionCostsNote}`);

    addText("\n19. Events of Default");
    addText(
      `A material breach under this Contract shall include, but not be limited to:\n${formData.eventsOfDefaultNote || "• (a) Non-payment by the Owner;\n• (b) Insolvency or bankruptcy of either party;\n• (c) Lien, levy, or lawsuit impacting project completion;\n• (d) Failure to make the Worksite available or undue construction delay."}`
    );

    addText("\n20. Remedies");
    addText(
      `In the event of default, the non-defaulting party may issue a written Notice of Default, describing the default in detail. The defaulting party shall have ${formData.cureDays || "[Insert Days]"} to cure the breach. Failure to cure shall result in automatic termination of this Contract.`
    );

    addText("\n21. Force Majeure");
    addText(`${formData.forceMajeureNote || "Neither party shall be liable for delays due to Force Majeure events beyond their reasonable control, including but not limited to natural disasters, pandemics, governmental orders, or civil unrest. Obligations shall resume promptly once such causes cease."}`);

    addText("\n22. Dispute Resolution");
    addText(`${formData.disputeResolutionNote || "Disputes shall first be addressed through amicable negotiations. If unresolved, parties shall proceed to mediation in accordance with applicable laws. Failing mediation, the parties may pursue legal remedies in a court of competent jurisdiction."}`);

    addText("\n23. Entire Agreement");
    addText(`${formData.entireAgreementNote || "This Contract constitutes the full and final agreement between the parties. Any modifications must be in writing and signed by both parties."}`);

    addText("\n24. Severability");
    addText(`${formData.severabilityNote || "If any provision herein is deemed unenforceable, the remainder of the Contract shall remain in full force and effect."}`);

    addText("\n25. Amendment");
    addText(`${formData.amendmentNote || "This Contract may be amended only by written instrument executed by both parties."}`);

    addText("\n26. Governing Law");
    addText(`${formData.governingLaw ? `This Contract shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw}, without regard to conflict of laws principles.` : "This Contract shall be governed by, and construed in accordance with, the laws of the State of [Insert Jurisdiction], without regard to conflict of laws principles."}`);

    addText("\n27. Notices");
    addText(`${formData.noticesProcedureNote}`);

    addText("\n28. Waiver");
    addText(`${formData.waiverNote || "Any waiver by either party of any breach shall not be deemed a waiver of subsequent breaches or of any other provision herein."}`);

    addText("\n29. Execution and Effectiveness");
    addText(`This Contract shall be executed by ${formData.ownerSignName || "[Insert Name and Title of Owner Representative]"} on behalf of the Owner and by ${formData.contractorSignName || "[Insert Name and Title of Contractor Representative]"} on behalf of the Contractor and shall become effective as of the Effective Date first written above.`);
    addText("\n");
    addText("IN WITNESS WHEREOF, the parties have executed this Construction Contract as of the Effective Date.");
    addText("\nOWNER:");
    addText(`Name: ${formData.ownerSignName || "________________"}`);
    addText(`Title: ${formData.ownerSignTitle || "________________"}`);
    addText(`Date: ${formData.ownerSignDate || "________________"}`);
    addText("\nCONTRACTOR:");
    addText(`Name: ${formData.contractorSignName || "________________"}`);
    addText(`Title: ${formData.contractorSignTitle || "________________"}`);
    addText(`Date: ${formData.contractorSignDate || "________________"}`);

    // Save file
    doc.save("Construction_Contract.pdf");
    setPdfGenerated(true);
    setStep(6);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Input name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services, Scope & Plans</h3>
              <Label>Detailed Description of Services</Label>
              <textarea
                name="servicesDescription"
                value={formData.servicesDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={5}
              />
              <Label>Structure to be built (description)</Label>
              <Input name="structureDescription" value={formData.structureDescription} onChange={handleChange} />
              <Label>Property Address (Worksite)</Label>
              <Input name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />
              <Label>Excluded Work Items</Label>
              <Input name="excludedWorkNote" value={formData.excludedWorkNote} onChange={handleChange} />
              <Label>Construction Documents / Plans Note</Label>
              <textarea
                name="constructionDocumentsNote"
                value={formData.constructionDocumentsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment, Timing & Permits</h3>
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Late Payment Rate</Label>
              <Input name="latePaymentRate" value={formData.latePaymentRate} onChange={handleChange} />
              <Label>Collection Costs Note</Label>
              <Input name="collectionCostsNote" value={formData.collectionCostsNote} onChange={handleChange} />
              <Label>State for Remedies (if non-payment)</Label>
              <Input name="terminationState" value={formData.terminationState} onChange={handleChange} />
              <Label>Commence within (days)</Label>
              <Input name="commencementWithinDays" value={formData.commencementWithinDays} onChange={handleChange} />
              <Label>Completion Date</Label>
              <Input name="completionDate" value={formData.completionDate} onChange={handleChange} />
              <Label>Notice of Completion - Owner execute within (days)</Label>
              <Input name="noticeOfCompletionDays" value={formData.noticeOfCompletionDays} onChange={handleChange} />
              <Label>Permits Note (Owner / Contractor responsibilities)</Label>
              <Input name="permitsNote" value={formData.permitsNote} onChange={handleChange} />
              <Label>Contractor Licenses Note</Label>
              <Input name="contractorLicensesNote" value={formData.contractorLicensesNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Risk, Insurance & Defaults</h3>
              <Label>Insurance Certificates Note</Label>
              <Input name="insuranceCertificatesNote" value={formData.insuranceCertificatesNote} onChange={handleChange} />
              <Label>Work Product Ownership Note</Label>
              <Input name="workProductOwnershipNote" value={formData.workProductOwnershipNote} onChange={handleChange} />
              <Label>Confidentiality Note</Label>
              <Input name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} />
              <Label>Indemnification Note</Label>
              <Input name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
              <Label>Warranty Note</Label>
              <Input name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} />
              <Label>Access to Worksite Note</Label>
              <Input name="accessToWorksiteNote" value={formData.accessToWorksiteNote} onChange={handleChange} />
              <Label>Utilities Note</Label>
              <Input name="utilitiesNote" value={formData.utilitiesNote} onChange={handleChange} />
              <Label>Inspection Costs Note</Label>
              <Input name="inspectionCostsNote" value={formData.inspectionCostsNote} onChange={handleChange} />
              <Label>Events of Default (custom text)</Label>
              <textarea
                name="eventsOfDefaultNote"
                value={formData.eventsOfDefaultNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Default Cure Days</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
              <Label>Force Majeure Note</Label>
              <Input name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
              <Label>Dispute Resolution Note</Label>
              <Input name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate & Signatures</h3>
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notices Procedure Note</Label>
              <Input name="noticesProcedureNote" value={formData.noticesProcedureNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Owner Signatory</h4>
              <Label>Name</Label>
              <Input name="ownerSignName" value={formData.ownerSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="ownerSignTitle" value={formData.ownerSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="ownerSignDate" value={formData.ownerSignDate} onChange={handleChange} />
              <h4 className="font-semibold">Contractor Signatory</h4>
              <Label>Name</Label>
              <Input name="contractorSignName" value={formData.contractorSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="contractorSignTitle" value={formData.contractorSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="contractorSignDate" value={formData.contractorSignDate} onChange={handleChange} />
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
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>

        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 6 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Construction Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
