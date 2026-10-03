/**
 * @fileoverview Fuzzy search controller and UI rendering for protocol entities.
 */

/** @import { ProtocolDomain } from '../types/types.d.ts' */

import { FuzzySearch } from './fuzzy_search.js';
import { ProtocolRenderer } from './protocol_renderer.js';

// Number of search results to render immediately.
const SEARCH_RENDER_COUNT = 50;

/** @typedef {'method' | 'event' | 'type'} SearchItemKind */

const SearchItemType = {
  Method: 'method',
  Type: 'type',
  Event: 'event',
};

/**
 * @param {HTMLElement|null} target
 * @param {HTMLInputElement} searchInput
 * @returns {boolean}
 */
function isEditableOrActive(target, searchInput) {
  if (
    target &&
    target.matches &&
    target.matches('input, textarea, select, [contenteditable="true"]')
  ) {
    return true;
  }
  return searchInput === document.activeElement;
}

class SearchItem {
  /**
   * @param {string} domainName
   * @param {string} domainEntry
   * @param {SearchItemKind} itemType
   * @param {string} [description]
   * @param {(ref: string) => string} [formatRef]
   */
  constructor(domainName, domainEntry, itemType, description, formatRef) {
    this.domainName = domainName;
    this.domainEntry = domainEntry;
    this.type = itemType;
    this.description = description || '';
    this.title = this.domainName + '.' + this.domainEntry;
    const refFormatter = formatRef || (typeof window !== 'undefined' && window.app?.formatRef);
    this.route = refFormatter ? refFormatter(this.title) : '#/' + this.title;
  }
}

class SearchResult {
  /**
   * @param {SearchItem} item
   * @param {number} score
   * @param {Array<number>} matches
   */
  constructor(item, score, matches) {
    this.item = item;
    this.score = score;
    this.matches = matches;
  }
}

export class Search {
  /** @type {typeof SearchItemType} */
  static ItemType;
  /** @type {typeof SearchItem} */
  static Item;
  /** @type {typeof SearchResult} */
  static SearchResult;

