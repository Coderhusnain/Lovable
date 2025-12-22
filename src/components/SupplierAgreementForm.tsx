import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  supplierName: string;
  supplierAddress: string;
  customerName: string;
  customerAddress: string;
  itemDescription: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  totalContractValue: string;
  quotationDate: string;
  deliveryFOB: string;
  paymentTo: string;
  paymentAmount: string;
  cashDiscountPercent: string;
  cashDiscountDays: string;
  overdueInterestRate: string;
  deliveryByDate: string;
  taxesNotes: string;
  warrantyAndLiability: string;
  inspectionReturnDays: string;
  defaultEvents: string;
  curePeriodDays: string;
  remediesNotes: string;
  forceMajeureNotes: string;
  disputeResolutionNotes: string;
  confidentialityNotes: string;
  noticesAddress: string;
  assignmentConsent: string;
  entireAgreementNotes: string;
  amendmentNotes: string;
  severabilityNotes: string;
  waiverNotes: string;
  governingLaw: string;
  attorneysFeesNotes: string;
  supplierSignName: string;
  supplierSignTitle: string;
  supplierSignDate: string;
  customerSignName: string;
  customerSignTitle: string;
  customerSignDate: string;
}

export default function SupplierAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    supplierName: "",
    supplierAddress: "",
    customerName: "",
    customerAddress: "",
    itemDescription: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    totalContractValue: "",
    quotationDate: "",
    deliveryFOB: "",
    paymentTo: "",
    paymentAmount: "",
    cashDiscountPercent: "",
    cashDiscountDays: "",
    overdueInterestRate: "",
    deliveryByDate: "",
    taxesNotes: "",
    warrantyAndLiability: "",
    inspectionReturnDays: "",
    defaultEvents: "",
    curePeriodDays: "",
    remediesNotes: "",
    forceMajeureNotes: "",
    disputeResolutionNotes: "",
    confidentialityNotes: "",
    noticesAddress: "",
    assignmentConsent: "",
    entireAgreementNotes: "",
    amendmentNotes: "",
    severabilityNotes: "",
    waiverNotes: "",
    governingLaw: "",
    attorneysFeesNotes: "",
    supplierSignName: "",
    supplierSignTitle: "",
    supplierSignDate: "",
    customerSignName: "",
    customerSignTitle: "",
    customerSignDate: "",
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
      if (text === undefined || text === null) text = "";
      if (text.trim() === "") {
        y += size * 0.8;
        return;
      }
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

    write("SUPPLIER AGREEMENT", 14, true, true);
    write("\n");

    write(`This Supplier Agreement (the \"Agreement\") is made and entered into as of ${formData.effectiveDate || "[---------]"} (the \"Effective Date\"), by and between ${formData.supplierName || "[--------]"}, of ${formData.supplierAddress || "[--------]"} (hereinafter referred to as the \"Supplier\"), and ${formData.customerName || "[--------]"}, of ${formData.customerAddress || "[-----------]"} (hereinafter referred to as the \"Customer\").`);

    write("\n");
    write("I. Items Purchased", 12, true);
    write("The Supplier agrees to sell, and the Customer agrees to purchase, the following products (the \"Goods\") in accordance with the terms and conditions set forth herein:");
    write(`•Description: ${formData.itemDescription || "[--------]"}`);
    write(`•Quantity: ${formData.quantity || "[----------]"}`);
    write(`•Unit Price: ${formData.unitPrice || "[--------]"}`);
    write(`•Total Price: ${formData.totalPrice || "--------"}`);
    write(`•Total Contract Value: ${formData.totalContractValue || "--------"}`);

    write("\n");
    write("II. Product Standards", 12, true);
    write(`The Goods shall conform in all respects to the Supplier’s quotation dated ${formData.quotationDate || "[------]"}, which is hereby incorporated into and made an integral part of this Agreement by reference.`);

    write("\n");
    write("III. Title and Risk of Loss", 12, true);
    write(`Title to and risk of loss of the Goods shall pass to the Customer upon delivery F.O.B. at the Supplier’s plant to the Customer’s designated agent, including any common carrier, notwithstanding any prepayment or allowance of freight by the Supplier.`);

    write("\n");
    write("IV. Payment Terms", 12, true);
    write(`Payment shall be made to ${formData.paymentTo || "[-----]"} in the amount of $${formData.paymentAmount || "[-------]"} upon delivery of all Goods described herein.`);
    write(`A cash discount of ${formData.cashDiscountPercent || "[--------]"}% shall apply if the total invoice amount is paid within ${formData.cashDiscountDays || "[----------]"} days.`);
    write(`Any overdue invoice shall bear interest at the rate of ${formData.overdueInterestRate || "[--------]"}% per annum, or the maximum rate permitted by applicable law, whichever is lower. The Customer shall also be responsible for all costs of collection, including, without limitation, reasonable attorneys’ fees and related expenses.`);
    write(`Without prejudice to any other rights or remedies available at law, failure by the Customer to make timely payment shall constitute a material breach of this Agreement, entitling the Supplier to cancel this Agreement and/or pursue any legal remedies available.`);

    write("\n");
    write("V. Delivery", 12, true);
    write(`Time is of the essence in the performance of this Agreement. Delivery shall be arranged by the Supplier through a carrier of its choosing and shall be completed no later than ${formData.deliveryByDate || "[-------]"}.`);

    write("\n");
    write("VI. Taxes", 12, true);
    write((formData.taxesNotes && formData.taxesNotes + "") || "The Customer agrees to pay all taxes of every kind, whether federal, state, or municipal, arising out of this transaction, except for taxes imposed on the Supplier’s income.");

    write("\n");
    write("VII. Warranties and Limitation of Liability", 12, true);
    write((formData.warrantyAndLiability && formData.warrantyAndLiability + "") || "The Supplier warrants that the Goods shall be free from material defects in workmanship and materials at the time of delivery.");
    write("IN NO EVENT SHALL THE SUPPLIER BE LIABLE FOR ANY INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES OF ANY KIND, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.");

    write("\n");
    write("VIII. Inspection and Rejection", 12, true);
    write("Upon receipt of the Goods, the Customer shall be afforded a reasonable opportunity to inspect them to determine conformity with this Agreement. If the Customer, acting in good faith, determines that any Goods are non-conforming, the Customer may return such Goods at the Supplier’s expense, provided written notice specifying the reasons for rejection is given.");
    write(`The Supplier shall have ${formData.inspectionReturnDays || "[------]"} days from receipt of the returned Goods to remedy the defects in accordance with this Agreement.`);

    write("\n");
    write("IX. Default", 12, true);
    write((formData.defaultEvents && formData.defaultEvents + "") || "The occurrence of any of the following shall constitute a material default under this Agreement:");
    write("(a)Failure to make any payment when due;");
    write("(b)Insolvency or bankruptcy of either Party;");
    write("(c) Attachment, seizure, levy, or assignment of property for the benefit of creditors;");
    write("(d)Failure to supply or accept delivery of the Goods in accordance with this Agreement.");

    write("\n");
    write("X. Remedies", 12, true);
    write("Any notice of default shall specify the nature of the breach in reasonable detail. The defaulting Party shall have " + (formData.curePeriodDays || "[---------]") + " days from receipt of such notice to cure the default. Failure to remedy the default within the prescribed period shall result in automatic termination of this Agreement, unless waived in writing by the non-defaulting Party.");

    write("\n");
    write("XI. Force Majeure", 12, true);
    write((formData.forceMajeureNotes && formData.forceMajeureNotes + "") || "Neither Party shall be liable for failure or delay in performance caused by events beyond its reasonable control (\"Force Majeure\"), including but not limited to acts of God, epidemics, pandemics, fires, explosions, riots, war, government orders, or labour disturbances.");
    write("The affected Party shall promptly notify the other Party and shall use reasonable efforts to mitigate the effects of the Force Majeure event and resume performance as soon as practicable.");

    write("\n");
    write("XII. Dispute Resolution", 12, true);
    write((formData.disputeResolutionNotes && formData.disputeResolutionNotes + "") || "The Parties shall first attempt to resolve any dispute arising out of or relating to this Agreement through amicable negotiations. If such dispute is not resolved, the Parties agree to submit the matter to mediation in good faith in accordance with applicable statutory mediation rules.");

    write("\n");
    write("XIII. Confidentiality", 12, true);
    write((formData.confidentialityNotes && formData.confidentialityNotes + "") || "Each Party acknowledges that it may receive confidential information relating to the other Party’s business and agrees to maintain the confidentiality of such information during and after the term of this Agreement. All documents containing confidential information shall be returned upon request of the disclosing Party.");

    write("\n");
    write("XIV. Notices", 12, true);
    write((formData.noticesAddress && formData.noticesAddress + "") || "All notices shall be deemed duly served if delivered personally or sent by certified mail, return receipt requested, to the addresses stated above or any subsequently notified address. Notices shall be deemed received upon delivery, signature confirmation, or three (3) days after mailing.");

    write("\n");
    write("XV. Assignment", 12, true);
    write((formData.assignmentConsent && formData.assignmentConsent + "") || "Neither Party may assign or transfer this Agreement, in whole or in part, without the prior written consent of the other Party, which shall not be unreasonably withheld.");

    write("\n");
    write("XVI. Entire Agreement", 12, true);
    write((formData.entireAgreementNotes && formData.entireAgreementNotes + "") || "This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, representations, or agreements, whether oral or written relating to its subject matter.");

    write("\n");
    write("XVII. Amendment", 12, true);
    write((formData.amendmentNotes && formData.amendmentNotes + "") || "This Agreement may only be amended by a written instrument duly signed by authorised representatives of both Parties.");

    write("\n");
    write("XVIII. Severability", 12, true);
    write((formData.severabilityNotes && formData.severabilityNotes + "") || "If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain valid and enforceable, and the invalid provision shall be construed to the extent necessary to render it enforceable.");

    write("\n");
    write("XIX. Waiver", 12, true);
    write((formData.waiverNotes && formData.waiverNotes + "") || "Failure by either Party to enforce any provision of this Agreement shall not be deemed a waiver of that provision or of the right to subsequently enforce strict compliance.");

    write("\n");
    write("XX. Governing Law", 12, true);
    write("This Agreement shall be governed by and construed in accordance with the laws of " + (formData.governingLaw || "[BLANK]") + ".");

    write("\n");
    write("XXI. Attorneys’ Fees", 12, true);
    write((formData.attorneysFeesNotes && formData.attorneysFeesNotes + "") || "In the event of any legal action arising from this Agreement, the prevailing Party shall be entitled to recover reasonable attorneys’ fees and costs in addition to any other relief awarded.");

    write("\n");
    write("XXII. Signatories", 12, true);
    write("This Agreement shall be executed by the duly authorised representatives of the Parties and shall take effect as of the Effective Date first written above.");
    write("For the Supplier:");
    write(`Name: ${formData.supplierSignName || "______________________"}`);
    write(`Title: ${formData.supplierSignTitle || "_______________________"}`);
    write(`Date: ${formData.supplierSignDate || "_______________________"}`);
    write("For the Customer:");
    write(`Name: ${formData.customerSignName || "______________________"}`);
    write(`Title: ${formData.customerSignTitle || "_______________________"}`);
    write(`Date: ${formData.customerSignDate || "_______________________"}`);

    doc.save("Supplier_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Items</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Supplier - Name</Label>
              <Input name="supplierName" value={formData.supplierName} onChange={handleChange} />
              <Label>Supplier - Address</Label>
              <Textarea name="supplierAddress" value={formData.supplierAddress} onChange={handleChange} />

              <Label className="pt-2">Customer - Name</Label>
              <Input name="customerName" value={formData.customerName} onChange={handleChange} />
              <Label>Customer - Address</Label>
              <Textarea name="customerAddress" value={formData.customerAddress} onChange={handleChange} />

              <Label className="pt-2">Item Description</Label>
              <Textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} />
              <Label>Quantity</Label>
              <Input name="quantity" value={formData.quantity} onChange={handleChange} />
              <Label>Unit Price</Label>
              <Input name="unitPrice" value={formData.unitPrice} onChange={handleChange} />
              <Label>Total Price</Label>
              <Input name="totalPrice" value={formData.totalPrice} onChange={handleChange} />
              <Label>Total Contract Value</Label>
              <Input name="totalContractValue" value={formData.totalContractValue} onChange={handleChange} />

            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Standards, Title & Payment</h3>
              <Label>Supplier Quotation Date</Label>
              <Input type="date" name="quotationDate" value={formData.quotationDate} onChange={handleChange} />

              <Label className="pt-2">Delivery FOB / Title Transfer</Label>
              <Input name="deliveryFOB" value={formData.deliveryFOB} onChange={handleChange} />

              <Label className="pt-2">Payment To</Label>
              <Input name="paymentTo" value={formData.paymentTo} onChange={handleChange} />
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />

              <Label className="pt-2">Cash Discount (%)</Label>
              <Input name="cashDiscountPercent" value={formData.cashDiscountPercent} onChange={handleChange} />
              <Label>Cash Discount - Days</Label>
              <Input name="cashDiscountDays" value={formData.cashDiscountDays} onChange={handleChange} />

              <Label className="pt-2">Overdue Interest Rate (%)</Label>
              <Input name="overdueInterestRate" value={formData.overdueInterestRate} onChange={handleChange} />

              <Label className="pt-2">Delivery By</Label>
              <Input type="date" name="deliveryByDate" value={formData.deliveryByDate} onChange={handleChange} />

              <Label className="pt-2">Taxes (notes)</Label>
              <Textarea name="taxesNotes" value={formData.taxesNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranty, Inspection & Defaults</h3>
              <Label>Warranty & Liability (override)</Label>
              <Textarea name="warrantyAndLiability" value={formData.warrantyAndLiability} onChange={handleChange} />

              <Label className="pt-2">Inspection - Return Days</Label>
              <Input name="inspectionReturnDays" value={formData.inspectionReturnDays} onChange={handleChange} />

              <Label className="pt-2">Default Events (override)</Label>
              <Textarea name="defaultEvents" value={formData.defaultEvents} onChange={handleChange} />

              <Label className="pt-2">Cure Period (days)</Label>
              <Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} />

              <Label className="pt-2">Remedies / Notes</Label>
              <Textarea name="remediesNotes" value={formData.remediesNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Force Majeure, Dispute & Signatures</h3>

              <Label>Force Majeure (override)</Label>
              <Textarea name="forceMajeureNotes" value={formData.forceMajeureNotes} onChange={handleChange} />

              <Label className="pt-2">Dispute Resolution (override)</Label>
              <Textarea name="disputeResolutionNotes" value={formData.disputeResolutionNotes} onChange={handleChange} />

              <Label className="pt-2">Confidentiality (override)</Label>
              <Textarea name="confidentialityNotes" value={formData.confidentialityNotes} onChange={handleChange} />

              <Label className="pt-2">Notices Address / Instructions</Label>
              <Textarea name="noticesAddress" value={formData.noticesAddress} onChange={handleChange} />

              <Label className="pt-2">Assignment (override)</Label>
              <Textarea name="assignmentConsent" value={formData.assignmentConsent} onChange={handleChange} />

              <Label className="pt-2">Entire Agreement / Amendment / Severability / Waiver</Label>
              <Textarea name="entireAgreementNotes" value={formData.entireAgreementNotes} onChange={handleChange} />
              <Textarea name="amendmentNotes" value={formData.amendmentNotes} onChange={handleChange} />
              <Textarea name="severabilityNotes" value={formData.severabilityNotes} onChange={handleChange} />
              <Textarea name="waiverNotes" value={formData.waiverNotes} onChange={handleChange} />

              <Label className="pt-2">Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label className="pt-2">Attorneys' Fees (override)</Label>
              <Textarea name="attorneysFeesNotes" value={formData.attorneysFeesNotes} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Supplier Signatory - Name</Label>
              <Input name="supplierSignName" value={formData.supplierSignName} onChange={handleChange} />
              <Label>Supplier Signatory - Title</Label>
              <Input name="supplierSignTitle" value={formData.supplierSignTitle} onChange={handleChange} />
              <Label>Supplier Signatory - Date</Label>
              <Input type="date" name="supplierSignDate" value={formData.supplierSignDate} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Customer Signatory - Name</Label>
              <Input name="customerSignName" value={formData.customerSignName} onChange={handleChange} />
              <Label>Customer Signatory - Title</Label>
              <Input name="customerSignTitle" value={formData.customerSignTitle} onChange={handleChange} />
              <Label>Customer Signatory - Date</Label>
              <Input type="date" name="customerSignDate" value={formData.customerSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Supplier Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
