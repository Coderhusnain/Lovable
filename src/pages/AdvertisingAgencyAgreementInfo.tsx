import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Megaphone, BookOpen } from "lucide-react";
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

const AdvertisingAgencyAgreementInfo = () => {
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
                <Megaphone className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertising Agency Agreement Information</h1>
            <p className="text-lg text-gray-600">Advertising Agency Agreement • Advertising Contract • Agency Service Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is an Advertising Agency Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                An <strong>Advertising Agency Agreement</strong> is a legally binding contract that defines the professional
                relationship between an advertising agency and its client. It outlines the scope of advertising and marketing
                services, timelines, fees, and responsibilities to ensure transparency and mutual understanding.
              </p>

              <p className="text-gray-700">
                A professionally prepared draft Advertising Agency Agreement is more effective than a generic template and
                helps protect both parties by documenting expectations, deliverables, and remedies in the event of disputes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use an Advertising Agency Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When an advertising or creative agency secures a client for marketing, branding, or advertising services.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When a business hires an advertising agency to manage campaigns, promotions, or media planning.</p>
                </div>

                <div className="text-sm text-gray-600">A written agreement ensures clarity, accountability, and legal protection for both sides.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Advertising Agency Agreement FAQs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <h4 className="font-semibold">Why Use a Draft Advertising Agency Agreement?</h4>
                <p>
                  A draft agreement provides a clear understanding of engagement duration, defined roles and responsibilities,
                  and transparent invoicing and payment terms. Without a written agreement, parties often face late or unpaid
                  invoices and miscommunication about scope.
                </p>

                <h4 className="font-semibold mt-3">What Should an Advertising Agency Agreement Include?</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Full name and address of the client</li>
                  <li>Detailed description of advertising and marketing services</li>
                  <li>Start date and end date of the agreement</li>
                  <li>Fees, billing terms, and payment schedule</li>
                </ul>

                <p className="mt-2">Standard clauses typically cover contractor status, dispute resolution, indemnity, and governing law. The draft can be customized to fit specific business needs.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Where Can I Create an Advertising Agency Agreement for Free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Free Templates">
                  Download professional Advertising Agency Agreement templates directly from our platform and customize them.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Save on Legal Fees">
                  Use our guided templates to avoid expensive law-firm drafting while maintaining strong legal protections.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Edit & Sign">
                  Edit, download (PDF/Word), print, and sign your agreement electronically for secure record-keeping.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Support">
                  Consult Legal Gram’s support services for a professional review if you need additional assurance.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Advertising Agency Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Advertising Agency Agreement suitable for agencies and clients.</p>
                  <p className="text-sm text-gray-500">Prepared in a legally sound format and easy to personalize.</p>
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
              <CardTitle>What Should I Do After Creating an Advertising Agency Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">After completion, access your agreement on any device — edit, download, print, and sign electronically. Share the final signed copy with your client for record-keeping.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Can a Lawyer Review My Advertising Agency Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Legal Gram provides professional review services through membership — a practical option to confirm compliance and address specific legal questions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex advertising campaigns, intellectual property issues, or jurisdiction-specific regulations, consult a qualified attorney to ensure the agreement protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default AdvertisingAgencyAgreementInfo;
