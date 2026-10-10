/**
 * @fileoverview Main Application Controller for Chrome DevTools Protocol Viewer.
 */

/** @import { ProtocolDomain, NormalizedProtocolDomain, ProtocolRoot, TargetKind, RouteInfo } from '../types/types.d.ts' */
import {
  normalizeProtocol,
  stabilize,
  computeBackReferences,
  parseRoute,
  formatRoute,
  normalizeTarget,
} from './protocol-model.js';
import { $ } from './bling.js';
import { ProtocolRenderer } from './protocol_renderer.js';
import { Search } from './search.js';

const PROTOCOL_URLS = {
  tot: new URL('./data/tot.json', import.meta.url).href,
  v8: new URL('./data/v8.json', import.meta.url).href,
};

document.addEventListener('DOMContentLoaded', () => {
  const sidebarElement = $('#sidebar');
  const domainListElement = $('#domain-list');
  const contentElement = $('#content');
  const searchElement = $('#search');
  const searchResultsElement = $('#sresults');
  const targetSelector = /** @type {HTMLSelectElement} */ ($('#target-selector'));
  const drawerToggle = $('#drawer-toggle');
  const drawerBackdrop = $('#drawer-backdrop');

  window.app = new App({
    sidebarElement,
    domainListElement,
    contentElement,
    searchElement,
    searchResultsElement,
    targetSelector,
    drawerToggle,
    drawerBackdrop,
  });
});

/**
 * @typedef {Object} AppElements
 * @property {HTMLElement} sidebarElement
 * @property {HTMLElement} domainListElement
 * @property {HTMLElement} contentElement
 * @property {HTMLElement} searchElement
 * @property {HTMLElement} searchResultsElement
 * @property {HTMLSelectElement} targetSelector
 * @property {HTMLElement} drawerToggle
 * @property {HTMLElement} drawerBackdrop
 */

export class App {
  /**
   * @param {AppElements} elements
   */
  constructor({
    sidebarElement,
    domainListElement,
    contentElement,
    searchElement,
    searchResultsElement,
    targetSelector,
    drawerToggle,
    drawerBackdrop,
  }) {
    this._sidebarElement = sidebarElement;
    this._domainListElement = domainListElement;
    this._contentElement = contentElement;
    this._targetSelector = targetSelector;
    this._drawerToggle = drawerToggle;
    this._drawerBackdrop = drawerBackdrop;

    /** @type {TargetKind} */
    this._currentTarget = 'tot';
    /** @type {TargetKind|null} */
    this._renderedTarget = null;
    /** @type {string|null} */
    this._renderedDomain = null;

    /** @type {Map<string, NormalizedProtocolDomain>} */
    this._activeDomains = new Map();

    /** @type {Record<TargetKind, Map<string, NormalizedProtocolDomain>>} */
    this._targetStore = {
      tot: new Map(),
      stable: new Map(),
      v8: new Map(),
    };

    this.formatRef = this.formatRef.bind(this);
    this._search = new Search(searchElement, searchResultsElement, this);

    this._setupDrawerEvents();
    this._setupSidebarEvents();
    this._setupLinkInterception();
    this._setupRoutingEvents();

    this.init();
  }

  /**
   * @param {string} ref
   * @returns {string}
   */
  formatRef(ref) {
    return formatRoute({ target: this._currentTarget, domain: ref });
  }

  focusContent() {
    this._contentElement.focus();
  }

  /**
   * @param {string} route
   */
  navigate(route) {
    const cleanRoute = formatRoute(parseRoute(route));
    if (window.location.hash !== cleanRoute) {
      window.location.hash = cleanRoute;
    } else {
      this._onRoute();
    }
  }

