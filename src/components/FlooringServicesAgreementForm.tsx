import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  serviceRecipientName: string;
  serviceRecipientAddress: string;
  contractorName: string;
  contractorAddress: string;

  startDate: string;
  serviceDescription: string;
  completionDate: string;

  amount: string;
  promptDiscount: string;
  promptDiscountDays: string;
  interestRate: string;
  collectionCostsNote: string;
  nonPaymentNote: string;

  terminationDate: string;

  workProductOwnershipNote: string;
  projectAddress: string;

  permitsNote: string;

  insuranceDetails: string;

  warrantyNote: string;
  warrantyMonths: string;

  indemnificationNote: string;

  defaultEventsNote: string;
  cureDays: string;

  remediesNote: string;

  forceMajeureNote: string;
  arbitrationNote: string;

  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;
  governingLaw: string;
  noticeAddressServiceRecipient: string;
  noticeAddressContractor: string;
  waiverNote: string;

  serviceRecipientSignName: string;
  serviceRecipientSignDate: string;
  contractorSignName: string;
  contractorSignDate: string;
}

export default function FlooringServicesAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",

    serviceRecipientName: "",
    serviceRecipientAddress: "",
    contractorName: "",
    contractorAddress: "",

    startDate: "",
    serviceDescription: "",
    completionDate: "",

    amount: "",
    promptDiscount: "",
    promptDiscountDays: "",
    interestRate: "",
    collectionCostsNote:
      "The Service Recipient shall bear all costs associated with collection of overdue payments, including reasonable attorneys’ fees and related expenses.",
    nonPaymentNote:
      "In the event of non-payment, the Contractor may treat such failure as a material breach and may terminate this Agreement and/or pursue any legal remedies available.",

    terminationDate: "",

    workProductOwnershipNote:
      "Any copyrightable works, ideas, inventions, designs, plans, products, or other intellectual property (collectively, \"Work Product\") developed by the Contractor in connection with the Services shall be the exclusive property of the Service Recipient.",
    projectAddress: "",

    permitsNote:
      "The Contractor shall obtain all permits, licenses, and approvals required by municipal or county authorities. The cost of obtaining such approvals shall be included in the agreed project price.",

    insuranceDetails:
      "General Liability Insurance; Workers’ Compensation Insurance (if applicable); Builder’s Risk Insurance.",

    warrantyNote:
      "The Contractor warrants that the Services shall be performed in a timely, professional, and workmanlike manner, consistent with the prevailing standards and best practices in the Service Recipient’s region. The Contractor further warrants that all materials furnished shall be of good quality and suitable for the intended use.",
    warrantyMonths: "",

    indemnificationNote:
      "The Contractor shall indemnify, defend, and hold harmless the Service Recipient from and against any and all claims, damages, losses, liabilities, expenses, and legal fees arising out of or resulting from the acts, omissions, or negligence of the Contractor or its employees, agents, or subcontractors in connection with the Services.",

    defaultEventsNote:
      "a. Failure to make any payment when due;\nb. Insolvency or bankruptcy of either Party;\nc. Attachment or levy against either Party’s property;\nd. Failure to deliver or perform the Services in accordance with this Agreement.",
    cureDays: "",

    remediesNote:
      "The defaulting Party shall have the cure period referenced above to cure the default. If not cured within such time (unless waived in writing), this Agreement shall terminate automatically, and the non-defaulting Party may seek all remedies available under law or equity.",

    forceMajeureNote:
      "Neither Party shall be liable for any delay or failure in performance due to causes beyond its reasonable control, including but not limited to: acts of God, epidemic, pandemic, public health emergencies, government orders, strikes, war, civil unrest, or natural disasters.",
    arbitrationNote:
      "Any disputes arising under or related to this Agreement shall be resolved by binding arbitration pursuant to the Commercial Arbitration Rules of the American Arbitration Association.",

    entireAgreementNote:
      "This Agreement constitutes the entire understanding between the Parties and supersedes all prior written or oral agreements concerning the subject matter hereof.",
    severabilityNote:
      "If any provision herein is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
    amendmentNote:
      "No amendment or modification of this Agreement shall be valid unless made in writing and signed by the Party to be bound thereby.",
    governingLaw: "",
    noticeAddressServiceRecipient: "",
    noticeAddressContractor: "",
    waiverNote:
      "Failure to enforce any provision of this Agreement shall not constitute a waiver of the right to enforce such provision in the future.",

    serviceRecipientSignName: "",
    serviceRecipientSignDate: "",
    contractorSignName: "",
    contractorSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 14;
    let y = margin;

    const addText = (
      text: string,
      size = 11,
      bold = false,
      center = false,
      spacing = 1
    ) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const maxWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw =
            (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight * spacing;
      });
    };

    // Header
    addText("FLOORING SERVICES AGREEMENT", 16, true, true);
    addText("\n");

    addText(
      `This Flooring Services Agreement (“Agreement”) is entered into and made effective as of ${formData.effectiveDate ||
        "________________"} by and between:`
    );
    addText(
      `${formData.serviceRecipientName || "________________"}, of ${formData.serviceRecipientAddress ||
        "________________"} (hereinafter referred to as the “Service Recipient”),`
    );
    addText("\nAND\n");
    addText(
      `${formData.contractorName || "________________"}, of ${formData.contractorAddress ||
        "________________"} (hereinafter referred to as the “Contractor”).`
    );
    addText("Collectively referred to as the “Parties” and individually as a “Party.”");
    addText("\n");

    addText("1. Description of Services", 12, true);
    addText(
      `Commencing on ${formData.startDate || "________________"}, the Contractor shall perform the following flooring services for the Service Recipient (the “Services”):`
    );
    addText(formData.serviceDescription || "________________");
    addText(
      `All Services shall be completed on or before ${formData.completionDate ||
        "________________"}.`
    );
    addText("\n");

    addText("2. Scope of Work", 12, true);
    addText(
      `The Contractor shall furnish all necessary labor, materials, equipment, and expertise to complete the flooring services described herein. Any drawings and specifications executed by both Parties shall be deemed incorporated into this Agreement by reference.`
    );
    addText(`Installation location: ${formData.projectAddress || "________________"}`);
    addText(
      "The Contractor further agrees to perform flooring installation services on an ongoing basis, as may be requested during the term of this Agreement, in accordance with the specifications set forth herein."
    );
    addText("\n");

    addText("3. Payment", 12, true);
    addText(`• Payment in the sum of ${formData.amount || "____________"} shall be made to the Contractor upon satisfactory completion of the Services.`);
    if (formData.promptDiscount || formData.promptDiscountDays) {
      addText(
        `• A prompt payment discount of ${formData.promptDiscount || ""} shall apply if the full invoice is paid within ${formData.promptDiscountDays ||
          ""} days.`
      );
    } else {
      addText(`• A prompt payment discount may apply if agreed in writing.`);
    }
    addText(
      `• Interest shall accrue on any overdue sums at the rate of ${formData.interestRate ||
        ""} per annum, or the maximum rate permitted by applicable law, whichever is lower.`
    );
    addText(`• ${formData.collectionCostsNote || ""}`);
    addText(`${formData.nonPaymentNote || ""}`);
    addText("\n");

    addText("4. Term", 12, true);
    addText(
      `• This Agreement shall terminate automatically on ${formData.terminationDate ||
        "____________"}, unless earlier terminated in accordance with its terms or extended by mutual written agreement of the Parties.`
    );
    addText("\n");

    addText("5. Ownership of Work Product", 12, true);
    addText(formData.workProductOwnershipNote || "");
    addText("\n");

    addText("6. Permits and Regulatory Approvals", 12, true);
    addText(formData.permitsNote || "");
    addText("\n");

    addText("7. Insurance", 12, true);
    addText(`• Insurance coverage: ${formData.insuranceDetails || ""}`);
    addText("\n");

    addText("8. Warranty", 12, true);
    addText(formData.warrantyNote || "");
    if (formData.warrantyMonths) addText(`Warranty period: ${formData.warrantyMonths} months.`);
    addText("\n");

    addText("9. Indemnification", 12, true);
    addText(formData.indemnificationNote || "");
    addText("\n");

    addText("10. Default", 12, true);
    addText(formData.defaultEventsNote || "");
    addText("\n");

    addText("11. Remedies", 12, true);
    addText(`${formData.remediesNote || ""}`);
    if (formData.cureDays) addText(`Cure period: ${formData.cureDays} days.`);
    addText("\n");

    addText("12. Force Majeure", 12, true);
    addText(formData.forceMajeureNote || "");
    addText("\n");

    addText("13. Arbitration", 12, true);
    addText(formData.arbitrationNote || "");
    addText("\n");

    addText("14. Entire Agreement", 12, true);
    addText(formData.entireAgreementNote || "");
    addText("\n");

    addText("15. Severability", 12, true);
    addText(formData.severabilityNote || "");
    addText("\n");

    addText("16. Amendment", 12, true);
    addText(formData.amendmentNote || "");
    addText("\n");

    addText("17. Governing Law", 12, true);
    addText(`• ${formData.governingLaw || ""}`);
    addText("\n");

    addText("18. Notice", 12, true);
    addText(
      `• All notices or communications required under this Agreement shall be delivered personally or sent via certified mail, return receipt requested, to the addresses stated above or to such other addresses as may be designated in writing.`
    );
    if (formData.noticeAddressServiceRecipient)
      addText(`Service Recipient notice address: ${formData.noticeAddressServiceRecipient}`);
    if (formData.noticeAddressContractor)
      addText(`Contractor notice address: ${formData.noticeAddressContractor}`);
    addText("\n");

    addText("19. Waiver", 12, true);
    addText(formData.waiverNote || "");
    addText("\n");

    addText("20. Execution", 12, true);
    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first written above.");
    addText("\nService Recipient");
    addText(`By: ____________________________`);
    addText(`Name: ${formData.serviceRecipientSignName || "________________"}`);
    addText(`Date: ${formData.serviceRecipientSignDate || "________________"}`);
    addText("\nContractor");
    addText(`By: ____________________________`);
    addText(`Name: ${formData.contractorSignName || "________________"}`);
    addText(`Date: ${formData.contractorSignDate || "________________"}`);

    doc.save("Flooring_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Date</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Service Recipient Name</Label>
              <Input name="serviceRecipientName" value={formData.serviceRecipientName} onChange={handleChange} />
              <Label>Service Recipient Address</Label>
              <Input name="serviceRecipientAddress" value={formData.serviceRecipientAddress} onChange={handleChange} />
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Input name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Schedule</h3>
              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Service Description</Label>
              <textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} className="w-full p-2 border rounded" rows={6} />
              <Label>Completion Date</Label>
              <Input name="completionDate" value={formData.completionDate} onChange={handleChange} />
              <Label>Project Address</Label>
              <Input name="projectAddress" value={formData.projectAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment</h3>
              <Label>Amount</Label>
              <Input name="amount" value={formData.amount} onChange={handleChange} />
              <Label>Prompt Discount</Label>
              <Input name="promptDiscount" value={formData.promptDiscount} onChange={handleChange} />
              <Label>Prompt Discount Days</Label>
              <Input name="promptDiscountDays" value={formData.promptDiscountDays} onChange={handleChange} />
              <Label>Interest Rate (per annum)</Label>
              <Input name="interestRate" value={formData.interestRate} onChange={handleChange} />
              <Label>Collection / Costs Note</Label>
              <textarea name="collectionCostsNote" value={formData.collectionCostsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Non-payment Note</Label>
              <textarea name="nonPaymentNote" value={formData.nonPaymentNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Ownership / Permits / Insurance</h3>
              <Label>Work Product Ownership Note</Label>
              <textarea name="workProductOwnershipNote" value={formData.workProductOwnershipNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Permits Note</Label>
              <textarea name="permitsNote" value={formData.permitsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Insurance Details</Label>
              <Input name="insuranceDetails" value={formData.insuranceDetails} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranty / Indemnification</h3>
              <Label>Warranty Note</Label>
              <textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Warranty Months</Label>
              <Input name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} />
              <Label>Indemnification Note</Label>
              <textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Default / Remedies</h3>
              <Label>Default Events</Label>
              <textarea name="defaultEventsNote" value={formData.defaultEventsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={5} />
              <Label>Cure Period (days)</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
              <Label>Remedies Note</Label>
              <textarea name="remediesNote" value={formData.remediesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Force Majeure / Arbitration</h3>
              <Label>Force Majeure Note</Label>
              <textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Arbitration Note</Label>
              <textarea name="arbitrationNote" value={formData.arbitrationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate & Notices</h3>
              <Label>Entire Agreement</Label>
              <textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Service Recipient Notice Address</Label>
              <Input name="noticeAddressServiceRecipient" value={formData.noticeAddressServiceRecipient} onChange={handleChange} />
              <Label>Contractor Notice Address</Label>
              <Input name="noticeAddressContractor" value={formData.noticeAddressContractor} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 9:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Service Recipient - Name</Label>
              <Input name="serviceRecipientSignName" value={formData.serviceRecipientSignName} onChange={handleChange} />
              <Label>Service Recipient - Date</Label>
              <Input name="serviceRecipientSignDate" value={formData.serviceRecipientSignDate} onChange={handleChange} />
              <Label>Contractor - Name</Label>
              <Input name="contractorSignName" value={formData.contractorSignName} onChange={handleChange} />
              <Label>Contractor - Date</Label>
              <Input name="contractorSignDate" value={formData.contractorSignDate} onChange={handleChange} />
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

        {step < 9 ? (
          <Button onClick={() => setStep((s) => Math.min(9, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 9 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Flooring Services Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
