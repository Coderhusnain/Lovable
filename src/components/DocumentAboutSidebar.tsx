
import { FileText, AlertCircle, CheckCircle, BookOpen, HelpCircle, Scale, Clock, Target, Sparkles, Gavel, Info, ChevronRight, AlertTriangle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface DocumentInfo {
  title: string;
  shortDescription: string;
  fullDescription: string;
  whenToUse: string[];
  keyTerms: { term: string; definition: string }[];
  tips: string[];
  warnings: string[];
  relatedDocuments?: { title: string; id: string }[];
  estimatedTime?: string;
}

export const documentInfoDatabase: Record<string, DocumentInfo> = {
  "nda": {
    title: "Non-Disclosure Agreement (NDA)",
    shortDescription: "A legally binding contract that establishes confidentiality between parties.",
    fullDescription: "A Non-Disclosure Agreement is a legal contract between two or more parties that outlines confidential material, knowledge, or information that the parties wish to share with one another for certain purposes but wish to restrict access to.",
    whenToUse: ["Before sharing sensitive business information", "When hiring employees with access to proprietary data"],
    keyTerms: [
      { term: "Confidential Information", definition: "Any non-public information shared between parties." },
      { term: "Disclosing Party", definition: "The party sharing the confidential information." }
    ],
    tips: ["Be specific about what constitutes confidential information", "Set a reasonable duration"],
    warnings: ["An NDA cannot protect information that is already public", "Both parties must sign"],
    relatedDocuments: [{ title: "Mutual NDA", id: "mutual-nda" }],
    estimatedTime: "10-15 minutes"
  },
  "mutual-nda": {
    title: "Mutual Non-Disclosure Agreement",
    shortDescription: "A bilateral confidentiality agreement where both parties share and protect information.",
    fullDescription: "A Mutual NDA creates reciprocal confidentiality obligations for both parties.",
    whenToUse: ["Joint venture discussions", "Business partnership negotiations"],
    keyTerms: [{ term: "Bilateral Agreement", definition: "Both parties have equal obligations." }],
    tips: ["Ensure both parties understand their obligations"],
    warnings: ["Both parties are equally bound"],
    estimatedTime: "15-20 minutes"
  },
  "lease-agreement": {
    title: "Residential Lease Agreement",
    shortDescription: "A contract between landlord and tenant for renting residential property.",
    fullDescription: "A Residential Lease Agreement outlines the terms and conditions for renting property.",
    whenToUse: ["Renting out property", "Moving into a rental"],
    keyTerms: [
      { term: "Lessor/Landlord", definition: "The property owner." },
      { term: "Security Deposit", definition: "Money held by landlord for damages." }
    ],
    tips: ["Document property condition with photos"],
    warnings: ["Must comply with local landlord-tenant laws"],
    estimatedTime: "20-30 minutes"
  },
  "llc-operating-agreement": {
    title: "LLC Operating Agreement",
    shortDescription: "Sets the internal rules, ownership, and management structure for an LLC.",
    fullDescription: "An LLC Operating Agreement helps establish how your company operates and protects members by putting all key terms in writing. It defines member roles, management structure (member-managed or manager-managed), profit and loss allocation, voting rights, and procedures for member withdrawal or buyouts.",
    whenToUse: [
      "New LLC formation",
      "Single-member LLC setup",
      "Multi-member business ownership",
      "Defining management structure",
      "Profit and loss allocation",
      "Voting rights among members",
      "Member withdrawal and buyouts",
      "Protecting limited liability status",
      "Opening bank accounts or seeking funding"
    ],
    keyTerms: [
      { term: "Member", definition: "An owner of the LLC with ownership rights and responsibilities." },
      { term: "Management Structure", definition: "How the LLC is managed: member-managed or manager-managed." },
      { term: "Capital Contribution", definition: "Money, property, or services provided by members to the LLC." },
      { term: "Profit and Loss Allocation", definition: "How earnings and losses are shared among members." }
    ],
    tips: [
      "List each member's capital contribution and ownership percentage clearly",
      "Define voting thresholds for key decisions",
      "Include buyout terms for member withdrawal"
    ],
    warnings: [
      "Some states require an operating agreement for multi-member LLCs",
      "Banks and investors often require a signed agreement"
    ],
    estimatedTime: "20-30 minutes"
  },
  "llc-business-formation": {
    title: "LLC Business Formation",
    shortDescription: "Sets up ownership, management, and governance for a new LLC.",
    fullDescription: "An LLC Operating Agreement helps establish how your company operates and protects members by putting all key terms in writing. It defines ownership structure, management responsibilities, profit allocation, and member voting rights.",
    whenToUse: [
      "New LLC formation",
      "Single-member LLC setup",
      "Multi-member business ownership",
      "Defining management structure",
      "Profit and loss allocation",
      "Voting rights among members",
      "Member withdrawal and buyouts",
      "Protecting limited liability status",
      "Opening bank accounts or seeking funding"
    ],
    keyTerms: [
      { term: "Member", definition: "An owner of the LLC with ownership rights and responsibilities." },
      { term: "Capital Contribution", definition: "Money, property, or services contributed to the LLC." },
      { term: "Management Structure", definition: "Member-managed or manager-managed governance." },
      { term: "Profit Allocation", definition: "How profits and losses are shared among members." }
    ],
    tips: [
      "List each member's capital contribution and ownership percentage clearly",
      "Define voting thresholds for key decisions",
      "Include buyout terms for member withdrawal"
    ],
    warnings: [
      "Some states require an operating agreement for multi-member LLCs",
      "Banks and investors often require a signed agreement"
    ],
    estimatedTime: "20-30 minutes"
  },
  "AccountingContractForm": {
    title: "Accounting Contract Agreement",
    shortDescription: "Defines accounting services, fees, and responsibilities between client and accountant.",
    fullDescription: "An Accounting Contract Agreement is a legal document between a client and an accountant or accounting firm. It explains the scope of accounting work, service duration, payment terms and fees, confidentiality obligations, deadlines and deliverables, termination terms, and responsibilities of both parties.",
    whenToUse: [
      "Hiring a chartered accountant",
      "Bookkeeping services",
      "Tax filing and tax return preparation",
      "Payroll management",
      "Financial statements and reports",
      "Ongoing accounting consultancy",
      "Small business accounting services"
    ],
    keyTerms: [
      { term: "Scope of Work", definition: "The accounting tasks and services the accountant will perform." },
      { term: "Payment Terms", definition: "Fees, billing schedule, and payment method for services." },
      { term: "Confidentiality", definition: "Protection of sensitive financial records and client data." },
      { term: "Deliverables", definition: "Reports, filings, and statements provided by the accountant." }
    ],
    tips: [
      "List deliverables and deadlines clearly",
      "Define how fees are calculated and billed",
      "Include confidentiality and data protection terms"
    ],
    warnings: [
      "Unclear scope can lead to billing disputes",
      "Late or missing deliverables can create compliance risk"
    ],
    estimatedTime: "15-25 minutes"
  },
  "ArbitrationAgreementForm": {
    title: "Arbitration Agreement",
    shortDescription: "Resolves disputes through binding arbitration instead of court.",
    fullDescription: "An Arbitration Agreement is a legal contract between parties agreeing that disputes will be settled through arbitration rather than court litigation. It defines arbitration rules, arbitrator selection, location, and cost-sharing.",
    whenToUse: [
      "Business partnership disputes",
      "Commercial contract disputes",
      "Employment disputes",
      "Service agreement conflicts",
      "Vendor and supplier disagreements",
      "Property and payment disputes",
      "Future dispute resolution planning"
    ],
    keyTerms: [
      { term: "Scope of Disputes", definition: "Which disagreements are covered by arbitration." },
      { term: "Arbitrator", definition: "Neutral third party who decides the dispute." },
      { term: "Arbitration Rules", definition: "Procedures and rules governing the arbitration." },
      { term: "Binding Decision", definition: "Final and enforceable outcome of the arbitration." }
    ],
    tips: [
      "Specify the arbitration forum or rules",
      "Define how the arbitrator is selected",
      "Clarify cost-sharing arrangements"
    ],
    warnings: [
      "Arbitration decisions are typically final and hard to appeal",
      "Confirm enforceability in your jurisdiction"
    ],
    estimatedTime: "10-20 minutes"
  },
  "BrokerAgreementForm": {
    title: "Broker Agreement",
    shortDescription: "Defines brokerage services, fees, and introductions for business deals.",
    fullDescription: "A Broker Agreement is a legal contract between a broker and a client that sets the terms under which the broker will help arrange a business transaction or introduction in exchange for compensation.",
    whenToUse: [
      "Business sales and acquisitions",
      "Buyer and seller introductions",
      "Property brokerage deals",
      "Product sourcing arrangements",
      "Investor introductions",
      "Client referral agreements",
      "Recruitment and hiring introductions",
      "Commercial brokerage services"
    ],
    keyTerms: [
      { term: "Commission", definition: "Fee paid to the broker for a successful introduction or deal." },
      { term: "Exclusivity", definition: "Whether the broker has exclusive rights to represent the client." },
      { term: "Non-Circumvention", definition: "Prevents parties from bypassing the broker to avoid fees." },
      { term: "Scope of Services", definition: "The brokerage activities the broker will perform." }
    ],
    tips: [
      "Define commission structure and payment triggers",
      "Clarify exclusivity and term length",
      "Include confidentiality and non-circumvention terms"
    ],
    warnings: [
      "Broker licensing rules vary by jurisdiction",
      "Vague fee terms can lead to disputes"
    ],
    estimatedTime: "10-20 minutes"
  },
  "bidproposal-agreement": {
    title: "Bid Proposal Agreement",
    shortDescription: "Presents pricing, scope, and timeline to win projects with confidence.",
    fullDescription: "A Bid Proposal is a business document used by contractors, freelancers, vendors, or companies to offer services for a project. It includes project details, cost estimates, labor charges, material pricing, schedules, and terms for completing the work.",
    whenToUse: [
      "Construction project bids",
      "Freelance service proposals",
      "Website design quotations",
      "Interior design project bids",
      "Supplier quotations",
      "Repair and maintenance bids",
      "Commercial service contracts",
      "Tender submissions"
    ],
    keyTerms: [
      { term: "Scope of Work", definition: "The specific tasks and deliverables included in the bid." },
      { term: "Cost Estimate", definition: "Pricing for labor, materials, and total project cost." },
      { term: "Timeline", definition: "Projected start and completion dates for the work." },
      { term: "Payment Schedule", definition: "How and when payments are due." }
    ],
    tips: [
      "Itemize labor and material costs clearly",
      "Define assumptions and exclusions",
      "Include a clear completion timeline"
    ],
    warnings: [
      "Ambiguous scope can cause disputes",
      "Ensure pricing aligns with your contract terms"
    ],
    estimatedTime: "10-20 minutes"
  },
  "living-will": {
    title: "Living Will (Advance Directive)",
    shortDescription: "Documents your healthcare wishes if you become incapacitated.",
    fullDescription: "A Living Will specifies what actions should be taken for your health if you cannot make decisions.",
    whenToUse: ["Planning end-of-life care", "Before major surgery"],
    keyTerms: [{ term: "Advance Directive", definition: "Legal document stating healthcare preferences." }],
    tips: ["Discuss your wishes with family"],
    warnings: ["Requirements vary by state"],
    estimatedTime: "15-25 minutes"
  },
  "independent-contractor": {
    title: "Independent Contractor Agreement",
    shortDescription: "Defines the working relationship between a business and a contractor.",
    fullDescription: "Establishes terms between a company and a self-employed individual providing services.",
    whenToUse: ["Hiring freelancers", "Outsourcing projects"],
    keyTerms: [{ term: "Scope of Work", definition: "Description of services to be provided." }],
    tips: ["Clearly define deliverables"],
    warnings: ["Misclassifying employees has legal consequences"],
    estimatedTime: "20-30 minutes"
  },
  "general-power-of-attorney": {
    title: "General Power of Attorney",
    shortDescription: "Authorizes someone to act on your behalf in legal and financial matters.",
    fullDescription: "Grants another person broad authority to handle your financial affairs.",
    whenToUse: ["Traveling abroad", "Needing help managing finances"],
    keyTerms: [
      { term: "Principal", definition: "Person granting the power." },
      { term: "Agent", definition: "Person receiving authority to act." }
    ],
    tips: ["Choose a trustworthy agent"],
    warnings: ["Grants significant power - choose carefully"],
    estimatedTime: "15-20 minutes"
  },
  "special-power-of-attorney": {
    title: "Special/Limited Power of Attorney",
    shortDescription: "Grants specific, limited authority for particular transactions.",
    fullDescription: "Grants your agent authority only for specific matters or transactions.",
    whenToUse: ["Selling real estate when absent", "Managing a specific transaction"],
    keyTerms: [{ term: "Limited Authority", definition: "Agent can only perform specified acts." }],
    tips: ["Be very specific about powers granted"],
    warnings: ["Agent cannot act beyond specified powers"],
    estimatedTime: "10-15 minutes"
  },
  "employment-agreement": {
    title: "Employment Agreement",
    shortDescription: "A formal contract between employer and employee outlining terms of employment.",
    fullDescription: "An Employment Agreement defines the relationship between an employer and employee, including job duties, compensation, benefits, and termination conditions.",
    whenToUse: ["Hiring new employees", "Formalizing existing employment relationships", "Changing employment terms"],
    keyTerms: [
      { term: "At-Will Employment", definition: "Either party can terminate the relationship at any time." },
      { term: "Compensation", definition: "Salary, wages, bonuses, and other payment terms." }
    ],
    tips: ["Clearly define job responsibilities", "Include confidentiality provisions", "Specify non-compete terms if applicable"],
    warnings: ["Must comply with labor laws", "Non-compete clauses may not be enforceable in all states"],
    estimatedTime: "20-30 minutes"
  },
  "service-agreement": {
    title: "Service Agreement",
    shortDescription: "A contract for the provision of services between a provider and client.",
    fullDescription: "A Service Agreement outlines the terms under which one party will provide services to another, including scope, payment, and deliverables.",
    whenToUse: ["Hiring service providers", "Offering professional services", "Outsourcing work"],
    keyTerms: [
      { term: "Scope of Services", definition: "The specific services to be provided." },
      { term: "Service Level Agreement", definition: "Standards and expectations for service delivery." }
    ],
    tips: ["Be specific about deliverables", "Include payment milestones", "Define revision policies"],
    warnings: ["Ensure clear termination clauses", "Consider insurance requirements"],
    estimatedTime: "15-25 minutes"
  },
  "consulting-agreement": {
    title: "Consulting Agreement",
    shortDescription: "A contract for professional consulting services.",
    fullDescription: "A Consulting Agreement establishes the terms for a consultant to provide expert advice or services to a client organization.",
    whenToUse: ["Hiring consultants", "Providing consulting services", "Project-based engagements"],
    keyTerms: [
      { term: "Consultant", definition: "An independent professional providing specialized expertise." },
      { term: "Retainer", definition: "An ongoing fee for continued access to consulting services." }
    ],
    tips: ["Define intellectual property ownership", "Set clear project boundaries", "Include confidentiality provisions"],
    warnings: ["Ensure proper contractor classification", "Define liability limits"],
    estimatedTime: "20-30 minutes"
  },
  "partnership-agreement": {
    title: "Partnership Agreement",
    shortDescription: "A contract establishing a business partnership between two or more parties.",
    fullDescription: "A Partnership Agreement outlines the rights, responsibilities, and profit-sharing arrangements between business partners.",
    whenToUse: ["Starting a partnership", "Adding new partners", "Restructuring partnership terms"],
    keyTerms: [
      { term: "General Partner", definition: "A partner with management authority and unlimited liability." },
      { term: "Capital Contribution", definition: "Money or assets invested by each partner." }
    ],
    tips: ["Define decision-making processes", "Include dispute resolution mechanisms", "Plan for partner exit scenarios"],
    warnings: ["Partners may be personally liable for debts", "Verbal agreements can lead to disputes"],
    estimatedTime: "30-45 minutes"
  },
  "commercial-lease": {
    title: "Commercial Lease Agreement",
    shortDescription: "A lease agreement for commercial or business property.",
    fullDescription: "A Commercial Lease Agreement defines the terms for renting commercial space including rent, common area maintenance, and permitted uses.",
    whenToUse: ["Leasing office or retail space", "Renting warehouse or industrial property", "Opening a new business location"],
    keyTerms: [
      { term: "Triple Net (NNN)", definition: "Tenant pays property taxes, insurance, and maintenance." },
      { term: "CAM Charges", definition: "Common Area Maintenance fees shared among tenants." }
    ],
    tips: ["Negotiate tenant improvement allowances", "Understand all additional costs", "Review permitted use clauses"],
    warnings: ["Commercial leases have fewer protections than residential", "Personal guarantees may be required"],
    estimatedTime: "30-45 minutes"
  },
  "bill-of-sale": {
    title: "Bill of Sale",
    shortDescription: "Proof of purchase and ownership transfer for personal property.",
    fullDescription: "A Bill of Sale is a legal document used to transfer ownership of personal property from a seller to a buyer. It confirms that payment has been made and ownership has passed to the purchaser.",
    whenToUse: [
      "Furniture sale",
      "Equipment transfer",
      "Electronics sale",
      "Business assets sale",
      "Household goods sale",
      "Machinery sale",
      "Animal or livestock sale",
      "General personal property transfer"
    ],
    keyTerms: [
      { term: "Item Description", definition: "Details that identify the property being sold." },
      { term: "As-Is", definition: "Buyer accepts the item in its current condition without warranties." },
      { term: "Purchase Price", definition: "The agreed sale amount paid by the buyer." },
      { term: "Transfer Date", definition: "The date ownership changes hands." }
    ],
    tips: [
      "List item condition and any defects",
      "Include serial numbers or identifiers",
      "Have both parties sign and keep copies"
    ],
    warnings: [
      "Some transactions require additional title or registration documents",
      "Confirm any local notarization requirements"
    ],
    estimatedTime: "5-10 minutes"
  },
  "BillOfSaleForm": {
    title: "Bill of Sale",
    shortDescription: "Proof of purchase and ownership transfer for personal property.",
    fullDescription: "A Bill of Sale is a legal document used to transfer ownership of personal property from a seller to a buyer. It confirms that payment has been made and ownership has passed to the purchaser.",
    whenToUse: [
      "Furniture sale",
      "Equipment transfer",
      "Electronics sale",
      "Business assets sale",
      "Household goods sale",
      "Machinery sale",
      "Animal or livestock sale",
      "General personal property transfer"
    ],
    keyTerms: [
      { term: "Item Description", definition: "Details that identify the property being sold." },
      { term: "As-Is", definition: "Buyer accepts the item in its current condition without warranties." },
      { term: "Purchase Price", definition: "The agreed sale amount paid by the buyer." },
      { term: "Transfer Date", definition: "The date ownership changes hands." }
    ],
    tips: [
      "List item condition and any defects",
      "Include serial numbers or identifiers",
      "Have both parties sign and keep copies"
    ],
    warnings: [
      "Some transactions require additional title or registration documents",
      "Confirm any local notarization requirements"
    ],
    estimatedTime: "5-10 minutes"
  },
  "promissory-note": {
    title: "Promissory Note",
    shortDescription: "A written promise to pay a specific sum of money.",
    fullDescription: "A Promissory Note is a legal document where one party promises to pay another party a specified amount under defined terms.",
    whenToUse: ["Lending money to friends or family", "Formalizing a business loan", "Documenting payment arrangements"],
    keyTerms: [
      { term: "Principal", definition: "The original amount of money borrowed." },
      { term: "Interest Rate", definition: "The percentage charged for borrowing the principal." }
    ],
    tips: ["Include a clear repayment schedule", "Specify consequences of default", "Consider collateral for large amounts"],
    warnings: ["Usury laws limit maximum interest rates", "May require notarization to be enforceable"],
    estimatedTime: "15-20 minutes"
  },
  "last-will-testament": {
    title: "Last Will and Testament",
    shortDescription: "A legal document expressing wishes for asset distribution after death.",
    fullDescription: "A Last Will and Testament directs how your assets should be distributed, names guardians for minor children, and appoints an executor.",
    whenToUse: ["Estate planning", "After major life changes (marriage, children)", "Updating previous wills"],
    keyTerms: [
      { term: "Testator", definition: "The person making the will." },
      { term: "Executor", definition: "The person responsible for carrying out the will's instructions." },
      { term: "Beneficiary", definition: "A person or entity receiving assets from the estate." }
    ],
    tips: ["Keep your will updated", "Store the original in a safe place", "Inform your executor of the will's location"],
    warnings: ["Must meet state requirements for witnesses", "A will does not avoid probate"],
    estimatedTime: "30-45 minutes"
  },
  "release-of-liability": {
    title: "Release of Liability (Waiver)",
    shortDescription: "A document releasing a party from legal liability for potential claims.",
    fullDescription: "A Release of Liability waiver protects individuals or businesses from lawsuits arising from injuries or damages during specific activities.",
    whenToUse: ["Before participating in risky activities", "Hosting events", "Providing recreational services"],
    keyTerms: [
      { term: "Assumption of Risk", definition: "Participant acknowledges and accepts potential dangers." },
      { term: "Indemnification", definition: "Agreement to compensate for any losses or damages." }
    ],
    tips: ["Be specific about the activities covered", "Use clear, understandable language", "Include signature and date lines"],
    warnings: ["Cannot waive liability for gross negligence", "May not be enforceable for minors without parent signature"],
    estimatedTime: "10-15 minutes"
  },
  "cease-and-desist": {
    title: "Cease and Desist Letter",
    shortDescription: "A formal demand to stop illegal or infringing activity.",
    fullDescription: "A Cease and Desist letter demands that the recipient stop and refrain from certain conduct, often used for intellectual property infringement or harassment.",
    whenToUse: ["Someone is using your trademark", "Stopping harassment", "Copyright infringement"],
    keyTerms: [
      { term: "Infringement", definition: "Unauthorized use of protected intellectual property." },
      { term: "Demand", definition: "A formal request for action by a specific deadline." }
    ],
    tips: ["Document all instances of the infringing behavior", "Set a clear deadline for compliance", "Keep copies of all correspondence"],
    warnings: ["This is not a lawsuit but may precede one", "Consult an attorney for serious matters"],
    estimatedTime: "15-20 minutes"
  },
  "rental-application": {
    title: "Rental Application",
    shortDescription: "A form for prospective tenants to apply for rental housing.",
    fullDescription: "A Rental Application collects information from prospective tenants for landlords to evaluate their suitability as renters.",
    whenToUse: ["Screening potential tenants", "Applying to rent property"],
    keyTerms: [
      { term: "Credit Check", definition: "Review of an applicant's credit history." },
      { term: "Security Deposit", definition: "Refundable amount held to cover potential damages." }
    ],
    tips: ["Verify all references", "Check credit and background", "Follow fair housing laws"],
    warnings: ["Cannot discriminate based on protected classes", "Must follow local screening laws"],
    estimatedTime: "15-20 minutes"
  },
  "roommate-agreement": {
    title: "Roommate Agreement",
    shortDescription: "A contract between roommates defining shared living responsibilities.",
    fullDescription: "A Roommate Agreement is a legally structured document designed to clearly define the rights, duties, and responsibilities of individuals sharing a residential property. It helps maintain harmony by setting clear expectations regarding rent, utilities, household duties, personal property, and general conduct.",
    whenToUse: ["Moving in with a new roommate", "A new roommate joining existing household", "Sharing rented accommodation under a lease"],
    keyTerms: [
      { term: "Co-Tenant", definition: "Individuals sharing the same rental property." },
      { term: "Common Areas", definition: "Shared spaces like kitchen, bathroom, and living room." }
    ],
    tips: ["Be specific about rent and utility splits", "Document cleaning schedules", "Address guest policies upfront"],
    warnings: ["Does not replace your landlord's lease agreement", "All roommates should sign"],
    relatedDocuments: [{ title: "Lease Agreement", id: "lease-agreement" }],
    estimatedTime: "20-30 minutes"
  },
  "bartending-agreement": {
    title: "Bartending Agreement",
    shortDescription: "A contract between a bartender and event organizer outlining bartending services, payment, liability, and alcohol service rules.",
    fullDescription: "A Bartending Agreement is a professionally structured contract that establishes the rights and obligations of a bartender and their client. This agreement clearly outlines what bartending services are included, payment terms and schedule, event details (date, time, location, number of guests), alcohol service rules, equipment and supply responsibilities, insurance and liability coverage, overtime and additional charges, cancellation policies, and dispute resolution procedures.",
    whenToUse: [
      "Hiring a bartender for an event",
      "Offering professional bartending services",
      "Hosting weddings, parties, or corporate events",
      "Serving alcohol at private or public venues",
      "Working with freelance or mobile bartenders"
    ],
    keyTerms: [
      { term: "Bartending Services", definition: "Professional services provided by a bartender, including mixing drinks, serving alcohol, and managing the bar." },
      { term: "Right to Refuse Service", definition: "Bartender's legal authority to refuse service to intoxicated guests or those who violate terms." },
      { term: "Open Bar vs. Limited Bar", definition: "Open bar means unlimited drinks; limited bar means specific drinks or quantity limits." },
      { term: "Liquor Liability", definition: "Legal responsibility for injuries or damages caused by serving alcohol to intoxicated persons." },
      { term: "Dram Shop Laws", definition: "Laws holding bartenders and establishments liable for damages caused by intoxicated individuals they served." }
    ],
    tips: [
      "Clearly define what bartending services are included (mixing drinks, managing bar, setup/cleanup)",
      "Specify who provides alcohol and bar equipment (bartender, host, or split)",
      "Include minimum booking hours and any overtime rates",
      "Define number of bartenders based on expected guest count",
      "Specify setup and breakdown times",
      "Address tipping policy (included, separate, percentage, or fixed)",
      "Include provisions for weather contingencies, especially for outdoor events",
      "Specify types of alcohol permitted and any restrictions"
    ],
    warnings: [
      "Always have a written signed agreement before the event",
      "Ensure bartender has proper liquor license and training",
      "Include specific liability and insurance coverage requirements",
      "Clearly define who is responsible if legal issues arise from alcohol service",
      "Bartender must have right to refuse service to intoxicated guests",
      "Include clear payment terms to avoid payment disputes",
      "Address age verification procedures for alcohol service",
      "Specify cancellation policies and deadlines clearly"
    ],
    relatedDocuments: [
      { title: "Event Agreement", id: "event-agreement" },
      { title: "Service Agreement", id: "service-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "dj-services-agreement": {
    title: "DJ Services Agreement",
    shortDescription: "A contract for DJ and entertainment services at events.",
    fullDescription: "A DJ Services Agreement outlines terms for music and entertainment services, including equipment, playlist, timing, and payment for events.",
    whenToUse: ["Hiring a DJ for weddings", "Corporate events", "Birthday parties or celebrations"],
    keyTerms: [
      { term: "Performance Time", definition: "Duration and schedule of DJ services." },
      { term: "Equipment", definition: "Sound and lighting equipment provided." }
    ],
    tips: ["Specify music preferences and playlist", "Include backup equipment provisions", "Define setup and breakdown times"],
    warnings: ["Confirm noise ordinance compliance", "Include cancellation terms"],
    estimatedTime: "15-20 minutes"
  },
  "wedding-planner-agreement": {
    title: "Wedding Planner Agreement",
    shortDescription: "A contract between a wedding planner and client outlining services, fees, timelines, and responsibilities.",
    fullDescription: "A Wedding Planner Agreement is a professionally structured contract that clearly outlines the services provided by a wedding planner and the obligations of both the planner and the client. This agreement defines the scope of planning services, payment terms and schedule, service commencement and completion dates, cancellation and refund policies, confidentiality provisions, and dispute resolution procedures. A comprehensive Wedding Planner Agreement protects both parties and ensures smooth wedding planning with clear expectations.",
    whenToUse: [
      "You are a bride or groom hiring a wedding planner",
      "You are a wedding planner offering professional services",
      "You want clarity on payments, timelines, and responsibilities",
      "You want legal protection in case of disputes or cancellations",
      "You need a professional contract for wedding planning services"
    ],
    keyTerms: [
      { term: "Scope of Services", definition: "The specific wedding planning services included, such as vendor selection, venue coordination, or full planning." },
      { term: "Deliverables", definition: "Tangible items or outcomes provided by the wedding planner, such as vendor proposals, timelines, or design concepts." },
      { term: "Revision Round", definition: "One complete set of changes or edits to plans, proposals, or designs based on client feedback." },
      { term: "Independent Contractor", definition: "Status indicating the wedding planner is self-employed and not an employee of the client." },
      { term: "Force Majeure", definition: "Unforeseen circumstances beyond parties' control, such as natural disasters, illness, or government restrictions." }
    ],
    tips: [
      "Clearly define what services are included vs. additional services",
      "Specify payment schedule (deposit, progress payments, final payment)",
      "Include detailed timeline from contract date through wedding day",
      "Define number of planning meetings and revision rounds included",
      "Address communication preferences and response time expectations",
      "Include cancellation deadlines with specific refund percentages",
      "Clarify vendor selection process and planner's vendor relationships",
      "Specify what happens if vendors cancel or services cannot be provided"
    ],
    warnings: [
      "Always have a written signed contract before any work begins",
      "Clearly define payment terms to avoid disputes",
      "Specify cancellation policies with specific dates and refund amounts",
      "Include provisions for planner incapacity or emergency situations",
      "Address what happens if key vendors become unavailable",
      "Define confidentiality obligations for both parties",
      "Include dispute resolution procedures (mediation, arbitration)",
      "Protect intellectual property rights to planning designs and concepts"
    ],
    relatedDocuments: [
      { title: "Event Agreement", id: "event-agreement" },
      { title: "Vendor Agreement", id: "vendor-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "food-service-agreement": {
    title: "Food Service Agreement",
    shortDescription: "A contract for catering or food service provision.",
    fullDescription: "A Food Service Agreement defines terms between a caterer or food service provider and a client for providing meals at events or on an ongoing basis.",
    whenToUse: ["Event catering", "Corporate meal services", "Institutional food service contracts"],
    keyTerms: [
      { term: "Menu", definition: "The specific food items to be provided." },
      { term: "Per-Person Cost", definition: "Price charged per guest served." }
    ],
    tips: ["Specify dietary accommodations", "Include tasting arrangements", "Define service style (buffet, plated, etc.)"],
    warnings: ["Verify food handling licenses", "Include allergy disclosure requirements"],
    estimatedTime: "20-30 minutes"
  },
  "videography-agreement": {
    title: "Videography Services Agreement",
    shortDescription: "A contract for video recording and production services.",
    fullDescription: "A Videography Services Agreement outlines terms for video recording, editing, and delivery, including rights to footage, payment, and delivery timelines.",
    whenToUse: ["Wedding videography", "Corporate video production", "Event documentation"],
    keyTerms: [
      { term: "Deliverables", definition: "The final video products to be provided." },
      { term: "Raw Footage", definition: "Unedited video recordings from the shoot." }
    ],
    tips: ["Specify editing style and length", "Include revision limits", "Define delivery timeline"],
    warnings: ["Clarify who owns the footage", "Include backup provisions"],
    estimatedTime: "20-25 minutes"
  },
  "personal-training-agreement": {
    title: "Personal Training Agreement",
    shortDescription: "A contract between a personal trainer and client.",
    fullDescription: "A Personal Training Agreement establishes the relationship between a fitness professional and client, covering training sessions, payment, health disclosures, and liability waivers.",
    whenToUse: ["Starting with a personal trainer", "Gym personal training services", "Private fitness coaching"],
    keyTerms: [
      { term: "Session", definition: "A single training appointment." },
      { term: "Health Disclosure", definition: "Client's declaration of physical conditions." }
    ],
    tips: ["Include cancellation policies for missed sessions", "Document fitness goals", "Get health clearance if needed"],
    warnings: ["Trainers should carry liability insurance", "Clients should disclose health conditions"],
    estimatedTime: "15-20 minutes"
  },
  "tutoring-agreement": {
    title: "Tutoring Agreement",
    shortDescription: "A contract for educational tutoring services.",
    fullDescription: "A Tutoring Agreement defines terms between a tutor and student (or parent), covering subjects, schedule, payment, and expectations for educational support.",
    whenToUse: ["Hiring a tutor", "Offering tutoring services", "Academic preparation programs"],
    keyTerms: [
      { term: "Subject Matter", definition: "The academic subjects to be tutored." },
      { term: "Session Rate", definition: "Payment per tutoring session or hour." }
    ],
    tips: ["Set clear academic goals", "Include progress reporting", "Define cancellation policies"],
    warnings: ["Background checks may be required for tutors", "Clarify location of sessions"],
    estimatedTime: "15-20 minutes"
  },
  "retainer-agreement": {
    title: "Retainer Agreement",
    shortDescription: "A contract for ongoing professional services with upfront payment.",
    fullDescription: "A Retainer Agreement establishes an ongoing relationship where a client pays in advance for access to professional services, commonly used by attorneys, consultants, and agencies.",
    whenToUse: ["Hiring an attorney on retainer", "Ongoing consulting relationships", "Marketing agency services"],
    keyTerms: [
      { term: "Retainer Fee", definition: "Upfront payment for future services." },
      { term: "Hourly Rate", definition: "Rate charged against the retainer balance." }
    ],
    tips: ["Define what services are covered", "Specify replenishment requirements", "Include regular billing statements"],
    warnings: ["Unused retainer handling must be specified", "Termination terms should be clear"],
    estimatedTime: "20-25 minutes"
  },
  "legal-services-agreement": {
    title: "Legal Services Agreement",
    shortDescription: "A formal contract between a lawyer and client outlining legal services, fees, and obligations.",
    fullDescription: "A Legal Services Agreement is a formal contract between a lawyer and a client that outlines the legal services to be provided, fees, timelines, and obligations of both parties. This agreement includes clauses that protect attorneys from non-payment, misunderstandings, and scope creep.",
    whenToUse: [
      "You are an attorney offering legal services to clients",
      "You are a client hiring a lawyer or law firm",
      "You manage a law firm and want standardized documentation",
      "You want clarity on fees, scope of services, and responsibilities"
    ],
    keyTerms: [
      { term: "Scope of Representation", definition: "The specific legal matters and services the attorney will handle." },
      { term: "Attorney-Client Privilege", definition: "Confidentiality protection for sensitive communications between attorney and client." },
      { term: "Fee Structure", definition: "How the attorney charges for services (hourly, flat fee, contingency, retainer)." },
      { term: "Retainer", definition: "Upfront payment held by the attorney for legal services to be provided." }
    ],
    tips: [
      "Clearly define the scope of legal services at the outset",
      "Specify exact billing methods (hourly rates, flat fees, or contingency)",
      "Include payment schedule and invoice frequency",
      "Document all retainer amounts and how they will be applied",
      "Define what services are and are not included",
      "Set clear communication expectations",
      "Establish procedures for fee disputes"
    ],
    warnings: [
      "Fee structures vary significantly by attorney and jurisdiction",
      "Understand withdrawal procedures if termination becomes necessary",
      "Some agreements may include non-refundable retainers",
      "Scope creep can lead to disputes without clear definitions",
      "Attorney-client privilege may have exceptions",
      "Different types of legal services have different fee arrangements"
    ],
    relatedDocuments: [
      { title: "Retainer Agreement", id: "retainer-agreement" },
      { title: "Unbundled Legal Services Agreement", id: "unbundled-legal-services-agreement" }
    ],
    estimatedTime: "20-30 minutes"
  },
  "limited-scope-representation-agreement": {
    title: "Limited Scope Representation Agreement",
    shortDescription: "An agreement clearly outlining which legal services will be provided and which will not.",
    fullDescription: "A Limited Scope Representation Agreement (also known as a Limited Legal Services Agreement) allows a lawyer and a client to clearly outline which legal services will be provided and which will not. This agreement helps avoid confusion, prevents disputes, and ensures transparency throughout the legal engagement.",
    whenToUse: [
      "You are an attorney providing limited legal services",
      "You want to clearly define the scope of representation",
      "You are a client seeking help with only part of a legal matter",
      "You want to avoid full-service legal fees",
      "You want everything in writing before work begins"
    ],
    keyTerms: [
      { term: "Limited Scope of Services", definition: "The specific legal services the attorney will provide, with clear exclusions of services not included." },
      { term: "Attorney-Client Privilege", definition: "Confidentiality protection for communications related to the limited legal services." },
      { term: "Independent Contractor Status", definition: "Clarifies that the attorney is providing limited services only, not full legal representation." },
      { term: "Scope Creep Prevention", definition: "Clear boundaries to prevent the agreement from expanding beyond the defined services." }
    ],
    tips: [
      "Clearly define which legal services are included and excluded",
      "Specify the duration of the limited engagement",
      "Document fee structure (hourly, flat fee, or per-service)",
      "Establish payment terms and conditions",
      "Define communication protocols and availability",
      "Clarify that this is not full-service legal representation",
      "Include procedure for requesting additional services outside scope"
    ],
    warnings: [
      "Limited scope may restrict attorney's ability to handle related matters",
      "Client remains responsible for matters outside the defined scope",
      "Clear written boundaries are essential to prevent disputes",
      "Additional services may require a separate engagement",
      "Scope creep can occur without clear documentation",
      "Attorney may have limitations on providing certain advice outside scope"
    ],
    relatedDocuments: [
      { title: "Legal Services Agreement", id: "legal-services-agreement" },
      { title: "Unbundled Legal Services Agreement", id: "unbundled-legal-services-agreement" }
    ],
    estimatedTime: "20-30 minutes"
  },
 
  "real-estate-agent-agreement": {
    title: "Real Estate Agent Agreement",
    shortDescription: "An agreement between a property owner and a real estate agent for services.",
    fullDescription: "A Real Estate Agent Agreement is used when a property owner hires a real estate agent to sell, lease, or manage real estate. This agreement defines the scope of services, commission or payment terms, duration of the agreement, and rights and obligations of both parties.",
    whenToUse: [
      "You are selling property and hiring a real estate agent",
      "You are a licensed agent offering services to a client",
      "You want to clearly define commissions and timelines",
      "You want to avoid disputes over responsibilities or payment"
    ],
    keyTerms: [
      { term: "Commission Structure", definition: "How the agent is compensated (percentage of sale price, flat fee, etc.)" },
      { term: "Exclusive or Non-Exclusive", definition: "Whether the agent has exclusive rights to represent the property." },
      { term: "Term of Agreement", definition: "The length of time the agent has authority to represent the property." },
      { term: "Independent Contractor", definition: "Clarifies the agent's relationship status with the brokerage." }
    ],
    tips: [
      "Clearly define the property or properties covered by the agreement",
      "Specify the commission percentage or fee structure",
      "Include the term duration and renewal conditions",
      "Define marketing and showing procedures",
      "Require regular communication schedules",
      "Clarify responsibilities for inspections and appraisals",
      "Include performance expectations and timelines"
    ],
    warnings: [
      "Commission rates vary significantly by market and property type",
      "Exclusive agreements may limit your options if the agent underperforms",
      "Understand the agent's fiduciary duties and limitations",
      "Review market conditions and comparable sales data",
      "Clarify who handles earnest money and deposits",
      "Be aware of termination clauses and penalties"
    ],
    relatedDocuments: [
      { title: "Purchase Agreement", id: "purchase-agreement" },
      { title: "Listing Agreement", id: "listing-agreement" }
    ],
    estimatedTime: "20-30 minutes"
  },
  "valet-service-agreement": {
    title: "Valet Service Agreement",
    shortDescription: "A contract between a valet service provider and client outlining vehicle parking, handling, and protection services.",
    fullDescription: "A Valet Service Agreement is a professional contract that establishes the rights and obligations of a valet service provider and their client. It clearly outlines what services are included (parking, car handling, storage), payment terms, liability and damage protections, insurance requirements, and conditions under which the valet service operates. This agreement protects both the valet service provider and the vehicle owner.",
    whenToUse: [
      "You operate a valet parking service",
      "You are hiring a valet service for an event",
      "You need ongoing valet services at a business",
      "You operate a hotel, restaurant, or venue offering valet",
      "You want to clearly define liability and insurance coverage"
    ],
    keyTerms: [
      { term: "Valet Service", definition: "Professional vehicle parking and handling services where an attendant parks and retrieves customer vehicles." },
      { term: "Liability Waiver", definition: "Clause limiting the valet service provider's financial responsibility for vehicle damage or loss." },
      { term: "Commercial General Liability", definition: "Insurance coverage protecting service providers against claims of bodily injury or property damage." },
      { term: "Vehicle Damage Claims", definition: "Formal process for reporting and addressing damage to vehicles under valet service." },
      { term: "Scope of Services", definition: "Specific services included in the valet agreement, such as parking, storage, or special handling." }
    ],
    tips: [
      "Clearly define what services are included and what are additional charges",
      "Specify all liability limitations and what is NOT covered by the service",
      "Include detailed vehicle description to prevent damage claims",
      "Require proof of adequate insurance coverage from service provider",
      "Define clear procedures for reporting vehicle damage or loss",
      "Include terms for vehicle retrieval and hours of operation",
      "Specify payment terms, rates, and accepted payment methods",
      "Address what happens to personal items left in vehicles"
    ],
    warnings: [
      "Valet service providers face significant liability for vehicle damage and theft",
      "Ensure adequate insurance coverage before operating valet services",
      "Clearly limit liability in the agreement or face unlimited exposure",
      "Photograph vehicles before accepting them for valet services",
      "Maintain detailed vehicle keys and retrieval procedures",
      "Address parking lot security and theft prevention measures",
      "Include explicit exclusions for damage beyond provider control",
      "Keep detailed records of all vehicles and services provided"
    ],
    relatedDocuments: [
      { title: "Service Agreement", id: "service-agreement" },
      { title: "Liability Waiver", id: "liability-waiver" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "videography-services-agreement": {
    title: "Videography Services Agreement",
    shortDescription: "A contract between a videographer and client outlining video production services, deliverables, and usage rights.",
    fullDescription: "A Videography Services Agreement is a professional contract that establishes the rights and obligations of a videography service provider and their client. It clearly outlines what video services are included, deliverables (raw footage, edited video, final products), payment terms, project timeline, equipment and location access, intellectual property rights, editing and revision policies, and liability limitations. This agreement protects both the videographer and the client by establishing clear expectations.",
    whenToUse: [
      "You are a videographer offering video production services",
      "You are hiring a videographer for an event, wedding, or project",
      "You need to establish clear deliverables and timelines",
      "You want to define copyright and usage rights",
      "You need protection for proprietary production techniques or content"
    ],
    keyTerms: [
      { term: "Deliverables", definition: "The final video products provided to the client, including edited videos, formats, and quantity." },
      { term: "Intellectual Property Rights", definition: "Ownership and usage rights for the video footage and final products." },
      { term: "Raw Footage", definition: "Unedited video material captured during production." },
      { term: "Revision Round", definition: "One complete set of edits or changes made to the video based on client feedback." },
      { term: "Production Timeline", definition: "Dates for filming, editing, and delivery of the final video product." }
    ],
    tips: [
      "Clearly define what is included in the base price vs. additional services",
      "Specify exact video format, resolution, and delivery method",
      "Include detailed description of filming locations and required access",
      "Define number of filming hours and revision rounds included",
      "Clarify usage rights (exclusive, non-exclusive, portfolio use, etc.)",
      "Include backup equipment and contingency plans for technical issues",
      "Specify payment schedule (deposit, final payment dates)",
      "Define timeline for editing and final delivery"
    ],
    warnings: [
      "Always secure signed contracts before any work begins",
      "Clearly define intellectual property ownership to avoid disputes",
      "Specify editing and revision limits to prevent scope creep",
      "Require deposits to secure booking dates",
      "Include cancellation policies with specific deadlines",
      "Address what happens if weather or technical issues prevent filming",
      "Define payment terms clearly to avoid payment disputes",
      "Require location permits or property owner permission in writing"
    ],
    relatedDocuments: [
      { title: "Service Agreement", id: "service-agreement" },
      { title: "Independent Contractor Agreement", id: "independent-contractor-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "vendor-agreement": {
    title: "Vendor Agreement",
    shortDescription: "A contract between an event organizer and vendor outlining terms for selling products or services at an event.",
    fullDescription: "A Vendor Agreement is a legally binding contract designed to clearly establish the rights, obligations, and expectations between event organizers and vendors. This agreement defines vendor fees, space allocation, operating hours, insurance requirements, liability provisions, and dispute resolution procedures. A professionally drafted Vendor Agreement protects both parties from misunderstandings and provides legal enforceability for all agreed-upon terms.",
    whenToUse: [
      "You are hosting an event and allowing vendors to sell products or services",
      "You are a vendor participating in an exhibition, fair, or festival",
      "You want to avoid disputes over fees, space, or responsibilities",
      "You want a legally enforceable contract",
      "You need clear terms for multiple vendors at an event"
    ],
    keyTerms: [
      { term: "Vendor", definition: "The party providing products or services at the event." },
      { term: "Event Organizer", definition: "The party responsible for hosting and managing the event." },
      { term: "Vendor Fees", definition: "The amount charged to the vendor for participation rights and space." },
      { term: "Indemnity Clause", definition: "A provision where one party agrees to protect the other from legal liability." },
      { term: "Force Majeure", definition: "Unforeseen circumstances beyond parties' control that may prevent event execution." }
    ],
    tips: [
      "Clearly define what products or services the vendor can offer at the event",
      "Specify exact booth or space dimensions and location details",
      "Include setup and breakdown times to avoid confusion",
      "Define non-refundable vs. refundable portions of vendor fees",
      "Require proof of liability insurance before event participation",
      "Include clear payment terms and consequences for late payment",
      "Specify rules for vendor conduct and dress code if applicable",
      "Include provisions for vendor cancellation and refund policies"
    ],
    warnings: [
      "Always require proof of adequate liability insurance from vendors",
      "Clearly define what is NOT permitted to be sold or distributed",
      "Include indemnity clauses to protect against vendor liability issues",
      "Specify whether exclusive vendor categories are required",
      "Address parking, loading, and unloading procedures clearly",
      "Include provisions for removing non-compliant vendors",
      "Specify what happens if vendor damages event property",
      "Require vendors to comply with all local regulations and permits"
    ],
    relatedDocuments: [
      { title: "Event Agreement", id: "event-agreement" },
      { title: "Service Agreement", id: "service-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "roommate-release-agreement": {
    title: "Roommate Release Agreement",
    shortDescription: "A legally binding document releasing a roommate from shared lease obligations when they move out.",
    fullDescription: "A Roommate Release Agreement is a legally binding document used when one roommate moves out of a shared rental property and the remaining roommate(s) agree to take over all responsibilities under the lease. This agreement ensures that the departing roommate is formally released from future financial obligations, including rent, utilities, and liability for property damage.",
    whenToUse: [
      "You are a roommate moving out while other roommates continue occupying the property",
      "One of your roommates is leaving and you've agreed to remove them from lease liability",
      "You want a written, legally enforceable record protecting all parties",
      "You need to formally release a departing roommate from financial obligations"
    ],
    keyTerms: [
      { term: "Releasing Party", definition: "The roommate being released from the lease and all future obligations." },
      { term: "Remaining Roommate(s)", definition: "Those who assume full responsibility for the lease." },
      { term: "Security Deposit", definition: "How the departing roommate's share is divided or refunded." },
      { term: "Landlord Approval", definition: "Often required to fully release the departing roommate from liability." }
    ],
    tips: [
      "Get landlord approval to fully protect the departing roommate",
      "Document the condition of shared spaces before departure",
      "Settle all outstanding bills and damages before signing",
      "Keep signed copies for all parties",
      "Consider a lease amendment if required by the landlord"
    ],
    warnings: [
      "May require landlord consent for full release",
      "Without landlord signature, departing roommate may still be liable to landlord",
      "Remaining tenants assume full responsibility for lease compliance",
      "Departing roommate should ensure no unpaid rent or damages exist"
    ],
    relatedDocuments: [
      { title: "Roommate Agreement", id: "roommate-agreement" },
      { title: "Lease Agreement", id: "lease-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "VacationLeaseForm": {
    title: "Vacation Rental Agreement",
    shortDescription: "A short-term tenancy agreement outlining the rights and responsibilities of both the property owner and the renter for stays lasting a few days or weeks.",
    fullDescription: "A Vacation Rental Agreement is a short-term tenancy agreement that outlines the rights and responsibilities of both the property owner and the renter for stays lasting a few days or weeks. This agreement ensures clarity regarding rental duration, payment terms and deposits, check-in and check-out procedures, and house rules (pets, smoking, noise). Using the best format Vacation Rental Agreement reduces disputes and protects both parties by establishing clear expectations and legal frameworks for short-term vacation rentals.",
    whenToUse: [
      "Renting out a vacation home or Airbnb-style property",
      "Offering short-term rentals (daily, weekly, monthly)",
      "Renting part of your home to temporary guests",
      "Managing multiple rental properties",
      "You want clarity regarding rental terms and guest responsibilities"
    ],
    keyTerms: [
      { term: "Rental Duration", definition: "The specific check-in and check-out dates for the vacation rental period." },
      { term: "Security Deposit", definition: "Money held to cover damages or breaches, typically refunded after checkout." },
      { term: "House Rules", definition: "Policies governing guest behavior including pets, smoking, noise, and occupancy limits." },
      { term: "Check-in/Check-out", definition: "Specific times and procedures for guest arrival and departure." },
      { term: "Occupancy Limit", definition: "Maximum number of guests allowed at the property." }
    ],
    tips: [
      "Clearly define all rental terms before guests arrive",
      "Include comprehensive house rules and guest policies",
      "Specify payment terms, deposits, and cancellation policies",
      "Detail cleaning responsibilities and maintenance expectations",
      "List all amenities, furnishings, and utilities included",
      "Include check-in/check-out procedures and key access details",
      "Require guest identification and emergency contact information",
      "Document property condition with photos before each guest arrives"
    ],
    warnings: [
      "A Vacation Rental Agreement is legally binding once accepted by both parties",
      "Clearly define all fees including deposits, cleaning fees, and late fees",
      "Include cancellation deadlines with specific refund percentages",
      "Specify consequences for exceeding occupancy limits or violating house rules",
      "Include liability waivers for injuries or property damage",
      "Address what constitutes normal wear vs. damage requiring deposit deductions",
      "Verify guest age of majority and obtain ID verification",
      "Include provisions for immediate eviction due to illegal activities"
    ],
    relatedDocuments: [
      { title: "Residential Lease Agreement", id: "lease-agreement" },
      { title: "Sublease Agreement", id: "sublease" }
    ],
    estimatedTime: "20-30 minutes"
  },
  "offer-to-lease": {
    title: "Offer to Lease Agreement",
    shortDescription: "A preliminary legal document outlining essential terms proposed by a tenant to lease commercial property from a landlord.",
    fullDescription: "An Offer to Lease Agreement is a preliminary legal document used when a tenant proposes to lease commercial property from a landlord. This agreement outlines the essential terms that will later form part of the final commercial lease, helping both parties reach clarity before signing a formal tenancy contract. When your business is ready to move into professional or commercial space, an Offer to Lease is the first and most important step. It establishes the foundation for the formal lease and ensures that tenant and landlord are aligned on key issues such as rent, permitted use, possession, alterations, and compliance requirements. An Offer to Lease Agreement is legally binding once accepted, making it critical for commercial negotiations.",
    whenToUse: [
      "You want to make a formal offer to lease commercial property",
      "You need to outline core lease terms before signing a final commercial lease",
      "You are negotiating terms and making offers or counter-offers",
      "You want to establish clarity before landlord responsibilities are finalized",
      "You need to identify landlord obligations for repairs, compliance, or utilities"
    ],
    keyTerms: [
      { term: "Base Rent", definition: "The primary monthly or annual rent payment for the commercial space." },
      { term: "Tenant Improvements", definition: "Modifications and improvements made to the property specifically for the tenant's business use." },
      { term: "Permitted Use", definition: "The specific business purposes and activities allowed in the commercial space." },
      { term: "Lease Commencement Date", definition: "The date when the tenant can take possession and begin using the property." },
      { term: "Security Deposit", definition: "Money held by landlord to cover damages or unpaid rent at lease end." }
    ],
    tips: [
      "Negotiate all key commercial terms upfront to avoid disputes later",
      "Clearly define permitted use to prevent future conflicts",
      "Include specific contingencies for inspections and property condition",
      "Clarify who pays for tenant improvements and any allowances provided",
      "Define maintenance and repair responsibilities clearly",
      "Outline compliance requirements relevant to your business",
      "Specify how operating expenses and utilities will be handled",
      "Include flexibility options such as renewal terms or expansion rights"
    ],
    warnings: [
      "An Offer to Lease becomes legally binding once accepted by both parties",
      "Carefully review all proposed terms before signing",
      "Watch for vague permitted use language that may restrict operations",
      "Clarify all financial obligations including rent and operating expenses",
      "Understand maintenance responsibilities to avoid unexpected costs",
      "Be aware of contingencies that could delay lease commencement",
      "Confirm alteration permissions before planning improvements",
      "Consult a commercial real estate attorney before signing"
    ],
    relatedDocuments: [
      { title: "Commercial Lease Agreement", id: "commercial-lease-agreement" },
      { title: "Co-Tenancy Agreement", id: "co-tenancy-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "physician-services-agreement": {
    title: "Physician Services Agreement",
    shortDescription: "A contract between a healthcare facility and a physician.",
    fullDescription: "A Physician Services Agreement outlines duties, compensation, and legal obligations between a healthcare facility and a physician, ensuring HIPAA compliance and defining independent contractor status.",
    whenToUse: ["Hiring physicians for a practice", "Hospital physician contracts", "Locum tenens arrangements"],
    keyTerms: [
      { term: "Compensation Structure", definition: "Salary, bonuses, and payment terms." },
      { term: "On-Call Duties", definition: "Requirements for after-hours availability." }
    ],
    tips: ["Ensure HIPAA compliance provisions", "Define malpractice insurance requirements", "Clarify non-compete restrictions"],
    warnings: ["Must comply with Stark Law and Anti-Kickback regulations", "Verify licensure requirements"],
    estimatedTime: "30-45 minutes"
  },
 
  "unbundled-legal-services-agreement": {
    title: "Unbundled Legal Services Agreement",
    shortDescription: "A contract between an attorney and client outlining limited legal representation and specific services provided.",
    fullDescription: "An Unbundled Legal Services Agreement (also known as a limited scope representation agreement) is a legally binding contract that clearly defines limited legal representation between an attorney and a client. This type of agreement allows lawyers to offer specific legal services without taking on full representation, while clients only pay for the services they actually need. It clearly outlines what the lawyer will and will not do, helping both parties avoid misunderstandings.",
    whenToUse: [
      "You are an attorney offering limited legal services",
      "You are a client seeking help with only part of a legal matter",
      "You want to avoid full-service legal fees",
      "You manage a law firm providing limited-scope representation",
      "Providing consultations, document review, drafting services, or legal coaching"
    ],
    keyTerms: [
      { term: "Limited Scope Representation", definition: "Legal services covering only specific aspects of a legal matter, with clearly defined boundaries." },
      { term: "Scope of Services", definition: "The specific legal services the attorney agrees to provide as outlined in the contract." },
      { term: "Unbundled Services", definition: "Breaking down legal services into component parts so clients pay only for what they need." },
      { term: "Independent Contractor", definition: "Status clarifying the attorney is providing limited services, not full legal representation." },
      { term: "Scope Creep", definition: "When services expand beyond the original agreement without additional compensation or approval." }
    ],
    tips: [
      "Be extremely specific about what services are included and excluded",
      "Define payment terms clearly, including rates and when payments are due",
      "Establish clear communication expectations and response times",
      "Include a termination clause specifying how either party can end the engagement",
      "Address document retention and return of client materials",
      "Include dispute resolution procedures to avoid costly litigation",
      "Ensure compliance with your state bar's rules on limited scope representation",
      "Document all changes or expansions to the original scope in writing"
    ],
    warnings: [
      "Without this agreement, both parties risk unclear expectations, delayed work, and legal disputes",
      "Clearly define what the attorney will NOT do to avoid implied full representation",
      "Address conflicts of interest before engaging in limited representation",
      "Include confidentiality and ethical provisions required by your state bar",
      "Define the client's responsibilities and what they must handle independently",
      "Document all communications regarding scope to prevent scope creep disputes"
    ],
    relatedDocuments: [
      { title: "Legal Services Agreement", id: "legal-services-agreement" },
      { title: "Independent Contractor Agreement", id: "independent-contractor-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "attorney-engagement-letter": {
    title: "Attorney Engagement Letter",
    shortDescription: "A formal agreement between attorney and client that establishes the terms of legal representation, including scope of services, fees, billing, and rights/obligations.",
    fullDescription: "An Attorney Engagement Letter is a formal agreement used by lawyers and law firms to confirm the terms under which legal services will be provided to a client. This document clearly explains the scope of legal services, the responsibilities of the attorney and client, billing terms and fee structure, duration of the engagement, termination rights, and legal protections for both parties. Using a properly drafted Attorney Engagement Agreement is considered best legal practice, ensuring clarity and professionalism. This agreement helps establish transparency and protects both sides from disputes or misunderstandings.",
    whenToUse: [
      "A lawyer is providing legal services to a client",
      "A law firm is onboarding a new client",
      "Legal services involve fees or retainers",
      "The scope of work needs to be clearly defined",
      "You want written proof of the attorney-client relationship"
    ],
    keyTerms: [
      { term: "Scope of Services", definition: "The specific legal services the attorney will provide, clearly outlined so there's no misunderstanding about what is and isn't included." },
      { term: "Hourly Rate", definition: "The agreed-upon fee charged per hour of attorney work, typically ranging from $200-$500+ depending on experience and practice area." },
      { term: "Flat Fee", definition: "A fixed amount charged for specific legal services or matters, regardless of how many hours are actually spent." },
      { term: "Retainer", definition: "Advance payment made to the attorney, held in trust and drawn down as services are provided." },
      { term: "Billing Terms", definition: "The agreed-upon schedule for billing and payment, such as monthly invoices or payment due upon receipt." }
    ],
    tips: [
      "Read the engagement letter carefully before signing and ask questions about anything unclear",
      "Understand the fee structure completely - know the hourly rate, what services are included, and estimated total costs",
      "Clarify who will be handling your case and ask about communication methods and response times",
      "Ask about billing practices - how often you'll be billed, what expenses are included, and when payment is due",
      "Confirm what legal services are excluded or not covered by the engagement letter",
      "Ask about the retainer - how much is required, how it's used, and what happens to unused retainer funds",
      "Understand the term of the engagement - is it for a specific matter or ongoing representation?",
      "Request estimates or range of total costs if possible to help with budgeting"
    ],
    warnings: [
      "Always have a written signed engagement letter before starting legal representation",
      "Never start representation without understanding the fee structure and total cost implications",
      "Watch out for vague language about services - ensure scope is clearly defined and specific",
      "Clarify all retainer requirements and restrictions before paying any money",
      "Be aware of all potential costs beyond hourly rates - filing fees, court costs, and other expenses add up",
      "Understand termination provisions - some agreements may have penalties for early termination",
      "Confirm conflicts of interest - ensure the attorney can legally represent you",
      "Be cautious about open-ended retainers - ensure there are limits on costs and regular billing"
    ],
    relatedDocuments: [
      { title: "Power of Attorney", id: "power-of-attorney" },
      { title: "Service Agreement", id: "service-agreement" }
    ],
    estimatedTime: "15-20 minutes"
  },
  "child-care-auth": {
    title: "Child Care Authorization Agreement",
    shortDescription: "Authorizes a caregiver to make decisions for your child in your absence.",
    fullDescription: "A Child Care Authorization Agreement grants temporary authority to a caregiver to make medical, educational, and daily care decisions for your child when you cannot be reached.",
    whenToUse: ["Traveling without children", "Emergency backup care arrangements", "Grandparent or relative caregiving"],
    keyTerms: [
      { term: "Caregiver", definition: "Person authorized to care for the child." },
      { term: "Medical Authorization", definition: "Permission to seek medical treatment." }
    ],
    tips: ["Include all emergency contacts", "Specify any medical conditions or allergies", "Update regularly"],
    warnings: ["Not a substitute for legal guardianship", "May not be valid for extended periods"],
    estimatedTime: "10-15 minutes"
  },
  "divorce-settlement-agreement": {
    title: "Divorce Settlement Agreement",
    shortDescription: "Documents agreed-upon terms for division of assets, debts, and responsibilities.",
    fullDescription: "A Divorce Settlement Agreement outlines how divorcing spouses will divide property, debts, and handle custody, support, and other matters. It becomes legally binding when approved by the court.",
    whenToUse: ["Uncontested divorce", "Mediated settlement", "Mutual agreement on divorce terms"],
    keyTerms: [
      { term: "Marital Property", definition: "Assets acquired during marriage." },
      { term: "Alimony/Spousal Support", definition: "Financial support paid to a former spouse." }
    ],
    tips: ["Full financial disclosure is critical", "Consider tax implications", "Consult with an attorney"],
    warnings: ["Must be approved by a court", "Changes require court modification"],
    estimatedTime: "45-60 minutes"
  },
  "sublease": {
    title: "Sublease Agreement",
    shortDescription: "Allows a tenant to rent all or part of their rented space to another person.",
    fullDescription: "A Sublease Agreement permits the original tenant to sublet the rental property to a subtenant while remaining responsible to the landlord for the original lease terms.",
    whenToUse: ["Relocating temporarily", "Reducing housing costs", "Vacation rental of your unit"],
    keyTerms: [
      { term: "Sublessor", definition: "Original tenant who is subletting." },
      { term: "Sublessee", definition: "Person renting from the original tenant." }
    ],
    tips: ["Get landlord permission first", "Screen subtenants carefully", "Collect a security deposit"],
    warnings: ["Original tenant remains liable", "Must comply with original lease"],
    estimatedTime: "20-25 minutes"
  },
  "business-plan": {
    title: "Business Plan",
    shortDescription: "A comprehensive document outlining business goals, strategies, and financial projections.",
    fullDescription: "A Business Plan describes your business concept, market analysis, competitive advantages, marketing strategy, operational plans, and financial projections to guide your venture and attract investors.",
    whenToUse: ["Starting a new business", "Seeking funding or investors", "Strategic planning"],
    keyTerms: [
      { term: "Executive Summary", definition: "Overview of the entire business plan." },
      { term: "Financial Projections", definition: "Forecasts of revenue, expenses, and profitability." }
    ],
    tips: ["Be realistic with projections", "Research your market thoroughly", "Update regularly"],
    warnings: ["Projections are estimates only", "Market conditions may change"],
    estimatedTime: "60-90 minutes"
  },
  "buy-sell-agreement": {
    title: "Buy-Sell Agreement",
    shortDescription: "Governs what happens to ownership when an owner leaves the business.",
    fullDescription: "A Buy-Sell Agreement establishes terms for buying out a departing owner's interest due to death, disability, retirement, or other triggering events, protecting remaining owners and providing fair value.",
    whenToUse: ["Forming a partnership", "Starting a business with co-owners", "Succession planning"],
    keyTerms: [
      { term: "Triggering Event", definition: "Circumstances that activate the buy-sell." },
      { term: "Valuation Method", definition: "How the business value is determined." }
    ],
    tips: ["Fund with life insurance", "Update valuations regularly", "Define clear triggering events"],
    warnings: ["Underfunded agreements can cause disputes", "Tax implications apply"],
    estimatedTime: "30-45 minutes"
  },
  "corporate-bylaws": {
    title: "Corporate Bylaws",
    shortDescription: "Internal rules governing how a corporation operates.",
    fullDescription: "Corporate Bylaws establish the governance structure, meeting procedures, officer duties, shareholder rights, and operational procedures for running a corporation.",
    whenToUse: ["Incorporating a business", "Restructuring corporate governance", "Updating outdated bylaws"],
    keyTerms: [
      { term: "Board of Directors", definition: "Elected body overseeing the corporation." },
      { term: "Quorum", definition: "Minimum attendance required for valid meetings." }
    ],
    tips: ["Align with state law requirements", "Keep bylaws updated", "Ensure all directors have copies"],
    warnings: ["Must comply with state corporate law", "Amendments may require board approval"],
    estimatedTime: "45-60 minutes"
  },
  "EmploymentAgreement": {
    title: "Employment Agreement",
    shortDescription: "Formal contract between employer and employee defining work terms.",
    fullDescription: "An Employment Agreement specifies compensation, benefits, job duties, termination conditions, confidentiality obligations, and other terms of the employment relationship.",
    whenToUse: ["Hiring key employees", "Executive positions", "Specialized roles"],
    keyTerms: [
      { term: "At-Will Employment", definition: "Either party can end employment at any time." },
      { term: "Non-Compete", definition: "Restrictions on working for competitors." }
    ],
    tips: ["Clearly define job responsibilities", "Include confidentiality provisions", "Specify termination procedures"],
    warnings: ["Non-compete enforceability varies by state", "Must comply with labor laws"],
    estimatedTime: "25-35 minutes"
  },
  "gift-affidavit": {
    title: "Gift Affidavit",
    shortDescription: "A sworn statement declaring a transfer of property or money is a gift.",
    fullDescription: "A Gift Affidavit legally documents that a transfer of money, property, or other assets was given as a gift with no expectation of repayment or return.",
    whenToUse: ["Down payment assistance", "Vehicle transfers between family", "Large monetary gifts"],
    keyTerms: [
      { term: "Donor", definition: "Person giving the gift." },
      { term: "Donee", definition: "Person receiving the gift." }
    ],
    tips: ["Keep records of the transfer", "Consider gift tax implications", "Have the document notarized"],
    warnings: ["IRS gift tax rules may apply", "Cannot be used to avoid creditors"],
    estimatedTime: "10-15 minutes"
  },
  "financial-support-affidavit": {
    title: "Affidavit of Financial Support",
    shortDescription: "A sworn statement of your ability to provide financial support.",
    fullDescription: "An Affidavit of Financial Support documents your financial condition and commitment to support another person, often used for immigration, education, or loan applications.",
    whenToUse: ["Immigration sponsorship", "Student visa applications", "Loan co-signing"],
    keyTerms: [
      { term: "Sponsor", definition: "Person providing financial support." },
      { term: "Beneficiary", definition: "Person receiving support." }
    ],
    tips: ["Include supporting financial documents", "Be accurate with income information", "Have notarized"],
    warnings: ["Creates legal obligation", "False statements have legal consequences"],
    estimatedTime: "15-20 minutes"
  },
  "eviction-notice": {
    title: "Eviction Notice",
    shortDescription: "Formal notice to a tenant to vacate the rental property.",
    fullDescription: "An Eviction Notice is the first legal step in the eviction process, notifying a tenant of lease violations or the landlord's intent to terminate the tenancy.",
    whenToUse: ["Non-payment of rent", "Lease violations", "End of lease term"],
    keyTerms: [
      { term: "Cure Period", definition: "Time allowed to fix the violation." },
      { term: "Notice Period", definition: "Required days before eviction can proceed." }
    ],
    tips: ["Follow state-specific requirements", "Keep proof of delivery", "Document all violations"],
    warnings: ["Improper notice invalidates eviction", "Self-help eviction is illegal"],
    estimatedTime: "15-20 minutes"
  },
  "production-agreement": {
    title: "Production Agreement",
    shortDescription: "Contract for manufacturing or producing goods.",
    fullDescription: "A Production Agreement establishes terms for manufacturing products, including specifications, quantities, timelines, quality standards, and pricing.",
    whenToUse: ["Outsourcing manufacturing", "Product development partnerships", "OEM arrangements"],
    keyTerms: [
      { term: "Specifications", definition: "Technical requirements for the product." },
      { term: "Lead Time", definition: "Time from order to delivery." }
    ],
    tips: ["Define quality control procedures", "Include intellectual property protections", "Specify inspection rights"],
    warnings: ["Quality issues can be costly", "Include termination provisions"],
    estimatedTime: "30-45 minutes"
  },
  "ConstructionContractForm": {
    title: "Construction Contract",
    shortDescription: "Agreement for construction or renovation work.",
    fullDescription: "A Construction Contract outlines the scope of work, materials, timeline, payment terms, and responsibilities for construction or renovation projects.",
    whenToUse: ["Home renovations", "New construction", "Commercial build-outs"],
    keyTerms: [
      { term: "Change Order", definition: "Modification to the original scope." },
      { term: "Substantial Completion", definition: "Project usable for intended purpose." }
    ],
    tips: ["Get detailed specifications", "Include warranty provisions", "Require proof of insurance"],
    warnings: ["Ensure contractor is licensed", "Get permits before starting"],
    estimatedTime: "30-40 minutes"
  },
  "affidavit-general": {
    title: "General Affidavit",
    shortDescription: "A written and notarized sworn statement declaring facts under oath.",
    fullDescription: "A General Affidavit is a legal document where the affiant (person making the statement) swears under oath that certain facts are true. It can be used for various purposes including court proceedings, immigration matters, property verification, and official declarations.",
    whenToUse: ["Court proceedings requiring sworn testimony", "Immigration applications", "Property or identity verification", "Insurance claims", "Business transactions requiring sworn statements"],
    keyTerms: [
      { term: "Affiant", definition: "The person making the sworn statement." },
      { term: "Notarization", definition: "Official certification by a notary public." },
      { term: "Perjury", definition: "Crime of lying under oath." }
    ],
    tips: ["Be specific and accurate with all facts", "Include all relevant details", "Have the document notarized promptly", "Keep a copy for your records"],
    warnings: ["False statements constitute perjury", "Must be signed in presence of notary", "Some jurisdictions have specific requirements"],
    estimatedTime: "15-20 minutes"
  },
  "affidavit-character": {
    title: "Affidavit of Character",
    shortDescription: "A formal legal document providing a sworn character reference.",
    fullDescription: "An Affidavit of Character is a sworn statement attesting to someone's good character, moral standing, and reputation. It is commonly used in court proceedings, immigration cases, custody disputes, and professional licensing applications.",
    whenToUse: ["Court sentencing hearings", "Immigration visa applications", "Child custody proceedings", "Professional licensing", "Adoption proceedings"],
    keyTerms: [
      { term: "Character Witness", definition: "Person attesting to someone's character." },
      { term: "Personal Knowledge", definition: "First-hand knowledge of the subject." },
      { term: "Reputation", definition: "General opinion held about someone in the community." }
    ],
    tips: ["Provide specific examples of good character", "State how long you've known the person", "Be honest and objective", "Include your credentials or relationship"],
    warnings: ["Must be based on personal knowledge", "False statements are perjury", "May be subject to cross-examination"],
    estimatedTime: "20-25 minutes"
  },
  "affidavit-ownership": {
    title: "Affidavit of Ownership",
    shortDescription: "Formally declares ownership of property or assets under oath.",
    fullDescription: "An Affidavit of Ownership is a sworn legal document that formally declares a person's ownership of specific property, assets, or items. It is used when official documentation is lost, unavailable, or to support title transfers and legal claims.",
    whenToUse: ["Title transfers without original documents", "Insurance claims for lost items", "Estate and probate matters", "Vehicle registration issues", "Real estate transactions"],
    keyTerms: [
      { term: "Title", definition: "Legal right to ownership of property." },
      { term: "Encumbrance", definition: "Claim or lien against property." },
      { term: "Chain of Title", definition: "History of property ownership." }
    ],
    tips: ["Include detailed property descriptions", "List any supporting documentation", "Explain how you acquired the property", "Include identifying numbers (VIN, serial numbers)"],
    warnings: ["False claims are criminal fraud", "May require additional verification", "Does not replace official title documents"],
    estimatedTime: "15-25 minutes"
  },
  "healthcare-poa": {
    title: "Healthcare Power of Attorney",
    shortDescription: "Authorizes an agent to make medical decisions on your behalf.",
    fullDescription: "A Healthcare Power of Attorney (HCPOA) is a legal document that designates a trusted person (healthcare agent) to make medical decisions for you if you become incapacitated and cannot make decisions yourself. It includes directives about life support, organ donation, and treatment preferences.",
    whenToUse: ["Advance care planning", "Before major surgery", "Diagnosis of serious illness", "General estate planning", "As part of an advance directive package"],
    keyTerms: [
      { term: "Healthcare Agent", definition: "Person authorized to make medical decisions." },
      { term: "Incapacity", definition: "Inability to make or communicate decisions." },
      { term: "Life-Sustaining Treatment", definition: "Medical interventions that prolong life." },
      { term: "HIPAA Authorization", definition: "Permission to access medical records." }
    ],
    tips: ["Discuss your wishes with your agent", "Provide copies to doctors and hospitals", "Review and update periodically", "Consider naming an alternate agent"],
    warnings: ["Requirements vary by state", "Agent cannot override valid advance directives", "Some decisions may be excluded by law"],
    estimatedTime: "25-35 minutes"
  },
  "vehicle-lease": {
    title: "Vehicle Lease Agreement",
    shortDescription: "Contract between vehicle owner and driver for leasing a vehicle.",
    fullDescription: "A Vehicle Lease Agreement establishes the terms and conditions for leasing a vehicle from its owner to a lessee (driver). It covers monthly payments, mileage limits, insurance requirements, maintenance responsibilities, and return conditions.",
    whenToUse: ["Private vehicle leasing", "Company car arrangements", "Fleet vehicle management", "Ride-share vehicle leases", "Family vehicle sharing agreements"],
    keyTerms: [
      { term: "Lessor", definition: "Vehicle owner leasing the vehicle." },
      { term: "Lessee", definition: "Person leasing/renting the vehicle." },
      { term: "Mileage Allowance", definition: "Maximum miles permitted annually." },
      { term: "Excess Mileage Fee", definition: "Charge for miles over the limit." }
    ],
    tips: ["Document vehicle condition at start", "Verify insurance coverage", "Understand all fee structures", "Keep maintenance records"],
    warnings: ["Lessee is liable for damages", "Exceeding mileage incurs fees", "Early termination may have penalties"],
    estimatedTime: "20-30 minutes"
  },
  "co-tenancy-agreement": {
    title: "Co-Tenancy Agreement",
    shortDescription: "A legally binding contract defining rights and responsibilities between co-tenants sharing a rental property.",
    fullDescription: "A Co-Tenancy Agreement is a written contract used when two or more individuals rent the same property together. This agreement clearly defines the rights, duties, and responsibilities of each co-tenant, helping to prevent disputes and misunderstandings during the tenancy. It supplements the main lease by setting out how rent, utilities, repairs, deposits, and household rules are handled between the co-tenants themselves.",
    whenToUse: ["You are about to rent a property with one or more people", "You are adding a new roommate to an existing tenancy", "You want to avoid disputes over rent, utilities, or damages", "You want written rules to govern shared living"],
    keyTerms: [
      { term: "Co-Tenant", definition: "Individuals sharing the same rental property." },
      { term: "Joint and Several Liability", definition: "Each co-tenant is responsible for the full rent obligation." },
      { term: "Security Deposit", definition: "Refundable amount held as guarantee against damages." },
      { term: "Common Areas", definition: "Shared spaces like kitchen, bathroom, and living room." }
    ],
    tips: ["Clearly allocate rent and utility payments", "Define responsibility for repairs and damages", "Establish household rules in writing", "Address security deposit contributions upfront", "Specify procedures when a co-tenant moves out"],
    warnings: ["Does not replace your landlord's lease agreement", "All co-tenants should sign the agreement", "Must comply with local landlord-tenant laws", "Joint liability means you can be held responsible for other co-tenants' failures"],
    relatedDocuments: [{ title: "Roommate Agreement", id: "roommate-agreement" }, { title: "Lease Agreement", id: "lease-agreement" }],
    estimatedTime: "20-30 minutes"
  },
  "cotenancyagreement": {
    title: "Co-Tenancy Agreement",
    shortDescription: "A legally binding contract defining rights and responsibilities between co-tenants sharing a rental property.",
    fullDescription: "A Co-Tenancy Agreement is a written contract used when two or more individuals rent the same property together. This agreement clearly defines the rights, duties, and responsibilities of each co-tenant, helping to prevent disputes and misunderstandings during the tenancy. It supplements the main lease by setting out how rent, utilities, repairs, deposits, and household rules are handled between the co-tenants themselves.",
    whenToUse: ["You are about to rent a property with one or more people", "You are adding a new roommate to an existing tenancy", "You want to avoid disputes over rent, utilities, or damages", "You want written rules to govern shared living"],
    keyTerms: [
      { term: "Co-Tenant", definition: "Individuals sharing the same rental property." },
      { term: "Joint and Several Liability", definition: "Each co-tenant is responsible for the full rent obligation." },
      { term: "Security Deposit", definition: "Refundable amount held as guarantee against damages." },
      { term: "Common Areas", definition: "Shared spaces like kitchen, bathroom, and living room." }
    ],
    tips: ["Clearly allocate rent and utility payments", "Define responsibility for repairs and damages", "Establish household rules in writing", "Address security deposit contributions upfront", "Specify procedures when a co-tenant moves out"],
    warnings: ["Does not replace your landlord's lease agreement", "All co-tenants should sign the agreement", "Must comply with local landlord-tenant laws", "Joint liability means you can be held responsible for other co-tenants' failures"],
    relatedDocuments: [{ title: "Roommate Agreement", id: "roommate-agreement" }, { title: "Lease Agreement", id: "lease-agreement" }],
    estimatedTime: "20-30 minutes"
  }
};

const getDefaultDocumentInfo = (documentId: string): DocumentInfo => ({
  title: documentId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  shortDescription: "Complete this legal document to protect your interests.",
  fullDescription: "This document helps establish a formal agreement between parties.",
  whenToUse: ["When you need a formal written agreement"],
  keyTerms: [{ term: "Parties", definition: "Individuals or entities in this agreement." }],
  tips: ["Read all sections carefully before signing"],
  warnings: ["This document creates legal obligations"],
  estimatedTime: "15-25 minutes"
});

interface DocumentAboutSidebarProps {
  documentId: string;
  onNavigateToDocument?: (id: string) => void;
}

const DocumentAboutSidebar = ({ documentId, onNavigateToDocument }: DocumentAboutSidebarProps) => {
  const docInfo = documentInfoDatabase[documentId] || getDefaultDocumentInfo(documentId);
  
  return (
    <Card className="w-full lg:w-[38%] xl:w-[36%] flex-shrink-0 bg-white/95 backdrop-blur-sm border-orange-200/60 shadow-xl sticky top-4 overflow-hidden">
      {/* Rich Header with gradient and badge */}
      <CardHeader className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white rounded-t-lg pb-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDBMNDAgNDBIMHoiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center gap-2.5 text-xl font-bold">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              Document Guide
            </CardTitle>
            {docInfo.estimatedTime && (
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                <Clock className="h-3 w-3 mr-1" />
                {docInfo.estimatedTime}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg text-white/95 leading-tight">{docInfo.title}</h3>
          <p className="text-sm text-orange-100 mt-2 leading-relaxed">{docInfo.shortDescription}</p>
        </div>
      </CardHeader>
      
      {/* Scrollable Accordion Content */}
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-280px)] min-h-[400px]">
          <div className="p-4">
            <Accordion type="single" collapsible defaultValue="what-is-this" className="space-y-3">
              {/* What Is This Section */}
              <AccordionItem value="what-is-this" className="border border-gray-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-orange-50/50 to-white shadow-sm">
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-orange-50/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">What Is This Document?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pl-11 pt-2">
                    <p className="text-sm text-gray-600 leading-relaxed">{docInfo.fullDescription}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* When To Use Section */}
              <AccordionItem value="when-to-use" className="border border-gray-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50/50 to-white shadow-sm">
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-blue-50/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                      <Target className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">When To Use</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pl-11 pt-2 space-y-2.5">
                    {docInfo.whenToUse.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group/item">
                        <div className="mt-0.5 p-1 bg-green-100 rounded-full">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Key Terms & Definitions Section */}
              <AccordionItem value="key-terms" className="border border-gray-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50/50 to-white shadow-sm">
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-purple-50/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                      <Scale className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">Key Terms & Definitions</span>
                    <Badge variant="outline" className="ml-2 text-xs border-purple-200 text-purple-600 bg-purple-50">
                      {docInfo.keyTerms.length} terms
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pl-11 pt-2 space-y-3">
                    {docInfo.keyTerms.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200/50 hover:border-purple-200 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-2 mb-1">
                          <ChevronRight className="h-3.5 w-3.5 text-purple-500" />
                          <span className="font-semibold text-sm text-gray-800">{item.term}</span>
                        </div>
                        <p className="text-sm text-gray-600 pl-5">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Helpful Tips Section */}
              <AccordionItem value="tips" className="border border-gray-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-50/50 to-white shadow-sm">
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-emerald-50/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">Expert Tips & Best Practices</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pl-11 pt-2 space-y-2.5">
                    {docInfo.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 group/item">
                        <div className="mt-0.5 p-1 bg-yellow-100 rounded-full">
                          <Sparkles className="h-3.5 w-3.5 text-yellow-600" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Important Warnings Section */}
              <AccordionItem value="warnings" className="border border-red-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-red-50/50 to-white shadow-sm">
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-red-50/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">Important Warnings</span>
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {docInfo.warnings.length} items
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pl-11 pt-2 space-y-2.5">
                    {docInfo.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-3 p-2.5 bg-red-50 rounded-lg border border-red-100">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700 leading-relaxed">{warning}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Related Documents Section */}
              {docInfo.relatedDocuments && docInfo.relatedDocuments.length > 0 && (
                <AccordionItem value="related" className="border border-gray-200/60 rounded-xl overflow-hidden bg-gradient-to-r from-amber-50/50 to-white shadow-sm">
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-amber-50/80 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white shadow-md group-hover:shadow-lg transition-shadow">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-gray-800">Related Documents</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="pl-11 pt-2 space-y-2">
                      {docInfo.relatedDocuments.map((doc, index) => (
                        <button 
                          key={index} 
                          onClick={() => onNavigateToDocument?.(doc.id)} 
                          className="w-full flex items-center gap-3 p-3 text-sm text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all border border-orange-100 hover:border-orange-200 hover:shadow-sm text-left group/btn"
                        >
                          <FileText className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          <span className="font-medium">{doc.title}</span>
                          <ChevronRight className="h-4 w-4 ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
          
          {/* Footer Disclaimer */}
          <div className="p-4 mx-4 mb-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-gray-200 rounded-lg">
                <Gavel className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Legal Disclaimer</p>
                <p className="text-xs text-gray-400 leading-relaxed">This information is for general guidance only and does not constitute legal advice. Consult a licensed attorney for legal matters.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DocumentAboutSidebar;
