"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6850],{6850:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});var d=a(6358),n=a(6486),o=a.n(n),i=a(9965),r=a(7103),c=a(8503),l=a(1489);const s=async()=>{(0,l.TH)(o().kebabCase(data.currentSlide),o().kebabCase(data.previousSlide));let e=!1;[data.companionOrder,data.foodOrder,data.controlOrder].forEach((t=>{const a=t.length-1;t.indexOf(o().kebabCase(data.currentSlide))!==a||(e=!0)}));const t=document.getElementById("player");d.p8.set(t,{autoAlpha:0});const a="s2h1cow",n="oneCow",s="twoHumans",u=document.getElementById(`link-${a}-headphones`),m=document.getElementById("audio"),p=document.getElementById(`${a}-${n}`),v=document.getElementById(`${a}-cantDecide`),E=document.getElementById(`${a}-${s}`);d.p8.set([p,v,E,u],{opacity:.5,pointerEvents:"none"}),await(0,i.bA)(`./cultures/${data.culture}/audio/${a}-right.mp3`),await(0,i.bA)(`./cultures/${data.culture}/audio/saving.mp3`),d.p8.set([p,v,E,u],{opacity:1,pointerEvents:"visible"}),m.addEventListener("play",(()=>{d.p8.set([u,p,v,E],{autoAlpha:.25,pointerEvents:"none"})})),m.addEventListener("ended",(()=>{d.p8.to([u,p,v,E],{autoAlpha:1,pointerEvents:"visible"})})),(0,i.hY)(`./cultures/${data.culture}/audio/${a}-right.mp3`,u.id),[p,v,E].forEach((e=>{e.classList.add("dilemma-card")}));let y=await(0,r.c)([`${a}-${n}`,`${a}-cantDecide`,`${a}-${s}`]);for(;"g"!==y.tagName;)y=y.parentElement;if(console.log(y.id),data.procedure[data.currentSlide].response=y.id,e&&!data.dilemmaMotivationTwoPlayed){t.addEventListener("play",(()=>{e=!0})),t.addEventListener("ended",(()=>{e=!1}));let e=!0;for(d.p8.timeline().to(t,{autoAlpha:1,duration:2,onStart:()=>{!1===data.dilemmaMotivationOnePlayed?(t.src=`./cultures/${data.culture}/video/motivation-dilemma1.webm`,data.dilemmaMotivationOnePlayed=!0):(t.src=`./cultures/${data.culture}/video/motivation-dilemma2.webm`,data.dilemmaMotivationTwoPlayed=!0)}});e;)await(0,c._v)(100);d.p8.to(t,{autoAlpha:0})}await(0,c._v)(500)}},7103:(e,t,a)=>{a.d(t,{c:()=>d});const d=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);