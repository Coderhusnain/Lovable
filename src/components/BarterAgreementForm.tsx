import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";

interface FormData {
  effectiveDate: string;
  offerorName: string;
  offerorAddress: string;
  offereeName: string;
  offereeAddress: string;
  offerorGoodsDesc: string;
  offerorGoodsCondition: string;
  offereeGoodsDesc: string;
  offereeGoodsCondition: string;
  exchangeDeadline: string;
  deliveryLocation: string;
  anticipatedChargesNote: string;
  terminationCompensationNote: string;
  valuationAcceptanceNote: string;
  mutualRepsWarranties: string;
  indemnificationNote: string;
  adrNote: string;
  furtherAssurancesNote: string;
  assignmentNote: string;
  noticesOfferorAddress: string;
  noticesOffereeAddress: string;
  governingLaw: string;
  offerorSignName: string;
  offerorSignDate: string;
  offereeSignName: string;
  offereeSignDate: string;
}

export default function BarterAgreementForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    offerorName: "",
    offerorAddress: "",
    offereeName: "",
    offereeAddress: "",
    offerorGoodsDesc: "",
    offerorGoodsCondition: "",
    offereeGoodsDesc: "",
    offereeGoodsCondition: "",
    exchangeDeadline: "",
    deliveryLocation: "",
    anticipatedChargesNote: "Each Party undertakes to disclose any anticipated charges, costs, or fees prior to commencement.",
    terminationCompensationNote: "Terminating Party shall fairly compensate the non-terminating Party for goods/services provided up to termination.",
    valuationAcceptanceNote: "Each Party acknowledges and accepts the valuation assigned to the other Party’s Bartered Goods as final and binding.",
    mutualRepsWarranties:
      "Each Party represents that it has full capacity, the goods are transferable, free of liens/encumbrances, and do not infringe third-party rights.",
    indemnificationNote:
      "Each Party agrees to indemnify, defend, and hold harmless the other Party from third-party claims arising from breach or misrepresentation.",
    adrNote: "The Parties shall first attempt amicable negotiation; failing that, the dispute shall be submitted to mediation per applicable rules.",
    furtherAssurancesNote: "The Parties agree to execute additional documents and take further actions reasonably required to give effect to this Agreement.",
    assignmentNote: "Neither Party may assign rights or obligations without prior written consent of the other Party.",
    noticesOfferorAddress: "",
    noticesOffereeAddress: "",
    governingLaw: "",
    offerorSignName: "",
    offerorSignDate: "",
    offereeSignName: "",
    offereeSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // small helper to write text with jsPDF and handle page breaks
  const writeText = (doc: jsPDF, text: string, state: { y: number }, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
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

    writeText(doc, "BARTER AGREEMENT", state, { size: 14, bold: true, center: true });
    writeText(doc, "\n", state);

    writeText(
      doc,
      `This Barter Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "[---------]"} (the "Effective Date"), by and between:\n${formData.offerorName || "[---------]"}, having its address at ${formData.offerorAddress ||
        "[-------]"} ("Offeror"),\nAND\n${formData.offereeName || "[---------]"}, having its address at ${formData.offereeAddress || "[-------]"} ("Offeree").\nThe Offeror and the Offeree may hereinafter be referred to individually as a "Party" and collectively as the "Parties".`,
      state
    );

    writeText(doc, "\n1. Bartered Goods", state, { size: 12, bold: true });
    writeText(doc, "1.1 Goods Offered by the Offeror", state);
    writeText(doc, `Description: ${formData.offerorGoodsDesc || "[----------]"}`, state);
    writeText(doc, `Condition: ${formData.offerorGoodsCondition || "[------------]"}`, state);

    writeText(doc, "\n1.2 Goods Offered by the Offeree", state);
    writeText(doc, `Description: ${formData.offereeGoodsDesc || "[---------]"}`, state);
    writeText(doc, `Condition: ${formData.offereeGoodsCondition || "[-----------]"}`, state);

    writeText(doc, "\nThe above goods shall collectively be referred to as the \"Bartered Goods\".", state);

    writeText(doc, "\n2. Delivery and Exchange", state, { size: 12, bold: true });
    writeText(
      doc,
      `The Parties agree that the delivery and exchange of the Bartered Goods shall take place on or before ${formData.exchangeDeadline || "[----------------]"}, at such location and in such manner as may be mutually agreed in writing. Each Party undertakes to deliver its respective Bartered Goods in the condition expressly stated herein and in accordance with the agreed schedule.`,
      state
    );
    writeText(doc, `Each Party further agrees to disclose any anticipated charges, costs, or fees prior to the commencement of any exchange of goods and/or services under this Agreement.`, state);
    if (formData.anticipatedChargesNote) writeText(doc, `\nNote: ${formData.anticipatedChargesNote}`, state);

    writeText(doc, "\n3. Delivery Schedule", state, { size: 12, bold: true });
    writeText(doc, `The Parties shall strictly adhere to the delivery schedule mutually agreed upon and shall ensure that the Bartered Goods conform to the descriptions and conditions specified in this Agreement at the time of delivery.`, state);

    writeText(doc, "\n4. Termination", state, { size: 12, bold: true });
    writeText(doc, `${formData.terminationCompensationNote}`, state);

    writeText(doc, "\n5. Agreement Freely Entered Into", state, { size: 12, bold: true });
    writeText(doc, "Each Party represents and warrants that it has freely, voluntarily, and lawfully entered into this Agreement and undertakes to comply fully with its terms and conditions.", state);

    writeText(doc, "\n6. Finality of Valuation", state, { size: 12, bold: true });
    writeText(doc, formData.valuationAcceptanceNote, state);

    writeText(doc, "\n7. Mutual Representations and Warranties", state, { size: 12, bold: true });
    writeText(
      doc,
      `Each Party hereby represents and warrants that:\n\na) It has full legal capacity, authority, and power to enter into and perform this Agreement;\n\nb) The Bartered Goods offered by it are lawfully owned and transferable, free from all liens, encumbrances, claims, and third-party interests;\n\nc) The Bartered Goods do not infringe any intellectual property rights, proprietary rights, statutory protections, or legal rights of any third party;\n\nd) All information provided in this Agreement is true, accurate, and complete to the best of its knowledge.`,
      state
    );

    writeText(doc, "\n8. Mutual Indemnification", state, { size: 12, bold: true });
    writeText(doc, formData.indemnificationNote || "Each Party agrees to indemnify, defend, and hold harmless the other Party...", state);

    writeText(doc, "\n9. Alternative Dispute Resolution", state, { size: 12, bold: true });
    writeText(doc, formData.adrNote, state);

    writeText(doc, "\n10. Further Assurances", state, { size: 12, bold: true });
    writeText(doc, formData.furtherAssurancesNote, state);

    writeText(doc, "\n11. Assignment", state, { size: 12, bold: true });
    writeText(doc, formData.assignmentNote, state);

    writeText(doc, "\n12. Notices", state, { size: 12, bold: true });
    writeText(
      doc,
      `Any notice required or permitted under this Agreement shall be deemed duly given if delivered personally or sent by registered or certified mail, return receipt requested, to the address stated above or to such other address as may be notified in writing by a Party.\n\nOfferor Notices Address: ${formData.noticesOfferorAddress || "[Offeror address for notices]"}\n\nOfferee Notices Address: ${formData.noticesOffereeAddress || "[Offeree address for notices]"}`,
      state
    );

    writeText(doc, "\n13. Entire Agreement", state, { size: 12, bold: true });
    writeText(doc, "This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior negotiations, discussions, representations, or agreements, whether oral or written.", state);

    writeText(doc, "\n14. Waiver", state, { size: 12, bold: true });
    writeText(doc, "Failure by either Party to enforce any provision of this Agreement shall not constitute a waiver of that provision or any other provision, nor shall it affect the right to enforce such provision at a later time.", state);

    writeText(doc, "\n15. Severability", state, { size: 12, bold: true });
    writeText(doc, "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed modified to the minimum extent necessary to render it enforceable, and the remaining provisions shall remain in full force and effect.", state);

    writeText(doc, "\n16. Governing Law", state, { size: 12, bold: true });
    writeText(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[--------]"}.`, state);

    writeText(doc, "\n17. Execution and Signatures", state, { size: 12, bold: true });
    writeText(
      doc,
      `IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.\n\nFor the Offeror:\nSignature: __________________________\nName: ${formData.offerorSignName || "__________________"}\nDate: ${formData.offerorSignDate || "__________________"}\n\nFor the Offeree:\nSignature: __________________________\nName: ${formData.offereeSignName || "__________________"}\nDate: ${formData.offereeSignDate || "__________________"}`,
      state
    );

    doc.save("Barter_Agreement.pdf");
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
              onClick={() => navigate('/barter-agreement-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Barter Agreement
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Goods</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Offeror</h4>
              <Label>Name</Label>
              <Input name="offerorName" value={formData.offerorName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="offerorAddress" value={formData.offerorAddress} onChange={handleChange} />

              <Label>Goods Description (Offeror)</Label>
              <Textarea name="offerorGoodsDesc" value={formData.offerorGoodsDesc} onChange={handleChange} />
              <Label>Condition (Offeror)</Label>
              <Input name="offerorGoodsCondition" value={formData.offerorGoodsCondition} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Offeree</h4>
              <Label>Name</Label>
              <Input name="offereeName" value={formData.offereeName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="offereeAddress" value={formData.offereeAddress} onChange={handleChange} />

              <Label>Goods Description (Offeree)</Label>
              <Textarea name="offereeGoodsDesc" value={formData.offereeGoodsDesc} onChange={handleChange} />
              <Label>Condition (Offeree)</Label>
              <Input name="offereeGoodsCondition" value={formData.offereeGoodsCondition} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Delivery & Schedule</h3>
              <Label>Delivery / Exchange Deadline</Label>
              <Input name="exchangeDeadline" value={formData.exchangeDeadline} onChange={handleChange} />
              <Label>Delivery Location</Label>
              <Input name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} />
              <Label>Anticipated Charges Note</Label>
              <Textarea name="anticipatedChargesNote" value={formData.anticipatedChargesNote} onChange={handleChange} />
              <Label>Termination Compensation Note</Label>
              <Textarea name="terminationCompensationNote" value={formData.terminationCompensationNote} onChange={handleChange} />
              <Label>Valuation Acceptance Note</Label>
              <Textarea name="valuationAcceptanceNote" value={formData.valuationAcceptanceNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranties, Indemnities & ADR</h3>
              <Label>Mutual Representations & Warranties</Label>
              <Textarea name="mutualRepsWarranties" value={formData.mutualRepsWarranties} onChange={handleChange} />
              <Label>Mutual Indemnification</Label>
              <Textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
              <Label>Dispute Resolution / ADR</Label>
              <Textarea name="adrNote" value={formData.adrNote} onChange={handleChange} />
              <Label>Further Assurances</Label>
              <Textarea name="furtherAssurancesNote" value={formData.furtherAssurancesNote} onChange={handleChange} />
              <Label>Assignment</Label>
              <Textarea name="assignmentNote" value={formData.assignmentNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Notices, Law & Signatures</h3>
              <Label>Notices - Offeror Address</Label>
              <Textarea name="noticesOfferorAddress" value={formData.noticesOfferorAddress} onChange={handleChange} />
              <Label>Notices - Offeree Address</Label>
              <Textarea name="noticesOffereeAddress" value={formData.noticesOffereeAddress} onChange={handleChange} />
              <Label>Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Signatures</h4>
              <Label>Offeror - Signatory Name</Label>
              <Input name="offerorSignName" value={formData.offerorSignName} onChange={handleChange} />
              <Label>Offeror - Date</Label>
              <Input name="offerorSignDate" value={formData.offerorSignDate} onChange={handleChange} />

              <Label>Offeree - Signatory Name</Label>
              <Input name="offereeSignName" value={formData.offereeSignName} onChange={handleChange} />
              <Label>Offeree - Date</Label>
              <Input name="offereeSignDate" value={formData.offereeSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Barter Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
