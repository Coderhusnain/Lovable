import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  ownerAddress: string;
  carpenterName: string;
  carpenterAddress: string;
  startDate: string;
  serviceDescription: string;
  paymentRate: string;
  paymentSchedule: string;
  additionalRate: string;
  paymentDueDays: string;
  endDate: string;
  breachDays: string;
  stateLaw: string;
}

export default function CarpentryContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    ownerAddress: "",
    carpenterName: "",
    carpenterAddress: "",
    startDate: "",
    serviceDescription: "",
    paymentRate: "",
    paymentSchedule: "",
    additionalRate: "",
    paymentDueDays: "",
    endDate: "",
    breachDays: "",
    stateLaw: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
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

    // === CARPENTRY CONTRACT CONTENT ===
    addText("CARPENTRY CONTRACT", 14, true, true);
    addText(`Effective Date: ${formData.effectiveDate || "__________________"}`);
    addText("\n");
    addText(
      `This Carpentry Contract (“Contract”) is entered into by and between:\n\nOwner: ${formData.ownerName || "__________________"}, residing at ${formData.ownerAddress || "__________________"}\n\nCarpenter: ${formData.carpenterName || "__________________"}, residing at ${formData.carpenterAddress || "__________________"}`
    );

    addText("\n1. Scope of Work");
    addText(
      "The Carpenter shall provide carpentry services and supply all necessary materials in accordance with the approved plans, specifications, and any subsequent written change orders duly signed by both Parties. All work shall be completed in a good and workmanlike manner, consistent with industry standards and applicable laws."
    );

    addText("\n2. Materials, Labor, and Permits");
    addText(
      "The Carpenter shall furnish, at its sole expense, all lumber, materials, labor, tools, equipment, freight, permits, and licenses necessary for the execution and completion of the work. The Carpenter shall be responsible for obtaining and maintaining all permits and licenses required by law for the performance of the services."
    );

    addText("\n3. Description of Services");
    addText(`Commencing on ${formData.startDate || "__________"}, the Carpenter shall perform the following services:`);
    addText(formData.serviceDescription || "[Insert detailed description of carpentry work, including measurements, finish types, and any specialty work].");

    addText("\n4. Payment Terms");
    addText(
      `The Owner shall compensate the Carpenter at the agreed rate of ${formData.paymentRate || "__________"} payable in accordance with: ${formData.paymentSchedule || "__________"}.\nAdditional work not specified shall be billed at ${formData.additionalRate || "__________"} per hour/day/project. Payment is due within ${formData.paymentDueDays || "__________"} days of invoicing.`
    );

    addText("\n5. Term and Termination");
    addText(
      `This Contract shall remain in effect until ${formData.endDate || "__________"}. Either Party may terminate by providing written notice if the other materially breaches and fails to remedy within ${formData.breachDays || "__________"} days of receiving notice.`
    );

    addText("\n6. Relationship of Parties");
    addText(
      "The Carpenter is engaged as an independent contractor and is not an employee, partner, or agent of the Owner. The Carpenter shall have sole control over the means and methods of performing the work."
    );

    addText("\n7. Ownership of Work Product");
    addText(
      "All work product, designs, plans, drawings, or other materials created by the Carpenter under this Contract shall be the exclusive property of the Owner. The Carpenter shall execute all documents necessary to effectuate the transfer of ownership to the Owner."
    );

    addText("\n8. Confidentiality");
    addText(
      "The Carpenter shall not disclose, use, or permit the use of any proprietary or confidential information belonging to the Owner, except as strictly necessary for the performance of the Services. This obligation shall survive termination of the Contract."
    );

    addText("\n9. Insurance and Liability for Injuries");
    addText(
      "The Carpenter shall obtain and maintain adequate general liability insurance and, where applicable, workers’ compensation coverage. The Carpenter assumes full responsibility for any injury to persons or damage to property arising from its work and hereby waives any claims against the Owner in connection therewith."
    );

    addText("\n10. Indemnification");
    addText(
      "The Carpenter shall indemnify, defend, and hold harmless the Owner from and against any and all claims, losses, liabilities, damages, and expenses (including reasonable attorneys’ fees) arising out of or relating to the Carpenter’s performance or breach of this Contract."
    );

    addText("\n11. Entire Agreement");
    addText(
      "This Contract represents the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, agreements, or understandings, whether written or oral."
    );

    addText("\n12. Severability");
    addText(
      "If any provision is held invalid or unenforceable by a court, such provision shall be severed and the remaining provisions shall remain in full force and effect."
    );

    addText("\n13. Governing Law");
    addText(
      `This Contract shall be governed by and construed in accordance with the laws of the State of ${formData.stateLaw || "__________"}, without regard to conflict of law principles.`
    );

    addText("\n14. Execution");
    addText("OWNER");
    addText("Name: " + (formData.ownerName || "__________________"));
    addText("Signature: ____________________________ Date: __________");
    addText("\nCARPENTER");
    addText("Name: " + (formData.carpenterName || "__________________"));
    addText("Signature: ____________________________ Date: __________");

    // Save PDF
    doc.save("Carpentry_Contract.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Contract Parties</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
              <Label>Carpenter Name</Label>
              <Input name="carpenterName" value={formData.carpenterName} onChange={handleChange} />
              <Label>Carpenter Address</Label>
              <Input name="carpenterAddress" value={formData.carpenterAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Payment</h3>
              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Service Description</Label>
              <textarea
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={5}
              />
              <Label>Payment Rate</Label>
              <Input name="paymentRate" value={formData.paymentRate} onChange={handleChange} />
              <Label>Payment Schedule</Label>
              <Input name="paymentSchedule" value={formData.paymentSchedule} onChange={handleChange} />
              <Label>Additional Work Rate</Label>
              <Input name="additionalRate" value={formData.additionalRate} onChange={handleChange} />
              <Label>Payment Due (days)</Label>
              <Input name="paymentDueDays" value={formData.paymentDueDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term & Law</h3>
              <Label>End Date</Label>
              <Input name="endDate" value={formData.endDate} onChange={handleChange} />
              <Label>Breach Cure Days</Label>
              <Input name="breachDays" value={formData.breachDays} onChange={handleChange} />
              <Label>State Law</Label>
              <Input name="stateLaw" value={formData.stateLaw} onChange={handleChange} />
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

      {step === 5 && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Carpentry Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
