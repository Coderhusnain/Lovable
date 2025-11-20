import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDay: string;
  effectiveMonth: string;
  effectiveYear: string;
  manufacturerName: string;
  manufacturerAddress: string;
  buyerName: string;
  buyerAddress: string;
  productDescription: string;
  productQuantity: string;
  productUnitPrice: string;
  productTotalPrice: string;
  totalContractValue: string;
  deliveryDate: string;
  shippingScheduleB: string;
  paymentAccountDetails: string;
  depositAmount: string;
  balanceAmount: string;
  earlyPaymentDiscount: string;
  earlyPaymentDays: string;
  latePaymentRate: string;
  collectionCosts: string;
  inspectionPeriodDays: string;
  remedyDays: string;
  warrantyMonths: string;
  insuranceAmount: string;
  insurerName: string;
  governingLawState: string;
  arbitrationCityState: string;
  curePeriodDays: string;
  forceMajeureNotice: string;
  ipClause: string;
  buyerSignatureName: string;
  buyerTitle: string;
  buyerSignatureDate: string;
  manufacturerSignatureName: string;
  manufacturerTitle: string;
  manufacturerSignatureDate: string;
}

export default function ProductionContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDay: "",
    effectiveMonth: "",
    effectiveYear: "",
    manufacturerName: "",
    manufacturerAddress: "",
    buyerName: "",
    buyerAddress: "",
    productDescription: "",
    productQuantity: "",
    productUnitPrice: "",
    productTotalPrice: "",
    totalContractValue: "",
    deliveryDate: "",
    shippingScheduleB: "",
    paymentAccountDetails: "",
    depositAmount: "",
    balanceAmount: "",
    earlyPaymentDiscount: "",
    earlyPaymentDays: "",
    latePaymentRate: "",
    collectionCosts: "",
    inspectionPeriodDays: "",
    remedyDays: "",
    warrantyMonths: "",
    insuranceAmount: "",
    insurerName: "",
    governingLawState: "",
    arbitrationCityState: "",
    curePeriodDays: "",
    forceMajeureNotice: "",
    ipClause: "",
    buyerSignatureName: "",
    buyerTitle: "",
    buyerSignatureDate: "",
    manufacturerSignatureName: "",
    manufacturerTitle: "",
    manufacturerSignatureDate: "",
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

    // === PRODUCTION CONTRACT CONTENT (verbatim with substitutions) ===
    addText("PRODUCTION CONTRACT", 14, true, true);

    const effectiveDateStr = `${formData.effectiveDay ? formData.effectiveDay : "___"} day of ${formData.effectiveMonth ? formData.effectiveMonth : "_______"}, ${formData.effectiveYear ? formData.effectiveYear : "20"}`;
    addText(`This Production Contract (the “Contract”) is made and entered into as of the ${effectiveDateStr} (the “Effective Date”), by and between:`);

    addText(`${formData.manufacturerName || "[Manufacturer’s Full Legal Name]"}, having its principal place of business at ${formData.manufacturerAddress || "[Address]"} (hereinafter referred to as the “Manufacturer”),`);
    addText("");
    addText("AND");
    addText("");
    addText(`${formData.buyerName || "[Buyer’s Full Legal Name]"}, having its principal place of business at ${formData.buyerAddress || "[Address]"} (hereinafter referred to as the “Buyer”).`);
    addText("The Manufacturer and the Buyer are collectively referred to herein as the “Parties,” and individually as a “Party.”");
    addText("");

    addText("1. PURPOSE AND SCOPE", 12, true);
    addText("1.1 The Buyer is engaged in the business of developing and marketing [describe Buyer’s product line or business]. The Buyer desires to have manufactured certain goods and products in accordance with its proprietary designs, specifications, and standards, and the Manufacturer agrees to produce such goods under the terms and conditions set forth herein.");
    addText("1.2 The products to be manufactured and supplied under this Contract are hereinafter referred to as the “Goods” or the “Products.”");
    addText("");

    addText("2. DESCRIPTION OF GOODS", 12, true);
    addText("The Manufacturer agrees to manufacture, and the Buyer agrees to purchase, the following Goods in accordance with this Contract:");
    addText("Description\tQuantity\tUnit Price (USD)\tTotal Price (USD)");
    addText(`${formData.productDescription || "[Product Description]"}\t${formData.productQuantity || "[Quantity]"}\t$${formData.productUnitPrice || "[Unit Price]"}\t$${formData.productTotalPrice || "[Total]"}`);
    addText(`Total Contract Value: USD $${formData.totalContractValue || "[Total Amount]"}.`);
    addText("2.1 The Goods shall conform to the specifications, drawings, and quality standards mutually agreed upon by the Parties.");
    addText("2.2 The Manufacturer’s quotation dated as of the Effective Date shall be deemed incorporated into and form an integral part of this Contract.");
    addText("");

    addText("3. PRODUCT STANDARDS AND QUALITY CONTROL", 12, true);
    addText("3.1 The Manufacturer warrants that all Goods supplied shall:");
    addText("(a) Conform strictly to the specifications and samples approved by the Buyer;");
    addText("(b) Be of merchantable quality, free from defects in material and workmanship; and");
    addText("(c) Comply with all applicable federal, state, and local laws, rules, and industry standards.");
    addText("3.2 The Manufacturer shall implement and maintain quality control procedures sufficient to ensure conformity of the Goods with the agreed standards.");
    addText("3.3 The Buyer, or its designated representative, shall have the right to inspect and audit the Manufacturer’s facilities and production processes upon reasonable notice, to verify compliance with this Contract.");
    addText("");

    addText("4. TITLE, DELIVERY, AND RISK OF LOSS", 12, true);
    addText("4.1 Delivery: Time is of the essence. The Manufacturer shall deliver the Goods to the Buyer on or before " + (formData.deliveryDate || "[Delivery Date]") + ", unless extended by mutual written consent.");
    addText("4.2 Shipping and Packaging: The Manufacturer shall be responsible for all packaging, labeling, and loading in a manner suitable for transport, ensuring safe delivery.");
    addText("4.3 Risk of Loss: Title and risk of loss shall transfer to the Buyer only upon delivery of the Goods to the Buyer’s designated address, or such other location as may be agreed in writing.");
    addText("4.4 Shipping Costs: The Buyer shall bear reasonable shipping costs in accordance with its chosen method and carrier, unless otherwise stated in Schedule “B.”");
    addText("");

    addText("5. PAYMENT TERMS", 12, true);
    addText(`5.1 The Buyer shall make payment to ${formData.paymentAccountDetails || "[Manufacturer/Account Details]"} in the total amount of USD $${formData.totalContractValue || "[Amount]"}, in accordance with the following schedule:`);
    addText("Deposit: USD $" + (formData.depositAmount || "[Amount]") + ", payable upon execution of this Contract;");
    addText("Balance: USD $" + (formData.balanceAmount || "[Amount]") + ", payable upon delivery and acceptance of all Goods.");
    addText("5.2 Early Payment Discount: A discount of " + (formData.earlyPaymentDiscount || "[Percentage]") + "% shall apply if full payment is made within " + (formData.earlyPaymentDays || "[Number]") + " days of invoicing.");
    addText("5.3 Late Payment: Overdue balances shall accrue interest at the rate of " + (formData.latePaymentRate || "[Percentage]") + "% per annum or the maximum permitted by applicable law, whichever is less.");
    addText("5.4 The Buyer shall bear all collection costs and reasonable attorneys’ fees incurred in connection with the recovery of overdue payments.");
    addText("5.5 Non-payment within the agreed period shall constitute a material breach, entitling the Manufacturer to suspend further deliveries or terminate this Contract pursuant to Clause 10 herein.");
    addText("");

    addText("6. INSPECTION AND ACCEPTANCE", 12, true);
    addText("6.1 Upon delivery, the Buyer shall have a reasonable period (not exceeding " + (formData.inspectionPeriodDays || "[Number]") + " days) to inspect the Goods and to notify the Manufacturer in writing of any non-conformity, defect, or deviation from specifications.");
    addText("6.2 If such notice is given, the Manufacturer shall, at its own cost and within " + (formData.remedyDays || "[Number]") + " days, repair, replace, or otherwise remedy the defective Goods to the Buyer’s satisfaction.");
    addText("6.3 Failure by the Buyer to provide such notice within the inspection period shall constitute deemed acceptance of the Goods.");
    addText("");

    addText("7. WARRANTIES", 12, true);
    addText("7.1 The Manufacturer expressly warrants that all Goods supplied under this Contract shall be:");
    addText("(a) New and free from defects in design, materials, or workmanship;");
    addText("(b) Manufactured in strict conformity with Buyer’s specifications; and");
    addText("(c) Fit for their intended purpose.");
    addText("7.2 This warranty shall remain in effect for a period of " + (formData.warrantyMonths || "[Number]") + " months from the date of delivery.");
    addText("7.3 The Manufacturer shall, at its expense, promptly repair or replace any defective Goods during the warranty period.");
    addText("");

    addText("8. INDEMNIFICATION AND INSURANCE", 12, true);
    addText("8.1 The Manufacturer shall indemnify, defend, and hold harmless the Buyer, its officers, employees, and agents from and against all claims, damages, losses, liabilities, or expenses (including reasonable attorney fees) arising from:");
    addText("(a) Any defect in the Goods;");
    addText("(b) Negligence or misconduct by the Manufacturer or its agents; or");
    addText("(c) Violation of any applicable law or regulation.");
    addText("8.2 The Manufacturer represents and warrants that it holds a valid comprehensive general liability insurance policy in an amount not less than USD $" + (formData.insuranceAmount || "[Amount]") + ", issued by " + (formData.insurerName || "[Insurer’s Name]") + ", covering liability for product defects and related risks.");
    addText("8.3 The Manufacturer shall provide proof of such coverage upon request, and shall not cancel or modify such policy without thirty (30) days’ prior written notice to the Buyer.");
    addText("");

    addText("9. CONFIDENTIALITY", 12, true);
    addText("9.1 Both Parties acknowledge that they may obtain confidential or proprietary information of the other Party during the performance of this Contract.");
    addText("9.2 Each Party agrees to treat such information as strictly confidential and not to disclose or use it for any purpose other than the performance of this Contract.");
    addText("9.3 This obligation shall survive the termination or expiration of this Contract.");
    addText("");

    addText("10. DEFAULT AND TERMINATION", 12, true);
    addText("10.1 Each of the following shall constitute a material default under this Contract:");
    addText("(a) Failure to make payment when due;");
    addText("(b) Insolvency or bankruptcy of either Party;");
    addText("(c) Seizure, levy, or assignment for the benefit of creditors; or");
    addText("(d) Failure to deliver or accept the Goods as required.");
    addText("10.2 Upon the occurrence of a default, the non-defaulting Party shall give written notice specifying the nature of the default. The defaulting Party shall have " + (formData.curePeriodDays || "[Number]") + " days from receipt of such notice to cure the default.");
    addText("10.3 Failure to cure within the specified period shall entitle the non-defaulting Party to terminate this Contract and seek all available legal or equitable remedies.");
    addText("");

    addText("11. FORCE MAJEURE", 12, true);
    addText("11.1 Neither Party shall be liable for delay or failure to perform obligations under this Contract due to Force Majeure events beyond its reasonable control, including but not limited to acts of God, war, riot, epidemic, pandemic, strike, or government restriction.");
    addText("11.2 The affected Party shall provide prompt written notice of such event and resume performance as soon as practicable once the event has ceased.");
    addText("");

    addText("12. INTELLECTUAL PROPERTY AND WORK PRODUCT", 12, true);
    addText("12.1 Any and all designs, prototypes, specifications, inventions, or intellectual property developed by the Manufacturer in connection with the Products shall be the exclusive property of the Buyer.");
    addText("12.2 The Manufacturer shall execute all documents and take all steps necessary to perfect the Buyer’s ownership rights.");
    addText("");

    addText("13. DISPUTE RESOLUTION", 12, true);
    addText("13.1 The Parties shall first attempt to resolve any dispute arising from or relating to this Contract through good-faith negotiations.");
    addText("13.2 If unresolved within thirty (30) days, the dispute shall be submitted to binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules.");
    addText("13.3 The arbitration shall be conducted by a single neutral arbitrator in " + (formData.arbitrationCityState || "[City, State]") + ", in the English language.");
    addText("13.4 The arbitrator’s award shall be final and binding and may be enforced in any court of competent jurisdiction.");
    addText("13.5 Each Party shall bear its own costs and legal fees unless the arbitrator determines otherwise.");
    addText("");

    addText("14. MISCELLANEOUS", 12, true);
    addText("14.1 Notices: All notices shall be in writing and delivered personally or by certified mail to the addresses stated above.");
    addText("14.2 Assignment: Neither Party may assign or transfer this Contract without the prior written consent of the other Party, which consent shall not be unreasonably withheld.");
    addText("14.3 Waiver: Failure to enforce any provision shall not be construed as a waiver of future enforcement.");
    addText("14.4 Severability: If any provision of this Contract is held invalid, the remaining provisions shall remain in full force and effect.");
    addText("14.5 Attorneys’ Fees: The prevailing Party in any legal or arbitral proceeding arising hereunder shall be entitled to recover reasonable attorneys’ fees and costs.");
    addText("14.6 Headings: Headings are for convenience only and shall not affect interpretation.");
    addText("14.7 Governing Law: This Contract shall be governed by and construed in accordance with the laws of the State of " + (formData.governingLawState || "[Insert State]") + ", without regard to its conflict of laws principles.");
    addText("14.8 Entire Agreement: This Contract constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior oral or written agreements.");
    addText("14.9 Amendment: This Contract may be amended or modified only by a written instrument executed by both Parties.");
    addText("");

    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the Effective Date first written above.");
    addText("BUYER");
    addText("Signature: ___________________________");
    addText("Name: " + (formData.buyerSignatureName || "____________________________"));
    addText("Title: " + (formData.buyerTitle || "_____________________________"));
    addText("Date: " + (formData.buyerSignatureDate || "_____________________________"));
    addText("MANUFACTURER");
    addText("Signature: ___________________________");
    addText("Name: " + (formData.manufacturerSignatureName || "____________________________"));
    addText("Title: " + (formData.manufacturerTitle || "_____________________________"));
    addText("Date: " + (formData.manufacturerSignatureDate || "_____________________________"));

    // Save file
    doc.save("Production_Contract.pdf");
    setPdfGenerated(true);
  };

  // Step rendering (input collection only; no preview)
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Effective Date & Parties</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Effective Day</Label>
                  <Input name="effectiveDay" value={formData.effectiveDay} onChange={handleChange} placeholder="___" />
                </div>
                <div>
                  <Label>Effective Month</Label>
                  <Input name="effectiveMonth" value={formData.effectiveMonth} onChange={handleChange} placeholder="_______" />
                </div>
                <div>
                  <Label>Effective Year</Label>
                  <Input name="effectiveYear" value={formData.effectiveYear} onChange={handleChange} placeholder="20" />
                </div>
              </div>

              <hr />

              <h4 className="font-medium">Manufacturer Information</h4>
              <Label>Manufacturer Name</Label>
              <Input name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} />
              <Label>Manufacturer Address</Label>
              <textarea name="manufacturerAddress" value={formData.manufacturerAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />

              <hr />

              <h4 className="font-medium">Buyer Information</h4>
              <Label>Buyer Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Buyer Address</Label>
              <textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Products & Delivery</h3>

              <Label>Product Description (single line)</Label>
              <Input name="productDescription" value={formData.productDescription} onChange={handleChange} placeholder="[Product Description]" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Quantity</Label>
                  <Input name="productQuantity" value={formData.productQuantity} onChange={handleChange} placeholder="[Quantity]" />
                </div>
                <div>
                  <Label>Unit Price (USD)</Label>
                  <Input name="productUnitPrice" value={formData.productUnitPrice} onChange={handleChange} placeholder="[Unit Price]" />
                </div>
                <div>
                  <Label>Total Price (USD)</Label>
                  <Input name="productTotalPrice" value={formData.productTotalPrice} onChange={handleChange} placeholder="[Total]" />
                </div>
              </div>

              <Label>Total Contract Value</Label>
              <Input name="totalContractValue" value={formData.totalContractValue} onChange={handleChange} placeholder="[Total Amount]" />

              <hr />

              <Label>Delivery Date</Label>
              <Input name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} placeholder="[Delivery Date]" />
              <Label>Schedule B / Shipping Notes</Label>
              <Input name="shippingScheduleB" value={formData.shippingScheduleB} onChange={handleChange} placeholder="Schedule B details (optional)" />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment, Inspection & Warranty</h3>

              <Label>Payment Account / Details</Label>
              <Input name="paymentAccountDetails" value={formData.paymentAccountDetails} onChange={handleChange} placeholder="[Manufacturer/Account Details]" />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Deposit Amount (USD)</Label>
                  <Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} placeholder="[Amount]" />
                </div>
                <div>
                  <Label>Balance Amount (USD)</Label>
                  <Input name="balanceAmount" value={formData.balanceAmount} onChange={handleChange} placeholder="[Amount]" />
                </div>
              </div>

              <Label>Early Payment Discount (%)</Label>
              <Input name="earlyPaymentDiscount" value={formData.earlyPaymentDiscount} onChange={handleChange} placeholder="[Percentage]" />
              <Label>Early Payment Days</Label>
              <Input name="earlyPaymentDays" value={formData.earlyPaymentDays} onChange={handleChange} placeholder="[Number]" />
              <Label>Late Payment Rate (%)</Label>
              <Input name="latePaymentRate" value={formData.latePaymentRate} onChange={handleChange} placeholder="[Percentage]" />
              <Label>Collection Costs Note</Label>
              <Input name="collectionCosts" value={formData.collectionCosts} onChange={handleChange} placeholder="Collection costs note (optional)" />

              <hr />

              <Label>Inspection Period (days)</Label>
              <Input name="inspectionPeriodDays" value={formData.inspectionPeriodDays} onChange={handleChange} placeholder="[Number]" />
              <Label>Remedy Time (days)</Label>
              <Input name="remedyDays" value={formData.remedyDays} onChange={handleChange} placeholder="[Number]" />

              <hr />

              <Label>Warranty Period (months)</Label>
              <Input name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} placeholder="[Number]" />
              <Label>Insurance Amount (USD)</Label>
              <Input name="insuranceAmount" value={formData.insuranceAmount} onChange={handleChange} placeholder="[Amount]" />
              <Label>Insurer Name</Label>
              <Input name="insurerName" value={formData.insurerName} onChange={handleChange} placeholder="[Insurer’s Name]" />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal & Signatures</h3>

              <Label>Governing Law (State)</Label>
              <Input name="governingLawState" value={formData.governingLawState} onChange={handleChange} placeholder="[Insert State]" />
              <Label>Arbitration City, State</Label>
              <Input name="arbitrationCityState" value={formData.arbitrationCityState} onChange={handleChange} placeholder="[City, State]" />
              <Label>Cure Period for Defaults (days)</Label>
              <Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} placeholder="[Number]" />
              <Label>Force Majeure Notice / Note</Label>
              <Input name="forceMajeureNotice" value={formData.forceMajeureNotice} onChange={handleChange} placeholder="Force majeure note (optional)" />

              <hr />

              <h3 className="font-semibold">Buyer Signature Block</h3>
              <Label>Buyer Name</Label>
              <Input name="buyerSignatureName" value={formData.buyerSignatureName} onChange={handleChange} />
              <Label>Buyer Title</Label>
              <Input name="buyerTitle" value={formData.buyerTitle} onChange={handleChange} />
              <Label>Buyer Signature Date</Label>
              <Input name="buyerSignatureDate" value={formData.buyerSignatureDate} onChange={handleChange} />

              <hr />

              <h3 className="font-semibold">Manufacturer Signature Block</h3>
              <Label>Manufacturer Name</Label>
              <Input name="manufacturerSignatureName" value={formData.manufacturerSignatureName} onChange={handleChange} />
              <Label>Manufacturer Title</Label>
              <Input name="manufacturerTitle" value={formData.manufacturerTitle} onChange={handleChange} />
              <Label>Manufacturer Signature Date</Label>
              <Input name="manufacturerSignatureDate" value={formData.manufacturerSignatureDate} onChange={handleChange} />
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

        <div>
          {step < 4 ? (
            <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
          ) : (
            <div className="space-x-2">
              <Button onClick={generatePDF}>Generate PDF</Button>
            </div>
          )}
        </div>
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Contract Generated Successfully</div>
           
          </CardContent>
        </Card>
      )}
    </div>
  );
}
