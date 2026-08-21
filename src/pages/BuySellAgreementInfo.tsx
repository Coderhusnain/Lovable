import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users, Calendar, Building, DollarSign, Handshake, Download, HelpCircle, TrendingUp } from "lucide-react";

const BuySellAgreementInfo = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy-Sell Agreement</h1>
            <p className="text-lg text-gray-600">
              Essential legal document for business owners to manage ownership transfers and protect business continuity
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Buy-Sell Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                A Buy-Sell Agreement is a legally binding contract among business owners that governs when 
                and how ownership interests can be transferred. It establishes a predetermined mechanism 
                for buying and selling ownership stakes in specific circumstances, such as death, disability, 
                retirement, or voluntary departure of an owner.
              </p>
              <p className="text-gray-700">
                These agreements are essential for maintaining business stability and preventing disputes 
                among owners or their heirs. They provide clear procedures for valuation, payment terms, 
                and transfer restrictions, ensuring smooth transitions while protecting the interests of 
                all parties involved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Alternative Names
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">This agreement is also commonly known as:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Buyout Agreement</li>
                <li>• Business Buyout Agreement</li>
                <li>• Business Will</li>
                <li>• Business Prenup</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why Use a Buy-Sell Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A Buy-Sell Agreement ensures clarity, control, and continuity for your business. It helps you:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Control who can become a shareholder or partner
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Avoid disputes by pre-defining valuation methods
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Protect the business from external or unwanted ownership
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Ensure smooth transfer of ownership in unforeseen events
                </li>
              </ul>
              <p className="text-gray-600 text-sm mt-3">
                Whether you run a corporation, LLC, or partnership, a Buy-Sell Agreement provides a structured and enforceable solution.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When Should You Use This Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should create a Buy-Sell Agreement if:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You want to restrict who can buy company shares
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You need a clear plan for death, disability, or retirement
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You want to fix a fair valuation method in advance
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You wish to protect ownership interests during divorce or bankruptcy
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You want inherited shares to be sold back to the company
                </li>
              </ul>
              <p className="mt-4 text-gray-600 italic text-sm">
                This agreement is ideal for startups, partnerships, and established companies alike.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Fully customizable agreement
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Legally binding and enforceable document
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Suitable for corporations, LLCs, and partnerships
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Frequently used and trusted format
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Comprehensive and professionally structured
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Transfer Restrictions</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Right of first refusal provisions</li>
                    <li>• Permitted transfer exceptions</li>
                    <li>• Third-party sale limitations</li>
                    <li>• Consent requirements</li>
                    <li>• Transfer notice procedures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Triggering Events</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Death of an owner</li>
                    <li>• Disability or incapacitation</li>
                    <li>• Employment termination</li>
                    <li>• Retirement provisions</li>
                    <li>• Involuntary transfers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Who Needs a Buy-Sell Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Multi-Owner Businesses</h4>
                  <p className="text-sm text-gray-700">
                    Partnerships, LLCs, and corporations with multiple owners need clear exit strategies
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Family Businesses</h4>
                  <p className="text-sm text-gray-700">
                    Protect business continuity across generations and manage succession planning
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Employee Owners</h4>
                  <p className="text-sm text-gray-700">
                    Businesses with employee ownership need structured transition procedures
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Triggering Events for Buy-Sell
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-400">
                  <h4 className="font-semibold">Death of Owner</h4>
                  <p className="text-sm text-gray-700">Provides mechanism for estate to sell shares and remaining owners to maintain control</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <h4 className="font-semibold">Disability or Incapacitation</h4>
                  <p className="text-sm text-gray-700">Defines disability and establishes procedures for buyout when owner cannot perform duties</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                  <h4 className="font-semibold">Employment Termination</h4>
                  <p className="text-sm text-gray-700">Requires employee-owners to sell shares upon leaving the company</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400">
                  <h4 className="font-semibold">Retirement</h4>
                  <p className="text-sm text-gray-700">Establishes retirement age thresholds and potential penalties for early retirement</p>
                </div>
                <div className="p-3 bg-purple-50 border-l-4 border-purple-400">
                  <h4 className="font-semibold">Involuntary Transfers</h4>
                  <p className="text-sm text-gray-700">Protects against forced sales due to bankruptcy, divorce, or legal judgments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Valuation & Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Valuation Methods</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Book value calculations</li>
                    <li>• Fair market value appraisals</li>
                    <li>• Independent CPA valuations</li>
                    <li>• Formula-based pricing</li>
                    <li>• Recent transaction multiples</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Structure</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Down payment requirements</li>
                    <li>• Installment payment terms</li>
                    <li>• Interest rate provisions</li>
                    <li>• Prepayment options</li>
                    <li>• Default and acceleration clauses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Transfer Restrictions & Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Right of First Refusal</h4>
                  <p className="text-blue-700 text-sm">
                    Existing owners have priority to purchase shares before they can be sold to 
                    third parties, maintaining control within the current ownership group.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Permitted Transfers</h4>
                  <p className="text-green-700 text-sm">
                    Specific exceptions for transfers to trusts, family members, or other 
                    approved entities for estate planning or tax purposes.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Consent Requirements</h4>
                  <p className="text-purple-700 text-sm">
                    Unanimous or majority consent requirements for certain types of transfers, 
                    ensuring all owners approve of new business partners.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Important Legal Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Tax Implications</h4>
                  <p className="text-red-700 text-sm">
                    Consider capital gains treatment, installment sale rules, and potential 
                    tax elections. S Corporation status may be affected by certain transfers.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Life Insurance Funding</h4>
                  <p className="text-yellow-700 text-sm">
                    Life insurance policies on key owners can provide funding for buyouts, 
                    ensuring liquidity without burdening the business or remaining owners.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Spousal Acknowledgment</h4>
                  <p className="text-blue-700 text-sm">
                    Spouses should acknowledge and consent to the agreement to prevent 
                    challenges to transfers, especially in community property states.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Regular Updates</h4>
                  <p className="text-green-700 text-sm">
                    Agreements should be reviewed and updated regularly to reflect changes 
                    in business value, ownership structure, or applicable laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Additional Provisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Operational Protections:</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Certificate legends and restrictions</li>
                    <li>• Power of attorney provisions</li>
                    <li>• Closing conditions and timelines</li>
                    <li>• Default and remedy procedures</li>
                    <li>• Amendment requirements</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Dispute Resolution:</h4>
                  <ul className="space-y-1 text-orange-700 text-sm">
                    <li>• Specific performance remedies</li>
                    <li>• Arbitration or mediation clauses</li>
                    <li>• Notice and cure periods</li>
                    <li>• Governing law provisions</li>
                    <li>• Severability protections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Benefits of Buy-Sell Agreements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Business Stability:</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Prevents ownership disputes</li>
                    <li>• Maintains business continuity</li>
                    <li>• Protects against unwanted owners</li>
                    <li>• Provides clear succession plans</li>
                    <li>• Establishes fair exit procedures</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Financial Security:</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Guarantees liquidity for departing owners</li>
                    <li>• Establishes fair valuation methods</li>
                    <li>• Provides payment structure certainty</li>
                    <li>• Facilitates estate planning</li>
                    <li>• Enables tax-efficient transfers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Is this Buy-Sell Agreement legally valid?</h4>
                <p className="text-blue-700 text-sm">
                  Yes. This agreement is designed to be legally binding when properly executed by all parties. Consider having it notarized for additional legal protection.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Can I customize the agreement?</h4>
                <p className="text-green-700 text-sm">
                  Absolutely. You can edit and tailor the agreement to suit your specific business structure and ownership requirements.
                </p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">What happens if an owner dies?</h4>
                <p className="text-purple-700 text-sm">
                  The agreement specifies what occurs - typically the deceased owner's shares are purchased by the remaining owners or the company at a pre-determined price.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Who should have a Buy-Sell Agreement?</h4>
                <p className="text-yellow-700 text-sm">
                  Any business with multiple owners - corporations, LLCs, partnerships, and S-Corps. It's especially important for businesses relying on the continued involvement of specific owners.
                </p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Can this protect against unwanted ownership?</h4>
                <p className="text-red-700 text-sm">
                  Yes. It prevents ownership transfer to outsiders by defining who can purchase shares and establishing buyback provisions that trigger automatically.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Protect Your Business Today</h3>
              <p className="text-gray-600 mb-4">
                Create your own Buy-Sell Agreement in minutes by filling in your details and customizing the clauses for your specific situation.
              </p>
              <p className="text-gray-600 mb-4">
                Protect your business and avoid future disputes by using a professionally structured Buy-Sell Agreement designed for clarity, enforceability, and ease of use.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Our guided form will walk you through creating a comprehensive agreement that covers all essential aspects of ownership transfers.
              </p>
              <p className="text-sm text-gray-500 mt-2">Takes 12-18 minutes • Professional format</p>
              <Button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/buy-sell-agreement-form")}
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

export default BuySellAgreementInfo;
