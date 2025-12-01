import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  ownerName: string;
  ownerAddress: string;
  managerName: string;
  managerAddress: string;
  projectDescription: string;
  projectLocation: string;
  dutiesNote: string; // optional summary or extra duties
  planningHoursPerWeek: string;
  constructionHoursPerWeek: string;
  compensationRate: string;
  recordKeepingNote: string;
  termEndDate: string;
  indemnityNote: string;
  errorsOmissionsInsuranceNote: string;
  debrisCleanlinessNote: string;
  defaultEventsNote: string;
  cureDays: string;
  remediesNote: string;
  forceMajeureNote: string;
  arbitrationLocation: string;
  arbitrationDocsDays: string;
  arbitrationNotes: string;
  governingState: string;
  amendmentNote: string;
  bindingEffectNote: string;
  attorneysFeesNote: string;
  noticesProcedureNote: string;
  waiverNote: string;
  severabilityNote: string;
  entireAgreementNote: string;
  ownerSignName: string;
  ownerSignTitle: string;
  ownerSignDate: string;
  managerSignName: string;
  managerSignTitle: string;
  managerSignDate: string;
}

export default function ConstructionManagementAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    ownerName: "",
    ownerAddress: "",
    managerName: "",
    managerAddress: "",
    projectDescription: "",
    projectLocation: "",
    dutiesNote: "",
    planningHoursPerWeek: "",
    constructionHoursPerWeek: "",
    compensationRate: "",
    recordKeepingNote: "",
    termEndDate: "",
    indemnityNote: "",
    errorsOmissionsInsuranceNote: "",
    debrisCleanlinessNote: "",
    defaultEventsNote: "",
    cureDays: "30",
    remediesNote: "",
    forceMajeureNote: "",
    arbitrationLocation: "",
    arbitrationDocsDays: "30",
    arbitrationNotes: "",
    governingState: "",
    amendmentNote: "",
    bindingEffectNote: "",
    attorneysFeesNote: "",
    noticesProcedureNote:
      "All notices required under this Agreement shall be in writing and delivered personally or sent by certified mail, return receipt requested, to the addresses of the Parties as set forth above, or as subsequently modified in writing.",
    waiverNote: "",
    severabilityNote: "",
    entireAgreementNote: "",
    ownerSignName: "",
    ownerSignTitle: "",
    ownerSignDate: "",
    managerSignName: "",
    managerSignTitle: "",
    managerSignDate: "",
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

    // === CONSTRUCTION MANAGEMENT AGREEMENT CONTENT ===
    addText("CONSTRUCTION MANAGEMENT AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Construction Management Agreement (the “Agreement”) is made and entered into as of ${formData.date || "[Date]"}, by and between:`
    );
    addText(`${formData.ownerName || "[Owner Name]"}, of ${formData.ownerAddress || "[Owner Address]"} (hereinafter referred to as the "Owner"),`);
    addText("\nAND");
    addText(`${formData.managerName || "[Manager Name]"}, of ${formData.managerAddress || "[Manager Address]"} (hereinafter referred to as the "Manager").`);
    addText("\nCollectively referred to as the “Parties” and individually as a “Party.”");
    addText("\n");

    addText("RECITALS");
    addText(
      `WHEREAS, the Owner intends to construct ${formData.projectDescription || "[Project Description]"} (the “Project”) and desires to engage the Manager to render general construction management services in connection therewith; and`
    );
    addText(
      `WHEREAS, the Manager possesses expertise and experience in managing construction projects and is willing to undertake the management of the Project;`
    );
    addText("NOW, THEREFORE, in consideration of the mutual covenants and promises set forth herein, and intending to be legally bound, the Parties agree as follows:");
    addText("\n");

    addText("1. Management of the Project");
    addText(
      `The Owner hereby appoints the Manager to act as the construction manager for the Project, to be located at ${formData.projectLocation || "[Project Location]"}, and the Manager accepts such engagement under the terms and conditions set forth in this Agreement.`
    );
    addText("\n");

    addText("2. Duties of the Manager");
    addText(
      "The Manager shall, in a diligent and professional manner, perform the following services, including but not limited to:"
    );
    addText(
      `a. Advising and consulting with the Owner on all matters relating to the Project, including evaluation of environmentally sustainable (“green”) alternatives proposed by the architect;`
    );
    addText(
      `b. Reviewing contracts and agreements the Owner intends to execute in connection with the Project;`
    );
    addText(
      `c. Assisting with the preparation of budgets, cost estimates, schedules, progress reports, bid packages, contractor selections, and coordination with material suppliers and permitting authorities;`
    );
    addText(
      `d. Approving invoices and issuing payments to contractors, subcontractors, suppliers, and others involved in the Project;`
    );
    addText(
      `e. Advising the Owner on permit procurement, regulatory compliance, and implementation of safety protocols;`
    );
    addText(`f. Recommending appropriate types and levels of insurance coverage for the Project.`);
    if (formData.dutiesNote) addText(formData.dutiesNote);
    addText("\n");

    addText("3. Working Hours");
    addText(
      `Time is of the essence in the performance of this Agreement. The Manager shall dedicate a minimum of ${formData.planningHoursPerWeek || "[Insert Number]"} hours per week during the planning and development phase and ${formData.constructionHoursPerWeek || "[Insert Number]"} hours per week during the construction phase.`
    );
    addText("\n");

    addText("4. Compensation");
    addText(
      `The Owner shall compensate the Manager at a rate of ${formData.compensationRate || "<insert amount>"} per hour for time expended on the Project. The Manager shall maintain accurate records of all hours worked and provide detailed accounts to the Owner upon request.`
    );
    if (formData.recordKeepingNote) addText(formData.recordKeepingNote);
    addText("\n");

    addText("5. Term");
    addText(
      `This Agreement shall terminate automatically on ${formData.termEndDate || "[Termination Date]"}, unless earlier terminated in accordance with its provisions or extended by written mutual agreement.`
    );
    addText("\n");

    addText("6. Indemnity");
    addText(
      `${formData.indemnityNote || "To the fullest extent permitted by law, the Manager shall indemnify, defend, and hold harmless the Owner and the Owner’s agents and employees from and against all claims, liabilities, damages, losses, and expenses, including reasonable attorneys’ fees, arising out of or relating to the Manager’s performance or non-performance under this Agreement."}`
    );
    addText(
      `The Manager shall maintain errors and omissions insurance in such amounts as the Owner may reasonably require. ${formData.errorsOmissionsInsuranceNote || ""}`
    );
    addText("\n");

    addText("7. Debris and Site Cleanliness");
    addText(
      `${formData.debrisCleanlinessNote || "The Manager shall ensure that the Project site remains reasonably free of accumulated waste, debris, and refuse generated by contractors or subcontractors during the course of the Project."}`
    );
    addText("\n");

    addText("8. Default");
    addText(
      `${formData.defaultEventsNote || "The following events shall constitute material default under this Agreement:"}`
    );
    // Provide standard bullets unless user supplied custom
    if (!formData.defaultEventsNote) {
      addText("a. Failure to make any payment due hereunder;");
      addText("b. Insolvency, bankruptcy, or assignment for the benefit of creditors;");
      addText("c. Attachment, seizure, or other legal process against a Party’s property;");
      addText("d. Failure to timely or properly perform or deliver any services or obligations required under this Agreement.");
    }
    addText("\n");

    addText("9. Remedies");
    addText(
      `Upon the occurrence of any material default, the non-defaulting Party may issue written notice specifying the nature of the default in reasonable detail. The defaulting Party shall have ${formData.cureDays || "[Insert Number]"} days from receipt of such notice to cure the default. Failure to cure within the specified period, unless waived in writing, shall result in automatic termination of this Agreement and entitle the non-defaulting Party to pursue all legal or equitable remedies available. ${formData.remediesNote || ""}`
    );
    addText("\n");

    addText("10. Force Majeure");
    addText(
      `${formData.forceMajeureNote || "Neither Party shall be liable for any delay or failure in performance due to causes beyond its reasonable control, including but not limited to acts of God, natural disasters, epidemics, pandemics, public health emergencies, quarantines, civil unrest, governmental orders, war, or labor disputes. The affected Party must notify the other Party promptly in writing and shall resume performance as soon as practicable after the cessation of the event."}`
    );
    addText("\n");

    addText("11. Arbitration");
    addText(
      `Any dispute or controversy arising under or in relation to this Agreement shall be resolved through binding arbitration in accordance with the then-current Commercial Arbitration Rules of the American Arbitration Association.`
    );
    addText("• The Parties shall mutually appoint an arbitrator.");
    addText(
      "• If they are unable to agree, each Party shall appoint one arbitrator, and those two shall jointly appoint a third arbitrator who shall preside."
    );
    addText(
      `• The arbitration shall take place at ${formData.arbitrationLocation || "[a mutually agreed location]"} or, failing agreement, at a centrally located venue.`
    );
    addText(
      `• Each Party shall furnish relevant documentation to the other within ${formData.arbitrationDocsDays || "30"} days of notice of arbitration.`
    );
    addText(
      "• The arbitrators shall not have authority to alter the terms of this Agreement or award punitive damages."
    );
    addText("• The arbitrators may issue binding injunctions or mandatory orders.");
    addText("• Judgment on the arbitrators’ award may be entered in any court of competent jurisdiction.");
    if (formData.arbitrationNotes) addText(formData.arbitrationNotes);
    addText("\n");

    addText("12. Governing Law");
    addText(
      `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingState || "[Insert State Name]"}, without regard to conflict of law principles.`
    );
    addText("\n");

    addText("13. Amendment");
    addText(`${formData.amendmentNote || "No amendment or modification to this Agreement shall be effective unless in writing and duly signed by the Party against whom enforcement is sought."}`);
    addText("\n");

    addText("14. Binding Effect");
    addText(`${formData.bindingEffectNote || "This Agreement shall be binding upon, and shall inure to the benefit of, the Parties and their respective heirs, legal representatives, successors, and permitted assigns."}`);
    addText("\n");

    addText("15. Attorneys’ Fees");
    addText(`${formData.attorneysFeesNote || "In the event of any legal action or arbitration to enforce or interpret this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys’ fees and costs in addition to any other relief awarded."}`);
    addText("\n");

    addText("16. Notice");
    addText(`${formData.noticesProcedureNote}`);
    addText("\n");

    addText("17. Waiver");
    addText(`${formData.waiverNote || "The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right to enforce it in the future."}`);
    addText("\n");

    addText("18. Severability");
    addText(`${formData.severabilityNote || "If any provision of this Agreement is found to be invalid or unenforceable under applicable law, such provision shall be enforced to the maximum extent permitted by law, and the remainder of this Agreement shall continue in full force and effect."}`);
    addText("\n");

    addText("19. Entire Agreement");
    addText(`${formData.entireAgreementNote || "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof, and supersedes all prior negotiations, discussions, understandings, or agreements, whether oral or written."}`);
    addText("\n");

    addText("20. Execution");
    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the date first written above.");
    addText("\nOWNER");
    addText(`By: ${formData.ownerSignName || "_________________________"}`);
    addText(`Name: ${formData.ownerSignName || "_______________________"}`);
    addText(`Date: ${formData.ownerSignDate || "________________________"}`);
    addText("\nMANAGER");
    addText(`By: ${formData.managerSignName || "_________________________"}`);
    addText(`Name: ${formData.managerSignName || "_______________________"}`);
    addText(`Date: ${formData.managerSignDate || "________________________"}`);

    // Save PDF
    doc.save("Construction_Management_Agreement.pdf");
    setPdfGenerated(true);
    setStep(6);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Project</h3>
              <Label>Date</Label>
              <Input name="date" value={formData.date} onChange={handleChange} />
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
              <Label>Manager Name</Label>
              <Input name="managerName" value={formData.managerName} onChange={handleChange} />
              <Label>Manager Address</Label>
              <Input name="managerAddress" value={formData.managerAddress} onChange={handleChange} />
              <Label>Project Description</Label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Project Location</Label>
              <Input name="projectLocation" value={formData.projectLocation} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Duties, Hours & Compensation</h3>
              <Label>Extra Duties / Notes</Label>
              <textarea
                name="dutiesNote"
                value={formData.dutiesNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Planning Phase Hours / week</Label>
              <Input name="planningHoursPerWeek" value={formData.planningHoursPerWeek} onChange={handleChange} />
              <Label>Construction Phase Hours / week</Label>
              <Input name="constructionHoursPerWeek" value={formData.constructionHoursPerWeek} onChange={handleChange} />
              <Label>Compensation Rate (per hour)</Label>
              <Input name="compensationRate" value={formData.compensationRate} onChange={handleChange} />
              <Label>Record Keeping / Reporting Note</Label>
              <Input name="recordKeepingNote" value={formData.recordKeepingNote} onChange={handleChange} />
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Indemnity, Insurance & Site</h3>
              <Label>Indemnity Note</Label>
              <textarea
                name="indemnityNote"
                value={formData.indemnityNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Errors & Omissions Insurance Note</Label>
              <Input name="errorsOmissionsInsuranceNote" value={formData.errorsOmissionsInsuranceNote} onChange={handleChange} />
              <Label>Debris & Cleanliness Note</Label>
              <Input name="debrisCleanlinessNote" value={formData.debrisCleanlinessNote} onChange={handleChange} />
              <Label>Default Events (customize or leave)</Label>
              <textarea
                name="defaultEventsNote"
                value={formData.defaultEventsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Cure Days for Default</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
              <Label>Remedies Note</Label>
              <Input name="remediesNote" value={formData.remediesNote} onChange={handleChange} />
              <Label>Force Majeure Note</Label>
              <Input name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Arbitration & Boilerplate</h3>
              <Label>Arbitration Location</Label>
              <Input name="arbitrationLocation" value={formData.arbitrationLocation} onChange={handleChange} />
              <Label>Arbitration Docs Exchange Days</Label>
              <Input name="arbitrationDocsDays" value={formData.arbitrationDocsDays} onChange={handleChange} />
              <Label>Arbitration Extra Notes</Label>
              <textarea
                name="arbitrationNotes"
                value={formData.arbitrationNotes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Governing State</Label>
              <Input name="governingState" value={formData.governingState} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Binding Effect Note</Label>
              <Input name="bindingEffectNote" value={formData.bindingEffectNote} onChange={handleChange} />
              <Label>Attorneys' Fees Note</Label>
              <Input name="attorneysFeesNote" value={formData.attorneysFeesNote} onChange={handleChange} />
              <Label>Notices Procedure</Label>
              <Input name="noticesProcedureNote" value={formData.noticesProcedureNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Owner - Name</Label>
              <Input name="ownerSignName" value={formData.ownerSignName} onChange={handleChange} />
              <Label>Owner - Title</Label>
              <Input name="ownerSignTitle" value={formData.ownerSignTitle} onChange={handleChange} />
              <Label>Owner - Date</Label>
              <Input name="ownerSignDate" value={formData.ownerSignDate} onChange={handleChange} />
              <hr />
              <Label>Manager - Name</Label>
              <Input name="managerSignName" value={formData.managerSignName} onChange={handleChange} />
              <Label>Manager - Title</Label>
              <Input name="managerSignTitle" value={formData.managerSignTitle} onChange={handleChange} />
              <Label>Manager - Date</Label>
              <Input name="managerSignDate" value={formData.managerSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold pt-5">Construction Management Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
