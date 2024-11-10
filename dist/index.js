var e=require("@radix-ui/react-portal"),n=require("react"),r=require("@xstate/react"),t=require("react-spring"),o=require("react-use-gesture"),i=require("focus-trap"),a=require("body-scroll-lock"),c=require("@juggle/resize-observer"),u=require("xstate");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach(function(r){if("default"!==r){var t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:function(){return e[r]}})}}),n.default=e,n}var f=/*#__PURE__*/l(e),d=/*#__PURE__*/s(n);function v(){return v=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},v.apply(this,arguments)}function p(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n.indexOf(r=i[t])>=0||(o[r]=e[r]);return o}var m="undefined"!=typeof window?n.useLayoutEffect:n.useEffect;function y(e,n,r){return n=(n=+n)==n?n:0,r=(r=+r)==r?r:0,(e=+e)==e&&(e=(e=e<=r?e:r)>=n?e:n),e}function g(e){var n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}var h={box:"border-box"};function S(e,r){var t=r.label,o=r.enabled,i=r.resizeSourceRef,a=n.useState(0),u=a[0],s=a[1];n.useDebugValue(t+": "+u);var l=n.useCallback(function(e){s(e[0].borderBoxSize[0].blockSize),i.current="element"},[i]);return m(function(){if(e.current&&o){var n=new c.ResizeObserver(l);return n.observe(e.current,h),function(){n.disconnect()}}},[e,l,o]),o?u:0}function b(e){return void 0===e&&(e=1e3),new Promise(function(n){return setTimeout(n,e)})}var E={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},P={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},R=u.Machine({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:v({},E,P)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:v({},E,P)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:v({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[u.assign({y:function(e,n){return n.payload.y},velocity:function(e,n){return n.payload.velocity},snapSource:function(e,n){var r=n.payload.source;return void 0===r?"custom":r}})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:function(e,n){},onSnapCancel:function(e,n){},onResizeCancel:function(e,n){},onCloseCancel:function(e,n){},onOpenEnd:function(e,n){},onSnapEnd:function(e,n){},onResizeEnd:function(e,n){}},services:{onSnapStart:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenStart:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseStart:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeStart:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onSnapEnd:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenEnd:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseEnd:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeEnd:function(){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},renderVisuallyHidden:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},activate:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},deactivate:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},openSmoothly:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},openImmediately:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},snapSmoothly:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},resizeSmoothly:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}},closeSmoothly:function(e,n){try{return Promise.resolve(b()).then(function(){})}catch(e){return Promise.reject(e)}}},guards:{initiallyClosed:function(e){return"CLOSED"===e.initialState},initiallyOpen:function(e){return"OPEN"===e.initialState}}}),C=["children","sibling","className","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap","expandOnContentDrag","disableExpandList","preventPullUp"],k=["velocity"],x=["onRest","config"],O=t.config.default,D=O.tension,N=O.friction,H=d.default.forwardRef(function(e,c){var u=e.children,s=e.sibling,l=e.className,f=e.footer,h=e.header,b=e.open,E=e.initialState,P=e.lastSnapRef,O=e.initialFocusRef,H=e.onDismiss,L=e.maxHeight,M=e.defaultSnap,A=void 0===M?j:M,T=e.snapPoints,I=void 0===T?z:T,B=e.blocking,q=void 0===B||B,G=e.scrollLocking,F=void 0===G||G,V=e.style,Z=e.onSpringStart,U=e.onSpringCancel,_=e.onSpringEnd,K=e.reserveScrollBarGap,J=void 0===K?q:K,Q=e.expandOnContentDrag,W=void 0!==Q&&Q,X=e.disableExpandList,Y=void 0===X?[]:X,$=e.preventPullUp,ee=void 0!==$&&$,ne=p(e,C),re=function(){var e=n.useState(!1),r=e[0],t=e[1],o=n.useState({}),i=o[0],a=o[1],c=n.useCallback(function(e){return a(function(n){var r;return v({},n,((r={})[e]=!1,r))}),function(){a(function(n){var r;return v({},n,((r={})[e]=!0,r))})}},[]);return n.useEffect(function(){var e=Object.values(i);0!==e.length&&e.every(Boolean)&&t(!0)},[i]),{ready:r,registerReady:c}}(),te=re.ready,oe=re.registerReady,ie=n.useRef(!1),ae=n.useRef(Z),ce=n.useRef(U),ue=n.useRef(_);n.useEffect(function(){ae.current=Z,ce.current=U,ue.current=_},[U,Z,_]);var se,le,fe=t.useSpring(function(){return{y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0}}),de=fe[0],ve=fe[1],pe=n.useRef(null),me=n.useRef(null),ye=n.useRef(null),ge=n.useRef(null),he=n.useRef(null),Se=n.useRef(null),be=n.useRef(0),Ee=n.useRef(),Pe=n.useRef(!1),Re=(se=n.useMemo(function(){return"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null},[]),le=n.useRef(null==se?void 0:se.matches),n.useDebugValue(le.current?"reduce":"no-preference"),n.useEffect(function(){var e=function(e){le.current=e.matches};return null==se||se.addListener(e),function(){return null==se?void 0:se.removeListener(e)}},[se]),le),Ce=function(e){var r=e.targetRef,t=e.enabled,o=e.reserveScrollBarGap,i=n.useRef({activate:function(){throw new TypeError("Tried to activate scroll lock too early")},deactivate:function(){}});return n.useDebugValue(t?"Enabled":"Disabled"),n.useEffect(function(){if(!t)return i.current.deactivate(),void(i.current={activate:function(){},deactivate:function(){}});var e=r.current,n=!1;i.current={activate:function(){n||(n=!0,a.disableBodyScroll(e,{allowTouchMove:function(e){return e.closest("[data-body-scroll-lock-ignore]")},reserveScrollBarGap:o}))},deactivate:function(){n&&(n=!1,a.enableBodyScroll(e))}}},[t,r,o]),i}({targetRef:me,enabled:te&&F,reserveScrollBarGap:J}),ke=function(e){var r=e.targetRef,t=e.enabled,o=n.useRef({activate:function(){throw new TypeError("Tried to activate aria hider too early")},deactivate:function(){}});return n.useDebugValue(t?"Enabled":"Disabled"),n.useEffect(function(){if(!t)return o.current.deactivate(),void(o.current={activate:function(){},deactivate:function(){}});var e=r.current,n=!1,i=[],a=[];o.current={activate:function(){if(!n){n=!0;var r=e.parentNode;document.querySelectorAll("body > *").forEach(function(e){if(e!==r){var n=e.getAttribute("aria-hidden");null!==n&&"false"!==n||(i.push(n),a.push(e),e.setAttribute("aria-hidden","true"))}})}},deactivate:function(){n&&(n=!1,a.forEach(function(e,n){var r=i[n];null===r?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",r)}),i=[],a=[])}}},[r,t]),o}({targetRef:pe,enabled:te&&q}),xe=function(e){var r=e.targetRef,t=e.fallbackRef,o=e.initialFocusRef,a=e.enabled,c=n.useRef({activate:function(){throw new TypeError("Tried to activate focus trap too early")},deactivate:function(){}});return n.useDebugValue(a?"Enabled":"Disabled"),n.useEffect(function(){if(!a)return c.current.deactivate(),void(c.current={activate:function(){},deactivate:function(){}});var e=t.current,n=i.createFocusTrap(r.current,{onActivate:void 0,initialFocus:o?function(){return(null==o?void 0:o.current)||e}:void 0,fallbackFocus:e,escapeDeactivates:!1,clickOutsideDeactivates:!1}),u=!1;c.current={activate:function(){try{return u?Promise.resolve():(u=!0,Promise.resolve(n.activate()).then(function(){return Promise.resolve(new Promise(function(e){return setTimeout(function(){return e(void 0)},0)})).then(function(){})}))}catch(e){return Promise.reject(e)}},deactivate:function(){u&&(u=!1,n.deactivate())}}},[a,t,o,r]),c}({targetRef:pe,fallbackRef:Se,initialFocusRef:O||void 0,enabled:te&&q&&!1!==O}),Oe=function(e){var r=e.getSnapPoints,t=e.heightRef,o=e.lastSnapRef,i=e.ready,a=function(e){var r=e.contentRef,t=e.controlledMaxHeight,o=e.footerEnabled,i=e.footerRef,a=e.headerEnabled,c=e.headerRef,u=e.registerReady,s=e.resizeSourceRef,l=n.useMemo(function(){return u("contentHeight")},[u]),f=function(e,r,t){var o=n.useMemo(function(){return r("maxHeight")},[r]),i=n.useState(function(){return g(e)||"undefined"!=typeof window?window.innerHeight:0}),a=i[0],c=i[1],u=a>0,s=n.useRef(0);return n.useDebugValue(e?"controlled":"auto"),n.useEffect(function(){u&&o()},[u,o]),m(function(){if(e)return c(g(e)),void(t.current="maxheightprop");var n=function(){s.current||(s.current=requestAnimationFrame(function(){c(window.innerHeight),t.current="window",s.current=0}))};return window.addEventListener("resize",n),c(window.innerHeight),t.current="window",o(),function(){window.removeEventListener("resize",n),cancelAnimationFrame(s.current)}},[e,o,t]),a}(t,u,s),d=S(c,{label:"headerHeight",enabled:a,resizeSourceRef:s}),v=S(r,{label:"contentHeight",enabled:!0,resizeSourceRef:s}),p=S(i,{label:"footerHeight",enabled:o,resizeSourceRef:s}),y=Math.min(f-d-p,v)+d+p;n.useDebugValue("minHeight: "+y);var h=v>0;return n.useEffect(function(){h&&l()},[h,l]),{maxHeight:f,minHeight:y,headerHeight:d,footerHeight:p}}({contentRef:e.contentRef,controlledMaxHeight:e.controlledMaxHeight,footerEnabled:e.footerEnabled,footerRef:e.footerRef,headerEnabled:e.headerEnabled,headerRef:e.headerRef,registerReady:e.registerReady,resizeSourceRef:e.resizeSourceRef}),c=a.maxHeight,u=a.minHeight,s=a.headerHeight,l=a.footerHeight,f=function(e,n){var r=[].concat(e).map(g).reduce(function(e,r){return e.add(y(r,0,n)),e},new Set),t=Array.from(r),o=Math.min.apply(Math,t);if(Number.isNaN(o))throw new TypeError("minSnap is NaN");var i=Math.max.apply(Math,t);if(Number.isNaN(i))throw new TypeError("maxSnap is NaN");return{snapPoints:t,minSnap:o,maxSnap:i}}(i?r({height:t.current,footerHeight:l,headerHeight:s,minHeight:u,maxHeight:c}):[0],c),d=f.snapPoints,v=f.minSnap,p=f.maxSnap;return n.useDebugValue("minSnap: "+v+", maxSnap:"+p),{minSnap:v,maxSnap:p,findSnap:function(e){var n=g("function"==typeof e?e({footerHeight:l,headerHeight:s,height:t.current,minHeight:u,maxHeight:c,snapPoints:d,lastSnap:o.current}):e);return d.reduce(function(e,r){return Math.abs(r-n)<Math.abs(e-n)?r:e},v)},maxHeight:c}}({contentRef:ye,controlledMaxHeight:L,footerEnabled:!!f,footerRef:he,getSnapPoints:I,headerEnabled:!1!==h,headerRef:ge,heightRef:be,lastSnapRef:P,ready:te,registerReady:oe,resizeSourceRef:Ee}),De=Oe.minSnap,Ne=Oe.maxSnap,He=Oe.maxHeight,we=Oe.findSnap,je=n.useRef(He),ze=n.useRef(De),Le=n.useRef(Ne),Me=n.useRef(we),Ae=n.useRef(0);m(function(){je.current=He,Le.current=Ne,ze.current=De,Me.current=we,Ae.current=we(A)},[we,A,He,Ne,De]);var Te=n.useCallback(function(e){var n=e.onRest,r=e.config,t=(r=void 0===r?{}:r).velocity,o=void 0===t?1:t,i=p(r,k),a=p(e,x);return new Promise(function(e){return ve(v({},a,{config:v({velocity:o},i,{mass:1,tension:D,friction:Math.max(N,N+(N-N*o))}),onRest:function(){var r=[].slice.call(arguments);e.apply(void 0,r),null==n||n.apply(void 0,r)}}))})},[ve]),Ie=r.useMachine(R,{devTools:!1,actions:{onOpenCancel:n.useCallback(function(){return null==ce.current?void 0:ce.current({type:"OPEN"})},[]),onSnapCancel:n.useCallback(function(e){return null==ce.current?void 0:ce.current({type:"SNAP",source:e.snapSource})},[]),onCloseCancel:n.useCallback(function(){return null==ce.current?void 0:ce.current({type:"CLOSE"})},[]),onResizeCancel:n.useCallback(function(){return null==ce.current?void 0:ce.current({type:"RESIZE",source:Ee.current})},[]),onOpenEnd:n.useCallback(function(){return null==ue.current?void 0:ue.current({type:"OPEN"})},[]),onSnapEnd:n.useCallback(function(e,n){return null==ue.current?void 0:ue.current({type:"SNAP",source:e.snapSource})},[]),onResizeEnd:n.useCallback(function(){return null==ue.current?void 0:ue.current({type:"RESIZE",source:Ee.current})},[])},context:{initialState:E},services:{onSnapStart:n.useCallback(function(e,n){try{return Promise.resolve(null==ae.current?void 0:ae.current({type:"SNAP",source:n.payload.source||"custom"}))}catch(e){return Promise.reject(e)}},[]),onOpenStart:n.useCallback(function(){try{return Promise.resolve(null==ae.current?void 0:ae.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseStart:n.useCallback(function(){try{return Promise.resolve(null==ae.current?void 0:ae.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeStart:n.useCallback(function(){try{return Promise.resolve(null==ae.current?void 0:ae.current({type:"RESIZE",source:Ee.current}))}catch(e){return Promise.reject(e)}},[]),onSnapEnd:n.useCallback(function(e,n){try{return Promise.resolve(null==ue.current?void 0:ue.current({type:"SNAP",source:e.snapSource}))}catch(e){return Promise.reject(e)}},[]),onOpenEnd:n.useCallback(function(){try{return Promise.resolve(null==ue.current?void 0:ue.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseEnd:n.useCallback(function(){try{return Promise.resolve(null==ue.current?void 0:ue.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeEnd:n.useCallback(function(){try{return Promise.resolve(null==ue.current?void 0:ue.current({type:"RESIZE",source:Ee.current}))}catch(e){return Promise.reject(e)}},[]),renderVisuallyHidden:n.useCallback(function(e,n){try{return Promise.resolve(Te({y:Ae.current,ready:0,maxHeight:je.current,maxSnap:Le.current,minSnap:Ae.current,immediate:!0})).then(function(){})}catch(e){return Promise.reject(e)}},[Te]),activate:n.useCallback(function(e,n){try{return ie.current=!0,Promise.resolve(Promise.all([Ce.current.activate(),xe.current.activate(),ke.current.activate()])).then(function(){})}catch(e){return Promise.reject(e)}},[ke,xe,Ce]),deactivate:n.useCallback(function(){try{return Ce.current.deactivate(),xe.current.deactivate(),ke.current.deactivate(),ie.current=!1,Promise.resolve()}catch(e){return Promise.reject(e)}},[ke,xe,Ce]),openImmediately:n.useCallback(function(){try{return be.current=Ae.current,Promise.resolve(Te({y:Ae.current,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:Ae.current,immediate:!0})).then(function(){})}catch(e){return Promise.reject(e)}},[Te]),openSmoothly:n.useCallback(function(){try{return Promise.resolve(Te({y:0,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:Ae.current,immediate:!0})).then(function(){return be.current=Ae.current,Promise.resolve(Te({y:Ae.current,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:Ae.current,immediate:Re.current})).then(function(){})})}catch(e){return Promise.reject(e)}},[Te,Re]),snapSmoothly:n.useCallback(function(e,n){try{var r=Me.current(e.y);return be.current=r,P.current=r,Promise.resolve(Te({y:r,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:ze.current,immediate:Re.current,config:{velocity:e.velocity}})).then(function(){})}catch(e){return Promise.reject(e)}},[Te,P,Re]),resizeSmoothly:n.useCallback(function(){try{var e=Me.current(be.current);return be.current=e,P.current=e,Promise.resolve(Te({y:e,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:ze.current,immediate:"element"!==Ee.current||Re.current})).then(function(){})}catch(e){return Promise.reject(e)}},[Te,P,Re]),closeSmoothly:n.useCallback(function(e,n){try{return Te({minSnap:be.current,immediate:!0}),be.current=0,Promise.resolve(Te({y:0,maxHeight:je.current,maxSnap:Le.current,immediate:Re.current})).then(function(){return Promise.resolve(Te({ready:0,immediate:!0})).then(function(){})})}catch(e){return Promise.reject(e)}},[Te,Re])}}),Be=Ie[0],qe=Ie[1];n.useEffect(function(){qe(b?"OPEN":"CLOSE")},[b,qe,te]),m(function(){(He||Ne||De)&&qe("RESIZE")},[He,Ne,De,qe]),n.useEffect(function(){return function(){Ce.current.deactivate(),xe.current.deactivate(),ke.current.deactivate()}},[ke,xe,Ce]),n.useImperativeHandle(c,function(){return{snapTo:function(e,n){var r=void 0===n?{}:n,t=r.velocity,o=void 0===t?1:t,i=r.source,a=void 0===i?"custom":i;qe("SNAP",{payload:{y:Me.current(e),velocity:o,source:a}})},get height(){return be.current}}},[qe]),n.useEffect(function(){var e=me.current,n=function(n){var r=Y.map(function(e){return pe.current.querySelector(e)}).filter(Boolean);if(r.length&&r.some(function(e){return e.contains(n.target)}))return!0;Pe.current&&e.scrollTop<=0&&n.preventDefault()},r=0,t=function(n){e.scrollTop<0&&(r=e.scrollTop)},o=function(n){e.scrollTop<0&&e.scrollTop<r&&n.preventDefault()};return W&&(e.addEventListener("scroll",n),e.addEventListener("touchmove",n),e.addEventListener("touchmove",o),e.addEventListener("touchstart",t,{passive:!0})),function(){e.removeEventListener("scroll",n),e.removeEventListener("touchmove",n),e.removeEventListener("touchmove",o),e.removeEventListener("touchstart",t)}},[W,me,Y]);var Ge=o.useDrag(function(e){var n=e.args,r=(n=void 0===n?[]:n)[0],t=(r=void 0===r?{}:r).closeOnTap,i=void 0!==t&&t,a=r.isContentDragging,c=void 0!==a&&a,u=e.cancel,s=e.direction[1],l=e.down,f=e.first,d=e.last,v=e.memo,p=void 0===v?de.y.get():v,m=e.movement[1],y=e.tap,g=e.velocity,h=e.event,S=-1*m,b=me.current.scrollHeight>me.current.clientHeight;if(pe.current&&Y.length){var E=Y.map(function(e){return pe.current.querySelector(e)}).filter(Boolean);if(E.length&&E.some(function(e){return e.contains(h.target)}))return u(),p}if(!ie.current)return u(),p;if(H&&i&&y)return u(),setTimeout(function(){return H()},10),p;if(y)return p;var P=p+S,R=S*g,C=Math.max(ze.current,Math.min(Le.current,P+2*R));if(!l&&H&&s>0&&P+R<ze.current/2&&(!b||me.current.scrollTop<=0))return u(),H(),p;var k=l?H||ze.current!==Le.current?o.rubberbandIfOutOfBounds(P,H?0:ze.current,Le.current,.55):P<ze.current?o.rubberbandIfOutOfBounds(P,ze.current,2*Le.current,.55):o.rubberbandIfOutOfBounds(P,ze.current/2,Le.current,.55):C;if(ee){if(0===s)return p;if(s<0&&k>Ne&&m<=0||s>0&&k>Ne&&m<=0)return p}return W&&c?(k>=Le.current&&(k=Le.current),p===Le.current&&me.current.scrollTop>0&&(k=Le.current),Pe.current=k<Le.current):Pe.current=!1,f&&qe("DRAG"),d?(qe("SNAP",{payload:{y:k,velocity:g>.05?g:1,source:"dragging"}}),p):(ve({y:k,ready:1,maxHeight:je.current,maxSnap:Le.current,minSnap:ze.current,immediate:!0,config:{velocity:g}}),p)},{filterTaps:!0});if(Number.isNaN(Le.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(ze.current))throw new TypeError("minSnapRef is NaN!!");var Fe=function(e){var n,r=e.spring,o=t.to([r.y,r.maxHeight],function(e,n){return Math.round(y(n-e,0,16))+"px"}),i=t.to([r.y,r.minSnap,r.maxSnap],function(e,n,r){return Math.round(y(e,n,r))+"px"}),a=Math.round(y(r.y.get(),r.minSnap.get(),r.maxSnap.get()))+"px",c=t.to([r.y,r.minSnap,r.maxSnap],function(e,n,r){return e<n?Math.round(n-e)+"px":e>r?Math.round(r-e)+"px":"0px"}),u=t.to([r.y,r.maxSnap],function(e,n){return e>=n?Math.ceil(e-n):0}),s=t.to([r.y,r.minSnap],function(e,n){if(!n)return 0;var r=Math.max(n/2-45,0);return y((e-r)*(1/(Math.min(n/2+45,n)-r)+0),0,1)}),l=t.to([r.y,r.minSnap],function(e,n){return n?y(e/n,0,1):0});return(n={})["--rsbs-content-opacity"]=s,n["--rsbs-backdrop-opacity"]=l,n["--rsbs-antigap-scale-y"]=u,n["--rsbs-overlay-translate-y"]=c,n["--rsbs-overlay-rounded"]=o,n["--rsbs-overlay-h"]=i,n["--fag-height"]=a,n}({spring:de});/*#__PURE__*/return d.default.createElement(t.animated.div,v({},ne,{"data-rsbs-root":!0,"data-rsbs-state":w.find(Be.matches),"data-rsbs-is-blocking":q,"data-rsbs-is-dismissable":!!H,"data-rsbs-has-header":!!h,"data-rsbs-has-footer":!!f,className:l,ref:pe,style:v({},Fe,V,{opacity:de.ready})}),s,q&&/*#__PURE__*/d.default.createElement("div",v({key:"backdrop","data-rsbs-backdrop":!0},Ge({closeOnTap:!0}))),/*#__PURE__*/d.default.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:Se,onKeyDown:function(e){"Escape"===e.key&&(e.stopPropagation(),H&&H())}},!1!==h&&/*#__PURE__*/d.default.createElement("div",v({key:"header","data-rsbs-header":!0,ref:ge},Ge()),h),/*#__PURE__*/d.default.createElement("div",v({key:"scroll","data-rsbs-scroll":!0,ref:me},W?Ge({isContentDragging:!0}):{}),/*#__PURE__*/d.default.createElement("div",{"data-rsbs-content":!0,ref:ye},u)),f&&/*#__PURE__*/d.default.createElement("div",v({key:"footer",ref:he,"data-rsbs-footer":!0},Ge()),f)))}),w=["closed","opening","open","closing","dragging","snapping","resizing"];function j(e){var n=e.lastSnap;return null!=n?n:Math.min.apply(Math,e.snapPoints)}function z(e){return e.minHeight}var L=["onSpringStart","onSpringEnd","skipInitialTransition"],M=n.forwardRef(function(e,r){var t=e.onSpringStart,o=e.onSpringEnd,i=e.skipInitialTransition,a=p(e,L),c=n.useRef(),u=n.useRef(null),s=n.useRef(i&&a.open?"OPEN":"CLOSED");m(function(){if(a.open)return cancelAnimationFrame(c.current),function(){s.current="CLOSED"}},[a.open]);var l=n.useCallback(function(e){return Promise.resolve(null==t?void 0:t(e)).then(function(){"OPEN"===e.type&&cancelAnimationFrame(c.current)})},[t]),y=n.useCallback(function(e){return Promise.resolve(null==o?void 0:o(e)).then(function(){})},[o]);/*#__PURE__*/return d.default.createElement(f.Root,{"data-rsbs-portal":!0},/*#__PURE__*/d.default.createElement(H,v({},a,{lastSnapRef:u,ref:r,initialState:s.current,onSpringStart:l,onSpringEnd:y})))});exports.BottomSheet=M;
//# sourceMappingURL=index.js.map
