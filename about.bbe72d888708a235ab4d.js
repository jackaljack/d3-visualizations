!function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)r.d(e,o,function(t){return n[t]}.bind(null,o));return e},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=54)}({4:function(n,t,r){"use strict";r.r(t);var e=function(n,t){return n<t?-1:n>t?1:n>=t?0:NaN},o=function(n){var t;return 1===n.length&&(t=n,n=function(n,r){return e(t(n),r)}),{left:function(t,r,e,o){for(null==e&&(e=0),null==o&&(o=t.length);e<o;){var u=e+o>>>1;n(t[u],r)<0?e=u+1:o=u}return e},right:function(t,r,e,o){for(null==e&&(e=0),null==o&&(o=t.length);e<o;){var u=e+o>>>1;n(t[u],r)>0?o=u:e=u+1}return e}}};var u=o(e),f=u.right,i=u.left,l=f;function c(n){return 0|n.length}function a(n){return!(n>0)}function h(n){return"object"!=typeof n||"length"in n?n:Array.from(n)}function s(...n){const t="function"==typeof n[n.length-1]&&function(n){return t=>n(...t)}(n.pop()),r=(n=n.map(h)).map(c),e=n.length-1,o=new Array(e+1).fill(0),u=[];if(e<0||r.some(a))return u;for(;;){u.push(o.map((t,r)=>n[r][t]));let f=e;for(;++o[f]===r[f];){if(0===f)return t?u.map(t):u;o[f--]=0}}}var d=function(n,t){return t<n?-1:t>n?1:t>=n?0:NaN};function v(n,t){let r,e=0,o=0,u=0;if(void 0===t)for(let t of n)null!=t&&(t=+t)>=t&&(u+=(r=t-o)*(t-(o+=r/++e)));else{let f=-1;for(let i of n)null!=(i=t(i,++f,n))&&(i=+i)>=i&&(u+=(r=i-o)*(i-(o+=r/++e)))}if(e>1)return u/(e-1)}function p(n,t){const r=v(n,t);return r?Math.sqrt(r):r}var M=function(n,t){let r,e;if(void 0===t)for(let t of n)null!=t&&t>=t&&(void 0===r?r=e=t:(r>t&&(r=t),e<t&&(e=t)));else{let o=-1;for(let u of n)null!=(u=t(u,++o,n))&&u>=u&&(void 0===r?r=e=u:(r>u&&(r=u),e<u&&(e=u)))}return[r,e]},g=function(n){return n};function y(n,t,...r){return function n(e,o){if(o>=r.length)return t(e);const u=function(n,t){const r=new Map;let e=-1;for(const o of n){const u=t(o,++e,n),f=r.get(u);f?f.push(o):r.set(u,[o])}return r}(e,r[o]);return new Map(Array.from(u,([t,r])=>[t,n(r,o+1)]))}(n,0)}function m(n,...t){return y(n,g,...t)}var A=Array.prototype,b=A.slice,w=A.map,x=function(n){return function(){return n}},j=function(n,t,r){n=+n,t=+t,r=(o=arguments.length)<2?(t=n,n=0,1):o<3?1:+r;for(var e=-1,o=0|Math.max(0,Math.ceil((t-n)/r)),u=new Array(o);++e<o;)u[e]=n+e*r;return u},N=Math.sqrt(50),O=Math.sqrt(10),S=Math.sqrt(2),_=function(n,t,r){var e,o,u,f,i=-1;if(r=+r,(n=+n)===(t=+t)&&r>0)return[n];if((e=t<n)&&(o=n,n=t,t=o),0===(f=q(n,t,r))||!isFinite(f))return[];if(f>0)for(n=Math.ceil(n/f),t=Math.floor(t/f),u=new Array(o=Math.ceil(t-n+1));++i<o;)u[i]=(n+i)*f;else for(n=Math.floor(n*f),t=Math.ceil(t*f),u=new Array(o=Math.ceil(n-t+1));++i<o;)u[i]=(n-i)/f;return e&&u.reverse(),u};function q(n,t,r){var e=(t-n)/Math.max(0,r),o=Math.floor(Math.log(e)/Math.LN10),u=e/Math.pow(10,o);return o>=0?(u>=N?10:u>=O?5:u>=S?2:1)*Math.pow(10,o):-Math.pow(10,-o)/(u>=N?10:u>=O?5:u>=S?2:1)}function P(n,t,r){var e=Math.abs(t-n)/Math.max(0,r),o=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),u=e/o;return u>=N?o*=10:u>=O?o*=5:u>=S&&(o*=2),t<n?-o:o}var k=function(n){return Math.ceil(Math.log(n.length)/Math.LN2)+1},L=function(){var n=g,t=M,r=k;function e(e){Array.isArray(e)||(e=Array.from(e));var o,u,f=e.length,i=new Array(f);for(o=0;o<f;++o)i[o]=n(e[o],o,e);var c=t(i),a=c[0],h=c[1],s=r(i,a,h);Array.isArray(s)||(s=P(a,h,s),s=j(Math.ceil(a/s)*s,h,s));for(var d=s.length;s[0]<=a;)s.shift(),--d;for(;s[d-1]>h;)s.pop(),--d;var v,p=new Array(d+1);for(o=0;o<=d;++o)(v=p[o]=[]).x0=o>0?s[o-1]:a,v.x1=o<d?s[o]:h;for(o=0;o<f;++o)a<=(u=i[o])&&u<=h&&p[l(s,u,0,d)].push(e[o]);return p}return e.value=function(t){return arguments.length?(n="function"==typeof t?t:x(t),e):n},e.domain=function(n){return arguments.length?(t="function"==typeof n?n:x([n[0],n[1]]),e):t},e.thresholds=function(n){return arguments.length?(r="function"==typeof n?n:Array.isArray(n)?x(b.call(n)):x(n),e):r},e},F=function(n){return null===n?NaN:+n};function T(n,t,r=F){if(e=n.length){if((t=+t)<=0||e<2)return+r(n[0],0,n);if(t>=1)return+r(n[e-1],e-1,n);var e,o=(e-1)*t,u=Math.floor(o),f=+r(n[u],u,n);return f+(+r(n[u+1],u+1,n)-f)*(o-u)}}var z=function(n,t,r){return n=w.call(n,F).sort(e),Math.ceil((r-t)/(2*(T(n,.75)-T(n,.25))*Math.pow(n.length,-1/3)))},D=function(n,t,r){return Math.ceil((r-t)/(3.5*p(n)*Math.pow(n.length,-1/3)))};function I(n,t){let r;if(void 0===t)for(let t of n)null!=t&&t>=t&&(void 0===r||r<t)&&(r=t);else{let e=-1;for(let o of n)null!=(o=t(o,++e,n))&&o>=o&&(void 0===r||r<o)&&(r=o)}return r}function R(n,t){let r=0,e=0;if(void 0===t)for(let t of n)null!=t&&(t=+t)>=t&&(++r,e+=t);else{let o=-1;for(let u of n)null!=(u=t(u,++o,n))&&(u=+u)>=u&&(++r,e+=u)}if(r)return e/r}function B(n,t,r=0,o=n.length-1,u=e){for(;o>r;){if(o-r>600){const e=o-r+1,f=t-r+1,i=Math.log(e),l=.5*Math.exp(2*i/3),c=.5*Math.sqrt(i*l*(e-l)/e)*(f-e/2<0?-1:1);B(n,t,Math.max(r,Math.floor(t-f*l/e+c)),Math.min(o,Math.floor(t+(e-f)*l/e+c)),u)}const e=n[t];let f=r,i=o;for(C(n,r,t),u(n[o],e)>0&&C(n,r,o);f<i;){for(C(n,f,i),++f,--i;u(n[f],e)<0;)++f;for(;u(n[i],e)>0;)--i}0===u(n[r],e)?C(n,r,i):C(n,++i,o),i<=t&&(r=i+1),t<=i&&(o=i-1)}return n}function C(n,t,r){const e=n[t];n[t]=n[r],n[r]=e}var E=function(n,t){if(!(n=Float64Array.from(function*(n,t){if(void 0===t)for(let t of n)null!=t&&(t=+t)>=t&&(yield t);else{let r=-1;for(let e of n)null!=(e=t(e,++r,n))&&(e=+e)>=e&&(yield e)}}(n,t))).length)return;const r=n.length,e=r>>1;return B(n,e-1,0),0==(1&r)&&B(n,e,e),T(n,.5)};function G(n){return Array.from(function*(n){for(const t of n)yield*t}(n))}function H(n,t){let r;if(void 0===t)for(let t of n)null!=t&&t>=t&&(void 0===r||r>t)&&(r=t);else{let e=-1;for(let o of n)null!=(o=t(o,++e,n))&&o>=o&&(void 0===r||r>o)&&(r=o)}return r}function J(n,t=function(n,t){return[n,t]}){const r=[];let e,o=!1;for(const u of n)o&&r.push(t(e,u)),e=u,o=!0;return r}var K=function(n,t){for(var r=t.length,e=new Array(r);r--;)e[r]=n[t[r]];return e};function Q(n,t=e){let r,o,u=-1;for(const e of n)++u,(void 0===o?0===t(e,e):t(e,r)<0)&&(r=e,o=u);return o}function U(n,t=0,r=n.length){for(var e,o,u=r-(t=+t);u;)o=Math.random()*u--|0,e=n[u+t],n[u+t]=n[o+t],n[o+t]=e;return n}function V(n,t){let r=0;if(void 0===t)for(let t of n)(t=+t)&&(r+=t);else{let e=-1;for(let o of n)(o=+t(o,++e,n))&&(r+=o)}return r}var W=function(n){if(!(o=n.length))return[];for(var t=-1,r=H(n,X),e=new Array(r);++t<r;)for(var o,u=-1,f=e[t]=new Array(o);++u<o;)f[u]=n[u][t];return e};function X(n){return n.length}var Y=function(){return W(arguments)};r.d(t,"bisect",function(){return l}),r.d(t,"bisectRight",function(){return f}),r.d(t,"bisectLeft",function(){return i}),r.d(t,"ascending",function(){return e}),r.d(t,"bisector",function(){return o}),r.d(t,"cross",function(){return s}),r.d(t,"descending",function(){return d}),r.d(t,"deviation",function(){return p}),r.d(t,"extent",function(){return M}),r.d(t,"group",function(){return m}),r.d(t,"histogram",function(){return L}),r.d(t,"thresholdFreedmanDiaconis",function(){return z}),r.d(t,"thresholdScott",function(){return D}),r.d(t,"thresholdSturges",function(){return k}),r.d(t,"max",function(){return I}),r.d(t,"mean",function(){return R}),r.d(t,"median",function(){return E}),r.d(t,"merge",function(){return G}),r.d(t,"min",function(){return H}),r.d(t,"pairs",function(){return J}),r.d(t,"permute",function(){return K}),r.d(t,"quantile",function(){return T}),r.d(t,"quickselect",function(){return B}),r.d(t,"range",function(){return j}),r.d(t,"rollup",function(){return y}),r.d(t,"scan",function(){return Q}),r.d(t,"shuffle",function(){return U}),r.d(t,"sum",function(){return V}),r.d(t,"ticks",function(){return _}),r.d(t,"tickIncrement",function(){return q}),r.d(t,"tickStep",function(){return P}),r.d(t,"transpose",function(){return W}),r.d(t,"variance",function(){return v}),r.d(t,"zip",function(){return Y})},54:function(n,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=r(4);console.warn("Testing...",e.extent([1,2,3,4,5]))}});