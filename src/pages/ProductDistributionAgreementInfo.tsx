import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductDistributionAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Product Distribution Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        A Product Distribution Agreement outlines the terms under which a supplier grants a distributor the right to sell or distribute its products. It covers territory, exclusivity, pricing, and obligations.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines products and distribution territory</li>
        <li>Specifies exclusivity or non-exclusivity</li>
        <li>Outlines pricing, payment, and delivery terms</li>
        <li>Details obligations of supplier and distributor</li>
        <li>Includes termination and dispute resolution clauses</li>
      </ul>
      <Button onClick={() => navigate("/product-distribution-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default ProductDistributionAgreementInfo;
