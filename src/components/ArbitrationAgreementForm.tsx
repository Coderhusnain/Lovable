import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function ArbitrationAgreementForm() {
  const [step, setStep] = useState(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    firstParty: "",
    secondParty: "",
    secondPartyAddress: "",
    businessRelationshipDate: "",
    originalContractTitle: "",
    arbitratorName: "",
    arbitrationLocation: "",
    firstPartyName: "",
    firstPartyTitle: "",
    firstPartyDate: "",
    secondPartyName: "",
    secondPartyTitle: "",
    secondPartyDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;
    const addLine = (
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


    addLine("Arbitration Agreement", 14, true, true);
    addLine(`This Arbitration Agreement (the \"Agreement\") is made and entered into on ${formData.date}, by and between:`);
    addLine(`• ${formData.firstParty}, hereinafter referred to as the \"First Party\"; and`);
    addLine(`• ${formData.secondParty}, of ${formData.secondPartyAddress}, hereinafter referred to as the \"Second Party\".`);

    addLine("");
    addLine("Recitals");
    addLine(`WHEREAS, the Parties entered into a business relationship on or about ${formData.businessRelationshipDate}, as defined in the original business contract titled *${formData.originalContractTitle}*, which is attached hereto and incorporated herein by reference;`);
    addLine("WHEREAS, disputes and differences have arisen between the Parties under said business relationship;");
    addLine("WHEREAS, the Parties acknowledge that litigation in court is costly, time-consuming, and may not serve their mutual interests;");
    addLine(`WHEREAS, the Parties have agreed to resolve such disputes through arbitration, and have appointed ${formData.arbitratorName} as arbitrator.`);

    addLine("");
    addLine("Agreement");
    addLine("NOW, THEREFORE, in consideration of the foregoing recitals, which are hereby incorporated into this Agreement, and the mutual covenants herein contained, the Parties agree as follows:");
    addLine("1. Submission to Arbitration");
    addLine("The Parties agree that any disputes, claims, or controversies arising out of or relating to the original business contract or this Agreement shall be resolved exclusively by binding arbitration, and the Parties hereby waive their right to pursue such matters through litigation in court.");
    addLine("2. Governing Arbitration Rules");
    addLine("All arbitration proceedings shall be conducted in accordance with the Commercial Arbitration Rules of the American Arbitration Association (\"AAA\"), which the Parties expressly agree to follow.");
    addLine("3. Location of Arbitration");
    addLine(`Arbitration shall take place in ${formData.arbitrationLocation}, unless otherwise mutually agreed in writing by the Parties.`);
    addLine("4. Selection of Arbitrator");
    addLine("The arbitrator shall be mutually selected by the Parties in accordance with the AAA Commercial Arbitration Rules.");
    addLine("5. Award and Enforcement");
    addLine("(a) The arbitrator shall issue a written decision and award.");
    addLine("(b) The award shall be final, binding, and enforceable upon the Parties.");
    addLine("(c) Any such award may be confirmed and enforced in a court of competent jurisdiction.");
    addLine("6. Costs and Fees");
    addLine("Unless otherwise agreed, the costs of arbitration shall be borne as directed by the arbitrator in the final award.");

    addLine("");
    addLine("Execution");

    addLine("IN WITNESS WHEREOF, the Parties hereto have executed this Arbitration Agreement as of the date first written above.");

    addLine("First Party");
    addLine(`Name: ${formData.firstPartyName}`);
    addLine(`Title: ${formData.firstPartyTitle}`);
    addLine(`Date: ${formData.firstPartyDate}`);

    addLine("Second Party");
    addLine(`Name: ${formData.secondPartyName}`);
    addLine(`Title: ${formData.secondPartyTitle}`);
    addLine(`Date: ${formData.secondPartyDate}`);

    doc.save("Arbitration_Agreement.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader><CardTitle>Parties Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Date</Label>
                <Input name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div>
                <Label>First Party</Label>
                <Input name="firstParty" value={formData.firstParty} onChange={handleChange} />
              </div>
              <div>
                <Label>Second Party</Label>
                <Input name="secondParty" value={formData.secondParty} onChange={handleChange} />
              </div>
              <div>
                <Label>Second Party Address</Label>
                <Input name="secondPartyAddress" value={formData.secondPartyAddress} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader><CardTitle>Business Contract Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Business Relationship Date</Label>
                <Input name="businessRelationshipDate" value={formData.businessRelationshipDate} onChange={handleChange} />
              </div>
              <div>
                <Label>Original Contract Title</Label>
                <Input name="originalContractTitle" value={formData.originalContractTitle} onChange={handleChange} />
              </div>
              <div>
                <Label>Arbitrator Name</Label>
                <Input name="arbitratorName" value={formData.arbitratorName} onChange={handleChange} />
              </div>
              <div>
                <Label>Arbitration Location</Label>
                <Input name="arbitrationLocation" value={formData.arbitrationLocation} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader><CardTitle>Execution Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>First Party Name</Label>
                <Input name="firstPartyName" value={formData.firstPartyName} onChange={handleChange} />
              </div>
              <div>
                <Label>First Party Title</Label>
                <Input name="firstPartyTitle" value={formData.firstPartyTitle} onChange={handleChange} />
              </div>
              <div>
                <Label>First Party Date</Label>
                <Input name="firstPartyDate" value={formData.firstPartyDate} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader><CardTitle>Second Party Execution</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Second Party Name</Label>
                <Input name="secondPartyName" value={formData.secondPartyName} onChange={handleChange} />
              </div>
              <div>
                <Label>Second Party Title</Label>
                <Input name="secondPartyTitle" value={formData.secondPartyTitle} onChange={handleChange} />
              </div>
              <div>
                <Label>Second Party Date</Label>
                <Input name="secondPartyDate" value={formData.secondPartyDate} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardContent>
              <div className="text-green-600 font-bold text-center text-lg pt-5">
                PDF Generated Successfully!
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
  <div className="max-w-2xl mx-auto py-10 space-y-6">
    {renderStep()}

    {step < 5 && (
      <div className="flex justify-between pt-4">
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}

        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>
            Next
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>
    )}
  </div>
)
};
