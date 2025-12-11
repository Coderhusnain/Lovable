import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  marriageDate: string;
  marriagePlace: string;
  separatePropertySummary: string;
  residenceProperty: string;
  earningsDuringMarriage: string;
  premaritalDebts: string;
  maritalDebts: string;
  jointPropertyNote: string;
  taxesNote: string;
  dissolutionNote: string;
  supportWaiverNote: string;
  disabilityNote: string;
  deathProvisionNote: string;
  revocationNote: string;
  additionalInstrumentsNote: string;
  disputeResolutionNote: string;
  attorneyFeesNote: string;
  fullDisclosureNote: string;
  governingLaw: string;
  signPartyAName: string;
  signPartyADate: string;
  signPartyBName: string;
  signPartyBDate: string;
  notaryState: string;
  notaryCounty: string;
  notaryDate: string;
}

export default function PostnuptialAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partyAName: "",
    partyAAddress: "",
    partyBName: "",
    partyBAddress: "",
    marriageDate: "",
    marriagePlace: "",
    separatePropertySummary: "",
    residenceProperty: "",
    earningsDuringMarriage: "",
    premaritalDebts: "",
    maritalDebts: "",
    jointPropertyNote: "",
    taxesNote: "",
    dissolutionNote: "",
    supportWaiverNote: "Each Party waives spousal maintenance unless otherwise agreed.",
    disabilityNote: "",
    deathProvisionNote: "",
    revocationNote: "This Agreement may be revoked or amended only by a written instrument signed by both Parties before a notary public.",
    additionalInstrumentsNote: "",
    disputeResolutionNote: "Negotiate → Mediate → Court",
    attorneyFeesNote: "Prevailing party entitled to reasonable attorney's fees.",
    fullDisclosureNote: "Each Party confirms full financial disclosure has been made.",
    governingLaw: "",
    signPartyAName: "",
    signPartyADate: "",
    signPartyBName: "",
    signPartyBDate: "",
    notaryState: "",
    notaryCounty: "",
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
        y += size * 1.35;
      });
    };

    write("POSTNUPTIAL AGREEMENT", 16, true, true);
    write("\n");

    write(
      `This Postnuptial Agreement ("Agreement") is made and entered into on the ${formData.effectiveDate ||
        "___ day of ________"} by and between:`,
      11
    );
    write(`${formData.partyAName || "[Party A]"}, residing at ${formData.partyAAddress || "[Address]"} (Party A).`);
    write(`${formData.partyBName || "[Party B]"}, residing at ${formData.partyBAddress || "[Address]"} (Party B).`);
    write("\n");
    write("RECITALS", 12, true);
    write(
      `WHEREAS, the Parties were lawfully married on ${formData.marriageDate || "___ day of ________"} in ${formData.marriagePlace ||
        "__________"}, and desire to set forth their financial and property arrangements during marriage and upon separation, dissolution, or death.`
    );
    write("\n");
    write("AGREEMENT", 12, true);

    write("\n1. SEPARATE PROPERTY", 12, true);
    write(formData.separatePropertySummary || "Separate property described and confirmed in attached schedules.");

    write("\n2. RESIDENCE", 12, true);
    write(formData.residenceProperty || "Residence property treatment described above.");

    write("\n3. EARNINGS DURING THE MARRIAGE", 12, true);
    write(formData.earningsDuringMarriage || "Earnings during marriage remain separate to the earning party as stated.");

    write("\n4. DEBTS", 12, true);
    write("4.1 Pre-Marital Debts:");
    write(formData.premaritalDebts || "Each Party remains liable for their pre-marital debts and will indemnify the other.");
    write("4.2 Marital Debts:");
    write(formData.maritalDebts || "Marital debts are the responsibility of the incurring Party unless jointly agreed.");

    write("\n5. JOINT PROPERTY", 12, true);
    write(formData.jointPropertyNote || "Joint property rules and documentation to be agreed in writing.");

    write("\n6. TAXES", 12, true);
    write(formData.taxesNote || "Tax filing and rights reserved as permitted by law. Joint filing does not alter property classification hereunder.");

    write("\n7. DISSOLUTION OF MARRIAGE", 12, true);
    write(formData.dissolutionNote || "This Agreement shall be presented to court for enforcement upon dissolution.");

    write("\n8. SUPPORT", 12, true);
    write(formData.supportWaiverNote || "Each Party waives spousal maintenance unless otherwise agreed.");

    write("\n9. DISABILITY", 12, true);
    write(formData.disabilityNote || "Care and support obligations in case of disability as described.");

    write("\n10. DEATH", 12, true);
    write(formData.deathProvisionNote || "Death provisions and survivorship as described above.");

    write("\n11. REVOCATION", 12, true);
    write(formData.revocationNote);

    write("\n12. ADDITIONAL INSTRUMENTS", 12, true);
    write(formData.additionalInstrumentsNote || "Parties agree to execute instruments necessary to effectuate this Agreement.");

    write("\n13. DISPUTE RESOLUTION", 12, true);
    write(formData.disputeResolutionNote || "Negotiate, then Mediate, then seek court relief as necessary.");

    write("\n14. ATTORNEY'S FEES", 12, true);
    write(formData.attorneyFeesNote);

    write("\n15. FULL DISCLOSURE", 12, true);
    write(formData.fullDisclosureNote);

    write("\n16. MISCELLANEOUS", 12, true);
    write(`Governing Law: ${formData.governingLaw || "[State]"}`);
    write("This Agreement binds heirs, executors, administrators, successors, and assigns.");

    write("\nIN WITNESS WHEREOF", 12, true);
    write("Party A: " + (formData.signPartyAName || "___________________________"));
    write("Date: " + (formData.signPartyADate || "________________"));
    write("\n");
    write("Party B: " + (formData.signPartyBName || "___________________________"));
    write("Date: " + (formData.signPartyBDate || "________________"));
    write("\n");
    write("NOTARY ACKNOWLEDGMENT", 12, true);
    write(
      `State of ${formData.notaryState || "__________"} County of ${formData.notaryCounty || "__________"} on ${formData.notaryDate ||
        "___ day of ________, 20"} before me, personally appeared the parties and acknowledged execution.`
    );

    doc.save("Postnuptial_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-8 h-8" />
                <h3 className="font-semibold text-lg">Parties & Recitals</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Party A - Full Name</Label>
              <Input name="partyAName" value={formData.partyAName} onChange={handleChange} />

              <Label>Party A - Address</Label>
              <Textarea name="partyAAddress" value={formData.partyAAddress} onChange={handleChange} />

              <Label>Party B - Full Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />

              <Label>Party B - Address</Label>
              <Textarea name="partyBAddress" value={formData.partyBAddress} onChange={handleChange} />

              <Label>Marriage Date</Label>
              <Input name="marriageDate" value={formData.marriageDate} onChange={handleChange} />

              <Label>Marriage Place (County, State)</Label>
              <Input name="marriagePlace" value={formData.marriagePlace} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-lg">Property & Financial Terms</h3>

              <Label>Separate Property Summary</Label>
              <Textarea name="separatePropertySummary" value={formData.separatePropertySummary} onChange={handleChange} />

              <Label>Residence Property (treatment)</Label>
              <Textarea name="residenceProperty" value={formData.residenceProperty} onChange={handleChange} />

              <Label>Earnings During Marriage</Label>
              <Textarea name="earningsDuringMarriage" value={formData.earningsDuringMarriage} onChange={handleChange} />

              <Label>Pre-Marital Debts</Label>
              <Textarea name="premaritalDebts" value={formData.premaritalDebts} onChange={handleChange} />

              <Label>Marital Debts</Label>
              <Textarea name="maritalDebts" value={formData.maritalDebts} onChange={handleChange} />

              <Label>Joint Property Note</Label>
              <Textarea name="jointPropertyNote" value={formData.jointPropertyNote} onChange={handleChange} />

              <Label>Taxes Note</Label>
              <Textarea name="taxesNote" value={formData.taxesNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-lg">Legal Terms & Signatures</h3>

              <Label>Dissolution Note</Label>
              <Textarea name="dissolutionNote" value={formData.dissolutionNote} onChange={handleChange} />

              <Label>Support / Waiver Note</Label>
              <Textarea name="supportWaiverNote" value={formData.supportWaiverNote} onChange={handleChange} />

              <Label>Disability Note</Label>
              <Textarea name="disabilityNote" value={formData.disabilityNote} onChange={handleChange} />

              <Label>Death Provision Note</Label>
              <Textarea name="deathProvisionNote" value={formData.deathProvisionNote} onChange={handleChange} />

              <Label>Revocation / Amendment</Label>
              <Textarea name="revocationNote" value={formData.revocationNote} onChange={handleChange} />

              <Label>Dispute Resolution</Label>
              <Textarea name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} />

              <Label>Attorney Fees Note</Label>
              <Textarea name="attorneyFeesNote" value={formData.attorneyFeesNote} onChange={handleChange} />

              <Label>Full Disclosure Confirmation</Label>
              <Textarea name="fullDisclosureNote" value={formData.fullDisclosureNote} onChange={handleChange} />

              <Label>Governing Law (State)</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>Party A - Signatory Name</Label>
              <Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} />
              <Label>Party A - Date</Label>
              <Input name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} />

              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Party B - Date</Label>
              <Input name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} />

              <Label>Notary - State</Label>
              <Input name="notaryState" value={formData.notaryState} onChange={handleChange} />
              <Label>Notary - County</Label>
              <Input name="notaryCounty" value={formData.notaryCounty} onChange={handleChange} />
              <Label>Notary - Acknowledgment Date</Label>
              <Input name="notaryDate" value={formData.notaryDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Postnuptial Agreement PDF generated successfully.</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
