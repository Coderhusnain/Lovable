import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  firstPartyName: string;
  firstPartyEntity: string;
  firstPartyAddress: string;
  secondPartyName: string;
  secondPartyEntity: string;
  secondPartyAddress: string;
  originalContractTitle: string;
  originalContractDate: string;
  originalExpirationDate: string;
  newExpirationDate: string;
  amendedProvisions: string;
  severabilityClause: string;
  waiverClause: string;
  amendmentClause: string;
  counterpartsClause: string;
  signFirstName: string;
  signFirstTitle: string;
  signFirstDate: string;
  signSecondName: string;
  signSecondTitle: string;
  signSecondDate: string;
}

export default function ContractExtensionForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    firstPartyName: "",
    firstPartyEntity: "",
    firstPartyAddress: "",
    secondPartyName: "",
    secondPartyEntity: "",
    secondPartyAddress: "",
    originalContractTitle: "",
    originalContractDate: "",
    originalExpirationDate: "",
    newExpirationDate: "",
    amendedProvisions: "",
    severabilityClause:
      "If any provision is determined invalid, the remainder shall remain in full force and effect.",
    waiverClause:
      "Failure to enforce any provision shall not constitute a waiver of future enforcement rights.",
    amendmentClause:
      "This Extension may be modified only by a written instrument signed by all Parties.",
    counterpartsClause:
      "This Extension may be executed in counterparts; electronic signatures shall have the same effect as originals.",
    signFirstName: "",
    signFirstTitle: "",
    signFirstDate: "",
    signSecondName: "",
    signSecondTitle: "",
    signSecondDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // small helper to write text with line wrapping
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

    write(doc, state, "CONTRACT EXTENSION AGREEMENT", { size: 14, bold: true, center: true });
    write(doc, state, "\n");

    write(
      doc,
      state,
      `This Contract Extension Agreement (the “Extension”) is made and entered into as of ${formData.effectiveDate || "__________"} (the “Effective Date”), by and between ${formData.firstPartyName ||
        "[First Party]"} (${formData.firstPartyEntity || "[Entity]"}) with principal place of business at ${formData.firstPartyAddress || "[Address]"} (“First Party”), and ${formData.secondPartyName ||
        "[Second Party]"} (${formData.secondPartyEntity || "[Entity]"}) with principal place of business at ${formData.secondPartyAddress || "[Address]"} (“Second Party”).`
    );

    write(doc, state, "\nRECITALS", { size: 12, bold: true });
    write(
      doc,
      state,
      `WHEREAS, the Parties previously entered into a contract titled "${formData.originalContractTitle || "[Original Contract Title]"}" dated ${formData.originalContractDate ||
        "__________"} (the "Original Contract"); and WHEREAS, the Parties wish to extend and amend the Original Contract as set forth in this Extension.`
    );

    write(doc, state, "\n1. EXTENSION OF TERM", { size: 12, bold: true });
    write(
      doc,
      state,
      `1.1 The Original Contract was originally set to expire on ${formData.originalExpirationDate || "__________"}.`
    );
    write(
      doc,
      state,
      `1.2 The Parties hereby agree to extend the term of the Original Contract to a new expiration date of ${formData.newExpirationDate || "__________"}.`
    );
    write(doc, state, "1.3 All references to term or expiration in the Original Contract shall be construed to reflect the extended term.");

    write(doc, state, "\n2. AMENDMENTS TO ORIGINAL CONTRACT", { size: 12, bold: true });
    write(doc, state, "2.1 The following provisions of the Original Contract are amended or supplemented as follows:");
    write(doc, state, formData.amendedProvisions || "[Describe specific amendments or write 'None' if no change]");

    write(doc, state, "\n2.2 Except as expressly amended, all other terms of the Original Contract remain in full force and effect.");

    write(doc, state, "\n3. GENERAL PROVISIONS", { size: 12, bold: true });
    write(doc, state, `3.1 Severability\n${formData.severabilityClause}`);
    write(doc, state, `\n3.2 Waiver\n${formData.waiverClause}`);
    write(doc, state, `\n3.3 Amendment\n${formData.amendmentClause}`);
    write(doc, state, `\n3.4 Execution in Counterparts\n${formData.counterpartsClause}`);

    write(doc, state, "\n4. SIGNATURES", { size: 12, bold: true });
    write(doc, state, `IN WITNESS WHEREOF, the Parties have executed this Contract Extension Agreement as of the Effective Date first written above.`);
    write(doc, state, "\n");

    write(doc, state, `First Party:\nName: ${formData.firstPartyName || "___________________"}\nTitle/Entity Type: ${formData.firstPartyEntity || "___________________"}\nSignature: __________________________\nDate: ${formData.signFirstDate || "___________________"}`);
    write(doc, state, "\n");
    write(doc, state, `Second Party:\nName: ${formData.secondPartyName || "___________________"}\nTitle/Entity Type: ${formData.secondPartyEntity || "___________________"}\nSignature: __________________________\nDate: ${formData.signSecondDate || "___________________"}`);

    doc.save("Contract_Extension_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">First Party</h4>
              <Label>Name</Label>
              <Input name="firstPartyName" value={formData.firstPartyName} onChange={handleChange} />
              <Label>Entity Type / Title</Label>
              <Input name="firstPartyEntity" value={formData.firstPartyEntity} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="firstPartyAddress" value={formData.firstPartyAddress} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Second Party</h4>
              <Label>Name</Label>
              <Input name="secondPartyName" value={formData.secondPartyName} onChange={handleChange} />
              <Label>Entity Type / Title</Label>
              <Input name="secondPartyEntity" value={formData.secondPartyEntity} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="secondPartyAddress" value={formData.secondPartyAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Original Contract & Extension</h3>
              <Label>Original Contract Title</Label>
              <Input name="originalContractTitle" value={formData.originalContractTitle} onChange={handleChange} />
              <Label>Original Contract Date</Label>
              <Input name="originalContractDate" value={formData.originalContractDate} onChange={handleChange} />
              <Label>Original Expiration Date</Label>
              <Input name="originalExpirationDate" value={formData.originalExpirationDate} onChange={handleChange} />
              <Label>New Expiration Date (extended term)</Label>
              <Input name="newExpirationDate" value={formData.newExpirationDate} onChange={handleChange} />
              <Label>Amended / Supplemented Provisions</Label>
              <Textarea name="amendedProvisions" value={formData.amendedProvisions} onChange={handleChange} placeholder="Describe specific clause changes (or 'None')" />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">General Clauses & Signatures</h3>
              <Label>Severability Clause</Label>
              <Textarea name="severabilityClause" value={formData.severabilityClause} onChange={handleChange} />
              <Label>Waiver Clause</Label>
              <Textarea name="waiverClause" value={formData.waiverClause} onChange={handleChange} />
              <Label>Amendment Clause</Label>
              <Textarea name="amendmentClause" value={formData.amendmentClause} onChange={handleChange} />
              <Label>Counterparts / Electronic Signature Clause</Label>
              <Textarea name="counterpartsClause" value={formData.counterpartsClause} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Signatories</h4>
              <Label>First Party - Signatory Name</Label>
              <Input name="signFirstName" value={formData.signFirstName} onChange={handleChange} />
              <Label>First Party - Title</Label>
              <Input name="signFirstTitle" value={formData.signFirstTitle} onChange={handleChange} />
              <Label>First Party - Date</Label>
              <Input name="signFirstDate" value={formData.signFirstDate} onChange={handleChange} />

              <Label>Second Party - Signatory Name</Label>
              <Input name="signSecondName" value={formData.signSecondName} onChange={handleChange} />
              <Label>Second Party - Title</Label>
              <Input name="signSecondTitle" value={formData.signSecondTitle} onChange={handleChange} />
              <Label>Second Party - Date</Label>
              <Input name="signSecondDate" value={formData.signSecondDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Contract Extension Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
