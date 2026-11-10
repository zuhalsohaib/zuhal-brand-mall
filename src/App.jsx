import React,{useState,useEffect,useRef,useMemo} from "react";
import {Marquee,Palette} from "./components/chrome.jsx";
import {Intro,Sparkles} from "./components/effects.jsx";
import {Reveal} from "./components/ui.jsx";
import {CATS,P} from "./data.js";
import {IB,Ic,bumpNav,ls} from "./helpers.jsx";
import {About,Account,NotFound,Wishlist} from "./pages/Account.jsx";
import {Categories} from "./pages/Categories.jsx";
import {Cart,Checkout,Done} from "./pages/Checkout.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {Home} from "./pages/Home.jsx";
import {Product} from "./pages/Product.jsx";
import {Shop} from "./pages/Shop.jsx";

export function App(){
const get=()=>location.hash.slice(1)||"home";const [h,setH]=useState(get);
const [cart,setCart]=useState(()=>ls.get("rb_cart",[]));const [user,setUser]=useState(()=>ls.get("rb_user",null));const [users,setUsers]=useState(()=>ls.get("rb_users",[]));
const [wish,setWish]=useState(()=>ls.get("rb_wish",[]));const [promo,setPromo]=useState(false);const [order,setOrder]=useState(null);const [toast,setToast]=useState("");const [cat,setCat]=useState("All");
const [prog,setProg]=useState(0);const [top,setTop]=useState(false);const [find,setFind]=useState(false);const tm=useRef();
const [theme,setTheme]=useState(()=>ls.get("rb_theme",matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
useEffect(()=>{document.documentElement.dataset.theme=theme;ls.set("rb_theme",theme)},[theme]);
useEffect(()=>{const f=()=>{bumpNav();setH(get());window.scrollTo(0,0)};addEventListener("hashchange",f);return()=>removeEventListener("hashchange",f)},[]);
useEffect(()=>{const f=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setFind(true)}if(e.key==="Escape")setFind(false)};addEventListener("keydown",f);return()=>removeEventListener("keydown",f)},[]);
useEffect(()=>ls.set("rb_cart",cart),[cart]);useEffect(()=>ls.set("rb_wish",wish),[wish]);useEffect(()=>ls.set("rb_user",user),[user]);useEffect(()=>ls.set("rb_users",users),[users]);
useEffect(()=>{const f=()=>{const m=document.documentElement.scrollHeight-innerHeight;setProg(m>0?Math.min(100,scrollY/m*100):0);setTop(scrollY>700)};f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
const say=m=>{setToast(m);clearTimeout(tm.current);tm.current=setTimeout(()=>setToast(""),2200)};
const s=cart.reduce((a,i)=>a+P.find(p=>p.id===i.id).p*i.q,0),sh=s===0||s>=100?0:6,d=promo?+(s*.2).toFixed(2):0;
const x={cart,user,users,wish,order,cat,setCat,say,promo,setPromo,tot:{s,sh,d,t:s-d+sh},
add:(id,sz,n=1)=>{setCart(c=>c.find(i=>i.id===id&&i.s===sz)?c.map(i=>i.id===id&&i.s===sz?{...i,q:i.q+n}:i):[...c,{id,s:sz,q:n}]);say("Added to your bag")},
qty:(k,dl)=>setCart(c=>c.map((i,j)=>j===k?{...i,q:i.q+dl}:i).filter(i=>i.q>0)),
toggleWish:id=>setWish(w=>w.includes(id)?w.filter(i=>i!==id):[...w,id]),
place:o=>{ls.set("zb_orders",[{no:o.no,t:Date.now(),name:o.name,email:o.email,city:"",pay:o.pay,items:cart.map(i=>({id:i.id,s:i.s,q:i.q,p:P.find(q=>q.id===i.id).p})),total:+(s-d+sh).toFixed(2),status:"Pending",live:true},...ls.get("zb_orders",[])]);setOrder({...o,items:cart.map(i=>({...i})),total:+(s-d+sh).toFixed(2)});setCart([]);setPromo(false);location.hash="#done"},
signup:u=>{setUsers(a=>[...a,u]);setUser({name:u.name,email:u.email});say("Account created")},
signin:u=>{setUser({name:u.name,email:u.email});say("Signed in")},out:()=>{setUser(null);say("Signed out")}};
const r=h.startsWith("product-")?"product":h;const count=cart.reduce((a,i)=>a+i.q,0);
const pages={home:<Home x={x}/>,categories:<Categories x={x}/>,shop:<Shop x={x}/>,product:<Product id={h.slice(8)} x={x}/>,cart:<Cart x={x}/>,checkout:<Checkout x={x}/>,done:<Done x={x}/>,account:<Account x={x}/>,about:<About x={x}/>,wishlist:<Wishlist x={x}/>,dashboard:<Dashboard x={x}/>};
const links=[["home","Home"],["shop","Shop"],["about","About"]];
const badge=n=>n>0&&<b key={n} className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-[#FFD166] px-1 text-[11px] font-extrabold text-[#2A1245]">{n}</b>;
return <div>
<Intro/><Sparkles/>
{find&&<Palette close={()=>setFind(false)}/>}
<Marquee/>
<header style={{top:"calc(env(safe-area-inset-top,0px) + 10px)"}} className="sticky z-50 mx-auto mt-3 -mb-[68px] w-[min(1180px,calc(100%-20px))]"><div className="relative flex h-14 items-center gap-1 rounded-full bg-[linear-gradient(100deg,#F2788F,#3CB9F5,#F2788F)] bg-[length:300%_100%] px-3 text-white shadow-[0_18px_50px_-12px_rgba(100,160,230,.6),0_0_0_6px_rgba(255,255,255,.14)] ring-2 ring-white/50 animate-grad">
<span aria-hidden="true" className="shine pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.26)_50%,transparent_70%)]"/>
<a href="#home" className="mr-auto flex items-center gap-2 pl-1 transition-transform duration-300 hover:scale-105"><span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display text-2xl leading-none text-[#E0607A] shadow-md">Z</span><span className="whitespace-nowrap font-display text-xl italic leading-none sm:text-3xl">Zuhal Brand Mall</span><span aria-hidden="true" className="hidden text-apricot sm:inline">✦</span></a>
<nav aria-label="Main" className="mr-2 hidden items-center gap-1 md:flex">{links.map(([k,t])=><a key={k} href={"#"+k} aria-current={r===k?"page":undefined} className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 ${r===k?"bg-white !text-[#2A1245] shadow-md":""}`}>{t}</a>)}</nav>
<button onClick={()=>setFind(true)} aria-label="Search (Ctrl+K)" className={IB}><Ic n="search"/></button>
<button onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} className={IB}><span key={theme} className="animate-pop"><Ic n={theme==="dark"?"sun":"moon"}/></span></button>
<a href="#wishlist" aria-label="Saved styles" className={IB+" hidden md:grid"}><Ic n="heart"/>{badge(wish.length)}</a>
<a href="#account" aria-label={user?"Your account":"Sign in"} className={IB+" hidden md:grid"}><Ic n="user"/></a>
<a href="#cart" aria-label="Your bag" className={IB}><Ic n="bag"/>{badge(count)}</a>
<div className="absolute inset-x-6 bottom-1 h-[3px] overflow-hidden rounded-full"><div className="h-full rounded-full bg-white/90 transition-[width] duration-150" style={{width:prog+"%"}}/></div></div></header>
<main key={h} className={"animate-page "+(r==="home"?"":"pt-24")}>{pages[r]||<NotFound/>}</main>
<footer className="mt-10 aurora pb-28 pt-14 text-white md:pb-12"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr]"><Reveal><div><b className="font-display text-5xl italic">Zuhal Brand Mall</b><p className="mt-3 max-w-xs text-white">Clothing in colors made to be noticed. Delivered to your door.</p></div></Reveal>
<Reveal d={120}><div><p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/90">Shop</p><ul className="space-y-2">{CATS.map(c=><li key={c}><button onClick={()=>{setCat(c);location.hash="#shop"}} className="transition-all duration-300 hover:translate-x-1 hover:text-apricot">{c}</button></li>)}</ul></div></Reveal>
<Reveal d={240}><div><p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/90">Help</p><ul className="space-y-2">{[["about","Contact us"],["wishlist","Saved styles"],["cart","Your bag"],["dashboard","Admin dashboard"]].map(([k,t])=><li key={k}><a href={"#"+k} className="transition-all duration-300 hover:text-apricot">{t}</a></li>)}</ul></div></Reveal></div>
<Reveal d={300}><p className="mx-auto mt-10 max-w-6xl border-t border-white/30 px-5 pt-6 text-sm text-white/90">© 2026 Zuhal Brand Mall. Made by Zuhal Sohaib.</p></Reveal></footer>
<nav aria-label="Quick navigation" className="glass fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-full px-2 py-1.5 shadow-2xl md:hidden" style={{marginBottom:"env(safe-area-inset-bottom,0px)"}}>{[["home","home","Home"],["shop","grid","Shop"],["wishlist","heart","Saved"],["cart","bag","Bag"],["account","user","Me"]].map(([k,i,t])=><a key={k} href={"#"+k} aria-current={r===k?"page":undefined} className={`flex flex-col items-center rounded-full py-1.5 text-[11px] font-semibold transition-all duration-300 active:scale-90 ${r===k?"grad text-white":"text-muted"}`}><Ic n={i} c="h-5 w-5"/><span>{t}{k==="cart"&&count>0?" "+count:""}</span></a>)}</nav>
<button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{bottom:"calc(88px + env(safe-area-inset-bottom,0px))"}} className={`grad fixed right-4 z-50 grid h-12 w-12 place-items-center rounded-full text-white shadow-xl transition-all duration-500 hover:-translate-y-1 md:bottom-6 ${top?"translate-y-0 opacity-100":"pointer-events-none -translate-y-6 opacity-0"}`}><span className="rotate-90"><Ic n="left"/></span></button>
<div role="status" aria-live="polite" className={`glass fixed left-1/2 z-[60] -translate-x-1/2 rounded-full px-6 py-3 font-semibold shadow-xl transition-all duration-500 ${toast?"translate-y-0 opacity-100":"pointer-events-none -translate-y-8 opacity-0"}`} style={{bottom:"calc(100px + env(safe-area-inset-bottom,0px))"}}>{toast}</div></div>}
