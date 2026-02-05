import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const MembershipCancellationLetterInfo = () => {
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
              What Is a Membership Cancellation Letter?
            </h1>
            <p className="text-xl text-gray-600">
              A formal notice used to cancel a membership and request a refund
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Membership Cancellation Letter is a formal written notice used to
              inform an organization, club, service provider, or association of
              a member’s decision to terminate their membership. It also serves
              as a written request for a refund of membership dues, where
              applicable under the membership agreement.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Membership Cancellation Letter typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Member’s intent to cancel the membership</li>
                <li>• Effective date of cancellation</li>
                <li>• Refund request (if applicable)</li>
                <li>• Proof of payment reference</li>
                <li>• Member contact information</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This letter creates a clear written record of cancellation and
              helps prevent future billing disputes or misunderstandings.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Membership Cancellation Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use this letter in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Canceling a gym, club, or service membership</li>
                  <li>• Ending a subscription-based membership</li>
                  <li>• Avoiding future automatic charges</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Requesting a refund of prepaid dues</li>
                  <li>• Maintaining a written cancellation record</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Membership Cancellation Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A properly written cancellation letter should contain:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Cancellation Notice
                </h3>
                <p className="text-gray-700">
                  A clear statement that the membership is being canceled,
                  including the effective date.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Refund Request
                </h3>
                <p className="text-gray-700">
                  A request for a refund of any unused or prepaid membership dues,
                  if permitted under the agreement.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Proof of Payment
                </h3>
                <p className="text-gray-700">
                  Reference to receipts or payment records supporting the refund
                  request.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Contact Information
                </h3>
                <p className="text-gray-700">
                  Accurate contact details for confirmation and follow-up.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Membership Cancellation Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating a Membership Cancellation Letter with Legalgram is simple:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter your personal and membership details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the cancellation date and refund request.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Attach or reference proof of payment.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and submit the letter.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                Written cancellation protects you from future disputes or charges.
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
                  ✅ Is a Membership Cancellation Letter legally required?
                </h3>
                <p className="text-green-800">
                  Many memberships require written notice to cancel and avoid
                  further charges.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can I request a refund?
                </h3>
                <p className="text-blue-800">
                  Yes, if the membership terms allow refunds for unused periods.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Should I keep a copy of the letter?
                </h3>
                <p className="text-purple-800">
                  Absolutely. Keeping a copy protects you if disputes arise.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ How should the letter be delivered?
                </h3>
                <p className="text-orange-800">
                  It may be sent by email, mail, or courier depending on the
                  membership’s cancellation policy.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Membership Cancellation Letter
            </h2>
            <p className="text-xl mb-6">
              Cancel with confidence and protect yourself from future charges.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/membership-cancellation-letter")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Cancellation Letter
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear notice. Written proof. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipCancellationLetterInfo;