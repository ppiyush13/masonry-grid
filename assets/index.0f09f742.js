import{r as i,j as g,a as x,c as y,R as v}from"./vendor.4f12fb17.js";const b=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}};b();const p=new URL("https://api.giphy.com/v1/gifs/trending");p.searchParams.set("api_key","OoWza0uVc3TYKVYzWNJ9cbZLR60T6oN8");const w=(r=50)=>{let e=0;return async()=>{p.searchParams.set("limit",r.toString()),p.searchParams.set("offset",(e*r+1).toString()),e+=1;const a=await fetch(p.toString()),{data:s}=await a.json();return s}},R=r=>{const e=i.exports.useRef(null),[a,s]=i.exports.useState([]);return i.exports.useEffect(()=>{if(e.current==null)return;const t=new IntersectionObserver(async n=>{if(n[0].isIntersecting){const l=await r();s(m=>m.concat(l))}},{rootMargin:"20%"});return t.observe(e.current),()=>{e.current&&t.unobserve(e.current)}},[e.current]),{data:a,loaderRef:e}};const c=g.exports.jsx,h=g.exports.jsxs,N=({data:r})=>{const e=i.exports.useRef(0),a=i.exports.useRef([0,0,0,0]),[s,t]=i.exports.useState(()=>new Array(4).fill(null).map(()=>[]));return i.exports.useEffect(()=>{const n=o=>(16+ +o.height)/+o.width,l=()=>{const o=a.current;let u=0,d=o[0];for(let f=1;f<o.length;f++)o[f]<d&&(d=o[f],u=f);return u};console.time("start");const m=[...s];for(let o=e.current;o<r.length;o++){const u=r[o].images,d=l();m[d].push(c(L,{dataItem:u},o)),a.current[d]+=n(u.downsized_small)}t(m),e.current=r.length,console.timeEnd("start")},[r]),h("div",{className:"grid-pane",children:[c("div",{className:"lane",children:s[0]}),c("div",{className:"lane",children:s[1]}),c("div",{className:"lane",children:s[2]}),c("div",{className:"lane",children:s[3]})]})},L=({dataItem:r})=>c("video",{src:r.downsized_small.mp4,autoPlay:!0,muted:!0,loop:!0,width:"100%",preload:"none",crossOrigin:"anonymous",style:{aspectRatio:`${r.downsized_small.width} / ${r.downsized_small.height}`,backgroundColor:O()}}),O=()=>{const r=["rgb(255, 243, 92)","rgb(255, 102, 102)","rgb(153, 51, 255)","rgb(0, 255, 153)","rgb(0, 204, 255)"],e=Math.floor(Math.random()*100)%r.length;return r[e]},j=w();function I(){const{data:r,loaderRef:e}=R(j);return i.exports.useEffect(()=>{console.log("react version:",i.exports.version),console.log("react-dom version:",x.exports.version)},[]),h("main",{className:"App",children:[c(N,{data:r}),c("div",{ref:e,style:{height:"1px"}})]})}const E=y.createRoot(document.getElementById("root"));E.render(c(v.StrictMode,{children:c(I,{})}));
