import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, AlertTriangle, ArrowRight, Shield, Truck, FileText } from "lucide-react";

const GeneralContractInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            General Contract for Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Formalize your product sales transactions with clear terms, delivery schedules, payment conditions, and legal protections for both buyer and seller
          </p>
        </div>

        {/* Other Names Section */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Other Names for This Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["General Contract for Goods", "Products Agreement", "Sales Contract", "Goods Purchase Agreement", "Product Sale Agreement"].map((name) => (
                <span key={name} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Is Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What Is a General Contract for Products?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A General Contract for Products (also called a General Contract for Goods or Products Agreement) is a legally binding agreement used when businesses buy or sell tangible goods. This contract clearly defines the terms of the transaction, including product specifications, quantities, pricing, delivery schedules, payment terms, and warranties.
            </p>
            <p className="text-gray-600 mb-4">
              By formalizing your transaction in writing, you reduce miscommunication risks and protect both parties' interests. Whether you're a buyer purchasing from a supplier or a seller offering products to customers, this agreement establishes mutual expectations and keeps business relationships professional and compliant.
            </p>
            <p className="text-gray-600">
              This agreement is specifically designed for tangible goods sales in business-to-business transactions and is governed by the Uniform Commercial Code (UCC) in the United States.
            </p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Clear Transaction Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Specify product details, quantities, pricing, and all transaction specifics to prevent misunderstandings
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Delivery Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Define delivery schedules, locations, shipping responsibility, and damage liability procedures
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Legal Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Establish warranties, payment protections, and liability limitations enforceable under commercial law
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">When to Use a General Contract for Products</CardTitle>
            <CardDescription>
              Key scenarios where this agreement is essential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">Buyer Situations</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Purchasing goods from another business or supplier</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Buying raw materials or equipment for your business</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Needing clarity on product specifications and quality</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Want to protect yourself from defective goods</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">Seller Situations</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Selling products to customers or other businesses</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Establishing payment terms and delivery obligations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Clarifying warranty limitations and liability protection</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Protecting cash flow with clear payment procedures</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What is the difference between a General Contract for Products and other sales agreements?</h4>
              <p className="text-blue-800">A General Contract for Products is specifically designed for tangible goods sales between businesses. It covers product specifications, delivery, and payment terms. It differs from service contracts (which cover services), real estate agreements, or digital product licenses and is designed for standard commercial transactions.</p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <h4 className="font-semibold text-green-900 mb-2">What goods does this agreement cover?</h4>
              <p className="text-green-800">This contract applies to tangible physical products sold in business-to-business transactions. It does not cover real estate, software, digital products, intellectual property, financial instruments (stocks/securities), or services. The agreement is ideal for goods like merchandise, equipment, raw materials, and manufactured products.</p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Does this agreement include warranties?</h4>
              <p className="text-purple-800">Yes. The contract includes provisions for product warranties, specifications, quality standards, and limitations of liability. Both parties should clearly define what warranties are provided, their duration, and any exclusions or disclaimers regarding product condition, merchantability, and fitness for specific purposes.</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">What happens if delivery is late or goods are damaged?</h4>
              <p className="text-yellow-800">The contract specifies delivery obligations, risk of loss, and remedies for breach. Late delivery provisions and damage liability are outlined in the agreement. You can include penalties for late delivery, inspection rights upon receipt, and procedures for handling damaged or defective goods.</p>
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Can this contract be used for recurring purchases?</h4>
              <p className="text-red-800">Yes. This General Contract for Products can be used as a framework for one-time purchases or ongoing business relationships. For recurring orders, you can reference this contract in individual purchase orders, or modify it to include terms for multiple purchases over time with specified quantities and pricing.</p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl text-amber-800 flex items-center">
              Important Legal Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p className="mb-4">
              <strong>This agreement is specifically for tangible goods transactions.</strong> Important considerations:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>This contract applies only to physical goods, not real estate, software, digital products, or services</li>
              <li>The agreement is governed by the Uniform Commercial Code (UCC) which regulates goods sales in the US</li>
              <li>Both parties should clearly define warranty provisions, delivery terms, and payment obligations</li>
              <li>Include specific remedies for breach, late delivery, or defective goods</li>
              <li>Consider liability insurance for high-value transactions or dangerous goods</li>
            </ul>
            <p>
              For large transactions, complex products, or when dealing with international buyers/sellers, consult with a commercial attorney to ensure all legal protections are in place.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your General Contract for Products?</CardTitle>
            <CardDescription className="text-lg">
              Generate a professional product sales contract in 15-20 minutes with our guided process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Clear terms and conditions
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Payment protection
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Delivery specifications
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                onClick={() => navigate('/documents/general-contract-products')}
              >
                Create General Contract for Products Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Complete the form and generate your professional product sales agreement
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default GeneralContractInfo;
