import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, UtensilsCrossed, Lock } from "lucide-react";

// ============================================================
// COMPLETE FOOD SERVICE CONTRACT DATA - HARDCODED DIRECTLY
// ============================================================
const doc = {
  title: "Food Service Contract",
  otherNames: ["Food Service Agreement"],
  whatIs: "A Food Service Contract is a legally binding agreement between a food service provider (such as a caterer, restaurant, or food vendor) and a client. This agreement clearly outlines the responsibilities, payment terms, food preparation details, and service expectations between both parties.\n\nA Food Service Agreement is used when a business or individual hires a food service provider to supply meals, catering, or ongoing food services. This agreement defines:\n• The type of food services provided\n• Payment terms and invoicing\n• Duration of the service\n• Responsibilities of each party\n• Cleanup and equipment usage\n• Liability and dispute resolution\n\nA well-drafted Food Service Agreement on Legalgram helps prevent misunderstandings and protects both the service provider and the client.",
  whenToUse: [
    "You are hiring a caterer or food service provider",
    "You operate a restaurant or food business offering catering services",
    "You are providing food for corporate events, weddings, or parties",
    "You want written terms for food preparation and service",
    "Using a Food Service Agreement template ensures professionalism and legal protection"
  ],
  faqs: [
    {
      q: "Why Is a Food Service Agreement Important?",
      a: "Creating a Food Service Contract provides the following benefits:\n✔ Clear expectations for both parties\n✔ Defined payment terms and timelines\n✔ Protection against disputes and non-payment\n✔ Clearly assigned responsibilities\n✔ Legal enforceability\n\nWithout a proper agreement, disagreements over service quality, timing, or payment can easily arise. If you are looking for a Food Service Agreement in the best legal format, you can download a free Food Service Contract on Legalgram, professionally drafted and easy to customize for your needs."
    },
    {
      q: "What Does a Food Service Contract Include?",
      a: "A professionally drafted Food Service Agreement on Legalgram typically includes:\n\n🔹 Party Information\nNames and addresses of the client and food service provider.\n\n🔹 Scope of Services\nDetails of food preparation, delivery, setup, and cleanup.\n\n🔹 Payment Terms\nService fees, payment schedules, deposits, and late fees.\n\n🔹 Duration of Agreement\nStart and end date of the food service engagement.\n\n🔹 Legal Clauses\nIndependent contractor status, liability, indemnity, and dispute resolution.\n\n🔹 Governing Law\nState law governing the agreement."
    },
    {
      q: "Why Download a Food Service Agreement from Legalgram?",
      a: "When you download a Food Service Agreement from Legalgram, you get:\n\n✅ Professionally drafted legal format\n✅ SEO-optimized and legally structured\n✅ Editable Word & PDF formats\n✅ Free Food Service Agreement download\n✅ Suitable for caterers, restaurants, and vendors\n✅ Easy to customize and reuse\n\nOur agreements are designed to meet business and legal standards while remaining simple to use."
    },
    {
      q: "How Much Does a Food Service Contract Cost?",
      a: "Hiring a lawyer to draft a Food Service Contract may cost hundreds of dollars.\n\nWith Legalgram, you can:\n\n✔ Draft a Food Service Agreement for free\n✔ Customize it online\n✔ Download instantly\n✔ Use it for multiple clients"
    },
    {
      q: "What to Do After Creating Your Food Service Agreement?",
      a: "Once your Food Service Contract is ready:\n\n1. Review the terms carefully\n2. Share it with the client\n3. Sign the agreement (digitally or manually)\n4. Keep a copy for your records\n5. Begin services with confidence\n\nYou can also download the Food Service Agreement as a PDF or Word file."
    },
    {
      q: "Can My Food Service Agreement Be Reviewed by a Lawyer?",
      a: "Yes. If you want extra protection, you can have your Food Service Contract reviewed by a legal professional. Legalgram also offers access to legal guidance for business agreements."
    }
  ],
  keyProtections: [
    "Clear expectations for both parties",
    "Defined payment terms and timelines",
    "Protection against disputes and non-payment",
    "Clearly assigned responsibilities",
    "Legal enforceability",
    "Scope of services clearly defined",
    "Equipment and liability terms",
    "Dispute resolution procedures",
    "Professional service standards",
    "Written agreement protection"
  ],
  whatYouNeed: [
    "Names and addresses of both parties",
    "Details of food services to be provided",
    "Food preparation specifications and dietary requirements",
    "Delivery and setup requirements",
    "Service fees and payment terms",
    "Payment schedule and invoice details",
    "Duration of service contract",
    "Cleanup and equipment usage terms",
    "Liability and indemnification clauses",
    "Dispute resolution procedures",
    "Cancellation and refund policy",
    "Governing law and jurisdiction"
  ],
  estimatedTime: "10-15 minutes"
};

const FoodServiceContractInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12">
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
                  <span key={name} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
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
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-orange-700">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8 flex gap-4">
            <Lock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Legal Disclaimer</h3>
              <p className="text-yellow-800 text-sm">
                A Food Service Contract is an important agreement for food service providers and clients. Requirements and best practices vary by jurisdiction, food type, and client needs. This template is designed as a general reference. For high-value contracts, specialized catering services, or jurisdiction-specific concerns, consult with a qualified attorney to ensure the agreement complies with food service regulations and includes all necessary provisions for your specific situation.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/food-service-contract")}
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white px-8 py-3"
            >
              Download Food Service Contract
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

export default FoodServiceContractInfo;
