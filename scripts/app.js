!function(e){"use strict";function o(e,o,r){if(e>=r)return 0;if(r>=o)return 1;var n=(r-e)/(o-e);return n*n*(3-2*n)}var r=e.querySelector("#app");r.displayInstalledToast=function(){e.querySelector("#caching-complete").show()},r.playVideo=function(){e.querySelector("#promo-video-dialog").open(),e.querySelector("#promo-video").play()},r.closeVideoCard=function(){e.querySelector("#promo-video-dialog").close(),e.querySelector("#promo-video").pause(),e.querySelector("#promo-video").seekTo(0)},r.addEventListener("dom-change",function(){console.log("Hello, folks! Welcome to GDG DevFest Paris 2016 website.")}),window.addEventListener("WebComponentsReady",function(){}),e.addEventListener("HTMLImportsLoaded",function(){window.I18nMsg.lang=navigator.languages[0].substring(0,2)||"en",window.I18nMsg.url="locales"}),r.getMarkdownUrl=function(e){return"../../posts/"+window.I18nMsg.lang+"/"+e},r.onMenuSelect=function(){var o=e.querySelector("#paperDrawerPanel");o.narrow&&o.closeDrawer()},r.findByPropertyValue=function(e,o,r){for(var n=0;n<e.length;n++)if(e[n][o]==r)return e[n]},r.scrollToTop=function(){for(var o=e.querySelectorAll("#hero"),n=o.length-1;n>=0;n--)r.smoothScroll(o[n],1e3)},r.generateClass=function(e){return e.replace(/\s+/g,"-").toLowerCase()},r.smoothScroll=function(r,n,t){var l=n||1,a=e.querySelector("paper-drawer-panel [main]"),i=window.performance.now(),c=i+l,u=a.scrollTop,s=r.getBoundingClientRect().top;if(0===s)return void(t&&t());var d=function(e){c>e&&requestAnimationFrame(d);var r=o(i,c,e),n=Math.round(u+s*r);a.scrollTop=n,1===r&&t&&t()};d(i)}}(document);