/* Redesign integration: original report renderers and board remain available. */
WEEKS[-1]={id:'all',label:'All period · Oct 13–31',short:'All period'};
const STATE_NAMESPACE='silow-workspace-redesign-20261116-v1';
function aggregatePerson(pid){
 const k=pid+'|all';if(_pw[k])return _pw[k];const xs=[0,1,2].map(i=>personWeek(pid,i)),base=xs[0],dh=xs.reduce((a,x)=>a+x.dh,0);
 const sum=f=>xs.reduce((a,x)=>a+f(x),0),weighted=f=>sum(x=>f(x)*x.dh)/dh;
 const apps={};xs.forEach(x=>Object.entries(x.apps).forEach(([a,v])=>apps[a]=(apps[a]||0)+v));
 const cats=base.cats.map(c=>{const cs=xs.map(x=>x.cats.find(z=>z.id===c.id));return {...c,dh:cs.reduce((a,x)=>a+x.dh,0),min:cs.reduce((a,x)=>a+x.min,0),eps:cs.reduce((a,x)=>a+x.eps,0),aiDh:cs.reduce((a,x)=>a+x.aiDh,0),tasks:c.tasks.map(t=>({...t,min:cs.reduce((a,x)=>a+(x.tasks.find(v=>v.t===t.t)?.min||0),0)}))};});
 return _pw[k]={...base,wi:-1,dh,min:dh*6,cats,apps,eps:sum(x=>x.eps),aiDh:sum(x=>x.aiDh),aiAssistDh:sum(x=>x.aiAssistDh),sw:weighted(x=>x.sw),frag:weighted(x=>x.frag),aiShare:weighted(x=>x.aiShare),afterMin:sum(x=>x.afterMin),longest:Math.max(...xs.map(x=>x.longest)),days:xs.flatMap((x,i)=>x.days.map(d=>({...d,d:'W'+(i+1)+' '+d.d})))};
}
TEAMS.forEach(t=>{t.wf[-1]=1;t.hand.forEach(h=>{h.n[-1]=h.n.reduce((a,b)=>a+b,0);h.wait[-1]=median(h.wait);});});
function periodControl(){
 $('#wk').innerHTML='<label class="period-label" for="period">Period</label><select id="period" aria-label="Reporting period"><option value="-1">All period</option>'+WEEKS.map((w,i)=>'<option value="'+i+'">'+w.short+' · '+w.label+'</option>').join('')+'</select>';
 $('#period').value=String(S.wi);$('#period').onchange=e=>{S.wi=Number(e.target.value);localStorage.setItem(STATE_NAMESPACE,JSON.stringify({wi:S.wi,anon:S.anon}));render();$('#period')?.focus();};
}
function setupRedesign(){
 const views=[['home','Home','building'],['plan','Processes & automation','flow'],['company','Company','building'],['departments','Departments','users'],['team','Team','users'],['people','Personal','user']];
 const nav=views.map(([v,l,i])=>'<button class="nav" '+(v==='departments'?'data-href="#departments"':'data-v="'+v+'"')+'>'+ic(i)+'<span>'+l+'</span></button>').join('');
 $('#nav').innerHTML='<div class="workspace-label">WORKSPACE</div>'+nav+'<div class="sidebar-context"><span class="status-dot"></span>Sample workspace<p>Fictional people and data.<br>Explore the work, not a score.</p></div>';
 $('#mnav').innerHTML=views.map(([v,l,i])=>'<button '+(v==='departments'?'data-href="#departments"':'data-v="'+v+'"')+'>'+ic(i)+'<span>'+l.replace('Processes & automation','Processes')+'</span></button>').join('');
 $('.brand small').textContent='Harbor Mutual';$('.side-foot .who').innerHTML='Harbor Mutual<small>Demo workspace</small>';
 try{const saved=JSON.parse(localStorage.getItem(STATE_NAMESPACE)||'{}');if(typeof saved.anon==='boolean')S.anon=saved.anon;}catch{}
 const origRender=render;
 render=function(){
  origRender();periodControl();
  const dept=S.view==='cases'&&/^(departments|department\/)/.test(S.ch||'');
  if(dept)rDepartments((S.ch||'').split('/')[1]);
  if(S.view==='cases'&&!dept&&(S.ch==='cases'||!S.ch)){$('#v-cases').innerHTML='';S.view='plan';S.tab='maps';rPlan();$$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-plan'));syncHash();}
  $$('#nav .nav,#mnav button').forEach(b=>{const active=b.dataset.href==='#departments'?dept:b.dataset.v===(S.view==='cases'?(dept?'departments':'plan'):S.view);b.classList.toggle('on',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  $('#anon').setAttribute('aria-pressed',String(S.anon));
  const root=$('#v-'+S.view);if(root){root.querySelectorAll('[data-href],[data-person],[data-sug],[data-proc],[data-team],[data-pmode]').forEach(el=>{if(!el.matches('a[href],button,input,select')){el.tabIndex=0;el.setAttribute('role','button');}});}
  if(['person','team','company'].includes(S.view)){
   const page=root.querySelector('.page');const old=page.querySelector('.scope-note');if(old)old.remove();
   page.insertAdjacentHTML('afterbegin','<div class="scope-note">'+(S.wi<0?'All 15 observed days combined. Additive metrics are totals; ratios are weighted by recorded time.':'Selected week: '+WEEKS[S.wi].label+'. Deviations compare with the full-period weekly average, not the previous week.')+'</div>');
   if(S.wi<0){page.innerHTML=page.innerHTML.replaceAll('of the week','of the period').replaceAll('this week','in this period').replaceAll('of week','of period').replaceAll('The week, hour by hour','The period, hour by hour').replaceAll('<span class="v">Per week</span>','<span class="v">In period</span>').replaceAll('<th>Per week</th>','<th>In period</th>');page.querySelector('.scope-note').append(' Handoff counts are totals; all-period waits are medians of the supplied weekly medians.');}
   if(S.view==='person')bindPicker();
  }
 };
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role="button"]:not(button)')){e.preventDefault();e.target.click();}});
 document.addEventListener('click',e=>{if(e.target.closest('[data-proc]'))S.showOverview=true;},true);
 document.addEventListener('click',e=>{const b=e.target.closest('[data-homeask]');if(b){ask(b.dataset.homeask);}const nav=e.target.closest('[data-tab-select]');if(nav){S.tab=nav.dataset.tabSelect;S.showOverview=false;go('plan');}},false);
 let returnFocus=null;const ov=$('#ov');
 const background=()=>[$('.side'),$('.shead'),$('#sbody'),$('#mnav')].filter(Boolean);
 new MutationObserver(()=>{const open=ov.classList.contains('on');ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Automation details');background().forEach(el=>el.inert=open);if(open){if(!ov.contains(document.activeElement))returnFocus=document.activeElement;setTimeout(()=>{if(!ov.contains(document.activeElement))ov.querySelector('button,a[href],input')?.focus();},0);}else{returnFocus?.isConnected&&returnFocus.focus();}}).observe(ov,{attributes:true,attributeFilter:['class']});
 document.addEventListener('keydown',e=>{if(e.key!=='Tab'||!ov.classList.contains('on'))return;const fs=[...ov.querySelectorAll('button,a[href],input,select,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);if(!fs.length)return;if(e.shiftKey&&document.activeElement===fs[0]){e.preventDefault();fs.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===fs.at(-1)){e.preventDefault();fs[0].focus();}});
}
const oldAsk=rAsk;
rAsk=function(){const previous=$('#home-chat');if(previous)previous.replaceChildren();oldAsk();if(S.view==='home'){const pane=$('#home-chat');if(pane){pane.replaceChildren(...$('#v-ask').childNodes);const title=pane.querySelector('.ask-hero h1');if(title){const h=document.createElement('h3');h.className='home-chat-title';h.textContent=title.textContent;title.replaceWith(h);}pane.querySelector('.msgs')?.setAttribute('aria-live','polite');$('#sbody').scrollTop=0;}}};
function rHome(){
 const cw=companyWeek(-1),back=PLAN.reduce((a,s)=>a+evidence(s.id).back,0);
 $('#v-home').innerHTML=`<div class="home-page"><div class="home-intro"><span class="eyebrow">YOUR WORK, CONNECTED</span><h1>Welcome to your workspace</h1><p>Understand where time goes. Find a better way to work.</p></div><div class="home-grid"><div class="home-main"><div class="home-overview"><div><span class="eyebrow">Harbor Mutual · pilot overview</span><h2>A clearer picture of the work</h2><p>Start with a process, explore your teams, or ask Silow a question.</p></div><div class="home-numbers"><div><b>${PEOPLE.length}</b><small>people in pilot</small></div><div><b>${CX.cases.length}</b><small>mapped processes</small></div><div><b>${H(cw.dh)}</b><small>recorded · all period</small></div></div><span class="demo-caption">Fictional sample · Oct 13–31 · process case studies have separate cohorts</span></div><div class="home-section-title"><h2>Where would you like to start?</h2><span>Explore the workspace</span></div><div class="action-grid">${[
 ['flow','Processes & automation','See the work, step by step. Prioritize what to automate.','#plan','Open automation plan'],
 ['building','Company overview','See the company-wide picture and where time goes.','#company','Explore company'],
 ['users','Departments & teams','Find the people, processes and handoffs behind the work.','#departments','Explore departments'],
 ['user','Personal reports','Browse every employee. Open a report, not a ranking.','#people','Browse employees']
 ].map(([i,t,d,href,a])=>`<a class="home-action" href="${href}"><span class="action-icon">${ic(i,21)}</span><h3>${t}</h3><p>${d}</p><span class="action-link">${a} <b>↗</b></span></a>`).join('')}</div><div class="home-section-title"><h2>Process insights</h2><a href="#cases">All process maps →</a></div><div class="home-insights">${CX.cases.slice(0,3).map(c=>{const b=c.steps.find(x=>x.n===c.bottleneck.step_n);return `<a href="#case/${c.id}"><span class="insight-number">${String(c.steps.length).padStart(2,'0')}</span><div><b>${esc(c.title)}</b><p>Step ${b.n} · ${esc(b.name)}</p></div><span>↗</span></a>`;}).join('')}</div><div class="home-footnote">${ic('shield',14)} Work patterns, not productivity scores. All names and numbers in this sample are fictional.</div></div><aside class="home-assistant"><header><span class="assistant-mark"><img src="./silow-mark.svg" alt=""></span><div><h2>Ask Silow</h2><p>Your guide to this workspace</p></div><span class="pill">Sample</span></header><div id="home-chat"></div></aside></div></div>`;
 rAsk();
}
function employeeGroups(){
 const extra=CX.data.people.filter(p=>!PERSON[p.id]);return [...TEAMS.map(t=>({id:t.id,n:t.name,kind:'Pilot report',people:t.members.map(p=>({id:p.id,n:nm(p),role:ROLES[p.role].title,href:'#person/'+p.id,host:true}))})),...[...new Set(extra.map(p=>p.team||'Leadership'))].map(t=>({id:t,n:t,kind:'Process case-study cohort',people:extra.filter(p=>(p.team||'Leadership')===t).map(p=>({id:p.id,n:p.pseudonym,role:p.role,href:'#profile/'+p.id}))}))];
}
function rPeople(){
 if(S.profile)return rProfile(S.profile);
 if(S.unit)return rUnit(S.unit);
 const groups=employeeGroups();
 $('#v-people').innerHTML=`<div class="page directory"><span class="eyebrow">PERSONAL</span><h1>Employee directory</h1><div class="lede">Everyone in the original sample, organized by team. Pilot reports and process case-study cohorts are kept separate — no inferred identities or combined headcounts.</div><label class="directory-search">${ic('search',18)}<input id="directory-query" aria-label="Search employees" placeholder="Search by ${S.anon?'code':'name'}, role or team"></label><div id="directory-results"></div></div>`;
 const fill=q=>{$('#directory-results').innerHTML=groups.map(g=>{const ps=g.people.filter(p=>(p.n+' '+p.role+' '+g.n).toLowerCase().includes(q.toLowerCase()));if(!ps.length)return '';return `<section class="directory-group"><div class="directory-title"><h2>${esc(g.n)}</h2><span>${g.kind} · ${ps.length} people</span></div><div class="employee-grid">${ps.map(p=>`<a class="employee-card" href="${p.href}"><span class="employee-avatar">${esc(p.n.split(' ').map(s=>s[0]).slice(0,2).join(''))}</span><div><b>${esc(p.n)}</b><small>${esc(p.role)}</small></div><span>→</span></a>`).join('')}</div></section>`;}).join('')||'<p class="empty-period" role="status">No matching employees. Try another role or team.</p>';};
 fill('');$('#directory-query').oninput=e=>fill(e.target.value);
}
function rProfile(id){
 const p=CX.data.people.find(x=>x.id===id);if(!p){$('#v-people').innerHTML='<div class="page"><h1>Profile not found</h1><a href="#people">Employee directory</a></div>';return;}
 const cases=CX.cases.filter(c=>c.people_ids.includes(id));
 $('#v-people').innerHTML=`<div class="page"><a class="nlink" href="#people">← Employee directory</a><h1 style="margin-top:20px">${esc(p.pseudonym)}</h1><p class="lede">${esc(p.role)} · ${esc(p.team||'Leadership')} · process case-study cohort</p><div class="scope-note">${S.wi<0?'All available observations.':'Selected week: '+WEEKS[S.wi].label+'. No person-level weekly allocation is supplied for this case-study cohort. Process-level weekly observations remain available below.'} Full-period personal evidence below is not a weekly estimate.</div><h2>Processes & observed ownership</h2><div class="cxcards">${cases.map(c=>CX.card(c)).join('')}</div><section class="sec"><h2>Full-period personal evidence</h2><div class="card">${(p.cases||[]).map(x=>{const c=CX.cases.find(c=>c.id===x.case_id);return `<div class="row"><div class="grow"><b>${esc(c?.title||x.case_id)}</b><p>${x.runs_count_in_window} observed runs · typical elapsed ${(x.elapsed_median_s_per_run/60).toFixed(1)} min / run</p></div><a class="btn" href="#case/${x.case_id}?person=${id}">Open on board →</a></div>`;}).join('')||'This profile is recorded through process ownership. Open a process to inspect its steps and handoffs.'}</div></section></div>`;
}
function rUnit(id){
 const g=employeeGroups().find(x=>x.id===id);const cs=CX.cases.filter(c=>CX.org(c).teams.includes(id));
 $('#v-people').innerHTML=`<div class="page"><a class="nlink" href="#departments">← Departments</a><h1 style="margin-top:20px">${esc(g?.n||id)}</h1><p class="lede">Process case-study team · original roster and ownership preserved.</p><h2>Team roster</h2><div class="employee-grid">${(g?.people||[]).map(p=>`<a class="employee-card" href="${p.href}"><b>${esc(p.n)}</b><small>${esc(p.role)}</small></a>`).join('')}</div><h2 style="margin-top:28px">Processes</h2>${cs.map(c=>CX.periodPanel(c)+CX.card(c)).join('')}</div>`;
}
function rDepartments(id){
 const entries=id&&CX.departments[id]?[[id,CX.departments[id]]]:Object.entries(CX.departments);
 $('#v-cases').innerHTML=`<div class="page department-page"><span class="eyebrow">ORGANIZATION</span><h1>${id?CX.departments[id].name:'Departments'}</h1><p class="lede">One place for each department’s teams, people and processes. Handoffs can cross departmental boundaries.</p>${entries.map(([key,d])=>{
 const cs=CX.cases.filter(c=>CX.org(c).teams.some(t=>CX.deptOf(t)===d.name));
 const hostTeams=d.teams.filter(t=>TEAM[t]);const totals=hostTeams.map(t=>teamWeek(t,S.wi)),dh=totals.reduce((a,x)=>a+x.dh,0),avg=hostTeams.reduce((a,t)=>a+[0,1,2].reduce((a,i)=>a+teamWeek(t,i).dh,0)/3,0);
 return `<section class="department-section"><div class="directory-title"><h2><a href="#department/${key}">${d.name}</a></h2><span>${d.teams.length} ${d.teams.length===1?'team':'teams'} · ${cs.length} processes</span></div>${hostTeams.length?`<div class="department-stats"><div><small>Pilot recorded time · ${S.wi<0?'all period':WEEKS[S.wi].label}</small><b data-dept-hours>${H(dh)}</b></div><div><small>${S.wi<0?'Full-period weekly average':'vs full-period weekly average'}</small><b>${S.wi<0?H(avg):delta(dh,avg)}</b></div><span>Only the ${hostTeams.length} pilot ${hostTeams.length===1?'team is':'teams are'} included in these totals. Case-study cohorts below are not added.</span></div>`:''}<h3>Teams & people</h3><div class="department-teams">${d.teams.map(t=>{
 const host=TEAM[t],extra=CX.data.people.filter(p=>!PERSON[p.id]&&(p.team||'Leadership')===t);const ids=host?host.members:extra;
 return `<div class="card dept-team"><div class="directory-title"><h3><a href="${host?'#team/'+t:'#unit/'+encodeURIComponent(t)}">${esc(host?host.name:t)} ↗</a></h3><span>${ids.length} people · ${host?'pilot report':'case-study cohort'}</span></div><div class="nrel">${ids.map(p=>`<a class="pchip" href="${host?'#person/':'#profile/'}${p.id}">${esc(host?nm(p):p.pseudonym)}</a>`).join('')||'<p>No additional employee records supplied.</p>'}</div></div>`;
 }).join('')}</div><h3>Processes involving ${d.name}</h3><div class="cxcards">${cs.map(c=>CX.card(c)).join('')||'<p class="empty-period">No mapped processes in this department.</p>'}</div>${id&&!hostTeams.length?cs.map(c=>CX.periodPanel(c)).join(''):''}</section>`;
 }).join('')}<div class="note">All data is fictional. Membership follows original recorded ownership. Leadership uses the same department → team → people → processes structure.</div></div>`;
}
const legacyPlan=rPlan;
rPlan=function(){
 if(S.tab==='maps'&&S.showOverview){legacyPlan();$('#v-plan .seg [data-href="#cases"]')?.remove();const c=CX.procCase(S.proc);if(c)$('#v-plan .page').insertAdjacentHTML('afterbegin',CX.periodPanel(c));$('#tab-maps').onclick=()=>{S.showOverview=false;S.tab='maps';render();};return;}
 const back=PLAN.reduce((a,s)=>a+evidence(s.id).back,0);
 const tabs=`<div class="seg main-tabs" aria-label="Processes and automation views"><button data-tab-select="plan" class="${S.tab==='plan'?'on':''}">Automation plan</button><button data-tab-select="maps" class="${S.tab==='maps'?'on':''}">Process maps</button></div>`;
 let body='';
 if(S.tab==='plan'){
 body=costCtl()+tiles([{l:'Modelled hours back / week',v:back.toFixed(1)+'<small>h</small>',s:S.wi<0?'full-period weekly average':'based on selected week',hl:1},{l:'Modelled value / month',v:money(back*4.33*S.cost),s:'weekly hours × 4.33 × loaded cost'},{l:'Pilot teams',v:TEAMS.length,s:'proposals grouped by owning team'}],'c3')+
 TEAMS.map(t=>{const items=PLAN.filter(s=>(PROC[s.proc]?.team||s.src[0]?.[0])===t.id);if(!items.length)return '';const groupBack=items.reduce((a,s)=>a+evidence(s.id).back,0);const processes=[...new Set(items.map(s=>s.proc))];return `<section class="automation-team"><div class="directory-title"><div><span class="eyebrow">${esc(CX.deptOf(t.id))}</span><h2>${t.name}</h2></div><span><b>${groupBack.toFixed(1)} h/week</b> · ${money(groupBack*4.33*S.cost)}/month</span></div>${processes.map(pid=>{const pr=PROC[pid],c=CX.procCase(pid),ss=items.filter(s=>s.proc===pid);return `<div class="automation-process"><h3>${esc(pr?.n||'Other mapped work')}</h3><p class="meta">${esc(pr?.d||'Evidence from recorded work streams.')}</p>${ss.map(s=>{const x=sugRoi(s.id,S.cost);return `<button class="automation-suggestion" data-sug="${s.id}"><span><b>${esc(s.t)}</b><small>Approver: ${esc(s.approver)} · ${x.people.length} people · ${s.eff} person-weeks to build</small></span><span><b>${x.back.toFixed(1)} h / week</b><small>${money(x.month)} / month</small></span><span>→</span></button>`;}).join('')}${c?`<a class="nlink" href="#case/${c.id}/brief">Process context & implementation blueprint →</a>`:''}</div>`;}).join('')}</section>`;}).join('')+
 `<div class="scope-note">Modelled savings, not measured outcomes. Plan totals use the original pilot evidence only. Other case-study proposals remain in their process blueprints, with their original cadence; they are not added to pilot totals.</div><details class="other-proposals"><summary>Other case-study automation blueprints</summary>${CX.cases.filter(c=>c.group!=='harbor').map(c=>`<a class="row" href="#case/${c.id}/brief"><div class="grow"><b>${esc(c.title)}</b><p>${esc(c.recommendation.title)}</p></div><span>Open blueprint →</span></a>`).join('')}</details>`;
 }else{
 body=`<p class="scope-note">Every mapped process is here. Expand all steps, or open the interactive board for paths, ownership, handoffs and contextual insights. Reference path timings use all available observations.</p><div class="process-map-list">${CX.cases.map(c=>{const b=c.steps.find(s=>s.n===c.bottleneck.step_n);return `<article class="process-map-card"><div class="process-map-heading"><div><span class="eyebrow">${esc(c.team)} · ${c.steps.length} steps</span><h2><a href="#case/${c.id}">${esc(c.title)}</a></h2><p>${esc(c.extra.boundary)}</p><div class="process-slow">Step ${b.n} · ${esc(b.name)}</div></div><a class="btn solid" href="#case/${c.id}">Open process board ↗</a></div>${c.proc?`<button class="textbtn" data-proc="${c.proc}">Stage overview →</button>`:''}<details class="process-steps"><summary>Show all ${c.steps.length} steps</summary><ol>${c.steps.map(s=>`<li><a href="#case/${c.id}/step/${s.n}"><span>${s.n}</span><div><b>${esc(s.name)}</b><small>${esc(s.system)} · ${(s.median_s_per_cohort_run/60).toFixed(1)} min typical</small></div><span>↗</span></a></li>`).join('')}</ol></details></article>`;}).join('')}</div>`;
 }
 $('#v-plan').innerHTML=`<div class="page"><span class="eyebrow">FROM INSIGHT TO ACTION</span><h1>Processes & automation</h1><p class="lede">Understand how work happens. Decide what to improve, what to automate, and what stays with people.</p>${tabs}${body}<div class="note">Fictional sample · every original process, report and board remains available.</div></div>`;
 if(S.tab==='plan')bindCost();
};
/* Extend legacy URL routing, without inferring identities between cohorts. */
const legacyFromHash=fromHash;
fromHash=function(){const h=decodeURIComponent(location.hash.slice(1));if(h.startsWith('unit/')){S.view='people';S.unit=h.slice(5);S.profile=null;return;}if(h==='maps'){S.view='plan';S.tab='maps';S.showOverview=false;return;}S.unit=null;if(h.startsWith('process/'))S.showOverview=true;if(h==='cases')S.showOverview=false;legacyFromHash();};
