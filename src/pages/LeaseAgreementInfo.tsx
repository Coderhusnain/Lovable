import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Building2, Lock } from "lucide-react";

// ============================================================
// COMPLETE OFFER TO LEASE DATA - HARDCODED DIRECTLY
// ============================================================
const doc = {
  title: "Offer to Lease Agreement",
  otherNames: ["Offer to Lease Commercial Property", "Commercial Offer to Lease Agreement", "Offer to Lease Form"],
  whatIs: "An Offer to Lease Agreement is a preliminary legal document used when a tenant proposes to lease commercial property from a landlord. This Offer to Lease Agreement outlines the essential terms that will later form part of the final commercial lease, helping both parties reach clarity before signing a formal tenancy contract.\n\nWhen your business is ready to move into a professional or commercial space, an Offer to Lease Commercial Property is the first and most important step. It establishes the foundation for the formal lease and ensures that the tenant and landlord are aligned on key issues such as rent, permitted use, possession, alterations, and compliance requirements.\n\nAn Offer to Lease Agreement is legally binding once accepted. That is why it is considered the best format of Offer to Lease Agreement for commercial negotiations.\n\nYou can access a free download Offer to Lease Agreement on Legalgram, professionally drafted for commercial use.",
  whenToUse: [
    "You want to make a formal offer to lease commercial property",
    "You need to outline core lease terms before signing a final Commercial Lease",
    "You are negotiating terms and making offers or counter-offers with a landlord or property manager",
    "The Offer to Lease Agreement is fully customizable and terms automatically update based on your information",
    "You want to establish clarity before entering into a full lease agreement"
  ],
  faqs: [
    {
      q: "Why Use an Offer to Lease Agreement?",
      a: "A well-drafted Offer to Lease Agreement allows parties to define the commercial terms clearly before entering into a full lease. It provides flexibility to negotiate conditions and protects the tenant from unexpected obligations later.\n\nThis document typically works alongside a draft tenancy agreement and allows tenants to identify landlord responsibilities—such as repairs, compliance issues, or utility readiness—before any rent payments begin."
    },
    {
      q: "When Should You Use an Offer to Lease Agreement?",
      a: "You should use an Offer to Lease Agreement if:\n• You want to make a formal offer to lease commercial property\n• You need to outline core lease terms before signing a final Commercial Lease\n• You are negotiating terms and making offers or counter-offers with a landlord or property manager\n\nThe Offer to Lease Agreement available on Legalgram is fully customizable. The terms in your document automatically update based on the information you provide."
    },
    {
      q: "Why Download an Offer to Lease Agreement from Legalgram?",
      a: "When you download an Offer to Lease Agreement from Legalgram, you get:\n\n✅ Professionally drafted legal language\n✅ Easy to customize and execute\n✅ Suitable for all types of commercial property\n✅ Complements your download tenancy agreement\n✅ Trusted format for landlords and tenants\n\nThe Offer to Lease Agreement on Legalgram is designed to reduce disputes and streamline commercial lease negotiations."
    },
    {
      q: "Is the Offer to Lease Agreement legally binding?",
      a: "Yes. An Offer to Lease Agreement is legally binding once accepted by both parties. This makes it a critical document that outlines the preliminary terms and conditions for the commercial lease arrangement."
    },
    {
      q: "What key terms should be included in the offer?",
      a: "An Offer to Lease Agreement should include: property description, proposed rent amount and payment terms, lease commencement date, lease term duration, permitted use of the premises, maintenance responsibilities, compliance requirements, alterations allowed, and contact information for both parties."
    },
    {
      q: "Can I modify the Offer to Lease Agreement terms?",
      a: "Yes. The Offer to Lease Agreement is fully customizable. You can negotiate and modify any terms with the landlord or property manager before final acceptance. This flexibility is one of the key benefits of using a preliminary offer before entering into the full lease."
    }
  ],
  keyProtections: [
    "Clear definition of commercial property being leased",
    "Specified rental amount and payment terms",
    "Lease term duration and commencement date",
    "Permitted use of the premises clearly outlined",
    "Maintenance and repair responsibilities assigned",
    "Compliance requirements and regulatory obligations",
    "Alteration permissions and restrictions",
    "Security deposit and rental increase terms",
    "Tenant and landlord contact information",
    "Legally binding acceptance mechanism"
  ],
  whatYouNeed: [
    "Complete property address and legal description",
    "Landlord or property manager information",
    "Tenant company/individual information",
    "Proposed monthly or annual rent amount",
    "Lease commencement date",
    "Proposed lease term duration (months/years)",
    "Permitted use of the commercial space",
    "Square footage or unit description",
    "Maintenance responsibility allocation",
    "Security deposit amount",
    "Insurance and compliance requirements",
    "Alteration and improvement policies"
  ],
  estimatedTime: "15-20 minutes"
};

const LeaseAgreementInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line leading-relaxed">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What You Need
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Protections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-amber-700">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8 flex gap-4">
            <Lock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Legal Notice</h3>
              <p className="text-amber-800 text-sm">
                An Offer to Lease Agreement is a significant preliminary document in commercial real estate transactions. Requirements and best practices vary by jurisdiction and property type. This template is designed as a general reference for commercial lease offers. For complex commercial arrangements, significant lease terms, or jurisdiction-specific concerns, consult with a qualified real estate attorney to ensure the agreement complies with local commercial lease regulations and includes all necessary protections for your specific situation.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/offer-to-lease")}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3"
            >
              Create Offer to Lease Agreement
            </Button>
            <p className="text-sm text-gray-500">
              Estimated time: {doc.estimatedTime}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaseAgreementInfo;
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Is an Offer to Lease Agreement?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An Offer to Lease Agreement is a preliminary legal document used when a tenant proposes to lease commercial property from a landlord. This agreement outlines the essential terms that will later form part of the final commercial lease, helping both parties reach clarity before signing a formal tenancy contract. When your business is ready to move into professional or commercial space, an Offer to Lease is the first and most important step. It establishes the foundation for the formal lease and ensures that tenant and landlord are aligned on key issues such as rent, permitted use, possession, alterations, and compliance requirements. An Offer to Lease Agreement is legally binding once accepted, making it critical for commercial negotiations.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">Benefits of Using Legalgram:</h3>
              <ul className="text-green-800 space-y-1">
                <li>• Draft commercial lease offers for free</li>
                <li>• Clarify terms before formal lease negotiations</li>
                <li>• Professional documents that protect your business interests</li>
                <li>• Establish clear expectations with landlords upfront</li>
              </ul>
            </div>
          </section>

          {/* When to Use Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              When Should You Use an Offer to Lease Agreement?
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you fall into any of the following categories, it's time to create an Offer to Lease Agreement:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Making a Formal Offer</h4>
                    <p className="text-gray-600 text-sm">You want to make a formal offer to lease commercial property</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Negotiating Terms</h4>
                    <p className="text-gray-600 text-sm">You are negotiating terms and making offers or counter-offers</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Outline Core Terms</h4>
                    <p className="text-gray-600 text-sm">You need to outline core lease terms before signing a final commercial lease</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Establish Clarity</h4>
                    <p className="text-gray-600 text-sm">You want to establish clarity on key commercial terms before finalizing obligations</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What It Includes Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Key Terms Does an Offer to Lease Include?</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              An Offer to Lease Agreement outlines essential commercial terms that will form the foundation of your formal lease. Here are the key sections and terms typically included:
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                  1. Base Rent
                </h3>
                <p className="text-gray-700 mb-2">
                  The primary monthly or annual rent payment for the commercial space.
                </p>
                <p className="text-gray-600 text-sm">
                  Clearly specify rent amounts, payment schedule, and any escalation clauses to avoid disputes.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                  2. Permitted Use
                </h3>
                <p className="text-gray-700">
                  The specific business purposes and activities allowed in the commercial space. Clearly define permitted use to prevent future conflicts about operations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                  3. Lease Commencement Date
                </h3>
                <p className="text-gray-700 mb-2">
                  The date when the tenant can take possession and begin using the property.
                </p>
                <p className="text-gray-600 text-sm">
                  Include specific contingencies for inspections and property condition prior to occupancy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">4. Tenant Improvements</h3>
                <p className="text-gray-700">
                  Modifications and improvements made to the property specifically for the tenant's business use. Clarify who pays for improvements and any allowances provided by the landlord.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                  5. Security Deposit
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>Money held by landlord to cover damages or unpaid rent at lease end. Include:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Deposit amount</li>
                    <li>Terms for handling and return of deposit</li>
                    <li>Conditions under which deposit may be applied</li>
                    <li>Timeline for return after lease ends</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">6. Operating Expenses</h4>
                  <p className="text-gray-700 text-sm">
                    Specify how operating expenses and utilities will be handled. Clarify whether costs are included in rent or billed separately.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">7. Maintenance & Repairs</h4>
                  <p className="text-gray-700 text-sm">
                    Define maintenance and repair responsibilities clearly to avoid unexpected costs. Specify who covers major vs. minor repairs.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">8. Compliance Requirements</h4>
                  <p className="text-gray-700 text-sm">
                    Outline compliance requirements relevant to your business, including permits, licenses, and regulatory obligations.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">9. Renewal & Expansion</h4>
                  <p className="text-gray-700 text-sm">
                    Include flexibility options such as renewal terms, expansion rights, or early termination clauses for your business needs.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">10. Landlord Obligations</h4>
                  <p className="text-gray-700 text-sm">
                    Identify landlord obligations for repairs, compliance, utilities, and other responsibilities to ensure landlord support.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">11. Contingencies</h4>
                  <p className="text-gray-700 text-sm">
                    Include specific contingencies that could delay lease commencement, such as financing approval or property inspections.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Tips Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Commercial Lease Offer Tips & Best Practices</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              When preparing your Offer to Lease, keep these important tips in mind to protect your business interests:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Negotiate All Key Terms Upfront</h4>
                <p className="text-blue-800 text-sm">
                  Address rent, permitted use, improvements, contingencies, and compliance requirements in your offer to avoid disputes later. A comprehensive offer reduces the need for extensive back-and-forth negotiation.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h4 className="font-semibold text-green-900 mb-2">Clearly Define Permitted Use</h4>
                <p className="text-green-800 text-sm">
                  Specify exactly what business activities are allowed. Vague language about permitted use may restrict operations or lead to conflicts about business expansion.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Include Specific Contingencies</h4>
                <p className="text-purple-800 text-sm">
                  Add contingencies for property inspections, financing approval, and any other conditions that could affect lease commencement. This protects you from being locked into unfavorable terms.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h4 className="font-semibold text-orange-900 mb-2">Clarify Financial Obligations</h4>
                <p className="text-orange-800 text-sm">
                  Be explicit about rent, operating expenses, utilities, and who pays for what. Unexpected costs can significantly impact your business budget.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Understand Alteration Permissions</h4>
                  <p className="text-red-800 text-sm">
                    Confirm what alterations and improvements are allowed before planning renovations. Include approval processes and who bears the costs.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Consult a Commercial Real Estate Attorney</h4>
                  <p className="text-indigo-800 text-sm">
                    Before signing, have a qualified attorney review your offer to ensure all business interests are protected and terms are legally sound.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Offer to Lease Agreement FAQs</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Is an Offer to Lease Legally Binding?</h4>
                <p className="text-gray-700 mb-2">
                  Yes. An Offer to Lease becomes legally binding once accepted by both parties.
                </p>
                <p className="text-gray-600 text-sm">
                  This is why it's critical to carefully review all proposed terms before signing and to ensure your interests are fully protected.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Why Do I Need an Offer to Lease?</h4>
                <ul className="text-gray-700 space-y-1 mb-2">
                  <li>• Establishes clear commercial expectations before formal lease</li>
                  <li>• Allows negotiation of key terms in writing</li>
                  <li>• Protects your business interests from the start</li>
                  <li>• Creates a foundation for the final commercial lease</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Skipping an offer to lease increases risks of misaligned expectations, cost overruns, or unfavorable contract terms.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">What Happens After Both Parties Accept the Offer?</h4>
                <p className="text-gray-700 mb-2">
                  Once accepted, the offer becomes binding and the parties move toward preparing a formal commercial lease. The offer typically forms the foundation for the detailed lease document.
                </p>
                <p className="text-gray-600 text-sm">
                  Most commercial dealings proceed with legal representation to ensure the formal lease reflects all agreed terms.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">What Should Be Included in an Offer to Lease for Commercial Space?</h4>
                <p className="text-gray-700 mb-2">To create a comprehensive Offer to Lease, you'll need:</p>
                <ul className="text-gray-700 space-y-1 mb-2">
                  <li>• Base rent amount and payment schedule</li>
                  <li>• Lease commencement date and lease term</li>
                  <li>• Permitted use of the commercial space</li>
                  <li>• Tenant improvement details and allowances</li>
                  <li>• Security deposit amount and terms</li>
                  <li>• Operating expenses and utility responsibilities</li>
                  <li>• Maintenance and repair responsibilities</li>
                  <li>• Compliance and contingency requirements</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Legalgram's Offer to Lease drafting tool guides you through each essential step.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">What Terms Cannot Be Included in an Offer to Lease?</h4>
                <p className="text-gray-700 mb-2">
                  You cannot include illegal, illogical, or unenforceable terms. Ensure all provisions comply with local commercial real estate law and common practice.
                </p>
                <p className="text-gray-600 text-sm">
                  Vague or contradictory terms can lead to legal challenges. Have an attorney review before finalizing.
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Are the Next Steps After Creating Your Offer?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-bright-orange-100 text-bright-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Review Your Offer Thoroughly</h4>
                  <p className="text-gray-700">Double-check all terms, rent amounts, dates, and contingencies for accuracy and completeness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-bright-orange-100 text-bright-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Consult with an Attorney</h4>
                  <p className="text-gray-700">Have a commercial real estate attorney review your offer before submission to ensure legal soundness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-bright-orange-100 text-bright-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Submit to Landlord or Property Manager</h4>
                  <p className="text-gray-700">Formally present your offer in writing to the landlord or their representative for review.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-bright-orange-100 text-bright-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Negotiate & Prepare Final Lease</h4>
                  <p className="text-gray-700">Work with landlord on any counter-offers, then move toward executing the formal commercial lease.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Warning:</h4>
              <p className="text-yellow-800 text-sm">
                An Offer to Lease becomes legally binding once accepted. Carefully review all terms and contingencies before submission. Ensure you understand all financial obligations and compliance requirements. Consult a commercial real estate attorney before finalizing.
              </p>
            </div>
          </section>

          {/* Checklist Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Offer to Lease Checklist by Legalgram</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">Quick Steps to Success:</h3>
              <p className="text-green-800">
                At Legalgram, we make it easy to create, customize, and submit your Offer to Lease Agreement—all online, all compliant, and all at no cost to you. Protect your commercial interests from the start.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Create your Offer to Lease for commercial property</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Use our guided form to draft online for free</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Review and have it reviewed by legal counsel</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Submit to landlord and negotiate terms</span>
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Get Started Today</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">Ready to Create Your Offer to Lease?</h3>
              <p className="text-green-800">
                Get started today and draft your Offer to Lease Agreement for free in just 15-20 minutes. Our guided process ensures you don't miss any important commercial terms.
              </p>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate('/documents/offer-to-lease')}
                className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-8 py-3 text-lg"
              >
                Start Creating Your Offer to Lease
              </Button>
              <p className="text-gray-600 mt-2 text-sm">
                Return to the form to begin the guided process
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="border-t pt-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm">
                <strong>Disclaimer:</strong> This information is provided for educational purposes only and does not constitute legal advice. 
                While our Offer to Lease Agreement template covers essential commercial terms, every commercial real estate situation is unique. 
                Consider consulting with a qualified commercial real estate attorney for complex negotiations, specific legal questions about your jurisdiction's requirements, or issues specific to your business and property.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LeaseAgreementInfo;
