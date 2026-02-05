import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const CellPhoneInquiryLetterInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">What Is a Cell Phone Inquiry Letter?</h1>
            <p className="text-xl text-gray-600">A simple guide to questioning and clarifying cellular service billing charges</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Cell Phone Inquiry Letter is a formal written request sent by a subscriber to a cellular service provider to seek clarification or correction of billing charges. It is commonly used when a billing statement reflects charges that appear inconsistent with the terms of the subscriber’s service agreement.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">This letter typically includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Account and billing reference details</li>
                <li>• Description of the billing discrepancy</li>
                <li>• A request for written clarification</li>
                <li>• Reference to the service agreement terms</li>
                <li>• Subscriber contact information and signature</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This type of inquiry helps establish a clear written record of the issue and supports timely resolution with the service provider.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">When to Use a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">You may need to send a Cell Phone Inquiry Letter in the following situations:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Your monthly bill reflects unexpected or higher charges</li>
                  <li>• Charges do not align with your service contract</li>
                  <li>• You need written clarification for recordkeeping</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You are disputing a specific billing entry</li>
                  <li>• You are preparing documentation for escalation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Key Elements of a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-6">For clarity and effectiveness, the letter should contain the following:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">1. Subscriber Information</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Subscriber name</li>
                  <li>• Address and contact details</li>
                  <li>• Account number</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">2. Billing Details</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Billing date and statement reference</li>
                  <li>• Amount charged vs. expected charge</li>
                  <li>• Description of the discrepancy</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">3. Supporting Documents</h3>
                <p className="text-gray-700">A copy of the relevant billing statement should be enclosed for reference.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">4. Signature & Recordkeeping</h3>
                <p className="text-gray-700">The letter should be signed by the account holder and retained for future reference.</p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How to Create a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-6">You can prepare a Cell Phone Inquiry Letter in just a few steps:</p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter subscriber and service provider details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Reference the billing statement and account number.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Clearly explain the billing discrepancy.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Attach a copy of the relevant billing statement.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sign and send the letter to the service provider.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">This approach ensures clear communication and proper documentation of your inquiry.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Do I need to attach my billing statement?</h3>
                <p className="text-green-800">Yes. Including a copy of the billing statement helps the provider quickly identify and review the charge in question.</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Is this letter legally binding?</h3>
                <p className="text-blue-800">While it is not a contract, it serves as a formal written record of your inquiry and request for clarification.</p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">✅ Should I keep a copy of the letter?</h3>
                <p className="text-purple-800">Absolutely. Retaining copies of all correspondence is important for recordkeeping and future reference.</p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">✅ Can I reuse this letter?</h3>
                <p className="text-orange-800">Yes. You may update and reissue the letter to dispute charges on future billing statements.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Create Your Cell Phone Inquiry Letter Now</h2>
            <p className="text-xl mb-6">Quickly generate a clear and professional letter to address cellular billing concerns.</p>
            <Button
              size="lg"
              onClick={() => navigate('/documents/cellphone-inquiry-letter')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Inquiry Letter Today
            </Button>
            <p className="text-bright-orange-100 mt-4">Clear, professional, and ready to send.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CellPhoneInquiryLetterInfo;
