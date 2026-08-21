import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LegalSolutionsSection = () => {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/c9d521b5-31e5-47a0-9d04-c2539ddd886e.png" 
          alt="Document signing background" 
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/90"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Simple, Affordable Legal Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We make legal matters easy to understand and manage through our streamlined process.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-8">
          {[
            { n: "01", t: "Select Your Document", d: "Choose from hundreds of legal documents designed for personal and business needs." },
            { n: "02", t: "Customize It", d: "Answer simple questions to create your personalized legal document." },
            { n: "03", t: "Sign & Share", d: "Save, print, download, or share your legal document instantly." },
          ].map((s) => (
            <div key={s.n} className="bg-white/90 backdrop-blur-sm rounded-xl pt-7 px-8 pb-8 shadow-lg border border-gray-100 border-t-[3px] border-t-bright-orange-500 transform transition-transform hover:-translate-y-2 duration-300">
              <div className="text-5xl font-extrabold text-bright-orange-500 mb-3 leading-none">{s.n}</div>
              <h3 className="text-2xl font-bold mb-3 text-black">{s.t}</h3>
              <p className="text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/how-it-works">
            <Button variant="orange" className="hover:bg-[#D17701] shadow-md px-8 py-6 h-auto text-lg">
              Learn more about our process <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LegalSolutionsSection;
