'use strict';

function Compo(){
	this.registry = {};
	var compo = this;
	var mixin = {};
	/**
	 * Mount element into target content
	 * at index position
	 * 
	 * @param {DOMNode} target - destination target
	 * @param {number} index - index in destination
	 */
	mixin.mount=function(target, index){
		target = target.ref && target.ref.content ? target.ref.content : target;
		this.unmount();
		if(index === undefined || target.childrem.length <= index ) 
			target.appendChild(this);
		else target.insertBefore(this,target.children[index < 0 ? 0 : index]);
		this.onMount();
	};
	/**
	 * Unmount element from DOM tree
	 */
	mixin.unmount=function(){
		this.onUnmount();
		if(this.parentNode) this.parentNode.removeChild(this);
	}
	/**
	 * mergeData and setData - public API methods for
	 * setting data into element, user defined onSetData callback will
	 * be called immediately
	 * mergeData - create or partially update this.data by recursive merging
	 * setData - set this.data as link to its argument
	 * 
	 * @param {any} data
	 */
	mixin.mergeData=function(data){
		this.data=this.data || {};
		compo.copyProps(data,this.data);
		this.setData(this.data);
	};
	mixin.setData=function(data){
		this.data=data;
		if(typeof this.controlSum === 'function'){
			var newSum = this.controlSum(data);
			if(newSum !== undefined && newSum === this.oldSum){
				return;
			}
			this.oldSum = newSum;
		}
		this.onSetData(this.data);
	};
	/**
	 * Update element properties from its data
	 * 
	 * @param {boolean} ignoreSum - if true,
	 * then controlSum checking will be ignored
	 */
	mixin.update=function(ignoreSum){
		if (!ignoreSum) {
			this.setData(this.data);
		} else {
			if(typeof this.controlSum === 'function'){
				this.oldSum = this.controlSum(this.data);
			}
			this.onSetData(this.data);
		}
	};
	/**
	 * recursively destroy self and subtree
	 */
	mixin.destroy=function(){
		if(this.unmount){
			this.unmount();
		} else this.parentNode.removeChild(this);
		if(this.onDestroy){
			this.onDestroy();
		}
		while(this.children.length){
			if(!this.children[0].destroy){
				this.children[0].destroy = mixin.destroy;
			} 
			this.children[0].destroy();
		}
	};

	///lifecycle callbacks
	/**
	 * all of these callbacks already presented in each
	 * instance of Compo components.
	 * Author of component can override each of them.
	 */
	/**
	 * Mock, callback on this.mergeData and this.setData
	 */
	mixin.onSetData=function(data){};
	/**
	 * controlSum
	 * this method can be used for reduce
	 * calculations during rerender of this element
	 * 
	 * if the result of this method is not undefined and same as 
	 * previous, onSetData will not be called
	 * and rerender will not be performed
	 */
	mixin.controlSum=function(data){return undefined;};
	/**
	 * Mock, callbacks on element.mount and element.unmount
	 * in this time you can touch parentElement if needed,
	 * onMount will be called after inserting into DOM tree
	 * onUnmount - before removing
	 */
	mixin.onMount=function(){};
	mixin.onUnmount=function(){};
	/**
	 * Mock, callback called immediately after element created
	 * before mount 
	 */
	mixin.onCreate=function(){};
	/**
	 * Mock, callback called when destroy
	 * Please cleanup all references to this,
	 * including callbacks, placed into any kind of dispatchers,
	 * observables and event listeners
	 */
	mixin.onDestroy=function(){};
	/**
	 * Make preparat from sample HTMLElement
	 */
	function prepare (root){
		var res={};
		res.tgn=root.getAttribute('tagName') || root.tagName;
		res.as=root.getAttribute('as');
		res.ref=root.getAttribute('ref');
		res.attr=root.attributes;
		res.ch=[];
		res.script='';
		var ch=root.childNodes;
		for(var i=0; i < ch.length; i++){
			if(!ch[i].tagName){
				if(ch[i].textContent.trim()){
					res.ch.push({nodeValue:ch[i].textContent});
				}
				continue;
			}
			var tgn=ch[i].tagName.toUpperCase();
			if(tgn==='CONSTRUCTOR' || tgn==='SCRIPT'){
				res.script="\n"+ch[i].textContent+
					"\n//# sourceURL=compo/"+res.as+".constructor";
				res.script = new Function(res.script);
			} else {
				var child = prepare(ch[i]);
				delete child.script;
				delete child.as;
				res.ch.push(child);
			}
		}
		res.script = res.script || function(){};
		return res;
	}
	/**
	 * register Components, takes definitions from
	 * string, append new definitions into registry
	 * @param {string} str
	 * @returns {void} 
	 */
	compo.parse=function(str){
		var matrix=document.createElement('div');
		matrix.innerHTML=str.trim();
		var ch=matrix.children;
		for(var i=0;i<ch.length;i++){
			var asName=(ch[i].getAttribute('as') || '').toUpperCase();
			if( asName && !compo.registry[asName] ) {
				compo.registry[asName]={};
				var prep = prepare(ch[i]);
				delete prep.ref;
				compo.registry[asName].prep=prep;
			}
		}
	};

	/**
	 * Magic method, - factory of components - 
	 * does all dirty work at DOM nodes creation,
	 * attribute setting, adding children and references registration
	 */
	compo.create=function(name, attr, ch, root){
		name=name.toUpperCase();
		var instance;
		//если есть зарегистрированный компонент с таким именем
		//тогда создадим его инстанс из препарата
		if(compo.registry[name]){
			//взять препарат
			var prep=compo.registry[name].prep;
			//если в препарате есть функция для создания
			//инстанса, возвратить результат её работы
			if(prep.create) return prep.create('',attr,ch,root);
			//определить имя тэга
			//если тэг определён для создаваемого инстанса
			//с помощью атрибута, необходимо использовать значение атрибута
			var tagname = attr && attr.getNamedItem ?
				attr.getNamedItem('useTag') : false;
			//иначе нужно применить имя тэга из препарата
			tagname = tagname ? tagname.value : prep.tgn;
			//создаём инстанс 
			instance=document.createElement(tagname);
			instance.as=prep.as;
			//назначить ссылку на элемент для вставки контента,
			//по умолчанию - на самого себя 
			instance.ref={content:instance};
			//если в препарате указаны атрибуты
			//пройти и установить их в инстанс
			if(prep.attr && prep.attr.length)
			for(var i=0;i < prep.attr.length;i++){
				var at=prep.attr[i];
				instance.setAttribute(at.name, at.value);
			}
			//если в препарате указаны вложенные ноды
			//пройти и добавить их
			if(prep.ch && prep.ch.length)
			for(var i=0;i < prep.ch.length;i++){
				//если нода текстовая
				if(!prep.ch[i].tgn){
					//создать и установить её
					instance.appendChild(document.createTextNode(prep.ch[i].nodeValue));
					continue;
				}
				//иначе создать ноду этой фабрикой,
				//указывая в качестве корня себя и
				//в качестве параметров ноды - атрибуты и 
				//вложенные ноды из её описания в инстансе
				var cch=compo.create(prep.ch[i].tgn, prep.ch[i].attr, prep.ch[i].ch,instance);
				//если у созданной ноды есть атрибут ref
				//добавить ссылку на ноду в ref инстанса
				var ref=cch.getAttribute('ref');
				if(ref){
					instance.ref[ref]=cch;
				}
				//добавить ноду в инстанс 
				instance.appendChild(cch);
				if (cch.onMount) cch.onMount();
			}
		} 
		//если нет зарегистрированного компонента с таким именем
		//просто создадим элемент
		else {
			instance=document.createElement(name);
			instance.ref={content:instance};
		}
		//начинаем заполнять инстанс из параметров
		// - такой вариант выполняется всегда при условии, если
		//инстанс является вложенной нодой,
		//или если Вам так вдруг захотелось и Вы сами указали параметры
		if(!root) root=instance;
		//ставим атрибуты
		if(attr && attr.length)
		for(var i = 0; i < attr.length; i++){
			instance.setAttribute(attr[i].name, attr[i].value);
		}
		//вставляем дочерние ноды в ref.content
		if(ch && ch.length)
		for(var i = 0; i < ch.length; i++){
			//если нода текстовая
			if(!ch[i].tgn){
				instance.ref.content.appendChild(document.createTextNode(ch[i].nodeValue));
				continue;
			}
			//иначе создаём этой фабрикой, указывая атрибуты и деток из 
			//параметров
			var cch=compo.create(ch[i].tgn, ch[i].attr, ch[i].ch, root);
			//устанавливаем ref в корень, если он есть
			var ref=cch.getAttribute('ref');
			if(ref){
				root.ref=root.ref || {}; 
				root.ref[ref]=cch;
			}
			//монтируем дочернюю ноду в контент текущей
			if(cch.mount){
				cch.mount(instance);
			} else {
				instance.ref.content.appendChild(cch);
			}
		}
		//микшируем Compo API, если инстанс - экземпляр зарегистрированного
		//компонента, вызываем конструктор и отрабатываем
		//пользовательское событие на создание
		if(compo.registry[name]){
			if(compo.registry[name].prep && compo.registry[name].prep.script){
				instance.constructor=compo.registry[name].prep.script;
				compo.copyProps(mixin, instance);
				instance.constructor();
				instance.onCreate();
			}
		}
		//всем создаваемым нодам микшируем деструктор
		//для каскадного разрушения
		instance.destroy = mixin.destroy;
		return instance;
	};

	/**
	 * recursively merges two object's ownPropertys 
	 * 
	 * @param {Object} from - sourсe object
	 * @param {Object} to - destination object
	 * @returns void
	 */
	compo.copyProps=function(from,to){
		if(typeof from !== 'object' || typeof to !== 'object'){ return; }
			for(var k in from){
				if(!from.hasOwnProperty(k)) continue;
				if(typeof from[k] === 'object' && !(from[k] instanceof Array)){
						if(from[k]===to[k]) continue;
						to[k]=to[k] || {};
						compo.copyProps(from[k], to[k]);
						continue;
				}
				to[k] = from[k];
			}
	};
	//TODO remove this helper, 
	//replaced by "array-iterator" builtin component
	compo.setArray=function(target,array,tofill,fillers){
		var ready=target.children;
		for(var i=0;i<ready.length || i<array.length;i++){
			if(ready[i] && i>=array.length){
				target.removeChild(ready[i]);
				i--;
				continue;
			}
			var tfl=tofill[i%tofill.length];
			var fill=fillers[i%fillers.length];
			if(!ready[i]){
				
				tfl=tfl.cloneNode(true);
				
				fill(tfl,i,array[i]);
				target.appendChild(tfl);
				continue;
			}
			fill(ready[i],i,array[i]);
		}	
	};
	///builtin components
	//ANY-TAG
	compo.parse('<div as="ANY-TAG"></div>');
	//ARRAY-ITERATOR
	compo.parse('<div as="ARRAY-ITERATOR"></div>');
	compo.registry['ARRAY-ITERATOR'].prep.script = function(){
		var templates=[];
		while(this.children.length > 0){
			templates.push(this.removeChild(this.children[0]));
		}
		this.ref = {};
		function byExample(tpl){
			if(!tpl.as){
				throw new Error('template must be registered \"Compo\" component');
			}
			var res=compo.create(tpl.as, tpl.attributes)
			return res;
		}
		this.onSetData = function(data){
			if(!data || !Array.isArray(data)){
				data = [];
			}
			for(var i=0; i < data.length || i < this.children.length; i++){
				if(this.children[i] && data.length <= i){
					this.children[i].destroy();
					i--;
					continue;
				}
				if(!this.children[i]){
					var child=byExample(templates[i%templates.length]);
					child.setData(data[i]);
					child.mount(this);
					continue;
				}
				this.children[i].setData(data[i]);
			}
		}
	};
}