import React,{useState,useEffect,useRef,useMemo} from "react";

export const SH={tee:"M30 14 L18 22 L4 44 L20 52 L26 42 L26 108 L74 108 L74 42 L80 52 L96 44 L82 22 L70 14 Q50 28 30 14Z",dress:"M38 8 L62 8 L60 38 L82 112 L18 112 L40 38Z",jacket:"M30 12 L14 22 L6 100 L22 102 L26 50 L26 108 L74 108 L74 50 L78 102 L94 100 L86 22 L70 12 L50 32Z",trou:"M28 8 L72 8 L80 112 L56 112 L50 44 L44 112 L20 112Z",bag:"M20 46 H80 L86 108 H14Z",scarf:"M18 10 H82 L90 46 L68 112 H42 L56 50 L10 44Z",shoe:"M4 112 C12 106 30 98 42 80 C48 70 52 58 56 48 L84 50 C90 56 92 66 90 80 L86 112 L82 112 L78 86 C60 96 36 112 4 112Z",jewel:"M50 26a34 34 0 1 0 .1 0zM50 40a20 20 0 1 1-.1 0zM50 96l9 9-9 11-9-11z"};
export const IC={search:"M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3",heart:"M12 21s-7-4.6-9.3-9.2C1.2 8.6 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.3 3.6 3.8 6.8C19 16.4 12 21 12 21z",bag:"M6 7h12l1 14H5L6 7zM9 7a3 3 0 0 1 6 0",user:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-6 8-6s8 2 8 6",arrow:"M5 12h14M13 6l6 6-6 6",left:"M19 12H5M11 6l-6 6 6 6",close:"M6 6l12 12M18 6L6 18",plus:"M12 5v14M5 12h14",minus:"M5 12h14",check:"M5 13l4 4L19 7",home:"M3 11l9-8 9 8v10h-6v-6H9v6H3z",grid:"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",moon:"M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z",sun:"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19",truck:"M2 6h11v10H2zM13 9h5l3 3v4h-8zM6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",ret:"M4 12a8 8 0 1 1 3 6.2M4 19v-5h5",share:"M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"};
export const Ic=({n,c="h-5 w-5",f})=><svg viewBox="0 0 24 24" fill={f?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={c} aria-hidden="true"><path d={IC[n]}/></svg>;
export const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
export const money=n=>"$"+n.toFixed(2);
export const mail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export let NAV=0;
export const POS={Dresses:"center 12%",Outerwear:"center 28%",Scarves:"center 40%",Shoes:"center 62%",Jewelry:"center 50%"};
export const BTN="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 cursor-pointer select-none";
export const B1=BTN+" grad text-white shadow-[0_14px_30px_-12px_rgba(242,120,143,.55)] hover:brightness-110";
export const B2=BTN+" border-2 border-ink text-ink hover:bg-ink hover:text-paper";
export const B3=BTN+" bg-white text-[#2A1245]";
export const IB="relative grid h-10 w-10 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 transition-all duration-300 hover:bg-white/30 active:scale-90";
export const CARD="rounded-[2rem] border border-line bg-card";
Object.assign(IC,{chart:"M5 20V11M12 20V4M19 20v-6",box:"M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",users:"M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 3.5a4 4 0 0 1 0 7M22 21c0-3-1.5-5-4-5.7",list:"M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",out:"M9 4H5v16h4M16 8l4 4-4 4M20 12H9",dl:"M12 3v12M7 11l5 5 5-5M5 21h14",warn:"M12 3l10 18H2zM12 10v4M12 17.5v.5",cash:"M3 6h18v12H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",trend:"M3 17l6-6 4 4 8-8M15 7h6v6"});
export const bumpNav=()=>{NAV++};
