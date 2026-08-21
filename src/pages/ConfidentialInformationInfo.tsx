import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Shield, Lock, Eye, Users, Scale, Clock, HelpCircle, Download } from "lucide-react";

const ConfidentialInformationInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/documents')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Confidential Information Agreement</h1>
            <p className="text-lg text-gray-600">
              Protect sensitive business information with legally binding confidentiality terms
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Other Names of Confidentiality Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">This agreement is also commonly known as:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Non-Disclosure Agreement (NDA)</li>
                <li>• Confidential Disclosure Agreement (CDA)</li>
                <li>• Proprietary Information Agreement (PIA)</li>
                <li>• Secrecy Agreement</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Confidentiality Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                A Confidentiality Agreement is a legally enforceable contract that protects your proprietary business information from unauthorized disclosure. Whether you are sharing trade secrets, client data, financial records, or business strategies, this agreement ensures your information remains secure and provides legal recourse if confidential material is misused or revealed.
              </p>
              <p className="text-gray-700">
                This agreement establishes obligations for parties to protect sensitive, proprietary, or confidential information shared during business discussions, evaluations, or potential partnerships. By clearly defining what constitutes confidential information and how it should be handled, the agreement provides legal protection and remedies for breaches.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What Information is Protected?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Business Information:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Business strategies and plans</li>
                    <li>• Financial data and projections</li>
                    <li>• Customer and supplier lists</li>
                    <li>• Marketing strategies and plans</li>
                    <li>• Operational procedures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Software and technical data</li>
                    <li>• Formulas and inventions</li>
                    <li>• Research and development</li>
                    <li>• Trade secrets and processes</li>
                    <li>• Proprietary methodologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Confidentiality Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should create and use a confidentiality agreement when:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You need to share confidential information with a third party
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You are receiving sensitive business information
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You are hiring employees, freelancers, or consultants
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You are entering into partnerships, mergers, or vendor agreements
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You want to protect trade secrets and proprietary information
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Obligations & Protections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Confidentiality Obligations</h4>
                  <p className="text-blue-700 text-sm">
                    The receiving party must maintain confidentiality using the same degree of care 
                    they use for their own confidential information and cannot disclose to third parties 
                    without written consent.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Limited Use Authorization</h4>
                  <p className="text-green-700 text-sm">
                    Confidential information may only be used for the specific purpose stated in the 
                    agreement, typically evaluating potential business relationships.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Return or Destruction Rights</h4>
                  <p className="text-purple-700 text-sm">
                    The disclosing party can request return or destruction of all confidential materials 
                    at any time, including any materials prepared based on the information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Information Exclusions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                The confidentiality obligations do not apply to information that:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Public Information</h4>
                  <p className="text-sm text-gray-700">Information that is or becomes publicly available without breach of the agreement</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Prior Knowledge</h4>
                  <p className="text-sm text-gray-700">Information that was lawfully known to the receiving party before disclosure</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Third-Party Disclosure</h4>
                  <p className="text-sm text-gray-700">Information disclosed by a third party legally entitled to do so</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Independent Development</h4>
                  <p className="text-sm text-gray-700">Information independently developed without reference to the confidential information</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Legal Protections & Enforcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">No License Grant</h4>
                  <p className="text-red-700 text-sm">
                    The agreement clarifies that no ownership rights or licenses are granted 
                    to the receiving party regarding the confidential information.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">No Disclosure Obligation</h4>
                  <p className="text-yellow-700 text-sm">
                    Neither party is required to disclose information or enter into any 
                    business relationship as a result of this agreement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Agreement Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <h4 className="font-semibold text-teal-800">Information Provided "As Is"</h4>
                  <p className="text-sm text-teal-700">The disclosing party makes no warranties regarding accuracy or completeness of information</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Written Waiver Requirement</h4>
                  <p className="text-sm text-blue-700">Any waiver of agreement provisions must be in writing and signed by both parties</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Governing Law Selection</h4>
                  <p className="text-sm text-purple-700">The agreement allows specification of which state's laws will govern the contract</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Confidentiality Agreement FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">When should I use a Confidentiality Agreement?</h4>
                <p className="text-blue-700 text-sm">
                  Use a confidentiality agreement to protect sensitive information shared with employees, clients, vendors, or partners. Most businesses benefit from using an agreement to secure their operations and establish clear obligations regarding confidential information.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">What does a Confidentiality Agreement do?</h4>
                <p className="text-green-700 text-sm mb-2">
                  A Confidentiality Agreement prevents unauthorized disclosure of confidential information. It comes in two types:
                </p>
                <ul className="text-green-700 text-sm space-y-1 pl-2">
                  <li>• Unilateral NDA – Protects one party's information</li>
                  <li>• Mutual NDA – Protects both parties' information</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">What information is required to draft a Confidentiality Agreement?</h4>
                <p className="text-purple-700 text-sm mb-2">To create a confidentiality agreement, you need:</p>
                <ul className="text-purple-700 text-sm space-y-1 pl-2">
                  <li>• Names of the parties involved</li>
                  <li>• Effective date and duration</li>
                  <li>• Nature of business relationship</li>
                  <li>• Description of confidential information</li>
                  <li>• Purpose of disclosure</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">What are the limitations of a Confidentiality Agreement?</h4>
                <p className="text-yellow-700 text-sm mb-2">Even well-drafted agreements have limitations:</p>
                <ul className="text-yellow-700 text-sm space-y-1 pl-2">
                  <li>• Publicly known information cannot be protected</li>
                  <li>• Difficult to enforce without proof of breach</li>
                  <li>• Legal enforceability depends on jurisdiction</li>
                  <li>• Damages must be provable in court</li>
                </ul>
                <p className="text-yellow-700 text-sm mt-2">However, having a Confidentiality Agreement significantly strengthens your legal protection.</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Who should sign a Confidentiality Agreement?</h4>
                <p className="text-red-700 text-sm mb-2">You should request a Confidentiality Agreement from:</p>
                <ul className="text-red-700 text-sm space-y-1 pl-2">
                  <li>• Employees</li>
                  <li>• Clients and customers</li>
                  <li>• Vendors and suppliers</li>
                  <li>• Freelancers or contractors</li>
                  <li>• Business partners in mergers or acquisitions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Create Your Confidentiality Agreement Today</h3>
              <p className="text-gray-600 mb-4">
                Protect your sensitive business information with a professionally drafted confidentiality agreement that establishes clear obligations and legal protections.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Our guided form will help you create a comprehensive agreement in minutes.
              </p>
              <p className="text-sm text-gray-500">Takes 8-12 minutes • Professional format</p>
              <Button 
                onClick={() => navigate('/confidential-information-form')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfidentialInformationInfo;
