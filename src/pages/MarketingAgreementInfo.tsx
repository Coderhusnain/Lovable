import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MarketingAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Marketing Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        A Marketing Agreement sets the terms for marketing services, including scope, deliverables, fees, intellectual property, and performance expectations.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines scope of marketing services</li>
        <li>Specifies deliverables and timeline</li>
        <li>Outlines fees, payment, and expenses</li>
        <li>Includes intellectual property and confidentiality clauses</li>
        <li>Details performance metrics and reporting</li>
      </ul>
      <Button onClick={() => navigate("/marketing-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default MarketingAgreementInfo;
