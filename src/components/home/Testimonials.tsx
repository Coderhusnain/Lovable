import { memo } from "react";
import { BadgeIcon, SecureIcon, HeartIcon, BrandIconTile } from "@/components/icons/BrandIcons";

const promises = [
  {
    icon: BadgeIcon,
    title: "Drafted or reviewed by qualified lawyers.",
    text: "Every template on our platform was built by attorneys with real practice experience, not scraped from the internet."
  },
  {
    icon: SecureIcon,
    title: "Written to protect you.",
    text: "Our documents are drafted to favor the person or business using them, not to be \"neutral\" in a way that quietly favors the other side."
  },
  {
    icon: HeartIcon,
    title: "Honest scope.",
    text: "If your matter needs a licensed attorney in your state, we tell you plainly and help you find one. No overselling."
  }
];

const Testimonials = () => {
  return (
    <section className="py-8 md:py-12 bg-[#FDE1D3]">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="text-black font-medium mb-2 block">Our Promise</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            What You Get with Every Legalgram Document
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {promises.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <BrandIconTile size="lg" className="mb-4">
                <p.icon size={32} />
              </BrandIconTile>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
