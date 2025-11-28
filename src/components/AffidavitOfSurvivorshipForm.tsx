import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  state: string;
  county: string;
  affiantName: string;
  affiantAddress: string;
  deedDay: string;
  deedMonth: string;
  deedYear: string;
  bookVolume: string;
  page: string;
  officialRecordsCounty: string;
  documentNumber: string;
  coOwnerName: string;
  legalDescription: string;
  acquiredAsJointTenants: string;
  deathDay: string;
  deathMonth: string;
  deathYear: string;
  deceasedName: string;
  exhibitLabel: string;
  executionDay: string;
  executionMonth: string;
  executionYear: string;
  notaryDay: string;
  notaryMonth: string;
  notaryYear: string;
  commissionExpires: string;
  notaryState: string;
  countryOf: string;
}

export default function AffidavitOfSurvivorshipForm() {
  const [formData, setFormData] = useState<FormData>({
    state: "",
    county: "",
    affiantName: "",
    affiantAddress: "",
    deedDay: "",
    deedMonth: "",
    deedYear: "",
    bookVolume: "",
    page: "",
    officialRecordsCounty: "",
    documentNumber: "",
    coOwnerName: "",
    legalDescription: "",
    acquiredAsJointTenants: "",
    deathDay: "",
    deathMonth: "",
    deathYear: "",
    deceasedName: "",
    exhibitLabel: "Exhibit A",
    executionDay: "",
    executionMonth: "",
    executionYear: "",
    notaryDay: "",
    notaryMonth: "",
    notaryYear: "",
    commissionExpires: "",
    notaryState: "",
    countryOf: "",
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

    const addText = (
      text: string,
      fontSize = 11,
      isBold = false,
      isCenter = false
    ) => {
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
          const tw =
            (doc.getStringUnitWidth(line) * fontSize) /
            doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // === PDF Content ===
    addText("AFFIDAVIT OF SURVIVORSHIP", 14, true, true);
    addText(`State of ${formData.state || "____________________"}`);
    addText("\n");
    addText(`County of ${formData.county || "_________________"}`);
    addText(
      `I, ${formData.affiantName || "____________________________"}, residing at ${formData.affiantAddress || "_____________________________"}, being of legal age and competent to testify, do hereby depose and state as follows:`
    );
    addText(
      `1.That on the ${formData.deedDay || "_____"} day of ${formData.deedMonth || "______"}, ${formData.deedYear || "20__"}, by deed executed on that date and recorded in Book/Volume ${formData.bookVolume || "______"}, Page ${formData.page || "______"}, of the Official Records of ${formData.officialRecordsCounty || "__________"} County, under Document Number ${formData.documentNumber || "__________"} (hereinafter referred to as the “Deed”), the undersigned Affiant and ${formData.coOwnerName || "________________________"} became joint owners of the following legally described real property:`
    );
    addText(formData.legalDescription || "[Insert full legal description of the property here.]");
    addText(
      `2.That the Affiant and ${formData.coOwnerName || "________________________"} acquired title to the said property as ${formData.acquiredAsJointTenants || "joint tenants with right of survivorship"}.`
    );
    addText(
      `3.That on the ${formData.deathDay || "_____"} day of ${formData.deathMonth || "______"}, ${formData.deathYear || "20__"}, the said ${formData.deceasedName || "________________________"} died, thereby terminating his/her interest in the above-described real property. A certified copy of the death certificate of ${formData.deceasedName || "________________________"} is attached hereto and marked as ${formData.exhibitLabel || "Exhibit A"}.`
    );
    addText("Oath or Affirmation");
    addText(
      "I certify under penalty of perjury under the laws of the State of ____________________ that the foregoing statements made in this Affidavit are true and correct to the best of my knowledge, information, and belief."
    );
    addText(
      `Executed this ${formData.executionDay || "_____"} day of ${formData.executionMonth || "________"}, ${formData.executionYear || "20__"}.`
    );
    addText("\n");
    addText(formData.affiantName || "[Affiant's Full Name]");
    addText("\n");
    addText("(Signature of Affiant)");
    addText("\n");
    addText(
      `Subscribed and sworn to before me on this ${formData.notaryDay || "_____"} day of ${formData.notaryMonth || "________"}, ${formData.notaryYear || "20__"}.`
    );
    addText("\n");
    addText("Notary Public");
    addText("\n");
    addText(`My Commission Expires: ${formData.commissionExpires || "_______________"}`);
    addText("\n");
    addText(`State of : ${formData.notaryState || "_______________"}`);
    addText(`Country Of : ${formData.countryOf || "_______________"}`);
    addText("\n");
    addText("Make It Legal");
    addText("\n");
    addText(
      "This Affidavit should be signed in front of a notary public by ---------------------."
    );
    addText(
      "Once signed in front of a notary, this document should be delivered to the appropriate court for filing."
    );
    addText("Copies");
    addText(
      "The original Affidavit should be filed with the Clerk of Court or delivered to the requesting business."
    );
    addText(
      "The Affiant should maintain a copy of the Affidavit. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference."
    );
    addText("Additional Assistance");
    addText(
      "If you are unsure or have questions regarding this Affidavit or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter"
    );

    // Save file
    doc.save("Affidavit_of_Survivorship.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Affidavit Info</h3>
              <Label>State</Label>
              <Input name="state" value={formData.state} onChange={handleChange} />
              <Label>County</Label>
              <Input name="county" value={formData.county} onChange={handleChange} />
              <Label>Affiant Full Name</Label>
              <Input name="affiantName" value={formData.affiantName} onChange={handleChange} />
              <Label>Affiant Address</Label>
              <Input name="affiantAddress" value={formData.affiantAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Deed & Property</h3>
              <Label>Deed Day</Label>
              <Input name="deedDay" value={formData.deedDay} onChange={handleChange} />
              <Label>Deed Month</Label>
              <Input name="deedMonth" value={formData.deedMonth} onChange={handleChange} />
              <Label>Deed Year (20__)</Label>
              <Input name="deedYear" value={formData.deedYear} onChange={handleChange} />
              <Label>Book/Volume</Label>
              <Input name="bookVolume" value={formData.bookVolume} onChange={handleChange} />
              <Label>Page</Label>
              <Input name="page" value={formData.page} onChange={handleChange} />
              <Label>Official Records County</Label>
              <Input name="officialRecordsCounty" value={formData.officialRecordsCounty} onChange={handleChange} />
              <Label>Document Number</Label>
              <Input name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
              <Label>Co-Owner Name</Label>
              <Input name="coOwnerName" value={formData.coOwnerName} onChange={handleChange} />
              <Label>Legal Description</Label>
              <textarea
                name="legalDescription"
                value={formData.legalDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={5}
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Death & Exhibit</h3>
              <Label>Acquired As (text)</Label>
              <Input name="acquiredAsJointTenants" value={formData.acquiredAsJointTenants} onChange={handleChange} />
              <Label>Deceased Name</Label>
              <Input name="deceasedName" value={formData.deceasedName} onChange={handleChange} />
              <Label>Death Day</Label>
              <Input name="deathDay" value={formData.deathDay} onChange={handleChange} />
              <Label>Death Month</Label>
              <Input name="deathMonth" value={formData.deathMonth} onChange={handleChange} />
              <Label>Death Year</Label>
              <Input name="deathYear" value={formData.deathYear} onChange={handleChange} />
              <Label>Exhibit Label</Label>
              <Input name="exhibitLabel" value={formData.exhibitLabel} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Notary & Filing</h3>
              <Label>Execution Day</Label>
              <Input name="executionDay" value={formData.executionDay} onChange={handleChange} />
              <Label>Execution Month</Label>
              <Input name="executionMonth" value={formData.executionMonth} onChange={handleChange} />
              <Label>Execution Year</Label>
              <Input name="executionYear" value={formData.executionYear} onChange={handleChange} />
              <Label>Notary Day</Label>
              <Input name="notaryDay" value={formData.notaryDay} onChange={handleChange} />
              <Label>Notary Month</Label>
              <Input name="notaryMonth" value={formData.notaryMonth} onChange={handleChange} />
              <Label>Notary Year</Label>
              <Input name="notaryYear" value={formData.notaryYear} onChange={handleChange} />
              <Label>My Commission Expires</Label>
              <Input name="commissionExpires" value={formData.commissionExpires} onChange={handleChange} />
              <Label>State of (Notary)</Label>
              <Input name="notaryState" value={formData.notaryState} onChange={handleChange} />
              <Label>Country Of</Label>
              <Input name="countryOf" value={formData.countryOf} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 ">
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

      {step === 5 && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Affidavit PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
