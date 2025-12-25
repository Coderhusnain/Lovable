import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Users,
  Shield,
  CheckCircle,
  Download,
  DollarSign,
  BookOpen,
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

const FeeAgreementContractInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/documents")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee Agreement Information</h1>
            <p className="text-lg text-gray-600">Fee Agreement • Form Fee Agreement • Letter Service Fee Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Fee Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Fee Agreement</strong> is a legally binding contract that defines the terms under which services
                are provided between a client and a service provider. It sets expectations about scope of work, start date,
                fee structure, and payment method so both parties understand their obligations before work begins.
              </p>

              <p className="text-gray-700">
                A well-drafted Fee Agreement may cover whether payment is a lump sum, installments, or another arrangement,
                and typically addresses termination conditions, confidentiality obligations, and any guarantees of quality or
                outcomes offered by the service provider.
              </p>

              <p className="text-gray-700">
                Using the best format of Fee Agreement reduces misunderstandings and disputes by documenting services and
                compensation in clear, enforceable language.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use a Fee Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Hiring Services:</strong> When you engage an individual or company to provide services and want
                    to clearly define terms and payment.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Contracting Work:</strong> When you are contracted by a client and need the scope of work and
                    fees documented in writing.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    In both cases, a written Fee Agreement helps protect both parties and provides a clear basis for payments
                    and deliverables.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Why Use a Draft Fee Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>10,600</strong> times, showing its reliability and practical value.
                </InfoBadge>

                <InfoBadge icon={DollarSign} title="Flexible Payment Terms">
                  Supports lump sums, installment schedules, retainers, and other commonly used fee structures.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Dispute Prevention">
                  Clear terms reduce the risk of misunderstandings and provide evidence in case of disputes.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="Legal Review Available">
                  Parties may consult a Legal Pro to review or customize the agreement for complex or high-value work.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Fee Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Fee Agreement ideal for freelancers, consultants, service providers, and businesses.</p>
                  <p className="text-sm text-gray-500">Prepared to promote transparency, accountability, and clear payment terms.</p>
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
                  <p><strong>Be Precise:</strong> Define the scope, deliverables, timelines, and acceptance criteria.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Specify Payment:</strong> State payment method, schedule, late fees, and invoicing requirements.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Termination & Refunds:</strong> Clarify how services may be terminated and any refund policies.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Confidentiality:</strong> Include data protection and non-disclosure clauses where appropriate.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Keep Records:</strong> Maintain signed agreements, receipts, and work records for accountability.</p>
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
                  This information is for educational purposes only and does not constitute legal advice. For complex
                  engagements or high-value contracts, consult a qualified attorney to ensure the agreement complies with
                  applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FeeAgreementContractInfo;
