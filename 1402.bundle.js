"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[1402],{1402:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var l=a(6358),o=a(6486),s=a.n(o),d=a(8503),n=a(1489);const r=async()=>{(0,n.TH)(s().kebabCase(data.currentSlide),s().kebabCase(data.previousSlide),[2,2]);const e=document.getElementById("fsplayer");let t=!0;for(e.addEventListener("play",(()=>{t=!0})),e.addEventListener("ended",(()=>{t=!1})),l.p8.set(e,{autoAlpha:0}),e.style.display="block",l.p8.timeline().to("#svg",{backgroundColor:"#000",duration:1}).to(e,{autoAlpha:1,onStart:()=>{e.src=`./cultures/${data.culture}/video/s-resolve-dilemma-720p.mp4`}});t;)await(0,d._v)(100);l.p8.timeline().to("#svg",{backgroundColor:"#fff",duration:1}).to(e,{autoAlpha:0},"<"),await(0,d._v)(500),e.style.display="none"}}}]);