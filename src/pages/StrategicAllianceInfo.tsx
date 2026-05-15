import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Handshake, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const StrategicAllianceInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
            <Handshake className="w-10 h-10 text-cyan-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Strategic Alliance Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Best format Strategic Alliance Agreement from Legalgram for business collaboration, resource sharing,
            and independent cooperation on defined projects.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Strategic Alliance Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Strategic Alliance Agreement is a legal contract between two or more independent businesses that
              agree to cooperate on a specific project or business objective without creating a new company or
              joint venture.
            </p>
            <p className="text-gray-600">
              It sets the purpose, contributions, responsibilities, confidentiality, revenue arrangements,
              decision-making procedures, and exit terms so each company can collaborate while remaining separate.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Globe className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Grow Together</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Support partnerships in distribution, technology sharing, and market expansion.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Protect Independence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Keep each business separate while clearly defining obligations and ownership rights.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Handshake className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Define Cooperation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set the scope, resources, and governance for a focused project or objective.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-cyan-50 to-indigo-50 border-cyan-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Strategic Alliance Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Strategic Alliance Agreement template in Word or PDF and customize it for your collaboration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/StrategicAllianceForm')}
              >
                Create Strategic Alliance Agreement Now
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

export default StrategicAllianceInfo;
