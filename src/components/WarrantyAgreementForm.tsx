import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  manufacturerName: string;
  manufacturerAddress: string;
  customerName: string;
  customerAddress: string;
  productName: string;
  productType: string;
  modelNumber: string;
  serialNumber: string;
  warrantyPeriod: string;
  warrantyCommenceDate: string;
  scopeDetails: string;
  exclusions: string;
  voidConditions: string;
  customerObligations: string;
  inHomeContact: string;
  inHomeDays: string;
  mailReturnInstructions: string;
  buyerRemedies: string;
  adrNotes: string;
  severabilityNotes: string;
  limitationNotes: string;
  governingLaw: string;
  manufacturerSignName: string;
  manufacturerSignDate: string;
  customerSignName: string;
  customerSignDate: string;
}

export default function WarrantyAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    manufacturerName: "",
    manufacturerAddress: "",
    customerName: "",
    customerAddress: "",
    productName: "",
    productType: "",
    modelNumber: "",
    serialNumber: "",
    warrantyPeriod: "",
    warrantyCommenceDate: "",
    scopeDetails: "",
    exclusions: "",
    voidConditions: "",
    customerObligations: "",
    inHomeContact: "",
    inHomeDays: "",
    mailReturnInstructions: "",
    buyerRemedies: "",
    adrNotes: "",
    severabilityNotes: "",
    limitationNotes: "",
    governingLaw: "",
    manufacturerSignName: "",
    manufacturerSignDate: "",
    customerSignName: "",
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

    // Verbatim Warranty Agreement with substitutions
    write("WARRANTY AGREEMENT", 14, true, true);
    write("\n");

    write("I. GENERAL AGREEMENT DETAILS", 12, true);
    write(`This Warranty Agreement (\"Agreement\") is made and entered into as of ${formData.effectiveDate || "[------]"} (the \"Effective Date\"), by and between ${formData.manufacturerName || "[------]"}, having its principal place of business at ${formData.manufacturerAddress || "[-----]"} (hereinafter referred to as the \"Manufacturer\"), and ${formData.customerName || "[-----]"}, residing at ${formData.customerAddress || "[-------]"} (hereinafter referred to as the \"Customer\").`);

    write("Covered Product");
    write("The product covered under this Agreement (the \"Covered Product\") is described as follows:");
    write(`•Product Name: ${formData.productName || "[------]"}`);
    write(`•Product Type: ${formData.productType || "[--------]"}`);
    write(`•Model Number: ${formData.modelNumber || "[------]"}`);
    write(`•Serial Number: ${formData.serialNumber || "[-------]"}`);

    write("Warranty Coverage");
    write(`The Manufacturer warrants that the Covered Product shall be free from defects in material and workmanship for a period of ${formData.warrantyPeriod || "[------]"} commencing from ${formData.warrantyCommenceDate || "[---------]"} (the \"Warranty Period\"). This warranty shall apply exclusively to the original purchaser and any successive purchaser during the Warranty Period, subject to the terms and limitations herein.`);

    write("\n");
    write("II. SCOPE OF WARRANTY AND EXCLUSIONS", 12, true);
    write("Scope of Warranty");
    write(formData.scopeDetails || "This warranty strictly covers manufacturing defects arising from faulty materials or workmanship under normal and intended use of the Covered Product.");

    write("Exclusions");
    write(formData.exclusions || "This warranty shall not apply to, and expressly excludes, any defects or damages resulting from:");
    write("•Misuse, abuse, negligence, or accident;");
    write("•Unauthorized alterations, modifications, or repairs;");
    write("•Normal wear and tear arising from ordinary usage.");

    write("Conditions Rendering Warranty Void");
    write(formData.voidConditions || "This warranty shall be deemed null and void if the Covered Product has been:");
    write("•Altered, serviced, or repaired by any person not authorized by the Manufacturer;");
    write("•Used for purposes inconsistent with or contrary to its intended function;");
    write("•Exposed to environmental conditions or operational settings not recommended by the Manufacturer.");

    write("\n");
    write("III. OBTAINING WARRANTY SERVICE", 12, true);
    write("1. Customer Obligations");
    write(formData.customerObligations || "In order to obtain warranty service, the Customer must, within the Warranty Period:");
    write("•Promptly notify the Manufacturer of any defect or malfunction;");
    write("•Provide valid proof of purchase upon request; and");
    write("•Return the Covered Product for inspection when so required by the Manufacturer.");

    write("2. Procedure for Warranty Service");
    write("(a) In-Home Repairs (Large Appliances)");
    write(`Where in-home service is applicable, the Customer shall notify ${formData.inHomeContact || "[-------]"} by contacting the toll-free number ${formData.inHomeContact || "[-------]"} immediately upon discovery of any defect, malfunction, or non-conformity. An authorised service technician shall attend the Customer's premises to repair or replace the defective component within ${formData.inHomeDays || "[-------]"} days from receipt of such notification.`);

    write("(b) Products Returned by Mail");
    write(formData.mailReturnInstructions || "Where the Covered Product is returned by post, the Customer is advised to dispatch the product via insured shipment and return receipt requested. The Manufacturer shall not be liable for any loss, damage, or misplacement occurring during transit.");

    write("\n");
    write("IV. BUYER REMEDIES", 12, true);
    write(formData.buyerRemedies || "Upon confirmation of a covered defect, the Manufacturer shall, at its sole discretion, elect to:");
    write("•Repair the Covered Product using new or refurbished components; or");
    write("•Replace the Covered Product with a product of equivalent specification; or");
    write("•Refund the original purchase price to the Customer.");

    write("\n");
    write("V. DISPUTE RESOLUTION AND LEGAL PROVISIONS", 12, true);
    write("1. Alternative Dispute Resolution (ADR)");
    write(formData.adrNotes || "The Parties shall endeavour to resolve any dispute, controversy, or claim arising out of or relating to this Agreement through amicable negotiations. Failing such resolution, the Parties agree to attempt settlement in good faith through mediation in accordance with applicable statutory mediation rules.");

    write("\n");
    write("2. Severability");
    write(formData.severabilityNotes || "If any provision of this Agreement is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be severed or limited to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.");

    write("3. Limitation of Liability");
    write(formData.limitationNotes || "Under no circumstances shall the Manufacturer be liable for any indirect, incidental, consequential, special, or exemplary damages arising out of or related to this Agreement, including but not limited to loss of profits, revenue, business interruption, or third-party claims, even if advised of the possibility of such damages.");

    write("4. Governing Law");
    write(`This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[BLANK]"}, without regard to its conflict of law principles.`);

    write("5. Entire Agreement");
    write("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, agreements, or understandings, whether oral or written.");

    write("\n");
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Warranty Agreement as of the Effective Date first written above.");
    write("Manufacturer: " + (formData.manufacturerSignName || "________________________"));
    write("Authorised Signatory");
    write("Customer: " + (formData.customerSignName || "________________________"));
    write("Signature");
    write("Date: " + (formData.customerSignDate || "________________________"));

    doc.save("Warranty_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">General Details</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

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
              <Label>Warranty Commencement Date</Label>
              <Input type="date" name="warrantyCommenceDate" value={formData.warrantyCommenceDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Scope, Exclusions & Void Conditions</h3>
              <Label>Scope of Warranty (override)</Label>
              <Textarea name="scopeDetails" value={formData.scopeDetails} onChange={handleChange} />

              <Label className="pt-2">Exclusions</Label>
              <Textarea name="exclusions" value={formData.exclusions} onChange={handleChange} />

              <Label className="pt-2">Conditions Rendering Warranty Void</Label>
              <Textarea name="voidConditions" value={formData.voidConditions} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Obtaining Service & Remedies</h3>
              <Label>Customer Obligations</Label>
              <Textarea name="customerObligations" value={formData.customerObligations} onChange={handleChange} />

              <Label className="pt-2">In-Home Service Contact (toll-free)</Label>
              <Input name="inHomeContact" value={formData.inHomeContact} onChange={handleChange} />
              <Label>In-Home Service - Response Days</Label>
              <Input name="inHomeDays" value={formData.inHomeDays} onChange={handleChange} />

              <Label className="pt-2">Mail Return Instructions</Label>
              <Textarea name="mailReturnInstructions" value={formData.mailReturnInstructions} onChange={handleChange} />

              <Label className="pt-2">Buyer Remedies (override)</Label>
              <Textarea name="buyerRemedies" value={formData.buyerRemedies} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Governing Law & Signatures</h3>
              <Label>ADR / Dispute Resolution Notes</Label>
              <Textarea name="adrNotes" value={formData.adrNotes} onChange={handleChange} />

              <Label className="pt-2">Severability (override)</Label>
              <Textarea name="severabilityNotes" value={formData.severabilityNotes} onChange={handleChange} />

              <Label className="pt-2">Limitation of Liability (override)</Label>
              <Textarea name="limitationNotes" value={formData.limitationNotes} onChange={handleChange} />

              <Label className="pt-2">Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>Manufacturer Signatory - Name</Label>
              <Input name="manufacturerSignName" value={formData.manufacturerSignName} onChange={handleChange} />
              <Label>Manufacturer Signatory - Date</Label>
              <Input type="date" name="manufacturerSignDate" value={formData.manufacturerSignDate} onChange={handleChange} />

              <hr />

              <Label>Customer Signatory - Name</Label>
              <Input name="customerSignName" value={formData.customerSignName} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Warranty Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
