"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[1853],{1853:(e,a,t)=>{t.r(a),t.d(a,{default:()=>c});var s=t(6358),i=t(6486),n=t.n(i),l=t(5919),o=t(9965),d=t(7103),r=t(8503),u=t(1489);const c=async()=>{(0,u.TH)(n().kebabCase(data.currentSlide),n().kebabCase(data.previousSlide)),data.animalSlideCounter++,data.animalSlideCounter<=l.Z.globals.playAnimalYesNoAudio&&(s.p8.set(["#link-s-sheep-yes","#link-s-sheep-no"],{autoAlpha:0}),s.p8.timeline().to("#link-s-sheep-yes",{delay:2,duration:.5,opacity:1,visibility:"visible",onStart:()=>{(0,o.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`)}}).to("#link-s-sheep-no",{delay:1,duration:.5,opacity:1,visibility:"visible"})),await(0,o.bA)(`./cultures/${data.culture}/audio/s-sheep.mp3`),(0,o.hY)(`./cultures/${data.culture}/audio/s-sheep.mp3`,"link-s-sheep-headphones");const e=await(0,d.c)(["link-s-sheep-yes","link-s-sheep-no"]);if(console.log(e.id),data.procedure.sSheep.response=e.id,data.animalSlideCounter<=l.Z.globals.playAnimalResponseFeedback){if(e.id.includes("-yes")){const e=["ok","alright"],a=e[Math.floor(Math.random()*e.length)];await(0,o.bA)(`./cultures/${data.culture}/audio/neutral-resp-${a}.mp3`)}if(e.id.includes("-no")){const e=["resp-no","resp-no-next"],a=e[Math.floor(Math.random()*e.length)];await(0,o.bA)(`./cultures/${data.culture}/audio/animal-${a}.mp3`)}}await(0,r._v)(l.Z.globals.animalSlidesGap)}},7103:(e,a,t)=>{t.d(a,{c:()=>s});const s=e=>new Promise((a=>{const t=e=>{const t=e.target;return a(t)};"string"==typeof e&&document.getElementById(e).addEventListener("click",t,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",t,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",t,{once:!0})}))}}]);