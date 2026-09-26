/**
 * @fileoverview DOM Renderer for CDP Domains, Commands, Events, and Types.
 */

/** @import { ProtocolDomain, NormalizedProtocolDomain, ProtocolType, ProtocolCommand, ProtocolEvent, ProtocolParameter, ProtocolBackReference } from '../types/types.d.ts' */

export class ProtocolRenderer {
  /**
   * @param {string} domainName
   * @param {string} domainEntry
   * @returns {string}
   */
  static titleId(domainName, domainEntry) {
    return domainName + '_' + domainEntry;
  }

  /**
   * @param {ProtocolDomain} domain
   * @returns {HTMLElement}
   */
  static renderDomain(domain) {
    const main = document.createElement('div');
    main.className = 'domain';
    if (domain.experimental) {
      main.classList.add('domain-experimental');
    }
    if (domain.deprecated) {
      main.classList.add('domain-deprecated');
    }

    const container = document.createElement('div');
    container.className = 'box';
    main.appendChild(container);
    const header = document.createElement('div');
    header.className = 'box-content';
    container.appendChild(header);

    const title = document.createElement('h2');
    header.appendChild(title);
    title.textContent = domain.domain;
    ProtocolRenderer.applyMarks(domain, title, false);

    if (domain.description) {
      ProtocolRenderer.renderDescription(domain.description, header);
    }

    ProtocolRenderer.renderTableOfContents(domain, header);

    if (domain.commands && domain.commands.length) {
      ProtocolRenderer._renderDomainSection('Methods', 'methods', domain.commands, main, (m) =>
        ProtocolRenderer.renderEventOrMethod(domain, m, false),
      );
    }
    if (domain.events && domain.events.length) {
      ProtocolRenderer._renderDomainSection('Events', 'events', domain.events, main, (e) =>
        ProtocolRenderer.renderEventOrMethod(domain, e, true),
      );
    }
    if (domain.types && domain.types.length) {
      ProtocolRenderer._renderDomainSection('Types', 'types', domain.types, main, (t) =>
        ProtocolRenderer.renderDomainType(domain, t),
      );
    }

    return main;
  }

  /**
   * @template T
   * @param {string} titleText
   * @param {string} sectionId
   * @param {T[]} items
   * @param {HTMLElement} parent
   * @param {(item: T) => HTMLElement} renderItem
   */
  static _renderDomainSection(titleText, sectionId, items, parent, renderItem) {
    const title = document.createElement('h3');
    title.id = sectionId;
    title.textContent = titleText;
    parent.appendChild(title);
    const container = document.createElement('div');
    container.className = 'box';
    parent.appendChild(container);
    for (const item of items) {
      container.appendChild(renderItem(item));
    }
  }

  /**
   * @param {string} titleText
   * @param {ProtocolParameter[] | undefined} items
   * @param {ProtocolDomain} domain
   * @param {HTMLElement} parent
   */
  static renderParameterList(titleText, items, domain, parent) {
    if (!items || !items.length) return;
    const title = document.createElement('h5');
    title.textContent = titleText;
    parent.appendChild(title);
    const container = document.createElement('dl');
    container.className = 'parameter-list';
    parent.appendChild(container);
    for (const item of items) {
      container.appendChild(ProtocolRenderer.renderParameter(domain, item));
    }
  }

