"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[5709],{5709:(e,t,o)=>{o.r(t),o.d(t,{default:()=>l});var a=o(6358),r=o(2354),n=o(6486),s=o.n(n),i=o(9965),c=o(7103),d=o(8503),u=o(1489);a.p8.registerPlugin(r._);const l=async({currentSlide:e,previousSlide:t})=>{(0,u.TH)(e,t,[0,0]),data.procedure.sTaskNam={duration:0,knownAnimals:[],unknownAnimals:[],humannam:{circle:void 0,coords:{x:0,y:0}},chicken:{circle:void 0,coords:{x:0,y:0}},giraffe:{circle:void 0,coords:{x:0,y:0}},dog:{circle:void 0,coords:{x:0,y:0}},jackal:{circle:void 0,coords:{x:0,y:0}},kudu:{circle:void 0,coords:{x:0,y:0}},duiker:{circle:void 0,coords:{x:0,y:0}},goat:{circle:void 0,coords:{x:0,y:0}},cat:{circle:void 0,coords:{x:0,y:0}},knownAnimalOrder:[],comprehension:{completed:!1,order:s().shuffle(["inner","middle","outer"]),inner:!1,middle:!1,outer:!1}};const o=document.getElementById("link-stnam-next"),n=document.getElementById("pinda"),l=document.getElementById("audio"),p=document.getElementById("link-stnam-headphones"),m=document.getElementById("stnam-circle");var h=["st-inner_00000111193153495179483650000012882157666067060627_","st-middle_00000116943692329885647660000013516267308605867198_","st-outer_00000165230124352602184370000000652073352036233093_"];const v=document.getElementById(h[0]),y=document.getElementById(h[1]),g=document.getElementById(h[2]);a.p8.to([v,y,g],{opacity:.5});const k=(new Map).set(0,{x:1330,y:306}).set(1,{x:1539,y:306}).set(2,{x:1748,y:306}).set(3,{x:1330,y:543}).set(4,{x:1539,y:543}).set(5,{x:1748,y:543}).set(6,{x:1330,y:774}).set(7,{x:1539,y:774}).set(8,{x:1748,y:774});let E=[],x=[];["chicken","giraffe","dog","jackal","kudu","duiker","goat","cat"].forEach((e=>{const t=s().camelCase(`s-${e}`);if(!data.procedure[t])return console.warn(`${e} not found in data.procedure, treating it as unknown.`),void x.push(e);"yes"===data.procedure[t].response.split("-").at(-1)&&E.push(e),"no"===data.procedure[t].response.split("-").at(-1)&&x.push(e)})),E=[...E,"humannam"];let f=s().shuffle(E);data.animalOrder&&(f=data.animalOrder.map((e=>e.slice(2))));const w=s().intersection(f,E);data.procedure.sTaskNam.knownAnimals=E,data.procedure.sTaskNam.unknownAnimals=x,data.procedure.sTaskNam.knownAnimalOrder=w;const B=w.map((e=>document.getElementById(`link-stnam-${e}`))),A=x.map((e=>document.getElementById(`link-stnam-${e}`)));a.p8.set(A,{autoAlpha:0}),a.p8.set(B,{autoAlpha:.5}),a.p8.set([o,p],{autoAlpha:0,pointerEvents:"none"}),B.forEach(((e,t)=>{(0,d.PA)(e,k.get(t).x,k.get(t).y)}));const L=w.reduce(((e,t,o)=>(e[t]=o,e)),{});let T=!0;n.addEventListener("play",(()=>{T=!0})),l.addEventListener("play",(()=>{T=!0})),n.addEventListener("ended",(()=>{T=!1,a.p8.to(n,{autoAlpha:0})})),l.addEventListener("ended",(()=>{T=!1}));const N=document.getElementById("s-blocking-state");N.removeAttribute("visibility");const $=await fetch(`./cultures/${data.culture}/video/s-task.${data.meta.videoExtension}`),b=await $.blob(),I=URL.createObjectURL(b);for(N.setAttribute("visibility","hidden"),n.src=I;T;)await(0,d._v)(100);a.p8.to(B,{autoAlpha:1}),(0,i.hY)(`./cultures/${data.culture}/audio/s-task-cut.mp3`,p.id),a.p8.to(p,{autoAlpha:1,pointerEvents:"visible"});const _=v.getBBox().width/2,M=y.getBBox().width/2,O=g.getBBox().width/2,Y=v.getBBox().x+_,P=v.getBBox().y+_,C=r._.create(B,{onPress:function(){let e=this.target.id.slice(11);(0,i.hY)(`./cultures/${data.culture}/audio/st-${e}.mp3`)},onDrag:function(){const e=this.target,t=e.getBBox(),o=e.getBBox().height/2,r=e.getBBox().width/2;let n=t.x+r+this.x,s=t.y+o+this.y;const i=Math.sqrt(Math.pow(n-Y,2)+Math.pow(s-P,2));1.2*i<=_+r&&(a.p8.to(v,{opacity:1}),a.p8.to([y,g],{opacity:.5})),1.2*i<=M+r&&1.2*i>_+r&&(a.p8.to(y,{opacity:1}),a.p8.to([v,g],{opacity:.5})),1.2*i<=O+r&&1.2*i>M+r&&(a.p8.to(g,{opacity:1}),a.p8.to([v,y],{opacity:.5}),a.p8.to(this.target,{scale:.5,transformOrigin:"50% 50%"})),1.2*i>O+r&&(a.p8.to(this.target,{scale:1,transformOrigin:"50% 50%"}),a.p8.to([v,y,g],{opacity:.5}))},onDragEnd:function(){const e=this.target,t=e.id;console.log(t);const o=t.slice(11),r=e.getBBox(),n=e.getBBox().height/2,s=e.getBBox().width/2,c=a.p8.getProperty(e,"x"),d=a.p8.getProperty(e,"y"),u=L[o];let l=r.x+s+this.x,p=r.y+n+this.y;const m=Math.sqrt(Math.pow(l-Y,2)+Math.pow(p-P,2));1.2*m<=_+s&&((0,i.hY)(`./cultures/${data.culture}/audio/inner.mp3`),data.procedure.sTaskNam[o].circle="inner",data.procedure.sTaskNam[o].coords.x=c,data.procedure.sTaskNam[o].coords.y=d,a.p8.to(v,{opacity:.5,duration:.25})),1.2*m<=M+s&&1.2*m>_+s&&((0,i.hY)(`./cultures/${data.culture}/audio/middle.mp3`),data.procedure.sTaskNam[o].circle="middle",data.procedure.sTaskNam[o].coords.x=c,data.procedure.sTaskNam[o].coords.y=d,a.p8.to(y,{opacity:.5,duration:.25})),1.2*m<=O+s&&1.2*m>M+s&&((0,i.hY)(`./cultures/${data.culture}/audio/outer.mp3`),data.procedure.sTaskNam[o].circle="outer",data.procedure.sTaskNam[o].coords.x=c,data.procedure.sTaskNam[o].coords.y=d,a.p8.to(g,{opacity:.5,duration:.25})),1.2*m>O+s&&(void 0===data.procedure.sTaskNam[o].circle?a.p8.to(e,{x:k.get(u).x,y:k.get(u).y}):a.p8.to(e,{x:data.procedure.sTaskNam[o].coords.x,y:data.procedure.sTaskNam[o].coords.y,scale:.5}))}}),j=()=>{let e=[];return E.forEach((t=>{data.procedure.sTaskNam[t].circle||e.push(!1)})),e},q=()=>{let e=0;return E.forEach((t=>{data.procedure.sTaskNam[t].circle&&e++})),e};for(;q()<Math.ceil(E.length/2);)await(0,d._v)(500);for(console.log("Comprehension check..."),a.p8.to([B,v,y,g],{opacity:.5}),C.forEach((e=>{e.disable()}));T;)await(0,d._v)(100);function D(){a.p8.timeline().to(v,{autoAlpha:1})}function R(){a.p8.timeline().to(v,{autoAlpha:.5})}function S(){a.p8.timeline().to(y,{autoAlpha:1})}function U(){a.p8.timeline().to(y,{autoAlpha:.5})}function H(){a.p8.timeline().to(g,{autoAlpha:1})}function z(){a.p8.timeline().to(g,{autoAlpha:.5})}for(const[e,t]of data.procedure.sTaskNam.comprehension.order.entries()){a.p8.set(p,{opacity:.5,pointerEvents:"none"}),(0,i.hY)(`./cultures/${data.culture}/audio/s-comp-check-${t}.mp3`,p.id),0===e&&await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check.mp3`),await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check-${t}.mp3`),0===e&&await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check-expl.mp3`),a.p8.set(p,{opacity:1,pointerEvents:"visible"}),m.style.cursor="pointer",v.addEventListener("mousemove",D),v.addEventListener("mouseenter",D),v.addEventListener("mouseleave",R),y.addEventListener("mousemove",S),y.addEventListener("mouseenter",S),y.addEventListener("mouseleave",U),g.addEventListener("mousemove",H),g.addEventListener("mouseenter",H),g.addEventListener("mouseleave",z);const o=await(0,c.c)(h);m.style.cursor="default",v.removeEventListener("mousemove",D),v.removeEventListener("mouseenter",D),v.removeEventListener("mouseleave",R),y.removeEventListener("mousemove",S),y.removeEventListener("mouseenter",S),y.removeEventListener("mouseleave",U),g.removeEventListener("mousemove",H),g.removeEventListener("mouseenter",H),g.removeEventListener("mouseleave",z);const r=["ok","alright","okThanks"],n=r[Math.floor(Math.random()*r.length)];await(0,i.bA)(`./cultures/${data.culture}/audio/neutral-resp-${n}.mp3`),a.p8.to([v,y,g],{autoAlpha:.5}),o.id.split("_")[0].split("-")[1]===t&&(data.procedure.sTaskNam.comprehension[t]=!0)}for(console.log(data.procedure.sTaskNam.comprehension),data.procedure.sTaskNam.comprehension.completed=!0,a.p8.to(B,{opacity:1}),C.forEach((e=>{e.enable()}));j().length>0;)await(0,d._v)(1e3);for(T=!0,(0,i.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`),a.p8.timeline().to(o,{autoAlpha:.5}).to(o,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0});T;)await(0,d._v)(100);a.p8.to(o,{autoAlpha:1,pointerEvents:"visible"}),await(0,c.c)(o.id)}},7103:(e,t,o)=>{o.d(t,{c:()=>a});const a=e=>new Promise((t=>{const o=e=>{const o=e.target;return t(o)};"string"==typeof e&&document.getElementById(e).addEventListener("click",o,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",o,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",o,{once:!0})}))}}]);