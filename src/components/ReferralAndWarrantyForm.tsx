import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";

interface FormData {
  effectiveDate: string;
  // Referral Agreement
  buyerName: string;
  buyerAddress: string;
  referrerName: string;
  referrerAddress: string;
  industry: string;
  complianceNotes: string;
  termEndDate: string;
  terminationNoticeDays: string;
  exclusivity: string;
  feesPercent: string;
  feeCalculationNotes: string;
  invoicePaymentDays: string;
  paymentMethods: string;
  nonCircumventionNotes: string;
  confidentialityNotes: string;
  disputeResolution: string;
  governingLawReferral: string;
  attorneysFeesClause: string;
  // Warranty Agreement
  warrantyEffectiveDate: string;
  manufacturerName: string;
  manufacturerAddress: string;
  customerName: string;
  customerAddress: string;
  productName: string;
  productType: string;
  modelNumber: string;
  serialNumber: string;
  warrantyPeriod: string;
  warrantyStartDate: string;
  warrantyScope: string;
  warrantyExclusions: string;
  warrantyVoidConditions: string;
  warrantyServiceProcedure: string;
  warrantyRemedies: string;
  warrantyAdr: string;
  warrantyGoverningLaw: string;
  // Signatories
  buyerSignName: string;
  buyerSignDesignation: string;
  buyerSignDate: string;
  referrerSignName: string;
  referrerSignDesignation: string;
  referrerSignDate: string;
  manufacturerSignName: string;
  manufacturerSignDesignation: string;
  manufacturerSignDate: string;
  customerSignName: string;
  customerSignDesignation: string;
  customerSignDate: string;
}

