import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  principalName: string;
  principalAddress: string;
  contractDate: string;
  ownerName: string;
  ownerAddress: string;
  projectDescription: string;
  legalDescription: string;
  suretyName: string;
  suretyState: string;
  suretyAddress: string;
  penalSum: string;
  bondObligationsNote: string;
  defaultActionsNote: string;
  ownerDefaultNote: string;
  liabilityCompletionNote: string;
  liabilityDamagesNote: string;
  liabilityAdditionalCostsNote: string;
  modificationNoticeNote: string;
  modificationThresholdPercent: string;
  forceMajeureNote: string;
  thirdPartyRightsNote: string;
  timeLimitationYears: string;
  governingLawNote: string;
  noticesProcedureNote: string;
  severabilityNote: string;
  principalSignName: string;
  principalSignTitle: string;
  principalSignDate: string;
  principalSignAddress: string;
  suretySignName: string;
  suretySignTitle: string;
  suretySignDate: string;
  suretySignAddress: string;
  ownerSignName: string;
  ownerSignTitle: string;
  ownerSignDate: string;
  ownerSignAddress: string;
}

export default function ConstructionPerformanceBondForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    principalName: "",
    principalAddress: "",
    contractDate: "",
    ownerName: "",
    ownerAddress: "",
    projectDescription: "",
    legalDescription: "",
    suretyName: "",
    suretyState: "",
    suretyAddress: "",
    penalSum: "$0.00",
    bondObligationsNote: "",
    defaultActionsNote: "",
    ownerDefaultNote: "",
    liabilityCompletionNote: "",
    liabilityDamagesNote: "",
    liabilityAdditionalCostsNote: "",
    modificationNoticeNote: "",
    modificationThresholdPercent: "10",
    forceMajeureNote: "",
    thirdPartyRightsNote: "",
    timeLimitationYears: "2",
    governingLawNote: "",
    noticesProcedureNote:
      "All notices or communications required under this Bond shall be in writing and delivered personally or sent via certified mail to the respective parties at the addresses listed on the signature page or as otherwise specified in the Construction Contract.",
    severabilityNote: "",
    principalSignName: "",
    principalSignTitle: "",
    principalSignDate: "",
    principalSignAddress: "",
    suretySignName: "",
    suretySignTitle: "",
    suretySignDate: "",
    suretySignAddress: "",
    ownerSignName: "",
    ownerSignTitle: "",
    ownerSignDate: "",
    ownerSignAddress: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
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
          const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // === CONSTRUCTION PERFORMANCE BOND CONTENT ===
    addText("CONSTRUCTION PERFORMANCE BOND", 14, true, true);
    addText("\n");
    addText(`Date: ${formData.date || "___________"}`);
    addText("\n");
    addText("KNOW ALL PERSONS BY THESE PRESENTS:");
    addText(
      `That ${formData.principalName || "[Principal Name]"}, of ${formData.principalAddress || "[Principal Address]"} (hereinafter referred to as the \"Principal\"), having entered into a written agreement dated ${formData.contractDate || "[Contract Date]"} with ${formData.ownerName || "[Owner Name]"}, of ${formData.ownerAddress || "[Owner Address]"} (hereinafter referred to as the \"Owner\"), for the construction of ${formData.projectDescription || "[Project Description]"}, located on the property legally described as ${formData.legalDescription || "[Legal Description]"}, and all documents forming part of or attached to said agreement (hereinafter referred to as the “Contract”), which are hereby incorporated by reference,`
    );
    addText("\nNOW THEREFORE, we, the Principal, and " + (formData.suretyName || "[Surety Name]") + `, a corporation duly organized and existing under the laws of the State of ${formData.suretyState || "[State]"}, with its principal office located at ${formData.suretyAddress || "[Surety Address]"}, and authorized to transact surety business in the State of ${formData.suretyState || "[State]"} (hereinafter referred to as the "Surety"), are held and firmly bound unto the Owner in the penal sum of ${formData.penalSum || "$0.00"} (the “Penal Sum”), in lawful money of the United States, for which payment we, the Principal and the Surety, bind ourselves, our heirs, legal representatives, successors, and assigns, jointly and severally.`);
    addText("\n");

    addText("1. Bond Obligations");
    addText(
      `The Principal and Surety, jointly and severally, bind themselves to the Owner for the full and proper performance of the Construction Contract. If the Principal performs and fulfills all covenants, conditions, and obligations as required under the Contract, then this obligation shall be null and void. Otherwise, it shall remain in full force and effect.`
    );
    if (formData.bondObligationsNote) addText(formData.bondObligationsNote);
    addText("\n");

    addText("2. Default by the Principal");
    addText("Upon the Principal’s default under the Contract, as declared by the Owner, the Surety shall promptly take one of the following actions:");
    addText(
      formData.defaultActionsNote ||
        "a) Undertake and complete the Contract in accordance with its terms and conditions; or\nb) Arrange for performance by a qualified contractor, in which event the Surety or the substitute contractor shall be subrogated to all the rights of the Principal under the Contract."
    );
    addText("\n");

    addText("3. Default by the Owner");
    addText(
      formData.ownerDefaultNote ||
        "In the event the Owner materially defaults on its obligations under the Contract, the Surety shall be released from any further liability or obligations under this Bond."
    );
    addText("\n");

    addText("4. Monetary Liability of the Surety (Penal Sum)");
    addText("The Surety’s liability shall not exceed the Penal Sum specified herein. Within this limit, the Surety shall be liable for:");
    addText(
      formData.liabilityCompletionNote ||
        "a) Completion of the construction and correction of defective work in accordance with the Contract;"
    );
    addText(formData.liabilityDamagesNote || "b) Payment of liquidated damages or, where not specified, actual damages resulting from non-performance, including back charges, offsets, indemnities, or any other damages recoverable from the Principal;");
    addText(formData.liabilityAdditionalCostsNote || "c) Any additional legal, design, or delay costs arising due to the Principal’s default or the Surety’s failure to act.");
    addText("\n");

    addText("5. Contract Modifications");
    addText(
      formData.modificationNoticeNote ||
        "The Principal shall provide the Surety with written notice of any material modifications to the Contract, including changes to drawings or specifications, prior to the commencement of work under such modifications."
    );
    addText(
      `The Surety reserves the right, in its sole discretion, to disapprove any modifications that would, individually or cumulatively, increase the Contract cost by more than ${formData.modificationThresholdPercent || "10"} percent (10%).`
    );
    addText("\n");

    addText("6. Force Majeure");
    addText(
      formData.forceMajeureNote ||
        "The Surety shall not be liable for any failure to perform obligations under this Bond due to events beyond its reasonable control, including but not limited to:"
    );
    if (!formData.forceMajeureNote) {
      addText("• Acts of God");
      addText("• Epidemics, pandemics, or public health emergencies");
      addText("• Quarantine restrictions");
      addText("• Fire, explosion, vandalism, or storm damage");
      addText("• Acts of civil or military authority");
      addText("• National emergencies, riots, wars, labor disputes, or material shortages");
    }
    addText("\n");

    addText("7. Third-Party Rights");
    addText(
      formData.thirdPartyRightsNote ||
        "No rights shall accrue under this Bond to any person, firm, or entity other than the Owner, its successors, or assigns."
    );
    addText("\n");

    addText("8. Time Limitation on Claims");
    addText(
      `No action or proceeding shall be maintained under this Bond unless commenced within ${formData.timeLimitationYears || "2"} (${formData.timeLimitationYears || "2"}) years following the completion of the construction work.`
    );
    addText("\n");

    addText("9. Governing Law and Jurisdiction");
    addText(
      formData.governingLawNote ||
        "Any legal or equitable proceedings arising under or in connection with this Bond may be instituted:\n• In any court of competent jurisdiction where proceedings related to the Contract are pending;\n• In the courts of the State of [Insert State]; or\n• In the jurisdiction in which the construction work was performed."
    );
    addText("\n");

    addText("10. Notices");
    addText(`${formData.noticesProcedureNote}`);
    addText("\n");

    addText("11. Severability");
    addText(
      formData.severabilityNote ||
        "If any provision of this Bond is inconsistent with applicable statutory or regulatory requirements, such provision shall be deemed modified to conform thereto. All other provisions shall remain in full force and effect."
    );
    addText("\n");

    addText("12. Execution");
    addText("IN WITNESS WHEREOF, the Parties have caused this Bond to be executed by their duly authorized representatives on the dates set forth below.");
    addText("\nPrincipal:");
    addText("By: ___________________________");
    addText(`Name: ${formData.principalSignName || "_______________________"}`);
    addText(`Title: ${formData.principalSignTitle || "________________________"}`);
    addText(`Date: ${formData.principalSignDate || "________________________"}`);
    addText(`Address: ${formData.principalSignAddress || "_____________________"}`);
    addText("\nSurety:");
    addText("By: ___________________________");
    addText(`Name: ${formData.suretySignName || "_______________________"}`);
    addText(`Title: ${formData.suretySignTitle || "________________________"}`);
    addText(`Date: ${formData.suretySignDate || "________________________"}`);
    addText(`Address: ${formData.suretySignAddress || "_____________________"}`);
    addText("\nOwner:");
    addText("By: ___________________________");
    addText(`Name: ${formData.ownerSignName || "_______________________"}`);
    addText(`Title: ${formData.ownerSignTitle || "________________________"}`);
    addText(`Date: ${formData.ownerSignDate || "________________________"}`);
    addText(`Address: ${formData.ownerSignAddress || "_____________________"}`);

    // Save file
    doc.save("Construction_Performance_Bond.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Contract</h3>
              <Label>Date</Label>
              <Input name="date" value={formData.date} onChange={handleChange} />
              <Label>Principal Name</Label>
              <Input name="principalName" value={formData.principalName} onChange={handleChange} />
              <Label>Principal Address</Label>
              <Input name="principalAddress" value={formData.principalAddress} onChange={handleChange} />
              <Label>Contract Date</Label>
              <Input name="contractDate" value={formData.contractDate} onChange={handleChange} />
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
              <Label>Project Description</Label>
              <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Legal Description (property)</Label>
              <textarea name="legalDescription" value={formData.legalDescription} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Surety & Obligations</h3>
              <Label>Surety Name</Label>
              <Input name="suretyName" value={formData.suretyName} onChange={handleChange} />
              <Label>Surety State</Label>
              <Input name="suretyState" value={formData.suretyState} onChange={handleChange} />
              <Label>Surety Address</Label>
              <Input name="suretyAddress" value={formData.suretyAddress} onChange={handleChange} />
              <Label>Penal Sum</Label>
              <Input name="penalSum" value={formData.penalSum} onChange={handleChange} />
              <Label>Bond Obligations Note (optional)</Label>
              <textarea name="bondObligationsNote" value={formData.bondObligationsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Default Actions (custom or leave standard)</Label>
              <textarea name="defaultActionsNote" value={formData.defaultActionsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Owner Default Note (optional)</Label>
              <textarea name="ownerDefaultNote" value={formData.ownerDefaultNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Liability, Mods & Force Majeure</h3>
              <Label>Liability - Completion Note</Label>
              <Input name="liabilityCompletionNote" value={formData.liabilityCompletionNote} onChange={handleChange} />
              <Label>Liability - Damages Note</Label>
              <Input name="liabilityDamagesNote" value={formData.liabilityDamagesNote} onChange={handleChange} />
              <Label>Liability - Additional Costs Note</Label>
              <Input name="liabilityAdditionalCostsNote" value={formData.liabilityAdditionalCostsNote} onChange={handleChange} />
              <Label>Modification Notice Note</Label>
              <Input name="modificationNoticeNote" value={formData.modificationNoticeNote} onChange={handleChange} />
              <Label>Modification Threshold %</Label>
              <Input name="modificationThresholdPercent" value={formData.modificationThresholdPercent} onChange={handleChange} />
              <Label>Force Majeure Note (optional)</Label>
              <textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Third-Party Rights Note (optional)</Label>
              <Input name="thirdPartyRightsNote" value={formData.thirdPartyRightsNote} onChange={handleChange} />
              <Label>Time Limitation on Claims (years)</Label>
              <Input name="timeLimitationYears" value={formData.timeLimitationYears} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Notices, Boilerplate & Signatures</h3>
              <Label>Governing Law / Jurisdiction Note</Label>
              <Input name="governingLawNote" value={formData.governingLawNote} onChange={handleChange} />
              <Label>Notices Procedure</Label>
              <textarea name="noticesProcedureNote" value={formData.noticesProcedureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Principal Signature</h4>
              <Label>Name</Label>
              <Input name="principalSignName" value={formData.principalSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="principalSignTitle" value={formData.principalSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="principalSignDate" value={formData.principalSignDate} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="principalSignAddress" value={formData.principalSignAddress} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Surety Signature</h4>
              <Label>Name</Label>
              <Input name="suretySignName" value={formData.suretySignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="suretySignTitle" value={formData.suretySignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="suretySignDate" value={formData.suretySignDate} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="suretySignAddress" value={formData.suretySignAddress} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Owner Signature</h4>
              <Label>Name</Label>
              <Input name="ownerSignName" value={formData.ownerSignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="ownerSignTitle" value={formData.ownerSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="ownerSignDate" value={formData.ownerSignDate} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="ownerSignAddress" value={formData.ownerSignAddress} onChange={handleChange} />
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

        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 5 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Construction Performance Bond PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
