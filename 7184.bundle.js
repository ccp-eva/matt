"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[7184],{7184:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(6358),d=n(9965),o=n(7103),l=n(1489);const u=async({currentSlide:e,previousSlide:t})=>{(0,l.TH)(e,t);const n="sqd",u=`link-${n}`,i="difference",s=document.getElementById("audio"),r=document.getElementById(`${u}-headphones`),c=document.getElementById(`text-${i}Child`),p=document.getElementById(`text-${i}Adult`),m=document.getElementById(`${u}-yes`),y=document.getElementById(`${u}-no`);a.p8.set([m,y],{autoAlpha:0}),a.p8.set([m,y],{pointerEvents:"none"}),"adult"===data.agegroup?(a.p8.set(c,{autoAlpha:0}),await(0,d.bA)(`./cultures/${data.culture}/audio/${n}-adult.mp3`)):(a.p8.set(p,{autoAlpha:0}),await(0,d.bA)(`./cultures/${data.culture}/audio/${n}-child.mp3`)),(0,d.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`),await a.p8.timeline().to(m,{autoAlpha:.5}).to(y,{delay:1,autoAlpha:.5}),"adult"===data.agegroup&&(0,d.hY)(`./cultures/${data.culture}/audio/${n}-adult.mp3`,r.id),"child"===data.agegroup&&(0,d.hY)(`./cultures/${data.culture}/audio/${n}-child.mp3`,r.id),a.p8.to([m,y],{pointerEvents:"visible",autoAlpha:1}),s.addEventListener("play",(()=>{m.style.pointerEvents="none",y.style.pointerEvents="none",r.style.pointerEvents="none",a.p8.to([m,y,r],{autoAlpha:.5})})),s.addEventListener("ended",(()=>{m.style.pointerEvents="visible",y.style.pointerEvents="visible",r.style.pointerEvents="visible",a.p8.to([m,y,r],{autoAlpha:1})}));const E=await(0,o.c)([m.id,y.id]);console.log(E.id),data.procedure[data.currentSlide]={response:E.id}}},7103:(e,t,n)=>{n.d(t,{c:()=>a});const a=e=>new Promise((t=>{const n=e=>{const n=e.target;return t(n)};"string"==typeof e&&document.getElementById(e).addEventListener("click",n,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",n,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",n,{once:!0})}))}}]);