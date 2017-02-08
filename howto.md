# How to use Compo.JS?
Create definition of components

Create instance of Compo

	var compo = new Compo();

parse definition of components from string,
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


   
