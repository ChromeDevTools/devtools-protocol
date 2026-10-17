/**
 * @fileoverview Protocol Model - Isomorphic pure functions for CDP protocols.
 * Browser-agnostic, zero-DOM ES module.
 */

/** @import { ProtocolDomain, NormalizedProtocolDomain, ProtocolRoot, NormalizedProtocolRoot, TargetKind, RouteInfo } from '../types/types.d.ts' */

/** @type {Map<string, TargetKind>} */
const TARGET_MAP = new Map([
  ['tot', 'tot'],
  ['stable', 'stable'],
  ['1-3', 'stable'],
  ['1-2', 'stable'],
  ['v8', 'v8'],
]);

/**
 * Normalizes a target string to one of: 'tot', 'stable', 'v8'.
 * @param {string|null|undefined} target
 * @returns {TargetKind}
 */
export function normalizeTarget(target) {
  if (!target) return 'tot';
  return TARGET_MAP.get(target.toLowerCase()) || 'tot';
}

/**
 * Resolves the identifier property name for sorting a CDP collection.
 * @param {string} collectionName
 * @returns {string|null}
 */
function nameProperty(collectionName) {
  switch (collectionName) {
    case 'domains':
      return 'domain';
    case 'types':
      return 'id';
    case 'commands':
    case 'events':
    case 'parameters':
    case 'returns':
    case 'properties':
      return 'name';
    default:
      return null;
  }
}

/**
 * Deterministically sorts a collection in-place:
 * 1. Standard (0) before Experimental (1) before Deprecated (2).
 * 2. Required before optional.
 * 3. Alphabetical by entity name.
 *
 * @param {Array<any>} items
 * @param {string|null} prop
 */
function sortCollection(items, prop) {
  if (!prop) return;
  items.sort((a, b) => {
    // 1. Standard (0) before Experimental (1) before Deprecated (2)
    const aRank = a.deprecated ? 2 : a.experimental ? 1 : 0;
    const bRank = b.deprecated ? 2 : b.experimental ? 1 : 0;
    if (aRank !== bRank) {
      return aRank - bRank;
    }

    // 2. Required before optional
    const aOpt = a.optional ? 1 : 0;
    const bOpt = b.optional ? 1 : 0;
    if (aOpt !== bOpt) {
      return aOpt - bOpt;
    }

    // 3. Alphabetical by entity name/id
    const aName = String(a[prop] || '');
    const bName = String(b[prop] || '');
    return aName.localeCompare(bName);
  });
}

/**
 * Recursively normalizes an arbitrary CDP node without mutating original input.
 * @param {any} object
 * @param {boolean} alreadyExperimental
 * @returns {any}
 */
function normalizeNode(object, alreadyExperimental) {
  if (!object || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((item) => normalizeNode(item, alreadyExperimental));
  }

  const result = /** @type {Record<string, any>} */ ({});
  const isSelfExperimental = Boolean(object.experimental);
  const childAlreadyExperimental = alreadyExperimental || isSelfExperimental;

  for (const [key, value] of Object.entries(object)) {
    // Avoid redundant experimental flag on children without mutating input
    if (key === 'experimental' && alreadyExperimental) {
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item) => normalizeNode(item, childAlreadyExperimental));
      sortCollection(result[key], nameProperty(key));
    } else {
      result[key] = normalizeNode(value, childAlreadyExperimental);
    }
  }

  return result;
}

/**
 * Normalizes protocol data by establishing empty array defaults and deterministic sorting.
 * Pure function: does NOT mutate input protocol object.
 *
 * @param {ProtocolRoot | { domains?: any[] }} protocol
 * @returns {NormalizedProtocolRoot} Normalized protocol clone
 */
export function normalizeProtocol(protocol) {
  if (!protocol || typeof protocol !== 'object') {
    return { domains: [] };
  }

  const normalized = normalizeNode(protocol, false);
  normalized.domains = normalized.domains || [];

  for (const domain of normalized.domains) {
    domain.commands = domain.commands || [];
    domain.events = domain.events || [];
    domain.types = domain.types || [];

    for (const event of domain.events) {
      event.parameters = event.parameters || [];
    }
    for (const command of domain.commands) {
      command.parameters = command.parameters || [];
      command.returns = command.returns || [];
    }
    for (const type of domain.types) {
      if (type.properties) {
        type.properties = type.properties || [];
      }
    }
  }

  return /** @type {NormalizedProtocolRoot} */ (normalized);
}

/**
 * Recursive, structurally unified deep clone filtering out anything with experimental === true.
 * Guarantees fresh copy with no shared references.
 *
 * @template T
 * @param {T} node
 * @returns {T} Fresh copy stripped of experimental entities
 */
export function stabilize(node) {
  if (typeof node !== 'object' || node === null) {
    return node;
  }

  if (Array.isArray(node)) {
    return /** @type {any} */ (
      node
        .filter((item) => !(item && typeof item === 'object' && item.experimental === true))
        .map((item) => stabilize(item))
    );
  }

  const result = /** @type {Record<string, any>} */ ({});
  for (const [key, value] of Object.entries(node)) {
    result[key] = stabilize(value);
  }

  return /** @type {T} */ (result);
}

/**
 * Helper to extract referenced type id from parameter/property object.
 * @param {string} domainName
 * @param {any} parameter
 * @returns {string|null}
 */
function getReferencedType(domainName, parameter) {
  if (!parameter || typeof parameter !== 'object') {
    return null;
  }
  if (parameter.$ref) {
    return parameter.$ref.includes('.') ? parameter.$ref : `${domainName}.${parameter.$ref}`;
  }
  if (parameter.type === 'array' && parameter.items) {
    return getReferencedType(domainName, parameter.items);
  }
  return null;
}

