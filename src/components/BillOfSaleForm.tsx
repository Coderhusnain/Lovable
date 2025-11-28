import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  amount: string;
  propertyDescription: string;
  state: string;
  county: string;
  sellerSignName: string;
  sellerSignDate: string;
  buyerSignName: string;
  buyerSignDate: string;
  notaryName: string;
  notaryCommissionExpires: string;
  notaryDate: string;
}

export default function BillOfSaleForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    amount: "",
    propertyDescription: "",
    state: "",
    county: "",
    sellerSignName: "",
    sellerSignDate: "",
    buyerSignName: "",
    buyerSignDate: "",
    notaryName: "",
    notaryCommissionExpires: "",
    notaryDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    // === BILL OF SALE CONTENT ===
    addText("BILL OF SALE", 14, true, true);
    addText(
      `This Bill of Sale (the “Agreement”) is made and entered into as of ${
        formData.date || "________________"
      }, by and between ${formData.sellerName || "________________"}, of ${
        formData.sellerAddress || "________________"
      } (the “Seller”), and ${formData.buyerName || "________________"}, of ${
        formData.buyerAddress || "________________"
      } (the “Buyer”). The Seller and Buyer may be referred to individually as a “Party” and collectively as the “Parties.”`
    );

    addText("1. Consideration and Transfer of Ownership", 12, true);
    addText(
      `For and in consideration of the sum of U.S. $${formData.amount || "____"}, inclusive of all applicable sales taxes, the receipt and sufficiency of which are hereby acknowledged, the Seller does hereby sell, assign, convey, and transfer unto the Buyer all rights, title, and interest in and to the following described property (the “Property”):`
    );
    addText(formData.propertyDescription || "[Insert property details]");

    addText("2. Condition of Property and Disclaimer of Warranties", 12, true);
    addText(
      "2.1 The Property is sold and transferred strictly on an “AS IS, WHERE IS” basis, with all faults, and without any representations or warranties of any kind by the Seller."
    );
    addText(
      "2.2 The Seller hereby expressly disclaims any and all warranties, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, quality, or condition of the Property."
    );
    addText(
      "2.3 Nothing in this Bill of Sale shall affect the applicability of any valid and existing manufacturer’s warranty relating to the Property, if and to the extent such warranty is transferable to the Buyer."
    );

    addText("3. Buyer’s Acknowledgment and Acceptance", 12, true);
    addText(
      "3.1 The Buyer acknowledges that he/she/it has been afforded the opportunity to fully inspect the Property or, alternatively, to have the Property inspected by a representative of the Buyer’s choosing."
    );
    addText(
      "3.2 The Buyer accepts delivery of the Property in its current and existing condition, subject only to the warranties, if any, expressly provided herein."
    );

    addText("4. Title and Authority", 12, true);
    addText(
      "4.1 The Seller represents and warrants that:\n(a) The Seller is the lawful owner of the Property;\n(b) The Property is free and clear of all mortgages, liens, pledges, charges, security interests, or encumbrances of any nature; and\n(c) The Seller has full right, power, and authority to sell and transfer the Property to the Buyer."
    );
    addText(
      "4.2 The Seller shall indemnify, defend, and hold the Buyer harmless against any and all claims, demands, or liabilities arising from a breach of the foregoing representations and warranties."
    );

    addText("5. Limitation of Liability", 12, true);
    addText(
      "5.1 Neither Party shall be liable to the other for any incidental, consequential, indirect, exemplary, or special damages of any kind, including but not limited to loss of profits, arising out of or in connection with this Bill of Sale, whether based on contract, tort, or otherwise, even if advised of the possibility of such damages."
    );

    addText("6. Dispute Resolution and Legal Costs", 12, true);
    addText(
      "6.1 In the event of any dispute, controversy, or claim arising from or relating to this Bill of Sale, the prevailing Party in litigation or arbitration shall be entitled to recover from the non-prevailing Party all reasonable expenses incurred, including but not limited to court costs, arbitration fees, reasonable attorney’s fees, and defense costs."
    );

    addText("7. Successors and Assigns", 12, true);
    addText(
      "This Bill of Sale shall be binding upon and inure to the benefit of the Parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns."
    );

    addText("8. Further Assurances", 12, true);
    addText(
      "The Parties agree to execute and deliver such further instruments and documents, and to take such other actions, as may be reasonably necessary to fully carry out the intent and purposes of this Bill of Sale."
    );

    addText("9. Governing Law", 12, true);
    addText(
      `This Bill of Sale shall be governed by, and construed in accordance with, the laws of the State of ${formData.state || "________________"}, without regard to its conflict-of-law principles.`
    );

    addText("10. Execution and Effectiveness", 12, true);
    addText(
      "This Bill of Sale shall be effective as of the date first written above, upon execution by the duly authorized representatives of the Seller and the Buyer."
    );

    addText("11. Notarization (if required)", 12, true);
    addText(
      "This Bill of Sale may be notarized to further evidence its validity and enforceability."
    );

    addText("IN WITNESS WHEREOF", 12, true);
    addText(
      `SELLER: ______________________________\nName: ${formData.sellerSignName || "__________"}\nDate: ${formData.sellerSignDate || "__________"}`
    );
    addText(
      `BUYER: _______________________________\nName: ${formData.buyerSignName || "__________"}\nDate: ${formData.buyerSignDate || "__________"}`
    );

    addText(
      `State of ${formData.state || "__________"} )\nCounty of ${formData.county || "__________"} )\nOn this ${formData.notaryDate || "___"} day of ________, before me, the undersigned, a Notary Public in and for said State and County, personally appeared ${formData.notaryName || "__________"}, known to me (or satisfactorily proven) to be the person whose name is subscribed to the foregoing instrument, and acknowledged that he/she executed the same for the purposes therein contained.\nNotary Public: ${formData.notaryName || "__________"}\nMy Commission Expires: ${formData.notaryCommissionExpires || "__________"}`
    );

    doc.save("Bill_of_Sale.pdf");
    setPdfGenerated(true);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Date</h3>
              <Label>Date</Label>
              <Input name="date" value={formData.date} onChange={handleChange} />
              <Label>Seller Name</Label>
              <Input
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
              />
              <Label>Seller Address</Label>
              <Input
                name="sellerAddress"
                value={formData.sellerAddress}
                onChange={handleChange}
              />
              <Label>Buyer Name</Label>
              <Input
                name="buyerName"
                value={formData.buyerName}
                onChange={handleChange}
              />
              <Label>Buyer Address</Label>
              <Input
                name="buyerAddress"
                value={formData.buyerAddress}
                onChange={handleChange}
              />
              <Label>Amount (USD)</Label>
              <Input name="amount" value={formData.amount} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Property Details</h3>
              <Label>Property Description</Label>
              <textarea
                name="propertyDescription"
                value={formData.propertyDescription}
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
              <h3 className="font-semibold">Execution & Notary</h3>
              <Label>State</Label>
              <Input name="state" value={formData.state} onChange={handleChange} />
              <Label>County</Label>
              <Input name="county" value={formData.county} onChange={handleChange} />
              <Label>Seller Signature Name</Label>
              <Input
                name="sellerSignName"
                value={formData.sellerSignName}
                onChange={handleChange}
              />
              <Label>Seller Sign Date</Label>
              <Input
                name="sellerSignDate"
                value={formData.sellerSignDate}
                onChange={handleChange}
              />
              <Label>Buyer Signature Name</Label>
              <Input
                name="buyerSignName"
                value={formData.buyerSignName}
                onChange={handleChange}
              />
              <Label>Buyer Sign Date</Label>
              <Input
                name="buyerSignDate"
                value={formData.buyerSignDate}
                onChange={handleChange}
              />
              <Label>Notary Name</Label>
              <Input
                name="notaryName"
                value={formData.notaryName}
                onChange={handleChange}
              />
              <Label>Notary Date</Label>
              <Input
                name="notaryDate"
                value={formData.notaryDate}
                onChange={handleChange}
              />
              <Label>Notary Commission Expires</Label>
              <Input
                name="notaryCommissionExpires"
                value={formData.notaryCommissionExpires}
                onChange={handleChange}
              />
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
        <Button
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <Button onClick={generatePDF}>Generate PDF</Button>
        )}
      </div>

      {step === 4 && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">
              Bill of Sale PDF Generated Successfully
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
