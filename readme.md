# Compo.JS
Extremely light, fast and easy to understand **UI** library 
for web application programming, provides Custom Elements technology.

**Get power of Custom Elements right now** with 6 kB script.

## What Compo.JS is?
* **Small (really small!) and well documented browser script 
contains one global constructor**
* **HTML based definition of components**
* **Small set of additional attributes**
* **Natural, manageble DOM Nodes as component instances**
* **Natural DOM events**
* **Only five new methods to use**
* **Up to five methods to implement**
* **API and lifecicle oriented on reactive programming**

## What Compo.JS is not?
* **MAGIC CARPET**
* **SILVER BULLET**
* **NUMBER OF NEW CONCEPTIONS**
* **COFFEE MAKER**

## How to create UI component with Compo.JS ?
Component definition is markup for one HTML Element.
Just write some HTML markup and embedded constructor script like this:

		<div as="hallo-world">
			<input ref="input" placeholder="type your name here">
			<h1>Hallo <span ref="name">Anonimous</span>!</h1>
			<script>
			// also you can use <constructor> tag instead of script tag
				this.ref.input.onkeyup = function(e){
					this.setData(this.ref.input.value);
				}.bind(this);
				this.onSetData = function(data){
					this.ref.name.innerText = data || 'Anonimous';
				};
			</script>
		</div>

Looks like web page when i was young, is not it? 
Yes, but it is **reusable component**!
It can be used as simple application,
and it can be used as part of more complex app inside another component, 
for examole:

		<div as="hallo-app">
			<hallo-world></hallo-world>
			<hr>
			<hallo-world></hallo-world>
		</div>

### Additional attributes
One component definition is markup for one HTML Element, 
and all what can be used in any HTML Element markup - can be used here, 
with some exceptions.

As you can see - example uses small set of additional attributes 
in the component definition, lets explain that.

#### In the root of component definition
* **as** - name of component, with this name prepared component is 
stored in the Compo, by this name it can be found and created. Think about
this name as about name of class.

#### In the component definition subtree
* **ref** - hook to element will be created with 
value of this attribute as name, then element can be 
accessed from constructor script via this.ref['value of ref attribute']
* **tagName** - Compo.JS utilizes power of browser parser during parse 
definitions, so - tags such as TR and TD cannot be used as root of 
components and anywhere outside of TABLE, but you can define any tag,
anywhere by using tagName attribute.
* **useTag** - you can define some universal purpose components and 
instantiate them with different tag names.


### Lifecicle and lifecicle callbacks


## How to use Compo.JS?
Create instance of Compo

	var compo = new Compo();

parse definitions of components from string,
string can contain any amount of definitions

	compo.parse('<div as..........'); 

create DOMNode from Compo.registry  by name

	var instance = compo.create('name-from-as-attribute'); 

append instance into current DOM tree
optionally you can specify index in target.children, where
instance will be placed

	instance.mount(document.element, index); 
		
set data and repaint

		instance.setData({some:data, that: instance, can: recive});

or

		instance.mergeData(data); //it is your opinion

or

		instance.update(); //if data already setted and can be changed by external routine

when you need to remove the instance from DOM tree

		instance.unmount(); //you can mount it later
		
when you will remove the element permanently

		instance.destroy(); // and forget it


   
