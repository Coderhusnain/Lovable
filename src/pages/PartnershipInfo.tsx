import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Handshake, CheckCircle, AlertTriangle, Building, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const PartnershipInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <Handshake className="w-10 h-10 text-yellow-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partnership Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A written Partnership Agreement helps partners stay aligned and gives the business a strong legal foundation from day one.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Partnership Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Partnership Agreement is a legal contract between two or more individuals or entities who agree to run a business together. It defines each partner’s role, ownership percentage, financial contributions, management rights, and the rules for operating the partnership.
            </p>
            <p className="text-gray-600">
              Typical clauses include capital contributions, profit and loss sharing, management and voting rules, partner admission and exit procedures, buyout provisions, confidentiality, dispute resolution, and dissolution mechanisms.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Clear Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define ownership percentages and profit sharing clearly.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Financial Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set banking, accounting, and tax responsibilities up front.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Handshake className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Exit Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Plan buyouts, retirements, and dissolution to avoid disputes.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Who Should Use This Agreement?</CardTitle>
            <CardDescription>Ideal for a wide range of partnership types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <ul className="list-disc list-inside">
                <li>Entrepreneurs and co-founders</li>
                <li>Family-run businesses</li>
                <li>Professional service firms</li>
                <li>Retail and trading partnerships</li>
              </ul>
              <ul className="list-disc list-inside">
                <li>Investment and real estate partners</li>
                <li>Two-person businesses</li>
                <li>Multi-partner enterprises</li>
                <li>Consultants and agencies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-r from-yellow-50 to-indigo-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Partnership Agreement?</CardTitle>
            <CardDescription className="text-lg">Download a professional Partnership Agreement template ready for immediate use.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3"
                onClick={() => navigate('/documents/PartnershipAgreementForm')}
              >
                Create Partnership Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted and editable — suitable for startups and established businesses.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PartnershipInfo;
