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
  purchaserName: string;
  purchaserAddress: string;
  corporationName: string;
  corporationType: string;
  stateJurisdiction: string;
  numberOfShares: string;
  purchasePrice: string;
  initialPayment: string;
  balancePayment: string;
  paymentMethod: string;
  closingTime: string;
  closingLocation: string;
  deliverablesAtClosing: string;
  sellerReps: string;
  purchaserReps: string;
  furtherAssurances: string;
  confidentiality: string;
  complianceLaw: string;
  notices: string;
  governingLaw: string;
  arbitrationLocation: string;
  forceMajeure: string;
  sellerSignName: string;
  sellerSignTitle: string;
  sellerSignDate: string;
  purchaserSignName: string;
  purchaserSignTitle: string;
  purchaserSignDate: string;
  witness1Name: string;
  witness2Name: string;
}

export default function StockPurchaseAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    sellerName: "",
    sellerAddress: "",
    purchaserName: "",
    purchaserAddress: "",
    corporationName: "",
    corporationType: "",
    stateJurisdiction: "",
    numberOfShares: "",
    purchasePrice: "",
    initialPayment: "",
    balancePayment: "",
    paymentMethod: "",
    closingTime: "",
    closingLocation: "",
    deliverablesAtClosing: "",
    sellerReps: "",
    purchaserReps: "",
    furtherAssurances: "",
    confidentiality: "",
    complianceLaw: "",
    notices: "",
    governingLaw: "",
    arbitrationLocation: "",
    forceMajeure: "",
    sellerSignName: "",
    sellerSignTitle: "",
    sellerSignDate: "",
    purchaserSignName: "",
    purchaserSignTitle: "",
    purchaserSignDate: "",
    witness1Name: "",
    witness2Name: "",
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

    // Verbatim Stock Purchase Agreement content with field substitutions
    write("STOCK PURCHASE AGREEMENT", 14, true, true);
    write("This Stock Purchase Agreement (the \u201cAgreement\u201d) is made and entered into as of " + (formData.effectiveDate || "[Insert Date]") + " (the \u201cEffective Date\u201d), by and between:");
    write("\u2022 " + (formData.sellerName || "[Seller Name]") + ", having an address at " + (formData.sellerAddress || "[Seller Address]") + " (hereinafter referred to as \u201cSeller\u201d), and");
    write("\u2022 " + (formData.purchaserName || "[Purchaser Name]") + ", having an address at " + (formData.purchaserAddress || "[Purchaser Address]") + " (hereinafter referred to as \u201cPurchaser\u201d).");
    write("Collectively, Seller and Purchaser are referred to herein as the \u201cParties.\u201d");

    write("\n");
    write("RECITALS", 12, true);
    write("WHEREAS, the Seller is a stockholder of " + (formData.corporationName || "[Corporation Name]") + ", a " + (formData.corporationType || "[Type of Corporation]") + ", duly organized, validly existing, and in good standing under the laws of " + (formData.stateJurisdiction || "[State/Jurisdiction]") + ", and is the lawful record owner of " + (formData.numberOfShares || "[Number of Shares]") + " shares of the capital stock of the Corporation (the \u201cStock\u201d);" );
    write("WHEREAS, the Purchaser desires to purchase the Stock from the Seller, and the Seller desires to sell the Stock to the Purchaser, on the terms and subject to the conditions set forth in this Agreement;");
    write("NOW, THEREFORE, in consideration of the mutual covenants, agreements, and representations herein contained, the Parties agree as follows:");

    write("\n");
    write("1. PURCHASE AND SALE OF STOCK", 12, true);
    write("1.1 Sale and Transfer: Subject to the terms and conditions of this Agreement, at the Closing (as defined below), the Seller agrees to sell, transfer, assign, and convey to the Purchaser, and the Purchaser agrees to purchase from the Seller, all right, title, and interest in and to the Stock.");
    write("1.2 Delivery of Stock Certificates: The Stock shall be delivered to the Purchaser in the form of certificates duly endorsed for transfer or accompanied by appropriate stock powers duly executed in blank, with signatures guaranteed in the customary fashion. The Seller shall ensure that all documentary transfer taxes, if any, are paid.");

    write("\n");
    write("2. PURCHASE PRICE AND PAYMENT", 12, true);
    write("2.1 Purchase Price: The total purchase price for the Stock (the \u201cPurchase Price\u201d) shall be $" + (formData.purchasePrice || "[Amount]") + ".");
    write("2.2 Payment Terms: The Purchase Price shall be paid as follows:");
    write("\u2022 Initial Payment: $" + (formData.initialPayment || "[Amount]") + " payable upon execution of this Agreement.");
    write("\u2022 Balance Payment: $" + (formData.balancePayment || "[Amount]") + " payable at the Closing.");
    write("2.3 Method of Payment: All payments shall be made by " + (formData.paymentMethod || "wire transfer to an account designated by the Seller, or by such other method as mutually agreed in writing.") );

    write("\n");
    write("3. CLOSING", 12, true);
    write("3.1 Time and Place: The Closing of the purchase and sale of the Stock shall take place at " + (formData.closingTime || "[Time]") + ", at " + (formData.closingLocation || "[Location]") + ", or at such other place, time, and date as the Parties may mutually agree.");
    write("3.2 Deliverables at Closing: At the Closing, the Seller shall deliver the Stock certificates, duly endorsed, and any other documents reasonably required to effect the transfer of ownership. The Purchaser shall pay the Purchase Price in accordance with Section 2.");

    write("\n");
    write("4. REPRESENTATIONS AND WARRANTIES OF THE SELLER", 12, true);
    write("The Seller hereby represents and warrants as of the Effective Date and as of the Closing:");
    write("4.1 Ownership and Authority: The Seller is the lawful owner of the Stock, free and clear of any liens, claims, encumbrances, or restrictions, and has full authority to sell and transfer the Stock.");
    write("4.2 Organization and Standing of the Corporation: The Corporation is duly organized, validly existing, and in good standing under the laws of " + (formData.stateJurisdiction || "[State/Jurisdiction]") + ".");
    write("4.3 No Conflicting Agreements: The Seller is not a party to any agreement, written or oral, granting any third party rights to the Stock or otherwise restricting the transfer or sale of the Stock.");
    write("4.4 No Encumbrances: There are no outstanding warrants, options, calls, rights of first refusal, redemption rights, or convertible securities affecting the Stock.");
    write("4.5 No Broker or Finder Fees: No broker, finder, or agent has been engaged by the Seller to solicit the Purchaser for this transaction, and there are no fees or commissions payable to any third party in connection with the sale of the Stock.");

    write("\n");
    write("5. REPRESENTATIONS AND WARRANTIES OF THE PURCHASER", 12, true);
    write("The Purchaser represents and warrants that:");
    write("5.1 Authority: The Purchaser has full power and authority to enter into this Agreement and to consummate the transactions contemplated hereby.");
    write("5.2 Investment Intent: The Purchaser is acquiring the Stock for its own account for investment purposes and not with a view to resale or distribution.");
    write("5.3 No Conflicting Obligations: The execution, delivery, and performance of this Agreement do not violate any agreement to which the Purchaser is a party.");

    write("\n");
    write("6. COVENANTS OF THE PARTIES", 12, true);
    write("6.1 Further Assurances: Each Party agrees to execute and deliver such additional instruments and take such actions as may reasonably be required to effectuate the transfer of the Stock and to carry out the intent of this Agreement.");
    write("6.2 Confidentiality: The Parties shall maintain the confidentiality of all information received in connection with this Agreement and shall not disclose such information except as required by law or with prior written consent.");
    write("6.3 Compliance with Law: Each Party shall comply with all applicable laws, regulations, and requirements in connection with the transactions contemplated by this Agreement.");

    write("\n");
    write("7. GENERAL PROVISIONS", 12, true);
    write("7.1 Entire Agreement");
    write("This Agreement, including all exhibits and schedules hereto, constitutes the entire agreement of the Parties regarding the subject matter hereof and supersedes all prior or contemporaneous understandings, agreements, or representations.");
    write("7.2 Amendment");
    write("No modification, amendment, or waiver of any provision shall be effective unless in writing and executed by all Parties.");
    write("7.3 Severability");
    write("If any provision is held invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Invalid provisions shall be reformed to the extent necessary to reflect the original intent of the Parties.");
    write("7.4 Waiver");
    write("Failure to enforce any provision shall not constitute a waiver of the right to enforce that provision in the future. Waivers must be in writing.");
    write("7.5 Assignment");
    write("No Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party.");
    write("7.6 Binding Effect");
    write("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.");
    write("7.7 Notices");
    write("All notices must be in writing and delivered personally, by certified mail (return receipt requested), overnight courier, or electronically with confirmation. Notices are deemed effective upon delivery.");

    write("\n");
    write("7.8 Governing Law");
    write("This Agreement shall be governed by and construed in accordance with the laws of " + (formData.governingLaw || "[State/Jurisdiction]") + ", without regard to conflicts of law principles.");
    write("7.9 Dispute Resolution");
    write("Parties shall first attempt to resolve disputes by negotiation. If unresolved, disputes shall be submitted to binding arbitration under AAA rules in " + (formData.arbitrationLocation || "[City, State]") + ", and the arbitrator’s decision shall be final and enforceable. The prevailing Party is entitled to reasonable attorneys’ fees and costs.");
    write("7.10 Force Majeure");
    write((formData.forceMajeure && formData.forceMajeure + "") || "Neither Party is liable for delays or failures caused by events beyond reasonable control, including natural disasters, pandemics, war, or governmental actions. Obligations shall resume promptly after the event ends.");

    write("\n");
    write("8. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Stock Purchase Agreement as of the Effective Date written above.");
    write("SELLER:");
    write("Signature: __________________________");
    write("Name: " + (formData.sellerSignName || "___________________________"));
    write("Title: " + (formData.sellerSignTitle || "____________________________"));
    write("Date: " + (formData.sellerSignDate || "____________________________"));
    write("PURCHASER:");
    write("Signature: __________________________");
    write("Name: " + (formData.purchaserSignName || "___________________________"));
    write("Title: " + (formData.purchaserSignTitle || "____________________________"));
    write("Date: " + (formData.purchaserSignDate || "____________________________"));

    write("WITNESSES (Optional):");
    write("1.Name: " + (formData.witness1Name || "_________________________") + " Signature: ________________________");
    write("2.Name: " + (formData.witness2Name || "_________________________") + " Signature: ________________________");

    doc.save("Stock_Purchase_Agreement.pdf");
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
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Seller - Name</Label>
              <Input name="sellerName" value={formData.sellerName} onChange={handleChange} />
              <Label>Seller - Address</Label>
              <Textarea name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} />

              <Label className="pt-2">Purchaser - Name</Label>
              <Input name="purchaserName" value={formData.purchaserName} onChange={handleChange} />
              <Label>Purchaser - Address</Label>
              <Textarea name="purchaserAddress" value={formData.purchaserAddress} onChange={handleChange} />

              <Label className="pt-2">Corporation Name</Label>
              <Input name="corporationName" value={formData.corporationName} onChange={handleChange} />
              <Label>Type / State Jurisdiction</Label>
              <Input name="corporationType" value={formData.corporationType} onChange={handleChange} />
              <Input name="stateJurisdiction" value={formData.stateJurisdiction} onChange={handleChange} placeholder="[State/Jurisdiction]" />
              <Label className="pt-2">Number of Shares</Label>
              <Input name="numberOfShares" value={formData.numberOfShares} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Price, Payment & Closing</h3>
              <Label>Purchase Price</Label>
              <Input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} />

              <Label className="pt-2">Initial Payment</Label>
              <Input name="initialPayment" value={formData.initialPayment} onChange={handleChange} />

              <Label>Balance Payment</Label>
              <Input name="balancePayment" value={formData.balancePayment} onChange={handleChange} />

              <Label className="pt-2">Payment Method</Label>
              <Input name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />

              <Label className="pt-2">Closing Time</Label>
              <Input name="closingTime" value={formData.closingTime} onChange={handleChange} />

              <Label>Closing Location</Label>
              <Input name="closingLocation" value={formData.closingLocation} onChange={handleChange} />

              <Label className="pt-2">Deliverables at Closing (override)</Label>
              <Textarea name="deliverablesAtClosing" value={formData.deliverablesAtClosing} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Reps, Covenants & General</h3>
              <Label>Seller Representations (override)</Label>
              <Textarea name="sellerReps" value={formData.sellerReps} onChange={handleChange} />

              <Label className="pt-2">Purchaser Representations (override)</Label>
              <Textarea name="purchaserReps" value={formData.purchaserReps} onChange={handleChange} />

              <Label className="pt-2">Further Assurances</Label>
              <Textarea name="furtherAssurances" value={formData.furtherAssurances} onChange={handleChange} />

              <Label className="pt-2">Confidentiality</Label>
              <Textarea name="confidentiality" value={formData.confidentiality} onChange={handleChange} />

              <Label className="pt-2">Compliance / Notices</Label>
              <Textarea name="notices" value={formData.notices} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Governing Law, Signatures & Witnesses</h3>

              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label className="pt-2">Arbitration Location</Label>
              <Input name="arbitrationLocation" value={formData.arbitrationLocation} onChange={handleChange} />

              <Label className="pt-2">Force Majeure (override)</Label>
              <Textarea name="forceMajeure" value={formData.forceMajeure} onChange={handleChange} />

              <hr />

              <Label>Seller Signatory - Name</Label>
              <Input name="sellerSignName" value={formData.sellerSignName} onChange={handleChange} />
              <Label>Seller Signatory - Title</Label>
              <Input name="sellerSignTitle" value={formData.sellerSignTitle} onChange={handleChange} />
              <Label>Seller Signatory - Date</Label>
              <Input type="date" name="sellerSignDate" value={formData.sellerSignDate} onChange={handleChange} />

              <hr />

              <Label>Purchaser Signatory - Name</Label>
              <Input name="purchaserSignName" value={formData.purchaserSignName} onChange={handleChange} />
              <Label>Purchaser Signatory - Title</Label>
              <Input name="purchaserSignTitle" value={formData.purchaserSignTitle} onChange={handleChange} />
              <Label>Purchaser Signatory - Date</Label>
              <Input type="date" name="purchaserSignDate" value={formData.purchaserSignDate} onChange={handleChange} />

              <hr />

              <Label>Witness 1 - Name</Label>
              <Input name="witness1Name" value={formData.witness1Name} onChange={handleChange} />
              <Label>Witness 2 - Name</Label>
              <Input name="witness2Name" value={formData.witness2Name} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Stock Purchase Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
