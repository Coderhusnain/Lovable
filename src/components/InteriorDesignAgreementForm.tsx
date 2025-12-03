import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  clientName: string;
  clientAddress: string;
  designerName: string;
  designerAddress: string;

  startDate: string;
  completionDate: string;
  projectAddress: string;
  servicesDescription: string;

  paymentAmount: string;
  paymentAddress: string;
  interestRate: string;
  collectionCostsNote: string;

  terminationDate: string;

  ownershipNote: string;
  confidentialityNote: string;
  indemnificationNote: string;
  warrantyNote: string;

  defaultNote: string;
  cureDays: string;

  forceMajeureNote: string;
  arbitrationNote: string;

  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;

  governingLaw: string;
  noticesNote: string;
  waiverNote: string;

  clientSignName: string;
  clientSignDate: string;
  designerSignName: string;
  designerSignDate: string;
}

export default function InteriorDesignAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientAddress: "",
    designerName: "",
    designerAddress: "",

    startDate: "",
    completionDate: "",
    projectAddress: "",
    servicesDescription: "",

    paymentAmount: "",
    paymentAddress: "",
    interestRate: "",
    collectionCostsNote: "",

    terminationDate: "",

    ownershipNote: "",
    confidentialityNote: "",
    indemnificationNote: "",
    warrantyNote: "",

    defaultNote: "",
    cureDays: "",

    forceMajeureNote: "",
    arbitrationNote: "",

    entireAgreementNote: "",
    severabilityNote: "",
    amendmentNote: "",

    governingLaw: "",
    noticesNote: "",
    waiverNote: "",

    clientSignName: "",
    clientSignDate: "",
    designerSignName: "",
    designerSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

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

    write("INTERIOR DESIGN SERVICES AGREEMENT", 16, true, true);
    write("\n");

    write(`This Interior Design Contract (\u201cContract\u201d) is made effective as of ${formData.startDate || "[Effective Date]"}, by and between:`);
    write(`Client: ${formData.clientName || "[Client Name]"}, residing at ${formData.clientAddress || "[Client Address]"}.`);
    write(`Designer: ${formData.designerName || "[Designer Name]"}, business address ${formData.designerAddress || "[Designer Address]"}.`);
    write("\n");

    write("1. Purpose", 12, true);
    write("WHEREAS the Designer is professionally engaged in the business of interior design services, and the Client desires to engage the Designer to provide such services in accordance with the terms set forth herein;\nNOW THEREFORE, the Parties agree as follows:");
    write("\n");

    write("2. Description of Services", 12, true);
    write(`Beginning on ${formData.startDate || "[Start Date]"}, the Designer shall perform the following services for the Client (the \u201cServices\u201d):`);
    write(formData.servicesDescription || "[Insert description of design services]");
    write(`The Services shall be completed on or before ${formData.completionDate || "[Completion Date]"}, at the project location situated at ${formData.projectAddress || "[Project Address]"}.`);
    write("\n");

    write("3. Payment", 12, true);
    write(`The Client agrees to pay the Designer a total amount of ${formData.paymentAmount || "[amount]"} upon completion of the Services. Payment shall be made to the Designer at ${formData.paymentAddress || "[Designer\'s Address]"}.`);
    write(`Interest shall accrue on any overdue amount at the rate of ${formData.interestRate || "[rate]"} per annum, or the maximum rate permissible under applicable law, whichever is lower. The Client shall be responsible for all collection costs, including attorney fees. Failure to make payment shall constitute a material breach and entitle the Designer to terminate this Contract and pursue legal remedies.`);
    write("\n");

    write("4. Term", 12, true);
    write(`This Contract shall automatically terminate on ${formData.terminationDate || "[Termination Date]"}, unless earlier terminated as provided herein.`);
    write("\n");

    write("5. Ownership of Work Product", 12, true);
    write(formData.ownershipNote || "All copyrightable works, ideas, plans, designs, or similar material developed in connection with this Contract shall be the exclusive property of the Client. The Designer shall, upon request, execute all instruments necessary to transfer full ownership rights to the Client.");
    write("\n");

    write("6. Confidentiality", 12, true);
    write(formData.confidentialityNote || "The Designer, and any employee or representative thereof, shall not disclose or use any proprietary or confidential information of the Client for personal benefit or otherwise. This obligation shall survive the termination of this Contract. Upon termination, the Designer shall return all records, designs, notes, and other property belonging to the Client.");
    write("\n");

    write("7. Indemnification", 12, true);
    write(formData.indemnificationNote || "The Designer agrees to indemnify and hold the Client harmless from and against any and all claims, losses, damages, liabilities, and expenses (including reasonable legal fees) resulting from the Designer\'s performance under this Contract.");
    write("\n");

    write("8. Warranty", 12, true);
    write(formData.warrantyNote || "The Designer warrants that the Services shall be performed in a timely, professional, and workmanlike manner consistent with industry standards and best practices prevailing in the community.");
    write("\n");

    write("9. Default", 12, true);
    write(formData.defaultNote || "Material default under this Contract includes: (a) Non-payment by either Party; (b) Bankruptcy or insolvency; (c) Seizure or assignment of assets; (d) Failure to perform the Services in accordance with the timeline and specifications herein.");
    write("\n");

    write("10. Remedies", 12, true);
    write(`Upon default, the aggrieved Party may provide written notice identifying the breach. The breaching Party shall have ${formData.cureDays || "[insert days]"} from receipt to cure. Failure to cure shall result in automatic termination unless waived in writing by the non-breaching Party.`);
    write("\n");

    write("11. Force Majeure", 12, true);
    write(formData.forceMajeureNote || "A Party shall be excused from performance under this Contract where such performance is rendered impossible due to causes beyond its reasonable control, including but not limited to acts of God, pandemic, government orders, war, or labor strikes. Affected Parties must notify the other in writing and resume performance as soon as feasible.");
    write("\n");

    write("12. Arbitration", 12, true);
    write(formData.arbitrationNote || "Any disputes arising from or relating to this Contract shall be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association. The arbitration award shall be final and binding, and enforceable in any court of competent jurisdiction. The Parties shall continue to perform their obligations during arbitration.");
    write("\n");

    write("13. Entire Agreement", 12, true);
    write(formData.entireAgreementNote || "This Contract contains the entire agreement between the Parties and supersedes all prior oral and written communications.");
    write("\n");

    write("14. Severability", 12, true);
    write(formData.severabilityNote || "Should any provision be found invalid or unenforceable, the remainder shall continue in full force and effect. Where a provision can be made valid through limitation, it shall be construed accordingly.");
    write("\n");

    write("15. Amendment", 12, true);
    write(formData.amendmentNote || "No amendment to this Contract shall be valid unless in writing and signed by the Party against whom enforcement is sought.");
    write("\n");

    write("16. Governing Law", 12, true);
    write(`This Contract shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "[Insert State Name]"}.`);
    write("\n");

    write("17. Notice", 12, true);
    write(formData.noticesNote || "All notices or communications under this Contract must be delivered personally or sent via certified mail, return receipt requested, to the addresses listed in the introductory clause, unless otherwise modified in writing.");
    write("\n");

    write("18. Waiver", 12, true);
    write(formData.waiverNote || "Failure by any Party to enforce any provision of this Contract shall not constitute a waiver of such provision or any other provision.");
    write("\n");

    write("19. Execution", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
    write(`CLIENT:\nBy: ${formData.clientSignName || "_______________________"}\nDate: ${formData.clientSignDate || "________"}`);
    write(`\nDESIGNER / CONTRACTOR:\nBy: ${formData.designerSignName || "_______________________"}\nDate: ${formData.designerSignDate || "________"}`);

    doc.save("Interior_Design_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                <h3 className="font-semibold">Parties & Project</h3>
              </div>
              <Label>Client Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client Address</Label>
              <Input name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
              <Label>Designer Name</Label>
              <Input name="designerName" value={formData.designerName} onChange={handleChange} />
              <Label>Designer Address</Label>
              <Input name="designerAddress" value={formData.designerAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Dates</h3>
              <Label>Project Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Completion Date</Label>
              <Input name="completionDate" value={formData.completionDate} onChange={handleChange} />
              <Label>Project Address</Label>
              <Input name="projectAddress" value={formData.projectAddress} onChange={handleChange} />
              <Label>Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} rows={5} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Term</h3>
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Payment Address</Label>
              <Input name="paymentAddress" value={formData.paymentAddress} onChange={handleChange} />
              <Label>Interest Rate</Label>
              <Input name="interestRate" value={formData.interestRate} onChange={handleChange} />
              <Label>Collection Costs Note</Label>
              <Textarea name="collectionCostsNote" value={formData.collectionCostsNote} onChange={handleChange} />
              <Label>Termination / End Date</Label>
              <Input name="terminationDate" value={formData.terminationDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Rights & Protections</h3>
              <Label>Ownership of Work Product</Label>
              <Textarea name="ownershipNote" value={formData.ownershipNote} onChange={handleChange} />
              <Label>Confidentiality</Label>
              <Textarea name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} />
              <Label>Indemnification</Label>
              <Textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
              <Label>Warranty</Label>
              <Textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Defaults & Remedies</h3>
              <Label>Default Note</Label>
              <Textarea name="defaultNote" value={formData.defaultNote} onChange={handleChange} />
              <Label>Cure Period (days)</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
              <Label>Force Majeure</Label>
              <Textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Dispute, Boilerplate & Notices</h3>
              <Label>Arbitration / Dispute Resolution</Label>
              <Textarea name="arbitrationNote" value={formData.arbitrationNote} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Severability</Label>
              <Textarea name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment</Label>
              <Textarea name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notices</Label>
              <Textarea name="noticesNote" value={formData.noticesNote} onChange={handleChange} />
              <Label>Waiver</Label>
              <Textarea name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Client - Name</Label>
              <Input name="clientSignName" value={formData.clientSignName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="clientSignDate" value={formData.clientSignDate} onChange={handleChange} />
              <Label>Designer - Name</Label>
              <Input name="designerSignName" value={formData.designerSignName} onChange={handleChange} />
              <Label>Designer - Date</Label>
              <Input name="designerSignDate" value={formData.designerSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Interior Design Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
