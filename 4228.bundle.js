"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[4228,8194],{8194:(e,t,n)=>{n.r(t),n.d(t,{sAnimalCodeRunner:()=>s});var a=n(6358),o=n(5919),i=n(9965),l=n(7103),d=n(1489);const s=async(e,t,n)=>{(0,d.TH)(e,t),data.animalSlideCounter++;const s=document.getElementById("audio"),r=n,u=document.getElementById(`link-${r}-yes`),c=document.getElementById(`link-${r}-no`);function p(){u.style.pointerEvents="none",c.style.pointerEvents="none",a.p8.to([u,c],{autoAlpha:.5})}function m(){u.style.pointerEvents="visible",c.style.pointerEvents="visible",a.p8.to([u,c],{autoAlpha:1})}console.log(r,u,c),a.p8.set([u,c],{pointerEvents:"none"}),data.animalSlideCounter<=o.Z.globals.playAnimalYesNoAudio?a.p8.set([u,c],{autoAlpha:0}):a.p8.set([u,c],{autoAlpha:.5}),await(0,i.bA)(`./cultures/${data.culture}/audio/${r}.mp3`),data.animalSlideCounter<=o.Z.globals.playAnimalYesNoAudio?await a.p8.timeline().to(u,{duration:.5,autoAlpha:.5,onStart:()=>{(0,i.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`)}}).to(c,{delay:1,duration:.5,autoAlpha:.5,onComplete:()=>{a.p8.set([u,c],{pointerEvents:"visible"}),a.p8.to([u,c],{autoAlpha:1})}}):a.p8.set([u,c],{autoAlpha:1,pointerEvents:"visible"}),(0,i.hY)(`./cultures/${data.culture}/audio/${r}.mp3`,`link-${r}-headphones`),s.addEventListener("play",p),s.addEventListener("ended",m);const h=await(0,l.c)([u.id,c.id]);if(console.log(h.id),data.procedure[data.currentSlide].response=h.id,s.removeEventListener("play",p),s.removeEventListener("ended",m),data.animalSlideCounter<=o.Z.globals.playAnimalResponseFeedback){if(h.id.includes("-yes")){const e=["ok","alright"],t=e[Math.floor(Math.random()*e.length)];await(0,i.bA)(`./cultures/${data.culture}/audio/neutral-resp-${t}.mp3`)}if(h.id.includes("-no")){const e=["resp-no","resp-no-next"],t=e[Math.floor(Math.random()*e.length)];await(0,i.bA)(`./cultures/${data.culture}/audio/animal-${t}.mp3`)}}}},4228:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var a=n(8194);const o=async({currentSlide:e,previousSlide:t})=>{await(0,a.sAnimalCodeRunner)(e,t,"s-chicken")}},7103:(e,t,n)=>{n.d(t,{c:()=>a});const a=e=>new Promise((t=>{const n=e=>{const n=e.target;return t(n)};"string"==typeof e&&document.getElementById(e).addEventListener("click",n,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",n,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",n,{once:!0})}))}}]);