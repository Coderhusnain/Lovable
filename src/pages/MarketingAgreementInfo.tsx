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

const MarketingAgreementInfo = () => {
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Agreement Information</h1>
            <p className="text-lg text-gray-600">Marketing Agreement • Promotional Agreement • Influencer & Agency Contracts</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Marketing Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Marketing Agreement</strong> is a legally binding contract that sets out the terms of a marketing or
                promotional relationship between a business and a marketing professional or agency. It ensures alignment on
                co-promotion strategies, deliverables, timelines, compensation, and responsibilities before marketing begins.
              </p>

              <p className="text-gray-700">
                A professionally prepared Marketing Agreement provides stronger legal protection than a generic template and
                helps prevent misunderstandings related to performance, payments, or deliverables.
              </p>

              <p className="text-gray-700">
                This agreement is particularly important for brand partnerships, influencer campaigns, digital marketing, and
                promotional services where clear expectations and compliance are essential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use a Marketing Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When hiring a marketing professional or agency to promote your product or service.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you are a marketer contracted to advertise or manage a client’s campaigns or promotions.</p>
                </div>

                <div className="text-sm text-gray-600">In both cases, a written agreement ensures transparency, accountability, and legal certainty.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Why Use a Draft Marketing Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>11,100</strong> times, demonstrating its reliability and widespread use.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Clear Responsibilities">
                  Ensures roles, deliverables, and timelines are documented to avoid scope creep and disputes.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Payment & Reporting">
                  Includes invoicing schedules, payment terms, performance metrics, and reporting obligations.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Support Available">
                  Parties may consult a Legal Pro to review the draft before finalizing to reduce legal risk and ensure compliance.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                What Should a Marketing Agreement Include?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Full name and address of the client</li>
                  <li>Detailed description of marketing services and deliverables</li>
                  <li>Start date and end date of the engagement</li>
                  <li>Fees, billing terms, and performance-based compensation (if any)</li>
                </ul>

                <p className="text-gray-700 mt-2">The agreement also typically includes clauses covering contractor status, intellectual property, confidentiality, dispute resolution, and governing law. Customize the draft to suit campaign specifics and business needs.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Marketing Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Marketing Agreement ideal for businesses, agencies, influencers, and consultants.</p>
                  <p className="text-sm text-gray-500">Prepared to ensure clear deliverables, payment terms, and compliance.</p>
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
              <CardTitle>What Should I Do After Creating a Marketing Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">After completion, access your agreement on any device — edit, download (PDF/Word), print, and sign electronically. Share the final signed copy with your client for record-keeping and legal certainty.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Can a Lawyer Review My Marketing Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Legalgram’s professional review services are available via membership — a practical option to confirm compliance and address specific legal questions before signing.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex campaigns, intellectual property concerns, or jurisdiction-specific issues, consult a qualified attorney to ensure the agreement protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default MarketingAgreementInfo;
