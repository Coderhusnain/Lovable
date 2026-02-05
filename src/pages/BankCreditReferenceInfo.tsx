import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const BankCreditReferenceInfo = () => {
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
              Request for Bank or Credit Reference
            </h1>
            <p className="text-xl text-gray-600">
              A formal request to verify an applicant’s banking or credit
              relationship
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Request for Bank or Credit Reference is a formal letter used by a
              creditor, lender, or organization to request credit-related
              information about an applicant from a bank or financial
              institution.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This request typically seeks information about:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Types of accounts maintained by the applicant</li>
                <li>• Existence of an ongoing banking relationship</li>
                <li>• General credit standing (if permitted)</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              The request is usually accompanied by the applicant’s written
              authorization allowing the release of such information.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use This Letter?
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Request for Bank or Credit Reference is commonly used when:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Reviewing a credit application</li>
                  <li>• Assessing financial reliability of an applicant</li>
                  <li>• Verifying banking relationships</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Requesting updated credit information</li>
                  <li>• Evaluating business or trade credit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of the Request
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Applicant Identification
                </h3>
                <p className="text-gray-700">
                  Clearly identifies the individual or business for whom the
                  credit reference is requested.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Authorization
                </h3>
                <p className="text-gray-700">
                  Includes confirmation that the applicant has authorized the
                  release of credit information.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Requested Information
                </h3>
                <p className="text-gray-700">
                  Specifies the type of account or relationship information
                  being requested.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Recordkeeping
                </h3>
                <p className="text-gray-700">
                  Advises retaining copies of the request and supporting
                  documents.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Use This Document
              </h2>
            </div>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter the creditor and financial institution details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Attach the applicant’s signed authorization.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Send the request and retain copies for records.</span>
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
                  ✅ Is applicant authorization required?
                </h3>
                <p className="text-green-800">
                  Yes. Written authorization is typically required before any
                  credit information can be released.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can this be used for businesses?
                </h3>
                <p className="text-blue-800">
                  Yes. It may be used for both individual and business credit
                  references.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Request a Bank or Credit Reference
            </h2>
            <p className="text-xl mb-6">
              Verify financial relationships with confidence.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/request-bankcredit-reference")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start This Document
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Professional. Clear. Legally sound.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BankCreditReferenceInfo;
