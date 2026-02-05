import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const RemovePersonalInfoRequestInfo = () => {
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
              Request to Remove Personal Information
            </h1>
            <p className="text-xl text-gray-600">
              A formal request to delete personal data held by an organization
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Request to Remove Personal Information is a formal written notice
              submitted by an individual to an organization requesting the
              deletion of their personal data from the organization’s records,
              systems, and files.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This request may apply to:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Electronic databases and digital records</li>
                <li>• Physical files and paper records</li>
                <li>• Marketing, customer, or internal data systems</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document is commonly used to exercise privacy and data
              protection rights under applicable laws and regulations.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use This Request?
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You may use this request in the following situations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You no longer wish your data to be stored</li>
                  <li>• You have ended a relationship with a company</li>
                  <li>• Your data is being used without consent</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want to limit marketing or data sharing</li>
                  <li>• You are exercising privacy or data rights</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
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
                  1. Identification of the Individual
                </h3>
                <p className="text-gray-700">
                  Clearly identifies the person whose personal data is the
                  subject of the request.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Description of Personal Data
                </h3>
                <p className="text-gray-700">
                  Lists the categories or types of personal information to be
                  deleted.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Confirmation Requirement
                </h3>
                <p className="text-gray-700">
                  Requests written confirmation once the deletion is completed.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Legal Exceptions
                </h3>
                <p className="text-gray-700">
                  Allows the organization to explain any lawful reasons for
                  retaining certain data.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
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
                  <span>Complete your name, contact details, and date.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Specify the types of personal data to be removed.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Sign the request and send it to the organization.</span>
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
                  ✅ Does this request need to be signed?
                </h3>
                <p className="text-green-800">
                  Yes. The request must be signed by the individual whose data is
                  being requested for deletion.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can a company refuse deletion?
                </h3>
                <p className="text-blue-800">
                  In some cases, data may be retained due to legal or regulatory
                  obligations, which must be explained in writing.
                </p>
              </div>
            </div>
          </section>

          {/* Final Checklist Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist Before Sending
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Ensure the request is signed and dated</li>
                <li>• Send copies to all named parties</li>
                <li>• Retain a signed copy for personal records</li>
                <li>• Consult legal counsel if clarification is needed</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Data Deletion Request
            </h2>
            <p className="text-xl mb-6">
              Take control of your personal information with confidence.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/request-remove-personal-information")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start This Request
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Privacy respected. Rights protected.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default RemovePersonalInfoRequestInfo;
