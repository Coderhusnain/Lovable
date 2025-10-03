import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  // General
  agreementDate: string;
  testatorName: string;
  testatorAddress: string;

  // Article I – Family
  spouseName: string;
  childrenNames: string;

  // Article II – Debts
  debts: string;

  // Article III – Property
  specificBequests: string;
  digitalAssets: string;
  tangiblePersonalProperty: string;
  residuaryEstate: string;
  state: string;

  // Article IV – Pet Care
  petNames: string;
  petCaretaker1: string;
  petCaretaker1Address: string;
  petCaretaker2: string;
  petCaretaker2Address: string;
  petCareFunds: string;

  // Article V – Executor
  executorName: string;
  executorAddress: string;
  successorExecutorName: string;
  successorExecutorAddress: string;

  // Article VI – Digital Executor
  digitalExecutorName: string;
  digitalExecutorAddress: string;
  successorDigitalExecutorName: string;
  successorDigitalExecutorAddress: string;

  // Article VII – Guardian
  guardianName: string;
  guardianAddress: string;
  successorGuardianName: string;
  successorGuardianAddress: string;

  // Article VIII – Executor Powers
  executorPowers: string;

  // Article IX – Digital Executor Powers
  digitalExecutorPowers: string;

  // Article X – Special Directives
  specialDirectives: string;

  // Article XI – Miscellaneous
  miscellaneous: string;

  // Witnesses
  witness1Name: string;
  witness1Address: string;
  witness1CityState: string;
  witness2Name: string;
  witness2Address: string;
  witness2CityState: string;
}




const LastWillAndTestamentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

