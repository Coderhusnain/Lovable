import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const DirectMailAdvertisingInfo = () => {
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
              What Is a Direct Mail Advertising Request?
            </h1>
            <p className="text-xl text-gray-600">
              A formal request to receive promotional and advertising materials by mail
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Direct Mail Advertising Request is a written document used to formally
              request inclusion in a mailing list for promotional or advertising
              materials related to specific areas of interest. It is commonly submitted
              to marketing organizations or associations that distribute mail-based
              advertisements.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This request typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Recipient organization information</li>
                <li>• Description of advertising subject matter</li>
                <li>• Requester’s contact details</li>
                <li>• Signature of the requesting party</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Submitting a clear request helps ensure timely processing and accurate
              delivery of advertising materials.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Direct Mail Advertising Request
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This document is appropriate in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You wish to receive mailed advertisements</li>
                  <li>• You want promotional materials on specific topics</li>
                  <li>• You are joining a new marketing distribution list</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want to expand existing advertising preferences</li>
                  <li>• You are reissuing a previous request</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Requirements
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To ensure your request is accepted and processed, include the following:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Clear Subject Matter
                </h3>
                <p className="text-gray-700">
                  Specify the types of advertising materials you wish to receive.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Accurate Contact Information
                </h3>
                <p className="text-gray-700">
                  Provide a valid mailing address and contact details.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Signature
                </h3>
                <p className="text-gray-700">
                  The request must be signed by the requesting party.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Record Retention
                </h3>
                <p className="text-gray-700">
                  Retain a copy of the signed letter for personal records.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Direct Mail Advertising Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating a request is simple and can be completed in minutes:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the recipient organization details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Describe the advertising subject matter.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Add your contact information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Sign and submit the request.</span>
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
                  ✅ Who can submit this request?
                </h3>
                <p className="text-green-800">
                  Any individual or business seeking mailed advertising materials.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Is notarization required?
                </h3>
                <p className="text-blue-800">
                  No. Unless specifically required, notarization is not necessary.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Can I submit multiple requests?
                </h3>
                <p className="text-purple-800">
                  Yes. Requests may be updated or reissued for additional interests.
                </p>
              </div>
            </div>
          </section>

          {/* Final Checklist */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist — Direct Mail Advertising Request
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Ensure the letter is signed.</li>
                <li>2. Confirm mailing and contact details are accurate.</li>
                <li>3. Retain a copy for your records.</li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Direct Mail Advertising Request
            </h2>
            <p className="text-xl mb-6">
              Request targeted advertising materials quickly and professionally using
              our ready-to-use template.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/direct-mail-request")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Request Now
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear requests. Better outreach.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DirectMailAdvertisingInfo;
