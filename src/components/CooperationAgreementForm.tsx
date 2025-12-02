import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  firstPartyName: string;
  firstPartyAddress: string;
  secondPartyName: string;
  secondPartyAddress: string;
  termPeriod: string;
  earlyTerminationCureDays: string;
  purposeDescription: string;
  scheduleANote: string;
  scheduleBNote: string;
  scheduleCNote: string;
  firstPartyObligationsNote: string;
  secondPartyObligationsNote: string;
  confidentialityNote: string;
  confidentialityExceptionsNote: string;
  returnMaterialsNote: string;
  relationshipNote: string;
  considerationNote: string;
  representationsNote: string;
  defaultEventsNote: string;
  defaultCureDays: string;
  limitationOfLiabilityNote: string;
  indemnificationNote: string;
  forceMajeureNote: string;
  disputeResolutionNote: string;
  noticeProcedureNote: string;
  assignmentNote: string;
  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;
  waiverNote: string;
  governingLaw: string;
  firstPartySignName: string;
  firstPartySignTitle: string;
  firstPartySignDate: string;
  secondPartySignName: string;
  secondPartySignTitle: string;
  secondPartySignDate: string;
  witness1Name: string;
  witness1Id: string;
  witness1Date: string;
  witness2Name: string;
  witness2Id: string;
  witness2Date: string;
}

