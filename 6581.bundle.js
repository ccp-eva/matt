"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6581],{6581:(t,e,a)=>{a.r(e),a.d(e,{default:()=>r});var o=a(6358),n=a(6486),d=a.n(n),l=a(9965),i=a(8503),u=a(1489);const r=async({currentSlide:t,previousSlide:e})=>{(0,u.TH)(t,e,[0,0]),data.procedure.sBallAnimation.completed=!1;const a=document.getElementById("audio"),n=document.getElementById("link-sba-ball"),r=Math.round(n.getBBox().width/2+n.getBBox().x),s=document.getElementById("sba-inner"),c=document.getElementById("sba-middle"),m=document.getElementById("sba-outer");let p=!0;a.addEventListener("play",(()=>{p=!0})),a.addEventListener("ended",(()=>{p=!1})),o.p8.set(n,{autoAlpha:0,transformOrigin:"50% 50%"}),o.p8.set([s,c,m],{opacity:.5});const b=d().shuffle(["inner","middle","outer"]);for(data.procedure.sBallAnimation.order=b,(0,l.hY)(`./cultures/${data.culture}/audio/s-ball-animation.mp3`),o.p8.timeline().to(n,{delay:2,duration:1,autoAlpha:1});p;)await(0,i._v)(100);for(const[t,e]of b.entries())(0,l.hY)(`./cultures/${data.culture}/audio/sba-${e}.mp3`),await o.p8.timeline().to(n,{delay:2,duration:1,x:Number(document.getElementById(`sba-${e}-anchor`).getAttribute("cx"))-r}).to(`#sba-${e}`,{duration:1,opacity:1},"<.5").to(n,{scale:.5},"<").to(n,{delay:2,autoAlpha:0}).to(`#sba-${e}`,{autoAlpha:.5,onComplete:()=>{2===t&&(data.procedure.sBallAnimation.completed=!0)}},"<.3"),t<2&&o.p8.timeline().to(n,{x:0,scale:1,delay:0}).to(n,{autoAlpha:1,duration:1});for(;!data.procedure.sBallAnimation.completed;)await(0,i._v)(500)}}}]);