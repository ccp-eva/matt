"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[784,6044],{784:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});var d=a(6044);const n=async({currentSlide:e,previousSlide:t})=>{await(0,d.sDilemmaCodeRunner)(e,t,"s1h1cat","oneHuman","oneCat",Math.random()<.5)}},6044:(e,t,a)=>{a.r(t),a.d(t,{sDilemmaCodeRunner:()=>u});var d=a(6358),n=a(8503),o=a(6486),i=a.n(o),r=a(9965),c=a(7103),l=a(1489);const u=async(e,t,a,o,u,s)=>{(0,l.TH)(e,t);let m=!1;data.companionOrder&&data.foodOrder&&data.controlOrder&&[data.companionOrder,data.foodOrder,data.controlOrder].forEach((e=>{const t=e.length-1;e.indexOf(i().kebabCase(data.currentSlide))!==t||(m=!0)}));const p=document.getElementById("pinda");d.p8.set(p,{autoAlpha:0});const v=document.getElementById(`link-${a}-headphones`),E=document.getElementById("audio"),$=document.getElementById(`${a}-${o}`),y=document.getElementById(`${a}-cantDecide`),h=document.getElementById(`${a}-${u}`);d.p8.set([$,y,h,v],{opacity:.5,pointerEvents:"none"}),data.procedure[data.currentSlide].swapLeftRight=s,s?((0,n.PA)($,1580),(0,n.PA)(h,340),await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-right.mp3`)):await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-left.mp3`),await(0,r.bA)(`./cultures/${data.culture}/audio/saving.mp3`),d.p8.set([$,y,h,v],{opacity:1,pointerEvents:"visible"}),E.addEventListener("play",(()=>{d.p8.set([v,$,y,h],{autoAlpha:.25,pointerEvents:"none"})})),E.addEventListener("ended",(()=>{d.p8.to([v,$,y,h],{autoAlpha:1,pointerEvents:"visible"})})),s?(0,r.hY)(`./cultures/${data.culture}/audio/${a}-right.mp3`,v.id):(0,r.hY)(`./cultures/${data.culture}/audio/${a}-left.mp3`,v.id),[$,y,h].forEach((e=>{e.classList.add("dilemma-card")}));let g=await(0,c.c)([`${a}-${o}`,`${a}-cantDecide`,`${a}-${u}`]);for(;"g"!==g.tagName;)g=g.parentElement;if(console.log(g.id),data.procedure[data.currentSlide].response=g.id,m&&!data.dilemmaMotivationTwoPlayed){p.addEventListener("play",(()=>{e=!0})),p.addEventListener("ended",(()=>{e=!1}));let e=!0;for(!1===data.dilemmaMotivationOnePlayed?(p.src=`./cultures/${data.culture}/video/motivation-dilemma1.${data.meta.videoExtension}`,data.dilemmaMotivationOnePlayed=!0):(p.src=`./cultures/${data.culture}/video/motivation-dilemma2.${data.meta.videoExtension}`,data.dilemmaMotivationTwoPlayed=!0),await d.p8.timeline().to(`#${$.parentElement.id}`,{autoAlpha:0});e;)await(0,n._v)(100)}}},7103:(e,t,a)=>{a.d(t,{c:()=>d});const d=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);