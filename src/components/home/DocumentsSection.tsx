import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ScrollText, Briefcase, FileLock2, ArrowRight } from "lucide-react";
import { memo } from "react";

const documents = [
  {
    icon: Home,
    number: "1",
    title: "Residential Lease Agreement",
    description:
      "Whether you're a landlord protecting your property or a tenant moving into a new place, a properly drafted lease is the single most important document in your rental. Ours covers rent, security deposit, maintenance, entry rights, and eviction terms in language both parties can understand.",
    cta: "Create a Lease Agreement",
    to: "/documents/lease-agreement"
  },
  {
    icon: ScrollText,
    number: "2",
    title: "Last Will and Testament",
    description:
      "Fewer than half of American adults have a will. That's a problem you can fix in minutes. Our will covers guardianship of children, distribution of assets, digital estate, executor appointment, and everything a court needs to enforce your wishes without a fight.",
    cta: "Create a Will",
    to: "/documents/lastwill"
  },
  {
    icon: Briefcase,
    number: "3",
    title: "Independent Contractor Agreement",
    description:
      "If you hire freelancers or you are a freelancer, this is the contract you cannot afford to skip. Ours locks in scope, payment terms, IP ownership, confidentiality, and termination rights so nobody walks away confused about what was owed.",
    cta: "Create a Contractor Agreement",
    to: "/documents/independent-contractor"
  },
  {
    icon: FileLock2,
    number: "4",
    title: "Non-Disclosure Agreement (NDA)",
    description:
      "Before you pitch your idea, share your customer list, or open your books, get an NDA in writing. Our mutual and one-way NDAs are drafted to actually hold up if things go sideways.",
    cta: "Create an NDA",
    to: "/documents/nda"
  }
];

const DocumentsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">
            Popular Documents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Most Frequently Used Legal Documents
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The four documents Americans reach for most often, ready to create in minutes on Legalgram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="flex flex-col bg-white rounded-2xl p-7 border border-gray-200 hover:border-bright-orange-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="bg-bright-orange-100 rounded-xl w-12 h-12 flex items-center justify-center">
                    <doc.icon className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-bright-orange-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {doc.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{doc.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 flex-grow">{doc.description}</p>
              <Button
                className="w-full sm:w-auto self-start bg-bright-orange-500 hover:bg-bright-orange-600 text-white font-medium"
                asChild
              >
                <Link to={doc.to}>
                  {doc.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(DocumentsSection);
