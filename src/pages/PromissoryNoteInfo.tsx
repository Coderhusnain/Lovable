import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
} from "lucide-react";

const PromissoryNoteInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
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
            <h1 className="text-4xl font-bold mb-2">Promissory Note</h1>
            <p className="text-lg text-gray-600">
              A legally binding loan agreement between a lender and a borrower
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              What Is a Promissory Note?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Promissory Note is a legally binding loan agreement that clearly
              defines the terms of repayment between a lender and a borrower.
              It outlines key details such as the loan amount, interest rate,
              repayment schedule, late fees, and whether collateral is required.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you are lending money to a family member, friend, or
              business, a Promissory Note from Legalgram provides a professional
              and enforceable record of the loan, helping prevent disputes and
              misunderstandings.
            </p>
          </section>

          {/* When to use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use a Promissory Note?
              </h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>✔ You are lending money and want a formal written record</li>
                <li>✔ You are borrowing money from a private party</li>
                <li>✔ The loan includes interest and structured repayments</li>
                <li>✔ You want to clearly define monthly payments and due dates</li>
                <li>✔ A lender requires a signed loan document</li>
              </ul>
            </div>
          </section>

          {/* Key features */}
          <section>
            <div className="flex items-center mb-4">
              <Scale className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Features of a Promissory Note
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>1. Loan Amount:</strong> Clearly states the total
                  amount being borrowed.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>2. Interest Rate:</strong> Specifies whether interest
                  applies and at what rate.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>3. Repayment Schedule:</strong> Defines how and when
                  payments must be made.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>4. Late Fees:</strong> Describes penalties for missed
                  or delayed payments.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>5. Collateral (Optional):</strong> Secures the loan
                  with assets such as property or vehicles.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Why Use Legalgram for Your Promissory Note?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Step-by-step guided document creation
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Includes all essential loan terms
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Legally enforceable and court-recognized
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Download in PDF or Word format
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Suitable for personal or business loans
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Secure electronic signing with RocketSign®
                </span>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Promissory Note FAQs
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Is a Promissory Note legally enforceable?
                </h3>
                <p className="text-blue-800">
                  Yes. When properly drafted and signed, a Promissory Note is
                  legally binding and protects both lender and borrower.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-yellow-900 mb-1">
                  Do I need collateral?
                </h3>
                <p className="text-yellow-800">
                  Collateral is optional but recommended for higher-risk loans.
                  Common examples include vehicles or real estate.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <AlertTriangle className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              Download Promissory Note
            </h2>
            <p className="text-lg mb-6">
              Free • Legally binding • Ready to sign
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/promissory-note")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Promissory Note
            </Button>
            <p className="text-orange-100 mt-4">
              Secure your loan terms with confidence
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PromissoryNoteInfo;
