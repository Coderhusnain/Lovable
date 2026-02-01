import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Clock, FileText, CheckCircle, ArrowLeft, AlertTriangle, Lightbulb, Scale, Clipboard, FileSignature } from 'lucide-react';

interface DocumentInfoLandingProps {
  title: string;
  description: string;
  category: string;
  onStart: () => void;
  onBack: () => void;
}

// --- COMPREHENSIVE DOCUMENT KNOWLEDGE BASE ---
const documentKnowledgeBase: Record<string, { 
  whatIsIt: string; 
  whenToUse: string; 
  keyProtections: string[];
  whatYouNeed: string[];
  estimatedTime: string;
}> = {
  "Vehicle Lease Agreement": {
    whatIsIt: "A Vehicle Lease Agreement is a legally binding contract between a vehicle owner (Lessor) and a person or business wishing to use the vehicle (Lessee). It outlines the specific terms under which the vehicle will be leased, including payment schedules, mileage limits, maintenance responsibilities, and conditions for return.",
    whenToUse: "Use this document when you want to lease your vehicle to another party for an extended period, whether for personal use, rideshare services, or commercial purposes. It's essential for protecting your asset while generating income.",
    keyProtections: ["Clear liability assignment for accidents and damages", "Defined mileage limits with overage penalties", "Security deposit terms and return conditions", "Insurance requirements and coverage specifications", "Early termination clauses and penalties"],
    whatYouNeed: ["Vehicle information (VIN, make, model, year)", "Lessor and Lessee full legal names and addresses", "Lease duration and payment terms", "Insurance policy details", "Current odometer reading"],
    estimatedTime: "10-15 minutes"
  },
  "Security Agreement": {
    whatIsIt: "A Security Agreement is a legal document that gives a lender (secured party) a security interest in specific personal property (collateral) owned by a borrower (debtor). If the borrower defaults on the loan, the lender has the legal right to seize and sell the collateral to recover the debt.",
    whenToUse: "Use this agreement when extending credit or making a loan where you want to secure repayment with specific assets. Common in business loans, equipment financing, vehicle purchases, and inventory financing.",
    keyProtections: ["Detailed description of collateral", "Default event definitions", "Remedies upon default", "Rights to inspect collateral", "Insurance requirements for collateral", "UCC filing provisions"],
    whatYouNeed: ["Debtor and secured party information", "Detailed collateral description", "Loan amount and terms", "Default conditions", "State where collateral is located"],
    estimatedTime: "12-18 minutes"
  },
  "Affidavit of Ownership": {
    whatIsIt: "An Affidavit of Ownership is a sworn legal statement declaring that you are the rightful owner of a specific piece of property, typically a vehicle, boat, or other titled asset. It's commonly used when original title documents are lost or during transfers of ownership.",
    whenToUse: "Use this document when you need to prove ownership without a title, when applying for a duplicate title, or when transferring ownership of untitled property. Often required by DMVs and licensing agencies.",
    keyProtections: ["Legal declaration under penalty of perjury", "Detailed property description", "Chain of ownership history", "Encumbrance disclosures", "Notary verification"],
    whatYouNeed: ["Full property description (VIN, serial numbers)", "Purchase documentation or bill of sale", "Previous owner information", "Your identification", "Notary public availability"],
    estimatedTime: "5-8 minutes"
  },
  "Medical Power of Attorney": {
    whatIsIt: "A Medical Power of Attorney (also called Healthcare Proxy) is a legal document that authorizes a trusted person (your healthcare agent) to make medical decisions on your behalf if you become incapacitated and cannot communicate your wishes to doctors.",
    whenToUse: "Every adult should have this document in place. Use it to ensure your healthcare preferences are honored during emergencies, surgeries, terminal illness, or any situation where you cannot speak for yourself.",
    keyProtections: ["Clearly defined agent authority", "HIPAA authorization", "End-of-life care preferences", "Organ donation wishes", "Mental health treatment directives", "Agent succession planning"],
    whatYouNeed: ["Healthcare agent's contact information", "Alternate agent information", "Your medical preferences", "Witness signatures", "Notary (in some states)"],
    estimatedTime: "8-12 minutes"
  },
  "Affidavit of Character": {
    whatIsIt: "An Affidavit of Character is a sworn declaration made by someone who knows you well, attesting to your moral character, trustworthiness, and reputation. It's a formal character reference used in legal proceedings, immigration cases, or professional licensing.",
    whenToUse: "Use this document when applying for immigration benefits, during custody disputes, for professional licensing applications, in criminal sentencing hearings, or when character evidence is required by a court or agency.",
    keyProtections: ["Sworn statement under penalty of perjury", "Specific examples of character", "Length and nature of relationship", "Professional observations", "Notarized verification"],
    whatYouNeed: ["Subject's full legal name", "Affiant's relationship to subject", "Specific character observations", "Duration of relationship", "Notary public availability"],
    estimatedTime: "6-10 minutes"
  },
  "General Affidavit": {
    whatIsIt: "A General Affidavit is a written sworn statement of fact that can be used as evidence in legal proceedings or to verify information for official purposes. The person making the statement (affiant) swears under penalty of perjury that the contents are true.",
    whenToUse: "Use this versatile document when you need to make a formal, sworn statement of fact for court proceedings, official applications, identity verification, or to document specific events or circumstances.",
    keyProtections: ["Legally binding sworn statement", "Admissible as evidence", "Penalty of perjury clause", "Notary verification", "Clear factual statements"],
    whatYouNeed: ["Specific facts to be attested", "Purpose of the affidavit", "Your identification", "Witness information (if required)", "Notary public availability"],
    estimatedTime: "5-8 minutes"
  },
  "Barter Agreement": {
    whatIsIt: "A Barter Agreement is a legal contract governing the exchange of goods or services between two parties without the use of money. It defines the specific items or services to be traded, their agreed values, delivery timelines, and quality standards.",
    whenToUse: "Use this agreement when trading services with other professionals, exchanging products with suppliers, or bartering assets. It provides legal protection and establishes clear expectations for both parties.",
    keyProtections: ["Fair value determination", "Quality standards and specifications", "Delivery timelines", "Dispute resolution", "Tax reporting obligations", "Warranty provisions"],
    whatYouNeed: ["Description of goods/services to be exchanged", "Agreed values for each item", "Delivery dates and methods", "Quality requirements", "Party contact information"],
    estimatedTime: "8-12 minutes"
  },
  "Sale of Goods Agreement": {
    whatIsIt: "A Sale of Goods Agreement is a contract for the sale and purchase of tangible, movable items (not real estate). It establishes the terms of the transaction including price, delivery, warranties, and remedies for breach.",
    whenToUse: "Use this document for any significant purchase or sale of physical goods, especially in business-to-business transactions, wholesale purchases, or when buying/selling used equipment or inventory.",
    keyProtections: ["Clear product specifications", "Price and payment terms", "Delivery and acceptance procedures", "Warranty provisions", "Risk of loss allocation", "Inspection rights"],
    whatYouNeed: ["Detailed product description", "Quantity and unit price", "Delivery address and terms", "Payment schedule", "Warranty requirements"],
    estimatedTime: "10-15 minutes"
  },
  "Referral Fee Agreement": {
    whatIsIt: "A Referral Fee Agreement is a contract where one party agrees to pay another for referring clients, customers, or business opportunities. It defines the referral process, fee structure, payment timing, and exclusivity arrangements.",
    whenToUse: "Use this agreement when establishing referral partnerships with other professionals, affiliate relationships, or when you want to compensate someone for bringing you new business.",
    keyProtections: ["Clear definition of qualifying referrals", "Fee calculation methodology", "Payment timeline", "Minimum performance thresholds", "Non-circumvention clauses", "Termination provisions"],
    whatYouNeed: ["Referrer and payee information", "Fee percentage or flat rate", "Qualifying referral criteria", "Payment terms", "Duration of agreement"],
    estimatedTime: "8-12 minutes"
  },
  "Product Distribution Agreement": {
    whatIsIt: "A Product Distribution Agreement governs the legal relationship between a supplier/manufacturer and a distributor who will sell their products. It covers territory rights, pricing, minimum orders, marketing obligations, and termination conditions.",
    whenToUse: "Use this agreement when appointing distributors for your products, entering into exclusive or non-exclusive distribution arrangements, or expanding your market reach through third-party resellers.",
    keyProtections: ["Exclusive or non-exclusive territory rights", "Minimum purchase commitments", "Pricing and discount structures", "Marketing and promotion obligations", "Intellectual property usage rights", "Termination and inventory return provisions"],
    whatYouNeed: ["Product specifications and pricing", "Territory definitions", "Minimum order quantities", "Marketing materials", "Distribution timeline"],
    estimatedTime: "15-20 minutes"
  },
  "Marketing Agreement": {
    whatIsIt: "A Marketing Agreement defines the terms between a business and a marketing professional or agency for promotional services. It covers scope of work, deliverables, compensation, intellectual property rights, and performance metrics.",
    whenToUse: "Use this agreement when hiring marketing agencies, freelance marketers, or influencers for promotional campaigns, branding projects, or ongoing marketing support.",
    keyProtections: ["Detailed scope of services", "Deliverable specifications", "Compensation and payment terms", "Intellectual property ownership", "Confidentiality provisions", "Performance benchmarks"],
    whatYouNeed: ["Marketing objectives", "Campaign specifications", "Budget and payment terms", "Brand guidelines", "Timeline and milestones"],
    estimatedTime: "12-15 minutes"
  },
  "Contract Extension Agreement": {
    whatIsIt: "A Contract Extension Agreement formally extends the duration of an existing contract without requiring a completely new agreement. It specifies the new end date, any modified terms, and confirms that all other provisions remain in effect.",
    whenToUse: "Use this document when both parties want to continue an existing contractual relationship beyond the original term, whether for employment, services, leases, or any ongoing business arrangement.",
    keyProtections: ["Clear reference to original contract", "New termination date", "Modified terms (if any)", "Confirmation of unchanged provisions", "Signature requirements"],
    whatYouNeed: ["Original contract details", "New extension period", "Any term modifications", "Party signatures", "Effective date"],
    estimatedTime: "5-8 minutes"
  },
  "Asset Purchase Agreement": {
    whatIsIt: "An Asset Purchase Agreement (APA) establishes the terms and conditions for purchasing specific assets of a business rather than the business entity itself. It allows buyers to select desired assets while potentially avoiding certain liabilities.",
    whenToUse: "Use this agreement when acquiring business assets such as equipment, inventory, intellectual property, customer lists, or real estate without buying the entire company.",
    keyProtections: ["Detailed asset schedule", "Purchase price allocation", "Representations and warranties", "Assumed vs. excluded liabilities", "Employee transition terms", "Non-compete provisions"],
    whatYouNeed: ["Complete asset list with values", "Business financial records", "Due diligence information", "Liability analysis", "Transition timeline"],
    estimatedTime: "20-30 minutes"
  },
  "Advertising Agency Agreement": {
    whatIsIt: "An Advertising Agency Agreement defines the relationship, scope of work, creative rights, and compensation between an advertising agency and their client. It covers campaign development, media buying, creative ownership, and performance expectations.",
    whenToUse: "Use this agreement when engaging an advertising agency for brand campaigns, media placement, creative development, or integrated marketing communications.",
    keyProtections: ["Scope of creative services", "Media buying authority", "Creative ownership rights", "Budget management", "Approval processes", "Performance metrics and reporting"],
    whatYouNeed: ["Campaign objectives", "Budget allocation", "Target audience details", "Brand guidelines", "Approval workflow"],
    estimatedTime: "15-20 minutes"
  },
  "Administrative Services Agreement": {
    whatIsIt: "An Administrative Services Agreement governs the provision of administrative, clerical, or back-office services between a professional service provider and a client. It covers duties, hours, confidentiality, and performance standards.",
    whenToUse: "Use this agreement when outsourcing administrative functions, hiring virtual assistants, or engaging administrative service companies for bookkeeping, scheduling, or office management.",
    keyProtections: ["Detailed service descriptions", "Hours and availability requirements", "Confidentiality obligations", "Data security measures", "Performance standards", "Termination procedures"],
    whatYouNeed: ["List of required services", "Working hours and schedule", "Communication protocols", "Confidential information types", "Compensation terms"],
    estimatedTime: "10-12 minutes"
  },
  "IT Service Agreement": {
    whatIsIt: "An IT Service Agreement defines the terms for Information Technology services, support, maintenance, and consulting between a provider and client. It typically includes service levels, response times, security requirements, and technical specifications.",
    whenToUse: "Use this agreement when engaging IT service providers for managed services, technical support, software development, network administration, or cybersecurity services.",
    keyProtections: ["Service level agreements (SLAs)", "Response time guarantees", "Data security and privacy", "System uptime requirements", "Disaster recovery provisions", "Intellectual property rights"],
    whatYouNeed: ["Technical requirements", "Service level expectations", "Security protocols", "Support hours", "Escalation procedures"],
    estimatedTime: "15-20 minutes"
  },
  "Fee Agreement": {
    whatIsIt: "A Fee Agreement defines the fees, billing rates, payment terms, and financial arrangements between a service provider (often attorneys or consultants) and their client. It ensures transparency about costs and payment expectations.",
    whenToUse: "Use this agreement at the start of any professional engagement where fees will be charged, including legal representation, consulting services, or any project-based work.",
    keyProtections: ["Clear fee structure", "Billing increments", "Payment schedule", "Expense policies", "Late payment consequences", "Dispute resolution"],
    whatYouNeed: ["Service provider rates", "Billing methodology", "Estimated total costs", "Payment terms", "Retainer requirements (if any)"],
    estimatedTime: "8-10 minutes"
  },
  "Business Sale Agreement": {
    whatIsIt: "A Business Sale Agreement sets out all terms and conditions for the sale of an entire business entity, including assets, liabilities, goodwill, customer relationships, and ongoing operations. It's comprehensive and covers every aspect of the transaction.",
    whenToUse: "Use this agreement when selling or buying a complete business, whether structured as a stock sale or asset sale. It's essential for protecting both buyer and seller interests.",
    keyProtections: ["Complete asset/liability allocation", "Representations and warranties", "Purchase price adjustments", "Non-compete covenants", "Employee transition terms", "Earnout provisions (if applicable)"],
    whatYouNeed: ["Business valuation", "Financial statements", "Asset inventory", "Employee information", "Customer contracts", "Vendor agreements"],
    estimatedTime: "30-45 minutes"
  },
  "Clinical Trial Agreement": {
    whatIsIt: "A Clinical Trial Agreement is a contract between a pharmaceutical/biotech sponsor and a research institution (and often investigators) for conducting clinical trials to test medical products, drugs, or devices on human subjects.",
    whenToUse: "Use this agreement when initiating clinical research, engaging research sites, or when medical institutions are being selected to conduct trials for regulatory approval.",
    keyProtections: ["Protocol compliance requirements", "Subject safety provisions", "Data ownership and usage rights", "Publication rights", "Indemnification provisions", "Regulatory compliance obligations"],
    whatYouNeed: ["Study protocol", "IRB approval documentation", "Investigator credentials", "Site capabilities", "Insurance certificates"],
    estimatedTime: "25-35 minutes"
  },
  "Accounting Contract": {
    whatIsIt: "An Accounting Contract governs the professional relationship between an accountant or accounting firm and their client. It defines the scope of services, responsibilities, fees, confidentiality obligations, and professional standards.",
    whenToUse: "Use this agreement when engaging accountants for bookkeeping, tax preparation, auditing, financial consulting, or any ongoing accounting services.",
    keyProtections: ["Scope of accounting services", "Client responsibilities", "Document retention policies", "Professional liability limitations", "Confidentiality of financial data", "Tax filing deadlines and responsibilities"],
    whatYouNeed: ["List of required accounting services", "Access to financial records", "Tax filing requirements", "Reporting schedule", "Fee structure"],
    estimatedTime: "10-15 minutes"
  },
  "Loan Agreement": {
    whatIsIt: "A Loan Agreement is a comprehensive contract for lending money that specifies the principal amount, interest rate, repayment schedule, collateral (if any), and all terms governing the lending relationship.",
    whenToUse: "Use this agreement for any significant loan transaction, whether personal loans, business loans, family loans, or any situation where you want clear, enforceable lending terms.",
    keyProtections: ["Loan amount and disbursement", "Interest rate and calculation", "Repayment schedule", "Prepayment options", "Default provisions", "Collection remedies"],
    whatYouNeed: ["Loan amount", "Interest rate", "Repayment terms", "Borrower creditworthiness", "Collateral (if secured)"],
    estimatedTime: "12-18 minutes"
  },
  "Wedding Planner Agreement": {
    whatIsIt: "A Wedding Planner Agreement is a comprehensive contract for wedding coordination services between a wedding planner/coordinator and the engaged couple. It covers planning duties, timeline, vendor coordination, budget management, and day-of logistics.",
    whenToUse: "Use this agreement when hiring a wedding planner for full-service planning, partial planning, or day-of coordination. It protects both parties and ensures clear expectations.",
    keyProtections: ["Detailed scope of services", "Payment schedule and fees", "Vendor referral policies", "Cancellation and postponement terms", "Liability limitations", "Timeline and milestones"],
    whatYouNeed: ["Wedding date and venue", "Budget overview", "Service level desired", "Key vendor requirements", "Timeline expectations"],
    estimatedTime: "12-15 minutes"
  },
  "Bartending Services Agreement": {
    whatIsIt: "A Bartending Services Agreement is a contract for hiring professional bartending staff for events, parties, or functions. It covers service hours, alcohol handling, licensing, setup/cleanup, and liability.",
    whenToUse: "Use this agreement when hiring bartenders for weddings, corporate events, private parties, or any event where professional beverage service is needed.",
    keyProtections: ["Service hours and staffing levels", "Alcohol liability and licensing", "Setup and cleanup responsibilities", "Gratuity policies", "Insurance requirements", "Cancellation terms"],
    whatYouNeed: ["Event date, time, and location", "Expected guest count", "Beverage requirements", "Staffing needs", "Insurance certificates"],
    estimatedTime: "8-12 minutes"
  },
  "Videography Services Agreement": {
    whatIsIt: "A Videography Services Agreement is a contract for professional video production services, covering event filming, editing, deliverables, usage rights, and payment terms.",
    whenToUse: "Use this agreement when hiring videographers for weddings, corporate events, promotional videos, documentaries, or any video production project.",
    keyProtections: ["Deliverable specifications", "Raw footage ownership", "Editing and revision process", "Usage and licensing rights", "Delivery timeline", "Cancellation and rescheduling"],
    whatYouNeed: ["Event/project details", "Video specifications desired", "Editing requirements", "Delivery format preferences", "Usage rights needed"],
    estimatedTime: "10-12 minutes"
  },
  "Vendor Agreement": {
    whatIsIt: "A Vendor Agreement is a general contract for vendors providing goods or services at events, marketplaces, or to businesses. It covers product/service specifications, pricing, delivery, and quality standards.",
    whenToUse: "Use this agreement when contracting with event vendors, market vendors, or any supplier of goods/services where you need formalized terms.",
    keyProtections: ["Product/service specifications", "Pricing and payment terms", "Delivery requirements", "Quality standards", "Insurance and liability", "Termination provisions"],
    whatYouNeed: ["Vendor business information", "Product/service details", "Pricing structure", "Delivery logistics", "Insurance documentation"],
    estimatedTime: "10-15 minutes"
  },
  "Valet Service Agreement": {
    whatIsIt: "A Valet Service Agreement is a contract for parking and valet services, covering service hours, staffing, vehicle handling procedures, liability, and insurance requirements.",
    whenToUse: "Use this agreement when hiring valet services for events, restaurants, hotels, or any venue requiring professional parking assistance.",
    keyProtections: ["Service hours and staffing", "Vehicle handling procedures", "Liability for vehicle damage", "Insurance requirements", "Tip/gratuity policies", "Weather contingencies"],
    whatYouNeed: ["Event/venue details", "Expected vehicle count", "Service hours", "Special instructions", "Insurance certificates"],
    estimatedTime: "8-10 minutes"
  },
  "Tutoring Agreement": {
    whatIsIt: "A Tutoring Agreement is a contract between a tutor and student (or parent/guardian) establishing the terms of tutoring services, including subject matter, scheduling, payment, and academic expectations.",
    whenToUse: "Use this agreement when engaging a tutor for academic support, test preparation, skill development, or any educational tutoring arrangement.",
    keyProtections: ["Subject matter and curriculum", "Session scheduling and duration", "Payment terms and cancellation policy", "Progress tracking", "Confidentiality of student information"],
    whatYouNeed: ["Student information", "Subjects/topics to be covered", "Schedule preferences", "Learning goals", "Payment method"],
    estimatedTime: "8-10 minutes"
  },
  "Roommate Agreement": {
    whatIsIt: "A Roommate Agreement establishes rules, responsibilities, and expectations for people sharing a living space. It covers rent division, utilities, chores, guests, quiet hours, and conflict resolution.",
    whenToUse: "Use this agreement when moving in with roommates, adding a new roommate, or when existing roommates need to formalize their living arrangements.",
    keyProtections: ["Rent and utility division", "Security deposit responsibilities", "Common area usage", "Guest policies", "Quiet hours", "Move-out procedures"],
    whatYouNeed: ["Roommate contact information", "Rent and utility amounts", "Lease terms (if applicable)", "House rules preferences", "Emergency contacts"],
    estimatedTime: "10-15 minutes"
  },
  "Roommate Release Agreement": {
    whatIsIt: "A Roommate Release Agreement formally releases a departing roommate from their lease obligations and establishes terms for their exit, including financial settlements and key return.",
    whenToUse: "Use this agreement when a roommate is moving out before the lease ends and you need to formalize their departure while protecting remaining roommates and the landlord.",
    keyProtections: ["Release from lease obligations", "Security deposit settlement", "Final utility reconciliation", "Key and property return", "Forwarding address provisions"],
    whatYouNeed: ["Departing roommate information", "Move-out date", "Financial settlement details", "Landlord consent (if required)", "Security deposit disposition"],
    estimatedTime: "8-10 minutes"
  },
  "Retainer Agreement": {
    whatIsIt: "A Retainer Agreement is a contract for ongoing professional services where the client pays in advance (a retainer) to secure the provider's availability and services over time. Common with attorneys and consultants.",
    whenToUse: "Use this agreement when engaging professionals for ongoing or as-needed services, when you want to reserve someone's time, or when pre-payment is required.",
    keyProtections: ["Retainer amount and replenishment", "Scope of covered services", "Billing against retainer", "Unused retainer refund", "Service availability guarantees"],
    whatYouNeed: ["Retainer amount", "Scope of services", "Billing rates", "Replenishment triggers", "Termination provisions"],
    estimatedTime: "10-12 minutes"
  },
  "Real Estate Agent Agreement": {
    whatIsIt: "A Real Estate Agent Agreement (Listing Agreement) is a contract between a property owner and a real estate agent/broker establishing the terms for selling or leasing the property, including commission, duration, and marketing efforts.",
    whenToUse: "Use this agreement when hiring a real estate agent to sell your home, list commercial property, or assist with property leasing.",
    keyProtections: ["Exclusive vs. non-exclusive listing", "Commission structure", "Marketing obligations", "Listing duration", "Termination provisions", "Dual agency disclosure"],
    whatYouNeed: ["Property details", "Listing price expectations", "Commission rate", "Listing term duration", "Marketing preferences"],
    estimatedTime: "10-15 minutes"
  },
  "Physician Services Agreement": {
    whatIsIt: "A Physician Services Agreement is a contract for medical services provided by a physician to a patient, clinic, hospital, or other healthcare organization. It defines services, compensation, privileges, and compliance obligations.",
    whenToUse: "Use this agreement when contracting with physicians for medical services, whether as an independent contractor, locum tenens, or employed arrangement.",
    keyProtections: ["Scope of medical services", "Compensation and benefits", "Malpractice insurance requirements", "Credentialing and privileges", "Non-compete provisions", "Compliance with healthcare regulations"],
    whatYouNeed: ["Physician credentials", "Service requirements", "Compensation structure", "Insurance documentation", "Schedule requirements"],
    estimatedTime: "15-20 minutes"
  },
  "Personal Training Agreement": {
    whatIsIt: "A Personal Training Agreement is a contract for fitness training services between a personal trainer and client. It covers training sessions, goals, safety waivers, payment, and liability limitations.",
    whenToUse: "Use this agreement when hiring a personal trainer, starting a fitness program, or when trainers need to formalize their client relationships.",
    keyProtections: ["Training program and goals", "Session scheduling", "Health disclosure requirements", "Liability waivers", "Cancellation policies", "Payment terms"],
    whatYouNeed: ["Client health information", "Fitness goals", "Session schedule", "Payment method", "Emergency contact"],
    estimatedTime: "8-10 minutes"
  },
  "Limousine Service Agreement": {
    whatIsIt: "A Limousine Service Agreement is a contract for limo rental and chauffeur services for events, airport transfers, or special occasions. It covers vehicle type, service hours, route, payment, and liability.",
    whenToUse: "Use this agreement when booking limousine services for weddings, proms, corporate events, airport transfers, or any occasion requiring chauffeured transportation.",
    keyProtections: ["Vehicle specification and amenities", "Service hours and route", "Overtime charges", "Gratuity policies", "Cancellation terms", "Vehicle condition upon return"],
    whatYouNeed: ["Event details", "Pickup and drop-off locations", "Service hours", "Number of passengers", "Special requests"],
    estimatedTime: "8-10 minutes"
  },
  "Food Service Agreement": {
    whatIsIt: "A Food Service Agreement is a contract for catering or food provision at events, workplaces, or facilities. It covers menu selection, service style, staffing, food safety, and payment terms.",
    whenToUse: "Use this agreement when hiring caterers for events, contracting food service for corporate cafeterias, or arranging meal provision for any gathering.",
    keyProtections: ["Menu specifications and pricing", "Service style and staffing", "Food safety and handling", "Dietary accommodation", "Cancellation and refund", "Liability for foodborne illness"],
    whatYouNeed: ["Event details", "Guest count", "Menu preferences", "Dietary restrictions", "Service requirements"],
    estimatedTime: "10-12 minutes"
  },
  "DJ Services Agreement": {
    whatIsIt: "A DJ Services Agreement is a contract for musical entertainment services between a DJ/entertainment company and a client for events. It covers performance time, equipment, music selection, and payment.",
    whenToUse: "Use this agreement when hiring DJs for weddings, parties, corporate events, or any occasion requiring professional music and entertainment services.",
    keyProtections: ["Performance hours and breaks", "Equipment provision", "Music requests and restrictions", "MC/announcement services", "Backup equipment provisions", "Cancellation terms"],
    whatYouNeed: ["Event details", "Performance hours", "Music preferences", "Equipment needs", "Special requests/announcements"],
    estimatedTime: "8-10 minutes"
  },
  "Co-Tenancy Agreement": {
    whatIsIt: "A Co-Tenancy Agreement is an agreement between tenants sharing a rental property lease. It establishes individual responsibilities, rent division, and house rules separate from the main lease with the landlord.",
    whenToUse: "Use this agreement when signing a lease with co-tenants, adding tenants to an existing arrangement, or when roommates need to clarify their inter-tenant obligations.",
    keyProtections: ["Individual rent responsibilities", "Joint and several liability acknowledgment", "Utility division", "Common area maintenance", "Guest and subletting policies", "Departure procedures"],
    whatYouNeed: ["All co-tenant information", "Rent and utility breakdown", "House rules consensus", "Landlord acknowledgment (recommended)", "Move-in date"],
    estimatedTime: "10-12 minutes"
  },
  "Consulting Agreement": {
    whatIsIt: "A Consulting Agreement is a contract for professional consulting advice between a consultant and client. It defines the scope of consulting services, deliverables, compensation, confidentiality, and intellectual property rights.",
    whenToUse: "Use this agreement when engaging consultants for business advice, technical expertise, management consulting, or any professional advisory services.",
    keyProtections: ["Scope of consulting services", "Deliverables and milestones", "Compensation structure", "Confidentiality of business information", "IP ownership of work product", "Non-compete provisions"],
    whatYouNeed: ["Consulting objectives", "Deliverable specifications", "Timeline and milestones", "Budget/compensation terms", "Confidential information types"],
    estimatedTime: "12-15 minutes"
  },
  "Concession Agreement": {
    whatIsIt: "A Concession Agreement grants the right to operate a business within another business's premises, such as food stands in stadiums, retail kiosks in malls, or services in hotels. It defines territory, fees, and operational requirements.",
    whenToUse: "Use this agreement when granting or obtaining concession rights, operating retail/food services in another venue, or establishing vendor relationships within larger properties.",
    keyProtections: ["Concession territory and exclusivity", "Revenue sharing or rent structure", "Operating hours and requirements", "Quality standards", "Insurance requirements", "Term and renewal"],
    whatYouNeed: ["Location specifications", "Operating requirements", "Revenue/rent terms", "Insurance documentation", "Business license information"],
    estimatedTime: "12-15 minutes"
  },
  "Bill of Sale": {
    whatIsIt: "A Bill of Sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer. It serves as proof of purchase and ownership transfer for items like vehicles, equipment, furniture, or other tangible assets.",
    whenToUse: "Use this document when buying or selling personal property, whether vehicles, boats, equipment, livestock, or any tangible item where proof of ownership transfer is needed.",
    keyProtections: ["Clear identification of property", "Purchase price documentation", "Seller warranty statements", "As-is disclaimers (if applicable)", "Date of transfer", "Signatures of both parties"],
    whatYouNeed: ["Detailed item description", "Serial numbers or identification", "Purchase price", "Buyer and seller information", "Date of sale"],
    estimatedTime: "5-8 minutes"
  },
  "Living Will": {
    whatIsIt: "A Living Will (Advance Healthcare Directive) is a legal document that specifies your wishes regarding medical treatment if you become incapacitated and unable to communicate. It guides doctors on life-sustaining treatments, resuscitation, and end-of-life care.",
    whenToUse: "Every adult should have a Living Will. Use it to ensure your medical wishes are followed during terminal illness, permanent unconsciousness, or any condition where you cannot speak for yourself.",
    keyProtections: ["Clear medical treatment preferences", "Life support decisions", "Pain management wishes", "Organ donation preferences", "Feeding tube decisions", "Religious considerations"],
    whatYouNeed: ["Your medical treatment preferences", "Understanding of treatment options", "Witness signatures", "Notary (in some states)", "Healthcare agent designation"],
    estimatedTime: "10-15 minutes"
  },
  "Non-Disclosure Agreement": {
    whatIsIt: "A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship between parties. It protects sensitive information, trade secrets, and proprietary data from being disclosed to unauthorized parties.",
    whenToUse: "Use this agreement when sharing confidential business information with employees, contractors, potential investors, business partners, or anyone who needs access to sensitive data.",
    keyProtections: ["Definition of confidential information", "Obligations of receiving party", "Permitted disclosures", "Duration of confidentiality", "Remedies for breach", "Return of information provisions"],
    whatYouNeed: ["Description of confidential information", "Parties involved", "Purpose of disclosure", "Duration of agreement", "Permitted uses"],
    estimatedTime: "8-12 minutes"
  },
  "Partnership Agreement": {
    whatIsIt: "A Partnership Agreement is a legal contract between two or more individuals or entities who agree to operate a business together for profit. It defines ownership percentages, profit sharing, responsibilities, and exit procedures.",
    whenToUse: "Use this agreement when starting a business with partners, formalizing an existing partnership, or when partners need to update their business relationship terms.",
    keyProtections: ["Capital contributions", "Profit and loss allocation", "Management responsibilities", "Decision-making authority", "Dispute resolution", "Partner withdrawal procedures"],
    whatYouNeed: ["Partner information", "Business purpose", "Capital contributions", "Profit sharing percentages", "Management structure"],
    estimatedTime: "15-25 minutes"
  },
  "LLC Operating Agreement": {
    whatIsIt: "An LLC Operating Agreement is the foundational document that establishes how a Limited Liability Company will be run. It covers member ownership percentages, voting rights, profit distribution, and management structure.",
    whenToUse: "Use this agreement when forming an LLC, even if you're a single-member LLC. It's essential for protecting your limited liability status and establishing clear business operations.",
    keyProtections: ["Member ownership interests", "Voting and decision rights", "Profit/loss distribution", "Manager vs. member management", "Transfer restrictions", "Dissolution procedures"],
    whatYouNeed: ["Member information", "Capital contributions", "Ownership percentages", "Management structure preference", "Profit distribution method"],
    estimatedTime: "15-25 minutes"
  }
};

