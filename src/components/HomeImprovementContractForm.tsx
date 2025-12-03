import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  ownerName: string;
  ownerAddress: string;
  contractorName: string;
  contractorAddress: string;
  licenseNumber: string;

  projectAddress: string;
  projectDescription: string;

  contractPrice: string;
  paymentTermsNotes: string;
  discountTerms: string;
  interestRate: string;

  permitsResponsibility: string;
  utilitiesProvision: string;
  accessNotes: string;
  financingNote: string;

  materialsStandardNote: string;
  materialsNonstandardNote: string;

  hazardousMaterialsNote: string;
  workAllowancesNote: string;
  contractChangesNote: string;
  scopeExclusionsNote: string;

  extraWorkNote: string;
  plumbingNote: string;
  electricalNote: string;
  plasterNote: string;
  excavationNote: string;
  termiteNote: string;

  debrisRemovalNote: string;
  delaysNote: string;

  insuranceNote: string;
  reconstructionTerminationPercent: string;

  workersCompNote: string;
  protectionOfPropertyNote: string;
  guaranteeNote: string;
  workStoppageNote: string;

  completionNoticeDays: string;
  noticesNote: string;

  entireAgreementNote: string;
  governingLaw: string;

  correctiveWorkNote: string;
  disputeResolutionNote: string;
  attorneysFeesNote: string;

  ownerSignName: string;
  ownerSignDate: string;
  contractorSignName: string;
  contractorSignDate: string;
}

