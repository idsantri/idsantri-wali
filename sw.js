if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),f={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>f[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bft_Q6SC.js",revision:null},{url:"assets/index-BNf_b5Bs.css",revision:null},{url:"index.html",revision:"ceb2461cc5aa2e09342e397ed1cc0dd5"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"a28b8319724e72282ad0bf48e22f103b"},{url:"icons/icon-192x192.png",revision:"df22659854d75a8c688c6eacd61f8012"},{url:"icons/icon-512x512.png",revision:"359695f5f891be08215c0a604ec04026"},{url:"manifest.webmanifest",revision:"53514643776906bf6bf77f336d9fe81e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
