# How to use W3View
Firstly, You need to define Your components. 
Definition of components can be placed in the 
page inside &lt;SCRIPT&gt; tag with type="text/w3view",
and readed from its textContent property
or it can be loaded via XHR or JSONP.

Anyway it is the string, that should be 
parsed by **W3View.parse** method.
This string can contain any number of components definitions.

## Creating of UI component with W3View
One component definition - is the markup of one HTMLElement,
it can contain embedded constructor script,
like this:

		<div as="hello-world">
			<input ref="input" placeholder="type your name here">
			<h1>Hello <span ref="name">Anonimous</span>!</h1>
			<script>
			//constructor, 
			//also you can use CONSTRUCTOR tag instead of SCRIPT tag
				this.ref.input.onkeyup = function(e){
					this.setData(this.ref.input.value);
				}.bind(this);
				this.onSetData = function(data){
					this.ref.name.innerText = data || 'Anonimous';
				};
			</script>
		</div>

#### Here:
+ "this" - is the reference to DIV, that is instance of "hello-world".
+ attribute "ref" - is some one like **id**, inside the component.
+ "this.ref" - is the table of references to corresponded elements.

The "constructor" is the body of function.
This function will be binded to HTMLElement, that will be instantiated 
by W3View and executed with **this**, referenced to this instance.

### Attributes
One component definition - is the markup for one HTMLElement, 
and all what can be used in any HTMLElement markup - can be used here.

### Additional attributes
As you can see - example uses small set of additional attributes 
in the component definition, here is the explanation of them.

#### In the root of component definition
* **as** - name of component, by this name it can be instantiated. 
Think about this attribute value as about name of component class.
* **super** - the Custon Element can extends behavior of other Custom W3view Element
if this attribute is specified in the root or component definition. 
The constructor of super component will be called before calling the constructor of current. Value of **super** attribute
should be the name of Custom W3view Element.
* **tagName** - W3View utilizes power of browser to prepare 
definitions, so - tags such as TR and TD cannot be used as root of 
components and anywhere outside of TABLE tag, but you can define any tag,
anywhere by using tagName attribute. 

**tagName** attribute can also be used in the component definition subtree, 
for example:

		//table row definition
		<div as="list-item" tagName="tr">
			<div tagName="td" style="padding:20px;">
				Number of elements in the array:
				<h1 ref="id"></h1>
			</div>
			<div tagName="td" style="padding:20px;">
				Updating time:
				<h1 ref="content"></h1>
			</div>
			<constructor>
				this.onSetData=function(data){
					//data should be {id: any, content: any}
					this.ref.id.innerText=data.id;
					this.ref.content.innerText=data.content;
				};
			</constructor>
		</div>

		//creating the table with "array-iterator" builtin component
		<div as="app">

			<array-iterator ref="list" useTag="table" style="border: 1px solid black;">
				<list-item 
					style="font-weight:bold;background-color:#FFFFFF;color:#000000;">
				</list-item>
				<list-item 
					style="font-weight:bold;color:#FFFFFF;background-color:#000000;">
				</list-item>
				<list-item 
					style="font-weight:bold;color:white;background-color:green;">
				</list-item>
			</array-iterator>

	    <constructor>
				this.onSetData=function(data){
					//data should be {id: any, content: any}[]
					this.ref.list.setData(data);
				};
			</constructor>
		</div>

#### In the component definition subtree

* **ref** - specifyes reference name of the element, the element can be 
accessed from constructor script via **this.ref.refName**
* **useTag** - you can define some "general purpose" components and then 
instantiate them with different tag names.

The difference between **tagName** and **useTag** is that the tagName attribute 
will change tagName during declaration of component,  useTag - during 
instantiation. The tagName attribute can be used with any tag, but useTag
have effect only with Custom W3view Elements. See previous example.


***Special !!*** 
**ref="content"**, If element with ref="content" is specified 
inside component definition, 
then this element will be used to mount children elements in.
For example:

	//definition of sample-component
	<div as="sample-component">
		<h1>Hello</h1>
		<div ref="content"></div>
	</div>
	
	//and using of sample-component in the container
	<div as="container">
		You are here
		<sample-component>
			This should be placed into content of "sample-component"
			<div ref="content">
				this "content" is the ref for "container", 
				not for "sample-component"
			</div>
		</sample-component>
	</div>

