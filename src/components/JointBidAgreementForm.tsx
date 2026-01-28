// Removed duplicate FormWizard-based component to avoid duplicate React imports and exports.
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  projectDescription: string;
  bidAmount: string;
  bidTerms: string;
  bidBondDetails: string;
  otherBonds: string;
  jointVentureRequirement: string;
  awardActions: string;
  costsOfBidPreparation: string;
  negotiationsProcedure: string;
  withdrawalBeforeSubmission: string;
  governingLaw: string;
  signatory1Name: string;
  signatory1Title: string;
  signatory1Date: string;
  signatory2Name: string;
  signatory2Title: string;
  signatory2Date: string;
  signatory3Name: string;
  signatory3Title: string;
  signatory3Date: string;
}

export default function JointBidAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    projectDescription: "",
    bidAmount: "",
    bidTerms: "",
    bidBondDetails: "",
    otherBonds: "",
    jointVentureRequirement: "",
    awardActions: "",
    costsOfBidPreparation: "",
    negotiationsProcedure: "",
    withdrawalBeforeSubmission: "",
    governingLaw: "",
    signatory1Name: "",
    signatory1Title: "",
    signatory1Date: "",
    signatory2Name: "",
    signatory2Title: "",
    signatory2Date: "",
    signatory3Name: "",
    signatory3Title: "",
    signatory3Date: "",
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

    write("JOINT BID AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Joint Bid Agreement (the “Agreement”) is entered into as of ${formData.effectiveDate || "[_____]"} (the “Effective Date”) by and between the undersigned general contractors (individually, a “Contractor” and collectively, the “Contractors”), for the purpose of jointly preparing and submitting a bid for the contract described herein (the “Project”).`
    );

    write("\n");
    write("1. Purpose", 12, true);
    write(
      `The purpose of this Agreement is to establish the terms and conditions under which the Contractors will prepare and submit a joint bid for the construction contract issued by ${formData.ownerName || "[Owner/Entity Name]"} (the “Owner”), and to set forth the respective rights, obligations, and responsibilities of the Contractors in connection with such joint bid and any resulting contract award.`
    );

    write("\n");
    write("2. Conditions for Joint Bid Submission", 12, true);
    write("The Contractors agree that a joint bid will not be submitted unless and until the following conditions are satisfied:");
    write("\n");
    write("1. Bid Amount and Terms");
    write(`The amount and terms of the bid have been mutually agreed upon by all Contractors: ${formData.bidAmount || "[Bid Amount and Terms]"}`);
    write("\n");
    write("2. Bid Bond");
    write(`The Bid Bond required to accompany the bid has been obtained by the Contractors: ${formData.bidBondDetails || "[Bid Bond Details]"}`);
    write("\n");
    write("3. Other Bonds and Commitments");
    write(`${formData.otherBonds || "[Other Bonds and Commitments]"}`);

    write("\n");
    write("3. Execution of Bid Bond", 12, true);
    write("Each Contractor shall jointly and severally execute the Bid Bond and any indemnity agreement required to secure the issuance of the Bid Bond. The obligations under such bonds and indemnity agreements shall be binding upon each Contractor individually as well as collectively.");

    write("\n");
    write("4. Award of Contract", 12, true);
    write("In the event that the contract is awarded to the Contractors:");
    write("\n");
    write("1. Joint Venture Agreement");
    write(`${formData.jointVentureRequirement || "The Contractors shall promptly execute a formal Joint Venture Agreement setting forth the terms, responsibilities, and obligations for the construction of the Project."}`);
    write("\n");
    write("2. Execution of Contractual Documents");
    write(`${formData.awardActions || "Each Contractor shall jointly and severally execute the construction contract, all performance and payment bonds required by the contract, and all related indemnity agreements."}`);

    write("\n");
    write("5. Costs of Bid Preparation", 12, true);
    write(`${formData.costsOfBidPreparation || "All costs, expenses, and fees incurred by a Contractor in connection with the preparation of the joint bid shall be borne solely by the Contractor incurring such costs. No Contractor shall have a claim against the other for reimbursement of such costs unless otherwise agreed in writing."}`);

    write("\n");
    write("6. Negotiations with Owner", 12, true);
    write(`${formData.negotiationsProcedure || "All negotiations, discussions, or correspondence with the Owner or the Owner’s representatives, including the Architect or Engineer, following the submission of the joint bid shall be conducted jointly by the Contractors. No Contractor shall act unilaterally in such negotiations without the prior written consent of the other Contractor(s)."}`);

    write("\n");
    write("7. Withdrawal from Agreement", 12, true);
    write("1. Prior to Submission of Joint Bid");
    write(`${formData.withdrawalBeforeSubmission || "Any Contractor may withdraw from this Agreement at any time before the joint bid has been formally submitted, without liability to the other Contractor(s)."}`);
    write("\n");
    write("2. After Withdrawal");
    write("If a Contractor withdraws before the submission of a joint bid, the remaining Contractor(s) may submit a bid for the contract either individually or jointly with another person or firm, without liability to the withdrawing Contractor.");

    write("\n");
    write("8. Execution and Effectiveness", 12, true);
    write("This Agreement shall become effective upon execution by all Contractors. The signatories below represent and warrant that they are duly authorized to execute this Agreement on behalf of the respective Contractors.");

    write("\n");
    write("9. Miscellaneous", 12, true);
    write("Governing Law:");
    write(`${formData.governingLaw || "This Agreement shall be governed by, and construed in accordance with, the laws of [State/Country]."}`);
    write("\n");
    write("Entire Agreement:");
    write("This Agreement constitutes the entire understanding between the Contractors with respect to the subject matter hereof and supersedes all prior negotiations, discussions, or agreements, whether written or oral.");
    write("\n");
    write("Amendments:");
    write("Any amendment or modification to this Agreement must be in writing and signed by all Contractors.");

    write("\n");
    write("10. Signatories", 12, true);
    write("IN WITNESS WHEREOF, the undersigned have executed this Joint Bid Agreement as of the Effective Date.");
    write("\n");

    write(`Contractor Name	Signature	Title	Date`);
    write(`\n[Contractor 1]\t[Signature]\t[Title]\t[Date]`);
    write(`\n[Contractor 2]\t[Signature]\t[Title]\t[Date]`);
    write(`\n[Contractor 3]\t[Signature]\t[Title]\t[Date]`);

    write("\n");

    // Signatures (from form)
    write(`${formData.signatory1Name || "[Contractor 1]"}`);
    write(`Title: ${formData.signatory1Title || "[Title]"}`);
    write(`Date: ${formData.signatory1Date || "[Date]"}`);
    write("\n");
    write(`${formData.signatory2Name || "[Contractor 2]"}`);
    write(`Title: ${formData.signatory2Title || "[Title]"}`);
    write(`Date: ${formData.signatory2Date || "[Date]"}`);
    write("\n");
    write(`${formData.signatory3Name || "[Contractor 3]"}`);
    write(`Title: ${formData.signatory3Title || "[Title]"}`);
    write(`Date: ${formData.signatory3Date || "[Date]"}`);

    doc.save("Joint_Bid_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Agreement & Project</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Owner / Entity Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />

              <Label>Project Description</Label>
              <Textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Bid Details & Bonds</h3>
              <Label>Bid Amount / Terms</Label>
              <Input name="bidAmount" value={formData.bidAmount} onChange={handleChange} />

              <Label>Bid Bond Details</Label>
              <Textarea name="bidBondDetails" value={formData.bidBondDetails} onChange={handleChange} />

              <Label>Other Bonds & Commitments</Label>
              <Textarea name="otherBonds" value={formData.otherBonds} onChange={handleChange} />

              <Label>Joint Venture Requirement (post-award)</Label>
              <Textarea name="jointVentureRequirement" value={formData.jointVentureRequirement} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Award, Costs & Negotiations</h3>
              <Label>Actions Upon Award</Label>
              <Textarea name="awardActions" value={formData.awardActions} onChange={handleChange} />

              <Label>Costs of Bid Preparation</Label>
              <Textarea name="costsOfBidPreparation" value={formData.costsOfBidPreparation} onChange={handleChange} />

              <Label>Negotiations Procedure</Label>
              <Textarea name="negotiationsProcedure" value={formData.negotiationsProcedure} onChange={handleChange} />

              <Label>Withdrawal Prior to Submission (description)</Label>
              <Textarea name="withdrawalBeforeSubmission" value={formData.withdrawalBeforeSubmission} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatories</h3>
              <Label>Signatory 1 - Name</Label>
              <Input name="signatory1Name" value={formData.signatory1Name} onChange={handleChange} />
              <Label>Signatory 1 - Title</Label>
              <Input name="signatory1Title" value={formData.signatory1Title} onChange={handleChange} />
              <Label>Signatory 1 - Date</Label>
              <Input name="signatory1Date" value={formData.signatory1Date} onChange={handleChange} />

              <hr />

              <Label>Signatory 2 - Name</Label>
              <Input name="signatory2Name" value={formData.signatory2Name} onChange={handleChange} />
              <Label>Signatory 2 - Title</Label>
              <Input name="signatory2Title" value={formData.signatory2Title} onChange={handleChange} />
              <Label>Signatory 2 - Date</Label>
              <Input name="signatory2Date" value={formData.signatory2Date} onChange={handleChange} />

              <hr />

              <Label>Signatory 3 - Name</Label>
              <Input name="signatory3Name" value={formData.signatory3Name} onChange={handleChange} />
              <Label>Signatory 3 - Title</Label>
              <Input name="signatory3Title" value={formData.signatory3Title} onChange={handleChange} />
              <Label>Signatory 3 - Date</Label>
              <Input name="signatory3Date" value={formData.signatory3Date} onChange={handleChange} />
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
        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Joint Bid Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
