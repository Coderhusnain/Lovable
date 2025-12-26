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
  assetsSummary: string;
  exhibitADetails: string;
  purchasePrice: string;
  depositAmount: string;
  balanceAmount: string;
  escrowAccount: string;
  closingDate: string;
  titleLocations: string;
  deliveryLocations: string;
  conditionInventoryDate: string;
  sellerRepsSummary: string;
  taxRepresentation: string;
  insuranceNotes: string;
  licensesNotes: string;
  litigationNotes: string;
  environmentalNotes: string;
  billOfSaleNotes: string;
  riskOfLossNotes: string;
  furtherAssurancesNotes: string;
  bulkSalesNotes: string;
  conditionsPrecedentNotes: string;
  adrNotes: string;
  feesNotes: string;
  indemnificationNotes: string;
  governingLaw: string;
  sellerSignatureName: string;
  sellerSignatureDate: string;
  buyerSignatureName: string;
  buyerSignatureDate: string;
}

export default function AssetPurchaseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    assetsSummary: "",
    exhibitADetails: "",
    purchasePrice: "",
    depositAmount: "",
    balanceAmount: "",
    escrowAccount: "",
    closingDate: "",
    titleLocations: "",
    deliveryLocations: "",
    conditionInventoryDate: "",
    sellerRepsSummary: "",
    taxRepresentation: "",
    insuranceNotes: "",
    licensesNotes: "",
    litigationNotes: "",
    environmentalNotes: "",
    billOfSaleNotes: "",
    riskOfLossNotes: "",
    furtherAssurancesNotes: "",
    bulkSalesNotes: "",
    conditionsPrecedentNotes: "",
    adrNotes: "",
    feesNotes: "",
    indemnificationNotes: "",
    governingLaw: "",
    sellerSignatureName: "",
    sellerSignatureDate: "",
    buyerSignatureName: "",
    buyerSignatureDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const write = (doc: jsPDF, text: string, ref: { y: number }, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    const size = opts?.size ?? 11;
    doc.setFont("times", opts?.bold ? ("bold" as any) : ("normal" as any));
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    for (const line of lines) {
      if (ref.y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        ref.y = margin;
      }
      if (opts?.center) {
        const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
        const tx = (pageW - tw) / 2;
        doc.text(line, tx, ref.y);
      } else {
        doc.text(line, margin, ref.y);
      }
      ref.y += size * 1.3;
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const ref = { y: 40 };

    write(doc, "ASSET PURCHASE AGREEMENT", ref, { size: 14, bold: true, center: true });
    write(doc, "\n", ref);

    // Preamble
    write(
      doc,
      `This Asset Purchase Agreement (“Agreement”) is made as of ${formData.effectiveDate || "[-------]"} (the “Effective Date”), by and between:\n\nSeller: ${formData.sellerName || "[--------]"}, with its principal place of business at ${formData.sellerAddress ||
        "[-------]"} (“Seller”), and\nBuyer: ${formData.buyerName || "[-------]"}, with offices at ${formData.buyerAddress || "[-------]"} (“Buyer”).`,
      ref
    );

    write(doc, "\nRECITALS", ref, { size: 12, bold: true });
    write(
      doc,
      "IN CONSIDERATION of the mutual covenants, promises, representations, warranties, and agreements set forth herein, and for other good and valuable consideration, the sufficiency and receipt of which are hereby acknowledged, the parties agree as follows:",
      ref
    );

    // Section 1
    write(doc, "\n1. Purchase of Assets", ref, { size: 12, bold: true });

    write(doc, "\n1.1 Assets to Be Sold", ref);
    write(
      doc,
      `Subject to the terms and conditions of this Agreement, the Seller agrees to sell, assign, transfer, and convey to the Buyer, and the Buyer agrees to purchase from the Seller, all of the Seller’s right, title, and interest in and to the following assets (collectively, the “Assets”):\n\nAll tangible personal property of the business, including fixtures, equipment, machinery, inventory, and supplies, as detailed in Exhibit A attached hereto;\nAll intangible assets, including but not limited to trade names, business names, telephone numbers, listings, customer lists, goodwill, trademarks, trade secrets, intellectual property, contracts, and any proprietary software or processes associated with the business;\nAny other property, rights, or assets used in the operation of the business as disclosed in the attached schedules.`,

      ref
    );

    write(doc, `\n1.2 Exclusion of Liabilities\nThe Buyer shall not assume or become liable for any debts, obligations, or liabilities of the Seller, its shareholders, directors, officers, affiliates, creditors, or related entities, except as expressly provided in this Agreement or agreed in writing.`, ref);

    // Section 2
    write(doc, "\n2. Purchase Price", ref, { size: 12, bold: true });

    write(doc, "\n2.1 Total Purchase Price", ref);
    write(doc, `The total purchase price for the Assets shall be $${formData.purchasePrice || "[-------]"} (the “Purchase Price”), payable as follows:`, ref);

    write(doc, "\n2.2 Deposit", ref);
    write(doc, `Upon execution of this Agreement, the Buyer shall deposit $${formData.depositAmount || "[-------]"} into an escrow account designated under Section 3 below.`, ref);

    write(doc, "\n2.3 Balance Payment", ref);
    write(
      doc,
      `The remainder of the Purchase Price, $${formData.balanceAmount || "[------]"}, shall be deposited into the escrow account on or before the Closing Date. Payment shall be made in cleared funds, free of any deductions, charges, or setoffs unless otherwise agreed in writing.`,
      ref
    );

    // Section 3
    write(doc, "\n3. Closing and Escrow", ref, { size: 12, bold: true });

    write(doc, "\n3.1 Closing Date", ref);
    write(doc, `The Closing of the purchase and sale of the Assets (the “Closing”) shall occur on ${formData.closingDate || "[-----]"}, or on such other date as the parties may mutually agree in writing (the “Closing Date”).`, ref);

    write(doc, "\n3.2 Escrow and Title Company", ref);
    write(
      doc,
      `If a title company or escrow agent is used to facilitate the Closing, the parties shall mutually select the agent or company.\nCosts associated with escrow or title services shall be borne equally unless otherwise agreed.\nEach party shall promptly deliver all documentation, instruments, and certifications requested by the escrow agent or title company necessary to effectuate the Closing.`,
      ref
    );

    write(doc, "\n3.3 Delivery and Transfer of Assets", ref);
    write(
      doc,
      `On the Closing Date:\nAll inventory, equipment, and fixtures to be transferred shall be located at ${formData.deliveryLocations || "[-------]"} and ${formData.titleLocations ||
        "[---------]"}, and shall not be removed, altered, or encumbered without prior written consent of the Buyer.\nThe Seller shall deliver to the Buyer possession of all Assets free from liens, claims, and encumbrances except as expressly permitted herein.`,
      ref
    );

    // Section 4
    write(doc, "\n4. Representations and Warranties of Seller", ref, { size: 12, bold: true });

    write(
      doc,
      `The Seller represents, warrants, and covenants to the Buyer as follows, as of the date hereof and as of the Closing Date:`,
      ref
    );

    write(doc, "\n4.1 Consents and Approvals", ref);
    write(doc, "No consent, authorization, or approval of any governmental authority, board of directors, or third party is required to execute, deliver, or perform this Agreement, except those obtained as disclosed to the Buyer.", ref);

    write(doc, "\n4.2 Condition of Assets", ref);
    write(
      doc,
      `All tangible Assets are merchantable, in good working order, and fit for their intended use.\nInventory, including finished goods, is of a type, quantity, and quality suitable for sale in the ordinary course of business.\nNo asset is subject to latent defects or damage that materially impairs its use.`,
      ref
    );

    write(doc, "\n4.3 Taxes", ref);
    write(doc, `The Seller has timely paid all federal, state, and local taxes relating to the Assets or the business, and has filed all required tax returns. No tax lien or assessment exists that would attach to the Assets being sold.`, ref);

    write(doc, "\n4.4 Insurance", ref);
    write(doc, `The Seller shall provide copies of all existing insurance policies relating to the Assets and Business. The Buyer may elect to assume any such policies, subject to insurer approval.`, ref);

    write(doc, "\n4.5 Licenses, Permits, and Compliance", ref);
    write(
      doc,
      `The Seller has obtained all licenses, permits, or approvals necessary to operate the business and transfer the Assets.\nThe business is operated in compliance with all applicable laws, regulations, and ordinances, including environmental, health, and safety regulations.`,
      ref
    );

    write(doc, "\n4.6 Litigation", ref);
    write(doc, "There is no pending or threatened litigation, claim, or governmental proceeding involving the Assets or Business that would materially impair the value of the Assets or the Seller’s ability to transfer them.", ref);

    write(doc, "\n4.7 Ownership and Authority", ref);
    write(
      doc,
      `The Seller is the sole legal and beneficial owner of the Assets and has full authority to sell them free of any claims, liens, or encumbrances.\nNo other person or entity has any ownership interest or claim against the Assets.`,
      ref
    );

    write(doc, "\n4.8 Environmental Compliance", ref);
    write(
      doc,
      `The Seller certifies that no hazardous materials, toxic waste, or other environmental hazards exist on or in connection with the Assets.\nThe Seller has complied with all environmental regulations affecting the Assets.`,
      ref
    );

    write(doc, "\n4.9 Disclosure", ref);
    write(doc, "All information, documents, and representations provided to the Buyer regarding the Assets and Business are true, complete, and accurate in all material respects.", ref);

    write(doc, "\n4.10 Liabilities", ref);
    write(doc, "The Seller has no undisclosed debts, obligations, or liabilities relating to the Assets, whether contingent, known, or unknown.", ref);

    // Section 5
    write(doc, "\n5. Covenants of Seller", ref, { size: 12, bold: true });
    write(doc, "\n5.1 Bill of Sale", ref);
    write(doc, `At Closing, the Seller shall deliver a Bill of Sale transferring the Assets to the Buyer free and clear of all liens, claims, and encumbrances, with customary warranties.`, ref);

    write(doc, "\n5.2 Risk of Loss", ref);
    write(doc, `The Seller bears all risk of loss, theft, or damage to the Assets until the Closing. If any loss or damage materially affects the value of the Assets, the Purchase Price shall be adjusted in good faith to reflect such loss.`, ref);

    write(doc, "\n5.3 Further Assurances", ref);
    write(doc, `The Seller agrees to execute any additional documents reasonably required by the Buyer to perfect the transfer of the Assets or to effectuate the transactions contemplated herein.`, ref);

    // Section 6 - 12 (summarized but include wording)
    write(doc, "\n6. Inventory and Operations", ref, { size: 12, bold: true });
    write(doc, `A complete inventory shall be conducted on ${formData.conditionInventoryDate || "[-------]"} by ${formData.sellerName ||
      "[------]"}.\nOperations may be temporarily suspended prior to inventory unless suspension would reduce the value of any asset.\nAssets in use to maintain value may continue operation until Closing.`, ref);

    write(doc, "\n7. Bulk Sales Compliance", ref, { size: 12, bold: true });
    write(doc, "The Seller shall comply with all applicable bulk sales or similar laws, including notification of creditors, filing requirements, and any other obligations necessary for valid transfer of the Assets.", ref);

    write(doc, "\n8. Conditions Precedent to Buyer’s Obligations", ref, { size: 12, bold: true });
    write(
      doc,
      `The Buyer’s obligations to consummate the Closing are subject to:\nRepresentations and warranties being true at Closing;\nSeller’s compliance with all covenants, agreements, and obligations;\nDelivery of certified board resolutions and officer certificates confirming authorization and compliance;\nNo injunction, writ, or restraining order preventing the Closing;\nApproval of legal proceedings, documents, and instruments by Buyer’s counsel;\nNo material adverse casualty or change in the condition of the Assets;\nDelivery of all required consents and approvals.`,
      ref
    );

    write(doc, "\n9. Alternative Dispute Resolution", ref, { size: 12, bold: true });
    write(doc, "Parties shall attempt to resolve disputes amicably.\nIf unresolved, disputes shall proceed to mediation, and failing mediation, parties may pursue arbitration or litigation as provided under law.", ref);

    write(doc, "\n10. Costs, Expenses, and Attorneys’ Fees", ref, { size: 12, bold: true });
    write(doc, "Each party bears its own expenses related to negotiation, execution, and delivery of this Agreement.\nThe prevailing party in any dispute arising from this Agreement shall recover reasonable attorneys’ fees and costs.", ref);

    write(doc, "\n11. Indemnification", ref, { size: 12, bold: true });
    write(
      doc,
      `Seller shall indemnify and hold harmless the Buyer for:\nAny tort, creditor, or third-party claims relating to the Assets or business before Closing;\nTaxes, employee claims, and obligations accrued prior to Closing;\nAny other liabilities not expressly assumed by the Buyer.`,
      ref
    );

    write(doc, "\n12. Miscellaneous Provisions", ref, { size: 12, bold: true });
    write(doc, "\nAmendments", ref);
    write(doc, "This Agreement may be amended, modified, or supplemented only by a written instrument executed by both the Seller and the Buyer. Any attempted amendment, modification, or waiver that is not in writing and signed by both parties shall be null and of no effect.", ref);

    write(doc, "\nWaiver", ref);
    write(
      doc,
      "No failure or delay by either party in exercising any right, power, or privilege under this Agreement shall operate as a waiver thereof... Any waiver of any provision of this Agreement must be expressly set forth in writing and signed by the waiving party to be effective.",
      ref
    );

    write(doc, "\nSeverability", ref);
    write(doc, "If any provision, clause, or part of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall continue in full force and effect.", ref);

    write(doc, "\nGoverning Law", ref);
    write(doc, `This Agreement shall be governed by, construed, and enforced in accordance with the laws of ${formData.governingLaw || "[----------]"}.`, ref);

    write(doc, "\nEntire Agreement", ref);
    write(doc, "This Agreement constitutes the complete and exclusive statement of the terms and conditions agreed upon by the parties with respect to the subject matter hereof and supersedes all prior negotiations, agreements, understandings, representations, warranties, or promises, whether written or oral.", ref);

    // Signatures
    write(doc, "\n13. Signatures", ref, { size: 12, bold: true });
    write(doc, `IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date:\n\nSeller:\n[Signature] ___________________ Date: ${formData.sellerSignatureDate || "[--------]"}\n\n[Name, Title] ${formData.sellerName || ""}\n\nBuyer:\n[Signature] ___________________ Date: ${formData.buyerSignatureDate || "[----------]"}\n\n[Name, Title] ${formData.buyerName || ""}`, ref);

    const fileName = `Asset_Purchase_Agreement_${(formData.sellerName || "agreement").replace(/\s+/g, "_")}.pdf`;
    doc.save(fileName);
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
              onClick={() => navigate('/asset-purchase-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Asset Purchase Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Basic Parties & Assets</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Seller Name</Label>
              <Input name="sellerName" value={formData.sellerName} onChange={handleChange} />
              <Label>Seller Address</Label>
              <Textarea name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} />
              <Label>Buyer Name</Label>
              <Input name="buyerName" value={formData.buyerName} onChange={handleChange} />
              <Label>Buyer Address</Label>
              <Textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} />
              <Label>Assets Summary</Label>
              <Textarea name="assetsSummary" value={formData.assetsSummary} onChange={handleChange} placeholder="Short description of the assets being sold (or leave blank to use Exhibit A)" />
              <Label>Exhibit A / Details</Label>
              <Textarea name="exhibitADetails" value={formData.exhibitADetails} onChange={handleChange} placeholder="Detailed list (Exhibit A)" />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Price, Escrow & Closing</h3>
              <Label>Purchase Price ($)</Label>
              <Input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} />
              <Label>Deposit Amount ($)</Label>
              <Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} />
              <Label>Balance Amount ($)</Label>
              <Input name="balanceAmount" value={formData.balanceAmount} onChange={handleChange} />
              <Label>Escrow Account / Agent</Label>
              <Input name="escrowAccount" value={formData.escrowAccount} onChange={handleChange} />
              <Label>Closing Date</Label>
              <Input name="closingDate" value={formData.closingDate} onChange={handleChange} />
              <Label>Delivery Locations (inventory / assets)</Label>
              <Textarea name="deliveryLocations" value={formData.deliveryLocations} onChange={handleChange} />
              <Label>Title / Transfer Locations</Label>
              <Input name="titleLocations" value={formData.titleLocations} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Representations, Covenants & Conditions</h3>
              <Label>Inventory / Operations - Inventory Date</Label>
              <Input name="conditionInventoryDate" value={formData.conditionInventoryDate} onChange={handleChange} />
              <Label>Seller Reps Summary</Label>
              <Textarea name="sellerRepsSummary" value={formData.sellerRepsSummary} onChange={handleChange} />
              <Label>Taxes representation notes</Label>
              <Textarea name="taxRepresentation" value={formData.taxRepresentation} onChange={handleChange} />
              <Label>Insurance notes</Label>
              <Textarea name="insuranceNotes" value={formData.insuranceNotes} onChange={handleChange} />
              <Label>Licenses & Compliance notes</Label>
              <Textarea name="licensesNotes" value={formData.licensesNotes} onChange={handleChange} />
              <Label>Litigation notes</Label>
              <Textarea name="litigationNotes" value={formData.litigationNotes} onChange={handleChange} />
              <Label>Environmental notes</Label>
              <Textarea name="environmentalNotes" value={formData.environmentalNotes} onChange={handleChange} />
              <Label>Bill of Sale notes</Label>
              <Textarea name="billOfSaleNotes" value={formData.billOfSaleNotes} onChange={handleChange} />
              <Label>Risk of Loss notes</Label>
              <Textarea name="riskOfLossNotes" value={formData.riskOfLossNotes} onChange={handleChange} />
              <Label>Further Assurances notes</Label>
              <Textarea name="furtherAssurancesNotes" value={formData.furtherAssurancesNotes} onChange={handleChange} />
              <Label>Bulk Sales Compliance notes</Label>
              <Textarea name="bulkSalesNotes" value={formData.bulkSalesNotes} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Dispute, Fees, Indemnities & Signatures</h3>
              <Label>Conditions Precedent / Notes</Label>
              <Textarea name="conditionsPrecedentNotes" value={formData.conditionsPrecedentNotes} onChange={handleChange} />
              <Label>ADR / Dispute Resolution notes</Label>
              <Textarea name="adrNotes" value={formData.adrNotes} onChange={handleChange} />
              <Label>Costs, Expenses & Attorneys’ Fees notes</Label>
              <Textarea name="feesNotes" value={formData.feesNotes} onChange={handleChange} />
              <Label>Indemnification notes</Label>
              <Textarea name="indemnificationNotes" value={formData.indemnificationNotes} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />
              <Label>Seller - Signature Name</Label>
              <Input name="sellerSignatureName" value={formData.sellerSignatureName} onChange={handleChange} />
              <Label>Seller - Date</Label>
              <Input name="sellerSignatureDate" value={formData.sellerSignatureDate} onChange={handleChange} />

              <Label>Buyer - Signature Name</Label>
              <Input name="buyerSignatureName" value={formData.buyerSignatureName} onChange={handleChange} />
              <Label>Buyer - Date</Label>
              <Input name="buyerSignatureDate" value={formData.buyerSignatureDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Asset Purchase Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