The resulted structure will be

	<div as="container">
		You are here
		<div as="sample-component">
			<h1>Hello</h1>
			<div ref="content">
				This should be placed into content of "sample-component"
				<div ref="content">
					this "content" is the ref for "container", 
					not for "sample-component"
				</div>
			</div>
		</div>
	</div>
	
If the Element with ref="content" is not specified, then children will be 
simple appended to the root of component.

### Lifecicle and lifecicle handlers
The lifecicle of component instance is very simple, instance can be:
+ **created** by W3View.create method, 
+ **mounted** by instance.mount method, 
+ **updated** by instance.setData, instance.mergeData or instance.update methods, 
+ **unmounted** by instance.unmount, 
+ and finally, recursively **destroyed** by instance.destroy method. 

Respectively W3View produces five lifecicle events:
* when instanse is **created** (by W3View.create method) and 
constructor script is executed, then **create** event is fired, 
you can handle it by specifying **this.onCreate** method inside 
constructor script.
* when instance is **mounted** into DOM tree, then **mount** event is fired,
handle it by **this.onMount** method.
* before instance is **unmounted**, **unmount** event occures, **this.onUnmount** 
handler can catch it.
* before instance is **destroyed**, it will be automatically unmounted, 
then **this.onDestroy** method will be called.

All of these handlers optionally can be defined in the constructor script. 

### Writing the constructor
As of W3View component definition is similar to whole HTML page, in the 
constructor You can make all, what You can make in the regular SCRIPT tag, 
but there is the differences. 
The constructor script body is body of function that will be binded to 
component instance, therefore:
+ **this** - in the scope of component *this* is the reference to component 
itself.
+ You already have the table of references to elements in the subtree of 
component, marked by **ref** attribute.

The constructor recives three arguments:
*	appContext
* factory
* document

The lifecicle handlers should be defined here, all callbacks, that is passed
outside the component (such as *window.onresize* and so on) should be detached.
If callback is attached to event source by constructor itself or by onCreate
handler, then it should be detached by onDestroy handler.
If it is attached by onMount handler, then it sholuld be detached by onUnmount.
You should ensure that all attached callbacks will be detached after destroying
of component instance. Elsewhere You can take the memory leak. 

In the onSetData handler You should specify - where data will be placed in the
component, for examle:

		<div as="c-someone">
			<h2 ref="title"></H2>
			<p ref="description"></p>
			<c-details ref="details"></c-details>
			<constructor>

				this.onSetData = function( data ){
					this.ref.title.innerText = data.title;
					this.ref.description.innerText = data.description;
					if( data.description && data.description.trim() ){
						this.ref.description.style.display = '';
					} else {
						this.ref.description.style.display = 'none';
					}
					this.ref.details.setData(data.details);
				}

				var resize = function(){
					// just for example :), in the real world use
					// style sheet
					this.style.width = window.innerWidth/2+'px';
				}.bind(this);
				
				this.onMount = function(){
					window.addEventListener('resize', resize);
				}
				this.onUnmount = function(){
					window.removeEventListener('resize', resize);
				}

			</constructor>
		</div>

As You can see 
+ **onSetData** handler updates properties of DOM nodes.
+ **onMount** adds listener to window.
+ **onUnmount** removes listener.  

## Using of W3View API
Create instance of W3View, there can be more than one instance of W3View 
and the number of separate applications can be mounted on the page.
Also one W3View app can use the number of mounting points on the page, 
and it can run the number of W3View apps inside one W3View app.

	var w3view = new W3View(appContext);

Here - appContext is any object, it can be accessed as **appContext**
inside constructors of components.

Parse definition of components from string,
string can contain any number of definitions and you can call w3view.parse
more then one times to add new components.

	w3view.parse(componentsDefinitionString); 

create component instance from W3View by name

	var instance = w3view.create('double-hello-world', {tagname: 'a', href: '/hello'});

append instance into current DOM tree,
optionally you can specify index in target.children, where
instance will be placed

	instance.mount(document.element, index); 

set data and update

	instance.setData({some:data, that: instance, should: recive}, options, additional);

when you need to remove the instance from DOM tree

		instance.unmount(); //you can mount it again, later
		
when you will remove the element permanently, call

		instance.destroy(); // and forget it