  /**
   * @param {ProtocolDomain} domain
   * @param {ProtocolType} type
   * @returns {HTMLElement}
   */
  static renderDomainType(domain, type) {
    const main = document.createElement('div');
    main.className = 'type';
    if (type.deprecated) main.classList.add('deprecated-bg');
    main.appendChild(
      ProtocolRenderer.renderTitle(
        domain.domain,
        type.id,
        type,
        'type',
        Boolean(domain.experimental),
      ),
    );
    if (type.type) {
      const p = document.createElement('p');
      p.textContent = 'Type: ';
      const spanEl = document.createElement('span');
      spanEl.className = 'parameter-type';
      spanEl.textContent = type.type;
      p.appendChild(spanEl);
      main.appendChild(p);
    }
    if (type.description) {
      ProtocolRenderer.renderDescription(type.description, main);
    }
    ProtocolRenderer.renderParameterList('Properties', type.properties, domain, main);
    if (type.enum) {
      const allowedTitle = document.createElement('h5');
      allowedTitle.textContent = 'Allowed values';
      main.appendChild(allowedTitle);
      const p = document.createElement('p');
      p.className = 'enum-values';
      main.appendChild(p);
      type.enum.forEach((value, index) => {
        const code = document.createElement('code');
        code.textContent = value;
        p.append(code);
        if (index < (type.enum?.length ?? 0) - 1) {
          p.append(', ');
        }
      });
    }
    if (type.referencedBy && type.referencedBy.length) {
      // Render back references.
      const title = document.createElement('h5');
      title.textContent = 'Referenced By';
      main.appendChild(title);
      const container = document.createElement('ul');
      container.className = 'references-list';
      main.appendChild(container);
      for (let reference of type.referencedBy) {
        const li = document.createElement('li');
        container.appendChild(li);
        li.appendChild(ProtocolRenderer.renderRef(reference.name));
        const referenceIcon = document.createElement('span');
        referenceIcon.className = 'reference-icon';
        referenceIcon.appendChild(ProtocolRenderer.renderEntityIcon(reference.type));
        li.appendChild(referenceIcon);
      }
    }

    return main;
  }

  /**
   * @param {string} domainName
   * @param {string} title
   * @param {ProtocolCommand | ProtocolEvent | ProtocolType} item
   * @param {'type' | 'event' | 'method' | string} titleType
   * @param {boolean} [isParentDomainExperimental]
   * @returns {HTMLElement}
   */
  static renderTitle(domainName, title, item, titleType, isParentDomainExperimental = false) {
    const heading = document.createElement('h4');
    heading.className = 'monospace text-overflow';
    heading.appendChild(ProtocolRenderer.renderEntityIcon(titleType));

    let id = `${domainName}.${title}`;
    heading.setAttribute('id', ProtocolRenderer.titleId(domainName, title));
    const domainSpan = document.createElement('span');
    domainSpan.className = 'method-domain';
    domainSpan.textContent = domainName + '.';
    heading.appendChild(domainSpan);
    const nameSpan = document.createElement('span');
    nameSpan.className = 'method-name';
    nameSpan.textContent = title;
    heading.appendChild(nameSpan);
    ProtocolRenderer.applyMarks(item, heading, isParentDomainExperimental);
    const link = document.createElement('a');
    link.href = ProtocolRenderer.formatRef(id);
    link.textContent = '#';
    link.className = 'title-link';
    heading.appendChild(link);
    return heading;
  }

  /**
   * @param {ProtocolDomain} domain
   * @param {HTMLElement} container
   */
  static renderTableOfContents(domain, container) {
    const isDomainExp = Boolean(domain.experimental);
    /**
     * @param {ProtocolCommand | ProtocolEvent} method
     * @param {HTMLElement} container
     */
    let renderEventOrMethodEntry = (method, container) =>
      ProtocolRenderer.renderTableOfContentsEntry(domain.domain, method.name, container);
    /**
     * @param {ProtocolType} type
     * @param {HTMLElement} container
     */
    let renderTypeEntry = (type, container) =>
      ProtocolRenderer.renderTableOfContentsEntry(domain.domain, type.id, container);

    if (
      (domain.commands && domain.commands.length) ||
      (domain.events && domain.events.length) ||
      (domain.types && domain.types.length)
    ) {
      const toc = document.createElement('div');
      toc.className = 'domain-toc';
      container.appendChild(toc);
      if (domain.commands && domain.commands.length)
        ProtocolRenderer.renderTableOfContentsSection(
          'Methods',
          'method',
          domain.commands,
          renderEventOrMethodEntry,
          toc,
          isDomainExp,
        );
      if (domain.events && domain.events.length)
        ProtocolRenderer.renderTableOfContentsSection(
          'Events',
          'event',
          domain.events,
          renderEventOrMethodEntry,
          toc,
          isDomainExp,
        );
      if (domain.types && domain.types.length)
        ProtocolRenderer.renderTableOfContentsSection(
          'Types',
          'type',
          domain.types,
          renderTypeEntry,
          toc,
          isDomainExp,
        );
    }
  }

