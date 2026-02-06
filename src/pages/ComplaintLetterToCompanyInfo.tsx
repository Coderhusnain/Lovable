import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const ComplaintLetterToCompanyInfo = () => {
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
              What Is a Complaint Letter to a Company Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A formal document to raise product or service complaints professionally
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Complaint Letter to a Company Agreement is a formal document used to
              report issues related to a product or service. It allows consumers to
              clearly describe the problem, request a resolution, and maintain a
              professional, legally recognized record of communication.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This agreement typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Company and customer details</li>
                <li>• Description of the issue or complaint</li>
                <li>• Relevant dates and reference numbers</li>
                <li>• Requested resolution (refund, replacement, correction)</li>
                <li>• Supporting documents or evidence</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document helps ensure your complaint reaches the appropriate
              authority and is handled seriously.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Complaint Letter to a Company
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This agreement is useful in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Poor or unsatisfactory service</li>
                  <li>• Defective or damaged products</li>
                  <li>• Unresolved customer support issues</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Requesting refunds or replacements</li>
                  <li>• Escalating complaints to higher management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Elements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Elements of This Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A well-drafted Complaint Letter should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Customer & Company Information
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Names and contact details</li>
                  <li>• Company department or office</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Complaint Details
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Product or service description</li>
                  <li>• Date of purchase or service</li>
                  <li>• Clear explanation of the issue</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Requested Resolution
                </h3>
                <p className="text-gray-700">
                  Refund, replacement, repair, or corrective action.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Documentation & Signature
                </h3>
                <p className="text-gray-700">
                  Attach evidence and sign the letter for authenticity.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Complaint Letter to a Company
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating this document with Legalgram is simple:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter your details and company information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Describe the issue clearly and accurately.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Specify the resolution you are requesting.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Attach supporting documents if available.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    5
                  </span>
                  <span>Download and send the letter.</span>
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
                  ✅ Do I need a lawyer to create this letter?
                </h3>
                <p className="text-green-800">
                  No. You can draft and use this document without legal assistance.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Who should receive this letter?
                </h3>
                <p className="text-blue-800">
                  Company management, headquarters, or consumer affairs office.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Is this document legally recognized?
                </h3>
                <p className="text-purple-800">
                  Yes. It provides a formal and documented complaint record.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can I download this letter?
                </h3>
                <p className="text-orange-800">
                  Yes. It can be downloaded in PDF or Word format.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Complaint Letter Today
            </h2>
            <p className="text-xl mb-6">
              Raise your concerns professionally and protect your consumer rights.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/complaint-letter-to-company")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Complaint Letter
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Professional. Clear. Effective.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ComplaintLetterToCompanyInfo;
