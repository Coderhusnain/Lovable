import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
// Icon suggestion: import { EyeOff } from "lucide-react";

interface FormData {
  effectiveDate: string;
  partnershipName: string;
  principalAddress: string;
  term: string;
  generalPartnerName: string;
  generalPartnerAddress: string;
  generalPartnerCityStateZip: string;
  silentPartnerName: string;
  silentPartnerAddress: string;
  silentPartnerCityStateZip: string;
  contributionsDeadline: string;
  generalPartnerPercent: string;
  silentPartnerPercent: string;
  governingLaw: string;
  signGeneralName: string;
  signGeneralDate: string;
  signSilentName: string;
  signSilentDate: string;
}

export default function SilentPartnershipForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    partnershipName: "",
    principalAddress: "",
    term: "",
    generalPartnerName: "",
    generalPartnerAddress: "",
    generalPartnerCityStateZip: "",
    silentPartnerName: "",
    silentPartnerAddress: "",
    silentPartnerCityStateZip: "",
    contributionsDeadline: "",
    generalPartnerPercent: "",
    silentPartnerPercent: "",
    governingLaw: "",
    signGeneralName: "",
    signGeneralDate: "",
    signSilentName: "",
    signSilentDate: "",
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

    write("SILENT PARTNERSHIP AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Silent Partnership Agreement (the "Agreement") is made and entered into as of ${formData.effectiveDate ||
        "[Effective Date]"}, by and between the following parties (collectively, the "Partners"):`
    );
    write("\n");
    write(
      `• ${formData.generalPartnerName || "[General Partner Name]"}, residing at ${formData.generalPartnerAddress ||
        "[-----]"}, City of ${formData.generalPartnerCityStateZip || "[--------]"}, State of [------], ZIP Code [-----]; and`
    );
    write(
      `• ${formData.silentPartnerName || "[Silent Partner Name]"}, residing at ${formData.silentPartnerAddress ||
        "[-------]"}, City of ${formData.silentPartnerCityStateZip || "[------]"}, State of [-----], ZIP Code [--------].`
    );
    write("\n");
    write(`The Partners desire to establish a business partnership in accordance with the terms and conditions set forth herein.`);
    write("\n\n");

    write("I. GENERAL PROVISIONS", 12, true);
    write("1.1 Preamble");
    write(
      "The Partners wish to enter into a business venture, wherein the Silent Partner(s) shall participate in the Partnership without active management or control, in accordance with the terms of this Agreement."
    );
    write("\n");
    write("1.2 Partnership Name, Place, and Business");
    write(`The business shall be conducted under the name ${formData.partnershipName || "[Partnership Name]"} (the "Partnership"). The Partnership shall operate in compliance with all applicable federal, state, and local laws. The principal place of business of the Partnership shall be ${formData.principalAddress || "[Address]"}.`);
    write("\n");
    write("1.3 Term");
    write(
      `The Partnership shall commence on the Effective Date and shall continue in full force and effect until ${formData.term ||
        "[Date or Event of Termination]"}, unless earlier dissolved in accordance with this Agreement or by operation of law.`
    );

    write("\n\n");
    write("II. PARTNER CONTRIBUTIONS, INTERESTS, AND AUTHORITY", 12, true);
    write("2.1 Contributions");
    write(`Each Partner shall make an initial capital contribution in the amount agreed upon, which shall be submitted no later than ${formData.contributionsDeadline || "[Date]"}.`);
    write("\n");
    write("2.2 Interest on Contributions");
    write("No Partner’s contribution to the capital of the Partnership shall bear interest. All interest or other income earned on such contributions shall be credited to the Partnership’s capital account.");
    write("\n");
    write("2.3 Ownership Interest and Authority");
    write("The Partners shall own the Partnership as follows:");
    write(`• ${formData.generalPartnerName || "[General Partner]"} – ${formData.generalPartnerPercent || "[●]"}%`);
    write(`• ${formData.silentPartnerName || "[Silent Partner]"} – ${formData.silentPartnerPercent || "[●]"}%`);
    write("Except as otherwise expressly provided in this Agreement, the General Partner(s) shall have full authority to manage and control the business operations, while the Silent Partner(s) shall have no right to participate in the management or day-to-day decision-making of the Partnership.");

    write("\n\n");
    write("III. DUTIES AND LIABILITIES", 12, true);
    write("3.1 Duties of the General Partner(s)");
    write("The General Partner(s) shall be solely responsible for the management, operation, and control of the Partnership, including but not limited to:");
    write("• Hiring and managing personnel;");
    write("• Entering into contracts and agreements;");
    write("• Purchasing and selling goods or services;");
    write("• Maintaining accounting and financial records; and");
    write("• Implementing all policies necessary for the operation of the Partnership.");
    write("\n");
    write("3.2 Duties of the Silent Partner(s)");
    write("The Silent Partner(s) shall:");
    write("• Remain \"silent\" in all managerial, operational, and decision-making matters of the Partnership;");
    write("• Be free to engage in other business ventures or partnerships outside the Partnership;");
    write("• Not be personally liable for any debts, obligations, or liabilities of the Partnership except as required by law.");
    write("\n");
    write("3.3 Profits and Losses");
    write("All Partners, including the Silent Partner(s), shall share in all profits, losses, income, deductions, and credits of the Partnership in proportion to their ownership interests, unless otherwise agreed in writing. Profits and losses shall be computed in accordance with generally accepted accounting principles consistently applied.");
    write("\n");
    write("3.4 Limited Liability");
    write("Subject to applicable provisions of the Uniform Limited Partnership Act or other governing law, the Silent Partner(s) shall have no personal liability for any debts, obligations, or liabilities of the Partnership.");

    write("\n\n");
    write("IV. LEGAL AND GOVERNING CLAUSES", 12, true);
    write("4.1 Entire Agreement");
    write("This Agreement contains the entire understanding and agreement of the Partners with respect to the Silent Partnership and supersedes all prior agreements, understandings, or representations, whether written or oral.");
    write("\n");
    write("4.2 Waivers");
    write("No waiver of any term, covenant, or obligation under this Agreement shall be valid unless in writing and signed by the Partner(s) to be bound. Failure to enforce any provision shall not constitute a waiver of the right to enforce such provision in the future.");
    write("\n");
    write("4.3 Severability");
    write("If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
    write("\n");
    write("4.4 Counterparts");
    write("This Agreement may be executed in one or more counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.");
    write("\n");
    write("4.5 Dispute Resolution");
    write("All Partners agree to submit any disputes arising under this Agreement to mediation prior to commencing any litigation. If the dispute is not resolved in mediation, the Partners may pursue legal remedies as permitted under the law.");
    write("\n");
    write("4.6 Jurisdiction");
    write(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "[State]"}, and all disputes shall be subject to the exclusive jurisdiction of the courts of that State.`);

    write("\n\n");
    write("V. EXECUTION", 12, true);
    write("IN WITNESS WHEREOF, the Partners have executed this Silent Partnership Agreement as of the Effective Date, intending to be legally bound.");
    write("\n\n");
    write(`${formData.generalPartnerName || "[General Partner Name]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signGeneralDate || "________________"));
    write("\n\n");
    write(`${formData.silentPartnerName || "[Silent Partner Name]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signSilentDate || "________________"));

    doc.save("Silent_Partnership_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <EyeOff className="w-6 h-6" /> */}
                <h3 className="font-semibold">Parties & Agreement</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Partnership Name</Label>
              <Input name="partnershipName" value={formData.partnershipName} onChange={handleChange} />

              <Label>Principal Place of Business (Address)</Label>
              <Textarea name="principalAddress" value={formData.principalAddress} onChange={handleChange} />

              <Label>Term / Event of Termination</Label>
              <Input name="term" value={formData.term} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Partners & Contributions</h3>

              <h4 className="font-medium">General Partner</h4>
              <Label>Name</Label>
              <Input name="generalPartnerName" value={formData.generalPartnerName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="generalPartnerAddress" value={formData.generalPartnerAddress} onChange={handleChange} />
              <Label>City / State / ZIP</Label>
              <Input name="generalPartnerCityStateZip" value={formData.generalPartnerCityStateZip} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Silent Partner</h4>
              <Label>Name</Label>
              <Input name="silentPartnerName" value={formData.silentPartnerName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="silentPartnerAddress" value={formData.silentPartnerAddress} onChange={handleChange} />
              <Label>City / State / ZIP</Label>
              <Input name="silentPartnerCityStateZip" value={formData.silentPartnerCityStateZip} onChange={handleChange} />

              <Label>Contributions Deadline</Label>
              <Input name="contributionsDeadline" value={formData.contributionsDeadline} onChange={handleChange} />

              <Label>Ownership - General Partner (%)</Label>
              <Input name="generalPartnerPercent" value={formData.generalPartnerPercent} onChange={handleChange} />
              <Label>Ownership - Silent Partner (%)</Label>
              <Input name="silentPartnerPercent" value={formData.silentPartnerPercent} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Jurisdiction & Signatures</h3>

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>General Partner - Signatory Name</Label>
              <Input name="signGeneralName" value={formData.signGeneralName} onChange={handleChange} />
              <Label>General Partner - Date</Label>
              <Input name="signGeneralDate" value={formData.signGeneralDate} onChange={handleChange} />

              <Label>Silent Partner - Signatory Name</Label>
              <Input name="signSilentName" value={formData.signSilentName} onChange={handleChange} />
              <Label>Silent Partner - Date</Label>
              <Input name="signSilentDate" value={formData.signSilentDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Silent Partnership Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
