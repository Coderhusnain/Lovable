import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const ComplaintLetterInfo = () => {
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
              What Is a Complaint Letter to the BBB or Attorney General?
            </h1>
            <p className="text-xl text-gray-600">
              A formal way to report unresolved consumer complaints and request official assistance
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Complaint Letter to the Better Business Bureau (BBB) or the Attorney General
              is a formal written document used to report unsatisfactory or unresolved
              services provided by a business. It outlines the issue, prior attempts to
              resolve the matter, and the specific resolution being requested.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This type of complaint letter typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Business name and description of services received</li>
                <li>• Payment details and transaction information</li>
                <li>• Timeline of events and prior complaints</li>
                <li>• Requested resolution, such as a refund</li>
                <li>• Supporting documentation and contact information</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Submitting a clear and well-documented complaint increases the likelihood
              of a timely and fair resolution.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Complaint Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You may consider submitting this letter in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Services received were unsatisfactory or misleading</li>
                  <li>• Direct attempts to resolve the issue failed</li>
                  <li>• A business did not respond appropriately to complaints</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• A refund or corrective action has been denied</li>
                  <li>• You wish to escalate the issue to an oversight authority</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Requirements for a Complaint Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To ensure your complaint is properly reviewed, include the following:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Complaint Details
                </h3>
                <p className="text-gray-700">
                  Clearly describe the services received, dates involved, and why the
                  services were unsatisfactory.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Payment Information
                </h3>
                <p className="text-gray-700">
                  Include the total amount paid, payment method, check number, and date
                  of payment if applicable.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Prior Resolution Attempts
                </h3>
                <p className="text-gray-700">
                  Document when and how you contacted the business and any responses
                  received.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Requested Outcome
                </h3>
                <p className="text-gray-700">
                  State the resolution you are seeking, such as a full refund or other
                  corrective action.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Complaint Letter for Free
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Legalgram helps you prepare a professional complaint letter in minutes:
            </p>
            
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the business name and service details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Add payment and transaction information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Describe prior attempts to resolve the issue.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Specify your requested resolution.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Download, sign, and submit the letter.</span>
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
                  ✅ Who can receive this complaint letter?
                </h3>
                <p className="text-green-800">
                  The letter may be sent to the Better Business Bureau or the Office of
                  the Attorney General.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Should I include supporting documents?
                </h3>
                <p className="text-blue-800">
                  Yes. Attach copies of prior correspondence, receipts, and any
                  relevant documentation. Do not send originals.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ How long should I wait for a response?
                </h3>
                <p className="text-purple-800">
                  You may request a written response within a specific number of days,
                  typically stated in the letter.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can I resend or update my complaint?
                </h3>
                <p className="text-orange-800">
                  Yes. Follow-up or revised complaints may be submitted if circumstances
                  change or additional information becomes available.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist Before Submitting Your Complaint
            </h2>
            <p className="text-gray-700 mb-4">
              Before sending your complaint letter:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Ensure the letter is signed and dated.</li>
                <li>2. Include complete contact information.</li>
                <li>3. Attach copies of all supporting documents.</li>
                <li>4. Retain copies for your personal records.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Complaint Letter Today
            </h2>
            <p className="text-xl mb-6">
              Take the next step toward resolving your consumer dispute. Our Complaint
              Letter template is clear, professional, and easy to use.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/complaint-letter-info')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Complaint Letter Now
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Documented issues. Stronger resolutions.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ComplaintLetterInfo;
