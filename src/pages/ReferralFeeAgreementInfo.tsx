import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ReferralFeeAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Referral Fee Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        A Referral Fee Agreement sets the terms for compensation when one party refers a client or business to another. It covers payment structure, obligations, and legal protections for both parties.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines referral process and eligible referrals</li>
        <li>Specifies fee amount and payment terms</li>
        <li>Outlines obligations and responsibilities</li>
        <li>Includes confidentiality and non-circumvention clauses</li>
        <li>Details dispute resolution process</li>
      </ul>
      <Button onClick={() => navigate("/referral-fee-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default ReferralFeeAgreementInfo;
