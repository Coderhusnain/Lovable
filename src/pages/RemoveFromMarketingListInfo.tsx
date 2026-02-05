import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const RemoveFromMarketingListInfo = () => {
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
              What Is a Request to Remove Name from a Marketing List?
            </h1>
            <p className="text-xl text-gray-600">
              A formal notice asking companies to stop sending marketing communications
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Request to Remove Name from a Direct Marketing List is a formal written
              notice used to demand that a company stop using your personal information
              for marketing, solicitation, or promotional purposes. It instructs the
              recipient to remove your name, address, and contact details from all
              internal and third-party mailing and contact lists.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This request typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Your name and contact information</li>
                <li>• The recipient company’s information</li>
                <li>• A demand to stop marketing communications</li>
                <li>• Coverage of mail, phone, and electronic messages</li>
                <li>• Your signature and date</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This type of request helps protect privacy, reduce unwanted contact,
              and create a written record if a company continues marketing to you
              after being notified.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Removal Request
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use a Request to Remove Name from Marketing Lists when:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You receive repeated marketing emails or mail</li>
                  <li>• Companies continue contacting you after opting out</li>
                  <li>• Your data is being shared with third parties</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want to formally protect your privacy</li>
                  <li>• You need written proof of an opt-out request</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of the Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be effective, a marketing removal request should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Personal Information
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Full name and address</li>
                  <li>• Email and phone number</li>
                  <li>• Any identifying account details</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Clear Removal Demand
                </h3>
                <p className="text-gray-700">
                  The letter must clearly instruct the company to remove your
                  information from all marketing and solicitation lists.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Confirmation Request
                </h3>
                <p className="text-gray-700">
                  Asking for written confirmation creates proof of compliance.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Signature
                </h3>
                <p className="text-gray-700">
                  The request should be signed by the requesting party to show
                  authenticity.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Removal Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              With Legalgram, preparing a marketing list removal request is easy:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter your personal contact details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Identify the company sending marketing messages.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Confirm all communication types to stop.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and send the request.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                A written request gives you control over unwanted communications.
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
                  ✅ Is this request legally effective?
                </h3>
                <p className="text-green-800">
                  Yes. It creates a formal record that you demanded removal of
                  your personal data from marketing use.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Do I need notarization?
                </h3>
                <p className="text-blue-800">
                  No. Witnessing or notarization is not required unless the
                  recipient specifically asks for it.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ What if the company ignores my request?
                </h3>
                <p className="text-purple-800">
                  You may consult an attorney or file a complaint if violations
                  continue after written notice.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Should I keep a copy?
                </h3>
                <p className="text-orange-800">
                  Yes. Always retain a signed copy and any correspondence for
                  your records.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Request
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Sign the request.</li>
                <li>2. Send it to the marketing company.</li>
                <li>3. Keep a copy for your records.</li>
                <li>4. Monitor for continued communications.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Removal Request Now
            </h2>
            <p className="text-xl mb-6">
              Stop unwanted marketing communications quickly and formally.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/remove-from-marketing-list")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Removal Request
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Protect your privacy. Reduce spam. Stay in control.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default RemoveFromMarketingListInfo;
