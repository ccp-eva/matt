"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[4563],{4563:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var d=a(6358),n=a(9965),o=a(7103),u=a(1489);const l=async({currentSlide:e,previousSlide:t})=>{(0,u.TH)(e,t);const a="sqf",l=`link-${a}`,i="feelings",s=document.getElementById("audio"),c=document.getElementById(`${l}-headphones`),r=document.getElementById(`text-${i}Child`),p=document.getElementById(`text-${i}Adult`),m=document.getElementById(`text-${i}Comp`),y=document.getElementById(`${l}-yes`),h=document.getElementById(`${l}-no`);d.p8.set([m,y,h],{autoAlpha:0}),d.p8.set([y,h],{pointerEvents:"none"}),"adult"===data.agegroup?(d.p8.set(r,{autoAlpha:0}),await(0,n.bA)(`./cultures/${data.culture}/audio/${a}-adult.mp3`)):(d.p8.set(p,{autoAlpha:0}),await(0,n.bA)(`./cultures/${data.culture}/audio/${a}-child.mp3`)),(0,n.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`),await d.p8.timeline().to(y,{autoAlpha:.5}).to(h,{delay:1,autoAlpha:.5}),"adult"===data.agegroup&&(0,n.hY)(`./cultures/${data.culture}/audio/${a}-adult.mp3`,c.id),"child"===data.agegroup&&(0,n.hY)(`./cultures/${data.culture}/audio/${a}-child.mp3`,c.id),d.p8.to([y,h],{pointerEvents:"visible",autoAlpha:1}),s.addEventListener("play",(()=>{y.style.pointerEvents="none",h.style.pointerEvents="none",c.style.pointerEvents="none",d.p8.to([y,h,c],{autoAlpha:.5})})),s.addEventListener("ended",(()=>{y.style.pointerEvents="visible",h.style.pointerEvents="visible",c.style.pointerEvents="visible",d.p8.to([y,h,c],{autoAlpha:1})}));const E=await(0,o.c)([y.id,h.id]);if(console.log(E.id),data.procedure[data.currentSlide]={response:E.id},E.id.includes("-yes")){d.p8.set([r,p],{autoAlpha:0}),d.p8.to(m,{autoAlpha:1}),await(0,n.bA)(`./cultures/${data.culture}/audio/${a}c.mp3`),(0,n.hY)(`./cultures/${data.culture}/audio/${a}c.mp3`,c.id);const e=await(0,o.c)([y.id,h.id]);console.log(e.id),data.procedure.sQuFeelingsComp={response:e.id}}}},7103:(e,t,a)=>{a.d(t,{c:()=>d});const d=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);