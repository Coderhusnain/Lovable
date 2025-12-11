import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  ownerAddress: string;
  developerName: string;
  developerAddress: string;
  developmentPlanNotes: string;
  reviewFrequency: string;
  timingNotes: string;
  booksRecordsNotes: string;
  financialReportingNotes: string;
  permitsNotes: string;
  meetingCadence: string;
  fundsAccount: string;
  accountingProcedures: string;
  onsiteObserver: string;
  indemnificationNotes: string;
  insuranceNotes: string;
  subcontractNotes: string;
  phasesNotes: string;
  gnaFeeNotes: string;
  fundingArrangements: string;
  developerAuthorityNotes: string;
  majorDecisionThreshold: string;
  terminationNotes: string;
  representationsNotes: string;
  noticesAddress: string;
  relatedPartyNotes: string;
  assignmentConsent: string;
  attorneysFeesNotes: string;
  governingLaw: string;
  signOwnerName: string;
  signOwnerDate: string;
  signDeveloperName: string;
  signDeveloperDate: string;
}

export default function RealEstateDevelopmentForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    ownerAddress: "",
    developerName: "",
    developerAddress: "",
    developmentPlanNotes: "",
    reviewFrequency: "Quarterly",
    timingNotes: "",
    booksRecordsNotes: "",
    financialReportingNotes: "",
    permitsNotes: "",
    meetingCadence: "Weekly",
    fundsAccount: "",
    accountingProcedures: "",
    onsiteObserver: "",
    indemnificationNotes: "",
    insuranceNotes: "",
    subcontractNotes: "",
    phasesNotes: "",
    gnaFeeNotes: "",
    fundingArrangements: "",
    developerAuthorityNotes: "",
    majorDecisionThreshold: "50000",
    terminationNotes: "",
    representationsNotes: "",
    noticesAddress: "",
    relatedPartyNotes: "",
    assignmentConsent: "",
    attorneysFeesNotes: "",
    governingLaw: "",
    signOwnerName: "",
    signOwnerDate: "",
    signDeveloperName: "",
    signDeveloperDate: "",
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

    write("REAL ESTATE DEVELOPMENT AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Real Estate Development Agreement (\u201cAgreement\u201d) is made and entered into as of the ${
        formData.effectiveDate || "___ day of ________"
      }, by and between:`
    );

    write(`Owner: ${formData.ownerName || "_________________________________________"} (\u201cOwner\u201d),`);
    write(`Address: ${formData.ownerAddress || ""}`);
    write("\n");
    write(`Developer: ${formData.developerName || "_____________________________________"} (\u201cDeveloper\u201d).`);
    write(`Address: ${formData.developerAddress || ""}`);

    write("\n");
    write("The Owner and Developer may hereinafter be referred to individually as a \u201cParty\u201d and collectively as the \u201cParties.\u201d");

    write("\n");
    write("1. Purpose of the Agreement", 12, true);
    write(
      "The Owner desires to engage the Developer to develop certain lots of land, as legally described in contract(\"Property\"), into a cost-efficient residential project targeted toward first-time homebuyers (\"Project\"). The Developer, having the requisite expertise in property development, agrees to develop, market, and oversee the Project in accordance with the terms herein."
    );

    write("\n");
    write("2. Developer\u2019s Responsibilities", 12, true);
    write("2.1 Development Plan");
    write(
      `The Developer shall prepare a detailed Development Plan for the Project, including design, phasing, budgets, marketing strategies, and schedules, for the Owner's review and approval. No phase of the Project shall commence without the Owner's written approval of the Development Plan for that phase. Updates or modifications to the Development Plan require prior written consent from the Owner. ${formData.developmentPlanNotes || ""}`
    );

    write("2.2 Periodic Review");
    write(
      `The Development Plan shall be reviewed ${formData.reviewFrequency || "quarterly"} for feasibility, efficiency, and profitability. Any proposed modifications shall be submitted in writing for the Owner's approval.`
    );

    write("2.3 Timing of Development");
    write(`The Developer shall not commence any phase of the Project without the Owner's written approval for that phase. ${formData.timingNotes || "The Owner reserves the right to delay or decline to proceed with any phase."}`);

    write("2.4 Books, Accounts, and Records");
    write(
      `The Developer shall maintain complete, current, and accurate books and records relating to the Project, which shall be open to the Owner for inspection and audit upon reasonable notice. ${formData.booksRecordsNotes || ""}`
    );

    write("2.5 Financial and Progress Reporting");
    write(
      `${formData.financialReportingNotes || "The Developer shall provide quarterly financial reports on the Project's condition and operations, including cash flow projections. The Owner may object in writing to any inaccuracies. The Developer shall provide weekly sales reports after commencement of sales, and monthly activity reports detailing construction progress, changes in timelines, and milestones achieved."}`
    );

    write("2.6 Governmental Reports and Permits");
    write(`The Developer shall obtain all necessary permits, licenses, and approvals required for the Project and shall furnish the Owner with copies of any governmental filings or significant correspondence. ${formData.permitsNotes || ""}`);

    write("2.7 Meetings");
    write(`The Parties shall meet ${formData.meetingCadence || "weekly"}, or as otherwise mutually agreed, to review progress, address issues, and approve any required changes.`);

    write("\n");
    write("3. Funds and Financial Controls", 12, true);
    write("3.1 Deposit and Control of Funds");
    write(
      `All Project funds belong exclusively to the Owner and shall be deposited into an account designated by the Owner. The Developer may be authorized in writing to draw from such accounts but shall have no ownership interest in the funds. ${formData.fundsAccount || ""}`
    );

    write("3.2 Accounting Procedures");
    write(`The accounting principles to be applied in the Project's financial management shall be determined by the Owner, after consultation with the Developer. ${formData.accountingProcedures || ""}`);

    write("\n");
    write("4. Owner\u2019s Representative", 12, true);
    write(
      `The Owner may appoint an \u201cOnsite Observer\u201d to monitor construction and development activities. The Onsite Observer shall have access to all relevant non-proprietary information but shall have no authority to direct, control, or interfere in the Developer's operations. The role shall be observational and educational only. ${formData.onsiteObserver || ""}`
    );

    write("\n");
    write("5. Indemnification", 12, true);
    write(`${formData.indemnificationNotes || "Each Party shall indemnify, defend, and hold the other harmless against any and all losses, liabilities, claims, damages, and expenses (including reasonable attorneys' fees) arising from its own negligent acts, omissions, or breaches of this Agreement."}`);

    write("\n");
    write("6. Insurance Requirements", 12, true);
    write("6.1 Developer\u2019s Insurance");
    write(`${formData.insuranceNotes || "The Developer shall maintain comprehensive general liability insurance, including a broad form endorsement, for the entire term of this Agreement."}`);
    write("6.2 Workers\u2019 Compensation");
    write("The Developer shall provide Workers' Compensation and Employers' Liability Insurance for all its employees engaged in Project work, and shall require all Subcontractors to maintain similar coverage for their employees.");
    write("6.3 Subcontractors\u2019 Insurance");
    write("All Subcontractors shall maintain insurance coverage meeting the requirements of this Agreement and shall provide certificates of insurance to the Owner upon request.");
    write("6.4 Owner\u2019s Property Insurance");
    write("The Owner shall procure and maintain property insurance equal to at least the estimated cost of the work, on an \u201call-risk\u201d basis, covering fire, extended coverage, and other direct physical loss or damage. Losses attributable to deductibles shall be borne by the Developer.");
    write("6.5 Waiver of Subrogation");
    write("The Parties, including their respective officers, employees, agents, and Subcontractors, waive all rights of subrogation against each other under all insurance policies covering the Project, regardless of whether the waiving Party had a duty to indemnify or an insurable interest in the damaged property.");

    write("\n");
    write("7. Delegation and Subcontracts", 12, true);
    write(`${formData.subcontractNotes || "The Developer may delegate certain duties to qualified third parties, including architects and engineers, with the Owner's written approval. All subcontracts shall be for the Developer's account, and not as the Owner's agent, and may be assigned to the Owner upon request."}`);

    write("8. Phases and Entitlements");
    write(`${formData.phasesNotes || "The Developer shall provide services in defined phases as set forth in contract and shall advise the Owner on land use entitlements, compliance with governmental requirements, and the process for obtaining modifications or additional entitlements as required."}`);

    write("9. General and Administrative Costs");
    write(`${formData.gnaFeeNotes || "The Developer shall use its own personnel, facilities, and resources for the Project, and shall be compensated through a General and Administrative Fee per Project phase (excluding the Planning Phase)."}`);

    write("10. Project Costs and Financing", 12, true);
    write(`${formData.fundingArrangements || "The Owner shall provide or arrange sufficient funding to meet all approved Project Costs, whether through equity contributions or financing. The Developer shall be reimbursed for all properly documented Project costs incurred. The Owner may obtain mortgage or other financing from lenders of its choice."}`);

    write("11. Developer\u2019s Authority and Standard of Performance", 12, true);
    write(`${formData.developerAuthorityNotes || "The Developer acts solely as an independent contractor and shall have no authority to bind the Owner except for obtaining permits and acknowledging deposits. The Developer shall perform services diligently, competently, in compliance with all applicable laws, and in accordance with high standards of business ethics."}`);

    write("12. Major Decisions Requiring Owner Approval", 12, true);
    write(`The following matters require the Owner's prior written consent: Any change in the Development Plan; Any single expenditure exceeding $${formData.majorDecisionThreshold || "50,000"}; Execution or modification of any contract exceeding thresholds specified in agreement; Material changes in reserves or budgets.`);

    write("\n");
    write("13. Termination", 12, true);
    write("13.1 Termination by Either Party");
    write(`${formData.terminationNotes || "Either Party may terminate this Agreement with written notice upon: (1) Failure to agree upon or submit a Development Plan; (2) Material breach of this Agreement by the other Party; (3) Transfer of all or part of the Property to a non-affiliated entity."}`);
    write("13.2 Termination by Owner");
    write("The Owner may terminate if significant changes to the Development Plan are required due to unforeseen circumstances or changes in market conditions.");
    write("13.3 Automatic Termination");
    write("This Agreement shall automatically terminate if either Party files for bankruptcy or insolvency and such filing is not dismissed within sixty (60) days.");

    write("\n");
    write("14. Representations and Warranties", 12, true);
    write(`${formData.representationsNotes || "Each Party represents that no broker's commissions or similar fees are owed in connection with this Agreement, and each agrees to indemnify the other for any breach of this representation."}`);

    write("15. Notices", 12, true);
    write(`${formData.noticesAddress || "All notices must be in writing and delivered personally, sent by facsimile/telecopier, or mailed by first-class certified mail, return receipt requested, to the addresses specified in agreement."}`);

    write("16. Related Party Transactions", 12, true);
    write(`${formData.relatedPartyNotes || "The Developer shall notify the Owner before entering into any contract with an Affiliate for Project goods or services. The Owner may reject such contracts if the performance is inadequate or costs are deemed excessive."}`);

    write("17. Assignment and Binding Effect", 12, true);
    write(`${formData.assignmentConsent || "The Developer may not assign its rights or obligations under this Agreement without the Owner's prior written consent. This Agreement shall be binding upon and inure to the benefit of the Parties and their permitted successors and assigns."}`);

    write("18. Attorneys' Fees", 12, true);
    write(`${formData.attorneysFeesNotes || "The prevailing Party in any litigation or arbitration arising out of this Agreement shall be entitled to recover its reasonable attorneys' fees and costs."}`);

    write("19. No Third Party Beneficiaries", 12, true);
    write("This Agreement is intended solely for the benefit of the Parties hereto and shall not be enforceable by any third party.");

    write("20. Governing Law", 12, true);
    write(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "__________"}, without regard to its conflict of laws principles.`);

    write("21. Entire Agreement; Amendments", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations or agreements, whether written or oral. No amendment shall be valid unless made in writing and signed by both Parties.");

    write("\n\n");
    write("22. Execution", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
    write("\n");
    write(`OWNER: ${formData.ownerName || "___________________________"}`);
    write("(Signature, Date)");
    write("\n");
    write(`DEVELOPER: ${formData.developerName || "___________________________"}`);
    write("(Signature, Date)");

    doc.save("Real_Estate_Development_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Purpose</h3>
              </div>

              <Label>Agreement Date (Effective Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />

              <Label>Owner Address</Label>
              <Textarea name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />

              <hr />

              <Label>Developer Name</Label>
              <Input name="developerName" value={formData.developerName} onChange={handleChange} />

              <Label>Developer Address</Label>
              <Textarea name="developerAddress" value={formData.developerAddress} onChange={handleChange} />

              <Label>Development Plan Notes</Label>
              <Textarea name="developmentPlanNotes" value={formData.developmentPlanNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Responsibilities & Controls</h3>

              <Label>Review Frequency</Label>
              <Input name="reviewFrequency" value={formData.reviewFrequency} onChange={handleChange} />

              <Label>Timing Notes / Phase Approval</Label>
              <Textarea name="timingNotes" value={formData.timingNotes} onChange={handleChange} />

              <Label>Books & Records Notes</Label>
              <Textarea name="booksRecordsNotes" value={formData.booksRecordsNotes} onChange={handleChange} />

              <Label>Financial Reporting Notes</Label>
              <Textarea name="financialReportingNotes" value={formData.financialReportingNotes} onChange={handleChange} />

              <Label>Permits / Governmental Filings Notes</Label>
              <Textarea name="permitsNotes" value={formData.permitsNotes} onChange={handleChange} />

              <Label>Meeting Cadence</Label>
              <Input name="meetingCadence" value={formData.meetingCadence} onChange={handleChange} />

              <hr />

              <Label>Funds Account / Deposit Notes</Label>
              <Input name="fundsAccount" value={formData.fundsAccount} onChange={handleChange} />

              <Label>Accounting Procedures</Label>
              <Textarea name="accountingProcedures" value={formData.accountingProcedures} onChange={handleChange} />

              <Label>Onsite Observer (Owner Rep.)</Label>
              <Input name="onsiteObserver" value={formData.onsiteObserver} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Insurance, Delegation & Finance</h3>

              <Label>Indemnification Summary</Label>
              <Textarea name="indemnificationNotes" value={formData.indemnificationNotes} onChange={handleChange} />

              <Label>Insurance Notes</Label>
              <Textarea name="insuranceNotes" value={formData.insuranceNotes} onChange={handleChange} />

              <Label>Subcontract / Delegation Notes</Label>
              <Textarea name="subcontractNotes" value={formData.subcontractNotes} onChange={handleChange} />

              <Label>Phases & Entitlements Notes</Label>
              <Textarea name="phasesNotes" value={formData.phasesNotes} onChange={handleChange} />

              <Label>G&amp;A Fee Notes</Label>
              <Input name="gnaFeeNotes" value={formData.gnaFeeNotes} onChange={handleChange} />

              <Label>Funding Arrangements</Label>
              <Textarea name="fundingArrangements" value={formData.fundingArrangements} onChange={handleChange} />

              <Label>Developer Authority Notes</Label>
              <Textarea name="developerAuthorityNotes" value={formData.developerAuthorityNotes} onChange={handleChange} />

              <Label>Major Decision Threshold ($)</Label>
              <Input name="majorDecisionThreshold" value={formData.majorDecisionThreshold} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Termination, Notices & Signatures</h3>

              <Label>Termination Notes</Label>
              <Textarea name="terminationNotes" value={formData.terminationNotes} onChange={handleChange} />

              <Label>Representations &amp; Warranties Notes</Label>
              <Textarea name="representationsNotes" value={formData.representationsNotes} onChange={handleChange} />

              <Label>Notices Address / Instructions</Label>
              <Textarea name="noticesAddress" value={formData.noticesAddress} onChange={handleChange} />

              <Label>Related Party Transactions Notes</Label>
              <Textarea name="relatedPartyNotes" value={formData.relatedPartyNotes} onChange={handleChange} />

              <Label>Assignment / Binding Effect Notes</Label>
              <Textarea name="assignmentConsent" value={formData.assignmentConsent} onChange={handleChange} />

              <Label>Attorneys' Fees Notes</Label>
              <Input name="attorneysFeesNotes" value={formData.attorneysFeesNotes} onChange={handleChange} />

              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>Owner - Signatory Name</Label>
              <Input name="signOwnerName" value={formData.signOwnerName} onChange={handleChange} />
              <Label>Owner - Date</Label>
              <Input name="signOwnerDate" value={formData.signOwnerDate} onChange={handleChange} />

              <Label>Developer - Signatory Name</Label>
              <Input name="signDeveloperName" value={formData.signDeveloperName} onChange={handleChange} />
              <Label>Developer - Date</Label>
              <Input name="signDeveloperDate" value={formData.signDeveloperDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Real Estate Development Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
