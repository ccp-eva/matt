"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[8226],{8226:(e,t,i)=>{i.r(t),i.d(t,{default:()=>r});var a=i(8503),n=i(1489);const r=async({currentSlide:e,previousSlide:t})=>{(0,n.TH)(e,t);const i=document.getElementById("s-blocking-state");i.removeAttribute("visibility");const r=await fetch(`./cultures/${data.culture}/video/intro-reasoning.webm`),s=await r.blob();URL.createObjectURL(s),i.setAttribute("visibility","hidden");const c=document.getElementById("player");let d=!0;for(c.addEventListener("play",(()=>{d=!0})),c.addEventListener("ended",(()=>{d=!1})),c.src=`./cultures/${data.culture}/video/intro-reasoning.webm`;d;)await(0,a._v)(100)}}}]);