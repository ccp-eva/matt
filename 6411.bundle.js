"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6411],{6411:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var o=a(6358),d=a(6486),l=a.n(d),u=a(8503),r=a(1489);const c=async()=>{data.procedure.sMcIntro.completed=!1,(0,r.TH)(l().kebabCase(data.currentSlide),l().kebabCase(data.previousSlide));const t=document.getElementById("smci-inner"),e=document.getElementById("smci-middle"),a=document.getElementById("smci-outer");o.p8.set([t,e,a],{autoAlpha:0});const d=document.getElementById("player");o.p8.set(d,{autoAlpha:0});const c=o.p8.timeline();for(c.to(d,{autoAlpha:1,duration:1,onStart:()=>{d.src=`./cultures/${data.culture}/video/s-outro-animals-mc-intro.webm`}}),c.to([t,e,a],{autoAlpha:.5,delay:3.5}),c.to(t,{delay:10.5,autoAlpha:1,repeat:2}).to(t,{autoAlpha:.5}).to(e,{delay:2.5,autoAlpha:1,repeat:2}).to(e,{autoAlpha:.5}).to(a,{delay:1.5,autoAlpha:1,repeat:2,reversed:!0}).to(a,{autoAlpha:.5}).to(d,{delay:2,autoAlpha:0,duration:2,onComplete:()=>{data.procedure.sMcIntro.completed=!0}});!data.procedure.sMcIntro.completed;)await(0,u._v)(100);await(0,u._v)(1e3)}}}]);