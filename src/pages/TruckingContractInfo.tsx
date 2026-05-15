import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Truck, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const TruckingContractInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Truck className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trucking Contract</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Best format Trucking Contract from Legalgram for freight transportation, cargo hauling, and delivery terms.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Trucking Contract?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Trucking Contract is a legal agreement between a trucking provider and a cargo owner or client.
              It outlines transportation services, freight charges, delivery schedules, liability, insurance, and
              the operational responsibilities of both parties.
            </p>
            <p className="text-gray-600">
              Use this agreement for freight transportation, independent truck drivers, logistics arrangements,
              fleet transportation, and long-distance or local cargo delivery.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Truck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Delivery Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set pickup and drop-off locations, deadlines, and freight handling rules.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Liability & Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Clarify cargo damage liability, insurance coverage, and claims responsibility.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Payment Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define freight charges, payment schedules, and fuel surcharge terms up front.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-slate-50 to-indigo-50 border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Trucking Contract?</CardTitle>
            <CardDescription className="text-lg">Download an editable Trucking Contract template in Word or PDF and customize it for your transport business.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/trucking-agreement')}
              >
                Create Trucking Contract Now
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

export default TruckingContractInfo;
