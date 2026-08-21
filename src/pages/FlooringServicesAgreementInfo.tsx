import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, FileText, Hammer, Shield, Users } from "lucide-react";

export default function FlooringServicesAgreementInfo() {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define scope of flooring services",
    "Avoid disputes over pricing and materials",
    "Establish timelines and expectations",
    "Protect both contractor and client legally",
    "Ensure smooth project execution",
  ];

  const whenToUse = [
    "You are hiring a contractor for flooring installation or repair",
    "You are providing flooring services to a client",
    "You want to define materials, scope, and deadlines",
    "You need clear payment terms and schedules",
    "You want legal protection before starting work",
  ];

  const keyFeatures = [
    { title: "1. Parties Details", body: "Identifies contractor and property owner" },
    { title: "2. Scope of Work", body: "Defines flooring tasks such as installation or repair" },
    { title: "3. Materials & Specifications", body: "Details type of flooring materials and quality" },
    { title: "4. Project Timeline", body: "Specifies start date and completion schedule" },
    { title: "5. Fees & Payment Terms", body: "Outlines cost, deposits, and payment schedule" },
    { title: "6. Liability & Warranty", body: "Covers workmanship guarantees and dispute resolution" },
  ];

  const faqs = [
    {
      q: "Should I use a Flooring Contract for every project?",
      a: "Yes. A Flooring Contract from Legalgram ensures clarity and protection for all projects.",
    },
    {
      q: "What should be included in a Flooring Contract?",
      a: "A draft Flooring Contract should include scope, materials, cost, and timeline.",
    },
    {
      q: "Is a Flooring Contract legally binding?",
      a: "Yes. Once signed, the Flooring Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Flooring Contract?",
      a: "Yes. You can easily download and customize Flooring Contract from Legalgram.",
    },
  ];

  const contractTypes = [
    "Installation projects",
    "Repair and replacement work",
    "Maintenance agreements",
    "Residential or commercial flooring jobs",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => navigate("/documents")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Hammer className="h-8 w-8 text-yellow-700" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flooring Contract Information</h1>
          <p className="text-lg text-gray-600">Flooring Services Agreement • Flooring Contract • Flooring Agreement</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Flooring Contract?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A Flooring Contract is a legal agreement that defines the terms under which flooring services are provided.
              </p>
              <p>This draft Flooring Contract from Legalgram includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Details of contractor and client</li>
                <li>Scope of flooring work (installation, repair, maintenance)</li>
                <li>Materials and specifications</li>
                <li>Project timeline and deadlines</li>
                <li>Cost and payment schedule</li>
              </ul>
              <p>
                The best format Flooring Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Flooring Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                Creating a draft Flooring Contract is essential for avoiding misunderstandings and ensuring project success. With Legalgram, you can:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {whyYouNeed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Get your free download Flooring Contract from Legalgram today and secure your project.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Flooring Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>You should download and draft a Flooring Contract when:</p>
              <ul className="list-disc list-inside space-y-1">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The Flooring Contract on Legalgram is ideal for contractors, homeowners, and businesses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Flooring Contract Format
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
                How Does a Flooring Contract Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A draft Flooring Contract from Legalgram works by clearly documenting all agreed terms before the project begins.
              </p>
              <p>It ensures:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear communication between contractor and client</li>
                <li>Proper execution of flooring work</li>
                <li>Legal protection in case of disputes</li>
              </ul>
              <p>
                Download Flooring Contract from Legalgram to manage your flooring project professionally and efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Flooring Contracts</CardTitle>
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
              <CardTitle>Flooring Contract FAQs</CardTitle>
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
              <CardTitle>Download Flooring Contract - Legalgram</CardTitle>
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
              <CardTitle>Ready to Create Your Flooring Contract?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Start the guided form to build a flooring contract tailored to your project scope, materials, deadlines, and payment terms.
              </p>
              <Button onClick={() => navigate("/flooring-services-agreement-form")} className="bg-yellow-600 hover:bg-yellow-700">
                <FileText className="w-4 h-4 mr-2" />
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}