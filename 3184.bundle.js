"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[3184],{3184:(t,e,a)=>{a.r(e),a.d(e,{default:()=>u});var d=a(6358),s=a(1489),n=a(6486),l=a.n(n),r=a(8503);const u=async()=>{(0,s.TH)(l().kebabCase(data.currentSlide),l().kebabCase(data.previousSlide));const t=document.getElementById("player");d.p8.set(t,{autoAlpha:0});let e=!0;for(d.p8.timeline().to(t,{autoAlpha:1,duration:2,onStart:()=>{t.src=`./cultures/${data.culture}/video/s-dilemma-start.webm`}}),t.addEventListener("play",(()=>{e=!0})),t.addEventListener("ended",(()=>{e=!1}));e;)await(0,r._v)(100);d.p8.to(t,{autoAlpha:0}),await(0,r._v)(500)}}}]);