import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Handshake, Repeat } from "lucide-react";
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

const BarterAgreementInfo = () => {
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
                <Repeat className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Barter Agreement Information</h1>
            <p className="text-lg text-gray-600">Trade Agreement • Exchange Contract • Contra Deal Agreement • Reciprocal Exchange Agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Barter Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Barter Agreement</strong> is a legally recognized contract used when two parties agree to exchange goods,
                services, or both without using money. Instead of cash, each party provides something of value in return, and the
                agreement records the terms to make the exchange legally enforceable.
              </p>

              <p className="text-gray-700">
                A properly drafted Barter Agreement identifies what is being traded, who is responsible for delivery, the condition
                and quantity of goods, the scope of any services, and the timeframe for completion — helping avoid misunderstandings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-green-600" />
                Why Use a Draft Barter Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                While many barter transactions are informal, putting terms in writing prevents disputes. A signed Barter Agreement binds
                both parties to their promises and provides an auditable record for legal and accounting purposes.
              </p>

              <p className="text-gray-700">
                In some jurisdictions barter transactions may have tax implications — the fair market value of exchanged goods or services
                can be considered taxable income. A clear written agreement simplifies accounting and tax reporting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                When Should You Use a Barter Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you want to trade goods or services with another party without using money.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When your business exchanges inventory, services, or other value in return for work performed by a contractor.</p>
                </div>

                <div className="text-sm text-gray-600">A written Barter Agreement ensures clarity, accountability, and legal protection for both parties.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                What Does a Draft Barter Agreement Include?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Detailed description of goods or services to be exchanged</li>
                  <li>Quantities, condition, and delivery timelines</li>
                  <li>Responsibilities for packaging, shipping, or performance</li>
                  <li>Valuation method (if applicable) and tax reporting considerations</li>
                </ul>

                <p className="text-gray-700 mt-2">The agreement should also include standard legal clauses on warranties, liability, dispute resolution, and governing law.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Barter Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Barter Agreement suitable for personal and business barter transactions.</p>
                  <p className="text-sm text-gray-500">Prepared to ensure clear delivery, valuation, and tax treatment where applicable.</p>
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
                  <p><strong>Be Specific:</strong> Describe goods/services, quantities, condition, and timelines in detail.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Agree Valuation:</strong> If valuation affects tax, agree on fair market values in writing.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Plan Delivery:</strong> Clarify shipping, packaging, and acceptance procedures to avoid disputes.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Get Legal Advice:</strong> Consult counsel for tax or complex barter arrangements.</p>
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
                  This information is provided for educational purposes only and does not constitute legal or tax advice. For complex barter transactions, cross-border exchanges, or jurisdiction-specific tax rules, consult a qualified attorney or tax professional to ensure compliance and protect your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default BarterAgreementInfo;
