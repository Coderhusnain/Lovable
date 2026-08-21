import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileSignature, MessageSquare, Building2, Sparkles,
  CheckCircle, ArrowRight, ShieldCheck, Scale, DollarSign, Users,
  FileSearch, BookOpen
} from "lucide-react";
import { OPEN_GRAM_AI_EVENT } from "@/components/chat/ChatWidget";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

const individualDocs = [
  "Residential lease agreements and rental contracts",
  "Employment contract review and negotiation before you sign",
  "Freelance and independent contractor agreements",
  "Loan agreements between family, friends, or private lenders",
  "Prenuptial and cohabitation agreements",
  "Custody, separation, and co-parenting arrangements",
  "Last will and testament, living wills, and power of attorney documents",
  "Non-disclosure agreements for personal or professional use"
];

const businessDocs = [
  "Non-disclosure agreements (mutual and one-way NDAs)",
  "Employment agreements and independent contractor agreements",
  "Vendor and supplier contracts",
  "Master service agreements (MSAs) and statements of work (SOWs)",
  "Licensing and distribution agreements",
  "Shareholder, founder, and partnership agreements",
  "Website terms of service and privacy policies",
  "Commercial lease agreements"
];

const exampleQuestions = [
  "\"My landlord won't return my security deposit. Can I sue in small claims court?\"",
  "\"I signed a non-compete two years ago. Is it actually enforceable in my state?\"",
  "\"A client owes me for three months of freelance work. How do I collect?\"",
  "\"I want to start an LLC. Where do I even begin?\"",
  "\"My employer just changed my contract terms without telling me. Do I have to accept?\""
];

const formationServices = [
  { bold: "LLC formation", rest: " in the state that actually makes sense for your business, whether that's Delaware, Wyoming, Nevada, or your home state" },
  { bold: "C-Corp incorporation", rest: " for startups raising venture capital" },
  { bold: "S-Corp election", rest: " for small businesses looking to optimize their tax structure" },
  { bold: "Registered agent services", rest: " in all fifty states" },
  { bold: "EIN registration", rest: " with the IRS" },
  { bold: "Operating agreements and corporate bylaws", rest: " drafted around your actual ownership structure" },
  { bold: "Initial resolutions and founder documents", rest: "" }
];

const whyChoose = [
  {
    icon: Users,
    title: "Built by qualified lawyers, not just software engineers.",
    text: "Every workflow on our platform was designed by legal professionals with real practice experience in commercial contract drafting, arbitration, and regulatory compliance across multiple jurisdictions. The AI is a powerful tool. The legal judgment underneath it is human."
  },
  {
    icon: Scale,
    title: "Legal documents drafted to protect you, not the other side.",
    text: "Most contract templates you'll find online are drafted to be \"neutral,\" which usually means they favor whoever showed up with the better lawyer. Our documents are drafted to protect the person or business we're serving. That's the entire point."
  },
  {
    icon: ShieldCheck,
    title: "Honest about what AI can and can't do.",
    text: "Where a legal matter genuinely requires a licensed attorney in your state, we say so and help you find one. We're not trying to replace attorneys when they're actually needed. We're trying to close the access-to-justice gap for everyone else."
  },
  {
    icon: DollarSign,
    title: "Affordable legal services by design.",
    text: "The number one reason Americans go without legal protection is cost. We priced Legalgram so a freelancer, a small landlord, a first-time founder, or a family in a rough patch can afford to do things properly."
  }
];

