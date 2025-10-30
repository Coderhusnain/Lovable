import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  day: string;
  month: string;
  year: string;
  debtorName: string;
  debtorAddress: string;
  debtorCityStateZip: string;
  securedName: string;
  securedAddress: string;
  securedCityStateZip: string;
  principalAmount: string;
  collateralDescription: string;
  collateralLocationAddress: string;
  collateralLocationCityStateZip: string;
  governingJurisdiction: string;
  governingLocation: string;
  noticeDebtorAddress: string;
  noticeSecuredAddress: string;
  debtorSignerName: string;
  debtorSignerTitle: string;
  debtorSignerDate: string;
  securedSignerName: string;
  securedSignerTitle: string;
  securedSignerDate: string;
}

const defaultFormData: FormData = {
  day: "",
  month: "",
  year: "",
  debtorName: "",
  debtorAddress: "",
  debtorCityStateZip: "",
  securedName: "",
  securedAddress: "",
  securedCityStateZip: "",
  principalAmount: "",
  collateralDescription: "",
  collateralLocationAddress: "",
  collateralLocationCityStateZip: "",
  governingJurisdiction: "",
  governingLocation: "",
  noticeDebtorAddress: "",
  noticeSecuredAddress: "",
  debtorSignerName: "",
  debtorSignerTitle: "",
  debtorSignerDate: "",
  securedSignerName: "",
  securedSignerTitle: "",
  securedSignerDate: "",
};

const SecurityAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const filled = (template: string, replacement: string) => {
    if (!replacement || replacement.trim() === "") return template;
    return template.replace(/_{3,}|\[insert[^\]]*\]/, replacement);
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 14;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 720) {
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

      const paragraphs: string[] = [];

      paragraphs.push(
        `SECURITY AGREEMENTThis Security Agreement (\u201cAgreement\u201d) is made and entered into on this ${formData.day || "___"} day of ${formData.month || "_____________"}, ${formData.year || "------"}, by and between:Debtor:Name: ${formData.debtorName || "_______________________________________________"}Address: ${formData.debtorAddress || "_______________________________________________"}City/State/Zip: ${formData.debtorCityStateZip || "___________________________________________"}ANDSecured Party:Name: ${formData.securedName || "_______________________________________________"}Address: ${formData.securedAddress || "_______________________________________________"}City/State/Zip: ${formData.securedCityStateZip || "___________________________________________"}Each individually referred to as a \u201cParty\u201d and collectively as the \u201cParties.\u201d`
      );

      paragraphs.push(
        `RECITALSWHEREAS, the Debtor is indebted to the Secured Party pursuant to a promissory note in the principal amount of ${formData.principalAmount || "[insert principal amount]"}, together with all other obligations of the Debtor, whether presently existing or hereafter arising; andWHEREAS, the Debtor desires to grant a security interest in certain property described herein as collateral to secure the full and prompt payment and performance of all such obligations; andWHEREAS, the Secured Party agrees to accept said collateral as security for the obligations of the Debtor, subject to the terms and conditions of this Agreement.`
      );

      paragraphs.push(
        `NOW, THEREFORE, in consideration of the mutual covenants contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:`
      );

      paragraphs.push(
        `1. CREATION OF SECURITY INTEREST1.1 The Debtor hereby grants, assigns, and conveys to the Secured Party a continuing security interest in the property described in Clause 2 below (\u201cCollateral\u201d), as security for:(a) Payment and performance of Debtor\u2019s obligations under the promissory note in the principal amount of ${formData.principalAmount || "[insert amount]"}; and(b) Payment and performance of all other liabilities, debts, and obligations of every kind and nature now existing or hereafter arising between the Debtor and the Secured Party, whether direct or indirect, absolute or contingent, and whether due or to become due (collectively, the \u201cObligations\u201d).1.2 This security interest shall attach upon the execution of this Agreement and shall remain in effect until all Obligations have been fully satisfied.`
      );

      paragraphs.push(
        `2. COLLATERAL2.1 The Collateral subject to this Agreement includes the following described property:${formData.collateralDescription || "[Insert detailed description of collateral \u2013 e.g., equipment, vehicles, inventory, receivables, or personal property]"}2.2 The Collateral also includes:(a) All replacements, substitutions, accessions, and additions to the property described above;(b) All proceeds (including insurance proceeds) arising from the sale, lease, or other disposition of the Collateral; and(c) All rights and interests which the Debtor now owns or hereafter acquires in connection with the Collateral.`
      );

      paragraphs.push(
        `3. LOCATION OF COLLATERAL3.1 The Collateral is or will be located at:Address: ${formData.collateralLocationAddress || "____________________________________________"}City/State/Zip: ${formData.collateralLocationCityStateZip || "_____________________________________"}3.2 The Debtor shall not remove or relocate the Collateral from the above location except in the ordinary course of business or with the prior written consent of the Secured Party.`
      );

      paragraphs.push(
        `4. DEBTOR\u2019S REPRESENTATIONS, WARRANTIES, AND COVENANTSThe Debtor hereby represents, warrants, and covenants that:4.1 Ownership and Authority: The Debtor is the lawful owner of the Collateral, free and clear of all liens, encumbrances, and adverse claims, except as disclosed herein.4.2 Payment Obligations: The Debtor shall duly and punctually pay to the Secured Party the amounts evidenced by the promissory note and all other Obligations in accordance with their respective terms.4.3 Maintenance and Insurance: The Debtor shall:\u2022Maintain the Collateral in good working order and condition, making all necessary repairs, replacements, and improvements.\u2022Keep the Collateral insured at all times against fire, theft, loss, and such other risks and in such amounts as may be reasonably required by the Secured Party.\u2022Furnish proof of insurance upon request by the Secured Party.4.4 Preservation of Collateral: The Debtor shall not sell, transfer, assign, or otherwise dispose of the Collateral or any interest therein without the prior written consent of the Secured Party.`
      );

      paragraphs.push(
        `4.5 Taxes and Liens: The Debtor shall keep the Collateral free from all unpaid taxes, charges, and liens, and shall pay all assessments or levies relating thereto when due.4.6 Notification: The Debtor shall immediately notify the Secured Party in writing of any change in its address or any event that may materially affect the Collateral.`
      );

      paragraphs.push(
        `5. DEFAULT5.1 The Debtor shall be deemed in default under this Agreement upon the occurrence of any of the following events:(a) Failure to make payment or perform any obligation when due under the promissory note or this Agreement;(b) Breach of any covenant, warranty, or representation contained herein;(c) Insolvency, bankruptcy, or assignment for the benefit of creditors by the Debtor; or(d) Any attempt by the Debtor to sell, transfer, or encumber the Collateral in violation of this Agreement.5.2 Remedies Upon Default:Upon default, the Secured Party may, at its sole discretion, declare all Obligations immediately due and payable and may exercise any and all rights available under applicable law, including but not limited to:(a) Taking possession of the Collateral with or without judicial process;(b) Selling, leasing, or otherwise disposing of the Collateral in a commercially reasonable manner; and(c) Applying the proceeds of any disposition to the satisfaction of the Obligations, with any surplus returned to the Debtor and any deficiency remaining due from the Debtor.`
      );

      paragraphs.push(
        `6. WAIVERNo waiver by the Secured Party of any default or breach shall operate as a waiver of any subsequent default or breach, and no delay or omission on the part of the Secured Party in exercising any right or remedy shall impair such right or be construed as a waiver thereof.`
      );

      paragraphs.push(
        `7. NOTICES7.1 All notices or communications required under this Agreement shall be made in writing and delivered either:(a) Personally;(b) By registered or certified mail, postage prepaid, return receipt requested; or(c) By reputable courier or electronic mail with confirmation of receipt.7.2 Notice shall be deemed given:\u2022On the date of delivery if delivered personally;\u2022Three (3) business days after mailing if sent by certified mail; or\n\u2022Upon confirmed transmission if sent electronically.7.3 The address of each Party for the purpose of receiving notice shall be:Debtor: ${formData.noticeDebtorAddress || "______________________________________________"}Secured Party: ${formData.noticeSecuredAddress || "_____________________________________"}Either Party may change its address for notice purposes by giving written notice to the other Party in accordance with this Clause.`
      );

      paragraphs.push(
        filled(`8. GOVERNING LAW AND JURISDICTIONThis Agreement shall be governed by, construed, and enforced in accordance with the laws of the State/Province of [insert jurisdiction], and all obligations hereunder shall be performable in [insert location].`, formData.governingJurisdiction)
      );

      paragraphs.push(
        filled(`Each Party hereby consents to the exclusive jurisdiction of the courts located in said jurisdiction for the resolution of any disputes arising out of or relating to this Agreement.`, formData.governingLocation)
      );

      paragraphs.push(
        `9. BINDING EFFECTThis Agreement shall be binding upon and inure to the benefit of the Parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns.`
      );

      paragraphs.push(
        `10. SEVERABILITYIf any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall continue in full force and effect.`
      );

      paragraphs.push(
        `11. ENTIRE AGREEMENTThis Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, representations, and understandings, whether oral or written.No amendment or modification of this Agreement shall be valid unless made in writing and executed by both Parties.`
      );

      paragraphs.push(
        `12. ATTORNEY\u2019S FEESIn the event of any dispute or legal action arising out of this Agreement, the prevailing party shall be entitled to recover from the other Party all reasonable attorney\u2019s fees, court costs, and expenses incurred in enforcing or defending its rights hereunder.`
      );

      paragraphs.push(
        `13. EXECUTIONThis Agreement shall be executed on behalf of the Debtor and the Secured Party as follows and shall be effective as of the date first written above.`
      );

      paragraphs.push(
        `Debtor\nBy: ${formData.debtorSignerName || "________________________"}\nName: ${formData.debtorSignerName || "______________________"}\nTitle (if applicable): ${formData.debtorSignerTitle || "_________________"}\nDate: ${formData.debtorSignerDate || "______________________"}`
      );

      paragraphs.push(
        `Secured Party\nBy: ${formData.securedSignerName || "________________________"}\nName: ${formData.securedSignerName || "______________________"}\nTitle (if applicable): ${formData.securedSignerTitle || "_________________"}\nDate: ${formData.securedSignerDate || "______________________"}`
      );

      paragraphs.push(
        `ACKNOWLEDGMENTThe Parties acknowledge that they have carefully read this Agreement, fully understand its terms, and voluntarily execute it with the intent to be legally bound.`
      );

      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });

      doc.save("security-agreement.pdf");
      toast.success("Security Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Security Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Day</Label>
                  <Input value={formData.day} onChange={(e) => handleInputChange("day", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input value={formData.month} onChange={(e) => handleInputChange("month", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input value={formData.year} onChange={(e) => handleInputChange("year", e.target.value)} placeholder="------" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Debtor - Name</Label>
                <Input value={formData.debtorName} onChange={(e) => handleInputChange("debtorName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Address</Label>
                <Textarea value={formData.debtorAddress} onChange={(e) => handleInputChange("debtorAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - City/State/Zip</Label>
                <Input value={formData.debtorCityStateZip} onChange={(e) => handleInputChange("debtorCityStateZip", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Secured Party - Name</Label>
                <Input value={formData.securedName} onChange={(e) => handleInputChange("securedName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Secured Party - Address</Label>
                <Textarea value={formData.securedAddress} onChange={(e) => handleInputChange("securedAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Secured Party - City/State/Zip</Label>
                <Input value={formData.securedCityStateZip} onChange={(e) => handleInputChange("securedCityStateZip", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recitals & Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Principal Amount</Label>
                <Input value={formData.principalAmount} onChange={(e) => handleInputChange("principalAmount", e.target.value)} placeholder="[insert principal amount]" />
              </div>

              <div className="space-y-2">
                <Label>Collateral Description</Label>
                <Textarea value={formData.collateralDescription} onChange={(e) => handleInputChange("collateralDescription", e.target.value)} placeholder="[Insert detailed description of collateral – e.g., equipment, vehicles, inventory, receivables, or personal property]" />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Collateral Location & Covenants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Collateral - Address</Label>
                <Input value={formData.collateralLocationAddress} onChange={(e) => handleInputChange("collateralLocationAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Collateral - City/State/Zip</Label>
                <Input value={formData.collateralLocationCityStateZip} onChange={(e) => handleInputChange("collateralLocationCityStateZip", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Notice - Debtor Address (for notices clause)</Label>
                <Textarea value={formData.noticeDebtorAddress} onChange={(e) => handleInputChange("noticeDebtorAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Notice - Secured Party Address (for notices clause)</Label>
                <Textarea value={formData.noticeSecuredAddress} onChange={(e) => handleInputChange("noticeSecuredAddress", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Governing Law & Jurisdiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Governing Jurisdiction (State/Province)</Label>
                <Input value={formData.governingJurisdiction} onChange={(e) => handleInputChange("governingJurisdiction", e.target.value)} placeholder="[insert jurisdiction]" />
              </div>

              <div className="space-y-2">
                <Label>Governing Location (performable in)</Label>
                <Input value={formData.governingLocation} onChange={(e) => handleInputChange("governingLocation", e.target.value)} placeholder="[insert location]" />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Execution & Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Debtor - Signer Name</Label>
                <Input value={formData.debtorSignerName} onChange={(e) => handleInputChange("debtorSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Title (if applicable)</Label>
                <Input value={formData.debtorSignerTitle} onChange={(e) => handleInputChange("debtorSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Date</Label>
                <Input value={formData.debtorSignerDate} onChange={(e) => handleInputChange("debtorSignerDate", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Secured Party - Signer Name</Label>
                <Input value={formData.securedSignerName} onChange={(e) => handleInputChange("securedSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Secured Party - Title (if applicable)</Label>
                <Input value={formData.securedSignerTitle} onChange={(e) => handleInputChange("securedSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Secured Party - Date</Label>
                <Input value={formData.securedSignerDate} onChange={(e) => handleInputChange("securedSignerDate", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Agreement</h1>
        <p className="text-gray-600">Paste fields and export the Security Agreement as a PDF. Every word in the original will be preserved.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 5</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }} />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 5 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF}>Generate PDF</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityAgreementForm;
