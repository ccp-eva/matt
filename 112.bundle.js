"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[112],{112:(t,e,r)=>{r.r(e),r.d(e,{default:()=>c});var i=r(6486),a=r.n(i),d=r(6358),o=r(2354),s=r(9965),u=r(8503),n=r(7103),l=r(1489);d.p8.registerPlugin(o._);const c=async({currentSlide:t,previousSlide:e})=>{(0,l.TH)(t,e),data.rankingSlideCounter++;const r="sqri",i="nam-duiker",c="nam-dog",p="nam-human",h=document.getElementById("audio"),m=document.getElementById(`link-${r}-headphones`),y=document.getElementById("text-notAtAll").children[0],g=document.getElementById("text-aLittle").children[0],f=document.getElementById("text-aMediumAmount").children[0],A=document.getElementById("text-verySmart").children[0],E=document.getElementById(`${r}-1`),$=E.getAttribute("fill"),x=document.getElementById(`${r}-2`),v=x.getAttribute("fill"),b=document.getElementById(`${r}-3`),S=b.getAttribute("fill"),B=document.getElementById(`${r}-4`),I=B.getAttribute("fill"),k=document.getElementById(`link-${r}-${i}`),T=document.getElementById(`link-${r}-${c}`),w=document.getElementById(`link-${r}-${p}`),L=document.getElementById(`link-${r}-next`),P=(new Map).set(0,{x:700,y:330}).set(1,{x:960,y:330}).set(2,{x:1220,y:330}),Y=a().shuffle([i,c,p]),_=Y.map((t=>document.getElementById(`link-${r}-${t}`)));data.procedure[data.currentSlide]={response:"",order:Y,duration:0,[i]:{position:0,coords:{x:0,y:0}},[c]:{position:0,coords:{x:0,y:0}},[p]:{position:0,coords:{x:0,y:0}}};const C={[i]:Y.indexOf(i),[c]:Y.indexOf(c),[p]:Y.indexOf(p)};(0,u.PA)(_[0],P.get(0).x,P.get(0).y),(0,u.PA)(_[1],P.get(1).x,P.get(1).y),(0,u.PA)(_[2],P.get(2).x,P.get(2).y),d.p8.set([y,g,f,A,E,x,b,B,L],{autoAlpha:0}),d.p8.set(_,{transformOrigin:"50% 50%"}),d.p8.set([_,m],{autoAlpha:.5}),m.style.pointerEvents="none",await(0,s.bA)(`./cultures/${data.culture}/audio/${r}.mp3`),d.p8.timeline().to([E,y],{autoAlpha:1}).to([x,g],{delay:1.5,autoAlpha:1}).to([b,f],{delay:1.5,autoAlpha:1}).to([B,A],{delay:1.5,autoAlpha:1}),await(0,s.bA)(`./cultures/${data.culture}/audio/${r}-resp.mp3`),(0,s.hY)(`./cultures/${data.culture}/audio/${r}.mp3`,m.id),1===data.rankingSlideCounter&&await(0,s.bA)(`./cultures/${data.culture}/audio/sqr-expl.mp3`),d.p8.to([k,T,w,m],{autoAlpha:1}),m.style.pointerEvents="visible";let O=!1;h.addEventListener("play",(t=>{O=!0,t.target.src.includes(`${r}-`)||d.p8.to([k,T,w,m],{autoAlpha:.5,pointerEvents:"none"})})),h.addEventListener("ended",(()=>{O=!1,d.p8.to([k,T,w,m],{autoAlpha:1,pointerEvents:"visible"})})),[E,x,b,B].forEach(((t,e)=>{t.addEventListener("click",(()=>{(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-${e}.mp3`)}))})),[E,x,b,B].forEach((t=>{t.addEventListener("mouseover",(()=>{t.setAttribute("fill","#c6d325"),t.style.cursor="pointer"}))})),[E,x,b,B].forEach((t=>{t.addEventListener("mouseout",(()=>{t.style.cursor="default"}))})),E.addEventListener("mouseout",(()=>{E.setAttribute("fill",$)})),x.addEventListener("mouseout",(()=>{x.setAttribute("fill",v)})),b.addEventListener("mouseout",(()=>{b.setAttribute("fill",S)})),B.addEventListener("mouseout",(()=>{B.setAttribute("fill",I)})),o._.create([k,T,w],{onPress:function(){let t=this.target.id.slice(10);(0,s.hY)(`./cultures/${data.culture}/audio/${r}-${t}.mp3`)},onDrag:function(){this.hitTest(E,"70%")?(E.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):E.setAttribute("fill",$),this.hitTest(x,"70%")?(x.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):x.setAttribute("fill",v),this.hitTest(b,"70%")?(b.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):b.setAttribute("fill",S),this.hitTest(B,"70%")?(B.setAttribute("fill","#c6d325"),d.p8.to(this.target,{scale:.5})):B.setAttribute("fill",I),this.hitTest(E,"70%")||this.hitTest(x,"70%")||this.hitTest(b,"70%")||this.hitTest(B,"70%")||d.p8.to(this.target,{scale:1})},onDragEnd:function(){const t=this.target,e=t.id.slice(10),i=C[e],a=d.p8.getProperty(t,"x"),o=d.p8.getProperty(t,"y");console.log(e),console.log(i),this.hitTest(E,"70%")&&(data.procedure[data.currentSlide][e].position=1,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,E.setAttribute("fill",$),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-0.mp3`)),this.hitTest(x,"70%")&&(data.procedure[data.currentSlide][e].position=2,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,x.setAttribute("fill",v),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-1.mp3`)),this.hitTest(b,"70%")&&(data.procedure[data.currentSlide][e].position=3,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,b.setAttribute("fill",S),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-2.mp3`)),this.hitTest(B,"70%")&&(data.procedure[data.currentSlide][e].position=4,data.procedure[data.currentSlide][e].coords.x=a,data.procedure[data.currentSlide][e].coords.y=o,B.setAttribute("fill",I),(0,s.hY)(`./cultures/${data.culture}/audio/${r}-resp-3.mp3`)),this.hitTest(E,"70%")||this.hitTest(x,"70%")||this.hitTest(b,"70%")||this.hitTest(B,"70%")||(0===data.procedure[data.currentSlide][e].position?d.p8.to(t,{x:P.get(i).x,y:P.get(i).y}):d.p8.to(t,{x:data.procedure[data.currentSlide][e].coords.x,y:data.procedure[data.currentSlide][e].coords.y,scale:.5}))}});const q=()=>{let t=[];return Y.forEach((e=>{data.procedure[data.currentSlide][e].position||t.push(!1)})),t};for(;q().length>0;)await(0,u._v)(100);for(;O;)await(0,u._v)(100);for(O=!0,(0,s.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`),d.p8.to(L,{autoAlpha:.5,pointerEvents:"none"}),d.p8.timeline().to(L,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0});O;)await(0,u._v)(100);d.p8.to(L,{autoAlpha:1,pointerEvents:"visible"}),await(0,n.c)(L.id)}},7103:(t,e,r)=>{r.d(e,{c:()=>i});const i=t=>new Promise((e=>{const r=t=>{const r=t.target;return e(r)};"string"==typeof t&&document.getElementById(t).addEventListener("click",r,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",r,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",r,{once:!0})}))}}]);