import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  seller: '',
  buyer: '',
  goodsDescription: '',
  price: '',
  deliveryDate: '',
  inspectionTerms: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('SALE OF GOODS AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Seller: ${data.seller}`, 20, 40);
  doc.text(`Buyer: ${data.buyer}`, 20, 50);
  doc.text(`Goods Description: ${data.goodsDescription}`, 20, 60);
  doc.text(`Price: ${data.price}`, 20, 70);
  doc.text(`Delivery Date: ${data.deliveryDate}`, 20, 80);
  doc.text(`Inspection Terms: ${data.inspectionTerms}`, 20, 90);
  doc.save('SaleOfGoodsAgreement.pdf');
}


const SaleOfGoodsForm = () => {
  const [form, setForm] = React.useState(initialData);

  const steps = [
    {
      label: 'Parties',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Seller"
            value={form.seller}
            onChange={e => setForm(f => ({ ...f, seller: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Buyer"
            value={form.buyer}
            onChange={e => setForm(f => ({ ...f, buyer: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="date"
            placeholder="Delivery Date"
            value={form.deliveryDate}
            onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Goods & Terms',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Goods Description"
            value={form.goodsDescription}
            onChange={e => setForm(f => ({ ...f, goodsDescription: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Inspection Terms"
            value={form.inspectionTerms}
            onChange={e => setForm(f => ({ ...f, inspectionTerms: e.target.value }))}
          />
        </div>
      ),
    },
  ];

  return (
    <FormWizard
      steps={steps}
      onFinish={() => generatePDF(form)}
    />
  );
};

export default SaleOfGoodsForm;
