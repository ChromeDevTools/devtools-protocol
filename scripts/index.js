/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},i={},o={},r=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${r}--\x3e`,l=new RegExp(`${r}|${a}`);class c{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],i=document.createTreeWalker(t.content,133,null,!1);let o=0,a=-1,c=0;const{strings:d,values:{length:m}}=e;for(;c<m;){const e=i.nextNode();if(null!==e){if(a++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)h(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=d[c],s=p.exec(t)[2],n=s.toLowerCase()+"$lit$",i=e.getAttribute(n);e.removeAttribute(n);const o=i.split(l);this.parts.push({type:"attribute",index:a,name:s,strings:o}),c+=o.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const n=e.parentNode,i=t.split(l),o=i.length-1;for(let t=0;t<o;t++){let s,o=i[t];if(""===o)s=u();else{const e=p.exec(o);null!==e&&h(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(o)}n.insertBefore(s,e),this.parts.push({type:"node",index:++a})}""===i[o]?(n.insertBefore(u(),e),s.push(e)):e.data=i[o],c+=o}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&a!==o||(a++,t.insertBefore(u(),e)),o=a,this.parts.push({type:"node",index:a}),null===e.nextSibling?e.data="":(s.push(e),a--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),c++}}else i.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const h=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},d=e=>-1!==e.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class m{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o,r=0,a=0,l=i.nextNode();for(;r<n.length;)if(o=n[r],d(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=t.pop(),l=i.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${r} `;class f{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===e.indexOf("--\x3e",i+1);const o=p.exec(e);t+=null===o?e+(s?v:a):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const g=e=>null===e||!("object"==typeof e||"function"==typeof e),_=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class w{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let n=0;n<t;n++){s+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(g(e)||!_(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||g(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class y{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(u()),this.endNode=e.appendChild(u())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=u()),e.__insert(this.endNode=u())}insertAfterPart(e){e.__insert(this.startNode=u()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(g(e)?e!==this.value&&this.__commitText(e):e instanceof f?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):_(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const s=new m(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const i of e)s=t[n],void 0===s&&(s=new y(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(i),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class b{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}class k extends w{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends x{}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class L{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),o=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const V=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;const S=new class{handleAttributeExpressions(e,t,s,n){const i=t[0];if("."===i){return new k(e,t.slice(1),s).parts}if("@"===i)return[new L(e,t.slice(1),n.eventContext)];if("?"===i)return[new b(e,t.slice(1),s)];return new w(e,t,s).parts}handleTextExpression(e){return new y(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function A(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(r);return s=t.keyString.get(n),void 0===s&&(s=new c(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const M=new Map,T=new WeakMap,C=(e,t,s)=>{let i=T.get(t);void 0===i&&(n(t,t.firstChild),T.set(t,i=new y(Object.assign({templateFactory:A},s))),i.appendInto(t)),i.setValue(e),i.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const $=(e,...t)=>new f(e,t,"html",S);class R extends HTMLElement{connectedCallback(){this.render()}static get observedAttributes(){return["markdown"]}attributeChangedCallback(e,t,s){this.render()}render(){const e=this.getAttribute("markdown");if(!e)return void(this.innerHTML="");if(!/(\n-)|`/.test(e))return void(this.innerHTML=e);const t=this._escapeHtml(e);let s=this._convertMarkdownLists(t);s=this._convertMarkdownCodeBlocks(s),this.innerHTML=s}_convertMarkdownLists(e){let t=!1,s=[];for(const n of e.split(/\n/))t&&""===n?(t=!1,s.push("</ul>")):n.startsWith("-")?(t||s.push("<ul>"),t=!0,s.push("  <li>"+n.replace(/^- /,""))):s.push(n);return t&&s.push("</ul>"),s.join("\n")}_convertMarkdownCodeBlocks(e){const t=[],s=e.split(/`(.*?)`/g);for(;s.length;){const[e,n]=s.splice(0,2);t.push(e),n&&t.push(`<code>${n}</code>`)}return t.join("")}_escapeHtml(e){var t,s=""+e,n=/["'&<>]/.exec(s);if(!n)return s;var i="",o=0,r=0;for(o=n.index;o<s.length;o++){switch(s.charCodeAt(o)){case 34:t='"';break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}r!==o&&(i+=s.substring(r,o)),r=o+1,i+=t}return r!==o?i+s.substring(r,o):i}}customElements.define("cr-markdownish",R);for(const e of document.querySelectorAll(".permalink")){const t=e.href,s=e.dataset.slug,n=`[\`${s}\`](${t})`,i=`<meta charset="utf-8"><a href="${t}"><tt style="font-family: Consolas, Menlo, monospace;">${s}</tt></a>`;function H(s){s.preventDefault(),window.location.href=t;const o=new Blob(["dblclick"===s.type?n:t],{type:"text/plain"}),r=new Blob([i],{type:"text/html"}),a=new ClipboardItem({[o.type]:o,[r.type]:r});navigator.clipboard.write([a]).then(t=>{const n=["copied"];"dblclick"===s.type&&n.push("copied__md"),e.className="permalink",requestAnimationFrame(t=>{requestAnimationFrame(t=>{e.classList.add(...n)})})}).catch(e=>console.error("Could not copy to clipboard: ",e))}e.addEventListener("click",H),e.addEventListener("dblclick",H)}function U(e){const t=new URL(location.href).hash.slice(1);if(!t)return;document.querySelector("#"+t).scrollIntoView({block:"start"})}window.addEventListener("popstate",U),document.addEventListener("DOMContentLoaded",U);class q{constructor(e){this.index=e,this.keys=Object.keys(e)}getMatches(e){if(!e)return[];let t,s=e.toLowerCase(),n=!1;if(this.prevKey_){0===s.indexOf(this.prevKey_)&&(n=!0)}if(n)t=this.prevMatches_.filter(e=>-1!==e.indexOf(s));else{const e=[],n=[];this.keys.forEach(t=>{let i=t.indexOf(s);0===i?e.push(t):-1!==i&&n.push(t)}),t=e.concat(n)}return this.prevKey_=s,this.prevMatches_=t,t.map(e=>this.index[e])}}const F={0:"Domain",1:"Event",2:"Parameter",3:"Type",4:"Method"};class I extends HTMLElement{constructor(e){super(),this.attachShadow({mode:"open"}),this.baseUrl=e}set searchString(e){this.matches=this.keywordsModel.getMatches(e),C($`
      <style>
        :host {
          background: white;
          padding: 15px;
        }
        .results {
          box-shadow: var(--elevation-shadow);
          height: calc(100% - 25px);
          background-color: white;
          padding: 20px 0;
          overflow-y: auto;
        }
        .match-info {
          padding: 10px 20px;
          text-decoration: none;
          color: initial;
          display: block;
        }
        .match-info:hover, .match-info.selected {
          background-color: #E8F0FF;
        }
        .match-label {
          font-size: 1.4em;
          margin-bottom: 5px;
        }
        .match-label .label {
          display: flex;
          justify-content: space-between;
        }
        .match-label .type {
          font-size: 0.7em;
        }
      </style>
      <div class="results">
        ${this.matches.map(e=>{const{keyword:t,pageReferences:s}=e,{type:n,description:i,href:o,domainHref:r}=s[0];let a=this.baseUrl+r;return o&&(a+=o),$`
            <a role="menuitem" class="match-info" href="${a}" @click=${this.click}>
              <div class="match-label">
                <div class="label">
                  <span>${t}</span>
                  <span class="type">${F[n]}</span>
                </div>
              </div>
              <div class="match-description">
                <cr-markdownish markdown="${i||""}"></cr-markdownish>
              </div>
            </a>
          `})}
      </div>
    `,this.shadowRoot,{eventContext:this})}click(e){this.navigate(e.currentTarget)}get results(){return this.shadowRoot.querySelectorAll("a")}get selectedResult(){return this.results[this._selected]}focusSelectedResult(){this.selectedResult&&(this.selectedResult.classList.add("selected"),this.selectedResult.scrollIntoView({block:"center"}))}focusDown(){void 0===this._selected?this._selected=0:(this.selectedResult&&this.selectedResult.classList.remove("selected"),this._selected=Math.min(this._selected+1,this.matches.length-1)),this.focusSelectedResult()}focusUp(){void 0!==this._selected&&(this.selectedResult&&this.selectedResult.classList.remove("selected"),this._selected=Math.max(this._selected-1,0),this.focusSelectedResult())}select(){void 0!==this._selected&&void 0!==this.selectedResult&&this.navigate(this.selectedResult)}navigate(e){const t=new URL(window.location.href),s=new URL(e.href);window.location=s,t.pathname===s.pathname&&window.location.reload(!0)}}customElements.define("cr-search-results",I),customElements.define("cr-search-control",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.createMenu()}get baseUrl(){return this.getAttribute("base-url")}get protocolSearchIndexUrl(){return this.baseUrl+this.getAttribute("protocol-search-index")}get inputElement(){return this.shadowRoot.querySelector("input")}createMenu(){this.menuContainer=document.querySelector("main > section"),this.menu=new I(this.baseUrl),this.menu.addEventListener("navigation",()=>{this.menu.remove(),this.inputElement.value="",this.menuContainer.classList.remove("hidden")}),fetch(this.protocolSearchIndexUrl).then(e=>e.json()).then(e=>{this.menu.keywordsModel=new q(e)})}connectedCallback(){C($`
      <style>
        input {
          border-style: none;
          background-color: transparent;
          width: 100%;
          max-width: 500px;
          font-size: 1.5em;
          color: var(--header-text-color);
          border-bottom-width: 1px;
          border-bottom-style: solid;
          border-bottom-color: var(--header-text-color);

          /* Float to the right */
          margin-left: auto;
        }
        input::placeholder {
          color: hsla(0, 0%, 100%, 0.5);
        }
        input:focus {
          transition: border-bottom-color 0.4s ease;
          border-bottom-color: #4BBDA8;
          outline: none;
        }
      </style>
      <input placeholder="Start typing to search..." aria-label="Search" @keyup=${this.handleArrows}/>
    `,this.shadowRoot,{eventContext:this})}handleArrows(e){switch(e.code){case"ArrowDown":return void this.menu.focusDown();case"ArrowUp":return void this.menu.focusUp();case"Enter":return e.preventDefault(),void this.menu.select()}"Escape"===e.code&&(this.inputElement.value="",this.inputElement.blur());const t=this.inputElement.value;""!==t?(this.menu.connected||this.menuContainer.replaceWith(this.menu),this.menu.searchString=t):this.menu.replaceWith(this.menuContainer)}});const B=document.querySelector(".menu-link"),P=document.querySelector("aside"),O=document.querySelector("main"),W=document.querySelector(".aside-close-button");function j(){P.classList.contains("shown")&&(P.classList.remove("shown"),B.focus())}document.addEventListener("keydown",e=>{e.metaKey||e.ctrlKey||e.altKey||(e.keyCode>=65&&e.keyCode<=90&&document.querySelector("cr-search-control").inputElement.focus(),"Escape"===e.key&&P.classList.contains("shown")&&P.classList.remove("shown"))}),B.addEventListener("click",e=>{e.stopPropagation(),P.addEventListener("transitionend",()=>{W.focus()},{once:!0}),P.classList.add("shown")}),O.addEventListener("click",j),W.addEventListener("click",j);
