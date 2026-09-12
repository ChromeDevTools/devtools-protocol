/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.trustedTypes,s=e?e.createPolicy("lit-html",{createHTML:t=>t}):void 0,i="$lit$",n=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+n,r=`<${o}>`,l=document,c=()=>l.createComment(""),h=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,d="[ \t\n\f\r]",u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,m=/>/g,$=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),_=/'/g,A=/"/g,f=/^(?:script|style|textarea|title)$/i,v=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),g=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),b=new WeakMap,w=l.createTreeWalker(l,129);function x(t,e){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(e):e}const k=(t,e)=>{const s=t.length-1,o=[];let l,c=2===e?"<svg>":3===e?"<math>":"",h=u;for(let e=0;e<s;e++){const s=t[e];let a,d,v=-1,g=0;for(;g<s.length&&(h.lastIndex=g,d=h.exec(s),null!==d);)g=h.lastIndex,h===u?"!--"===d[1]?h=p:void 0!==d[1]?h=m:void 0!==d[2]?(f.test(d[2])&&(l=RegExp("</"+d[2],"g")),h=$):void 0!==d[3]&&(h=$):h===$?">"===d[0]?(h=l??u,v=-1):void 0===d[1]?v=-2:(v=h.lastIndex-d[2].length,a=d[1],h=void 0===d[3]?$:'"'===d[3]?A:_):h===A||h===_?h=$:h===p||h===m?h=u:(h=$,l=void 0);const y=h===$&&t[e+1].startsWith("/>")?" ":"";c+=h===u?s+r:v>=0?(o.push(a),s.slice(0,v)+i+s.slice(v)+n+y):s+n+(-2===v?e:y)}return[x(t,c+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class H{constructor({strings:t,_$litType$:s},r){let l;this.parts=[];let h=0,a=0;const d=t.length-1,u=this.parts,[p,m]=k(t,s);if(this.el=H.createElement(p,r),w.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(l=w.nextNode())&&u.length<d;){if(1===l.nodeType){if(l.hasAttributes())for(const t of l.getAttributeNames())if(t.endsWith(i)){const e=m[a++],s=l.getAttribute(t).split(n),i=/([.?@])?(.*)/.exec(e);u.push({type:1,index:h,name:i[2],strings:s,ctor:"."===i[1]?S:"?"===i[1]?R:"@"===i[1]?T:C}),l.removeAttribute(t)}else t.startsWith(n)&&(u.push({type:6,index:h}),l.removeAttribute(t));if(f.test(l.tagName)){const t=l.textContent.split(n),s=t.length-1;if(s>0){l.textContent=e?e.emptyScript:"";for(let e=0;e<s;e++)l.append(t[e],c()),w.nextNode(),u.push({type:2,index:++h});l.append(t[s],c())}}}else if(8===l.nodeType)if(l.data===o)u.push({type:2,index:h});else{let t=-1;for(;-1!==(t=l.data.indexOf(n,t+1));)u.push({type:7,index:h}),t+=n.length-1}h++}}static createElement(t,e){const s=l.createElement("template");return s.innerHTML=t,s}}function E(t,e,s=t,i){if(e===g)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=h(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=E(t,n._$AS(t,e.values),n,i)),e}class M{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??l).importNode(e,!0);w.currentNode=i;let n=w.nextNode(),o=0,r=0,c=s[0];for(;void 0!==c;){if(o===c.index){let e;2===c.type?e=new L(n,n.nextSibling,this,t):1===c.type?e=new c.ctor(n,c.name,c.strings,this,t):6===c.type&&(e=new N(n,this,t)),this._$AV.push(e),c=s[++r]}o!==c?.index&&(n=w.nextNode(),o++)}return w.currentNode=l,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),h(t)?t===y||null==t||""===t?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==g&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>a(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&h(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=H.createElement(x(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new M(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=b.get(t.strings);return void 0===e&&b.set(t.strings,e=new H(t)),e}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new L(this.O(c()),this.O(c()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class C{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=E(this,t,e,0),o=!h(t)||t!==this._$AH&&t!==g,o&&(this._$AH=t);else{const i=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=E(this,i[s+r],e,r),l===g&&(l=this._$AH[r]),o||=!h(l)||l!==this._$AH[r],l===y?t=y:t!==y&&(t+=(l??"")+n[r+1]),this._$AH[r]=l}o&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class S extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class R extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class T extends C{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??y)===g)return;const s=this._$AH,i=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==y&&(s===y||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class N{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const U=t.litHtmlPolyfillSupport;U?.(H,L),(t.litHtmlVersions??=[]).push("3.3.1");const I=(t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new L(e.insertBefore(c(),t),t,void 0,s??{})}return n._$AI(t),n};class B extends HTMLElement{connectedCallback(){this.render()}static get observedAttributes(){return["markdown"]}attributeChangedCallback(t,e,s){this.render()}render(){const t=this.getAttribute("markdown");if(!t)return void(this.innerHTML="");if(!/(\n-)|`/.test(t))return void(this.innerHTML=t);const e=this._escapeHtml(t);let s=this._convertMarkdownLists(e);s=this._convertMarkdownCodeBlocks(s),this.innerHTML=s}_convertMarkdownLists(t){let e=!1,s=[];for(const i of t.split(/\n/))e&&""===i?(e=!1,s.push("</ul>")):i.startsWith("-")?(e||s.push("<ul>"),e=!0,s.push("  <li>"+i.replace(/^- /,""))):s.push(i);return e&&s.push("</ul>"),s.join("\n")}_convertMarkdownCodeBlocks(t){const e=[],s=t.split(/`(.*?)`/g);for(;s.length;){const[t,i]=s.splice(0,2);e.push(t),i&&e.push(`<code>${i}</code>`)}return e.join("")}_escapeHtml(t){var e,s=""+t,i=/["'&<>]/.exec(s);if(!i)return s;var n="",o=0,r=0;for(o=i.index;o<s.length;o++){switch(s.charCodeAt(o)){case 34:e='"';break;case 38:e="&amp;";break;case 39:e="&#39;";break;case 60:e="&lt;";break;case 62:e="&gt;";break;default:continue}r!==o&&(n+=s.substring(r,o)),r=o+1,n+=e}return r!==o?n+s.substring(r,o):n}}customElements.define("cr-markdownish",B);for(const z of document.querySelectorAll(".permalink")){const Z=z.href,G=z.dataset.slug,J=`[\`${G}\`](${Z})`,Q=`<meta charset="utf-8"><a href="${Z}"><tt style="font-family: Consolas, Menlo, monospace;">${G}</tt></a>`;function X(t){t.preventDefault(),window.location.href=Z;const e=new Blob(["dblclick"===t.type?J:Z],{type:"text/plain"}),s=new Blob([Q],{type:"text/html"}),i=new ClipboardItem({[e.type]:e,[s.type]:s});navigator.clipboard.write([i]).then(e=>{const s=["copied"];"dblclick"===t.type&&s.push("copied__md"),z.className="permalink",requestAnimationFrame(t=>{requestAnimationFrame(t=>{z.classList.add(...s)})})}).catch(t=>console.error("Could not copy to clipboard: ",t))}z.addEventListener("click",X),z.addEventListener("dblclick",X)}function q(t){const e=new URL(location.href).hash.slice(1);if(!e)return;document.querySelector(`#${e}`).scrollIntoView({block:"start"})}window.addEventListener("popstate",q),document.addEventListener("DOMContentLoaded",q);class D{constructor(t){this.index=t,this.keys=Object.keys(t)}getMatches(t){if(!t)return[];let e,s=t.toLowerCase(),i=!1;if(this.prevKey_){0===s.indexOf(this.prevKey_)&&(i=!0)}if(i)e=this.prevMatches_.filter(t=>-1!==t.indexOf(s));else{const t=[],i=[];this.keys.forEach(e=>{let n=e.indexOf(s);0===n?t.push(e):-1!==n&&i.push(e)}),e=t.concat(i)}return this.prevKey_=s,this.prevMatches_=e,e.map(t=>this.index[t])}}const O={0:"Domain",1:"Event",2:"Parameter",3:"Type",4:"Method"};class j extends HTMLElement{constructor(t){super(),this.attachShadow({mode:"open"}),this.baseUrl=t}set searchString(t){this.matches=this.keywordsModel.getMatches(t),I(v`
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
        ${this.matches.map(t=>{const{keyword:e,pageReferences:s}=t,{type:i,description:n,href:o,domainHref:r}=s[0];let l=this.baseUrl+r;return o&&(l+=o),v`
            <a role="menuitem" class="match-info" href="${l}" @click=${this.click}>
              <div class="match-label">
                <div class="label">
                  <span>${e}</span>
                  <span class="type">${O[i]}</span>
                </div>
              </div>
              <div class="match-description">
                <cr-markdownish markdown="${n||""}"></cr-markdownish>
              </div>
            </a>
          `})}
      </div>
    `,this.shadowRoot,{host:this})}click(t){this.navigate(t.currentTarget)}get results(){return this.shadowRoot.querySelectorAll("a")}get selectedResult(){return this.results[this._selected]}focusSelectedResult(){this.selectedResult&&(this.selectedResult.classList.add("selected"),this.selectedResult.scrollIntoView({block:"center"}))}focusDown(){void 0===this._selected?this._selected=0:(this.selectedResult&&this.selectedResult.classList.remove("selected"),this._selected=Math.min(this._selected+1,this.matches.length-1)),this.focusSelectedResult()}focusUp(){void 0!==this._selected&&(this.selectedResult&&this.selectedResult.classList.remove("selected"),this._selected=Math.max(this._selected-1,0),this.focusSelectedResult())}select(){void 0!==this._selected&&void 0!==this.selectedResult&&this.navigate(this.selectedResult)}navigate(t){const e=new URL(window.location.href),s=new URL(t.href);window.location=s,e.pathname===s.pathname&&window.location.reload(!0)}}customElements.define("cr-search-results",j),customElements.define("cr-search-control",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.createMenu()}get baseUrl(){return this.getAttribute("base-url")}get protocolSearchIndexUrl(){return this.baseUrl+this.getAttribute("protocol-search-index")}get inputElement(){return this.shadowRoot.querySelector("input")}createMenu(){this.menuContainer=document.querySelector("main > section"),this.menu=new j(this.baseUrl),this.menu.addEventListener("navigation",()=>{this.menu.remove(),this.inputElement.value="",this.menuContainer.classList.remove("hidden")}),fetch(this.protocolSearchIndexUrl).then(t=>t.json()).then(t=>{this.menu.keywordsModel=new D(t)})}connectedCallback(){I(v`
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
    `,this.shadowRoot,{host:this})}handleArrows(t){switch(t.code){case"ArrowDown":return void this.menu.focusDown();case"ArrowUp":return void this.menu.focusUp();case"Enter":return t.preventDefault(),void this.menu.select()}"Escape"===t.code&&(this.inputElement.value="",this.inputElement.blur());const e=this.inputElement.value;""!==e?(this.menu.connected||this.menuContainer.replaceWith(this.menu),this.menu.searchString=e):this.menu.replaceWith(this.menuContainer)}});const P=document.querySelector(".menu-link"),W=document.querySelector("aside"),F=document.querySelector("main"),K=document.querySelector(".aside-close-button");function V(){W.classList.contains("shown")&&(W.classList.remove("shown"),P.focus())}document.addEventListener("keydown",t=>{t.metaKey||t.ctrlKey||t.altKey||(t.keyCode>=65&&t.keyCode<=90&&document.querySelector("cr-search-control").inputElement.focus(),"Escape"===t.key&&W.classList.contains("shown")&&W.classList.remove("shown"))}),P.addEventListener("click",t=>{t.stopPropagation(),W.addEventListener("transitionend",()=>{K.focus()},{once:!0}),W.classList.add("shown")}),F.addEventListener("click",V),K.addEventListener("click",V);
