import { memo, useState, useEffect, useRef } from "react";

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = performance.now();
    let animationFrame: number;
    
    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      countRef.current = Math.floor(progress * end);
      setCount(countRef.current);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);
  
  return { count, elementRef };
};

const StatItem = ({ stat, index }: { stat: any, index: number }) => {
  const { count, elementRef } = useCountUp(stat.value, 2000 + (index * 200));

  return (
    <div
      ref={elementRef}
      className="text-center bg-white/5 backdrop-blur-sm rounded-xl pt-7 px-6 pb-8 border border-white/15 border-t-[3px] border-t-white/70 hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      <h3 className="text-5xl md:text-6xl font-extrabold mb-3 text-white leading-none">
        {count}{stat.suffix}
      </h3>
      <p className="text-lg font-bold mb-2 text-white">{stat.label}</p>
      <p className="text-sm text-white/70">{stat.description}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      value: 100,
      suffix: "+",
      label: "Legal Documents",
      description: "Ready-to-use templates drafted by qualified lawyers"
    },
    {
      value: 50,
      suffix: " States",
      label: "Nationwide Coverage",
      description: "Every document reviewed for US jurisdictional compliance"
    },
    {
      value: 24,
      suffix: "/7",
      label: "AI-Powered Access",
      description: "Draft documents and review contracts anytime"
    },
    {
      value: 100,
      suffix: "%",
      label: "Money-Back Guarantee",
      description: "Not satisfied? Full refund, no questions"
    },
    {
      value: 9,
      suffix: "+",
      label: "Practice Areas",
      description: "From real estate to intellectual property, all in one place"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary to-rocket-blue-800 text-white relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      {/* Animated light beam effects */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-bright-orange-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-bright-orange-300/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white font-medium px-4 py-1 rounded-full text-sm mb-3">Why Legalgram</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            New Platform. Experienced Lawyers.
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Legalgram launched in 2024, but the team behind it has spent the last five-plus years drafting contracts, running arbitrations, and advising businesses across multiple jurisdictions. You get the freshness of a modern legal-tech platform with the judgment of lawyers who have already done the work at law firms and in-house.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(StatsSection);
