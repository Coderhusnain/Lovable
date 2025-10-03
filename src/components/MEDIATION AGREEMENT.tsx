import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { jsPDF } from "jspdf";
import { format } from "date-fns";

const MediationAgreementForm = () => {
  const [firstPartyName, setFirstPartyName] = useState<string>('');
  const [firstPartyAddress, setFirstPartyAddress] = useState<string>('');
  const [secondPartyName, setSecondPartyName] = useState<string>('');
  const [secondPartyAddress, setSecondPartyAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [businessContract, setBusinessContract] = useState<string>('');
  const [mediatorName, setMediatorName] = useState<string>('');
  const [jurisdiction, setJurisdiction] = useState<string>('');

 const handleGenerateAgreement = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const lineHeight = 7;
  let currentY = margin;

  // Function to add text with custom settings
  const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
    doc.setFontSize(fontSize);
    doc.setFont(undefined, isBold ? "bold" : "normal");
    const textWidth = pageWidth - margin * 2; // Adjust the width for margins
    const lines = doc.splitTextToSize(text, textWidth); // Split text if it's too long for the page width
    lines.forEach((line: string) => {
      if (currentY > 270) { // Check if we are near the bottom of the page
        doc.addPage();  // Create a new page if needed
        currentY = margin;  // Reset Y position for the new page
      }
      if (isCenter) { // For centered text
        const tw = doc.getStringUnitWidth(line) * fontSize / doc.internal.scaleFactor;
        const tx = (pageWidth - tw) / 2; // Calculate centered X position
        doc.text(line, tx, currentY);
      } else { // Default left-aligned text
        doc.text(line, margin, currentY);
      }
      currentY += lineHeight; // Move the Y position for the next line of text
    });
  };

  // Title
  addText("MEDIATION AGREEMENT", 16, true, true); // Centered title
  currentY += 6; // Add space after the title

  // Recitals Section
  addText(
    `This Mediation Agreement (“Agreement”) is made and entered into on ${date}, by and between:
    ${firstPartyName}, of ${firstPartyAddress}, and ${secondPartyName}, of ${secondPartyAddress},
    hereinafter collectively referred to as the “Parties” and individually as a “Party”.`
  );
  currentY += 4; // Space after recitals introduction

  addText("RECITALS", 12, true);
  addText(
    `WHEREAS, the Parties entered into a business relationship commencing on [Date of Relationship], pursuant to the terms of that certain contract titled "${businessContract}" (the “Original Contract”), attached hereto as Exhibit A and incorporated herein by reference;
    WHEREAS, disputes and differences have arisen between the Parties regarding the Original Contract;
    WHEREAS, the Parties recognize that litigation before a court of law is time-consuming, costly, and adversarial in nature; and
    WHEREAS, the Parties have mutually appointed ${mediatorName} as their mediator (the “Mediator”), who has accepted the appointment subject to disclosure of any actual or potential conflicts of interest.`
  );
  currentY += 4; // Space after recitals details

  addText("NOW, THEREFORE, in consideration of the foregoing recitals and the mutual covenants contained herein, the Parties agree as follows:", 12, true);
  currentY += 6;

  // Mediation Duties Section
  addText("I. DUTIES OF THE MEDIATOR", 12, true);
  addText(
    `1. Self-Determination of the Parties
    The Mediator shall conduct the mediation in accordance with the principle of party self-determination, whereby any settlement shall result from the voluntary, uncoerced, and informed decision of the Parties.
    2. Ex-Parte Communications
    The Mediator may, in their discretion, conduct private meetings or engage in separate communications with either Party and/or their representatives before, during, or after scheduled mediation sessions.
    3. Exchange of Information
    The Parties shall exchange all documents reasonably necessary for consideration of the dispute. The Mediator may request the submission of memoranda or additional information. Any materials intended to remain confidential may be submitted solely to the Mediator.
    4. Facilitation Role Only
    The Mediator has no authority to impose or issue a settlement. The Mediator’s role is limited to facilitating discussion and encouraging a mutually satisfactory resolution.
    5. No Decision-Making Authority
    The Mediator shall not serve as an arbitrator, adjudicator, or decision-maker and shall not provide legal representation to either Party.
    6. Continuing Efforts
    If a full settlement is not reached during the mediation conference, the Mediator may continue to communicate with the Parties in an effort to facilitate resolution.
    7. Scheduling
    The Mediator shall determine the date, time, and place of mediation sessions, and the Parties shall cooperate in good faith by attending as scheduled.
    8. Submission of Statements and Evidence
    The Mediator may direct the Parties to submit statements of claim, legal submissions, defenses, and supporting documents.
    9. Representation
    Each Party may appear with legal counsel duly authorized to negotiate and conclude a settlement. Any Party may elect to appear pro se (without representation).
    10. Confidentiality of Proceedings
    Mediation sessions and related communications shall be private and confidential. Attendance shall be limited to the Parties and their representatives, unless otherwise agreed by the Parties and approved by the Mediator.`
  );
  currentY += 4;

  // Confidentiality Section
  addText("II. CONFIDENTIALITY AND PRIVILEGE", 12, true);
  addText(
    `1. Confidential Nature of Mediation
    All oral and written communications made in the course of the mediation, including offers, admissions, statements, proposals, and documents exchanged, shall be strictly confidential.
    2. Inadmissibility in Subsequent Proceedings
    No mediation communications, whether oral or written, shall be admissible in any subsequent litigation, arbitration, or administrative proceeding, except to the extent necessary to enforce a settlement agreement reached as a result of the mediation.
    3. Mediator’s Protection
    The Mediator shall not be called as a witness in any judicial, arbitral, or administrative proceeding relating to the subject matter of the mediation. The Mediator shall have immunity from any subpoena or discovery process relating to the mediation.
    4. Exceptions
    Confidentiality shall not apply to:
    (i) communications necessary to prove the existence, validity, or terms of a settlement agreement reached in mediation;
    (ii) disclosures required by law, regulation, or court order; or
    (iii) information independently available to a Party outside the mediation process.`
  );
  currentY += 4;

  // Termination Section
  addText("III. TERMINATION", 12, true);
  addText(
    `The mediation shall be deemed terminated upon the earliest occurrence of any of the following:
    i. The execution of a written settlement agreement by the Parties;
    ii. A declaration by the Mediator, in writing or verbally, that further mediation efforts would not be productive;
    iii. A declaration by all Parties, in writing or verbally, that the mediation proceedings are terminated; or
    iv. A period of twenty-one (21) consecutive days following the conclusion of the last mediation session during which there has been no communication between the Mediator and any Party or Party’s representative.`
  );
  currentY += 4;

  // Signature Section
  addText("SIGNATURES", 12, true);
  addText("IN WITNESS WHEREOF, the Parties have executed this Mediation Agreement as of the Effective Date.");
  currentY += 6;
  addText(`${firstPartyName}`);
  addText(`${date}`);
  currentY += 4;
  addText(`${secondPartyName}`);
  addText(`${date}`);
  currentY += 4;
  addText(`${mediatorName}`);
  addText(`${date}`);

  // Save the PDF
  doc.save("Mediation_Agreement.pdf");
};


  return (
    <div className="bg-gray-50 min-h-0 bg-white rounded-lg shadow-sm">
      <Card className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Mediation Agreement</CardTitle>
          <CardDescription>Complete the form below to generate a Mediation Agreement document.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="firstPartyName">First Party Name:</Label>
            <Input
              id="firstPartyName"
              value={firstPartyName}
              onChange={(e) => setFirstPartyName(e.target.value)}
              placeholder="Enter First Party Name"
            />
          </div>
          <div>
            <Label htmlFor="firstPartyAddress">First Party Address:</Label>
            <Textarea
              id="firstPartyAddress"
              value={firstPartyAddress}
              onChange={(e) => setFirstPartyAddress(e.target.value)}
              placeholder="Enter First Party Address"
            />
          </div>
          <div>
            <Label htmlFor="secondPartyName">Second Party Name:</Label>
            <Input
              id="secondPartyName"
              value={secondPartyName}
              onChange={(e) => setSecondPartyName(e.target.value)}
              placeholder="Enter Second Party Name"
            />
          </div>
          <div>
            <Label htmlFor="secondPartyAddress">Second Party Address:</Label>
            <Textarea
              id="secondPartyAddress"
              value={secondPartyAddress}
              onChange={(e) => setSecondPartyAddress(e.target.value)}
              placeholder="Enter Second Party Address"
            />
          </div>
          <div>
            <Label htmlFor="date">Date of Agreement:</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="businessContract">Business Contract Title:</Label>
            <Input
              id="businessContract"
              value={businessContract}
              onChange={(e) => setBusinessContract(e.target.value)}
              placeholder="Enter Business Contract Title"
            />
          </div>
          <div>
            <Label htmlFor="mediatorName">Mediator Name:</Label>
            <Input
              id="mediatorName"
              value={mediatorName}
              onChange={(e) => setMediatorName(e.target.value)}
              placeholder="Enter Mediator Name"
            />
          </div>
          <div>
            <Label htmlFor="jurisdiction">Jurisdiction:</Label>
            <Input
              id="jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              placeholder="Enter Jurisdiction"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateAgreement}
            disabled={!firstPartyName || !secondPartyName || !date || !businessContract || !mediatorName || !jurisdiction}
          >
            Generate Mediation Agreement
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MediationAgreementForm;
