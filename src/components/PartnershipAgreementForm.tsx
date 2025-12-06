import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  partnershipName: string;
  effectiveDate: string;
  principalOffice: string;
  governingLaw: string;
  purpose: string;
  licensesPermits: string;

  partner1Name: string;
  partner1Address: string;
  partner2Name: string;
  partner2Address: string;
  partner3Name: string;
  partner3Address: string;

  contributionDescription: string;
  contributionAmount: string;
  contributionDueDate: string;

  ownership1: string;
  ownership2: string;
  ownership3: string;

  profitAllocation: string;
  costsAllocation: string;
  salariesConsent: string;

  vacationDays: string;
  auditFrequency: string;
  fiscalYearEnd: string;

  buyoutDays: string;
  dissolutionRules: string;

  noticesMethods: string;
  disputeJurisdiction: string;

  signPartner1Name: string;
  signPartner1Date: string;
  signPartner2Name: string;
  signPartner2Date: string;
  signPartner3Name: string;
  signPartner3Date: string;
}

export default function PartnershipAgreementForm() {
  const [form, setForm] = useState<FormData>({
    partnershipName: "",
    effectiveDate: "",
    principalOffice: "",
    governingLaw: "",
    purpose: "",
    licensesPermits: "",

    partner1Name: "",
    partner1Address: "",
    partner2Name: "",
    partner2Address: "",
    partner3Name: "",
    partner3Address: "",

    contributionDescription: "",
    contributionAmount: "",
    contributionDueDate: "",

    ownership1: "",
    ownership2: "",
    ownership3: "",

    profitAllocation: "",
    costsAllocation: "",
    salariesConsent: "",

    vacationDays: "",
    auditFrequency: "",
    fiscalYearEnd: "",

    buyoutDays: "",
    dissolutionRules: "",

    noticesMethods: "",
    disputeJurisdiction: "",

    signPartner1Name: "",
    signPartner1Date: "",
    signPartner2Name: "",
    signPartner2Date: "",
    signPartner3Name: "",
    signPartner3Date: "",
  });

  const [step, setStep] = useState(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value } as FormData));
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

    write("PARTNERSHIP AGREEMENT", 14, true, true);
    write("\n");

    write(`This Partnership Agreement (the \"Agreement\") is made and entered into as of ${form.effectiveDate || "[Effective Date]"}, by and among the following parties:`);
    write(`${form.partner1Name || "[Partner 1 Name]"} — ${form.partner1Address || "[Address]"}`);
    if (form.partner2Name) write(`${form.partner2Name} — ${form.partner2Address || "[Address]"}`);
    if (form.partner3Name) write(`${form.partner3Name} — ${form.partner3Address || "[Address]"}`);

    write("\n");
    write("1. NAME OF PARTNERSHIP", 12, true);
    write(`The Partners hereby agree that the business shall operate under the name ${form.partnershipName || "[Name]"} (the \"Partnership\").`);

    write("\n");
    write("2. FORMATION AND PURPOSE", 12, true);
    write(`2.1 Formation — The Partners wish to establish a legal partnership. This Agreement becomes effective on ${form.effectiveDate || "[Date]"}.`);
    write(`2.2 Principal Place of Business — ${form.principalOffice || "[Address]"}.`);
    write(`2.3 Governing Law — ${form.governingLaw || "[State/Jurisdiction]"}.`);
    write(`2.4 Purpose — ${form.purpose || "[Purpose]"}.`);
    write(`2.5 Licenses and Permits — ${form.licensesPermits || "Parties shall obtain required licenses/permits."}`);

    write("\n");
    write("3. CAPITAL CONTRIBUTIONS", 12, true);
    write(`Initial contribution: ${form.contributionDescription || "[Description]"} — $${form.contributionAmount || "[Amount]"}, due by ${form.contributionDueDate || "[Date]"}.`);
    write(`Capital accounts: All contributions shall be deposited into a joint capital account maintained by the Partnership.`);

    write("\n");
    write("4. OWNERSHIP INTEREST AND AUTHORITY", 12, true);
    write(`Ownership percentages: ${form.ownership1 || "[Percentage]"}% / ${form.ownership2 || "[Percentage]"}%${form.ownership3 ? ` / ${form.ownership3}%` : ""}.`);
    write(`Authority: All Partners shall have an equal vote except where this Agreement provides otherwise. No Partner may independently bind the Partnership.`);

    write("\n");
    write("5. FINANCIAL MATTERS", 12, true);
    write(`Profits: ${form.profitAllocation || "[Percentage allocation]"}.`);
    write(`Costs: ${form.costsAllocation || "[Percentage allocation]"}.`);
    write(`Salaries: ${form.salariesConsent || "Any permanent salary requires unanimous consent."}`);

    write("\n");
    write("6. PARTNER ROLES AND BENEFITS", 12, true);
    write(`Vacation: Each Partner shall be entitled to ${form.vacationDays || "[Number]"} vacation days per year.`);
    write(`Accounting and Records: Audit frequency: ${form.auditFrequency || "[e.g., every six months]"}. Fiscal year ends ${form.fiscalYearEnd || "[Month]"}.`);

    write("\n");
    write("7. WITHDRAWAL, DEATH, OR BUY-OUT", 12, true);
    write(`Buy-out: Remaining Partners shall have the option to buy out the departing Partner's interest. Decision period: ${form.buyoutDays || "[Number]"} days. ${form.dissolutionRules || "If no purchase is finalized, the Partnership may be dissolved."}`);

    write("\n");
    write("8. DISSOLUTION", 12, true);
    write(form.dissolutionRules || "In the event of dissolution by majority vote, the Partnership shall be liquidated and assets distributed according to ownership percentages.");

    write("\n");
    write("9. AMENDMENTS AND NOTICES", 12, true);
    write(`Amendments require unanimous written consent. Notices: ${form.noticesMethods || "Personal delivery, certified mail, or email if consented."}`);

    write("\n");
    write("10. DISPUTE RESOLUTION", 12, true);
    write(`The Partners agree to attempt resolution through negotiations. If unsuccessful, mediation in ${form.disputeJurisdiction || "[Location/Jurisdiction]"} shall follow.`);

    write("\n");
    write("11. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Partners have executed this Partnership Agreement as of the Effective Date first written above.");
    write(`\n${form.partner1Name || "[Partner 1]"}`);
    write(`Signature: ______________________     Date: ${form.signPartner1Date || "__________"}`);
    if (form.partner2Name) {
      write(`\n${form.partner2Name}`);
      write(`Signature: ______________________     Date: ${form.signPartner2Date || "__________"}`);
    }
    if (form.partner3Name) {
      write(`\n${form.partner3Name}`);
      write(`Signature: ______________________     Date: ${form.signPartner3Date || "__________"}`);
    }

    doc.save("Partnership_Agreement.pdf");
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
                <h3 className="font-semibold">Basic Details</h3>
              </div>
              <Label>Partnership Name</Label>
              <Input name="partnershipName" value={form.partnershipName} onChange={handleChange} />
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={form.effectiveDate} onChange={handleChange} />
              <Label>Principal Office Address</Label>
              <Textarea name="principalOffice" value={form.principalOffice} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={form.governingLaw} onChange={handleChange} />
              <Label>Purpose</Label>
              <Textarea name="purpose" value={form.purpose} onChange={handleChange} />
              <Label>Licenses / Permits (notes)</Label>
              <Textarea name="licensesPermits" value={form.licensesPermits} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Partners & Capital</h3>

              <Label>Partner 1 - Name</Label>
              <Input name="partner1Name" value={form.partner1Name} onChange={handleChange} />
              <Label>Partner 1 - Address</Label>
              <Textarea name="partner1Address" value={form.partner1Address} onChange={handleChange} />

              <Label>Partner 2 - Name</Label>
              <Input name="partner2Name" value={form.partner2Name} onChange={handleChange} />
              <Label>Partner 2 - Address</Label>
              <Textarea name="partner2Address" value={form.partner2Address} onChange={handleChange} />

              <Label>Partner 3 - Name (optional)</Label>
              <Input name="partner3Name" value={form.partner3Name} onChange={handleChange} />
              <Label>Partner 3 - Address</Label>
              <Textarea name="partner3Address" value={form.partner3Address} onChange={handleChange} />

              <Label>Contribution Description</Label>
              <Textarea name="contributionDescription" value={form.contributionDescription} onChange={handleChange} />
              <Label>Contribution Amount</Label>
              <Input name="contributionAmount" value={form.contributionAmount} onChange={handleChange} />
              <Label>Contribution Due Date</Label>
              <Input name="contributionDueDate" value={form.contributionDueDate} onChange={handleChange} />

              <Label>Ownership % (Partner1 / Partner2 / Partner3)</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input name="ownership1" value={form.ownership1} onChange={handleChange} />
                <Input name="ownership2" value={form.ownership2} onChange={handleChange} />
                <Input name="ownership3" value={form.ownership3} onChange={handleChange} />
              </div>

              <Label>Profit Allocation (notes)</Label>
              <Textarea name="profitAllocation" value={form.profitAllocation} onChange={handleChange} />
              <Label>Costs Allocation (notes)</Label>
              <Textarea name="costsAllocation" value={form.costsAllocation} onChange={handleChange} />
              <Label>Salaries / Permanent Compensation (consent rules)</Label>
              <Textarea name="salariesConsent" value={form.salariesConsent} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Operations, Withdrawal & Signatures</h3>
              <Label>Vacation Days per Partner</Label>
              <Input name="vacationDays" value={form.vacationDays} onChange={handleChange} />
              <Label>Audit Frequency</Label>
              <Input name="auditFrequency" value={form.auditFrequency} onChange={handleChange} />
              <Label>Fiscal Year End (Month)</Label>
              <Input name="fiscalYearEnd" value={form.fiscalYearEnd} onChange={handleChange} />

              <Label>Buy-out Decision Period (days)</Label>
              <Input name="buyoutDays" value={form.buyoutDays} onChange={handleChange} />

              <Label>Dissolution Rules / Notes</Label>
              <Textarea name="dissolutionRules" value={form.dissolutionRules} onChange={handleChange} />

              <Label>Notices methods (e.g. personal delivery, certified mail, email)</Label>
              <Textarea name="noticesMethods" value={form.noticesMethods} onChange={handleChange} />

              <Label>Dispute Resolution Jurisdiction / Location</Label>
              <Input name="disputeJurisdiction" value={form.disputeJurisdiction} onChange={handleChange} />

              <h4 className="font-semibold mt-3">Signatures</h4>
              <Label>Partner 1 - Printed Name</Label>
              <Input name="signPartner1Name" value={form.signPartner1Name} onChange={handleChange} />
              <Label>Partner 1 - Date</Label>
              <Input name="signPartner1Date" value={form.signPartner1Date} onChange={handleChange} />

              <Label>Partner 2 - Printed Name</Label>
              <Input name="signPartner2Name" value={form.signPartner2Name} onChange={handleChange} />
              <Label>Partner 2 - Date</Label>
              <Input name="signPartner2Date" value={form.signPartner2Date} onChange={handleChange} />

              <Label>Partner 3 - Printed Name (optional)</Label>
              <Input name="signPartner3Name" value={form.signPartner3Name} onChange={handleChange} />
              <Label>Partner 3 - Date</Label>
              <Input name="signPartner3Date" value={form.signPartner3Date} onChange={handleChange} />
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
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
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
            <div className="text-green-600 font-semibold">Partnership Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
