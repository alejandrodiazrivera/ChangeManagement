import{i as e,n as t,t as n}from"./jsx-runtime-Cltr0gcK.js";import{n as r}from"./index-DIAkbKpT.js";import{n as i,t as a}from"./Card-DdVlShVN.js";import{a as o,i as s,n as c,o as l,r as u,t as d}from"./Table-CTx8YcCm.js";import{t as f}from"./Badge-Bj4suHmo.js";import{n as p,t as m}from"./trash-ClLh45-M.js";var h={name:`pencil`,size:24,node:[[`path`,{d:`M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z`,key:`1a8usu`}],[`path`,{d:`m15 5 4 4`,key:`1mk7zo`}]]};h.node;var g=p(h),_=e(t(),1),v=n(),y=[`Very Supportive`,`Supportive`,`Mixed`,`Resistant`,`Very Resistant`,`Other`].reduce((e,t,n)=>(e[t]=n,e),{}),b=e=>y[e]??0,x=(e,t)=>{let n=b(t),r=n===0,i=n===1,a=n===2,o=n>=3;if(e===`High`){if(r||i)return`Collaborate`;if(a)return`Engage`;if(o)return`Convert`}if(e===`Medium`){if(r||i)return`Involve`;if(a)return`Keep Informed`;if(o)return`Intensive Engagement`}if(e===`Low`){if(r||i)return`Keep Satisfied`;if(a)return`Keep Informed`;if(o)return`Monitor`}return`Monitor`},S=[`High`,`Medium`,`Low`],C=[`Very Supportive`,`Supportive`,`Mixed`,`Resistant`,`Very Resistant`,`Other`],w=`Executive Sponsor.Senior Leader.Business Lead.Change Owner.Process Owner.Project Manager.Change Manager.Product Owner.Business Analyst.Team Manager.People Manager.Subject Matter Expert.End User.Super User.Change Champion.Key Influencer.Trainer.Communications Lead.HR / People Partner.IT / Technical Owner.IT Support.Data Owner.Compliance / Legal.Procurement.Vendor / External Partner.Customer.Regulator.Other`.split(`.`),T=()=>{let{stakeholders:e,addStakeholder:t,updateStakeholder:n,deleteStakeholder:p}=r(),[h,y]=(0,_.useState)(null),[T,E]=(0,_.useState)(w),[D,O]=(0,_.useState)(``),[k,A]=(0,_.useState)([]),[j,M]=(0,_.useState)(null),[N,P]=(0,_.useState)(null),F=(0,_.useRef)({}),I=e=>{M(t=>!t||t.key!==e?{key:e,direction:`asc`}:t.direction===`asc`?{key:e,direction:`desc`}:null)},L=(e,t)=>{switch(e){case`name`:return t.name||``;case`impact`:return t.impact||``;case`influence`:return t.influence||``;case`attitude`:return t.attitude||``;case`strategy`:return x(t.influence,t.attitude);default:return``}},R=(e,t)=>{A(n=>t?n.includes(e)?n.filter(t=>t!==e):[...n,e]:n.includes(e)&&n.length===1?[]:[e])},z=[...e.filter(e=>[e.name,e.role,e.impact,e.influence,e.attitude,x(e.influence,e.attitude)].join(` `).toLowerCase().includes(D.trim().toLowerCase()))].sort((e,t)=>{if(!j||!j.direction)return 0;let n=j.direction===`asc`?1:-1,r=L(j.key,e),i=L(j.key,t),a={High:3,Medium:2,Low:1},o=j.key===`impact`||j.key===`influence`;return j.key===`attitude`?(b(String(r))-b(String(i)))*n:o?((a[r]??0)-(a[i]??0))*n:String(r).localeCompare(String(i))*n}),B=()=>{let e=t();O(``),y(e),requestAnimationFrame(()=>{F.current[e]?.scrollIntoView({behavior:`smooth`,block:`center`})})},V=e=>{p(e),h===e&&y(null)},H=e.filter(e=>e.impact===`High`&&[`Resistant`,`Very Resistant`].includes(e.attitude)),U=e.filter(e=>e.impact===`High`&&[`Mixed`,`Resistant`].includes(e.attitude)||e.impact===`Medium`&&[`Resistant`,`Very Resistant`,`Mixed`].includes(e.attitude)),W=(0,_.useRef)(null);return(0,_.useEffect)(()=>{let t=!0,n=null;return new Promise(e=>{if(window.Plotly)return e(window.Plotly);let t=document.createElement(`script`);t.src=`https://cdn.plot.ly/plotly-2.27.0.min.js`,t.async=!0,t.onload=()=>e(window.Plotly),document.head.appendChild(t)}).then(r=>{if(!t||!W.current)return;let i=e=>(b(e),e===`Very Supportive`?4:e===`Supportive`?2:e===`Mixed`?0:e===`Resistant`?-2:e===`Very Resistant`?-4:0),a=e=>e===`High`?4.6:e===`Medium`?3:1.4,o=e=>e===`High`?88:e===`Medium`?55:25,s={"Very Supportive":`#16a34a`,Supportive:`#22c55e`,Mixed:`#f59e0b`,Resistant:`#f97316`,"Very Resistant":`#dc2626`,Other:`#64748b`},c=e=>{let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n);return Math.abs(Math.sin(t))},l=e=>(c(e)-.5)*1.6,u=e=>(c(e+`y`)-.5)*.8,d=new Set(k),f=e.map((e,t)=>{let n=`${e.id}-${e.name}-${t}`,r=l(n),c=u(n),f=d.has(e.id),p=Math.sqrt(o(e.impact))*1.8+4;return{name:e.name||`New stakeholder`,role:e.role||``,attitude:e.attitude,influence:e.influence,impact:e.impact,x:i(e.attitude)+r,y:a(e.influence)+c,jx:r,jy:c,size:p,highlightedSize:f?p*1.25:p,color:s[e.attitude]||`#64748b`,isSelected:f}}),p=f.map(e=>`<b>${e.name}</b> (${e.role})<br>Attitude: ${e.attitude}<br>Influence: ${e.influence}<br>Impact: ${e.impact}<br><b>Strategy: ${x(e.influence,e.attitude)}</b>`),m={x:f.map(e=>e.x),y:f.map(e=>e.y),mode:`markers+text`,text:f.map(e=>e.name),textposition:f.map(e=>e.jx&&e.jx>0?`top right`:`top left`),textfont:{size:11},hoverinfo:`text`,hovertext:p,marker:{size:f.map(e=>e.isSelected?e.highlightedSize:e.size),color:f.map(e=>e.color),line:{color:f.map(e=>e.isSelected?`#0f172a`:`rgba(255,255,255,0.9)`),width:f.map(e=>e.isSelected?4:1.5)},opacity:f.map(e=>e.isSelected?1:.8),sizemode:`area`},showlegend:!1},h={xaxis:{title:null,range:[-6,6],zeroline:!1,showticklabels:!1,ticks:``},yaxis:{title:null,range:[.5,5.5],zeroline:!1,showticklabels:!1,ticks:``},margin:{l:30,r:20,t:30,b:30},paper_bgcolor:`rgba(0,0,0,0)`,plot_bgcolor:`rgba(0,0,0,0)`,annotations:[{x:-4,y:4.6,label:`CONVERT`},{x:0,y:4.6,label:`ENGAGE`},{x:4,y:4.6,label:`COLLABORATE`},{x:-4,y:3,label:`INTENSIVE<br>ENGAGEMENT`},{x:0,y:3,label:`KEEP<br>INFORMED`},{x:4,y:3,label:`INVOLVE`},{x:-4,y:1.4,label:`MONITOR`},{x:0,y:1.4,label:`KEEP<br>INFORMED`},{x:4,y:1.4,label:`KEEP<br>SATISFIED`}].map(e=>({x:e.x,y:e.y,text:`<i>${e.label}</i>`,showarrow:!1,font:{size:20,color:`rgba(18, 114, 218, 0.46)`,weight:800,family:`Segoe UI, sans-serif`},xanchor:`center`,yanchor:`middle`})),shapes:[{type:`line`,x0:-2,y0:.5,x1:-2,y1:5.5,line:{color:`#c5d0e3`,width:1.5,dash:`dash`}},{type:`line`,x0:2,y0:.5,x1:2,y1:5.5,line:{color:`#c5d0e3`,width:1.5,dash:`dash`}},{type:`line`,x0:-6,y0:2.33,x1:6,y1:2.33,line:{color:`#c5d0e3`,width:1.5,dash:`dash`}},{type:`line`,x0:-6,y0:3.66,x1:6,y1:3.66,line:{color:`#c5d0e3`,width:1.5,dash:`dash`}}],hovermode:`closest`};try{r.newPlot(W.current,[m],h,{responsive:!0,displayModeBar:!1});let e=W.current;e&&window.Plotly&&typeof ResizeObserver<`u`&&(n=new ResizeObserver(()=>{try{window.Plotly.Plots.resize(e)}catch{}}),n.observe(e))}catch{}}),()=>{if(t=!1,W.current&&window.Plotly)try{window.Plotly.purge(W.current)}catch{}if(n)try{n.disconnect()}catch{}}},[e,k]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`style`,{children:`
        .stakeholders-analysis-card {
          padding: 20px;
        }

        .stakeholders-analysis-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .stakeholders-analysis-toolbar h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }

        .stakeholders-analysis-toolbar span {
          display: block;
          margin: 0 0 0 8px;
          color: #6b7280;
          font-size: 13px;
        }

        .stakeholders-analysis-search {
          min-width: 220px !important;
          height: 24px !important;
          padding: 0 6px !important;
          border: 1px solid transparent !important;
          border-radius: 4px !important;
          background: transparent !important;
          color: #1a1d21 !important;
          font-size: 13px !important;
        }

        .stakeholders-analysis-search:hover,
        .stakeholders-analysis-search:focus {
          background: #f0f1f3 !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          outline: none;
        }

        .stakeholders-table-wrap {
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
          overflow: hidden;
        }

        .stakeholders-table-wrap table {
          min-width: 0 !important;
          table-layout: fixed;
          font-size: 13px !important;
        }

        .stakeholders-table-wrap th,
        .stakeholders-table-wrap td {
          height: 32px !important;
          padding: 0 8px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          line-height: 1 !important;
          letter-spacing: -0.01em;
        }

        .stakeholders-table-wrap th {
          height: 28px !important;
          background: #fafafa !important;
          color: #6b7280 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.02em !important;
        }

        .stakeholders-table-wrap th > button {
          color: #6b7280 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.02em !important;
          text-transform: uppercase;
        }

        .stakeholders-table-wrap tbody tr {
          transition: background 80ms ease;
        }

        .stakeholders-table-wrap tbody tr:hover {
          background: #f0f1f3 !important;
        }

        .stakeholders-table-wrap tbody tr:last-child td {
          border-bottom: 0 !important;
        }

        .stakeholders-table-wrap td:first-child {
          width: 28%;
        }

        .stakeholders-table-wrap td:nth-child(2),
        .stakeholders-table-wrap td:nth-child(3),
        .stakeholders-table-wrap td:nth-child(4) {
          width: 14%;
        }

        .stakeholders-table-wrap td:nth-child(5) {
          width: 22%;
        }

        .stakeholders-table-wrap td:last-child,
        .stakeholders-table-wrap th:last-child {
          width: 80px !important;
          min-width: 80px !important;
          text-align: center !important;
        }

        .stakeholders-table-wrap input[type='checkbox'] {
          width: 16px;
          height: 16px;
          accent-color: #6366f1;
        }

        .stakeholders-table-wrap .row-actions button {
          width: 24px !important;
          height: 24px !important;
          border-radius: 4px !important;
        }

        @media (max-width: 900px) {
          .stakeholders-table-wrap table {
            table-layout: auto;
            min-width: 700px !important;
          }
        }
      `}),(0,v.jsxs)(`div`,{className:`grid-2 stakeholders-panel`,children:[(0,v.jsxs)(a,{children:[(0,v.jsx)(i,{children:(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h2`,{children:`Stakeholder Position Map`}),(0,v.jsx)(`span`,{children:`Map stakeholder positions and engagement priorities`})]})}),(0,v.jsx)(`div`,{style:{padding:`8px 12px`},children:(0,v.jsx)(`div`,{ref:W,id:`stakeholder-plot`,style:{width:`100%`,height:260}})})]}),(0,v.jsxs)(a,{children:[(0,v.jsx)(i,{children:(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h2`,{children:`Engagement Priorities`}),(0,v.jsx)(`span`,{children:`Stakeholder map`})]})}),(0,v.jsx)(`span`,{children:`Requires attention`}),H.length>0&&(0,v.jsxs)(`p`,{className:`stakeholder-priority-copy`,children:[`🔴 `,(0,v.jsx)(`strong`,{children:`Critical:`}),` `,H.map(e=>e.name||`New stakeholder`).join(` & `),` — High impact with resistant or highly resistant attitude →`,` `,(0,v.jsx)(`strong`,{children:H.map(e=>x(e.influence,e.attitude)).join(` / `)})]}),U.length>0&&(0,v.jsxs)(`p`,{className:`stakeholder-priority-copy`,children:[`🟡 `,(0,v.jsx)(`strong`,{children:`High:`}),` `,U.map(e=>e.name||`New stakeholder`).join(` & `),` —`,` `,U.map(e=>` ${e.name||`New stakeholder`} (${x(e.influence,e.attitude)})`).join(`; `)]}),H.length===0&&U.length===0&&(0,v.jsx)(`p`,{className:`stakeholder-priority-copy`,children:`✅ All stakeholders are aligned. Maintain current strategy.`}),(0,v.jsxs)(`p`,{className:`stakeholder-priority-copy`,style:{marginTop:`12px`,borderTop:`1px solid #e5e7eb`,paddingTop:`12px`},children:[(0,v.jsx)(`strong`,{children:`Next step:`}),` `,H.length>0?H.map(e=>e.name||`New stakeholder`).join(` & `):U.length>0?U.map(e=>e.name||`New stakeholder`).join(` & `):`maintaining alignment`,` before the next milestone.`]})]})]}),(0,v.jsxs)(a,{className:`stakeholders-analysis-card`,style:{display:`flex`,flexDirection:`column`,flex:`1 1 auto`,minHeight:0},children:[(0,v.jsxs)(`div`,{className:`module-toolbar stakeholders-analysis-toolbar`,style:{flexWrap:`wrap`,gap:`12px`},children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h2`,{children:`Stakeholder Analysis`}),(0,v.jsx)(`span`,{children:`Identify influence and attitude`})]}),(0,v.jsxs)(`div`,{style:{marginLeft:`auto`,display:`flex`,alignItems:`center`,gap:`12px`,flexWrap:`wrap`},children:[(0,v.jsx)(`input`,{type:`search`,value:D,onChange:e=>O(e.target.value),className:`stakeholders-analysis-search`,placeholder:`Search stakeholders...`,"aria-label":`Search stakeholders`,style:{minWidth:`220px`,padding:`8px 12px`,border:`1px solid #d1d5db`,borderRadius:`6px`,fontSize:`0.875rem`,color:`#111827`,backgroundColor:`#fff`}}),(0,v.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:B,children:`+ Add stakeholder`})]})]}),(0,v.jsx)(`div`,{className:`stakeholders-table-wrap`,style:{flex:`1 1 auto`,overflow:`auto`,minHeight:0},children:(0,v.jsxs)(d,{children:[(0,v.jsx)(o,{children:(0,v.jsxs)(l,{children:[(0,v.jsx)(s,{children:(0,v.jsxs)(`button`,{type:`button`,onClick:()=>I(`name`),style:{border:`none`,background:`transparent`,padding:0,fontWeight:700,cursor:`pointer`,color:`#111827`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`span`,{children:`Stakeholder`}),(0,v.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:`0.75rem`,color:`#6b7280`,minWidth:`0.75rem`,textAlign:`center`,opacity:+(j?.key===`name`)},children:j?.key===`name`?j.direction===`asc`?`↑`:j.direction===`desc`?`↓`:``:``})]})}),(0,v.jsx)(s,{children:(0,v.jsxs)(`button`,{type:`button`,onClick:()=>I(`impact`),style:{border:`none`,background:`transparent`,padding:0,fontWeight:700,cursor:`pointer`,color:`#111827`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`span`,{children:`Impact`}),(0,v.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:`0.75rem`,color:`#6b7280`,minWidth:`0.75rem`,textAlign:`center`,opacity:+(j?.key===`impact`)},children:j?.key===`impact`?j.direction===`asc`?`↑`:j.direction===`desc`?`↓`:``:``})]})}),(0,v.jsx)(s,{children:(0,v.jsxs)(`button`,{type:`button`,onClick:()=>I(`influence`),style:{border:`none`,background:`transparent`,padding:0,fontWeight:700,cursor:`pointer`,color:`#111827`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`span`,{children:`Influence`}),(0,v.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:`0.75rem`,color:`#6b7280`,minWidth:`0.75rem`,textAlign:`center`,opacity:+(j?.key===`influence`)},children:j?.key===`influence`?j.direction===`asc`?`↑`:j.direction===`desc`?`↓`:``:``})]})}),(0,v.jsx)(s,{children:(0,v.jsxs)(`button`,{type:`button`,onClick:()=>I(`attitude`),style:{border:`none`,background:`transparent`,padding:0,fontWeight:700,cursor:`pointer`,color:`#111827`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`span`,{children:`Attitude`}),(0,v.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:`0.75rem`,color:`#6b7280`,minWidth:`0.75rem`,textAlign:`center`,opacity:+(j?.key===`attitude`)},children:j?.key===`attitude`?j.direction===`asc`?`↑`:j.direction===`desc`?`↓`:``:``})]})}),(0,v.jsx)(s,{children:(0,v.jsxs)(`button`,{type:`button`,onClick:()=>I(`strategy`),style:{border:`none`,background:`transparent`,padding:0,fontWeight:700,cursor:`pointer`,color:`#111827`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`span`,{children:`Strategy`}),(0,v.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:`0.75rem`,color:`#6b7280`,minWidth:`0.75rem`,textAlign:`center`,opacity:+(j?.key===`strategy`)},children:j?.key===`strategy`?j.direction===`asc`?`↑`:j.direction===`desc`?`↓`:``:``})]})}),(0,v.jsx)(s,{style:{width:`80px`,minWidth:`80px`,textAlign:`center`},children:`Actions`})]})}),(0,v.jsx)(c,{children:z.map(e=>{let t=x(e.influence,e.attitude),r=h===e.id,i=k.includes(e.id);return(0,v.jsxs)(l,{ref:t=>{F.current[e.id]=t},onMouseEnter:()=>P(e.id),onMouseLeave:()=>P(t=>t===e.id?null:t),onFocusCapture:()=>P(e.id),onBlurCapture:()=>P(t=>t===e.id?null:t),onClick:t=>{if(r||t.target.closest(`button, input, select`))return;let n=t.metaKey||t.ctrlKey||t.shiftKey;R(e.id,n)},style:{cursor:`pointer`,backgroundColor:i?`#eef2ff`:void 0,boxShadow:i?`inset 3px 0 0 #4f46e5`:void 0},children:[(0,v.jsx)(u,{children:(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,v.jsx)(`input`,{type:`checkbox`,checked:i,"aria-label":`Select ${e.name||`stakeholder`}`,onChange:t=>{t.stopPropagation(),R(e.id,t.nativeEvent instanceof MouseEvent?t.nativeEvent.metaKey||t.nativeEvent.ctrlKey||t.nativeEvent.shiftKey:!1)},onClick:e=>e.stopPropagation()}),r?(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(`div`,{style:{width:`100%`},children:[(0,v.jsx)(`input`,{type:`text`,value:e.name,onChange:t=>n(e.id,`name`,t.target.value),placeholder:`Enter name`,style:{display:`block`,width:`100%`,padding:`4px 8px`,border:`1px solid #d1d5db`,borderRadius:`4px`,fontSize:`0.9rem`,marginBottom:`4px`}}),(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`},children:[(0,v.jsx)(`input`,{list:`roles-list-${e.id}`,type:`text`,value:e.role,onChange:t=>n(e.id,`role`,t.target.value),placeholder:`Enter or select role`,style:{display:`block`,width:`100%`,padding:`4px 8px`,border:`1px solid #d1d5db`,borderRadius:`4px`,fontSize:`0.75rem`,color:`#6b7280`}}),(0,v.jsx)(`datalist`,{id:`roles-list-${e.id}`,children:T.map(e=>(0,v.jsx)(`option`,{value:e},e))}),(0,v.jsx)(`button`,{type:`button`,onClick:()=>{let t=document.querySelector(`input[list=roles-list-${e.id}]`)?.value?.trim();t&&!T.includes(t)&&E(e=>[t,...e]),t&&n(e.id,`role`,t)},title:`Add role`,style:{padding:`4px 8px`,fontSize:`0.75rem`,borderRadius:`4px`,border:`1px solid #d1d5db`,background:`#f3f4f6`,cursor:`pointer`},children:`+`})]})]})}):(0,v.jsxs)(`div`,{style:{width:`100%`},children:[(0,v.jsx)(`strong`,{children:e.name||`—`}),(0,v.jsx)(`span`,{style:{display:`block`,fontSize:`0.75rem`,color:`#6b7280`},children:e.role||`—`})]})]})}),(0,v.jsx)(u,{children:r?(0,v.jsx)(`select`,{value:e.impact,onChange:t=>n(e.id,`impact`,t.target.value),style:{padding:`4px 8px`,borderRadius:`4px`,border:`1px solid #d1d5db`},children:S.map(e=>(0,v.jsx)(`option`,{value:e,children:e},e))}):(0,v.jsx)(`span`,{children:e.impact})}),(0,v.jsx)(u,{children:r?(0,v.jsx)(`select`,{value:e.influence,onChange:t=>n(e.id,`influence`,t.target.value),style:{padding:`4px 8px`,borderRadius:`4px`,border:`1px solid #d1d5db`},children:S.map(e=>(0,v.jsx)(`option`,{value:e,children:e},e))}):(0,v.jsx)(`span`,{children:e.influence})}),(0,v.jsx)(u,{children:r?(0,v.jsx)(`select`,{value:e.attitude,onChange:t=>n(e.id,`attitude`,t.target.value),style:{padding:`4px 8px`,borderRadius:`4px`,border:`1px solid #d1d5db`},children:C.map(e=>(0,v.jsx)(`option`,{value:e,children:e},e))}):(0,v.jsx)(`span`,{children:e.attitude})}),(0,v.jsx)(u,{children:(0,v.jsx)(f,{color:t===`Collaborate`||t===`Convert`?`purple`:t===`Engage`||t===`Intensive Engagement`?`yellow`:t===`Involve`||t===`Keep Satisfied`?`sky`:`gray`,children:t})}),(0,v.jsx)(u,{style:{whiteSpace:`nowrap`,width:`80px`,minWidth:`80px`,padding:`8px 6px`,textAlign:`center`},children:r?(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,v.jsx)(`button`,{type:`button`,onClick:()=>y(null),"aria-label":`Save ${e.name||`stakeholder`}`,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:`30px`,height:`30px`,padding:0,border:`1px solid #2563eb`,borderRadius:`6px`,backgroundColor:`#2563eb`,color:`#fff`,cursor:`pointer`,transition:`all 0.2s ease`},children:(0,v.jsx)(g,{size:14})}),(0,v.jsx)(`button`,{type:`button`,onClick:()=>V(e.id),"aria-label":`Delete ${e.name||`stakeholder`}`,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:`30px`,height:`30px`,padding:0,border:`1px solid #fecaca`,borderRadius:`6px`,backgroundColor:`#fef2f2`,color:`#dc2626`,cursor:`pointer`,transition:`all 0.2s ease`},children:(0,v.jsx)(m,{size:14})})]}):(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`,opacity:+(N===e.id),transition:`opacity 0.15s ease`,pointerEvents:N===e.id?`auto`:`none`},className:`row-actions`,children:[(0,v.jsx)(`button`,{type:`button`,onClick:()=>y(e.id),"aria-label":`Edit ${e.name||`stakeholder`}`,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:`30px`,height:`30px`,padding:0,border:`1px solid transparent`,borderRadius:`6px`,backgroundColor:`transparent`,color:`#4f46e5`,cursor:`pointer`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=`#eef2ff`,e.currentTarget.style.borderColor=`#c7d2fe`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=`transparent`,e.currentTarget.style.borderColor=`transparent`},onFocus:e=>{e.currentTarget.style.backgroundColor=`#eef2ff`,e.currentTarget.style.borderColor=`#c7d2fe`},onBlur:e=>{e.currentTarget.style.backgroundColor=`transparent`,e.currentTarget.style.borderColor=`transparent`},children:(0,v.jsx)(g,{size:14})}),(0,v.jsx)(`button`,{type:`button`,onClick:()=>V(e.id),"aria-label":`Delete ${e.name||`stakeholder`}`,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:`30px`,height:`30px`,padding:0,border:`1px solid transparent`,borderRadius:`6px`,backgroundColor:`transparent`,color:`#ef4444`,cursor:`pointer`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=`#fef2f2`,e.currentTarget.style.borderColor=`#fecaca`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=`transparent`,e.currentTarget.style.borderColor=`transparent`},onFocus:e=>{e.currentTarget.style.backgroundColor=`#fef2f2`,e.currentTarget.style.borderColor=`#fecaca`},onBlur:e=>{e.currentTarget.style.backgroundColor=`transparent`,e.currentTarget.style.borderColor=`transparent`},children:(0,v.jsx)(m,{size:14})})]})})]},e.id)})})]})})]})]})};export{T as StakeholdersView};