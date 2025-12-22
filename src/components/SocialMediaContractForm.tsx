import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  
  companyName: string;
  companyLocation: string;
  scopeApplicability: string;
  approvalProcess: string;
  blockingPolicy: string;
  bloggingGuidelines: string;
  onlineSocialNetworking: string;
  socialVideo: string;
  forumsPolicy: string;
  reviewAmendment: string;
  violations: string;
  confidentiality: string;
  ownership: string;
  transparency: string;
  discrimination: string;
  companySignName: string;
  companySignTitle: string;
  companySignDate: string;
  employeeSignName: string;
  employeeSignDate: string;
}

export default function SocialMediaContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    companyName: "",
    companyLocation: "",
    scopeApplicability: "",
    approvalProcess: "",
    blockingPolicy: "",
    bloggingGuidelines: "",
    onlineSocialNetworking: "",
    socialVideo: "",
    forumsPolicy: "",
    reviewAmendment: "",
    violations: "",
    confidentiality: "",
    ownership: "",
    transparency: "",
    discrimination: "",
    companySignName: "",
    companySignTitle: "",
    companySignDate: "",
    employeeSignName: "",
    employeeSignDate: "",
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
      if (text === undefined || text === null) text = "";
      if (text.trim() === "") {
        y += size * 0.8;
        return;
      }
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

    // Verbatim Social Media Contract text with substituted fields where appropriate
    write("SOCIAL MEDIA CONTRACT", 14, true, true);
    write("This Social Media Contract (\u201cContract\u201d) has been adopted by " + (formData.companyName || "___") + " (\u201cCompany\u201d) of " + (formData.companyLocation || "___, ___, ___") + ", to optimize employee social media interaction in a manner that conforms with the Company\u2019s policies and enhances professional communication, sharing, and collaboration with a wider audience.");

    write("Social media, which should be broadly understood for purposes of this Contract, includes, without limitation, multimedia, social networking websites, user rating services, blogs, microblogs, wikis, chat rooms, electronic newsletters, or online forums for both professional and personal use, and other sites and services that permit users to share information with others.");

    write("These guidelines are intended to assist employees with making appropriate decisions when engaging with social media tools. Employees should become familiar with any applicable employee policies and employee handbooks in conjunction with this Contract.");

    write("\n");
    write("1. SCOPE AND APPLICABILITY", 12, true);
    write("This Contract applies to all of the Company\u2019s employees, contractors, and personnel acting in an official capacity on behalf of the Company when using social media for business purposes on the Company\u2019s internal \u201cIntranet\u201d (if applicable) or Internet.");
    write("These policies apply only to work-related sites, issues, and interactions and are not intended to infringe upon personal online interaction outside of work.");
    write((formData.scopeApplicability && formData.scopeApplicability + "") || "The Company acknowledges that protected speech cannot be censored; however, legally protected activity does not include personal complaints or offensive, demeaning, defamatory, abusive, or inappropriate remarks that may create a hostile work environment. The Company reserves the right to request that certain subjects be avoided and that certain posts be deleted if deemed inappropriate.");

    write("\n");
    write("2. GENERAL POLICIES", 12, true);
    write("2.1 Approval");
    write((formData.approvalProcess && formData.approvalProcess + "") || "Before beginning any social media project, employees must obtain approval from the appropriate Company agent(s) to use social media, social networking, or related services or tools to directly support or enhance activities undertaken in an official capacity by the Company.");

    write("\n");
    write("2.2 Policy on Blocking Social Media Sites");
    write((formData.blockingPolicy && formData.blockingPolicy + "") || "The Company has chosen not to block social media sites. Employees accessing such sites are solely accountable for their actions online and should remain aware of potential security risks while using good judgment.");

    write("\n");
    write("3. CODE OF CONDUCT", 12, true);
    write("3.1 Blogging");
    write((formData.bloggingGuidelines && formData.bloggingGuidelines + "") || "Company-related blogs may be created or maintained only with permission from appropriate managers or supervisors. Personal blogs may not be worked on during business hours.");
    write("Employees should:");
    write("• provide worthwhile information and perspective,");
    write("• engage in appropriate discussions,");
    write("• include links to relevant blogs, articles, or posts.");
    write("Employees commenting on any aspect of the Company must clearly identify themselves and include a disclaimer that their views are personal and not the views of the Company.");
    write("Company logos or trademarks may not be used unless permission is granted. Confidentiality requirements apply to all posts. Employees should consult supervisors if unsure whether content is appropriate.");

    write("\n");
    write("3.2 Online Social Networking");
    write((formData.onlineSocialNetworking && formData.onlineSocialNetworking + "") || "The Company maintains a presence on social networking sites to provide information, build contacts, and foster open dialogue. Employees authorized to post on behalf of the Company will be identified as ___.");
    write("Personal social networking may be accessed during business hours only for professional purposes and only if it does not interfere with duties or productivity.");

    write("\n");
    write("3.4 Social Video (YouTube)");
    write((formData.socialVideo && formData.socialVideo + "") || "The Company is not currently active on social video sites.");

    write("\n");
    write("3.5 Online Forums and Discussion Boards");
    write((formData.forumsPolicy && formData.forumsPolicy + "") || "Employees may not discuss non-public information in any online forum, including those with privacy controls. Disclosure of sensitive, proprietary, or classified information is prohibited. Violations may result in disciplinary action.");

    write("\n");
    write("4. REVIEWING AND AMENDING THE TERMS", 12, true);
    write((formData.reviewAmendment && formData.reviewAmendment + "") || "The proper Company agents may review this Contract periodically. The Company may revise and update this Contract to account for new or evolving social media platforms and trends that may affect the Company.");

    write("\n");
    write("5. VIOLATIONS", 12, true);
    write((formData.violations && formData.violations + "") || "Any employee who violates this Contract may face disciplinary action, including termination, regardless of whether a law was violated. Employees are personally responsible and legally liable for the content they publish online.");
    write("Employees may be sued for:");
    write("• failing to disclose their relationship with the Company,");
    write("• knowingly spreading false information,");
    write("• posting defamatory, pornographic, proprietary, harassing, libelous, or hostile content.");

    write("\n");
    write("6. CONFIDENTIALITY", 12, true);
    write((formData.confidentiality && formData.confidentiality + "") || "Employees must not disclose confidential or proprietary information belonging to the Company or to third parties. Information designated \u201cInternal Use Only\u201d or intended solely for internal consumption must not be shared on social media.");
    write("Confidential information includes, but is not limited to:");
    write("• business strategies,");
    write("• trademarks,");
    write("• upcoming product releases,");
    write("• sales or financial information,");
    write("• workforce size,");
    write("• any non-public information.");
    write("Employees must:");
    write("• identify copyrighted materials,");
    write("• obtain posting permission when needed,");
    write("• give credit to original authors.");

    write("\n");
    write("7. OWNERSHIP", 12, true);
    write((formData.ownership && formData.ownership + "") || "Employees must distinguish between content belonging to the Company and content belonging to the employee.");
    write("• Posts created during nonworking hours unrelated to the Company typically belong to the employee.");
    write("• Employees may \u201cquote\u201d or \u201crepost,\u201d but may not represent others\u2019 work as their own.");
    write("• Copyright, privacy, and other offline laws apply online.");
    write("Any social media contacts, including \u201cfollowers\u201d or \u201cfriends,\u201d acquired through accounts created on behalf of the Company are the property of the Company.");

    write("\n");
    write("8. TRANSPARENCY AND DISCLOSURES", 12, true);
    write((formData.transparency && formData.transparency + "") || "Employees publicly sharing information about clients, partners, or other organizations must disclose their relationship with such parties.");
    write("Employees may not discuss organizations or products online in exchange for money.");
    write("Employees receiving products or services for review must disclose the benefit received.");

    write("\n");
    write("9. ONLINE DISCRIMINATION AND HARASSMENT", 12, true);
    write((formData.discrimination && formData.discrimination + "") || "The Company prohibits all forms of online discrimination or harassment, including conduct based on race, creed, religion, color, age, disability, pregnancy, marital status, parental status, veteran or military status, domestic violence victim status, national origin, political affiliation, sex, genetic characteristics, or any other legally protected status.");
    write("This list is not exhaustive. Local laws may provide additional protections.");

    write("\n");
    write("10. SIGNATORIES", 12, true);
    write("IN WITNESS WHEREOF, the parties have executed this Social Media Contract as of the dates set forth below.");
    write("For the Company:");
    write(`Name: ${formData.companySignName || "___________________________"}`);
    write(`Title: ${formData.companySignTitle || "____________________________"}`);
    write(`Date: ${formData.companySignDate || "____________________________"}`);
    write("For the Employee:");
    write(`Name: ${formData.employeeSignName || "___________________________"}`);
    write(`Date: ${formData.employeeSignDate || "____________________________"}`);

    doc.save("Social_Media_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Commencement & Parties</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Company Name</Label>
              <Input name="companyName" value={formData.companyName} onChange={handleChange} />
              <Label>Company Location (city, state, country)</Label>
              <Input name="companyLocation" value={formData.companyLocation} onChange={handleChange} />

              <Label className="pt-2">Scope & Applicability (override)</Label>
              <Textarea name="scopeApplicability" value={formData.scopeApplicability} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Policies & Code of Conduct</h3>
              <Label>Approval Process</Label>
              <Textarea name="approvalProcess" value={formData.approvalProcess} onChange={handleChange} />

              <Label className="pt-2">Blocking Policy</Label>
              <Textarea name="blockingPolicy" value={formData.blockingPolicy} onChange={handleChange} />

              <Label className="pt-2">Blogging Guidelines</Label>
              <Textarea name="bloggingGuidelines" value={formData.bloggingGuidelines} onChange={handleChange} />

              <Label className="pt-2">Online Social Networking</Label>
              <Textarea name="onlineSocialNetworking" value={formData.onlineSocialNetworking} onChange={handleChange} />

              <Label className="pt-2">Social Video (YouTube)</Label>
              <Textarea name="socialVideo" value={formData.socialVideo} onChange={handleChange} />

              <Label className="pt-2">Forums & Discussion Boards</Label>
              <Textarea name="forumsPolicy" value={formData.forumsPolicy} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Review, Violations & Confidentiality</h3>
              <Label>Reviewing & Amendment Notes</Label>
              <Textarea name="reviewAmendment" value={formData.reviewAmendment} onChange={handleChange} />

              <Label className="pt-2">Violations (override)</Label>
              <Textarea name="violations" value={formData.violations} onChange={handleChange} />

              <Label className="pt-2">Confidentiality</Label>
              <Textarea name="confidentiality" value={formData.confidentiality} onChange={handleChange} />

              <Label className="pt-2">Ownership</Label>
              <Textarea name="ownership" value={formData.ownership} onChange={handleChange} />

              <Label className="pt-2">Transparency & Disclosures</Label>
              <Textarea name="transparency" value={formData.transparency} onChange={handleChange} />

              <Label className="pt-2">Online Discrimination & Harassment</Label>
              <Textarea name="discrimination" value={formData.discrimination} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatories</h3>
              <Label>Company Signatory - Name</Label>
              <Input name="companySignName" value={formData.companySignName} onChange={handleChange} />
              <Label>Company Signatory - Title</Label>
              <Input name="companySignTitle" value={formData.companySignTitle} onChange={handleChange} />
              <Label>Company Signatory - Date</Label>
              <Input type="date" name="companySignDate" value={formData.companySignDate} onChange={handleChange} />

              <hr />

              <Label>Employee Signatory - Name</Label>
              <Input name="employeeSignName" value={formData.employeeSignName} onChange={handleChange} />
              <Label>Employee Signatory - Date</Label>
              <Input type="date" name="employeeSignDate" value={formData.employeeSignDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Social Media Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
