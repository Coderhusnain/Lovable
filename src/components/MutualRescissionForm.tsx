import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  originalContractDate: string;
  originalContractReference: string;
  rescissionStatement: string; // optional extra text
  confidentialityExceptions: string;
  survivingProvisions: string;
  governingLaw: string;
  signPartyAName: string;
  signPartyATitle: string;
  signPartyADate: string;
  signPartyBName: string;
  signPartyBTitle: string;
  signPartyBDate: string;
}

export default function MutualRescissionForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partyAName: "",
    partyAAddress: "",
    partyBName: "",
    partyBAddress: "",
    originalContractDate: "",
    originalContractReference: "",
    rescissionStatement: "The Original Contract is hereby rescinded, terminated, and rendered null and void as of the Effective Date.",
    confidentialityExceptions: "Disclosure permitted to legal, financial, or tax advisors bound by confidentiality obligations; or as required by law or court order.",
    survivingProvisions: "Provisions intended by their nature to survive termination (e.g., confidentiality, IP, indemnification, governing law).",
    governingLaw: "",
    signPartyAName: "",
    signPartyATitle: "",
    signPartyADate: "",
    signPartyBName: "",
    signPartyBTitle: "",
    signPartyBDate: "",
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

    const write = (text: string, size = 11, bold = false, center = false, spacing = 1.3) => {
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
        y += size * spacing;
      });
    };

    write("MUTUAL RESCISSION AND RELEASE AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Mutual Rescission and Release Agreement (the “Agreement”) is made and entered into as of the ${formData.effectiveDate ||
        "___ day of ________, 20"} (the “Effective Date”), by and between:`,
    );
    write(`Party A: ${formData.partyAName || "____________________"}, of ${formData.partyAAddress || "____________________"}.`);
    write(`Party B: ${formData.partyBName || "____________________"}, of ${formData.partyBAddress || "____________________"}.`);
    write("\n");

    write("RECITALS", 12, true);
    write(
      `WHEREAS, the Parties entered into that certain agreement dated ${formData.originalContractDate ||
        "__________"}, attached hereto as Exhibit A and incorporated herein by reference (the “Original Contract”);`,
    );
    write("WHEREAS, the Parties acknowledge that neither Party has fully performed its obligations under the Original Contract;");
    write("WHEREAS, the Parties now mutually desire to rescind and terminate the Original Contract and to be released from any and all rights, obligations, and liabilities arising thereunder;");
    write("\n");

    write("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, and intending to be legally bound, the Parties hereby agree as follows:", 11, false);
    write("\n");

    write("AGREEMENT", 12, true);
    write("1. Rescission of Original Contract");
    write(formData.rescissionStatement || "The Original Contract is hereby rescinded, terminated, and rendered null and void as of the Effective Date. The Parties shall have no further rights, obligations, or liabilities thereunder.");
    write("\n");

    write("2. Mutual Release");
    write(
      "Each Party, on behalf of itself and its successors, assigns, representatives, and affiliates, hereby fully and forever releases, discharges, and waives any and all claims, demands, causes of action, obligations, or liabilities of any kind, whether known or unknown, which have arisen or may arise out of or in connection with the Original Contract prior to the Effective Date.",
    );
    write("\n");

    write("3. No Admission of Liability");
    write("This Agreement constitutes a mutual compromise and settlement of disputed matters. Nothing herein shall be construed as an admission of liability or wrongdoing by either Party.");
    write("\n");

    write("4. Confidentiality");
    write("The Parties agree to maintain the confidentiality of this Agreement, its terms, and the circumstances leading to its execution. Neither Party shall disclose such information to any third party, except:");
    write(formData.confidentialityExceptions || "Disclosure permitted to legal, financial, or tax advisors bound by confidentiality obligations; or as required by law or court order.");
    write("\n");

    write("5. Survival of Certain Provisions");
    write(
      "Notwithstanding the rescission of the Original Contract, any provisions of the Original Contract which by their nature are intended to survive termination (including, without limitation, provisions relating to confidentiality, non-disclosure, intellectual property, indemnification, or governing law) shall survive and remain in full force and effect in accordance with their terms.",
    );
    if (formData.survivingProvisions) {
      write(`Surviving provisions (as specified): ${formData.survivingProvisions}`);
    }
    write("\n");

    write("6. Entire Agreement");
    write("This Agreement contains the entire understanding of the Parties with respect to the subject matter hereof and supersedes all prior negotiations, discussions, or agreements, whether oral or written, relating to such subject matter.");
    write("\n");

    write("7. Governing Law");
    write(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "[insert state]"}.`);
    write("\n");

    write("8. Counterparts");
    write("This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument. Signatures delivered electronically or by facsimile shall be deemed effective.");
    write("\n");

    write("SIGNATURES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Mutual Rescission and Release Agreement as of the Effective Date.");
    write("\n");

    write(`${formData.partyAName || "[Name of Party A]"}`);
    write(`Title: ${formData.signPartyATitle || "______________________"}`);
    write(`Date: ${formData.signPartyADate || "______________________"}`);
    write("\n");

    write(`${formData.partyBName || "[Name of Party B]"}`);
    write(`Title: ${formData.signPartyBTitle || "______________________"}`);
    write(`Date: ${formData.signPartyBDate || "______________________"}`);
    write("\n");

    doc.save("Mutual_Rescission_and_Release_Agreement.pdf");
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

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Party A - Name</Label>
              <Input name="partyAName" value={formData.partyAName} onChange={handleChange} />
              <Label>Party A - Address</Label>
              <Input name="partyAAddress" value={formData.partyAAddress} onChange={handleChange} />

              <Label>Party B - Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />
              <Label>Party B - Address</Label>
              <Input name="partyBAddress" value={formData.partyBAddress} onChange={handleChange} />

              <Label>Original Contract Date</Label>
              <Input name="originalContractDate" value={formData.originalContractDate} onChange={handleChange} />
              <Label>Original Contract Reference / Exhibit</Label>
              <Textarea name="originalContractReference" value={formData.originalContractReference} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Agreement Terms</h3>

              <Label>Rescission Statement (customize)</Label>
              <Textarea name="rescissionStatement" value={formData.rescissionStatement} onChange={handleChange} />

              <Label>Confidentiality - Exceptions</Label>
              <Textarea name="confidentialityExceptions" value={formData.confidentialityExceptions} onChange={handleChange} />

              <Label>Surviving Provisions (describe)</Label>
              <Textarea name="survivingProvisions" value={formData.survivingProvisions} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
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
              <Label>Party A - Title</Label>
              <Input name="signPartyATitle" value={formData.signPartyATitle} onChange={handleChange} />
              <Label>Party A - Date</Label>
              <Input name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} />

              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Party B - Title</Label>
              <Input name="signPartyBTitle" value={formData.signPartyBTitle} onChange={handleChange} />
              <Label>Party B - Date</Label>
              <Input name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Mutual Rescission & Release Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
