
/* Harbor Mutual — fictional sample data. Every number below is computed from these definitions,
   so people sum to teams and teams sum to the company. Units: deci-hours (0.1 h = 6 min). */
const WEEKS = [
  { id:'w1', label:'Oct 13–17', short:'Week 1' },
  { id:'w2', label:'Oct 20–24', short:'Week 2' },
  { id:'w3', label:'Oct 27–31', short:'Week 3' },
];
const DAYS = ['Mon','Tue','Wed','Thu','Fri'];
const TYPES = {
  entry:'Data entry & re-keying', docs:'Document handling', report:'Reporting & reconciliation',
  comms:'Email & coordination', review:'Review & decisions', test:'Testing & QA', lookup:'Search & lookup', meet:'Meetings',
};
const TYPE_ORDER = ['entry','docs','report','lookup','comms','review','test','meet'];

const ROLES = {
  /* ---------- Strategic operations ---------- */
  replead:{ title:'Operations reporting lead', noun:'Lead', sw:13, frag:.20, cats:[
    {id:'opspack', n:'Monthly ops pack', type:'report', sh:.33, ai:.55, avg:42, apps:{Excel:.5,'Power BI':.3,PowerPoint:.2}, tasks:[
      ['Pull claims volumes from Power BI into the pack','Power BI',3,1],['Reconcile loss-ratio figures with Finance’s version','Excel',3,0],
      ['Rebuild pivot tables after the source refresh','Excel',2,1],['Paste charts into the SVP deck and fix formatting','PowerPoint',2,1]]},
    {id:'adhoc', n:'Leadership data requests', type:'lookup', sh:.19, ai:.45, avg:24, apps:{Excel:.45,Outlook:.35,SharePoint:.2}, tasks:[
      ['Answer “how many open claims…” requests','Excel',3,1],['Find last quarter’s figures in SharePoint','SharePoint',2,1],['Reply with a table and caveats','Outlook',2,1]]},
    {id:'comment', n:'Pack commentary', type:'docs', sh:.14, ai:.40, avg:35, apps:{Word:.6,PowerPoint:.4}, tasks:[
      ['Draft variance commentary for each line','Word',3,1],['Rewrite after review notes','Word',2,0]]},
    {id:'coord', n:'Coordination & follow-ups', type:'comms', sh:.19, ai:.30, avg:12, apps:{Teams:.55,Outlook:.45}, tasks:[
      ['Chase inputs from Finance and Claims','Teams',3,1],['Confirm pack deadlines and owners','Outlook',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.15, ai:.08, avg:40, apps:{Teams:1}, tasks:[
      ['Pack review with the SVP','Teams',2,0],['Weekly ops stand-up','Teams',2,0]]}],
    recs:[
      {t:'Ops pack assembled from Power BI and Finance extracts', cat:'opspack', pct:.40, pr:'Start now', d:'The same eight tables are rebuilt every month. An agent assembles them; you review the variances.'},
      {t:'Answer drafts for leadership data requests, with sources', cat:'adhoc', pct:.30, pr:'Start now', d:'Most requests repeat last month’s question with a new date range.'},
      {t:'First draft of the commentary from the variance table', cat:'comment', pct:.30, pr:'Next', d:'You keep the judgement; the draft keeps the structure.'}],
    know:[
      {k:'How the monthly ops pack is built', ev:'Worked on {eps:opspack} pack sections this week across Excel, Power BI and PowerPoint'},
      {k:'Where leadership numbers live', ev:'Answered {eps:adhoc} data requests, most from SharePoint archives'},
      {k:'Variance commentary', ev:'{h:comment} of commentary drafting this week'}] },
  stratan:{ title:'Strategy analyst', noun:'Analyst', sw:15, frag:.24, cats:[
    {id:'tracking', n:'Initiative tracking', type:'report', sh:.27, ai:.50, avg:22, apps:{Excel:.6,SharePoint:.25,Outlook:.15}, tasks:[
      ['Update the initiative tracker from owners’ emails','Excel',3,1],['Recalculate savings to date per initiative','Excel',2,1],['Publish the tracker to SharePoint','SharePoint',1,1]]},
    {id:'research', n:'Benchmarks & market research', type:'lookup', sh:.21, ai:.40, avg:30, apps:{Browser:.6,Excel:.25,Word:.15}, tasks:[
      ['Collect peer combined ratios from public filings','Browser',3,1],['Normalize benchmark tables','Excel',2,1]]},
    {id:'deck', n:'Decks & briefings', type:'docs', sh:.22, ai:.40, avg:38, apps:{PowerPoint:.75,Excel:.25}, tasks:[
      ['Build the steering-committee deck','PowerPoint',3,0],['Re-type tracker numbers into slides','PowerPoint',2,1]]},
    {id:'coord', n:'Coordination & follow-ups', type:'comms', sh:.17, ai:.30, avg:12, apps:{Teams:.5,Outlook:.5}, tasks:[
      ['Chase initiative owners for status','Outlook',3,1],['Answer questions in the ops channel','Teams',2,0]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.13, ai:.08, avg:40, apps:{Teams:1}, tasks:[['Initiative check-ins','Teams',2,0],['Weekly ops stand-up','Teams',1,0]]}],
    recs:[
      {t:'Initiative status digest from owners’ emails', cat:'tracking', pct:.40, pr:'Start now', d:'Status arrives in email; an agent updates the tracker and flags what is late.'},
      {t:'Steering deck pre-filled from the tracker', cat:'deck', pct:.30, pr:'Next', d:'Numbers move from Excel to slides without re-typing.'},
      {t:'Benchmark table refresh with citations', cat:'research', pct:.25, pr:'Next', d:'Same peer set every quarter; the draft cites every figure.'}],
    know:[
      {k:'Initiative portfolio and owners', ev:'Made {eps:tracking} tracker updates this week'},
      {k:'Peer benchmarks', ev:'{h:research} on public filings and benchmark tables'}] },
  pm:{ title:'Program manager', noun:'Manager', sw:16, frag:.27, cats:[
    {id:'status', n:'Program status reports', type:'report', sh:.24, ai:.50, avg:30, apps:{Excel:.4,Jira:.35,PowerPoint:.25}, tasks:[
      ['Compile weekly status from Jira and email','Jira',3,1],['Update the RAID log','Excel',2,1],['Format the status slide','PowerPoint',1,1]]},
    {id:'vendor', n:'Vendor follow-ups', type:'comms', sh:.20, ai:.35, avg:14, apps:{Outlook:.75,Teams:.25}, tasks:[
      ['Chase the bill-review vendor on SLA reports','Outlook',2,1],['Confirm milestones with the policy-admin vendor','Outlook',2,0]]},
    {id:'coord', n:'Coordination & follow-ups', type:'comms', sh:.18, ai:.30, avg:12, apps:{Teams:.6,Outlook:.4}, tasks:[['Unblock owners across teams','Teams',3,0]]},
    {id:'risk', n:'Risk & decision log', type:'review', sh:.14, ai:.25, avg:25, apps:{Excel:.6,SharePoint:.4}, tasks:[['Review open risks before steering','Excel',2,0]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.24, ai:.08, avg:45, apps:{Teams:1}, tasks:[['Steering committee','Teams',2,0],['Vendor calls','Teams',2,0]]}],
    recs:[
      {t:'Weekly status drafted from Jira and email', cat:'status', pct:.45, pr:'Start now', d:'The status report repeats the same structure every Friday.'},
      {t:'Vendor follow-up drafts with SLA evidence', cat:'vendor', pct:.30, pr:'Next', d:'Drafts the chase email with the missed dates attached.'}],
    know:[{k:'Vendor contracts and milestones', ev:'{eps:vendor} vendor threads followed this week'},{k:'Cross-team program status', ev:'{h:status} on status reporting'}] },
  datan:{ title:'Data analyst', noun:'Analyst', sw:11, frag:.16, cats:[
    {id:'refresh', n:'Report refresh & fixes', type:'report', sh:.32, ai:.45, avg:35, apps:{'Power BI':.6,'SQL client':.25,Excel:.15}, tasks:[
      ['Fix the claims dashboard after a source column changed','Power BI',3,0],['Re-run the weekly refresh by hand','Power BI',2,1],['Check row counts against ClaimCenter extracts','SQL client',2,1]]},
    {id:'pulls', n:'Data pulls', type:'lookup', sh:.26, ai:.50, avg:25, apps:{'SQL client':.6,Excel:.4}, tasks:[['Write extracts for leadership requests','SQL client',3,1],['Clean extracts in Excel','Excel',2,1]]},
    {id:'dq', n:'Data-quality checks', type:'review', sh:.18, ai:.40, avg:30, apps:{'SQL client':.5,Excel:.5}, tasks:[['Find duplicate claims across sources','SQL client',2,1]]},
    {id:'coord', n:'Coordination & follow-ups', type:'comms', sh:.12, ai:.30, avg:12, apps:{Teams:.6,Outlook:.4}, tasks:[['Clarify request definitions','Teams',2,0]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.12, ai:.08, avg:35, apps:{Teams:1}, tasks:[['Weekly ops stand-up','Teams',1,0]]}],
    recs:[
      {t:'Refresh monitor that explains broken visuals', cat:'refresh', pct:.35, pr:'Start now', d:'Catches source changes before the Monday pack.'},
      {t:'Self-serve answers for repeated data pulls', cat:'pulls', pct:.40, pr:'Next', d:'Repeated requests answered from saved, reviewed queries.'}],
    know:[{k:'Claims data model and Power BI refresh', ev:'Fixed or re-ran {eps:refresh} refreshes this week'},{k:'SQL extracts behind the ops pack', ev:'{eps:pulls} extracts written this week'}] },

  /* ---------- Finance operations ---------- */
  payacc:{ title:'Claims payments accountant', noun:'Accountant', sw:12, frag:.18, cats:[
    {id:'payrecon', n:'Payment reconciliation', type:'report', sh:.31, ai:.55, avg:32, apps:{Excel:.55,'General ledger':.3,ClaimCenter:.15}, tasks:[
      ['Match ClaimCenter payments to the bank file','Excel',4,1],['Investigate unmatched items','ClaimCenter',2,0],['Post adjusting entries','General ledger',2,0]]},
    {id:'paybatch', n:'Vendor & medical bill payments', type:'entry', sh:.24, ai:.55, avg:18, apps:{ClaimCenter:.5,Excel:.2,Outlook:.3}, tasks:[
      ['Re-key approved bill amounts into the payment batch','ClaimCenter',3,1],['Check payee tax-form status','Excel',1,1],['Send remittance confirmations','Outlook',1,1]]},
    {id:'close', n:'Month-end close', type:'report', sh:.15, ai:.40, avg:40, apps:{'General ledger':.6,Excel:.4}, tasks:[['Accruals for open claim payments','General ledger',2,0],['Close checklist','Excel',1,1]]},
    {id:'exc', n:'Exception emails', type:'comms', sh:.18, ai:.35, avg:10, apps:{Outlook:.8,Teams:.2}, tasks:[['Ask adjusters about payments without approval','Outlook',3,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.12, ai:.08, avg:35, apps:{Teams:1}, tasks:[['Close stand-up','Teams',1,0]]}],
    recs:[
      {t:'Bank-file matching with an exceptions list', cat:'payrecon', pct:.45, pr:'Start now', d:'Exact and near matches cleared first; you work only the exceptions.'},
      {t:'Payment batch pre-filled from approved bills', cat:'paybatch', pct:.40, pr:'Start now', d:'No re-keying of amounts already approved in ClaimCenter.'},
      {t:'Exception email drafts with the claim context', cat:'exc', pct:.30, pr:'Next', d:'The draft already names the claim, amount and missing approval.'}],
    know:[{k:'Claims payment reconciliation', ev:'{eps:payrecon} reconciliation sessions this week across Excel and the GL'},{k:'Payee and remittance rules', ev:'{eps:paybatch} payment batches prepared'}] },
  reins:{ title:'Reinsurance accountant', noun:'Accountant', sw:10, frag:.14, cats:[
    {id:'bdx', n:'Bordereaux preparation', type:'report', sh:.38, ai:.60, avg:45, apps:{Excel:.8,SharePoint:.2}, tasks:[
      ['Build the quarterly bordereaux from claim extracts','Excel',4,1],['Run the bordereaux macro and fix its errors','Excel',2,0],['Upload the file for the broker','SharePoint',1,1]]},
    {id:'recov', n:'Treaty recoveries', type:'review', sh:.24, ai:.35, avg:35, apps:{Excel:.6,'General ledger':.4}, tasks:[['Check large-loss recoveries against treaty terms','Excel',3,0]]},
    {id:'broker', n:'Broker & reinsurer emails', type:'comms', sh:.24, ai:.35, avg:14, apps:{Outlook:.9,Teams:.1}, tasks:[['Answer reinsurer queries on the bordereaux','Outlook',3,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.14, ai:.08, avg:40, apps:{Teams:1}, tasks:[['Quarter-end review','Teams',1,0]]}],
    recs:[
      {t:'Bordereaux build without the macro', cat:'bdx', pct:.50, pr:'Start now', d:'The same extract–map–check routine every quarter, documented step by step.'},
      {t:'Reinsurer query answers with source rows', cat:'broker', pct:.30, pr:'Next', d:'Each answer cites the claim rows it comes from.'}],
    know:[{k:'The reinsurance bordereaux macro', ev:'Ran the macro {eps:bdx} times — no one else opened the workbook in 3 weeks'},{k:'Treaty terms for large losses', ev:'{h:recov} on recoveries this week'}] },
  fpa:{ title:'FP&A analyst', noun:'Analyst', sw:12, frag:.18, cats:[
    {id:'lrpack', n:'Loss-ratio & expense pack', type:'report', sh:.30, ai:.50, avg:40, apps:{Excel:.6,'Power BI':.2,'General ledger':.2}, tasks:[
      ['Reconcile paid losses to the GL','Excel',3,0],['Refresh the loss-ratio tables','Excel',3,1],['Send figures to Strategic operations','Outlook',1,1]]},
    {id:'forecast', n:'Forecast model updates', type:'report', sh:.22, ai:.35, avg:45, apps:{Excel:1}, tasks:[['Roll the reserve forecast forward','Excel',3,0]]},
    {id:'variance', n:'Variance commentary', type:'docs', sh:.16, ai:.40, avg:30, apps:{Word:.5,Excel:.5}, tasks:[['Explain expense variances by line','Word',2,1]]},
    {id:'freq', n:'Finance data requests', type:'lookup', sh:.18, ai:.45, avg:20, apps:{Excel:.5,Outlook:.5}, tasks:[['Answer leadership questions on expense lines','Outlook',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.14, ai:.08, avg:40, apps:{Teams:1}, tasks:[['Close review','Teams',1,0]]}],
    recs:[
      {t:'Loss-ratio tables refreshed from the GL extract', cat:'lrpack', pct:.40, pr:'Start now', d:'The tables Strategic operations waits for, ready on day 2 of close.'},
      {t:'Variance commentary first draft', cat:'variance', pct:.30, pr:'Next', d:'Drafts the explanation; you confirm the cause.'}],
    know:[{k:'Loss-ratio reconciliation', ev:'{eps:lrpack} pack sessions this week'},{k:'Reserve forecast model', ev:'{h:forecast} in the forecast workbook'}] },
  ap:{ title:'Accounts payable specialist', noun:'Specialist', sw:14, frag:.21, cats:[
    {id:'invoice', n:'Invoice entry', type:'entry', sh:.40, ai:.60, avg:8, apps:{'General ledger':.6,Outlook:.25,Excel:.15}, tasks:[
      ['Type PDF invoice lines into the GL','General ledger',4,1],['Match invoices to purchase orders','Excel',2,1]]},
    {id:'approve', n:'Approval chasing', type:'comms', sh:.24, ai:.40, avg:10, apps:{Outlook:.7,Teams:.3}, tasks:[['Chase budget owners for approval','Outlook',3,1]]},
    {id:'vendmaster', n:'Vendor master updates', type:'entry', sh:.20, ai:.45, avg:15, apps:{'General ledger':.7,Excel:.3}, tasks:[['Update vendor bank details after call-back','General ledger',2,0]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.16, ai:.08, avg:30, apps:{Teams:1}, tasks:[['AP stand-up','Teams',1,0]]}],
    recs:[
      {t:'Invoice lines captured from PDFs', cat:'invoice', pct:.50, pr:'Start now', d:'Reads the invoice, proposes the GL coding; you approve the batch.'},
      {t:'Approval reminders with the invoice attached', cat:'approve', pct:.35, pr:'Next', d:'Reminders go out on a schedule you set.'}],
    know:[{k:'Vendor master and payment controls', ev:'{eps:vendmaster} vendor updates with call-back checks'}] },

  /* ---------- Claims intake ---------- */
  intlead:{ title:'Intake lead', noun:'Lead', sw:19, frag:.30, cats:[
    {id:'queue', n:'Queue balancing', type:'review', sh:.24, ai:.30, avg:15, apps:{ClaimCenter:.7,Excel:.3}, tasks:[['Reassign new claims across the team','ClaimCenter',3,0],['Watch claims waiting over 4 hours','ClaimCenter',2,1]]},
    {id:'dailyrep', n:'Daily intake report', type:'report', sh:.22, ai:.65, avg:30, apps:{Excel:.6,'Power BI':.25,Outlook:.15}, tasks:[
      ['Count new claims by line and channel','Excel',3,1],['Copy volumes into the daily report','Excel',2,1],['Email the report to Strategic operations','Outlook',1,1]]},
    {id:'escal', n:'Escalations', type:'comms', sh:.20, ai:.30, avg:12, apps:{Outlook:.5,Teams:.5}, tasks:[['Resolve coverage questions with underwriting','Teams',2,0],['Answer adjuster escalations','Outlook',2,0]]},
    {id:'qasample', n:'Quality sampling & coaching', type:'review', sh:.18, ai:.35, avg:20, apps:{ClaimCenter:.8,Excel:.2}, tasks:[['Sample new claims for data errors','ClaimCenter',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.16, ai:.08, avg:30, apps:{Teams:1}, tasks:[['Morning huddle','Teams',2,0]]}],
    recs:[
      {t:'Daily intake report built automatically', cat:'dailyrep', pct:.60, pr:'Start now', d:'Same counts every morning; the report is ready before the huddle.'},
      {t:'Quality sample pre-sorted by likely errors', cat:'qasample', pct:.30, pr:'Next', d:'You coach on the claims that matter.'}],
    know:[{k:'Queue rules and coverage edge cases', ev:'{eps:escal} escalations resolved this week'},{k:'Daily intake metrics', ev:'Built {eps:dailyrep} daily report updates'}] },
  intspec:{ title:'Intake specialist', noun:'Specialist', sw:22, frag:.33, cats:[
    {id:'fnol', n:'FNOL entry', type:'entry', sh:.29, ai:.55, avg:9, apps:{ClaimCenter:.7,Outlook:.2,'Policy admin':.1}, tasks:[
      ['Create the claim from a first-notice email','ClaimCenter',4,1],['Re-key policy number and loss details','ClaimCenter',3,1],['Copy claimant details into the intake tracker','Excel',1,1]]},
    {id:'docmatch', n:'Document matching & indexing', type:'docs', sh:.26, ai:.60, avg:6, apps:{'Document portal':.55,ClaimCenter:.35,Outlook:.1}, tasks:[
      ['Match incoming attachments to the right claim','Document portal',4,1],['Rename and index medical records','Document portal',2,1],['Request missing documents','Outlook',1,1]]},
    {id:'covlook', n:'Coverage lookup', type:'lookup', sh:.14, ai:.45, avg:5, apps:{'Policy admin':.8,ClaimCenter:.2}, tasks:[['Verify coverage and effective dates','Policy admin',3,1]]},
    {id:'cmail', n:'Claimant & adjuster emails', type:'comms', sh:.17, ai:.40, avg:6, apps:{Outlook:.75,Teams:.25}, tasks:[['Acknowledge new claims to claimants','Outlook',3,1],['Answer adjusters about missing files','Teams',2,0]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.07, ai:.05, avg:20, apps:{Teams:1}, tasks:[['Morning huddle','Teams',1,0]]},
    {id:'queue', n:'Queue balancing', type:'review', sh:.07, ai:.30, avg:8, apps:{ClaimCenter:1}, tasks:[['Pick the next claim from the queue','ClaimCenter',1,0]]}],
    recs:[
      {t:'FNOL email turned into a claim draft', cat:'fnol', pct:.45, pr:'Start now', d:'Reads the email, finds the policy, fills the claim. You confirm and submit.'},
      {t:'Attachments matched and indexed automatically', cat:'docmatch', pct:.50, pr:'Start now', d:'Unmatched files land in one short list instead of the whole inbox.'},
      {t:'Acknowledgement drafts for new claims', cat:'cmail', pct:.35, pr:'Next', d:'Uses your approved templates; you send.'}],
    know:[{k:'FNOL set-up in ClaimCenter', ev:'Created or completed {eps:fnol} claims this week'},{k:'Medical record indexing', ev:'Matched {eps:docmatch} documents to claims'}] },
  medbill:{ title:'Medical bill coordinator (workers’ comp)', noun:'Coordinator', sw:17, frag:.26, cats:[
    {id:'medintake', n:'Medical bill intake', type:'docs', sh:.30, ai:.55, avg:7, apps:{'Bill review portal':.5,ClaimCenter:.3,Excel:.2}, tasks:[
      ['Open bills and records from providers','Bill review portal',3,1],['Attach records to the claim','ClaimCenter',2,1]]},
    {id:'fee', n:'Fee-schedule checks', type:'review', sh:.26, ai:.45, avg:8, apps:{'Bill review portal':.6,Excel:.4}, tasks:[['Check bill lines against the state fee schedule','Bill review portal',3,0],['Flag duplicate bills','Excel',1,1]]},
    {id:'medentry', n:'Bill data entry', type:'entry', sh:.20, ai:.60, avg:6, apps:{ClaimCenter:.8,Excel:.2}, tasks:[['Re-key reviewed amounts into ClaimCenter','ClaimCenter',3,1]]},
    {id:'provider', n:'Provider follow-ups', type:'comms', sh:.16, ai:.35, avg:8, apps:{Outlook:.8,Teams:.2}, tasks:[['Ask providers for missing records','Outlook',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.08, ai:.05, avg:20, apps:{Teams:1}, tasks:[['Morning huddle','Teams',1,0]]}],
    recs:[
      {t:'Fee-schedule pre-check on every bill line', cat:'fee', pct:.35, pr:'Start now', d:'Lines over the schedule are flagged; you decide.'},
      {t:'Reviewed amounts posted without re-keying', cat:'medentry', pct:.50, pr:'Start now', d:'Amounts flow from the bill review into ClaimCenter as a draft.'}],
    know:[{k:'State workers’ comp fee schedules', ev:'Checked {eps:fee} bills against the fee schedule this week'},{k:'Provider records requests', ev:'{eps:provider} provider follow-ups'}] },

  /* ---------- Claims testing ---------- */
  qaan:{ title:'QA analyst', noun:'Analyst', sw:9, frag:.15, cats:[
    {id:'regress', n:'Manual regression runs', type:'test', sh:.34, ai:.55, avg:40, apps:{ClaimCenter:.55,'Test manager':.35,Excel:.1}, tasks:[
      ['Run the payments regression pack by hand','ClaimCenter',4,1],['Screenshot evidence into the test manager','Test manager',2,1],['Tick results in the run sheet','Excel',1,1]]},
    {id:'testdata', n:'Test data set-up', type:'entry', sh:.20, ai:.60, avg:25, apps:{ClaimCenter:.6,'Policy admin':.4}, tasks:[['Create test policies with specific coverages','Policy admin',2,1],['Create test claims for each scenario','ClaimCenter',3,1]]},
    {id:'defects', n:'Defect logging', type:'docs', sh:.16, ai:.45, avg:15, apps:{Jira:.8,Teams:.2}, tasks:[['Write up failed steps with evidence','Jira',3,1]]},
    {id:'cases', n:'Test case upkeep', type:'docs', sh:.14, ai:.40, avg:25, apps:{'Test manager':1}, tasks:[['Update cases after a release note','Test manager',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.16, ai:.08, avg:30, apps:{Teams:1}, tasks:[['Daily stand-up','Teams',2,0],['Defect triage','Teams',1,0]]}],
    recs:[
      {t:'Regression pack run by an agent, with evidence', cat:'regress', pct:.50, pr:'Start now', d:'Same 64 scenarios every release; you review failures only.'},
      {t:'Test data created on request', cat:'testdata', pct:.55, pr:'Start now', d:'Describe the scenario; the policy and claim are created for you.'},
      {t:'Defect write-ups drafted from the failed step', cat:'defects', pct:.35, pr:'Next', d:'Steps, expected vs actual and screenshots in one draft.'}],
    know:[{k:'Payments regression scenarios', ev:'Executed {eps:regress} regression sessions this week'},{k:'Test data for workers’ comp claims', ev:'Created {eps:testdata} test data sets'}] },
  autoeng:{ title:'Test automation engineer', noun:'Engineer', sw:8, frag:.12, cats:[
    {id:'scripts', n:'Script maintenance', type:'test', sh:.34, ai:.40, avg:50, apps:{'VS Code':.7,Jira:.3}, tasks:[['Fix locators after a UI change','VS Code',3,0]]},
    {id:'flaky', n:'Flaky test triage', type:'review', sh:.22, ai:.35, avg:30, apps:{'VS Code':.5,'Test manager':.5}, tasks:[['Re-run and classify failing tests','Test manager',2,1]]},
    {id:'pipeline', n:'Pipeline runs', type:'test', sh:.22, ai:.45, avg:35, apps:{'Test manager':.6,Jira:.4}, tasks:[['Trigger nightly runs and read results','Test manager',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.22, ai:.08, avg:30, apps:{Teams:1}, tasks:[['Daily stand-up','Teams',2,0]]}],
    recs:[{t:'Flaky-test classifier on every nightly run', cat:'flaky', pct:.40, pr:'Next', d:'Separates real failures from environment noise.'}],
    know:[{k:'Automation framework for ClaimCenter', ev:'{h:scripts} of script maintenance this week'}] },
  uatco:{ title:'UAT coordinator', noun:'Coordinator', sw:15, frag:.25, cats:[
    {id:'signoff', n:'UAT scheduling & sign-off', type:'comms', sh:.28, ai:.40, avg:12, apps:{Outlook:.6,Teams:.4}, tasks:[['Chase business testers for sign-off','Outlook',3,1]]},
    {id:'evidence', n:'Evidence packs', type:'docs', sh:.26, ai:.55, avg:30, apps:{SharePoint:.5,Excel:.3,'Test manager':.2}, tasks:[['Assemble screenshots into the sign-off pack','SharePoint',3,1]]},
    {id:'uatrep', n:'UAT status reports', type:'report', sh:.22, ai:.55, avg:25, apps:{Excel:.6,'Test manager':.4}, tasks:[['Count passed, failed and blocked cases','Excel',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.24, ai:.08, avg:35, apps:{Teams:1}, tasks:[['Defect triage','Teams',2,0]]}],
    recs:[{t:'Sign-off pack assembled from the test manager', cat:'evidence', pct:.50, pr:'Start now', d:'Every screenshot already lives in the test manager.'},{t:'UAT status report built automatically', cat:'uatrep', pct:.55, pr:'Start now', d:'Counts and blockers, ready before triage.'}],
    know:[{k:'Business testers and sign-off rules', ev:'{eps:signoff} sign-off threads this week'}] },

  /* ---------- Underwriting support ---------- */
  uwa:{ title:'Underwriting assistant', noun:'Assistant', sw:16, frag:.24, cats:[
    {id:'subintake', n:'Submission intake', type:'entry', sh:.30, ai:.50, avg:20, apps:{Outlook:.35,'Policy admin':.45,Excel:.2}, tasks:[
      ['Re-type broker submissions into Policy admin','Policy admin',4,1],['Save submission attachments to the file','Outlook',1,1]]},
    {id:'lossrun', n:'Loss-run summaries', type:'docs', sh:.22, ai:.55, avg:25, apps:{Excel:.6,'Document portal':.4}, tasks:[['Summarize five-year loss runs into the template','Excel',3,1]]},
    {id:'rating', n:'Rating workbook prep', type:'report', sh:.18, ai:.40, avg:30, apps:{Excel:1}, tasks:[['Fill exposures into the rating workbook','Excel',3,1]]},
    {id:'bmail', n:'Broker follow-ups', type:'comms', sh:.18, ai:.40, avg:8, apps:{Outlook:.85,Teams:.15}, tasks:[['Ask brokers for missing applications','Outlook',3,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.12, ai:.08, avg:30, apps:{Teams:1}, tasks:[['Underwriting huddle','Teams',1,0]]}],
    recs:[
      {t:'Broker submission captured into Policy admin', cat:'subintake', pct:.40, pr:'Start now', d:'Reads the ACORD form and email; you check the draft.'},
      {t:'Loss-run summary drafted from the PDF', cat:'lossrun', pct:.50, pr:'Start now', d:'Five years of losses into your template, with page references.'}],
    know:[{k:'Submission requirements by line', ev:'{eps:subintake} submissions set up this week'},{k:'Loss-run summaries', ev:'{eps:lossrun} loss runs summarized'}] },
  pss:{ title:'Policy service specialist', noun:'Specialist', sw:18, frag:.28, cats:[
    {id:'endorse', n:'Endorsement processing', type:'entry', sh:.32, ai:.55, avg:12, apps:{'Policy admin':.6,Outlook:.3,'Document portal':.1}, tasks:[
      ['Copy endorsement requests from email into Policy admin','Policy admin',4,1],['Check the change against underwriting rules','Policy admin',2,0]]},
    {id:'coi', n:'Certificates of insurance', type:'docs', sh:.22, ai:.60, avg:6, apps:{'Policy admin':.5,Outlook:.4,'Document portal':.1}, tasks:[['Issue certificates on agent request','Policy admin',3,1]]},
    {id:'billq', n:'Billing questions', type:'lookup', sh:.18, ai:.45, avg:7, apps:{'Policy admin':.6,Outlook:.4}, tasks:[['Look up invoices and payment status','Policy admin',2,1]]},
    {id:'amail', n:'Agent emails', type:'comms', sh:.18, ai:.40, avg:6, apps:{Outlook:.9,Teams:.1}, tasks:[['Confirm changes to agents','Outlook',3,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.10, ai:.08, avg:25, apps:{Teams:1}, tasks:[['Service huddle','Teams',1,0]]}],
    recs:[
      {t:'Endorsement request turned into a change draft', cat:'endorse', pct:.45, pr:'Start now', d:'The request is read and keyed; changes with rating impact go to an underwriter.'},
      {t:'Certificates issued from standard requests', cat:'coi', pct:.55, pr:'Start now', d:'Standard holders and wording; anything unusual comes to you.'}],
    know:[{k:'Endorsement rules in Policy admin', ev:'Processed {eps:endorse} endorsements this week'},{k:'Certificate wording', ev:'{eps:coi} certificates issued'}] },
  subman:{ title:'Submission analyst', noun:'Analyst', sw:14, frag:.20, cats:[
    {id:'clear', n:'Clearance checks', type:'lookup', sh:.30, ai:.50, avg:10, apps:{'Policy admin':.6,Excel:.4}, tasks:[['Check new submissions against existing accounts','Policy admin',3,1]]},
    {id:'subrep', n:'Submission reporting', type:'report', sh:.26, ai:.55, avg:30, apps:{'Power BI':.4,Excel:.6}, tasks:[['Build the weekly submission funnel','Excel',3,1]]},
    {id:'subdq', n:'Submission data quality', type:'review', sh:.22, ai:.40, avg:20, apps:{'Policy admin':.7,Excel:.3}, tasks:[['Fix missing class codes','Policy admin',2,1]]},
    {id:'bmail', n:'Broker follow-ups', type:'comms', sh:.12, ai:.40, avg:8, apps:{Outlook:1}, tasks:[['Ask brokers for missing applications','Outlook',2,1]]},
    {id:'meet', n:'Meetings', type:'meet', sh:.10, ai:.08, avg:30, apps:{Teams:1}, tasks:[['Underwriting huddle','Teams',1,0]]}],
    recs:[{t:'Clearance check before the submission is keyed', cat:'clear', pct:.45, pr:'Start now', d:'Duplicates and existing accounts flagged in seconds.'},{t:'Submission funnel built automatically', cat:'subrep', pct:.55, pr:'Next', d:'Weekly funnel from Policy admin, no copy-paste.'}],
    know:[{k:'Clearance rules and account matching', ev:'{eps:clear} clearance checks this week'}] },
};

/* team definitions; wf = week workload factor, boost = per-week multiplier by work type */
const TEAMS = [
  { id:'strat', name:'Strategic operations', short:'Strategy ops', letter:'S', wf:[1,1.01,1.04], boost:[{},{},{report:1.12}],
    lede:'Runs the monthly operating pack, the initiative portfolio and the steering committee. Most hours go into assembling numbers other teams already have.',
    dup:[{t:'Claims volumes copied from Power BI into the ops pack by hand', cats:['opspack','refresh'], pct:.16},
         {t:'Initiative status re-typed from email into the tracker, then into slides', cats:['tracking','deck'], pct:.14}],
    hand:[{from:'fin', to:'strat', what:'Loss-ratio figures for the monthly pack', n:[4,5,9], wait:[20,18,31]},
          {from:'strat', to:'lead', what:'Pack review and sign-off', n:[2,2,4], wait:[26,22,29]},
          {from:'intake', to:'strat', what:'Daily intake report', n:[5,5,5], wait:[3,3.5,3]}],
    risks:[{t:'Pack commentary is written by one person', who:'maya', ev:'All pack commentary in 3 weeks came from one person’s sessions.'},
           {t:'Power BI refresh fixes depend on one analyst', who:'hana', ev:'Every refresh fix in 3 weeks was done by the same person.'}],
    pats:[['Numbers arrive, then get re-typed','Finance and Claims already produce the figures. Strategic operations re-keys them into Excel and PowerPoint before anyone reads them.'],
          ['The month-end wait is the real bottleneck','The pack waits on Finance’s loss-ratio figures — about a day and a half in week 3.'],
          ['Meetings are not the problem','Meetings are ~15% of the week. Assembly work is more than half.']],
    opps:['pack','status'] },
  { id:'fin', name:'Finance operations', short:'Finance ops', letter:'F', wf:[0.97,1,1.12], boost:[{},{},{report:1.3}],
    lede:'Claims payments, reinsurance, FP&A and payables. Week 3 is month-end close: reconciliation and pack work jump, and so do after-hours.',
    dup:[{t:'Bill amounts approved in ClaimCenter re-keyed into the payment batch', cats:['paybatch'], pct:.30},
         {t:'Invoice lines typed from PDFs that already arrive as data', cats:['invoice'], pct:.25}],
    hand:[{from:'intake', to:'fin', what:'Approved medical bills → payment batch', n:[90,97,101], wait:[9,10,12]},
          {from:'fin', to:'strat', what:'Loss-ratio figures for the monthly pack', n:[4,5,9], wait:[20,18,31]},
          {from:'fin', to:'fin', what:'Invoice approvals from budget owners', n:[22,24,27], wait:[30,28,34]}],
    risks:[{t:'Only one person runs the reinsurance bordereaux macro', who:'omar', ev:'7 macro runs in 3 weeks; no one else opened the workbook.'},
           {t:'Bank-file matching rules live in one spreadsheet', who:'luis', ev:'The matching workbook was edited by one person in 3 weeks.'}],
    pats:[['Month-end doubles reconciliation','Reconciliation and pack work rise by about a third in week 3, and after-hours work follows.'],
          ['Exceptions, not volume, take the time','Most reconciliation minutes go to the unmatched items, not the matched ones.'],
          ['Approval chasing is a hidden queue','Invoices wait more than a day for budget-owner approval.']],
    opps:['recon','bdx','invoice'] },
  { id:'intake', name:'Claims intake', short:'Claims intake', letter:'I', wf:[1,1.08,1.02], boost:[{},{entry:1.15,docs:1.1},{}],
    lede:'First notice of loss, document matching and workers’ comp medical bills. Week 2 had a storm-related FNOL spike.',
    dup:[{t:'Claimant details typed twice — ClaimCenter and the intake tracker', cats:['fnol'], pct:.12},
         {t:'Reviewed bill amounts re-keyed from the bill review portal into ClaimCenter', cats:['medentry'], pct:.45},
         {t:'Daily volumes counted by hand that ClaimCenter already stores', cats:['dailyrep'], pct:.40}],
    hand:[{from:'intake', to:'intake', what:'Unmatched attachments → back to the specialist', n:[64,81,70], wait:[5,7,5.5]},
          {from:'intake', to:'uw', what:'Coverage questions to underwriting', n:[18,26,20], wait:[6,8,6.5]},
          {from:'intake', to:'fin', what:'Approved medical bills → payment batch', n:[90,97,101], wait:[9,10,12]},
          {from:'intake', to:'adj', what:'New claim assigned to an adjuster', n:[205,246,212], wait:[3.5,4.6,3.8]}],
    risks:[{t:'Fee-schedule exceptions handled by one coordinator', who:'jenna', ev:'Most fee-schedule overrides in 3 weeks came from one person’s sessions.'}],
    pats:[['FNOL is typing, not judgement','Most FNOL minutes go to re-keying details that are already in the email.'],
          ['Unmatched documents boomerang','About one in five attachments comes back to a specialist to be matched by hand.'],
          ['Highest context switching in the company','Specialists switch apps more than 20 times an hour between email, ClaimCenter and the document portal.']],
    opps:['fnol','docs','medbill','dailyrep'] },
  { id:'qa', name:'Claims testing', short:'Claims testing', letter:'T', wf:[0.95,1,1.1], boost:[{},{},{test:1.3}],
    lede:'Regression and UAT for ClaimCenter and Policy admin releases. Week 3 was a release week.',
    dup:[{t:'Evidence screenshots captured twice — test manager, then the sign-off pack', cats:['regress','evidence'], pct:.12},
         {t:'Test policies and claims created by hand for every run', cats:['testdata'], pct:.35}],
    hand:[{from:'qa', to:'qa', what:'Defects waiting for triage', n:[21,24,37], wait:[16,15,21]},
          {from:'qa', to:'biz', what:'UAT sign-off from business testers', n:[6,7,12], wait:[22,20,27]},
          {from:'qa', to:'intake', what:'UAT scenarios run by Claims intake staff', n:[4,5,9], wait:[18,17,24]}],
    risks:[{t:'Automation framework known by one engineer', who:'dev', ev:'All framework changes in 3 weeks came from one person.'}],
    pats:[['The regression pack is run by hand','64 scripted scenarios are executed manually every release.'],
          ['Test data takes as long as testing','Creating policies and claims for each scenario is a fifth of QA time.'],
          ['Sign-off waits stretch release weeks','UAT sign-off waited more than a day in week 3.']],
    opps:['regress','testdata','defects'] },
  { id:'uw', name:'Underwriting support', short:'Underwriting support', letter:'U', wf:[1,0.98,1.03], boost:[{},{},{}],
    lede:'Submissions, loss runs, endorsements and certificates. Policy servicing work arrives by email and is re-keyed into Policy admin.',
    dup:[{t:'Broker submissions re-typed from ACORD PDFs into Policy admin', cats:['subintake'], pct:.30},
         {t:'Endorsement requests copied from email into Policy admin', cats:['endorse'], pct:.28}],
    hand:[{from:'uw', to:'uwr', what:'Endorsements with rating impact → underwriter', n:[24,22,26], wait:[6,5.5,7]},
          {from:'intake', to:'uw', what:'Coverage questions from Claims intake', n:[18,26,20], wait:[6,8,6.5]},
          {from:'uw', to:'broker', what:'Missing applications requested from brokers', n:[30,28,33], wait:[40,44,38]}],
    risks:[{t:'Certificate wording exceptions known by one specialist', who:'jamal', ev:'Most non-standard certificates in 3 weeks were issued by one person.'}],
    pats:[['Email is the intake system','Submissions and endorsements arrive as email and are re-keyed.'],
          ['Brokers are the longest wait','Missing applications wait almost two days.'],
          ['Certificates are standard 80% of the time','Most certificates use standard holders and wording.']],
    opps:['endorse','subm','coi'] },
];
const EXT = { lead:'Leadership', adj:'Adjusters', biz:'Business testers', uwr:'Underwriters', broker:'Brokers' };

/* people: base = recorded hours in a normal week; ai = share of sessions with an AI-tool trace + tools */
const PEOPLE = [
  {id:'maya',  n:'Maya Okafor',    role:'replead', team:'strat', base:35.2, st:8.0, ai:[.14,['Copilot in Excel','Copilot in Outlook']]},
  {id:'daniel',n:'Daniel Brooks',  role:'stratan', team:'strat', base:33.6, st:8.4, ai:[.22,['Copilot in Outlook','Internal GPT']]},
  {id:'sofia', n:'Sofia Marin',    role:'stratan', team:'strat', base:32.4, st:8.7, ai:[.09,['Internal GPT']]},
  {id:'ethan', n:'Ethan Cole',     role:'pm',      team:'strat', base:34.8, st:8.2, ai:[.18,['Copilot in Teams','Copilot in Outlook']]},
  {id:'hana',  n:'Hana Kim',       role:'datan',   team:'strat', base:34.0, st:8.9, ai:[.26,['Internal GPT','Copilot in Excel']]},
  {id:'luis',  n:'Luis Romero',    role:'payacc',  team:'fin',   base:34.6, st:7.8, ai:[.04,['Copilot in Excel']]},
  {id:'grace', n:'Grace Whitaker', role:'payacc',  team:'fin',   base:33.2, st:8.3, ai:[0,[]]},
  {id:'omar',  n:'Omar Haddad',    role:'reins',   team:'fin',   base:33.8, st:8.6, ai:[0,[]]},
  {id:'rachel',n:'Rachel Stein',   role:'fpa',     team:'fin',   base:35.4, st:8.1, ai:[.12,['Copilot in Excel']]},
  {id:'kevin', n:'Kevin Tran',     role:'fpa',     team:'fin',   base:32.8, st:8.8, ai:[.07,['Internal GPT']]},
  {id:'monique',n:'Monique Lewis', role:'ap',      team:'fin',   base:33.0, st:7.9, ai:[0,[]]},
  {id:'carmen',n:'Carmen Diaz',    role:'intlead', team:'intake',base:35.6, st:7.6, ai:[.10,['Copilot in Outlook']]},
  {id:'tyler', n:'Tyler Morgan',   role:'intspec', team:'intake',base:34.4, st:7.9, ai:[0,[]]},
  {id:'aisha', n:'Aisha Bello',    role:'intspec', team:'intake',base:33.8, st:8.0, ai:[.06,['Copilot in Outlook']]},
  {id:'brian', n:'Brian Walsh',    role:'intspec', team:'intake',base:34.0, st:8.3, ai:[0,[]]},
  {id:'nina',  n:'Nina Petrov',    role:'intspec', team:'intake',base:32.6, st:8.5, ai:[0,[]]},
  {id:'marcus',n:'Marcus Hill',    role:'intspec', team:'intake',base:33.4, st:7.7, ai:[.03,['Copilot in Outlook']]},
  {id:'jenna', n:'Jenna Park',     role:'medbill', team:'intake',base:34.2, st:8.0, ai:[0,[]]},
  {id:'sam',   n:'Sam Ortega',     role:'medbill', team:'intake',base:33.0, st:8.4, ai:[.05,['Internal GPT']]},
  {id:'anika', n:'Anika Rao',      role:'qaan',    team:'qa',    base:34.0, st:8.6, ai:[.16,['Internal GPT']]},
  {id:'victor',n:'Victor Chen',    role:'qaan',    team:'qa',    base:33.4, st:8.9, ai:[.21,['Internal GPT','Copilot in Teams']]},
  {id:'laura', n:'Laura Bennett',  role:'qaan',    team:'qa',    base:32.8, st:8.2, ai:[.08,['Internal GPT']]},
  {id:'dev',   n:'Dev Malhotra',   role:'autoeng', team:'qa',    base:35.0, st:9.1, ai:[.34,['GitHub Copilot','Internal GPT']]},
  {id:'chloe', n:'Chloe Martin',   role:'uatco',   team:'qa',    base:33.6, st:8.3, ai:[.11,['Copilot in Outlook']]},
  {id:'robert',n:'Robert Nguyen',  role:'uwa',     team:'uw',    base:34.2, st:8.1, ai:[.09,['Copilot in Outlook']]},
  {id:'emily', n:'Emily Carter',   role:'uwa',     team:'uw',    base:33.6, st:8.5, ai:[.13,['Internal GPT']]},
  {id:'ines',  n:'Ines Alvarez',   role:'uwa',     team:'uw',    base:32.8, st:8.0, ai:[0,[]]},
  {id:'jamal', n:'Jamal Price',    role:'pss',     team:'uw',    base:34.6, st:7.8, ai:[.05,['Copilot in Outlook']]},
  {id:'olivia',n:'Olivia Grant',   role:'pss',     team:'uw',    base:33.2, st:8.4, ai:[0,[]]},
  {id:'tom',   n:'Tom Becker',     role:'subman',  team:'uw',    base:34.0, st:8.7, ai:[.17,['Copilot in Excel']]},
];

/* automation plan: directions and suggestions. src = [team, category] pairs that the evidence is computed from */
const DIRS = [
  {id:'intake', n:'Claims intake', d:'FNOL, documents and medical bills'},
  {id:'report', n:'Reporting & reconciliation', d:'Packs, daily reports and status'},
  {id:'test',   n:'Testing', d:'Regression, test data and defects'},
  {id:'policy', n:'Policy servicing', d:'Endorsements, submissions and certificates'},
  {id:'fin',    n:'Finance', d:'Reconciliation, bordereaux and payables'},
];
const PLAN = [
  {id:'fnol', dir:'intake', t:'FNOL email → claim draft', src:[['intake','fnol'],['intake','covlook']], take:.48, eff:5, cx:'Medium', approver:'Intake lead', proc:'p1',
    what:'Reads each first-notice email and its attachments, finds the policy, checks coverage dates and fills a ClaimCenter claim as a draft.',
    build:['Read the email and attachments in Outlook','Look up the policy and coverage in Policy admin','Fill the claim draft in ClaimCenter','Flag anything uncertain for the specialist'],
    first:['Pick one line of business (auto physical damage)','Run in shadow mode for one week next to the team','Compare drafts with what specialists submitted'],
    human:['Submitting the claim','Coverage questions with judgement','Anything the agent flags as uncertain']},
  {id:'docs', dir:'intake', t:'Attachment matching & indexing', src:[['intake','docmatch']], take:.55, eff:4, cx:'Low', approver:'Intake lead', proc:'p1',
    what:'Matches incoming documents to the right claim, names and indexes them, and builds one short list of the files it could not match.',
    build:['Watch the document portal inbox','Match by claim number, policy, claimant token and date','Rename and index to the claim','Send unmatched files to one review list'],
    first:['Start with medical records for workers’ comp','Measure the unmatched rate daily','Widen to all document types'],
    human:['Unmatched and ambiguous files','Anything involving a dispute']},
  {id:'medbill', dir:'intake', t:'Medical bill pre-check', src:[['intake','fee'],['intake','medentry'],['intake','medintake']], take:.40, eff:6, cx:'High', approver:'Medical bill lead', proc:'p5',
    what:'Checks every bill line against the state fee schedule, flags duplicates and posts reviewed amounts to ClaimCenter as drafts.',
    build:['Read bill lines from the bill review portal','Compare to the fee schedule and prior bills','Draft the reviewed amounts in ClaimCenter','Flag overrides for the coordinator'],
    first:['One state’s fee schedule first','Shadow-run against two weeks of bills','Agree override rules with the coordinators'],
    human:['Overrides and medical necessity','Provider disputes','Payment approval']},
  {id:'pack', dir:'report', t:'Monthly ops & loss-ratio pack, assembled', src:[['strat','opspack'],['fin','lrpack'],['strat','comment']], take:.45, eff:6, cx:'Medium', approver:'Operations reporting lead', proc:'p2',
    what:'Pulls the same tables from Power BI and the GL extract every month, reconciles them, and assembles the pack and a first commentary draft.',
    build:['Extract claims and premium tables','Reconcile paid losses to the GL extract','Build pack tables and charts','Draft commentary on variances'],
    first:['Rebuild last month’s pack in parallel','Compare line by line with the published pack','Switch one section at a time'],
    human:['Finance sign-off on figures','Commentary judgement','SVP review']},
  {id:'dailyrep', dir:'report', t:'Daily intake report', src:[['intake','dailyrep']], take:.62, eff:2, cx:'Low', approver:'Intake lead', proc:null,
    what:'Counts new claims by line and channel from ClaimCenter and sends the daily report before the morning huddle.',
    build:['Read yesterday’s new claims','Count by line, channel and status','Publish the report and email it'],
    first:['Run next to the manual report for a week','Retire the manual count'],
    human:['Commentary on unusual days']},
  {id:'status', dir:'report', t:'Initiative & program status digest', src:[['strat','tracking'],['strat','status']], take:.42, eff:3, cx:'Low', approver:'Program manager', proc:null,
    what:'Reads owners’ status emails and Jira, updates the tracker and drafts the weekly status, flagging what is late.',
    build:['Collect status from email and Jira','Update the tracker','Draft the weekly status and the late list'],
    first:['Start with the ten largest initiatives','Owners confirm the draft for two weeks'],
    human:['RAG ratings','Escalations']},
  {id:'regress', dir:'test', t:'Regression pack runner with evidence', src:[['qa','regress']], take:.52, eff:6, cx:'High', approver:'QA lead', proc:'p3',
    what:'Runs the scripted regression scenarios in a test environment, captures evidence screenshots and marks pass/fail in the test manager.',
    build:['Read scenarios from the test manager','Execute in the test environment','Capture evidence per step','Mark results; send failures to an analyst'],
    first:['Start with the payments pack (64 scenarios)','Run alongside one manual cycle','Analysts review every failure'],
    human:['Failure analysis','Release go/no-go']},
  {id:'testdata', dir:'test', t:'Test data factory', src:[['qa','testdata']], take:.58, eff:4, cx:'Medium', approver:'QA lead', proc:'p3',
    what:'Creates test policies and claims with the coverages a scenario needs, on request, in the test environment only.',
    build:['Read the scenario’s data needs','Create the policy in Policy admin (test)','Create the claim in ClaimCenter (test)','Return IDs to the tester'],
    first:['Ten most-used scenarios first','Testers request data in plain English'],
    human:['Unusual scenarios','Environment refreshes']},
  {id:'defects', dir:'test', t:'Defect write-ups from failed steps', src:[['qa','defects']], take:.40, eff:2, cx:'Low', approver:'QA lead', proc:'p3',
    what:'Drafts the Jira defect from a failed step: steps to reproduce, expected vs actual, evidence and environment.',
    build:['Read the failed step and evidence','Draft the Jira defect','Link it to the test case'],
    first:['Use on the next release','Analysts edit and submit'],
    human:['Severity and priority','Triage decisions']},
  {id:'endorse', dir:'policy', t:'Endorsement request → change draft', src:[['uw','endorse']], take:.48, eff:5, cx:'Medium', approver:'Policy service lead', proc:'p4',
    what:'Reads endorsement requests from agents, keys the change into Policy admin as a draft and routes rating-impact changes to an underwriter.',
    build:['Read the agent’s email','Find the policy','Key the change as a draft','Route rating-impact changes to an underwriter'],
    first:['Address and vehicle changes first','Shadow-run for two weeks'],
    human:['Underwriting approval','Issuing the endorsement']},
  {id:'subm', dir:'policy', t:'Broker submission intake', src:[['uw','subintake'],['uw','lossrun']], take:.45, eff:5, cx:'Medium', approver:'Underwriting manager', proc:null,
    what:'Reads ACORD forms and loss runs from broker emails, sets up the submission in Policy admin and drafts the loss-run summary.',
    build:['Read ACORD forms and attachments','Run the clearance check','Set up the submission draft','Summarize the loss runs'],
    first:['One line of business','Assistants check every draft for two weeks'],
    human:['Appetite and premium decisions','Declinations']},
  {id:'coi', dir:'policy', t:'Certificates of insurance', src:[['uw','coi']], take:.58, eff:2, cx:'Low', approver:'Policy service lead', proc:null,
    what:'Issues standard certificates from agent requests; non-standard wording goes to a specialist.',
    build:['Read the request','Check holder and wording against the standard list','Issue the certificate draft'],
    first:['Standard holders only','Specialists approve for one week'],
    human:['Non-standard wording','Additional insured endorsements']},
  {id:'recon', dir:'fin', t:'Payment ↔ bank reconciliation', src:[['fin','payrecon']], take:.52, eff:5, cx:'Medium', approver:'Controller', proc:'p5',
    what:'Matches ClaimCenter payments to the bank file, clears exact and near matches and builds an exceptions list with the context.',
    build:['Load the bank file and payment register','Match exact and near items','List exceptions with claim context','Draft adjusting entries for review'],
    first:['One bank account first','Run in parallel through one month-end'],
    human:['Posting entries','Write-offs and disputes']},
  {id:'bdx', dir:'fin', t:'Reinsurance bordereaux build', src:[['fin','bdx']], take:.58, eff:3, cx:'Medium', approver:'Reinsurance lead', proc:null,
    what:'Builds the bordereaux from claim extracts with the same mapping the macro uses — documented, so it no longer depends on one person.',
    build:['Extract claims for the period','Map to the treaty layout','Check totals against the GL','Prepare the file for review'],
    first:['Document the macro’s steps from the recordings','Rebuild last quarter’s file and compare'],
    human:['Treaty interpretation','Sending to the broker']},
  {id:'invoice', dir:'fin', t:'Invoice capture from PDFs', src:[['fin','invoice']], take:.58, eff:3, cx:'Low', approver:'AP lead', proc:null,
    what:'Reads PDF invoices, proposes GL coding and PO matches, and prepares the batch for approval.',
    build:['Read invoice PDFs','Match to purchase orders','Propose GL coding','Prepare the batch'],
    first:['Top 20 vendors first','AP approves every batch'],
    human:['Approval','Vendor bank-detail changes']},
];

/* process maps. per-step: min = hands-on minutes per run, wait = hours waiting before the step, ai: agent | assist | human */
const PROCS = [
  {id:'p1', n:'FNOL to claim set-up', team:'intake', runs:221, unit:'week', people:6, d:'From the first-notice email to an assigned claim with its documents indexed.', steps:[
    {s:'Read the first-notice email and attachments', who:'Intake specialist', app:'Outlook', min:4, wait:0, ai:'agent'},
    {s:'Find the policy and verify coverage dates', who:'Intake specialist', app:'Policy admin', min:5, wait:0, ai:'assist'},
    {s:'Create the claim and re-key loss details', who:'Intake specialist', app:'ClaimCenter', min:7, wait:0, ai:'agent'},
    {s:'Match and index the attachments', who:'Intake specialist', app:'Document portal', min:6, wait:1.5, ai:'agent'},
    {s:'Triage and assign an adjuster', who:'Intake lead', app:'ClaimCenter', min:2, wait:3.8, ai:'human'},
    {s:'Acknowledge to the claimant', who:'Intake specialist', app:'Outlook', min:2, wait:0, ai:'assist'}]},
  {id:'p2', n:'Monthly loss-ratio pack', team:'strat', runs:1, unit:'month', people:5, d:'From the GL extract to the SVP-reviewed operating pack, once a month.', steps:[
    {s:'Extract claims and premium tables', who:'Data analyst', app:'Power BI', min:90, wait:0, ai:'agent'},
    {s:'Reconcile paid losses to the GL', who:'FP&A analyst', app:'Excel', min:150, wait:6, ai:'assist'},
    {s:'Finance sign-off on the figures', who:'FP&A analyst', app:'Outlook', min:20, wait:31, ai:'human'},
    {s:'Build pack tables and charts', who:'Operations reporting lead', app:'Excel', min:240, wait:0, ai:'agent'},
    {s:'Write the variance commentary', who:'Operations reporting lead', app:'Word', min:120, wait:0, ai:'assist'},
    {s:'SVP review and sign-off', who:'SVP Strategic operations', app:'Teams', min:45, wait:29, ai:'human'}]},
  {id:'p3', n:'Claims-system regression cycle', team:'qa', runs:1, unit:'release', people:5, d:'From release notes to UAT sign-off for a ClaimCenter release.', steps:[
    {s:'Pick the regression scope from release notes', who:'QA analyst', app:'Jira', min:45, wait:0, ai:'assist'},
    {s:'Create test policies and claims', who:'QA analyst', app:'ClaimCenter', min:180, wait:0, ai:'agent'},
    {s:'Execute 64 scripted scenarios', who:'QA analyst', app:'ClaimCenter', min:720, wait:0, ai:'agent'},
    {s:'Capture evidence screenshots', who:'QA analyst', app:'Test manager', min:160, wait:0, ai:'agent'},
    {s:'Log defects with evidence', who:'QA analyst', app:'Jira', min:120, wait:21, ai:'assist'},
    {s:'UAT sign-off', who:'UAT coordinator', app:'Outlook', min:60, wait:27, ai:'human'}]},
  {id:'p4', n:'Endorsement request to issued change', team:'uw', runs:96, unit:'week', people:2, d:'From an agent’s email to an issued endorsement and confirmation.', steps:[
    {s:'Read the agent’s request', who:'Policy service specialist', app:'Outlook', min:3, wait:0, ai:'agent'},
    {s:'Find the policy and current terms', who:'Policy service specialist', app:'Policy admin', min:3, wait:0, ai:'agent'},
    {s:'Key the change', who:'Policy service specialist', app:'Policy admin', min:8, wait:0, ai:'agent'},
    {s:'Underwriter approval (rating impact only)', who:'Underwriter', app:'Policy admin', min:4, wait:6, ai:'human'},
    {s:'Issue the endorsement and certificate', who:'Policy service specialist', app:'Policy admin', min:4, wait:0, ai:'assist'},
    {s:'Confirm to the agent', who:'Policy service specialist', app:'Outlook', min:2, wait:0, ai:'assist'}]},
  {id:'p5', n:'Medical bill to payment', team:'intake', runs:96, unit:'week', people:4, d:'Workers’ comp medical bill from receipt to a reconciled payment.', steps:[
    {s:'Receive the bill and records', who:'Medical bill coordinator', app:'Bill review portal', min:4, wait:0, ai:'agent'},
    {s:'Check lines against the fee schedule', who:'Medical bill coordinator', app:'Bill review portal', min:7, wait:0, ai:'assist'},
    {s:'Adjuster approval', who:'Adjuster', app:'ClaimCenter', min:2, wait:10, ai:'human'},
    {s:'Re-key amounts into the payment batch', who:'Claims payments accountant', app:'ClaimCenter', min:3, wait:4, ai:'agent'},
    {s:'Reconcile to the bank file', who:'Claims payments accountant', app:'Excel', min:2, wait:24, ai:'agent'},
    {s:'Follow up exceptions', who:'Claims payments accountant', app:'Outlook', min:3, wait:0, ai:'human'}]},
];

/* ---------- deterministic model over data.js ---------- */
function hash(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function R(key){ let a=hash(key); return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function lr(weights,total){ const s=weights.reduce((a,b)=>a+b,0)||1; const raw=weights.map(w=>w/s*total); const fl=raw.map(Math.floor);
  let rem=total-fl.reduce((a,b)=>a+b,0); const ord=raw.map((r,i)=>[r-fl[i],i]).sort((a,b)=>b[0]-a[0]||a[1]-b[1]); for(let k=0;k<rem;k++) fl[ord[k%ord.length][1]]++; return fl; }
const TEAM = Object.fromEntries(TEAMS.map(t=>[t.id,t]));
const PERSON = Object.fromEntries(PEOPLE.map(p=>[p.id,p]));
const PROC = Object.fromEntries(PROCS.map(p=>[p.id,p]));
const SUG = Object.fromEntries(PLAN.map(s=>[s.id,s]));
const DIR = Object.fromEntries(DIRS.map(d=>[d.id,d]));
TEAMS.forEach(t=>{ t.members=PEOPLE.filter(p=>p.team===t.id); });
PEOPLE.forEach(p=>{ const t=TEAM[p.team]; p.idx=t.members.indexOf(p)+1; p.code=t.letter+p.idx; p.pseudo=ROLES[p.role].noun+' '+p.code; p.ini=p.n.split(' ').map(x=>x[0]).join(''); });
const AI_WEEK=[.86,1,1.12];

const _pw={};
function personWeek(pid,wi){
  if(wi===-1)return aggregatePerson(pid);
  const k=pid+'|'+wi; if(_pw[k]) return _pw[k];
  const p=PERSON[pid], role=ROLES[p.role], team=TEAM[p.team], r=R(k);
  const total=Math.round(p.base*10*team.wf[wi]*(0.965+r()*0.07));
  const w=role.cats.map(c=>c.sh*(team.boost[wi][c.type]||1)*(0.9+R(k+c.id)()*0.2));
  const dh=lr(w,total);
  const apps={};
  const cats=role.cats.map((c,i)=>{
    const min=dh[i]*6;
    const an=Object.keys(c.apps), ad=lr(an.map(a=>c.apps[a]),dh[i]); an.forEach((a,j)=>apps[a]=(apps[a]||0)+ad[j]);
    const td=lr(c.tasks.map(t=>t[2]),dh[i]);
    return { id:c.id, n:c.n, type:c.type, ai:c.ai, dh:dh[i], min, eps:Math.max(1,Math.round(min/c.avg)), aiDh:dh[i]*c.ai,
      tasks:c.tasks.map((t,j)=>({t:t[0],app:t[1],min:td[j]*6,draft:!!t[3]})).filter(t=>t.min>0), apps:an };
  });
  const sw=+(role.sw*(0.92+R(pid+'sw')()*0.16)*Math.pow(team.wf[wi],1.6)).toFixed(1);
  const frag=Math.min(.6,role.frag*(0.9+R(pid+'fr')()*0.2)*Math.pow(team.wf[wi],2));
  const aiShare=p.ai[0]*AI_WEEK[wi];
  const tl=timeline(p,wi,cats,total);
  const o={ p, wi, dh:total, min:total*6, cats, apps, eps:cats.reduce((a,c)=>a+c.eps,0), aiDh:cats.reduce((a,c)=>a+c.aiDh,0),
    sw, frag, aiShare, aiAssistDh:Math.round(total*aiShare), tools:p.ai[1], ...tl };
  return _pw[k]=o;
}
function timeline(p,wi,cats,total){
  const r=R(p.id+'tl'+wi);
  const dayDh=lr([1.03,1,1.05,1.01,.93].map(x=>x*(0.92+r()*0.16)),total);
  let blocks=[];
  cats.forEach(c=>{ let left=c.min; while(left>0){ let sz=(3+Math.floor(r()*12))*6; if(left-sz<18) sz=left; blocks.push({cat:c.id,min:sz}); left-=sz; } });
  for(let i=blocks.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [blocks[i],blocks[j]]=[blocks[j],blocks[i]]; }
  const days=[]; let after=0, longest=0;
  const late = TEAM[p.team].wf[wi]>1.06 ? 1 : 0;
  dayDh.forEach((ddh,d)=>{
    let need=ddh*6; const list=[];
    while(need>0 && blocks.length){ const b=blocks.shift(); if(b.min<=need){ list.push(b); need-=b.min; } else { list.push({cat:b.cat,min:need}); blocks.unshift({cat:b.cat,min:b.min-need}); need=0; } }
    let t=Math.round(p.st*60 + (r()*30-12) - (late? 20:0)); let worked=0, lunch=false; const out=[];
    list.forEach(b=>{
      const last=out[out.length-1];
      if(last && last.cat===b.cat && last.e===t){ last.e+=b.min; } else out.push({cat:b.cat,s:t,e:t+b.min});
      t+=b.min; worked+=b.min;
      if(!lunch && worked>=230){ t+=30+Math.floor(r()*4)*6; lunch=true; } else t+=Math.floor(r()*3)*6;
    });
    // evening log-ins: on heavy weeks people come back after dinner
    const evening = late ? r()<0.55 : r()<0.12;
    if(evening && out.length>2){ const lb=out[out.length-1]; const mv=Math.min(lb.e-lb.s-6, (5+Math.floor(r()*6))*6);
      if(mv>=24){ lb.e-=mv; const s=19*60+6*Math.floor(r()*5); out.push({cat:lb.cat,s,e:s+mv}); } }
    out.forEach(b=>{ after+=Math.max(0,450-b.s)-Math.max(0,450-b.e)+Math.max(0,b.e-1080)-Math.max(0,b.s-1080); longest=Math.max(longest,b.e-b.s); });
    days.push({d:DAYS[d],min:ddh*6,blocks:out,start:out.length?out[0].s:0,end:out.length?out[out.length-1].e:0});
  });
  return { days, afterMin:after, longest };
}
function teamWeek(tid,wi){
  const t=TEAM[tid]; const ppl=t.members.map(p=>personWeek(p.id,wi));
  const cats={}, apps={}, types={};
  ppl.forEach(pw=>{ pw.cats.forEach(c=>{ const x=cats[c.id]||(cats[c.id]={id:c.id,n:c.n,type:c.type,dh:0,aiDh:0,eps:0,people:0,tasks:{}});
      x.dh+=c.dh; x.aiDh+=c.aiDh; x.eps+=c.eps; if(c.dh>0) x.people++; c.tasks.forEach(tk=>{ x.tasks[tk.t]=(x.tasks[tk.t]||0)+tk.min; });
      types[c.type]=(types[c.type]||0)+c.dh; });
    Object.entries(pw.apps).forEach(([a,v])=>apps[a]=(apps[a]||0)+v); });
  const dh=ppl.reduce((a,x)=>a+x.dh,0);
  const wavg=f=>ppl.reduce((a,x)=>a+f(x)*x.dh,0)/dh;
  return { t, wi, ppl, dh, cats:Object.values(cats).sort((a,b)=>b.dh-a.dh), apps, types,
    eps:ppl.reduce((a,x)=>a+x.eps,0), aiDh:ppl.reduce((a,x)=>a+x.aiDh,0), sw:wavg(x=>x.sw), frag:wavg(x=>x.frag),
    afterMin:ppl.reduce((a,x)=>a+x.afterMin,0), adopters:ppl.filter(x=>x.aiShare>0).length, aiAssistDh:ppl.reduce((a,x)=>a+x.aiAssistDh,0),
    longestMed:median(ppl.map(x=>x.longest)) };
}
function companyWeek(wi){
  const tw=TEAMS.map(t=>teamWeek(t.id,wi)); const types={}, apps={};
  tw.forEach(x=>{ Object.entries(x.types).forEach(([k,v])=>types[k]=(types[k]||0)+v); Object.entries(x.apps).forEach(([k,v])=>apps[k]=(apps[k]||0)+v); });
  const dh=tw.reduce((a,x)=>a+x.dh,0);
  return { tw, wi, dh, types, apps, people:PEOPLE.length, eps:tw.reduce((a,x)=>a+x.eps,0), aiDh:tw.reduce((a,x)=>a+x.aiDh,0),
    afterMin:tw.reduce((a,x)=>a+x.afterMin,0), adopters:tw.reduce((a,x)=>a+x.adopters,0), aiAssistDh:tw.reduce((a,x)=>a+x.aiAssistDh,0),
    sw:tw.reduce((a,x)=>a+x.sw*x.dh,0)/dh, frag:tw.reduce((a,x)=>a+x.frag*x.dh,0)/dh };
}
function median(a){ const s=[...a].sort((x,y)=>x-y); const m=s.length>>1; return s.length%2?s[m]:(s[m-1]+s[m])/2; }
function dupHours(tid,wi,d){ const tw=teamWeek(tid,wi); let dh=0, ppl=new Set();
  tw.ppl.forEach(pw=>pw.cats.forEach(c=>{ if(d.cats.includes(c.id)){ dh+=c.dh; if(c.dh) ppl.add(pw.p.id); } })); return { h:dh*d.pct/10/(wi<0?3:1), people:ppl.size }; }

/* plan evidence (3-week average) */
const _ev={};
function evidence(sid){
  const ek=sid+'|'+S.wi;if(_ev[ek]) return _ev[ek];
  const s=SUG[sid]; let dh=0, eps=0; const ppl=new Set(), apps=new Set(), teams=new Set();
  (S.wi<0?[0,1,2]:[S.wi]).forEach(wi=>s.src.forEach(([tid,cid])=>{ teams.add(tid); TEAM[tid].members.forEach(p=>{ const pw=personWeek(p.id,wi); pw.cats.forEach(c=>{ if(c.id===cid && c.dh){ dh+=c.dh; eps+=c.eps; ppl.add(p.id); c.apps.forEach(a=>apps.add(a)); } }); }); }));
  const obs=dh/(S.wi<0?3:1)/10; const back=Math.round(obs*s.take*10)/10;
  return _ev[ek]={ obs:Math.round(obs*10)/10, back, eps, people:[...ppl], apps:[...apps], teams:[...teams] };
}
const WEEKS_PER_MONTH=4.33;
function dirRoi(did,cost){
  const items=PLAN.filter(s=>s.dir===did); const ppl=new Set(); let back=0, eff=0;
  items.forEach(s=>{ const e=evidence(s.id); back+=e.back; eff+=s.eff; e.people.forEach(x=>ppl.add(x)); });
  back=Math.round(back*10)/10;
  return { items, back, people:ppl.size, eff, month:back*WEEKS_PER_MONTH*cost, payback:eff*40/back };
}
function sugRoi(sid,cost){ const e=evidence(sid), s=SUG[sid]; return { ...e, month:e.back*WEEKS_PER_MONTH*cost, payback:s.eff*40/e.back }; }
function procStats(pr){ const hands=pr.steps.reduce((a,s)=>a+s.min,0), wait=pr.steps.reduce((a,s)=>a+s.wait,0);
  const agentMin=pr.steps.filter(s=>s.ai==='agent').reduce((a,s)=>a+s.min,0), assistMin=pr.steps.filter(s=>s.ai==='assist').reduce((a,s)=>a+s.min,0);
  return { hands, wait, agentMin, assistMin, perUnitH:hands*pr.runs/60, apps:[...new Set(pr.steps.map(s=>s.app))], roles:[...new Set(pr.steps.map(s=>s.who))] }; }

/* ---------- state & helpers ---------- */
const S = { view:'home', person:'rachel', team:'fin', wi:-1, anon:true, cost:55, proc:'p2', tab:'plan', sel:null, inPlan:new Set(), msgs:[] };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nm = p => S.anon ? p.pseudo : p.n;
const first = p => S.anon ? p.pseudo : p.n.split(' ')[0];
const PAST = [['#f3dfd8','#8c4b38'],['#dbeedf','#2f6b43'],['#f1dcea','#874a72'],['#dfe4f6','#3b4c8e'],['#e9e3d4','#6a5a31'],['#dcecf3','#2c6680']];
function av(p, cls=''){ if(S.anon) return `<span class="av anon ${cls}" aria-hidden="true">${p.code}</span>`;
  const c=PAST[hash(p.id)%PAST.length]; return `<span class="av ${cls}" style="background:${c[0]};color:${c[1]}" aria-hidden="true">${p.ini}</span>`; }
const H = dh => (dh/10).toFixed(1)+' h';
const Hn = dh => (dh/10).toFixed(1);
const hm = min => { min=Math.round(min); const h=Math.floor(min/60), m=min%60; return h ? `${h}h ${String(m).padStart(2,'0')}m` : `${m}m`; };
const pct = (a,b,d=0) => b ? (a/b*100).toFixed(d)+'%' : '0%';
const money = x => '$'+Math.round(x).toLocaleString('en-US');
const kmoney = x => x>=1e6 ? '$'+(x/1e6).toFixed(2)+'M' : x>=10000 ? '$'+(x/1000).toFixed(x>=100000?0:1)+'k' : money(x);
const r5 = x => Math.max(5, Math.round(x/5)*5);
const delta = (a,b) => { if(!b) return ''; const d=(a-b)/b*100; const s=(d>=0?'+':'')+d.toFixed(1)+'%'; return `<span class="${d>2?'up':d<-2?'down':''}">${s}</span>`; };
const wk = () => WEEKS[S.wi];
const teamName = id => TEAM[id] ? TEAM[id].name : EXT[id];
const P = {
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  flow:'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a2 2 0 0 1 2 2v7"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  right:'<path d="m9 18 6-6-6-6"/>', down:'<path d="m6 9 6 6 6-6"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
  up:'<path d="m5 12 7-7 7 7M12 19V5"/>', file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7"/><circle cx="12" cy="12" r="3"/>',
  map:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>', check:'<path d="M20 6 9 17l-5-5"/>', clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
};
const ic = (n, s=16, w=1.75) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
const tiles = (arr, cls='') => `<div class="tiles ${cls}">${arr.map(t=>`<div class="tile ${t.hl?'hl':''}"><span class="l">${t.l}</span><b>${t.v}</b>${t.s?`<span class="s">${t.s}</span>`:''}</div>`).join('')}</div>`;
const secH = (k, t, p='', r='') => `<div class="sec-h"><span class="k">${k}</span><h2>${t}</h2>${r?`<span class="r">${r}</span>`:''}${p?`<p>${p}</p>`:''}</div>`;
function bar(n, sub, total, ai, max, v, vs=''){ const w=max?total/max*100:0, a=total?ai/total:0;
  return `<div class="bar"><div class="n">${n}${sub?`<small>${sub}</small>`:''}</div><div class="track" style="width:${Math.max(2,w)}%"><i style="width:${(1-a)*100}%"></i><i class="ai" style="width:${a*100}%"></i></div><div class="v">${v}${vs?`<small>${vs}</small>`:''}</div></div>`; }
function bar1(n, sub, val, max, v){ return `<div class="bar"><div class="n">${n}${sub?`<small>${sub}</small>`:''}</div><div class="track" style="width:${Math.max(2,val/max*100)}%"><i class="l2" style="width:100%"></i></div><div class="v">${v}</div></div>`; }
const TCOL = {entry:'#2f4a9e', docs:'#5a72c2', report:'#8fa2dc', lookup:'#c3cfef', comms:'#9097a8', review:'#b9bdc9', test:'#6f7d9f', meet:'#dcdfe6'};
const legend = `<div class="legend"><span><i></i>Stays with people</span><span><i class="ai"></i>AI could take or draft</span></div>`;

/* ---------- shell ---------- */
const VIEWS = [['cases','Process deep-dives','map'],['person','Personal reports','user'],['cases','Departments','building'],['team','Team reports','users'],['company','Company report','building'],['plan','Processes & automation','flow'],['ask','Ask Silow','chat']];
function shell(){
  $('#nav').innerHTML = VIEWS.map(([v,l,i])=>`<button class="nav" ${l==='Departments'?'data-href="#departments"':'data-v="'+v+'"'}>${ic(i)}<span>${l}</span>${v==='person'?`<span class="cnt">${PEOPLE.length}</span>`:v==='team'?`<span class="cnt">${TEAMS.length}</span>`:''}</button>`).join('')
    + CX.nav().map(g=>`<div class="sh">${g.t}</div>` + g.items.map(c=>`<button class="nav sub" data-case="${c.id}"><span class="sw"></span><span>${c.short}</span><span class="cnt">${c.n}</span></button>`).join('')).join('')
    + `<div class="sh">Departments</div>`+[ ["claims","Claims"],["finance","Finance"],["operations","Operations"],["underwriting","Underwriting"],["leadership","Leadership"] ].map(([id,n])=>`<button class="nav sub" data-href="#department/${id}"><span class="sw"></span><span>${n}</span></button>`).join('')+ `<div class="sh">Teams</div>` + TEAMS.map(t=>`<button class="nav sub" data-team="${t.id}"><span class="sw"></span><span>${t.name}</span><span class="cnt">${t.members.length}</span></button>`).join('');
  $('#mnav').innerHTML = VIEWS.map(([v,l,i])=>`<button ${l==='Departments'?'data-href="#departments"':'data-v="'+v+'"'}>${ic(i,20)}<span>${l.replace(' reports','').replace('Company report','Company').replace('Processes & automation','Automation').replace('Ask Silow','Ask').replace('Process deep-dives','Processes')}</span></button>`).join('');
  $('#wk').innerHTML = WEEKS.map((w,i)=>`<button data-wi="${i}"><span class="wl-long">${w.label}</span></button>`).join('');
  document.addEventListener('click', e=>{
    const cs=e.target.closest('[data-case]'); if(cs){ location.hash='#case/'+cs.dataset.case; return; }
    const department=e.target.closest('[data-href="#departments"],[data-href^="#department/"],a[href="#departments"],a[href^="#department/"]'); if(department && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey){ e.preventDefault(); openDepartment(department.dataset.href||department.getAttribute('href')); return; }
    const hr=e.target.closest('[data-href]'); if(hr){ closeSug(); location.hash=hr.dataset.href; return; }
    const dc=e.target.closest('[data-doc]'); if(dc){ CX.openDoc(dc.dataset.doc); return; }
    const tm=e.target.closest('[data-tabmaps]'); if(tm){ S.tab='maps'; closeSug(); go('plan'); return; }
    const pk=e.target.closest('[data-pweek]'); if(pk){ const [pp,wi,k]=pk.dataset.pweek.split(':'); S.person=pp; S.wi=+wi; closeSug(); go('person'); if(k) setTimeout(()=>CX.openCat(k),30); return; }
    const n=e.target.closest('[data-v]'); if(n && !n.closest('.pop')){ go(n.dataset.v); return; }
    const t=e.target.closest('[data-team]'); if(t){ S.team=t.dataset.team; go('team'); return; }
    const w=e.target.closest('[data-wi]'); if(w){ S.wi=+w.dataset.wi; render(); return; }
    const pp=e.target.closest('[data-person]'); if(pp){ S.person=pp.dataset.person; closePop(); go('person'); return; }
    const sg=e.target.closest('[data-sug]'); if(sg){ openSug(sg.dataset.sug); return; }
    const pr=e.target.closest('[data-proc]'); if(pr){ S.proc=pr.dataset.proc; S.tab='maps'; closeSug(); go('plan'); return; }
    const ct=e.target.closest('.cat > button'); if(ct){ ct.parentElement.classList.toggle('open'); return; }
    if(e.target.closest('#anon')){ S.anon=!S.anon; render(); return; }
    if(!e.target.closest('.picker')) closePop();
  });
}
function openDepartment(hash){
  closeSug(); closePop();
  if(location.hash!==hash) history.pushState(null,'',location.pathname+location.search+hash);
  fromHash(); render();
  const sb=$('#sbody'); if(sb){ const behavior=sb.style.scrollBehavior; sb.style.scrollBehavior='auto'; sb.scrollTop=0; sb.style.scrollBehavior=behavior; }
}
function go(v){ if(v==='cases') S.ch='cases';if(v==='people'){S.profile=null;S.unit=null;} S.view=v; if(v!=='plan') closeSug(); render(); const sb=$('#sbody'); if(sb) sb.scrollTop=0; syncHash(); }
function syncHash(){ if(S.view==='cases'){ const hc='#'+(S.ch||'cases'); if(location.hash!==hc) history.replaceState(null,'',location.pathname+location.search+hc); return; }
  const h = S.view==='people'?(S.unit?'#unit/'+encodeURIComponent(S.unit):S.profile?'#profile/'+S.profile:'#people'):S.view==='person'?`#person/${S.person}`:S.view==='team'?`#team/${S.team}`:S.view==='plan'?(S.tab==='maps'?(S.showOverview?`#process/${S.proc}`:'#maps'):'#plan'):'#'+S.view;
  if(location.hash!==h) history.replaceState(null,'',location.pathname+location.search+h); }
function fromHash(){ const raw=decodeURIComponent(location.hash.slice(1));
  if(raw==='home'||!raw){S.view='home';return;}
  if(raw==='people'||raw.startsWith('profile/')){S.view='people';S.profile=raw.split('/')[1]||null;return;}
  if(raw==='cases'||raw.startsWith('case/')||raw==='departments'||raw.startsWith('department/')){ S.view='cases'; S.ch=raw||'cases'; closeSug(); return; }
  const [v,id]=location.hash.replace('#','').split('/');
  if(v==='person' && PERSON[id]){ S.view='person'; S.person=id; } else if(v==='team' && TEAM[id]){ S.view='team'; S.team=id; }
  else if(v==='process' && PROC[id]){ S.view='plan'; S.tab='maps'; S.proc=id; } else if(v==='plan'){ S.view='plan'; S.tab='plan'; if(SUG[id]) S.sel=id; }
  else if(['company','ask'].includes(v)) S.view=v; }

function render(){
  $$('.nav[data-v], #mnav [data-v]').forEach(b=>b.classList.toggle('on', b.dataset.v===(S.view==='cases'&&CX.isHarbor()?'plan':S.view)));
  const departmentPage=S.view==='cases' && /^(departments|department\/)/.test(S.ch||'');
  const departmentName={claims:'Claims',finance:'Finance',operations:'Operations',underwriting:'Underwriting',leadership:'Leadership'}[(S.ch||'').split('/')[1]]||'';
  $$('.nav[data-v="cases"], #mnav [data-v="cases"]').forEach(b=>b.classList.toggle('on', S.view==='cases'&&!departmentPage&&!CX.isHarbor()));
  $$('.nav[data-href^="#depart"], #mnav [data-href="#departments"]').forEach(b=>{ const selected=departmentPage&&(b.dataset.href==='#departments'||b.dataset.href==='#'+S.ch); b.classList.toggle('on',selected); if(selected)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current'); });
  $$('.nav[data-team]').forEach(b=>b.classList.toggle('on', S.view==='team' && b.dataset.team===S.team));
  $$('.nav[data-case]').forEach(b=>b.classList.toggle('on', S.view==='cases' && (S.ch||'').split('/')[1]===b.dataset.case));
  $$('#wk [data-wi]').forEach(b=>b.classList.toggle('on', +b.dataset.wi===S.wi));
  $('#wkwrap').style.display=['home','ask'].includes(S.view)?'none':'';
  $('#avg').style.display='none';
  $('#anon').classList.toggle('on', S.anon);
  $('#anon b').textContent = S.anon ? 'Anonymous' : 'Named';
  $$('.view').forEach(v=>v.classList.toggle('on', v.id==='v-'+S.view));
  const crumbs = { home:['Home',''], people:['Personal',S.profile?'Process evidence':'All employees'], cases:S.view==='cases'?(departmentPage?['Departments',departmentName]:CX.crumbs()):['Process deep-dives',''], person:['Personal reports', S.view==='person'?nm(PERSON[S.person]):''], team:['Team reports', TEAM[S.team].name], company:['Company report',''], plan:['Processes & automation', S.tab==='maps'?PROC[S.proc].n:'Automation plan'], ask:['Ask Silow',''] }[S.view];
  $('#crumb').innerHTML = `<span class="hide-m">Harbor Mutual</span><span class="hide-m">/</span>${crumbs[1]?`<span class="hide-m">${crumbs[0]}</span><span class="hide-m">/</span><b>${esc(crumbs[1])}</b>`:`<b>${crumbs[0]}</b>`}`;
  ({home:rHome,people:rPeople,cases:()=>CX.render(), person:rPerson, team:rTeam, company:rCompany, plan:rPlan, ask:rAsk})[S.view]();
  if(S.sel && S.view==='plan') openSug(S.sel, true);
  syncHash();
}

/* ---------- personal ---------- */
function picker(){
  const p=PERSON[S.person], r=ROLES[p.role];
  return `<div class="picker"><button class="pick-btn" id="pick">${av(p)}<span class="tx"><b>${esc(nm(p))}</b><small>${r.title} · ${TEAM[p.team].name}</small></span>${ic('down',14,2)}</button>
    <div class="pop" id="pop"><input id="pq" placeholder="${S.anon?'Search by role, code or team':'Search people, roles or teams'}" autocomplete="off"><div class="lst" id="plst"></div></div></div>`;
}
function fillPicker(q=''){
  q=q.trim().toLowerCase(); let html='';
  TEAMS.forEach(t=>{ const list=t.members.filter(p=>!q || [S.anon?'':p.n, p.pseudo, p.code, ROLES[p.role].title, t.name].join(' ').toLowerCase().includes(q));
    if(list.length) html+=`<div class="grp">${t.name}</div>`+list.map(p=>`<button class="it ${p.id===S.person?'on':''}" data-person="${p.id}">${av(p)}<span>${esc(nm(p))}</span><small>${H(personWeek(p.id,S.wi).dh)}</small></button>`).join(''); });
  $('#plst').innerHTML = html || `<div class="empty">No one matches “${esc(q)}”.${S.anon?' Names are hidden in anonymous mode — search by role or code.':''}</div>`;
}
function bindPicker(){
  $('#pick').onclick = e=>{ e.stopPropagation(); const pop=$('#pop'); const on=!pop.classList.contains('on'); pop.classList.toggle('on', on); if(on){ fillPicker(''); $('#pq').value=''; setTimeout(()=>$('#pq').focus(),30); } };
  $('#pq').oninput = e=>fillPicker(e.target.value);
  $('#pq').onkeydown = e=>{ if(e.key==='Enter'){ const f=$('#plst [data-person]'); if(f) f.click(); } if(e.key==='Escape') closePop(); };
}
function closePop(){ const p=$('#pop'); if(p) p.classList.remove('on'); }
function fill(tpl, pw){ return tpl.replace(/\{(eps|h):(\w+)\}/g,(_,k,c)=>{ const x=pw.cats.find(y=>y.id===c); if(!x) return '0'; return k==='eps'?x.eps:hm(x.min); }); }
function rPerson(){
  const p=PERSON[S.person], role=ROLES[p.role], t=TEAM[p.team], pw=personWeek(p.id,S.wi), prev=S.wi>=0?{dh:[0,1,2].reduce((a,i)=>a+personWeek(p.id,i).dh,0)/3}:null;
  const cats=[...pw.cats].sort((a,b)=>b.dh-a.dh); const col={}; cats.forEach((c,i)=>col[c.id]='c'+Math.min(i,5));
  const apps=Object.entries(pw.apps).sort((a,b)=>b[1]-a[1]);
  const dense=[...pw.days].sort((a,b)=>b.min-a.min)[0];
  const lb={len:0}; pw.days.forEach(d=>d.blocks.forEach(b=>{ if(b.e-b.s>lb.len){ lb.len=b.e-b.s; lb.cat=b.cat; lb.d=d.d; } }));
  const afterDays=pw.days.filter(d=>d.blocks.some(b=>b.e>1080||b.s<450)).map(d=>d.d);
  const recs=role.recs.map(r=>{ const c=pw.cats.find(x=>x.id===r.cat); return {...r, min:r5(c.min*r.pct/(S.wi<0?3:1)), cn:c.n}; }).sort((a,b)=>b.min-a.min);
  const recTot=recs.reduce((a,r)=>a+r.min,0);
  const know=role.know.map(k=>({k:k.k, ev:fill(k.ev,pw)}));
  TEAMS.forEach(tm=>tm.risks.forEach(r=>{ if(r.who===p.id) know.unshift({k:'Single point of knowledge', ev:r.t+'. '+r.ev, risk:1}); }));
  if(know.length<3){ const ap=Object.entries(pw.apps).sort((a,b)=>b[1]-a[1]); know.push({k:`${ap[0][0]} and ${ap[1][0]}`, ev:`${H(ap[0][1]+ap[1][1])} in the two main systems this week, across ${cats.length} work streams`}); }
  const top1=cats[0], top2=cats[1];
  const axis=[7,9,11,13,15,17,19].map(h=>`<span style="left:${(h-7)/13*100}%">${h}:00</span>`).join('');
  const tlRows=pw.days.map(d=>`<div class="tl-row"><span class="dl">${d.d}</span><div class="tl-track"><span class="off" style="left:0;width:${30/780*100}%"></span><span class="off" style="left:${660/780*100}%;right:0"></span>${d.blocks.map(b=>`<i class="${col[b.cat]}" style="left:${(b.s-420)/780*100}%;width:${(b.e-b.s)/780*100}%" title="${esc(pw.cats.find(c=>c.id===b.cat).n)} · ${hm(b.e-b.s)}"></i>`).join('')}</div><span class="dv">${hm(d.min)}</span></div>`).join('');
  const t3 = [
    {n:'01', t:`${top1.n} is the main stream`, d:`${hm(top1.min)} across ${top1.eps} tasks — ${pct(top1.dh,pw.dh)} of the week. About ${Math.round(top1.ai*100)}% of it is rule-based or draftable.`},
    {n:'02', t:`${apps[0][0]} is the workbench`, d:`${H(apps[0][1])} in ${apps[0][0]} (${pct(apps[0][1],pw.dh)}), then ${apps[1][0]} (${H(apps[1][1])}).`},
    pw.afterMin>45 ? {n:'03', t:`${hm(pw.afterMin)} outside working hours`, d:`On ${afterDays.join(', ')}. ${t.wf[S.wi]>1.05?'It follows the team’s heavier week.':'Mostly early starts and short evening log-ins.'}`}
                  : {n:'03', t:`${pw.sw.toFixed(0)} app switches an hour`, d:`${Math.round(pw.frag*100)}% of the time was in blocks under 15 minutes. The longest uninterrupted block was ${hm(lb.len)}.`},
  ];
  $('#v-person').innerHTML = `<div class="page">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">${picker()}<span class="sp" style="flex:1"></span><span class="pill">${ic('eye',13,2)}What ${esc(first(p))} sees in their own Silow · no scores</span></div>
    <h1 style="margin-top:20px">${esc(nm(p))}’s ${S.wi<0?'report':'week'}</h1>
    <div class="lede">${role.title} · ${t.name} · ${wk().label}. <b>${H(pw.dh)} recorded</b> over ${pw.days.length} days, ${pw.eps} tasks in ${apps.length} apps. Most of the week went to <b>${top1.n}</b> (${pct(top1.dh,pw.dh)}) and <b>${top2.n}</b> (${pct(top2.dh,pw.dh)}).</div>
    ${tiles([{l:'Recorded',v:Hn(pw.dh)+'<small>h</small>',s:prev?'vs full-period weekly average '+delta(pw.dh,prev.dh):'All observed weeks combined'},{l:'Tasks',v:pw.eps,s:`${cats.length} work streams`},{l:'Apps',v:apps.length,s:apps.slice(0,2).map(a=>a[0]).join(', ')},{l:'Days',v:pw.days.length,s:wk().label},{l:'AI could take',v:Hn(pw.aiDh)+'<small>h</small>',s:pct(pw.aiDh,pw.dh)+' of the week',hl:1}])}
    ${CX.personBlock(p.id,S.wi)}<div class="sec">${secH('01','Facts first')}
      ${tiles([{l:'Densest day',v:dense.d,s:hm(dense.min)+' recorded'},{l:'Longest uninterrupted block',v:hm(lb.len),s:pw.cats.find(c=>c.id===lb.cat).n+' · '+lb.d},{l:'Outside working hours',v:hm(pw.afterMin),s:afterDays.length?afterDays.join(', '):'none this week'},{l:'AI tools seen',v:pw.aiShare?pct(pw.aiShare,1):'None',s:pw.aiShare?pw.tools.join(', ')+' · share of sessions':'no AI tool in any session'}],'c4')}
    </div>
    <div class="sec">${secH('02',`The week, hour by hour`,'Each bar is one stretch of work on the screen. Shaded edges are outside 7:30–18:00.')}
      <div class="card"><div class="tl">${tlRows}</div><div class="tl-axis"><span></span><div>${axis}</div><span></span></div>
      <div class="legend">${cats.map(c=>`<span><i class="${col[c.id]}"></i>${c.n}</span>`).join('')}</div></div>
    </div>
    <div class="sec">${secH('03',`Where the ${Hn(pw.dh)} hours went`,'Grouped into work streams. Open a stream to see its tasks, apps and minutes.')}
      <div class="g2"><div class="card" style="padding:6px 16px">${cats.map(c=>`<div class="cat" data-cat="${c.id}"><button><div><div class="t">${c.n}</div><div class="d">${c.eps} tasks · AI ≈${Math.round(c.ai*100)}%</div></div>
        <div class="track"><i style="width:${(1-c.ai)*100}%"></i><i class="ai" style="width:${c.ai*100}%"></i></div><div class="v">${hm(c.min)}<small>${pct(c.dh,pw.dh)} of week</small></div><span class="chev">${ic('right',14,2)}</span></button>${CX.catLink(p.id,c.id,S.wi)}
        <div class="tasks">${c.tasks.map(tk=>`<div class="task"><span>${tk.t}${tk.draft?' <span class="pill ink">draftable</span>':''}</span><span class="a">${tk.app}</span><span class="m">${hm(tk.min)}</span></div>`).join('')}${CX.catStepsTable(p.id,c.id,S.wi)}</div></div>`).join('')}${legend.replace('class="legend"','class="legend" style="margin:10px 0 8px"')}</div>
      <div class="card"><h3>By app</h3><div class="meta">Hours on screen per app</div><div class="bars">${apps.map(([a,v])=>bar1(a,'',v,apps[0][1],H(v))).join('')}</div><h3 style="margin-top:22px">By work type</h3><div class="bars">${TYPE_ORDER.map(k=>[k,pw.cats.filter(c=>c.type===k).reduce((a,c)=>a+c.dh,0),pw.cats.filter(c=>c.type===k).reduce((a,c)=>a+c.aiDh,0)]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]).map((x,i,arr)=>bar(TYPES[x[0]],'',x[1],x[2],arr[0][1],H(x[1]))).join('')}</div></div></div>
    </div>
    <div class="sec">${secH('04','Takeaways')}<div class="take">${t3.map(x=>`<div><div class="n">${x.n}</div><div class="t">${x.t}</div><div class="d">${x.d}</div></div>`).join('')}</div></div>
    <div class="sec">${secH('05','Top recommendations', `About <b>${hm(recTot)} a week</b> back if a similar week repeats. Estimates, not measured savings.`)}
      <div class="card" style="padding:4px 16px">${recs.map((r,i)=>`<div class="rec"><span class="rk">${i+1}</span><div><div class="t">${r.t}</div><div class="d">${r.d} <span class="muted">· from ${r.cn}</span></div></div><div class="v"><b>≈${hm(r.min)} a week</b><small><span class="pill ${r.pr==='Start now'?'green':''}">${r.pr}</span></small></div></div>`).join('')}</div>
    </div>
    <div class="sec">${secH('06',`What ${esc(first(p))} knows`,'Expertise inferred from the work itself — useful when someone needs help or is out.')}
      <div class="know">${know.map(k=>`<div class="kn">${k.risk?'<span class="pill amber" style="margin-bottom:8px">Only one person does this</span>':''}<div class="t">${esc(k.k)}</div><div class="d">${esc(k.ev)}</div></div>`).join('')}</div>
    </div>
    <div class="note" style="margin-top:28px">Sample data · fictional. Recorded = active screen time with work apps; personal browsing and messages are not analyzed. No keystrokes, no message content, no individual scoring.</div>
  </div>`;
  bindPicker();
}

/* ---------- team ---------- */
function rTeam(){
  const t=TEAM[S.team], tw=teamWeek(t.id,S.wi), prev=S.wi>=0?{dh:[0,1,2].reduce((a,i)=>a+teamWeek(t.id,i).dh,0)/3}:null, all=[0,1,2].map(i=>teamWeek(t.id,i)), cw=companyWeek(S.wi);
  const cats=tw.cats, cmax=cats[0].dh; const col={}; cats.forEach((c,i)=>col[c.id]='c'+Math.min(i,5));
  const apps=Object.entries(tw.apps).sort((a,b)=>b[1]-a[1]).slice(0,9);
  const ppl=[...tw.ppl].sort((a,b)=>b.dh-a.dh); const pmax=ppl[0].dh;
  const dups=t.dup.map(d=>({...d,...dupHours(t.id,S.wi,d)})).sort((a,b)=>b.h-a.h);
  const hands=t.hand.map(h=>({...h, nn:h.n[S.wi], ww:h.wait[S.wi]})).sort((a,b)=>b.ww*b.nn-a.ww*a.nn); const wmax=Math.max(...hands.map(h=>h.ww));
  const tools={}; tw.ppl.forEach(x=>x.tools.forEach(tl=>tools[tl]=(tools[tl]||0)+1));
  const opps=t.opps.map(id=>({s:SUG[id], r:sugRoi(id,S.cost)}));
  const trendCard=(l,vals,fmt,cur)=>{ const mx=Math.max(...vals)||1; return `<div class="tc"><div class="l">${l}</div><div class="cols">${vals.map((v,i)=>`<div class="col ${i===S.wi?'on':''}"><i style="height:${Math.max(4,v/mx*56)}px"></i><small>${WEEKS[i].label.replace('Oct ','')}</small></div>`).join('')}</div><div class="now"><span>${wk().label}</span><b>${fmt(S.wi<0?(l==='App switches per hour'?(S.view==='team'?teamWeek(S.team,-1).sw:companyWeek(-1).sw):vals.reduce((a,b)=>a+b,0)):vals[S.wi])}</b></div></div>`; };
  $('#v-team').innerHTML = `<div class="page">
    <div class="seg" id="tseg">${TEAMS.map(x=>`<button data-team="${x.id}" class="${x.id===t.id?'on':''}">${x.name}</button>`).join('')}</div>
    <h1 style="margin-top:20px">${t.name}</h1>
    <div class="lede">${t.lede} <b>${t.members.length} people · ${H(tw.dh)} recorded · ${wk().label}.</b></div>
    ${tiles([{l:'People',v:t.members.length,s:[...new Set(t.members.map(p=>ROLES[p.role].noun))].length+' roles'},{l:'Recorded',v:Hn(tw.dh)+'<small>h</small>',s:(tw.dh/10/t.members.length).toFixed(1)+' h per person'},{l:'Tasks',v:tw.eps.toLocaleString('en-US'),s:cats.length+' work streams'},{l:'AI could take',v:Hn(tw.aiDh)+'<small>h</small>',s:pct(tw.aiDh,tw.dh)+' of team time',hl:1},{l:'vs full-period weekly average',v:prev?delta(tw.dh,prev.dh):'—',s:prev?'Full-period weekly average: '+H(prev.dh):'All observed weeks combined'},{l:'Outside working hours',v:hm(tw.afterMin),s:pct(tw.afterMin/6,tw.dh,1)+' of recorded time'}],'c6')}
    ${CX.teamBlock(t.id)}<div class="sec">${secH('01','Where the team’s time goes','Bar length is hours; the dark part is what AI could take or draft. Categories come from the team’s own work, not a template.')}
      <div class="g2"><div class="card"><h3>By work stream</h3><div class="bars">${cats.slice(0,9).map(c=>bar(c.n, `${c.people} ${c.people>1?'people':'person'} · ${c.eps} tasks`, c.dh, c.aiDh, cmax, H(c.dh), pct(c.dh,tw.dh))).join('')}</div>${legend}</div>
      <div class="card"><h3>By app</h3><div class="meta">Hours on screen, all people</div><div class="bars">${apps.map(([a,v])=>bar1(a,'',v,apps[0][1],H(v))).join('')}</div></div></div>
    </div>
    <div class="sec">${secH('02','Three-week trend',`Selected week highlighted. ${t.id==='fin'?'Week 3 is month-end close.':t.id==='intake'?'Week 2 had a storm-related FNOL spike.':t.id==='qa'?'Week 3 was a release week.':''}`)}
      <div class="trend">${trendCard('Recorded hours',all.map(x=>x.dh/10),v=>v.toFixed(1)+' h')}${trendCard('AI could take',all.map(x=>x.aiDh/10),v=>v.toFixed(1)+' h')}${trendCard('App switches per hour',all.map(x=>x.sw),v=>v.toFixed(1))}${trendCard('Outside working hours',all.map(x=>x.afterMin/60),v=>v.toFixed(1)+' h')}</div>
    </div>
    <div class="sec">${secH('03','Workload across people','Not a ranking — it shows where the load sits. Click a row for the personal report.')}
      <div class="card" style="padding:6px 14px"><div class="wl h"><span>Person</span><span class="xm">Work by type</span><span class="v">Hours</span><span class="v xm">After hrs</span><span class="v">Switch/h</span><span></span></div>
      ${ppl.map(x=>`<div class="wl" data-person="${x.p.id}"><div class="who">${av(x.p)}<span>${esc(nm(x.p))}<small>${ROLES[x.p.role].title}</small></span></div><div class="stack xm" style="width:${x.dh/pmax*100}%">${TYPE_ORDER.map(k=>{ const v=x.cats.filter(c=>c.type===k).reduce((a,c)=>a+c.dh,0); return v?`<i style="background:${TCOL[k]};width:${v/x.dh*100}%" title="${TYPES[k]} · ${H(v)}"></i>`:''; }).join('')}</div><span class="v">${H(x.dh)}</span><span class="v xm">${hm(x.afterMin)}</span><span class="v">${x.sw.toFixed(0)}</span><span class="chev">${ic('right',14,2)}</span></div>`).join('')}
      <div class="legend" style="margin:10px 0 6px">${TYPE_ORDER.filter(k=>tw.types[k]).map(k=>`<span><i style="background:${TCOL[k]}"></i>${TYPES[k]}</span>`).join('')}</div></div>
    </div>
    <div class="sec">${secH('04','Duplicated work','The same information handled twice. Hours are this week’s estimate from the recorded tasks.')}
      <div class="card" style="padding:2px 16px">${dups.map(d=>`<div class="row"><div class="grow"><div class="t">${d.t}</div><div class="d">${d.people} ${d.people>1?'people':'person'} · from ${d.cats.map(c=>cats.find(x=>x.id===c)?.n).filter(Boolean).join(' and ')}</div></div><div class="v"><b>${d.h.toFixed(1)} h</b><div class="d">per week</div></div></div>`).join('')}</div>
    </div>
    <div class="sec">${secH('05','Handoffs and waits','Where work changes hands and how long it sits before the next step. Median wait, working hours.')}
      <div class="card" style="padding:4px 16px"><div class="ho h"><span>Handoff</span><span class="v">Per week</span><span>Median wait</span><span class="v"></span></div>
      ${hands.map(h=>`<div class="ho"><div><div>${h.what}</div><div class="ft"><b>${teamName(h.from)}</b> → <b>${teamName(h.to)}</b></div></div><span class="v">${h.nn}</span><div class="wbar"><i style="width:${h.ww/wmax*100}%"></i></div><span class="v"><b>${h.ww} h</b></span></div>`).join('')}</div>
    </div>
    <div class="sec">${secH('06','AI adoption, by trace','Seen in the recordings: which AI tools appear in real work sessions. Not a survey.')}
      ${tiles([{l:'People with an AI trace',v:`${tw.adopters}<small>of ${t.members.length}</small>`,s:pct(tw.adopters,t.members.length)+' of the team'},{l:'Sessions with AI',v:pct(tw.aiAssistDh,tw.dh),s:H(tw.aiAssistDh)+' of work alongside an AI tool'},{l:'Tools seen',v:Object.keys(tools).length||'None',s:Object.entries(tools).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).join(', ')||'no AI tool in any session'}],'c3')}
      <div class="adopt">${[...tw.ppl].sort((a,b)=>b.aiShare-a.aiShare).map(x=>`<span class="ap">${av(x.p)}<span>${esc(nm(x.p))}</span><span class="lv ${x.aiShare?'on':''}">${x.aiShare?pct(x.aiShare,1):'none'}</span></span>`).join('')}</div>
    </div>
    <div class="sec">${secH('07','Focus and fragmentation',`Compared with the whole recorded company this week.`)}
      ${tiles([{l:'App switches per hour',v:tw.sw.toFixed(1),s:'company '+cw.sw.toFixed(1)},{l:'Time in blocks under 15 min',v:pct(tw.frag,1),s:'company '+pct(cw.frag,1)},{l:'Median longest block',v:hm(tw.longestMed),s:'per person, this week'},{l:'Outside working hours',v:pct(tw.afterMin/6,tw.dh,1),s:'company '+pct(cw.afterMin/6,cw.dh,1)}],'c4')}
    </div>
    <div class="sec">${secH('08','Risks · single points of knowledge','Work only one person does. Worth documenting before anyone is out.')}
      <div class="card" style="padding:2px 16px">${t.risks.map(r=>`<div class="row click" data-person="${r.who}">${av(PERSON[r.who])}<div class="grow"><div class="t">${r.t}</div><div class="d">${esc(nm(PERSON[r.who]))} · ${r.ev}</div></div><span class="pill amber">Single point</span><span class="chev">${ic('right',14,2)}</span></div>`).join('')}</div>
    </div>
    <div class="sec">${secH('09','Patterns')}<div class="take">${t.pats.map((x,i)=>`<div><div class="n">0${i+1}</div><div class="t">${x[0]}</div><div class="d">${x[1]}</div></div>`).join('')}</div></div>
    <div class="sec">${secH('10','Top automation opportunities',`From the plan · 3-week average · at ${money(S.cost)}/h loaded cost.`)}
      <div class="card" style="padding:2px 16px">${opps.map((o,i)=>`<div class="row click" data-sug="${o.s.id}"><span class="rk">${i+1}</span><div class="grow"><div class="t">${o.s.t}</div><div class="d">${DIR[o.s.dir].n} · ${o.r.people.length} people · approver: ${o.s.approver}</div></div><div class="v"><b>${o.r.back.toFixed(1)} h/wk</b><div class="d">${money(o.r.month)}/mo</div></div><span class="chev">${ic('right',14,2)}</span></div>`).join('')}</div>
    </div>
    <div class="note" style="margin-top:28px">Sample data · fictional. Team reports show work patterns; they never score individuals.</div>
  </div>`;
}

/* ---------- company ---------- */
function rCompany(){
  const cw=companyWeek(S.wi), prev=S.wi>=0?{dh:[0,1,2].reduce((a,i)=>a+companyWeek(i).dh,0)/3,tw:TEAMS.map(t=>({dh:[0,1,2].reduce((a,i)=>a+teamWeek(t.id,i).dh,0)/3}))}:null, all=[0,1,2].map(companyWeek);
  const types=TYPE_ORDER.filter(k=>cw.types[k]).sort((a,b)=>cw.types[b]-cw.types[a]);
  const tAi={}; cw.tw.forEach(x=>x.cats.forEach(c=>tAi[c.type]=(tAi[c.type]||0)+c.aiDh));
  const tmax=cw.types[types[0]];
  const planTot=DIRS.reduce((a,d)=>a+dirRoi(d.id,S.cost).month,0);
  const cross=[]; const seen=new Set();
  TEAMS.forEach(t=>t.hand.forEach(h=>{ const k=h.from+h.to+h.what; if(h.from!==h.to && !seen.has(k)){ seen.add(k); cross.push({...h, nn:h.n[S.wi], ww:h.wait[S.wi]}); } }));
  cross.sort((a,b)=>b.nn*b.ww-a.nn*a.ww); const wmax=Math.max(...cross.map(h=>h.ww));
  const tools={}; cw.tw.forEach(x=>x.ppl.forEach(p=>p.tools.forEach(tl=>tools[tl]=(tools[tl]||0)+1)));
  const top=PLAN.map(s=>({s,r:sugRoi(s.id,S.cost)})).sort((a,b)=>b.r.back-a.r.back).slice(0,6);
  const heat=(v,max)=>`<span class="hb" style="background:rgba(47,74,158,${(.06+v/max*.84).toFixed(3)});color:${v/max>.45?'#fff':'inherit'}">${(v/10).toFixed(0)}</span>`;
  const hmax=Math.max(...cw.tw.flatMap(x=>Object.values(x.types)));
  const trendCard=(l,vals,fmt)=>{ const mx=Math.max(...vals)||1; return `<div class="tc"><div class="l">${l}</div><div class="cols">${vals.map((v,i)=>`<div class="col ${i===S.wi?'on':''}"><i style="height:${Math.max(4,v/mx*56)}px"></i><small>${WEEKS[i].label.replace('Oct ','')}</small></div>`).join('')}</div><div class="now"><span>${wk().label}</span><b>${fmt(S.wi<0?(l==='App switches per hour'?(S.view==='team'?teamWeek(S.team,-1).sw:companyWeek(-1).sw):vals.reduce((a,b)=>a+b,0)):vals[S.wi])}</b></div></div>`; };
  $('#v-company').innerHTML = `<div class="page">
    <h1>Harbor Mutual · company report</h1>
    <div class="lede">The pilot scope: <b>${TEAMS.length} teams, ${PEOPLE.length} people</b>, ${wk().label}. <b>${H(cw.dh)}</b> of work recorded; <b>${pct(cw.aiDh,cw.dh)}</b> of it is work AI could take or draft. Team totals add up to this page.</div>
    ${tiles([{l:'Teams',v:TEAMS.length,s:'in the pilot scope'},{l:'People',v:PEOPLE.length,s:'recorded this week'},{l:'Recorded',v:Hn(cw.dh)+'<small>h</small>',s:prev?'vs full-period weekly average '+delta(cw.dh,prev.dh):'All observed weeks combined'},{l:'Tasks',v:cw.eps.toLocaleString('en-US'),s:'in work streams'},{l:'AI could take',v:Hn(cw.aiDh)+'<small>h</small>',s:pct(cw.aiDh,cw.dh)+' of recorded time',hl:1},{l:'Plan value',v:kmoney(planTot)+'<small>/mo</small>',s:`model · ${money(S.cost)}/h`}],'c6')}
    <div class="sec">${secH('01','Where the company’s time goes','Every team’s work streams rolled up into shared work types.')}
      <div class="g2e"><div class="card"><h3>By work type</h3><div class="bars">${types.map(k=>bar(TYPES[k],'',cw.types[k],tAi[k],tmax,H(cw.types[k]),pct(cw.types[k],cw.dh))).join('')}</div>${legend}</div>
      <div class="card"><h3>Hours by team and work type</h3><div class="meta">Darker = more hours</div><div class="scrollx" style="margin-top:8px"><table class="tbl heatt"><tr><th style="text-align:left">Type</th>${cw.tw.map(x=>`<th>${x.t.letter}</th>`).join('')}</tr>
        ${types.map(k=>`<tr><td>${TYPES[k].replace(' & re-keying','').replace(' & reconciliation','').replace(' & coordination','').replace(' & decisions','').replace(' & lookup','').replace(' & QA','')}</td>${cw.tw.map(x=>`<td class="heat">${x.types[k]?heat(x.types[k],hmax):'<span class="muted">—</span>'}</td>`).join('')}</tr>`).join('')}</table></div>
        <div class="note">${cw.tw.map(x=>`${x.t.letter} = ${x.t.name}`).join(' · ')}</div></div></div>
    </div>
    ${CX.companyBlock()}<div class="sec">${secH('02','Teams side by side','Click a team for its full report.')}
      <div class="card scrollx" style="padding:4px 14px"><table class="tbl"><tr><th>Team</th><th>People</th><th>Hours</th><th>Per person</th><th>AI could take</th><th>AI trace</th><th>Switches/h</th><th>After hours</th><th>vs weekly avg.</th></tr>
      ${cw.tw.map((x,i)=>`<tr class="click" data-team="${x.t.id}"><td><b style="font-weight:500">${x.t.name}</b></td><td>${x.ppl.length}</td><td>${Hn(x.dh)}</td><td>${(x.dh/10/x.ppl.length).toFixed(1)}</td><td><span class="ink" style="font-weight:600">${pct(x.aiDh,x.dh)}</span> · ${Hn(x.aiDh)} h</td><td>${x.adopters}/${x.ppl.length}</td><td>${x.sw.toFixed(1)}</td><td>${hm(x.afterMin)}</td><td>${prev?delta(x.dh,prev.tw[i].dh):'—'}</td></tr>`).join('')}
      <tr><td><b>Company</b></td><td><b>${PEOPLE.length}</b></td><td><b>${Hn(cw.dh)}</b></td><td>${(cw.dh/10/PEOPLE.length).toFixed(1)}</td><td><b>${pct(cw.aiDh,cw.dh)}</b> · ${Hn(cw.aiDh)} h</td><td>${cw.adopters}/${PEOPLE.length}</td><td>${cw.sw.toFixed(1)}</td><td>${hm(cw.afterMin)}</td><td>${prev?delta(cw.dh,prev.dh):'—'}</td></tr></table></div>
    </div>
    <div class="sec">${secH('03','Biggest cross-team handoffs','Ranked by volume × wait. These are where work queues between teams.')}
      <div class="card" style="padding:4px 16px"><div class="ho h"><span>Handoff</span><span class="v">Per week</span><span>Median wait</span><span class="v"></span></div>
      ${cross.slice(0,7).map(h=>`<div class="ho"><div><div>${h.what}</div><div class="ft"><b>${teamName(h.from)}</b> → <b>${teamName(h.to)}</b></div></div><span class="v">${h.nn}</span><div class="wbar"><i style="width:${h.ww/wmax*100}%"></i></div><span class="v"><b>${h.ww} h</b></span></div>`).join('')}</div>
    </div>
    <div class="sec">${secH('04','AI adoption across the company','By trace in real sessions. Most adoption is personal and ad hoc; none of it is yet built into a process.')}
      <div class="g2"><div class="card"><h3>Sessions alongside an AI tool</h3><div class="bars">${cw.tw.map(x=>bar1(x.t.name,`${x.adopters} of ${x.ppl.length} people`,x.aiAssistDh/x.dh,Math.max(...cw.tw.map(y=>y.aiAssistDh/y.dh)),pct(x.aiAssistDh,x.dh,1))).join('')}</div></div>
      <div class="card"><h3>Tools seen</h3><div class="meta">People using each tool at least once</div><div class="bars">${Object.entries(tools).sort((a,b)=>b[1]-a[1]).map(([k,v])=>bar1(k,'',v,PEOPLE.length,v+' people')).join('')}</div></div></div>
    </div>
    <div class="sec">${secH('05','Three-week trend','Selected week highlighted.')}
      <div class="trend">${trendCard('Recorded hours',all.map(x=>x.dh/10),v=>v.toFixed(1)+' h')}${trendCard('AI could take',all.map(x=>x.aiDh/10),v=>v.toFixed(1)+' h')}${trendCard('App switches per hour',all.map(x=>x.sw),v=>v.toFixed(1))}${trendCard('Outside working hours',all.map(x=>x.afterMin/60),v=>v.toFixed(1)+' h')}</div>
    </div>
    <div class="sec">${secH('06','Top company-wide opportunities',`3-week average · ${money(S.cost)}/h loaded cost · model, not a promise.`,`<button class="btn solid" data-v="plan">Open the automation plan ${ic('right',14,2)}</button>`)}
      <div class="card" style="padding:2px 16px">${top.map((o,i)=>`<div class="row click" data-sug="${o.s.id}"><span class="rk">${i+1}</span><div class="grow"><div class="t">${o.s.t}</div><div class="d">${DIR[o.s.dir].n} · ${o.r.teams.map(x=>TEAM[x].name).join(' + ')} · ${o.r.people.length} people</div></div><div class="v"><b>${o.r.back.toFixed(1)} h/wk</b><div class="d">${money(o.r.month)}/mo</div></div><span class="chev">${ic('right',14,2)}</span></div>`).join('')}</div>
    </div>
    <div class="note" style="margin-top:28px">Sample data · fictional company. In production these numbers come from your own recordings, processed on your own infrastructure.</div>
  </div>`;
}

/* ---------- processes & automation ---------- */
function costCtl(){ return `<div class="roi-bar"><span class="as"><b>Model, not a promise</b> · value = hours back × 4.33 weeks × loaded hourly cost · payback = build effort ÷ hours back</span>
  <span class="cost"><span class="meta">Loaded cost</span><button class="st" id="cminus" aria-label="Lower">−</button><input type="range" id="crange" min="30" max="120" step="5" value="${S.cost}" aria-label="Loaded hourly cost"><button class="st" id="cplus" aria-label="Higher">+</button><output id="cout">${money(S.cost)}/h</output></span></div>`; }
function bindCost(){ const set=v=>{ S.cost=Math.max(30,Math.min(120,v)); rPlan(); if(S.sel) openSug(S.sel,true); };
  $('#crange').oninput=e=>set(+e.target.value); $('#cminus').onclick=()=>set(S.cost-5); $('#cplus').onclick=()=>set(S.cost+5); }
function rPlan(){
  const rois=DIRS.map(d=>({d,r:dirRoi(d.id,S.cost)}));
  const back=rois.reduce((a,x)=>a+x.r.back,0), eff=rois.reduce((a,x)=>a+x.r.eff,0);
  const ppl=new Set(); PLAN.forEach(s=>evidence(s.id).people.forEach(p=>ppl.add(p)));
  const month=back*WEEKS_PER_MONTH*S.cost;
  const head = `<h1>Processes &amp; automation</h1>
    <div class="lede">Built from <b>3 weeks of recorded work</b> (Oct 13–31). Every suggestion links back to the sessions, hours and people it came from. Agents draft and prepare; <b>a named person approves</b> every consequential step.</div>
    <div class="seg" style="margin-top:16px"><button id="tab-plan" class="${S.tab==='plan'?'on':''}">Automation plan</button><button id="tab-maps" class="${S.tab==='maps'?'on':''}">Process maps</button><button data-href="#cases">Step by step</button></div>`;
  let body='';
  if(S.tab==='plan'){
    body = `${costCtl()}
    ${tiles([{l:'Hours back per week',v:back.toFixed(1)+'<small>h</small>',s:`of ${(companyWeek(0).dh+companyWeek(1).dh+companyWeek(2).dh)/30|0} h recorded per week`,hl:1},{l:'People affected',v:ppl.size,s:`of ${PEOPLE.length} recorded`},{l:'Value per month',v:money(month),s:`at ${money(S.cost)}/h`},{l:'Value per year',v:kmoney(month*12),s:'if the weeks repeat'},{l:'Build effort',v:eff+'<small>person-weeks</small>',s:`payback ≈ ${Math.round(eff*40/back)} weeks overall`}])}
    <div class="dirs">${rois.map(({d,r})=>`<div class="dir"><div class="dir-h"><div class="nm"><b>${d.n}</b><small>${d.d}</small></div>
      <div class="m hl"><small>Hours back / wk</small><b>${r.back.toFixed(1)} h</b></div><div class="m"><small>People</small><b>${r.people}</b></div><div class="m hl"><small>Value / month</small><b>${money(r.month)}</b></div><div class="m"><small>Effort</small><b>${r.eff} p-wk</b></div><div class="m"><small>Payback</small><b>≈${Math.round(r.payback)} wk</b></div></div>
      ${r.items.map(s=>{ const x=sugRoi(s.id,S.cost); return `<div class="sug ${S.inPlan.has(s.id)?'inplan':''}" data-sug="${s.id}"><div><div class="t">${s.t}</div><div class="d">${x.teams.map(t=>TEAM[t].name).join(' + ')} · ${x.people.length} people · ${s.cx} effort · approver: ${s.approver}</div></div><div class="v"><b>${x.back.toFixed(1)} h</b><div class="d">per week</div></div><div class="v xm"><b>${money(x.month)}</b><div class="d">per month</div></div><div class="v xm">${s.eff} p-wk</div><span class="chev">${ic('right',14,2)}</span></div>`; }).join('')}</div>`).join('')}</div>
    <div class="note">Hours back = observed hours on the affected tasks × the share an agent can take (from the task types). Effort is in person-weeks of build and review. Change the loaded cost to see the value move; payback does not depend on it.</div>`;
  } else {
    const pr=PROC[S.proc], st=procStats(pr); const agentSteps=pr.steps.filter(s=>s.ai==='agent').length, humanSteps=pr.steps.filter(s=>s.ai==='human').length;
    const linked=PLAN.filter(s=>s.proc===pr.id);
    const per = pr.unit==='week' ? `${pr.runs} runs a week` : `once a ${pr.unit}`;
    body = `<div class="seg" style="margin-top:18px">${PROCS.map(x=>`<button data-proc="${x.id}" class="${x.id===pr.id?'on':''}">${x.n}</button>`).join('')}</div>
    <h2 style="margin-top:18px">${pr.n}</h2><div class="lede" style="margin-top:4px">${pr.d} ${TEAM[pr.team].name} · ${per} · ${pr.people} people involved.</div>${CX.overviewSwitch(pr.id)}
    ${tiles([{l:'Hands-on per run',v:hm(st.hands),s:`${pr.steps.length} steps`},{l:'Waiting per run',v:st.wait?st.wait+'<small>h</small>':'—',s:'between steps, median'},{l:pr.unit==='week'?'Hands-on per week':'Hands-on per '+pr.unit,v:st.perUnitH.toFixed(1)+'<small>h</small>',s:per},{l:'Steps an agent can take',v:`${agentSteps}<small>of ${pr.steps.length}</small>`,s:hm(st.agentMin)+' of hands-on time',hl:1},{l:'Stays human',v:humanSteps,s:pr.steps.filter(s=>s.ai==='human').map(s=>s.who).join(', ')}])}
    <div class="pmap">${pr.steps.map((s,i)=>`${i?`<div class="parr">${s.wait?`<span class="wt">${s.wait} h</span>`:''}→</div>`:''}<div class="pnode ${s.ai}" ${CX.stageAttr(pr.id,i)}><div class="s">${s.s}</div><div class="a">${s.who} · ${s.app}</div><div class="m">${hm(s.min)}</div><div style="margin-top:6px"><span class="badge ${s.ai}"><i></i>${s.ai==='agent'?'Agent can take':s.ai==='assist'?'AI assists':'Stays human'}</span></div>${CX.stageFoot(pr.id,i)}</div>`).join('')}</div>
    <div class="card" style="margin-top:16px;padding:4px 14px"><div class="stp h"><span></span><span>Step</span><span class="xm">Who</span><span class="xm">App</span><span class="v">Time</span><span class="v xm">Wait before</span><span class="xm">AI</span></div>
      ${pr.steps.map((s,i)=>`<div class="stp ${s.ai}" ${CX.stageAttr(pr.id,i)}><span class="no">${i+1}</span><span>${s.s}${CX.stageSub(pr.id,i)}</span><span class="a xm">${s.who}</span><span class="a xm">${s.app}</span><span class="v">${hm(s.min)}</span><span class="v xm w">${s.wait?s.wait+' h':'—'}</span><span class="xm"><span class="badge ${s.ai}"><i></i>${s.ai==='agent'?'Agent can take':s.ai==='assist'?'AI assists, person decides':'Stays human'}</span></span></div>`).join('')}</div>
    <div class="g2e" style="margin-top:14px"><div class="card"><h3>Tools in this process</h3><div class="meta" style="margin-top:6px">${st.apps.join(' · ')}</div><h3 style="margin-top:14px">Roles</h3><div class="meta" style="margin-top:6px">${st.roles.join(' · ')}</div>${CX.procPeople(pr.id)}</div>
      <div class="card"><h3>Suggestions built on this map</h3>${linked.length?linked.map(s=>`<div class="row click" data-sug="${s.id}"><div class="grow"><div class="t">${s.t}</div><div class="d">${DIR[s.dir].n}</div></div><div class="v"><b>${evidence(s.id).back.toFixed(1)} h/wk</b></div><span class="chev">${ic('right',14,2)}</span></div>`).join(''):'<div class="meta" style="margin-top:6px">None yet.</div>'}</div></div>`;
  }
  if(new URLSearchParams(location.search).has('workflow') && S.tab==='maps'){ const start=body.indexOf('<div class="pmap">'),end=body.indexOf('<div class="card"',start); const map=body.slice(start,end); body=body.slice(0,start)+body.slice(end); const at=body.indexOf('<div class="tiles'); if(at>=0)body=body.slice(0,at)+map+body.slice(at); }
  $('#v-plan').innerHTML = `<div class="page">${head}${body}<div class="note" style="margin-top:28px">Sample data · fictional. Process maps are drawn from recorded steps; waits are working hours between steps.</div></div>`;
  $('#tab-plan').onclick=()=>{ S.tab='plan'; render(); }; $('#tab-maps').onclick=()=>{ S.tab='maps'; closeSug(); render(); };
  if(S.tab==='plan') bindCost();
}
function openSug(id, keep){
  const s=SUG[id], x=sugRoi(id,S.cost); S.sel=id;
  const ov=$('#ov'); const inp=S.inPlan.has(id);
  ov.innerHTML = `<div class="ov-h"><span class="pill ink">${DIR[s.dir].n}</span><span class="pill">${s.cx} effort</span><button class="x" id="ov-x" aria-label="Close">${ic('x',16,2)}</button></div>
  <div class="ov-b"><h2>${s.t}</h2><div class="lede" style="font-size:13.5px;line-height:21px">${s.what}</div>
    ${tiles([{l:'Hours back / week',v:x.back.toFixed(1)+'<small>h</small>',hl:1},{l:'Value / month',v:money(x.month),s:`at ${money(S.cost)}/h`},{l:'Payback',v:'≈'+Math.round(x.payback)+'<small>wk</small>',s:`${s.eff} person-weeks`}],'c3')}
    <div class="sec"><h3>Evidence <span class="meta" style="font-weight:400">· from 3 weeks of recordings</span></h3>
      <div class="rows"><div class="row"><div class="grow">Sessions on the affected tasks</div><div class="v"><b>${x.eps.toLocaleString('en-US')}</b></div></div>
      <div class="row"><div class="grow">Hours on those tasks, per week</div><div class="v"><b>${x.obs.toFixed(1)} h</b></div></div>
      <div class="row"><div class="grow">Share an agent can take</div><div class="v"><b>${Math.round(s.take*100)}%</b></div></div>
      <div class="row"><div class="grow">People</div><div class="v"><b>${x.people.length}</b> · ${x.teams.map(t=>TEAM[t].name).join(', ')}</div></div>
      <div class="row"><div class="grow">Apps</div><div class="v">${x.apps.join(', ')}</div></div></div>
      <div class="adopt">${x.people.map(pid=>`<span class="ap" data-person="${pid}" style="cursor:pointer">${av(PERSON[pid])}<span>${esc(nm(PERSON[pid]))}</span></span>`).join('')}</div></div>
    <div class="sec"><h3>What gets built</h3><ol>${s.build.map(b=>`<li>${b}</li>`).join('')}</ol></div>
    <div class="sec"><h3>First steps</h3><ol>${s.first.map(b=>`<li>${b}</li>`).join('')}</ol></div>
    <div class="sec"><h3>Stays human</h3><ul>${s.human.map(b=>`<li>${b}</li>`).join('')}</ul><div class="note">Approver: <b>${s.approver}</b>. Runs inside your perimeter; every run is in the audit log.</div></div>
  </div>
  <div class="ov-f">${s.proc?`<button class="btn" data-proc="${s.proc}">Open process map</button>`:''}${CX.sugLink(s.id)}<span style="flex:1"></span><button class="btn solid" id="ov-go">${inp?ic('check',14,2)+' In pilot scope':'Add to pilot scope'}</button></div>`;
  ov.classList.add('on');
  $('#ov-x').onclick=closeSug;
  $('#ov-go').onclick=()=>{ S.inPlan.has(id)?S.inPlan.delete(id):S.inPlan.add(id); openSug(id,true); if(S.view==='plan') rPlan(); };
  if(!keep && S.view!=='plan'){ /* opened from team/company: stay where we are */ }
  syncHash();
}
function closeSug(){ S.sel=null; const ov=$('#ov'); if(ov) ov.classList.remove('on'); }

/* ---------- Ask Silow: prepared answer bank with fuzzy intent matching (no LLM in this demo) ---------- */
const STOP = new Set('the a an of to in on for and or is are was were be do does did what whats which who whom how much many our we us you your i me my it its this that these those with at by from as about can could would should will there their they them any some me please tell show give'.split(' '));
function norm(s){ return ' '+s.toLowerCase().replace(/[’']/g,'').replace(/&/g,' and ').replace(/[^a-z0-9%$\- ]+/g,' ').replace(/-/g,' ').replace(/\s+/g,' ').trim()+' '; }
function toks(s){ return norm(s).trim().split(' ').filter(Boolean); }
function dl(a,b){ const m=a.length,n=b.length; if(Math.abs(m-n)>2) return 9; const d=[]; for(let i=0;i<=m;i++){ d[i]=[i]; } for(let j=0;j<=n;j++) d[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){ const c=a[i-1]===b[j-1]?0:1; d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+c); if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]) d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1); } return d[m][n]; }
function tokMatch(q,k){ if(q===k) return true; if(k.length>=4 && q.length>=4 && (q.startsWith(k)||k.startsWith(q)) && Math.min(q.length,k.length)>=4) return true;
  if(k.length>=4 && q.length>=4){ const d=dl(q,k); return k.length<=6 ? d<=1 : d<=2; } return false; }
function has(qt, qn, phrase){ // phrase match: exact substring, or every word fuzzily present
  const pn=norm(phrase); if(qn.includes(pn)) return 1;
  const pw=pn.trim().split(' ').filter(w=>!STOP.has(w)); if(!pw.length) return 0;
  return pw.every(w=>qt.some(t=>tokMatch(t,w))) ? (pw.length>1?.9:.8) : 0;
}
/* entities */
const TEAM_AL = { strat:['strategic operations','strategic ops','strategy ops','strategy team','strategic'], fin:['finance operations','finance','financial','accounting','reinsurance','payables','fpa','fp and a','accounts payable'],
  intake:['claims intake','intake','fnol team','first notice team','intake team'], qa:['claims testing','testing team','qa team','qa','testers','test team','quality assurance'], uw:['underwriting support','underwriting','policy service','underwriters'] };
const DIR_AL = { intake:['claims intake','fnol','intake'], report:['reporting','reconciliation','report','reports','pack'], test:['testing','test','qa','regression'], policy:['policy servicing','policy','endorsement','endorsements','submissions'], fin:['finance','financial','payments','bordereaux','invoices'] };
const PROC_AL = { p1:['fnol','first notice','claim set up','claim setup','new claim'], p2:['loss ratio pack','monthly pack','ops pack','loss ratio'], p3:['regression','release testing','test cycle'], p4:['endorsement','policy change'], p5:['medical bill','bill to payment','bills','workers comp bill'] };
const SUG_AL = { fnol:['fnol','first notice'], docs:['attachment','attachments','indexing','document matching'], medbill:['medical bill','fee schedule','bill pre check'], pack:['ops pack','loss ratio pack','monthly pack'], dailyrep:['daily intake report','daily report'], status:['status digest','initiative tracker','program status'], regress:['regression'], testdata:['test data'], defects:['defect','defects'], endorse:['endorsement','endorsements'], subm:['submission','submissions'], coi:['certificate','certificates','coi'], recon:['bank reconciliation','payment reconciliation'], bdx:['bordereaux'], invoice:['invoice','invoices'] };
const APPS = ['ClaimCenter','Policy admin','Excel','Outlook','Teams','SharePoint','Power BI','Jira','Test manager','Document portal','Bill review portal','General ledger','PowerPoint','Word','SQL client','VS Code','Browser'];
const NAME_AMBIG = new Set(['price','grant','dev','park','hill','martin','cole','sam','tom','grace','kim','chen']);
function entities(q){
  const qn=norm(q), qt=toks(q), e={};
  for(const [id,al] of Object.entries(TEAM_AL)) for(const a of al){ const an=norm(a); if(qn.includes(an) || (an.trim().length>=6 && an.trim().split(' ').length===1 && qt.some(t=>tokMatch(t,an.trim())))){ e.team=e.team||id; break; } }
  for(const [id,al] of Object.entries(DIR_AL)) for(const a of al){ if(qn.includes(norm(a))){ e.dir=e.dir||id; break; } }
  for(const [id,al] of Object.entries(PROC_AL)) for(const a of al){ if(qn.includes(norm(a))){ e.proc=e.proc||id; break; } }
  for(const [id,al] of Object.entries(SUG_AL)) for(const a of al){ if(qn.includes(norm(a))){ e.sug=e.sug||id; break; } }
  for(const a of APPS){ const an=norm(a).trim(); if(qn.includes(' '+an+' ') || (an.length>=6 && qt.some(t=>tokMatch(t,an.replace(/ /g,''))))){ e.app=e.app||a; } }
  for(const p of PEOPLE){
    const codeHit = qt.includes(p.code.toLowerCase());
    const [f,l]=p.n.toLowerCase().split(' ');
    const full = norm(p.n); const okf=!NAME_AMBIG.has(f), okl=!NAME_AMBIG.has(l);
    const nameHit = qn.includes(full) || qt.some(t=>(okf&&(t===f||(t.length>=6&&f.length>=6&&dl(t,f)<=1)))||(okl&&(t===l||(t.length>=6&&l.length>=6&&dl(t,l)<=1))));
    if(codeHit){ e.person=p.id; e.byCode=true; break; }
    if(nameHit){ e.person=p.id; e.byName=true; break; }
  }
  return e;
}
/* answer helpers */
const mbars = (rows, max) => `<div class="mbars">${rows.map(r=>`<div class="mb"><span class="n">${r[0]}</span><div class="track" style="width:${Math.max(3,r[1]/max*100)}%"><i style="width:${(1-(r[3]||0))*100}%"></i><i class="ai" style="width:${(r[3]||0)*100}%"></i></div><span class="v">${r[2]}</span></div>`).join('')}</div>`;
const mtbl = (head, rows) => `<table class="mtbl"><tr>${head.map((h,i)=>`<th class="${i?'r':''}">${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map((c,i)=>`<td class="${i?'r':''}">${c}</td>`).join('')}</tr>`).join('')}</table>`;
const chip = (label, attr='') => `<span class="${attr?'go':''}" ${attr}>${ic('file',12,2)}${label}</span>`;
const chipT = id => chip(`Team report · ${TEAM[id].name} · ${wk().label}`, `data-team="${id}"`);
const chipC = () => chip(`Company report · ${wk().label}`, 'data-v="company"');
const chipP = id => chip(`Personal report · ${esc(nm(PERSON[id]))} · ${wk().label}`, `data-person="${id}"`);
const chipPlan = () => chip('Automation plan · 3-week average', 'data-v="plan"');
const chipPr = id => chip(`Process map · ${PROC[id].n}`, `data-proc="${id}"`);
const chipDoc = l => `<span class="go" data-doc="${l}">${ic('lock',12,2)}${l}</span>`;
function bestTeam(e){ return e.team || (e.person && PERSON[e.person].team) || null; }

const INTENTS = [
 ...CX.intents,
 {id:'help', kw:[['hello',2],['hi',1.5],['hey',1.5],['what can you do',3],['help',2],['what can i ask',3],['how does this chat work',3]], fn:()=>({h:`<p>I answer from Harbor Mutual’s recorded work — people, teams, processes and the automation plan. Try:</p><ul><li>Where does Claims intake’s time go?</li><li>What should we automate first, and what is it worth?</li><li>Who knows the reinsurance bordereaux?</li><li>Does anything leave our network?</li></ul><p class="muted">This is a sample demo with prepared answers. In production I answer from your own recordings, on your own models.</p>`, s:[chipDoc('Sample demo')]}) },
 {id:'person_time', need:'person', kw:[['week',1],['work on',1.5],['doing',1.2],['time',1],['spend',1],['spent',1],['busy',1],['report',.6],['how is',1],['what does',1.2],['summary',1],['day',.8]], fn:(e)=>{ const p=PERSON[e.person], pw=personWeek(p.id,S.wi); const cats=[...pw.cats].sort((a,b)=>b.dh-a.dh);
   return {h:`<p><b>${esc(nm(p))}</b> · ${ROLES[p.role].title}, ${TEAM[p.team].name}. <b>${H(pw.dh)}</b> recorded in ${wk().label}, ${pw.eps} tasks.</p>${mbars(cats.slice(0,5).map(c=>[c.n,c.dh,H(c.dh),c.ai]),cats[0].dh)}<p>AI could take about <b>${H(pw.aiDh)}</b> (${pct(pw.aiDh,pw.dh)}). Biggest single idea: <b>${ROLES[p.role].recs[0].t.toLowerCase()}</b>.</p>`, s:[chipP(p.id)]}; } },
 {id:'person_recs', need:'person', kw:[['recommend',2],['recommendations',2],['suggest',2],['improve',1.5],['save',1.2],['help',1],['automate',1.4],['free up',1.5]], fn:(e)=>{ const p=PERSON[e.person], pw=personWeek(p.id,S.wi);
   const recs=ROLES[p.role].recs.map(r=>({...r,min:r5(pw.cats.find(c=>c.id===r.cat).min*r.pct)})).sort((a,b)=>b.min-a.min);
   return {h:`<p>Top recommendations for <b>${esc(nm(p))}</b> (${wk().label}):</p><ol>${recs.map(r=>`<li><b>${r.t}</b> — ≈${hm(r.min)} a week. ${r.d}</li>`).join('')}</ol><p class="muted">Estimates from one recorded week, not measured savings.</p>`, s:[chipP(p.id)]}; } },
 {id:'person_knows', need:'person', kw:[['know',1.6],['knows',1.8],['expertise',2],['expert',2],['good at',2],['skills',2]], fn:(e)=>{ const p=PERSON[e.person], pw=personWeek(p.id,S.wi);
   const k=ROLES[p.role].know.map(x=>`<li><b>${x.k}</b> — ${fill(x.ev,pw)}</li>`); TEAMS.forEach(t=>t.risks.forEach(r=>{ if(r.who===p.id) k.unshift(`<li><b>Single point of knowledge:</b> ${r.t.toLowerCase()}. ${r.ev}</li>`); }));
   return {h:`<p>What <b>${esc(nm(p))}</b> knows, from the work itself:</p><ul>${k.join('')}</ul>`, s:[chipP(p.id)]}; } },
 {id:'team_overview', need:'team', kw:[['tell me about',2],['overview',2],['summary',1.8],['summarize',1.8],['how is',1.2],['doing',1],['what does',1.2],['team',.5]], fn:(e)=>{ const t=TEAM[e.team], tw=teamWeek(t.id,S.wi), pv=S.wi>=0?{dh:[0,1,2].reduce((a,i)=>a+teamWeek(t.id,i).dh,0)/3}:null;
   return {h:`<p><b>${t.name}</b> — ${t.members.length} people, <b>${H(tw.dh)}</b> recorded in ${wk().label}${pv?` (${delta(tw.dh,pv.dh)} vs full-period weekly average)`:''}. AI could take <b>${pct(tw.aiDh,tw.dh)}</b>.</p><ul>${t.pats.map(x=>`<li><b>${x[0]}.</b> ${x[1]}</li>`).join('')}</ul><p>First opportunity: <b>${SUG[t.opps[0]].t}</b> — ${evidence(t.opps[0]).back.toFixed(1)} h/week.</p>`, s:[chipT(t.id)]}; } },
 {id:'team_time', need:'team', kw:[['where',1],['time',1.2],['go',.6],['goes',1],['spend',1.4],['spent',1.2],['hours',1.2],['busy',1],['breakdown',1.6],['split',1.2],['work on',1.2],['what do they do',2]], fn:(e)=>{ const t=TEAM[e.team], tw=teamWeek(t.id,S.wi);
   const tn=toks(t.name+' '+(TEAM_AL[t.id]||[]).join(' ')); const qt=toks(e.q||'').filter(x=>!STOP.has(x)&&x.length>=4&&!tn.some(w=>tokMatch(x,w))); const fc=tw.cats.find(c=>toks(c.n).some(w=>w.length>=4&&qt.some(x=>tokMatch(x,w))&&!['time','hours','work'].includes(w)));
   return {h:`<p><b>${t.name}</b>, ${wk().label}: <b>${H(tw.dh)}</b> across ${t.members.length} people.${fc?` <b>${fc.n}</b> took <b>${H(fc.dh)}</b> (${pct(fc.dh,tw.dh)}); AI could take about ${pct(fc.aiDh,fc.dh)} of it.`:''}</p>${mbars(tw.cats.slice(0,6).map(c=>[c.n,c.dh,H(c.dh),c.aiDh/c.dh]),tw.cats[0].dh)}<p>The dark part of each bar is work AI could take or draft — <b>${H(tw.aiDh)}</b> in total (${pct(tw.aiDh,tw.dh)}).</p>`, s:[chipT(t.id)]}; } },
 {id:'company_time', kw:[['where',1],['time',1.2],['goes',1],['go',.5],['spend',1.4],['spent',1.2],['hours',1.1],['company',1.2],['overall',1.2],['everyone',1],['whole',1],['total',1],['breakdown',1.4]], fn:()=>{ const cw=companyWeek(S.wi); const ty=TYPE_ORDER.filter(k=>cw.types[k]).sort((a,b)=>cw.types[b]-cw.types[a]); const tAi={}; cw.tw.forEach(x=>x.cats.forEach(c=>tAi[c.type]=(tAi[c.type]||0)+c.aiDh));
   return {h:`<p>Across the pilot scope (${TEAMS.length} teams, ${PEOPLE.length} people) Harbor Mutual recorded <b>${H(cw.dh)}</b> in ${wk().label}.</p>${mbars(ty.slice(0,6).map(k=>[TYPES[k],cw.types[k],pct(cw.types[k],cw.dh),tAi[k]/cw.types[k]]),cw.types[ty[0]])}<p><b>${TYPES[ty[0]]}</b> and <b>${TYPES[ty[1]].toLowerCase()}</b> lead. AI could take or draft <b>${pct(cw.aiDh,cw.dh)}</b> of all recorded time.</p>`, s:[chipC()]}; } },
 {id:'automate_first', kw:[['automate',2],['automation',1.8],['first',1],['start with',1.2],['priority',1.6],['prioritize',1.6],['quick win',2.2],['quick wins',2.2],['biggest opportunity',2.4],['opportunities',1.8],['where can ai help',2.6],['ai help',1.8],['what should we',1.2],['top',.8]], fn:(e)=>{
   const t=e.team; const list=(t?TEAM[t].opps.map(id=>SUG[id]):PLAN).map(s=>({s,r:sugRoi(s.id,S.cost)})).sort((a,b)=>b.r.back-a.r.back).slice(0,5);
   return {h:`<p>${t?`For <b>${TEAM[t].name}</b>`:'Company-wide'}, ranked by hours back per week:</p>${mtbl(['Suggestion','h/week','$/month','Payback'],list.map(x=>[`<b>${x.s.t}</b>`,x.r.back.toFixed(1),money(x.r.month),'≈'+Math.round(x.r.payback)+' wk']))}<p>Start with <b>${list[0].s.t}</b>: ${list[0].s.what.split('.')[0].toLowerCase()}. ${list[0].s.human[0]} stays with a person.</p><p class="muted">Model at ${money(S.cost)}/h loaded cost — adjustable in the plan.</p>`, s:[t?chipT(t):chipC(),chipPlan()]}; } },
 {id:'roi', kw:[['roi',3],['value',1.4],['value of',2.2],['worth it',2.2],['worth',1.8],['save',1.4],['saving',1.6],['savings',1.8],['dollars',1.8],['money',1.6],['return',1.4],['payback',2.2],['business case',2.4],['how much could we',2],['financial impact',2.2]], fn:(e)=>{
   if(e.sug){ const s=SUG[e.sug], x=sugRoi(s.id,S.cost); return {h:`<p><b>${s.t}</b> (${DIR[s.dir].n}): about <b>${x.back.toFixed(1)} h/week</b> back for ${x.people.length} people ≈ <b>${money(x.month)}/month</b>. Build effort ${s.eff} person-weeks, payback ≈ ${Math.round(x.payback)} weeks.</p><p>Evidence: ${x.eps.toLocaleString('en-US')} sessions over 3 weeks, ${x.obs.toFixed(1)} h/week on the affected tasks, ${Math.round(s.take*100)}% of it an agent can take. ${s.human[0]} stays human.</p><p class="muted">${x.back.toFixed(1)} h × 4.33 × ${money(S.cost)}/h. Model, not a promise.</p>`, s:[chip('Suggestion · '+s.t,`data-sug="${s.id}"`),chipPlan()]}; }
   if(e.dir){ const d=DIR[e.dir], r=dirRoi(e.dir,S.cost); return {h:`<p><b>${d.n}</b> — ${r.items.length} suggestions:</p>${mtbl(['Suggestion','h/week','$/month'],r.items.map(s=>{const x=sugRoi(s.id,S.cost); return [s.t,x.back.toFixed(1),money(x.month)];}))}<p>Total <b>${r.back.toFixed(1)} h/week</b> back for ${r.people} people ≈ <b>${money(r.month)}/month</b>. Build effort ${r.eff} person-weeks, payback ≈ ${Math.round(r.payback)} weeks.</p><p class="muted">${r.back.toFixed(1)} h × 4.33 × ${money(S.cost)}/h. Model, not a promise.</p>`, s:[chipPlan()]}; }
   const rows=DIRS.map(d=>({d,r:dirRoi(d.id,S.cost)})); const back=rows.reduce((a,x)=>a+x.r.back,0);
   return {h:`<p>The full plan returns about <b>${back.toFixed(1)} h/week</b> ≈ <b>${money(back*WEEKS_PER_MONTH*S.cost)}/month</b> at ${money(S.cost)}/h loaded cost.</p>${mtbl(['Direction','h/week','$/month','Payback'],rows.map(x=>[x.d.n,x.r.back.toFixed(1),money(x.r.month),'≈'+Math.round(x.r.payback)+' wk']))}<p class="muted">Value = hours × 4.33 weeks × loaded cost. Payback = build effort ÷ hours back. Model, not a promise — change the cost in the plan.</p>`, s:[chipPlan()]}; } },
 {id:'who_knows', kw:[['who knows',3],['who can',1.8],['expert',2],['expertise',2],['knows how',2.4],['who handles',2.4],['who does',2],['who runs',2.4],['who is good at',2.6],['ask about',1.4],['go to person',2.4]], fn:(e,q)=>{
   const qt=toks(q).filter(t=>!STOP.has(t)&&!['who','knows','know','can','handles','does','runs','expert','expertise','good','person','best'].includes(t));
   const hits=[]; PEOPLE.forEach(p=>{ const pw=personWeek(p.id,S.wi); const items=[...ROLES[p.role].know.map(k=>({k:k.k,ev:fill(k.ev,pw)})), ...TEAMS.flatMap(t=>t.risks.filter(r=>r.who===p.id).map(r=>({k:r.t,ev:r.ev,risk:1})))];
     items.forEach(it=>{ const txt=toks(it.k+' '+ROLES[p.role].title); const sc=qt.filter(t=>t.length>=3 && txt.some(w=>tokMatch(t,w))).length; if(sc) hits.push({p,it,sc:sc+(it.risk?.5:0)}); }); });
   hits.sort((a,b)=>b.sc-a.sc); const seen=new Set(); const top=hits.filter(h=>!seen.has(h.p.id)&&seen.add(h.p.id)).slice(0,3);
   if(!top.length) return {h:`<p>I couldn’t find that topic in what people worked on. Try a system or task — for example <b>bordereaux</b>, <b>fee schedules</b>, <b>regression</b> or <b>endorsements</b>.</p>`, s:[chipC()]};
   return {h:`<p>From the work itself:</p><ul>${top.map(h=>`<li><b>${esc(nm(h.p))}</b> (${ROLES[h.p.role].title}, ${TEAM[h.p.team].name}) — ${h.it.k.toLowerCase()}. <span class="muted">${esc(h.it.ev)}.</span></li>`).join('')}</ul>${top.some(h=>h.it.risk)?'<p>That is a single point of knowledge — worth documenting first.</p>':''}`, s:top.map(h=>chipP(h.p.id)).slice(0,2)}; } },
 {id:'waits', kw:[['wait',2],['waits',2],['waiting',2],['bottleneck',2.4],['bottlenecks',2.4],['stuck',2],['delay',2],['delays',2],['queue',1.4],['handoff',2.2],['handoffs',2.2],['hand off',2.2],['slow',1.6],['sits',1.6],['blocked',1.8]], fn:(e)=>{
   const t=bestTeam(e); let hs=[]; if(t) hs=TEAM[t].hand; else { const seen=new Set(); TEAMS.forEach(x=>x.hand.forEach(h=>{ const k=h.what+h.from+h.to; if(!seen.has(k)){ seen.add(k); hs.push(h); } })); }
   hs=hs.map(h=>({...h,nn:h.n[S.wi],ww:h.wait[S.wi]})).sort((a,b)=>b.nn*b.ww-a.nn*a.ww).slice(0,5);
   return {h:`<p>${t?`In <b>${TEAM[t].name}</b>`:'Across the company'}, work waits longest here (${wk().label}):</p>${mtbl(['Handoff',S.wi<0?'In period':'Per week',S.wi<0?'Median weekly wait':'Median wait'],hs.map(h=>[`${h.what}<br><span class="muted">${teamName(h.from)} → ${teamName(h.to)}</span>`,h.nn,`<b>${h.ww} h</b>`]))}<p>The longest single wait is <b>${hs.slice().sort((a,b)=>b.ww-a.ww)[0].what.toLowerCase()}</b>.</p>`, s:[t?chipT(t):chipC()]}; } },
 {id:'adoption', kw:[['adoption',2.6],['adopt',2],['copilot',2.6],['chatgpt',2.4],['gpt',2],['ai tools',2.6],['using ai',2.6],['use ai',2.4],['already use',2],['ai usage',2.6]], fn:(e)=>{
   const cw=companyWeek(S.wi); const t=bestTeam(e);
   if(t){ const tw=teamWeek(t,S.wi); return {h:`<p><b>${TEAM[t].name}</b>: ${tw.adopters} of ${tw.ppl.length} people show an AI-tool trace; <b>${pct(tw.aiAssistDh,tw.dh,1)}</b> of work happened alongside one.</p><ul>${[...tw.ppl].sort((a,b)=>b.aiShare-a.aiShare).map(x=>`<li>${esc(nm(x.p))} — ${x.aiShare?pct(x.aiShare,1)+' of sessions · '+x.tools.join(', '):'no AI tool seen'}</li>`).join('')}</ul>`, s:[chipT(t)]}; }
   return {h:`<p><b>${cw.adopters} of ${PEOPLE.length}</b> people used an AI tool at least once in ${wk().label}; <b>${pct(cw.aiAssistDh,cw.dh,1)}</b> of recorded work happened alongside one. It is personal and ad hoc — none of it is built into a process yet.</p>${mbars(cw.tw.map(x=>[x.t.name,x.aiAssistDh/x.dh,pct(x.aiAssistDh,x.dh,1)]),Math.max(...cw.tw.map(x=>x.aiAssistDh/x.dh)))}`, s:[chipC()]}; } },
 {id:'compare', kw:[['compare',2.6],['comparison',2.6],['versus',2],['vs',1.6],['side by side',2.6],['difference between',2.4],['benchmark teams',2.4],['all teams',1.8],['each team',1.8],['teams',1]], fn:()=>{ const cw=companyWeek(S.wi);
   return {h:`<p>Teams side by side, ${wk().label}:</p>${mtbl(['Team','People','Hours','AI could take','Switch/h'],cw.tw.map(x=>[x.t.name,x.ppl.length,Hn(x.dh),pct(x.aiDh,x.dh),x.sw.toFixed(1)]))}<p><b>Claims intake</b> carries the most hours and the most context switching; <b>${cw.tw.slice().sort((a,b)=>b.aiDh/b.dh-a.aiDh/a.dh)[0].t.name}</b> has the highest share AI could take.</p>`, s:[chipC()]}; } },
 {id:'busiest', kw:[['busiest',2.6],['most loaded',2.6],['overloaded',2.4],['most hours',2.4],['heaviest',2.4],['under pressure',2.2],['workload',1.8],['capacity',1.8],['most work',2.2]], fn:(e)=>{ const cw=companyWeek(S.wi); const t=bestTeam(e);
   if(t){ const tw=teamWeek(t,S.wi); const ppl=[...tw.ppl].sort((a,b)=>b.dh-a.dh); return {h:`<p>Workload in <b>${TEAM[t].name}</b> (not a ranking):</p>${mbars(ppl.map(x=>[esc(nm(x.p)),x.dh,H(x.dh),x.aiDh/x.dh]),ppl[0].dh)}`, s:[chipT(t)]}; }
   const r=cw.tw.slice().sort((a,b)=>b.dh/b.ppl.length-a.dh/a.ppl.length);
   return {h:`<p>Hours per person, ${wk().label}:</p>${mbars(r.map(x=>[x.t.name,x.dh/x.ppl.length,(x.dh/10/x.ppl.length).toFixed(1)+' h']),r[0].dh/r[0].ppl.length)}<p>Outside working hours: <b>${r.slice().sort((a,b)=>b.afterMin-a.afterMin)[0].t.name}</b> leads with ${hm(r.slice().sort((a,b)=>b.afterMin-a.afterMin)[0].afterMin)}.</p>`, s:[chipC()]}; } },
 {id:'duplicate', kw:[['duplicate',2.6],['duplicated',2.6],['duplication',2.6],['twice',2.2],['rekey',2.6],['re key',2.6],['re keyed',2.6],['retype',2.4],['re type',2.4],['double entry',2.6],['copy paste',2.4],['copied',1.6],['same data',2]], fn:(e)=>{ const t=bestTeam(e); const teams=t?[TEAM[t]]:TEAMS;
   const rows=teams.flatMap(x=>x.dup.map(d=>({x,d,...dupHours(x.id,S.wi,d)}))).sort((a,b)=>b.h-a.h).slice(0,6);
   return {h:`<p>Work done twice${t?` in <b>${TEAM[t].name}</b>`:''}, ${wk().label}:</p>${mtbl(['What','Team','h/week'],rows.map(r=>[r.d.t,r.x.name,r.h.toFixed(1)]))}<p>Total <b>${rows.reduce((a,r)=>a+r.h,0).toFixed(1)} h</b> a week of re-keying — the easiest hours to give back.</p>`, s:[t?chipT(t):chipC()]}; } },
 {id:'after_hours', kw:[['after hours',2.8],['overtime',2.8],['evenings',2.4],['evening',2.2],['late',1.6],['weekend',2],['burnout',2.6],['work life',2.4],['long days',2.4],['outside working hours',2.8]], fn:(e)=>{ const t=bestTeam(e); const all=[0,1,2].map(i=>t?teamWeek(t,i):companyWeek(i));
   return {h:`<p>Time outside 7:30–18:00${t?` in <b>${TEAM[t].name}</b>`:' across the company'}:</p>${mtbl(['Week','Outside hours','Share'],all.map((x,i)=>[WEEKS[i].label,hm(x.afterMin),pct(x.afterMin/6,x.dh,1)]))}<p>${t==='fin'?'The jump in week 3 is month-end close.':t==='intake'?'Week 2 follows the storm-related FNOL spike.':'It rises in heavy weeks: Claims intake in week 2 (storm), Finance in week 3 (month-end).'}</p>`, s:[t?chipT(t):chipC()]}; } },
 {id:'focus', kw:[['context switching',3],['switching',2.4],['switches',2.4],['interruptions',2.4],['interrupted',2.2],['focus',2.2],['fragmented',2.4],['fragmentation',2.4],['multitasking',2.4],['deep work',2.4]], fn:(e)=>{ const cw=companyWeek(S.wi); const r=cw.tw.slice().sort((a,b)=>b.sw-a.sw);
   return {h:`<p>App switches per hour, ${wk().label} (company ${cw.sw.toFixed(1)}):</p>${mbars(r.map(x=>[x.t.name,x.sw,x.sw.toFixed(1)]),r[0].sw)}<p><b>${r[0].t.name}</b> switches most — ${pct(r[0].frag,1)} of its time is in blocks under 15 minutes, mostly between email, ClaimCenter and the document portal.</p>`, s:[chipT(r[0].t.id)]}; } },
 {id:'risk', kw:[['single point',3],['key person',2.8],['bus factor',3],['risk',1.6],['risks',1.6],['only one person',3],['depends on one',2.8],['knowledge risk',3],['if someone leaves',2.8],['out sick',2.4],['dependency',2]], fn:(e)=>{ const t=bestTeam(e); const rs=(t?[TEAM[t]]:TEAMS).flatMap(x=>x.risks.map(r=>({x,r})));
   return {h:`<p>Single points of knowledge${t?` in <b>${TEAM[t].name}</b>`:''}:</p><ul>${rs.map(({x,r})=>`<li><b>${r.t}</b> — ${esc(nm(PERSON[r.who]))}, ${x.name}. <span class="muted">${r.ev}</span></li>`).join('')}</ul><p>Silow can turn the recorded steps into a written procedure before anyone is out.</p>`, s:[t?chipT(t):chipC()]}; } },
 {id:'apps', kw:[['apps',1.8],['app',1.4],['tools',1.2],['software',1.8],['systems',1.6],['which applications',2.4],['time in',1.2],['how much time in',2]], fn:(e)=>{ const cw=companyWeek(S.wi);
   if(e.app){ const rows=cw.tw.map(x=>[x.t.name,x.apps[e.app]||0]).filter(r=>r[1]).sort((a,b)=>b[1]-a[1]); const tot=rows.reduce((a,r)=>a+r[1],0);
     return {h:`<p><b>${e.app}</b>: ${H(tot)} in ${wk().label} — ${pct(tot,cw.dh,1)} of all recorded time.</p>${mbars(rows.map(r=>[r[0],r[1],H(r[1])]),rows[0][1])}`, s:[chipC()]}; }
   const apps=Object.entries(cw.apps).sort((a,b)=>b[1]-a[1]).slice(0,7);
   return {h:`<p>Top apps, ${wk().label}:</p>${mbars(apps.map(a=>[a[0],a[1],H(a[1])]),apps[0][1])}<p>No connectors needed — Silow sees the apps on screen.</p>`, s:[chipC()]}; } },
 {id:'process', kw:[['process',2],['processes',2],['steps',1.8],['step by step',2.4],['workflow',2],['how does',1.2],['work end to end',2.4],['map',1.6],['flow',1.4]], fn:(e)=>{
   if(!e.proc){ return {h:`<p>Five processes are mapped from the recordings:</p>${mtbl(['Process','Hands-on / run','Waiting / run'],PROCS.map(p=>{const s=procStats(p); return [p.n,hm(s.hands),s.wait+' h'];}))}<p>Ask about one — for example “how does medical bill to payment work?”</p>`, s:[chip('Process maps','data-proc="p1"')]}; }
   const p=PROC[e.proc], s=procStats(p);
   return {h:`<p><b>${p.n}</b> — ${p.d}</p><ol>${p.steps.map(x=>`<li>${x.s} · <span class="muted">${x.who}, ${x.app}, ${hm(x.min)}${x.wait?`, waits ${x.wait} h before`:''}</span> — <b>${x.ai==='agent'?'agent can take':x.ai==='assist'?'AI assists':'stays human'}</b></li>`).join('')}</ol><p>${hm(s.hands)} hands-on and ${s.wait} h of waiting per run; an agent can take ${hm(s.agentMin)} of the hands-on time.</p>`, s:[chipPr(p.id)]}; } },
 {id:'trend', kw:[['trend',2.4],['changed',2],['change',1.4],['last week',2.4],['previous week',2.4],['week over week',2.8],['over time',2],['spike',2],['growing',1.8],['month end',2.4],['close',1.2],['compared to last',2.4]], fn:(e)=>{ const t=bestTeam(e)||(/month|close/.test(norm(e.q||''))?'fin':null); const all=[0,1,2].map(i=>t?teamWeek(t,i):companyWeek(i));
   return {h:`<p>${t?`<b>${TEAM[t].name}</b>`:'Company'} over three weeks:</p>${mtbl(['Week','Hours','AI could take','After hours'],all.map((x,i)=>[WEEKS[i].label,Hn(x.dh),Hn(x.aiDh),hm(x.afterMin)]))}<p>${t==='fin'?'Week 3 is month-end: reconciliation and pack work rise about a third.':t==='intake'?'Week 2 is a storm-related FNOL spike.':t==='qa'?'Week 3 is a release week.':'Hours grow each week: a storm in week 2 (Claims intake), a release and month-end in week 3.'}</p>`, s:[t?chipT(t):chipC()]}; } },
 {id:'agents', kw:[['agent',2],['agents',2.2],['what would you build',2.8],['build',1.4],['bot',1.6],['bots',1.6],['what gets built',2.8],['automate it',1.6]], fn:()=>{ const top=PLAN.map(s=>({s,b:evidence(s.id).back})).sort((a,b)=>b.b-a.b).slice(0,3);
   return {h:`<p>Silow builds agents from the recorded procedure — first in shadow mode, then live once the owner approves. The first three:</p><ul>${top.map(x=>`<li><b>${x.s.t}</b> — ${x.s.build.join(' → ')}. <span class="muted">Approver: ${x.s.approver}.</span></li>`).join('')}</ul><p>Agents run inside your perimeter, and a named person approves every consequential step.</p>`, s:[chipPlan()]}; } },
 {id:'human', kw:[['stays human',3],['human in the loop',3],['approve',2],['approval',2],['approvals',2],['who decides',2.6],['oversight',2.4],['control',1.2],['replace people',2.6],['replace jobs',2.6],['jobs',1.6],['layoffs',2.6]], fn:()=>({h:`<p>Agents draft, match and prepare. <b>People decide</b>: a named owner approves every consequential step — submitting a claim, coverage judgement, payment approval, posting entries, release go/no-go.</p><p>The aim is to take the re-keying and assembly off people’s plates, not to replace the judgement your teams are paid for. Every agent run is in the audit log.</p>`, s:[chipPlan()]}) },
 {id:'deploy', kw:[['install',2.6],['installed',2.6],['installation',2.6],['deploy',2.6],['deployment',2.6],['on prem',2.8],['onprem',2.8],['docker',2.6],['compose',2],['self host',2.6],['self hosted',2.6],['infrastructure',2],['servers',1.8],['set up',1.4],['kubernetes',2.4],['our team install',2.6]], fn:()=>({h:`<p>Two ways to run it:</p><ul><li><b>Silow-hosted</b> — fastest start: install the recorder and go, no infrastructure work on your side. Raw captures are deleted within 48 hours; only derived patterns are kept. Silow is your data processor under a DPA.</li><li><b>On your servers</b> — everything inside your perimeter: one <b>Docker Compose</b> package, an install README, an <b>acceptance script</b> that checks every stage (health, capture upload, redaction, screen → steps, steps → tasks, weekly reports), <b>SSO / SAML</b> and audit logs.</li></ul><p>The recorder is the same in both: macOS, Windows or Linux, about a minute to install, 1–2% CPU, no connectors.</p>`, s:[chipDoc('Deployment guide')]}) },
 {id:'perimeter', kw:[['leave',2.4],['leaves',2.4],['leaving',2.4],['perimeter',2.8],['outside our',2],['cloud',1.6],['sent to',1.8],['send',1],['upload',1.4],['third party',2],['external',1.6],['silow see',2.6],['silow access',2.6],['you see our data',2.6],['our network',2],['data go',2.4],['where does the data',2.6],['screenshots',1.6],['video',1.4]], fn:()=>({h:`<p>It depends on how you deploy:</p><ul><li><b>On your servers</b> — capture, storage, redaction and processing run inside your perimeter. <b>Screenshots and video never reach Silow.</b> Models run on your GPUs, in your own cloud account, or on a zero-data-retention provider you choose.</li><li><b>Silow-hosted</b> — captures are processed on Silow’s servers, raw captures are deleted within 48 hours and only derived patterns are kept. Subprocessors: a major cloud provider (ISO 27001 / 27017 / 27018) and model inference with zero data retention.</li></ul><p>For PHI, use your own servers.</p>`, s:[chipDoc('Security overview')]}) },
 {id:'hipaa', kw:[['hipaa',3],['phi',3],['pii',3],['medical',1.6],['health',1.4],['redact',2.6],['redaction',2.6],['redacted',2.6],['mask',2.4],['masked',2.4],['masking',2.4],['sensitive',2],['personal data',2.4],['claimant data',2.4],['privacy',2.2],['compliance',1.8]], fn:()=>({h:`<p>PII and PHI are <b>masked by Silow’s own model before any analysis</b>. The raw screenshot is deleted once redaction is done; what remains is the shape of the work — app, step, time — with names, dates of birth and diagnoses replaced by typed tokens.</p><ul><li>Encrypted in transit and at rest</li><li>No keystrokes, no message content, no individual scoring</li><li>For PHI: on your own servers, on your models</li></ul><p>Silow is already in production in a HIPAA-regulated environment: a US insurance-claims operation handling medical documents daily, 100% on-prem. Contract terms such as a BAA are for your legal team and ours to confirm.</p>`, s:[chipDoc('Security overview')]}) },
 {id:'models', kw:[['model',1.6],['models',1.8],['llm',2.6],['gpu',2.6],['gpus',2.6],['openai',2.6],['anthropic',2.6],['gemini',2.6],['provider',2],['inference',2.4],['zero data retention',3],['zdr',3],['which ai',2.4],['own model',2.4]], fn:()=>({h:`<p>On your servers, you choose where models run:</p>${mtbl(['Option','What leaves'],[['Your own GPUs (on-prem)','Nothing leaves the building'],['GPUs in your own cloud account','Nothing leaves your tenant'],['Zero-data-retention provider on your account','Redacted data, processed and not retained']])}<p>Redaction always runs before anything is analyzed. In the Silow-hosted mode, model inference runs under zero data retention and never trains on your data.</p>`, s:[chipDoc('Architecture')]}) },
 {id:'retention', kw:[['encrypt',2.6],['encryption',2.6],['encrypted',2.6],['retention',2.6],['retain',2.4],['delete',2.2],['deleted',2.2],['deletion',2.4],['how long',1.8],['storage',1.8],['stored',1.8],['keep data',2.4],['backups',2]], fn:()=>({h:`<ul><li>Data is <b>encrypted in transit and at rest</b>.</li><li>On your servers: the <b>raw screenshot is deleted once redaction is done</b>, and retention follows your policies.</li><li>Silow-hosted: raw captures are <b>deleted within 48 hours</b>; only derived patterns are kept.</li></ul><p class="muted">Default retention periods for steps and reports are part of the security review — we’ll confirm them in writing for your environment.</p>`, s:[chipDoc('Security overview')]}) },
 {id:'monitoring', kw:[['keystroke',3],['keystrokes',3],['keylogger',3],['spy',2.6],['spying',2.6],['surveillance',2.8],['monitor employees',2.8],['monitoring',2],['scoring',2.4],['score',1.8],['productivity score',2.8],['rank people',2.6],['ranking',2],['big brother',3],['private messages',2.6],['read emails',2.4],['employees feel',2.2],['union',2]], fn:()=>({h:`<p>Silow is about <b>the work, not the worker</b>:</p><ul><li>No keystroke logging, no private message content</li><li><b>No individual scoring</b> or productivity ranking</li><li>Personal reports are written for the person themself</li><li>Anonymous mode replaces names with stable pseudonyms everywhere — try the toggle at the top</li></ul>`, s:[chipDoc('Privacy principles')]}) },
 {id:'price', kw:[['price',2.6],['pricing',2.6],['cost',1.4],['costs',1.4],['how much is',2],['how much does',2],['license',2.6],['licence',2.6],['per user',2.4],['per seat',2.4],['subscription',2.4],['budget',1.8]], fn:()=>({h:`<p>Pricing depends on deployment and team size — we’ll walk you through it on a call.</p>`, s:[chipDoc('Book a 30-minute call')]}) },
 {id:'pilot', kw:[['pilot',2.8],['trial',2.4],['one month',2.6],['first month',2.4],['next step',2.6],['next steps',2.6],['get started',2.6],['how do we start',2.8],['timeline',1.8],['how long',1.4],['proof of concept',2.8],['poc',2.6]], fn:()=>({h:`<p>Start with a <b>free month</b> — you choose the team, typically 20–30 people.</p><ol><li><b>Week 1</b> — recorder installed, recording, first personal reports</li><li><b>Week 2</b> — the team map and the ranked plan</li><li><b>Weeks 3–4</b> — first agents scoped and approved by you</li></ol>`, s:[chipDoc('Pilot plan')]}) },
 {id:'accuracy', kw:[['accurate',2.6],['accuracy',2.6],['how do you know',2.8],['methodology',2.8],['where do the numbers',2.8],['numbers come from',2.8],['estimate',1.8],['estimated',1.8],['reliable',2.2],['trust',1.8],['how calculated',2.6],['how is this calculated',2.8],['assumption',2],['assumptions',2]], fn:()=>({h:`<p>Every number comes from recorded screen time, grouped into tasks and work streams. People sum to teams, teams to the company.</p><ul><li><b>“AI could take”</b> is an estimate by task type (rule-based, draftable, judgement)</li><li><b>Hours back</b> = observed hours on the affected tasks × the share an agent can take</li><li><b>Value</b> = hours × 4.33 weeks × your loaded hourly cost (${money(S.cost)}/h here, adjustable)</li></ul><p>It is a model, not a promise — a shadow run validates each agent before it goes live.</p>`, s:[chipPlan()]}) },
 {id:'sso', kw:[['sso',3],['saml',3],['okta',2.8],['entra',2.8],['azure ad',2.8],['active directory',2.6],['identity provider',2.8],['audit log',2.8],['audit logs',2.8],['audit',2],['access control',2.6],['permissions',2.4],['rbac',2.8],['who can see',2.6]], fn:()=>({h:`<ul><li><b>SSO / SAML</b> through your identity provider</li><li><b>Audit logs</b>: who accessed what, and when — including every agent run</li><li>Your admins choose who sees personal, team and company reports, and whether names are shown at all</li></ul>`, s:[chipDoc('Security overview')]}) },
 {id:'anon', kw:[['anonymous',2.8],['anonymized',2.8],['anonymise',2.6],['pseudonym',2.8],['pseudonyms',2.8],['names',1.8],['real names',2.8],['identity',1.6],['who is',1.4],['identify',2]], fn:()=>({h:`<p>${S.anon?'<b>Anonymous mode is on.</b> People appear as stable pseudonyms such as <b>'+PEOPLE[12].pseudo+'</b>, and I won’t map a pseudonym back to a name.':'<b>Named mode is on.</b> Switch to Anonymous at the top to replace every name with a stable pseudonym.'}</p><p>The setting applies everywhere — people lists, team reports, the plan and my answers. Your admins decide which mode each audience sees.</p>`, s:[chipDoc('Privacy principles')]}) },
];

function classify(q){
  const e=entities(q); e.q=q; const qn=norm(q), qt=toks(q).filter(t=>!STOP.has(t));
  let best=null, bs=0;
  for(const it of INTENTS){
    if(it.need && !e[it.need]) continue;
    let sc=0; for(const [ph,w] of it.kw){ const m=has(qt,qn,ph); if(m) sc+=w*m; }
    if(it.need && sc>0) sc+=1.2;
    if(it.id==='company_time' && (e.team||e.person)) sc-=1;
    if(it.id==='roi' && (e.dir||e.sug)) sc+=.4;
    if(it.id==='process' && e.proc) sc+=.8;
    if(it.id==='apps' && e.app) sc+=1;
    if(sc>bs){ bs=sc; best=it; }
  }
  if(bs<1.4){ if(e.person) best=INTENTS.find(i=>i.id==='person_time'); else if(e.team) best=INTENTS.find(i=>i.id==='team_overview'); else if(e.proc) best=INTENTS.find(i=>i.id==='process'); else if(e.app) best=INTENTS.find(i=>i.id==='apps'); else best=null; }
  return { intent: best ? best.id : 'fallback', e, score:+bs.toFixed(2) };
}
function answer(m){
  const { intent, e } = m;
  if(e.person && e.byName && S.anon && ['person_time','person_recs','person_knows'].includes(intent))
    return {h:`<p><b>Anonymous mode is on</b>, so I won’t look people up by name or map a name to a pseudonym. Ask about a role or code — for example “what does ${PEOPLE[12].pseudo} work on?” — or switch to Named if your admins allow it.</p>`, s:[chipDoc('Privacy principles')]};
  if(intent==='fallback') return {h:`<p>I don’t have a prepared answer for that in this sample. In production I answer any question from <b>your own recorded work</b>, on your own models.</p><p>Here I can tell you where time goes, what to automate first and what it’s worth, who knows what, where work waits, AI adoption, process steps, and how deployment and privacy work.</p>`, s:[chipDoc('Sample demo')]};
  const it=INTENTS.find(i=>i.id===intent); return it.fn(e, e.q);
}
const SUGGEST = [...CX.suggest, 'Where does Claims intake’s time go?','What should we automate first?','What is the ROI for claims testing?','Who knows the reinsurance bordereaux?','Where does work wait the longest?','Does anything leave our network?','How do you handle PHI?','How is it installed?'];
function rAsk(){
  const hero = S.msgs.length ? '' : `<div class="ask-hero"><img src="./silow-mark.svg" alt=""><h1>Ask about Harbor Mutual’s work</h1><p>Answers come from recorded work — processes step by step, people, teams and the plan.</p><div class="sugs">${SUGGEST.slice(0,10).map(s=>`<button data-ask="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>`;
  const msgs = S.msgs.map((m,i)=>{ const a = m.pending ? null : answer(m);
    return `<div class="mq">${esc(m.q)}</div><div class="ma" data-intent="${m.intent}"><span class="lg"><img src="./silow-mark.svg" alt=""></span><div>${a?a.h+`<div class="src">${a.s.join('')}${chipDoc('On-prem · your models')}</div>`:'<span class="typing"><i></i><i></i><i></i></span>'}</div></div>`; }).join('');
  $('#v-ask').innerHTML = `<div class="chat"><div class="chat-col">${hero}<div class="msgs" id="msgs">${msgs}</div>${S.msgs.length?`<div class="sugs" style="justify-content:flex-start;margin-top:20px">${SUGGEST.filter(s=>!S.msgs.some(m=>m.q===s)).slice(0,4).map(s=>`<button data-ask="${esc(s)}">${esc(s)}</button>`).join('')}</div>`:''}</div>
    <div class="composer-wrap"><form class="composer" id="cform"><input id="cq" placeholder="Ask anything about the work — any wording" autocomplete="off" aria-label="Ask Silow"><button class="send" aria-label="Send">${ic('up',16,2.2)}</button></form>
    <div class="composer-f">${ic('lock',12,2)}Sample demo · prepared answers · in production Silow answers from your own data on your own models</div></div></div>`;
  $('#cform').onsubmit = ev=>{ ev.preventDefault(); ask($('#cq').value); };
  $$('[data-ask]').forEach(b=>b.onclick=()=>ask(b.dataset.ask));
  const sb=$('#sbody'); sb.style.scrollBehavior='auto'; sb.scrollTop=sb.scrollHeight; sb.style.scrollBehavior='';
}
function ask(q){ q=(q||'').trim(); if(!q) return; const c=classify(q); const m={q, ...c, pending:true}; S.msgs.push(m); window.__lastIntent=c; rAsk();
  setTimeout(()=>{ m.pending=false; if(S.view==='ask') rAsk();else if(S.view==='home')rHome(); setTimeout(()=>{ const i=$('#cq'); if(i && !matchMedia('(max-width:900px)').matches) i.focus(); },0); }, 520); }

if(new URLSearchParams(location.search).has('embed')) document.body.classList.add('embed');
if(new URLSearchParams(location.search).has('workflow'))document.body.classList.add('workflow');
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

shell();
setupRedesign();
periodControl();
periodControl();fromHash(); render();
addEventListener('hashchange',()=>{ fromHash(); render(); });
addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeSug(); closePop(); } });
if(document.body.classList.contains('embed')) addEventListener('keydown',e=>{ if(e.target.closest && e.target.closest('input,textarea')){ if(['PageDown','PageUp'].includes(e.key)) e.preventDefault(); return; } if(['PageDown','PageUp','ArrowLeft','ArrowRight'].includes(e.key)){ e.preventDefault(); parent.postMessage({silowDeckKey:e.key},'*'); } });
