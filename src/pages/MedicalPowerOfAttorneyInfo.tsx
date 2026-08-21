import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Heart, Lock } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const MedicalPowerOfAttorneyInfo: React.FC = () => {
  const navigate = useNavigate();
  
  // Get the Medical Power of Attorney from database
  const doc = documentContent["Medical Power of Attorney"] || documentContent["default"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line leading-relaxed">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Other Names</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {doc.otherNames.map((name) => (
                    <span key={name} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      • {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What We'll Cover Section */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We'll Cover</h2>
            <ul className="space-y-3">
              {[
                "About the Medical Power of Attorney Agreement",
                "Medical Power of Attorney FAQs",
                "Medical Power of Attorney Checklist",
                "Medical Power of Attorney by State"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When Should You Use a Medical Power of Attorney Agreement?
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
                What You Need for Your Medical Power of Attorney
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Medical Powers of Attorney Section */}
          <div className="mb-12 bg-white border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Medical Powers of Attorney</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Appointment of Alternate Agents</h3>
                <p className="text-gray-700 text-sm leading-relaxed">You may designate one or more alternate agents in case your primary agent is unwilling or unable to act. Each alternate agent has the same authority as the original agent.</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Organ Donation and Anatomical Gifts</h3>
                <p className="text-gray-700 text-sm leading-relaxed">The agreement allows you to clearly document your wishes regarding organ and tissue donation. You may authorize donation of specific organs, tissues, or your entire body for transplantation, therapy, research, or medical education.</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Artificial Nutrition and Hydration</h3>
                <p className="text-gray-700 text-sm leading-relaxed">You may specify whether you wish to receive food and water through artificial means such as feeding tubes or intravenous methods.</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Autopsy Authorization</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Your agent may be granted authority to consent to or refuse an autopsy, subject to applicable law.</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Choosing Your Agent</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Your agent must be a trusted adult. In most jurisdictions, your healthcare provider cannot act as your agent unless closely related to you.</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Scope of Agent's Authority</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Your agent generally has broad authority to make healthcare decisions; however, you may limit or expand these powers within the agreement.</p>
              </div>
            </div>
          </div>

          {/* Medical POA vs Living Will vs Advance Directive */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Power of Attorney vs Living Will vs Advance Directive</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">📋</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Medical Power of Attorney Agreement</h3>
                  <p className="text-gray-700 text-sm">Authorizes a person to make medical decisions on your behalf if you are incapacitated.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">📝</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Living Will</h3>
                  <p className="text-gray-700 text-sm">Focuses specifically on end-of-life care preferences.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">⚖️</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Advance Health Care Directive</h3>
                  <p className="text-gray-700 text-sm">Combines both a Medical POA and a Living Will into a single document.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-300 mt-4">
                <p className="text-gray-900 font-semibold text-sm">💡 Recommendation: If you are unsure which document is appropriate, a Medical Power of Attorney Agreement offers broader protection and flexibility.</p>
              </div>
            </div>
          </div>

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Protections & Authority</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Power of Attorney FAQs</h2>
              <div className="space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-blue-700">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 flex gap-4">
            <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Legal Disclaimer</h3>
              <p className="text-blue-800 text-sm">
                A Medical Power of Attorney is an important healthcare document that provides legal protection for both you and your appointed agent. Requirements and best practices vary by jurisdiction and individual health circumstances. This template is designed as a general reference. For complex medical situations or jurisdiction-specific concerns, consult with a qualified attorney to ensure the agreement complies with your state's healthcare laws and includes all necessary provisions for your specific medical needs and preferences.
              </p>
            </div>
          </div>

          {/* Medical POA Checklist Section */}
          <div className="bg-white border border-blue-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Power of Attorney Checklist</h2>
            <ul className="space-y-3">
              {[
                "Create your Medical Power of Attorney Agreement",
                "Review and customize the document",
                "Sign with witnesses and/or notarization",
                "Distribute copies to healthcare providers and agents",
                "Update the agreement when circumstances change"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Power of Attorney by State Section */}
          <div className="mb-12 bg-white border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Power of Attorney by State</h2>
            <p className="text-gray-700 mb-6">
              Medical Power of Attorney requirements vary by state. Each state has specific rules about:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Witness requirements (2 or 3 witnesses)",
                "Notarization requirements",
                "Specific forms required by your state",
                "Recording and filing requirements",
                "Specific statutory language needed",
                "Restrictions on who can be an agent"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-900 font-semibold text-sm mb-2">⚖️ State-Specific Guidelines:</p>
              <p className="text-gray-700 text-sm">
                To ensure your Medical Power of Attorney is valid in your state, review your state's specific requirements or consult with a local attorney. Our templates are designed to meet most state requirements, but state laws vary. Using a state-specific form or having your document reviewed by a legal professional ensures compliance with your local laws and strengthens enforceability.
              </p>
            </div>
          </div>

          {/* Download Medical Power of Attorney Section */}
          <div className="mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Download Medical Power of Attorney Agreement – Legalgram</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "✔ Best format of Medical Power of Attorney Agreement",
                "✔ Easy to customize",
                "✔ Legally structured draft",
                "✔ Free download Medical Power of Attorney Agreement",
                "✔ Medical Power of Attorney Agreement on Legalgram",
                "✔ Professionally drafted and legally structured"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-white text-lg">●</span>
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white text-sm mb-6 leading-relaxed">
              Download your Medical Power of Attorney Agreement today from Legalgram. Our comprehensive templates provide professional legal documentation that is easy to customize and ready for immediate use. Get the protection and peace of mind you need with our expertly crafted Medical Power of Attorney Agreement.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/medical-power-of-attorney")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3"
            >
              Download Medical Power of Attorney
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

export default MedicalPowerOfAttorneyInfo;
