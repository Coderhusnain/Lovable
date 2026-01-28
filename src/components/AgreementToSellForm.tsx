import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const AgreementToSellForm = () => {
  const [form, setForm] = useState({
    sellerName: '',
    buyerName: '',
    itemDescription: '',
    salePrice: '',
    saleDate: '',
    terms: '',
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <label>
            Seller Name
            <input
              type="text"
              value={form.sellerName}
              onChange={e => setForm(f => ({ ...f, sellerName: e.target.value }))}
              required
            />
          </label>
          <label>
            Buyer Name
            <input
              type="text"
              value={form.buyerName}
              onChange={e => setForm(f => ({ ...f, buyerName: e.target.value }))}
              required
            />
          </label>
          <label>
            Item Description
            <textarea
              value={form.itemDescription}
              onChange={e => setForm(f => ({ ...f, itemDescription: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.sellerName && form.buyerName && form.itemDescription),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <label>
            Sale Price
            <input
              type="number"
              value={form.salePrice}
              onChange={e => setForm(f => ({ ...f, salePrice: e.target.value }))}
              required
            />
          </label>
          <label>
            Sale Date
            <input
              type="date"
              value={form.saleDate}
              onChange={e => setForm(f => ({ ...f, saleDate: e.target.value }))}
              required
            />
          </label>
          <label>
            Terms
            <textarea
              value={form.terms}
              onChange={e => setForm(f => ({ ...f, terms: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.salePrice && form.saleDate && form.terms),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default AgreementToSellForm;
