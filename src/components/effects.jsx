import React,{useState,useEffect,useRef,useMemo} from "react";

export function Intro(){const [st,setSt]=useState(()=>{try{if(sessionStorage.getItem("zb_intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)return 2}catch(e){}return 0});
useEffect(()=>{if(st!==0)return;const el=document.documentElement;el.classList.add("intro-on");
const a=setTimeout(()=>{el.classList.remove("intro-on");setSt(1)},1700),b=setTimeout(()=>{setSt(2);try{sessionStorage.setItem("zb_intro","1")}catch(e){}},2900);
return()=>{clearTimeout(a);clearTimeout(b);el.classList.remove("intro-on")}},[]);
if(st===2)return null;
const w=["Zuhal","Brand","Mall"];
return <div aria-hidden="true" className={"aurora fixed inset-0 z-[200] grid place-items-center px-6 text-center text-white "+(st===1?"curtain-out":"")}>
<span className="pointer-events-none absolute -left-24 top-10 h-96 w-96 animate-blob rounded-full bg-white opacity-40 blur-[100px]"/><span className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-blob rounded-full bg-white opacity-50 blur-[100px]" style={{animationDelay:"-6s"}}/>
<div className="relative"><span className="mb-4 block text-3xl text-apricot" style={{animation:"dropIn .8s cubic-bezier(.2,.7,.2,1) both"}}>✦</span>
<h1 className="font-display text-[clamp(3.4rem,13vw,8rem)] italic leading-[.95]">{w.map((t,i)=><span key={t} className="mr-[.25em] inline-block last:mr-0" style={{animation:"dropIn .9s cubic-bezier(.2,.7,.2,1) both",animationDelay:(.15+i*.18)+"s"}}>{t}</span>)}</h1>
<p className="mt-5 font-display text-2xl italic text-white/95 md:text-3xl" style={{animation:"dropIn .9s cubic-bezier(.2,.7,.2,1) both",animationDelay:".8s"}}>Be unique. Be stylish. Be you.</p>
<div className="mx-auto mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-white/30"><div className="h-full rounded-full bg-white" style={{animation:"barGrow 1.7s ease-in-out both",transformOrigin:"left"}}/></div></div></div>}
export function Sparkles(){useEffect(()=>{if(!matchMedia("(pointer:fine)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let last=0;const C=["#F2788F","#3CB9F5","#F6D58E","#A094C0"];
const mv=e=>{const n=performance.now();if(n-last<60)return;last=n;const s=document.createElement("span");s.textContent="✦";s.setAttribute("aria-hidden","true");
s.style.cssText="position:fixed;left:"+e.clientX+"px;top:"+e.clientY+"px;color:"+C[Math.floor(Math.random()*C.length)]+";font-size:"+(9+Math.random()*10)+"px;pointer-events:none;z-index:150;--dx:"+Math.floor(Math.random()*34-17)+"px;animation:sparkFall .95s ease-in forwards;text-shadow:0 0 8px currentColor";
document.body.appendChild(s);setTimeout(()=>s.remove(),1000)};
addEventListener("mousemove",mv,{passive:true});return()=>removeEventListener("mousemove",mv)},[]);return null}
export function Tilt({children,className=""}){const r=useRef(null);
const mv=e=>{const el=r.current;if(!el||!matchMedia("(pointer:fine)").matches)return;const b=el.getBoundingClientRect();const px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;el.style.transition="transform .12s ease-out";el.style.transform="perspective(1000px) rotateX("+(-py*6).toFixed(2)+"deg) rotateY("+(px*8).toFixed(2)+"deg)"};
const lv=()=>{const el=r.current;if(el){el.style.transition="transform .7s cubic-bezier(.2,.7,.2,1)";el.style.transform=""}};
return <div ref={r} onMouseMove={mv} onMouseLeave={lv} className={className}>{children}</div>}
