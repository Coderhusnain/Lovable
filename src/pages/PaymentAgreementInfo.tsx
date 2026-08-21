import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, FileText, Lock } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const PaymentAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = documentContent["Payment Agreement"] || documentContent["default"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What You Need
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Protections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-lg border border-pink-200">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-pink-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-pink-700">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 flex gap-4">
            <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Legal Information</h3>
              <p className="text-blue-800 text-sm">
                A Payment Agreement is an important financial document that protects both borrowers and lenders. Requirements and best practices vary by jurisdiction and loan type. This template is designed as a general reference. For high-value loans, complex financial arrangements, or jurisdiction-specific concerns, consult with a qualified attorney to ensure the agreement complies with applicable laws, accurately reflects your repayment terms, and includes all necessary provisions for your specific situation.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/payment-agreement")}
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white px-8 py-3"
            >
              Download Payment Agreement
            </Button>
            <p className="text-sm text-gray-500">
              Estimated time: {doc.estimatedTime}
            </p>
          </div>
        </div>
      </div>
    </Layout>
};

export default PaymentAgreementInfo;
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
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
