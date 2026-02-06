import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const RequestCreditReferenceInfo = () => {
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
              What Is a Request for a Credit Reference?
            </h1>
            <p className="text-xl text-gray-600">
              A formal letter requesting a positive credit reference for your account
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Request for a Credit Reference is a formal letter used to ask a
              creditor, bank, or financial institution to provide a positive credit
              reference on your behalf. This reference is usually sent to another
              organization to support applications for loans, leases, or business
              relationships.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This letter typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Your name and account information</li>
                <li>• Details of the organization receiving the reference</li>
                <li>• Request for a positive credit reference</li>
                <li>• Request for a copy for personal records</li>
                <li>• Signature of the account holder</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document creates a clear written record of your request and
              ensures professional communication with financial institutions.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Request for a Credit Reference
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This letter is commonly used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Applying for a loan or credit facility</li>
                  <li>• Leasing property or equipment</li>
                  <li>• Establishing a new business relationship</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Following up on a prior credit reference request</li>
                  <li>• Requesting a reference for another organization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Elements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Elements of This Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A properly written Request for a Credit Reference should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Sender Information
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Name and address</li>
                  <li>• Account number</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Reference Recipient Details
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Name of organization</li>
                  <li>• Address and contact details</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Credit Reference Request
                </h3>
                <p className="text-gray-700">
                  A clear request for a positive credit reference to be issued.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Signature & Records
                </h3>
                <p className="text-gray-700">
                  Signed by the account holder with a copy retained for records.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Request for a Credit Reference
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating this letter is quick and straightforward:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter your personal and account information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Specify who should receive the credit reference.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Request a copy for your personal records.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Review the letter for accuracy.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    5
                  </span>
                  <span>Sign and send the letter.</span>
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
                  ✅ Do I need to sign this letter?
                </h3>
                <p className="text-green-800">
                  Yes. Signing the letter makes it formal and legally valid.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Should I keep a copy?
                </h3>
                <p className="text-blue-800">
                  Yes. Always retain a copy for your personal records.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Can I send this to multiple organizations?
                </h3>
                <p className="text-purple-800">
                  Yes. You may send follow-up letters to additional recipients.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Is this letter legally recognized?
                </h3>
                <p className="text-orange-800">
                  Yes. It serves as a formal written credit reference request.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Request Your Credit Reference Today
            </h2>
            <p className="text-xl mb-6">
              Make your credit requests professional and well-documented.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/request-credit-reference")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Credit Reference Request
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear. Formal. Reliable.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default RequestCreditReferenceInfo;
