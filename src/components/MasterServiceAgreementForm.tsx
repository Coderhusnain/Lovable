import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { FormWizard } from "./FormWizard";

interface FormData {
  agreementDate: string;
  place: string;

  masterName: string;
  masterAddress: string;

  servantName: string;
  servantRelationOf: string; // e.g., son/daughter/wife of ...
  servantAddress: string;

  employmentPlaceAddress: string;

  dutiesList: string;
  conductList: string;

  remunerationAmount: string;
  remunerationDay: string;
  remunerationDetails: string;

  prohibitedList: string;

  termYears: string;
  terminationNoticeDays: string;
  immediateTerminationNote: string;

  miscNotes: string;
  governingLaw: string;

  acknowledgmentNote: string;

  masterSignName: string;
  masterSignCNIC: string;
  masterSignDate: string;

  servantSignName: string;
  servantSignCNIC: string;
  servantSignDate: string;

  witness1Name: string;
  witness1CNIC: string;
  witness1SignatureDate: string;

  witness2Name: string;
  witness2CNIC: string;
  witness2SignatureDate: string;
}

export default function MasterServiceAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "23rd day of June 2025",
    place: "Islamabad",

    masterName: "",
    masterAddress: "",

    servantName: "",
    servantRelationOf: "son/daughter/wife of __________________",
    servantAddress: "",

    employmentPlaceAddress: "[Full Residential Address]",

    dutiesList:
      "• Cleaning and maintenance of the house\n• Washing clothes and dishes\n• Cooking or assisting in food preparation\n• elderly care\n• Grocery shopping or errands, if instructed;\n• Any other related domestic tasks assigned by the Master",

    conductList:
      "• To maintain discipline, honesty, and confidentiality in all matters pertaining to the household;\n• Not to invite or allow any guest or outsider to enter the premises without the prior consent of the Master;\n• To refrain from causing any damage to the property and from engaging in any unlawful or illegal activity;\n• Not to allow entry into the premises of any individual, including the Servant’s son, who is involved in or facing any criminal charges or proceedings;\n• Not to leave the premises of the house without the prior permission or approval of the Master;\n• To behave respectfully and courteously towards the Master at all times, and to refrain from any form of misconduct or misbehavior;\n• Not to use the address of the Master’s residence for any purpose, including but not limited to correspondence, legal documentation, or as proof of residence, nor to represent any affiliation or connection with the Master or the premises without express written permission.",

    remunerationAmount: "[mentioned amount]",
    remunerationDay: "5th",
    remunerationDetails:
      "It includes salary, a portion of house to stay including free electricity as well as gas utilities.",

    prohibitedList:
      "• Theft or misuse of the Master’s belongings;\n• Physical or verbal abuse;\n• Use or possession of intoxicating substances;\n• Bringing outsiders without permission;\n• Misrepresentation of identity or use of false documents.",

    termYears: "2",
    terminationNoticeDays: "30",
    immediateTerminationNote:
      "The Master reserves the right to terminate the Agreement immediately in case of misconduct, breach of trust, or violation of any term of this Agreement.",

    miscNotes:
      "• This Agreement constitutes the entire understanding between the Parties.\n• Any modification must be in writing and signed by both Parties.\n• This Agreement shall be governed by the laws of state.",

    governingLaw: "state",

    acknowledgmentNote:
      "The Servant acknowledges that she has read, understood, and voluntarily agreed to the terms and conditions of this Agreement and signs it in full acceptance thereof.",

    masterSignName: "",
    masterSignCNIC: "",
    masterSignDate: "",

    servantSignName: "",
    servantSignCNIC: "",
    servantSignDate: "",

    witness1Name: "",
    witness1CNIC: "",
    witness1SignatureDate: "",

    witness2Name: "",
    witness2CNIC: "",
    witness2SignatureDate: "",
  });

  const steps = [
    {
      label: "Step 1",
      content: (
        <>
          <Label>Agreement Date</Label>
          <Input
            name="agreementDate"
            value={formData.agreementDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agreementDate: e.target.value }))
            }
            required
          />
          <Label>Place (city)</Label>
          <Input
            name="place"
            value={formData.place}
            onChange={(e) => setFormData((prev) => ({ ...prev, place: e.target.value }))}
            required
          />
          <Label>Master Full Name</Label>
          <Input
            name="masterName"
            value={formData.masterName}
            onChange={(e) => setFormData((prev) => ({ ...prev, masterName: e.target.value }))}
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.agreementDate && formData.place && formData.masterName),
    },
    {
      label: "Step 2",
      content: (
        <>
          <Label>Master Address</Label>
          <Input
            name="masterAddress"
            value={formData.masterAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, masterAddress: e.target.value }))
            }
            required
          />
          <Label>Servant Full Name</Label>
          <Input
            name="servantName"
            value={formData.servantName}
            onChange={(e) => setFormData((prev) => ({ ...prev, servantName: e.target.value }))}
            required
          />
          <Label>Servant (son/daughter/wife of)</Label>
          <Input
            name="servantRelationOf"
            value={formData.servantRelationOf}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, servantRelationOf: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.masterAddress && formData.servantName && formData.servantRelationOf),
    },
    {
      label: "Step 3",
      content: (
        <>
          <Label>Servant Address</Label>
          <Input
            name="servantAddress"
            value={formData.servantAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, servantAddress: e.target.value }))
            }
            required
          />
          <Label>Employment Place Address</Label>
          <Input
            name="employmentPlaceAddress"
            value={formData.employmentPlaceAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, employmentPlaceAddress: e.target.value }))
            }
            required
          />
          <Label>Duties (each bullet on new line)</Label>
          <textarea
            name="dutiesList"
            value={formData.dutiesList}
            onChange={(e) => setFormData((prev) => ({ ...prev, dutiesList: e.target.value }))}
            required
            className="w-full p-2 border rounded"
            rows={6}
          />
        </>
      ),
      validate: () =>
        Boolean(formData.servantAddress && formData.employmentPlaceAddress && formData.dutiesList),
    },
    {
      label: "Step 4",
      content: (
        <>
          <Label>Code of Conduct (each bullet on new line)</Label>
          <textarea
            name="conductList"
            value={formData.conductList}
            onChange={(e) => setFormData((prev) => ({ ...prev, conductList: e.target.value }))}
            required
            className="w-full p-2 border rounded"
            rows={8}
          />
          <Label>Monthly Amount (e.g., US $300)</Label>
          <Input
            name="remunerationAmount"
            value={formData.remunerationAmount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, remunerationAmount: e.target.value }))
            }
            required
          />
          <Label>Payment Day (e.g., 5th)</Label>
          <Input
            name="remunerationDay"
            value={formData.remunerationDay}
            onChange={(e) => setFormData((prev) => ({ ...prev, remunerationDay: e.target.value }))}
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.conductList && formData.remunerationAmount && formData.remunerationDay),
    },
    {
      label: "Step 5",
      content: (
        <>
          <Label>Remuneration Details</Label>
          <textarea
            name="remunerationDetails"
            value={formData.remunerationDetails}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, remunerationDetails: e.target.value }))
            }
            required
            className="w-full p-2 border rounded"
            rows={3}
          />
          <Label>Prohibited Conduct (each bullet on new line)</Label>
          <textarea
            name="prohibitedList"
            value={formData.prohibitedList}
            onChange={(e) => setFormData((prev) => ({ ...prev, prohibitedList: e.target.value }))}
            required
            className="w-full p-2 border rounded"
            rows={6}
          />
          <Label>Term (years)</Label>
          <Input
            name="termYears"
            value={formData.termYears}
            onChange={(e) => setFormData((prev) => ({ ...prev, termYears: e.target.value }))}
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.remunerationDetails && formData.prohibitedList && formData.termYears),
    },
    {
      label: "Step 6",
      content: (
        <>
          <Label>Termination Notice Days</Label>
          <Input
            name="terminationNoticeDays"
            value={formData.terminationNoticeDays}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, terminationNoticeDays: e.target.value }))
            }
            required
          />
          <Label>Immediate Termination Note</Label>
          <textarea
            name="immediateTerminationNote"
            value={formData.immediateTerminationNote}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, immediateTerminationNote: e.target.value }))
            }
            required
            className="w-full p-2 border rounded"
            rows={3}
          />
          <Label>Miscellaneous Notes</Label>
          <textarea
            name="miscNotes"
            value={formData.miscNotes}
            onChange={(e) => setFormData((prev) => ({ ...prev, miscNotes: e.target.value }))}
            required
            className="w-full p-2 border rounded"
            rows={4}
          />
        </>
      ),
      validate: () =>
        Boolean(formData.terminationNoticeDays && formData.immediateTerminationNote && formData.miscNotes),
    },
    {
      label: "Step 7",
      content: (
        <>
          <Label>Governing Law (state)</Label>
          <Input
            name="governingLaw"
            value={formData.governingLaw}
            onChange={(e) => setFormData((prev) => ({ ...prev, governingLaw: e.target.value }))}
            required
          />
          <Label>Acknowledgment Text</Label>
          <textarea
            name="acknowledgmentNote"
            value={formData.acknowledgmentNote}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, acknowledgmentNote: e.target.value }))
            }
            required
            className="w-full p-2 border rounded"
            rows={3}
          />
        </>
      ),
      validate: () => Boolean(formData.governingLaw && formData.acknowledgmentNote),
    },
    {
      label: "Step 8",
      content: (
        <>
          <Label>Master - Name</Label>
          <Input
            name="masterSignName"
            value={formData.masterSignName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, masterSignName: e.target.value }))
            }
            required
          />
          <Label>Master - CNIC No.</Label>
          <Input
            name="masterSignCNIC"
            value={formData.masterSignCNIC}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, masterSignCNIC: e.target.value }))
            }
            required
          />
          <Label>Master - Date</Label>
          <Input
            name="masterSignDate"
            value={formData.masterSignDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, masterSignDate: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.masterSignName && formData.masterSignCNIC && formData.masterSignDate),
    },
    {
      label: "Step 9",
      content: (
        <>
          <Label>Servant - Name</Label>
          <Input
            name="servantSignName"
            value={formData.servantSignName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, servantSignName: e.target.value }))
            }
            required
          />
          <Label>Servant - CNIC No.</Label>
          <Input
            name="servantSignCNIC"
            value={formData.servantSignCNIC}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, servantSignCNIC: e.target.value }))
            }
            required
          />
          <Label>Servant - Date</Label>
          <Input
            name="servantSignDate"
            value={formData.servantSignDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, servantSignDate: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(formData.servantSignName && formData.servantSignCNIC && formData.servantSignDate),
    },
    {
      label: "Step 10",
      content: (
        <>
          <Label>Witness 1 - Name</Label>
          <Input
            name="witness1Name"
            value={formData.witness1Name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness1Name: e.target.value }))
            }
          />
          <Label>Witness 1 - CNIC No.</Label>
          <Input
            name="witness1CNIC"
            value={formData.witness1CNIC}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness1CNIC: e.target.value }))
            }
          />
          <Label>Witness 1 - Date</Label>
          <Input
            name="witness1SignatureDate"
            value={formData.witness1SignatureDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness1SignatureDate: e.target.value }))
            }
          />
        </>
      ),
      validate: () => true,
    },
    {
      label: "Step 11",
      content: (
        <>
          <Label>Witness 2 - Name</Label>
          <Input
            name="witness2Name"
            value={formData.witness2Name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness2Name: e.target.value }))
            }
          />
          <Label>Witness 2 - CNIC No.</Label>
          <Input
            name="witness2CNIC"
            value={formData.witness2CNIC}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness2CNIC: e.target.value }))
            }
          />
          <Label>Witness 2 - Date</Label>
          <Input
            name="witness2SignatureDate"
            value={formData.witness2SignatureDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, witness2SignatureDate: e.target.value }))
            }
          />
        </>
      ),
      validate: () => true,
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
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

    // === MASTER SERVICE AGREEMENT CONTENT (verbatim with placeholders) ===
    addText("MASTER SERVICE AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Agreement is made on this ${formData.agreementDate || "__________"}, at ${formData.place || "__________"}, by and between:`
    );
    addText(
      `Party One, residing at ${formData.masterAddress || "[Full Residential Address]"}, hereinafter referred to as the "Master",`
    );
    addText("\n                                                           AND\n");
    addText(
      `Party Two, ${formData.servantRelationOf || "son/daughter/wife of __________________"}, residing at ${formData.servantAddress || "[Full Residential Address]"}, hereinafter referred to as the “Servant”`
    );
    addText("Collectively referred to as the \"Parties\".");
    addText("\n");

    addText("Purpose of the Agreement", 12, true);
    addText(
      "The Master agrees to employ the Servant as a domestic worker, responsible for carrying out general household duties and safeguarding the Master’s premises. In consideration thereof, the Master shall provide a designated portion of the residence within the premises for the Servant’s accommodation, subject to the terms and conditions stipulated in this Agreement."
    );
    addText("\n");

    addText("Place of Employment", 12, true);
    addText("The Servant is employed at the residence of the Master located at:");
    addText(`${formData.employmentPlaceAddress || "[Full Residential Address]"}`);
    addText("\n");

    addText("Duties and Responsibilities", 12, true);
    addText("The Servant agreed to perform the following duties:");
    addText(formData.dutiesList);
    addText("\n");

    addText("Code of Conduct", 12, true);
    addText("The Servant agreed and undertook as follows:");
    addText(formData.conductList);
    addText("\n");

    addText("Remuneration", 12, true);
    addText(
      `The Master is paying the Servant a monthly package of ${formData.remunerationAmount || "[mentioned amount]"} on ${formData.remunerationDay || "5th"} of each month. ${formData.remunerationDetails}`
    );
    addText("\n");

    addText("Prohibited Conduct", 12, true);
    addText("The following actions are strictly prohibited and may result in immediate termination:");
    addText(formData.prohibitedList);
    addText("\n");

    addText("Duration and Termination", 12, true);
    addText(
      `This agreement shall be valid for a period of ${formData.termYears || "two (02) years"} from the date of signing and may be renewed with mutual consent.`
    );
    addText(`• Either party may terminate this agreement with ${formData.terminationNoticeDays || "30"} days notice or salary in lieu thereof.`);
    addText(`• ${formData.immediateTerminationNote}`);
    addText("\n");

    addText("Miscellaneous", 12, true);
    addText(formData.miscNotes);
    addText("\n");

    addText("Acknowledgment", 12, true);
    addText(formData.acknowledgmentNote);
    addText("\n");

    addText("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement on the day, month, and year first written above.", 11);
    addText("\n");

    addText("MASTER", 12, true);
    addText(`Name: ${formData.masterSignName || "__________________________"}`);
    addText(`Signature: _________________________`);
    addText(`CNIC No.: ${formData.masterSignCNIC || "________________"}`);
    addText("\n");

    addText("SERVANT", 12, true);
    addText(`Name: ${formData.servantSignName || "__________________________"}`);
    addText(`Signature: _________________________`);
    addText(`CNIC No.: ${formData.servantSignCNIC || "________________"}`);
    addText("\n");

    addText("1.WITNESSES", 12, true);
    addText(`Name: ${formData.witness1Name || "________________________"}`);
    addText(`Signature: _______________________`);
    addText(`CNIC No.: ${formData.witness1CNIC || "__________________"}`);
    addText("\n");

    addText("2.WITNESSES", 12, true);
    addText(`Name: ${formData.witness2Name || "________________________"}`);
    addText(`Signature: _______________________`);
    addText(`CNIC No.: ${formData.witness2CNIC || "__________________"}`);
    addText("\n");

    // Save file
    doc.save("Master_Service_Agreement.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <FormWizard
        steps={steps}
        onFinish={() => {
          generatePDF();
        }}
      />
    </div>
  );
}
