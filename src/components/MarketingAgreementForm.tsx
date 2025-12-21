import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  party1Name: string;
  party1Address: string;
  party2Name: string;
  party2Address: string;
  party3Name: string;
  party4Name: string;
  scopeActivities: string;
  reportingRequirements: string;
  trackingAName: string;
  trackingADetails: string;
  trackingBName: string;
  trackingBDetails: string;
  licenseRestrictions: string;
  launchDate: string;
  initialTermMonths: string;
  terminationNoticeDays: string;
  warrantiesText: string;
  indemnificationA: string;
  indemnificationB: string;
  confidentiality: string;
  limitationAmount: string;
  publicityRules: string;
  governingLaw: string;
  recordsRetentionMonths: string;
  signatory1Name: string;
  signatory1Title: string;
  signatory1Date: string;
  signatory2Name: string;
  signatory2Title: string;
  signatory2Date: string;
}

export default function MarketingAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    party1Name: "",
    party1Address: "",
    party2Name: "",
    party2Address: "",
    party3Name: "",
    party4Name: "",
    scopeActivities: "",
    reportingRequirements: "",
    trackingAName: "",
    trackingADetails: "",
    trackingBName: "",
    trackingBDetails: "",
    licenseRestrictions: "",
    launchDate: "",
    initialTermMonths: "6",
    terminationNoticeDays: "30",
    warrantiesText: "",
    indemnificationA: "",
    indemnificationB: "",
    confidentiality: "",
    limitationAmount: "",
    publicityRules: "",
    governingLaw: "",
    recordsRetentionMonths: "12",
    signatory1Name: "",
    signatory1Title: "",
    signatory1Date: "",
    signatory2Name: "",
    signatory2Title: "",
    signatory2Date: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    write("MARKETING AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Marketing Agreement (this “Agreement”), dated as of ${formData.effectiveDate || "__________"} (the “Effective Date”), is entered into by and between ${formData.party1Name || "________________________"}, located at ${formData.party1Address || "________________________"} and ${formData.party2Name || "________________________"}, located at ${formData.party2Address || "________________________"} and ${formData.party3Name || "________________________"} and ${formData.party4Name || "________________________"}.`
    );

    write("\n");
    write("RECITALS", 12, true);
    write(
      "WHEREAS, the Parties desire to establish an exclusive strategic marketing relationship pursuant to which each Party shall promote the other Party’s products and services to its respective customers;"
    );
    write(
      "WHEREAS, this Agreement may be amended only by a written instrument executed by both Parties (an \"Amendment\"), and any Amendment shall be governed by the terms of this Agreement unless expressly stated otherwise."
    );

    write("\n");
    write("NOW, THEREFORE, in consideration of the mutual covenants set forth herein, the Parties agree as follows:");

    write("\n");
    write("1. SCOPE OF ACTIVITIES", 12, true);
    write(
      formData.scopeActivities || "The Parties shall carry out the marketing activities as decided. Each Party acknowledges that its obligations constitute good and valuable consideration for this Agreement."
    );

    write("\n");
    write("2. REPORTING", 12, true);
    write(
      formData.reportingRequirements ||
        "Within ten (10) days following the end of each calendar month during the Term, each Party shall furnish to the other Party (or provide access to) a monthly report containing all data reasonably necessary to determine the value (including but not limited to traffic, completed sales, revenue, and conversions) generated from the activities performed under this Agreement."
    );

    write("\n");
    write("3. TRACKING OF USERS", 12, true);
    write(
      `a. ${formData.trackingAName || "[Party A]"} shall implement and maintain reasonable tracking mechanisms enabling ${formData.trackingAName || "[Party A]"} to accurately identify users linking from the ${formData.trackingAName || "[Party A]"} Site to the ${formData.trackingBName || "[Party B]"} Site and purchasing Services.`
    );
    write("\n");
    write(
      `b. ${formData.trackingBName || "[Party B]"} shall implement and maintain reasonable tracking mechanisms enabling ${formData.trackingBName || "[Party B]"} to accurately identify users linking from the ${formData.trackingBName || "[Party B]"} Site to the ${formData.trackingAName || "[Party A]"} Site and purchasing Services.`
    );

    write("\n");
    write("4. LICENSES", 12, true);
    write(
      formData.licenseRestrictions ||
        "Each Party grants to the other Party a non-exclusive, non-transferable, royalty-free license to use its trade names, trademarks, logos, and service marks (collectively, the \"Marks\") solely in connection with the performance of this Agreement. No Party shall use the other Party’s Marks without prior written approval. No modifications to any Marks may be made without express written consent. All use of the other Party’s Marks shall cease immediately upon request and shall automatically terminate upon expiration or termination of this Agreement."
    );

    write("\n");
    write("5. TERM AND TERMINATION", 12, true);
    write(
      `The term of this Agreement shall commence on the Effective Date and shall continue for ${formData.initialTermMonths || "6"} months (the \"Initial Term\"). The Launch Date shall be ${formData.launchDate || "[Launch Date]"}. Following the Initial Term, this Agreement shall automatically renew for successive ${formData.initialTermMonths || "6"}-month periods (each, a \"Renewal Term\") unless terminated as provided below.`
    );
    write("\n");
    write("a. Termination for Cause");
    write(
      "Either Party may terminate this Agreement immediately upon written notice if the other Party materially defaults and fails to cure such default within thirty (30) days of receiving written notice thereof."
    );
    write("\n");
    write("b. Termination for Convenience");
    write(
      `Either Party may terminate this Agreement for any reason after the Initial Term upon ${formData.terminationNoticeDays || "30"} days’ prior written notice.`
    );
    write("\n");
    write("c. Effect of Termination");
    write(
      "Upon termination or expiration: i. All promotions of the other Party’s services shall immediately cease; ii. Use of any Marks and technology of the other Party shall cease; iii. The other Party’s services shall no longer be displayed or made available through any website, platform, or channel; iv. Upon written request, all confidential materials shall be returned or destroyed. Termination shall not relieve either Party of obligations arising prior to the termination date."
    );

    write("\n");
    write("6. WARRANTIES; DISCLAIMER", 12, true);
    write(
      formData.warrantiesText ||
        "Each Party represents and warrants that it has the authority to enter into this Agreement and that execution and performance will not violate any existing agreement. EXCEPT AS EXPRESSLY PROVIDED HEREIN, EACH PARTY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED."
    );

    write("\n");
    write("7. INDEMNIFICATION", 12, true);
    write(
      `a. Indemnification by ${formData.trackingAName || "[Party A]"}`
    );
    write(
      formData.indemnificationA ||
        `${formData.trackingAName || "[Party A]"} shall indemnify, defend, and hold harmless ${formData.trackingBName || "[Party B]"} and its officers, directors, employees, and agents from all claims, costs, liabilities, and losses arising out of allegations that ${formData.trackingAName || "[Party A]"}’s technology or Marks infringe upon any third-party intellectual property rights.`
    );
    write("\n");
    write(`b. Indemnification by ${formData.trackingBName || "[Party B]"}`);
    write(
      formData.indemnificationB ||
        `${formData.trackingBName || "[Party B]"} shall indemnify, defend, and hold harmless ${formData.trackingAName || "[Party A]"} under the same terms and conditions stated above.`
    );
    write("\n");
    write("c. Procedures");
    write(
      "The indemnified Party shall promptly notify the indemnifying Party of any claim. The indemnifying Party shall control the defense and settlement of the claim. No settlement may be entered that imposes liability or restrictions on the indemnified Party without its written consent. The indemnified Party may participate in the defense at its own cost."
    );

    write("\n");
    write("8. CONFIDENTIALITY", 12, true);
    write(
      formData.confidentiality ||
        "During the Term, the Parties may exchange confidential information. Confidential Information shall be kept strictly confidential and used solely for performance under this Agreement. Required disclosures (e.g., subpoenas) are permitted only with reasonable prior notice to the other Party. Improper disclosure or misuse may cause irreparable harm; injunctive relief is available. Confidentiality obligations shall survive termination of this Agreement."
    );

    write("\n");
    write("9. LIMITATION OF LIABILITY", 12, true);
    write(
      formData.limitationAmount ||
        "NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES. Each Party’s total cumulative liability arising out of this Agreement shall not exceed $-----------, except with respect to obligations under Indemnification and Confidentiality."
    );

    write("\n");
    write("10. PUBLICITY", 12, true);
    write(
      formData.publicityRules ||
        "No public announcement or press release referring to the other Party shall be made without prior written approval, except statements identifying the other Party as a customer or strategic marketing partner."
    );

    write("\n");
    write("11. MISCELLANEOUS", 12, true);
    write(
      `Governing Law: ${formData.governingLaw || "The laws of the State of ________"}. Records: Each Party shall maintain accurate records for ${formData.recordsRetentionMonths || "12"} months following the Term.`
    );

    write("\n");
    write("12. SIGNATORIES", 12, true);
    write("This Agreement is executed by authorized representatives of the Parties as of the Effective Date.");
    write("\n");

    write("Party 1");
    write("By: __________________________");
    write(`Name: ${formData.signatory1Name || "________________________"}`);
    write(`Title: ${formData.signatory1Title || "________________________"}`);
    write(`Date: ${formData.signatory1Date || "________________________"}`);

    write("\n");

    write("Party 2");
    write("By: __________________________");
    write(`Name: ${formData.signatory2Name || "________________________"}`);
    write(`Title: ${formData.signatory2Title || "________________________"}`);
    write(`Date: ${formData.signatory2Date || "________________________"}`);

    doc.save("Marketing_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Party 1 - Name</Label>
              <Input name="party1Name" value={formData.party1Name} onChange={handleChange} />
              <Label>Party 1 - Address</Label>
              <Input name="party1Address" value={formData.party1Address} onChange={handleChange} />

              <Label className="pt-2">Party 2 - Name</Label>
              <Input name="party2Name" value={formData.party2Name} onChange={handleChange} />
              <Label>Party 2 - Address</Label>
              <Input name="party2Address" value={formData.party2Address} onChange={handleChange} />

              <Label className="pt-2">Additional Party 3 - Name</Label>
              <Input name="party3Name" value={formData.party3Name} onChange={handleChange} />
              <Label>Additional Party 4 - Name</Label>
              <Input name="party4Name" value={formData.party4Name} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Scope, Reporting & Tracking</h3>
              <Label>Scope of Activities</Label>
              <Textarea name="scopeActivities" value={formData.scopeActivities} onChange={handleChange} />

              <Label>Reporting Requirements</Label>
              <Textarea name="reportingRequirements" value={formData.reportingRequirements} onChange={handleChange} />

              <Label className="pt-2">Tracking - Party A (name)</Label>
              <Input name="trackingAName" value={formData.trackingAName} onChange={handleChange} />
              <Label>Tracking - Party A (details)</Label>
              <Textarea name="trackingADetails" value={formData.trackingADetails} onChange={handleChange} />

              <Label className="pt-2">Tracking - Party B (name)</Label>
              <Input name="trackingBName" value={formData.trackingBName} onChange={handleChange} />
              <Label>Tracking - Party B (details)</Label>
              <Textarea name="trackingBDetails" value={formData.trackingBDetails} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Licenses, Term & Legal</h3>
              <Label>Licenses / Marks Restrictions</Label>
              <Textarea name="licenseRestrictions" value={formData.licenseRestrictions} onChange={handleChange} />

              <Label className="pt-2">Launch Date</Label>
              <Input type="date" name="launchDate" value={formData.launchDate} onChange={handleChange} />

              <Label>Initial Term (months)</Label>
              <Input name="initialTermMonths" value={formData.initialTermMonths} onChange={handleChange} />

              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label className="pt-2">Warranties / Disclaimer</Label>
              <Textarea name="warrantiesText" value={formData.warrantiesText} onChange={handleChange} />

              <Label className="pt-2">Limitation of Liability Amount</Label>
              <Input name="limitationAmount" value={formData.limitationAmount} onChange={handleChange} />

              <Label className="pt-2">Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label className="pt-2">Records Retention (months)</Label>
              <Input name="recordsRetentionMonths" value={formData.recordsRetentionMonths} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Indemnity, Confidentiality, Publicity & Signatories</h3>
              <Label>Indemnification by Party A</Label>
              <Textarea name="indemnificationA" value={formData.indemnificationA} onChange={handleChange} />

              <Label>Indemnification by Party B</Label>
              <Textarea name="indemnificationB" value={formData.indemnificationB} onChange={handleChange} />

              <Label className="pt-2">Confidentiality</Label>
              <Textarea name="confidentiality" value={formData.confidentiality} onChange={handleChange} />

              <Label className="pt-2">Publicity Rules</Label>
              <Textarea name="publicityRules" value={formData.publicityRules} onChange={handleChange} />

              <hr />

              <Label>Signatory 1 - Name</Label>
              <Input name="signatory1Name" value={formData.signatory1Name} onChange={handleChange} />
              <Label>Signatory 1 - Title</Label>
              <Input name="signatory1Title" value={formData.signatory1Title} onChange={handleChange} />
              <Label>Signatory 1 - Date</Label>
              <Input type="date" name="signatory1Date" value={formData.signatory1Date} onChange={handleChange} />

              <hr />

              <Label>Signatory 2 - Name</Label>
              <Input name="signatory2Name" value={formData.signatory2Name} onChange={handleChange} />
              <Label>Signatory 2 - Title</Label>
              <Input name="signatory2Title" value={formData.signatory2Title} onChange={handleChange} />
              <Label>Signatory 2 - Date</Label>
              <Input type="date" name="signatory2Date" value={formData.signatory2Date} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Marketing Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
