import*as e from"@radix-ui/react-portal";import n,{useRef as r,useDebugValue as t,useEffect as o,useLayoutEffect as i,useState as a,useCallback as c,useMemo as u,useImperativeHandle as s,forwardRef as l}from"react";import{useMachine as d}from"@xstate/react";import{useSpring as f,to as v,animated as p,config as m}from"react-spring";import{useDrag as g,rubberbandIfOutOfBounds as y}from"react-use-gesture";import{createFocusTrap as h}from"focus-trap";import{disableBodyScroll as S,enableBodyScroll as E}from"body-scroll-lock";import{ResizeObserver as P}from"@juggle/resize-observer";import{Machine as b,assign as R}from"xstate";function x(){return x=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},x.apply(this,arguments)}function C(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n.indexOf(r=i[t])>=0||(o[r]=e[r]);return o}var O="undefined"!=typeof window?i:o;function N(e,n,r){return n=(n=+n)==n?n:0,r=(r=+r)==r?r:0,(e=+e)==e&&(e=(e=e<=r?e:r)>=n?e:n),e}function H(e){var n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}var w={box:"border-box"};function D(e,n){var r=n.label,o=n.enabled,i=n.resizeSourceRef,u=a(0),s=u[0],l=u[1];t(r+": "+s);var d=c(function(e){l(e[0].borderBoxSize[0].blockSize),i.current="element"},[i]);return O(function(){if(e.current&&o){var n=new P(d);return n.observe(e.current,w),function(){n.disconnect()}}},[e,d,o]),o?s:0}function k(e){return void 0===e&&(e=1e3),new Promise(function(n){return setTimeout(n,e)})}var z={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},j={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},L=b({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:x({},z,j)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:x({},z,j)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:x({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[R({y:function(e,n){return n.payload.y},velocity:function(e,n){return n.payload.velocity},snapSource:function(e,n){var r=n.payload.source;return void 0===r?"custom":r}})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:function(e,n){console.log("onOpenCancel",{context:e,event:n})},onSnapCancel:function(e,n){console.log("onSnapCancel",{context:e,event:n})},onResizeCancel:function(e,n){console.log("onResizeCancel",{context:e,event:n})},onCloseCancel:function(e,n){console.log("onCloseCancel",{context:e,event:n})},onOpenEnd:function(e,n){console.log("onOpenCancel",{context:e,event:n})},onSnapEnd:function(e,n){console.log("onSnapEnd",{context:e,event:n})},onResizeEnd:function(e,n){console.log("onResizeEnd",{context:e,event:n})}},services:{onSnapStart:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenStart:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseStart:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeStart:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onSnapEnd:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenEnd:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseEnd:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeEnd:function(){try{return Promise.resolve(k()).then(function(){})}catch(e){return Promise.reject(e)}},renderVisuallyHidden:function(e,n){try{return console.group("renderVisuallyHidden"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},activate:function(e,n){try{return console.group("activate"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},deactivate:function(e,n){try{return console.group("deactivate"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},openSmoothly:function(e,n){try{return console.group("openSmoothly"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},openImmediately:function(e,n){try{return console.group("openImmediately"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},snapSmoothly:function(e,n){try{return console.group("snapSmoothly"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},resizeSmoothly:function(e,n){try{return console.group("resizeSmoothly"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}},closeSmoothly:function(e,n){try{return console.group("closeSmoothly"),console.log({context:e,event:n}),Promise.resolve(k()).then(function(){console.groupEnd()})}catch(e){return Promise.reject(e)}}},guards:{initiallyClosed:function(e){return"CLOSED"===e.initialState},initiallyOpen:function(e){return"OPEN"===e.initialState}}}),A=["children","sibling","className","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap","expandOnContentDrag","disableExpandList","preventPullUp"],T=["velocity"],M=["onRest","config"],I=m.default,G=I.tension,F=I.friction,Z=n.forwardRef(function(e,i){var l=e.children,m=e.sibling,P=e.className,b=e.footer,R=e.header,w=e.open,k=e.initialState,z=e.lastSnapRef,j=e.initialFocusRef,I=e.onDismiss,Z=e.maxHeight,U=e.defaultSnap,K=void 0===U?q:U,J=e.snapPoints,Q=void 0===J?V:J,W=e.blocking,X=void 0===W||W,Y=e.scrollLocking,$=void 0===Y||Y,_=e.style,ee=e.onSpringStart,ne=e.onSpringCancel,re=e.onSpringEnd,te=e.reserveScrollBarGap,oe=void 0===te?X:te,ie=e.expandOnContentDrag,ae=void 0!==ie&&ie,ce=e.disableExpandList,ue=void 0===ce?[]:ce,se=e.preventPullUp,le=void 0!==se&&se,de=C(e,A),fe=function(){var e=a(!1),n=e[0],r=e[1],t=a({}),i=t[0],u=t[1],s=c(function(e){return console.count("registerReady:"+e),u(function(n){var r;return x({},n,((r={})[e]=!1,r))}),function(){console.count("setReady:"+e),u(function(n){var r;return x({},n,((r={})[e]=!0,r))})}},[]);return o(function(){var e=Object.values(i);if(0!==e.length){var n=e.every(Boolean);console.log("check if we are rready",i,n),n&&(console.warn("ready!"),r(!0))}else console.log("nope nothing registered yet")},[i]),{ready:n,registerReady:s}}(),ve=fe.ready,pe=fe.registerReady,me=r(!1),ge=r(ee),ye=r(ne),he=r(re);o(function(){ge.current=ee,ye.current=ne,he.current=re},[ne,ee,re]);var Se,Ee,Pe=f(function(){return{y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0}}),be=Pe[0],Re=Pe[1],xe=r(null),Ce=r(null),Oe=r(null),Ne=r(null),He=r(null),we=r(null),De=r(0),ke=r(),ze=r(!1),je=(Se=u(function(){return"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null},[]),Ee=r(null==Se?void 0:Se.matches),t(Ee.current?"reduce":"no-preference"),o(function(){var e=function(e){Ee.current=e.matches};return null==Se||Se.addListener(e),function(){return null==Se?void 0:Se.removeListener(e)}},[Se]),Ee),Le=function(e){var n=e.targetRef,i=e.enabled,a=e.reserveScrollBarGap,c=r({activate:function(){throw new TypeError("Tried to activate scroll lock too early")},deactivate:function(){}});return t(i?"Enabled":"Disabled"),o(function(){if(!i)return c.current.deactivate(),void(c.current={activate:function(){},deactivate:function(){}});var e=n.current,r=!1;c.current={activate:function(){r||(r=!0,S(e,{allowTouchMove:function(e){return e.closest("[data-body-scroll-lock-ignore]")},reserveScrollBarGap:a}))},deactivate:function(){r&&(r=!1,E(e))}}},[i,n,a]),c}({targetRef:Ce,enabled:ve&&$,reserveScrollBarGap:oe}),Ae=function(e){var n=e.targetRef,i=e.enabled,a=r({activate:function(){throw new TypeError("Tried to activate aria hider too early")},deactivate:function(){}});return t(i?"Enabled":"Disabled"),o(function(){if(!i)return a.current.deactivate(),void(a.current={activate:function(){},deactivate:function(){}});var e=n.current,r=!1,t=[],o=[];a.current={activate:function(){if(!r){r=!0;var n=e.parentNode;document.querySelectorAll("body > *").forEach(function(e){if(e!==n){var r=e.getAttribute("aria-hidden");null!==r&&"false"!==r||(t.push(r),o.push(e),e.setAttribute("aria-hidden","true"))}})}},deactivate:function(){r&&(r=!1,o.forEach(function(e,n){var r=t[n];null===r?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",r)}),t=[],o=[])}}},[n,i]),a}({targetRef:xe,enabled:ve&&X}),Te=function(e){var n=e.targetRef,i=e.fallbackRef,a=e.initialFocusRef,c=e.enabled,u=r({activate:function(){throw new TypeError("Tried to activate focus trap too early")},deactivate:function(){}});return t(c?"Enabled":"Disabled"),o(function(){if(!c)return u.current.deactivate(),void(u.current={activate:function(){},deactivate:function(){}});var e=i.current,r=h(n.current,{onActivate:void 0,initialFocus:a?function(){return(null==a?void 0:a.current)||e}:void 0,fallbackFocus:e,escapeDeactivates:!1,clickOutsideDeactivates:!1}),t=!1;u.current={activate:function(){try{return t?Promise.resolve():(t=!0,Promise.resolve(r.activate()).then(function(){return Promise.resolve(new Promise(function(e){return setTimeout(function(){return e(void 0)},0)})).then(function(){})}))}catch(e){return Promise.reject(e)}},deactivate:function(){t&&(t=!1,r.deactivate())}}},[c,i,a,n]),u}({targetRef:xe,fallbackRef:we,initialFocusRef:j||void 0,enabled:ve&&X&&!1!==j}),Me=function(e){var n=e.getSnapPoints,i=e.heightRef,c=e.lastSnapRef,s=e.ready,l=function(e){var n=e.contentRef,i=e.controlledMaxHeight,c=e.footerEnabled,s=e.footerRef,l=e.headerEnabled,d=e.headerRef,f=e.registerReady,v=e.resizeSourceRef,p=u(function(){return f("contentHeight")},[f]),m=function(e,n,i){var c=u(function(){return n("maxHeight")},[n]),s=a(function(){return H(e)||"undefined"!=typeof window?window.innerHeight:0}),l=s[0],d=s[1],f=l>0,v=r(0);return t(e?"controlled":"auto"),o(function(){f&&c()},[f,c]),O(function(){if(e)return d(H(e)),void(i.current="maxheightprop");var n=function(){v.current||(v.current=requestAnimationFrame(function(){d(window.innerHeight),i.current="window",v.current=0}))};return window.addEventListener("resize",n),d(window.innerHeight),i.current="window",c(),function(){window.removeEventListener("resize",n),cancelAnimationFrame(v.current)}},[e,c,i]),l}(i,f,v),g=D(d,{label:"headerHeight",enabled:l,resizeSourceRef:v}),y=D(n,{label:"contentHeight",enabled:!0,resizeSourceRef:v}),h=D(s,{label:"footerHeight",enabled:c,resizeSourceRef:v}),S=Math.min(m-g-h,y)+g+h;t("minHeight: "+S);var E=y>0;return o(function(){E&&p()},[E,p]),{maxHeight:m,minHeight:S,headerHeight:g,footerHeight:h}}({contentRef:e.contentRef,controlledMaxHeight:e.controlledMaxHeight,footerEnabled:e.footerEnabled,footerRef:e.footerRef,headerEnabled:e.headerEnabled,headerRef:e.headerRef,registerReady:e.registerReady,resizeSourceRef:e.resizeSourceRef}),d=l.maxHeight,f=l.minHeight,v=l.headerHeight,p=l.footerHeight,m=function(e,n){var r=[].concat(e).map(H).reduce(function(e,r){return e.add(N(r,0,n)),e},new Set),t=Array.from(r),o=Math.min.apply(Math,t);if(Number.isNaN(o))throw new TypeError("minSnap is NaN");var i=Math.max.apply(Math,t);if(Number.isNaN(i))throw new TypeError("maxSnap is NaN");return{snapPoints:t,minSnap:o,maxSnap:i}}(s?n({height:i.current,footerHeight:p,headerHeight:v,minHeight:f,maxHeight:d}):[0],d),g=m.snapPoints,y=m.minSnap,h=m.maxSnap;return t("minSnap: "+y+", maxSnap:"+h),{minSnap:y,maxSnap:h,findSnap:function(e){var n=H("function"==typeof e?e({footerHeight:p,headerHeight:v,height:i.current,minHeight:f,maxHeight:d,snapPoints:g,lastSnap:c.current}):e);return g.reduce(function(e,r){return Math.abs(r-n)<Math.abs(e-n)?r:e},y)},maxHeight:d}}({contentRef:Oe,controlledMaxHeight:Z,footerEnabled:!!b,footerRef:He,getSnapPoints:Q,headerEnabled:!1!==R,headerRef:Ne,heightRef:De,lastSnapRef:z,ready:ve,registerReady:pe,resizeSourceRef:ke}),Ie=Me.minSnap,Ge=Me.maxSnap,Fe=Me.maxHeight,Ze=Me.findSnap,Be=r(Fe),qe=r(Ie),Ve=r(Ge),Ue=r(Ze),Ke=r(0);O(function(){Be.current=Fe,Ve.current=Ge,qe.current=Ie,Ue.current=Ze,Ke.current=Ze(K)},[Ze,K,Fe,Ge,Ie]);var Je=c(function(e){var n=e.onRest,r=e.config,t=(r=void 0===r?{}:r).velocity,o=void 0===t?1:t,i=C(r,T),a=C(e,M);return new Promise(function(e){return Re(x({},a,{config:x({velocity:o},i,{mass:1,tension:G,friction:Math.max(F,F+(F-F*o))}),onRest:function(){var r=[].slice.call(arguments);e.apply(void 0,r),null==n||n.apply(void 0,r)}}))})},[Re]),Qe=d(L,{devTools:!1,actions:{onOpenCancel:c(function(){return null==ye.current?void 0:ye.current({type:"OPEN"})},[]),onSnapCancel:c(function(e){return null==ye.current?void 0:ye.current({type:"SNAP",source:e.snapSource})},[]),onCloseCancel:c(function(){return null==ye.current?void 0:ye.current({type:"CLOSE"})},[]),onResizeCancel:c(function(){return null==ye.current?void 0:ye.current({type:"RESIZE",source:ke.current})},[]),onOpenEnd:c(function(){return null==he.current?void 0:he.current({type:"OPEN"})},[]),onSnapEnd:c(function(e,n){return null==he.current?void 0:he.current({type:"SNAP",source:e.snapSource})},[]),onResizeEnd:c(function(){return null==he.current?void 0:he.current({type:"RESIZE",source:ke.current})},[])},context:{initialState:k},services:{onSnapStart:c(function(e,n){try{return Promise.resolve(null==ge.current?void 0:ge.current({type:"SNAP",source:n.payload.source||"custom"}))}catch(e){return Promise.reject(e)}},[]),onOpenStart:c(function(){try{return Promise.resolve(null==ge.current?void 0:ge.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseStart:c(function(){try{return Promise.resolve(null==ge.current?void 0:ge.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeStart:c(function(){try{return Promise.resolve(null==ge.current?void 0:ge.current({type:"RESIZE",source:ke.current}))}catch(e){return Promise.reject(e)}},[]),onSnapEnd:c(function(e,n){try{return Promise.resolve(null==he.current?void 0:he.current({type:"SNAP",source:e.snapSource}))}catch(e){return Promise.reject(e)}},[]),onOpenEnd:c(function(){try{return Promise.resolve(null==he.current?void 0:he.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseEnd:c(function(){try{return Promise.resolve(null==he.current?void 0:he.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeEnd:c(function(){try{return Promise.resolve(null==he.current?void 0:he.current({type:"RESIZE",source:ke.current}))}catch(e){return Promise.reject(e)}},[]),renderVisuallyHidden:c(function(e,n){try{return Promise.resolve(Je({y:Ke.current,ready:0,maxHeight:Be.current,maxSnap:Ve.current,minSnap:Ke.current,immediate:!0})).then(function(){})}catch(e){return Promise.reject(e)}},[Je]),activate:c(function(e,n){try{return me.current=!0,Promise.resolve(Promise.all([Le.current.activate(),Te.current.activate(),Ae.current.activate()])).then(function(){})}catch(e){return Promise.reject(e)}},[Ae,Te,Le]),deactivate:c(function(){try{return Le.current.deactivate(),Te.current.deactivate(),Ae.current.deactivate(),me.current=!1,Promise.resolve()}catch(e){return Promise.reject(e)}},[Ae,Te,Le]),openImmediately:c(function(){try{return De.current=Ke.current,Promise.resolve(Je({y:Ke.current,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:Ke.current,immediate:!0})).then(function(){})}catch(e){return Promise.reject(e)}},[Je]),openSmoothly:c(function(){try{return Promise.resolve(Je({y:0,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:Ke.current,immediate:!0})).then(function(){return De.current=Ke.current,Promise.resolve(Je({y:Ke.current,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:Ke.current,immediate:je.current})).then(function(){})})}catch(e){return Promise.reject(e)}},[Je,je]),snapSmoothly:c(function(e,n){try{var r=Ue.current(e.y);return De.current=r,z.current=r,Promise.resolve(Je({y:r,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:qe.current,immediate:je.current,config:{velocity:e.velocity}})).then(function(){})}catch(e){return Promise.reject(e)}},[Je,z,je]),resizeSmoothly:c(function(){try{var e=Ue.current(De.current);return De.current=e,z.current=e,Promise.resolve(Je({y:e,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:qe.current,immediate:"element"!==ke.current||je.current})).then(function(){})}catch(e){return Promise.reject(e)}},[Je,z,je]),closeSmoothly:c(function(e,n){try{return Je({minSnap:De.current,immediate:!0}),De.current=0,Promise.resolve(Je({y:0,maxHeight:Be.current,maxSnap:Ve.current,immediate:je.current})).then(function(){return Promise.resolve(Je({ready:0,immediate:!0})).then(function(){})})}catch(e){return Promise.reject(e)}},[Je,je])}}),We=Qe[0],Xe=Qe[1];o(function(){Xe(w?"OPEN":"CLOSE")},[w,Xe,ve]),O(function(){(Fe||Ge||Ie)&&Xe("RESIZE")},[Fe,Ge,Ie,Xe]),o(function(){return function(){Le.current.deactivate(),Te.current.deactivate(),Ae.current.deactivate()}},[Ae,Te,Le]),s(i,function(){return{snapTo:function(e,n){var r=void 0===n?{}:n,t=r.velocity,o=void 0===t?1:t,i=r.source,a=void 0===i?"custom":i;Xe("SNAP",{payload:{y:Ue.current(e),velocity:o,source:a}})},get height(){return De.current}}},[Xe]),o(function(){var e=Ce.current,n=function(n){var r=ue.map(function(e){return xe.current.querySelector(e)}).filter(Boolean);if(r.length&&r.some(function(e){return e.contains(n.target)}))return!0;ze.current&&e.scrollTop<=0&&n.preventDefault()},r=0,t=function(n){e.scrollTop<0&&(r=e.scrollTop)},o=function(n){e.scrollTop<0&&e.scrollTop<r&&n.preventDefault()};return ae&&(e.addEventListener("scroll",n),e.addEventListener("touchmove",n),e.addEventListener("touchmove",o),e.addEventListener("touchstart",t,{passive:!0})),function(){e.removeEventListener("scroll",n),e.removeEventListener("touchmove",n),e.removeEventListener("touchmove",o),e.removeEventListener("touchstart",t)}},[ae,Ce,ue]);var Ye=g(function(e){var n=e.args,r=(n=void 0===n?[]:n)[0],t=(r=void 0===r?{}:r).closeOnTap,o=void 0!==t&&t,i=r.isContentDragging,a=void 0!==i&&i,c=e.cancel,u=e.direction[1],s=e.down,l=e.first,d=e.last,f=e.memo,v=void 0===f?be.y.get():f,p=e.movement[1],m=e.tap,g=e.velocity,h=e.event,S=-1*p,E=Ce.current.scrollHeight>Ce.current.clientHeight;if(xe.current&&ue.length){var P=ue.map(function(e){return xe.current.querySelector(e)}).filter(Boolean);if(P.length&&P.some(function(e){return e.contains(h.target)}))return c(),v}if(!me.current)return console.log("handleDrag cancelled dragging because canDragRef is false"),c(),v;if(I&&o&&m)return c(),setTimeout(function(){return I()},10),v;if(m)return v;var b=v+S,R=S*g,x=Math.max(qe.current,Math.min(Ve.current,b+2*R));if(!s&&I&&u>0&&b+R<qe.current/2&&(!E||Ce.current.scrollTop<=0))return c(),I(),v;var C=s?I||qe.current!==Ve.current?y(b,I?0:qe.current,Ve.current,.55):b<qe.current?y(b,qe.current,2*Ve.current,.55):y(b,qe.current/2,Ve.current,.55):x;if(le){if(0===u)return v;if(u<0&&C>Ge&&p<=0||u>0&&C>Ge&&p<=0)return v}return ae&&a?(C>=Ve.current&&(C=Ve.current),v===Ve.current&&Ce.current.scrollTop>0&&(C=Ve.current),ze.current=C<Ve.current):ze.current=!1,l&&Xe("DRAG"),d?(Xe("SNAP",{payload:{y:C,velocity:g>.05?g:1,source:"dragging"}}),v):(Re({y:C,ready:1,maxHeight:Be.current,maxSnap:Ve.current,minSnap:qe.current,immediate:!0,config:{velocity:g}}),v)},{filterTaps:!0});if(Number.isNaN(Ve.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(qe.current))throw new TypeError("minSnapRef is NaN!!");var $e=function(e){var n,r=e.spring,t=v([r.y,r.maxHeight],function(e,n){return Math.round(N(n-e,0,16))+"px"}),o=v([r.y,r.minSnap,r.maxSnap],function(e,n,r){return N(e,n,r)+"px"}),i=v([r.y,r.minSnap,r.maxSnap],function(e,n,r){return e<n?n-e+"px":e>r?r-e+"px":"0px"}),a=v([r.y,r.maxSnap],function(e,n){return e>=n?Math.ceil(e-n):0}),c=v([r.y,r.minSnap],function(e,n){if(!n)return 0;var r=Math.max(n/2-45,0);return N((e-r)*(1/(Math.min(n/2+45,n)-r)+0),0,1)}),u=v([r.y,r.minSnap],function(e,n){return n?N(e/n,0,1):0});return(n={})["--rsbs-content-opacity"]=c,n["--rsbs-backdrop-opacity"]=u,n["--rsbs-antigap-scale-y"]=a,n["--rsbs-overlay-translate-y"]=i,n["--rsbs-overlay-rounded"]=t,n["--rsbs-overlay-h"]=o,n}({spring:be});/*#__PURE__*/return n.createElement(p.div,x({},de,{"data-rsbs-root":!0,"data-rsbs-state":B.find(We.matches),"data-rsbs-is-blocking":X,"data-rsbs-is-dismissable":!!I,"data-rsbs-has-header":!!R,"data-rsbs-has-footer":!!b,className:P,ref:xe,style:x({},$e,_,{opacity:be.ready})}),m,X&&/*#__PURE__*/n.createElement("div",x({key:"backdrop","data-rsbs-backdrop":!0},Ye({closeOnTap:!0}))),/*#__PURE__*/n.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:we,onKeyDown:function(e){"Escape"===e.key&&(e.stopPropagation(),I&&I())}},!1!==R&&/*#__PURE__*/n.createElement("div",x({key:"header","data-rsbs-header":!0,ref:Ne},Ye()),R),/*#__PURE__*/n.createElement("div",x({key:"scroll","data-rsbs-scroll":!0,ref:Ce},ae?Ye({isContentDragging:!0}):{}),/*#__PURE__*/n.createElement("div",{"data-rsbs-content":!0,ref:Oe},l)),b&&/*#__PURE__*/n.createElement("div",x({key:"footer",ref:He,"data-rsbs-footer":!0},Ye()),b)))}),B=["closed","opening","open","closing","dragging","snapping","resizing"];function q(e){var n=e.lastSnap;return null!=n?n:Math.min.apply(Math,e.snapPoints)}function V(e){return e.minHeight}var U=["onSpringStart","onSpringEnd","skipInitialTransition"],K=l(function(t,o){var i=t.onSpringStart,u=t.onSpringEnd,s=t.skipInitialTransition,l=C(t,U),d=a(!1),f=d[0],v=d[1],p=r(),m=r(null),g=r(s&&l.open?"OPEN":"CLOSED");O(function(){if(l.open)return cancelAnimationFrame(p.current),v(!0),function(){g.current="CLOSED"}},[l.open]);var y=c(function(e){return Promise.resolve(null==i?void 0:i(e)).then(function(){"OPEN"===e.type&&cancelAnimationFrame(p.current)})},[i]),h=c(function(e){return Promise.resolve(null==u?void 0:u(e)).then(function(){"CLOSE"===e.type&&(p.current=requestAnimationFrame(function(){return v(!1)}))})},[u]);return f?/*#__PURE__*/n.createElement(e.Root,{"data-rsbs-portal":!0},/*#__PURE__*/n.createElement(Z,x({},l,{lastSnapRef:m,ref:o,initialState:g.current,onSpringStart:y,onSpringEnd:h}))):null});export{K as BottomSheet};
//# sourceMappingURL=index.es.js.map
