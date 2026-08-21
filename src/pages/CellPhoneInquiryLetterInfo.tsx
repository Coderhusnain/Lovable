import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Phone, AlertCircle, Shield, Mail } from "lucide-react";

const CellPhoneInquiryLetterInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">What Is a Cell Phone Inquiry Letter?</h1>
            <p className="text-xl text-gray-600">Complete guide to disputing billing errors and service complaints</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Cell Phone Inquiry Letter is a formal written request sent by a subscriber to a cellular service provider to seek clarification or correction of billing charges. It is commonly used when a billing statement reflects charges that appear inconsistent with the terms of the subscriber’s service agreement.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">This letter typically includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Account and billing reference details</li>
                <li>• Description of the billing discrepancy</li>
                <li>• A request for written clarification</li>
                <li>• Reference to the service agreement terms</li>
                <li>• Subscriber contact information and signature</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This type of inquiry helps establish a clear written record of the issue and supports timely resolution with the service provider.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">Use this Cell Phone Inquiry Letter when:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• You want to dispute wrong charges on your mobile bill</li>
                <li>• You need refund for billing errors</li>
                <li>• Your phone company provides poor service</li>
                <li>• Calls drop repeatedly or signal remains weak</li>
                <li>• You want written proof of your complaint</li>
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
                <li>• Free download Cell Phone Inquiry Letter</li>
                <li>• Editable Word & PDF format</li>
                <li>• Professionally drafted complaint template</li>
                <li>• Instant download document</li>
                <li>• Easy customization online</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you need a trusted Cell Phone Inquiry Letter, choose the best format this agreement from Legalgram.
            </p>
          </section>

          {/* Key Benefits Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Key Benefits of a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">A proper Cell Phone Inquiry Letter helps:</p>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Record your complaint officially</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Request billing corrections</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Ask for refunds or credits</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Improve customer service response</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Keep written evidence for future disputes</span>
                </li>
              </ol>
            </div>
          </section>

          {/* What to Include Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">What to Include in a Cell Phone Inquiry Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">Your Cell Phone Inquiry Letter should include:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Full name and account number</li>
                <li>• Phone number linked to account</li>
                <li>• Description of billing or service issue</li>
                <li>• Date of disputed charges</li>
                <li>• Request for refund or correction</li>
                <li>• Contact information</li>
              </ul>
            </div>
          </section>

          {/* Download Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Download Cell Phone Inquiry Letter</h2>
            <p className="text-gray-700 mb-4">
              Prepare and download Cell Phone Inquiry Letter instantly from Legalgram. Our templates are simple, professional, and effective for billing or service complaints.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sample Cell Phone Inquiry Letter</h3>
              <p className="text-gray-700">
                Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for legal letters and business templates.
              </p>
            </div>
            <p className="text-gray-700 font-medium">
              Download Cell Phone Inquiry Letter on Legalgram today.
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Get Your Cell Phone Inquiry Letter from Legalgram</h2>
            <p className="text-xl mb-6">Professional, legally structured, and ready for instant download. Start protecting your rights today.</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/CellPhoneInquiryLetterForm')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Your Cell Phone Inquiry Letter
            </Button>
            <p className="text-bright-orange-100 mt-4">Easy, professional, and trusted by thousands.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CellPhoneInquiryLetterInfo;
