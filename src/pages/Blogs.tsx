import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    category: "Legal Documents",
    title: "How Legal Documents Work on Legalgram",
    description:
      "A step by step walkthrough of choosing a document, answering plain language questions, and downloading a ready to sign agreement.",
    to: "/how-it-works"
  },
  {
    category: "Business Formation",
    title: "What Is an LLC and Is It Right for You?",
    description:
      "Limited liability companies explained: personal asset protection, pass through taxes, and how an LLC compares to other structures.",
    to: "/whats-an-llc"
  },
  {
    category: "Business Formation",
    title: "What Is a Corporation? C Corps Explained",
    description:
      "How corporations work, when a C Corp makes sense, and what it takes to form and maintain one in your state.",
    to: "/whats-a-corporation"
  },
  {
    category: "Business Formation",
    title: "What Is an S Corp? Tax Election Basics",
    description:
      "The S Corporation election, reasonable salary rules, and how distributions can reduce self employment taxes.",
    to: "/whats-an-s-corp"
  },
  {
    category: "Business Formation",
    title: "What Is a Nonprofit? Starting a 501(c)(3)",
    description:
      "Incorporating a nonprofit, applying for federal tax exemption, and building a board that serves your mission.",
    to: "/whats-a-nonprofit"
  },
  {
    category: "About Legalgram",
    title: "Our Services: What Legalgram Offers",
    description:
      "Contract drafting, document review, business registration, and Gram AI — a full tour of everything on the platform.",
    to: "/services"
  }
];

const Blogs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blogs & Legal Guides | Legalgram</title>
        <meta
          name="description"
          content="Plain language legal guides from Legalgram: business formation, legal documents, LLCs, corporations, nonprofits, and more."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gray-900">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blogs & Legal Guides</h1>
          <p className="text-lg text-gray-300">
            Plain language answers to common legal questions. Every guide is written to help
            you make informed decisions about your documents and your business.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {guides.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="group border border-gray-100 border-t-[3px] border-t-bright-orange-500 rounded-2xl p-6 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-bright-orange-600 mb-2">
                  {g.category}
                </span>
                <h2 className="font-bold text-gray-900 mb-2 group-hover:text-bright-orange-600 transition-colors">
                  {g.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{g.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-bright-orange-600 mt-4">
                  Read the guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Have a Question a Guide Does Not Answer?</h2>
          <p className="text-gray-600 mb-6">
            Ask Gram AI for a plain language explanation, or browse our full library of legal
            documents to find the form you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/documents"
              className="inline-flex items-center justify-center rounded-md bg-bright-orange-500 hover:bg-bright-orange-600 text-white font-medium px-6 py-3 transition-colors"
            >
              Browse Legal Documents
            </Link>
            <Link
              to="/ask-legal-advice"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 font-medium px-6 py-3 transition-colors"
            >
              Ask Legal Advice
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
