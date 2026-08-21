import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  DollarSign,
  Briefcase,
  Users,
  BarChart3,
  HelpCircle,
  Download,
  Clock,
  Layers,
} from "lucide-react";

const BusinessPlanInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/documents")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Plan</h1>
            <p className="text-lg text-gray-600">
              Comprehensive roadmap for launching and growing your business venture
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">

          {/* Other Names */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Other Names of Business Plan Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-gray-700">
                <li>• Business Development Plan</li>
                <li>• Strategic Business Plan</li>
                <li>• Startup Business Plan</li>
              </ul>
              <p className="mt-3 text-gray-600 text-sm">
                Create and customize your business plan according to your specific business requirements and industry.
              </p>
            </CardContent>
          </Card>

          {/* What is a Business Plan Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Business Plan Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                A Business Plan is a structured legal and strategic document that outlines the financial, marketing, and operational framework of a business. It defines your business goals and provides a clear roadmap for growth and sustainability.
              </p>
              <p>
                A comprehensive business plan clearly communicates your business vision to investors, partners, and stakeholders. It demonstrates your understanding of the market and establishes credibility with potential funders and collaborators.
              </p>
              <p>
                A well-crafted business plan serves as both a strategic management tool and a compelling document for securing funding and attracting partners to your venture.
              </p>
              <p>
                A Business Plan is a formal document that outlines your business concept, strategy,
                market analysis, financial projections, and operational framework. It serves as a
                roadmap for your business journey and is essential for securing funding, attracting
                partners, and guiding strategic decisions.
              </p>
              <p>
                A well-crafted business plan demonstrates your understanding of the market, validates
                your business model, and provides a clear path to profitability. It's your
                opportunity to present a compelling case for why your business will succeed and how
                you plan to achieve your goals.
              </p>
            </CardContent>
          </Card>

          {/* Why You Need a Business Plan Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Business Plan Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                A well-developed business plan is essential for:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Clearly defining your business objectives
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Presenting your business model to investors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Structuring financial projections and strategies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Communicating your mission to employees and stakeholders
                </li>
              </ul>
              <p className="mt-3 text-gray-600 text-sm">
                A professional business plan ensures your strategy is thoroughly documented and ready for presentation to stakeholders.
              </p>
            </CardContent>
          </Card>

          {/* When to Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Business Plan Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should use a Business Plan Agreement when:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">Starting a new business or startup</li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">Seeking funding from investors or financial institutions</li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">Expanding or restructuring your business</li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">Aligning your team with business goals and strategies</li>
              </ul>
              <p className="mt-4 text-gray-600 italic text-sm">
                Create your business plan today and streamline your planning process.
              </p>
            </CardContent>
          </Card>

          {/* How to Write */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How to Write a Business Plan Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                Creating a strong business plan requires careful planning and structured drafting. A comprehensive plan includes the following key components:
              </p>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-semibold">1. Business Goals</h4>
                <p className="text-sm text-gray-700">Clearly define short-term and long-term objectives of your business.</p>
              </div>
              <div className="p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                <h4 className="font-semibold">2. Executive Summary</h4>
                <p className="text-sm text-gray-700">Provide a concise overview of your business, including mission, products, and market position.</p>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                <h4 className="font-semibold">3. Business Description</h4>
                <p className="text-sm text-gray-700">Explain your industry, market trends, and competitive positioning.</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <h4 className="font-semibold">4. Strategy and Implementation</h4>
                <p className="text-sm text-gray-700">Outline your marketing strategy, pricing model, and promotional plans.</p>
              </div>
              <div className="p-3 bg-teal-50 border-l-4 border-teal-400 rounded">
                <h4 className="font-semibold">5. Market Analysis</h4>
                <p className="text-sm text-gray-700">Analyze competitors, target audience, and market opportunities.</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h4 className="font-semibold">6. SWOT Analysis</h4>
                <p className="text-sm text-gray-700">Identify strengths, weaknesses, opportunities, and threats affecting your business.</p>
              </div>
              <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                <h4 className="font-semibold">7. Operations Plan</h4>
                <p className="text-sm text-gray-700">Describe daily operations, management structure, and development plans.</p>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <h4 className="font-semibold">8. Financial Plan</h4>
                <p className="text-sm text-gray-700 mb-1">Include:</p>
                <ul className="text-sm text-gray-700 pl-2 space-y-0.5">
                  <li>• Revenue projections</li>
                  <li>• Cash flow forecasts</li>
                  <li>• Profit and loss statements</li>
                  <li>• Break-even analysis</li>
                </ul>
              </div>
              <p className="text-gray-600 text-sm italic">
                Include all these elements in a clear and professional format to create a compelling business plan.
              </p>
            </CardContent>
          </Card>

          {/* Key Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Components of Our Business Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Executive Summary</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Business overview and mission</li>
                    <li>• Market opportunity identification</li>
                    <li>• Investment requirements</li>
                    <li>• Expected returns and growth</li>
                    <li>• Key success factors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Market Analysis</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Industry overview and trends</li>
                    <li>• Target market segmentation</li>
                    <li>• Competitive landscape analysis</li>
                    <li>• Market positioning strategy</li>
                    <li>• Customer needs assessment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Who Needs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Who Needs a Business Plan?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Startup Founders</h4>
                  <p className="text-sm text-gray-700">New entrepreneurs launching their first business or testing a new concept</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Investors &amp; Lenders</h4>
                  <p className="text-sm text-gray-700">Essential for securing funding, loans, or attracting potential investors</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Expanding Businesses</h4>
                  <p className="text-sm text-gray-700">Established companies planning new products, markets, or expansion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product & Service Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Product &amp; Service Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <h4 className="font-semibold">Product Development</h4>
                  <p className="text-sm text-gray-700">Define your product or service offerings, unique features, and development timeline</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                  <h4 className="font-semibold">Market Differentiation</h4>
                  <p className="text-sm text-gray-700">Identify what sets your offering apart from competitors and creates value for customers</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400">
                  <h4 className="font-semibold">Target Customers</h4>
                  <p className="text-sm text-gray-700">Define your ideal customer segments and understand their specific needs and preferences</p>
                </div>
                <div className="p-3 bg-purple-50 border-l-4 border-purple-400">
                  <h4 className="font-semibold">Operational Framework</h4>
                  <p className="text-sm text-gray-700">Outline how you'll deliver your products or services efficiently and profitably</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Financial Planning &amp; Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Investment Requirements:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Total funding needed to launch</li>
                    <li>• Breakdown by functional areas</li>
                    <li>• Marketing and advertising budget</li>
                    <li>• Product development costs</li>
                    <li>• Staffing and operational expenses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Financial Projections:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Startup costs and initial capital</li>
                    <li>• Monthly revenue and expense forecasts</li>
                    <li>• Break-even analysis and timeline</li>
                    <li>• Profit margins and growth projections</li>
                    <li>• Unit pricing and sales volume estimates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Market Analysis &amp; Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Industry Overview</h4>
                  <p className="text-blue-700 text-sm">Comprehensive analysis of your industry size, growth trends, and market opportunities specific to your business segment.</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Demand Analysis</h4>
                  <p className="text-green-700 text-sm">Identification of market demand drivers, consumer trends, and factors creating favorable conditions for your business.</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Competitive Positioning</h4>
                  <p className="text-purple-700 text-sm">Analysis of key competitors and your strategy for differentiation, market capture, and sustainable competitive advantage.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Implementation &amp; Marketing Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Business Strategy</h4>
                  <p className="text-sm text-gray-700">Personalized customer experience, operational efficiency, and brand positioning</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Implementation Timeline</h4>
                  <p className="text-sm text-gray-700">Phased rollout from design and prototyping to launch, marketing, and scaling</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Marketing Campaigns</h4>
                  <p className="text-sm text-gray-700">Core marketing initiatives to drive customer acquisition and brand awareness</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Legal Compliance</h4>
                  <p className="text-sm text-gray-700">Proper business structure selection and regulatory compliance framework</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Considerations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Important Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Market Validation</h4>
                  <p className="text-red-700 text-sm">Ensure your business concept addresses real market needs and has sufficient demand to support sustainable growth and profitability.</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Financial Realism</h4>
                  <p className="text-yellow-700 text-sm">Base your financial projections on realistic assumptions and market research rather than overly optimistic estimates.</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Risk Assessment</h4>
                  <p className="text-blue-700 text-sm">Consider potential risks, market changes, and challenges that could impact your business and develop contingency plans.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits from Legalgram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Benefits of a Professional Business Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Professionally structured and comprehensive
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Fully customizable to your business model
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Suitable for startups, LLCs, and corporations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Easy to edit and update
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Attracts investors and stakeholders
                </li>
              </ul>
              <p className="mt-3 text-gray-600 text-sm">
                A professional business plan helps you save time while ensuring accuracy, credibility, and thorough coverage of all critical business aspects.
              </p>
            </CardContent>
          </Card>

        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Get Your Business Plan Now</h3>
              <p className="text-gray-600 mb-2">
                Ready to create your business strategy? Start building your business plan today and take the first step toward establishing a successful business.
              </p>
              <p className="text-gray-600 mb-4">
                You can confidently present your ideas, secure funding, and grow your business with clarity and direction using a comprehensive plan.
              </p>
              <p className="text-sm text-gray-500">
                Our guided form will walk you through creating a professional business plan that covers all essential aspects of your venture.
              </p>
              <p className="text-sm text-gray-500 mt-2">Takes 15-20 minutes • Professional output</p>
              <Button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/business-plan-form")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default BusinessPlanInfo;