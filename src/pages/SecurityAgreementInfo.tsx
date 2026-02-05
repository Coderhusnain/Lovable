import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const SecurityAgreementInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              What Is a Security Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A legal document granting a security interest in collateral
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Security Agreement is a legally binding contract between a debtor
              and a secured party in which the debtor grants a security interest
              in specific assets (collateral) to secure repayment of a debt or
              performance of obligations.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Security Agreement typically covers:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• The underlying debt or obligation</li>
                <li>• Description of collateral</li>
                <li>• Rights and duties of both parties</li>
                <li>• Default and enforcement provisions</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Security Agreements are commonly used in commercial lending,
              business financing, and secured personal loans.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use a Security Agreement?
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              A Security Agreement should be used in the following situations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Lending money secured by assets</li>
                  <li>• Financing business equipment or inventory</li>
                  <li>• Securing repayment of a promissory note</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Reducing lender risk</li>
                  <li>• Formalizing collateral obligations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Security Agreement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Secured Obligations
                </h3>
                <p className="text-gray-700">
                  Identifies the debt or obligations secured by the agreement.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Description of Collateral
                </h3>
                <p className="text-gray-700">
                  Clearly defines the assets subject to the security interest.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Warranties & Covenants
                </h3>
                <p className="text-gray-700">
                  Sets out promises regarding maintenance, insurance, and use
                  of collateral.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Default & Remedies
                </h3>
                <p className="text-gray-700">
                  Explains what constitutes default and the secured party’s
                  rights upon default.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Security Agreement
              </h2>
            </div>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Identify the debtor and secured party.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Describe the secured obligations and collateral.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Define default, remedies, and governing law.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Execute the agreement and retain signed copies.</span>
                </li>
              </ol>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  ✅ Is a Security Agreement legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. Once executed, it creates enforceable rights in the
                  collateral under applicable law.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ What happens if the debtor defaults?
                </h3>
                <p className="text-blue-800">
                  The secured party may enforce its rights against the
                  collateral as permitted by law.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist Before Signing
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Verify accuracy of collateral description</li>
                <li>• Confirm governing law and notice addresses</li>
                <li>• Ensure authorized signatures</li>
                <li>• Retain executed copies securely</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Security Agreement
            </h2>
            <p className="text-xl mb-6">
              Secure obligations clearly and protect your interests.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/security-agreement-info")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Security Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear collateral. Strong protection.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityAgreementInfo;
