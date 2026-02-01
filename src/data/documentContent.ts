// ============================================================================
// LEGALGRAM - HOLY GRAIL DOCUMENT CONTENT DATABASE
// Full descriptions, FAQs, and detailed guides for all document types
// ============================================================================

export interface DocumentFAQ {
  q: string;
  a: string;
}

export interface DocumentContent {
  title: string;
  whatIs: string;
  whenToUse: string[];
  faqs: DocumentFAQ[];
  keyProtections?: string[];
  whatYouNeed?: string[];
  estimatedTime?: string;
  legalDisclaimer?: string;
}

// ============================================================================
// COMPREHENSIVE DOCUMENT CONTENT DATABASE
// ============================================================================

export const documentContent: Record<string, DocumentContent> = {
  // === VEHICLE & PROPERTY LEASES ===
  "Vehicle Lease Agreement": {
    title: "Vehicle Lease Agreement",
    whatIs: "A legally binding contract between a vehicle owner (Lessor) and an individual or business (Lessee). It clearly defines rights, duties, and obligations, covering lease duration, payment structure, permitted use, insurance, and mileage limits. Unlike a sale, ownership does not transfer. This agreement protects both parties by establishing clear expectations for vehicle condition, maintenance responsibilities, and procedures for ending the lease.",
    whenToUse: [
      "You want to lease a vehicle without going through a dealership.",
      "You need a clear written record of lease terms and payments to prevent disputes.",
      "You want legal protection for both lessor and lessee regarding damage and liability.",
      "You're leasing your personal vehicle to generate income (e.g., rideshare, delivery services).",
      "You need to establish mileage limits and overage penalties."
    ],
    faqs: [
      { q: "Is this legally binding?", a: "Yes. Like any contract, once signed by both parties, it is enforceable under state law. Both parties are legally obligated to follow the terms specified in the agreement." },
      { q: "What happens if the vehicle is damaged?", a: "The agreement specifies insurance requirements and liability. Typically, the Lessee is responsible for repairs beyond normal wear and tear. Comprehensive and collision insurance is usually required." },
      { q: "Can I end the lease early?", a: "Early termination is possible but usually involves penalties specified in the agreement. These may include paying remaining lease payments or a flat termination fee." },
      { q: "What if the Lessee exceeds the mileage limit?", a: "Overage charges apply as specified in the agreement. These are typically calculated per mile over the limit and can add up quickly." },
      { q: "Do I need to notarize this agreement?", a: "Notarization is not strictly required but is highly recommended for added legal protection and to verify the identities of both parties." }
    ],
    keyProtections: [
      "Clear liability assignment for accidents and damages",
      "Defined mileage limits with overage penalties",
      "Security deposit terms and return conditions",
      "Insurance requirements and coverage specifications",
      "Early termination clauses and penalties"
    ],
    whatYouNeed: [
      "Vehicle information (VIN, make, model, year, color)",
      "Lessor and Lessee full legal names and addresses",
      "Lease duration and payment terms",
      "Insurance policy details",
      "Current odometer reading"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === SECURITY & FINANCIAL AGREEMENTS ===
  "Security Agreement": {
    title: "Security Agreement",
    whatIs: "A contract that pledges specific personal property (collateral) to secure a loan. If the borrower defaults, the lender has the legal right to claim the assets. It protects the lender and ensures repayment security. This document creates a 'security interest' in the collateral, giving the secured party priority over other creditors. Common collateral includes vehicles, equipment, inventory, accounts receivable, and other business assets.",
    whenToUse: [
      "You are lending money and want collateral protection (e.g., machinery, equipment, jewelry).",
      "You are borrowing money and the lender requires security to lower the interest rate.",
      "You need a formal, enforceable loan structure.",
      "You want to perfect your security interest by filing a UCC-1 statement.",
      "You're financing equipment or inventory for a business."
    ],
    faqs: [
      { q: "Does this cover Real Estate?", a: "No. For land or homes, use a Mortgage or Deed of Trust. Security Agreements are specifically for personal property (movable assets), not real property." },
      { q: "Do I need to notarize it?", a: "It is highly recommended for stronger legal protection, though not always strictly required by law. Notarization adds authenticity and can be crucial in disputes." },
      { q: "What is 'perfecting' a security interest?", a: "Perfection establishes your priority over other creditors. This is typically done by filing a UCC-1 Financing Statement with the Secretary of State." },
      { q: "What happens if the borrower defaults?", a: "The secured party can repossess the collateral, following state law procedures. They may then sell it to recover the debt, with any excess returned to the borrower." },
      { q: "Can I use multiple items as collateral?", a: "Yes. The agreement can list multiple assets, and you can even use 'after-acquired property' clauses to include future assets." }
    ],
    keyProtections: [
      "Detailed description of collateral",
      "Default event definitions",
      "Remedies upon default",
      "Rights to inspect collateral",
      "Insurance requirements for collateral",
      "UCC filing provisions"
    ],
    whatYouNeed: [
      "Debtor and secured party full legal information",
      "Detailed collateral description (serial numbers, values)",
      "Loan amount and repayment terms",
      "Default conditions and cure periods",
      "State where collateral is located"
    ],
    estimatedTime: "12-18 minutes"
  },

  // === AFFIDAVITS ===
  "Affidavit of Character": {
    title: "Affidavit of Character",
    whatIs: "A formal legal document used to provide a character reference under oath. The affiant declares—on the basis of personal knowledge—that a specific individual is of good moral character, integrity, and reputation. This sworn statement carries legal weight because false statements can result in perjury charges. Character affidavits are commonly used in court proceedings, immigration matters, and professional licensing applications.",
    whenToUse: [
      "Child custody proceedings where a parent's character is questioned.",
      "Immigration cases requiring proof of moral standing.",
      "Employment background checks or professional licensing.",
      "Criminal sentencing hearings where character evidence may help.",
      "Adoption proceedings requiring character verification.",
      "Security clearance applications."
    ],
    faqs: [
      { q: "Does it require a Notary?", a: "Yes. An affidavit must be sworn before a Notary Public to be valid in court. The notary verifies the identity of the person making the statement and witnesses their signature." },
      { q: "Can a family member sign it?", a: "Yes, but an unbiased third party (neighbor, employer, clergy, longtime friend) is often viewed as more credible by courts and agencies. Family members may be seen as biased." },
      { q: "What should I include in the statement?", a: "Include specific examples of the person's character, how long you've known them, the nature of your relationship, and any relevant observations about their moral conduct." },
      { q: "Can I refuse to provide an affidavit?", a: "Yes. Providing a character affidavit is voluntary. No one can compel you to write one." },
      { q: "What if my statement is false?", a: "Making false statements in an affidavit constitutes perjury, which is a criminal offense punishable by fines and imprisonment." }
    ],
    keyProtections: [
      "Sworn statement under penalty of perjury",
      "Specific examples of character traits",
      "Clear documentation of relationship history",
      "Professional observations when applicable",
      "Notarized verification of identity"
    ],
    whatYouNeed: [
      "Subject's full legal name",
      "Affiant's relationship to the subject",
      "Specific character observations and examples",
      "Duration of relationship",
      "Notary Public availability"
    ],
    estimatedTime: "6-10 minutes"
  },

  "Affidavit of Ownership": {
    title: "Affidavit of Ownership",
    whatIs: "A sworn legal statement declaring that you are the rightful owner of a specific piece of property, typically a vehicle, boat, or other titled asset. It's commonly used when original title documents are lost or during transfers of ownership. This document is legally binding and made under penalty of perjury.",
    whenToUse: [
      "You need to prove ownership without a title document.",
      "You're applying for a duplicate title at the DMV.",
      "You're transferring ownership of untitled property.",
      "Original ownership documents have been lost or destroyed.",
      "You need to establish a chain of ownership."
    ],
    faqs: [
      { q: "When is this typically required?", a: "DMVs often require this when applying for a duplicate title, registering a vehicle purchased without proper documentation, or transferring inherited property." },
      { q: "Does it replace a title?", a: "No, but it supports your application for a new title and serves as evidence of ownership while obtaining proper documentation." },
      { q: "Must it be notarized?", a: "Yes, notarization is required for the affidavit to be legally valid and accepted by government agencies." }
    ],
    keyProtections: [
      "Legal declaration under penalty of perjury",
      "Detailed property description",
      "Chain of ownership history",
      "Encumbrance disclosures",
      "Notary verification"
    ],
    whatYouNeed: [
      "Full property description (VIN, serial numbers)",
      "Purchase documentation or bill of sale",
      "Previous owner information",
      "Your identification",
      "Notary public availability"
    ],
    estimatedTime: "5-8 minutes"
  },

  "General Affidavit": {
    title: "General Affidavit",
    whatIs: "A written sworn statement of fact that can be used as evidence in legal proceedings or to verify information for official purposes. The person making the statement (affiant) swears under penalty of perjury that the contents are true. This versatile document is admissible in court and can be used for countless purposes.",
    whenToUse: [
      "You need to make a formal, sworn statement of fact for court.",
      "You're verifying identity or personal information for an agency.",
      "You need to document specific events or circumstances.",
      "You're providing evidence for an insurance claim.",
      "You need sworn testimony but cannot appear in person."
    ],
    faqs: [
      { q: "What makes an affidavit different from a regular written statement?", a: "An affidavit is sworn under oath and notarized, making it legally binding. False statements are punishable as perjury." },
      { q: "Can I write my own affidavit?", a: "Yes, but it must follow legal formatting requirements and be notarized to be valid." },
      { q: "Is an affidavit admissible in court?", a: "Yes, affidavits are generally admissible as evidence, though the opposing party may have the right to cross-examine the affiant." }
    ],
    keyProtections: [
      "Legally binding sworn statement",
      "Admissible as evidence",
      "Penalty of perjury clause",
      "Notary verification",
      "Clear factual statements"
    ],
    whatYouNeed: [
      "Specific facts to be attested",
      "Purpose of the affidavit",
      "Your identification",
      "Witness information (if required)",
      "Notary public availability"
    ],
    estimatedTime: "5-8 minutes"
  },

  // === HEALTHCARE & POWER OF ATTORNEY ===
  "Medical Power of Attorney": {
    title: "Medical Power of Attorney",
    whatIs: "A legal document that authorizes a trusted person (Agent) to make healthcare decisions on your behalf if you are unable to communicate. It is 'durable', meaning it stays effective during incapacity. This document ensures your healthcare wishes are respected when you cannot speak for yourself and prevents family disputes about treatment decisions.",
    whenToUse: [
      "Before undergoing major surgery.",
      "If you are diagnosed with a progressive illness.",
      "General emergency planning for all adults over 18.",
      "You want to ensure specific treatment preferences are followed.",
      "You need someone to communicate with doctors on your behalf."
    ],
    faqs: [
      { q: "Is the Agent responsible for my bills?", a: "No. The agent makes medical decisions but is not personally liable for your medical costs. They only have authority over healthcare choices, not financial obligations." },
      { q: "Can I revoke it?", a: "Yes, as long as you are mentally competent, you can cancel or update it at any time. Simply inform your agent in writing and destroy existing copies." },
      { q: "Who should I choose as my agent?", a: "Choose someone you trust completely who knows your values and wishes. They should be able to make difficult decisions under pressure and advocate for you effectively." },
      { q: "Does it cover mental health treatment?", a: "You can specifically include or exclude mental health treatment authority. Many people create separate mental health directives." },
      { q: "What if my agent is unavailable?", a: "You should designate an alternate agent who can step in if your primary agent is unable or unwilling to serve." }
    ],
    keyProtections: [
      "Clearly defined agent authority",
      "HIPAA authorization for medical records access",
      "End-of-life care preferences",
      "Organ donation wishes",
      "Mental health treatment directives",
      "Agent succession planning"
    ],
    whatYouNeed: [
      "Healthcare agent's full contact information",
      "Alternate agent information",
      "Your specific medical preferences",
      "Witness signatures (two required in most states)",
      "Notary (required in some states)"
    ],
    estimatedTime: "8-12 minutes"
  },

  "Healthcare Power of Attorney": {
    title: "Healthcare Power of Attorney",
    whatIs: "A legal document that authorizes a trusted person (your healthcare agent or proxy) to make medical decisions on your behalf if you become incapacitated and cannot communicate your wishes. This document is 'durable,' meaning it remains effective even when you are unconscious or mentally incapacitated.",
    whenToUse: [
      "Before undergoing major surgery or medical procedures.",
      "When diagnosed with a serious or progressive illness.",
      "As part of general estate and healthcare planning.",
      "If you want someone specific to make medical decisions for you.",
      "To ensure your treatment preferences are respected."
    ],
    faqs: [
      { q: "What decisions can my agent make?", a: "Your agent can consent to or refuse treatment, choose doctors and hospitals, access your medical records, and make end-of-life decisions according to your wishes." },
      { q: "Is this the same as a Living Will?", a: "No. A Living Will states your specific wishes; a Healthcare POA designates someone to make decisions. Many people have both." },
      { q: "Can I limit my agent's authority?", a: "Yes. You can specify exactly what decisions they can and cannot make, or exclude certain treatments." }
    ],
    keyProtections: [
      "Clearly defined agent authority",
      "HIPAA authorization",
      "End-of-life care preferences",
      "Organ donation wishes",
      "Agent succession planning"
    ],
    whatYouNeed: [
      "Healthcare agent's contact information",
      "Alternate agent information",
      "Your medical preferences",
      "Witness signatures",
      "Notary (in some states)"
    ],
    estimatedTime: "8-12 minutes"
  },

  "Living Will": {
    title: "Living Will",
    whatIs: "A legal document that expresses your wishes regarding life-sustaining medical treatment if you become terminally ill or permanently unconscious. Unlike a Healthcare Power of Attorney (which appoints someone to decide for you), a Living Will directly states YOUR decisions about end-of-life care.",
    whenToUse: [
      "You want to specify your end-of-life care preferences.",
      "You want to relieve family members of difficult decisions.",
      "You have specific wishes about life support, resuscitation, or feeding tubes.",
      "You're planning your estate and healthcare directives."
    ],
    faqs: [
      { q: "What treatments can I address?", a: "You can address mechanical ventilation, CPR, tube feeding, dialysis, antibiotics, pain medication, and other life-prolonging treatments." },
      { q: "Is it legally binding?", a: "Yes, in all 50 states. Healthcare providers are legally required to follow your documented wishes." },
      { q: "Can I change it later?", a: "Yes. You can update or revoke your Living Will at any time while mentally competent." }
    ],
    keyProtections: [
      "Specific treatment preferences documented",
      "Pain management instructions",
      "Comfort care specifications",
      "Organ donation decisions",
      "Legally binding directives"
    ],
    whatYouNeed: [
      "Your specific end-of-life preferences",
      "Two witness signatures",
      "Notarization (some states)",
      "Discussion with your doctor"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === BUSINESS AGREEMENTS ===
  "Non-Disclosure Agreement": {
    title: "Non-Disclosure Agreement (NDA)",
    whatIs: "A legally binding contract that creates a confidential relationship between parties. The party receiving confidential information agrees not to disclose it to third parties. NDAs protect trade secrets, business strategies, client lists, and other proprietary information from being shared with competitors or the public.",
    whenToUse: [
      "Sharing business ideas with potential investors.",
      "Hiring employees who will access sensitive information.",
      "Discussing partnerships or joint ventures.",
      "Working with contractors or consultants.",
      "Before merger or acquisition negotiations."
    ],
    faqs: [
      { q: "How long does an NDA last?", a: "Typically 1-5 years, but trade secrets can be protected indefinitely. The duration depends on the nature of the information and industry standards." },
      { q: "Can an NDA be broken?", a: "Yes, but the breaching party can be sued for damages, injunctive relief, and attorney's fees. Courts can order the return of confidential materials." },
      { q: "What makes information 'confidential'?", a: "Generally, it must be identified as confidential, not publicly known, and provide competitive advantage." }
    ],
    keyProtections: [
      "Clear definition of confidential information",
      "Permitted uses and disclosures",
      "Duration of confidentiality obligations",
      "Return or destruction of materials",
      "Remedies for breach"
    ],
    whatYouNeed: [
      "Party names and addresses",
      "Description of confidential information",
      "Purpose of disclosure",
      "Duration of agreement",
      "Governing state law"
    ],
    estimatedTime: "8-10 minutes"
  },

  "Independent Contractor Agreement": {
    title: "Independent Contractor Agreement",
    whatIs: "A legal contract establishing a business relationship between a company and an independent contractor. It defines the scope of work, payment terms, and clarifies that the contractor is not an employee. This distinction is crucial for tax purposes and liability protection.",
    whenToUse: [
      "Hiring freelancers or consultants for specific projects.",
      "Engaging specialists for temporary work.",
      "Outsourcing specific business functions.",
      "Working with vendors or service providers.",
      "When you want to avoid employer obligations."
    ],
    faqs: [
      { q: "What's the difference from employment?", a: "Contractors control how they work, use their own equipment, can work for others, and handle their own taxes. Employees are directed by the employer and receive benefits." },
      { q: "Can a contractor become an employee?", a: "Yes, if the relationship changes. Misclassification can result in significant IRS penalties and back taxes." },
      { q: "Who owns the work product?", a: "This should be clearly specified. Without a clause, contractors may retain ownership of their creative work." }
    ],
    keyProtections: [
      "Clear scope of work definition",
      "Payment terms and schedules",
      "Intellectual property ownership",
      "Confidentiality provisions",
      "Termination conditions",
      "Liability limitations"
    ],
    whatYouNeed: [
      "Contractor business information",
      "Detailed project description",
      "Payment rates and milestones",
      "Timeline and deadlines",
      "Deliverable specifications"
    ],
    estimatedTime: "12-15 minutes"
  },

  "Loan Agreement": {
    title: "Loan Agreement",
    whatIs: "A comprehensive contract for lending money that specifies the principal amount, interest rate, repayment schedule, collateral (if any), and all terms governing the lending relationship. This document protects both lender and borrower by clearly establishing expectations and consequences.",
    whenToUse: [
      "Lending money to friends or family (document it!).",
      "Business loans between companies.",
      "Personal loans requiring formal documentation.",
      "Any situation where you want enforceable repayment terms.",
      "When interest will be charged on a loan."
    ],
    faqs: [
      { q: "Is interest required?", a: "No. You can make an interest-free loan, but even then, a written agreement protects both parties and documents the transaction." },
      { q: "What if the borrower doesn't pay?", a: "The agreement provides legal grounds for collection, including small claims court, mediation, or hiring a collection agency." },
      { q: "Do I need collateral?", a: "Not required, but secured loans offer better protection. Collateral gives you something to claim if the borrower defaults." }
    ],
    keyProtections: [
      "Loan amount and disbursement terms",
      "Interest rate and calculation method",
      "Repayment schedule with due dates",
      "Prepayment options",
      "Default provisions and remedies",
      "Collection procedures"
    ],
    whatYouNeed: [
      "Loan amount",
      "Interest rate (if any)",
      "Repayment schedule",
      "Borrower information",
      "Collateral description (if secured)"
    ],
    estimatedTime: "12-18 minutes"
  },

  // === PROPERTY & LEASE AGREEMENTS ===
  "Commercial Lease Agreement": {
    title: "Commercial Lease Agreement",
    whatIs: "A binding contract between a landlord and a business tenant for rental of commercial property. Unlike residential leases, commercial leases have fewer legal protections for tenants and allow for greater negotiation flexibility. These agreements typically cover longer terms and include provisions for rent increases, build-outs, and operating expenses.",
    whenToUse: [
      "Renting office, retail, or industrial space.",
      "Leasing warehouse or storage facilities.",
      "Opening a new business location.",
      "Renewing an existing commercial lease.",
      "Subleasing commercial property."
    ],
    faqs: [
      { q: "What's a triple net (NNN) lease?", a: "The tenant pays base rent PLUS property taxes, insurance, and maintenance costs. Common in commercial real estate." },
      { q: "Can I negotiate the terms?", a: "Yes! Unlike residential leases, commercial leases are highly negotiable. Everything from rent to build-out allowances can be discussed." },
      { q: "What about improvements to the space?", a: "The lease should specify who pays for improvements, who owns them, and what happens when the lease ends." }
    ],
    keyProtections: [
      "Rent amount and escalation clauses",
      "Lease term and renewal options",
      "Permitted use restrictions",
      "Maintenance responsibilities",
      "Insurance requirements",
      "Build-out and improvement terms"
    ],
    whatYouNeed: [
      "Property address and description",
      "Landlord and tenant information",
      "Rent amount and payment terms",
      "Lease duration",
      "Intended business use"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Residential Lease Agreement": {
    title: "Residential Lease Agreement",
    whatIs: "A legal contract between a landlord and tenant for rental of residential property. It establishes the rights and responsibilities of both parties, including rent amount, security deposit, lease term, and rules for the property. State and local laws provide significant protections for residential tenants.",
    whenToUse: [
      "Renting out a house, apartment, or condo.",
      "Becoming a tenant in a rental property.",
      "Renewing an existing residential lease.",
      "Converting a verbal agreement to written form."
    ],
    faqs: [
      { q: "Can a landlord enter without notice?", a: "Generally no. Most states require 24-48 hours notice except in emergencies. Check your state's laws." },
      { q: "What's a reasonable security deposit?", a: "Most states limit deposits to 1-2 months' rent. The lease must specify deposit amount and return conditions." },
      { q: "Can I break the lease early?", a: "There may be penalties. The lease should specify early termination procedures and costs." }
    ],
    keyProtections: [
      "Rent amount and due date",
      "Security deposit terms",
      "Lease duration",
      "Maintenance responsibilities",
      "Pet policies",
      "Termination procedures"
    ],
    whatYouNeed: [
      "Property address",
      "Landlord and tenant information",
      "Monthly rent amount",
      "Security deposit amount",
      "Lease start and end dates"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === FAMILY & PERSONAL ===
  "Prenuptial Agreement": {
    title: "Prenuptial Agreement",
    whatIs: "A legal contract between two people planning to marry that outlines how assets, debts, and financial matters will be handled during the marriage and in the event of divorce or death. Often called a 'prenup,' this document can protect family businesses, inheritances, and ensure fair treatment for both parties.",
    whenToUse: [
      "Either party has significant assets or debts.",
      "One or both parties have children from previous relationships.",
      "One party owns a business or expects an inheritance.",
      "There's a significant income disparity between partners.",
      "Either party wants to protect specific assets."
    ],
    faqs: [
      { q: "Does a prenup mean we'll get divorced?", a: "No. A prenup is financial planning, like insurance. Most couples who sign prenups never need to use them for divorce." },
      { q: "Can a prenup be thrown out?", a: "Yes, if it's found to be unconscionable, signed under duress, or if there wasn't full financial disclosure." },
      { q: "Do both parties need lawyers?", a: "It's highly recommended. Each party should have independent legal counsel for the agreement to be enforceable." }
    ],
    keyProtections: [
      "Property division provisions",
      "Debt responsibility allocation",
      "Spousal support terms",
      "Business interest protection",
      "Inheritance rights",
      "Financial disclosure requirements"
    ],
    whatYouNeed: [
      "Complete financial disclosure from both parties",
      "List of separate vs. marital property",
      "Debt information",
      "Future expectations (inheritance, business growth)",
      "Wedding date"
    ],
    estimatedTime: "20-30 minutes"
  },

  "Child Care Authorization": {
    title: "Child Care Authorization",
    whatIs: "A legal document that grants a specified adult temporary authority to make decisions for a minor child, including medical care, school activities, and general welfare. This is essential when parents will be unavailable and another adult needs legal authority to care for the child.",
    whenToUse: [
      "Leaving your child with grandparents or relatives.",
      "Business trips where you'll be unreachable.",
      "Vacation without your children.",
      "Military deployment.",
      "Any extended absence from your child."
    ],
    faqs: [
      { q: "Does this give up parental rights?", a: "No. This is temporary authorization only. You retain all parental rights and can revoke the authorization at any time." },
      { q: "Can the caregiver make all medical decisions?", a: "You can specify what decisions they can make. Emergency care is typically included; major surgery may require additional consent." },
      { q: "Is notarization required?", a: "While not always legally required, notarization helps medical providers and schools accept the authorization." }
    ],
    keyProtections: [
      "Clear scope of authority",
      "Medical treatment permissions",
      "Emergency contact procedures",
      "Duration of authorization",
      "Revocation procedures"
    ],
    whatYouNeed: [
      "Child's full information",
      "Caregiver's full information",
      "Duration of authorization",
      "Medical and insurance information",
      "Emergency contacts"
    ],
    estimatedTime: "8-10 minutes"
  },

  // === EMPLOYMENT ===
  "Employment Agreement": {
    title: "Employment Agreement",
    whatIs: "A formal contract between an employer and employee that outlines the terms and conditions of employment. This includes compensation, benefits, job duties, confidentiality obligations, termination procedures, and other workplace policies. A written agreement protects both parties and prevents misunderstandings.",
    whenToUse: [
      "Hiring a new employee.",
      "Promoting an employee to a new position.",
      "Changing employment terms significantly.",
      "When confidential information access is involved.",
      "For executive or key employee positions."
    ],
    faqs: [
      { q: "Is a written agreement required?", a: "Not always legally required, but highly recommended. Without a written agreement, disputes become he-said-she-said situations." },
      { q: "What's 'at-will' employment?", a: "Either party can end employment at any time for any legal reason. This is the default in most states unless otherwise specified." },
      { q: "Can I include a non-compete?", a: "Depends on your state. Some states (like California) heavily restrict non-competes. Others allow reasonable restrictions." }
    ],
    keyProtections: [
      "Job title and responsibilities",
      "Compensation and benefits",
      "Work schedule and location",
      "Confidentiality obligations",
      "Termination procedures",
      "Non-compete/non-solicitation clauses"
    ],
    whatYouNeed: [
      "Employee information",
      "Job description and title",
      "Salary and benefits package",
      "Start date",
      "Reporting structure"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Severance Agreement": {
    title: "Severance Agreement",
    whatIs: "A contract between an employer and departing employee that outlines the terms of separation. The employer typically provides severance pay and benefits in exchange for the employee's agreement not to sue, not to disparage the company, and often to keep certain information confidential.",
    whenToUse: [
      "Laying off employees.",
      "Terminating an employee for non-cause reasons.",
      "Offering early retirement packages.",
      "Resolving potential employment disputes.",
      "Downsizing or restructuring."
    ],
    faqs: [
      { q: "Am I required to offer severance?", a: "Generally no, unless required by contract or company policy. However, it can provide valuable legal protection in exchange." },
      { q: "Can the employee negotiate?", a: "Yes. Severance terms are negotiable, and employees should have time to review the agreement with an attorney." },
      { q: "What about non-disparagement?", a: "Both parties typically agree not to make negative statements about each other. Violations can result in legal action." }
    ],
    keyProtections: [
      "Severance payment amount and schedule",
      "Benefits continuation",
      "Release of claims",
      "Non-disparagement provisions",
      "Confidentiality obligations",
      "Reference provisions"
    ],
    whatYouNeed: [
      "Employee information",
      "Severance amount and payment terms",
      "Benefits to be continued",
      "Non-compete considerations",
      "Return of company property list"
    ],
    estimatedTime: "12-15 minutes"
  },

  // === SALES & TRANSACTIONS ===
  "Bill of Sale": {
    title: "Bill of Sale",
    whatIs: "A legal document that records the transfer of ownership of personal property from a seller to a buyer. It serves as proof of the transaction and protects both parties by documenting the sale details, including the item description, purchase price, and any warranties or conditions.",
    whenToUse: [
      "Selling a vehicle, boat, or motorcycle.",
      "Selling equipment or machinery.",
      "Transferring ownership of valuable personal property.",
      "Documenting a gift of property for tax purposes.",
      "Any private party sale of significant items."
    ],
    faqs: [
      { q: "Is a Bill of Sale the same as a title?", a: "No. A title is official government documentation of ownership. A Bill of Sale documents the transaction itself. You need both for vehicles." },
      { q: "Do I need to notarize it?", a: "Depends on the item and state. Vehicle sales often require notarization. For other property, it's recommended but not always required." },
      { q: "What about 'as-is' sales?", a: "You can sell items 'as-is' without warranty, but this should be clearly stated in the Bill of Sale." }
    ],
    keyProtections: [
      "Item description and condition",
      "Purchase price",
      "Seller and buyer information",
      "Transfer date",
      "Warranty terms (or 'as-is' statement)",
      "Signatures of both parties"
    ],
    whatYouNeed: [
      "Complete item description",
      "Sale price",
      "Seller and buyer names and addresses",
      "Date of sale",
      "Any serial numbers or VINs"
    ],
    estimatedTime: "5-10 minutes"
  },

  // === DEFAULT FALLBACK ===
  "default": {
    title: "Legal Document",
    whatIs: "This is a legal document that formalizes an agreement or declaration between parties. Legal documents provide clarity, establish rights and obligations, and serve as evidence in case of disputes. They are designed to protect all parties involved by clearly documenting terms and expectations.",
    whenToUse: [
      "You need a formal, written record of an agreement.",
      "You want legal protection and clarity.",
      "You need documentation for court or official purposes.",
      "You're entering into a business or personal arrangement."
    ],
    faqs: [
      { q: "Do I need a lawyer?", a: "Not always required, but consulting an attorney is recommended for complex matters or high-value transactions." },
      { q: "Is this legally binding?", a: "Yes, when properly executed. Signatures from all parties (and notarization when required) make documents enforceable." },
      { q: "How long should I keep this document?", a: "Keep important legal documents indefinitely or at least 7 years. Store copies in a safe place." }
    ],
    keyProtections: [
      "Clear documentation of terms",
      "Defined rights and obligations",
      "Evidence for potential disputes",
      "Legal enforceability"
    ],
    whatYouNeed: [
      "Names and information of all parties",
      "Specific terms of the agreement",
      "Signatures from all parties",
      "Witnesses or notarization (if required)"
    ],
    estimatedTime: "10-15 minutes"
  }
};

// ============================================================================
// HELPER FUNCTION TO GET CONTENT
// ============================================================================

export function getDocumentContent(title: string): DocumentContent {
  // Try exact match first
  if (documentContent[title]) {
    return documentContent[title];
  }
  
  // Try case-insensitive match
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [key, value] of Object.entries(documentContent)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedKey === normalizedTitle) {
      return value;
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(documentContent)) {
    if (title.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(title.toLowerCase())) {
      return value;
    }
  }
  
  // Return default
  return {
    ...documentContent["default"],
    title: title
  };
}
