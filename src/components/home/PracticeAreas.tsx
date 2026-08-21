import { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PracticeAreas = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.practice-area-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleProtectedNavigation = () => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/documents");
      } else {
        navigate("/login");
      }
    });
  };

  const areas = [
    { name: "Real Estate", path: "/documents?search=lease", color: "from-blue-500 to-blue-600" },
    { name: "Business Formation", path: "/documents?search=business+formation", color: "from-amber-500 to-amber-600" },
    { name: "Family Law", path: "/documents?search=family", color: "from-green-500 to-green-600" },
    { name: "Estate Planning", path: "/documents?search=estate", color: "from-purple-500 to-purple-600" },
    { name: "Employment", path: "/documents?search=employment", color: "from-rose-500 to-rose-600" },
    { name: "Civil Litigation", path: "/documents?search=dispute", color: "from-indigo-500 to-indigo-600" },
    { name: "Contracts", path: "/documents?search=contract", color: "from-cyan-500 to-cyan-600" },
    { name: "Intellectual Property", path: "/documents?search=intellectual+property", color: "from-red-500 to-red-600" },
    { name: "Education Law", path: "/documents?search=education", color: "from-emerald-500 to-emerald-600" }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-rocket-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">Practice Areas</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Legal Solutions for Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive legal services across many practice areas to assist with all your legal needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area, index) => {
            const isVisible = visibleItems.includes(index);

            return (
              <Link
                to={area.path}
                key={index}
                data-index={index}
                className={`practice-area-item flex items-center justify-between gap-3 pt-5 px-6 pb-5 bg-white rounded-xl shadow-lg border border-gray-100 border-l-[4px] border-l-bright-orange-500 hover:shadow-xl hover:border-l-bright-orange-600 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-bold text-black group-hover:text-bright-orange-600 transition-colors">{area.name}</h3>
                <ArrowRight className="h-4 w-4 text-bright-orange-500 shrink-0 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-12">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-bright-orange-500 hover:text-bright-orange-600 font-medium bg-transparent border-none outline-none cursor-pointer"
            onClick={handleProtectedNavigation}
          >
            <span>View all legal documents</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(PracticeAreas);
