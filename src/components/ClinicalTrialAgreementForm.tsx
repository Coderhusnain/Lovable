import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  institutionName: string;
  institutionAddress: string;
  sponsorName: string;
  sponsorAddress: string;
  product: string;
  protocolTitle: string;
  principalInvestigator: string;
  startDate: string;
  endDate: string;
  terminationNoticeDays: string;
  paymentAmount: string;
  paymentTerms: string;
  confidentialityPeriod: string;
  publicationConsent: string;
  inventionsOwnership: string;
  dataOwnership: string;
  indemnityClause: string;
  subjectInjuryClause: string;
  useOfNameClause: string;
  governingLaw: string;
  amendmentClause: string;
  assignmentClause: string;
  signInstitutionName: string;
  signInstitutionTitle: string;
  signInstitutionDate: string;
  signSponsorName: string;
  signSponsorTitle: string;
  signSponsorDate: string;
}

export default function ClinicalTrialAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    institutionName: "",
    institutionAddress: "",
    sponsorName: "",
    sponsorAddress: "",
    product: "",
    protocolTitle: "",
    principalInvestigator: "",
    startDate: "",
    endDate: "",
    terminationNoticeDays: "30",
    paymentAmount: "",
    paymentTerms: "Paid on completion unless otherwise agreed",
    confidentialityPeriod: "5 years",
    publicationConsent: "Sponsor approval required prior to publication; except as required by law.",
    inventionsOwnership:
      "Ownership determined under applicable patent law; parties will negotiate licences if needed.",
    dataOwnership: "Institution owns source documents; Sponsor granted non-exclusive license to use data.",
    indemnityClause:
      "Sponsor shall indemnify, defend and hold harmless the Institution and its officers, employees and agents from claims arising from the Trial as set out in the Agreement.",
    subjectInjuryClause:
      "Sponsor shall pay reasonable medical and hospital expenses for injuries directly attributable to investigational product or study procedures.",
    useOfNameClause:
      "Neither party shall use the other’s name, logo, or trademarks in publicity without written consent.",
    governingLaw: "",
    amendmentClause: "This Agreement may be amended only by written instrument signed by both Parties.",
    assignmentClause: "No assignment without prior written consent of the Sponsor.",
    signInstitutionName: "",
    signInstitutionTitle: "",
    signInstitutionDate: "",
    signSponsorName: "",
    signSponsorTitle: "",
    signSponsorDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const write = (doc: jsPDF, state: { y: number }, text: string, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
    const margin = 40;
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin * 2;
    const size = opts?.size ?? 11;
    doc.setFont("times", opts?.bold ? ("bold" as any) : ("normal" as any));
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      if (state.y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        state.y = margin;
      }
      if (opts?.center) {
        const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
        const tx = (pageW - tw) / 2;
        doc.text(line, tx, state.y);
      } else {
        doc.text(line, margin, state.y);
      }
      state.y += size * 1.35;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const state = { y: 40 };

    write(doc, state, "CLINICAL TRIAL AGREEMENT", { size: 14, bold: true, center: true });
    write(doc, state, "\n");

    write(
      doc,
      state,
      `This Clinical Trial Agreement (the “Agreement”) is made effective as of ${formData.effectiveDate || "__________"} (the “Effective Date”), by and between ${formData.institutionName ||
        "[Institution]"} (the “Institution”) and ${formData.sponsorName || "[Sponsor]"} (the “Sponsor”).`
    );

    write(doc, state, "\n1. PARTIES AND SUBJECT MATTER", { size: 12, bold: true });
    write(
      doc,
      state,
      `The Sponsor is engaged in research, development and commercialisation of ${formData.product || "[Product]"}. The Institution shall conduct a clinical trial (the “Trial”) of the Sponsor’s ${formData.product ||
        "[Drug/Device]"} in accordance with the clinical protocol titled "${formData.protocolTitle || "[Protocol Title]"}" attached as Exhibit A. ${formData.principalInvestigator ||
        "[Principal Investigator]"} shall serve as Principal Investigator.`
    );

    write(doc, state, "\n2. SCOPE OF WORK AND TERM", { size: 12, bold: true });
    write(doc, state, `The Principal Investigator shall conduct the Trial in compliance with Good Clinical Practice (GCP), 21 CFR, the approved Protocol and all applicable laws.`);
    write(doc, state, `This Agreement commences on ${formData.startDate || "__________"} and continues until ${formData.endDate || "__________"}, unless earlier terminated. Either Party may terminate with ${formData.terminationNoticeDays || "___"} days' written notice.`);
    write(doc, state, "\n");

    write(doc, state, "3. PAYMENT AND CONFIDENTIALITY", { size: 12, bold: true });
    write(doc, state, `Payment: Sponsor shall pay Institution $${formData.paymentAmount || "[Amount]"} in accordance with: ${formData.paymentTerms || "[Payment terms]"}. Sponsor shall be responsible for collection costs for delayed payments.`);
    write(doc, state, `\nConfidentiality: Institution agrees not to disclose Sponsor confidential information for ${formData.confidentialityPeriod || "[period]"} except as required for Trial conduct or by law. Exceptions include information known prior, independently developed, or publicly available.`);
    write(doc, state, `\nPublication: Institution shall not publish Trial results or Sponsor confidential information without Sponsor's prior written consent, except as required by law.`);

    write(doc, state, "\n4. PROPRIETARY AND INVENTION RIGHTS", { size: 12, bold: true });
    write(doc, state, `Inventions: Ownership of inventions arising from the Trial shall be determined under applicable patent law. ${formData.inventionsOwnership}`);
    write(doc, state, `\nData and Proprietary Rights: Institution retains ownership of original source documents. Sponsor deliverables remain Sponsor property. Data generated by the Trial shall be the property of the Institution; Sponsor is granted a non-exclusive, royalty-free license to use such data for lawful purposes. ${formData.dataOwnership}`);

    write(doc, state, "\n5. INDEMNIFICATION AND SUBJECT INJURY", { size: 12, bold: true });
    write(doc, state, `${formData.indemnityClause}`);
    write(doc, state, `\nSubject Injury: ${formData.subjectInjuryClause}`);

    write(doc, state, "\n6. GENERAL PROVISIONS", { size: 12, bold: true });
    write(doc, state, `Use of Name: ${formData.useOfNameClause}`);
    write(doc, state, `\nGoverning Law: This Agreement shall be governed by the laws of ${formData.governingLaw || "[State]"}.`);
    write(doc, state, `\nAmendment: ${formData.amendmentClause}`);
    write(doc, state, `\nAssignment: ${formData.assignmentClause}`);
    write(doc, state, `\nAttorneys' Fees: In legal proceedings to enforce this Agreement, the prevailing party shall be entitled to recover reasonable attorneys' fees and costs.`);

    write(doc, state, "\nSIGNATORIES", { size: 12, bold: true });
    write(doc, state, `IN WITNESS WHEREOF, the Parties have executed this Clinical Trial Agreement as of the Effective Date first written above.`);
    write(doc, state, `\n\nFor the Institution:\nName: ${formData.signInstitutionName || "_______________________"}\nTitle: ${formData.signInstitutionTitle || "_______________________"}\nDate: ${formData.signInstitutionDate || "_______________________"}`);
    write(doc, state, `\n\nFor the Sponsor:\nName: ${formData.signSponsorName || "_______________________"}\nTitle: ${formData.signSponsorTitle || "_______________________"}\nCompany: ${formData.sponsorName || "[Sponsor]"}\nDate: ${formData.signSponsorDate || "_______________________"}`);

    doc.save("Clinical_Trial_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Protocol</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Institution</h4>
              <Label>Name</Label>
              <Input name="institutionName" value={formData.institutionName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="institutionAddress" value={formData.institutionAddress} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Sponsor</h4>
              <Label>Name</Label>
              <Input name="sponsorName" value={formData.sponsorName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="sponsorAddress" value={formData.sponsorAddress} onChange={handleChange} />

              <Label>Product (Drug/Device)</Label>
              <Input name="product" value={formData.product} onChange={handleChange} />
              <Label>Protocol Title</Label>
              <Input name="protocolTitle" value={formData.protocolTitle} onChange={handleChange} />
              <Label>Principal Investigator</Label>
              <Input name="principalInvestigator" value={formData.principalInvestigator} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Trial Details & Compliance</h3>
              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>End Date</Label>
              <Input name="endDate" value={formData.endDate} onChange={handleChange} />
              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />
              <Label>Payment Amount ($)</Label>
              <Input name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
              <Label>Payment Terms</Label>
              <Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Confidentiality & IP</h3>
              <Label>Confidentiality Period</Label>
              <Input name="confidentialityPeriod" value={formData.confidentialityPeriod} onChange={handleChange} />
              <Label>Publication Consent / Rules</Label>
              <Textarea name="publicationConsent" value={formData.publicationConsent} onChange={handleChange} />
              <Label>Inventions / Ownership Summary</Label>
              <Textarea name="inventionsOwnership" value={formData.inventionsOwnership} onChange={handleChange} />
              <Label>Data Ownership & License</Label>
              <Textarea name="dataOwnership" value={formData.dataOwnership} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Indemnity, Legal & Signatures</h3>
              <Label>Indemnity Clause</Label>
              <Textarea name="indemnityClause" value={formData.indemnityClause} onChange={handleChange} />
              <Label>Subject Injury Clause</Label>
              <Textarea name="subjectInjuryClause" value={formData.subjectInjuryClause} onChange={handleChange} />
              <Label>Use of Name Clause</Label>
              <Textarea name="useOfNameClause" value={formData.useOfNameClause} onChange={handleChange} />
              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />
              <Label>Institution - Signatory Name</Label>
              <Input name="signInstitutionName" value={formData.signInstitutionName} onChange={handleChange} />
              <Label>Institution - Title</Label>
              <Input name="signInstitutionTitle" value={formData.signInstitutionTitle} onChange={handleChange} />
              <Label>Institution - Date</Label>
              <Input name="signInstitutionDate" value={formData.signInstitutionDate} onChange={handleChange} />

              <Label>Sponsor - Signatory Name</Label>
              <Input name="signSponsorName" value={formData.signSponsorName} onChange={handleChange} />
              <Label>Sponsor - Title</Label>
              <Input name="signSponsorTitle" value={formData.signSponsorTitle} onChange={handleChange} />
              <Label>Sponsor - Date</Label>
              <Input name="signSponsorDate" value={formData.signSponsorDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Clinical Trial Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
