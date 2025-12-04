import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  jointVenturerA: string;
  jointVenturerAOffice: string;
  jointVenturerB: string;
  jointVenturerBOffice: string;

  ventureName: string;
  placeOfBusiness: string;
  termEndDate: string;
  purpose: string;

  contributionA: string;
  contributionB: string;

  percentageA: string;
  percentageB: string;

  dutiesA: string;
  dutiesB: string;

  definitionsNote: string;

  powersNote: string;

  confidentialityYears: string;

  terminationNote: string;
  governingLaw: string;
  disputeResolution: string;

  amendmentNote: string;
  assignmentNote: string;

  signAName: string;
  signATitle: string;
  signADate: string;
  signBName: string;
  signBTitle: string;
  signBDate: string;
}

export default function JointVentureAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    jointVenturerA: "",
    jointVenturerAOffice: "",
    jointVenturerB: "",
    jointVenturerBOffice: "",

    ventureName: "",
    placeOfBusiness: "",
    termEndDate: "",
    purpose: "",

    contributionA: "",
    contributionB: "",

    percentageA: "",
    percentageB: "",

    dutiesA: "",
    dutiesB: "",

    definitionsNote: "",

    powersNote: "",

    confidentialityYears: "",

    terminationNote: "",
    governingLaw: "",
    disputeResolution: "",

    amendmentNote: "",
    assignmentNote: "",

    signAName: "",
    signATitle: "",
    signADate: "",
    signBName: "",
    signBTitle: "",
    signBDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 13;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const maxW = w - margin * 2;
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (w - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight;
      });
    };

    write("JOINT VENTURE AGREEMENT", 16, true, true);
    write("\n");

    write(`This Joint Venture Agreement (the \u201cAgreement\u201d) is made and entered into as of ${formData.date || "[●]"}, by and between:`);
    write(`${formData.jointVenturerA || "[Joint Venturer A]"}, having its principal office at ${formData.jointVenturerAOffice || "[●]"},`);
    write(`and`);
    write(`${formData.jointVenturerB || "[Joint Venturer B]"}, having its principal office at ${formData.jointVenturerBOffice || "[●]"}.`);
    write("Each may be referred to individually as a \"Joint Venturer\" and collectively as the \"Joint Venturers\" or the \"Parties.\"");
    write("\n");

    write("The Joint Venturers desire to establish a joint venture for the purposes set forth herein and to define their respective rights, obligations, and responsibilities in relation to the Joint Venture. In consideration of the mutual promises, covenants, warranties, and agreements contained herein, the Joint Venturers agree as follows:");
    write("\n");

    write("1. NAME AND LEGAL TITLE", 12, true);
    write(`1. The Joint Venturers hereby form and establish a joint venture to be conducted under the name ${formData.ventureName || "[●]"} (the \"Joint Venture\").`);
    write(`2. The legal title to all property and assets of the Joint Venture, including the Joint Venture itself, shall remain in the name of the Joint Venture.`);
    write("\n");

    write("2. PLACE OF BUSINESS AND TERM", 12, true);
    write(`1. The principal place of business of the Joint Venture shall be located at ${formData.placeOfBusiness || "[●]"}.`);
    write(`2. The term of the Joint Venture shall commence on the execution date hereof and shall continue until ${formData.termEndDate || "[●]"}, unless earlier dissolved in accordance with the provisions of this Agreement, including upon sale or disposal of the Joint Venture and satisfaction of all liabilities.`);
    write("\n");

    write("3. PURPOSE", 12, true);
    write(`1. The Joint Venturers form the Joint Venture for the purpose of ${formData.purpose || "[●]"}.`);
    write("2. Each Joint Venturer shall own an undivided fractional interest in the Joint Venture.");
    write("3. The Joint Venture shall not engage in any other business or activity without the prior written consent of all Joint Venturers.");
    write("\n");

    write("4. CAPITAL CONTRIBUTIONS", 12, true);
    write("1. Separate capital accounts shall be maintained for each Joint Venturer. Such accounts shall consist of:\no Initial capital contributions,\no Share of profits,\no Less share of losses, and\no Less any distributions or withdrawals.");
    write(`2. Initial contributions by the Joint Venturers are as follows:\no [Joint Venturer A]: $${formData.contributionA || "[●]"}\no [Joint Venturer B]: $${formData.contributionB || "[●]"}`);
    write("3. Additional capital contributions may be required as mutually agreed to carry out the Joint Venture’s purposes.");
    write("4. The Joint Venturers shall arrange for or provide any financing required for the Joint Venture, subject to prior approval of all Joint Venturers.");
    write("5. The Joint Venturers may endorse, assume, or guarantee obligations of the Joint Venture as mutually agreed.");
    write("\n");

    write("5. PERCENTAGE INTERESTS", 12, true);
    write(`The respective ownership percentages in the Joint Venture are as follows:\n[Joint Venturer A]: ${formData.percentageA || "[●]%"}\n[Joint Venturer B]: ${formData.percentageB || "[●]%"}`);
    write("\n");

    write("6. PROFITS AND LOSSES", 12, true);
    write("1. Net profits shall be distributed to the Joint Venturers in proportion to their respective ownership interests.");
    write("2. All losses, expenses, and disbursements incurred in acquiring, holding, and protecting the Joint Venture shall be borne by the Joint Venturers proportionally to their contributions.");
    write("\n");

    write("7. DUTIES OF JOINT VENTURERS", 12, true);
    write(`• Duties of [Joint Venturer A]: ${formData.dutiesA || "[●]"}`);
    write(`• Duties of [Joint Venturer B]: ${formData.dutiesB || "[●]"}`);
    write("\n");

    write("8. DEFINITIONS", 12, true);
    write(formData.definitionsNote || `8.1 Intellectual Property Rights – All patents, copyrights, trademarks, trade secrets, know-how, trade dress, and other intellectual property rights, including claims for infringement, misappropriation, or violation thereof, worldwide.\n8.2 Technology – Materials, products, packaging, know-how, methods of manufacturing, and all associated Intellectual Property Rights, including Derivative Works.\n8.3 Technology Improvements – Enhancements, developments, or alternatives to Technology created independently or jointly that improve capability, efficiency, quality, reduce cost, or facilitate production.\n8.4 Confidential Information – Any nonpublic information disclosed by a Party that is designated as confidential or reasonably should be treated as such, including Technology, Intellectual Property, financial information, customer data, marketing plans, and other proprietary information.\n8.5 Derivative Works – Works based on pre-existing works, including translations, adaptations, improvements, extensions, compilations, or any recast forms of copyrighted, patented, or trade secret materials.`);
    write("\n");

    write("9. POWERS OF JOINT VENTURERS", 12, true);
    write(formData.powersNote || `The following powers require the consent of all Joint Venturers:\n1. Borrowing on the general credit of the Joint Venture or incurring debt.\n2. Making loans, guarantees, or pledges to third parties.\n3. Acquiring property outside the ordinary course of business.\n4. Selling, encumbering, mortgaging, or refinancing Joint Venture assets.\n5. Confessing judgment or creating liens on Joint Venture property.\n6. Spending funds on renovations, remodeling, or non-routine expenditures.`);
    write("\n");

    write("10. TREATMENT OF PROPRIETARY AND CONFIDENTIAL INFORMATION", 12, true);
    write(`1. Each Party shall treat all Confidential Information as a valuable commercial asset.\n2. Confidential Information does not include information:\no Already lawfully possessed by the Receiving Party,\no Publicly available through no act or omission of the Receiving Party,\no Received from a third party without confidentiality obligations,\no Required to be disclosed by law.\n3. Confidential Information remains the property of the disclosing Party and shall be promptly returned upon request.\n4. During the term of this Agreement and for ${formData.confidentialityYears || "[●]"} years thereafter: The Receiving Party shall maintain confidentiality and restrict access to employees or representatives who have a need to know. Third-party service providers may only receive Confidential Information under an acceptable non-disclosure and technology ownership agreement approved by all Joint Venturers.`);
    write("\n");

    write("11. TERMINATION AND DISSOLUTION", 12, true);
    write(formData.terminationNote || `1. The Joint Venture may be terminated upon mutual written consent or upon completion of the Joint Venture’s purpose.\n2. Upon termination, all assets shall be liquidated, liabilities satisfied, and remaining funds distributed according to ownership percentages.`);
    write("\n");

    write("12. GOVERNING LAW", 12, true);
    write(`This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[State/Country]"}.`);
    write("\n");

    write("13. DISPUTE RESOLUTION", 12, true);
    write(formData.disputeResolution || `Disputes arising from or relating to this Agreement shall first be resolved through friendly negotiations. If unresolved, the Parties shall submit the dispute to mediation in [Location/Jurisdiction]. If mediation fails, the Parties may pursue remedies available under applicable law.`);
    write("\n");

    write("14. AMENDMENT AND ASSIGNMENT", 12, true);
    write(formData.amendmentNote || `1. This Agreement may be amended only by a written instrument signed by all Joint Venturers.\n2. No Party may assign or transfer its rights or obligations without prior written consent from the other Joint Venturer.`);
    write("\n");

    write("15. SEVERABILITY", 12, true);
    write("If any provision is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
    write("\n");

    write("16. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties regarding the Joint Venture and supersedes all prior agreements, understandings, or representations.");
    write("\n");

    write("17. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above:");
    write(`\n[Joint Venturer A]\nBy: ${formData.signAName || "_________________________"}\nName: ${formData.signAName || "[●]"}\nTitle: ${formData.signATitle || "[●]"}\nDate: ${formData.signADate || "[●]"}`);
    write(`\n[Joint Venturer B]\nBy: ${formData.signBName || "_________________________"}\nName: ${formData.signBName || "[●]"}\nTitle: ${formData.signBTitle || "[●]"}\nDate: ${formData.signBDate || "[●]"}`);

    doc.save("Joint_Venture_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Handshake className="w-6 h-6" />
                <h3 className="font-semibold">Parties & Intro</h3>
              </div>
              <Label>Agreement Date</Label>
              <Input name="date" value={formData.date} onChange={handleChange} />
              <Label>Joint Venturer A</Label>
              <Input name="jointVenturerA" value={formData.jointVenturerA} onChange={handleChange} />
              <Label>Principal Office A</Label>
              <Input name="jointVenturerAOffice" value={formData.jointVenturerAOffice} onChange={handleChange} />
              <Label>Joint Venturer B</Label>
              <Input name="jointVenturerB" value={formData.jointVenturerB} onChange={handleChange} />
              <Label>Principal Office B</Label>
              <Input name="jointVenturerBOffice" value={formData.jointVenturerBOffice} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Venture Details</h3>
              <Label>Joint Venture Name</Label>
              <Input name="ventureName" value={formData.ventureName} onChange={handleChange} />
              <Label>Place of Business</Label>
              <Input name="placeOfBusiness" value={formData.placeOfBusiness} onChange={handleChange} />
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Purpose</Label>
              <Textarea name="purpose" value={formData.purpose} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Capital & Percentages</h3>
              <Label>Initial Contribution A (USD)</Label>
              <Input name="contributionA" value={formData.contributionA} onChange={handleChange} />
              <Label>Initial Contribution B (USD)</Label>
              <Input name="contributionB" value={formData.contributionB} onChange={handleChange} />
              <Label>Percentage Interest A (%)</Label>
              <Input name="percentageA" value={formData.percentageA} onChange={handleChange} />
              <Label>Percentage Interest B (%)</Label>
              <Input name="percentageB" value={formData.percentageB} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Duties & Definitions</h3>
              <Label>Duties of Joint Venturer A</Label>
              <Textarea name="dutiesA" value={formData.dutiesA} onChange={handleChange} rows={4} />
              <Label>Duties of Joint Venturer B</Label>
              <Textarea name="dutiesB" value={formData.dutiesB} onChange={handleChange} rows={4} />
              <Label>Definitions (optional override)</Label>
              <Textarea name="definitionsNote" value={formData.definitionsNote} onChange={handleChange} rows={6} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Powers, Confidentiality & Termination</h3>
              <Label>Powers (override)</Label>
              <Textarea name="powersNote" value={formData.powersNote} onChange={handleChange} rows={6} />
              <Label>Confidentiality Duration (years)</Label>
              <Input name="confidentialityYears" value={formData.confidentialityYears} onChange={handleChange} />
              <Label>Termination / Dissolution (optional)</Label>
              <Textarea name="terminationNote" value={formData.terminationNote} onChange={handleChange} rows={4} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Governing Law & Dispute</h3>
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Dispute Resolution (override)</Label>
              <Textarea name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} rows={4} />
              <Label>Amendment / Assignment Notes</Label>
              <Textarea name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} rows={3} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatories</h3>
              <Label>Joint Venturer A - Signatory Name</Label>
              <Input name="signAName" value={formData.signAName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="signATitle" value={formData.signATitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signADate" value={formData.signADate} onChange={handleChange} />

              <Label className="pt-4">Joint Venturer B - Signatory Name</Label>
              <Input name="signBName" value={formData.signBName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="signBTitle" value={formData.signBTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="signBDate" value={formData.signBDate} onChange={handleChange} />
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

        {step < 7 ? (
          <Button onClick={() => setStep((s) => Math.min(7, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Joint Venture Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
