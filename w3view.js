/**
 * @author Vitaly Dmitriev, 2016
 */
'use strict';
String.prototype.trim = String.prototype.trim || function () { return this; };

function W3View(appContext) {
	var document = W3View.document || window.document;
	var factory = this;

	var registry = {};
	var modules = {};
	var scripts = {};

	this.getRegistry = function () {
		var result = {};
		for (var k in registry)
			if (!registry[k].builtin) result[k] = registry[k];
		return result;
	};
	this.setRegistry = function (newRegistry) {
		for (var k in newRegistry)
			registry[k] = newRegistry[k];
		return factory;
	};


	this.putModule = function (name, module, type) {
		var container = { html: modules, js: scripts };
		container[type] && (container[type][name.toUpperCase()] = module);
	};

	function require(find) {
		var name = (find + '').toUpperCase();
		return scripts[name] && scripts[name].evaluated;
	}

	this.findLocalPrep = function (find) {
		var name = (find + '').toUpperCase();
		return registry[name] && registry[name].prep || undefined;
	};

	this.findPrep = function (find) {
		var prep;
		if (prep = this.findLocalPrep(find)) {
			return prep;
		}
		var path = (find + '').toUpperCase().split(':');
		return path.length > 1 && modules[path[0]] && modules[path[0]].findPrep(path.slice(1).join(':'));
	};

	var initInstance = function (instance, name) {
		var prep = factory.findLocalPrep(name);
		if (prep) {
			if (prep.superc) {
				initInstance(instance, prep.superc);
			}
			if (prep.script) {
				instance.__ = prep.script;
				instance.__(appContext, factory, document, require);
				instance.onCreate();
			}
		}
	};

	function nmToObj(nm) {
		var res = {};
		for (var i = 0; i < nm.length; i++) {
			res[nm[i].name.toLowerCase()] = nm[i].value;
		}
		return res;
	}

	function setAttributes(instance, attr) {
		if (attr && instance && instance.setAttribute)
			for (var key in attr) {
				instance.setAttribute(key, attr[key]);
			}
	}

	function prepare(root) {
		var res = {};
		res.tgn = root.getAttribute('tagname') || root.tagName;
		res.as = root.getAttribute('as');
		res.attr = nmToObj(root.attributes);
		if (res.attr.ref) { res.attr._ref = res.attr.ref; delete res.attr.ref; }
		res.ch = [];
		res.superc = root.getAttribute('super') || undefined;
		var ch = root.childNodes;
		for (var i = 0; i < ch.length; i++) {
			var cChild = ch[i];
			var textContent = cChild.textContent || cChild.innerHTML || cChild.nodeValue || '';
			if (cChild.nodeType > 3) continue;
			if (!cChild.tagName) {
				if (textContent.trim())
					res.ch.push(textContent);
				continue;
			}
			var tgn = cChild.tagName.toUpperCase();
			if (tgn === 'CONSTRUCTOR' || tgn === 'SCRIPT') {
				var construct =
					(factory.src ? ("/*" + root.outerHTML.replace(textContent, 'see script below').replace('*/', '*\\/')) + '*/\n' : '') +
					(textContent) +
					(factory.src ? "\n//# sourceURL=W3View:///" + factory.src + "<" + res.as + ">" : '');
				res.script = new Function('appContext,factory,document,require', construct);
			} else {
				var child = prepare(cChild);
				delete child.script;
				delete child.as;
				res.ch.push(child);
			}
		}
		return res;
	}

	/**
	 * register Components, takes definitions from
	 * string, append new definitions into registry
	 * @param {string} str
	 * @returns {W3View || str} 
	 */
	this.parse = function (str) {
		var matrix = document.createElement('div');
		matrix.innerHTML = str;
		var ch = matrix.children;
		if (ch.length) {
			this.register(ch);
			return this;
		}
		else return str;
	};


	this.register = function (ch) {
		for (var i = 0; i < ch.length; i++) {
			this.registerElement(ch[i]);
		}
	};

	this.registerElement = function (el) {
		if (el.tagName.toUpperCase() === 'IMPORT' && el.getAttribute('type')) {
			var type = el.getAttribute('type').toLowerCase();
			if (type === 'html' || type === 'js') {
				this.imports = this.imports || [];
				this.imports.push(
					{
						'type': type,
						'src': el.getAttribute('src'),
						'name': el.getAttribute('as')
					}
				);
			}
			return;
		}
		var asName = (el.getAttribute('as') || '').toUpperCase();
		if (asName) {
			if (registry[asName]) {
				throw new Error(asName + ' - is already registered component')
			}
			registry[asName] = { prep: prepare(el) };
		}
	};

	function makeFromPrep(tagname, prep) {
		//создаём инстанс 
		var instance = document.createElement(tagname);

		instance.as = prep.as;
		//назначить ссылку на элемент для вставки контента,
		//по умолчанию - на самого себя 
		instance.ref = { content: instance };
		//*/
		//если в препарате указаны атрибуты
		//пройти и установить их в инстанс
		setAttributes(instance, prep.attr);
		//если в препарате указаны вложенные ноды
		//пройти и добавить их
		if (prep.ch && prep.ch.length)
			for (var i = 0; i < prep.ch.length; i++) {
				//если нода текстовая
				if (!prep.ch[i].tgn) {
					//создать и установить её
					instance.appendChild(document.createTextNode(prep.ch[i]));
					continue;
				}
				//иначе создать ноду этой фабрикой,
				//указывая в качестве корня себя и
				//в качестве параметров ноды - атрибуты и 
				//вложенные ноды из её описания в инстансе
				var cch = factory.create(prep.ch[i].tgn, prep.ch[i].attr, prep.ch[i].ch, instance);
				//если у созданной ноды есть атрибут ref
				//добавить ссылку на ноду в ref инстанса
				var ref = cch.getAttribute('_ref');
				if (ref) {
					instance.ref[ref] = cch;
				}
				//добавить ноду в инстанс 
				instance.appendChild(cch);
				if (cch.onMount) cch.onMount();
			}
		//*/
		return instance;
	}

	/**
	 * Magic method, - factory of components - 
	 * does all dirty work during DOM nodes creation,
	 * attribute setting, adding children and references registration
	 */
	this.create = function (name, attr, ch, root) {
		attr = attr || {};
		ch = ch || [];
		var instance;
		var prep = this.findLocalPrep(name);
		var mix = W3View.mix;
		if (prep) {
			//имя описано текущей фабрикой
			if (this.findPrep(prep.tgn)) {
				//базовое имя описано текущей фабрикой или модулем
				var prepattr = mix(mix({}, prep.attr), attr.usetag && { usetag: attr.usetag } || {});
				instance = this.create(prep.tgn, prepattr, prep.ch);
			} else {
				//базовое имя стандартное
				instance = makeFromPrep(attr.usetag || prep.tgn, prep);
			}
		} else {
			var path = name.toUpperCase().split(':');
			if (path.length > 1 && modules[path[0]]) {
				//имя ссылается на модуль
				instance = modules[path[0]]
					.create(path.slice(1).join(':'), attr);
				instance.fullTgn = name;
			} else {
				//имя стандартное
				instance = document.createElement(name);
			}
			instance.ref = instance.ref || { content: instance };
		}
		root || (root = instance);
		setAttributes(instance, attr);
		if (ch && ch.length)
			for (var i = 0; i < ch.length; i++) {
				if (!ch[i].tgn) {
					instance.ref.content.appendChild(document.createTextNode(ch[i]));
					continue;
				}
				var cch = this.create(ch[i].tgn, ch[i].attr, ch[i].ch, root);
				var ref = cch.getAttribute('_ref');
				if (ref) {
					root.ref = root.ref || {};
					root.ref[ref] = cch;
				}
				if (cch.mount) {
					cch.mount(instance);
				} else {
					instance.ref.content.appendChild(cch);
				}
			}
		var mixin = W3View.mixin;
		if (prep) {
			mix(instance, mixin, true);
			initInstance(instance, name);
		}

		return instance;
	};

	this.byExample = function (tpl) {
		if (!tpl.as) {
			throw new Error('Sample should be registered component');
		}
		var attrs = {};
		for (var i = 0; i < tpl.attributes.length; i++) {
			var att = tpl.attributes[i];
			if (tpl[att.name] && typeof tpl[att.name] === 'function') {
				continue;
			}
			attrs[att.name] = att.value;
		}
		var res = this.create(tpl.fullTgn || tpl.as, attrs);
		return res;
	};

	///builtin components
	//ARRAY-ITERATOR
	registry['ARRAY-ITERATOR'] = { prep: { tgn: "DIV", as: "ARRAY-ITERATOR", attr: { as: "ARRAY-ITERATOR" } } };
	registry['ARRAY-ITERATOR'].builtin = true;
	this.findLocalPrep('ARRAY-ITERATOR').script = function (appContext, factory) {
		var examples = [];
		while (this.children.length > 0) {
			examples.push(this.removeChild(this.children[0]));
		}

		this.onSetData = function (array, opts) {
			if (!array) array = [];
			if (!Array.isArray(array)) {
				array = [array];
			}
			for (var i = 0; i < array.length || i < this.children.length; i++) {
				if (this.children[i] && array.length <= i) {
					this.children[i].destroy();
					i--;
					continue;
				}
				var item = array[i];
				var child = this.children[i];
				if (!child) {
					child = factory.byExample(examples[i % examples.length]);
					child.mount(this);
				}
				child.setData(item, opts, i);
			}
		}
	};
};

