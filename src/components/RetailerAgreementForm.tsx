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
  retailerName: string;
  itemDescription: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  grandTotal: string;
  sellerQuotationDate: string;
  orderTerms: string;
  taxesResponsibility: string;
  deliveryTerms: string;
  paymentTo: string;
  paymentAmount: string;
  paymentNetDays: string;
  interestRate: string;
  inspectionCureDays: string;
  terminationNoticeDays: string;
  defaultCureDays: string;
  governingLaw: string;
  jurisdiction: string;
  signRetailerName: string;
  signRetailerDesignation: string;
  signRetailerCNIC: string;
  signRetailerDate: string;
  signSellerName: string;
  signSellerDesignation: string;
  signSellerCNIC: string;
  signSellerDate: string;
}

export default function RetailerAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    sellerName: "",
    retailerName: "",
    itemDescription: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    grandTotal: "",
    sellerQuotationDate: "",
    orderTerms: "",
    taxesResponsibility: "Retailer",
    deliveryTerms: "",
    paymentTo: "",
    paymentAmount: "",
    paymentNetDays: "30",
    interestRate: "",
    inspectionCureDays: "",
    terminationNoticeDays: "",
    defaultCureDays: "",
    governingLaw: "",
    jurisdiction: "",
    signRetailerName: "",
    signRetailerDesignation: "",
    signRetailerCNIC: "",
    signRetailerDate: "",
    signSellerName: "",
    signSellerDesignation: "",
    signSellerCNIC: "",
    signSellerDate: "",
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

    write("RETAILER AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Retailer Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "[--------]"} ("Effective Date"), by and between\n ${formData.sellerName || "[1st party]"}, hereinafter referred to as the "Seller",\nAND\n ${formData.retailerName || "[2nd party]"}, hereinafter referred to as the "Retailer".`
    );

    write("\n");
    write("The Seller and the Retailer may hereinafter be individually referred to as a \"Party\" and collectively as the \"Parties\".");

    write("\n");
    write("1. ITEMS PURCHASED", 12, true);
    write(`The Seller agrees to supply and the Retailer agrees to purchase the following products (hereinafter referred to as the "Goods") in accordance with the terms and conditions of this Agreement:`);
    write(`• Description: ${formData.itemDescription || "[--------]"}`);
    write(`• Quantity: ${formData.quantity || "[--------]"}`);
    write(`• Unit Price: ${formData.unitPrice || "[-------]"}`);
    write(`• Total Price: ${formData.totalPrice || "---------"}`);
    write(`• Grand Total: ${formData.grandTotal || "---------"}`);

    write("\n");
    write("2. PRODUCT STANDARDS", 12, true);
    write(`The Goods shall strictly conform to the Seller’s quotation dated ${formData.sellerQuotationDate || "[--------]"}, which is hereby incorporated into this Agreement by reference and shall form an integral part hereof.`);

    write("\n");
    write("3. PRICING AND ORDERS", 12, true);
    write(`${formData.orderTerms || "The Goods shall be ordered at prices and quantities mutually agreed upon by the Parties and subject to the Seller’s prevailing terms and conditions of sale and shipment effective at the time of acceptance of the purchase order."}`);
    write("The Seller reserves the right to revise pricing upon reasonable prior notice for future purchases. The Seller shall use commercially reasonable efforts to supply the Goods in a timely manner.");

    write("\n");
    write("4. SALE OF PRODUCTS", 12, true);
    write("The Seller shall sell the Goods at the prices specified herein in accordance with the Seller’s established order procedures, as may be communicated from time to time. Any price amendment shall be notified to the Retailer and shall reflect pricing consistent with that offered to other similarly situated retailers.");

    write("\n");
    write("5. RELATIONSHIP OF THE PARTIES", 12, true);
    write("The Parties are independent contractors, and nothing herein shall be deemed to create a partnership, joint venture, agency, or employer-employee relationship. Each Party shall be solely responsible for its employees, taxes, insurance, and statutory obligations, and shall provide proof of insurance upon reasonable request.");

    write("\n");
    write("6. TAXES", 12, true);
    write(`All taxes levied on the Goods, other than income taxes, shall be borne and paid by the ${formData.taxesResponsibility || "Retailer"}, including but not limited to federal, provincial, state, local, use, or sales taxes, in accordance with applicable law.`);

    write("\n");
    write("7. TITLE AND RISK OF LOSS", 12, true);
    write("Title and risk of loss shall pass to the Retailer upon delivery of the Goods F.O.B. at the Seller’s plant to the Retailer’s designated carrier or agent, notwithstanding any prepayment or freight allowance by the Seller.");

    write("\n");
    write("8. RETAIL FACILITIES", 12, true);
    write("The Retailer shall offer the Goods for sale only through retail locations mutually approved by the Parties and shall provide the Seller with an updated list of all facilities offering the Goods.");

    write("\n");
    write("9. PAYMENT TERMS", 12, true);
    write(`Payment shall be made to ${formData.paymentTo || "[BLANK]"} in the amount of ${formData.paymentAmount || "[BLANK]"} upon delivery of the Goods.`);
    write(`a) Payment terms shall be net ${formData.paymentNetDays || "30"} days from the date of invoice.`);
    write(`b) Overdue invoices shall accrue interest at ${formData.interestRate || "[----------]"}% per annum or the maximum rate permitted by law, whichever is lower.`);
    write("c) The Retailer shall bear all costs of collection, including reasonable legal fees.");
    write("d) Non-payment shall constitute a material breach and entitle the Seller to terminate this Agreement and pursue legal remedies.");

    write("\n");
    write("10. DELIVERY", 12, true);
    write(`${formData.deliveryTerms || "Time is of the essence. Delivery shall be arranged by the Seller through its nominated carrier and completed by [----------]."}`);

    write("\n");
    write("11. WARRANTIES", 12, true);
    write("The Retailer shall be entitled to applicable manufacturer warranties. The Seller warrants that the Goods shall be free from material defects in workmanship and materials. The Seller shall not, under any circumstances, be liable for incidental, indirect, special, or consequential damages, even if advised of the possibility thereof.");

    write("\n");
    write("12. INSPECTION AND REJECTION", 12, true);
    write("The Retailer shall have a reasonable opportunity to inspect the Goods upon receipt.");
    write(`In case of non-conforming Goods, the Retailer may return them at the Seller’s expense with written notice specifying the defects. The Seller shall have ${formData.inspectionCureDays || "[-------]"} days to cure such defects.`);

    write("\n");
    write("13. INTELLECTUAL PROPERTY", 12, true);
    write("No rights, title, or interest in the Seller’s intellectual property shall transfer to the Retailer. Any use of trademarks or proprietary materials shall require prior written consent and compliance with Seller’s guidelines.");

    write("\n");
    write("14. TERMINATION", 12, true);
    write(`This Agreement shall remain in force until terminated by either Party for any reason upon ${formData.terminationNoticeDays || "[-------]"} days’ prior written notice.`);

    write("\n");
    write("15. MATERIAL DEFAULT", 12, true);
    write("Events of default include:");
    write("a) Failure to make timely payment;\nb) Insolvency or bankruptcy;\nc) Seizure or attachment of assets;\nd) Failure to deliver the Goods as agreed.");

    write("\n");
    write("16. REMEDIES", 12, true);
    write(`Upon default, the non-defaulting Party may terminate this Agreement if the breach remains uncured within ${formData.defaultCureDays || "[BLANK]"} days of written notice.`);

    write("\n");
    write("17. FORCE MAJEURE", 12, true);
    write("Neither Party shall be liable for failure or delay due to events beyond reasonable control, including but not limited to natural disasters, epidemics, riots, war, or government actions. The affected Party shall use reasonable efforts to resume performance.");

    write("\n");
    write("18. DISPUTE RESOLUTION", 12, true);
    write("Disputes shall first be resolved through mutual negotiations. Failing which, they shall be referred to binding arbitration in accordance with the rules of the American Arbitration Association. The arbitrator’s decision shall be final and binding.");

    write("\n");
    write("19. CONFIDENTIALITY", 12, true);
    write("All confidential information exchanged shall remain strictly confidential during and after the term of this Agreement and shall be returned upon request.");

    write("\n");
    write("20. DUTY TO COOPERATE", 12, true);
    write("The Retailer shall cooperate fully with lawful governmental inquiries relating to the Goods.");

    write("\n");
    write("21. NOTICES", 12, true);
    write("Notices shall be delivered personally or via certified mail to the stated addresses and shall be deemed received upon delivery or three (3) days after mailing.");

    write("\n");
    write("22. ASSIGNMENT", 12, true);
    write("Neither Party may assign this Agreement without prior written consent of the other Party.");

    write("\n");
    write("23. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the full and final understanding between the Parties and supersedes all prior agreements or representations.");

    write("\n");
    write("24. AMENDMENT", 12, true);
    write("This Agreement may only be amended in writing signed by both Parties.");

    write("\n");
    write("25. SEVERABILITY", 12, true);
    write("If any provision is held invalid, the remaining provisions shall remain enforceable.");

    write("\n");
    write("26. WAIVER", 12, true);
    write("Failure to enforce any provision shall not constitute a waiver of such provision.");

    write("\n");
    write("27. GOVERNING LAW", 12, true);
    write(`This Agreement shall be governed and construed in accordance with the laws of ${formData.governingLaw || "[----------------]"}.`);

    write("\n");
    write("28. EXECUTION", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first above written.");
    write("SIGNATORIES\nIN WITNESS WHEREOF, the Parties hereto have executed this Retailer Agreement on the date first written above, through their duly authorized representatives, who hereby certify that they possess full authority to bind their respective Parties to the terms and conditions of this Agreement.");

    write("\n");
    write("For and on behalf of the Retailer");
    write(`Name: ${formData.signRetailerName || "__________________"}`);
    write(`Designation: ${formData.signRetailerDesignation || "__________________"}`);
    write(`CNIC / ID No.: ${formData.signRetailerCNIC || "__________________"}`);
    write(`Signature: __________________________`);
    write(`Date: ${formData.signRetailerDate || "__________________"}`);
    write(`Company Seal (if applicable): __________`);

    write("\n");
    write("For and on behalf of the Seller");
    write(`Name: ${formData.signSellerName || "__________________"}`);
    write(`Designation: ${formData.signSellerDesignation || "__________________"}`);
    write(`CNIC / ID No.: ${formData.signSellerCNIC || "__________________"}`);
    write(`Signature: __________________________`);
    write(`Date: ${formData.signSellerDate || "__________________"}`);
    write(`Company Seal (if applicable): __________`);

    doc.save("Retailer_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Items</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Seller (1st Party)</Label>
              <Input name="sellerName" value={formData.sellerName} onChange={handleChange} />

              <Label>Retailer (2nd Party)</Label>
              <Input name="retailerName" value={formData.retailerName} onChange={handleChange} />

              <Label>Item Description</Label>
              <Textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} />

              <Label>Quantity</Label>
              <Input name="quantity" value={formData.quantity} onChange={handleChange} />

              <Label>Unit Price</Label>
              <Input name="unitPrice" value={formData.unitPrice} onChange={handleChange} />

              <Label>Total Price</Label>
              <Input name="totalPrice" value={formData.totalPrice} onChange={handleChange} />

              <Label>Grand Total</Label>
              <Input name="grandTotal" value={formData.grandTotal} onChange={handleChange} />

              <Label>Seller Quotation Date</Label>
              <Input name="sellerQuotationDate" value={formData.sellerQuotationDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Terms & Logistics</h3>

              <Label>Order Terms / Pricing</Label>
              <Textarea name="orderTerms" value={formData.orderTerms} onChange={handleChange} />

              <Label>Taxes Responsibility</Label>
              <Input name="taxesResponsibility" value={formData.taxesResponsibility} onChange={handleChange} />

              <Label>Delivery Terms</Label>
              <Textarea name="deliveryTerms" value={formData.deliveryTerms} onChange={handleChange} />

              <Label>Payment To (Name)</Label>
              <Input name="paymentTo" value={formData.paymentTo} onChange={handleChange} />

              <Label>Payment Amount (example)</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />

              <Label>Payment Net Days</Label>
              <Input name="paymentNetDays" value={formData.paymentNetDays} onChange={handleChange} />

              <Label>Interest Rate for Overdue</Label>
              <Input name="interestRate" value={formData.interestRate} onChange={handleChange} />

              <Label>Inspection Cure Days</Label>
              <Input name="inspectionCureDays" value={formData.inspectionCureDays} onChange={handleChange} />

              <Label>Termination Notice Days</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />

              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatories</h3>

              <Label>Retailer - Name</Label>
              <Input name="signRetailerName" value={formData.signRetailerName} onChange={handleChange} />
              <Label>Retailer - Designation</Label>
              <Input name="signRetailerDesignation" value={formData.signRetailerDesignation} onChange={handleChange} />
              <Label>Retailer - CNIC / ID</Label>
              <Input name="signRetailerCNIC" value={formData.signRetailerCNIC} onChange={handleChange} />
              <Label>Retailer - Date</Label>
              <Input name="signRetailerDate" value={formData.signRetailerDate} onChange={handleChange} />

              <hr />

              <Label>Seller - Name</Label>
              <Input name="signSellerName" value={formData.signSellerName} onChange={handleChange} />
              <Label>Seller - Designation</Label>
              <Input name="signSellerDesignation" value={formData.signSellerDesignation} onChange={handleChange} />
              <Label>Seller - CNIC / ID</Label>
              <Input name="signSellerCNIC" value={formData.signSellerCNIC} onChange={handleChange} />
              <Label>Seller - Date</Label>
              <Input name="signSellerDate" value={formData.signSellerDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Retailer Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
