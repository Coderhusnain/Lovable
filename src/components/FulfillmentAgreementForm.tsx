import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDay: string;
  effectiveMonth: string;
  effectiveYear: string;
  recipientName: string;
  recipientAddress: string;
  providerName: string;
  providerAddress: string;
  commencementDate: string;
  compensationPercent: string;
  retentionNote: string;
  taxesNote: string;
  termDays: string;
  earlyTerminationDays: string;
  terminationForCauseDays: string;
  arbitrationCityState: string;
  governingLawState: string;
  governingLawCounty: string;
  recipientSignatureName: string;
  recipientTitle: string;
  recipientDate: string;
  providerSignatureName: string;
  providerTitle: string;
  providerDate: string;
}

export default function FulfillmentAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDay: "",
    effectiveMonth: "",
    effectiveYear: "",
    recipientName: "",
    recipientAddress: "",
    providerName: "",
    providerAddress: "",
    commencementDate: "",
    compensationPercent: "",
    retentionNote: "",
    taxesNote: "",
    termDays: "",
    earlyTerminationDays: "",
    terminationForCauseDays: "",
    arbitrationCityState: "",
    governingLawState: "",
    governingLawCounty: "",
    recipientSignatureName: "",
    recipientTitle: "",
    recipientDate: "",
    providerSignatureName: "",
    providerTitle: "",
    providerDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          currentY = margin;
        }
        if (isCenter) {
          const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // === FULFILLMENT SERVICES AGREEMENT CONTENT ===
    addText("FULFILLMENT SERVICES AGREEMENT", 14, true, true);

    const effectiveDateStr = `${formData.effectiveDay ? formData.effectiveDay : "___"} day of ${formData.effectiveMonth ? formData.effectiveMonth : "_______"}, ${formData.effectiveYear ? formData.effectiveYear : "20"}`;
    addText(`This Fulfillment Services Agreement (“Agreement”) is made and entered into as of ${effectiveDateStr}, by and between ${formData.recipientName || "[Recipient’s Name/Entity]"}, having its principal place of business at ${formData.recipientAddress || "[Recipient’s Address]"} (hereinafter referred to as the “Recipient”), and ${formData.providerName || "[Provider’s Name/Entity]"}, having its principal place of business at ${formData.providerAddress || "[Provider’s Address]"} (hereinafter referred to as the “Provider”). The Recipient and the Provider are each referred to herein as a “Party” and collectively as the “Parties.”`);
    
    addText("");

    // Section 1: Description of Services
    addText("1. DESCRIPTION OF SERVICES", 12, true);
    addText(`1.1 Scope of Services. Commencing on ${formData.commencementDate || "[Commencement Date]"}, the Provider shall undertake, perform, and discharge all product fulfillment, warehousing, and distribution obligations for the Recipient in accordance with the terms of this Agreement (collectively, the “Services”).`);
    addText("1.2 Specific Responsibilities. Without limiting the generality of the foregoing, the Services shall include:");
    addText("(a) Purchasing, labeling, and re-labeling of the Recipient’s products;");
    addText("(b) Packaging and repackaging of such products in compliance with the Recipient’s specifications and applicable regulatory standards;");
    addText("(c) Inventory control, storage, and shipment coordination;");
    addText("(d) Quality control inspections to ensure that all goods meet established standards;");
    addText("(e) Marketing, sales support, order processing, invoicing, collections, and administrative functions necessary to fulfill customer orders;");
    addText("1.3 Performance Standard. The Provider shall perform the Services with professional skill, care, and diligence consistent with generally accepted industry practices, and shall comply with all applicable federal, state, and local laws, rules, and regulations.");
    addText("");

    // Section 2: Payment Terms
    addText("2. PAYMENT TERMS", 12, true);
    addText(`2.1 Compensation. The Provider shall be entitled to compensation equal to ${formData.compensationPercent || "[__]"} percent (%) of the gross sales revenue generated from the Recipient’s products distributed by the Provider under this Agreement.`);
    addText(`2.2 Retention of Payment. ${formData.retentionNote || "[Retention/offset note]"}`);
    addText(`2.3 Taxes. ${formData.taxesNote || "[Taxes note]"}`);
    addText("");

    // Section 3: Term and Termination
    addText("3. TERM AND TERMINATION", 12, true);
    addText(`3.1 Term. This Agreement shall commence on the Effective Date and continue in full force and effect until the completion of the Services, unless earlier terminated in accordance with this Section.`);
    addText(`3.2 Early Termination. Either Party may terminate this Agreement, with or without cause, upon providing not less than ${formData.earlyTerminationDays || "[_____]"} days’ prior written notice to the other Party.`);
    addText(`3.3 Termination for Cause. Either Party may terminate this Agreement immediately upon written notice if the other Party commits a material breach which remains uncured after ${formData.terminationForCauseDays || "[_____]"} days following receipt of written notice specifying such breach.`);
    addText(`3.4 Obligations Upon Termination. Upon termination, the Provider shall promptly return all inventory, documentation, and property of the Recipient and shall deliver all outstanding work in progress.`);
    addText("");

    // Section 4 to 15: Copy verbatim with placeholders
    const sections = [
      "4. WORK PRODUCT OWNERSHIP\nAll copyrightable works, data, product designs, formulas, processes, marketing materials, or other intellectual property conceived, developed, or produced by the Provider in connection with this Agreement (“Work Product”) shall vest exclusively in the Recipient. The Provider hereby irrevocably assigns to the Recipient all right, title, and interest in and to the Work Product, including any intellectual property rights therein, and agrees to execute such documents as may be necessary to evidence or perfect such ownership.",
      "5. CONFIDENTIALITY\n5.1 Definition. “Confidential Information” means all non-public information, whether written, oral, or electronic, disclosed by either Party to the other, including but not limited to trade secrets, customer data, financial records, product designs, and marketing strategies.\n5.2 Obligations. Each Party agrees to:\n(a) Keep all Confidential Information strictly confidential and use it solely for the purposes of performing under this Agreement;\n(b) Restrict disclosure of such information to its employees or agents who have a need to know and who are bound by confidentiality obligations no less stringent than those contained herein; and\n(c) Protect such information using commercially reasonable measures to prevent unauthorized use or disclosure.\n5.3 Exclusions. Confidential Information does not include information that: (a) was publicly known prior to disclosure; (b) becomes public through no fault of the receiving Party; (c) is independently developed by the receiving Party without use of the disclosing Party’s information; or (d) is required to be disclosed by law, provided the receiving Party gives prompt notice of such requirement.\n5.4 Survival. The obligations under this Section shall survive the termination or expiration of this Agreement.",
      "6. INDEMNIFICATION\n6.1 Provider’s Indemnity. The Provider shall indemnify, defend, and hold harmless the Recipient and its officers, directors, employees, and agents from and against all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to:\n(a) The Provider’s negligent or willful acts or omissions in the performance of the Services;\n(b) Any claim that the Provider’s products or processes infringe any third-party intellectual property rights; or\n(c) Any breach of this Agreement by the Provider.\n6.2 Recipient’s Indemnity. The Recipient shall indemnify, defend, and hold harmless the Provider from and against all losses and liabilities arising from (a) the Recipient’s product specifications or marketing materials, or (b) any breach of its representations, warranties, or obligations herein.",
      "7. LIMITATION OF LIABILITY\n7.1 Exclusion of Certain Damages. In no event shall either Party be liable to the other for any indirect, incidental, consequential, punitive, or special damages, including loss of profits, business interruption, or loss of goodwill, arising from or related to this Agreement, even if advised of the possibility of such damages.\n7.2 Cap on Liability. Except for indemnification obligations, breach of confidentiality, or willful misconduct, each Party’s total aggregate liability under this Agreement shall not exceed the total amount of compensation actually paid to the Provider under this Agreement during the twelve (12) months preceding the event giving rise to the claim.",
      "8. DEFAULT AND REMEDIES\nAn Event of Default shall occur if either Party fails to perform any material obligation hereunder and fails to cure such default within [_____] days after written notice thereof. Upon an Event of Default, the non-defaulting Party may terminate this Agreement and pursue any remedies available at law or in equity.",
      "9. FORCE MAJEURE\nNeither Party shall be deemed in default or liable for failure to perform due to causes beyond its reasonable control, including acts of God, natural disasters, epidemics, labor disputes, or governmental restrictions. The affected Party shall promptly notify the other in writing and make diligent efforts to resume performance.",
      `10. BINDING ARBITRATION\nAny dispute, claim, or controversy arising out of or relating to this Agreement shall be resolved exclusively through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules then in effect. The arbitration shall take place in ${formData.arbitrationCityState || "[City, State]"}, before a single neutral arbitrator, and the award rendered by the arbitrator shall be final and binding. Judgment on the award may be entered in any court of competent jurisdiction. Each Party shall bear its own costs and legal fees unless otherwise awarded by the arbitrator.`,
      `11. GOVERNING LAW\nThis Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState || "[________]"}, without regard to its conflict of laws principles. The Parties expressly consent to the exclusive jurisdiction of the state and federal courts located in ${formData.governingLawCounty || "[County, State]"} for purposes of enforcing any arbitral award or provisional remedies.`,
      "12. NOTICES\nAll notices, demands, and other communications required or permitted under this Agreement shall be in writing and shall be deemed duly given when:\n(a) Delivered personally;\n(b) Sent by registered or certified mail, return receipt requested; or\n(c) Sent by a nationally recognized overnight courier service, to the addresses set forth below, or to such other address as either Party may designate by written notice to the other. Notices shall be deemed received upon delivery or, if mailed, on the third (3rd) business day following deposit.",
      "13. ENTIRE AGREEMENT AND AMENDMENT\nThis Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written. No amendment, modification, or waiver of any provision of this Agreement shall be effective unless made in writing and duly executed by both Parties.",
      "14. SEVERABILITY AND WAIVER\nIf any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The failure of either Party to enforce any right or provision shall not constitute a waiver of that right or provision.",
    ];

    sections.forEach(section => addText(section));

    // Section 15: Signatures
    addText("15. SIGNATURES", 12, true);
    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Fulfillment Services Agreement as of the date first above written.");
    addText("RECIPIENT:");
    addText("Name: " + (formData.recipientSignatureName || "___________________________"));
    addText("Title: " + (formData.recipientTitle || "___________________________"));
    addText("Signature: _______________________");
    addText("Date: " + (formData.recipientDate || "___________________________"));
    addText("PROVIDER:");
    addText("Name: " + (formData.providerSignatureName || "___________________________"));
    addText("Title: " + (formData.providerTitle || "___________________________"));
    addText("Signature: _______________________");
    addText("Date: " + (formData.providerDate || "___________________________"));

    doc.save("Fulfillment_Services_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Effective Date & Parties</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Effective Day</Label>
                  <Input name="effectiveDay" value={formData.effectiveDay} onChange={handleChange} placeholder="___" />
                </div>
                <div>
                  <Label>Effective Month</Label>
                  <Input name="effectiveMonth" value={formData.effectiveMonth} onChange={handleChange} placeholder="_______" />
                </div>
                <div>
                  <Label>Effective Year</Label>
                  <Input name="effectiveYear" value={formData.effectiveYear} onChange={handleChange} placeholder="20" />
                </div>
              </div>

              <hr />

              <h4 className="font-medium">Recipient Information</h4>
              <Label>Recipient Name</Label>
              <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />
              <Label>Recipient Address</Label>
              <textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />

              <hr />

              <h4 className="font-medium">Provider Information</h4>
              <Label>Provider Name</Label>
              <Input name="providerName" value={formData.providerName} onChange={handleChange} />
              <Label>Provider Address</Label>
              <textarea name="providerAddress" value={formData.providerAddress} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Responsibilities</h3>
              <Label>Commencement Date</Label>
              <Input name="commencementDate" value={formData.commencementDate} onChange={handleChange} placeholder="[Commencement Date]" />
              <Label>Retention / Payment Note</Label>
              <Input name="retentionNote" value={formData.retentionNote} onChange={handleChange} placeholder="[Retention/offset note]" />
              <Label>Taxes Note</Label>
              <Input name="taxesNote" value={formData.taxesNote} onChange={handleChange} placeholder="[Taxes note]" />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Term</h3>
              <Label>Compensation (%)</Label>
              <Input name="compensationPercent" value={formData.compensationPercent} onChange={handleChange} placeholder="[__]" />
              <Label>Term (days)</Label>
              <Input name="termDays" value={formData.termDays} onChange={handleChange} placeholder="[Number of days]" />
              <Label>Early Termination Notice (days)</Label>
              <Input name="earlyTerminationDays" value={formData.earlyTerminationDays} onChange={handleChange} placeholder="[_____]"/>
              <Label>Termination for Cause (days)</Label>
              <Input name="terminationForCauseDays" value={formData.terminationForCauseDays} onChange={handleChange} placeholder="[_____]"/>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal Clauses & Signatures</h3>
              <Label>Arbitration City, State</Label>
              <Input name="arbitrationCityState" value={formData.arbitrationCityState} onChange={handleChange} placeholder="[City, State]" />
              <Label>Governing Law (State)</Label>
              <Input name="governingLawState" value={formData.governingLawState} onChange={handleChange} placeholder="[State]" />
              <Label>Governing Law County</Label>
              <Input name="governingLawCounty" value={formData.governingLawCounty} onChange={handleChange} placeholder="[County, State]" />

              <hr />

              <h4 className="font-medium">Recipient Signature</h4>
              <Label>Name</Label>
              <Input name="recipientSignatureName" value={formData.recipientSignatureName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="recipientTitle" value={formData.recipientTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="recipientDate" value={formData.recipientDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Provider Signature</h4>
              <Label>Name</Label>
              <Input name="providerSignatureName" value={formData.providerSignatureName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="providerTitle" value={formData.providerTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="providerDate" value={formData.providerDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>Previous</Button>
        )}
        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={generatePDF}>Generate PDF</Button>
        )}
      </div>
      {pdfGenerated && <p className="text-green-600 mt-2">PDF generated successfully!</p>}
    </div>
  );
}
