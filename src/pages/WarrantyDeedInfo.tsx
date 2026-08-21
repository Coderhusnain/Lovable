import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, FileText, MapPin, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const WarrantyDeedInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Deed</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A Warranty Deed transfers property ownership with the highest level of seller warranty — ideal for residential, commercial, and trust transfers.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Warranty Deed?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Warranty Deed is a legal document where the seller (grantor) transfers ownership to the buyer (grantee) and guarantees the title is free from undisclosed liens or claims. It provides strong protection to the buyer and is commonly used in property sales and transfers.
            </p>
            <p className="text-gray-600">
              Download a professionally drafted Warranty Deed template from Legalgram to securely transfer real estate ownership.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Include legal property description, parcel number, and county recorder details for accurate recording.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Title Warranty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">The seller guarantees clear title; consider a title search or title insurance for extra protection.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Recording</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Sign in front of a notary and record the deed with the county recorder to make the transfer effective.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Warranty Deed?</CardTitle>
            <CardDescription className="text-lg">Download an editable Warranty Deed template in Word or PDF and customize it to your transaction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3"
                onClick={() => navigate('/documents')}
              >
                Create Warranty Deed Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, editable, and ready for recording.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WarrantyDeedInfo;
