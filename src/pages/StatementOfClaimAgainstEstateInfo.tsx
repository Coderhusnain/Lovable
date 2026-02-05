import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const StatementOfClaimAgainstEstateInfo = () => {
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
              What Is a Statement of Claim Against an Estate?
            </h1>
            <p className="text-xl text-gray-600">
              A formal court filing used to assert a debt owed by a deceased person’s estate
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Statement of Claim Against Estate is a legal document filed in probate
              court by a creditor who believes they are owed money by a deceased person’s
              estate. It formally notifies the court and the personal representative of
              the debt and requests payment from estate assets.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Statement of Claim typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Court and case information</li>
                <li>• Identification of the estate and claimant</li>
                <li>• Amount owed and basis of the debt</li>
                <li>• Supporting exhibits and proof</li>
                <li>• Sworn affirmation by the claimant</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Filing a claim ensures that a creditor’s rights are preserved during
              probate and that legitimate debts are considered before assets are
              distributed to heirs.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Statement of Claim
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use a Statement of Claim Against Estate when:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• A deceased person owed you money</li>
                  <li>• You provided goods, services, or loans to the decedent</li>
                  <li>• You need to formally assert creditor rights in probate</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want payment before estate distribution</li>
                  <li>• Probate court requires formal creditor filings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of the Claim
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be valid and enforceable, a Statement of Claim should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Creditor Identification
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Claimant name and contact details</li>
                  <li>• Relationship to the estate</li>
                  <li>• Court case number</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Amount and Basis of Debt
                </h3>
                <p className="text-gray-700">
                  The exact amount owed and the obligation giving rise to the claim
                  must be clearly stated.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Supporting Exhibits
                </h3>
                <p className="text-gray-700">
                  Contracts, invoices, notes, or judgments supporting the debt
                  should be attached as exhibits.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Sworn Affirmation
                </h3>
                <p className="text-gray-700">
                  The claimant must swear that the claim is true and correct under
                  penalty of law.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Statement of Claim
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              With Legalgram, filing a Statement of Claim Against Estate is simple:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter court and estate information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Describe the debt and amount owed.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Upload supporting documents as exhibits.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and file with the court.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                Proper filing protects your creditor rights during probate.
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
                  ✅ Is this claim legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. Once filed and sworn, it formally asserts a debt in probate court.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Do I need to attach proof?
                </h3>
                <p className="text-blue-800">
                  Yes. Supporting documents strengthen and validate your claim.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ When must the claim be filed?
                </h3>
                <p className="text-purple-800">
                  Deadlines vary by state, so claims must be filed promptly after notice of probate.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Should I keep copies?
                </h3>
                <p className="text-orange-800">
                  Yes. Always keep signed and filed copies for your records.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Claim
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all information carefully.</li>
                <li>2. Attach all exhibits.</li>
                <li>3. Sign the affirmation.</li>
                <li>4. File with the probate court and keep copies.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Statement of Claim Now
            </h2>
            <p className="text-xl mb-6">
              Assert your creditor rights in probate court quickly and properly.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/statement-of-claim-against-estate")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Claim
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Protect your interest. Preserve your claim. Stay compliant.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default StatementOfClaimAgainstEstateInfo;
