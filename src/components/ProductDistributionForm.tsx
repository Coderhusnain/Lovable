import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  supplier: '',
  distributor: '',
  territory: '',
  products: '',
  exclusivity: '',
  term: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('PRODUCT DISTRIBUTION AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Supplier: ${data.supplier}`, 20, 40);
  doc.text(`Distributor: ${data.distributor}`, 20, 50);
  doc.text(`Territory: ${data.territory}`, 20, 60);
  doc.text(`Products: ${data.products}`, 20, 70);
  doc.text(`Exclusivity: ${data.exclusivity}`, 20, 80);
  doc.text(`Term: ${data.term}`, 20, 90);
  doc.save('ProductDistributionAgreement.pdf');
}


const ProductDistributionForm = () => {
  const [form, setForm] = React.useState(initialData);

  const steps = [
    {
      label: 'Parties',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Supplier"
            value={form.supplier}
            onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Distributor"
            value={form.distributor}
            onChange={e => setForm(f => ({ ...f, distributor: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Territory"
            value={form.territory}
            onChange={e => setForm(f => ({ ...f, territory: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Products & Terms',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Products"
            value={form.products}
            onChange={e => setForm(f => ({ ...f, products: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Exclusivity"
            value={form.exclusivity}
            onChange={e => setForm(f => ({ ...f, exclusivity: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Term"
            value={form.term}
            onChange={e => setForm(f => ({ ...f, term: e.target.value }))}
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


export default ProductDistributionForm;
