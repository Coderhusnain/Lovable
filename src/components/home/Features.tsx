
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const FeatureCard = memo(({
  kicker,
  title,
  description,
  linkText,
  linkTo,
  delay,
}: {
  kicker: string;
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300 + (delay * 100));
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <Link to={linkTo} className="block h-full">
        <Card className="h-full overflow-hidden group border border-gray-200 border-t-[3px] border-t-bright-orange-500 hover:border-bright-orange-300 shadow-sm hover:shadow-xl transition-all duration-500 relative cursor-pointer">
          <CardContent className="pt-7 px-8 pb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bright-orange-600 mb-3">{kicker}</p>
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-bright-orange-600 transition-colors duration-300">{title}</h3>
            <p className="text-gray-600 mb-4 transition-colors duration-300">{description}</p>
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-0">
            <span className="inline-flex items-center font-medium text-bright-orange-500 group-hover:text-bright-orange-600">
              <span>{linkText}</span>
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const Features = () => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [visibleSection, setVisibleSection] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleSection(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    
    setObserver(obs);
    
    return () => {
      if (obs) obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (observer) {
      const sectionElement = document.getElementById('features-section');
      if (sectionElement) observer.observe(sectionElement);
    }
  }, [observer]);

  const features = [
    {
      kicker: "Documents",
      title: "Legal Documents",
      description: "Create customized legal documents in minutes with our easy to use templates.",
      linkText: "Browse documents",
      linkTo: "/documents",
      gradient: "from-bright-orange-500 to-bright-orange-600"
    },
    {
      kicker: "Formation",
      title: "Business Formation",
      description: "Start your business the right way with our LLC and incorporation services.",
      linkText: "Start a business",
      linkTo: "/start-a-business",
      gradient: "from-bright-orange-500 to-bright-orange-600"
    },
    {
      kicker: "Resources",
      title: "Legal Resources",
      description: "Access free articles and guides covering a wide range of legal topics.",
      linkText: "Explore resources",
      linkTo: "/community",
      gradient: "from-bright-orange-500 to-bright-orange-600"
    },
    {
      kicker: "Membership",
      title: "Legal Plans",
      description: "Get ongoing legal protection for your family or business with our subscription plans.",
      linkText: "View plans",
      linkTo: "/pricing",
      gradient: "from-bright-orange-500 to-bright-orange-600"
    }
  ];

  return (
    <section id="features-section" className="py-8 md:py-12 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-bright-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <div className={`transform transition-all duration-700 ${visibleSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white font-medium px-4 py-2 rounded-full text-sm mb-4">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">
              Complete Legal Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your legal matters confidently and affordably.
            </p>
          </div>
        </div>

        {/* Feature highlight */}
        <div className={`mb-16 transform transition-all duration-700 ${visibleSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-bright-orange-50 to-amber-50 rounded-3xl p-6 md:p-10 relative overflow-hidden border border-bright-orange-100 border-l-[4px] border-l-bright-orange-500">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bright-orange-600 mb-2">Attorney Trusted</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">Protected by Legal Experts</h3>
                <p className="text-lg text-gray-600 mb-4">
                  All our documents and services are reviewed by qualified attorneys to ensure legal compliance and protection.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Attorney reviewed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">State-specific</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Regularly updated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              kicker={feature.kicker}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
              linkTo={feature.linkTo}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Features);
