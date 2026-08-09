
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try Legalgram before you commit.",
    features: [
      "Browse the full 100+ template library",
      "3 GramAI legal questions per month",
      "Preview any document",
      "Community support via help center"
    ]
  },
  {
    id: "single",
    name: "Single Document",
    price: "$39",
    period: "one-time",
    description: "One-off need? Get one document, no subscription.",
    features: [
      "Draft and download one attorney-prepared document",
      "30 days of edits and version history",
      "E-signature for that document",
      "One GramAI contract review",
      "Email support"
    ]
  },
  {
    id: "essentials",
    name: "Essentials",
    price: "$19",
    period: "month",
    description: "For individuals and families who want ongoing access.",
    features: [
      "Unlimited document drafting with GramAI",
      "Unlimited contract review and red-flag analysis",
      "Unlimited GramAI legal Q&A",
      "Unlimited e-signatures",
      "One household seat",
      "24-hour email support"
    ],
    recommended: true
  },
  {
    id: "business",
    name: "Business",
    price: "$39",
    period: "month",
    description: "Freelancers, consultants, and small businesses.",
    features: [
      "Business document library",
      "LLC or DBA formation ($99 flat service fee)",
      "Compliance and renewal calendar",
      "Up to 5 team seats",
      "Priority support with 12-hour response"
    ]
  }
];

const PlanUpgrade = () => {
  return (
    <div>
      <h1 className="heading-lg mb-2">Upgrade Your Plan</h1>
      <p className="text-rocket-gray-500 mb-6">
        Choose the plan that best suits your legal needs. See the full comparison on our{" "}
        <Link to="/pricing" className="text-bright-orange-500 hover:underline">pricing page</Link>.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col transition-all hover:shadow-lg ${
              plan.recommended ? "border-bright-orange-400 ring-2 ring-bright-orange-400" : ""
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-bright-orange-500 text-white text-xs font-medium py-1 px-3 rounded-full whitespace-nowrap">
                <Star className="h-3 w-3 fill-current" /> Most Popular
              </div>
            )}

            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-rocket-gray-500">/{plan.period}</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-bright-orange-500 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              {plan.id === "free" ? (
                <Button variant="outline" className="w-full" disabled>
                  Your Current Plan
                </Button>
              ) : (
                <Button
                  className={`w-full ${
                    plan.recommended
                      ? "bg-bright-orange-500 hover:bg-bright-orange-600 text-white"
                      : ""
                  }`}
                  variant={plan.recommended ? "default" : "outline"}
                  asChild
                >
                  <Link to="/contact">Contact Us to Upgrade</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="text-sm text-rocket-gray-500">
        Every paid plan comes with a 14-day money-back guarantee, and you can cancel any time in one click.
      </p>
    </div>
  );
};

export default PlanUpgrade;
