import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const FormalComplaintRefundInfo = () => {
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
              What Is a Formal Complaint and Demand for Refund?
            </h1>
            <p className="text-xl text-gray-600">
              A professional letter requesting resolution and reimbursement for unsatisfactory services
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Formal Complaint and Demand for Refund is a written notice sent to a company or service
              provider to formally document dissatisfaction with services received and to request
              reimbursement. This letter establishes a clear record of the complaint and provides the
              recipient with an opportunity to resolve the matter amicably.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This letter generally includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Description of the services provided</li>
                <li>• Payment details and dates</li>
                <li>• Explanation of why the services were unsatisfactory</li>
                <li>• A clear demand for a refund</li>
                <li>• Deadline for response</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Sending a formal complaint letter helps protect your rights and demonstrates good-faith
              efforts to resolve the issue before pursuing further remedies.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use This Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You may use this document in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Services failed to meet agreed or reasonable standards</li>
                  <li>• Prior attempts to resolve the issue were unsuccessful</li>
                  <li>• You are seeking a full refund of fees paid</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want written documentation of the dispute</li>
                  <li>• You plan to escalate the matter if unresolved</li>
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
              To ensure effectiveness and clarity, the letter should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Payment Details
                </h3>
                <p className="text-gray-700">
                  Include the amount paid, payment method, check number, and date.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Description of the Issue
                </h3>
                <p className="text-gray-700">
                  Clearly explain how the services failed to meet expectations.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Refund Demand
                </h3>
                <p className="text-gray-700">
                  State the exact amount requested and your expectation for resolution.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Signature & Records
                </h3>
                <p className="text-gray-700">
                  The letter must be signed, and copies should be retained.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Formal Complaint Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              You can prepare this letter quickly by following these steps:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the company’s name and address.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Describe the services and payment details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Explain the issue and request a refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Sign, keep copies, and send the letter.</span>
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
                  ✅ Is this letter legally binding?
                </h3>
                <p className="text-green-800">
                  While not a court order, it serves as formal documentation of your complaint.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Should I attach documents?
                </h3>
                <p className="text-blue-800">
                  Yes. Include photocopies of receipts, invoices, or contracts.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Can I send a follow-up?
                </h3>
                <p className="text-purple-800">
                  Absolutely. Follow-up letters may be sent if the matter remains unresolved.
                </p>
              </div>
            </div>
          </section>

          {/* Final Checklist */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist — Complaint Letter
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Sign the letter.</li>
                <li>2. Attach copies of supporting documents.</li>
                <li>3. Keep originals and maintain a communication log.</li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Complaint Letter Now
            </h2>
            <p className="text-xl mb-6">
              Take control of the situation with a clear, professional demand for resolution.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/complaint-demand-refund")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Complaint Letter
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear communication. Stronger outcomes.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FormalComplaintRefundInfo;
