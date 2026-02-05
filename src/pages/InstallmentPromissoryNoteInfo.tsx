import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const InstallmentPromissoryNoteInfo = () => {
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
              What Is an Installment Promissory Note?
            </h1>
            <p className="text-xl text-gray-600">
              A written promise to repay a loan through scheduled installments
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An Installment Promissory Note is a legally binding document in which
              a borrower formally promises to repay a specific sum of money to a
              lender over time in fixed installments. It outlines repayment terms,
              interest, default conditions, and legal remedies available to the lender.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                An Installment Promissory Note typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Principal amount and interest rate</li>
                <li>• Monthly installment schedule</li>
                <li>• Late fees and acceleration terms</li>
                <li>• Default and collection provisions</li>
                <li>• Borrower, lender, and guarantor signatures</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document is commonly used for personal loans, private lending,
              business financing, and situations where repayment occurs over time.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use an Installment Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              An Installment Promissory Note should be used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Lending money with monthly repayments</li>
                  <li>• Charging interest on a loan</li>
                  <li>• Formalizing a private loan arrangement</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Protecting the lender’s right to repayment</li>
                  <li>• Requiring a guarantor or co-signer</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Components Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of an Installment Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be valid and enforceable, an Installment Promissory Note should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Repayment Terms
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Installment amount and frequency</li>
                  <li>• Start date and final due date</li>
                  <li>• Interest rate details</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Late Fees & Acceleration
                </h3>
                <p className="text-gray-700">
                  Late charges may apply if payments are missed, and the lender
                  may demand full repayment upon default.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Default Events
                </h3>
                <p className="text-gray-700">
                  Nonpayment, insolvency, bankruptcy, or misrepresentation can
                  trigger immediate repayment.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Guaranty & Governing Law
                </h3>
                <p className="text-gray-700">
                  A guarantor may secure the loan, and the note specifies which
                  state’s law governs the agreement.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create an Installment Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating an Installment Promissory Note with Legalgram is simple:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter borrower, lender, and guarantor details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the principal amount and interest rate.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Define installment payments and default terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and execute the note.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                A clear promissory note protects both borrower and lender.
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
                  ✅ Is an Installment Promissory Note legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. Once signed, it is a legally enforceable promise to repay the loan.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can the borrower prepay the note?
                </h3>
                <p className="text-blue-800">
                  Yes. Prepayment is allowed without penalty unless stated otherwise.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ What happens if payments stop?
                </h3>
                <p className="text-purple-800">
                  The lender may accelerate the debt and demand full payment.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Is a guarantor required?
                </h3>
                <p className="text-orange-800">
                  A guarantor is optional but adds security for the lender.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Promissory Note
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all terms carefully.</li>
                <li>2. Ensure borrower and guarantor sign.</li>
                <li>3. Provide copies to all parties.</li>
                <li>4. Store the original securely.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Installment Promissory Note Now
            </h2>
            <p className="text-xl mb-6">
              Draft a legally binding promissory note in minutes.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/installment-promissory-note")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Promissory Note
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear terms. Secure repayment. Legal confidence.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default InstallmentPromissoryNoteInfo;
