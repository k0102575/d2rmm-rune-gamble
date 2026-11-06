import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const read = p => fs.readFileSync(new URL(p,root),'utf8');
const code=read('ProbabilisticRuneDowngrade/mod.js');
const metadata=JSON.parse(read('ProbabilisticRuneDowngrade/mod.json'));
const defaults=Object.fromEntries(metadata.config.map(c=>[c.id,c.defaultValue]));
const schema=JSON.parse(read('ProbabilisticRuneDowngrade/research/schema.json'));
function fixture() {
  const tables=structuredClone(schema);
  const make=(t,v)=>Object.assign(Object.fromEntries(t.headers.map(k=>[k,''])),v);
  const misc=tables.misc;
  misc.rows=[make(misc,{code:'isc',stackable:'0'})];
  for(let i=1;i<=33;i++) misc.rows.push(make(misc,{code:'r'+String(i).padStart(2,'0'),type:'rune',stackable:'0',namestr:'r'+String(i).padStart(2,'0'),invfile:'invr'+i,flippyfile:'flprun',alternategfx:'r'+String(i).padStart(2,'0')}));
  tables.itemstatcost.rows=Array.from({length:368},(_,i)=>make(tables.itemstatcost,{Stat:'synthetic_'+i,'*ID':String(i)}));
  return tables;
}
function run(overrides={},change=()=>{},actual=false) {
  const tables=fixture(), writes=[]; let next=50000;
  if(actual) for(const k of Object.keys(tables)) {
    const lines=fs.readFileSync('/tmp/rg-'+k+'.txt','utf8').replace(/\r/g,'').trimEnd().split('\n');
    const headers=lines.shift().split('\t');
    tables[k]={headers,rows:lines.map(l=>Object.fromEntries(l.split('\t').map((v,i)=>[headers[i],v])))};
  }
  let hd=actual ? JSON.parse(fs.readFileSync('/tmp/rg-items.json','utf8')) : Array.from({length:33},(_,i)=>({['r'+String(i+1).padStart(2,'0')]:{asset:'rune/test_'+(i+1)}})), strings=Array.from({length:33},(_,i)=>({Key:'r'+String(i+1).padStart(2,'0'),enUS:i===23?'Ist Rune':'Rune '+(i+1),koKR:i===23?'이스트룬':'룬 '+(i+1)}));
  change(tables);
  const originalStatRows=JSON.stringify(tables.itemstatcost.rows);
  const api={getVersion:()=>1.9,getNextStringID:()=>next++,readTsv:p=>{const k=p.split('\\').at(-1).replace('.txt','');return tables[k];},writeTsv:(p,t)=>writes.push([p,t]),readJson:p=>p.startsWith('hd')?hd:strings,writeJson:(p,t)=>writes.push([p,t])};
  let error;
  try{vm.runInNewContext(code,{config:{...defaults,...overrides},D2RMM:api,console:{log(){}}},{timeout:5000});}catch(e){error=e;}
  return {tables,writes,error,hd,strings,originalStatRows};
}
let checks=0;
function verify(overrides={},actual=false,change=()=>{}) {
 const result=run(overrides,change,actual); assert.equal(result.error,undefined,String(result.error));
 const {tables:t,writes,hd,strings}=result;
 const rows=t.cubemain.rows.filter(r=>r.description.startsWith('PRDG:'));
 const ranks=32;
 assert.ok(!metadata.config.some(c=>c.id==='istOnly'));
 assert.equal(metadata.name,'Probabilistic Rune Downgrade');
 assert.equal(metadata.author,'빵길빵길');
 assert.equal(metadata.version,'0.1.0');
 assert.equal(rows.length,ranks*101);assert.equal(writes.length,7);
 const rollIndex=t.itemstatcost.rows.findIndex(r=>r.Stat==='prg_roll');
 assert.equal(rollIndex,t.itemstatcost.rows.length-1);
 assert.equal(JSON.stringify(t.itemstatcost.rows.slice(0,rollIndex)),result.originalStatRows);
 assert.ok(rows.filter(r=>r.numinputs==='1').every(r=>r.param===String(rollIndex)));
 assert.ok(writes.filter(([p])=>p.endsWith('.txt')).every(([p])=>p.startsWith('global\\excel\\') && !p.includes('base')));
 assert.ok(!metadata.config.some(c=>c.id==='tablePath')); 
 const chances=['doubleChance','singleChance','returnChance','missChance'].map(k=>({...defaults,...overrides})[k]);
 for(const start of rows.filter(r=>r.numinputs==='2')) {
  assert.equal(start['input 2'],'isc');assert.equal(start['mod 1 min'],'1');assert.equal(start['mod 1 max'],'100');
  const pending=start.output.split(',')[0]; assert.equal(pending.length,3); assert.match(pending,/^pg[0-9a-v]$/);
  const item=t.misc.rows.find(r=>r.code===pending); assert.equal(item.compactsave,'0');assert.equal(item.type,'prgp');assert.equal(item.stackable,'0');assert.equal(item.type2,'');
  if(t.misc.headers.includes('auto prefix')) assert.equal(item['auto prefix'],'');
  else assert.ok(!Object.hasOwn(item,'auto prefix'));
  for(const field of ['normcode','ubercode','ultracode']) {
   if(t.misc.headers.includes(field)) assert.equal(item[field],'');
   else assert.ok(!Object.hasOwn(item,field));
  }
  assert.ok(Object.keys(item).every(k=>t.misc.headers.includes(k)));
  const inputRune=t.misc.rows.find(r=>r.code===start['input 1']);
  for(const field of ['invfile','flippyfile','alternategfx']) assert.equal(item[field],inputRune[field]);
  assert.equal(JSON.stringify(hd.find(x=>x[pending])[pending]),JSON.stringify(hd.find(x=>x[start['input 1']])[start['input 1']]));
  const sourceName=strings.find(x=>x.Key===inputRune.namestr);
  const pendingName=strings.find(x=>x.Key===item.namestr);
  assert.equal(pendingName.koKR,sourceName.koKR+' — 분해 대기');
  assert.equal(pendingName.enUS,sourceName.enUS+' — Pending Downgrade');
  const matches=rows.filter(r=>r['input 1']===pending);assert.equal(matches.length,100);
  const counts=[0,0,0,0], input=start['input 1'], lower='r'+String(Number(input.slice(1))-1).padStart(2,'0');
  for(let roll=1;roll<=100;roll++) {
   const m=matches.filter(r=>r.op==='18' && Number(r.value)===roll);assert.equal(m.length,1);
   const r=m[0],outcome=r.output===lower?(r['output b']?0:1):r.output===input?2:3;
   assert.equal(r.output,outcome===3?'isc':outcome===2?input:lower);
   assert.equal(r['output b'],outcome===0?lower:'');assert.equal(r['mod 1'],'');counts[outcome]++;
  }
  assert.deepEqual(counts,chances);
 }
 checks++;
}
verify();verify({istOnly:true}); // stale saved checkbox must not restrict ranks
// Exactly one zero-probability result, with all other results positive.
// verify() exhausts rolls 1..100 for every rank and checks exact output counts.
for(const chances of [[0,34,33,33],[33,0,34,33],[33,33,0,34],[34,33,33,0]]) {
 verify(Object.fromEntries(['doubleChance','singleChance','returnChance','missChance'].map((key,i)=>[key,chances[i]])));
}
// User's installation has no misc "auto prefix" column. Remove it from
// headers AND rows so the fixture matches what the TSV reader actually returns.
function withoutAutoPrefix(t) {
 t.misc.headers=t.misc.headers.filter(h=>h!=='auto prefix');
 for(const row of t.misc.rows) delete row['auto prefix'];
}
verify({doubleChance:100,singleChance:0,returnChance:0,missChance:0},false,withoutAutoPrefix);
verify({istOnly:false},false,withoutAutoPrefix);
// Related item-upgrade columns must not be required by misc schemas.
function withoutMiscColumns(t,columns) {
 t.misc.headers=t.misc.headers.filter(h=>!columns.includes(h));
 for(const row of t.misc.rows) for(const field of columns) delete row[field];
}
for(const field of ['normcode','ubercode','ultracode']) {
 verify({},false,t=>withoutMiscColumns(t,[field]));
}
const withoutOptionalMisc=t=>withoutMiscColumns(t,['auto prefix','normcode','ubercode','ultracode']);
verify({doubleChance:100,singleChance:0,returnChance:0,missChance:0},false,withoutOptionalMisc);
verify({istOnly:false},false,withoutOptionalMisc);
// Shipped-data annotation mismatch: row 212 can have *ID=213.
verify({doubleChance:100,singleChance:0,returnChance:0,missChance:0},false,t=>{
 withoutOptionalMisc(t);
 t.itemstatcost.rows[212]['*ID']='213';
});
verify({istOnly:false},false,t=>{
 for(const r of t.itemstatcost.rows) r['*ID']='';
});
verify({},false,t=>{
 while(t.itemstatcost.rows.length<510) {
  const i=t.itemstatcost.rows.length;
  t.itemstatcost.rows.push({Stat:'synthetic_'+i,'*ID':String(i)});
 }
});
for(let i=0;i<4;i++){const c={istOnly:false};['doubleChance','singleChance','returnChance','missChance'].forEach((k,j)=>c[k]=i===j?100:0);verify(c);}
for(const bad of [{doubleChance:51},{doubleChance:-1},{doubleChance:0.5},{doubleChance:'50'},{missChance:NaN}]) {
 const r=run(bad);assert.ok(r.error);assert.equal(r.writes.length,0);checks++;
}
for(const stat of ['different_stat']) {
 const r=run({},t=>t.properties.rows.push(
  {code:'item-mythic',func1:'8',stat1:'item_mythic'},
  {code:'item-mythic',func1:'8',stat1:stat},
  {code:'pierce-elem',func1:'1',stat1:'passive_fire_pierce'},
 ));
 assert.match(r.error?.message ?? '',/Conflicting item-mythic definitions/);
 assert.equal(r.writes.length,0);checks++;
}
// Relics adds the same Mythic property from a function and its payload.
// Keep row indices and every field except the redundant code unchanged.
for(const duplicates of [2,3]) {
 let before;
 const r=run({},t=>{
  t.properties.rows=Array.from({length:duplicates},()=>({code:'item-mythic',func1:'8',stat1:'item_mythic'}));
  t.properties.rows.push({code:'pierce-elem',func1:'1',stat1:'passive_fire_pierce',func2:'3',stat2:'passive_ltng_pierce',func3:'3',stat3:'passive_cold_pierce'});
  before=structuredClone(t.properties.rows);
 });
 assert.equal(r.error,undefined,String(r.error));
 const rows=r.tables.properties.rows;
 assert.equal(rows.length,before.length+1);
 assert.deepEqual(rows[0],before[0]);
 for(let i=1;i<duplicates;i++) {
  assert.equal(rows[i].code,'prg_mythic_'+i.toString(36));
  assert.deepEqual({...rows[i],code:'item-mythic'},before[i]);
 }
 assert.deepEqual(rows[duplicates],before[duplicates]);
 assert.equal(rows.at(-1).code,'prg_roll');
 assert.equal(new Set(rows.map(x=>x.code)).size,rows.length);
 assert.equal(rows.findIndex(x=>x.code==='prg_roll'),[...new Set(rows.map(x=>x.code))].indexOf('prg_roll'));
 checks++;
}
for(const mutate of [
 t=>t.properties.rows.push({code:'item-mythic',func1:'1',stat1:'item_mythic'},{code:'item-mythic',func1:'1',stat1:'item_mythic'}),
 t=>t.properties.rows.push({code:'prg_mythic_1',func1:'1'}),
]) {
 const r=run({},mutate);assert.ok(r.error);assert.equal(r.writes.length,0);checks++;
}
for(const mutate of [t=>t.misc.rows.find(r=>r.code==='r24').invfile='',t=>t.armor.rows.push({code:'prg0'}),t=>t.armor.rows.push({code:'pgm'}),t=>t.weapons.rows.push({code:'pgm'}),t=>t.misc.rows.push({code:'pgm'}),t=>t.misc.rows.push({...t.misc.rows[0],code:'prg0'}),t=>t.misc.headers=t.misc.headers.filter(h=>h!=='compactsave'),t=>t.misc.headers=t.misc.headers.filter(h=>h!=='component'),t=>t.misc.rows.find(r=>r.code==='r24').stackable='1',t=>t.itemstatcost.rows[2].Stat='',t=>t.itemstatcost.rows[2].Stat=t.itemstatcost.rows[1].Stat,t=>{while(t.itemstatcost.rows.length<511){let i=t.itemstatcost.rows.length;t.itemstatcost.rows.push({Stat:'synthetic_'+i,'*ID':String(i)});}}]) {
 const r=run({},mutate);assert.ok(r.error);assert.equal(r.writes.length,0);checks++;
}
if(fs.existsSync('/tmp/rg-cubemain.txt')) verify({istOnly:false},true);
const sha = s => createHash('sha256').update(s).digest('hex');
const inputs=Object.fromEntries(['ProbabilisticRuneDowngrade/mod.js','ProbabilisticRuneDowngrade/mod.json','ProbabilisticRuneDowngrade/research/schema.json','tools/verify.mjs'].map(p=>[p,sha(read(p))]));
const report={inputs,date:new Date().toISOString().slice(0,10),checks,status:'PASS',engine:'Node vm; mocked D2RMM API',actualTables:fs.existsSync('/tmp/rg-cubemain.txt'),limitations:'Not D2RMM installation or game execution. Installer checks only; game validation is separately user-reported. Reign of the Warlock only.'};
fs.writeFileSync(new URL('ProbabilisticRuneDowngrade/docs/LOCAL_VALIDATION.json',root),JSON.stringify(report,null,2)+'\n');
console.log(report);
