import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  ownerName: string;
  ownerAddress: string;
  recipientName: string;
  recipientAddress: string;
  ownerBusinessDescription: string;
  recipientBusinessDescription: string;
  termYears: string;
  governingLawState: string;
  signatureOwner: string;
  signatureRecipient: string;
}

export default function ConfidentialityAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    ownerName: "",
    ownerAddress: "",
    recipientName: "",
    recipientAddress: "",
    ownerBusinessDescription: "",
    recipientBusinessDescription: "",
    termYears: "",
    governingLawState: "",
    signatureOwner: "",
    signatureRecipient: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const lineHeight = 18;
    let currentY = margin;

    const addText = (
      text: string,
      fontSize = 11,
      isBold = false,
      isCenter = false
    ) => {
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
          const tw =
            (doc.getStringUnitWidth(line) * fontSize) /
            doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // Build agreement
    addText("CONFIDENTIALITY AGREEMENT", 14, true, true);
    addText(
      `This Confidentiality Agreement (“Agreement”) is made and entered into as of ${formData.agreementDate} (“Effective Date”) by and between:`
    );
    addText(
      `${formData.ownerName}, of ${formData.ownerAddress} (“Owner” or “Disclosing Party”); and`
    );
    addText(
      `${formData.recipientName}, of ${formData.recipientAddress} (“Recipient” or “Receiving Party”).`
    );

    addText("RECITALS", 12, true);
    addText(
      `WHEREAS, the Owner is engaged in the business of ${formData.ownerBusinessDescription};`
    );
    addText(
      `WHEREAS, the Recipient is engaged in the business of ${formData.recipientBusinessDescription};`
    );
    addText(
      "WHEREAS, the Owner possesses certain confidential, proprietary, and trade secret information of substantial commercial value and has agreed to disclose certain of such information to the Recipient solely for the limited purposes contemplated under this Agreement;"
    );
    addText(
      "WHEREAS, the Recipient agrees to receive such information in strict confidence and to use it only in accordance with the terms of this Agreement;"
    );
    addText(
      "NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and intending to be legally bound, the parties agree as follows:"
    );

    addText("1. DEFINITION OF CONFIDENTIAL INFORMATION", 12, true);
    addText("1.1 Meaning");
    addText(
      "“Confidential Information” means any and all non-public, proprietary, or confidential data, information, and material, whether in written, oral, electronic, graphic, or other tangible or intangible form, disclosed or made available by the Owner to the Recipient, whether before, on, or after the Effective Date, including without limitation: Business records, operational data, and strategic plans; Financial statements, projections, and budgets; Product designs, specifications, prototypes, and technical data; Software, source code, and algorithms; Customer lists, supplier details, pricing information, and marketing plans; Trade secrets and know-how; Any analyses, compilations, or other documents prepared by the Recipient containing or reflecting such information."
    );
    addText("1.2 Exclusions");
    addText(
      "Confidential Information shall not include information which: (a) is or becomes publicly available through no breach of this Agreement; (b) is lawfully received by the Recipient from a third party without restriction on disclosure; (c) is independently developed by the Recipient without use of or reference to the Owner’s Confidential Information; (d) is disclosed pursuant to a valid court order, subpoena, or governmental authority, provided that the Recipient promptly notifies the Owner and cooperates in any effort to limit such disclosure; (e) is approved for release in writing by the Owner; or (f) both parties agree in writing is not confidential."
    );

    addText("2. OBLIGATIONS OF THE RECIPIENT", 12, true);
    addText("2.1 Non-Disclosure and Non-Use");
    addText(
      "The Recipient shall hold all Confidential Information in the strictest confidence, using at least the same degree of care it uses to protect its own confidential information, but in no event less than a reasonable degree of care. The Recipient shall not disclose, publish, or otherwise disseminate Confidential Information to any third party without the prior written consent of the Owner, and shall not use Confidential Information for any purpose other than the limited purpose authorized in writing by the Owner."
    );
    addText("2.2 No Copying or Modification");
    addText(
      "The Recipient shall not copy, reproduce, summarize, or otherwise duplicate the Confidential Information, in whole or in part, without the prior written approval of the Owner, except as strictly necessary for the permitted purpose."
    );
    addText("2.3 Disclosure to Employees/Agents");
    addText(
      "Disclosure of Confidential Information shall be limited to employees, contractors, or agents of the Recipient who have a legitimate need to know such information in connection with the permitted purpose, and who are bound by written confidentiality obligations no less restrictive than those contained herein."
    );
    addText("2.4 Injunctive Relief");
    addText(
      "The Recipient acknowledges that any unauthorized disclosure or use of Confidential Information will cause immediate and irreparable harm to the Owner for which monetary damages may be inadequate. Accordingly, the Owner shall be entitled to seek injunctive relief, without the necessity of posting bond, in addition to any other remedies available at law or in equity."
    );

    addText("3. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION", 12, true);
    addText(
      "Upon the Owner’s written request, the Recipient shall, within five (5) business days: (a) return all documents and tangible materials containing or representing Confidential Information; (b) permanently delete or destroy all electronic copies; and (c) provide a written certification, signed by an authorized representative, confirming compliance with this Section."
    );

    addText("4. RELATIONSHIP OF THE PARTIES", 12, true);
    addText(
      "Nothing in this Agreement shall be construed as obligating either party to enter into any business relationship or transaction. This Agreement shall not create any agency, partnership, joint venture, employment, or fiduciary relationship between the parties."
    );

    addText("5. NO WARRANTY", 12, true);
    addText(
      "The Owner makes no representations or warranties, express or implied, regarding the accuracy or completeness of the Confidential Information, and expressly disclaims any implied warranties of merchantability or fitness for a particular purpose. The Owner shall not be liable for any damages resulting from the Recipient’s use of the Confidential Information."
    );

    addText("6. NO LICENSE", 12, true);
    addText(
      "Except for the limited right to use the Confidential Information for the permitted purpose, no license, ownership interest, or other rights to intellectual property are granted under this Agreement, whether by implication, estoppel, or otherwise. All rights, title, and interest in and to the Confidential Information shall remain vested solely in the Owner."
    );

    addText("7. TERM AND SURVIVAL", 12, true);
    addText(
      `This Agreement shall commence on the Effective Date and continue until terminated by mutual written agreement. The obligations of confidentiality and non-use shall survive for a period of ${formData.termYears} years following the date of disclosure of the Confidential Information, or for such longer period as the information remains confidential and proprietary.`
    );

    addText("8. MISCELLANEOUS", 12, true);
    addText(
      `8.1 Entire Agreement – This Agreement constitutes the entire understanding between the parties regarding the subject matter and supersedes all prior discussions and agreements, whether oral or written.
8.2 Amendment – This Agreement may only be amended in writing signed by both parties.
8.3 Assignment – Neither party may assign its rights or delegate its duties under this Agreement without the prior written consent of the other party.
8.4 Governing Law – This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}, without regard to conflict of law principles.
8.5 Severability – If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.
8.6 Waiver – Failure to enforce any provision of this Agreement shall not constitute a waiver of any rights hereunder.`
    );

    addText("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.", 11, false, true);

    addText("Owner (Disclosing Party):", 11, true);
    addText(`Name: ${formData.ownerName}`);
    addText(`Signature: ${formData.signatureOwner}`);
    addText(`Date: ${formData.agreementDate}`);

    addText("Recipient (Receiving Party):", 11, true);
    addText(`Name: ${formData.recipientName}`);
    addText(`Signature: ${formData.signatureRecipient}`);
    addText(`Date: ${formData.agreementDate}`);

    doc.save("Confidentiality_Agreement.pdf");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Agreement & Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Agreement Date</Label>
              <Input
                type="date"
                name="agreementDate"
                value={formData.agreementDate}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Owner (Disclosing Party) Name</Label>
              <Input
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Owner Address</Label>
              <Textarea
                name="ownerAddress"
                value={formData.ownerAddress}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Recipient (Receiving Party) Name</Label>
              <Input
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Recipient Address</Label>
              <Textarea
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleChange}
                className="mb-2"
              />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Business Descriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Owner Business Description</Label>
              <Textarea
                name="ownerBusinessDescription"
                value={formData.ownerBusinessDescription}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Recipient Business Description</Label>
              <Textarea
                name="recipientBusinessDescription"
                value={formData.recipientBusinessDescription}
                onChange={handleChange}
                className="mb-2"
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Terms & Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Term (Years)</Label>
              <Input
                type="number"
                name="termYears"
                value={formData.termYears}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Governing Law State</Label>
              <Input
                name="governingLawState"
                value={formData.governingLawState}
                onChange={handleChange}
                className="mb-2"
              />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Signatures</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Owner Signature</Label>
              <Input
                name="signatureOwner"
                value={formData.signatureOwner}
                onChange={handleChange}
                className="mb-2"
              />
              <Label>Recipient Signature</Label>
              <Input
                name="signatureRecipient"
                value={formData.signatureRecipient}
                onChange={handleChange}
                className="mb-2"
              />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {renderStep()}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={generatePDF}>Generate PDF</Button>
        )}
      </div>
    </div>
  );
}