export default function CooperationAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    firstPartyName: "",
    firstPartyAddress: "",
    secondPartyName: "",
    secondPartyAddress: "",
    termPeriod: "",
    earlyTerminationCureDays: "30",
    purposeDescription: "",
    scheduleANote: "",
    scheduleBNote: "",
    scheduleCNote: "",
    firstPartyObligationsNote: "",
    secondPartyObligationsNote: "",
    confidentialityNote: "",
    confidentialityExceptionsNote: "",
    returnMaterialsNote: "",
    relationshipNote:
      "Nothing in this Agreement shall be deemed to create a partnership, joint venture, agency, or employment relationship between the Parties.",
    considerationNote: "",
    representationsNote: "",
    defaultEventsNote: "",
    defaultCureDays: "[Specify Number]",
    limitationOfLiabilityNote:
      "Neither Party shall be liable for indirect, incidental, consequential, special, or exemplary damages, including loss of revenue, anticipated profits, or business interruption.",
    indemnificationNote: "",
    forceMajeureNote:
      "Performance may be suspended or excused for events beyond a Party’s reasonable control (“Force Majeure”), including but not limited to acts of God, epidemics, pandemics, public health emergencies, war, terrorism, civil unrest, fire, explosion, strikes, or governmental actions.",
    disputeResolutionNote:
      "The Parties agree to first attempt resolution through negotiations, then mediation, and finally binding arbitration under the Commercial Arbitration Rules of [Specify Arbitration Body].",
    noticeProcedureNote:
      "Any notice required or permitted under this Agreement shall be delivered personally, by courier, or sent via certified mail (return receipt requested) to the addresses set forth above.",
    assignmentNote: "Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without prior written consent of the other Party.",
    entireAgreementNote:
      "This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements, promises, or representations relating to its subject matter.",
    severabilityNote: "",
    amendmentNote: "This Agreement may be modified, amended, or supplemented only by a written document executed by both Parties.",
    waiverNote: "",
    governingLaw: "",
    firstPartySignName: "",
    firstPartySignTitle: "",
    firstPartySignDate: "",
    secondPartySignName: "",
    secondPartySignTitle: "",
    secondPartySignDate: "",
    witness1Name: "",
    witness1Id: "",
    witness1Date: "",
    witness2Name: "",
    witness2Id: "",
    witness2Date: "",
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

    // === COOPERATION AGREEMENT CONTENT ===
    addText("COOPERATION AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Cooperation Agreement (the "Agreement") is entered into as of ${formData.effectiveDate || "[Effective Date]"} (the "Effective Date") by and between:`
    );
    addText(`• ${formData.firstPartyName || "[First Party Name]"}, having its principal place of business at ${formData.firstPartyAddress || "[Address]"} (hereinafter referred to as the "First Party");`);
    addText(`• ${formData.secondPartyName || "[Second Party Name]"}, having its principal place of business at ${formData.secondPartyAddress || "[Address]"} (hereinafter referred to as the "Second Party").`);
    addText("Collectively, the First Party and Second Party are hereinafter referred to as the \"Parties\" and individually as a \"Party.\"");
    addText("\n");

    addText("1. TERM OF AGREEMENT");
    addText(`1.1 Duration`);
    addText(`${formData.termPeriod || "[Specify Period]"}`);
    addText("\n1.2 Early Termination");
    addText(
      `Either Party may terminate this Agreement in the event of a material breach by the other Party that is not remedied within ${formData.earlyTerminationCureDays || "30"} days following written notice of such breach. Termination of a portion of this Agreement shall not affect obligations under other provisions unless the breach materially deprives the non-breaching Party of substantially all benefits of this Agreement. Termination shall not relieve the Parties from obligations regarding confidentiality or other restrictive covenants.`
    );
    addText("\n");

    addText("2. PURPOSE AND OBJECTIVES");
    addText(`The Parties agree to cooperate in connection with ${formData.purposeDescription || "[describe specific purpose, project, or business collaboration]"}. The objectives of this Agreement are to:`);
    addText("• Define the scope of collaboration.");
    addText("• Allocate responsibilities and obligations between the Parties.");
    addText("• Establish mechanisms for information sharing, confidentiality, and dispute resolution.");
    if (formData.scheduleANote) addText(`Schedule A: ${formData.scheduleANote}`);
    if (formData.scheduleBNote) addText(`Schedule B: ${formData.scheduleBNote}`);
    if (formData.scheduleCNote) addText(`Schedule C: ${formData.scheduleCNote}`);
    addText("\n");

    addText("3. OBLIGATIONS OF THE PARTIES");
    addText("3.1 First Party Responsibilities");
    addText(formData.firstPartyObligationsNote || "• Perform and deliver the services and duties outlined in Schedule A attached hereto.\n• Comply with all applicable laws, regulations, and standards.\n• Provide timely reports, updates, and requested information to the Second Party.");
    addText("\n3.2 Second Party Responsibilities");
    addText(formData.secondPartyObligationsNote || "• Perform and deliver the services and duties outlined in Schedule B attached hereto.\n• Cooperate fully with the First Party to achieve the objectives of this Agreement.\n• Maintain accurate records of all activities related to the collaboration and make them available for inspection upon request.");
    addText("\n");

    addText("4. EXCHANGE OF INFORMATION AND CONFIDENTIALITY");
    addText("4.1 Confidentiality Obligations");
    addText(formData.confidentialityNote || "Each Party acknowledges that it may receive confidential, proprietary, or sensitive information from the other Party (“Confidential Information”). Each Party agrees to:\n• Maintain such information in strict confidence.\n• Use the Confidential Information solely for the purposes of this Agreement.\n• Take all reasonable measures to prevent disclosure to third parties.");
    addText("\n4.2 Exceptions");
    addText(formData.confidentialityExceptionsNote || "Confidentiality shall not apply to information that:\n• Is publicly available through no fault of the receiving Party;\n• Is lawfully obtained from a third party without restriction;\n• Is required to be disclosed by law or government authority, provided the other Party is notified promptly.");
    addText("\n4.3 Return of Materials");
    addText(formData.returnMaterialsNote || "Upon request, all Confidential Information, materials, and documentation must be returned to the disclosing Party or destroyed, with confirmation in writing.");
    addText("\n");

    addText("5. RELATIONSHIP OF THE PARTIES");
    addText(formData.relationshipNote);
    addText("\n");

    addText("6. CONSIDERATION");
    addText(formData.considerationNote || "This Agreement is made in consideration of the mutual covenants, promises, and obligations contained herein and any additional consideration set forth in Schedule C, which the Parties acknowledge as sufficient and adequate.");
    addText("\n");

    addText("7. REPRESENTATIONS AND WARRANTIES");
    addText(formData.representationsNote || "Each Party represents and warrants that:\n• It has full legal power, authority, and capacity to enter into and perform this Agreement.\n• All necessary corporate or internal approvals have been obtained.\n• This Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms.\n• It shall act in good faith to fulfill the purposes and objectives of this Agreement.");
    addText("\n");

    addText("8. DEFAULT AND REMEDIES");
    addText("8.1 Events of Default");
    addText(
      formData.defaultEventsNote ||
        "A material default shall occur if a Party:\n• Fails to make required payments when due;\n• Becomes insolvent, bankrupt, or subject to receivership;\n• Has its property seized, levied upon, or assigned for creditor benefit;\n• Fails to deliver or perform the Services in accordance with the terms of this Agreement."
    );
    addText("\n8.2 Cure Period and Remedies");
    addText(
      `The non-defaulting Party may provide written notice specifying the default. The defaulting Party shall have ${formData.defaultCureDays || "[Specify Number]"} days from receipt of such notice to cure the default. If uncured, the non-defaulting Party may terminate this Agreement and pursue any other remedies available under law or equity.`
    );
    addText("\n");

    addText("9. LIMITATION OF LIABILITY");
    addText(formData.limitationOfLiabilityNote);
    addText("\n");

    addText("10. INDEMNIFICATION");
    addText(formData.indemnificationNote || "Each Party shall indemnify, defend, and hold harmless the other Party, its affiliates, officers, directors, employees, and agents against any third-party claims, liabilities, damages, losses, costs, or expenses arising out of or relating to:\n• Breach of this Agreement;\n• Negligence, willful misconduct, or fraud;\n• Violation of applicable laws or regulations.");
    addText("\n");

    addText("11. FORCE MAJEURE");
    addText(formData.forceMajeureNote);
    addText("\n");

    addText("12. DISPUTE RESOLUTION AND ARBITRATION");
    addText(formData.disputeResolutionNote);
    addText("\n");

    addText("13. NOTICE");
    addText(formData.noticeProcedureNote);
    addText("\n");

    addText("14. ASSIGNMENT");
    addText(formData.assignmentNote);
    addText("\n");

    addText("15. ENTIRE AGREEMENT");
    addText(formData.entireAgreementNote);
    addText("\n");

    addText("16. SEVERABILITY");
    addText(formData.severabilityNote || "If any provision of this Agreement is found invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall remain in full force and effect. The invalid provision shall, where possible, be construed or limited to make it valid and enforceable.");
    addText("\n");

    addText("17. AMENDMENT");
    addText(formData.amendmentNote);
    addText("\n");

    addText("18. WAIVER");
    addText(formData.waiverNote || "Failure to enforce any provision of this Agreement shall not constitute a waiver of any Party’s right to subsequently enforce strict compliance with that or any other provision.");
    addText("\n");

    addText("19. GOVERNING LAW");
    addText(`This Agreement shall be governed, construed, and enforced in accordance with the laws of ${formData.governingLaw || "[Specify Jurisdiction]"}, without regard to conflict of laws principles.`);
    addText("\n");

    addText("20. SIGNATORIES");
    addText("IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Cooperation Agreement as of the Effective Date.");
    addText("\nFIRST PARTY");
    addText(`Name: ${formData.firstPartySignName || "__________________________"}`);
    addText(`Title: ${formData.firstPartySignTitle || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.firstPartySignDate || "__________________________"}`);
    addText("\nSECOND PARTY");
    addText(`Name: ${formData.secondPartySignName || "__________________________"}`);
    addText(`Title: ${formData.secondPartySignTitle || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.secondPartySignDate || "__________________________"}`);
    addText("\nWITNESSES");
    addText(`1. Name: ${formData.witness1Name || "__________________________"}`);
    addText(`CNIC/ID No.: ${formData.witness1Id || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.witness1Date || "__________________________"}`);
    addText(`\n2. Name: ${formData.witness2Name || "__________________________"}`);
    addText(`CNIC/ID No.: ${formData.witness2Id || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.witness2Date || "__________________________"}`);

    // Save file
    doc.save("Cooperation_Agreement.pdf");
    setPdfGenerated(true);
    setStep(6);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Term</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>First Party Name</Label>
              <Input name="firstPartyName" value={formData.firstPartyName} onChange={handleChange} />
              <Label>First Party Address</Label>
              <Input name="firstPartyAddress" value={formData.firstPartyAddress} onChange={handleChange} />
              <Label>Second Party Name</Label>
              <Input name="secondPartyName" value={formData.secondPartyName} onChange={handleChange} />
              <Label>Second Party Address</Label>
              <Input name="secondPartyAddress" value={formData.secondPartyAddress} onChange={handleChange} />
              <Label>Term / Duration</Label>
              <Input name="termPeriod" value={formData.termPeriod} onChange={handleChange} />
              <Label>Early Termination Cure Days</Label>
              <Input name="earlyTerminationCureDays" value={formData.earlyTerminationCureDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Purpose & Obligations</h3>
              <Label>Purpose / Project Description</Label>
              <textarea
                name="purposeDescription"
                value={formData.purposeDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Schedule A (First Party duties)</Label>
              <textarea name="scheduleANote" value={formData.scheduleANote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Schedule B (Second Party duties)</Label>
              <textarea name="scheduleBNote" value={formData.scheduleBNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Schedule C (Consideration)</Label>
              <textarea name="scheduleCNote" value={formData.scheduleCNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>First Party Obligations (custom)</Label>
              <textarea name="firstPartyObligationsNote" value={formData.firstPartyObligationsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Second Party Obligations (custom)</Label>
              <textarea name="secondPartyObligationsNote" value={formData.secondPartyObligationsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Confidentiality & Relationship</h3>
              <Label>Confidentiality Obligations (custom)</Label>
              <textarea name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
              <Label>Confidentiality Exceptions</Label>
              <textarea name="confidentialityExceptionsNote" value={formData.confidentialityExceptionsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Return of Materials</Label>
              <Input name="returnMaterialsNote" value={formData.returnMaterialsNote} onChange={handleChange} />
              <Label>Relationship of the Parties (custom)</Label>
              <Input name="relationshipNote" value={formData.relationshipNote} onChange={handleChange} />
              <Label>Consideration / Schedule C note</Label>
              <Input name="considerationNote" value={formData.considerationNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Defaults, Liability & Indemnity</h3>
              <Label>Representations & Warranties (custom)</Label>
              <textarea name="representationsNote" value={formData.representationsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Events of Default (custom or leave standard)</Label>
              <textarea name="defaultEventsNote" value={formData.defaultEventsNote} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
              <Label>Limitation of Liability Note</Label>
              <Input name="limitationOfLiabilityNote" value={formData.limitationOfLiabilityNote} onChange={handleChange} />
              <Label>Indemnification Note</Label>
              <textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Force Majeure Note</Label>
              <textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Dispute Resolution Note</Label>
              <Input name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate, Notices & Signatures</h3>
              <Label>Notice Procedure</Label>
              <textarea name="noticeProcedureNote" value={formData.noticeProcedureNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Assignment Note</Label>
              <Input name="assignmentNote" value={formData.assignmentNote} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">First Party Signatory</h4>
              <Label>Name</Label>
              <Input name="firstPartySignName" value={formData.firstPartySignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="firstPartySignTitle" value={formData.firstPartySignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="firstPartySignDate" value={formData.firstPartySignDate} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Second Party Signatory</h4>
              <Label>Name</Label>
              <Input name="secondPartySignName" value={formData.secondPartySignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="secondPartySignTitle" value={formData.secondPartySignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="secondPartySignDate" value={formData.secondPartySignDate} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Witnesses</h4>
              <Label>Witness 1 Name</Label>
              <Input name="witness1Name" value={formData.witness1Name} onChange={handleChange} />
              <Label>Witness 1 CNIC/ID</Label>
              <Input name="witness1Id" value={formData.witness1Id} onChange={handleChange} />
              <Label>Witness 1 Date</Label>
              <Input name="witness1Date" value={formData.witness1Date} onChange={handleChange} />
              <Label>Witness 2 Name</Label>
              <Input name="witness2Name" value={formData.witness2Name} onChange={handleChange} />
              <Label>Witness 2 CNIC/ID</Label>
              <Input name="witness2Id" value={formData.witness2Id} onChange={handleChange} />
              <Label>Witness 2 Date</Label>
              <Input name="witness2Date" value={formData.witness2Date} onChange={handleChange} />
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

        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 6 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Cooperation Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
