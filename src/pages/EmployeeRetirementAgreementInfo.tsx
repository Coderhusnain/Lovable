import { UserCheck, Users, FileText, CheckCircle, AlertCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import employeeRetirementAgreementInfo from "@/data/employeeRetirementAgreementInfo";
import { useNavigate } from "react-router-dom";

const EmployeeRetirementAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const info = employeeRetirementAgreementInfo;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Hero Section */}
        <section className="py-10 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="flex justify-center mb-6">
                <UserCheck className="h-16 w-16" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Employee Retirement Agreement
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                {info.definition}
              </p>
            </div>
          </div>
        </section>

        {/* Why Important Section */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4 mb-6">
                <AlertCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Why You Need an Employee Retirement Agreement
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {info.whyImportant}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-10 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {info.keyBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-600">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How It Works
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {info.howItWorks.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {info.howItWorks.ensures.map((item, index) => (
                  <div key={index} className="flex gap-3 p-4 bg-amber-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Section */}
        <section className="py-10 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              When to Use This Agreement
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {info.whenToUse.map((use, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">{use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Who Should Use This Agreement?
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {info.idealFor.map((ideal, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-gray-700">{ideal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Includes Section */}
        <section className="py-10 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What This Agreement Includes
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {info.whatIncludes.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-amber-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {info.faqItems.map((faq, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-900 hover:bg-gray-50">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700 border-t border-gray-200 pt-6">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-10 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Our Template?
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {info.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4">
                  <FileText className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Formalize Employee Retirement?
            </h2>
            <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Download a professionally drafted Employee Retirement Agreement and finalize retirement terms with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-amber-600 hover:bg-gray-100 font-semibold"
                onClick={() => navigate("/documents")}
              >
                Download Agreement
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-amber-700"
                onClick={() => navigate("/ask-a-lawyer")}
              >
                Ask a Lawyer
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmployeeRetirementAgreementInfo;
