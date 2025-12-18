import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  partyAName: string;
  partyABorn: string;
  partyAAddress: string;
  partyBName: string;
  partyBBorn: string;
  partyBAddress: string;

  residencyState1: string;
  residencyState2: string;
  residencyCounty: string;
  residencyYears: string;
  residencyMonths: string;

  marriageDate: string;
  marriageCounty: string;
  marriageState: string;
  childrenStatement: string; // e.g., "No children were born..."

  separationDate: string;
  irreconcilableText: string; // optional override for clause 5

  disclosureStatementA: string;
  disclosureStatementB: string;

  incomeStatementA: string;
  incomeStatementB: string;

  cooperationDaysToExecute: string;

  maritalHomeOccupant: string;
  maritalHomeAddress: string;
  maritalHomeExpensesProportions: string;
  conversionOwnerIfDivorce: string;

  debtsAllocation: string;

  spousalSupportWaiver: string; // optional text or leave blank to use standard

  cobracontinuationNotice: string;

  nameChangeRights: string;

  taxMattersStatement: string;

  disputeResolutionProcedure: string;

  fullDisclosureConfirmation: string;

  submitToCourt: string;

  signPartyAName: string;
  signPartyBName: string;
  signDate: string;

  jurisdictionState: string;
}

export default function SeparationAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    partyAName: "",
    partyABorn: "",
    partyAAddress: "",
    partyBName: "",
    partyBBorn: "",
    partyBAddress: "",
    residencyState1: "",
    residencyState2: "",
    residencyCounty: "",
    residencyYears: "",
    residencyMonths: "",
    marriageDate: "",
    marriageCounty: "",
    marriageState: "",
    childrenStatement: "No children were born of this marriage, and no minor children are the subject of this Agreement.",
    separationDate: "",
    irreconcilableText: "The Parties agree and stipulate that due to irreconcilable differences, the marriage has suffered an irretrievable breakdown, and there exists no reasonable prospect of reconciliation.",
    disclosureStatementA: "",
    disclosureStatementB: "",
    incomeStatementA: "________ declares that he/she currently has no monthly income.",
    incomeStatementB: "________ declares that he/she currently has no monthly income.",
    cooperationDaysToExecute: "10",
    maritalHomeOccupant: "",
    maritalHomeAddress: "",
    maritalHomeExpensesProportions: "",
    conversionOwnerIfDivorce: "",
    debtsAllocation: "",
    spousalSupportWaiver: "",
    cobracontinuationNotice: "",
    nameChangeRights: "Neither Party is presently seeking a legal change of name. However, each reserves the right to petition the Court for a name change at a later date without restriction from the other.",
    taxMattersStatement: "The Parties affirm that there are no outstanding tax disputes, audits, or liabilities known to either at the time of execution of this Agreement.",
    disputeResolutionProcedure: "",
    fullDisclosureConfirmation: "",
    submitToCourt: "",
    signPartyAName: "",
    signPartyBName: "",
    signDate: "",
    jurisdictionState: "",
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
        y += size * 1.28;
      });
    };

    write("SEPARATION AGREEMENT", 14, true, true);
    write("\n");

    // Keep the original wording and punctuation exactly as provided, inserting user fields where appropriate.
    write(
      `This Separation Agreement (“Agreement”) is entered into by and between ${formData.partyAName || "___________"} (“Party A”), born ${formData.partyABorn ||
        "_______"}, residing at ${formData.partyAAddress || "___________"}, and ${formData.partyBName || "___________"} (“Party B”), born ${formData.partyBBorn ||
        "_______"}, residing at ${formData.partyBAddress || "___________"}, collectively referred to herein as the “Parties.” The Parties, having been duly sworn, state that the following provisions are true, correct, and voluntarily agreed upon. Except as expressly provided herein, this Agreement constitutes a full, final, and binding settlement of all matters of joint concern between the Parties, including but not limited to all property rights, allocation of debts, and any rights to spousal support. The Parties agree that the terms contained herein provide a fair, just, and equitable division of property and obligations, and that such terms are mutually satisfactory.`
    );

    write("\n");
    write("1.Jurisdiction of the Court", 12, true);
    write(
      `The Parties affirm that both ${formData.residencyState1 || "________"} and ${formData.residencyState2 || "________"} have been bona fide residents of ${formData.residencyCounty ||
        "________"} County for a continuous period of ${formData.residencyYears || "__"} years and ${formData.residencyMonths || "__"} months immediately preceding the execution of this Agreement. Such residency satisfies the statutory jurisdictional and venue requirements of the State of ${formData.residencyState2 ||
        "________"} for the purpose of entering into and enforcing this Agreement and obtaining a decree of legal separation.`
    );

    write("\n");
    write("2. Military Status of the Parties", 12, true);
    write("Each Party affirms that neither is presently a member of the Armed Forces of the United States or any other military service that would affect the jurisdiction of the Court or the enforceability of this Agreement.");

    write("\n");
    write("3. Date and Place of Marriage", 12, true);
    write(
      `The Parties were lawfully married to one another on ${formData.marriageDate || "________"}, in the County of ${formData.marriageCounty || "________"}, State of ${formData.marriageState ||
        "________"}. ${formData.childrenStatement || "No children were born of this marriage, and no minor children are the subject of this Agreement."}`
    );

    write("\n");
    write("4. Date of Separation", 12, true);
    write(`The Parties mutually acknowledge that they separated on ${formData.separationDate || "________"}, at which time they ceased to cohabit as spouses.`);

    write("\n");
    write("5. Grounds for Dissolution of Marriage", 12, true);
    write(formData.irreconcilableText || "The Parties agree and stipulate that due to irreconcilable differences, the marriage has suffered an irretrievable breakdown, and there exists no reasonable prospect of reconciliation.");

    write("\n");
    write("6. Disclosure of Assets and Liabilities", 12, true);
    write(
      `Each Party represents and warrants that they have made a full, frank, and complete disclosure of all assets, liabilities, and financial obligations owned individually or jointly. No property, whether community, marital, or separate, has been intentionally concealed or withheld. Both Parties acknowledge reliance on the truthfulness of the other’s disclosures in entering into this Agreement.`
    );

    write("\n");
    write("7. Statement of Income", 12, true);
    write(formData.incomeStatementA || "________ declares that he/she currently has no monthly income.");
    write(formData.incomeStatementB || "________ declares that he/she currently has no monthly income.");

    write("\n");
    write("8. Mutual Cooperation in Execution of Documents", 12, true);
    write(
      `The Parties agree to cooperate fully in executing any and all deeds, assignments, title certificates, or other legal documents necessary to carry out the terms of this Agreement and any resulting decree of legal separation. Such execution shall occur within ${formData.cooperationDaysToExecute ||
        "10"} (10) days of notification of entry of judgment. In the event a Party fails to execute any required document, the final decree of legal separation shall serve as an instrument of conveyance or transfer of title, enforceable as though executed by the defaulting Party.`
    );

    write("\n");
    write("9. Division of Assets and Property Rights", 12, true);
    write("Except as otherwise provided herein, each Party shall retain sole ownership, possession, and control over all tangible and intangible property currently in his/her possession.");

    write("\n");
    write("a. Marital Home", 12, true);
    write(
      `The Parties agree that ${formData.maritalHomeOccupant || "________"} shall remain in possession of the marital residence located at ${formData.maritalHomeAddress ||
        "__________"} and shall have exclusive rights to occupy the property during the period of legal separation. ${formData.maritalHomeOccupant ||
        "_________"} shall remain solely responsible for all mortgage obligations associated with said property during the separation. The Parties agree to share property-related expenses in the following proportions: ${formData.maritalHomeExpensesProportions ||
        "___________"}.`
    );
    write(
      `In the event the legal separation is converted to a decree of dissolution of marriage, ${formData.conversionOwnerIfDivorce ||
        "_________"} shall retain sole and absolute ownership of the marital residence located at ${formData.maritalHomeAddress || "________"}, together with all rights of title and possession, subject to any encumbrances thereon, for which ${formData.conversionOwnerIfDivorce ||
        "_________"} shall remain solely liable.`
    );

    write("\n");
    write("10. Allocation of Debts and Financial Obligations", 12, true);
    write(
      `${formData.debtsAllocation || "Each Party shall remain solely liable for any indebtedness incurred in his or her individual name prior to the marriage, subsequent to the date of separation, and during the marriage unless expressly stated otherwise herein. Each Party shall indemnify and hold the other harmless from any claim, liability, or expense arising from debts so allocated."}`
    );

    write("\n");
    write("11. Waiver of Spousal Support / Alimony", 12, true);
    write(
      formData.spousalSupportWaiver ||
        "The Parties expressly, knowingly, and voluntarily waive any present or future claim to spousal support, maintenance, or alimony. This waiver shall be binding, absolute, and irrevocable, and the Court shall have no continuing jurisdiction to modify or award such support at any future date."
    );

    write("\n");
    write("12. Medical Insurance and Continuation Benefits", 12, true);
    write(
      `On or before the date of the final hearing, each Party shall notify the other, in writing, of the availability of COBRA or any other statutory continuation benefits under their existing health care coverage. ${formData.cobracontinuationNotice || ""}`
    );

    write("\n");
    write("13. Name Change Rights", 12, true);
    write(formData.nameChangeRights || "Neither Party is presently seeking a legal change of name. However, each reserves the right to petition the Court for a name change at a later date without restriction from the other.");

    write("\n");
    write("14. Tax Matters and Liabilities", 12, true);
    write(formData.taxMattersStatement || "The Parties affirm that there are no outstanding tax disputes, audits, or liabilities known to either at the time of execution of this Agreement.");

    write("\n");
    write("15. Procedure for Future Dispute Resolution", 12, true);
    write(
      formData.disputeResolutionProcedure ||
        "The Parties agree to negotiate in good faith to resolve any future disputes arising from or related to this Agreement. If such negotiations fail, the Parties shall submit the matter to mediation before a mutually agreed upon mediator. Mediation may be terminated by either Party at any time. Should mediation prove unsuccessful, either Party may petition the Court for resolution of the dispute."
    );

    write("\n");
    write("16. Confirmation of Full and Fair Disclosure", 12, true);
    write(
      formData.fullDisclosureConfirmation ||
        "The Parties reaffirm that they have exchanged complete and accurate financial statements disclosing all assets, income, debts, and liabilities. Each acknowledges that this Agreement is fair, equitable, and free from fraud, coercion, or undue influence."
    );

    write("\n");
    write("17. Submission of Agreement for Court Approval", 12, true);
    write(
      formData.submitToCourt ||
        "The Parties agree to submit this Agreement to the Court for review and approval, and for incorporation into a Final Order and Decree of Legal Separation. Should the Parties later file for divorce or dissolution, they shall request that this Agreement be incorporated by reference into any final judgment issued by the Court."
    );

    write("\n");
    write("18. Execution and Acknowledgment", 12, true);
    write(
      `IN WITNESS WHEREOF, the Parties have executed this Agreement freely and voluntarily on this ${formData.signDate || "__ day of __, ----"}, intending to be legally bound by its terms.`
    );
    write("Party A: " + (formData.signPartyAName || "___________________"));
    write("Party B: " + (formData.signPartyBName || "___________________"));

    write("\n");
    write("STATE OF " + (formData.jurisdictionState || "_____") + " ) ss:");
    write("COUNTY OF ____ ) ss:");
    write(
      "On this ___ day of ____, ----, before me, the undersigned authority, personally appeared __________________ and __________________, known to me or satisfactorily proven to be the persons whose names are subscribed to this instrument, and acknowledged that they executed the same for the purposes therein contained."
    );
    write("Notary Public: ___________________");
    write("My Commission Expires: __________");

    doc.save("Separation_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Jurisdiction</h3>
              <Label>Party A - Full Name</Label>
              <Input name="partyAName" value={formData.partyAName} onChange={handleChange} />
              <Label>Party A - Date of Birth</Label>
              <Input name="partyABorn" value={formData.partyABorn} onChange={handleChange} />
              <Label>Party A - Address</Label>
              <Textarea name="partyAAddress" value={formData.partyAAddress} onChange={handleChange} />

              <hr />

              <Label>Party B - Full Name</Label>
              <Input name="partyBName" value={formData.partyBName} onChange={handleChange} />
              <Label>Party B - Date of Birth</Label>
              <Input name="partyBBorn" value={formData.partyBBorn} onChange={handleChange} />
              <Label>Party B - Address</Label>
              <Textarea name="partyBAddress" value={formData.partyBAddress} onChange={handleChange} />

              <hr />

              <Label>Residency State 1</Label>
              <Input name="residencyState1" value={formData.residencyState1} onChange={handleChange} />
              <Label>Residency State 2</Label>
              <Input name="residencyState2" value={formData.residencyState2} onChange={handleChange} />
              <Label>Residency County</Label>
              <Input name="residencyCounty" value={formData.residencyCounty} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Residency - Years</Label>
                  <Input name="residencyYears" value={formData.residencyYears} onChange={handleChange} />
                </div>
                <div>
                  <Label>Residency - Months</Label>
                  <Input name="residencyMonths" value={formData.residencyMonths} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Marriage & Separation Details</h3>
              <Label>Date of Marriage</Label>
              <Input name="marriageDate" value={formData.marriageDate} onChange={handleChange} />
              <Label>Marriage - County</Label>
              <Input name="marriageCounty" value={formData.marriageCounty} onChange={handleChange} />
              <Label>Marriage - State</Label>
              <Input name="marriageState" value={formData.marriageState} onChange={handleChange} />
              <Label>Children Statement</Label>
              <Textarea name="childrenStatement" value={formData.childrenStatement} onChange={handleChange} />
              <Label>Date of Separation</Label>
              <Input name="separationDate" value={formData.separationDate} onChange={handleChange} />
              <Label>Grounds text (clause 5) - optional override</Label>
              <Textarea name="irreconcilableText" value={formData.irreconcilableText} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Financials, Home & Debts</h3>
              <Label>Disclosure Statement - Party A</Label>
              <Textarea name="disclosureStatementA" value={formData.disclosureStatementA} onChange={handleChange} />
              <Label>Disclosure Statement - Party B</Label>
              <Textarea name="disclosureStatementB" value={formData.disclosureStatementB} onChange={handleChange} />
              <Label>Income Statement - Party A</Label>
              <Textarea name="incomeStatementA" value={formData.incomeStatementA} onChange={handleChange} />
              <Label>Income Statement - Party B</Label>
              <Textarea name="incomeStatementB" value={formData.incomeStatementB} onChange={handleChange} />
              <Label>Days to execute documents after judgment (default 10)</Label>
              <Input name="cooperationDaysToExecute" value={formData.cooperationDaysToExecute} onChange={handleChange} />

              <hr />

              <Label>Marital Home - Occupant During Separation</Label>
              <Input name="maritalHomeOccupant" value={formData.maritalHomeOccupant} onChange={handleChange} />
              <Label>Marital Home - Address</Label>
              <Textarea name="maritalHomeAddress" value={formData.maritalHomeAddress} onChange={handleChange} />
              <Label>Marital Home - Expense Proportions</Label>
              <Input name="maritalHomeExpensesProportions" value={formData.maritalHomeExpensesProportions} onChange={handleChange} />
              <Label>If divorce later, who retains ownership of marital home</Label>
              <Input name="conversionOwnerIfDivorce" value={formData.conversionOwnerIfDivorce} onChange={handleChange} />

              <Label>Allocation of Debts & Financial Obligations</Label>
              <Textarea name="debtsAllocation" value={formData.debtsAllocation} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Support, Insurance, Taxes & Disputes</h3>
              <Label>Spousal Support Waiver (optional custom text)</Label>
              <Textarea name="spousalSupportWaiver" value={formData.spousalSupportWaiver} onChange={handleChange} />
              <Label>COBRA / Continuation Notice text (optional)</Label>
              <Textarea name="cobracontinuationNotice" value={formData.cobracontinuationNotice} onChange={handleChange} />
              <Label>Name Change Rights (optional)</Label>
              <Textarea name="nameChangeRights" value={formData.nameChangeRights} onChange={handleChange} />
              <Label>Tax Matters Statement (optional)</Label>
              <Textarea name="taxMattersStatement" value={formData.taxMattersStatement} onChange={handleChange} />
              <Label>Dispute Resolution Procedure (optional)</Label>
              <Textarea name="disputeResolutionProcedure" value={formData.disputeResolutionProcedure} onChange={handleChange} />
              <Label>Full Disclosure Confirmation (optional)</Label>
              <Textarea name="fullDisclosureConfirmation" value={formData.fullDisclosureConfirmation} onChange={handleChange} />
              <Label>Submit to Court text (optional)</Label>
              <Textarea name="submitToCourt" value={formData.submitToCourt} onChange={handleChange} />
              <Label>Governing State for Notary / Jurisdiction</Label>
              <Input name="jurisdictionState" value={formData.jurisdictionState} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Party A - Signatory Name</Label>
              <Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} />
              <Label>Party B - Signatory Name</Label>
              <Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} />
              <Label>Signing Date (display in execution clause)</Label>
              <Input name="signDate" value={formData.signDate} onChange={handleChange} />
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

        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Separation Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
