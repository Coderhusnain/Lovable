import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  clientName: string;
  clientAddress: string;
  contractorName: string;
  contractorAddress: string;

  startDate: string;
  routineFrequency: string; // e.g., 3 times per week
  routineServices: string; // detailed list
  monthlyServices: string;

  consumablesProvidedBy: string; // Client / Contractor
  paymentAmount: string;
  paymentTerms: string;

  termEndDate: string;
  complianceNote: string;

  insuranceNote: string;
  confidentialityNote: string;
  indemnificationNote: string;

  warrantyNote: string;

  defaultCureDays: string;

  forceMajeureNote: string;
  disputeResolutionNote: string;

  entireAgreementNote: string;
  governingLaw: string;
  noticesNote: string;

  clientSignName: string;
  clientSignDate: string;
  contractorSignName: string;
  contractorSignDate: string;
}

export default function JanitorialServicesAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientAddress: "",
    contractorName: "",
    contractorAddress: "",

    startDate: "",
    routineFrequency: "",
    routineServices: `a. Cleaning of front door glass and thresholds\nb. Sweeping and dust mopping of all floors\nc. Sweeping of all halls and stairways\nd. Vacuuming of carpets and rugs, with spot cleaning as necessary\ne. Emptying and cleaning of all ashtrays\nf. Emptying of all waste containers\ng. Dusting of office furniture, telephones, ledges, woodwork, and accessible surfaces\nh. Removal of fingerprints from both sides of entrance doors, interior doors, partitions, woodwork, and walls\ni. Scrubbing and disinfecting of all restroom floors and fixtures\nj. Replacement of restroom supplies in appropriate dispensers\nk. Dusting of light fixtures\nl. Maintenance of the janitorial room in a clean, neat, and orderly condition.`,
    monthlyServices: `m. Thorough cleaning and waxing of all floors\nn. Cleaning of exterior windows on both the interior and exterior sides.`,

    consumablesProvidedBy: "Client",
    paymentAmount: "",
    paymentTerms: "",

    termEndDate: "",
    complianceNote: "",

    insuranceNote: "The Contractor shall procure and maintain workers' compensation insurance and furnish evidence upon request.",
    confidentialityNote: "",
    indemnificationNote: "",

    warrantyNote: "The Contractor warrants that all Services shall be performed diligently, in a timely and workmanlike manner, and in accordance with generally accepted industry standards.",

    defaultCureDays: "",

    forceMajeureNote: "",
    disputeResolutionNote: "",

    entireAgreementNote: "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements.",
    governingLaw: "",
    noticesNote: "",

    clientSignName: "",
    clientSignDate: "",
    contractorSignName: "",
    contractorSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 13;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const maxW = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight;
      });
    };

    write("JANITORIAL SERVICES AGREEMENT", 16, true, true);
    write("\n");

    write(`This Janitorial Services Agreement (the \u201cAgreement\u201d) is entered into and made effective as of ${formData.startDate || "[Effective Date]"}, by and between ${formData.clientName || "[Client Name]"}, having a place of business at ${formData.clientAddress || "[address]"} (the \u201cClient\u201d), and ${formData.contractorName || "[Contractor Name]"}, having a place of business at ${formData.contractorAddress || "[address]"} (the \u201cContractor\u201d).`);
    write("\n");

    write("1. Description of Services", 12, true);
    write(`1.1 Beginning on ${formData.startDate || "[start date]"}, the Contractor shall provide professional janitorial and cleaning services to the Client at the Client\'s premises.`);
    write("1.2 The Services shall include, without limitation, the following duties:");
    write(`Routine Services (${formData.routineFrequency || "____ times per week"}):`);
    write(formData.routineServices);
    write("\n");

    write("Monthly Services (once per month):", 12, true);
    write(formData.monthlyServices);
    write("\n");

    write("2. Materials and Supplies", 12, true);
    write(`2.1 The Contractor shall provide, at its sole cost, all cleaning materials, equipment, and tools necessary for performance of the Services, with the exception of consumables (including hand soap, paper towels, toilet tissue, seat covers, and similar supplies).`);
    write(`2.2 The Client shall supply all consumables and shall maintain an adequate stock in the janitorial storage area of the building. (${formData.consumablesProvidedBy || "Client"})`);
    write("\n");

    write("3. Supervision", 12, true);
    write(`3.1 The Contractor shall conduct systematic inspections to ensure that the Services are performed in a satisfactory manner and in accordance with professional cleaning standards.`);
    write(`3.2 Any complaints or deficiencies reported by the Client shall be promptly addressed and remedied by the Contractor.`);
    write("\n");

    write("4. Payment Terms", 12, true);
    write(`4.1 The Client shall pay the Contractor the sum of US $${formData.paymentAmount || "[amount]"} as compensation for the Services described herein, payable upon completion of Services, unless otherwise agreed in writing.`);
    write(`4.2 Compensation shall be consistent with the prevailing union wage scale applicable to employees in this sector. Should there be an increase or decrease in the union wage scale, the compensation payable under this Agreement shall be adjusted accordingly.`);
    write("\n");

    write("5. Term", 12, true);
    write(`5.1 This Agreement shall commence on the Effective Date and shall automatically terminate on ${formData.termEndDate || "[termination date]"}, unless earlier terminated in accordance with this Agreement or extended by written agreement of the Parties.`);
    write("\n");

    write("6. Compliance with Laws", 12, true);
    write(`6.1 In the performance of the Services, the Contractor shall comply with all applicable federal, state, county, and municipal laws, statutes, ordinances, regulations, and codes. ${formData.complianceNote || ""}`);
    write("\n");

    write("7. Insurance", 12, true);
    write(formData.insuranceNote || "");
    write("\n");

    write("8. Confidentiality", 12, true);
    write(formData.confidentialityNote || "The Contractor, including its employees, agents, and representatives, shall not, during or after the term of this Agreement, disclose, communicate, or use for personal benefit any confidential or proprietary information belonging to the Client. This confidentiality obligation shall survive termination of this Agreement.");
    write("\n");

    write("9. Indemnification", 12, true);
    write(formData.indemnificationNote || "The Contractor agrees to indemnify, defend, and hold harmless the Client, its officers, agents, and employees from and against any and all claims, losses, damages, liabilities, expenses, including reasonable attorney\'s fees, arising out of or related to the acts, omissions, or negligence of the Contractor, its employees, agents, or subcontractors in connection with the performance of the Services.");
    write("\n");

    write("10. Warranty of Services", 12, true);
    write(formData.warrantyNote || "The Contractor warrants that all Services shall be performed diligently, in a timely and workmanlike manner, and in accordance with generally accepted industry standards. The Contractor further warrants that the quality of Services shall be equal to or superior to that provided by similar service providers in the community.");
    write("\n");

    write("11. Default", 12, true);
    write(`11.1 The occurrence of any of the following shall constitute a default under this Agreement: a. Failure of either Party to make payments when due; b. Insolvency or bankruptcy of either Party; c. Property of either Party being subjected to levy, seizure, or sale by creditors or governmental authorities; or d. Failure by the Contractor to perform or deliver the Services in the time, manner, and quality required herein.`);
    write("\n");

    write("12. Remedies", 12, true);
    write(`12.1 In the event of default, the non-defaulting Party may terminate this Agreement by providing written notice to the defaulting Party. 12.2 The defaulting Party shall have ${formData.defaultCureDays || "[number]"} days from receipt of such notice to cure the default. If the default is not cured within the stated period, this Agreement shall automatically terminate without further notice.`);
    write("\n");

    write("13. Force Majeure", 12, true);
    write(formData.forceMajeureNote || "Neither Party shall be liable for failure to perform its obligations under this Agreement if such failure is caused by an event beyond its reasonable control, including but not limited to acts of God, pandemics, epidemics, natural disasters, strikes, riots, vandalism, governmental restrictions, public health crises, or war.");
    write("\n");

    write("14. Dispute Resolution", 12, true);
    write(formData.disputeResolutionNote || "Any dispute, controversy, or claim arising out of or relating to this Agreement shall first be addressed by the Parties through good-faith negotiations. If the dispute is not resolved, it shall proceed to Alternative Dispute Resolution (ADR) in the form of mediation. If mediation fails, either Party may seek appropriate legal or equitable remedies in a court of competent jurisdiction.");
    write("\n");

    write("15. Entire Agreement", 12, true);
    write(formData.entireAgreementNote || "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior discussions, negotiations, or agreements, whether oral or written.");
    write("\n");

    write("16. Severability", 12, true);
    write("If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.");
    write("\n");

    write("17. Amendment", 12, true);
    write("This Agreement may only be amended, modified, or supplemented by a written instrument signed by both Parties.");
    write("\n");

    write("18. Governing Law", 12, true);
    write(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "[insert state]"}, without regard to its conflict-of-law principles.`);
    write("\n");

    write("19. Notices", 12, true);
    write(formData.noticesNote || "Any notice or communication required or permitted under this Agreement shall be deemed duly given if delivered personally or sent by certified mail, return receipt requested, to the addresses specified in the preamble of this Agreement.");
    write("\n");

    write("20. Waiver of Contractual Rights", 12, true);
    write("The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or any other provision, nor shall it affect that Party\'s right to enforce such provision thereafter.");
    write("\n");

    write("21. Execution and Signatures", 12, true);
    write(`SERVICE RECIPIENT (Client):\nBy: ${formData.clientSignName || "_________________________"}\nName: ${formData.clientName || ""}\nDate: ${formData.clientSignDate || "________"}`);
    write(`\nSERVICE PROVIDER (Contractor):\nBy: ${formData.contractorSignName || "_________________________"}\nName: ${formData.contractorName || ""}\nDate: ${formData.contractorSignDate || "________"}`);

    doc.save("Janitorial_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Dates</h3>
              </div>
              <Label>Client / Service Recipient Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
              <Label>Contractor / Service Provider Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Input name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />
              <Label>Effective / Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services</h3>
              <Label>Routine Frequency (times per week)</Label>
              <Input name="routineFrequency" value={formData.routineFrequency} onChange={handleChange} />
              <Label>Routine Services (each on new line)</Label>
              <Textarea name="routineServices" value={formData.routineServices} onChange={handleChange} rows={8} />
              <Label>Monthly Services</Label>
              <Textarea name="monthlyServices" value={formData.monthlyServices} onChange={handleChange} rows={4} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Materials, Supervision & Payment</h3>
              <Label>Consumables Provided By</Label>
              <Input name="consumablesProvidedBy" value={formData.consumablesProvidedBy} onChange={handleChange} />
              <Label>Payment Amount (USD)</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Payment Terms</Label>
              <Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Compliance, Insurance & Confidentiality</h3>
              <Label>Compliance Notes</Label>
              <Textarea name="complianceNote" value={formData.complianceNote} onChange={handleChange} />
              <Label>Insurance Note</Label>
              <Textarea name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} />
              <Label>Confidentiality Note</Label>
              <Textarea name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Indemnification, Warranty & Defaults</h3>
              <Label>Indemnification Note</Label>
              <Textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
              <Label>Warranty Note</Label>
              <Textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Force Majeure, Dispute & Boilerplate</h3>
              <Label>Force Majeure Note</Label>
              <Textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
              <Label>Dispute Resolution Note</Label>
              <Textarea name="disputeResolutionNote" value={formData.disputeResolutionNote} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notices Note</Label>
              <Textarea name="noticesNote" value={formData.noticesNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Client - Signatory Name</Label>
              <Input name="clientSignName" value={formData.clientSignName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <Label>Contractor - Signatory Name</Label>
              <Input name="contractorSignName" value={formData.contractorSignName} onChange={handleChange} />
              <Label>Contractor - Date</Label>
              <Input name="contractorSignDate" value={formData.contractorSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Janitorial Services Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
