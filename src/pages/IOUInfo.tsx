import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const IOUInfo = () => {
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
              What Is an IOU (Acknowledgment of Debt)?
            </h1>
            <p className="text-xl text-gray-600">
              A written acknowledgment of money owed and a promise to repay
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An IOU, also known as an Acknowledgment of Debt, is a legally binding
              document in which a borrower formally recognizes owing a specific
              amount of money to a lender and agrees to repay it under defined
              terms. It serves as clear evidence of debt and repayment obligation.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                An IOU typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Principal amount owed</li>
                <li>• Repayment schedule and due date</li>
                <li>• Interest and late fee terms</li>
                <li>• Default and acceleration clauses</li>
                <li>• Signatures of borrower, lender, and guarantor (if any)</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              IOUs are commonly used for personal loans, informal lending
              arrangements, business advances, and situations where proof of
              debt is required.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use an IOU
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              An IOU should be used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Lending money informally</li>
                  <li>• Acknowledging an existing debt</li>
                  <li>• Setting clear repayment expectations</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Protecting the lender legally</li>
                  <li>• Avoiding disputes over money owed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of an IOU
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A legally enforceable IOU should include the following:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Repayment Terms
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Installment amount or lump sum</li>
                  <li>• Due date and repayment schedule</li>
                  <li>• Interest rate, if applicable</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Late Fees & Acceleration
                </h3>
                <p className="text-gray-700">
                  Late charges may apply, and unpaid balances may become
                  immediately due upon default.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Default Events
                </h3>
                <p className="text-gray-700">
                  Bankruptcy, insolvency, misrepresentation, or nonpayment
                  can trigger default.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Guaranty & Governing Law
                </h3>
                <p className="text-gray-700">
                  A guarantor may secure the debt, and the IOU specifies which
                  state’s laws apply.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create an IOU
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating an IOU with Legalgram is quick and straightforward:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter borrower and lender information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the amount owed and repayment terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Add interest, late fees, and default provisions.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and store securely.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                A written IOU protects both parties and avoids misunderstandings.
              </p>
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
                  ✅ Is an IOU legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. When properly drafted and signed, an IOU is enforceable.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can interest be charged on an IOU?
                </h3>
                <p className="text-blue-800">
                  Yes. Interest terms must be clearly stated in the document.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ What happens if the borrower defaults?
                </h3>
                <p className="text-purple-800">
                  The lender may demand immediate payment and pursue legal remedies.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Is a guarantor required?
                </h3>
                <p className="text-orange-800">
                  A guarantor is optional but adds extra protection for the lender.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your IOU
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all repayment terms.</li>
                <li>2. Ensure all parties sign and date the document.</li>
                <li>3. Provide copies to each party.</li>
                <li>4. Store the original safely.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your IOU Now
            </h2>
            <p className="text-xl mb-6">
              Acknowledge debt clearly and protect your rights.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/iou")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your IOU
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear acknowledgment. Secure repayment. Legal clarity.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default IOUInfo;
