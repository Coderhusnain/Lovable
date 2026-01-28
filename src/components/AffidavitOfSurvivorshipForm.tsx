import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { FormWizard } from "./FormWizard";

const AffidavitOfSurvivorshipForm = () => {
  const [form, setForm] = useState({
    affiantName: "",
    decedentName: "",
    dateOfDeath: "",
    relationship: "",
    witnessName: "",
    statement: "",
  });

  const steps = [
    {
      label: "Step 1",
      content: (
        <>
          <Label>Affiant Name</Label>
          <Input
            name="affiantName"
            value={form.affiantName}
            onChange={(e) =>
              setForm((f) => ({ ...f, affiantName: e.target.value }))
            }
            required
          />
          <Label>Decedent Name</Label>
          <Input
            name="decedentName"
            value={form.decedentName}
            onChange={(e) =>
              setForm((f) => ({ ...f, decedentName: e.target.value }))
            }
            required
          />
          <Label>Date of Death</Label>
          <Input
            name="dateOfDeath"
            type="date"
            value={form.dateOfDeath}
            onChange={(e) =>
              setForm((f) => ({ ...f, dateOfDeath: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(
          form.affiantName && form.decedentName && form.dateOfDeath
        ),
    },
    {
      label: "Step 2",
      content: (
        <>
          <Label>Relationship</Label>
          <Input
            name="relationship"
            value={form.relationship}
            onChange={(e) =>
              setForm((f) => ({ ...f, relationship: e.target.value }))
            }
            required
          />
          <Label>Witness Name</Label>
          <Input
            name="witnessName"
            value={form.witnessName}
            onChange={(e) =>
              setForm((f) => ({ ...f, witnessName: e.target.value }))
            }
          />
          <Label>Statement</Label>
          <textarea
            name="statement"
            value={form.statement}
            onChange={(e) =>
              setForm((f) => ({ ...f, statement: e.target.value }))
            }
            className="w-full p-2 border rounded"
            rows={5}
            required
          />
        </>
      ),
      validate: () => Boolean(form.relationship && form.statement),
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
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
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
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

    // === PDF Content ===
    addText("AFFIDAVIT OF SURVIVORSHIP", 14, true, true);
    addText(`State of ____________________`);
    addText("\n");
    addText(`County of _________________`);
    addText(
      `I, ${form.affiantName}, residing at ______________________, being of legal age and competent to testify, do hereby depose and state as follows:`
    );
    addText(
      `1.That on the _____ day of ________, 20__, by deed executed on that date and recorded in Book/Volume ______, Page ______, of the Official Records of __________ County, under Document Number __________ (hereinafter referred to as the “Deed”), the undersigned Affiant and ${form.decedentName} became joint owners of the following legally described real property:`
    );
    addText(
      "2.That the Affiant and ${form.decedentName} acquired title to the said property as joint tenants with right of survivorship."
    );
    addText(
      `3.That on the ${form.dateOfDeath}, the said ${form.decedentName} died, thereby terminating his/her interest in the above-described real property. A certified copy of the death certificate of ${form.decedentName} is attached hereto and marked as Exhibit A.`
    );
    addText("Oath or Affirmation");
    addText(
      "I certify under penalty of perjury under the laws of the State of ____________________ that the foregoing statements made in this Affidavit are true and correct to the best of my knowledge, information, and belief."
    );
    addText(
      `Executed this _____ day of __________, 20__.`
    );
    addText("\n");
    addText(form.affiantName || "[Affiant's Full Name]");
    addText("\n");
    addText("(Signature of Affiant)");
    addText("\n");
    addText(
      `Subscribed and sworn to before me on this _____ day of __________, 20__.`
    );
    addText("\n");
    addText("Notary Public");
    addText("\n");
    addText(`My Commission Expires: _______________`);
    addText("\n");
    addText(`State of : _______________`);
    addText(`Country Of : _______________`);
    addText("\n");
    addText("Make It Legal");
    addText("\n");
    addText(
      "This Affidavit should be signed in front of a notary public by ---------------------."
    );
    addText(
      "Once signed in front of a notary, this document should be delivered to the appropriate court for filing."
    );
    addText("Copies");
    addText(
      "The original Affidavit should be filed with the Clerk of Court or delivered to the requesting business."
    );
    addText(
      "The Affiant should maintain a copy of the Affidavit. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference."
    );
    addText("Additional Assistance");
    addText(
      "If you are unsure or have questions regarding this Affidavit or need additional assistance with special situations or circumstances, use Legalgram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter"
    );

    // Save file
    doc.save("Affidavit_of_Survivorship.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 ">
      <FormWizard
        steps={steps}
        onFinish={() => {
          generatePDF();
          alert("Form submitted!");
        }}
      />
    </div>
  );
};

export default AffidavitOfSurvivorshipForm;
