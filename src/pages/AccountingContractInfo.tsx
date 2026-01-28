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

const AccountingContractInfo = () => {
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accounting Contract Information</h1>
            <p className="text-lg text-gray-600">Accounting Contract • Accounting Agreement • Accountancy Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is an Accounting Contract?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                An <strong>Accounting Contract</strong> (also called an Accounting Services Agreement) is a legally binding
                document that governs the professional relationship between an accountant and a client. It defines the
                scope of services, fee structure, timelines, confidentiality obligations, compliance requirements, and
                termination terms to ensure transparency and legal certainty for both parties.
              </p>

              <p className="text-gray-700">
                This draft agreement sets expectations at the outset of the engagement and reduces the risk of disputes.
                Whether the services include bookkeeping, tax filing, payroll management, financial reporting, or advisory
                support, a properly drafted contract ensures services are delivered according to agreed terms.
              </p>

              <p className="text-gray-700">
                A clear, well-formatted accounting contract protects both accountants and clients and serves as a written
                record in case of disagreements about services or payments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                When Should You Use an Accounting Contract?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Onboarding Clients:</strong> When an accountant or firm starts working with a new client to
                    define services and responsibilities.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Personal Accounting:</strong> When an individual hires an accountant for personal tax or
                    accounting matters and wants a written agreement.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Business Engagements:</strong> When a business engages an accountant to manage financial
                    responsibilities and needs clarity and compliance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Sample Accounting Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Dynamic & Customizable">
                  This sample agreement updates its terms based on the information you provide, ensuring accuracy and
                  relevance for each engagement.
                </InfoBadge>

                <InfoBadge icon={Users} title="Proven Template">
                  Customized over <strong>978,500</strong> times, this template is a trusted starting point for
                  individuals, businesses, and accounting firms.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Professional Review">
                  For extra assurance, consult a legal professional to review the agreement before finalizing.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="eSign & Secure">
                  The document can be signed online for free through Legalgram for a fast, secure, and convenient
                  signing process.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Accounting Contract
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professionally drafted, legally sound accounting agreement you can
                  customize for individuals, startups, and established businesses.</p>
                  <p className="text-sm text-gray-500">Follows best practices for clarity, compliance, and professional accountability.</p>
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
                  <p><strong>Be Specific:</strong> Clearly state services, deliverables, timelines, and fees.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Confidentiality & Compliance:</strong> Include data protection and regulatory clauses where needed.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Payment Terms:</strong> Define fee schedules, late fees, and invoicing procedures.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Termination:</strong> Describe termination rights and any notice periods.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Keep Records:</strong> Maintain copies of the signed agreement and supporting documents.</p>
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
                  This information is for educational purposes only and does not constitute legal or tax advice. For
                  complex matters or large engagements, consult a qualified attorney or tax professional to ensure your
                  agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default AccountingContractInfo;
