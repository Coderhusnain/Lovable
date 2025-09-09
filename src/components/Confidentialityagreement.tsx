import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  ownerName: string;
  ownerAddress: string;
  recipientName: string;
  recipientAddress: string;
  confidentialInfo: string;
  obligationsRecipient: string;
  returnDestructionInfo: string;
  relationshipParties: string;
  noWarranty: string;
  noLicense: string;
  termSurvival: string;
  governingLawState: string;
  signatureOwner: string;
  signatureRecipient: string;
}

const ConfidentialityAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    ownerName: "",
    ownerAddress: "",
    recipientName: "",
    recipientAddress: "",
    confidentialInfo: "",
    obligationsRecipient: "",
    returnDestructionInfo: "",
    relationshipParties: "",
    noWarranty: "",
    noLicense: "",
    termSurvival: "",
    governingLawState: "",
    signatureOwner: "",
    signatureRecipient: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 14));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async () => {
    try {
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
      addText("CONFIDENTIALITY AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Confidentiality Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.ownerName || "[Owner Name]"}, of ${formData.ownerAddress || "[Owner Address]"} (“Owner” or “Disclosing Party”), and ${formData.recipientName || "[Recipient Name]"}, of ${formData.recipientAddress || "[Recipient Address]"} (“Recipient” or “Receiving Party”).`
      );
      currentY += 4;

      // Sections
      const sections: { title: string; content: string }[] = [
        {
          title: "1. DEFINITION OF CONFIDENTIAL INFORMATION",
          content: `Confidential Information includes, without limitation: ${formData.confidentialInfo || "[Insert Description]"}...`,
        },
        {
          title: "2. OBLIGATIONS OF THE RECIPIENT",
          content: `${formData.obligationsRecipient || "[Insert Obligations Description]"}...`,
        },
        {
          title: "3. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION",
          content: `${formData.returnDestructionInfo || "[Insert Return/Destruction Info Description]"}...`,
        },
        {
          title: "4. RELATIONSHIP OF THE PARTIES",
          content: `${formData.relationshipParties || "[Insert Relationship Info]"}...`,
        },
        {
          title: "5. NO WARRANTY",
          content: `${formData.noWarranty || "[Insert No Warranty Info]"}...`,
        },
        {
          title: "6. NO LICENSE",
          content: `${formData.noLicense || "[Insert No License Info]"}...`,
        },
        {
          title: "7. TERM AND SURVIVAL",
          content: `${formData.termSurvival || "[Insert Term/Survival Info]"}...`,
        },
        {
          title: "8. MISCELLANEOUS",
          content: `Miscellaneous provisions...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Signatures
      addText("OWNER (DISCLOSING PARTY):", 12, true);
      addText(`Signature: ${formData.signatureOwner || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 10;

      addText("RECIPIENT (RECEIVING PARTY):", 12, true);
      addText(`Signature: ${formData.signatureRecipient || "_________________________"}`);
      addText("Date: ___________________");
      currentY += 12;

      // Save the PDF
      doc.save("confidentiality-agreement.pdf");
      toast.success("Confidentiality Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Confidentiality Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Agreement Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="agreementDate">Agreement Date</Label>
              <Input
                id="agreementDate"
                type="date"
                value={formData.agreementDate}
                onChange={(e) => handleInputChange("agreementDate", e.target.value)}
              />
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
              />
              <Label htmlFor="ownerAddress">Owner Address</Label>
              <Textarea
                id="ownerAddress"
                value={formData.ownerAddress}
                onChange={(e) => handleInputChange("ownerAddress", e.target.value)}
              />
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleInputChange("recipientName", e.target.value)}
              />
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Definition of Confidential Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="confidentialInfo">Confidential Information</Label>
              <Textarea
                id="confidentialInfo"
                value={formData.confidentialInfo}
                onChange={(e) => handleInputChange("confidentialInfo", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Obligations of the Recipient</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="obligationsRecipient">Obligations</Label>
              <Textarea
                id="obligationsRecipient"
                value={formData.obligationsRecipient}
                onChange={(e) => handleInputChange("obligationsRecipient", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Return or Destruction of Confidential Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="returnDestructionInfo">Return or Destruction</Label>
              <Textarea
                id="returnDestructionInfo"
                value={formData.returnDestructionInfo}
                onChange={(e) => handleInputChange("returnDestructionInfo", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Relationship of the Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="relationshipParties">Relationship</Label>
              <Textarea
                id="relationshipParties"
                value={formData.relationshipParties}
                onChange={(e) => handleInputChange("relationshipParties", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>No Warranty</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="noWarranty">No Warranty</Label>
              <Textarea
                id="noWarranty"
                value={formData.noWarranty}
                onChange={(e) => handleInputChange("noWarranty", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>No License</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="noLicense">No License</Label>
              <Textarea
                id="noLicense"
                value={formData.noLicense}
                onChange={(e) => handleInputChange("noLicense", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Term and Survival</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="termSurvival">Term and Survival</Label>
              <Textarea
                id="termSurvival"
                value={formData.termSurvival}
                onChange={(e) => handleInputChange("termSurvival", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 9:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Miscellaneous</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="miscellaneous">Miscellaneous</Label>
              <Textarea
                id="miscellaneous"
                value={formData.miscellaneous}
                onChange={(e) => handleInputChange("miscellaneous", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 10:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Signatures</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="signatureOwner">Owner Signature</Label>
              <Input
                id="signatureOwner"
                value={formData.signatureOwner}
                onChange={(e) => handleInputChange("signatureOwner", e.target.value)}
              />
              <Label htmlFor="signatureRecipient">Recipient Signature</Label>
              <Input
                id="signatureRecipient"
                value={formData.signatureRecipient}
                onChange={(e) => handleInputChange("signatureRecipient", e.target.value)}
              />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Confidentiality Agreement</h1>
        <p className="text-gray-600">Create a Confidentiality Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 14</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 14) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 14 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF}>Generate PDF</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfidentialityAgreementForm;
