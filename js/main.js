const fmt=n=>"₹"+Math.round(n).toLocaleString("en-IN");
const $=id=>document.getElementById(id);

/* daily cards */
const DAY=[
 ["7:15 AM","Nourishment","A wholesome breakfast of gur (jaggery) and chana for every student.","Photo: breakfast"],
 ["7:30 – 9:30 AM","Spiritual development","Senior students chant four rounds of japa, hear Śrīmad-Bhāgavatam katha, recite Bhagavad-gītā ślokas, and offer Tulasī and Nṛsiṁha ārati, with dīpa-dāna during Kārtika. Junior students join for one hour.","Photo: morning assembly"],
 ["9:30 AM – 1:15 PM","Academic learning","Regular education in all subjects, with English and Hindi learning enriched through scriptural teachings.","Photo: study time"],
 ["Midday","Daily prasadam","A nutritious lunch prasadam lovingly served to every student. Fruits and samak khichdi on Ekādaśī and festivals.","Photo: prasadam"],
 ["2:00 – 4:00 PM","Creative development","Harmonium, mṛdaṅga and dance, stitching, art, painting and colouring, ribbon garlands and pearl jewellery, with occasional drama, to nurture creativity, confidence and skill.","Photo: music & crafts"],
 ["Through the year","Festivals & darśana","Holī, Dīpāvalī, Kārtika dīpa-dāna, Janmāṣṭamī, Gaura-pūrṇimā, and outings for darśana and parikramā.","Photo: festival"]
];
DAY.forEach(([t,h,p,ph])=>{const c=document.createElement("article");c.className="card";
  c.innerHTML=`<div class="photo"><div><svg><use href="#cam"/></svg><span></span></div></div><div class="body"><span class="time"></span><h3></h3><p></p></div>`;
  c.querySelector(".photo span").textContent=ph;c.querySelector(".time").textContent=t;c.querySelector("h3").textContent=h;c.querySelector(".body p").textContent=p;$("day-list").appendChild(c)});

const ACTS=[["Music: harmonium & mṛdaṅga","Harmonium, mṛdaṅga, karatālas, kīrtana, dance and stage programmes."],["Art, painting & colouring","Drawing, painting, colouring and festival decorations."],["Stitching & handicrafts","Stitching, ribbon garlands and pearl jewellery made by the children."],["Practical life skills","Cleanliness, responsibility and care for our shared space."],["Outdoor & indoor games","Jhūle, cycles and games that keep children healthy and joyful."],["Spiritual & value-based films","Inspiring spiritual and motivational movies on the LED screen."]];
ACTS.forEach(([h,p])=>{const a=document.createElement("div");a.className="act";a.innerHTML=`<svg viewBox="0 0 64 40"><use href="#lotus"/></svg><div><h3></h3><p></p></div>`;a.querySelector("h3").textContent=h;a.querySelector("p").textContent=p;$("acts").appendChild(a)});

