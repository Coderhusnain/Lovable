import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield, Home } from "lucide-react";

const AffidavitOfSurvivorshipInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">What Is an Affidavit of Survivorship?</h1>
            <p className="text-xl text-gray-600">Complete guide to understanding and creating your Affidavit of Survivorship</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is an Affidavit of Survivorship?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An Affidavit of Survivorship is a legal sworn document used to claim full ownership of jointly owned property after the death of a co-owner. If you owned real estate, bank accounts, or other joint assets with someone who has passed away, this affidavit helps transfer ownership rights to the surviving owner.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              This affidavit is commonly used when a death certificate alone is not enough and an institution, court, or land records office requires additional legal proof.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">An Affidavit of Survivorship usually includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Full name of surviving owner</li>
                <li>• Full name of deceased co-owner</li>
                <li>• Description of jointly owned property</li>
                <li>• Date of death of co-owner</li>
                <li>• Statement of joint ownership rights</li>
                <li>• Claim of survivorship rights</li>
                <li>• Signature before a notary public</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Get your draft Affidavit of Survivorship today from Legalgram with ready-to-use legal format.
            </p>
          </section>

          {/* Other Names Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Other Names</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Survivorship Affidavit</li>
                <li>• Joint Ownership Survivorship Affidavit</li>
                <li>• Property Transfer Survivorship Affidavit</li>
                <li>• Survivorship Affidavit Draft</li>
              </ul>
            </div>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use an Affidavit of Survivorship</h2>
            </div>
            <p className="text-gray-700 mb-4">Use this Affidavit of Survivorship when:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• You jointly owned property with a deceased spouse</li>
                <li>• You jointly owned land or home with a family member who died</li>
                <li>• A bank requires proof to release joint funds</li>
                <li>• Property title needs to be updated after death</li>
                <li>• You want to prepare future ownership documents in advance</li>
              </ul>
            </div>
          </section>

          {/* Why Choose Legalgram Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Why Choose Legalgram?</h2>
            </div>
            <p className="text-gray-700 mb-4">At Legalgram, users can get:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Free download Affidavit of Survivorship</li>
                <li>• Editable Word & PDF format</li>
                <li>• Professionally drafted legal template</li>
                <li>• Instant download document</li>
                <li>• Easy customization online</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you need a trusted Affidavit of Survivorship, choose the best format this affidavit from Legalgram.
            </p>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">How to Create an Affidavit of Survivorship</h2>
            </div>
            <p className="text-gray-700 mb-4">A proper Affidavit of Survivorship should include:</p>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Name of surviving co-owner</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Name of deceased co-owner</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Property details</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Date of death</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Statement of survivorship rights</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                  <span>Signature before a notary public</span>
                </li>
              </ol>
            </div>
          </section>

          {/* Notarization Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Does an Affidavit of Survivorship Need Notarization?</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="text-amber-900">
                Yes, an Affidavit of Survivorship should usually be signed before a notary public to be legally recognized by most offices and institutions.
              </p>
            </div>
          </section>

          {/* Download Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Download Affidavit of Survivorship</h2>
            <p className="text-gray-700 mb-4">
              Prepare and download Affidavit of Survivorship instantly from Legalgram. Our templates are professional, simple to use, and suitable for common legal property matters.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sample Affidavit of Survivorship</h3>
              <p className="text-gray-700">
                Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for affidavits and legal forms.
              </p>
            </div>
            <p className="text-gray-700 font-medium">
              Download Affidavit of Survivorship on Legalgram today.
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Get Your Affidavit of Survivorship from Legalgram</h2>
            <p className="text-xl mb-6">Professional, legally structured, and ready for instant download. Start preparing your Affidavit of Survivorship today.</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/AffidavitOfSurvivorshipForm')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Your Affidavit of Survivorship
            </Button>
            <p className="text-bright-orange-100 mt-4">Easy, affordable, and trusted by thousands.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AffidavitOfSurvivorshipInfo;
