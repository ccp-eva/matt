"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[514],{6514:(e,t,i)=>{i.r(t),i.d(t,{default:()=>c});var n=i(6358),a=i(9965),d=i(1489),o=i(7103),r=i(6486),s=i.n(r);const c=async()=>{(0,d.TH)(s().kebabCase(data.currentSlide));const e=document.getElementById("player"),t=n.p8.timeline(),i=document.getElementById("link-si-headphones"),r=document.getElementById("link-si-next");n.p8.set(i,{transformOrigin:"50% 50%",opacity:0,visibility:"hidden"}),n.p8.set(r,{transformOrigin:"50% 50%",opacity:0,visibility:"hidden"}),t.to(e,{onStart:()=>{e.src=`./cultures/${data.culture}/video/s-introduction.webm`}}).to(i,{delay:17,duration:.5,opacity:1,visibility:"visible"},"<").to(i,{filter:"drop-shadow(0px 0px 14px #c4c4c4)",delay:1,repeat:2,yoyo:!0,reversed:!0}).to(r,{delay:5,opacity:1,visibility:"visible"}).to(r,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0}).to(e,{delay:3,autoAlpha:0,onStart:()=>{(0,a.hY)(`./cultures/${data.culture}/audio/si-next-red.mp3`,"link-si-headphones")}}),await(0,o.c)("link-si-next"),t.kill()}},7103:(e,t,i)=>{i.d(t,{c:()=>n});const n=e=>new Promise((t=>{const i=e=>{const i=e.target;return t(i)};"string"==typeof e&&document.getElementById(e).addEventListener("click",i,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",i,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",i,{once:!0})}))}}]);