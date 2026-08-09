import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileSignature, MessageSquare, Building2, Sparkles,
  Heart, ShieldCheck, Scale, DollarSign, BookOpen,
  ArrowRight
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

const commitments = [
  {
    icon: FileSignature,
    title: "We draft the contracts and agreements people actually need",
    text: "From freelance agreements to shareholder deals to residential leases, we provide affordable contract drafting services in language people can read, written to protect the person we're serving rather than tilted toward whoever has more negotiating leverage."
  },
  {
    icon: MessageSquare,
    title: "We answer legal questions honestly",
    text: "Not with disclaimers piled on disclaimers. Not with vague summaries that leave you more confused than you started. Real online legal advice, with the reasoning shown, and a clear line about when we can help and when your matter genuinely requires a licensed attorney in your state."
  },
  {
    icon: Building2,
    title: "We help people register and run their businesses properly",
    text: "From LLC formation to ongoing business compliance, our business registration services let founders spend their time building rather than drowning in paperwork they shouldn't have had to figure out alone."
  },
  {
    icon: Sparkles,
    title: "We built GramAI",
    text: "Our proprietary legal AI sits at the heart of everything we do, so that every user gets a document drafted, a contract reviewed, and a question answered at the speed of a conversation. The moment you need legal help is almost never the moment you have three weeks to wait for it."
  }
];

const values = [
  {
    icon: Heart,
    title: "People before process.",
    text: "Every contract we draft, every question we answer, every business we register starts with a real person on the other side of the screen. We write for them, not for the file cabinet."
  },
  {
    icon: ShieldCheck,
    title: "Honesty about what AI legal services can and cannot do.",
    text: "We built one of the most capable legal AI platforms on the market, and we're still the first to tell you when a matter needs a human attorney. Overselling technology is how people get hurt. We won't do it."
  },
  {
    icon: Scale,
    title: "Protection over neutrality.",
    text: "A \"neutral\" contract almost always favors whoever showed up with the better lawyer. When you use Legalgram, we are your side of the table. Full stop."
  },
  {
    icon: DollarSign,
    title: "The law is not a luxury.",
    text: "We priced our legal services platform so a freelancer, a small business owner, a first-time founder, or a family in a difficult moment can afford to do things properly. If our pricing ever stops meeting that test, we've lost the plot."
  },
  {
    icon: BookOpen,
    title: "Clear language, always.",
    text: "If a nine-year-old couldn't understand what a contract clause means after we explain it, we haven't explained it yet. Legalese is not a skill. It's a habit, and usually a lazy one."
  }
];

const faqs = [
  {
    q: "What kind of company is Legalgram?",
    a: "Legalgram is an online legal services platform that combines qualified legal expertise with proprietary AI to make contract drafting, contract review, business registration, and legal advice affordable for individuals and small businesses."
  },
  {
    q: "Is Legalgram trying to replace lawyers?",
    a: "No. Our mission is to close the access-to-justice gap for the millions of Americans who currently go without any legal protection at all because traditional legal services are too expensive. Where a matter genuinely needs representation by a licensed attorney, we say so and help you find one."
  },
  {
    q: "What makes Legalgram different from other legal tech platforms?",
    a: "Three things. First, our workflows are built by qualified lawyers, not just software engineers. Second, our contracts are drafted to protect our users rather than to be \"neutral.\" Third, our AI legal assistant, GramAI, is purpose-built for legal reasoning rather than adapted from a general-purpose chatbot."
  },
  {
    q: "Who does Legalgram serve?",
    a: "We serve individuals, freelancers, small business owners, founders, landlords, tenants, families, and small legal teams who need affordable, accessible legal help. Our platform is optimized for US users and also supports international clients on cross-border matters."
  },
  {
    q: "How does Legalgram keep legal services affordable?",
    a: "We use AI and technology to automate the parts of legal work that don't require a human attorney's judgment, and we pass those savings on to our users. That's how a contract that would cost hundreds of dollars at a traditional law firm can cost a fraction of that on Legalgram."
  }
];

