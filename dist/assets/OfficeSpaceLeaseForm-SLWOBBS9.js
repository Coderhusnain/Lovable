import{r as g,j as e,C as O,k as z,l as G,b as U,a as f,A as W,aS as q,d as B,J as w}from"./index-Domu0QSH.js";import{I as i}from"./input-CjLHh5sm.js";import{L as n}from"./label-DHWdGN-p.js";import{T as h}from"./textarea-DkKSvL28.js";import{S as y,a as x,b as v,c as b,d as j}from"./select-QzbqEC5l.js";import{E as M}from"./jspdf.es.min-zKH7-O34.js";import{S as V,C as H,a as J}from"./city-B5NRDuuX.js";import{U as Z}from"./UserInfoStep-CfBu40j_.js";const ne=()=>{const[r,c]=g.useState(1),[a,D]=g.useState({country:"",state:"",city:"",leaseDate:"",landlordName:"",tenantName:"",spaceDescription:"",streetAddress:"",zipCode:"",legalDescription:"",startDate:"",endDate:"",monthlyRent:"",paymentAddress:"",securityDeposit:"",furnishings:"",parkingSpaces:"",storageLocation:"",liabilityAmount:"",renewalTerm:"",renewalNotice:"",renewalRent:"",saleNotice:"",repairCostLimit:"",lateFeeDays:"",lateFeeAmount:"",nsfFee:"",landlordNoticeAddress:"",tenantNoticeAddress:""}),[S,_]=g.useState(!1),A=J.getAllCountries(),C=a.country?V.getStatesOfCountry(a.country):[],T=a.state?H.getCitiesOfState(a.country,a.state):[],m=6,s=(t,l)=>{D(o=>({...o,[t]:l}))},F=()=>{r<5?c(r+1):r===5&&c(6)},P=()=>{r>1&&c(r-1)},L=()=>{_(!0);try{const t=new M,l=t.internal.pageSize.width,o=20,I=l-2*o;let d=30;const N=(k,u=10,R=!1)=>{t.setFontSize(u),R?t.setFont(void 0,"bold"):t.setFont(void 0,"normal");const p=t.splitTextToSize(k,I);d+p.length*u*.5>t.internal.pageSize.height-o&&(t.addPage(),d=o),t.text(p,o,d),d+=p.length*u*.5+3};N("OFFICE SPACE LEASE AGREEMENT",16,!0),d+=10;const E=`This Lease Agreement ("Lease") is made and entered into as of ${a.leaseDate||"[Insert Date]"}, by and between ${a.landlordName||"[Insert Landlord's Full Legal Name]"}, hereinafter referred to as the "Landlord," 
And
${a.tenantName||"[Insert Tenant's Full Legal Name]"}, hereinafter referred to as the "Tenant" (collectively, the "Parties").

1. Premises
Landlord hereby leases to Tenant the office space known as ${a.spaceDescription||"[Insert Description of Space]"} (the "Premises"), located at ${a.streetAddress||"[Street Address]"}, ${a.city||"[City]"}, ${a.state||"[State]"}, ${a.zipCode||"[Zip Code]"}.

2. Legal Description
The Premises are further legally described as:
${a.legalDescription||"[Insert Legal Description]"}.

3. Term
The term of this Lease shall commence on ${a.startDate||"[Insert Start Date]"} and shall terminate on ${a.endDate||"[Insert End Date]"}, unless earlier terminated in accordance with this Lease.

4. Lease Payments
Tenant agrees to pay to Landlord monthly rent in the amount of $${a.monthlyRent||"0.00"}, payable in advance on the first (1st) day of each calendar month. All payments shall be made to Landlord at ${a.paymentAddress||"[Insert Payment Address]"}, or at such other address as Landlord may designate in writing.

5. Security Deposit
Upon execution of this Lease, Tenant shall pay to Landlord a security deposit of $${a.securityDeposit||"0.00"}, to be held in trust as security for any damage to the Premises or other obligations under this Lease, subject to applicable law.

6. Possession
Tenant shall be entitled to possession of the Premises on the Lease commencement date and shall vacate the Premises on the expiration date. Upon vacating, Tenant shall return the Premises in as good condition as when received, ordinary wear and tear excepted. By taking possession, Tenant affirms the Premises are in satisfactory and acceptable condition.

7. Furnishings
The following furnishings will be provided: ${a.furnishings||"[List Furnishings]"}. Tenant shall return all such items in good condition, reasonable wear and tear excepted, at the end of the Lease term.

8. Parking
Tenant shall be entitled to use ${a.parkingSpaces||"0"} designated parking space(s) for the use of its employees, customers, and invitees.

9. Storage
Tenant may store personal property in ${a.storageLocation||"[Insert Storage Location]"} during the Lease term. Landlord shall not be liable for any loss or damage to stored items.

10. Property Insurance
Both Parties shall maintain appropriate insurance on their respective interests in the Premises. Landlord shall be named as an additional insured on Tenant's policies. Proof of insurance coverage shall be provided to Landlord. Tenant shall also maintain casualty insurance on its own property.

11. Liability Insurance
Tenant shall maintain general liability insurance covering the Premises in an aggregate amount not less than $${a.liabilityAmount||"0.00"}. Certificates of insurance shall be provided to Landlord, who shall be entitled to advance written notice of policy termination.

12. Renewal Terms
This Lease shall automatically renew for successive terms of ${a.renewalTerm||"[Insert Renewal Term Duration]"}, unless either party gives written notice of non-renewal at least ${a.renewalNotice||"[Insert Days]"} days before the end of the current term. During any renewal term, rent shall be ${a.renewalRent||"[Insert Amount and Frequency]"}.

13. Maintenance
Landlord shall be responsible for maintaining the Premises in a safe and tenantable condition, except where damage results from Tenant's misuse or neglect.

14. Utilities and Services
Tenant shall be solely responsible for all utility and service charges incurred in connection with the Premises during the Lease term.

15. Common Areas
Landlord shall provide access to and maintain common areas (including parking) of the building. Use of these areas shall be non-exclusive and subject to rules and regulations established and amended by Landlord. Tenant shall comply with all such rules.

16. Pest Control
Tenant shall, at its own expense, arrange regular pest and vermin control, especially in areas used for food handling or waste disposal.

17. Janitorial Services
Tenant shall provide regular janitorial service to the Premises at its own expense.

18. Covenant Against Waste
Tenant agrees not to commit or permit any waste or damage to the Premises. Tenant shall be responsible for maintaining cleanliness and ensuring waste and sewerage systems remain unobstructed.

19. Taxes
Landlord shall be responsible for all personal property taxes and any sales or use taxes related to Tenant's use of the Premises.

20. Termination Upon Sale
Notwithstanding any provision to the contrary, Landlord may terminate this Lease upon giving ${a.saleNotice||"[Insert Days]"} days' written notice if the Premises are sold.

21. Destruction or Condemnation
If the Premises are damaged or condemned such that Tenant cannot reasonably use them, and repairs are not feasible within sixty (60) days, or cost exceeds $${a.repairCostLimit||"0.00"}, either party may terminate the Lease with written notice.

22. Defaults
Tenant shall be in default if it fails to comply with any Lease obligation and does not cure the default within:
5 days for financial obligations;
10 days for non-financial obligations after written notice.
Landlord may enter and take possession, subject to law, and recover damages. Any costs incurred in enforcing this Lease shall be reimbursed by Tenant, including attorney fees.

23. Late Payments
If any rent or other amount due is not paid within ${a.lateFeeDays||"[Insert Days]"} days of its due date, a late fee of $${a.lateFeeAmount||"0.00"} shall be payable by Tenant.

24. Holdover
If Tenant remains in possession beyond the Lease term without Landlord's written consent, Tenant shall pay rent at the same rate as under the last renewal period.

25. Cumulative Rights
All rights and remedies under this Lease shall be cumulative and not exclusive of any rights available at law or in equity.

26. Non-Sufficient Funds
Tenant shall be charged $${a.nsfFee||"0.00"} for any check returned due to insufficient funds.

27. Governing Law
This Lease shall be governed by and construed in accordance with the laws of the State of ${a.state||"[Insert State]"}.

28. Entire Agreement & Amendments
This Lease contains the entire agreement between the Parties regarding the Premises. No modifications shall be valid unless in writing and signed by both Parties.

29. Severability
If any provision of this Lease is held unenforceable, the remaining provisions shall continue in full force and effect.

30. Waiver
The failure of either Party to enforce any term of this Lease shall not constitute a waiver of future enforcement of that or any other term.

31. Binding Effect
This Lease shall bind and benefit the Parties and their respective successors, assigns, heirs, and legal representatives.

32. Signatures & Notices
All notices under this Lease must be in writing and delivered personally or by certified mail to the following addresses (or any updated address provided in writing):
Landlord:
${a.landlordName||"[Insert Name]"}
${a.landlordNoticeAddress||"[Insert Address]"}
Tenant:
${a.tenantName||"[Insert Name]"}
${a.tenantNoticeAddress||"[Insert Address]"}

IN WITNESS WHEREOF, the parties have executed this Lease as of the date first written above.
LANDLORD:
Signature: _________________________
Name: ${a.landlordName||"[Insert Name]"}
Date: ____________________________
TENANT:
Signature: _________________________
Name: ${a.tenantName||"[Insert Name]"}
Date: ____________________________

Make It Legal

This Agreement should be signed in front of a notary public.
Once signed in front of a notary, this document should be delivered to the appropriate court for filing.
Copies
The original Agreement should be filed with the Clerk of Court or delivered to the requesting business.
The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place.
Additional Assistance
If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.`;N(E),t.save("office-space-lease-agreement.pdf"),w.success("Document generated successfully!")}catch(t){console.error("Error generating PDF:",t),w.error("Failed to generate document")}finally{_(!1)}},$=()=>{switch(r){case 1:return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Location Information"}),e.jsx("p",{className:"text-muted-foreground",children:"Select the country, state, and city for the lease agreement"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"country",children:"Country *"}),e.jsxs(y,{value:a.country,onValueChange:t=>s("country",t),children:[e.jsx(x,{children:e.jsx(v,{placeholder:"Select country"})}),e.jsx(b,{children:A.map(t=>e.jsx(j,{value:t.isoCode,children:t.name},t.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"state",children:"State/Province *"}),e.jsxs(y,{value:a.state,onValueChange:t=>s("state",t),disabled:!a.country,children:[e.jsx(x,{children:e.jsx(v,{placeholder:"Select state/province"})}),e.jsx(b,{children:C.map(t=>e.jsx(j,{value:t.isoCode,children:t.name},t.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"city",children:"City *"}),e.jsxs(y,{value:a.city,onValueChange:t=>s("city",t),disabled:!a.state,children:[e.jsx(x,{children:e.jsx(v,{placeholder:"Select city"})}),e.jsx(b,{children:T.map(t=>e.jsx(j,{value:t.name,children:t.name},t.name))})]})]})]})]});case 2:return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Agreement Date and Parties"}),e.jsx("p",{className:"text-muted-foreground",children:"Enter the lease date and party information"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"leaseDate",children:"Lease Agreement Date *"}),e.jsx(i,{id:"leaseDate",type:"date",value:a.leaseDate,onChange:t=>s("leaseDate",t.target.value),placeholder:"Select date"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"landlordName",children:"Landlord's Full Legal Name *"}),e.jsx(i,{id:"landlordName",value:a.landlordName,onChange:t=>s("landlordName",t.target.value),placeholder:"Enter landlord's full legal name"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"tenantName",children:"Tenant's Full Legal Name *"}),e.jsx(i,{id:"tenantName",value:a.tenantName,onChange:t=>s("tenantName",t.target.value),placeholder:"Enter tenant's full legal name"})]})]})]});case 3:return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Premises Details"}),e.jsx("p",{className:"text-muted-foreground",children:"Describe the office space being leased"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"spaceDescription",children:"Office Space Description *"}),e.jsx(h,{id:"spaceDescription",value:a.spaceDescription,onChange:t=>s("spaceDescription",t.target.value),placeholder:"Describe the office space (e.g., Suite 100, 2nd floor office space)",rows:3})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"streetAddress",children:"Street Address *"}),e.jsx(i,{id:"streetAddress",value:a.streetAddress,onChange:t=>s("streetAddress",t.target.value),placeholder:"Enter street address"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"zipCode",children:"Zip/Postal Code *"}),e.jsx(i,{id:"zipCode",value:a.zipCode,onChange:t=>s("zipCode",t.target.value),placeholder:"Enter zip/postal code"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"legalDescription",children:"Legal Description"}),e.jsx(h,{id:"legalDescription",value:a.legalDescription,onChange:t=>s("legalDescription",t.target.value),placeholder:"Enter legal description of the premises (optional)",rows:3})]})]})]});case 4:return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Lease Term and Financial Details"}),e.jsx("p",{className:"text-muted-foreground",children:"Set the lease duration and payment terms"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"startDate",children:"Lease Start Date *"}),e.jsx(i,{id:"startDate",type:"date",value:a.startDate,onChange:t=>s("startDate",t.target.value)})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"endDate",children:"Lease End Date *"}),e.jsx(i,{id:"endDate",type:"date",value:a.endDate,onChange:t=>s("endDate",t.target.value)})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"monthlyRent",children:"Monthly Rent Amount ($) *"}),e.jsx(i,{id:"monthlyRent",type:"number",value:a.monthlyRent,onChange:t=>s("monthlyRent",t.target.value),placeholder:"Enter monthly rent amount"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"paymentAddress",children:"Payment Address *"}),e.jsx(h,{id:"paymentAddress",value:a.paymentAddress,onChange:t=>s("paymentAddress",t.target.value),placeholder:"Enter address where rent payments should be sent",rows:3})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"securityDeposit",children:"Security Deposit ($) *"}),e.jsx(i,{id:"securityDeposit",type:"number",value:a.securityDeposit,onChange:t=>s("securityDeposit",t.target.value),placeholder:"Enter security deposit amount"})]})]})]});case 5:return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Property Features"}),e.jsx("p",{className:"text-muted-foreground",children:"Specify furnishings, parking, and storage details"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"furnishings",children:"Furnishings Provided"}),e.jsx(h,{id:"furnishings",value:a.furnishings,onChange:t=>s("furnishings",t.target.value),placeholder:"List all furnishings that will be provided (e.g., desks, chairs, filing cabinets)",rows:3})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"parkingSpaces",children:"Number of Parking Spaces"}),e.jsx(i,{id:"parkingSpaces",type:"number",value:a.parkingSpaces,onChange:t=>s("parkingSpaces",t.target.value),placeholder:"Number of designated parking spaces"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"storageLocation",children:"Storage Location"}),e.jsx(i,{id:"storageLocation",value:a.storageLocation,onChange:t=>s("storageLocation",t.target.value),placeholder:"Describe storage areas available (e.g., basement storage unit, closet)"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"liabilityAmount",children:"Liability Insurance Amount ($) *"}),e.jsx(i,{id:"liabilityAmount",type:"number",value:a.liabilityAmount,onChange:t=>s("liabilityAmount",t.target.value),placeholder:"Minimum liability insurance coverage required"})]})]})]});case 6:return e.jsx(Z,{onBack:()=>c(5),onGenerate:L,documentType:"Office Space Lease Agreement",isGenerating:S});default:return null}};return e.jsx("div",{className:"bg-gray-50",children:e.jsxs(O,{className:"w-full max-w-4xl mx-auto",children:[e.jsxs(z,{children:[e.jsx(G,{className:"text-center",children:"Office Space Lease Agreement"}),e.jsx("div",{className:"flex justify-center items-center space-x-2 mt-4",children:[...Array(m)].map((t,l)=>e.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${l+1===r?"bg-primary text-primary-foreground":l+1<r?"bg-primary/20 text-primary":"bg-muted text-muted-foreground"}`,children:l+1},l))}),e.jsxs("p",{className:"text-center text-sm text-muted-foreground mt-2",children:["Step ",r," of ",m]})]}),e.jsxs(U,{children:[$(),r!==6&&e.jsxs("div",{className:"flex justify-between mt-8",children:[e.jsxs(f,{variant:"outline",onClick:P,disabled:r===1,children:[e.jsx(W,{className:"w-4 h-4 mr-2"}),"Previous"]}),r===m?e.jsxs(f,{onClick:L,className:"bg-primary",children:[e.jsx(q,{className:"w-4 h-4 mr-2"}),"Generate PDF"]}):e.jsxs(f,{onClick:F,children:["Next",e.jsx(B,{className:"w-4 h-4 ml-2"})]})]})]})]})})};export{ne as default};
