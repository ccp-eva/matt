"use strict";(self.webpackChunkmatt=self.webpackChunkmatt||[]).push([[9051],{9051:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var o=a(6358),d=a(5919),n=a(5212),i=a.n(n),r=a(9965),l=a(7103),u=a(8503),s=a(1489);const c=async({currentSlide:t,previousSlide:e})=>{data.reasoningSlideCounter++;const a="sr1h1cat",n="human",c="oneHuman",p={neutral:`./cultures/${data.culture}/video/pinda-neutral-listening.webm`,text1:`./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`,text2:`./cultures/${data.culture}/video/sr-promp-textInput.webm`,text3:`./cultures/${data.culture}/video/text-input-3.webm`,audio1:`./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.webm`,audio2:`./cultures/${data.culture}/video/sr-prompt-audioInput.webm`,audio3:`./cultures/${data.culture}/video/audio-input-3.webm`,react1:`./cultures/${data.culture}/video/sr-react-1.webm`,react2:`./cultures/${data.culture}/video/sr-react-2.webm`,react3:`./cultures/${data.culture}/video/sr-react-3.webm`},b={neutral:"",text1:"",text2:"",text3:"",audio1:"",audio2:"",audio3:"",react1:"",react2:"",react3:""};data.pindaNeutralBlob||(b.neutral=p.neutral),data.react1Blob||(b.react1=p.react1),data.react2Blob||(b.react2=p.react2),data.react3Blob||(b.react3=p.react3),data.textIntroBlob||"text"!==data.input||(b.text1=p.text1),data.textIntroBlob2||"text"!==data.input||(b.text2=p.text2),data.textIntroBlob3||"text"!==data.input||(b.text3=p.text3),data.audioIntroBlob||"audio"!==data.input||(b.audio1=p.audio1),data.audioIntroBlob2||"audio"!==data.input||(b.audio2=p.audio2),data.audioIntroBlob3||"audio"!==data.input||(b.audio3=p.audio3),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||(data.textIntroBlob||(b.text1=p.text1),data.textIntroBlob2||(b.text2=p.text2),data.textIntroBlob3||(b.text3=p.text3),data.audioIntroBlob||(b.audio1=p.audio1),data.audioIntroBlob2||(b.audio2=p.audio2),data.audioIntroBlob3||(b.audio3=p.audio3));const y=document.getElementById("s-blocking-state");y.removeAttribute("visibility");for(const[t,e]of Object.entries(b))if(e){const a=await fetch(e),o=await a.blob();b[t]=URL.createObjectURL(o)}data.pindaNeutralBlob=data.pindaNeutralBlob||b.neutral,data.textIntroBlob=data.textIntroBlob||b.text1,data.textIntroBlob2=data.textIntroBlob2||b.text2,data.textIntroBlob3=data.textIntroBlob3||b.text3,data.audioIntroBlob=data.audioIntroBlob||b.audio1,data.audioIntroBlob2=data.audioIntroBlob2||b.audio2,data.audioIntroBlob3=data.audioIntroBlob3||b.audio3,data.react1Blob=data.react1Blob||b.react1,data.react2Blob=data.react2Blob||b.react2,data.react3Blob=data.react3Blob||b.react3,b.neutral=b.neutral||data.pindaNeutralBlob,b.text1=b.text1||data.textIntroBlob,b.text2=b.text2||data.textIntroBlob2,b.text3=b.text3||data.textIntroBlob3,b.audio1=b.audio1||data.audioIntroBlob,b.audio2=b.audio2||data.audioIntroBlob2,b.audio3=b.audio3||data.audioIntroBlob3,b.react1=b.react1||data.react1Blob,b.react2=b.react2||data.react2Blob,b.react3=b.react3||data.react3Blob,y.setAttribute("visibility","hidden"),console.log(b);{const t=document.getElementById(`${a}-wr`),e=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");[...t.attributes].map((({name:t,value:a})=>e.setAttribute(t,a))),e.removeAttribute("fill"),t.replaceWith(e),e.innerHTML=`\n\t<div id="wrapper-${a}" style="display: none;">\n\t\t<div id="toggle-${a}" style="width: 9em; margin: 0 auto; margin-bottom: 10px">\n\t\t\t\t<input id="chck-${a}" type="checkbox" />\n\t\t\t<label for="chck-${a}" class="check-trail"><span class="check-handler"></span> </label>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<textarea\n\t\t\t   rows="3"\n\t\t\t\tdisabled\n\t\t\t\tid="text-response-${a}"\n\t\t\t\tmaxlength="2000"\n\t\t\t\tstyle="display: block; pointer-events: auto;"\n\t\t\t></textarea>\n\t\t\t<div id="voice-response-${a}" style="display: flex;">\n\t\t\t\t<button type="button" class="button reasoning" disabled id="voice-response-start-${a}"><span>🎤&nbsp;Start</span></button> <button type="button" class="button reasoning" disabled id="voice-response-stop-${a}"><span>🛑&nbsp;Stop</span></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>`}const x=document.getElementById(`link-${a}-headphones`),m=document.getElementById("audio"),v=document.getElementById("player"),h=document.getElementById("pinda-neutral"),B=document.getElementById(`link-${a}-next`),g=document.getElementById(`${a}-${c}`),E=document.getElementById(`${a}-cantDecide`),I=document.getElementById(`${a}-${c}`),w=document.getElementById(`wrapper-${a}`),$=document.getElementById(`text-response-${a}`),A=document.getElementById(`voice-response-${a}`),k=document.getElementById(`voice-response-start-${a}`),S=document.getElementById(`voice-response-stop-${a}`),f=document.getElementById(`toggle-${a}`),L=document.querySelector(".check-trail"),C=document.getElementById(`chck-${a}`);B.style.pointerEvents="none",L.style.pointerEvents="none",o.p8.set([B,L],{autoAlpha:.25}),data.procedure[data.currentSlide]={duration:0,input:data.input,textInput:"",isText:!1,isVoice:!1,voiceExplanation:!1,textExplanation:!1},"text"===data.input&&(f.style.visibility="hidden",A.style.display="none"),"audio"===data.input&&(C.click(),f.style.visibility="hidden",$.style.display="none",A.style.display="flex"),"userchoice-audio"===data.input&&(C.click(),$.style.display="none",A.style.display="flex"),"userchoice-text"===data.input&&($.style.display="block",A.style.display="none");let H=!0,D=!1,T=!1;data.procedure.s1Hu1Co&&(H=data.procedure.s1Hu1Co.response.toLowerCase().includes(`-one${n}`),D=data.procedure.s1Hu1Co.response.toLowerCase().includes("-onecat"),T=data.procedure.s1Hu1Co.response.toLowerCase().includes("-cantdecide")),H&&g.classList.add("dilemma-card-fix"),T&&E.classList.add("dilemma-card-fix"),D&&I.classList.add("dilemma-card-fix"),(0,s.TH)(t,e),await(0,r.bA)(`./cultures/${data.culture}/audio/${a}-left.mp3`),H&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-${n}.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${n}.mp3`,x.id)),T&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`,x.id)),D&&(await(0,r.bA)(`./cultures/${data.culture}/audio/srw-${n}.mp3`),(0,r.hY)(`./cultures/${data.culture}/audio/srw-${c}.mp3`,x.id)),o.p8.set(w,{autoAlpha:0}),w.style.display="block",o.p8.to(w,{autoAlpha:1}),data.procedure[data.currentSlide].voiceExplanation=C.checked,data.procedure[data.currentSlide].textExplanation=!C.checked;let R=!0;for(v.addEventListener("play",(()=>{R=!0,$.disabled=!0,o.p8.to(L,{autoAlpha:.5}),L.style.pointerEvents="none",x.style.pointerEvents="none"})),v.addEventListener("ended",(()=>{R=!1,$.disabled=!1,o.p8.to(L,{autoAlpha:1}),L.style.pointerEvents="visible",x.style.pointerEvents="visible"})),C.checked&&(1===data.reasoningSlideCounter&&(v.src=b.audio1,await o.p8.timeline().to(k,{filter:"drop-shadow(0px 0px 15px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(S,{filter:"drop-shadow(0px 0px 15px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0})),2===data.reasoningSlideCounter&&(v.src=b.audio2),3===data.reasoningSlideCounter&&(v.src=b.audio3)),C.checked||(1===data.reasoningSlideCounter&&(v.src=b.text1),2===data.reasoningSlideCounter&&(v.src=b.text2),3===data.reasoningSlideCounter&&(v.src=b.text3));R;)await(0,u._v)(100);h.src=b.neutral,o.p8.timeline().to(v,{autoAlpha:0}).to(h,{autoAlpha:1},"<"),o.p8.to(L,{autoAlpha:1}),L.style.pointerEvents="auto",$.disabled=!1,k.disabled=!1,m.addEventListener("play",(()=>{L.style.pointerEvents="none",o.p8.set(L,{autoAlpha:.25})})),m.addEventListener("ended",(()=>{L.style.pointerEvents="visible",o.p8.set(L,{autoAlpha:1})})),"userchoice-audio"!==data.input&&"userchoice-text"!==data.input||C.addEventListener("change",(async()=>{const t=C.checked,e=!C.checked;if(t&&($.style.display="none",A.style.display="flex"),e&&($.style.display="block",A.style.display="none"),t&&!data.procedure[data.currentSlide].voiceExplanation){for(data.procedure[data.currentSlide].voiceExplanation=!0,k.disabled=!0,L.style.pointerEvents="none",x.style.pointerEvents="none",o.p8.set([B,L],{autoAlpha:.25}),o.p8.to(h,{autoAlpha:0}),v.src=b.audio1,await o.p8.timeline().to(k,{filter:"drop-shadow(0px 0px 20px #000)",delay:8,repeat:3,yoyo:!0,reversed:!0}).to(S,{filter:"drop-shadow(0px 0px 20px #000)",delay:1.5,repeat:3,yoyo:!0,reversed:!0});R;)await(0,u._v)(100);k.disabled=!1,o.p8.to(L,{autoAlpha:1}),L.style.pointerEvents="auto",x.style.pointerEvents="auto",o.p8.timeline().to(v,{autoAlpha:0}).to(h,{autoAlpha:1},"<")}if(e&&!data.procedure[data.currentSlide].textExplanation){for(data.procedure[data.currentSlide].textExplanation=!0,$.disabled=!0,L.style.pointerEvents="none",x.style.pointerEvents="none",o.p8.set(L,{autoAlpha:.25}),o.p8.to(h,{autoAlpha:0}),v.src=b.text1,await(0,u._v)(500);R;)await(0,u._v)(100);$.disabled=!1,o.p8.to(L,{autoAlpha:1}),L.style.pointerEvents="auto",x.style.pointerEvents="auto",o.p8.timeline().to(v,{autoAlpha:0}).to(h,{autoAlpha:1},"<")}})),$.addEventListener("input",(()=>{$.value.length>=d.Z.globals.minimumTextInputLength?(data.procedure[data.currentSlide].isText=!0,data.procedure[data.currentSlide].isVoice=!1,o.p8.set(B,{autoAlpha:1}),o.p8.set(L,{autoAlpha:.25}),B.style.pointerEvents="visible",L.style.pointerEvents="none"):(o.p8.set(L,{autoAlpha:1}),o.p8.set(B,{autoAlpha:.25}),B.style.pointerEvents="none",L.style.pointerEvents="visible")})),k.addEventListener("click",(async()=>{data.procedure[data.currentSlide].isText=!1,data.procedure[data.currentSlide].isVoice=!0;let t=await navigator.mediaDevices.getUserMedia({audio:!0}),e=new(i().RecordRTCPromisesHandler)(t,{type:"audio"});e.startRecording(),k.disabled=!0,S.disabled=!1,L.style.pointerEvents="none",o.p8.set(L,{autoAlpha:.25}),S.addEventListener("click",(async()=>{await e.stopRecording();let t=await e.getBlob();(0,u.vw)(t,(0,u.Dz)("matt",`${data.currentSlide}`,"ogg")),i().invokeSaveAsDialog(t,(0,u.Dz)("matt",`${data.currentSlide}`,"ogg")),B.style.pointerEvents="auto",o.p8.timeline().to(B,{autoAlpha:1}),k.disabled=!1,S.disabled=!0,L.style.pointerEvents="auto",o.p8.set(L,{autoAlpha:1})}))}));const N=await(0,l.c)(B.id);for(console.log(N.id),data.procedure[data.currentSlide].textInput=$.value,console.log(data.procedure[data.currentSlide].textInput),data.procedure[data.currentSlide].response=N.id,R=!0,await o.p8.timeline().to("#s-reasoning-1-hu-1-ca",{autoAlpha:0}).to(h,{autoAlpha:0}),1===data.reasoningSlideCounter&&(v.src=b.react1),2===data.reasoningSlideCounter&&(v.src=b.react2),3===data.reasoningSlideCounter&&(v.src=b.react3);R;)await(0,u._v)(100)}},7103:(t,e,a)=>{a.d(e,{c:()=>o});const o=t=>new Promise((e=>{const a=t=>{const a=t.target;return e(a)};"string"==typeof t&&document.getElementById(t).addEventListener("click",a,{once:!0}),Array.isArray(t)&&t.forEach((t=>{document.getElementById(t).addEventListener("click",a,{once:!0})})),void 0===t&&document.getElementById("wrapper").addEventListener("click",a,{once:!0})}))}}]);