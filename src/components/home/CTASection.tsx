import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const trustPoints = [
  {
    kicker: "Expertise",
    title: "Built by qualified lawyers",
    text: "Every document and workflow is designed by attorneys with real practice experience, not generic templates."
  },
  {
    kicker: "Affordable",
    title: "Affordable legal help",
    text: "Get contracts drafted and reviewed at a fraction of the cost of a traditional law firm."
  },
  {
    kicker: "Flexible",
    title: "Cancel anytime",
    text: "No long-term commitments. No hidden fees. No fine print you'll wish you had read."
  }
];

const CTASection = () => {
  return (
    <section className="py-8 md:py-12 bg-[#020122]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Started with Legalgram Today
          </h2>
          <p className="text-lg text-gray-300">
            Join the growing community of individuals, freelancers, and small businesses using Legalgram to draft contracts, review agreements, and register companies without the traditional legal price tag.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {trustPoints.map((t) => (
            <div key={t.title} className="bg-white/5 border border-white/10 border-t-[3px] border-t-bright-orange-500 rounded-2xl pt-5 px-6 pb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bright-orange-400 mb-2">{t.kicker}</p>
              <h3 className="font-bold text-white mb-2 text-lg">{t.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-8 py-6 h-auto text-base" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-6 h-auto text-base"
            asChild
          >
            <Link to="/pricing">See Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(CTASection);
