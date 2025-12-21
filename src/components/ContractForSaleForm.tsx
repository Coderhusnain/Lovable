import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  totalContractValue: string;
  quotationDate: string;
  deliveryTerms: string;
  deliveryBy: string;
  deliveryDeadline: string;
  paymentRecipient: string;
  paymentDueDays: string;
  discountPercent: string;
  discountDays: string;
  latePaymentRate: string;
  taxesResponsibility: string;
  warrantyPeriod: string;
  inspectionPeriod: string;
  remedyDays: string;
  defaultCureDays: string;
  governingLaw: string;
  signSellerName: string;
  signSellerDate: string;
  signBuyerName: string;
  signBuyerDate: string;
}

export default function ContractForSaleForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    description: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    totalContractValue: "",
    quotationDate: "",
    deliveryTerms: "F.O.B. at Seller's facility",
    deliveryBy: "",
    deliveryDeadline: "",
    paymentRecipient: "",
    paymentDueDays: "30",
    discountPercent: "",
    discountDays: "",
    latePaymentRate: "",
    taxesResponsibility: "Buyer",
    warrantyPeriod: "",
    inspectionPeriod: "",
    remedyDays: "",
    defaultCureDays: "",
    governingLaw: "",
    signSellerName: "",
    signSellerDate: "",
    signBuyerName: "",
    signBuyerDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const write = (doc: jsPDF, state: { y: number }, text: string, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
    const margin = 40;
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin * 2;
    const size = opts?.size ?? 11;
    doc.setFont("times", opts?.bold ? ("bold" as any) : ("normal" as any));
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      if (state.y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        state.y = margin;
      }
      if (opts?.center) {
        const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
        const tx = (pageW - tw) / 2;
        doc.text(line, tx, state.y);
      } else {
        doc.text(line, margin, state.y);
      }
      state.y += size * 1.35;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const state = { y: 40 };

    write(doc, state, "CONTRACT FOR SALE OF GOODS", { size: 14, bold: true, center: true });
    write(doc, state, "\n");

    write(
      doc,
      state,
      `This Contract for Sale of Goods ("Contract") is made and entered into as of ${formData.effectiveDate || "[Effective Date]"} by and between ${formData.sellerName || "[Seller]"}, with a principal place of business at ${formData.sellerAddress || "[Seller Address]"} ("Seller"), and ${formData.buyerName || "[Buyer]"}, with a principal place of business at ${formData.buyerAddress || "[Buyer Address]"} ("Buyer").`
    );

    write(doc, state, "\n1. Sale of Goods", { size: 12, bold: true });
    write(
      doc,
      state,
      `Description: ${formData.description || "[Description]"}\nQuantity: ${formData.quantity || "[Quantity]"}\nUnit Price: ${formData.unitPrice || "[Unit Price]"}\nTotal Price: ${formData.totalPrice || "[Total Price]"}\nTotal Contract Value: ${formData.totalContractValue || "[Total Contract Value]"}`
    );

    write(doc, state, "\n2. Product Standards", { size: 12, bold: true });
    write(doc, state, `Goods shall conform to Seller's quotation dated ${formData.quotationDate || "[Quotation Date]"} and be free from defects.`);

    write(doc, state, "\n3. Title and Risk of Loss", { size: 12, bold: true });
    write(doc, state, `Title and risk of loss pass to Buyer upon delivery F.O.B. at Seller's facility to Buyer's designated agent.`);

    write(doc, state, "\n4. Payment Terms", { size: 12, bold: true });
    write(
      doc,
      state,
      `Payment Recipient: ${formData.paymentRecipient || "[Recipient]"}\nPayment Due: within ${formData.paymentDueDays || "[Days]"} days of invoice.\nDiscount: ${formData.discountPercent || "[percent]"}% if paid within ${formData.discountDays || "[days]"} days.\nLate Payment Rate: ${formData.latePaymentRate || "[rate]"} per annum.\nMaterial breach for non-payment allows Seller to suspend performance and seek remedies.`
    );

    write(doc, state, "\n5. Delivery", { size: 12, bold: true });
    write(doc, state, `Delivery Terms: ${formData.deliveryTerms || "F.O.B. at Seller's facility"}\nCarrier / Arrangement: ${formData.deliveryBy || "[Carrier]"}\nDelivery Deadline: ${formData.deliveryDeadline || "[Date]"}`);

    write(doc, state, "\n6. Taxes", { size: 12, bold: true });
    write(doc, state, `Taxes shall be borne by: ${formData.taxesResponsibility || "Buyer"}.`);

    write(doc, state, "\n7. Warranties", { size: 12, bold: true });
    write(doc, state, `Seller warrants the Goods are free from defects for a period of ${formData.warrantyPeriod || "[period]"} from delivery. Seller disclaims other warranties and limits liability as set forth.`);

    write(doc, state, "\n8. Inspection", { size: 12, bold: true });
    write(
      doc,
      state,
      `Buyer shall inspect on delivery. Non-conforming Goods may be rejected with written notice. Seller shall have ${formData.remedyDays || "[days]"} days to remedy by repair, replacement or credit.`
    );

    write(doc, state, "\n9. Default", { size: 12, bold: true });
    write(doc, state, `Events of default include failure to pay, insolvency, seizure, or failure to deliver. Cure period: ${formData.defaultCureDays || "[days]"} days.`);

    write(doc, state, "\n10. Remedies Upon Default", { size: 12, bold: true });
    write(doc, state, `Non-defaulting party may terminate after notice and cure period; termination does not relieve accrued obligations.`);

    write(doc, state, "\n11. Force Majeure", { size: 12, bold: true });
    write(doc, state, `Neither party liable for delays due to causes beyond reasonable control; affected party shall notify and mitigate.`);

    write(doc, state, "\n12. Arbitration", { size: 12, bold: true });
    write(doc, state, `Disputes resolved by binding arbitration under AAA rules; arbitrators may not modify contract terms or award punitive damages.`);

    write(doc, state, "\n13. Confidentiality", { size: 12, bold: true });
    write(doc, state, `Parties shall maintain confidentiality of proprietary information; obligations survive termination.`);

    write(doc, state, "\n14. Notices", { size: 12, bold: true });
    write(doc, state, `Notices must be in writing and delivered personally or by certified mail to addresses above.`);

    write(doc, state, "\n15. Entire Agreement", { size: 12, bold: true });
    write(doc, state, `This Contract is the entire agreement and supersedes prior understandings.`);

    write(doc, state, "\n16. Amendments", { size: 12, bold: true });
    write(doc, state, `No amendments valid unless in writing and signed by both parties.`);

    write(doc, state, "\n17. Severability", { size: 12, bold: true });
    write(doc, state, `If any provision is held invalid, remaining provisions remain in effect.`);

    write(doc, state, "\n18. Waiver", { size: 12, bold: true });
    write(doc, state, `Failure to enforce a provision is not a waiver of future enforcement.`);

    write(doc, state, "\n19. Governing Law", { size: 12, bold: true });
    write(doc, state, `This Contract shall be governed by the laws of ${formData.governingLaw || "[State/Jurisdiction]"}.`);

    write(doc, state, "\n20. Signatures", { size: 12, bold: true });
    write(doc, state, `Executed as of the Effective Date:\n\nSeller: ${formData.sellerName || "____________________"}   Date: ${formData.signSellerDate || "________"}\nBuyer: ${formData.buyerName || "____________________"}   Date: ${formData.signBuyerDate || "________"}`);

    doc.save("Contract_For_Sale_of_Goods.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Goods</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Seller Name</Label>
              <Input name="sellerName" value={formData.sellerName} onChange={handleChange} />
              <Label>Seller Address</Label>
              <Textarea name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} />

              <Label>Buyer Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Buyer Address</Label>
              <Textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} />

              <hr />
              <Label>Goods Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Quantity</Label>
                  <Input name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                  <Label>Unit Price</Label>
                  <Input name="unitPrice" value={formData.unitPrice} onChange={handleChange} />
                </div>
                <div>
                  <Label>Total Price</Label>
                  <Input name="totalPrice" value={formData.totalPrice} onChange={handleChange} />
                </div>
              </div>
              <Label>Total Contract Value</Label>
              <Input name="totalContractValue" value={formData.totalContractValue} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Delivery & Payment</h3>
              <Label>Seller Quotation Date</Label>
              <Input name="quotationDate" value={formData.quotationDate} onChange={handleChange} />

              <Label>Delivery Terms</Label>
              <Input name="deliveryTerms" value={formData.deliveryTerms} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Delivery By / Carrier</Label>
                  <Input name="deliveryBy" value={formData.deliveryBy} onChange={handleChange} />
                </div>
                <div>
                  <Label>Delivery Deadline</Label>
                  <Input name="deliveryDeadline" value={formData.deliveryDeadline} onChange={handleChange} />
                </div>
                <div>
                  <Label>Taxes Responsibility</Label>
                  <Input name="taxesResponsibility" value={formData.taxesResponsibility} onChange={handleChange} />
                </div>
              </div>

              <Label>Payment Recipient</Label>
              <Input name="paymentRecipient" value={formData.paymentRecipient} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Payment Due (days)</Label>
                  <Input name="paymentDueDays" value={formData.paymentDueDays} onChange={handleChange} />
                </div>
                <div>
                  <Label>Discount %</Label>
                  <Input name="discountPercent" value={formData.discountPercent} onChange={handleChange} />
                </div>
                <div>
                  <Label>Discount Days</Label>
                  <Input name="discountDays" value={formData.discountDays} onChange={handleChange} />
                </div>
              </div>
              <Label>Late Payment Rate (per annum)</Label>
              <Input name="latePaymentRate" value={formData.latePaymentRate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranties, Inspection & Legal</h3>
              <Label>Warranty Period</Label>
              <Input name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} />
              <Label>Inspection Period</Label>
              <Input name="inspectionPeriod" value={formData.inspectionPeriod} onChange={handleChange} />
              <Label>Seller Remedy Days</Label>
              <Input name="remedyDays" value={formData.remedyDays} onChange={handleChange} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Seller - Signatory Name</Label>
              <Input name="signSellerName" value={formData.signSellerName} onChange={handleChange} />
              <Label>Seller - Date</Label>
              <Input name="signSellerDate" value={formData.signSellerDate} onChange={handleChange} />

              <Label>Buyer - Signatory Name</Label>
              <Input name="signBuyerName" value={formData.signBuyerName} onChange={handleChange} />
              <Label>Buyer - Date</Label>
              <Input name="signBuyerDate" value={formData.signBuyerDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Sale of Goods PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
