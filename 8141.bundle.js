"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[8141],{8141:(e,t,o)=>{o.r(t),o.d(t,{default:()=>p});var a=o(6358),r=o(2354),s=o(6486),n=o.n(s),i=o(9965),c=o(7103),d=o(8503),u=o(1489);a.p8.registerPlugin(r._);const p=async({currentSlide:e,previousSlide:t})=>{(0,u.TH)(e,t,[0,0]),data.procedure.sTaskPe={duration:0,knownAnimals:[],unknownAnimals:[],humanpe:{circle:void 0,coords:{x:0,y:0}},chicken:{circle:void 0,coords:{x:0,y:0}},pig:{circle:void 0,coords:{x:0,y:0}},dog:{circle:void 0,coords:{x:0,y:0}},turkey:{circle:void 0,coords:{x:0,y:0}},parrot:{circle:void 0,coords:{x:0,y:0}},cow:{circle:void 0,coords:{x:0,y:0}},rabbit:{circle:void 0,coords:{x:0,y:0}},cat:{circle:void 0,coords:{x:0,y:0}},knownAnimalOrder:[],comprehension:{completed:!1,order:n().shuffle(["inner","middle","outer"]),inner:!1,middle:!1,outer:!1}};const o=document.getElementById("link-stpe-next"),s=document.getElementById("pinda"),p=document.getElementById("audio"),l=document.getElementById("link-stpe-headphones"),m=document.getElementById("stpe-circle");var h=["st-inner_00000149358907631687098160000000388489300815861414_","st-middle_00000095308684437936268590000010908509682477369781_","st-outer_00000039100846412417604700000003552565995381353088_"];const v=document.getElementById(h[0]),y=document.getElementById(h[1]),g=document.getElementById(h[2]);a.p8.to([v,y,g],{opacity:.5});const k=(new Map).set(0,{x:1330,y:306}).set(1,{x:1539,y:306}).set(2,{x:1748,y:306}).set(3,{x:1330,y:543}).set(4,{x:1539,y:543}).set(5,{x:1748,y:543}).set(6,{x:1330,y:774}).set(7,{x:1539,y:774}).set(8,{x:1748,y:774});let E=[],x=[];["chicken","pig","dog","turkey","parrot","cow","rabbit","cat"].forEach((e=>{const t=n().camelCase(`s-${e}`);if(!data.procedure[t])return console.warn(`${e} not found in data.procedure, treating it as unknown.`),void x.push(e);"yes"===data.procedure[t].response.split("-").at(-1)&&E.push(e),"no"===data.procedure[t].response.split("-").at(-1)&&x.push(e)})),E=[...E,"humanpe"];let f=n().shuffle(E);data.animalOrder&&(f=data.animalOrder.map((e=>e.slice(2))));const w=n().intersection(f,E);data.procedure.sTaskPe.knownAnimals=E,data.procedure.sTaskPe.unknownAnimals=x,data.procedure.sTaskPe.knownAnimalOrder=w;const B=w.map((e=>document.getElementById(`link-stpe-${e}`))),A=x.map((e=>document.getElementById(`link-stpe-${e}`)));a.p8.set(A,{autoAlpha:0}),a.p8.set(B,{autoAlpha:.5}),a.p8.set([o,l],{autoAlpha:0,pointerEvents:"none"}),B.forEach(((e,t)=>{(0,d.PA)(e,k.get(t).x,k.get(t).y)}));const P=w.reduce(((e,t,o)=>(e[t]=o,e)),{});let L=!0;s.addEventListener("play",(()=>{L=!0})),p.addEventListener("play",(()=>{L=!0})),s.addEventListener("ended",(()=>{L=!1,a.p8.to(s,{autoAlpha:0})})),p.addEventListener("ended",(()=>{L=!1}));const b=document.getElementById("s-blocking-state");b.removeAttribute("visibility");const T=await fetch(`./cultures/${data.culture}/video/s-task.${data.meta.videoExtension}`),$=await T.blob(),I=URL.createObjectURL($);for(b.setAttribute("visibility","hidden"),s.src=I;L;)await(0,d._v)(100);a.p8.to(B,{autoAlpha:1}),(0,i.hY)(`./cultures/${data.culture}/audio/s-task-cut.mp3`,l.id),a.p8.to(l,{autoAlpha:1,pointerEvents:"visible"});const _=v.getBBox().width/2,M=y.getBBox().width/2,O=g.getBBox().width/2,Y=v.getBBox().x+_,C=v.getBBox().y+_,q=r._.create(B,{onPress:function(){let e=this.target.id.slice(10);(0,i.hY)(`./cultures/${data.culture}/audio/st-${e}.mp3`)},onDrag:function(){const e=this.target,t=e.getBBox(),o=e.getBBox().height/2,r=e.getBBox().width/2;let s=t.x+r+this.x,n=t.y+o+this.y;const i=Math.sqrt(Math.pow(s-Y,2)+Math.pow(n-C,2));1.2*i<=_+r&&(a.p8.to(v,{opacity:1}),a.p8.to([y,g],{opacity:.5})),1.2*i<=M+r&&1.2*i>_+r&&(a.p8.to(y,{opacity:1}),a.p8.to([v,g],{opacity:.5})),1.2*i<=O+r&&1.2*i>M+r&&(a.p8.to(g,{opacity:1}),a.p8.to([v,y],{opacity:.5}),a.p8.to(this.target,{scale:.5,transformOrigin:"50% 50%"})),1.2*i>O+r&&(a.p8.to(this.target,{scale:1,transformOrigin:"50% 50%"}),a.p8.to([v,y,g],{opacity:.5}))},onDragEnd:function(){const e=this.target,t=e.id;console.log(t);const o=t.slice(10),r=e.getBBox(),s=e.getBBox().height/2,n=e.getBBox().width/2,c=a.p8.getProperty(e,"x"),d=a.p8.getProperty(e,"y"),u=P[o];let p=r.x+n+this.x,l=r.y+s+this.y;const m=Math.sqrt(Math.pow(p-Y,2)+Math.pow(l-C,2));1.2*m<=_+n&&((0,i.hY)(`./cultures/${data.culture}/audio/inner.mp3`),data.procedure.sTaskPe[o].circle="inner",data.procedure.sTaskPe[o].coords.x=c,data.procedure.sTaskPe[o].coords.y=d,a.p8.to(v,{opacity:.5,duration:.25})),1.2*m<=M+n&&1.2*m>_+n&&((0,i.hY)(`./cultures/${data.culture}/audio/middle.mp3`),data.procedure.sTaskPe[o].circle="middle",data.procedure.sTaskPe[o].coords.x=c,data.procedure.sTaskPe[o].coords.y=d,a.p8.to(y,{opacity:.5,duration:.25})),1.2*m<=O+n&&1.2*m>M+n&&((0,i.hY)(`./cultures/${data.culture}/audio/outer.mp3`),data.procedure.sTaskPe[o].circle="outer",data.procedure.sTaskPe[o].coords.x=c,data.procedure.sTaskPe[o].coords.y=d,a.p8.to(g,{opacity:.5,duration:.25})),1.2*m>O+n&&(void 0===data.procedure.sTaskPe[o].circle?a.p8.to(e,{x:k.get(u).x,y:k.get(u).y}):a.p8.to(e,{x:data.procedure.sTaskPe[o].coords.x,y:data.procedure.sTaskPe[o].coords.y,scale:.5}))}}),D=()=>{let e=[];return E.forEach((t=>{data.procedure.sTaskPe[t].circle||e.push(!1)})),e},R=()=>{let e=0;return E.forEach((t=>{data.procedure.sTaskPe[t].circle&&e++})),e};for(;R()<Math.ceil(E.length/2);)await(0,d._v)(500);for(console.log("Comprehension check..."),a.p8.to([B,v,y,g],{opacity:.5}),q.forEach((e=>{e.disable()}));L;)await(0,d._v)(100);function S(){a.p8.timeline().to(v,{autoAlpha:1})}function U(){a.p8.timeline().to(v,{autoAlpha:.5})}function j(){a.p8.timeline().to(y,{autoAlpha:1})}function H(){a.p8.timeline().to(y,{autoAlpha:.5})}function z(){a.p8.timeline().to(g,{autoAlpha:1})}function F(){a.p8.timeline().to(g,{autoAlpha:.5})}for(const[e,t]of data.procedure.sTaskPe.comprehension.order.entries()){a.p8.set(l,{opacity:.5,pointerEvents:"none"}),(0,i.hY)(`./cultures/${data.culture}/audio/s-comp-check-${t}.mp3`,l.id),0===e&&await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check.mp3`),await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check-${t}.mp3`),0===e&&await(0,i.bA)(`./cultures/${data.culture}/audio/s-comp-check-expl.mp3`),a.p8.set(l,{opacity:1,pointerEvents:"visible"}),m.style.cursor="pointer",v.addEventListener("mousemove",S),v.addEventListener("mouseenter",S),v.addEventListener("mouseleave",U),y.addEventListener("mousemove",j),y.addEventListener("mouseenter",j),y.addEventListener("mouseleave",H),g.addEventListener("mousemove",z),g.addEventListener("mouseenter",z),g.addEventListener("mouseleave",F);const o=await(0,c.c)(h);m.style.cursor="default",v.removeEventListener("mousemove",S),v.removeEventListener("mouseenter",S),v.removeEventListener("mouseleave",U),y.removeEventListener("mousemove",j),y.removeEventListener("mouseenter",j),y.removeEventListener("mouseleave",H),g.removeEventListener("mousemove",z),g.removeEventListener("mouseenter",z),g.removeEventListener("mouseleave",F);const r=["ok","alright","okThanks"],s=r[Math.floor(Math.random()*r.length)];await(0,i.bA)(`./cultures/${data.culture}/audio/neutral-resp-${s}.mp3`),a.p8.to([v,y,g],{autoAlpha:.5}),o.id.split("_")[0].split("-")[1]===t&&(data.procedure.sTaskPe.comprehension[t]=!0)}for(console.log(data.procedure.sTaskPe.comprehension),data.procedure.sTaskPe.comprehension.completed=!0,a.p8.to(B,{opacity:1}),q.forEach((e=>{e.enable()}));D().length>0;)await(0,d._v)(1e3);for(a.p8.to([B,v,y,g],{opacity:.5}),q.forEach((e=>{e.disable()})),L=!0,(0,i.hY)(`./cultures/${data.culture}/audio/sqr-next-red.mp3`),a.p8.timeline().to(o,{autoAlpha:.5}).to(o,{filter:"drop-shadow(0px 0px 14px #a90707)",delay:1,repeat:-1,yoyo:!0,reversed:!0});L;)await(0,d._v)(100);a.p8.to(o,{autoAlpha:1,pointerEvents:"visible"}),await(0,c.c)(o.id)}},7103:(e,t,o)=>{o.d(t,{c:()=>a});const a=e=>new Promise((t=>{const o=e=>{const o=e.target;return t(o)};"string"==typeof e&&document.getElementById(e).addEventListener("click",o,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",o,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",o,{once:!0})}))}}]);