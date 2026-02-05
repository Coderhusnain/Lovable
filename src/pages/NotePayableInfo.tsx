import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const NotePayableInfo = () => {
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
              What Is a Note Payable?
            </h1>
            <p className="text-xl text-gray-600">
              A legally binding promise to repay a loan under defined terms
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Note Payable is a written legal instrument in which one party
              (the Borrower) formally promises to repay a specific sum of money
              to another party (the Lender). It outlines repayment terms,
              interest, default events, and enforcement rights.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Note Payable typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Principal loan amount</li>
                <li>• Repayment schedule and due date</li>
                <li>• Interest rate and late charges</li>
                <li>• Default and acceleration terms</li>
                <li>• Governing law and signatures</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document creates enforceable obligations and protects both
              parties by clearly defining expectations.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Note Payable
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Note Payable is commonly used in the following situations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Personal or private loans</li>
                  <li>• Business financing arrangements</li>
                  <li>• Short- or long-term lending</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Loans requiring formal repayment terms</li>
                  <li>• Situations needing legal enforceability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Note Payable
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Loan Terms
                </h3>
                <p className="text-gray-700">
                  Specifies the principal amount, installment payments, interest
                  rate, and maturity date.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Default & Acceleration
                </h3>
                <p className="text-gray-700">
                  Defines what constitutes default and allows the lender to
                  demand immediate repayment.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Collection Costs
                </h3>
                <p className="text-gray-700">
                  Requires the borrower to cover collection and legal costs if
                  the loan is not repaid as agreed.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Governing Law
                </h3>
                <p className="text-gray-700">
                  Identifies which state’s laws control interpretation and
                  enforcement.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Note Payable
              </h2>
            </div>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter borrower and lender information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Define the loan amount, interest, and repayment schedule.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Review default, acceleration, and collection terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Download, sign, and execute the note.</span>
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
                  ✅ Is a Note Payable legally enforceable?
                </h3>
                <p className="text-green-800">
                  Yes. When properly executed, it is a binding legal obligation.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can the borrower prepay the loan?
                </h3>
                <p className="text-blue-800">
                  Yes, if the note allows prepayment without penalty.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Is interest required?
                </h3>
                <p className="text-purple-800">
                  Interest is optional and must be clearly stated in the note.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Note Payable
            </h2>
            <p className="text-xl mb-6">
              Document your loan clearly and protect both parties.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/note-payable")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Note Payable
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear terms. Legal certainty. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default NotePayableInfo;