// --- HELPER FUNCTION TO GET DOCUMENT INFO ---
function getDocumentInfo(title: string): { 
  whatIsIt: string; 
  whenToUse: string; 
  keyProtections: string[];
  whatYouNeed: string[];
  estimatedTime: string;
} {
  // Direct match
  if (documentKnowledgeBase[title]) {
    return documentKnowledgeBase[title];
  }

  // Fuzzy match by checking if title contains key words
  const titleLower = title.toLowerCase();
  
  for (const [key, value] of Object.entries(documentKnowledgeBase)) {
    if (titleLower.includes(key.toLowerCase().split(' ')[0]) || 
        key.toLowerCase().includes(titleLower.split(' ')[0])) {
      return value;
    }
  }

  // Generate default based on document type keywords
  let whatIsIt = `${title} is a comprehensive legal document designed to establish clear terms, protect all parties involved, and ensure legal compliance with applicable regulations.`;
  let whenToUse = `Use this document when you need to formalize arrangements, protect your interests, and create an enforceable legal record of your agreement.`;
  let keyProtections = [
    "Clear identification of all parties",
    "Detailed terms and conditions",
    "Legal enforceability provisions",
    "Dispute resolution mechanisms",
    "Signature and witness requirements"
  ];
  let whatYouNeed = [
    "Full legal names of all parties",
    "Contact information and addresses",
    "Specific terms to be included",
    "Relevant dates and deadlines",
    "Payment or consideration details (if applicable)"
  ];
  let estimatedTime = "10-15 minutes";

  // Customize based on keywords in title
  if (titleLower.includes('lease') || titleLower.includes('rental')) {
    whatIsIt = `${title} is a legally binding contract that establishes the terms and conditions for renting property or assets. It protects both landlord/owner and tenant/lessee interests.`;
    whenToUse = "Use this document when entering into a rental or lease arrangement for property, equipment, vehicles, or other assets.";
    keyProtections = ["Property/asset description", "Rent/payment terms", "Duration and renewal options", "Maintenance responsibilities", "Security deposit provisions", "Termination conditions"];
    whatYouNeed = ["Property/asset details", "Rent amount and due dates", "Lease start and end dates", "Security deposit amount", "Party identification"];
  } else if (titleLower.includes('agreement') || titleLower.includes('contract')) {
    whatIsIt = `${title} is a formal legal contract that defines the relationship, responsibilities, and expectations between the parties involved.`;
    keyProtections = ["Clear scope of obligations", "Payment/compensation terms", "Performance standards", "Confidentiality provisions", "Termination clauses"];
  } else if (titleLower.includes('affidavit')) {
    whatIsIt = `${title} is a sworn written statement made under oath, carrying legal weight as testimony that can be used in court proceedings or official matters.`;
    whenToUse = "Use this document when you need to make a formal, legally binding statement of facts that may be used as evidence.";
    keyProtections = ["Sworn oath under penalty of perjury", "Clear factual statements", "Notary verification", "Witness attestation"];
    whatYouNeed = ["Facts to be attested", "Your identification", "Notary public availability", "Witness (if required)"];
    estimatedTime = "5-10 minutes";
  } else if (titleLower.includes('power of attorney') || titleLower.includes('poa')) {
    whatIsIt = `${title} is a legal document that grants someone else the authority to act on your behalf in legal, financial, or medical matters.`;
    whenToUse = "Use this document when you need someone to make decisions or take actions on your behalf, especially during incapacity or absence.";
    keyProtections = ["Agent authority scope", "Principal protections", "Revocation provisions", "Accountability requirements"];
    whatYouNeed = ["Agent's information", "Scope of authority", "Effective date", "Witness/notary requirements"];
  } else if (titleLower.includes('nda') || titleLower.includes('confidential') || titleLower.includes('non-disclosure')) {
    whatIsIt = `${title} is a legal contract that protects sensitive information from being disclosed to unauthorized parties.`;
    whenToUse = "Use this document when sharing proprietary information, trade secrets, or confidential business data with employees, partners, or third parties.";
    keyProtections = ["Definition of confidential information", "Non-disclosure obligations", "Permitted disclosures", "Duration of confidentiality", "Remedies for breach"];
    whatYouNeed = ["Description of confidential information", "Parties involved", "Duration of agreement", "Permitted uses"];
  } else if (titleLower.includes('construction') || titleLower.includes('carpentry') || titleLower.includes('roofing') || titleLower.includes('remodel')) {
    whatIsIt = `${title} is a construction industry contract that establishes terms for building, renovation, or improvement work.`;
    whenToUse = "Use this document when hiring contractors, subcontractors, or construction professionals for building projects.";
    keyProtections = ["Scope of work specifications", "Payment schedule and terms", "Timeline and milestones", "Warranty provisions", "Insurance requirements", "Change order procedures"];
    whatYouNeed = ["Project specifications", "Payment terms", "Timeline expectations", "Insurance certificates", "Permit information"];
    estimatedTime = "12-18 minutes";
  }

  return { whatIsIt, whenToUse, keyProtections, whatYouNeed, estimatedTime };
}

