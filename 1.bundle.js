"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[1],{1:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var o=a(6358),d=a(5919),n=a(5212),i=a.n(n),r=a(9965),l=a(7103),s=a(8503),u=a(1489);const c=async({currentSlide:t,previousSlide:e})=>{data.reasoningSlideCounter++;const a="sr1nm1dog",n="humannam",c="oneHuman",p="dog",b="oneDog",x={neutral:`./cultures/${data.culture}/video/pinda-neutral-listening.${data.meta.videoExtension}`,text1:`./cultures/${data.culture}/video/s-ex-next-red-textInput.${data.meta.videoExtension}`,text2:`./cultures/${data.culture}/video/sr-promp-textInput.${data.meta.videoExtension}`,text3:`./cultures/${data.culture}/video/text-input-3.${data.meta.videoExtension}`,audio1:`./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.${data.meta.videoExtension}`,audio2:`./cultures/${data.culture}/video/sr-prompt-audioInput.${data.meta.videoExtension}`,audio3:`./cultures/${data.culture}/video/audio-input-3.${data.meta.videoExtension}`,react1:`./cultures/${data.culture}/video/sr-react-1.${data.meta.videoExtension}`,react2:`./cultures/${data.culture}/video/sr-react-2.${data.meta.videoExtension}`,react3:`./cultures/${data.culture}/video/sr-react-3.${data.meta.videoExtension}`},v={neutral:"",text1:"",text2:"",text3:"",audio1:"",audio2:"",audio3:"",react1:"",react2:"",react3:""};data.pindaNeutralBlob||(v.neutral=x.neutral),data.react1Blob||(v.react1=x.react1),data.react2Blob||(v.react2=x.react2),data.react3Blob||(v.react3=x.react3),data.textIntroBlob||"text"!==data.input||(v.text1=x.text1),data.textIntroBlob2||"text"!==data.input||(v.text2=x.text2),data.textIntroBlob3||"text"!==data.input||(v.text3=x.text3),data.audioIntroBlob||"audio"!==data.input||(v.audio1=x.audio1),data.audioIntroBlob2||"audio"!==data.input||(v.audio2=x.audio2),data.audioIntroBlob3||"audio"!==data.input||(v.audio3=x.audio3),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||(data.textIntroBlob||(v.text1=x.text1),data.textIntroBlob2||(v.text2=x.text2),data.textIntroBlob3||(v.text3=x.text3),data.audioIntroBlob||(v.audio1=x.audio1),data.audioIntroBlob2||(v.audio2=x.audio2),data.audioIntroBlob3||(v.audio3=x.audio3));const m=document.getElementById("s-blocking-state");m.removeAttribute("visibility");for(const[t,e]of Object.entries(v))if(e){const a=await fetch(e),o=await a.blob();v[t]=URL.createObjectURL(o)}data.pindaNeutralBlob=data.pindaNeutralBlob||v.neutral,data.textIntroBlob=data.textIntroBlob||v.text1,data.textIntroBlob2=data.textIntroBlob2||v.text2,data.textIntroBlob3=data.textIntroBlob3||v.text3,data.audioIntroBlob=data.audioIntroBlob||v.audio1,data.audioIntroBlob2=data.audioIntroBlob2||v.audio2,data.audioIntroBlob3=data.audioIntroBlob3||v.audio3,data.react1Blob=data.react1Blob||v.react1,data.react2Blob=data.react2Blob||v.react2,data.react3Blob=data.react3Blob||v.react3,v.neutral=v.neutral||data.pindaNeutralBlob,v.text1=v.text1||data.textIntroBlob,v.text2=v.text2||data.textIntroBlob2,v.text3=v.text3||data.textIntroBlob3,v.audio1=v.audio1||data.audioIntroBlob,v.audio2=v.audio2||data.audioIntroBlob2,v.audio3=v.audio3||data.audioIntroBlob3,v.react1=v.react1||data.react1Blob,v.react2=v.react2||data.react2Blob,v.react3=v.react3||data.react3Blob,m.setAttribute("visibility","hidden"),console.log(v);{const t=document.getElementById(`${a}-wr`),e=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");[...t.attributes].map((({name:t,value:a})=>e.setAttribute(t,a))),e.removeAttribute("fill"),t.replaceWith(e),e.innerHTML=`\n\t<div id="wrapper-${a}" style="display: none;">\n\t\t<div id="toggle-${a}" style="width: 9em; margin: 0 auto; margin-bottom: 10px">\n\t\t\t\t<input id="chck-${a}" type="checkbox" />\n\t\t\t<label for="chck-${a}" class="check-trail"><span class="check-handler"></span> </label>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<textarea\n\t\t\t   rows="3"\n\t\t\t\tdisabled\n\t\t\t\tid="text-response-${a}"\n\t\t\t\tmaxlength="2000"\n\t\t\t\tstyle="display: block; pointer-events: auto;"\n\t\t\t></textarea>\n\t\t\t<div id="voice-response-${a}" style="display: flex;">\n\t\t\t\t<button type="button" class="button reasoning" disabled id="voice-response-start-${a}"><span>🎤&nbsp;Start</span></button> <button type="button" class="button reasoning" disabled id="voice-response-stop-${a}"><span>🛑&nbsp;Stop</span></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>`}const y=document.getElementById(`link-${a}-headphones`),g=document.getElementById("audio"),h=document.getElementById("pinda"),E=document.getElementById("pinda-neutral"),B=document.getElementById(`link-${a}-next`),$=document.getElementById(`${a}-${c}`),I=document.getElementById(`${a}-cantDecide`),w=document.getElementById(`${a}-${b}`),A=document.getElementById(`wrapper-${a}`),S=document.getElementById(`text-response-${a}`),f=document.getElementById(`voice-response-${a}`),k=document.getElementById(`voice-response-start-${a}`),L=document.getElementById(`voice-response-stop-${a}`),C=document.getElementById(`toggle-${a}`),D=document.querySelector(".check-trail"),N=document.getElementById(`chck-${a}`);B.style.pointerEvents="none",D.style.pointerEvents="none",o.p8.set([B,D],{autoAlpha:.25}),data.procedure[data.currentSlide]={duration:0,input:data.input,textInput:"",isText:!1,isVoice:!1,voiceExplanation:!1,textExplanation:!1},"text"===data.input&&(C.style.visibility="hidden",f.style.display="none"),"audio"===data.input&&(N.click(),C.style.visibility="hidden",S.style.display="none",f.style.display="flex"),"userchoice-audio"===data.input&&(N.click(),S.style.display="none",f.style.display="flex"),"userchoice-text"===data.input&&(S.style.display="block",f.style.display="none");let R=!1,T=!1,_=!1;if(data.procedure.s1Nm1Do){if(R=data.procedure.s1Nm1Do.response.toLowerCase().includes(`-one${n}`),T=data.procedure.s1Nm1Do.response.toLowerCase().includes("-cantdecide"),_=data.procedure.s1Nm1Do.response.toLowerCase().includes(`-one${p}`),data.procedure.s1Nm1Do.swapLeftRight){const t=document.getElementById(`${a}-${c}`),e=document.getElementById(`${a}-${b}`);(0,s.PA)(t,1450),(0,s.PA)(e,470)}}else R=!1,T=!0,_=!1;R&&$.classList.add("dilemma-card-fix"),T&&I.classList.add("dilemma-card-fix"),_&&w.classList.add("dilemma-card-fix"),(0,u.TH)(t,e),data.procedure.s1Nm1Do.swapLeftRight?await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-right.mp3`):await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-left.mp3`),R&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-${n}.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${n}.mp3`,y.id)),T&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`,y.id)),_&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-${p}.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${p}.mp3`,y.id)),o.p8.set(A,{autoAlpha:0}),A.style.display="block",o.p8.to(A,{autoAlpha:1}),data.procedure[data.currentSlide].voiceExplanation=N.checked,data.procedure[data.currentSlide].textExplanation=!N.checked;let H=!0;for(h.addEventListener("play",(()=>{H=!0,S.disabled=!0,o.p8.to(D,{autoAlpha:.5}),D.style.pointerEvents="none",y.style.pointerEvents="none"})),h.addEventListener("ended",(()=>{H=!1,S.disabled=!1,o.p8.to(D,{autoAlpha:1}),D.style.pointerEvents="visible",y.style.pointerEvents="visible"})),N.checked&&(1===data.reasoningSlideCounter&&(h.src=v.audio1,await o.p8.timeline().to(k,{filter:"drop-shadow(0px 0px 15px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(L,{filter:"drop-shadow(0px 0px 15px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0})),2===data.reasoningSlideCounter&&(h.src=v.audio2),3===data.reasoningSlideCounter&&(h.src=v.audio3)),N.checked||(1===data.reasoningSlideCounter&&(h.src=v.text1),2===data.reasoningSlideCounter&&(h.src=v.text2),3===data.reasoningSlideCounter&&(h.src=v.text3));H;)await(0,s._v)(100);E.src=v.neutral,o.p8.timeline().to(h,{autoAlpha:0}).to(E,{autoAlpha:1},"<"),o.p8.to(D,{autoAlpha:1}),D.style.pointerEvents="visible",S.disabled=!1,k.disabled=!1,g.addEventListener("play",(()=>{D.style.pointerEvents="none",o.p8.set(D,{autoAlpha:.25})})),g.addEventListener("ended",(()=>{D.style.pointerEvents="visible",o.p8.set(D,{autoAlpha:1})})),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||N.addEventListener("change",(async()=>{const t=N.checked,e=!N.checked;if(t&&(S.style.display="none",f.style.display="flex"),e&&(S.style.display="block",f.style.display="none"),t&&!data.procedure[data.currentSlide].voiceExplanation){for(data.procedure[data.currentSlide].voiceExplanation=!0,k.disabled=!0,D.style.pointerEvents="none",y.style.pointerEvents="none",o.p8.set([B,D],{autoAlpha:.25}),o.p8.to(E,{autoAlpha:0}),1===data.reasoningSlideCounter&&(h.src=v.audio1,await o.p8.timeline().to(k,{filter:"drop-shadow(0px 0px 15px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(L,{filter:"drop-shadow(0px 0px 15px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0})),2===data.reasoningSlideCounter&&(h.src=v.audio2),3===data.reasoningSlideCounter&&(h.src=v.audio3);H;)await(0,s._v)(100);k.disabled=!1,o.p8.to(D,{autoAlpha:1}),D.style.pointerEvents="visible",y.style.pointerEvents="visible",o.p8.timeline().to(h,{autoAlpha:0}).to(E,{autoAlpha:1},"<")}if(e&&!data.procedure[data.currentSlide].textExplanation){for(data.procedure[data.currentSlide].textExplanation=!0,S.disabled=!0,D.style.pointerEvents="none",y.style.pointerEvents="none",o.p8.set(D,{autoAlpha:.25}),o.p8.to(E,{autoAlpha:0}),1===data.reasoningSlideCounter&&(h.src=v.text1),2===data.reasoningSlideCounter&&(h.src=v.text2),3===data.reasoningSlideCounter&&(h.src=v.text3),await(0,s._v)(500);H;)await(0,s._v)(100);S.disabled=!1,o.p8.to(D,{autoAlpha:1}),D.style.pointerEvents="visible",y.style.pointerEvents="visible",o.p8.timeline().to(h,{autoAlpha:0}).to(E,{autoAlpha:1},"<")}})),S.addEventListener("input",(()=>{S.value.length>=d.Z.globals.minimumTextInputLength?(data.procedure[data.currentSlide].isText=!0,data.procedure[data.currentSlide].isVoice=!1,o.p8.set(B,{autoAlpha:1}),o.p8.set(D,{autoAlpha:.25}),B.style.pointerEvents="visible",D.style.pointerEvents="none"):(o.p8.set(D,{autoAlpha:1}),o.p8.set(B,{autoAlpha:.25}),B.style.pointerEvents="none",D.style.pointerEvents="visible")})),k.addEventListener("click",(async()=>{data.procedure[data.currentSlide].isText=!1,data.procedure[data.currentSlide].isVoice=!0;let t=await navigator.mediaDevices.getUserMedia({audio:!0}),e=new(i().RecordRTCPromisesHandler)(t,{type:"audio"});e.startRecording(),k.disabled=!0,L.disabled=!1,D.style.pointerEvents="none",o.p8.set(D,{autoAlpha:.25}),L.addEventListener("click",(async()=>{await e.stopRecording();let t=await e.getBlob();(0,s.vw)(t,(0,s.Dz)("matt",`${data.currentSlide}`,"ogg")),i().invokeSaveAsDialog(t,(0,s.Dz)("matt",`${data.currentSlide}`,"ogg")),B.style.pointerEvents="visible",o.p8.timeline().to(B,{autoAlpha:1}),k.disabled=!1,L.disabled=!0,D.style.pointerEvents="visible",o.p8.set(D,{autoAlpha:1})}))}));const P=await(0,l.c)(B.id);for(console.log(P.id),data.procedure[data.currentSlide].textInput=S.value,console.log(data.procedure[data.currentSlide].textInput),data.procedure[data.currentSlide].response=P.id,H=!0,await o.p8.timeline().to("#s-reasoning-1-nm-1-do",{autoAlpha:0}).to(E,{autoAlpha:0}),1===data.reasoningSlideCounter&&(h.src=v.react1),2===data.reasoningSlideCounter&&(h.src=v.react2),3===data.reasoningSlideCounter&&(h.src=v.react3);H;)await(0,s._v)(100)}},7103:(t,e,a)=>{a.d(e,{c:()=>o});const o=t=>new Promise((e=>{const a=t=>{const a=t.target;return e(a)};"string"==typeof t&&document.getElementById(t).addEventListener("click",a,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",a,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);