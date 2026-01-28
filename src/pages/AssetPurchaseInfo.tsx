import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssetPurchaseInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Asset Purchase Agreement</h1>
      <p className="mb-4">An Asset Purchase Agreement is a contract for the sale and transfer of assets from a seller to a buyer. It details the assets, price, closing date, and warranties, protecting both parties in the transaction.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Identifies buyer, seller, and assets</li>
        <li>Specifies purchase price and closing date</li>
        <li>Includes warranties and representations</li>
        <li>Legally binding for both parties</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/asset-purchase-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default AssetPurchaseInfo;