export default function DocumentInfoLanding({ title, description, category, onStart, onBack }: DocumentInfoLandingProps) {
  const docInfo = getDocumentInfo(title);

  return (
    <div className='max-w-7xl mx-auto animate-in fade-in duration-500'>
      <Button variant='ghost' onClick={onBack} className='mb-6 hover:bg-gray-100'>
        <ArrowLeft className='w-4 h-4 mr-2' /> Back to Categories
      </Button>
      
      <div className='grid lg:grid-cols-5 gap-8 items-start'>
        {/* LEFT COLUMN - Main Content (60%) */}
        <div className='lg:col-span-3 space-y-8'>
          <div>
            <span className='inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4'>{category}</span>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>{title}</h1>
            <p className='text-xl text-gray-600 leading-relaxed'>{description}</p>
          </div>
          
          {/* Trust Indicators */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100'>
              <div className='p-2.5 bg-green-100 rounded-full'><Shield className='w-5 h-5 text-green-700' /></div>
              <div>
                <span className='font-semibold text-gray-900 block text-sm'>Legally Binding</span>
                <span className='text-green-700 text-xs'>Court-ready documents</span>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100'>
              <div className='p-2.5 bg-blue-100 rounded-full'><Clock className='w-5 h-5 text-blue-700' /></div>
              <div>
                <span className='font-semibold text-gray-900 block text-sm'>{docInfo.estimatedTime}</span>
                <span className='text-blue-700 text-xs'>Quick & easy process</span>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-purple-50 p-4 rounded-xl border border-purple-100'>
              <div className='p-2.5 bg-purple-100 rounded-full'><FileText className='w-5 h-5 text-purple-700' /></div>
              <div>
                <span className='font-semibold text-gray-900 block text-sm'>Instant PDF</span>
                <span className='text-purple-700 text-xs'>Download immediately</span>
              </div>
            </div>
          </div>

          {/* What You Need Box */}
          <div className='bg-gray-50 rounded-2xl p-6 border border-gray-200'>
            <h3 className='font-bold text-lg mb-4 text-gray-900 flex items-center gap-2'>
              <Clipboard className='w-5 h-5 text-blue-600' />
              What you'll need to start:
            </h3>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {docInfo.whatYouNeed.map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                  <span className='text-gray-700'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onStart} 
            size='lg' 
            className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-10 py-7 h-auto w-full md:w-auto shadow-xl shadow-blue-200/50 rounded-xl font-semibold'
          >
            <FileSignature className='w-5 h-5 mr-2' />
            Make my Document
          </Button>
        </div>

        {/* RIGHT COLUMN - Orange Panel (40%) */}
        <div className='lg:col-span-2'>
          <div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl sticky top-24'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-white/20 rounded-lg'>
                <Lightbulb className='w-6 h-6 text-white' />
              </div>
              <h3 className='font-bold text-xl'>Document Guide</h3>
            </div>

            <div className='space-y-6'>
              {/* What is this? */}
              <div>
                <h4 className='font-semibold text-orange-100 mb-2 flex items-center gap-2'>
                  <FileText className='w-4 h-4' />
                  What is this document?
                </h4>
                <p className='text-white/90 text-sm leading-relaxed'>
                  {docInfo.whatIsIt}
                </p>
              </div>

              {/* When to use */}
              <div>
                <h4 className='font-semibold text-orange-100 mb-2 flex items-center gap-2'>
                  <AlertTriangle className='w-4 h-4' />
                  When should you use it?
                </h4>
                <p className='text-white/90 text-sm leading-relaxed'>
                  {docInfo.whenToUse}
                </p>
              </div>

              {/* Key Protections */}
              <div>
                <h4 className='font-semibold text-orange-100 mb-3 flex items-center gap-2'>
                  <Shield className='w-4 h-4' />
                  Key Legal Protections
                </h4>
                <ul className='space-y-2'>
                  {docInfo.keyProtections.slice(0, 5).map((protection, i) => (
                    <li key={i} className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='w-4 h-4 text-orange-200 mt-0.5 shrink-0' />
                      <span className='text-white/90'>{protection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className='mt-6 pt-4 border-t border-white/20'>
              <div className='flex items-center gap-2 text-orange-100 text-sm'>
                <Scale className='w-4 h-4' />
                <span>Drafted by legal professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}