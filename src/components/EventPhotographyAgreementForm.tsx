import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;

  photographerName: string;
  photographerAddress: string;

  clientName: string;
  clientAddress: string;

  // Event details
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;

  // Scope/Performance
  scopeOfWork: string;
  proofGalleryDays: string;
  finalDeliveryDays: string;
  artisticStyleNote: string;

  // Fees & payments
  totalFee: string;
  deposit: string;
  balanceDueDaysBeforeEvent: string;
  overtimeRate: string;
  overtimePaymentDays: string;
  expensesNote: string;

  // Remedies / cancellation
  breachCureDays: string;
  cancelMoreThanDays: string;
  cancelWithinDays: string;
  cancelWithinPercent: string;
  rescheduleNote: string;

  // Copyright & usage
  copyrightNote: string;
  clientLicenseNote: string;
  restrictionsNote: string;
  portfolioRightsNote: string;

  // Force majeure / dispute / boilerplate
  forceMajeureNote: string;
  disputeMediationState: string;
  entireAgreementNote: string;
  severabilityNote: string;
  amendmentsNote: string;
  governingLaw: string;
  noticesNote: string;
  waiverNote: string;
  assignmentNote: string;

  // Signatures
  clientSignName: string;
  clientSignDate: string;
  photographerSignName: string;
  photographerSignDate: string;
}

