import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  partnershipName: string;
  principalPlace: string;
  natureOfBusiness: string;
  partnershipAgreementDate: string;
  effectiveDate: string;
  dissolutionEffectiveDate: string;
  accountantName: string;
  distributionMethod: string;
  liquidatingPartner: string;
  governingLaw: string;
  partnerNames: string;
  signPartner1Name: string;
  signPartner1Date: string;
  signPartner2Name: string;
  signPartner2Date: string;
}

export default function LiquidationDissolutionAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    partnershipName: "",
    principalPlace: "",
    natureOfBusiness: "",
    partnershipAgreementDate: "",
    effectiveDate: "",
    dissolutionEffectiveDate: "",
    accountantName: "",
    distributionMethod: "",
    liquidatingPartner: "",
    governingLaw: "",
    partnerNames: "",
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

    write("LIQUIDATION AND DISSOLUTION AGREEMENT", 14, true, true);
    write("\n");

    // Opening
    write(`This Liquidation and Dissolution Agreement (hereinafter referred to as the \"Agreement\") is made and executed on this ${formData.effectiveDate || "___"} day of ${formData.effectiveDate || "_______"}, by and between the following partners (hereinafter collectively referred to as the \"Partners\" and individually as a \"Partner\"):\n${formData.partnerNames || "[Names of Partners]"}`);
    write("The Partners hereby record and affirm their mutual intention to dissolve the partnership and to liquidate and wind up its affairs in accordance with the terms and conditions set forth herein.");

    write("\n");
    write("ARTICLE I", 12, true);
    write("DESCRIPTION OF PARTNERSHIP", 12, true);
    write("1.1 Status and Nature of Partnership");
    write(`The Partnership known as ${formData.partnershipName || "[Name of Partnership]"}, having its principal place of business at ${formData.principalPlace || "[Address]"}, is engaged in the business of ${formData.natureOfBusiness || "[Nature of Business]"}. The Partners have heretofore jointly carried on and conducted the said business in accordance with mutually agreed terms.`);

    write("1.2 Existing Partnership Agreement");
    write(`The Partners entered into and operated under a written Partnership Agreement dated ${formData.partnershipAgreementDate || "___ day of _______, 20"} (the \"Partnership Agreement\"), a copy of which is attached hereto as Exhibit A and is hereby incorporated by reference as an integral part of this Agreement.`);

    write("1.3 Intention to Dissolve and Liquidate");
    write("The Partners have mutually resolved to dissolve the Partnership and liquidate its affairs pursuant to a structured plan whereby all assets of the Partnership shall be sold, realized, or otherwise disposed of, and the proceeds thereof shall be applied towards the settlement of all liabilities and obligations of the Partnership, with any remaining balance to be distributed among the Partners in accordance with the provisions of this Agreement.");

    write("\n");
    write("ARTICLE II", 12, true);
    write("DISSOLUTION", 12, true);
    write("2.1 Effective Date of Dissolution");
    write(`The Partners hereby agree that the Partnership shall stand dissolved with effect from the close of business on ${formData.dissolutionEffectiveDate || "[Effective Date]"}, whereupon the process of liquidation and winding-up shall commence forthwith.`);

    write("2.2 Cessation of Business Activities");
    write("Save and except for acts strictly necessary for the purpose of winding-up and liquidating the affairs of the Partnership, no Partner shall, after the Effective Date, carry on any further business or incur any obligation on behalf of the Partnership whatsoever.");

    write("\n");
    write("2.3 Statement of Dissolution");
    write("The Partners undertake to file a formal Statement of Dissolution with the appropriate governmental authority, including the office of the Division of Revenue or equivalent regulatory body, and to cause such statement to be duly recorded with the relevant county or jurisdictional recording offices where the Partnership has customarily conducted its business operations.");

    write("2.4 Public Notice of Dissolution");
    write("The Partners shall ensure that a notice of dissolution is published at least once in a newspaper of general circulation in each jurisdiction where the Partnership has regularly conducted its business, for the purpose of informing creditors and the general public.");

    write("\n");
    write("ARTICLE III", 12, true);
    write("LIQUIDATION AND SETTLEMENT", 12, true);
    write("3.1 Preparation of Accounting");
    write(`Immediately upon dissolution, the Partners shall cause a full and accurate accounting to be conducted by ${formData.accountantName || "[Name of Accountant / Auditor]"} detailing all assets, liabilities, and the net worth of the Partnership as of the Effective Date.`);

    write("3.2 Representations and Disclosure");
    write("Each Partner hereby represents and warrants that, save as reflected in the official books and records of the Partnership, no Partner has incurred any undisclosed liability chargeable to the Partnership, nor has any Partner wrongfully received, misappropriated, or discharged any funds, credits, or property belonging to the Partnership.");

    write("3.3 Settlement of Liabilities and Distribution of Surplus");
    write("Upon completion of the accounting, all liabilities and obligations of the Partnership, including any amounts due to the Partners other than for capital contributions or profit shares, shall be settled in accordance with the applicable provisions of the Uniform Partnership Act or relevant governing law. Thereafter, any remaining surplus shall be distributed among the Partners in the following manner:");
    write(formData.distributionMethod || "[Specify distribution method / ratios].");

    write("3.4 Appointment of Liquidating Partner");
    write(`The Partners hereby appoint ${formData.liquidatingPartner || "[Name of Partner]"} as the Liquidating Partner, who shall be responsible for overseeing and executing the liquidation process in accordance with this Agreement and applicable law.`);

    write("3.5 Right of Inspection");
    write("Each Partner shall have the right, either personally or through an authorised representative, at all reasonable times, to inspect and examine the books, accounts, and relevant records of the Partnership for the purpose of safeguarding and enforcing his or her rights under this Agreement.");

    write("\n");
    write("ARTICLE IV", 12, true);
    write("GENERAL AND CONSTRUCTION PROVISIONS", 12, true);
    write("4.1 Governing Law");
    write(`This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[Jurisdiction]"}.`);

    write("4.2 Further Assurances");
    write("The Partners covenant and agree to execute and deliver all such further documents and instruments as may be necessary or desirable to effectively carry out the intent or purpose of this Agreement.");

    write("4.3 Headings");
    write("The headings contained herein are inserted for convenience only and shall not affect the interpretation or construction of any provision of this Agreement.");

    write("4.4 Binding Effect");
    write("This Agreement shall be binding upon and shall inure to the benefit of the Partners and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns.");

    write("4.5 No Strict Construction");
    write("This Agreement shall not be construed strictly against any Partner by reason of that Partner having drafted or proposed any provision hereof.");

    write("4.6 Severability");
    write("If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed severed, and the remaining provisions shall continue in full force and effect.");

    write("4.7 Counterparts");
    write("This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.");

    write("4.8 Supersession of Prior Agreements");
    write("This Agreement supersedes all prior oral or written understandings, arrangements, or agreements between the Partners relating to the subject matter hereof, including the Partnership Agreement, to the extent of any inconsistency.");

    write("4.9 Survival of Representations");
    write("All representations and warranties contained herein shall survive the dissolution, accounting, and winding-up of the Partnership and shall remain binding upon the Partners.");

    write("\n");
    write("EXECUTION", 12, true);
    write("IN WITNESS WHEREOF, the Partners have executed this Liquidation and Dissolution Agreement on the date first written above, with the clear intention of creating legally binding obligations.");
    write("For and on behalf of the Partnership: " + (formData.partnershipName || "[Name of Partnership]"));

    write("\n");
    write(`Name: ${formData.signPartner1Name || "______________________"}`);
    write("Signature: ____________________");
    write(`Date: ${formData.signPartner1Date || "_______________________"}`);

    write("\n");
    write(`Name: ${formData.signPartner2Name || "______________________"}`);
    write("Signature: ____________________");
    write(`Date: ${formData.signPartner2Date || "_______________________"}`);

    doc.save("Liquidation_and_Dissolution_Agreement.pdf");
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
              <Label>Principal Place of Business</Label>
              <Input name="principalPlace" value={formData.principalPlace} onChange={handleChange} />
              <Label>Nature of Business</Label>
              <Input name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} />
              <Label>Partnership Agreement Date</Label>
              <Input name="partnershipAgreementDate" value={formData.partnershipAgreementDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Dissolution & Liquidation</h3>
              <Label>Effective Date (agreement signing)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Dissolution Effective Date (close of business)</Label>
              <Input name="dissolutionEffectiveDate" value={formData.dissolutionEffectiveDate} onChange={handleChange} />
              <Label>Accountant / Auditor</Label>
              <Input name="accountantName" value={formData.accountantName} onChange={handleChange} />
              <Label>Distribution Method / Ratios</Label>
              <Textarea name="distributionMethod" value={formData.distributionMethod} onChange={handleChange} rows={3} />
              <Label>Liquidating Partner</Label>
              <Input name="liquidatingPartner" value={formData.liquidatingPartner} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">General Provisions & Execution</h3>
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Partner Names (comma separated)</Label>
              <Textarea name="partnerNames" value={formData.partnerNames} onChange={handleChange} rows={3} />

              <h4 className="mt-4 font-semibold">Signatures</h4>
              <Label>Partner 1 - Name</Label>
              <Input name="signPartner1Name" value={formData.signPartner1Name} onChange={handleChange} />
              <Label>Partner 1 - Date</Label>
              <Input name="signPartner1Date" value={formData.signPartner1Date} onChange={handleChange} />

              <Label>Partner 2 - Name</Label>
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
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
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
            <div className="text-green-600 font-semibold">Liquidation & Dissolution Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