export default function ReferralAndWarrantyForm() {
  const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    buyerName: "",
    buyerAddress: "",
    referrerName: "",
    referrerAddress: "",
    industry: "",
    complianceNotes: "",
    termEndDate: "",
    terminationNoticeDays: "",
    exclusivity: "",
    feesPercent: "",
    feeCalculationNotes: "",
    invoicePaymentDays: "30",
    paymentMethods: "",
    nonCircumventionNotes: "",
    confidentialityNotes: "",
    disputeResolution: "",
    governingLawReferral: "",
    attorneysFeesClause: "",
    warrantyEffectiveDate: "",
    manufacturerName: "",
    manufacturerAddress: "",
    customerName: "",
    customerAddress: "",
    productName: "",
    productType: "",
    modelNumber: "",
    serialNumber: "",
    warrantyPeriod: "",
    warrantyStartDate: "",
    warrantyScope: "",
    warrantyExclusions: "",
    warrantyVoidConditions: "",
    warrantyServiceProcedure: "",
    warrantyRemedies: "",
    warrantyAdr: "",
    warrantyGoverningLaw: "",
    buyerSignName: "",
    buyerSignDesignation: "",
    buyerSignDate: "",
    referrerSignName: "",
    referrerSignDesignation: "",
    referrerSignDate: "",
    manufacturerSignName: "",
    manufacturerSignDesignation: "",
    manufacturerSignDate: "",
    customerSignName: "",
    customerSignDesignation: "",
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

    // EXACT REFERRAL FEE AGREEMENT TEXT (verbatim)
    write("REFERRAL FEE AGREEMENT", 14, true, true);
    write("");
    write("This Referral Fee Agreement (\"Agreement\") is made and entered into on [-------] (the \"Effective Date\"), by and between [-------], of [--------] (hereinafter referred to as the \"Buyer\"), and [------], of [-------] (hereinafter referred to as the \"Referrer\").");
    write("");
    write("RECITALS");
    write("WHEREAS, the Buyer intends to purchase certain goods;");
    write("WHEREAS, the Referrer possesses contacts and industry connections within the [-------] industry and is willing to act as an intermediary for the purpose of introducing potential sellers to the Buyer;");
    write("NOW, THEREFORE, in consideration of the mutual covenants, representations, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:");

    write("");
    write("1. LEGAL COMPLIANCE", 12, true);
    write("The Referrer shall comply with all applicable laws, rules, and regulations governing the [BLANK] industry. Where licensing and/or certification is required under applicable law, the Referrer shall be fully responsible for obtaining and maintaining such licensing and certifications. The Buyer acknowledges that the Referrer does / does not hold the required licensing and/or certification, as applicable.");

    write("");
    write("2. TERM", 12, true);
    write("This Agreement shall commence on the Effective Date and shall remain in full force and effect until [BLANK] (the \"Termination Date\"), unless earlier terminated in accordance with the provisions of this Agreement. The Termination Date may be extended or modified by mutual written agreement of the Parties.");

    write("");
    write("3. TERMINATION", 12, true);
    write("Either Party may terminate this Agreement prior to the Termination Date, with or without cause, by providing not less than [--------] days' written notice to the other Party (\"Early Termination\"). Upon Early Termination, the Referrer shall be entitled to receive a pro-rated payment for Services duly performed up to the effective date of termination. Notice delivered via email shall constitute valid notice for the purposes of this clause.");

    write("");
    write("4. EXCLUSIVITY", 12, true);
    write("During the term of this Agreement, the Referrer shall have the exclusive right to introduce prospective sellers to the Buyer, provided such sellers were not previously known to or engaged by the Buyer prior to such introduction.");

    write("");
    write("5. RELATIONSHIP OF THE PARTIES", 12, true);
    write("The Referrer shall act as an independent contractor and nothing herein shall be deemed to create any partnership, joint venture, agency, or employer-employee relationship between the Parties. The Referrer shall be solely responsible for all taxes, contributions, and statutory obligations arising out of its activities under this Agreement. Upon reasonable request, the Referrer shall provide proof of workers' compensation and general liability insurance coverage.");

    write("");
    write("6. FEES AND PAYMENT", 12, true);
    write("This Agreement contemplates an introduction-only arrangement.");
    write("The Referrer's fee shall be calculated as [------]% of the net value of goods purchased by the Buyer as a direct result of an introduction made by the Referrer. \"Net Value\" shall exclude value-added tax (VAT), postage, packaging, insurance, refunds, and any payments not honoured by a financial institution.");
    write("Upon becoming entitled to the Referrer's fee, the Referrer shall issue an invoice to the Buyer. Payment shall be made within thirty (30) days from the date of the invoice.");
    write("Acceptable methods of payment shall include: [-------].");

    write("");
    write("7. NON-CIRCUMVENTION", 12, true);
    write("During the term of this Agreement, the Buyer shall not directly or indirectly engage in any transaction with any seller introduced by the Referrer with the intent of avoiding payment of the Referrer's commission. In the event of such circumvention, the Referrer shall remain fully entitled to its commission or referral fee in respect of such transaction.");

    write("");
    write("8. CONFIDENTIALITY", 12, true);
    write("The Referrer agrees to keep strictly confidential all proprietary, commercial, and sensitive information of the Buyer and shall not, whether directly or indirectly, disclose or use such Confidential Information for any purpose other than the performance of this Agreement. Confidential Information includes, but is not limited to, business strategies, customer data, pricing structures, and trade secrets. This obligation shall survive termination or expiry of this Agreement.");

    write("");
    write("9. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, negotiations, or understandings, whether written or oral.");

    write("");
    write("10. SEVERABILITY", 12, true);
    write("If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall continue in full force and effect, provided the essential purpose of this Agreement is not defeated.");

    write("");
    write("11. FORCE MAJEURE", 12, true);
    write("Neither Party shall be liable for failure or delay in performance of its obligations under this Agreement where such failure arises due to events beyond its reasonable control, including but not limited to acts of God, pandemics, natural disasters, governmental actions, wars, riots, strikes, or other similar events (\"Force Majeure\"). The affected Party shall promptly notify the other Party and shall use reasonable efforts to resume performance as soon as practicable.");

    write("");
    write("12. ALTERNATIVE DISPUTE RESOLUTION", 12, true);
    write("The Parties shall endeavour to resolve any dispute arising out of or relating to this Agreement through amicable negotiations. Failing such resolution, the dispute shall be referred to mediation in accordance with the applicable statutory mediation rules.");

    write("");
    write("13. AMENDMENT", 12, true);
    write("This Agreement may only be amended or modified by a written instrument executed and signed by both Parties.");

    write("");
    write("14. WAIVER", 12, true);
    write("Failure by either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right to enforce it at a later time.");

    write("");
    write("15. GOVERNING LAW", 12, true);
    write("This Agreement shall be governed by and construed in accordance with the laws of [------].");

    write("");
    write("16. ATTORNEYS' FEES", 12, true);
    write("In the event of any legal action or proceeding arising out of this Agreement, the prevailing Party shall be entitled to recover reasonable legal fees and costs in addition to any other relief awarded.");

    write("");
    write("WARRANTY AGREEMENT (REWRITTEN EXTRACT)", 14, true, true);
    write("This document sets forth a refined and legally structured summary of the principal terms and conditions governing the Warranty Agreement.");
    write("");
    write("I. GENERAL AGREEMENT DETAILS", 12, true);
    write("This Warranty Agreement (\"Agreement\") is made and entered into as of [BLANK] (the \"Effective Date\"), by and between [BLANK], having its principal place of business at [BLANK] (hereinafter referred to as the \"Manufacturer\"), and [BLANK], residing at [BLANK] (hereinafter referred to as the \"Customer\").");
    write("Covered Product");
    write("The product covered under this Agreement (the \"Covered Product\") is described as follows:");
    write("•Product Name: [BLANK]");
    write("•Product Type: [BLANK]");
    write("•Model Number: [BLANK]");
    write("•Serial Number: [BLANK]");
    write("Warranty Coverage");
    write("The Manufacturer warrants that the Covered Product shall be free from defects in material and workmanship for a period of [BLANK] commencing from [BLANK] (the \"Warranty Period\"). This warranty shall apply exclusively to the original purchaser and any successive purchaser during the Warranty Period, subject to the terms and limitations herein.");

    write("");
    write("II. SCOPE OF WARRANTY AND EXCLUSIONS", 12, true);
    write("Scope of Warranty");
    write("This warranty strictly covers manufacturing defects arising from faulty materials or workmanship under normal and intended use of the Covered Product.");
    write("Exclusions");
    write("This warranty shall not apply to, and expressly excludes, any defects or damages resulting from:");
    write("•Misuse, abuse, negligence, or accident;");
    write("•Unauthorized alterations, modifications, or repairs;");
    write("•Normal wear and tear arising from ordinary usage.");
    write("Conditions Rendering Warranty Void");
    write("This warranty shall be deemed null and void if the Covered Product has been:");
    write("•Altered, serviced, or repaired by any person not authorized by the Manufacturer;");
    write("•Used for purposes inconsistent with or contrary to its intended function;");
    write("•Exposed to environmental conditions or operational settings not recommended by the Manufacturer.");

    write("");
    write("III. OBTAINING WARRANTY SERVICE", 12, true);
    write("1. Customer Obligations");
    write("In order to obtain warranty service, the Customer must, within the Warranty Period:");
    write("•Promptly notify the Manufacturer of any defect or malfunction;");
    write("•Provide valid proof of purchase upon request; and");
    write("•Return the Covered Product for inspection when so required by the Manufacturer.");
    write("2. Procedure for Warranty Service");
    write("(a) In-Home Repairs (Large Appliances)");
    write("Where in-home service is applicable, the Customer shall notify [BLANK] by contacting the toll-free number [BLANK] immediately upon discovery of any defect, malfunction, or non-conformity. An authorised service technician shall attend the Customer's premises to repair or replace the defective component within [BLANK] days from receipt of such notification.");
    write("(b) Products Returned by Mail");
    write("Where the Covered Product is returned by post, the Customer is advised to dispatch the product via insured shipment and return receipt requested. The Manufacturer shall not be liable for any loss, damage, or misplacement occurring during transit.");

    write("");
    write("IV. BUYER REMEDIES", 12, true);
    write("Upon confirmation of a covered defect, the Manufacturer shall, at its sole discretion, elect to:");
    write("•Repair the Covered Product using new or refurbished components; or");
    write("•Replace the Covered Product with a product of equivalent specification; or");
    write("•Refund the original purchase price to the Customer.");

    write("");
    write("V. DISPUTE RESOLUTION AND LEGAL PROVISIONS", 12, true);
    write("1. Alternative Dispute Resolution (ADR)");
    write("The Parties shall endeavour to resolve any dispute, controversy, or claim arising out of or relating to this Agreement through amicable negotiations. Failing such resolution, the Parties agree to attempt settlement in good faith through mediation in accordance with applicable statutory mediation rules.");
    write("2. Severability");
    write("If any provision of this Agreement is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be severed or limited to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.");
    write("3. Limitation of Liability");
    write("Under no circumstances shall the Manufacturer be liable for any indirect, incidental, consequential, special, or exemplary damages arising out of or related to this Agreement, including but not limited to loss of profits, revenue, business interruption, or third-party claims, even if advised of the possibility of such damages.");
    write("4. Governing Law");
    write("This Agreement shall be governed by and construed in accordance with the laws of [BLANK], without regard to its conflict of law principles.");
    write("5. Entire Agreement");
    write("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, agreements, or understandings, whether oral or written.");

    write("");
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Warranty Agreement as of the Effective Date first written above.");
    write("Manufacturer: __________________________");
    write("Authorised Signatory");
    write("Customer: __________________________");
    write("Signature");
    write("Date: __________________________");

    write("");
    write("17. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
    write("Authorized Signatory (Buyer)    Authorized Signatory (Referrer)");
    write("Name: _________________________    Name: _________________________");
    write("Designation: __________________    Designation: __________________");
    write("Signature: _____________________    Signature: _____________________");
    write("Date: __________________________    Date: __________________________");

    // Signatures (form fields)
    write("");
    write(`Buyer Signatory: ${formData.buyerSignName || ""}`);
    write(`Designation: ${formData.buyerSignDesignation || ""}`);
    write(`Date: ${formData.buyerSignDate || ""}`);

    write("");
    write(`Referrer Signatory: ${formData.referrerSignName || ""}`);
    write(`Designation: ${formData.referrerSignDesignation || ""}`);
    write(`Date: ${formData.referrerSignDate || ""}`);

    write("");
    write(`Manufacturer Signatory: ${formData.manufacturerSignName || ""}`);
    write(`Designation: ${formData.manufacturerSignDesignation || ""}`);
    write(`Date: ${formData.manufacturerSignDate || ""}`);

    write("");
    write(`Customer Signatory: ${formData.customerSignName || ""}`);
    write(`Designation: ${formData.customerSignDesignation || ""}`);
    write(`Date: ${formData.customerSignDate || ""}`);

    doc.save("Referral_and_Warranty_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
            <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/referral-fee-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Referral Fee Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Referral — Parties & Term</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Buyer - Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Buyer - Address</Label>
              <Textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} />

              <Label className="pt-2">Referrer - Name</Label>
              <Input name="referrerName" value={formData.referrerName} onChange={handleChange} />
              <Label>Referrer - Address</Label>
              <Textarea name="referrerAddress" value={formData.referrerAddress} onChange={handleChange} />

              <Label className="pt-2">Industry</Label>
              <Input name="industry" value={formData.industry} onChange={handleChange} />

              <Label className="pt-2">Legal Compliance / Notes</Label>
              <Textarea name="complianceNotes" value={formData.complianceNotes} onChange={handleChange} />

              <Label>Term End Date</Label>
              <Input type="date" name="termEndDate" value={formData.termEndDate} onChange={handleChange} />

              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Fees, Payments & Non-circumvention</h3>
              <Label>Exclusivity</Label>
              <Textarea name="exclusivity" value={formData.exclusivity} onChange={handleChange} />

              <Label className="pt-2">Referral Fee (%)</Label>
              <Input name="feesPercent" value={formData.feesPercent} onChange={handleChange} />

              <Label>Fee Calculation Notes</Label>
              <Textarea name="feeCalculationNotes" value={formData.feeCalculationNotes} onChange={handleChange} />

              <Label className="pt-2">Invoice Payment Days</Label>
              <Input name="invoicePaymentDays" value={formData.invoicePaymentDays} onChange={handleChange} />

              <Label>Payment Methods</Label>
              <Input name="paymentMethods" value={formData.paymentMethods} onChange={handleChange} />

              <Label className="pt-2">Non-circumvention</Label>
              <Textarea name="nonCircumventionNotes" value={formData.nonCircumventionNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Confidentiality & ADR</h3>
              <Label>Confidentiality</Label>
              <Textarea name="confidentialityNotes" value={formData.confidentialityNotes} onChange={handleChange} />

              <Label className="pt-2">Dispute Resolution</Label>
              <Textarea name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} />

              <Label>Governing Law (Referral)</Label>
              <Input name="governingLawReferral" value={formData.governingLawReferral} onChange={handleChange} />

              <Label className="pt-2">Attorneys' Fees Clause</Label>
              <Textarea name="attorneysFeesClause" value={formData.attorneysFeesClause} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranty Summary & Signatories</h3>

              <Label>Warranty Effective Date</Label>
              <Input type="date" name="warrantyEffectiveDate" value={formData.warrantyEffectiveDate} onChange={handleChange} />

              <Label className="pt-2">Manufacturer - Name</Label>
              <Input name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} />
              <Label>Manufacturer - Address</Label>
              <Textarea name="manufacturerAddress" value={formData.manufacturerAddress} onChange={handleChange} />

              <Label className="pt-2">Customer - Name</Label>
              <Input name="customerName" value={formData.customerName} onChange={handleChange} />
              <Label>Customer - Address</Label>
              <Textarea name="customerAddress" value={formData.customerAddress} onChange={handleChange} />

              <Label className="pt-2">Product Name</Label>
              <Input name="productName" value={formData.productName} onChange={handleChange} />
              <Label>Product Type</Label>
              <Input name="productType" value={formData.productType} onChange={handleChange} />
              <Label>Model Number</Label>
              <Input name="modelNumber" value={formData.modelNumber} onChange={handleChange} />
              <Label>Serial Number</Label>
              <Input name="serialNumber" value={formData.serialNumber} onChange={handleChange} />

              <Label className="pt-2">Warranty Period</Label>
              <Input name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} />
              <Label>Warranty Start Date</Label>
              <Input type="date" name="warrantyStartDate" value={formData.warrantyStartDate} onChange={handleChange} />

              <Label className="pt-2">Scope of Warranty</Label>
              <Textarea name="warrantyScope" value={formData.warrantyScope} onChange={handleChange} />

              <Label>Exclusions & Void Conditions</Label>
              <Textarea name="warrantyExclusions" value={formData.warrantyExclusions} onChange={handleChange} />
              <Textarea name="warrantyVoidConditions" value={formData.warrantyVoidConditions} onChange={handleChange} />

              <Label className="pt-2">Service Procedure</Label>
              <Textarea name="warrantyServiceProcedure" value={formData.warrantyServiceProcedure} onChange={handleChange} />

              <Label>Buyer Remedies</Label>
              <Textarea name="warrantyRemedies" value={formData.warrantyRemedies} onChange={handleChange} />

              <Label className="pt-2">Warranty ADR / Governing Law</Label>
              <Textarea name="warrantyAdr" value={formData.warrantyAdr} onChange={handleChange} />
              <Input name="warrantyGoverningLaw" value={formData.warrantyGoverningLaw} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Buyer Signatory - Name</Label>
              <Input name="buyerSignName" value={formData.buyerSignName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="buyerSignDesignation" value={formData.buyerSignDesignation} onChange={handleChange} />
              <Label>Date</Label>
              <Input type="date" name="buyerSignDate" value={formData.buyerSignDate} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Referrer Signatory - Name</Label>
              <Input name="referrerSignName" value={formData.referrerSignName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="referrerSignDesignation" value={formData.referrerSignDesignation} onChange={handleChange} />
              <Label>Date</Label>
              <Input type="date" name="referrerSignDate" value={formData.referrerSignDate} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Manufacturer Signatory - Name</Label>
              <Input name="manufacturerSignName" value={formData.manufacturerSignName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="manufacturerSignDesignation" value={formData.manufacturerSignDesignation} onChange={handleChange} />
              <Label>Date</Label>
              <Input type="date" name="manufacturerSignDate" value={formData.manufacturerSignDate} onChange={handleChange} />

              <hr />

              <Label className="pt-2">Customer Signatory - Name</Label>
              <Input name="customerSignName" value={formData.customerSignName} onChange={handleChange} />
              <Label>Designation</Label>
              <Input name="customerSignDesignation" value={formData.customerSignDesignation} onChange={handleChange} />
              <Label>Date</Label>
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
            <div className="text-green-600 font-semibold">Referral & Warranty PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
