import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface FormData {
  effectiveDate: string;
  recipientName: string;
  recipientAddress: string;
  providerName: string;
  providerAddress: string;
  servicesDesc: string;
  totalFee: string;
  depositAmount: string;
  depositDate: string;
  terminationDate: string;
  noticeDays: string;
  cureDays: string;
  jurisdiction: string;
  arbitration: string;
  changeOrderProcess: string;
  signRecipientName: string;
  signRecipientDate: string;
  signProviderName: string;
  signProviderDate: string;
}

export default function FeeAgreementForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    recipientName: "",
    recipientAddress: "",
    providerName: "",
    providerAddress: "",
    servicesDesc: "",
    totalFee: "",
    depositAmount: "",
    depositDate: "",
    terminationDate: "",
    noticeDays: "",
    cureDays: "",
    jurisdiction: "",
    arbitration: "",
    changeOrderProcess: "",
    signRecipientName: "",
    signRecipientDate: "",
    signProviderName: "",
    signProviderDate: "",
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
        y += size * 1.35;
      });
    };

    write("FEE AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Fee Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "[Effective Date]"} (the "Effective Date"), by and between:`
    );
    write("\n");
    write(`Recipient: ${formData.recipientName || "[Recipient Name]"}`);
    write(`Address: ${formData.recipientAddress || "[Address]"}`);
    write("\n");
    write(`Provider: ${formData.providerName || "[Provider Name]"}`);
    write(`Address: ${formData.providerAddress || "[Address]"}`);

    write("\n");
    write("I. DESCRIPTION OF SERVICES", 12, true);
    write(`Commencing from the Effective Date, the Provider shall render to the Recipient the following services (collectively, the "Services"):\n${formData.servicesDesc || "[Detailed description of services to be provided]."}`);

    write("\n");
    write("II. FINANCIAL TERMS", 12, true);
    write(`1. Compensation\nIn consideration of the Services rendered under this Agreement, the Recipient shall pay the Provider a total fee of USD ${formData.totalFee || "[Amount]"}, payable as a lump sum upon completion of the Services, unless otherwise mutually agreed in writing.`);

    write("\n");
    write(`2. Deposit\nUpon execution of this Agreement, the Recipient shall pay the Provider a deposit in the amount of USD ${formData.depositAmount || "[Amount]"} on or before ${formData.depositDate || "[Date]"}.`);
    write(`(a) The deposit shall be credited toward the final amount payable.\n(b) The deposit shall be non-refundable, except where this Agreement is cancelled by the Provider or where the Provider is unable to perform the Services for any reason.`);

    write("\n");
    write("III. TERM, TERMINATION, AND DEFAULT", 12, true);
    write(`1. Term\nThis Agreement shall commence on the Effective Date and shall remain in full force and effect until ${formData.terminationDate || "[Termination Date]"}, unless terminated earlier in accordance with the provisions herein.`);
    write("\n");
    write(`2. Early Termination\nEither Party may terminate this Agreement prior to the Termination Date, with or without cause, by providing ${formData.noticeDays || "[Number]"} days' written notice to the other Party.\nUpon Early Termination:\n• The Provider shall be entitled to receive pro-rated payment for Services performed up to the effective date of termination.\n• Notice of termination may be delivered via email, which shall be deemed valid and sufficient.`);

    write("\n");
    write(`3. Material Default\nThe following shall constitute a material default under this Agreement:\n(a) Failure to make any payment when due;\n(b) Insolvency or bankruptcy of either Party;\n(c) Attachment, seizure, levy, or legal proceedings against the property or assets of either Party;\n(d) Failure to perform or deliver the Services in the manner and timeframe stipulated herein.`);

    write("\n");
    write(`4. Remedies for Default\nUpon occurrence of a material default, the non-defaulting Party may issue written notice specifying the nature of the default. The defaulting Party shall have ${formData.cureDays || "[Number]"} days from receipt of such notice to cure the default. Failure to cure within the prescribed period shall result in automatic termination of this Agreement, unless such default is formally waived in writing by the non-defaulting Party.`);

    write("\n");
    write("5. Force Majeure\nNeither Party shall be liable for failure or delay in performance caused by circumstances beyond its reasonable control (\"Force Majeure\"), including but not limited to acts of God, pandemics, epidemics, war, civil unrest, natural disasters, strikes, or governmental actions. The affected Party shall use all reasonable efforts to mitigate and resume performance as soon as practicable.");

    write("\n");
    write("IV. SERVICE AND LEGAL PROVISIONS", 12, true);
    write("1. Relationship of Parties\nThe Provider shall act as an independent contractor, and nothing contained herein shall be deemed to create an employer-employee, agency, partnership, or joint venture relationship between the Parties.");

    write("\n");
    write("2. Warranty of Services\nThe Provider warrants that all Services shall be performed in a timely, competent, and professional manner in accordance with generally accepted standards.");

    write("\n");
    write("3. Compliance with Laws\nThe Provider shall comply with all applicable federal, provincial/state, county, and municipal laws, ordinances, regulations, and statutory requirements.");

    write("\n");
    write("4. Ownership of Work Product\nAll work product, including but not limited to designs, concepts, inventions, documents, intellectual property, and copyrightable materials created by the Provider in connection with the Services shall vest exclusively in the Recipient.");

    write("\n");
    write("5. Indemnification\nThe Provider agrees to indemnify, defend, and hold harmless the Recipient from and against any claims, damages, losses, liabilities, costs, or expenses arising out of or resulting from the negligent acts, omissions, or misconduct of the Provider or its representatives.");

    write("\n");
    write("6. Confidentiality\nThe Provider shall not, at any time, disclose, disseminate, or use for personal benefit any confidential or proprietary information of the Recipient. This obligation shall survive the termination or expiration of this Agreement.");

    write("\n");
    write("V. MISCELLANEOUS PROVISIONS", 12, true);
    write(`1. Governing Law\nThis Agreement shall be governed by and construed in accordance with the laws of ${formData.jurisdiction || "[Jurisdiction]"}.`);

    write("\n");
    write(`2. Binding Arbitration\nAny dispute arising out of or in connection with this Agreement that cannot be resolved amicably shall be referred to and finally resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitrator’s decision shall be final and binding on the Parties. ${formData.arbitration || ""}`);

    write("\n");
    write("3. Assignment\nNeither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party.");

    write("\n");
    write("4. Change Orders\nAny modification to the scope of Services shall be documented through a written change order, duly signed and dated by both Parties, specifying the nature of the change and any adjustment to remuneration. Such change order shall form part of this Agreement.");
    if (formData.changeOrderProcess) write(`\nProcess: ${formData.changeOrderProcess}`);

    write("\n");
    write("5. Waiver\nFailure by either Party to enforce any provision shall not be deemed a waiver of its right to enforce such provision at a later time.");

    write("\n");
    write("6. Amendments\nThis Agreement may be amended only by a written instrument duly executed by both Parties.");

    write("\n");
    write("7. Entire Agreement\nThis Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, communications, or agreements, whether written or oral.");

    write("\n");
    write("8. Severability\nIf any provision of this Agreement is held to be invalid or unenforceable, such provision shall be deemed severed, and the remaining provisions shall continue in full force and effect.");

    write("\n");
    write("9. Notices\nAny notice required under this Agreement shall be deemed duly given if delivered personally or sent by certified mail, return receipt requested, to the addresses stated above, or to such other address as may be notified in writing by either Party.");

    write("\n");
    write("VI. SIGNATURES", 12, true);
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the date first written above.");
    write("\n");
    write(`For the Recipient:\nName: ${formData.signRecipientName || "________________________"}\nSignature: _______________________\nDate: ${formData.signRecipientDate || "_____________________"}`);
    write("\n");
    write(`For the Provider:\nName: ${formData.signProviderName || "________________________"}\nSignature: _______________________\nDate: ${formData.signProviderDate || "_____________________"}`);

    doc.save("Fee_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
            <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/fee-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Fee Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Dates</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Recipient Name</Label>
              <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />
              <Label>Recipient Address</Label>
              <Textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} />

              <Label>Provider Name</Label>
              <Input name="providerName" value={formData.providerName} onChange={handleChange} />
              <Label>Provider Address</Label>
              <Textarea name="providerAddress" value={formData.providerAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Payment</h3>
              <Label>Services Description</Label>
              <Textarea name="servicesDesc" value={formData.servicesDesc} onChange={handleChange} />

              <Label>Total Fee (USD)</Label>
              <Input name="totalFee" value={formData.totalFee} onChange={handleChange} />

              <Label>Deposit Amount (USD)</Label>
              <Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} />

              <Label>Deposit Date</Label>
              <Input name="depositDate" value={formData.depositDate} onChange={handleChange} />

              <Label>Termination Date</Label>
              <Input name="terminationDate" value={formData.terminationDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal & Misc</h3>
              <Label>Notice Days for Early Termination</Label>
              <Input name="noticeDays" value={formData.noticeDays} onChange={handleChange} />

              <Label>Cure Period (days)</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />

              <Label>Governing Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />

              <Label>Arbitration / Dispute Notes</Label>
              <Textarea name="arbitration" value={formData.arbitration} onChange={handleChange} />

              <Label>Change Order Process (short)</Label>
              <Textarea name="changeOrderProcess" value={formData.changeOrderProcess} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Recipient - Name</Label>
              <Input name="signRecipientName" value={formData.signRecipientName} onChange={handleChange} />
              <Label>Recipient - Date</Label>
              <Input name="signRecipientDate" value={formData.signRecipientDate} onChange={handleChange} />

              <Label>Provider - Name</Label>
              <Input name="signProviderName" value={formData.signProviderName} onChange={handleChange} />
              <Label>Provider - Date</Label>
              <Input name="signProviderDate" value={formData.signProviderDate} onChange={handleChange} />
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

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Fee Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
