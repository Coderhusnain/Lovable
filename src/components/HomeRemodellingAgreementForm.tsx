import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  ownerName: string;
  contractorName: string;
  licenseState: string;
  licenseNumber: string;

  commencementDate: string;
  allowanceForDelayNote: string;

  drawingsNote: string;
  permitsCostsNote: string;

  utilitiesProvision: string;
  accessNotes: string;

  standardMaterialsNote: string;
  nonstandardMaterialsNote: string;

  hazardousMaterialsNote: string;
  workAllowancesNote: string;

  changeOrderNote: string;
  scopeExclusionsNote: string;
  extraWorkNote: string;

  plumbingNote: string;
  electricalNote: string;
  matchingFinishesNote: string;
  excavationNote: string;
  termiteNote: string;

  cleanupNote: string;
  extensionsNote: string;

  insuranceNote: string;
  workersCompNote: string;

  protectionNote: string;
  warrantyNote: string;

  workStoppageNote: string;
  completionNoticeDays: string;

  noticesNote: string;
  governingLaw: string;

  correctiveWorkNote: string;
  disputeResolutionNote: string;
  attorneysFeesNote: string;

  ownerSignName: string;
  ownerSignDate: string;
  contractorSignName: string;
  contractorSignDate: string;
}

export default function HomeRemodellingAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    contractorName: "",
    licenseState: "",
    licenseNumber: "",

    commencementDate: "",
    allowanceForDelayNote: "",

    drawingsNote: "",
    permitsCostsNote: "",

    utilitiesProvision: "",
    accessNotes: "",

    standardMaterialsNote: "",
    nonstandardMaterialsNote: "",

    hazardousMaterialsNote: "",
    workAllowancesNote: "",

    changeOrderNote: "",
    scopeExclusionsNote: "",
    extraWorkNote: "",

    plumbingNote: "",
    electricalNote: "",
    matchingFinishesNote: "",
    excavationNote: "",
    termiteNote: "",

    cleanupNote: "",
    extensionsNote: "",

    insuranceNote: "",
    workersCompNote: "",

    protectionNote: "",
    warrantyNote: "",

    workStoppageNote: "",
    completionNoticeDays: "5",

    noticesNote: "",
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
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 13;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const maxW = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, maxW);
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

    write("HOME REMODELLING AGREEMENT", 16, true, true);
    write("\n");

    write(`This Home Remodelling Agreement (\u201cAgreement\u201d) is made and entered into on the ${formData.commencementDate || "_____"} by and between:`);
    write(`Owner: ${formData.ownerName || "________________________"}`);
    write(`Contractor: ${formData.contractorName || "________________________"}`);
    write("\n");

    write("1. Licensing", 12, true);
    write(`The Contractor warrants that it holds a valid and subsisting license issued under the applicable laws and regulations of the State of ${formData.licenseState || "_____"}, authorizing it to perform the remodelling works described herein. The Contractor shall maintain such license in good standing throughout the duration of the Agreement. License No: ${formData.licenseNumber || "_____"}.`);
    write("\n");

    write("2. Time for Performance", 12, true);
    write(`The Contractor shall commence work on or before the date specified in agreement. Substantial commencement shall be deemed to occur upon mobilization of labor, materials, and equipment to the Worksite.`);
    write(`${formData.allowanceForDelayNote || "If the Contractor fails to commence within thirty (30) days of the specified date, the Owner may proportionally delay payment. Delays outside the Contractor's reasonable control—including but not limited to weather conditions, governmental orders, supply chain disruptions, or labor disputes—shall automatically extend completion deadlines."}`);
    write("\n");

    write("3. Drawings, Specifications, and Permits", 12, true);
    write(`${formData.drawingsNote || "All remodelling work shall be performed in accordance with the plans and specifications in agreement. The Contractor shall secure all necessary permits and approvals, while the Owner shall bear the costs of such permits and any governmental charges. The Owner shall also supply accurate property line data and boundary markers where applicable."}`);
    write("\n");

    write("4. Property Lines & Utilities", 12, true);
    write(`${formData.utilitiesProvision || "The Owner shall ensure that water, sewer, gas, and electricity are available at the property entry point. Drinking water, restroom access, and reasonable utilities for construction purposes shall be provided for the Contractor's workforce."}`);
    write("\n");

    write("5. Access to Work", 12, true);
    write(`${formData.accessNotes || "The Owner shall grant free and unobstructed access to the worksite during agreed working hours, ensure clear driveways, and provide safe storage areas for materials and tools. The Owner shall secure the property from unauthorized access. The Contractor shall store materials responsibly and take reasonable measures to prevent damage."}`);
    write("\n");

    write("6. Standard Materials", 12, true);
    write(`${formData.standardMaterialsNote || "All materials used shall conform to those specified in agreement. Substitutions shall require prior written consent from the Owner."}`);
    write("\n");

    write("7. Nonstandard Materials", 12, true);
    write(`${formData.nonstandardMaterialsNote || "Any deviation in quality, specifications, or color from the agreed design shall require a written agreement signed by both parties."}`);
    write("\n");

    write("8. Hazardous Materials", 12, true);
    write(`${formData.hazardousMaterialsNote || "The Contractor shall not be responsible for detecting, handling, or removing hazardous materials unless expressly agreed. Should such materials be encountered, work shall stop until the Owner engages qualified remediation services."}`);
    write("\n");

    write("9. Work Allowance & Abnormal Conditions", 12, true);
    write(`${formData.workAllowancesNote || "Reasonable dimensional variances are permitted. The Contractor shall not be responsible for poor soil conditions, concealed structural deficiencies, or unusual site conditions unless separately contracted as extra work."}`);
    write("\n");

    write("10. Change Orders", 12, true);
    write(`${formData.changeOrderNote || "All modifications to the remodelling scope shall be documented in a written Change Order signed by both parties, with associated costs borne by the Owner."}`);
    write("\n");

    write("11. Scope Exclusions", 12, true);
    write(`${formData.scopeExclusionsNote || "Unless expressly stated, the Agreement does not include painting, grading, landscaping, or unrelated structural alterations."}`);
    write("\n");

    write("12. Extra Work and Changes", 12, true);
    write(`${formData.extraWorkNote || "All extra work must be authorized in writing by the Owner and will be billed at the agreed rates plus overhead and profit."}`);
    write("\n");

    write("13. Plumbing", 12, true);
    write(`${formData.plumbingNote || "No alterations to plumbing, gas, waste, or water lines are included unless expressly specified."}`);
    write("\n");

    write("14. Electrical Service", 12, true);
    write(`${formData.electricalNote || "Electrical upgrades are limited to installing breakers or fuses necessary for new remodelling features unless otherwise specified."}`);
    write("\n");

    write("15. Matching Finishes", 12, true);
    write(`${formData.matchingFinishesNote || "The Contractor will advise the Owner on limitations in matching textures, colors, or finishes in remodelling works involving partial replacement."}`);
    write("\n");

    write("16. Filled Ground or Rock", 12, true);
    write(`${formData.excavationNote || "Excavation work does not include removal of rock, unstable soil, or filled ground unless agreed as extra work."}`);
    write("\n");

    write("17. Termite & Rot Repair", 12, true);
    write(`${formData.termiteNote || "Repairs for termite or dry rot damage are excluded unless treated as separately contracted work."}`);
    write("\n");

    write("18. Site Cleanup", 12, true);
    write(`${formData.cleanupNote || "The Contractor shall remove all debris and leave the site broom-clean, except for materials the Owner wishes to retain."}`);
    write("\n");

    write("19. Extensions of Time", 12, true);
    write(`${formData.extensionsNote || "Any delays caused by conditions beyond the Contractor\u2019s control—including weather, permit delays, strikes, or Owner-related issues—shall extend the completion schedule without penalty."}`);
    write("\n");

    write("20. Insurance Requirements", 12, true);
    write(`${formData.insuranceNote || "Before commencement, the Owner shall obtain fire and builder\u2019s risk insurance for at least the Contract Price, naming the Contractor as additional insured. If the Owner fails, the Contractor may obtain such coverage at the Owner\u2019s expense."}`);
    write("\n");

    write("21. Workers\u2019 Compensation", 12, true);
    write(`${formData.workersCompNote || "The Contractor shall maintain workers\u2019 compensation insurance for its employees. The Owner shall insure against injury to their own personnel or invitees."}`);
    write("\n");

    write("22. Protection of Property", 12, true);
    write(`${formData.protectionNote || "The Owner shall remove or protect personal property from the work area. The Contractor shall not be responsible for unprotected property damage."}`);
    write("\n");

    write("23. Warranty", 12, true);
    write(`${formData.warrantyNote || "The Contractor warrants workmanship against defects for the period specified in the agreement. Manufacturer warranties on materials will be transferred to the Owner."}`);
    write("\n");

    write("24. Work Stoppage", 12, true);
    write(`${formData.workStoppageNote || "The Contractor may halt work if payments are not made when due. If work remains halted for sixty (60) days, the Contractor may invoice for completed work and materials, plus profit, and terminate obligations under this Agreement."}`);
    write("\n");

    write("25. Completion and Occupancy", 12, true);
    write(`Upon completion, the Owner shall record a Notice of Completion within ${formData.completionNoticeDays || "5"} (5) days. If the Owner fails, the Contractor may do so. The Owner shall not occupy or use the remodelled area until full payment is made.`);
    write("\n");

    write("26. Notices", 12, true);
    write(`${formData.noticesNote || "All notices shall be in writing and delivered personally, by certified mail, or electronically to the addresses in this Agreement. Notices are deemed received one day after dispatch."}`);
    write("\n");

    write("27. Entire Agreement", 12, true);
    write(`${formData.governingLaw ? `This Agreement, together with all attached schedules, constitutes the entire agreement between the parties and is governed by the laws of the State of ${formData.governingLaw}.` : "This Agreement, together with all attached schedules, constitutes the entire agreement between the parties and is governed by the laws of the State of __________."}`);
    write("\n");

    write("28. Corrective Work", 12, true);
    write(`${formData.correctiveWorkNote || "Minor corrective work shall be completed promptly without withholding payment. For significant corrective work exceeding 1% of the Contract Price, the Owner may withhold only the amount necessary for completion."}`);
    write("\n");

    write("29. Dispute Resolution", 12, true);
    write(`${formData.disputeResolutionNote || "All disputes shall be resolved by binding arbitration under the Construction Industry Arbitration Rules of the American Arbitration Association, with the award being final and enforceable."}`);
    write("\n");

    write("30. Attorneys\u2019 Fees", 12, true);
    write(`${formData.attorneysFeesNote || "The prevailing party in arbitration or litigation shall be entitled to recover reasonable attorneys\u2019 fees and costs."}`);
    write("\n");

    write("31. Signatures", 12, true);
    write(`OWNER: ${formData.ownerSignName || "_________________________"} (Signature, Date: ${formData.ownerSignDate || "________"})`);
    write(`\nCONTRACTOR: ${formData.contractorSignName || "_________________________"} (Signature, Date: ${formData.contractorSignDate || "________"})`);

    doc.save("Home_Remodelling_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6" />
                <h3 className="font-semibold">Parties & Licensing</h3>
              </div>
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>License State</Label>
              <Input name="licenseState" value={formData.licenseState} onChange={handleChange} />
              <Label>License Number</Label>
              <Input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Timing & Permits</h3>
              <Label>Commencement / Agreement Date</Label>
              <Input name="commencementDate" value={formData.commencementDate} onChange={handleChange} />
              <Label>Delay & Extension Notes</Label>
              <Textarea name="allowanceForDelayNote" value={formData.allowanceForDelayNote} onChange={handleChange} />
              <Label>Drawings / Permits Note</Label>
              <Textarea name="drawingsNote" value={formData.drawingsNote} onChange={handleChange} />
              <Label>Permits / Costs Note</Label>
              <Textarea name="permitsCostsNote" value={formData.permitsCostsNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Site & Utilities</h3>
              <Label>Utilities Provision</Label>
              <Textarea name="utilitiesProvision" value={formData.utilitiesProvision} onChange={handleChange} />
              <Label>Access to Work Notes</Label>
              <Textarea name="accessNotes" value={formData.accessNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Materials & Changes</h3>
              <Label>Standard Materials Note</Label>
              <Textarea name="standardMaterialsNote" value={formData.standardMaterialsNote} onChange={handleChange} />
              <Label>Nonstandard Materials Note</Label>
              <Textarea name="nonstandardMaterialsNote" value={formData.nonstandardMaterialsNote} onChange={handleChange} />
              <Label>Change Orders</Label>
              <Textarea name="changeOrderNote" value={formData.changeOrderNote} onChange={handleChange} />
              <Label>Scope Exclusions</Label>
              <Textarea name="scopeExclusionsNote" value={formData.scopeExclusionsNote} onChange={handleChange} />
              <Label>Extra Work Note</Label>
              <Textarea name="extraWorkNote" value={formData.extraWorkNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Trades & Site Conditions</h3>
              <Label>Plumbing Note</Label>
              <Textarea name="plumbingNote" value={formData.plumbingNote} onChange={handleChange} />
              <Label>Electrical Note</Label>
              <Textarea name="electricalNote" value={formData.electricalNote} onChange={handleChange} />
              <Label>Matching Finishes Note</Label>
              <Textarea name="matchingFinishesNote" value={formData.matchingFinishesNote} onChange={handleChange} />
              <Label>Excavation / Filled Ground Note</Label>
              <Textarea name="excavationNote" value={formData.excavationNote} onChange={handleChange} />
              <Label>Termite / Rot Note</Label>
              <Textarea name="termiteNote" value={formData.termiteNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Cleanup, Delays & Insurance</h3>
              <Label>Site Cleanup Note</Label>
              <Textarea name="cleanupNote" value={formData.cleanupNote} onChange={handleChange} />
              <Label>Extensions / Delay Note</Label>
              <Textarea name="extensionsNote" value={formData.extensionsNote} onChange={handleChange} />
              <Label>Insurance Note</Label>
              <Textarea name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} />
              <Label>Workers' Compensation Note</Label>
              <Textarea name="workersCompNote" value={formData.workersCompNote} onChange={handleChange} />
              <Label>Protection of Property Note</Label>
              <Textarea name="protectionNote" value={formData.protectionNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranty / Stoppage / Completion</h3>
              <Label>Warranty Note</Label>
              <Textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} />
              <Label>Work Stoppage Note</Label>
              <Textarea name="workStoppageNote" value={formData.workStoppageNote} onChange={handleChange} />
              <Label>Completion Notice Days</Label>
              <Input name="completionNoticeDays" value={formData.completionNoticeDays} onChange={handleChange} />
              <Label>Notices Note</Label>
              <Textarea name="noticesNote" value={formData.noticesNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate</h3>
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Corrective Work Note</Label>
              <Textarea name="correctiveWorkNote" value={formData.correctiveWorkNote} onChange={handleChange} />
              <Label>Dispute Resolution Note</Label>
              <Textarea name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} />
              <Label>Attorneys' Fees Note</Label>
              <Textarea name="attorneysFeesNote" value={formData.attorneysFeesNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 9:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Owner - Name</Label>
              <Input name="ownerSignName" value={formData.ownerSignName} onChange={handleChange} />
              <Label>Owner - Date</Label>
              <Input name="ownerSignDate" value={formData.ownerSignDate} onChange={handleChange} />
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

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Home Remodelling Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
