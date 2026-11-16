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
