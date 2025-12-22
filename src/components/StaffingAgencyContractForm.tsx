import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  recipientName: string;
  recipientLocation: string;
  providerName: string;
  providerLocation: string;
  servicesDescription: string;
  tempStaffRate: string;
  transferFee: string;
  permanentStaffFee: string;
  paymentDueDays: string;
  providerRepresentation: string;
  injuriesNotes: string;
  indemnificationNotes: string;
  limitationNotes: string;
  attorneysFeesNotes: string;
  entireContractText: string;
  severabilityText: string;
  amendmentText: string;
  waiverText: string;
  applicableLaw: string;
  termTerminationDate: string;
  earlyTerminationNoticeDays: string;
  relationshipNotes: string;
  adrNotes: string;
  confidentialityNotes: string;
  recipientSignName: string;
  recipientSignDate: string;
  providerSignName: string;
  providerSignDate: string;
}

export default function StaffingAgencyContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    recipientName: "",
    recipientLocation: "",
    providerName: "",
    providerLocation: "",
    servicesDescription: "",
    tempStaffRate: "",
    transferFee: "",
    permanentStaffFee: "",
    paymentDueDays: "",
    providerRepresentation: "",
    injuriesNotes: "",
    indemnificationNotes: "",
    limitationNotes: "",
    attorneysFeesNotes: "",
    entireContractText: "",
    severabilityText: "",
    amendmentText: "",
    waiverText: "",
    applicableLaw: "",
    termTerminationDate: "",
    earlyTerminationNoticeDays: "",
    relationshipNotes: "",
    adrNotes: "",
    confidentialityNotes: "",
    recipientSignName: "",
    recipientSignDate: "",
    providerSignName: "",
    providerSignDate: "",
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

    // Verbatim Staffing Agency Contract with field substitutions
    write("STAFFING AGENCY CONTRACT", 14, true, true);
    write("This Staffing Agency Contract (“Contract”) is made effective as of " + (formData.effectiveDate || "___") + ", by and between " + (formData.recipientName || "___") + " of " + (formData.recipientLocation || "___, ___") + " (“Recipient”), and " + (formData.providerName || "___") + " of " + (formData.providerLocation || "___, ___") + " (“Service Provider”)." );

    write("\n");
    write("1. DESCRIPTION OF SERVICES", 12, true);
    write("Beginning on " + (formData.effectiveDate || "___") + " (“Effective Date”), the Service Provider will submit to the Recipient the names and resumes of qualified candidates (“Candidates”) for the position with the skills and educational background described as follows (collectively, the “Services”):");
    write(formData.servicesDescription || "_________.");

    write("\n");
    write("2. PAYMENT FOR SERVICES", 12, true);
    write("For Services provided by the Service Provider under this Contract, the Service Provider shall be compensated as follows:");
    write("•Temporary Staff: $" + (formData.tempStaffRate || "__") + " per staff for the period of service");
    write("•Transfer Fee: $" + (formData.transferFee || "__") + " shall be paid if a temporary employee is taken on a permanent basis");
    write("•Permanent Staff: $" + (formData.permanentStaffFee || "__") + " shall be paid for the appointment of each permanent staff member");
    write("Invoices will be submitted to the Recipient by the Service Provider on a monthly basis, with payment to the Service Provider to be made within " + (formData.paymentDueDays || "____") + " business days of receipt of a valid invoice.");

    write("\n");
    write("3. SERVICE PROVIDER’S REPRESENTATION", 12, true);
    write((formData.providerRepresentation && formData.providerRepresentation + "") || "The Service Provider represents and warrants that the Service Provider and its supplied workers have the right to perform the Services under and pursuant to this Contract without violation of obligations to others, and that the Service Provider and its supplied workers have the right to disclose to the Recipient all information transmitted to the Recipient in the performance of the Services under and pursuant to this Contract. The Service Provider agrees that any information submitted to the…");

    write("\n");
    write("4. INJURIES", 12, true);
    write((formData.injuriesNotes && formData.injuriesNotes + "") || "The Service Provider acknowledges the Service Provider’s obligation to obtain appropriate insurance coverage for the benefit of the Service Provider (and the Service Provider’s employees, if any). The Service Provider waives any rights to recovery from the Recipient for any injuries that the Service Provider (and/or the Service Provider’s employees) may sustain while performing Services under this Contract and that are a result of the negligence of the Service Provider or the Service Provider’s employees.");

    write("\n");
    write("5. INDEMNIFICATION", 12, true);
    write((formData.indemnificationNotes && formData.indemnificationNotes + "") || "The Service Provider agrees to indemnify and hold harmless the Recipient from all claims, losses, expenses, fees, including attorney fees, costs, and judgments that may be asserted against the Recipient that result from the acts or omissions of the Service Provider, the Service Provider’s employees, if any, and the Service Provider’s agents.");

    write("6. LIMITATION OF LIABILITY", 12, true);
    write((formData.limitationNotes && formData.limitationNotes + "") || "Under no circumstance shall either party be liable to the other party or any third party for indirect, incidental, consequential, special or exemplary damages (even if that party has been advised of the possibility of such damages), arising from any provision of this Contract such as, but not limited to, loss of revenue or anticipated profit or lost business, cost of delay or failure of delivery, or liabilities to third parties arising from any source.");

    write("\n");
    write("7. ATTORNEYS’ FEES", 12, true);
    write((formData.attorneysFeesNotes && formData.attorneysFeesNotes + "") || "If a legal suit, action, or proceeding, including arbitration, is brought by any party to enforce or to interpret any provision of this Contract, the prevailing party will be entitled to recover, in addition to any other damages awarded, all costs associated with conducting the suit, action, proceeding, or arbitration and reasonable attorneys’ fees.");

    write("\n");
    write("8. ENTIRE CONTRACT", 12, true);
    write((formData.entireContractText && formData.entireContractText + "") || "This Contract contains the entire agreement of the parties with respect to the subject matter contained herein. No other promises, warranties, representations, agreements, or understandings, whether oral or written, exist concerning this subject matter. This Contract supersedes any previous or simultaneous oral or written promises, warranties, representations, agreements, or conditions between the parties.");

    write("\n");
    write("9. SEVERABILITY", 12, true);
    write((formData.severabilityText && formData.severabilityText + "") || "If any provision of this Contract shall be held to be invalid or unenforceable for any reason, the remaining provisions shall continue to be valid and enforceable. If a court finds that any provision of this Contract is invalid or unenforceable, but that by limiting such provision it would become valid and enforceable, then such provision shall be deemed to be written, construed, and… (as limited).");

    write("\n");
    write("10. AMENDMENT", 12, true);
    write((formData.amendmentText && formData.amendmentText + "") || "This Contract may be modified, amended, or supplemented only if the changes are made in writing and signed by all parties.");

    write("\n");
    write("11. WAIVER", 12, true);
    write((formData.waiverText && formData.waiverText + "") || "The failure of either party to enforce any provision of this Contract shall not be construed as a waiver or limitation of that party’s right to subsequently enforce and compel strict compliance with every provision of this Contract.");

    write("\n");
    write("12. APPLICABLE LAW", 12, true);
    write("This Contract shall be governed by the laws of " + (formData.applicableLaw || "____") + ".");

    write("\n");
    write("13. TERM", 12, true);
    write("This Contract will begin on the Effective Date and shall remain in effect until completion of the Services (“Termination Date”), unless terminated earlier as outlined in the Termination section below. Either party may alter the Termination Date by mutual written consent.");

    write("\n");
    write("14. TERMINATION", 12, true);
    write("Either party may end this Contract prior to the Termination Date, with or without cause, upon " + (formData.earlyTerminationNoticeDays || "____") + " days’ written notice to the other party (“Early Termination”). Upon Early Termination, the Provider shall receive a pro-rated payment for the Services rendered prior to the Early Termination Date.");

    write("\n");
    write("15. RELATIONSHIP OF PARTIES", 12, true);
    write((formData.relationshipNotes && formData.relationshipNotes + "") || "The Service Provider is an independent contractor with respect to its relationship to the Recipient. Neither the Service Provider nor the Service Provider’s employees is or shall be deemed for any purpose to be employees of the Recipient. The Recipient shall not be responsible to the Service Provider or the Service Provider’s employees, or any governing body for any payroll taxes related to the performance of the Services. Upon request, the Service Provider will provide evidence of appropriate insurance coverage for workers’ compensation and general liability insurance.");

    write("\n");
    write("16. ALTERNATIVE DISPUTE RESOLUTION", 12, true);
    write((formData.adrNotes && formData.adrNotes + "") || "The parties will attempt to resolve any dispute arising out of or relating to this Contract through friendly negotiations among the parties. If the matter is not resolved by negotiation, the parties will resolve the dispute using the following Alternative Dispute Resolution (“ADR”) procedure. If any controversies, claims, or disputes arising out of or relating to this Contract cannot be resolved through negotiation, the parties agree to try in good faith to settle the dispute by mediation in accordance with any statutory rules of mediation.");

    write("\n");
    write("17. CONFIDENTIALITY", 12, true);
    write((formData.confidentialityNotes && formData.confidentialityNotes + "") || "The Service Provider will not, at any time or in any manner, either directly or indirectly, use for the personal benefit of the Service Provider, or divulge, disclose, or communicate in any manner any information that is proprietary to the Recipient. The Service Provider will protect such information and treat it as strictly confidential. This provision shall continue to be effective after the termination of this Contract.");
    write("Upon termination of this Contract, the Service Provider will return to the Recipient all records, notes, documentation, and other items that were used, created, or controlled by the Service Provider during the term of this Contract.");

    write("\n");
    write("18. SIGNATURES", 12, true);
    write("This Contract shall be signed by " + (formData.recipientName || "___") + ", and by " + (formData.providerName || "___") + ", and effective as of the date first above written.");
    write("The Recipient:");
    write("_________________________\u2003\u2003Date: " + (formData.recipientSignDate || "____"));
    write("The Provider:");
    write("_________________________\u2003\u2003Date: " + (formData.providerSignDate || "____"));

    doc.save("Staffing_Agency_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Recipient - Name</Label>
              <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />
              <Label>Recipient - Location</Label>
              <Input name="recipientLocation" value={formData.recipientLocation} onChange={handleChange} />

              <Label className="pt-2">Service Provider - Name</Label>
              <Input name="providerName" value={formData.providerName} onChange={handleChange} />
              <Label>Service Provider - Location</Label>
              <Input name="providerLocation" value={formData.providerLocation} onChange={handleChange} />

              <Label className="pt-2">Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Representation</h3>
              <Label>Temporary Staff - Rate</Label>
              <Input name="tempStaffRate" value={formData.tempStaffRate} onChange={handleChange} />

              <Label>Transfer Fee</Label>
              <Input name="transferFee" value={formData.transferFee} onChange={handleChange} />

              <Label>Permanent Staff - Fee</Label>
              <Input name="permanentStaffFee" value={formData.permanentStaffFee} onChange={handleChange} />

              <Label>Payment Due (business days)</Label>
              <Input name="paymentDueDays" value={formData.paymentDueDays} onChange={handleChange} />

              <Label className="pt-2">Service Provider's Representation (override)</Label>
              <Textarea name="providerRepresentation" value={formData.providerRepresentation} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Liability, ADR & Confidentiality</h3>
              <Label>Injuries / Insurance Notes</Label>
              <Textarea name="injuriesNotes" value={formData.injuriesNotes} onChange={handleChange} />

              <Label className="pt-2">Indemnification</Label>
              <Textarea name="indemnificationNotes" value={formData.indemnificationNotes} onChange={handleChange} />

              <Label className="pt-2">Limitation of Liability (override)</Label>
              <Textarea name="limitationNotes" value={formData.limitationNotes} onChange={handleChange} />

              <Label className="pt-2">Attorneys' Fees</Label>
              <Textarea name="attorneysFeesNotes" value={formData.attorneysFeesNotes} onChange={handleChange} />

              <Label className="pt-2">Entire Contract (override)</Label>
              <Textarea name="entireContractText" value={formData.entireContractText} onChange={handleChange} />

              <Label className="pt-2">Severability</Label>
              <Textarea name="severabilityText" value={formData.severabilityText} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term, ADR & Signatures</h3>
              <Label>Applicable Law</Label>
              <Input name="applicableLaw" value={formData.applicableLaw} onChange={handleChange} />

              <Label className="pt-2">Termination Date (if any)</Label>
              <Input type="date" name="termTerminationDate" value={formData.termTerminationDate} onChange={handleChange} />

              <Label>Early Termination Notice (days)</Label>
              <Input name="earlyTerminationNoticeDays" value={formData.earlyTerminationNoticeDays} onChange={handleChange} />

              <Label className="pt-2">Relationship of Parties (override)</Label>
              <Textarea name="relationshipNotes" value={formData.relationshipNotes} onChange={handleChange} />

              <Label className="pt-2">ADR Notes (override)</Label>
              <Textarea name="adrNotes" value={formData.adrNotes} onChange={handleChange} />

              <Label className="pt-2">Confidentiality (override)</Label>
              <Textarea name="confidentialityNotes" value={formData.confidentialityNotes} onChange={handleChange} />

              <hr />

              <Label>Recipient Signatory - Name</Label>
              <Input name="recipientSignName" value={formData.recipientSignName} onChange={handleChange} />
              <Label>Recipient Signatory - Date</Label>
              <Input type="date" name="recipientSignDate" value={formData.recipientSignDate} onChange={handleChange} />

              <hr />

              <Label>Provider Signatory - Name</Label>
              <Input name="providerSignName" value={formData.providerSignName} onChange={handleChange} />
              <Label>Provider Signatory - Date</Label>
              <Input type="date" name="providerSignDate" value={formData.providerSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Staffing Agency Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
