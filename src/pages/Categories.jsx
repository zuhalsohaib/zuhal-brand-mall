import React,{useState,useEffect,useRef,useMemo} from "react";
import {Card,Eyebrow,Reveal} from "../components/ui.jsx";
import {BAG_BRANDS,CATS,CG_ORDER,P} from "../data.js";
import {B2} from "../helpers.jsx";

export const CAT_NOTE={Dresses:"Sorted by season.",Outerwear:"Sorted by colour.",Bags:"Sorted by brand.",Tops:"Sorted by colour.",Trousers:"Sorted by colour.",Scarves:"Sorted by colour.",Shoes:"Sorted by colour.",Jewelry:"Sorted by metal."};
export function subFor(c,items){if(c==="Dresses")return{key:p=>p.s,opts:["Summer","Winter"],name:o=>o+" dresses"};
if(c==="Bags")return{key:p=>p.b,opts:BAG_BRANDS,name:o=>o};
const have=[...new Set(items.map(p=>p.g))];const order=c==="Jewelry"?["Gold","Silver","Pearl & Crystal"]:[...CG_ORDER,"More colours"];
return{key:p=>p.g,opts:order.filter(o=>have.includes(o)),name:o=>o}}
export function CatSection({c,x}){const items=P.filter(p=>p.c===c);const sub=subFor(c,items);const [f,setF]=useState("All");const [all,setAll]=useState(false);
const list=f==="All"?items:items.filter(p=>sub.key(p)===f);const shown=all?list:list.slice(0,8);
const chip=(o,n)=><button key={o} aria-pressed={f===o} onClick={()=>{setF(o);setAll(false)}} className={`shrink-0 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 ${f===o?"grad border-transparent text-white shadow-lg":"border-line bg-card hover:border-ink"}`}>{o==="All"?"All":sub.name(o)} ({n})</button>;
return <section id={"cat-"+c} className="scroll-mt-28 border-t border-line pb-6 pt-12"><Reveal><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-display text-5xl md:text-6xl">{c}</h2><p className="text-muted">{CAT_NOTE[c]}</p></div><button onClick={()=>{x.setCat(c);location.hash="#shop"}} className={B2}>See all in shop</button></div></Reveal>
<Reveal d={100}><div className="no-scrollbar -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label={c+" filter"}>{chip("All",items.length)}{sub.opts.map(o=>chip(o,items.filter(p=>sub.key(p)===o).length))}</div></Reveal>
<div key={f} className="grid animate-page grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{shown.map((p,i)=><Card key={p.id} p={p} x={x} i={i}/>)}</div>
{list.length>8&&<div className="mt-8 text-center"><button onClick={()=>setAll(!all)} className={B2}>{all?"Show fewer":"Show all "+list.length}</button></div>}</section>}
export function Categories({x}){
const go=c=>{const el=document.getElementById("cat-"+c);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})};
return <section className="mx-auto max-w-6xl px-5 py-10"><Reveal><Eyebrow>Explore</Eyebrow><h1 className="font-display text-6xl md:text-8xl">All <em>categories</em></h1></Reveal>
<div className="glass sticky z-30 my-8 animate-fade-down rounded-[2rem] p-4" style={{top:"calc(env(safe-area-inset-top,0px) + 76px)"}}><div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Jump to a category">{CATS.map(c=><button key={c} onClick={()=>go(c)} className="shrink-0 rounded-full border-2 border-line bg-card px-5 py-2 text-sm font-semibold transition-all duration-300 hover:border-ink active:scale-95">{c}</button>)}</div></div>
{CATS.map(c=><CatSection key={c} c={c} x={x}/>)}</section>}
