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

const ROUTE_BASE_URL = 'https://cdp.internal';

const hasURLPattern = typeof URLPattern !== 'undefined';

const legacyAnchorPattern = hasURLPattern
  ? new URLPattern({ hash: ':prefix(method|type|event)-:member' })
  : null;

const legacyPathPattern = hasURLPattern
  ? new URLPattern({
      pathname:
        '{/:repo(devtools-protocol|debugger-protocol-viewer)}?/:target(tot|v8|1-3|1-2|stable)/:domain{/}*',
      baseURL: ROUTE_BASE_URL,
    })
  : null;

const hashTargetMemberPattern = hasURLPattern
  ? new URLPattern({
      hash: '#/:target(tot|v8|1-3|1-2|stable)/:domain.:member',
    })
  : null;
const hashTargetDomainPattern = hasURLPattern
  ? new URLPattern({
      hash: '#/:target(tot|v8|1-3|1-2|stable)/:domain{/}*',
    })
  : null;
const hashTargetOnlyPattern = hasURLPattern
  ? new URLPattern({ hash: '#/:target(tot|v8|1-3|1-2|stable){/}*' })
  : null;

const hashMemberPattern = hasURLPattern ? new URLPattern({ hash: '#/:domain.:member' }) : null;
const hashDomainPattern = hasURLPattern ? new URLPattern({ hash: '#/:domain{/}*' }) : null;
const hashDirectPattern = hasURLPattern ? new URLPattern({ hash: '#:domain' }) : null;

const queryMemberPattern = hasURLPattern ? new URLPattern({ search: '?:domain.:member' }) : null;
const queryDomainPattern = hasURLPattern ? new URLPattern({ search: '?:domain' }) : null;

/**
 * Creates canonical RouteInfo, mapping lowercase landing anchors to section.
 * @param {TargetKind} target
 * @param {string|null} domain
 * @param {string|null} member
 * @param {string|null} [section]
 * @returns {RouteInfo}
 */
function createRouteInfo(target, domain, member, section = null) {
  if (domain && !/^[A-Z][a-zA-Z0-9]*$/.test(domain)) {
    const full = member ? `${domain}.${member}` : domain;
    const sec = full === 'http-endpoints' ? 'endpoints' : full;
    return { target, domain: null, member: null, section: sec };
  }
  /** @type {RouteInfo} */
  const res = { target, domain, member };
  if (section) {
    res.section = section;
  }
  return res;
}

/**
 * Parses any incoming route variant into a canonical RouteInfo object.
 * Uses standard URLPattern when available, with a regex/string fallback.
 *
 * Supported route structures:
 * - Modern hash routes: #/Page.navigate, #/Page, #/v8/Runtime.evaluate, #/stable/Network.getCookies
 * - Legacy paths: /tot/Page/#method-navigate, /1-3/Page/#method-navigate, /1-2/Network/
 * - Base-path prefixed: /devtools-protocol/tot/Page/#method-navigate, /debugger-protocol-viewer/tot/Page/#method-navigate
 * - Isolated legacy anchors: #method-navigate, #type-Node, #event-requestWillBeSent
 * - Query format: ?Page.navigate, ?Network
 *
 * @param {string|null} [routeString]
 * @returns {RouteInfo}
 */
