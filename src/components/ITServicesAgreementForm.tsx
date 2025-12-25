import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  effectiveDate: string;
  recipientName: string;
  recipientAddress: string;
  providerName: string;
  providerAddress: string;
  computerSystemExhibit: string;
  uptimePercent: string;
  uptimeHoursFrom: string;
  uptimeHoursTo: string;
  maintenanceSchedule: string;
  warrantySummary: string;
  liquidatedDamages: string;
  paymentAmount: string;
  paymentTerms: string;
  termEndDate: string;
  terminationNoticeDays: string;
  jurisdiction: string;
  signRecipientName: string;
  signRecipientDate: string;
  signProviderName: string;
  signProviderDate: string;
}

export default function ITServicesAgreementForm() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    recipientName: "",
    recipientAddress: "",
    providerName: "",
    providerAddress: "",
    computerSystemExhibit: "",
    uptimePercent: "",
    uptimeHoursFrom: "",
    uptimeHoursTo: "",
    maintenanceSchedule: "",
    warrantySummary: "",
    liquidatedDamages: "",
    paymentAmount: "",
    paymentTerms: "",
    termEndDate: "",
    terminationNoticeDays: "",
    jurisdiction: "",
    signRecipientName: "",
    signRecipientDate: "",
    signProviderName: "",
    signProviderDate: "",
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

    write("IT SERVICES AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This IT Services Agreement (\u201cAgreement\u201d) is made effective as of ${
        formData.effectiveDate || "__________"
      }, by and between ${formData.recipientName || "[Recipient]"}, of ${formData.recipientAddress || "[Recipient Address]"} (\u201cRecipient\u201d), and ${
        formData.providerName || "[Provider]"
      }, of ${formData.providerAddress || "[Provider Address]"} (\u201cProvider\u201d).`
    );

    write("\n");
    write("1. DEFINITIONS", 12, true);
    write(`(a) \u201cComputer System.\u201d ${formData.computerSystemExhibit || "See Exhibit 1 attached."}`);
    write("(b) \u201cServices.\u201d Services means the Operation, Maintenance, and Management of the Computer System as described herein.");
    write("(c) \u201cUptime.\u201d Uptime means the total time available for operation divided by scheduled hours.");

    write("\n");
    write("2. DESCRIPTION OF SERVICES", 12, true);
    write(`(a) Performance of Services: The Provider shall perform all Services using qualified personnel acceptable to the Recipient. The Recipient may require replacement of any Provider personnel for any reason.`);
    write(`(b) System Availability: The Provider commits to an Uptime of ${formData.uptimePercent || "_____"}% during the hours ${formData.uptimeHoursFrom || "__"} to ${formData.uptimeHoursTo || "__"}, Monday through Friday.`);
    write(`(c) Preventive and Remedial Maintenance: ${formData.maintenanceSchedule || "Preventive maintenance shall occur outside scheduled operating hours whenever possible."}`);

    write("\n");
    write("3. WARRANTY", 12, true);
    write(`${formData.warrantySummary || "Provider warrants that Services will be performed in a timely, workmanlike manner consistent with professional standards."}`);
    write("Warranty Disclaimer: EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE PROVIDER MAKES NO OTHER WARRANTIES.");

    write("\n");
    write("4. DEFAULT", 12, true);
    write("A material default occurs upon failure to make payments, insolvency, levy or failure to perform Services.");

    write("\n");
    write("5. REMEDIES", 12, true);
    write("Upon default the non-defaulting party may give written notice; defaulting party shall have the cure period specified in this Agreement.");

    write("\n");
    write("6. LIQUIDATED DAMAGES", 12, true);
    write(
      `If Uptime is not maintained, liquidated damages shall be ${formData.liquidatedDamages || "[amount]"} for each percentage point below ${formData.uptimePercent || "[Uptime]%"}.`
    );

    write("\n");
    write("7. ALTERNATIVE DISPUTE RESOLUTION", 12, true);
    write("The parties shall attempt good-faith negotiations, then mediation prior to litigation.");

    write("\n");
    write("8. RELATIONSHIP OF THE PARTIES", 12, true);
    write("Provider acts as an independent contractor and is responsible for payroll taxes, benefits, insurance, and workers' compensation.");

    write("\n");
    write("9. WORK PRODUCT OWNERSHIP", 12, true);
    write("All Work Product created by the Provider in connection with the Services shall be the exclusive property of the Recipient.");

    write("\n");
    write("10. CONFIDENTIALITY", 12, true);
    write("Provider shall not disclose the Recipient\u2019s confidential information except as required to perform the Services. This obligation survives termination.");

    write("\n");
    write("11. INDEMNIFICATION", 12, true);
    write("Provider shall indemnify the Recipient for claims arising from Provider\u2019s acts or omissions.");

    write("\n");
    write("12. PAYMENT", 12, true);
    write(`Payment: ${formData.paymentAmount || "[amount]"}. Terms: ${formData.paymentTerms || "[terms]"}.`);

    write("\n");
    write("13. TERM", 12, true);
    write(`This Agreement begins on the Effective Date and continues until ${formData.termEndDate || "[Termination Date]"} unless earlier terminated.`);

    write("\n");
    write("14. TERMINATION", 12, true);
    write(`Either party may terminate upon ${formData.terminationNoticeDays || "[days]"} days\u2019 written notice.`);

    write("\n");
    write("15. ATTORNEYS\' FEES", 12, true);
    write("The prevailing party in any enforcement action shall be entitled to recover reasonable attorney\'s fees.");

    write("\n");
    write("16. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire agreement between the parties.");

    write("\n");
    write("17. SEVERABILITY", 12, true);
    write("If any provision is held invalid, the remainder remains in effect.");

    write("\n");
    write(`18. GOVERNING LAW\nThis Agreement shall be governed by the laws of ${formData.jurisdiction || "[State]"}.`);

    write("\n");
    write("19. NOTICES", 12, true);
    write("All notices shall be given by personal delivery, certified mail, courier, or email followed by physical delivery.");

    write("\n");
    write("20. SIGNATORIES", 12, true);
    write(`${formData.recipientName || "[Recipient]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signRecipientDate || "_____________________"));
    write("\n");
    write(`${formData.providerName || "[Provider]"}`);
    write("Signature: ___________________________");
    write("Date: " + (formData.signProviderDate || "_____________________"));

    doc.save("IT_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
            <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/it-services-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About IT Services Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Basics</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Recipient Name</Label>
              <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />

              <Label>Recipient Address</Label>
              <Textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} />

              <Label>Provider Name</Label>
              <Input name="providerName" value={formData.providerName} onChange={handleChange} />

              <Label>Provider Address</Label>
              <Textarea name="providerAddress" value={formData.providerAddress} onChange={handleChange} />

              <Label>Computer System Exhibit (brief)</Label>
              <Textarea name="computerSystemExhibit" value={formData.computerSystemExhibit} onChange={handleChange} />
              
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Service Levels & Maintenance</h3>
              <Label>Uptime Commitment (%)</Label>
              <Input name="uptimePercent" value={formData.uptimePercent} onChange={handleChange} />

              <Label>Operating Hours - From</Label>
              <Input name="uptimeHoursFrom" value={formData.uptimeHoursFrom} onChange={handleChange} />

              <Label>Operating Hours - To</Label>
              <Input name="uptimeHoursTo" value={formData.uptimeHoursTo} onChange={handleChange} />

              <Label>Maintenance Schedule / Notes</Label>
              <Textarea name="maintenanceSchedule" value={formData.maintenanceSchedule} onChange={handleChange} />

              <Label>Warranty Summary</Label>
              <Textarea name="warrantySummary" value={formData.warrantySummary} onChange={handleChange} />

              <Label>Liquidated Damages (per % below Uptime)</Label>
              <Input name="liquidatedDamages" value={formData.liquidatedDamages} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment, Term & Signatures</h3>
              <Label>Payment Amount</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />

              <Label>Payment Terms</Label>
              <Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />

              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />

              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Governing Law / Jurisdiction</Label>
              <Input name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} />

              <hr />
              <Label>Recipient - Signatory Name</Label>
              <Input name="signRecipientName" value={formData.signRecipientName} onChange={handleChange} />
              <Label>Recipient - Date</Label>
              <Input name="signRecipientDate" value={formData.signRecipientDate} onChange={handleChange} />

              <Label>Provider - Signatory Name</Label>
              <Input name="signProviderName" value={formData.signProviderName} onChange={handleChange} />
              <Label>Provider - Date</Label>
              <Input name="signProviderDate" value={formData.signProviderDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">IT Services Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
