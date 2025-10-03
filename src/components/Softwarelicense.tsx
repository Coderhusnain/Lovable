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
  disputeCity: string;   // NEW
  disputeState: string;  // NEW
  attorneysFees: string;
  amendments: string;
  notices: string;
  assignment: string;

  // Signatures - Licensor
  licensorSignBy: string;      // NEW
  licensorSignName: string;    // NEW
  licensorSignTitle: string;   // NEW
  licensorSignDate: string;    // NEW

  // Signatures - Licensee
  licenseeSignBy: string;      // NEW
  licenseeSignName: string;    // NEW
  licenseeSignTitle: string;   // NEW
  licenseeSignDate: string;    // NEW
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
    disputeCity: "",
    disputeState: "",
    attorneysFees: "",
    amendments: "",
    notices: "",
    assignment: "",
    licensorSignBy: "",
    licensorSignName: "",
    licensorSignTitle: "",
    licensorSignDate: "",
    licenseeSignBy: "",
    licenseeSignName: "",
    licenseeSignTitle: "",
    licenseeSignDate: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 8));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

const generatePDF = async () => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;

    const addText = (
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
        if (currentY > 270) {
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

    // ===== Title =====
    addText("SOFTWARE LICENSE AGREEMENT", 16, true, true);
    currentY += 6;

    // ===== Opening Paragraph =====
    addText(
      `This Software License Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate || "[Date]"}, by and between:`
    );
    addText(
      `${formData.licenseeName || "[Full Legal Name of Licensee]"}, with its principal address at ${formData.licenseeAddress || "[Address]"} (“Licensee”), and`
    );
    addText(
      `${formData.licensorName || "[Full Legal Name of Licensor]"}, with its principal place of business at ${formData.licensorAddress || "[Address]"} (“Licensor”).`
    );
    currentY += 6;

    // ===== Sections =====
    addText("1. DEFINITIONS", 12, true);
    addText("For purposes of this Agreement:");
    addText(
      '(a) “Software” means the computer programs, including object code and source code (if provided), related documentation, and all modifications, enhancements, updates, or upgrades thereto, as more fully described in Schedule A attached hereto.'
    );
    addText(
      '(b) “Install” means the act of placing, loading, or copying the Software onto a computer’s hard drive, solid-state drive, CD-ROM, or any other storage medium.'
    );
    addText(
      '© “Use” means:\ni. Executing or loading the Software into the random access memory (RAM) or other primary storage device of a computer; and\nii. Making a single copy of the Software solely for archival or emergency restart purposes, provided such copy is not installed or used on any other computer.'
    );

    addText("2. GRANT OF LICENSE", 12, true);
    addText(
      "Licensor hereby grants to Licensee a personal, non-exclusive, non-transferable license to install and use the Software on a single designated computer system owned or controlled by Licensee, subject to the terms and conditions of this Agreement."
    );

    addText("3. TERM OF LICENSE", 12, true);
    addText(
      `This License shall commence on ${formData.startDate || "[Effective Date]"} and shall remain in force until terminated in accordance with Clause 5 herein.`
    );

    addText("4. LICENSE FEE", 12, true);
    addText(
      `Licensee shall pay to Licensor the license fee specified in Schedule B, in the manner and within the time frame stated therein.`
    );

    addText("5. TERMINATION", 12, true);
    addText(
      "Licensor may terminate this Agreement immediately upon written notice if Licensee breaches any material provision herein or becomes bankrupt or insolvent."
    );

    addText("6. RETURN OR DESTRUCTION OF SOFTWARE", 12, true);
    addText(
      "Upon termination, Licensee shall immediately cease using the Software and return or destroy all copies, in whole or in part, including any modifications. Licensor may verify compliance through inspection."
    );

    addText("7. TITLE AND OWNERSHIP", 12, true);
    addText(
      "The Software is licensed, not sold. All rights, title, and interest, including all intellectual property rights therein, remain vested in Licensor."
    );

    addText("8. MODIFICATIONS AND ENHANCEMENTS", 12, true);
    addText(
      "Licensee shall not reverse engineer, decompile, disassemble, adapt, translate, or create derivative works of the Software without prior written consent of Licensor."
    );

    addText("9. WARRANTY DISCLAIMER", 12, true);
    addText(
      "The Software is provided “AS IS”, without any warranties, whether express, implied, or statutory, including but not limited to merchantability, fitness for a particular purpose, and non-infringement."
    );

    addText("10. LIMITED REMEDIES", 12, true);
    addText(
      "At Licensor’s sole option, remedies for breach of warranty (if any) shall be limited to:\n(a) Refund of the license fee paid for the affected period; or\n(b) Repair or replacement of the defective Software."
    );

    addText("11. LIMITATION OF LIABILITY", 12, true);
    addText(
      "Neither party shall be liable for any indirect, incidental, special, or consequential damages. Licensor’s total liability shall not exceed the total license fees paid in the twelve (12) months preceding the claim."
    );

    addText("12. CONFIDENTIALITY", 12, true);
    addText(
      "Licensee shall treat the Software and Licensor’s proprietary information as confidential and protect it with the same degree of care as its own confidential information."
    );

    addText("13. MAINTENANCE & SUPPORT SERVICES", 12, true);
    addText(
      "13.1 Scope of Services – Subject to payment of applicable fees, Licensor shall provide the following maintenance and support services during the term of this Agreement:\nUpdates & Upgrades: Provision of all patches, bug fixes, security updates, and minor enhancements released by Licensor for the Software.\nTechnical Support: Access to technical support via email, telephone, or an online helpdesk during normal business hours (Monday to Friday, excluding public holidays).\nError Correction: Use commercially reasonable efforts to diagnose and correct material errors in the Software."
    );
    addText(
      "13.2 Exclusions – Maintenance and support services shall not include:\nCustom development or modifications requested by Licensee;\nSupport for issues arising from misuse, unauthorized modifications, or third-party software/hardware conflicts;\nOn-site support unless separately agreed upon in writing."
    );
    addText(
      "13.3 Service Levels – Licensor will use reasonable commercial efforts to respond to support requests within [X] business hours and resolve critical issues within [X] business days, subject to Licensee’s cooperation and timely provision of necessary information."
    );
    addText(
      "13.4 Fees – Maintenance and support services are included for the first [X] months from the Effective Date. Thereafter, continued support shall be subject to renewal and payment of the then-current annual maintenance fee."
    );
    addText(
      "13.5 Termination of Support – Licensor reserves the right to discontinue support for any version of the Software twelve (12) months after the release of a subsequent major version."
    );

    addText("14. DISPUTE RESOLUTION", 12, true);
    addText(
      `Any dispute shall be resolved through binding arbitration under the American Arbitration Association rules in ${formData.disputeCity || "[City]"}, ${formData.disputeState || "[State]"}.`
    );

    addText("15. ATTORNEYS’ FEES", 12, true);
    addText(
      "The prevailing party in any action to enforce this Agreement shall be entitled to reasonable attorneys’ fees and costs."
    );

    addText("16. GENERAL PROVISIONS", 12, true);
    addText(
      `(a) Entire Agreement – This Agreement constitutes the entire agreement between the parties.\n(b) Amendments – Any modifications must be in writing and signed by authorized representatives.\n(c) Governing Law – Governed by the laws of the State of ${formData.governingLaw || "[State]"}.\n(d) Notices – Must be in writing and deemed given upon personal delivery, certified mail, or confirmed electronic transmission.\n(e) Independent Parties – Nothing herein creates an agency, partnership, or joint venture.`
    );

    addText("17. ASSIGNMENT", 12, true);
    addText(
      "Licensee shall not assign or transfer this Agreement without Licensor’s prior written consent."
    );

    addText("18. EXECUTION", 12, true);
    addText(
      "This Agreement may be executed in counterparts, each deemed an original."
    );

    // ===== Signatures =====
    addText("LICENSOR:", 12, true);
    addText(`By: ${formData.licensorSignBy || "___________________________"}`);
    addText(`Name: ${formData.licensorName || "_________________________"}`);
    addText(`Title: ${formData.licensorSignTitle || "__________________________"}`);
    addText(`Date: ${formData.licensorSignDate || "__________________________"}`);

    currentY += 6;

    addText("LICENSEE:", 12, true);
    addText(`By: ${formData.licenseeSignBy || "___________________________"}`);
    addText(`Name: ${formData.licenseeSignName || "_________________________"}`);
    addText(`Title: ${formData.licenseeSignTitle || "__________________________"}`);
    addText(`Date: ${formData.licenseeSignDate || "__________________________"}`);

    // ===== Save PDF =====
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
            <CardHeader><CardTitle>Agreement Parties</CardTitle></CardHeader>
            <CardContent>
              <Label>Agreement Date</Label>
              <Input type="date" value={formData.agreementDate} onChange={(e) => handleInputChange("agreementDate", e.target.value)} />
              <Label>Licensee Name</Label>
              <Input value={formData.licenseeName} onChange={(e) => handleInputChange("licenseeName", e.target.value)} />
              <Label>Licensee Address</Label>
              <Textarea value={formData.licenseeAddress} onChange={(e) => handleInputChange("licenseeAddress", e.target.value)} />
              <Label>Licensor Name</Label>
              <Input value={formData.licensorName} onChange={(e) => handleInputChange("licensorName", e.target.value)} />
              <Label>Licensor Address</Label>
              <Textarea value={formData.licensorAddress} onChange={(e) => handleInputChange("licensorAddress", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader><CardTitle>License Terms</CardTitle></CardHeader>
            <CardContent>
              <Label>Start Date</Label>
              <Input type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} />
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
              <Label>License Fee</Label>
              <Input value={formData.licenseFee} onChange={(e) => handleInputChange("licenseFee", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader><CardTitle>Termination</CardTitle></CardHeader>
            <CardContent>
              <Label>Termination Notice</Label>
              <Textarea value={formData.terminationNotice} onChange={(e) => handleInputChange("terminationNotice", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader><CardTitle>Governing Law & Warranty</CardTitle></CardHeader>
            <CardContent>
              <Label>Governing Law</Label>
              <Input value={formData.governingLaw} onChange={(e) => handleInputChange("governingLaw", e.target.value)} />
              <Label>Warranty Disclaimer</Label>
              <Textarea value={formData.warrantyDisclaimer} onChange={(e) => handleInputChange("warrantyDisclaimer", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader><CardTitle>Maintenance & Support</CardTitle></CardHeader>
            <CardContent>
              <Label>Maintenance Scope</Label>
              <Textarea value={formData.maintenanceScope} onChange={(e) => handleInputChange("maintenanceScope", e.target.value)} />
              <Label>Technical Support</Label>
              <Textarea value={formData.technicalSupport} onChange={(e) => handleInputChange("technicalSupport", e.target.value)} />
              <Label>Service Level</Label>
              <Textarea value={formData.serviceLevel} onChange={(e) => handleInputChange("serviceLevel", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader><CardTitle>Dispute & Attorneys</CardTitle></CardHeader>
            <CardContent>
              <Label>Dispute Resolution</Label>
              <Textarea value={formData.disputeResolution} onChange={(e) => handleInputChange("disputeResolution", e.target.value)} />
              <Label>Dispute City</Label>
              <Input value={formData.disputeCity} onChange={(e) => handleInputChange("disputeCity", e.target.value)} />
              <Label>Dispute State</Label>
              <Input value={formData.disputeState} onChange={(e) => handleInputChange("disputeState", e.target.value)} />
              <Label>Attorneys’ Fees</Label>
              <Textarea value={formData.attorneysFees} onChange={(e) => handleInputChange("attorneysFees", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardHeader><CardTitle>General Clauses</CardTitle></CardHeader>
            <CardContent>
              <Label>Amendments</Label>
              <Textarea value={formData.amendments} onChange={(e) => handleInputChange("amendments", e.target.value)} />
              <Label>Notices</Label>
              <Textarea value={formData.notices} onChange={(e) => handleInputChange("notices", e.target.value)} />
              <Label>Assignment</Label>
              <Textarea value={formData.assignment} onChange={(e) => handleInputChange("assignment", e.target.value)} />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardHeader><CardTitle>Signatures</CardTitle></CardHeader>
            <CardContent>
              {/* Licensor */}
              <h3 className="font-semibold mb-2">Licensor</h3>
              <Label>By</Label>
              <Input value={formData.licensorSignBy} onChange={(e) => handleInputChange("licensorSignBy", e.target.value)} />
              <Label>Name</Label>
              <Input value={formData.licensorSignName} onChange={(e) => handleInputChange("licensorSignName", e.target.value)} />
              <Label>Title</Label>
              <Input value={formData.licensorSignTitle} onChange={(e) => handleInputChange("licensorSignTitle", e.target.value)} />
              <Label>Date</Label>
              <Input type="date" value={formData.licensorSignDate} onChange={(e) => handleInputChange("licensorSignDate", e.target.value)} />

              <h3 className="font-semibold mt-4 mb-2">Licensee</h3>
              <Label>By</Label>
              <Input value={formData.licenseeSignBy} onChange={(e) => handleInputChange("licenseeSignBy", e.target.value)} />
              <Label>Name</Label>
              <Input value={formData.licenseeSignName} onChange={(e) => handleInputChange("licenseeSignName", e.target.value)} />
              <Label>Title</Label>
              <Input value={formData.licenseeSignTitle} onChange={(e) => handleInputChange("licenseeSignTitle", e.target.value)} />
              <Label>Date</Label>
              <Input type="date" value={formData.licenseeSignDate} onChange={(e) => handleInputChange("licenseeSignDate", e.target.value)} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Progress Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Software License Agreement</h1>
        <p className="text-gray-600">Fill the form and export as PDF.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 8</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <div className="flex gap-2">
          {currentStep < 8 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" />
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