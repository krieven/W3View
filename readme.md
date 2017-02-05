# Compo.JS
Extremely light, fast and easy to understand **UI** library 
for web application programming by using composition of components.

## What Compo.JS is?
* **Small (really small!) and well documented browser script contains one global function**
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
Just write some HTML markup and embedded javascript like this:

		<div as="hallo-world">
			<input ref="input" placeholder="type here your name">
			<h1>Hallo <span ref="name">Anonimous</span>!</h1>
			<script>
				this.ref.input.onkeyup = function(e){
					this.setData(this.ref.input.value);
				}.bind(this);
				this.onSetData = function(data){
					this.ref.name.innerText = data || 'Anonimous';
				};
			</script>
		</div>

Looks like web page, when i was young, is not it? 
Yes, but it is **reusable component**! 
It can be used inside your page as simple application,
and it can be used as part of more complex app inside another component, 
for examole:

		<div as="greeting-box">
			<hallo-world></hallo-world>
		</div>


## How to use UI component?
