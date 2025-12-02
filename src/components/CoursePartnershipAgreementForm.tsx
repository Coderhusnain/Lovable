import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  instructorName: string;
  expertName: string;
  platformName: string;
  platformTermsUrl: string;

  // Purpose & Scope
  purposeNote: string;

  // Services & schedule
  servicesDescription: string;
  completionDates: string;
  expertCommitmentNote: string;
  coursePricingGuidelines: string;
  pricingGuidelinesUrl: string;
  qualityStandardsNote: string;

  // Revenue & confidentiality
  revenueSharePercent: string;
  netRevenueDefinition: string;
  revenueTerm: string;
  confidentialityDurationYears: string;

  // Marketing & promotion
  marketingToolsNote: string;
  dealsProgramNote: string;
  marketingBoostNote: string;

  // Ownership & IP
  independentContractorNote: string;
  taxesNote: string;
  intellectualPropertyNote: string;
  representationsNote: string;

  // Term, termination & dispute
  termEndDate: string;
  terminationNote: string;
  governingLaw: string;
  disputeResolutionNote: string;

  // Misc / boilerplate
  entireAgreementNote: string;
  amendmentNote: string;
  severabilityNote: string;
  waiverNote: string;

  // Signatures
  instructorSignName: string;
  instructorSignTitle: string;
  instructorSignDate: string;
  expertSignName: string;
  expertSignTitle: string;
  expertSignDate: string;
}