  /**
   * @template {ProtocolCommand | ProtocolEvent | ProtocolType} T
   * @param {string} sectionName
   * @param {string} sectionType
   * @param {Array<T>} entries
   * @param {(item: T, container: HTMLElement) => HTMLElement} renderer
   * @param {HTMLElement} container
   * @param {boolean} [isDomainExp]
   * @returns {HTMLElement}
   */
  static renderTableOfContentsSection(
    sectionName,
    sectionType,
    entries,
    renderer,
    container,
    isDomainExp = false,
  ) {
    const sectionWrapper = document.createElement('div');
    sectionWrapper.className = 'toc-section';
    container.appendChild(sectionWrapper);
    const title = document.createElement('h4');
    title.className = 'toc-section-heading';
    sectionWrapper.appendChild(title);
    const badge = document.createElement('span');
    badge.className = `entity-icon entity-icon-${sectionType}`;
    badge.textContent = sectionType.charAt(0).toUpperCase() + sectionType.slice(1) + 's';
    title.appendChild(badge);

    const section = document.createElement('div');
    section.className = 'toc-entries';
    sectionWrapper.appendChild(section);
    for (let entry of entries) {
      let row = renderer(entry, section);
      ProtocolRenderer.applyMarks(entry, row, isDomainExp);
    }
    return section;
  }

  /**
   * @param {string} domainName
   * @param {string} name
   * @param {HTMLElement} container
   * @returns {HTMLElement}
   */
  static renderTableOfContentsEntry(domainName, name, container) {
    const row = document.createElement('div');
    row.className = 'toc-link';
    container.appendChild(row);
    let id = `${domainName}.${name}`;
    let link = ProtocolRenderer.renderRef(id);
    link.classList.add('monospace');
    row.appendChild(link);
    return row;
  }

  /**
   * @param {ProtocolDomain} domain
   * @param {ProtocolCommand | ProtocolEvent} method
   * @param {boolean} isEvent
   * @returns {HTMLElement}
   */
  static renderEventOrMethod(domain, method, isEvent) {
    const main = document.createElement('div');
    main.className = 'method';
    if (method.deprecated) main.classList.add('deprecated-bg');
    main.appendChild(
      ProtocolRenderer.renderTitle(
        domain.domain,
        method.name,
        method,
        isEvent ? 'event' : 'method',
        Boolean(domain.experimental),
      ),
    );
    if (method.description) {
      ProtocolRenderer.renderDescription(method.description, main);
    }
    ProtocolRenderer.renderParameterList('Parameters', method.parameters, domain, main);
    const command = /** @type {ProtocolCommand} */ (method);
    ProtocolRenderer.renderParameterList('RETURN OBJECT', command.returns, domain, main);
    return main;
  }

  /**
   * @param {ProtocolDomain} domain
   * @param {ProtocolParameter} parameter
   * @returns {DocumentFragment}
   */
  static renderParameter(domain, parameter) {
    let main = document.createDocumentFragment();
    {
      // Render parameter name.
      const name = document.createElement('div');
      name.className = 'parameter-name monospace';
      main.appendChild(name);
      ProtocolRenderer.applyBackground(parameter, name);
      if (parameter.optional) name.classList.add('optional');
      name.textContent = parameter.name || '';
    }
    {
      // Render parameter value.
      const container = document.createElement('div');
      container.className = 'vbox parameter-value';
      main.appendChild(container);
      ProtocolRenderer.applyBackground(parameter, container);
      container.appendChild(ProtocolRenderer.renderTypeLink(domain, parameter));
      const description = document.createElement('span');
      description.className = 'parameter-description';
      container.appendChild(description);
      let descriptions = [];
      if (parameter.description) descriptions.push(parameter.description);
      ProtocolRenderer.renderTextWithCode(descriptions.join(' '), description);
      if (parameter.enum) {
        description.append(' Allowed values: ');
        parameter.enum.forEach((value, index) => {
          const code = document.createElement('code');
          code.textContent = value;
          description.append(code);
          if (index < (parameter.enum?.length ?? 0) - 1) description.append(', ');
          else description.append('.');
        });
      }
      ProtocolRenderer.applyMarks(parameter, description, Boolean(domain.experimental));
    }
    return main;
  }

