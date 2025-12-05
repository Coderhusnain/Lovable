import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  partnerAName: string;
  partnerAAddress: string;
  partnerBName: string;
  partnerBAddress: string;
  effectiveDate: string;
  projectName: string;
  purposeSummary: string;
  partnerAServices: string;
  partnerBServices: string;
  resourcesA: string;
  resourcesB: string;
  communicationStrategy: string;
  liabilityClause: string;
  disputeGroupMembers: string;
  termStart: string;
  termEnd: string;
  governingLaw: string;
  noticeAddressA: string;
  noticeAddressB: string;
  additionalClauses: string;
  signPartnerAName: string;
  signPartnerADate: string;
  signPartnerBName: string;
  signPartnerBDate: string;
}

export default function MOUForm() {
  const [formData, setFormData] = useState<FormData>({
    partnerAName: "",
    partnerAAddress: "",
    partnerBName: "",
    partnerBAddress: "",
    effectiveDate: "",
    projectName: "",
    purposeSummary: "",
    partnerAServices: "",
    partnerBServices: "",
    resourcesA: "",
    resourcesB: "",
    communicationStrategy: "",
    liabilityClause: "No liability shall arise between the Partners as a result of this Memorandum.",
    disputeGroupMembers: "CEO of Partner A; CEO of Partner B; Independent representative",
    termStart: "",
    termEnd: "",
    governingLaw: "",
    noticeAddressA: "",
    noticeAddressB: "",
    additionalClauses: "Non-binding; Termination by written notice; Assignment requires consent; Amendment in writing; Severability; Supersession.",
    signPartnerAName: "",
    signPartnerADate: "",
    signPartnerBName: "",
    signPartnerBDate: "",
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

    write("MEMORANDUM OF UNDERSTANDING (MOU)", 14, true, true);
    write("\n");

    write(`This Memorandum of Understanding (the \"Memorandum\") is made and entered into on ${formData.effectiveDate || "[date]"}, by and between ${formData.partnerAName || "[Partner A]"}, having its principal office at ${formData.partnerAAddress || "[address]"} (\"Partner A\"), and ${formData.partnerBName || "[Partner B]"}, having its principal office at ${formData.partnerBAddress || "[address]"} (\"Partner B\").`);

    write("\n");
    write("RECITALS", 12, true);
    write(`WHEREAS, the Partners desire to enter into an understanding pursuant to which they shall collaborate, coordinate, and cooperate in connection with the Project;`);
    write(`AND WHEREAS, the Partners intend through this Memorandum to set forth their working arrangements and mutual expectations in preparation for the negotiation of any future binding agreement regarding the Project;`);

    write("\n");
    write("1. Purpose", 12, true);
    write(formData.purposeSummary || "The purpose of this Memorandum is to establish the framework for any future binding agreement between the Partners with respect to the Project.");

    write("\n");
    write("2. Obligations of the Partners", 12, true);
    write("The Partners acknowledge that this Memorandum does not create a legally binding contract, but each Partner agrees to act in the spirit of collaboration, demonstrating leadership, financial commitment, administrative diligence, and managerial support.");
    write("2.1 Services to be Rendered:");
    write(`Partner A: ${formData.partnerAServices || "[Partner A services]"}`);
    write(`Partner B: ${formData.partnerBServices || "[Partner B services]"}`);

    write("\n");
    write("3. Cooperation", 12, true);
    write("The Partners agree to cooperate fully in the execution of the Project, including collaborative planning, coordination of resources, and participation in relevant Project meetings and activities.");

    write("\n");
    write("4. Resources", 12, true);
    write(`Partner A shall provide: ${formData.resourcesA || "[financial, material, labor resources]"}`);
    write(`Partner B shall provide: ${formData.resourcesB || "[financial, material, labor resources]"}`);

    write("\n");
    write("5. Communication Strategy", 12, true);
    write(formData.communicationStrategy || "All communications, marketing, and public relations activities shall be consistent with the objectives of the Project and require the prior express agreement of both Partners.");

    write("\n");
    write("6. Liability", 12, true);
    write(formData.liabilityClause || "No liability shall arise between the Partners as a result of this Memorandum.");

    write("\n");
    write("7. Dispute Resolution", 12, true);
    write("In the event of any dispute during negotiation of a binding agreement relating to the Project:");
    write(`Dispute Resolution Group members: ${formData.disputeGroupMembers || "[CEO A; CEO B; Independent representative]"}`);
    write("Decisions made by the Dispute Resolution Group shall be final and binding. If no resolution is reached, neither Partner shall be obligated to enter into any binding contract.");

    write("\n");
    write("8. Term", 12, true);
    write(`The term of this Memorandum shall commence on ${formData.termStart || "[start date]"} and continue until ${formData.termEnd || "[end date]"}, unless extended by mutual written agreement of all Partners.`);

    write("\n");
    write("9. Notice", 12, true);
    write(`Any notice shall be delivered to:\nPartner A: ${formData.noticeAddressA || formData.partnerAAddress || "[address]"}\nPartner B: ${formData.noticeAddressB || formData.partnerBAddress || "[address]"}`);

    write("\n");
    write("10. Governing Law", 12, true);
    write(`This Memorandum shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[State]"}.`);

    write("\n");
    write("11. Additional Clauses", 12, true);
    write(formData.additionalClauses || "Non-binding; Termination by written notice; Assignment requires consent; Amendment in writing; Severability; Supersession.");

    write("\n");
    write("12. Understanding Between Partners", 12, true);
    write("Each Partner shall work collaboratively to advance the Project. This Memorandum does not restrict the Partners from entering into similar arrangements with other entities.");

    write("\n");
    write("13. Signatories", 12, true);
    write("IN WITNESS WHEREOF, the Partners have executed this Memorandum of Understanding as of the date first written above.");
    write(`Partner A: ${formData.partnerAName || "[Partner A]"}`);
    write(`Name/Title: ${formData.signPartnerAName || "[Name]"}    Date: ${formData.signPartnerADate || "[date]"}`);
    write(`\nPartner B: ${formData.partnerBName || "[Partner B]"}`);
    write(`Name/Title: ${formData.signPartnerBName || "[Name]"}    Date: ${formData.signPartnerBDate || "[date]"}`);

    doc.save("MOU.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Partners & Project</h3>
              <Label>Partner A - Name</Label>
              <Input name="partnerAName" value={formData.partnerAName} onChange={handleChange} />
              <Label>Partner A - Address</Label>
              <Textarea name="partnerAAddress" value={formData.partnerAAddress} onChange={handleChange} />

              <Label>Partner B - Name</Label>
              <Input name="partnerBName" value={formData.partnerBName} onChange={handleChange} />
              <Label>Partner B - Address</Label>
              <Textarea name="partnerBAddress" value={formData.partnerBAddress} onChange={handleChange} />

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Project Name / Summary</Label>
              <Textarea name="projectName" value={formData.projectName} onChange={handleChange} />

              <Label>Purpose Summary</Label>
              <Textarea name="purposeSummary" value={formData.purposeSummary} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services, Resources & Governance</h3>
              <Label>Partner A - Services</Label>
              <Textarea name="partnerAServices" value={formData.partnerAServices} onChange={handleChange} />

              <Label>Partner B - Services</Label>
              <Textarea name="partnerBServices" value={formData.partnerBServices} onChange={handleChange} />

              <Label>Partner A - Resources</Label>
              <Textarea name="resourcesA" value={formData.resourcesA} onChange={handleChange} />

              <Label>Partner B - Resources</Label>
              <Textarea name="resourcesB" value={formData.resourcesB} onChange={handleChange} />

              <Label>Communication Strategy</Label>
              <Textarea name="communicationStrategy" value={formData.communicationStrategy} onChange={handleChange} />

              <Label>Dispute Resolution Group Members</Label>
              <Input name="disputeGroupMembers" value={formData.disputeGroupMembers} onChange={handleChange} />

              <Label>Term Start</Label>
              <Input name="termStart" value={formData.termStart} onChange={handleChange} />
              <Label>Term End</Label>
              <Input name="termEnd" value={formData.termEnd} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label>Additional Clauses</Label>
              <Textarea name="additionalClauses" value={formData.additionalClauses} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Notices & Signatories</h3>
              <Label>Notice Address - Partner A</Label>
              <Textarea name="noticeAddressA" value={formData.noticeAddressA} onChange={handleChange} />
              <Label>Notice Address - Partner B</Label>
              <Textarea name="noticeAddressB" value={formData.noticeAddressB} onChange={handleChange} />

              <Label>Partner A - Signatory Name & Title</Label>
              <Input name="signPartnerAName" value={formData.signPartnerAName} onChange={handleChange} />
              <Label>Partner A - Sign Date</Label>
              <Input name="signPartnerADate" value={formData.signPartnerADate} onChange={handleChange} />

              <Label>Partner B - Signatory Name & Title</Label>
              <Input name="signPartnerBName" value={formData.signPartnerBName} onChange={handleChange} />
              <Label>Partner B - Sign Date</Label>
              <Input name="signPartnerBDate" value={formData.signPartnerBDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">MOU PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
