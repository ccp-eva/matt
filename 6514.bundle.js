"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6514],{6514:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});var a=n(6358),o=n(9965),d=n(1489),i=n(7103),s=n(8503),l=n(5919),r=n(6486),p=n.n(r);const c=async()=>{(0,d.TH)(p().kebabCase(data.currentSlide));const e=document.getElementById("player"),t=document.getElementById("audio"),n=document.getElementById("link-si-speaker"),r=document.getElementById("player"),c=a.p8.timeline(),u=document.getElementById("link-si-headphones"),y=document.getElementById("link-si-next");a.p8.set([u,y],{transformOrigin:"50% 50%",autoAlpha:0});let m=!1;n.addEventListener("click",(()=>{l.Z.devmode||(0,s.LA)(),a.p8.set(n,{autoAlpha:0}),c.to(r,{onStart:()=>{r.src=`./cultures/${data.culture}/video/s-introduction.webm`,m=!0}}).to(u,{delay:17,duration:.5,opacity:1,visibility:"visible"},"<").to(u,{filter:"drop-shadow(0px 0px 14px #c4c4c4)",delay:1,repeat:2,yoyo:!0,reversed:!0}).to(y,{delay:5,opacity:1,visibility:"visible"}).to(y,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0}).to(r,{delay:3,autoAlpha:0,onStart:()=>{(0,o.hY)(`./cultures/${data.culture}/audio/si-next-red.mp3`,"link-si-headphones")},onComplete:()=>{m=!1}})})),t.addEventListener("play",(()=>{y.style.pointerEvents="none",a.p8.set(y,{autoAlpha:.25})})),e.addEventListener("play",(()=>{y.style.pointerEvents="none",m?a.p8.set(y,{autoAlpha:0}):a.p8.set(y,{autoAlpha:.25})})),t.addEventListener("ended",(()=>{y.style.pointerEvents="auto",a.p8.to(y,{autoAlpha:1})})),e.addEventListener("ended",(()=>{y.style.pointerEvents="auto",a.p8.to(y,{autoAlpha:1})})),await(0,i.c)(y.id),c.kill(),(0,o.sT)(),await(0,s._v)(500)}},7103:(e,t,n)=>{n.d(t,{c:()=>a});const a=e=>new Promise((t=>{const n=e=>{const n=e.target;return t(n)};"string"==typeof e&&document.getElementById(e).addEventListener("click",n,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",n,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",n,{once:!0})}))}}]);