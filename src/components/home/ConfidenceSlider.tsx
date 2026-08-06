
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ConfidenceSlider = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "GET YOUR CONTRACT DRAFTED BY A PRO",
      subtitle: "Professionally tailored legal contracts for your exact needs",
      cta: "Draft Your Document",
      link: "/documents",
      image: "/lovable-uploads/697f8a63-6e9a-41a0-9995-812ce5ce9381.png"
    },
    {
      title: "GET A GUIDANCE TO DEAL WITH ISSUES",
      subtitle: "Our team is ready to fight on your behalf",
      cta: "Get Legal Advice",
      link: "/ask-legal-advice",
      image: "/lovable-uploads/74a69ce1-a6bf-4425-b520-90e996d23567.png"
    },
    {
      title: "BETTER TO KNOW YOUR RIGHTS TO DEAL WITH COPS",
      subtitle: "Subscribe to our weekly articles to know your rights",
      cta: "Sign Up",
      link: "/signup",
      image: "/lovable-uploads/895c7048-27af-4849-a014-fb3c7e9d698c.png"
    }
  ];

  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full min-h-[560px] sm:min-h-[75vh] overflow-hidden pb-16 mt-[72px]">
      <Carousel setApi={setApi} className="h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="min-h-[560px] sm:h-[75vh]">
              <div className="relative h-full w-full">
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/75 via-black/55 to-black/10 flex items-end sm:items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-8 w-full">
                    <div className="max-w-xl sm:max-w-2xl space-y-4 sm:space-y-6 pb-2 sm:pb-8 md:pb-12">
                      <Badge 
                        variant="outline" 
                        className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-[11px] sm:text-xs"
                      >
                        Legal Solutions
                      </Badge>
                      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight max-w-[12ch] sm:max-w-none">
                        {slide.title}
                      </h1>
                      <p className="text-sm sm:text-lg md:text-2xl text-white/90 max-w-[34ch] sm:max-w-xl">
                        {slide.subtitle}
                      </p>
                      <div className="space-y-3 sm:space-y-4">
                        <Button
                          size="lg"
                          onClick={() => navigate(slide.link)}
                          className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg h-auto w-full sm:w-auto"
                        >
                          {slide.cta}
                        </Button>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Trusted legal help at your fingertips
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current 
                ? "bg-white w-4" 
                : "bg-white/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ConfidenceSlider;
