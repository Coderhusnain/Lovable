
import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  originalContractDate: '',
  originalContractTitle: '',
  partyA: '',
  partyB: '',
  newEndDate: '',
  amendments: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('CONTRACT EXTENSION AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Original Contract Date: ${data.originalContractDate}`, 20, 40);
  doc.text(`Original Contract Title: ${data.originalContractTitle}`, 20, 50);
  doc.text(`Party A: ${data.partyA}`, 20, 60);
  doc.text(`Party B: ${data.partyB}`, 20, 70);
  doc.text(`New End Date: ${data.newEndDate}`, 20, 80);
  doc.text(`Amendments: ${data.amendments}`, 20, 90);
  doc.save('ContractExtensionAgreement.pdf');
}

const ContractExtensionForm = () => {
  const [form, setForm] = React.useState(initialData);

  const steps = [
    {
      label: 'Original Contract',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="date"
            placeholder="Original Contract Date"
            value={form.originalContractDate}
            onChange={e => setForm(f => ({ ...f, originalContractDate: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Original Contract Title"
            value={form.originalContractTitle}
            onChange={e => setForm(f => ({ ...f, originalContractTitle: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Party A"
            value={form.partyA}
            onChange={e => setForm(f => ({ ...f, partyA: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Extension Details',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Party B"
            value={form.partyB}
            onChange={e => setForm(f => ({ ...f, partyB: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="date"
            placeholder="New End Date"
            value={form.newEndDate}
            onChange={e => setForm(f => ({ ...f, newEndDate: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Amendments"
            value={form.amendments}
            onChange={e => setForm(f => ({ ...f, amendments: e.target.value }))}
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

export default ContractExtensionForm;
