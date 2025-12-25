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
  Handshake,
  Box,
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

const BusinessSaleContractInfo = () => {
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
                <Box className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Sale Contract Information</h1>
            <p className="text-lg text-gray-600">Business Sale Contract • Business Purchase Agreement • Contract for Sale of Business</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Business Sale Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Business Sale Agreement</strong> is a legally enforceable contract that sets out the complete
                terms and conditions for the sale of a business. It formally records the understanding between the buyer
                and the seller, ensuring clarity, transparency, and legal certainty.
              </p>

              <p className="text-gray-700">
                Whether you are acquiring a new business or selling an existing one, a properly drafted agreement covers
                essential elements such as purchase price, payment structure, assets and liabilities being transferred,
                and closing details. Documenting these terms minimizes risk and supports a smooth transfer of ownership.
              </p>

              <p className="text-gray-700">
                Using a professionally prepared draft Business Sale Agreement lets both parties finalize the sale with
                confidence and helps the buyer operate the business efficiently after the transaction completes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-green-600" />
                Create a Business Sale Agreement Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                With Legal Gram, you can prepare a Business Sale Agreement without drafting from scratch. Complete a few
                guided steps to generate a complete, professional, and legally sound Business Sale Contract. This streamlined
                process saves time, reduces complexity, and ensures accuracy.
              </p>

              <p className="text-gray-700">
                The Legal Gram template follows the best format for Business Sale Agreements and is suitable for both
                small and large transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                When Should You Use a Business Sale Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Negotiating a Sale:</strong> When you are negotiating the purchase or sale of a business.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Defining Key Terms:</strong> When you want to clearly define the key terms and conditions of a
                    business sale in writing.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Protect Interests:</strong> Using the best format of Business Sale Agreement protects both parties
                    and helps ensure the transaction is legally enforceable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Business Sale Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, fully customizable Business Sale Agreement ready for use by business owners, entrepreneurs, and investors.</p>
                  <p className="text-sm text-gray-500">Ideal for both small and large transactions and built following best practices.</p>
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
                  <p><strong>Be Thorough:</strong> Specify assets included, liabilities excluded, and exact closing mechanics.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Payment & Price:</strong> Clearly state purchase price, deposits, and payment schedule.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Due Diligence:</strong> Allow buyer access for inspections and confirm representations and warranties.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Transition Plan:</strong> Define post-closing support, employee transfers, and handover timelines.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Legal Review:</strong> Have a qualified attorney review the agreement before signing.</p>
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
                  This information is provided for educational purposes only and does not constitute legal advice. For
                  complex sales or large transactions, consult a qualified attorney to ensure your agreement complies with
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

export default BusinessSaleContractInfo;