/**
 * Dynamically computes reverse references ("Used by") for every type across commands,
 * events, and types (properties and array items $ref).
 * Deduplicates and sorts references.
 *
 * @template {ProtocolDomain} D
 * @param {Array<D>} domains
 * @returns {Array<D>} The domains array with type.referencedBy populated
 */
export function computeBackReferences(domains) {
  if (!Array.isArray(domains)) return [];

  const typeidToType = new Map();
  for (const domain of domains) {
    for (const type of domain.types || []) {
      type.referencedBy = [];
      typeidToType.set(`${domain.domain}.${type.id}`, type);
    }
  }

  /**
   * @param {string} domainName
   * @param {any} arg
   * @param {'command' | 'event' | 'type'} type
   * @param {string} name
   */
  const addRef = (domainName, arg, type, name) => {
    const typeId = getReferencedType(domainName, arg);
    const referencedType = typeidToType.get(typeId);
    if (referencedType) {
      referencedType.referencedBy.push({ type, name });
    }
  };

  for (const domain of domains) {
    const domainName = domain.domain;

    for (const command of domain.commands || []) {
      const args = [...(command.parameters || []), ...(command.returns || [])];
      for (const arg of args) {
        addRef(domainName, arg, 'command', `${domainName}.${command.name}`);
      }
    }

    for (const event of domain.events || []) {
      for (const arg of event.parameters || []) {
        addRef(domainName, arg, 'event', `${domainName}.${event.name}`);
      }
    }

    for (const type of domain.types || []) {
      for (const prop of type.properties || []) {
        addRef(domainName, prop, 'type', `${domainName}.${type.id}`);
      }
      if (type.items) {
        addRef(domainName, type.items, 'type', `${domainName}.${type.id}`);
      }
    }
  }

  /** @type {Record<string, number>} */
  const typeOrder = { command: 1, method: 1, event: 2, type: 3 };

  for (const type of typeidToType.values()) {
    const map = new Map();
    for (const reference of type.referencedBy) {
      map.set(reference.name, reference);
    }
    type.referencedBy = Array.from(map.values());
    type.referencedBy.sort(
      (/** @type {{type: string, name: string}} */ a, /** @type {{type: string, name: string}} */ b) => {
        const orderA = typeOrder[a.type] ?? 99;
        const orderB = typeOrder[b.type] ?? 99;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return a.name.localeCompare(b.name);
      },
    );
  }

  return domains;
}

/**
 * Resolves where a redirected command now lives. Only commands carry `redirect` in the protocol.
 * Matches a pluralized name in the destination (Page.deleteCookie -> Network.deleteCookies).
 * @param {Map<string, ProtocolDomain> | undefined} domains
 * @param {string} domainName
 * @param {string} memberName
 * @returns {{ targetDomain: string, targetMember: string } | null}
 */
export function getRedirect(domains, domainName, memberName) {
  const command = domains?.get(domainName)?.commands?.find((c) => c.name === memberName);
  if (!command?.redirect) return null;
  const match = domains
    ?.get(command.redirect)
    ?.commands?.find((c) => c.name === memberName || c.name === `${memberName}s`);
  return { targetDomain: command.redirect, targetMember: match?.name ?? memberName };
}

/**
 * Creates canonical RouteInfo, mapping lowercase landing anchors to section.
 * @param {TargetKind} target
 * @param {string|null} domain
 * @param {string|null} member
 * @returns {RouteInfo}
 */
function createRouteInfo(target, domain, member) {
  if (domain && !/^[A-Z][a-zA-Z0-9]*$/.test(domain)) {
    const full = member ? `${domain}.${member}` : domain;
    const section = full === 'http-endpoints' ? 'endpoints' : full;
    return { target, domain: null, member: null, section };
  }
  return { target, domain, member };
}

/**
 * Parses a hash route into a canonical RouteInfo object.
 * Legacy static URLs (/tot/Page/#method-navigate, /1-3/..., /v8/...) are rewritten to hash
 * routes by the generated domain stubs and 404.html before the app ever sees them.
 *
 * Supported: #/Page.navigate, #/Page, #/v8/Runtime.evaluate, #/stable/Network, #/v8/, #faq, #/endpoints
 *
 * @param {string|null} [hash]
 * @returns {RouteInfo}
 */
export function parseRoute(hash) {
  const path = (hash ?? '').trim().replace(/^#\/?/, '').replace(/\/+$/, '');
  const [first = '', ...rest] = path.split('/');
  const matchedTarget = TARGET_MAP.get(first.toLowerCase());
  const target = matchedTarget ?? 'tot';
  const ref = matchedTarget ? rest.join('/') : path;
  if (!ref) return createRouteInfo(target, null, null);

  const dot = ref.indexOf('.');
  if (dot === -1) return createRouteInfo(target, ref, null);
  return createRouteInfo(target, ref.slice(0, dot), ref.slice(dot + 1) || null);
}

/**
 * Formats canonical hash route from components.
 * @param {{ target?: string|null, domain?: string|null, member?: string|null, section?: string|null }} [route]
 * @returns {string} Canonical hash route, e.g. '#/Page.navigate'
 */
export function formatRoute({ target = 'tot', domain = null, member = null, section = null } = {}) {
  const normTarget = normalizeTarget(target);
  const targetPrefix = normTarget === 'tot' ? '' : `${normTarget}/`;

  if (section) {
    return `#/${targetPrefix}${section}`;
  }
  if (!domain) {
    return normTarget === 'tot' ? '#/' : `#/${targetPrefix}`;
  }
  if (member) {
    return `#/${targetPrefix}${domain}.${member}`;
  }
  return `#/${targetPrefix}${domain}`;
}
