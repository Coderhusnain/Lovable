import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  client: '',
  agency: '',
  mediaChannels: '',
  budget: '',
  creativeControl: '',
  fees: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('ADVERTISING AGENCY AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Client: ${data.client}`, 20, 40);
  doc.text(`Agency: ${data.agency}`, 20, 50);
  doc.text(`Media Channels: ${data.mediaChannels}`, 20, 60);
  doc.text(`Budget: ${data.budget}`, 20, 70);
  doc.text(`Creative Control: ${data.creativeControl}`, 20, 80);
  doc.text(`Fees: ${data.fees}`, 20, 90);
  doc.save('AdvertisingAgencyAgreement.pdf');
}


const AdvertisingAgencyForm = () => {
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
            placeholder="Agency"
            value={form.agency}
            onChange={e => setForm(f => ({ ...f, agency: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Media Channels"
            value={form.mediaChannels}
            onChange={e => setForm(f => ({ ...f, mediaChannels: e.target.value }))}
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
            placeholder="Budget"
            value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Creative Control"
            value={form.creativeControl}
            onChange={e => setForm(f => ({ ...f, creativeControl: e.target.value }))}
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

export default AdvertisingAgencyForm;