const [formData, setFormData] = useState<FormData>({
  // General
  agreementDate: "",
  testatorName: "",
  testatorAddress: "",

  // Article I – Family
  spouseName: "",
  childrenNames: "",

  // Article II – Debts
  debts: "",

  // Article III – Property
  specificBequests: "",
  digitalAssets: "",
  tangiblePersonalProperty: "",
  residuaryEstate: "",
  state: "",

  // Article IV – Pet Care
  petNames: "",
  petCaretaker1: "",
  petCaretaker1Address: "",
  petCaretaker2: "",
  petCaretaker2Address: "",
  petCareFunds: "",

  // Article V – Executor
  executorName: "",
  executorAddress: "",
  successorExecutorName: "",
  successorExecutorAddress: "",

  // Article VI – Digital Executor
  digitalExecutorName: "",
  digitalExecutorAddress: "",
  successorDigitalExecutorName: "",
  successorDigitalExecutorAddress: "",

  // Article VII – Guardian
  guardianName: "",
  guardianAddress: "",
  successorGuardianName: "",
  successorGuardianAddress: "",

  // Article VIII – Executor Powers
  executorPowers: "",

  // Article IX – Digital Executor Powers
  digitalExecutorPowers: "",

  // Article X – Special Directives
  specialDirectives: "",

  // Article XI – Miscellaneous
  miscellaneous: "",

  // Witnesses
  witness1Name: "",
  witness1Address: "",
  witness1CityState: "",
  witness2Name: "",
  witness2Address: "",
  witness2CityState: "",
});
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 13));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async () => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > 270) {
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

    // Title
    addText("LAST WILL AND TESTAMENT", 16, true, true);
    currentY += 6;

    addText(
      `I, ${formData.testatorName || "__________________"}, residing at ${
        formData.testatorAddress || "__________________"
      }, hereby revoke all prior Wills and Codicils heretofore made by me and declare this instrument to be my Last Will and Testament (\u201cWill\u201d).`
    );
    currentY += 6;

    const sections: { title: string; content: string }[] = [
      {
        title: "ARTICLE I – Identification of Family",
        content: `I am lawfully married to ${formData.spouseName || "__________________"}, and all references in this Will to \u201cmy spouse\u201d shall mean and refer to said ${formData.spouseName || "__________________"}.
The names of my children are ${formData.childrenNames || "__________________"}. All references in this Will to \u201cmy children\u201d shall include the above-named children and any other child or children hereafter born to or adopted by me after the execution of this Will.`,
      },
      {
        title: "ARTICLE II – Payment of Debts and Expenses",
        content: `I direct that all of my just debts, including but not limited to funeral expenses and expenses of my last illness, be first paid from my estate as soon as practicable after my death.`,
      },
      {
        title: "ARTICLE III – Disposition of Property",
        content: `A. Specific Bequests
I direct that the following specific bequests be made from my estate: ${formData.specificBequests || "__________________"}.

B. Digital Assets
All of my digital assets shall be distributed in accordance with Schedule \u201cA\u201d attached to and incorporated into this Will.
For purposes of this Will, \u201cdigital assets\u201d shall mean any and all electronic, online, or virtual property owned or controlled by me at the time of my death, including, but not limited to, accounts and content on social networking sites, cloud storage, email, financial accounts, domain names, virtual currencies, websites, blogs, and any other online content or data.
A Letter of Instructions containing associated usernames, passwords, and any necessary access information is incorporated by reference into this Will and shall be delivered exclusively to my appointed Digital Executor.

C. Tangible Personal Property
All remaining tangible personal property not otherwise specifically bequeathed herein shall be distributed to ${formData.tangiblePersonalProperty || "__________________"}. Should this beneficiary fail to survive me, such property shall be distributed as part of my residuary estate.

D. Residuary Estate
I direct that the remainder of my estate, real, personal, or mixed, and wherever situated, be distributed to my spouse, ${formData.spouseName || "__________________"}.
If my spouse does not survive me, I direct that my residuary estate be distributed equally among my surviving children, and if any child is deceased, such child\u2019s share shall be distributed to their descendants by right of representation.
If neither my spouse, children, nor descendants survive me, I direct that my residuary estate be distributed to ${formData.residuaryEstate || "__________________"}.
Should such beneficiary fail to survive me, the remainder of my estate shall pass to my heirs-at-law in accordance with the laws of the State of ${formData.state || "__________________"}.`,
      },
      {
        title: "ARTICLE IV – Pet Care Directives",
        content: `A. Appointment of Pet Caretaker
I give my pets, namely ${formData.petNames || "__________________"}, together with any other companion animals I may own at my death, to ${formData.petCaretaker1 || "__________________"}, of ${formData.petCaretaker1Address || "__________________"}, requesting (but not directing) that they provide proper care and companionship.
If such person is unable or unwilling to accept custody, I give said animals to ${formData.petCaretaker2 || "__________________"}, of ${formData.petCaretaker2Address || "__________________"}.
If neither of the above-named persons accepts custody, my Executor shall select an appropriate caretaker.

B. Funds for Pet Care
I direct my Executor to deliver the sum of ${formData.petCareFunds || "------"} from my estate to the person who accepts custody of my animals, with the request (but without creating a legally binding obligation) that such funds be used solely for their care.`,
      },
      {
        title: "ARTICLE V – Nomination of Independent Executor",
        content: `I nominate ${formData.executorName || "__________________"}, of ${formData.executorAddress || "__________________"}, to serve as my Independent Executor.
If such person or entity is unable or unwilling to serve, I nominate ${formData.successorExecutorName || "__________________"}, of ${formData.successorExecutorAddress || "__________________"}, as successor Independent Executor.`,
      },
      {
        title: "ARTICLE VI – Nomination of Digital Executor",
        content: `I nominate ${formData.digitalExecutorName || "__________________"}, of ${formData.digitalExecutorAddress || "__________________"}, to serve as my Digital Executor for the purposes of administering my digital assets after my death.
If such person or entity is unable or unwilling to serve, I nominate ${formData.successorDigitalExecutorName || "__________________"}, of ${formData.successorDigitalExecutorAddress || "__________________"}, as successor Digital Executor.`,
      },
      {
        title: "ARTICLE VII – Nomination of Guardian",
        content: `If at the time of my death it becomes necessary to appoint a guardian for my minor children, I nominate ${formData.guardianName || "__________________"}, of ${formData.guardianAddress || "__________________"}, as Guardian of their persons and estates.
If such person is unable or unwilling to serve, I nominate ${formData.successorGuardianName || "__________________"}, of ${formData.successorGuardianAddress || "__________________"}, as successor Guardian.
I direct that no bond or other security shall be required for the faithful performance of the Guardian\u2019s duties.`,
      },
      {
        title: "ARTICLE VIII – Executor Powers",
        content: `A. Power to Administer Estate
I grant my Independent Executor full power and authority, without necessity of court order or approval, to:
Take possession of, collect, and manage all assets of my estate;
Pay, compromise, or settle claims and debts;
File and pay all applicable taxes;
Sell, lease, or mortgage any real or personal property;
Invest, reinvest, and manage estate assets;
Redirect mail, cancel services, and close accounts;
Establish or fund any trusts created under this Will; and
Perform all acts necessary or advisable for proper administration.

B. Independent Administration
My Executor shall administer my estate through independent or unsupervised probate to the fullest extent permitted by law.`,
      },
      {
        title: "ARTICLE IX – Digital Executor Powers",
        content: `A. Authority
My Digital Executor shall have full power and authority to manage, access, distribute, transfer, archive, or delete my digital assets, including but not limited to:
Accessing and backing up files and accounts;
Converting file formats;
Managing or disposing of devices;
Terminating accounts; and
Ensuring the permanent and secure disposition of digital assets.

B. Standard of Care
The Digital Executor shall act with prudence, discretion, and sound judgment, always prioritizing the security and intended use of my digital assets.

C. Employment of Professionals
The Digital Executor may employ attorneys, accountants, IT specialists, or other professionals as reasonably necessary, and may delegate authority when in the estate\u2019s best interest.

D. Compensation
The Digital Executor shall be entitled to reasonable compensation and reimbursement for all expenses properly incurred.

E. Duration of Powers
The powers of the Digital Executor shall continue until all digital assets are fully administered.`,
      },
      {
        title: "ARTICLE X – Special Directives",
        content: `${formData.specialDirectives || "__________________"}`,
      },
      {
        title: "ARTICLE XI – Miscellaneous Provisions",
        content: `A. Paragraph Titles and Gender
Titles are for convenience only and shall not affect interpretation. Words of any gender include all genders; singular includes plural, and vice versa.

B. Thirty-Day Survival Requirement
A beneficiary must survive me by at least thirty (30) days to inherit under this Will.

C. Common Disaster
If my spouse and I die under circumstances in which the order of death cannot be determined, I shall be deemed to have predeceased my spouse for purposes of distribution.

D. Liability of Fiduciary
No fiduciary shall be liable for acts or omissions made in good faith and without fraud or bad faith. My estate shall indemnify and hold harmless each fiduciary against any claims or expenses, except for acts involving willful misconduct.

E. Compensation
Each fiduciary named herein shall be entitled to reasonable compensation and reimbursement for properly incurred expenses.

F. Beneficiary Disputes
If a bequest is to be divided among multiple beneficiaries and they cannot agree, my Independent Executor shall have full discretion to divide the property in such manner as deemed fair and equitable.`,
      },
    ];

    for (const section of sections) {
      addText(section.title, 12, true);
      addText(section.content);
      currentY += 4;
    }

    // Signature & Witness
    addText("IN WITNESS WHEREOF, I have hereunto subscribed my name this ___ day of ________, ---.", 11);
    currentY += 10;

    addText(`Testator: ${formData.testatorName || "_________________________"}`);
    currentY += 12;

    addText("Witness Certification", 12, true);
    addText(
      `We certify that the foregoing instrument, consisting of ____ pages, was signed by ${
        formData.testatorName || "__________________"
      } (the Testator) in our presence, who declared it to be their Last Will and Testament, and we have signed as witnesses in the presence of the Testator and each other.`
    );
    currentY += 6;

    addText(`Name: ${formData.witness1Name || "_____________________________"}`);
    addText(`Address: ${formData.witness1Address || "___________________________"}`);
    addText(`City/State: ${formData.witness1CityState || "_________________________"}`);
    currentY += 8;

    addText(`Name: ${formData.witness2Name || "_____________________________"}`);
    addText(`Address: ${formData.witness2Address || "___________________________"}`);
    addText(`City/State: ${formData.witness2CityState || "_________________________"}`);

    // Save
    doc.save("last-will-and-testament.pdf");
    toast.success("Last Will and Testament PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate Last Will and Testament PDF");
  }
};


 const renderStep = () => {
  switch (currentStep) {
    case 1:
      return (
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="agreementDate">Agreement Date</Label>
            <Input
              type="date"
              id="agreementDate"
              value={formData.agreementDate}
              onChange={(e) => handleInputChange("agreementDate", e.target.value)}
            />

            <Label htmlFor="testatorName">Testator Name</Label>
            <Input
              id="testatorName"
              value={formData.testatorName}
              onChange={(e) => handleInputChange("testatorName", e.target.value)}
            />

            <Label htmlFor="testatorAddress">Testator Address</Label>
            <Textarea
              id="testatorAddress"
              value={formData.testatorAddress}
              onChange={(e) => handleInputChange("testatorAddress", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 2:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article I – Family Identification</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="spouseName">Spouse Name</Label>
            <Input
              id="spouseName"
              value={formData.spouseName}
              onChange={(e) => handleInputChange("spouseName", e.target.value)}
            />

            <Label htmlFor="childrenNames">Children Names</Label>
            <Input
              id="childrenNames"
              value={formData.childrenNames}
              onChange={(e) => handleInputChange("childrenNames", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 3:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article II – Debts and Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="debts">Debts & Expenses</Label>
            <Textarea
              id="debts"
              value={formData.debts}
              onChange={(e) => handleInputChange("debts", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 4:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article III – Disposition of Property</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="specificBequests">Specific Bequests</Label>
            <Textarea
              id="specificBequests"
              value={formData.specificBequests}
              onChange={(e) => handleInputChange("specificBequests", e.target.value)}
            />

            <Label htmlFor="digitalAssets">Digital Assets</Label>
            <Textarea
              id="digitalAssets"
              value={formData.digitalAssets}
              onChange={(e) => handleInputChange("digitalAssets", e.target.value)}
            />

            <Label htmlFor="tangiblePersonalProperty">Tangible Personal Property</Label>
            <Textarea
              id="tangiblePersonalProperty"
              value={formData.tangiblePersonalProperty}
              onChange={(e) => handleInputChange("tangiblePersonalProperty", e.target.value)}
            />

            <Label htmlFor="residuaryEstate">Residuary Estate</Label>
            <Textarea
              id="residuaryEstate"
              value={formData.residuaryEstate}
              onChange={(e) => handleInputChange("residuaryEstate", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 5:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article IV – Pet Care Directives</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="petNames">Pet Names</Label>
            <Input
              id="petNames"
              value={formData.petNames}
              onChange={(e) => handleInputChange("petNames", e.target.value)}
            />

            <Label htmlFor="petCaretaker">Primary Pet Caretaker</Label>
            <Input
              id="petCaretaker"
              value={formData.petCaretaker1}
              onChange={(e) => handleInputChange("petCaretaker1", e.target.value)}
            />

            <Label htmlFor="alternatePetCaretaker">Alternate Pet Caretaker</Label>
            <Input
              id="alternatePetCaretaker"
              value={formData.petCaretaker2}
              onChange={(e) => handleInputChange("petCaretaker2", e.target.value)}
            />

            <Label htmlFor="petFunds">Funds for Pet Care</Label>
            <Input
              id="petFunds"
              value={formData.petCareFunds}
              onChange={(e) => handleInputChange("petCareFunds", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 6:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article V – Executor Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="executorName">Executor Name</Label>
            <Input
              id="executorName"
              value={formData.executorName}
              onChange={(e) => handleInputChange("executorName", e.target.value)}
            />

            <Label htmlFor="executorAddress">Executor Address</Label>
            <Textarea
              id="executorAddress"
              value={formData.executorAddress}
              onChange={(e) => handleInputChange("executorAddress", e.target.value)}
            />

            
          </CardContent>
        </Card>
      );

    case 7:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article VI – Digital Executor Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="digitalExecutorName">Digital Executor Name</Label>
            <Input
              id="digitalExecutorName"
              value={formData.digitalExecutorName}
              onChange={(e) => handleInputChange("digitalExecutorName", e.target.value)}
            />

            <Label htmlFor="digitalExecutorAddress">Digital Executor Address</Label>
            <Textarea
              id="digitalExecutorAddress"
              value={formData.digitalExecutorAddress}
              onChange={(e) => handleInputChange("digitalExecutorAddress", e.target.value)}
            />

           
          </CardContent>
        </Card>
      );

    case 8:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article VII – Guardian Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              value={formData.guardianName}
              onChange={(e) => handleInputChange("guardianName", e.target.value)}
            />

            <Label htmlFor="guardianAddress">Guardian Address</Label>
            <Textarea
              id="guardianAddress"
              value={formData.guardianAddress}
              onChange={(e) => handleInputChange("guardianAddress", e.target.value)}
            />

           
          </CardContent>
        </Card>
      );

    case 9:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article VIII – Executor Powers</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="executorPowers">Executor Powers</Label>
            <Textarea
              id="executorPowers"
              value={formData.executorPowers}
              onChange={(e) => handleInputChange("executorPowers", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 10:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article IX – Digital Executor Powers</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="digitalExecutorPowers">Digital Executor Powers</Label>
            <Textarea
              id="digitalExecutorPowers"
              value={formData.digitalExecutorPowers}
              onChange={(e) => handleInputChange("digitalExecutorPowers", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 11:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article X – Special Directives</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="specialDirectives">Special Directives</Label>
            <Textarea
              id="specialDirectives"
              value={formData.specialDirectives}
              onChange={(e) => handleInputChange("specialDirectives", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 12:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Article XI – Miscellaneous Provisions</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="miscellaneous">Miscellaneous Provisions</Label>
            <Textarea
              id="miscellaneous"
              value={formData.miscellaneous}
              onChange={(e) => handleInputChange("miscellaneous", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    case 13:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Witness Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="witness1Name">Witness #1 Name</Label>
            <Input
              id="witness1Name"
              value={formData.witness1Name}
              onChange={(e) => handleInputChange("witness1Name", e.target.value)}
            />

            <Label htmlFor="witness1Address">Witness #1 Address</Label>
            <Textarea
              id="witness1Address"
              value={formData.witness1Address}
              onChange={(e) => handleInputChange("witness1Address", e.target.value)}
            />

            <Label htmlFor="witness1CityState">Witness #1 City/State</Label>
            <Input
              id="witness1CityState"
              value={formData.witness1CityState}
              onChange={(e) => handleInputChange("witness1CityState", e.target.value)}
            />

            <Label htmlFor="witness2Name">Witness #2 Name</Label>
            <Input
              id="witness2Name"
              value={formData.witness2Name}
              onChange={(e) => handleInputChange("witness2Name", e.target.value)}
            />

            <Label htmlFor="witness2Address">Witness #2 Address</Label>
            <Textarea
              id="witness2Address"
              value={formData.witness2Address}
              onChange={(e) => handleInputChange("witness2Address", e.target.value)}
            />

            <Label htmlFor="witness2CityState">Witness #2 City/State</Label>
            <Input
              id="witness2CityState"
              value={formData.witness2CityState}
              onChange={(e) => handleInputChange("witness2CityState", e.target.value)}
            />
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
};



  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Last Will and Testament</h1>
        <p className="text-gray-600">Create a Last Will and Testament and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 13</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 13) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 13 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF}>Generate PDF</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastWillAndTestamentForm;