export function parseRoute(routeString) {
  if (!routeString || typeof routeString !== 'string') {
    return createRouteInfo('tot', null, null);
  }

  const trimmed = routeString.trim();
  if (!trimmed || trimmed === '#' || trimmed === '#/' || trimmed === '/') {
    return createRouteInfo('tot', null, null);
  }

  if (hasURLPattern && legacyAnchorPattern && legacyPathPattern) {
    const url =
      trimmed.startsWith('#') || trimmed.startsWith('?') || trimmed.startsWith('/')
        ? new URL(trimmed, ROUTE_BASE_URL)
        : new URL('/' + trimmed, ROUTE_BASE_URL);

    const legacyAnchorMatch = legacyAnchorPattern.exec(url);
    const legacyMember = legacyAnchorMatch?.hash.groups.member ?? null;

    const legacyPathMatch = legacyPathPattern.exec(url);
    if (
      legacyPathMatch?.pathname.groups.domain &&
      !legacyPathMatch.pathname.groups.domain.endsWith('.html')
    ) {
      return createRouteInfo(
        normalizeTarget(legacyPathMatch.pathname.groups.target),
        legacyPathMatch.pathname.groups.domain,
        legacyMember,
      );
    }

    if (legacyMember) {
      return createRouteInfo('tot', null, legacyMember);
    }

    const htm = hashTargetMemberPattern?.exec(url);
    if (htm?.hash.groups.domain && htm.hash.groups.member) {
      return createRouteInfo(
        normalizeTarget(htm.hash.groups.target),
        htm.hash.groups.domain,
        htm.hash.groups.member,
      );
    }

    const htd = hashTargetDomainPattern?.exec(url);
    if (htd?.hash.groups.domain) {
      return createRouteInfo(
        normalizeTarget(htd.hash.groups.target),
        htd.hash.groups.domain,
        null,
      );
    }

    const hto = hashTargetOnlyPattern?.exec(url);
    if (hto?.hash.groups.target) {
      return createRouteInfo(
        normalizeTarget(hto.hash.groups.target),
        null,
        null,
      );
    }

    const hm = hashMemberPattern?.exec(url);
    if (hm?.hash.groups.domain && hm.hash.groups.member) {
      return createRouteInfo(
        'tot',
        hm.hash.groups.domain,
        hm.hash.groups.member,
      );
    }

    const hd = hashDomainPattern?.exec(url);
    if (hd?.hash.groups.domain) {
      return createRouteInfo(
        'tot',
        hd.hash.groups.domain,
        null,
      );
    }

    const hdir = hashDirectPattern?.exec(url);
    if (hdir?.hash.groups.domain) {
      return createRouteInfo(
        'tot',
        hdir.hash.groups.domain,
        null,
      );
    }

    const qm = queryMemberPattern?.exec(url);
    if (qm?.search.groups.domain && qm.search.groups.member) {
      return createRouteInfo(
        'tot',
        qm.search.groups.domain,
        qm.search.groups.member,
      );
    }

    const qd = queryDomainPattern?.exec(url);
    if (qd?.search.groups.domain) {
      return createRouteInfo(
        'tot',
        qd.search.groups.domain,
        null,
      );
    }

    return createRouteInfo('tot', null, null);
  }

  // Fallback string/regex parser for environments without URLPattern
  const isolatedLegacyMatch = trimmed.match(/^#(?:method|type|event)-([\w-]+)$/);
  if (isolatedLegacyMatch) {
    return createRouteInfo('tot', null, isolatedLegacyMatch[1]);
  }

  const hashIndex = trimmed.indexOf('#');
  let pathPart = '';
  let hashPart = '';

  if (hashIndex !== -1) {
    pathPart = trimmed.slice(0, hashIndex);
    hashPart = trimmed.slice(hashIndex + 1);
  } else if (trimmed.startsWith('?')) {
    hashPart = trimmed.slice(1);
  } else {
    pathPart = trimmed;
  }

  const legacyHashMatch = hashPart.match(/^(?:method|type|event)-([\w-]+)$/);
  const legacyMember = legacyHashMatch ? legacyHashMatch[1] : null;

  const pathSegments = pathPart
    .split('/')
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && !s.endsWith('.html'));

  if (
    pathSegments.length > 0 &&
    (pathSegments[0] === 'devtools-protocol' || pathSegments[0] === 'debugger-protocol-viewer')
  ) {
    pathSegments.shift();
  }

  if (pathSegments.length > 0) {
    /** @type {TargetKind} */
    let target = 'tot';
    let domain = null;

    const targetIndex = pathSegments.findIndex((s) => TARGET_MAP.has(s.toLowerCase()));
    if (targetIndex !== -1) {
      target = normalizeTarget(pathSegments[targetIndex]);
      if (pathSegments.length > targetIndex + 1) {
        domain = pathSegments[targetIndex + 1];
      }
    } else {
      domain = pathSegments[0];
    }

    return createRouteInfo(target, domain, legacyMember);
  }

  let cleanHash = hashPart;
  if (cleanHash.startsWith('/')) cleanHash = cleanHash.slice(1);
  if (!cleanHash) return createRouteInfo('tot', null, null);

  /** @type {TargetKind} */
  let target = 'tot';
  let targetAndRest = cleanHash;

  const slashIndex = cleanHash.indexOf('/');
  if (slashIndex !== -1) {
    const potentialTarget = cleanHash.slice(0, slashIndex).toLowerCase();
    if (TARGET_MAP.has(potentialTarget)) {
      target = normalizeTarget(potentialTarget);
      targetAndRest = cleanHash.slice(slashIndex + 1);
    }
  } else if (TARGET_MAP.has(cleanHash.toLowerCase())) {
    target = normalizeTarget(cleanHash);
    targetAndRest = '';
  }

  targetAndRest = targetAndRest.replace(/\/+$/, '');
  if (!targetAndRest) return createRouteInfo(target, null, null);

  const dotIndex = targetAndRest.indexOf('.');
  if (dotIndex !== -1) {
    return createRouteInfo(
      target,
      targetAndRest.slice(0, dotIndex),
      targetAndRest.slice(dotIndex + 1) || null,
    );
  }

  return createRouteInfo(target, targetAndRest, null);
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
