import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;

  party1Name: string;
  party1Address: string;
  party1Short: string;

  party2Name: string;
  party2Address: string;
  party2Short: string;

  ownerName: string;

  scheduleA: string;
  scheduleB: string;

  revocationRecordingCounty: string;

  notaryState: string;
  notaryCounty: string;
  notaryDate: string;
  notaryPerson1: string;
  notaryPerson2: string;

  signParty1Name: string;
  signParty1Date: string;
  signParty2Name: string;
  signParty2Date: string;
}

export default function PrenuptialAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    party1Name: "",
    party1Address: "",
    party1Short: "",
    party2Name: "",
    party2Address: "",
    party2Short: "",
    ownerName: "",
    scheduleA: "",
    scheduleB: "",
    revocationRecordingCounty: "",
    notaryState: "",
    notaryCounty: "",
    notaryDate: "",
    notaryPerson1: "",
    notaryPerson2: "",
    signParty1Name: "",
    signParty1Date: "",
    signParty2Name: "",
    signParty2Date: "",
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

    // Helper to insert placeholder values without removing punctuation.
    const val = (field: string | undefined, fallback: string) => (field && field.trim() !== "" ? field : fallback);

    write("PRENUPTIAL AGREEMENT", 14, true, true);
    write("\n");

    // Start full text exactly as provided, substituting bracketed placeholders where appropriate.
    write(
      `This Prenuptial Agreement (the “Agreement”) is made and entered into on this ${val(
        formData.effectiveDate,
        "___ day of ________, --------"
      )}, by and between:`
    );

    write(
      `${val(formData.party1Name, "[Full Name of Party 1]")}, an adult individual residing at ${val(
        formData.party1Address,
        "_______________________, ____________________"
      )}, (hereinafter referred to as "${val(formData.party1Short, "[Short Name or Identifier]")}"), and`
    );

    write(
      `${val(formData.party2Name, "[Full Name of Party 2]")}, an adult individual residing at ${val(
        formData.party2Address,
        "_______________________, ____________________"
      )}, (hereinafter referred to as "${val(formData.party2Short, "[Short Name or Identifier]")}"),`
    );

    write(
      `in contemplation of their legal marriage to one another. This Agreement shall become effective only upon the solemnization of the marriage.`
    );

    write("\n");
    write("RECITALS", 12, true);

    write(
      `WHEREAS, the Parties contemplate entering into a lawful marriage in the immediate future;`
    );
    write(
      `WHEREAS, neither Party has previously been married;`
    );
    write(
      `WHEREAS, each Party possesses property, assets, income, and financial resources, and desires to define and protect their respective rights, obligations, and interests therein, both during the marriage and in the event of dissolution, death, or other circumstances;`
    );
    write(
      `WHEREAS, the Parties acknowledge that they have made full and fair disclosure to each other of their respective assets, liabilities, income, and financial circumstances, as set forth in Schedules A and B attached hereto;`
    );
    write(
      `NOW, THEREFORE, in consideration of the mutual promises, covenants, and agreements contained herein, and intending to be legally bound, the Parties agree as follows:`
    );

    write("\n");
    write("1. SEPARATE PROPERTY", 12, true);

    write(
      `1.1 Definition – Except as otherwise provided herein, all property now owned or hereafter acquired by either Party shall remain their separate property, including:`
    );

    write(`(a) All real or personal property, the income and proceeds therefrom, and any reinvestments thereof;`);
    write("\n");
    write(`(b) All property acquired by gift, devise, bequest, or inheritance.`);

    write(
      `1.2 Schedules of Property – The separate property currently owned by each Party is described in:`
    );
    write(`Schedule A – Property of ${val(formData.scheduleA, "[Party 1]")}`);
    write(`Schedule B – Property of ${val(formData.scheduleB, "[Party 2]")}`);
    write(
      `Such separate property shall remain under the sole and exclusive use, control, benefit, and disposition of the owning Party.`
    );

    write(`1.3 Waiver of Claims – Each Party waives any and all rights, interests, or claims in the separate property of the other, whether arising by reason of the marriage or otherwise.`);
    write(`1.4 Disposition of Property – Each Party may sell, transfer, gift, mortgage, or otherwise dispose of their separate property without consent of the other.`);
    write(
      `1.5 Community Property Exception – If the Parties reside in, or move to, a community property jurisdiction, their property rights shall nevertheless be determined in accordance with this Agreement.`
    );
    write(`1.6 Execution of Documents – Upon request, the non-owning Party shall execute any documents necessary to confirm the separate ownership of the other’s property.`);
    write(`1.7 Pension Benefits – Each Party retains sole ownership of vested and future pension, retirement, and similar benefits, and waives any interest therein.`);

    write("\n");
    write("2. RESIDENCE", 12, true);
    write(
      `The residence presently owned by ${val(formData.ownerName, "[Owner’s Name]")} and located at __________________________ shall remain unaffected by this Agreement and shall be deemed the separate property of ${val(
        formData.ownerName,
        "[Owner’s Name]"
      )}.`
    );

    write("\n");
    write("3. EARNINGS DURING MARRIAGE", 12, true);
    write(
      `All earnings, salaries, commissions, income, pensions, stock, stock options, or other benefits derived from the personal services of either Party shall be and remain the separate property of the earning Party, notwithstanding any commingling for joint expenses.`
    );

    write("\n");
    write("4. DEBTS", 12, true);
    write(`4.1 Pre-Marital Debts – Each Party shall remain solely responsible for debts incurred prior to marriage.`);
    write(`4.2 Marital Expenses – During the marriage, both Parties shall share responsibility for basic household and living expenses.`);
    write(`4.3 Credit Accounts – Each Party shall maintain separate credit accounts for personal use, if desired.`);

    write("\n");
    write("5. JOINT PROPERTY", 12, true);
    write(`Nothing herein shall prevent the Parties from jointly acquiring property during marriage or from transferring property to each other at any time, whether by gift, joint tenancy, tenancy in common, or otherwise.`);

    write("\n");
    write("6. TAXES", 12, true);
    write(`The Parties may file joint or separate tax returns in accordance with applicable law, without affecting the ownership of income or assets as defined in this Agreement.`);

    write("\n");
    write("7. DISSOLUTION OF MARRIAGE", 12, true);
    write(
      `In the event of dissolution, property shall be distributed in accordance with this Agreement, with each Party retaining their separate property and only jointly owned property being subject to division.`
    );

    write("\n");
    write("8. SPOUSAL SUPPORT WAIVER", 12, true);
    write(
      `Each Party is and shall remain self-supporting. In the event of separation or dissolution, neither Party shall seek alimony or spousal support from the other.`
    );

    write("\n");
    write("9. DISABILITY", 12, true);
    write(
      `In the event of disability, the non-disabled Party shall provide care to the extent of their earnings and assets.`
    );

    write("\n");
    write("10. DEATH", 12, true);
    write(
      `Each party agrees that if he or she survives the death of the other, such party will make no claim to any part of the real or personal property of the other. In consideration of such promise and in consideration of the contemplated marriage, each party knowingly, intentionally, and voluntarily waives and relinquishes any right of dower, curtesy, homestead, inheritance, descent, distributive share, or other statutory or legal right, now or later created, to share as surviving spouse in the distribution of the estate of the other party. The parties agree that it is their mutual intent that neither shall have or acquire any right, title, or claim in and to the real or personal property of the other by virtue of the marriage. The estate of each party in the property now owned by either of them, or acquired after the date of marriage by either of them, shall descend to or vest in his or her heirs at law, legatees, or devisees, as may be prescribed by his or her Last Will and Testament or by the laws of the state where the decedent was domiciled at the time of death, as though no marriage had taken place between them. However, the furniture, furnishings, and personal effects of each party and the personal residence shall pass to the survivor. The parties understand and agree that nothing in this Agreement shall prevent them from naming the other party as a beneficiary in his or her Last Will and Testament, life insurance policy or retirement plan, which transfer, bequest, or designation shall take precedence over any other provision of this Agreement.`
    );

    write("\n");
    write("11. REVOCATION", 12, true);
    write(
      `If the parties decide to revoke this Agreement, they shall do so in a written agreement, signed by both parties in the presence of a notary public or other official authorized to take oaths. Such revocation shall be ineffective until recorded with the recorder in the county where the parties maintain their primary residence or both counties if the parties are maintaining separate residences in separate counties.`
    );

    write("\n");
    write("12. ADDITIONAL INSTRUMENTS", 12, true);
    write(`Each Party shall execute any additional documents necessary to carry out the intent of this Agreement.`);

    write("\n");
    write("13. DISPUTE RESOLUTION", 12, true);
    write(
      `The parties will attempt to resolve any dispute arising out of or relating to this Agreement through friendly negotiations amongst the parties. If the matter is not resolved by negotiation, the parties will resolve the dispute using the below Alternative Dispute Resolution (ADR) procedure. Any controversies or disputes arising out of or relating to this Agreement will be submitted to mediation in accordance with any statutory rules of mediation. If mediation does not successfully resolve the dispute, the parties may proceed to seek an alternative form of resolution in accordance with any other rights and remedies afforded to them by law.`
    );

    write("\n");
    write("14. ATTORNEY’S FEES", 12, true);
    write(
      `In any enforcement action, the prevailing Party shall be entitled to reasonable attorney’s fees and costs, provided written notice of default is given and an opportunity to cure is allowed.`
    );

    write("\n");
    write("15. FULL DISCLOSURE", 12, true);
    write(`The Parties affirm that:`);
    write(`(a) They are of legal age and competent to contract;`);
    write(`(b) They have made full financial disclosure to each other;`);
    write(`(c) They have voluntarily entered into this Agreement.`);

    write("\n");
    write("16. MISCELLANEOUS", 12, true);
    write(`16.1 Binding Effect – This Agreement shall bind and inure to the benefit of the Parties and their heirs, executors, administrators, and assigns.`);
    write(`16.2 Entire Agreement – This document constitutes the entire agreement between the Parties.`);
    write(`16.3 Severability – If any provision is found invalid, the remainder shall remain in effect.`);

    write("\n");
    write("SIGNATURES", 12, true);
    write(`IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.`);
    write("\n");
    write(
      `${val(formData.signParty1Name, "[Party 1 Name]")} ___________________________ Date: ${val(
        formData.signParty1Date,
        "_______"
      )}`
    );
    write("\n");
    write(
      `${val(formData.signParty2Name, "[Party 2 Name]")} ___________________________ Date: ${val(
        formData.signParty2Date,
        "_______"
      )}`
    );

    write("\n");
    write("Notary Acknowledgment", 12, true);
    write(`State of ${val(formData.notaryState, "__________")}`);
    write(`County of ${val(formData.notaryCounty, "__________")}`);
    write(
      `On this ${val(formData.notaryDate, "___ day of ________, 20")}, before me, the undersigned notary public, personally appeared ${val(
        formData.notaryPerson1,
        "______________________"
      )} and ${val(formData.notaryPerson2, "______________________")}, personally known to me or satisfactorily proven to be the individuals described herein, and acknowledged that they executed this Agreement as their free act and deed.`
    );
    write("\n");
    write("Notary Public");
    write("My Commission Expires: _______");

    doc.save("Prenuptial_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Recitals</h3>
              </div>

              <Label>Agreement Date (Effective Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Party 1</h4>
              <Label>Full Name</Label>
              <Input name="party1Name" value={formData.party1Name} onChange={handleChange} />
              <Label>Address (line)</Label>
              <Textarea name="party1Address" value={formData.party1Address} onChange={handleChange} />
              <Label>Short Name / Identifier</Label>
              <Input name="party1Short" value={formData.party1Short} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Party 2</h4>
              <Label>Full Name</Label>
              <Input name="party2Name" value={formData.party2Name} onChange={handleChange} />
              <Label>Address (line)</Label>
              <Textarea name="party2Address" value={formData.party2Address} onChange={handleChange} />
              <Label>Short Name / Identifier</Label>
              <Input name="party2Short" value={formData.party2Short} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Property & Misc</h3>

              <Label>Owner's Name (for Residence clause)</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />

              <Label>Schedule A (Party 1) short description</Label>
              <Textarea name="scheduleA" value={formData.scheduleA} onChange={handleChange} />

              <Label>Schedule B (Party 2) short description</Label>
              <Textarea name="scheduleB" value={formData.scheduleB} onChange={handleChange} />

              <Label>Revocation recording county (if needed)</Label>
              <Input name="revocationRecordingCounty" value={formData.revocationRecordingCounty} onChange={handleChange} />

              <Label>Notary - State</Label>
              <Input name="notaryState" value={formData.notaryState} onChange={handleChange} />

              <Label>Notary - County</Label>
              <Input name="notaryCounty" value={formData.notaryCounty} onChange={handleChange} />

              <Label>Notary - Date (e.g. ___ day of ________, 20)</Label>
              <Input name="notaryDate" value={formData.notaryDate} onChange={handleChange} />

              <Label>Notary - Person 1 (appeared)</Label>
              <Input name="notaryPerson1" value={formData.notaryPerson1} onChange={handleChange} />
              <Label>Notary - Person 2 (appeared)</Label>
              <Input name="notaryPerson2" value={formData.notaryPerson2} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>

              <Label>Party 1 - Signatory Name</Label>
              <Input name="signParty1Name" value={formData.signParty1Name} onChange={handleChange} />
              <Label>Party 1 - Date</Label>
              <Input name="signParty1Date" value={formData.signParty1Date} onChange={handleChange} />

              <Label>Party 2 - Signatory Name</Label>
              <Input name="signParty2Name" value={formData.signParty2Name} onChange={handleChange} />
              <Label>Party 2 - Date</Label>
              <Input name="signParty2Date" value={formData.signParty2Date} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Prenuptial Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
