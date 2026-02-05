import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const WarrantyRepairRequestInfo = () => {
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
            <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              What Is a Warranty Repair Request?
            </h1>
            <p className="text-xl text-gray-600">
              A formal letter requesting repair or replacement of a defective product under warranty
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Warranty Repair Request is a written notice sent to a manufacturer,
              seller, or service provider informing them that a purchased product is
              defective and requesting repair or replacement under the terms of the
              applicable warranty.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Warranty Repair Request typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Purchase and product information</li>
                <li>• Description of the defect</li>
                <li>• Reference to warranty coverage</li>
                <li>• Request for repair or replacement</li>
                <li>• Attached receipts and warranty documents</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Sending a clear, professional request helps protect your consumer
              rights and encourages timely resolution by the company.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Warranty Repair Request
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You should use this letter when:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• A product stops working within warranty period</li>
                  <li>• A defect affects performance or safety</li>
                  <li>• The seller requires written notice</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• You want a formal paper trail</li>
                  <li>• You need repair or replacement confirmation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of the Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be effective, a Warranty Repair Request should contain:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Product Identification
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Product name and model</li>
                  <li>• Purchase date</li>
                  <li>• Seller information</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Description of Defect
                </h3>
                <p className="text-gray-700">
                  Explain clearly what is malfunctioning and how it affects use of the product.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Warranty Reference
                </h3>
                <p className="text-gray-700">
                  State that the product is covered and that you are invoking warranty rights.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Supporting Documents
                </h3>
                <p className="text-gray-700">
                  Attach copies of receipts, invoices, and warranty cards.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Warranty Repair Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Creating your Warranty Repair Request with Legalgram is easy:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter product and purchase details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Describe the defect clearly.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Attach warranty and receipt copies.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and send to the company.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                Proper documentation improves your chances of fast resolution.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  ✅ Is this legally required?
                </h3>
                <p className="text-green-800">
                  Often yes. Many warranties require written notice before service is provided.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Should I send originals?
                </h3>
                <p className="text-blue-800">
                  No. Always send copies and keep the originals for your records.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ What if they don’t respond?
                </h3>
                <p className="text-purple-800">
                  You may follow up in writing or escalate under consumer protection laws.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Should I keep records?
                </h3>
                <p className="text-orange-800">
                  Yes. Keep all correspondence and communication logs.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Request
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review the product details.</li>
                <li>2. Attach supporting documentation.</li>
                <li>3. Sign the request.</li>
                <li>4. Send and retain copies.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Warranty Repair Request Now
            </h2>
            <p className="text-xl mb-6">
              Request repairs or replacements quickly and professionally.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/warranty-repair-request")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Request
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Protect your purchase. Enforce your warranty. Get results.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default WarrantyRepairRequestInfo;
