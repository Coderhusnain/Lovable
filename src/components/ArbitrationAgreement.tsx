import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";

const ArbitrationAgreementForm = () => {
  const [firstPartyName, setFirstPartyName] = useState<string>('');
  const [secondPartyName, setSecondPartyName] = useState<string>('');
  const [secondPartyAddress, setSecondPartyAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [businessContract, setBusinessContract] = useState<string>('');
  const [arbitratorName, setArbitratorName] = useState<string>('');
  const [arbitrationLocation, setArbitrationLocation] = useState<string>('');

 const generatePDF = async () => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20; // Set margin for the page
    const lineHeight = 7; // Set line height for spacing between lines
    let currentY = margin; // Initial Y position for text

    // Function to add text with custom settings
    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2; // Text width considering margins
      const lines = doc.splitTextToSize(text, textWidth); // Split text to fit within page width
      lines.forEach((line: string) => {
        if (currentY > 270) { // If we are near the bottom of the page, add a new page
          doc.addPage();
          currentY = margin; // Reset Y position for the new page
        }
        if (isCenter) { // For centered text
          const tw = doc.getStringUnitWidth(line) * fontSize / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2; // Calculate centered X position
          doc.text(line, tx, currentY);
        } else { // Left-aligned text by default
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight; // Move the Y position down for the next line
      });
    };

    // Title
    addText("ARBITRATION AGREEMENT", 16, true, true); // Bold and centered title
    currentY += 6; // Add extra space after the title

    // Agreement Introduction
    addText(
      `This Arbitration Agreement (“Agreement”) is made and entered into on ${date}, by and between:
      • ${firstPartyName}, hereinafter referred to as the “First Party”; and
      • ${secondPartyName}, of ${secondPartyAddress}, hereinafter referred to as the “Second Party”.`
    );
    currentY += 4; // Add space after the introduction

    // Recitals Section
    addText("RECITALS", 12, true); // Bold "RECITALS"
    addText(
      `WHEREAS, the Parties entered into a business relationship on or about [Date of Relationship], pursuant to the terms of that certain contract titled "${businessContract}" (the “Original Contract”), attached hereto as Exhibit A and incorporated herein by reference;
      WHEREAS, disputes and differences have arisen between the Parties under said business relationship;
      WHEREAS, the Parties acknowledge that litigation in court is costly, time-consuming, and may not serve their mutual interests; and
      WHEREAS, the Parties have agreed to resolve such disputes through arbitration, and have appointed ${arbitratorName} as arbitrator.`
    );
    currentY += 4; // Add space after recitals details

    // Agreement Section
    addText("Agreement", 12, true);
    addText(
      `1. Submission to Arbitration
      The Parties agree that any disputes, claims, or controversies arising out of or relating to the original business contract or this Agreement shall be resolved exclusively by binding arbitration, and the Parties hereby waive their right to pursue such matters through litigation in court.

      2. Governing Arbitration Rules
      All arbitration proceedings shall be conducted in accordance with the Commercial Arbitration Rules of the American Arbitration Association (“AAA”), which the Parties expressly agree to follow.

      3. Location of Arbitration
      Arbitration shall take place in ${arbitrationLocation}, unless otherwise mutually agreed in writing by the Parties.

      4. Selection of Arbitrator
      The arbitrator shall be mutually selected by the Parties in accordance with the AAA Commercial Arbitration Rules.

      5. Award and Enforcement
      (a) The arbitrator shall issue a written decision and award.
      (b) The award shall be final, binding, and enforceable upon the Parties.
      (c) Any such award may be confirmed and enforced in a court of competent jurisdiction.

      6. Costs and Fees
      Unless otherwise agreed, the costs of arbitration shall be borne as directed by the arbitrator in the final award.

      Execution
      IN WITNESS WHEREOF, the Parties hereto have executed this Arbitration Agreement as of the date first written above.

      First Party
      Name: ${firstPartyName}
      Title: ${businessContract}
      Date: ${date}

      Second Party
      Name: ${secondPartyName}
      Title: ${businessContract}
      Date: ${date}`
    );
    currentY += 6; // Add space after the agreement section

    // Save the PDF
    doc.save("Arbitration_Agreement.pdf");
    toast.success("Arbitration Agreement PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate Arbitration Agreement PDF");
  }
};


  return (
    <div className="bg-gray-50 min-h-0 bg-white rounded-lg shadow-sm">
      <Card className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Arbitration Agreement</CardTitle>
          <CardDescription>Complete the form below to generate an Arbitration Agreement document.</CardDescription>
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
            <Label htmlFor="arbitratorName">Arbitrator Name:</Label>
            <Input
              id="arbitratorName"
              value={arbitratorName}
              onChange={(e) => setArbitratorName(e.target.value)}
              placeholder="Enter Arbitrator Name"
            />
          </div>
          <div>
            <Label htmlFor="arbitrationLocation">Location of Arbitration:</Label>
            <Input
              id="arbitrationLocation"
              value={arbitrationLocation}
              onChange={(e) => setArbitrationLocation(e.target.value)}
              placeholder="Enter Arbitration Location"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generatePDF}
            disabled={!firstPartyName || !secondPartyName || !date || !businessContract || !arbitratorName || !arbitrationLocation}
          >
            Generate Arbitration Agreement
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArbitrationAgreementForm;
