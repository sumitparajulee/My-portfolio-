const $=(s,r=document)=>r.querySelector(s), esc=t=>t;
// Career path chart
const A=2018,Z=2027,pc=y=>((y-A)/(Z-A)*100).toFixed(2);
const bars=[
 {k:'w',r:0,n:'Support Rep',a:2020.5,b:2022.65,t:'Jul 2020 – Aug 2022',d:'Front-line support for core banking solutions, with accurate issue tracking and client follow-up.'},
 {k:'w',r:0,n:'Senior Rep',a:2022.65,b:2024.65,t:'Aug 2022 – Aug 2024',d:'Escalation point for 100+ banking clients. Wrote the onboarding documentation later adopted as the standard.'},
 {k:'w',r:0,n:'Supervisor',a:2024.65,b:2025.45,t:'Aug 2024 – Jun 2025',d:'Led a 12-member team and gave advanced support on the Infinity core banking system.'},
 {k:'g',r:0,n:'Move',a:2025.45,b:2026.2,t:'Transition to Sydney',d:'Left a stable supervisory role and relocated to Sydney to rebuild toward a professional accounting career.'},
 {k:'s',r:1,n:'Bachelor, Accounting & Finance',a:2018,b:2022.99,t:'Jan 2018 – Dec 2022 · Tribhuvan University',d:'Accounting, finance, auditing and taxation.'},
 {k:'s',r:1,n:'Newcastle',a:2025.7,b:2026.0,t:'Trimester 3, 2025 · University of Newcastle',d:'Three MPA (Advanced) units: Financial Accounting, Management Accounting and Corporate Finance.'},
 {k:'s',r:1,n:'MPA',a:2026.2,b:2026.75,t:'Mar 2026 – now · King\'s Own Institute, Sydney',d:'Accounting Information Systems, Corporate Accounting & Reporting, Business Law, Statistics & Data Analysis, Financial Accounting.'}
];
const tl=$('#tl'),det=$('#tl-d');
for(let y=A;y<=Z;y++){tl.insertAdjacentHTML('beforeend',`<div class="yr" style="left:${pc(y)}%"><span>${y%2==0||window.innerWidth>700?y:''}</span></div>`)}
tl.insertAdjacentHTML('beforeend',`<div class="now" style="left:${pc(2026.75)}%"><span>Now</span></div>`);
function show(i){const b=bars[i];det.innerHTML=`<b>${b.n}</b> <em>${b.t}</em><p>${b.d}</p>`;tl.querySelectorAll('.bar').forEach((e,j)=>e.classList.toggle('on',j==i))}
bars.forEach((b,i)=>{const e=document.createElement('button');e.className='bar '+b.k;e.style.cssText=`left:${pc(b.a)}%;width:max(${(pc(b.b)-pc(b.a)).toFixed(2)}%,14px);top:${b.r?88:28}px`;e.setAttribute('aria-label',b.n+', '+b.t);e.innerHTML=(b.b-b.a>1.5)?`<span>${b.n}</span>`:'';e.onclick=()=>show(i);tl.appendChild(e)});
show(2);
// Role fit
const roles={
 'Accounts Payable':{e:['Resolved payment gateway and transaction issues for 100+ banking clients.','Answered year-end accounting queries as a senior escalation point.','Zero escalated complaints: accuracy under pressure is the habit.'],t:['Xero','MYOB','MS Excel','Payment gateways']},
 'Accounts Receivable':{e:['Kept client follow-up and issue tracking accurate for years.','Built long-running relationships with 100+ banking clients.','Supported customer onboarding and clear client communication.'],t:['Xero','MYOB','MS Excel','CRM systems']},
 'Graduate Accountant':{e:['Completing the MPA at KOI, with three Advanced MPA units done at Newcastle.','Bachelor in Accounting and Finance, then 5+ years applying it in fintech.','CPA program planned; learning AASB/IFRS reporting now.'],t:['Financial reporting','Corporate finance','Management accounting','Excel']},
 'Bookkeeper':{e:['Daily work with transactions, reconciliations and year-end processes.','Comfortable with Xero and MYOB from study and practice.','Careful, documented work: my onboarding guide became the team standard.'],t:['Xero','MYOB','Reconciliations','MS Excel']},
 'Finance Officer':{e:['Proficient on the Infinity core banking system and its financial transactions.','Led a 12-person team, so I can own a process and coach others.','Commended by the MD for analytical leadership.'],t:['Core banking','Team leadership','Financial analysis','MS Office']}
};
const ro=$('#roles'),fo=$('#fit-out');
function pick(n){ro.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.textContent==n));const r=roles[n];fo.innerHTML=`<ul>${r.e.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${r.t.map(x=>`<span>${x}</span>`).join('')}</div>`}
Object.keys(roles).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.role='tab';b.onclick=()=>pick(n);ro.appendChild(b)});pick('Accounts Payable');
// Skills
const L=['Beginner','Developing','Familiar','Proficient'];
const sk={'Accounting':[['Financial reporting (AASB/IFRS)',0],['Year-end accounting',2],['Financial analysis',1],['Cost accounting',2],['Budgeting & forecasting',0]],
 'Banking & tech':[['Core banking (Infinity)',3],['Technical support',3],['Payment gateways',2],['Business development',2],['CRM systems',1]],
 'Leadership':[['Support management',2],['Training & development',2],['Customer relationships',2],['Team management',1],['Communication',1]],
 'Tools':[['Microsoft Office',3],['MYOB',2],['Xero',2],['Microsoft Excel',1]]};
const st=$('#sk-tabs'),so=$('#sk-out');
function sks(n){st.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.textContent==n));so.innerHTML=sk[n].map(([a,v])=>`<div class="sk"><span>${a}</span><div class="pips" role="img" aria-label="${L[v]}">${[0,1,2,3].map(i=>`<i class="${i<=v?'f':''}"></i>`).join('')}</div><em>${L[v]}</em></div>`).join('')}
Object.keys(sk).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.role='tab';b.onclick=()=>sks(n);st.appendChild(b)});sks('Accounting');
// KPI count-up + active nav
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,to=+el.dataset.to,s=el.dataset.s||'';if(calm||!to)return;const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/900);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+(k==1?s:'');if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
document.querySelectorAll('.kpi b').forEach(e=>io.observe(e));
const links=[...document.querySelectorAll('#nav a')];
const so2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(s=>so2.observe(s));
$('#yr').textContent=new Date().getFullYear();
