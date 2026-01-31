import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AssetPurchaseAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Asset Purchase Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        An Asset Purchase Agreement sets the terms for buying and selling business assets, including price, representations, warranties, and closing conditions.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines assets to be purchased and excluded</li>
        <li>Specifies purchase price and payment terms</li>
        <li>Outlines representations and warranties</li>
        <li>Includes closing and post-closing obligations</li>
        <li>Details indemnification and dispute resolution</li>
      </ul>
      <Button onClick={() => navigate("/asset-purchase-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default AssetPurchaseAgreementInfo;
