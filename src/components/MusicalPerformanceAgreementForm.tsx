import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  clientName: string;
  clientAddress: string;
  musicianName: string;
  musicianAddress: string;
  effectiveDate: string;
  eventDate: string;
  eventLocation: string;
  startTime: string;
  endTime: string;
  servicesDescription: string;
  equipmentProvided: string;
  arrivalTimeRequirement: string;
  depositAmount: string;
  balanceDueOn: string;
  cancellationNoticePeriod: string;
  refundDays: string;
  forceMajeureClause: string;
  disputeResolution: string;
  jurisdiction: string;
  arbitrationInstitution: string;
  signClientName: string;
  signClientDate: string;
  signMusicianName: string;
  signMusicianDate: string;
}

export default function MusicalPerformanceAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientAddress: "",
    musicianName: "",
    musicianAddress: "",
    effectiveDate: "",
    eventDate: "",
    eventLocation: "",
    startTime: "",
    endTime: "",
    servicesDescription: "Live musical performance as agreed; repertoire subject to mutual approval.",
    equipmentProvided: "Musician will provide microphones, PA system and related equipment unless otherwise agreed.",
    arrivalTimeRequirement: "01:00", // 1 hour default
    depositAmount: "",
    balanceDueOn: "Upon completion",
    cancellationNoticePeriod: "30",
    refundDays: "14",
    forceMajeureClause: "Standard force majeure applies (acts of God, pandemic, government restrictions, strikes).",
    disputeResolution: "Negotiation -> Mediation -> Arbitration",
    jurisdiction: "",
    arbitrationInstitution: "",
    signClientName: "",
    signClientDate: "",
    signMusicianName: "",
    signMusicianDate: "",
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
        y += size * 1.35;
      });
    };

    write("MUSICAL PERFORMANCE AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Musical Performance Agreement (the “Agreement”) is made and entered into as of ${
        formData.effectiveDate || "[Effective Date]"
      } (the “Effective Date”), by and between ${
        formData.clientName || "[Client Name]"
      }, of ${formData.clientAddress || "[Client Address]"} (the "Client"), and ${
        formData.musicianName || "[Musician Name]"
      }, of ${formData.musicianAddress || "[Musician Address]"} (the "Musician").`,
    );

    write("\n");
    write("1. DESCRIPTION OF SERVICES", 12, true);
    write(`Event Date: ${formData.eventDate || "[Event Date]"}`);
    write(`Event Location: ${formData.eventLocation || "[Event Location]"}`);
    write(`Start / End Time: ${formData.startTime || "[Start]"} - ${formData.endTime || "[End]"}`);
    write("Services to be provided:");
    write(formData.servicesDescription || "");
    write("Equipment and setup:");
    write(formData.equipmentProvided || "");

    write("\n");
    write("2. PERFORMANCE OBLIGATIONS OF THE MUSICIAN", 12, true);
    write(`Arrival / setup requirement: Musician will arrive at least ${formData.arrivalTimeRequirement || "[hours]"} prior to start time for setup and soundcheck.`);
    write("Musician will provide professional performance and reasonable cooperation with event logistics.");

    write("\n");
    write("3. DEPOSIT AND FEES", 12, true);
    write(`Deposit (non-refundable): ${formData.depositAmount || "[Deposit Amount]"}`);
    write(`Balance payment terms: ${formData.balanceDueOn || "Upon completion"}`);

    write("\n");
    write("4. CANCELLATION POLICY", 12, true);
    write(`Notice required from Client to cancel without further liability: ${formData.cancellationNoticePeriod || "[days]"} days.`);
    write(`If Musician cancels, refunds will be made within ${formData.refundDays || "[days]"} business days, less any non-recoverable costs.`);

    write("\n");
    write("5. TERM", 12, true);
    write("This Agreement shall be effective as of the Effective Date and shall remain in force for the event date and completion of Services.");

    write("\n");
    write("6. RELATIONSHIP", 12, true);
    write("The Musician performs as an independent contractor. Nothing herein creates an employment relationship.");

    write("\n");
    write("7. INDEMNIFICATION", 12, true);
    write("Each Party shall indemnify the other to the extent provided in the Agreement for acts or omissions arising from its performance.");

    write("\n");
    write("8. FORCE MAJEURE", 12, true);
    write(formData.forceMajeureClause || "");

    write("\n");
    write("9. DISPUTE RESOLUTION", 12, true);
    write(formData.disputeResolution || "Negotiation -> Mediation -> Arbitration");
    write(`Arbitration Institution / Rules: ${formData.arbitrationInstitution || "[Institution or rules]"}`);

    write("\n");
    write("10. ENTIRE AGREEMENT", 12, true);
    write("This Agreement contains the entire understanding between the Parties relating to the subject matter hereof.");

    write("\n");
    write("11. MISCELLANEOUS", 12, true);
    write(`Governing law / jurisdiction: ${formData.jurisdiction || "[State/Country]"}`);

    write("\n");
    write("SIGNATURES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the dates set forth below:");
    write(`Client: ${formData.signClientName || "[Client Name]"}`);
    write(`Date: ${formData.signClientDate || "________________"}`);
    write(`Musician: ${formData.signMusicianName || "[Musician Name]"}`);
    write(`Date: ${formData.signMusicianDate || "________________"}`);

    doc.save("Musical_Performance_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Event Details</h3>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />

              <Label>Client Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label>Musician Name</Label>
              <Input name="musicianName" value={formData.musicianName} onChange={handleChange} />

              <Label>Musician Address</Label>
              <Textarea name="musicianAddress" value={formData.musicianAddress} onChange={handleChange} />

              <Label>Event Date</Label>
              <Input name="eventDate" value={formData.eventDate} onChange={handleChange} />

              <Label>Event Location</Label>
              <Input name="eventLocation" value={formData.eventLocation} onChange={handleChange} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start Time</Label>
                  <Input name="startTime" value={formData.startTime} onChange={handleChange} />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input name="endTime" value={formData.endTime} onChange={handleChange} />
                </div>
              </div>

              <Label>Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />

              <Label>Equipment Provided</Label>
              <Textarea name="equipmentProvided" value={formData.equipmentProvided} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment, Cancellation & Legal</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Deposit Amount</Label>
                  <Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} />
                </div>
                <div>
                  <Label>Balance Due On</Label>
                  <Input name="balanceDueOn" value={formData.balanceDueOn} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Cancellation Notice (days)</Label>
                  <Input name="cancellationNoticePeriod" value={formData.cancellationNoticePeriod} onChange={handleChange} />
                </div>
                <div>
                  <Label>Refund Days (if Musician cancels)</Label>
                  <Input name="refundDays" value={formData.refundDays} onChange={handleChange} />
                </div>
              </div>

              <Label>Arrival / Setup Requirement (hours before start)</Label>
              <Input name="arrivalTimeRequirement" value={formData.arrivalTimeRequirement} onChange={handleChange} />

              <Label>Force Majeure Clause</Label>
              <Textarea name="forceMajeureClause" value={formData.forceMajeureClause} onChange={handleChange} />

              <Label>Dispute Resolution (short)</Label>
              <Input name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} />

              <Label>Arbitration Institution / Rules</Label>
              <Input name="arbitrationInstitution" value={formData.arbitrationInstitution} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>

              <Label>Client - Signatory Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />

              <Label>Musician - Signatory Name</Label>
              <Input name="signMusicianName" value={formData.signMusicianName} onChange={handleChange} />
              <Label>Musician - Date</Label>
              <Input name="signMusicianDate" value={formData.signMusicianDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Musical Performance Agreement PDF generated.</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
