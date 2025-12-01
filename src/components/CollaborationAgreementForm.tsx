import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  partyOneName: string;
  partyOneAddress: string;
  partyTwoName: string;
  partyTwoAddress: string;
  workType: string;
  workTitle: string;
  ancillaryRightsNote: string;
  creditTerms: string;
  restrictionNoticeDays: string; // 30 days default for ROFR
  confidentialityPeriod: string;
  percentPartyOne: string;
  percentPartyTwo: string;
  curePeriodDays: string; // default 15
  governingState: string;
  noticeAddressOne: string;
  noticeAddressTwo: string;
  signaturesPartyOneName: string;
  signaturesPartyOneDate: string;
  signaturesPartyTwoName: string;
  signaturesPartyTwoDate: string;
}

export default function CollaborationAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partyOneName: "",
    partyOneAddress: "",
    partyTwoName: "",
    partyTwoAddress: "",
    workType: "",
    workTitle: "",
    ancillaryRightsNote: "",
    creditTerms: "",
    restrictionNoticeDays: "30",
    confidentialityPeriod: "",
    percentPartyOne: "",
    percentPartyTwo: "",
    curePeriodDays: "15",
    governingState: "",
    noticeAddressOne: "",
    noticeAddressTwo: "",
    signaturesPartyOneName: "",
    signaturesPartyOneDate: "",
    signaturesPartyTwoName: "",
    signaturesPartyTwoDate: "",
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

    // === COLLABORATION AGREEMENT CONTENT ===
    addText("COLLABORATION AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Collaboration Agreement ("Agreement") is made and entered into on this ${formData.effectiveDate || "___ day of _______"} (the "Effective Date"), by and between:`
    );
    addText(`${formData.partyOneName || "[Party 1 Full Name]"}, having its principal address at ${formData.partyOneAddress || "________________________"}, hereinafter referred to as "Party One",`);
    addText("AND");
    addText(`${formData.partyTwoName || "[Party 2 Full Name]"}, having its principal address at ${formData.partyTwoAddress || "________________________"}, hereinafter referred to as "Party Two".`);
    addText("Party One and Party Two shall collectively be referred to as the \"Parties\" and individually as a \"Party\".");
    addText("\n");

    addText("1. PURPOSE AND COLLABORATION");
    addText(`1.1 The Parties hereby agree to collaborate in the creation, development, production, and completion of a creative work described as a ${formData.workType || "[type of work]"}, tentatively entitled "${formData.workTitle || "[Title]"}", hereinafter referred to as the "Work".`);
    addText(`1.2 The Parties shall cooperate fully, diligently, and in good faith in all matters relating to the creation, promotion, marketing, distribution, and commercial exploitation of the Work, including all ancillary, subsidiary, derivative, related, and allied rights (collectively referred to as "Ancillary Rights").`);
    addText("\n");

    addText("2. JOINT OWNERSHIP AND COPYRIGHT");
    addText("2.1 The Work shall be deemed a joint work for purposes of copyright law, and unless otherwise expressly agreed in writing, the Parties shall hold equal and undivided ownership in the copyright and all related intellectual property rights arising therefrom.");
    addText("2.2 Each Party undertakes to keep the other fully informed of all developments relating to the exploitation of the Work and the Ancillary Rights, including but not limited to offers, negotiations, licensing proposals, and communications from third parties seeking to acquire or utilize any rights in the Work.");
    addText("2.3 Any trademarks, service marks, or trade names generated or derived from the Work or Ancillary Rights shall be jointly owned by the Parties, unless otherwise mutually agreed in writing.");
    addText("\n");

    addText("3. OBLIGATIONS AND RESPONSIBILITIES");
    addText("3.1 Each Party shall perform its respective obligations in a professional, timely, and diligent manner and shall exercise reasonable skill and care in fulfilling its responsibilities under this Agreement.");
    addText("3.2 The Parties shall ensure the uninterrupted exchange of information, access to relevant data, and cooperation necessary for the efficient implementation of this Agreement, subject always to confidentiality and access protocols as mutually agreed.");
    addText("3.3 Each Party shall promptly disclose to the other any material communication received from third parties in connection with the Work or the Project.");
    addText("\n");

    addText("4. RESTRICTION ON INDIVIDUAL ACTS");
    addText("4.1 No Party shall independently enter into any contract, license, assignment, or agreement affecting the rights in the Work without the prior written consent of the other Party.");
    addText("4.2 Either Party may grant a written power of attorney to the other for the execution of specific agreements relating to the Work, provided such authority is clearly defined and documented.");
    addText("\n");

    addText("5. APPOINTMENT OF AGENT");
    addText('5.1 The Parties may mutually appoint an agent (the "Agent") to represent them exclusively in relation to the promotion, negotiation, licensing, and exploitation of the Work and Ancillary Rights under a separate written Agency Agreement.');
    addText("5.2 In the absence of an agreed Agent within a reasonable period, either Party may directly negotiate with third parties; however, no such Party shall be entitled to charge or receive any commission, agency fee, or related compensation in respect thereof.");
    addText("\n");

    addText("6. MODIFICATIONS TO COMPLETED WORK");
    addText("6.1 No alterations, revisions, adaptations, or modifications to the completed Work shall be made without the prior written approval of the other Party, which approval shall not be unreasonably withheld or delayed.");
    addText("\n");

    addText("7. PRODUCTION AND LICENSING AGREEMENTS");
    addText("7.1 All agreements relating to the production, publication, licensing, or exploitation of the Work shall be executed in duplicate, and a copy shall be furnished to each Party.");
    addText("7.2 Any such agreement shall expressly provide for direct payment of sums due to each Party or such payments as administered by the Agent in accordance with the Agency Agreement.");
    addText("\n");

    addText("8. AUTHORSHIP AND CREDIT");
    addText(`8.1 All credits relating to the Work, including publicity materials, advertisements, publications, and promotional content, shall state: "${formData.creditTerms || "[Credit Terms] by [Party One] and [Party Two]"}", displayed with equal font size, prominence, and placement.`);
    addText("8.2 No agreement concerning the Work shall be entered into unless it expressly preserves the authorship credit as stipulated herein.");
    addText("\n");

    addText("9. RESTRICTION ON TRANSFER OF RIGHTS");
    addText("9.1 Neither Party shall sell, assign, license, mortgage, pledge, or otherwise transfer or encumber their rights in the Work without prior written consent of the other Party.");
    addText(`9.2 Right of First Refusal: In the event a Party intends to dispose of its rights, it shall provide written notice to the other Party detailing the proposed terms. The other Party shall have ${formData.restrictionNoticeDays || "30"} (30) days to elect to purchase such rights on the same terms or withhold consent where material obligations remain unfulfilled.`);
    addText("\n");

    addText("10. CONFIDENTIALITY");
    addText("10.1 All information, manuscripts, drafts, correspondence, and materials exchanged under this Agreement shall be treated as strictly confidential and shall not be disclosed to any third party without prior written consent, except where required by law.");
    addText(`10.2 Confidentiality obligations shall remain in force for a minimum period of ${formData.confidentialityPeriod || "[specified period]"} from the date of disclosure.`);
    addText("\n");

    addText("11. FORCE MAJEURE");
    addText("11.1 Neither Party shall be liable for failure or delay in performance resulting from events beyond its reasonable control, including but not limited to acts of God, natural disasters, war, civil unrest, pandemics, governmental actions, or failures of utilities (\"Force Majeure\").");
    addText("11.2 The affected Party shall notify the other Party promptly and use all reasonable efforts to resume performance as soon as practicable.");
    addText("\n");

    addText("12. FINANCIAL ARRANGEMENTS");
    addText("12.1 Proceeds from exploitation of the Work shall be distributed as follows:");
    addText(`• Party One: ${formData.percentPartyOne || "___"}%`);
    addText(`• Party Two: ${formData.percentPartyTwo || "___"}%`);
    addText("12.2 Expenses shall be borne by the Parties in the same proportion as profits, unless otherwise agreed in writing.");
    addText("12.3 Each Party shall remain solely responsible for its own tax obligations and indemnifies the other Party against any related liabilities.");
    addText("\n");

    addText("13. TERM AND TERMINATION");
    addText("13.1 This Agreement shall remain in force for the entire duration of the copyright term and any extensions thereof.");
    addText("13.2 In the event of death of a Party, the surviving Party shall continue performance and credit, while the estate of the deceased shall retain its financial entitlements.");
    addText(`13.3 A Party may terminate this Agreement upon material breach by the other Party, provided written notice is given and a cure period of ${formData.curePeriodDays || "15"} (15) working days is allowed.`);
    addText("\n");

    addText("14. DISPUTE RESOLUTION");
    addText("14.1 Any dispute shall first be resolved amicably through negotiation.");
    addText("14.2 Failing resolution, the dispute shall be referred to mediation, and if unresolved, to arbitration or legal proceedings as mutually agreed.");
    addText("\n");

    addText("15. GOVERNING LAW");
    addText(`This Agreement shall be governed and construed in accordance with the laws of the State of ${formData.governingState || "__________"}.`);
    addText("\n");

    addText("16. NOTICES");
    addText("All notices under this Agreement shall be in writing and delivered by registered post or recognized courier service to the addresses stated above.");
    addText(`Party One Notice Address: ${formData.noticeAddressOne || formData.partyOneAddress || "________________"}`);
    addText(`Party Two Notice Address: ${formData.noticeAddressTwo || formData.partyTwoAddress || "________________"}`);
    addText("\n");

    addText("17. ENTIRE AGREEMENT");
    addText("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements, representations, or understandings.");
    addText("\n");

    addText("18. SEVERABILITY");
    addText("If any provision is held invalid, the remainder shall continue in full force and effect.");
    addText("\n");

    addText("19. AMENDMENTS");
    addText("This Agreement may be amended only by written instrument signed by both Parties.");
    addText("\n");

    addText("20. NO PARTNERSHIP");
    addText("Nothing herein shall be deemed to create a partnership, joint venture, or agency relationship between the Parties.");
    addText("\n");

    addText("21. WAIVER");
    addText("No waiver shall be valid unless made in writing and signed by the waiving Party.");
    addText("\n");

    addText("22. RESERVATION OF RIGHTS");
    addText("All rights not expressly granted herein remain reserved to the respective Parties.");
    addText("\n");

    addText("23. ADDITIONAL INSTRUMENTS");
    addText("The Parties shall execute all further documents as may be required to give effect to this Agreement.");
    addText("\n");

    addText("24. SUCCESSORS AND ASSIGNS");
    addText("This Agreement shall bind and benefit the Parties and their lawful successors and assigns.");
    addText("\n");

    addText("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
    addText("\n");
    addText("Party One Signature");
    addText(`Name: ${formData.signaturesPartyOneName || "______________________"}`);
    addText(`Date: ${formData.signaturesPartyOneDate || "_______________________"}`);
    addText("\n");
    addText("Party Two Signature");
    addText(`Name: ${formData.signaturesPartyTwoName || "______________________"}`);
    addText(`Date: ${formData.signaturesPartyTwoDate || "_______________________"}`);

    // Save PDF
    doc.save("Collaboration_Agreement.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Party One Full Name</Label>
              <Input name="partyOneName" value={formData.partyOneName} onChange={handleChange} />
              <Label>Party One Address</Label>
              <Input name="partyOneAddress" value={formData.partyOneAddress} onChange={handleChange} />
              <Label>Party Two Full Name</Label>
              <Input name="partyTwoName" value={formData.partyTwoName} onChange={handleChange} />
              <Label>Party Two Address</Label>
              <Input name="partyTwoAddress" value={formData.partyTwoAddress} onChange={handleChange} />
              <Label>Type of Work</Label>
              <Input name="workType" value={formData.workType} onChange={handleChange} />
              <Label>Title of Work</Label>
              <Input name="workTitle" value={formData.workTitle} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Rights, Obligations & Credits</h3>
              <Label>Ancillary Rights Note</Label>
              <textarea
                name="ancillaryRightsNote"
                value={formData.ancillaryRightsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Credit Terms (how credits should appear)</Label>
              <Input name="creditTerms" value={formData.creditTerms} onChange={handleChange} />
              <Label>Confidentiality Period (e.g., 2 years)</Label>
              <Input name="confidentialityPeriod" value={formData.confidentialityPeriod} onChange={handleChange} />
              <Label>Restriction Notice Days (Right of First Refusal days)</Label>
              <Input name="restrictionNoticeDays" value={formData.restrictionNoticeDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Financial & Termination</h3>
              <Label>Party One Percentage (%)</Label>
              <Input name="percentPartyOne" value={formData.percentPartyOne} onChange={handleChange} />
              <Label>Party Two Percentage (%)</Label>
              <Input name="percentPartyTwo" value={formData.percentPartyTwo} onChange={handleChange} />
              <Label>Cure Period Days (for breach)</Label>
              <Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} />
              <Label>Governing State</Label>
              <Input name="governingState" value={formData.governingState} onChange={handleChange} />
              <Label>Party One Notice Address (for notices)</Label>
              <Input name="noticeAddressOne" value={formData.noticeAddressOne} onChange={handleChange} />
              <Label>Party Two Notice Address (for notices)</Label>
              <Input name="noticeAddressTwo" value={formData.noticeAddressTwo} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Party One Signatory Name</Label>
              <Input name="signaturesPartyOneName" value={formData.signaturesPartyOneName} onChange={handleChange} />
              <Label>Party One Sign Date</Label>
              <Input name="signaturesPartyOneDate" value={formData.signaturesPartyOneDate} onChange={handleChange} />
              <Label>Party Two Signatory Name</Label>
              <Input name="signaturesPartyTwoName" value={formData.signaturesPartyTwoName} onChange={handleChange} />
              <Label>Party Two Sign Date</Label>
              <Input name="signaturesPartyTwoDate" value={formData.signaturesPartyTwoDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold pt-5">Collaboration Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
