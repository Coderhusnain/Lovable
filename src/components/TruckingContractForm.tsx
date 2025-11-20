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
  recipientName: string;
  recipientAddress: string;
  carrierName: string;
  carrierAddress: string;
  terminationDay: string;
  terminationMonth: string;
  terminationYear: string;
  terminationNoticeDays: string;
  cargoClaimDeliveryDays: string;
  cargoClaimEventDays: string;
  arbitrationCity: string;
  arbitrationState: string;
  governingLawState: string;
  recipientSignatoryName: string;
  recipientDesignation: string;
  recipientSignatureDate: string;
  carrierSignatoryName: string;
  carrierDesignation: string;
  carrierSignatureDate: string;
}

export default function TruckingContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDay: "",
    effectiveMonth: "",
    effectiveYear: "",
    recipientName: "",
    recipientAddress: "",
    carrierName: "",
    carrierAddress: "",
    terminationDay: "",
    terminationMonth: "",
    terminationYear: "",
    terminationNoticeDays: "",
    cargoClaimDeliveryDays: "",
    cargoClaimEventDays: "",
    arbitrationCity: "",
    arbitrationState: "",
    governingLawState: "",
    recipientSignatoryName: "",
    recipientDesignation: "",
    recipientSignatureDate: "",
    carrierSignatoryName: "",
    carrierDesignation: "",
    carrierSignatureDate: "",
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

    // === TRUCKING CONTRACT CONTENT (verbatim with substitutions) ===
    addText("TRUCKING CONTRACT", 14, true, true);

    const effectiveDateStr = `${formData.effectiveDay ? formData.effectiveDay : "___"} day of ${formData.effectiveMonth ? formData.effectiveMonth : "_______"}, ${formData.effectiveYear ? formData.effectiveYear : "20"}`;
    addText(`This Trucking Contract (“Contract”) is made and entered into as of the ${effectiveDateStr} (the “Effective Date”), by and between:`);

    addText(`[Party Name], having its principal place of business at [Address] (hereinafter referred to as the “Recipient”),`);
    addText(`AND`);
    addText(`[Party Name], having its principal place of business at [Address] (hereinafter referred to as the “Carrier”).`);
    addText(`The Recipient and the Carrier are hereinafter collectively referred to as the “Parties” and individually as a “Party.”`);

    addText("");
    addText("1. DESCRIPTION OF SERVICES", 12, true);
    addText("1.1 The Carrier hereby agrees to provide professional interstate and intrastate transportation and logistics services for the Recipient, including but not limited to the collection, carriage, handling, and delivery of goods, materials, and merchandise as may be mutually agreed from time to time (collectively, the “Services”).");

    addText("");
    addText("2. RATES, CHARGES, AND PAYMENT TERMS", 12, true);
    addText("2.1 The rates, tariffs, and charges applicable to the transportation and related services under this Contract shall be as specified.");
    addText("2.2 The Recipient shall compensate the Carrier for the Services rendered in a lump sum payment upon successful completion of each individual assignment or consignment, unless otherwise agreed in writing.");
    // preserve original punctuation exactly (includes concatenation issue in source)
    addText("2.3 All payments shall be made in lawful currency of the United States within the period stipulated in the corresponding invoice, free of any deduction, set-off, or counterclaim.3. TERM AND TERMINATION");

    addText("3.1 Term: This Contract shall commence on the Effective Date and shall remain valid and in full force until the " +
      `${formData.terminationDay ? formData.terminationDay : "___"} day of ${formData.terminationMonth ? formData.terminationMonth : "_______"}, ${formData.terminationYear ? formData.terminationYear : "20"} ` +
      "(the “Termination Date”), unless terminated earlier in accordance with this clause.");

    addText("3.2 Termination by Notice: Either Party may terminate this Contract, with or without cause, by giving the other Party at least " +
      `${formData.terminationNoticeDays ? formData.terminationNoticeDays : "___"} days’ prior written notice of its intention to terminate (the “Early Termination”).`);

    addText("3.3 Pro-Rata Compensation: In the event of Early Termination, the Carrier shall be entitled to payment on a pro-rata basis for all Services duly rendered up to the effective date of termination.");

    addText("");
    addText("4. SHIPMENTS GOVERNED BY CONTRACT", 12, true);
    addText("4.1 All shipments tendered by the Recipient to the Carrier after the Effective Date shall be deemed to constitute tenders under this Contract, subject exclusively to its terms and to such statutory provisions as apply to motor contract carriers under federal and state law.");
    addText("4.2 No oral or collateral arrangements inconsistent with this Contract shall be binding upon the Parties.");

    addText("");
    addText("5. FREIGHT LOSS OR DAMAGE", 12, true);
    addText("5.1 The Recipient shall submit any cargo loss or damage claim in writing to the Carrier within " +
      `${formData.cargoClaimDeliveryDays ? formData.cargoClaimDeliveryDays : "___"} days from the date of delivery, or if delivery has not occurred, within ${formData.cargoClaimEventDays ? formData.cargoClaimEventDays : "___"} days from the date of the event giving rise to the claim.`);
    addText("5.2 The Carrier shall be liable only for loss or damage arising from its negligent performance of the Services, provided that the claim is made within the prescribed time.");
    addText("5.3 The Carrier shall not, in any event, be liable for consequential, special, or economic losses, including but not limited to loss of profit, business interruption, or loss of goodwill, beyond the actual value of the goods lost or damaged.");

    addText("");
    addText("6. RELATIONSHIP OF THE PARTIES", 12, true);
    addText("6.1 The Carrier is and shall at all times remain an independent contractor, and nothing in this Contract shall be construed to create any employer–employee, principal–agent, or partnership relationship between the Parties.");
    addText("6.2 The Carrier shall be solely responsible for the procurement, operation, and maintenance of vehicles, and for the recruitment, employment, training, supervision, and control of its drivers, operators, and other personnel.");

    addText("");
    addText("7. CONFIDENTIALITY", 12, true);
    addText("7.1 The Carrier undertakes that it shall not, without the prior written consent of the Recipient, disclose, communicate, or make use of any proprietary, confidential, or trade information belonging to the Recipient for its own benefit or for the benefit of any third party, during or after the term of this Contract.");

    addText("");
    addText("8. INDEMNIFICATION", 12, true);
    addText("8.1 The Carrier hereby agrees to indemnify, defend, and hold harmless the Recipient, its officers, employees, and agents from and against any and all claims, actions, losses, liabilities, damages, costs, expenses, or judgments (including reasonable attorney fees) arising directly or indirectly from:");
    addText("(a) the acts, omissions, or negligence of the Carrier, its employees, agents, or subcontractors; and");
    addText("(b) any breach of this Contract or violation of applicable laws by the Carrier.");

    addText("");
    addText("9. DEFAULT", 12, true);
    addText("9.1 Each of the following events shall constitute a material default under this Contract:");
    addText("(a) Failure to make any payment when due;");
    addText("(b) Insolvency, bankruptcy, or liquidation of either Party;");
    addText("(c) The subjection of any property of either Party to levy, attachment, or assignment for the benefit of creditors; or");
    addText("(d) Failure to perform or deliver the Services in the manner and within the time stipulated in this Contract.");

    addText("");
    addText("10. REMEDIES AND ARBITRATION", 12, true);
    addText("10.1 Termination for Default: In the event of a material default, the non-defaulting Party may, upon written notice, terminate this Contract and pursue such remedies as are available in law or equity.");
    addText("10.2 Agreement to Arbitrate:");
    addText("Any dispute, controversy, or claim arising out of or relating to this Contract, including but not limited to its formation, validity, interpretation, performance, breach, or termination (collectively, a “Dispute”), shall be finally resolved by binding arbitration under the Commercial Arbitration Rules of the American Arbitration Association (AAA), as in effect on the date of the arbitration demand.");
    addText("10.3 Governing Law and Seat:");
    addText("The arbitration shall be governed by and conducted pursuant to the  Arbitration Act. The seat and venue of arbitration shall be [City, State], unless otherwise mutually agreed. The arbitration shall be conducted in the English language.");
    addText("10.4 Arbitrator Appointment and Powers:");
    addText("(a) The arbitration shall be conducted before one (1) neutral arbitrator mutually agreed by the Parties, or, if the Parties cannot agree, appointed by the AAA. In complex or high-value disputes, either Party may request a three-member panel, appointed pursuant to AAA procedures.");
    addText("(b) The arbitrator(s) shall have full authority to determine the arbitrability of any issue, to award monetary damages, specific performance, injunctive relief, and other equitable remedies, and to allocate arbitration costs, including attorneys’ fees, in accordance with applicable law.");
    addText("10.5 Procedure and Evidence:");
    addText("(a) Each Party shall be afforded a reasonable opportunity to present evidence, documents, and witnesses, and to cross-examine opposing witnesses.");
    addText("(b) Discovery shall be limited to what the arbitrator deems necessary for a fair and efficient resolution, including depositions and document production.");
    addText("10.6 Interim Relief:");
    addText("Nothing in this clause shall prevent either Party from seeking temporary or preliminary injunctive relief in a court of competent jurisdiction to protect its rights pending arbitration.");
    addText("10.7 Award and Enforcement:");
    addText("(a) The arbitral award shall be final, conclusive, and binding on both Parties.");
    addText("(b) Judgment on the award may be entered in any federal or state court having jurisdiction over the Parties or their assets.");
    addText("(c) The Parties expressly waive any right to appeal or judicial review of the arbitral award except as provided under the Federal Arbitration Act.");
    addText("10.8 Confidentiality:");
    addText("All arbitration proceedings, including documents, testimony, and awards, shall be treated as strictly confidential and may not be disclosed to third parties except as necessary to enforce or challenge the award in court.");
    addText("10.9 Costs:");
    addText("Unless otherwise determined by the arbitrator, each Party shall bear its own attorney’s fees and costs, and the administrative and arbitrator fees shall be shared equally.");
    addText("10.10 Survival:");
    addText("This arbitration clause shall survive the termination or expiration of this Contract and continue to bind the Parties with respect to any disputes arising from or related to this Contract.");

    addText("");
    addText("11. FORCE MAJEURE", 12, true);
    addText("11.1 Neither Party shall be deemed to be in breach of this Contract for failure to perform its obligations where such failure results from Force Majeure events beyond the reasonable control of the affected Party, including but not limited to acts of God, epidemic, pandemic, fire, explosion, flood, civil commotion, war, act of terrorism, labour strike, or government restriction.");
    addText("11.2 The affected Party shall notify the other Party in writing within a reasonable time of the occurrence and expected duration of the Force Majeure event.");

    addText("");
    addText("12. MISCELLANEOUS PROVISIONS", 12, true);
    addText("12.1 Attorneys’ Fees: In any litigation, arbitration, or proceeding arising under this Contract, the prevailing Party shall be entitled to recover its reasonable attorneys’ fees and costs incurred.");
    addText("12.2 Amendments: This Contract may only be amended, modified, or supplemented by a written instrument duly executed by both Parties.");
    addText("12.3 Entire Agreement: This Contract constitutes the entire agreement between the Parties and supersedes all prior or contemporaneous oral or written understandings or agreements relating to its subject matter.");
    addText("12.4 Severability: If any provision of this Contract is declared invalid or unenforceable by a court or tribunal of competent jurisdiction, the remaining provisions shall continue in full force and effect.");
    addText("12.5 Governing Law: This Contract shall be governed by and construed in accordance with the laws of the State of " + (formData.governingLawState || "[State]") + ", without regard to its conflict of law principles.");

    addText("");
    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the day and year first written above.");
    addText("For and on behalf of the Recipient");
    addText(`Signature: ___________________________`);
    addText(`Name: ${formData.recipientSignatoryName || "____________________________"}`);
    addText(`Designation: ${formData.recipientDesignation || "________________________"}`);
    addText(`Date: ${formData.recipientSignatureDate || "________________"}`);

    addText("For and on behalf of the Carrier");
    addText(`Signature: ___________________________`);
    addText(`Name: ${formData.carrierSignatoryName || "____________________________"}`);
    addText(`Designation: ${formData.carrierDesignation || "________________________"}`);
    addText(`Date: ${formData.carrierSignatureDate || "________________"}`);

    // Save file
    doc.save("Trucking_Contract.pdf");
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

              <h4 className="font-medium">Recipient Information</h4>
              <Label>Recipient Name</Label>
              <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />
              <Label>Recipient Address</Label>
              <textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />

              <hr />

              <h4 className="font-medium">Carrier Information</h4>
              <Label>Carrier Name</Label>
              <Input name="carrierName" value={formData.carrierName} onChange={handleChange} />
              <Label>Carrier Address</Label>
              <textarea name="carrierAddress" value={formData.carrierAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term & Termination / Claims</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Termination Day</Label>
                  <Input name="terminationDay" value={formData.terminationDay} onChange={handleChange} placeholder="___" />
                </div>
                <div>
                  <Label>Termination Month</Label>
                  <Input name="terminationMonth" value={formData.terminationMonth} onChange={handleChange} placeholder="_______" />
                </div>
                <div>
                  <Label>Termination Year</Label>
                  <Input name="terminationYear" value={formData.terminationYear} onChange={handleChange} placeholder="20" />
                </div>
              </div>

              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} placeholder="___" />

              <hr />

              <h4 className="font-medium">Freight Loss or Damage Notice Periods</h4>
              <Label>Days from delivery to submit claim</Label>
              <Input name="cargoClaimDeliveryDays" value={formData.cargoClaimDeliveryDays} onChange={handleChange} placeholder="___" />
              <Label>Days from event to submit claim (if not delivered)</Label>
              <Input name="cargoClaimEventDays" value={formData.cargoClaimEventDays} onChange={handleChange} placeholder="___" />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Arbitration & Governing Law</h3>
              <Label>Arbitration City</Label>
              <Input name="arbitrationCity" value={formData.arbitrationCity} onChange={handleChange} />
              <Label>Arbitration State</Label>
              <Input name="arbitrationState" value={formData.arbitrationState} onChange={handleChange} />
              <Label>Governing Law (State)</Label>
              <Input name="governingLawState" value={formData.governingLawState} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Recipient Signature Block</h3>
              <Label>Recipient Signatory Name</Label>
              <Input name="recipientSignatoryName" value={formData.recipientSignatoryName} onChange={handleChange} />
              <Label>Recipient Designation</Label>
              <Input name="recipientDesignation" value={formData.recipientDesignation} onChange={handleChange} />
              <Label>Recipient Signature Date</Label>
              <Input name="recipientSignatureDate" value={formData.recipientSignatureDate} onChange={handleChange} />

              <hr />

              <h3 className="font-semibold">Carrier Signature Block</h3>
              <Label>Carrier Signatory Name</Label>
              <Input name="carrierSignatoryName" value={formData.carrierSignatoryName} onChange={handleChange} />
              <Label>Carrier Designation</Label>
              <Input name="carrierDesignation" value={formData.carrierDesignation} onChange={handleChange} />
              <Label>Carrier Signature Date</Label>
              <Input name="carrierSignatureDate" value={formData.carrierSignatureDate} onChange={handleChange} />
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
