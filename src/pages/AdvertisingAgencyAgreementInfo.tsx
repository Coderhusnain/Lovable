import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdvertisingAgencyAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Advertising Agency Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        An Advertising Agency Agreement sets the terms for services provided by an agency, including campaign scope, fees, intellectual property, and performance metrics.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines scope of advertising services</li>
        <li>Specifies fees, payment, and expenses</li>
        <li>Outlines intellectual property ownership</li>
        <li>Includes confidentiality and non-compete clauses</li>
        <li>Details performance metrics and reporting</li>
      </ul>
      <Button onClick={() => navigate("/advertising-agency-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default AdvertisingAgencyAgreementInfo;
