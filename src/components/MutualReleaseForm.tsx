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
  partyATitle: string;
  partyBName: string;
  partyBTitle: string;
  underlyingContractDate: string;
  underlyingContractReference: string;
  payment1_amount: string;
  payment1_from: string;
  payment1_to: string;
  payment2_amount: string;
  payment2_from: string;
  payment2_to: string;
  governingLaw: string;
  waiverUnknownClaims: string; // e.g., "Yes" / "No" or short note
  signPartyAName: string;
  signPartyADate: string;
  signPartyBName: string;
  signPartyBDate: string;
  notaryState: string;
  notaryCounty: string;
  notaryName: string;
  notaryDate: string;
}

export default function MutualReleaseForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partyAName: "",
    partyATitle: "",
    partyBName: "",
    partyBTitle: "",
    underlyingContractDate: "",
    underlyingContractReference: "",
    payment1_amount: "",
    payment1_from: "",
    payment1_to: "",
    payment2_amount: "",
    payment2_from: "",
    payment2_to: "",
    governingLaw: "",
    waiverUnknownClaims: "The Parties expressly waive unknown claims.",
    signPartyAName: "",
    signPartyADate: "",
    signPartyBName: "",
    signPartyBDate: "",
    notaryState: "",
    notaryCounty: "",
    notaryName: "",
    notaryDate: "",
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

    write("MUTUAL RELEASE AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Mutual Release Agreement (the “Agreement”) is entered into as of ${formData.effectiveDate || "__________"}, by and between:`,
    );
    write(`${formData.partyAName || "________________________"}, and ${formData.partyBName || "________________________"}.`);
    write("\n");

    write("PURPOSE", 12, true);
    write(
      "The purpose of this Agreement is to effect the full and final settlement of all disputes, obligations, and liabilities between the Parties, and to terminate any obligations owed by either Party to the other in connection with the matters described herein.",
    );
    write("\n");

    write("RECITALS", 12, true);
    write(
      `WHEREAS, disputes and differences have arisen between the Parties relating to that certain agreement dated ${formData.underlyingContractDate ||
        "__________"}, a copy of which is attached hereto as Exhibit A (the “Underlying Contract”);`,
    );
    write(
      "WHEREAS, the Parties desire to fully and finally resolve said disputes and differences, without admission of liability, by executing this Mutual Release;",
    );
    write(
      "WHEREAS, in consideration of this Mutual Release and additional consideration, including the payments acknowledged below, each Party wishes to release and discharge the other Party from all claims and liabilities arising from the Underlying Contract; and",
    );
    write("\n");

    write("NOW, THEREFORE, in consideration of the foregoing recitals and the mutual covenants contained herein, the Parties agree as follows:", 11, false);
    write("\n");

    write("1. MUTUAL RELEASE", 12, true);
    write("1.1 Release by Party A.");
    write(
      `${formData.partyAName || "[Party A]"} does hereby release, cancel, forgive, and forever discharge ${formData.partyBName ||
        "[Party B]"}, together with its predecessors, parent corporations, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`,
    );

    write("1.2 Release by Party B.");
    write(
      `${formData.partyBName || "[Party B]"} does hereby release, cancel, forgive, and forever discharge ${formData.partyAName ||
        "[Party A]"}, together with its predecessors, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`,
    );

    write("1.3 Waiver of Unknown Claims.");
    write(formData.waiverUnknownClaims || "Each Party expressly waives any rights with respect to unknown claims.");
    write("\n");

    write("PAYMENTS (Acknowledged Consideration)", 12, true);
    if (formData.payment1_amount || formData.payment1_from || formData.payment1_to) {
      write(
        `Payment 1: ${formData.payment1_amount || "US $______"} paid by ${formData.payment1_from || "______"} to ${formData.payment1_to ||
          "______"}. Receipt acknowledged.`,
      );
    }
    if (formData.payment2_amount || formData.payment2_from || formData.payment2_to) {
      write(
        `Payment 2: ${formData.payment2_amount || "US $______"} paid by ${formData.payment2_from || "______"} to ${formData.payment2_to ||
          "______"}. Receipt acknowledged.`,
      );
    }
    if (!formData.payment1_amount && !formData.payment2_amount) {
      write("No monetary payments are recorded on this Agreement (as set out above).");
    }
    write("\n");

    write("2. GOVERNING LAW", 12, true);
    write(`This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw ||
      "[insert state]"}.`);
    write("\n");

    write("3. LEGAL CONSTRUCTION", 12, true);
    write(
      "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be deemed severed, and the remaining provisions shall remain valid and enforceable. This Agreement shall be construed as a whole and not as severable obligations.",
    );
    write("\n");

    write("4. ATTORNEYS' FEES", 12, true);
    write(
      "If any action or proceeding is brought to enforce or interpret the provisions of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs, in addition to any other relief to which it may be entitled.",
    );
    write("\n");

    write("5. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof, and supersedes all prior negotiations, representations, or agreements, whether written or oral.");
    write("\n");

    write("EXECUTION", 12, true);
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Mutual Release Agreement as of the date first written above.");
    write("\n");

    write(`${formData.partyAName || "[Party A]"}`);
    write(`Name / Title: ${formData.partyATitle || "____________________"}`);
    write(`Date: ${formData.signPartyADate || "____________________"}`);
    write("\n");

    write(`${formData.partyBName || "[Party B]"}`);
    write(`Name / Title: ${formData.partyBTitle || "____________________"}`);
    write(`Date: ${formData.signPartyBDate || "____________________"}`);
    write("\n");

    if (formData.notaryName || formData.notaryDate || formData.notaryCounty || formData.notaryState) {
      write("NOTARY ACKNOWLEDGMENT (Optional)");
      write(`State of ${formData.notaryState || "__________"} )`);
      write(`County of ${formData.notaryCounty || "__________"} )`);
      write(
        `On this ${formData.notaryDate || "___ day of ______, 20__"}, before me, the undersigned Notary Public, personally appeared ${formData.notaryName ||
          "____________________"}, known to me (or satisfactorily proven) to be the person whose name is subscribed to this instrument, and acknowledged that he/she executed the same for the purposes therein contained.`,
      );
      write("IN WITNESS WHEREOF, I hereunto set my hand and official seal.");
      write("\n");
      write("Notary Public: ____________________________");
    }

    doc.save("Mutual_Release_Agreement.pdf");
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
              <Label>Party A - Title</Label>
              <Input name="partyATitle" value={formData.partyATitle} onChange={handleChange} />

              <Label>Party B - Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />
              <Label>Party B - Title</Label>
              <Input name="partyBTitle" value={formData.partyBTitle} onChange={handleChange} />

              <Label>Underlying Contract Date</Label>
              <Input name="underlyingContractDate" value={formData.underlyingContractDate} onChange={handleChange} />
              <Label>Underlying Contract Reference / Exhibit</Label>
              <Textarea name="underlyingContractReference" value={formData.underlyingContractReference} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Release Terms & Consideration</h3>

              <Label>Payment 1 - Amount (e.g., US $1,000)</Label>
              <Input name="payment1_amount" value={formData.payment1_amount} onChange={handleChange} />
              <Label>Payment 1 - Paid by (payer)</Label>
              <Input name="payment1_from" value={formData.payment1_from} onChange={handleChange} />
              <Label>Payment 1 - Paid to (payee)</Label>
              <Input name="payment1_to" value={formData.payment1_to} onChange={handleChange} />

              <Label className="mt-2">Payment 2 - Amount (optional)</Label>
              <Input name="payment2_amount" value={formData.payment2_amount} onChange={handleChange} />
              <Label>Payment 2 - Paid by (payer)</Label>
              <Input name="payment2_from" value={formData.payment2_from} onChange={handleChange} />
              <Label>Payment 2 - Paid to (payee)</Label>
              <Input name="payment2_to" value={formData.payment2_to} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label>Waiver of Unknown Claims (short text)</Label>
              <Textarea name="waiverUnknownClaims" value={formData.waiverUnknownClaims} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures & Notary</h3>

              <Label>Party A - Signatory Name</Label>
              <Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} />
              <Label>Party A - Date</Label>
              <Input name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} />

              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Party B - Date</Label>
              <Input name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} />

              <h4 className="font-medium mt-4">Optional Notary Acknowledgment</h4>
              <Label>Notary - Name (appeared)</Label>
              <Input name="notaryName" value={formData.notaryName} onChange={handleChange} />
              <Label>Notary - Date</Label>
              <Input name="notaryDate" value={formData.notaryDate} onChange={handleChange} />
              <Label>Notary - County</Label>
              <Input name="notaryCounty" value={formData.notaryCounty} onChange={handleChange} />
              <Label>Notary - State</Label>
              <Input name="notaryState" value={formData.notaryState} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Mutual Release Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
