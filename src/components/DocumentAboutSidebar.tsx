import { useState } from "react";
import { ChevronDown, ChevronUp, Info, FileText, AlertCircle, CheckCircle, BookOpen, HelpCircle, Scale, Clock, Target, Sparkles, Gavel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    shortDescription: "Defines ownership structure and operating procedures for an LLC.",
    fullDescription: "An LLC Operating Agreement outlines the ownership and member duties of your LLC.",
    whenToUse: ["Forming a new LLC", "Adding or removing members"],
    keyTerms: [
      { term: "Member", definition: "An owner of the LLC." },
      { term: "Capital Contribution", definition: "Money or assets invested." }
    ],
    tips: ["Define each member capital contribution clearly"],
    warnings: ["Some states require an operating agreement"],
    estimatedTime: "30-45 minutes"
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
    shortDescription: "A document transferring ownership of personal property from seller to buyer.",
    fullDescription: "A Bill of Sale provides legal proof of the transfer of ownership of goods from one party to another.",
    whenToUse: ["Selling a vehicle", "Transferring equipment", "Private sales of personal property"],
    keyTerms: [
      { term: "As-Is", definition: "Buyer accepts the item in its current condition without warranties." },
      { term: "Warranty of Title", definition: "Seller guarantees they have the right to sell the item." }
    ],
    tips: ["Include serial numbers for valuable items", "Document the condition of the item", "Keep a copy for your records"],
    warnings: ["Some items require additional documentation (e.g., vehicle titles)", "May need notarization"],
    estimatedTime: "10-15 minutes"
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
    title: "Bartending Services Agreement",
    shortDescription: "A contract for bartending services at events.",
    fullDescription: "A Bartending Services Agreement establishes terms between an event host and bartender, covering duties, payment, alcohol liability, and service expectations for events.",
    whenToUse: ["Hiring bartenders for weddings", "Corporate event services", "Private party bartending"],
    keyTerms: [
      { term: "Event Date", definition: "The scheduled date of bartending service." },
      { term: "Service Fee", definition: "Compensation for bartending services." }
    ],
    tips: ["Specify hours of service", "Include alcohol liability provisions", "Define tip handling"],
    warnings: ["Ensure proper licensing requirements are met", "Consider liquor liability insurance"],
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
    shortDescription: "A contract for wedding planning services.",
    fullDescription: "A Wedding Planner Agreement establishes the relationship between a couple and their wedding planner, defining services, payment, and responsibilities for planning and coordinating the wedding.",
    whenToUse: ["Hiring a wedding planner", "Full or partial planning services", "Day-of coordination"],
    keyTerms: [
      { term: "Scope of Services", definition: "Specific planning tasks the planner will handle." },
      { term: "Vendor Coordination", definition: "Managing relationships with other wedding vendors." }
    ],
    tips: ["Define which services are included", "Set clear communication expectations", "Include a timeline of deliverables"],
    warnings: ["Ensure clear cancellation policies", "Define liability limits"],
    estimatedTime: "25-35 minutes"
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
    shortDescription: "A contract between an attorney and client for legal representation.",
    fullDescription: "A Legal Services Agreement formalizes the attorney-client relationship, defining scope of representation, fees, communication expectations, and ethical obligations.",
    whenToUse: ["Hiring an attorney", "Starting a legal case", "Ongoing legal advice"],
    keyTerms: [
      { term: "Scope of Representation", definition: "The specific legal matters the attorney will handle." },
      { term: "Attorney-Client Privilege", definition: "Confidentiality protection for communications." }
    ],
    tips: ["Clarify billing methods (hourly vs. flat fee)", "Understand what's included", "Keep copies of all communications"],
    warnings: ["Fee structures vary significantly", "Understand withdrawal procedures"],
    estimatedTime: "20-30 minutes"
  },
  "vendor-agreement": {
    title: "Vendor Agreement",
    shortDescription: "A contract between a business and its suppliers.",
    fullDescription: "A Vendor Agreement establishes terms for the supply of goods or services between a vendor and a business, including pricing, delivery, quality standards, and payment terms.",
    whenToUse: ["Engaging new suppliers", "Formalizing existing vendor relationships", "Event vendor contracts"],
    keyTerms: [
      { term: "Vendor", definition: "The party supplying goods or services." },
      { term: "Purchase Order", definition: "A document specifying items and quantities ordered." }
    ],
    tips: ["Define quality standards", "Include delivery timelines", "Specify return and refund policies"],
    warnings: ["Ensure proper insurance coverage", "Include termination provisions"],
    estimatedTime: "20-25 minutes"
  },
  "roommate-release-agreement": {
    title: "Roommate Release Agreement",
    shortDescription: "A formal agreement to release a roommate from shared lease obligations.",
    fullDescription: "A Roommate Release Agreement documents the termination of one roommate's obligations under a shared lease, including security deposit handling and liability release.",
    whenToUse: ["When a roommate is moving out early", "Releasing someone from lease obligations", "Transferring responsibility to remaining tenants"],
    keyTerms: [
      { term: "Releasing Party", definition: "The roommate being released from the lease." },
      { term: "Security Deposit", definition: "How the departing roommate's share is handled." }
    ],
    tips: ["Get landlord approval if required", "Document the condition of shared spaces", "Settle all outstanding bills before signing"],
    warnings: ["May require landlord consent", "Remaining tenants assume full responsibility"],
    estimatedTime: "15-20 minutes"
  },
  "offer-to-lease": {
    title: "Offer to Lease",
    shortDescription: "A formal proposal to lease commercial property with key terms.",
    fullDescription: "An Offer to Lease outlines proposed lease terms for commercial property, including rent, term length, signage rights, and tenant improvements before a formal lease is drafted.",
    whenToUse: ["Negotiating commercial lease terms", "Before signing a formal lease", "Proposing lease conditions to landlords"],
    keyTerms: [
      { term: "Base Rent", definition: "The primary monthly rent payment." },
      { term: "Tenant Improvements", definition: "Modifications made to the property for the tenant's use." }
    ],
    tips: ["Negotiate all key terms upfront", "Include contingencies for due diligence", "Clarify who pays for improvements"],
    warnings: ["May be binding once signed", "Consult a real estate attorney"],
    estimatedTime: "25-35 minutes"
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
  "real-estate-agent-agreement": {
    title: "Real Estate Agent Agreement",
    shortDescription: "An exclusive listing agreement with a real estate agent.",
    fullDescription: "A Real Estate Agent Agreement establishes the relationship between a property owner and agent for selling, leasing, or managing property, defining commission rates and exclusivity periods.",
    whenToUse: ["Listing property for sale", "Hiring an agent to find buyers", "Exclusive representation arrangements"],
    keyTerms: [
      { term: "Commission", definition: "Percentage of sale price paid to the agent." },
      { term: "Exclusivity Period", definition: "Duration during which only this agent can represent the property." }
    ],
    tips: ["Negotiate commission rates", "Understand exclusivity terms", "Define marketing responsibilities"],
    warnings: ["Exclusivity may limit your options", "Understand termination terms"],
    estimatedTime: "20-25 minutes"
  },
  "limited-scope-representation-agreement": {
    title: "Limited Scope Representation Agreement",
    shortDescription: "An agreement for specific unbundled legal services.",
    fullDescription: "A Limited Scope Representation Agreement allows attorneys and clients to define exactly which legal services will be provided, reducing costs while maintaining professional boundaries.",
    whenToUse: ["Need help with specific legal tasks only", "Document review assistance", "Limited court appearances"],
    keyTerms: [
      { term: "Unbundled Services", definition: "Specific legal tasks the attorney will perform." },
      { term: "Excluded Services", definition: "Legal matters the client will handle independently." }
    ],
    tips: ["Be clear about what's included and excluded", "Get everything in writing", "Understand your responsibilities"],
    warnings: ["Attorney only handles specified tasks", "You're responsible for excluded matters"],
    estimatedTime: "20-30 minutes"
  },
  "unbundled-legal-services-agreement": {
    title: "Unbundled Legal Services Agreement",
    shortDescription: "A contract for specific, discrete legal services.",
    fullDescription: "An Unbundled Legal Services Agreement defines terms for attorneys providing specific legal tasks rather than full representation, including automatic termination upon completion.",
    whenToUse: ["Hiring an attorney for specific tasks", "Self-represented litigants needing limited help", "Cost-effective legal assistance"],
    keyTerms: [
      { term: "Discrete Task", definition: "A specific, defined legal service." },
      { term: "Automatic Termination", definition: "Agreement ends when the specific task is completed." }
    ],
    tips: ["Define the scope precisely", "Understand what's not covered", "Keep copies of all work product"],
    warnings: ["Attorney relationship is limited", "No ongoing representation after task completion"],
    estimatedTime: "15-25 minutes"
  },
  "attorney-engagement-letter": {
    title: "Attorney Engagement Letter",
    shortDescription: "A formal letter establishing the attorney-client relationship.",
    fullDescription: "An Attorney Engagement Letter formalizes the representation agreement, outlining scope of work, fee structure (flat fee or hourly), and expectations for the attorney-client relationship.",
    whenToUse: ["Hiring an attorney", "Starting a new legal matter", "Formalizing ongoing representation"],
    keyTerms: [
      { term: "Flat Fee", definition: "A fixed amount for the entire representation." },
      { term: "Retainer", definition: "Advance payment against future services." }
    ],
    tips: ["Understand all fee structures", "Clarify communication expectations", "Keep a copy for your records"],
    warnings: ["Read fee terms carefully", "Understand withdrawal procedures"],
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

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-orange-50 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const DocumentAboutSidebar = ({ documentId, onNavigateToDocument }: DocumentAboutSidebarProps) => {
  const docInfo = documentInfoDatabase[documentId] || getDefaultDocumentInfo(documentId);
  return (
    <Card className="w-full lg:w-[32%] xl:w-[30%] flex-shrink-0 bg-white border-orange-200 shadow-lg sticky top-4">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5" />
          About This Document
        </CardTitle>
        {docInfo.estimatedTime && (
          <div className="flex items-center gap-1 text-orange-100 text-sm">
            <Clock className="h-4 w-4" />
            <span>Est. {docInfo.estimatedTime}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">{docInfo.title}</h3>
          <p className="text-sm text-gray-600">{docInfo.shortDescription}</p>
        </div>
        <div className="divide-y divide-gray-100">
          <CollapsibleSection title="What Is This?" icon={<HelpCircle className="h-4 w-4 text-orange-500" />} defaultOpen={true}>
            <p className="text-sm text-gray-600 leading-relaxed">{docInfo.fullDescription}</p>
          </CollapsibleSection>
          <CollapsibleSection title="When To Use" icon={<Target className="h-4 w-4 text-blue-500" />}>
            <ul className="space-y-2">
              {docInfo.whenToUse.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="Key Terms" icon={<Scale className="h-4 w-4 text-purple-500" />}>
            <div className="space-y-3">
              {docInfo.keyTerms.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2">
                  <div className="font-medium text-sm text-gray-800">{item.term}</div>
                  <div className="text-xs text-gray-600">{item.definition}</div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Helpful Tips" icon={<Info className="h-4 w-4 text-green-500" />}>
            <ul className="space-y-2">
              {docInfo.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="Important Warnings" icon={<AlertCircle className="h-4 w-4 text-red-500" />}>
            <ul className="space-y-2">
              {docInfo.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
          {docInfo.relatedDocuments && docInfo.relatedDocuments.length > 0 && (
            <CollapsibleSection title="Related Documents" icon={<FileText className="h-4 w-4 text-orange-500" />}>
              <div className="space-y-2">
                {docInfo.relatedDocuments.map((doc, index) => (
                  <button key={index} onClick={() => onNavigateToDocument?.(doc.id)} className="w-full flex items-center gap-2 p-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-left">
                    <FileText className="h-4 w-4" />
                    <span>{doc.title}</span>
                  </button>
                ))}
              </div>
            </CollapsibleSection>
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <Gavel className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500">This information is for general guidance only and does not constitute legal advice.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentAboutSidebar;
