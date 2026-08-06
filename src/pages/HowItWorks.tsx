import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  Download,
  ShieldCheck,
  Clock,
  BadgeCheck,
  ArrowRight,
  PenLine
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Choose Your Legal Document",
    description:
      "Browse our library of attorney drafted legal documents and contract templates. Search by category or name to find the exact form you need for your personal or business situation."
  },
  {
    icon: ClipboardList,
    title: "Answer a Few Simple Questions",
    description:
      "Our guided questionnaire asks plain language questions about your situation. Your answers fill in the document automatically, so you never start from a blank page."
  },
  {
    icon: PenLine,
    title: "Review and Customize",
    description:
      "Preview your completed document and make any edits you need. Every legal form is kept up to date to comply with current state and federal laws."
  },
  {
    icon: Download,
    title: "Download, Sign and Share",
    description:
      "Download your finished legal document instantly in Word or PDF format. Print it, sign it and share it with the other parties whenever you are ready."
  }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure and Confidential",
    description: "Your information is protected with enterprise grade security and encryption."
  },
  {
    icon: Clock,
    title: "Ready in Minutes",
    description: "Create professional legal documents online in minutes with no appointments needed."
  },
  {
    icon: BadgeCheck,
    title: "Attorney Reviewed",
    description: "Every template is drafted and reviewed by licensed and experienced attorneys."
  }
];

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pb-16 bg-gradient-to-b from-rocket-gray-50 to-white">
        <div className="container-custom text-center">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
            How It Works
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Create Legal Documents Online in Four Simple Steps
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Legalgram makes professional legal documents simple. Answer a few questions and get an attorney drafted document that is ready to sign, download and share.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-md p-6 md:p-8"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bright-orange-500 to-bright-orange-600 text-white shadow-md">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-sm font-semibold text-bright-orange-500">
                    Step {index + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-rocket-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
            Why People Trust Legalgram
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bright-orange-100">
                  <benefit.icon className="h-6 w-6 text-bright-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Create Your Legal Document?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Start now and have a professional, attorney drafted document ready in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/documents">
              <Button variant="orange" size="lg" className="px-8">
                Browse Legal Documents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/ask-legal-advice">
              <Button variant="outline" size="lg" className="px-8">
                Ask a Legal Question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
