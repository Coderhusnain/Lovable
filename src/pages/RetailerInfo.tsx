import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Building, Truck, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const RetailerInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Retailer Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A written Retailer Agreement helps wholesalers and retailers stay aligned on products, payments, and commercial expectations.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Retailer Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Retailer Agreement is a legal contract between a supplier, wholesaler, manufacturer, or distributor and a retailer. It outlines the terms for selling products to the retailer for resale, including pricing, order procedures, payment schedules, delivery obligations, and branding conditions.
            </p>
            <p className="text-gray-600">
              Use this agreement to document product descriptions, pricing and discounts, minimum order quantities, delivery and shipping terms, returns and defective goods handling, territory and exclusivity, and the parties' respective obligations.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Reliable Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define delivery schedules, shipping responsibilities, and inspection procedures.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Clear Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set wholesale rates, discounts, payment terms, and credit arrangements.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Brand Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Protect marketing, labeling, and authorized resale channels for your products.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-amber-50 to-indigo-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Retailer Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Retailer Agreement template in Word or PDF and customize it for your business.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/retailer-agreement')}
              >
                Create Retailer Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, editable, and ready for immediate use.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RetailerInfo;
