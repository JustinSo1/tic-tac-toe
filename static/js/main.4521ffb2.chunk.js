(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{45:function(e,t,n){e.exports=n(54)},54:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(4),o=n.n(c),l=n(32),u=n(6),i=n(74),f=Math.floor(5*Math.random())+2,s=Math.floor(5*Math.random())+2,m="not_started",h="in_progress",b="over",d={1:1,0:0,2:-1},p={easy:"easy",medium:"medium",difficult:"difficult"},v={color:"black",p:1,borderColor:"primary",width:100,height:100,fontSize:100,textAlign:"center"},g=function(e){var t=e.value,n=e.onClick,r=e.borderTop,c=e.borderBottom,o=e.borderRight,l=e.borderLeft;return a.a.createElement(i.a,Object.assign({},v,{onClick:n,borderTop:r,borderBottom:c,borderLeft:l,borderRight:o}),t)},O=function(e){var t=e.squares,n=e.onClick;return a.a.createElement("div",null,t.map((function(e,r){return a.a.createElement(i.a,{display:"flex",justifyContent:"center",key:r},e.map((function(c,o){var l,u,i=null!==c;return 0===r?(l=1,0!==o&&o===e.length-1||(u=1)):r===t.length-1?0!==o&&o===e.length-1||(u=1):(u=1,l=1,o===e.length-1&&(u=0)),a.a.createElement(g,{value:i&&(1===c?"X":"O"),borderLeft:void 0,borderBottom:l,borderTop:void 0,borderRight:u,key:o,onClick:function(){return n(r,o)}})})))})))};function j(e){for(var t=e[0].length,n=e.length,r=[],a=[],c=0;c<e.length;++c){a=[];for(var o=0;o<e[0].length;++o)a.push(e[c][o]);r.push(a)}for(var l=0;l<r.length;++l)if(r[l].length===t&&r[l].every((function(e,t,n){return e&&e===n[0]})))return r[l][0];r=[];for(var u=0;u<e[0].length;++u){a=[];for(var i=0;i<e.length;++i)a.push(e[i][u]);r.push(a)}for(var f=0;f<r.length;++f)if(r[f].length===n&&r[f].every((function(e,t,n){return e&&e===n[0]})))return r[f][0];var s=e.length,m=e[0].length,h=Math.min(s,m);r=[];for(var b=1-s;b<m;b++){a=[];for(var d=0;d<s;d++)b+d>=0&&b+d<m&&a.push(e[d][b+d]);r.push(a)}for(var p=0;p<r.length;++p)if(r[p].length===h&&r[p].every((function(e,t,n){return e&&e===n[0]})))return r[p][0];s=e.length,m=e[0].length,r=[];for(var v=0;v<s+m-1;++v){var g=v<m?0:v-m+1;a=[];for(var O=v-(v<s?0:v-s+1);O>=g;--O)a.push(e[O][v-O]);r.push(a)}for(var j=0;j<r.length;++j)if(r[j].length===h&&r[j].every((function(e,t,n){return e&&e===n[0]})))return r[j][0];return 0===E(e).length?0:null}var E=function(e){var t=[];return e.forEach((function(e,n){e.forEach((function(e,r){null===e&&(t=[].concat(Object(l.a)(t),[[n,r]]))}))})),t},y=function(e){return 0===E(e).length},k=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e},C=function(e){return 1===e?2:1},w=function(e){return e.map((function(e){return e.slice()}))},S=function(e,t,n){var r=Object(u.a)(t,2),a=r[0],c=r[1];null===e[a][c]&&(e[a][c]=n)},M=n(76),x=n(73),B=n(75),T=n(72),A=n(57),P=n(37),R=function e(t,n){var r,a=d[n],c=-1,o=null,l=j(t);if(null!==l)return[d[l],0];var u,i=Object(P.a)(E(t));try{for(i.s();!(u=i.n()).done;){var f=u.value,s=w(t);S(s,f,n),(r=a*e(s,C(n))[0])>=c&&(c=r,o=f)}}catch(m){i.e(m)}finally{i.f()}return[a*c,o]},I=Array(s).fill(null).map((function(){return new Array(f).fill(null)})),L=function(){var e=Object(r.useState)([I]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)({human:null,computer:null}),i=Object(u.a)(o,2),d=i[0],v=i[1],g=Object(r.useState)(0),S=Object(u.a)(g,2),x=S[0],P=S[1],L=Object(r.useState)(null),G=Object(u.a)(L,2),J=G[0],N=G[1],_=Object(r.useState)(m),z=Object(u.a)(_,2),F=z[0],D=z[1],H=Object(r.useState)(null),K=Object(u.a)(H,2),Q=K[0],U=K[1],V=Object(r.useState)(!1),W=Object(u.a)(V,2),Y=W[0],Z=W[1],$=Object(r.useState)(p.medium),ee=Object(u.a)($,2),te=ee[0],ne=ee[1],re=q(),ae=function(e){v({human:e,computer:C(e)}),D(h),N(1)},ce=Object(r.useCallback)((function(e,t,r){if(r&&F===h){var a=n.slice(0,x+1),o=a[x].map((function(e){return e.slice()}));o[e][t]=r,c([].concat(Object(l.a)(a),[o])),P(a.length)}}),[F,x,n]),oe=Object(r.useCallback)((function(){var e=function(){for(var e=k(0,s-1),t=k(0,f-1);n[x][e][t];)e=k(0,s-1),t=k(0,f-1);return[e,t]},t=w(n[x]),r=y(n[x]),a=0,c=0,o=null;switch(te){case p.easy:var l=e(),i=Object(u.a)(l,2);a=i[0],c=i[1];break;case p.medium:if(!y(n[x])&&Math.random()<.5)if(s<=3&&f<=3)o=R(t,d.computer)[1];else{var m=e(),h=Object(u.a)(m,2);a=h[0],c=h[1]}else{var b=e(),v=Object(u.a)(b,2);a=v[0],c=v[1]}break;case p.difficult:default:o=s<=3&&f<=3?r?[k(0,s-1),k(0,f-1)]:R(t,d.computer)[1]:E(n[x]).length<=5?R(t,d.computer)[1]:e()}if(o){var g=o,O=Object(u.a)(g,2);a=O[0],c=O[1]}n[x][a][c]||(ce(a,c,d.computer),N(d.human))}),[ce,n,d,x,te]);switch(Object(r.useEffect)((function(){var e;return null!==J&&J===d.computer&&F!==b&&(e=setTimeout((function(){oe()}),500)),function(){return e&&clearTimeout(e)}}),[J,oe,d.computer,F]),Object(r.useEffect)((function(){var e=j(n[x]);null!==e&&F!==b&&function(e){var t;switch(e){case 1:t="Player X wins!";break;case 2:t="Player O wins!";break;case 0:default:t="It's a draw"}D(b),U(t)}(e)}),[F,n,J,x]),F){case m:default:return a.a.createElement("div",null,a.a.createElement("p",null,"Choose your Player"),a.a.createElement(M.a,Object.assign({},X,{onClick:function(){return ae(1)}}),"X"),a.a.createElement("div",null,a.a.createElement("p",null,"or")),a.a.createElement(M.a,Object.assign({},X,{onClick:function(){return ae(2)}}),"O"),a.a.createElement("p",null,"Choose difficulty"),a.a.createElement("select",{onChange:function(e){ne(e.target.value)},value:te},Object.keys(p).map((function(e){var t=p[e];return a.a.createElement("option",{key:t,value:t},e)}))));case h:return a.a.createElement(a.a.Fragment,null,a.a.createElement(O,{squares:n[x],onClick:function(e,t){n[x][e][t]||J!==d.human||(ce(e,t,d.human),N(d.computer))}}),a.a.createElement("div",null,n.map((function(e,t){var n=t?"Go to move #".concat(t):"Go to start";return a.a.createElement("li",{key:t},a.a.createElement(M.a,Object.assign({},X,{onClick:function(){P(t)}}),n))}))));case b:return a.a.createElement("div",null,a.a.createElement(M.a,Object.assign({},X,{onClick:function(){Z(!0)}}),"Result"),a.a.createElement(B.a,{"aria-labelledby":"title","aria-describedby":"description",className:re.modal,open:Y,onClose:function(){Z(!1)},closeAfterTransition:!0,BackdropComponent:T.a,BackdropProps:{timeout:500}},a.a.createElement(A.a,{in:Y},a.a.createElement("div",{className:re.paper},a.a.createElement("h2",{id:"title"},Q),a.a.createElement("p",{id:"description"},"Congratulations on finishing the game!")))),a.a.createElement(M.a,Object.assign({},X,{onClick:function(){D(m),c([I]),P(0)}}),"Start over"))}},X={variant:"contained",color:"primary"},q=Object(x.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),G=function(){return a.a.createElement(L,null)};o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(G,null)),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.4521ffb2.chunk.js.map