import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  client: '',
  marketer: '',
  campaignScope: '',
  deliverables: '',
  compensation: '',
  timeline: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('MARKETING AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Client: ${data.client}`, 20, 40);
  doc.text(`Marketer: ${data.marketer}`, 20, 50);
  doc.text(`Campaign Scope: ${data.campaignScope}`, 20, 60);
  doc.text(`Deliverables: ${data.deliverables}`, 20, 70);
  doc.text(`Compensation: ${data.compensation}`, 20, 80);
  doc.text(`Timeline: ${data.timeline}`, 20, 90);
  doc.save('MarketingAgreement.pdf');
}

const MarketingAgreementFormSimple = () => {
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
            placeholder="Marketer"
            value={form.marketer}
            onChange={e => setForm(f => ({ ...f, marketer: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Campaign',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Campaign Scope"
            value={form.campaignScope}
            onChange={e => setForm(f => ({ ...f, campaignScope: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Deliverables"
            value={form.deliverables}
            onChange={e => setForm(f => ({ ...f, deliverables: e.target.value }))}
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
            placeholder="Compensation"
            value={form.compensation}
            onChange={e => setForm(f => ({ ...f, compensation: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Timeline"
            value={form.timeline}
            onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
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

export default MarketingAgreementFormSimple;
