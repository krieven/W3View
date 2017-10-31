var w3view = function(appContext){
var factory = new W3View(appContext);
	factory.setRegistry(
{"ARRAY-ITERATOR":{"prep":{"tgn":"DIV","as":"ARRAY-ITERATOR","attr":{"as":"ARRAY-ITERATOR"},"ch":[],"script":function (appContext,factory,document){
		var templates=[];
		while(this.children.length > 0){
			templates.push(this.removeChild(this.children[0]));
		}
		this.ref = {};

		this.onSetData = function(array, opts){
			if(!array) array=[];
			if(!Array.isArray(array)) {
				array=[array];
			}
			for(var i=0; i < array.length || i < this.children.length; i++){
				if(this.children[i] && array.length <= i){
					this.children[i].destroy();
					i--;
					continue;
				}
				var item = array[i];
				var child=this.children[i];
				if(!child){
				  child=factory.byExample(templates[i%templates.length]);
					child.mount(this);
				}
				child.setData(item, opts, i);
			}
		}
	}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app","style":"box-sizing:border-box;overflow:auto;\n        position:fixed;\n        left:0px;top:0px;width:100%;height:100%;\n        padding:20px;"},"ch":[{"text":"\n        \n        "},{"tgn":"ARRAY-ITERATOR","attr":{"usetag":"table","ref":"tb","border":"1","style":"float:left;width:98%;height:100%;"},"ch":[{"text":"\n          "},{"tgn":"ROW","attr":{},"ch":[]},{"text":"\n        "}]},{"text":"\n        "},{"tgn":"SCROLLBAR","attr":{"ref":"scroll"},"ch":[]},{"text":"\n        "},{"text":"\n      "}],"script":function anonymous(appContext,factory,document
/**/) {



          var data = {};
          this.onSetData=function(input){
            data = input || {list:[]};
            data.len=data.len=Math.round(this.ref.scroll.offsetHeight/30);
            data.offset = data.offset>(data.list.length-data.len)?(data.list.length-data.len):data.offset;
            if(data.offset+data.len > data.list.length) data.offset=data.list.length-data.len;
            if(data.offset < 0) data.offset=0;
            
            var frame=data.list.slice(data.offset,data.offset+data.len);
            this.ref.tb.setData(frame);
            this.ref.scroll.setData({app:this, data:data});
          };

          var resize =  function(){
            this.setData(data);
          }.bind(this);

          var keyDown=function(e){
            var sh={38:+1, 40:-1}[e.keyCode];
            if(sh !== undefined){
              if(!e.ctrlKey && !e.altKey && !e.shiftKey) e.preventDefault(); 
              else return;
              data.offset-=sh;
              this.setData(data);
            }
          }.bind(this);

          this.ref.tb.onwheel =function(e){
            e.preventDefault();
            if(e.deltaY>0){
              data.offset++;
            } else{
              data.offset--;
            }
            this.setData(data);
            return false;
          }.bind(this);
          
          this.onMount = function(){
            window.addEventListener('resize',resize);
            window.addEventListener('keydown',keyDown);
          };

          this.onUnmount = function(){
            window.removeEventListener('resize',resize);
            window.removeEventListener('keydown',keyDown);
          };

        
//# sourceURL=W3View:///app
}}},
"ROW":{"prep":{"tgn":"tr","as":"row","attr":{"as":"row","super":"array-iterator","tagname":"tr"},"ch":[{"text":"\n          "},{"tgn":"CELL","attr":{},"ch":[]},{"text":"\n          "},{"text":"\n      "}],"super":"array-iterator","script":function anonymous(appContext,factory,document
/**/) {


            var superSetData = this.onSetData.bind(this);

            this.onSetData=function(data){
              superSetData(data);
              if(data[0]%3===0){
                this.style.backgroundColor="#ccffcc";
              }
              else{
                this.style.backgroundColor="";
              }
            };

          
//# sourceURL=W3View:///row
}}},
"CELL":{"prep":{"tgn":"DIV","as":"cell","attr":{"as":"cell","usetag":"td","style":"text-align:center;width:10%;"},"ch":[{"text":"\n        "},{"text":"\n      "}],"script":function anonymous(appContext,factory,document
/**/) {



          this.onSetData=function(data){
            this.innerText=data;
          };

        
//# sourceURL=W3View:///cell
}}},
"SCROLLBAR":{"prep":{"tgn":"DIV","as":"scrollbar","attr":{"as":"scrollbar","style":"float:right;width:2%; height: 100%;\n        border:1px solid black;"},"ch":[{"text":"\n        "},{"tgn":"DIV","attr":{"ref":"scroller","style":"cursor:pointer;position:relative; \n          width:100%; height:100px;\n          min-height:20px;\n          border:2px solid black;\n          background-color:#999999;margin-top:0px;"},"ch":[]},{"text":"\n        "},{"text":"\n      "}],"script":function anonymous(appContext,factory,document
/**/) {


          var app = {}, data = {};
          var hh = 0;

          this.onSetData=function(input){
            data = input.data;
            app = input.app;
            var h=data.len/data.list.length*this.offsetHeight;
            this.ref.scroller.style.height=(h)+'px';
            hh=this.ref.scroller.offsetHeight-h;
            this.ref.scroller.style.top=(data.offset/data.list.length*(this.offsetHeight-hh))+'px';
          };
          var downAt = 0;
          var offsetAt = 0;

          var scrolling = this.ref.scroller.onmousedown=function (e){
            downAt = e.clientY;
            offsetAt = data.offset;
            document.body.addEventListener('mousemove', onmousemove);
            document.body.addEventListener('mouseup', onmouseup);
          };

          var onmouseup=function(e){
            document.body.removeEventListener('mousemove', onmousemove);
            document.body.removeEventListener('mouseup', onmouseup);
          };

          var onmousemove=function(e){
            e.preventDefault();
            var eY=e.clientY;
            if(downAt<0) {eY=e.offsetY;}
            var dy = Math.round((eY-downAt)/(this.offsetHeight-hh)*data.list.length);
            
            var offset = offsetAt+dy;
            app.setData({list:data.list, offset:offset});
            return false;
          }.bind(this);

          this.onclick = function(e){
            if(e.target !== this) return;
            offsetAt=0;
            downAt=-1;
            onmousemove(e);
          };

        
//# sourceURL=W3View:///scrollbar
}}}});
	return factory;};
//# sourceURL=W3View:///library
if(typeof module === "object") {var W3View = require('w3view'); module.exports = w3view;}
