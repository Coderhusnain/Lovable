import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const DebtCollectionWorksheetInfo = () => {
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
              What Is a Debt Collection Worksheet?
            </h1>
            <p className="text-xl text-gray-600">
              An organized document for preparing and managing debt collection cases
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Debt Collection Worksheet is a structured document used to gather,
              organize, and review all relevant information related to a debt recovery
              matter. It helps creditors, attorneys, and collection professionals
              maintain accurate records before initiating or continuing debt
              collection actions.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Debt Collection Worksheet typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Creditor and debtor identification details</li>
                <li>• Attorney information, if applicable</li>
                <li>• Supporting financial and legal documents</li>
                <li>• Case notes and summaries</li>
                <li>• Action and compliance checklists</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This worksheet serves as a centralized reference point to support
              compliance, efficiency, and informed decision-making throughout the
              debt collection process.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Debt Collection Worksheet
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This worksheet is commonly used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Preparing to initiate debt collection proceedings</li>
                  <li>• Reviewing an existing unpaid account</li>
                  <li>• Organizing documentation before legal action</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Coordinating with attorneys or collection agencies</li>
                  <li>• Maintaining compliance with debt collection regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Debt Collection Worksheet
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be effective, the worksheet should include accurate and complete
              information in the following areas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Creditor & Debtor Information
                </h3>
                <p className="text-gray-700">
                  Full names, entity types, addresses, and contact details for both
                  parties involved in the debt.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Attorney Information
                </h3>
                <p className="text-gray-700">
                  Details of legal counsel handling the matter, if applicable,
                  including firm name and contact information.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Supporting Documentation
                </h3>
                <p className="text-gray-700">
                  Records such as promissory notes, loan agreements, invoices, payment
                  histories, and correspondence with the debtor.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Case Notes & Summary
                </h3>
                <p className="text-gray-700">
                  A concise summary of the debt, collection status, and any relevant
                  observations or next steps.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Complete a Debt Collection Worksheet
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Completing this worksheet carefully helps ensure a legally sound and
              well-documented debt collection process:
            </p>
            
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the date and general case information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Provide complete creditor and debtor details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>List all supporting documents related to the debt.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Add notes or a case summary for internal reference.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Upload and securely store all related documentation.</span>
                </li>
              </ol>
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
                  ✅ Is this worksheet legally binding?
                </h3>
                <p className="text-green-800">
                  No. The worksheet is an internal organizational tool, not a legal
                  filing. However, accuracy is essential.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Why are supporting documents important?
                </h3>
                <p className="text-blue-800">
                  They provide evidence of the debt and help support collection
                  actions, negotiations, or legal proceedings.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Should I keep copies of this worksheet?
                </h3>
                <p className="text-purple-800">
                  Yes. Retain copies of the worksheet and all uploaded documents for
                  secure recordkeeping and future reference.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can this worksheet be shared with an attorney?
                </h3>
                <p className="text-orange-800">
                  Yes. It is designed to be easily shared with legal counsel or other
                  authorized parties when needed.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist for Debt Collection Preparation
            </h2>
            <p className="text-gray-700 mb-4">
              Before proceeding with debt collection actions:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review the worksheet for accuracy and completeness.</li>
                <li>2. Upload and organize all supporting documents.</li>
                <li>3. Retain copies for secure recordkeeping.</li>
                <li>4. Ensure documents are accessible for review or legal consultation.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Debt Collection Worksheet Today
            </h2>
            <p className="text-xl mb-6">
              Stay organized and compliant throughout the debt recovery process.
              Our Debt Collection Worksheet helps you prepare, document, and manage
              cases with confidence.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/debt-collection-worksheet')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Your Worksheet Now
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Organized records. Smarter collections.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DebtCollectionWorksheetInfo;
