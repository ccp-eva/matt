const url=new URL(window.location.href),params=new URLSearchParams(url.search);let id="",culture="",agegroup="",input="",datatransfer="";if(params.has("id")&&(id=params.get("id")),params.has("culture")&&(culture=params.get("culture")),params.has("agegroup")&&(agegroup=params.get("agegroup")),params.has("input")&&(input=params.get("input")),params.has("datatransfer")&&(datatransfer=params.get("datatransfer")),window.history.pushState({},document.title,window.location.pathname),id){const e=document.getElementById("input-id");e.required=!1,e.parentNode.style.display="none"}if(culture){const e=document.getElementById("input-culture");e.required=!1,e.parentNode.style.display="none"}if(agegroup){const e=document.getElementById("input-agegroup");e.required=!1,e.parentNode.style.display="none"}if(input){const e=document.getElementById("input-response");e.required=!1,e.parentNode.style.display="none"}if(datatransfer){const e=document.getElementById("input-datatransfer");e.required=!1,e.parentElement.style.display="none"}document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault(),id=id||document.getElementById("input-id").value,culture=culture||document.getElementById("input-culture").value,agegroup=agegroup||document.getElementById("input-agegroup").value;let t="";input||(t=document.getElementById("input-response").selectedIndex);let a="";datatransfer||(a=document.getElementById("input-datatransfer").selectedIndex);const n=(new Map).set(0,"userchoice-audio").set(1,"userchoice-text").set(2,"audio").set(3,"text"),r=(new Map).set(0,"both").set(1,"server");input=input||n.get(t),datatransfer=datatransfer||r.get(a),window.location.href=`${window.location.href}app.html?id=${id}&culture=${culture}&agegroup=${agegroup}&input=${input}&datatransfer=${datatransfer}`}));