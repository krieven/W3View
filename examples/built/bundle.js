function appBundle(appContext){var factory=[(function(appContext){
return new W3View(appContext)
.setRegistry({"WIN":{"prep":{"tgn":"DIV","as":"win","attr":{"as":"win","style":"position:fixed;\n\t\t\t\t\t\t\t border:1px solid black;\n\t\t\t\t\t\t\t padding:5px;\n\t\t\t\t\t\t\t background-color: #cccccc;\n\t\t\t\t\t\t\t box-shadow: 5px 5px 5px rgba(0,0,0,0.3);\n\t\t\t\t\t\t\t "},"ch":[{"tgn":"DIV","attr":{"style":"padding:5px 10px;\n\t\t\t\t\t\tbackground-color:blue;color:#fff;\n\t\t\t\t\t\tfont-weight:bold;\n\t\t\t\t\t\tcursor:move;","_ref":"topbar"},"ch":[{"tgn":"SPAN","attr":{"_ref":"caption"},"ch":["caption"],"superc":null},{"tgn":"BUTTON","attr":{"style":"float:right;cursor:pointer;\n\t\t\t\t\t\t\tpadding:0px 5px;\n\t\t\t\t\t\t\tborder:1px solid #fff;\n\t\t\t\t\t\t\tbackground-color:#f00;\n\t\t\t\t\t\t\tvertical-align:middle;color:#fff; font-weight:bold;","_ref":"close"},"ch":["X"],"superc":null},{"tgn":"DIV","attr":{"style":"clear:both;"},"ch":[],"superc":null}],"superc":null},{"tgn":"DIV","attr":{"style":"padding:10px;width:400px; min-width: 300px; min-height:150px;border:1px solid gray;\n\t\t\t\t\t\tbackground-color:white;box-sizing: border-box; overflow:auto;","_ref":"content"},"ch":[],"superc":null},{"tgn":"DIV","attr":{"_ref":"bottombar"},"ch":[{"tgn":"DIV","attr":{"style":"float:right;\n\t\t\t\t\t\t\tpadding:5px;\n\t\t\t\t\t\t\tmargin:5px;\n\t\t\t\t\t\t\tcursor:se-resize;\n\t\t\t\t\t\t\tborder-width:0px 2px 2px 0px;\n\t\t\t\t\t\t\tborder-color: black;\n\t\t\t\t\t\t\tborder-style: solid;\n\t\t\t\t\t\t\t","_ref":"resize"},"ch":[],"superc":null}],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					this.ref.close.onclick=this.close=function(e){
						e = e || window.event;
            if(e && e.stopPropagation) e.stopPropagation(); else event.returnValue = false;
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
						event = event || window.event;
           if (event && event.stopPropagation) event.stopPropagation();
            else window.event.returnValue = false;
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
						e = e || window.event;
						if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
						this.ref.content.style.width =  (sw+e.clientX-sx)+'px';
						this.ref.content.style.height =  (sh+e.clientY-sy)+'px';
						if(this.ref.content.onresize) this.ref.content.onresize();
						return false;
					}.bind(this);

					this.ref.resize.onmousedown = onMouseDown(resize);

					var move=function(e){
						e = e || window.event;
						if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
						var left = (sl+e.clientX-sx);
						this.style.left =  (left)+'px';
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
					
					require('script')();

					this.ref.caption.innerText=this.getAttribute('caption');
				
//# sourceURL=W3View:///<win>
}}},
"MODALWIN":{"prep":{"tgn":"DIV","as":"modalwin","attr":{"as":"modalwin","style":"position:fixed; \n\t\t\t\twidth:100%; height:100%; \n\t\t\t\tleft:0px; top:0px;\n\t\t\t\tpadding-left:30%;\n\t\t\t\tpadding-top:30vh;\n\t\t\t\tbackground-color:rgba(0,0,0,0.5);\n\t\t\t\t"},"ch":[{"tgn":"WIN","attr":{"caption":"modal window","_ref":"modal"},"ch":[{"tgn":"HELLO:DOUBLE-HELLO-WORLD","attr":{},"ch":["\n\t\t\t\t\t\tHey! i am \"modal\" popup win, what is your name?\n\t\t\t\t\t\t",{"tgn":"DIV","attr":{"_ref":"content"},"ch":[],"superc":null}],"superc":null},{"tgn":"DIV","attr":{"style":"text-align:right;"},"ch":[{"tgn":"BUTTON","attr":{"_ref":"close"},"ch":["Close"],"superc":null}],"superc":null}],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					this.ref.modal.onclose=function(){
						this.unmount();
					}.bind(this);
					this.ref.close.onclick=function(e){
						e = e || window.event;
						this.ref.modal.close(e);
					}.bind(this);

					this.ref.modal.pop=function(){};

					this.onSetData=function(data){
						this.ref.modal.caption.innerText=data.caption;
						this.ref.content.innerHTML=data.content;
					}
				
//# sourceURL=W3View:///<modalwin>
}}},
"EXT-WIN":{"prep":{"tgn":"WIN","as":"ext-win","attr":{"as":"ext-win","caption":"extended window","usetag":"a"},"ch":[{"tgn":"DIV","attr":{},"ch":["\n\n\n\t\t\t\tHelloooo! this window is EXT-WIN instance",{"tgn":"BR","attr":{},"ch":[],"superc":null},"\n\t\t\t\tEXT-WIN - is extended win\n\n\n\t\t\t\t"],"superc":null},{"tgn":"BUTTON","attr":{"style":"display:block;width:100%;margin-top:30px;","_ref":"zcaption"},"ch":["\n\t\t\t\t\tBUTTON\n\t\t\t\t"],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					var pcolor;
					var capt = this.ref.caption.innerHTML;
					this.ref.content.addEventListener('mouseover', function(e){
						e = e || window.event;
						pcolor=e.target.style.backgroundColor;
						e.target.style.backgroundColor="#cccccc";
						this.ref.caption.innerText=e.target.tagName+" "+capt;
					}.bind(this));
					this.ref.content.addEventListener('mouseout', function(e){
						e = e || window.event;
						e.target.style.backgroundColor=pcolor || '';
						this.ref.caption.innerText=capt;
					}.bind(this));
				
//# sourceURL=W3View:///<ext-win>
}}},
"GRID-WIN":{"prep":{"tgn":"WIN","as":"grid-win","attr":{"as":"grid-win","caption":"window with grid"},"ch":[{"tgn":"GRID:APP","attr":{"style":"height:100%;min-height: 150px;","_ref":"grid"},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					this.onMount = function(){this.ref.grid.mount(this); this.onMount=function(){};}
				
//# sourceURL=W3View:///<grid-win>
}}},
"CELL":{"prep":{"tgn":"DIV","as":"cell","attr":{"as":"cell","usetag":"td","style":"text-align:center;width:10%;"},"ch":[],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {



          this.onSetData=function(data){
            this.innerText=data;
          };

        
//# sourceURL=W3View:///<cell>
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"BUTTON","attr":{"_ref":"button"},"ch":["open win"],"superc":null},{"tgn":"BUTTON","attr":{"_ref":"button1"},"ch":["open modal win"],"superc":null},{"tgn":"BUTTON","attr":{"_ref":"button2"},"ch":["open grid-win"],"superc":null},{"tgn":"BUTTON","attr":{"_ref":"button3"},"ch":["open ext-win"],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					this.ref.button.onclick=function(){
						var win=factory.create('win');
						win.onclose=function(){ win.destroy(); };
						win.mount(this.parentElement);
						win.setData({
							caption:'I am popup win', 
							content:"<h1>Hello popup</h1><p>This popup was generated by W3View.</p>"+
							"<p>You can move and resize this popup window.</p>"+
							"<p>You can click first button again to open new instances.</p>"+
							"<p>Now is <b>"+new Date()+"</b></p>"
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
					this.ref.button2.onclick=function(){
						var win=factory.create('grid-win');
						win.onclose=function(){ this.destroy(); };
						win.mount(this.parentElement);
						return false;
					};

					this.ref.button3.onclick=function(){
						var win=factory.create('ext-win');
						win.onclose=function(){ win.destroy(); };
						win.mount(this.parentElement);					
						return false;
					};
				
//# sourceURL=W3View:///<app>
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"TBL":{"prep":{"tgn":"DIV","as":"tbl","attr":{"as":"tbl","style":"box-sizing:border-box;border:1px solid black;\n        width:100%;height:100%;\n        padding:0px 20px 0px 0px;"},"ch":[{"tgn":"DIV","attr":{"style":"float:left;width:100%;height:100%;overflow:hidden;min-height:150px;"},"ch":[{"tgn":"ARRAY-ITERATOR","attr":{"usetag":"table","border":"1","style":"width:100%;height:100%;min-height:150px;overflow:hidden;","_ref":"tb"},"ch":[{"tgn":"ROW","attr":{},"ch":[],"superc":null}],"superc":null}],"superc":null},{"tgn":"DIV","attr":{"style":"float:left;height:100%;width:0px;overflow:visible;"},"ch":[{"tgn":"SCROLLBAR","attr":{"style":"width:20px; height: 100%; min-height:150px;\n            border:1px solid black;","_ref":"scroll"},"ch":[],"superc":null}],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {



          var data = {};
          this.onSetData=function(input){
            data = input || {list:[]};
            data.len = Math.round(this.parentElement.offsetHeight/30);
            data.offset = data.offset>(data.list.length-data.len)?(data.list.length-data.len):data.offset;
            if(data.offset+data.len > data.list.length) data.offset=data.list.length-data.len;
            if(data.offset < 0) data.offset=0;
            
            var frame=data.list.slice(data.offset,data.offset+data.len);
            this.ref.tb.setData(frame);
            this.ref.scroll.setData({app:this, data:data});
          };

          var resize = this.onresize =  function(){
            this.setData(data);
          }.bind(this);

          var keyDown=function(e){
						e = e || window.event;
            var sh={38:+1, 40:-1}[e.keyCode];
            if(sh !== undefined){
              if(!e.ctrlKey && !e.altKey && !e.shiftKey) e.preventDefault(); 
              else return;
              data.offset-=sh;
              this.setData(data);
            }
          }.bind(this);

          this.ref.tb.onmousewheel=this.ref.tb.onwheel =function(e){
						e = e || window.event;
            var delta = e.deltaY || -e.wheelDelta
						if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            if(delta>0){
              data.offset++;
            } else{
              data.offset--;
            }
            this.setData(data);
            return false;
          }.bind(this);
          
          this.onMount = function(){
            // window.addEventListener('resize',resize);
            // window.addEventListener('keydown',keyDown);
          };

          this.onUnmount = function(){
            // window.removeEventListener('resize',resize);
            // window.removeEventListener('keydown',keyDown);
          };
          
        
//# sourceURL=W3View:///<tbl>
}}},
"ROW":{"prep":{"tgn":"tr","as":"row","attr":{"as":"row","super":"array-iterator","tagname":"tr"},"ch":[{"tgn":"POPUPS:CELL","attr":{},"ch":[],"superc":null},{"tgn":"POPUPS:CELL","attr":{"style":"background-color:rgba(128,128,128,0.3)"},"ch":[],"superc":null}],"superc":"array-iterator","script":function anonymous(appContext,factory,document,require
/*``*/) {


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

          
//# sourceURL=W3View:///<row>
}}},
"XCELL":{"prep":{"tgn":"DIV","as":"xcell","attr":{"as":"xcell","usetag":"td","style":"text-align:center;width:10%;"},"ch":[],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {



          this.onSetData=function(data){
            this.innerText=data;
          };

        
//# sourceURL=W3View:///<xcell>
}}},
"SCROLLBAR":{"prep":{"tgn":"DIV","as":"scrollbar","attr":{"as":"scrollbar"},"ch":[{"tgn":"DIV","attr":{"style":"cursor:pointer;position:relative;\n          width:100%; height:100px;\n          min-height:20px;top:0px;\n          border:2px solid black;\n          background-color:#999999;margin-top:0px;","_ref":"scroller"},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


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
						e = e || window.event;
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
						e = e || window.event;
						if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            var eY=e.clientY;
            if(downAt<0) {eY=e.offsetY;}
            var dy = Math.round((eY-downAt)/(this.offsetHeight-hh)*data.list.length);
            
            var offset = offsetAt+dy;
            app.setData({list:data.list, offset:offset});
            return false;
          }.bind(this);

          this.onmousedown = function(e){
						e = e || window.event;
            if(e.target !== this) return;
            offsetAt=0;
            downAt=-1;
            onmousemove(e);
          };

        
//# sourceURL=W3View:///<scrollbar>
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"TBL","attr":{"_ref":"table"},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


          var data=[];
          for(var i =0; i<1000; i++){
            data.push([i, '10'+i,  '20'+i, '30'+i, '40'+i, i, '10'+i,  '20'+i, '30'+i, '40'+i]);
          }
          this.onresize = function(){
            this.ref.table.onresize();
          }
          this.onMount=function(){
            this.ref.table.setData({list:data, offset:0});
            this.parentElement.onresize=this.onresize.bind(this);
          };
        
//# sourceURL=W3View:///<app>
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"SLIDER":{"prep":{"tgn":"DIV","as":"slider","attr":{"as":"slider","min":"0","max":"1","value":"0"},"ch":[{"tgn":"DIV","attr":{"style":"padding:20px;border:1px solid black;"},"ch":[{"tgn":"DIV","attr":{"style":"height:10px;border:1px solid black;","_ref":"bar"},"ch":[{"tgn":"DIV","attr":{"style":"position:relative;height:0px;width:0px","_ref":"mover"},"ch":[{"tgn":"DIV","attr":{"style":"position:absolute;margin:-10px 0 0 -10px;width:20px; height:30px;border:1px solid black;background-color:gray;"},"ch":[],"superc":null}],"superc":null}],"superc":null}],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


          var value;
          var max, min, defValue;
          this.onSetData=function(data){
            min = parseInt(this.getAttribute('min') || "0", 10);
            max = parseInt(this.getAttribute('max') || "1", 10);
            defValue = parseInt(this.getAttribute('value') || "0",10);
            
            value = parseInt(data,10); if (isNaN(value)) value=defValue;

            value = (value<min)?min:value;
            value = (value>max)?max:value;

            this.ref.mover.style.left = (100*(value - min) / (max - min)) + "%";

            this.onchange(value);
          };
          this.ref.bar.onclick=function(e){
            if(e && e.stopPropagation) e.stopPropagation(); else event.returnValue = false;
            if(e.target===this.ref.bar)
              this.setData((max-min)/this.ref.bar.offsetWidth*e.offsetX);
          }.bind(this);
          var downAt, valueAt;
          var moverOnmousemove = function(e){
            e.preventDefault(); e.stopPropagation();
            var shift = e.clientX-downAt;
            var v = valueAt + shift*(max-min)/this.ref.bar.offsetWidth;
            this.setData(v);
            return false;
          }.bind(this);
          var moverOnmouseup = function(e){
            window.removeEventListener('mousemove', moverOnmousemove);
            window.removeEventListener('mouseup', moverOnmouseup);
          };
          this.ref.mover.onmousedown = function(e){
            downAt = e.clientX;
            valueAt = value;
            window.addEventListener('mousemove', moverOnmousemove);
            window.addEventListener('mouseup', moverOnmouseup);
          };
          this.onchange=function(value){};
          this.getValue=function(){
            return value;
          };
          this.setData();
        
//# sourceURL=W3View:///<slider>
}}},
"COLOR-CHOOSER":{"prep":{"tgn":"DIV","as":"color-chooser","attr":{"as":"color-chooser","style":"box-sizing:border-box;"},"ch":[{"tgn":"H1","attr":{"col":"2","_ref":"content"},"ch":[],"superc":null},{"tgn":"SLIDER","attr":{"min":"0","max":"255","value":"128","style":"background-color:white;","col":"8","_ref":"slider"},"ch":[],"superc":null},{"tgn":"INPUT","attr":{"type":"text","col":"2","style":"text-align:right;height:50px;\n          font-size:40px;overflow:visible;border:0;\n          border-bottom:5px solid green;min-width:100px;padding:0px 10px;","_ref":"value"},"ch":[],"superc":null},{"tgn":"CLEAR","attr":{},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


          this.ref.slider.onchange = function(value){this.ref.value.value = value; this.onchange(value);}.bind(this);
          
          this.ref.value.onchange = function(e){
            if(e && e.stopPropagation) e.stopPropagation(); else event.returnValue = false;
            this.ref.slider.setData(this.ref.value.value);
          }.bind(this);

          this.ref.value.onkeydown = function(e){
            var sh={38:+1, 40:-1,37000:-1,39000:+1}[e.keyCode];
            if(sh !== undefined){
              if(!e.ctrlKey && !e.altKey && !e.shiftKey) e.preventDefault(); else return;
              this.setData(this.ref.value.value*1+sh);
            }
          }.bind(this);

          this.onSetData = function(value){
            this.ref.slider.setData(value);
          };
          
          this.getValue = function(){return this.ref.slider.getValue();};

          this.onchange=function(value){};

          this.setData(this.getValue());
        
//# sourceURL=W3View:///<color-chooser>
}}},
"RGB-CHOOSER":{"prep":{"tgn":"DIV","as":"rgb-chooser","attr":{"as":"rgb-chooser","style":"border:1px solid black; padding:20px;"},"ch":[{"tgn":"COLOR-CHOOSER","attr":{"_ref":"red"},"ch":["Red"],"superc":null},{"tgn":"COLOR-CHOOSER","attr":{"_ref":"green"},"ch":["Green"],"superc":null},{"tgn":"COLOR-CHOOSER","attr":{"_ref":"blue"},"ch":["Blue"],"superc":null},{"tgn":"CLEAR","attr":{},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {



          this.getValue=function(){
            return "rgb("+this.ref.red.getValue()+
                    ","+this.ref.green.getValue()+
                    ","+this.ref.blue.getValue()+
            ")";
          };
          
          this.ref.red.onchange = function(value){this.onchange(this.getValue());}.bind(this);
          this.ref.green.onchange = function(value){this.onchange(this.getValue());}.bind(this);
          this.ref.blue.onchange = function(value){this.onchange(this.getValue());}.bind(this);

          this.onchange=function(value){};

        
//# sourceURL=W3View:///<rgb-chooser>
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"DIV","attr":{"style":"height:100px;padding:20px 0px;font-size:20px;\n          text-align:center;border:1px solid black;border-bottom:0px;","id":"disp"},"ch":[{"tgn":"SPAN","attr":{"style":"background-color:white; padding:10px;border-radius: 20px;","_ref":"va"},"ch":[],"superc":null}],"superc":null},{"tgn":"RGB-CHOOSER","attr":{"_ref":"control"},"ch":[],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


          this.ref.control.onchange = function(value){
            disp.style.backgroundColor = value;
            val.innerText = value;
          };
          this.ref.control.setData();
        
//# sourceURL=W3View:///<app>
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"HELLO-WORLD":{"prep":{"tgn":"DIV","as":"hello-world","attr":{"as":"hello-world"},"ch":[{"tgn":"H1","attr":{"_ref":"content"},"ch":[],"superc":null},{"tgn":"INPUT","attr":{"placeholder":"type your name here","_ref":"input"},"ch":[],"superc":null},{"tgn":"H2","attr":{},"ch":["Hello ",{"tgn":"SPAN","attr":{"_ref":"name"},"ch":["Anonimous"],"superc":null},"!"],"superc":null}],"superc":null,"script":function anonymous(appContext,factory,document,require
/*``*/) {


					//CONSTRUCTOR tag should be used inside SCRIPT tag
					this.ref.input.onkeydown=this.ref.input.onkeyup = function(e){
						this.setData(this.ref.input.value);
					}.bind(this);
					this.onSetData = function(data){
						this.ref.name.innerText = data || 'Anonimous';
					};
				
//# sourceURL=W3View:///<hello-world>
}}},
"DOUBLE-HELLO-WORLD":{"prep":{"tgn":"DIV","as":"double-hello-world","attr":{"as":"double-hello-world"},"ch":[{"tgn":"HELLO-WORLD","attr":{},"ch":["Hello first"],"superc":null},{"tgn":"HR","attr":{},"ch":[],"superc":null},{"tgn":"HELLO-WORLD","attr":{},"ch":["Hello second"],"superc":null}],"superc":null}}});
})(appContext),{"raw":"function aa(){\n\tconsole.log('Hello i am an \"aa\" function');\n}\n\nmodule.exports = aa;","src":"/home/vitaly/projects/W3view/examples/modules/js/script.js"}];
factory[0].putModule('grid',factory[1], 'html');
factory[0].putModule('slider',factory[2], 'html');
factory[0].putModule('hello',factory[3], 'html');
factory[0].putModule('script',factory[4], 'js');
factory[1].putModule('popups',factory[0], 'html');
return factory[0];};
//# sourceURL=W3View:///../examples/modules/window.w3v.html
