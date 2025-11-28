import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  serviceStartDate: string;
  architectName: string;
  clientName: string;
  paymentAmount: string;
  discountTerms: string;
  latePaymentInterest: string;
  cureDays: string;
  terminationDate: string;
  governingLawState: string;
  workProductOwnership: string;
  clientSignatoryName: string;
  clientSignDate: string;
  architectSignatoryName: string;
  architectSignDate: string;
}

export default function ArchitecturalServicesAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    partyAName: "",
    partyAAddress: "",
    partyBName: "",
    partyBAddress: "",
    serviceStartDate: "",
    architectName: "",
    clientName: "",
    paymentAmount: "",
    discountTerms: "",
    latePaymentInterest: "",
    cureDays: "",
    terminationDate: "",
    governingLawState: "",
    workProductOwnership: "",
    clientSignatoryName: "",
    clientSignDate: "",
    architectSignatoryName: "",
    architectSignDate: "",
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

    // === PDF Content ===
    addText("ARCHITECTURAL SERVICES AGREEMENT", 14, true, true);
    addText("\n");
    addText(`This Architectural Services Agreement (the “Agreement”) is made and entered into as of ${formData.agreementDate || "____________________"}, by and between:`);
    addText(`${formData.partyAName || "____________________"}, residing at ${formData.partyAAddress || "____________________"},`);
    addText("\nAND");
    addText(`${formData.partyBName || "____________________"}, residing at ${formData.partyBAddress || "____________________"}.`);
    addText("(Collectively referred to as the “Parties” and individually as a “Party.”)");
    addText("\n");

    addText("1. Description of Services");
    addText(`Commencing on ${formData.serviceStartDate || "____________________"}, ${formData.architectName || "____________________"} (the “Architect”) shall provide to ${formData.clientName || "____________________"} (the “Client”) the architectural services described are attached hereto and incorporated by reference (collectively, the “Services”).`);
    addText("The Services shall include all architectural, site planning, and engineering services related to the shell and core design of the project (the “Project”), including but not limited to:");
    addText("\n");

    addText("2. Phases of Services");
    addText("a. Schematic Design Phase");
    addText("The Architect shall:");
    addText("• Review all documentation furnished by the Client;");
    addText("• Determine and confirm the requirements of the Project.");
    addText("b. Design Development Phase");
    addText("The Architect shall:");
    addText("• Prepare construction documents including drawings, specifications, and preliminary plans defining the architectural, structural, mechanical, and electrical elements of the Project, based on approved schematic designs;");
    addText("• Advise the Client on preliminary construction cost estimates.");
    addText("c. Construction Documents Phase");
    addText("The Architect shall:");
    addText("• Prepare detailed construction drawings and documents based on approved design development materials;");
    addText("• Advise the Client on anticipated construction costs;");
    addText("• Assist in obtaining all necessary governmental and regulatory approvals.");
    addText("d. Bidding or Negotiation Phase");
    addText("Upon Client approval of construction documents, the Architect shall assist with obtaining bids or negotiated proposals and facilitate the preparation and award of construction contracts.");
    addText("e. Construction Phase – Administration");
    addText("The Architect shall:");
    addText("• Administer the general conditions of the construction contract, from award through issuance of the final certificate of payment;");
    addText("• Have authority to inspect the work and reject non-compliant work;");
    addText("• Not assume control over construction means, methods, techniques, scheduling, safety measures, or contractor operations.");
    addText("\n");

    addText("3. Additional Services");
    addText("Upon written request by the Client, the Architect may provide additional services, including but not limited to:");
    addText("• Extended design and planning beyond the basic scope;");
    addText("• Selection of project representatives or consultants;");
    addText("• Evaluation of contractor substitution requests;");
    addText("• Preparation of revisions due to Client-directed changes.");
    addText("The Client agrees to compensate the Architect for such additional services as provided under Section 10.");
    addText("\n");

    addText("4. Payment");
    addText(`• The Client shall pay ${formData.architectName || "____________________"} the total amount of ${formData.paymentAmount || "____________________"} upon completion of Services.`);
    addText(`• Discount Terms: ${formData.discountTerms || "____________________"}`);
    addText(`• Late Payment: Interest shall accrue on overdue amounts at ${formData.latePaymentInterest || "____________________"} per annum or the maximum rate permitted by law, whichever is lower.`);
    addText("• Collection Costs: The Client shall bear all costs of collection, including reasonable attorneys’ fees.");
    addText("• Non-Payment: Failure to pay shall constitute a material breach and entitle the Architect to terminate this Agreement and pursue legal remedies.");
    addText("\n");

    addText("5. Warranty");
    addText("The Architect warrants that the Services shall be performed:");
    addText("• In a professional and timely manner;");
    addText("• In accordance with standards customary within the industry and local jurisdiction;");
    addText("• With a standard of care equal to or greater than that exercised by similarly situated professionals on comparable projects.");
    addText("\n");

    addText("6. Default");
    addText("The following shall constitute a material default under this Agreement:");
    addText("a. Failure to make a required payment when due;");
    addText("b. Insolvency, bankruptcy, or appointment of a receiver for either Party;");
    addText("c. Seizure, levy, or general assignment for the benefit of creditors;");
    addText("d. Failure to perform or deliver services in the time and manner specified herein.");
    addText("\n");

    addText("7. Remedies");
    addText(`In the event of a default, the non-defaulting Party may serve written notice detailing the nature of the default. The defaulting Party shall have ${formData.cureDays || "____"} from the effective date of such notice to cure the default.`);
    addText("Failure to cure within the stipulated period shall result in automatic termination of this Agreement unless otherwise waived in writing by the non-defaulting Party.");
    addText("\n");

    addText("8. Force Majeure");
    addText("If performance under this Agreement is delayed or prevented due to circumstances beyond a Party’s reasonable control, including but not limited to acts of God, natural disasters, pandemics, labor strikes, riots, war, vandalism, or governmental restrictions, then the affected Party shall be excused from performance for the duration of the event.");
    addText("The affected Party must promptly notify the other in writing and use reasonable efforts to resume performance.");
    addText("\n");

    addText("9. Confidentiality");
    addText("• Both Parties agree to maintain the confidentiality of all proprietary or sensitive information disclosed in connection with this Agreement.");
    addText("• Upon termination, each Party shall return or destroy all confidential materials received from the other Party.");
    addText("• These obligations shall survive termination of this Agreement.");
    addText("\n");

    addText("10. Indemnification");
    addText("Each Party shall indemnify, defend, and hold harmless the other Party, its officers, employees, and agents, from any and all claims, liabilities, losses, damages, or expenses (including attorney’s fees) arising from or related to the negligent acts or omissions of the indemnifying Party or its representatives.");
    addText("\n");

    addText("11. No Mechanic’s Lien");
    addText("The Architect agrees that no mechanic’s lien or claim shall be filed by any of its employees, subcontractors, or consultants. Upon final payment, the Architect shall certify that all claims for labor, materials, and services have been satisfied.");
    addText("\n");

    addText("12. Compensation for Additional Services");
    addText("The Client shall compensate the Architect for all authorized additional services beyond the scope of this Agreement, in accordance with the rates and terms mutually agreed upon in writing.");
    addText("\n");

    addText("13. Client Responsibilities");
    addText("The Client shall:");
    addText("• Provide complete and timely information regarding the Project requirements;");
    addText("• Furnish all legal and regulatory documentation necessary for design and construction approvals.");
    addText("\n");

    addText("14. Term");
    addText(`This Agreement shall automatically terminate on ${formData.terminationDate || "____________________"}, unless otherwise extended or terminated earlier as provided herein.`);
    addText("\n");

    addText("15. Work Product Ownership");
    addText(`All intellectual property and work product prepared by the Architect under this Agreement shall remain the ${formData.workProductOwnership || "____________________"} exclusive property, as agreed.`);
    addText("The Party assigning such rights shall execute all documents necessary to confirm such ownership.");
    addText("\n");

    addText("16. Arbitration");
    addText("Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration under the Commercial Arbitration Rules of the American Arbitration Association.");
    addText("• Each Party shall appoint one arbitrator; the two arbitrators shall appoint a third.");
    addText("• Arbitration shall be conducted at a mutually agreed location.");
    addText("• The arbitrators shall have the power to issue binding decisions but shall not alter the terms of this Agreement or award punitive damages.");
    addText("• The arbitration award shall be final and enforceable in any court of competent jurisdiction.");
    addText("\n");

    addText("17. Severability");
    addText("If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be limited or modified to the extent necessary to render it enforceable. The remainder of this Agreement shall remain in full force and effect.");
    addText("\n");

    addText("18. Amendment");
    addText("This Agreement may be amended only by a written instrument executed by the Party against whom enforcement is sought.");
    addText("\n");

    addText("19. Governing Law");
    addText(`This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingLawState || "____________________"}, without regard to conflict of laws principles.`);
    addText("\n");

    addText("20. Notice");
    addText("All notices required or permitted under this Agreement shall be in writing and delivered personally or by certified mail, return receipt requested, to the addresses specified above or as otherwise designated in writing.");
    addText("\n");

    addText("21. Waiver");
    addText("The failure of either Party to enforce any provision of this Agreement shall not be construed as a waiver of such provision or any other provision, nor shall it affect the right of the Party to thereafter enforce such provision.");
    addText("\n");

    addText("22. Entire Agreement");
    addText("This Agreement constitutes the entire understanding between the Parties with respect to its subject matter and supersedes all prior oral or written communications, representations, or agreements.");
    addText("\n");

    addText("23. Execution");
    addText("CLIENT");
    addText(`By: ___________________________`);
    addText(`Name: ${formData.clientSignatoryName || "____________________"}`);
    addText(`Date: ${formData.clientSignDate || "____________________"}`);
    addText("ARCHITECT");
    addText(`By: ___________________________`);
    addText(`Name: ${formData.architectSignatoryName || "____________________"}`);
    addText(`Date: ${formData.architectSignDate || "____________________"}`);

    doc.save("Architectural_Services_Agreement.pdf");
    setPdfGenerated(true);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties Information</h3>
              <Label>Agreement Date</Label>
              <Input name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
              <Label>Party A Name</Label>
              <Input name="partyAName" value={formData.partyAName} onChange={handleChange} />
              <Label>Party A Address</Label>
              <Input name="partyAAddress" value={formData.partyAAddress} onChange={handleChange} />
              <Label>Party B Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />
              <Label>Party B Address</Label>
              <Input name="partyBAddress" value={formData.partyBAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Terms</h3>
              <Label>Service Start Date</Label>
              <Input name="serviceStartDate" value={formData.serviceStartDate} onChange={handleChange} />
              <Label>Architect Name</Label>
              <Input name="architectName" value={formData.architectName} onChange={handleChange} />
              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Discount Terms</Label>
              <Input name="discountTerms" value={formData.discountTerms} onChange={handleChange} />
              <Label>Late Payment Interest</Label>
              <Input name="latePaymentInterest" value={formData.latePaymentInterest} onChange={handleChange} />
              <Label>Cure Days on Default</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
              <Label>Termination Date</Label>
              <Input name="terminationDate" value={formData.terminationDate} onChange={handleChange} />
              <Label>Governing Law State</Label>
              <Input name="governingLawState" value={formData.governingLawState} onChange={handleChange} />
              <Label>Work Product Ownership</Label>
              <Input name="workProductOwnership" value={formData.workProductOwnership} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Execution & Signatures</h3>
              <Label>Client Signatory Name</Label>
              <Input name="clientSignatoryName" value={formData.clientSignatoryName} onChange={handleChange} />
              <Label>Client Sign Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <Label>Architect Signatory Name</Label>
              <Input name="architectSignatoryName" value={formData.architectSignatoryName} onChange={handleChange} />
              <Label>Architect Sign Date</Label>
              <Input name="architectSignDate" value={formData.architectSignDate} onChange={handleChange} />
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

        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <Button onClick={generatePDF}>Generate PDF</Button>
        )}
      </div>

      {step === 4 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Architectural Services Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
