"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[828],{2828:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var o=a(6486),d=a.n(o),n=a(6358),u=a(9965),s=a(7103),l=a(8503),c=a(1489);const r=async()=>{(0,c.TH)(d().kebabCase(data.currentSlide),d().kebabCase(data.previousSlide));const e=document.getElementById("text-ownershipChild"),t=document.getElementById("text-ownershipAdult"),a=document.getElementById("link-sqo-yes"),o=document.getElementById("link-sqo-no");n.p8.set([a,o],{autoAlpha:0}),"adult"===data.agegroup?(n.p8.set(e,{autoAlpha:0}),(0,u.hY)(`./cultures/${data.culture}/audio/sqo-adult.mp3`,"link-sqo-headphones"),await(0,u.bA)(`./cultures/${data.culture}/audio/sqo-adult.mp3`)):(n.p8.set(t,{autoAlpha:0}),(0,u.hY)(`./cultures/${data.culture}/audio/sqo-child.mp3`,"link-sqo-headphones"),await(0,u.bA)(`./cultures/${data.culture}/audio/sqo-child.mp3`)),n.p8.timeline().to(a,{autoAlpha:1,onStart:()=>{(0,u.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`)}}).to(o,{delay:1,autoAlpha:1});const r=await(0,s.c)(["link-sqo-yes","link-sqo-no"]);console.log(r.id),data.procedure[data.currentSlide]={response:r.id},await(0,l._v)(500)}},7103:(e,t,a)=>{a.d(t,{c:()=>o});const o=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);