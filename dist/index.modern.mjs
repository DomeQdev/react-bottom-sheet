import*as e from"@radix-ui/react-portal";import n,{useRef as t,useDebugValue as r,useEffect as o,useLayoutEffect as a,useState as i,useCallback as c,useMemo as s,useImperativeHandle as l,forwardRef as u}from"react";import{useMachine as d}from"@xstate/react";import{useSpring as p,to as g,animated as y,config as m}from"react-spring";import{useDrag as v,rubberbandIfOutOfBounds as S}from"react-use-gesture";import{createFocusTrap as f}from"focus-trap";import{disableBodyScroll as h,enableBodyScroll as E}from"body-scroll-lock";import{ResizeObserver as b}from"@juggle/resize-observer";import{Machine as R,assign as x}from"xstate";function w(){return w=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},w.apply(this,arguments)}function C(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n.indexOf(t=a[r])>=0||(o[t]=e[t]);return o}const O="undefined"!=typeof window?a:o;function N(e,n,t){return n=(n=+n)==n?n:0,t=(t=+t)==t?t:0,(e=+e)==e&&(e=(e=e<=t?e:t)>=n?e:n),e}function H(e){const n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}const D={box:"border-box"};function k(e,{label:n,enabled:t,resizeSourceRef:o}){let[a,s]=i(0);r(`${n}: ${a}`),__CONSOLE__REPLACEMENT__?.log(`useElementSizeObserver: ${n}: ${a}`);const l=c(e=>{s(e[0].borderBoxSize[0].blockSize),o.current="element"},[o]);return O(()=>{if(!e.current||!t)return;const n=new b(l);return n.observe(e.current,D),()=>{n.disconnect()}},[e,l,t]),t?a:0}function z(e=1e3){return new Promise(n=>setTimeout(n,e))}const P={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},L={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},A=R({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:w({},P,L)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:w({},P,L)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:w({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[x({y:(e,{payload:{y:n}})=>n,velocity:(e,{payload:{velocity:n}})=>n,snapSource:(e,{payload:{source:n="custom"}})=>n})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onOpenCancel",{context:e,event:n})},onSnapCancel:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onSnapCancel",{context:e,event:n})},onResizeCancel:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onResizeCancel",{context:e,event:n})},onCloseCancel:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onCloseCancel",{context:e,event:n})},onOpenEnd:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onOpenCancel",{context:e,event:n})},onSnapEnd:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onSnapEnd",{context:e,event:n})},onResizeEnd:(e,n)=>{__CONSOLE__REPLACEMENT__?.log("onResizeEnd",{context:e,event:n})}},services:{onSnapStart:async()=>{await z()},onOpenStart:async()=>{await z()},onCloseStart:async()=>{await z()},onResizeStart:async()=>{await z()},onSnapEnd:async()=>{await z()},onOpenEnd:async()=>{await z()},onCloseEnd:async()=>{await z()},onResizeEnd:async()=>{await z()},renderVisuallyHidden:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("renderVisuallyHidden"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},activate:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("activate"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},deactivate:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("deactivate"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},openSmoothly:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("openSmoothly"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},openImmediately:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("openImmediately"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},snapSmoothly:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("snapSmoothly"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},resizeSmoothly:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("resizeSmoothly"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()},closeSmoothly:async(e,n)=>{__CONSOLE__REPLACEMENT__?.group("closeSmoothly"),__CONSOLE__REPLACEMENT__?.log({context:e,event:n}),await z(),__CONSOLE__REPLACEMENT__?.groupEnd()}},guards:{initiallyClosed:({initialState:e})=>"CLOSED"===e,initiallyOpen:({initialState:e})=>"OPEN"===e}}),T=["children","sibling","className","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap","expandOnContentDrag","disableExpandList","preventPullUp"],M=["velocity"],I=["onRest","config"],{tension:G,friction:F}=m.default,Z=n.forwardRef(function(e,a){let{children:u,sibling:m,className:b,footer:R,header:x,open:D,initialState:z,lastSnapRef:P,initialFocusRef:L,onDismiss:Z,maxHeight:q,defaultSnap:V=$,snapPoints:U=j,blocking:K=!0,scrollLocking:J=!0,style:Q,onSpringStart:W,onSpringCancel:X,onSpringEnd:Y,reserveScrollBarGap:_=K,expandOnContentDrag:ee=!1,disableExpandList:ne=[],preventPullUp:te=!1}=e,re=C(e,T);const{ready:oe,registerReady:ae}=function(){const[e,n]=i(!1),[t,r]=i({}),a=c(e=>(r(n=>w({},n,{[e]:!1})),()=>{r(n=>w({},n,{[e]:!0}))}),[]);return o(()=>{const e=Object.values(t);0!==e.length&&e.every(Boolean)&&n(!0)},[t]),{ready:e,registerReady:a}}(),ie=t(!1),ce=t(W),se=t(X),le=t(Y);o(()=>{ce.current=W,se.current=X,le.current=Y},[X,W,Y]);const[ue,de]=p(()=>({y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0})),pe=t(null),ge=t(null),ye=t(null),me=t(null),ve=t(null),Se=t(null),fe=t(0),he=t(),Ee=t(!1),be=function(){const e=s(()=>"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null,[]),n=t(null==e?void 0:e.matches);return r(n.current?"reduce":"no-preference"),o(()=>{const t=e=>{n.current=e.matches};return null==e||e.addListener(t),()=>null==e?void 0:e.removeListener(t)},[e]),n}(),Re=function({targetRef:e,enabled:n,reserveScrollBarGap:a}){const i=t({activate:()=>{throw new TypeError("Tried to activate scroll lock too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),o(()=>{if(!n)return i.current.deactivate(),void(i.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1;i.current={activate:()=>{r||(r=!0,h(t,{allowTouchMove:e=>e.closest("[data-body-scroll-lock-ignore]"),reserveScrollBarGap:a}))},deactivate:()=>{r&&(r=!1,E(t))}}},[n,e,a]),i}({targetRef:ge,enabled:oe&&J,reserveScrollBarGap:_}),xe=function({targetRef:e,enabled:n}){const a=t({activate:()=>{throw new TypeError("Tried to activate aria hider too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),o(()=>{if(!n)return a.current.deactivate(),void(a.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1,o=[],i=[];a.current={activate:()=>{if(r)return;r=!0;const e=t.parentNode;document.querySelectorAll("body > *").forEach(n=>{if(n===e)return;let t=n.getAttribute("aria-hidden");null!==t&&"false"!==t||(o.push(t),i.push(n),n.setAttribute("aria-hidden","true"))})},deactivate:()=>{r&&(r=!1,i.forEach((e,n)=>{let t=o[n];null===t?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t)}),o=[],i=[])}}},[e,n]),a}({targetRef:pe,enabled:oe&&K}),we=function({targetRef:e,fallbackRef:n,initialFocusRef:a,enabled:i}){const c=t({activate:()=>{throw new TypeError("Tried to activate focus trap too early")},deactivate:()=>{}});return r(i?"Enabled":"Disabled"),o(()=>{if(!i)return c.current.deactivate(),void(c.current={activate:()=>{},deactivate:()=>{}});const t=n.current,r=f(e.current,{onActivate:void 0,initialFocus:a?()=>(null==a?void 0:a.current)||t:void 0,fallbackFocus:t,escapeDeactivates:!1,clickOutsideDeactivates:!1});let o=!1;c.current={activate:async()=>{o||(o=!0,await r.activate(),await new Promise(e=>setTimeout(()=>e(void 0),0)))},deactivate:()=>{o&&(o=!1,r.deactivate())}}},[i,n,a,e]),c}({targetRef:pe,fallbackRef:Se,initialFocusRef:L||void 0,enabled:oe&&K&&!1!==L}),{minSnap:Ce,maxSnap:Oe,maxHeight:Ne,findSnap:He}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:a,footerRef:c,getSnapPoints:l,headerEnabled:u,headerRef:d,heightRef:p,lastSnapRef:g,ready:y,registerReady:m,resizeSourceRef:v}){const{maxHeight:S,minHeight:f,headerHeight:h,footerHeight:E}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:a,footerRef:c,headerEnabled:l,headerRef:u,registerReady:d,resizeSourceRef:p}){const g=s(()=>d("contentHeight"),[d]),y=function(e,n,a){const c=s(()=>n("maxHeight"),[n]),[l,u]=i(()=>H(e)||"undefined"!=typeof window?window.innerHeight:0),d=l>0,p=t(0);return r(e?"controlled":"auto"),o(()=>{d&&c()},[d,c]),O(()=>{if(e)return u(H(e)),void(a.current="maxheightprop");const n=()=>{p.current||(p.current=requestAnimationFrame(()=>{u(window.innerHeight),a.current="window",p.current=0}))};return window.addEventListener("resize",n),u(window.innerHeight),a.current="window",c(),()=>{window.removeEventListener("resize",n),cancelAnimationFrame(p.current)}},[e,c,a]),l}(n,d,p),m=k(u,{label:"headerHeight",enabled:l,resizeSourceRef:p}),v=k(e,{label:"contentHeight",enabled:!0,resizeSourceRef:p}),S=k(c,{label:"footerHeight",enabled:a,resizeSourceRef:p}),f=Math.min(y-m-S,v)+m+S;r(`minHeight: ${f}`);const h=v>0;return o(()=>{h&&g()},[h,g]),{maxHeight:y,minHeight:f,headerHeight:m,footerHeight:S}}({contentRef:e,controlledMaxHeight:n,footerEnabled:a,footerRef:c,headerEnabled:u,headerRef:d,registerReady:m,resizeSourceRef:v}),{snapPoints:b,minSnap:R,maxSnap:x}=function(e,n){const t=[].concat(e).map(H).reduce((e,t)=>(e.add(N(t,0,n)),e),new Set),r=Array.from(t),o=Math.min(...r);if(Number.isNaN(o))throw new TypeError("minSnap is NaN");const a=Math.max(...r);if(Number.isNaN(a))throw new TypeError("maxSnap is NaN");return{snapPoints:r,minSnap:o,maxSnap:a}}(y?l({height:p.current,footerHeight:E,headerHeight:h,minHeight:f,maxHeight:S}):[0],S);return r(`minSnap: ${R}, maxSnap:${x}`),{minSnap:R,maxSnap:x,findSnap:function(e){let n;n="function"==typeof e?e({footerHeight:E,headerHeight:h,height:p.current,minHeight:f,maxHeight:S,snapPoints:b,lastSnap:g.current}):e;const t=H(n);return b.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,R)},maxHeight:S}}({contentRef:ye,controlledMaxHeight:q,footerEnabled:!!R,footerRef:ve,getSnapPoints:U,headerEnabled:!1!==x,headerRef:me,heightRef:fe,lastSnapRef:P,ready:oe,registerReady:ae,resizeSourceRef:he}),De=t(Ne),ke=t(Ce),ze=t(Oe),Pe=t(He),Le=t(0);O(()=>{De.current=Ne,ze.current=Oe,ke.current=Ce,Pe.current=He,Le.current=He(V)},[He,V,Ne,Oe,Ce]);const Ae=c(e=>{let{onRest:n,config:{velocity:t=1}={}}=e,r=C(e.config,M),o=C(e,I);return new Promise(e=>de(w({},o,{config:w({velocity:t},r,{mass:1,tension:G,friction:Math.max(F,F+(F-F*t))}),onRest:(...t)=>{e(...t),null==n||n(...t)}})))},[de]),[Te,Me]=d(A,{devTools:!1,actions:{onOpenCancel:c(()=>null==se.current?void 0:se.current({type:"OPEN"}),[]),onSnapCancel:c(e=>null==se.current?void 0:se.current({type:"SNAP",source:e.snapSource}),[]),onCloseCancel:c(()=>null==se.current?void 0:se.current({type:"CLOSE"}),[]),onResizeCancel:c(()=>null==se.current?void 0:se.current({type:"RESIZE",source:he.current}),[]),onOpenEnd:c(()=>null==le.current?void 0:le.current({type:"OPEN"}),[]),onSnapEnd:c((e,n)=>null==le.current?void 0:le.current({type:"SNAP",source:e.snapSource}),[]),onResizeEnd:c(()=>null==le.current?void 0:le.current({type:"RESIZE",source:he.current}),[])},context:{initialState:z},services:{onSnapStart:c(async(e,n)=>null==ce.current?void 0:ce.current({type:"SNAP",source:n.payload.source||"custom"}),[]),onOpenStart:c(async()=>null==ce.current?void 0:ce.current({type:"OPEN"}),[]),onCloseStart:c(async()=>null==ce.current?void 0:ce.current({type:"CLOSE"}),[]),onResizeStart:c(async()=>null==ce.current?void 0:ce.current({type:"RESIZE",source:he.current}),[]),onSnapEnd:c(async(e,n)=>null==le.current?void 0:le.current({type:"SNAP",source:e.snapSource}),[]),onOpenEnd:c(async()=>null==le.current?void 0:le.current({type:"OPEN"}),[]),onCloseEnd:c(async()=>null==le.current?void 0:le.current({type:"CLOSE"}),[]),onResizeEnd:c(async()=>null==le.current?void 0:le.current({type:"RESIZE",source:he.current}),[]),renderVisuallyHidden:c(async(e,n)=>{await Ae({y:Le.current,ready:0,maxHeight:De.current,maxSnap:ze.current,minSnap:Le.current,immediate:!0})},[Ae]),activate:c(async(e,n)=>{ie.current=!0,await Promise.all([Re.current.activate(),we.current.activate(),xe.current.activate()])},[xe,we,Re]),deactivate:c(async()=>{Re.current.deactivate(),we.current.deactivate(),xe.current.deactivate(),ie.current=!1},[xe,we,Re]),openImmediately:c(async()=>{fe.current=Le.current,await Ae({y:Le.current,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:Le.current,immediate:!0})},[Ae]),openSmoothly:c(async()=>{await Ae({y:0,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:Le.current,immediate:!0}),fe.current=Le.current,await Ae({y:Le.current,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:Le.current,immediate:be.current})},[Ae,be]),snapSmoothly:c(async(e,n)=>{const t=Pe.current(e.y);fe.current=t,P.current=t,await Ae({y:t,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:ke.current,immediate:be.current,config:{velocity:e.velocity}})},[Ae,P,be]),resizeSmoothly:c(async()=>{const e=Pe.current(fe.current);fe.current=e,P.current=e,await Ae({y:e,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:ke.current,immediate:"element"!==he.current||be.current})},[Ae,P,be]),closeSmoothly:c(async(e,n)=>{Ae({minSnap:fe.current,immediate:!0}),fe.current=0,await Ae({y:0,maxHeight:De.current,maxSnap:ze.current,immediate:be.current}),await Ae({ready:0,immediate:!0})},[Ae,be])}});o(()=>{Me(D?"OPEN":"CLOSE")},[D,Me,oe]),O(()=>{(Ne||Oe||Ce)&&Me("RESIZE")},[Ne,Oe,Ce,Me]),o(()=>()=>{Re.current.deactivate(),we.current.deactivate(),xe.current.deactivate()},[xe,we,Re]),l(a,()=>({snapTo:(e,{velocity:n=1,source:t="custom"}={})=>{Me("SNAP",{payload:{y:Pe.current(e),velocity:n,source:t}})},get height(){return fe.current}}),[Me]),o(()=>{const e=ge.current,n=n=>{const t=ne.map(e=>pe.current.querySelector(e)).filter(Boolean);if(t.length&&t.some(e=>e.contains(n.target)))return!0;Ee.current&&e.scrollTop<=0&&n.preventDefault()};let t=0;const r=n=>{e.scrollTop<0&&(t=e.scrollTop)},o=n=>{e.scrollTop<0&&e.scrollTop<t&&n.preventDefault()};return ee&&(e.addEventListener("scroll",n),e.addEventListener("touchmove",n),e.addEventListener("touchmove",o),e.addEventListener("touchstart",r,{passive:!0})),()=>{e.removeEventListener("scroll",n),e.removeEventListener("touchmove",n),e.removeEventListener("touchmove",o),e.removeEventListener("touchstart",r)}},[ee,ge,ne]);const Ie=v(({args:[{closeOnTap:e=!1,isContentDragging:n=!1}={}]=[],cancel:t,direction:[,r],down:o,first:a,last:i,memo:c=ue.y.get(),movement:[,s],tap:l,velocity:u,event:d})=>{const p=-1*s,g=ge.current.scrollHeight>ge.current.clientHeight;if(pe.current&&ne.length){const e=ne.map(e=>pe.current.querySelector(e)).filter(Boolean);if(e.length&&e.some(e=>e.contains(d.target)))return t(),c}if(!ie.current)return __CONSOLE__REPLACEMENT__?.log("handleDrag cancelled dragging because canDragRef is false"),t(),c;if(Z&&e&&l)return t(),setTimeout(()=>Z(),10),c;if(l)return c;const y=c+p,m=p*u,v=Math.max(ke.current,Math.min(ze.current,y+2*m));if(!o&&Z&&r>0&&y+m<ke.current/2&&(!g||ge.current.scrollTop<=0))return t(),Z(),c;let f=o?Z||ke.current!==ze.current?S(y,Z?0:ke.current,ze.current,.55):y<ke.current?S(y,ke.current,2*ze.current,.55):S(y,ke.current/2,ze.current,.55):v;if(te){if(0===r)return c;if(r<0&&f>Oe&&s<=0||r>0&&f>Oe&&s<=0)return c}return ee&&n?(f>=ze.current&&(f=ze.current),c===ze.current&&ge.current.scrollTop>0&&(f=ze.current),Ee.current=f<ze.current):Ee.current=!1,a&&Me("DRAG"),i?(Me("SNAP",{payload:{y:f,velocity:u>.05?u:1,source:"dragging"}}),c):(de({y:f,ready:1,maxHeight:De.current,maxSnap:ze.current,minSnap:ke.current,immediate:!0,config:{velocity:u}}),c)},{filterTaps:!0});if(Number.isNaN(ze.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(ke.current))throw new TypeError("minSnapRef is NaN!!");const Ge=function({spring:e}){const n=g([e.y,e.maxHeight],(e,n)=>`${Math.round(N(n-e,0,16))}px`),t=g([e.y,e.minSnap,e.maxSnap],(e,n,t)=>`${N(e,n,t)}px`),r=g([e.y,e.minSnap,e.maxSnap],(e,n,t)=>e<n?n-e+"px":e>t?t-e+"px":"0px"),o=g([e.y,e.maxSnap],(e,n)=>e>=n?Math.ceil(e-n):0);return{"--rsbs-content-opacity":g([e.y,e.minSnap],(e,n)=>{if(!n)return 0;const t=Math.max(n/2-45,0);return N((e-t)*(1/(Math.min(n/2+45,n)-t)+0),0,1)}),"--rsbs-backdrop-opacity":g([e.y,e.minSnap],(e,n)=>n?N(e/n,0,1):0),"--rsbs-antigap-scale-y":o,"--rsbs-overlay-translate-y":r,"--rsbs-overlay-rounded":n,"--rsbs-overlay-h":t}}({spring:ue});/*#__PURE__*/return n.createElement(y.div,w({},re,{"data-rsbs-root":!0,"data-rsbs-state":B.find(Te.matches),"data-rsbs-is-blocking":K,"data-rsbs-is-dismissable":!!Z,"data-rsbs-has-header":!!x,"data-rsbs-has-footer":!!R,className:b,ref:pe,style:w({},Ge,Q,{opacity:ue.ready})}),m,K&&/*#__PURE__*/n.createElement("div",w({key:"backdrop","data-rsbs-backdrop":!0},Ie({closeOnTap:!0}))),/*#__PURE__*/n.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:Se,onKeyDown:e=>{"Escape"===e.key&&(e.stopPropagation(),Z&&Z())}},!1!==x&&/*#__PURE__*/n.createElement("div",w({key:"header","data-rsbs-header":!0,ref:me},Ie()),x),/*#__PURE__*/n.createElement("div",w({key:"scroll","data-rsbs-scroll":!0,ref:ge},ee?Ie({isContentDragging:!0}):{}),/*#__PURE__*/n.createElement("div",{"data-rsbs-content":!0,ref:ye},u)),R&&/*#__PURE__*/n.createElement("div",w({key:"footer",ref:ve,"data-rsbs-footer":!0},Ie()),R)))}),B=["closed","opening","open","closing","dragging","snapping","resizing"];function $({snapPoints:e,lastSnap:n}){return null!=n?n:Math.min(...e)}function j({minHeight:e}){return e}const q=["onSpringStart","onSpringEnd","skipInitialTransition"],V=u(function(r,o){let{onSpringStart:a,onSpringEnd:i,skipInitialTransition:s}=r,l=C(r,q);const u=t(),d=t(null),p=t(s&&l.open?"OPEN":"CLOSED");O(()=>{if(l.open)return cancelAnimationFrame(u.current),()=>{p.current="CLOSED"}},[l.open]);const g=c(async function(e){await(null==a?void 0:a(e)),"OPEN"===e.type&&cancelAnimationFrame(u.current)},[a]),y=c(async function(e){await(null==i?void 0:i(e))},[i]);/*#__PURE__*/return n.createElement(e.Root,{"data-rsbs-portal":!0},/*#__PURE__*/n.createElement(Z,w({},l,{lastSnapRef:d,ref:o,initialState:p.current,onSpringStart:g,onSpringEnd:y})))});export{V as BottomSheet};
//# sourceMappingURL=index.modern.mjs.map
