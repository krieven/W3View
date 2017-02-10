# How to use Compo.JS
Firstly, You need to define Your components. 
Definition of components can be placed in the 
page inside &lt;SCRIPT&gt; tag with type="text/compo",
and readed from its textContent property
or it can be loaded via XHR or JSONP.

Anyway it is the string, that should be 
parsed by **Compo.parse** method.
This string can contain any number of components definitions.

## Creating of UI component with Compo.JS
One component definition - is the markup of one HTMLElement,
it can contain embedded constructor script,
like this:

		<div as="hallo-world">
			<input ref="input" placeholder="type your name here">
			<h1>Hallo <span ref="name">Anonimous</span>!</h1>
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

####Here:
+ "this" - is the reference to DIV, that is instance of "hallo-world".
+ attribute "ref" - is some one like *id*, inside the component.
+ "this.ref" - is the table of references to corresponded elements.

The "constructor" is the body of function.
This function will be binded to HTMLElement, that will be instantiated 
by Compo.JS and executed with *this*, referenced to this instance.

### Attributes
One component definition - is the markup for one HTMLElement, 
and all what can be used in any HTMLElement markup - can be used here.

### Additional attributes
As you can see - example uses small set of additional attributes 
in the component definition, here is the explanation of them.

#### In the root of component definition
* **as** - name of component, by this name it can be instantiated. 
Think about this attribute value as about name of component class.
* **tagName** - Compo.JS utilizes power of browser to prepare 
definitions, so - tags such as TR and TD cannot be used as root of 
components and anywhere outside of TABLE tag, but you can define any tag,
anywhere by using tagName attribute. 

**tagName** attribute can also be used in the component definition subtree, 
for example:

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
      this.controlSum=function(data){
        return data.id+"*"+data.content;
      }
      this.onSetData=function(data){
        this.ref.id.innerText=data.id;
        this.ref.content.innerText=data.content;
      };
    </constructor>
  </div>


#### In the component definition tree
* **ref** - specifyes reference name of the element, element can be 
accessed from constructor script via **this.ref['value of ref attribute']**
* **useTag** - you can define some "general purpose" components and then 
instantiate them with different tag names.

The difference between **tagName** and **useTag** is that the tagName attribute 
will change tagName during declaration of component,  useTag - during 
instantiation. The tagName attribute can be used with any tag, but useTag
have effect only with Custom Elements.

**Special ref="content"**, If element with ref="content" is specified 
inside component definition, 
then this element will be used to mount children elements in.
For example:

	//definition of sample-component
	<div as="sample-component">
		<h1>Hallo</h1>
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
			<h1>Hallo</h1>
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
+ **created** by Compo.create method, 
+ **mounted** by instance.mount method, 
+ **updated** by instance.setData, instance.mergeData or instance.update methods, 
+ **unmounted** by instance.unmount, 
+ and finally, recursively **destroyed** by instance.destroy method. 

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

All of these handlers optionally can be defined in the constructor script. 

## Using of Compo.JS API
Create instance of Compo, there can be more than one instance of Compo 
and the number of separate applications can be mounted on the page.
Also one Compo app can use the number of mounting points on the page, 
and it can run the number of Compo apps inside one Compo app. 
This is the real power of Javascript, of old good Javascript.

	var compo = new Compo(appConf);

Here - appConf is any object, it can be accessed as **this.factory.appConf**
inside constructors of components.

Parse definition of components from string,
string can contain any number of definitions and you can call compo.parse
more then one times to add new components.

	compo.parse(componentsDefinitionString); 

create component instance from Compo by name

	var instance = compo.create('double-hallo-world'); 

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
		
when you will remove the element permanently, call

		instance.destroy(); // and forget it


