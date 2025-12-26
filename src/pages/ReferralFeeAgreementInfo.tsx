import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Users, Shield, CheckCircle, Download, DollarSign, Handshake } from "lucide-react";
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

const ReferralFeeAgreementInfo = () => {
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
                <Handshake className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Fee Agreement Information</h1>
            <p className="text-lg text-gray-600">Referral Fee Agreement • Real Estate Referral Fee Agreement • Business Referral Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Referral Fee Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Referral Fee Agreement</strong> is a legally binding contract used when one party is paid for referring
                clients, customers, or business opportunities to another party. It sets out the terms, payment triggers, and
                responsibilities so referrals are tracked and compensated fairly.
              </p>

              <p className="text-gray-700">
                A properly drafted agreement defines what counts as a successful referral, the amount or percentage of the
                referral fee, and when payment becomes due — helping prevent disputes and ensuring clarity for brokers,
                finders, and business partners.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                What Does a Draft Referral Fee Agreement Cover?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Successful Referral:</strong> Description of what qualifies as a successful referral or lead.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Fee Structure:</strong> Referral fee amount or commission structure and calculation method.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Payment Terms:</strong> Timeline and method for payment once a referral is deemed successful.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Responsibilities:</strong> Duties of the referring party and the receiving party (tracking, notices, and cooperation).</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Duration & Termination:</strong> Length of the referral arrangement and how it can be ended.</p>
                </div>

                <div className="text-gray-700 mt-2">Clear documentation ensures fair compensation and transparency across referral relationships.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                When Should You Use a Referral Fee Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you have contacts and wish to introduce buyers and sellers, or employers and candidates, in exchange for a fee.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When your business wants to pay brokers or referrers to generate leads or new customers.</p>
                </div>

                <div className="text-sm text-gray-600">Using a written referral agreement protects both payers and referrers and ensures enforceability.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Referral vs Finder’s Fee Agreements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                A <strong>Referral Fee Agreement</strong> is based on successful referrals that result in business, whereas a
                <strong> Finder’s Fee Agreement</strong> typically focuses on locating potential clients or investors. Choose the
                appropriate form depending on whether payment depends on a completed transaction or simply finding prospects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-indigo-600" />
                Why Use a Referral Fee Agreement on Legal Gram?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>82,400</strong> times, showing its reliability and broad use.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Reduce Disputes">
                  Detailed terms help avoid disagreements about whether referrals qualify and when fees are owed.
                </InfoBadge>

                <InfoBadge icon={Users} title="Flexible Uses">
                  Suitable for real estate, recruiting, business development, and other referral-based arrangements.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Review Available">
                  Parties may consult a Legal Pro to review or customize the agreement before finalizing.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Referral Fee Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Referral Fee Agreement ideal for brokers, consultants, and businesses relying on referrals.</p>
                  <p className="text-sm text-gray-500">Prepared to ensure clear payment triggers, timelines, and record-keeping.</p>
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
                  <p><strong>Define Success:</strong> Precisely define what qualifies as a successful referral to avoid ambiguity.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Document Payments:</strong> Use clear payment schedules and keep records of payments and reconciliations.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Limit Scope:</strong> Specify industries, territories, or types of referrals covered by the agreement.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Get Legal Advice:</strong> Seek counsel for high-value referrals or complex commission structures.</p>
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
                  This information is provided for educational purposes only and does not constitute legal advice. For complex referral arrangements, tax implications, or jurisdiction-specific rules, consult a qualified attorney to ensure the agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ReferralFeeAgreementInfo;
