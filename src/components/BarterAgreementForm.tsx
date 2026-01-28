import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import jsPDF from "jspdf";

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

const initialFormData: FormData = {
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
};

export default function BarterAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Split fields into steps of max 3 fields per step
  const fields: Array<{ name: keyof FormData; label: string; type?: string }> = [
    { name: "effectiveDate", label: "Effective Date", type: "date" },
    { name: "offerorName", label: "Offeror Name" },
    { name: "offerorAddress", label: "Offeror Address" },
    { name: "offereeName", label: "Offeree Name" },
    { name: "offereeAddress", label: "Offeree Address" },
    { name: "offerorGoodsDesc", label: "Offeror Goods Description" },
    { name: "offerorGoodsCondition", label: "Offeror Goods Condition" },
    { name: "offereeGoodsDesc", label: "Offeree Goods Description" },
    { name: "offereeGoodsCondition", label: "Offeree Goods Condition" },
    { name: "exchangeDeadline", label: "Exchange Deadline" },
    { name: "deliveryLocation", label: "Delivery Location" },
    { name: "anticipatedChargesNote", label: "Anticipated Charges Note" },
    { name: "terminationCompensationNote", label: "Termination Compensation Note" },
    { name: "valuationAcceptanceNote", label: "Valuation Acceptance Note" },
    { name: "mutualRepsWarranties", label: "Mutual Representations & Warranties" },
    { name: "indemnificationNote", label: "Mutual Indemnification" },
    { name: "adrNote", label: "Dispute Resolution / ADR" },
    { name: "furtherAssurancesNote", label: "Further Assurances" },
    { name: "assignmentNote", label: "Assignment" },
    { name: "noticesOfferorAddress", label: "Notices - Offeror Address" },
    { name: "noticesOffereeAddress", label: "Notices - Offeree Address" },
    { name: "governingLaw", label: "Governing Law / Jurisdiction" },
    { name: "offerorSignName", label: "Offeror - Signatory Name" },
    { name: "offerorSignDate", label: "Offeror - Date", type: "date" },
    { name: "offereeSignName", label: "Offeree - Signatory Name" },
    { name: "offereeSignDate", label: "Offeree - Date", type: "date" },
  ];

  const steps = [];
  for (let i = 0; i < fields.length; i += 3) {
    steps.push({
      label: `Step ${steps.length + 1}`,
      content: (
        <div className="space-y-4">
          {fields.slice(i, i + 3).map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] as string}
                  onChange={e => updateFormData(field.name, e.target.value)}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={formData[field.name] as string}
                  onChange={e => updateFormData(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // PDF generation logic moved to onFinish
  const onFinish = () => {
    setIsGeneratingPDF(true);
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const state = { y: 40 };
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
    // ...existing code for PDF generation (copy from previous generatePDF)...
    writeText(doc, "BARTER AGREEMENT", state, { size: 14, bold: true, center: true });
    writeText(doc, "\n", state);
    writeText(
      doc,
      `This Barter Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "[---------]"} (the "Effective Date"), by and between:\n${formData.offerorName || "[---------]"}, having its address at ${formData.offerorAddress || "[-------]"} ("Offeror"),\nAND\n${formData.offereeName || "[---------]"}, having its address at ${formData.offereeAddress || "[-------]"} ("Offeree").\nThe Offeror and the Offeree may hereinafter be referred to individually as a "Party" and collectively as the "Parties".`,
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
    setIsGeneratingPDF(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Barter Agreement</h2>
      <FormWizard steps={steps} onFinish={onFinish} />
      {isGeneratingPDF && <div>Generating PDF...</div>}
    </div>
  );
}
