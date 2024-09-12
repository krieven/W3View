class CustomModules extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    moduleLoader({}, 'app.w3v.html', reader, function (factory) {
      factory.create('app').mount(shadow);
      const style = document.createElement('style');
      style.textContent = `
* {
  box-sizing: border-box;
}
clear {clear:both;display:block;}
[col]{float:left}
[col="1"]{width:	8.3333%;}
[col="2"]{width:	16.6667%;}
[col="3"]{width:	25.0000%;}
[col="4"]{width:	33.3333%;}
[col="5"]{width:	41.6667%;}
[col="6"]{width:	50.0000%;}
[col="7"]{width:	58.3333%;}
[col="8"]{width:	66.6667%;}
[col="9"]{width:	75.0000%;}
[col="10"]{width:	83.3333%;}
[col="11"]{width:	91.6667%;}
[col="12"]{width:	100.0000%;}`
      shadow.appendChild(style)
    })

  }
}

customElements.define("custom-modules", CustomModules);
