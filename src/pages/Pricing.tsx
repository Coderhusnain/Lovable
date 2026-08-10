
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Lock, MousePointerClick, FileCheck, Receipt, ArrowRight } from "lucide-react";
import { OPEN_GRAM_AI_EVENT } from "@/components/chat/ChatWidget";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

type Billing = "monthly" | "annual";

interface PlanDef {
  name: string;
  tagline: string;
  monthly: string;
  annual: string;
  priceNote?: string;
  saveNote?: string;
  cta: string;
  ctaTo: string;
  ctaNote?: string;
  featuresTitle: string;
  features: { text: string; boldPrefix?: string }[];
  popular?: boolean;
}

const plans: PlanDef[] = [
  {
    name: "Free",
    tagline: "Try Legalgram before you commit.",
    monthly: "$0",
    annual: "$0",
    priceNote: "forever",
    cta: "Get Started Free",
    ctaTo: "/signup",
    ctaNote: "No card required.",
    featuresTitle: "What's included:",
    features: [
      { text: "Browse the full 100+ template library" },
      { text: "3 GramAI legal questions per month" },
      { text: "Preview any document (no download, no signing)" },
      { text: "Community support via help center" }
    ]
  },
  {
    name: "Single Document",
    tagline: "One-off need? Get one document, no subscription.",
    monthly: "$39",
    annual: "$39",
    priceNote: "one-time",
    cta: "Buy Single Document",
    ctaTo: "/contact",
    ctaNote: "Great for a one-off lease, will, NDA, or contractor agreement.",
    featuresTitle: "Everything in Free, plus:",
    features: [
      { text: "Draft and download one attorney-prepared document" },
      { text: "30 days of edits and version history on that document" },
      { text: "E-signature for that document" },
      { text: "One GramAI contract review" },
      { text: "Email support" }
    ]
  },
  {
    name: "Essentials",
    tagline: "For individuals and families who want ongoing access.",
    monthly: "$19",
    annual: "$149",
    saveNote: "save $79",
    cta: "Start with Essentials",
    ctaTo: "/contact",
    ctaNote: "Cancel any time in one click.",
    featuresTitle: "Everything in Single Document, plus:",
    features: [
      { text: "document drafting with GramAI", boldPrefix: "Unlimited" },
      { text: "contract review and red-flag analysis", boldPrefix: "Unlimited" },
      { text: "GramAI legal Q&A", boldPrefix: "Unlimited" },
      { text: "Unlimited e-signatures" },
      { text: "Full document storage and version history" },
      { text: "One household seat (share with spouse or partner)" },
      { text: "24-hour email support" }
    ],
    popular: true
  },
  {
    name: "Business",
    tagline: "Freelancers, consultants, and small businesses.",
    monthly: "$39",
    annual: "$309",
    saveNote: "save $159",
    cta: "Start with Business",
    ctaTo: "/contact",
    ctaNote: "State filing fees vary by state and are shown at checkout.",
    featuresTitle: "Everything in Essentials, plus:",
    features: [
      { text: "Business document library: NDAs, independent contractor agreements, operating agreements, service agreements, MSAs" },
      { text: "LLC or DBA formation - flat $99 service fee (state filing fees separate)" },
      { text: "Compliance and renewal calendar for annual reports and franchise tax deadlines" },
      { text: "Up to 5 team seats" },
      { text: "Priority support with 12-hour response" }
    ]
  }
];

const trustStrip = [
  { icon: FileCheck, text: "Attorney-drafted, state-specific templates" },
  { icon: Lock, text: "Bank-level encryption on every document" },
  { icon: MousePointerClick, text: "One-click cancellation" },
  { icon: Receipt, text: "No hidden fees, no auto-billed add-ons" }
];

type Cell = string | boolean;
interface CompareRow {
  label: string;
  values: [Cell, Cell, Cell, Cell];
}
interface CompareGroup {
  heading: string | null;
  rows: CompareRow[];
}

