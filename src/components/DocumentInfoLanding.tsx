import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield, Clock, FileText, CheckCircle, ArrowLeft, AlertTriangle, 
  Lightbulb, Scale, Clipboard, FileSignature, ChevronDown, ChevronUp,
  HelpCircle, ListChecks, BookOpen, BadgeCheck, Timer, Info
} from 'lucide-react';
import { getDocumentContent, DocumentContent } from '@/data/documentContent';

interface DocumentInfoLandingProps {
  title: string;
  description: string;
  category: string;
  onStart: () => void;
  onBack: () => void;
}

// FAQ Accordion Component
const FAQAccordion: React.FC<{ faqs: { q: string; a: string }[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-5 py-4 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-5 py-4 bg-white border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function DocumentInfoLanding({
  title,
  description,
  category,
  onStart,
  onBack
}: DocumentInfoLandingProps) {
  const docContent: DocumentContent = getDocumentContent(title);

  return (
    <div className="max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Documents
      </Button>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 leading-tight">
                  {title}
                </h1>
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Timer className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">{docContent.estimatedTime || '10-15 minutes'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                <BadgeCheck className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Legally Binding</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Professional Quality</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">What is a {title}?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              {docContent.whatIs}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">When Should You Use This Document?</h2>
            </div>
            <ul className="space-y-3">
              {docContent.whenToUse.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {docContent.keyProtections && docContent.keyProtections.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Key Legal Protections</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {docContent.keyProtections.map((protection, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {docContent.faqs && docContent.faqs.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <FAQAccordion faqs={docContent.faqs} />
            </div>
          )}

          {docContent.whatYouNeed && docContent.whatYouNeed.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clipboard className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">What You'll Need to Get Started</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {docContent.whatYouNeed.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <ListChecks className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Create Your Document?</h3>
                <p className="text-blue-100">Complete the form step-by-step. Estimated time: {docContent.estimatedTime || '10-15 minutes'}</p>
              </div>
              <Button 
                onClick={onStart} 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto shadow-lg font-semibold whitespace-nowrap"
              >
                <FileSignature className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl">Quick Guide</h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <Clock className="w-8 h-8 text-orange-200" />
                  <div>
                    <p className="text-orange-100 text-sm">Estimated Time</p>
                    <p className="font-bold text-lg">{docContent.estimatedTime || '10-15 minutes'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-100 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Why This Document Matters
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-200 mt-0.5 shrink-0" />
                      <span className="text-white/90">Creates a legally enforceable agreement</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-200 mt-0.5 shrink-0" />
                      <span className="text-white/90">Protects both parties' rights and interests</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-200 mt-0.5 shrink-0" />
                      <span className="text-white/90">Prevents future misunderstandings</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-200 mt-0.5 shrink-0" />
                      <span className="text-white/90">Provides evidence in case of disputes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <Scale className="w-4 h-4" />
                  <span>Drafted by legal professionals</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Important Notice</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    This document is for informational purposes. For complex legal matters, 
                    consult with a licensed attorney in your jurisdiction.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <Button 
                onClick={onStart} 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6 h-auto shadow-xl rounded-xl font-semibold"
              >
                <FileSignature className="w-5 h-5 mr-2" />
                Make my Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
