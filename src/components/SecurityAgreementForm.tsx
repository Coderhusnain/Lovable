import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;

  // Debtor
  debtorName: string;
  debtorAddress: string;
  debtorCityStateZip: string;

  // Secured Party
  securedName: string;
  securedAddress: string;
  securedCityStateZip: string;

  principalAmount: string;
  collateralDescription: string;
  collateralAdditional: string;
  collateralLocationAddress: string;
  collateralLocationCityStateZip: string;

  jurisdiction: string;
  noticeDebtorAddress: string;
  noticeSecuredAddress: string;

  signDebtorName: string;
  signDebtorTitle: string;
  signDebtorDate: string;

  signSecuredName: string;
  signSecuredTitle: string;
  signSecuredDate: string;
}

export default function SecurityAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    debtorName: "",
    debtorAddress: "",
    debtorCityStateZip: "",
    securedName: "",
    securedAddress: "",
    securedCityStateZip: "",
    principalAmount: "",
    collateralDescription: "",
    collateralAdditional: "",
    collateralLocationAddress: "",
    collateralLocationCityStateZip: "",
    jurisdiction: "",
    noticeDebtorAddress: "",
    noticeSecuredAddress: "",
    signDebtorName: "",
    signDebtorTitle: "",
    signDebtorDate: "",
    signSecuredName: "",
    signSecuredTitle: "",
    signSecuredDate: "",
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
        y += size * 1.28;
      });
    };

    write("SECURITY AGREEMENT", 14, true, true);
    write("\n");

    // Header with parties
    write(
      `This Security Agreement (“Agreement”) is made and entered into on this ${formData.effectiveDate || "___ day of _______________"} , ------, by and between:`
    );
    write("\n");
    write("Debtor:");
    write(`Name: ${formData.debtorName || "_______________________________________________"}`);
    write(`Address: ${formData.debtorAddress || "_______________________________________________"}`);
    write(`City/State/Zip: ${formData.debtorCityStateZip || "_________________________________________"}`);
    write("\n");
    write("AND");
    write("\n");
    write("Secured Party:");
    write(`Name: ${formData.securedName || "_______________________________________________"}`);
    write(`Address: ${formData.securedAddress || "_______________________________________________"}`);
    write(`City/State/Zip: ${formData.securedCityStateZip || "_________________________________________"}`);
    write("\n");
    write("Each individually referred to as a “Party” and collectively as the “Parties.”");
    write("\n");

    // RECITALS
    write("RECITALS", 12, true);
    write(
      `WHEREAS, the Debtor is indebted to the Secured Party pursuant to a promissory note in the principal amount of ${formData.principalAmount ||
        "[insert principal amount]"}, together with all other obligations of the Debtor, whether presently existing or hereafter arising; and`
    );
    write(
      "WHEREAS, the Debtor desires to grant a security interest in certain property described herein as collateral to secure the full and prompt payment and performance of all such obligations; and"
    );
    write(
      "WHEREAS, the Secured Party agrees to accept said collateral as security for the obligations of the Debtor, subject to the terms and conditions of this Agreement."
    );
    write(
      "NOW, THEREFORE, in consideration of the mutual covenants contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:"
    );
    write("\n");

    // 1. Creation of security interest
    write("1. CREATION OF SECURITY INTEREST", 12, true);
    write(
      "1.1 The Debtor hereby grants, assigns, and conveys to the Secured Party a continuing security interest in the property described in Clause 2 below (“Collateral”), as security for:"
    );
    write("(a) Payment and performance of Debtor’s obligations under the promissory note in the principal amount of " + (formData.principalAmount || "[insert amount]") + "; and");
    write(
      "(b) Payment and performance of all other liabilities, debts, and obligations of every kind and nature now existing or hereafter arising between the Debtor and the Secured Party, whether direct or indirect, absolute or contingent, and whether due or to become due (collectively, the “Obligations”)."
    );
    write("1.2 This security interest shall attach upon the execution of this Agreement and shall remain in effect until all Obligations have been fully satisfied.");
    write("\n");

    // 2. Collateral
    write("2. COLLATERAL", 12, true);
    write("2.1 The Collateral subject to this Agreement includes the following described property:");
    write(formData.collateralDescription || "[Insert detailed description of collateral – e.g., equipment, vehicles, inventory, receivables, or personal property]");
    write("2.2 The Collateral also includes:");
    write("(a) All replacements, substitutions, accessions, and additions to the property described above;");
    write("(b) All proceeds (including insurance proceeds) arising from the sale, lease, or other disposition of the Collateral; and");
    write("(c) All rights and interests which the Debtor now owns or hereafter acquires in connection with the Collateral.");
    write("\n");

    // 3. Location of Collateral
    write("3. LOCATION OF COLLATERAL", 12, true);
    write("3.1 The Collateral is or will be located at:");
    write("Address: " + (formData.collateralLocationAddress || "__________________________________________"));
    write("City/State/Zip: " + (formData.collateralLocationCityStateZip || "_____________________________________"));
    write("3.2 The Debtor shall not remove or relocate the Collateral from the above location except in the ordinary course of business or with the prior written consent of the Secured Party.");
    write("\n");

    // 4. Debtor's representations
    write("4. DEBTOR’S REPRESENTATIONS, WARRANTIES, AND COVENANTS", 12, true);
    write("The Debtor hereby represents, warrants, and covenants that:");
    write("4.1 Ownership and Authority: The Debtor is the lawful owner of the Collateral, free and clear of all liens, encumbrances, and adverse claims, except as disclosed herein.");
    write("4.2 Payment Obligations: The Debtor shall duly and punctually pay to the Secured Party the amounts evidenced by the promissory note and all other Obligations in accordance with their respective terms.");
    write("4.3 Maintenance and Insurance: The Debtor shall:");
    write("• Maintain the Collateral in good working order and condition, making all necessary repairs, replacements, and improvements.");
    write("• Keep the Collateral insured at all times against fire, theft, loss, and such other risks and in such amounts as may be reasonably required by the Secured Party.");
    write("• Furnish proof of insurance upon request by the Secured Party.");
    write("4.4 Preservation of Collateral: The Debtor shall not sell, transfer, assign, or otherwise dispose of the Collateral or any interest therein without the prior written consent of the Secured Party.");
    write("4.5 Taxes and Liens: The Debtor shall keep the Collateral free from all unpaid taxes, charges, and liens, and shall pay all assessments or levies relating thereto when due.");
    write("4.6 Notification: The Debtor shall immediately notify the Secured Party in writing of any change in its address or any event that may materially affect the Collateral.");
    write("\n");

    // 5. Default
    write("5. DEFAULT", 12, true);
    write("5.1 The Debtor shall be deemed in default under this Agreement upon the occurrence of any of the following events:");
    write("(a) Failure to make payment or perform any obligation when due under the promissory note or this Agreement;");
    write("(b) Breach of any covenant, warranty, or representation contained herein;");
    write("(c) Insolvency, bankruptcy, or assignment for the benefit of creditors by the Debtor; or");
    write("(d) Any attempt by the Debtor to sell, transfer, or encumber the Collateral in violation of this Agreement.");
    write("\n");
    write("5.2 Remedies Upon Default:");
    write("Upon default, the Secured Party may, at its sole discretion, declare all Obligations immediately due and payable and may exercise any and all rights available under applicable law, including but not limited to:");
    write("(a) Taking possession of the Collateral with or without judicial process;");
    write("(b) Selling, leasing, or otherwise disposing of the Collateral in a commercially reasonable manner; and");
    write("(c) Applying the proceeds of any disposition to the satisfaction of the Obligations, with any surplus returned to the Debtor and any deficiency remaining due from the Debtor.");
    write("\n");

    // 6. Waiver
    write("6. WAIVER", 12, true);
    write(
      "No waiver by the Secured Party of any default or breach shall operate as a waiver of any subsequent default or breach, and no delay or omission on the part of the Secured Party in exercising any right or remedy shall impair such right or be construed as a waiver thereof."
    );
    write("\n");

    // 7. Notices
    write("7. NOTICES", 12, true);
    write("7.1 All notices or communications required under this Agreement shall be made in writing and delivered either:");
    write("(a) Personally;");
    write("(b) By registered or certified mail, postage prepaid, return receipt requested; or");
    write("(c) By reputable courier or electronic mail with confirmation of receipt.");
    write("7.2 Notice shall be deemed given:");
    write("• On the date of delivery if delivered personally;");
    write("• Three (3) business days after mailing if sent by certified mail; or");
    write("• Upon confirmed transmission if sent electronically.");
    write("7.3 The address of each Party for the purpose of receiving notice shall be:");
    write("Debtor: " + (formData.noticeDebtorAddress || "____________________________________________"));
    write("Secured Party: " + (formData.noticeSecuredAddress || "_____________________________________"));
    write("Either Party may change its address for notice purposes by giving written notice to the other Party in accordance with this Clause.");
    write("\n");

    // 8. Governing law
    write("8. GOVERNING LAW AND JURISDICTION", 12, true);
    write(
      `This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State/Province of ${formData.jurisdiction || "[insert jurisdiction]"}, and all obligations hereunder shall be performable in ${formData.jurisdiction ||
        "[insert location]"}.`
    );
    write(
      "Each Party hereby consents to the exclusive jurisdiction of the courts located in said jurisdiction for the resolution of any disputes arising out of or relating to this Agreement."
    );
    write("\n");

    // 9-13
    write("9. BINDING EFFECT", 12, true);
    write("This Agreement shall be binding upon and inure to the benefit of the Parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns.");
    write("\n");
    write("10. SEVERABILITY", 12, true);
    write(
      "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall continue in full force and effect."
    );
    write("\n");
    write("11. ENTIRE AGREEMENT", 12, true);
    write(
      "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, representations, and understandings, whether oral or written. No amendment or modification of this Agreement shall be valid unless made in writing and executed by both Parties."
    );
    write("\n");
    write("12. ATTORNEY’S FEES", 12, true);
    write(
      "In the event of any dispute or legal action arising out of this Agreement, the prevailing party shall be entitled to recover from the other Party all reasonable attorney’s fees, court costs, and expenses incurred in enforcing or defending its rights hereunder."
    );
    write("\n");

    // Execution block
    write("13. EXECUTION", 12, true);
    write("This Agreement shall be executed on behalf of the Debtor and the Secured Party as follows and shall be effective as of the date first written above.");
    write("\n");
    write("Debtor\tSecured Party");
    write("By: " + (formData.signDebtorName || "________________________") + "\tBy: " + (formData.signSecuredName || "________________________"));
    write("Name: " + (formData.signDebtorName || "______________________") + "\tName: " + (formData.signSecuredName || "______________________"));
    write("Title (if applicable): " + (formData.signDebtorTitle || "_________________") + "\tTitle (if applicable): " + (formData.signSecuredTitle || "_________________"));
    write("Date: " + (formData.signDebtorDate || "______________________") + "\tDate: " + (formData.signSecuredDate || "______________________"));
    write("\n");

    write("ACKNOWLEDGMENT", 12, true);
    write("The Parties acknowledge that they have carefully read this Agreement, fully understand its terms, and voluntarily execute it with the intent to be legally bound.");

    doc.save("Security_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Recitals</h3>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Debtor</h4>
              <Label>Name</Label>
              <Input name="debtorName" value={formData.debtorName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="debtorAddress" value={formData.debtorAddress} onChange={handleChange} />
              <Label>City / State / Zip</Label>
              <Input name="debtorCityStateZip" value={formData.debtorCityStateZip} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Secured Party</h4>
              <Label>Name</Label>
              <Input name="securedName" value={formData.securedName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="securedAddress" value={formData.securedAddress} onChange={handleChange} />
              <Label>City / State / Zip</Label>
              <Input name="securedCityStateZip" value={formData.securedCityStateZip} onChange={handleChange} />

              <Label>Principal Amount</Label>
              <Input name="principalAmount" value={formData.principalAmount} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Collateral & Covenants</h3>

              <Label>Collateral Description</Label>
              <Textarea name="collateralDescription" value={formData.collateralDescription} onChange={handleChange} />

              <Label>Collateral - Additional Info / replacements / proceeds (optional)</Label>
              <Textarea name="collateralAdditional" value={formData.collateralAdditional} onChange={handleChange} />

              <Label>Collateral Location Address</Label>
              <Textarea name="collateralLocationAddress" value={formData.collateralLocationAddress} onChange={handleChange} />
              <Label>Collateral Location City / State / Zip</Label>
              <Input name="collateralLocationCityStateZip" value={formData.collateralLocationCityStateZip} onChange={handleChange} />

              <Label>Jurisdiction / Governing Law</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Notices, Law & Execution</h3>

              <Label>Notice - Debtor Address</Label>
              <Textarea name="noticeDebtorAddress" value={formData.noticeDebtorAddress} onChange={handleChange} />

              <Label>Notice - Secured Party Address</Label>
              <Textarea name="noticeSecuredAddress" value={formData.noticeSecuredAddress} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Debtor - Signature</h4>
              <Label>Signatory Name</Label>
              <Input name="signDebtorName" value={formData.signDebtorName} onChange={handleChange} />
              <Label>Title (if applicable)</Label>
              <Input name="signDebtorTitle" value={formData.signDebtorTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signDebtorDate" value={formData.signDebtorDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Secured Party - Signature</h4>
              <Label>Signatory Name</Label>
              <Input name="signSecuredName" value={formData.signSecuredName} onChange={handleChange} />
              <Label>Title (if applicable)</Label>
              <Input name="signSecuredTitle" value={formData.signSecuredTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signSecuredDate" value={formData.signSecuredDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Security Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