  /**
   * Fetches JSON protocol specification.
   * @param {string} url
   * @returns {Promise<ProtocolRoot>}
   */
  async _fetchProtocolJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText} (${url})`);
    return await res.json();
  }

  async init() {
    try {
      const [totProto, v8Proto] = await Promise.all([
        this._fetchProtocolJson(PROTOCOL_URLS.tot),
        this._fetchProtocolJson(PROTOCOL_URLS.v8),
      ]);

      this._prepareDatasets(totProto, v8Proto);
      this._onRoute();
    } catch (error) {
      this._contentElement.textContent = '';
      const message = error instanceof Error ? error.message : String(error);
      this._contentElement.appendChild(renderError(`Initialization failed: ${message}`));
    }
  }

  /**
   * Prepares protocol datasets for tot, stable, and v8.
   * @param {ProtocolRoot} totProto
   * @param {ProtocolRoot} v8Proto
   */
  _prepareDatasets(totProto, v8Proto) {
    // 1. Tip-of-Tree (Tot)
    const totDomains = normalizeProtocol({ domains: totProto.domains || [] }).domains;
    computeBackReferences(totDomains);
    for (const d of totDomains) {
      this._targetStore.tot.set(d.domain, d);
    }

    // 2. Stable Protocol
    const stableTotDomains = stabilize(totDomains.filter((d) => !d.experimental));
    computeBackReferences(stableTotDomains);
    for (const d of stableTotDomains) {
      this._targetStore.stable.set(d.domain, d);
    }

    // 3. V8 Inspector
    const v8Domains = normalizeProtocol({ domains: v8Proto.domains || [] }).domains;
    computeBackReferences(v8Domains);
    for (const d of v8Domains) {
      this._targetStore.v8.set(d.domain, d);
    }
  }

  _setupDrawerEvents() {
    if (this._drawerToggle) {
      this._drawerToggle.addEventListener('click', () => this._toggleDrawer());
    }
    if (this._drawerBackdrop) {
      this._drawerBackdrop.addEventListener('click', () => this._closeDrawer());
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('drawer-open')) {
        this._closeDrawer();
      }
    });
  }

  _toggleDrawer() {
    const isOpen = document.body.classList.toggle('drawer-open');
    if (this._drawerToggle) {
      this._drawerToggle.setAttribute('aria-expanded', String(isOpen));
    }
    if (this._contentElement) {
      this._contentElement.inert = isOpen;
    }
  }

  _closeDrawer() {
    document.body.classList.remove('drawer-open');
    if (this._drawerToggle) {
      this._drawerToggle.setAttribute('aria-expanded', 'false');
    }
    if (this._contentElement) {
      this._contentElement.inert = false;
    }
  }

  _setupSidebarEvents() {
    if (this._targetSelector) {
      this._targetSelector.addEventListener('change', () => {
        const target = normalizeTarget(this._targetSelector.value);
        const { domain, section } = parseRoute(window.location.hash);
        const validDomain = domain && this._targetStore[target]?.has(domain) ? domain : null;
        this.navigate(formatRoute({ target, domain: validDomain, section }));
      });
    }
  }

  _setupLinkInterception() {
    document.body.addEventListener(
      'click',
      (event) => {
        const target = /** @type {HTMLElement|null} */ (event.target);
        if (!target) return;
        const anchor = target.closest('a');
        if (!anchor) return;
        if (anchor.target === '_blank') return;
        if (anchor.hostname && anchor.hostname !== window.location.hostname) return;

        const href = anchor.getAttribute('href');
        if (
          anchor.classList.contains('section-jump-pill') ||
          href === '#methods' ||
          href === '#events' ||
          href === '#types'
        ) {
          return;
        }
        if (href && (href.startsWith('#') || href.startsWith('?'))) {
          event.preventDefault();
          this._closeDrawer();
          this.navigate(href);
        }
      },
      false,
    );
  }

  _setupRoutingEvents() {
    window.addEventListener('hashchange', () => this._onRoute());
    window.addEventListener('popstate', () => this._onRoute());
  }

  _onRoute() {
    let rawRoute = window.location.hash;
    if (window.location.search && !rawRoute) {
      rawRoute = window.location.search;
    } else if (!rawRoute || /^#(?:method|type|event)-/.test(rawRoute)) {
      rawRoute = window.location.pathname + (rawRoute || '');
    }

    const route = parseRoute(rawRoute);
    this._currentTarget = route.target;
    if (this._targetSelector) {
      this._targetSelector.value = route.target;
    }

    if (this._renderedTarget !== route.target) {
      this._renderedTarget = route.target;
      this._renderedDomain = null;
      this._activeDomains = this._targetStore[route.target] || this._targetStore.tot;
      this._search.setDomains(Array.from(this._activeDomains.values()));
      this._renderSidebar(this._activeDomains);
    }

    const { domain, member, section } = route;

    if (!domain) {
      this._renderedDomain = null;
      this._onNavigateHome(section);
      return;
    }

    // In-page navigation: if domain is already rendered, scroll to member without DOM re-render
    if (this._renderedDomain === domain && this._contentElement.firstChild && member) {
      const canonicalTitle = `${domain}.${member}`;
      document.title = `${canonicalTitle} - DevTools Protocol`;
      this._search.setDefaultValue(canonicalTitle);
      const titleId = ProtocolRenderer.titleId(domain, member);
      const elem = this._contentElement.querySelector('#' + titleId);
      if (elem) {
        elem.scrollIntoView();
        highlightTarget(elem);
      }
      this.focusContent();
      return;
    }

    this._renderedDomain = domain;
    this._onNavigateDomain(domain, member);
  }

  /**
   * @param {string} domain
   * @param {string|null} member
   */
  _onNavigateDomain(domain, member) {
    const canonicalTitle = member ? `${domain}.${member}` : domain;
    document.title = `${canonicalTitle} - DevTools Protocol`;

    const searchDefault = member ? `${domain}.${member}` : domain;
    this._search.setDefaultValue(searchDefault);
    this._search.cancelSearch();

    this._contentElement.textContent = '';

    // Update active link in sidebar
    const active = this._domainListElement.querySelector('.active-link');
    if (active) {
      active.classList.remove('active-link');
    }

    if (!this._activeDomains.has(domain)) {
      this._contentElement.appendChild(renderError(`Unknown domain: ${domain}.`));
      return;
    }

    const currentLink = /** @type {HTMLElement|null} */ (
      this._domainListElement.querySelector(`[data-domain='${domain}']`)
    );
    if (currentLink) {
      currentLink.classList.add('active-link');
      if (typeof currentLink.scrollIntoViewIfNeeded === 'function') {
        currentLink.scrollIntoViewIfNeeded(false);
      }
    }

    const domainObject = this._activeDomains.get(domain);
    if (!domainObject) return;
    const rendered = ProtocolRenderer.renderDomain(domainObject);
    if (rendered) {
      this._contentElement.appendChild(rendered);
      if (member) {
        const titleId = ProtocolRenderer.titleId(domain, member);
        const elem = rendered.querySelector('#' + titleId);
        if (elem) {
          elem.scrollIntoView();
          highlightTarget(elem);
        } else {
          this._contentElement.scrollTop = 0;
        }
      } else {
        this._contentElement.scrollTop = 0;
      }
    }

    this.focusContent();
  }

  /**
   * @param {string|null} [anchorId]
   */
  _onNavigateHome(anchorId = null) {
    document.title = 'DevTools Protocol Viewer';
    this._search.setDefaultValue('');
    this._search.cancelSearch();
    this._contentElement.textContent = '';

    const active = this._domainListElement.querySelector('.active-link');
    if (active) {
      active.classList.remove('active-link');
    }

    const template = /** @type {HTMLTemplateElement|null} */ ($('#landing'));
    if (template) {
      const clone = template.content.cloneNode(true);
      this._contentElement.appendChild(clone);

      // Ensure all landing headings with an id have a title-link
      const headings = this._contentElement.querySelectorAll('h2[id], h3[id], h4[id], h5[id]');
      for (const heading of headings) {
        if (!heading.querySelector('.title-link')) {
          const link = document.createElement('a');
          link.className = 'title-link';
          link.href = `#${heading.id}`;
          link.textContent = '#';
          heading.appendChild(link);
        }
      }

      if (anchorId) {
        const targetId = anchorId === 'http-endpoints' ? 'endpoints' : anchorId;
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.scrollIntoView();
          highlightTarget(targetElem);
          const activeLink = /** @type {HTMLElement|null} */ (
            this._domainListElement.querySelector(
              `[data-domain='${anchorId}'], [data-domain='${targetId}']`,
            )
          );
          if (activeLink) {
            activeLink.classList.add('active-link');
            if (typeof activeLink.scrollIntoViewIfNeeded === 'function') {
              activeLink.scrollIntoViewIfNeeded(false);
            }
          }
        }
      }
    }

    this.focusContent();
  }

  /**
   * @param {Map<string, NormalizedProtocolDomain>} domains
   */
  _renderSidebar(domains) {
    this._domainListElement.textContent = '';

    for (const [name, domain] of domains) {
      const link = document.createElement('a');
      link.href = this.formatRef(name);
      link.className = 'domain-link';
      link.dataset.domain = name;
      link.textContent = name;

      ProtocolRenderer.applyBackground(domain, link);

      this._domainListElement.appendChild(link);
    }

    const divider = document.createElement('div');
    divider.className = 'sidebar-divider';
    this._domainListElement.appendChild(divider);

    const endpointsLink = document.createElement('a');
    endpointsLink.href = formatRoute({ target: this._currentTarget, section: 'endpoints' });
    endpointsLink.className = 'domain-link sidebar-meta-link';
    endpointsLink.dataset.domain = 'endpoints';
    endpointsLink.textContent = 'HTTP Endpoints';
    this._domainListElement.appendChild(endpointsLink);
  }
}

/**
 * @param {string} error
 * @returns {Element}
 */
function renderError(error) {
  const main = document.createElement('div');
  main.className = 'box';
  const box = document.createElement('div');
  box.className = 'box-content';
  const h2 = document.createElement('h2');
  h2.textContent = 'Error';
  const p = document.createElement('p');
  p.textContent = error;
  box.append(h2, p);
  main.appendChild(box);
  return main;
}

/**
 * Triggers a highlight animation on the targeted element.
 * @param {Element} element
 */
function highlightTarget(element) {
  element.classList.remove('target-highlight');
  // Trigger reflow so re-navigating to the same anchor replays the animation
  void /** @type {HTMLElement} */ (element).offsetWidth;
  element.classList.add('target-highlight');
}
