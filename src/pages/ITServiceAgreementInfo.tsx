import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ITServiceAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">IT Service Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        An IT Service Agreement defines the terms for providing information technology services, including scope, deliverables, payment, and support. It protects both service provider and client.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Specifies services, deliverables, and timeline</li>
        <li>Outlines payment terms and invoicing</li>
        <li>Includes confidentiality and data protection clauses</li>
        <li>Details support, maintenance, and warranties</li>
        <li>Provides termination and dispute resolution terms</li>
      </ul>
      <Button onClick={() => navigate("/it-service-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default ITServiceAgreementInfo;
