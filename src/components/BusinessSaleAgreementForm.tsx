import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface FormData {
  effectiveDate: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  businessDescription: string;
  scheduleA: string;
  sellerState: string;
  nonCompeteYears: string;
  nonCompeteArea: string;
  buyerFinancials: string;
  conductNotes: string;
  purchasePrice: string;
  depositAmount: string;
  closingDate: string;
  escrowAgent: string;
  closingChecklistNotes: string;
  schedulesNotes: string;
  governingLaw: string;
  signSellerName: string;
  signSellerDate: string;
  signBuyerName: string;
  signBuyerDate: string;
}

export default function BusinessSaleAgreementForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    businessDescription: "",
    scheduleA: "",
    sellerState: "",
    nonCompeteYears: "0",
    nonCompeteArea: "",
    buyerFinancials: "",
    conductNotes: "",
    purchasePrice: "",
    depositAmount: "",
    closingDate: "",
    escrowAgent: "",
    closingChecklistNotes: "",
    schedulesNotes: "",
    governingLaw: "",
    signSellerName: "",
    signSellerDate: "",
    signBuyerName: "",
    signBuyerDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const write = (doc: jsPDF, text: string, state: { y: number }, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
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
      state.y += size * 1.3;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const state = { y: 40 };

    write(doc, "BUSINESS SALE AGREEMENT", state, { size: 14, bold: true, center: true });
    write(doc, "\n", state);

    write(
      doc,
      `This Business Sale Agreement (“Agreement”) is entered into as of ${formData.effectiveDate || "[-------]"} (the “Effective Date”), by and between ${formData.sellerName ||
        "[--------]"} (“Seller”), and ${formData.buyerName || "[-----------]"} (“Buyer”).`,
      state
    );

    write(doc, "\nA. Subject Matter", state, { size: 12, bold: true });
    write(doc, "1. Description of Business", state);
    write(doc, formData.businessDescription || "[Business description here]", state);
    write(doc, "\n2. Agreement to Sell", state);
    write(
      doc,
      "The Seller agrees to transfer, sell, and convey to the Buyer, and the Buyer agrees to purchase and accept, all rights, title, and interest in and to the Business, subject to the terms and conditions set forth in this Agreement.",
      state
    );

    write(doc, "\nB. Representations and Warranties of Seller", state, { size: 12, bold: true });
    write(doc, "The Seller represents and warrants to the Buyer as of the date hereof and the Closing Date:", state);
    write(doc, `1. Organization and Standing – The Business is duly organized, validly existing, and in good standing under the laws of ${formData.sellerState || "[State]"}.`, state);
    write(doc, "2. Authority – The Seller has full corporate authority to execute and perform this Agreement. Execution and performance will not:", state);
    write(doc, "   (i) violate its articles of incorporation, bylaws, or any law, contract, or instrument;", state);
    write(doc, "   (ii) violate any judicial or administrative order; or", state);
    write(doc, "   (iii) create any lien, encumbrance, or obligation, except as expressly permitted herein.", state);
    write(doc, "3. Enforceability – This Agreement constitutes a valid and binding obligation enforceable under law, subject to bankruptcy, insolvency, or equitable principles.", state);
    write(doc, "4. Tax Matters – All federal, state, and local taxes due have been filed and paid; no audits or disputes materially affecting the Business exist.", state);
    write(doc, "5. Properties and Assets – Seller has good and marketable title to all assets of the Business. Assets shall be free from liens, encumbrances, or claims at Closing, except as disclosed.", state);
    write(doc, "6. Litigation – No pending or threatened legal actions impede the ability to consummate this transaction.", state);
    write(doc, "7. Compliance with Laws – The transfer and sale of the Business complies with all applicable laws.", state);
    write(doc, "8. Documents for Review – All documents listed in Exhibit A are true, authentic, and complete.", state);
    write(doc, `9. Non-Compete – Seller agrees not to compete with the Business for ${formData.nonCompeteYears || "[BLANK]"} years within ${formData.nonCompeteArea ||
      "[Geographical Area]"}.`, state);
    write(doc, "10. Business Lease – Any lease related to the Business is current, valid, and transferable.", state);
    write(doc, "11. Disclaimers – Except as expressly set forth, Seller disclaims all other warranties or representations.", state);

    write(doc, "\nC. Representations and Warranties of Buyer", state, { size: 12, bold: true });
    write(doc, "The Buyer represents and warrants:", state);
    write(doc, "1. Brokerage Fees – No act or omission gives rise to any valid claim for brokerage or finder’s fees.", state);
    write(doc, `2. Financial Resources – Buyer has sufficient funds to pay the Purchase Price and any post-Closing obligations. (${formData.buyerFinancials || ""})`, state);
    write(doc, "3. Investment Status – Buyer is not subject to the Investment Company Act of 1940 or similar regulations.", state);

    write(doc, "\nD. Conduct Prior to Closing", state, { size: 12, bold: true });
    write(doc, "1. Cooperation – Both parties shall execute all documents and provide assistance reasonably necessary to consummate the transaction.", state);
    write(doc, "2. Business Operations – Seller shall operate the Business in the ordinary course and avoid actions that would materially affect the representations or warranties herein.", state);
    write(doc, "3. Resignations – Seller shall provide resignations of officers or employees as requested by Buyer.", state);
    write(doc, "4. Satisfaction of Encumbrances – All liens or security interests shall be released at or prior to Closing.", state);
    write(doc, "5. Notice of Changes – Seller shall promptly advise Buyer in writing of any material change in the Business prior to Closing.", state);
    write(doc, "6. Delivery of Documents – Seller shall deliver all documents necessary for full transfer of ownership at Closing.", state);
    if (formData.conductNotes) write(doc, `\nNote: ${formData.conductNotes}`, state);

    write(doc, "\nE. General Provisions", state, { size: 12, bold: true });
    write(doc, "1. Costs and Expenses – Each party bears its own costs related to negotiation, execution, and delivery of this Agreement.", state);
    write(doc, "2. Indemnification – Seller indemnifies Buyer for liabilities prior to Closing. Buyer indemnifies Seller for liabilities post-Closing.", state);
    write(doc, "3. Default – Material breach allows the non-defaulting party to cancel the transaction and/or seek damages, including attorney’s fees. Defaults must be cured within [BLANK] days of notice.", state);
    write(doc, "4. Survival – Representations, warranties, and covenants survive the Closing.", state);
    write(doc, "5. Dispute Resolution – Parties shall negotiate in good faith; if unresolved, disputes proceed to mediation under statutory rules.", state);
    write(doc, "6. Conditions Precedent – Failure to satisfy obligations by specified dates renders this Agreement void, and deposits shall be refunded.", state);
    write(doc, "7. Time of Essence – Timely performance is critical.", state);
    write(doc, "8. Successors and Assigns – Rights and obligations bind the parties and their successors or assigns; no assignment without written consent.", state);
    write(doc, "9. Waivers – Non-enforcement of any provision does not waive future rights.", state);
    write(doc, "10. Third-Party Beneficiaries – No third-party rights unless expressly provided.", state);
    write(doc, "11. Notices – Notices must be in writing, delivered personally or via certified mail to the addresses listed herein.", state);
    write(doc, "12. Headings – Section headings are for reference and do not affect interpretation.", state);
    write(doc, `13. Governing Law and Venue – This Agreement is governed by the laws of ${formData.governingLaw || "[State]"}. Any disputes will be adjudicated in the courts of ${formData.governingLaw ||
      "[State]"}.`, state);

    write(doc, "\nF. Closing Checklist", state, { size: 12, bold: true });
    write(doc, `At or before Closing (${formData.closingDate || "[Closing Date]"}), the following shall occur:`, state);
    write(doc, "1. Execution of Agreement – Fully executed Agreement delivered to both parties.", state);
    write(doc, `2. Payment of Purchase Price – Buyer delivers full Purchase Price as follows: Purchase Price: ${formData.purchasePrice || "[Purchase Price]"}, Deposit: ${formData.depositAmount ||
      "[Deposit Amount]"}.`, state);
    write(doc, `3. Transfer of Assets – Seller transfers all Business assets per Schedule A. See Schedule A below.`, state);
    write(doc, "4. Release of Encumbrances – All liens, mortgages, or security interests are satisfied or released.", state);
    write(doc, "5. Delivery of Documents – Seller delivers corporate, financial, and operational documents.", state);
    write(doc, "6. Resignations – Officer/employee resignations delivered as requested.", state);
    write(doc, "7. Non-Compete and Non-Solicitation – Seller executes agreements for post-Closing restrictions.", state);
    write(doc, "8. Final Tax Clearance – Seller confirms taxes are current, or arrangements provided.", state);
    if (formData.escrowAgent) write(doc, `\nEscrow / Title / Closing Agent: ${formData.escrowAgent}`, state);
    if (formData.closingChecklistNotes) write(doc, `\nNotes: ${formData.closingChecklistNotes}`, state);

    write(doc, "\nG. Schedules of Assets, Liabilities, and Employees", state, { size: 12, bold: true });
    write(doc, "Schedule 1: Business Assets", state);
    write(doc, "• Tangible Assets: equipment, furniture, inventory", state);
    write(doc, "• Intangible Assets: trademarks, patents, copyrights", state);
    write(doc, "• Contracts: supplier, client, licensing agreements", state);
    write(doc, "• Licenses & Permits", state);
    write(doc, "\nSchedule 2: Liabilities to be Assumed", state);
    write(doc, "• Outstanding Accounts Payable", state);
    write(doc, "• Accrued Employee Benefits", state);
    write(doc, "• Lease obligations or other contractual obligations", state);
    write(doc, "\nSchedule 3: Employees", state);
    write(doc, "• List of employees, positions, salaries, and start dates", state);
    write(doc, "• Employee agreements, if any, including benefits and obligations", state);

    if (formData.scheduleA) {
      write(doc, "\nSchedule A (detailed assets & exclusions):", state, { bold: true });
      write(doc, formData.scheduleA, state);
    } else if (formData.schedulesNotes) {
      write(doc, "\nSchedule Notes:", state, { bold: true });
      write(doc, formData.schedulesNotes, state);
    }

    write(doc, "\nH. Signatures", state, { size: 12, bold: true });
    write(doc, `IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date (${formData.effectiveDate || "_________"}).`, state);
    write(doc, "\nSeller:", state);
    write(doc, `${formData.sellerName || "[Seller Name]"}\nSignature: ___________________\nDate: ${formData.signSellerDate || "________________"}`, state);
    write(doc, "\nBuyer:", state);
    write(doc, `${formData.buyerName || "[Buyer Name]"}\nSignature: ___________________\nDate: ${formData.signBuyerDate || "________________"}`, state);

    doc.save("Business_Sale_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
            <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/business-sale-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Business Sale Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Subject Matter</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Seller</h4>
              <Label>Name</Label>
              <Input name="sellerName" value={formData.sellerName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Buyer</h4>
              <Label>Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} />

              <Label>Business Description</Label>
              <Textarea name="businessDescription" value={formData.businessDescription} onChange={handleChange} />

              <Label>Schedule A (assets, exclusions)</Label>
              <Textarea name="scheduleA" value={formData.scheduleA} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Representations & Non-Compete</h3>
              <Label>Seller - State of Organization</Label>
              <Input name="sellerState" value={formData.sellerState} onChange={handleChange} />
              <Label>Non-Compete (years)</Label>
              <Input name="nonCompeteYears" value={formData.nonCompeteYears} onChange={handleChange} />
              <Label>Non-Compete (geographical area)</Label>
              <Input name="nonCompeteArea" value={formData.nonCompeteArea} onChange={handleChange} />
              <Label>Buyer Financials / Notes</Label>
              <Textarea name="buyerFinancials" value={formData.buyerFinancials} onChange={handleChange} />
              <Label>Conduct / Pre-closing Notes</Label>
              <Textarea name="conductNotes" value={formData.conductNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Purchase & Closing</h3>
              <Label>Purchase Price</Label>
              <Input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} />
              <Label>Deposit Amount</Label>
              <Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} />
              <Label>Closing Date</Label>
              <Input name="closingDate" value={formData.closingDate} onChange={handleChange} />
              <Label>Escrow / Closing Agent</Label>
              <Input name="escrowAgent" value={formData.escrowAgent} onChange={handleChange} />
              <Label>Closing Checklist Notes</Label>
              <Textarea name="closingChecklistNotes" value={formData.closingChecklistNotes} onChange={handleChange} />
              <Label>Other Schedules / Notes</Label>
              <Textarea name="schedulesNotes" value={formData.schedulesNotes} onChange={handleChange} />
              <Label>Governing Law / Venue (State)</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Seller - Signatory Name</Label>
              <Input name="signSellerName" value={formData.signSellerName} onChange={handleChange} />
              <Label>Seller - Date</Label>
              <Input name="signSellerDate" value={formData.signSellerDate} onChange={handleChange} />
              <Label>Buyer - Signatory Name</Label>
              <Input name="signBuyerName" value={formData.signBuyerName} onChange={handleChange} />
              <Label>Buyer - Date</Label>
              <Input name="signBuyerDate" value={formData.signBuyerDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Business Sale Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
