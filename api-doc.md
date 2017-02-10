# Compo.JS API

## API of Compo
Compo is the constructor function, instance of compo can be created by calling of

	var compo = new Compo();

Each Compo instance contains two methods
* parse
* create

## API of Compo.JS components
Each Compo.JS component is instance of HTMLElement and extends it API by

### Properties:
*ref* - table of references, - elements in the component tree, marked by **ref**
attribute can be accessed from constructor via this.ref[value_of_ref_attribute].
Only ref's, defined in the current component definition are accesible.

*factory* - instance of Compo, that is created this component instance.

### Lifecicle methods:
It is recomended to use lifecicle methods 
for components instead of standard appendChild, insertBefore and removeChild 
methods, for properly lifecicle executions.

*mount(target: HTMLElement, index?: number)* - mounts instance into DOM subtree 
of target (in the target.ref.content 
or in the target itself, if ref.content is not specified), 
at the position of index , if index parameter is defined, 
otherwise appends it to the end. If instance currently mounted, then unmount 
will be called automatically before mounting. 
**mount** immediately calls onMount.

*unmount()* - removes this instance from DOM tree, then calls onUnmount handler.

*setData(data: any)* - sets data and calls onSetData handler.

*mergeData(data: Object)* - merges its argument into previously setted data 
and calls setData with result of merging as argument.

*update()* - just calls setData with previously setted data as argument.

*destroy()* - calls unmount if mounted, then calls onDestroy event handler 
and recursively destroys all DOM subtree of this instance 
(executes destroy on all mounted children).

### Event handlers:
*onCreate()* - will be called when component instance created and 
its constructor executed.

*onMount()* - will be called when component is mounted into DOM tree.

*onUnmount()* - will be called before unmounting of component from DOM tree.
Its chance to free all resources that were allocated with onMount handler.

*onSetData(data: any)* - should make DOM update.

*onDestroy()* - time to free resources, allocated by component instance, 
including all callbacks, observers, listeners, intervals and timeouts, eah.

### Methods:
*controlSum(data: any): string | number | any* - this method can reduce calculations 
during data updating, should return product of its argument that determines 
that data is not changed if previous calculated product is same.
If your onSetData recursively calculates fibonacchi number, it can be important.

