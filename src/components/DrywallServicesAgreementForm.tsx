import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  clientName: string;
  clientAddress: string;
  contractorName: string;
  contractorAddress: string;

  // Services
  startDate: string;
  servicesDetails: string;

  // Payment
  amount: string;
  paymentTermsNote: string;
  paymentSuspensionNote: string;

  // Term & Termination
  endDate: string;
  breachCureDays: string;

  // Additional Work / Relationship
  additionalWorkNote: string;
  relationshipNote: string;

  // Confidentiality / Injuries / Hazardous
  confidentialityNote: string;
  insuranceNote: string;
  injuriesNote: string;
  hazardousNote: string;

  // Indemnification / Assignment / Warranty / Compliance / Insurance
  indemnificationNote: string;
  assignmentNote: string;
  warrantyMonths: string;
  warrantyNote: string;
  complianceNote: string;
  insuranceNote2: string;

  // Default / Remedies / Force Majeure / Dispute
  defaultEventsNote: string;
  remediesCureDays: string;
  forceMajeureNote: string;
  arbitrationNote: string;

  // Boilerplate
  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;
  governingLaw: string;
  noticeAddressClient: string;
  noticeAddressContractor: string;
  waiverNote: string;

  // Signatures
  clientSignName: string;
  clientSignDate: string;
  contractorSignName: string;
  contractorSignDate: string;
}

export default function DrywallServicesAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "[Date]",
    clientName: "[Client’s Full Legal Name]",
    clientAddress: "[Address]",
    contractorName: "[Contractor’s Full Legal Name / Business Name]",
    contractorAddress: "[Address]",

    startDate: "[Start Date]",
    servicesDetails:
      "1.1 Preparation & Finishing Work\n• Spotting, pointing, detailing, flushing, sanding, and finishing of interior and exterior gypsum, drywall, thin wall, concrete, steel, wood, and plaster surfaces.\n• Spackling, drywall pointing, taping, and finishing in accordance with industry standards.\n\n1.2 Application of Finishing Materials\n• Application of all finish and flushing materials, regardless of the method of application or surface type.\n• Includes texture, simulated acoustic materials, radiant heat fill, steel fireproofing, and other specialty finishes as specified.\n\n1.3 Installation of Protective Coverings\n• Placement of protective coverings on surfaces prior to application of finishing materials to safeguard against damage.\n\n1.4 Equipment Operation & Maintenance\n• Proper use and upkeep of taping and texturing tools, compressors, brushes, rollers, spray texturing equipment, and related devices.\n\n1.5 Site Cleanup\n• Removal of materials, waste, and debris from all construction and repair areas to leave the site broom-clean.",

    amount: "$[Amount]",
    paymentTermsNote: "Payment shall be due upon completion of the Services, unless otherwise agreed in writing.",
    paymentSuspensionNote: "If the Client fails to make payment when due, the Contractor may suspend work until full payment is received.",

    endDate: "[End Date]",
    breachCureDays: "[Number]",

    additionalWorkNote:
      "Any work not specifically described in Section 1 must be authorized in writing by the Client before commencement. Compensation for such work shall be agreed upon in writing prior to performance.",
    relationshipNote: "The Contractor is engaged as an independent contractor and shall not be deemed an employee, partner, or agent of the Client.",

    confidentialityNote:
      "The Contractor shall not, during or after the term of this Agreement, disclose or use any proprietary or confidential information of the Client, except as required to perform the Services.",
    insuranceNote: "The Contractor shall maintain appropriate liability and workers’ compensation insurance coverage at its own expense.",
    injuriesNote: "The Contractor hereby waives any claims against the Client for injuries caused by the Contractor’s own negligence.",
    hazardousNote:
      "If hazardous materials (including flammable, toxic, corrosive, or radioactive substances) are encountered, the Contractor shall immediately stop work until such hazards are removed by the Client.",

    indemnificationNote:
      "Each Party shall indemnify and hold harmless the other from and against all claims, damages, losses, and expenses (including attorneys’ fees) resulting from that Party’s acts, omissions, or breaches of this Agreement.",
    assignmentNote: "Neither Party may assign its rights or obligations under this Agreement without the prior written consent of the other Party.",
    warrantyMonths: "[Number]",
    warrantyNote:
      "All Services shall be performed in accordance with generally accepted industry standards. All materials shall be new and of good quality unless otherwise agreed in writing. The Contractor shall, within the warranty period of [Number] months from completion, repair any peeling, deterioration, or defective work attributable to its workmanship or materials.",
    complianceNote:
      "The Contractor shall comply with all applicable building codes and regulations, but shall not be responsible for pre-existing abnormal site conditions or the Client’s failure to comply with applicable laws.",
    insuranceNote2: "The Contractor shall maintain fire insurance and workers’ compensation insurance throughout the term of this Agreement.",

    defaultEventsNote:
      "Events of default include:\n(a) Failure to pay amounts due;\n(b) Bankruptcy or insolvency;",
    remediesCureDays: "[Number]",
    forceMajeureNote:
      "Neither Party shall be liable for delays or failure to perform due to causes beyond their reasonable control, including natural disasters, strikes, riots, or acts of government.",
    arbitrationNote:
      "Any dispute arising under this Agreement shall be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association (AAA). The arbitrator’s decision shall be final, binding, and enforceable in any court of competent jurisdiction.",

    entireAgreementNote:
      "This Agreement constitutes the entire understanding of the Parties and supersedes all prior agreements or understandings, whether written or oral.",
    severabilityNote: "If any provision of this Agreement is held invalid, the remainder shall remain in full force and effect.",
    amendmentNote: "No modification or amendment shall be valid unless in writing and signed by both Parties.",
    governingLaw: "State of [State]",
    noticeAddressClient: "[Client notice address]",
    noticeAddressContractor: "[Contractor notice address]",
    waiverNote: "Failure by either Party to enforce any provision of this Agreement shall not be deemed a waiver of such provision or any other provision in the future.",

    clientSignName: "",
    clientSignDate: "",
    contractorSignName: "",
    contractorSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          currentY = margin;
        }
        if (isCenter) {
          const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // === DRYWALL SERVICES AGREEMENT (verbatim with placeholders) ===
    addText('DRYWALL SERVICES AGREEMENT', 14, true, true);
    addText("\n");
    addText(
      `This Drywall Services Agreement (“Agreement”) is made and entered into as of ${formData.date || "[Date]"} (“Effective Date”), by and between:`
    );
    addText(`${formData.clientName || "[Client’s Full Legal Name]"}, of ${formData.clientAddress || "[Address]"} (“Client”),`);
    addText("\nAnd\n");
    addText(
      `${formData.contractorName || "[Contractor’s Full Legal Name / Business Name]"}, of ${formData.contractorAddress || "[Address]"} (“Contractor”).`
    );
    addText("The Client and Contractor may be referred to individually as a “Party” and collectively as the “Parties.”");
    addText("\n");

    addText("1. Description of Services", 12, true);
    addText(`Beginning on ${formData.startDate || "[Start Date]"}, the Contractor shall furnish all labor, materials, tools, and equipment necessary to perform the following drywall services (collectively, the “Services”):`);
    addText(formData.servicesDetails);
    addText("\n");

    addText("2. Payment for Services", 12, true);
    addText(`• The Client shall pay the Contractor the sum of ${formData.amount || "$[Amount]"} for the satisfactory completion of the Services described herein.`);
    addText(`• ${formData.paymentTermsNote}`);
    addText(`• ${formData.paymentSuspensionNote}`);
    addText("\n");

    addText("3. Term and Termination", 12, true);
    addText(`• This Agreement shall automatically terminate on ${formData.endDate || "[End Date]"}, unless extended in writing by mutual agreement.`);
    addText(`• Either Party may terminate this Agreement upon written notice if the other Party commits a material breach that remains uncured after ${formData.breachCureDays || "[Number]"} days’ written notice.`);
    addText("\n");

    addText("4. Relationship of the Parties", 12, true);
    addText(`• ${formData.relationshipNote}`);
    addText("\n");

    addText("5. Additional Work", 12, true);
    addText(`• ${formData.additionalWorkNote}`);
    addText("\n");

    addText("6. Confidentiality", 12, true);
    addText(`• ${formData.confidentialityNote}`);
    addText("\n");

    addText("7. Injuries", 12, true);
    addText(`• ${formData.insuranceNote}`);
    addText(`• ${formData.injuriesNote}`);
    addText("\n");

    addText("8. Hazardous Materials", 12, true);
    addText(`• ${formData.hazardousNote}`);
    addText("\n");

    addText("9. Indemnification", 12, true);
    addText(`• ${formData.indemnificationNote}`);
    addText("\n");

    addText("10. Assignment", 12, true);
    addText(`• ${formData.assignmentNote}`);
    addText("\n");

    addText("11. Warranty", 12, true);
    addText(`• ${formData.warrantyNote.replace("[Number]", formData.warrantyMonths || "[Number]")}`);
    addText("\n");

    addText("12. Compliance with Building Regulations", 12, true);
    addText(`• ${formData.complianceNote}`);
    addText("\n");

    addText("13. Insurance", 12, true);
    addText(`• ${formData.insuranceNote2}`);
    addText("\n");

    addText("14. Default", 12, true);
    addText(`• ${formData.defaultEventsNote}`);
    addText("\n");

    addText("15. Remedies", 12, true);
    addText(`• In the event of a substantial breach, the non-defaulting Party may terminate this Agreement upon written notice, after giving the defaulting Party an opportunity to cure within ${formData.remediesCureDays || "[Number]"} days.`);
    addText("\n");

    addText("16. Force Majeure", 12, true);
    addText(`• ${formData.forceMajeureNote}`);
    addText("\n");

    addText("17. Dispute Resolution & Arbitration", 12, true);
    addText(`• ${formData.arbitrationNote}`);
    addText("\n");

    addText("18. Entire Agreement", 12, true);
    addText(`• ${formData.entireAgreementNote}`);
    addText("\n");

    addText("19. Severability", 12, true);
    addText(`• ${formData.severabilityNote}`);
    addText("\n");

    addText("20. Amendment", 12, true);
    addText(`• ${formData.amendmentNote}`);
    addText("\n");

    addText("21. Governing Law", 12, true);
    addText(`• ${formData.governingLaw}`);
    addText("\n");

    addText("22. Notice", 12, true);
    addText(`• All notices required under this Agreement shall be delivered in person or sent by certified mail to the addresses stated above.`);
    addText(`Client notice address: ${formData.noticeAddressClient || "[Client notice address]"}`);
    addText(`Contractor notice address: ${formData.noticeAddressContractor || "[Contractor notice address]"}`);
    addText("\n");

    addText("23. Waiver of Contractual Right", 12, true);
    addText(`• ${formData.waiverNote}`);
    addText("\n");

    addText("24. Signatures", 12, true);
    addText("CLIENT");
    addText(`Name: ${formData.clientName || "_________________________"}`);
    addText(`Signature: _______________________ Date: ${formData.clientSignDate || "__________"}`);
    addText("\nCONTRACTOR");
    addText(`Name: ${formData.contractorName || "_________________________"}`);
    addText(`Signature: _______________________ Date: ${formData.contractorSignDate || "__________"}`);
    addText("\n");

    // Save file
    doc.save("Drywall_Services_Agreement.pdf");
    setPdfGenerated(true);
    setStep(7);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Date</h3>
              <Label>Effective Date</Label>
              <Input name="date" value={formData.date} onChange={handleChange} />
              <Label>Client Full Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
              <Label>Contractor Full Name / Business</Label>
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
              <h3 className="font-semibold">Services</h3>
              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Services Details (keeps sections & bullets)</Label>
              <textarea name="servicesDetails" value={formData.servicesDetails} onChange={handleChange} className="w-full p-2 border rounded" rows={12} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Termination</h3>
              <Label>Amount</Label>
              <Input name="amount" value={formData.amount} onChange={handleChange} />
              <Label>Payment Terms Note</Label>
              <Input name="paymentTermsNote" value={formData.paymentTermsNote} onChange={handleChange} />
              <Label>Payment Suspension Note</Label>
              <Input name="paymentSuspensionNote" value={formData.paymentSuspensionNote} onChange={handleChange} />
              <Label>End Date</Label>
              <Input name="endDate" value={formData.endDate} onChange={handleChange} />
              <Label>Breach Cure Days</Label>
              <Input name="breachCureDays" value={formData.breachCureDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Relationship & Additional Work</h3>
              <Label>Relationship Note</Label>
              <Input name="relationshipNote" value={formData.relationshipNote} onChange={handleChange} />
              <Label>Additional Work Note</Label>
              <textarea name="additionalWorkNote" value={formData.additionalWorkNote} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
              <Label>Confidentiality Note</Label>
              <textarea name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Insurance / Hazardous / Indemnification</h3>
              <Label>Insurance Note</Label>
              <Input name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} />
              <Label>Injuries Note</Label>
              <Input name="injuriesNote" value={formData.injuriesNote} onChange={handleChange} />
              <Label>Hazardous Materials Note</Label>
              <textarea name="hazardousNote" value={formData.hazardousNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Indemnification Note</Label>
              <textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Assignment Note</Label>
              <Input name="assignmentNote" value={formData.assignmentNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranty / Compliance / Insurance</h3>
              <Label>Warranty Months</Label>
              <Input name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} />
              <Label>Warranty Note</Label>
              <textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Compliance Note</Label>
              <textarea name="complianceNote" value={formData.complianceNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Insurance (fire & workers comp) Note</Label>
              <Input name="insuranceNote2" value={formData.insuranceNote2} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Default / Remedies / Dispute</h3>
              <Label>Default Events Note</Label>
              <textarea name="defaultEventsNote" value={formData.defaultEventsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
              <Label>Remedies Cure Days</Label>
              <Input name="remediesCureDays" value={formData.remediesCureDays} onChange={handleChange} />
              <Label>Force Majeure Note</Label>
              <textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Arbitration / Dispute Note</Label>
              <textarea name="arbitrationNote" value={formData.arbitrationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate & Notices</h3>
              <Label>Entire Agreement Note</Label>
              <textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Client Notice Address</Label>
              <Input name="noticeAddressClient" value={formData.noticeAddressClient} onChange={handleChange} />
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
              <Label>Client - Name</Label>
              <Input name="clientSignName" value={formData.clientSignName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <hr />
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
            <div className="text-green-600 font-semibold pt-5">Drywall Services Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
