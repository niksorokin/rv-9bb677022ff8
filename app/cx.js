
/* Process deep-dives v22: Notion-style process pages around a React Flow board (window.SilowBoard).
   Data: inline JSON #case-data (fictional). Exposes window.CX for the host app. */
(function(){
'use strict';
const D=JSON.parse(document.getElementById('case-data').textContent.replace(/\bacord\b/g,'ACORD'));
const CASES=D.cases;
const BYID=Object.fromEntries(CASES.map(c=>[c.id,c]));
const SHORT={c1:'Mailing packages',c2:'Adjuster replies',c3:'Exception handling',c4:'Returned mail',c5:'Claims document intake',n1:'FNOL to claim set-up',n2:'Medical bill to payment',n3:'Monthly loss-ratio pack',n4:'Regression cycle',n5:'Endorsement requests'};
const ICON={c1:'✉',c2:'⏳',c3:'⚑',c4:'↩',c5:'⎘',n1:'⚠',n2:'✚',n3:'◔',n4:'✓',n5:'✎'};
const UNIT=Object.fromEntries(CASES.map(c=>[c.id,c.x.unit]));
const LABELS={
 c1:['Open mailing queue','Open policy record','Check address','Select template','Generate document','Download PDF','Rename file','Open archive','Find signed document','Download it','Merge package','Check pages','Add cover sheet','Send to print','Collect printout','Log tracking','Update status','Upload copy','Close queue item'],
 c2:['Open blocked task','Find adjuster','Draft question','Send request','Wait for reply','Wait to resume','Restore context','Check answer','Ask clarification','Wait, clarification','Check clarification','Update instruction','Close request'],
 c3:['Read exception','Open policy','Open instruction','Identify term','Compare addresses','Verify authority','Separate risk change','Draft correction','Validate correction','Link evidence','Resolve task','Discard old draft','Check guidance'],
 c4:['Select next item','Navigate to record','Read instruction','Compare address','Draft correction','Validate record','Prepare letter','Queue replacement','Archive evidence','Close task','Open private log','Double-enter log'],
 c5:['Open email','Inspect attachments','Find claim ref','Find claim','Verify match','Check prior copies','Save attachments','Classify documents','Re-key metadata','Upload documents','Wait for archive','Check copies','Link to claim','Close intake'],
 n1:['Open FNOL email','Read attachments','Log in tracker','Search policy','Check coverage','Check duplicates','Start new claim','Re-key loss details','Add claimant','Copy claim no.','Upload attachments','Index documents','Check indexing','Review severity','Assign adjuster','Notify adjuster','Acknowledge claimant','Close notice'],
 n3:['Refresh datasets','Export tables','Check totals','Post extract links','Pull GL balances','Match losses to GL','Explain differences','Finance sign-off','Copy figures to pack','Rebuild pivots & charts','Paste charts to deck','Compare to plan','Write commentary','SVP review','Publish pack'],
 n4:['Read release notes','Select scenarios','Reset environment','Find test policies','Create test policies','Create test claims','Run scenarios','Record pass/fail','Take screenshots','Attach evidence','Reproduce failures','Write defects','Compile summary','UAT sign-off'],
 n5:['Open request','Read the change','Search policy','Open current terms','Start endorsement','Re-key change details','Rate the change','Refer to underwriter','Underwriter approves','Issue endorsement','Generate certificate','Reply to agent'],
 n2:['Open next bill','Match to claim','Open records','Check provider & dates','Look up fee schedule','Check duplicates','Enter reviewed amounts','Note overrides','Send for approval','Read approval','Open payment batch','Re-key into batch','Check batch totals','Match bank file','Email provider','Close bill']};
const FLAGS={manual_rekey:['R','Re-keying between systems'],system_handoff:['H','Hand-off to another system'],wait:['W','Waiting'],search:['S','Searching'],decision:['D','Judgement call']};
const TAG={gray:['#E3E2E0','#32302C'],brown:['#EEE0DA','#442A1E'],orange:['#FADEC9','#49290E'],yellow:['#FDECC8','#402C1B'],green:['#DBEDDB','#1C3829'],blue:['#D3E5EF','#183347'],purple:['#E8DEEE','#412454'],pink:['#F5E0E9','#4C2337'],red:['#FFE2DD','#5D1715']};
const PAL=['blue','orange','green','purple','pink','yellow','brown','red','gray'];
const ST={cat:{},stage:{},mode:{},color:{},sel:{},sort:{},trace:{},method:{},last:null,board:null,boardCase:null};
const el=id=>document.getElementById(id);
const SB=()=>document.getElementById('sbody');
const E=s=>String(s==null?'':s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function dur(s){s=Number(s);if(!(s>0))return '—';if(s<90)return Math.round(s)+' s';if(s<5400)return (s/60).toFixed(1)+' min';const m=Math.round(s/60);return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')+' min';}
function hrs(h){if(h<1)return Math.round(h*60)+' min';return h.toFixed(1)+' h';}
function clock(s,long){s=Math.round(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=String(s%60).padStart(2,'0');return long?h+':'+String(m).padStart(2,'0')+':'+x:String(Math.floor(s/60)).padStart(2,'0')+':'+x;}
const pct=x=>x>0&&x<1?'<1%':Math.round(x)+'%';
const num=n=>Number.isInteger(n)?String(n):Number(n).toFixed(1);
const bn=c=>c.steps.find(s=>s.n===c.bottleneck.step_n);
const med=s=>s.median_s_per_cohort_run;
const share=s=>s.share_pct_of_sum_step_medians;
const label=(c,n)=>(LABELS[c.id]||[])[n-1]||c.steps[n-1].name;
const route=c=>'#case/'+c.id;
const stepurl=(c,n)=>route(c)+'/step/'+n;
const typical=c=>[...c.variants].sort((a,b)=>b.share_pct_of_runs-a.share_pct_of_runs)[0];
const vstep=(c,v)=>v.step_medians_s_per_run[String(c.bottleneck.step_n)];
const slowest=c=>[...c.variants].sort((a,b)=>vstep(c,b)-vstep(c,a))[0];
const fastest=c=>[...c.variants].sort((a,b)=>vstep(c,a)-vstep(c,b))[0];
const lcf=s=>s.charAt(0).toLowerCase()+s.slice(1);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fdate=iso=>{const [y,m,d]=iso.split('-').map(Number);return MON[m-1]+' '+d;};
const WIN=fdate(D.window.from)+' – '+fdate(D.window.to);
const fmon=iso=>{const [y,m]=iso.split('-').map(Number);return MON[m-1]+' '+y;};
const CAD=c=>c.x.period!=='day';
const AD=c=>CAD(c)?'a '+c.x.period:'a day';
const VOL=c=>CAD(c)?'once a '+c.x.period:num(c.x.runs_per_day)+' '+UNIT[c.id]+'s a day';
const VOLTXT=c=>CAD(c)?'Once a '+c.x.period+' · '+c.x.periods+' '+UNIT[c.id]+'s analysed':num(c.x.runs_per_day)+' '+UNIT[c.id]+'s a day · '+num(c.runs_per_week)+' a week';
const WINc=c=>CAD(c)?'the last '+c.x.periods+' '+c.x.period+'s ('+fmon(c.x.days[0].date)+' – '+fmon(c.x.days[c.x.days.length-1].date)+')':'three weeks ('+WIN+', 15 working days)';
const EUNIT=c=>CAD(c)?c.x.period:'week';
const caseColors=c=>{const o={},order=[];(c.x.typical_order||[]).concat(c.steps.map(s=>s.n)).forEach(n=>{const s=c.steps[n-1].system;if(!order.includes(s))order.push(s);});c.steps.forEach(s=>s.actions.forEach(a=>{if(!order.includes(a.system))order.push(a.system);(a.from_system&&!order.includes(a.from_system))&&order.push(a.from_system);}));order.forEach((s,i)=>o[s]=PAL[i%PAL.length]);return o;};
const COLORS={};CASES.forEach(c=>COLORS[c.id]=caseColors(c));
const tag=(c,sys,extra='')=>{const [bg,fg]=TAG[(COLORS[c.id]||{})[sys]]||TAG.gray;return '<span class="ntag '+extra+'" style="background:'+bg+';color:'+fg+'">'+E(sys)+'</span>';};
const flagchips=s=>'<span class="flags">'+s.flags.map(f=>'<span class="fl" title="'+FLAGS[f][1]+'">'+FLAGS[f][0]+'</span>').join('')+'</span>';
const list=a=>'<ul>'+a.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul>';
const secHead=(k,t,p,r)=>'<div class="sec-h"><span class="k">'+k+'</span><h2>'+t+'</h2>'+(r?'<span class="r">'+r+'</span>':'')+(p?'<p>'+p+'</p>':'')+'</div>';
const isWait=c=>!!c.x.bn_is_wait;
const personRec=(c,id)=>c.x.people.find(p=>p.id===id);
function pname(id){if(typeof PERSON!=='undefined'&&PERSON[id])return nm(PERSON[id]);const p=D.people.find(x=>x.id===id);return p?p.pseudonym:id;}
function prole(c,id){if(typeof PERSON!=='undefined'&&PERSON[id])return ROLES[PERSON[id].role].title;const p=personRec(c,id);return (p&&p.role)||'';}
function pav(id){if(typeof PERSON!=='undefined'&&PERSON[id])return av(PERSON[id]);const p=D.people.find(x=>x.id===id);return '<span class="av anon" aria-hidden="true">'+E(p?p.pseudonym.replace(/\D+/g,'').slice(-2):'•')+'</span>';}
const groupCases=g=>CASES.filter(c=>c.group===g);
const HOST=()=>typeof PERSON!=='undefined';
const SUG_STEP={fnol:['n1',8],docs:['n1',12],medbill:['n2',5],recon:['n2',14],pack:['n3',10],regress:['n4',7],testdata:['n4',5],defects:['n4',12],endorse:['n5',6]};
const procSugs=c=>HOST()&&c.proc?PLAN.filter(x=>x.proc===c.proc):[];
const stageSteps=(c,k)=>c.steps.filter(s=>s.stage===k);
const stageSlow=(c,k)=>stageSteps(c,k).reduce((a,s)=>!a||med(s)>med(a)?s:a,null);
const personChip=id=>HOST()&&PERSON[id]?'<a class="pchip" data-person="'+id+'" title="Open personal report">'+pav(id)+E(pname(id))+'</a>':'<a class="pchip" href="#profile/'+id+'">'+pav(id)+E(pname(id))+'</a>';
const teamName=t=>HOST()&&TEAM[t]?TEAM[t].name:t;
const LINKED=()=>CASES.filter(c=>c.x.link);
const lk=(c,pid)=>c.x.link&&c.x.link.weeks[pid];
const WK=['Oct 13–17','Oct 20–24','Oct 27–31'];
const catName=(pid,k)=>{if(!HOST()||!PERSON[pid])return k;const r=ROLES[PERSON[pid].role],x=r&&r.cats.find(z=>z.id===k);return x?x.n:k;};
const mins=m=>m>=60?Math.floor(m/60)+' h '+String(Math.round(m%60)).padStart(2,'0')+' min':Math.round(m)+' min';
const stepsTxt=a=>(a.length>1?'steps ':'step ')+rng(a);
const rng=a=>{a=[...a].sort((x,y)=>x-y);const o=[];let i=0;while(i<a.length){let j=i;while(j+1<a.length&&a[j+1]===a[j]+1)j++;o.push(j>i+1?a[i]+'–'+a[j]:j>i?a[i]+', '+a[j]:''+a[i]);i=j+1;}return o.join(', ');};
const catSteps=(c,pid,k)=>{const L=lk(c,pid);return L?L.steps.filter(n=>{for(const w of L.weeks){const x=w.steps[n];if(x)return x.cat===k;}return c.x.link.catmap[n]===k;}):[];};
const runWeek=c=>{if(!CAD(c))return null;for(const pid in c.x.link.weeks){const w=c.x.link.weeks[pid].weeks.find(x=>Object.keys(x.steps).length);if(w)return w.wi;}return null;};
const pweek=(pid,wi,k,label)=>'<a class="nlink" data-pweek="'+pid+':'+wi+(k?':'+k:'')+'">'+label+'</a>';
function weekSum(c,pid,wi){const w=lk(c,pid).weeks[wi];let m=0,stream=0;for(const k in w.cats){m+=w.cats[k].process_min;stream+=w.cats[k].stream_min;}return {w,m,stream};}
const plink=id=>(typeof PERSON!=='undefined'&&PERSON[id])?'<a class="plink" data-person="'+id+'" title="Open personal report">Report ↗</a>':'';


/* Department > team > person. Teams belong to exactly one department. */
const DEPT={claims:{name:'Claims',teams:['intake','qa','Claims correspondence support','Claims shared services']},finance:{name:'Finance',teams:['fin']},operations:{name:'Operations',teams:['strat']},underwriting:{name:'Underwriting',teams:['uw','Policy servicing','Policy exception desk']},leadership:{name:'Leadership',teams:['Leadership']}};
const deptOf=t=>Object.values(DEPT).find(d=>d.teams.includes(t))?.name||'Leadership';
function ownerTeam(id){return HOST()&&PERSON[id]?PERSON[id].team:(D.people.find(p=>p.id===id)?.team||'Leadership');}
function org(c){
 if(c.id==='n2'){const hand=HOST()&&TEAM.intake.hand.find(h=>h.from==='intake'&&h.to==='fin');if(hand){const waits=[...hand.wait].sort((a,b)=>a-b);c.edge_waits=c.edge_waits.map(w=>w[0]===10&&w[1]===11?[10,11,waits[Math.floor(waits.length/2)]*3600]:w);}}
 c.steps.forEach(s=>{s.owner_ids=Object.keys(c.x.step_people[s.n]?.by_person||{});if(!s.owner_ids.length)s.owner_ids=c.x.people.filter(p=>p.steps.includes(s.n)).map(p=>p.id);s.team_ids=[...new Set(s.owner_ids.map(ownerTeam))];s.department=[...new Set(s.team_ids.map(deptOf))].join(' + ');s.team_label=s.team_ids.map(teamName).join(' + ');s.owner_label=s.owner_ids.map(pname).join(', ');});
 const order=c.x.typical_order||c.steps.map(s=>s.n),route=[];order.forEach(n=>{const d=c.steps[n-1].department;if(route.at(-1)!==d)route.push(d);});
 return {route,teams:[...new Set(c.steps.flatMap(s=>s.team_ids))]};
}
function orgProps(c){const o=org(c);return '<div class="nprop"><span class="nk">'+ic('building',14,2)+'Departments</span><b class="nv dept-route" data-department-route>'+E(o.route.join(' → '))+'</b></div><div class="nprop"><span class="nk">'+ic('users',14,2)+'Teams & members</span><div class="nv dept-roster">'+o.teams.map(t=>'<div><b>'+E(deptOf(t))+' / '+E(teamName(t))+'</b><div class="nrel">'+c.people_ids.filter(id=>ownerTeam(id)===t).map(personChip).join('')+'</div></div>').join('')+'</div></div>';}
function departmentsPage(id){const entries=id&&DEPT[id]?[[id,DEPT[id]]]:Object.entries(DEPT);return '<div class="npage"><div class="nbread"><a href="#departments">Departments</a> / Harbor Mutual</div><div class="nicon">▦</div><h1 class="ntitle">'+(id&&DEPT[id]?E(DEPT[id].name):'Departments')+'</h1><p class="lede">Department → team → people. Each team has one department; processes can cross departmental boundaries and return to their originating team.</p>'+entries.map(([key,d])=>{const cs=CASES.filter(c=>org(c).teams.some(t=>deptOf(t)===d.name));return '<section class="sec"><h2><a class="nlink" href="#department/'+key+'">'+E(d.name)+'</a></h2>'+d.teams.map(t=>{const host=HOST()&&TEAM[t],ids=host?host.members.map(p=>p.id):[...new Set(cs.flatMap(c=>c.people_ids.filter(id=>ownerTeam(id)===t)))];if(!ids.length)return '';return '<div class="card" style="margin:12px 0"><h3>'+(host?'<a class="nlink" data-team="'+t+'">'+E(teamName(t))+' ↗</a>':E(t))+'</h3><div class="nrel" style="margin-top:10px">'+ids.map(personChip).join('')+'</div></div>';}).join('')+'<h3>Processes involving '+E(d.name)+'</h3><div class="cxcards">'+cs.map(cardFor).join('')+'</div></section>';}).join('')+'</div>';}

/* ---------- home ---------- */
function cardFor(c){const s=bn(c);return '<a class="cxcard" data-casecard="'+c.id+'" href="'+route(c)+'"><span class="cicon">'+ICON[c.id]+'</span><div><div class="hl">'+E(c.title)+'</div><div class="t">Step '+s.n+' · '+E(s.name)+'</div><div class="d">'+c.steps.length+' steps · '+E(org(c).route.join(' → '))+' · '+dur(med(s))+' typical in the slow step</div></div><span class="chev">'+ic('right',14,2)+'</span></a>';}

function home(){
 const steps=CASES.reduce((a,c)=>a+c.steps.length,0),runs=CASES.reduce((a,c)=>a+c.summary.runs_count_in_window,0);
 return '<div class="npage"><div class="nicon">◫</div><h1 class="ntitle">Process deep-dives</h1><div class="lede">Every step of each process as it is — none merged into stages. Open a process to see it as a board with the time on every step, the slow step marked, what happens inside each step, how often it runs per person and per day, and how each person compares with the rest of the team.</div>'+
 tiles([{l:'Processes',v:CASES.length,s:'5 from the call · 5 Harbor Mutual'},{l:'Steps mapped',v:steps,s:'every step, none merged'},{l:'People',v:CASES.reduce((a,c)=>a+c.people_ids.length,0),s:'pseudonyms unless named'},{l:'Runs in 3 weeks',v:runs.toLocaleString('en-US'),s:WIN,hl:1}],'c4')+
 '<div class="ngroup"><div class="ngroup-h"><b>Use cases from the call</b><span>Five processes, one per question</span></div><div class="cxcards">'+groupCases('jeremy').map(cardFor).join('')+'</div></div>'+
 '<div class="ngroup"><div class="ngroup-h"><b>Harbor Mutual · every process, step by step</b><span>The five processes in Processes &amp; automation, each opened from its 6-stage overview into every step — linked to the teams, the people and the automation plan</span></div><div class="cxcards">'+groupCases('harbor').map(cardFor).join('')+'</div></div>'+
 '<div class="note">Sample data. Fictional company, names and documents.</div></div>';
}

/* ---------- process page: header, properties, composition ---------- */
function related(c){
 if(c.group!=='harbor'){
  if(c.id!=='c5'||!HOST())return '';
  return '<div class="nprop"><span class="nk">'+ic('flow',14,2)+'Related</span><span class="nv nrel"><span class="nlink" data-team="intake">Team report · Claims intake</span><span class="nlink" data-sug="docs">Automation plan · '+E(SUG.docs.t)+'</span><a class="nlink" href="#case/n1?stage=4">The same work inside FNOL set-up, stage 4</a></span></div>';
 }
 const teams=[...new Set(c.people_ids.filter(id=>HOST()&&PERSON[id]).map(id=>PERSON[id].team))];
 const sugs=procSugs(c);
 return '<div class="nprop"><span class="nk">'+ic('users',14,2)+'People</span><span class="nv nrel">'+c.people_ids.map(personChip).join('')+'</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('building',14,2)+'Team reports</span><span class="nv nrel">'+teams.map(t=>'<span class="nlink" data-team="'+t+'">'+E(teamName(t))+'</span>').join('')+'</span></div>'+
 (sugs.length?'<div class="nprop"><span class="nk">'+ic('flow',14,2)+'Automation plan</span><span class="nv nrel">'+sugs.map(x=>'<span class="nlink" data-sug="'+x.id+'">'+E(x.t)+'</span>').join('')+'</span></div>':'');
}
function zoomSwitch(c){
 if(!c.stages)return '';
 return '<div class="zoomsw" role="group" aria-label="Level of detail"><button data-proc="'+c.proc+'">'+ic('flow',13,2)+'Overview · '+c.stages.length+' stages</button><button class="on">'+ic('map',13,2)+'Every step · '+c.steps.length+'</button></div>';
}
function crumbHtml(c,extra){
 const a=c.group==='harbor'?'<a data-v="plan" data-tabmaps>Processes &amp; automation</a> / '+E(org(c).teams.map(teamName).join(' + ')):'<a href="#cases">Processes &amp; automation</a> / Process insights';
 return '<div class="nbread">'+a+(extra?' / <a href="'+route(c)+'">'+E(c.title)+'</a> / '+extra:'')+'</div>';
}
function header(c){
 const b=bn(c),x=c.x,sysList=[...new Set((c.x.typical_order||[]).map(n=>c.steps[n-1].system).concat(c.systems))];
 const perPerson=x.runs_per_day/Math.max(1,x.people.filter(p=>p.runs).length);
 return '<div class="npage">'+crumbHtml(c)+'<div class="ntop"><div class="nicon">'+ICON[c.id]+'</div>'+zoomSwitch(c)+'</div><h1 class="ntitle">'+E(c.title)+'</h1>'+
 '<div class="nprops">'+orgProps(c)+
 '<div class="nprop"><span class="nk">'+ic('building',14,2)+'Systems</span><span class="nv">'+sysList.map(s=>tag(c,s)).join(' ')+'</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('clock',14,2)+'Volume</span><span class="nv">'+(CAD(c)?'<b>Once a '+x.period+'</b> · last '+x.periods+' '+UNIT[c.id]+'s analysed · '+hrs(x.team_hours_per_day)+' hands-on per '+UNIT[c.id]:'<b>'+num(x.runs_per_day)+' '+UNIT[c.id]+'s a day</b> across the team · about '+num(Math.round(perPerson*10)/10)+' per person · '+num(c.runs_per_week)+' a week')+'</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('flow',14,2)+'Steps</span><span class="nv">'+c.steps.length+' steps, '+dur(c.summary.elapsed_run_time.median)+' a typical '+UNIT[c.id]+(isWait(c)?' (elapsed, mostly waiting)':' · '+hrs(x.team_hours_per_day)+' of team time '+AD(c))+'</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('search',14,2)+'Slowest step</span><span class="nv"><a class="nlink strong" href="'+stepurl(c,b.n)+'">Step '+b.n+' · '+E(b.name)+'</a> · '+dur(med(b))+' · '+pct(share(b))+' of the time</span></div>'+related(c)+'</div>'+
 '<div class="ncallout"><span class="ci">💡</span><div><b>'+E(c.verdict.replace(/(\d+)h (\d+)m\b/g,(m,h,mm)=>h+' h '+mm+' min'))+'</b><p>'+E(c.bottleneck.why)+' <a class="nlink strong" href="'+route(c)+'/end">The one step to change →</a></p></div></div>'+
 composition(c)+'</div>';
}
function composition(c){
 const b=bn(c),tot=c.steps.reduce((a,s)=>a+(med(s)||0),0)||1;
 return '<div class="comp" id="composition"><div class="comp-h"><b>Where the time of one '+UNIT[c.id]+' goes</b><span>'+c.steps.length+' steps, typical time each · hover a segment, click to open it</span></div><div class="comp-bar">'+c.steps.map(s=>{const w=(med(s)||0)/tot*100;return '<a href="#" data-pick="'+s.n+'" class="seg-s'+(s===b?' hot':'')+(s.kind==='wait'?' wait':'')+'" style="flex:'+Math.max(w,.35).toFixed(2)+'" title="Step '+s.n+' · '+E(s.name)+' · '+dur(med(s))+' · '+pct(share(s))+'">'+(w>7?'<span>'+s.n+' · '+E(label(c,s.n))+' · '+pct(share(s))+'</span>':w>2.5?'<span>'+s.n+'</span>':'')+'</a>';}).join('')+'</div>'+
 '<div class="comp-legend"><span><i class="hot"></i>Step '+b.n+' — '+pct(share(b))+'</span><span><i></i>The other '+(c.steps.length-1)+' steps together — '+pct(100-share(b))+'</span></div></div>';
}

/* ---------- board section with side peek ---------- */
function boardSection(c){
 const mode=ST.mode[c.id]||'typical',color=ST.color[c.id]||'time';
 const people=c.x.people.filter(p=>p.runs||p.steps.length);
 return '<section class="sec bsec" id="map">'+secHead('01','Process board','Every step in its system lane, in the order most runs follow. Click a step to open what happens inside it; double-click to open it full page. Drag to pan; pinch or use the controls to zoom.')+
 '<div class="btools"><div class="seg" role="group" aria-label="Path">'+[{id:'typical',name:'Typical path'}].concat(c.variants).map(v=>'<button data-bmode="'+v.id+'" class="'+(mode===v.id?'on':'')+'">'+E(v.name)+(v.id!=='typical'?'<small>'+pct(v.share_pct_of_runs)+'</small>':'')+'</button>').join('')+'</div>'+
 '<label class="bsel"><span>Person</span><select data-bperson><option value="">Whole team</option>'+people.map(p=>'<option value="'+p.id+'"'+(mode==='person:'+p.id?' selected':'')+'>'+E(pname(p.id))+'</option>').join('')+'</select></label>'+
 '<div class="seg" role="group" aria-label="Colour"><button data-bcolor="time" class="'+(color==='time'?'on':'')+'">Time</button><button data-bcolor="spread" class="'+(color==='spread'?'on':'')+'">Difference between people</button></div></div>'+
 (c.id==='n2'?'<div class="note" style="margin:12px 0">Department handoffs: Claims → Finance (payment), 10 h typical queue (median of weekly team handoff waits: 9 / 10 / 12 h). Finance → Claims (return / close), no additional wait recorded. The 24 h bank-file wait remains within Finance; the 10 h approval wait remains within Claims. Illustrative sample data.</div>':'')+'<div id="stagebar">'+stageBar(c)+'</div><div class="bstate" id="bstate">'+boardState(c)+'</div>'+
 '<div class="bgrid"><div class="board" id="board"></div><aside class="peek'+(ST.peekClosed?' closed':'')+'" id="peek" aria-label="Step details">'+peek(c,ST.sel[c.id]||c.bottleneck.step_n)+'</aside><button class="peek-open'+(ST.peekClosed?'':' hide')+'" data-peek-open>Show step details</button></div>'+
 '<div class="cmlegend"><span><i class="lg hot"></i>Slowest step</span><span><i class="lg heat"></i>Left edge: darker = more time</span>'+(c.steps.some(s=>s.kind==='wait')?'<span><i class="lg wait"></i>Waiting</span>':'')+((c.edge_waits||[]).length?'<span><i class="lg ewait"></i>Wait between steps</span>':'')+(c.stages?'<span><i class="lg stage"></i>Stages from the 6-stage overview</span>':'')+Object.keys(FLAGS).filter(f=>c.steps.some(s=>s.flags.includes(f))).map(f=>'<span><span class="fl">'+FLAGS[f][0]+'</span>'+FLAGS[f][1]+'</span>').join('')+'</div></section>';
}
function streamBar(c){
 const f=ST.cat[c.id];if(!f)return '';const L=lk(c,f.pid);if(!L)return '';
 const ns=catSteps(c,f.pid,f.k),wi=f.wi!=null?f.wi:(CAD(c)?runWeek(c):2),x=L.weeks[wi].cats[f.k];
 return '<div class="stagebar stream"><span class="sb-k">Work stream</span><b>'+E(catName(f.pid,f.k))+'</b><span>'+E(pname(f.pid))+' · '+stepsTxt(ns)+(x?' · week '+(wi+1)+': '+mins(x.process_min)+' here of '+mins(x.stream_min)+' in the report ('+Math.round(x.share*100)+'% of the stream is this process)':' · no '+UNIT[c.id]+' in week '+(wi+1))+'</span><span class="grow"></span><button data-pweek="'+f.pid+':'+wi+':'+f.k+'">Back to the personal report</button><button data-clearcat>Whole process</button></div>';
}
function stageBar(c){
 if(ST.cat[c.id])return streamBar(c);
 const k=ST.stage[c.id];if(!k||!c.stages)return '';
 const ss=stageSteps(c,k),t=ss.reduce((a,s)=>a+(med(s)||0),0),sl=stageSlow(c,k);
 const ov=HOST()&&PROC[c.proc]?PROC[c.proc].steps[k-1]:null;
 return '<div class="stagebar"><span class="sb-k">Stage '+k+' of '+c.stages.length+'</span><b>'+E(c.stages[k-1])+'</b><span>'+(ss.length>1?ss.length+' steps here: '+ss[0].n+'–'+ss[ss.length-1].n:'1 step here: '+ss[0].n)+' · '+dur(t)+(ov?' (overview: '+hm(ov.min)+')':'')+' · slowest inside: step '+sl.n+'</span><span class="grow"></span>'+(k>1?'<button data-stage="'+(k-1)+'">← Stage '+(k-1)+'</button>':'')+(k<c.stages.length?'<button data-stage="'+(k+1)+'">Stage '+(k+1)+' →</button>':'')+'<button data-stage="0">All stages</button><button data-proc="'+c.proc+'">Back to the overview</button></div>';
}
function personWeeksLine(c,pid){
 if(!lk(c,pid)||!HOST()||!PERSON[pid])return '';
 const ws=(CAD(c)?[runWeek(c)]:[0,1,2]).map(wi=>{const {w,m}=weekSum(c,pid,wi);return m?pweek(pid,wi,'','Week '+(wi+1)+': '+(w.runs?w.runs+' '+UNIT[c.id]+'s, ':'')+mins(m)):'';}).filter(Boolean);
 return ws.length?'<div class="pwk">From '+E(pname(pid))+'’s personal report: '+ws.join(' · ')+'. <a class="nlink" data-person="'+pid+'">Open the report →</a></div>':'';
}
function boardState(c){
 const mode=ST.mode[c.id]||'typical';
 if(mode.startsWith('person:')){const p=personRec(c,mode.slice(7));const b=bn(c);return personWeeksLine(c,p.id)+ '<b>'+E(pname(p.id))+'</b> · '+(p.runs&&!CAD(c)?num(p.runs_per_day)+' '+UNIT[c.id]+'s a day · ':'')+hrs(p.hours_per_day)+' '+AD(c)+' in this process'+(p.bottleneck_median_s?' · step '+b.n+': '+dur(p.bottleneck_median_s)+' against team '+dur(c.x.bench[b.n].team_median):'')+'. Each step shows this person’s typical time and the difference to the team; faded steps are done by someone else.';}
 const v=c.variants.find(x=>x.id===mode);
 if(v)return '<b>'+E(v.name)+'</b> · '+pct(v.share_pct_of_runs)+' of runs · '+dur(v.median_s_per_run)+' a typical run. '+E(v.description);
 return (ST.color[c.id]==='spread'?'Colour shows how much the typical time differs between people on each step (slowest ÷ fastest person). ':'')+'Typical path across all '+c.summary.runs_count_in_window+' runs in '+(CAD(c)?'the last '+c.x.periods+' '+c.x.period+'s.':'three weeks.');
}
function mountBoard(c){
 org(c);
 const host=el('board');if(!host||!window.SilowBoard)return;
 if(ST.board){try{ST.board.unmount();}catch(e){}ST.board=null;}
 ST.boardCase=c.id;
 ST.board=window.SilowBoard.mount(host,{only:ST.cat[c.id]?catSteps(c,ST.cat[c.id].pid,ST.cat[c.id].k):null,stage:ST.stage[c.id]||0,inset:peekInset(),case:c,mode:ST.mode[c.id]||'typical',color:ST.color[c.id]||'time',selected:ST.sel[c.id]||c.bottleneck.step_n,colors:COLORS[c.id],labels:LABELS[c.id],initial:ST.initial||'bn',
  onSelect:n=>selectStep(c,n),onOpen:n=>{location.hash=stepurl(c,n);}});
 ST.initial=null;
 if(!host._dbl){host._dbl=1;host.addEventListener('dblclick',e=>{const nd=e.target.closest('[data-node]'),cc=BYID[ST.boardCase];if(nd&&cc)location.hash=stepurl(cc,Number(nd.dataset.node));},true);}
}
function setStage(c,k){ST.cat[c.id]=null;if(ST.board)ST.board.update({only:null});ST.stage[c.id]=k||0;const b=el('stagebar');if(b)b.innerHTML=stageBar(c);if(ST.board)ST.board.update({stage:k||0});bind(c);if(k){const sl=stageSlow(c,k);selectStep(c,sl.n);}}
function updateBoard(c){if(ST.board)ST.board.update({mode:ST.mode[c.id]||'typical',color:ST.color[c.id]||'time',selected:ST.sel[c.id]||c.bottleneck.step_n});const s=el('bstate');if(s)s.innerHTML=boardState(c);}
function peekInset(){return ST.peekClosed||innerWidth<900?0:392;}
function setPeek(c,open){ST.peekClosed=!open;const p=el('peek'),b=document.querySelector('#v-cases [data-peek-open]');if(p)p.classList.toggle('closed',!open);if(b)b.classList.toggle('hide',open);if(ST.board)ST.board.update({inset:peekInset()});}
function selectStep(c,n){ST.sel[c.id]=n;setPeek(c,true);updateBoard(c);const p=el('peek');if(p){p.innerHTML=peek(c,n);p.scrollTop=0;bindPeek(c);}if(ST.board)setTimeout(()=>ST.board.focus(n),30);}

/* ---------- what happens inside a step ---------- */
const VERB={'elapsed gap':'Waiting','other task':'Other work','send reminder':'Reminder','copy field':'Copy','follow link':'Follow link','retain view':'Keep view open','review':'Review'};
const verb=v=>VERB[v]||v.charAt(0).toUpperCase()+v.slice(1);
function hops(c,acts){const seq=[];acts.forEach(a=>{if(a.observed===false)return;const sys=[a.from_system,a.system].filter(Boolean);sys.forEach(s=>{if(seq[seq.length-1]!==s)seq.push(s);});});return seq;}
function hopsHtml(c,sq){if(!sq.length)return '<span class="mute">Not on screen</span>';if(sq.length<=5)return sq.map((x,i)=>(i?'<span class="ar">→</span>':'')+tag(c,x)).join('');const u=[...new Set(sq)];return u.map((x,i)=>(i?'<span class="ar">⇄</span>':'')+tag(c,x)).join('')+'<span class="mute hsw">'+(sq.length-1)+' switches between '+u.length+' systems</span>';}
function stepFacts(c,s){
 const sp=c.x.step_people[s.n]||{by_person:{}},vals=Object.values(sp.by_person);
 const perDay=c.x.runs_per_day*s.executed_runs_count/c.summary.runs_count_in_window;
 const teamDay=perDay*(s.median_s_per_executed_run||0)/3600;
 return {perDay,teamDay,minP:vals.length?Math.min(...vals):null,maxP:vals.length?Math.max(...vals):null,n:vals.length};
}
function actionLine(c,a,long){
 const gap=a.observed===false;
 const bits=[];
 if(a.screen)bits.push('<span class="chip scr">'+ic('file',11,2)+E(a.screen)+'</span>');
 if(a.query)bits.push('<span class="chip q">'+ic('search',11,2)+'“'+E(a.query)+'”</span>');
 if(a.result)bits.push('<span class="chip r">→ '+E(a.result)+'</span>');
 if(a.field)bits.push('<span class="chip mv">'+E(a.from_system)+' → '+E(a.to_system)+'</span>');
 if(a.value&&!a.field)bits.push('<span class="chip v">'+E(a.value)+'</span>');
 const obj=a.field?a.field.replaceAll('_',' ').replace('.',' · '):String(a.object).split('; ')[0];
 return '<li class="ra'+(gap?' gap':'')+'"><span class="ra-t">'+clock(a.t_offset_s,long)+'</span><span class="ra-sys">'+tag(c,a.system,'sm')+'</span><div class="ra-w"><b>'+E(verb(a.verb))+'</b> '+E(lcf(obj))+(a.field&&a.value?' <span class="val">= '+E(a.value)+'</span>':'')+(bits.length?'<div class="ra-bits">'+bits.join('')+'</div>':'')+'</div><span class="ra-d">'+dur(a.duration_s)+'</span></li>';
}
function inside(c,s,acts,opts={}){
 const long=(opts.total||0)>=3600;
 const sq=hops(c,acts),moves=acts.filter(a=>a.field),searches=acts.filter(a=>a.query||a.verb==='search');
 const max=opts.max||acts.length;
 return '<div class="inside">'+
 '<div class="in-row"><div class="in-k">Systems in order</div><div class="hops">'+hopsHtml(c,sq)+'</div></div>'+
 (searches.length?'<div class="in-row"><div class="in-k">Searched for</div><div class="in-v">'+searches.map(a=>'<div class="sq">'+tag(c,a.system,'sm')+' <span>'+E(a.query||lcf(a.object))+'</span>'+(a.result?'<span class="mute"> → '+E(a.result)+'</span>':'')+'</div>').join('')+'</div></div>':'')+
 (moves.length?'<div class="in-row"><div class="in-k">Data moved by hand</div><div class="in-v"><table class="mvt"><tbody>'+moves.map(a=>'<tr><td>'+E(a.field.replaceAll('_',' ').replace('.',' · '))+'</td><td>'+tag(c,a.from_system,'sm')+' <span class="ar">→</span> '+tag(c,a.to_system,'sm')+'</td><td class="val">'+E(a.value||'')+'</td></tr>').join('')+'</tbody></table></div></div>':'')+
 '<div class="in-row col"><div class="in-k">Actions, one by one'+(opts.caption?' · <span class="mute">'+opts.caption+'</span>':'')+'</div><ol class="replay">'+acts.slice(0,max).map(a=>actionLine(c,a,long)).join('')+(acts.length>max?'<li class="more">+ '+(acts.length-max)+' more actions</li>':'')+'</ol></div></div>';
}
function peek(c,n){
 const s=c.steps.find(x=>x.n===n)||bn(c),hot=s.n===c.bottleneck.step_n,f=stepFacts(c,s);
 let acts=s.actions,cap='typical run, '+dur(s.median_s_per_executed_run);
 if(hot&&c.variants.length){const v=slowest(c);acts=v.action_trace.actions;cap='example run on the slowest path, '+dur(v.action_trace.duration_s);}
 return '<button class="pk-x" data-peek-close aria-label="Close step details">'+ic('x',14,2)+'</button><div class="pk-h"><div class="kk">Step '+s.n+' of '+c.steps.length+(hot?' · <span class="acc">slowest step</span>':'')+(c.stages?' · <a class="nlink" data-stage="'+s.stage+'">stage '+s.stage+'</a>':'')+'</div><h3>'+E(s.name)+'</h3><div class="pk-sys">'+tag(c,s.system)+' <span class="mute">'+E(s.actor_role||'')+'</span> '+flagchips(s)+'</div></div>'+
 stepSummary(c,s)+'<div class="pk-facts"><div><b>'+dur(med(s))+'</b><span>typical per '+UNIT[c.id]+'</span></div><div><b>'+pct(share(s))+'</b><span>of the time</span></div><div><b>'+num(Math.round(f.perDay*10)/10)+'</b><span>'+(CAD(c)?'times '+AD(c):'times a day, team')+'</span></div><div><b>'+(s.kind==='wait'?'—':hrs(f.teamDay))+'</b><span>team time '+AD(c)+'</span></div></div>'+
 (f.n>1?'<div class="pk-spread">People: <b>'+dur(f.minP)+'</b> to <b>'+dur(f.maxP)+'</b> typical, '+f.n+' people</div>':'')+
 inside(c,s,acts,{max:9,caption:cap,total:hot?(slowest(c).action_trace.duration_s):s.median_s_per_executed_run})+
 '<div class="pk-f"><a class="btn solid" href="'+stepurl(c,s.n)+'">Open step '+s.n+' →</a>'+(hot?'<a class="btn" href="'+route(c)+'/brief">Automation blueprint</a>':'')+'</div>';
}
function bindPeek(c){const x=document.querySelector('#v-cases [data-peek-close]');if(x)x.onclick=()=>setPeek(c,false);}

/* ---------- volume and rhythm ---------- */
function reconcile(c){
 if(!c.x.link||!HOST())return '';
 const U=UNIT[c.id],L=c.x.link,ppl=Object.keys(L.weeks).filter(pid=>L.weeks[pid].cats.length);
 const rw=runWeek(c),weeks=CAD(c)?[rw]:[0,1,2];
 const cell=(pid,wi)=>{const {w,m}=weekSum(c,pid,wi);if(!m)return '<td class="t mute">—</td>';return '<td class="t">'+pweek(pid,wi,'',mins(m))+(w.runs?'<small>'+w.runs+' '+U+'s started</small>':'<small>'+Object.values(w.steps).reduce((a,x)=>a+x.count,0)+' steps</small>')+'</td>';};
 const streams=pid=>L.weeks[pid].cats.map(k=>{const sh=L.share[k];return '<span class="rc-s">'+E(catName(pid,k))+' <b>'+Math.round(sh*100)+'%</b></span>';}).join('');
 return '<div class="card rcard" id="reconcile"><div class="rc-h"><div><h3>Same hours as the personal reports</h3><p class="note" style="margin-top:2px">Each step belongs to a work stream in its owner’s personal report. The process takes a fixed share of that stream'+(c.id==='n1'?' (the rest of “Document matching & indexing” is documents for existing claims)':'')+'; the minutes below are the same minutes the report shows. Click a week to open that person’s report on it.</p></div></div><div class="scroll"><table class="cxt"><thead><tr><th>Person</th>'+weeks.map(wi=>'<th>Week '+(wi+1)+' · '+WK[wi]+'</th>').join('')+'<th>Work streams in the report (share that is this process)</th></tr></thead><tbody>'+
 ppl.map(pid=>'<tr data-pmode="'+pid+'"><td><span class="pwho">'+pav(pid)+E(pname(pid))+'</span></td>'+weeks.map(wi=>cell(pid,wi)).join('')+'<td>'+streams(pid)+'</td></tr>').join('')+'</tbody></table></div>'+(CAD(c)?'<p class="note">The '+U+' in the recorded weeks was built in week '+(rw+1)+' ('+WK[rw]+'); earlier '+U+'s come from the history.</p>':'')+'</div>';
}
function volumeCad(c){
 const x=c.x,b=bn(c),U=UNIT[c.id];
 const ppl=x.people.filter(p=>p.hours_per_day).sort((a,b2)=>b2.hours_per_day-a.hours_per_day);
 const mxd=Math.max(...x.days.map(d=>d.hours),.1),maxH=Math.max(...ppl.map(p=>p.hours_per_day),.01);
 const waitH=(c.edge_waits||[]).reduce((a,w)=>a+w[2],0)/3600;
 const hs=x.days.map(d=>d.hours);
 return '<section class="sec" id="volume">'+secHead('02','How often it runs — and who carries each '+U,'It runs '+VOL(c)+', so the figures are per '+U+', from '+WINc(c)+'. Each person’s time comes from the steps they own.')+
 tiles([{l:'How often',v:'Once<small>a '+x.period+'</small>',s:x.periods+' '+U+'s analysed'},{l:'Hands-on per '+U,v:hrs(x.team_hours_per_day),s:'all steps, all people'},{l:'Waiting per '+U,v:waitH?hrs(waitH):'—',s:'between stages, working hours'},{l:'In step '+b.n+' per '+U,v:hrs(x.bn_hours_per_day),s:pct(x.bn_hours_per_day/x.team_hours_per_day*100)+' of the hands-on time',hl:1}],'c4')+
 '<div class="two"><div class="card"><h3>Hands-on hours per '+U+'</h3><div class="dbars">'+x.days.map(d=>'<div class="db" title="'+fmon(d.date)+': '+hrs(d.hours)+'"><i style="height:'+Math.max(3,d.hours/mxd*100)+'%"></i><small>'+fmon(d.date).slice(0,3)+'</small></div>').join('')+'</div><p class="note">Range '+hrs(Math.min(...hs))+' – '+hrs(Math.max(...hs))+' per '+U+'.</p></div>'+
 '<div class="card"><h3>Who carries each '+U+'</h3><div class="pstrip">'+ppl.map(p=>'<div class="ps-r" data-pmode="'+p.id+'"><span class="pwho">'+pav(p.id)+E(pname(p.id))+'</span><div class="ps-t"><i style="width:'+(p.hours_per_day/maxH*100).toFixed(1)+'%" class="'+(p.steps.includes(b.n)?'o':'')+'"></i></div><span class="t">'+hrs(p.hours_per_day)+'</span></div>').join('')+'</div><p class="note">Average hands-on time per '+U+'. Orange: does step '+b.n+'.</p></div></div>'+
 '<div class="card" style="margin-top:14px;padding:4px 10px"><div class="scroll"><table class="cxt"><thead><tr><th>Person</th><th>Role</th><th>Steps</th><th>Time per '+U+'</th><th>Of it in step '+b.n+'</th></tr></thead><tbody>'+
 ppl.map(p=>'<tr data-pmode="'+p.id+'"><td><span class="pwho">'+pav(p.id)+E(pname(p.id))+'</span>'+plink(p.id)+'</td><td class="mute">'+E(prole(c,p.id))+'</td><td class="t">'+p.steps.join(', ')+'</td><td><div class="sharecell"><span>'+hrs(p.hours_per_day)+'</span><i style="width:'+(p.hours_per_day/maxH*70+1).toFixed(1)+'%"></i></div></td><td class="t">'+(p.steps.includes(b.n)?hrs(p.bottleneck_hours_per_day):'—')+'</td></tr>').join('')+
 '</tbody></table></div></div>'+reconcile(c)+'<p class="note">Click a person to see the board through their '+U+'s.</p></section>';
}
function volume(c){
 if(CAD(c))return volumeCad(c);
 const x=c.x,b=bn(c),U=UNIT[c.id];
 const ppl=x.people.filter(p=>p.runs||p.hours_per_day).sort((a,b2)=>b2.hours_per_day-a.hours_per_day);
 const mxd=Math.max(...x.days.map(d=>d.runs),1),mxh=Math.max(...x.hours,1);
 const hrsRange=x.hours.map((v,h)=>[h,v]).filter(([h,v])=>v>0);
 const h0=hrsRange.length?hrsRange[0][0]:8,h1=hrsRange.length?hrsRange[hrsRange.length-1][0]:17;
 const peakH=x.hours.indexOf(Math.max(...x.hours));
 const waitNote=isWait(c)?' Step '+b.n+' is waiting, so its hours are calendar time: on average about <b>'+(x.bn_hours_per_day/24).toFixed(1)+' '+U+'s are waiting on an adjuster at any moment</b>.':'';
 const maxH=Math.max(...ppl.map(p=>p.hours_per_day),.01);
 return '<section class="sec" id="volume">'+secHead('02','How often it runs — per person, per team, per day','Counts are completed runs in three weeks ('+WIN+', 15 working days). Team figures are the sum of the people below.')+
 tiles([{l:'Per day, whole team',v:num(x.runs_per_day)+'<small>'+U+'s</small>',s:num(c.runs_per_week)+' a week'},{l:'Per person per day',v:num(Math.round(x.runs_per_day/Math.max(1,ppl.filter(p=>p.runs).length)*10)/10),s:ppl.filter(p=>p.runs).length+' people start runs'},{l:'Team time a day',v:hrs(x.team_hours_per_day),s:'hands-on, all steps'},{l:'In step '+b.n+' a day',v:isWait(c)?hrs(x.bn_hours_per_day/ (x.runs_per_day||1))+'<small>/ '+U+'</small>':hrs(x.bn_hours_per_day),s:isWait(c)?'waiting per request, average':pct(x.bn_hours_per_day/x.team_hours_per_day*100)+' of the team’s time on this process',hl:1}],'c4')+
 '<div class="two"><div class="card"><h3>'+U.charAt(0).toUpperCase()+U.slice(1)+'s per day</h3><div class="dbars">'+x.days.map(d=>'<div class="db" title="'+fdate(d.date)+': '+d.runs+'"><i style="height:'+Math.max(3,d.runs/mxd*100)+'%"></i><small>'+fdate(d.date).split(' ')[1]+'</small></div>').join('')+'</div><p class="note">Three weeks of working days. Range '+Math.min(...x.days.map(d=>d.runs))+'–'+mxd+' a day.</p></div>'+
 '<div class="card"><h3>When in the day they start</h3><div class="dbars hrsb">'+x.hours.slice(h0,h1+1).map((v,i)=>'<div class="db'+(h0+i===peakH?' pk':'')+'" title="'+(h0+i)+':00 · '+v+' runs"><i style="height:'+Math.max(3,v/mxh*100)+'%"></i><small>'+(h0+i)+'</small></div>').join('')+'</div><p class="note">Busiest hour '+peakH+':00–'+(peakH+1)+':00. Runs by start hour, all three weeks.</p></div></div>'+
 '<div class="card" style="margin-top:14px;padding:4px 10px"><div class="scroll"><table class="cxt"><thead><tr><th>Person</th><th>Role</th><th>'+U.charAt(0).toUpperCase()+U.slice(1)+'s a day</th><th>Share of team</th><th>Time a day in this process</th><th>Of it in step '+b.n+'</th></tr></thead><tbody>'+
 ppl.map(p=>'<tr data-pmode="'+p.id+'"><td><span class="pwho">'+pav(p.id)+E(pname(p.id))+'</span>'+plink(p.id)+'</td><td class="mute">'+E(prole(c,p.id))+'</td><td class="t">'+(p.runs?num(p.runs_per_day):'—')+'</td><td class="t">'+(p.runs?pct(p.share_of_team_runs):'—')+'</td><td><div class="sharecell"><span>'+hrs(p.hours_per_day)+'</span><i style="width:'+(p.hours_per_day/maxH*70+1).toFixed(1)+'%"></i></div></td><td class="t">'+(p.steps.includes(b.n)?(isWait(c)?'waiting':hrs(p.bottleneck_hours_per_day)):'—')+'</td></tr>').join('')+
 '</tbody></table></div></div><p class="note">'+(c.id==='n2'?'Coordinators start each bill; payments accountants take steps 11–15 of the same bills, so their time comes from runs they did not start. ':c.id==='n1'?'The intake lead reviews and assigns every new claim (steps 14–16) and also takes some notices. ':'')+'Click a person to see the board through their runs.'+waitNote+'</p>'+reconcile(c)+'</section>';
}

/* ---------- team benchmark ---------- */
function bench(c){
 const x=c.x,b=bn(c),ns=c.steps.map(s=>s.n);
 const ppl=x.people.filter(p=>p.steps.length).sort((a,b2)=>(a.bottleneck_median_s||1e9)-(b2.bottleneck_median_s||1e9));
 const cell=(p,n)=>{const m=(x.step_people[n]||{by_person:{}}).by_person[p.id],t=x.bench[n].team_median;if(m==null)return '<td class="hm na"></td>';const r=t?m/t:1;const cls=r<=.85?'g2':r<=.95?'g1':r>=1.35?'o2':r>=1.08?'o1':'';return '<td class="hm '+cls+(n===b.n?' bnc':'')+'" title="'+E(pname(p.id))+' · step '+n+': '+dur(m)+' vs team '+dur(t)+'">'+(r>=.95&&r<1.08?'':(r<1?'−':'+')+Math.round(Math.abs(r-1)*100)+'%')+'</td>';};
 const devText=p=>{const v=c.variants.find(y=>y.id===p.variant);const parts=[];if(v)parts.push(E(v.name));p.deviations.forEach(d=>parts.push(d.kind==='skips'?'skips step'+(d.steps.length>1?'s ':' ')+d.steps.join(', '):d.kind==='repeats'?'repeats step'+(d.steps.length>1?'s ':' ')+d.steps.join(', '):'different order at '+d.steps.join(', ')));return parts.join(' · ')||'Typical path';};
 const tv=typical(c),fv=fastest(c);
 return '<section class="sec" id="bench">'+secHead('03','Team benchmark: the typical path and each person’s deviations','Same process, all participating departments and teams. Each cell compares a person’s typical time on a step with the team’s typical time. Green is faster, orange slower; blank cells are within ±5% or not that person’s step.')+
 '<div class="benchsum"><div class="bs"><span class="kk">Typical path</span><b>'+E(tv.name)+'</b><span>'+pct(tv.share_pct_of_runs)+' of runs · step '+b.n+' '+dur(vstep(c,tv))+'</span></div><div class="bs best"><span class="kk">Benchmark (fastest path)</span><b>'+E(fv.name)+'</b><span>step '+b.n+' '+dur(vstep(c,fv))+' · '+E(fv.why_faster_or_slower)+'</span></div><div class="bs"><span class="kk">Gap on step '+b.n+'</span><b>'+dur(x.step_people[b.n]?Math.max(...Object.values(x.step_people[b.n].by_person))-Math.min(...Object.values(x.step_people[b.n].by_person)):0)+'</b><span>between the fastest and slowest person’s typical time</span></div></div>'+
 '<div class="card heat"><div class="scroll"><table class="hmt"><thead><tr><th class="pc">Person</th>'+ns.map(n=>'<th class="'+(n===b.n?'bnh':'')+'" title="'+E(c.steps[n-1].name)+'">'+n+'</th>').join('')+'<th class="dv">Path and deviations</th></tr></thead><tbody>'+
 '<tr class="ref"><td class="pc">Team typical</td>'+ns.map(n=>'<td class="hm ref'+(n===b.n?' bnc':'')+'" title="'+E(c.steps[n-1].name)+'">'+(x.bench[n].team_median?dur(x.bench[n].team_median).replace(' min','m').replace(' s','s'):'')+'</td>').join('')+'<td class="dv">'+E(tv.name)+'</td></tr>'+
 ppl.map(p=>'<tr data-pmode="'+p.id+'"><td class="pc"><span class="pwho">'+pav(p.id)+E(pname(p.id))+'</span>'+plink(p.id)+(p.tenure_months?'<small>'+p.tenure_months+' mo in role</small>':'')+'</td>'+ns.map(n=>cell(p,n)).join('')+'<td class="dv">'+devText(p)+'</td></tr>').join('')+
 '</tbody></table></div></div>'+
 '<p class="pp-why">'+(isWait(c)?'Differences in the waiting step come from how complete the request was, not from how fast people work.':'<b>'+E(fv.name)+'</b> is the benchmark for step '+b.n+': '+dur(vstep(c,fv))+' against '+dur(vstep(c,slowest(c)))+' for '+E(lcf(slowest(c).name))+'. '+E(fv.why_faster_or_slower))+' Differences can also come from case mix and experience; treat them as leads to test, not a ranking of people. Click a row to see that person’s runs on the board.</p></section>';
}

/* ---------- all steps ---------- */
function table(c){
 let dir=ST.sort[c.id]||'order',rows=[...c.steps],b=bn(c);
 if(dir==='desc')rows.sort((x,y)=>med(y)-med(x));if(dir==='asc')rows.sort((x,y)=>med(x)-med(y));
 let mx=Math.max(...c.steps.map(share));
 return '<section class="sec" id="steps">'+secHead('04','All '+c.steps.length+' steps','Typical time per run, slowest 10%, share of the time, how often it happens '+AD(c)+', and the spread between people. Click a row to open the step.','<button class="textbtn" data-sort="order" aria-pressed="'+(dir==='order')+'">'+(dir==='order'?'Process order ✓ · sort by time':'Restore process order')+'</button>')+'<div class="card" style="padding:4px 10px"><div class="scroll"><table class="cxt steptable"><thead><tr><th>No.</th><th>Step</th><th>System</th><th><button data-sort="time">Typical '+(dir==='desc'?'↓':dir==='asc'?'↑':'↕')+'</button></th><th>Slowest 10%</th><th>Share</th><th>'+(CAD(c)?'Per '+c.x.period:'A day')+'</th><th>People</th><th>Flags</th></tr></thead><tbody>'+
 rows.map(s=>{const f=stepFacts(c,s);return '<tr class="'+(s===b?'hot':'')+'" data-row="'+s.n+'"><td class="t">'+String(s.n).padStart(2,'0')+'</td><td><a href="'+stepurl(c,s.n)+'">'+E(s.name)+'</a>'+(s.kind==='offscreen'?'<small>Off screen, not recorded</small>':s.kind==='wait'?'<small>Waiting</small>':'')+'</td><td>'+tag(c,s.system,'sm')+'</td><td class="t">'+dur(med(s))+'</td><td class="t">'+dur(s.p90_s_per_cohort_run)+'</td><td><div class="sharecell"><span>'+pct(share(s))+'</span><i style="width:'+(share(s)/mx*70+1).toFixed(1)+'%"></i></div></td><td class="t">'+num(Math.round(f.perDay*10)/10)+'×</td><td class="t">'+(f.n>1?dur(f.minP)+' – '+dur(f.maxP):'—')+'</td><td>'+flagchips(s)+'</td></tr>';}).join('')+
 '</tbody></table></div></div></section>';
}

/* ---------- case-specific blocks (kept from v21) ---------- */
function extras(c){
 if(c.id==='c2'){let w=c.extra.wait_summary,ex=c.variants[0].example_runs[1],acts=[...new Set(((ex&&ex.while_waiting_events)||[]).map(e=>e.activity.split(';')[0]))];
  return '<section class="sec" id="waits">'+secHead('★','The reply takes hours. The work takes minutes.','Waiting is calendar time, including nights and weekends. It is not idle staff time.')+
  tiles([{l:'Requests a week',v:num(w.requests_per_week),s:'to adjusters'},{l:'Typical total wait',v:dur(w.reply_wait.median),s:'per request',hl:1},{l:'Average wait',v:dur(w.reply_wait.mean),s:'pulled up by long waits'},{l:'Longest wait',v:dur(w.reply_wait.max),s:'in the sample'},{l:'Reminders',v:num(w.followup_reminders.median),s:'per request, typically'}])+
  '<div class="two"><div class="card"><h3>Total wait per request</h3>'+[['Typical',w.reply_wait.median],['Average',w.reply_wait.mean],['Slowest 10%',w.reply_wait.p90],['Longest',w.reply_wait.max]].map(([k,v],i)=>'<div class="hbar"><span>'+k+'</span><i class="'+(i===0?'a':'')+'" style="width:'+Math.max(1,v/w.reply_wait.max*100).toFixed(1)+'%"></i><span>'+dur(v)+'</span></div>').join('')+'<p class="note">'+pct(w.clarification_share_pct_of_requests)+' of requests need a clarification round, which adds a second wait.</p></div>'+
  '<div class="card"><h3>What the coordinator does meanwhile</h3><ul class="plain">'+acts.map(a=>'<li>'+E(a)+'</li>').join('')+'</ul><p class="note">Typically '+num(w.context_switches.median)+' switches to other work per request, '+dur(w.resume_delay.median)+' from the reply arriving to reopening it, and '+dur(w.context_rebuild.median)+' to re-read the context.</p></div></div></section>';}
 if(c.id==='c3'){let p=c.extra.procedure_draft,rw=c.extra.rework_summary;
  return '<section class="sec" id="procedure">'+secHead('★','Expert and newcomer: check first, or draft twice','Same exception type. The expert verifies term and authority before drafting; newcomers draft first and redo it after the late checks in '+pct(rw.share_pct_of_newcomer_runs)+' of their runs.')+
  '<div class="two">'+c.variants.map(v=>{let ord=v.rework_step_order||v.step_order,seen=new Set(),sys=[];ord.forEach(n=>{let s=c.steps[n-1].system;if(sys[sys.length-1]!==s)sys.push(s);});return '<div class="card"><div class="kk">'+(v.id==='expert'?'Expert path':'Newcomer path')+'</div><h3 style="margin-top:4px">'+E(v.name)+'</h3><p class="mute" style="font-size:13px;margin-top:2px">'+dur(v.median_s_per_run)+' a typical run · '+pct(v.share_pct_of_runs)+' of runs</p><div class="pathflow">'+ord.map(n=>{let again=seen.has(n);seen.add(n);return '<a class="'+(n===c.bottleneck.step_n?'hot':again?'again':'')+'" href="'+stepurl(c,n)+'" title="'+E(c.steps[n-1].name)+'">'+n+'</a>';}).join('<span>→</span>')+'</div><p style="font-size:13.5px;color:var(--t2)">'+E(v.description)+'</p><div class="hops" style="margin-top:8px">'+sys.map((s,i)=>(i?'<span class="ar">→</span>':'')+tag(c,s,'sm')).join('')+'</div><button class="btn" style="margin-top:10px" data-bmode-go="'+v.id+'">Show this path on the board</button></div>';}).join('')+'</div>'+
  '<div class="card" style="margin-top:14px" id="jobaid"><div class="kk">'+E(p.label)+'</div><h3 style="font-size:17px;margin-top:4px">Draft procedure for training: verify before drafting</h3><p class="mute" style="font-size:13px;margin-top:4px">Built from the expert path, reviewed by an operations trainer before use. '+E(p.approval_status)+'.</p><ol class="procedure">'+p.steps.map(s=>'<li><div><b>'+E(s.name)+'</b><p>'+E(s.what_to_check)+'</p><small>'+E(s.system)+'</small></div></li>').join('')+'</ol></div></section>';}
 if(c.id==='c4'){let f=fastest(c);return '<section class="sec" id="ways">'+secHead('★','Twenty people, three ways to handle the same return','The signed instruction is already attached. The difference is navigation and duplicate logging.')+'<div class="ways">'+c.variants.map(v=>'<div class="card '+(v===f?'fast':'')+'"><div class="kk">'+(v===typical(c)?'Typical path · ':v===f?'Fastest · ':'Deviation · ')+pct(v.share_pct_of_runs)+' of runs</div><h3>'+E(v.name)+'</h3><p>'+E(v.description)+'</p><div class="t">'+dur(v.median_s_per_run)+'</div><p>a typical run · step '+c.bottleneck.step_n+': '+dur(vstep(c,v))+'</p><p style="margin-top:8px"><button class="btn" data-bmode-go="'+v.id+'">Show on the board</button></p></div>').join('')+'</div></section>';}
 return '';
}

/* ---------- automation blueprint (IT brief) ---------- */
function estimate(c){return isWait(c)?0:(CAD(c)?1:c.runs_per_week)*med(bn(c))*c.recommendation.assumed_takeover_share/3600;}
function estimateText(c){return isWait(c)?'Waiting is elapsed time, not work, so no time is counted as returned; the gain is a shorter wait and fewer reminders.':'Calculation: '+(CAD(c)?'1 '+UNIT[c.id]+' a '+c.x.period:num(c.runs_per_week)+' runs a week')+' × '+dur(med(bn(c)))+' typical time in step '+bn(c).n+' × '+Math.round(c.recommendation.assumed_takeover_share*100)+'% assumed takeover = '+estimate(c).toFixed(1)+' hours a '+EUNIT(c)+'. Estimate from sample data, not measured savings.';}
function briefText(c){let r=c.recommendation;return [D.company,D.label,c.title,'AUTOMATION BLUEPRINT · STEP '+bn(c).n+' · '+bn(c).name,r.title,'What to build: '+r.what,'Why this step: '+c.bottleneck.why,'Volume: '+VOLTXT(c),'Trigger: '+r.trigger,'Inputs:\n- '+r.inputs.join('\n- '),'Outputs:\n- '+r.outputs.join('\n- '),'Systems: '+r.systems.join(', '),'Complexity: '+r.complexity,'Manual touchpoints:\n- '+r.manual_touchpoints.join('\n- '),'What stays with people:\n- '+r.stays_with_people.join('\n- '),'Acceptance criteria:\n- '+r.acceptance.join('\n- '),'Scope: '+c.extra.boundary,(isWait(c)?'':'Time back: about '+estimate(c).toFixed(1)+' hours a '+EUNIT(c)+'. ')+estimateText(c)].join('\n\n');}
function blueprint(c){
 const r=c.recommendation,b=bn(c);
 const node=(k,t,body,cls='')=>'<div class="bp-n '+cls+'"><div class="bp-k">'+k+'</div><div class="bp-t">'+t+'</div>'+body+'</div>';
 return '<div class="bp"><div class="bp-row">'+
  node('Trigger',E(r.trigger),'','trg')+'<span class="bp-a">→</span>'+
  node('Inputs','',list(r.inputs),'in')+'<span class="bp-a">→</span>'+
  node('Automation',E(r.title),'<div class="bp-sys">'+r.systems.map(s=>tag(c,s,'sm')).join(' ')+'</div>','auto')+'<span class="bp-a">→</span>'+
  node('Person checks','',list(r.manual_touchpoints),'hum')+'<span class="bp-a">→</span>'+
  node('Outputs','',list(r.outputs),'out')+'</div>'+
  '<div class="bp-replace">Replaces the manual work in <a class="nlink strong" href="'+stepurl(c,b.n)+'">step '+b.n+' · '+E(b.name)+'</a>'+(b.field_transfers.length?' — '+b.field_transfers.length+' fields copied by hand today':'')+'.'+(HOST()&&c.sug&&SUG[c.sug]?' In the automation plan as <span class="nlink strong" data-sug="'+c.sug+'">'+E(SUG[c.sug].t)+'</span>.':'')+'</div></div>';
}
function brief(c){let r=c.recommendation,b=bn(c);
 return '<section class="sec" id="brief">'+secHead('05','Automation blueprint for IT','Enough to start designing: what triggers it, what goes in and comes out, which systems it touches, where a person stays in the loop, and how to accept it.')+'<div class="briefcard"><div class="briefhead"><div><div class="kk">Step '+b.n+' · '+E(b.name)+' · '+E(c.title)+'</div><h2>'+E(r.title)+'</h2><p class="lede">'+E(r.what)+'</p></div><div class="briefactions"><button class="btn solid" data-copy>Copy brief</button><button class="btn" data-print>Print</button></div></div><div id="copystatus" class="toast" role="status"></div>'+
 blueprint(c)+
 '<div class="briefgrid"><div><h3>Systems</h3><p>'+r.systems.map(s=>tag(c,s,'sm')).join(' ')+'</p><h3 style="margin-top:12px">Complexity</h3><p>'+E(r.complexity)+'</p></div><div><h3>Stays with people</h3>'+list(r.stays_with_people)+'</div><div><h3>Volume it handles</h3><p>'+VOLTXT(c)+' · '+c.people_ids.length+' people</p></div><div class="wide"><h3>Acceptance criteria</h3>'+list(r.acceptance)+'</div><div><h3>Scope</h3><p>'+E(c.extra.boundary)+'</p></div></div>'+
 '<div class="estimate">'+(isWait(c)?'<b>Shorter waits</b>':'<b data-estimate="'+estimate(c)+'">≈ '+estimate(c).toFixed(1)+' h a '+EUNIT(c)+'</b>')+'<p><span style="color:var(--t1);font-weight:600">'+(isWait(c)?'What changes.':'Time back to the team.')+'</span> '+E(estimateText(c))+'</p></div><p class="printnote">'+E(D.company)+' · '+E(D.label)+'</p></div></section>';}

/* ---------- the one step ---------- */
function conclusion(c){let b=bn(c),r=c.recommendation;const all=CASES,i=all.indexOf(c);
 return '<section class="sec" id="end">'+secHead('→','The one step to change')+'<div class="endgrid"><div><div class="l">This step</div><b>Step '+b.n+' of '+c.steps.length+' · '+E(b.name)+'</b><span>'+E(b.system)+' · '+dur(med(b))+' per '+UNIT[c.id]+' · '+pct(share(b))+' of the time · '+(CAD(c)?VOL(c):num(Math.round(c.x.runs_per_day*10)/10)+' times a day')+'</span></div><div><div class="l">Why it is slow</div><p>'+E(c.bottleneck.why)+'</p></div><div><div class="l">What to do with it</div><p><b style="font-size:14px;display:inline;margin:0">'+E(r.title)+'.</b> '+E(r.what)+'</p></div></div>'+
 '<div class="endacts"><a class="btn solid" href="'+stepurl(c,b.n)+'">Open step '+b.n+'</a><a class="btn" href="'+route(c)+'/brief">Automation blueprint</a>'+(i<all.length-1?'<a class="btn ghost" href="'+route(all[i+1])+'">Next: '+E(SHORT[all[i+1].id])+' →</a>':'<a class="btn ghost" href="#cases">All processes</a>')+'</div></section>';}
function method(c){let b=bn(c);
 return '<details class="method" id="method"'+(ST.method[c.id]?' open':'')+'><summary>How these numbers are calculated</summary><ul>'+
 '<li>Sample: '+c.summary.runs_count_in_window+' completed runs by '+c.people_ids.length+' people, '+WINc(c)+'. All data is fictional.</li>'+(c.stages?'<li>Step times are aligned with the '+c.stages.length+'-stage overview of the same process: each stage’s steps add up to its time there (within a few minutes), and the waits between stages are the same.</li>':'')+
 '<li>“Typical” is the median: half of the runs are faster, half slower. “Share of the time” is a step’s typical time divided by the sum of all steps’ typical times.</li>'+
 (CAD(c)?'<li>Figures are per '+UNIT[c.id]+': the sum of hands-on step times in a run, averaged over '+c.x.periods+' runs. Waiting between stages is not counted as work.</li>':'<li>Per day = runs in the window ÷ 15 working days. Team time a day = the sum of hands-on step times ÷ 15. Waiting steps are not counted as work.</li>')+
 '<li>Benchmark cells: a person’s median on that step ÷ the team’s median of person medians. People with fewer than 3 runs of a step are left blank.</li>'+
 '<li>Paths are grouped from the order of steps and the method used in the slow step. The step view shows one example run per path, from the middle of that path.</li>'+
 '<li>Time back: runs a week × typical time of step '+b.n+' × an assumed takeover share of '+Math.round(c.recommendation.assumed_takeover_share*100)+'%. The share is an assumption to test in a pilot.</li>'+
 '<li>Personal fields (names, addresses, phone numbers) are shown masked, as they would be after redaction.</li>'+
 '<li>For a reviewer to check: '+E(c.extra.domain_review)+'</li></ul></details>';}

/* ---------- step page ---------- */
function stepPage(c,n,query){
 let s=c.steps.find(x=>x.n===n);if(!s)return '<p style="margin-top:20px">Step not found.</p><a class="nlink" href="'+route(c)+'">Back to the process</a>';
 let hot=n===c.bottleneck.step_n,U=UNIT[c.id],f=stepFacts(c,s),body='';
 const sp=c.x.step_people[n]||{by_person:{}};
 const ppl=Object.entries(sp.by_person).sort((a,b)=>a[1]-b[1]),mx=ppl.length?ppl[ppl.length-1][1]*1.08:1,tm=c.x.bench[n].team_median;
 const strip=ppl.length>1?'<div class="card" style="margin-top:14px"><h3>The same step, person by person</h3><div class="pstrip">'+ppl.map(([id,v])=>'<div class="ps-r" data-pmode="'+id+'"><span class="pwho">'+pav(id)+E(pname(id))+plink(id)+'</span><div class="ps-t"><i style="width:'+(v/mx*100).toFixed(1)+'%" class="'+(v<=tm*.9?'g':v>=tm*1.1?'o':'')+'"></i><em style="left:'+(tm/mx*100).toFixed(1)+'%"></em></div><span class="t">'+dur(v)+'</span></div>').join('')+'</div><p class="note">Bars: each person’s typical time in this step. The line is the team’s typical time ('+dur(tm)+').</p></div>':'';
 if(hot&&c.variants.length>1){
  let sel=ST.trace[c.id]||{left:slowest(c).id,right:fastest(c).id};
  if(query&&c.variants.some(v=>v.id===query))sel={left:query,right:query===fastest(c).id?slowest(c).id:fastest(c).id};
  ST.trace[c.id]=sel;
  let L=c.variants.find(v=>v.id===sel.left),R=c.variants.find(v=>v.id===sel.right),dl=vstep(c,L),dr=vstep(c,R),diff;
  if(L===R)diff='Same path on both sides. Choose another path to compare.';
  else{let sv=dl>=dr?L:R,fv=dl>=dr?R:L;diff='<b>'+E(sv.name)+'</b> typically takes <b>'+dur(vstep(c,sv))+'</b> in this step, <b>'+E(lcf(fv.name))+'</b> '+dur(vstep(c,fv))+': <span class="acc">'+dur(Math.abs(dl-dr))+' longer per '+U+'</span>.';}
  body='<h2 class="h2s">Inside the step: two paths side by side</h2><p class="diff" id="tracediff">'+diff+'</p><div class="compare">'+[['left',L],['right',R]].map(([side,v])=>{const t=v.action_trace,run=v.example_runs.find(r=>r.run_id===t.run_id)||v.example_runs[0];return '<div class="tracecol'+(L!==R&&vstep(c,v)===Math.max(dl,dr)?' slow':'')+'" data-col="'+side+'"><header><label class="kk" style="display:block;margin-bottom:6px" for="sel-'+side+'">'+(side==='left'?'Path':'Compared with')+'</label><select id="sel-'+side+'" data-trace="'+side+'">'+c.variants.map(x=>'<option value="'+x.id+'"'+(x===v?' selected':'')+'>'+E(x.name)+'</option>').join('')+'</select><p>Example run'+(run?' by '+E(pname(run.person_id)):'')+': <b>'+dur(t.duration_s)+'</b> · '+t.actions.length+' actions'+(t.ctx?' · '+E(t.ctx.policy)+(c.id!=='c1'?' · '+E(t.ctx.claim):''):'')+'</p></header><div class="tracebody">'+inside(c,s,t.actions,{total:t.duration_s})+'</div></div>';}).join('')+'</div>';
 }else{
  body='<h2 class="h2s">Inside the step</h2><div class="card">'+inside(c,s,s.actions,{caption:'a typical run, '+dur(s.median_s_per_executed_run)+(s.kind!=='work'?' · not recorded on screen':''),total:s.median_s_per_executed_run})+'</div>';
 }
 let prev=n>1?'<a class="btn" data-prev href="'+stepurl(c,n-1)+'">← Step '+(n-1)+'</a>':'',next=n<c.steps.length?'<a class="btn" data-next href="'+stepurl(c,n+1)+'">Step '+(n+1)+' →</a>':'';
 return '<div class="npage stepwrap" id="step-panel" data-step="'+n+'">'+crumbHtml(c,'Step '+n)+'<div class="stephead"><div><div class="kk">Step '+n+' of '+c.steps.length+(hot?' · <span class="acc">slowest step</span>':'')+(c.stages?' · <a class="nlink" data-proc="'+c.proc+'" title="Open the '+c.stages.length+'-stage overview">stage '+s.stage+' of '+c.stages.length+': '+E(c.stages[s.stage-1])+'</a>':'')+'</div><h1 class="ntitle sm">'+E(s.name)+'</h1></div><div class="stepnav">'+prev+next+'</div></div>'+stepSummary(c,s)+
 '<div class="nprops">'+orgProps(c)+'<div class="nprop"><span class="nk">'+ic('building',14,2)+'System</span><span class="nv">'+tag(c,s.system)+' '+flagchips(s)+'</span></div><div class="nprop"><span class="nk">'+ic('user',14,2)+'Who</span><span class="nv">'+E(s.actor_role||'')+(ppl.length?' · '+ppl.length+' people':'')+'</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('clock',14,2)+'Time</span><span class="nv"><b>'+dur(med(s))+'</b> typical per '+U+' · slowest 10% over '+dur(s.p90_s_per_cohort_run)+' · <b>'+pct(share(s))+'</b> of the time</span></div>'+
 '<div class="nprop"><span class="nk">'+ic('flow',14,2)+'How often</span><span class="nv">'+num(Math.round(f.perDay*10)/10)+(CAD(c)?' times '+AD(c):' times a day across the team')+' · in '+s.executed_runs_count+' of '+c.summary.runs_count_in_window+' runs'+(s.kind==='wait'?'':' · '+hrs(f.teamDay)+' of team time '+AD(c))+'</span></div></div>'+
 (hot?'<div class="ncallout"><span class="ci">💡</span><div><b>This is the slow step.</b><p>'+E(c.bottleneck.why)+' <b>Do this:</b> '+E(lcf(c.recommendation.title))+'. <a class="nlink strong" href="'+route(c)+'/brief">Automation blueprint →</a></p></div></div>':'')+
 body+strip+
 '<div class="stepfoot"><a class="btn" data-foot="map" href="'+route(c)+'">← Process board</a><a class="btn" data-foot="people" href="'+route(c)+'/bench">Team benchmark</a><a class="btn solid" data-foot="brief" href="'+route(c)+'/brief">Automation blueprint →</a><a class="btn ghost" data-foot="method" href="'+route(c)+'/method">How these numbers are calculated</a></div></div>';
}

/* ---------- tabs + render ---------- */
function tabs(c,view){
 let t=[['map','Board',''],['volume','Volume','/volume'],['bench','Team benchmark','/bench'],['steps','All steps','/steps']];
 if(c.id==='c2')t.push(['waits','Adjuster waits','/waits']);
 if(c.id==='c3')t.push(['procedure','Expert vs newcomer','/procedure']);
 if(c.id==='c4')t.push(['ways','Three ways','/ways']);
 t.push(['brief','Blueprint','/brief'],['end','The one step','/end']);
 let active=t.some(x=>x[0]===view)?view:'map';
 return '<div class="cxtabs">'+(view==='step'?'<a class="back" data-back href="'+route(c)+'">← '+E(SHORT[c.id])+'</a>':'')+'<div class="seg">'+t.map(([k,l,p])=>'<a data-tab="'+k+'" class="'+(view!=='step'&&k===active?'on':'')+'" href="'+route(c)+p+'">'+l+'</a>').join('')+'</div></div>';
}
function parse(){let h=S.ch||'cases',[path,q]=h.split('?'),parts=path.split('/');return {h,path,parts,query:new URLSearchParams(q||'')};}
function current(){let {parts}=parse();return parts[0]==='case'?BYID[parts[1]]||null:null;}
function rCases(opts={}){
 let {h,path,parts,query}=parse(),c=current(),view=c?(parts[2]||''):'';
 if(c&&!opts.keepBoard&&opts.scroll===undefined&&ST.last!==path){ST.stage[c.id]=0;}
 if(c&&query.get('person')&&personRec(c,query.get('person'))){ST.mode[c.id]='person:'+query.get('person');}
 if(c&&query.get('step')){ST.sel[c.id]=+query.get('step');ST.initial=+query.get('step');ST.stage[c.id]=0;}
 ST.cat[c&&c.id]=null;
 if(c&&query.get('person')&&query.get('cat')){const pid=query.get('person'),k=query.get('cat'),ns=catSteps(c,pid,k);if(ns.length){ST.cat[c.id]={pid,k,wi:query.get('w')!=null?+query.get('w'):null};const slow=ns.reduce((a,n)=>!a||med(c.steps[n-1])>med(c.steps[a-1])?n:a,0);ST.sel[c.id]=slow;ST.initial=slow;}}
 if(c&&query.get('stage')&&c.stages){const k=+query.get('stage');ST.stage[c.id]=k;const sl=stageSlow(c,k);ST.sel[c.id]=sl.n;ST.initial=sl.n;}
 const drill=c&&(query.get('stage')||query.get('step')||query.get('person'));
 let html,board=false;
 if(parts[0]==='departments'||parts[0]==='department')html=departmentsPage(parts[1]);
 else if(!c)html=home();
 else if(view==='step')html=tabs(c,'step')+stepPage(c,Number(parts[3]),query.get('trace'));
 else{html=header(c)+tabs(c,view)+boardSection(c)+volume(c)+bench(c)+table(c)+extras(c)+brief(c)+conclusion(c)+method(c);board=true;}
 if(ST.board&&(!board||ST.boardCase!==(c&&c.id)||!opts.keepBoard)){try{ST.board.unmount();}catch(e){}ST.board=null;}
 let root=document.getElementById('v-cases');
 const keep=opts.keepBoard&&ST.board;
 if(!keep){root.innerHTML='<div class="page cx">'+(c?periodPanel(c):'')+html+'<div class="note" style="margin-top:28px">Sample data. Fictional company, names and documents. Process steps, actions and times are illustrative.</div></div>';}
 let sb=SB(),changed=ST.last!==path;ST.last=path;
 let sbh=sb.style.scrollBehavior;sb.style.scrollBehavior='auto';
 if(opts.scroll!==undefined)sb.scrollTop=opts.scroll;else if(changed)sb.scrollTop=0;
 if(board&&!keep)mountBoard(c);
 bind(c);
 if(changed&&opts.scroll===undefined&&c){
  let target={volume:'volume',bench:'bench',steps:'steps',brief:'brief',waits:'waits',procedure:'procedure',ways:'ways',end:'end',method:'method',people:'bench',handwork:'steps'}[view];
  if(target&&el(target)){if(target==='method')el('method').open=true;let tb=root.querySelector('.cxtabs');sb.scrollTop=el(target).getBoundingClientRect().top-sb.getBoundingClientRect().top+sb.scrollTop-(tb?tb.offsetHeight+8:0);}
 }
 if(drill&&el('map')&&view===''){let tb=root.querySelector('.cxtabs');sb.scrollTop=el('map').getBoundingClientRect().top-sb.getBoundingClientRect().top+sb.scrollTop-(tb?tb.offsetHeight+8:0);}
 sb.style.scrollBehavior=sbh;
}
function rerender(){rCases({scroll:SB().scrollTop});}
function scrollToBoard(){const sb=SB(),m=el('map');if(!m)return;const tb=document.querySelector('#v-cases .cxtabs');sb.scrollTo({top:m.getBoundingClientRect().top-sb.getBoundingClientRect().top+sb.scrollTop-(tb?tb.offsetHeight+8:0),behavior:'smooth'});}
function setMode(c,mode,scroll){ST.mode[c.id]=mode;document.querySelectorAll('#v-cases [data-bmode]').forEach(b=>b.classList.toggle('on',b.dataset.bmode===mode));const ps=document.querySelector('#v-cases [data-bperson]');if(ps)ps.value=mode.startsWith('person:')?mode.slice(7):'';updateBoard(c);if(scroll)scrollToBoard();}
async function copyBrief(c){let text=briefText(c),ok=false;try{await navigator.clipboard.writeText(text);ok=true;}catch(e){let t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='0';t.style.top='0';document.body.append(t);t.select();try{ok=document.execCommand('copy');}catch(ignore){}t.remove();}
 el('copystatus').textContent=ok?'Brief copied as plain text — paste it into a ticket or email.':'Automatic copy is unavailable. Select and copy the text below.';
 if(!ok){let t=document.createElement('textarea');t.className='copyfallback';t.value=text;el('copystatus').after(t);t.select();}}
function bind(c){
 const R=document.getElementById('v-cases');if(!c)return;
 R.querySelectorAll('[data-clearcat]').forEach(b=>b.onclick=()=>{ST.cat[c.id]=null;S.ch=S.ch.split('?')[0];history.replaceState(null,'',location.pathname+location.search+'#'+S.ch);ST.last=S.ch;const sb=el('stagebar');if(sb)sb.innerHTML='';if(ST.board)ST.board.update({only:null});});
 R.querySelectorAll('[data-stage]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const k=+b.dataset.stage;if(el('board')){setStage(c,k);if(k)scrollToBoard();}else location.hash=route(c)+(k?'?stage='+k:'');});
 const po=R.querySelector('[data-peek-open]');if(po)po.onclick=()=>setPeek(c,true);bindPeek(c);
 R.querySelectorAll('[data-bmode]').forEach(b=>b.onclick=()=>setMode(c,b.dataset.bmode));
 R.querySelectorAll('[data-bmode-go]').forEach(b=>b.onclick=()=>setMode(c,b.dataset.bmodeGo,true));
 const ps=R.querySelector('[data-bperson]');if(ps)ps.onchange=()=>setMode(c,ps.value?'person:'+ps.value:'typical');
 R.querySelectorAll('[data-bcolor]').forEach(b=>b.onclick=()=>{ST.color[c.id]=b.dataset.bcolor;R.querySelectorAll('[data-bcolor]').forEach(x=>x.classList.toggle('on',x===b));updateBoard(c);});
 R.querySelectorAll('[data-pick]').forEach(a=>a.onclick=e=>{e.preventDefault();selectStep(c,+a.dataset.pick);scrollToBoard();});
 R.querySelectorAll('tr[data-pmode], .ps-r[data-pmode]').forEach(r=>r.onclick=e=>{if(e.target.closest('a'))return;if(el('board'))setMode(c,'person:'+r.dataset.pmode,true);else location.hash=route(c)+'?person='+r.dataset.pmode;});
 R.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{ST.sort[c.id]=b.dataset.sort==='order'?(!ST.sort[c.id]||ST.sort[c.id]==='order'?'desc':'order'):ST.sort[c.id]==='desc'?'asc':'desc';const t=el('steps');if(t){t.outerHTML=table(c);bind(c);}});
 R.querySelectorAll('tr[data-row]').forEach(r=>r.onclick=e=>{if(!e.target.closest('a'))location.hash=stepurl(c,Number(r.dataset.row));});
 R.querySelectorAll('[data-trace]').forEach(s=>s.onchange=()=>{ST.trace[c.id][s.dataset.trace]=s.value;S.ch=S.ch.split('?')[0];ST.last=S.ch.split('?')[0];history.replaceState(null,'',location.pathname+location.search+'#'+S.ch);rerender();});
 R.querySelector('[data-copy]')?.addEventListener('click',()=>copyBrief(c));
 R.querySelector('[data-print]')?.addEventListener('click',()=>{document.body.classList.add('print-brief');window.print();});
 R.querySelector('#method')?.addEventListener('toggle',e=>{ST.method[c.id]=e.target.open;});
}
addEventListener('afterprint',()=>document.body.classList.remove('print-brief'));

/* ---------- blocks for the host app's team and personal reports ---------- */
function teamBlock(teamId){
 const inTeam=c=>c.team_id===teamId||c.people_ids.some(id=>HOST()&&PERSON[id]&&PERSON[id].team===teamId);
 const cs=CASES.filter(c=>c.group==='harbor'&&inTeam(c));if(!cs.length)return '';
 const mine=c=>c.x.people.filter(p=>HOST()&&PERSON[p.id]&&PERSON[p.id].team===teamId&&p.steps.length);
 const stepsOf=ps=>{const n=[...new Set(ps.flatMap(p=>p.steps))].sort((a,b)=>a-b);return n.length>3?n[0]+'–'+n[n.length-1]:n.join(', ');};
 return '<div class="sec">'+secH('★','Processes mapped step by step','Every step, how often it runs and where the time goes. Open one for the board and the team benchmark.')+'<div class="cxlink-grid">'+cs.map(c=>{const b=bn(c),mx=Math.max(...c.steps.map(med));return '<div class="card cxlink" data-href="'+route(c)+'"><div class="t">'+ICON[c.id]+' '+E(c.title)+'</div><div class="d">'+c.steps.length+' steps · '+VOL(c)+' · '+hrs(c.x.team_hours_per_day)+' of team time '+AD(c)+'</div><div class="minibar" style="margin-top:8px">'+c.steps.map(s=>'<i class="'+(s===b?'hot':'')+'" style="flex:1;height:'+Math.max(6,med(s)/mx*100).toFixed(1)+'%"></i>').join('')+'</div><div class="d" style="margin-top:6px">Slowest: step '+b.n+' · '+E(lcf(b.name))+' · '+pct(share(b))+'</div>'+(c.team_id!==teamId?'<div class="d acc" style="margin-top:6px">This team: '+mine(c).map(p=>E(pname(p.id))).join(', ')+' · steps '+stepsOf(mine(c))+' of '+E(c.team)+'’s process</div>':'')+'</div>';}).join('')+'</div></div>';
}
function companyBlock(){
 const cs=groupCases('harbor');
 return '<div class="sec">'+secH('★','Processes mapped step by step',cs.length+' processes across '+new Set(cs.map(c=>c.team_id)).size+' teams. Each one opens from its stage overview into every step, with the slow step marked.')+'<div class="card" style="padding:4px 14px">'+cs.map(c=>{const b=bn(c);return '<div class="row click" data-href="'+route(c)+'"><div class="grow"><div class="t">'+ICON[c.id]+' '+E(c.title)+'</div><div class="d">'+E(c.team)+' · '+c.steps.length+' steps · '+VOL(c)+' · slowest: step '+b.n+', '+E(lcf(b.name))+' ('+pct(share(b))+')</div></div><div class="v"><b>'+hrs(c.x.team_hours_per_day)+'</b><div class="d">team time '+AD(c)+'</div></div><span class="chev">'+ic('right',14,2)+'</span></div>';}).join('')+'</div></div>';
}
function personBlock(pid,wi){
 wi=wi==null?2:wi;
 const cs=LINKED().filter(c=>lk(c,pid)&&lk(c,pid).cats.length);if(!cs.length)return '';
 const card=c=>{const L=lk(c,pid),{w,m}=weekSum(c,pid,wi),p=personRec(c,pid),b=bn(c),U=UNIT[c.id],mine=L.steps;
  const rows=[...L.cats].sort((a,b2)=>((w.cats[b2]||{}).process_min||0)-((w.cats[a]||{}).process_min||0)).map(k=>{const x=w.cats[k],ns=catSteps(c,pid,k);return '<tr class="rc-row" data-href="'+route(c)+'?person='+pid+'&cat='+k+'&w='+wi+'"><td>'+E(catName(pid,k))+'</td><td class="t">'+(x?mins(x.stream_min):'—')+'</td><td class="t">'+(x?'<b>'+mins(x.process_min)+'</b>':'—')+'</td><td class="mute">'+stepsTxt(ns)+'</td><td class="chevc">›</td></tr>';}).join('');
  const hot=mine.includes(b.n)?'<span class="nlink strong" data-href="'+stepurl(c,b.n)+'">Step '+b.n+' · '+E(lcf(b.name))+'</span>: '+(p.bottleneck_median_s?dur(p.bottleneck_median_s)+' typical against the team’s '+dur(c.x.bench[b.n].team_median):'')+'. ':'';
  const none=!m&&CAD(c)?'<p class="d">No '+U+' this week. The '+U+' in the recorded weeks was built in '+pweek(pid,runWeek(c),'','week '+(runWeek(c)+1)+' ('+WK[runWeek(c)]+')')+'.</p>':'';
  return '<div class="card pxc"><div class="pxc-h"><div><div class="t">'+ICON[c.id]+' '+E(c.title)+'</div><div class="d">'+E(c.team)+' · steps '+rng(mine)+' of '+c.steps.length+'</div></div><div class="v"><b>'+(m?mins(m):'—')+'</b><small>'+(w.runs?w.runs+' '+U+'s started · ':'')+(wi<0?'all observed weeks':'week '+(wi+1))+'</small></div></div>'+none+
  (m?'<table class="cxt pxt"><thead><tr><th>Work stream in this report</th><th>Recorded</th><th>In this process</th><th>Steps</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>':'')+
  '<p class="d" style="margin-top:8px">'+hot+'</p><div class="pxc-f"><button class="btn" data-href="'+route(c)+'?person='+pid+'">Board through '+E(first2(pid))+'’s runs</button>'+(mine.includes(b.n)?'<button class="btn" data-href="'+stepurl(c,b.n)+'">Open step '+b.n+'</button>':'')+'<button class="btn ghost" data-href="'+route(c)+'/bench">Team benchmark</button></div></div>';};
 return '<div class="sec">'+secH('★','Selected period, step by step','Hours from the streams below that belong to a mapped process, with the steps behind them. Same minutes as the process boards. Click a stream to see its steps on the board.')+cs.map(card).join('')+'</div>';
}
function first2(pid){return HOST()&&PERSON[pid]?(S.anon?pname(pid):first(PERSON[pid])):pname(pid);}
function catLink(pid,k,wi){
 const out=[];
 LINKED().forEach(c=>{const L=lk(c,pid);if(!L||!L.cats.includes(k))return;const x=L.weeks[wi].cats[k],ns=catSteps(c,pid,k);
  if(x)out.push('<span class="cxcat" data-href="'+route(c)+'?person='+pid+'&cat='+k+'&w='+wi+'">'+ic('map',12,2)+'<b>'+mins(x.process_min)+'</b> of it in '+E(c.title)+' · '+stepsTxt(ns)+' ›</span>');
  else if(CAD(c))out.push('<span class="cxcat mute" data-pweek="'+pid+':'+runWeek(c)+':'+k+'">'+ic('map',12,2)+E(c.title)+': built in week '+(runWeek(c)+1)+' ›</span>');});
 return out.join('');
}
function catStepsTable(pid,k,wi){
 let html='';
 LINKED().forEach(c=>{const L=lk(c,pid);if(!L||!L.cats.includes(k))return;const w=L.weeks[wi],x=w.cats[k];if(!x)return;
  const ns=catSteps(c,pid,k).filter(n=>w.steps[n]);const sp=c.x.step_people;
  html+='<div class="cxsteps"><div class="cxsteps-h">'+ICON[c.id]+' '+E(c.title)+' — the steps behind '+mins(x.process_min)+' of this stream</div>'+ns.map(n=>{const st=w.steps[n],s=c.steps[n-1],me=sp[n]&&sp[n].by_person[pid],tm=c.x.bench[n].team_median,hot=n===c.bottleneck.step_n;
   return '<div class="task cxst'+(hot?' hot':'')+'" data-href="'+stepurl(c,n)+'"><span><b>'+n+'.</b> '+E(s.name)+(hot?' <span class="pill ink">slowest step</span>':'')+'<small>'+st.count+'× · typical '+(me?dur(me):'—')+(tm&&me?' (team '+dur(tm)+')':'')+'</small></span><span class="a">'+E(s.system)+'</span><span class="m">'+mins(st.min)+'</span></div>';}).join('')+
  '<div class="task cxst other"><span class="mute">Other work in this stream'+(k==='docmatch'?' — documents for existing claims':'')+'</span><span class="a"></span><span class="m">'+mins(Math.max(0,x.stream_min-x.process_min))+'</span></div></div>';});
 return html;
}

/* ---------- Ask Silow ---------- */
const go=(c,s,t)=>chip(t,'data-href="'+route(c)+s+'"');
const C=id=>BYID[id];
const INTENTS=[
 {id:'cx_slow', kw:[['which step',3],['most time',3],['slowest step',3.2],['takes the most',3],['eats',2],['main bottleneck',3.2],['19 steps',3.4],['nineteen steps',3.4],['every step',2.6],['all steps',2.6]], fn:()=>({h:'<p>The slowest step in each process, with every step kept:</p>'+mtbl(['Process','Slow step','Typical','Share'],CASES.map(c=>[SHORT[c.id]+' <span class="muted">· '+c.steps.length+' steps</span>','<b>'+bn(c).n+'.</b> '+E(bn(c).name),dur(med(bn(c))),pct(share(bn(c)))]))+'<p>In the 19-step mailing process, 18 steps take seconds to a few minutes; <b>step 9, finding the signed document in the archive</b>, takes '+dur(med(bn(C('c1'))))+' per package — '+hrs(C('c1').x.bn_hours_per_day)+' of team time a day.</p>', s:[go(C('c1'),'','Board · Mailing packages, 19 steps'),go(C('c1'),'/step/9','Step 9 · inside the step')]})},
 {id:'cx_visio', kw:[['visio',3.4],['diagram',3],['diagrams',3],['swimlane',3],['swim lane',3],['flowchart',3],['process map',2.6],['visual',2],['visually',2],['board',2]], fn:()=>({h:'<p>Yes. Each process opens as a board: <b>all its steps</b> in system swimlanes, the time on every step, waits on the arrows, rework loops drawn, and the slow step highlighted. Switch the board to a path or to one person; click any step to see the systems, searches and data moved inside it.</p>', s:[go(C('c1'),'','Board · Mailing packages'),go(C('n1'),'','Board · FNOL, 18 steps in 6 stages'),go(C('c3'),'','Board with a rework loop')]})},
 {id:'cx_deviation', kw:[['deviation',3.4],['deviations',3.4],['deviate',3],['norm',2.6],['standard path',3],['typical path',3],['different ways',2.8],['20 people',3],['twenty people',3],['benchmark',3],['compare people',3],['variation',2.6],['who is faster',3],['faster',1.8]], fn:()=>{let c=C('c4'),f=fastest(c);return {h:'<p>Every process has a <b>team benchmark</b>: the typical path, the fastest path, and a grid of each person against the team on every step, with their deviations (skipped, repeated or re-ordered steps).</p><p>In <b>returned mail</b>, twenty people use three paths. The fastest, <b>'+E(lcf(f.name))+'</b>, takes '+dur(vstep(c,f))+' in step '+c.bottleneck.step_n+' against '+dur(vstep(c,slowest(c)))+'. In <b>FNOL</b> the same comparison runs across one department of six people.</p><p class="muted">A faster path is a lead to test, not a ranking of people.</p>', s:[go(c,'/bench','Team benchmark · Returned mail'),go(C('n1'),'/bench','Team benchmark · Claims intake FNOL')]};}},
 {id:'cx_volume', kw:[['per day',3.2],['a day',2.6],['how often',3],['how many',2.4],['volume',2.8],['per person',3],['each person',2.6],['daily',2.8]], fn:()=>({h:'<p>Per day, across the team and per person:</p>'+mtbl(['Process','Per day, team','Per person','Team time a day'],CASES.filter(c=>!isWait(c)&&!CAD(c)).map(c=>[SHORT[c.id],num(c.x.runs_per_day)+' '+UNIT[c.id]+'s',num(Math.round(c.x.runs_per_day/Math.max(1,c.x.people.filter(p=>p.runs).length)*10)/10),hrs(c.x.team_hours_per_day)]))+'<p>Each process page shows the daily counts, the busiest hours and each person’s share of the team’s volume.</p>', s:[go(C('n1'),'/volume','Volume · FNOL'),go(C('c1'),'/volume','Volume · Mailing packages')]})},
 {id:'cx_adjuster', kw:[['adjuster',3.4],['adjusters',3.4],['reply',2.2],['waiting for',2.4],['response time',2.6],['reminders',2.6],['reminder',2.6],['chase',2.2]], fn:()=>{let c=C('c2'),w=c.extra.wait_summary;return {h:'<p>Requests to adjusters: <b>'+num(w.requests_per_week)+' a week</b>. Typical total wait <b>'+dur(w.reply_wait.median)+'</b>, average '+dur(w.reply_wait.mean)+', longest '+dur(w.reply_wait.max)+'. Typically '+num(w.followup_reminders.median)+' reminder per request; '+pct(w.clarification_share_pct_of_requests)+' need a clarification round.</p><p>Meanwhile the coordinator switches to other work about '+num(w.context_switches.median)+' times and needs '+dur(w.context_rebuild.median)+' to re-read the context.</p><p>Proposal: <b>'+E(c.recommendation.title)+'</b> — '+E(lcf(c.recommendation.what))+'</p>', s:[go(c,'/waits','Adjuster waits'),go(c,'/brief','Automation blueprint')]};}},
 {id:'cx_jobaid', kw:[['job aid',3.4],['job aids',3.4],['training',2.6],['onboarding',2.6],['new staff',2.8],['newcomer',3],['new hire',2.8],['expert',2.4],['exception',2.6],['exceptions',2.6],['procedure',2.6],['sop',2.8]], fn:()=>{let c=C('c3'),rw=c.extra.rework_summary;return {h:'<p>In <b>exception handling</b>, the expert checks the policy term and authority <b>before</b> drafting the correction. Newcomers draft first and redraft after the late checks in '+pct(rw.share_pct_of_newcomer_runs)+' of their runs. Both paths are shown side by side with the systems in order, and either can be drawn on the board.</p><p>From the expert path, a <b>draft procedure for training</b> is produced on request and reviewed by a trainer.</p>', s:[go(c,'/procedure','Expert vs newcomer + draft procedure')]};}},
 {id:'cx_build', kw:[['tell your team',3.4],['develop',2.6],['developer',2.8],['developers',2.8],['implementation',2.6],['implement',2.4],['it team',2.8],['brief',2.2],['blueprint',3],['specification',2.8],['requirements',2.6],['what would you build',3]], fn:()=>({h:'<p>Each process ends with an <b>automation blueprint</b>: trigger → inputs → automation → person checks → outputs, with the systems, acceptance criteria and the volume it handles. It can be copied into a ticket.</p>'+mtbl(['Process','What to build','Systems'],CASES.map(c=>[SHORT[c.id],E(c.recommendation.title),E(c.recommendation.systems.join(', '))]))+'<p class="muted">Hours back are estimates from sample data, not measured savings.</p>', s:[go(C('c1'),'/brief','Blueprint · Mailing'),go(C('n1'),'/brief','Blueprint · FNOL'),go(C('c5'),'/brief','Blueprint · Claims intake')]})},
 {id:'cx_claims', kw:[['claims intake',3.4],['claim documents',3.4],['incoming documents',3.2],['indexing',3],['bradley',3],['payment',2.2],['re key',2.4],['rekey',2.4],['manual transfer',3],['between systems',2.8],['copy data',2.8],['claims',1.4],['fnol',3]], fn:()=>{let c=C('c5'),b=bn(c);return {h:'<p>Three claims processes are mapped step by step:</p><ul><li><b>Claim document intake</b> — step '+b.n+', '+E(lcf(b.name))+': '+dur(med(b))+' per package, '+pct(share(b))+' of the time.</li><li><b>FNOL to claim set-up</b> — step 8, re-keying loss details: '+dur(med(bn(C('n1'))))+' per notice, '+num(C('n1').x.runs_per_day)+' notices a day.</li><li><b>Medical bill to payment</b> — step 5, fee schedule look-ups; amounts re-keyed again into the payment batch in step 12.</li></ul><p>Each step lists the fields copied by hand, from which system to which, with the values.</p>', s:[go(c,'','Board · Claim document intake'),go(C('n1'),'','Board · FNOL'),go(C('n2'),'','Board · Medical bills')]};}},
];
const SUGGEST=['Which step takes the most time?','Can I see it as a Visio-style diagram?','How do people deviate from the typical path?','How many per day, per person?','How long do we wait for adjusters?','Can it produce job aids for new staff?','What would you tell your team to develop?','Where do claims staff re-key data?'];
const DOCS={
 'Security overview':{k:'Security',t:'Security overview',h:'<p><b>On your servers:</b> capture, storage, redaction and processing run inside your perimeter. Screenshots and video never reach Silow. Models run on your GPUs, in your own cloud account, or on a zero-data-retention provider you choose.</p><p><b>Silow-hosted:</b> captures are processed on Silow’s servers; raw captures are deleted within 48 hours and only derived patterns are kept.</p><ul><li>PII and PHI masked by Silow’s own model before any analysis</li><li>Encrypted in transit and at rest</li><li>SSO / SAML and audit logs</li><li>For PHI, use your own servers</li></ul>'},
 'Privacy principles':{k:'Privacy',t:'Privacy principles',h:'<ul><li>The work, not the worker: no keystroke logging, no private message content</li><li>No individual scoring or productivity ranking</li><li>Personal reports are written for the person themself</li><li>Anonymous mode replaces names with stable pseudonyms everywhere</li><li>Your admins decide which audience sees which level</li></ul>'},
 'Deployment guide':{k:'Deployment',t:'Deployment guide',h:'<ul><li><b>Silow-hosted</b> — install the recorder and go, no infrastructure work on your side.</li><li><b>On your servers</b> — one Docker Compose package, an install README, an acceptance script that checks every stage, SSO / SAML and audit logs.</li></ul><p>The recorder is the same in both: macOS, Windows or Linux, about a minute to install, no connectors.</p>'},
 'Architecture':{k:'Architecture',t:'Where models run',h:'<ul><li>Your own GPUs (on-prem) — nothing leaves the building</li><li>GPUs in your own cloud account — nothing leaves your tenant</li><li>Zero-data-retention provider on your account — redacted data, processed and not retained</li></ul><p>Redaction always runs before anything is analyzed.</p>'},
 'On-prem · your models':{k:'Architecture',t:'On-prem, on your models',h:'<p>In the on-prem deployment every answer is computed inside your perimeter, on models you choose. In this sample the answers are prepared in advance.</p>'},
 'Pilot plan':{k:'Pilot',t:'Start with a free month',h:'<ul><li><b>Week 1</b> — recorder installed for the team you choose, first personal reports</li><li><b>Week 2</b> — process boards with every step, the slow steps and how people differ</li><li><b>Weeks 3–4</b> — automation blueprints for the steps worth changing</li></ul><p>Pick one team, 20–30 people, and a contact in IT.</p>'},
 'Sample demo':{k:'Sample',t:'About this sample',h:'<p>Harbor Mutual, its people, documents and numbers are fictional. Answers here are prepared in advance and link to the screens they come from. In production Silow answers from your own recorded work.</p>'},
 'Book a 30-minute call':{k:'Next step',t:'Pricing',h:'<p>Pricing depends on deployment and team size. Ask your Silow contact for a 30-minute call and we will walk you through it.</p>'}
};
function openDoc(name){
 const d=DOCS[name]||DOCS['Sample demo'],ov=document.getElementById('ov');
 ov.innerHTML='<div class="ov-h"><span class="pill ink">'+E(d.k)+'</span><button class="x" id="ov-x" aria-label="Close">'+ic('x',16,2)+'</button></div><div class="ov-b docb"><h2>'+E(d.t)+'</h2>'+d.h+'</div><div class="ov-f"><span class="meta">Sample demo · prepared content</span><span style="flex:1"></span><button class="btn" id="ov-x2">Close</button></div>';
 ov.classList.add('on');
 document.getElementById('ov-x').onclick=closeSug;document.getElementById('ov-x2').onclick=closeSug;
}
const navCases=[...groupCases('harbor'),...groupCases('jeremy')];
function stageAttr(pid,i){const c=CASES.find(x=>x.proc===pid);return c?'data-href="'+route(c)+'?stage='+(i+1)+'" title="Open the '+stageSteps(c,i+1).length+' steps of this stage"':'';}
function stageFoot(pid,i){const c=CASES.find(x=>x.proc===pid);if(!c)return '';const ss=stageSteps(c,i+1),hot=ss.some(s=>s.n===c.bottleneck.step_n);return '<div class="pdrill'+(hot?' hot':'')+'">'+ss.length+' step'+(ss.length>1?'s':'')+(hot?' · slowest step inside':'')+'<span>›</span></div>';}
function stageSub(pid,i){const c=CASES.find(x=>x.proc===pid);if(!c)return '';const ss=stageSteps(c,i+1),hot=ss.some(s=>s.n===c.bottleneck.step_n);return '<small class="psub'+(hot?' hot':'')+'">'+(ss.length>1?'steps '+ss[0].n+'–'+ss[ss.length-1].n:'step '+ss[0].n)+(hot?' · step '+c.bottleneck.step_n+' is the slowest of all '+c.steps.length:'')+'</small>';}
function overviewSwitch(pid){const c=CASES.find(x=>x.proc===pid);if(!c)return '';return '<div class="zoomsw" role="group" aria-label="Level of detail"><button class="on">'+ic('flow',13,2)+'Overview · '+c.stages.length+' stages</button><button data-href="'+route(c)+'">'+ic('map',13,2)+'Every step · '+c.steps.length+'</button></div><div class="banner">'+ic('map',16,2)+'<span>Click a stage to open its steps on the process board. The slowest step of the whole process is <b class="ink" data-href="'+route(c)+'?step='+c.bottleneck.step_n+'" style="cursor:pointer">step '+c.bottleneck.step_n+' · '+E(lcf(bn(c).name))+'</b>, inside stage '+bn(c).stage+'.</span></div>';}
function procPeople(pid){const c=CASES.find(x=>x.proc===pid);if(!c)return '';return orgProps(c)+'<h3 style="margin-top:14px">People</h3><div class="nrel" style="margin-top:6px">'+c.people_ids.map(personChip).join('')+'</div>';}
function sugLink(id){const t=SUG_STEP[id];if(!t)return '';const c=BYID[t[0]];return '<button class="btn" data-href="'+route(c)+'?step='+t[1]+'">See step '+t[1]+' on the board</button>';}
function openCat(k){const e=document.querySelector('#v-person .cat[data-cat="'+k+'"]');if(!e)return;e.classList.add('open');const sb=SB();sb.scrollTop=e.getBoundingClientRect().top-sb.getBoundingClientRect().top+sb.scrollTop-90;e.classList.add('flash');setTimeout(()=>e.classList.remove('flash'),1600);}
/* Source-grounded insights. No derived week-specific medians are fabricated. */
function stepSummary(c,s){
 const paths=c.variants.filter(v=>Number.isFinite(v.step_medians_s_per_run[String(s.n)])).sort((a,b)=>a.step_medians_s_per_run[String(s.n)]-b.step_medians_s_per_run[String(s.n)]);
 const f=paths[0],different=f&&paths.some(v=>v.step_medians_s_per_run[String(s.n)]!==f.step_medians_s_per_run[String(s.n)]);
 const actions=s.actions.map(a=>[a.verb,a.object].filter(Boolean).join(' ')).map(t=>t.charAt(0).toUpperCase()+t.slice(1));
 const evidence=s.n===c.bottleneck.step_n?s.actions.concat(c.variants.flatMap(v=>v.action_trace?.actions||[])):s.actions;
 const exceptions=[...new Set(evidence.flatMap(a=>[a.object,a.result].filter(t=>t&&/exception|error|retry|reject|missing|duplicate|fail|mismatch|clarif|rework|wrong|unsigned|superseded/i.test(t))))].slice(0,3);
 return '<div class="step-explainer"><div><span class="eyebrow">How it works</span><p>'+E(actions.slice(0,3).join(' → ')||s.name)+'.</p></div><div><span class="eyebrow">Fastest observed path</span><p>'+(different?'<b>'+E(f.name)+'</b> · '+dur(f.step_medians_s_per_run[String(s.n)])+' for this step. '+E(f.description):'No distinct faster path is recorded for this step; follow the actions shown below.')+'</p></div><div><span class="eyebrow">Exceptions & errors</span><p>'+E(exceptions.length?exceptions.join('; '):'No step-specific error is recorded. Process-level review: '+c.recommendation.manual_touchpoints.join('; '))+'.</p></div></div>';
}
function scopedDays(c,wi){
 const ds=c.x.days;if(wi<0)return ds;
 if(c.x.period==='day')return ds.slice(wi*5,wi*5+5);
 const ranges=[['2026-10-13','2026-10-19'],['2026-10-20','2026-10-26'],['2026-10-27','2026-11-02']];
 return ds.filter(d=>d.date>=ranges[wi][0]&&d.date<=ranges[wi][1]);
}
function periodPanel(c){
 const wi=typeof S==='undefined'?-1:S.wi,ds=scopedDays(c,wi),all=c.x.days;
 const runs=ds.reduce((a,d)=>a+(d.runs||0),0),hours=ds.reduce((a,d)=>a+(d.hours||0),0),cad=c.x.period!=='day';
 const avg=!cad?all.reduce((a,d)=>a+(d.hours||0),0)/3:null;
 return '<section class="period-evidence" data-period-evidence="'+c.id+'"><div class="period-evidence-head"><span class="eyebrow">'+(wi<0?'All available observations':WK[wi])+'</span><span class="pill">'+(cad?'Cadence: '+E(c.x.period):'Recorded daily volume')+'</span></div><div class="period-metrics"><div><small>Completed '+E(c.x.unit)+'s</small><b data-period-runs>'+runs.toLocaleString('en-US')+'</b></div><div><small>Hands-on time</small><b data-period-hours>'+hours.toFixed(1)+' h</b></div><div><small>'+(wi<0?'Observation dates':'vs full-period weekly average')+'</small><b class="period-small">'+(wi<0?E(all[0].date+' – '+all[all.length-1].date):avg?((hours-avg)/avg*100>=0?'+':'')+((hours-avg)/avg*100).toFixed(1)+'%':'Not comparable across '+E(c.x.period)+' cycles')+'</b></div></div>'+(!ds.length?'<p class="empty-period">No observations in the selected week. This '+E(c.x.period)+' process has its own observation dates; no weekly values have been imputed.</p>':'')+'<p class="note">Selected-period totals above use the original daily / cycle records. All process maps, path timings, people benchmarks and example traces below are <b>full-observation reference evidence</b>, not week-specific medians.</p></section>';
}
/* Linked host weekly records can be added, unlike unrelated person cohorts. */
CASES.forEach(c=>{if(!c.x.link)return;Object.values(c.x.link.weeks).forEach(L=>{
 const z={wi:-1,runs:0,cats:{},steps:{}};
 L.weeks.forEach(w=>{z.runs+=w.runs||0;for(const[k,v]of Object.entries(w.cats)){const a=z.cats[k]||(z.cats[k]={});for(const[n,num]of Object.entries(v))if(typeof num==='number')a[n]=(a[n]||0)+num;}
 for(const[k,v]of Object.entries(w.steps)){const a=z.steps[k]||(z.steps[k]={cat:v.cat,count:0,min:0});a.count+=v.count||0;a.min+=v.min||0;}});
 L.weeks[-1]=z;
});});

window.CX={data:D, org, deptOf, ownerTeam, departments:DEPT, card:cardFor, stepSummary, periodPanel,catLink,catStepsTable,openCat,render:rCases,stageAttr,stageFoot,stageSub,overviewSwitch,procPeople,sugLink,companyBlock,cases:navCases,short:navCases.map(c=>SHORT[c.id]),intents:INTENTS,suggest:SUGGEST,openDoc,teamBlock,personBlock,
 procCase:p=>CASES.find(c=>c.proc===p)||null,sugCase:s=>CASES.find(c=>c.sug===s)||null,
 crumb:()=>{let c=current();return c?SHORT[c.id]:'';},
 isHarbor:()=>{let c=current();return !!(c&&c.group==='harbor');},
 crumbs:()=>{let c=current();return c&&c.group==='harbor'?['Processes & automation',c.title]:['Processes & automation',c?SHORT[c.id]:'Process maps'];},
 nav:()=>[{t:'Processes · step by step',items:groupCases('harbor')},{t:'Use cases from the call',items:groupCases('jeremy')}].map(g=>({t:g.t,items:g.items.map(c=>({id:c.id,short:SHORT[c.id],n:c.steps.length}))}))};
})();

