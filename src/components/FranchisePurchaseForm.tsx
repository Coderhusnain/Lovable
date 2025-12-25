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
  franchisorName: string;
  franchisorAddress: string;
  franchiseeName: string;
  franchiseeAddress: string;
  franchisedLocation: string;
  franchiseFee: string;
  initialFranchiseFee: string;
  trainingDays: string;
  supportDays: string;
  royaltiesPercent: string;
  termYears: string;
  terminationNoticeDays: string;
  insuranceRequirements: string;
  governingState: string;
  signFranchisorName: string;
  signFranchisorDate: string;
  signFranchiseeName: string;
  signFranchiseeDate: string;
}

export default function FranchisePurchaseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    franchisorName: "",
    franchisorAddress: "",
    franchiseeName: "",
    franchiseeAddress: "",
    franchisedLocation: "",
    franchiseFee: "",
    initialFranchiseFee: "",
    trainingDays: "",
    supportDays: "",
    royaltiesPercent: "",
    termYears: "",
    terminationNoticeDays: "",
    insuranceRequirements: "",
    governingState: "",
    signFranchisorName: "",
    signFranchisorDate: "",
    signFranchiseeName: "",
    signFranchiseeDate: "",
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

    write("FRANCHISE PURCHASE AGREEMENT", 14, true, true);
    write("\n");

    // reproduce the provided agreement text using form fields where appropriate
    write("1. Basis for Agreement", 12, true);
    write(
      "The Franchisor grants to others the right to develop, operate, and manage franchises under its trademarks, trade names, service marks, logos, and proprietary system (collectively referred to as the \"Marks\") and pursuant to the Licensed Methods established by the Franchisor. The Franchisee desires to establish and operate a franchise at a location identified in this Agreement, or at a location to be mutually agreed upon in writing, in accordance with the terms and conditions set forth herein."
    );

    write("\n");
    write("2. Grant of Franchise", 12, true);
    write(
      `Subject to the terms and conditions of this Agreement, the Franchisor hereby grants to the Franchisee, and the Franchisee accepts, the exclusive right to use the Marks and Licensed Methods in connection with the operation of a franchise at the designated location. This grant includes the right to operate the franchise in accordance with the Franchisor’s standards, specifications, and operational procedures as provided in the Operations Manual and other related materials.`
    );

    write("\n");
    write("3. Franchise Fee", 12, true);
    write(
      `The Franchisee agrees to pay the Franchisor a franchise fee in the amount of ${formData.franchiseFee || "$0.00"} (the \"Franchise Fee\"). The payment of the Franchise Fee entitles the Franchisee to access the Franchisor's system, Marks, and operational support for a limited period as set forth in this Agreement. The Franchise Fee is non-refundable, except as otherwise explicitly provided in this Agreement.`
    );

    write("\n");
    write("4. Franchised Location and Designated Area", 12, true);
    write(
      `The Franchisee is granted the right to operate a single franchise at the location identified in this Agreement (${formData.franchisedLocation || "[location]"}), subject to approval by the Franchisor. The Franchisee shall not operate any additional franchises under the Marks or Licensed Methods without the express written consent of the Franchisor.`
    );

    write("\n");
    write("5. Initial Franchise Fee", 12, true);
    write(
      `In consideration for the grant of the franchise rights described herein, the Franchisee shall pay to the Franchisor an initial franchise fee in accordance with the schedule set forth in this Agreement. This initial fee is non-refundable except as expressly provided herein, and represents compensation for the right to develop, establish, and operate the franchise in accordance with the Franchisor’s standards. Amount: ${formData.initialFranchiseFee || "[amount]"}`
    );

    write("\n");
    write("6. Training", 12, true);
    write(
      `The Franchisor shall provide the Franchisee with an initial training program consisting of ${formData.trainingDays || "[0]"} days of instruction at a location designated by the Franchisor. The Franchisor reserves the right to modify, waive, or reschedule portions of the training program as reasonably necessary. Training shall cover the operational, administrative, and customer service aspects required to operate the franchise in compliance with the Franchisor's standards.`
    );

    write("\n");
    write("7. Development Assistance", 12, true);
    write(
      `Prior to the opening of the franchise, the Franchisor shall provide the Franchisee with:\na. A list of approved suppliers and designated vendors;\nb. An advertising plan, including promotional materials and templates for the grand opening; and\nc. On-site assistance from a Franchisor representative for a period of ${formData.supportDays || "[0]"} days to provide further training and operational support.`
    );

    write("\n");
    write("8. Operations Manual", 12, true);
    write(
      `The Franchisor agrees to loan to the Franchisee one or more copies of the Operations Manual, technical bulletins, and other proprietary materials necessary to operate the franchise in compliance with the Franchisor’s standards and methods. The Franchisee agrees to maintain the confidentiality of these materials and use them solely for the operation of the franchise.`
    );

    write("\n");
    write("9. Royalties", 12, true);
    write(
      `Throughout the term of this Agreement, the Franchisee shall pay to the Franchisor a continuing monthly royalty equal to ${formData.royaltiesPercent || "[0]%"} of Gross Retail Sales generated by the franchise. Royalties shall be paid in accordance with the payment schedule established herein and are non-negotiable, except as specifically provided by this Agreement.`
    );

    write("\n");
    write("10. Advertising", 12, true);
    write(
      `The Franchisee shall obtain the Franchisor’s prior written approval for all advertising, marketing, or promotional materials or programs, whether disseminated in print, digital, broadcast, or any other medium. The Franchisee shall comply with all advertising standards established by the Franchisor and shall not deviate from approved content without prior written consent.`
    );

    write("\n");
    write("11. Quality Control", 12, true);
    write(
      `The Franchisee shall operate the franchise in strict compliance with this Agreement, the Operations Manual, and all applicable standards and specifications established by the Franchisor. The Franchisee shall permit the Franchisor to inspect the franchise premises, review operational records, and monitor compliance to ensure consistent quality and adherence to the Franchisor’s methods.`
    );

    write("\n");
    write("12. Term", 12, true);
    write(
      `The term of this Agreement commences on the date of execution and continues for ${formData.termYears || "[blank]"} years unless terminated earlier pursuant to the provisions herein. Either party may terminate this Agreement by providing thirty (30) days’ written notice or as otherwise required by applicable law.`
    );

    write("\n");
    write("13. Default and Termination", 12, true);
    write(
      `The Franchisor may terminate this Agreement upon the occurrence of any of the following events:\na. Abandonment: If the Franchisee ceases to operate the franchise or abandons the franchise for a consecutive period of [0] days;\nb. Failure to Make Payments: If the Franchisee fails to pay any amounts due under this Agreement, including royalties or fees, within ten (10) days after written notice of overdue payment;\nc. Any other material breach of this Agreement not cured within the timeframe specified herein.`
    );

    write("\n");
    write("14. Restrictive Covenants", 12, true);
    write(
      `The Franchisee agrees that, during the term of this Agreement, neither the Franchisee nor any of its officers, directors, shareholders, or partners shall have any direct or indirect controlling interest in, or participate in, any competitive business engaged in the same line of trade as the franchise, without the prior written consent of the Franchisor.`
    );

    write("\n");
    write("15. Insurance", 12, true);
    write(
      `The Franchisee shall procure, maintain, and provide evidence of the following insurance policies:\na. Comprehensive general liability insurance covering the Franchised Location and its operations;\nb. Unemployment and workers’ compensation insurance in accordance with applicable laws;\nc. Such other policies as required by the Franchisor.\nAll policies shall name the Franchisor as an additional insured and provide at least thirty (30) days’ prior written notice of cancellation to the Franchisor.`
    );

    write("\n");
    write("16. Governing Law", 12, true);
    write(
      `This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "[Blank]"}, without regard to principles of conflicts of law. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts of the State of ${formData.governingState || "[------]"}.`
    );

    write("\n");
    write("17. Entire Agreement", 12, true);
    write(
      `This Agreement represents the complete and exclusive understanding between the parties concerning the subject matter herein and supersedes all prior negotiations, agreements, representations, or understandings, whether written or oral. No prior agreement, course of dealing, or usage of trade shall modify, supplement, or explain any provision of this Agreement.`
    );

    write("\n");
    write("18. Effective Date", 12, true);
    write(
      `This Agreement shall become effective only upon acceptance and execution by an authorized officer of the Franchisor, as evidenced by the date and signature on the final executed Agreement. Effective Date: ${formData.effectiveDate || "[date]"}`
    );

    write("\n");
    write("19. Attorneys’ Fees", 12, true);
    write(
      `In the event of any dispute arising under this Agreement, the non-prevailing party shall be responsible for reimbursing the prevailing party for all costs and expenses incurred, including reasonable attorneys’ fees, court costs, and other expenses associated with the enforcement of this Agreement.`
    );

    write("\n");
    write("20. No Right to Set-Off", 12, true);
    write(
      `The Franchisee shall have no right to offset any amounts owed to the Franchisor, including royalties, fees, or other amounts, against any claims or alleged nonperformance by the Franchisor. All amounts due must be paid in full in accordance with the terms of this Agreement.`
    );

    write("\n");
    write("Signatories", 12, true);
    write(
      `This Franchise Purchase Agreement shall be executed by the authorized representatives of the parties and shall be effective as of the date first written above. By signing below, each party acknowledges that it has read, understands, and agrees to be bound by the terms and conditions of this Agreement.`
    );

    write("\n");
    write(`Seller: ${formData.franchisorName || "[Franchisor]"}`);
    write("Signature: ___________________ Date: " + (formData.signFranchisorDate || "[date]"));
    write("\n");
    write(`Buyer: ${formData.franchiseeName || "[Franchisee]"}`);
    write("Signature: ___________________ Date: " + (formData.signFranchiseeDate || "[date]"));

    doc.save("Franchise_Purchase_Agreement.pdf");
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
              onClick={() => navigate('/franchise-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Franchise Purchase Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Location</h3>
              <Label>Agreement Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Franchisor Name</Label>
              <Input name="franchisorName" value={formData.franchisorName} onChange={handleChange} />
              <Label>Franchisor Address</Label>
              <Textarea name="franchisorAddress" value={formData.franchisorAddress} onChange={handleChange} />

              <hr />

              <Label>Franchisee Name</Label>
              <Input name="franchiseeName" value={formData.franchiseeName} onChange={handleChange} />
              <Label>Franchisee Address</Label>
              <Textarea name="franchiseeAddress" value={formData.franchiseeAddress} onChange={handleChange} />

              <Label>Franchised Location</Label>
              <Input name="franchisedLocation" value={formData.franchisedLocation} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Fees, Training & Support</h3>
              <Label>Franchise Fee</Label>
              <Input name="franchiseFee" value={formData.franchiseFee} onChange={handleChange} />

              <Label>Initial Franchise Fee</Label>
              <Input name="initialFranchiseFee" value={formData.initialFranchiseFee} onChange={handleChange} />

              <Label>Training Days</Label>
              <Input name="trainingDays" value={formData.trainingDays} onChange={handleChange} />

              <Label>On-site Support Days</Label>
              <Input name="supportDays" value={formData.supportDays} onChange={handleChange} />

              <Label>Royalties (% of Gross Retail Sales)</Label>
              <Input name="royaltiesPercent" value={formData.royaltiesPercent} onChange={handleChange} />

              <Label>Term (years)</Label>
              <Input name="termYears" value={formData.termYears} onChange={handleChange} />

              <Label>Termination Notice Days</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Insurance Requirements</Label>
              <Textarea name="insuranceRequirements" value={formData.insuranceRequirements} onChange={handleChange} />

              <Label>Governing State</Label>
              <Input name="governingState" value={formData.governingState} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Franchisor - Signatory Name</Label>
              <Input name="signFranchisorName" value={formData.signFranchisorName} onChange={handleChange} />
              <Label>Franchisor - Date</Label>
              <Input name="signFranchisorDate" value={formData.signFranchisorDate} onChange={handleChange} />

              <Label>Franchisee - Signatory Name</Label>
              <Input name="signFranchiseeName" value={formData.signFranchiseeName} onChange={handleChange} />
              <Label>Franchisee - Date</Label>
              <Input name="signFranchiseeDate" value={formData.signFranchiseeDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Franchise Purchase Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
