import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { FormWizard } from "./FormWizard";

interface FormData {
  effectiveDate: string;
  firstPartyName: string;
  firstPartyAddress: string;
  secondPartyName: string;
  secondPartyAddress: string;
  term: string;
  cureDays: string;
  goal1: string;
  goal2: string;
  additionalGoals: string;
  scheduleA: string;
  scheduleB: string;
  scheduleC: string;
  ipOwner: string;
  jurisdiction: string;
  signFirstName: string;
  signFirstTitle: string;
  signFirstDate: string;
  signSecondName: string;
  signSecondTitle: string;
  signSecondDate: string;
  witness1Name: string;
  witness1Cnic: string;
  witness1Date: string;
  witness2Name: string;
  witness2Cnic: string;
  witness2Date: string;
}

export default function MemorandumOfAgreementForm() {
  const [form, setForm] = useState<FormData>({
    effectiveDate: "",
    firstPartyName: "",
    firstPartyAddress: "",
    secondPartyName: "",
    secondPartyAddress: "",
    term: "",
    cureDays: "",
    goal1: "",
    goal2: "",
    additionalGoals: "",
    scheduleA: "",
    scheduleB: "",
    scheduleC: "",
    ipOwner: "",
    jurisdiction: "",
    signFirstName: "",
    signFirstTitle: "",
    signFirstDate: "",
    signSecondName: "",
    signSecondTitle: "",
    signSecondDate: "",
    witness1Name: "",
    witness1Cnic: "",
    witness1Date: "",
    witness2Name: "",
    witness2Cnic: "",
    witness2Date: "",
  });

  const steps = [
    {
      label: "Step 1",
      content: (
        <>
          <Label>Effective Date</Label>
          <Input
            type="date"
            name="effectiveDate"
            value={form.effectiveDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, effectiveDate: e.target.value }))
            }
            required
          />

          <Label>First Party Name</Label>
          <Input
            name="firstPartyName"
            value={form.firstPartyName}
            onChange={(e) =>
              setForm((f) => ({ ...f, firstPartyName: e.target.value }))
            }
            required
          />
          <Label>First Party Address</Label>
          <Input
            name="firstPartyAddress"
            value={form.firstPartyAddress}
            onChange={(e) =>
              setForm((f) => ({ ...f, firstPartyAddress: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(
          form.effectiveDate &&
            form.firstPartyName &&
            form.firstPartyAddress
        ),
    },
    {
      label: "Step 2",
      content: (
        <>
          <Label>Second Party Name</Label>
          <Input
            name="secondPartyName"
            value={form.secondPartyName}
            onChange={(e) =>
              setForm((f) => ({ ...f, secondPartyName: e.target.value }))
            }
            required
          />
          <Label>Second Party Address</Label>
          <Input
            name="secondPartyAddress"
            value={form.secondPartyAddress}
            onChange={(e) =>
              setForm((f) => ({ ...f, secondPartyAddress: e.target.value }))
            }
            required
          />

          <Label>Term (e.g., 12 months)</Label>
          <Input
            name="term"
            value={form.term}
            onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
            required
          />
        </>
      ),
      validate: () =>
        Boolean(
          form.secondPartyName && form.secondPartyAddress && form.term
        ),
    },
    {
      label: "Step 3",
      content: (
        <>
          <Label>Default Cure Period (days)</Label>
          <Input
            name="cureDays"
            value={form.cureDays}
            onChange={(e) => setForm((f) => ({ ...f, cureDays: e.target.value }))}
            required
          />

          <Label>Goal 1</Label>
          <Input
            name="goal1"
            value={form.goal1}
            onChange={(e) => setForm((f) => ({ ...f, goal1: e.target.value }))}
            required
          />
          <Label>Goal 2</Label>
          <Input
            name="goal2"
            value={form.goal2}
            onChange={(e) => setForm((f) => ({ ...f, goal2: e.target.value }))}
          />
        </>
      ),
      validate: () => Boolean(form.cureDays && form.goal1),
    },
    {
      label: "Step 4",
      content: (
        <>
          <Label>Additional Goals</Label>
          <Textarea
            name="additionalGoals"
            value={form.additionalGoals}
            onChange={(e) =>
              setForm((f) => ({ ...f, additionalGoals: e.target.value }))
            }
          />

          <Label>Schedule A (First Party Duties)</Label>
          <Textarea
            name="scheduleA"
            value={form.scheduleA}
            onChange={(e) => setForm((f) => ({ ...f, scheduleA: e.target.value }))}
          />

          <Label>Schedule B (Second Party Duties)</Label>
          <Textarea
            name="scheduleB"
            value={form.scheduleB}
            onChange={(e) => setForm((f) => ({ ...f, scheduleB: e.target.value }))}
          />
        </>
      ),
      validate: () => true,
    },
    {
      label: "Step 5",
      content: (
        <>
          <Label>Consideration / Schedule C</Label>
          <Textarea
            name="scheduleC"
            value={form.scheduleC}
            onChange={(e) => setForm((f) => ({ ...f, scheduleC: e.target.value }))}
          />

          <Label>Work Product Owner (who owns IP)</Label>
          <Input
            name="ipOwner"
            value={form.ipOwner}
            onChange={(e) => setForm((f) => ({ ...f, ipOwner: e.target.value }))}
          />

          <Label>Governing Jurisdiction</Label>
          <Input
            name="jurisdiction"
            value={form.jurisdiction}
            onChange={(e) => setForm((f) => ({ ...f, jurisdiction: e.target.value }))}
          />
        </>
      ),
      validate: () => true,
    },
    {
      label: "Step 6",
      content: (
        <>
          <Label>First Party - Signatory Name</Label>
          <Input
            name="signFirstName"
            value={form.signFirstName}
            onChange={(e) =>
              setForm((f) => ({ ...f, signFirstName: e.target.value }))
            }
            required
          />
          <Label>First Party - Title</Label>
          <Input
            name="signFirstTitle"
            value={form.signFirstTitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, signFirstTitle: e.target.value }))
            }
            required
          />
          <Label>First Party - Date</Label>
          <Input
            type="date"
            name="signFirstDate"
            value={form.signFirstDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, signFirstDate: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(form.signFirstName && form.signFirstTitle && form.signFirstDate),
    },
    {
      label: "Step 7",
      content: (
        <>
          <Label>Second Party - Signatory Name</Label>
          <Input
            name="signSecondName"
            value={form.signSecondName}
            onChange={(e) =>
              setForm((f) => ({ ...f, signSecondName: e.target.value }))
            }
            required
          />
          <Label>Second Party - Title</Label>
          <Input
            name="signSecondTitle"
            value={form.signSecondTitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, signSecondTitle: e.target.value }))
            }
            required
          />
          <Label>Second Party - Date</Label>
          <Input
            type="date"
            name="signSecondDate"
            value={form.signSecondDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, signSecondDate: e.target.value }))
            }
            required
          />
        </>
      ),
      validate: () =>
        Boolean(form.signSecondName && form.signSecondTitle && form.signSecondDate),
    },
    {
      label: "Step 8",
      content: (
        <>
          <Label>Witness 1 - Name</Label>
          <Input
            name="witness1Name"
            value={form.witness1Name}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness1Name: e.target.value }))
            }
          />
          <Label>Witness 1 - CNIC/ID</Label>
          <Input
            name="witness1Cnic"
            value={form.witness1Cnic}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness1Cnic: e.target.value }))
            }
          />
          <Label>Witness 1 - Date</Label>
          <Input
            type="date"
            name="witness1Date"
            value={form.witness1Date}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness1Date: e.target.value }))
            }
          />
        </>
      ),
      validate: () => true,
    },
    {
      label: "Step 9",
      content: (
        <>
          <Label>Witness 2 - Name</Label>
          <Input
            name="witness2Name"
            value={form.witness2Name}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness2Name: e.target.value }))
            }
          />
          <Label>Witness 2 - CNIC/ID</Label>
          <Input
            name="witness2Cnic"
            value={form.witness2Cnic}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness2Cnic: e.target.value }))
            }
          />
          <Label>Witness 2 - Date</Label>
          <Input
            type="date"
            name="witness2Date"
            value={form.witness2Date}
            onChange={(e) =>
              setForm((f) => ({ ...f, witness2Date: e.target.value }))
            }
          />
        </>
      ),
      validate: () => true,
    },
  ];

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
        y += size * 1.35;
      });
    };

    write("MEMORANDUM OF AGREEMENT", 14, true, true);
    write("\n");

    write(`This Memorandum of Agreement (the \"Agreement\") is made and entered into as of ${form.effectiveDate || "[Effective Date]"}, by and between:`);
    write(`${form.firstPartyName || "[First Party Name]"}, having its principal place of business at ${form.firstPartyAddress || "[Address]"} (the \"First Party\"); and`);
    write(`${form.secondPartyName || "[Second Party Name]"}, having its principal place of business at ${form.secondPartyAddress || "[Address]"} (the \"Second Party\").`);

    write("\n");
    write("1. TERM OF AGREEMENT", 12, true);
    write(`1.1 Duration: This Agreement shall remain in full force and effect for a period of ${form.term || "[Specify Term]"}.`);
    write(`1.2 Early Termination: Either Party may terminate this Agreement in the event that the other Party materially breaches any provision and fails to remedy such breach within thirty (30) days of receipt of written notice specifying the nature of the breach.`);

    write("\n");
    write("2. GOALS AND OBJECTIVES", 12, true);
    write(`The Parties agree to cooperate to achieve the following objectives:`);
    if (form.goal1) write(`• ${form.goal1}`);
    if (form.goal2) write(`• ${form.goal2}`);
    if (form.additionalGoals) write(form.additionalGoals);

    write("\n");
    write("3. OBLIGATIONS OF THE PARTIES", 12, true);
    write("3.1 First Party Obligations");
    write(form.scheduleA || "[Describe duties of First Party as per Schedule A]");
    write("3.2 Second Party Obligations");
    write(form.scheduleB || "[Describe duties of Second Party as per Schedule B]");

    write("\n");
    write("4. CONFIDENTIALITY AND INFORMATION DISCLOSURE", 12, true);
    write("Each Party shall treat as strictly confidential all information received in connection with this Agreement. Confidential information may only be disclosed as permitted in the Agreement.");

    write("\n");
    write("6. CONSIDERATION", 12, true);
    write(form.scheduleC || "[Describe consideration, payments, or other exchange of value]");

    write("\n");
    write("7. REPRESENTATIONS AND WARRANTIES", 12, true);
    write("Each Party represents and warrants that it has full legal capacity and authority to execute and perform this Agreement and that all necessary approvals have been obtained.");

    write("\n");
    write("8. WORK PRODUCT AND INTELLECTUAL PROPERTY", 12, true);
    write(`Work Product: ${form.ipOwner || "[Specify Party who owns work product]"}`);

    write("\n");
    write("9. NOTICE", 12, true);
    write("Any notice required or permitted under this Agreement shall be given in writing and deemed receipt as provided in the Agreement.");

    write("\n");
    write("10. TERMINATION AND REMEDIES", 12, true);
    write(`Termination for Material Breach: Either Party may terminate the Agreement if the other fails to remedy a material breach within thirty (30) days of written notice. Default and Cure Period: ${form.cureDays || "[Specify number of days]"}.`);

    write("\n");
    write("11. AMENDMENT", 12, true);
    write("This Agreement may be amended only by a written instrument executed by all Parties.");

    write("\n");
    write("14. GOVERNING LAW", 12, true);
    write(`This Agreement shall be governed by and construed in accordance with the laws of ${form.jurisdiction || "[Specify Jurisdiction]"}.`);

    write("\n");
    write("15. ENTIRE AGREEMENT", 12, true);
    write("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.");

    write("\n");
    write("16. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the Parties, intending to be legally bound, have executed this Memorandum of Agreement as of the Effective Date.");

    write(`FIRST PARTY: ${form.firstPartyName || "[First Party Name]"}`);
    write(`Name/Title: ${form.signFirstName || "________________"} ${form.signFirstTitle ? ` / ${form.signFirstTitle}` : ""}`);
    write(`Date: ${form.signFirstDate || "________________"}`);

    write(`\nSECOND PARTY: ${form.secondPartyName || "[Second Party Name]"}`);
    write(`Name/Title: ${form.signSecondName || "________________"} ${form.signSecondTitle ? ` / ${form.signSecondTitle}` : ""}`);
    write(`Date: ${form.signSecondDate || "________________"}`);

    write("\nWITNESSES:");
    write(`1. ${form.witness1Name || "________________"}  CNIC/ID: ${form.witness1Cnic || "________________"}  Date: ${form.witness1Date || "________________"}`);
    write(`2. ${form.witness2Name || "________________"}  CNIC/ID: ${form.witness2Cnic || "________________"}  Date: ${form.witness2Date || "________________"}`);

    doc.save("Memorandum_of_Agreement.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <FormWizard
        steps={steps}
        onFinish={() => {
          generatePDF();
          alert("Form submitted!");
        }}
      />
    </div>
  );
}
