// CohabitationAgreementForm.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, ArrowLeft, ArrowRight } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import jsPDF from "jspdf";
import UserInfoStep from "@/components/UserInfoStep";

interface FormData {
  agreementDate: string;

  party1Name: string;
  party1Address: string;

  party2Name: string;
  party2Address: string;

  // Property / Financial / Joint account
  disclosedPropertyDetails: string; // full disclosure summary
  jointBankAccount: string; // "yes"/"no"
  jointAccountContributionProportion: string; // e.g., "50/50" or "60/40"
  householdExpenseSharing: string; // e.g., "equal" or any detail

  // Support & Waivers
  waiverOfSupport: string; // short note or leave default text

  // Termination
  terminationNoticeDays: string; // default 30
  effectOfMarriage: string; // default text

  // Attorneys Fees
  attorneysFeesProvision: string;

  // Governing law
  governingState: string;

  // Notary block inputs (optional)
  notaryState: string;
  county: string;
  notaryDate: string;

  // Misc
  additionalClauses: string;
}

const CohabitationAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    party1Name: "",
    party1Address: "",
    party2Name: "",
    party2Address: "",
    disclosedPropertyDetails: "",
    jointBankAccount: "no",
    jointAccountContributionProportion: "50/50",
    householdExpenseSharing: "Equal (50/50) from joint account",
    waiverOfSupport: "All rights to maintenance, support, or rehabilitation payments are waived by the Parties.",
    terminationNoticeDays: "30",
    effectOfMarriage: "This Agreement shall terminate automatically upon marriage between the Parties or if either Party marries a third party.",
    attorneysFeesProvision: "Each Party shall bear their own attorneys' fees, court costs, and related expenses.",
    governingState: "",
    notaryState: "",
    county: "",
    notaryDate: "",
    additionalClauses: "",
  });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(selectedCountry);
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const generatePDF = async (userInfo?: { name: string; email: string; phone: string }) => {
    setIsGeneratingPDF(true);
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
            const tw = doc.getStringUnitWidth(line) * fontSize / doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += lineHeight;
        });
      };

      // Title
      addText("COHABITATION AGREEMENT", 16, true, true);
      currentY += 6;

      addText(
        `This Cohabitation Agreement (“Agreement”) is made and entered into on ${formData.agreementDate || "[Insert Date]"}, by and between ${formData.party1Name || "[Party 1 Name]"} and ${formData.party2Name || "[Party 2 Name]"} (collectively, the “Parties”), with reference to the following recitals:`
      );
      currentY += 4;

      // Recitals
      addText("RECITALS", 12, true);
      addText(
        "The Parties affirm that they are not now married to each other, have never been married to each other, and have no present intention of marrying one another."
      );
      addText(
        "The Parties desire to reside together in a conjugal, nonmarital relationship for an indefinite period of time in the future (the “Cohabitation Period”)."
      );
      addText(
        "The Parties wish to set forth in writing their mutual understanding with respect to their respective rights, obligations, and expectations regarding each other and regarding any real, personal, or mixed property—whether acquired by earnings, gift, bequest, devise, descent, or otherwise—before, during, and after the Cohabitation Period."
      );
      currentY += 4;

      addText("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:", 11);
      currentY += 4;

      // Sections
      const sections: { title: string; content: string }[] = [
        {
          title: "1. Agreement Not to Be Governed by State Laws of Marriage and Dissolution",
          content:
            "The Parties acknowledge that they would not agree to cohabit absent this Agreement. They expressly state that they do not intend their relationship to be governed, in any manner or to any extent, by the provisions of any state’s family code or similar statutory or common law relating to marriage or the dissolution thereof.",
        },
        {
          title: "2. Relationship of the Parties",
          content:
            "The Parties agree that any confidential relationship which may arise during the Cohabitation Period shall not impose upon either Party fiduciary duties toward the other, except as expressly provided in this Agreement.",
        },
        {
          title: "3. Public Recognition of Relationship",
          content:
            "Each Party shall retain and use his or her own legal name and shall not, without a written agreement signed by both Parties, adopt or use all or part of the other’s name on any documents or accounts, including bank, checking, or credit accounts. Neither Party shall hold themselves out to third parties as being married or as sharing the same surname. Any use of the other’s name or representation of being married shall not be construed as evidence of an agreement to share earnings, property, or support obligations.",
        },
        {
          title: "4. Property Acquired During the Term of Agreement",
          content:
            `Any property acquired by either Party after the effective date of this Agreement, whether by gift, bequest, devise, descent, purchase, or exchange, together with all income, rents, and profits thereof, shall be and remain the sole and separate property of the acquiring Party. ${formData.disclosedPropertyDetails ? `Disclosed: ${formData.disclosedPropertyDetails}` : ""}`,
        },
        {
          title: "5. Earnings",
          content: "All personal earnings, including salaries, commissions, and other compensation for services rendered by a Party, shall remain the separate property of that Party.",
        },
        {
          title: "6. Jointly Acquired Property",
          content:
            "Property acquired jointly shall be owned in equal undivided one-half interests unless otherwise proven by a written agreement signed by both Parties. The presumption shall be that no property is jointly acquired unless expressly documented in writing.",
        },
        {
          title: "7. Property Passing Between the Parties",
          content:
            "A transfer of property from one Party to the other shall be presumed to be a gift unless the existence of valuable consideration is evidenced by a written acknowledgment signed by both Parties.",
        },
        {
          title: "8. Property Acquired by Gift, Bequest, Devise, or Descent",
          content:
            "Property acquired by either Party by way of gift, bequest, devise, or descent shall remain that Party’s separate property unless acquired jointly, in which case it shall be owned in equal shares unless otherwise agreed in writing.",
        },
        {
          title: "9. Joint Bank Account",
          content:
            `The Parties may open a joint checking account solely for the purpose of paying mutually agreed household and living expenses. Contributions to such account shall be made on a monthly basis in agreed proportions. Joint account established: ${formData.jointBankAccount || "[yes/no]"}, Contribution proportions: ${formData.jointAccountContributionProportion || "[Insert]"} .`,
        },
        {
          title: "10. Jointly Purchased Property",
          content:
            "All jointly purchased property shall be acquired from separate funds and shall be subject to a written agreement specifying its disposition upon termination of the Parties’ relationship.",
        },
        {
          title: "11. Compensation for Services Rendered",
          content:
            "Neither Party shall assert any claim for compensation for services rendered to the other prior to the execution of this Agreement. Services provided during the relationship shall be presumed voluntary unless otherwise agreed in writing.",
        },
        {
          title: "12. Full Disclosure of Property",
          content:
            `The Parties warrant that they have fully disclosed the nature, location, and value of all real and personal property in which they have any interest. Each Party waives any right to further disclosure beyond that contained in this Agreement. ${formData.disclosedPropertyDetails ? `Disclosure summary: ${formData.disclosedPropertyDetails}` : ""}`,
        },
        {
          title: "13. Waiver of Right to Support and Other Rights",
          content:
            formData.waiverOfSupport || "Notwithstanding that either Party may have provided voluntary support during cohabitation, such conduct shall not constitute an agreement to provide support following termination of the relationship. All rights to maintenance, support, or rehabilitation payments are hereby waived, regardless of which Party initiates termination.",
        },
        {
          title: "14. Effective Date",
          content: `This Agreement shall take effect on the date first written above: ${formData.agreementDate || "[Insert Date]"}.`,
        },
        {
          title: "15. Termination",
          content:
            `This Agreement may be terminated by either Party upon ${formData.terminationNoticeDays || "30"} days’ prior written notice. Termination shall occur automatically upon marriage between the Parties or if either Party marries a third party. ${formData.effectOfMarriage || ""} Upon termination, each Party shall retain their separate property, and any jointly held property shall be divided in accordance with this Agreement or any subsequent written agreement.`,
        },
        {
          title: "16. Household Expenses and Responsibilities",
          content:
            `The Parties shall share household responsibilities and expenses as described: ${formData.householdExpenseSharing || "[Describe how expenses are shared]"}. Such expenses shall be paid from the joint account described in Section 9, if applicable.`,
        },
        {
          title: "17. General Release",
          content: "Each Party releases the other from any and all claims, demands, or causes of action relating to property, support, inheritance, or any other matter, except as expressly provided in this Agreement.",
        },
        {
          title: "18. Attorneys’ Fees",
          content: formData.attorneysFeesProvision || "In the event of litigation to enforce this Agreement, each Party shall bear their own attorneys’ fees, court costs, and related expenses, regardless of outcome.",
        },
        {
          title: "19. Consideration",
          content: "The consideration for this Agreement is the mutual promises and covenants herein contained.",
        },
        {
          title: "20. Severability",
          content:
            "If any provision of this Agreement is found to be invalid or unenforceable, the remainder shall remain in full force and effect, and any necessary modifications shall be made to render the Agreement valid.",
        },
        {
          title: "21. Execution of Documents",
          content:
            "Each Party agrees to execute and deliver such instruments and take such actions as may be reasonably necessary to carry out the provisions of this Agreement, including the transfer of title to property.",
        },
        {
          title: "22. Waiver of Breach",
          content: "A waiver of any breach shall not be deemed a waiver of any preceding or subsequent breach of the same or any other provision of this Agreement.",
        },
        {
          title: "23. Entire Agreement",
          content: "This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, understandings, or agreements, whether oral or written.",
        },
        {
          title: "24. Governing Law",
          content: `This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "[Insert State]"}.`,
        },
        {
          title: "25. Acknowledgment of Advisement of Rights",
          content:
            "The Parties acknowledge that they have entered into this Agreement voluntarily, free from duress, and with full understanding of its terms and legal consequences, having had adequate opportunity to seek independent legal advice.",
        },
      ];

      for (const section of sections) {
        if (currentY > 250) {
          doc.addPage();
          currentY = margin;
        }
        addText(section.title, 12, true);
        addText(section.content);
        currentY += 3;
      }

      // Execution block
      if (currentY > 200) {
        doc.addPage();
        currentY = margin;
      }

      addText("IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.", 11);
      currentY += 10;

      addText(`Party 1: ${formData.party1Name || "________________________"}`);
      addText(`Address: ${formData.party1Address || "________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 8;

      addText(`Party 2: ${formData.party2Name || "________________________"}`);
      addText(`Address: ${formData.party2Address || "________________________"}`);
      addText("Signature: ________________________    Date: ___________________");
      currentY += 12;

      // Notary block
      if (currentY > 200) {
        doc.addPage();
        currentY = margin;
      }

      addText("STATE OF " + (formData.notaryState || "__________") + " )", 11);
      addText("COUNTY OF " + (formData.county || "________") + " ) ss:");
      addText(
        `Subscribed and sworn before me this ${formData.notaryDate || "____"} day of ________, ______, by ${formData.party1Name || "________________"} and ${formData.party2Name || "________________"}.`
      );
      addText("Notary Public: __________________________");
      addText("My Commission Expires: _________________");
      currentY += 6;

      // Additional clauses if any
      if (formData.additionalClauses) {
        if (currentY > 220) {
          doc.addPage();
          currentY = margin;
        }
        addText("Additional Clauses", 12, true);
        addText(formData.additionalClauses);
      }

      // Save
      doc.save("cohabitation-agreement.pdf");
      toast.success("Cohabitation Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating Cohabitation PDF:", error);
      toast.error("Failed to generate Cohabitation Agreement PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Parties & Agreement Date
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agreementDate">Agreement Date</Label>
                <Input
                  id="agreementDate"
                  type="date"
                  value={formData.agreementDate}
                  onChange={(e) => handleInputChange("agreementDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="party1Name">Party 1 - Full Name</Label>
                <Input
                  id="party1Name"
                  value={formData.party1Name}
                  onChange={(e) => handleInputChange("party1Name", e.target.value)}
                  placeholder="Enter Party 1 full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="party1Address">Party 1 - Address</Label>
                <Textarea
                  id="party1Address"
                  value={formData.party1Address}
                  onChange={(e) => handleInputChange("party1Address", e.target.value)}
                  placeholder="Enter Party 1 address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="party2Name">Party 2 - Full Name</Label>
                <Input
                  id="party2Name"
                  value={formData.party2Name}
                  onChange={(e) => handleInputChange("party2Name", e.target.value)}
                  placeholder="Enter Party 2 full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="party2Address">Party 2 - Address</Label>
                <Textarea
                  id="party2Address"
                  value={formData.party2Address}
                  onChange={(e) => handleInputChange("party2Address", e.target.value)}
                  placeholder="Enter Party 2 address"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Property & Financial Disclosures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disclosedPropertyDetails">Full Disclosure of Property (nature, location, value)</Label>
                <Textarea
                  id="disclosedPropertyDetails"
                  value={formData.disclosedPropertyDetails}
                  onChange={(e) => handleInputChange("disclosedPropertyDetails", e.target.value)}
                  placeholder="Describe property interests and values (if any)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jointBankAccount">Do you want a joint bank account?</Label>
                  <Select value={formData.jointBankAccount} onValueChange={(value) => handleInputChange("jointBankAccount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jointAccountContributionProportion">Joint Account Contribution Proportions</Label>
                  <Input
                    id="jointAccountContributionProportion"
                    value={formData.jointAccountContributionProportion}
                    onChange={(e) => handleInputChange("jointAccountContributionProportion", e.target.value)}
                    placeholder="e.g., 50/50 or 60/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="householdExpenseSharing">Household Expense Sharing</Label>
                <Textarea
                  id="householdExpenseSharing"
                  value={formData.householdExpenseSharing}
                  onChange={(e) => handleInputChange("householdExpenseSharing", e.target.value)}
                  placeholder="Describe how household expenses are shared"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Rights, Waivers & Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waiverOfSupport">Waiver of Right to Support (editable)</Label>
                <Textarea
                  id="waiverOfSupport"
                  value={formData.waiverOfSupport}
                  onChange={(e) => handleInputChange("waiverOfSupport", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="terminationNoticeDays">Termination Notice Days</Label>
                  <Input
                    id="terminationNoticeDays"
                    value={formData.terminationNoticeDays}
                    onChange={(e) => handleInputChange("terminationNoticeDays", e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effectOfMarriage">Effect of Marriage (auto-termination)</Label>
                  <Input
                    id="effectOfMarriage"
                    value={formData.effectOfMarriage}
                    onChange={(e) => handleInputChange("effectOfMarriage", e.target.value)}
                    placeholder="Text explaining auto-termination upon marriage"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attorneysFeesProvision">Attorneys' Fees Provision</Label>
                <Textarea
                  id="attorneysFeesProvision"
                  value={formData.attorneysFeesProvision}
                  onChange={(e) => handleInputChange("attorneysFeesProvision", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalClauses">Any Additional Clauses</Label>
                <Textarea
                  id="additionalClauses"
                  value={formData.additionalClauses}
                  onChange={(e) => handleInputChange("additionalClauses", e.target.value)}
                  placeholder="Optional additional clauses"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Governing Law & Notary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country (for state list)</Label>
                <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="governingState">Governing State</Label>
                <Select
                  value={formData.governingState}
                  onValueChange={(value) => handleInputChange("governingState", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select governing state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.isoCode} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notaryState">Notary - State</Label>
                  <Input
                    id="notaryState"
                    value={formData.notaryState}
                    onChange={(e) => handleInputChange("notaryState", e.target.value)}
                    placeholder="State for notary block"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">Notary - County</Label>
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) => handleInputChange("county", e.target.value)}
                    placeholder="County"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notaryDate">Notary - Date</Label>
                  <Input
                    id="notaryDate"
                    value={formData.notaryDate}
                    onChange={(e) => handleInputChange("notaryDate", e.target.value)}
                    placeholder="e.g., ____ day of ________, ____"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <UserInfoStep
            onGenerate={generatePDF}
            onBack={prevStep}
            isGenerating={isGeneratingPDF}
            documentType="Cohabitation Agreement"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cohabitation Agreement</h1>
        <p className="text-gray-600">Create a Cohabitation Agreement and export as a PDF.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 5</div>
          <div className="text-sm text-gray-500">
            {currentStep === 1 && "Parties & Date"}
            {currentStep === 2 && "Property & Financial"}
            {currentStep === 3 && "Rights & Termination"}
            {currentStep === 4 && "Governing Law & Notary"}
            {currentStep === 5 && "User Information"}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {currentStep !== 5 && (
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CohabitationAgreementForm;
