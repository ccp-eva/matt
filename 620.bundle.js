"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[620],{620:(t,e,r)=>{r.r(e),r.d(e,{default:()=>c});var i=r(6486),a=r.n(i),d=r(6358),o=r(2354),s=r(9965),u=r(8503),l=r(7103),n=r(1489);d.p8.registerPlugin(o._);const c=async({currentSlide:t,previousSlide:e})=>{(0,n.TH)(t,e),data.rankingSlideCounter++;const r="sqrs",i="nam-duiker",c="nam-dog",p=document.getElementById("audio"),h=document.getElementById(`link-${r}-headphones`),m=document.getElementById("text-notAtAll_00000119101545621975622980000006691107748733813144_").children[0],g=document.getElementById("text-aLittle_00000141457109707056427460000011131352617261620633_").children[0],y=document.getElementById("text-aMediumAmount_00000028312038065717232940000011223039209520139432_").children[0],f=document.getElementById("text-aLotSimilar").children[0],A=document.getElementById(`${r}-1`),E=A.getAttribute("fill"),$=document.getElementById(`${r}-2`),b=$.getAttribute("fill"),v=document.getElementById(`${r}-3`),x=v.getAttribute("fill"),S=document.getElementById(`${r}-4`),B=S.getAttribute("fill"),I=document.getElementById(`link-${r}-${i}`),T=document.getElementById(`link-${r}-${c}`),k=document.getElementById(`link-${r}-next`),L=(new Map).set(0,{x:800,y:330}).set(1,{x:1120,y:330}),w=a().shuffle([i,c]),_=w.map((t=>document.getElementById(`link-${r}-${t}`)));data.procedure[data.currentSlide]={response:"",order:w,duration:0,[i]:{position:0,coords:{x:0,y:0}},[c]:{position:0,coords:{x:0,y:0}}};const Y={[i]:w.indexOf(i),[c]:w.indexOf(c)};(0,u.PA)(_[0],L.get(0).x,L.get(0).y),(0,u.PA)(_[1],L.get(1).x,L.get(1).y),d.p8.set([m,g,y,f,A,$,v,S,k],{autoAlpha:0}),d.p8.set(_,{transformOrigin:"50% 50%"}),d.p8.set([_,h],{autoAlpha:.5}),h.style.pointerEvents="none",await(0,s.bA)(`./cultures/${data.culture}/audio/${r}.mp3`),d.p8.timeline().to([A,m],{autoAlpha:1}).to([$,g],{delay:1.5,autoAlpha:1}).to([v,y],{delay:1.5,autoAlpha:1}).to([S,f],{delay:1,autoAlpha:1}),await(0,s.bA)(`./cultures/${data.culture}/audio/${r}-resp.mp3`),(0,s.hY)(`./cultures/${data.culture}/audio/${r}.mp3`,h.id),1===data.rankingSlideCounter&&await(0,s.bA)(`./cultures/${data.culture}/audio/sqre-expl.mp3`),d.p8.to([I,T,h],{autoAlpha:1}),h.style.pointerEvents="visible";let P=!1;p.addEventListener("play",(t=>{P=!0,t.target.src.includes(`${r}-`)||d.p8.to([I,T,h],{autoAlpha:.5,pointerEvents:"none"})})),p.addEventListener("ended",(()=>{P=!1,d.p8.to([I,T,h],{autoAlpha:1,pointerEvents:"visible"})})),[A,$,v,S].forEach(((t,e)=>{t.addEventListener("click",(()=>{(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-${e}.mp3`)}))})),[A,$,v,S].forEach((t=>{t.addEventListener("mouseover",(()=>{t.setAttribute("fill","#c6d325"),t.style.cursor="pointer"}))})),[A,$,v,S].forEach((t=>{t.addEventListener("mouseout",(()=>{t.style.cursor="default"}))})),A.addEventListener("mouseout",(()=>{A.setAttribute("fill",E)})),$.addEventListener("mouseout",(()=>{$.setAttribute("fill",b)})),v.addEventListener("mouseout",(()=>{v.setAttribute("fill",x)})),S.addEventListener("mouseout",(()=>{S.setAttribute("fill",B)})),o._.create([I,T],{onPress:function(){let t=this.target.id.slice(10);(0,s.hY)(`./cultures/${data.culture}/audio/${r}-${t}.mp3`)},onDrag:function(){this.hitTest(A,"70%")?(A.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):A.setAttribute("fill",E),this.hitTest($,"70%")?($.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):$.setAttribute("fill",b),this.hitTest(v,"70%")?(v.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):v.setAttribute("fill",x),this.hitTest(S,"70%")?(S.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):S.setAttribute("fill",B),this.hitTest(A,"70%")||this.hitTest($,"70%")||this.hitTest(v,"70%")||this.hitTest(S,"70%")||d.p8.to(this.target,{scale:1})},onDragEnd:function(){const t=this.target,e=t.id.slice(10),i=Y[e],a=d.p8.getProperty(t,"x"),o=d.p8.getProperty(t,"y");console.log(e),console.log(i),this.hitTest(A,"70%")&&(data.procedure[data.currentSlide][e].position=1,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,A.setAttribute("fill",E),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-0.mp3`)),this.hitTest($,"70%")&&(data.procedure[data.currentSlide][e].position=2,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,$.setAttribute("fill",b),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-1.mp3`)),this.hitTest(v,"70%")&&(data.procedure[data.currentSlide][e].position=3,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,v.setAttribute("fill",x),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-2.mp3`)),this.hitTest(S,"70%")&&(data.procedure[data.currentSlide][e].position=4,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,S.setAttribute("fill",B),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-3.mp3`)),this.hitTest(A,"70%")||this.hitTest($,"70%")||this.hitTest(v,"70%")||this.hitTest(S,"70%")||(0===data.procedure[data.currentSlide][e].position?d.p8.to(t,{x:L.get(i).x,y:L.get(i).y}):d.p8.to(t,{x:data.procedure[data.currentSlide][e].coords.x,y:data.procedure[data.currentSlide][e].coords.y,scale:.5}))}});const C=()=>{let t=[];return w.forEach((e=>{data.procedure[data.currentSlide][e].position||t.push(!1)})),t};for(;C().length>0;)await(0,u._v)(100);for(;P;)await(0,u._v)(100);for(P=!0,(0,s.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`),d.p8.to(k,{autoAlpha:.5,pointerEvents:"none"}),d.p8.timeline().to(k,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0});P;)await(0,u._v)(100);d.p8.to(k,{autoAlpha:1,pointerEvents:"visible"}),await(0,l.c)(k.id)}},7103:(t,e,r)=>{r.d(e,{c:()=>i});const i=t=>new Promise((e=>{const r=t=>{const r=t.target;return e(r)};"string"==typeof t&&document.getElementById(t).addEventListener("click",r,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",r,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",r,{once:!0})}))}}]);