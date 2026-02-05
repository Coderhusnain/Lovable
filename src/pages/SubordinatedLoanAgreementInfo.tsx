import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Layers,
} from "lucide-react";

const SubordinatedLoanAgreementInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
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
              What Is a Subordinated Loan Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A contract defining priority between senior and junior creditors
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Subordinated Loan Agreement is a legally binding agreement among
              a borrower, a senior creditor, and a junior creditor that
              establishes the priority of repayment. Under this agreement, the
              junior creditor agrees that its loan will be repaid only after the
              senior debt has been paid in full.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This agreement primarily governs:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Priority of payment</li>
                <li>• Enforcement restrictions on junior debt</li>
                <li>• Subordination of liens and security interests</li>
                <li>• Bankruptcy and insolvency treatment</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Subordinated loan agreements are common in structured finance,
              mezzanine lending, and multi-creditor transactions.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use This Agreement?
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              A Subordinated Loan Agreement is appropriate in situations such as:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Multiple lenders to the same borrower</li>
                  <li>• Senior and mezzanine financing structures</li>
                  <li>• Venture or private equity-backed loans</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Refinancing existing debt</li>
                  <li>• Formalizing creditor priority</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components */}
          <section>
            <div className="flex items-center mb-4">
              <Layers className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Subordinated Loan Agreement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Senior & Junior Debt Definitions
                </h3>
                <p className="text-gray-700">
                  Clearly defines which obligations are senior and which are
                  subordinated.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Payment Subordination
                </h3>
                <p className="text-gray-700">
                  Prohibits payment of junior debt until senior debt is fully
                  paid.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Standstill & Enforcement Limits
                </h3>
                <p className="text-gray-700">
                  Restricts junior creditor actions during senior defaults.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Bankruptcy & Lien Subordination
                </h3>
                <p className="text-gray-700">
                  Addresses insolvency proceedings and lien priority.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How a Subordinated Loan Agreement Works
              </h2>
            </div>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Borrower incurs both senior and junior debt.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>
                    Junior creditor agrees to subordinate repayment and liens.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>
                    Senior creditor retains priority in payments and remedies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>
                    Agreement governs actions in default or bankruptcy.
                  </span>
                </li>
              </ol>
            </div>
          </section>

          {/* FAQ */}
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
                  ✅ Is this agreement enforceable in bankruptcy?
                </h3>
                <p className="text-green-800">
                  Yes. Properly drafted subordination provisions are generally
                  enforced in bankruptcy proceedings.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can the junior creditor ever get paid?
                </h3>
                <p className="text-blue-800">
                  Yes—but only after the senior debt has been paid in full, or
                  as expressly permitted under the agreement.
                </p>
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist Before Signing
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Confirm definitions of senior and junior debt</li>
                <li>• Review standstill and enforcement restrictions</li>
                <li>• Verify lien subordination language</li>
                <li>• Ensure all parties execute the agreement</li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create a Subordinated Loan Agreement
            </h2>
            <p className="text-xl mb-6">
              Clearly define creditor priority and reduce risk.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/subordinated-loan-agreement")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Subordinated Loan Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear priority. Strong protection.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SubordinatedLoanAgreementInfo;
