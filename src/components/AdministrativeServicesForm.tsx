import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  client: '',
  provider: '',
  servicesList: '',
  hourlyRate: '',
  confidentiality: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('ADMINISTRATIVE SERVICES AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Client: ${data.client}`, 20, 40);
  doc.text(`Provider: ${data.provider}`, 20, 50);
  doc.text(`Services List: ${data.servicesList}`, 20, 60);
  doc.text(`Hourly Rate: ${data.hourlyRate}`, 20, 70);
  doc.text(`Confidentiality: ${data.confidentiality}`, 20, 80);
  doc.save('AdministrativeServicesAgreement.pdf');
}


const AdministrativeServicesForm = () => {
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
            placeholder="Services List"
            value={form.servicesList}
            onChange={e => setForm(f => ({ ...f, servicesList: e.target.value }))}
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
            placeholder="Hourly Rate"
            value={form.hourlyRate}
            onChange={e => setForm(f => ({ ...f, hourlyRate: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Confidentiality"
            value={form.confidentiality}
            onChange={e => setForm(f => ({ ...f, confidentiality: e.target.value }))}
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

export default AdministrativeServicesForm;
