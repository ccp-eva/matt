"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[397],{397:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});var d=a(6358),n=a(6486),o=a.n(n),i=a(9965),r=a(7103),c=a(8503),l=a(1489);const s=async({currentSlide:e,previousSlide:t})=>{(0,l.TH)(e,t);let a=!1;[data.companionOrder,data.foodOrder,data.controlOrder].forEach((e=>{const t=e.length-1;e.indexOf(o().kebabCase(data.currentSlide))!==t||(a=!0)}));const n=document.getElementById("player");d.p8.set(n,{autoAlpha:0});const s="s100h1cow",u="oneCow",m="hundredHumans",p=document.getElementById(`link-${s}-headphones`),v=document.getElementById("audio"),E=document.getElementById(`${s}-${u}`),y=document.getElementById(`${s}-cantDecide`),$=document.getElementById(`${s}-${m}`);d.p8.set([E,y,$,p],{opacity:.5,pointerEvents:"none"}),await(0,i.bA)(`./cultures/${data.culture}/audio/${s}-right.mp3`),await(0,i.bA)(`./cultures/${data.culture}/audio/saving.mp3`),d.p8.set([E,y,$,p],{opacity:1,pointerEvents:"visible"}),v.addEventListener("play",(()=>{d.p8.set([p,E,y,$],{autoAlpha:.25,pointerEvents:"none"})})),v.addEventListener("ended",(()=>{d.p8.to([p,E,y,$],{autoAlpha:1,pointerEvents:"visible"})})),(0,i.hY)(`./cultures/${data.culture}/audio/${s}-right.mp3`,p.id),[E,y,$].forEach((e=>{e.classList.add("dilemma-card")}));let g=await(0,r.c)([`${s}-${u}`,`${s}-cantDecide`,`${s}-${m}`]);for(;"g"!==g.tagName;)g=g.parentElement;if(console.log(g.id),data.procedure[data.currentSlide].response=g.id,a&&!data.dilemmaMotivationTwoPlayed){n.addEventListener("play",(()=>{e=!0})),n.addEventListener("ended",(()=>{e=!1}));let e=!0;for(!1===data.dilemmaMotivationOnePlayed?(n.src=`./cultures/${data.culture}/video/motivation-dilemma1.webm`,data.dilemmaMotivationOnePlayed=!0):(n.src=`./cultures/${data.culture}/video/motivation-dilemma2.webm`,data.dilemmaMotivationTwoPlayed=!0),await d.p8.timeline().to(`#${E.parentElement.id}`,{autoAlpha:0});e;)await(0,c._v)(100)}}},7103:(e,t,a)=>{a.d(t,{c:()=>d});const d=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);