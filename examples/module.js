function w3view(appContext){var factory=[(function(appContext){
return new W3View(appContext)
.setRegistry({"ARRAY-ITERATOR":{"prep":{"tgn":"DIV","as":"ARRAY-ITERATOR","attr":{"as":"ARRAY-ITERATOR"},"ch":[],"script":function (appContext,factory,document){
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
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"ARRAY-ITERATOR":{"prep":{"tgn":"DIV","as":"ARRAY-ITERATOR","attr":{"as":"ARRAY-ITERATOR"},"ch":[],"script":function (appContext,factory,document){
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
"WIN":{"prep":{"tgn":"DIV","as":"win","attr":{"as":"win","style":"position:fixed;\n\t\t\t\t\t\t\t border:1px solid black;\n\t\t\t\t\t\t\t padding:5px;\n\t\t\t\t\t\t\t background-color: #cccccc;\n\t\t\t\t\t\t\t box-shadow: 5px 5px 5px rgba(0,0,0,0.3);\n\t\t\t\t\t\t\t "},"ch":[{"text":"\n\t\t\t\t"},{"tgn":"DIV","attr":{"ref":"topbar","style":"padding:5px 10px;\n\t\t\t\t\t\theight:20px;background-color:blue;\n\t\t\t\t\t\tcolor:#fff;\n\t\t\t\t\t\tfont-weight:bold;\n\t\t\t\t\t\tcursor:pointer;"},"ch":[{"text":"\n\t\t\t\t\t"},{"tgn":"SPAN","attr":{"ref":"caption"},"ch":[{"text":"caption"}]},{"text":"\n\t\t\t\t\t"},{"tgn":"BUTTON","attr":{"ref":"close","style":"float:right;cursor:pointer;\n\t\t\t\t\t\t\tpadding:0px 5px;\n\t\t\t\t\t\t\tborder:1px solid #fff;\n\t\t\t\t\t\t\tbackground-color:#f00;\n\t\t\t\t\t\t\tvertical-align:middle;height:100%;line-height:1px;\n\t\t\t\t\t\t\tcolor:#fff; font-weight:bold;"},"ch":[{"text":"X"}]},{"text":"\n\t\t\t\t\t"},{"tgn":"DIV","attr":{"style":"clear:both;"},"ch":[]},{"text":"\n\t\t\t\t"}]},{"text":"\n\t\t\t\t"},{"tgn":"DIV","attr":{"ref":"content","style":"padding:10px;width:400px; min-width: 300px;\n\t\t\t\t\t\tbackground-color:white;box-sizing: border-box; overflow:auto;"},"ch":[{"text":"\n\t\t\t\t"}]},{"text":"\n\t\t\t\t"},{"tgn":"DIV","attr":{"ref":"bottombar"},"ch":[{"text":"\n\t\t\t\t\t"},{"tgn":"DIV","attr":{"ref":"resize","style":"float:right;\n\t\t\t\t\t\t\tpadding:5px;\n\t\t\t\t\t\t\tmargin:5px;\n\t\t\t\t\t\t\tcursor:se-resize;\n\t\t\t\t\t\t\tborder-width:0px 2px 2px 0px;\n\t\t\t\t\t\t\tborder-color: black;\n\t\t\t\t\t\t\tborder-style: solid;\n\t\t\t\t\t\t\t"},"ch":[]},{"text":"\n\t\t\t\t"}]},{"text":"\n\t\t\t\t"},{"text":"\n\t\t\t"}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.close.onclick=this.close=function(e){
						e.stopPropagation();
						if(this.onclose && !this.onclose()){
							return;
						}
						this.unmount();
					}.bind(this);
					
					this.onmousedown = this.ref.topbar.onclick = this.ref.resize.onclick = function(){
						this.pop();
					}.bind(this);
					
					this.pop=function(){
						this.mount(this.parentElement);
					}.bind(this);

					var sx, sy, sh, sw, st, sl;
					
					var onDown=function(event){
						event.stopPropagation();
						sx=event.clientX; sy=event.clientY;
						sh=this.ref.content.offsetHeight;
						sw=this.ref.content.offsetWidth;
						sl=this.offsetLeft;
						st=this.offsetTop;
					}.bind(this);

					function onMouseDown(action){
						return function(e){
							onDown(e);
							window.addEventListener('mousemove',action);
							window.addEventListener('mouseup',function up(){
								window.removeEventListener('mousemove',action);
								window.removeEventListener('mouseup',up);
							});
						};
					}

					var resize=function(e){
						e.preventDefault();
						this.ref.content.style.width =  (sw+e.clientX-sx)+'px';
						this.ref.content.style.height =  (sh+e.clientY-sy)+'px';
						return false;
					}.bind(this);

					this.ref.resize.onmousedown = onMouseDown(resize);

					var move=function(e){
						e.preventDefault();
						var left = (sl+e.clientX-sx);
						this.style.left =  (left<0?0:left)+'px';
						var top = (st+e.clientY-sy);
						this.style.top =  (top<0?0:top)+'px';
						return false;
					}.bind(this);

					this.ref.topbar.onmousedown = onMouseDown(move);

					this.onSetData=function(input){
						this.ref.caption.innerText=input.caption;
						this.ref.content.innerHTML=input.content;
						return false;
					};
					
					this.ref.caption.innerText=this.getAttribute('caption');
				
//# sourceURL=W3View:///win
}}},
"MODALWIN":{"prep":{"tgn":"DIV","as":"modalwin","attr":{"as":"modalwin","style":"position:fixed; \n\t\t\t\twidth:100%; height:100%; \n\t\t\t\tleft:0px; top:0px;\n\t\t\t\tpadding-left:30%;\n\t\t\t\tpadding-top:30vh;\n\t\t\t\tbackground-color:rgba(0,0,0,0.5);\n\t\t\t\t"},"ch":[{"text":"\n\t\t\t\t"},{"tgn":"WIN","attr":{"ref":"modal","caption":"modal window"},"ch":[{"text":"\n\t\t\t\t\t"},{"tgn":"HELLO-WORLD","attr":{},"ch":[{"text":"\n\t\t\t\t\t\tHey! i am \"modal\" popup win, what is your name?\n\t\t\t\t\t\t"},{"tgn":"DIV","attr":{"ref":"content"},"ch":[{"text":"\n\t\t\t\t\t\t"}]},{"text":"\n\t\t\t\t\t"}]},{"text":"\n\t\t\t\t\t"},{"tgn":"DIV","attr":{"style":"text-align:right;"},"ch":[{"text":"\n\t\t\t\t\t\t"},{"tgn":"BUTTON","attr":{"ref":"close"},"ch":[{"text":"Close"}]},{"text":"\n\t\t\t\t\t"}]},{"text":"\n\t\t\t\t"}]},{"text":"\n\t\t\t\t"},{"text":"\n\t\t\t"}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.modal.onclose=function(){
						this.unmount();
					}.bind(this);
					this.ref.close.onclick=function(e){
						this.ref.modal.close(e);
					}.bind(this);

					this.ref.modal.pop=function(){};

					this.onSetData=function(data){
						this.ref.modal.caption.innerText=data.caption;
						this.ref.content.innerHTML=data.content;
					}
				
//# sourceURL=W3View:///modalwin
}}},
"HELLO-WORLD":{"prep":{"tgn":"DIV","as":"hello-world","attr":{"as":"hello-world"},"ch":[{"text":"\n\t\t\t\t"},{"tgn":"H1","attr":{"ref":"content"},"ch":[]},{"text":"\n\t\t\t\t"},{"tgn":"INPUT","attr":{"ref":"input","placeholder":"type your name here"},"ch":[]},{"text":"\n\t\t\t\t"},{"tgn":"H2","attr":{},"ch":[{"text":"Hello "},{"tgn":"SPAN","attr":{"ref":"name"},"ch":[{"text":"Anonimous"}]},{"text":"!"}]},{"text":"\n\t\t\t\t"},{"text":"\n\t\t\t"}],"script":function anonymous(appContext,factory,document
/**/) {


					//CONSTRUCTOR tag should be used inside SCRIPT tag
					this.ref.input.onkeyup = function(e){
						this.setData(this.ref.input.value);
					}.bind(this);
					this.onSetData = function(data){
						this.ref.name.innerText = data || 'Anonimous';
					};
				
//# sourceURL=W3View:///hello-world
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"text":"\n\t\t\t\t"},{"tgn":"BUTTON","attr":{"ref":"button"},"ch":[{"text":"click me"}]},{"text":"\n\t\t\t\t"},{"tgn":"BUTTON","attr":{"ref":"button1"},"ch":[{"text":"click me too"}]},{"text":"\n\t\t\t\t"},{"text":"\n\t\t\t"}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.button.onclick=function(){
						var win=factory.create('win');
						win.onclose=function(){ this.destroy(); };
						win.mount(this.parentElement);
						win.setData({
							caption:'I am popup win', 
							content:"<h1>Hello popup</h1><p>This popup was generated by W3View.</p>"+
							"<p>You can move and resize this popup window.</p>"+
							"<p>You can click first button again to open new instances.</p>"
						});
						return false;
					};
					this.ref.button1.onclick=function(){
					if(!this.win){
							this.win=factory.create('modalwin');
						}
						this.win.mount(this.parentElement);
						return false;
					};
				
//# sourceURL=W3View:///app
}}}});
})(appContext)];
factory[0].putModule('grid',factory[0]);
factory[0].putModule('window',factory[1]);
factory[1].putModule('grid',factory[0]);
return factory[0];};;
//# sourceURL=W3View:///examples/grid.w3v.html
