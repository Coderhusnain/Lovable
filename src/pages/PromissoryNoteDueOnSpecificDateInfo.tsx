import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const PromissoryNoteDueOnSpecificDateInfo = () => {
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
              What Is a Promissory Note Due on a Specific Date?
            </h1>
            <p className="text-xl text-gray-600">
              A clear and legally enforceable agreement for fixed-date loan repayment
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Promissory Note Due on a Specific Date Agreement is a legal loan
              document in which a borrower promises to repay a lender by a clearly
              defined due date. By specifying an exact repayment date, this agreement
              provides clarity, accountability, and legal protection for both parties.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                This agreement typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Loan amount and repayment due date</li>
                <li>• Interest rate (if applicable)</li>
                <li>• Early payment or prepayment terms</li>
                <li>• Signatures of lender and borrower</li>
                <li>• Legally enforceable repayment terms</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document serves as official proof of the loan and helps avoid
              disputes by clearly defining repayment expectations.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Promissory Note Due on a Specific Date
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This agreement is useful in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You are lending or borrowing money</li>
                  <li>• You want a fixed repayment deadline</li>
                  <li>• You need formal loan documentation</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You manage or operate a business offering loans</li>
                  <li>• You want to ensure timely repayment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Elements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Elements of This Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A well-drafted Promissory Note Due on a Specific Date should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Lender & Borrower Details
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Legal names</li>
                  <li>• Addresses and contact information</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Loan Terms
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Loan amount</li>
                  <li>• Specific repayment due date</li>
                  <li>• Interest rate (if any)</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Payment Conditions
                </h3>
                <p className="text-gray-700">
                  Early payment options, late payment consequences, and repayment
                  method details.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Signatures & Enforceability
                </h3>
                <p className="text-gray-700">
                  Signed by both parties to make the agreement legally binding.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Promissory Note Due on a Specific Date
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating this agreement is quick and straightforward:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Enter lender and borrower information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Specify the loan amount and exact due date.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Add interest rate and early payment terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Review the agreement for accuracy.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    5
                  </span>
                  <span>Sign and download the document.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                This ensures your loan agreement is clear, professional, and secure.
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
                  ✅ Do I need a lawyer to create this agreement?
                </h3>
                <p className="text-green-800">
                  Usually no. The agreement is simple, but legal review is optional
                  if you need extra assurance.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Is notarization required?
                </h3>
                <p className="text-blue-800">
                  No. Notarization is not required, though it can add extra legal
                  security.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Is this agreement legally binding?
                </h3>
                <p className="text-purple-800">
                  Yes. Once signed, it is legally enforceable.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can I download this agreement?
                </h3>
                <p className="text-orange-800">
                  Yes. The agreement can be downloaded in PDF or Word format.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Promissory Note Today
            </h2>
            <p className="text-xl mb-6">
              Secure your loan agreement with a clear, fixed repayment date.
            </p>
            <Button
              size="lg"
              onClick={() =>
                navigate("/documents/promissory-note-due-on-specific-date")
              }
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Promissory Note
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Simple. Secure. Legally sound.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PromissoryNoteDueOnSpecificDateInfo;
