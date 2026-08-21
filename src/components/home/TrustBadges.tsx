
import { memo } from "react";

const badges = [
  "100% Secure & Confidential",
  "Attorney Reviewed Documents",
  "5+ Years of Experience",
  "Money Back Guarantee",
];

const chips = ["SSL Encrypted", "Your Data Stays Private", "Attorney Reviewed Templates"];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-white border-b border-rocket-gray-200">
      <div className="container-custom">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-rocket-gray-600">
            Trusted legal documents, built with attorney expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div key={b} className="p-4 border border-rocket-gray-100 border-l-[3px] border-l-bright-orange-500 rounded-lg bg-rocket-gray-50 text-center">
              <span className="text-xs md:text-sm font-semibold text-black">{b}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          {chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 text-xs font-medium text-rocket-gray-600 bg-rocket-gray-50 border border-rocket-gray-100 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bright-orange-500" /> {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TrustBadges);
