'use strict';
/**
 * Using:
 * 		Compo.parse(string);//parse definitions of components from string
 * 		var 
 * 
 * Lifecicle:
 *      user -> Compo.parse(string); -- parses 
 *      
 *      user -> instance = Compo.create(componentName) -- returns instance of Compo, defined by componentName
 *      auto -> instance.oncreate(); -- called once , time to make some with attributes
 *      user -> instance.mount(target) -- append instance to the end of target.children
 *      auto -> instance.onmount(); -- called each time instance is mounted
 *      user -> instance.mergeData({k:v}) -- you can set data partially
 *      auto -> instance.onsetdata(data); -- called each time mergeData is called , 
 *              time to make some with data, do not modify this.data object here (as react - props)
 *              here you can pass data forvard to this.ref 
 */
function newCompo(){
	var Compo={mixin:{},registry:{}};
	/**
	 * Монтирует компонент куда надо, когда Монтирует, демотирует из старого места
	 * @param {DomNode} trg место, куда вмонтировать 
	 */
	Compo.mixin.mount=function(trg, index){
		trg = trg.ref && trg.ref.content ? trg.ref.content : trg;
		if(typeof index === 'undefined') trg.appendChild(this);
		else trg.insertBefore(this,trg.children[index]);
		this.onmount();
	};
	Compo.mixin.unmount=function(){
		if(this.parentNode) this.parentNode.removeChild(this);
		this.onunmount();
	}
	/**
	 * 
	 * 
	 * @param {any} data
	 */
	Compo.mixin.mergeData=function(data){
		this.data=this.data || {};
		Compo.copyProps(data,this.data);
		this.setData(this.data);
	};
	
	Compo.mixin.setData=function(data){
		this.data=data;
		if(typeof this.controlSum === 'function'){
			var newSum = this.controlSum(data);
			if(newSum !== undefined && newSum === this.oldSum){
				return;
			}
			this.oldSum = newSum;
		}
		this.onsetdata(this.data);
	};

	///lifecycle callbacks
	/**
	 * Mock, callback on this.mergeData 
	 */
	Compo.mixin.onsetdata=function(data){};
	/**
	 * this method can be used for reduce
	 * calculations during rerender of this component
	 * 
	 * if the result of this function is same as 
	 * previous, onsetdata will not be called
	 */
	Compo.mixin.controlSum=function(data){return undefined;};
	/**
	 * Mock, callbacks on this.mount and this.unmount
	 */
	Compo.mixin.onmount=function(){};
	Compo.mixin.onunmount=function(){};
	/**
	 * Mock, callback called immediately after Component created
	 * before mount 
	 */
	Compo.mixin.oncreate=function(){};
	/**
	 * Mock callback called when destroy;
	 */
	Compo.mixin.ondestroy=function(){};
	/**
	 * 
	 */
	Compo.mixin.destroy=function(){
		if(this.unmount){
			this.unmount();
		} else this.parentNode.removeChild(this);
		if(this.ondestroy){
			this.ondestroy();
		}
		while(this.children.length){
			if(this.children[0].destroy){
				this.children[0].destroy();
			} else this.removeChild(this.children[0]);
		}
	};
	/**
	 * 
	 */
	Compo.prepare=function(root){
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
				var child = Compo.prepare(ch[i]);
				delete child.script;
				delete child.as;
				res.ch.push(child);
			}
		}
		res.script = res.script || function(){};
		return res;
	}
	/**
	 * register classes, 
	 * @param {string} str
	 * @returns {void} 
	 */
	Compo.parse=function(str){
		var matrix=document.createElement('div');
		matrix.innerHTML=str.trim();
		var ch=matrix.children;
		for(var i=0;i<ch.length;i++){
			var asName=(ch[i].getAttribute('as') || '').toUpperCase();
			if( asName && !Compo.registry[asName] ) {
				Compo.registry[asName]={};
				var prep = Compo.prepare(ch[i]);
				delete prep.ref;
				Compo.registry[asName].prep=prep;
			}
		}
	};


	Compo.create=function(name, attr, ch, root){
		name=name.toUpperCase();
		var instance;
		//если есть зарегистрированный компонент с таким именем
		//тогда создадим его инстанс из препарата
		if(Compo.registry[name]){
			//взять препарат
			var prep=Compo.registry[name].prep;
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
				var cch=Compo.create(prep.ch[i].tgn, prep.ch[i].attr, prep.ch[i].ch,instance);
				//если у созданной ноды есть атрибут ref
				//добавить ссылку на ноду в ref инстанса
				var ref=cch.getAttribute('ref');
				if(ref){
					instance.ref[ref]=cch;
				}
				//добавить ноду в инстанс 
				instance.appendChild(cch);
				if (cch.onmount) cch.onmount();
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
			var cch=Compo.create(ch[i].tgn, ch[i].attr, ch[i].ch, root);
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
		if(Compo.registry[name]){
			if(Compo.registry[name].prep && Compo.registry[name].prep.script){
				instance.init=Compo.registry[name].prep.script;
				Compo.copyProps(Compo.mixin, instance);
				instance.init();
				instance.oncreate();
			}
		}
		//всем создаваемым нодам микшируем деструктор
		//для каскадного разрушения
		instance.destroy = Compo.mixin.destroy;
		return instance;
	};

	/**
	 * recursively merges two object's ownPropertys 
	 * @param {any} from - sourсe object
	 * @param {any} to - destination object
	 * @returns void
	 */
	Compo.copyProps=function(from,to){
		if(typeof from !== 'object' || typeof to !== 'object'){ return; }
			for(var k in from){
				if(!from.hasOwnProperty(k)) continue;
				if(typeof from[k] === 'object' && !(from[k] instanceof Array)){
						if(from[k]===to[k]) continue;
						to[k]=to[k] || {};
						Compo.copyProps(from[k], to[k]);
						continue;
				}
				to[k] = from[k];
			}
	};
	//TODO remove this helper, 
	//replaced by "array-iterator" builtin component
	Compo.setArray=function(target,array,tofill,fillers){
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
	Compo.parse('<div as="ARRAY-ITERATOR"></div>');
	Compo.registry['ARRAY-ITERATOR'].prep.script = function(){
		var templates=[];
		while(this.children.length > 0){
			templates.push(this.removeChild(this.children[0]));
		}
		delete this.ref;
		function byExample(tpl){
			if(!tpl.as){
				throw new Error('template must be registered \"Compo\" component');
			}
			var res=Compo.create(tpl.as, tpl.attributes)
			return res;
		}
		this.onsetdata = function(data){
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
	return Compo;
}