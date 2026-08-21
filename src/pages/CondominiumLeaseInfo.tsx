import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, CheckCircle, FileText, Shield } from "lucide-react";

const CondominiumLeaseInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define rental terms and responsibilities",
    "Ensure timely rent payments",
    "Protect landlord and tenant rights",
    "Include HOA and community rules",
    "Avoid legal disputes and misunderstandings",
  ];

  const whenToUse = [
    "You own a condo and want to rent it out",
    "You want a formal tenancy agreement with a tenant",
    "You need to define rent, duration, and conditions",
    "You want to include HOA rules and restrictions",
    "You want legal protection for your rental property",
  ];

  const keyFeatures = [
    {
      title: "1. Parties Details",
      body: "Full details of landlord and tenant",
    },
    {
      title: "2. Property Description",
      body: "Complete address and details of the condominium",
    },
    {
      title: "3. Lease Term",
      body: "Defines start date, duration, and renewal terms",
    },
    {
      title: "4. Rent & Payment Terms",
      body: "Specifies rent amount, due date, and penalties",
    },
    {
      title: "5. HOA & Community Rules",
      body: "Includes rules for pets, guests, parking, and facilities",
    },
    {
      title: "6. Maintenance & Utilities",
      body: "Clarifies responsibilities for repairs and services",
    },
  ];

  const faqs = [
    {
      q: "Is a Condominium Lease Agreement legally binding?",
      a: "Yes. A properly signed Condominium Lease Agreement from Legalgram is enforceable by law.",
    },
    {
      q: "Who should use a Condominium Lease Agreement?",
      a: "Property owners renting out condos and tenants seeking a formal tenancy agreement.",
    },
    {
      q: "What should be included in a Condominium Lease Agreement?",
      a: "A draft Condominium Lease Agreement should include rent, duration, property details, and rules.",
    },
    {
      q: "Can I customize the Condominium Lease Agreement?",
      a: "Yes. You can easily download and customize Condominium Lease Agreement from Legalgram.",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Condominium Lease Agreement</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Condominium Lease Agreement information
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              What is a Condominium Lease Agreement?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              A Condominium Lease Agreement is a legal contract between a condo owner (landlord) and a tenant that defines the terms of renting a residential condominium.
            </p>
            <p className="text-gray-700">This draft Condominium Lease Agreement from Legalgram includes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Property details and address</li>
              <li>Landlord and tenant information</li>
              <li>Lease duration and tenancy terms</li>
              <li>Rent amount and payment schedule</li>
              <li>Utilities, maintenance, and HOA rules</li>
            </ul>
            <p className="text-gray-700">
              The best format Condominium Lease Agreement from Legalgram ensures clarity, compliance, and legal protection for both parties.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              Why You Need a Condominium Lease Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Condominium Lease Agreement is essential for protecting your property and avoiding disputes. With Legalgram, you can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {whyYouNeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              Get your free download tenancy agreement and Condominium Lease Agreement from Legalgram today.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              When to Use a Condominium Lease Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">You should download and draft a Condominium Lease Agreement when:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              The Condominium Lease Agreement on Legalgram is ideal for property owners and tenants.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              Key Features of the Best Condominium Lease Agreement Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {keyFeatures.map((item) => (
                <div key={item.title} className="rounded-lg border p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-700 text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              How Does a Condominium Lease Agreement Work?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              A draft Condominium Lease Agreement from Legalgram works by clearly documenting all rental terms before the tenant occupies the property.
            </p>
            <p className="text-gray-700">It ensures:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Transparency between landlord and tenant</li>
              <li>Compliance with local rental laws</li>
              <li>Legal protection in case of disputes</li>
            </ul>
            <p className="text-gray-700">
              Download Condominium Lease Agreement from Legalgram to manage your rental professionally.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Condominium Lease Agreement FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-lg border p-4">
                <h4 className="font-semibold text-gray-900">{faq.q}</h4>
                <p className="text-gray-700 mt-1">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Condominium Lease Agreement - Legalgram</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Professionally drafted",
                "Easy to customize",
                "Legally reliable format",
                "Instant download",
              ].map((item) => (
                <li className="flex items-start" key={item}>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready to Create Your Condominium Lease Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Start the guided form to generate a customized condominium lease agreement for your rental terms and property details.
            </p>
            <Button onClick={() => navigate('/documents/condominium-lease')} className="w-full md:w-auto">
              <FileText className="w-4 h-4 mr-2" />
              Start Creating Your Agreement
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CondominiumLeaseInfo;
