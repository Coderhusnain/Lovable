import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, CheckCircle, AlertTriangle, Building, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NonProfitInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-green-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nonprofit Bylaws</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A strong set of Nonprofit Bylaws helps your organization run smoothly, maintain compliance, and build transparency with directors, donors, and members.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What are Nonprofit Bylaws?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Nonprofit Bylaws are internal legal rules that explain how a nonprofit organization will be managed and governed. They define the powers of directors, officers, members, voting procedures, meetings, finances, and amendment rules.
            </p>
            <p className="text-gray-600">
              These bylaws commonly include organization name and purpose, registered office details, board structure, officer roles, meeting procedures, conflict of interest policy, financial oversight procedures, indemnification provisions, amendment procedures, and a dissolution clause.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Trust & Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Build donor and member confidence with clear governance rules.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ensure your nonprofit meets state requirements and grantor expectations.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Operational Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Clarify meetings, voting, duties, and financial controls for consistent governance.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Who Should Use These Bylaws?</CardTitle>
            <CardDescription>Ideal for a wide range of nonprofit organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Charitable organizations</li>
                <li>NGOs and welfare associations</li>
                <li>Religious nonprofits and foundations</li>
                <li>Educational groups and membership organizations</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Community clubs and social service organizations</li>
                <li>Grant-seeking organizations</li>
                <li>Board members and nonprofit founders</li>
                <li>Organizations needing formal governance rules</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-r from-green-50 to-indigo-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Nonprofit Bylaws?</CardTitle>
            <CardDescription className="text-lg">Download an editable Nonprofit Bylaws template in Word or PDF and customize it for your organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/nonprofit-bylaws')}
              >
                Create Nonprofit Bylaws Now
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

export default NonProfitInfo;