const VisionMission = () => {
  return (
    <Layout>
      <Helmet>
        <title>Our Vision & Mission | Affordable AI-Powered Legal Services | Legalgram</title>
        <meta
          name="description"
          content="Legalgram is on a mission to make affordable legal services accessible to everyone. Learn about our vision for AI-powered contract drafting, contract review, and access to justice."
        />
        <meta
          name="keywords"
          content="affordable legal services, AI legal platform, access to justice, online legal services, legal technology company, AI-powered legal services, legal AI mission"
        />
      </Helmet>

      {/* Hero / Vision - dark brand-story treatment */}
      <section className="pt-24 pb-10 bg-gray-900">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <motion.span
            className="inline-block bg-bright-orange-500/20 text-bright-orange-400 font-medium px-4 py-1 rounded-full text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Vision
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Making Legal Protection Accessible to Everyone
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-bright-orange-400 font-medium leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A world where nobody signs something they don't understand, and nobody goes without legal protection because they can't afford a lawyer.
          </motion.p>
          <motion.div
            className="text-lg text-gray-300 leading-relaxed space-y-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>That's the sentence we come back to every time we're deciding what to build next at Legalgram.</p>
            <p>
              For most of modern history, the law has quietly worked better for people who can afford to hire someone to explain it. Big companies keep expensive attorneys on retainer. Regular people read the fine print and hope for the best. When something goes wrong, one side walks in with a legal team and the other side walks in with a Google search.
            </p>
            <p>
              We think the internet, and specifically what artificial intelligence can now do with legal reasoning, finally makes it possible to close that access-to-justice gap. Not partially. Not for a handful of carefully chosen use cases. Actually close it.
            </p>
            <p>
              That's the world Legalgram is building toward. A world where a freelancer signing her first big client has the same quality of contract protection as a Fortune 500 procurement team. Where a small landlord doesn't lose a case because he didn't know what "quiet enjoyment" meant. Where a founder in a garage sets up her company as properly as any Delaware-incorporated startup ever has. Where a family reading an insurance policy actually understands what they just agreed to.
            </p>
            <p className="font-semibold text-white">
              The law belongs to everyone. We're building the online legal services platform that finally acts like it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Legal Documents, Legal Answers, and Legal Protection for Every American
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We give individuals and businesses the legal documents, legal answers, and legal protection they need, at a price that doesn't gate-keep the law. Our mission runs on four commitments we deliver on every single day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {commitments.map((c, i) => (
              <motion.div
                key={c.title}
                className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-bright-orange-300 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-bright-orange-50 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-bright-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" {...fadeUp}>
            The Values That Guide Our Legal Technology
          </motion.h2>
          <div className="space-y-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-bright-orange-50 flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-bright-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we're going */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" {...fadeUp}>
            Where Legalgram Is Going Next
          </motion.h2>
          <motion.div className="text-lg text-gray-600 leading-relaxed space-y-4 text-left" {...fadeUp}>
            <p>
              Legalgram is early, and we know that. What we're building will take years to reach everyone it needs to reach, and the underlying legal AI technology will keep getting better. We're going to keep expanding the legal documents we draft, the states and countries we cover, the languages we work in, and the range of legal problems we can genuinely help with.
            </p>
            <p>
              But the vision won't change. Every feature we ship, every hire we make, every partnership we sign is measured against the same question. Does this make legal protection more accessible for the people who need it most?
            </p>
            <p>If the answer is yes, we build it. If the answer is no, we don't.</p>
            <p className="font-semibold text-gray-900">That's the whole company, right there.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 bg-rocket-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" {...fadeUp}>
            Frequently Asked Questions About Legalgram
          </motion.h2>
          <div className="space-y-8">
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

      {/* Join Us */}
      <section className="py-10 md:py-14 bg-gray-900">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Us</h2>
            <p className="text-lg text-gray-300 mb-10">
              Whether you're an individual trying to protect yourself, a business owner trying to build something lasting, or a lawyer who wants to help close the access-to-justice gap alongside us, there's a place for you here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-6" asChild>
                <Link to="/documents">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6" asChild>
                <Link to="/contact-lawyer">Meet the Team</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6" asChild>
                <Link to="/community">Read the Legalgram Blog</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VisionMission;