  /**
   * @param {ProtocolDomain} domain
   * @param {ProtocolParameter} parameter
   * @returns {HTMLElement}
   */
  static renderTypeLink(domain, parameter) {
    const primitiveTypes = new Set(['string', 'integer', 'boolean', 'number', 'object', 'any']);

    if (parameter.type && primitiveTypes.has(parameter.type)) {
      const typeSpan = document.createElement('span');
      typeSpan.className = 'parameter-type';
      typeSpan.textContent = parameter.type;
      return typeSpan;
    }
    if (parameter.$ref) {
      let $ref = parameter.$ref;
      if (!$ref.includes('.')) $ref = domain.domain + '.' + parameter.$ref;
      return ProtocolRenderer.renderRef($ref);
    }
    if (parameter.type === 'array' && parameter.items) {
      const generic = document.createElement('span');
      generic.className = 'parameter-type';
      generic.appendChild(document.createTextNode('array [ '));
      generic.appendChild(ProtocolRenderer.renderTypeLink(domain, parameter.items));
      generic.appendChild(document.createTextNode(' ]'));
      return generic;
    }
    const placeholder = document.createElement('span');
    placeholder.className = 'parameter-type';
    placeholder.textContent = '<TYPE>';
    return placeholder;
  }

  /**
   * @param {string} id
   * @returns {string}
   */
  static formatRef(id) {
    return window.app && window.app.formatRef ? window.app.formatRef(id) : '#/' + id;
  }

  /**
   * @param {string} $ref
   * @returns {HTMLAnchorElement}
   */
  static renderRef($ref) {
    const link = document.createElement('a');
    link.href = ProtocolRenderer.formatRef($ref);
    link.textContent = $ref;
    link.className = 'parameter-type';
    return link;
  }

  /**
   * @param {ProtocolDomain | ProtocolType | ProtocolCommand | ProtocolEvent | ProtocolParameter | null | undefined} item
   * @param {HTMLElement} element
   */
  static applyBackground(item, element) {
    if (!item) return;
    if (item.experimental) element.classList.add('experimental-bg');
    else if (item.deprecated) element.classList.add('deprecated-bg');
  }

  /**
   * @param {ProtocolDomain | ProtocolType | ProtocolCommand | ProtocolEvent | ProtocolParameter | null | undefined} item
   * @param {HTMLElement} element
   * @param {boolean} [isParentDomainExperimental]
   */
  static applyMarks(item, element, isParentDomainExperimental = false) {
    if (!item) return;
    if (item.experimental) {
      if (isParentDomainExperimental) {
        return;
      }
      const expSpan = document.createElement('span');
      expSpan.className = 'experimental';
      expSpan.textContent = 'exp';
      expSpan.title = 'Experimental';
      element.appendChild(expSpan);
    } else if (item.deprecated) {
      const depSpan = document.createElement('span');
      depSpan.className = 'deprecated';
      depSpan.textContent = 'deprecated';
      depSpan.title = 'Deprecated, will be removed';
      element.appendChild(depSpan);
    }
  }

  /**
   * @param {string} type
   * @returns {HTMLElement}
   */
  static renderEntityIcon(type) {
    const norm = type.toLowerCase() === 'command' ? 'method' : type.toLowerCase();
    const label = norm.charAt(0).toUpperCase() + norm.slice(1);
    const icon = document.createElement('span');
    icon.className = `entity-icon entity-icon-${norm}`;
    icon.textContent = label;
    icon.title = label;
    return icon;
  }

  static renderMethodIcon() {
    return ProtocolRenderer.renderEntityIcon('method');
  }

  static renderTypeIcon() {
    return ProtocolRenderer.renderEntityIcon('type');
  }

  static renderEventIcon() {
    return ProtocolRenderer.renderEntityIcon('event');
  }

  /**
   * @param {string} text
   * @param {HTMLElement} container
   */
  static renderTextWithCode(text, container) {
    if (!text) return;
    const clean = text.replace(/^LINT\..*$\n?/gm, '');
    const parts = clean.split(/`([^`]+)`/g);
    for (let i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      if (i % 2 === 1) {
        const code = document.createElement('code');
        code.textContent = parts[i];
        container.appendChild(code);
      } else {
        container.appendChild(document.createTextNode(parts[i]));
      }
    }
  }

  /**
   * @param {string} text
   * @param {HTMLElement} parentElement
   */
  static renderDescription(text, parentElement) {
    if (!text) return;
    const clean = text.replace(/^LINT\..*$\n?/gm, '').trim();
    if (!clean) return;
    const paragraphs = clean.split(/\n\s*\n/);
    for (const para of paragraphs) {
      const p = document.createElement('p');
      ProtocolRenderer.renderTextWithCode(para, p);
      parentElement.appendChild(p);
    }
  }
}
