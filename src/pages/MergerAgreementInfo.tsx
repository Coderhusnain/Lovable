import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Building, BookOpen, DollarSign } from "lucide-react";
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

const MergerAgreementInfo = () => {
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
                <Building className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Merger Agreement Information</h1>
            <p className="text-lg text-gray-600">Agreement and Plan of Merger • Merger Agreement Form • Definitive Merger Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Merger Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Merger Agreement</strong> is a legally binding contract used when two companies decide to combine
                into a single business entity. Whether one company is absorbed into another or both unite to form a new
                organization, this agreement defines the structure, process, and legal framework of the merger.
              </p>

              <p className="text-gray-700">
                A properly drafted Merger Agreement outlines how one company will be dissolved into the other and whether
                the surviving entity will continue under an existing name or adopt a new one. Mergers often aim to
                strengthen market position, facilitate acquisitions, or enable restructuring for stability and growth.
              </p>

              <p className="text-gray-700">
                Using the best format of Merger Agreement ensures clarity and legal certainty throughout the transition period.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                What Does a Draft Merger Agreement Cover?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Assets & Liabilities:</strong> A complete accounting of each company’s assets and liabilities.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Valuation & Ownership:</strong> Valuation of shares and ownership interests in the new or surviving entity.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Operations During Transition:</strong> Rules governing daily business operations and limitations on new contracts during the merger process.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Governance:</strong> Procedures for forming a new board of directors and appointing its members.</p>
                </div>

                <div className="text-gray-700 mt-2">Because no two mergers are identical, a well-structured Merger Agreement helps manage integration and operational challenges.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                When Should You Use a Merger Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you intend to merge another company into your business as the surviving entity to enhance market position.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you have agreed to dissolve your business into another company through a merger.</p>
                </div>

                <div className="text-sm text-gray-600">In both cases, a written agreement is essential to protect business interests and ensure a seamless transition.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Why Use a Draft Merger Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>20,700</strong> times, reflecting its reliability and widespread use.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Manage Complexity">
                  Draft agreements help address complex integration issues and allocate risk clearly between parties.
                </InfoBadge>

                <InfoBadge icon={DollarSign} title="Clear Valuation">
                  Ensures transparent valuation methods and ownership allocations for the merged entity.
                </InfoBadge>

                <InfoBadge icon={Users} title="Governance Planning">
                  Document procedures for board formation, leadership appointments, and post-merger governance.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Merger Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Merger Agreement ideal for companies planning mergers, acquisitions, or corporate restructuring.</p>
                  <p className="text-sm text-gray-500">Prepared to support integration, governance, and regulatory compliance.</p>
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
                  <p><strong>Full Due Diligence:</strong> Conduct comprehensive audits of assets, liabilities, contracts, and compliance.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Clear Valuation:</strong> Agree on valuation methods and ownership allocations before closing.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Integration Plan:</strong> Prepare operational and technology integration plans to minimize disruption.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Legal Review:</strong> Have experienced counsel review the agreement and regulatory implications.</p>
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
                  This information is provided for educational purposes only and does not constitute legal advice. For complex mergers, regulatory reviews, or jurisdiction-specific questions, consult a qualified attorney to ensure the agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default MergerAgreementInfo;
