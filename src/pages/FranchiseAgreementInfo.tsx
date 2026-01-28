import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Store, BookOpen, DollarSign } from "lucide-react";
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

const FranchiseAgreementInfo = () => {
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
                <Store className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Franchise Purchase Agreement</h1>
            <p className="text-lg text-gray-600">Franchise Purchase Contract</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Franchise Purchase Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Franchise Purchase Agreement</strong> is a legally binding contract used when franchise rights are
                sold or acquired. It defines the relationship between the franchisor and the franchisee and sets out rights,
                responsibilities, and operational expectations.
              </p>

              <p className="text-gray-700">
                A properly drafted agreement covers operational standards, brand rules, and compliance requirements for
                franchisors and provides structured guidance for franchisees on how to operate the franchise consistently
                with the brand.
              </p>

              <p className="text-gray-700">
                Using the best format of Franchise Purchase Agreement reduces misunderstandings, protects business interests,
                and helps align expectations from the outset so both parties can focus on long-term success.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use a Franchise Purchase Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you own a successful business and are ready to expand by selling franchise rights.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you want to purchase and operate a franchise under an established brand.</p>
                </div>

                <div className="text-sm text-gray-600">In both cases, a written agreement is essential for defining rights, responsibilities, and operational boundaries.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Why Use a Draft Franchise Purchase Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>12,200</strong> times, demonstrating reliability and practical value.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Protect Business Interests">
                  Helps prevent misunderstandings and ensures expectations are aligned from the outset.
                </InfoBadge>

                <InfoBadge icon={DollarSign} title="Support Growth">
                  A professional draft makes it easier to manage expansion while maintaining brand consistency and control.
                </InfoBadge>

                <InfoBadge icon={BookOpen} title="Legal Review Available">
                  Because franchise relationships can be complex, parties may consult a Legal Pro to review the agreement before finalizing.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Franchise Purchase Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Franchise Purchase Agreement ideal for franchisors and franchisees.</p>
                  <p className="text-sm text-gray-500">Free download | Draft Franchise Purchase Agreement | Franchise Purchase Agreement on Legalgram</p>
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
                  <p><strong>Document Rights:</strong> Specify territorial rights, exclusivity, and duration clearly.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Clarify Payments:</strong> Define initial fees, ongoing royalties, and marketing contributions.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Operational Standards:</strong> Outline training, quality control, and reporting requirements.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Exit & Transfer:</strong> Describe transfer rules, buyouts, and early-exit procedures.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Get Legal Advice:</strong> Always have a franchise lawyer review long-term agreements before signing.</p>
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
                  This information is provided for educational purposes only and does not constitute legal advice. For complex franchising matters or jurisdiction-specific questions, consult a qualified franchise attorney to ensure the agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FranchiseAgreementInfo;