const compareGroups: CompareGroup[] = [
  {
    heading: "DOCUMENTS",
    rows: [
      { label: "Browse full template library (100+)", values: [true, true, true, true] },
      { label: "State-specific, attorney-drafted templates", values: [true, true, true, true] },
      { label: "Document previews", values: [true, true, true, true] },
      { label: "Download & sign documents", values: ["—", "1 document", "Unlimited", "Unlimited"] },
      { label: "E-signature", values: ["—", "That document only", "Unlimited", "Unlimited"] },
      { label: "Document storage & version history", values: ["Read-only", "30 days", true, true] }
    ]
  },
  {
    heading: "GRAMAI FEATURES",
    rows: [
      { label: "GramAI document drafting", values: ["Preview only", "1 document, 30-day edits", "Unlimited", "Unlimited"] },
      { label: "GramAI contract review (red flags & explanations)", values: ["—", "1 contract", "Unlimited", "Unlimited"] },
      { label: "GramAI legal Q&A assistant", values: ["3 questions/month", "✓ (30 days)", "Unlimited", "Unlimited"] },
      { label: "Custom document drafting via GramAI", values: ["—", "1 document", "Unlimited", "Unlimited"] }
    ]
  },
  {
    heading: "BUSINESS FEATURES",
    rows: [
      { label: "Business document library (NDAs, IC agreements, MSAs, operating agreements)", values: ["—", "—", "—", true] },
      { label: "LLC or DBA formation service", values: ["—", "—", "—", "$99 flat + state fee"] },
      { label: "Compliance & renewal calendar", values: ["—", "—", "—", true] }
    ]
  },
  {
    heading: "ACCOUNT",
    rows: [
      { label: "Seats", values: ["1", "1", "1 + household", "Up to 5"] },
      { label: "Support", values: ["Help center", "Email", "Email, 24-hour response", "Priority, 12-hour response"] },
      { label: "Cancel in one click", values: [true, "—", true, true] },
      { label: "14-day money-back guarantee", values: ["—", true, true, true] }
    ]
  }
];

const faqs = [
  {
    q: "Is Legalgram a law firm?",
    a: "No. Legalgram is not a law firm and does not provide legal advice. Our templates are drafted by qualified attorneys, and GramAI provides legal information, not legal advice. For advice on your specific situation, we recommend consulting a licensed attorney in your state."
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. You can cancel your subscription in one click from your account dashboard. Cancellation stops future billing immediately. There are no cancellation fees."
  },
  {
    q: "What happens when I cancel?",
    a: "You keep access until the end of your current billing period. All documents you've created remain downloadable from your account for 30 days after cancellation."
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If Legalgram doesn't work for you, contact us within 14 days of your first payment for a full refund."
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once per year at the annual rate shown. You save 34% compared to paying monthly for 12 months. Annual plans renew automatically at the current rate, and we'll email you 7 days before renewal."
  },
  {
    q: "Are state filing fees included in Business formation?",
    a: "No. The $99 Business formation service fee covers our preparation and filing work. State filing fees are set by your state (typically $50-$500 depending on the state) and are shown at checkout before you pay."
  },
  {
    q: "What's the difference between GramAI and a lawyer?",
    a: "GramAI is an AI legal assistant that helps you draft documents, review contracts, and understand legal concepts. It does not replace a licensed attorney. For matters that involve court appearances, personalized legal strategy, or high-stakes disputes, we recommend hiring a lawyer."
  },
  {
    q: "Do you have attorneys I can consult with?",
    a: "Not yet. We're building a US-licensed attorney network to launch in a future \"Plus\" plan. If you need attorney advice right now, we'll be transparent about that and point you to appropriate resources."
  },
  {
    q: "What if I need a document that isn't in your library?",
    a: "On Essentials and Business plans, GramAI can draft custom documents based on your description. On the Single Document plan, you can request one custom document as your included document."
  }
];

const CellValue = ({ value }: { value: Cell }) => {
  if (value === true) return <Check className="h-5 w-5 text-bright-orange-500 mx-auto" strokeWidth={2.5} />;
  if (value === "—") return <span className="text-gray-300 text-base leading-none select-none">—</span>;
  return <span className="text-gray-900 text-[13px] font-medium leading-snug">{value}</span>;
};

