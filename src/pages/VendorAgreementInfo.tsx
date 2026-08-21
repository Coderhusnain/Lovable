import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin, FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const VendorAgreementInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vendor Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use this Vendor Agreement for trade shows, markets, festivals, food stalls, pop-ups, and other events — clearly define booth spaces, fees, insurance and operating rules.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Vendor Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Vendor Agreement is a legal contract between an organizer or venue and a vendor that allows the vendor to sell goods or provide services at a specific event or location under agreed terms. It covers space allocation, fees, setup and breakdown times, insurance, permitted products and conduct rules.
            </p>
            <p className="text-gray-600">
              Download a professionally drafted Vendor Agreement template from Legalgram and customize it for trade shows, farmers markets, festivals, weddings, and corporate events.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Booth & Space</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define exact booth size, location and permitted activities to avoid disputes during the event.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Fees & Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set participation fees, payment schedules, refunds and cancellation terms clearly in the contract.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Insurance & Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Specify insurance minimums, health and safety obligations and indemnity to protect both parties.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-amber-50 to-rose-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Vendor Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Vendor Agreement template in Word or PDF and customize it for your event or venue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/VendorAgreementForm')}
              >
                Create Vendor Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, editable, and event-ready.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorAgreementInfo;
