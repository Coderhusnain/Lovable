import {
  Building2, DollarSign, CheckCircle,
  AlertTriangle, FileText, Calculator,
  ArrowLeft, Star, TrendingUp, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

const WhatsAnSCorp = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-600 p-4 rounded-full">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What's an S-Corporation?
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover how S-Corp tax election can help your business save money and grow more efficiently
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <Link to="/documents/corporation-formation">Start S-Corp Election</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link to="/start-a-business">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Business Options
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is an S-Corp Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" {...fadeUp}>
              Understanding S-Corporation Tax Election
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div {...fadeUp}>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  An S-Corporation isn't actually a business entity type. It is a special tax election that your LLC or Corporation can make with the IRS. This election allows your business to be taxed differently, potentially saving you thousands in self-employment taxes.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  When you elect S-Corp status, your business becomes a "pass-through" entity for tax purposes, meaning the business itself doesn't pay federal income taxes. Instead, profits and losses pass through to your personal tax return.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <Calculator className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Tax Savings Example</h3>
                      <p className="text-gray-700">
                        A business owner making $100,000 could potentially save $1,500-$3,000 annually in self-employment taxes with S-Corp election.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-blue-200 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">Key S-Corp Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Potential self-employment tax savings
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Pass-through taxation
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Salary and distribution flexibility
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Maintain business structure
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How S-Corp Election Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" {...fadeUp}>
              How S-Corp Election Works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  iconBg: "bg-green-100",
                  iconColor: "text-green-600",
                  title: "1. File Form 2553",
                  text: "Submit Form 2553 to the IRS to elect S-Corporation tax treatment for your existing LLC or Corporation."
                },
                {
                  icon: DollarSign,
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600",
                  title: "2. Pay Reasonable Salary",
                  text: "As an owner-employee, you must pay yourself a reasonable salary subject to payroll taxes."
                },
                {
                  icon: TrendingUp,
                  iconBg: "bg-purple-100",
                  iconColor: "text-purple-600",
                  title: "3. Take Distributions",
                  text: "Additional profits can be distributed to owners without self-employment tax."
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={`${step.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-700">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements and Considerations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" {...fadeUp}>
              S-Corp Requirements & Considerations
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Requirements
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Must have 100 or fewer shareholders</li>
                  <li>• Shareholders must be U.S. citizens or residents</li>
                  <li>• Only one class of stock allowed</li>
                  <li>• Must pay reasonable salary to owner-employees</li>
                  <li>• Must file annual tax return (Form 1120S)</li>
                  <li>• Election must be made by March 15th (or within 75 days of formation)</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-amber-600 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Considerations
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Increased payroll and bookkeeping complexity</li>
                  <li>• Must determine and pay "reasonable salary"</li>
                  <li>• Additional tax filing requirements</li>
                  <li>• May not be beneficial for lower-income businesses</li>
                  <li>• Certain fringe benefits may be taxable</li>
                  <li>• Built-in gains tax may apply in some cases</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* When S-Corp Makes Sense */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-8" {...fadeUp}>
              Is S-Corp Election Right for Your Business?
            </motion.h2>
            <motion.p className="text-lg text-gray-700 mb-8" {...fadeUp}>
              S-Corp election typically makes sense when your business profits exceed $60,000-$80,000 annually
            </motion.p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Star,
                  iconBg: "bg-green-100",
                  iconColor: "text-green-600",
                  title: "Great For",
                  items: ["Profitable businesses ($60K+ annually)", "Service-based companies", "Businesses with active owners", "Companies wanting tax savings"]
                },
                {
                  icon: Clock,
                  iconBg: "bg-amber-100",
                  iconColor: "text-amber-600",
                  title: "Consider Timing",
                  items: ["New businesses (wait for profitability)", "Seasonal businesses", "Businesses with irregular income", "Companies planning major investments"]
                },
                {
                  icon: AlertTriangle,
                  iconBg: "bg-red-100",
                  iconColor: "text-red-600",
                  title: "May Not Be Ideal",
                  items: ["Low-profit businesses", "Passive investment companies", "Businesses with losses", "Complex ownership structures"]
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={`${card.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{card.title}</h3>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    {card.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Help Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div className="max-w-4xl mx-auto text-center" {...fadeUp}>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Get Expert Help with Your S-Corp Election
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't navigate S-Corp election alone. Our experts will help you determine if it's right for your business and handle the paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white"
                asChild
              >
                <Link to="/documents/corporation-formation">Start S-Corp Election</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link to="/contact">Speak with an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" {...fadeUp}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  q: "Can any business elect S-Corp status?",
                  a: "Most LLCs and C-Corporations can elect S-Corp status, but there are restrictions. You must have 100 or fewer shareholders, only U.S. citizens or residents as shareholders, and only one class of stock."
                },
                {
                  q: "When should I make the S-Corp election?",
                  a: "For existing businesses, the election must be made by March 15th of the tax year you want it to take effect. For new businesses, you have 75 days from formation to make the election."
                },
                {
                  q: "How much can I save with S-Corp election?",
                  a: "Savings vary based on your business income and salary. Generally, businesses with profits over $60,000 annually can see significant savings in self-employment taxes, often $1,500-$5,000+ per year."
                },
                {
                  q: "What's a \"reasonable salary\" for S-Corp owners?",
                  a: "The IRS requires S-Corp owner-employees to pay themselves a reasonable salary based on their role, experience, and what similar positions pay in their industry and location."
                }
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  className="border-l-4 border-blue-500 pl-6"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatsAnSCorp;
