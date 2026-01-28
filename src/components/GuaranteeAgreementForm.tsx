import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface FormData {
  day: string;
  month: string;
  year: string;
  creditorName: string;
  creditorAddress: string;
  guarantorName: string;
  guarantorAddress: string;
  debtorName: string;
  terminationDaysNumber: string;
  terminationDaysWords: string;
  securityText: string;
  pledgeDate: string;
  securityAgreementDate: string;
  mortgageDate: string;
  collateralAssignmentDate: string;
  governingState: string;
  creditorSignerName: string;
  creditorSignerTitle: string;
  creditorSignerDate: string;
  guarantorSignerName: string;
  guarantorSignerTitle: string;
  guarantorSignerDate: string;
}

const defaultFormData: FormData = {
  day: "",
  month: "",
  year: "",
  creditorName: "",
  creditorAddress: "",
  guarantorName: "",
  guarantorAddress: "",
  debtorName: "",
  terminationDaysNumber: "",
  terminationDaysWords: "",
  securityText: "",
  pledgeDate: "",
  securityAgreementDate: "",
  mortgageDate: "",
  collateralAssignmentDate: "",
  governingState: "",
  creditorSignerName: "",
  creditorSignerTitle: "",
  creditorSignerDate: "",
  guarantorSignerName: "",
  guarantorSignerTitle: "",
  guarantorSignerDate: "",
};


const fieldGroups = [
  [
    { name: "day", label: "Day", type: "input" },
    { name: "month", label: "Month", type: "input" },
    { name: "year", label: "Year", type: "input" },
  ],
  [
    { name: "creditorName", label: "Creditor - Full Legal Name", type: "input" },
    { name: "creditorAddress", label: "Creditor - Address", type: "textarea" },
    { name: "guarantorName", label: "Guarantor - Full Legal Name", type: "input" },
  ],
  [
    { name: "guarantorAddress", label: "Guarantor - Address", type: "textarea" },
    { name: "debtorName", label: "Debtor - Name (for recital)", type: "input" },
    { name: "terminationDaysNumber", label: "Termination - Days (number)", type: "input" },
  ],
  [
    { name: "terminationDaysWords", label: "Termination - Days (words)", type: "input" },
    { name: "securityText", label: "Security text (replaces checkbox section; paste exact text you want)", type: "textarea" },
    { name: "pledgeDate", label: "Pledge Agreement Date", type: "input" },
  ],
  [
    { name: "securityAgreementDate", label: "Security Agreement Date", type: "input" },
    { name: "mortgageDate", label: "Mortgage Date", type: "input" },
    { name: "collateralAssignmentDate", label: "Collateral Assignment Date", type: "input" },
  ],
  [
    { name: "governingState", label: "Governing State", type: "input" },
    { name: "creditorSignerName", label: "Creditor - Signer Name", type: "input" },
    { name: "creditorSignerTitle", label: "Creditor - Title (if applicable)", type: "input" },
  ],
  [
    { name: "creditorSignerDate", label: "Creditor - Date", type: "input" },
    { name: "guarantorSignerName", label: "Guarantor - Signer Name", type: "input" },
    { name: "guarantorSignerTitle", label: "Guarantor - Title (if applicable)", type: "input" },
  ],
  [
    { name: "guarantorSignerDate", label: "Guarantor - Date", type: "input" },
  ],
];

const GuaranteeAgreementForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filled = (template: string, replacement: string) => {
    if (!replacement || replacement.trim() === "") return template;
    return template.replace(/_{3,}|\[.*?\]/, replacement);
  };

  const onFinish = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 14;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 720) {
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

      const paragraphs: string[] = [];

      paragraphs.push("GUARANTEE AGREEMENT");
      paragraphs.push(
        filled(
          `This Guarantee Agreement (\u201cAgreement\u201d or \u201cGuaranty\u201d) is made and entered into on this ${formData.day || "___"} day of ${formData.month || "_______"}, ${formData.year || "-------"} (\u201cEffective Date\u201d), by and between:`,
          ""
        )
      );
      paragraphs.push(
        filled(
          `[Name of Creditor], having its principal place of business at ${formData.creditorAddress || "________________________"} (hereinafter referred to as the \u201cCreditor\u201d),`,
          formData.creditorName
        )
      );
      paragraphs.push("and");
      paragraphs.push(
        filled(
          `[Name of Guarantor], residing or having its principal place of business at ${formData.guarantorAddress || "________________________"} (hereinafter referred to as the \u201cGuarantor\u201d).`,
          formData.guarantorName
        )
      );
      paragraphs.push("(Each individually referred to as a \u201cParty\u201d and collectively as the \u201cParties\u201d.)");
      paragraphs.push("");
      paragraphs.push("RECITALS");
      paragraphs.push(
        filled(
          `WHEREAS, [Name of Debtor] (\u201cDebtor\u201d) has entered or proposes to enter into a certain contractual arrangement with the Creditor, a copy of which is attached hereto and incorporated herein as Exhibit A (\u201cUnderlying Agreement\u201d);`,
          formData.debtorName
        )
      );
      paragraphs.push(
        "AND WHEREAS, the Creditor has required, as a condition to entering into or continuing the said contractual relationship with the Debtor, that the Guarantor execute and deliver this Guaranty as security for the due performance and payment by the Debtor of all its obligations and liabilities to the Creditor, whether presently existing or hereafter arising;"
      );
      paragraphs.push(
        "NOW, THEREFORE, in consideration of the foregoing and of other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Guarantor hereby agrees as follows:"
      );
      // Section 1
      paragraphs.push("1. OBLIGATIONS OF THE GUARANTOR");
      paragraphs.push(
        "1.1 Absolute and Unconditional Guarantee\nThe Guarantor hereby absolutely, unconditionally, and irrevocably guarantees to the Creditor the prompt and full payment and performance of all obligations, indebtedness, and liabilities of the Debtor to the Creditor, whether now existing or hereafter incurred, whether direct or indirect, secured or unsecured, absolute or contingent, liquidated or unliquidated, and whether arising voluntarily or involuntarily, or jointly or severally with others."
      );
      paragraphs.push(
        "1.2 Continuing Nature of Guarantee\nIt is expressly understood that this Guaranty constitutes a continuing guarantee, extending to and covering all existing and future obligations of the Debtor until this Guaranty is duly terminated in accordance with the provisions herein."
      );
      paragraphs.push(
        "1.3 No Limitation by Enforcement\nThe liability of the Guarantor shall not be affected, diminished, or discharged by reason of any inability, failure, or omission by the Creditor to enforce its rights against the Debtor or any other person, nor by the invalidity or unenforceability of any obligation of the Debtor."
      );
      paragraphs.push(
        "1.4 Reliance\nThe Guarantor acknowledges that this Guaranty is executed to induce the Creditor to enter into or continue its contractual relationship with the Debtor, and that the Creditor will rely upon this Guaranty as a continuing assurance of the Debtor’s performance."
      );
      // Section 2
      paragraphs.push("2. DURATION");
      paragraphs.push(
        filled(
          `2.1 Term\nThis Guaranty shall remain in full force and effect until the expiration of ${formData.terminationDaysNumber || "____"} (${formData.terminationDaysWords || "___"}) days after written notice of termination is received by the Creditor from the Guarantor (\u201cTermination Notice\u201d).`,
          ""
        )
      );
      paragraphs.push(
        "2.2 Obligations Survive Termination\nAny obligations, debts, or liabilities of the Debtor existing or arising prior to the effective date of termination shall continue to be fully guaranteed by the Guarantor, notwithstanding the issuance of such Termination Notice."
      );
      paragraphs.push(
        "2.3 Effectiveness of Termination\nTermination shall not be effective until all obligations of the Debtor incurred prior thereto are fully paid, satisfied, and discharged to the Creditor’s satisfaction."
      );
      // Section 3
      paragraphs.push("3. NOTICE OF DEFAULT");
      paragraphs.push(
        "3.1 Notification Requirement\nThe Creditor shall provide written notice to the Guarantor of any default by the Debtor in performing its commitments or obligations under the Underlying Agreement prior to enforcing any rights under this Guaranty."
      );
      paragraphs.push(
        "3.2 No Obligation for Further Advances\nThe Creditor shall not be obligated to notify the Guarantor of any subsequent advances, extensions of credit, or renewals granted to the Debtor."
      );
      paragraphs.push(
        "3.3 Extension of Credit without Consent\nThe Creditor shall not extend any additional credit or enter into new financial arrangements with the Debtor without obtaining the prior written consent of the Guarantor. Any violation of this clause shall render this Guaranty null and void, and the Guarantor shall be fully discharged from liability hereunder."
      );
      // Section 4
      paragraphs.push("4. CREDITOR PROVISIONS AND SECURITY");
      paragraphs.push(
        "4.1 Waiver of Subrogation and Rights Against Debtor\nUntil all obligations of the Debtor have been satisfied in full, the Guarantor waives any right of subrogation and any right to claim against the Debtor or any collateral securing the Debtor’s obligations."
      );
      paragraphs.push(
        "4.2 Assignment of Debtor’s Indebtedness to Guarantor\nAny debt owed by the Debtor to the Guarantor shall be subordinated and assigned to the Creditor. If requested by the Creditor, such debt shall be collected and remitted by the Guarantor as trustee for the Creditor, without affecting the Guarantor’s obligations under this Agreement."
      );
      paragraphs.push(
        "4.3 Creditor’s Right to Modify or Release Security\nThe Guarantor agrees that the Creditor may, without prior notice to or consent from the Guarantor: (a) alter the terms of the Debtor’s obligations; (b) extend time for payment or performance; (c) release or substitute any collateral security; or (d) compromise or settle any claim. Such actions shall not release or reduce the Guarantor’s liability under this Guaranty."
      );
      paragraphs.push(
        "4.4 Requirement for Consent to New Contracts\nThis Guaranty shall become null and void if the Creditor enters into, renews, or modifies any agreement with the Debtor without obtaining the Guarantor’s prior written consent."
      );
      paragraphs.push(
        "4.5 Financial Disclosure\nThe Guarantor shall provide the Creditor with reasonable access to its financial statements or information concerning its financial condition upon written request. The Creditor shall have no obligation to advise or inform the Guarantor regarding the Debtor’s financial condition."
      );
      paragraphs.push(
        filled(
          `4.6 Security for Guaranty\nThis Guaranty is:\n☐ Unsecured, or\n☐ Secured by the following instruments (check as applicable):`,
          formData.securityText
        )
      );
      paragraphs.push(
        filled(
          `•Pledge Agreement dated ${formData.pledgeDate || "__________"};\n•Security Agreement dated ${formData.securityAgreementDate || "__________"};\n•Mortgage dated ${formData.mortgageDate || "__________"};\n•Collateral Assignment dated ${formData.collateralAssignmentDate || "__________"}.`,
          ""
        )
      );
      // Section 5
      paragraphs.push("5. FINAL PROVISIONS");
      paragraphs.push(
        "5.1 Entire Agreement\nThis Guaranty constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior oral or written understandings, representations, or agreements."
      );
      paragraphs.push(
        "5.2 Amendments\nNo modification or amendment of this Guaranty shall be valid unless made in writing and signed by both Parties."
      );
      paragraphs.push(
        "5.3 Severability\nIf any provision of this Guaranty is held invalid or unenforceable by a court of competent jurisdiction, such provision shall be limited to the minimum extent necessary so that the remaining provisions shall continue in full force and effect."
      );
      paragraphs.push(
        "5.4 Waiver\nFailure of either Party to enforce any right or provision of this Guaranty shall not constitute a waiver of such right or provision and shall not affect its enforceability thereafter."
      );
      paragraphs.push(
        filled(
          `5.5 Governing Law\nThis Guaranty shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "__________"}, without regard to its conflict-of-law principles.`,
          ""
        )
      );
      paragraphs.push(
        "5.6 Acknowledgment of Receipt\nThe Guarantor hereby acknowledges having received a true and complete copy of this Guaranty and fully understands its terms, rights, and obligations."
      );
      // Section 6
      paragraphs.push("6. EXECUTION");
      paragraphs.push(
        "IN WITNESS WHEREOF, the Parties have duly executed this Guarantee Agreement as of the day and year first above written."
      );
      paragraphs.push(
        filled(
          `CREDITOR\nName: ${formData.creditorSignerName || "__________________________"}\nTitle: ${formData.creditorSignerTitle || "__________________________"}\nSignature: ________________________\nDate: ${formData.creditorSignerDate || "__________________________"}`,
          ""
        )
      );
      paragraphs.push(
        filled(
          `GUARANTOR\nName: ${formData.guarantorSignerName || "__________________________"}\nTitle (if applicable): ${formData.guarantorSignerTitle || "__________________________"}\nSignature: ________________________\nDate: ${formData.guarantorSignerDate || "__________________________"}`,
          ""
        )
      );
      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });
      doc.save("guarantee-agreement.pdf");
      toast.success("Guarantee Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Guarantee Agreement PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Build steps for FormWizard
  const steps = fieldGroups.map((fields, idx) => ({
    label: `Step ${idx + 1}`,
    content: (
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            {field.type === "input" ? (
              <Input
                value={formData[field.name as keyof FormData] as string}
                onChange={(e) => handleInputChange(field.name as keyof FormData, e.target.value)}
              />
            ) : (
              <Textarea
                value={formData[field.name as keyof FormData] as string}
                onChange={(e) => handleInputChange(field.name as keyof FormData, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Guarantee Agreement</h2>
      <FormWizard steps={steps} onFinish={onFinish} />
      {isGeneratingPDF && <div>Generating PDF...</div>}
    </div>
  );
};

export default GuaranteeAgreementForm;