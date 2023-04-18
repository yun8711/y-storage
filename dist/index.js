var YStorage=function(){"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function t(t){for(var a=1;a<arguments.length;a++){var i=null!=arguments[a]?arguments[a]:{};a%2?e(Object(i),!0).forEach((function(e){r(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function r(e,t,r){t=i(t);if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function a(e,t){if(typeof e!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==undefined){var a=r.call(e,t||"default");if(typeof a!=="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function i(e){var t=a(e,"string");return typeof t==="symbol"?t:String(t)}function s(e){var t;var r=(t=window)===null||t===void 0?void 0:t[(e||"local")+"Storage"];if(r===undefined){throw new Error("[YStorage] The current environment does not support ".concat(e,"Storage"))}return r}class o{constructor(e){var t,a;r(this,"prefix","YStorage_");r(this,"namespace",void 0);r(this,"target",void 0);r(this,"storage",void 0);r(this,"callback",void 0);this.target=(t=e.target)!==null&&t!==void 0?t:"local";this.storage=s(this.target);this.namespace=this.prefix+e.namespace;e.override=(a=e.override)!==null&&a!==void 0?a:false;if(e.callback){this.callback=e.callback}this._initSpace(e)}_initSpace(e){try{if(!this.storage.getItem(e.namespace)||e.override===true){this.storage.setItem(e.namespace,JSON.stringify({}))}this.callback&&this.callback({func:"init",namespace:this.namespace,target:this.target})}catch(e){throw new Error("[YStorage] Initialization failed ".concat(e===null||e===void 0?void 0:e.message))}}has(e){try{var t=this.storage.getItem(this.namespace)||"";var r=t?JSON.parse(t):{};return Object.hasOwn(r,e)}catch(e){throw new Error("[YStorage] read fail ".concat(e===null||e===void 0?void 0:e.message))}}destroy(){try{this.storage.removeItem(this.namespace);this.callback&&this.callback({func:"destroy",namespace:this.namespace,target:this.target})}catch(e){throw new Error("[YStorage] destroy fail ".concat(e===null||e===void 0?void 0:e.message))}}setItem(e,r,a){try{var i,s,o;var n={expires:(i=a===null||a===void 0?void 0:a.expires)!==null&&i!==void 0?i:0,once:(s=a===null||a===void 0?void 0:a.once)!==null&&s!==void 0?s:false,override:(o=a===null||a===void 0?void 0:a.override)!==null&&o!==void 0?o:false};var c=this.storage.getItem(this.namespace)||"";var l=c?JSON.parse(c):{};if(l[e]&&!n.override){throw new Error("[YStorage] The key ".concat(e," already exists"))}l[e]={value:r!==null&&r!==void 0?r:"",expires:n.expires!==0?(new Date).getTime()+n.expires:0,once:n.once,override:n.override};this.storage.setItem(this.namespace,JSON.stringify(l));this.callback&&this.callback(t({func:"setItem",namespace:this.namespace,target:this.target,key:e,value:r},n))}catch(e){throw new Error("[YStorage] setItem failed ".concat(e===null||e===void 0?void 0:e.message))}}removeItem(e){try{var t;var r=this.storage.getItem(this.namespace)||"";var a=r?JSON.parse(r):{};delete a[e];(t=this.storage)===null||t===void 0?void 0:t.setItem(this.namespace,JSON.stringify(a));this.callback&&this.callback({func:"removeItem",target:this.target,namespace:this.namespace,key:e})}catch(e){throw new Error("[YStorage] removeItem failed ".concat(e===null||e===void 0?void 0:e.message))}}getItem(e){try{var t=null;var r=this.storage.getItem(this.namespace)||"";var a=r?JSON.parse(r):{};var i=a[e];if(i){if(i.expires&&i.expires<(new Date).getTime()){this.removeItem(e)}else{t=JSON.parse(typeof i.value==="string"?i.value:"")}if(i.once){this.removeItem(e)}}this.callback&&this.callback({func:"getItem",target:this.target,namespace:this.namespace,key:e,value:t});return t}catch(e){throw new Error("[YStorage] getItem failed ".concat(e===null||e===void 0?void 0:e.message))}}clear(){try{this.storage.setItem(this.namespace,"");this.callback&&this.callback({func:"clear",target:this.target,namespace:this.namespace})}catch(e){throw new Error("[YStorage] clear failed ".concat(e===null||e===void 0?void 0:e.message))}}}return o}();