const faqs = [
  {
    q: "Is Legalgram a law firm?",
    a: "Legalgram is a legal services technology platform. We provide contract drafting, AI contract review, business formation, and legal information services. Where your matter requires legal representation by a licensed attorney, we help you connect with one."
  },
  {
    q: "How much do your online legal services cost?",
    a: "Our pricing is designed to be a fraction of traditional attorney fees. Most contract drafting and AI contract review requests cost less than a single hour with a traditional lawyer. You can see full pricing details on our pricing page."
  },
  {
    q: "Can Legalgram review my employment contract, lease, or insurance policy?",
    a: "Yes. Our AI contract review tool can analyze employment agreements, residential and commercial leases, insurance policies, settlement agreements, vendor contracts, NDAs, and most other common legal documents. You get a plain-English breakdown of the risks and specific negotiation guidance."
  },
  {
    q: "Can Legalgram help me register an LLC in Delaware, Wyoming, or my home state?",
    a: "Yes. We handle LLC formation, C-Corp and S-Corp incorporation, registered agent services, EIN registration, and operating agreements in all fifty states. We'll also advise you on which state actually makes sense for your business."
  },
  {
    q: "Is legal advice from GramAI confidential?",
    a: "Your conversations with Legalgram and GramAI are treated as confidential and are protected under our privacy policy. Note that AI-assisted legal information is not the same as the attorney-client privilege that applies when you formally retain a licensed attorney."
  },
  {
    q: "Do you offer legal services outside the United States?",
    a: "Yes. While our platform is optimized for US consumers and businesses, we support international clients on cross-border matters, entity formation abroad, and international commercial contracts."
  }
];

const openGramAi = () => window.dispatchEvent(new CustomEvent(OPEN_GRAM_AI_EVENT));

