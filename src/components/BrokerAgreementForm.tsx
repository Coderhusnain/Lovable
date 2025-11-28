import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  buyerName: string;
  buyerStatus: string;
  buyerAddress: string;
  brokerName: string;
  brokerStatus: string;
  brokerAddress: string;
  industrySector: string;
  termDays: string;
  terminationNotice: string;
  brokerFee: string;
  invoiceDays: string;
  signBuyerName: string;
  signBuyerDesignation: string;
  signBuyerCNIC: string;
  signBuyerDate: string;
  witness1Name: string;
  witness1CNIC: string;
  witness1Address: string;
  signBrokerName: string;
  signBrokerDesignation: string;
  signBrokerCNIC: string;
  signBrokerDate: string;
  witness2Name: string;
  witness2CNIC: string;
  witness2Address: string;
}

export default function BrokerAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    buyerName: "",
    buyerStatus: "",
    buyerAddress: "",
    brokerName: "",
    brokerStatus: "",
    brokerAddress: "",
    industrySector: "",
    termDays: "",
    terminationNotice: "",
    brokerFee: "",
    invoiceDays: "",
    signBuyerName: "",
    signBuyerDesignation: "",
    signBuyerCNIC: "",
    signBuyerDate: "",
    witness1Name: "",
    witness1CNIC: "",
    witness1Address: "",
    signBrokerName: "",
    signBrokerDesignation: "",
    signBrokerCNIC: "",
    signBrokerDate: "",
    witness2Name: "",
    witness2CNIC: "",
    witness2Address: "",
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

    // === BROKER AGREEMENT CONTENT ===
    addText("BROKER AGREEMENT", 14, true, true);
    addText(`Effective Date: ${formData.effectiveDate || "________________"}`);
    addText("\n");
    addText(
      `This Broker Agreement ("Agreement") is made and entered into on this ${formData.effectiveDate ||
        "_____"} by and between:`
    );
    addText(
      `[Buyer]: ${formData.buyerName || "________________"}, ${formData.buyerStatus ||
        "________________"}, Address: ${formData.buyerAddress || "________________"}`
    );
    addText(
      `[Broker]: ${formData.brokerName || "________________"}, ${formData.brokerStatus ||
        "________________"}, Address: ${formData.brokerAddress || "________________"}`
    );
    addText("\n");
    addText("1. PURPOSE AND SCOPE OF AGREEMENT");
    addText(
      `1.1 The Buyer desires to purchase certain goods within the ${formData.industrySector ||
        "________________"} sector and requires the professional services of a Broker to identify and introduce potential sellers capable of supplying such goods.`
    );
    addText(
      "1.2 The Broker represents that it possesses relevant contacts, knowledge, and industry experience within the [insert industry] and agrees to act solely as an intermediary for the purpose of introducing prospective sellers to the Buyer."
    );
    addText(
      "1.3 The role of the Broker under this Agreement is strictly limited to making introductions only and shall not include negotiation, execution of sales contracts, or assumption of any liability on behalf of the Buyer unless expressly authorized in writing."
    );
    addText(
      "1.4 The Broker shall comply with all applicable laws, regulations, rules, and licensing requirements governing brokerage and intermediary services within the relevant jurisdiction and industry (\"Legal Compliance\")."
    );
    addText(
      "1.5 The Buyer hereby grants the Broker the exclusive right to introduce prospective sellers who are not already known to the Buyer at the time of introduction (\"Exclusivity\"). The Buyer warrants that any seller not previously documented as known shall be deemed as introduced by the Broker for the purposes of this Agreement."
    );
    addText("\n");
    addText("2. TERM AND TERMINATION");
    addText(
      `2.1 Term: This Agreement shall commence on the Effective Date and remain valid for ${formData.termDays ||
        "_____"} days, unless earlier terminated in accordance with the provisions herein.`
    );
    addText(
      `2.2 Termination for Convenience: Either Party may terminate this Agreement with ${formData.terminationNotice ||
        "_____"} days prior written notice.`
    );
    addText(
      "2.3 Effect of Early Termination: In the event of early termination, the Broker shall be entitled to a pro-rated payment for services rendered up to the effective termination date, including commissions relating to introductions already made which result in subsequent transactions."
    );
    addText("\n");
    addText("3. FEES AND PAYMENT TERMS");
    addText(
      `3.1 Broker's Fee: The Buyer agrees to pay the Broker a fee of $${formData.brokerFee ||
        "_____"} per seller successfully introduced and accepted by the Buyer.`
    );
    addText(
      `3.2 Invoicing and Payment: Invoice payable within ${formData.invoiceDays || "_____"} days from issuance.`
    );
    addText(
      "3.3 Non-Circumvention: The Buyer expressly undertakes and covenants that it shall not, directly or indirectly, negotiate, enter into discussions, contract, or otherwise transact with any seller introduced by the Broker, whether during the subsistence of this Agreement or after its termination, for the purpose of evading, reducing, or avoiding the payment of any commission, fee, or other remuneration due to the Broker under this Agreement. Any such act shall constitute a material breach of this Agreement, and in such event, the Broker shall be entitled to recover the full commission as if the transaction had been duly concluded through the Broker, in addition to all other legal remedies available, including damages and costs."
    );
    addText(
      "3.4 Survival of Commission Rights: The Broker’s entitlement to commission in respect of any seller introduced during the Term shall survive the termination or expiry of this Agreement and shall remain enforceable where a transaction is concluded as a direct or indirect consequence of the Broker’s introduction."
    );
    addText("\n");
    addText("SIGNATORIES AND EXECUTION");
    addText(
      `BUYER: ${formData.signBuyerName || "________________"}, Designation: ${formData.signBuyerDesignation ||
        "_____"}, CNIC: ${formData.signBuyerCNIC || "_____"}, Date: ${formData.signBuyerDate || "_____"}`
    );
    addText(
      `Witness 1: ${formData.witness1Name || "_____"}, CNIC: ${formData.witness1CNIC ||
        "_____"}, Address: ${formData.witness1Address || "_____"}`
    );
    addText(
      `BROKER: ${formData.signBrokerName || "_____"}, Designation: ${formData.signBrokerDesignation ||
        "_____"}, CNIC: ${formData.signBrokerCNIC || "_____"}, Date: ${formData.signBrokerDate || "_____"}`
    );
    addText(
      `Witness 2: ${formData.witness2Name || "_____"}, CNIC: ${formData.witness2CNIC ||
        "_____"}, Address: ${formData.witness2Address || "_____"}`
    );

    doc.save("Broker_Agreement.pdf");
    setPdfGenerated(true);
    setStep(4);
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
              <Label>Buyer Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Buyer Legal Status</Label>
              <Input name="buyerStatus" value={formData.buyerStatus} onChange={handleChange} />
              <Label>Buyer Address</Label>
              <Input name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} />
              <Label>Broker Name</Label>
              <Input name="brokerName" value={formData.brokerName} onChange={handleChange} />
              <Label>Broker Legal Status</Label>
              <Input name="brokerStatus" value={formData.brokerStatus} onChange={handleChange} />
              <Label>Broker Address</Label>
              <Input name="brokerAddress" value={formData.brokerAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Agreement Scope & Term</h3>
              <Label>Industry Sector</Label>
              <Input name="industrySector" value={formData.industrySector} onChange={handleChange} />
              <Label>Term (days)</Label>
              <Input name="termDays" value={formData.termDays} onChange={handleChange} />
              <Label>Termination Notice (days)</Label>
              <Input name="terminationNotice" value={formData.terminationNotice} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Fees & Signatories</h3>
              <Label>Broker Fee</Label>
              <Input name="brokerFee" value={formData.brokerFee} onChange={handleChange} />
              <Label>Invoice Payment Days</Label>
              <Input name="invoiceDays" value={formData.invoiceDays} onChange={handleChange} />
              <h4 className="font-semibold">Buyer Signatory</h4>
              <Label>Name</Label>
              <Input name="signBuyerName" value={formData.signBuyerName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="signBuyerDesignation" value={formData.signBuyerDesignation} onChange={handleChange} />
              <Label>CNIC / Reg. No</Label>
              <Input name="signBuyerCNIC" value={formData.signBuyerCNIC} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signBuyerDate" value={formData.signBuyerDate} onChange={handleChange} />
              <Label>Witness 1 Name</Label>
              <Input name="witness1Name" value={formData.witness1Name} onChange={handleChange} />
              <Label>Witness 1 CNIC</Label>
              <Input name="witness1CNIC" value={formData.witness1CNIC} onChange={handleChange} />
              <Label>Witness 1 Address</Label>
              <Input name="witness1Address" value={formData.witness1Address} onChange={handleChange} />
              <h4 className="font-semibold">Broker Signatory</h4>
              <Label>Name</Label>
              <Input name="signBrokerName" value={formData.signBrokerName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="signBrokerDesignation" value={formData.signBrokerDesignation} onChange={handleChange} />
              <Label>CNIC / Reg. No</Label>
              <Input name="signBrokerCNIC" value={formData.signBrokerCNIC} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signBrokerDate" value={formData.signBrokerDate} onChange={handleChange} />
              <Label>Witness 2 Name</Label>
              <Input name="witness2Name" value={formData.witness2Name} onChange={handleChange} />
              <Label>Witness 2 CNIC</Label>
              <Input name="witness2CNIC" value={formData.witness2CNIC} onChange={handleChange} />
              <Label>Witness 2 Address</Label>
              <Input name="witness2Address" value={formData.witness2Address} onChange={handleChange} />
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
              Broker Agreement PDF Generated Successfully
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
