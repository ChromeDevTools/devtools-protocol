(function () {
  // Application scope.

  var viewmodel = {};
  var viewer;

  function getColor(index, all) {
    var hue = 360 / all * index;
    return "hsl(" + hue + ", 52%, 91%)";
  }

  document.addEventListener('readystatechange', function (e) {
    if (document.readyState == "complete" && protocol) {
      initViewModel(protocol);
      initViewer();
    }
  });

  function initViewModel(protocolData) {
    var domains = protocolData['domains'];
    var domainNames = [];

    domains.forEach(function (domain, i) {
      var name = domain['domain'];
      var color = getColor(i, domains.length);
      var commands = domain['commands'];
      var events = domain['events'];

      var commandNames = commands ? commands.map(getObjName) : null;
      var eventNames = events ? events.map(getObjName) : null;

      domainNames.push(name);

      viewmodel[name] = {
        commandNames: commandNames,
        eventNames: eventNames,
        color: color,
        data: domain
      };
    });

    viewmodel.domainNames = domainNames;
  }

  function initViewer() {
    console.log('initing viewer');

    viewer = new Viewer();
    viewer.setViewModel(viewmodel);
  }

  // Helper functions.

  function genOption(name) {
    var el = document.createElement('option');
    el.value = el.innerText = name;
    return el;
  }

  function emptyElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function populateElement(parent, nodes) {
    nodes.forEach(function (node) {
      parent.appendChild(node);
    });
  }

  function popuplateSelect(selectEl, options, opt_defaultMessage) {
    if (opt_defaultMessage) {
      var defaultOption = genOption(opt_defaultMessage);
      defaultOption.value = '_';
      options = [defaultOption].concat(options);
    }

    populateElement(selectEl, options);
  }

  // Higher order functions.

  function getObjName(o) {
    return o['name'];
  }

  // Viewer Constructor

  function Viewer() {
    this.defaultMethodMessage = 'Show method';
    this.defaultEventMessage = 'Show event';
    this.contentSection = null;
    this.domainSelect = null;
    this.methodSelect = null;
    this.eventSelect = null;
    this.heading = null;
    this.subheading = null;
    this.methodSection = null;
    this.eventsSection = null;

    this.methodTemplateHTML = null;
    this.paramTemplateHTML = null;

    this.decorate_();
    this.attachListeners_();
  }

  Viewer.prototype.decorate_ = function () {
    // Get and assign references to viewer elements.
    this.domainSelect = document.getElementById('select-domain');
    this.methodSelect = document.getElementById('select-method');
    this.eventSelect = document.getElementById('select-events');
    this.contentSection = document.querySelector('.content');
    this.heading = document.querySelector('.heading');
    this.description = document.querySelector('.description');
    this.methodSection = document.querySelector('section.methods');
    this.eventsSection = document.querySelector('section.events');

    this.getTemplateHTML();
  };


  Viewer.prototype.getTemplateHTML = function () {
    this.methodTemplateHTML = document.getElementById('method-template').innerHTML;
    this.paramTemplateHTML = document.getElementById('param-template').innerHTML;
  };

  Viewer.prototype.attachListeners_ = function () {
    this.domainSelect.addEventListener('change', this.handleDomainChange_.bind(this), false);
    this.methodSelect.addEventListener('change', this.handleMethodChange_.bind(this), false);
    this.eventSelect.addEventListener('change', this.handleEventChange_.bind(this), false);
  };

  Viewer.prototype.setViewModel = function (vmodel) {
    // Add option to the drop down.
    populateElement(this.domainSelect, vmodel.domainNames.map(genOption));
  };


  //
  // change domain
  //
  Viewer.prototype.handleDomainChange_ = function (e) {
    var index = e.target.selectedIndex;
    var selectedOption = e.target.querySelectorAll('option')[index];
    var selectedDomain = selectedOption.value;
    this.changeDomain_(selectedDomain);
  };

  Viewer.prototype.changeDomain_ = function (domainId) {
    var model = viewmodel[domainId];

    // Empty method and event drop downs.
    emptyElement(this.methodSelect);
    emptyElement(this.eventSelect);

    var commands = model.commandNames;
    var events = model.eventNames;

    this.setHeading(domainId, model.data['description']);

    // Populate drop downs and sections with new values.

    if (commands) {
      popuplateSelect(this.methodSelect, commands.map(genOption), this.defaultMethodMessage);
      this.populateCommands_(model.data['commands'], this.methodSection, {});
    }

    if (events) {
      popuplateSelect(this.eventSelect, events.map(genOption), this.defaultEventMessage);
//       this.populateEvents_(events, model.data);
      this.populateCommands_(model.data['events'], this.eventsSection, {});
    }

    this.contentSection.style.backgroundColor = model.color;
  };


  Viewer.prototype.setHeading = function (heading, opt_description) {
    this.heading.innerHTML = heading;
    this.description.innerHTML = opt_description || '';
  };

  // change method
  Viewer.prototype.handleMethodChange_ = function (e) {
    var domainId = this.getSelectValue_(this.domainSelect);
    var model = viewmodel[domainId];

    var methodName = this.getSelectValue_(e.target);

    if (methodName == '_') {
      return this.changeDomain_(domainId);
    }

    var commandData = model.data['commands'].filter(function (command) {
      return command['name'] == methodName;
    })[0];

    this.removeItems_(this.methodSection);
    this.populateCommands_([commandData], this.methodSection, {exclusive: true});
  };


  // change event
  Viewer.prototype.handleEventChange_ = function (e) {
    var domainId = this.getSelectValue_(this.domainSelect);
    var model = viewmodel[domainId];

    var eventName = this.getSelectValue_(this.eventSelect);

    if (eventName == '_') {
      return this.changeDomain_(domainId);
    }

    var eventData = model.data['events'].filter(function (ev) {
      return ev['name'] == eventName;
    })[0];

    this.removeItems_(this.eventsSection);
    this.populateCommands_([eventData], this.eventsSection, {exclusive: true});
  };

  Viewer.prototype.populateCommands_ = function (commandList, elem, opts) {
    var wrapperEl = document.createElement('div');
    var templateHTML = this.methodTemplateHTML;

    if (opts.exclusive) {
      this.methodSection.hidden = true;
      this.eventsSection.hidden = true;
    }

    elem.hidden = false;
    this.removeItems_(elem);

    commandList.forEach(function (command) {
      var commandEl = document.createElement('div');
      var name = command['name'];
      var desc = command['description'];
      var params = command['parameters'];

      commandEl.innerHTML = templateHTML;
      commandEl.querySelector('.method-name').innerText = name;
      if (desc)
        commandEl.querySelector('.method-description').innerHTML = desc;

      if (params) {
        this.populateParameters_(params,
          commandEl.querySelector('.parameter-list'));
      } else {
        commandEl.querySelector('.parameter-list').hidden = true;
      }

      wrapperEl.appendChild(commandEl);
    }, this);

    elem.appendChild(wrapperEl);
  };

  Viewer.prototype.populateParameters_ = function (paramData, parent) {
    var templateHTML = this.paramTemplateHTML;

    paramData.forEach(function (param) {
      var name = param['name'];
      var desc = param['description'];
      var isOptional = param['optional'];
      var element = document.createElement('div');
      element.innerHTML = templateHTML;

      element.querySelector('.param-name').innerText = name;

      if (isOptional) {
        element.querySelector('.param-name').classList.add('optional');
      }

      element.querySelector('.param-def').innerHTML = desc || 'No description';

      parent.appendChild(element);
    }, this);


  };

  Viewer.prototype.getSelectValue_ = function (select) {
    var index = select.selectedIndex;
    var selectedOption = select.querySelectorAll('option')[index];

    return selectedOption.value;
  };


  Viewer.prototype.populateEvents_ = function (events, data) {
    console.log(events);
  };

  Viewer.prototype.removeItems_ = function (element) {
    var children = Array.prototype.slice.call(element.childNodes);
    var childCount = children.length;

    for (var i = 0; i < childCount; i++) {
      if (children[i].nodeName != 'H3') {
        element.removeChild(children[i]);
      }
    }
  };

}());
