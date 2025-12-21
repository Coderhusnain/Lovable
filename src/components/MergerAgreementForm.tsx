import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  dissolvingName: string;
  dissolvingType: string;
  dissolvingJurisdiction: string;
  survivingName: string;
  survivingType: string;
  survivingJurisdiction: string;
  newSurvivingName: string;
  assetTangible: string;
  assetReceivables: string;
  assetInventory: string;
  estimatedLiabilities: string;
  conversionPercent: string;
  fractionalSettlement: string;
  managementControl: string;
  boardCount: string;
  dissolvingNominees: string;
  noticesAddressDissolving: string;
  noticesAddressSurviving: string;
  severabilityText: string;
  indemnificationText: string;
  applicableLaw: string;
  signatory1Name: string;
  signatory1Title: string;
  signatory1Date: string;
  signatory2Name: string;
  signatory2Title: string;
  signatory2Date: string;
}

export default function MergerAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    dissolvingName: "",
    dissolvingType: "",
    dissolvingJurisdiction: "",
    survivingName: "",
    survivingType: "",
    survivingJurisdiction: "",
    newSurvivingName: "",
    assetTangible: "",
    assetReceivables: "",
    assetInventory: "",
    estimatedLiabilities: "",
    conversionPercent: "",
    fractionalSettlement: "",
    managementControl: "",
    boardCount: "",
    dissolvingNominees: "",
    noticesAddressDissolving: "",
    noticesAddressSurviving: "",
    severabilityText: "",
    indemnificationText: "",
    applicableLaw: "",
    signatory1Name: "",
    signatory1Title: "",
    signatory1Date: "",
    signatory2Name: "",
    signatory2Title: "",
    signatory2Date: "",
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

    write("MERGER AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Merger Agreement (the "Agreement") is made and entered into as of ${formData.effectiveDate || "[_____]"} ("Effective Date"), by and between:`
    );

    write(`1. Dissolving Entity: ${formData.dissolvingName || "[_____]"} (${formData.dissolvingType || "[type of entity]"}), organized under ${formData.dissolvingJurisdiction || "[State/Country]"}.`);
    write(`2. Surviving Entity: ${formData.survivingName || "[_____]"} (${formData.survivingType || "[type of entity]"}), organized under ${formData.survivingJurisdiction || "[State/Country]"}.`);

    write("\n");
    write("WHEREAS, the parties desire that, upon the terms and conditions set forth herein, the Dissolving Entity shall be merged into the Surviving Entity, with the Surviving Entity continuing as the surviving entity under the name " + (formData.newSurvivingName || "[_____]") + ".");
    write("WHEREAS, the parties intend that the merger shall be effected in accordance with the applicable laws of " + (formData.dissolvingJurisdiction || "[State/Country]") + ".");

    write("\n");
    write("I. MERGER", 12, true);
    write("1. Effective Date of Merger");
    write("The merger shall become effective upon the filing of the certificate of merger with the appropriate governmental authorities in accordance with the laws of " + (formData.dissolvingJurisdiction || "[State/Country]") + " (the \"Effective Date\").");
    write("\n");
    write("2. Surviving Business Entity");
    write("Subject to the terms and conditions of this Agreement, the Dissolving Entity shall be merged with and into the Surviving Entity. Upon completion of the merger, the separate corporate existence of the Dissolving Entity shall cease, and the Surviving Entity shall continue as the surviving entity, retaining all rights, assets, and liabilities of the Dissolving Entity as provided by law.");

    write("\n");
    write("II. TERMS AND CONDITIONS", 12, true);
    write("Further Assignments and Assurances: The managers, officers, or authorized representatives of the Dissolving Entity shall execute and deliver all deeds, assignments, confirmations, and assurances as may be reasonably requested by the Surviving Entity to vest, perfect, and confirm title to all assets, property, and rights of the Dissolving Entity in the Surviving Entity.");

    write("\n");
    write("III. VALUATION OF ASSETS", 12, true);
    write("Assets of the Dissolving Entity:");
    write(`Tangible and intangible assets, including goodwill: $${formData.assetTangible || "[_____]"}`);
    write(`Unrealized receivables: $${formData.assetReceivables || "[_____]"}`);
    write(`Inventory: $${formData.assetInventory || "[_____]"}`);
    write(`Estimated liabilities: $${formData.estimatedLiabilities || "[_____]"}`);

    write("\n");
    write("Conversion of Interests:");
    write(`At the Effective Date of the merger, each interest in the Dissolving Entity shall be converted into ${formData.conversionPercent || "[_____]"} percent interest(s) of the Surviving Entity.`);
    write(`No fractional interests of the Surviving Entity shall be issued. ${formData.fractionalSettlement || "Any fractional interests otherwise payable shall be settled in cash equal to the fair market value of such fraction."}`);

    write("\n");
    write("IV. MANAGEMENT OF SURVIVING ENTITY", 12, true);
    write("Management and Control:");
    write(formData.managementControl || "The partners, managers, or directors of the Surviving Entity shall have exclusive control over the business operations of the Surviving Entity, subject to any limitations set forth in its governing documents.");
    write("\n");
    write("Board of Directors and Officers:");
    write(`The initial board of directors of the Surviving Entity shall consist of ${formData.boardCount || "[]"} directors. The Dissolving Entity shall be entitled to nominate ${formData.dissolvingNominees || "[]"} director(s) to serve on the board.`);

    write("\n");
    write("V. INTERPRETATION AND ENFORCEMENT", 12, true);
    write("Notices:");
    write(`All notices shall be in writing and delivered to: Dissolving Entity: ${formData.noticesAddressDissolving || "[address]"}; Surviving Entity: ${formData.noticesAddressSurviving || "[address]"}.`);
    write("\n");
    write("Execution in Counterparts: This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.");

    write("\n");
    write("VI. GENERAL PROVISIONS", 12, true);
    write("Severability:");
    write(formData.severabilityText || "If any provision of this Agreement is determined to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such determination shall not affect the validity, legality, or enforceability of the remaining provisions of this Agreement.");
    write("\n");
    write("Mutual Indemnification:");
    write(formData.indemnificationText || "Each party agrees to indemnify, defend, and hold harmless the other party, including its officers, directors, agents, affiliates, and successors, from and against any and all claims, demands, liabilities, losses, costs, and expenses, including reasonable attorneys’ fees, arising from or related to any material breach of a representation, warranty, covenant, or obligation under this Agreement.");
    write("\n");
    write("Applicable Law:");
    write(`This Agreement shall be governed by, construed, and enforced in accordance with the laws of ${formData.applicableLaw || "[State/Country]"}, without regard to its conflicts of law principles.`);

    write("\n");
    write("VII. SIGNATORIES", 12, true);
    write("This Agreement shall be executed by the duly authorized representatives of the parties. By their signatures below, each party acknowledges that they have read, understood, and agreed to be bound by all terms and conditions of this Agreement.");

    write("\n");
    write("Dissolving Entity:");
    write("By: __________________________");
    write(`Printed Name & Title: ${formData.signatory1Name || "[Printed Name & Title]"}`);
    write(`Date: ${formData.signatory1Date || "[Date]"}`);

    write("\n");
    write("Surviving Entity:");
    write("By: __________________________");
    write(`Printed Name & Title: ${formData.signatory2Name || "[Printed Name & Title]"}`);
    write(`Date: ${formData.signatory2Date || "[Date]"}`);

    doc.save("Merger_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Preamble & Parties</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Dissolving Entity - Name</Label>
              <Input name="dissolvingName" value={formData.dissolvingName} onChange={handleChange} />
              <Label>Dissolving Entity - Type</Label>
              <Input name="dissolvingType" value={formData.dissolvingType} onChange={handleChange} />
              <Label>Dissolving Entity - State/Country</Label>
              <Input name="dissolvingJurisdiction" value={formData.dissolvingJurisdiction} onChange={handleChange} />

              <Label className="pt-2">Surviving Entity - Name</Label>
              <Input name="survivingName" value={formData.survivingName} onChange={handleChange} />
              <Label>Surviving Entity - Type</Label>
              <Input name="survivingType" value={formData.survivingType} onChange={handleChange} />
              <Label>Surviving Entity - State/Country</Label>
              <Input name="survivingJurisdiction" value={formData.survivingJurisdiction} onChange={handleChange} />

              <Label className="pt-2">Name of Surviving Entity after Merger (if changing)</Label>
              <Input name="newSurvivingName" value={formData.newSurvivingName} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Valuation & Conversion</h3>
              <Label>Tangible & Intangible Assets (amount)</Label>
              <Input name="assetTangible" value={formData.assetTangible} onChange={handleChange} />

              <Label>Unrealized Receivables (amount)</Label>
              <Input name="assetReceivables" value={formData.assetReceivables} onChange={handleChange} />

              <Label>Inventory (amount)</Label>
              <Input name="assetInventory" value={formData.assetInventory} onChange={handleChange} />

              <Label>Estimated Liabilities (amount)</Label>
              <Input name="estimatedLiabilities" value={formData.estimatedLiabilities} onChange={handleChange} />

              <Label className="pt-2">Conversion Percentage</Label>
              <Input name="conversionPercent" value={formData.conversionPercent} onChange={handleChange} />

              <Label>Fractional Interests Settlement</Label>
              <Textarea name="fractionalSettlement" value={formData.fractionalSettlement} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Management, Notices & General</h3>
              <Label>Management & Control (summary)</Label>
              <Textarea name="managementControl" value={formData.managementControl} onChange={handleChange} />

              <Label className="pt-2">Initial Board Count</Label>
              <Input name="boardCount" value={formData.boardCount} onChange={handleChange} />

              <Label>Dissolving Entity - Board Nominees</Label>
              <Input name="dissolvingNominees" value={formData.dissolvingNominees} onChange={handleChange} />

              <Label className="pt-2">Notices Address - Dissolving Entity</Label>
              <Textarea name="noticesAddressDissolving" value={formData.noticesAddressDissolving} onChange={handleChange} />

              <Label>Notices Address - Surviving Entity</Label>
              <Textarea name="noticesAddressSurviving" value={formData.noticesAddressSurviving} onChange={handleChange} />

              <Label className="pt-2">Severability (override)</Label>
              <Textarea name="severabilityText" value={formData.severabilityText} onChange={handleChange} />

              <Label className="pt-2">Mutual Indemnification (override)</Label>
              <Textarea name="indemnificationText" value={formData.indemnificationText} onChange={handleChange} />

              <Label className="pt-2">Applicable Law / Governing Jurisdiction</Label>
              <Input name="applicableLaw" value={formData.applicableLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatories</h3>
              <Label>Signatory (Dissolving Entity) - Name</Label>
              <Input name="signatory1Name" value={formData.signatory1Name} onChange={handleChange} />
              <Label>Signatory 1 - Title</Label>
              <Input name="signatory1Title" value={formData.signatory1Title} onChange={handleChange} />
              <Label>Signatory 1 - Date</Label>
              <Input type="date" name="signatory1Date" value={formData.signatory1Date} onChange={handleChange} />

              <hr />

              <Label>Signatory (Surviving Entity) - Name</Label>
              <Input name="signatory2Name" value={formData.signatory2Name} onChange={handleChange} />
              <Label>Signatory 2 - Title</Label>
              <Input name="signatory2Title" value={formData.signatory2Title} onChange={handleChange} />
              <Label>Signatory 2 - Date</Label>
              <Input type="date" name="signatory2Date" value={formData.signatory2Date} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Merger Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
