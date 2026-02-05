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

const DemandForMoneyOwedInfo = () => {
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
            <h1 className="text-4xl font-bold mb-2">
              Demand for Money Owed
            </h1>
            <p className="text-lg text-gray-600">
              Also known as: Demand Letter, Collection Letter, Money Owed Letter
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              What Is a Demand for Money Owed?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Demand for Money Owed Agreement (commonly called a Demand Letter)
              is a formal written document used to request repayment of money that
              is owed to you. It provides the debtor with official notice that
              payment is due and establishes a deadline before further legal
              action is considered.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This document is intended strictly for creditors collecting debts
              owed to them. Using a professionally drafted Demand for Money Owed
              agreement from Legalgram helps ensure compliance with applicable
              state laws and federal regulations, including the Fair Debt
              Collection Practices Act (FDCPA).
            </p>
          </section>

          {/* When to use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use a Demand for Money Owed Letter?
              </h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>✔ You want to formally demand repayment of money owed</li>
                <li>✔ You need a written record of the debt</li>
                <li>
                  ✔ You want to notify the debtor of potential legal action
                </li>
                <li>
                  ✔ You want a professional and enforceable collection letter
                </li>
              </ul>
            </div>
          </section>

          {/* Key features */}
          <section>
            <div className="flex items-center mb-4">
              <Scale className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Features of a Demand for Money Owed Agreement
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>1. Parties Involved:</strong> Identifies the legal
                  names and contact details of both the creditor and the debtor.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>2. Debt Description:</strong> Explains the reason for
                  the debt, such as goods, services, or loans provided.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>3. Payment Details:</strong> Specifies the total amount
                  owed, interest, late fees, or daily charges if applicable.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>4. Payment Deadline:</strong> Sets a clear date by
                  which payment must be made to avoid further action.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>5. Legal Notice:</strong> Informs the debtor that
                  failure to pay may result in legal action.
                </p>
              </div>
              <div className="border rounded-lg p-5">
                <p className="text-gray-700">
                  <strong>6. Legal Compliance:</strong> Aligns with federal and
                  state debt collection laws.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Benefits of Using Legalgram’s Demand for Money Owed Agreement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Professionally drafted legal document
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Fully customizable for personal or business debts
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Free download in the best legal format
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Secure online signing with RocketSign®
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Legally enforceable and compliant
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">
                  Easy to share, store, and track
                </span>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Demand for Money Owed FAQs
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-900 mb-1">
                  How do I write a Demand for Money Owed letter?
                </h3>
                <p className="text-blue-800">
                  Simply answer a few questions in Legalgram’s document builder,
                  and your Demand for Money Owed agreement is generated
                  automatically.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-yellow-900 mb-1">
                  How long should I wait after sending a Demand Letter?
                </h3>
                <p className="text-yellow-800">
                  Typically 15–30 days is customary before pursuing legal action.
                  Legalgram lets you set your own deadline.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <AlertTriangle className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              Download Demand for Money Owed
            </h2>
            <p className="text-lg mb-6">
              Free • Legally compliant • Ready to send
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/demand-for-money-owed")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Download Demand Letter
            </Button>
            <p className="text-orange-100 mt-4">
              Take control of your debt collection process with confidence
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DemandForMoneyOwedInfo;
