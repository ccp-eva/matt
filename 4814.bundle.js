"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[4814],{4814:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var r=a(6486),u=a.n(r),s=a(6358),i=a(2354),l=a(9965),d=a(7103),n=a(8503),o=a(1489);s.p8.registerPlugin(i._);const c=async()=>{(0,o.TH)(u().kebabCase(data.currentSlide),u().kebabCase(data.previousSlide)),data.procedure.sQuRankingExposure={response:"",duration:0,cow:0,cat:0};const t=document.getElementById("text-exposureChild"),e=document.getElementById("text-exposureAdult"),a=document.getElementById("link-sqre-cow"),r=document.getElementById("link-sqre-cat"),c=document.getElementById("sqre-1"),p=c.getAttribute("fill"),h=document.getElementById("sqre-2"),m=h.getAttribute("fill"),g=document.getElementById("sqre-3"),A=g.getAttribute("fill"),E=document.getElementById("sqre-4"),f=E.getAttribute("fill"),y=document.getElementById("text-never").children[0],b=document.getElementById("text-sometimes").children[0],k=document.getElementById("text-often").children[0],q=document.getElementById("text-almostEveryDay").children[0],x=document.getElementById("link-sqre-next");s.p8.set([c,h,h,g,E,x,y,b,k,q],{autoAlpha:0}),"adult"===data.agegroup?(s.p8.set(t,{autoAlpha:0}),(0,l.hY)(`./cultures/${data.culture}/audio/sqre-adult.mp3`,"link-sqre-headphones"),await(0,l.bA)(`./cultures/${data.culture}/audio/sqre-adult.mp3`)):(s.p8.set(e,{autoAlpha:0}),(0,l.hY)(`./cultures/${data.culture}/audio/sqre.mp3`,"link-sqre-headphones"),await(0,l.bA)(`./cultures/${data.culture}/audio/sqre.mp3`)),s.p8.timeline().to([c,y],{autoAlpha:1,onStart:()=>{(0,l.hY)(`./cultures/${data.culture}/audio/sqre-all-resp.mp3`)}}).to([h,b],{delay:1,autoAlpha:1}).to([g,k],{delay:1,autoAlpha:1}).to([E,q],{delay:.5,autoAlpha:1}),await(0,l.bA)(`./cultures/${data.culture}/audio/sqre.mp3`),(0,l.hY)(`./cultures/${data.culture}/audio/sqre.mp3`,"link-sqre-headphones"),i._.create([a,r],{onPress:function(){let t=this.target.id.slice(10);(0,l.hY)(`./cultures/${data.culture}/audio/sqre-${t}.mp3`)},onDrag:function(){this.target.id,this.hitTest(c,"70%")?c.setAttribute("fill","#c6d325"):c.setAttribute("fill",p),this.hitTest(h,"70%")?h.setAttribute("fill","#c6d325"):h.setAttribute("fill",m),this.hitTest(g,"70%")?g.setAttribute("fill","#c6d325"):g.setAttribute("fill",A),this.hitTest(E,"70%")?E.setAttribute("fill","#c6d325"):E.setAttribute("fill",f)},onDragEnd:function(){const t=this.target.id.slice(10);this.hitTest(c,"70%")&&(data.procedure.sQuRankingExposure[t]=1,c.setAttribute("fill",p)),this.hitTest(h,"70%")&&(data.procedure.sQuRankingExposure[t]=2,h.setAttribute("fill",m)),this.hitTest(g,"70%")&&(data.procedure.sQuRankingExposure[t]=3,g.setAttribute("fill",A)),this.hitTest(E,"70%")&&(data.procedure.sQuRankingExposure[t]=4,E.setAttribute("fill",f))}});const B=()=>{let t=[];return["cat","cow"].forEach((e=>{data.procedure.sQuRankingExposure[e]||t.push(!1)})),t};for(;B().length>0;)await(0,n._v)(2e3);s.p8.timeline().to(x,{autoAlpha:1,onStart:()=>{(0,l.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`)}}).to(x,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0}),await(0,d.c)("link-sqre-next"),await(0,n._v)(500)}},7103:(t,e,a)=>{a.d(e,{c:()=>r});const r=t=>new Promise((e=>{const a=t=>{const a=t.target;return e(a)};"string"==typeof t&&document.getElementById(t).addEventListener("click",a,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",a,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);