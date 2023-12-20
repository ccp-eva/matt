"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[61],{61:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var d=a(6358),n=a(9965),c=a(7103),l=a(1489);const u=async({currentSlide:e,previousSlide:t})=>{(0,l.TH)(e,t),data.procedure.sPracticeDilemma.completed=!1;const a=document.getElementById("spd-tenPencils"),u=document.getElementById("spd-cantDecide"),i=document.getElementById("spd-oneBike"),o=document.getElementById("spd-r-tenPencils"),r=document.getElementById("spd-r-cantDecide"),s=document.getElementById("spd-r-oneBike"),p=document.getElementById("link-spd-boat-tenPencils"),m=document.getElementById("link-spd-tenPencils"),y=document.getElementById("spd-b-tenPencils"),k=document.getElementById("text-tenPencils"),b=document.getElementById("link-spd-boat-oneBike"),B=document.getElementById("link-spd-oneBike"),h=document.getElementById("spd-b-oneBike"),E=document.getElementById("text-oneBike"),g=document.getElementById("text-questionMark_00000155127853693399251650000009331183858803794561_"),A=document.getElementById("spd-b-cantDecide"),I=document.getElementById("text-cantDecide_00000034056727285669922990000017223503196478564235_"),P=document.getElementById("link-b-tenPencils-yes"),D=document.getElementById("link-b-tenPencils-no"),v=document.getElementById("link-b-cantDecide-yes"),w=document.getElementById("link-b-cantDecide-no"),f=document.getElementById("link-b-oneBike-yes"),x=document.getElementById("link-b-oneBike-no"),$=document.getElementById("text-confirm_00000023995390546384149650000012972362905572281273_"),j=document.getElementById("text-confirm_00000023989285641362536010000011733819505523217558_"),R=document.getElementById("text-confirm");for(;!data.procedure.sPracticeDilemma.completed;){d.p8.set([p,m,y,k,b,B,h,E,g,A,I,P,D,v,w,f,x,$,j,R],{autoAlpha:0}),[P,D,v,w,f,x].forEach((e=>e.style.pointerEvents="none")),d.p8.set([a,u,i],{autoAlpha:1}),await(0,n.bA)(`./cultures/${data.culture}/audio/s-practice-dilemma-intro.mp3`);const e={boatsDisplay:{"de-urban":0,"pe-rural":0,"idj-urban":0},tenPencilsRect:{"de-urban":2.5,"pe-rural":2.5,"idj-urban":4.5},oneBikeRect:{"de-urban":.1,"pe-rural":.1,"idj-urban":.5},cantDecideRect:{"de-urban":2,"pe-rural":2,"idj-urban":3},textCenter:{"de-urban":0,"pe-rural":0,"idj-urban":0},tenPencils:{"de-urban":.1,"pe-rural":.8,"idj-urban":1.5},textLeft:{"de-urban":0,"pe-rural":0,"idj-urban":0},oneBike:{"de-urban":.1,"pe-rural":.1,"idj-urban":.1},textRight:{"de-urban":1,"pe-rural":1,"idj-urban":1.3}};(0,n.hY)(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`),await d.p8.timeline().to([p,b],{autoAlpha:1,delay:e.boatsDisplay[data.culture]}).to(o,{delay:e.tenPencilsRect[data.culture],stroke:"#006c66",strokeWidth:10,reversed:!0,repeat:1}).to(s,{delay:e.oneBikeRect[data.culture],stroke:"#006c66",strokeWidth:10,reversed:!0,repeat:1}).to([r],{delay:e.cantDecideRect[data.culture],stroke:"#006c66",strokeWidth:10,reversed:!0,repeat:1}).to([I],{delay:e.textCenter[data.culture],stroke:"#006c66",strokeWidth:10,reversed:!0,repeat:1}).to(g,{autoAlpha:1},"<").to([m],{autoAlpha:1,delay:e.tenPencils[data.culture]}).to([k],{autoAlpha:1,delay:e.textLeft[data.culture]}).to([E],{autoAlpha:1,delay:e.textRight[data.culture]}).to([B],{autoAlpha:1,delay:e.oneBike[data.culture]}).to(B,{delay:1,onComplete:()=>{(0,n.hY)(`./cultures/${data.culture}/audio/saving.mp3`)}}),(0,n.hY)(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`,"link-spd-headphones"),[a,u,i].forEach((e=>{e.classList.add("dilemma-card")}));let t=await(0,c.c)(["spd-tenPencils","spd-cantDecide","spd-oneBike"]);for([a,u,i].forEach((e=>{e.classList.remove("dilemma-card")}));"g"!==t.tagName;)t=t.parentElement;console.log(t.id),t.id.includes("tenPencils")&&(d.p8.to([u,i],{autoAlpha:.25}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc-tenPencils.mp3`),d.p8.to($,{autoAlpha:1}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc.mp3`),(0,n.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`),await d.p8.timeline().to(P,{autoAlpha:.5}).to(D,{delay:1,autoAlpha:.5}),d.p8.set([P,D],{pointerEvents:"visible"}),d.p8.to([P,D],{autoAlpha:1}),t=await(0,c.c)(["link-b-tenPencils-yes","link-b-tenPencils-no"]),t.id.includes("yes")&&(data.procedure.sPracticeDilemma.completed=!0)),t.id.includes("cantDecide")&&(d.p8.to([a,i],{autoAlpha:.25}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc-cantDecide.mp3`),d.p8.to(j,{autoAlpha:1}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc.mp3`),(0,n.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`),await d.p8.timeline().to(v,{autoAlpha:.5}).to(w,{delay:1,autoAlpha:.5}),d.p8.set([v,w],{pointerEvents:"visible"}),d.p8.to([v,w],{autoAlpha:1}),t=await(0,c.c)(["link-b-cantDecide-yes","link-b-cantDecide-no"]),t.id.includes("yes")&&(data.procedure.sPracticeDilemma.completed=!0)),t.id.includes("oneBike")&&(d.p8.to([a,u],{autoAlpha:.25}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc-oneBike.mp3`),d.p8.to(R,{autoAlpha:1}),await(0,n.bA)(`./cultures/${data.culture}/audio/spdc.mp3`),(0,n.hY)(`./cultures/${data.culture}/audio/yes-no.mp3`),await d.p8.timeline().to(f,{autoAlpha:.5}).to(x,{delay:1,autoAlpha:.5}),d.p8.set([f,x],{pointerEvents:"visible"}),d.p8.to([f,x],{autoAlpha:1}),t=await(0,c.c)(["link-b-oneBike-yes","link-b-oneBike-no"]),t.id.includes("yes")&&(data.procedure.sPracticeDilemma.completed=!0)),data.procedure[data.currentSlide].response=t.id}}},7103:(e,t,a)=>{a.d(t,{c:()=>d});const d=e=>new Promise((t=>{const a=e=>{const a=e.target;return t(a)};"string"==typeof e&&document.getElementById(e).addEventListener("click",a,{once:!0}),Array.isArray(e)&&e.forEach((e=>{document.getElementById(e).addEventListener("click",a,{once:!0})})),void 0===e&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);