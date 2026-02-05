import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const SecuredPromissoryNoteInfo = () => {
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
              What Is a Secured Promissory Note Agreement?
            </h1>
            <p className="text-xl text-gray-600">
              A legally binding loan agreement backed by collateral
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Secured Promissory Note Agreement is a legally binding document in which
              a borrower promises to repay a loan while offering personal property or
              real estate as collateral. This added security protects the lender by
              allowing recovery of the pledged asset if the borrower defaults.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Other names for this agreement include:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Secured Promissory Note Form</li>
                <li>• Loan Security Agreement</li>
                <li>• Secured Loan Agreement</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Because the loan is backed by collateral, secured promissory notes are
              commonly used for higher-value or higher-risk lending arrangements. They
              offer stronger legal protection than unsecured promissory notes.
            </p>
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When Should You Use a Secured Promissory Note?
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use a Secured Promissory Note Agreement if:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want to borrow money and offer collateral</li>
                  <li>• You are lending money and want asset-backed security</li>
                  <li>• You want stronger legal protection in case of default</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• The loan involves higher value or risk</li>
                  <li>• The agreement is for personal or business lending</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                What Should Be Included in a Secured Promissory Note?
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              A proper secured promissory note format should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Loan Details
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Loan amount and disbursement method</li>
                  <li>• Interest rate and payment terms</li>
                  <li>• Repayment schedule and due dates</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Party Information
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Names and contact details of all parties</li>
                  <li>• Co-signers, if applicable</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Collateral Description
                </h3>
                <p className="text-gray-700">
                  A detailed description and estimated value of the collateral securing
                  the loan.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Default & Enforcement Terms
                </h3>
                <p className="text-gray-700">
                  Terms covering late payments, default, and lender enforcement rights.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Secured Promissory Note for Free
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating a secured promissory note on Legalgram is simple and cost-effective:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Answer a few questions about the loan and collateral.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Review the generated agreement and share it if needed.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Sign online to make the agreement legally valid.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download and store signed copies securely.</span>
                </li>
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Secured Promissory Note FAQs
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  ✅ What does “secured” mean?
                </h3>
                <p className="text-green-800">
                  It means the loan is backed by collateral, which the lender may take if
                  the borrower defaults.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Is notarization required?
                </h3>
                <p className="text-blue-800">
                  In most cases, notarization is not legally required, but it may add
                  evidentiary value.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Do I need a lawyer?
                </h3>
                <p className="text-purple-800">
                  Many users rely on prepared templates for affordability and speed, with
                  legal review available if needed.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Completing the Agreement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review the document carefully.</li>
                <li>2. Sign and download copies in PDF or Word format.</li>
                <li>3. Distribute signed copies to all parties.</li>
                <li>4. Store the agreement and collateral documents securely.</li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Download Your Secured Promissory Note
            </h2>
            <p className="text-xl mb-6">
              Secure your loan with a professional, legally compliant agreement.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/secured-promissory-note")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Download Secured Promissory Note
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Free. Editable. Trusted by borrowers and lenders.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SecuredPromissoryNoteInfo;