export default function CoursePartnershipAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    instructorName: "",
    expertName: "",
    platformName: "[name of platform]",
    platformTermsUrl: "",

    purposeNote: "",

    servicesDescription: "",
    completionDates: "",
    expertCommitmentNote: "",
    coursePricingGuidelines: "",
    pricingGuidelinesUrl: "",
    qualityStandardsNote: "",

    revenueSharePercent: "",
    netRevenueDefinition: "",
    revenueTerm: "",

    confidentialityDurationYears: "2",

    marketingToolsNote: "",
    dealsProgramNote: "Deals Program",
    marketingBoostNote: "Marketing Boost Program",

    independentContractorNote:
      "The Expert shall perform the Services as an independent contractor. Nothing in this Agreement shall be construed to create an employment, agency, or fiduciary relationship. The Expert has no authority to bind or obligate the Instructor in any manner.",
    taxesNote: "All fees payable under this Agreement are exclusive of taxes, duties, or other governmental charges. Each Party is solely responsible for its own tax obligations.",
    intellectualPropertyNote: "All course content, materials, and work produced under this Agreement shall remain the exclusive property of the Instructor unless otherwise agreed in writing.",
    representationsNote: "Each Party represents and warrants that it has the full authority to enter into this Agreement and to perform its obligations in accordance with the terms herein.",

    termEndDate: "",
    terminationNote: "This Agreement shall commence on the Effective Date and remain in force until completion of the Services or [Insert Termination Date], unless earlier terminated by mutual written consent or for cause. Termination shall not relieve either Party of obligations relating to confidentiality or intellectual property accrued prior to termination.",
    governingLaw: "",
    disputeResolutionNote:
      "This Agreement shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or relating to this Agreement shall first be attempted to be resolved through good faith negotiations. If unresolved, the Parties may seek resolution through mediation or other mutually agreed Alternative Dispute Resolution procedures.",

    entireAgreementNote:
      "This Agreement, together with party’s Terms of Use, constitutes the entire agreement between the Parties concerning the subject matter herein and supersedes all prior discussions, agreements, or understandings, whether oral or written.",
    amendmentNote: "Any modification or amendment must be made in writing and signed by both Parties.",
    severabilityNote: "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
    waiverNote: "Failure to enforce any provision of this Agreement shall not constitute a waiver of the right to enforce it in the future.",

    instructorSignName: "",
    instructorSignTitle: "",
    instructorSignDate: "",
    expertSignName: "",
    expertSignTitle: "",
    expertSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
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

    // === COURSE PARTNERSHIP AGREEMENT CONTENT ===
    addText("COURSE PARTNERSHIP AGREEMENT", 14, true, true);
    addText("\n");

    addText(
      `This Course Partnership Agreement (the "Agreement") is entered into as of ${formData.effectiveDate || "[Effective Date]"}, by and between:`
    );
    addText(`• ${formData.instructorName || "[Instructor Name]"} (hereinafter referred to as the "Instructor"); and`);
    addText(`• ${formData.expertName || "[Expert Name]"} (hereinafter referred to as the "Expert").`);
    addText(
      `Collectively, the Instructor and Expert may be referred to as the "Parties" or individually as a "Party."`
    );
    addText("\n");

    addText(
      `WHEREAS, the Expert wishes to provide assistance in delivering a localized experience of the Instructor’s English language course(s) offered on the ${formData.platformName || "----------<name of platform>"}; and`
    );
    addText(
      `WHEREAS, the Parties desire to set forth the terms and conditions governing their respective rights, obligations, and relationship in connection with the services provided;`
    );
    addText("NOW, THEREFORE, in consideration of the mutual promises and covenants herein, the Parties agree as follows:");
    addText("\n");

    addText("1. PURPOSE", 12, true);
    addText(
      `The purpose of this Agreement is to define the terms under which the Expert shall assist the Instructor in localizing, delivering, and promoting the Instructor’s course(s) on said platform.`
    );
    addText(
      `This Agreement shall be subject to ${formData.platformTermsUrl || "------------- Terms & Conditions, Terms of Use, Privacy Policy, and Copyright Policy as published at -------------------"}. In the event of any conflict between the terms of this Agreement and the Udemy Terms of Use, the provisions of this Agreement shall govern.`
    );
    if (formData.purposeNote) addText(formData.purposeNote);
    addText("\n");

    addText("2. PROGRAM SCOPE AND SERVICES", 12, true);
    addText("2.1 Services");
    addText(
      `${formData.servicesDescription || "The Instructor shall provide the following services for the course(s) indicated below (the \"Services\") on the completion date(s) set forth:"}`
    );
    addText("\n2.2 Expert’s Commitment");
    addText(
      `${formData.expertCommitmentNote || "The Expert shall use commercially reasonable efforts to complete the Services by the agreed Completion Date(s)."}`
    );
    addText("\n2.3 Course Pricing");
    addText(
      `The Parties agree that course pricing shall conform to ${formData.coursePricingGuidelines || "------------Course Pricing Guidelines"}, as currently set forth at ${formData.pricingGuidelinesUrl || "--------------"}, recognizing that such guidelines may change from time to time.`
    );
    addText("\n2.4 Quality Standards");
    addText(
      `${formData.qualityStandardsNote || "The Parties shall work in good faith, provide constructive feedback to one another, and ensure that all Proposed Courses comply with quality control standards."}`
    );
    addText("\n");

    addText("3. REVENUE SHARE", 12, true);
    addText(
      `The Instructor agrees to provide the Expert with ${formData.revenueSharePercent || "[●]%"} of Net Revenue, as defined herein: ${formData.netRevenueDefinition || "[Insert Definition of Net Revenue]"}, for the period of ${formData.revenueTerm || "[Insert Term]"} .`
    );
    addText("\n");

    addText("4. CONFIDENTIALITY", 12, true);
    addText("4.1 Definition of Confidential Information");
    addText(
      `"Confidential Information" includes all written or otherwise documented information communicated by one Party to the other, whether before or during the term of this Agreement, which is:`
    );
    addText("(a) marked as confidential or proprietary, or reasonably understood to be confidential given its nature and the circumstances of disclosure; or");
    addText("(b) relating to customers, human resources, finances, operations, inventory, purchasing, merchandising, plans, strategies, or forecasts.");
    addText("\n4.2 Obligations");
    addText("Each Party agrees to:");
    addText("(a) use Confidential Information solely for the purposes of this Agreement;");
    addText("(b) restrict disclosure to employees, agents, or representatives with a need to know;");
    addText("(c) advise such personnel of their confidentiality obligations; and");
    addText("(d) take reasonable precautions to prevent unauthorized disclosure.");
    addText("\n4.3 Exclusions");
    addText("Confidentiality obligations shall not apply to information that:");
    addText("(i) is publicly known or becomes available through no breach of this Agreement;");
    addText("(ii) is already known by or available to the receiving Party; or");
    addText("(iii) is required to be disclosed by law, regulation, court order, or other legal process.");
    addText("\n4.4 Duration");
    addText(
      `The confidentiality obligations herein shall remain in effect for ${formData.confidentialityDurationYears || "2"} (2) years following the return of Confidential Information to the disclosing Party or the termination of this Agreement, whichever is later.`
    );
    addText("\n");

    addText("5. MARKETING AND PROMOTION", 12, true);
    addText(
      `The Parties agree to utilize the following tools and mutually agreed promotional methods to market the Proposed Courses:`
    );
    addText(`${formData.dealsProgramNote || "--------- Deals Program"}`);
    addText(`${formData.marketingBoostNote || "-----------Marketing Boost Program"}`);
    addText(`${formData.marketingToolsNote || "Each Party agrees to collaborate in promoting the courses through these programs and other agreed marketing initiatives."}`);
    addText("\n");

    addText("6. OWNERSHIP, INTELLECTUAL PROPERTY, AND REPRESENTATIONS", 12, true);
    addText("6.1 Independent Contractor");
    addText(formData.independentContractorNote);
    addText("\n6.2 Taxes");
    addText(formData.taxesNote);
    addText("\n6.3 Intellectual Property Rights");
    addText(formData.intellectualPropertyNote);
    addText("\n6.4 Representations and Warranties");
    addText(formData.representationsNote);
    addText("\n");

    addText("7. TERM AND TERMINATION", 12, true);
    addText(
      `${formData.termEndDate || "This Agreement shall commence on the Effective Date and remain in force until completion of the Services or [Insert Termination Date], unless earlier terminated by mutual written consent or for cause."} Termination shall not relieve either Party of obligations relating to confidentiality or intellectual property accrued prior to termination.`
    );
    if (formData.terminationNote) addText(formData.terminationNote);
    addText("\n");

    addText("8. GOVERNING LAW AND DISPUTE RESOLUTION", 12, true);
    addText(formData.disputeResolutionNote);
    addText("\n");

    addText("9. MISCELLANEOUS", 12, true);
    addText("9.1 Entire Agreement");
    addText(formData.entireAgreementNote);
    addText("\n9.2 Amendment");
    addText(formData.amendmentNote);
    addText("\n9.3 Severability");
    addText(formData.severabilityNote);
    addText("\n9.4 Waiver");
    addText(formData.waiverNote);
    addText("\n");

    addText("10. SIGNATURES", 12, true);
    addText("INSTRUCTOR:");
    addText(`Name: ${formData.instructorSignName || "__________________________"}`);
    addText(`Title: ${formData.instructorSignTitle || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.instructorSignDate || "__________________________"}`);
    addText("\nEXPERT:");
    addText(`Name: ${formData.expertSignName || "__________________________"}`);
    addText(`Title: ${formData.expertSignTitle || "__________________________"}`);
    addText(`Signature: ________________________`);
    addText(`Date: ${formData.expertSignDate || "__________________________"}`);

    // Save file
    doc.save("Course_Partnership_Agreement.pdf");
    setPdfGenerated(true);
    setStep(6);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Basic Info</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Instructor Name</Label>
              <Input name="instructorName" value={formData.instructorName} onChange={handleChange} />
              <Label>Expert Name</Label>
              <Input name="expertName" value={formData.expertName} onChange={handleChange} />
              <Label>Platform Name</Label>
              <Input name="platformName" value={formData.platformName} onChange={handleChange} />
              <Label>Platform Terms / URL (optional)</Label>
              <Input name="platformTermsUrl" value={formData.platformTermsUrl} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Program Scope & Services</h3>
              <Label>Services Description</Label>
              <textarea
                name="servicesDescription"
                value={formData.servicesDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Completion Dates / Schedule</Label>
              <Input name="completionDates" value={formData.completionDates} onChange={handleChange} />
              <Label>Expert Commitment Note</Label>
              <Input name="expertCommitmentNote" value={formData.expertCommitmentNote} onChange={handleChange} />
              <Label>Course Pricing Guidelines</Label>
              <Input name="coursePricingGuidelines" value={formData.coursePricingGuidelines} onChange={handleChange} />
              <Label>Pricing Guidelines URL</Label>
              <Input name="pricingGuidelinesUrl" value={formData.pricingGuidelinesUrl} onChange={handleChange} />
              <Label>Quality Standards Note</Label>
              <textarea
                name="qualityStandardsNote"
                value={formData.qualityStandardsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Revenue & Confidentiality</h3>
              <Label>Revenue Share (%)</Label>
              <Input name="revenueSharePercent" value={formData.revenueSharePercent} onChange={handleChange} />
              <Label>Definition of Net Revenue</Label>
              <textarea
                name="netRevenueDefinition"
                value={formData.netRevenueDefinition}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Revenue Term</Label>
              <Input name="revenueTerm" value={formData.revenueTerm} onChange={handleChange} />
              <Label>Confidentiality Duration (years)</Label>
              <Input name="confidentialityDurationYears" value={formData.confidentialityDurationYears} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Marketing, IP & Representations</h3>
              <Label>Deals Program Note</Label>
              <Input name="dealsProgramNote" value={formData.dealsProgramNote} onChange={handleChange} />
              <Label>Marketing Boost Program Note</Label>
              <Input name="marketingBoostNote" value={formData.marketingBoostNote} onChange={handleChange} />
              <Label>Other Marketing Tools / Note</Label>
              <textarea
                name="marketingToolsNote"
                value={formData.marketingToolsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Independent Contractor / Taxes / IP Notes (custom)</Label>
              <textarea
                name="independentContractorNote"
                value={formData.independentContractorNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Representations & Warranties (custom)</Label>
              <textarea
                name="representationsNote"
                value={formData.representationsNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term, Dispute & Boilerplate</h3>
              <Label>Term / Termination Note</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Termination Note (override)</Label>
              <textarea
                name="terminationNote"
                value={formData.terminationNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Dispute Resolution Note</Label>
              <textarea
                name="disputeResolutionNote"
                value={formData.disputeResolutionNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Instructor - Name</Label>
              <Input name="instructorSignName" value={formData.instructorSignName} onChange={handleChange} />
              <Label>Instructor - Title</Label>
              <Input name="instructorSignTitle" value={formData.instructorSignTitle} onChange={handleChange} />
              <Label>Instructor - Date</Label>
              <Input name="instructorSignDate" value={formData.instructorSignDate} onChange={handleChange} />
              <hr />
              <Label>Expert - Name</Label>
              <Input name="expertSignName" value={formData.expertSignName} onChange={handleChange} />
              <Label>Expert - Title</Label>
              <Input name="expertSignTitle" value={formData.expertSignTitle} onChange={handleChange} />
              <Label>Expert - Date</Label>
              <Input name="expertSignDate" value={formData.expertSignDate} onChange={handleChange} />
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

        {step < 6 ? (
          <Button onClick={() => setStep((s) => Math.min(6, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 7 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Course Partnership Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
