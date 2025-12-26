import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Calendar, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfoBadge = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-lg p-4 shadow-sm ${className}`}>
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="text-gray-700 text-sm mt-1">{children}</div>
      </div>
    </div>
  </div>
);

const ContractExtensionAgreementInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/documents')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contract Extension Agreement Information</h1>
            <p className="text-lg text-gray-600">Contract Extension Agreement • Extension of Contract Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Contract Extension Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Contract Extension Agreement</strong> is a legally binding document used when the parties to an existing contract wish to continue their relationship beyond the original expiration date. Instead of drafting a new contract, this agreement extends the term while keeping other provisions in effect unless specifically amended.
              </p>

              <p className="text-gray-700">
                Using the best format of Contract Extension Agreement makes extending a contract simple and efficient. It allows the parties to move forward without interruption while maintaining legal clarity and certainty.
              </p>

              <p className="text-gray-700">
                This option is especially useful when the parties are satisfied with the existing terms or only require limited changes, such as updating the termination date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                What Should a Draft Contract Extension Agreement Include?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Effective Date:</strong> The date the extension takes effect.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Parties & Signatories:</strong> Full names, addresses, and authorized signatories of all parties.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Original Contract Info:</strong> Title and date of the original contract and the original end date.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>New Termination Date:</strong> The updated extended end date for the agreement.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Amendments:</strong> Any specific changes to the original contract provisions, clearly identified.</p>
                </div>

                <div className="text-gray-700 mt-2">For clarity, parties often attach a copy of the original contract to show changes in context.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                When Should You Use a Contract Extension Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When an existing contract is nearing expiration and the parties wish to extend the term.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When parties want to set a new termination date and make limited revisions rather than drafting a new agreement.</p>
                </div>

                <div className="text-sm text-gray-600">Using a clear extension agreement ensures the extension is enforceable and protects the interests of all parties.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Why Use a Contract Extension Agreement on Legal Gram?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Widely Used Template">
                  This agreement has been customized many times, showing its practicality for extending existing contracts.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Simple & Efficient">
                  Extending the term is faster and more cost-effective than drafting a full replacement contract in many cases.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Attach Original">
                  You can attach the original contract to clearly show any amendments and maintain a full record.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Review Available">
                  Parties may consult a Legal Pro for a review before finalizing the extension to ensure enforceability.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Contract Extension Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Contract Extension Agreement suitable for businesses, professionals, and individuals.</p>
                  <p className="text-sm text-gray-500">Free download | Draft Contract Extension Agreement | Contract Extension Agreement on Legal Gram</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={() => navigate('/documents')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Sign Online
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Be Specific:</strong> Clearly state the new termination date and any precise amendments.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Attach Originals:</strong> Include the original contract for context and record-keeping.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Legal Review:</strong> Consider a lawyer’s review for longer extensions or complex amendments.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Keep Records:</strong> Save a signed copy and any associated documents for future reference.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex extensions or jurisdiction-specific questions, consult a qualified attorney to ensure the extension complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ContractExtensionAgreementInfo;
