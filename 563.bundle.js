"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[563],{4563:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var s=a(6486),d=a.n(s),u=a(6358),n=a(9965),l=a(7103),c=a(8503),o=a(1489);const i=async()=>{(0,o.TH)(d().kebabCase(data.currentSlide),d().kebabCase(data.previousSlide));const e=document.getElementById("text-feelingsChild"),t=document.getElementById("text-feelingsAdult"),a=document.getElementById("text-feelingsComp");u.p8.set(a,{autoAlpha:0}),"adult"===data.agegroup?(u.p8.set(e,{autoAlpha:0}),(0,n.hY)(`./cultures/${data.culture}/audio/sqf-adult.mp3`,"link-sqf-headphones"),await(0,n.bA)(`./cultures/${data.culture}/audio/sqf-adult.mp3`)):(u.p8.set(t,{autoAlpha:0}),(0,n.hY)(`./cultures/${data.culture}/audio/sqf-child.mp3`,"link-sqf-headphones"),await(0,n.bA)(`./cultures/${data.culture}/audio/sqf-child.mp3`));const s=await(0,l.c)(["link-sqf-yes","link-sqf-no"]);if(console.log(s.id),data.procedure[data.currentSlide]={response:s.id},s.id.includes("-yes")){u.p8.set([e,t],{autoAlpha:0}),u.p8.set(a,{autoAlpha:1}),(0,n.hY)(`./cultures/${data.culture}/audio/sqfc.mp3`,"link-sqf-headphones"),await(0,n.bA)(`./cultures/${data.culture}/audio/sqfc.mp3`);const s=await(0,l.c)(["link-sqf-yes","link-sqf-no"]);console.log(s.id),data.procedure.sQuFeelingsComp={response:s.id}}await(0,c._v)(500)}},7103:(e,t,a)=>{a.d(t,{c:()=>s});const s=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);