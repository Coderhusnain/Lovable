import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

/* ────────────────────────────────────────────────────────────────
   Member portal — Start a Business tab.
   Routes members into Legalgram's real formation flows (DIY LLC and DIY
   Nonprofit), plus guidance for other structures. Replaces the old simulated
   "Business Formation Form" that did not submit anywhere.
   ──────────────────────────────────────────────────────────────── */

const options = [
  {
    kicker: "Most popular",
    title: "Form an LLC",
    description:
      "Personal-asset protection with pass-through taxes and minimal paperwork. Answer a few questions and get your Articles, Operating Agreement, Filing Instructions, and EIN Worksheet.",
    price: "$49",
    cta: "Start my LLC",
    to: "/form-my-llc",
  },
  {
    kicker: "Charitable / 501(c)(3)",
    title: "Form a Nonprofit",
    description:
      "State incorporation plus everything you need for your IRS Form 1023: Bylaws, Conflict of Interest Policy, board minutes, EIN worksheet, your state's Articles, and a filing checklist.",
    price: "$59",
    cta: "Start my Nonprofit",
    to: "/form-my-nonprofit",
  },
];

const StartBusiness = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Start a Business</h1>
        <p className="text-muted-foreground">
          Choose what you want to form. We prepare the documents step by step and have them ready to download in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((o) => (
          <Card key={o.to} className="border-t-[3px] border-t-bright-orange-500 flex flex-col">
            <CardContent className="p-6 flex flex-col flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bright-orange-600 mb-2">{o.kicker}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{o.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-3">
                {o.price} <span className="text-sm font-normal text-gray-500">+ state filing fee</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{o.description}</p>
              <Button variant="orange" className="w-full mt-5" asChild>
                <Link to={o.to}>{o.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Forming a Corporation or S-Corp?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Compare business structures and see what fits your goals, or browse our corporate documents to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" asChild><Link to="/start-a-business">Compare business structures</Link></Button>
            <Button variant="outline" asChild><Link to="/documents/corporation">Corporation documents</Link></Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-400 mt-6">
        Legalgram is not a law firm and does not provide legal advice. State filing fees are set by your state and shown at checkout on your state's website.
      </p>
    </div>
  );
};

export default StartBusiness;
