import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const DueOnDemandPromissoryNoteInfo = () => {
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
              What Is a Due on Demand Promissory Note?
            </h1>
            <p className="text-xl text-gray-600">
              A flexible loan agreement payable whenever the lender requests
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Due on Demand Promissory Note is a written promise in which a borrower
              agrees to repay a specific loan amount, plus interest, immediately upon
              the lender’s demand. Unlike installment loans, repayment is not tied to
              a fixed schedule unless and until the lender formally requests payment.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Due on Demand Promissory Note typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• The principal loan amount</li>
                <li>• Interest rate and accrual start date</li>
                <li>• Borrower and lender details</li>
                <li>• Demand-based repayment terms</li>
                <li>• Default, guaranty, and governing law provisions</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This type of note is commonly used in private loans, short-term financing,
              business lending, and transactions where flexibility is required.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Due on Demand Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              This document is commonly used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Private loans between individuals</li>
                  <li>• Business or shareholder loans</li>
                  <li>• Short-term or bridge financing</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Situations requiring repayment flexibility</li>
                  <li>• Loans secured by trust rather than fixed schedules</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Due on Demand Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              For clarity and enforceability, the note should contain the following:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Loan Terms
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Principal amount</li>
                  <li>• Interest rate</li>
                  <li>• Interest accrual date</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Demand Repayment
                </h3>
                <p className="text-gray-700">
                  The lender may require full repayment of principal and accrued
                  interest at any time by making a demand for payment.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Default and Collection Costs
                </h3>
                <p className="text-gray-700">
                  The note outlines events of default and makes the borrower
                  responsible for collection costs, including attorneys’ fees.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Guaranty and Governing Law
                </h3>
                <p className="text-gray-700">
                  A guarantor may secure the loan, and the note specifies which
                  state’s laws govern its interpretation.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Due on Demand Promissory Note
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Legalgram makes it easy to create a clear and enforceable promissory note:
            </p>
            
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter borrower, lender, and guarantor details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Specify the loan amount, interest rate, and accrual date.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Customize default, guaranty, and governing law terms.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and execute the note.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                This document helps protect both lender and borrower by clearly defining expectations.
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
                  ✅ What does “due on demand” mean?
                </h3>
                <p className="text-green-800">
                  It means the lender can request full repayment at any time, and
                  the borrower must pay once the demand is made.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Can the borrower prepay the loan?
                </h3>
                <p className="text-blue-800">
                  Yes. The borrower may prepay all or part of the loan at any time
                  without penalty, provided accrued interest is paid.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Is a guarantor required?
                </h3>
                <p className="text-purple-800">
                  A guarantor is optional but provides additional security by
                  guaranteeing repayment if the borrower defaults.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ What happens if the borrower defaults?
                </h3>
                <p className="text-orange-800">
                  The entire balance may become immediately due, and the borrower
                  may be responsible for collection costs and legal fees.
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
                <li>1. Review all loan and interest terms carefully.</li>
                <li>2. Ensure all parties sign and date the document.</li>
                <li>3. Provide copies to the borrower, lender, and guarantor.</li>
                <li>4. Store the original note securely.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Due on Demand Promissory Note
            </h2>
            <p className="text-xl mb-6">
              Draft a professional, flexible promissory note that protects your interests.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/due-on-demand-promissory-note')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Promissory Note
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear terms. Flexible repayment. Legally sound.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DueOnDemandPromissoryNoteInfo;
