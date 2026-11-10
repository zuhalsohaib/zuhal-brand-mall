import React,{useState,useEffect,useRef,useMemo} from "react";
import {ONE,defSize} from "../data.js";
import {Ic,NAV,SH,money} from "../helpers.jsx";

export function Garment({t,c,className=""}){return <svg viewBox="0 0 100 120" aria-hidden="true" className={className}><path d={SH[t]} fill={c} fillRule="evenodd"/></svg>}
export function Photo({p,className="",pos}){const [bad,setBad]=useState(false);const [ld,setLd]=useState(false);
return <div role="img" aria-label={p.n} className={"relative overflow-hidden bg-petal "+className}>
{!bad&&<img src={p.img} alt="" loading="lazy" decoding="async" style={pos?{objectPosition:pos}:undefined} ref={el=>{if(el&&el.complete&&el.naturalWidth)setLd(true)}} onLoad={()=>setLd(true)} onError={()=>setBad(true)} className={"absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[900ms] ease-out group-hover:scale-110 "+(ld?"opacity-100":"opacity-0")}/>}
{bad&&<div className="absolute inset-0 grid place-items-center p-8" style={{background:`color-mix(in srgb, ${p.col} 24%, var(--paper))`}}><Garment t={p.t} c={p.col} className="max-h-full w-full transition-transform duration-700 group-hover:scale-110"/></div>}</div>}
export function FitPhoto({p,className=""}){const [bad,setBad]=useState(false);const [ld,setLd]=useState(false);
if(bad)return <Photo p={p} className={className}/>;
return <div role="img" aria-label={p.n} className={"relative overflow-hidden bg-petal "+className}>
<img src={p.img} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-90 blur-2xl"/>
<img src={p.img} alt="" loading="lazy" decoding="async" ref={el=>{if(el&&el.complete&&el.naturalWidth)setLd(true)}} onLoad={()=>setLd(true)} onError={()=>setBad(true)} className={"absolute inset-0 h-full w-full object-contain transition-[transform,opacity] duration-[900ms] ease-out group-hover:scale-105 "+(ld?"opacity-100":"opacity-0")}/></div>}
export function Reveal({children,d=0,className=""}){const r=useRef(null);const [v,setV]=useState(false);
useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.08});o.observe(r.current);return()=>o.disconnect()},[]);
return <div ref={r} style={{transitionDelay:d+"ms"}} className={`transition-all duration-[1000ms] ease-[cubic-bezier(.22,.61,.36,1)] ${v?"translate-y-0 opacity-100":"-translate-y-7 opacity-0"} ${className}`}>{children}</div>}
export function Count({to,suffix="",duration=3800,delay=700}){const [v,setV]=useState(0);const ref=useRef(null);
useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches){setV(to);return}
const t0=performance.now(),lead=(document.documentElement.classList.contains("intro-on")?1700:0)+delay;
/* show at most 36 different values: big numbers tick softly instead of blurring past */
const steps=Math.max(1,Math.min(Math.round(to),36));let s=null,id,tm,io;
const f=t=>{if(s===null)s=t;const k=Math.min(1,(t-s)/duration);const e=(1-Math.cos(Math.PI*k))/2;setV(k<1?Math.round(Math.round(e*steps)/steps*to):to);if(k<1)id=requestAnimationFrame(f)};
const go=()=>{tm=setTimeout(()=>{id=requestAnimationFrame(f)},Math.max(0,lead-(performance.now()-t0)))};
/* start only once the number is actually on screen */
if("IntersectionObserver" in window){io=new IntersectionObserver(([en])=>{if(en.isIntersecting){io.disconnect();go()}},{threshold:.25});io.observe(ref.current)}else go();
return()=>{if(io)io.disconnect();clearTimeout(tm);cancelAnimationFrame(id)}},[to,duration,delay]);
return <span ref={ref}>{v}{suffix}</span>}
export function Field({id,label,err,area,...r}){return <div className="mt-4"><label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
{React.createElement(area?"textarea":"input",{id,"aria-invalid":!!err,className:`w-full rounded-2xl border-2 bg-paper px-4 py-3 transition-all duration-300 focus:border-orchid focus:outline-none focus:ring-4 focus:ring-petal ${err?"border-rose":"border-line"}`,...r})}
<p role={err?"alert":undefined} className={`overflow-hidden text-sm font-semibold text-rose transition-all duration-300 ${err?"mt-1 max-h-12 opacity-100":"max-h-0 opacity-0"}`}>{err}</p></div>}
export function BackBtn({to="#shop",label="Back"}){return <button onClick={()=>{if(NAV>0)history.back();else location.hash=to}} className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-x-1 hover:border-ink active:scale-95"><Ic n="left" c="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"/>{label}</button>}
export const Sum=({a,b,big})=><div className={`flex justify-between py-2 ${big?"mt-2 border-t border-line pt-4 text-xl font-extrabold":""}`}><span>{a}</span><span>{b}</span></div>;
export const Eyebrow=({children})=><p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-rose">{children}</p>;
export const HG=[["dress","Dresses","#FFC2CE","#F2788F","-4deg","0s"],["jacket","Outerwear","#D6ECFF","#5AA9E6","3.5deg","-1.1s"],["bag","Bags","#FFF0D2","#F7A6B6","-3deg","-2.2s"],["tee","Tops","#FFFFFF","#CFE6FA","4deg","-3.3s"],["trou","Trousers","#B9E3FB","#3CB9F5","-3.5deg","-0.6s"],["scarf","Scarves","#FFDDB0","#F58FA3","3deg","-1.7s"],["shoe","Shoes","#FFA3B5","#7FA8E0","-4deg","-2.8s"],["jewel","Jewelry","#FFF1C9","#F2C879","3.5deg","-3.9s"]];
export const DET={jacket:"M50 32 L50 108 M26 50 L26 108 M74 50 L74 108",trou:"M50 8 L50 44 M28 14 H72",dress:"M40 38 H60 M46 8 Q50 20 54 8",tee:"M36 22 Q50 34 64 22",scarf:"M30 14 L60 60 M50 14 L70 52",shoe:"M54 52 L84 54"};
export const HOOK={bag:32,shoe:76,jewel:54};
export function HangGarment({t,c1,c2,k,d}){const hook=HOOK[t];return <svg viewBox="0 0 100 150" aria-hidden="true" className={"w-full drop-shadow-[0_18px_16px_rgba(0,0,0,.45)]"+(d?" animate-soft-in":"")} style={d?{animationDelay:d}:undefined}><defs><linearGradient id={"hg"+k} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c1}/><stop offset="1" stopColor={c2}/></linearGradient><linearGradient id={"hs"+k} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".5"/><stop offset=".45" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".25"/></linearGradient></defs>
<path d="M50 24 V16 Q50 6 58 6 Q66 6 66 14" fill="none" stroke="#F6D58E" strokeWidth="2.2" strokeLinecap="round"/>
{hook?<path d={"M50 24 V"+hook} fill="none" stroke="#F6D58E" strokeWidth="1.6"/>:<path d="M50 24 L6 46 H94 Z" fill="none" stroke="#F6D58E" strokeWidth="2" strokeLinejoin="round"/>}
<g transform="translate(0 28)">{t==="bag"&&<path d="M34 46 Q50 4 66 46" fill="none" stroke={`url(#hg${k})`} strokeWidth="5" strokeLinecap="round"/>}<path d={SH[t]} fill={`url(#hg${k})`} fillRule="evenodd"/><path d={SH[t]} fill={`url(#hs${k})`} fillRule="evenodd"/>{DET[t]&&<path d={DET[t]} stroke="rgba(255,255,255,.65)" strokeWidth="1.2" fill="none"/>}</g></svg>}
export function Card({p,x,i=0}){const sv=x.wish.includes(p.id);
return <Reveal d={(i%4)*80}><article className="group">
<div className="relative overflow-hidden rounded-[1.75rem] bg-petal transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_50px_-22px_rgba(100,150,230,.4)]">
<a href={"#product-"+p.id} aria-label={"View "+p.n} className="block"><Photo p={p} className="aspect-[4/5]"/></a>
{p.id<=12&&<span className="glass pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold">New in</span>}
<button onClick={()=>x.toggleWish(p.id)} aria-pressed={sv} aria-label={(sv?"Remove ":"Save ")+p.n} className="glass absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-rose transition-all duration-300 hover:scale-110 active:scale-90"><span key={String(sv)} className={sv?"animate-pop":""}><Ic n="heart" f={sv}/></span></button>
<button onClick={()=>x.add(p.id,defSize(p.c))} className="glass absolute inset-x-3 bottom-3 pointer-events-none -translate-y-10 rounded-full py-2.5 text-sm font-bold opacity-0 transition-all duration-500 hover:brightness-95 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">+ Quick add{ONE.includes(p.c)?"":" · "+defSize(p.c)}</button></div>
<div className="flex items-start justify-between gap-3 px-1 pt-3"><div><h3 className="font-semibold leading-tight">{p.n}</h3><p className="text-sm text-muted">{p.c}</p></div><b className="text-rose">{money(p.p)}</b></div></article></Reveal>}
export function Carousel({items,x}){const r=useRef(null);const go=d=>r.current.scrollBy({left:d*r.current.clientWidth*.8,behavior:"smooth"});
const ab="grid h-12 w-12 place-items-center rounded-full border border-line bg-card transition-all duration-300 hover:border-ink hover:shadow-lg active:scale-90";
return <div><div ref={r} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-2">{items.map((p,i)=><div key={p.id} className="w-[64%] shrink-0 snap-start sm:w-[40%] md:w-[25%]"><Card p={p} x={x} i={i}/></div>)}</div>
<div className="flex gap-2"><button aria-label="Previous" onClick={()=>go(-1)} className={ab}><Ic n="left"/></button><button aria-label="Next" onClick={()=>go(1)} className={ab}><Ic n="arrow"/></button></div></div>}