/* donation */
const DATA={
  monthly:[["Salaries of teachers, principal, vice principal & helper",80000],["Daily lunch prasadam",50000],["Feast prasadam (1–2 per month)",20000],["Building maintenance: electrical, plumbing, toilets",10000],["Electricity bill",5000],["Notebooks",5000],["Breakfast (gur & chana)",5000],["Fruits for 2 Ekādaśīs",5000],["Repairs: machines, fans, coolers, laptops, instruments",5000],["Phone & Wi-Fi bills",2500],["Cleaning materials",2000],["Stationery",1000],["Paints, colours, markers, pens",1000],["Drinking water",800],["Tilaka",200]],
  onetime:[["Sheds",500000],["Flooring",400000],["6 second-hand laptops",200000],["Cameras",70000],["Musical instruments: mṛdaṅga, harmonium, karatālas",70000],["Almirahs & trunks",60000],["Tables",40000],["Inverter",30000],["LED TV for spiritual & motivational films",30000],["Black & white printer",30000],["Toilets",20000],["Phone",18000],["Coolers",17000],["10 fans",15000],["Jhūle (swings)",15000],["Mats",10000],["Altar",10000],["Stitching machines",10000],["Movable speaker",10000],["4 fixed speakers",10000],["Mic with fixed system",10000],["Cycles for students",5000],["Camera installation",5000],["Chairs",2000],["Lights",1000]],
  annual:[["2 sets of summer uniforms (dhotī, gopī dress)",120000],["2 sets of winter uniforms",120000],["Whitewash",60000],["Blankets",50000],["Books",40000],["ID cards",25000],["White / black boards",10000],["Festivals: Holī, Dīpāvalī, Kārtika dīpas",10000],["Costumes & make-up for stage programmes",10000],["Curtains, plastic or fibre sheets",10000],["Banners",5000],["Leaflets, cards, admission forms, receipt books",5000],["Darśana outings: ISKCON, Rādhā-Ramaṇa, Yamunā, parikramā",5000],["Bead bags",5000],["Water bottles & campers",3000],["Collar mics",2500],["Japa beads",2000]],
  occasional:[["Rashan (groceries)",10000],["Trips & outings",10000],["Fruits & samak khichdi: Nirjalā Ekādaśī, Janmāṣṭamī, Gaura-pūrṇimā",7000]]
};
const NOTES={onetime:"Infrastructure and equipment, about ₹15 lakh in all. Each item serves the children for years.",annual:"Yearly needs, about ₹5 lakh in all, including Vaiṣṇava uniforms such as dhotīs and gopī dresses.",occasional:"Groceries, outings and festival offerings through the year.",monthly:"Running costs of about ₹2 lakh every month."};
const chosen=new Map();
let touched=false;
$("donate").addEventListener("click",e=>{if(e.target.closest("button,input"))touched=true},true);
$("donate").addEventListener("input",()=>{touched=true},true);
function toggle(id,label,amt,btn){
  if(chosen.has(id)){chosen.delete(id);btn.setAttribute("aria-pressed","false")}
  else{chosen.set(id,[label,amt]);btn.setAttribute("aria-pressed","true")}
  render();
}
for(const [k,list] of Object.entries(DATA)){
  list.forEach(([name,amt],i)=>{
    const b=document.createElement("button");b.type="button";b.className="item";b.setAttribute("aria-pressed","false");
    b.innerHTML=`<span class="nm"></span><span class="amt">${fmt(amt)}</span>`;b.querySelector(".nm").textContent=name;
    b.addEventListener("click",()=>toggle(k+i,name,amt,b));$("list-"+k).appendChild(b);
  });
}
const SEVA=[["Fruits for a month's 2 Ekādaśīs",5000],["One feast prasadam",10000],["One day's lunch prasadam",1700],["Breakfast for a month",5000]];
SEVA.forEach(([n,a],i)=>{const b=document.createElement("button");b.type="button";b.className="amt-btn";b.setAttribute("aria-pressed","false");b.textContent=`${n} · ${fmt(a)}`;b.addEventListener("click",()=>toggle("seva"+i,n,a,b));$("seva-day").appendChild(b)});

/* custom amount */
const QUICK=[501,1100,2100,5100,11000];
const custom=$("custom");
QUICK.forEach(a=>{const b=document.createElement("button");b.type="button";b.className="amt-btn";b.setAttribute("aria-pressed","false");b.textContent=fmt(a);b.dataset.amt=a;
  b.addEventListener("click",()=>{custom.value=a;syncQuick();render()});$("quick-amounts").appendChild(b)});
function syncQuick(){document.querySelectorAll("#quick-amounts .amt-btn").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.amt===+custom.value)))}
custom.addEventListener("input",()=>{syncQuick();render()});
$("purpose").addEventListener("change",render);

/* child sponsorship */
const kids=$("kids"),months=$("months");
const clamp=el=>{let v=parseInt(el.value,10);if(isNaN(v)||v<0)v=0;v=Math.min(v,+el.max);el.value=v;return v};
document.querySelectorAll("[data-step]").forEach(b=>b.addEventListener("click",()=>{const el=$(b.dataset.step);el.value=(parseInt(el.value,10)||0)+ +b.dataset.d;clamp(el);render()}));
[kids,months].forEach(el=>el.addEventListener("input",render));

