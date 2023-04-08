"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6789],{6789:(t,a,e)=>{e.r(a),e.d(a,{default:()=>c});var o=e(6358),r=e(2354),d=e(6486),l=e.n(d),u=e(9965),p=e(8503),i=e(1489);o.p8.registerPlugin(r._);const c=async({currentSlide:t,previousSlide:a})=>{(0,i.TH)(t,a,[0,0]);const e=document.getElementById("link-sbp-ball"),d=document.getElementById("sbp-inner"),c=document.getElementById("sbp-middle"),s=document.getElementById("sbp-outer"),n=document.getElementById("audio"),h=document.getElementById("link-s-bp-headphones");o.p8.set([d,c,s,e],{opacity:.5}),o.p8.set(h,{autoAlpha:0});let m=!1;n.addEventListener("play",(()=>{m=!0})),n.addEventListener("ended",(()=>{m=!1}));const B=l().shuffle(["inner","middle","outer"]);data.procedure.sBallPractice={duration:0,addExplanationCount:0,completed:!1,order:B,inner:"",middle:"",outer:""},await(0,u.bA)(`./cultures/${data.culture}/audio/s-ball-practice.mp3`),await(0,u.bA)(`./cultures/${data.culture}/audio/sbp-expl.mp3`);let g=!1,y=!1;for(let t=0;t<B.length;t++){o.p8.to([d,c,s],{opacity:.5}),o.p8.to(e,{x:0,y:0,duration:.25,scale:1,opacity:.5}),o.p8.to(h,{autoAlpha:0});const a=B[t];for(;m;)await(0,p._v)(100);console.log(a),g&&(g=!1,y=!0,o.p8.timeline().to(h,{autoAlpha:0}),await(0,u.bA)(`./cultures/${data.culture}/audio/sbp-fail.mp3`),(0,u.hY)(`./cultures/${data.culture}/audio/sbp-repeat-rules.mp3`),await o.p8.timeline().to(d,{delay:3,autoAlpha:1,repeat:2}).to(d,{autoAlpha:.5}).to(c,{delay:2.5,autoAlpha:1,repeat:2}).to(c,{autoAlpha:.5}).to(s,{delay:1.75,autoAlpha:1,repeat:2,reversed:!0}).to(s,{autoAlpha:.5})),(0,u.hY)(`./cultures/${data.culture}/audio/sbp-${a}.mp3`,h.id),await(0,u.bA)(`./cultures/${data.culture}/audio/sbp-${a}.mp3`),o.p8.to(e,{opacity:1}),o.p8.to(h,{autoAlpha:1});const i=d.getBBox().width/2,n=c.getBBox().width/2,b=s.getBBox().width/2,x=d.getBBox().x+i,w=d.getBBox().y+i,$=r._.create(e,{onDrag:function(){const t=this.target,a=t.getBBox(),e=t.getBBox().height/2,r=t.getBBox().width/2;let l=a.x+r+this.x,u=a.y+e+this.y;const p=Math.sqrt(Math.pow(l-x,2)+Math.pow(u-w,2));1.22*p<=i+r&&(o.p8.to(d,{opacity:1}),o.p8.to([c,s],{opacity:.5})),1.22*p<=n+r&&1.22*p>i+r&&(o.p8.to(c,{opacity:1}),o.p8.to([d,s],{opacity:.5})),1.22*p<=b+r&&1.22*p>n+r&&(o.p8.to(s,{opacity:1}),o.p8.to([d,c],{opacity:.5}),o.p8.to(this.target,{scale:.5,transformOrigin:"50% 50%"})),1.22*p>b+r&&(o.p8.to(this.target,{scale:1,transformOrigin:"50% 50%"}),o.p8.to([d,c,s],{opacity:.5}))},onDragEnd:function(){const e=this.target,r=e.id;console.log(r);const p=e.getBBox(),h=e.getBBox().height/2,m=e.getBBox().width/2;let B=p.x+m+this.x,P=p.y+h+this.y;const f=Math.sqrt(Math.pow(B-x,2)+Math.pow(P-w,2));1.22*f<=i+m&&($[0].disable(),o.p8.to(d,{opacity:.5,duration:.25}),data.procedure.sBallPractice[a]="inner",2===t&&"inner"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp3.mp3`)),t<2&&"inner"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp${l().random(1,2)}.mp3`)),"inner"!==a&&(data.procedure.sBallPractice.addExplanationCount++,g=!0,y=!1,data.procedure.sBallPractice[a],t-=1)),1.22*f<=n+m&&1.22*f>i+m&&($[0].disable(),o.p8.to(c,{opacity:.5,duration:.25}),data.procedure.sBallPractice[a]="middle",2===t&&"middle"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp3.mp3`)),t<2&&"middle"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp${l().random(1,2)}.mp3`)),"middle"!==a&&(data.procedure.sBallPractice.addExplanationCount++,g=!0,y=!1,data.procedure.sBallPractice[a],t-=1)),1.22*f<=b+m&&1.22*f>n+m&&($[0].disable(),o.p8.to(s,{opacity:.5,duration:.25}),data.procedure.sBallPractice[a]="outer",2===t&&"outer"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp3.mp3`)),t<2&&"outer"===a&&(y=!1,(0,u.hY)(`./cultures/${data.culture}/audio/sbp-resp${l().random(1,2)}.mp3`)),"outer"!==a&&(data.procedure.sBallPractice.addExplanationCount++,g=!0,y=!1,data.procedure.sBallPractice[a],t-=1)),1.22*f>b+m&&o.p8.to(e,{x:0,y:0})}});for(;""===data.procedure.sBallPractice[a]||y;)await(0,p._v)(500)}for(data.procedure.sBallPractice.inner&&data.procedure.sBallPractice.middle&&data.procedure.sBallPractice.outer&&(data.procedure.sBallPractice.completed=!0);m;)await(0,p._v)(100)}}}]);