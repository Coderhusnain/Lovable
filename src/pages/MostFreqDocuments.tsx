import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";

// IMPORT YOUR FORM COMPONENTS HERE
import BidProposalForm from "@/components/BidProposalForm";
import TruckingContractForm from "@/components/TruckingContractForm";
import ProductionContractForm from "@/components/ProductionContractForm";
import MovingContractForm from "@/components/MovingContractForm";
import FulfillmentServicesContractForm from "@/components/FulfillmentAgreementForm";

const MostFreqDocuments = () => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const popularDocuments = useMemo(
    () => [
      { text: "Bid Proposal" },
      { text: "Trucking Contract" },
      { text: "Production Contract" },
      { text: "Moving Contract" },
      { text: "Fullfilment Services Contract" }
    ],
    []
  );

  // Map names to components
  const documentComponents: Record<string, React.ComponentType> = {
    "Bid Proposal": BidProposalForm,
    "Trucking Contract": TruckingContractForm,
    "Production Contract": ProductionContractForm,
    "Moving Contract": MovingContractForm,
    "Fullfilment Services Contract": FulfillmentServicesContractForm
  };

  const navigate = useNavigate();

  const handleProtectedNavigation = (docName: string) => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSelectedDoc(docName); // → render specific component
      } else {
        navigate("/login");
      }
    });
  };

  // If a document is selected → show the form
  if (selectedDoc) {
    const Component = documentComponents[selectedDoc];
    return (
      <Layout>
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">

          {/* Back button */}
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => setSelectedDoc(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Popular Documents
          </Button>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-4">{selectedDoc}</h2>

          {/* Render the actual form */}
          <Component />
        </div>
      </section>
      </Layout>
    );
  }

  // Default view → show the 5 blocks
  return (
    <Layout>
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">
            Popular Documents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Most Frequently Used Legal Documents
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create Agreements in minutes with our easy-to-use platform.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {popularDocuments.map(({ text }) => (
            <div
              key={text}
              className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-bright-orange-300 hover:shadow-xl transition-all group"
            >
              <div className="bg-bright-orange-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-bright-orange-200 transition-colors">
                <FileText className="h-8 w-8 text-[#F18F01]" />
              </div>

              <span className="font-medium text-black">{text}</span>

              <div className="text-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-bright-orange-500 text-white font-medium rounded-lg shadow-md px-3 py-3 mt-3 h-auto text-sm hover:bg-[#D17701] transition-colors"
                  onClick={(e) =>
                    {
                      e.stopPropagation();
                      handleProtectedNavigation(text)
                    }
                    } 
                >
                  Create Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default MostFreqDocuments;
