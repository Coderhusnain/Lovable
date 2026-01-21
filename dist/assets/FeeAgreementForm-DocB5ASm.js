import{u as E,r as _,j as t,a as u,C as c,b as l,F as R}from"./index-Bvx_DJOQ.js";import{L as r}from"./label-BgGH2qdj.js";import{I as s}from"./input-DxWpxYcw.js";import{T as h}from"./textarea-CQyr-wjF.js";import{E as F}from"./jspdf.es.min-D4YI3ioX.js";function k(){const b=E(),[n,x]=_.useState({effectiveDate:"",recipientName:"",recipientAddress:"",providerName:"",providerAddress:"",servicesDesc:"",totalFee:"",depositAmount:"",depositDate:"",terminationDate:"",noticeDays:"",cureDays:"",jurisdiction:"",arbitration:"",changeOrderProcess:"",signRecipientName:"",signRecipientDate:"",signProviderName:"",signProviderDate:""}),[p,y]=_.useState(1),[j,D]=_.useState(!1),i=a=>{const{name:m,value:o}=a.target;x(f=>({...f,[m]:o}))},A=()=>{const a=new F({unit:"pt",format:"a4"}),m=a.internal.pageSize.getWidth(),o=40,f=m-o*2;let d=o;const e=(N,g=11,w=!1,S=!1)=>{a.setFont("times",w?"bold":"normal"),a.setFontSize(g),a.splitTextToSize(N,f).forEach(v=>{if(d>a.internal.pageSize.getHeight()-o&&(a.addPage(),d=o),S){const C=a.getStringUnitWidth(v)*g/a.internal.scaleFactor,T=(m-C)/2;a.text(v,T,d)}else a.text(v,o,d);d+=g*1.35})};e("FEE AGREEMENT",14,!0,!0),e(`
`),e(`This Fee Agreement ("Agreement") is made and entered into as of ${n.effectiveDate||"[Effective Date]"} (the "Effective Date"), by and between:`),e(`
`),e(`Recipient: ${n.recipientName||"[Recipient Name]"}`),e(`Address: ${n.recipientAddress||"[Address]"}`),e(`
`),e(`Provider: ${n.providerName||"[Provider Name]"}`),e(`Address: ${n.providerAddress||"[Address]"}`),e(`
`),e("I. DESCRIPTION OF SERVICES",12,!0),e(`Commencing from the Effective Date, the Provider shall render to the Recipient the following services (collectively, the "Services"):
${n.servicesDesc||"[Detailed description of services to be provided]."}`),e(`
`),e("II. FINANCIAL TERMS",12,!0),e(`1. Compensation
In consideration of the Services rendered under this Agreement, the Recipient shall pay the Provider a total fee of USD ${n.totalFee||"[Amount]"}, payable as a lump sum upon completion of the Services, unless otherwise mutually agreed in writing.`),e(`
`),e(`2. Deposit
Upon execution of this Agreement, the Recipient shall pay the Provider a deposit in the amount of USD ${n.depositAmount||"[Amount]"} on or before ${n.depositDate||"[Date]"}.`),e(`(a) The deposit shall be credited toward the final amount payable.
(b) The deposit shall be non-refundable, except where this Agreement is cancelled by the Provider or where the Provider is unable to perform the Services for any reason.`),e(`
`),e("III. TERM, TERMINATION, AND DEFAULT",12,!0),e(`1. Term
This Agreement shall commence on the Effective Date and shall remain in full force and effect until ${n.terminationDate||"[Termination Date]"}, unless terminated earlier in accordance with the provisions herein.`),e(`
`),e(`2. Early Termination
Either Party may terminate this Agreement prior to the Termination Date, with or without cause, by providing ${n.noticeDays||"[Number]"} days' written notice to the other Party.
Upon Early Termination:
• The Provider shall be entitled to receive pro-rated payment for Services performed up to the effective date of termination.
• Notice of termination may be delivered via email, which shall be deemed valid and sufficient.`),e(`
`),e(`3. Material Default
The following shall constitute a material default under this Agreement:
(a) Failure to make any payment when due;
(b) Insolvency or bankruptcy of either Party;
(c) Attachment, seizure, levy, or legal proceedings against the property or assets of either Party;
(d) Failure to perform or deliver the Services in the manner and timeframe stipulated herein.`),e(`
`),e(`4. Remedies for Default
Upon occurrence of a material default, the non-defaulting Party may issue written notice specifying the nature of the default. The defaulting Party shall have ${n.cureDays||"[Number]"} days from receipt of such notice to cure the default. Failure to cure within the prescribed period shall result in automatic termination of this Agreement, unless such default is formally waived in writing by the non-defaulting Party.`),e(`
`),e(`5. Force Majeure
Neither Party shall be liable for failure or delay in performance caused by circumstances beyond its reasonable control ("Force Majeure"), including but not limited to acts of God, pandemics, epidemics, war, civil unrest, natural disasters, strikes, or governmental actions. The affected Party shall use all reasonable efforts to mitigate and resume performance as soon as practicable.`),e(`
`),e("IV. SERVICE AND LEGAL PROVISIONS",12,!0),e(`1. Relationship of Parties
The Provider shall act as an independent contractor, and nothing contained herein shall be deemed to create an employer-employee, agency, partnership, or joint venture relationship between the Parties.`),e(`
`),e(`2. Warranty of Services
The Provider warrants that all Services shall be performed in a timely, competent, and professional manner in accordance with generally accepted standards.`),e(`
`),e(`3. Compliance with Laws
The Provider shall comply with all applicable federal, provincial/state, county, and municipal laws, ordinances, regulations, and statutory requirements.`),e(`
`),e(`4. Ownership of Work Product
All work product, including but not limited to designs, concepts, inventions, documents, intellectual property, and copyrightable materials created by the Provider in connection with the Services shall vest exclusively in the Recipient.`),e(`
`),e(`5. Indemnification
The Provider agrees to indemnify, defend, and hold harmless the Recipient from and against any claims, damages, losses, liabilities, costs, or expenses arising out of or resulting from the negligent acts, omissions, or misconduct of the Provider or its representatives.`),e(`
`),e(`6. Confidentiality
The Provider shall not, at any time, disclose, disseminate, or use for personal benefit any confidential or proprietary information of the Recipient. This obligation shall survive the termination or expiration of this Agreement.`),e(`
`),e("V. MISCELLANEOUS PROVISIONS",12,!0),e(`1. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of ${n.jurisdiction||"[Jurisdiction]"}.`),e(`
`),e(`2. Binding Arbitration
Any dispute arising out of or in connection with this Agreement that cannot be resolved amicably shall be referred to and finally resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitrator’s decision shall be final and binding on the Parties. ${n.arbitration||""}`),e(`
`),e(`3. Assignment
Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party.`),e(`
`),e(`4. Change Orders
Any modification to the scope of Services shall be documented through a written change order, duly signed and dated by both Parties, specifying the nature of the change and any adjustment to remuneration. Such change order shall form part of this Agreement.`),n.changeOrderProcess&&e(`
Process: ${n.changeOrderProcess}`),e(`
`),e(`5. Waiver
Failure by either Party to enforce any provision shall not be deemed a waiver of its right to enforce such provision at a later time.`),e(`
`),e(`6. Amendments
This Agreement may be amended only by a written instrument duly executed by both Parties.`),e(`
`),e(`7. Entire Agreement
This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, communications, or agreements, whether written or oral.`),e(`
`),e(`8. Severability
If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be deemed severed, and the remaining provisions shall continue in full force and effect.`),e(`
`),e(`9. Notices
Any notice required under this Agreement shall be deemed duly given if delivered personally or sent by certified mail, return receipt requested, to the addresses stated above, or to such other address as may be notified in writing by either Party.`),e(`
`),e("VI. SIGNATURES",12,!0),e("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the date first written above."),e(`
`),e(`For the Recipient:
Name: ${n.signRecipientName||"________________________"}
Signature: _______________________
Date: ${n.signRecipientDate||"_____________________"}`),e(`
`),e(`For the Provider:
Name: ${n.signProviderName||"________________________"}
Signature: _______________________
Date: ${n.signProviderDate||"_____________________"}`),a.save("Fee_Agreement.pdf"),D(!0)},P=()=>{switch(p){case 1:return t.jsx(c,{children:t.jsxs(l,{className:"space-y-3",children:[t.jsx("div",{className:"mt-3",children:t.jsxs(u,{variant:"outline",size:"sm",onClick:()=>b("/fee-agreement-info"),className:"text-orange-600 border-orange-200  hover:border-orange-300",children:[t.jsx(R,{className:"w-4 h-4 mr-2"}),"Learn More About Fee Agreement"]})}),t.jsx("h3",{className:"font-semibold",children:"Parties & Dates"}),t.jsx(r,{children:"Effective Date"}),t.jsx(s,{name:"effectiveDate",value:n.effectiveDate,onChange:i}),t.jsx(r,{children:"Recipient Name"}),t.jsx(s,{name:"recipientName",value:n.recipientName,onChange:i}),t.jsx(r,{children:"Recipient Address"}),t.jsx(h,{name:"recipientAddress",value:n.recipientAddress,onChange:i}),t.jsx(r,{children:"Provider Name"}),t.jsx(s,{name:"providerName",value:n.providerName,onChange:i}),t.jsx(r,{children:"Provider Address"}),t.jsx(h,{name:"providerAddress",value:n.providerAddress,onChange:i})]})});case 2:return t.jsx(c,{children:t.jsxs(l,{className:"space-y-3",children:[t.jsx("h3",{className:"font-semibold",children:"Services & Payment"}),t.jsx(r,{children:"Services Description"}),t.jsx(h,{name:"servicesDesc",value:n.servicesDesc,onChange:i}),t.jsx(r,{children:"Total Fee (USD)"}),t.jsx(s,{name:"totalFee",value:n.totalFee,onChange:i}),t.jsx(r,{children:"Deposit Amount (USD)"}),t.jsx(s,{name:"depositAmount",value:n.depositAmount,onChange:i}),t.jsx(r,{children:"Deposit Date"}),t.jsx(s,{name:"depositDate",value:n.depositDate,onChange:i}),t.jsx(r,{children:"Termination Date"}),t.jsx(s,{name:"terminationDate",value:n.terminationDate,onChange:i})]})});case 3:return t.jsx(c,{children:t.jsxs(l,{className:"space-y-3",children:[t.jsx("h3",{className:"font-semibold",children:"Legal & Misc"}),t.jsx(r,{children:"Notice Days for Early Termination"}),t.jsx(s,{name:"noticeDays",value:n.noticeDays,onChange:i}),t.jsx(r,{children:"Cure Period (days)"}),t.jsx(s,{name:"cureDays",value:n.cureDays,onChange:i}),t.jsx(r,{children:"Governing Jurisdiction"}),t.jsx(s,{name:"jurisdiction",value:n.jurisdiction,onChange:i}),t.jsx(r,{children:"Arbitration / Dispute Notes"}),t.jsx(h,{name:"arbitration",value:n.arbitration,onChange:i}),t.jsx(r,{children:"Change Order Process (short)"}),t.jsx(h,{name:"changeOrderProcess",value:n.changeOrderProcess,onChange:i})]})});case 4:return t.jsx(c,{children:t.jsxs(l,{className:"space-y-3",children:[t.jsx("h3",{className:"font-semibold",children:"Signatures"}),t.jsx(r,{children:"Recipient - Name"}),t.jsx(s,{name:"signRecipientName",value:n.signRecipientName,onChange:i}),t.jsx(r,{children:"Recipient - Date"}),t.jsx(s,{name:"signRecipientDate",value:n.signRecipientDate,onChange:i}),t.jsx(r,{children:"Provider - Name"}),t.jsx(s,{name:"signProviderName",value:n.signProviderName,onChange:i}),t.jsx(r,{children:"Provider - Date"}),t.jsx(s,{name:"signProviderDate",value:n.signProviderDate,onChange:i})]})});default:return null}};return t.jsxs("div",{className:"p-6 max-w-4xl mx-auto space-y-4",children:[P(),t.jsxs("div",{className:"flex justify-between pt-4",children:[t.jsx(u,{disabled:p===1,onClick:()=>y(a=>Math.max(1,a-1)),children:"Back"}),p<4?t.jsx(u,{onClick:()=>y(a=>Math.min(4,a+1)),children:"Next"}):t.jsx("div",{className:"space-x-2",children:t.jsx(u,{onClick:A,children:"Generate PDF"})})]}),j&&t.jsx(c,{children:t.jsx(l,{children:t.jsx("div",{className:"text-green-600 font-semibold",children:"Fee Agreement PDF Generated Successfully"})})})]})}export{k as default};
