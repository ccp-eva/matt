"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[228],{4228:(e,a,t)=>{t.r(a),t.d(a,{default:()=>u});var i=t(6358),n=t(6486),c=t.n(n),l=t(5919),s=t(9965),o=t(7103),d=t(8503),r=t(1489);const u=async()=>{(0,r.TH)(c().kebabCase(data.currentSlide),c().kebabCase(data.previousSlide)),data.animalSlideCounter++,1!==data.animalSlideCounter&&2!==data.animalSlideCounter||(i.p8.set(["#link-s-chicken-yes","#link-s-chicken-no"],{autoAlpha:0}),i.p8.timeline().to("#link-s-chicken-yes",{delay:2,duration:.5,opacity:1,visibility:"visible",onStart:()=>{(0,s.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`)}}).to("#link-s-chicken-no",{delay:1,duration:.5,opacity:1,visibility:"visible"})),await(0,s.bA)(`./cultures/${data.culture}/audio/s-chicken.mp3`),(0,s.hY)(`./cultures/${data.culture}/audio/s-chicken.mp3`,"link-s-chicken-headphones");const e=await(0,o.c)(["link-s-chicken-yes","link-s-chicken-no"]);if(console.log(e.id),data.procedure.sChicken.response=e.id,data.animalSlideCounter<=4){if(e.id.includes("-yes")){const e=["ok","alright"],a=e[Math.floor(Math.random()*e.length)];await(0,s.bA)(`./cultures/${data.culture}/audio/neutral-resp-${a}.mp3`)}if(e.id.includes("-no")){const e=["resp-no","resp-no-next"],a=e[Math.floor(Math.random()*e.length)];await(0,s.bA)(`./cultures/${data.culture}/audio/animal-${a}.mp3`)}}await(0,d._v)(l.Z.globals.animalSlidesGap)}},7103:(e,a,t)=>{t.d(a,{c:()=>i});const i=e=>new Promise((a=>{const t=e=>{const t=e.target;return a(t)};"string"==typeof e&&document.getElementById(e).addEventListener("click",t,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",t,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",t,{once:!0})}))}}]);