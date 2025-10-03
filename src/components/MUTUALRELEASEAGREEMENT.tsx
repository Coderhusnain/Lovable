import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

interface FormData {
  agreementDate: string;
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  underlyingContract: string;
  paymentA: string;
  paymentB: string;
  governingLawState: string;
  signaturePartyA: string;
  signaturePartyB: string;
}

const MutualReleaseForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    partyAName: "",
    partyAAddress: "",
    partyBName: "",
    partyBAddress: "",
    underlyingContract: "",
    paymentA: "",
    paymentB: "",
    governingLawState: "",
    signaturePartyA: "",
    signaturePartyB: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > 270) {
          doc.addPage();
          currentY = margin;
        }
        if (isCenter) {
          const tw = doc.getStringUnitWidth(line) * fontSize / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // Title
    addText("MUTUAL RELEASE AGREEMENT", 16, true, true);
    currentY += 6;

    // Agreement Content
    addText(
      `This Mutual Release Agreement (the “Agreement”) is entered into as of ${formData.agreementDate}, by and between:
      • ${formData.partyAName}, and
      • ${formData.partyBName},
      (each a “Party” and collectively, the “Parties”).`
    );
    currentY += 4;

    // Purpose Section
    addText("Purpose", 12, true);
    addText(
      `The purpose of this Agreement is to effect the full and final settlement of all disputes, obligations, and liabilities between the Parties, and to terminate any obligations owed by either Party to the other in connection with the matters described herein.`
    );
    currentY += 6;

    // Recitals Section
    addText("Recitals", 12, true);
    addText(
      `WHEREAS, disputes and differences have arisen between the Parties relating to that certain agreement dated ${formData.agreementDate}, a copy of which is attached hereto as Exhibit A (the “Underlying Contract”);
      WHEREAS, the Parties desire to fully and finally resolve said disputes and differences, without admission of liability, by executing this Mutual Release;
      WHEREAS, in consideration of this Mutual Release and additional consideration, including the payment of $${formData.paymentA} by ${formData.partyAName} to ${formData.partyBName}, receipt of which is hereby acknowledged, and the payment of $${formData.paymentB} by ${formData.partyBName} to ${formData.partyAName}, receipt of which is hereby acknowledged, each Party wishes to release and discharge the other Party from all claims and liabilities arising from the Underlying Contract;
      WHEREAS, the Parties desire to provide mutual releases, and in some instances indemnification, on the terms and conditions set forth herein.`
    );
    currentY += 6;

    // Release Section
    addText("1. Mutual Release", 12, true);
    addText(
      `1.1 Release by ${formData.partyAName}.
      ${formData.partyAName} does hereby release, cancel, forgive, and forever discharge ${formData.partyBName}, together with its predecessors, parent corporations, holding companies, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.

      1.2 Release by ${formData.partyBName}.
      ${formData.partyBName} does hereby release, cancel, forgive, and forever discharge ${formData.partyAName}, together with its subsidiaries, affiliates, divisions, heirs, successors, and assigns, in all capacities including as officers, directors, employees, representatives, agents, or shareholders, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.

      1.3 Waiver of Unknown Claims.
      Each Party acknowledges that it has been advised of, and expressly waives, the provisions of any law which would otherwise limit the scope of this Release to matters known or suspected at the time of execution.`
    );
    currentY += 6;

    // Governing Law Section
    addText("2. Governing Law", 12, true);
    addText(`This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingLawState}.`);
    currentY += 4;

    // Legal Construction Section
    addText("3. Legal Construction", 12, true);
    addText(
      `If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be deemed severed, and the remaining provisions shall remain valid and enforceable. This Agreement shall be construed as a whole and not as severable obligations.`
    );
    currentY += 6;

    // Attorneys' Fees Section
    addText("4. Attorneys’ Fees", 12, true);
    addText(
      `If any action or proceeding is brought to enforce or interpret the provisions of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys’ fees and costs, in addition to any other relief to which it may be entitled.`
    );
    currentY += 6;

    // Entire Agreement Section
    addText("5. Entire Agreement", 12, true);
    addText(`This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof, and supersedes all prior negotiations, representations, or agreements, whether written or oral.`);
    currentY += 6;

    // Execution Section
    addText("Execution", 12, true);
    addText(
      `IN WITNESS WHEREOF, the Parties hereto have executed this Mutual Release Agreement as of the date first written above.

      Party A
      Name: ${formData.partyAName}
      Title: ___________________________
      Date: ___________________________

      Party B
      Name: ${formData.partyBName}
      Title: ___________________________
      Date: ___________________________`
    );
    currentY += 12;

    // Save the PDF
    doc.save("mutual-release-agreement.pdf");
    toast.success("Mutual Release Agreement PDF generated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mutual Release Agreement</h1>
        <p className="text-gray-600">Create a Mutual Release Agreement and export as a PDF.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agreement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="agreementDate">Agreement Date</Label>
          <Input
            id="agreementDate"
            type="date"
            value={formData.agreementDate}
            onChange={(e) => handleInputChange("agreementDate", e.target.value)}
          />
          <Label htmlFor="partyAName">Party A Name</Label>
          <Input
            id="partyAName"
            value={formData.partyAName}
            onChange={(e) => handleInputChange("partyAName", e.target.value)}
          />
          <Label htmlFor="partyAAddress">Party A Address</Label>
          <Textarea
            id="partyAAddress"
            value={formData.partyAAddress}
            onChange={(e) => handleInputChange("partyAAddress", e.target.value)}
          />
          <Label htmlFor="partyBName">Party B Name</Label>
          <Input
            id="partyBName"
            value={formData.partyBName}
            onChange={(e) => handleInputChange("partyBName", e.target.value)}
          />
          <Label htmlFor="partyBAddress">Party B Address</Label>
          <Textarea
            id="partyBAddress"
            value={formData.partyBAddress}
            onChange={(e) => handleInputChange("partyBAddress", e.target.value)}
          />
        </CardContent>
      </Card>

      <Button onClick={generatePDF}>Generate PDF</Button>
    </div>
  );
};

export default MutualReleaseForm;
