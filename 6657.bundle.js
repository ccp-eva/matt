"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[6657],{6657:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var o=a(6358),d=a(5919),n=a(5212),i=a.n(n),r=a(9965),l=a(7103),s=a(8503),u=a(1489);const c=async({currentSlide:t,previousSlide:e})=>{data.reasoningSlideCounter++;const a="sr1h1cow",n="human",c="oneCow",p={neutral:`./cultures/${data.culture}/video/pinda-neutral-listening.${data.meta.videoExtension}`,text1:`./cultures/${data.culture}/video/s-ex-next-red-textInput.${data.meta.videoExtension}`,text2:`./cultures/${data.culture}/video/sr-promp-textInput.${data.meta.videoExtension}`,text3:`./cultures/${data.culture}/video/text-input-3.${data.meta.videoExtension}`,audio1:`./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.${data.meta.videoExtension}`,audio2:`./cultures/${data.culture}/video/sr-prompt-audioInput.${data.meta.videoExtension}`,audio3:`./cultures/${data.culture}/video/audio-input-3.${data.meta.videoExtension}`,react1:`./cultures/${data.culture}/video/sr-react-1.${data.meta.videoExtension}`,react2:`./cultures/${data.culture}/video/sr-react-2.${data.meta.videoExtension}`,react3:`./cultures/${data.culture}/video/sr-react-3.${data.meta.videoExtension}`},x={neutral:"",text1:"",text2:"",text3:"",audio1:"",audio2:"",audio3:"",react1:"",react2:"",react3:""};data.pindaNeutralBlob||(x.neutral=p.neutral),data.react1Blob||(x.react1=p.react1),data.react2Blob||(x.react2=p.react2),data.react3Blob||(x.react3=p.react3),data.textIntroBlob||"text"!==data.input||(x.text1=p.text1),data.textIntroBlob2||"text"!==data.input||(x.text2=p.text2),data.textIntroBlob3||"text"!==data.input||(x.text3=p.text3),data.audioIntroBlob||"audio"!==data.input||(x.audio1=p.audio1),data.audioIntroBlob2||"audio"!==data.input||(x.audio2=p.audio2),data.audioIntroBlob3||"audio"!==data.input||(x.audio3=p.audio3),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||(data.textIntroBlob||(x.text1=p.text1),data.textIntroBlob2||(x.text2=p.text2),data.textIntroBlob3||(x.text3=p.text3),data.audioIntroBlob||(x.audio1=p.audio1),data.audioIntroBlob2||(x.audio2=p.audio2),data.audioIntroBlob3||(x.audio3=p.audio3));const b=document.getElementById("s-blocking-state");b.removeAttribute("visibility");for(const[t,e]of Object.entries(x))if(e){const a=await fetch(e),o=await a.blob();x[t]=URL.createObjectURL(o)}data.pindaNeutralBlob=data.pindaNeutralBlob||x.neutral,data.textIntroBlob=data.textIntroBlob||x.text1,data.textIntroBlob2=data.textIntroBlob2||x.text2,data.textIntroBlob3=data.textIntroBlob3||x.text3,data.audioIntroBlob=data.audioIntroBlob||x.audio1,data.audioIntroBlob2=data.audioIntroBlob2||x.audio2,data.audioIntroBlob3=data.audioIntroBlob3||x.audio3,data.react1Blob=data.react1Blob||x.react1,data.react2Blob=data.react2Blob||x.react2,data.react3Blob=data.react3Blob||x.react3,x.neutral=x.neutral||data.pindaNeutralBlob,x.text1=x.text1||data.textIntroBlob,x.text2=x.text2||data.textIntroBlob2,x.text3=x.text3||data.textIntroBlob3,x.audio1=x.audio1||data.audioIntroBlob,x.audio2=x.audio2||data.audioIntroBlob2,x.audio3=x.audio3||data.audioIntroBlob3,x.react1=x.react1||data.react1Blob,x.react2=x.react2||data.react2Blob,x.react3=x.react3||data.react3Blob,b.setAttribute("visibility","hidden"),console.log(x);{const t=document.getElementById(`${a}-wr`),e=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");[...t.attributes].map((({name:t,value:a})=>e.setAttribute(t,a))),e.removeAttribute("fill"),t.replaceWith(e),e.innerHTML=`\n\t<div id="wrapper-${a}" style="display: none;">\n\t\t<div id="toggle-${a}" style="width: 9em; margin: 0 auto; margin-bottom: 10px">\n\t\t\t\t<input id="chck-${a}" type="checkbox" />\n\t\t\t<label for="chck-${a}" class="check-trail"><span class="check-handler"></span> </label>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<textarea\n\t\t\t   rows="3"\n\t\t\t\tdisabled\n\t\t\t\tid="text-response-${a}"\n\t\t\t\tmaxlength="2000"\n\t\t\t\tstyle="display: block; pointer-events: auto;"\n\t\t\t></textarea>\n\t\t\t<div id="voice-response-${a}" style="display: flex;">\n\t\t\t\t<button type="button" class="button reasoning" disabled id="voice-response-start-${a}"><span>🎤&nbsp;Start</span></button> <button type="button" class="button reasoning" disabled id="voice-response-stop-${a}"><span>🛑&nbsp;Stop</span></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>`}const v=document.getElementById(`link-${a}-headphones`),y=document.getElementById("audio"),m=document.getElementById("pinda"),h=document.getElementById("pinda-neutral"),E=document.getElementById(`link-${a}-next`),g=document.getElementById(`${a}-oneHuman`),B=document.getElementById(`${a}-cantDecide`),I=document.getElementById(`${a}-${c}`),$=document.getElementById(`wrapper-${a}`),w=document.getElementById(`text-response-${a}`),A=document.getElementById(`voice-response-${a}`),S=document.getElementById(`voice-response-start-${a}`),k=document.getElementById(`voice-response-stop-${a}`),f=document.getElementById(`toggle-${a}`),C=document.querySelector(".check-trail"),L=document.getElementById(`chck-${a}`);E.style.pointerEvents="none",C.style.pointerEvents="none",o.p8.set([E,C],{autoAlpha:.25}),data.procedure[data.currentSlide]={duration:0,input:data.input,textInput:"",isText:!1,isVoice:!1,voiceExplanation:!1,textExplanation:!1},"text"===data.input&&(f.style.visibility="hidden",A.style.display="none"),"audio"===data.input&&(L.click(),f.style.visibility="hidden",w.style.display="none",A.style.display="flex"),"userchoice-audio"===data.input&&(L.click(),w.style.display="none",A.style.display="flex"),"userchoice-text"===data.input&&(w.style.display="block",A.style.display="none");let H=!1,D=!1,T=!1;data.procedure.s1Hu1Co?(H=data.procedure.s1Hu1Co.response.toLowerCase().includes(`-one${n}`),D=data.procedure.s1Hu1Co.response.toLowerCase().includes("-cantdecide"),T=data.procedure.s1Hu1Co.response.toLowerCase().includes("-onecow")):(H=!1,D=!0,T=!1),H&&g.classList.add("dilemma-card-fix"),D&&B.classList.add("dilemma-card-fix"),T&&I.classList.add("dilemma-card-fix"),(0,u.TH)(t,e),await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-left.mp3`),H&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-${n}.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${n}.mp3`,v.id)),D&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`,v.id)),T&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-cow.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${c}.mp3`,v.id)),o.p8.set($,{autoAlpha:0}),$.style.display="block",o.p8.to($,{autoAlpha:1}),data.procedure[data.currentSlide].voiceExplanation=L.checked,data.procedure[data.currentSlide].textExplanation=!L.checked;let R=!0;for(m.addEventListener("play",(()=>{R=!0,w.disabled=!0,o.p8.to(C,{autoAlpha:.5}),C.style.pointerEvents="none",v.style.pointerEvents="none"})),m.addEventListener("ended",(()=>{R=!1,w.disabled=!1,o.p8.to(C,{autoAlpha:1}),C.style.pointerEvents="visible",v.style.pointerEvents="visible"})),L.checked&&(1===data.reasoningSlideCounter&&(m.src=x.audio1,await o.p8.timeline().to(S,{filter:"drop-shadow(0px 0px 15px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(k,{filter:"drop-shadow(0px 0px 15px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0})),2===data.reasoningSlideCounter&&(m.src=x.audio2),3===data.reasoningSlideCounter&&(m.src=x.audio3)),L.checked||(1===data.reasoningSlideCounter&&(m.src=x.text1),2===data.reasoningSlideCounter&&(m.src=x.text2),3===data.reasoningSlideCounter&&(m.src=x.text3));R;)await(0,s._v)(100);h.src=x.neutral,o.p8.timeline().to(m,{autoAlpha:0}).to(h,{autoAlpha:1},"<"),o.p8.to(C,{autoAlpha:1}),C.style.pointerEvents="visible",w.disabled=!1,S.disabled=!1,y.addEventListener("play",(()=>{C.style.pointerEvents="none",o.p8.set(C,{autoAlpha:.25})})),y.addEventListener("ended",(()=>{C.style.pointerEvents="visible",o.p8.set(C,{autoAlpha:1})})),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||L.addEventListener("change",(async()=>{const t=L.checked,e=!L.checked;if(t&&(w.style.display="none",A.style.display="flex"),e&&(w.style.display="block",A.style.display="none"),t&&!data.procedure[data.currentSlide].voiceExplanation){for(data.procedure[data.currentSlide].voiceExplanation=!0,S.disabled=!0,C.style.pointerEvents="none",v.style.pointerEvents="none",o.p8.set([E,C],{autoAlpha:.25}),o.p8.to(h,{autoAlpha:0}),1===data.reasoningSlideCounter&&(m.src=x.audio1,await o.p8.timeline().to(S,{filter:"drop-shadow(0px 0px 15px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(k,{filter:"drop-shadow(0px 0px 15px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0})),2===data.reasoningSlideCounter&&(m.src=x.audio2),3===data.reasoningSlideCounter&&(m.src=x.audio3);R;)await(0,s._v)(100);S.disabled=!1,o.p8.to(C,{autoAlpha:1}),C.style.pointerEvents="visible",v.style.pointerEvents="visible",o.p8.timeline().to(m,{autoAlpha:0}).to(h,{autoAlpha:1},"<")}if(e&&!data.procedure[data.currentSlide].textExplanation){for(data.procedure[data.currentSlide].textExplanation=!0,w.disabled=!0,C.style.pointerEvents="none",v.style.pointerEvents="none",o.p8.set(C,{autoAlpha:.25}),o.p8.to(h,{autoAlpha:0}),1===data.reasoningSlideCounter&&(m.src=x.text1),2===data.reasoningSlideCounter&&(m.src=x.text2),3===data.reasoningSlideCounter&&(m.src=x.text3),await(0,s._v)(500);R;)await(0,s._v)(100);w.disabled=!1,o.p8.to(C,{autoAlpha:1}),C.style.pointerEvents="visible",v.style.pointerEvents="visible",o.p8.timeline().to(m,{autoAlpha:0}).to(h,{autoAlpha:1},"<")}})),w.addEventListener("input",(()=>{w.value.length>=d.Z.globals.minimumTextInputLength?(data.procedure[data.currentSlide].isText=!0,data.procedure[data.currentSlide].isVoice=!1,o.p8.set(E,{autoAlpha:1}),o.p8.set(C,{autoAlpha:.25}),E.style.pointerEvents="visible",C.style.pointerEvents="none"):(o.p8.set(C,{autoAlpha:1}),o.p8.set(E,{autoAlpha:.25}),E.style.pointerEvents="none",C.style.pointerEvents="visible")})),S.addEventListener("click",(async()=>{data.procedure[data.currentSlide].isText=!1,data.procedure[data.currentSlide].isVoice=!0;let t=await navigator.mediaDevices.getUserMedia({audio:!0}),e=new(i().RecordRTCPromisesHandler)(t,{type:"audio"});e.startRecording(),S.disabled=!0,k.disabled=!1,C.style.pointerEvents="none",o.p8.set(C,{autoAlpha:.25}),k.addEventListener("click",(async()=>{await e.stopRecording();let t=await e.getBlob();(0,s.vw)(t,(0,s.Dz)("matt",`${data.currentSlide}`,"ogg")),i().invokeSaveAsDialog(t,(0,s.Dz)("matt",`${data.currentSlide}`,"ogg")),E.style.pointerEvents="visible",o.p8.timeline().to(E,{autoAlpha:1}),S.disabled=!1,k.disabled=!0,C.style.pointerEvents="visible",o.p8.set(C,{autoAlpha:1})}))}));const N=await(0,l.c)(E.id);for(console.log(N.id),data.procedure[data.currentSlide].textInput=w.value,console.log(data.procedure[data.currentSlide].textInput),data.procedure[data.currentSlide].response=N.id,R=!0,await o.p8.timeline().to("#s-reasoning-1-hu-1-co",{autoAlpha:0}).to(h,{autoAlpha:0}),1===data.reasoningSlideCounter&&(m.src=x.react1),2===data.reasoningSlideCounter&&(m.src=x.react2),3===data.reasoningSlideCounter&&(m.src=x.react3);R;)await(0,s._v)(100)}},7103:(t,e,a)=>{a.d(e,{c:()=>o});const o=t=>new Promise((e=>{const a=t=>{const a=t.target;return e(a)};"string"==typeof t&&document.getElementById(t).addEventListener("click",a,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",a,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);