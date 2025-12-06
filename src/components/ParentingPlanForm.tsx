import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  parent1: string;
  parent2: string;

  childrenTable: string; // free text area for rows: Name | Sex | DOB

  legalCustody: string; // default joint
  physicalCustody: string;
  visitation: string;
  holidayEvenAllocation: string;
  holidayOddAllocation: string;
  birthdaysClause: string;

  transportationShare: string;
  exchangePoint: string;
  relocationNotice: string;
  childcarePriorOpportunity: string;

  healthInsuranceProvider: string;
  nonCoveredMedicalSplitPercent: string;
  medicalReimbursementDays: string;

  taxAllocationEven: string;
  taxAllocationOdd: string;
  irsFormDeadline: string;
  childTaxCreditNote: string;
  earnedIncomeCreditNote: string;

  childSupportAmount: string;
  childSupportBasis: string;

  collegeExpensesNote: string;

  infoSharingNotes: string;
  communicationNotes: string;

  disputeResolutionNotes: string;

  signDate: string;
  signParent1Name: string;
  signParent2Name: string;
  signParent1Date: string;
  signParent2Date: string;

  notaryState: string;
  notaryCounty: string;
  notaryName: string;
  notaryTitle: string;
  notaryExpiry: string;
}

export default function ParentingPlanForm() {
  const [formData, setFormData] = useState<FormData>({
    parent1: "",
    parent2: "",

    childrenTable: "Name | Sex | Date of Birth\n",

    legalCustody: "Joint legal custody",
    physicalCustody: "",
    visitation: "Every other weekend Friday 5:00pm — Sunday 7:00pm",
    holidayEvenAllocation:
      "Even-numbered years — Parent named in form (specify) has: New Year’s Eve, MLK Day, Presidents Day, Easter Weekend, Father’s Day, Independence Day, Columbus Day, Thanksgiving Break, Hanukkah, Christmas Eve.",
    holidayOddAllocation:
      "Odd-numbered years — Parent named in form (specify) has: New Year’s Day, Spring Break Week, Mother’s Day, Memorial Day, Labor Day, Veterans Day, Winter Holiday Break, Christmas Day.",
    birthdaysClause: "Each parent has visitation on their own birthday. Holiday/extended visitation takes precedence; missed regular visits not rescheduled.",

    transportationShare: "Split equally between parents",
    exchangePoint: "",
    relocationNotice: "Neither parent shall change children’s residence without prior written notice; relocation triggers reassessment of custody and visitation.",
    childcarePriorOpportunity: "Each parent gives the other first opportunity to provide childcare during their parenting time before using third-party childcare.",

    healthInsuranceProvider: "Specify which parent provides coverage if available",
    nonCoveredMedicalSplitPercent: "50",
    medicalReimbursementDays: "30",

    taxAllocationEven: "Even years: Parent A (specify) claims dependency exemption(s)",
    taxAllocationOdd: "Odd years: Parent B (specify) claims dependency exemption(s)",
    irsFormDeadline: "Execute IRS Form 8332 by (date) of applicable tax year as needed",
    childTaxCreditNote: "Parent claiming exemption may claim Child Tax Credit and related credits for that year.",
    earnedIncomeCreditNote: "EIC shall be claimed by the custodial parent under IRS rules.",

    childSupportAmount: "",
    childSupportBasis: "Child support based on applicable guidelines; to be set by court/order or agreement",

    collegeExpensesNote: "Parents shall equally share tuition, room & board and required books for post-secondary education unless otherwise agreed.",

    infoSharingNotes:
      "Both parents have access to address, phone, educational and medical records, school reports and activity schedules; must notify each other of emergencies.",
    communicationNotes: "Parents and children may communicate by phone, writing or email during reasonable hours without interference.",

    disputeResolutionNotes: "Parties shall attempt good-faith resolution prioritizing children’s best interests; if unresolved, mediation before court proceedings is required.",

    signDate: "",
    signParent1Name: "",
    signParent2Name: "",
    signParent1Date: "",
    signParent2Date: "",

    notaryState: "",
    notaryCounty: "",
    notaryName: "",
    notaryTitle: "",
    notaryExpiry: "",
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

    const write = (text: string, size = 11, bold = false, center = false, spacing = 1.25) => {
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
        y += size * spacing;
      });
    };

    write("PARENTING PLAN", 14, true, true);
    write("\n");

    write(`1. Parents`, 12, true);
    write(`Parent 1: ${formData.parent1 || "____________________"}`);
    write(`Parent 2: ${formData.parent2 || "____________________"}`);
    write("\n");

    write("2. Children", 12, true);
    write("The minor children are listed below (enter Name | Sex | Date of Birth):");
    write(formData.childrenTable || "Name | Sex | Date of Birth");
    write("\n");

    write("3. Child Custody and Visitation", 12, true);
    write("A. Legal Custody");
    write(formData.legalCustody || "Joint legal custody of the children.");
    write("B. Physical Custody");
    write(
      `Physical custody: ${formData.physicalCustody || "________________ shall have sole physical custody of the children."}`,
    );
    write("C. Parenting Time / Visitation");
    write(formData.visitation || "The non-custodial parent shall have visitation every other weekend Friday 5:00 p.m. - Sunday 7:00 p.m.");
    write("D. Holiday / Extended Visitation");
    write("Even-numbered years:");
    write(formData.holidayEvenAllocation || "[Even-year holiday allocation text]");
    write("Odd-numbered years:");
    write(formData.holidayOddAllocation || "[Odd-year holiday allocation text]");
    write(formData.birthdaysClause || "Each parent shall have visitation with the children on their own birthday. Holiday and extended visitation take precedence over regular visitation.");
    write("\n");

    write("4. Transportation", 12, true);
    write(formData.transportationShare || "Transportation costs shall be divided equally between the parents.");
    write("\n");

    write("5. Exchange Point", 12, true);
    write(formData.exchangePoint || "Exchange point: __________________________");
    write("\n");

    write("6. Notification", 12, true);
    write(formData.relocationNotice || "Neither parent shall change the residence of the children without adequate prior written notice; relocation triggers reassessment.");
    write("\n");

    write("7. Childcare", 12, true);
    write(formData.childcarePriorOpportunity || "Each parent shall give the other the first opportunity to care for the children during their scheduled parenting time.");
    write("\n");

    write("8. Health Insurance", 12, true);
    write(formData.healthInsuranceProvider || "Specify which parent will provide health insurance coverage if available at no or minimal cost through employment.");
    write("\n");

    write("9. Non-Covered Medical Expenses", 12, true);
    write(
      `Each parent shall be responsible for ${formData.nonCoveredMedicalSplitPercent || "50"}% of uninsured or out-of-pocket medical, dental, vision, orthodontic, physical therapy, psychiatric, or pharmaceutical expenses. Reimbursement within ${formData.medicalReimbursementDays ||
        "30"} days upon written statement and receipts.`,
    );
    write("\n");

    write("10. Tax Matters Related to the Children", 12, true);
    write("A. Allocation of Dependency Exemptions");
    write(`Even-numbered tax years: ${formData.taxAllocationEven || "[specify parent]"}`);
    write(`Odd-numbered tax years: ${formData.taxAllocationOdd || "[specify parent]"}`);
    write("B. IRS Form 8332 — Release/Revocation of Claim to Exemption");
    write(formData.irsFormDeadline || "The non-entitled parent shall execute IRS Form 8332 as required by tax year deadlines.");
    write("C. Child Tax Credit and Other Credits");
    write(formData.childTaxCreditNote || "The parent entitled to claim the exemption may claim associated tax credits for that year.");
    write("D. Earned Income Credit (EIC)");
    write(formData.earnedIncomeCreditNote || "EIC shall be claimed by the custodial parent per IRS rules.");
    write("\n");

    write("11. Child Support", 12, true);
    write(`Child support: ${formData.childSupportAmount || "[amount] per month"} based on ${formData.childSupportBasis || "[basis]"}. Payments begin on the 1st day of the month following entry of decree and paid to custodial parent.`);
    write("\n");

    write("12. College Expenses", 12, true);
    write(formData.collegeExpensesNote || "If children attend post-secondary education, parents shall equally share reasonable tuition, room and board, and required books.");
    write("\n");

    write("13. Information Sharing", 12, true);
    write(formData.infoSharingNotes || "Both parents entitled to children’s address, phone, educational and medical records, school progress and activity schedules; notify other of emergencies.");
    write("\n");

    write("14. Parent–Child Communication", 12, true);
    write(formData.communicationNotes || "Parents and children may communicate during reasonable hours by phone, writing or email without interference.");
    write("\n");

    write("15. Dispute Resolution", 12, true);
    write(formData.disputeResolutionNotes || "Parents shall attempt good-faith resolution and seek mediation before court if unresolved.");
    write("\n");

    write("SIGNATURES", 12, true);
    write("We knowingly and voluntarily agree to the terms of this Parenting Plan.");
    write(`Dated: ${formData.signDate || "__________"}`);
    write(`Parent: ${formData.signParent1Name || "___________________________"}`);
    write(`Date: ${formData.signParent1Date || "________________"}`);
    write(`Parent: ${formData.signParent2Name || "___________________________"}`);
    write(`Date: ${formData.signParent2Date || "________________"}`);
    write("\n");

    write("NOTARY", 12, true);
    write(`State of: ${formData.notaryState || "__________"}`);
    write(`County of: ${formData.notaryCounty || "__________"} ss:`);
    write(`Notary Public: ${formData.notaryName || "________________"}`);
    write(`Title/Rank: ${formData.notaryTitle || "________________"}`);
    write(`My Commission Expires: ${formData.notaryExpiry || "__________"}`);

    doc.save("Parenting_Plan.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parents & Children</h3>

              <Label>Parent 1 (Name)</Label>
              <Input name="parent1" value={formData.parent1} onChange={handleChange} />

              <Label>Parent 2 (Name)</Label>
              <Input name="parent2" value={formData.parent2} onChange={handleChange} />

              <Label>Children (enter rows: Name | Sex | Date of Birth)</Label>
              <Textarea name="childrenTable" value={formData.childrenTable} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Custody, Visitation & Logistics</h3>

              <Label>Legal Custody (description)</Label>
              <Input name="legalCustody" value={formData.legalCustody} onChange={handleChange} />

              <Label>Physical Custody (who has primary residence)</Label>
              <Input name="physicalCustody" value={formData.physicalCustody} onChange={handleChange} />

              <Label>Parenting Time / Visitation (regular schedule)</Label>
              <Textarea name="visitation" value={formData.visitation} onChange={handleChange} />

              <Label>Holiday Allocation — Even-numbered years</Label>
              <Textarea name="holidayEvenAllocation" value={formData.holidayEvenAllocation} onChange={handleChange} />

              <Label>Holiday Allocation — Odd-numbered years</Label>
              <Textarea name="holidayOddAllocation" value={formData.holidayOddAllocation} onChange={handleChange} />

              <Label>Birthdays Clause</Label>
              <Textarea name="birthdaysClause" value={formData.birthdaysClause} onChange={handleChange} />

              <Label>Exchange Point (pick-up/drop-off)</Label>
              <Input name="exchangePoint" value={formData.exchangePoint} onChange={handleChange} />

              <Label>Transportation (who pays / split)</Label>
              <Input name="transportationShare" value={formData.transportationShare} onChange={handleChange} />

              <Label>Relocation / Notification Clause</Label>
              <Textarea name="relocationNotice" value={formData.relocationNotice} onChange={handleChange} />

              <Label>Childcare — Prior Opportunity Clause</Label>
              <Textarea name="childcarePriorOpportunity" value={formData.childcarePriorOpportunity} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Health, Taxes, Support & Signatures</h3>

              <Label>Health Insurance Provider / Responsibility</Label>
              <Input name="healthInsuranceProvider" value={formData.healthInsuranceProvider} onChange={handleChange} />

              <Label>Non-Covered Medical Split (%)</Label>
              <Input name="nonCoveredMedicalSplitPercent" value={formData.nonCoveredMedicalSplitPercent} onChange={handleChange} />

              <Label>Medical Reimbursement — Days to Reimburse</Label>
              <Input name="medicalReimbursementDays" value={formData.medicalReimbursementDays} onChange={handleChange} />

              <Label>Tax Allocation — Even years (who claims)</Label>
              <Input name="taxAllocationEven" value={formData.taxAllocationEven} onChange={handleChange} />

              <Label>Tax Allocation — Odd years (who claims)</Label>
              <Input name="taxAllocationOdd" value={formData.taxAllocationOdd} onChange={handleChange} />

              <Label>IRS Form 8332 deadline / note</Label>
              <Input name="irsFormDeadline" value={formData.irsFormDeadline} onChange={handleChange} />

              <Label>Child Support Amount</Label>
              <Input name="childSupportAmount" value={formData.childSupportAmount} onChange={handleChange} />

              <Label>Child Support Basis / Notes</Label>
              <Input name="childSupportBasis" value={formData.childSupportBasis} onChange={handleChange} />

              <Label>College / Post-secondary Expenses Note</Label>
              <Textarea name="collegeExpensesNote" value={formData.collegeExpensesNote} onChange={handleChange} />

              <Label>Information Sharing Notes</Label>
              <Textarea name="infoSharingNotes" value={formData.infoSharingNotes} onChange={handleChange} />

              <Label>Parent-Child Communication Notes</Label>
              <Textarea name="communicationNotes" value={formData.communicationNotes} onChange={handleChange} />

              <Label>Dispute Resolution (mediation requirement etc.)</Label>
              <Textarea name="disputeResolutionNotes" value={formData.disputeResolutionNotes} onChange={handleChange} />

              <hr />

              <Label>Agreement Date</Label>
              <Input name="signDate" value={formData.signDate} onChange={handleChange} />

              <Label>Parent 1 - Signatory Name</Label>
              <Input name="signParent1Name" value={formData.signParent1Name} onChange={handleChange} />
              <Label>Parent 1 - Date</Label>
              <Input name="signParent1Date" value={formData.signParent1Date} onChange={handleChange} />

              <Label>Parent 2 - Signatory Name</Label>
              <Input name="signParent2Name" value={formData.signParent2Name} onChange={handleChange} />
              <Label>Parent 2 - Date</Label>
              <Input name="signParent2Date" value={formData.signParent2Date} onChange={handleChange} />

              <hr />

              <Label>Notary — State</Label>
              <Input name="notaryState" value={formData.notaryState} onChange={handleChange} />
              <Label>Notary — County</Label>
              <Input name="notaryCounty" value={formData.notaryCounty} onChange={handleChange} />
              <Label>Notary — Name</Label>
              <Input name="notaryName" value={formData.notaryName} onChange={handleChange} />
              <Label>Notary — Title/Rank</Label>
              <Input name="notaryTitle" value={formData.notaryTitle} onChange={handleChange} />
              <Label>Notary — Commission Expires</Label>
              <Input name="notaryExpiry" value={formData.notaryExpiry} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Parenting Plan PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
