# Compo.JS
Extremely light, fast and easy to understand **UI** library 
for web application programming, provides Custom Elements technology.

**Get power of Custom Elements right now** with 6 kB of clear code.

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
			//constructor script, 
			//also you can use CONSTRUCTOR tag instead of SCRIPT tag
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
for example:

		<div as="hallo-app">
			<hallo-world></hallo-world>
			<hr>
			<hallo-world></hallo-world>
		</div>

### Attributes
One component definition is markup for one HTML Element, 
and all what can be used in any HTML Element markup - can be used here.

### Additional attributes
As you can see - example uses small set of additional attributes 
in the component definition, lets explain that.

#### In the root of component definition
* **as** - name of component, by this name it can be instantiated. 
Think about this attribute value as about name of class.

#### In the component definition tree
* **ref** - specifyes hook name of the element, element can be 
accessed from constructor script via **this.ref['value of ref attribute']**
* **tagName** - Compo.JS utilizes power of browser parser to prepare 
definitions, so - tags such as TR and TD cannot be used as root of 
components and anywhere outside of TABLE, but you can define any tag,
anywhere by using tagName attribute.
* **useTag** - you can define some universal purpose components and 
instantiate them with different tag names.

If Element with ref="content" is specified inside component definition, 
then this Element will be used to mount children Elements in.
For example:

	//definition of sample-component
	<div as="sample-component">
		<h1>Hallo</h1>
		<div ref="content"></div>
	</div>
	//and using of sample-component inside container
	<div as="container">
		You are here
		<sample-component>
			This should be placed into content
		</sample-component>
	</div>

The resulted markup of container will be

	<div as="container">
		You are here
		<div as="sample-component">
			<h1>Hallo</h1>
			<div ref="content">
				This should be placed into content
			</div>
		</div>
	</div>
	
If the Element with ref="content" is not specified, then children will be 
simple appended.

### Lifecicle and lifecicle handlers
The lifecicle of component instance is very simple, instance can be:
1. **created** by Compo.create method, 
2. **mounted** by instance.mount method, 
3. **updated** by instance.setData, instance.mergeData or instance.update methods, 
4. **unmounted** by instance.unmount, 
5. and finally, recursively **destroyed** by instance.destroy method. 

Respectively Compo.JS produces five lifecicle events:
* when instanse is created (by Compo.create method) and 
constructor script is executed, then **create** event is fired, 
you can handle it by specifying **this.onCreate** method inside 
constructor script.
* when instance is mounted into DOM tree, then **mount** event is fired,
handle it by **this.onMount** method.
* before instance is unmounted, **unmount** event occures, **this.onUnmount** 
handler can catch it.
* before instance is destroyed, it will be automatically unmounted, 
then **this.onDestroy** method will be called.

all of these handlers can be specifyed in the constructor script. 

### API of Compo.JS components
Each Compo.JS component is instance of HTMLElement and extends it API by

#### Properties:
**ref** - table of hooks 

**factory** - instance of Compo, that is created this component instance

#### Lifecicle methods:
**mount(target: HTMLElement, index?: number)**

**unmount()**

**setData(data: any)**

**mergeData(data: Object)**

**update()**

**destroy()**

#### Event handlers:
**onCreate()**

**onMount()**

**onUnmount()**

**onSetData(data: any)**

**onDestroy()**

#### Methods:


## How to use Compo.JS?
Create definitions of components

Create instance of Compo

	var compo = new Compo();

parse definitions of components from string,
string can contain any number of definitions

	compo.parse('<div as..........'); 

create DOMNode from Compo.registry  by name

	var instance = compo.create('name-from-as-attribute'); 

append instance into current DOM tree,
optionally you can specify index in target.children, where
instance will be placed

	instance.mount(document.element, index); 
		
set data and update

		instance.setData({some:data, that: instance, should: recive});

or

		instance.mergeData(data); //it is your opinion

or

		instance.update(); //if data already setted and can be changed by external routine

when you need to remove the instance from DOM tree

		instance.unmount(); //you can mount it later
		
when you will remove the element permanently

		instance.destroy(); // and forget it


   
