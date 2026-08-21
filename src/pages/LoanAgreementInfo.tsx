import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";
import { documentContent, getDocumentContent } from "@/data/documentContent";

const LoanAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Loan Agreement");

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
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-xl text-gray-600">{doc.whatIs}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Loan Agreement is a legally binding contract between a borrower
              and a lender that defines the terms under which money is loaned
              and repaid. It clearly outlines the loan amount, repayment schedule,
              default provisions, and each party’s rights and responsibilities.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">A Loan Agreement typically includes:</h3>
              <ul className="text-blue-800 space-y-1">
                {doc.whatYouNeed?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">{doc.whatIs}</p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Loan Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Loan Agreement should be used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.whenToUse?.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">• {item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Loan Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be effective and enforceable, a Loan Agreement should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">1. Repayment Terms</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Installment amount and schedule</li>
                  <li>• Due date and final payment date</li>
                  <li>• Interest terms, if applicable</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">2. Late Charges & Acceleration</h3>
                <p className="text-gray-700">Late fees may apply if payments are missed, and the lender may accelerate the loan upon default.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">3. Default Provisions</h3>
                <p className="text-gray-700">Events such as nonpayment, insolvency, or misrepresentation can trigger immediate repayment.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">4. Assignment & Governing Law</h3>
                <p className="text-gray-700">The agreement specifies whether it can be assigned and which jurisdiction’s laws apply.</p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Loan Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              With Legalgram, creating a Loan Agreement is simple and efficient:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter borrower and lender information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the loan amount and repayment schedule.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Customize late fees, default, and assignment terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and execute the agreement.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                A clear agreement helps prevent disputes and protects both parties.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {doc.faqs?.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Loan Agreement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all terms carefully.</li>
                <li>2. Ensure both parties sign and date the agreement.</li>
                <li>3. Provide signed copies to all parties.</li>
                <li>4. Store the original securely.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Loan Agreement Now
            </h2>
            <p className="text-xl mb-6">
              Draft a clear, enforceable loan agreement in minutes.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/loan-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Loan Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear terms. Secure lending. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LoanAgreementInfo;

