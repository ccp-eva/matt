"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[5538],{5538:(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var s=i(6486),r=i.n(s),a=i(6358),l=i(2354),n=i(9965),u=i(7103),d=i(8503),c=i(1489);a.p8.registerPlugin(l._);const o=async()=>{(0,c.TH)(r().kebabCase(data.currentSlide),r().kebabCase(data.previousSlide)),data.procedure.sQuRankingSimilarity={response:"",duration:0,cow:0,cat:0};const t=document.getElementById("player"),e=document.getElementById("link-sqrs-cow"),i=document.getElementById("link-sqrs-cat"),s=document.getElementById("sqrs-1"),o=s.getAttribute("fill"),m=document.getElementById("sqrs-2"),h=m.getAttribute("fill"),p=document.getElementById("sqrs-3"),g=p.getAttribute("fill"),f=document.getElementById("sqrs-4"),y=f.getAttribute("fill"),b=document.getElementById("link-sqrs-next");a.p8.set([b,t],{autoAlpha:0}),await(0,n.bA)(`./cultures/${data.culture}/audio/sqrs.mp3`),(0,n.hY)(`./cultures/${data.culture}/audio/sqrs.mp3`,"link-sqrs-headphones"),l._.create([e,i],{onPress:function(){let t=this.target.id.slice(10);(0,n.hY)(`./cultures/${data.culture}/audio/sqrs-${t}.mp3`)},onDrag:function(){this.target.id,this.hitTest(s,"70%")?s.setAttribute("fill","#c6d325"):s.setAttribute("fill",o),this.hitTest(m,"70%")?m.setAttribute("fill","#c6d325"):m.setAttribute("fill",h),this.hitTest(p,"70%")?p.setAttribute("fill","#c6d325"):p.setAttribute("fill",g),this.hitTest(f,"70%")?f.setAttribute("fill","#c6d325"):f.setAttribute("fill",y)},onDragEnd:function(){const t=this.target.id.slice(10);this.hitTest(s,"70%")&&(data.procedure.sQuRankingSimilarity[t]=1,s.setAttribute("fill",o)),this.hitTest(m,"70%")&&(data.procedure.sQuRankingSimilarity[t]=2,m.setAttribute("fill",h)),this.hitTest(p,"70%")&&(data.procedure.sQuRankingSimilarity[t]=3,p.setAttribute("fill",g)),this.hitTest(f,"70%")&&(data.procedure.sQuRankingSimilarity[t]=4,f.setAttribute("fill",y))}});const A=()=>{let t=[];return["cat","cow"].forEach((e=>{data.procedure.sQuRankingSimilarity[e]||t.push(!1)})),t};for(;A().length>0;)await(0,d._v)(2e3);a.p8.timeline().to(b,{autoAlpha:1,onStart:()=>{(0,n.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`)}}).to(b,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0}),await(0,u.c)("link-sqrs-next"),a.p8.timeline().to(t,{autoAlpha:1,onStart:()=>{t.src=`./cultures/${data.culture}/video/motivation-questions.webm`}}).to(t,{delay:3,autoAlpha:0}),await(0,d._v)(4e3)}},7103:(t,e,i)=>{i.d(e,{c:()=>s});const s=t=>new Promise((e=>{const i=t=>{const i=t.target;return e(i)};"string"==typeof t&&document.getElementById(t).addEventListener("click",i,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",i,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",i,{once:!0})}))}}]);