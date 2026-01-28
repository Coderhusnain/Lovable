import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Clipboard, BookOpen } from "lucide-react";
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

const AdministrativeServicesAgreementInfo = () => {
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
                <Clipboard className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrative Services Agreement Information</h1>
            <p className="text-lg text-gray-600">Administrative Services Agreement • Administrative Services Contract</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is an Administrative Services Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                An <strong>Administrative Services Agreement</strong> is a legally binding contract that governs the
                provision of administrative services between an administrative professional and a client. It defines the
                scope of services, duties, timelines, and payment terms so both parties have clear expectations from the start.
              </p>

              <p className="text-gray-700">
                Compared to a simple administrative assistant template, a properly drafted Administrative Services Agreement
                provides stronger legal protection and reduces the risk of disputes by documenting obligations and remedies.
              </p>

              <p className="text-gray-700">
                Using the best format of Administrative Services Agreement ensures clarity, professionalism, and enforceability
                throughout the engagement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use an Administrative Services Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you provide administrative services to a company as an independent contractor.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you hire an independent contractor to perform administrative or back-office services.</p>
                </div>

                <div className="text-sm text-gray-600">In both situations, a written agreement defines responsibilities and protects both parties.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Do Administrative Professionals Need an Administrative Services Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Yes. Even if administrative services are part-time or occasional, documenting the arrangement prevents
                misunderstandings and provides benefits such as defined roles, transparent payment structures, and certainty
                about engagement duration.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-sky-600" />
                What Should a Draft Administrative Services Agreement Include?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Full contact information of the client</li>
                  <li>Clear description of the administrative services to be provided</li>
                  <li>Start date and end date of the engagement</li>
                  <li>Agreed fees, payment method, and payment schedule</li>
                </ul>

                <p className="text-gray-700 mt-2">Standard clauses typically include independent contractor status, confidentiality, dispute resolution, indemnification, and limitation of liability. You can also choose governing jurisdiction and further customize the agreement as needed.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clipboard className="w-5 h-5 mr-2 text-indigo-600" />
                Where Can I Create an Administrative Services Agreement for Free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Step-by-Step Template">
                  Download templates and follow guided steps to complete a professional Administrative Services Agreement without drafting from scratch.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Save on Legal Fees">
                  Our template saves time and legal expense while providing a high level of customization and legal validity.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Edit & Sign">
                  Edit the agreement, download as PDF/Word, print, and sign electronically for secure record-keeping.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Support">
                  If needed, consult a legal professional or Legalgram membership to request a document review.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Administrative Services Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Administrative Services Agreement ready for use by administrative professionals and businesses.</p>
                  <p className="text-sm text-gray-500">Prepared in a legally sound format and guided for easy completion.</p>
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
              <CardTitle>What Should I Do After Creating My Administrative Services Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Once finalized, edit, download, print, and sign the agreement electronically. Share a final signed copy with the client for record-keeping and future reference.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Can a Lawyer Review My Administrative Services Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Legalgram offers paid legal support services for document review. With membership, you can request a professional review to confirm compliance and address specific questions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex engagements or jurisdiction-specific questions, consult a qualified attorney to ensure your agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default AdministrativeServicesAgreementInfo;