/**
 * adds all properties from mixin into trg,
 * 
 * @param {object} trg
 * @param {object} mixin
 * @param {boolean} notOverride
 * @returns {object} trg
 */
W3View.mix = function (trg, mixin, dontOverride) {
	trg = trg || {}; mixin = mixin || {};
	for (var key in mixin) {
		trg[key] = (dontOverride ? trg[key] : null) || mixin[key];
	}
	return trg;
};

W3View.mixin = {};
/**
 * Recursively calls onStart handlers
 */
W3View.mixin.start = function () {
	if (this.onStart) {
		this.onStart();
	}
	for (var i = 0; this.children && i < this.children.length; i++) {
		var ch = this.children[i];
		ch.start = ch.start || W3View.mixin.start;
		ch.start();
	}
};
/**
 * Recursively calls onStop handlers
 */
W3View.mixin.stop = function () {
	if (this.onStop) {
		this.onStop();
	}
	for (var i = 0; this.children && i < this.children.length; i++) {
		var ch = this.children[i];
		ch.stop = ch.stop || W3View.mixin.stop;
		ch.stop();
	}
};

W3View.mixin.onStart = function () { };
/**
 * Please cleanup all references to this,
 * including handlers, placed into any kind of dispatchers,
 * observables and event listeners
 */
