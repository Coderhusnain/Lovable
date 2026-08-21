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

const OfferToLeaseInfo: React.FC = () => {
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

export default OfferToLeaseInfo;
