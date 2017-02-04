# Compo.JS
Extremely light, fast and easy to understand,
component based **UI** library for web application programming.

## What Compo.JS is?
* **Small (really small!) and well documented js file, contains one global function**
* **HTML based definition of components**
* **Small set of additional attributes**
* **Natural, manageble DOM Nodes as components**
* **Natural DOM events**
* **Only five new methods to use**
* **Up to five methods to implement**
* **Reactive programming oriented API and lifecicle**

## What Compo.JS is not?
* **MAGIC CARPET**
* **SILVER BULLET**
* **NUMBER OF NEW CONCEPTIONS**

## How to create UI component

		<div as="hallo-world">
			<input ref="input" placeholder="type here your name">
			<h1>Hallo <span ref="name">Anonimous</span>!</h1>
			<script>
				this.ref.input.onkeyup=function(e){
					this.setData(this.ref.input.value);
				}.bind(this);

				this.onSetData = function(data){
					this.ref.name.innerText = data || 'Anonimous';
				};
			</script>
		</div>

Looks like web page, when i was young, is not it?

- Yes, but it is reusable component!

## How to use UI component
