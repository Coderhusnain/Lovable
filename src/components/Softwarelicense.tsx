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
  licenseeName: string;
  licenseeAddress: string;
  licensorName: string;
  licensorAddress: string;
  startDate: string;
  endDate: string;
  licenseFee: string;
  terminationNotice: string;
  governingLaw: string;
  warrantyDisclaimer: string;
  maintenanceScope: string;
  technicalSupport: string;
  serviceLevel: string;
  disputeResolution: string;
  attorneysFees: string;
  amendments: string;
  notices: string;
  assignment: string;
  licensorNameSignature: string;
  licenseeNameSignature: string;
}

const SoftwareLicenseAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    licenseeName: "",
    licenseeAddress: "",
    licensorName: "",
    licensorAddress: "",
    startDate: "",
    endDate: "",
    licenseFee: "",
    terminationNotice: "",
    governingLaw: "",
    warrantyDisclaimer: "",
    maintenanceScope: "",
    technicalSupport: "",
    serviceLevel: "",
    disputeResolution: "",
    attorneysFees: "",
    amendments: "",
    notices: "",
    assignment: "",
    licensorNameSignature: "",
    licenseeNameSignature: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 18));
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
      addText("SOFTWARE LICENSE AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Software License Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.licenseeName || "[Licensee Name]"}, with its principal address at ${formData.licenseeAddress || "[Licensee Address]"} (“Licensee”), and ${formData.licensorName || "[Licensor Name]"}, with its principal place of business at ${formData.licensorAddress || "[Licensor Address]"} (“Licensor”).`
      );
      currentY += 4;

      // Sections (e.g., DEFINITIONS, GRANT OF LICENSE, etc.)
      const sections: { title: string; content: string }[] = [
        {
          title: "1. DEFINITIONS",
          content: `For purposes of this Agreement:\n(a) “Software” means the computer programs...`,
        },
        {
          title: "2. GRANT OF LICENSE",
          content: `Licensor hereby grants to Licensee a personal, non-exclusive, non-transferable license...`,
        },
        {
          title: "3. TERM OF LICENSE",
          content: `This License shall commence on the Effective Date and shall remain in force until terminated...`,
        },
        {
          title: "4. LICENSE FEE",
          content: `Licensee shall pay to Licensor the license fee specified in Schedule B...`,
        },
        {
          title: "5. TERMINATION",
          content: `Licensor may terminate this Agreement immediately upon written notice if Licensee breaches any material provision...`,
        },
        {
          title: "6. RETURN OR DESTRUCTION OF SOFTWARE",
          content: `Upon termination, Licensee shall immediately cease using the Software and return or destroy all copies...`,
        },
        {
          title: "7. TITLE AND OWNERSHIP",
          content: `The Software is licensed, not sold. All rights, title, and interest remain vested in Licensor...`,
        },
        {
          title: "8. MODIFICATIONS AND ENHANCEMENTS",
          content: `Licensee shall not reverse engineer, decompile, disassemble, adapt, translate...`,
        },
        {
          title: "9. WARRANTY DISCLAIMER",
          content: `The Software is provided “AS IS”, without any warranties, express or implied...`,
        },
        {
          title: "10. LIMITED REMEDIES",
          content: `At Licensor’s sole option, remedies for breach of warranty (if any) shall be limited to...`,
        },
        {
          title: "11. LIMITATION OF LIABILITY",
          content: `Neither party shall be liable for any indirect, incidental, special, or consequential damages...`,
        },
        {
          title: "12. CONFIDENTIALITY",
          content: `Licensee shall treat the Software and Licensor’s proprietary information as confidential...`,
        },
        {
          title: "13. MAINTENANCE & SUPPORT SERVICES",
          content: `Licensor shall provide maintenance and support services during the term of this Agreement...`,
        },
        {
          title: "14. DISPUTE RESOLUTION",
          content: `Any dispute shall be resolved through binding arbitration under the American Arbitration Association rules...`,
        },
        {
          title: "15. ATTORNEYS’ FEES",
          content: `The prevailing party in any action to enforce this Agreement shall be entitled to recover reasonable attorneys’ fees...`,
        },
        {
          title: "16. GENERAL PROVISIONS",
          content: `This Agreement constitutes the entire agreement between the parties...`,
        },
        {
          title: "17. ASSIGNMENT",
          content: `Licensee shall not assign or transfer this Agreement without Licensor’s prior written consent...`,
        },
        {
          title: "18. EXECUTION",
          content: `This Agreement may be executed in counterparts, each deemed an original...`,
        },
      ];

      for (const section of sections) {
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Licensor & Licensee Signatures
      addText("LICENSOR:", 12, true);
      addText(`By: ${formData.licensorNameSignature || "_________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 10;

      addText("LICENSEE:", 12, true);
      addText(`By: ${formData.licenseeNameSignature || "_________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 12;

      // Save the PDF
      doc.save("software-license-agreement.pdf");
      toast.success("Software License Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Software License Agreement PDF");
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
            <Label htmlFor="licenseeName">Licensee Name</Label>
            <Input
              id="licenseeName"
              value={formData.licenseeName}
              onChange={(e) => handleInputChange("licenseeName", e.target.value)}
            />
            <Label htmlFor="licenseeAddress">Licensee Address</Label>
            <Textarea
              id="licenseeAddress"
              value={formData.licenseeAddress}
              onChange={(e) => handleInputChange("licenseeAddress", e.target.value)}
            />
            <Label htmlFor="licensorName">Licensor Name</Label>
            <Input
              id="licensorName"
              value={formData.licensorName}
              onChange={(e) => handleInputChange("licensorName", e.target.value)}
            />
            <Label htmlFor="licensorAddress">Licensor Address</Label>
            <Textarea
              id="licensorAddress"
              value={formData.licensorAddress}
              onChange={(e) => handleInputChange("licensorAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card>
          <CardHeader>
            <CardTitle>License Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
            <Label htmlFor="licenseFee">License Fee</Label>
            <Input
              id="licenseFee"
              value={formData.licenseFee}
              onChange={(e) => handleInputChange("licenseFee", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>License Scope</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="licenseScope">License Scope</Label>
            <Textarea
              id="licenseScope"
              value={formData.licenseScope}
              onChange={(e) => handleInputChange("licenseScope", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Termination Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="terminationNotice">Termination Notice</Label>
            <Textarea
              id="terminationNotice"
              value={formData.terminationNotice}
              onChange={(e) => handleInputChange("terminationNotice", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="governingLaw">Governing Law</Label>
            <Input
              id="governingLaw"
              value={formData.governingLaw}
              onChange={(e) => handleInputChange("governingLaw", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Warranty Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="warrantyDisclaimer">Warranty Disclaimer</Label>
            <Textarea
              id="warrantyDisclaimer"
              value={formData.warrantyDisclaimer}
              onChange={(e) => handleInputChange("warrantyDisclaimer", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Scope</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="maintenanceScope">Maintenance Scope</Label>
            <Textarea
              id="maintenanceScope"
              value={formData.maintenanceScope}
              onChange={(e) => handleInputChange("maintenanceScope", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Technical Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="technicalSupport">Technical Support</Label>
            <Textarea
              id="technicalSupport"
              value={formData.technicalSupport}
              onChange={(e) => handleInputChange("technicalSupport", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Service Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="serviceLevel">Service Level</Label>
            <Textarea
              id="serviceLevel"
              value={formData.serviceLevel}
              onChange={(e) => handleInputChange("serviceLevel", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="disputeResolution">Dispute Resolution</Label>
            <Textarea
              id="disputeResolution"
              value={formData.disputeResolution}
              onChange={(e) => handleInputChange("disputeResolution", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 11:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Attorneys Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="attorneysFees">Attorneys Fees</Label>
            <Textarea
              id="attorneysFees"
              value={formData.attorneysFees}
              onChange={(e) => handleInputChange("attorneysFees", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 12:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Amendments</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="amendments">Amendments</Label>
            <Textarea
              id="amendments"
              value={formData.amendments}
              onChange={(e) => handleInputChange("amendments", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 13:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="notices">Notices</Label>
            <Textarea
              id="notices"
              value={formData.notices}
              onChange={(e) => handleInputChange("notices", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 14:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="assignment">Assignment</Label>
            <Textarea
              id="assignment"
              value={formData.assignment}
              onChange={(e) => handleInputChange("assignment", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 15:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Licensor & Licensee Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="licensorNameSignature">Licensor Signature</Label>
            <Input
              id="licensorNameSignature"
              value={formData.licensorNameSignature}
              onChange={(e) => handleInputChange("licensorNameSignature", e.target.value)}
            />
            <Label htmlFor="licenseeNameSignature">Licensee Signature</Label>
            <Input
              id="licenseeNameSignature"
              value={formData.licenseeNameSignature}
              onChange={(e) => handleInputChange("licenseeNameSignature", e.target.value)}
            />
          </CardContent>
        </Card>
      );
    case 16:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Governing Law & Attorney Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="governingLaw">Governing Law</Label>
            <Input
              id="governingLaw"
              value={formData.governingLaw}
              onChange={(e) => handleInputChange("governingLaw", e.target.value)}
            />
            <Label htmlFor="attorneysFees">Attorney Fees</Label>
            <Textarea
              id="attorneysFees"
              value={formData.attorneysFees}
              onChange={(e) => handleInputChange("attorneysFees", e.target.value)}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Software License Agreement</h1>
        <p className="text-gray-600">Create a Software License Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 18</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 18) * 100}%` }}
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
          {currentStep < 18 ? (
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

export default SoftwareLicenseAgreementForm;
