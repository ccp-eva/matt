"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[3160],{3160:(t,e,a)=>{a.r(e),a.d(e,{default:()=>s});var o=a(6358),i=a(8503),n=a(1489);const s=async({currentSlide:t,previousSlide:e})=>{const a={transition:`./cultures/${data.culture}/video/sr-react2-intro-dilemmas.webm`,boat:`./cultures/${data.culture}/video/s-intro-combined-720p.mp4`},s=document.getElementById("s-blocking-state");s.removeAttribute("visibility");for(const[t,e]of Object.entries(a)){const o=await fetch(e),i=await o.blob();a[t]=URL.createObjectURL(i)}s.setAttribute("visibility","hidden"),console.log(a),(0,n.TH)(t,e,[2,2]);const r=document.getElementById("player"),l=document.getElementById("fsplayer");let c=!0;for([r,l].forEach((t=>{t.addEventListener("play",(()=>{c=!0})),t.addEventListener("ended",(()=>{c=!1}))})),r.src=a.transition;c;)await(0,i._v)(100);for(o.p8.set(l,{autoAlpha:0}),l.style.display="block",o.p8.to(r,{autoAlpha:0}),await o.p8.timeline().to("#svg",{backgroundColor:"#000",duration:1}).to(l,{autoAlpha:1,onStart:()=>{l.src=a.boat}});c;)await(0,i._v)(1);await o.p8.timeline().to("#svg",{backgroundColor:"#fff"}).to(l,{autoAlpha:0},"<"),l.style.display="none"}}}]);