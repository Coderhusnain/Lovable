import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scale, Laptop, HeartHandshake, Rocket, Mail, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Scale,
    title: "Legal Knowledge Meets Technology",
    description:
      "We combine attorney drafted legal content with modern software so everyday people and small businesses can handle legal matters without the traditional price tag."
  },
  {
    icon: Laptop,
    title: "Build Real Products",
    description:
      "From document automation to Gram AI, our team works on tools that people actually use to protect their families, homes, and businesses every day."
  },
  {
    icon: HeartHandshake,
    title: "Put People First",
    description:
      "Legal help should be clear, honest, and affordable. We write in plain language, price fairly, and treat every user the way we would want to be treated."
  },
  {
    icon: Rocket,
    title: "Grow With Us",
    description:
      "Legalgram is a young platform with big goals. Joining now means real ownership, real impact, and the chance to shape how the product grows."
  }
];

const Careers = () => {
  return (
    <Layout>
      <Helmet>
        <title>Careers at Legalgram | Join Our Team</title>
        <meta
          name="description"
          content="Explore careers at Legalgram. Help us make legal documents, business formation, and legal guidance affordable and accessible for everyone."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gray-900">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Careers at Legalgram
          </h1>
          <p className="text-lg text-gray-300">
            We are building affordable legal help for individuals, freelancers, and small
            businesses. If you care about making the law understandable and accessible, we
            would love to hear from you.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            How We Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
                <div className="w-12 h-12 rounded-xl bg-bright-orange-100 flex items-center justify-center mb-4">
                  <v.icon className="h-6 w-6 text-bright-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-gray-600 mb-6">
            We do not have any open positions posted right now. We are always interested in
            meeting attorneys, engineers, and writers who want to make legal help simpler.
            Send us a message and tell us how you could contribute — we read every note.
          </p>
          <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white" asChild>
            <Link to="/contact">
              <Mail className="mr-2 h-5 w-5" /> Get in Touch
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Want to Know More About Legalgram First?
          </h2>
          <p className="text-gray-600 mb-6">
            Read about our vision and the services we offer before you reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/vision-mission">
                Our Vision & Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services">
                Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
