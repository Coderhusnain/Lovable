import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  client: '',
  provider: '',
  hardwareSoftwareScope: '',
  maintenanceTerms: '',
  sla: '',
  fees: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('IT SERVICE AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Client: ${data.client}`, 20, 40);
  doc.text(`Provider: ${data.provider}`, 20, 50);
  doc.text(`Hardware/Software Scope: ${data.hardwareSoftwareScope}`, 20, 60);
  doc.text(`Maintenance Terms: ${data.maintenanceTerms}`, 20, 70);
  doc.text(`SLA: ${data.sla}`, 20, 80);
  doc.text(`Fees: ${data.fees}`, 20, 90);
  doc.save('ITServiceAgreement.pdf');
}


const ITServiceAgreementForm = () => {
  const [form, setForm] = React.useState(initialData);

  const steps = [
    {
      label: 'Parties',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Client"
            value={form.client}
            onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Provider"
            value={form.provider}
            onChange={e => setForm(f => ({ ...f, provider: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Hardware/Software Scope"
            value={form.hardwareSoftwareScope}
            onChange={e => setForm(f => ({ ...f, hardwareSoftwareScope: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Terms',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Maintenance Terms"
            value={form.maintenanceTerms}
            onChange={e => setForm(f => ({ ...f, maintenanceTerms: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="SLA"
            value={form.sla}
            onChange={e => setForm(f => ({ ...f, sla: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Fees"
            value={form.fees}
            onChange={e => setForm(f => ({ ...f, fees: e.target.value }))}
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

export default ITServiceAgreementForm;
