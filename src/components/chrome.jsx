import React,{useState,useEffect,useRef,useMemo} from "react";
import {Photo} from "./ui.jsx";
import {FEAT,P} from "../data.js";
import {Ic,money} from "../helpers.jsx";

export function Marquee(){const t=["Free delivery over $100","Gucci","Chanel","New arrivals every week","Dior","Yves Saint Laurent","30-day returns","Moncler","Prada","Use code ROSE20 for 20% off today","Louis Vuitton","Hermès"];
return <div className="overflow-hidden bg-[linear-gradient(90deg,#F2788F,#3CB9F5,#F2788F)] py-2 text-sm text-white"><div className="flex w-max animate-marquee gap-12 whitespace-nowrap pr-12">{[...t,...t,...t,...t].map((s,i)=><span key={i}>✦ {s}</span>)}</div></div>}
export function Palette({close}){const [q,setQ]=useState("");const ref=useRef(null);useEffect(()=>{if(ref.current)ref.current.focus()},[]);
const l=(q?P.filter(p=>(p.n+" "+p.c).toLowerCase().includes(q.toLowerCase())):FEAT.map(id=>P.find(p=>p.id===id))).slice(0,6);
const go=p=>{location.hash="#product-"+p.id;close()};
return <div role="dialog" aria-modal="true" aria-label="Search" onClick={close} className="fixed inset-0 z-[80] animate-page bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"><div onClick={e=>e.stopPropagation()} className="glass mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] shadow-2xl">
<div className="flex items-center gap-3 border-b border-line px-5"><Ic n="search"/><input ref={ref} value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&l[0])go(l[0])}} placeholder="Search dresses, bags, scarves…" aria-label="Search" className="w-full bg-transparent py-5 outline-none"/><button onClick={close} className="rounded-full border border-line px-3 py-1 text-xs font-semibold">Esc</button></div>
<ul className="max-h-[50vh] overflow-y-auto p-2">{l.length?l.map(p=><li key={p.id}><button onClick={()=>go(p)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors duration-200 hover:bg-petal"><Photo p={p} className="h-16 w-14 shrink-0 rounded-xl"/><span className="flex-1"><b className="block">{p.n}</b><span className="text-sm text-muted">{p.c}</span></span><b className="text-rose">{money(p.p)}</b></button></li>):<li className="p-6 text-center text-muted">No styles match “{q}”.</li>}</ul>
<p className="border-t border-line px-5 py-3 text-xs text-muted">{q?"Press Enter to open the first result":"Trending right now"}</p></div></div>}
