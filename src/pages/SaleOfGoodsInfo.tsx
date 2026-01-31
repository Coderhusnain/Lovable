import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SaleOfGoodsInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Sale of Goods Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        The Sale of Goods Agreement is a legal contract outlining the terms and
        conditions for the sale and purchase of goods between two parties. It
        covers details such as product description, quantity, price, delivery,
        warranties, and dispute resolution.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines goods, quantity, and specifications</li>
        <li>Sets purchase price and payment terms</li>
        <li>Outlines delivery schedule and responsibilities</li>
        <li>Includes warranties and liability clauses</li>
        <li>Details dispute resolution process</li>
      </ul>
      <Button onClick={() => navigate("/sale-of-goods-form")}>
        Create Document
      </Button>
    </div>
  );
};

export default SaleOfGoodsInfo;
