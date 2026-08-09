import {
  Heart, CheckCircle, AlertTriangle, FileText,
  ArrowLeft, Star, Clock, HandHeart, Landmark, Users
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

const WhatsANonprofit = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-100 pt-24 pb-10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-emerald-600 p-4 rounded-full">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What's a Nonprofit Organization?
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn how a nonprofit lets you pursue your mission with tax benefits, grant eligibility and public trust
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                asChild
              >
                <Link to="/documents/nonprofit-formation">Start Your Nonprofit</Link>
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

      {/* What is a Nonprofit Section */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" {...fadeUp}>
              Understanding Nonprofit Organizations
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div {...fadeUp}>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  A nonprofit organization exists to serve a public or charitable mission rather than to generate profit for owners. Any money the organization earns is reinvested into its mission instead of being distributed to shareholders.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Once your nonprofit is formed and approved by the IRS as a 501(c)(3) organization, it becomes exempt from federal income tax, and donations made to it are tax deductible for your donors.
                </p>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <HandHeart className="w-6 h-6 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Built for Your Mission</h3>
                      <p className="text-gray-700">
                        Charities, foundations, religious groups, educational programs and community organizations all use the nonprofit structure to serve their communities.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-emerald-200 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">Key Nonprofit Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Federal and state tax exemption
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Tax deductible donations for donors
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Eligibility for grants and public funding
                  </li>
                  <li className="flex items-center text-gray-800 font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    Limited liability for directors and members
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How Formation Works */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" {...fadeUp}>
              How Nonprofit Formation Works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  iconBg: "bg-emerald-100",
                  iconColor: "text-emerald-600",
                  title: "1. Incorporate Your Nonprofit",
                  text: "File articles of incorporation with your state and adopt bylaws that govern how your organization operates."
                },
                {
                  icon: Landmark,
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600",
                  title: "2. Apply for Tax Exemption",
                  text: "Submit IRS Form 1023 or 1023-EZ to receive 501(c)(3) tax exempt status for your organization."
                },
                {
                  icon: Users,
                  iconBg: "bg-purple-100",
                  iconColor: "text-purple-600",
                  title: "3. Build Your Board and Serve",
                  text: "Appoint a board of directors, follow your bylaws and start pursuing your mission with full legal protection."
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

      {/* Is a Nonprofit Right for You */}
      <section className="py-10 bg-emerald-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-8" {...fadeUp}>
              Is a Nonprofit Right for You?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Star,
                  iconBg: "bg-green-100",
                  iconColor: "text-green-600",
                  title: "Great For",
                  items: ["Charitable and community missions", "Educational and religious programs", "Organizations seeking grants", "Groups relying on donations"]
                },
                {
                  icon: Clock,
                  iconBg: "bg-amber-100",
                  iconColor: "text-amber-600",
                  title: "Plan Ahead For",
                  items: ["IRS application processing time", "Annual reporting requirements", "Board governance duties", "Fundraising compliance rules"]
                },
                {
                  icon: AlertTriangle,
                  iconBg: "bg-red-100",
                  iconColor: "text-red-600",
                  title: "May Not Be Ideal",
                  items: ["Businesses seeking owner profit", "Ventures needing investors", "Projects without a public mission", "Short-term initiatives"]
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

      {/* CTA Section */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div className="max-w-4xl mx-auto text-center" {...fadeUp}>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Start Your Nonprofit?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We will guide you through formation so you can focus on your mission. Create your nonprofit formation documents in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white"
                asChild
              >
                <Link to="/documents/nonprofit-formation">Start Your Nonprofit</Link>
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
    </Layout>
  );
};

export default WhatsANonprofit;