W3View.mixin.onStop = function () { };

/**
 * Mount element into target content
 * at index position
 * 
 * @param {Element} target - destination target
 * @param {number} index - index in destination
 */
W3View.mixin.mount = function (target, index) {
	target = target.ref && target.ref.content ? target.ref.content : target;
	this.unmount();
	if (index === undefined || target.childNodes.length <= index)
		target.appendChild(this);
	else target.insertBefore(this, target.childNodes[index < 0 ? 0 : index]);
	this.onMount();
};
/**
 * Unmount element from DOM tree
 */
W3View.mixin.unmount = function () {
	if (this.parentNode) {
		this.onUnmount && this.onUnmount();
		this.parentNode.removeChild(this);
	}
};

/**
 * setData - public API methods for
 * setting data into element, user defined onSetData handler will
 * be called immediately
 * 
 * @param {any} data
 * @param {any} opts
 * @param {any} a1
 */
W3View.mixin.setData = function (data, opts, a1) {
	this.onSetData && this.onSetData(data, opts, a1);
};
/**
 * recursively destroys self and subtree
 */
W3View.mixin.destroy = function () {
	this.unmount &&	this.unmount() || this.parentNode.removeChild(this);
	this.onDestroy && this.onDestroy();
	this.onStop && this.onStop();
	
	while (this.children.length) {
		this.children[0].destroy = this.children[0].destroy || W3View.mixin.destroy;
		this.children[0].destroy();
	}
};

///lifecycle handlers
/**
 * all of these handlers already presented in each
 * instance of W3View components.
 * Author of component can override each of them.
 */
/**
 * handler on this.setData
 */
W3View.mixin.onSetData = function (data, opts) { };

/**
 * handlers on element.mount and element.unmount
 * in this time you can touch parentElement if needed,
 * onMount will be called after inserting into DOM tree
 * onUnmount - before removing
 */
W3View.mixin.onMount = function () { };
W3View.mixin.onUnmount = function () { };

/**
 * handler called immediately when element created
 * before mount 
 */
W3View.mixin.onCreate = function () { };
/**
 * handler called when destroy
 * Please cleanup all references to this,
 * including handlers, placed into any kind of dispatchers,
 * observables and event listeners
 */
W3View.mixin.onDestroy = function () { };

if (typeof (module) === 'object') {
	module.exports = W3View;
}
