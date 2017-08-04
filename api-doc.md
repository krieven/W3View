# W3View API

## API of W3View
W3View is the constructor function, instance of w3view can be created by calling of

	var w3view = new W3View(appContext);

*appContext* - any object, you can use it for initialyze your components.

Each W3View instance contains two methods
* w3view.parse(definitions: string) - parses definitions and register them in the factory
* w3view.create(tagName: string, attributes?: {}) - 

## API of W3View components
Each W3View component is instance of HTMLElement and extends it API by

### Properties:
*ref* - table of references, - elements in the component tree, marked by **ref**
attribute can be accessed from constructor via this.ref[value_of_ref_attribute].
Only ref's, defined in the current component definition are accesible.

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

*setData(data: any, opts?: any)* - sets data and calls onSetData handler.

*destroy()* - calls unmount if mounted, then calls onDestroy event handler 
and recursively destroys all DOM subtree of this instance 
(executes destroy on all mounted children).

### Event handlers:
You should define your event handlers if 

*onCreate()* - will be called when component instance created and 
its constructor executed.

*onMount()* - will be called when component is mounted into DOM tree.

*onUnmount()* - will be called before unmounting of component from DOM tree.
Its chance to free all resources that were allocated with onMount handler.

*onSetData(data: any, opts?: any)* - should make DOM update.

*onDestroy()* - time to free resources, allocated by component instance, 
including all callbacks, observers, listeners, intervals and timeouts, eah.

