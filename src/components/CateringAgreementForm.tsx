import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  clientName: string;
  clientAddress: string;
  catererName: string;
  catererAddress: string;
  termStartDate: string;
  termStartTime: string;
  termEndDate: string;
  termEndTime: string;
  eventDate: string;
  eventLocation: string;
  estimatedAttendees: string;
  menuNotes: string;
  amountPerPerson: string;
  fullPaymentDue: string; // on or before event date (yes/no or note)
  latePaymentRate: string;
  cancellationPercentage: string;
  additionalServicesNote: string;
  paymentDueDays: string;
  insuranceNotes: string;
  indemnityNotes: string;
  governingState: string;
  venueCounty: string;
  disputeNegotiationDays: string;
  mediationDays: string;
  arbitrationBody: string;
  attorneyFeesClause: string;
  clientSignName: string;
  clientSignTitle: string;
  clientSignDate: string;
  catererSignName: string;
  catererSignTitle: string;
  catererSignDate: string;
}

export default function CateringAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    clientName: "",
    clientAddress: "",
    catererName: "",
    catererAddress: "",
    termStartDate: "",
    termStartTime: "",
    termEndDate: "",
    termEndTime: "",
    eventDate: "",
    eventLocation: "",
    estimatedAttendees: "",
    menuNotes: "",
    amountPerPerson: "",
    fullPaymentDue: "",
    latePaymentRate: "",
    cancellationPercentage: "",
    additionalServicesNote: "",
    paymentDueDays: "",
    insuranceNotes: "",
    indemnityNotes: "",
    governingState: "",
    venueCounty: "",
    disputeNegotiationDays: "30",
    mediationDays: "",
    arbitrationBody: "",
    attorneyFeesClause: "",
    clientSignName: "",
    clientSignTitle: "",
    clientSignDate: "",
    catererSignName: "",
    catererSignTitle: "",
    catererSignDate: "",
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

    // === CATERING AGREEMENT CONTENT ===
    addText("Catering Agreement", 14, true, true);
    addText("\n");
    addText(
      `This Catering Agreement (“Agreement”) is made and entered into as of ${formData.effectiveDate || "________________"} (“Effective Date”) by and between ${formData.clientName || "________________"}, residing at/with a principal place of business at ${formData.clientAddress || "________________"} (“Client”), and ${formData.catererName || "________________"}, residing at/with a principal place of business at ${formData.catererAddress || "________________"} (“Caterer”). The Client and the Caterer may hereinafter be referred to individually as a “Party” and collectively as the “Parties.”`
    );

    addText("\n1. Term");
    addText(
      `1.1 This Agreement shall commence on ${formData.termStartDate || "________"} at ${formData.termStartTime || "____"} and shall remain in full force and effect until ${formData.termEndDate || "________"} at ${formData.termEndTime || "____"}, unless terminated earlier in accordance with this Agreement.`
    );
    addText("1.2 The Agreement may be extended or renewed only by written consent duly executed by both Parties.");
    addText("\n2. Engagement of Services");
    addText("2.1 The Client hereby engages the Caterer to provide professional catering services for the event described herein, and the Caterer accepts such engagement subject to the terms and conditions set forth in this Agreement.");
    addText("\n3. Event Details");
    addText(`3.1 Event Date: ${formData.eventDate || "________________"}`);
    addText(`3.2 Event Location: ${formData.eventLocation || "________________"}`);
    addText("3.3 Prices, menu, and preparations are calculated based on the estimated number of attendees provided by the Client. The Caterer shall prepare sufficient food and beverages to adequately serve all attendees, subject to reasonable industry standards.");
    addText(`Estimated number of attendees: ${formData.estimatedAttendees || "________________"}`);
    addText("\n4. Menu");
    addText("4.1 The Caterer reserves the right to make minor substitutions to the agreed menu in the event that certain ingredients are unavailable due to circumstances beyond the Caterer’s reasonable control.");
    addText(formData.menuNotes || "");
    addText("\n5. Consideration and Payment Terms");
    addText(`5.1 The Client shall pay the Caterer the sum of US $${formData.amountPerPerson || "____"} per person in cash.`);
    addText(`5.2 Full payment shall be made on or before the event date. ${formData.fullPaymentDue || "No set-off, deduction, or withholding shall be permitted unless otherwise required by law."}`);
    addText(
      `5.3 Late Payment Penalty: Any payment not made when due shall accrue interest at the rate of ${formData.latePaymentRate || "------per month"} (or the maximum allowable by law, whichever is lower), calculated from the due date until payment is received in full.`
    );
    addText("5.4 The Client shall also be liable for all reasonable collection costs, including attorney’s fees and court costs, incurred by the Caterer in recovering overdue amounts.");
    addText("\n6. Additional Services");
    addText("6.1 Any additional services requested by the Client that fall outside the scope of this Agreement shall be subject to additional charges.");
    addText("6.2 All such requests must be made in writing and acknowledged by the Caterer prior to performance.");
    addText(formData.additionalServicesNote || "");
    addText("\n7. Independent Contractor Status");
    addText("7.1 The Caterer shall perform its obligations as an independent contractor and not as an employee, partner, or agent of the Client.");
    addText("7.2 The Caterer shall provide and maintain its own equipment, tools, and staff required for the performance of services.");
    addText("\n8. Force Majeure");
    addText("8.1 Neither Party shall be held liable for any failure or delay in performance under this Agreement if such failure or delay is caused by events beyond its reasonable control, including but not limited to acts of God, natural disasters, fire, flood, pandemic, epidemic, public health crisis, storm, vandalism, governmental restrictions, or other unforeseen events.");
    addText("8.2 In such cases, obligations shall be suspended for the duration of the event preventing performance.");
    addText("\n9. Cancellation");
    addText(`9.1 In the event that the Client cancels the event for any reason other than a Force Majeure event, the Caterer shall be entitled to liquidated damages in the amount of ${formData.cancellationPercentage || "[insert percentage]"}% of the total estimated charges.`);
    addText("\n10. Insurance and Indemnification");
    addText("10.1 The Caterer shall maintain at its sole expense general liability insurance in coverage amounts customary for the catering industry.");
    addText(`10.2 The Client shall indemnify, defend, and hold harmless the Caterer and its employees, agents, and subcontractors from and against any claims, losses, damages, theft, or property loss caused by the Client’s guests or invitees. ${formData.indemnityNotes || ""}`);
    addText("\n11. Compliance with Rules and Regulations");
    addText("11.1 The Caterer shall comply with all applicable laws, regulations, ordinances, and rules of the local county health department and shall maintain industry-standard hygienic and food safety practices at all times.");
    addText("\n12. Assignment");
    addText("12.1 Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party.");
    addText("12.2 This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.");
    addText("\n13. Entire Agreement");
    addText("13.1 This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, or agreements, whether oral or written, relating to the subject matter hereof.");
    addText("\n14. Governing Law and Venue");
    addText(`14.1 This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "[insert state]"}, without regard to its conflict of laws principles.`);
    addText(`14.2 The exclusive venue for any dispute arising under this Agreement shall be the courts located in ${formData.venueCounty || "[insert county, state]"}.`);
    addText("\n15. Dispute Resolution");
    addText("15.1 In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the Parties shall first attempt to resolve the matter through good-faith negotiations.");
    addText(`15.2 If the dispute is not resolved within ${formData.disputeNegotiationDays || "30"} days, the Parties agree to submit the matter to mediation administered by a mutually agreed mediator.`);
    addText(`15.3 If mediation fails, the dispute shall be finally resolved by binding arbitration under the rules of the ${formData.arbitrationBody || "[American Arbitration Association / relevant arbitration body]"}. The arbitral award shall be final and binding upon both Parties and may be entered and enforced in any court of competent jurisdiction.`);
    addText("\n16. Attorney’s Fees");
    addText(`16.1 In the event of litigation or arbitration arising out of this Agreement, the prevailing Party shall be entitled to recover reasonable attorney’s fees, costs, and expenses incurred. ${formData.attorneyFeesClause || ""}`);
    addText("\n17. Execution and Signatures");
    addText("17.1 This Agreement shall be executed by the duly authorized representatives of both Parties.");
    addText("17.2 This Agreement shall be effective as of the Effective Date stated above.");
    addText("\nCLIENT: ___________________________");
    addText(`Name: ${formData.clientSignName || "________________"}`);
    addText(`Title: ${formData.clientSignTitle || "________________"}`);
    addText(`Date: ${formData.clientSignDate || "________________"}`);
    addText("\nCATERER: ___________________________");
    addText(`Name: ${formData.catererSignName || "________________"}`);
    addText(`Title: ${formData.catererSignTitle || "________________"}`);
    addText(`Date: ${formData.catererSignDate || "________________"}`);

    // Save
    doc.save("Catering_Agreement.pdf");
    setPdfGenerated(true);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Term</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Client Name / Entity</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address / Business</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
              <Label>Caterer Name / Entity</Label>
              <Input name="catererName" value={formData.catererName} onChange={handleChange} />
              <Label>Caterer Address / Business</Label>
              <Input name="catererAddress" value={formData.catererAddress} onChange={handleChange} />
              <Label>Term Start Date</Label>
              <Input name="termStartDate" value={formData.termStartDate} onChange={handleChange} />
              <Label>Term Start Time</Label>
              <Input name="termStartTime" value={formData.termStartTime} onChange={handleChange} />
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Term End Time</Label>
              <Input name="termEndTime" value={formData.termEndTime} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Event & Menu & Payment</h3>
              <Label>Event Date</Label>
              <Input name="eventDate" value={formData.eventDate} onChange={handleChange} />
              <Label>Event Location / Venue</Label>
              <Input name="eventLocation" value={formData.eventLocation} onChange={handleChange} />
              <Label>Estimated Attendees</Label>
              <Input name="estimatedAttendees" value={formData.estimatedAttendees} onChange={handleChange} />
              <Label>Menu Notes / Substitutions</Label>
              <textarea
                name="menuNotes"
                value={formData.menuNotes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Amount per Person (USD)</Label>
              <Input name="amountPerPerson" value={formData.amountPerPerson} onChange={handleChange} />
              <Label>Full Payment Note</Label>
              <Input name="fullPaymentDue" value={formData.fullPaymentDue} onChange={handleChange} />
              <Label>Late Payment Rate (per month or note)</Label>
              <Input name="latePaymentRate" value={formData.latePaymentRate} onChange={handleChange} />
              <Label>Payment Due (days)</Label>
              <Input name="paymentDueDays" value={formData.paymentDueDays} onChange={handleChange} />
              <Label>Cancellation Percentage (liquidated damages)</Label>
              <Input name="cancellationPercentage" value={formData.cancellationPercentage} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Insurance & Signatures</h3>
              <Label>Additional Services Note</Label>
              <textarea
                name="additionalServicesNote"
                value={formData.additionalServicesNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Insurance Notes</Label>
              <Input name="insuranceNotes" value={formData.insuranceNotes} onChange={handleChange} />
              <Label>Indemnity Notes</Label>
              <Input name="indemnityNotes" value={formData.indemnityNotes} onChange={handleChange} />
              <Label>Governing State</Label>
              <Input name="governingState" value={formData.governingState} onChange={handleChange} />
              <Label>Venue County, State</Label>
              <Input name="venueCounty" value={formData.venueCounty} onChange={handleChange} />
              <Label>Dispute Negotiation Days</Label>
              <Input name="disputeNegotiationDays" value={formData.disputeNegotiationDays} onChange={handleChange} />
              <Label>Mediation Days (if different)</Label>
              <Input name="mediationDays" value={formData.mediationDays} onChange={handleChange} />
              <Label>Arbitration Body</Label>
              <Input name="arbitrationBody" value={formData.arbitrationBody} onChange={handleChange} />
              <Label>Attorney Fees Clause Note</Label>
              <Input name="attorneyFeesClause" value={formData.attorneyFeesClause} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Client Signatory</h4>
              <Label>Name</Label>
              <Input name="clientSignName" value={formData.clientSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="clientSignTitle" value={formData.clientSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <h4 className="font-semibold">Caterer Signatory</h4>
              <Label>Name</Label>
              <Input name="catererSignName" value={formData.catererSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="catererSignTitle" value={formData.catererSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="catererSignDate" value={formData.catererSignDate} onChange={handleChange} />
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
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 4 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Catering Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
