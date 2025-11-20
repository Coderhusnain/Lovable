import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  bidderCompanyName: string;
  bidderAddress: string;
  bidderPhone: string;
  bidderEmail: string;
  projectName: string;
  projectStartDate: string;
  projectEndDate: string;
  scopeOfServices: string;
  estimatedTimeline: string;
  estimatedBudget: string;
  currency: string;
  keyPersonnel: string;
  proposalValidityDays: string;
  governingLawState: string;
  authorizedSignatory: string;
  signatoryName: string;
  signatoryDesignation: string;
  signatoryCompanyName: string;
  signatoryDate: string;
}

export default function BidProposalForm() {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    bidderCompanyName: "",
    bidderAddress: "",
    bidderPhone: "",
    bidderEmail: "",
    projectName: "",
    projectStartDate: "",
    projectEndDate: "",
    scopeOfServices: "",
    estimatedTimeline: "",
    estimatedBudget: "",
    currency: "",
    keyPersonnel: "",
    proposalValidityDays: "",
    governingLawState: "",
    authorizedSignatory: "",
    signatoryName: "",
    signatoryDesignation: "",
    signatoryCompanyName: "",
    signatoryDate: ""
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
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
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

    // === BID PROPOSAL CONTENT (verbatim, with placeholders substituted) ===

    addText("BID PROPOSAL", 14, true, true);
    addText("1. Client Information", 12, true);
    addText(`Client Name: ${formData.clientName}`);
    addText(`Address: ${formData.clientAddress}`);
    addText(`Phone: ${formData.clientPhone}`);
    addText(`Email: ${formData.clientEmail}`);

    addText("2. Bidder Information", 12, true);
    addText(`Company Name: ${formData.bidderCompanyName}`);
    addText(`Address: ${formData.bidderAddress}`);
    addText(`Phone: ${formData.bidderPhone}`);
    addText(`Email: ${formData.bidderEmail}`);

    addText("3. Introduction", 12, true);
    addText(
      `We are honored to submit this Bid Proposal (the “Proposal”) for the execution of ${formData.projectName}, scheduled to take place between ${formData.projectStartDate} and ${formData.projectEndDate}.`
    );
    addText(
      "This Proposal is intended to set forth a detailed outline of the scope of services, estimated project schedule, budgetary framework, and the professional approach to be adopted in fulfilling the Client’s objectives."
    );
    addText(
      "The Bidder affirms that this Proposal is submitted in good faith after careful review of the Client’s stated requirements and specifications. It is expressly acknowledged that this Proposal does not constitute a legally binding agreement but rather an offer to negotiate and, if mutually accepted, to enter into a formal contract on the terms and conditions substantially similar to those set forth herein."
    );
    addText(
      "This Proposal is submitted to facilitate transparent evaluation, mutual understanding, and alignment of expectations prior to formal engagement."
    );

    addText("4. Scope of Services", 12, true);
    addText("The Bidder proposes to provide the following services (collectively referred to as the “Services”):");
    addText(formData.scopeOfServices);
    addText("The Services shall be rendered in accordance with industry standards, applicable regulations, and the specific requirements of the Client as may be further detailed in any subsequent agreement or work order.");

    addText("5. Estimated Timeline", 12, true);
    addText("The Bidder has developed a preliminary project schedule as follows:");
    addText(formData.estimatedTimeline);
    addText("The timeline is subject to reasonable adjustments based on unforeseen circumstances, availability of materials, regulatory approvals, or any delays caused by the Client or third parties. Any modification to the schedule shall be communicated in writing and approved mutually.");

    addText("6. Estimated Budget / Costs", 12, true);
    addText("The total estimated cost for the provision of the Services is as follows:");
    addText(formData.estimatedBudget);
    addText(`All prices are quoted in ${formData.currency} (currency) and are exclusive of applicable taxes, duties, or surcharges unless otherwise stated.`);
    addText("The Bidder reserves the right to revise the proposed budget if there are material changes to the project’s scope, technical requirements, or schedule. Any such revisions shall be duly notified in writing and subject to the Client’s prior written approval before implementation.");

    addText("7. Key Personnel", 12, true);
    addText("The Services shall be performed under the direction and supervision of the following qualified personnel:");
    addText(formData.keyPersonnel);
    addText("Each designated individual shall possess the requisite professional credentials and experience necessary to perform their respective duties efficiently and in compliance with the Client’s standards.");

    addText("8. Client Responsibilities", 12, true);
    addText("To ensure the timely and successful completion of the Services, the Client agrees to:");
    addText("1.Provide access to relevant project sites, documentation, and necessary information.");
    addText("2.Ensure timely communication and decision-making in response to the Bidder’s submissions or queries.");
    addText("3.Designate a representative authorized to coordinate and approve project deliverables.");
    addText("4.Make timely payments in accordance with the agreed terms.");
    addText("5.Obtain any required permits, consents, or authorizations that are within the Client’s control.");
    addText("Failure by the Client to fulfill these obligations may result in reasonable extensions of time or adjustments to cost, as mutually agreed.");

    addText("9. Proposal Validity", 12, true);
    addText(`This Proposal shall remain valid and open for acceptance for a period of ${formData.proposalValidityDays} days from the date of submission. Thereafter, it shall automatically expire unless extended in writing by the Bidder.`);

    addText("10. Confidentiality", 12, true);
    addText("Both parties agree to maintain strict confidentiality regarding all proprietary or sensitive information exchanged in connection with this Proposal. Such information shall not be disclosed to any third party without the prior written consent of the disclosing party, except as required by law.");

    addText("11. No Waiver / Reservation of Rights", 12, true);
    addText("The submission of this Proposal shall not be deemed a waiver of any right, claim, or privilege of the Bidder, nor shall it obligate either party to enter into a contract unless and until a definitive written agreement is executed.");

    addText("12. Governing Law", 12, true);
    addText(`This Proposal shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}, United States of America, without regard to its conflict of law principles.`);

    addText("13. Conclusion", 12, true);
    addText("In conclusion, the Bidder respectfully submits this Proposal as a demonstration of its competence, commitment, and capacity to deliver the Services in accordance with the highest standards of professionalism, quality, and efficiency. The Bidder is confident that its experience, technical proficiency, and organizational capabilities uniquely qualify it to fulfill the Client’s project objectives within the proposed timeframe and budget.");
    addText("We reaffirm that this Proposal represents a good-faith offer prepared after due consideration of the Client’s requirements and prevailing market conditions. It reflects our understanding of the project scope and our dedication to achieving the Client’s goals through collaboration, transparency, and accountability.");
    addText("The Bidder looks forward to the opportunity to further discuss, clarify, and negotiate the terms of engagement leading to a formal contract. We remain at the Client’s disposal for any additional information or documentation that may be required for evaluation and decision-making.");
    addText("We appreciate your time and consideration and anticipate a mutually beneficial professional relationship built on trust, reliability, and shared success.");

    addText("For and on behalf of the Bidder");
    addText(`Authorized Signatory: ${formData.authorizedSignatory}`);
    addText(`Name: ${formData.signatoryName}`);
    addText(`Designation: ${formData.signatoryDesignation}`);
    addText(`Company Name: ${formData.signatoryCompanyName}`);
    addText(`Date: ${formData.signatoryDate}`);

    // Save file
    doc.save("Bid_Proposal.pdf");
    setPdfGenerated(true);
  };

 

  // Step rendering
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Client Information</h3>
              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
              <Label>Phone</Label>
              <Input name="clientPhone" value={formData.clientPhone} onChange={handleChange} />
              <Label>Email</Label>
              <Input name="clientEmail" value={formData.clientEmail} onChange={handleChange} />

              <hr />

              <h3 className="font-semibold">Bidder Information</h3>
              <Label>Company Name</Label>
              <Input name="bidderCompanyName" value={formData.bidderCompanyName} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="bidderAddress" value={formData.bidderAddress} onChange={handleChange} />
              <Label>Phone</Label>
              <Input name="bidderPhone" value={formData.bidderPhone} onChange={handleChange} />
              <Label>Email</Label>
              <Input name="bidderEmail" value={formData.bidderEmail} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Project & Scope</h3>
              <Label>Project Name (execution of ...)</Label>
              <Input name="projectName" value={formData.projectName} onChange={handleChange} />
              <Label>Project Start Date (scheduled to take place between)</Label>
              <Input name="projectStartDate" value={formData.projectStartDate} onChange={handleChange} />
              <Label>Project End Date</Label>
              <Input name="projectEndDate" value={formData.projectEndDate} onChange={handleChange} />

              <Label>Scope of Services (enter full description)</Label>
              <textarea
                name="scopeOfServices"
                value={formData.scopeOfServices}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={5}
              />

              <Label>Estimated Timeline (details)</Label>
              <textarea
                name="estimatedTimeline"
                value={formData.estimatedTimeline}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />

              <Label>Estimated Budget / Costs (details)</Label>
              <textarea
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Currency</Label>
              <Input name="currency" value={formData.currency} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Key Personnel & Administrative</h3>
              <Label>Key Personnel (list)</Label>
              <textarea
                name="keyPersonnel"
                value={formData.keyPersonnel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Proposal Validity (days)</Label>
              <Input name="proposalValidityDays" value={formData.proposalValidityDays} onChange={handleChange} />
              <Label>Governing Law (State)</Label>
              <Input name="governingLawState" value={formData.governingLawState} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Authorized Signatory</h3>
              <Label>Authorized Signatory</Label>
              <Input name="authorizedSignatory" value={formData.authorizedSignatory} onChange={handleChange} />
              <Label>Name</Label>
              <Input name="signatoryName" value={formData.signatoryName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} />
              <Label>Company Name</Label>
              <Input name="signatoryCompanyName" value={formData.signatoryCompanyName} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signatoryDate" value={formData.signatoryDate} onChange={handleChange} />
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

        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
           
          </div>
        )}
      </div>

      {/* Success state */}
      {step === 6 && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Agreement Created Successfully</div>
           
          </CardContent>
        </Card>
      )}
    </div>
  );
}