  /**
   * @param {Element} searchHeader
   * @param {Element} resultsElement
   * @param {{ navigate?: (route: string) => void, formatRef?: (ref: string) => string, focusContent?: () => void }} [app]
   */
  constructor(searchHeader, resultsElement, app) {
    this._app = app;
    const input =
      searchHeader.tagName === 'INPUT'
        ? searchHeader
        : searchHeader.querySelector('input') || searchHeader;
    this._searchInput = /** @type {HTMLInputElement} */ (input);
    /** @type {Array<SearchItem>} */
    this._items = [];
    /** @type {Element|null} */
    this._selectedElement = null;
    this._defaultValue = '';
    this._searchInput.addEventListener('input', this._onInput.bind(this), false);
    this._searchInput.addEventListener('keydown', this._onKeyDown.bind(this), false);
    this._resultsElement = resultsElement;

    document.addEventListener('keydown', (event) => {
      const target = /** @type {HTMLElement|null} */ (event.target);
      if (isEditableOrActive(target, this._searchInput)) return;
      if (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key === 'k')) {
        event.preventDefault();
        this._searchInput.focus();
        this._searchInput.select();
        return;
      }
      if (event.key === 'Backspace' || event.key === 'Delete') {
        this._searchInput.focus();
        return;
      }
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        /\S/.test(event.key)
      ) {
        if (event.key !== '.') this._searchInput.value = '';
        this._searchInput.focus();
      }
    });

    document.addEventListener('paste', (event) => {
      const target = /** @type {HTMLElement|null} */ (event.target);
      if (isEditableOrActive(target, this._searchInput)) return;
      this._searchInput.focus();
    });

    document.addEventListener('click', (event) => {
      const target = /** @type {HTMLElement|null} */ (event.target);
      if (!target || this._searchInput.contains(target)) return;
      const searchItem = /** @type {HTMLElement|null} */ (target.closest('.search-item'));
      if (searchItem) {
        event.preventDefault();
        event.stopPropagation();
        this.cancelSearch();
        const navigate =
          this._app?.navigate || (typeof window !== 'undefined' && window.app?.navigate);
        if (navigate && searchItem.dataset.route) navigate(searchItem.dataset.route);
        return;
      }
    });
  }

  /**
   * @param {Array<ProtocolDomain>} domains
   */
  setDomains(domains) {
    this._items = [];
    const formatRef = this._app?.formatRef;
    for (const domain of domains) {
      for (const command of domain.commands || []) {
        this._items.push(
          new SearchItem(domain.domain, command.name, 'method', command.description, formatRef),
        );
      }
      for (const event of domain.events || []) {
        this._items.push(
          new SearchItem(domain.domain, event.name, 'event', event.description, formatRef),
        );
      }
      for (const type of domain.types || []) {
        this._items.push(
          new SearchItem(domain.domain, type.id, 'type', type.description, formatRef),
        );
      }
    }
  }

  cancelSearch() {
    this._searchInput.blur();
    /** @type {HTMLElement} */ (this._resultsElement).style.setProperty('display', 'none');
    this._searchInput.value = this._defaultValue;
    if (this._app?.focusContent) this._app.focusContent();
    else if (typeof window !== 'undefined' && window.app?.focusContent) window.app.focusContent();
  }

  /**
   * @param {string} value
   */
  setDefaultValue(value) {
    this._defaultValue = value;
  }

  _onInput() {
    this._selectedElement = null;
    /** @type {HTMLElement} */ (this._resultsElement).style.setProperty('display', 'block');
    let query = this._searchInput.value.trim();
    let items = this._items;
    let results = this._doSearch(items, query);
    if (results.length === 0) {
      this._renderMessage('Nothing is found.');
      return;
    }
    this._resultsElement.textContent = '';
    if (!query) this._addNavigateHomeItem();
    for (let i = 0; i < Math.min(results.length, SEARCH_RENDER_COUNT); ++i)
      this._resultsElement.appendChild(renderSearchResult(results[i]));
    this._addAllResultsButtonIfNeeded(results);
    this._selectedElement = /** @type {Element|null} */ (this._resultsElement.firstChild);
    if (this._selectedElement) this._selectedElement.classList.add('selected');
  }

  _addNavigateHomeItem() {
    let main = document.createElement('div');
    main.className = 'hbox search-item custom-search-result';
    main.textContent = 'Navigate Home';
    main.dataset.route = '#/';
    this._resultsElement.appendChild(main);
  }

  /**
   * @param {Array<SearchResult>} results
   * @returns {HTMLElement|undefined}
   */
  _addAllResultsButtonIfNeeded(results) {
    let remainingResults = results.length - SEARCH_RENDER_COUNT;
    if (remainingResults <= 0) return;
    let main = document.createElement('div');
    main.className = 'hbox search-item custom-search-result monospace';
    main.textContent = `Show Remaining ${remainingResults} Results...`;
    main.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        for (let i = SEARCH_RENDER_COUNT; i < results.length; ++i)
          this._resultsElement.appendChild(renderSearchResult(results[i]));
        let next = /** @type {Element|null} */ (main.nextSibling);
        main.remove();
        this._selectElement(next);
        this._searchInput.focus();
      },
      false,
    );
    this._resultsElement.appendChild(main);
    return main;
  }

  /**
   * @param {string} text
   */
  _renderMessage(text) {
    this._resultsElement.textContent = '';
    const box = document.createElement('div');
    box.className = 'box search-results-message';
    const h4 = document.createElement('h4');
    h4.textContent = text;
    box.appendChild(h4);
    this._resultsElement.appendChild(box);
  }

  /**
   * @param {Array<SearchItem>} items
   * @param {string} query
   * @returns {Array<SearchResult>}
   */
  _doSearch(items, query) {
    let results = [];
    if (!query) {
      for (let item of items) results.push(new SearchResult(item, 0, []));
      return results;
    }

    let fuzzySearch = new FuzzySearch(query);
    for (let item of items) {
      /** @type {Array<number>} */
      let matches = [];
      let score = fuzzySearch.score(item.title, matches);
      if (score === 0) continue;
      results.push(new SearchResult(item, score, matches));
    }
    results.sort((/** @type {SearchResult} */ a, /** @type {SearchResult} */ b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff) return scoreDiff;
      // Prefer left-most search results.
      const startDiff = (a.matches[0] ?? 0) - (b.matches[0] ?? 0);
      if (startDiff) return startDiff;
      return a.item.title.length - b.item.title.length;
    });
    return results;
  }

  /**
   * @param {KeyboardEvent} event
   */
  _onKeyDown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.cancelSearch();
    } else if (event.key === 'ArrowDown') {
      this._selectNext(event);
    } else if (event.key === 'ArrowUp') {
      this._selectPrevious(event);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (this._selectedElement) /** @type {HTMLElement} */ (this._selectedElement).click();
    }
  }

  /**
   * @param {Event} event
   */
  _selectNext(event) {
    if (!this._selectedElement) return;
    event.preventDefault();
    event.stopPropagation();
    let next = /** @type {Element|null} */ (this._selectedElement.nextSibling);
    if (!next) next = /** @type {Element|null} */ (this._resultsElement.firstChild);
    this._selectElement(next);
  }

  /**
   * @param {Event} event
   */
  _selectPrevious(event) {
    if (!this._selectedElement) return;
    event.preventDefault();
    event.stopPropagation();
    let previous = /** @type {Element|null} */ (this._selectedElement.previousSibling);
    if (!previous) previous = /** @type {Element|null} */ (this._resultsElement.lastChild);
    this._selectElement(previous);
  }

  /**
   * @param {Element|null} item
   */
  _selectElement(item) {
    if (this._selectedElement) this._selectedElement.classList.remove('selected');
    this._selectedElement = item;
    if (this._selectedElement) {
      this._selectedElement.classList.add('selected');
      if (typeof this._selectedElement.scrollIntoViewIfNeeded === 'function')
        this._selectedElement.scrollIntoViewIfNeeded(false);
    }
  }
}