const comparePlanHeaders = [
  { name: "Free", monthly: "$0", annual: "$0", note: "forever", bestFor: "Trying Legalgram", cta: "Get Started Free", to: "/signup", popular: false },
  { name: "Single Document", monthly: "$39", annual: "$39", note: "one-time", bestFor: "One-off need", cta: "Buy Document", to: "/contact", popular: false },
  { name: "Essentials", monthly: "$19/mo", annual: "$149/yr", note: "save $79", bestFor: "Individuals & families", cta: "Start Now", to: "/contact", popular: true },
  { name: "Business", monthly: "$39/mo", annual: "$309/yr", note: "save $159", bestFor: "Freelancers & small business", cta: "Start Now", to: "/contact", popular: false }
];

const Pricing = () => {
  const [billing, setBilling] = useState<Billing>("annual");
  const openGramAi = () => window.dispatchEvent(new CustomEvent(OPEN_GRAM_AI_EVENT));

  return (
    <Layout>
      <Helmet>
        <title>Pricing — Legalgram | Affordable Legal Documents & AI Legal Help</title>
        <meta
          name="description"
          content="Simple, transparent pricing for legal document drafting, contract review, and AI legal help. Plans from $0. Cancel any time."
        />
        <meta
          name="keywords"
          content="legal document pricing, online legal services cost, AI legal assistant subscription, legal template plans"
        />
      </Helmet>

      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-rocket-gray-50 to-white">
        <div className="container-custom text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Straightforward Pricing. No Hidden Fees.
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every plan gives you access to attorney-drafted templates and GramAI, our legal AI assistant. Choose the plan that fits how you'll actually use Legalgram — and cancel any time in one click.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                billing === "monthly" ? "bg-bright-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                billing === "annual" ? "bg-bright-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Annual — save 34%
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {plans.map((plan, i) => {
              const isSubscription = plan.name === "Essentials" || plan.name === "Business";
              const price = billing === "annual" ? plan.annual : plan.monthly;
              const per = plan.priceNote
                ? plan.priceNote
                : billing === "annual" ? "/year" : "/month";
              return (
                <motion.div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl",
                    plan.popular
                      ? "border-bright-orange-400 ring-2 ring-bright-orange-400 shadow-[0_8px_40px_-12px_rgba(241,143,1,0.35)]"
                      : "border-gray-200 hover:border-bright-orange-200"
                  )}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                      <Star className="h-3.5 w-3.5 fill-current" /> Most Popular
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-5 min-h-[40px]">{plan.tagline}</p>

                  <div className="mb-1 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{price}</span>
                    <span className="text-gray-500">{per}</span>
                  </div>
                  <p className="text-sm text-bright-orange-600 font-medium mb-5 min-h-[20px]">
                    {isSubscription && billing === "annual" ? plan.saveNote : " "}
                  </p>

                  <Button
                    className={cn(
                      "w-full py-5 text-base font-semibold mb-2",
                      plan.popular
                        ? "bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 hover:from-bright-orange-600 hover:to-bright-orange-700 text-white shadow-md"
                        : "bg-bright-orange-50 hover:bg-bright-orange-100 text-bright-orange-700"
                    )}
                    asChild
                  >
                    <Link to={plan.ctaTo}>{plan.cta}</Link>
                  </Button>
                  {plan.ctaNote && (
                    <p className="text-xs text-gray-500 italic mb-5 min-h-[28px]">{plan.ctaNote}</p>
                  )}

                  <p className="text-sm font-semibold text-gray-900 mb-3">{plan.featuresTitle}</p>
                  <ul className="space-y-2.5 flex-grow">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-bright-orange-500 mt-0.5 shrink-0" />
                        <span>
                          {f.boldPrefix && <strong className="text-gray-900">{f.boldPrefix} </strong>}
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-bright-orange-50/60 border-y border-bright-orange-100">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-gray-900 mb-4">Every plan includes:</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustStrip.map((t) => (
              <span key={t.text} className="inline-flex items-center gap-2 text-sm text-gray-700">
                <t.icon className="h-4 w-4 text-bright-orange-500" />
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Compare plans */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-8" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Compare Plans Side by Side</h2>
            <p className="text-lg text-gray-600">Every feature, every plan. No fine print.</p>
          </motion.div>

          <motion.div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm" {...fadeUp}>
            <table className="w-full min-w-[880px] border-collapse">
              <thead>
                <tr className="bg-rocket-gray-50">
                  <th className="w-[30%] px-6 py-5 text-left border-b-2 border-gray-200"></th>
                  {comparePlanHeaders.map((p) => (
                    <th
                      key={p.name}
                      className={cn(
                        "w-[17.5%] px-5 py-5 text-center border-b-2 whitespace-nowrap",
                        p.popular
                          ? "bg-bright-orange-50/70 border-b-bright-orange-500"
                          : "border-b-gray-200"
                      )}
                    >
                      <span
                        className={cn(
                          "text-lg font-bold",
                          p.popular ? "text-bright-orange-600" : "text-gray-900"
                        )}
                      >
                        {p.popular && <Star className="inline h-4 w-4 fill-current -mt-1 mr-1" />}
                        {p.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareGroups.map((group, gi) => (
                  <React.Fragment key={gi}>
                    {group.heading && (
                      <tr>
                        <td className="px-6 pt-7 pb-3">
                          <span className="text-sm font-extrabold uppercase tracking-widest text-bright-orange-600 border-b-2 border-bright-orange-400 pb-0.5">
                            {group.heading}
                          </span>
                        </td>
                        {comparePlanHeaders.map((p, pi) => (
                          <td key={pi} className={cn(p.popular && "bg-bright-orange-50/70")}></td>
                        ))}
                      </tr>
                    )}
                    {group.rows.map((row) => (
                      <tr key={row.label} className="group/row">
                        <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-100 group-hover/row:bg-gray-50 transition-colors">
                          {row.label}
                        </td>
                        {row.values.map((v, vi) => (
                          <td
                            key={vi}
                            className={cn(
                              "px-5 py-4 text-center border-b transition-colors",
                              vi === 2
                                ? "bg-bright-orange-50/70 border-b-bright-orange-100"
                                : "border-b-gray-100 group-hover/row:bg-gray-50"
                            )}
                          >
                            <CellValue value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                {/* Footer row: repeat CTAs at the end of the long table */}
                <tr>
                  <td className="px-6 py-6"></td>
                  {comparePlanHeaders.map((p) => (
                    <td key={p.name} className={cn("px-5 py-6 text-center", p.popular && "bg-bright-orange-50/70")}>
                      <Link
                        to={p.to}
                        className={cn(
                          "text-sm font-semibold inline-flex items-center gap-1",
                          p.popular ? "text-bright-orange-600 hover:text-bright-orange-700" : "text-gray-600 hover:text-bright-orange-600"
                        )}
                      >
                        {p.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-6">
            All prices in USD. Swipe sideways on smaller screens to see every plan.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10" {...fadeUp}>
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                className="border-l-4 border-bright-orange-500 bg-white rounded-r-xl shadow-sm pl-6 pr-6 py-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>

          {/* Legal fine print */}
          <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-gray-500 italic space-y-3 leading-relaxed">
            <p>
              Legalgram is not a law firm and does not provide legal advice. GramAI is an AI-powered assistant that provides legal information, not legal advice. For advice on your specific situation, consult a licensed attorney in your state.
            </p>
            <p>
              All subscriptions renew automatically at the current rate until you cancel. You can cancel any time in one click from your account dashboard, and we'll send an email reminder 7 days before annual renewal. Savings claims reflect the difference between paying 12 months at the monthly rate versus one year at the annual rate. Business formation service fees do not include state filing fees, which vary by state and are shown at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 md:py-14 bg-gray-900">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Not sure which plan is right for you?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Start with Free, upgrade any time. Every plan comes with a 14-day money-back guarantee.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-6" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6"
                onClick={openGramAi}
              >
                See GramAI in Action
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
