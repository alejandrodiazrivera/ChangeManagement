import{i as e,n as t,t as n}from"./jsx-runtime-Cltr0gcK.js";import{t as r}from"./trash-CORW9Tru.js";import{r as i}from"./index-Cx01vXz5.js";import{n as a,t as o}from"./Card-DdVlShVN.js";import{a as s,i as c,n as l,o as u,r as d,t as f}from"./Table-CTx8YcCm.js";var p=e(t(),1),m=n(),h=[`Strategy`,`Goals & KPIs`,`Process`,`Technology`,`Roles & Responsibilities`,`Skills & Knowledge`,`Behaviour`,`Structure & Governance`,`Stakeholders & Relationships`,`Culture & Norms`],g=[`None`,`Low`,`Medium`,`High`,`Critical`],_=()=>{let{stakeholders:e}=i(),[t,n]=(0,p.useState)([{id:crypto.randomUUID(),area:``,current:``,future:``,impact:``,affected:[]}]),_=()=>{n(e=>[...e,{id:crypto.randomUUID(),area:``,current:``,future:``,impact:``,affected:[]}])},v=(e,t,r)=>{n(n=>n.map(n=>n.id===e?{...n,[t]:r}:n))},y=(e,t)=>{n(n=>n.map(n=>n.id===e?{...n,affected:t.map(Number)}:n))},b=e=>{n(t=>t.filter(t=>t.id!==e))};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`style`,{children:`
        .impact-view {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .impact-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .impact-toolbar h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }

        .impact-toolbar span {
          display: block;
          margin: 0 0 0 8px;
          font-size: 13px;
          color: #6b7280;
        }

        .impact-table-wrap {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
          overflow-x: auto;
          overflow-y: visible;
        }

        .impact-table {
          width: 100%;
          min-width: 0;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 13px;
        }

        .impact-table th,
        .impact-table td {
          height: 32px;
          padding: 0 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          vertical-align: middle;
          text-align: left;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .impact-table th {
          height: 28px;
          color: #6b7280;
          background: #fafafa;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .impact-table th:nth-child(1) {
          width: 18%;
        }

        .impact-table th:nth-child(2),
        .impact-table th:nth-child(3) {
          width: 22%;
        }

        .impact-table th:nth-child(4) {
          width: 13%;
        }

        .impact-table th:nth-child(5) {
          width: 17%;
        }

        .impact-table th:nth-child(6) {
          width: 8%;
          text-align: center;
        }

        .impact-table tbody tr {
          transition: background 80ms ease;
        }

        .impact-table tbody tr:hover {
          background: #f0f1f3;
        }

        .impact-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .impact-input,
        .impact-select {
          width: 100%;
          box-sizing: border-box;
          height: 24px;
          min-height: 24px;
          padding: 0 6px;
          border: 1px solid transparent;
          border-radius: 4px;
          background: transparent;
          color: #1a1d21;
          font: inherit;
          outline: none;
          transition:
            background 80ms ease,
            border-color 80ms ease;
        }

        .impact-input {
          min-width: 0;
        }

        .impact-select {
          padding-right: 6px;
          cursor: pointer;
        }

        .impact-input::placeholder {
          color: #9ca3af;
        }

        .impact-input:hover,
        .impact-select:hover,
        .impact-input:focus,
        .impact-select:focus {
          background: #f0f1f3;
        }

        .impact-input:focus,
        .impact-select:focus {
          border-color: rgba(0, 0, 0, 0.08);
        }

        .impact-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .impact-delete {
          width: 24px;
          height: 24px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          border-radius: 4px;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
        }

        .impact-delete:hover,
        .impact-delete:focus-visible {
          background: #f0f1f3;
          border-color: rgba(0, 0, 0, 0.08);
          color: #1a1d21;
          outline: none;
        }

        @media (max-width: 900px) {
          .impact-table {
            table-layout: auto;
          }

          .impact-table th,
          .impact-table td {
            padding-left: 4px;
            padding-right: 4px;
          }
        }
      `}),(0,m.jsx)(`div`,{className:`impact-view`,children:(0,m.jsxs)(o,{children:[(0,m.jsxs)(a,{className:`impact-toolbar`,children:[(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h2`,{children:`Impact Assessment`}),(0,m.jsx)(`span`,{children:`Current → Future`})]}),(0,m.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:_,type:`button`,children:`+ Add assessment`})]}),(0,m.jsx)(`div`,{className:`impact-table-wrap`,children:(0,m.jsxs)(f,{className:`impact-table`,children:[(0,m.jsx)(s,{children:(0,m.jsxs)(u,{children:[(0,m.jsx)(c,{children:`Area`}),(0,m.jsx)(c,{children:`Current`}),(0,m.jsx)(c,{children:`Future`}),(0,m.jsx)(c,{children:`Impact`}),(0,m.jsx)(c,{children:`Affected`}),(0,m.jsx)(c,{"aria-label":`Actions`})]})}),(0,m.jsx)(l,{children:t.map(t=>(0,m.jsxs)(u,{children:[(0,m.jsx)(d,{children:(0,m.jsxs)(`select`,{className:`impact-select`,value:t.area,onChange:e=>v(t.id,`area`,e.target.value),children:[(0,m.jsx)(`option`,{value:``,children:`Select area`}),h.map(e=>(0,m.jsx)(`option`,{value:e,children:e},e))]})}),(0,m.jsx)(d,{children:(0,m.jsx)(`input`,{className:`impact-input`,type:`text`,value:t.current,placeholder:`Describe the current state...`,onChange:e=>v(t.id,`current`,e.target.value)})}),(0,m.jsx)(d,{children:(0,m.jsx)(`input`,{className:`impact-input`,type:`text`,value:t.future,placeholder:`Describe the future state...`,onChange:e=>v(t.id,`future`,e.target.value)})}),(0,m.jsx)(d,{children:(0,m.jsxs)(`select`,{className:`impact-select`,value:t.impact,onChange:e=>v(t.id,`impact`,e.target.value),children:[(0,m.jsx)(`option`,{value:``,children:`Select impact`}),g.map(e=>(0,m.jsx)(`option`,{value:e,children:e},e))]})}),(0,m.jsx)(d,{children:(0,m.jsxs)(`select`,{className:`impact-select`,multiple:!0,size:1,value:t.affected.length>0?t.affected.map(String):[``],"aria-label":`Select affected stakeholders`,onChange:e=>y(t.id,Array.from(e.target.selectedOptions,e=>e.value).filter(Boolean)),children:[(0,m.jsx)(`option`,{value:``,children:`Select stakeholders`}),e.map(e=>(0,m.jsx)(`option`,{value:e.id,children:e.name||`Unnamed stakeholder`},e.id))]})}),(0,m.jsx)(d,{children:(0,m.jsx)(`div`,{className:`impact-actions`,children:(0,m.jsx)(`button`,{className:`impact-delete`,type:`button`,title:`Delete assessment`,"aria-label":`Delete assessment`,onClick:()=>b(t.id),children:(0,m.jsx)(r,{size:14})})})})]},t.id))})]})})]})})]})};export{_ as ImpactView};