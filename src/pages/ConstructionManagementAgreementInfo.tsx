import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, ClipboardList, FileText, Shield, Users } from "lucide-react";

const ConstructionManagementAgreementInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define management responsibilities",
    "Avoid disputes between owner and construction manager",
    "Establish project timelines and expectations",
    "Ensure proper coordination of contractors and resources",
    "Protect both parties legally",
  ];

  const whenToUse = [
    "You are hiring a construction manager for a project",
    "You are providing construction management services",
    "You need to oversee large-scale construction work",
    "You want to define project timelines and supervision roles",
    "You want legal protection before starting the project",
  ];

  const keyFeatures = [
    {
      title: "1. Parties Details",
      body: "Identifies the client and construction manager",
    },
    {
      title: "2. Scope of Services",
      body: "Defines planning, supervision, and coordination duties",
    },
    {
      title: "3. Project Timeline",
      body: "Specifies milestones and completion schedule",
    },
    {
      title: "4. Fees & Payment Terms",
      body: "Outlines compensation structure and payment schedule",
    },
    {
      title: "5. Confidentiality Clause",
      body: "Protects sensitive project information",
    },
    {
      title: "6. Liability & Dispute Resolution",
      body: "Ensures legal protection and conflict resolution",
    },
  ];

  const contractTypes = [
    "Construction management at risk",
    "Agency construction management",
    "Program management",
    "Owner’s representative agreement",
  ];

  const faqs = [
    {
      q: "Do I need a Construction Management Agreement?",
      a: "Yes. A Construction Management Agreement from Legalgram helps avoid confusion and ensures smooth project execution.",
    },
    {
      q: "What should be included in a Construction Management Agreement?",
      a: "A draft Construction Management Agreement should include services, timeline, fees, and legal clauses.",
    },
    {
      q: "Is a Construction Management Agreement legally binding?",
      a: "Yes. Once signed, the Construction Management Agreement on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the agreement?",
      a: "Yes. You can easily download and customize Construction Management Agreement from Legalgram.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Construction Management Agreement Information</h1>
          <p className="text-lg text-gray-600">
            Construction Management Agreement • Construction Manager Agreement • Project Management Agreement
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Construction Management Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A Construction Management Agreement is a legal contract between a property owner and a construction manager that outlines how a construction project will be planned, supervised, and executed.
              </p>
              <p>This draft Construction Management Agreement from Legalgram includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Project description and scope</li>
                <li>Roles and responsibilities of the construction manager</li>
                <li>Timeline and milestones</li>
                <li>Fees and payment terms</li>
                <li>Liability, confidentiality, and dispute clauses</li>
              </ul>
              <p>
                The best format Construction Management Agreement from Legalgram ensures clarity, efficiency, and legal protection for both parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Construction Management Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                Creating a draft Construction Management Agreement is essential for managing large or complex projects. With Legalgram, you can:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {whyYouNeed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Get your free download Construction Management Agreement from Legalgram today and manage your project with confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Construction Management Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>You should download and draft a Construction Management Agreement when:</p>
              <ul className="list-disc list-inside space-y-1">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The Construction Management Agreement on Legalgram is ideal for property owners, developers, and construction managers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Construction Management Agreement Format
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
                How Does a Construction Management Agreement Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A draft Construction Management Agreement from Legalgram works by clearly documenting all responsibilities and expectations before the project begins.
              </p>
              <p>It ensures:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Efficient management of construction activities</li>
                <li>Clear communication between parties</li>
                <li>Legal protection in case of disputes</li>
              </ul>
              <p>
                Download Construction Management Agreement from Legalgram to ensure your project is handled professionally and efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Construction Management Agreements</CardTitle>
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
              <CardTitle>Construction Management Agreement FAQs</CardTitle>
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
              <CardTitle>Construction Management Agreement Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>Follow these steps to complete your Construction Management Agreement on Legalgram:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Make your Construction Management Agreement</p>
                    <p>Customize your draft Construction Management Agreement with project details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Review your document</p>
                    <p>Ensure all terms and responsibilities are clearly defined.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Sign your Agreement</p>
                    <p>This Construction Management Agreement from Legalgram must be signed by:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>The client</li>
                      <li>The construction manager</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Store and Share</p>
                    <p>Keep a secure copy of your Construction Management Agreement on Legalgram.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Construction Management Agreement - Legalgram</CardTitle>
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
              <CardTitle>Ready to Create Your Construction Management Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Start the guided form to build a construction management agreement tailored to your project supervision, responsibilities, and payment terms.
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

export default ConstructionManagementAgreementInfo;
