import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const GuarantyAgreementInfo = () => {
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
            <h1 className="text-4xl font-bold mb-2">Guaranty Agreement</h1>
            <p className="text-lg text-gray-600">
              Also known as: Personal Guarantee Agreement
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              What Is a Guaranty Agreement?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Guaranty Agreement is a legally binding contract in which one
              person (the <strong>Guarantor</strong>) agrees to take
              responsibility for another person’s or entity’s debt or obligation
              if they fail to pay or perform as agreed.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This agreement is commonly used to strengthen a borrower’s
              creditworthiness—such as helping a family member secure a loan or
              satisfying a lender’s requirement for additional security. A
              properly drafted Guaranty Agreement protects all parties by
              clearly defining liability, limits, and enforcement rights.
            </p>
          </section>

          {/* How it works */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How Does a Guaranty Agreement Work?
              </h2>
            </div>

            <div className="bg-orange-50 border-l-4 border-bright-orange-500 p-5 rounded-md">
              <ol className="text-gray-700 space-y-3">
                <li>1. A borrower enters into a primary agreement with a lender.</li>
                <li>
                  2. The guarantor signs a Guaranty Agreement promising to pay or
                  perform if the borrower defaults.
                </li>
                <li>
                  3. If the borrower fails to meet their obligations, the lender
                  may enforce the guaranty.
                </li>
              </ol>
            </div>

            <p className="text-gray-700 mt-4">
              The guaranty may apply to existing debt, future credit, or specific
              obligations depending on how the agreement is drafted.
            </p>
          </section>

          {/* Uses */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Common Uses of a Guaranty Agreement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Loan repayment guarantees</li>
                  <li>• Past-due loan balances</li>
                  <li>• Lease or rent guarantees</li>
                  <li>• Business credit support</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Credit card obligations</li>
                  <li>• Ongoing or future credit</li>
                  <li>• Vendor or supplier credit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Types */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Types of Guaranty Agreements
            </h2>

            <div className="space-y-4">
              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-bright-orange-600 mb-2">
                  Absolute Guaranty
                </h3>
                <p className="text-gray-700">
                  The guarantor is immediately responsible if the borrower fails
                  to pay, regardless of the reason.
                </p>
              </div>

              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-bright-orange-600 mb-2">
                  Conditional Guaranty
                </h3>
                <p className="text-gray-700">
                  The guarantor’s responsibility arises only after specific
                  conditions are met, such as exhaustion of collection efforts
                  against the borrower.
                </p>
              </div>
            </div>
          </section>

          {/* When to use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use a Guaranty Agreement?
              </h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>✔ You want to help someone secure financing</li>
                <li>✔ A lender requires a personal guarantee</li>
                <li>✔ A borrower needs revised or extended credit terms</li>
                <li>✔ You want clearly defined legal responsibility</li>
                <li>✔ You need a professional guaranty document</li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Guaranty Agreement FAQs
            </h2>

            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="font-semibold text-green-900 mb-1">
                  Is a Guaranty Agreement legally enforceable?
                </h3>
                <p className="text-green-800">
                  Yes. When properly drafted and signed, a Guaranty Agreement is
                  legally binding and enforceable under applicable law.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-900 mb-1">
                  What information is needed to create one?
                </h3>
                <p className="text-blue-800">
                  You’ll need the borrower and lender details, the guaranteed
                  obligation, the type of guaranty, limits of liability, and
                  governing law.
                </p>
              </div>
            </div>
          </section>

          {/* Why Legalgram */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Why Download a Guaranty Agreement from Legalgram?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Legally binding and enforceable format
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Professionally drafted template
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Easy to edit, print, and share
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Suitable for personal or business use
                </span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-3">
              Download Guaranty Agreement
            </h2>
            <p className="text-lg mb-6">
              Best legal format • Free • Ready to sign
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/guaranty-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Download Guaranty Agreement
            </Button>
            <p className="text-orange-100 mt-4">
              Trusted by thousands of Legalgram users
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default GuarantyAgreementInfo;
