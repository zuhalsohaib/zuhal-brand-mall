/** @type {import('tailwindcss').Config} */
export default {
content:["./index.html","./src/**/*.{js,jsx}"],
theme:{extend:{
fontFamily:{display:['"Instrument Serif"','Georgia','serif'],sans:['Manrope','system-ui','sans-serif']},
colors:{ink:'var(--ink)',paper:'var(--paper)',card:'var(--card)',rose:'var(--rose)',orchid:'var(--orchid)',apricot:'var(--apricot)',petal:'var(--petal)',muted:'var(--muted)',line:'var(--line)'},
keyframes:{fadeDown:{'0%':{opacity:0,transform:'translateY(-30px)'},'100%':{opacity:1,transform:'none'}},
pop:{'0%':{transform:'scale(.6)'},'60%':{transform:'scale(1.25)'},'100%':{transform:'scale(1)'}},
pageIn:{'0%':{opacity:0,transform:'translateY(-14px)'},'100%':{opacity:1,transform:'none'}},
grad:{'0%,100%':{backgroundPosition:'0% 50%'},'50%':{backgroundPosition:'100% 50%'}},
sway:{'0%,100%':{transform:'rotate(var(--r))'},'50%':{transform:'rotate(calc(var(--r)*-1))'}},
marquee:{'0%':{transform:'translateX(0)'},'100%':{transform:'translateX(-50%)'}},
blob:{'0%,100%':{transform:'translate(0,0) scale(1)'},'50%':{transform:'translate(40px,-30px) scale(1.15)'}},
fall:{'0%':{transform:'translateY(-10px) rotate(0)',opacity:1},'100%':{transform:'translateY(110vh) rotate(720deg)',opacity:.9}},
shimmer:{'0%':{backgroundPosition:'200% 0'},'100%':{backgroundPosition:'-200% 0'}},
softIn:{'0%':{opacity:0,transform:'translateY(-16px)'},'100%':{opacity:1,transform:'none'}},
softFade:{'0%':{opacity:0},'100%':{opacity:1}},
rodIn:{'0%':{opacity:0,transform:'scaleX(.35)'},'100%':{opacity:1,transform:'none'}},
twinkle:{'0%,100%':{opacity:.55,transform:'translateY(0) scale(.92)'},'50%':{opacity:1,transform:'translateY(-7px) scale(1.08)'}},
breathe:{'0%,100%':{opacity:.6,transform:'scale(.85)'},'50%':{opacity:1,transform:'scale(1.15)'}}},
animation:{'fade-down':'fadeDown .9s cubic-bezier(.2,.7,.2,1) both',pop:'pop .45s ease-out',page:'pageIn .55s ease-out both',grad:'grad 14s ease infinite',sway:'sway 4.5s ease-in-out infinite',marquee:'marquee 38s linear infinite',blob:'blob 12s ease-in-out infinite',fall:'fall 3.2s ease-in forwards',shimmer:'shimmer 1.6s linear infinite',
'soft-in':'softIn 1.1s cubic-bezier(.22,.61,.36,1) both','soft-fade':'softFade 1.3s ease-out both',rod:'rodIn 1.4s cubic-bezier(.22,.61,.36,1) both',twinkle:'twinkle 6s ease-in-out infinite',breathe:'breathe 3.4s ease-in-out infinite'}}}};
