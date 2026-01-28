import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDistributionInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Product Distribution Agreement</h1>
      <p className="mb-4">A Product Distribution Agreement defines the relationship between a supplier and a distributor, including territory, products, exclusivity, and term. It ensures both parties understand their rights and obligations.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Identifies supplier, distributor, and territory</li>
        <li>Lists products and exclusivity terms</li>
        <li>Specifies agreement term and renewal</li>
        <li>Clarifies distribution rights and duties</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/product-distribution-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default ProductDistributionInfo;
