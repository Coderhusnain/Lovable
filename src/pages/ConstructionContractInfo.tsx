import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, CheckCircle, ClipboardList, FileText, Shield } from "lucide-react";

const ConstructionContractInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define work scope and expectations",
    "Avoid confusion about pricing and payments",
    "Set timelines and project milestones",
    "Protect both contractor and property owner legally",
    "Manage risks such as delays and material shortages",
  ];

  const whenToUse = [
    "You are a contractor handling construction or renovation work",
    "You are hiring a contractor for a project",
    "You want to define scope, materials, and timelines",
    "You need clear payment and milestone terms",
    "You want legal protection before starting construction",
  ];

  const keyFeatures = [
    {
      title: "1. Parties Details",
      body: "Identifies contractor and property owner",
    },
    {
      title: "2. Scope of Work",
      body: "Defines construction services, materials, and specifications",
    },
    {
      title: "3. Project Timeline",
      body: "Includes start date, milestones, and completion date",
    },
    {
      title: "4. Contract Price & Payment Terms",
      body: "Specifies total cost, installment payments, or milestones",
    },
    {
      title: "5. Insurance & Liability",
      body: "Covers general liability and workers’ compensation",
    },
    {
      title: "6. Dispute Resolution",
      body: "Includes mediation, arbitration, and legal remedies",
    },
  ];

  const contractTypes = [
    "Lump Sum Contract",
    "Time & Materials Contract",
    "Cost Plus Contract",
    "Unit Price Contract",
    "Guaranteed Maximum Price Contract",
  ];

  const faqs = [
    {
      q: "Why is a Construction Contract important?",
      a: "A Construction Contract from Legalgram prevents disputes, defines responsibilities, and ensures timely completion.",
    },
    {
      q: "What should a Construction Contract include?",
      a: "A draft Construction Contract should include scope, cost, timeline, and legal clauses.",
    },
    {
      q: "Is a Construction Contract legally binding?",
      a: "Yes. Once signed, the Construction Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Construction Contract?",
      a: "Yes. You can easily download and customize Construction Contract from Legalgram.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => navigate("/documents")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Construction Contract Information</h1>
          <p className="text-lg text-gray-600">
            Construction Contract • Construction Agreement • Contractor Agreement
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Construction Contract?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A Construction Contract is a legal agreement between a contractor and a property owner that defines all aspects of a construction project.
              </p>
              <p>This draft Construction Contract from Legalgram includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Project scope and specifications</li>
                <li>Roles and responsibilities of both parties</li>
                <li>Cost estimates and payment schedule</li>
                <li>Timeline and milestones</li>
                <li>Terms for delays, disputes, and unexpected events</li>
              </ul>
              <p>
                The best format Construction Contract from Legalgram ensures clarity, transparency, and legal protection for all parties involved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Construction Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                Creating a draft Construction Contract is essential for avoiding disputes and ensuring project success. With Legalgram, you can:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {whyYouNeed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Get your free download Construction Contract from Legalgram today and secure your construction project.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Construction Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>You should download and draft a Construction Contract when:</p>
              <ul className="list-disc list-inside space-y-1">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The Construction Contract on Legalgram is ideal for homeowners, builders, and contractors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Construction Contract Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="rounded-lg border p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-700 text-sm">{feature.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How Does a Construction Contract Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A draft Construction Contract from Legalgram works by clearly documenting all agreed project terms before construction begins.
              </p>
              <p>It ensures:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Smooth execution of the construction project</li>
                <li>Clear communication between contractor and owner</li>
                <li>Legal protection in case of disputes or delays</li>
              </ul>
              <p>
                Download Construction Contract from Legalgram to manage your construction work professionally and securely.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Construction Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {contractTypes.map((item) => (
                  <div key={item} className="rounded-lg border p-4 bg-gray-50 text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Construction Contract FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border p-4 bg-white">
                  <h4 className="font-semibold text-gray-900">{faq.q}</h4>
                  <p className="text-gray-700 mt-1">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Construction Contract Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>Follow these steps to complete your Construction Contract on Legalgram:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Make your Construction Contract</p>
                    <p>Customize your draft Construction Contract with project details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Review your document</p>
                    <p>Ensure all terms, costs, and timelines are accurate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Sign your Agreement</p>
                    <p>This Construction Contract from Legalgram must be signed by:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Contractor (or company representative)</li>
                      <li>Property owner</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Store and Share</p>
                    <p>Keep a secure copy of your Construction Contract on Legalgram.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Construction Contract - Legalgram</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Professionally drafted",
                  "Easy to customize",
                  "Legally reliable format",
                  "Instant download",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to Create Your Construction Contract?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Start the guided form to build a construction contract tailored to your project scope, timeline, and payment terms.
              </p>
              <Button onClick={() => navigate("/documents") }>
                <FileText className="w-4 h-4 mr-2" />
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConstructionContractInfo;