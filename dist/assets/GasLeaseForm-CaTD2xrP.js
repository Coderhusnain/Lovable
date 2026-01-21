import{r as m,j as e,V as W,C as U,k as q,l as V,b as H,a as g,A as Y,d as z,aQ as B,J as C}from"./index-Bvx_DJOQ.js";import{I as l}from"./input-DxWpxYcw.js";import{L as t}from"./label-BgGH2qdj.js";import{T as u}from"./textarea-CQyr-wjF.js";import{S as J,C as Q,a as X}from"./city-B5NRDuuX.js";import{S as p,a as y,b as f,c as _,d as x}from"./select-DLmo4Mz7.js";import{E as K}from"./jspdf.es.min-D4YI3ioX.js";import{U as Z}from"./UserInfoStep-C0kzeqK2.js";const de=()=>{const[o,c]=m.useState(1),[a,h]=m.useState({agreementDate:"",lessorName:"",lessorAddress:"",lesseeName:"",lesseeAddress:"",county:"",state:"",propertyAddress:"",legalDescription:"",acreage:"",annualRental:"",leaseTerm:"",oilRoyaltyPercentage:"",gasRoyaltyPercentage:"",casingheadGasolinePercentage:"",paymentDay:"",rentalAmount:"",offsetWellDistance:"",mineralTaxPercentage:"",selectedCountry:"",selectedState:"",selectedCity:""}),[N,v]=m.useState(!1),L=5,j=X.getAllCountries(),b=a.selectedCountry?J.getStatesOfCountry(a.selectedCountry):[],E=a.selectedState?Q.getCitiesOfState(a.selectedCountry,a.selectedState):[],r=(s,i)=>{h(n=>({...n,[s]:i}))},w=s=>{const i=j.find(n=>n.isoCode===s);h(n=>({...n,selectedCountry:s,selectedState:"",selectedCity:"",state:(i==null?void 0:i.name)||""}))},P=s=>{const i=b.find(n=>n.isoCode===s);h(n=>({...n,selectedState:s,selectedCity:"",county:(i==null?void 0:i.name)||""}))},T=s=>{h(i=>({...i,selectedCity:s}))},A=()=>{v(!0);try{const s=new K,i=s.internal.pageSize.width,n=20,I=6;let d=n;const S=(O,$=10,k=!1)=>{s.setFontSize($),s.setFont("helvetica",k?"bold":"normal"),s.splitTextToSize(O,i-2*n).forEach(M=>{d>s.internal.pageSize.height-n&&(s.addPage(),d=n),s.text(M,n,d),d+=I})};S("GAS LEASE AGREEMENT",16,!0),d+=5;const G=`This Gas Lease Agreement ("Agreement") is made and entered into on ${a.agreementDate||"[Insert Date]"}, by and between 
  ${a.lessorName||"[Insert Name]"}, residing at ${a.lessorAddress||"[Insert Address]"} ("Lessor"), 
  And
   ${a.lesseeName||"[Insert Name]"}, residing at ${a.lesseeAddress||"[Insert Address]"} ("Lessee"). 
  The Lessor and Lessee shall collectively be referred to as the "Parties."

  1. GRANT OF LEASED PREMISES
  In consideration of the sum of $${a.annualRental||"0.00"} as annual rental, the receipt of which is acknowledged, and in further consideration of the covenants and obligations contained herein, the Lessor hereby leases exclusively to the Lessee the tract of land situated in the County of ${a.county||"[Insert County]"}, State of ${a.state||"[Insert State]"}, located at ${a.propertyAddress||"[Insert Address]"}, and more fully described as: ${a.legalDescription||"[Insert Legal Description]"}, comprising approximately ${a.acreage||"0"} acres (the "Premises"), for the purpose of exploring, drilling, mining, extracting, storing, and removing oil, gas, hydrocarbons, and all associated substances.
  The lease shall remain in force for a term of ${a.leaseTerm||"0"} years from the date of execution, and shall continue thereafter so long as:
  (a) oil, gas, or other hydrocarbon substances are being produced in paying quantities from the Premises;
  (b) drilling operations are being continuously conducted; or
  (c) the term is extended by mutual written agreement.

  2. RIGHTS GRANTED TO LESSEE
  Lessee is granted the exclusive right to:
  (a) enter and occupy the Premises;
  (b) construct, maintain, operate, and repair any necessary structures, including plants, pipelines, equipment, power and communication lines, employee housing, and roadways;
  (c) inject gas, water, and other substances into the Premises;
  (d) drill for water and use water obtained from the Premises free of charge;
  (e) build and operate processing facilities for extraction of oil and gas from the Premises or nearby lands.

  3. ROYALTY PROVISIONS
  3.1 Oil Royalty

  Lessee shall pay to Lessor a royalty equal to ${a.oilRoyaltyPercentage||"_"}% of the value of oil produced and removed, adjusted for temperature, water, and sediment. Value shall be based on the prevailing market price on the date of removal. Lessor may elect, with 90 days' written notice, to receive royalty in kind. No royalty shall be owed for oil lost prior to delivery or due to casualty.
  3.2 Gas Royalty

  Lessee shall pay to Lessor a royalty equal to ${a.gasRoyaltyPercentage||"_"}% of net proceeds received from the sale of gas. Deductions for transportation and processing are permitted. No royalty is due for gas:
  (a) lost or used in plant operations;
  (b) used for repressurization of oil-bearing formations.
  3.3 Casinghead Gasoline

  If sold, Lessee shall pay Lessor ${a.casingheadGasolinePercentage||"_"}% of net proceeds received from casinghead gasoline. No royalty is due if it is reinjected. Sales must reflect fair market value.
  3.4 Own Use Exemption

  Lessee shall not be required to pay royalty on any hydrocarbons or water used in its operations under this Agreement.

  4. PAYMENT OF ROYALTIES
  All royalties due shall be paid on or before the ${a.paymentDay||"[Insert Day]"} of each month for production during the preceding month. Payments shall be deemed made when deposited in the United States mail, addressed to Lessor. All unpaid royalties shall be settled at year-end.

  5. DEVELOPMENT CLAUSE
  Lessee has paid all rent due for the primary term. If drilling has not commenced by the end of such term, Lessee shall pay annual rentals of $${a.rentalAmount||"0.00"} until drilling begins or the lease is terminated.

  6. PAYMENT METHOD
  Rent and royalties shall be considered paid upon mailing via first-class U.S. mail to Lessor's last known address. Lessor may update their address via written notice.

  7. OWNERSHIP INTEREST
  If Lessor owns less than full title to the Premises or mineral rights, royalties shall be reduced proportionally to reflect actual ownership.

  8. OIL AND GAS DEVELOPMENT
  Lessee shall continue to develop the Premises diligently upon discovery of oil or gas. If gas wells do not produce oil in paying quantities, Lessee may either suspend operations and pay rental of $0.00 per acre annually or seek markets to resume production.

  9. OFFSET WELLS
  Lessee shall drill an offset well if an adjacent well within ${a.offsetWellDistance||"0"} feet of the boundary produces hydrocarbons in paying quantities for over 30 days, and Lessee has not fulfilled its drilling obligations under the Development Clause.

  10. CONDUCT OF OPERATIONS
  Lessee shall bear all costs of operations and perform in a lawful and workmanlike manner. No liens may be placed on the Premises as a result of Lessee's operations.

  11. TAXES
  Lessee shall pay taxes on all improvements and oil stored by it, and ${a.mineralTaxPercentage||"[Insert %]"} of mineral taxes. Lessor shall pay real estate taxes and the remaining mineral taxes.

  12. SURFACE USE
  Lessor may use the surface of the Premises for agricultural or other non-interfering activities.

  13. DEFAULT
  If Lessee defaults in any obligation and fails to cure such default within 15 days of written notice, Lessor may terminate this Lease. However, Lessee shall retain rights to any actively producing or drilling wells and one acre surrounding such wells, including ingress and egress rights.

  14. TERMINATION AND REMOVAL
  Upon termination, Lessee shall vacate and restore the Premises to its original condition, reasonable wear and tear excepted. Lessee may remove all equipment and improvements.

  15. ASSIGNMENT
  Neither party shall assign its interest without prior written consent of the other, which shall not be unreasonably withheld. Notice of assignment must be given in writing.

  16. NOTICES
  All notices shall be in writing and delivered in person or by certified mail to the addresses stated above. Notices shall be deemed received upon delivery or three days after mailing.

  17. BINDING EFFECT
  This Lease shall be binding upon and inure to the benefit of the Parties and their respective heirs, executors, administrators, successors, and assigns.

  18. ATTORNEYS' FEES
  In the event of any legal action arising out of this Lease, the prevailing party shall be entitled to recover reasonable attorneys' fees and costs as determined by the court.

  19. ENTIRE AGREEMENT
  This Agreement constitutes the entire agreement between the Parties concerning the Premises. No oral statements or prior agreements shall have any force. This Lease may only be amended in writing, signed by both Parties.

  IN WITNESS WHEREOF, the Parties have executed this Gas Lease Agreement as of the date first written above.
  LESSOR
  Signature: ___________________________
  Name: ___________________________
  Date: ___________________________
  LESSEE
  Signature: ___________________________
  Name: ___________________________
  Date: ___________________________




  Make It Legal

  This Agreement should be signed in front of a notary public by both parties.
  Once signed in front of a notary, this document should be delivered to the appropriate court for filing.
  Copies
  The original Agreement should be filed with the Clerk of Court or delivered to the requesting business.
  The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.
  Additional Assistance
   If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter`;S(G),s.save("gas-lease-agreement.pdf"),C.success("Document generated successfully!")}catch(s){console.error("Error generating PDF:",s),C.error("Failed to generate document")}finally{v(!1)}},D=()=>{o<4?c(o+1):o===4&&c(5)},R=()=>{o>1&&c(o-1)},F=()=>{switch(o){case 1:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 1: Location Selection"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"country",children:"Country"}),e.jsxs(p,{value:a.selectedCountry,onValueChange:w,children:[e.jsx(y,{children:e.jsx(f,{placeholder:"Select Country"})}),e.jsx(_,{children:j.map(s=>e.jsx(x,{value:s.isoCode,children:s.name},s.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"state",children:"State"}),e.jsxs(p,{value:a.selectedState,onValueChange:P,disabled:!a.selectedCountry,children:[e.jsx(y,{children:e.jsx(f,{placeholder:"Select State"})}),e.jsx(_,{children:b.map(s=>e.jsx(x,{value:s.isoCode,children:s.name},s.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"city",children:"City"}),e.jsxs(p,{value:a.selectedCity,onValueChange:T,disabled:!a.selectedState,children:[e.jsx(y,{children:e.jsx(f,{placeholder:"Select City"})}),e.jsx(_,{children:E.map(s=>e.jsx(x,{value:s.name,children:s.name},s.name))})]})]})]})]});case 2:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 2: Agreement Details & Parties"}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"agreementDate",children:"Agreement Date"}),e.jsx(l,{type:"date",id:"agreementDate",value:a.agreementDate,onChange:s=>r("agreementDate",s.target.value)})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"lessorName",children:"Lessor Name"}),e.jsx(l,{id:"lessorName",value:a.lessorName,onChange:s=>r("lessorName",s.target.value),placeholder:"Enter lessor's full name"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"lesseeName",children:"Lessee Name"}),e.jsx(l,{id:"lesseeName",value:a.lesseeName,onChange:s=>r("lesseeName",s.target.value),placeholder:"Enter lessee's full name"})]})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"lessorAddress",children:"Lessor Address"}),e.jsx(u,{id:"lessorAddress",value:a.lessorAddress,onChange:s=>r("lessorAddress",s.target.value),placeholder:"Enter lessor's complete address",rows:3})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"lesseeAddress",children:"Lessee Address"}),e.jsx(u,{id:"lesseeAddress",value:a.lesseeAddress,onChange:s=>r("lesseeAddress",s.target.value),placeholder:"Enter lessee's complete address",rows:3})]})]});case 3:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 3: Property Details"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"county",children:"County"}),e.jsx(l,{id:"county",value:a.county,onChange:s=>r("county",s.target.value),placeholder:"Enter county name"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"acreage",children:"Acreage"}),e.jsx(l,{id:"acreage",value:a.acreage,onChange:s=>r("acreage",s.target.value),placeholder:"Enter total acres"})]})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"propertyAddress",children:"Property Address"}),e.jsx(l,{id:"propertyAddress",value:a.propertyAddress,onChange:s=>r("propertyAddress",s.target.value),placeholder:"Enter property address"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"legalDescription",children:"Legal Description"}),e.jsx(u,{id:"legalDescription",value:a.legalDescription,onChange:s=>r("legalDescription",s.target.value),placeholder:"Enter detailed legal description of the property",rows:4})]})]});case 4:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 4: Lease Terms & Financial Details"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"annualRental",children:"Annual Rental ($)"}),e.jsx(l,{id:"annualRental",value:a.annualRental,onChange:s=>r("annualRental",s.target.value),placeholder:"0.00"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"leaseTerm",children:"Lease Term (years)"}),e.jsx(l,{id:"leaseTerm",value:a.leaseTerm,onChange:s=>r("leaseTerm",s.target.value),placeholder:"Enter number of years"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"oilRoyaltyPercentage",children:"Oil Royalty (%)"}),e.jsx(l,{id:"oilRoyaltyPercentage",value:a.oilRoyaltyPercentage,onChange:s=>r("oilRoyaltyPercentage",s.target.value),placeholder:"e.g., 12.5"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"gasRoyaltyPercentage",children:"Gas Royalty (%)"}),e.jsx(l,{id:"gasRoyaltyPercentage",value:a.gasRoyaltyPercentage,onChange:s=>r("gasRoyaltyPercentage",s.target.value),placeholder:"e.g., 12.5"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"casingheadGasolinePercentage",children:"Casinghead Gasoline (%)"}),e.jsx(l,{id:"casingheadGasolinePercentage",value:a.casingheadGasolinePercentage,onChange:s=>r("casingheadGasolinePercentage",s.target.value),placeholder:"e.g., 12.5"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"paymentDay",children:"Payment Day"}),e.jsx(l,{id:"paymentDay",value:a.paymentDay,onChange:s=>r("paymentDay",s.target.value),placeholder:"e.g., 25th"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"rentalAmount",children:"Annual Rental Amount ($)"}),e.jsx(l,{id:"rentalAmount",value:a.rentalAmount,onChange:s=>r("rentalAmount",s.target.value),placeholder:"0.00"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(t,{htmlFor:"offsetWellDistance",children:"Offset Well Distance (feet)"}),e.jsx(l,{id:"offsetWellDistance",value:a.offsetWellDistance,onChange:s=>r("offsetWellDistance",s.target.value),placeholder:"e.g., 1000"})]}),e.jsxs("div",{children:[e.jsx(t,{htmlFor:"mineralTaxPercentage",children:"Mineral Tax Percentage (%)"}),e.jsx(l,{id:"mineralTaxPercentage",value:a.mineralTaxPercentage,onChange:s=>r("mineralTaxPercentage",s.target.value),placeholder:"e.g., 50"})]})]})]});default:return null}};return o===5?e.jsx(Z,{onBack:()=>c(4),onGenerate:A,documentType:"Gas Lease Agreement",isGenerating:N}):e.jsx("div",{className:"bg-gray-50",children:e.jsxs("div",{className:"max-w-4xl mx-auto p-6",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(W,{className:"h-8 w-8 text-blue-600"}),e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Gas Lease Agreement"})]}),e.jsx("p",{className:"text-gray-600",children:"Create a comprehensive gas lease agreement for mineral rights and energy exploration"})]}),e.jsxs(U,{children:[e.jsx(q,{children:e.jsxs(V,{className:"flex items-center justify-between",children:[e.jsx("span",{children:"Gas Lease Agreement Form"}),e.jsxs("span",{className:"text-sm font-normal text-gray-500",children:["Step ",o," of ",L]})]})}),e.jsxs(H,{children:[F(),o!==5&&e.jsxs("div",{className:"flex justify-between mt-8",children:[e.jsxs(g,{type:"button",variant:"outline",onClick:R,disabled:o===1,children:[e.jsx(Y,{className:"w-4 h-4 mr-2"}),"Previous"]}),o<4?e.jsxs(g,{type:"button",onClick:D,children:["Next",e.jsx(z,{className:"w-4 h-4 ml-2"})]}):e.jsxs(g,{type:"button",onClick:A,children:["Generate PDF",e.jsx(B,{className:"w-4 h-4 ml-2"})]})]})]})]})]})})};export{de as default};
