"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[600],{2600:(a,t,e)=>{e.r(t),e.d(t,{default:()=>u});var i=e(6358),n=e(6486),l=e.n(n),s=e(5919),o=e(9965),d=e(7103),c=e(8503),r=e(1489);const u=async()=>{(0,r.TH)(l().kebabCase(data.currentSlide),l().kebabCase(data.previousSlide)),data.animalSlideCounter++,1!==data.animalSlideCounter&&2!==data.animalSlideCounter||(i.p8.set(["#link-s-cat-yes","#link-s-cat-no"],{autoAlpha:0}),i.p8.timeline().to("#link-s-cat-yes",{delay:2,duration:.5,opacity:1,visibility:"visible",onStart:()=>{(0,o.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`)}}).to("#link-s-cat-no",{delay:1,duration:.5,opacity:1,visibility:"visible"})),await(0,o.bA)(`./cultures/${data.culture}/audio/s-cat.mp3`),(0,o.hY)(`./cultures/${data.culture}/audio/s-cat.mp3`,"link-s-cat-headphones");const a=await(0,d.c)(["link-s-cat-yes","link-s-cat-no"]);if(console.log(a.id),data.procedure.sCat.response=a.id,data.animalSlideCounter<=4){if(a.id.includes("-yes")){const a=["ok","alright"],t=a[Math.floor(Math.random()*a.length)];await(0,o.bA)(`./cultures/${data.culture}/audio/neutral-resp-${t}.mp3`)}if(a.id.includes("-no")){const a=["resp-no","resp-no-next"],t=a[Math.floor(Math.random()*a.length)];await(0,o.bA)(`./cultures/${data.culture}/audio/animal-${t}.mp3`)}}await(0,c._v)(s.Z.globals.animalSlidesGap)}},7103:(a,t,e)=>{e.d(t,{c:()=>i});const i=a=>new Promise((t=>{const e=a=>{const e=a.target;return t(e)};"string"==typeof a&&document.getElementById(a).addEventListener("click",e,{once:!0}),Array.isArray(a)&&a.forEach((a=>{document.getElementById(a).addEventListener("click",e,{once:!0})})),void 0===a&&document.getElementById("wrapper").addEventListener("click",e,{once:!0})}))}}]);