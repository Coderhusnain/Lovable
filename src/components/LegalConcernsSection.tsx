import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Scale, Building2, ArrowRight, LayoutGrid } from "lucide-react";
import LegalDisclaimer from "@/components/LegalDisclaimer";

interface LegalConcernsSectionProps {
  onCategorySelect: (category: string) => void;
}

const LegalConcernsSection: React.FC<LegalConcernsSectionProps> = ({ onCategorySelect }) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'family-protection',
      title: 'Family Protection',
      description: 'Secure your family\'s future with wills, trusts, and estate planning documents',
      icon: Shield
    },
    {
      id: 'business-security',
      title: 'Business Security',
      description: 'Protect your business with contracts, agreements, and legal compliance documents',
      icon: Scale
    },
    {
      id: 'property-matters',
      title: 'Property Matters',
      description: 'Handle real estate transactions and property disputes with proper legal documentation',
      icon: Building2
    }
  ];

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Common Legal Concerns We Address
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive legal solutions for your most important concerns
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer bg-white border border-gray-200 hover:border-bright-orange-300 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-bright-orange-50 group-hover:bg-bright-orange-100 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-bright-orange-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <span className="inline-flex items-center font-medium text-bright-orange-500 group-hover:text-bright-orange-600 transition-colors">
                    Explore documents
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center mb-10">
          <Button
            variant="outline"
            onClick={() => navigate('/document-categories')}
            className="border-bright-orange-300 text-bright-orange-600 hover:bg-bright-orange-50 hover:text-bright-orange-700 px-6 py-5 rounded-xl font-medium"
          >
            <LayoutGrid className="w-5 h-5 mr-2" />
            Browse All Document Categories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <LegalDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default LegalConcernsSection;