/* tabs */
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected",x===t?"true":"false"));
  document.querySelectorAll("[data-panel]").forEach(p=>p.hidden=p.dataset.panel!==t.dataset.tab);
  $("tab-note").textContent=NOTES[t.dataset.tab];
}));
$("tab-note").textContent=NOTES.onetime;

function lines(){
  const out=[];const c=Math.max(0,parseInt(custom.value,10)||0);
  if(c>0)out.push([`Donation (${$("purpose").value})`,c]);
  const k=clamp(kids),m=clamp(months);
  if(k>0&&m>0)out.push([`Sponsor ${k} child${k>1?"ren":""} × ${m} month${m>1?"s":""}`,k*m*2500]);
  for(const v of chosen.values())out.push(v);
  return out;
}
function render(){
  const c=Math.max(0,parseInt(custom.value,10)||0);$("custom-total").textContent=fmt(c);
  $("kids-total").textContent=fmt(clamp(kids)*clamp(months)*2500);
  const L=lines(),ul=$("pledge-list");ul.innerHTML="";
  L.forEach(([n,a])=>{const li=document.createElement("li");const s1=document.createElement("span");s1.textContent=n;const s2=document.createElement("span");s2.textContent=fmt(a);li.append(s1,s2);ul.appendChild(li)});
  $("pledge-empty").hidden=L.length>0;
  const tot=L.reduce((s,[,a])=>s+a,0);
  $("pledge-total").textContent=fmt(tot);
  $("mbar-total").textContent=touched?fmt(tot):"Any amount";$("mbar-total").previousSibling.textContent=touched?"Your offering":"Support a child";
  const mb=$("mbar-btn");const ready=touched&&tot>0;mb.textContent=ready?"Review & send":"Donate now";mb.setAttribute("href",ready?"#offering":"#donate");
  $("copied").textContent="";
}
$("copy").addEventListener("click",()=>{
  const L=lines(),msg=$("copied");
  if(!L.length){msg.textContent="Choose an amount or a seva first.";return}
  const nm=$("dname").value.trim(),ph=$("dphone").value.trim();
  let text="Hare Kṛṣṇa! My offering to Vāsantikā Pathshala:\n"+L.map(([n,a])=>`• ${n}: ${fmt(a)}`).join("\n")+`\nTotal: ${fmt(L.reduce((s,[,a])=>s+a,0))}`;
  if(nm)text+=`\nName: ${nm}`;if(ph)text+=`\nPhone: ${ph}`;
  const ok=()=>msg.textContent="Copied. Paste it into WhatsApp and send it to us.";
  const fallback=()=>{const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){msg.textContent="Please select and copy the list above."}ta.remove()};
  try{navigator.clipboard.writeText(text).then(ok,fallback)}catch(e){fallback()}
});
render();

/* give any amount from the top strip, hero button and bottom bar */
function goCustom(v){
  if(v>0){custom.value=v;syncQuick();touched=true;render();}
  $("donate").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>{try{custom.focus({preventScroll:true})}catch(e){}},700);
}
$("qg-form").addEventListener("submit",e=>{e.preventDefault();goCustom(parseInt($("qg-amt").value,10)||0)});
document.querySelectorAll("[data-focus-custom]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();goCustom(0)}));
$("mbar-btn").addEventListener("click",e=>{if(!(touched&&lines().length)){e.preventDefault();goCustom(0)}});

/* mobile menu */
const hdr=document.querySelector(".site-header"),mbtn=$("menu-btn");
const setMenu=open=>{hdr.classList.toggle("open",open);mbtn.setAttribute("aria-expanded",String(open));mbtn.setAttribute("aria-label",open?"Close menu":"Open menu");mbtn.innerHTML=open?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'};
mbtn.addEventListener("click",()=>setMenu(!hdr.classList.contains("open")));
document.querySelectorAll("#main-nav a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
