import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  serviceProviderName: string;
  serviceProviderAddress: string;
  clientName: string;
  clientAddress: string;
  serviceType: string;
  serviceDescription: string;
  clientObligations: string;
  providerObligations: string;
  specificService: string;
  duration: string;
  serviceLevelStandard: string;
  serviceCredit: string;
  responseHighTimeframe: string;
  responseHighDescription: string;
  responseMediumTimeframe: string;
  responseMediumDescription: string;
  responseLowTimeframe: string;
  responseLowDescription: string;
  kpiService: string;
  kpiMeasurementPeriod: string;
  kpiDescription: string;
  termEndDate: string;
  earlyTerminationDays: string;
  signatoryClientName: string;
  signatoryClientTitle: string;
  signatoryClientDate: string;
  signatoryProviderName: string;
  signatoryProviderTitle: string;
  signatoryProviderDate: string;
}

export default function ServiceLevelAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    serviceProviderName: "",
    serviceProviderAddress: "",
    clientName: "",
    clientAddress: "",
    serviceType: "",
    serviceDescription: "",
    clientObligations: "",
    providerObligations: "",
    specificService: "",
    duration: "",
    serviceLevelStandard: "",
    serviceCredit: "",
    responseHighTimeframe: "",
    responseHighDescription: "",
    responseMediumTimeframe: "",
    responseMediumDescription: "",
    responseLowTimeframe: "",
    responseLowDescription: "",
    kpiService: "",
    kpiMeasurementPeriod: "",
    kpiDescription: "",
    termEndDate: "",
    earlyTerminationDays: "",
    signatoryClientName: "",
    signatoryClientTitle: "",
    signatoryClientDate: "",
    signatoryProviderName: "",
    signatoryProviderTitle: "",
    signatoryProviderDate: "",
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

    // Write SLA verbatim, substituting fields where natural
    write("SERVICE LEVEL AGREEMENT", 14, true, true);
    write("\n");

    write("1. COMMENCEMENT AND PARTIES", 12, true);
    write(`This Service Level Agreement (the \"Agreement\") is made and entered into as of ${formData.effectiveDate || "[Effective Date]"} (the \"Effective Date\"), by and between:`);
    write(`${formData.serviceProviderName || "[Party Name]"}, having its principal place of business at ${formData.serviceProviderAddress || "[Address/Location]"}, hereinafter referred to as the \"Service Provider\";`);
    write("AND");
    write(`${formData.clientName || "[Party Name]"}, having its principal place of business at ${formData.clientAddress || "[Address/Location]"}, hereinafter referred to as the \"Client\".`);
    write("This Agreement governs the provision of " + (formData.serviceType || "[Type of Services]") + " by the Service Provider and forms an integral part of the Master Service Agreement (\"MSA\") together with the applicable Statement of Work (\"SoW\"). In the event of any inconsistency, the provisions of the MSA shall prevail unless expressly stated otherwise herein. This Agreement sets forth the agreed service levels and defines the respective rights, duties, and obligations of the Parties in relation thereto.");

    write("\n");
    write("2. SERVICES, OBLIGATIONS, AND SERVICE LEVELS", 12, true);
    write("2.1 Services");
    write(`The services covered under this Agreement shall include, but not be limited to: ${formData.serviceDescription || "[Service Description]"}, together with any additional services specified in the MSA and/or SoW, all of which are hereby incorporated by reference.`);

    write("2.2 Client Obligations");
    write("In consideration of the services provided hereunder, the Client shall comply with the following obligations, without limitation:");
    write(formData.clientObligations || "[Client Obligations]");

    write("2.3 Service Provider Obligations");
    write("The Service Provider shall perform the Services in a professional, diligent, and timely manner and shall be obligated to:");
    write(formData.providerObligations || "[Service Provider Obligations]");

    write("2.4 Service Levels");
    write("The Service Provider agrees to meet the following minimum service levels:");
    write(`•Service: ${formData.specificService || "[Specific Service]"}`);
    write(`•Duration: ${formData.duration || "[Time Period]"} (being the maximum time within which the Service must be delivered)`);
    write(`•Service Level Standard: ${formData.serviceLevelStandard || "[Minimum Standard of Performance]"}`);
    write(`•Service Credit: ${formData.serviceCredit || "[Credit Amount / Formula]"}`);
    write("In the event of failure by the Service Provider to meet the agreed service levels, the Client shall be entitled solely to the service credits specified herein. Such credits shall be reflected in the subsequent invoice or paid within thirty (30) days of confirmation of the service level failure. Save as expressly provided herein, service credits shall constitute the Client’s exclusive remedy for any service level breach.");

    write("\n");
    write("3. RESPONSE TIMES", 12, true);
    write("The Service Provider undertakes to respond to service-related notifications from the Client within the following timeframes:");
    write(`•High Priority Issues: Response within ${formData.responseHighTimeframe || "[Timeframe]"} from receipt of notice for matters including but not limited to: ${formData.responseHighDescription || "[Issue Description]"}.`);
    write(`•Medium Priority Issues: Response within ${formData.responseMediumTimeframe || "[Timeframe]"} from receipt of notice for matters including but not limited to: ${formData.responseMediumDescription || "[Issue Description]"}.`);
    write(`•Low Priority Issues: Response within ${formData.responseLowTimeframe || "[Timeframe]"} from receipt of notice for matters including but not limited to: ${formData.responseLowDescription || "[Issue Description]"}.`);
    write("All response times shall be calculated from the time of formal notification by the Client through agreed communication channels.");

    write("\n");
    write("4. KEY PERFORMANCE INDICATORS (KPIs)", 12, true);
    write("For the purposes of this Agreement, Key Performance Indicators (\"KPIs\") are qualitative and quantitative measurements of performance that are not subject to service credits. The Service Provider shall endeavor to meet the following KPIs within the respective time periods:");
    write(`•Service: ${formData.kpiService || "[Specific Service]"}`);
    write(`•Measurement Period: ${formData.kpiMeasurementPeriod || "[Time Period]"}`);
    write(`•KPI Description: ${formData.kpiDescription || "[KPI Metric and Performance Standard]"}`);
    write("Failure to meet KPIs shall not automatically constitute a breach of this Agreement unless expressly specified in the MSA or SoW.");

    write("\n\n\n");
    write("5. TERM AND TERMINATION", 12, true);
    write("5.1 Term");
    write(`This Agreement shall commence on the Effective Date and shall remain in force until ${formData.termEndDate || "[Termination Date]"}, unless earlier terminated in accordance with this Clause.`);
    write("5.2 Early Termination");
    write(`Either Party may terminate this Agreement, with or without cause, by providing not less than ${formData.earlyTerminationDays || "[Number]"} days’ prior written notice to the other Party. Termination shall not affect any rights or obligations accrued prior to the effective date of termination.`);

    write("\n");
    write("6. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties hereto have executed this Service Level Agreement on the date first written above.");
    write("For and on behalf of the Client:");
    write(`Name: ${formData.signatoryClientName || "[Signatory Name]"}`);
    write(`Designation: ${formData.signatoryClientTitle || "[Title]"}`);
    write(`Date: ${formData.signatoryClientDate || "[Date]"}`);
    write("For and on behalf of the Service Provider:");
    write(`Name: ${formData.signatoryProviderName || "[Signatory Name]"}`);
    write(`Designation: ${formData.signatoryProviderTitle || "[Title]"}`);
    write(`Date: ${formData.signatoryProviderDate || "[Date]"}`);

    doc.save("Service_Level_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Commencement & Parties</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Service Provider - Name</Label>
              <Input name="serviceProviderName" value={formData.serviceProviderName} onChange={handleChange} />
              <Label>Service Provider - Address/Location</Label>
              <Textarea name="serviceProviderAddress" value={formData.serviceProviderAddress} onChange={handleChange} />

              <Label className="pt-2">Client - Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client - Address/Location</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label className="pt-2">Type of Services</Label>
              <Input name="serviceType" value={formData.serviceType} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services, Obligations & Service Levels</h3>
              <Label>Service Description</Label>
              <Textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} />

              <Label className="pt-2">Client Obligations</Label>
              <Textarea name="clientObligations" value={formData.clientObligations} onChange={handleChange} />

              <Label className="pt-2">Service Provider Obligations</Label>
              <Textarea name="providerObligations" value={formData.providerObligations} onChange={handleChange} />

              <Label className="pt-2">Service (specific)</Label>
              <Input name="specificService" value={formData.specificService} onChange={handleChange} />
              <Label>Duration</Label>
              <Input name="duration" value={formData.duration} onChange={handleChange} />
              <Label>Service Level Standard</Label>
              <Input name="serviceLevelStandard" value={formData.serviceLevelStandard} onChange={handleChange} />
              <Label>Service Credit</Label>
              <Input name="serviceCredit" value={formData.serviceCredit} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Response Times & KPIs</h3>

              <Label>High Priority - Response Timeframe</Label>
              <Input name="responseHighTimeframe" value={formData.responseHighTimeframe} onChange={handleChange} />
              <Label>High Priority - Issue Description</Label>
              <Input name="responseHighDescription" value={formData.responseHighDescription} onChange={handleChange} />

              <Label className="pt-2">Medium Priority - Response Timeframe</Label>
              <Input name="responseMediumTimeframe" value={formData.responseMediumTimeframe} onChange={handleChange} />
              <Label>Medium Priority - Issue Description</Label>
              <Input name="responseMediumDescription" value={formData.responseMediumDescription} onChange={handleChange} />

              <Label className="pt-2">Low Priority - Response Timeframe</Label>
              <Input name="responseLowTimeframe" value={formData.responseLowTimeframe} onChange={handleChange} />
              <Label>Low Priority - Issue Description</Label>
              <Input name="responseLowDescription" value={formData.responseLowDescription} onChange={handleChange} />

              <Label className="pt-2">KPI - Service</Label>
              <Input name="kpiService" value={formData.kpiService} onChange={handleChange} />
              <Label>KPI - Measurement Period</Label>
              <Input name="kpiMeasurementPeriod" value={formData.kpiMeasurementPeriod} onChange={handleChange} />
              <Label>KPI - Description</Label>
              <Textarea name="kpiDescription" value={formData.kpiDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term & Signatories</h3>

              <Label>Termination Date</Label>
              <Input type="date" name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Early Termination Notice (days)</Label>
              <Input name="earlyTerminationDays" value={formData.earlyTerminationDays} onChange={handleChange} />

              <hr />

              <Label>Client Signatory - Name</Label>
              <Input name="signatoryClientName" value={formData.signatoryClientName} onChange={handleChange} />
              <Label>Client Signatory - Title</Label>
              <Input name="signatoryClientTitle" value={formData.signatoryClientTitle} onChange={handleChange} />
              <Label>Client Signatory - Date</Label>
              <Input type="date" name="signatoryClientDate" value={formData.signatoryClientDate} onChange={handleChange} />

              <hr />

              <Label>Service Provider Signatory - Name</Label>
              <Input name="signatoryProviderName" value={formData.signatoryProviderName} onChange={handleChange} />
              <Label>Service Provider Signatory - Title</Label>
              <Input name="signatoryProviderTitle" value={formData.signatoryProviderTitle} onChange={handleChange} />
              <Label>Service Provider Signatory - Date</Label>
              <Input type="date" name="signatoryProviderDate" value={formData.signatoryProviderDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Service Level Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
