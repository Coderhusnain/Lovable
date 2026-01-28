import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  CheckCircle,
  Download,
  Server,
  BookOpen,
  DollarSign,
} from "lucide-react";
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

const ITServiceAgreementInfo = () => {
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">IT Service Agreement Information</h1>
            <p className="text-lg text-gray-600">IT Service Contract • IT Support Contract</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is an IT Service Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                An <strong>IT Service Agreement</strong> is a legally binding contract that defines the terms under which
                information technology services are provided by a service provider to a client. It outlines scope of services,
                service levels, roles and responsibilities, pricing, payment terms, confidentiality, termination rights, and
                legal compliance.
              </p>

              <p className="text-gray-700">
                A well-drafted IT Service Agreement reduces the risk of disputes by protecting both parties and ensuring
                operational clarity—especially important when third-party IT professionals manage critical business systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use an IT Service Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you provide IT products or IT-related services to another business.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you hire an IT provider for a project at your home or business.</p>
                </div>

                <div className="text-sm text-gray-600">In both cases, a written agreement defines expectations and prevents misunderstandings.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Should Every IT Provider Use a Draft IT Service Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Yes. Regardless of project size, an IT Service Agreement is recommended for all IT professionals and service
                providers. It clarifies responsibilities, engagement duration, and payment terms, reducing the risk of
                disputes like underpayment or missed deadlines.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-sky-600" />
                What Does a Draft IT Service Agreement Include?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>The client’s full name and address</li>
                  <li>Detailed description of the IT services to be provided</li>
                  <li>Service start date and end date</li>
                  <li>Fees, billing method, and payment due dates</li>
                </ul>

                <p className="text-gray-700 mt-2">The agreement also includes standard legal clauses covering contractor status, confidentiality, dispute resolution, and governing law, and can be customized for specific projects.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                Where Can I Download an IT Service Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Ready-Made Template">
                  Download professionally drafted, easy-to-customize IT Service Agreement templates directly from our website.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Edit & Sign">
                  Templates can be edited, printed, and signed online for convenience and compliance.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Accessible Anywhere">
                  Once completed, access your agreement on any device — download as PDF/Word, print, and save for records.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Support Available">
                  With the appropriate membership, request a professional review or legal guidance for your IT Service Agreement.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download IT Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable IT Service Agreement ideal for IT consultants, service providers, and businesses.</p>
                  <p className="text-sm text-gray-500">Prepared to ensure operational clarity, legal protection, and smooth project delivery.</p>
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
              <CardTitle>What Happens After Creating an IT Service Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">After completion, you can edit, download (PDF or Word), print, and sign the agreement electronically. Always share a final signed copy with your client for record-keeping.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Can a Lawyer Review My IT Service Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Professional legal review is available through Legalgram’s services — a practical option to confirm compliance and address specific legal questions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex IT engagements or jurisdiction-specific issues, consult a qualified attorney to ensure your agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ITServiceAgreementInfo;
