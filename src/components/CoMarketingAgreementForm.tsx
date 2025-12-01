import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  firstPartyName: string;
  firstPartyAddress: string;
  firstPartyBusiness: string;
  secondPartyName: string;
  secondPartyAddress: string;
  secondPartyBusiness: string;
  territory: string;
  jointMarketingActivities: string;
  approvalOfMaterialsNote: string;
  postTerminationNote: string;
  marketDevelopmentNote: string;
  trainingNote: string;
  staffingResourcesNote: string;
  customerEngagementNote: string;
  productSalesNote: string;
  costSharingNote: string;
  accountingPaymentNote: string;
  ipUseNote: string;
  ipOwnershipNote: string;
  noRightsLicensesNote: string;
  confidentialityNote: string;
  confidentialityPeriod: string;
  indemnificationNote: string;
  defaultCureDays: string;
  forceMajeureNote: string;
  termEndDate: string;
  assignmentNote: string;
  entireAgreementNote: string;
  severabilityNote: string;
  amendmentNote: string;
  governingLaw: string;
  noticeProcedureNote: string;
  waiverNote: string;
  headingsNote: string;
  firstPartySignName: string;
  firstPartySignTitle: string;
  firstPartySignDate: string;
  secondPartySignName: string;
  secondPartySignTitle: string;
  secondPartySignDate: string;
  witness1Name: string;
  witness1CNIC: string;
  witness1Signature: string;
  witness1Date: string;
  witness2Name: string;
  witness2CNIC: string;
  witness2Signature: string;
  witness2Date: string;
}