export default function EventPhotographyAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "[Effective Date]",

    photographerName: "[Photographer Full Name]",
    photographerAddress: "[Photographer Address]",

    clientName: "[Client Full Name]",
    clientAddress: "[Client Address]",

    eventName: "[Event Name/Description]",
    eventDate: "[Event Date]",
    eventTime: "[Event Time]",
    eventLocation: "[Event Location]",

    scopeOfWork:
      "a. Pre-event consultation with the Client to determine creative direction, required shots, and event logistics;\nb. On-site professional photography coverage for the duration agreed upon;\nc. Artistic editing, retouching, and post-processing of selected images;\nd. Delivery of edited high-resolution digital images in the format and quantity agreed upon;\ne. Optional provision of printed photographs, albums, or other products if separately agreed in writing.",
    proofGalleryDays: "[__ business days]",
    finalDeliveryDays: "[__ business days]",
    artisticStyleNote:
      "The Client acknowledges that the Photographer’s work is subjective and agrees to accept the Photographer’s judgment regarding style, artistic composition, and image selection as final.",

    totalFee: "$[Total Fee]",
    deposit: "$[Deposit]",
    balanceDueDaysBeforeEvent: "[__ days]",
    overtimeRate: "$[rate]/hour",
    overtimePaymentDays: "[__ days]",
    expensesNote:
      "The Client shall reimburse the Photographer for reasonable out-of-pocket expenses (e.g., travel, accommodation, parking, permits), provided such expenses are pre-approved in writing.",

    breachCureDays: "[__ days]",
    cancelMoreThanDays: "[__ days]",
    cancelWithinDays: "[__ days]",
    cancelWithinPercent: "[__%]",
    rescheduleNote: "The Photographer will make reasonable efforts to accommodate event rescheduling, subject to availability.",

    copyrightNote:
      "All photographs created by the Photographer are the intellectual property of the Photographer and are protected under U.S. copyright law.",
    clientLicenseNote:
      "Upon full payment, the Photographer grants the Client a non-exclusive, non-transferable, perpetual license to use the delivered images for personal purposes, including printing, sharing with family and friends, and posting on personal social media.",
    restrictionsNote:
      "The Client may not sell, license, or otherwise commercially exploit the images without the Photographer’s prior written consent.",
    portfolioRightsNote:
      "The Photographer retains the right to use images for promotional, advertising, and portfolio purposes unless the Client provides a written request to withhold such use.",

    forceMajeureNote:
      "Neither Party shall be liable for failure or delay in performance caused by circumstances beyond reasonable control, including acts of God, epidemics, war, civil unrest, natural disasters, strikes, or governmental restrictions. The affected Party shall promptly notify the other Party and use reasonable efforts to mitigate the delay.",
    disputeMediationState: "[State for mediation]",
    entireAgreementNote:
      "This Agreement contains the entire understanding between the Parties and supersedes all prior agreements or understandings, whether oral or written.",
    severabilityNote:
      "If any provision is held invalid, the remainder shall remain enforceable, and the invalid provision shall be modified to best reflect the Parties’ intent.",
    amendmentsNote: "No amendment shall be valid unless in writing and signed by both Parties.",
    governingLaw: "State of [Insert State]",
    noticesNote:
      "All notices under this Agreement shall be in writing and delivered in person, by certified mail, or by email with confirmation of receipt.",
    waiverNote: "Failure to enforce any provision shall not constitute a waiver of any subsequent breach or default.",
    assignmentNote: "Neither Party may assign rights or obligations under this Agreement without the prior written consent of the other Party.",

    clientSignName: "",
    clientSignDate: "",
    photographerSignName: "",
    photographerSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line) => {
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

    // === EVENT PHOTOGRAPHY AGREEMENT ===
    addText("EVENT PHOTOGRAPHY AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Event Photography Agreement (“Agreement”) is made and entered into as of the ${formData.effectiveDate || "___ day of ________"}, by and between:`
    );
    addText(`Photographer: ${formData.photographerName || "____________________________"}, of ${formData.photographerAddress || "____________________________"} (“Photographer”)`);
    addText("and");
    addText(`Client: ${formData.clientName || "____________________________"}, of ${formData.clientAddress || "____________________________"} (“Client”)`);
    addText("The Photographer and Client may be referred to individually as a “Party” and collectively as the “Parties.”");
    addText("\n");

    addText("1. RECITALS", 12, true);
    addText("WHEREAS, the Client desires to engage the Photographer to provide professional event photography services for the event described herein, and the Photographer is willing to provide such services under the terms and conditions set forth in this Agreement;");
    addText("NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:");
    addText("\n");

    addText("2. DESCRIPTION OF SERVICES", 12, true);
    addText("2.1 Event Details");
    addText(`• Event Name/Description: ${formData.eventName || "___________________________________"}`);
    addText(`• Event Date: ${formData.eventDate || "___________________________________"}`);
    addText(`• Event Time: ${formData.eventTime || "___________________________________"}`);
    addText(`• Event Location: ${formData.eventLocation || "___________________________________"}`);
    addText("\n2.2 Scope of Work");
    addText(formData.scopeOfWork);
    addText("\n");

    addText("3. PERFORMANCE OF SERVICES", 12, true);
    addText("3.1 The Photographer shall:");
    addText("a. Capture images in accordance with the Client’s reasonable instructions, while retaining full artistic discretion in style, composition, and technique;");
    addText("b. Utilize professional-grade photography equipment and industry-standard post-processing methods;");
    addText("c. Apply color correction, cropping, and light retouching to the final selection of images;");
    addText(`d. Provide the Client with a digital proof gallery or lookbook within ${formData.proofGalleryDays || "[__ business days]"} following the event;`);
    addText(`e. Deliver final edited images within ${formData.finalDeliveryDays || "[__ business days]"} following proof approval, unless otherwise agreed.`);
    addText("\n3.2 Artistic Style");
    addText(formData.artisticStyleNote);
    addText("\n");

    addText("4. FEES, PAYMENTS, AND EXPENSES", 12, true);
    addText(`4.1 Total Fee: The Client agrees to pay the Photographer a total fee of ${formData.totalFee || "$__________"} (“Fee”) for the Services rendered under this Agreement.`);
    addText(`4.2 Deposit: A non-refundable deposit of ${formData.deposit || "$__________"} is due upon execution of this Agreement to secure the Photographer’s availability for the event date.`);
    addText(`4.3 Balance Payment: The remaining balance shall be due no later than ${formData.balanceDueDaysBeforeEvent || "____ days"} before the event date.`);
    addText(`4.4 Additional Charges: Any additional hours requested by the Client on the day of the event will be billed at the rate of ${formData.overtimeRate || "$__________ per hour"}, payable within ${formData.overtimePaymentDays || "____ days"} after the event.`);
    addText(`4.5 Expenses: ${formData.expensesNote}`);
    addText("\n");

    addText("5. REMEDIES FOR BREACH", 12, true);
    addText(`5.1 In the event either Party materially breaches this Agreement, the non-breaching Party shall provide written notice detailing the nature of the breach.`);
    addText(`5.2 The breaching Party shall have ${formData.breachCureDays || "____ days"} from receipt of notice to cure the breach.`);
    addText("5.3 If the breach is not cured within the specified period, the non-breaching Party may terminate this Agreement and pursue all remedies available at law or in equity.");
    addText("\n");

    addText("6. CANCELLATION AND RESCHEDULING", 12, true);
    addText(`6.1 If the Client cancels the event more than ${formData.cancelMoreThanDays || "____ days"} before the event date, the deposit shall be retained by the Photographer as liquidated damages.`);
    addText(`6.2 If cancellation occurs within ${formData.cancelWithinDays || "____ days"} of the event date, the Client shall be liable for ${formData.cancelWithinPercent || "____%"} of the total Fee.`);
    addText(`6.3 ${formData.rescheduleNote}`);
    addText("\n");

    addText("7. COPYRIGHT AND USAGE RIGHTS", 12, true);
    addText(formData.copyrightNote);
    addText(formData.clientLicenseNote);
    addText(formData.restrictionsNote);
    addText(formData.portfolioRightsNote);
    addText("\n");

    addText("8. FORCE MAJEURE", 12, true);
    addText(formData.forceMajeureNote);
    addText("\n");

    addText("9. DISPUTE RESOLUTION", 12, true);
    addText("9.1 The Parties shall attempt to resolve disputes amicably through good faith negotiation.");
    addText(`9.2 If unresolved, disputes shall be submitted to mediation in the State of ${formData.disputeMediationState || "__________"} in accordance with applicable mediation rules.`);
    addText("9.3 If mediation fails, the Parties may pursue any remedies available in court, subject to the governing law provision herein.");
    addText("\n");

    addText("10. MISCELLANEOUS PROVISIONS", 12, true);
    addText(`10.1 Entire Agreement – ${formData.entireAgreementNote}`);
    addText(`10.2 Severability – ${formData.severabilityNote}`);
    addText(`10.3 Amendments – ${formData.amendmentsNote}`);
    addText(`10.4 Governing Law – ${formData.governingLaw}`);
    addText(`10.5 Notices – ${formData.noticesNote}`);
    addText(`10.6 Waiver – ${formData.waiverNote}`);
    addText(`10.7 Assignment – ${formData.assignmentNote}`);
    addText("\n");

    addText("11. SIGNATURES", 12, true);
    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first written above.");
    addText("\nCLIENT:");
    addText(`Signature: ${formData.clientSignName ? "___________________________" : "___________________________"}`);
    addText(`Name: ${formData.clientSignName || "____________________________"}`);
    addText(`Date: ${formData.clientSignDate || "_____________________________"}`);
    addText("\nPHOTOGRAPHER:");
    addText(`Signature: ${formData.photographerSignName ? "___________________________" : "___________________________"}`);
    addText(`Name: ${formData.photographerSignName || "____________________________"}`);
    addText(`Date: ${formData.photographerSignDate || "_____________________________"}`);

    // Save
    doc.save("Event_Photography_Agreement.pdf");
    setPdfGenerated(true);
    setStep(7);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Basic Info & Parties</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Photographer Name</Label>
              <Input name="photographerName" value={formData.photographerName} onChange={handleChange} />
              <Label>Photographer Address</Label>
              <Input name="photographerAddress" value={formData.photographerAddress} onChange={handleChange} />
              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Event Details</h3>
              <Label>Event Name / Description</Label>
              <Input name="eventName" value={formData.eventName} onChange={handleChange} />
              <Label>Event Date</Label>
              <Input name="eventDate" value={formData.eventDate} onChange={handleChange} />
              <Label>Event Time</Label>
              <Input name="eventTime" value={formData.eventTime} onChange={handleChange} />
              <Label>Event Location</Label>
              <Input name="eventLocation" value={formData.eventLocation} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Scope & Performance</h3>
              <Label>Scope of Work</Label>
              <textarea name="scopeOfWork" value={formData.scopeOfWork} onChange={handleChange} className="w-full p-2 border rounded" rows={8} />
              <Label>Proof Gallery (business days)</Label>
              <Input name="proofGalleryDays" value={formData.proofGalleryDays} onChange={handleChange} />
              <Label>Final Delivery (business days)</Label>
              <Input name="finalDeliveryDays" value={formData.finalDeliveryDays} onChange={handleChange} />
              <Label>Artistic Style Note</Label>
              <textarea name="artisticStyleNote" value={formData.artisticStyleNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Fees & Payment</h3>
              <Label>Total Fee</Label>
              <Input name="totalFee" value={formData.totalFee} onChange={handleChange} />
              <Label>Deposit (non-refundable)</Label>
              <Input name="deposit" value={formData.deposit} onChange={handleChange} />
              <Label>Balance due (days before event)</Label>
              <Input name="balanceDueDaysBeforeEvent" value={formData.balanceDueDaysBeforeEvent} onChange={handleChange} />
              <Label>Overtime Rate (per hour)</Label>
              <Input name="overtimeRate" value={formData.overtimeRate} onChange={handleChange} />
              <Label>Overtime Payment Due (days)</Label>
              <Input name="overtimePaymentDays" value={formData.overtimePaymentDays} onChange={handleChange} />
              <Label>Expenses Note</Label>
              <textarea name="expensesNote" value={formData.expensesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Breach / Cancellation / Reschedule</h3>
              <Label>Breach Cure Days</Label>
              <Input name="breachCureDays" value={formData.breachCureDays} onChange={handleChange} />
              <Label>Cancel more than (days)</Label>
              <Input name="cancelMoreThanDays" value={formData.cancelMoreThanDays} onChange={handleChange} />
              <Label>Cancel within (days)</Label>
              <Input name="cancelWithinDays" value={formData.cancelWithinDays} onChange={handleChange} />
              <Label>Cancel within — Client liable (%)</Label>
              <Input name="cancelWithinPercent" value={formData.cancelWithinPercent} onChange={handleChange} />
              <Label>Reschedule Note</Label>
              <textarea name="rescheduleNote" value={formData.rescheduleNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Copyright & Usage</h3>
              <Label>Copyright Note</Label>
              <textarea name="copyrightNote" value={formData.copyrightNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Client License Note</Label>
              <textarea name="clientLicenseNote" value={formData.clientLicenseNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Restrictions Note</Label>
              <textarea name="restrictionsNote" value={formData.restrictionsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Portfolio Rights Note</Label>
              <textarea name="portfolioRightsNote" value={formData.portfolioRightsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate & Signatures</h3>
              <Label>Force Majeure Note</Label>
              <textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Dispute / Mediation State</Label>
              <Input name="disputeMediationState" value={formData.disputeMediationState} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notices Note</Label>
              <Input name="noticesNote" value={formData.noticesNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <Label>Assignment Note</Label>
              <Input name="assignmentNote" value={formData.assignmentNote} onChange={handleChange} />
              <DividerSpace />
              <Label>Client - Name (for signature)</Label>
              <Input name="clientSignName" value={formData.clientSignName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <Label>Photographer - Name (for signature)</Label>
              <Input name="photographerSignName" value={formData.photographerSignName} onChange={handleChange} />
              <Label>Photographer - Date</Label>
              <Input name="photographerSignDate" value={formData.photographerSignDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  // tiny visual divider component
  function DividerSpace() {
    return <div className="my-2 border-t" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>

        {step < 7 ? (
          <Button onClick={() => setStep((s) => Math.min(7, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 7 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Event Photography Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
