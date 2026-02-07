import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const PaymentAgreementInfo = () => {
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
              What Is a Payment Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A legally binding agreement outlining loan repayment terms
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Payment Agreement is a formal legal document in which a borrower
              promises to repay a specific loan amount to a lender under agreed
              terms. It defines repayment schedules, interest, late charges, and
              remedies in the event of default, ensuring clarity and legal
              protection for both parties.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This agreement typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Loan amount and repayment schedule</li>
                <li>• Interest and late payment terms</li>
                <li>• Acceleration and default provisions</li>
                <li>• Governing law</li>
                <li>• Signatures of borrower and lender</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              A Payment Agreement serves as enforceable proof of the debt and
              helps prevent disputes by clearly defining each party’s obligations.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Payment Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Payment Agreement is commonly used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Lending or borrowing money</li>
                  <li>• Setting installment-based repayments</li>
                  <li>• Formalizing private or business loans</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Protecting lender rights in case of default</li>
                  <li>• Establishing legally enforceable terms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Elements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Elements of a Payment Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A well-drafted Payment Agreement should include the following:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Loan & Repayment Terms
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Loan amount</li>
                  <li>• Monthly installment amount</li>
                  <li>• Maturity date</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Interest & Late Charges
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Interest rate on unpaid balances</li>
                  <li>• Late payment fees</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Default & Acceleration
                </h3>
                <p className="text-gray-700">
                  Defines events of default and allows the lender to demand full
                  payment immediately.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Governing Law & Execution
                </h3>
                <p className="text-gray-700">
                  Specifies applicable law and requires signatures to make the
                  agreement enforceable.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Payment Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating a Payment Agreement is simple and secure:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter borrower and lender details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Define loan amount and repayment schedule.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Add interest, late charges, and default terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Select governing law.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    5
                  </span>
                  <span>Sign and finalize the agreement.</span>
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
                  ✅ Is a Payment Agreement legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. Once signed, it becomes legally enforceable.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can the borrower prepay the loan?
                </h3>
                <p className="text-blue-800">
                  Yes. Prepayment is allowed without penalty unless stated otherwise.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ What happens in case of default?
                </h3>
                <p className="text-purple-800">
                  The lender may accelerate the loan and recover collection costs.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can this agreement be assigned?
                </h3>
                <p className="text-orange-800">
                  Yes. Rights may be assigned to another party if properly executed.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Payment Agreement Today
            </h2>
            <p className="text-xl mb-6">
              Protect your loan with clear and enforceable repayment terms.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/payment-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Payment Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Professional. Secure. Legally binding.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentAgreementInfo;