export default function HomeImprovementContractForm() {
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    ownerAddress: "",
    contractorName: "",
    contractorAddress: "",
    licenseNumber: "",

    projectAddress: "",
    projectDescription: "",

    contractPrice: "",
    paymentTermsNotes: "",
    discountTerms: "",
    interestRate: "",

    permitsResponsibility: "",
    utilitiesProvision: "",
    accessNotes: "",
    financingNote: "",

    materialsStandardNote: "",
    materialsNonstandardNote: "",

    hazardousMaterialsNote: "",
    workAllowancesNote: "",
    contractChangesNote: "",
    scopeExclusionsNote: "",

    extraWorkNote: "",
    plumbingNote: "",
    electricalNote: "",
    plasterNote: "",
    excavationNote: "",
    termiteNote: "",

    debrisRemovalNote: "",
    delaysNote: "",

    insuranceNote: "",
    reconstructionTerminationPercent: "",

    workersCompNote: "",
    protectionOfPropertyNote: "",
    guaranteeNote: "",
    workStoppageNote: "",

    completionNoticeDays: "5",
    noticesNote: "",

    entireAgreementNote: "",
    governingLaw: "",

    correctiveWorkNote: "",
    disputeResolutionNote: "",
    attorneysFeesNote: "",

    ownerSignName: "",
    ownerSignDate: "",
    contractorSignName: "",
    contractorSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 12;
    let y = margin;

    const add = (text: string, size = 11, bold = false, center = false) => {
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
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight;
      });
    };

    add("HOME IMPROVEMENT CONTRACT", 14, true, true);
    add("\n");

    add("1. Parties and Licensing", 12, true);
    add(`This Home Improvement Contract (\u201cContract\u201d) is entered into between the Owner (\u201cOwner\u201d) and the Contractor (\u201cContractor\u201d). The Contractor warrants that it holds a valid and current license issued by the appropriate state licensing authority, bearing license number ${formData.licenseNumber || "________________"}.`);
    add("\n");

    add("2. Project Address and Description", 12, true);
    add("The Contract specifies the project address as follows:");
    add(`${formData.projectAddress || "__________________________________________"}`);
    add("\n");
    add("A brief description of the work to be performed is described here as");
    add(`${formData.projectDescription || "............................."}`);
    add("\n");

    add("3. Payment Terms", 12, true);
    add(`${formData.paymentTermsNotes || "The Owner shall pay the Contractor the Contract Price in consideration for completion of the services described herein. Payments shall be made upon completion of the agreed work, unless otherwise specified. Discounts shall apply only if payment is made within the time frame stated in this Contract. Invoices not paid when due may accrue interest at the maximum rate permitted by law, and the delinquent party shall be responsible for all collection costs, including reasonable attorneys\u2019 fees. Nonpayment shall constitute a material breach, entitling the non-breaching party to cancel this Contract and pursue all available legal remedies."}`);
    if (formData.contractPrice) add(`Contract Price: ${formData.contractPrice}`);
    if (formData.discountTerms) add(`Discount terms: ${formData.discountTerms}`);
    if (formData.interestRate) add(`Interest rate: ${formData.interestRate}`);
    add("\n");

    add("4. Drawings, Specifications, and Permits", 12, true);
    add(`${formData.permitsResponsibility || "All work shall conform to the plans and specifications contained in term 2 of the agreement. The Owner shall be solely responsible for obtaining and paying for all required permits, assessments, and utility connection charges. The Owner shall also identify property boundaries and provide boundary stakes when necessary. Any changes required by governmental authorities shall be at the Owner\u2019s expense unless otherwise agreed in writing."}`);
    add("\n");

    add("5. Utilities and Property Lines", 12, true);
    add(`${formData.utilitiesProvision || "The Owner shall provide, at the point of entry to the property, water, sewer, gas, and electric utilities required for the work. The Owner shall also provide access to drinking water, toilet facilities, and electricity for the Contractor\u2019s workers."}`);
    add("\n");

    add("6. Access to Work", 12, true);
    add(`${formData.accessNotes || "The Owner shall provide the Contractor and its authorized personnel with reasonable and free access to the worksite, including designated storage space, clear driveways, and a secured site. The Contractor shall not be liable for damage resulting from movement of its vehicles or equipment over the property. Denial of access during working hours shall constitute a breach by the Owner."}`);
    add("\n");

    add("7. Financing", 12, true);
    add(`${formData.financingNote || "The Owner shall secure and confirm adequate financing for the full performance of this Contract prior to commencement of the work."}`);
    add("\n");

    add("8. Materials", 12, true);
    add("(a) Standard Materials \u2013 The Contractor shall supply materials in accordance with mentioned work. Any substitutions shall be promptly communicated to and approved by the Owner.");
    add(`${formData.materialsStandardNote || ""}`);
    add("(b) Nonstandard Materials \u2013 Any deviation from the specified materials shall be authorized only by a written change order signed by both parties.");
    add(`${formData.materialsNonstandardNote || ""}`);
    add("\n");

    add("9. Hazardous Materials", 12, true);
    add(`${formData.hazardousMaterialsNote || "The Contractor shall not be responsible for the removal of hazardous materials unless expressly agreed. If hazardous materials are encountered, work shall cease in the affected area and the Owner shall be notified immediately."}`);
    add("\n");

    add("10. Work Allowances and Abnormal Conditions", 12, true);
    add(`${formData.workAllowancesNote || "Reasonable allowances for measurement tolerances shall apply. The Contractor shall not be responsible for concealed or unusual site conditions (e.g., unstable soil, excessive slope) unless expressly assumed in writing. Any such additional work shall be treated as extra work and compensated accordingly."}`);
    add("\n");

    add("11. Contract Changes", 12, true);
    add(`${formData.contractChangesNote || "No amendment, modification, or change order shall be valid unless made in writing and signed by both parties."}`);
    add("\n");

    add("12. Scope of Work", 12, true);
    add(`${formData.scopeExclusionsNote || "Unless expressly stated otherwise, the work does not include painting preparation, grading, retaining walls, gutter relocation, or similar work. Floor covering selection shall be at the Contractor\u2019s discretion unless otherwise specified."}`);
    add("\n");

    add("13. Extra Work", 12, true);
    add(`${formData.extraWorkNote || "No extra work shall be undertaken without the Owner\u2019s prior written consent. Such work shall be billed at agreed rates plus applicable overhead and profit."}`);
    add("\n");

    add("14. Plumbing", 12, true);
    add(`${formData.plumbingNote || "No alterations to plumbing, gas, waste, or water lines outside the building\u2019s foundation shall be included unless specifically provided. Work on cesspools or septic systems is excluded unless otherwise agreed."}`);
    add("\n");

    add("15. Electrical Service", 12, true);
    add(`${formData.electricalNote || "Unless expressly provided, no major changes to electrical service panels are included. Existing wiring in undisturbed areas shall remain in place; corrections required therein shall constitute extra work."}`);
    add("\n");

    add("16. Plaster", 12, true);
    add(`${formData.plasterNote || "Matching existing plaster textures and colors is not guaranteed due to inherent material and application differences."}`);
    add("\n");

    add("17. Excavation on Filled or Rocky Ground", 12, true);
    add(`${formData.excavationNote || "Excavation does not include removal of filled or unstable ground unless otherwise agreed. Such work shall be treated as extra work."}`);
    add("\n");

    add("18. Termite or Dry Rot Work", 12, true);
    add(`${formData.termiteNote || "Repairs for termite damage or dry rot are excluded unless expressly included in this Contract."}`);
    add("\n");

    add("19. Removal of Materials and Debris", 12, true);
    add(`${formData.debrisRemovalNote || "The Contractor shall remove all construction debris and leave the site broom clean upon completion unless otherwise directed by the Owner."}`);
    add("\n");

    add("20. Delays and Extra Time", 12, true);
    add(`${formData.delaysNote || "The Contractor shall diligently pursue the work but shall not be liable for delays caused by matters beyond its control, including but not limited to permit delays, financing issues, acts of God, severe weather, labor disputes, material shortages, Owner\u2019s nonpayment, governmental actions, or other force majeure events."}`);
    add("\n");

    add("21. Damage to Project and Insurance", 12, true);
    add(`${formData.insuranceNote || "Prior to commencement, the Owner shall obtain fire insurance with course of construction, vandalism, and malicious mischief coverage for no less than the Contract Price, naming the Contractor and subcontractors as additional insureds. If the Owner fails to obtain such coverage, the Contractor may procure it at the Owner\u2019s expense. In the event of damage or destruction, reconstruction shall constitute extra work. If reconstruction costs exceed 20% of the Contract Price, the Owner may terminate this Contract by paying the Contractor for completed work plus overhead and profit."}`);
    if (formData.reconstructionTerminationPercent)
      add(`Reconstruction termination threshold: ${formData.reconstructionTerminationPercent}%`);
    add("\n");

    add("22. Workers\u2019 Compensation", 12, true);
    add(`${formData.workersCompNote || "The Contractor shall maintain workers\u2019 compensation insurance for its employees. The Owner shall be responsible for insuring against injury to the Owner\u2019s own employees or invitees."}`);
    add("\n");

    add("23. Protection of Owner\u2019s Property", 12, true);
    add(`${formData.protectionOfPropertyNote || "The Owner shall remove or adequately protect personal property located at the jobsite. The Contractor shall not be liable for any damage to such items."}`);
    add("\n");

    add("24. Guarantee of Materials and Workmanship", 12, true);
    add(`${formData.guaranteeNote || "The Contractor\u2019s guarantee is limited to the extent of the warranties provided by the manufacturers or processors of the materials or equipment used."}`);
    add("\n");

    add("25. Work Stoppage", 12, true);
    add(`${formData.workStoppageNote || "If the Owner fails to make any payment when due, the Contractor may suspend work. If work remains suspended for 60 days, the Contractor may demand payment for completed work and stored materials, plus overhead and profit, and thereafter be relieved from further obligations. The Owner shall be responsible for protecting stored materials during any stoppage."}`);
    add("\n");

    add("26. Completion and Occupancy", 12, true);
    add(`Within ${formData.completionNoticeDays || "5"} (5) days of completion, the Owner shall execute and record a Notice of Completion. If the Owner fails to do so, the Contractor may execute it on the Owner\u2019s behalf. Occupancy or use of the premises shall be deemed acceptance and completion of the work.`);
    add("\n");

    add("27. Notices", 12, true);
    add(`${formData.noticesNote || "Notices under this Contract may be delivered personally or sent by mail or email to the addresses specified herein. Changes of address shall be provided in writing. Notices shall be deemed received one (1) day after mailing."}`);
    add("\n");

    add("28. Entire Agreement", 12, true);
    add(`${formData.entireAgreementNote || "This Contract, together with all schedules and written change orders, constitutes the entire agreement between the parties and supersedes all prior oral or written agreements. This Contract shall be governed by the laws of the State of"} ${formData.governingLaw || "__________"}.`);
    add("\n");

    add("29. Corrective Work", 12, true);
    add(`${formData.correctiveWorkNote || "Minor corrective work identified after occupancy shall be promptly performed without withholding payment. For corrective work exceeding one percent (1%) of the Contract Price, the Owner may withhold only the portion of payment necessary to complete such work."}`);
    add("\n");

    add("30. Dispute Resolution", 12, true);
    add(`${formData.disputeResolutionNote || "Any dispute arising under or in connection with this Contract shall be resolved by binding arbitration under the Construction Industry Arbitration Rules of the American Arbitration Association, unless the parties agree otherwise in writing. The arbitrator\u2019s decision shall be final and enforceable in any court of competent jurisdiction."}`);
    add("\n");

    add("31. Attorneys\u2019 Fees", 12, true);
    add(`${formData.attorneysFeesNote || "The prevailing party in any arbitration or legal action shall be entitled to recover reasonable attorneys\u2019 fees and costs."}`);
    add("\n");

    add("32. Execution", 12, true);
    add("This Contract shall become effective upon execution by both parties.");
    add("\n");

    add(`Owner: ${formData.ownerSignName || "___________________________"} (Name, Signature, Date: ${formData.ownerSignDate || "___________"})`);
    add(`\nContractor: ${formData.contractorSignName || "___________________________"} (Name, Signature, Date: ${formData.contractorSignDate || "___________"})`);

    doc.save("Home_Improvement_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & License</h3>
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Input name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />
              <Label>License Number</Label>
              <Input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Project</h3>
              <Label>Project Address</Label>
              <Input name="projectAddress" value={formData.projectAddress} onChange={handleChange} />
              <Label>Project Description</Label>
              <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} className="w-full p-2 border rounded" rows={6} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Permits</h3>
              <Label>Contract Price</Label>
              <Input name="contractPrice" value={formData.contractPrice} onChange={handleChange} />
              <Label>Payment Terms / Notes</Label>
              <textarea name="paymentTermsNotes" value={formData.paymentTermsNotes} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
              <Label>Discount Terms</Label>
              <Input name="discountTerms" value={formData.discountTerms} onChange={handleChange} />
              <Label>Interest Rate</Label>
              <Input name="interestRate" value={formData.interestRate} onChange={handleChange} />
              <Label>Permits Responsibility</Label>
              <textarea name="permitsResponsibility" value={formData.permitsResponsibility} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Site / Materials / Extra Work</h3>
              <Label>Utilities Provision</Label>
              <textarea name="utilitiesProvision" value={formData.utilitiesProvision} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Access Notes</Label>
              <textarea name="accessNotes" value={formData.accessNotes} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Materials - Standard Notes</Label>
              <textarea name="materialsStandardNote" value={formData.materialsStandardNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Materials - Nonstandard Notes</Label>
              <textarea name="materialsNonstandardNote" value={formData.materialsNonstandardNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Extra Work Note</Label>
              <textarea name="extraWorkNote" value={formData.extraWorkNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Specials & Cleanup</h3>
              <Label>Hazardous Materials Note</Label>
              <textarea name="hazardousMaterialsNote" value={formData.hazardousMaterialsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Debris Removal Note</Label>
              <textarea name="debrisRemovalNote" value={formData.debrisRemovalNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Delays / Force Majeure Note</Label>
              <textarea name="delaysNote" value={formData.delaysNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Insurance / Warranties</h3>
              <Label>Insurance Note</Label>
              <textarea name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Reconstruction Termination %</Label>
              <Input name="reconstructionTerminationPercent" value={formData.reconstructionTerminationPercent} onChange={handleChange} />
              <Label>Workers' Compensation Note</Label>
              <textarea name="workersCompNote" value={formData.workersCompNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Guarantee Note</Label>
              <textarea name="guaranteeNote" value={formData.guaranteeNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Completion / Notices / Boilerplate</h3>
              <Label>Completion Notice Days</Label>
              <Input name="completionNoticeDays" value={formData.completionNoticeDays} onChange={handleChange} />
              <Label>Notices Note</Label>
              <textarea name="noticesNote" value={formData.noticesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Corrective / Dispute / Execution</h3>
              <Label>Corrective Work Note</Label>
              <textarea name="correctiveWorkNote" value={formData.correctiveWorkNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Dispute Resolution Note</Label>
              <textarea name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Attorneys' Fees Note</Label>
              <textarea name="attorneysFeesNote" value={formData.attorneysFeesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 9:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Owner - Name (for signature)</Label>
              <Input name="ownerSignName" value={formData.ownerSignName} onChange={handleChange} />
              <Label>Owner - Date</Label>
              <Input name="ownerSignDate" value={formData.ownerSignDate} onChange={handleChange} />

              <Label>Contractor - Name (for signature)</Label>
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

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Home Improvement Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