/**
 * @param {SearchResult} searchResult
 * @returns {Element}
 */
function renderSearchResult(searchResult) {
  let item = searchResult.item;
  let main = document.createElement('div');
  main.className = 'hbox search-item';
  let icon = document.createElement('span');
  icon.className = 'search-item-icon';
  main.appendChild(icon);
  icon.appendChild(ProtocolRenderer.renderEntityIcon(item.type));
  {
    let container = document.createElement('div');
    container.className = 'search-item-main';
    main.appendChild(container);
    let p1 = document.createElement('div');
    p1.className = 'search-item-title monospace';
    container.appendChild(p1);
    let domainElement = document.createElement('span');
    domainElement.className = 'search-item-title-domain';
    p1.appendChild(domainElement);
    domainElement.appendChild(
      renderTextWithMatches(item.title, searchResult.matches, 0, item.domainName.length + 1),
    );
    p1.appendChild(
      renderTextWithMatches(
        item.title,
        searchResult.matches,
        item.domainName.length + 1,
        item.title.length,
      ),
    );
    let p2 = document.createElement('div');
    p2.className = 'search-item-description';
    p2.textContent = item.description;
    container.appendChild(p2);
  }
  main.dataset.route = item.route;
  return main;
}

/**
 * @param {string} text
 * @param {Array<number>} matches
 * @param {number} fromIndex
 * @param {number} toIndex
 * @returns {Node}
 */
function renderTextWithMatches(text, matches, fromIndex, toIndex) {
  if (!matches.length) return document.createTextNode(text.substring(fromIndex, toIndex));
  let result = document.createDocumentFragment();
  let insideMatch = false;
  let currentIndex = fromIndex;
  let matchIndex = new Set(matches);
  for (let i = fromIndex; i < toIndex; ++i) {
    if (insideMatch !== matchIndex.has(i)) {
      add(currentIndex, i, insideMatch);
      insideMatch = matchIndex.has(i);
      currentIndex = i;
    }
  }
  add(currentIndex, toIndex, insideMatch);
  return result;

  /**
   * @param {number} from
   * @param {number} to
   * @param {boolean} isHighlight
   */
  function add(from, to, isHighlight) {
    if (to === from) return;
    const chunk = text.substring(from, to);
    if (isHighlight) {
      const span = document.createElement('span');
      span.className = 'search-highlight';
      span.textContent = chunk;
      result.appendChild(span);
    } else {
      result.appendChild(document.createTextNode(chunk));
    }
  }
}

// Expose on Search class for backward compatibility and window
Search.ItemType = SearchItemType;
Search.Item = SearchItem;
Search.SearchResult = SearchResult;
