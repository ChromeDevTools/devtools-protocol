/**
 * @fileoverview Bling JS: Syntactic sugar for DOM queries.
 * Defines global $ and $$ helpers and element-scoped equivalents.
 * With automagic qSA types.
 *
 * Inspired by my original Bling.js Gist (2015): https://gist.github.com/paulirish/12fb951a8b893a454b32
 * But.. it's different. and upgraded.
 */

/** @import { ParseSelector } from '../types/bling.d.ts' */

/**
 * querySelector that throws if nothing matches. Return type is inferred from the selector literal via ParseSelector.
 * @template {string} T
 * @param {T} query
 * @param {ParentNode} [context]
 * @returns {ParseSelector<T>}
 */
export function $(query, context) {
  const result = (context ?? document).querySelector(query);
  if (result === null) throw new Error(`querySelector('${query}') not found`);
  return /** @type {ParseSelector<T>} */ (result);
}

/**
 * querySelectorAll that returns an Array. Return type is inferred from the selector literal via ParseSelector.
 * @template {string} T
 * @param {T} query
 * @param {ParentNode} [context]
 * @returns {ParseSelector<T>[]}
 */
export function $$(query, context) {
  return /** @type {ParseSelector<T>[]} */ (
    Array.from((context ?? document).querySelectorAll(query))
  );
}

if (typeof Element !== 'undefined') {
  for (const Ctor of [Element, Document, DocumentFragment]) {
    Object.defineProperties(Ctor.prototype, {
      $: {
        /**
         * @template {string} T
         * @this {ParentNode}
         * @param {T} query
         * @returns {ParseSelector<T>}
         */
        value: function (query) {
          return $(query, this);
        },
        writable: true,
        configurable: true,
        enumerable: false,
      },
      $$: {
        /**
         * @template {string} T
         * @this {ParentNode}
         * @param {T} query
         * @returns {ParseSelector<T>[]}
         */
        value: function (query) {
          return $$(query, this);
        },
        writable: true,
        configurable: true,
        enumerable: false,
      },
    });
  }
}

if (typeof window !== 'undefined') {
  window.$ = $;
  window.$$ = $$;
}
