import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const AffidavitOfMarriageInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">What Is an Affidavit of Marriage?</h1>
            <p className="text-xl text-gray-600">Complete guide to understanding and creating your Affidavit of Marriage</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is an Affidavit of Marriage?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An Affidavit of Marriage is a formal sworn legal document used to confirm that a marriage exists, especially when the original marriage certificate is lost, unavailable, or cannot be located. This document is commonly used in legal, immigration, administrative, and official matters where proof of marriage is required.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">An Affidavit of Marriage usually includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Full names of husband and wife</li>
                <li>• Date of marriage</li>
                <li>• Place of marriage</li>
                <li>• Witness statement confirming the marriage</li>
                <li>• Statement that the marriage is genuine and valid</li>
                <li>• Sworn oath before a notary public</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Get your draft Affidavit of Marriage today with Legalgram's professional templates.
            </p>
          </section>

          {/* Other Names Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Other Names</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Affidavit of Marital Status</li>
                <li>• Marriage Affidavit</li>
                <li>• Marital Status Affidavit</li>
                <li>• Marriage Proof Affidavit Draft</li>
              </ul>
            </div>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use an Affidavit of Marriage</h2>
            </div>
            <p className="text-gray-700 mb-4">Use this Affidavit of Marriage when:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Your marriage certificate is lost</li>
                <li>• You need proof of marriage for immigration purposes</li>
                <li>• A court requests evidence of marital status</li>
                <li>• Government offices require marriage confirmation</li>
                <li>• Insurance or banking institutions need marital proof</li>
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
                <li>• Free download Affidavit of Marriage</li>
                <li>• Editable Word & PDF format</li>
                <li>• Professional legal draft</li>
                <li>• Instant ready-to-use template</li>
                <li>• Easy online document preparation</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you need a trusted Affidavit of Marriage, choose the best format this affidavit from Legalgram.
            </p>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">How to Create an Affidavit of Marriage for Free</h2>
            </div>
            <p className="text-gray-700 mb-6">With Legalgram, it's quick and simple to generate a personalized Affidavit of Marriage online. Here's how:</p>
            
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Choose your state to ensure legal compliance.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <span>Answer a few questions, such as:</span>
                    <ul className="ml-4 mt-1 text-gray-600">
                      <li>• Your job title or employment status</li>
                      <li>• The marriage date and location</li>
                      <li>• Where the document will be signed and notarized</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Customize your affidavit—you can save your work and return to finish it later.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download and print your document.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sign it before a notary public to finalize the affidavit.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">This solution is often faster and far more affordable than hiring an attorney for a simple sworn statement.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ How is an Affidavit of Marriage used?</h3>
                <p className="text-green-800 mb-2">It can act as official proof of marriage in place of a lost or unavailable Marriage Certificate. Common uses include:</p>
                <ul className="text-green-700 space-y-1">
                  <li>• Visa applications or spousal immigration filings</li>
                  <li>• Insurance or banking procedures</li>
                  <li>• Court proceedings or legal declarations</li>
                  <li>• Proof of prior marriage in divorce or inheritance cases</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Is notarization required?</h3>
                <p className="text-blue-800">Yes. For an Affidavit of Marriage to be legally valid, it must be signed in front of a notary public. This step confirms the document is a sworn affidavit and provides legal enforceability.</p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">✅ Who is the affiant?</h3>
                <p className="text-purple-800">The affiant is the individual making the sworn statement—usually one of the spouses. This person is responsible for confirming the facts and signing under oath.</p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">✅ Can I write an Affidavit of Marriage myself?</h3>
                <p className="text-orange-800">Absolutely. With Legalgram, you can easily draft an Affidavit of Marriage for free and tailor it to your specific situation. Our step-by-step builder ensures you include all legally necessary elements and provides a state-specific format that holds up in legal and administrative settings.</p>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Download Affidavit of Marriage</h2>
            <p className="text-gray-700 mb-4">
              Prepare and download Affidavit of Marriage instantly from Legalgram. Our legal templates are simple, professional, and easy to customize.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sample Affidavit of Marriage</h3>
              <p className="text-gray-700">
                Your document automatically updates based on the information you provide. Thousands of users trust Legalgram for affidavits and legal forms.
              </p>
            </div>
            <p className="text-gray-700 font-medium">
              Download Affidavit of Marriage on Legalgram today.
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Get Your Affidavit of Marriage from Legalgram</h2>
            <p className="text-xl mb-6">Professional, legally structured, and ready for instant download. Start preparing your Affidavit of Marriage today.</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/affidavit-of-marriage')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Your Affidavit of Marriage
            </Button>
            <p className="text-bright-orange-100 mt-4">Easy, affordable, and trusted by thousands.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AffidavitOfMarriageInfo;
