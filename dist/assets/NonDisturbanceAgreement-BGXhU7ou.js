import{r as m,j as e,F as O,C as Y,k as H,l as W,b as B,a as _,A as z,d as V,aQ as q,J as N}from"./index-EUBTzQul.js";import{I as i}from"./input-BXL43AC-.js";import{L as n}from"./label-9rsijxaJ.js";import{T as c}from"./textarea-Dfjbmtdk.js";import{S as J,C as U,a as Q}from"./city-B5NRDuuX.js";import{S as u,a as p,b as f,c as x,d as y}from"./select-fj3w0PNH.js";import{E as K}from"./jspdf.es.min-CJIQpcZG.js";import{a as X}from"./LegalConcernsSection-Bzwy_II7.js";import{U as Z}from"./UserInfoStep-nEfX4EqD.js";import"./alert-DCklxFGe.js";const he=()=>{const[s,h]=m.useState(1),[a,g]=m.useState({agreementDay:"",agreementMonth:"",agreementYear:"",mortgageeName:"",mortgageeAddress:"",tenantName:"",tenantAddress:"",leaseDate:"",landlordName:"",landlordAddress:"",legalDescription:"",propertyAddress:"",mortgageeSignerName:"",mortgageeSignerTitle:"",mortgageeSignatureDate:"",tenantSignerName:"",tenantSignerTitle:"",tenantSignatureDate:"",selectedCountry:"",selectedState:"",selectedCity:""}),[A,j]=m.useState(!1),S=Q.getAllCountries(),C=a.selectedCountry?J.getStatesOfCountry(a.selectedCountry):[],T=a.selectedState?U.getCitiesOfState(a.selectedCountry,a.selectedState):[],r=(t,o)=>{g(l=>({...l,[t]:o}))},D=t=>{g(o=>({...o,selectedCountry:t,selectedState:"",selectedCity:""}))},w=t=>{g(o=>({...o,selectedState:t,selectedCity:""}))},E=t=>{g(o=>({...o,selectedCity:t}))},b=()=>{j(!0);try{const t=new K,o=t.internal.pageSize.width,l=20,I=6;let d=l;const v=(R,$=10,k=!1)=>{t.setFontSize($),t.setFont("helvetica",k?"bold":"normal"),t.splitTextToSize(R,o-2*l).forEach(G=>{d>t.internal.pageSize.height-l&&(t.addPage(),d=l),t.text(G,l,d),d+=I})};v("NON-DISTURBANCE AGREEMENT",14,!0),d+=10;const P=`This Agreement ("Agreement") is made and entered into on the ${a.agreementDay||"___"} day of ${a.agreementMonth||"_______"}, ${a.agreementYear||"20__"}, by and between

${a.mortgageeName||"[Insert Mortgagee Name]"}, of ${a.mortgageeAddress||"[Insert Address]"} (hereinafter referred to as the "Mortgagee"),
And
${a.tenantName||"[Insert Tenant Name]"}, of ${a.tenantAddress||"[Insert Address]"} (hereinafter referred to as the "Tenant").

RECITALS

WHEREAS, Tenant entered into a lease agreement (the "Lease") dated ${a.leaseDate||"__________"}, with ${a.landlordName||"[Insert Landlord Name]"} (the "Landlord"), of ${a.landlordAddress||"[Insert Landlord Address]"}, for the lease of a portion of the real property legally described as ${a.legalDescription||"[Insert Legal Description]"}, commonly known as ${a.propertyAddress||"[Insert Property Address]"} (the "Real Property");

WHEREAS, Mortgagee has made a loan to Landlord secured, in part, by a mortgage (the "Mortgage") encumbering the Real Property;

WHEREAS, Tenant has agreed to subordinate its leasehold interest to the Mortgage in exchange for the Mortgagee's agreement not to disturb Tenant's possession of the Real Property under the Lease so long as Tenant is not in default under the terms of the Lease.

AGREEMENT

NOW, THEREFORE, in consideration of the mutual covenants herein and intending to be legally bound, the parties agree as follows:

1. Subordination
Tenant agrees that the Lease, and all rights of the Tenant under it, shall be and remain subordinate in all respects to the lien, terms, and conditions of the Mortgage, including any renewals, extensions, modifications, replacements, or consolidations thereof, and to any future mortgage or mortgages placed on the Real Property by or through the Mortgagee.

2. Non-Disturbance
Provided Tenant is not in default under the Lease beyond applicable notice and cure periods, the Mortgagee agrees that:
(a) The Lease shall not be terminated,
(b) Tenant's possession, use, or enjoyment of the Premises shall not be disturbed, and
(c) The leasehold estate shall not otherwise be affected
in the event of foreclosure or any action or proceeding under or related to the Mortgage, or in the event the Mortgagee takes possession of the Real Property.

Notwithstanding the foregoing, any person or entity acquiring the interest of the Landlord as a result of such foreclosure or proceeding, including their successors and assigns (collectively, the "Purchaser"), shall not be:
(a) liable for any act or omission of any prior landlord;
(b) subject to any defenses or offsets Tenant may have against any prior landlord;
(c) bound by any rent prepayment exceeding one month; or
(d) bound by any amendment or modification of the Lease made without the Mortgagee's prior written consent.

3. Attornment
In the event of a transfer of the Landlord's interest by foreclosure, deed in lieu of foreclosure, or otherwise, Tenant agrees to attorn to and recognize the Purchaser (including the Mortgagee, if applicable) as its landlord under the Lease. Such attornment shall be effective automatically and without the execution of any further instrument. Following such attornment, the Lease shall remain in full force and effect between the Purchaser and Tenant, with the same terms, covenants, and conditions as though the Purchaser were the original landlord.

4. Successors and Assigns
This Agreement shall be binding upon and inure to the benefit of the parties hereto, and their respective successors, legal representatives, and assigns.

5. Execution
This Agreement may be executed in counterparts, each of which shall constitute an original, but all of which together shall constitute one and the same instrument. Facsimile or electronic signatures shall be deemed to have the same force and effect as originals.

IN WITNESS WHEREOF, the undersigned have executed this Lease Subordination and Non-Disturbance Agreement as of the date first written above.

MORTGAGEE:

By: ___________________________
Name: ${a.mortgageeSignerName||"________________________"}
Title: ${a.mortgageeSignerTitle||"_________________________"}
Date: ${a.mortgageeSignatureDate||"_________________________"}

TENANT:

By: ___________________________
Name: ${a.tenantSignerName||"________________________"}
Title: ${a.tenantSignerTitle||"_________________________"}
Date: ${a.tenantSignatureDate||"_________________________"}

Make It Legal

This Agreement should be signed in front of a notary public.
Once signed in front of a notary, this document should be delivered to the appropriate court for filing.

Copies
The original Agreement should be filed with the Clerk of Court or delivered to the requesting business.
The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.

Additional Assistance
If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.`;v(P),t.save("non-disturbance-agreement.pdf"),N.success("Document generated successfully!")}catch(t){console.error("Error generating PDF:",t),N.error("Failed to generate document")}finally{j(!1)}},F=()=>{s<4?h(s+1):s===4&&h(5)},L=()=>{s>1&&h(s-1)},M=()=>{switch(s){case 1:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 1: Location Selection"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"country",children:"Country"}),e.jsxs(u,{value:a.selectedCountry,onValueChange:D,children:[e.jsx(p,{children:e.jsx(f,{placeholder:"Select Country"})}),e.jsx(x,{children:S.map(t=>e.jsx(y,{value:t.isoCode,children:t.name},t.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"state",children:"State"}),e.jsxs(u,{value:a.selectedState,onValueChange:w,disabled:!a.selectedCountry,children:[e.jsx(p,{children:e.jsx(f,{placeholder:"Select State"})}),e.jsx(x,{children:C.map(t=>e.jsx(y,{value:t.isoCode,children:t.name},t.isoCode))})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"city",children:"City"}),e.jsxs(u,{value:a.selectedCity,onValueChange:E,disabled:!a.selectedState,children:[e.jsx(p,{children:e.jsx(f,{placeholder:"Select City"})}),e.jsx(x,{children:T.map(t=>e.jsx(y,{value:t.name,children:t.name},t.name))})]})]})]})]});case 2:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 2: Agreement Date & Basic Information"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"agreementDay",children:"Day"}),e.jsx(i,{id:"agreementDay",value:a.agreementDay,onChange:t=>r("agreementDay",t.target.value),placeholder:"e.g., 15"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"agreementMonth",children:"Month"}),e.jsx(i,{id:"agreementMonth",value:a.agreementMonth,onChange:t=>r("agreementMonth",t.target.value),placeholder:"e.g., January"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"agreementYear",children:"Year"}),e.jsx(i,{id:"agreementYear",value:a.agreementYear,onChange:t=>r("agreementYear",t.target.value),placeholder:"e.g., 2025"})]})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"mortgageeName",children:"Mortgagee Name"}),e.jsx(i,{id:"mortgageeName",value:a.mortgageeName,onChange:t=>r("mortgageeName",t.target.value),placeholder:"Enter mortgagee's full name"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"mortgageeAddress",children:"Mortgagee Address"}),e.jsx(c,{id:"mortgageeAddress",value:a.mortgageeAddress,onChange:t=>r("mortgageeAddress",t.target.value),placeholder:"Enter complete mortgagee address",rows:3})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"tenantName",children:"Tenant Name"}),e.jsx(i,{id:"tenantName",value:a.tenantName,onChange:t=>r("tenantName",t.target.value),placeholder:"Enter tenant's full name"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"tenantAddress",children:"Tenant Address"}),e.jsx(c,{id:"tenantAddress",value:a.tenantAddress,onChange:t=>r("tenantAddress",t.target.value),placeholder:"Enter complete tenant address",rows:3})]})]});case 3:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 3: Lease Information"}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"leaseDate",children:"Lease Agreement Date"}),e.jsx(i,{type:"date",id:"leaseDate",value:a.leaseDate,onChange:t=>r("leaseDate",t.target.value)})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"landlordName",children:"Landlord Name"}),e.jsx(i,{id:"landlordName",value:a.landlordName,onChange:t=>r("landlordName",t.target.value),placeholder:"Enter landlord's full name"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"landlordAddress",children:"Landlord Address"}),e.jsx(c,{id:"landlordAddress",value:a.landlordAddress,onChange:t=>r("landlordAddress",t.target.value),placeholder:"Enter complete landlord address",rows:3})]})]});case 4:return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Step 4: Property Information"}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"legalDescription",children:"Legal Description of Property"}),e.jsx(c,{id:"legalDescription",value:a.legalDescription,onChange:t=>r("legalDescription",t.target.value),placeholder:"Enter the complete legal description of the property",rows:4})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"propertyAddress",children:"Property Address (commonly known as)"}),e.jsx(c,{id:"propertyAddress",value:a.propertyAddress,onChange:t=>r("propertyAddress",t.target.value),placeholder:"Enter the complete property address",rows:3})]})]});case 5:return e.jsx(Z,{onBack:()=>h(4),onGenerate:b,documentType:"Non-Disturbance Agreement",isGenerating:A});default:return null}};return e.jsx("div",{className:"bg-gray-50",children:e.jsxs("div",{className:"max-w-4xl mx-auto p-6",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(O,{className:"h-8 w-8 text-blue-600"}),e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Non-Disturbance Agreement"})]}),e.jsx("p",{className:"text-gray-600 mb-4",children:"Create a professional non-disturbance agreement between mortgagee and tenant"}),e.jsx(X,{})]}),e.jsxs(Y,{children:[e.jsx(H,{children:e.jsxs(W,{className:"flex items-center justify-between",children:[e.jsx("span",{children:"Non-Disturbance Agreement Form"}),e.jsxs("span",{className:"text-sm font-normal text-gray-500",children:["Step ",s," of 5"]})]})}),e.jsxs(B,{children:[M(),s!==5&&e.jsxs("div",{className:"flex justify-between mt-8",children:[e.jsxs(_,{type:"button",variant:"outline",onClick:L,disabled:s===1,children:[e.jsx(z,{className:"w-4 h-4 mr-2"}),"Previous"]}),s<5?e.jsxs(_,{type:"button",onClick:F,children:["Next",e.jsx(V,{className:"w-4 h-4 ml-2"})]}):e.jsxs(_,{type:"button",onClick:b,children:["Generate PDF",e.jsx(q,{className:"w-4 h-4 ml-2"})]})]})]})]})]})})};export{he as default};
