import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaleOfGoodsInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Sale of Goods Agreement</h1>
      <p className="mb-4">A Sale of Goods Agreement is a contract between a seller and a buyer for the sale and purchase of goods. It details the goods, price, delivery, and inspection terms, protecting both parties in the transaction.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Identifies seller, buyer, and goods</li>
        <li>Specifies price and delivery date</li>
        <li>Includes inspection and acceptance terms</li>
        <li>Legally binding for both parties</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/sale-of-goods-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default SaleOfGoodsInfo;
