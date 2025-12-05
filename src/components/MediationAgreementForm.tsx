import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  partyA: string;
  partyB: string;
  relationshipStartDate: string;
  originalContractTitle: string;
  originalContractDate: string;
  mediatorName: string;
  effectiveDate: string;
  jurisdiction: string;
  terminationQuietDays: string; // e.g., 21
  costsArrangement: string;
  signPartyAName: string;
  signPartyADate: string;
  signPartyBName: string;
  signPartyBDate: string;
  signMediatorName: string;
  signMediatorDate: string;
}

export default function MediationAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    partyA: "",
    partyB: "",
    relationshipStartDate: "",
    originalContractTitle: "",
    originalContractDate: "",
    mediatorName: "",
    effectiveDate: "",
    jurisdiction: "",
    terminationQuietDays: "21",
    costsArrangement: "Each party bears its own costs",
    signPartyAName: "",
    signPartyADate: "",
    signPartyBName: "",
    signPartyBDate: "",
    signMediatorName: "",
    signMediatorDate: "",
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

    write("MEDIATION AGREEMENT", 14, true, true);
    write("\n");

    write(`This Mediation Agreement (\"Agreement\") is made and entered into on the ${formData.effectiveDate || "___ day of ________"} (the \"Effective Date\"), by and between:`);
    write(`${formData.partyA || "____________________"}, and ${formData.partyB || "____________________"}, hereinafter collectively referred to as the \"Parties\" and individually as a \"Party.\"`);

    write("\n");
    write("RECITALS", 12, true);
    write("WHEREAS, the Parties entered into a business relationship commencing on " + (formData.relationshipStartDate || "__________") + ", pursuant to the terms of that certain contract titled " + (formData.originalContractTitle || "____________________") + " (the \"Original Contract\"), attached hereto as Exhibit A and incorporated herein by reference;");
    write("WHEREAS, disputes and differences have arisen between the Parties regarding the Original Contract;");
    write("WHEREAS, the Parties recognize that litigation before a court of law is time-consuming, costly, and adversarial in nature; and");
    write("WHEREAS, the Parties have mutually appointed " + (formData.mediatorName || "__________________") + " as their mediator (the \"Mediator\"), who has accepted the appointment subject to disclosure of any actual or potential conflicts of interest.");

    write("\n");
    write("NOW, THEREFORE, in consideration of the foregoing recitals and the mutual covenants contained herein, the Parties agree as follows:", 11, false);

    write("\n");
    write("I. DUTIES OF THE MEDIATOR", 12, true);
    write("1. Self-Determination of the Parties");
    write("The Mediator shall conduct the mediation in accordance with the principle of party self-determination, whereby any settlement shall result from the voluntary, uncoerced, and informed decision of the Parties.");

    write("2. Ex-Parte Communications");
    write("The Mediator may, in their discretion, conduct private meetings or engage in separate communications with either Party and/or their representatives before, during, or after scheduled mediation sessions.");

    write("3. Exchange of Information");
    write("The Parties shall exchange all documents reasonably necessary for consideration of the dispute. The Mediator may request the submission of memoranda or additional information. Any materials intended to remain confidential may be submitted solely to the Mediator.");

    write("4. Facilitation Role Only");
    write("The Mediator has no authority to impose or issue a settlement. The Mediator’s role is limited to facilitating discussion and encouraging a mutually satisfactory resolution.");

    write("5. No Decision-Making Authority");
    write("The Mediator shall not serve as an arbitrator, adjudicator, or decision-maker and shall not provide legal representation to either Party.");

    write("6. Continuing Efforts");
    write("If a full settlement is not reached during the mediation conference, the Mediator may continue to communicate with the Parties in an effort to facilitate resolution.");

    write("7. Scheduling");
    write("The Mediator shall determine the date, time, and place of mediation sessions, and the Parties shall cooperate in good faith by attending as scheduled.");

    write("8. Submission of Statements and Evidence");
    write("The Mediator may direct the Parties to submit statements of claim, legal submissions, defenses, and supporting documents.");

    write("9. Representation");
    write("Each Party may appear with legal counsel duly authorized to negotiate and conclude a settlement. Any Party may elect to appear pro se (without representation).");

    write("10. Confidentiality of Proceedings");
    write("Mediation sessions and related communications shall be private and confidential. Attendance shall be limited to the Parties and their representatives, unless otherwise agreed by the Parties and approved by the Mediator.");

    write("\n");
    write("II. CONFIDENTIALITY AND PRIVILEGE", 12, true);
    write("1. Confidential Nature of Mediation");
    write("All oral and written communications made in the course of the mediation, including offers, admissions, statements, proposals, and documents exchanged, shall be strictly confidential.");

    write("2. Inadmissibility in Subsequent Proceedings");
    write("No mediation communications, whether oral or written, shall be admissible in any subsequent litigation, arbitration, or administrative proceeding, except to the extent necessary to enforce a settlement agreement reached as a result of the mediation.");

    write("3. Mediator’s Protection");
    write("The Mediator shall not be called as a witness in any judicial, arbitral, or administrative proceeding relating to the subject matter of the mediation. The Mediator shall have immunity from any subpoena or discovery process relating to the mediation.");

    write("4. Exceptions");
    write("Confidentiality shall not apply to:");
    write("(i) communications necessary to prove the existence, validity, or terms of a settlement agreement reached in mediation;");
    write("(ii) disclosures required by law, regulation, or court order; or");
    write("(iii) information independently available to a Party outside the mediation process.");

    write("\n");
    write("III. TERMINATION", 12, true);
    write("The mediation shall be deemed terminated upon the earliest occurrence of any of the following:");
    write("i. The execution of a written settlement agreement by the Parties;");
    write("ii. A declaration by the Mediator, in writing or verbally, that further mediation efforts would not be productive;");
    write("iii. A declaration by all Parties, in writing or verbally, that the mediation proceedings are terminated; or");
    write("iv. A period of " + (formData.terminationQuietDays || "21") + " consecutive days following the conclusion of the last mediation session during which there has been no communication between the Mediator and any Party or Party’s representative.");

    write("\n");
    write("IV. COSTS AND EXPENSES", 12, true);
    write("1. Each Party shall bear its own costs and expenses in connection with the mediation, unless otherwise mutually agreed in writing.");
    write("2. The expenses of any additional participants requested by a Party shall be borne solely by the requesting Party.");

    write("\n");
    write("V. GOVERNING LAW AND JURISDICTION", 12, true);
    write("1. This Agreement shall be governed by, and construed in accordance with, the laws of " + (formData.jurisdiction || "[insert jurisdiction]") + ", without regard to its conflict of law principles.");
    write("2. The Parties agree that any legal action seeking to enforce the terms of this Agreement, or any settlement reached pursuant to it, shall be brought exclusively before the courts of " + (formData.jurisdiction || "[insert jurisdiction/city/country]") + ", which shall have subject-matter jurisdiction and personal jurisdiction over the Parties.");

    write("\n");
    write("SIGNATURES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Mediation Agreement as of the Effective Date.");
    write("\n");
    write(`${formData.partyA || "[Name of Party A]"}`);
    write("Date: " + (formData.signPartyADate || "______________________"));
    write("\n");
    write(`${formData.partyB || "[Name of Party B]"}`);
    write("Date: " + (formData.signPartyBDate || "______________________"));
    write("\n");
    write(`${formData.mediatorName || "[Name of Mediator]"}`);
    write("Date: " + (formData.signMediatorDate || "______________________"));

    doc.save("Mediation_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Recitals</h3>
              </div>
              <Label>Party A (Name)</Label>
              <Input name="partyA" value={formData.partyA} onChange={handleChange} />
              <Label>Party B (Name)</Label>
              <Input name="partyB" value={formData.partyB} onChange={handleChange} />
              <Label>Relationship Commencement Date</Label>
              <Input name="relationshipStartDate" value={formData.relationshipStartDate} onChange={handleChange} />
              <Label>Original Contract Title</Label>
              <Input name="originalContractTitle" value={formData.originalContractTitle} onChange={handleChange} />
              <Label>Original Contract Date</Label>
              <Input name="originalContractDate" value={formData.originalContractDate} onChange={handleChange} />
              <Label>Mediator Name</Label>
              <Input name="mediatorName" value={formData.mediatorName} onChange={handleChange} />
              <Label>Effective Date (Agreement Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Mediation Duties & Confidentiality</h3>
              <Label>Termination Quiet Period (days)</Label>
              <Input name="terminationQuietDays" value={formData.terminationQuietDays} onChange={handleChange} />
              <Label>Costs Arrangement</Label>
              <Input name="costsArrangement" value={formData.costsArrangement} onChange={handleChange} />
              <Label>Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Party A - Signatory Name</Label>
              <Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} />
              <Label>Party A - Date</Label>
              <Input name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} />

              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Party B - Date</Label>
              <Input name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} />

              <Label>Mediator - Name</Label>
              <Input name="signMediatorName" value={formData.signMediatorName} onChange={handleChange} />
              <Label>Mediator - Date</Label>
              <Input name="signMediatorDate" value={formData.signMediatorDate} onChange={handleChange} />
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
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
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
            <div className="text-green-600 font-semibold">Mediation Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
