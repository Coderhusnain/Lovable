import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Clock, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

interface DocumentInfoLandingProps {
  title: string;
  description: string;
  category: string;
  onStart: () => void;
  onBack: () => void;
}

export default function DocumentInfoLanding({ title, description, category, onStart, onBack }: DocumentInfoLandingProps) {
  return (
    <div className='max-w-5xl mx-auto animate-in fade-in duration-500'>
      <Button variant='ghost' onClick={onBack} className='mb-6'>
        <ArrowLeft className='w-4 h-4 mr-2' /> Back to Categories
      </Button>
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <div>
          <span className='inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4'>{category}</span>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>{title}</h1>
          <p className='text-xl text-gray-600 mb-8 leading-relaxed'>{description}</p>
          
          <div className='space-y-4 mb-8'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-full'><Shield className='w-5 h-5 text-green-700' /></div>
              <span className='font-medium text-gray-700'>Legally Binding & Compliant</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-full'><Clock className='w-5 h-5 text-blue-700' /></div>
              <span className='font-medium text-gray-700'>Takes only 5-10 minutes</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-full'><FileText className='w-5 h-5 text-purple-700' /></div>
              <span className='font-medium text-gray-700'>Instant PDF Download</span>
            </div>
          </div>

          <Button onClick={onStart} size='lg' className='bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto w-full md:w-auto shadow-lg shadow-blue-200'>
            Make my Document
          </Button>
        </div>

        <div className='bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner'>
          <h3 className='font-bold text-lg mb-6 text-gray-900'>What you need to start:</h3>
          <ul className='space-y-4'>
            {[ 
              'Names and addresses of all parties',
              'Specific terms and conditions',
              'Effective dates and duration',
              'Payment or compensation details (if applicable)'
            ].map((item, i) => (
              <li key={i} className='flex items-start gap-3'>
                <CheckCircle className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                <span className='text-gray-600'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}