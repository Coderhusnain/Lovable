import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const MutualRescissionReleaseInfo = () => {
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
              What Is a Mutual Rescission and Release Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A legal agreement to terminate an existing contract and release all parties from obligations
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Mutual Rescission and Release Agreement is a legal document in which two parties
              agree to cancel a prior contract and release each other from any future claims or obligations.
              This agreement ensures that both parties are legally free from the original contract.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This Agreement typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Identification of the parties</li>
                <li>• Reference to the original contract</li>
                <li>• Rescission and mutual release clauses</li>
                <li>• Confidentiality and governing law provisions</li>
                <li>• Signatures of all parties involved</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              By signing this agreement, both parties create a clear legal record that prevents future disputes related to the original contract.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Mutual Rescission and Release Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use this agreement in situations such as:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Both parties have not fully performed the contract</li>
                  <li>• Mutual desire to terminate the contract</li>
                  <li>• Avoiding potential disputes or lawsuits</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Legal closure of the original agreement</li>
                  <li>• Maintaining a formal written record of release</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of the Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A complete Mutual Rescission and Release Agreement should contain:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Rescission Clause
                </h3>
                <p className="text-gray-700">
                  Terminates the original contract and releases both parties from obligations.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Mutual Release
                </h3>
                <p className="text-gray-700">
                  Both parties waive any known or unknown claims arising from the original contract.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Confidentiality
                </h3>
                <p className="text-gray-700">
                  Terms of the agreement and circumstances remain private unless legally required.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Governing Law & Signatures
                </h3>
                <p className="text-gray-700">
                  Specifies applicable law and includes signature lines for all parties.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Draft the Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating a Mutual Rescission and Release Agreement is straightforward:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the parties’ names and contract details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the Effective Date and rescission details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Include mutual release, confidentiality, and governing law clauses.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, review, sign, and submit the agreement.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                Legal clarity prevents future disputes or claims related to the original contract.
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
                  ✅ Is this agreement legally binding?
                </h3>
                <p className="text-green-800">
                  Yes, when properly executed, it terminates the original contract and releases all claims.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Do both parties need to sign?
                </h3>
                <p className="text-blue-800">
                  Yes, signatures from all involved parties are required for validity.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Can I use it for any contract?
                </h3>
                <p className="text-purple-800">
                  It is suitable for contracts where mutual rescission is desired and agreed upon.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Should I keep a copy?
                </h3>
                <p className="text-orange-800">
                  Always. Retain a copy for legal records and proof of termination.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Mutual Rescission and Release Agreement
            </h2>
            <p className="text-xl mb-6">
              Terminate contracts legally and protect both parties from future claims.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/mutual-rescission-release-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Legal closure. Written proof. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default MutualRescissionReleaseInfo;