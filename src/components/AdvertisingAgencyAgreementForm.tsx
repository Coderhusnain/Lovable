import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormWizard } from "./FormWizard";

interface FormData {
  effectiveDate: string;
  advertiserName: string;
  advertiserAddress: string;
  advertiserBusiness: string;
  agencyName: string;
  agencyAddress: string;
  agencyBusiness: string;
  productsServices: string;
  commencementDate: string;
  exclusivityScope: string;
  mediaCostsNotes: string;
  commissionPercent: string;
  outdoorCommissionPercent: string;
  thirdPartyCommissionPercent: string;
  hourlyRate: string;
  termEndDate: string;
  terminationNoticeDays: string;
  defaultCureDays: string;
  assignmentClause: string;
  dispositionMaterials: string;
  auditRights: string;
  indemnityClause: string;
  insuranceLimits: string;
  billingStandards: string;
  arbitrationTerms: string;
  governingLaw: string;
  attorneysFeesClause: string;
  signAdvertiserName: string;
  signAdvertiserDate: string;
  signAgencyName: string;
  signAgencyDate: string;
}

export default function AdvertisingAgencyAgreementForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    advertiserName: "",
    advertiserAddress: "",
    advertiserBusiness: "",
    agencyName: "",
    agencyAddress: "",
    agencyBusiness: "",
    productsServices: "",
    commencementDate: "",
    exclusivityScope: "",
    mediaCostsNotes: "",
    commissionPercent: "",
    outdoorCommissionPercent: "",
    thirdPartyCommissionPercent: "",
    hourlyRate: "",
    termEndDate: "",
    terminationNoticeDays: "30",
    defaultCureDays: "30",
    assignmentClause:
      "The Agency shall assign to the Advertiser all rights in contracts and arrangements with third parties made for the Advertiser’s account. Advertiser assumes obligations unless non-assignable.",
    dispositionMaterials:
      "All plans, sketches, copy, artwork, and materials produced under this Agreement shall become the property of the Advertiser upon payment; otherwise remain Agency property until paid.",
    auditRights:
      "Advertiser may inspect relevant contracts, accounts and documents at Advertiser’s expense.",
    indemnityClause:
      "Advertiser shall indemnify and hold Agency harmless from claims arising from advertising; Agency shall indemnify Advertiser for Agency's negligent acts.",
    insuranceLimits: "Agency shall maintain advertising liability insurance with limits of at least $_______.",
    billingStandards: "Agency shall bill according to industry standards and provide itemized invoices.",
    arbitrationTerms:
      "Any dispute shall be resolved by binding arbitration under the Commercial Arbitration Rules. Arbitration decisions are final and binding.",
    governingLaw: "",
    attorneysFeesClause:
      "The prevailing party in enforcement actions shall be entitled to reasonable attorneys' fees and costs.",
    signAdvertiserName: "",
    signAdvertiserDate: "",
    signAgencyName: "",
    signAgencyDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const steps = [
    {
      label: "Parties & Intro",
      content: (
        <>
          <Label>Effective Date</Label>
          <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

          <hr />
          <h4 className="font-medium">Advertiser</h4>
          <Label>Name</Label>
          <Input name="advertiserName" value={formData.advertiserName} onChange={handleChange} />
          <Label>Address</Label>
          <Textarea name="advertiserAddress" value={formData.advertiserAddress} onChange={handleChange} />
          <Label>Business / Description</Label>
          <Input name="advertiserBusiness" value={formData.advertiserBusiness} onChange={handleChange} />

          <hr />
          <h4 className="font-medium">Agency</h4>
          <Label>Name</Label>
          <Input name="agencyName" value={formData.agencyName} onChange={handleChange} />
          <Label>Address</Label>
          <Textarea name="agencyAddress" value={formData.agencyAddress} onChange={handleChange} />
          <Label>Business / Description</Label>
          <Input name="agencyBusiness" value={formData.agencyBusiness} onChange={handleChange} />

          <Label>Products / Services Covered</Label>
          <Textarea name="productsServices" value={formData.productsServices} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.effectiveDate && formData.advertiserName && formData.agencyName),
    },
    {
      label: "Services & Costs",
      content: (
        <>
          <Label>Commencement Date</Label>
          <Input name="commencementDate" value={formData.commencementDate} onChange={handleChange} />

          <Label>Exclusivity Scope</Label>
          <Textarea name="exclusivityScope" value={formData.exclusivityScope} onChange={handleChange} />

          <Label>Media Costs / Notes</Label>
          <Textarea name="mediaCostsNotes" value={formData.mediaCostsNotes} onChange={handleChange} />

          <Label>Commission % (media)</Label>
          <Input name="commissionPercent" value={formData.commissionPercent} onChange={handleChange} />

          <Label>Outdoor Commission %</Label>
          <Input name="outdoorCommissionPercent" value={formData.outdoorCommissionPercent} onChange={handleChange} />

          <Label>Third-Party Commission %</Label>
          <Input name="thirdPartyCommissionPercent" value={formData.thirdPartyCommissionPercent} onChange={handleChange} />

          <Label>Hourly Rate (non-commission items)</Label>
          <Input name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.commencementDate && formData.commissionPercent),
    },
    {
      label: "Term, Termination & Legal",
      content: (
        <>
          <Label>Term End Date / Review</Label>
          <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />

          <Label>Termination Notice (days)</Label>
          <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

          <Label>Default Cure Period (days)</Label>
          <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />

          <Label>Assignment Clause</Label>
          <Textarea name="assignmentClause" value={formData.assignmentClause} onChange={handleChange} />

          <Label>Disposition of Materials</Label>
          <Textarea name="dispositionMaterials" value={formData.dispositionMaterials} onChange={handleChange} />

          <Label>Audit Rights</Label>
          <Textarea name="auditRights" value={formData.auditRights} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.termEndDate && formData.terminationNoticeDays),
    },
    {
      label: "Insurance, Billing, Dispute & Signatures",
      content: (
        <>
          <Label>Indemnity Clause</Label>
          <Textarea name="indemnityClause" value={formData.indemnityClause} onChange={handleChange} />

          <Label>Insurance Limits / Requirements</Label>
          <Input name="insuranceLimits" value={formData.insuranceLimits} onChange={handleChange} />

          <Label>Billing Standards / Notes</Label>
          <Textarea name="billingStandards" value={formData.billingStandards} onChange={handleChange} />

          <Label>Arbitration Terms</Label>
          <Textarea name="arbitrationTerms" value={formData.arbitrationTerms} onChange={handleChange} />

          <Label>Governing Law / State</Label>
          <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

          <Label>Attorneys' Fees Clause</Label>
          <Textarea name="attorneysFeesClause" value={formData.attorneysFeesClause} onChange={handleChange} />

          <hr />
          <Label>Advertiser - Signatory Name</Label>
          <Input name="signAdvertiserName" value={formData.signAdvertiserName} onChange={handleChange} />
          <Label>Advertiser - Date</Label>
          <Input name="signAdvertiserDate" value={formData.signAdvertiserDate} onChange={handleChange} />

          <Label>Agency - Signatory Name</Label>
          <Input name="signAgencyName" value={formData.signAgencyName} onChange={handleChange} />
          <Label>Agency - Date</Label>
          <Input name="signAgencyDate" value={formData.signAgencyDate} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.indemnityClause && formData.insuranceLimits && formData.billingStandards),
    },
  ];

  // small helper to write and paginate
  const writeText = (doc: jsPDF, text: string, state: { y: number }, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
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

    writeText(doc, "ADVERTISING AGENCY AGREEMENT", state, { size: 14, bold: true, center: true });
    writeText(doc, "\n", state);

    writeText(
      doc,
      `This Advertising Agency Agreement (“Agreement”) is made and effective on ${formData.effectiveDate || "___"} (“Effective Date”), by and between ${formData.advertiserName ||
        "[Advertiser]"} (${formData.advertiserBusiness || "[Advertiser business]"}) and ${formData.agencyName || "[Agency]"} (${formData.agencyBusiness ||
        "[Agency business]"})`,
      state
    );

    writeText(doc, "\n1. LEGAL STATUS AND BUSINESS OF ADVERTISER", state, { size: 12, bold: true });
    writeText(
      doc,
      `${formData.advertiserName || "[Advertiser]"} is duly organized and in good standing, with principal office at ${formData.advertiserAddress || "[address]"}. The Advertiser is in the business of ${formData.advertiserBusiness ||
        "[business]"}.`,
      state
    );

    writeText(doc, "\n2. LEGAL STATUS AND BUSINESS OF AGENCY", state, { size: 12, bold: true });
    writeText(
      doc,
      `${formData.agencyName || "[Agency]"} is duly organized, with principal office at ${formData.agencyAddress || "[address]"}. Agency provides advertising services and shall render services for a fee as set forth herein.`,
      state
    );

    writeText(doc, "\n3. APPOINTMENT OF AGENCY", state, { size: 12, bold: true });
    writeText(doc, "The Advertiser appoints the Agency to represent and carry out the Advertiser’s advertising program under the terms of this Agreement.", state);

    writeText(doc, "\n4. AGENCY SERVICES", state, { size: 12, bold: true });
    writeText(
      doc,
      "The Agency shall perform, upon authorization by the Advertiser, services including market study, campaign development, copy and layout preparation, media analysis and purchasing, production supervision, contract follow-up, talent procurement, payment to suppliers, billing and record keeping, and cooperation on tax matters as further detailed below:",
      state
    );
    // short bullets could be added; we'll reference the long list in the original doc
    writeText(doc, formData.productsServices || "• [Insert full list of services and details here]", state);

    writeText(doc, "\n5. PRODUCTS", state, { size: 12, bold: true });
    writeText(doc, formData.productsServices || "[Products and services list]", state);

    writeText(doc, "\n6. PRIOR APPROVAL OF THE ADVERTISER", state, { size: 12, bold: true });
    writeText(doc, "The Agency shall not incur obligations or provide services for the Advertiser’s account without prior written approval and shall submit proposals and cost estimates for approval.", state);

    writeText(doc, "\n7. EXCLUSIVITY", state, { size: 12, bold: true });
    writeText(doc, `Exclusivity scope (if any): ${formData.exclusivityScope || "[Insert exclusivity scope]"}`, state);

    writeText(doc, "\n8. ADVERTISING COSTS AND EXPENDITURES", state, { size: 12, bold: true });
    writeText(doc, formData.mediaCostsNotes || "Advertiser shall reimburse Agency for all approved costs and direct expenses, including travel and third-party charges.", state);

    writeText(doc, "\n9. AGENCY’S COMPENSATION", state, { size: 12, bold: true });
    writeText(doc, `Agency commission on media: ${formData.commissionPercent || "___"}% of gross media charges.`, state);
    writeText(doc, `Outdoor advertising commission: ${formData.outdoorCommissionPercent || "___"}%.`, state);
    writeText(doc, `Third-party/service commission: ${formData.thirdPartyCommissionPercent || "___"}%.`, state);
    writeText(doc, `Hourly / non-commission work rate: $${formData.hourlyRate || "___"} per hour.`, state);

    writeText(doc, "\n10. TERM", state, { size: 12, bold: true });
    writeText(doc, `This Agreement begins on the Effective Date and the Agency shall commence services on ${formData.commencementDate || "___"}. Term end / review date: ${formData.termEndDate || "___"}.`, state);

    writeText(doc, "\n11. TERMINATION", state, { size: 12, bold: true });
    writeText(
      doc,
      `Either party may terminate with ${formData.terminationNoticeDays || "___"} days' written notice. Existing obligations during notice period continue; Agency must complete already-approved work unless otherwise agreed.`,
      state
    );

    writeText(doc, "\n12. ASSIGNMENT OF CONTRACTS", state, { size: 12, bold: true });
    writeText(doc, formData.assignmentClause, state);

    writeText(doc, "\n13. DISPOSITION OF PROPERTY AND MATERIALS", state, { size: 12, bold: true });
    writeText(doc, formData.dispositionMaterials, state);

    writeText(doc, "\n14. COMPETITORS", state, { size: 12, bold: true });
    writeText(doc, "Agency may accept work from other clients unless competitive with Advertiser’s products or services.", state);

    writeText(doc, "\n15. COST ESTIMATES", state, { size: 12, bold: true });
    writeText(doc, "Agency shall obtain Advertiser approval of preparation and production cost estimates before starting work.", state);

    writeText(doc, "\n16. AUDIT RIGHTS", state, { size: 12, bold: true });
    writeText(doc, formData.auditRights, state);

    writeText(doc, "\n17. OWNERSHIP AND USE", state, { size: 12, bold: true });
    writeText(doc, "Advertiser owns copyrights and IP in materials created for Advertiser, subject to payment and contract terms.", state);

    writeText(doc, "\n18. DEFAULT", state, { size: 12, bold: true });
    writeText(
      doc,
      `If a party defaults, written notice is required. If default is not cured within ${formData.defaultCureDays || "___"} days, the non-defaulting party may terminate.`,
      state
    );

    writeText(doc, "\n19. FORCE MAJEURE", state, { size: 12, bold: true });
    writeText(
      doc,
      "Performance is excused during events beyond control (acts of God, fire, riots, national emergencies); obligations suspended for the duration of such events.",
      state
    );

    writeText(doc, "\n20. BILLING", state, { size: 12, bold: true });
    writeText(doc, formData.billingStandards, state);

    writeText(doc, "\n21. INDEMNIFICATION AND INSURANCE", state, { size: 12, bold: true });
    writeText(doc, formData.indemnityClause, state);
    writeText(doc, `Insurance requirements: ${formData.insuranceLimits}`, state);

    writeText(doc, "\n22. ARBITRATION", state, { size: 12, bold: true });
    writeText(doc, formData.arbitrationTerms, state);

    writeText(doc, "\n23. ENTIRE AGREEMENT", state, { size: 12, bold: true });
    writeText(doc, "This Agreement contains the entire understanding between the parties and supersedes prior agreements relating to the subject matter herein.", state);

    writeText(doc, "\n24. SEVERABILITY", state, { size: 12, bold: true });
    writeText(doc, "If any provision is invalid, the remainder remains in effect and shall be interpreted to maximize enforceability.", state);

    writeText(doc, "\n25. GOVERNING LAW", state, { size: 12, bold: true });
    writeText(doc, `This Agreement shall be governed by the laws of ${formData.governingLaw || "______"}.`, state);

    writeText(doc, "\n26. ATTORNEYS’ FEES", state, { size: 12, bold: true });
    writeText(doc, formData.attorneysFeesClause, state);

    writeText(doc, "\n27. SIGNATORIES", state, { size: 12, bold: true });
    writeText(
      doc,
      `IN WITNESS WHEREOF, this Agreement is signed by Advertiser and Agency as of the Effective Date.\n\nAdvertiser: ${formData.advertiserName || "[Advertiser]"}\nSignature: ___________________________\nDate: ${formData.signAdvertiserDate || "________"}`,
      state
    );
    writeText(
      doc,
      `\n\nAgency: ${formData.agencyName || "[Agency]"}\nSignature: ___________________________\nDate: ${formData.signAgencyDate || "________"}`,
      state
    );

    doc.save("Advertising_Agency_Agreement.pdf");
  };

  const handleSubmit = () => {
    generatePDF();
    alert("Form submitted!");
  };

  return <FormWizard steps={steps} onFinish={handleSubmit} />;
}
