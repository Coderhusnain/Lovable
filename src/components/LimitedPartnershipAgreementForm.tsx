import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  partnershipName: string;
  effectiveDate: string;
  term: string;
  governingLaw: string;
  formationPlace: string;
  initialContributions: string;
  ownershipPercentages: string;
  allocationAndDistributions: string;
  managementPowers: string;
  generalPartnerDuties: string;
  limitedPartnerRights: string;
  liabilityAndIndemnification: string;
  withdrawalAndDissolution: string;
  liquidationAndDistribution: string;
  signGeneral1Name: string;
  signGeneral1CNIC: string;
  signGeneral1Address: string;
  signGeneral1Date: string;
  signGeneral2Name: string;
  signGeneral2CNIC: string;
  signGeneral2Address: string;
  signGeneral2Date: string;
  signLimited1Name: string;
  signLimited1CNIC: string;
  signLimited1Address: string;
  signLimited1Date: string;
  witness1Name: string;
  witness1CNIC: string;
  witness1Date: string;
  witness2Name: string;
  witness2CNIC: string;
  witness2Date: string;
}

export default function LimitedPartnershipAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    partnershipName: "",
    effectiveDate: "",
    term: "",
    governingLaw: "",
    formationPlace: "",
    initialContributions: "",
    ownershipPercentages: "",
    allocationAndDistributions: "",
    managementPowers: "",
    generalPartnerDuties: "",
    limitedPartnerRights: "",
    liabilityAndIndemnification: "",
    withdrawalAndDissolution: "",
    liquidationAndDistribution: "",
    signGeneral1Name: "",
    signGeneral1CNIC: "",
    signGeneral1Address: "",
    signGeneral1Date: "",
    signGeneral2Name: "",
    signGeneral2CNIC: "",
    signGeneral2Address: "",
    signGeneral2Date: "",
    signLimited1Name: "",
    signLimited1CNIC: "",
    signLimited1Address: "",
    signLimited1Date: "",
    witness1Name: "",
    witness1CNIC: "",
    witness1Date: "",
    witness2Name: "",
    witness2CNIC: "",
    witness2Date: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += size * 1.3;
      });
    };

    write("LIMITED PARTNERSHIP AGREEMENT", 16, true, true);
    write("\n");

    // Header
    write(`THIS LIMITED PARTNERSHIP AGREEMENT (\"Agreement\") is made and entered into by and among the undersigned parties for the purpose of regulating the rights, duties, obligations, and liabilities of the Partners in accordance with the applicable Limited Partnership laws.`);
    write("\n");

    // Clause 1
    write("1. NAME AND STATUS OF LIMITED PARTNERSHIP", 12, true);
    write("1.1 Name");
    write(`The Limited Partnership formed pursuant to this Agreement shall be known as \"${formData.partnershipName || "________"}\" (hereinafter referred to as the \"Limited Partnership\").`);
    write("1.2 Partners");
    write("(a) General Partners: ____________________ (individually referred to as a \"General Partner\" and collectively as the \"General Partners\").");
    write("(b) Limited Partner(s): ____________________ (individually referred to as a \"Limited Partner\" and collectively as the \"Limited Partners\").");
    write("1.3 Formation");
    write(`The Limited Partnership has been duly formed and legally constituted pursuant to the filing of a Certificate of Limited Partnership with the appropriate authority in ${formData.formationPlace || "________"}, in accordance with the applicable statutory provisions governing limited partnerships.`);

    write("\n");
    // Clause 2
    write("2. EFFECTIVE DATE AND TERM", 12, true);
    write("2.1 Effective Date");
    write(`This Agreement shall become effective and binding upon the Partners as of ${formData.effectiveDate || "________"} (the \"Effective Date\").`);
    write("2.2 Term");
    write(`The Limited Partnership shall continue in full force and effect for a period of ${formData.term || "________"}, unless earlier dissolved in accordance with the provisions set forth herein or under applicable law.`);

    write("\n");
    // Clause 3
    write("3. GOVERNING LAW AND JURISDICTION", 12, true);
    write(`This Agreement shall be governed by, construed, and interpreted in accordance with the laws of ${formData.governingLaw || "________"}. The exclusive jurisdiction and proper venue for any dispute, claim, or legal action arising out of or in connection with this Agreement or the operations of the Limited Partnership shall lie solely in the courts situated in ${formData.governingLaw || "________"}, and the Partners hereby submit to such jurisdiction.`);

    write("\n");
    // Clause 4
    write("4. CAPITAL CONTRIBUTIONS AND FINANCIAL STRUCTURE", 12, true);
    write("4.1 Initial Capital Contributions");
    write(formData.initialContributions || "Each Partner agrees to make an initial capital contribution to the Limited Partnership in the following amounts and manner:\n(a) $________ by ____________________\n(b) $________ by ____________________");
    write("4.2 Submission of Contributions");
    write(`All initial capital contributions shall be paid and delivered to the Limited Partnership no later than ${formData.allocationAndDistributions || "________"}, unless otherwise mutually agreed in writing by the General Partners.`);
    write("4.3 Additional Contributions");
    write("The General Partners may, at their discretion and subject to the needs of the Limited Partnership, require additional cash contributions from time to time. No Limited Partner shall be obligated or compelled to make any further capital contribution beyond their agreed initial contribution.");
    write("4.4 Ownership Interests");
    write(formData.ownershipPercentages || "The ownership interest of each Partner in the Limited Partnership shall be as follows:\n(a) __________ %\n(b) __________ %\nThese percentages shall determine each Partner’s economic rights, including entitlement to profits and responsibility for losses.");
    write("4.5 Allocation of Income, Expenses, and Losses");
    write(formData.allocationAndDistributions || "All profits, losses, credits, deductions, tax preferences, and other financial items of the Limited Partnership shall be allocated among the Partners on a pro-rata basis in accordance with their respective ownership percentages for both accounting and income tax purposes.");
    write("4.6 Distribution of Cash");
    write(formData.liquidationAndDistribution || "Net distributable cash of the Limited Partnership shall be distributed periodically, as determined by the General Partners, to the Partners in proportion to their respective percentage ownership interests.");

    write("\n");
    // Clause 5
    write("5. MANAGEMENT AND AUTHORITY", 12, true);
    write("5.1 Management Powers");
    write(formData.managementPowers || "The day-to-day management, administration, and control of the business and affairs of the Limited Partnership shall vest exclusively in the General Partners, who shall have full authority to manage, operate, direct, and control the business operations of the Limited Partnership in accordance with this Agreement.");
    write("5.2 Authority of General Partners");
    write(formData.generalPartnerDuties || "The General Partners shall have full and exclusive power to make all decisions concerning the development, conduct, and operation of the Limited Partnership’s business, and such decisions shall be binding upon the Limited Partnership and all Partners, except where expressly restricted by this Agreement.");
    write("5.3 Rights of Limited Partners");
    write(formData.limitedPartnerRights || "The Limited Partners shall have only such rights as are expressly conferred upon them under this Agreement and the applicable Limited Partnership laws. They shall not participate in, interfere with, or exercise control over the day-to-day management or operational affairs of the Limited Partnership.");
    write("5.4 Voting Rights");
    write("Each Partner shall be entitled to an equal vote unless otherwise stated. Decisions requiring Partner approval shall be determined by a majority of the votes cast. In matters reserved exclusively for General Partners, decisions shall be made by majority vote of the General Partners.");

    write("\n");
    // Clause 6
    write("6. LIABILITY AND INDEMNIFICATION", 12, true);
    write("6.1 Limited Liability of Limited Partners");
    write(formData.liabilityAndIndemnification || "Subject to the provisions of the applicable Limited Partnership laws, no Limited Partner shall be personally liable for the debts, obligations, or liabilities of the Limited Partnership beyond the amount of their capital contribution.");
    write("6.2 Liability of General Partners");
    write("The General Partners shall not be liable to the Limited Partnership or any Partner for any act or omission undertaken in good faith and within the scope of authority granted under this Agreement, including decisions based upon legal or professional advice (\"Permitted Acts\").");
    write("6.3 Exceptions to Limitation of Liability");
    write("The General Partners shall, however, remain personally liable for any acts or omissions arising from fraud, willful misconduct, bad faith, gross negligence, or material breach of this Agreement (\"Excluded Acts\").");

    write("\n");
    // Clause 7
    write("7. WITHDRAWAL AND DISSOLUTION", 12, true);
    write("7.1 Withdrawal of General Partner");
    write("The withdrawal of any General Partner, for any reason whatsoever, shall not constitute a breach of this Agreement. Upon withdrawal, such General Partner shall automatically be reclassified as a Limited Partner and shall retain their corresponding economic interest in the Limited Partnership.");
    write("7.2 Buy-Out of Withdrawn Partner’s Interest");
    write(`Upon the withdrawal of any Partner, the Limited Partnership shall have ${formData.withdrawalAndDissolution || "________"} days within which to purchase the withdrawn Partner’s interest. In the event such interest is not purchased within ${formData.withdrawalAndDissolution || "________"} days, the Limited Partnership shall stand dissolved.`);
    write("7.3 Dissolution");
    write("The Limited Partnership shall be dissolved upon:\n(a) Majority vote of the Partners;\n(b) Expiration of the buy-out period;\n(c) Occurrence of any event requiring dissolution under applicable law.");
    write("7.4 Liquidation");
    write("Upon dissolution, the General Partners or duly appointed Liquidating Partners shall supervise the winding-up and liquidation of the Limited Partnership’s affairs.");
    write("7.5 Order of Distribution");
    write("The assets of the Limited Partnership shall be applied in the following order:\n(a) Payment of all outstanding taxes, debts, liabilities, and obligations of the Limited Partnership;\n(b) Distribution of remaining assets to the Partners on a pro-rata basis in accordance with their respective ownership percentages.");

    write("\n");
    write("This Agreement constitutes the binding framework governing the contractual relationship among the Partners and shall remain enforceable until its lawful termination or dissolution.");

    write("\n");
    write("IN WITNESS WHEREOF, the Parties hereto, intending to be legally bound, have executed this Limited Partnership Agreement on the dates written below.", 11, true);

    write("\n");
    write("SIGNED AND EXECUTED BY:");
    write("GENERAL PARTNERS", 12, true);

    write("1.");
    write(`Name: ${formData.signGeneral1Name || "__________________________"}`);
    write(`CNIC/ID No.: ${formData.signGeneral1CNIC || "____________________"}`);
    write(`Address: ${formData.signGeneral1Address || "_______________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.signGeneral1Date || "___________________________"}`);

    write("2.");
    write(`Name: ${formData.signGeneral2Name || "__________________________"}`);
    write(`CNIC/ID No.: ${formData.signGeneral2CNIC || "____________________"}`);
    write(`Address: ${formData.signGeneral2Address || "_______________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.signGeneral2Date || "___________________________"}`);

    write("LIMITED PARTNER(S)", 12, true);
    write("1.");
    write(`Name: ${formData.signLimited1Name || "__________________________"}`);
    write(`CNIC/ID No.: ${formData.signLimited1CNIC || "____________________"}`);
    write(`Address: ${formData.signLimited1Address || "_______________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.signLimited1Date || "___________________________"}`);

    write("WITNESSES", 12, true);
    write("1.");
    write(`Name: ${formData.witness1Name || "__________________________"}`);
    write(`CNIC/ID No.: ${formData.witness1CNIC || "____________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.witness1Date || "___________________________"}`);

    write("2.");
    write(`Name: ${formData.witness2Name || "__________________________"}`);
    write(`CNIC/ID No.: ${formData.witness2CNIC || "____________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.witness2Date || "___________________________"}`);

    doc.save("Limited_Partnership_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Partnership Details</h3>
              </div>
              <Label>Partnership Name</Label>
              <Input name="partnershipName" value={formData.partnershipName} onChange={handleChange} />
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Term</Label>
              <Input name="term" value={formData.term} onChange={handleChange} />
              <Label>Formation Place</Label>
              <Input name="formationPlace" value={formData.formationPlace} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Capital & Ownership</h3>
              <Label>Initial Capital Contributions (list)</Label>
              <Textarea name="initialContributions" value={formData.initialContributions} onChange={handleChange} rows={4} />
              <Label>Ownership Percentages</Label>
              <Textarea name="ownershipPercentages" value={formData.ownershipPercentages} onChange={handleChange} rows={3} />
              <Label>Allocation of Income, Expenses & Losses</Label>
              <Textarea name="allocationAndDistributions" value={formData.allocationAndDistributions} onChange={handleChange} rows={3} />
              <Label>Distribution of Cash / Liquidation</Label>
              <Textarea name="liquidationAndDistribution" value={formData.liquidationAndDistribution} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Management, Liability & Dissolution</h3>
              <Label>Management Powers</Label>
              <Textarea name="managementPowers" value={formData.managementPowers} onChange={handleChange} rows={3} />
              <Label>Duties of General Partners</Label>
              <Textarea name="generalPartnerDuties" value={formData.generalPartnerDuties} onChange={handleChange} rows={3} />
              <Label>Rights of Limited Partners</Label>
              <Textarea name="limitedPartnerRights" value={formData.limitedPartnerRights} onChange={handleChange} rows={3} />
              <Label>Liability & Indemnification</Label>
              <Textarea name="liabilityAndIndemnification" value={formData.liabilityAndIndemnification} onChange={handleChange} rows={3} />
              <Label>Withdrawal, Buy-Out & Dissolution</Label>
              <Textarea name="withdrawalAndDissolution" value={formData.withdrawalAndDissolution} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>General Partner 1 - Name</Label>
              <Input name="signGeneral1Name" value={formData.signGeneral1Name} onChange={handleChange} />
              <Label>General Partner 1 - CNIC/ID No.</Label>
              <Input name="signGeneral1CNIC" value={formData.signGeneral1CNIC} onChange={handleChange} />
              <Label>General Partner 1 - Address</Label>
              <Input name="signGeneral1Address" value={formData.signGeneral1Address} onChange={handleChange} />
              <Label>General Partner 1 - Date</Label>
              <Input name="signGeneral1Date" value={formData.signGeneral1Date} onChange={handleChange} />

              <Label>General Partner 2 - Name</Label>
              <Input name="signGeneral2Name" value={formData.signGeneral2Name} onChange={handleChange} />
              <Label>General Partner 2 - CNIC/ID No.</Label>
              <Input name="signGeneral2CNIC" value={formData.signGeneral2CNIC} onChange={handleChange} />
              <Label>General Partner 2 - Address</Label>
              <Input name="signGeneral2Address" value={formData.signGeneral2Address} onChange={handleChange} />
              <Label>General Partner 2 - Date</Label>
              <Input name="signGeneral2Date" value={formData.signGeneral2Date} onChange={handleChange} />

              <Label>Limited Partner 1 - Name</Label>
              <Input name="signLimited1Name" value={formData.signLimited1Name} onChange={handleChange} />
              <Label>Limited Partner 1 - CNIC/ID No.</Label>
              <Input name="signLimited1CNIC" value={formData.signLimited1CNIC} onChange={handleChange} />
              <Label>Limited Partner 1 - Address</Label>
              <Input name="signLimited1Address" value={formData.signLimited1Address} onChange={handleChange} />
              <Label>Limited Partner 1 - Date</Label>
              <Input name="signLimited1Date" value={formData.signLimited1Date} onChange={handleChange} />

              <h4 className="mt-4 font-semibold">Witnesses</h4>
              <Label>Witness 1 - Name</Label>
              <Input name="witness1Name" value={formData.witness1Name} onChange={handleChange} />
              <Label>Witness 1 - CNIC/ID No.</Label>
              <Input name="witness1CNIC" value={formData.witness1CNIC} onChange={handleChange} />
              <Label>Witness 1 - Date</Label>
              <Input name="witness1Date" value={formData.witness1Date} onChange={handleChange} />

              <Label>Witness 2 - Name</Label>
              <Input name="witness2Name" value={formData.witness2Name} onChange={handleChange} />
              <Label>Witness 2 - CNIC/ID No.</Label>
              <Input name="witness2CNIC" value={formData.witness2CNIC} onChange={handleChange} />
              <Label>Witness 2 - Date</Label>
              <Input name="witness2Date" value={formData.witness2Date} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Limited Partnership Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
