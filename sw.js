if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),f={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-DAsfmC-k.css",revision:null},{url:"assets/index-NZdNTewc.js",revision:null},{url:"index.html",revision:"e98827884020b3229f8268f292979196"},{url:"registerSW.js",revision:"8ab02b13348cc2b28fc068648a3f4dac"},{url:"icon-152x152.png",revision:"c41f188ffb4519533ded4735afe135b9"},{url:"icon-72x72.png",revision:"89f3029fc683cfadaf9fcd7d59d9c67b"},{url:"manifest.webmanifest",revision:"1a4b4901629b6371b9907a44e6c87840"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
