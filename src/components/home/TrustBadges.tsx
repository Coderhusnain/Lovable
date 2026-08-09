
import { memo } from "react";
import { Shield, Award, Clock } from "lucide-react";

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
          <div className="flex flex-col items-center gap-2 p-3 border border-rocket-gray-100 rounded-lg bg-rocket-gray-50">
            <Shield className="w-6 h-6 text-[#F18F01]" />
            <span className="text-xs md:text-sm font-medium text-black text-center">100% Secure & Confidential</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-3 border border-rocket-gray-100 rounded-lg bg-rocket-gray-50">
            <Award className="w-6 h-6 text-[#F18F01]" />
            <span className="text-xs md:text-sm font-medium text-black text-center">Attorney Reviewed Documents</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-3 border border-rocket-gray-100 rounded-lg bg-rocket-gray-50">
            <Clock className="w-6 h-6 text-[#F18F01]" />
            <span className="text-xs md:text-sm font-medium text-black text-center">5+ Years of Experience</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-3 border border-rocket-gray-100 rounded-lg bg-rocket-gray-50">
            <Shield className="w-6 h-6 text-[#F18F01]" />
            <span className="text-xs md:text-sm font-medium text-black text-center">Money Back Guarantee</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-rocket-gray-600 bg-rocket-gray-50 border border-rocket-gray-100 rounded-full px-4 py-2">
            <Shield className="h-3.5 w-3.5 text-[#F18F01]" /> SSL Encrypted
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-rocket-gray-600 bg-rocket-gray-50 border border-rocket-gray-100 rounded-full px-4 py-2">
            <Shield className="h-3.5 w-3.5 text-[#F18F01]" /> Your Data Stays Private
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-rocket-gray-600 bg-rocket-gray-50 border border-rocket-gray-100 rounded-full px-4 py-2">
            <Award className="h-3.5 w-3.5 text-[#F18F01]" /> Attorney Reviewed Templates
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(TrustBadges);
