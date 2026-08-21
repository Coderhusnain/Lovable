import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Shield, UserCheck } from "lucide-react";

export default function CoSignerAgreementInfo() {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Provide assurance of rent payments to landlords",
    "Help tenants with low or no credit secure housing",
    "Clearly define financial responsibility",
    "Reduce risk of missed payments",
    "Strengthen lease agreements legally",
  ];

  const whenToUse = [
    "A tenant has low, poor, or no credit history",
    "A tenant is unemployed or financially unstable",
    "A landlord requires additional financial security",
    "A parent, friend, or guarantor agrees to support the tenant",
    "You want to strengthen a lease or tenancy agreement",
  ];

  const keyFeatures = [
    {
      title: "1. Parties Details",
      body: "Information of landlord, tenant, and co-signer",
    },
    {
      title: "2. Financial Guarantee Clause",
      body: "Defines co-signer's responsibility for rent and expenses",
    },
    {
      title: "3. Lease Reference",
      body: "Links the agreement to the main lease or tenancy agreement",
    },
    {
      title: "4. Payment Obligations",
      body: "Specifies rent, utilities, and other financial duties",
    },
    {
      title: "5. Duration of Liability",
      body: "Defines how long the co-signer is responsible",
    },
    {
      title: "6. Legal Protection Clauses",
      body: "Includes dispute resolution and liability terms",
    },
  ];

  const faqs = [
    {
      q: "Is a Co-Signer Agreement legally binding?",
      a: "Yes. A properly signed Co-Signer Agreement from Legalgram is enforceable.",
    },
    {
      q: "Who can be a co-signer?",
      a: "A financially stable individual such as a parent, friend, or guarantor.",
    },
    {
      q: "What does a co-signer agree to?",
      a: "They agree to pay rent or other obligations if the tenant fails.",
    },
    {
      q: "Can I customize the Co-Signer Agreement?",
      a: "Yes. You can easily download and customize Co-Signer Agreement from Legalgram.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Co-Signer Agreement</h1>
        </div>
        <p className="text-xl text-gray-300">
          A legal document where a third party (co-signer) agrees to take financial responsibility for a tenant's obligations under a lease if the tenant fails to pay.
        </p>

        <div className="space-y-6 text-gray-200">
          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white">What is a Co-Signer Agreement?</h2>
            <p>
              A Co-Signer Agreement is a legal document where a third party (co-signer) agrees to take financial responsibility for a tenant's obligations under a lease if the tenant fails to pay.
            </p>
            <p>This draft Co-Signer Agreement from Legalgram includes:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-300">
              <li>Details of the tenant, landlord, and co-signer</li>
              <li>Financial obligations and guarantees</li>
              <li>Rent and payment responsibilities</li>
              <li>Terms linked to the main lease agreement</li>
            </ul>
            <p>
              The best format Co-Signer Agreement from Legalgram ensures security for landlords and support for tenants.
            </p>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white">Why You Need a Co-Signer Agreement</h2>
            <p>
              Creating a draft Co-Signer Agreement is essential in situations where tenants may not meet financial requirements. With Legalgram, you can:
            </p>
            <ul className="space-y-1 list-disc list-inside text-gray-300">
              {whyYouNeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Get your free download Co-Signer Agreement from Legalgram today and protect your rental arrangement.
            </p>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white">When to Use a Co-Signer Agreement</h2>
            <p>You should download and draft a Co-Signer Agreement when:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-300">
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              The Co-Signer Agreement on Legalgram is ideal for landlords, tenants, and guarantors.
            </p>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Key Features of the Best Co-Signer Agreement Format</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {keyFeatures.map((feature) => (
                <div key={feature.title} className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{feature.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white">How Does a Co-Signer Agreement Work?</h2>
            <p>
              A draft Co-Signer Agreement from Legalgram works by adding a financially stable third party who guarantees the tenant's obligations.
            </p>
            <p>It ensures:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-300">
              <li>Landlords receive rent even if the tenant defaults</li>
              <li>Tenants can secure rental property more easily</li>
              <li>Clear legal responsibility for all parties</li>
            </ul>
            <p>
              Download Co-Signer Agreement from Legalgram to make your lease secure and reliable.
            </p>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Co-Signer Agreement Checklist</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Make your Co-Signer Agreement</p>
                  <p className="text-gray-300">Customize your draft Co-Signer Agreement with simple details.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Sign your Agreement</p>
                  <p className="text-gray-300">This Co-Signer Agreement from Legalgram must be signed by:</p>
                  <ul className="list-disc list-inside text-gray-300 mt-1">
                    <li>The landlord</li>
                    <li>All co-signers</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Store and Share</p>
                  <p className="text-gray-300">
                    Keep a secure copy of your Co-Signer Agreement on Legalgram for future use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Co-Signer Agreement FAQs</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  <h3 className="font-semibold text-white">{faq.q}</h3>
                  <p className="text-gray-300 mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-indigo-600 bg-indigo-900/30 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-300" />
              Download Co-Signer Agreement - Legalgram
            </h2>
            <ul className="space-y-1 list-disc list-inside text-indigo-100">
              <li>Professionally drafted</li>
              <li>Easy to customize</li>
              <li>Legally reliable format</li>
              <li>Instant download</li>
            </ul>
          </section>
        </div>

        <Button size="lg" onClick={() => navigate("/co-signer-agreement-form")} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-lg px-8">
          Start Agreement
        </Button>
      </div>
    </div>
  );
}