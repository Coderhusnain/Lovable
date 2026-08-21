import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scale, CheckCircle, AlertTriangle, Users, Building, HelpCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const CorporateBylawsInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Corporate Bylaws
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Establish clear governance structure and operational rules with professional bylaws that define your corporation's internal framework
          </p>
        </div>

        {/* Other Names Section */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Other Names for This Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["By Laws", "Business By Laws", "Company Bylaws", "Corporate Governance Rules", "Company Operating Rules"].map((name) => (
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
            <CardTitle className="text-2xl text-gray-900">What are Corporate Bylaws?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Corporate Bylaws are the internal rules and regulations that govern how a corporation operates. They establish the structure of the company, define the roles and responsibilities of the board of directors and officers, outline shareholder rights and voting procedures, and specify how meetings are conducted and decisions are made.
            </p>
            <p className="text-gray-600 mb-4">
              Unlike Articles of Incorporation which create the corporation and are filed with the state, Bylaws provide the operational framework and do not require state filing. They are legally binding on all shareholders, directors, and officers, and help ensure the corporation operates in an organized, consistent manner while complying with state corporate laws.
            </p>
            <p className="text-gray-600">
              Corporate Bylaws act as the internal rulebook of your company, ensuring smooth management and legal compliance. They define who makes decisions, how those decisions are made, and what procedures must be followed for corporate governance.
            </p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Clear Governance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Establish defined roles for directors, officers, and shareholders with clear decision-making procedures
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ensure your corporation complies with state laws and maintains separate legal status protections
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Operational Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create consistent, professional procedures for meetings, voting, and corporate decision-making
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">When to Use Corporate Bylaws</CardTitle>
            <CardDescription>
              Corporate bylaws are ideal for various business scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">Business Situations</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Starting a new corporation or business</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Adding shareholders or investors</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Creating formal governance procedures</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Ensuring state law compliance</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">Key Triggers</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Managing a small business or startup</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Operating a nonprofit corporation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Restructuring existing governance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Updating bylaws for changing needs</p>
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
              <h4 className="font-semibold text-blue-900 mb-2">What is the difference between Bylaws and Articles of Incorporation?</h4>
              <p className="text-blue-800">Articles of Incorporation create the corporation and are filed with the state. Bylaws establish the internal operating rules and are not filed with the state. Articles are more fundamental and harder to change, while Bylaws can be amended more easily by shareholders or directors.</p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Are Corporate Bylaws mandatory?</h4>
              <p className="text-green-800">While state law generally requires corporations to have bylaws or comparable governance documents, the specific requirements vary by state. Even where not strictly mandated, bylaws are highly recommended to establish clear organizational structure and governance procedures.</p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Who adopts the Corporate Bylaws?</h4>
              <p className="text-purple-800">Bylaws are typically adopted by the board of directors at the corporation's first organizational meeting, often with shareholder approval. Some bylaws may be amended only by shareholders, while others can be amended by either shareholders or the board, depending on the specific provisions.</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">What topics should Corporate Bylaws cover?</h4>
              <p className="text-yellow-800">Bylaws should cover: board of directors size and duties, officer roles and selection, shareholder meeting procedures, voting rights, quorum requirements, annual meeting timing, special meeting procedures, profit distribution (if applicable), amendment procedures, and indemnification of directors and officers.</p>
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Can I modify or amend my Bylaws after adoption?</h4>
              <p className="text-red-800">Yes. Bylaws can be amended through procedures specified in the bylaws themselves, typically requiring shareholder approval for major changes. Some provisions may allow director-level amendments, but significant changes usually need shareholder votes.</p>
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
              <strong>Corporate bylaws establish the legal governance structure of your corporation.</strong> Consider these important factors:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Bylaws must comply with state corporation laws and cannot conflict with your Articles of Incorporation</li>
              <li>Different states have different specific requirements for corporate governance</li>
              <li>Bylaws define who has authority to make important business decisions</li>
              <li>Formal procedures for meetings and voting help protect the corporate structure</li>
              <li>Proper adoption and amendment of bylaws protects the corporation's legal status</li>
            </ul>
            <p>
              For complex corporate structures or if you are forming a nonprofit corporation, consult with a corporate attorney to ensure your bylaws meet all state requirements and address your specific needs.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Corporate Bylaws?</CardTitle>
            <CardDescription className="text-lg">
              Generate professional corporate bylaws in 20-30 minutes with our guided process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Established governance structure
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  operational procedures
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  State law compliance
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => navigate('/documents/corporate-bylaws')}
              >
                Create Corporate Bylaws Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Complete the form and generate your professional corporate bylaws agreement
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CorporateBylawsInfo;
