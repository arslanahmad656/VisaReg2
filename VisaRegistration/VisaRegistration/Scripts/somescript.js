window.ReadSpeakerDefer={deferred:null,clickhandler:function(b){b=b||window.event;var d=b.target||b.srcElement;3===d.nodeType&&(d=d.parentNode);if(d!==document&&window.ReadSpeakerDefer.isRSLink(d)){window.ReadSpeakerDefer.deferred=d;(d=window.ReadSpeakerDefer.findRSParent(d))&&d.className&&!/rsdeferred/i.test(d.className)&&(d.className+=" rsdeferred");if(window.ReadSpeakerJIT){d=window.rspkr;if(/ios|ipad|iphone|ipod|android/i.test(window.navigator.userAgent)&&(d.audio=new Audio,d=d.audio.play(),void 0!==
d))d.then(function(){})["catch"](function(b){rspkr.log(b)});window.rspkr.loadCore()}b.cancelBubble=!0;b.preventDefault&&b.preventDefault();b.stopPropagation&&b.stopPropagation();return!1}},init:function(){this.RSDeferClick(document)},isRSLink:function(b){return this.isRSParent(b.parentNode)||b.href&&-1<b.href.indexOf("readspeaker.com/cgi-bin/rsent")},isRSParent:function(b){return b?b.getAttribute("class")&&-1<b.getAttribute("class").indexOf("rsbtn")||b.id&&"string"===typeof b.id&&-1<b.id.indexOf("readspeaker_button"):
!1},findRSParent:function(b){for(;b.parentNode&&b.parentNode!==document&&(b=b.parentNode,"a"!=b.tagName.toLowerCase()||!this.isRSLink(b)););return b==document?void 0:b.parentNode},RSDeferClick:function(b){b.addEventListener?b.addEventListener("click",this.clickhandler,!1):b.attachEvent?b.attachEvent("onclick",this.clickhandler):b.onclick=this.clickhandler}};window.ReadSpeakerDefer.init();
(function(b){var d,e={major:"2",minor:"5",update:"10",revision:"4926",prod:"embhl"},k=[],I=0,v=0,J=!1,w=[],K=0,m=[],L=!1,x=!1,S=0,B=!1,n=null,h="default",M=!1,y=[],N=!1,C="",D={},E=!1,F="",z=null,r=!1,G=function(a){if("string"==typeof a){a="ReadSpeaker."+a.replace("_",".");a=a.split(".");for(var f=b,c=0,d=a.length;c<d;c++)if(f)if(f[a[c]]){if(c==d-1)return f[a[c]];f=f[a[c]]}else break;else break;return!1}},P=function(a,f){w.push(a);K++;f=f||[a];for(var c=0,d=f.length;c<d;c++)try{var e=G(f[c]);"function"==
typeof e.init&&e.init.apply(e,[])}catch(T){t("[rspkr] Could not load: "+f[c]+" | "+T,3)}K===v&&!0===J&&(t("[rspkr] All prod mods loaded. _domready = "+B,4),r&&b.ReadSpeaker.init(),c=function(){rspkr.Common.createShortcuts();rspkr.devt("onModsLoaded",b);rspkr.devt("onAfterModsLoaded",b);D.onAdapterReady?rspkr.devt("onReady",b):rspkr.evt("onAdapterReady",function(){rspkr.devt("onReady",b)});b.ReadSpeaker.ui.viewport={width:$rs.width(b),height:$rs.height(b)}},b.ReadSpeaker.Common.addEvent("onReady",
function(){O.executeCode();O.flush();if(z)a:{rspkr.log("[rspkr.startAutoplay] Id: "+z);var a=$rs.get(z);if($rs.isArray(a)&&0<a.length)a=a[0];else if($rs.isArray(a)&&0==a.length)break a;a=$rs.findIn(a,"a");if($rs.isArray(a)&&0<a.length)a=a[0];else if($rs.isArray(a)&&0==a.length)break a;b.readpage(a)}}),B?c():b.ReadSpeaker.Common.addEvent("onDOMReady",c))},Q=function(){if(!x){r&&!E&&(document.getElementById("rsmod_Styles").href=F+"ReadSpeaker.Styles.css");for(var a in k)k.hasOwnProperty(a)&&(mod=a,
q.load({id:"req_"+mod,type:"text/javascript",src:"ReadSpeaker."+mod+".js",cb:function(){var a=(b.event&&b.event.srcElement&&b.event.srcElement.id?b.event.srcElement.id:this.id).replace("req_",""),a=a.replace("_","."),a=!1===k[a]?[a]:k[a],c;I++;for(var d=0,e=a.length;d<e;d++)w.push(a[d]),c=G(a[d]),"function"==typeof c.init&&c.init.apply(c,[]);I===Object.size(k)&&(b.ReadSpeaker.Common.addEvent("onModsLoaded",b.ReadSpeaker.pub.Config.setup),N=!0,a={id:"",type:"text/javascript",src:"",cb:function(){var a=
(b.event&&b.event.srcElement&&b.event.srcElement.id?b.event.srcElement.id:this.id).replace("rsmod_","");w.push(a);a=G(a);"function"==typeof a.init&&a.init.apply(a,[]);if(N&&b.ReadSpeaker.modmap&&!L){for(var a=b.ReadSpeaker.modmap,c=[],d=0,f="|",e=[],p=0,h=y.length;p<h;p++)if(c=a.products&&"function"==typeof a.products[y[p]]?a.products[y[p]]():null){for(var g=d=0,k=c.length;g<k;g++)-1===f.indexOf("|"+c[g][0]+c[g][1]+"|")&&(c[g][0].length&&(e[c[g][0]]=c[g][2],q.load({id:"rsmod_"+c[g][0],type:c[g][1],
src:"ReadSpeaker."+c[g][0]+("text/css"===c[g][1]?".css":".js"),cb:function(){var a=(b.event&&b.event.srcElement&&b.event.srcElement.id?b.event.srcElement.id:this.id).replace("rsmod_","");P(a,e[a])},async:!0})),"undefined"!==typeof c[g][1]&&/text\/javascript/.test(c[g][1])&&d++,f+=c[g][0]+c[g][1]+"|");v+=d}J=!0}}},c=b.ReadSpeaker.lib.Facade.currentLib().toLowerCase(),"rslib"==c?(a.id="rsmod_lib.RSLib",a.src="ReadSpeaker.lib.RSLib.js"):(a.id="rsmod_lib.Facade.adapter."+c,a.src="ReadSpeaker.lib.Facade.adapter."+
c+".js"),q.load(a))},async:!0}))}},R=function(){rspkr.log("[rspkr.updateBaseClass] Attempting to update..");for(var a=document.getElementsByTagName("div"),d=/\brsbtn\b/,c=0,e=a.length;c<e;c++)d.test(a[c].className)&&(a[c].className=a[c].className.replace(d,b.rsConf.ui.rsbtnClass));rspkr.log("[rspkr.updateBaseClass] Update successful!");P("skinfile")};d={extract:function(a){if("string"==typeof a){var b={};a=a.split(/[;&]/);for(var c,d=0;d<a.length;d++)(c=a[d].split("="))&&2==c.length&&(b[unescape(c[0])]=
unescape(c[1]).replace(/\+/g," "));return b}return{}}};var O={isok:!0,executeCode:function(){this.isok=!0;if(!m.length)return!0;for(idx in m)if(m.hasOwnProperty(idx)&&"function"==typeof m[idx])try{m[idx].apply(b,[])}catch(a){this.isok=!1,rspkr.log("[rspkr.q] "+a,3)}},flush:function(){m=[]}},q={load:function(a){if("text/javascript"==a.type||"text/css"==a.type){a.src=n.path+a.src;var d=document.getElementsByTagName("head")[0],c=document.createElement("text/javascript"==a.type?"script":"link"),p=[e.major,
e.minor,e.update,e.revision].join(".");"function"==typeof a.cb&&(void 0!==c.onreadystatechange?c.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||a.cb.apply(b)}:c.onload=a.cb);c.id=a.id.replace(".","_");c.type=a.type;"text/javascript"==a.type?(c.src=a.src+"?v="+p,a.async&&(c.async=!0)):(c.rel="stylesheet",c.href=a.src+"?v="+p);d.appendChild(c)}}},U=0,H={1:[],2:[],3:[],4:[],5:[],6:[]},s={1:{lbl:"Info",method:"log"},2:{lbl:"Warn",method:"warn"},3:{lbl:"Err",method:"error"},
4:{lbl:"AS",method:"log"},5:{lbl:"SW",method:"log"}},t=function(a,b){var c=C;b=b||1;H[b].push(a);if(c&&"string"===typeof c&&-1<c.indexOf(","+b+",")){c=s[b].lbl;try{console[s[b].method]&&console[s[b].method](U++ +". "+c+": "+a)}catch(d){}}},V=function(a){C=/^,[0-9,]*,$/.test(a)?a:","+a+","};Object.size=function(a){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b};if(b.rsConf&&b.rsConf.params&&"string"===typeof b.rsConf.params&&b.rsConf.params)var u=b.rsConf.params,l=u.split("?");else l=document.getElementsByTagName("script"),
u=l[l.length-1].getAttribute("src"),l=u.split("?");if(/\?/i.test(u)&&1<l.length&&l[1].length){var F=u.replace(/[^\/]*$/,""),A;if(/rsdebug=rsdebug/i.test(document.location.href))try{A=","+document.location.href.split("?").pop().match(/rsdebug=rsdebug([^$|&]*)/i).pop()+","}catch(W){A=",3,"}else A="";C=A;n=d=d.extract(l[1]);h=d.skin||"default";y=d.pids.split(",");n.path=l[0].replace("ReadSpeaker.js","");k.Core=["Common","lib.Facade","modmap"];k["pub.Config"]=!1;z=d.autoplay;r=b.ReadSpeakerJIT="1"===
d.jit;n.forceBasicMode&&"1"===n.forceBasicMode||document.attachEvent&&/MSIE/i.test(navigator.userAgent)&&(document.compatMode&&"backcompat"===document.compatMode.toLowerCase()||/MSIE 6\./i.test(navigator.userAgent))?(E=!0,q.load({id:"rsmod_Styles",type:"text/css",src:(n.skinPathBasic||"ReadSpeaker.Styles-Basic")+".css",cb:null})):(q.load({id:"rsmod_Styles",type:"text/css",src:"ReadSpeaker.Styles"+(r?"-Button":"")+".css",cb:null}),"default"!==h&&!r&&(v++,q.load({id:"rsskin_"+h+"_style",type:"text/css",
src:"skins/"+h+"/"+h+".css",cb:null}),q.load({id:"rsskin_"+h+"_js",type:"text/javascript",src:"skins/"+h+"/"+h+".js",cb:function(){"default"!==h&&x?R():M=!0},async:!0})));r||Q()}else L=!0;d=new function(){this.meta={obj:e,version:[e.major,e.minor,e.update].join(".")+"_rev"+e.revision+"-"+e.prod};this.q=function(a){"function"==typeof a&&(D.onReady?a.apply(b,[]):m.push(a))};this.init=function(){x||(x=!0,document.addEventListener&&document.removeEventListener("DOMContentLoaded",b.ReadSpeaker.init,!1),
B=!0,b.ReadSpeaker.Common&&b.ReadSpeaker.Common.dispatchEvent("onDOMReady"),t("[rspkr] DOM Ready!"),M&&(t("[rspkr] Updating base class.",1),R()))};this.getLoadedMods=function(){return w};this.rsidCount=1E3;this.logcount=0;this.log=function(a,b){t(a,b||1)};this.showLog=function(a){a=a||"1";rspkr.log("[rspkr.printErrorLog]",1);a=(a||"3").split(",");for(var b=0;b<a.length;b++)if(H.hasOwnProperty(a[b])){var c=H[a[b]],d=a[b],d=parseInt(d)||3,e=s[d].lbl;console.groupCollapsed&&console.groupCollapsed(e);
for(e=0;e<c.length;e++)try{console[s[d].method]&&console[s[d].method](c[e])}catch(h){}console.groupCollapsed&&console.groupEnd()}};this.getID=function(){return"readspeaker"+S++};this.getVersion=function(){return this.meta.version};this.skin=h;this.displog=D;this.basicMode=E;this.params=n;this.setDebugLevel=V;this.baseUrl=F;this.loadCore=Q;this.audio=null};b.ReadSpeaker=b.rs=b.rspkr=d})(window);ReadSpeaker.enums={mime:{tjs:"text/javascript",tcss:"text/css",thtml:"text/html"}};
(function(b){if(!window.ReadSpeakerJIT){var d=navigator.userAgent,e=/*@cc_on!@*/false,k=setTimeout;/mozilla/i.test(d)&&!/(compati)/.test(d)||/opera/i.test(d)||/webkit/i.test(d)?document.addEventListener("DOMContentLoaded",b,!1):e?function(){var d=document.createElement("doc:rdy");try{d.doScroll("left"),b()}catch(e){k(arguments.callee,0)}}():window.onload=b}})(ReadSpeaker.init);