export default function CoMarketingAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    firstPartyName: "",
    firstPartyAddress: "",
    firstPartyBusiness: "",
    secondPartyName: "",
    secondPartyAddress: "",
    secondPartyBusiness: "",
    territory: "",
    jointMarketingActivities: "",
    approvalOfMaterialsNote: "",
    postTerminationNote: "",
    marketDevelopmentNote: "",
    trainingNote: "",
    staffingResourcesNote: "",
    customerEngagementNote: "",
    productSalesNote: "",
    costSharingNote: "",
    accountingPaymentNote: "",
    ipUseNote: "",
    ipOwnershipNote: "",
    noRightsLicensesNote: "",
    confidentialityNote: "",
    confidentialityPeriod: "",
    indemnificationNote: "",
    defaultCureDays: "30",
    forceMajeureNote: "",
    termEndDate: "",
    assignmentNote: "",
    entireAgreementNote: "",
    severabilityNote: "",
    amendmentNote: "",
    governingLaw: "",
    noticeProcedureNote: "",
    waiverNote: "",
    headingsNote: "",
    firstPartySignName: "",
    firstPartySignTitle: "",
    firstPartySignDate: "",
    secondPartySignName: "",
    secondPartySignTitle: "",
    secondPartySignDate: "",
    witness1Name: "",
    witness1CNIC: "",
    witness1Signature: "",
    witness1Date: "",
    witness2Name: "",
    witness2CNIC: "",
    witness2Signature: "",
    witness2Date: "",
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

    // === CO-MARKETING AGREEMENT CONTENT ===
    addText("CO-MARKETING AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Co-Marketing Agreement (the "Agreement") is made and entered into as of ${formData.effectiveDate || "[Effective Date]"}, by and between:`
    );
    addText(`• ${formData.firstPartyName || "[First Party Name]"}, a company having its principal place of business at ${formData.firstPartyAddress || "[Address]"} (hereinafter referred to as the "First Party"); and`);
    addText(`• ${formData.secondPartyName || "[Second Party Name]"}, a company having its principal place of business at ${formData.secondPartyAddress || "[Address]"} (hereinafter referred to as the "Second Party");`);
    addText("Collectively referred to as the \"Parties\" and individually as a \"Party.\"");
    addText("\n");
    addText("WHEREAS, the First Party is engaged in the business of " + (formData.firstPartyBusiness || "[Specify Business]") + ", and the Second Party is engaged in the business of " + (formData.secondPartyBusiness || "[Specify Business]") + "; and");
    addText("WHEREAS, the Parties desire to cooperate in marketing, promoting, and selling each other’s products to their respective customer bases and prospects;");
    addText("NOW, THEREFORE, in consideration of the mutual covenants, promises, and obligations set forth herein, the Parties agree as follows:");
    addText("\n");

    addText("1. TERRITORY");
    addText(`The Parties shall promote, market, and sell the products of the other Party solely within the geographic region agreed upon, being ${formData.territory || "[Specify Territory]"} (the "Territory").`);
    addText("\n");

    addText("2. PROMOTION AND MARKETING");
    addText("2.1 Joint Marketing Activities");
    addText(
      formData.jointMarketingActivities ||
        "The Parties shall plan and execute joint marketing activities including, but not limited to, seminars, open houses, public relations campaigns, press releases, testimonials, product demonstrations, and participation in trade shows, conventions, and conferences as mutually agreed."
    );
    addText("2.2 Approval of Materials");
    addText(
      formData.approvalOfMaterialsNote ||
        "All promotional materials relating to either Party must be reviewed and approved in writing by the other Party prior to dissemination to customers or the public."
    );
    addText("2.3 Post-Termination");
    addText(
      formData.postTerminationNote ||
        "Upon expiration or termination of this Agreement, neither Party shall have any obligation to continue promoting the other Party’s products, unless separately agreed in writing."
    );
    addText("2.4 Market Development");
    addText(
      formData.marketDevelopmentNote ||
        "The Parties shall cooperate in identifying viable market segments, applications, and potential customers and shall work jointly to assess and plan for future market needs."
    );
    addText("\n");

    addText("3. TRAINING AND OPERATIONAL SUPPORT");
    addText("3.1 Training");
    addText(
      formData.trainingNote ||
        "Each Party shall provide technical training to the other Party’s employees sufficient to understand the products, applications, organizational procedures, and other relevant information necessary for effective marketing."
    );
    addText("3.2 Staffing and Resources");
    addText(
      formData.staffingResourcesNote ||
        "Each Party shall determine, in its sole discretion, the personnel, resources, and level of support to assign to the co-marketing program. All costs incurred shall be borne by the Party incurring them unless otherwise agreed."
    );
    addText("3.3 Customer Engagement");
    addText(
      formData.customerEngagementNote ||
        "The Parties shall share customer leads, conduct joint demonstrations, and participate in joint visits, presentations, and proposals as appropriate."
    );
    addText("\n");

    addText("4. PRODUCTS, SALES, AND COSTS");
    addText("4.1 Product Sales");
    addText(
      formData.productSalesNote ||
        "Each Party shall sell or rent the other Party’s products to customers pursuant to standard procedures or special agreements executed in advance."
    );
    addText("4.2 Cost Sharing");
    addText(
      formData.costSharingNote ||
        "Both Parties shall share the responsibility for the costs, management, and tracking of marketing campaigns, including deployment of staff to promote products directly to their customer databases."
    );
    addText("4.3 Accounting and Payment");
    addText(
      formData.accountingPaymentNote ||
        "Each Party shall submit monthly itemized accounting statements reflecting sales attributable to the Co-Marketing Agreement. Payments of agreed percentages of sales proceeds shall be made promptly in accordance with the agreed terms. Failure to submit accurate accounting or timely payment shall constitute a material default under this Agreement."
    );
    addText("\n");

    addText("5. INTELLECTUAL PROPERTY AND TRADEMARKS");
    addText("5.1 Use of Marks and Names");
    addText(
      formData.ipUseNote ||
        "Neither Party shall use the other Party’s name, trademarks, or trade names in any publicity or advertisement without prior written consent. Authorized use is limited to identifying the Party as a partner or for purposes directly related to this Agreement."
    );
    addText("5.2 Ownership");
    addText(
      formData.ipOwnershipNote ||
        "All intellectual property, trademarks, and trade names remain the exclusive property of the owning Party. Each Party agrees not to take any action inconsistent with such ownership and shall assist in protecting the other Party’s rights if reasonably requested."
    );
    addText("5.3 No Rights or Licenses");
    addText(
      formData.noRightsLicensesNote ||
        "No rights, licenses, or permissions to manufacture, use, or sell the other Party’s products beyond the co-marketing activities expressly contemplated herein are granted."
    );
    addText("\n");

    addText("6. CONFIDENTIALITY");
    addText("6.1 Obligations");
    addText(
      formData.confidentialityNote ||
        "Each Party shall:\n(a) Maintain all confidential information in strict confidence;\n(b) Restrict disclosure to employees or agents with a need to know;\n(c) Notify such personnel of their confidentiality obligations; and\n(d) Use confidential information solely for the purposes of this Agreement."
    );
    addText("6.2 Permitted Disclosures");
    addText(
      "Disclosure is permitted only as required by law, or with prior written consent of the disclosing Party."
    );
    addText(`Confidentiality obligations shall remain in force for a minimum period of ${formData.confidentialityPeriod || "[specified period]"} from the date of disclosure.`);
    addText("\n");

    addText("7. INDEMNIFICATION");
    addText(
      formData.indemnificationNote ||
        "Each Party agrees to indemnify, defend, and hold harmless the other Party, including its officers, directors, employees, and agents, against any claims, losses, costs, damages, or liabilities arising out of its acts or omissions, including those of its personnel."
    );
    addText("\n");

    addText("8. DEFAULT AND REMEDIES");
    addText("8.1 Events of Default");
    addText(
      formData.defaultCureDays
        ? `(a) Failure to make a required payment when due;\n(b) Insolvency or bankruptcy of a Party;\n(c) Seizure, levy, or assignment of a Party’s property;\n(d) Failure to provide marketing assistance or services as required.`
        : "(a) Failure to make a required payment when due;\n(b) Insolvency or bankruptcy of a Party;\n(c) Seizure, levy, or assignment of a Party’s property;\n(d) Failure to provide marketing assistance or services as required."
    );
    addText("8.2 Remedies");
    addText(
      `The non-defaulting Party may issue written notice specifying the default. The defaulting Party shall have ${formData.defaultCureDays || "[Specify Number of Days]"} to cure the default. Failure to cure shall entitle the non-defaulting Party to terminate the Agreement and exercise any other remedies available under law.`
    );
    addText("\n");

    addText("9. FORCE MAJEURE");
    addText(
      formData.forceMajeureNote ||
        "Neither Party shall be liable for delays or failures due to causes beyond reasonable control, including acts of God, fire, explosion, natural disasters, strikes, lockouts, insurrections, war, or governmental actions. The affected Party shall promptly notify the other Party and make reasonable efforts to resume performance."
    );
    addText("\n");

    addText("10. TERM AND TERMINATION");
    addText(
      `The term of this Agreement shall commence on the Effective Date and shall continue until ${formData.termEndDate || "[Specify End Date]"}, unless earlier terminated in accordance with this Agreement.`
    );
    addText("\n");

    addText("11. BOILERPLATE PROVISIONS");
    addText("11.1 Assignment");
    addText(formData.assignmentNote || "Neither Party may assign or transfer this Agreement without prior written consent of the other Party.");
    addText("11.2 Entire Agreement");
    addText(formData.entireAgreementNote || "This Agreement constitutes the complete understanding of the Parties and supersedes all prior agreements, whether oral or written.");
    addText("11.3 Severability");
    addText(formData.severabilityNote || "If any provision is held invalid, illegal, or unenforceable, the remainder shall remain in full force and effect.");
    addText("11.4 Amendment");
    addText(formData.amendmentNote || "This Agreement may only be amended or modified in writing and signed by both Parties.");
    addText("11.5 Governing Law");
    addText(`This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[Specify Jurisdiction]"}.`);
    addText("11.6 Notice");
    addText(formData.noticeProcedureNote || "Notices shall be sent via personal delivery or certified mail, return receipt requested, to the addresses set forth above or as otherwise provided in writing.");
    addText("11.7 Waiver");
    addText(formData.waiverNote || "Failure to enforce any provision shall not constitute a waiver of the right to enforce it in the future.");
    addText("11.8 Headings");
    addText(formData.headingsNote || "Headings are for reference only and shall not affect the interpretation of this Agreement.");
    addText("\n");

    addText("12. SIGNATORIES");
    addText("IN WITNESS WHEREOF, the Parties have executed this Co-Marketing Agreement as of the date first written above.");
    addText("\n");
    addText("FIRST PARTY");
    addText(`Name: ${formData.firstPartySignName || "__________________________"}`);
    addText(`Title: ${formData.firstPartySignTitle || "__________________________"}`);
    addText(`Signature: ${"__________________________"}`);
    addText(`Date: ${formData.firstPartySignDate || "___________________________"}`);
    addText("\nSECOND PARTY");
    addText(`Name: ${formData.secondPartySignName || "__________________________"}`);
    addText(`Title: ${formData.secondPartySignTitle || "__________________________"}`);
    addText(`Signature: ${"__________________________"}`);
    addText(`Date: ${formData.secondPartySignDate || "___________________________"}`);
    addText("\nWITNESSES");
    addText(`1. Name: ${formData.witness1Name || "__________________________"}`);
    addText(`CNIC/ID No.: ${formData.witness1CNIC || "____________________"}`);
    addText(`Signature: ${formData.witness1Signature || "____________________"}`);
    addText(`Date: ${formData.witness1Date || "____________________"}`);
    addText(`\n2. Name: ${formData.witness2Name || "__________________________"}`);
    addText(`CNIC/ID No.: ${formData.witness2CNIC || "____________________"}`);
    addText(`Signature: ${formData.witness2Signature || "____________________"}`);
    addText(`Date: ${formData.witness2Date || "____________________"}`);

    // Save file
    doc.save("Co_Marketing_Agreement.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>First Party Name</Label>
              <Input name="firstPartyName" value={formData.firstPartyName} onChange={handleChange} />
              <Label>First Party Address</Label>
              <Input name="firstPartyAddress" value={formData.firstPartyAddress} onChange={handleChange} />
              <Label>First Party Business</Label>
              <Input name="firstPartyBusiness" value={formData.firstPartyBusiness} onChange={handleChange} />
              <Label>Second Party Name</Label>
              <Input name="secondPartyName" value={formData.secondPartyName} onChange={handleChange} />
              <Label>Second Party Address</Label>
              <Input name="secondPartyAddress" value={formData.secondPartyAddress} onChange={handleChange} />
              <Label>Second Party Business</Label>
              <Input name="secondPartyBusiness" value={formData.secondPartyBusiness} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Promotion, Training & Market Dev</h3>
              <Label>Territory</Label>
              <Input name="territory" value={formData.territory} onChange={handleChange} />
              <Label>Joint Marketing Activities (list / details)</Label>
              <textarea
                name="jointMarketingActivities"
                value={formData.jointMarketingActivities}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Approval of Materials Note</Label>
              <Input name="approvalOfMaterialsNote" value={formData.approvalOfMaterialsNote} onChange={handleChange} />
              <Label>Post-Termination Note</Label>
              <Input name="postTerminationNote" value={formData.postTerminationNote} onChange={handleChange} />
              <Label>Market Development Note</Label>
              <textarea
                name="marketDevelopmentNote"
                value={formData.marketDevelopmentNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Training Note</Label>
              <textarea
                name="trainingNote"
                value={formData.trainingNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Staffing & Resources Note</Label>
              <Input name="staffingResourcesNote" value={formData.staffingResourcesNote} onChange={handleChange} />
              <Label>Customer Engagement Note</Label>
              <Input name="customerEngagementNote" value={formData.customerEngagementNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Products / IP / Confidentiality</h3>
              <Label>Product Sales Note</Label>
              <textarea name="productSalesNote" value={formData.productSalesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Cost Sharing Note</Label>
              <Input name="costSharingNote" value={formData.costSharingNote} onChange={handleChange} />
              <Label>Accounting & Payment Note</Label>
              <textarea name="accountingPaymentNote" value={formData.accountingPaymentNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>IP Use Note</Label>
              <Input name="ipUseNote" value={formData.ipUseNote} onChange={handleChange} />
              <Label>IP Ownership Note</Label>
              <Input name="ipOwnershipNote" value={formData.ipOwnershipNote} onChange={handleChange} />
              <Label>No Rights / Licenses Note</Label>
              <Input name="noRightsLicensesNote" value={formData.noRightsLicensesNote} onChange={handleChange} />
              <Label>Confidentiality Period</Label>
              <Input name="confidentialityPeriod" value={formData.confidentialityPeriod} onChange={handleChange} />
              <Label>Indemnification Note</Label>
              <Input name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
              <Label>Force Majeure Note</Label>
              <Input name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term / Boilerplate / Signatures</h3>
              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />
              <Label>Assignment Note</Label>
              <Input name="assignmentNote" value={formData.assignmentNote} onChange={handleChange} />
              <Label>Entire Agreement Note</Label>
              <Input name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Governing Law</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
              <Label>Notice Procedure Note</Label>
              <Input name="noticeProcedureNote" value={formData.noticeProcedureNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <Label>Headings Note</Label>
              <Input name="headingsNote" value={formData.headingsNote} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">First Party Signatory</h4>
              <Label>Name</Label>
              <Input name="firstPartySignName" value={formData.firstPartySignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="firstPartySignTitle" value={formData.firstPartySignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="firstPartySignDate" value={formData.firstPartySignDate} onChange={handleChange} />
              <h4 className="font-semibold">Second Party Signatory</h4>
              <Label>Name</Label>
              <Input name="secondPartySignName" value={formData.secondPartySignName} onChange={handleChange} />
              <Label>Title</Label>
              <Input name="secondPartySignTitle" value={formData.secondPartySignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="secondPartySignDate" value={formData.secondPartySignDate} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Witness 1</h4>
              <Label>Name</Label>
              <Input name="witness1Name" value={formData.witness1Name} onChange={handleChange} />
              <Label>CNIC / ID No.</Label>
              <Input name="witness1CNIC" value={formData.witness1CNIC} onChange={handleChange} />
              <Label>Signature</Label>
              <Input name="witness1Signature" value={formData.witness1Signature} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="witness1Date" value={formData.witness1Date} onChange={handleChange} />
              <h4 className="font-semibold">Witness 2</h4>
              <Label>Name</Label>
              <Input name="witness2Name" value={formData.witness2Name} onChange={handleChange} />
              <Label>CNIC / ID No.</Label>
              <Input name="witness2CNIC" value={formData.witness2CNIC} onChange={handleChange} />
              <Label>Signature</Label>
              <Input name="witness2Signature" value={formData.witness2Signature} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="witness2Date" value={formData.witness2Date} onChange={handleChange} />
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

        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 5 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Co-Marketing Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