const OurServices = () => {
  return (
    <Layout>
      <Helmet>
        <title>Online Legal Services, Contract Drafting & AI Contract Review | Legalgram</title>
        <meta
          name="description"
          content="Affordable online legal services for individuals and businesses. Draft contracts, review agreements with AI, register your LLC, and get answers to legal questions in minutes."
        />
        <meta
          name="keywords"
          content="online legal services, AI contract review, legal document drafting, LLC formation, contract drafting services, legal notice drafting, small business legal help"
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-b from-rocket-gray-50 to-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.span
            className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Online Legal Services for People Who Don't Have Time for Legalese
          </motion.h1>
          <motion.div
            className="text-lg text-gray-600 leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              Here's the honest truth about legal services in the United States. Most people don't call a lawyer until something has already gone wrong, and by then the meter is running at three hundred dollars an hour. The person on the other end of the phone is talking about "consideration" and "material breach," and you're just trying to figure out if you can get your security deposit back.
            </p>
            <p>That whole setup is broken. So we built Legalgram to fix it.</p>
            <p>
              Whether you're a freelancer chasing down an unpaid invoice, a small landlord dealing with a difficult tenant, a founder incorporating your first startup, or a family sorting through a legal mess, you shouldn't need a law degree to protect yourself. You need affordable online legal services that draft the right documents, tell you what your options actually are, and speak to you like a human being while doing it.
            </p>
            <p className="font-semibold text-gray-900">That's what this page is about. Here's what our legal services platform actually does.</p>
          </motion.div>
        </div>
      </section>

      {/* 1. Contract Drafting */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div className="flex items-center gap-4 mb-6" {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">1. Contract and Agreement Drafting Services</h2>
          </motion.div>
          <motion.div className="text-gray-600 leading-relaxed space-y-4 mb-8" {...fadeUp}>
            <p>
              Most legal problems begin the exact same way. Two people agree to something. Nobody writes it down properly. Six months later, they remember the conversation completely differently, and the person with the better paperwork wins.
            </p>
            <p>Our online contract drafting service handles the paperwork so you're always the one with the better contract.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" {...fadeUp}>
              <h3 className="font-bold text-gray-900 mb-4">Legal document drafting for individuals</h3>
              <ul className="space-y-2.5">
                {individualDocs.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-bright-orange-500 mt-0.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" {...fadeUp}>
              <h3 className="font-bold text-gray-900 mb-4">Business contract drafting for companies of every size</h3>
              <ul className="space-y-2.5">
                {businessDocs.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-gray-600">
                    <CheckCircle className="h-5 w-5 text-bright-orange-500 mt-0.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p className="text-gray-600 leading-relaxed bg-bright-orange-50 border border-bright-orange-100 rounded-xl p-5" {...fadeUp}>
            Every contract we produce is written to do three things. Say what it means in language you can actually read. Hold up in court if it has to. And tilt the risk in your direction, not the other party's. A "neutral" contract almost always favors whoever had more leverage at the table, and that person usually isn't you.
          </motion.p>
        </div>
      </section>

      {/* 2. Legal Advice */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div className="flex items-center gap-4 mb-6" {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">2. Online Legal Advice and Legal Q&A</h2>
          </motion.div>
          <motion.div className="text-gray-600 leading-relaxed space-y-4 mb-6" {...fadeUp}>
            <p>Sometimes you don't need a contract. You just need to know where you stand.</p>
            <p>
              Our online legal advice service lets you ask any legal question and get a real, structured answer. Not a Wikipedia summary. Not a form letter. A proper walk-through from people who understand the law.
            </p>
            <p className="font-semibold text-gray-900">Ask us things like:</p>
          </motion.div>
          <motion.ul className="space-y-3 mb-6" {...fadeUp}>
            {exampleQuestions.map((q) => (
              <li key={q} className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-gray-700 italic shadow-sm">
                {q}
              </li>
            ))}
          </motion.ul>
          <motion.div className="text-gray-600 leading-relaxed space-y-4" {...fadeUp}>
            <p>
              Every answer walks you through the law that applies to your situation, your actual rights, the practical options in front of you, what each option is likely to cost in time and money, and the specific next step you can take today.
            </p>
            <p>
              If your matter needs a licensed attorney in your state, we say so, and we tell you exactly what kind of lawyer to look for and what to ask them. We're not trying to replace lawyers when they're genuinely needed. We're trying to make sure nobody goes without legal help just because the traditional route is unaffordable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Business Registration */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div className="flex items-center gap-4 mb-6" {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">3. Business Registration and LLC Formation Services</h2>
          </motion.div>
          <motion.div className="text-gray-600 leading-relaxed space-y-4 mb-8" {...fadeUp}>
            <p>
              Starting a company is one of the moments where legal shortcuts cost the most. Choose the wrong business entity and you'll overpay on taxes for a decade. Miss a filing and you can quietly lose the liability protection you thought you had. Skip the operating agreement and watch a routine co-founder dispute turn into a lawsuit.
            </p>
            <p>Our business registration services handle the entire setup, start to finish.</p>
          </motion.div>

          <motion.div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6" {...fadeUp}>
            <h3 className="font-bold text-gray-900 mb-4">US business formation services</h3>
            <ul className="space-y-2.5">
              {formationServices.map((s) => (
                <li key={s.bold} className="flex items-start gap-2.5 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-bright-orange-500 mt-0.5 shrink-0" />
                  <span><strong className="text-gray-900">{s.bold}</strong>{s.rest}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6" {...fadeUp}>
            <div className="bg-rocket-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">International and cross-border business setup</h3>
              <p className="text-gray-600 leading-relaxed">
                For international clients and cross-border operations, we advise on entity selection, jurisdictional tax trade-offs, banking and payments infrastructure, and the ongoing compliance obligations you'll face once you're operating across countries.
              </p>
            </div>
            <div className="bg-rocket-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Ongoing business compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                Once your company is up and running, we handle the paperwork most founders forget about. Annual reports, foreign qualification when you expand into new states, trademark applications, DBA registrations, board resolutions, and the internal governance documents your company needs to stay in good standing.
              </p>
            </div>
          </motion.div>
          <motion.p className="text-gray-900 font-semibold mt-6" {...fadeUp}>
            Focus on building your business. We'll handle the legal paperwork that lets you actually own it properly.
          </motion.p>
        </div>
      </section>

      {/* 4. GramAI */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div className="flex items-center gap-4 mb-6" {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">4. GramAI: Your AI Legal Assistant for Drafting and Contract Review</h2>
          </motion.div>
          <motion.div className="text-gray-600 leading-relaxed space-y-4 mb-8" {...fadeUp}>
            <p>This is the part of Legalgram we're proudest of.</p>
            <p>GramAI is our purpose-built legal AI, and it does three things that we think most "AI lawyer" tools genuinely don't do well.</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm" {...fadeUp}>
              <div className="flex items-center gap-3 mb-3">
                <FileSignature className="w-5 h-5 text-bright-orange-500" />
                <h3 className="font-bold text-gray-900 text-lg">AI-powered legal document drafting in minutes</h3>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  Describe your situation in your own words. "I'm hiring a photographer for my wedding and I need to make sure she actually shows up." "I'm loaning my brother twelve thousand dollars and I need something in writing." "I need to send a formal complaint to my HOA about noise from the unit above me."
                </p>
                <p>
                  GramAI drafts the legal document. A real one, structured properly, jurisdictionally aware, and written to protect your position. Then you refine it in plain English. Tell it to tighten the payment terms, add a clause about missed deadlines, or delete a section that doesn't apply. Keep going until the document says exactly what you want it to say.
                </p>
                <p>Use it to draft contracts, demand letters, cease and desist letters, legal notices, formal complaints, employment offers, NDAs, and more.</p>
              </div>
            </motion.div>

            <motion.div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm" {...fadeUp}>
              <div className="flex items-center gap-3 mb-3">
                <FileSearch className="w-5 h-5 text-bright-orange-500" />
                <h3 className="font-bold text-gray-900 text-lg">AI contract review to find weak points before you sign</h3>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>This is the feature we think every American consumer and business owner should be using.</p>
                <p>
                  Upload any agreement someone has put in front of you. An insurance policy full of tiny print. A job offer from a new employer. A residential lease. A settlement agreement someone is pressuring you to sign. A partnership deal from a business acquaintance. A vendor contract you're about to accept.
                </p>
                <p>
                  Our AI contract review tool reads the document the way a careful, slightly paranoid lawyer would read it. It flags every clause that works against you. It explains, in plain English, what each risk actually means for your life or your business. It shows you which terms are unusual or aggressive compared to market standard. And it tells you exactly what to push back on in negotiation, what to renegotiate, and what should make you walk away entirely.
                </p>
                <p className="font-semibold text-gray-900">You'll finally know what you're signing before you sign it. For most people, that alone changes everything.</p>
              </div>
            </motion.div>

            <motion.div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm" {...fadeUp}>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-bright-orange-500" />
                <h3 className="font-bold text-gray-900 text-lg">Legal research you can actually understand</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                When GramAI answers a legal question, you see the reasoning behind the answer. The statute or legal principle it relies on. How courts have applied it in similar cases. The exceptions that could change the analysis for your specific situation. It's legal research at the speed of a conversation, and you never have to take our word for anything without seeing where it came from.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" {...fadeUp}>
            Why Choose Legalgram Over Traditional Legal Services
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whyChoose.map((w, i) => (
              <motion.div
                key={w.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-bright-orange-300 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="font-bold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-gray-600 leading-relaxed">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" {...fadeUp}>
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
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 bg-gray-900">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <div className="text-lg mb-10 space-y-3">
              <p className="text-gray-300">Start wherever you want.</p>
              <p className="text-gray-300">
                Describe your situation and let us draft your document. Upload an agreement and find out what it actually says. Ask a legal question and get a real answer. Tell us you want to form a company and we'll take it from there.
              </p>
              <p className="text-gray-300">
                Whatever you bring us, you'll walk away with a document you understand, a decision you feel confident about, and rights that are properly protected.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-6" asChild>
                <Link to="/documents">
                  Draft a Legal Document
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6" asChild>
                <Link to="/ask-legal-advice">Ask a Legal Question</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6"
                onClick={openGramAi}
              >
                Review My Contract
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6" asChild>
                <Link to="/start-a-business">Register My Business</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default OurServices;
