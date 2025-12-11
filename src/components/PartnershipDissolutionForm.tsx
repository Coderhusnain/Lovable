import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  partnershipName: string;
  partner1Name: string;
  partner1Address: string;
  partner1CityStateZip: string;
  partner2Name: string;
  partner2Address: string;
  partner2CityStateZip: string;
  partnershipAgreementDate: string;
  businessActivity: string;
  dissolutionEffectiveDate: string;
  accountingFirm: string;
  distributionFormula: string;
  liquidatingPartner: string;
  publicationCounties: string;
  jurisdiction: string;
  signPartner1Name: string;
  signPartner1Date: string;
  signPartner2Name: string;
  signPartner2Date: string;
}

export default function PartnershipDissolutionForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partnershipName: "",
    partner1Name: "",
    partner1Address: "",
    partner1CityStateZip: "",
    partner2Name: "",
    partner2Address: "",
    partner2CityStateZip: "",
    partnershipAgreementDate: "",
    businessActivity: "",
    dissolutionEffectiveDate: "",
    accountingFirm: "",
    distributionFormula: "",
    liquidatingPartner: "",
    publicationCounties: "",
    jurisdiction: "",
    signPartner1Name: "",
    signPartner1Date: "",
    signPartner2Name: "",
    signPartner2Date: "",
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

    write("PARTNERSHIP DISSOLUTION AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Partnership Dissolution Agreement (the "Agreement") is made and entered into as of ${
        formData.effectiveDate || "__________"
      }, by and between the following partners (collectively, the "Partners"):`
    );

    write("\n");
    write(`Partner 1: ${formData.partner1Name || "[Partner Name 1]"}`);
    write(`Address: ${formData.partner1Address || ""} ${formData.partner1CityStateZip || ""}`);
    write("\n");
    write(`Partner 2: ${formData.partner2Name || "[Partner Name 2]"}`);
    write(`Address: ${formData.partner2Address || ""} ${formData.partner2CityStateZip || ""}`);

    write("\n");
    write("1. INTRODUCTION", 12, true);
    write(`1.1 Description of Partnership`);
    write(
      `The Partners have heretofore conducted business as ${formData.partnershipName || "[Partnership Name]"}, with principal business address at [address], engaged in ${formData.businessActivity ||
        "[business activity]"}.`
    );
    write("\n");
    write("1.2 Partnership Agreement");
    write(
      `The Partners previously entered into a written partnership agreement dated ${formData.partnershipAgreementDate ||
        "__________"} (the "Partnership Agreement"), which is attached hereto as Exhibit A and incorporated herein by reference.`
    );
    write("\n");
    write("1.3 Intention to Dissolve");
    write("The Partners now desire to dissolve the Partnership and liquidate its affairs pursuant to a plan under which all assets will be sold and the net proceeds, after payment of liabilities, will be distributed as set forth below.");

    write("\n");
    write("2. DISSOLUTION AND TERMINATION", 12, true);
    write(
      `2.1 Effective Date of Dissolution\nThe Partnership shall be dissolved effective at the close of business on ${formData.dissolutionEffectiveDate ||
        "__________"} (the "Effective Date"). The Partners shall promptly wind up and liquidate the Partnership’s affairs.`
    );
    write("\n");
    write("2.2 Termination of Business");
    write("Except for actions necessary to wind up the affairs, no Partner shall transact further business, incur obligations, or bind the Partnership after the Effective Date.");
    write("\n");
    write("2.3 Statement of Dissolution");
    write("The Partners shall file a statement of dissolution with the appropriate governmental authorities and record the statement where required.");
    write("\n");
    write("2.4 Notice of Dissolution");
    write(
      `The Partners shall publish notice of the dissolution at least once in a newspaper of general circulation in the counties: ${formData.publicationCounties ||
        "[list counties]"} where the Partnership regularly conducted business.`
    );

    write("\n");
    write("3. LIQUIDATION OF ASSETS AND ACCOUNTS", 12, true);
    write("3.1 Accounting");
    write(
      `Immediately following dissolution, an accounting shall be conducted by ${formData.accountingFirm || "[Accounting Firm/Partner Name]"} of all assets, liabilities, and net worth as of the Effective Date.`
    );
    write("\n");
    write("3.2 Disclosure");
    write("Each Partner represents that no Partner has incurred any undisclosed liability chargeable to the Partnership.");
    write("\n");
    write("3.3 Settling Accounts");
    write(
      `Upon completion of the accounting, all liabilities shall be satisfied in accordance with applicable law. The remaining assets, after payment of liabilities, shall be distributed as follows: ${formData.distributionFormula ||
        "[distribution formula]"}`
    );
    write("\n");
    write("3.4 Appointment of Liquidating Partner");
    write(`The Partners appoint ${formData.liquidatingPartner || "[Partner Name/Designated Liquidator]"} as Liquidating Partner to carry out the liquidation in accordance with this Agreement.`);
    write("\n");
    write("3.5 Inspection of Books and Records");
    write("All Partners shall have the right to inspect and review the books, records, and accounts of the Partnership during liquidation.");

    write("\n");
    write("4. CONSTRUCTION PROVISIONS", 12, true);
    write(`4.1 Governing Law\nThis Agreement shall be governed by and construed in accordance with the laws of ${formData.jurisdiction ||
      "[State/Country]"}.`);
    write("\n");
    write("4.2 Headings");
    write("Headings are provided for convenience only and shall not affect interpretation.");
    write("\n");
    write("4.3 Binding Effect");
    write("This Agreement shall be binding upon the Partners and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns.");
    write("\n");
    write("4.4 Strict Construction");
    write("This Agreement shall not be construed strictly against any Partner.");

    write("\n");
    write("5. GENERAL CLAUSES", 12, true);
    write("5.1 Severability");
    write("If any provision is held invalid or unenforceable, the remaining provisions shall remain valid.");
    write("\n");
    write("5.2 Execution in Counterparts");
    write("This Agreement may be executed in one or more counterparts.");
    write("\n");
    write("5.3 Entire Agreement");
    write("This Agreement constitutes the entire understanding of the Partners with respect to dissolution and winding up.");
    write("\n");
    write("5.4 Waiver");
    write("The failure of any Partner to enforce a provision shall not constitute a waiver.");
    write("\n");
    write("5.5 Amendment");
    write("This Agreement may be amended only by a written instrument signed by all Partners.");
    write("\n");
    write("5.6 Survival of Representations and Warranties");
    write("All representations and warranties contained herein shall survive the dissolution and winding-up.");

    write("\n");
    write("6. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Partners have executed this Partnership Dissolution Agreement as of the date first written above.");
    write("\n");
    write(`${formData.partner1Name || "[Partner Name 1]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signPartner1Date || "_____________________"));
    write("\n");
    write(`${formData.partner2Name || "[Partner Name 2]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signPartner2Date || "_____________________"));

    doc.save("Partnership_Dissolution_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Introduction</h3>
              </div>
              <Label>Agreement Date (Effective Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Partnership Name</Label>
              <Input name="partnershipName" value={formData.partnershipName} onChange={handleChange} />

              <Label>Business Activity / Description</Label>
              <Textarea name="businessActivity" value={formData.businessActivity} onChange={handleChange} />

              <Label>Partnership Agreement Date</Label>
              <Input name="partnershipAgreementDate" value={formData.partnershipAgreementDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Partner 1</h4>
              <Label>Name</Label>
              <Input name="partner1Name" value={formData.partner1Name} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="partner1Address" value={formData.partner1Address} onChange={handleChange} />
              <Label>City / State / ZIP</Label>
              <Input name="partner1CityStateZip" value={formData.partner1CityStateZip} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Partner 2</h4>
              <Label>Name</Label>
              <Input name="partner2Name" value={formData.partner2Name} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="partner2Address" value={formData.partner2Address} onChange={handleChange} />
              <Label>City / State / ZIP</Label>
              <Input name="partner2CityStateZip" value={formData.partner2CityStateZip} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Dissolution & Liquidation</h3>
              <Label>Dissolution Effective Date</Label>
              <Input name="dissolutionEffectiveDate" value={formData.dissolutionEffectiveDate} onChange={handleChange} />

              <Label>Accounting Firm / Accountant</Label>
              <Input name="accountingFirm" value={formData.accountingFirm} onChange={handleChange} />

              <Label>Distribution Formula / Allocation</Label>
              <Textarea name="distributionFormula" value={formData.distributionFormula} onChange={handleChange} />

              <Label>Liquidating Partner (Name)</Label>
              <Input name="liquidatingPartner" value={formData.liquidatingPartner} onChange={handleChange} />

              <Label>Publication Counties (for dissolution notice)</Label>
              <Input name="publicationCounties" value={formData.publicationCounties} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Partner 1 - Signatory Name</Label>
              <Input name="signPartner1Name" value={formData.signPartner1Name} onChange={handleChange} />
              <Label>Partner 1 - Date</Label>
              <Input name="signPartner1Date" value={formData.signPartner1Date} onChange={handleChange} />

              <Label>Partner 2 - Signatory Name</Label>
              <Input name="signPartner2Name" value={formData.signPartner2Name} onChange={handleChange} />
              <Label>Partner 2 - Date</Label>
              <Input name="signPartner2Date" value={formData.signPartner2Date} onChange={handleChange} />
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
        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Partnership Dissolution Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
