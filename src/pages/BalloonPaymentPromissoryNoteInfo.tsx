import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const BalloonPaymentPromissoryNoteInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">What Is a Balloon Payment Promissory Note?</h1>
            <p className="text-xl text-gray-600">Complete guide to understanding and creating a Balloon Payment Promissory Note</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Balloon Payment Promissory Note is a legally binding agreement in which a borrower promises to repay a loan through regular installment payments followed by a large final payment, known as a balloon payment. This document clearly outlines the loan amount, repayment schedule, interest, and the borrower’s obligation to pay the remaining balance on the due date.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Typically, a Balloon Payment Promissory Note includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Names and addresses of the Borrower and Lender</li>
                <li>• Principal loan amount and interest details</li>
                <li>• Installment payment terms and due date</li>
                <li>• Balloon payment disclosure</li>
                <li>• Governing law and signatures</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This note is commonly used in real estate financing, business loans, or private lending arrangements where lower monthly payments are preferred with a lump-sum payment at the end of the loan term.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">When to Use a Balloon Payment Promissory Note</h2>
            </div>
            <p className="text-gray-700 mb-4">You may consider using a Balloon Payment Promissory Note in the following situations:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Financing real estate with lower initial monthly payments</li>
                  <li>• Short-term loans with an expected future cash inflow</li>
                  <li>• Business loans where revenue is anticipated later</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Private lending between individuals</li>
                  <li>• Situations where refinancing is planned before maturity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Key Requirements for a Balloon Payment Promissory Note</h2>
            </div>
            <p className="text-gray-700 mb-6">To ensure legal validity, the note must include the following elements:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">1. Borrower & Lender Information</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Full legal names</li>
                  <li>• Addresses and contact details</li>
                  <li>• Joint and several liability (if applicable)</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">2. Loan & Payment Terms</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Principal amount</li>
                  <li>• Interest rate or interest terms</li>
                  <li>• Number and amount of installments</li>
                  <li>• Balloon payment due date</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">3. Default & Acceleration</h3>
                <p className="text-gray-700">Conditions under which the full balance becomes immediately due, including missed payments, insolvency, or misrepresentation.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">4. Security & Governing Law</h3>
                <p className="text-gray-700">Details of any collateral securing the loan and the state law governing the agreement.</p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How to Create a Balloon Payment Promissory Note for Free</h2>
            </div>
            <p className="text-gray-700 mb-6">With Legalgram, creating a Balloon Payment Promissory Note is quick and straightforward:</p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Select the governing state law.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Enter borrower, lender, and loan details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Define installment payments and balloon payment terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Review and download your document.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justifycenter text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sign and execute the note with all required parties.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">This method ensures clarity, compliance, and enforceability without legal complexity.</p>
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
                <h3 className="font-semibold text-green-900 mb-2">✅ What is a balloon payment?</h3>
                <p className="text-green-800">A balloon payment is a large, final payment due at the end of the loan term that covers the remaining unpaid principal balance.</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Are prepayments allowed?</h3>
                <p className="text-blue-800">Yes. Most balloon payment promissory notes allow prepayment without penalty unless otherwise stated.</p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">✅ What happens if the borrower defaults?</h3>
                <p className="text-purple-800">Upon default, the lender may accelerate the debt, making the full outstanding balance immediately due.</p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">✅ Is collateral required?</h3>
                <p className="text-orange-800">Collateral is optional but commonly included, especially in real estate-backed balloon loans.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Create Your Balloon Payment Promissory Note Now</h2>
            <p className="text-xl mb-6">Generate a clear, enforceable Balloon Payment Promissory Note tailored to your loan terms in minutes.</p>
            <Button
              size="lg"
              onClick={() => navigate('/documents/balloon-payment-promissory-note')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Balloon Payment Note Today
            </Button>
            <p className="text-bright-orange-100 mt-4">Secure, customizable, and legally sound.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BalloonPaymentPromissoryNoteInfo;

